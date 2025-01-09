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
   rmsCallBusinessController.prototype.rmsActionCreate = function(params,S_CB, F_CB) {
    let rmsObjService = RMSObjectServices.getDataModel("RMSActionCreate");
    const callback = (status, response) => {
      if (status) {
		this.app_action_id = response.RMSActionCreate[0].app_action_id;
        S_CB(response.RMSActionCreate[0]);
      } else {
        F_CB(response);
      }
    };
    rmsObjService.customVerb("rmsActionCreate", params, callback);
  };
  
  rmsCallBusinessController.prototype.rmsActionComplete = function(action_status,S_CB, F_CB) {
    let customVerb = action_status ? "rmsActionComplete" : "rmsActionReject";
    let rmsObjService = RMSObjectServices.getDataModel("RMSActionComplete");
    let tm_action_id = this.app_action_id;
    let params = { 
      "tm_action_id":tm_action_id 
    };
    const callback = (status, response) => {
      if (status) {
        S_CB(response);
      } else {
        F_CB(response);
      }
    };
    rmsObjService.customVerb(customVerb, params, callback);
  };
  
     rmsCallBusinessController.getInstance = function(){
      if(instance === null){
         instance = new rmsCallBusinessController();
      }
     return instance;
   };
   function rmsCallBusinessController() {
     if(instance !== null){
        throw new Error("Cannot instantiate more than one rmsCallBusinessController, use rmsCallBusinessController.getInstance()");
     } 
   }
   return rmsCallBusinessController.getInstance();
});