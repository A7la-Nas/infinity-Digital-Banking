define({
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmPreShow : function(){
    this.setPreshowData();
    this.setFlowActions();
    this.setDataToForm();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setPreshowData : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
    
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var flowType = settingsMode.presentationController.getUserAddressFlowType();
    if(flowType == "add"){
      this.view.flxMarkAsPrimary.setVisibility(true)
    }else{
      this.view.flxMarkAsPrimary.setVisibility(false);
    }
  },
  setFlowActions : function(){
    this.view.btnUpdateChanges.onClick = this.onConfirmAddAddress;
    this.view.flxCheckboxPrimary.onClick = this.onCheckPrimaryAddress;
    this.view.customHeader.btnRight.onClick = this.onCancel;
    this.view.customHeader.flxBack.onClick = this.onBack;
  },
  onCheckPrimaryAddress : function(){
    var userObj = applicationManager.getUserPreferencesManager();
    var addData = userObj.getEntitlementAddresses();
    if(addData.length === 0){
      kony.print("default communication address");
    }else{
       this.toggle();
    }
  },
  onCancel : function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
  },
  onBack : function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  onConfirmAddAddress : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var data = {
      "isPreferredAddress" : this.getPreferredAddress()
    };
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var flowType = settingsMode.presentationController.getUserAddressFlowType();
    settingsMode.presentationController.updateUserSelectedAddressData(data);
    if(flowType === "add" )
      settingsMode.presentationController.createProfileAddress();
    else
      settingsMode.presentationController.updateProfileAddress();
  },
  setDataToForm : function(){
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var addressData = settingsMode.presentationController.getUserAddressData();
    this.view.lblValueAddressType.text = (addressData.addressTypeForDisplay && addressData.addressTypeForDisplay !== "" && addressData.addressTypeForDisplay !== null)?addressData.addressTypeForDisplay:"";
    this.view.lblValueAddressline1.text = (addressData.addressLine1 && addressData.addressLine1 !== "" && addressData.addressLine1 !== null)?addressData.addressLine1:"";
    this.view.lblValueAddressline2.text = (addressData.addressLine2 && addressData.addressLine2 !== "" && addressData.addressLine2 !== null)?addressData.addressLine2:"";
    this.view.lblValueState.text = (addressData.state && addressData.state !== "" && addressData.state !== null)?addressData.state:"";
    this.view.lblValueCity.text = (addressData.city && addressData.city !== "" && addressData.city !== null)?addressData.city:"";
    this.view.lblValueCountry.text = (addressData.country && addressData.country !== "" && addressData.country !== null)?addressData.country:"";
    this.view.lblValueZipcode.text = (addressData.zipcode && addressData.zipcode !== "" && addressData.zipcode !== null)?addressData.zipcode:"";
    var preferredAddress = (addressData.isPreferredAddress && addressData.isPreferredAddress !== "" && addressData.isPreferredAddress !== null)?addressData.isPreferredAddress:"";
   var userObj = applicationManager.getUserPreferencesManager();
    var addData = userObj.getEntitlementAddresses();
    if(addData.length === 0){
       this.view.imgCheckboxPrimary.src = "checkbox.png";
      this.view.flxMarkAsPrimary.setVisibility(true);
    }else{
      if(preferredAddress !== "false"){
      this.view.imgCheckboxPrimary.src = "checkbox.png";
      this.view.flxMarkAsPrimary.setVisibility(false);
    }
    else{
      this.view.imgCheckboxPrimary.src = "checkboxempty.png";
      this.view.flxMarkAsPrimary.setVisibility(true);
    }
    var flowType = settingsMode.presentationController.getUserAddressFlowType();
    if(flowType === "add" ){
      this.view.imgCheckboxPrimary.src = "checkboxempty.png";
      this.view.flxMarkAsPrimary.setVisibility(true);
    }
    }
  },
  getPreferredAddress : function(){
    if(this.view.imgCheckboxPrimary.src === "checkbox.png")
      return "1";
    else
      return "0";
  },
  toggle : function(){
    if(this.view.imgCheckboxPrimary.src === "checkbox.png")
      this.view.imgCheckboxPrimary.src = "checkboxempty.png";
    else
      this.view.imgCheckboxPrimary.src = "checkbox.png";
  }
});