define(['./LoginUtility','./LoginDAO'],function(LoginUtility, LoginDAO) {
   var SDKConstants = {
    "PIN_REQUEST" : 100,
    "OTP_GENERATED" : 106
  };
  var emptyContainer = "{\n  \"creationDate\" : \"\",\n  \"expiryDate\" : \"\",\n  \"containerId\" : \"\",\n  \"name\" : \" \",\n  \"userId\" : \" \",\n  \"renewalDate\" : \"\"\n}"; //TSR-151084
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
      this.noOfDaysBeforeContainerRenewal= 15;
      
      this.usersListObj = {
        usersList:[],
        selectedUser:""
      };
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
    
    preShow: function(){
      this.setTextFromi18n();
      this.resetUI();
      this.setFlowActions();
      let navData = applicationManager.getNavigationManager().getCustomInfo("frmLogin");      
      this.manageUname(navData);
      this.showDefaultLoginScreen(navData);
      const navManager = applicationManager.getNavigationManager();
      const userListObj = navManager.getCustomInfo("frmSelectUserId");
      if(userListObj && userListObj.selectedUser!==""){
        this.usersListObj.usersList = userListObj.usersList;
        this.usersListObj.selectedUser = userListObj.selectedUser;
      }
      this.fetchUserIds();
      this.fetchUserLimits();
    },
    
    updateDeviceRegistrationToken:function(){
       var key = {"identifier":"pushRegId"};
       var pushRegData = kony.keychain.retrieve(key);
       if(pushRegData){
       		var pushRegJSON = JSON.parse(JSON.stringify(pushRegData));
            this.view.sdk.updatePushRegistrationToken(pushRegJSON.securedata);
       }
    },
  fetchUserIds:function(callback){
        // TODO: Fetch UserId Data. - This callback should be called once data is retrieved from the server.
        // this.usersListObj is a global variable.
        var regUserList = this.view.sdk.getAllContainers();
        var containerList = JSON.parse(regUserList).containers;
        if(containerList){
          this.usersListObj.usersList = JSON.parse(regUserList).containers;
          hidContainersList = this.usersListObj.usersList.length;
          this.usersListObj.usersList.unshift(emptyContainer); //TSR-151084
          this.displaySelectedUser(this.usersListObj.usersList);
        }
      },
    fetchUserLimits : function() {
    const configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
    configurationSvc.getAllClientAppProperties((response) => {
    var hidUserlimit = response.SCA_MAXIMUM_USER;
    hidUserCount = hidUserlimit.replace(/\D/g, "");
      });
    },
    displaySelectedUser: function(userIdList){
        this.view.btnLogIn.setEnabled(true);
        this.view.btnLogIn.skin = "sknBtn0095e426pxEnabled";
        var emptyUserID = JSON.parse(userIdList[0]).userId;
        if (emptyUserID === " " && userIdList.length === 2) { //TSR-151084
        this.view.flxSingleUserID.setVisibility(true);
        this.view.flxMultipleUserIDs.setVisibility(false);
        this.view.lblUserId.text = JSON.parse(userIdList[1]).userId;
      }else if (emptyUserID === " " && userIdList.length === 1) { //TSR-151084
        this.view.flxSingleUserID.setVisibility(true);
        this.view.flxMultipleUserIDs.setVisibility(false);
        this.view.lblUserId.text = JSON.parse(userIdList[0]).userId;
      } else {
        this.view.flxSingleUserID.setVisibility(false);
        this.view.flxMultipleUserIDs.setVisibility(true);
        if(this.usersListObj.selectedUser===""){
          this.view.lblSelectedUserId.text = JSON.parse(userIdList[0]).userId;
        } else {
          this.view.lblSelectedUserId.text = this.usersListObj.selectedUser;
        }
      }
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
      this.view.flxMultipleUserIDs.onClick = function(){
        const navManager = applicationManager.getNavigationManager();        
        navManager.setCustomInfo("frmSelectUserId", scopeObj.usersListObj);
        navManager.navigateTo({"appName": "AuthenticationMA","friendlyName": "AuthHIDUIModule/frmSelectUserId"});
      };
      this.view.btnLogIn.onClick = function(){
        scopeObj.btnLoginOnClick();
      };
      this.view.tbxUsername.onTextChange = function(){
        scopeObj.enableLoginButton();
      };
      this.view.tbxUsername.onTouchStart = function(){
        scopeObj.raiseComponentEvent('onFocusStart', null);
      };
      this.view.tbxUsername.onDone = function(){
        scopeObj.raiseComponentEvent('onFocusEnd', null);
      };
      this.view.tbxPassword.onTextChange = function(){
        scopeObj.enableLoginButton();
      };
      this.view.tbxPassword.onTouchStart = function(){
        scopeObj.raiseComponentEvent('onFocusStart', null);
      };
      this.view.tbxPassword.onDone = function(){
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

      scopeObj.view.lblCantSignIn.onTouchEnd = function(){
        scopeObj.raiseComponentEvent('forgotNavigation');
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
      if (loginData.isFirstTimeLogin){
        scopeObj.raiseComponentEvent("setUIAtFormLevelEvent","password");
      }
      if(loginData.usernameFromForgotUsername && (loginData.usernameFromForgotUsername !== undefined || loginData.usernameFromForgotUsername !== "")){
        scopeObj.raiseComponentEvent("setUIAtFormLevelEvent","password");
        scopeObj.populateUserName(loginData.usernameFromForgotUsername);
      } else if (loginData.NUOUsername && (loginData.NUOUsername !== undefined || loginData.NUOUsername !== "")){
        scopeObj.raiseComponentEvent("setUIAtFormLevelEvent","password");
        scopeObj.populateUserName(loginData.NUOUsername);
      } else {
        scopeObj.LoginUtility.showLoadingScreen();
        let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLogin");
        scopeObj.selectLoginMode(loginData.defaultAuthMode);
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
      this.view.flxLoginPassword.top = "0%";
      this.view.flxContent.forceLayout();
      this.view.forceLayout();
      this.view.lblErrorMessage.setVisibility(false);
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
    
    btnLoginOnClick: function() {
      const scopeObj = this;
      this.view.lblErrorMessage.setVisibility(false);
      this.LoginUtility.detectDynamicInstrumentation();
	  var userId = "";
      if(this.usersListObj.usersList !== null && this.usersListObj.usersList.length === 2){
         userId = this.view.lblUserId.text;
      }else if(this.usersListObj.usersList !== null && this.usersListObj.usersList.length > 1){  
        userId = this.view.lblSelectedUserId.text;
      }
      var currentForm = kony.application.getCurrentForm();
      if(userId!==null){
        userId = userId.trim();
      }
      this.view.sdk.renewContainer(userId,scopeObj.noOfDaysBeforeContainerRenewal,function(status,otpJSON){
        if(SDKConstants.PIN_REQUEST === status) {
          var pinLength = JSON.parse(otpJSON).MAX_LENGTH;
         
         var sdk = new com.temenos.hidapprove.sdk({
           "autogrowMode": kony.flex.AUTOGROW_NONE,
           "clipBounds": true,
           "height": "100%",
           "id": "sdk",
           "isVisible": true,
           "layoutType": kony.flex.FREE_FORM,
           "left": "-2dp",
           "masterType": constants.MASTER_TYPE_USERWIDGET,
           "isModalContainer": false,
           "appName":"ResourcesHIDMA",
           "skin": "sknFlx000000Op50",
           "top": "0dp",
           "width": "100%",
           "overrides": {
             "sdk": {
               "right": "viz.val_cleared",
               "bottom": "viz.val_cleared",
               "minWidth": "viz.val_cleared",
               "minHeight": "viz.val_cleared",
               "maxWidth": "viz.val_cleared",
               "maxHeight": "viz.val_cleared",
               "centerX": "viz.val_cleared",
               "centerY": "viz.val_cleared"
             }
           }
         }, {
           "overrides": {}
         }, {
           "overrides": {}
         });        

         if(currentForm.sdk){
           currentForm.remove(currentForm.sdk);
         }
         currentForm.add(sdk);
         currentForm.sdk.setVisibility(true);
         scopeObj.view.forceLayout();
        currentForm.sdk.showPinDialog(pinLength);
       }
       else{
        kony.application.dismissLoadingScreen();
        if(currentForm.sdk){
          currentForm.sdk.hidePinDialog();
          currentForm.remove(currentForm.sdk);
        }
         scopeObj.view.forceLayout();
         scopeObj.renewalcallback(userId);
       }
      });
      
//       let enteredUserName = this.view.tbxUsername.text.trim();
//       let navManager = applicationManager.getNavigationManager();
//       navManager.setCustomInfo("frmLoginusername",enteredUserName);
//      navManager.setCustomInfo("prevFlowFilterAccounts",undefined);

//       var userNameDetails=applicationManager.getStorageManager().getStoredItem("maskUserName");
//       if (scopeObj.LoginUtility.isUserNameMasked(enteredUserName) && userNameDetails["maskedUserName"]===enteredUserName) {
//         enteredUserName=userNameDetails["backendUserName"];
//         navManager.setCustomInfo("frmLoginusername",enteredUserName);
//       }
//       let enteredPassword = this.view.tbxPassword.text.trim();      
//       let UsernamePasswordJSON = {"username":enteredUserName,"password":enteredPassword};
//       this.currentAuthMode = "password";
//       this.JSONUsernamePassword = UsernamePasswordJSON;
//       if (UsernamePasswordJSON.username && UsernamePasswordJSON.password) {
//       	this.login(UsernamePasswordJSON);
//       } else {
//         this.LoginUtility.dismissLoadingScreen();
//         this.raiseComponentEvent('onLoginFailure', applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Invalid.Username.or.Password"));        
//       }
    },

    renewalcallback : function(userId){
      var currentForm = kony.application.getCurrentForm();
      //var currentForm1=navManager.getCurrentForm();
      const scopeObj = this;
      this.view.sdk.generateSynchronousOTP(userId, function(status,otpJSON) {
        if(SDKConstants.PIN_REQUEST === status) {
           var pinLength = JSON.parse(otpJSON).MAX_LENGTH;
          
          var sdk = new com.temenos.hidapprove.sdk({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "100%",
            "id": "sdk",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "-2dp",
            "masterType": constants.MASTER_TYPE_USERWIDGET,
            "appName":"ResourcesHIDMA",
            "isModalContainer": false,
            "skin": "sknFlx000000Op50",
            "top": "0dp",
            "width": "100%",
            "overrides": {
              "sdk": {
                "right": "viz.val_cleared",
                "bottom": "viz.val_cleared",
                "minWidth": "viz.val_cleared",
                "minHeight": "viz.val_cleared",
                "maxWidth": "viz.val_cleared",
                "maxHeight": "viz.val_cleared",
                "centerX": "viz.val_cleared",
                "centerY": "viz.val_cleared"
              }
            }
          }, {
            "overrides": {}
          }, {
            "overrides": {}
          });        

          if(currentForm.sdk){
            currentForm.remove(currentForm.sdk);
          }
          currentForm.add(sdk);
          currentForm.sdk.setVisibility(true);
          currentForm.sdk.showPinDialog(pinLength);
        }else if(SDKConstants.OTP_GENERATED === status){
          if(currentForm.sdk){
            currentForm.sdk.hidePinDialog();
            currentForm.remove(currentForm.sdk);
          }
          let identityServiceName = scopeObj._identityServiceName;
          var authParams = {
              "userid": userId,
              "password": JSON.parse(otpJSON).otp,
              "isMobile": true
          };          
          applicationManager.getPresentationUtility().showLoadingScreen();
          scopeObj.LoginDAO.login(authParams, scopeObj.onLoginSuccessCallback, scopeObj.onLoginFailureCallback, identityServiceName);
        }
      });
    },
    
    login: function(UsernamePasswordJSON) {
      const scopeObj = this;
      scopeObj.currentAuthMode = "password";
      let authParams = {
        "UserName": UsernamePasswordJSON.username,
        "Password": UsernamePasswordJSON.password,
        "loginOptions": {
          "isOfflineEnabled": false
        }
      };
      let identityServiceName = this._identityServiceName;
      this.LoginDAO.login(authParams, scopeObj.onLoginSuccessCallback, scopeObj.onLoginFailureCallback, identityServiceName);
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
      this.view.lblErrorMessage.text = "Something went wrong, please try again. If the problem persists please contact the bank.";
      this.view.lblErrorMessage.setVisibility(true);
      this.clearUsernamePwd();
      //this.raiseComponentEvent('onLoginFailure', errMsg); AAC-8930
    },
    
    rememberMeOption: function(){
      const scopeObj = this;
      var rememberMeSwitchValue = this.view.switchRememberMe.selectedIndex;
      var loginData = applicationManager.getNavigationManager().getCustomInfo("frmLogin");
      if(rememberMeSwitchValue === 0) {
        scopeObj.setRememberMeFlag(true);
        applicationManager.getDataforLogin();
      } else {
        if (loginData.istouchIdEnabled || loginData.isPinModeEnabled || loginData.isFacialAuthEnabled)
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
        this.view.imgPwdVisiblityToggle.src = this._textVisiblityOnIcon;
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
      if(loginData.isRememberMeOn !== true){
        this.view.tbxUsername.text = "";
        this.view.tbxPassword.text = "";
        this.view.switchRememberMe.selectedIndex = 1;
      } else {
        if(loginData.isFirstTimeLogin !== true){
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
