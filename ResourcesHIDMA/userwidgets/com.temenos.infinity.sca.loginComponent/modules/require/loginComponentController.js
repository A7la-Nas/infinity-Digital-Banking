define(["./SCAPresentationController",'OLBConstants'],function(SCAPresentationController,OLBConstants) {
  
  var flxIdArray = ["flxCredentials","flxCIBA"];
   var Popup ;
  
  constants.LOGIN_FAILURE_MESSAGE = "Login failed : Please enter valid username and password"
  constants.CIBA_LOGON_POLL_EXPIRED = "Approval request failed. Please sign in again.";//"The approval for your login could not be received.\n Please re-login";
  constants.CIBA_REQUEST_DENIED = "Approval request failed. Please sign in again.";//"Push-based logon request approval denied";
  constants.INVALID_USER_ID="Invalid User ID";
  
  return {
    /**
       * @constructor constructor
       * @param basicConfig
       * @param layoutConfig
       * @param pspConfig
       */
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this._primaryBtnEnableSkin = {};
      this._primaryBtnDisableSkin = {};
      this._breakpoints = "";
      this.TM_Cookie_Sid = "";
      this.TM_Cookie_Tag = "";
      this.tm_sid = "";
      this.tm_tag = "";
    },
    client_ip : "",
    isSCARMSEnabled : false,
    initGettersSetters: function () {
      defineSetter(this, "primaryBtnEnableSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._primaryBtnEnableSkin = val;
        }
      });
      defineGetter(this, "primaryBtnEnableSkin", function () {
        return this._primaryBtnEnableSkin;
      });
      defineSetter(this, "primaryBtnDisableSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._primaryBtnDisableSkin = val;
        }
      });
      defineGetter(this, "primaryBtnDisableSkin", function () {
        return this._primaryBtnDisableSkin;
      });
      defineSetter(this, "breakpoints", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._breakpoints=val;
        }
      });
      defineGetter(this, "breakpoints", function() {
        return this._breakpoints;
      });
      defineGetter(this, "isRMSEnabled", function() {
        kony.print(this._isRMSEnabled);
        return this._isRMSEnabled;
      });
      defineSetter(this, "isRMSEnabled", function(val){
        if(!(val) || val == undefined){
          this._isRMSEnabled = false;
        }
        else this._isRMSEnabled = val;
      });
      //Check for RMS Read Only or not.
      defineGetter(this, "isRMSReadOnly", function() {
        kony.print('isRMSReadOnly:'+this._isRMSReadOnly);
        return this._isRMSReadOnly;
      });
      defineSetter(this, "isRMSReadOnly", function(val){
        if(!(val) || val == undefined){
          this._isRMSReadOnly = false;
        }
        else this._isRMSEnabled = val;
      });
      //Check for RMS defined Cookies
      defineGetter(this, "tmCookieSid", function() {
        return this.TM_Cookie_Sid;
      }); defineSetter(this, "tmCookieSid", function(val){
        if(!(val) || val == undefined){
          throw {
            "type": "CUSTOM",
            "message": "TM_COOKIE_SID property is Invalid"
          };
        }
        this.TM_Cookie_Sid = val;
      });//
      defineGetter(this, "tmCookieTag", function(){
        return this.TM_Cookie_Tag;
      }); 
      defineSetter(this, "tmCookieTag", function(val){
        if(!(val) || val == undefined){
          throw {
            "type": "CUSTOM",
            "message": "TM_COOKIE_SID property is Invalid"
          };
        }
        this.TM_Cookie_Tag = val;
      });

    },
     preshow: function () {
     	 this.setActions();
   	  	 this.resetUI();
       	  this.SCARiskAssessment();
     },
    SCARiskAssessment: function () {
      if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT.toUpperCase() === "TRUE")
        isSCARMSEnabled = true;
      else 
         isSCARMSEnabled = false;
    },

     resetUI: function () {
      let self = this;
      self.view.lblError.setVisibility(false);
      self.view.tbxUserName.top = "70dp";
      self.view.tbxUserName.text = "";
      self.view.tbxPassword.text = "";
      self.view.tbxPassword.secureTextEntry = true;
      self.enableLogin();
    },
    clearForm: function(){
      let self = this;
      self.view.tbxUserName.text = "";
      self.view.tbxPassword.text = "";
    },
    setActions: function () {

      let self = this;
      
       self.view.btnNext.onClick = function(){
        self.onLogin();
      };
      self.view.tbxUserName.onKeyUp = function () {
        self.enableLogin();
      };
      self.view.tbxPassword.onKeyUp = function () {
        self.enableLogin();
      };
      
       self.view.tbxPassword.onDone = function(){
        self.enableLogin();
        if(self.view.btnNext.enable){
          self.onLogin();
        }
      };
           
    },
    enableLogin: function () {
      let self = this;
      let username = self.view.tbxUserName.text;
      let password = self.view.tbxPassword.text;
      let isEnabled = (username && password) ? true : false;
      let skins = isEnabled ? JSON.parse(self.primaryBtnEnableSkin) : JSON.parse(self.primaryBtnDisableSkin);
      self.view.btnNext.skin = skins.normal;
      self.view.btnNext.hoverSkin = skins.hoverSkin;
      self.view.btnNext.focusSkin = skins.focusSkin;
      self.view.btnNext.setEnabled(isEnabled);
      self.view.forceLayout();
    },
    initSCA : function(){
    },
    verifyUserId : function(){
      if(this.view.tbxUserName.text.trim() === ""){
        this.view.lblError.text="Please enter User ID";
        return; 
      }
      SCAPresentationController.verifyUserId(this.view.tbxUserName.text.trim(),this.onVerifyUserIdSuccess.bind(this),this.onVerifyUserIdFailure.bind(this));      
    }, 
    onSignInCancel : function(){
      let self = this;
      self.view.flxPassword.setVisibility(false);
      self.view.btnNext.text="Next";
      self.view.btnNext.onClick = this.verifyUserId;
      self.view.tbxUserName.setEnabled(true);
      self.view.tbxUserName.text="";
      self.view.lblError.text="";
      self.view.tbxUserName.setFocus(true);
      self.view.forceLayout();
    },
    
    onVerifyUserIdSuccess : function(response){
      let self = this;
      kony.application.dismissLoadingScreen(); 
      if(typeof response.User === 'undefined' || response.User.length === 0 || JSON.stringify(response.User[0]) === "{}"){
		  self.view.lblError.text= constants.INVALID_USER_ID;
      }else{
        self.view.lblError.text="";
        self.view.flxPassword.setVisibility(true); 
        self.view.tbxUserName.setEnabled(false);
        self.view.btnNext.text="Login";
        self.view.btnNext.onClick = this.onLogin.bind(this);
        
      }
      self.view.forceLayout();
   },
   onVerifyUserIdFailure :  function(error){
     kony.application.dismissLoadingScreen();  
      
   },
     onLogin : function(){
      if(isSCARMSEnabled)
        {
        	this.onLoginWithRms();
        }
      else
        {
          this.onLoginWithoutRms();
        }
      
    },
   onLoginWithoutRms : function(){
     var id = Math.random().toString(36).substr(2, 9);
     var credentialInfo = {
        "userid" : this.view.tbxUserName.text.trim(),
        "password" : this.view.tbxPassword.text.trim(),
        "currentRiskScore":"1",
        "requiredRiskScore":"1",
        "transactionId": id
     };
	
     SCAPresentationController.login(credentialInfo,this.updateFormUI);
   },
     initRMSParams: function(){
       let decodeCookie = document.cookie.split(";");
        for(var i=0; i<decodeCookie.length; i++) {
          cookiename = decodeCookie[i].split('=')[0].replace(/\s/g, "");
          if (cookiename === this.TM_Cookie_Sid){
            this.tm_sid = decodeCookie[i].split('=')[1];
          }
          if (cookiename === this.TM_Cookie_Tag){
            this.tm_tag = decodeCookie[i].split('=')[1];
          }
        }
        let typedArray = new Uint8Array(1)
        let randomValues = crypto.getRandomValues(typedArray)[0]
        let randomFloat = randomValues / Math.pow(2, 8)
        let randomValue = Math.floor(randomFloat * 10000000);
        this.app_session_id = String(randomValue) ;
      	applicationManager.setRmsSessionID(this.app_session_id);
  },
    
   onLoginWithRms : function(){
    var self = this;
     var id = Math.random().toString(36).substr(2, 9);
     this.initRMSParams();
     var credentialInfo = {
        "userid" : this.view.tbxUserName.text.trim(),
        "password" : this.view.tbxPassword.text.trim(),
        "transactionId": id,
       	"isRMSEnabled": "true",
        "tm_sid" : this.tm_sid,
        "tm_tag" : this.tm_tag,
        "app_session_id" : this.app_session_id
     };
      if(this.client_ip.trim() != ""){
          credentialInfo.client_ip = this.client_ip;
          SCAPresentationController.login(credentialInfo,this.updateFormUI);
        }else{
          const url = "https://api.ipify.org/?format=json"
          fetch(url)
            .then(response => response.json())
            .then(data =>{ 
            self.client_ip = data.ip;
            //alert(data.ip);
             credentialInfo.client_ip = data.ip;
            SCAPresentationController.login(credentialInfo,this.updateFormUI);
          });
        }
    
   },
   
   onCIBAInitiationSuccess : function(response){
     var self = this;
      var imgProgress = self.view.imgProgress;
      //self.onSignInCancel();
      //self.navigateTo("flxCIBA");
     //current form - frmlogin
     var currform = kony.application.getCurrentForm();
     Popup = new com.temenos.infinity.sca.Popup({
      			"appName" : "ResourcesHIDMA",
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
                    }
                }
            }, {
                "overrides": {}
            }, {
                "overrides": {}
            });
     currform.add(Popup);
      if(self.showOrHideOtherLoginOptions)
         self.showOrHideOtherLoginOptions(false);
      SCAPresentationController.pollForCIBAAuthStatus(response.mfa_meta.auth_req_id,self.updateFormUI);
   },
   onCIBAInitiationFailure :  function (error){
     let self = this;
     self.clearForm();
     var currform = kony.application.getCurrentForm();
     if(currform.Popup){
                currform.Popup.setVisibility(false);
                currform.remove(Popup);
            }
     self.view.lblError.setVisibility(true);
     self.view.lblError.text = constants.LOGIN_FAILURE_MESSAGE;
   },
   onCIBAExpiryCallBack : function(error){
     let self = this;
     self.clearForm();
     var currform = kony.application.getCurrentForm();
     if(currform.Popup){
                currform.Popup.setVisibility(false);
                currform.remove(Popup);
            }
     self.view.lblError.setVisibility(true);
     self.view.lblError.text = constants.CIBA_LOGON_POLL_EXPIRED;
     self.navigateTo("flxCredentials");
   },
    
   onCIBAConsensusCallBack : function(){
     let self = this;
     self.clearForm();
     var currform = kony.application.getCurrentForm();
     if(currform.Popup){
                currform.Popup.setVisibility(false);
                currform.remove(Popup);
            }
     self.view.lblError.setVisibility(true);
  	 self.view.lblError.text = constants.CIBA_REQUEST_DENIED;
     self.navigateTo("flxCredentials");
   },
    
   navigateTo : function(flxId){
       let self = this;
       for (let i of flxIdArray) {
          self.view[`${i}`].setVisibility(i === flxId);
       }
       self.view.forceLayout();
   },
   updateFormUI: function (context) {
        let self = this;
		switch (context.event) {
            case "LOGIN_SUCCESS":
              self.onCIBAInitiationSuccess(context.response);
              kony.application.dismissLoadingScreen();
              break;
            case "LOGIN_FAILURE":
              self.onCIBAInitiationFailure(context.response);
              kony.application.dismissLoadingScreen();
              break;
           case "CIBA_REQUEST_EXPIRED" : 
         	  self.onCIBAExpiryCallBack(context.response);
              kony.application.dismissLoadingScreen();
              break;
           case "CIBA_REQUEST_DENIED" : 
              self.onCIBAConsensusCallBack(); 
              kony.application.dismissLoadingScreen();
           default:
              kony.print("Failed");
          }
    },
    setContext: function(context) {
       SCAPresentationController.setContext(context);
    },
    showLoginError: function(errorMsg) {
      let self = this;
      self.view.lblError.text = errorMsg;
      self.view.lblError.setVisibility(true);
      self.view.tbxPassword.text = "";
      self.view.tbxPassword.secureTextEntry = true;
      this.view.btnNext.skin = "sknBtnBlockedSSPFFFFFF15Px";
      self.clearForm();
      var currform = kony.application.getCurrentForm();
      if(currform.Popup){
        currform.Popup.setVisibility(false);
        currform.remove(Popup);
      }
      if (self.forceLayout) {
        self.forceLayout();
      }
    },
    setErrorSkin: function(flexWidget) {
      flexWidget.skin = JSON.parse(this._flxSkins).errorSkin;
    },

   
    onBreakpointChange : function(){
      let self = this;
      let breakPoint = kony.application.getCurrentBreakpoint();
      if (breakPoint <= 1024) {
        this.view.lblWelcomeMobile.centerX = "50%";
      }
      else{
        this.view.lblWelcomeMobile.centerX = "";
      }
      self.view.forceLayout();
    } 
  };
});