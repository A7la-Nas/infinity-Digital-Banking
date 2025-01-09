define({
  frmPreShow: function() {
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    }
    this.retainSelection();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  init:function() {
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    this.view.btnICollect.onClick = this.btnICollectCashOnClick;
    this.view.btnSomeoneCollect.onClick = this.btnSomeoneCollectOnClick;
    this.view.customHeader.btnRight.onClick = this.btnRightOnClick;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  btnRightOnClick: function() {
    var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cLMod.presentationController.cancelCommon();
  },
  flxBackOnClick: function() {
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  retainSelection: function(){
    var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    var mode = cLMod.presentationController.getcashlessMode();
    if(mode==="Self")
    {
      this.view.btnICollect.skin = "sknBtnOnBoardingOptionsActive";
      this.view.btnSomeoneCollect.skin = "sknBtnffffff424242SSP26px";
    }
    else if(mode==="others")
    {
      this.view.btnICollect.skin = "sknBtnffffff424242SSP26px";
      this.view.btnSomeoneCollect.skin = "sknBtnOnBoardingOptionsActive";
    }
    else{
        this.view.btnICollect.skin = "sknBtnffffff424242SSP26px";
        this.view.btnSomeoneCollect.skin = "sknBtnffffff424242SSP26px";
    }
  },
  btnICollectCashOnClick: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cLMod.presentationController.setCashLessMode("Self");
    cLMod.presentationController.clearAmount();
  },
  btnSomeoneCollectOnClick: function() {
    var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cLMod.presentationController.setCashLessMode("others");
    cLMod.presentationController.clearAmount();
  }
});