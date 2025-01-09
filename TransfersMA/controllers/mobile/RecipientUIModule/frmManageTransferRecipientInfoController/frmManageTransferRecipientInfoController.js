define({
  isEditLinkedCustomerAvailable : false,
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
    var transferModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    var benificiaryDetails=transferModPresentationController.getBenificiaryData();
    this.setDetails(benificiaryDetails);
    this.setUiBasedOnPermissions(benificiaryDetails);
    this.setContractDetails();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  setUiBasedOnPermissions : function(account) {
	var configManager = applicationManager.getConfigurationManager();
    var createOrEditPayeePermission = this.checkEditRecipientPermission(account);
    var deletePermission = this.checkRemoveRecipientPermission(account);
    this.view.customHeader.btnRight.isVisible = createOrEditPayeePermission;
    if(applicationManager.getDeviceUtilManager().isIPhone() && !(createOrEditPayeePermission)) {
      var rightBarButtonItem = new kony.ui.BarButtonItem({
        type: configManager.constants.BAR_BUTTON_TITLE,
        style: configManager.constants.BAR_ITEM_STYLE_PLAIN,
        enabled: true,
        tintColor: "FFFFFF00",
        metaData: {
          title: " "
        }
      });
      this.view.setRightBarButtonItems({
        items: [rightBarButtonItem],
        animated: true
      });      
    } 
    
    this.view.btnDeleteRecipient.isVisible = deletePermission;
  },
  
  checkEditRecipientPermission : function(account){
    if(account.isInternationalAccount==="true"){
      return applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT");
    }
    else if(account.isSameBankAccount === "true"){
      return applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT");
    }
    else if(account.isSameBankAccount === "false" && account.isInternationalAccount==="false"){
      return applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT");
    }
    return false;
  },

  checkRemoveRecipientPermission : function(account){
    if(account.isInternationalAccount==="true"){
      return applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT");
    }
    else if(account.isSameBankAccount === "true"){
      return applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT");
    }
    else if(account.isSameBankAccount === "false" && account.isInternationalAccount==="false"){
      return applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT");
    }
    return false;
  }, 
  initActions: function () {
    var scope = this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    scope.view.flxEditOptions.isVisible = false;
    var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
	var flowType = transferModulePresentationController.getFlowType();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.btnTransfer.onClick=function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var cm=applicationManager.getConfigurationManager();
      if(cm.isFastTransfersFlowEnabled()){
        var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
        moneyMovementPresentationController.haveLimitsBeenFetched = false;
        moneyMovementPresentationController.initializeStateData(false, "");
        moneyMovementPresentationController.setTransferToAccountFromManageFlow();
      }
      else{
        var transMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferEuropeUIModule");
        transMod.presentationController.setTransferToInfo();
        navManager.setEntryPoint("makeatransfer","frmManageTransferRecipientInfo");
      }
    };
    this.view.customHeader.flxBack.onClick = function () {
		var navMan=applicationManager.getNavigationManager();
		navMan.goBack();
    };
    this.view.customHeader.btnRight.onClick = function() {
      if(scope.isEditLinkedCustomerAvailable){
        scope.view.btnEditLinkedCustomer.setVisibility(true);
        scope.view.lblSeparatorPopupDocuments.setVisibility(true);
      }
      else{
        scope.view.btnEditLinkedCustomer.setVisibility(false);
        scope.view.lblSeparatorPopupDocuments.setVisibility(false);
      }
      scope.view.flxEditOptions.isVisible = true;
    };
    this.view.flxEditOptions.onClick = function(){
      scope.view.flxEditOptions.setVisibility(false);
    };
    this.view.btnEditRecipientDetails.onClick = function(){
      scope.editBenificiaryName();
    };
    this.view.btnEditLinkedCustomer.onClick = function(){
      scope.view.flxEditOptions.setVisibility(false);
      var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferEuropeUIModule");
      navManager.setEntryPoint("contracts",navManager.getCurrentForm());
      transferMod.presentationController.setFlowType("editTransfer");
      transferMod.presentationController.commonFunctionForNavigation({"friendlyName": "ManageActivitiesUIModule/frmContracts","appName": "TransfersMA"});
    }
    this.view.btnDeleteRecipient.onClick = function () {
      transferModulePresentationController.setFlowType(flowType);
      var basicConfig = {message: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfers.deleteAlertMessage"),alertIcon:null,alertType: constants.ALERT_TYPE_CONFIRMATION,yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                         noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"), alertHandler: scope.deleteHandler
                        };
      var pspConfig = {};
      applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
    };
  },
  editBenificiaryName:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    transferModulePresentationController.commonFunctionForNavigation("frmManageEditRecipient");
  },
  deleteHandler:function(response){
    if(response === true){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
      transferModulePresentationController.deleteSameBankBenificiary();
    }
  },
  setDetails:function(accountDetails){
    this.view.lblRecipientNameValue.text=accountDetails.beneficiaryName;

    var maskedAccountNumber = "";
    if(typeof accountDetails.accountNumber ==="string"){
        maskedAccountNumber = applicationManager.getDataProcessorUtility().maskAccountNumber(accountDetails.accountNumber);
    }else{
        maskedAccountNumber = applicationManager.getDataProcessorUtility().maskAccountNumber(JSON.stringify(JSON.parse(accountDetails.accountNumber)));
    }

    this.view.lblAccountNumberValue.text=maskedAccountNumber;
    this.view.lblAccountTypeValue.text=accountDetails.accountType;
    this.view.lblNickNameValue.text=accountDetails.nickName;
    this.view.lblAccountBal.text=accountDetails.accountType;
    this.view.title=accountDetails.nickName;
    this.view.customHeader.lblLocateUs.text=accountDetails.nickName;
    this.view.lblLinkedWithValue.text = accountDetails.noOfCustomersLinked +applicationManager.getPresentationUtility().getStringFromi18n("i18n.payments.customerIDs");
    var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    if(transferModulePresentationController.getFlowType()==="InternationalRecipients"){
      if(accountDetails.countryName){
      		this.view.lblBankName.text=accountDetails.bankName+","+accountDetails.countryName;
      		this.view.lblBankBranchValue.text=accountDetails.bankName+","+accountDetails.countryName;
      }
      else{
        this.view.lblBankName.text=accountDetails.bankName;
      	this.view.lblBankBranchValue.text=accountDetails.bankName;
      }
      this.view.flxAccounts.isVisible=true;
      this.view.lblRoutingNumberValue.isVisible=true;
      this.view.lblRoutingNumberValue.text=accountDetails.swiftCode;
      this.view.lblRoutingNumber.isVisible=true;
      this.view.flxSeparatorRounteNo.isVisible = true;
      this.view.lblRoutingNumber.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.SwiftCode");
      this.view.imgBank.isVisible=false;
     // this.view.imgBank.src="externalbank.png";
    }
    else if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
      this.view.lblBankName.text=accountDetails.bankName;
      this.view.lblBankBranchValue.text=accountDetails.bankName;
      this.view.flxAccounts.isVisible=false;
      this.view.lblRoutingNumberValue.isVisible=false;
      this.view.lblRoutingNumber.isVisible=false;
      this.view.flxSeparatorRounteNo.isVisible = false;
      this.view.imgBank.isVisible=false;
    }
    else{
      this.view.lblBankName.text=accountDetails.bankName;
      this.view.lblBankBranchValue.text=accountDetails.bankName;
      this.view.flxAccounts.isVisible=true;
      this.view.lblRoutingNumberValue.isVisible=true;
      this.view.lblRoutingNumberValue.text=accountDetails.routingNumber;
      this.view.lblRoutingNumber.isVisible=true;
      this.view.flxSeparatorRounteNo.isVisible = true;
      this.view.lblRoutingNumber.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.RoutingNumber");
      this.view.imgBank.isVisible=false;
    //  this.view.imgBank.src="externalbank.png";
    }
  },
  setContractDetails:function(){
    var transferModulePresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferEuropeUIModule");
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("contracts", navMan.getCurrentForm());
    var flowType = transferModulePresentationController.presentationController.getFlowType();
    navMan.setCustomInfo("flowType",flowType);
    var featureAction = transferModulePresentationController.presentationController.getFeatureAction(flowType);
    transferModulePresentationController.presentationController.setFlowType("editTransfer");
    transferModulePresentationController.presentationController.getContractDetails(featureAction);
  },
  
  bindGenericError : function(errorMsg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  
  editOptionsForIphone: function(){
    var scope = this;
    if (applicationManager.getDeviceUtilManager().isIPhone()) {
      var actionSheetObject = new kony.ui.ActionSheet({
        "title": null,
        "message": null,
        "showCompletionCallback": null
      });
      applicationManager.actionSheetObject = actionSheetObject;
      var actionNickName = new kony.ui.ActionItem({
        "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.AccInfoEdit.Title"),
        "style": constants.ACTION_STYLE_DEFAULT,
        "action": scope.editBenificiaryName
      });
      applicationManager.actionSheetObject = actionSheetObject;
      var actionLinkedCustomer = new kony.ui.ActionItem({
        "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb/billpay.EditLinkedId"),
        "style": constants.ACTION_STYLE_DEFAULT,
        "action": scope.view.btnEditLinkedCustomer.onClick
      });
      applicationManager.actionSheetObject = actionSheetObject;
      var actionCancel = new kony.ui.ActionItem({
        "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.tab.common.CANCEL"),
        "style": constants.ACTION_ITEM_STYLE_CANCEL,
        "action": scope.view.flxEditOptions.onClick
      });      
      actionSheetObject.addAction(actionNickName);
      if (scope.isEditLinkedCustomerAvailable)
        actionSheetObject.addAction(actionLinkedCustomer);
      actionSheetObject.addAction(actionCancel);
      actionSheetObject.show();
    }
  }
});