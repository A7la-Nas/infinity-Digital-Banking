define(function () {

  /**
   * Constructor
   */
  function liteActivationDAO(){
  }
  /**
     * component activatePayee
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post receving response
     * @param : onError       {function}  - callback function post getting errors
     */
  liteActivationDAO.prototype.activatePayee = function(objServiceName,operationName,objName,criteria,onSuccess,onError) {
    kony.application.showLoadingScreen(null, kony.i18n.getLocalizedString('i18n.payments.activatingUserLoaderMsg'), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
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
    var successCallBack = function(response) {
      kony.application.dismissLoadingScreen();
      onSuccess(response);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    };
    var errorCallBack = function(error) {
      kony.application.dismissLoadingScreen();
      var errObj = {
        "errorInfo" : "Failed to Activate/Deactivate the Payee.",
        "error": error
      };
      onError(errObj);
    };
    
    objSvc.customVerb(operationName, options, successCallBack, errorCallBack);
  };
    return liteActivationDAO;
  });