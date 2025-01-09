define(['./logger','./SCABusinessController','OLBConstants'],function(KonyLogger,SCABusinessController,OLBConstants) {

  var temenos = temenos || {};
  temenos.logger = (new KonyLogger("Temenos SCA Component")) || function () {};
  var instance = null; 
  var startTime = null;
  
  
  SCAPresentationController.getInstance = function(){
     if(instance === null){
        instance = new SCAPresentationController();
     }
    return instance;
  }

  function SCAPresentationController(){

     this.callbackJSON = {
      "onSuccess":"",
      "onFailure":""
    }
    if(instance !== null){
       throw new Error("Cannot instantiate more than one SCAPresentationController, use SCAPresentationController.getInstance()");
    } 
  }
 
  SCAPresentationController.prototype.verifyUserId = function(userId,successCallBack,failureCallBack){
    temenos.logger.trace("----------Entering verifyUserId Function---------", temenos.logger.FUNCTION_ENTRY);
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    try{
      var params = {
         "username" : userId
      };
      SCABusinessController.verifyUserId(params,successCallBack,failureCallBack);
    }catch (exception) {
      kony.application.dismissLoadingScreen();
      temenos.logger.error(JSON.stringify(exception), temenos.logger.EXCEPTION);
    }
    temenos.logger.trace("----------Exiting verifyUserId Function---------", temenos.logger.FUNCTION_ENTRY);
  };
  
  SCAPresentationController.prototype.login = function(credentialInfo,updateFormUI){
    kony.application.showLoadingScreen("loadingskin","Data is still Loading"); 
    let successCallBack = success => {
      updateFormUI({
        "event":"LOGIN_SUCCESS",
        "response":success
      });
    };
    let failureCallBack = error => {
     
      updateFormUI({
        "event":"LOGIN_FAILURE",
        "response":error
      });
    };
    SCABusinessController.login(credentialInfo,successCallBack,failureCallBack);
  };
  
   SCAPresentationController.prototype.pollForCIBAAuthStatus = function(authReqId,updateFormUI){
     kony.application.showLoadingScreen("loadingskin","Data is still Loading");
     var scopeObj = this;
     this.startTime = new Date().getTime();
     var timer = OLBConstants.CLIENT_PROPERTIES.SCA_CIBA_TIMER_LOGIN; 
		if(timer !== undefined || timer !== null) 
			timer = Number(timer); 
		else 
			timer = 5; 
		if(timer<5) 
			timer = 5; 
		if(timer>20) 
			timer = 20; 
		kony.timer.schedule("cibatimer", function() { 
			scopeObj.fetchCIBAStatus(authReqId, updateFormUI); 
		}, timer, true); 
   };
  
   SCAPresentationController.prototype.fetchCIBAStatus = function(authReqId,updateFormUI){
	  var params = {
         "auth_req_id" : authReqId
      };
      SCABusinessController.fetchCIBAStatus(params,this.onInvokeCIBAAuthStatusSuccess.bind(this,updateFormUI),
                                                      this.onInvokeCIBAAuthStatusFailure.bind(this,updateFormUI));
      var currentTime = new Date().getTime();
      // cancel after 2 minutes
      if(currentTime - this.startTime >  120000){
        kony.timer.cancel("cibatimer");
        updateFormUI({
          "event":"CIBA_REQUEST_EXPIRED"
        });
	  }
   };
  
   
   SCAPresentationController.prototype.onInvokeCIBAAuthStatusSuccess = function(updateFormUI,response){
      kony.print('CIBA Fetch Response ---> '+ JSON.stringify(response));
      let scopeObj = this;
      if(response.ciba_status === 'accept' || response.ciba_status === 'deny'){
        kony.application.dismissLoadingScreen();
        kony.timer.cancel("cibatimer");
      }
    
      // Invoke MFA validation endpoint
      if(response.ciba_status === 'accept'){
        kony.print("CIBA Auth Approved, Invoking MFA endpoint");
       // SCABusinessController.validateMFA(response.auth_req_id,scopeObj.callbackJSON.onSuccess.bind(scopeObj),scopeObj.callbackJSON.onFailure.bind(scopeObj));
		 SCABusinessController.validateMFA(response.auth_req_id,scopeObj.onSuccessfulValidation.bind(scopeObj),scopeObj.onUnSuccessfulValidation.bind(scopeObj));
      }else if(response.ciba_status === 'deny'){
         updateFormUI({
            "event":"CIBA_REQUEST_DENIED"
         })
      }
   };
  
  //Added for testing
   SCAPresentationController.prototype.onSuccessfulValidation = function(scopeObj){
	   var currform = kony.application.getCurrentForm();
	   if(currform.Popup)
                currform.Popup.setVisibility(false);
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AuthUIModule').presentationController.onLoginSuccess(scopeObj);
   };
  SCAPresentationController.prototype.onUnSuccessfulValidation = function(scopeObj){
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AuthUIModule').presentationController.onLoginFailure(scopeObj);
   };
  
   SCAPresentationController.prototype.onInvokeCIBAAuthStatusFailure = function(updateFormUI,error){
       kony.timer.cancel("cibatimer");
       kony.application.dismissLoadingScreen();
   };
  
   SCAPresentationController.prototype.setContext = function(context){
       this.context = context.riskScore;
      this.callbackJSON.onSuccess = context.successCallback;
      this.callbackJSON.onFailure = context.failureCallback;
   }
  return SCAPresentationController.getInstance();
});