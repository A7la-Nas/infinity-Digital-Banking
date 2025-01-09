define(function () {
  var instance = null;
       const RMSObjectServiceName = {
    "name" : "HIDRMSService",
    "accessType" : {"access" : "online"}
     };
       
   const RMSObjectServices = {
    getDataModel : function (objectName){
      var objectInstance = KNYMobileFabric.getObjectService(RMSObjectServiceName.name,RMSObjectServiceName.accessType );
      return {
        customVerb : function(customVerb, params, callback) {
          var dataObject = new kony.sdk.dto.DataObject(objectName);         
          for (let key in params){
            dataObject.addField(key, params[key]);
          }          
          var options = { "dataObject" : dataObject};
          objectInstance.customVerb(customVerb, options, success => callback(true, success), error => callback(false, error));
        }
      };
    }
  };
  
  rmsBusinessController.prototype.rmsActionCreate = function(params,S_CB, F_CB) {
    let rmsObjService = RMSObjectServices.getDataModel("RMSActionCreate");
    const callback = (status, response) => {
      if (status) {
        S_CB(response.RMSActionCreate[0]);
      } else {
        F_CB(response);
      }
    };
    rmsObjService.customVerb("rmsActionCreate", params, callback);
  };
  rmsBusinessController.prototype.SCAEnforce = function(params,S_CB,F_CB){
    let rmsObjService = RMSObjectServices.getDataModel("RMSActionCreate");
  const callback = (status, response) => {
    if (status) {
      S_CB(response.RMSActionCreate[0]);
    } else {
      F_CB(response);
    }
  };
  rmsObjService.customVerb("rmsActionCreate", params, callback);
 };
   rmsBusinessController.prototype.rmsActionSign = function(params, S_CB, F_CB) {
    let rmsObjService = RMSObjectServices.getDataModel("RMSActionSign");
    const callback = (status, response) => {
      if (status) {
        S_CB(response.RMSActionSign[0]);
      } else {
        F_CB(response);
      }
    };
    rmsObjService.customVerb("rmsActionSign", params, callback);
  };
  rmsBusinessController.prototype.rmsActionComplete = function(action_status,params, S_CB, F_CB) {
    let customVerb = action_status ? "rmsActionComplete" : "rmsActionReject";
    let rmsObjService = RMSObjectServices.getDataModel("RMSActionComplete");
    const callback = (status, response) => {
      if (status) {
        S_CB(response);
      } else {
        F_CB(response);
      }
    };
    rmsObjService.customVerb(customVerb, params, callback);
  };
  rmsBusinessController.getInstance = function(){
      if(instance === null){
         instance = new rmsBusinessController();
      }
     return instance;
   };
   function rmsBusinessController() {
     if(instance !== null){
        throw new Error("Cannot instantiate more than one rmsBusinessController, use rmsBusinessController.getInstance()");
     } 
   }
   return rmsBusinessController.getInstance();
});