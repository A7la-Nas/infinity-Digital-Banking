define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      let scopeObj = this;
      scopeObj._buttonDisabledSkin = "";
      scopeObj._buttonEnabledSkin = "";
      scopeObj._objectServiceName = "";
      scopeObj._dataModel = "";
      scopeObj._dbxUserDataModel = "";
      scopeObj._updatePassword = "";
      scopeObj._verifyExistingPassword = "";
      scopeObj._textVisiblityOff = "";
      scopeObj._textVisiblityOn = "";
      scopeObj._greenTick = "";
      scopeObj._grayTick = "";
      scopeObj._getPasswordRulesAndPolicy = "";
      scopeObj.passwordPolicies = {
        "minLength": "",
        "maxLength": "",
        "specialCharactersAllowed": "",
        "atleastOneNumber": "",
        "atleastOneSymbol": "",
        "atleastOneUpperCase": "",
        "atleastOneLowerCase": "",
        "charRepeatCount": ""
      };
      scopeObj.passwordRegex = "";
      scopeObj.characterRepeatCountRegex = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "buttonDisabledSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._buttonDisabledSkin=val;          
        }
      });
      defineGetter(this, "buttonDisabledSkin", function() {
        return this._buttonDisabledSkin;
      });
      defineSetter(this, "buttonEnabledSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._buttonEnabledSkin=val;          
        }
      });
      defineGetter(this, "buttonEnabledSkin", function() {
        return this._buttonEnabledSkin;
      });
      defineSetter(this, "objectServiceName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._objectServiceName=val;          
        }
      });
      defineGetter(this, "objectServiceName", function() {
        return this._objectServiceName;
      });
      defineSetter(this, "dataModel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dataModel=val;          
        }
      });
      defineGetter(this, "dataModel", function() {
        return this._dataModel;
      });
      defineSetter(this, "dbxUserDataModel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dbxUserDataModel=val;          
        }
      });
      defineGetter(this, "dbxUserDataModel", function() {
        return this._dbxUserDataModel;
      });
      defineSetter(this, "updatePassword", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._updatePassword=val;          
        }
      });
      defineGetter(this, "updatePassword", function() {
        return this._updatePassword;
      });
      defineSetter(this, "verifyExistingPassword", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._verifyExistingPassword=val;          
        }
      });
      defineGetter(this, "verifyExistingPassword", function() {
        return this._verifyExistingPassword;
      });
      defineSetter(this, "textVisiblityOff", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textVisiblityOff=val;          
        }
      });
      defineGetter(this, "textVisiblityOff", function() {
        return this._textVisiblityOff;
      });
      defineSetter(this, "textVisiblityOn", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textVisiblityOn=val;          
        }
      });
      defineGetter(this, "textVisiblityOn", function() {
        return this._textVisiblityOn;
      });
      defineSetter(this, "greenTick", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._greenTick=val;          
        }
      });
      defineGetter(this, "greenTick", function() {
        return this._greenTick;
      });
      defineSetter(this, "grayTick", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._grayTick=val;          
        }
      });
      defineGetter(this, "grayTick", function() {
        return this._grayTick;
      });
      defineSetter(this, "getPasswordRulesAndPolicy", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._getPasswordRulesAndPolicy=val;          
        }
      });
      defineGetter(this, "getPasswordRulesAndPolicy", function() {
        return this._getPasswordRulesAndPolicy;
      });
    },

    preshow: function(){
      this.setFlowActions();
      this.resetUI();
      this.getPasswordPolicies();
    },

    resetUI: function(){
      let scopeObj = this;
      scopeObj.view.txtCurrentPassword.text = "";
      scopeObj.view.txtNewPassword.text = "";
      scopeObj.view.txtReEnterPass.text = "";
      scopeObj.view.txtCurrentPassword.secureTextEntry = true;
      scopeObj.view.txtNewPassword.secureTextEntry = true;
      scopeObj.view.imghideOrShowPwd2.src = scopeObj.textVisiblityOff;
      scopeObj.view.imghideOrShowPwd.src = scopeObj.textVisiblityOff;
      scopeObj.view.imgRenterPass.src = scopeObj.grayTick;
      scopeObj.view.flxSecurityRequirements.setVisibility(false);
      scopeObj.enableDisableButton(false);
      //osama
      //let isAndriod = applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone";
      //scopeObj.view.flxHeader.isVisible = isAndriod;
     // scopeObj.view.flxMainContainer.top = isAndriod ? "0dp" : "56dp";
    },

    setFlowActions: function(){
      let scopeObj = this;

      scopeObj.view.customHeader.btnRight.onClick = function(){
        scopeObj.resetUI();
        if(scopeObj.onCancel)
          scopeObj.onCancel();
      };

      scopeObj.view.customHeader.flxBack.onClick = function(){
        scopeObj.resetUI();
        if(scopeObj.onCancel)
          scopeObj.onCancel();
      };

      scopeObj.view.txtCurrentPassword.onTouchStart = function(){
        scopeObj.view.flxSecurityRequirements.setVisibility(false);
      };

      scopeObj.view.txtCurrentPassword.onTextChange = function(){
        scopeObj.enableDisableButton(true);
      };

      scopeObj.view.txtCurrentPassword.onEndEditing = function(){
        scopeObj.enableDisableButton(true);
      };

      scopeObj.view.txtCurrentPassword.onDone = function(){
        scopeObj.enableDisableButton(true);
      };

      scopeObj.view.flxPwdVisiblityToggle2.onClick = function(){
        scopeObj.togglePasswordVisibility(scopeObj.view.flxPwdVisiblityToggle2,scopeObj.view.imghideOrShowPwd2,scopeObj.view.txtCurrentPassword);
      };

      scopeObj.view.txtNewPassword.onTouchStart = function(){
        scopeObj.view.flxSecurityRequirements.setVisibility(false);
      };

      scopeObj.view.txtNewPassword.onTextChange = function(){
        scopeObj.view.flxSecurityRequirements.setVisibility(false);
      };

      scopeObj.view.txtNewPassword.onDone = function(){
        scopeObj.validatePassword(scopeObj.view.txtNewPassword);
      };

      scopeObj.view.txtNewPassword.onEndEditing = function(){
        scopeObj.validatePassword(scopeObj.view.txtNewPassword);
      };

      scopeObj.view.flxPwdVisiblityToggle.onClick = function(){
        scopeObj.togglePasswordVisibility(scopeObj.view.flxPwdVisiblityToggle,scopeObj.view.imghideOrShowPwd,scopeObj.view.txtNewPassword);
      };

      scopeObj.view.txtReEnterPass.onTouchStart = function(){
        scopeObj.view.flxSecurityRequirements.setVisibility(false);
      };

//       scopeObj.view.txtReEnterPass.onDone = function(){
//         scopeObj.validatePassword(scopeObj.view.txtReEnterPass);
//       };
		
//       scopeObj.view.txtReEnterPass.onEndEditing = function(){
//         scopeObj.validatePassword(scopeObj.view.txtReEnterPass);
//       };
	  scopeObj.view.txtReEnterPass.onTextChange = function(){
        scopeObj.validatePassword(scopeObj.view.txtReEnterPass);
      };
      scopeObj.view.btnUpdate.onClick = function(){
        scopeObj.validateExistingPassword();
      };

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

    getStringFromi18n: function (stringValue) {
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue): "";
    },

    togglePasswordVisibility: function(flx,img,tbx) {
      let scopeObj = this;
      if (img.src === scopeObj.textVisiblityOff) {
        img.src = scopeObj.textVisiblityOn;
        tbx.secureTextEntry = false;
        flx.forceLayout();
      } else {
        img.src = scopeObj.textVisiblityOff;
        tbx.secureTextEntry = true;
        flx.forceLayout();
      }
    },

    getPasswordPolicies: function(){
      kony.application.showLoadingScreen(null,"", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
      let scopeObj = this;
      function completionCallBack(status, data, error) {
        var obj = scopeObj.validateResponse(status, data, error);
        if (obj.status) {
          scopeObj.getPasswordPoliciesSuccessCallback(obj.data);
        } else {
          scopeObj.showErrorMessage(obj);
        }
      }
      let params = { "ruleForCustomer": true,  "policyForCustomer": true };
      var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Users_2");
      userRepo.customVerb(scopeObj.getPasswordRulesAndPolicy, params, completionCallBack); 
    },

    getPasswordPoliciesSuccessCallback: function(data){
      let scopeObj = this;
      let passwordrules = data.passwordrules;
      let policyData = "Minimum Length of Password:" + passwordrules.minLength + "\nMaximum Length of Password:" + passwordrules.maxLength + "\nSpecial Characters Allowed:" + passwordrules.supportedSymbols;
      if (passwordrules.atleastOneNumber)
        policyData += "\nAtleast One Number";
      if (passwordrules.atleastOneSymbol)
        policyData += "\nAtleast One Symbol";
      if (passwordrules.atleastOneUpperCase)
        policyData += "\nAtleast One Uppercase";
      if (passwordrules.atleastOneLowerCase)
        policyData += "\nAtleast One Lowercase";
      scopeObj.passwordPolicies.minLength = passwordrules.minLength;
      scopeObj.passwordPolicies.maxLength = passwordrules.maxLength;
      scopeObj.passwordPolicies.specialCharactersAllowed = passwordrules.supportedSymbols;
      scopeObj.passwordPolicies.atleastOneNumber = passwordrules.atleastOneNumber;
      scopeObj.passwordPolicies.atleastOneSymbol = passwordrules.atleastOneSymbol;
      scopeObj.passwordPolicies.atleastOneUpperCase = passwordrules.atleastOneUpperCase;
      scopeObj.passwordPolicies.atleastOneLowerCase = passwordrules.atleastOneLowerCase;
      scopeObj.passwordPolicies.charRepeatCount = passwordrules.charRepeatCount;
      scopeObj.view.rtxRulesPwd.text = data.passwordpolicy.content;
      kony.application.dismissLoadingScreen();
    },

    validatePassword: function (widget) {
      let scopeObj = this;
      let text = widget.text;
      let data = scopeObj.passwordPolicies;
      if (scopeObj.passwordRegex === "" && scopeObj.characterRepeatCountRegex === "") {
        let repeatedCharRules = "(.)\\1{" + data.charRepeatCount + "}";
        scopeObj.characterRepeatCountRegex = new RegExp(repeatedCharRules);
        let passwordRules = "";
        if (data.specialCharactersAllowed && data.specialCharactersAllowed.includes("-")) {
          data.specialCharactersAllowed = data.specialCharactersAllowed.replace("-", "\\-");
        }
        if (data.atleastOneLowerCase) {
          passwordRules += "(?=.*\[a-z\])";
        }
        if (data.atleastOneUpperCase) {
          passwordRules += "(?=.*\[A-Z\])";
        }
        if (data.atleastOneNumber) {
          passwordRules += "(?=.*\\d)";
        }
        if (data.atleastOneSymbol) {
          passwordRules = passwordRules + "(?=(.*\[" + data.specialCharactersAllowed + "\]))";
          scopeObj.passwordRegex = new RegExp(passwordRules + "[A-Za-z0-9" + data.specialCharactersAllowed + "]{" + data.minLength + "," + data.maxLength + "}$");
        }
        else {
          scopeObj.passwordRegex = new RegExp(passwordRules + "\[^\\W\]{" + data.minLength + "," + data.maxLength + "}$");
        }
      }
      let isValidPassword = text.match(scopeObj.passwordRegex) && !scopeObj.characterRepeatCountRegex.test(text);
      isValidPassword = isValidPassword ? true : false; // adding null & undefined check
      let isShowRules = widget.id === "txtNewPassword" && text !== "" && !isValidPassword;
      scopeObj.view.flxSecurityRequirements.setVisibility(isShowRules);
      let isCnfPwdMatch = scopeObj.view.txtNewPassword.text !== "" && scopeObj.view.txtReEnterPass.text !== "" && scopeObj.view.txtNewPassword.text === scopeObj.view.txtReEnterPass.text;
      scopeObj.view.imgRenterPass.src = isValidPassword && isCnfPwdMatch ? scopeObj.greenTick : scopeObj.grayTick;
      scopeObj.enableDisableButton(isValidPassword && isCnfPwdMatch);
    },

    enableDisableButton: function(isValidPassword){
      let scopeObj = this;
      let currentPassword = scopeObj.view.txtCurrentPassword.text;
      let password = scopeObj.view.txtNewPassword.text;
      let cnfPassword = scopeObj.view.txtReEnterPass.text;
      let isEnabled = isValidPassword && currentPassword !== "" && password !== "" && cnfPassword !== "";
      scopeObj.view.btnUpdate.setEnabled(isEnabled);
      scopeObj.view.btnUpdate.skin = isEnabled ? scopeObj.buttonEnabledSkin : scopeObj.buttonDisabledSkin ;
    },

    showErrorMessage: function(errorObj){
      let scopeObj = this;
      if(errorObj.isServerUnreachable && scopeObj.onFailureCallback){
        scopeObj.onFailureCallback(errorObj);
      } else {
        applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj,errorObj.errorMessage);
        scopeObj.view.txtCurrentPassword.text = "";
        scopeObj.view.txtNewPassword.text = "";
        scopeObj.view.txtReEnterPass.text = "";
        scopeObj.view.imgRenterPass.src = scopeObj.grayTick;
        scopeObj.enableDisableButton(false);
        kony.application.dismissLoadingScreen();
      }
    },

    validateExistingPassword: function(){
      kony.application.showLoadingScreen(null,"", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
      let scopeObj = this;
      let params = { "password": scopeObj.view.txtCurrentPassword.text };

      function completionCallBack(status, data, error) {
        var obj = scopeObj.validateResponse(status, data, error);
        if (obj.status && !obj.isServerUnreachable) {
          if (data.result === "The user is verified") {
            scopeObj.updateUserPassword();
          } else if(data.result === "Invalid Credentials"){
            scopeObj.showErrorMessage({"errorMessage": scopeObj.getStringFromi18n("kony.profile.currentpasswordWrong")});
          } else{
            scopeObj.showErrorMessage({"errorMessage": scopeObj.getStringFromi18n("kony.error.StandardErrorMessage")});
          }
        } else {
          scopeObj.showErrorMessage(obj);
        }
      }
      var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj.dataModel);
      userRepo.customVerb(scopeObj.verifyExistingPassword, params, completionCallBack); 
    },

    updateUserPassword: function(){
      let scopeObj = this;
      let record = {
        "oldPassword" : scopeObj.view.txtCurrentPassword.text,
        "newPassword" : scopeObj.view.txtNewPassword.text,
      };
      function completionCallback(status, data, error){
        const srh = applicationManager.getServiceResponseHandler();
        const obj = srh.manageResponse(status, data, error);
        if(obj["status"] === true){
          scopeObj.updateUserPasswordSuccessCallback(obj.data);
        } else {
          scopeObj.showErrorMessage(obj.errmsg);
        }
      }
      var userAccount = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj.dbxUserDataModel);
      userAccount.customVerb(scopeObj.updatePassword, record, completionCallback);
    },

    updateUserPasswordSuccessCallback: function(response){
      let scopeObj = this;
      if(response.MFAAttributes && response.MFAAttributes.isMFARequired === "true"){
        var mfaJSON = {
          "flowType" : "UPDATE_PASSWORD",
          "response" : response,
          "objectServiceDetails" : {
            "serviceName" : scopeObj.objectServiceName,
            "dataModel" : scopeObj.dbxUserDataModel,
            "operationName" : "updateDBXUserPassword"
          }
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      } else if(scopeObj.onSuccessCallback){
        scopeObj.onSuccessCallback();
      }
    },

  };
});