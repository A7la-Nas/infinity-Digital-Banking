define(['./rmsBusinessController'],function (rmsBusinessController) {
  
    var instance = null;
    
   rmsPresentationController.getInstance = function(){
       if(instance === null){
          instance = new  rmsPresentationController();
       }
      return instance;
    };
  is_pre_login : false,
    
  
   rmsPresentationController.prototype.rmsActionCreate = function(rmsLoad,S_CB,F_CB){
    this.rmsLoad = rmsLoad;
     if(rmsLoad.app_user_id){
       this.is_pre_login = true;
      this.app_user_id = rmsLoad.app_user_id;
     }
     else
       this.is_pre_login = false;
    this.app_session_id = rmsLoad.app_session_id;
    var SCB_presentation = response => {
      this.app_action_id = response.app_action_id;
      S_CB.call(this,response);
    };
    rmsBusinessController.rmsActionCreate(rmsLoad, SCB_presentation, F_CB);
  };
  rmsPresentationController.prototype.rmsActionSign = function(S_CB,F_CB){
    var tm_action_id = this.app_action_id;
    var security_item_type = "pki";
    var userParams = {
        "tm_action_id" : tm_action_id,
        "security_item_type" : security_item_type,
    };
    if(this.is_pre_login)
      userParams.app_user_id = this.app_user_id;
    var params =Object.assign(userParams, this.rmsLoad);
    rmsBusinessController.rmsActionSign(params, S_CB, F_CB);
  };
  rmsPresentationController.prototype.rmsActionComplete = function(status,S_CB,F_CB){
    let tm_action_id = this.app_action_id;
    let params = { 
      "tm_action_id":tm_action_id 
    };
    rmsBusinessController.rmsActionComplete(status,params, S_CB, F_CB);
  };
   
   function rmsPresentationController(){
        if(instance !== null){
         throw new Error("Cannot instantiate more than one rmsPresentationController, usermsPresentationController.getInstance()");
          } 
       }
    return rmsPresentationController.getInstance();
        
    
});