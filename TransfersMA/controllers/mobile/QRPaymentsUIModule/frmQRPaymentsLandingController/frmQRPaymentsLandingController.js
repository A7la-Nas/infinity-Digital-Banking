define({ 

  //invoked everytime when navigated to form
  preShow: function(){
    var scope = this;
    this.initActions();
    var configManager = applicationManager.getConfigurationManager();
    var MenuHandler =  applicationManager.getMenuHandler();
    this.view.customHeader.flxBack.isVisible = false;
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxFooterMenu.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
      this.view.flxFooterMenu.isVisible = false;
    }     
    MenuHandler.setUpHamburgerForForm(scope,configManager.constants.MENUQRPAYMENT);

  },
  //defined actions
  initActions: function(){
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
	var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    scope.view.flxScanAndPay.onClick = function(){
      var defaultAcc = applicationManager.getUserPreferencesManager().getUserObj().default_from_account_qr;
      if(qrPresentationController.isEmptyOrNullOrUndefined(defaultAcc)){
        this.bindGenericError(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage")); 
      } else {
        qrPresentationController.getLatestBalance(defaultAcc);
        qrPresentationController.getProcessedDefaultAccDetails(defaultAcc);
      }
    };
    qrPresentationController.clearTransObj();
  },
  onNavigate:function(){
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
  
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});