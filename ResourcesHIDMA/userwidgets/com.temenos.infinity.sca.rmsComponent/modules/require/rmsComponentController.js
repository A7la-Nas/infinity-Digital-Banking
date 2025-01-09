define(['./rmsPresentationController','./rmsBusinessController','OLBConstants'],function(rmsPresentationController,rmsBusinessController,OLBConstants) {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
        this.TM_Cookie_Sid = "";
        this.TM_Cookie_Tag = "";
        this.tm_sid = "";
        this.tm_tag = "";
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
          defineGetter(this,"tmCookieSid",function(){
                return this.TM_Cookie_Sid;
              }); 
              defineSetter(this, "tmCookieSid", function(val){
                if(!(val) || val == undefined){
                  throw {
                    "type": "CUSTOM",
                    "message": "TM_COOKIE_SID property is Invalid"
                  };
                }
                this.TM_Cookie_Sid = val;
              });//
              defineGetter(this, "tmCookieTag", function(){
                return this.TM_Cookie_Tag;
              }); 
              defineSetter(this, "tmCookieTag", function(val){
                if(!(val) || val == undefined){
                  throw {
                    "type": "CUSTOM",
                    "message": "TM_COOKIE_SID property is Invalid"
                  };
                }
                this.TM_Cookie_Tag = val;
              });
          },
           client_ip : "",
           stepUp : "",
           action_type : "",
           app_session_id : "",
           action : "",
      	  app_user_id : "",
          is_pre_login : false,
          SCARiskAssessment: function () {
            if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT.toUpperCase() === "TRUE")
              isSCARMSEnabled = "true";
            else
              isSCARMSEnabled = "false";
          },
    
       
      rmsActionCreate : function(actionType,sessionId){
        this. SCARiskAssessment();
        if(isSCARMSEnabled == "true"){
          if(actionType == "RESET_OLB_PASSWORD" || actionType == "LOST_DEVICE" || actionType == "ACTIVATION"){
            this.is_pre_login = true;
            this.app_user_id = applicationManager.getRmsUserID();
          }
          else
            this.is_pre_login = false;
        }

        this.action_type = actionType;
        this.app_session_id = sessionId;
        if( isSCARMSEnabled == "true")
          this.assignValue();
        else{
          const Load = {
            "action_type": this.action_type};
          rmsBusinessController.SCAEnforce(Load,this.rmsActionSCB,this.rmsActionFCB);
        }
      
      },
      assignValue : function(){
      let decodeCookie = document.cookie.split(";");
      for(var i=0; i<decodeCookie.length; i++) {
        cookiename = decodeCookie[i].split('=')[0].replace(/\s/g, "");
        if (cookiename === this.TM_Cookie_Sid){
          this.tm_sid = decodeCookie[i].split('=')[1];
        }
        if (cookiename === this.TM_Cookie_Tag){
          this.tm_tag = decodeCookie[i].split('=')[1];
        }
      }
      const rmsLoad = {
          "tm_session_sid" : this.tm_sid,
          "tm_device_tag" : this.tm_tag,
          "app_session_id" : this.app_session_id,
          "action_type" : this.action_type
        };
        if(this.is_pre_login && this.app_user_id)
          rmsLoad.app_user_id = this.app_user_id;
      if(this.client_ip.trim() != ""){
        rmsLoad.client_ip = this.client_ip;
        rmsPresentationController.rmsActionCreate(rmsLoad,this.rmsActionSCB,this.rmsActionFCB);
      }else{
        const url = "https://api.ipify.org/?format=json";
                fetch(url)
                  .then(response => response.json())
                  .then(data =>{ 
                  self.client_ip = data.ip;
                  rmsLoad.client_ip = data.ip;
                  rmsPresentationController.rmsActionCreate(rmsLoad,this.rmsActionSCB,this.rmsActionFCB);
           });
         }
      },
      rmsActionSCB: function(response){
        var tagsResp = response.tags || "[]";
        if(tagsResp.length!=0)
        	var tags = JSON.parse(tagsResp);  
        var stepUp = response.stepUp;
        var currentThreat = response.currentThreat;
        var userBlock = "false";
        if(tags && tags.some(v=>v==="USER-BLOCK")){
             userBlock = "true";
        }
        if(this.rmsActionSuccess)
           this.rmsActionSuccess.call(this,{"stepUp":stepUp,"userBlock" : userBlock,"currentThreat" : currentThreat}); 
      },
      rmsActionFCB: function(error){
        if(this.rmsActionFailure){
           this.rmsActionFailure.call(this,{"stepUp":"true"});
        }
      },
      rmsActionSign: function(action){
        this.action = action;
        rmsPresentationController.rmsActionSign(this.SCB_rmsActionSign,this.FCB_rmsActionSign);
      },
     SCB_rmsActionSign : function(response){
       if(this.action == "success")
        this.updateActionInRMS(true);
       else 
         this.updateActionInRMS(false);
      },
      FCB_rmsActionSign : function(error){
         if(this.action == "success")
            this.updateActionInRMS(true);
       else 
           this.updateActionInRMS(false);
      },
     updateActionInRMS : function(status){
         rmsPresentationController.rmsActionComplete(status,this.SCB_updateActionInRMS,this.FCB_updateActionInRMS);
       },
      SCB_updateActionInRMS : function(response){
        var actionFlag = this.action;
         if(this.updateActionInRMSSuccess)
           this.updateActionInRMSSuccess.call(this,{"success":"true","actionFlag":actionFlag});
      },
      FCB_updateActionInRMS : function(error){
        var actionFlag = this.action;
          if(this.updateActionInRMSFailure)
           this.updateActionInRMSFailure.call(this,{"success":"false","actionFlag":actionFlag});
      },
      commonEventHandler(event,intent){
      if(event){
        event.call(this,intent);
      }
    },
  };
});