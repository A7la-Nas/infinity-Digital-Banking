define(['OLBConstants','CommonUtilities','SCAUtility'],function(OLBConstants,CommonUtilities, SCAUtility) {
    const SCAEmailContext = {
        serviceName: "",
        EmailIds: null,
        modifiedByName: null,
        userName: null
      };
	return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            this._flowType = "";
            this._servicekey = "";
            this.scaJSON = {};
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
            defineGetter(this, 'servicekey', () => {
                return this._servicekey;
            });
            defineSetter(this, 'servicekey', value => {
                this._servicekey = value;
            });
            defineGetter(this, 'flowType', () => {
                return this._flowType;
            });
            defineSetter(this, 'flowType', value => {
                this._flowType = value;
            });
        },

        preShow: function() {
            var scope = this;
            Controllers.set("SCAComponentController", this);
            scope.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(false);
            scope.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(false);
             scope.view.txtPhoneRounded.onTextChange = function(){
                        if(scope.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== '' && scope.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== null){
                           scope.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(true);
                          scope.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(true);
                        }
                            else{
                            scope.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(false);
                           scope.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(false);
                            }
                          };
            
        },

        handleSynErrorResponse: function(response) {
            kony.print("Uniken : handlesyncresponse in SCAComponentController : " + JSON.stringify(response));

            function SHOW_ALERT_Callback(form) {
                // form.rdnaObj.resetAuthState();
            }
            if (response[0].shortErrorCode !== 0) {
            if(response[0].shortErrorCode === 213){
                var errormsg = kony.i18n.getLocalizedString("kony.mb.sca.uniken.errorMessage");
                this.onFailureCallback(errormsg);
            }
            else if (response[0].shortErrorCode === 74) {
                this.onSessionFailureCallback();
            }
            else{
                var error = kony.i18n.getLocalizedString("kony.mb.sca.uniken.UnikenError");
                this.onFailureCallback(error);
                }
            }
             kony.application.dismissLoadingScreen();
        },

        handleSynErrorSetPasswordResponse: function(response) {
            RDNAUtility.showLoadingScreen();
            this.view.flxPasswordPopup.setVisibility(false);
            this.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text = "";

            kony.print("Uniken : handlesyncresponse : " + JSON.stringify(response));

            function SHOW_ALERT_Callback(form) {
                // form.rdnaObj.resetAuthState();
            }
            if (response[0].shortErrorCode !== 0) {
                var error = kony.i18n.getLocalizedString("kony.mb.sca.uniken.UnikenError");
                this.onFailureCallback(error);
            }
        },

        onFailureCallback: function(error) {
            this.view.flxPasswordPopup.setVisibility(false);
            const currentForm = kony.application.getCurrentForm().id;
            var formController = applicationManager.getPresentationUtility().getController(currentForm, true);
            formController.addEmailFailureCallBack(error);
        },
        onSessionFailureCallback: function (error) {
            this.view.flxPasswordPopup.setVisibility(false);
            this.view.lblSignInDeclined.text = kony.i18n.getLocalizedString("kony.mb.sca.uniken.notAuthorized");
            this.view.lblSignInDeclineDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.uniken.retry");
        },
        setFlowActions: function () {
            RDNAUtility.showLoadingScreen();
            let scopeObj = this;
            this.view.btnClose.onClick = function () {
                scopeObj.view.flxSignInDeniedPopup.setVisibility(false);
                scopeObj.view.setVisibility(false);
            };
            const currentForm = kony.application.getCurrentForm();
            const userName = scopeObj.scaJSON.userName;
            const OCRAContext = scopeObj.scaJSON.userDetails.data1 + "|" + scopeObj.scaJSON.userDetails.data2;
            serviceKey = scopeObj.scaJSON.response.MFAAttributes.serviceKey;
            serviceName = scopeObj.scaJSON.flowType;
            var UnikenPayload = OCRAContext + "|" + serviceName;
            var transactionsAmt = parseInt(scopeObj.scaJSON.userDetails.data2);
            const configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
            configurationSvc.getAllClientAppProperties((resp) => {
                OLBConstants.CLIENT_PROPERTIES = resp;
                var SCA_BREACH_LIMIT = 0;
                if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SCA_BREACH_LIMIT) SCA_BREACH_LIMIT = OLBConstants.CLIENT_PROPERTIES.SCA_BREACH_LIMIT;
                var breachLimit = parseInt(SCA_BREACH_LIMIT);
                if (transactionsAmt > breachLimit)
                    scopeObj.handleSynErrorResponse(RDNAAPI.authenticateUserAndSignData(UnikenPayload, 4, 1, "TransactionSignIn"));
                else scopeObj.handleSynErrorResponse(RDNAAPI.authenticateUserAndSignData(UnikenPayload, 1, 0, "TransactionSignIn"));
            });
        },

        getPassword: function (response) {
            var current = this;
            if (response.error.shortErrorCode === 0) {
                if (response.challengeResponse.status.statusCode === 0 || response.challengeResponse.status.statusCode === 100) {
                    current.view.flxPasswordPopup.setVisibility(true);
                    current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.onClick = function () {
                        RDNAUtility.showLoadingScreen();
                        if (current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded !== '' && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded !== null && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded !== undefined) {
                            kony.print("Uniken : " + current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text);
                            var pwdVerifyText = current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text;
                            current.handleSynErrorSetPasswordResponse(RDNAAPI.verifyPassword(pwdVerifyText, response.challengeMode));
                        } else {
                            RDNAUtility.showLoadingScreen();
                            current.view.flxPasswordPopup.setVisibility(false);
                        }
                    }
                    current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.onClick = function () {
                        RDNAUtility.showLoadingScreen();
                        current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text = "";
                        current.view.flxPasswordPopup.setVisibility(false);
                        RDNAUtility.hideLoadingScreen();
                        //var error = "You have denied the request";
                        var serverErrorRes = {};
                        serverErrorRes.errorDetails = kony.i18n.getLocalizedString("kony.mb.sca.uniken.denyMsg");
                        var error = serverErrorRes;
                        current.handleSynErrorSetPasswordResponse(RDNAAPI.resetAuthenticateUserAndSignDataState());
                        current.onFailureCallback(error);
                    }
                } else {
                    var error = kony.i18n.getLocalizedString("kony.mb.sca.uniken.UnikenError");
                    this.onFailureCallback(error);
                }
            } else {
                var error = kony.i18n.getLocalizedString("kony.mb.sca.uniken.UnikenError")
                this.onFailureCallback(error);
            }
        },
        scafunction: function(response) {
            var scopeObj = this;
            RDNAUtility.hideLoadingScreen();
            if (response.error.longErrorCode === 0) {
                const statusCode = response.status.statusCode;
                if (statusCode === 100) {
                    scopeObj.view.flxPasswordPopup.setVisibility(false);
                    if (scopeObj.scaJSON.userName != null)          
                        this.SCAUnikenTransaction();
                    else if (SCAEmailContext.serviceName != null) {
                        //Update the user details
                        this.addOrUpdateEmailSCAUniken();
                    }
                } else if (statusCode == 600) {
                    scopeObj.view.flxPasswordPopup.setVisibility(false);
                    this.view.flxSignInDeniedPopup.setVisibility(true);
                    this.view.lblSignInDeclined.text = kony.i18n.getLocalizedString("kony.mb.sca.uniken.notAuthorized");
                    this.view.lblSignInDeclineDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.uniken.errSelfieBiometric");
                }
                 else if (statusCode === 102) {
                    scopeObj.view.flxPasswordPopup.setVisibility(false);
                    this.view.flxSignInDeniedPopup.setVisibility(true);
                    this.view.lblSignInDeclined.text = kony.i18n.getLocalizedString("kony.mb.sca.uniken.failedAuthentication");
                    this.view.lblSignInDeclineDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.uniken.invalidCredentials");
					this.view.btnClose.onClick = function() {
                                scopeObj.view.flxSignInDeniedPopup.setVisibility(false);
                                scopeObj.view.setVisibility(false);
                            };
                }
                 else {
                    var error = kony.i18n.getLocalizedString("kony.mb.sca.uniken.invalidCredentials");
                    this.onFailureCallback(error);
                }
            } else {
                var error = response.error.shortErrorCode;
                if (error === 191) {
                    scopeObj.view.flxPasswordPopup.setVisibility(false);
                    this.view.flxSignInDeniedPopup.setVisibility(true);
                    this.view.lblSignInDeclined.text = kony.i18n.getLocalizedString("kony.mb.sca.uniken.failedAuthentication");
                    this.view.lblSignInDeclineDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.uniken.invalidCredentials");
                } else if (error === 184) {
                    //Do nothing when we click on back/cancel button on mobile, when fingerprint is enabled
                }else {
                    error = kony.i18n.getLocalizedString("kony.mb.sca.uniken.UnikenError");
                    this.onFailureCallback(error);
                }
            }
        },
        SCAUnikenTransaction: function() {
            let scopeObj = this;
            RDNAUtility.showLoadingScreen();
            const currentForm = kony.application.getCurrentForm();
            const userName = scopeObj.scaJSON.userName;
            const OCRAContext = scopeObj.scaJSON.userDetails.data1 + "|" + scopeObj.scaJSON.userDetails.data2;
            serviceKey = scopeObj.scaJSON.response.MFAAttributes.serviceKey;
            serviceName = scopeObj.scaJSON.flowType;
            var UnikenPayload = OCRAContext + "|" + serviceName;
            var payload = {
                "serviceKey": serviceKey
            };
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
            var objService = CIBAObjSrv.getDataModel("TransactionPushOperation", "UnikenTransactionObj");
            const cb = (status, response) => {
                if (status) {
                    scopeObj.signatureSuccessCallBack();
                } else {
                    scopeObj.signatureFailureCallBack();
                }
            };
            objService.customVerb("verifyTransactionMB", payload, cb);
        },
        setContext: function(mfaJSON) {
            let scopeObj = this;
            this.view.flxPasswordPopup.setVisibility(false);
            scopeObj.servicekey = mfaJSON.response.MFAAttributes.serviceKey;
            scopeObj.scaJSON = mfaJSON;
            scopeObj.transamount = mfaJSON.userDetails.data2;
            this.preShow();
            this.setFlowActions();
            // kony.application.dismissLoadingScreen();
        },
        signatureSuccessCallBack: function() {
            this.SCAInfinityTransaction();
        },
        signatureFailureCallBack: function(error) {
            kony.application.dismissLoadingScreen();
            this.onFailureCallback(error);
        },
        SCAInfinityTransaction: function() {
            let scopeObj = this;
            let params = {
                "MFAAttributes": {
                    "serviceKey": this.servicekey
                }
            };

            function completionCallback(status, data, error) {
                if (status === kony.mvc.constants.STATUS_SUCCESS) {
                    scopeObj.completeActivitySuccessCallback(data);
                } else {
                    scopeObj.completeActivityFailureCallback(error);
                }
            }
            var repoObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj.scaJSON.objectServiceDetails.dataModel);
            repoObj.customVerb(scopeObj.scaJSON.objectServiceDetails.operationName, params, completionCallback);
        },
        completeActivitySuccessCallback: function(response) {
            let scopeObj = this;
            kony.application.dismissLoadingScreen();
            if (response.hasOwnProperty("errcode") || response.hasOwnProperty("dbpErrCode")) {
                var err = {};
                err = response;
                err.errorMessage = response.dbpErrMsg || response.errorMessage;
                scopeObj.onFailureCallback(err);
            } else {
                scopeObj.onSuccessCallback(response);
            }
        },
        completeActivityFailureCallback: function(error) {
            kony.application.dismissLoadingScreen();
            let scopeObj = this;
            if (scopeObj.onFailureCallback) scopeObj.onFailureCallback(error);
        },
        verifyUserCredentials : function(emailContext){
            let scopeObj = this;
            this.preShow();
            SCAEmailContext.serviceName = emailContext.serviceName;
            SCAEmailContext.EmailIds = emailContext.EmailIds;
            SCAEmailContext.modifiedByName = emailContext.modifiedByName;
            SCAEmailContext.userName = emailContext.userName;
            this.authenticateUser(SCAEmailContext);
        },
        authenticateUserData : function(Payload,reason){
            this.preShow();
            Controllers.set("SCAComponentController",this);
            this.handleSynErrorResponse(RDNAAPI.authenticateUserAndSignData(Payload, 1, 0, reason));
        },
        authenticateUser : function(SCAEmailContext){
            this.handleSynErrorResponse(RDNAAPI.authenticateUserAndSignData(SCAEmailContext.serviceName, 1, 0, "GeneralSignIn"));
        },
        getAllChallenges : function(){
            this.handleSynErrorResponse(RDNAAPI.getAllChallenges(SCAEmailContext.userName));
        },
        
        addOrUpdateEmailSCAUniken: function() {
            const scopeObj = this;
            const currentForm = kony.application.getCurrentForm();
            RDNAUtility.showLoadingScreen();
            const servicePayload = {
                objServiceName: "SCAUniken",
                objName: "SCAUser",
                operationName: "updateMyProfileDetails",
                payload: {
                    "serviceName": SCAEmailContext.serviceName,
                    "isMobile": true,
                    "context": SCAEmailContext.serviceName,
                    "EmailIds": SCAEmailContext.EmailIds,
                    "modifiedByName": SCAEmailContext.modifiedByName
                },
                successCallback: scopeObj.updateEmailSCASuccessCallback,
                errorCallback: scopeObj.updateEmailSCAFailureCallback
            }
            SCAUtility.callBackendService(servicePayload);
        },
        updateEmailSCASuccessCallback : function(){
             let dataToDisplay = {};
                  if(SCAEmailContext.serviceName === "ADD_NEW_EMAIL"){
                    dataToDisplay = {
                      msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.SuccessExclamation"),
                      msgDesc: `You have created the email ID successfully.`
                    };
                  } else {
                    dataToDisplay = {
                      msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.SuccessExclamation"),
                      msgDesc: `You have updated the email ID successfully.`
                    };
                  }
                  applicationManager.getPresentationUtility().dismissLoadingScreen();
                  const currentForm = kony.application.getCurrentForm().id;
                  var formController = applicationManager.getPresentationUtility().getController(currentForm, true);
                  formController.emailSuccessNavigation();
        },
        updateEmailSCAFailureCallback : function(){
            let dataToDisplay = {};
                if (SCAEmailContext.serviceName === "ADD_NEW_EMAIL") {
                    dataToDisplay = {
                        msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.FailureExclamation"),
                        msgDesc: `Email ID not added in Infinity System`
                    };
                    } 
                else {
                    dataToDisplay = {
                        msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.FailureExclamation"),
                        msgDesc: `Email ID not updated in Infinity System`
                    };
                }
             applicationManager.getPresentationUtility().dismissLoadingScreen();
             const currentForm = kony.application.getCurrentForm().id;
             var formController = applicationManager.getPresentationUtility().getController(currentForm, true);
             formController.addEmailFailureCallBack();
         }
        
            
    };
});