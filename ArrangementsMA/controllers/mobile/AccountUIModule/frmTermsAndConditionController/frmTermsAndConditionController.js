define({
 init : function(){
    var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
     applicationManager.getPresentationFormUtility().initCommonActions(this,"CALLBACK",currentForm,scope.mfaDeviceBack);
  },
  preShow : function(){
    this.populateData();
    var navigationMan=applicationManager.getNavigationManager();
    var formdata=navigationMan.getCustomInfo("TandCdata");
    if(!kony.sdk.isNullOrUndefined(formdata.termsAndConditionsContent)){
   this.view.rtxTermsConditionsValue.text = formdata.termsAndConditionsContent;
    }
    this.view.customHeader.flxBack.onClick = this.onCancelClick;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
  },
  postShow:function()
  {
    this.view.brsrTerms.enableParentScrollingWhenReachToBoundaries=false;
  },
  populateData:function()
  {
    var navigationMan=applicationManager.getNavigationManager();
    var formdata=navigationMan.getCustomInfo("frmTermsAndCondition");
  //  this.view.rtxTermsConditionsValue.text=formdata.content;
   // this.view.brsrTerms.htmlString=formdata.content;
  //  
  //  this.view.brsrTerms.htmlString=formdata.content;
  
  },
  onCancelClick : function(){
    var navManager = applicationManager.getNavigationManager();
    var frmName = {"appName": "ArrangementsMA","friendlyName": "AccountUIModule/frmAccountClosure"}; 
    navManager.navigateTo(frmName);
    
  },
   bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});