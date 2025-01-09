define({
  timerCounter: 0,
  beneficiaryEditedData : null,
  init : function(){
    //var FormValidator = require("FormValidatorManager");
	//this.fv = new FormValidator(5);
	var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
 preShow: function () {
	this.renderTitleBar();
    this.initActions();
    this.view.txtResidentialAddressNickName.onTextChange = this.enableContinueButton;
    this.view.txtResidentialAddressCity.onTextChange = this.enableContinueButton;
    this.view.txtResidentialAddressDummy.onTextChange = this.enableContinueButton;
    this.view.txtResidentialAddressZipCode.onTextChange = this.enableContinueButton;
    this.view.txtResidentialAddressLineOne.onTextChange = this.enableContinueButton;
  },
  renderTitleBar: function() {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
      this.view.flxHeaderPersonalInfo.setVisibility(false);
      this.view.flxEnterPersonalInfo.top = "0dp";
    }
  },
  initActions:function(){
    var scope=this;
    //this.fv.submissionView(this.view.btnContinueResidentialAddress);
    //this.view.txtResidentialAddressNickName.onTextChange = this.validateAddressNickName;
    //this.view.txtResidentialAddressCity.onTextChange = this.validateCity;
    //this.view.txtResidentialAddressLineOne.onTextChange = this.validateAddressLineOne;
    //this.view.txtResidentialAddressZipCode.onTextChange = function(){
    /*  var text = scope.view.txtResidentialAddressZipCode.text;
      NUOMod.presentationController.isValidZipCode(text,"frmOBResidentialAddress");
    };*/
   // this.view.txtResidentialAddressDummy.onTextChange = this.validateCountry;   
    this.view.customHeaderPersonalInfo.flxBack.onClick = scope.flxBackOnClick;
    this.view.customHeaderPersonalInfo.btnRight.onClick = scope.onClickCancel;
    this.view.btnContinueResidentialAddress.onTouchStart = scope.viewRequestOnClick;
    var navMan = applicationManager.getNavigationManager();
    var navigateToForm = navMan.getEntryPoint("editbeneficiary");
    if (navigateToForm === "frmBeneficiaryDetailsEurope") {
    this.view.customHeaderPersonalInfo.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.TransfersEurope.EditBenAdress");
    this.view.customHeaderPersonalInfo.lblLocateUs.left = "80dp";
    this.beneficiaryEditedData = navMan.getCustomInfo("frmBenAddressEurope");
    this.assignEditedDataToForm(this.beneficiaryEditedData);
    }else{
    this.view.customHeaderPersonalInfo.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.TansfersEurope.BeneficiaryAddress");
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var benificiaryData=transferModulePresentationController.getBenificiaryData();
    this.assignDataToForm(benificiaryData);
    } 
    this.enableContinueButton();
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
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  /*validateAddressNickName:function(){
    var text = this.view.txtResidentialAddressLineOne.text;
    this.fv.checkAndUpdateStatusForNull(0, text);
  },
  validateAddressLineOne :function(){
    var text = this.view.txtResidentialAddressLineOne.text;
    this.fv.checkAndUpdateStatusForNull(1, text);
  },
  validateCity:function(){
    var text = this.view.txtResidentialAddressCity.text;
    this.fv.checkAndUpdateStatusForNull(2, text);
  },
  validateZipCode : function(){
   var text = this.view.txtResidentialAddressZipCode.text;
    this.fv.checkAndUpdateStatusForNull(3, text);
  },
  validateCountry : function(){
    var text = this.view.txtResidentialAddressDummy.text;
    this.fv.checkAndUpdateStatusForNull(4, text);
  },*/
  viewRequestOnClick: function() {
    var navManager = applicationManager.getNavigationManager();
    var navigateToForm = navManager.getEntryPoint("editbeneficiary");
    if (navigateToForm === "frmBeneficiaryDetailsEurope") {
    //var beneficiaryData = navManager.getCustomInfo("frmBenAddressEurope");
    this.saveChangedBeneficiaryDetails(this.beneficiaryEditedData);
    } else {
     this.onSubmitAddress();
     }
    },
  
  saveChangedBeneficiaryDetails: function(data) {
        var scopeObj = this;
        var params = {};
        if (JSON.parse(data.isSameBankAccount) || JSON.parse(data.isInternationalAccount)) {
            params["accountNumber"] = data.IBAN ? data.IBAN : data.accountNumber;
        } else {
            params["IBAN"] = data.IBAN ? data.IBAN : data.accountNumber;
        }
        params["addressLine1"] = scopeObj.view.txtResidentialAddressNickName.text;
        params["addressLine2"] = scopeObj.view.txtResidentialAddressLineOne.text;
        params["city"] = scopeObj.view.txtResidentialAddressCity.text;
        params["zipcode"] = scopeObj.view.txtResidentialAddressZipCode.text;
        params["country"] = scopeObj.view.txtResidentialAddressDummy.text;
        if (data.addressLine1 !== params.addressLine1) {
            data["addressLine1"] = scopeObj.view.txtResidentialAddressNickName.text;
        }
        if (data.addressLine2 !== params.addressLine2) {
            data["addressLine2"] = scopeObj.view.txtResidentialAddressLineOne.text;
        }
        if (data.city !== params.city) {
            data["city"] = scopeObj.view.txtResidentialAddressCity.text;
        }
        if (data.zipcode !== params.zipcode) {
            data["zipcode"] = scopeObj.view.txtResidentialAddressZipCode.text;
        }
        if (data.country !== params.country) {
            data["country"] = scopeObj.view.txtResidentialAddressDummy.text;
        }
        			params["payeeId"] = data.Id;
        params["isSameBankAccount"] = data.isSameBankAccount;
        params["isInternationalAccount"] = data.isInternationalAccount;
					        data.successMessage = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.updateBillPayPayeeAddressSuccess");
        var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
        transferModulePresentationController.saveChangedBeneficiaryDetails(data, params);
    },
  onSubmitAddress:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var data ={};
	var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if(this.view.txtResidentialAddressNickName.text && this.view.txtResidentialAddressNickName.text !== ""){
     data ={
      "addressLine2" : (this.view.txtResidentialAddressLineOne.text && this.view.txtResidentialAddressLineOne.text !== "")  ? this.view.txtResidentialAddressLineOne.text : "",
      "addressLine1" :(this.view.txtResidentialAddressNickName.text && this.view.txtResidentialAddressNickName.text !== "")  ? this.view.txtResidentialAddressNickName.text : "",
      "city" :(this.view.txtResidentialAddressCity.text && this.view.txtResidentialAddressCity.text !== "")  ? this.view.txtResidentialAddressCity.text : "",
      "zipcode" :(this.view.txtResidentialAddressZipCode.text && this.view.txtResidentialAddressZipCode.text !== "")  ? this.view.txtResidentialAddressZipCode.text : "",
      "country" :(this.view.txtResidentialAddressDummy.text && this.view.txtResidentialAddressDummy.text !== "")  ? this.view.txtResidentialAddressDummy.text : "",      
    
     };
      transferModulePresentationController.navigateBackToVerifyDetails(data);
    }
    else if (this.view.txtResidentialAddressNickName.text === "" &&
             (this.view.txtResidentialAddressLineOne.text)||
             (this.view.txtResidentialAddressCity.text) ||
             (this.view.txtResidentialAddressZipCode.text) ||
             (this.view.txtResidentialAddressDummy.text))
    {
      this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.EnterAddressNickName"));
    }
    else{
      transferModulePresentationController.navigateBackToVerifyDetails(data);
    }
  },
  assignDataToForm : function(benficiaryData){
    this.view.txtResidentialAddressLineOne.text = (benficiaryData.addressLine2 && benficiaryData.addressLine2 !== "" && benficiaryData.addressLine2 !== null) ? benficiaryData.addressLine2 : "";
    this.view.txtResidentialAddressNickName.text = (benficiaryData.addressLine1 && benficiaryData.addressLine1 !== "" && benficiaryData.addressLine1 !== null) ? benficiaryData.addressLine1 : "";
    this.view.txtResidentialAddressDummy.text = (benficiaryData.country && benficiaryData.country !== "" && benficiaryData.country !== null) ? benficiaryData.country : "";
    this.view.txtResidentialAddressState.text = (benficiaryData.state && benficiaryData.state !== "" && benficiaryData.state !== null)?benficiaryData.state:"";
    this.view.txtResidentialAddressZipCode.text = (benficiaryData.zipcode && benficiaryData.zipcode !== "" && benficiaryData.zipcode !== null)?benficiaryData.zipcode:"";
    this.view.txtResidentialAddressCity.text = (benficiaryData.city && benficiaryData.city !== "" && benficiaryData.city !== null)?benficiaryData.city:"";
  },
   assignEditedDataToForm: function(beneficiaryEditedData)
  {
    this.view.txtResidentialAddressNickName.text = (beneficiaryEditedData.addressLine1 && beneficiaryEditedData.addressLine1 !== "" && beneficiaryEditedData.addressLine1 !== null) ? beneficiaryEditedData.addressLine1 : "";
    this.view.txtResidentialAddressLineOne.text = (beneficiaryEditedData.addressLine2 && beneficiaryEditedData.addressLine2 !== "" && beneficiaryEditedData.addressLine2 !== null) ? beneficiaryEditedData.addressLine2 : "";
    this.view.txtResidentialAddressDummy.text = (beneficiaryEditedData.country && beneficiaryEditedData.country !== "" && beneficiaryEditedData.country !== null) ? beneficiaryEditedData.country : "";
    this.view.txtResidentialAddressState.text = (beneficiaryEditedData.state && beneficiaryEditedData.state !== "" && beneficiaryEditedData.state !== null) ? beneficiaryEditedData.state : "";
    this.view.txtResidentialAddressZipCode.text = (beneficiaryEditedData.zipcode && beneficiaryEditedData.zipcode !== "" && beneficiaryEditedData.zipcode !== null) ? beneficiaryEditedData.zipcode : "";
    this.view.txtResidentialAddressCity.text = (beneficiaryEditedData.city && beneficiaryEditedData.city !== "" && beneficiaryEditedData.city !== null) ? beneficiaryEditedData.city : "";
    },
  bindViewError : function(msg)
  {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
    //this.view.btnContinueResidentialAddress.skin = "sknBtnOnBoardingInactive";
   // this.view.btnContinueResidentialAddress.setEnabled(false);
  },
   enableContinueButton:function(){
    var navMan = applicationManager.getNavigationManager();
    var navigateToForm = navMan.getEntryPoint("editbeneficiary");
     if (navigateToForm === "frmBeneficiaryDetailsEurope") {
    var editedAddress = navMan.getCustomInfo("frmBenAddressEurope");
    var addressLine1 = this.view.txtResidentialAddressNickName.text;
    var city = this.view.txtResidentialAddressCity.text;
    var country = this.view.txtResidentialAddressDummy.text;
    var zipcode = this.view.txtResidentialAddressZipCode.text;
    var addressLine2 = this.view.txtResidentialAddressLineOne.text;
    if (addressLine1 !== editedAddress.addressLine1 || addressLine2 !== editedAddress.addressLine2 || city !== editedAddress.city || country !== editedAddress.country || zipcode !== editedAddress.zipcode) {
    this.view.btnContinueResidentialAddress.setEnabled(true);
    this.view.btnContinueResidentialAddress.skin = "sknBtn0095e4RoundedffffffSSP26px";
       } else { 
    this.view.btnContinueResidentialAddress.setEnabled(false);
    this.view.btnContinueResidentialAddress.skin = "sknBtnE2E9F0Rounded";
  } 
     } else { 
  if (this.view.txtResidentialAddressNickName.text !== "" || this.view.txtResidentialAddressCity.text !== "" || this.view.txtResidentialAddressDummy.text !== "" || this.view.txtResidentialAddressZipCode.text !== "") {
    this.view.btnContinueResidentialAddress.setEnabled(true);
    this.view.btnContinueResidentialAddress.skin = "sknBtn0095e4RoundedffffffSSP26px";
       } else { 
    this.view.btnContinueResidentialAddress.setEnabled(false);
    this.view.btnContinueResidentialAddress.skin = "sknBtnE2E9F0Rounded";
  } 
  
}
  },
  disableContinueButton: function() {
    this.view.btnContinueResidentialAddress.setEnabled(false);
    this.view.btnContinueResidentialAddress.skin = "sknBtna0a0a0SSPReg26px";
  },
});
