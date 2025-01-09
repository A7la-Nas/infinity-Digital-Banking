define({
  	timerCounter:0,
  	init:function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  	},
    preShow: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxHeader.isVisible = false;
        }
      this.initActions();
      var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      var navManager = applicationManager.getNavigationManager();
      var accdata = navManager.getCustomInfo("frmTransfersToAccount");
      var swiftCode=accdata.selectedAccountData.swiftCode;
      this.view.txtSwiftCode.setFocus(true);
      if(swiftCode){
        this.view.txtSwiftCode.text=swiftCode;
        this.view.txtSwiftCode.setEnabled(false);
        this.enableContinueButton();
      }
      else{
        this.view.txtSwiftCode.text="";
        this.view.txtSwiftCode.setEnabled(true);
        this.disableContinueButton();
      }
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
          	var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
          	var isValidSwiftCode=transferModule.isValidSwiftCode(swiftCode,"frmTransfersSwiftCodeEurope");
          	if(isValidSwiftCode){
				 scope.fetchBankDetailsForInternational();
            }else{
               scope.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.InvalidSwiftCode"));
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
        if(swiftCode!==""){
          var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
          transferModule.fetchBankDetailsForInternationalTransfer(swiftCode, serviceName);
         }
      },
    validateSwiftcode: function(response){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var scope = this;
      var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      var navManager = applicationManager.getNavigationManager();
      var accdata = navManager.getCustomInfo("frmTransfersToAccount");
      accdata.selectedAccountData.swiftCode = scope.view.txtSwiftCode.text;
      accdata.selectedAccountData.bankName = response;
      navManager.setCustomInfo("frmTransfersToAccount",accdata);   
      if(this.view.switchRememberMe.selectedIndex === 1){
          transferModule.navAfterToAcc(); 
      } else {    
      transferModule.setFlowType("InternationalTransferCreateTransfer");
      transferModule.navigateToBenificiaryInternationalVerifyDetails(accdata.selectedAccountData.beneficiaryName, accdata.selectedAccountData.accountNumber, accdata.selectedAccountData.swiftCode);
      }
    },
  onClickCancel: function() {
    var TransModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    TransModPresentationController.cancelCommon();
	},
  	flxBackOnClick: function() {
      	var navMan=applicationManager.getNavigationManager();
      	navMan.goBack();
    },
  	navigateToAccountNumber:function(){
      	var swiftCode=this.view.txtSwiftCode.text;
      	if(swiftCode.length>0){
        	this.enableContinueButton();
      	}
      	else{
          	this.disableContinueButton();
        }
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