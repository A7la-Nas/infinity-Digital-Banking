define({
  keypadString:'',
  isPeriodUsed : false,
  timerCounter: 0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function(){
    this.view.lblError.setVisibility(false);
    this.view.flxChequeWrapper.skin = "sknFlxFFFFFFBorderE9E9E9Radius3px";
   // this.view.txtChequeNo.setFocus(false);
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      // this.view.flxHeader.isVisible = false;
      this.view.flxHeader.setVisibility(false);
    }
    this.initActions();
  },
  postShow: function(){
        this.updateAmountValue();
        this.updateUI();
  },
   updateUI:function(){
    var transObj = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    var objData=transObj.getTransObject();
    if(objData.checkNumber1===null || this.getPreviousForm() === "frmSCChequeType"){
       this.view.lblChequeNumber.text= "";
      this.keypadString = '';
            this.view.lblCheqNumber.setVisibility(true);
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnContinue.setEnabled(false);
    }},    
  initActions: function(){
    this.view.btnContinue.onClick =this.continueOnClick;
    this.view.customHeader.flxBack.onClick = this.backOnClick;
//    this.view.customHeader.flxBack.onClick = function(){
//    var commonBack = applicationManager.getModulesPresentationController("ChequeManagementModule");
//    commonBack.commonFunctionForgoBack();
//    };
    this.view.customHeader.btnRight.onClick =this.cancelOnClick;
  },
  backOnClick: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            var navManager = applicationManager.getNavigationManager();
            var currentForm = navManager.getCurrentForm();
            loggerManager.log("#### start : " + currentForm + " :  backOnClick  ####");
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"AccountUIModule"});
            manageCardsModule.presentationController.commonFunctionForNavigation("frmSCChequeType");
        } catch (exc) {
            loggerManager.log("#### in catch " + exc + " ####");
        }
    }, 
  cancelOnClick:function()
  {
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.commonCancel();
  },
  setKeypadChar: function (char) {
    this.view.lblError.setVisibility(false);
    this.view.flxChequeWrapper.skin = "sknFlxFFFFFFBorderE9E9E9Radius3px";
    var char = char.toString();
    if(this.keypadString===''){
       this.keypadString=char;
      this.view.lblCheqNumber.setVisibility(false);
       }else{
         this.keypadString=this.keypadString+char;
       }
    this.updateAmountValue();
  },
  clearKeypadChar: function () {
    this.view.lblError.setVisibility(false);
    this.view.flxChequeWrapper.skin = "sknFlxFFFFFFBorderE9E9E9Radius3px";
    if(this.keypadString ==='') return;
   var value = (this.keypadString / 10).toString();
     if(parseInt(value)>0){
       var value1=value.split('.')[0];
    this.keypadString=value1;
     var count=this.keypadString.split("");
    if(count===0){
      this.keypadString='';
      }
    }
else{
this.keypadString='';
  this.view.lblCheqNumber.setVisibility(true);
}
    this.updateAmountValue();
  },
  updateAmountValue: function(){
    if(this.keypadString===''){
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnContinue.setEnabled(false);
      this.view.lblChequeNumber.text = this.view.keypad.formatAmount(this.keypadString);
    }else{
      var finalValue = this.keypadString;
      this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
      this.view.btnContinue.setEnabled(true);
      this.view.lblChequeNumber.text = this.view.keypad.formatAmount(finalValue);
    }
  },
  continueOnClick :function()
  {
    var selectedChequeNumber = this.view.lblChequeNumber.text;
    if(selectedChequeNumber !== "0") {
      var chequeNumber = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
      chequeNumber.setChequeNumber(selectedChequeNumber);
      var navMan = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
      if( scope_ChequePresentationController.isReview==true){
        navMan.commonFunctionForNavigation("frmSCReview");
      }else{
        navMan.commonFunctionForNavigation("frmIssueDate");
      }
    }
    else {
      this.view.lblError.text = "Please provide Valid Account Number, Account is not related to Customer";
      this.view.lblError.setVisibility(true);
      this.view.flxChequeWrapper.skin = "sknFlxff0000ErrorMsg";
    }
    // presentation call
    //   var stopChequePresentationController = applicationManager.getModulesPresentationController("ChequeManagementModule");
    //   stopChequePresentationController.chequeNumberValidate(selectedChequeNumber);
    //     if(selectedChequeNumber === data){
    //       this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
    //       this.view.btnContinue.setEnabled(false);
    //       this.bindGenericError(err);
    //     }
    //   else{
    //     var chequeNumber = applicationManager.getModulesPresentationController("ChequeManagementModule");
    //     chequeNumber.setChequeNumber(selectedChequeNumber);
    //     var navMan = applicationManager.getModulesPresentationController("ChequeManagementModule");
    //         if( scope_ChequePresentationController.isReview==true){
    //          navMan.commonFunctionForNavigation("frmSCReview");
    //     }else{
    //              navMan.commonFunctionForNavigation("frmIssueDate");
    //             }
    //   }
  },
  bindGenericError: function (err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, err);
    this.view.lblError.setVisibility(true);
    this.view.lblError.text = err;
    this.view.lblError.skin = "sknLbl0095e422px";
    this.view.lblChequeNumber.skin = "sknTbx424242SSP28pxBorder1PxBgff5d6eTab";
  }
});
