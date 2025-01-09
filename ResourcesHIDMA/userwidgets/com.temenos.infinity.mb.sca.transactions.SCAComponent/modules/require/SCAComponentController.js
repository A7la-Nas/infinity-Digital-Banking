define(['SCAUtility'],function(SCAUtility) {
  const SDKConstants = {
    "PIN_REQUEST" : 100,
    "OKRA_OTP_GENERATED" : 107,
    "TX_ACCEPTED" : 101,
    "TX_DENIED"   : 102
  };
  const signatureService={
    "objectServiceName":"SCATransactionObjects",
     "objectName":"TransactionSigning",
     "operationName":"verifyTransactionSignature"
  };
 let criteria ={};
  let serviceKey ="";
  let serviceName="";
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._flowType = "";
      this._servicekey = "";
      this.scaJSON = {};
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
      defineSetter(this, "servicekey", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._servicekey=val;
        }
      });
      defineGetter(this, "servicekey", function() {
        return this._servicekey;
      });
    },

    preShow: function(){
     var scope =this;
      this.setFlowActions();
    },
    cancelAction:function(){
      this.onCancel();
    },
    setFlowActions: function(){
      let scopeObj = this;
      //  scopeObj.view.btnContinue.onClick = function(){
      //kony.application.showLoadingScreen(null,"", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
      const currentForm = kony.application.getCurrentForm();
      const userName = scopeObj.scaJSON.userName;
      const OCRAContext = scopeObj.scaJSON.userDetails.data1 + "|"+scopeObj.scaJSON.userDetails.data2;
      serviceKey = scopeObj.scaJSON.response.MFAAttributes.serviceKey;
      serviceName = scopeObj.scaJSON.flowType;
     // objectServiceName=scopeObj.scaJSON.signatureService.objectServiceName;
     // operatName=scopeObj.scaJSON.signatureService.operationName;
    //  objectName=scopeObj.scaJSON.signatureService.objectName;
      this.view.sdk.generateOCRAOTP(userName, OCRAContext, function(status,otpJSON) {
        if(SDKConstants.PIN_REQUEST === status) {
          var pinLength = JSON.parse(otpJSON).MAX_LENGTH;
          var HIDApproveSDKManager = require('HIDApproveSDKManager');
           hidApplicationSDKManager = HIDApproveSDKManager.getHIDApproveSDKManager();
          var sdk = hidApplicationSDKManager.getSdkInstance();
          if(currentForm.sdk){
            currentForm.remove(sdk);
          }
          currentForm.add(sdk);
          currentForm.sdk.setVisibility(true);
          kony.application.dismissLoadingScreen();
          currentForm.sdk.showPinDialog(pinLength);
        }else if (SDKConstants.OKRA_OTP_GENERATED === status){
          if(currentForm.sdk){
            currentForm.sdk.hidePinDialog();
            currentForm.remove(currentForm.sdk);
          }
          this.otp = JSON.parse(otpJSON).otp;
          applicationManager.getPresentationUtility().showLoadingScreen();
         // kony.application.showLoadingScreen();
          try{
            const servicePayload = {
              objServiceName: signatureService.objectServiceName,
              objName: signatureService.objectName,
              operationName: signatureService.operationName,
              payload: {
            "context":OCRAContext,
            "otp":this.otp,
            "serviceKey":serviceKey,
            "serviceName":serviceName
             },
              successCallback: scopeObj.signatureSuccessCallBack,
              errorCallback: scopeObj.signatureFailureCallBack,
            };
            SCAUtility.callBackendService(servicePayload);
            
          }catch (err) {
            var errorObj = {
              "errorInfo": "Error in doing service call to verify Signature",
              "errorLevel": "Business",
              "error": err
            };
            this.signatureFailureCallBack(errorObj);
          } 
        }else{
        }
      });
      //};

      scopeObj.view.btnClose.onClick = function(){
        if(scopeObj.onCancel)
          scopeObj.onCancel();
      };
    },

    setContext: function(mfaJSON){
      let scopeObj = this;
      scopeObj.servicekey = mfaJSON.response.MFAAttributes.serviceKey;
      scopeObj.scaJSON = mfaJSON;
      this.preShow();
      // kony.application.dismissLoadingScreen();
    },
   signatureSuccessCallBack : function(){
     this.completeActivity();
   },
   signatureFailureCallBack : function(error){
     kony.application.dismissLoadingScreen();
     this.onFailureCallback(error);
   },
    completeActivity: function(){
      let scopeObj = this;
      let params = {
        "MFAAttributes" : {
          "serviceKey" : this.servicekey
        }
      };
      function completionCallback(status, data, error) {
        if(status === kony.mvc.constants.STATUS_SUCCESS){
          scopeObj.completeActivitySuccessCallback(data);
        } else {
          scopeObj.completeActivityFailureCallback(error);
        }
      }
      var repoObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj.scaJSON.objectServiceDetails.dataModel);
      repoObj.customVerb(scopeObj.scaJSON.objectServiceDetails.operationName, params, completionCallback);
    },

    completeActivitySuccessCallback: function(response){
      let scopeObj = this;
      kony.application.dismissLoadingScreen();
      if(response.hasOwnProperty("errcode") || response.hasOwnProperty("dbpErrCode")){
          var err ={};
          err = response;
          err.errorMessage = response.dbpErrMsg || response.errorMessage;
          scopeObj.onFailureCallback(err);
      }else{
          scopeObj.onSuccessCallback(response);
      }
      
    },
   
    completeActivityFailureCallback: function(error){
      kony.application.dismissLoadingScreen();
      let scopeObj = this;
      if(scopeObj.onFailureCallback)
        scopeObj.onFailureCallback(error);
    },

  };
});
