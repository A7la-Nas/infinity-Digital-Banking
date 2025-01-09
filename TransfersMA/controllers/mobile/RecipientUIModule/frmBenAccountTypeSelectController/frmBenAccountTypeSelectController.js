define({ 
isBusinessPayee:"",
  init:function(){
    this.initActions();
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
  flxBackOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  onClickCancel: function() {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var navigateToForm=navManager.getEntryPoint("createInternalBankBenificiary");
    var transferModPresentationController = applicationManager.getModulesPresentationController("TransferModule");
    transferModPresentationController.commonFunctionForNavigation(navigateToForm);
  }, btnContinueOnClick: function() {
    if(this.isBusinessPayee === ""){
    }else{
      var navManager = applicationManager.getNavigationManager();
      var formFlow= navManager.getCustomInfo("formflow");
      if(formFlow==="frmBillPayReEnterAccNo"){
        navManager.setCustomInfo("isBusinessPayee",this.isBusinessPayee);
        navManager.navigateTo("frmBillPayVerifyDetails");
      }else{
      var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
      transferModulePresentationController.navigateToBenificiaryVerifyDetails(this.isBusinessPayee);
    }
    }
    },
  frmPreShow: function() {
    this.isBusinessPayee = "0";
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
    this.view.btnContinue.onClick = this.btnContinueOnClick;
    this.view.customHeader.btnRight.onClick = this.onClickCancel;
    this.renderTitleBar();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    
  },
  renderTitleBar: function() {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
      this.view.flxHeader.setVisibility(false);
    }else{
      this.view.flxHeader.setVisibility(true);
    }
    var navManager = applicationManager.getNavigationManager();
    var formFlow= navManager.getCustomInfo("formflow");
    if(formFlow==="frmBillPayReEnterAccNo"){
      this.view.customHeader.lblLocateUs.text=kony.i18n.getLocalizedString("kony.tab.Transfers.AddRecipient");
      this.view.lblAccountTypeSelection.text=kony.i18n.getLocalizedString("kony.mb.transfer.selectAccountType");
      this.view.lblRetailBanking.text=kony.i18n.getLocalizedString("kony.mb.transfer.retailBanking");
      this.view.lblBusinessBanking.text=kony.i18n.getLocalizedString("kony.mb.Accounts.businessBanking");
    }else{	
      this.view.lblAccountTypeSelection.text=kony.i18n.getLocalizedString("kony.mb.transfer.selectAccountType");
      this.view.lblRetailBanking.text=kony.i18n.getLocalizedString("kony.mb.transfer.retailBanking");
      this.view.lblBusinessBanking.text=kony.i18n.getLocalizedString("kony.mb.Accounts.businessBanking");
    }
  },
  frmPostShow: function() {
    this.view.flxImgBusinessBanking.onClick = this.onClickImg;
    this.view.flxImgRetailBanking.onClick = this.onClickImg;
    this.view.flxAccountType.shadowDepth = 2;
    this.view.imgRetailBanking.src = "radiobuttoninactive.png";
    this.view.imgBusinessBanking.src = "radiobuttoninactive.png";
    this.disableContinueButton();
  },onClickImg:function(eventObj){
    try{
     var id = eventObj.id;
     if(id==="flxImgRetailBanking"){
       this.view.imgRetailBanking.src = "radiobtn.png";
       this.view.imgBusinessBanking.src = "radiobuttoninactive.png";
       this.isBusinessPayee = "0";
       this.enableContinueButton();
       var navManager = applicationManager.getNavigationManager();
       navManager.setCustomInfo("isBusinessPayee", this.isBusinessPayee);
     }else if(id==="flxImgBusinessBanking"){
       this.view.imgRetailBanking.src = "radiobuttoninactive.png";
       this.view.imgBusinessBanking.src = "radiobtn.png";
       this.isBusinessPayee = "1";
       this.enableContinueButton();
       var navManager = applicationManager.getNavigationManager();
       navManager.setCustomInfo("isBusinessPayee", this.isBusinessPayee);
     }
    }catch(er){
      
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
  
 });