define({
    keypadString: '',
    timerCounter: 0,
    init: function () {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    showEnterSSN: function () {
        var locale  = kony.i18n.getCurrentLocale();
        this.setActions();
        var scope = this;
        this.keypadString = '';
        this.view.lblSSN.text = "";
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
            this.view.flxMainContainer.top = "56dp";
        } else {
            this.view.flxHeader.isVisible = false;
            this.view.flxMainContainer.top = "0dp";
        }
        var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
        var ssn = enrollMod.presentationController.getEnrollSSN();
        if (!kony.sdk.isNullOrUndefined(ssn)) {
            this.keypadString = ssn;
            this.view.lblSSN.text = this.keypadString;
            this.view.btnVerifySSN.setEnabled(true);
            this.view.btnVerifySSN.skin = "sknBtn0095e4RoundedffffffSSP26px";
        }
        else {
            this.incompleteSSNoView();
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.changePlaceholder();
      
      if(locale==="ar_AE"){
      this.view.customHeader.imgBack.src="backbutton_reverse.png";
      }
      else if(locale == "en_US" || locale == "en"){
        this.view.customHeader.imgBack.src="backbutton.png";
      }
    },
    setActions: function () {
        var scope = this;
        this.view.btnVerifySSN.onClick = function () {
            scope.verifyAndNavigate();
            scope.changePlaceholder();
        };
        this.view.customHeader.flxBack.onClick = function () {
            scope.navToDOB();
            scope.changePlaceholder();
        };
        this.view.customHeader.btnRight.onClick = function () {
            scope.onClickCancel();
            scope.changePlaceholder();
        };
    },
    verifyAndNavigate: function () {
        var scope = this;
        var temp = scope.keypadString;
        var SSN = temp.replace(/-/g, "");
        if (SSN === null || SSN.length === 0) {
            scope.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.enterSSN"));
        }
        else {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
            enrollModule.presentationController.navigateToFrmEnrollDOB(SSN);
        }
    },
    userNotEnrolled: function () {
        var scope = this;
        var temp = scope.keypadString;
        var SSN = temp.replace(/-/g, "");
        var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
        enrollModule.presentationController.validateEnrollSSN(SSN);
    },
    navToSecurityCheck: function () {
        var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
        enrollMod.presentationController.commonFunctionForNavigation("frmEnrollSecurityCheck");
    },
    navToDOB: function () {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
    onClickCancel: function () {
        var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
        enrollMod.presentationController.resetEnrollObj();
    },
    navToAlreadyEnrolled: function () {
        var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
        enrollMod.presentationController.commonFunctionForNavigation("frmAlreadyEnrolled");
    },
    setKeypadChar: function (char) {
        this.keypadString = this.keypadString + char;
        if (this.keypadString.length > 0) {
            this.enterSSNPostAction();
        } else if (this.keypadString.length < 1) {
            this.incompleteSSNoView();
        } else if (this.keypadString.length > 11) {
            this.keypadString = this.keypadString.slice(0, 11);
            return;
        }
        this.view.lblSSN.text = this.keypadString;
        this.changePlaceholder();
    },
    clearKeypadChar: function () {
        if (this.keypadString.length === 1) {
            this.keypadString = '';
        }
        if (this.keypadString.length !== 0) {
            if (this.keypadString[this.keypadString.length - 1] === '-') {
                this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            }
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            if (kony.sdk.isNullOrUndefined(this.keypadString) || this.keypadString === "") {
                this.incompleteSSNoView();
            }
        }
        else {
            this.incompleteSSNoView();
        }
        this.view.lblSSN.text = this.keypadString;
        this.changePlaceholder();
    },
    updateInputBullets: function (inputFlx) {
        var dummyString = '___-__-____';
        if (this.keypadString.length === 3 || this.keypadString.length === 6) {
            this.keypadString = this.keypadString + '-';
        }
        var widgets = this.view[inputFlx].widgets();
        for (var j = 0; j < this.keypadString.length; j++) {
            if (this.keypadString[j] === '-') {
                widgets[j].text = this.keypadString[j];
            } else {
                widgets[j].text = "•";
            }
        }
        for (var i = this.keypadString.length; i < widgets.length; i++) {
            widgets[i].text = dummyString[i];
        }
        this.view.forceLayout();
    },
    enterSSNPostAction: function () {
        this.view.btnVerifySSN.setEnabled(true);
        this.view.btnVerifySSN.skin = "sknBtn0095e426pxEnabled";
        this.view.flxMainContainer.forceLayout();
    },
    incompleteSSNoView: function () {
        this.view.btnVerifySSN.skin = "sknBtna0a0a0SSPReg26px";
        this.view.flxMainContainer.forceLayout();
        this.view.btnVerifySSN.setEnabled(false);
    },
    bindViewError: function (msg) {
        var scope = this;
        applicationManager.getDataProcessorUtility().showToastMessageError(scope, msg);
    },
    clearSSN: function () {
        var widgets = this.view["flxInputSSN"].widgets();
        for (var i = 0; i < 11; i++) {
            if (i === 3 || i === 6) {
                widgets[i].text = '-';
            }
            else {
                widgets[i].text = '_';
            }
        }
        this.view.forceLayout();
    },
    changePlaceholder: function (show) {
        var hide = true;
        var text = this.view.lblSSN.text;
        if (kony.sdk.isNullOrUndefined(show)) {
            if (!kony.sdk.isNullOrUndefined(text)) {
                if (text.trim().length === 0) hide = false;
            }
        }
        else {
            hide = !show;
        }
        this.view.lblSSNPlaceholder.isVisible = !hide;
        this.view.forceLayout();
    },
});