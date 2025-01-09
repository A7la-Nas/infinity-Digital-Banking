define({
  timerCounter: 0,
  init : function(){
    var FormValidator = require("FormValidatorManager")
	this.fv = new FormValidator(4);
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    //this.view.lstbxCity.onSelection=this.citySelection;
    this.view.lstbxCountry.onSelection=this.countrySelection;
    this.view.lstbxState.onSelection=this.stateSelection;
  },
  preShow: function () {
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    }
    this.view.flxSearch.isVisible=false;
    this.view.flxEnterAddress.top="0dp";
    this.view.flxPayeeAddress.top="40dp";
    this.view.flxMainContainer.skin = "slFbox";
	this.setPreshowData();
    this.setFlowActions();
    //this.setDataToForm();
    this.restrictSpecialCharacterSet();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setPreshowData : function(){
    this.view.customSearchbox.tbxSearch.text = "";
    this.view.flxSearchAddress.isVisible = false;
    this.view.flxMainContainer.isVisible = true;
    this.fv.submissionView(this.view.btnContinueResidentialAddress);
    this.populateData();
  },
  setFlowActions : function(){
	var scope = this;
    this.view.tbxSearch.onTouchStart = this.onSearch;
    this.view.customSearchbox.btnCancel.onClick = this.cancelSearch;
    this.view.customSearchbox.tbxSearch.onTextChange = this.onSearchingAddress;
    this.view.segAddresses.onRowClick = this.setSearchedAddress;
    this.view.txtResidentialAddressLineOne.onTextChange = this.validateAddressLineOne;
    this.view.txtResidentialAddressCity.onTextChange = this.validateCity;
    this.view.txtResidentialAddressState.onTextChange = this.validateState;
    this.view.txtResidentialAddressZipCode.onTextChange =function(){
      if((scope.view.txtResidentialAddressZipCode.text).trim().length>4){
        var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
        settingsMod.presentationController.isValidZipCode(scope.view.txtResidentialAddressZipCode.text,"frmProfileAddAddress");
      } else{
        scope.view.btnContinueResidentialAddress.skin = "sknBtnOnBoardingInactive";
        scope.view.btnContinueResidentialAddress.setEnabled(false);
      }
    };
    this.view.txtCountry.onTextChange = this.validateCountry;
    this.view.btnContinueResidentialAddress.onClick = this.onSubmitAddress;
    this.view.customHeader.flxBack.onClick = this.onBack;
    this.view.customHeader.btnRight.onClick = this.onCancel;
  },
  restrictSpecialCharacterSet: function(){
    var scopeObj = this;
    scopeObj.view.txtResidentialAddressZipCode.restrictCharactersSet = "!@#&*_'-.~^|$%()+=}{][/|?,><`:;\"\\" ;
  },
  onBack : function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  onCancel : function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
  },
  onSubmitAddress : function(){
    var addressData = {
      "addressLine1":this.view.txtResidentialAddressLineOne.text,
      "addressLine2":this.view.txtResidentialAddressLineTwo.text,
      "state":(this.view.lstbxState.selectedKey!=='lbl1')?this.view.lstbxState.selectedKeyValue[1]:"",
      "zipcode":this.view.txtResidentialAddressZipCode.text,
      "city":this.view.txtResidentialAddressCity.text,
      "country":this.view.lstbxCountry.selectedKeyValue[1],
      "countryCode":this.view.lstbxCountry.selectedKey
    };
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.updateUserAddressID();
    settingsMod.presentationController.updateUserAddressData(addressData);
     var stateAndCityCode = {
      "state":this.view.lstbxState.selectedKeyValue[0],
      "city":this.view.lstbxCity.selectedKeyValue[0]
    };
    settingsMod.presentationController.updateCityAndStateCode(stateAndCityCode);
    var navManager = applicationManager.getNavigationManager();
	settingsMod.presentationController.commonFunctionForNavigation("frmProfileAdressType");
  },
  setDataToForm : function(){
    var navManager = applicationManager.getNavigationManager();
    var addressData = navManager.getCustomInfo("frmProfileAddAddress");
    if(addressData){
      this.view.txtResidentialAddressLineOne.text = (addressData.addressLine1 && addressData.addressLine1 !== "" && addressData.addressLine1 !== null)?addressData.addressLine1:"";
      this.view.txtResidentialAddressLineTwo.text = (addressData.addressLine2 && addressData.addressLine2 !== "" && addressData.addressLine2 !== null)?addressData.addressLine2:"";
      //this.view.txtResidentialAddressState.text = (addressData.state && addressData.state !== "" && addressData.state !== null)?addressData.state:"";
      this.view.txtResidentialAddressZipCode.text = (addressData.zipcode && addressData.zipcode !== "" && addressData.zipcode !== null)?addressData.zipcode:"";
      this.view.txtResidentialAddressCity.text = (addressData.city && addressData.city !== "" && addressData.city !== null)?addressData.city:"";
      //this.view.txtCountry.text = (addressData.country && addressData.country !== "" && addressData.country !== null)?addressData.country:"";
    }
    else
    {
      this.view.txtResidentialAddressLineOne.text = "";
      this.view.txtResidentialAddressLineTwo.text = "";
      //this.view.txtResidentialAddressState.text = "";
      this.view.txtResidentialAddressZipCode.text = "";
      this.view.txtResidentialAddressCity.text = "";
      //this.view.txtCountry.text = "";
    }
    this.validateFormUI();
  },
  onSearch : function(){
	var scopeObj = this;
    this.view.flxMainContainer.skin = "sknFlxffffff";
    this.view.tbxSearch.setFocus(false);
    this.view.tbxSearch.setEnabled(false);
    this.view.customSearchbox.tbxSearch.setEnabled(true)
    	kony.timer.schedule("timerId", function() {
                           scopeObj.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.2, false);
    this.view.flxSearchAddress.isVisible = true;
    this.view.flxMainContainer.isVisible = false;
    this.view.segAddresses.removeAll();
    this.view.customSearchbox.tbxSearch.text = "";
  },
  onSearchingAddress : function(){
    var searchParams = {};
    var searchText = this.view.customSearchbox.tbxSearch.text;
    searchParams.text = searchText;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.addressSearch(searchParams);
  },
  cancelSearch : function(){
    this.view.flxMainContainer.skin = "slFbox";
    this.view.customSearchbox.tbxSearch.setEnabled(false)
    this.view.customSearchbox.tbxSearch.setFocus(false);
    this.view.tbxSearch.setEnabled(true);
    this.view.flxSearchAddress.isVisible = false;
    this.view.customSearchbox.tbxSearch.text = "";
    this.view.flxMainContainer.isVisible = true;
    this.view.segAddresses.removeAll();
  },
  setSearchedAddress : function(){
    var data = this.view.segAddresses.selectedItems[0].formattedAddress;
    var address = data.split(",");
    address.reverse();
    this.view.txtCountry.text = address[0];
    this.view.txtResidentialAddressState.text = address[1];
    this.view.txtResidentialAddressCity.text = address[2];
    this.view.txtResidentialAddressLineTwo.text = address[3];
    this.view.txtResidentialAddressZipCode.text = "";
    if(address[4])
      this.view.txtResidentialAddressLineOne.text = address[4];
    if(address[5])
    {
      var temp = address[5].concat(",");
      var address1 = temp.concat(address[4]);
      this.view.txtResidentialAddressLineOne.text = address1;
    }
    this.view.flxSearchAddress.isVisible = false;
    this.view.flxMainContainer.isVisible = true;
    this.validateFormUI();
  },
  setSearchData : function(data){
    if(data && data!== null){
      this.view.segAddresses.widgetDataMap = {
        "lblAddress": "formattedAddress"
      };
      this.view.segAddresses.setData(data);
    }
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
  populateData:function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var cityAndStateCode=settingsMod.presentationController.getUserAddressData();
    if(!(cityAndStateCode.addressLine1)){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var countryData=settingsMod.presentationController.getCountryData();
    var statesData=settingsMod.presentationController.getStatesData();
    //var cityData=settingsMod.presentationController.getCitiesData();
    this.view.lstbxCountry.masterData=countryData;
    this.view.lstbxState.masterData=statesData;
    //this.view.lstbxCity.masterData=cityData;
    this.view.lstbxCountry.selectedKey=countryData[0][0];
      this.view.lstbxState.selectedKey=statesData[0][0];
   // this.view.lstbxCity.selectedKey=cityData[0][0];
    this.view.txtResidentialAddressLineOne.text = "";
      this.view.txtResidentialAddressLineTwo.text = "";
      this.view.txtResidentialAddressZipCode.text = "";
      this.view.txtResidentialAddressCity.text="";
    this.checkForEnable();
    }else{
      this.validateFormUI();
    }
  },
  countrySelection:function(){
    this.view.lstbxState.setEnabled(true);
    this.view.lstbxCity.setEnabled(false);
    var countryCode=this.view.lstbxCountry.selectedKey;
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
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
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
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
    /if(text=="lbl1"){
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