define(['./ControllerImplementation', './KonyLogger'], function(ControllerImplementation, konyLoggerModule) {
  var konymp = konymp || {};
    var callBackOfApprovalScreen = null;
    konymp.logger = new konyLoggerModule("Uniken SDK Controller");
    var SDKConstants = {
        "TX_ACCEPTED": 101,
        "TX_DENIED": 102
    };
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            this._pushId = null;
            this.notificationMessage = null;
            this.allContainers = [];
            this.handler = new ControllerImplementation(this, baseConfig.id);
        },
        initGettersSetters: function() {
            defineSetter(this, "pushId", function(val) {
                try {
                    konymp.logger.trace("----------------------------- Setting Push ID Start", konymp.logger.FUNCTION_ENTRY);
                    if (typeof(val) === 'string') {
                        this._pushId = val;
                    } else {
                        throw {
                            error: kony.i18n.getLocalizedString("kony.mb.sca.Invalidtype"),
                            message: kony.i18n.getLocalizedString("kony.mb.sca.ErrInvalidinput")
                        };
                    }
                } catch (e) {
                    konymp.logger.error(JSON.stringify(e), konymp.logger.EXCEPTION);
                    if (e.error === "InvalidType") {
                        konymp.logger.trace(e.message, konymp.logger.FUNCTION_EXIT);
                    }
                }
                konymp.logger.trace("-----------------------------Setting Push ID End", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "pushId", function() {
                return this._pushId;
            });
        },
        showPinDialog: function(pinLength) {
            this.view.flxApprove.setVisibility(false);
            //this.view.transactionPinPopup.setVisibility(true);
            this.view.flxSignInApprovedPopup.setVisibility(false);
            this.view.flxSignInDeniedPopup.setVisibility(false);
            //this.view.transactionPinPopup.showPinDialog(pinLength);
            //this.view.transactionPinPopup.setFlowActions();
        },
        hidePinDialog: function() {
            //this.view.transactionPinPopup.setVisibility(false);
        },
        preshow: function() {
            Controllers.set("scasdkController", this);
            this.setFlowActions();
        },
        setFlowActions: function(callback) {
            const scopeObj = this;
            this.view.btnDone.onClick = function() {
                scopeObj.view.flxSignInApprovedPopup.setVisibility(false);
                scopeObj.view.setVisibility(false);
                if (callback) {
                    callback();
                }
            };
            this.view.btnClose.onClick = function() {
                scopeObj.view.flxSignInDeniedPopup.setVisibility(false);
                scopeObj.view.setVisibility(false);
                if (callback) {
                    callback();
                }
            };
            this.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.onTextChange = function() {
                if (scopeObj.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== '' && scopeObj.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== null) {
                    scopeObj.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(true);
                    scopeObj.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(true);
                } else {
                    scopeObj.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(false);
                    scopeObj.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(false);
                }
            };
            this.view.flxPasswordVisiblityToggle.onTouchEnd = function() {
                scopeObj.flxPasswordVisiblityToggleOnClick();
            };
        
        },
        showOrHideTxStatus: function(status, displayText) {
            if (status && status === SDKConstants.TX_ACCEPTED) {
                this.view.flxApprove.setVisibility(false);
                this.view.flxSignInApprovedPopup.setVisibility(true);
                this.view.flxSignInDeniedPopup.setVisibility(false);
                if (displayText && displayText.msgTitle && displayText.msgDesc) {
                    this.view.lblSignInApproved.text = displayText.msgTitle;
                    this.view.lblSignInDescription.text = displayText.msgDesc;
                } else {
                    this.view.lblSignInApproved.text = kony.i18n.getLocalizedString("kony.mb.sca.SignInApprvd");
                    this.view.lblSignInDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.SignToOlb");
                }
            } else if (status && status === SDKConstants.TX_DENIED) {
                this.view.flxApprove.setVisibility(false);
                this.view.flxSignInApprovedPopup.setVisibility(false);
                this.view.flxSignInDeniedPopup.setVisibility(true);
                if (displayText && displayText.msgTitle && displayText.msgDesc) {
                    this.view.lblSignInDeclined.text = displayText.msgTitle;
                    this.view.lblSignInDeclineDescription.text = displayText.msgDesc;
                } else {
                    this.view.lblSignInDeclined.text = kony.i18n.getLocalizedString("kony.mb.sca.SignInDenied");
                    this.view.lblSignInDeclineDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.DeniedReqst");
                }
            }
            this.view.forceLayout();
        },
        /**
         * @api : doDeviceProvisioning
         * @description : This function creates a service/container.
         * @param : activationObj - The activation object is required.It should contain following keys- pushId,userId,serverURL, inviteCode.
         * 
         */
        doDeviceProvisioning: function(provisionCode, provisionCallBack) {
            //       var key = {"identifier":"pushRegId"};
            //     var pushRegData = kony.keychain.retrieve(key);
            //     var pushRegJSON = JSON.parse(JSON.stringify(pushRegData));
            //       var activationObjJson = {
            //          "activationCode" : `${provisionCode}`,
            //          "pushId": pushRegJSON.securedata
            //       };  
            //       this.handler.doDeviceProvisioning(JSON.stringify(activationObjJson),provisionCallBack);
            this.handler.doDeviceProvisioning(provisionCode, provisionCallBack);
        },
        setUserLogin: function(provisionCode, provisionCallBack) {
            this.handler.setUserLoginNative(provisionCode, provisionCallBack);
        },
        intializingSDK: function(intializeSDKCallBack) {
            this.handler.initializeSDK(intializeSDKCallBack);
        },
        unikenSDKPwdCallback: function(passwordServiceKeyJSON, unikenPwdCallBack) {
            this.handler.unikenSDKPassword(passwordServiceKeyJSON, unikenPwdCallBack);
        },
        unikenSDKPwdLoginCallback: function(passwordServiceKeyJSON, unikenPwdLoginCallBack) {
            this.handler.unikenSDKLoginPassword(passwordServiceKeyJSON, unikenPwdLoginCallBack);
        },
        setUnikenLogOff: function(UserIdJSON, logOffSDKCallBack) {
            this.handler.logOffSDKControllImplement(UserIdJSON, logOffSDKCallBack);
        },
        getAllchallengesSDK: function(getAllChallengesCallBack) {
            this.handler.getAllchallengesControllImplement(getAllChallengesCallBack);
        },
        unikenSDKfrgtPwdCallback: function(forgotPwdUnikenCallback) {
            this.handler.frgtPwdSDKControllImplement(forgotPwdUnikenCallback);
        },
        unikenSDKAcessCodeCallback: function(UserNameActivationCodeJSON, accessCodeUnikenCallback) {
            this.handler.accessCodefrgtSDKControllImplement(UserNameActivationCodeJSON, accessCodeUnikenCallback);
        },
        changeUnikenUserPasswordSDKS: function(UserChangePasswordJSON, unikenChangePwdSDKCallBack) {
            this.handler.changeUnikenUserpwd(UserChangePasswordJSON, unikenChangePwdSDKCallBack);
        },
        setContainerPin: function(pin, pincallback) {
            this.handler.setContainerPin(pin, pincallback);
        },
        updatePushRegistrationToken: function(pushId) {
            this.handler.updatePushRegistrationToken(pushId);
        },
        /**
         * @api : getAllContainers
         * @description : API to return all containers in a device
         * @return : array of all containers
         */
        getAllContainers: function() {
            return this.handler.getAllContainers();
        },
        /**
         * @api : showApprovalScreen
         * @description : This function creates a service/container.
         * @param : activationObj - The activation object is required.It should contain following keys- pushId,userId,serverURL, inviteCode.
         * @return : true/false - Returns true in case of successful service creation,otherwise false
         */
        showApprovalScreen: function(notificationMessage, callBackOfApproval) {
            //this.handler.showApprovalScreen(notificationMessage, sdkCallBack);
            const scopeObj = this;
            callBackOfApprovalScreen = callBackOfApproval;
            this.view.flxPasswordPopup.setVisibility(false);
            var notification_data = notificationMessage;
            this.view.lblNotification.text = notificationMessage.tds.data.body[0].message;
            this.view.lblHeader.text = notificationMessage.tds.data.body[0].subject;
            if (notificationMessage.tds.data.actions.length === 1) {
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionYes.text = notificationMessage.tds.data.actions[0].label;
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionYes.setVisibility(true);
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionYes.width = "100%";
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionNo.setVisibility(false);
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionNo.flxMiddleFLine.setVisibility(false);
                //this.view.flxApprove.flxApprovePopup.flxFraud.setVisibility(false);
            }
            if (notificationMessage.tds.data.actions.length === 2) {
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionYes.text = notificationMessage.tds.data.actions[0].label;
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionNo.text = notificationMessage.tds.data.actions[1].label;
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionYes.setVisibility(true);
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionNo.setVisibility(true);
                //this.view.flxApprove.flxApprovePopup.flxFraud.btnFraud.setVisibility(false);
            }
            if (notificationMessage.tds.data.actions.length === 3) {
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionYes.text = notificationMessage.tds.data.actions[0].label;
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionNo.text = notificationMessage.tds.data.actions[1].label;
                //this.view.flxApprove.flxApprovePopup.flxFraud.btnFraud.text = notificationMessage.tds.data.actions[2].label;
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionYes.setVisibility(true);
                this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionNo.setVisibility(true);
                //this.view.flxApprove.flxApprovePopup.flxFraud.setVisibility(true);
            }
            this.view.flxApprove.isVisible = true;
            this.view.flxSignInApprovedPopup.setVisibility(false);
            this.view.flxSignInDeniedPopup.setVisibility(false);
            this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionYes.onClick = function() {
                scopeObj.view.flxApprove.setVisibility(false);
                applicationManager.getPresentationUtility().showLoadingScreen();
                kony.print("Uniken : Notification uuid : " + notification_data.tds.data.notification_uuid + "action : " + notification_data.tds.data.actions[0].action);
                scopeObj.handleSynErrorResponse(RDNAAPI.updateNotification(notification_data.tds.data.notification_uuid, notification_data.tds.data.actions[0].action));
            }
            this.view.flxApprove.flxApprovePopup.flxDecision.btnDecisionNo.onClick = function() {
                scopeObj.view.flxSignInDeniedPopup.setVisibility(true);
                scopeObj.handleSynErrorResponse(RDNAAPI.updateNotification(notification_data.tds.data.notification_uuid, notification_data.tds.data.actions[1].action));
            }
            /*this.view.flxApprove.flxApprovePopup.flxFraud.btnFraud.onClick = function() {
                RDNAUtility.showLoadingScreen();
                scopeObj.view.flxSignInDeniedPopup.setVisibility(true);
                scopeObj.handleSynErrorResponse(RDNAAPI.updateNotification(notification_data.tds.data.notification_uuid, notification_data.tds.data.actions[2].action));
            }*/
        },
        /**
         * @api : hideApprovalScreen
         * @description : This function creates a service/container.
         * @param : activationObj - The activation object is required.It should contain following keys- pushId,userId,serverURL, inviteCode.
         * @return : true/false - Returns true in case of successful service creation,otherwise false
         */
        hideApprovalScreen: function() {
            this.handler.hideApprovalScreen();
        },
        /**
         * @api : signTransaction
         * @description : This function creates a service/container.
         * @param : activationObj - The activation object is required.It should contain following keys- pushId,userId,serverURL, inviteCode.
         * @return : true/false - Returns true in case of successful service creation,otherwise false
         */
        signTransaction: function(status, transactionID, password) {
            this.handler.signTransaction(status, transactionID, password);
        },
        generateSynchronousOTP: function(userId, sdkCallBack) {
            this.handler.generateSynchronousOTP(userId, sdkCallBack);
        },
        generateOCRAOTP: function(userId, txInput, sdkCallBack) {
            this.handler.generateOCRAOTP(userId, txInput, sdkCallBack);
        },
        getUserPendingTransactions: function(userId) {
            return this.handler.getUserPendingTransactions(userId);
        },
        updatePin: function(userId, oldPin, newPin, jsCallBack) {
            this.handler.updatePin(userId, oldPin, newPin, jsCallBack);
        },
        enableBiometricAuthentication: function(userId, password, jsCallBack) {
            this.handler.enableBiometricAuthentication(userId, password, jsCallBack);
        },
        isDeviceBiometricAvailable: function() {
            return this.handler.isDeviceBiometricAvailable();
        },
        setBiometricPrompt: function(userId, jsCallBack) {
            this.handler.setBiometricPrompt(userId, jsCallBack);
        },
        resetBiometricPrompt: function(userId) {
            this.handler.resetBiometricPrompt(userId);
        },
        isBiometricEnabled: function(userId) {
            return this.handler.isBiometricEnabled(userId);
        },
        isFaceIDSupport: function() {
            return this.handler.isFaceIDSupport();
        },
        renewContainer: function(userId, noOfdaysBeforeExpiry, jsCallBack) {
            var key = {
                "identifier": "pushRegId"
            };
            var pushRegData = kony.keychain.retrieve(key);
            var pushRegJSON = JSON.parse(JSON.stringify(pushRegData));
            var renewalObj = {
                "userId": userId,
                "pushId": pushRegJSON.securedata
            };
            this.handler.renewContainer(noOfdaysBeforeExpiry, JSON.stringify(renewalObj), jsCallBack);
        },
        // resetPinDialog: function() {
        //     if (this.view.transactionPinPopup.isVisible) {
        //         this.handler.setContainerPin("");
        //     }
        // },
        checkBiometricsEnabledForUsers: function() {
            return this.handler.checkBiometricsEnabledForUsers();
        },
        // Uniken SDK Handling methods...
        onUpdateNotificationHandle: function(response) {
            var scopeObj = this;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            function SHOW_ALERT_Callback(form) {
                if (callBackOfApprovalScreen) {
                    kony.print("Uniken : Approval callback is called");
                    callBackOfApprovalScreen();
                }
            }

            function SHOW_ALERT_ItemsExhausted_Callback(form) {
                var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                //scopeObj.showOrHideHamburgerUI(false, scope);
                authMod.presentationController.onLogout();
            }


        if (response.error.longErrorCode === 0) {
            const statusCode = response.pArgs.response.StatusCode;
            if (statusCode === 100) {
                scopeObj.view.flxPasswordPopup.setVisibility(false);
                scopeObj.view.flxApprove.setVisibility(false);
                scopeObj.view.flxSignInApprovedPopup.setVisibility(true);
                if(this.view.lblHeader.text == 'Approve Payment'){
                    scopeObj.view.flxSignInApprovedPopup.lblSignInApproved.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
                    scopeObj.view.flxSignInApprovedPopup.lblSignInDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.TransactionRqstAprvd");
                }
                else if(this.view.lblHeader.text == 'Confirm Login Request'){
                     scopeObj.view.flxSignInApprovedPopup.lblSignInApproved.text = kony.i18n.getLocalizedString("kony.mb.sca.SignInApprvd");
                    scopeObj.view.flxSignInApprovedPopup.lblSignInDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.LoginRqstAprvd");
                }
                else if(this.view.lblHeader.text == 'Approve Request'){
                     scopeObj.view.flxSignInApprovedPopup.lblSignInApproved.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
                     scopeObj.view.flxSignInApprovedPopup.lblSignInDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.RequestAprvd");
                }
                else if(this.view.lblHeader.text == 'Additional Device Activation Request'){
                    scopeObj.view.flxSignInApprovedPopup.lblSignInApproved.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
                    scopeObj.view.flxSignInApprovedPopup.lblSignInDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.RequestAprvd");
                }
               
                var not_uuid = response.pArgs.response.ResponseData.notification_uuid;
                if (callBackOfApprovalScreen) {
                    kony.print("Uniken : Approval callback is called");
                    callBackOfApprovalScreen();
                }
                /*kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_INFO,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": "Notification updated successfully",
                    "alertHandler": SHOW_ALERT_Callback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });*/
            }  else if(statusCode == 600){
                this.view.flxApprove.setVisibility(false);
                this.view.flxSignInApprovedPopup.setVisibility(false);
                this.view.flxSignInDeniedPopup.setVisibility(true);
                    this.view.lblSignInDeclined.text = kony.i18n.getLocalizedString("kony.mb.sca.NotAuthorisedToAprve");
                    this.view.lblSignInDeclineDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.ConfgSelfieBiometric");
                
            }
            else if (statusCode == 3519) {
                kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_INFO,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": "Notification is Expired",
                    "alertHandler": SHOW_ALERT_Callback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
            } else if (statusCode == 153) {
                kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_INFO,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": "Attempts Exhausted for the user. Please contact admin.",
                    "alertHandler": SHOW_ALERT_ItemsExhausted_Callback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
            } else {
                kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_INFO,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": response.pArgs.response.StatusMsg,
                    "alertHandler": SHOW_ALERT_Callback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
            }
        } else {
            // If error occurred reload devices list with previous response
            //generic alert changes
            scopeObj.view.flxApprove.setVisibility(false);
            kony.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": null,
                "yesLabel": null,
                "noLabel": null,
                "alertIcon": null,
                "message": RDNAUtility.getErrorMessage(response.error),
                "alertHandler": SHOW_ALERT_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
        }
    },
    getPassword: function(response) {
            var current = this;
            //this.view.lblAttemptsLeft.text = "AttemptsLeft: " + this.response.attemptsLeft;
            function SHOW_ALERT_Status_Callback() {
                //current.showPrompt();
            }
            if (response.error.shortErrorCode === 0) {
                if (response.challengeResponse.status.statusCode === 0 || response.challengeResponse.status.statusCode === 100) {
                    //this.showPrompt();
                    current.view.flxPasswordPopup.setVisibility(true);
                    current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(false);
                    current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(false);
                    current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text = ""
                    
                    current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.onClick = function() {
                        RDNAUtility.showLoadingScreen();
                        if (current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded !== '' && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded !== null && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded !== undefined){
                            kony.print("Uniken : " + current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text);
                            var pwdVerifyText = current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text;
                            current.handleSynErrorSetPasswordResponse(RDNAAPI.verifyPassword(pwdVerifyText, response.challengeMode));
                        }
                        else{
                            RDNAUtility.showLoadingScreen();
                            current.view.flxPasswordPopup.setVisibility(false);
                        }
                    }
                    current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.onClick = function() {
                        RDNAUtility.showLoadingScreen();
                        current.view.flxPasswordPopup.setVisibility(false);
                        RDNAUtility.hideLoadingScreen();
						current.view.flxSignInDeniedPopup.setVisibility(true);
                    }
                } else {
                    kony.ui.Alert({
                        "alertType": constants.ALERT_TYPE_INFO,
                        "alertTitle": null,
                        "yesLabel": null,
                        "noLabel": null,
                        "alertIcon": null,
                        "message": response.challengeResponse.status.statusMessage,
                        "alertHandler": SHOW_ALERT_Status_Callback
                    }, {
                        "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                    });
                }
            } else {
                kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_ERROR,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": RDNAUtility.getErrorMessage(response.error),
                    "alertHandler": SHOW_ALERT_Status_Callback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
            }
        },
        handleSynErrorResponse: function(response) {
            kony.print("Uniken : handlesyncresponse : " + JSON.stringify(response));

            function SHOW_ALERT_Callback(form) {
                // form.rdnaObj.resetAuthState();
            }
            if (response[0].shortErrorCode !== 0) {
                RDNAUtility.hideLoadingScreen();
                kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_ERROR,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": RDNAUtility.getErrorMessage(response[0]),
                    "alertHandler": SHOW_ALERT_Callback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
            }
        },
        handleSynErrorSetPasswordResponse: function(response) {
            kony.print("Uniken : handlesyncresponse : " + JSON.stringify(response));
            var current = this;
			current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text = "";

            function SHOW_ALERT_Callback(form) {
                // form.rdnaObj.resetAuthState();
            }
            if (response[0].shortErrorCode !== 0) {
                RDNAUtility.hideLoadingScreen();
                kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_ERROR,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": "Please enter a valid password",
                    "alertHandler": SHOW_ALERT_Callback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
            } else {
                current.view.flxPasswordPopup.setVisibility(false);
            }
        },
        flxPasswordVisiblityToggleOnClick: function() {
            if (this.view.imgPasswordVisiblityToggle.src === "viewicon.png") {
                this.view.imgPasswordVisiblityToggle.src = "viewactive.png";
                this.view.txtPhoneRounded.secureTextEntry = false;
                this.view.flxPasswordPopup.forceLayout();
            } else {
                this.view.imgPasswordVisiblityToggle.src = "viewicon.png";
                this.view.txtPhoneRounded.secureTextEntry = true;
                this.view.flxPasswordPopup.forceLayout();
            }
			}
};
  
  });
