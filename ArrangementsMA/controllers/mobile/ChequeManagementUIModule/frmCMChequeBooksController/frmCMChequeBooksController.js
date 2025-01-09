define({
  initActions: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.customHeader.btnRight.onClick = scope.cancelOnClick;
    this.view.customHeader.flxBack.onTouchEnd = scope.navigateBack;
    this.view.segOptions.onRowClick=scope.navigateToReviewScreen;
  },
  preShow:function(){
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    }
    this.updateUI();
  },
  updateUI : function() {
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
	this.view.lblChequeLeaves.text="Select chequebook(s) - Each chequebook has"+presentation.leavesCount+"leaves";
    var index = parseInt(presentation.chequeBooksCount)-1;
    this.view.segOptions.rowFocusSkin = "";
    this.view.segOptions.retainSelection = false;
    if (index != null && index != undefined && index != "") {
      this.view.segOptions.rowFocusSkin = "sknFlxF9F9F9RoundedRadius35Px";
      this.view.segOptions.retainSelection = true;
      this.view.segOptions.selectedRowIndex = [0, index];
    }
  },
  postShow:function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  navigateToReviewScreen:function(){
    var index = this.view.segOptions.data[this.view.segOptions.selectedIndex[1]].lblFrequency;
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.chequeBooksCount=index;
    presentation.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmCMReview"});
  },
  cancelOnClick:function(){
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.commonCancel();
  },
  navigateBack:function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  }
});