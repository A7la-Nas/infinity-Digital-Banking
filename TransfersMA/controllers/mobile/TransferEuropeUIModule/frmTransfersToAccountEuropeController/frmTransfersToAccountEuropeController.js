define({
  transferType: '',
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function() {
    //  applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
    this.clearTextBox();
    this.initActions();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function() {
    var scope = this;
    this.view.customHeader.flxBack.onClick = function() {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    }
    this.view.customHeader.btnRight.onClick =this.cancelOnClick;
    this.view.flxClose.onTouchStart = this.clearTextBox;
    this.view.tbxTo.onTextChange = this.onTextChange;
    //this.view.segToAccount.onRowClick = this.chooseRecep;
    this.view.btnAddRecipient.onClick = this.onClickContinue;
  },
  clearTextBox : function(){
    this.view.tbxTo.text="";
    this.view.flxClose.setVisibility(false);
    this.disableContinueButton();
    var navMan=applicationManager.getNavigationManager();
    var accdata=  navMan.getCustomInfo("frmTransfersToAccount");
    accdata.selectedAccountData = {}
    navMan.setCustomInfo("frmTransfersToAccount",accdata);
  },
  onTextChange : function(){
    var data = this.view.tbxTo.text;
    if(data.length){
      this.view.flxClose.setVisibility(true);
      this.enableContinueButton();
    }
    else{
      this.clearTextBox();
    }
  },
  cancelOnClick:function()
  {
    var TransModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    TransModPresentationController.cancelCommon();
  },
  enableContinueButton: function() {
    this.view.btnAddRecipient.setEnabled(true);
    this.view.btnAddRecipient.skin = "sknBtn0095e4RoundedffffffSSP26px";
  },
  disableContinueButton: function() {
    this.view.btnAddRecipient.setEnabled(false);
    this.view.btnAddRecipient.skin = "sknBtna0a0a0SSPReg26px";
  },
  showAccountExistingAlert : function(){
    var scope = this;
    var alertCallback = function (response){
      if(response) {
        var TransModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
        var navMan=applicationManager.getNavigationManager();
        var accdata=  navMan.getCustomInfo("frmTransfersToAccount");
        if(kony.sdk.isNullOrUndefined(accdata.selectedAccountData))
          accdata.selectedAccountData = {}
          accdata.selectedAccountData.IBAN=applicationManager.getFormatUtilManager().deFormatIBAN(scope.view.tbxTo.text);
        navMan.setCustomInfo("frmTransfersToAccount",accdata);
        TransModPresentationController.navAfterToAcc();
      }
      else{
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    };
    var alertMsg = kony.i18n.getLocalizedString("kony.mb.transfers.ibanExistsAlertMsg");
    var yesText = kony.i18n.getLocalizedString("kony.mb.common.continue");
    var NoText = kony.i18n.getLocalizedString("kony.mb.common.Cancel");
    kony.ui.Alert({
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": "",
      "message": alertMsg,
      "alertHandler": alertCallback,
      "yesLabel": yesText,
      "noLabel" : NoText
    }, {});
  },
  onClickContinue : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var IBAN = this.view.tbxTo.text;
    if(IBAN!=""&&!kony.sdk.isNullOrUndefined(IBAN)&&applicationManager.getValidationUtilManager().isValidIBAN(IBAN)){
      var navMan=applicationManager.getNavigationManager();
      var accdata=  navMan.getCustomInfo("frmTransfersToAccount");
      if(kony.sdk.isNullOrUndefined(accdata.selectedAccountData))
        accdata.selectedAccountData = {}
        accdata.selectedAccountData.IBAN=applicationManager.getFormatUtilManager().deFormatIBAN(IBAN);
      navMan.setCustomInfo("frmTransfersToAccount",accdata);
      var TransModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      TransModPresentationController.checkExistingAccountwithIBAN(accdata.selectedAccountData.IBAN);
      //navMan.navigateTo("frmTransfersRecipientNameEurope");
    }
    else{
      this.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.InvalidIBAN"));
    }
  },
  bindGenericError : function(msg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  }
});