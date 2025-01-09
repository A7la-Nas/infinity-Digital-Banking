define({
  //Type your controller code here
    init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
  frmPreshow : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    } 
    if(kony.i18n.getCurrentLocale() === "ar_AE"){
          this.view.customHeader.imgBack.src = "chevronwhiteright.png";
      }else{ 
          this.view.customHeader.imgBack.src = "backbutton.png";
      }
    this.initAction();
     var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initAction : function(){
    var scope=this;
    this.view.customHeader.flxBack.onClick=function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    };
    this.view.customHeader.btnRight.onClick=function(){
     scope.onClickCancel();
    };
    this.view.btnTAndC.onClick=function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var ManageArrangementsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
      ManageArrangementsUIModule.presentationController.getEnableEStatements();
    };
    this.view.btnDisable.onClick =function(){
       applicationManager.getPresentationUtility().showLoadingScreen();
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
      var navManager = applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("frmEStmtAccountDetails");
      var accountID = (data && data.accountID && data.accountID!== "" &&data.accountID!== null)?data.accountID:"";
      var updatedSettings={"nickName":data.nickName,"accountID":accountID,"eStatementEnable":"0","favouriteStatus":data.favouriteStatus,"email":""};
      settingsMode.presentationController.updateUserAccountSettingsForEstatements(updatedSettings,"disable");
    };
  },
  onClickCancel:function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
});