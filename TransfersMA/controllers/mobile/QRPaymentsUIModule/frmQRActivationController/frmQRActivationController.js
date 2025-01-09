define({
  init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
  },
  //invoked everytime when navigated to form
  preShow: function () {
    var scope = this;
    var configManager = applicationManager.getConfigurationManager();
    var MenuHandler = applicationManager.getMenuHandler();
    MenuHandler.setUpHamburgerForForm(scope, configManager.constants.MENUQRPAYMENT);
    scope.initActions();
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxFooterMenu.isVisible = true;
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMain.top = "56dp";
      this.view.flxFooterMenu.isVisible = false;
    }
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    if (qrPresentationController.isEmptyOrNullOrUndefined(qrPresentationController.getTransObject().fromProcessedName)) {
      this.view.lblSelect.text = kony.i18n.getLocalizedString("i18n.ACH.Select");
    } else {
      this.view.lblSelect.text = qrPresentationController.getTransObject().fromProcessedName;
      if(this.view.imgTermsAccepted.src === "a.png"){
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
      }
    }
  },
  //defined actions
  initActions: function () {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    scope.view.btnContinue.onClick = function () {
      qrPresentationController.activateQRPayment();
    };
      scope.view.flxBankAcc.onClick = function () {
      navMan.setEntryPoint("frmQRFromAccount", "frmQRActivation");
      qrPresentationController.getFromAccounts();
      applicationManager.getPresentationUtility().showLoadingScreen();
    };
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.flxCheckBox.onClick = this.toggleCheckBox;
    this.view.btnTnC.onClick = this.termsAndConditions;
  },
  onNavigate: function () {
    // Footer Menu
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      var footerMenuUtility = require("FooterMenuUtility");
      this.footerMenuUtility =
        footerMenuUtility.getFooterMenuUtilityInstance();
      var cm = applicationManager.getConfigurationManager();
      this.footerMenuUtility.entitlements = {
        features: cm.getUserFeatures(),
        permissions: cm.getUserPermissions(),
      };
      this.footerMenuUtility.scope = this;
      this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
    }
  },
  toggleCheckBox: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    if (this.view.imgTermsAccepted.src === "tickmarkbox.png"){
      this.view.imgTermsAccepted.src = "a.png";
      if(!qrPresentationController.isEmptyOrNullOrUndefined(qrPresentationController.getTransObject().fromProcessedName)) {   
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
      }
    }else {
      this.view.imgTermsAccepted.src = "tickmarkbox.png";
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "ICSknBtnInactive";
    }
  },
  termsAndConditions: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    qrPresentationController.getTermsAndConditions();
  },
  navigateCustomBack: function () {
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo({ "appName": "HomepageMA", "friendlyName": "frmUnifiedDashboard" });
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});
