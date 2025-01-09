define(['./LoginUtility','./LoginDAO','CommonUtilities'],function(LoginUtility, LoginDAO, CommonUtilities ) {
  return {
    
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._identityServiceName = "";
      
      this._textBoxNormalSkin="";
      this._rememberMeLabelSkin="";
      this._rememberMeSwitchSkin="";
      this._btnLoginDisabledSkin="";
      this._btnLoginSkin="";      
      
      this._textVisiblityOffIcon="";
      this._textVisiblityOnIcon="";
      
      this._tbx1PlaceholderText="";
      this._tbx2PlaceholderText="";
      this._lblRememberMeText="";
      this._lblForgotPasswordText="";
      this._submitButtonText="";
      
      this.LoginUtility = new LoginUtility();
      this.LoginDAO = new LoginDAO();      
      this.currentAuthMode="";
      this.JSONUsernamePassword="";
      this.isTbxUsernameInFocus = false;
      this.isTbxPasswordInFocus = false;
    },
    
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "identityServiceName", function(val){
        if((typeof val=='string') && (val != "")){
          this._identityServiceName=val;
        }
      });
      defineGetter(this, "identityServiceName", function(){
        return this._identityServiceName;
      });
      defineSetter(this, "textBoxNormalSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._textBoxNormalSkin=val;
        }
      });
      defineGetter(this, "textBoxNormalSkin", function(){
        return this._textBoxNormalSkin;
      });
      defineSetter(this, "rememberMeLabelSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._rememberMeLabelSkin=val;
        }
      });
      defineGetter(this, "rememberMeLabelSkin", function(){
        return this._rememberMeLabelSkin;
      });
      defineSetter(this, "rememberMeSwitchSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._rememberMeSwitchSkin=val;
        }
      });
      defineGetter(this, "rememberMeSwitchSkin", function(){
        return this._rememberMeSwitchSkin;
      });
      defineSetter(this, "btnLoginSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._btnLoginSkin=val;
        }
      });
      defineGetter(this, "btnLoginSkin", function(){
        return this._btnLoginSkin;
      });
      defineSetter(this, "btnLoginDisabledSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._btnLoginDisabledSkin=val;
        }
      });
      defineGetter(this, "btnLoginDisabledSkin", function(){
        return this._btnLoginDisabledSkin;
      });      
      defineSetter(this, "textVisiblityOffIcon", function(val){
        if((typeof val=="string") && (val != "")){
          this._textVisiblityOffIcon=val;
        }
      });
      defineGetter(this, "textVisiblityOffIcon", function(){
        return this._textVisiblityOffIcon;
      });
      defineSetter(this, "textVisiblityOnIcon", function(val){
        if((typeof val=="string") && (val != "")){
          this._textVisiblityOnIcon=val;
        }
      });
      defineGetter(this, "textVisiblityOnIcon", function(){
        return this._textVisiblityOnIcon;
      });      
      defineSetter(this, "tbx1PlaceholderText", function(val){
        if((typeof val=="string") && (val != "")){
          this._tbx1PlaceholderText=val;
        }
      });
      defineGetter(this, "tbx1PlaceholderText", function(){
        return this._tbx1PlaceholderText;
      });
      defineSetter(this, "tbx2PlaceholderText", function(val){
        if((typeof val=="string") && (val != "")){
          this._tbx2PlaceholderText=val;
        }
      });
      defineGetter(this, "tbx2PlaceholderText", function(){
        return this._tbx2PlaceholderText;
      });
      defineSetter(this, "lblRememberMeText", function(val){
        if((typeof val=="string") && (val != "")){
          this._lblRememberMeText=val;
        }
      });
      defineGetter(this, "lblRememberMeText", function(){
        return this._lblRememberMeText;
      });
      defineSetter(this, "lblForgotPasswordText", function(val){
        if((typeof val=="string") && (val != "")){
          this._lblForgotPasswordText=val;
        }
      });
      defineGetter(this, "lblForgotPasswordText", function(){
        return this._lblForgotPasswordText;
      });
      defineSetter(this, "submitButtonText", function(val){
        if((typeof val=="string") && (val != "")){
          this._submitButtonText=val;
        }
      });
      defineGetter(this, "submitButtonText", function(){
        return this._submitButtonText;
      });      
    },
    
    raiseComponentEvent: function(methodName, argument=null){
      // This method invokes the appropriate event exposed  by the COMPONENT
      const scopeObj = this;
      switch(methodName){
        case 'onLoginSuccess':
          if(scopeObj.onLoginSuccess) scopeObj.onLoginSuccess(argument);
          break;
        case 'onLoginFailure':
          if(scopeObj.onLoginFailure) scopeObj.onLoginFailure(argument);
          break;
        case 'onFocusStart': // Event for performing animation at the form level.
          if(scopeObj.onFocusStart) scopeObj.onFocusStart();          
          break;
        case 'onFocusEnd': // Event for performing animation at the form level.
          if(scopeObj.onFocusEnd) scopeObj.onFocusEnd();          
          break;
        case 'hideDashboardIcon':
          if(scopeObj.hideDashboardIcon) scopeObj.hideDashboardIcon();
          break;
        case 'setErrorStatus':
          if(scopeObj.setErrorStatus) scopeObj.setErrorStatus(argument);
          break;        
        case 'forgotNavigation':
          if(scopeObj.forgotNavigation) scopeObj.forgotNavigation(argument);
          break;
        case 'setUIAtFormLevelEvent': // Change UI at form Level based on whether login type is username-password OR (pin/faceid/touchid)
          if(scopeObj.setUIAtFormLevelEvent) scopeObj.setUIAtFormLevelEvent(argument);
          break;
        case 'initiateLoginFlow':
          if(scopeObj.initiateLoginFlow) scopeObj.initiateLoginFlow(argument);
          break;
      }
    },
    
    textboxFocus: function(){
      if(this.isTbxUsernameInFocus){
        this.view.tbxUsername.setFocus();
      } else if(this.isTbxPasswordInFocus) {
        this.view.tbxPassword.setFocus();
      }
    },
    
    preShow: function(){
      this.setTextFromi18n();
      this.resetUI();
      this.setFlowActions();
      let navData = applicationManager.getNavigationManager().getCustomInfo("frmLogin");      
      this.manageUname(navData);
      this.showDefaultLoginScreen(navData);
      var locale = kony.i18n.getCurrentLocale();
      if (locale ==="de_DE") {
        this.view.lblRememberMe.right = "79dp";
      }
      else if(locale === "fr_FR"){
        this.view.lblRememberMe.right = "70dp";
        }
    this.view.flxContent.skin="bbSknFlxf9fafb";
    },
    
    setTextFromi18n: function(){
      this._tbx1PlaceholderText=this.getStringFromi18n(this._tbx1PlaceholderText);
      this._tbx2PlaceholderText=this.getStringFromi18n(this._tbx2PlaceholderText);
      this._lblRememberMeText=this.getStringFromi18n(this._lblRememberMeText);
      this._lblForgotPasswordText=this.getStringFromi18n(this._lblForgotPasswordText);
      this._submitButtonText=this.getStringFromi18n(this._submitButtonText);      
    },
    
    getStringFromi18n: function(stringValue){
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },
    
    setFlowActions: function() {
      const scopeObj = this;
      this.view.btnLogIn.onClick = function(){
        scopeObj.btnLoginOnClick();
      };
      this.view.tbxUsername.onTextChange = function(){
        scopeObj.enableLoginButton();
      };
      this.view.tbxUsername.onTouchStart = function(){
        scopeObj.isTbxUsernameInFocus = true;
        scopeObj.raiseComponentEvent('onFocusStart', null);
      };
      this.view.tbxUsername.onDone = function(){
        scopeObj.isTbxUsernameInFocus = false;
        scopeObj.raiseComponentEvent('onFocusEnd', null);
      };
      this.view.tbxPassword.onTextChange = function(){
        scopeObj.enableLoginButton();
      };
      this.view.tbxPassword.onTouchStart = function(){
        scopeObj.isTbxPasswordInFocus = true;
        scopeObj.raiseComponentEvent('onFocusStart', null);
      };
      this.view.tbxPassword.onDone = function(){
        scopeObj.isTbxPasswordInFocus = false;
        scopeObj.raiseComponentEvent('onFocusEnd', null);
      };
      this.view.flxPwdVisiblityToggle.onClick = function(){
        scopeObj.flxPwdVisiblityToggleOnClick();
      };
      this.view.switchRememberMe.onSlide = function(){
        scopeObj.rememberMeOption();
      };
      this.view.flxForgot.onTouchEnd = function(){
        let enteredUsername = scopeObj.view.tbxUsername.text;
        scopeObj.raiseComponentEvent('forgotNavigation', enteredUsername);
      };
    },
    
    /*
    // AAC-7691: Removing Device Registration Checks
    setDeviceRegisterflag: function(value) {
      let userManager = applicationManager.getUserPreferencesManager();
      userManager.updateDeviceRegisterFlag(value);
    },
    */

    setDefaultMode: function(authMode) {
      let userManager = applicationManager.getUserPreferencesManager();
      userManager.setDefaultAuthMode(authMode);
    },
    
    setRememberMeFlag: function(value) {
      let userManager = applicationManager.getUserPreferencesManager();
      userManager.updateRememberMeFlag(value);
    },
    
    setLoginFeaturesOff: function(){
      let userManager = applicationManager.getUserPreferencesManager();
      userManager.updateRememberMeFlag(false);
      userManager.setDefaultAuthMode("password");
      userManager.updateAccountPreviewFlag(false);
      userManager.upadateTouchIdFlag(false);
      userManager.updateFaceIdFlag(false);
      userManager.updatePinFlag(false);
      userManager.clearUserCredentials();
      applicationManager.getDataforLogin();
    },
    
    showDefaultLoginScreen: function(loginData){
      const scopeObj = this;
      if (loginData && loginData.isFirstTimeLogin){
        scopeObj.raiseComponentEvent("setUIAtFormLevelEvent","password");
      }
      if(loginData && loginData.usernameFromForgotUsername && (loginData.usernameFromForgotUsername !== undefined || loginData.usernameFromForgotUsername !== "")){
        scopeObj.raiseComponentEvent("setUIAtFormLevelEvent","password");
        scopeObj.populateUserName(loginData.usernameFromForgotUsername);
      } else if (loginData && loginData.NUOUsername && (loginData.NUOUsername !== undefined || loginData.NUOUsername !== "")){
        scopeObj.raiseComponentEvent("setUIAtFormLevelEvent","password");
        scopeObj.populateUserName(loginData.NUOUsername);
      } else {
        scopeObj.LoginUtility.showLoadingScreen();
        let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLogin");
        let defaultLoginMode = (loginData && loginData.defaultAuthMode) ? loginData.defaultAuthMode : "password";
        scopeObj.selectLoginMode(defaultLoginMode);
        scopeObj.LoginUtility.dismissLoadingScreen();
        /*
        // AAC-7691: Removing Device Registration Checks
        var userObj = applicationManager.getUserPreferencesManager();
        var checkDeviceReg = userObj.isDeviceRegistered();
        if(checkDeviceReg == true && (!loginData.isFirstTimeLogin)){
          scopeObj.checkDeviceRegistrationStatus();
        }*/
      }
    },
    
    /*
    // AAC-7691: Removing Device Registration Checks
    checkDeviceRegistrationStatus: function() {
      const scopeObj = this;
      this.LoginUtility.showLoadingScreen();
      let registrationManager = applicationManager.getRegistrationManager();
      let userMan = applicationManager.getUserPreferencesManager();
      let userName = userMan.getUserName();
      let criteria = kony.mvc.Expression.eq("UserName", userName);
      registrationManager.fetchDeviceRegistrationStatus(criteria, scopeObj.checkDeviceRegistrationSuccess, scopeObj.checkDeviceRegistrationError);
    },
    
    checkDeviceRegistrationSuccess: function(resDeviceSuc) {
      const scopeObj = this;
      var configManager = applicationManager.getConfigurationManager();      
      if (resDeviceSuc[0].status !== "false"){
        scopeObj.setDeviceRegisterflag(true);
        scopeObj.checkLoginType(true);
      }  else{
        scopeObj.setDeviceRegisterflag(false);
        scopeObj.checkLoginType(false);
      }
      this.LoginUtility.dismissLoadingScreen();
    },
    
    checkDeviceRegistrationError: function(resDeviceErr){      
      this.raiseComponentEvent('setErrorStatus', {"serviceNumber":1, "serviceResponse":resDeviceErr});
      this.LoginUtility.dismissLoadingScreen();
      if (resDeviceErr["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", resDeviceErr);
    },    
    
    checkLoginType : function(checkDeviceReg){
      const scopeObj = this;
      applicationManager.getPresentationUtility().showLoadingScreen();
      if(checkDeviceReg == true){
        var loginData=applicationManager.getNavigationManager().getCustomInfo("frmLogin");
        this.selectLoginMode(loginData.defaultAuthMode);
      } else {
        scopeObj.raiseComponentEvent("setUIAtFormLevelEvent","password");
        scopeObj.setDefaultMode("password");
      }
    },
    */
    
    selectLoginMode: function(loginMode){      
      this.raiseComponentEvent("setUIAtFormLevelEvent",loginMode);
      if(loginMode==="password"){
        this.setDefaultMode("password");
      }  else {
        // For login via "pin", "touchid", "faceid"
        this.raiseComponentEvent('initiateLoginFlow', loginMode);        
      }
    },
    
    resetUI: function(){
      this.assignDefaultSkins();
      this.assignDefaultText();
      this.view.imgPwdVisiblityToggle.src = this._textVisiblityOffIcon;
      this.view.btnLogIn.setEnabled(false);
      this.view.tbxPassword.secureTextEntry = true;
      this.view.tbxUsername.textCopyable = false;
      this.view.flxLoginPassword.top = "0%";
      this.view.flxContent.forceLayout();
      this.view.forceLayout();
    },
    
    assignDefaultSkins: function(){
      // Assigns skin to widgets from PROPERTY Variables
      this.view.tbxUsername.skin = this._textBoxNormalSkin;
      this.view.tbxPassword.skin = this._textBoxNormalSkin;
      this.view.lblRememberMe.skin = this._rememberMeLabelSkin;
      if(this.LoginUtility.getDeviceName() === "iPhone"){
        this.view.switchRememberMe.skin = this._rememberMeSwitchSkin;
      } else {
        this.view.switchRememberMe.skin = this._rememberMeSwitchSkin;
      }
      this.view.btnLogIn.skin = this._btnLoginDisabledSkin;      
    },
    
    assignDefaultText: function(){
      // Assigns text to widgets from PROPERTY Variables
      this.view.tbxUsername.placeholder = this._tbx1PlaceholderText;
      this.view.tbxPassword.placeholder = this._tbx2PlaceholderText;
      this.view.lblRememberMe.text = this._lblRememberMeText;
      this.view.lblForgotPwd.text = this._lblForgotPasswordText;
      this.view.btnLogIn.text = this._submitButtonText;      
    },
    
    btnLoginOnClick: async function() {
      this.LoginUtility.showLoadingScreen();
      const scopeObj = this;
      await scopeObj.fetchAndSetClientIpToHeaders();
      this.LoginUtility.detectDynamicInstrumentation();
      let enteredUserName = this.view.tbxUsername.text.trim();
      let navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmLoginusername",enteredUserName);
     navManager.setCustomInfo("prevFlowFilterAccounts",undefined);

      var userNameDetails=applicationManager.getStorageManager().getStoredItem("maskUserName");
      if (scopeObj.LoginUtility.isUserNameMasked(enteredUserName) && userNameDetails["maskedUserName"]===enteredUserName) {
        enteredUserName=userNameDetails["backendUserName"];
        navManager.setCustomInfo("frmLoginusername",enteredUserName);
      }
      let enteredPassword = this.view.tbxPassword.text.trim();      
      let UsernamePasswordJSON = { "username": enteredUserName, "password": enteredPassword, "clientIp": navManager.getCustomInfo("CLIENT_IP") };
      this.currentAuthMode = "password";
      this.JSONUsernamePassword = UsernamePasswordJSON;
      if (UsernamePasswordJSON.username && UsernamePasswordJSON.password) {
      	this.login(UsernamePasswordJSON);
      } else {
        this.LoginUtility.dismissLoadingScreen();
        this.raiseComponentEvent('onLoginFailure', applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Invalid.Username.or.Password"));        
      }
    },
    
    login: function(UsernamePasswordJSON) {
      const scopeObj = this;
      scopeObj.currentAuthMode = "password";
      let authParams = {
        "userid": UsernamePasswordJSON.username,
        "Password": UsernamePasswordJSON.password,
        "loginOptions": {
          "isOfflineEnabled": false
        },
        "CLIENT_IP" : UsernamePasswordJSON.clientIp
      };
      let identityServiceName = this._identityServiceName;
      this.LoginDAO.login(authParams, scopeObj.onLoginSuccessCallback, scopeObj.onLoginFailureCallback, identityServiceName);
    },
    fetchAndSetClientIpToHeaders: async function () {
      let instance = kony.sdk.getCurrentInstance();
      let self = this;
      let res = CommonUtilities.CLIENT_PROPERTIES;
      let ipUrl = res['CLIENT_IP_URL'];
      if (!ipUrl) ipUrl = 'https://api.ipify.org/?format=json';
      let ipKey = res['CLIENT_IP_KEY'];
      if (!ipKey) ipKey = '255.0.255.0';
      let clientIp = "";
      var navManager = applicationManager.getNavigationManager();
      try {
        let ipAddress = await self.fetchIPAddress(ipUrl, null);
        clientIp = await self.encryptAddress(ipAddress.trim(), ipKey);
        if (clientIp.length > 0) {
          instance.setGlobalRequestParam("CLIENT_IP", clientIp, instance.globalRequestParamType.bodyParams);
        } else {
          instance.setGlobalRequestParam("CLIENT_IP", '', instance.globalRequestParamType.bodyParams);
        }
        navManager.setCustomInfo('CLIENT_IP', clientIp);
      } catch (e) {
        navManager.setCustomInfo('CLIENT_IP', clientIp);
      }
    },
    encryptAddress: function (data, key) {
      const ipBinary = data.split('.').map(octet => parseInt(octet, 10).toString(2).padStart(8, '0')).join('');
      const keyBinary = key.split('.').map(octet => parseInt(octet, 10).toString(2).padStart(8, '0')).join('');
      const encryptedBinary = ipBinary.split('').map((bit, index) => (bit ^ keyBinary[index]).toString()).join('');
      const encryptedIp = encryptedBinary.match(/.{1,8}/g).map(byte => parseInt(byte, 2)).join('.');
      return encryptedIp
    },
    fetchIPAddress: async function (ipUrl, callback) {
      var xhr = new kony.net.HttpRequest();
      xhr.open("GET", ipUrl, false);
      xhr.send();
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        return response.ip;
      } else {
        return null;
      }
    },
    
    onLoginSuccessCallback: function(resSuccess){
      const scopeObj = this;
      let rememberMeSwitchValue = this.view.switchRememberMe.selectedIndex;
      let rememberdeviceregflag = rememberMeSwitchValue === 0;
      let loginSuccessObj = {
        "resSuccess": resSuccess,
        "currentAuthMode": scopeObj.currentAuthMode,
        "rememberdeviceregflag": rememberdeviceregflag,
        "UsernamePasswordJSON": scopeObj.JSONUsernamePassword
      };
      this.raiseComponentEvent('onLoginSuccess', loginSuccessObj);
    },
    
    onLoginFailureCallback: function(resError) {
      this.LoginUtility.dismissLoadingScreen();
      let errMsg = resError.errmsg.errorMessage;
      this.clearUsernamePwd();
      this.raiseComponentEvent('onLoginFailure', errMsg);
    },
    
    rememberMeOption: function(){
      const scopeObj = this;
      var rememberMeSwitchValue = this.view.switchRememberMe.selectedIndex;
      var loginData = applicationManager.getNavigationManager().getCustomInfo("frmLogin");
      if(rememberMeSwitchValue === 0) {
        scopeObj.setRememberMeFlag(true);
        applicationManager.getDataforLogin();
      } else {
        if (loginData && loginData.istouchIdEnabled || loginData.isPinModeEnabled || loginData.isFacialAuthEnabled)
          this.showTouchIdOffAlert(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.rememberMe.Msg"),applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.rememberMeTittle"));
        else
          this.OffLoginFeatures_RememberOff();
      }
    },
    
    showTouchIdOffAlert : function(msg,title){
      kony.ui.Alert({
        "message": msg,
        "alertHandler": this.alertrememberCallback,
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "yesLabel": "Disable",
        "noLabel": "Cancel",
        "alertTitle": title
      },{});
    },
    
    alertrememberCallback : function(response){
      const scopeObj = this;
      if (response === true){
        this.OffLoginFeatures_RememberOff();
      } else {
        this.view.imgCheckBox.src = "remembermetick.png";
        scopeObj.setRememberMeFlag(true);
      }
    },
    
    OffLoginFeatures_RememberOff : function(){
      this.raiseComponentEvent("setUIAtFormLevelEvent","password");
      this.raiseComponentEvent('hideDashboardIcon', null);
      this.setLoginFeaturesOff();
    },
    
    flxPwdVisiblityToggleOnClick: function() {
      if (this.view.imgPwdVisiblityToggle.src === this._textVisiblityOffIcon) {
        //this.view.imgPwdVisiblityToggle.src = this._textVisiblityOnIcon;
        this.view.imgPwdVisiblityToggle.src = "icon_hide.png";
        this.view.tbxPassword.secureTextEntry = false;
        this.view.flxContent.forceLayout();
      } else {
        this.view.imgPwdVisiblityToggle.src = this._textVisiblityOffIcon;
        this.view.tbxPassword.secureTextEntry = true;
        this.view.flxContent.forceLayout();
      }
    },
    
    enableLoginButton: function(){        
      const scopeObj = this;
      if(scopeObj.view.tbxUsername.text!=='' && scopeObj.view.tbxUsername.text!==null && scopeObj.view.tbxUsername.text!==undefined && scopeObj.view.tbxPassword.text!=='' && scopeObj.view.tbxPassword.text!==null && scopeObj.view.tbxPassword.text!==undefined){
        scopeObj.view.btnLogIn.setEnabled(true);
        scopeObj.view.btnLogIn.skin = "sknBtn0095e426pxEnabled";
      } else {
        scopeObj.view.btnLogIn.setEnabled(false);
        scopeObj.view.btnLogIn.skin = "sknBtna0a0a0SSPReg26px";
      }
    },
    
    clearUsernamePwd: function(){
      const scopeObj = this;
      var userNameDetails = applicationManager.getStorageManager().getStoredItem("maskUserName");
      if(userNameDetails && userNameDetails["maskedUserName"]){
        scopeObj.view.tbxUsername.text = userNameDetails["maskedUserName"];
      } else{
        scopeObj.view.tbxUsername.text = "";
      }
      scopeObj.view.tbxPassword.text = "";
      scopeObj.view.btnLogIn.skin = "sknBtna0a0a0SSPReg26px";
      scopeObj.view.btnLogIn.setEnabled(false);
      scopeObj.view.flxContent.forceLayout();
    },
    
    manageUname: function(loginData){
      if(loginData && loginData.isRememberMeOn !== true){
        this.view.tbxUsername.text = "";
        this.view.tbxPassword.text = "";
        this.view.switchRememberMe.selectedIndex = 1;
      } else {
        if(loginData && loginData.isFirstTimeLogin !== true){
          this.view.tbxUsername.text = this.LoginUtility.maskUserName(loginData.userName);
          var maskedUserName=this.view.tbxUsername.text;
          var userNameDetails={};
          userNameDetails["maskedUserName"]=maskedUserName;
          userNameDetails["backendUserName"]=loginData.userName;
          applicationManager.getStorageManager().setStoredItem("maskUserName",userNameDetails);
        } else{
          this.view.tbxUsername.text = "";
        }
        this.view.tbxPassword.text = "";
        this.view.switchRememberMe.selectedIndex = 0;
      }
    },
    
    populateUserName:function(userName){
      this.view.tbxUsername.text = this.LoginUtility.maskUserName(userName);
      var maskedUserName = this.view.tbxUsername.text;
      var userNameDetails={};
      userNameDetails["maskedUserName"]=maskedUserName;
      userNameDetails["backendUserName"]=userName;
      applicationManager.getStorageManager().setStoredItem("maskUserName",userNameDetails);
    },
    
    resetSkinsOfUsernameAndPwd: function(){
      this.view.tbxUsername.skin = "sknTbx424242SSPRegular28px";
      this.view.tbxPassword.skin = "sknTbx424242SSPRegular28px";
      if(this.view.tbxPassword.text !=='' && this.view.tbxPassword.text!==null && this.view.tbxUsername.text!==undefined){
        this.view.btnLogIn.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnLogIn.setEnabled(true);
      }
      this.view.flxContent.forceLayout();
    },
    
  };
});