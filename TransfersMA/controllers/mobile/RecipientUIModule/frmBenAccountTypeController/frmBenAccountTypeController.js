define({
    init:function(){
    	this.initActions();
    },
  	frmPreShow: function() {
        this.renderTitleBar();
      	var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
    	var benificiaryData=transferModulePresentationController.getBenificiaryData();
      	var accountType=benificiaryData.accountType;
      	this.clearSkins();
      	if(accountType){
          if(accountType===applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.Checking")){
        	this.view.btnCheckingAcc.skin = "sknBtnOnBoardingOptionsActive";
      	 }
          else if(accountType===applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.Savings")){
        	this.view.btnSavingAccount.skin ="sknBtnOnBoardingOptionsActive";
          }
          else if(accountType===applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.Loan")){
        	this.view.btnLoanAcc.skin = "sknBtnOnBoardingOptionsActive";
          }else{
        	this.view.btnFdAccount.skin = "sknBtnOnBoardingOptionsActive";
          }
        }
      	var navManager = applicationManager.getNavigationManager();
    	var currentForm=navManager.getCurrentForm();
    	applicationManager.getPresentationUtility().dismissLoadingScreen();
    	applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
  	initActions:function(){
      	var navManager = applicationManager.getNavigationManager();
    	var currentForm=navManager.getCurrentForm();
    	applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      	var scope=this;
    	this.view.btnCheckingAcc.onClick = scope.btnCheckingAccOnClick;
      	this.view.btnSavingAccount.onClick = scope.btnSavingAccOnClick;
      	this.view.btnLoanAcc.onClick = scope.btnLoanAccOnClick;
      	this.view.btnFdAccount.onClick = scope.btnFDAccOnClick;
        this.view.customHeader.flxBack.onClick = scope.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = scope.onClickCancel;
  },
  clearSkins:function(){
    	this.view.btnCheckingAcc.skin = "sknBtnOnBoardingOptionsInActive";
      	 this.view.btnSavingAccount.skin ="sknBtnOnBoardingOptionsInActive";
          this.view.btnLoanAcc.skin = "sknBtnOnBoardingOptionsInActive";
          this.view.btnFdAccount.skin = "sknBtnOnBoardingOptionsInActive";
  },
    btnRightOnClick: function() {
    },
    renderTitleBar: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
        }
    },
    btnCheckingAccOnClick: function() {
		this.navigateToBenName(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.Checking"));
    },
  	btnSavingAccOnClick: function() {
		this.navigateToBenName(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.Savings"));
    },
  	btnLoanAccOnClick: function() {
		this.navigateToBenName(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.Loan"));
    },
  	btnFDAccOnClick: function() {
		this.navigateToBenName(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.FD"));
    },
  	navigateToBenName:function(accountType){
        var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
      	transferModulePresentationController.navigateToBenificiaryName(accountType);
    },
    flxBackOnClick: function() {
      	var navMan=applicationManager.getNavigationManager();
     	navMan.goBack();
    },
  	onClickCancel: function() {
      	applicationManager.getPresentationUtility().dismissLoadingScreen();
      	var navManager = applicationManager.getNavigationManager();
      	var navigateToForm=navManager.getEntryPoint("createInternalBankBenificiary");
      	var transferModPresentationController = applicationManager.getModulesPresentationController("TransferModule");
      	transferModPresentationController.commonFunctionForNavigation(navigateToForm);
	}
});