define({
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.commonFunctionForgoBack();
  },
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    }
    this.updateUI();
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions: function () {
    var scope = this;
    var navManager = applicationManager.getNavigationManager();
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.segOptions.onRowClick = this.segmentOnClick;
 	  this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
  },
  updateUI : function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var index = transMod.getSelectedFrequencyIndex();
    this.view.segOptions.rowFocusSkin = "";
    this.view.segOptions.retainSelection = false;
    if (index !== null && index !== undefined && index !== "") {
      this.view.segOptions.rowFocusSkin = "sknFlxF9F9F9RoundedRadius35Px";
      this.view.segOptions.width = "90%";
      this.view.segOptions.centerX ="50%";
      this.view.segOptions.retainSelection = true;
	  this.view.segOptions.selectedRowIndex = [0, index];
    }
  },
  cancelOnClick: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.cancelCommon();
  },
  segmentOnClick : function() {
    var index = this.view.segOptions.data[this.view.segOptions.selectedIndex[1]].lblFrequency;
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.switchFrequencyType(index);
  }
});