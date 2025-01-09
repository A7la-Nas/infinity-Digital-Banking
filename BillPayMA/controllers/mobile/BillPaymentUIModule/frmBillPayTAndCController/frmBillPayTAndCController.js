define(['CampaignUtility'], function(CampaignUtility){
  return{
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },

    onNavigate: function(data) {
      var scope = this;
      var context = {};
      this.context = applicationManager.getNavigationManager().getCustomInfo("frmBillPayTAndC");
      this.view.termsAndConditions.setContext(this.context);
      this.view.termsAndConditions.setParentScope(scope);
      this.view.termsAndConditions.onError = this.onError;
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
      this.view.customHeader.flxBack.onClick = this.navigateBack;
      this.view.forceLayout();
    },

    navigateBack: function(){
      applicationManager.getNavigationManager().setCustomInfo("frmBillPayLiteActivation", this.context);
      var navMan = applicationManager.getNavigationManager();
      navMan.goBack();
    },

    setFooter:function() {
      this.view.customFooter.lblAccounts.skin = "sknlbl727272SSP20px";
      this.view.customFooter.flxAccSelect.setVisibility(false);
      this.view.customFooter.lblTransfer.skin = "sknlbl727272SSP20px";
      this.view.customFooter.flxTransferSel.setVisibility(false);
      this.view.customFooter.lblBillPay.skin = "sknLbl424242SSP20px";
      this.view.customFooter.flxBillSelected.setVisibility(true);
      this.view.customFooter.lblMore.skin = "sknlbl727272SSP20px";
      this.view.customFooter.flxMoreSelect.setVisibility(false);
    },

    showErrorPopup:function(errorMsg) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var scopeObj = this;
      applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
    }
  };
});