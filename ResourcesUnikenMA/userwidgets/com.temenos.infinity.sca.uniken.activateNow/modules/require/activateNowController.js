define(function () {
    const CIBAObjSrv = {
    getDataModel: function(objectName, objectServiceName) {
        var objSvc = kony.sdk.getCurrentInstance().getObjectService(objectServiceName, {
            "access": "online"
        });
        return {
            customVerb: function(customVerb, params, callback) {
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
};
    var filtered;
  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this._primaryBtnEnableSkin = {};
      this._primaryBtnDisableSkin = {};
      this._textBoxSkins = "";
      this._tickFontIcon = "";
      this._exclamationFontIcon = "";
      this._successIconSkin = "";
      this._warningIconSkin = "";
      this._objectName = "";
      this._objectService = "";
      this._activationCodeValidationOperation = "";
      this._setPasswordOperation = "";
      this._passwordRulesAndPoliciesOperation = "";
      this._setPasswordErrorMessage = "";
      this._expiredActivationCode = "";
      this._activationCodeBlock = "";
      this.serviceKey = "";
      this.id_token = "";
      this._passwordPolicyService = "";
      this._fetchOperationName = "";
      this._createDeviceOperation = "";
      this._integrationName = "";
      this._integrationService = "";
      this._getDeviceOperation = "";
      this._ActivationQRCodeOperationName = ""; 
      this._getDevicesOparationName = "";
      this.passwordPolicies = {
        "minLength": "",
        "maxLength": "",
        "specialCharactersAllowed": "",
        "atleastOneNumber": "",
        "atleastOneSymbol": "",
        "atleastOneUpperCase": "",
        "atleastOneLowerCase": "",
        "charRepeatCount":""
      };
      this.passwordRegex = "";
      this.characterRepeatCountRegex = "";
      this.pwd = null;
      this.cnfPwd = null;
      this.userName = null;
      this.password = null;
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
            defineSetter(this, 'textBoxSkins', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._textBoxSkins = val;
                }
            });
            defineGetter(this, 'textBoxSkins', function () {
                return this._textBoxSkins;
            });
            defineSetter(this, 'tickFontIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._tickFontIcon = val;
                }
            });
            defineGetter(this, 'tickFontIcon', function () {
                return this._tickFontIcon;
            });
            defineSetter(this, 'exclamationFontIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._exclamationFontIcon = val;
                }
            });
            defineGetter(this, 'exclamationFontIcon', function () {
                return this._exclamationFontIcon;
            });
            defineSetter(this, 'successIconSkin', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._successIconSkin = val;
                }
            });
            defineGetter(this, 'successIconSkin', function () {
                return this._successIconSkin;
            });
            defineSetter(this, 'warningIconSkin', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._warningIconSkin = val;
                }
            });
            defineGetter(this, 'warningIconSkin', function () {
                return this._warningIconSkin;
            });
            defineSetter(this, 'objectService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._objectService = val;
                }
            });
            defineGetter(this, 'objectService', function () {
                return this._objectService;
            });
            defineSetter(this, 'integrationService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._integrationService = val;
                }
            });
            defineGetter(this, 'integrationService', function () {
                return this._integrationService;
            });
            defineSetter(this, 'passwordPolicyService', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._passwordPolicyService = val;
                }
            });
            defineGetter(this, 'passwordPolicyService', function () {
                return this._passwordPolicyService;
            });
            defineSetter(this, 'objectName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._objectName = val;
                }
            });
            defineGetter(this, 'objectName', function () {
                return this._objectName;
            });
            defineSetter(this, 'integrationName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._integrationName = val;
                }
            });
            defineGetter(this, 'integrationName', function () {
                return this._integrationName;
            });
            defineSetter(this, 'activationCodeValidationOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._activationCodeValidationOperation = val;
                }
            });
            defineGetter(this, 'activationCodeValidationOperation', function () {
                return this._activationCodeValidationOperation;
            });
            defineSetter(this, 'fetchOperationName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._fetchOperationName = val;
                }
            });
            defineGetter(this, 'fetchOperationName', function () {
                return this._fetchOperationName;
            });
            defineSetter(this, 'createDeviceOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._createDeviceOperation = val;
                }
            });
            defineGetter(this, 'createDeviceOperation', function () {
                return this._createDeviceOperation;
            });
            defineSetter(this, 'getDeviceOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._getDeviceOperation = val;
                }
            });
            defineGetter(this, 'getDeviceOperation', function () {
                return this._getDeviceOperation;
            });
            defineSetter(this, 'setPasswordOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._setPasswordOperation = val;
                }
            });
            defineGetter(this, 'setPasswordOperation', function () {
                return this._setPasswordOperation;
            });
            defineSetter(this, 'passwordRulesAndPoliciesOperation', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._passwordRulesAndPoliciesOperation = val;
                }
            });
            defineGetter(this, 'passwordRulesAndPoliciesOperation', function () {
                return this._passwordRulesAndPoliciesOperation;
            });
            defineSetter(this, 'setPasswordErrorMessage', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._setPasswordErrorMessage = val;
                }
            });
            defineGetter(this, 'setPasswordErrorMessage', function () {
                return this._setPasswordErrorMessage;
            });
            defineSetter(this, 'expiredActivationCode', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._expiredActivationCode = val;
                }
            });
            defineGetter(this, 'expiredActivationCode', function () {
                return this._expiredActivationCode;
            });
            defineSetter(this, 'activationCodeBlock', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._activationCodeBlock = val;
                }
            });
            defineGetter(this, 'activationCodeBlock', function () {
                return this._activationCodeBlock;
            });
            defineGetter(this, 'passwordPolicyService', () => {
                return this._passwordPolicyService;
            });
            defineSetter(this, 'passwordPolicyService', value => {
                this._passwordPolicyService = value;
            });
            defineGetter(this, 'fetchOperationName', () => {
                return this._fetchOperationName;
            });
            defineSetter(this, 'fetchOperationName', value => {
                this._fetchOperationName = value;
            });
            defineGetter(this, 'createDeviceOperation', () => {
                return this._createDeviceOperation;
            });
            defineSetter(this, 'createDeviceOperation', value => {
                this._createDeviceOperation = value;
            });
            defineGetter(this, 'getDeviceOperation', () => {
                return this._getDeviceOperation;
            });
            defineSetter(this, 'getDeviceOperation', value => {
                this._getDeviceOperation = value;
            });
            defineGetter(this, 'integrationName', () => {
                return this._integrationName;
            });
            defineSetter(this, 'integrationName', value => {
                this._integrationName = value;
            });
            defineGetter(this, 'integrationService', () => {
                return this._integrationService;
            });
            defineSetter(this, 'integrationService', value => {
                this._integrationService = value;
            });
            defineGetter(this, 'getDeviceOperation', () => {
                return this._getDeviceOperation;
            });
            defineSetter(this, 'getDeviceOperation', value => {
                this._getDeviceOperation = value;
            });
            defineGetter(this, 'ActivationQRCodeOperationName', () => {
                return this._ActivationQRCodeOperationName;
            });
            defineSetter(this, 'ActivationQRCodeOperationName', value => {
                this._ActivationQRCodeOperationName = value;
            });
            defineGetter(this, 'getDevicesOparationName', () => {
                return this._getDevicesOparationName;
            });
            defineSetter(this, 'getDevicesOparationName', value => {
                this._getDevicesOparationName = value;
            });
        },

    preshow: function () {
      this.setFlowActions();
      this.resetUI();
    },

  resetUI: function () {
        let self = this;
        var orientationHandler = new OrientationHandler();
        self.view.lblErrorMsg.setVisibility(false);
        self.view.lblUsername.top = "70dp";
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          self.view.lblUsername.top = "17dp";
      }
        self.view.tbxUserName.text = "";
        self.view.txtActivationCode.text = "";
        self.view.txtActivationCode.secureTextEntry = true;
        self.view.imgViewCode.src = "eye_show.png";
        self.view.flxImgViewCode.accessibilityConfig = {
          "a11yLabel": "hide Password",
          a11yARIA: {
              role: "button"
          },
        };
        var locale = kony.i18n.getCurrentLocale();
        if (locale === "ar_AE") {
          self.view.lblMsg.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
        }
        self.setNormalSkin(self.view.flxActivationCode);
        self.view.flxClose.setVisibility(true);
        self.view.flxActivateUserContent.setVisibility(true);
        self.view.flxPasswordContent.setVisibility(false);
        self.view.flxCongratulations.setVisibility(false);
        self.enableVerify();
      },

    setFlowActions: function () {
      let self = this;

      self.view.flxClose.onTouchEnd = function () {
        if (self.closeActivateProfile) {
          self.closeActivateProfile();
        }
      };

      self.view.tbxUserName.onKeyUp = function () {
        self.enableVerify();
      };

      self.view.tbxUserName.onTouchStart = function () {
        self.setFocusSkin(self.view.flxUserName);
      };

      self.view.tbxUserName.onEndEditing = function () {
        self.setNormalSkin(self.view.flxUserName);
      };

      self.view.txtActivationCode.onKeyUp = function () {
        self.enableVerify();
      };

      self.view.txtActivationCode.onTouchStart = function () {
        self.setFocusSkin(self.view.flxActivationCode);
        self.view.lblErrorMsg.setVisibility(false);
      };

      self.view.txtActivationCode.onEndEditing = function () {
        self.setNormalSkin(self.view.flxActivationCode);
        self.view.lblErrorMsg.setVisibility(false);
      };

      self.view.imgViewCode.onTouchStart = function () {
        let isSecuredText = self.view.txtActivationCode.secureTextEntry;
        self.view.txtActivationCode.secureTextEntry = !isSecuredText;
        self.view.imgViewCode.src = isSecuredText? "eye_show.png": "eye_hide.png";
      };

      self.view.btnVerify.onClick = function () {
        self.view.flxCongratulations.isVisible = false;
        self.view.flxPasswordContent.isVisible = false;
        self.verifyActivationCodeAndUserName();
      };

      self.view.tbxPassword.onTouchStart = function () {
        self.setFocusSkin(self.view.flxPassword);
      };

      self.view.tbxPassword.onEndEditing = function () {
        self.setNormalSkin(self.view.flxPassword);
        self.verifyPassword(self.view.tbxPassword, self.view.lblPwdIcon);
      };

      self.view.tbxPassword.onKeyUp = function () {
        self.enableSetPassword();
      };

      self.view.tbxConfirmPassword.onTouchStart = function () {
        self.setFocusSkin(self.view.flxConfirmPassword);
      };

      self.view.tbxConfirmPassword.onEndEditing = function () {
        self.setNormalSkin(self.view.flxConfirmPassword);
        self.verifyPassword(self.view.tbxConfirmPassword, self.view.lblCnfInfoIcon);
      };

      self.view.tbxConfirmPassword.onKeyUp = function () {
        self.enableSetPassword();
      };

      self.view.btnSetPassword.onClick = function () {
        self.view.flxPasswordContent.isVisible = false;
        self.view.flxCongratulations.isVisible = false;
        self.view.flxShowQRCodeGenerator.top = "50px";
        self.view.flxShowQRCodeGenerator.height = "530px";
        self.view.flxShowQRCodeGenerator.isVisible = true;
        self.setPassword();
      };

      self.view.btnGetStarted.onClick = function () {
      //   	self.view.flxCongratulations.isVisble=false;
			// applicationManager.getNavigationManager().navigateTo("frmLogin");
//         if (self.closeActivateProfile) {
//           self.closeActivateProfile();
//         }
        let context = {
          "action": "NavigateToLogin"
        };
        let authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "AuthUnikenUIModule",
            "appName": "AuthenticationMA"
        });
        authModule.presentationController.showLoginScreen(context);
      };

      self.view.btnForgotPassword.onClick = function () {
        if (self.cantSignIn) {
          self.cantSignIn();
        }
      };
    },

    verifyActivationCodeAndUserName: function () {
      kony.application.showLoadingScreen();
      let self = this;
      this.userName = self.view.tbxUserName.text;
      let UserNameActivationCodeJSON = {
        "userName": self.view.tbxUserName.text,
        "activationCode": self.view.txtActivationCode.text
      };
      let dbxUserRepo = CIBAObjSrv.getDataModel("SCADevice", "SCAUniken");
      dbxUserRepo.customVerb(this._activationCodeValidationOperation, UserNameActivationCodeJSON, verifyActivationCodeAndUserNameServiceCallBack);
      function verifyActivationCodeAndUserNameServiceCallBack(status, data, error) {
        //let object = self.validateResponse(status, data, error);
        if (status === true) {
          self.verifyActivationCodeAndUserNameSuccessCallBack(data);
        }
        else {
          self.verifyActivationCodeAndUserNameErrorCallBack(data);
        }
      }
    },

    verifyActivationCodeAndUserNameSuccessCallBack: function (successResponse) {
      let self = this;
      kony.application.showLoadingScreen();
//       if (successResponse.isActivationCodeValid === "true" && successResponse.serviceKey) {
       if (successResponse["SCADevice"][0].response_code==0) {
        self.generateActivationQRCode();
        //self.enablePasswordSetScreen();
         kony.application.dismissLoadingScreen();
      }  else {
        self.showErrorMsg("Invalid username or activation code");
        kony.application.dismissLoadingScreen();
      }
    },
    verifyActivationCodeAndUserNameErrorCallBack: function (errorResponse) {
      let self = this;
      let displayErrorMessage;
      if (errorResponse.errorCode === 10747)
        displayErrorMessage = self._activationCodeBlock;
      else if (errorResponse.errorCode === 10749)
        displayErrorMessage = self._expiredActivationCode;
      else if (errorResponse.errorCode === "90008")
        {
		displayErrorMessage = errorResponse.errorMessage;
        }
      self.view.flxActivateUserContent.isVisible=true;
      self.showErrorMsg(displayErrorMessage);
      kony.application.dismissLoadingScreen();
    },
    generateActivationQRCode: function () {
      kony.application.showLoadingScreen();
      let self = this;
      let randomValue = Math.floor(Math.random() * 10000000);
      let requesterId = String(randomValue);
      let generateActivationQRCodeJSON = {
        "userName": self.view.tbxUserName.text,
        "requesterId": requesterId,
        "generationType": "fields"
      };
      let dbxUserRepo = CIBAObjSrv.getDataModel("SCADevice", "SCAUniken");
      dbxUserRepo.customVerb(this._ActivationQRCodeOperationName, generateActivationQRCodeJSON, generateActivationQRCodeServiceCallBack);
      function generateActivationQRCodeServiceCallBack(status, data, error) {
        //let object = self.validateResponse(status, data, error);
        if (status === true) {
          self.generateActivationQRCodeSuccessCallBack(data);
        }
        else {
          self.generateActivationQRCodeErrorCallBack(data);
        }
      }
    },

    generateActivationQRCodeSuccessCallBack: function (successResponse) {
      let self = this;
		successResponse=successResponse["SCADevice"];
//       if (successResponse.isActivationCodeValid === "true" && successResponse.serviceKey) {
       if (successResponse[0].qrCodeFields) {     
      	self.view.flxActivateUserContent.isVisible = false;
		self.view.flxShowQRCodeGenerator.isVisible = true;
         var arr = successResponse[0].qrCodeFields.split(/[{=,}]+/);
         self.filtered = arr.filter(elm => elm);
         var qrCodeFields = {
           "value": self.filtered[3],
           "key": self.filtered[5],
           "userId": self.filtered[1]
         }
        self.view.QRCodeGenerator.generateQRCode(qrCodeFields);
        self.getDeviceStatus(self.filtered[1]);
        //self.enablePasswordSetScreen();
         kony.application.dismissLoadingScreen();
      } else if (successResponse.isActivationCodeValid === "false") {
        self.showErrorMsg(null);
        kony.application.dismissLoadingScreen();
      } else {
        self.showErrorMsg();
        kony.application.dismissLoadingScreen();
      }
    },
    generateActivationQRCodeErrorCallBack: function (errorResponse) {
      let self = this;
      let displayErrorMessage;
      if (errorResponse.errorCode === 10747)
        displayErrorMessage = self._activationCodeBlock;
      else if (errorResponse.errorCode === 10749)
        displayErrorMessage = self._expiredActivationCode;
      else if (errorResponse.errorCode === "90008")
        {
		displayErrorMessage = errorResponse.errorMessage;
        }
      self.showErrorMsg(displayErrorMessage);
      kony.application.dismissLoadingScreen();
    },

    
    createDevice: function () {
      kony.application.showLoadingScreen();
      let self = this;
      let CreateDeviceJSON = {
        "id_token": self.id_token
      };
      let dbxUserRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(this._objectService);
      dbxUserRepo.customVerb(this._createDeviceOperation, CreateDeviceJSON, createDeviceServiceCallBack);
      function createDeviceServiceCallBack(status, data, error) {
        let object = self.validateResponse(status, data, error);
        if (object["status"] === true) {
          self.createDeviceSuccessCallBack(object["data"]);
        }
        else {
          self.createDeviceErrorCallBack(object["data"]);
        }
      }
    },

    createDeviceSuccessCallBack: function (successResponse) {
      let self = this;
      
//       if (successResponse.isActivationCodeValid === "true" && successResponse.serviceKey) {
       if (successResponse.provisionJSON) {
        self.provisionJSON = JSON.parse(successResponse.provisionJSON);
        self.view.QRCodeGenerator.generateQRCode(self.provisionJSON);
        self.getDeviceStatus(self.provisionJSON.did);
        kony.application.dismissLoadingScreen();
      } else {
        self.showErrorMsg();
        kony.application.dismissLoadingScreen();
      }
    },
    createDeviceErrorCallBackErrorCallBack: function (errorResponse) {
      let self = this;
      let displayErrorMessage;
      self.showErrorMsg(displayErrorMessage);
      kony.application.dismissLoadingScreen();
    },
    
        getDeviceStatus: function(user_id) {
            kony.application.showLoadingScreen();
            var scopeObj = this;
            var params = {
                "user_id": user_id
            };
            this.startTime = new Date().getTime();
            kony.timer.schedule("cibatimer", function() {
                scopeObj.getDevices(params);
            }, 20, true);
        },
    
    getDevices: function (params) {
      kony.application.showLoadingScreen();
      let self = this;
      let dbxUserRepo = CIBAObjSrv.getDataModel("SCADevice", "SCAUniken");
      dbxUserRepo.customVerb(this._getDevicesOparationName, params, getDevicesServiceCallBack);
      function getDevicesServiceCallBack(status, data, error) {
        //let object = self.validateResponse(status, data, error);
        if (status === true) {
          self.getDevicesSuccessCallBack(data);
        }
        else {
          self.getDevicesErrorCallBack(data);
        }
      }
      var currentTime = new Date().getTime();
            // cancel after 2 minutes
            if (currentTime - this.startTime > 120000) {
                kony.timer.cancel("cibatimer");
                self.view.flxShowQRCodeGenerator.setVisibility(false);
                self.view.flxActivateUserContent.setVisibility(true);
                self.showErrorMsg("QR code is expired");
                kony.application.dismissLoadingScreen();
                /*updateFormUI({
                  "event":"CIBA_REQUEST_EXPIRED"
                });*/
            }
    },

    getDevicesSuccessCallBack: function (successResponse) {
      let self = this;
		  successResponse = successResponse["SCADevice"];
      for(var i = 0 ; i<successResponse.length ; i++){
        if(successResponse[successResponse.length-1].status==="ACTIVE" && successResponse[successResponse.length-1].verificationKey=== this.filtered[5] ){
          self.view.flxShowQRCodeGenerator.isVisible = false;
          self.view.flxCongratulations.top = "20px";
          self.view.flxCongratulations.isVisible = true;
        //self.enablePasswordSetScreen();
          kony.timer.cancel("cibatimer");
          kony.application.dismissLoadingScreen();
          break;
        } else {
          self.showErrorMsg();
          kony.application.dismissLoadingScreen();
        }
      }
      	
    },
    getDevicesErrorCallBack: function (errorResponse) {
      let self = this;
      let displayErrorMessage;
      if (errorResponse.errorCode === 10747)
        displayErrorMessage = self._activationCodeBlock;
      else if (errorResponse.errorCode === 10749)
        displayErrorMessage = self._expiredActivationCode;
      else if (errorResponse.errorCode === "90008")
        {
		displayErrorMessage = errorResponse.errorMessage;
        }
      self.showErrorMsg(displayErrorMessage);
      kony.application.dismissLoadingScreen();
    },

        getDevice: function(params) {
          let self = this;
			var serviceName = this._integrationService;
		// Get an instance of SDK
		var client = kony.sdk.getCurrentInstance();
		var integrationSvc = client.getIntegrationService(serviceName);
		var operationName = this._getDeviceOperation;
		var headers = {
		"Content-Type": "application/scim+json",
		"Accept": "application/scim+json"
		};
		var options = {
		"httpRequestOptions": {
        "timeoutIntervalForRequest": 60,
        "timeoutIntervalForResource": 600
		}
		};
		integrationSvc.invokeOperation(operationName, headers, params, function(response) {
          
          if(response.active==="true"){
          self.view.flxShowQRCodeGenerator.isVisible = false;
          self.view.flxCongratulations.top = "20px";
          self.view.flxCongratulations.isVisible = true;
          }
		kony.print("Integration Service Response is: " + JSON.stringify(response));
		}, function(error) {
		kony.print("Integration Service Failure:" + JSON.stringify(error));
		}, options);
            var currentTime = new Date().getTime();
            // cancel after 2 minutes
            if (currentTime - this.startTime > 120000) {
                kony.timer.cancel("cibatimer");
                /*updateFormUI({
                  "event":"CIBA_REQUEST_EXPIRED"
                });*/
            }
        },

    getPasswordRulesAndPolicies: function () {
      let self = this;
      passwordPoliciesRequestJSON = {
        "ruleForCustomer": "true",
        "policyForCustomer": "true"
      };
      self.finalResponse = {};
      self.finalResponse["counter"] = 0;
      self.finalResponse["passwordrules"] = {};
      self.finalResponse["passwordpolicy"] = {};
      let dbxUserRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(this._passwordPolicyService);
      dbxUserRepo.customVerb(this._fetchOperationName, passwordPoliciesRequestJSON, passwordRulesServiceCallBack);
     // dbxUserRepo.customVerb("getPasswordPolicy", passwordPoliciesRequestJSON, passwordPolicyServiceCallBack);
      function passwordRulesServiceCallBack(status, data, error) {
        let object = self.validateResponse(status, data, error);
        if (object["status"] === true) {
          self.finalResponse["passwordpolicy"]["minLength"] = object.data.minLength;
          self.finalResponse["passwordpolicy"]["maxLength"] = object.data.maxLength;
//           self.finalResponse["passwordrules"]["supportedSymbols"] = object.data.passwordrules.supportedSymbols;
//           self.finalResponse["passwordrules"]["atleastOneNumber"] = object.data.passwordrules.atleastOneNumber;
//           self.finalResponse["passwordrules"]["atleastOneSymbol"] = object.data.passwordrules.atleastOneSymbol;
//           self.finalResponse["passwordrules"]["atleastOneUpperCase"] = object.data.passwordrules.atleastOneUpperCase;
//           self.finalResponse["passwordrules"]["atleastOneLowerCase"] = object.data.passwordrules.atleastOneLowerCase;
          self.finalResponse["passwordpolicy"]["charRepeatCount"] = object.data.minDiffChars;
//           self.finalResponse["counter"]++;
          	 self.finalResponse["passwordrules"] = object.data.scapasswordpolicy;
          passwordPolicyAndRulesServiceCallBack();
        }
      }
      function passwordPolicyServiceCallBack(status, data, error) {
        let object = self.validateResponse(status, data, error);
        if (object["status"] === true) {
          self.finalResponse["passwordpolicy"]["content"] = object.data.passwordpolicy.content;
          self.finalResponse["counter"]++;
          passwordPolicyAndRulesServiceCallBack();
        }
      }
      function passwordPolicyAndRulesServiceCallBack() {
//         if(self.finalResponse["counter"] === 2) {
          self.passwordPolicies = self.finalResponse.passwordpolicy;
          self.setPasswordPolicies(self.finalResponse.passwordrules);
//         }
      }
    },

    setPasswordPolicies: function (data) {
      var self = this;
      if (data) {
//         var policyData = "Minimum Length of Password:" + data.minLength + "\nMaximum Length of Password:" + data.maxLength + "\nSpecial Characters Allowed:" + data.supportedSymbols;
//         if (data.atleastOneNumber === true)
//           policyData += "\nAtleast One Number";
//         if (data.atleastOneSymbol === true)
//           policyData += "\nAtleast One Symbol";
//         if (data.atleastOneUpperCase === true)
//           policyData += "\nAtleast One Uppercase";
//         if (data.atleastOneLowerCase === true)
//           policyData += "\nAtleast One Lowercase";
//         policyData += "\nAllowed Repetition of characters: " +data.charRepeatCount;
//          self.passwordPolicies.minLength = data.passwordrules.minLength;
//          self.passwordPolicies.maxLength = data.passwordrules.maxLength;
//          self.passwordPolicies.specialCharactersAllowed = data.passwordrules.supportedSymbols;
//          self.passwordPolicies.atleastOneNumber = data.passwordrules.atleastOneNumber;
//          self.passwordPolicies.atleastOneSymbol = data.passwordrules.atleastOneSymbol;
//          self.passwordPolicies.atleastOneUpperCase = data.passwordrules.atleastOneUpperCase;
//          self.passwordPolicies.atleastOneLowerCase = data.passwordrules.atleastOneLowerCase;
//  		self.passwordPolicies.charRepeatCount = data.passwordrules.charRepeatCount;
        self.view.flxRulesPassword.rtxRulesPassword.text = data;
      }
      self.resetPasswordUI();
      self.view.flxActivateUserContent.setVisibility(false);
      self.view.flxCongratulations.setVisibility(false);
      self.view.flxPasswordContent.setVisibility(true);
      self.view.flxRulesPassword.setVisibility(true);
      self.view.forceLayout();
      kony.application.dismissLoadingScreen();
    },

    enablePasswordSetScreen: function () {
      let self = this;
      self.view.flxActivateUserContent.isVisible = false;
      self.view.flxPasswordContent.isVisible = true;
      self.getPasswordRulesAndPolicies();
    },

    setPassword: function () {
      kony.application.showLoadingScreen();
      let self = this;
      let passwordServiceKeyJSON = {
        "id_token": self.id_token,
        "password": self.view.tbxPassword.text
      };
      let dbxUserRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(this._objectService);
      dbxUserRepo.customVerb(this._setPasswordOperation, passwordServiceKeyJSON, setPasswordServiceCallBack);
      function setPasswordServiceCallBack(status, data, error) {
        let object = self.validateResponse(status, data, error);
        if (object["status"] === true) {
          self.setPasswordSuccessCallBack(object["data"]);
        }
        else {
          self.setPasswordErrorCallBack(object["data"]);
        }
      }
    },

    setPasswordSuccessCallBack(successResponse) {
      let self = this;
      self.view.flxPasswordContent.setVisibility(false);
      self.view.flxClose.setVisibility(false);
//       self.view.flxCongratulations.setVisibility(true);
      self.view.flxShowQRCodeGenerator.isVisible = true;
      self.createDevice();
      self.view.forceLayout();
      kony.application.dismissLoadingScreen();
    },

    setPasswordErrorCallBack(errorresponse) {
      let self = this;
      self.showSetPasswordErrorMessage(this._setPasswordErrorMessage);
      kony.application.dismissLoadingScreen();
    },

    validateResponse: function (status, response, error) {
      let res, isServiceFailure, data;
      if (status === kony.mvc.constants.STATUS_SUCCESS) {
        if (response.hasOwnProperty("errcode") || response.hasOwnProperty("dbpErrCode") || response.hasOwnProperty("errmsg") || response.hasOwnProperty("dbpErrMsg")) {
          data = {
            "errorCode": response.errcode ? response.errcode : response.dbpErrCode,
            "errorMessage": response.errmsg ? response.errmsg : response.dbpErrMsg
          };
          res = {
            "status": false,
            "data": data,
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
//           errMsg = error.errmsg ? error.errmsg : error.dbpErrMsg;
          	 errMsg = error.errorMessage;
        }
        data = {
//           "errorCode": error.errcode ? error.errcode : error.dbpErrCode,
//           "errorMessage": error.errmsg ? error.errmsg : error.dbpErrMsg
          "errorCode": error.errorCode,
          "errorMessage": error.errorMessage
        };
        res = {
          "status": false,
          "data": data,
          "isServerUnreachable": isServiceFailure
        };
      }
      return res;
    },

    setFocusSkin: function (flexWidget) {
      flexWidget.skin = JSON.parse(this.textBoxSkins).focusSkin;
    },

    setNormalSkin: function (flexWidget) {
      flexWidget.skin = JSON.parse(this.textBoxSkins).normalSkin;
    },

    setErrorSkin: function (flexWidget) {
      flexWidget.skin = JSON.parse(this.textBoxSkins).errorSkin;
    },
    enableVerify: function () {
      let self = this;
      let username = self.view.tbxUserName.text;
      let activationCode = self.view.txtActivationCode.text;
      let isEnabled = (username && activationCode) ? true : false;
      let skins = isEnabled ? JSON.parse(self.primaryBtnEnableSkin) : JSON.parse(self.primaryBtnDisableSkin);
      self.view.btnVerify.skin = skins.normal;
      self.view.btnVerify.hoverSkin = skins.hoverSkin;
      self.view.btnVerify.focusSkin = skins.focusSkin;
      self.view.btnVerify.setEnabled(isEnabled);
    },

    showErrorMsg: function (errorMessage) {
      let self = this;
      if (errorMessage)
        self.view.lblErrorMsg.text = errorMessage;
      self.view.lblErrorMsg.setVisibility(true);
      self.view.lblUsername.top = "20dp";
     // self.setErrorSkin(self.view.flxActivationCode);
      self.view.forceLayout();
    },

    showSetPasswordErrorMessage: function (errorText) {
      let self = this;
      if (errorText) self.view.lblPwdErrorMsg.text = errorText;
      self.view.lblPwdErrorMsg.setVisibility(true);
      self.view.flxPassword.top = "20dp";
      self.view.forceLayout();
    },

    resetPasswordUI: function () {
      let self = this;
      self.view.tbxPassword.text = "";
      self.view.tbxConfirmPassword.text = "";
      self.pwd = null;
      self.cnfPwd = null;
      self.setNormalSkin(self.view.flxPassword);
      self.setNormalSkin(self.view.flxConfirmPassword);
      self.view.lblPwdIcon.setVisibility(false);
      self.view.lblCnfInfoIcon.setVisibility(false);
      self.view.lblPwdErrorMsg.setVisibility(false);
      self.enableSetPassword();
    },

    enableSetPassword: function () {
      let self = this;
      let password = self.view.tbxPassword.text;
      let cnfPassword = self.view.tbxConfirmPassword.text;
      let isEnabled = false;
      if (this.pwd && this.cnfPwd && password && cnfPassword && password !== "" && cnfPassword !== "" && password === cnfPassword)
        isEnabled = true;
      let skins = isEnabled ? JSON.parse(self.primaryBtnEnableSkin) : JSON.parse(self.primaryBtnDisableSkin);
      self.view.btnSetPassword.setEnabled(isEnabled);
      self.view.btnSetPassword.skin = skins.normal;
      self.view.btnSetPassword.hoverSkin = skins.hoverSkin;
      self.view.btnSetPassword.focusSkin = skins.focusSkin;
    },

    //TODO : need to add the password policies vadlidation here 
    verifyPassword: function (tbxWidget, iconWidget) {
      let self = this;
      var isValidText = self.passwordValidationNew(this.passwordPolicies, tbxWidget.text);
      let widgetName = tbxWidget.id;
      if (widgetName === 'tbxPassword'){
        this.pwd = isValidText;
        this.password=tbxWidget.text;
      }
      if (widgetName === 'tbxConfirmPassword')
       {
         this.cnfPwd = isValidText;
        if(this.password !== tbxWidget.text){
          isValidText = false;
        }
       }
      if (isValidText) {
        iconWidget.skin = self.successIconSkin;
        iconWidget.text = self.tickFontIcon;
        self.setNormalSkin(tbxWidget.parent);
      } else {
        iconWidget.skin = self.warningIconSkin;
        iconWidget.text = self.exclamationFontIcon;
        self.setErrorSkin(tbxWidget.parent);
      }
      iconWidget.setVisibility(true);
      tbxWidget.parent.forceLayout();
      self.enableSetPassword();
    },
    
    passwordValidation: function (data, text) {
      let self = this;
      if (self.passwordRegex === "" && self.characterRepeatCountRegex === "") {
        let repeatedCharRules = "(.)\\1{" + data.charRepeatCount + "}";
        self.characterRepeatCountRegex = new RegExp(repeatedCharRules);
        let passwordRules = "";
        if (data.supportedSymbols.indexOf("-") > -1) {
          data.supportedSymbols = data.supportedSymbols.replace("-", "\\-");
        }
        if (data.supportedSymbols && data.supportedSymbols.includes(",")) {
        	data.supportedSymbols = data.supportedSymbols.replaceAll(",", "");
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
          passwordRules = passwordRules + "(?=(.*\[" + data.supportedSymbols + "\]))";
          self.passwordRegex = new RegExp(passwordRules + "[A-Za-z0-9" + data.supportedSymbols + "]{" + data.minLength + "," + data.maxLength + "}$");
        }
        else {
          self.passwordRegex = new RegExp(passwordRules + "\[^\\W\]{" + data.minLength + "," + data.maxLength + "}$");
        }
      }
      if (text.match(self.passwordRegex) && !self.characterRepeatCountRegex.test(text)) {
        return true;
      }
      return false;
    },
    
     passwordValidationNew: function (data, text) {
      let self = this;
       var repeatedCharRules = false;
      var reWhiteSpace = new RegExp("\\s+");
       let uniq = "";
       for(let i = 0; i < text.length; i++){
         if(uniq.includes(text[i]) === false){
           uniq += text[i]
         }
       }

       if(uniq.length >= parseInt(data.charRepeatCount))
       {
         repeatedCharRules = true;
       }
       
      self.passwordRegex = new RegExp("^.{"+data.minLength+","+data.maxLength+"}$");
       
      if (typeof(text) != 'undefined' && text != null && !(reWhiteSpace.test(text)) && text.match(self.passwordRegex) && !(self.userName===text) && repeatedCharRules) {
        return true;
      }
      return false;
    },
    
    clearUserNameAndActivationCode: function() {
      this.view.tbxUserName.text="";
      this.view.txtActivationCode.text="";
    },
    
    onBreakpointChange: function(){
      let scopeObj = this;
      let breakpoint = kony.application.getCurrentBreakpoint();
      scopeObj.view.flxContainer.width = (breakpoint > 1024) ? "68%" : "85%";
      if(breakpoint > 1024){
        //activate user flex alignment
        this.view.flximgrtx.layoutType = kony.flex.FREE_FORM;
        this.view.lblIcon.left = "0dp";
        this.view.lblIcon.top = "50dp";
        this.view.lblIcon.centerX = "";
        this.view.lblTitle.left = "0dp";
        this.view.lblTitle.top = "0dp";
        this.view.lblTitle.centerX = "";
        this.view.lblMsg.left = "65dp";
        this.view.lblMsg.right = "0dp";
        this.view.lblMsg.top = "";
        this.view.lblMsg.bottom = "5dp";
        this.view.lblMsg.width = "";
        this.view.lblMsg.centerX = "";
        this.view.lblMsg.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        //password flex alignment
        this.view.flxImgContent.layoutType = kony.flex.FREE_FORM;
        this.view.lblPwdTitleIcon.left = "0dp";
        this.view.lblPwdTitleIcon.top = "0dp";
        this.view.lblPwdTitleIcon.centerX = "";
        this.view.lblPwdMsg.left = "65dp";
        this.view.lblPwdMsg.right = "0dp";
        this.view.lblPwdMsg.top = "7dp";
        this.view.lblPwdMsg.width = "";
        this.view.lblPwdMsg.centerX = "";
        this.view.lblPwdMsg.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblEnterNewPassword.setVisibility(false);
        this.view.lblReEnterNewPassword.setVisibility(false);
        this.view.flxPassword.top = "50dp";
        this.view.flxConfirmPassword.top = "20dp";
        //congratulation flex alignment
		this.view.flxCongratulationLogo.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.lblCongtsIcon.left = "0dp";
        this.view.lblCongtsIcon.centerX = "";
        this.view.lblCongtsIcon.width = "60dp";
        this.view.lblCongtsIcon.height = "60dp";
        this.view.lblCongtsIcon.skin = "sknGreenBgWhite60pxOLBFontIcon";
        this.view.lblCngts.left = "10dp";
        this.view.lblCngts.centerX = "";
        this.view.lblCngts.top = "20dp";
        this.view.lblCngts.skin = "sknSSP42424240Px";
        this.view.lblCngtsMsg.left = "0dp";
        this.view.lblCngtsMsg.top = "45dp";
        this.view.lblCngtsMsg.centerX = "";
        this.view.lblCngtsMsg.width = "100%";
        this.view.lblCngtsMsg.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      }
      else{
         //activate user flex alignment
        this.view.flximgrtx.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.lblIcon.left = "";
        this.view.lblIcon.top = "0dp";
        this.view.lblIcon.centerX = "50%";
        this.view.lblTitle.left = "";
        this.view.lblTitle.top = "20dp";
        this.view.lblTitle.centerX = "50%";
        this.view.lblMsg.left = "";
        this.view.lblMsg.right = "";
        this.view.lblMsg.top = "10dp";
        this.view.lblMsg.width = "85%";
        this.view.lblMsg.centerX = "50%";
        this.view.lblMsg.contentAlignment = constants.CONTENT_ALIGN_CENTER;
        //password flex alignment
        this.view.flxImgContent.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.lblPwdTitleIcon.left = "";
        this.view.lblPwdTitleIcon.top = "0dp";
        this.view.lblPwdTitleIcon.centerX = "50%";
        this.view.lblPwdMsg.left = "";
        this.view.lblPwdMsg.right = "";
        this.view.lblPwdMsg.top = "15dp";
        this.view.lblPwdMsg.bottom = "";
        this.view.lblPwdMsg.width = "85%";
        this.view.lblPwdMsg.centerX = "50%";
        this.view.lblPwdMsg.contentAlignment = constants.CONTENT_ALIGN_CENTER;
        this.view.lblEnterNewPassword.setVisibility(true);
        this.view.lblReEnterNewPassword.setVisibility(true);
        this.view.flxPassword.top = "10dp";
        this.view.flxConfirmPassword.top = "10dp";
        //congratulation flex alignment
        this.view.flxCongratulationLogo.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.lblCongtsIcon.left = "";
        this.view.lblCongtsIcon.centerX = "50%";
        this.view.lblCongtsIcon.width = "40dp";
        this.view.lblCongtsIcon.height = "40dp";
        this.view.lblCongtsIcon.skin = "sknGreenBgWhite40pxOLBFontIcon";
        this.view.lblCngts.left = "";
        this.view.lblCngts.centerX = "50%";
        this.view.lblCngts.top = "20dp";
        this.view.lblCngts.skin = "sknlbl424242SSPReg24px";
        this.view.lblCngtsMsg.left = "";
        this.view.lblCngtsMsg.top = "20dp";
        this.view.lblCngtsMsg.centerX = "50%";
        this.view.lblCngtsMsg.width = "80%";
        this.view.lblCngtsMsg.contentAlignment = constants.CONTENT_ALIGN_CENTER;
      }
    },
  };
});
