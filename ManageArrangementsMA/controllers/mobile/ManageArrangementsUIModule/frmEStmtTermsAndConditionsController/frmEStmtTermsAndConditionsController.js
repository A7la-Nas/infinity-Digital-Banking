define({
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preshow : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
    this.view.customHeader.flxBack.onClick = this.onCloseTnC;
    var data= applicationManager.getNavigationManager().getCustomInfo("frmEStmtTermsAndConditions");
   // this.view.rtxTermsConditionsValue.text = data;
    this.view.brsrTerms.htmlString=data;
      this.view.brsrTerms.enableParentScrollingWhenReachToBoundaries=false;
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  onCloseTnC : function () {
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  }
});