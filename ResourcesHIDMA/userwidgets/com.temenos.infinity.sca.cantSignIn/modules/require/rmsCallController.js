define(['./rmsCallBusinessController'],function (rmsCallBusinessController) {
   var instance = null;
   client_ip = "",
  	TM_Cookie_Tag = "TS01d4cc80",
    TM_Cookie_Sid = "C8hDRqP6KY";
    
   rmsCallController.getInstance = function(){
       if(instance === null){
          instance = new  rmsCallController();
       }
      return instance;
    };
   	
     rmsCallController.prototype.rmsActionCreate = function (actionType,sessionId,S_CB,F_CB){
        if(actionType == "RESET_OLB_PASSWORD" || actionType == "LOST_DEVICE"){
          is_pre_login = true;
          this.app_user_id = applicationManager.getRmsUserID();
        }
      this.action_type = actionType;
      this.app_session_id = sessionId;
      let decodeCookie = document.cookie.split(";");
      for(var i=0; i<decodeCookie.length; i++) {
        cookiename = decodeCookie[i].split('=')[0].replace(/\s/g, "");
        if (cookiename === TM_Cookie_Sid){
          this.tm_sid = decodeCookie[i].split('=')[1];
        }
        if (cookiename === TM_Cookie_Tag){
          this.tm_tag = decodeCookie[i].split('=')[1];
        }
      }
      const rmsLoad = {
          "tm_session_sid" : this.tm_sid,
          "tm_device_tag" : this.tm_tag,
          "app_session_id" : this.app_session_id,
          "action_type" : this.action_type
        };
       var rms_SCB = response =>{
          var tagsResp = response.tags || "[]";
         if(tagsResp.length != 0)
        	var tags = JSON.parse(tagsResp); 
        var stepUp = response.stepUp;
        var currentThreat = response.currentThreat;
        this.userBlock = "false";
        if(tags && tags.some(v=>v==="USER-BLOCK")){
             this.userBlock = "true";
        }
         response.userBlock = this.userBlock;
         S_CB.call(this,response);
       };
          rmsLoad.app_user_id = this.app_user_id;
        const url = "https://api.ipify.org/?format=json";
                fetch(url)
                  .then(response => response.json())
                  .then(data =>{ 
                  self.client_ip = data.ip;
                  rmsLoad.client_ip = data.ip;
                  rmsCallBusinessController.rmsActionCreate(rmsLoad,rms_SCB,F_CB);
           });
         
      };
	rmsCallController.prototype.updateActionInRMS = function(status){
		var S_CB = response =>{
			//No event to be exceuted after this
		}
		var F_CB = response =>{
		//No event to be exceuted after this
		}
    rmsCallBusinessController.rmsActionComplete(status,S_CB,F_CB);
  };
      
     
         function rmsCallController(){
        if(instance !== null){
         throw new Error("Cannot instantiate more than one rmsCallController, usermsCallController.getInstance()");
          } 
       }
    return rmsCallController.getInstance();
});