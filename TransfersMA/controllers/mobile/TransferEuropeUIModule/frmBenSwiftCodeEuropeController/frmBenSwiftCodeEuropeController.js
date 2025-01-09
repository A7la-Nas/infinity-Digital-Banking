define({
  timerCounter:0,
  init:function(){
    this.initActions();
  },
  preShow: function() {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var swiftCode=transferModulePresentationController.getSwiftCode();
    
    if(swiftCode){
      this.view.txtSwiftCode.text=swiftCode;
      this.enableContinueButton();
    }
    else{
      this.view.txtSwiftCode.text="";
      this.disableContinueButton();
    }
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    navManager.setEntryPoint("searchCountry", "frmBenSwiftCodeEurope");
  },
  initActions: function() {
    var scope = this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.txtSwiftCode.onTextChange=scope.validateSwiftLength;
    this.view.customHeader.flxBack.onClick = scope.flxBackOnClick;
    this.view.postShow=scope.frmpostShow;
    this.view.lbllookupcode.onTouchStart = function(){
      var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      transferModPresentationController.searchSwiftData = {};
      transferModPresentationController.commonFunctionForNavigation("frmTransferEuropeSearchSwiftCode");
    };
    this.view.btnContinue.onClick = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var swiftCode=scope.view.txtSwiftCode.text;
      var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      var isValidSwiftCode=transferModulePresentationController.isValidSwiftCode(swiftCode,"frmBenSwiftCodeEurope");
      if(isValidSwiftCode){
        //scope.fetchBankDetailsForInternational();
        transferModulePresentationController.navigateToVerifyDetailsFromSwiftCode(swiftCode);
      }else{
        scope.bindGenericError("Invalid swift code");
      }
    };
    this.view.customHeader.btnRight.onClick = scope.onClickCancel;
  },
  frmpostShow:function(){
    this.view.txtSwiftCode.setFocus(true);
  },
  getServiceName : function(displayName) {
    var serviceName;
    if(displayName === "InternationalAccountsTransfer") {
      serviceName = "INTERNATIONAL_ACCOUNT_FUND_TRANSFER";
    } else if (displayName === "OtherBankAccountsTransfer") {
      serviceName ="INTER_BANK_ACCOUNT_FUND_TRANSFER";
    }
    var servicesForUser = applicationManager.getConfigurationManager().getServicesListForUser();
    if (servicesForUser) {
      serviceName = servicesForUser.filter(function(dataItem){
        if(dataItem === serviceName) return true;
      });
      if(serviceName && serviceName.length > 0) {
        serviceName = serviceName[0];
      }
    }
    return serviceName;
  },
  /** Fetches bank details of international bank
     */
  fetchBankDetailsForInternational:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var scope = this;
    var InternationalBankServiceName = "Internation Account to Account Fund Transfer";
    var swiftCode=scope.view.txtSwiftCode.text;
    var serviceName = scope.getServiceName("InternationalAccountsTransfer");
    if(swiftCode!==""){
      var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      transferModulePresentationController.fetchBankDetailsForInternationalTransfer(swiftCode, serviceName);
    }
  },
  validateSwiftcode: function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scope = this;
    if(response !==""){
      var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      var swiftCode=scope.view.txtSwiftCode.text;
      transferModulePresentationController.navigateToEnterBenificiaryAccountNumberFromSwiftCode(swiftCode, response);
    }
    else{
      var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      var swiftCode=scope.view.txtSwiftCode.text;
      response = "ACME Bank";
      transferModulePresentationController.navigateToEnterBenificiaryAccountNumberFromSwiftCode(swiftCode, response);
    }
  },
  onClickCancel: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var navigateToForm=navManager.getEntryPoint("createEuropeExternalBenificiaries");
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if(navigateToForm === "frmEuropeManageBeneficiaries") {
    transferModPresentationController.setFlowType("");
    transferModPresentationController.commonFunctionForNavigation({"appName":"TransfersMA", "friendlyName":"ManageActivitiesUIModule/frmEuropeManageBeneficiaries"});
     } else {
     transferModPresentationController.cancelCommon(); 
     }
  },
  flxBackOnClick: function() {
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  navigateToVerifyDetails:function(){
    var swiftCode=this.view.txtSwiftCode.text;
    if(swiftCode.length>0&& swiftCode.length<11){
      this.enableContinueButton();
    }
    else{
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
  },
  validateSwiftLength:function(){
    var data=this.view.txtSwiftCode.text;
    if(data.length===8||data.length===11){
      this.enableContinueButton();
    }
    else{
      this.disableContinueButton();
    }
  }
});
