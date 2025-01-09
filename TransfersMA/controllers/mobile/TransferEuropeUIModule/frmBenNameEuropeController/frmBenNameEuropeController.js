define({
  init:function(){
    this.initActions();
  },
  frmPreShow: function() {
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var benificiaryData=transferModulePresentationController.getBenificiaryData();
    var beneficiaryName=benificiaryData.beneficiaryName;
    if(beneficiaryName){
      this.view.txtRecipientName.text=beneficiaryName;
    }
    else{
      this.view.txtRecipientName.text="";
      this.disableContinueButton();
    }
    //this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    //this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
    //this.view.btnContinue.onClick = this.btnContinueOnClick;
   // this.view.customHeader.btnRight.onClick = this.onClickCancel;
    this.view.txtRecipientName.onTextChange=this.navigateToVerifyDetails;
    
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
    this.view.postShow=scope.frmpostShow;
  },  
  frmpostShow:function(){
    this.view.txtRecipientName.setFocus(true);
  },
  btnRightOnClick: function() {
  },
  renderTitleBar: function() {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
      this.view.flxHeader.setVisibility(false);
    }
  },
  navigateToVerifyDetails:function(){
    var recipientName=this.view.txtRecipientName.text;
    if(recipientName.length>0){
      this.enableContinueButton();
    }
    else{
      this.disableContinueButton();
    }
  },
  btnContinueHandler: function() {
    if ((this.view.txtFirstName.text !== '') && (this.view.txtFirstName.text !== null) && (this.view.txtLastName.text !== '') && (this.view.txtLastName.text !== null)) {
      this.enableContinueButton();
    } else {
      this.disableContinueButton();
    }
  },
  flxBackOnClick: function() {
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  btnContinueOnClick: function() {
    var recipientName=this.view.txtRecipientName.text;
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if(transferModulePresentationController.isValidbenificiaryName(recipientName,"frmBenNameEurope")){
    transferModulePresentationController.navigateToIBANDetails(recipientName);
    }
  },
  enableContinueButton: function() {
    this.view.btnContinue.setEnabled(true);
    this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
  },
  disableContinueButton: function() {
    this.view.btnContinue.setEnabled(false);
    this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
  },
  onClickCancel: function() {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var navigateToForm=navManager.getEntryPoint("createEuropeExternalBenificiaries");
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if(navigateToForm === "frmEuropeManageBeneficiaries") {
    transferModPresentationController.commonFunctionForNavigation({"appName":"TransfersMA", "friendlyName":"ManageActivitiesUIModule/frmEuropeManageBeneficiaries"});
    } else {
     transferModPresentationController.cancelCommon(); 
    }
  },
    bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});
