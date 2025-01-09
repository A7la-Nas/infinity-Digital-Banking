define(['OLBConstants'],function(OLBConstants) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.scopes ={
        "LOGIN" : "LOGIN",
        "ACTIVATION" : "ACTIVATION",
        "IDV" : "IDV",
        "KYC" : "KYC",
        "CHANGEPIN"  : "CHANGEPIN"
      };
      this.authenticationJSON = {
        "Meta": {
          "EventType": "urn:com:temenos:security:event:login:v1",
          "RiskScore": ""
        },
        "urn:com:temenos:security:event:login:v1": {
          "Scope": "",
          "Name": "EuroBank Internet Banking",
          "UserName": "",
          "Password": "",
          "authType":"",
          "isMfa": "false"
        }
      };
      this._identityServiceName = "";
      this._riskScore = "";
      this._labelSkin = "";
      this._flxSkins = "";
      this._primaryBtnEnableSkin = {};
      this._primaryBtnDisableSkin = {};
      this._username = "";
      this._breakpoints = "";
      this._lblWelcomeMobile = "";
      this._rtxWithUsername = "";
      this._lblVerifiedUser = "";
      this.ApplicationContext = {};
      //this.sharedSecret="";
      
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "identityServiceName", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._identityServiceName=val;
        }
      });
      defineGetter(this, "identityServiceName", function() {
        return this._identityServiceName;
      });
      defineSetter(this, "riskScore", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._riskScore=val;
        }
      });
      defineGetter(this, "riskScore", function() {
        return this._riskScore;
      });
      defineSetter(this, "labelSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._labelSkin=val;
        }
      });
      defineGetter(this, "labelSkin", function() {
        return this._labelSkin;
      });
      defineSetter(this, "flxSkins", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._flxSkins=val;
        }
      });
      defineGetter(this, "flxSkins", function() {
        return this._flxSkins;
      });
      defineSetter(this, "primaryBtnEnableSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._primaryBtnEnableSkin=val;
        }
      });
      defineGetter(this, "primaryBtnEnableSkin", function() {
        return this._primaryBtnEnableSkin;
      });
      defineSetter(this, "primaryBtnDisableSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._primaryBtnDisableSkin=val;
        }
      });
      defineGetter(this, "primaryBtnDisableSkin", function() {
        return this._primaryBtnDisableSkin;
      });
      defineSetter(this, "username", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._username=val;
        }
      });
      defineGetter(this, "username", function() {
        return this._username;
      });
      defineSetter(this, "breakpoints", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._breakpoints=val;
        }
      });
      defineGetter(this, "breakpoints", function() {
        return this._breakpoints;
      });
      defineSetter(this, "lblWelcomeMobile", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._lblWelcomeMobile=val;
        }
      });
      defineGetter(this, "lblWelcomeMobile", function() {
        return this._lblWelcomeMobile;
      });
      defineSetter(this, "rtxWithUsername", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._rtxWithUsername=val;
        }
      });
      defineGetter(this, "rtxWithUsername", function() {
        return this._rtxWithUsername;
      });
      defineSetter(this, "lblVerifiedUser", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._lblVerifiedUser=val;
        }
      });
      defineGetter(this, "lblVerifiedUser", function() {
        return this._lblVerifiedUser;
      });
    },
