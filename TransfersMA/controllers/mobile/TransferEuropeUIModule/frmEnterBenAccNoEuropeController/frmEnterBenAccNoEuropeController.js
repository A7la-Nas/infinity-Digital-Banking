define({
  	timerCounter:0,
    keypadString: '',
  	init:function(){
    	this.initActions();
  	},
    frmPreshow: function() {
        this.keypadString = '';
		var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    	var benificiaryData=transferModulePresentationController.getBenificiaryData();
        var IBAN = transferModulePresentationController.getIBAN();
      	var accountNumber=benificiaryData.accountNumber;
      	if(accountNumber){
      		this.keypadString=accountNumber;
            this.enterCodePostAction();
        }
        else if (IBAN) {
      		this.view.txtAccNo.text=IBAN;
    	}
      	else{
            this.view.txtAccNo.text = "";
        	this.incompleteCodeView();
        }
      //  this.updateInputBullets("flxInputAccNo");
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
        this.view.txtAccNo.onTextChange = scope.enableordiableContinue;
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
    btnContinueOnClick: function () {
        var accountNumber = this.view.txtAccNo.text.toUpperCase();
        var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
        var isValidAccNoOrIBAN = transferModulePresentationController.isvalidateAccountorIBAN(accountNumber, "frmEnterBenAccNoEurope");
        if (isValidAccNoOrIBAN) {
            transferModulePresentationController.getBeneficiaryName(accountNumber);
        }
        else {
            this.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.InvalidAccountNumber"));
        }
    },
    flxBackOnClick: function() {
    	var navMan=applicationManager.getNavigationManager();
     	navMan.goBack();
    },
    /*setKeypadChar: function(char) {
        this.keypadString = this.keypadString + char;
        if (this.keypadString.length > 0 && this.keypadString.length < 17) {
            this.enterCodePostAction();
        } else if (this.keypadString.length < 1) {
            this.incompleteCodeView();
        } else if (this.keypadString.length > 16) {
            this.keypadString = this.keypadString.slice(0, 16);
            return;
        }
      //  this.updateInputBullets("flxInputAccNo");
      this.view.lblAccNo.text = this.keypadString;
    },
    clearKeypadChar: function() {
        if (this.keypadString.length === 1) {
            this.keypadString = '';
           // this.updateInputBullets("flxInputAccNo");
        }
        if (this.keypadString.length !== 0) {
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            if (this.keypadString.length < 1) {
                this.incompleteCodeView();
            }
          //  this.updateInputBullets("flxInputAccNo");
        }
         if (this.keypadString.length < 1) {
            this.incompleteCodeView();
         }
      this.view.lblAccNo.text = this.keypadString;
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
    },*/
    enableordiableContinue: function() {
        var AccNoOrIBAN = this.view.txtAccNo.text.toUpperCase();
        if (AccNoOrIBAN.length > 0 && AccNoOrIBAN.length <= 34) {
        this.enterCodePostAction();
      }
      else {
        this.incompleteCodeView();
      }
    },
    enterCodePostAction: function() {
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
    },
    incompleteCodeView: function() {
        this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        this.view.btnContinue.setEnabled(false);
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
   	bindGenericError: function (errorMsg) {
    	applicationManager.getPresentationUtility().dismissLoadingScreen();
    	var scopeObj = this;
    	applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  	}
});
