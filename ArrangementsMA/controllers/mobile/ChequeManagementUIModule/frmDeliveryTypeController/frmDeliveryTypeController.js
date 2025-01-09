define({
  initActions: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.btnContinue.onClick = scope.continueAction;
    this.view.flxMailingAddress.onClick=scope.mailAddressOnclick;
    this.view.flxBranchAddress.onClick=scope.branchAddressOnclick;
    this.view.customHeader.btnRight.onClick = scope.cancelOnClick;
    this.view.customHeader.flxBack.onTouchEnd = scope.navigateBack;
  },
  preShow:function(){
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    }
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.getUserAddress();
    this.view.lblMailingAddressValue.text=presentation.address;
    if (presentation.deliveryType==="Self PickUp") {
      this.view.imgRadio.src="radiobuttoninactive.png";
      this.view.imgRadio1.src="radiobtn.png";
      this.view.flxMailingAddress.skin="slFboxmb";
      this.view.flxBranchAddress.skin="sknflxffffffa0a0a0";
    }
    else{
      this.view.imgRadio.src="radiobtn.png";
      this.view.imgRadio1.src="radiobuttoninactive.png";
      this.view.flxMailingAddress.skin="sknflxffffffa0a0a0";
      this.view.flxBranchAddress.skin="slFboxmb";
    }
  },
  postShow:function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  continueAction:function(){
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    if(this.view.imgRadio.src==="radiobtn.png"){
      presentation.deliveryType="Mailing Address";    
    }
    else{
      presentation.deliveryType="Self PickUp";    
    }

    presentation.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmCMReview"});
  },
  mailAddressOnclick:function(){
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.deliveryType="Mailing Address";
    this.view.imgRadio.src="radiobtn.png";
    this.view.imgRadio1.src="radiobuttoninactive.png";
    this.view.flxMailingAddress.skin="sknflxffffffa0a0a0";
    this.view.flxBranchAddress.skin="slFboxmb";
  },
  branchAddressOnclick:function(){
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.deliveryType="Self PickUp";
    this.view.imgRadio.src="radiobuttoninactive.png";
    this.view.imgRadio1.src="radiobtn.png";
    this.view.flxMailingAddress.skin="slFboxmb";
    this.view.flxBranchAddress.skin="sknflxffffffa0a0a0";
  },
  cancelOnClick:function(){
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.commonCancel();
  },
  navigateBack:function(){
    //     var navMan=applicationManager.getNavigationManager();
    //     navMan.goBack();
    try {
      var ntf = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      ntf.navigate();
    } catch(err) {}
  },
  navigateCustomBack:function(){
    try {
      var ntf = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      ntf.navigate();
    } catch(err) {}
  }
});
