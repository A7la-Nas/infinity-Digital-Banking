define({
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmSecurityCheckPreShow : function(){
    this.setFlowActions();
    this.setPreshowData();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  setFlowActions : function(){
    var scopeObj = this;
    this.view.customHeader.flxBack.onClick = function(){
      scopeObj.navBack();
    };
    this.view.customHeader.btnRight.onClick = function(){
      scopeObj.onClickCancel();
    };
    this.view.flxCVV.onClick = function(){
      scopeObj.getAllCards();
      //       scopeObj.navToCVV();
    };
    this.view.flxSecurityCode.onClick = function(){
      scopeObj.triggerOTP();
    };
  },
  setPreshowData : function(){
    this.view.customHeader.flxBack.isVisible = true;
    this.view.customHeader.lblLocateUs.text = "Security Check";
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
  },
  navBack : function(){
    var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
  },
  onClickCancel : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.resetEnrollObj();
  },
  navToCVV : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.commonFunctionForNavigation("frmEnrollCVV");
  },
  navToSecurityCode : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.commonFunctionForNavigation("frmEnrollSecurity");
  },
  /**
  *Code to fetch all cards for the entered SSN
  */
  getAllCards : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollModule.presentationController.getCardsForEnroll();
  },
  /**
  * Code to trigger OTP for the Mobile Number
  */
  triggerOTP : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollModule.presentationController.requestOTP();
  },
    /*
*Code to show error message
*/
  bindViewError : function(msg)
  {
    var scope = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scope,msg);
  }
});