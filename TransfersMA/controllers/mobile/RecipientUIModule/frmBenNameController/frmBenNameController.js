define({
	init:function(){
     	this.initActions();
    },
    frmPreShow: function() {
		this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    	var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    	var benificiaryData=transferModulePresentationController.getBenificiaryData();
      	var beneficiaryName=benificiaryData.beneficiaryName;
      var navMan = applicationManager.getNavigationManager();
      var benData = navMan.getCustomInfo("frmBenName");
      if (benData) var benName = benData.beneficiaryName;
      	if(beneficiaryName || !this.isEmptyNullUndefined(benName)){
          this.view.txtRecipientName.text= !this.isEmptyNullUndefined(beneficiaryName) ? beneficiaryName : benName;
          this.enableContinueButton();
      	}
      	else{
          	this.view.txtRecipientName.text = "";
          	this.disableContinueButton();
        }
      	//var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
        var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\\u0600-\u06FF";
      	this.view.txtRecipientName.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');
      	this.view.txtRecipientName.maxTextLength = 50;
      	this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
        this.view.btnContinue.onClick = this.btnContinueOnClick;
        this.view.customHeader.btnRight.onClick = this.onClickCancel;
		this.view.txtRecipientName.onTextChange=this.navigateToVerifyDetails;
	    this.view.txtRecipientName.setFocus(true);
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
  isEmptyNullUndefined : function (data) {
      if (data === null || data === undefined || data === "") {
        return true;
      }
      return false;
    },
    flxBackOnClick: function() {
      	var navMan=applicationManager.getNavigationManager();
     	navMan.goBack();
    },
  btnContinueOnClick: function() {
    var recipientName=this.view.txtRecipientName.text;
    var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    var configurationManager = applicationManager.getConfigurationManager();
    if(configurationManager.isCombinedUser === "true") {
      transferModulePresentationController.navigateToBenificiaryAccountTypeSelection(recipientName);
    }else{
      var navMan=applicationManager.getNavigationManager();
      navMan.setEntryPoint("contracts",navMan.getCurrentForm());
      //transferModulePresentationController.navigateToBenificiaryVerifyDetails(recipientName,"frmContracts");
      transferModulePresentationController.navToContractDetails(recipientName);
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
  
  bindGenericError : function(errorMsg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});