// Commenting out all saveUserName and remember code for Uniken as the uniken portal takes care of this 
    setContext: function(context) {
      this.setRiskscore(context.riskScore);
      if (!kony.sdk.isNullOrUndefined(context.parentScope)) {
        this._parentScope = context.parentScope;
        this.ApplicationContext = context.parentScope.context;
        //this.view.rememberMe.disableRememberMe();
        this.setLabelsText();
      }
    },

    setRiskscore: function(value){
      if(value){
        this._riskScore = value;
      }
    },

    preshow : function(){
      let self = this;
      self.setFlowActions();
      let OLBLogoutStatus = kony.store.getItem('OLBLogoutStatus');
      if (OLBLogoutStatus || kony.store.getItem('UserLoginStatus')) {
        self.view.tbxUserName.text = OLBLogoutStatus && OLBLogoutStatus.userName? OLBLogoutStatus.userName : "";
        kony.store.removeItem('OLBLogoutStatus');
        kony.store.setItem('UserLoginStatus', false);
      } 
      // After Login error from forgot password flow we need to persist the user name
      if(self.view.flxLoginUser.isVisible){
        self.view.tbxUserName.text = self.view.lblVerifiedUser.text;
      }
      //self.restoreOriginalMainLoginUIChanges(self.view.tbxUserName.text);
      self.enableLogin();
      self.view.flxUserName.setVisibility(false);
    },

    setFlowActions : function(){
      let self = this;

      self.view.btnLogin.onClick = function(){
        self.onLoginClick();
      };

//       self.view.tbxUserName.onKeyUp = function(){
//         self.enableLogin();
//         self.checkifUserNameContainsMaskCharacter();
//         self.view.lblUsernameCapsLocIndicator.setVisibility(kony.application.getCurrentBreakpoint() > 1024 && event.getModifierState && event.getModifierState("CapsLock"));
//       };

//       self.view.tbxUserName.onTouchStart = function(){
//         self.setFocusSkin(self.view.flxUserName);
//         self.view.lblUsernameCapsLocIndicator.setVisibility(kony.application.getCurrentBreakpoint() > 1024 && event.getModifierState && event.getModifierState("CapsLock"));
//         if (self.view.tbxUserName.text.trim().length === 0) {
//           self.showUserNames();
//         }
//       };

//       self.view.tbxUserName.onEndEditing = function(){
//         self.hideUserNames();
//         self.setNormalSkin(self.view.flxUserName);
//         self.view.lblUsernameCapsLocIndicator.setVisibility(false);
//       };

//       self.view.tbxPassword.onKeyUp = function(){
//         self.enableLogin();
//         if (!kony.sdk.isNullOrUndefined(self.ApplicationContext) && self.ApplicationContext.isOriginationFlow)
//           self.enableEyeIcon();
//         self.view.lblPasswordCapsLocIndicator.setVisibility(kony.application.getCurrentBreakpoint() > 1024 && event.getModifierState && event.getModifierState("CapsLock"));
//       };

//       self.view.tbxPassword.onTouchStart = function(){
//         self.setFocusSkin(self.view.flxPassword);
//         self.view.lblPasswordCapsLocIndicator.setVisibility(kony.application.getCurrentBreakpoint() > 1024 && event.getModifierState && event.getModifierState("CapsLock"));
//       };

//       self.view.tbxPassword.onEndEditing = function(){
//         self.setNormalSkin(self.view.flxPassword);
//         self.view.lblPasswordCapsLocIndicator.setVisibility(false);
//       };

//       self.view.tbxPassword.onDone = function(){
//         self.enableLogin();
//         if(self.view.btnLogin.enable){
//           self.onLoginClick();
//         }
//       };

//       self.view.imgViewPassword.onTouchStart = function(){
//         let isSecuredText = self.view.tbxPassword.secureTextEntry;
//         self.view.tbxPassword.secureTextEntry = !isSecuredText;
//         if (!kony.sdk.isNullOrUndefined(self.ApplicationContext) && self.ApplicationContext.isOriginationFlow)
//           self.view.imgViewPassword.src = isSecuredText ? "unmask.png" : "mask.png";
//       };

//       self.view.segUsers.onRowClick = function(){
//         var val = self.view.segUsers.selectedRowItems[0].lblusers;
//         self.view.tbxUserName.text = val;
//         self.view.flxUserDropdown.isVisible = false;
//         self.enableLogin();
//       };

    },

    resetUI: function(){
      let self = this;
      self.view.rtxErrorMsg.isVisible = false;
//       self.view.flxUserName.setVisibility(true);
//       self.view.lblUsername.setVisibility(true);
      self.view.rtxErrorMsgUser.isVisible = false;
//       self.view.tbxUserName.text = "";
//       self.view.tbxPassword.text = "";
//       self.view.tbxPassword.secureTextEntry = true;
//       self.view.tbxUserName.text = self.username ? self.username : self.view.tbxUserName.text;
    },

    setFocusSkin: function (flexWidget) {
      flexWidget.skin = JSON.parse(this._flxSkins).focusSkin;
    },

    setNormalSkin: function (flexWidget) {
      flexWidget.skin = JSON.parse(this._flxSkins).normalSkin;
    },

    setErrorSkin: function (flexWidget) {
      flexWidget.skin = JSON.parse(this._flxSkins).errorSkin;
    },
    
    enableEyeIcon: function() {
      let self = this;
      let password = self.view.tbxPassword.text;
      let isEyeIconEnabled = (password) ? true : false ;
      self.view.imgViewPassword.setVisibility(isEyeIconEnabled);
    },

    isUserNameMasked : function(userName) {
      var userNameText = userName.substring(3, userName.length - 2);
      for (var i = 0; i < userNameText.length; i++) {
        if (userNameText.charAt(i) !== '*') {
          return false;
        }
      }
      return true;
    },

    getUnMaskedUserName: function (enteredUserName) {
      var names = JSON.parse(applicationManager.getStorageManager().getStoredItem("olbNames")) || [];
      var maskedUserValues = [];
      var unmaskedUserValues = [];
      maskedUserValues = names.map(function (nameObj) {
        unmaskedUserValues.push(Object.keys(nameObj)[0]);
        return nameObj[Object.keys(nameObj)[0]];
      });
      var index = maskedUserValues.indexOf(enteredUserName);
      if (index >= 0) {
        return unmaskedUserValues[index];
      }
      return null;
    },

    enableLogin: function () {
      let self = this;
      let username = self.view.tbxUserName.text;
      let password = self.view.tbxPassword.text;
      let isEnabled = (username && password) ? true : false ;
      self.view.btnLogin.setEnabled(true);
      let skins = isEnabled ? JSON.parse(self.primaryBtnEnableSkin) : JSON.parse(self.primaryBtnDisableSkin) ;
      self.view.btnLogin.skin = skins.normal;
      self.view.btnLogin.hoverSkin = skins.hoverSkin;
      self.view.btnLogin.focusSkin = skins.focusSkin;
    },

    onLoginClick : function(){
      if (!kony.sdk.isNullOrUndefined(this.ApplicationContext) && this.ApplicationContext.isOriginationFlow){
        try{
        var config = applicationManager.getConfigurationManager();
        if(config.defaultLocale === "en"){
          window.ecclClient.milestone("Login");
        }else{
          window.ecclClient.milestone(kony.i18n.getLocalizedString("Infinity.onboarding.Analytics.Login"));
        }
      }catch(e){
        kony.print(e);
      }
      var scope = this;
      var userName = scope.view.tbxUserName.text.trim();
      var password = scope.view.tbxPassword.text;
      var inputRequest;
      if(!this.ApplicationContext.isExistentMember){
        inputRequest = {
          "username": userName,
          "password": password,
          "prospect" : "true",
          "resume" : true
        };
      }
      else{
        inputRequest = {
          "username": userName,
          "password": password
        };
      }
      var onOriginationLoginSuccess=function(response){
        scope.onOriginationLoginSuccess(response);
      };
      var onOriginationLoginFailure=function(error){
        scope.onOriginationLoginFailure(error);
      };
      try{
        kony.application.showLoadingScreen();
        applicationManager.getAuthManager().login(inputRequest,onOriginationLoginSuccess.bind(this),onOriginationLoginFailure.bind(this));
      }
      catch(err){
        kony.print("login failed" + JSON.stringify(err));
        kony.application.dismissLoadingScreen();
      }
      } else {
        let self = this;
        self.view.rtxErrorMsg.setVisibility(false);
        //let status = self.view.rememberMe.isRememberMe();
        var enteredUserName = self.view.tbxUserName.text.trim();
        let isUsernameMasked = self.isUserNameMasked(enteredUserName);
        let usernamePasswordJSON = {
          // "UserName": isUsernameMasked ? self.getUnMaskedUserName(enteredUserName) : enteredUserName,
          // "Password": self.view.tbxPassword.text
        };
        usernamePasswordJSON.loginOptions = {
          "isOfflineEnabled": false
        };
        self.username = usernamePasswordJSON.UserName;
        // self.authenticationJSON["urn:com:temenos:security:event:login:v1"].UserName = usernamePasswordJSON.UserName;
        // self.authenticationJSON["urn:com:temenos:security:event:login:v1"].Password = usernamePasswordJSON.Password;
        // self.authenticationJSON["urn:com:temenos:security:event:login:v1"].Scope = "LOGIN"; 
        // self.authenticationJSON.Meta.RiskScore = self._riskScore;
        kony.application.showLoadingScreen();
        //kony.mvc.MDAApplication.getSharedInstance().appContext.rememberMeStatus = status;
       
        let authClient = KNYMobileFabric.getIdentityService(self.identityServiceName);
        authClient.login(usernamePasswordJSON, self.onLoginSuccess1, self.onLoginFailure);
      }
    },
     onLoginSuccess1: function(response){
        let self = this;
      	let params = kony.sdk.getCurrentInstance().tokens[self.identityServiceName].provider_token.params;
       let usernamePasswordJSON = {
         "access_token" : params.access_token,
         "token_type" : params.token_type
       }
       usernamePasswordJSON.loginOptions = {
          "isOfflineEnabled": false,
          "isSSOEnabled" : true
        };
        let authClient = KNYMobileFabric.getIdentityService("DbxUserLogin");
        authClient.login(usernamePasswordJSON, self.onLoginSuccess, self.onLoginFailure);
     },

    onLoginSuccess: function(response){
      let self = this;
      let params = kony.sdk.getCurrentInstance().tokens[self.identityServiceName].provider_token.params;
	  try{
		window.addEventListener('beforeunload', function (event) { // or 'unload'
			KNYMobileFabric.getIdentityService("DBXUserLogin").logout(()=>{},()=>{},{"loginOptions": {"isOfflineEnabled": false}});
			var until = new Date().getTime() + 1000;
			while (new Date().getTime() < until);
			});
		}
	  catch(e){
		kony.print("Error adding event listener to windows.beforeunload ");
	  }
      if(params && params.is_mfa_enabled) {
        self.MFANavigation(params.mfa_meta);
      } else {
        response = {"username":params.display_name};
        self.onSuccessCallback(response);
      }
    },

    onLoginFailure: function(response){
      let self = this;
      kony.application.dismissLoadingScreen();
      if (kony.mvc.MDAApplication.getSharedInstance().appContext.isCSR_Assist_Mode && self.showServerErrorPage) {
          self.showServerErrorPage();
      } else {
        let errorMsg = (response.details && response.details.errmsg)  ? response.details.errmsg : ((response.errmsg && response.errmsg.errorMessage) ? response.errmsg.errorMessage: "User does not exist.");
        self.showLoginError(errorMsg);
      }
    },
    
    onOriginationLoginSuccess: function(response){
      this._parentScope["loginSuccessCallback"](response);
    },

    onOriginationLoginFailure: function(error){
      let self = this;
      let errorMsg;
      kony.application.dismissLoadingScreen();
//       let errorMsg = (response.details && response.details.errmsg)  ? response.details.errmsg : ((response.errmsg && response.errmsg.errorMessage) ? response.errmsg.errorMessage: "User does not exist.");
      if(error && error.errmsg && error.errmsg.serverErrorRes && error.errmsg.serverErrorRes.errcode){
        if(error.errmsg.serverErrorRes.errcode.toString()==="10095"){
          errorMsg=kony.i18n.getLocalizedString("Infinity.onboarding.login.Incorrectusernamepassword");
        }else if(error.errmsg.serverErrorRes.errcode.toString()==="10088"){
          errorMsg=self.replaceProfilelockedtime(error.errmsg.errorMessage);
        }else{
          errorMsg = error.errmsg.errorMessage;
        }
      }
      else if(error && error.errmsg && error.errmsg.errorMessage){
        errorMsg = error.errmsg.errorMessage;
      }
      else if(error.partyError){
        errorMsg = kony.i18n.getLocalizedString("kony.nuo.login.ErrorMessage.InternalError");
      }
      else if(error.PartyIdNotAvailable)
        errorMsg = kony.i18n.getLocalizedString("kony.mb.sca.ErrMsgPartyIdentiNotAvble");
        else{
          errorMsg = kony.i18n.getLocalizedString("kony.nuo.login.ErrorMessage.SomethingWrong");
        }
      self.showLoginError(errorMsg);
    },
    
    replaceProfilelockedtime: function(profilelockedmessage){
      var i18NMessage = kony.i18n.getLocalizedString("Infinity.onboarding.login.ProfileLocked");
      var minutesInServerMsg = profilelockedmessage.match(/(\d+)/); 
      var minutesIni18NMessage = i18NMessage.match(/(\d+)/); 
      var actualMessage = i18NMessage.replace(minutesIni18NMessage[0], minutesInServerMsg[0]); 
      return actualMessage;
    },

    showLoginError: function(errorMsg){
      let self = this;
      self.view.rtxErrorMsg.text = errorMsg;
      self.view.rtxErrorMsg.setVisibility(true);
      self.view.tbxPassword.text = "";
      self.view.tbxPassword.secureTextEntry = true;
      self.view.setVisibility(true);
      self.setErrorSkin(self.view.flxUserName);
      self.setErrorSkin(self.view.flxPassword);
      //self.enableLogin();
      this.view.btnLogin.skin = "sknBtnBlockedSSPFFFFFF15Px";
      if(self.forceLayout){
        self.forceLayout();
      }
    },

    onBreakpointChange : function(){
      let self = this;
      let breakpoint = kony.application.getCurrentBreakpoint();
      if(breakpoint === 640 || breakpoint === 768 || breakpoint === 1024) {
        self.view.lblWelcomeMobile.top = "25dp";
        self.view.lblWelcomeMobile.centerX = "50%";
        self.view.rtxWithUsername.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        self.view.lblVerifiedUser.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      } else {
        self.view.lblWelcomeMobile.top = "15dp";
        self.view.lblWelcomeMobile.centerX = "";
      }
      self.setSkins();
      self.view.forceLayout();
    },

    setSkins: function(){
      let self = this;
      let currentBreakPoint = kony.application.getCurrentBreakpoint();
      let labelSkin = self.breakPointParser(this._labelSkin,currentBreakPoint);
      self.view.lblUsername.skin = labelSkin;
      self.view.lblPassword.skin = labelSkin;
    },

    breakPointParser:function(inputJSON,lookUpKey){
      let jsonValue = (typeof inputJSON === "string") ? JSON.parse(inputJSON) : inputJSON;
      if(jsonValue.hasOwnProperty(lookUpKey)){
        return jsonValue[lookUpKey].skin;
      }
      else if(jsonValue["default"]){
        return jsonValue["default"].skin;
      }
      return jsonValue;
    },

    hideUserNames: function () {
      var self = this;
      self.enableLogin();
      if (self.view.tbxUserName.text.trim()) {
        self.view.flxUserDropdown.setVisibility(false);
      }
    },

    removeSpecialCharacter: function () {
      var str = this.view.tbxUserName.text;
      if (str) {
        if (str.charAt(str.length - 1) === '*') {
          this.view.tbxUserName.text = str.substring(0, str.length - 1);
        }
      }
    },

    checkifUserNameContainsMaskCharacter: function () {
      var self = this;
      self.removeSpecialCharacter();
      if (self.view.tbxUserName.text.trim()) {
        self.view.flxUserDropdown.setVisibility(false);
      } else {
        self.showUserNames();
      }
      self.enableLogin();
    },

    /**
     * This  function checks whether there are any usernames saved or not..if there are no usernames then it hides the dropdown or shows the masked usernames iin the dropdown
     */
    showUserNames: function () {
      var storagaManager = applicationManager.getStorageManager();
      var savedUserNames = JSON.parse(storagaManager.getStoredItem("olbNames"));
      if (savedUserNames === null || savedUserNames.length === 0) {
        this.view.flxUserDropdown.isVisible = false;
      } else {
        this.showUserNameSuggestions(JSON.parse(storagaManager.getStoredItem("olbNames")));
      }
    },

    /**
     * This  function shows the list of the usernames stored in the local Storage
     * @param {string} enteredText text entered by user in user name field
    */
    showUserNameSuggestions: function (enteredText) {
      if (enteredText !== null && enteredText !== undefined) {
        this.view.segUsers.removeAll();
        var x = [];
        for (var index in enteredText) {
          for (var attr in enteredText[index]) {
            var y = {
              "lblusers": enteredText[index][attr]
            };
            x.push(y);
          }
        }
        this.view.segUsers.addAll(x);
      }
      this.view.flxUserDropdown.setVisibility(true);
      this.view.flxUserDropdown.parent.forceLayout();
    },

    /**
     * This function checks if the user already present in local Storage or not
     * @param {string} username - user name entered by user
     * @returns {boolean}  true --if the username is present ,false if the username is not present
      */
     chkUserInLocal: function (username) {
      let self = this;
      var usernames = applicationManager.getStorageManager().getStoredItem('olbNames');
      if (usernames !== null && usernames !== '') {
        usernames = JSON.parse(usernames);
//         for (var index in usernames) {
//           if (self.getUnMaskedUserName(usernames[index][username]) === username) {
//             return true;
//           }
//         }
        for( var i = 0; i < usernames.length; i++ ) {
           var obj = usernames[i];
           for (var user in obj) {
               if(user.toLowerCase()===username){
                  return usernames[i][user];
               }
           }
       }
      }
      return false;
    },

    maskUserName: function (userName) {
      var maskedUserName = '';
      var firstThree = userName.substring(0, 3);
      var lastTwo = userName.substring(userName.length - 2, userName.length);
      var xLength = userName.length - 5;
      var maskString = '';
      for (var i = 0; i < xLength; i++) {
        maskString = maskString + '*';
      }
      maskedUserName = firstThree + maskString + lastTwo;
      return maskedUserName;
    },
    /**
    * This UI function is for recovered Username UI Changes after user verified
    */
    recoveredUsernameUIChanges: function(username){
      let self = this;
      self.view.rtxErrorMsg.isVisible = false;
      self.view.flxLoginUser.isVisible = true;
      self.view.rtxWithUsername.skin = "sknSSPLight42424218Px";
      self.view.rtxWithUsername.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      self.view.lblVerifiedUser.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      self.view.lblVerifiedUser.text = username;
      self.view.flxUserName.setVisibility(false);
      self.view.lblUsername.setVisibility(false);
      self.view.flxUserDropdown.setVisibility(false);
      self.view.tbxUserName.text = username;
      self.view.tbxPassword.text = "";
      self.view.tbxPassword.secureTextEntry = true;
      self.enableLogin();
    },

    restoreOriginalMainLoginUIChanges: function(userName){
      let self = this;
      self.view.flxLoginUser.setVisibility(false);
      if (self.chkUserInLocal(userName)) {
       // self.view.tbxUserName.text = self.maskUserName(userName);
	      self.view.tbxUserName.text = self.chkUserInLocal(userName);
      } else {
        self.view.tbxUserName.text = "";
      }
      self.view.tbxPassword.text = "";
      self.view.rtxErrorMsgUser.isVisible = false;
      self.view.tbxPassword.secureTextEntry = true;
      self.enableLogin();
    },
    
    setLabelsText: function(){
	//To prefill the username from the deeplink url 
      if (!kony.sdk.isNullOrUndefined(this.ApplicationContext.userName))
        this.view.tbxUserName.text = this.ApplicationContext.userName;
      if(this.ApplicationContext.isExistentMember !== undefined && !this.ApplicationContext.isExistentMember ){
        this.view.lblPassword.text = kony.i18n.getLocalizedString("Infinity.Onboarding.Accessibility.frmApplicationID.enterTemporaryPassword");
        this.view.tbxPassword.placeholder = kony.i18n.getLocalizedString("Infinity.Onboarding.Accessibility.frmApplicationID.enterTemporaryPassword");
      }
      else{
        this.view.lblPassword.text = kony.i18n.getLocalizedString("kony.nuo.Login.Password");
        this.view.tbxPassword.placeholder = kony.i18n.getLocalizedString("kony.nuo.Login.Password");
      }
    }
  };
});