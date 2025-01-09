define(['FormControllerUtility'], function (FormControllerUtility) {

var Popup;
  const CIBAObjSrv = {
    getDataModel: function(objectName,objectServiceName) {
      var objSvc = kony.sdk.getCurrentInstance().getObjectService(objectServiceName, {"access": "online"});
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

  const CIBA_REQUEST_DENIED="You have denied the transaction";
  const CIBA_REQUEST_EXPIRED="The approval for your transaction could not be received. Please retry";
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      let scopeObj = this;
      scopeObj._flowType = "";
      scopeObj._servicekey = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

      defineSetter(this, "flowType", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._flowType=val;
        }
      });
      defineGetter(this, "flowType", function() {
        return this._flowType;
      });
      defineSetter(this, "serviceKey", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._servicekey=val;
        }
      });
      defineGetter(this, "serviceKey", function() {
        return this._servicekey;
      });

    },
    navigateTo : function(flxId){
      let self = this;
      for (let i of self.flxIdArray) {
        self.view[`${i}`].setVisibility(i === flxId);
      }
      self.view.forceLayout();
    },
    preshow: function () {
      this.setActions();
      this.resetUI();
      this.addPopup();
    },
    startTime : null,
    cibaRequestId : null,
    resetUI: function () {
      let scopeObj = this;
      scopeObj.view.lblCibaError.setVisibility(false);
      scopeObj.view.imgProgress.setVisibility(false);
    },
    hideProgressBar: function () {
      FormControllerUtility.hideProgressBar(this.view);
    },
    setActions: function () {
      let self = this;
    
    },
    addPopup:function(){
      
      this.view.flxCIBA.setVisibility(false);
      var currform = kony.application.getCurrentForm();
     Popup = new com.temenos.infinity.sca.Popup({
       			"appName" : "ResourcesHIDMA",
                "height": "100%",
                "id": "Popup",
                "isVisible": true,
                "left": "0dp",
                "masterType": constants.MASTER_TYPE_USERWIDGET,
                "isModalContainer": true,
                "skin": "sknflx000000op50",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1,
                "overrides": {
                    "Popup": {
                        "right": "viz.val_cleared",
                        "bottom": "viz.val_cleared",
                        "minWidth": "viz.val_cleared",
                        "minHeight": "viz.val_cleared",
                        "maxWidth": "viz.val_cleared",
                        "maxHeight": "viz.val_cleared",
                        "centerX": "viz.val_cleared",
                        "centerY": "viz.val_cleared"
                    },
                  "ldlPopupText":
                  {
                    "text":"Please approve the transaction request notification sent to your registered mobile device."
                  }
                }
            }, {
                "overrides": {}
            }, {
                "overrides": {}
            });
      Popup.headingtext = "Please approve the transaction request notification sent to your registered mobile device.";
      if(!currform.Popup)
      	currform.add(Popup);
      
       currform.Popup.setVisibility(true);
      
      if(applicationManager.getMFAManager().getMFAType()==="SECURE_ACCESS_CODE") currform.Popup.setVisibility(false);
     
      
    },
    setContext: function(payload) {

      let scopeObj = this;
      let successCallBack = success => {
          scopeObj.pollForCIBAAuthStatus(success.authReqId);
      };

      let failureCallBack = error => {
        scopeObj.hideProgressBar(); 
      };

      var params = {
        "serviceName": scopeObj.flowType,
        "serviceKey" : scopeObj.serviceKey
      };
      var objService = CIBAObjSrv.getDataModel("CIBAPushOperation","SCATransactionObjects"); 
      const callback = (status, response) => {
        if (status) {
          successCallBack(response);
        } else {
          failureCallBack(response);
        }
      };
      objService.customVerb("sendTransactionPush", params, callback);
    },
    pollForCIBAAuthStatus : function(authReqId){

      var scopeObj = this;
      this.startTime = new Date().getTime();
      kony.timer.schedule("cibatimer", function(){
        scopeObj.fetchCIBAStatus(authReqId);
      }, 20, true);

    },
    fetchCIBAStatus : function(authReqId){

      var params = {
        "auth_req_id" : authReqId
      };
      let scopeObj = this;
      let successCallBack = success => {
        if(success.ciba_status === 'accept' || success.ciba_status === 'deny'){
          kony.timer.cancel("cibatimer");
        }
        if(success.ciba_status === 'accept'){
          cibaRequestId = authReqId;
           var serviceParams = {
            "serviceKey" : scopeObj.serviceKey
          };
          var objService = CIBAObjSrv.getDataModel("CIBAPushOperation","SCATransactionObjects"); 
          const cb = (status, response) => {
            if (status) {
				if(scopeObj.onSuccessCallback){
                  scopeObj.onSuccessCallback(response);
                }
            } else {
				if(scopeObj.onFailureCallback){
                  scopeObj.onFailureCallback(response);
                }
            }
          };
          objService.customVerb("verifyPushTransaction", serviceParams, cb);
            
        }else if(success.ciba_status === 'deny'){
          //scopeObj.view.lblCibaError.text= CIBA_REQUEST_DENIED;
          //scopeObj.view.lblCibaError.setVisibility(true);
          var currform = kony.application.getCurrentForm();
          if(currform.Popup){
                currform.Popup.setVisibility(false);
                currform.remove(Popup);
                var response ={};
                response.errorMessage = "Approval request denied.";
                response.dbpErrMsg = "Approval request denied.";
                applicationManager.getPresentationUtility().MFA.navigateToTransactionScreen(response);                
            }
          scopeObj.view.forceLayout();
        }	

      };
      let failureCallBack =  error => {
        kony.timer.cancel("cibatimer");
        var currform = kony.application.getCurrentForm();
        if(currform.Popup){
                currform.Popup.setVisibility(false);
                currform.remove(Popup);
                var response ={};
                response.errorMessage = "Approval request timed out.";
                response.dbpErrMsg = "Approval request timed out.";
                applicationManager.getPresentationUtility().MFA.navigateToTransactionScreen(response);
            }
      };

      var objService = CIBAObjSrv.getDataModel("AuthStatus","SCAObjects");
      const callback = (status, response) => {
        if (status) {
          successCallBack(response);
        } else {
          failureCallBack(response);
        }
      };

      kony.print("Auth params "+JSON.stringify(params));
      objService.customVerb("fetch", params, callback);

      var currentTime = new Date().getTime();
      // cancel after 2 minutes
      if(currentTime - this.startTime >  120000){
        kony.timer.cancel("cibatimer");
        //scopeObj.view.lblCibaError.text= CIBA_REQUEST_EXPIRED;
        var currform = kony.application.getCurrentForm();
        if(currform.Popup){
                currform.Popup.setVisibility(false);
                currform.remove(Popup);
                var response ={};
                response.errorMessage = "Approval request timed out.";
                response.dbpErrMsg = "Approval request timed out.";
                applicationManager.getPresentationUtility().MFA.navigateToTransactionScreen(response);
            }
        scopeObj.view.forceLayout();
      }

    }


  };
});