define(['./KonyLogger'], function(konyLoggerModule) {
  var konymp = konymp || {};
  
  konymp.logger = (new konyLoggerModule("Approve SDK NativeControllerAndroid Component")) || function() {};
  var NativeControllerAndroid = function(componentInstance,viewControllerInstance) {
    konymp.logger.trace("-- Start constructor NativeControllerAndroid --", konymp.logger.FUNCTION_ENTRY);
    this.componentInstance = componentInstance;
    this.viewControllerInstance = viewControllerInstance;
    this.importAllPackages();
    this.connectionConfiguration = null;
    konymp.logger.trace("-- Exit constructor NativeControllerAndroid -- ", konymp.logger.FUNCTION_EXIT);
  };
  /**
     * @api : importAllPackages
     * @description : api to import all required packages
     * @return : void
     */
  NativeControllerAndroid.prototype.importAllPackages =  function() {
    
    this.context = java.import("com.konylabs.android.KonyMain").getActivityContext();
    this.sdkWrapper = java.callStaticMethod("com.temenos.unikenwrapper.SDKWrapper", "getInstance");
    
  };
  
  NativeControllerAndroid.prototype.initializeSDK = function(provisionCallBack) {
        try {
            if (this.sdkWrapper) {
                this.sdkWrapper.intializeSDK(this.context, provisionCallBack);
            }
        } catch (exception) {
            kony.application.dismissLoadingScreen();
        }
    };
    NativeControllerAndroid.prototype.unikenSDKPassword = function(passwordServiceKeyJSON, unikenPwdCallBack) {
        try {
            if (this.sdkWrapper) {
                passwordServiceKeyJSON.deviceFriendlyName = kony.os.deviceInfo().name + " " + kony.os.deviceInfo().model;
                this.sdkWrapper.setPassword(JSON.stringify(passwordServiceKeyJSON), unikenPwdCallBack);
            }
        } catch (exception) {
            kony.application.dismissLoadingScreen();
        }
    };
    NativeControllerAndroid.prototype.unikenSDKLoginPassword = function(passwordServiceKeyJSON, unikenPwdLoginCallBack) {
        try {
            if (this.sdkWrapper) {
                this.sdkWrapper.setLoginPassword(JSON.stringify(passwordServiceKeyJSON), unikenPwdLoginCallBack);
            }
        } catch (exception) {
            kony.application.dismissLoadingScreen();
        }
    };
    NativeControllerAndroid.prototype.logOffSDKControllImplementNativeandroid = function(UserIdJSON, logOffSDKCallBack) {
        try {
            if (this.sdkWrapper) {
                this.sdkWrapper.setUserLogoff(JSON.stringify(UserIdJSON), logOffSDKCallBack);
            }
        } catch (exception) {
            kony.application.dismissLoadingScreen();
        }
    };
    NativeControllerAndroid.prototype.getAllchallengesNativeandroid = function(getAllChallengesCallBack) {
        try {
            if (this.sdkWrapper) {
                this.sdkWrapper.getAllChallengesPassword(getAllChallengesCallBack);
            }
        } catch (exception) {
            kony.application.dismissLoadingScreen();
        }
    };
    NativeControllerAndroid.prototype.setfrgtPwdNativeAndroid = function(forgotPwdUnikenCallback) {
        try {
            if (this.sdkWrapper) {
                this.sdkWrapper.forgotPassword(forgotPwdUnikenCallback);
            }
        } catch (exception) {
            kony.application.dismissLoadingScreen();
        }
    };
    NativeControllerAndroid.prototype.setAccessCodefrgtNativeAndroid = function(UserNameActivationCodeJSON, accessCodeUnikenCallback) {
        try {
            if (this.sdkWrapper) {
                this.sdkWrapper.setAccessCode(JSON.stringify(UserNameActivationCodeJSON), accessCodeUnikenCallback);
            }
        } catch (exception) {
            kony.application.dismissLoadingScreen();
        }
    };
  
  /**
     * @api : doDeviceProvisioning
     * @description : This function creates a service/container.
     * @param : activationObj - The activation object is required.It should contain following keys- pushId,userId,serverURL, inviteCode.
     * @return : true/false - Returns true in case of successful service creation,otherwise false
     */
  NativeControllerAndroid.prototype.doDeviceProvisioning = function(activationObj,provisionCallBack) {
      try{
          if(this.sdkWrapper){
             activationObj.deviceFriendlyName = kony.os.deviceInfo().name + " " + kony.os.deviceInfo().model;
          	 this.sdkWrapper.provisionContainer(this.context, JSON.stringify(activationObj), provisionCallBack);
          }

      } catch(exception) {
        kony.application.dismissLoadingScreen();
      } 
  };
  NativeControllerAndroid.prototype.setUserLoginandroid = function(activationObj, provisionCallBack) {
        try {
            if (this.sdkWrapper) {
                this.sdkWrapper.setUserLogin(JSON.stringify(activationObj), provisionCallBack);
            }
        } catch (exception) {
            kony.application.dismissLoadingScreen();
        }
    };
  NativeControllerAndroid.prototype.setContainerPin = function(pin, pincallback){
     try{
          if(this.sdkWrapper){
          	 this.sdkWrapper.setContainerPin(pin, pincallback);
          }

      } catch(exception) {
        kony.application.dismissLoadingScreen();
      } 
    
  };
  
  NativeControllerAndroid.prototype.updatePushRegistrationToken = function(pushId){
     try{
          if(this.sdkWrapper){
          	 this.sdkWrapper.updatePushRegistrationToken(this.context,pushId);
          }

      } catch(exception) {
        kony.application.dismissLoadingScreen();
      } 
    
  };
  
  
   NativeControllerAndroid.prototype.retrieveTransactionInfo = function(txId,sdkCallBack){
       try{
          if(this.sdkWrapper){
            return this.sdkWrapper.retrieveTransactionInfo(this.context,txId.toString(),sdkCallBack);
          }
        }catch(exception){
        	alert(exception);   
        }
  };
  
  NativeControllerAndroid.prototype.generateSynchronousOTP = function(userId,sdkCallBack){
       try{
          if(this.sdkWrapper){
            return this.sdkWrapper.generateSynchronousOTP(this.context,userId,sdkCallBack);
          }
             
       }catch(exception){
         alert(exception);
       }
   };    
  
   NativeControllerAndroid.prototype.generateOCRAOTP = function(userId,txInput,sdkCallBack){
       try{
          if(this.sdkWrapper){
            return this.sdkWrapper.generateOCRAOTP(this.context,userId,txInput,sdkCallBack);
          }
             
       }catch(exception){
         alert(exception);
       }
   }; 
  
  NativeControllerAndroid.prototype.changeUnikenuserPassword = function(UserChangePasswordJSON, unikenChangePwdSDKCallBack) {
        try {
            if (this.sdkWrapper) {
                this.sdkWrapper.updateUnikenUserPassword(JSON.stringify(UserChangePasswordJSON), unikenChangePwdSDKCallBack);
            }
        } catch (exception) {
            alert(exception);
        }
    };
  
  /**
     * @api : getAllContainers
     * @description : API to return all containers in a device
     * @return : array of all containers
     */
  NativeControllerAndroid.prototype.getAllContainers = function() {
    return this.sdkWrapper.getAllContainers(this.context);
  };
  
  /**
     * @api : signTransaction
     * @description :API to sign the transaction on the basis of status{approve.deny}
     * @param : status - {approve / deny}
     * @param : transactionID - {tds from notification response}
     * @param : txInfo - 
     * @return : true/false - Returns true in case of successful transaction signing,otherwise false
     */
  NativeControllerAndroid.prototype.signTransaction = function(status,txInfo,sdkCallBack) {

    return this.sdkWrapper.signTransaction(this.context,status,txInfo,sdkCallBack);
    
  };
  
   NativeControllerAndroid.prototype.getUserPendingTransactions = function(userId) {
    return this.sdkWrapper.getUserPendingTransactions(this.context,userId);
  };
  
  NativeControllerAndroid.prototype.updatePin = function(userId,oldPin,newPin,jsCallBack) {

    this.sdkWrapper.updatePin(this.context,userId,oldPin,newPin,jsCallBack);
    
  };
   NativeControllerAndroid.prototype.enableBiometricAuthentication = function(userId,password,jsCallBack) {
    this.sdkWrapper.enableBiometricAuthentication(this.context,userId,password,jsCallBack);  
  };
  
  NativeControllerAndroid.prototype.isDeviceBiometricAvailable = function() {
    return this.sdkWrapper.isDeviceBiometricAvailable(this.context);   
  };
  
  NativeControllerAndroid.prototype.setBiometricPrompt = function(userId,jsCallBack) {
    this.sdkWrapper.setBiometricPrompt(this.context,userId,jsCallBack);    
  };
  NativeControllerAndroid.prototype.resetBiometricPrompt = function(userId){
    this.sdkWrapper.resetBiometricPrompt(userId);
  },
   NativeControllerAndroid.prototype.renewContainer=function(noOfdaysBeforeExpiry,renewalObj,jsCallBack) {
    try{
      this.sdkWrapper.renewContainer(this.context,noOfdaysBeforeExpiry,renewalObj,jsCallBack);
    } catch(exception) {
      kony.application.dismissLoadingScreen();
      jsCallBack(0);
    } 
  },
    NativeControllerAndroid.prototype.isBiometricEnabled=function(userId) {
    return this.sdkWrapper.isBiometricEnabled(userId);
  },
    NativeControllerAndroid.prototype.isFaceIDSupport=function() {
    return false;
  }
  return NativeControllerAndroid;
});