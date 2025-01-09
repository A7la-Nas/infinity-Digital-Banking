define({
  	timerCounter:0,
  	init:function(){
    	this.initActions();
  	},
    preShow: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxHeader.isVisible = false;
        }
      	var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    	var swiftCode=transferModulePresentationController.getSwiftCode();
      	this.view.txtSwiftCode.setFocus(true);
      	var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
      	this.view.txtSwiftCode.restrictCharactersSet = specialCharactersSet;
      	if(swiftCode){
        	this.view.txtSwiftCode.text=swiftCode;
      	}
      	else{
          	this.view.txtSwiftCode.text="";
          	this.disableContinueButton();
        }
      	var navManager = applicationManager.getNavigationManager();
    	var currentForm=navManager.getCurrentForm();
    	applicationManager.getPresentationUtility().dismissLoadingScreen();
    	applicationManager.getPresentationFormUtility().logFormName(currentForm);
	},
    initActions: function() {
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
    	var currentForm=navManager.getCurrentForm();
    	applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
        this.view.txtSwiftCode.onTextChange=scope.navigateToAccountNumber;
        this.view.customHeader.flxBack.onClick = scope.flxBackOnClick;
        this.view.btnContinue.onClick = function() {
          	var swiftCode=scope.view.txtSwiftCode.text;
          	var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
          	var isValidSwiftCode=transferModulePresentationController.isValidSwiftCode(swiftCode,"frmBenSwiftCode");
          	if(isValidSwiftCode){
			//	transferModulePresentationController.navigateToEnterBenificiaryAccountNumberFromSwiftCode(swiftCode);
                 scope.fetchBankDetailsForInternational();
            }
        };
        this.view.customHeader.btnRight.onClick = scope.onClickCancel;
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
        var bankName = applicationManager.getConfigurationManager().getBankName() || '';
        if(swiftCode!==""){
          var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
           transferModulePresentationController.navigateToEnterBenificiaryAccountNumberFromSwiftCode(swiftCode, bankName);
         }
      },
     validateSwiftcode: function(response){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    	var scope = this;
            var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
          	var swiftCode=scope.view.txtSwiftCode.text;
            transferModulePresentationController.navigateToEnterBenificiaryAccountNumberFromSwiftCode(swiftCode, response);
    },
  onClickCancel: function() {
    	applicationManager.getPresentationUtility().showLoadingScreen();
      	var navManager = applicationManager.getNavigationManager();
      	var navigateToForm=navManager.getEntryPoint("createInternalBankBenificiary");
      	var transferModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
      	transferModPresentationController.commonFunctionForNavigation(navigateToForm);
	},
  	flxBackOnClick: function() {
      	var navMan=applicationManager.getNavigationManager();
      	navMan.goBack();
    },
  	navigateToAccountNumber:function(){
      	var swiftCode=this.view.txtSwiftCode.text;
      	if(swiftCode.length>5 && this.isValidSwiftCode(swiftCode)){
        	this.enableContinueButton();
      	}
      	else{
          	this.disableContinueButton();
        }
    },
  	isValidSwiftCode: function(swiftCode){
      var regEx = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
      if(swiftCode.toUpperCase().match(regEx))
        return true;
      else
        return false;
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
  	}
});