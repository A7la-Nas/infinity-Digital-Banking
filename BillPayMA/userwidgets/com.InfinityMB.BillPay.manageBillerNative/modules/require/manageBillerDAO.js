define(['./DataHandler'], function (DataHandler) {
  
  /**
   * Constructor
   */
  function manageBillerDAO(){
	this.DataHandler = new DataHandler();
  }
  /**
     * component fetchPayeeList
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - success callback function post receving response
     * @param : onError    {function}  - error callback function post receving response
     * @param : flag 			{string} - flag to determine service call getAll or get
     * @param : unicode        {string}  - unique code to identify service response in case of multiple service calls
     */
  manageBillerDAO.prototype.fetchPayeeList = function(objServiceName,operationName,objName,criteria,onSuccess,onError,flag,unicode) {
    kony.application.showLoadingScreen(null, kony.i18n.getLocalizedString('kony.mb.cardManage.fetching'), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
    var scope = this;
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
        "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    var options;
    var successCallback = function(response){
      kony.application.dismissLoadingScreen();
      if(flag){
        scope.savePayeeData(response);
        onSuccess();
      } else{
        onSuccess(response,unicode);
      }
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    };
    var errorCallback = function(error){
      kony.application.dismissLoadingScreen();
      var errObj = {
            "errorInfo" : "Failed to fetch the Payee Details.",
            "error": error
          };
          onError(errObj);
    };
    
    if(operationName === "GET"){
      var odataUrl = "";
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
     * component savePayeeData
     * To save the payee list
     * @param : payeeList {array}  - list of payees
     */
  manageBillerDAO.prototype.savePayeeData = function(payeeList){
    this.DataHandler.setData(payeeList.Payee);
  };
  
  /**
     * component searchPayeesData
     * To search the local payee list
     * @param : searchFieldList {array}  - list of firlds to be searched
     * @param : searchString {string}  - string to search
     * @param : callback {function}  - success callback function post receving response
     */
  manageBillerDAO.prototype.searchPayeesData = function(searchFieldList, searchString, callback){
    var data = this.DataHandler.searchData(searchFieldList, searchString);
    callback({"Payee": data});
  };

  /**
     * component fetchLocalData
     * To get the payees list from local data
     * @param : criteria {JSONobject}  - criteria required for the call
     * @param : callback {function}  - success callback function post receving response
     */
  manageBillerDAO.prototype.fetchLocalData = function(criteria, callback){
    var data = this.DataHandler.sortData(criteria.offset, criteria.limit, criteria.order, criteria.sortBy, criteria.sortByType);
    callback({"Payee": data});
  };
  
  /**
     * component searchPayees
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post receving response
     * @param : onError       {function}  - callback function post getting errors
     */
  manageBillerDAO.prototype.searchPayess = function(objServiceName,operationName,objName,criteria,onSuccess,onError,unicode) {
    kony.application.showLoadingScreen(null, kony.i18n.getLocalizedString('kony.mb.cardManage.fetching'), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
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
      kony.application.dismissLoadingScreen();
      var errObj = {
        "errorInfo" : "Failed to fetch the Payee Details.",
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
     * component deletePayee
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post receving response
     * @param : onError       {function}  - callback function post getting errors
     */
  manageBillerDAO.prototype.deletePayee = function(objServiceName,operationName,objName,criteria,onSuccess,onError) {
    kony.application.showLoadingScreen(null, kony.i18n.getLocalizedString('i18n.payments.billPayDeletingMsg'), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
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
      kony.application.dismissLoadingScreen();
      var errObj = {
        "errorInfo" : "Failed to delete the payee.",
        "error": error
      };
      onError(errObj);
    });

  };

  /**
     * component activateAndDeactivatePayee
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post receving response
     * @param : onError       {function}  - callback function post getting errors
     */
  manageBillerDAO.prototype.activateAndDeactivatePayee = function(objServiceName,operationName,objName,criteria,onSuccess,onError) {
    kony.application.showLoadingScreen(null, kony.i18n.getLocalizedString('kony.mb.cardManage.fetching'), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
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
      kony.application.dismissLoadingScreen();
      var errObj = {
        "errorInfo" : "Failed to Activate/Deactivate the Payee.",
        "error": error
      };
      onError(errObj);
    });

  };
  
  return manageBillerDAO;
});