define({
  init:function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },

  preShow: function() {
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.setVisibility(false);
    }
    this.initActions();
  },
  initActions: function(){
    this.view.btnSkip.onClick =this.skipOnClick;
    this.view.btnContinue.onClick =this.continueOnClick;
//    this.view.customHeader.flxBack.onClick = function(){
//    var commonBack = applicationManager.getModulesPresentationController("ChequeManagementModule");
//    commonBack.commonFunctionForgoBack();
 //   };
    this.view.customHeader.flxBack.onClick =this.backOnClick;
    this.view.customHeader.btnRight.onClick =this.cancelOnClick;
  
  },
  backOnClick: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            var navManager = applicationManager.getNavigationManager();
            var currentForm = navManager.getCurrentForm();
 
            loggerManager.log("#### start : " + currentForm + " :  backOnClick  ####");
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"AccountUIModule"});
            manageCardsModule.presentationController.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmChequeManagement"});
           } catch (exc) {
            loggerManager.log("#### in catch " + exc + " ####");
        }
    },
  postShow: function(){
    this.updateUI();
    this.textChange();
    this.view.txtRecipientName.setFocus(true);
    this.view.txtRecipientName.onTextChange = this.textChange;
  },
   updateUI:function(){
    var transObj = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    var objData=transObj.getTransObject();
    if(objData.payeeName===null || this.getPreviousForm() === "frmChequeManagement"){
      this.view.txtRecipientName.text = "";
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
    }},
  skipOnClick: function(){
    this.view.txtRecipientName.text = "";
    var selectedPayeeName = "";
    var payeeName = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    payeeName.setPayeeName(selectedPayeeName);
    var navMan = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    navMan.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmSCChequeType"});
  },
  cancelOnClick:function()
  {
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.commonCancel();
  },
  textChange: function(){
    if(this.view.txtRecipientName.text ==null || this.view.txtRecipientName.text ==""){
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
    }
    else{
      this.view.btnContinue.setEnabled(true);
      this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
    }
  },
  continueOnClick :function()
  {
var selectedPayeeName = this.view.txtRecipientName.text;
    var payeeName = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    payeeName.setPayeeName(selectedPayeeName);
    var navMan = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
            if( scope_ChequePresentationController.isReview==true){
         navMan.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmSCReview"});
    }else{
             navMan.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmSCChequeType"});
            }
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
});