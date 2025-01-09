define({
  onNavigate: function (obj) {
    if (obj === undefined) {
      return;
    }
  },
  init:function(){
    this.initActions();
  },
  preShow: function () {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var benificiaryDetails=transferModPresentationController.getBenificiaryData();
    this.setDetails(benificiaryDetails);
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function () {
    var scope = this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
     this.view.btnTransfer.setVisibility(false)
    this.view.btnTransfer.onClick=function(){
    	var transModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      	transModPresentationController.setTransferToInfo();
      var navMan=applicationManager.getNavigationManager();
     navMan.setEntryPoint("makeatransfer","frmManageTransferRecipientInfo");
    };
    this.view.customHeader.flxBack.onClick = function () {
		var navMan=applicationManager.getNavigationManager();
		navMan.goBack();
    };
    this.view.customHeader.btnRight.onClick = function () {
      scope.editBenificiaryName();
    };
    this.view.btnDeleteRecipient.onClick = function () {
      var basicConfig = {message: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfers.deleteAlertMessage"),alertIcon:null,alertType: constants.ALERT_TYPE_CONFIRMATION,yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                         noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"), alertHandler: scope.deleteHandler
                        };
      var pspConfig = {};
      applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
    };
  },
  editBenificiaryName:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transferModulePresentationController.commonFunctionForNavigation("frmManageEditRecipientEurope");
  },
  deleteHandler:function(response){
    if(response === true){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      transferModulePresentationController.deleteSameBankBenificiary();
    }
  },
  setDetails:function(accountDetails){
    this.view.lblRecipientNameValue.text=accountDetails.beneficiaryName;
    this.view.lblAccountTypeValue.text=accountDetails.accountType;
    this.view.lblNickNameValue.text=accountDetails.nickName;
    this.view.lblAccountBal.text=accountDetails.accountType;
    this.view.title=accountDetails.nickName;
    this.view.customHeader.lblLocateUs.text=accountDetails.nickName;
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if(transferModulePresentationController.getFlowType()==="InternationalRecipients"){
      var maskedAccountNumber = "";
      if(typeof accountDetails.accountNumber ==="string"){
          maskedAccountNumber = applicationManager.getDataProcessorUtility().maskAccountNumber(accountDetails.accountNumber);
      }else{
          maskedAccountNumber = applicationManager.getDataProcessorUtility().maskAccountNumber(JSON.stringify(JSON.parse(accountDetails.accountNumber)));
      }
    this.view.lblAccountNumberValue.text=maskedAccountNumber;
      if(accountDetails.countryName){
      		this.view.lblBankName.text=accountDetails.bankName+","+accountDetails.countryName;
      		this.view.lblBankBranchValue.text=accountDetails.bankName+","+accountDetails.countryName;
      }
      else{
        this.view.lblBankName.text=accountDetails.bankName;
      	this.view.lblBankBranchValue.text=accountDetails.bankName;
      }
      this.view.lblAccountBal.isVisible=false;
      this.view.lblAccountType.isVisible=false;
      this.view.lblAccountTypeValue.isVisible=false;
      this.view.flxAccounts.isVisible=true;
      this.view.lblRoutingNumberValue.isVisible=true;
      this.view.lblRoutingNumberValue.text=accountDetails.swiftCode;
      this.view.lblRoutingNumber.isVisible=true;
      this.view.lblRoutingNumber.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.SwiftCode");
      this.view.imgBank.isVisible=true;
      this.view.imgBank.src="externalbank.png";
    }
    else if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
      this.view.lblBankName.text=accountDetails.bankName;
      this.view.lblBankBranchValue.text=accountDetails.bankName;
      this.view.flxAccounts.isVisible=false;
      this.view.lblRoutingNumberValue.isVisible=false;
      this.view.lblRoutingNumber.isVisible=false;
      this.view.imgBank.isVisible=false;
    }
    else{
      var formatUtil = applicationManager.getFormatUtilManager();
      this.view.lblAccountNumberValue.isVisible=false;
      this.view.lblAccountNumber.isVisible=false;
      this.view.lblAccountType.isVisible=false;
      this.view.lblAccountTypeValue.isVisible=false;
      this.view.lblBankName.text=accountDetails.bankName;
      this.view.lblBankBranchValue.text=accountDetails.bankName;
      this.view.flxAccounts.isVisible=false;
      this.view.lblRoutingNumberValue.isVisible=true;
      if(accountDetails && accountDetails.IBAN)
      this.view.lblRoutingNumberValue.text=formatUtil.formatIBAN(accountDetails.IBAN);
      if(accountDetails && accountDetails.accountNumber)
      this.view.lblRoutingNumberValue.text=accountDetails.accountNumber;
      this.view.lblRoutingNumber.isVisible=true;
      this.view.lblRoutingNumber.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.IBAN");
      this.view.imgBank.isVisible=true;
      this.view.imgBank.src="externalbank.png";
    }
  }
});
