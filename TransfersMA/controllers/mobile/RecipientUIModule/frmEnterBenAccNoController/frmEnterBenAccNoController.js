define({
  	timerCounter:0,
    keypadString: '',
  	init:function(){
    	this.initActions();
  	},
    frmPreshow: function() {
        this.keypadString = '';
		var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    	var benificiaryData=transferModulePresentationController.getBenificiaryData();
      	var accountNumber=benificiaryData.accountNumber;
      	if(accountNumber){
      		this.keypadString=accountNumber;
            this.enterCodePostAction();
        }
      	else{
        	this.incompleteCodeView();
        }
        this.updateInputBullets("flxInputAccNo");
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
      	this.view.btnContinue.onClick = scope.btnContinueOnClick;
        this.view.customHeader.flxBack.onClick = scope.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = scope.onClickCancel;
    },
    btnRightOnClick: function() {
    },
    renderTitleBar: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
        }
    },
    btnContinueOnClick: function() {
      	var accountNumber=this.keypadString;
      	var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
      	var isValidAccNo=transferModulePresentationController.isValidAccNum(accountNumber,"frmEnterBenAccNo");
      	if(isValidAccNo){
			transferModulePresentationController.navigateToReEnterAccountNumber(accountNumber);
      	}
    },
    flxBackOnClick: function() {
    	var navMan=applicationManager.getNavigationManager();
     	navMan.goBack();
    },
    setKeypadChar: function(char) {
        this.keypadString = this.keypadString + char;
        if (this.keypadString.length > 0 && this.keypadString.length < 17) {
            this.enterCodePostAction();
        } else if (this.keypadString.length < 1) {
            this.incompleteCodeView();
        } else if (this.keypadString.length > 16) {
            this.keypadString = this.keypadString.slice(0, 16);
            return;
        }
        this.updateInputBullets("flxInputAccNo");
    },
    clearKeypadChar: function() {
        if (this.keypadString.length === 1) {
            this.keypadString = '';
            this.updateInputBullets("flxInputAccNo");
        }
        if (this.keypadString.length !== 0) {
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            if (this.keypadString.length < 1) {
                this.incompleteCodeView();
            }
            this.updateInputBullets("flxInputAccNo");
        }
         if (this.keypadString.length < 1) {
            this.incompleteCodeView();
         }
      else{
        this.enterCodePostAction();
      }
    },
    updateInputBullets: function(inputFlx) {
        var widgets = this.view[inputFlx].widgets();
        for (var i = 0; i < this.keypadString.length; i++) {
            // widgets[i].skin = "sknLbl484848sspReg50px";
            widgets[i].text = this.keypadString[i];
        }
        for (var i = this.keypadString.length; i < widgets.length; i++) {
            //widgets[i].skin = "sknLble3e3e3SSP60px";
            widgets[i].text = '_';
        }
        this.view.forceLayout();
    },
    enterCodePostAction: function() {
      if(this.keypadString.length > 3 && this.keypadString.length < 50){
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
      }
      else{
        this.incompleteCodeView();
      }
    },
    incompleteCodeView: function() {
        this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        this.view.btnContinue.setEnabled(false);
    },
	onClickCancel: function() {
      	applicationManager.getPresentationUtility().showLoadingScreen();
		var navManager = applicationManager.getNavigationManager();
      	var navigateToForm=navManager.getEntryPoint("createInternalBankBenificiary");
      	var transferModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
      	transferModPresentationController.commonFunctionForNavigation(navigateToForm);
	},
   	bindGenericError: function (errorMsg) {
    	applicationManager.getPresentationUtility().dismissLoadingScreen();
    	var scopeObj = this;
    	applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  	}
});