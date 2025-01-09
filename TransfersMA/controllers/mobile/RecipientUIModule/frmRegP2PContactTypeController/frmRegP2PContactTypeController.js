define({
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    frmPreShow: function() {
        this.view.btnPhoneNumber.onClick = this.btnPhoneNumberOnClick;
        this.view.btnEmail.onClick = this.btnEmailOnClick;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.btnRight.onClick=this.onClickCancel;
        this.renderTitleBar();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    renderTitleBar: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
        }
    },
    btnPhoneNumberOnClick: function() {
          var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
          p2pMod.presentationController.navigateToP2PRecPhoneNoOrEmail("frmP2PRecPhoneNo","phone");
    },
    btnEmailOnClick: function() {
        var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
        p2pMod.presentationController.navigateToP2PRecPhoneNoOrEmail("frmP2PRecEmail","email");
    },
    flxBackOnClick: function() {
      	var navManager = applicationManager.getNavigationManager();
		navManager.goBack();
    },
    onClickCancel:function(){
    var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
    p2pMod.presentationController.navToFormBasedOnEntryPoint("createP2PPayee");
  }
});