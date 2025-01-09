define({
  selectedprofileAddressType: -1,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function () {
    this.setPreshowData();
    this.initActions();
    this.setMasterDataToSegment();
    this.assignDataToForm();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setPreshowData : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxTransactionFrequency.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxTransactionFrequency.top = "0dp";
    }
  },
  initActions: function () {
    var scope = this;
    this.view.customHeader.btnRight.onClick = this.onCancel;
    this.view.customHeader.flxBack.onClick = this.onBack;
  },
  onCancel : function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
  },
  onBack : function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  setMasterDataToSegment: function () {
    var scope = this;
    var profileAddressType = [kony.i18n.getLocalizedString("kony.tab.common.home"), kony.i18n.getLocalizedString("i18n.common.Work")];
	var profileAddressValue = ['ADR_TYPE_HOME','ADR_TYPE_WORK'];
    var segData = [];
    for (var i = 0; i < profileAddressType.length; i++) {
      var temp = {
        "btnOption":
		{
			"text": profileAddressType[i],
			"value": profileAddressValue[i]
		}
      };
      segData.push(temp);
    }
    for (var i = 0; i < segData.length; i++) {
      segData[i].btnOption.skin = "sknBtnOnBoardingOptionsInActive";
       segData[i].btnOption.onClick = this.processAndNavigate.bind(this);
    }
    if (scope.selectedprofileAddressType !== -1) {
      segData[scope.selectedprofileAddressType].btnOption.skin = "sknBtnOnBoardingOptionsActive";
    }
    scope.view.segAddressType.data = segData;
    scope.view.segAddressType.onRowClick=this.processAndNavigate.bind(this);
  },
   
  processAndNavigate : function (seguiWidget, context) {
    var scope = this;
    let rowIndex = context.rowIndex;
    if(rowIndex !== -1){
      this.selectedprofileAddressType = rowIndex;
    } else {
      this.selectedprofileAddressType = -1;
    }
    if (rowIndex !== -1) {
    var data = {
      "addressType" : scope.view.segAddressType.data[rowIndex].btnOption["value"],
      "addressTypeForDisplay": scope.view.segAddressType.data[rowIndex].btnOption["text"]
    };
    var segData = scope.view.segAddressType.data;
    for(var i=0;i<segData.length;i++){
      if(segData[i]["btnOption"]["text"] === data.addressTypeForDisplay){
        segData[i]["btnOption"].skin="sknBtnOnBoardingOptionsActive";
      }
      else{
        segData[i]["btnOption"].skin="sknBtnOnBoardingOptionsInActive";
      }
    }
  }
    if (applicationManager.getPresentationFormUtility().getDeviceName() == "iPhone") {

        var segData = scope.view.segAddressType.data;
        for (var i = 0; i < segData.length; i++) {
          if (segData[i]["btnOption"]["text"] ===context.text) {
            segData[i]["btnOption"].skin = "sknBtnOnBoardingOptionsActive";
            var data = {
              "addressType": segData[i]["btnOption"]["value"],
              "addressTypeForDisplay": segData[i]["btnOption"]["text"]
            };
          } else {
            segData[i]["btnOption"].skin = "sknBtnOnBoardingOptionsInActive";
          }
        }

      }
    scope.view.segAddressType.setData(segData);
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.updateUserAddressTypeData(data);
    settingsMod.presentationController.commonFunctionForNavigation("frmProfileConfirmAddressDetails");
   
  },
  assignDataToForm : function(){
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var addressTypeData = settingsMode.presentationController.getUserAddressData();
    this.AddressTypes = {
      "ADR_TYPE_WORK": kony.i18n.getLocalizedString("i18n.common.Work"),
      "ADR_TYPE_HOME": kony.i18n.getLocalizedString("kony.tab.common.home")
    };
    if(addressTypeData){
      var addressType = (addressTypeData.addressType && addressTypeData.addressType !== "" && addressTypeData.addressType !== null)?addressTypeData.addressType:"";
      var segData = this.view.segAddressType.data;
      var addType=this.AddressTypes[addressType];
      if(addType)
      addType=addType.toLowerCase();
      for(var i=0;i<segData.length;i++){
        if(segData[i]["btnOption"]["text"].toLowerCase() === addType){
          segData[i]["btnOption"].skin="sknBtnOnBoardingOptionsActive";
        }
        else{
          segData[i]["btnOption"].skin="sknBtnOnBoardingOptionsInActive";
        }
      }
      this.view.segAddressType.setData(segData);
    }
  }
});