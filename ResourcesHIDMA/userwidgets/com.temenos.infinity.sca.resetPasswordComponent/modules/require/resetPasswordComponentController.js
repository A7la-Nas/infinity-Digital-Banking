define(['FormControllerUtility', 'OLBConstants'], function (FormControllerUtility, OLBConstants) {


  const CIBAObjSrv = {
    getDataModel: function (objectName, objectServiceName) {
      var objSvc = kony.sdk.getCurrentInstance().getObjectService(objectServiceName, { "access": "online" });
      return {
        customVerb: function (customVerb, params, callback) {
          var dataObject = new kony.sdk.dto.DataObject(objectName);
          for (let key in params) {
            dataObject.addField(key, params[key]);
          }
          var options = {
            "dataObject": dataObject
          };
          objSvc.customVerb(customVerb, options, success => callback(true, success), error => callback(false, error));
        }
      };
    }
  }

  const CIBA_REQUEST_DENIED = "Push-based password reset request approval denied";
  const CIBA_REQUEST_EXPIRED = "The approval for your password reset could not be received. Please retry";
  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      let scopeObj = this;
      scopeObj._username = "";
      scopeObj.username = "";
      scopeObj.isComponentEnabled = false;
      scopeObj._primaryBtnEnableSkin = {};
      scopeObj._primaryBtnDisableSkin = {};
      scopeObj.flxIdArray = ["flxCIBA", "flxPasswordGen", "flxPasswordSuccess"];
      scopeObj._breakpoints = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineSetter(this, 'primaryBtnEnableSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._primaryBtnEnableSkin = val;
        }
      });
      defineGetter(this, 'primaryBtnEnableSkin', function () {
        return this._primaryBtnEnableSkin;
      });
      defineSetter(this, 'primaryBtnDisableSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._primaryBtnDisableSkin = val;
        }
      });
      defineGetter(this, 'primaryBtnDisableSkin', function () {
        return this._primaryBtnDisableSkin;
      });
      defineSetter(this, 'username', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._username = val;
        }
      });
      defineGetter(this, 'username', function () {
        return this._username;
      });
      defineSetter(this, 'breakpoints', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._breakpoints = val;
        }
      });
      defineGetter(this, 'breakpoints', function () {
        return this._breakpoints;
      });
      defineGetter(this, 'cibaRequestId', () => {
        return this._cibaRequestId;
      });
      defineSetter(this, 'cibaRequestId', value => {
        this._cibaRequestId = value;
      });
    },
    navigateTo: function (flxId) {
      let self = this;
      for (let i of self.flxIdArray) {
        self.view[`${i}`].setVisibility(i === flxId);
      }
      self.view.forceLayout();
    },
    preshow: function () {
      this.setActions();
      this.resetUI();
      this.SCARiskAssessment();
    },
    SCARiskAssessment: function () {
      if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT.toUpperCase() === "TRUE")
        isSCARMSEnabled = "true";
	else
		isSCARMSEnabled = "false";
    },
    startTime: null,
    cibaRequestId: null,
    resetUI: function () {
      let scopeObj = this;
      scopeObj.isComponentEnabled = false;
      scopeObj.view.flxCIBA.setVisibility(false);
      scopeObj.view.tbxPassword.text = "";
      scopeObj.view.tbxConfirmPassword.text = "";
      scopeObj.view.lblNotification.setVisibility(true);
      scopeObj.view.lblCibaError.setVisibility(false);
      scopeObj.view.lblPwdErrorMsg.setVisibility(false);
      scopeObj.view.imgProgress.setVisibility(false);
      scopeObj.view.flxClose.setVisibility(true);
      scopeObj.enableSetPassword();
    },
    hideProgressBar: function () {
      FormControllerUtility.hideProgressBar(this.view);
    },
    setActions: function () {
      let self = this;
      self.view.flxClose.onTouchEnd = function () {
        self.reAttachEventListenersToTextFields();
        if (self.showLogin)
          self.showLogin();
        kony.timer.cancel("cibatimer");
      };

      self.view.tbxPassword.onKeyUp = function () {
        self.enableSetPassword();
      };
      self.view.tbxConfirmPassword.onKeyUp = function () {
        self.enableSetPassword();
      };

      self.view.btnSetPassword.onClick = function () {
        self.setPassword();
      };

      self.view.btnProceed.onClick = function () {
        if (self.showLogin)
          self.showLogin();
      };

    },
    enableSetPassword: function () {
      let self = this;
      let password = self.view.tbxPassword.text;
      let cnfPassword = self.view.tbxConfirmPassword.text;
      let isEnabled = false;
      if (password && cnfPassword && password !== "" && cnfPassword !== "" && password === cnfPassword)
        isEnabled = true;

      let skins = isEnabled ? JSON.parse(self.primaryBtnEnableSkin) : JSON.parse(self.primaryBtnDisableSkin);
      self.view.btnSetPassword.setEnabled(isEnabled);
      self.view.btnSetPassword.skin = skins.normal;
      self.view.btnSetPassword.hoverSkin = skins.hoverSkin;
      self.view.btnSetPassword.focusSkin = skins.focusSkin;
    },
    enableRequestResetComponent: function () {
      let scopeObj = this;
      scopeObj.SCARiskAssessment();
      scopeObj.fetchPasswordPolicy();
      if (isSCARMSEnabled == "true") {
		   kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        scopeObj.action = "RESET_OLB_PASSWORD";
        let typedArray = new Uint8Array(1)
        let randomValues = crypto.getRandomValues(typedArray)[0]
        let randomFloat = randomValues / Math.pow(2, 8)
        let randomValue = Math.floor(randomFloat * 10000000);
        let appSessionId = String(randomValue);
        applicationManager.setRmsUserID(scopeObj.username);
        scopeObj.view.rmsComponent.rmsActionSuccess = output => {
			 kony.application.dismissLoadingScreen();
          if (output.userBlock == "true") {
            output.errmsg = kony.i18n.getLocalizedString("kony.sca.rms.userBlock");
            scopeObj.rmsUserBlock(output);
          }
          else {
            scopeObj.stepUp = output.stepUp;
            var currentThreat = output.currentThreat;
            scopeObj.initiateCIBA();
          }
        };
        scopeObj.view.rmsComponent.rmsActionFailure = output => {
			 kony.application.dismissLoadingScreen();
          scopeObj.stepUp = output.stepUp;
          scopeObj.initiateCIBA();
        };

        scopeObj.view.rmsComponent.rmsActionCreate(scopeObj.action, appSessionId);
      }
      else
        scopeObj.initiateCIBA();
    },
    initiateCIBA: function () {
      let scopeObj = this;
      scopeObj.displayRequestResetPasswordComponenet();
      scopeObj.navigateTo('flxCIBA');
      scopeObj.view.lblUsername.text = scopeObj._username;
      let successCallBack = success => {
        if (scopeObj.isComponentEnabled === false && scopeObj.displayRequestResetPasswordComponenet) {
          scopeObj.isComponentEnabled = true;
          scopeObj.displayRequestResetPasswordComponenet();
        }
        if (scopeObj.isComponentEnabled === true) {
          scopeObj.view.flxCIBA.setVisibility(true);
          scopeObj.view.lblNotification.setVisibility(true);
          scopeObj.view.flxPasswordGen.setVisibility(false);
          scopeObj.view.imgProgress.setVisibility(true);
          scopeObj.view.forceLayout();
          scopeObj.hideProgressBar();
          scopeObj.pollForCIBAAuthStatus(success.authReqId);
        }
      };
      let failureCallBack = error => {
        scopeObj.hideProgressBar();
      };

      var params = {
        "userId": this._username,
        "serviceName": "RESET_PASSWORD"
      };

      var objService = CIBAObjSrv.getDataModel("CIBAPushOperation", "SCATransactionObjects");
      const callback = (status, response) => {
        if (status) {
          successCallBack(response);
        } else {
          failureCallBack(response);
        }
      };
      objService.customVerb("initiateCIBAPush", params, callback);
    },
    pollForCIBAAuthStatus: function (authReqId) {

      var scopeObj = this;
      scopeObj.authReqId = authReqId;
      this.startTime = new Date().getTime();
      kony.timer.schedule("cibatimer", function () {
        scopeObj.fetchCIBAStatus(authReqId);
      }, 20, true);

    },
    fetchCIBAStatus: function (authReqId) {

      var params = {
        "auth_req_id": authReqId
      };
      let scopeObj = this;
      let successCallBack = success => {
        if (success.ciba_status === 'accept' || success.ciba_status === 'deny') {
          kony.timer.cancel("cibatimer");
        }
        if (success.ciba_status === 'accept') {
          cibaRequestId = authReqId;
          scopeObj.fetchPasswordPolicy();
          scopeObj.navigateTo('flxPasswordGen');
        } else if (success.ciba_status === 'deny') {
          scopeObj.view.lblCibaError.text = CIBA_REQUEST_DENIED;
          scopeObj.view.lblCibaError.setVisibility(true);
          scopeObj.view.lblNotification.setVisibility(false);
          scopeObj.view.forceLayout();
          
        }

      };
      let failureCallBack = error => {
        kony.timer.cancel("cibatimer");
      };

      var objService = CIBAObjSrv.getDataModel("AuthStatus", "SCAObjects");
      const callback = (status, response) => {
        if (status) {
          successCallBack(response);
        } else {
          failureCallBack(response);
        }
      };

      kony.print("Auth params " + JSON.stringify(params));
      objService.customVerb("fetch", params, callback);

      var currentTime = new Date().getTime();
      // cancel after 2 minutes
      if (currentTime - this.startTime > 120000) {
        kony.timer.cancel("cibatimer");
        scopeObj.view.lblCibaError.text = CIBA_REQUEST_EXPIRED;
        scopeObj.view.lblCibaError.setVisibility(true);
        scopeObj.view.lblNotification.setVisibility(false);
        scopeObj.view.forceLayout();
        
      }

    },
   
   
    fetchPasswordPolicy: function () {
      let scopeObj = this;
      kony.application.showLoadingScreen("loadingskin","Data is still Loading");
      let successCallBack = success => {
        scopeObj.view.rtxRulesPassword.text = success.scapasswordpolicy;
        kony.application.dismissLoadingScreen();
      };
      let failureCallBack = error => {
        kony.application.dismissLoadingScreen();
      };

      var objService = CIBAObjSrv.getDataModel("PasswordPolicy", "SCAActivationObjects");
      const callback = (status, response) => {
        if (status) {
          successCallBack(response);
        } else {
          failureCallBack(response);
        }
      };
      objService.customVerb("fetch", {}, callback);
    },

    setPassword: function () {
      let scopeObj = this;
      scopeObj.view.lblPwdErrorMsg.setVisibility(false);
      kony.application.showLoadingScreen("loadingskin","Data is still Loading");
      var params = {
        "authReqId": scopeObj.authReqId,
        "password": scopeObj.view.tbxPassword.text
      };

      let successCallBack = success => {
        scopeObj.navigateTo('flxPasswordSuccess');
        scopeObj.view.flxClose.setVisibility(false);
        kony.application.dismissLoadingScreen();
       
      };
      let failureCallBack = error => {
        /*let errorMessage = error.errmsg;
        scopeObj.view.lblPwdErrorMsg.text = errorMessage;
        scopeObj.view.lblPwdErrorMsg.setVisibility(true);
        kony.application.dismissLoadingScreen();*/
        //Adding below code to handle multiple call of resetPassword
        let errorMessage;
        if (error.errorCode === "2100") {
          errorMessage = kony.i18n.getLocalizedString("i18n.login.genericerrormsg");
        }
        if (error.errorCode === "2100" || error.errorCode === 2100) {
          scopeObj.disableButtonOnWrongPassword.call(scopeObj);
        }
        kony.application.dismissLoadingScreen();
        var currentFormController = _kony.mvc.GetController('frmLoginHID', true);
        currentFormController.changeNavigationFlow(errorMessage);
        
      };
      var objService = CIBAObjSrv.getDataModel("ActivationCodeAuthenticator", "SCAActivationObjects");
      const callback = (status, response) => {
        if (status) {
          successCallBack(response);
        } else {
          failureCallBack(response);
        }
      };
      objService.customVerb("resetPassword", params, callback);
    },

    onBreakpointChange: function () {
      let self = this;
      self.view.forceLayout();
    },
    disableButtonOnWrongPassword: function () {
      let skins = JSON.parse(this.primaryBtnDisableSkin);
      this.view.btnSetPassword.setEnabled(false);
      this.view.btnSetPassword.skin = skins.normal;
      this.view.btnSetPassword.hoverSkin = skins.hoverSkin;
      this.view.btnSetPassword.focusSkin = skins.focusSkin;
      this.clearForm();
    },
    clearForm: function () {
      let self = this;
      self.view.tbxPassword.text = "";
      self.view.tbxConfirmPassword.text = "";
    },
    reAttachEventListenersToTextFields: function () {
      const scopeObj = this;
      this.view.tbxPassword.onKeyUp = function () {
        scopeObj.enableSetPassword();
      };
      this.view.tbxConfirmPassword.onKeyUp = function () {
        scopeObj.enableSetPassword();
      };
    }

  };
});