define(['./KonyLogger'], function(konyLoggerModule) {
  var konymp = konymp || {};
  konymp.logger = (new konyLoggerModule("HID Approve SDK NativeControllerIOS Component")) || function() {};
  konymp.logger.setLogLevel("DEBUG");
  konymp.logger.enableServerLogging = true; 
  var NativeControllerIOS = function(componentInstance) {
    konymp.logger.trace("---- Start constructor NativeControllerIOS ----", konymp.logger.FUNCTION_ENTRY);
    this.componentInstance = componentInstance;
    
    konymp.logger.trace("-- Exit constructor NativeControllerIOS -- ", konymp.logger.FUNCTION_EXIT);
  };
  
  var userAgent = kony.os.deviceInfo().userAgent;
  if ((/iphone/i.test(userAgent)) || (/ipad/i.test(userAgent)) || (/android/i.test(userAgent) && /mobile/i.test(userAgent)) || (/android/i.test(userAgent))) {
    try {
        var HIDSdkWrapperClass = objc.import("HIDSdkWrapperClass");
        var HIDSdkWrapperClassObject = HIDSdkWrapperClass.alloc().jsinit();
		} catch (exception) {
            kony.application.dismissLoadingScreen();
        }
  }
  
  //All ios methods
  
    NativeControllerIOS.prototype.updatePushRegistrationToken = function(token) {
      try{
      if(HIDSdkWrapperClassObject){
         HIDSdkWrapperClassObject.updateDeviceToken(token);
        }
       } catch(exception) {
          kony.application.dismissLoadingScreen();
        } 
      };

   NativeControllerIOS.prototype.doDeviceProvisioning = function(activationObj,provisionCallBack) {
    try {
      if(activationObj !== null) {
        var activationObject = JSON.parse(activationObj);
        var object = JSON.parse(activationObject.activationCode);
        var activationResp = JSON.stringify(object);
        HIDSdkWrapperClassObject.doDeviceProvisioningActStrCallback(activationObj,activationResp,provisionCallBack);
      } else {
        alert("Missing required activation parameters!");
        return;
      }
    } catch(exception) {
       kony.application.dismissLoadinScreen();
      alert("Provisioning Exception!");
      throw new Error(exception);
    }
  };
    
      NativeControllerIOS.prototype.setContainerPin = function(pin,pincallback){
         try{
           if(HIDSdkWrapperClassObject){
           HIDSdkWrapperClassObject.setContainerPinCallBack(pin,pincallback);
           }
         }catch(exception) {
           kony.application.dismissLoadingScreen();
         }
       };
  
     NativeControllerIOS.prototype.retrieveTransactionInfo = function(txId,sdkCallBack){

         try
         {
         if(HIDSdkWrapperClassObject){  
          return HIDSdkWrapperClassObject.retrieveTransactionInfoCallBack(txId,sdkCallBack);
          }
         }
       catch(exception){
          alert(exception);   

        }
    };
  
     NativeControllerIOS.prototype.retrieveTransactionMessage = function(txId,sdkCallBack){
       
        try{
         if(HIDSdkWrapperClassObject){  
        return HIDSdkWrapperClassObject.retrieveTransactionMessageCallBack(txId,sdkCallBack);
          }   
        }catch(exception){
         alert(exception);   
        }       
     };
  
    NativeControllerIOS.prototype.signTransaction = function(status,txInfo,sdkCallBack) {
         try{
         if(HIDSdkWrapperClassObject){  
         HIDSdkWrapperClassObject.signTransactionTranscationIDCallback(status, txInfo, sdkCallBack);
          }   
        }catch(exception){
         alert(exception);   
        }
    };

    NativeControllerIOS.prototype.generateSynchronousOTP = function(userId,sdkCallBack){
      
        try{
         if(HIDSdkWrapperClassObject){  
         HIDSdkWrapperClassObject.generateSynchronousOTPCallback(userId,sdkCallBack);
          }   
        }catch(exception){
         alert(exception);   
        }
    };
  
    NativeControllerIOS.prototype.generateOCRAOTP = function(userId,txInput,sdkCallBack){
      
        try{
         if(HIDSdkWrapperClassObject){  
         HIDSdkWrapperClassObject.generateOCRAOTPTxInputCallback(userId,txInput,sdkCallBack);
          }   
        }catch(exception){
         alert(exception);   
        }
    };
  
     NativeControllerIOS.prototype.getUserPendingTransactions = function(userId) {
       
       try{
         if(HIDSdkWrapperClassObject){  
          return HIDSdkWrapperClassObject.getUserPendingTransactions(userId);
         }   
        }catch(exception){
         alert(exception);   
        }
       
      };

      NativeControllerIOS.prototype.updatePin = function(userId,oldPin,newPin,jsCallBack) {
        
         try{
         if(HIDSdkWrapperClassObject){  
         HIDSdkWrapperClassObject.updatePinOldPasswordNewPasswordCallback(userId,oldPin,newPin,jsCallBack);
         }   
        }catch(exception){
         alert(exception);   
        }
      };

   
     NativeControllerIOS.prototype.getAllContainers = function() {
       
      try{
         if(HIDSdkWrapperClassObject){  
           var containers = HIDSdkWrapperClassObject.getAllContainers();
           return containers;
          }   
        }catch(exception){
         alert(exception);   
        }      
    };
    
    NativeControllerIOS.prototype.renewContainer = function(noOfdaysBeforeExpiry,renewalObj,jsCallBack) {
       try{
        if(HIDSdkWrapperClassObject){
          HIDSdkWrapperClassObject.renewContainerActivationObjCallBack(noOfdaysBeforeExpiry,renewalObj,jsCallBack);
         }
       } catch(exception) {
         kony.application.dismissLoadingScreen();
         jsCallBack(0);
       }
     }
  
     NativeControllerIOS.prototype.enableBiometricAuthentication = function(userId,password,jsCallBack) {
     
        try{
         if(HIDSdkWrapperClassObject){  
           HIDSdkWrapperClassObject.enablebiometricAuthenticationPasswrdCallBack(userId,password,jsCallBack);
          }   
        }catch(exception){
         alert(exception);   
        }      
    }
     
      NativeControllerIOS.prototype.isDeviceBiometricAvailable = function() {
     
         try{
         if(HIDSdkWrapperClassObject){  
          return HIDSdkWrapperClassObject.isDeviceBiometricAvailable();
          }   
        }catch(exception){
         alert(exception);   
        } 
    }
       
       NativeControllerIOS.prototype.resetBiometricPrompt = function(userId) {
     
         try{
         if(HIDSdkWrapperClassObject){  
         HIDSdkWrapperClassObject.isDeviceBiometricAvailable(userId);
          }   
        }catch(exception){
         alert(exception);   
        }
     
      }
      NativeControllerIOS.prototype.isBiometricEnabled = function(userId) {
     
         try{
         if(HIDSdkWrapperClassObject){  
          return HIDSdkWrapperClassObject.isBioMetricEnabled(userId);
          }   
        }catch(exception){
         alert(exception);   
        } 
     
      },
     NativeControllerIOS.prototype.isFaceIDSupport = function() {
     
         try{
         if(HIDSdkWrapperClassObject){  
          return HIDSdkWrapperClassObject.isFaceIDSupport();
          }   
        }catch(exception){
         alert(exception);   
        } 
     
      }
   
  return NativeControllerIOS;
});
