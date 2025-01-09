define({
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmPreShow: function() {
    this.renderTitleBar();
    this.initActions();
    var scope = this;
    //	this.setRecipientName();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var accountList = navManager.getCustomInfo("frmTransfersToAccount");
    var transferType = accountList.transactionType;
    if (transferType == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToOtherEuropeanAccounts")){
      scope.view.flxAddRecipient.setVisibility(true);
    }
    else
      scope.view.flxAddRecipient.setVisibility(false);
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions : function(){
    this.view.txtRecipientName.onTextChange = this.btnContinueHandler;
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = this.btnRightOnClick;
    this.view.btnContinue.onClick = this.btnContinueOnClick;
  },
  btnContinueHandler : function(){
    if(this.view.txtRecipientName.text!==""){
      this.activeteContBtn();
    }
    else
      this.deactivateContBtn();
  },
  flxBackOnClick : function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  btnRightOnClick: function() {
    var TransModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    TransModPresentationController.cancelCommon();
  },
  btnContinueOnClick : function(){
    var navMan = applicationManager.getNavigationManager();
    var accdata =  navMan.getCustomInfo("frmTransfersToAccount");
    accdata.selectedAccountData.beneficiaryName = this.view.txtRecipientName.text;
    navMan.setCustomInfo("frmTransfersToAccount",accdata);
    var TransModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if (accdata.transactionType == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToOtherEuropeanAccounts"))
   	 TransModPresentationController.saveRecipient(this.view.switchRememberMe.selectedIndex);
    else
      TransModPresentationController.navFromRecipName();
  },
  activeteContBtn : function(){
    this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
    this.view.btnContinue.setEnabled(true);
  },
  deactivateContBtn : function(){
    this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
    this.view.btnContinue.setEnabled(false);
  },
  validateIBAN : function(){
    var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transferModule.navAfterToAcc();
  },
  renderTitleBar: function() {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
      this.view.flxHeader.setVisibility(false);
    }
  },
});