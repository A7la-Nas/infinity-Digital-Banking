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

  const CIBA_REQUEST_DENIED = kony.i18n.getLocalizedString("kony.mb.sca.MsgDeniedRqst");
  const CIBA_REQUEST_EXPIRED = kony.i18n.getLocalizedString("kony.mb.sca.ErrMsgTransaction");
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
     Popup = new com.temenos.infinity.sca.UnikenPopup({
       			"appName" : "ResourcesUnikenMA",
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
                    "text":kony.i18n.getLocalizedString("kony.mb.sca.MsgApproveTransaction")
                  }
                }
            }, {
                "overrides": {}
            }, {
                "overrides": {}
            });
      Popup.headingtext = kony.i18n.getLocalizedString("kony.mb.sca.MsgApproveTransaction");
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
		var response = {};
		if(error.errorCode === "90013"){
        response.errorMessage = kony.i18n.getLocalizedString("kony.mb.sca.uniken.errSelfieBiometric");
        response.dbpErrMsg = kony.i18n.getLocalizedString("kony.mb.sca.uniken.errSelfieBiometric");
		} else
		{
			response.errorMessage = kony.i18n.getLocalizedString("kony.mb.sca.ErrMsgPushRequest");
			response.dbpErrMsg = kony.i18n.getLocalizedString("kony.mb.sca.ErrMsgPushRequest");
		}
			
        applicationManager.getPresentationUtility().MFA.navigateToTransactionScreen(response);
      };

      var params = {
        "serviceName": scopeObj.flowType,
        "serviceKey" : scopeObj.serviceKey
      };
      var objService = CIBAObjSrv.getDataModel("TransactionPushOperation","UnikenTransactionObj"); 
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
	  scopeObj.addPopup();
      this.startTime = new Date().getTime();
      kony.timer.schedule("cibatimer", function(){
        scopeObj.fetchCIBAStatus(authReqId);
      }, 5, true);

    },
    fetchCIBAStatus : function(authReqId){

      var params = {
        "auth_req_id" : authReqId
      };
      let scopeObj = this;
      let successCallBack = success => {
        if(success.status === 'UPDATED'){
          kony.timer.cancel("cibatimer");
        }
        if(success.action_response === 'Approve'){
          cibaRequestId = authReqId;
           var serviceParams = {
            "serviceKey" : scopeObj.serviceKey
          };
          var objService = CIBAObjSrv.getDataModel("TransactionPushOperation","UnikenTransactionObj"); 
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
            
        }else if(success.action_response === 'Disapprove'){
          //scopeObj.view.lblCibaError.text= CIBA_REQUEST_DENIED;
          //scopeObj.view.lblCibaError.setVisibility(true);
          var currform = kony.application.getCurrentForm();
          if(currform.Popup){
                currform.Popup.setVisibility(false);
                currform.remove(Popup);
                var response ={};
                response.errorMessage = kony.i18n.getLocalizedString("kony.mb.sca.MsgRequestDenied");
                response.dbpErrMsg = kony.i18n.getLocalizedString("kony.mb.sca.MsgRequestDenied");
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
                response.errorMessage = kony.i18n.getLocalizedString("kony.mb.sca.MsgApproveTimeOut");
                response.dbpErrMsg = kony.i18n.getLocalizedString("kony.mb.sca.MsgApproveTimeOut");
                applicationManager.getPresentationUtility().MFA.navigateToTransactionScreen(response);
            }
      };

      var objService = CIBAObjSrv.getDataModel("AuthStatus","SCAUniken");
      const callback = (status, response) => {
        if (status) {
          successCallBack(response);
        } else {
          failureCallBack(response);
        }
      };

      //kony.print("Auth params "+JSON.stringify(params));
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
                response.errorMessage = kony.i18n.getLocalizedString("kony.mb.sca.MsgApproveTimeOut");
                response.dbpErrMsg = kony.i18n.getLocalizedString("kony.mb.sca.MsgApproveTimeOut");
                applicationManager.getPresentationUtility().MFA.navigateToTransactionScreen(response);
            }
        scopeObj.view.forceLayout();
      }
    },
    toggleFlex: function(isVisible) {
        this.view.flxCIBA.setVisibility(isVisible);
    }
  };
});