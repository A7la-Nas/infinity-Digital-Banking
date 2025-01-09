define({
    init: function() {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    initActions: function() {
        var scope = this;
        this.view.customHeader.flxBack.onClick = scope.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = scope.onClickCancel;
        this.view.btnContinue.onClick = scope.viewRequestOnClick;
        var navMan = applicationManager.getNavigationManager();
        var navigateToForm = navMan.getEntryPoint("editbeneficiary");
        if (navigateToForm === "frmBeneficiaryDetailsEurope") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.TransfersEurope.EditBenNickname");
		this.view.customHeader.lblLocateUs.left = "80dp";
        var beneficiaryData = navMan.getCustomInfo("frmEuropeTransferToAccountNewBenName");
		this.assignEditedDataToForm(beneficiaryData);
		} else {
		this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.Beneficiary.Nickname");
		var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
        var beneficiaryAddData = transferModulePresentationController.getBenificiaryData();
		this.assignDataToForm(beneficiaryAddData);
		} 
    this.enableContinueButton();
  },
    preShow: function() {
        this.initActions();
        this. renderTitleBar();
        this.view.txtBenNickName.onTextChange = this.enableContinueButton;
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    renderTitleBar: function() {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
      this.view.flxHeader.setVisibility(false);
      this.view.flxMain.top = "0dp";
    }
  },
    onClickCancel: function() {
        var navManager = applicationManager.getNavigationManager();
        var navigateToForm = navManager.getEntryPoint("editbeneficiary");
        if (navigateToForm==="frmBeneficiaryDetailsEurope") {
            var transferEurModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
            transferEurModPresentationController.commonFunctionForNavigation({"friendlyName" : "ManageActivitiesUIModule/frmBeneficiaryDetailsEurope", "appName" : "TransfersMA"});
        } else {
            var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
            transferModPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
        }
    },
    flxBackOnClick: function() {
        var navMan = applicationManager.getNavigationManager();
        navMan.goBack();
    },
    viewRequestOnClick: function() {
        var navManager = applicationManager.getNavigationManager();
        var navigateToForm = navManager.getEntryPoint("editbeneficiary");
        if (navigateToForm === "frmBeneficiaryDetailsEurope") {
                var beneficiaryData = navManager.getCustomInfo("frmEuropeTransferToAccountNewBenName");
                this.saveChangedBeneficiaryDetails(beneficiaryData);
            } else {
                this.onSubmitNickName();
            }
    },
   assignEditedDataToForm: function(beneficiaryData){
   if (beneficiaryData !== "" && beneficiaryData !== null && beneficiaryData !== undefined) {
    this.view.txtBenNickName.text = (beneficiaryData.nickName && beneficiaryData.nickName !== "" && beneficiaryData.nickName !== null && beneficiaryData.nickName !== undefined) ? beneficiaryData.nickName : ""; }
   },
   assignDataToForm: function(beneficiaryAddData) {
    this.view.txtBenNickName.text = (beneficiaryAddData.nickName && beneficiaryAddData.nickName !== "" && beneficiaryAddData.nickName !== null && beneficiaryAddData.nickName !== undefined) ? beneficiaryAddData.nickName : "";
	},
    saveChangedBeneficiaryDetails: function(data) {
        var scopeObj = this;
        var params = {};
		params["accountNumber"] = data.IBAN ? data.IBAN : data.accountNumber;
        params["nickName"] = scopeObj.view.txtBenNickName.text;
        if (data.nickName !== params.nickName) {
            data["nickName"] = scopeObj.view.txtBenNickName.text;
        }
      	params["payeeId"] = data.Id;
        params["isSameBankAccount"] = data.isSameBankAccount;
        params["isInternationalAccount"] = data.isInternationalAccount;
      	data.successMessage = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.updateBillPayPayeeNickNameSuccess");
        var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
        transferModulePresentationController.saveChangedBeneficiaryDetails(data, params);
    },
    onSubmitNickName: function() {
        var data = {};
        var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
        if (this.view.txtBenNickName.text !== "") {
            data = {
                "nickName": this.view.txtBenNickName.text
            };
            transferModulePresentationController.navigateToVerifyDetailsFromNickName(data);
        }
        
    },
    enableContinueButton: function() {
        var navMan = applicationManager.getNavigationManager();
        var navigateToForm = navMan.getEntryPoint("editbeneficiary");
        if (navigateToForm === "frmBeneficiaryDetailsEurope") {
        var editedNickname = navMan.getCustomInfo("frmEuropeTransferToAccountNewBenName");
        if (this.view.txtBenNickName.text !== editedNickname.nickName && this.view.txtBenNickName.text !== "" && this.view.txtBenNickName.text !== null) {
            this.view.btnContinue.setEnabled(true);
            this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        } else {
            this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
            this.view.btnContinue.setEnabled(false);
        } 
        } else {
          if (this.view.txtBenNickName.text !== "") {
              this.view.btnContinue.setEnabled(true);
            this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        } else {
            this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
            this.view.btnContinue.setEnabled(false);

        }
        }
        this.view.forceLayout();
    },
});