define([], function(){
  return{
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    
    onNavigate: function(obj) {
      var scope = this;
      this.context = applicationManager.getNavigationManager().getCustomInfo("frmBillPayLiteActivation");
      this.view.liteActivationNative.setContext(this.context);
      this.view.liteActivationNative.setParentScope(scope);
      this.view.liteActivationNative.onError = this.onError;
    },
    
    onError: function(err){
      kony.application.dismissLoadingScreen();
     kony.print(JSON.stringify(err));
    },
    
    preShow: function() {
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "0dp";
      }else{
        this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
      }
      this.view.customHeader.btnRight.text = kony.i18n.getLocalizedString("kony.mb.common.Cancel");
      this.view.customHeader.btnRight.onClick = this.navigateBack;
      this.view.customHeader.btnRight.setVisibility(true);
      this.view.customHeader.flxBack.onClick = this.navigateBack;
      this.view.forceLayout();
    },
    
    navigateToPayeeList: function(data){
      applicationManager.getNavigationManager().setCustomInfo("frmBillPayAllPayees", data.payeeData);
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      billPayMod.presentationController.commonFunctionForNavigation("frmBillPayAllPayees");
    },

    navigateBack: function(){
      applicationManager.getNavigationManager().setCustomInfo("frmBillPayPayeeDetails", this.context.payeeData);
      var navMan = applicationManager.getNavigationManager();
      navMan.goBack();
    },

    navigateToTandC: function(){
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("Back", true);
      applicationManager.getNavigationManager().setCustomInfo("frmBillPayTAndC", this.context);
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      billPayMod.presentationController.commonFunctionForNavigation("frmBillPayTAndC");
    },

    setFooter:function(){
      this.view.customFooter.lblAccounts.skin = "sknlbl727272SSP20px";
      this.view.customFooter.flxAccSelect.setVisibility(false);
      this.view.customFooter.lblTransfer.skin = "sknlbl727272SSP20px";
      this.view.customFooter.flxTransferSel.setVisibility(false);
      this.view.customFooter.lblBillPay.skin = "sknLbl424242SSP20px";
      this.view.customFooter.flxBillSelected.setVisibility(true);
      this.view.customFooter.lblMore.skin = "sknlbl727272SSP20px";
      this.view.customFooter.flxMoreSelect.setVisibility(false);
    },

    showErrorPopup:function(errorMsg){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var scopeObj = this;
      applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
    }
  };
});