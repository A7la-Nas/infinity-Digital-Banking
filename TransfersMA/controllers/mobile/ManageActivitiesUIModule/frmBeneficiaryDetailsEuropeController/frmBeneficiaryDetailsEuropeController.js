define({
  data : {},
  benificiaryData: null,
  isEditLinkedCustomerAvailable : false,
  onNavigate: function() {
    this.pauseNavigation();	
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("createEuropeExternalBenificiaries","frmBeneficiaryDetailsEurope");
    navMan.setEntryPoint("contracts", "frmBeneficiaryDetailsEurope");
    var flowType = transferModulePresentationController.getFlowType();
    var featureAction = transferModulePresentationController.getFeatureAction(flowType);
    var successCallback = function() {     
      this.resumeNavigation();
    }.bind(this);
    var failureCallback = function() {
      this.isEditLinkedCustomerAvailable = false;
      this.resumeNavigation();
    }.bind(this);
    transferModulePresentationController.setFlowType("editTransfer");
   // var RegionalPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transferModulePresentationController.getContractDetails(featureAction, successCallback, failureCallback);    
  },
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
    scope.view.btnBack.onClick=function(){
      var paymentMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
      paymentMod.presentationController.showDashboard();
    };
  },
   preShow:function () {
	this.initActions();
	this.renderTitleBar();
	this.populateDetails();
	this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.btnBack.onClick=this.navigateToMakeaPayment;
    var navMan=applicationManager.getNavigationManager();
    navMan.setEntryPoint("editbeneficiary", "frmBeneficiaryDetailsEurope");
	},
  initActions: function () {
	var scope=this;
    this.view.customHeader.btnRight.onClick=function(){
    scope.blockBackgroundonAdditionalOptions();
    };
	this.view.flxCancel.onTouchStart = function(){
      scope.enableBackgroundonCloseAdditionalOptions();
    };
	this.view.flxNickname.onTouchStart = this.navigateToNickName;
	this.view.flxAddress.onTouchStart = this.navigateToAddress;
	/*this.view.flxPhonenumber.onTouchStart = this.navigateToPhonenumber;
	this.view.flxEmailID.onTouchStart = this.navigateToEmailID;*/
    this.view.flxPhonenumber.isVisible = false;
    this.view.flxEmailID.isVisible = false;
    this.view.flxRemoveBeneficiary.onTouchStart = this.deleteBeneficiaryConfirmation;
    this.view.flxEditLinkedCustomer.onTouchStart = this.navigateToContract;
    if (this.isEditLinkedCustomerAvailable) {
      this.view.flxEditLinkedCustomer.setVisibility(true);
    } else {
      this.view.flxEditLinkedCustomer.setVisibility(false);
    }
	},
     navigateToMakeaPayment: function() {
    var navMan = applicationManager.getNavigationManager();
	if(scope_configManager.TransferFlowType === "UTF"){
     navMan.navigateTo("UnifiedTransferFlowUIModule/frmSelectTransferTypeNew");
    } else {
    navMan.setEntryPoint("europeTransferFlow", "frmEuropeManageBeneficiaries");
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.setTransferToAccountFromManageFlow();
	 }
    },
  	navigateToContract: function() {
      //             
      var navMan = applicationManager.getNavigationManager();
      var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
      navMan.setEntryPoint("contracts",navMan.getCurrentForm());
      transferModulePresentationController.setFlowType("editTransfer");
      //transferModulePresentationController.commonFunctionForNavigation({"friendlyName": "ManageActivitiesUIModule/frmContracts","appName": "TransfersMA"});
	  transferModulePresentationController.commonFunctionForNavigation("ManageActivitiesUIModule/frmContracts");

    },
	navigateToNickName: function() {
        //var nickNameMod = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
        var navMan=applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmEuropeTransferToAccountNewBenName",this.data);
        navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "TransferEuropeUIModule/frmEuropeTransferToAccountNewBenName"});
    },
    navigateToAddress:function(){
    //var addressMod = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
    var navMan=applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmBenAddressEurope",this.data);
    navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "TransferEuropeUIModule/frmBenAddressEurope"});
	},
	navigateToPhonenumber:function(){
    var phoneNumberMod = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
    phoneNumberMod.commonFunctionForNavigation("frmTransfersPhoneNumberEurope");
	},
	navigateToEmailID:function(){
    var emailIDMod = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
    emailIDMod.commonFunctionForNavigation("frmBenEmailAddressEurope");
	},
  renderTitleBar: function() {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    }
	},
  populateDetails:function(){
	var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
    var navMan = applicationManager.getNavigationManager();
    var benificiaryData = navMan.getCustomInfo("frmBeneficiaryDetailsEurope");
	this.view.lblBenNameValue.text = benificiaryData.beneficiaryName || "-";
    var benStatus = "";
    if(benificiaryData.payeeStatus && benificiaryData.payeeStatus.toUpperCase()=== "PENDING"){
      benStatus =kony.i18n.getLocalizedString("i18n.accounts.pending");
    }else {
      benStatus =kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE");
    }
    this.view.lblDate.text = benStatus;
    if(benStatus){
      this.view.FlexStatus.setVisibility(true);
    } else{
      this.view.FlexStatus.setVisibility(false);
    }
	this.view.lblAccountNoValue.text = benificiaryData.accountNumber || "-";
	this.view.lblPaymentMethodValue.text = benificiaryData.paymentMethod || "-";
    if (benificiaryData.paymentMethod !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transferEurope.WithinBank")){
      	this.view.flxSwiftCode.isVisible = true;
		    this.view.lblSwiftCodeValue.text = benificiaryData.swiftCode || "-";
    }  
    else {
      this.view.flxSwiftCode.isVisible = false;
    }
    var bankName;
    if(benificiaryData.bankName) {
      if(benificiaryData.bankName.length > 105){
        this.view.flxBankAddress.height = "100dp";
        this.view.flxBankAddressValue.height = "75dp";
        bankName = benificiaryData.bankName.substr(0,104) + "....";
      } else {
        this.view.flxBankAddress.height = "60dp";
        this.view.flxBankAddressValue.height = "25dp";
        bankName = benificiaryData.bankName;
      }
    }
    this.view.lblBankAddressValue.text = bankName || "-";
	this.view.lblNicknameBen.text = benificiaryData.nickName || "-";
	this.view.lblBenAddress.text = benificiaryData.address || "-";
	this.view.lblBenPhoneNumber.text = benificiaryData.phoneNumber || "-";
	this.view.lblBenEmailAddress.text = benificiaryData.email || "-";
    // linked with data
    if (benificiaryData.noOfCustomersLinked) {
    	this.view.lblLinkedWith.text = benificiaryData.noOfCustomersLinked + kony.i18n.getLocalizedString("i18n.payments.customerIDsWithBracket");
      	this.view.flxLinkedWithCustomers.setVisibility(true);
    } else {
      	this.view.flxLinkedWithCustomers.setVisibility(false);
    }    
    this.data = benificiaryData;
    this.view.flxBenConfirmation.setEnabled(true);
    this.view.flxAdditionalOptions.setVisibility(false);
  },
  showEditBeneficiaryAck:function(){
   var navMan = applicationManager.getNavigationManager();
   var benificiaryEditedData = navMan.getCustomInfo("frmBeneficiaryDetailsEurope");
   this.view.lblNicknameBen.text = benificiaryEditedData.nickName || "-";
  },
   deleteBeneficiaryConfirmation: function() {
      var scope = this;
       var navMan = applicationManager.getNavigationManager();
      this.benificiaryData = navMan.getCustomInfo("frmBeneficiaryDetailsEurope");
      var message = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.EuropeTransfer.DoYouWantToRemove") + " " + this.benificiaryData.beneficiaryName + "? " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.EuropeTransfer.ThisCannotReverse");
      var basicProperties =
          {
            "message": message,
            "alertType": constants.ALERT_TYPE_CONFIRMATION,
            "alertTitle": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.RemoveBeneficiary"),
            "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.EuropeTransfer.YesRemove"),
            "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.tab.common.No"),
            "alertIcon": "",
            "alertHandler": scope.removeBeneficiary
          };
      applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
    },
	
  removeBeneficiary: function(response) {
      if (response === true) {
      	var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
      	transferModulePresentationController.deleteBeneficiary(this.benificiaryData);
      }
    },
  
  goBack: function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({"appName":"TransfersMA","friendlyName":"ManageActivitiesUIModule/frmEuropeManageBeneficiaries"});
    },
  
   blockBackgroundonAdditionalOptions : function(){
	var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var beneficiaryDetails = navManager.getCustomInfo("frmBeneficiaryDetailsEurope");
   var isDeleteBeneficiaryAccessible = "";
   if (beneficiaryDetails.isInternationalAccount === "false" && beneficiaryDetails.isSameBankAccount === "false") {
   isDeleteBeneficiaryAccessible = applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT");
    } else if (beneficiaryDetails.isInternationalAccount === "true" && beneficiaryDetails.isSameBankAccount === "false") {
	isDeleteBeneficiaryAccessible = applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT");
	} else if (beneficiaryDetails.isInternationalAccount === "false" && beneficiaryDetails.isSameBankAccount === "true") {
	isDeleteBeneficiaryAccessible = applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT");
	}
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
       "action": this.navigateToNickName
       });
	applicationManager.actionSheetObject = actionSheetObject;
       var actionAddress = new kony.ui.ActionItem({
       "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfileEditAddress.Title"),
       "style": constants.ACTION_STYLE_DEFAULT,
       "action": this.navigateToAddress
       });
      applicationManager.actionSheetObject = actionSheetObject;
       var actionLinkedCustomer = new kony.ui.ActionItem({
       "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb/billpay.EditLinkedId"),
       "style": constants.ACTION_STYLE_DEFAULT,
        "action": this.navigateToContract
	});
	/*applicationManager.actionSheetObject = actionSheetObject;
       var actionPhoneNumber = new kony.ui.ActionItem({
       "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.EditPhonenumber"),
       "style": constants.ACTION_STYLE_DEFAULT,
       "action": this.navigateToPhonenumber
       });
	applicationManager.actionSheetObject = actionSheetObject;
       var actionEmailAddress = new kony.ui.ActionItem({
       "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.EditEmailAddress"),
       "style": constants.ACTION_STYLE_DEFAULT,
       "action": this.navigateToEmailID
       });*/
    applicationManager.actionSheetObject = actionSheetObject;
       var actionRemoveBeneficiary = new kony.ui.ActionItem({
       "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.RemoveBeneficiary"),
       "style": constants.ACTION_STYLE_DEFAULT,
       "action": this.deleteBeneficiaryConfirmation
       });
	applicationManager.actionSheetObject = actionSheetObject;
       var actionCancel = new kony.ui.ActionItem({
       "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.tab.common.CANCEL"),
       "style": constants.ACTION_ITEM_STYLE_CANCEL,
        "action": this.enableBackgroundonCloseAdditionalOptions
	});      
      if(isDeleteBeneficiaryAccessible){
       actionSheetObject.addAction(actionNickName);
       actionSheetObject.addAction(actionAddress);
       if (this.isEditLinkedCustomerAvailable)
        actionSheetObject.addAction(actionLinkedCustomer);
       //actionSheetObject.addAction(actionPhoneNumber);
       //actionSheetObject.addAction(actionEmailAddress);
        actionSheetObject.addAction(actionRemoveBeneficiary);
      actionSheetObject.addAction(actionCancel);
        actionSheetObject.show();
      } else {
        actionSheetObject.addAction(actionNickName);
       actionSheetObject.addAction(actionAddress);
       if (this.isEditLinkedCustomerAvailable)
        actionSheetObject.addAction(actionLinkedCustomer);
       //actionSheetObject.addAction(actionPhoneNumber);
       //actionSheetObject.addAction(actionEmailAddress);
      actionSheetObject.addAction(actionCancel);
             actionSheetObject.show();
      }
         } else {
           if(isDeleteBeneficiaryAccessible){
	this.view.flxRemoveBeneficiary.isVisible=true;
	}else{
	this.view.flxRemoveBeneficiary.isVisible=false;
	}
	scope.view.flxBenConfirmation.setEnabled(false);
    scope.view.flxAdditionalOptions.setVisibility(true);
    if (this.isEditLinkedCustomerAvailable)
      this.view.flxEditLinkedCustomer.setVisibility(true);
    else
      this.view.flxEditLinkedCustomer.setVisibility(false);
         }
   },
  enableBackgroundonCloseAdditionalOptions : function(){
	var scope=this;
	scope.view.flxBenConfirmation.setEnabled(true);
	scope.view.flxAdditionalOptions.setVisibility(false);
	},
  
  bindGenericError : function(error) {
    applicationManager.getDataProcessorUtility().showToastMessageError(this, error);
  },

		  showSuccessPopup: function(msg) {
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, msg);
  },
  
  navigateCustomBack: function() {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName":"TransfersMA","friendlyName":"ManageActivitiesUIModule/frmEuropeManageBeneficiaries"});
    
  }
});
