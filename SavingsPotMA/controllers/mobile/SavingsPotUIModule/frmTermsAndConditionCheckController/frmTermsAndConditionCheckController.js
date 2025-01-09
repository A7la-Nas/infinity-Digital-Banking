define({
 init : function(){
    var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
     applicationManager.getPresentationFormUtility().initCommonActions(this,"CALLBACK",currentForm,scope.mfaDeviceBack);
  },
  preShow : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.title=kony.i18n.getLocalizedString("kony.mb.TermsAndConditions.Title");
      this.view.flxHeader.isVisible = false;
    }
    this.view.btntermsandconditions.onClick=this.btnOnClick;
    this.view.btnVtu.onClick=this.vtuClick;
    this.view.btnContinue.onClick=this.btnContinueFunction;
    this.view.customHeader.flxBack.onTouchEnd = this.onBack;
    this.view.flxCheckBox1.onClick=this.toggleCheckBox;
    this.view.flxCheckBox2.onClick=this.toggleCheckBoxVTU;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  postShow:function(){
      if (this.view.imgTermsAccepted.src === "a.png" && this.view.imgTerms.src === "a.png") {
            this.view.btnContinue.setEnabled(true);
            this.view.btnContinue.skin = "sknBtn055BAF26px";
        } else {
            this.view.btnContinue.setEnabled(false);
            this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        }
  },
  onBack : function () {
    var navigationMan=applicationManager.getNavigationManager();
    navigationMan.goBack();
  },
  btnOnClick:function(){
    var navManager = applicationManager.getNavigationManager();
	    navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmTermsConditions"});
  },
  vtuClick:function(){
    
  },
  btnContinueFunction:function(){
    var navManager = applicationManager.getNavigationManager();
     navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmGoalFundAck"}); 
  },
  onCancelClick : function(){

  },
  enrollCancel:function()
  {
    var navigationMan=applicationManager.getNavigationManager();
    navigationMan.goBack();
  },
  loginCancel:function()
  {
     var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InformationModule");
     informationPC.presentationController.cancelOnClick();
  },
  toggleCheckBox:function()
  {
    if(this.view.imgTermsAccepted.src==="tickmarkbox.png")
    {
      this.view.imgTermsAccepted.src="a.png";
    }
    else
    {
      this.view.imgTermsAccepted.src="tickmarkbox.png";
    }
    if(this.view.imgTermsAccepted.src==="a.png" && this.view.imgTerms.src==="a.png"){
      this.view.btnContinue.setEnabled(true);
      this.view.btnContinue.skin = "sknBtn055BAF26px";
    }
    else{
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    }
  },
    toggleCheckBoxVTU:function()
  {
    if(this.view.imgTerms.src==="tickmarkbox.png")
    {
      this.view.imgTerms.src="a.png";
    }
    else
    {
      this.view.imgTerms.src="tickmarkbox.png";
    }
    if(this.view.imgTermsAccepted.src==="a.png" && this.view.imgTerms.src==="a.png"){
      this.view.btnContinue.setEnabled(true);
      this.view.btnContinue.skin = "sknBtn055BAF26px";
    }
    else{
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    }
  },
   bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});