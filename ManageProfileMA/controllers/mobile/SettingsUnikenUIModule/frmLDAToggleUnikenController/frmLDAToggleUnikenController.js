define({
    //  timerCounter:0,


    biometricEnabled: null,
    authenticationType: null,
    logoutUser: false,

    init: function () {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    imgbackAction: function () {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
    preshow: function () {
        console.log("Preshow call");
        Controllers.set("frmLDAToggleUnikenController", this);
        this.renderTitleBar();
        this.view.flxPasswordPopup.setVisibility(false);
        this.view.flxSignInDeniedPopup.setVisibility(false);
        this.view.flxSecurityRequirements.setVisibility(false);
        this.view.Switchoption.setEnabled(false);
    },
    postShow: function () {
        this.setFlowActions();
    },
    setFlowActions: function () {
        const current = this;
        Controllers.set("frmLDAToggleUnikenController", this);
        let response = RDNAAPI.getDeviceAuthenticationDetails();
        this.authenticationType = JSON.parse(response[1]).authenticationCapabilities[0].authenticationType;
        this.logoutUser = false;
        let flag = JSON.parse(response[1]).authenticationCapabilities[0].isConfigured;

        if (flag == 1) {
            current.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = 0;
            this.biometricEnabled = 0;
        } else {
            //Template is not available
            current.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = 1;
            this.biometricEnabled = 1;
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.onTouchStart = function () {
            current.slideSuccessNavigate();
        };
        this.view.btnClose.onClick = function () {
            current.view.flxSignInDeniedPopup.setVisibility(false);
            if (current.logoutUser) {
                var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                authMode.presentationController.onLogout();
            }
        };
        this.view.btnDone.onClick = function () {
            current.view.flxSignInApprovedPopup.setVisibility(false);
            var navManager = applicationManager.getNavigationManager();


            const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AuthUIModule",
                "appName": "AuthenticationMA"
            });
            authMod.presentationController.onLogout();
        };
        this.view.txtPhoneRounded.onTextChange = function () {
            if (current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== '' && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== null) {
                current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(true);
                current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(true);
            }
            else {
                current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(false);
                current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(false);
            }
        };
    },
    enableSecurityPolicy: function (response) {
        var current = this;
        current.view.flxSecurityRequirements.setVisibility(true);
        var passwordPolicy = JSON.parse(response.challengeResponse.challengeInfo[4].value).msg;
        current.view.rtxRulesPwd.text = passwordPolicy;
    },
    handleSetPassword: function (response) {
        var current = this;
        if (response.error.shortErrorCode === 0) {
            if (response.challengeResponse.status.statusCode === 0 || response.challengeResponse.status.statusCode === 100) {
                current.passwordPopupUI("Set Password", "Approve", "Deny");
                current.enableSecurityPolicy(response);
                current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.onClick = function () {
                    RDNAUtility.showLoadingScreen();
                    if (current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== '' && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== null && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== undefined) {
                        kony.print("Uniken : " + current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text);
                        var pwdVerifyText = current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text;
                        REL_ID_PWD_JsonString = response.challengeResponse.challengeInfo[4].value;
                        //var policy = JSON.parse(REL_ID_PWD_JsonString).msg;
                        RDNAUtility.getSession().pwdRegex = JSON.parse(REL_ID_PWD_JsonString).regex;
                        var Regex_pattern = RDNAUtility.getSession().pwdRegex;
                        REL_ID_PwdRegex = current.base64DecodefrmString(Regex_pattern);
                        if (current.validatePassword(REL_ID_PwdRegex, pwdVerifyText))
                            current.handleSynErrorSetPasswordResponse(RDNAAPI.setPassword(pwdVerifyText, response.challengeMode));
                        else
                            current.ErrorPopupUI("Invalid password");

                    } else {
                        RDNAUtility.showLoadingScreen();
                        current.view.flxPasswordPopup.setVisibility(false);
                    }
                    applicationManager.getPresentationUtility().dismissLoadingScreen();
                }
                current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.onClick = function () {
                    current.ErrorPopupUI("You have denied the request");
                }
            }
        }
    },
    validatePassword: function (pwdRegex_pattern_scope, password) {
        const current = this;
        //var pwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$");
        var pwdRegex = new RegExp(pwdRegex_pattern_scope);
        if (pwdRegex.test(password.trim())) {
            kony.print("Uniken: Password validated with Regex Successfully ");
            return true;
        } else {
            kony.print("Uniken: Password validated with Regex Failed ");
            return false;
        }
        // return true;
    },
    base64DecodefrmString: function (stringToConvert) {
        try {
            var Base64 = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                decode: function (e) {
                    var base64String = "";
                    var characterCount, r, i;
                    var s, o, u, a;
                    var f = 0;
                    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
                    while (f < e.length) {
                        s = this._keyStr.indexOf(e.charAt(f++));
                        o = this._keyStr.indexOf(e.charAt(f++));
                        u = this._keyStr.indexOf(e.charAt(f++));
                        a = this._keyStr.indexOf(e.charAt(f++));
                        characterCount = s << 2 | o >> 4;
                        r = (o & 15) << 4 | u >> 2;
                        i = (u & 3) << 6 | a;
                        base64String = base64String + String.fromCharCode(characterCount);
                        if (u != 64) {
                            base64String = base64String + String.fromCharCode(r);
                        }
                        if (a != 64) {
                            base64String = base64String + String.fromCharCode(i);
                        }
                    }
                    base64String = Base64._utf8_decode(base64String);
                    return base64String;
                },
                _utf8_decode: function (e) {
                    var base64String = "";
                    var characterCount = 0;
                    var r = 0,
                        c1 = 0,
                        c2 = 0,
                        c3 = 0;
                    while (characterCount < e.length) {
                        r = e.charCodeAt(characterCount);
                        if (r < 128) {
                            base64String += String.fromCharCode(r);
                            characterCount++;
                        } else if (r > 191 && r < 224) {
                            c2 = e.charCodeAt(characterCount + 1);
                            base64String += String.fromCharCode((r & 31) << 6 | c2 & 63);
                            characterCount += 2;
                        } else {
                            c2 = e.charCodeAt(characterCount + 1);
                            c3 = e.charCodeAt(characterCount + 2);
                            base64String += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                            characterCount += 3;
                        }
                    }
                    return base64String;
                }
            };
            if (stringToConvert !== null && stringToConvert !== undefined) {
                var returnBase64 = Base64.decode(stringToConvert);
                kony.print("blob data " + returnBase64);
                return returnBase64;
            } else {
                return null;
            }
        } catch (err) {
            kony.print(err);
        }
    },
    handleConfirmPassword: function (response) {
        var current = this;
        if (response.error.shortErrorCode === 0) {
            if (response.challengeResponse.status.statusCode === 0 || response.challengeResponse.status.statusCode === 100) {
                current.passwordPopupUI("Enable Password Verification", "Approve", "Deny");
                current.view.flxSecurityRequirements.setVisibility(false);
                current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.onClick = function () {
                    if (current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== '' && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== null && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== undefined) {
                        kony.print("Uniken : " + current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text);
                        var pwdVerifyText = current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text;
                        current.handleSynErrorSetPasswordResponse(RDNAAPI.verifyPassword(pwdVerifyText, response.challengeMode));
                    } else {
                        RDNAUtility.showLoadingScreen();
                        current.view.flxPasswordPopup.setVisibility(false);
                    }
                }
                current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.onClick = function () {
                    current.ErrorPopupUI("You have denied the request");
                }
            }
        }
    },
    getPassword: function (response) {
        var current = this;
        if (response.error.shortErrorCode === 0) {
            if (response.challengeResponse.status.statusCode === 0 || response.challengeResponse.status.statusCode === 100) {
                current.passwordPopupUI("Password Verification", "Approve", "Deny");
                current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.onClick = function () {
                    RDNAUtility.showLoadingScreen();
                    if (current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded !== '' && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded !== null && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded !== undefined) {
                        kony.print("Uniken : " + current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text);
                        var pwdVerifyText = current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text;
                        current.handleSynErrorSetPasswordResponse(RDNAAPI.verifyPassword(pwdVerifyText, response.challengeMode));
                    } else {
                        current.view.flxPasswordPopup.setVisibility(false);
                    }
                }
                current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.onClick = function () {
                    current.ErrorPopupUI("You have denied the request");
                }
            }
        }
    },
    ErrorPopupUI: function (errorMsg) {
        var current = this;
        this.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text = "";
        this.view.flxPasswordPopup.setVisibility(false);
        this.view.flxSignInDeniedPopup.setVisibility(true);
        this.view.lblSignInDeclineDescription.text = errorMsg;
        current.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = current.biometricEnabled;
    },
    passwordPopupUI: function (headerLabel, yesLabel, noLabel) {
        var current = this;
        current.view.flxPasswordPopup.setVisibility(true);
        current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(false);
        current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(false);
        current.view.flxPasswordPopup.flxPasswordPopupInner.lblPassword.text = headerLabel;
        current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.text = yesLabel;
        current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.text = noLabel;
    },
    handleSynErrorSetPasswordResponse: function (response) {
        var current = this;
        current.view.flxPasswordPopup.setVisibility(false);
        current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text = "";
        if (current.view.flxSecurityRequirements)
            current.view.flxSecurityRequirements.setVisibility(false);
        kony.print("Uniken : handlesyncresponse : " + JSON.stringify(response));
        if (response[0].longErrorCode !== 0) {
            var errorMsg = response[0].errorString + " with error code" + response[0].longErrorCode;
            current.ErrorPopupUI(errorMsg);
        }
    },
    handleSynErrorResponse: function (response) {
        var current = this;
        if (response[0].longErrorCode !== 0) {
            var errorMsg = response[0].errorString + " with error code" + response[0].longErrorCode;
            current.ErrorPopupUI(errorMsg);
        }
    },
    onDeviceAuthManagementStatus: function (response) {
        var current = this;
        if (response.error.longErrorCode === 0) {
            if (response.status.statusCode === 100 || response.status.statusCode === 0) {
                if (response.OpMode === 1) {
                    current.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = 0;
                    applicationManager.getUserPreferencesManager().setDefaultAuthMode("touchid");
                    current.biometricEnabled = 0;
                    current.SuccessPopupUI("biometric");
                } else if (response.OpMode === 0)
                //Template is not available
                {
                    current.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = 1;
                    applicationManager.getUserPreferencesManager().setDefaultAuthMode("password");
                    current.biometricEnabled = 1;
                    current.SuccessPopupUI("password");
                }
                else if (response.status.statusCode === 153) {
                    var errorMsg = response.status.statusMessage;
                    current.ErrorPopupUI(errorMsg);
                    current.logoutUser = true;


                }
                else {
                    var Msg = response.status.statusMessage;
                    current.ErrorPopupUI(errorMsg);
                }
            }
            else {
                var errorMsg = response.status.statusMessage;
                current.ErrorPopupUI(errorMsg);
            }
        }
        else {
            var errorMsg = response.status.statusMessage;
            current.ErrorPopupUI(errorMsg);
        }
    },
    SuccessPopupUI: function (msg) {
        var current = this;
        current.view.flxSignInApprovedPopup.setVisibility(true);
        current.view.lblSignInDescription.text = "You have successfully opted for " + msg + "\n Please login with newly opted method";
    },
    handleOnUserConsentLDA: function (response) {
        var current = this;
        REL_ID_Challenge_mode = response.challengeMode;
        REL_ID_Authentication_type = response.authenticationType;
        var basicConfig = {
            "alertType": constants.ALERT_TYPE_CONFIRMATION,
            "alertTitle": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.sca.EnableBioMetricHeader"),
            "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.enable"),
            "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.notnow"),
            "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.sca.EnableBioMetricMessage"),
            "alertHandler": current.enableBioMetric
        };
        var pspConfig = {
            "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        };
        applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
    },
    enableBioMetric: function (response) {
        var current = this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        //if (response === true) {
        current.actionSetUserConsentForLDA(response, REL_ID_Challenge_mode, REL_ID_Authentication_type);
    },
    slideSuccessNavigate: function () {
        var current = this;
        current.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = current.biometricEnabled;
        let res = RDNAAPI.getDeviceAuthenticationDetails();
        if (current.biometricEnabled === 0) {
            let response = RDNAAPI.manageDeviceAuthenticationModes(false, current.authenticationType);
            current.handleSynErrorResponse(response);
        } else if (current.biometricEnabled === 1) {
            let response = RDNAAPI.manageDeviceAuthenticationModes(true, current.authenticationType);
            current.handleSynErrorResponse(response);
        } else {
            var errorMsg = "Something went wrong, try again later";
            current.ErrorPopupUI(errorMsg);
        }
    },
    actionSetUserConsentForLDA: function (userConsent, challengeMode, authenticationType) {
        RDNAUtility.showLoadingScreen();
        this.handleSynErrorResponse(RDNAAPI.setUserConsentForLDA(userConsent, challengeMode, authenticationType));
    },

    renderTitleBar: function() {
        var deviceUtilManager = applicationManager.getDeviceUtilManager();
        var isIphone = deviceUtilManager.isIPhone();
        if (!isIphone) {
            this.view.flxHeader.isVisible = true;
        } else {
            this.view.flxHeader.isVisible = false;
            this.view.flxMainContainer.top = "-50dp";
        }
    },
        

});