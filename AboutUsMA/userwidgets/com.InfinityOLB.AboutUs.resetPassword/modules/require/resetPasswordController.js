define(function() {
  return {
    userName:"",
    servicekey:"",
    securityKey: "",
    unmaskedphoneNumber:"",
    unmaskedemail:"",
    MFAResponse:{},
    selectedPhone:"",
    selectedEmail:"",
    
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._buttonEnabledSkin = "";
      this._buttonDisabledSkin = "";
      this._sknLblOTPEmpty = "";
      this._sknLblOTPNotEmpty = "";
      this._sknFlxOTPEmpty = "";
      this._sknFlxOTPNotEmpty = "";
      this._sknFlxNormalSkin = "";
      this.keypadString = '';
      this.maxNoOfCode = 6;
      this.pos = 0;
      this._objectName="";
      this._passwordPolicyService="";
      this._requestResetPasswordOTP="";
      this._verifyMFAOTP="";
      this._textVisiblityOffIcon= "",
      this._textVisiblityOnIcon= "",
      this._tickGrayIcon= "",
      this._tickGreenIcon= "",
      this._passwordUpdateService="",

      this.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
      this.repeatedCharRegex = /(.)\\1{4}/;

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "buttonEnabledSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._buttonEnabledSkin=val;          
        }
      });
      defineGetter(this, "buttonEnabledSkin", function() {
        return this._buttonEnabledSkin;
      });
      defineSetter(this, "buttonDisabledSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._buttonDisabledSkin=val;          
        }
      });
      defineGetter(this, "buttonDisabledSkin", function() {
        return this._buttonDisabledSkin;
      });
      defineSetter(this, "sknLblOTPEmpty", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknLblOTPEmpty=val;          
        }
      });
      defineGetter(this, "sknLblOTPEmpty", function() {
        return this._sknLblOTPEmpty;
      });
      defineSetter(this, "sknLblOTPNotEmpty", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknLblOTPNotEmpty=val;          
        }
      });
      defineGetter(this, "sknLblOTPNotEmpty", function() {
        return this._sknLblOTPNotEmpty;
      });
      defineSetter(this, "sknFlxOTPEmpty", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknFlxOTPEmpty=val;          
        }
      });
      defineGetter(this, "sknFlxOTPEmpty", function() {
        return this._sknFlxOTPEmpty;
      });
      defineSetter(this, "sknFlxOTPNotEmpty", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknFlxOTPNotEmpty=val;          
        }
      });
      defineGetter(this, "sknFlxOTPNotEmpty", function() {
        return this._sknFlxOTPNotEmpty;
      });
      defineSetter(this, "sknFlxNormalSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknFlxNormalSkin=val;          
        }
      });
      defineGetter(this, "sknFlxNormalSkin", function() {
        return this._sknFlxNormalSkin;
      });
      defineSetter(this, "passwordPolicyService", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._passwordPolicyService=val;          
        }
      });
      defineGetter(this, "passwordPolicyService", function() {
        return this._passwordPolicyService;
      });
      defineSetter(this, "object", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._objectName=val;          
        }
      });
      defineGetter(this, "object", function() {
        return this._objectName;
      });
      defineSetter(this, "requestResetPasswordOTP", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._requestResetPasswordOTP=val;          
        }
      });
      defineGetter(this, "requestResetPasswordOTP", function() {
        return this._requestResetPasswordOTP;
      });
      defineSetter(this, "verifyMFAOTP", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._verifyMFAOTP=val;          
        }
      });
      defineGetter(this, "verifyMFAOTP", function() {
        return this._verifyMFAOTP;
      });
      defineSetter(this, "textVisiblityOffIcon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textVisiblityOffIcon=val;          
        }
      });
      defineGetter(this, "textVisiblityOffIcon", function() {
        return this._textVisiblityOffIcon;
      });
      defineSetter(this, "textVisiblityOnIcon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textVisiblityOnIcon=val;          
        }
      });
      defineGetter(this, "textVisiblityOnIcon", function() {
        return this._textVisiblityOnIcon;
      });
      defineSetter(this, "tickGrayIcon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tickGrayIcon=val;          
        }
      });
      defineGetter(this, "tickGrayIcon", function() {
        return this._tickGrayIcon;
      });
      defineSetter(this, "tickGreenIcon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tickGreenIcon=val;          
        }
      });
      defineGetter(this, "tickGreenIcon", function() {
        return this._tickGreenIcon;
      });

      defineSetter(this, "passwordUpdateService", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._passwordUpdateService=val;          
        }
      });
      defineGetter(this, "passwordUpdateService", function() {
        return this._passwordUpdateService;
      });

      
    },

    preshow: function(){
      this.setFlowActions();
      this.resetUI();
    },

    setFlowActions: function(){
      let scopeObj = this;

      scopeObj.view.lblResend.onTouchStart = function(){
        scopeObj.resendMFAOTP();
      };

      scopeObj.view.lblCVV.onTouchStart = function(){
        alert("Use CVV");
      };

      scopeObj.view.keypad.btnOne.onClick = function(){
        scopeObj.setKeypadChar("1");
      };

      scopeObj.view.keypad.btnTwo.onClick = function(){
        scopeObj.setKeypadChar("2");
      };

      scopeObj.view.keypad.btnThree.onClick = function(){
        scopeObj.setKeypadChar("3");
      };

      scopeObj.view.keypad.btnFour.onClick = function(){
        scopeObj.setKeypadChar("4");
      };

      scopeObj.view.keypad.btnFive.onClick = function(){
        scopeObj.setKeypadChar("5");
      };

      scopeObj.view.keypad.btnSix.onClick = function(){
        scopeObj.setKeypadChar("6");
      };

      scopeObj.view.keypad.btnSeven.onClick = function(){
        scopeObj.setKeypadChar("7");
      };

      scopeObj.view.keypad.btnEight.onClick = function(){
        scopeObj.setKeypadChar("8");
      };

      scopeObj.view.keypad.btnNine.onClick = function(){
        scopeObj.setKeypadChar("9");
      };

      scopeObj.view.keypad.btnZero.onClick = function(){
        scopeObj.setKeypadChar("0");
      };

      scopeObj.view.keypad.imgClearKeypad.onTouchStart = function(){
        scopeObj.clearKeypadChar();
      };

      scopeObj.view.customHeaderOption.btnRight.onClick = function(){
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmForgot", undefined);
        navManager.navigateTo("frmLogin");
      };

      scopeObj.view.btnNext.onClick = function(){
        scopeObj.verifyOTP();
      };

      scopeObj.view.tbxPassword.onTouchStart = function(){
        scopeObj.enableSetPasswordButtonAndTickMark();
      };
      scopeObj.view.tbxPassword.onTextChange = function(){
        scopeObj.enableSetPasswordButtonAndTickMark();
      };
      scopeObj.view.tbxCnfPassword.onTouchStart = function(){
        scopeObj.enableSetPasswordButtonAndTickMark();
      };
      scopeObj.view.tbxCnfPassword.onTextChange = function(){
        scopeObj.enableSetPasswordButtonAndTickMark();
      };
      // scopeObj.view.tbxPassword.onDone = function(){
      //   scopeObj.verifyPassword(scopeObj.view.tbxPassword);
      // };

      // scopeObj.view.tbxCnfPassword.onDone = function(){
      //   scopeObj.verifyPassword(scopeObj.view.tbxCnfPassword);
      // };

      scopeObj.view.btnSetPassword.onClick = function(){
        scopeObj.createPassword();
      };

      scopeObj.view.btnProceed.onClick = function(){
        if(scopeObj.onSuccessCallback)
          scopeObj.onSuccessCallback();
      };
      
      scopeObj.view.btnContinue.onClick = function(){
        scopeObj.view.flxSelectContact.setVisibility(false);
        scopeObj.view.flxContent.setVisibility(true);
        scopeObj.requestResetOTP();
      };

      scopeObj.view.imgEyeIcon.onTouchEnd = function(){
        scopeObj.flxNewPasswordVisiblityToggleOnClick();
      };
    },

    flxNewPasswordVisiblityToggleOnClick: function(){
      const scopeObj = this;
      if (scopeObj.view.imgEyeIcon.src === scopeObj._textVisiblityOffIcon) {
        scopeObj.view.imgEyeIcon.src = scopeObj._textVisiblityOnIcon;
        scopeObj.view.tbxPassword.secureTextEntry = false;
        scopeObj.view.flxPassword.forceLayout();
      } else {
        scopeObj.view.imgNewPasswordVisiblityToggle.src = scopeObj._textVisiblityOffIcon;
        scopeObj.view.tbxPassword.secureTextEntry = true;
        scopeObj.view.flxPassword.forceLayout();
      }
    },

    enableSetPasswordButtonAndTickMark: function(){
      const scopeObj = this;
      let isNewPasswordFilled = (scopeObj.view.tbxPassword.text!=='' && scopeObj.view.tbxPassword.text!==null && scopeObj.view.tbxPassword.text!==undefined) ? true : false;
      let isReEnterPasswordFilled = (scopeObj.view.tbxCnfPassword.text!=='' && scopeObj.view.tbxCnfPassword.text!==null && scopeObj.view.tbxCnfPassword.text!==undefined) ? true : false;
      if(isNewPasswordFilled && isReEnterPasswordFilled && scopeObj.view.tbxPassword.text===scopeObj.view.tbxCnfPassword.text && scopeObj.validatePassword()){
        scopeObj.view.imgCnfIcon.src = scopeObj._tickGreenIcon;
        scopeObj.view.btnSetPassword.setEnabled(true);
        scopeObj.view.btnSetPassword.skin = scopeObj._buttonEnabledSkin;
        scopeObj.view.flxSecurityRequirements.setVisibility(false);
      } else {
        scopeObj.view.imgCnfIcon.src = scopeObj._tickGrayIcon;
        scopeObj.view.btnSetPassword.setEnabled(false);
        scopeObj.view.btnSetPassword.skin = scopeObj._buttonDisabledSkin;
        scopeObj.view.flxSecurityRequirements.setVisibility(true);
      }
    },

     validatePassword: function(){
      const scopeObj = this;
      let password = scopeObj.view.tbxPassword.text;
      return scopeObj.isPasswordValidForPolicy(password);
    },

     /**
    * Helper function to check whether given password has any special characters present
    * @param {String} value - A string to check
    * @returns {Boolean} - true if valid, false if any invalid character present
    */
    isPasswordValidForPolicy: function(val)
    {
      if(val.match(this.passwordRegex) && !this.repeatedCharRegex.test(val))
      {
        return true;
      }
      return false;
    },

    resetOTPSkins: function(){
      let scopeObj = this;
      scopeObj.view.lblCode1.skin = scopeObj.sknLblOTPEmpty;
      scopeObj.view.lblCode2.skin = scopeObj.sknLblOTPEmpty;
      scopeObj.view.lblCode3.skin = scopeObj.sknLblOTPEmpty;
      scopeObj.view.lblCode4.skin = scopeObj.sknLblOTPEmpty;
      scopeObj.view.lblCode5.skin = scopeObj.sknLblOTPEmpty;
      scopeObj.view.lblCode6.skin = scopeObj.sknLblOTPEmpty;
      scopeObj.view.flxCodeline1.skin = scopeObj.sknFlxOTPEmpty;
      scopeObj.view.flxCodeline2.skin = scopeObj.sknFlxOTPEmpty;
      scopeObj.view.flxCodeline3.skin = scopeObj.sknFlxOTPEmpty;
      scopeObj.view.flxCodeline4.skin = scopeObj.sknFlxOTPEmpty;
      scopeObj.view.flxCodeline5.skin = scopeObj.sknFlxOTPEmpty;
      scopeObj.view.flxCodeline6.skin = scopeObj.sknFlxOTPEmpty;
    },

    resetUI: function(){
      let scopeObj = this;
      scopeObj.keypadString = '';
      scopeObj.pos = 0;
      scopeObj.view.customHeaderOption.lblLocateUs.text = scopeObj.getStringFromi18n("kony.mb.resetPassword.Forgotpassword");
      scopeObj.view.lbHeader.text = scopeObj.getStringFromi18n("kony.mb.resetPassword.EnterSecurityCode");
      scopeObj.view.lblErrorOtp.setVisibility(false);
      scopeObj.view.customHeaderOption.btnRight.setVisibility(true);
      scopeObj.view.flxContent.setVisibility(false);
      scopeObj.view.flxSecureCodeContainer.setVisibility(false);
      scopeObj.view.flxCreatePassword.setVisibility(false);
      scopeObj.view.flxSuccess.setVisibility(false);
      scopeObj.view.flxSelectContact.setVisibility(false);
      scopeObj.view.tbxPassword.secureTextEntry = true;
      scopeObj.view.tbxCnfPassword.secureTextEntry = true;
      scopeObj.resetOTPSkins();
      scopeObj.enableOrDisableButton(scopeObj.view.btnNext, false);
    },

    getStringFromi18n: function(value){
      return  kony.i18n.getLocalizedString(value) ? kony.i18n.getLocalizedString(value) : value;
    },

    enableOrDisableButton: function(widget, isEnabled){
      widget.setEnabled(isEnabled);
      widget.skin = isEnabled ? this.buttonEnabledSkin : this.buttonDisabledSkin;
    },

    setKeypadChar: function(num){
      let scopeObj = this;
      if(scopeObj.pos < scopeObj.maxNoOfCode){
        scopeObj.pos++;
        scopeObj.keypadString = scopeObj.keypadString + num;
        scopeObj.view["lblCode"+scopeObj.pos].skin = scopeObj.sknLblOTPNotEmpty;
      }
      if (scopeObj.pos >= scopeObj.MFAResponse.MFAAttributes.sacCodeLength){
        scopeObj.enableOrDisableButton(scopeObj.view.btnNext, true);
      }
    },

	setMaxNoOfChars : function(newMaxNoOfChars){
		this.view["flxDigit1"].left=((this.maxNoOfCode-newMaxNoOfChars)*12.5)/2 + "%";
		for(i=1;i<=newMaxNoOfChars;i++){
		  this.view["flxDigit"+i].setVisibility(true);
		}
		for(; i <= this.maxNoOfCode; i++) {
		  this.view["flxDigit"+i].setVisibility(false);
		}
	},
    clearKeypadChar: function(){
      let scopeObj = this;
      if(scopeObj.pos === 0){ 
        scopeObj.keypadString = "";
        scopeObj.resetOTPSkins();
      } else{
        var clearpos = scopeObj.pos--;
        scopeObj.view["lblCode"+clearpos].skin = scopeObj.sknLblOTPEmpty;
        scopeObj.keypadString = scopeObj.keypadString.substr(0, scopeObj.keypadString.length - 1);
      }
      scopeObj.enableOrDisableButton(scopeObj.view.btnNext, (scopeObj.pos >= scopeObj.MFAResponse.MFAAttributes.sacCodeLength));
    },

    clearKeypad: function(){
      let scopeObj = this;
      while(scopeObj.pos !== 0){ 
        scopeObj.resetOTPSkins();
        var clearpos = scopeObj.pos--;
        scopeObj.view["lblCode"+clearpos].skin = scopeObj.sknLblOTPEmpty;
      }
      scopeObj.keypadString = "";
      scopeObj.enableOrDisableButton(scopeObj.view.btnNext, (scopeObj.pos >= scopeObj.MFAResponse.MFAAttributes.sacCodeLength));
    },

    verifyPassword: function(txtWidget){
      let scopeObj = this;
      let pwdText = scopeObj.view.tbxPassword.text.trim();
      let cnfPwdText = scopeObj.view.tbxCnfPassword.text.trim();
      let isErrorText = (pwdText === "" || cnfPwdText === "" || pwdText !== cnfPwdText);
      scopeObj.view.imgEyeIcon.src = (txtWidget.id === "tbxPassword" && !isErrorText) ? "view.png" : "viewicon.png";
      scopeObj.view.imgCnfIcon.src = (txtWidget.id === "tbxCnfPassword" && !isErrorText) ? "successicon.png" : "tickmark.png";
      scopeObj.view.lblErrorPwd.setVisibility(isErrorText);
      scopeObj.view.flxSecurityRequirements.setVisibility(isErrorText);
      scopeObj.enableOrDisableButton(scopeObj.view.btnSetPassword, !isErrorText);
    },

    setPassword: function(){
      let scopeObj = this;
      scopeObj.view.flxContent.setVisibility(false);
      scopeObj.view.flxCreatePassword.setVisibility(false);
      scopeObj.view.lblUsername.text = scopeObj.userName;
      scopeObj.view.flxSuccess.setVisibility(true);
      scopeObj.view.customHeaderOption.lblLocateUs.text = scopeObj.getStringFromi18n("kony.mb.resetPassword.resetInformation");
      scopeObj.view.customHeaderOption.btnRight.setVisibility(false);
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmForgot", undefined);
    },

    navigateToMFA: function(userName, serviceKey){
      let scopeObj = this;
      scopeObj.userName = userName;
      scopeObj.serviceKey = serviceKey;

        applicationManager.getPresentationUtility().showLoadingScreen();
           var inputJSON = {
            "UserName": userName,
            "MFAAttributes" : {
             "serviceKey":  serviceKey
          }
        };

        var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectName);
        userRepo.customVerb(scopeObj._requestResetPasswordOTP, inputJSON, getAllCompletionCallback); 
        function getAllCompletionCallback(status, data, error) {
          var srh = applicationManager.getServiceResponseHandler();
          var obj = scopeObj.validateResponse(status, data, error);
          if (obj["status"] === true) {
            scopeObj.navigateToMFASuccessCallback(obj["data"]);
          }
          else {
            scopeObj.navigateToMFAErrorCallback(obj["data"]);
          }
        }      
    },

    navigateToMFASuccessCallback: function(res){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      let scopeObj = this;
      scopeObj.MFAResponse = res;
      if(scopeObj.MFAResponse.MFAAttributes){
        var communicationType = scopeObj.MFAResponse["MFAAttributes"].communicationType;
        if(communicationType === "DISPLAY_ALL"){
          scopeObj.displaySelectionScreen();
        }
        else{
          let scopeObj = this;
          scopeObj.securityKey = scopeObj.MFAResponse["MFAAttributes"].securityKey;
          scopeObj.servicekey = scopeObj.MFAResponse["MFAAttributes"].serviceKey;
          scopeObj.selectedPhone = scopeObj.MFAResponse["MFAAttributes"]["customerCommunication"]["phone"][0]["unmasked"];
          scopeObj.selectedEmail =  scopeObj.MFAResponse["MFAAttributes"]["customerCommunication"]["email"][0]["unmasked"];
          scopeObj.displayOTPScreen();
        }
      }
      else{
        alert(kony.i18n.getLocalizedString("kony.mb.An.Internal.Error.occured.Please.try.after.sometime."));
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmLogin");
      }
    },
   
    navigateToMFAErrorCallback: function(err){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
     if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
         }
         else{
            alert(kony.i18n.getLocalizedString("kony.mb.An.Internal.Error.occured.Please.try.after.sometime."));
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmLogin");
         }
    },

    requestResetOTP: function(){
      let scopeObj = this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        scopeObj.maskedphoneNumber = scopeObj.view.lbxRegisteredModePhone.selectedKeyValue[1];
        scopeObj.maskedemail = scopeObj.view.lbxRegisteredModeEmail.selectedKeyValue[1];
        scopeObj.selectedPhone = scopeObj.view.lbxRegisteredModePhone.selectedKeyValue[0];
        scopeObj.selectedEmail = scopeObj.view.lbxRegisteredModeEmail.selectedKeyValue[0];
         var inputJSON = {
          "UserName": scopeObj.userName,
          "MFAAttributes" : {
           "serviceKey":  scopeObj.serviceKey,
            "OTP": {
              "phone" : scopeObj.selectedPhone,
              "email" : scopeObj.selectedEmail
            }
        }
        };

        var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectName);
        userRepo.customVerb(scopeObj._requestResetPasswordOTP, inputJSON, getAllCompletionCallback); 
        function getAllCompletionCallback(status, data, error) {
          var srh = applicationManager.getServiceResponseHandler();
          var obj = scopeObj.validateResponse(status, data, error);
          if (obj["status"] === true) {
            scopeObj.requestResetPasswordOTPSuccessCallback(obj);
          }
          else {
            scopeObj.requestResetPasswordOTPErrorCallback(obj);
          }
        }      
    },

    requestResetPasswordOTPSuccessCallback: function(res){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      let scopeObj = this;
      if(res.serverErrorRes){
        scopeObj.MFAResponse = res.serverErrorRes; 
        alert(res.data.errorMessage);
      }else{
        scopeObj.MFAResponse = res.data;  
        scopeObj.securityKey = scopeObj.MFAResponse["MFAAttributes"].securityKey;
       var communicationType = scopeObj.MFAResponse["MFAAttributes"].communicationType;
       scopeObj.MFAResponse["MFAAttributes"]["phone"] = scopeObj.maskedphoneNumber;
       scopeObj.MFAResponse["MFAAttributes"]["email"] = scopeObj.maskedemail;
        scopeObj.displayOTPScreen();
      }
    },
   
    requestResetPasswordOTPErrorCallback: function(err){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
     if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
         }
         else{
            alert(kony.i18n.getLocalizedString("kony.mb.An.Internal.Error.occured.Please.try.after.sometime."));
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmLogin");
         }
    },

    resendMFAOTP: function(){
      let scopeObj = this;
      applicationManager.getPresentationUtility().showLoadingScreen();
      if(scopeObj.MFAResponse && scopeObj.MFAResponse.MFAAttributes.remainingResendAttempts < 1)
        scopeObj.view.lblResend.isVisible=false;
      else
        scopeObj.view.lblResend.isVisible=true;

      var inputJSON = {
        "UserName": scopeObj.userName,
        "MFAAttributes" : {
          "serviceKey":  scopeObj.serviceKey,
          "OTP": {
            "phone" : scopeObj.selectedPhone,
            "email" : scopeObj.selectedEmail,
            "securityKey" : scopeObj.securityKey
          }
        }
      };

      var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectName);
      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = scopeObj.validateResponse(status, data, error);
        if (obj["status"] === true) {
          scopeObj.requestResendPasswordOTPSuccessCallback(obj);
        }
        else {
          scopeObj.requestResendPasswordOTPErrorCallback(obj);
        }
      }
      userRepo.customVerb(scopeObj._requestResetPasswordOTP, inputJSON, getAllCompletionCallback);
    },

    requestResendPasswordOTPSuccessCallback: function(res){
     
       applicationManager.getPresentationUtility().dismissLoadingScreen();
      let scopeObj = this;
      if(res.serverErrorRes){
        if(!res.serverErrorRes.MFAAttributes){
          res.serverErrorRes.MFAAttributes = scopeObj.MFAResponse.MFAAttributes;
        }else{
          if(scopeObj.MFAResponse.MFAAttributes.failedAttempts){
            res.serverErrorRes.MFAAttributes.failedAttempts = scopeObj.MFAResponse.MFAAttributes.failedAttempts;
          }
          if(scopeObj.MFAResponse.MFAAttributes.maxFailedAttemptsAllowed){
            res.serverErrorRes.MFAAttributes.maxFailedAttemptsAllowed = scopeObj.MFAResponse.MFAAttributes.maxFailedAttemptsAllowed ;
          }
          if(scopeObj.MFAResponse.MFAAttributes.remainingFailedAttempts){
            res.serverErrorRes.MFAAttributes.remainingFailedAttempts = scopeObj.MFAResponse.MFAAttributes.remainingFailedAttempts;
          }
        }
        scopeObj.MFAResponse = res.serverErrorRes; 
        scopeObj.view.lblErrorOtp.text = res.data.errorMessage;
        scopeObj.view.lblErrorOtp.setVisibility(true);
        scopeObj.displayOTPScreen();
      }else{
        scopeObj.MFAResponse = res.data;  
        scopeObj.MFAResponse["MFAAttributes"]["phone"] = scopeObj.maskedphoneNumber;
        scopeObj.MFAResponse["MFAAttributes"]["email"] = scopeObj.maskedemail;
      }
      
    },
   
    requestResendPasswordOTPErrorCallback: function(err){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
     if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
         }
         else{
            alert(kony.i18n.getLocalizedString("kony.mb.An.Internal.Error.occured.Please.try.after.sometime."));
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmLogin");
         }
    },
   
      
    displaySelectionScreen :  function(){
      let scopeObj = this;
      if(scopeObj.MFAResponse.MFAAttributes && scopeObj.MFAResponse.MFAAttributes.customerCommunication){
      for(var i in scopeObj.MFAResponse.MFAAttributes.customerCommunication.phone)
        scopeObj.MFAResponse.MFAAttributes.customerCommunication.phone[i].unmasked = scopeObj.MFAResponse.MFAAttributes.customerCommunication.phone[i].referenceId;
      for(var j in scopeObj.MFAResponse.MFAAttributes.customerCommunication.email)
        scopeObj.MFAResponse.MFAAttributes.customerCommunication.email[j].unmasked = scopeObj.MFAResponse.MFAAttributes.customerCommunication.email[j].referenceId;
      }
      

      var customerCommunicationInfo = scopeObj.MFAResponse.MFAAttributes.customerCommunication;

      scopeObj.view.flxSelectContact.setVisibility(true);
      scopeObj.view.flxContent.setVisibility(false);
      scopeObj.view.flxSuccess.setVisibility(false);
      scopeObj.view.lbxRegisteredModePhone.masterData = scopeObj.setDataForListBox(customerCommunicationInfo.phone);
      scopeObj.view.lbxRegisteredModeEmail.masterData = scopeObj.setDataForListBox(customerCommunicationInfo.email);
      scopeObj.view.lbxRegisteredModePhone.selectedKey = scopeObj.view.lbxRegisteredModePhone.masterData[0][0];
      scopeObj.view.lbxRegisteredModeEmail.selectedKey = scopeObj.view.lbxRegisteredModeEmail.masterData[0][0];

    },

  setDataForListBox:function(phoneObj){
      var phoneNumbers = phoneObj.map(function (dataItem) {
        var phoneNumber = [];
        phoneNumber.push(dataItem.unmasked);
        phoneNumber.push(dataItem.masked);
        return phoneNumber;
      });
      return phoneNumbers;
    },

    displayOTPScreen:function(){
      let scopeObj = this;
      scopeObj.view.flxContent.setVisibility(true);
      scopeObj.view.flxSecureCodeContainer.setVisibility(true);
      scopeObj.view.flxCreatePassword.setVisibility(false);
      scopeObj.view.flxSelectContact.setVisibility(false);
      scopeObj.view.flxSuccess.setVisibility(false);

        if (scopeObj.MFAResponse.MFAAttributes.isOTPExpired) {
            scopeObj.view.lblErrorOtp.text = kony.i18n.getLocalizedString("kony.mb.mfa.otpexpirymessage");
            scopeObj.view.lblErrorOtp.setVisibility(true);
            scopeObj.clearKeypad();
        } else if (scopeObj.MFAResponse.MFAAttributes.remainingResendAttempts <= 0) {
            scopeObj.view.lblResend.setVisibility(false);
            scopeObj.view.lblErrorOtp = "OTP request limit is excceeded than allowed number.";
            scopeObj.view.lblErrorOtp.setVisibility(true);
        } else if (scopeObj.MFAResponse.MFAAttributes.remainingResendAttempts > 0) {
            scopeObj.view.lblResend.setVisibility(true);
        }
        scopeObj.setFormUIBasedOnCommunicationType();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    setFormUIBasedOnCommunicationType: function() {
      let scopeObj = this;
        var communicationType = scopeObj.MFAResponse.MFAAttributes.communicationType;
        if (communicationType == "DISPLAY_NO_VALUE") {
            var customerCommunicationInfo = scopeObj.MFAResponse.MFAAttributes.customerCommunication;
            scopeObj.view.lblSubtitle.text = "Please enter the " + scopeObj.MFAResponse.MFAAttributes.sacCodeLength + " digit security code sent to your primary email/phone number.";
            scopeObj.view.flxDetails.setVisibility(false);
        } else if (communicationType == "DISPLAY_ALL") {
            // this.view.lblEnterInfoSubtitle.text = "Please enter the "+ this.maxNoOfCode +" digit security code sent to";
            var phone = scopeObj.MFAResponse.MFAAttributes.phone;
            var email = scopeObj.MFAResponse.MFAAttributes.email;
            if (phone !== undefined && email !== undefined) {
                scopeObj.view.lblSubtitle.text = "Enter Secure Access Code sent on your " + scopeObj.MFAResponse.MFAAttributes.phone + " & " + scopeObj.MFAResponse.MFAAttributes.email;
                //  this.view.lblMobNoValue.text = mfaResponse.MFAAttributes.customerCommunication.phone[0].masked;
                //  this.view.lblEmailIdValue.text = mfaResponse.MFAAttributes.customerCommunication.email[0].masked;
            } else if (phone === undefined) {
                scopeObj.view.lblSubtitle.text = "Enter Secure Access Code sent on your " + scopeObj.MFAResponse.MFAAttributes.email;
                // this.view.lblAnd.setVisibility(false);
                //   this.view.lblEmailIdValue.setVisibility(false);
            } else {
                scopeObj.view.lblSubtitle.text = "Enter Secure Access Code sent on your " + scopeObj.MFAResponse.MFAAttributes.phone;
                //     this.view.lblEmailIdValue.setVisibility(false);
                //     this.view.lblAnd.setVisibility(false);
            }
        } else {
            scopeObj.view.lblSubtitle.text = "Please enter the " + scopeObj.MFAResponse.MFAAttributes.sacCodeLength + " digit security code";
        }

        scopeObj.setMaxNoOfChars(scopeObj.MFAResponse.MFAAttributes.sacCodeLength);
    },

    verifyOTP: function(){
      let scopeObj = this;
      applicationManager.getPresentationUtility().showLoadingScreen();
      var otp = scopeObj.keypadString;
        var inputJSON ={
        "MFAAttributes":{
            "serviceKey":scopeObj.serviceKey,
            "OTP":{
              "securityKey":scopeObj.securityKey,
                "otp": otp
              }
          }
      }
        
      scopeObj.getPasswordRulesAndPolicy();
      var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectName);
      userRepo.customVerb(scopeObj._verifyMFAOTP, inputJSON, getAllCompletionCallback);
      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = scopeObj.validateResponse(status, data, error);
        if (obj["status"] === true) {
          scopeObj.verifyMFAOTPSuccessCallback(obj);
        }
        else {
          scopeObj.verifyMFAOTPErrorCallback(obj);
        }
      }
    },

     verifyMFAOTPSuccessCallback: function(res){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      let scopeObj = this;
      if(res.serverErrorRes){
        if(!res.serverErrorRes.MFAAttributes){
          res.serverErrorRes.MFAAttributes = scopeObj.MFAResponse.MFAAttributes;
        }else{
          if(scopeObj.MFAResponse.MFAAttributes.sacCodeLength){
            res.serverErrorRes.MFAAttributes.sacCodeLength = scopeObj.MFAResponse.MFAAttributes.sacCodeLength;
          }
          if(scopeObj.MFAResponse.MFAAttributes.sacMaxResendRequestsAllowed){
            res.serverErrorRes.MFAAttributes.sacMaxResendRequestsAllowed = scopeObj.MFAResponse.MFAAttributes.sacMaxResendRequestsAllowed ;
          }
          if(scopeObj.MFAResponse.MFAAttributes.remainingResendAttempts){
            res.serverErrorRes.MFAAttributes.remainingResendAttempts = scopeObj.MFAResponse.MFAAttributes.remainingResendAttempts;
          }
          if(scopeObj.MFAResponse.MFAAttributes.communicationType){
            res.serverErrorRes.MFAAttributes.communicationType = scopeObj.MFAResponse.MFAAttributes.communicationType;
          }
        }
        scopeObj.MFAResponse = res.serverErrorRes; 
        scopeObj.view.lblErrorOtp.text = res.data.errorMessage;
        scopeObj.showIncorrectOTPError(res.serverErrorRes);
      }else{
        scopeObj.displaypasswordScreen();
      }
    },

   verifyMFAOTPErrorCallback: function(err){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
         }
        else {
          alert(kony.i18n.getLocalizedString("kony.mb.An.Internal.Error.occured.Please.try.after.sometime."));
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmLogin");
         }
    },


    displaypasswordScreen :  function(){
      let scopeObj = this;
      scopeObj.view.flxSelectContact.setVisibility(false);
      scopeObj.view.flxContent.setVisibility(true);
      scopeObj.view.flxSuccess.setVisibility(false);
      scopeObj.view.flxSecureCodeContainer.setVisibility(false);
      scopeObj.view.flxCreatePassword.setVisibility(true);
      scopeObj.view.flxSecurityRequirements.setVisibility(true);
    },

    showIncorrectOTPError: function(response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        if (response.MFAAttributes.remainingFailedAttempts && response.MFAAttributes.remainingFailedAttempts > 0) {
            this.view.lblErrorOtp.text = kony.i18n.getLocalizedString("kony.mb.mfa.invalidAccessCode") + " " + kony.i18n.getLocalizedString("kony.mb.mfa.youHaveOnly") + " " + response.MFAAttributes.remainingFailedAttempts + " " + kony.i18n.getLocalizedString("i18n.mfa.remainingAttempts");
        } else if (response.MFAAttributes.remainingFailedAttempts === "0" && response.MFAAttributes.lockUser === "true") {
            var msg = "You’ve exceeded the authentication attempts limit. Your profile is locked for" + response.MFAAttributes.lockoutTime + "minutes(s)";
            navManager.setCustomInfo("frmForgot", undefined);
            this.setErrorMessageAndLogout(msg);
        } else if (response.MFAAttributes.remainingFailedAttempts === "0" && response.MFAAttributes.logoutUser === "true") {
            var msg = "You’ve exceeded the authentication attempts limit. Please try again";
            navManager.setCustomInfo("frmForgot", undefined);
            this.setErrorMessageAndLogout(msg);
        }

        this.view.lblErrorOtp.setVisibility(true);
        this.clearKeypad();
        
    },


    setErrorMessageAndLogout: function(msg) {
        var navManager = applicationManager.getNavigationManager();
        var loginData = navManager.getCustomInfo("frmLoginToast");
        if (loginData) loginData.toastMessage = msg;
        else loginData = {
            "toastMessage": msg
        };
        navManager.setCustomInfo("frmForgot", undefined);
        navManager.setCustomInfo("frmLoginToast", loginData);
        navManager.navigateTo("frmLogin");
    },



    getPasswordRulesAndPolicy: function(){
      const scopeObj = this;
      var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectName);
      kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectName).setHeaderParams({"Accept-Language":kony.i18n.getCurrentLocale()});
      var params = {  "ruleForCustomer": true,  "policyForCustomer": true };
      userRepo.customVerb(scopeObj._passwordPolicyService,params,getAllCompletionCallback);
      function getAllCompletionCallback(status, data, error) {
          var obj =  scopeObj.validateResponse(status, data, error);
          if(obj["status"] === true){
            scopeObj.getPasswordRulesAndPolicySuccessCallback(obj);
          }
          else {
            scopeObj.getPasswordRulesAndPolicyErrorCallback(obj);
          }
    }
     
    },
    
    getPasswordRulesAndPolicySuccessCallback: function(res){
      
      let scopeObj = this;
      if(res.serverErrorRes){
        kony.print("Unable to fetch Password Rules and Policies "+ err.errorMessage);
      }else{
        res = res.data;
      scopeObj.view.flxSecurityRequirements.text=res.passwordpolicy.content;
      scopeObj.createRegexForPasswordValidation(res.passwordrules);
      }
    },
    
    
    createRegexForPasswordValidation: function(data){
    var repeatedCharRules="(.)\\1{"+data.charRepeatCount+"}";
    if(data.supportedSymbols.indexOf("-") > -1){
      data.supportedSymbols = data.supportedSymbols.replace("-","\\-");
    }
    if(data.atleastOneSymbol){
      let passwordRules="";
      if(data.atleastOneLowerCase){
        passwordRules=passwordRules+"(?=.*[a-z])";
      }
      if(data.atleastOneUpperCase){
        passwordRules=passwordRules+"(?=.*[A-Z])";
      }
      if(data.atleastOneNumber){
        passwordRules=passwordRules+"(?=.*\\d)";
      }
      if(data.atleastOneSymbol){
        passwordRules=passwordRules+"(?=(.*["+data.supportedSymbols+"]))";
      }
      this.passwordRegex = new RegExp(passwordRules+"[A-Za-z0-9"+data.supportedSymbols+"]{"+data.minLength+","+data.maxLength+"}$");
      this.repeatedCharRegex = new RegExp(repeatedCharRules);
    }
    else{
      var passwordRules="^";
      if(data.atleastOneLowerCase){
        passwordRules=passwordRules+"(?=.*[a-z])";
      }
      if(data.atleastOneUpperCase){
        passwordRules=passwordRules+"(?=.*[A-Z])";
      }
      if(data.atleastOneNumber){
        passwordRules=passwordRules+"(?=.*\\d)";
      }
      this.passwordRegex = new RegExp(passwordRules+"[^\\W]{"+data.minLength+","+data.maxLength+"}$");
      this.repeatedCharRegex = new RegExp(repeatedCharRules);
    }
  },

     createPassword: function(password){
      // TODO - Backend Call to be made for Creating New Password
      //this.ActivateProfileDAO.createPassword(params, this.createPasswordSuccess.bind(this), this.createPasswordFailure.bind(this));
      /*
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
      authModule.presentationController.updatePassword(newPassword);
      */
      
      // Following Code is written for Demo Purpose Only
      const scopeObj = this;
      applicationManager.getPresentationUtility().showLoadingScreen();
        let passwordServiceKeyJSON = {
          "serviceKey": scopeObj.serviceKey,
          "UserName": scopeObj.userName,  
          "Password": scopeObj.view.tbxPassword.text
        };
        let dbxUserRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectName);
        dbxUserRepo.customVerb(scopeObj._passwordUpdateService, passwordServiceKeyJSON, setPasswordServiceCallBack);
        function setPasswordServiceCallBack(status, data, error) {
          let object = scopeObj.validateResponse(status, data, error);
          if (object["status"] === true) {
            scopeObj.createPasswordSuccess(object);
          }
          else {
            scopeObj.createPasswordFailure(object.data);
          }
        }
    },
    
    createPasswordSuccess: function(successResponse){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      let scopeObj = this;
      if(successResponse.serverErrorRes){
        scopeObj.showupdateErrorMessage(successResponse.serverErrorRes.dbpErrMsg);
      }else{
        scopeObj.setPassword();
      }
    },
    
    createPasswordFailure: function(response){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      scopeObj.showupdateErrorMessage(response.errorMessage);
    },

    showupdateErrorMessage: function(errMsg){
      const scopeObj = this;
      scopeObj.view.lblErrorPwd.setVisibility(true);
	  scopeObj.view.lblErrorPwd.text = errMsg;
      scopeObj.view.flxSecurityRequirements.setVisibility(true);
      scopeObj.enableOrDisableButton(scopeObj.view.btnSetPassword, false);
    },
    
    getPasswordRulesAndPolicyErrorCallback: function(err){
      kony.print("Unable to fetch Password Rules and Policies "+ err.errorMessage);
    },

    validateResponse: function (status, response, error) {
        let res, isServiceFailure, data;
        if (status === kony.mvc.constants.STATUS_SUCCESS) {
          if (response.hasOwnProperty("dbpErrCode") || response.hasOwnProperty("dbpErrMsg")) {
            data = {
              "errorCode": response.errcode ? response.errcode : response.dbpErrCode,
              "errorMessage": response.errmsg ? response.errmsg : response.dbpErrMsg
            };
            res = {
              "status": true,
              "data": data,
              "serverErrorRes":response,
              "isServerUnreachable": false
            };
          }
          else
            res = {
              "status": true,
              "data": response,
              "isServerUnreachable": false
            };
        }
        else {
          if (error.opstatus === 1011) {
            if (kony.os.deviceInfo().name === "thinclient" && kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY) === false) {
              location.reload(); //todo later so that it can be in sync with RB
            }
            else {
              isServiceFailure = true;
              errMsg = error.errmsg ? error.errmsg : error.dbpErrMsg;
            }
          }
          else {
            isServiceFailure = false;
            errMsg = error.errmsg ? error.errmsg : error.dbpErrMsg;
          }
          data = {
            "errorCode": error.errcode ? error.errcode : error.dbpErrCode,
            "errorMessage": error.errmsg ? error.errmsg : error.dbpErrMsg
          };
          res = {
            "status": false,
            "data": data,
            "isServerUnreachable": isServiceFailure
          };
        }
        return res;
      },
  };
});