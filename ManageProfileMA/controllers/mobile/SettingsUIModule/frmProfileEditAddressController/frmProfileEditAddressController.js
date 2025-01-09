define({
  init : function(){
    var FormValidator = require("FormValidatorManager")
	this.fv = new FormValidator(4);
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.lstbxCity.onSelection=this.citySelection;
    this.view.lstbxCountry.onSelection=this.countrySelection;
    this.view.lstbxState.onSelection=this.stateSelection;
  },
  preShow: function () {
    this.setPreshowData();
    this.setFlowActions();
    this.setDataToForm();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    this.restrictSpecialCharacterSet();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setPreshowData : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    }
    this.fv.submissionView(this.view.btnContinueResidentialAddress);
    this.view.btnDeleteAddress.setVisibility(true);
  },
  setFlowActions : function(){
	var scope = this;
    this.view.customHeader.flxBack.onClick = this.onBack;
    this.view.customHeader.btnRight.onClick = this.onCancel;
    this.view.txtResidentialAddressLineOne.onTextChange = this.validateAddressLineOne;
    this.view.txtResidentialAddressCity.onTextChange = this.validateCity;
    this.view.txtResidentialAddressState.onTextChange = this.validateState;
    this.view.txtResidentialAddressZipCode.onTextChange =function(){
      if((scope.view.txtResidentialAddressZipCode.text).trim().length>4){
       var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    	settingsMod.presentationController.isValidZipCode(scope.view.txtResidentialAddressZipCode.text,"frmProfileEditAddress");
      } else{
        scope.view.btnContinueResidentialAddress.skin = "sknBtnOnBoardingInactive";
        scope.view.btnContinueResidentialAddress.setEnabled(false);
      }
    
    }
    this.view.txtCountry.onTextChange = this.validateCountry;
    this.view.btnContinueResidentialAddress.onClick = this.submitEditedAddress;
    this.view.btnDeleteAddress.onClick = this.deletedAddress;
  },
  restrictSpecialCharacterSet: function(){
    var scopeObj = this;
    scopeObj.view.txtResidentialAddressZipCode.restrictCharactersSet = "!@#&*_'-.~^|$%()+=}{][/|?,><`:;\"\\" ;
  },
  onBack : function () {
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  onCancel : function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
  },
  validateAddressLineOne :function(){
    var text = this.view.txtResidentialAddressLineOne.text;
    this.fv.checkAndUpdateStatusForNull(0, text);
  },
  validateCity:function(){
    var text = this.view.txtResidentialAddressCity.text;
    this.fv.checkAndUpdateStatusForNull(1, text);
  },
  validateZipCode : function(){
    var text = this.view.txtResidentialAddressZipCode.text;
    this.fv.checkAndUpdateStatusForNull(2, text);
  },
  validateCountry : function(){
    var text = this.view.txtCountry.text;
    this.fv.checkAndUpdateStatusForNull(3, text);
  },
  validateFormUI : function(){
    var formValues =[];
    formValues.push(this.view.txtResidentialAddressLineOne.text);
    formValues.push(this.view.txtResidentialAddressCity.text);
    formValues.push(this.view.txtResidentialAddressZipCode.text);
    formValues.push(this.view.lstbxCountry.selectedKey);
    this.fv.preshowCheck(formValues);
  },
  deletedAddress : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    //var addData = navManager.getCustomInfo("frmProfileEditAddress");
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var addData = settingsMode.presentationController.getUserAddressData();
    var data = {
      "addressId" : addData.addressId
    };
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.deleteProfileAddress(data);
  },
  submitEditedAddress : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var data = {
      "addressLine1" : this.view.txtResidentialAddressLineOne.text,
      "addressLine2" : this.view.txtResidentialAddressLineTwo.text,
      "state":(this.view.lstbxState.selectedKey!=='lbl1')?this.view.lstbxState.selectedKeyValue[1]:"",
      "city":this.view.txtResidentialAddressCity.text,
      "country":this.view.lstbxCountry.selectedKeyValue[1],
      "zipcode" : this.view.txtResidentialAddressZipCode.text,
      "countryId":this.view.lstbxCountry.selectedKeyValue[0],
      "countryCode":this.view.lstbxCountry.selectedKey
    };
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.updateUserAddressData(data);
    var data={
    "state":this.view.lstbxState.selectedKeyValue[0],
     // "city":this.view.lstbxCity.selectedKeyValue[0],
	  "countryId": this.view.lstbxCountry.selectedKeyValue[0]
    }
    settingsMode.presentationController.updateCityAndStateCode(data)
    settingsMode.presentationController.commonFunctionForNavigation("frmProfileAdressType");
  },
  setDataToForm : function(){
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var addressData = settingsMode.presentationController.getUserAddressData();
    this.view.txtResidentialAddressLineOne.text = (addressData.addressLine1 && addressData.addressLine1 !== "" && addressData.addressLine1 !== null)?addressData.addressLine1:"";
    this.view.txtResidentialAddressLineTwo.text = (addressData.addressLine2 && addressData.addressLine2 !== "" && addressData.addressLine2 !== null)?addressData.addressLine2:"";
    //this.view.txtResidentialAddressState.text = (addressData.state && addressData.state !== "" && addressData.state !== null)?addressData.state:"";
    this.view.txtResidentialAddressZipCode.text = (addressData.zipcode && addressData.zipcode !== "" && addressData.zipcode !== null)?addressData.zipcode:"";
    this.view.txtResidentialAddressCity.text = (addressData.city && addressData.city !== "" && addressData.city !== null)?addressData.city:"";
    //this.view.txtCountry.text = (addressData.country && addressData.country !== "" && addressData.country !== null)?addressData.country:"";
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var countryData=settingsMod.presentationController.getCountryData();
    var statesData=settingsMod.presentationController.getStatesData();
    //var cityData=settingsMod.presentationController.getCitiesData();
    this.view.lstbxCountry.masterData=countryData;
    this.view.lstbxState.masterData=statesData;
    //this.view.lstbxCity.masterData=cityData;
    if(addressData && addressData["countryId"] && addressData["countryId"] !== '')
    	this.view.lstbxCountry.selectedKey=addressData["countryId"];
    else
      this.view.lstbxCountry.selectedKey=countryData[0][0];
    this.countrySelection();
    if(addressData && addressData["stateId"] && addressData["stateId"] !== '')
      this.view.lstbxState.selectedKey=addressData["stateId"];
    else
      this.view.lstbxState.selectedKey=statesData[0][0];
    this.stateSelection();
    /*if(addressData && addressData["cityId"])
      this.view.lstbxCity.selectedKey=addressData["cityId"];
    else
      this.view.lstbxCity.selectedKey=cityData[0][0];
    this.citySelection();*/
    this.validateFormUI();
  },
  countrySelection:function(){
    this.view.lstbxState.setEnabled(true);
    this.view.lstbxCity.setEnabled(false);
    var countryCode=this.view.lstbxCountry.selectedKey;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var statesData=settingsMod.presentationController.filterStatesBasedOnCountryId(countryCode);
    var cityData=settingsMod.presentationController.getCitiesData();
    this.view.lstbxCity.masterData=cityData;
    this.view.lstbxCity.selectedKey=cityData[0][0];
    //var cityData=settingsMod.presentationController.filterCitiesBasedOnCountryIdAndStateId(countryCode,cityCode);
//     this.view.lstbxCity.masterData=cityData;
//     this.view.lstbxCity.selectedKey=cityData[0][0];
    this.view.lstbxState.masterData=statesData;
    this.view.lstbxState.selectedKey=statesData[0][0];
//     if(this.view.lstbxState.selectedKey=="lbl1"){
//       this.view.lstbxCity.setEnabled(false);
//     }
    this.checkForEnable();
    if(countryCode=="lbl1"){
      countryCode="";
    }
    this.fv.checkAndUpdateStatusForNull(3, countryCode);
  },
  stateSelection:function(){
    this.view.lstbxCity.setEnabled(true);
    var countryCode=this.view.lstbxCountry.selectedKey;
    var stateCode=this.view.lstbxState.selectedKey;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var cityData=settingsMod.presentationController.filterCitiesBasedOnCountryIdAndStateId(countryCode,stateCode);
    this.view.lstbxCity.masterData=cityData;
    this.view.lstbxCity.selectedKey=cityData[0][0];
    this.checkForEnable();
    if(stateCode=="lbl1"){
      stateCode="";
    }
    //this.fv.checkAndUpdateStatusForNull(2, stateCode);
  },
  citySelection:function(){
    var text = this.view.lstbxCity.selectedKey;
    if(text=="lbl1"){
      text="";
    }
    this.fv.checkAndUpdateStatusForNull(1, text);
  },
  checkForEnable:function(){
    if(this.view.lstbxCountry.selectedKey=="lbl1"){
      this.view.lstbxState.setEnabled(false);
      this.view.lstbxCity.setEnabled(false);
    }
    if(this.view.lstbxState.selectedKey=="lbl1"){
      this.view.lstbxCity.setEnabled(false);
    }
    /*var text = this.view.lstbxCity.selectedKey;
    if(text=="lbl1"){
      text="";
    }
    this.fv.checkAndUpdateStatusForNull(1, text);*/
    var stateCode=this.view.lstbxState.selectedKey;
    if(stateCode=="lbl1"){
      stateCode="";
    }
    //this.fv.checkAndUpdateStatusForNull(2, stateCode);
    var countryCode=this.view.lstbxCountry.selectedKey;
    if(countryCode=="lbl1"){
      countryCode="";
    }
    this.fv.checkAndUpdateStatusForNull(3, countryCode);
  },
  bindGenericError: function(msg) {
      applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
      this.view.btnContinueResidentialAddress.skin = "sknBtnOnBoardingInactive";
      this.view.btnContinueResidentialAddress.setEnabled(false);
  }
});