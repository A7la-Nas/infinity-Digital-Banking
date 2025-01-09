define(['./logger','./SCAEventTemplate'],function(KonyLogger,SCAEventTemplate) {

  var temenos = temenos || {};
  temenos.logger = (new KonyLogger("Temenos SCA Component")) || function () {};
  var instance = null; 
  constants.CIBA_IDENTITY_SERVICE_NAME="CIBACustomIdentity";
 
  SCABusinessController.getInstance = function(){
    
     if(instance === null){
        instance = new SCABusinessController();
     }
     return instance;
  }

  function SCABusinessController(){
    if(instance !== null){
       throw new Error("Cannot instantiate more than one SCABusinessController, use SCABusinessController.getInstance()");
    } 
  }
  const objectServiceConfig = {
        "name": "SCAObjects",
        "accessType": {
            "access": "online"
        }
  }
  const SCAObjectServices = {
        getDataModel: function(objectName) {
            var objSvc = kony.sdk.getCurrentInstance().getObjectService(objectServiceConfig.name, objectServiceConfig.accessType);
            return {
                customVerb: function(customVerb, params, callback) {
                    var dataObject = new kony.sdk.dto.DataObject(objectName);
                    for(let key in params) {
                        dataObject.addField(key, params[key]);
                    }
                    var options = {
                        "dataObject": dataObject
                    };
                    objSvc.customVerb(customVerb, options, success => callback(true, success), error => callback(false, error));
                }
            };
        }
    }
  
  SCABusinessController.prototype.login  =  function(credentialInfo,presentationSuccess,presentationFailure){
     var identitySrv = KNYMobileFabric.getIdentityService(constants.CIBA_IDENTITY_SERVICE_NAME);
     identitySrv.login(credentialInfo, function(){
        presentationSuccess(identitySrv.getMfaDetails());
     }, function(error) {
        presentationFailure(error);
     });
    
  }; 
  
  SCABusinessController.prototype.getMFADetails = function(){
     var identitySrv = KNYMobileFabric.getIdentityService(constants.CIBA_IDENTITY_SERVICE_NAME);
     return identitySrv.getMfaDetails();
  };
  
  SCABusinessController.prototype.validateMFA = function(authReqId,successCallBack,failureCallBack){
    
     var identitySrv = KNYMobileFabric.getIdentityService(constants.CIBA_IDENTITY_SERVICE_NAME);
     var mfaParams = {"is_mfa_enabled":true, "mfa_meta":{"ciba":true},"mfa_key": authReqId};
     identitySrv.validateMfa(mfaParams,successCallBack,failureCallBack);  
    
  }
  
  SCABusinessController.prototype.verifyUserId = function(params,successCallBack,failureCallBack){
     var objService = SCAObjectServices.getDataModel("User");
     const callback = (status, response) => {
      if (status) {
        successCallBack(response);
      } else {
        failureCallBack(response);
      }
     };
     objService.customVerb("verifyUserId", params, callback);
  }
  
  SCABusinessController.prototype.fetchCIBAStatus = function(params,successCallBack,failureCallBack){
     var objService = SCAObjectServices.getDataModel("AuthStatus");
     const callback = (status, response) => {
      if (status) {
        successCallBack(response);
      } else {
        failureCallBack(response);
      }
     };
     objService.customVerb("fetch", params, callback);
   
  }
  return SCABusinessController.getInstance(); 
});