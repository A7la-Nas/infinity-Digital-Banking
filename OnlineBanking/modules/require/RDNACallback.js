define(function () {
    return {
        relidCallbacks: function (callbackName, response) {
            //kony.application.dismissLoadingScreen();
            skipDismissLoadingCBs = ["onTOTPRegistrationStatus",

                "onUserLoggedIn",

                "onCredentialsAvailableForUpdate"]
            if (skipDismissLoadingCBs.includes(callbackName) == false) {

                kony.application.dismissLoadingScreen();

            }
            try {
                response = JSON.parse(response);
            } catch (err) {
                kony.logger.appLogger.error(err);
            }
            switch (callbackName) {
                case "onInitializeProgress":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("frmLoginUnikenController").handleOnInitializeProgress(responseObj);
                        }, [response]);
                        RDNAUtility.getSession().isUserLoggedIn = false;
                        break;
                    }
                case "onUserConsentThreats":
                    {
                        alert("Uniken : OnUserconsentThreats Triggering");
                        kony.runOnMainThread(function (responseObj) {
                            //Controllers.get("frmLoginController").handleUserConsentThreads(responseObj);
                            var ApplicationManager = require('ApplicationManager');
                            applicationManager = ApplicationManager.getApplicationManager();
                            applicationManager.handleUserConsentThreads(responseObj);
                        }, [response]);
                        break;
                    }
                case "onTerminateWithThreats":
                    {
                        alert("Uniken : onTerminateWithThreats Triggering");
                        kony.runOnMainThread(function (responseObj) {
                            // Controllers.get("frmLoginController").handleTerminatesThreads(responseObj);
                            var ApplicationManager = require('ApplicationManager');
                            applicationManager = ApplicationManager.getApplicationManager();
                            applicationManager.handleTerminatesThreads(responseObj);
                        }, [response]);
                        break;
                    }
                case "onInitializeError":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("frmLoginUnikenController").handleOnInitializeError(responseObj);
                        }, [response]);
                        RDNAUtility.getSession().isUserLoggedIn = false;
                        break;
                    }
                case "onInitialized":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("frmLoginUnikenController").handleOnInitialized(responseObj);
                        }, [response]);
                        RDNAUtility.getSession().isUserLoggedIn = false;
                        break;
                    }
                case "getUser":
                    {
                        RDNAUtility.getSession().isUserLoggedIn = false;
                        var currentForm = kony.application.getCurrentForm().id;
                        if (currentForm === "frmLoginUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                if (Controllers.get("loginControllerComponent")) Controllers.get("loginControllerComponent").handleGetUser(responseObj);
                            }, [response]);
                        } else if (currentForm === "frmEnrollActivateProfileUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                if (Controllers.get("activateProfileController")) Controllers.get("activateProfileController").handleGetUser(responseObj);
                            }, [response]);
                        }
                        //                        kony.runOnMainThread(function(responseObj) {
                        //                            var welComeForm = new kony.mvc.Navigation("WelCome");
                        //                            welComeForm.navigate(responseObj);
                        //                        }, [response]);
                        break;
                    }
                case "getActivationCode":
                    {
                        var currentForm = kony.application.getCurrentForm().id;
                        if (currentForm === "frmEnrollActivateProfileUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("activateProfileController").handleGetActivationCode(responseObj);
                            }, [response]);
                        } else {
                            RDNAAPI.resetAuthState();
                            alert("You are performing user activation, kindly navigate to Activation screen by clicking Enroll button.");
                        }
                        break;
                    }
                case "getUserConsentForLDA":
                    {
                        //                        kony.runOnMainThread(function(responseObj) {
                        //                            var ldaUserConsentForm = new kony.mvc.Navigation("LDAUserConsent");
                        //                            ldaUserConsentForm.navigate(responseObj);
                        //                        }, [response]);
                        var currentForm = kony.application.getCurrentForm().id;
                        if (currentForm === "frmEnrollActivateProfileUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("activateProfileController").handleOnUserConsentLDA(responseObj);
                            }, [response]);
                        } else if (currentForm === "frmBioToggle") {
                            if (scopeObj.view.flxMainContainer.flxEnableBiometric.Switchoption.selectedIndex = 1) {
                                kony.runOnMainThread(function (responseObj) {
                                    Controllers.get("frmBioToggleController").handleOnUserConsentLDA(responseObj);
                                }, [response]);
                            }
                            RDNAAPI.resetAuthState();
                            alert("You are performing user activation, kindly navigate to Activation screen by clicking Enroll button.");
                        } else if (currentForm === "frmLDAToggleUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("frmLDAToggleUnikenController").handleOnUserConsentLDA(responseObj);
                            }, [response]);
                        }
                        break;
                    }
                case "getPassword":
                    {
                        /*RDNA_CHALLENGE_OP_VERIFY = 0,
                         RDNA_CHALLENGE_OP_SET = 1,
                         RDNA_OP_UPDATE_CREDENTIALS = 2,
                         RDNA_OP_AUTHORIZE_NOTIFICATION = 3,
                         RDNA_OP_UPDATE_ON_EXPIRY = 4,
                         RDNA_AUTHORIZE_LDA_MANAGEMENT = 5,
                         RDNA_IDV_BIO_OPT_IN = 6,
                         RDNA_IDV_BIO_OPT_OUT = 7,
                         RDNA_OP_STEP_UP_AUTH_AND_SIGN_DATA = 12,
                         */
                        var currentForm = kony.application.getCurrentForm().id;
                        if (response.challengeMode === 7) {
                            //password verify for idv biometric opt out 
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("frmBioToggleUnikenController").getPassword(responseObj);
                            }, [response]);
                        } else if (response.challengeMode === 12) {
                            kony.runOnMainThread(function (responseObj) {
                                if (Controllers.get("SCAComponentController")) Controllers.get("SCAComponentController").getPassword(responseObj);
                            }, [response]);
                            break;
                        } else if (response.challengeMode === 6) {
                            //password verify for idv biometric opt in
                            kony.print("Uniken : BiometricoptIn GetPasswordCallback")
                            if (currentForm === "frmBioAppScreenUniken") {
                                kony.runOnMainThread(function (responseObj) {
                                    Controllers.get("frmBioAppScreenController").getPassword(responseObj);
                                }, [response]);
                            }
                        } else if (response.challengeMode === 5) {
                            //password verify for LDA managemet
                            //RDNA_AUTHORIZE_LDA_MANAGEMENT
                            if (currentForm === "frmLDAToggleUniken") {
                                kony.runOnMainThread(function (responseObj) {
                                    Controllers.get("frmLDAToggleUnikenController").getPassword(responseObj);
                                }, [response]);
                            }
                        } else if (response.challengeMode === 4) {
                            //set password when expired
                            kony.runOnMainThread(function (responseObj) {
                                var updateExpiredPasswordForm = new kony.mvc.Navigation("UpdateExpiredPassword");
                                updateExpiredPasswordForm.navigate(responseObj);
                            }, [response]);
                        } else if (response.challengeMode === 3) {
                            //verify password on take action on authorized notification
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("scasdkController").getPassword(responseObj);
                            }, [response]);
                        } else if (response.challengeMode === 2) {
                            //Update password
                            kony.runOnMainThread(function (responseObj) {
                                //                                 var updatePasswordForm = new kony.mvc.Navigation("UpdatePassword");
                                //                                 updatePasswordForm.navigate(responseObj);
                                if (currentForm === "frmSettings") {
                                    if (Controllers.get("frmSettingsController")) Controllers.get("frmSettingsController").updatePassword(responseObj);
                                } else if (currentForm === "frmProfileChangeAndUpdatePasswordUniken") {
                                    if (Controllers.get("UpdatePasswordController")) Controllers.get("UpdatePasswordController").onUpdateCredentialResponse(responseObj);
                                }
                            }, [response]);
                        } else if (response.challengeMode === 1) {
                            //set password
                            if (currentForm === "frmEnrollActivateProfileUniken") {
                                kony.runOnMainThread(function (responseObj) {
                                    Controllers.get("activateProfileController").handleGetPassword(responseObj);
                                }, [response]);
                            }
                        } else if (response.challengeMode === 0) {
                            //password verification
                            if (currentForm === "frmLoginUniken") {
                                kony.runOnMainThread(function (responseObj) {
                                    Controllers.get("loginControllerComponent").handleGetPassword(responseObj);
                                }, [response]);
                            }
                            //set password for additional device activation
                            else if (currentForm === "frmEnrollActivateProfileUniken") {
                                kony.runOnMainThread(function (responseObj) {
                                    Controllers.get("activateProfileController").handleGetPassword(responseObj);
                                }, [response]);
                            }
                        } else if (response.challengeMode === 14) {
                            //set password
                            if (currentForm === "frmLDAToggleUniken") {
                                kony.runOnMainThread(function (responseObj) {
                                    Controllers.get("frmLDAToggleUnikenController").handleSetPassword(responseObj);
                                }, [response]);
                            }
                        } else if (response.challengeMode === 15) {
                            //set password
                            if (currentForm === "frmLDAToggleUniken") {
                                kony.runOnMainThread(function (responseObj) {
                                    Controllers.get("frmLDAToggleUnikenController").handleConfirmPassword(responseObj);
                                }, [response]);
                            }
                        }
                        break;
                    }
                case "getLoginId":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            var setLoginIDForm = new kony.mvc.Navigation("SetLoginID");
                            setLoginIDForm.navigate(responseObj);
                        }, [response]);
                        break;
                    }
                case "onLoginIdUpdateStatus":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("SetLoginIDController").onLoginIdUpdateStatus(responseObj);
                        }, [response]);
                        break;
                    }
                case "onUserLoggedIn":
                    {
                        RDNAUtility.getSession().isUserLoggedIn = true;
                        RDNAUtility.getSession().userId = response.userID;
                        kony.print("Uniken : IsUserLoggedin = " + RDNAUtility.getSession().isUserLoggedIn);
                        kony.print("Uniken : userId = " + RDNAUtility.getSession().userId);
                        var currentForm = kony.application.getCurrentForm().id;
                        if (response.challengeResponse.additionalInfo.currentWorkFlow == "FirstTimeUserActivation") {
                            if (currentForm === "frmEnrollActivateProfileUniken") {
                                kony.runOnMainThread(function (responseObj) {
                                    Controllers.get("activateProfileController").handleOnUserLoggedIn(responseObj);
                                }, [response]);
                            } else {
                                alert("REL-ID Login Successfull, But from different flow kindly relaunch the application and relogin again.");
                            }
                        } else if (response.challengeResponse.additionalInfo.currentWorkFlow == "NormalLogin") {
                            if (currentForm === "frmLoginUniken") {
                                kony.runOnMainThread(function (responseObj) {
                                    Controllers.get("loginControllerComponent").handleOnUserLoggedIn(responseObj);
                                }, [response]);
                            } else if (currentForm === "frmEnrollActivateProfileUniken") {
                                kony.runOnMainThread(function (responseObj) {
                                    alert("Already Activated, Kindly try login or Please contact Admin");
                                    Controllers.get("activateProfileController").handleOnActiveUserLoggedIn(responseObj);
                                }, [response]);
                            } else {
                                alert("REL-ID Login Successfull, But from different flow kindly relaunch the application and relogin again.");

                            }
                        } else if (response.challengeResponse.additionalInfo.currentWorkFlow == "AdditionalDeviceActivation") {
                            if (currentForm === "frmEnrollActivateProfileUniken") {
                                kony.runOnMainThread(function (responseObj) {
                                    Controllers.get("activateProfileController").handleOnActiveUserLoggedIn(responseObj);
                                }, [response]);
                            } else {
                                alert("REL-ID Login Successfull, But from different flow kindly relaunch the application and relogin again.");
                            }
                        } else if (response.challengeResponse.additionalInfo.currentWorkFlow == "ForgotCredentials") {
                            if (currentForm === "frmEnrollActivateProfileUniken") {
                                kony.runOnMainThread(function (responseObj) {
                                    Controllers.get("activateProfileController").handleOnActiveUserLoggedIn(responseObj);
                                }, [response]);
                            } else {
                                alert("Something went wrong, Please try again");
                            }

                        }
                        break;
                    }
                case "onCredentialsAvailableForUpdate":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            if (Controllers.get("frmSettingsController")) Controllers.get("frmSettingsController").onCredentialsAvailableForUpdate(responseObj);
                        }, [response]);
                        break;
                    }
                case "addNewDeviceOptions":
                    {
                        var currentForm = kony.application.getCurrentForm().id;
                        if (currentForm === "frmEnrollActivateProfileUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("activateProfileController").handleAddNewDeviceOptions(responseObj);
                            }, [response]);
                        } else {
                            RDNAAPI.resetAuthState();
                            alert("You are performing additional device activation, kindly navigate to Activation screen by clicking Enroll button.");
                        }
                        break;
                    }
                case "getAccessCode":
                    {
                        var currentForm = kony.application.getCurrentForm().id;
                        if (currentForm === "frmEnrollActivateProfileUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("activateProfileController").handleGetActivationCode(responseObj);
                            }, [response]);
                        } else {
                            RDNAAPI.resetAuthState();
                            alert("You are performing additional device activation, kindly navigate to Activation screen by clicking Enroll button.");
                        }
                        break;
                    }
                case "onHandleCustomChallenge":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            var customChlngForm = new kony.mvc.Navigation("CustomChnlg");
                            customChlngForm.navigate(responseObj);
                        }, [response]);
                        break;
                    }
                case "onAuthenticateUserAndSignData":
                    {
                        var currentForm = kony.application.getCurrentForm().id;
                        if (currentForm === "frmEuropeVerifyTransferDetails" || currentForm === "frmProfileEnterEmailID") {
                            kony.runOnMainThread(function (responseObj) {
                                if (Controllers.get("SCAComponentController")) Controllers.get("SCAComponentController").scafunction(responseObj);
                            }, [response]);
                        } else if (currentForm === "frmDeviceManagement" || currentForm === "frmDeviceManagementUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                if (Controllers.get("DeviceManagementController")) Controllers.get("DeviceManagementController").authenticateUserDataCB(responseObj);
                            }, [response]);
                        }
                        break;
                    }
                case "onUpdateCredentialResponse":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            if (kony.application.getCurrentForm().id === "UpdateExpiredPassword") {
                                Controllers.get("UpdateExpiredPasswordController").onUpdateCredentialResponse(responseObj);
                            } else if (kony.application.getCurrentForm().id === "frmProfileChangeAndUpdatePasswordUniken") {
                                Controllers.get("UpdatePasswordController").onUpdateCredentialResponse(responseObj);
                            }
                        }, [response]);
                        break;
                    }
                case "onGetNotifications":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("securityNotificationController").onGetNotifications(responseObj);
                        }, [response]);
                        break;
                    }
                case "onGetNotificationsHistory":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("NotificationHistoryController").onGetNotificationsHistory(responseObj);
                        }, [response]);
                        break;
                    }
                case "onGetRegistredDeviceDetails":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("DeviceManagementController").getDevicesSuccessCallback(responseObj);
                        }, [response]);
                        break;
                    }
                case "onUpdateDeviceDetails":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("DeviceManagementController").revokeDeviceSuccessCallback(responseObj);
                        }, [response]);
                        break;
                    }
                case "onHttpResponse":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("SelfRegisterController").onHttpResponseHandle(responseObj);
                        }, [response]);
                        break;
                    }
                case "onUpdateNotification":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("scasdkController").onUpdateNotificationHandle(responseObj);
                        }, [response]);
                        break;
                    }
                case "onSessionTimeout":
                    {
                        RDNAUtility.getSession().isUserLoggedIn = false;
                        /* kony.runOnMainThread(function(responseObj) {
                            //                            Controllers.get("frmLoginController").handleOnSessionTimeout(responseObj);
                            var toast = new kony.ui.Toast({
                                "text": responseObj,
                                "duration": constants.TOAST_LENGTH_LONG
                            });
                            toast.show();
                            // Navigate to frmLogin..
                            var ApplicationManager = require('ApplicationManager');
                            var applicationManager = ApplicationManager.getApplicationManager();
                            var navManager = applicationManager.getNavigationManager();
                            navManager.clearStack();
                            new kony.mvc.Navigation({
                                "appName": "AuthenticationMA",
                                "friendlyName": "frmLoginUniken"
                            }).navigate();
                        }, [response]); */
                        var currentForm = kony.application.getCurrentForm().id;
                        if (currentForm === "frmEnrollActivateProfileUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("activateProfileController").handleAddNewDeviceReject(responseObj);
                            }, [response]);
                        }
                        else {
                            RDNAUtility.setErrorMessageAndLogout("Session Timed out");
                        }
                        break;
                    }
                case "onUserLoggedOff":
                    {
                        RDNAUtility.getSession().isUserLoggedIn = false;
                        var currentForm = kony.application.getCurrentForm().id;
                        if (currentForm === "frmEnrollActivateProfileUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("activateProfileController").handleOnUserLoggedOff(responseObj);
                            }, [response]);
                        } else {
                            kony.print("OnUserLoggedOff but user is not in ActivationProfile Screen");
                        }
                        break;
                    }
                case "onTerminate":
                    {
                        RDNAUtility.getSession().isUserLoggedIn = false;
                        var currentForm = kony.application.getCurrentForm().id;
                        if (currentForm === "frmEnrollActivateProfileUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("activateProfileController").handleOnTerminate(responseObj);
                            }, [response]);
                        } else {
                            alert("onTerminate but user is not in ActivationProfile Screen");
                        }
                        break;
                    }
                case "onDeviceAuthManagementStatus":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("frmLDAToggleUnikenController").onDeviceAuthManagementStatus(responseObj);
                        }, [response]);
                        break;
                    }
                case "onForgotLoginIDStatus":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("ForgetLoginIDController").onForgotLoginIDStatus(responseObj);
                        }, [response]);
                        break;
                    }
                //IDV Implementation
                case "getIDVDocumentScanProcessStartConfirmation":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            var idvPrepareScanForm = new kony.mvc.Navigation("IDVPrepaireScan");
                            idvPrepareScanForm.navigate(responseObj);
                        }, [response]);
                        break;
                    }
                case "getIDVConfirmDocumentDetails":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            var idvDocScanConfirmForm = new kony.mvc.Navigation("IDVDocScanConfirm");
                            idvDocScanConfirmForm.navigate(responseObj);
                        }, [response]);
                        break;
                    }
                case "getIDVSelfieProcessStartConfirmation":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            //                            var idvPrepareScanForm = new kony.mvc.Navigation("IDVPrepaireScan");
                            //                            idvPrepareScanForm.navigate(responseObj);
                            //TODO: Navigate to Biometric consent screen..
                            var ApplicationManager = require('ApplicationManager');
                            applicationManager = ApplicationManager.getApplicationManager();
                            applicationManager.getPresentationUtility().showLoadingScreen();
                            RDNAAPI.setIDVSelfieProcessStartConfirmation(true, false, responseObj.idvWorkflow);
                        }, [response]);
                        break;
                    }
                case "getIDVSelfieConfirmation":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            var idvSelfiScanConfirmForm = new kony.mvc.Navigation("IDVSelfiScanConfirm");
                            idvSelfiScanConfirmForm.navigate(responseObj);
                        }, [response]);
                        break;
                    }
                case "getIDVBiometricOptInConsent":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            var idvBiometricOptInConsentForm = new kony.mvc.Navigation("IDVBiometricOptInConsent");
                            idvBiometricOptInConsentForm.navigate(responseObj);
                        }, [response]);
                        break;
                    }
                case "onIDVCheckUserBiometricTemplateStatus":
                    {
                        var currentForm = kony.application.getCurrentForm().id;
                        if (currentForm === "frmBioToggleUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("frmBioToggleUnikenController").onIDVCheckUserBiometricTemplateStatus(responseObj);
                            }, [response]);
                        } else {
                            kony.print("user is not choosen selfie capture Screen");
                        }
                        break;
                    }
                case "onIDVServerBiometricAuthenticationResult":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("IDVFundTransferController").onIDVServerBiometricAuthenticationResult(responseObj);
                        }, [response]);
                        break;
                    }
                case "onIDVBiometricOptOutStatus":
                    {
                        var currentForm = kony.application.getCurrentForm().id;
                        if (currentForm === "frmBioToggleUniken") {
                            kony.runOnMainThread(function (response) {
                                Controllers.get("frmBioToggleUnikenController").onIDVBiometricOptOutStatus(response);
                            }, [response]);
                        } else {
                            kony.print("user is not choosen selfie capture Screen");
                        }
                        break;
                    }
                case "onIDVBiometricOptInStatus":
                    {
                        var currentForm = kony.application.getCurrentForm().id;
                        if (currentForm === "frmBiometricApprovalUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("frmBiometricApprovalController").onIDVBiometricOptInStatus(responseObj);
                            }, [response]);
                        } else if (currentForm === "frmBioAppScreenUniken") {
                            kony.runOnMainThread(function (responseObj) {
                                Controllers.get("frmBioAppScreenController").getPassword(responseObj);
                            }, [response]);
                        } else {
                            kony.print("user is not choosen selfie capture Screen");
                        }
                        break;
                    }
                case "onIDVOptInCapturedFrameConfirmation":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            //Controllers.get("frmBioAppScreenController").onIDVOptInCapturedFrameConfirmation(responseObj);
                            kony.print("Uniken : The responsecall of onIDVOptInCapturedFrameConfirmation :  " + responseObj);
                            var ApplicationManager = require('ApplicationManager');
                            var applicationManager = ApplicationManager.getApplicationManager();
                            var navManager = applicationManager.getNavigationManager();
                            navManager.setCustomInfo("frmBiometricApprovalUniken", responseObj);
                            new kony.mvc.Navigation({
                                "appName": "SelfServiceEnrolmentMA",
                                "friendlyName": "frmBiometricApprovalUniken"
                            }).navigate();
                        }, [response]);
                        break;
                    }
                case "onIDVAdditionalDocumentScan":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            var idvPrepareScanForm = new kony.mvc.Navigation("IDVPrepaireScan");
                            idvPrepareScanForm.navigate(responseObj);
                        }, [response]);
                        break;
                    }
                case "onIDVActivatedCustomerKYCResponse":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            var idvPrepareScanForm = new kony.mvc.Navigation("IDVPrepaireScan");
                            idvPrepareScanForm.navigate(responseObj);
                        }, [response]);
                        break;
                    }
                case "onIDVAgentKYCResponse":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            var idvPrepareScanForm = new kony.mvc.Navigation("IDVPrepaireScan");
                            idvPrepareScanForm.navigate(responseObj);
                        }, [response]);
                        break;
                    }
                case "onTOTPGenerated":
                    {
                        kony.runOnMainThread(function (responseObj) {
                            Controllers.get("frmPasscodeController").onTOTPGenerated(responseObj);
                        }, [response]);
                        break;
                    }
                default:
                    kony.logger.appLogger.debug(callbackName + " callback is not handled");
                //onConfigReceived
                //onSdkLogPrintRequest
                //activateUserOptions
                //onTOTPRegistrationStatus
                //onAccessTokenRefreshed
            }
        },
    };
});