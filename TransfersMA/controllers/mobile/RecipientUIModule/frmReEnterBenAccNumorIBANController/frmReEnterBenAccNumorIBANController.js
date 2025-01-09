define({
  init:function(){
    this.initActions();
  },
  frmPreShow: function() {
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    var accountNumber=transferModulePresentationController.getReEnteredAccountNumber();
    if(accountNumber){
      this.view.tbxReEnteredAccountNumber.text=accountNumber;
    }
    else{
      this.view.tbxReEnteredAccountNumber.text="";
      this.disableContinueButton();
    }
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
    this.view.btnContinue.onClick = this.btnContinueOnClick;
    this.view.customHeader.btnRight.onClick = this.onClickCancel;
    this.view.tbxReEnteredAccountNumber.onTextChange=this.btnContinueHandler;
    this.view.tbxReEnteredAccountNumber.setFocus(true);
    this.renderTitleBar();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions:function(){
    var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.customHeader.flxBack.onClick = scope.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = scope.flxBackOnClick;
    this.view.btnContinue.onClick = scope.btnContinueOnClick;
    this.view.customHeader.btnRight.onClick = scope.onClickCancel;
  },
  btnRightOnClick: function() {
  },
  renderTitleBar: function() {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
      this.view.flxHeader.setVisibility(false);
    }
  },
  btnContinueHandler:function(){
    var accountNumber=this.view.tbxReEnteredAccountNumber.text;
    if(accountNumber.length>0 && accountNumber.length<=34){
      this.enableContinueButton();
    }
    else{
      this.disableContinueButton();
    }
  },
  flxBackOnClick: function() {
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  btnContinueOnClick: function() {
    var reEneterdAccountNumber=this.view.tbxReEnteredAccountNumber.text;
    var match=false;
    var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    var benificiaryData=transferModulePresentationController.getBenificiaryData();
    var initialAccountNumber=benificiaryData.accountNumber;
    if(initialAccountNumber===reEneterdAccountNumber){
      match=true;
    }
    else{
      match=false;
    }
    if(match){
      var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
      var isValidAccNoOrIBAN=transferModulePresentationController.isValidAccNumOrIBAN(reEneterdAccountNumber,"frmReEnterBenAccNumorIBAN");
      if(isValidAccNoOrIBAN){
        transferModulePresentationController.navigateToBenName(reEneterdAccountNumber);
      }
    }
    else{
      this.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardless.wrongAccountNumberMessage"));
    }
  },
  enableContinueButton: function() {
    this.view.btnContinue.setEnabled(true);
    this.view.btnContinue.skin = "sknBtn055BAF26px";
  },
  disableContinueButton: function() {
    this.view.btnContinue.setEnabled(false);
    this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
  },
  onClickCancel: function() {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var navigateToForm=navManager.getEntryPoint("createInternalBankBenificiary");
    var transferModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    transferModPresentationController.commonFunctionForNavigation(navigateToForm);
  }, 
  bindGenericError:function(errorMsg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});