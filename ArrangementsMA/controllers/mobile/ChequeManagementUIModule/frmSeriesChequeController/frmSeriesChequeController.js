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
    this.clearError();
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      // this.view.flxHeader.isVisible = false;
      this.view.flxHeader.setVisibility(false);
    }
    this.initActions();
  },
  postShow: function(){
    this.updateUI();
    this.view.txtFirstCheque.setFocus(true);
    this.view.txtFirstCheque.onTextChange = this.textChange;
    this.view.txtLastCheque.onTextChange = this.textChange;
  },
  updateUI:function(){
    var transObj = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    var objData=transObj.getTransObject();
    if(objData.checkNumber1===null&&objData.checkNumber2===null){
      this.view.txtFirstCheque.text= "";
      this.view.txtLastCheque.text="";
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnContinue.setEnabled(false);
      this.view.lblDifference.setVisibility(false);
    }},
  initActions: function(){
    this.view.btnContinue.onClick =this.continueOnClick;
    this.view.customHeader.flxBack.onClick = this.backOnClick;
    this.view.customHeader.btnRight.onClick =this.cancelOnClick;
  },
  
  backOnClick:function(){
    var commonBack = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    commonBack.initializeStateData(true,"frmSCChequeType");
    commonBack.commonFunctionForgoBack();
    },
  
  cancelOnClick:function()
  {
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.commonCancel();
  },

  differenceNumber: function(){
    var firstCheque = this.view.txtFirstCheque.text;
    var lastCheque = this.view.txtLastCheque.text;
    var difference = (lastCheque - firstCheque)+1;
    this.view.lblDifference.text = difference+ " Cheques selected";
    return difference;
},
  textChange: function(){
    this.view.lblSeriesError.setVisibility(false);
    this.view.txtFirstCheque.skin = "skntbx424242SSPreg3px";
    this.view.txtLastCheque.skin = "skntbx424242SSPreg3px";
    if(this.view.txtLastCheque.text === null || this.view.txtLastCheque.text === ""){
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnContinue.setEnabled(false);
      this.view.lblDifference.setVisibility(false);
    }else{
      this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
      this.view.btnContinue.setEnabled(true);
      var difference = this.differenceNumber();
      if(difference > 1 && difference < 51) {
        this.view.lblDifference.setVisibility(true);
      }
      else {
        this.view.lblDifference.setVisibility(false);
      }
    }
  },
  continueOnClick :function()
  {
    var selectedFirstCheque = this.view.txtFirstCheque.text;
    var selectedLastCheque = this.view.txtLastCheque.text;
    var isValidDifference = this.view.lblDifference.isVisible;
    if(isValidDifference === true) {
      if(selectedFirstCheque === "0" || selectedLastCheque === "0") {
        this.view.lblSeriesError.text = "Please provide Valid Account Number, Account is not related to Customer";
        this.view.lblSeriesError.setVisibility(true);
        this.view.txtFirstCheque.skin = "sknTbxff0000RegularErrorMsg";
        this.view.txtLastCheque.skin = "sknTbxff0000RegularErrorMsg";
      }
      else {
        var chequeSeries = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
        chequeSeries.seriesChequeNumber(selectedFirstCheque, selectedLastCheque);
        var navMan = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
        if( scope_ChequePresentationController.isReview==true){
          navMan.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmSCReview"});
        }
        else {
          navMan.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmSCReason"});
        }
        this.view.lblSeriesError.setVisibility(false);
      }
    }
    else {
      this.view.txtFirstCheque.skin = "sknTbxff0000RegularErrorMsg";
      this.view.txtLastCheque.skin = "sknTbxff0000RegularErrorMsg";
      this.view.btnContinue.setFocus(true);
      this.view.lblSeriesError.text = "Please enter valid check number(s). The last check number must be larger than the first check number. Maximum check count is 50";
      this.view.lblSeriesError.setVisibility(true);
    }
    //     var cheques = applicationManager.getModulesPresentationController("ChequeManagementModule");
    //     cheques.getChequeNumbers(chequeNumbers);
    //     if(selectedFirstCheque >= data.first && selectedFirstCheque <= data.last){
    //       this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
    //       this.view.btnContinue.setEnabled(false);
    //       this.bindGenericError(errorMsg);
    //     }
    //     else{
    //     var chequeSeries = applicationManager.getModulesPresentationController("ChequeManagementModule");
    //     chequeSeries.seriesChequeNumber(selectedFirstCheque, selectedLastCheque);
    //     var navMan = applicationManager.getModulesPresentationController("ChequeManagementModule");
    //                 if( scope_ChequePresentationController.isReview==true){
    //          navMan.commonFunctionForNavigation("frmSCReview");
    //     }else{
    //              navMan.commonFunctionForNavigation("frmSCReason");
    //             }
    //   }
    },
  clearError: function() {
    this.view.lblSeriesError.setVisibility(false);
    this.view.txtFirstCheque.skin = "skntbx424242SSPreg3px";
    this.view.txtLastCheque.skin = "skntbx424242SSPreg3px";
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
    this.view.lblSeriesError.setVisibility(true);
    this.view.lblSeriesError.text = errorMsg;
    this.view.lblSeriesError.skin = "sknLbl0095e422px";
    this.view.txtFirstCheque.skin = "sknTbx424242SSP28pxBorder1PxBgff5d6eTab";
    this.view.txtLastCheque.skin = "sknTbx424242SSP28pxBorder1PxBgff5d6eTab";
  }
});
