	define(['./ViewController'], function(ViewController) {
  var constantMap = {
       "201":"Approve Card Action",
       "202":"Approve Payment",
       "203":"Approve Device Action",
       "204":"Approve Profile Update",
       "205":"Approve Cheque Book Action",
       "206":"Approve SignIn",
       "207":"Approve Reset Password",
       "208":"Skip/Cancel Transaction"
  };
  var ControllerImplementation = function(componentInstance) {
    this.componentInstance = componentInstance;
    this.componentName='hidapprove/sdk';
    this.viewController = new ViewController(componentInstance,this);
    this.getNativeController = function() {
      try {
        if (this.nativeControllerInstance === undefined) {
          var deviceInfo = kony.os.deviceInfo();
          var platformName = null;
          if (deviceInfo.name.toLowerCase() === 'android') {
            platformName = 'Android';
          }else if (deviceInfo.name.toLowerCase() === 'iphone') {
            platformName = 'IOS';
          }else {
            platformName = deviceInfo.name.charAt(0).toUpperCase() + deviceInfo.name.slice(1);
          }
          var nativeControllerPath = "com/temenos/" + this.componentName + "/NativeController" + platformName + ".js";
          var nativeController = require(nativeControllerPath);
          this.nativeControllerInstance = new nativeController(this.componentInstance,this.viewController);
        }
        return this.nativeControllerInstance;
      } catch (exception) {
        throw new Error(exception);
      }
    };
  };
  
  /**
     * @api : doDeviceProvisioning
     * @description : API to create a service/container.
     * @param : activationObj - The activation object is required.It should contain following keys- pushId,userId,serverURL, inviteCode.
     * @return : true/false - Returns true in case of successful service creation,otherwise false
     */
  ControllerImplementation.prototype.doDeviceProvisioning = function(activationObj,provisionCallBack){
     this.getNativeController().doDeviceProvisioning(activationObj,provisionCallBack);
  };
      
  
  ControllerImplementation.prototype.setContainerPin = function(pin, pincallback){
     this.getNativeController().setContainerPin(pin, pincallback);
  };
      
  ControllerImplementation.prototype.updatePushRegistrationToken = function(pushId){
     this.getNativeController().updatePushRegistrationToken(pushId);
  };
   
      
      
  /**
     * @api : getAllContainers
     * @description : API to return all containers in a device
     * @return : array of all containers
     */
  ControllerImplementation.prototype.getAllContainers = function(){
    return this.getNativeController().getAllContainers();
  };
   
  /**
     * @api : showApprovalScreen
     * @description : API to show transaction approval screen when notification comes up
     * @param : notificationMessage- Responsr from notification
     * @return : void
     */
  ControllerImplementation.prototype.showApprovalScreen = function(notificationMessage,sdkCallBack) {
    var self = this;
    this.componentInstance.notificationMessage = notificationMessage;
    if(notificationMessage.tds)
    {
        var deviceInfo = kony.os.deviceInfo();
        var pushText = "";
        var txInfo = this.getNativeController().retrieveTransactionInfo(notificationMessage.tds,sdkCallBack);
        if (deviceInfo.name.toLowerCase() === 'android') {
            pushText = txInfo.toString();
        }else if (deviceInfo.name.toLowerCase() === 'iphone') {
            pushText = this.getNativeController().retrieveTransactionMessage(notificationMessage.tds,sdkCallBack);
        }
        if(pushText){
            var pushTextArray = pushText.split("|");
            this.componentInstance.view.lblNotification.text = pushTextArray[0];
            this.componentInstance.view.lblHeader.text = constantMap[pushTextArray[1]];
        }
   	    this.componentInstance.view.lblNotification.setEnabled(false);
        this.viewController.showApprovalScreen();
     
       this.componentInstance.view.btnDecisionYes.onClick = function(){
          var result = self.getNativeController().signTransaction("accept", txInfo,sdkCallBack);
         
          
       }

        this.componentInstance.view.btnDecisionNo.onClick = function(){
           var result = self.getNativeController().signTransaction("deny", txInfo,sdkCallBack);
         
        }
      
    }
  };
      
   ControllerImplementation.prototype.generateSynchronousOTP = function(userId,sdkCallBack){
     this.getNativeController().generateSynchronousOTP(userId,sdkCallBack);
   };
      
   ControllerImplementation.prototype.generateOCRAOTP = function(userId,txInput,sdkCallBack){
     this.getNativeController().generateOCRAOTP(userId,txInput,sdkCallBack);
   };
  /**
     * @api : hideApprovalScreen
     * @description : API to hide transaction approval screen 
     * @return : void
     */
  ControllerImplementation.prototype.hideApprovalScreen = function() {
    this.viewController.hideApprovalScreen();
  };
   
  /**
     * @api : signTransaction
     * @description :API to sign the transaction on the basis of status{approve.deny}
     * @param : status - {approve / deny}
     * @param : transactionID - {tds from notification response}
     * @param : password - 
     * @return : true/false - Returns true in case of successful transaction signing,otherwise false
     */
  ControllerImplementation.prototype.signTransaction = function(status, txInfo) {
    let result = this.getNativeController().signTransaction(status, txInfo);
    if(result && status === "accept") {
      alert("Transaction has been successfully validated!");
    } else {
      alert("Transaction has been rejected!");
    }
    this.hideApprovalScreen();
  }; 

   ControllerImplementation.prototype.getUserPendingTransactions = function(userId){
     return this.getNativeController().getUserPendingTransactions(userId);
   };
      
   ControllerImplementation.prototype.updatePin = function(userId,oldPin,newPin,jsCallBack){
      this.getNativeController().updatePin(userId,oldPin,newPin,jsCallBack);
   };
      ControllerImplementation.prototype.enableBiometricAuthentication = function(userId,password,jsCallBack) {
        this.getNativeController().enableBiometricAuthentication(userId,password,jsCallBack);  
      };

      ControllerImplementation.prototype.isDeviceBiometricAvailable = function() {
        return this.getNativeController().isDeviceBiometricAvailable();   
      };

      ControllerImplementation.prototype.setBiometricPrompt = function(userId,jsCallBack) {
        this.getNativeController().setBiometricPrompt(userId,jsCallBack);    
      };
      ControllerImplementation.prototype.resetBiometricPrompt = function(userId){
        this.getNativeController().resetBiometricPrompt(userId);
      },
        ControllerImplementation.prototype.renewContainer=function(noOfdaysBeforeExpiry,renewalObj,jsCallBack) {
        this.getNativeController().renewContainer(noOfdaysBeforeExpiry,renewalObj,jsCallBack);
      },
      ControllerImplementation.prototype.isBiometricEnabled=function(userId) {
        return this.getNativeController().isBiometricEnabled(userId);
      },
      ControllerImplementation.prototype.isFaceIDSupport=function() {
        return this.getNativeController().isFaceIDSupport();
      },
        ControllerImplementation.prototype.checkBiometricsEnabledForUsers= function(){
          var regUserList = this.getAllContainers();
          var containerList = JSON.parse(regUserList).containers;
          for(var index = 0; index < containerList.length; index++)
          {
            var userId = JSON.parse(containerList[index]).userId;
            var isBiometricEnabledForUser = this.isBiometricEnabled(userId);
            if(isBiometricEnabledForUser)
              return true;
          }
          return false;
        }


  return ControllerImplementation;
});
