define({
    
	//  timerCounter:0,
    init: function() {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    faceIdPreShow: function() {
        //     this.view.btnEnable.setVisibility(false);
        //     this.view.flxBottomContainer.setVisibility(true);
        //     this.view.flxSeperator.setVisibility(true);
        this.view.customHeader.btnRight.setVisibility(true);
        this.view.TextFaceId.setEnabled(false);
        //this.view.flxHeader.isVisible = false;
        this.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(false);
        this.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(false);
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    btnSkipOnClick: function() {
        var ApplicationManager = require('ApplicationManager');
        var applicationManager = ApplicationManager.getApplicationManager();
        var navManager = applicationManager.getNavigationManager();
        var isUserLoggedin = applicationManager.getUserPreferencesManager().isUserLoggedin();

        if (!isUserLoggedin) {
            var userId =  RDNAUtility.getUserId();
            RDNAAPI.logOff(userId);
            new kony.mvc.Navigation({
                "appName": "AuthenticationMA",
                "friendlyName": "frmLoginUniken"
            }).navigate();
        }
        else {
            new kony.mvc.Navigation({
                "appName": "SelfServiceEnrolmentMA",
                "friendlyName": "frmBioToggleUniken"
            }).navigate();
        }
    },
    imgbackAction: function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
    preshow: function() {
        var scopeObj = this;
        Controllers.set("frmBioAppScreenController", this);
        scopeObj.createInputpromptpopup();
    },
    postShow: function() {
        this.setFlowActions();
        this.view.customHeader.lblLocateUs.contentAlignment = constants.CONTENT_ALIGN_CENTER;
    },
    setFlowActions: function() {
        const scopeObj = this;
        Controllers.set("frmBioAppScreenController", this);
        this.view.btnClose.onClick = function() {
        scopeObj.view.flxSignInDeniedPopup.setVisibility(false);
        scopeObj.view.setVisibility(false);
      };
        this.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.onTextChange = function(){
            if(scopeObj.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== '' && scopeObj.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text !== null){
                scopeObj.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(true);
                scopeObj.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(true);
            }
            else{
                scopeObj.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(false);
                scopeObj.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(false);
            }
        };
        this.view.flxMainContainer.flxProceed.btnContinue.onClick = function() {
        RDNAUtility.showLoadingScreen();
        scopeObj.handleSynErrorResponse(RDNAAPI.initiateIDVBiometricOptIn());
        };
    },
    handleSynErrorResponse: function(response) {
        var current = this;

        function SHOW_ALERT_Callback() {
            //current.onDeviceBack();
            //TODO we have to navigate back to Activation success screen
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
            current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text ="";
            current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(false);
            current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(false);
            function SHOW_ALERT_Callback() {
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
            } else {
                current.view.flxPasswordPopup.setVisibility(false);
            }
        },
     
    onIDVOptInCapturedFrameConfirmation: function(response) {
        kony.print("Uniken : The captured confirmation of IDV  :  "+JSON.stringify(response))
        new kony.mvc.Navigation({
            "appName": "SelfServiceEnrolmentMA",
            "friendlyName": "frmBiometricApprovalUniken"
        }).navigate(response);
        //this.view.imgFrame.base64 = response;
    },
    getPassword: function(response) {
            var current = this;
            //this.view.lblAttemptsLeft.text = "AttemptsLeft: " + this.response.attemptsLeft;
            function SHOW_ALERT_Status_Callback() {
                //form.rdnaObj.resetAuthState();
                //current.showPrompt();
            }
            if (response.error.shortErrorCode === 0) {
                response.challengeResponse=response.challengeResponse?response.challengeResponse:response;
                if (response.challengeResponse.status.statusCode === 0 || response.challengeResponse.status.statusCode === 100) {
                    //this.showPrompt();
                    current.view.flxPasswordPopup.setVisibility(true);
                    current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.onClick = function() {
                        RDNAUtility.showLoadingScreen();
                        kony.print("Uniken : " + current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text);
                        var pwdVerifyText = current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text;
                        current.handleSynErrorSetPasswordResponse(RDNAAPI.verifyPassword(pwdVerifyText, response.challengeMode));
                    }
                    current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.onClick = function() {
                        RDNAUtility.showLoadingScreen();
                        current.view.flxPasswordPopup.flxPasswordPopupInner.FlxContainerPhoneRounded.txtPhoneRounded.text ="";
                        current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionYes.setEnabled(false);
                        current.view.flxPasswordPopup.flxPasswordPopupInner.flxpwdDecision.pwdbtnDecisionNo.setEnabled(false);
                        current.view.flxPasswordPopup.setVisibility(false);
                        RDNAUtility.hideLoadingScreen();
                        current.handleSynErrorResponse(RDNAAPI.resetAuthenticateUserAndSignDataState());
                        current.view.flxSignInDeniedPopup.flxSignInDeniedPopupInner.lblSignInDeclined.text="Request denied";
                        current.view.flxSignInDeniedPopup.flxSignInDeniedPopupInner.lblSignInDeclineDescription.text = "You have denied the request";
                        current.view.flxSignInDeniedPopup.setVisibility(true);
                    }
                } else if(response.challengeResponse.status.statusCode === 102){
                            current.view.flxPasswordPopup.setVisibility(false);
                            current.view.flxSignInDeniedPopup.setVisibility(true);
                            current.view.lblSignInDeclined.text = "Failed Authentication";
                            current.view.lblSignInDeclineDescription.text = "You entered the wrong Password";
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
            }  else if(response.error.shortErrorCode === 146 || response.error.shortErrorCode === 184) { //cancelled by user
                current.imgbackAction();
            }  else {
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
        showPrompt: function() {
                this.view.inputpromptpopup.text = "";
                kony.runOnMainThread(this.promptVisible, [true]);
                this.view.inputpromptpopup.onLeftButtonClick = this.hidePrompt;
                this.view.inputpromptpopup.onRightButtonClick = this.successPrompt;
            },
            hidePrompt: function() {
                kony.runOnMainThread(this.promptVisible, [false]);
                this.promptCancelCallback(this.rdnaObj);
            },
            promptVisible: function(isVisible) {
                this.view.inputpromptpopup.setVisibility(isVisible);
            },
            successPrompt: function(e) {
                var scopeObj = this;
                kony.runOnMainThread(this.promptVisible, [false]);
                RDNAUtility.showLoadingScreen();
                scopeObj.handleSynErrorResponse(RDNAAPI.verifyPassword(e.comment, 6));
            },
            createInputpromptpopup: function() {
                var inputpromptpopup = new com.konymp.inputpromptpopup({
                    "clipBounds": "true",
                    "height": "100%",
                    "id": "inputpromptpopup",
                    "isVisible": false,
                    "layoutType": kony.flex.FREE_FORM,
                    "left": "0dp",
                    "masterType": constants.MASTER_TYPE_USERWIDGET,
                    "skin": "slFbox",
                    "top": "0dp",
                    "width": "100%"
                }, {}, {});
                inputpromptpopup.placeholderText = "Enter the password";
                inputpromptpopup.leftButtonText = "Cancel";
                inputpromptpopup.rightButtonText = "OK";
                inputpromptpopup.messageText = "Enter the password";
                inputpromptpopup.maxTextLength = 40;
                this.view.add(inputpromptpopup);
            },
});
