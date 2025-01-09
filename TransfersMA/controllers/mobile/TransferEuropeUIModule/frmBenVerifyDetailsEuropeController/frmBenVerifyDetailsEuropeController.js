define({
  	timerCounter:0,
	init:function(){
      	this.initActions();
    },
    frmPreShow: function() {
        this.renderTitleBar();
      	this.populateDetails();
      	var navManager = applicationManager.getNavigationManager();
    	var currentForm=navManager.getCurrentForm();
        var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
        /*if(transferModulePresentationController.getFlowType()==="InternationalTransferCreateTransfer" || transferModulePresentationController.getFlowType()==="OtherBankAccountsCreateTransfer"){
          this.view.btnContinue.text = "Confirm & Continue";
        }else {         
          this.view.btnContinue.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.addBen.confirm&addRec");
        }*/
      var entryPoint = navManager.getEntryPoint("createEuropeExternalBenificiaries");
      if (entryPoint === "frmEuropeTransferToAccountSM") {
        this.view.flxPhonenumber.setVisibility(false);
        this.view.flxEmailID.setVisibility(false);
        this.view.flxSaveRecipient.setVisibility(true);
      } else {
        this.view.flxPhonenumber.setVisibility(true);
        this.view.flxEmailID.setVisibility(true);
        this.view.flxSaveRecipient.setVisibility(false);
      }
    	applicationManager.getPresentationUtility().dismissLoadingScreen();
    	applicationManager.getPresentationFormUtility().logFormName(currentForm);
        navManager.setEntryPoint("editbeneficiary", "frmBenVerifyDetailsEurope");
    },
  initActions:function(){
    var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    this.view.btnContinue.onClick = scope.btnContinueOnClick;
    this.view.customHeader.flxBack.onClick = scope.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = scope.onClickCancel;
    this.view.switchSaveRecipient.onSlide= this.saveRecipientBasedOnSwitch;
    var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    this.view.flxAddress.onClick=function(){
      transferModule.commonFunctionForNavigation("frmBenAddressEurope");
    };
     this.view.flxNickName.onClick=function(){
      transferModule.commonFunctionForNavigation("frmEuropeTransferToAccountNewBenName");
    };
    this.view.flxPhonenumber.onClick=function(){
      transferModule.commonFunctionForNavigation("frmTransfersPhoneNumberEurope");
    };
    this.view.flxEmailID.onClick=function(){
      transferModule.commonFunctionForNavigation("frmBenEmailAddressEurope");
    };
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
   
  },
  btnRightOnClick: function() {
  },
  renderTitleBar: function() {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
      this.view.flxHeader.setVisibility(false);
    }
  },
  flxBackOnClick: function() {
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  
  onClickCancel: function() {
      var scope = this;
       var navMan = applicationManager.getNavigationManager();
      var basicProperties =
          {
            "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.cancelAddBeneficiary"),
            "alertType": constants.ALERT_TYPE_CONFIRMATION,
            "alertTitle": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.cancelBeneficiary"),
            "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.yesCancel"),
            "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.tab.common.No"),
            "alertIcon": "",
            "alertHandler": scope.cancelBeneficiaryConfirmation
          };
      applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
    },
  
  cancelBeneficiaryConfirmation: function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (response === true) {
    var navManager = applicationManager.getNavigationManager();
    var navigateToForm=navManager.getEntryPoint("createEuropeExternalBenificiaries");
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if(navigateToForm === "frmEuropeManageBeneficiaries") {
    transferModPresentationController.setFlowType("");
    transferModPresentationController.commonFunctionForNavigation({"appName":"TransfersMA", "friendlyName":"ManageActivitiesUIModule/frmEuropeManageBeneficiaries"});
     } else {
     transferModPresentationController.cancelCommon(); 
     }
    }
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  populateDetails:function(){
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var benificiaryData=transferModulePresentationController.getBenificiaryData();
    var forUtility=applicationManager.getFormatUtilManager(); 
     
    //var bankName=transferModulePresentationController.getBankName();
    if(benificiaryData.addressLine1){
      this.view.lblAddAddress.text=benificiaryData.addressLine1;
    }    
    else{
      this.view.lblAddAddress.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.add");
    }
    if(benificiaryData.nickName){
      this.view.lblAddNickname.text=benificiaryData.nickName;
    }
     else{
      this.view.lblAddNickname.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.add");
    }
    if(benificiaryData.phoneNumber){
      this.view.lblAddPhonenumber.text=benificiaryData.phoneNumber;
    }
     else{
      this.view.lblAddPhonenumber.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.add");
    }
    if(benificiaryData.email){
      this.view.lblAddEmailID.text=benificiaryData.email;
    }
     else{
      this.view.lblAddEmailID.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.add");
    }
    if(benificiaryData.accountNumber){
      var accountNumber=benificiaryData.accountNumber;
      var maskedAccountNumber=applicationManager.getDataProcessorUtility().maskAccountNumber(accountNumber);
    }
    // linked with customer ids
    if (benificiaryData.totalContractCustomerSelected) {
      this.view.flxLinkedCustomers.setVisibility(true);
      this.view.lblLinkedWithValue.text = benificiaryData.totalContractCustomerSelected + kony.i18n.getLocalizedString("i18n.payments.customerIDsWithBracket");
    } else {
      this.view.flxLinkedCustomers.setVisibility(false);
    }
    if(transferModulePresentationController.getFlowType()==="InternationalRecipientCreateTransfer"){
      this.view.flxAccountHolder.setVisibility(true);
      this.view.flxAccNo.setVisibility(true);
      this.view.flxAccType.setVisibility(true);
      this.view.flxRoutingNo.setVisibility(false);
      this.view.flxBankName.setVisibility(true);
      this.view.flxBankLocation.setVisibility(false);
      this.view.lblAccHolderValue.text=benificiaryData.beneficiaryName;
      if(benificiaryData.IBAN)
        this.view.lblAccNoValue.text=forUtility.formatIBAN(benificiaryData.IBAN);
      else if(benificiaryData.accountNumber)
        this.view.lblAccNoValue.text=maskedAccountNumber;
      this.view.lblAccTypeVal.text=benificiaryData.swiftCode;
      if(benificiaryData.bankName === null || benificiaryData.bankName === undefined || benificiaryData.bankName === ""){
        this.view.flxBankName.setVisibility(false);  
        //this.view.lblseperatorswift.setVisibility(false); 
      }else{
        this.view.flxBankName.setVisibility(true);
        //this.view.lblseperatorswift.setVisibility(true); 
        //this.view.lblBankNameValue.text = benificiaryData.bankName;
        var bankName = benificiaryData.bankName;
        var bankCountry = benificiaryData.countryName;
        this.view.lblBankNameValue.text = bankName + "," + " " + bankCountry;
      }
       if (benificiaryData.IBAN === null || benificiaryData.IBAN === undefined || benificiaryData.IBAN === "") {
       benificiaryData["IBAN"] = accountNumber;
       }
    }
    else if(transferModulePresentationController.getFlowType()==="OtherBankRecipientsCreateTransfer"){
      this.view.flxAccountHolder.setVisibility(true);
      this.view.flxAccNo.setVisibility(true);
      this.view.flxAccType.setVisibility(true);
      this.view.flxRoutingNo.setVisibility(false);
      this.view.flxBankName.setVisibility(true);
      this.view.flxBankLocation.setVisibility(false);
      this.view.lblAccHolderValue.text=benificiaryData.beneficiaryName;
      if(benificiaryData.IBAN)
      this.view.lblAccNoValue.text=forUtility.formatIBAN(benificiaryData.IBAN);
      else if(benificiaryData.accountNumber)
       this.view.lblAccNoValue.text=maskedAccountNumber;
      this.view.lblAccTypeVal.text=benificiaryData.swiftCode;
      //this.view.lblBankNameValue.text=benificiaryData.bankName;
      var bankName = benificiaryData.bankName;
      var bankCountry = benificiaryData.countryName;
      this.view.lblBankNameValue.text = bankName + "," + " " + bankCountry;
    }
    else{
      this.view.flxAccType.setVisibility(false);
      this.view.flxBankName.setVisibility(false);
      this.view.lblseperatorAccnum.setVisibility(false);
      this.view.lblAccHolderValue.text=benificiaryData.beneficiaryName;
      this.view.lblAccNoValue.text=benificiaryData.accountNumber;
    }
  },
  btnContinueOnClick: function() {
      /*applicationManager.getPresentationUtility().showLoadingScreen();
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transactionManager = applicationManager.getTransactionManager();
    var benificiaryData=transferModulePresentationController.getBenificiaryData();
    transferModulePresentationController.addBeneficiaryDetails(benificiaryData);
    },*/
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var entryPoint = navManager.getEntryPoint("createEuropeExternalBenificiaries");
    if (entryPoint === "frmEuropeTransferToAccountSM")
    {
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transactionManager = applicationManager.getTransactionManager();
    var benificiaryData=transferModulePresentationController.getBenificiaryData();
    if (benificiaryData.nickName === null) {
      //setting nickname to empty string as it is mandatory to get alert notifications. ARB-37442
      transferModulePresentationController.setNickName("");
    }
    transferModulePresentationController.isRecipientSaveRequired=this.saveRecipientBasedOnSwitch();
    if(this.saveRecipientBasedOnSwitch()){
    transferModulePresentationController.setIsVerified(true);
    transferModulePresentationController.triggerOneTimePaymentFlow = true;
    transactionManager.setTransactionAttribute("beneficiaryName", benificiaryData.beneficiaryName);
    transactionManager.setTransactionAttribute("beneficiaryNickname", benificiaryData.nickName);
    if(transferModulePresentationController.getFlowType()==="InternationalRecipients"){
      transferModulePresentationController.setIsInternationalAccount(true);
      transferModulePresentationController.setIsSameBankAccount(false);
      transferModulePresentationController.createInternationalBenificiary();
    }
    else if(transferModulePresentationController.getFlowType()==="InternationalRecipientCreateTransfer"){
      transferModulePresentationController.setIsInternationalAccount(true);
      transferModulePresentationController.setIsSameBankAccount(false);
      transferModulePresentationController.createInternationalBenificiary(benificiaryData);
    }
    else if(transferModulePresentationController.getFlowType()==="OtherBankRecipientsCreateTransfer"){
      transferModulePresentationController.setIsInternationalAccount(false);
      transferModulePresentationController.setIsSameBankAccount(false);
      transferModulePresentationController.createExternalBenificiary(benificiaryData);
    } else {
      transferModulePresentationController.setIsInternationalAccount(false);
      transferModulePresentationController.setIsSameBankAccount(true);
	    transferModulePresentationController.createInternalBenificiary();
      }
    }
    else{
      transferModulePresentationController.triggerOneTimePaymentFlow = true;
      transactionManager.setTransactionAttribute("isRecipientAdded",false);
      transactionManager.setTransactionAttribute("addedRecipientName","");
      transactionManager.setTransactionAttribute("beneficiaryName", benificiaryData.beneficiaryName);
      transactionManager.setTransactionAttribute("beneficiaryNickname", benificiaryData.nickName);
      transactionManager.setTransactionAttribute("serviceName", this.getServiceNameBasedOnFlowType());
      this.navigateToAmountScreen();
    } 
    } else {
      //applicationManager.getPresentationUtility().showLoadingScreen();
      var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      var transactionManager = applicationManager.getTransactionManager();
      var benificiaryData = transferModulePresentationController.getBenificiaryData();
      ///osama
      //var nickNameencod = benificiaryData.nickName.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
      //benificiaryData.nickName =Base64.encode(encodeURI(nickNameencod));
      //transferModulePresentationController.setBenificiaryData(benificiaryData);
      ///end osama
      if (benificiaryData.nickName === null) {
        //setting nickname to empty string as it is mandatory to get alert notifications. ARB-37442
        transferModulePresentationController.setNickName("");
      }
      transferModulePresentationController.triggerOneTimePaymentFlow = true;
      transferModulePresentationController.setIsVerified(true);
      if(transferModulePresentationController.getFlowType()==="InternationalRecipients"){
      transactionManager.setTransactionAttribute("serviceName", 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE');
      transferModulePresentationController.setIsInternationalAccount("true");
      transferModulePresentationController.setIsSameBankAccount("false");
      transferModulePresentationController.createInternationalBenificiary("MANAGE");
    }
    else if(transferModulePresentationController.getFlowType()==="InternationalRecipientCreateTransfer"){
      transactionManager.setTransactionAttribute("serviceName", 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE');
      transferModulePresentationController.setIsInternationalAccount("true");
      transferModulePresentationController.setIsSameBankAccount("false");
      transferModulePresentationController.createInternationalBenificiary("MANAGE");
    }
    else if(transferModulePresentationController.getFlowType()==="OtherBankRecipientsCreateTransfer"){
      transactionManager.setTransactionAttribute("serviceName", 'INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE');
      transferModulePresentationController.setIsInternationalAccount("false");
      transferModulePresentationController.setIsSameBankAccount("false");
      transferModulePresentationController.createExternalBenificiary("MANAGE");
    }
    else{
      transactionManager.setTransactionAttribute("serviceName", 'INTRA_BANK_FUND_TRANSFER_CREATE');
      transferModulePresentationController.setIsInternationalAccount("false");
      transferModulePresentationController.setIsSameBankAccount("true");
      transferModulePresentationController.createInternalBenificiary("MANAGE");
    
	}
    }
  },
  saveRecipientBasedOnSwitch: function(){
    if(this.view.switchSaveRecipient.selectedIndex==0){
      return true;
    }
    else{
      return false;
    }
  },
  navigateToAmountScreen : function(){
    var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var toAccount=[];
    var benificiaryData=transferModule.getBenificiaryData();
    benificiaryData.nickName=benificiaryData.nickName || benificiaryData.beneficiaryName;
    if(transferModule.getFlowType()==="InternationalRecipientCreateTransfer"){
    	benificiaryData.transactionMode =applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
      	transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
    }
    else if (transferModule.getFlowType()==="OtherKonyBankMembersCreateTransfer") {
      benificiaryData.transactionMode =applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
      	transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
    }
    else{
    	benificiaryData.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
      	transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
    }
    toAccount.push(benificiaryData);
    var processedData=transferModule.processExternalAccountsData(toAccount);
    this.pushFormToStack();
    transferModule.clearBenificiaryData();
    var navMan = applicationManager.getNavigationManager();
    var lookUpResultData = navMan.getCustomInfo("frmLookUpResults");
    lookUpResultData={};
    navMan.setCustomInfo("frmLookUpResults",lookUpResultData);
    transferModule.setToAccountData(processedData[0]);
  },
  pushFormToStack :function(){
      var navMan=applicationManager.getNavigationManager();
      var formname="frmEuropeTransferToAccountSM";
      var index = navMan.getFormIndex(formname);
      var stackLength=navMan.stack.length;
      if(index === null)
        navMan.setFormIndex(formname,stackLength-1);
      else{
        for(var i=stackLength-1; i>index; i--){
          navMan.removeFormIndex(navMan.stack[i]);
          navMan.stack.pop();
        }
      }
  },

  getServiceNameBasedOnFlowType: function() {
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if (transferModulePresentationController.getFlowType() === "InternationalRecipients" || transferModulePresentationController.getFlowType() === "InternationalRecipientCreateTransfer")
      return "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE";
    else if (transferModulePresentationController.getFlowType() === "OtherBankRecipientsCreateTransfer")
      return "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
    else if (transferModulePresentationController.getFlowType() === "OtherKonyBankMembersCreateTransfer")
      return "INTRA_BANK_FUND_TRANSFER_CREATE";    
  }
});
