define({
	refreshIntervalId: null,
    init: function() {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    touchIdpreShow: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
            this.view.lblTouchIdSubTitle.text = kony.i18n.getLocalizedString("kony.mb.preferences.UseDeviceBiometrics");
            this.view.lblTouchId.text = kony.i18n.getLocalizedString("kony.mb.devReg.Biometric");
        } else {
            this.view.flxHeader.isVisible = false;
            this.view.lblTouchIdSubTitle.text = kony.i18n.getLocalizedString("kony.mb.devReg.touchIdMsg");
            this.view.lblTouchId.text = kony.i18n.getLocalizedString("kony.mb.devReg.touchidTitle");
        }
        this.view.btnEnable.onClick = this.goToDefaultLogin;
        this.view.customHeader.flxBack.onClick = function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.goBack();
        };
    },
    goToDefaultLogin: function() {
        var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
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
        authMod.presentationController.commonFunctionForNavigation("frmDefaultLogin");
    },
    skipAction: function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "AuthUIModule",
            "appName": "AuthenticationMA"
        });
        authMode.presentationController.defaultLoginToAccounts();
    },
    /*preshow: function() {

    },*/
    postshow: function() {
        Controllers.set("frmPasscodeController", this);
        this.generateTOTP();
    },
    onDestroy: function() {
        this.stopTimer();
    },
    generateTOTP: function() {
        kony.print("Avengers : Passcode-> generateTOTP :  " + RDNAUtility.getSession().userId);
        var userId = RDNAUtility.getSession().userId;
        RDNAUtility.showLoadingScreen();
        this.handleSynErrorResponse(RDNAAPI.generateTOTP(userId));
    },
    startTimer: function() {
        var context = this;
        this.stopTimer();
        //this.refreshIntervalId = setInterval(context.tick.bind(context), 1000);
        this.refreshIntervalId = {};
        kony.timer.schedule("totpTimer", this.tick, 1, true);
        kony.print("Avengers : Passcode-> startTimer :  " + this.refreshIntervalId);
    },
    stopTimer: function() {
        if (this.refreshIntervalId) {
            //Stop timer
            kony.print("Avengers : Passcode-> stopTimer :  " + this.refreshIntervalId);
            //clearInterval(this.refreshIntervalId);
            kony.timer.cancel("totpTimer");
        }
        this.refreshIntervalId = null;
    },
    tick: function() {
        kony.print("Avengers : Passcode-> tick :  ");
        this.generateTOTP();
    },
    onTOTPGenerated: function(response) {
        var scopeObj = this;
        kony.print("Avengers : Passcode-> onTOTPGenerated :  " + JSON.stringify(response));
        if (response.error.longErrorCode === 0) {
            kony.print("Avengers : Passcode-> onTOTPGenerated : TOTP --> " + response.TOTP);
            kony.print("Avengers : Passcode-> onTOTPGenerated : ExpiryTime --> " + response.expiryTimeInSec);
            if (this.refreshIntervalId == null) {
                this.startTimer();
            }
            this.view.flxMainContainer.flxOnetimePasscode.txtOnetimePasscode.text = response.TOTP;
            this.view.flxMainContainer.flxOnetimePasscode.flxPBar.setVisibility(false)
            this.view.flxMainContainer.flxOnetimePasscode.flxTime.lblTime.text = response.expiryTimeInSec + " Sec";
            this.view.flxHeader.customHeader.flxHeader.flxBack.imgBack.onTouchEnd = function() {
                scopeObj.stopTimer();
                scopeObj.navigateToPreviousForm();
            };
            this.view.flxHeader.customHeader.flxHeader.btnRight.onClick = function() {
                scopeObj.stopTimer();
                scopeObj.navigateToPreviousForm();
            };
        } else {
            kony.print("Avengers : Passcode-> onGetPasscode :  Error");
            this.stopTimer();
            // ToDO...
            //Navigate to Dashboard...
            kony.ui.Alert({
                "alertType": constants.ALERT_TYPE_INFO,
                "alertTitle": null,
                "yesLabel": null,
                "noLabel": null,
                "alertIcon": null,
                "message": response.error.errorString,
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
        }
    },
    navigateToPreviousForm: function() {
        const navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmSecurityNotification", undefined);
        navManager.navigateTo({
            "appName": "HomepageMA",
            "friendlyName": "AccountsUIModule/frmUnifiedDashboard"
        });
    },
    handleSynErrorResponse: function(response) {
        var scopeObj = this;
        kony.print("Avengers : Passcode-> handleSynErrorResponse :  " + JSON.stringify(response));
        RDNAUtility.hideLoadingScreen();

        function SHOW_ALERT_Callback() {
            // ToDO...
            //Navigate to Dashboard...
            scopeObj.navigateToPreviousForm();
        }
        if (response[0].shortErrorCode !== 0) {
            this.stopTimer();
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
});