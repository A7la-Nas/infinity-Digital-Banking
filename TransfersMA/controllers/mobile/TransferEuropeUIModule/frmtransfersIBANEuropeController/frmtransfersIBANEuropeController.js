define({
  keypadString: '',
  init: function() {
    this.initActions();
  },
  preShow: function() {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var IBAN = transferModulePresentationController.getIBAN();
    var benificiaryData=transferModulePresentationController.getBenificiaryData();
    if (IBAN) {
      this.view.tbxIBAN.text=IBAN;
    }
    else if (benificiaryData.accountNumber) {
      this.view.tbxIBAN.text=benificiaryData.accountNumber;
    }
    else {
      this.view.tbxIBAN.text="";
      this.disableContinueButton();
    }
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function() {
    var scope = this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    var configManager = applicationManager.getConfigurationManager();
    var validationUtilityManager = applicationManager.getValidationUtilManager();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.tbxIBAN.onTextChange=scope.enableordiableContinue;
    this.view.customHeader.flxBack.onClick = scope.flxBackOnClick;
    this.view.postShow = scope.frmpostShow;
    this.view.btnContinue.onClick = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var accountdata = scope.view.tbxIBAN.text.toUpperCase();
      var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      if (!validationUtilityManager.isValidAccountNumber(accountdata) && /^[a-z]/i.test(accountdata.charAt(0))){
        if (configManager.checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT") || configManager.checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT")) {
          transferModule.isValidIBANCheck(accountdata);
        } else {
          scope.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.NoDomesticPermission"));
        }
      } else {
        if (configManager.checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT")) {
          transferModule.navigateToSwiftCodefromIBAN(accountdata);
        } else {
          scope.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.NoInternationalPermission"));
        }
      }
    };
    this.view.customHeader.btnRight.onClick = scope.onClickCancel;
  },
  frmpostShow: function(){
    this.view.tbxIBAN.setFocus(true);
  },
  getServiceName : function(displayName) {
    var serviceName;
    if(displayName==="InternationalAccountsTransfer") {
      serviceName = "INTERNATIONAL_ACCOUNT_FUND_TRANSFER";
    } else if (displayName ==="OtherBankAccountsTransfer") {
      serviceName ="INTER_BANK_ACCOUNT_FUND_TRANSFER";
    }
    var servicesForUser = applicationManager.getConfigurationManager().getServicesListForUser();
    if (servicesForUser) {
      serviceName = servicesForUser.filter(function(dataItem){
        if (dataItem === serviceName) return true;
      });
      if (serviceName && serviceName.length > 0) {
        serviceName = serviceName[0];
      }
    }
    return serviceName;
  },
  /** Fetches bank details of international bank
     */
  fetchBankDetailsForDomestic:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var scope = this;
    var InternationalBankServiceName = "Internation Account to Account Fund Transfer";
    var IBAN=scope.view.tbxIBAN.text.toUpperCase();
    var serviceName = scope.getServiceName("InternationalAccountsTransfer");
    if(IBAN!==""){
      var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      transferModulePresentationController.fetchBankDetailsForDomesticTransfer(IBAN, serviceName);
    }
  },
  validateIBAN: function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scope = this;
    if (response !==""){
      var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      var IBAN = scope.view.tbxIBAN.text.toUpperCase();
      transferModulePresentationController.navigateToEnterBenificiaryNameFromIBAN(IBAN, response);
    }
    else {
      var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      var IBAN = scope.view.tbxIBAN.text.toUpperCase();
      response = "ACME Bank";
      transferModulePresentationController.navigateToEnterBenificiaryNameFromIBAN(IBAN, response);
    }
  },
  onClickCancel: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var navigateToForm=navManager.getEntryPoint("createEuropeExternalBenificiaries");
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if(navigateToForm === "frmEuropeManageBeneficiaries") {
    transferModPresentationController.commonFunctionForNavigation({"appName":"TransfersMA", "friendlyName":"ManageActivitiesUIModule/frmEuropeManageBeneficiaries"});
     } else {
     transferModPresentationController.cancelCommon(); 
    }
  },
  flxBackOnClick: function() {
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  enableordiableContinue:function() {
    var IBAN = this.view.tbxIBAN.text.toUpperCase();
    //this.view.tbxIBAN.text = IBAN;
    if (IBAN.length >= 5 && IBAN.length <= 34) {
      this.enableContinueButton();
    }
    else {
      this.disableContinueButton();
    }
    
  },
  enableContinueButton:function(){
    this.view.btnContinue.setEnabled(true);
    this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
  },
  disableContinueButton: function() {
    this.view.btnContinue.setEnabled(false);
    this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});
