define({
    isiPhone: applicationManager.getPresentationFormUtility()
        .getDeviceName() === "iPhone",
    serviceID: "",
    timerCounter: 0,
    init: function () {
        var scopeObj = this;
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility()
            .initCommonActions(scopeObj, "YES", currentForm);
    },
    frmPreshow: function () {
        var navManager = applicationManager.getNavigationManager();
        this.view.customHeaderNew.lblScreenName.skin="sknLblffffffSSPReg36pxop100";
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationUtility()
            .dismissLoadingScreen();
        this.setButtonPosition(false);
    },
    frmPostshow: function () {
        var scopeObj = this;
        applicationManager.getPresentationUtility()
            .showLoadingScreen();
        scopeObj.setPreShowData();
        scopeObj.setFlowAction();
        scopeObj.doiPhoneSpecificChange();
        scopeObj.setupCaptcha();
        scopeObj.view.forceLayout();
        applicationManager.getPresentationUtility()
            .dismissLoadingScreen();
    },
    doiPhoneSpecificChange: function () {
        var scopeObj = this;
        if (scopeObj.isiPhone) {
            scopeObj.view.flxHeader.isVisible = false;
        } else {
            scopeObj.view.flxHeader.isVisible = true;
            scopeObj.view.flxMainContainer.top = "56dp";
        }
    },
    setFlowAction: function () {
        var scopeObj = this;
        scopeObj.view.customHeaderNew.flxBack.onClick = function () {
            scopeObj.navJustBack();
        };
        scopeObj.view.customHeaderNew.btnCancel.onClick = function () {
            scopeObj.onClickCancel();
        };
        scopeObj.view.txtCaptchaData.onTextChange = function () {
            var text = scopeObj.view.txtCaptchaData.text;
            if (text === "" || text === undefined) {
                scopeObj.view.btnContinue.skin = "sknBtnOnBoardingInactive";
                scopeObj.view.btnContinue.setEnabled(false);
            } else {
                scopeObj.view.btnContinue.skin = "sknBtn0095e426pxEnabled";
                scopeObj.view.btnContinue.setEnabled(true);
            }
        };
        scopeObj.view.btnContinue.setEnabled(true);
        scopeObj.view.btnContinue.onClick = function () {
            var text = scopeObj.view.txtCaptchaData.text;
            scopeObj.navNext(text);
        };
        scopeObj.view.txtCaptchaData.onTouchEnd = scopeObj.setButtonPosition.bind(scopeObj, true);
        scopeObj.view.txtCaptchaData.onBeginEditing = scopeObj.setButtonPosition.bind(scopeObj, true);
        scopeObj.view.txtCaptchaData.onDone = scopeObj.setButtonPosition.bind(scopeObj, false);
    },
    setButtonPosition: function(isKeypadOpen){
        this.view.flxButtonContainer.reverseLayoutDirection = !isKeypadOpen;
    },
    setPreShowData: function () {
        var scopeObj = this;
        var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
        var date = new Date(enrollMod.presentationController.getEnrollDOB());
        if (applicationManager.getPresentationFormUtility()
            .getDeviceName() !== "iPhone") {
            scopeObj.view.flxHeader.isVisible = true;
            scopeObj.view.flxMainContainer.top = "56dp";
        } else {
            scopeObj.view.flxHeader.isVisible = false;
        }
        scopeObj.view.flxCaptchaData.skin = "slFbox";
        scopeObj.view.imgCaptcha.src = "loadersmall.gif";
        scopeObj.view.lblError.setVisibility(false);
        scopeObj.view.lblLegalEntityName.text = enrollMod.presentationController.getLegalEntity().legalEntityName;
        scopeObj.view.lblLastName.text = enrollMod.presentationController.getEnrollLastName();
        scopeObj.view.lblDOB.text = date.toLocaleDateString();
        scopeObj.view.lblTaxID.text = enrollMod.presentationController.getEnrollSSN();
        scopeObj.view.txtCaptchaData.text = "";
        scopeObj.view.btnContinue.setEnabled(false);
        scopeObj.view.flxPopup.setVisibility(false);
        scopeObj.view.flxPopup.onTouchEnd = scopeObj.dismissPopup.bind(this);
        scopeObj.view.flxdummy.onClick = scopeObj.dummyAction.bind(this);
    },
    navToSecurityCheck: function () {
        var enrollMod = kony.mvc.MDAApplication.getSharedInstance()
            .getModuleManager()
            .getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
        enrollMod.presentationController.commonFunctionForNavigation("frmEnrollSecurityCheck");
    },
    onClickCancel: function () {
        var enrollMod = kony.mvc.MDAApplication.getSharedInstance()
            .getModuleManager()
            .getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
        enrollMod.presentationController.resetEnrollObj();
    },
    navToDOB: function () {
        var enrollMod = kony.mvc.MDAApplication.getSharedInstance()
            .getModuleManager()
            .getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
        enrollMod.presentationController.commonFunctionForNavigation("frmEnrollDOB");
    },
    navBack: function () {
        var enrollMod = kony.mvc.MDAApplication.getSharedInstance()
            .getModuleManager()
            .getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
        enrollMod.presentationController.resetEnrollObj();
    },
    navJustBack: function () {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
    navNext: function (captcha) {
        {
            var scopeObj = this;
            applicationManager.getPresentationUtility()
                .showLoadingScreen();
            var enrollMod = kony.mvc.MDAApplication.getSharedInstance()
                .getModuleManager()
                .getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
            var params = {
                "legalEntityId": enrollMod.presentationController.getLegalEntity().legalEntityId,
                "dateOfBirth": enrollMod.presentationController.getEnrollDOB(),
                "taxId": enrollMod.presentationController.getEnrollSSN(),
                "lastName": enrollMod.presentationController.getEnrollLastName(),
                "serviceKey": scopeObj.serviceID,
                "captchaValue": captcha.trim(),
            };
            enrollMod.presentationController.enrollRetailUser(params);
        }
    },
    bindViewError: function (msg) {
        applicationManager.getPresentationUtility()
            .dismissLoadingScreen();
        applicationManager.getDataProcessorUtility()
            .showToastMessageError(this, msg);
    },
    setupCaptcha: function () {
        var scopeObj = this;
        scopeObj.view.flxImgCaptchaRefresh.onClick = function () {
            scopeObj.initiallySetupCaptcha();
        };
        scopeObj.initiallySetupCaptcha();
    },
    initiallySetupCaptcha: function () {
        var scopeObj = this;
        applicationManager.getPresentationUtility()
            .showLoadingScreen();
        scopeObj.view.txtCaptchaData.text = "";
        scopeObj.view.btnContinue.setEnabled(false);
        scopeObj.view.imgCaptcha.src = "loadersmall.gif";
        scopeObj.captchaFunctionCall();
    },
    captchaFunctionCall: function () {
        var enrollMod = kony.mvc.MDAApplication.getSharedInstance()
            .getModuleManager()
            .getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
        enrollMod.presentationController.getCaptcha();
    },
    captchaFunctionSucessCall: function (base64img, serviceID) {
        var scopeObj = this;
        scopeObj.view.txtCaptchaData.setEnabled(true);
        scopeObj.view.txtCaptchaData.setFocus(true);
        scopeObj.view.imgCaptcha.base64 = base64img;
        scopeObj.serviceID = serviceID;
        applicationManager.getPresentationUtility()
            .dismissLoadingScreen();
    },
    captchaFunctionFailureCall: function () {
        var scopeObj = this;
        scopeObj.view.imgCaptcha.src = "warning.png";
        scopeObj.view.txtCaptchaData.setEnabled(false);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("i18n.enroll.captchaFail"));
    },
    fetchErrorBack: function (errorResponse) {
      //var data = {"encodedImage":"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","opstatus":0,"serviceKey":"a18faeb4-c3d1-415c-9dec-493c5ddf2c70","httpStatusCode":0};
      //this.captchaFunctionSucessCall(data["encodedImage"],data["serviceKey"]);
      this.fetchErrorBacks(errorResponse, 0);
    },
    dummyAction: function () {
        kony.print("dummyAction in frmEnrollController");
    },
    dismissPopup: function () {
        var scopeObj = this;
        scopeObj.view.flxPopup.setVisibility(false);
        scopeObj.view.forceLayout();
    },
    enrollError: function (errnum) {
        var scopeObj = this;
        switch (errnum) {
            case 0:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.service"));
                break;
            case 10801:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.10801"));
                break;
            case 10802:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.10802"));
                break;
            case 10803:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.10803"));
                break;
            case 10804:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.10804"));
                break;
            case 10805:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.10805"));
                break;
            
            default:
                scopeObj.enrollErrors(errnum,scopeObj);
                break;
        }
        return;
    },
    enrollErrors: function (errnum) {
        var scopeObj = this;
        switch (errnum) {
            case 10806:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.10806"));
                break;
            case 10808:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.10808"));
                break;
            case 10809:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.10809"));
                break;
            case 10810:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.10810"));
                break;
            case 10811:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.10811"));
                break;
            case 10812:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.10812"));
                break;
            default:
                scopeObj.enrollErrorx(errnum,scopeObj);
                break;
        }
        return;
    },
    enrollErrorx: function (errnum) {
        var scopeObj = this;
        switch (errnum) {
            case 10813:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.10813"));
                break;
            default:
                scopeObj.enrollErrorMsg(kony.i18n.getLocalizedString("kony.i18n.errorcode.service"));
                break;
        }
        return;
    },
    enrollErrorMsg: function (msg) {
        var scopeObj = this;
        scopeObj.fetchErrorBacks(msg, 1);
    },
  fetchErrorBacks: function (errorResponse, num) {
//       var data = {"encodedImage":"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","opstatus":0,"serviceKey":"a18faeb4-c3d1-415c-9dec-493c5ddf2c70","httpStatusCode":0};
//       this.captchaFunctionSucessCall(data["encodedImage"],data["serviceKey"]);
        var scopeObj = this;
        var timerId = "timerPopupEnroll" + scopeObj.timerCounter;
        if (!kony.sdk.isNullOrUndefined(scopeObj.timerCounter)) {
            scopeObj.timerCounter = parseInt(scopeObj.timerCounter) + 1;
        } else {
            scopeObj.timerCounter = 1;
        }
        scopeObj.view.customPopup.imgPopup.src = "errormessage.png";
        scopeObj.view.customPopup.lblPopup.text = errorResponse;
        scopeObj.view.customPopup.flxPopupWrapper.skin = "sknflxff5d6e";
        scopeObj.view.flxPopup.setVisibility(true);
        if(num!==1)
             scopeObj.setupCaptcha();
        scopeObj.view.forceLayout();
        kony.timer.schedule(timerId, function () {
            scopeObj.view.flxPopup.setVisibility(false);
            scopeObj.view.forceLayout();
        }, 1.5, false);
    },
});