define({
	response: null,
    init: function() {
        /*var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);*/
    },
    touchIdpreShow: function() {
        var scopeObj = this;
        Controllers.set("frmBiometricApprovalController", this);
        this.view.flxMainContainer.btnCancel.setVisibility(true);
        this.view.flxMainContainer.btnApprove.setVisibility(true);
        this.view.flxMainContainer.btnRecapture.setVisibility(true);
        /*if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
            this.view.lblTouchIdSubTitle.text = kony.i18n.getLocalizedString("kony.mb.preferences.UseDeviceBiometrics");
            this.view.lblTouchId.text = kony.i18n.getLocalizedString("kony.mb.devReg.Biometric");
        } else {
            this.view.flxHeader.isVisible = false;
            this.view.lblTouchIdSubTitle.text = kony.i18n.getLocalizedString("kony.mb.devReg.touchIdMsg");
            this.view.lblTouchId.text = kony.i18n.getLocalizedString("kony.mb.devReg.touchidTitle");
        }
        this.view.btnEnable.onClick = this.goToDefaultLogin;*/

        this.view.customHeader.flxBack.onClick = function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.goBack();
        };
        var ApplicationManager = require('ApplicationManager');
        var applicationManager = ApplicationManager.getApplicationManager();
        var navManager = applicationManager.getNavigationManager();
        var responseImgData = navManager.getCustomInfo("frmBiometricApprovalUniken");
        kony.print("Uniken : preshow of frmBiometricApproval : "+responseImgData)
        scopeObj.view.flxMainContainer.flxImage.imgId.base64 = responseImgData;
    },
    goToDefaultLogin: function() {
        /*var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "AuthUIModule",
            "appName": "AuthenticationMA"
        });
        authMod.presentationController.setBiometricCredentials();
        var navManager = applicationManager.getNavigationManager();
        authMod.presentationController.setTouchIdflag(true);
        authMod.presentationController.setDefaultMode("touchid");
        var data = {
            loginMode: "touchid"
        };
        navManager.setCustomInfo("frmDefaultLogin", data);
        authMod.presentationController.commonFunctionForNavigation("frmDefaultLogin");*/
    },
    postshow: function() {
        this.setFlowActions();
        this.view.customHeader.lblLocateUs.contentAlignment = constants.CONTENT_ALIGN_CENTER;
    },
    setFlowActions: function() {
        const scopeObj = this;
        this.view.flxMainContainer.btnApprove.onClick = function() {
            scopeObj.actionApprove();
        };
        this.view.flxMainContainer.btnRecapture.onClick = function() {
            scopeObj.actionRecapture();
        };
        this.view.flxMainContainer.btnCancel.onClick = function() {
            scopeObj.actionCancel();
        };
        this.view.flxSuccess.btnDone.onClick = function() {
                if (scopeObj.navigateToLogin) {
                    scopeObj.navigateToLogin();
                }
            };
        this.view.flxFaceIdApprovedPopup.flxFaceIdApprovedPopupInner.btnDone0.onClick = function(){
            if (scopeObj.navigateToToggle) {
                    scopeObj.navigateToToggle();
                }
        };   
    },
    onNavigationcall: function(contextValue) {
//        alert(contextValue);
//        this.response = contextValue;
//        kony.print("Uniken => The Value of NavigationCall : " + this.response);
        //this.view.flxMainContainer.flxImage.imgId.base64 = this.response;
    },
    skipAction: function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "AuthUIModule",
            "appName": "AuthenticationMA"
        });
        authMode.presentationController.defaultLoginToAccounts();
    },
    //Uniken SDK Implementation call...
    actionApprove: function() {
            RDNAUtility.showLoadingScreen();
            this.handleSynErrorResponse(RDNAAPI.setIDVBiometricOptInConfirmation(0));
    },
    actionRecapture: function() {
        RDNAUtility.showLoadingScreen();
        this.handleSynErrorResponse(RDNAAPI.setIDVBiometricOptInConfirmation(1));
    },
    actionCancel: function() {
        RDNAUtility.showLoadingScreen();
        this.handleSynErrorResponse(RDNAAPI.setIDVBiometricOptInConfirmation(2));
    },
   imgbackAction: function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
    onIDVBiometricOptInStatus: function(response) {
            this.response = response;
            var current = this;
             var scopeObj = this;
            kony.print("Uniken : the onIDVBiometricOptInStatus frmBiometricApporval response : "+response)
            function SHOW_ALERT_SuccessCallback() {
                //current.onDeviceBack();
                current.navigateToScreen();

            }
           function SHOW_ALERT_FailureCallback() {
                //current.onDeviceBack();
                current.setFlowActions();

            }
            function SHOW_ALERT_ErrorCallback() {
                //current.onDeviceBack();
                current.setFlowActions();

            }
            if (this.response.error.shortErrorCode === 0) {
              if(this.response.status.statusCode=== 100){
                current.navigateToScreen();
              }
             else{
               kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_INFO,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": this.response.status.statusMessage,
                    "alertHandler": SHOW_ALERT_FailureCallback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
             }   
            } else if(this.response.error.shortErrorCode === 146) { //cancelled by user
                current.imgbackAction();
            } else {
                kony.ui.Alert({
                    "alertType": constants.ALERT_TYPE_ERROR,
                    "alertTitle": null,
                    "yesLabel": null,
                    "noLabel": null,
                    "alertIcon": null,
                    "message": RDNAUtility.getErrorMessage(this.response.error),
                    "alertHandler": SHOW_ALERT_ErrorCallback
                }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                });
            }
        },
 
         onIDVOptInCapturedFrameConfirmation:function(response){
            this.view.flxMainContainer.flxImage.imgId.base64 = response;
          },
        handleSynErrorResponse: function(response) {
                var current = this;
                kony.print("Uniken : the handlesync frmBiometricApporval response : "+response);
                function SHOW_ALERT_Callback() {
                    //current.onDeviceBack();
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

	    navigateToScreen: function() {
            //prelogin success flex
            var ApplicationManager = require('ApplicationManager');
            var applicationManager = ApplicationManager.getApplicationManager();
            var userPrefManager = applicationManager.getUserPreferencesManager();
            if (userPrefManager.isLoggedIn !== true) {
                this.view.flxSuccess.setVisibility(true);
                this.view.btnDone.skin = "sknBtn0095e4RoundedffffffSSP26px";
                this.view.flxMainContainer.btnCancel.setVisibility(false);
                this.view.flxMainContainer.btnApprove.setVisibility(false);
                this.view.flxMainContainer.btnRecapture.setVisibility(false);
            }else {
            //postlogin success flex
                this.view.flxFaceIdApprovedPopup.setVisibility(true);
                this.view.flxMainContainer.btnCancel.setVisibility(false);
                this.view.flxMainContainer.btnApprove.setVisibility(false);
                this.view.flxMainContainer.btnRecapture.setVisibility(false);
            }   
            },
         navigateToToggle: function() { 
          this.view.flxFaceIdApprovedPopup.setVisibility(false);
          this.view.setVisibility(false); 
                var ApplicationManager = require('ApplicationManager');
                var applicationManager = ApplicationManager.getApplicationManager();
                var navManager = applicationManager.getNavigationManager();
                new kony.mvc.Navigation({   
                  "appName": "SelfServiceEnrolmentMA",    
                 "friendlyName": "frmBioToggleUniken"}).navigate();
         },  
        navigateToLogin: function() {   
             var ApplicationManager = require('ApplicationManager');
             var applicationManager = ApplicationManager.getApplicationManager();
             var navManager = applicationManager.getNavigationManager();
             new kony.mvc.Navigation({   
            "appName": "AuthenticationMA",    
            "friendlyName": "frmLoginUniken"}).navigate();
         },
});