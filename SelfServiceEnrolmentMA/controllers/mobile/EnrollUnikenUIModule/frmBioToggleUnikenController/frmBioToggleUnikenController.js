define({
    //  timerCounter:0,
    biometricEnabled: null,
    init: function() {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    imgbackAction: function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
    preshow: function() {
        var scopeObj = this;
        console.log("Preshow call");
        scopeObj.view.pwdbtnDecisionYes.setEnabled(false);
        scopeObj.view.pwdbtnDecisionNo.setEnabled(false);
        Controllers.set("frmBioToggleUnikenController", this);
        scopeObj.view.Switchoption.setEnabled(false);
        scopeObj.view.txtBiometric.setEnabled(false);
        scopeObj.view.txtbiometrics.setEnabled(false);
    },
    postShow: function() {
        this.setFlowActions();
        this.view.customHeader.lblLocateUs.contentAlignment = constants.CONTENT_ALIGN_CENTER;
    },
    setFlowActions: function() {
        const scopeObj = this;
      Controllers.set("frmBioToggleUnikenController", this);
      this.view.btnClose.onClick = function() {
        scopeObj.view.flxSignInDeniedPopup.setVisibility(false);
        scopeObj.view.setVisibility(false);
      };
      scopeObj.view.txtPhoneRounded.onTextChange = function(){
            if(scopeObj.view.txtPhoneRounded.text !== '' && scopeObj.view.txtPhoneRounded.text !== null){
                scopeObj.view.pwdbtnDecisionYes.setEnabled(true);
                scopeObj.view.pwdbtnDecisionNo.setEnabled(true);
            }
            else{
                scopeObj.view.pwdbtnDecisionYes.setEnabled(false);
                scopeObj.view.pwdbtnDecisionNo.setEnabled(false);
            }
        };
       
        RDNAUtility.showLoadingScreen();
        this.handleSynErrorResponse(RDNAAPI.checkIDVUserBiometricTemplateStatus());
       
        this.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.onTouchStart = function() {
        scopeObj.slideSuccessNavigate();
        };

    },
    btnSkipOnClick: function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "AuthUIModule",
            "appName": "AuthenticationMA"
        });
        authMode.presentationController.defaultLoginToAccounts();
    },
    handleOnUserConsentLDA: function(response) {
            var scopeObj = this;
            REL_ID_Challenge_mode = response.challengeMode;
            REL_ID_Authentication_type = response.authenticationType;
            var basicConfig = {
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "alertTitle": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.sca.EnableBioMetricHeader"),
                "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.enable"),
                "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.notnow"),
                "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.sca.EnableBioMetricMessage"),
                "alertHandler": scopeObj.enableBioMetric
            };
            var pspConfig = {
                "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
            };
            applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
        },
        enableBioMetric: function(response) {
            var scopeObj = this;
            applicationManager.getPresentationUtility().showLoadingScreen();
            //if (response === true) {
            scopeObj.actionSetUserConsentForLDA(response, REL_ID_Challenge_mode, REL_ID_Authentication_type);
            // scopeObj.view.sdk.enableBiometricAuthentication(scopeObj.userId, scopeObj.pin, getEnrollmentStatusCallBack);
            //            } else {
            //                if (scopeObj.navigateToLogin) {
            //                    scopeObj.navigateToLogin();
            //                }
            //            }
            function getEnrollmentStatusCallBack(res) {
                if (SCAUtility.SDKConstants.BIOMETRICS_ENABLED == res) {
                    //scopeObj.invokeBioMetric();
                    scopeObj.pin = null;
                    if (scopeObj.navigateToLogin) {
                        scopeObj.navigateToLogin();
                    }
                } else {
                    if (scopeObj.navigateToLogin) {
                        scopeObj.navigateToLogin();
                    }
                }
            }
        },
        getPassword: function(response) {
            var current = this;
            if (response.error.shortErrorCode === 0) {
                if (response.challengeResponse.status.statusCode === 0 || response.challengeResponse.status.statusCode === 100) {
                    current.view.flxPasswordPopup.setVisibility(true);
                    current.view.pwdbtnDecisionYes.onClick = function() {
                        RDNAUtility.showLoadingScreen();
                        if (current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded !== '' && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded !== null && current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded !== undefined) {
                            kony.print("Uniken : " + current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text);
                            var pwdVerifyText = current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text;
                            current.handleSynErrorResponse(RDNAAPI.verifyPassword(pwdVerifyText, response.challengeMode));
                        } else {
                            RDNAUtility.showLoadingScreen();
                            current.view.flxPasswordPopup.setVisibility(false);
                        }
                    }
                    current.view.pwdbtnDecisionNo.onClick = function() {
                        RDNAUtility.showLoadingScreen();
                        current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text ="";
                        current.view.flxPasswordPopup.setVisibility(false);
                        RDNAUtility.hideLoadingScreen();
                        current.handleSynErrorResponse(RDNAAPI.resetAuthenticateUserAndSignDataState());
                        current.onFailureCallback();
                    }
                } else {
                    var error = "Uniken error"
                    this.onFailureCallback(error);
                }
            } else {
                var error = "Uniken error"
                this.onFailureCallback(error);
            }
        },

        onFailureCallback : function(){
            this.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = this.biometricEnabled;
            this.view.flxPasswordPopup.setVisibility(false);
            this.view.flxSignInDeniedPopup.setVisibility(true);
            this.view.lblSignInDeclined.text = "Request denied";
            this.view.lblSignInDeclineDescription.text = "You have denied the request";
        },
        invokeBioMetric: function() {
            var scopeObj = this;
            scopeObj.view.sdk.setBiometricPrompt(scopeObj.userId, getBioMetricStatus.bind());

            function getBioMetricStatus(res) {
                if (SCAUtility.SDKConstants.BIOMETRICS_SUCCESS) {
                    if (scopeObj.navigateToLogin) {
                        scopeObj.navigateToLogin();
                    }
                } else {
                    if (scopeObj.navigateToLogin) {
                        scopeObj.navigateToLogin();
                    }
                }
            }
        },
        navigateToPreviousForm: function() {
                    const navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("frmBioToggleUniken", undefined);
                    navManager.navigateTo({
                        "appName": "HomepageMA",
                        "friendlyName": "AccountsUIModule/frmUnifiedDashboard"
                    });
                },
    handleSynErrorResponse: function(response) {
            const scopeObj = this;
            scopeObj.view.txtPhoneRounded.text="";
            this.view.pwdbtnDecisionYes.setEnabled(false);
            this.view.pwdbtnDecisionNo.setEnabled(false);
            function SHOW_ALERT_Callback() {
                //scopeObj.view.tbxUsername.text = "";
                // form.rdnaObj.resetAuthState();
           // In this case server does not support the Server side biometric
                scopeObj.navigateToPreviousForm();
            }
            if (response[0].shortErrorCode !== 0) {
                RDNAUtility.hideLoadingScreen();
                kony.print("RDNA Issue : " + RDNAUtility.getErrorMessage(response[0]));
                kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_ERROR,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": response.error.errorString,
                    "alertHandler": SHOW_ALERT_Callback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
            }
        },
    onIDVCheckUserBiometricTemplateStatus: function(response){
       const scopeObj = this;
       RDNAUtility.hideLoadingScreen();
       function SHOW_ALERT_Callback() {
                //scopeObj.view.tbxUsername.text = "";
                // form.rdnaObj.resetAuthState();
        scopeObj.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = 0;
        scopeObj.biometricEnabled=0;
           //TODO In this case server does not support the Server side biometric
        var navManager = applicationManager.getNavigationManager(); 
        navManager.navigateTo({"appName":"HomepageMA","friendlyName" : "AccountsUIModule/frmUnifiedDashboard"}); 
        applicationManager.getPresentationUtility().dismissLoadingScreen();
            }
      if(response.error.longErrorCode===0){ 
         if(response.status.statusCode===100)
         {//Template already available(100)
         scopeObj.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = 0;
         scopeObj.biometricEnabled=0;
         }
         else{
          //Template is not available
        scopeObj.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = 1;
        scopeObj.biometricEnabled=1;
        }
      }
       else{
        kony.print("RDNA Issue : " + RDNAUtility.getErrorMessage(response.error));
                kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_ERROR,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": response.error.errorString,
                    "alertHandler": SHOW_ALERT_Callback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
      }
    },
    onIDVBiometricOptOutStatus: function(response){
        var scopeObj = this;
        function SHOW_ALERT_Callback() {
        }
        if (response.error.longErrorCode === 0) {
                    if (response.status.statusCode === 100) {
      //Template deleted successfuly
                        scopeObj.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = 1;
                        scopeObj.biometricEnabled=1;
                        scopeObj.view.flxPasswordPopup.setVisibility(false);
                        }else if(response.status.statusCode === 102){
                            scopeObj.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = scopeObj.biometricEnabled;
                            scopeObj.view.flxPasswordPopup.setVisibility(false);
                            scopeObj.view.flxSignInDeniedPopup.setVisibility(true);
                            scopeObj.view.lblSignInDeclined.text = "Failed Authentication";
                            scopeObj.view.lblSignInDeclineDescription.text = "You entered the wrong Password";
                        }
                        }
                        else{
                            kony.print("RDNA Issue : " + RDNAUtility.getErrorMessage(response.error));
                            kony.ui.Alert({
                                "alertType": constants.ALERT_TYPE_ERROR,
                                "alertTitle": null,
                                "yesLabel": null,
                                "noLabel": null,
                                "alertIcon": null,
                                "message": response.error.errorString,
                                "alertHandler": SHOW_ALERT_Callback
                            }, {
                                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                            });
                        }
        },
	slideSuccessNavigate: function() {
        var scopeObj = this;
        scopeObj.view.flxMainContainer.flxEnableBiometric.flxSwitchOption.Switchoption.selectedIndex = scopeObj.biometricEnabled;
        if (scopeObj.biometricEnabled === 0) {
            scopeObj.handleSynErrorResponse(RDNAAPI.initiateIDVBiometricOptOut());
        }
        else{
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({"appName": "SelfServiceEnrolmentMA","friendlyName": "EnrollUnikenUIModule/frmBioAppScreenUniken"});
        }
    },
    actionSetUserConsentForLDA: function(userConsent, challengeMode, authenticationType) {
            RDNAUtility.showLoadingScreen();
            this.handleSynErrorResponse(RDNAAPI.setUserConsentForLDA(userConsent, challengeMode, authenticationType));
        },

});