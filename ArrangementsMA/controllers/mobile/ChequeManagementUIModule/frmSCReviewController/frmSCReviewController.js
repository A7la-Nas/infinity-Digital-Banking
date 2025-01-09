define({
  
init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
 
  preshow:function(){
  if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
   
      this.view.flxHeader.isVisible = false;
    }
    this.initActions();
    this.setUIData();
      
  }, 
  postShow:function(){
     var transObj = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    var objData=transObj.getTransObject();
    if(scope_ChequePresentationController.chequeTypeSelection=="Single Cheque"){
      this.view.lblChequeTypeValue.text="Single";
      this.view.flxAmount.setVisibility(true);
      this.view.flxSeperator1.setVisibility(true);
      this.view.flxIssueDate.setVisibility(true);
      this.view.flxSeperator6.setVisibility(true);
      this.view.lblChequeNumberValue.text= objData.checkNumber1;
    }else{
       this.view.lblChequeTypeValue.text="Series";
      this.view.flxAmount.setVisibility(false);
      this.view.flxSeperator1.setVisibility(false);
      this.view.flxIssueDate.setVisibility(false);
      this.view.flxSeperator6.setVisibility(false);
      if(objData.checkNumber1!==null&&objData.checkNumber2!==null){
     this.view.lblChequeNumberValue.text= objData.checkNumber1+"-"+objData.checkNumber2;
       this.view.btnContinue.setEnabled(true);
      this.view.btnContinue.skin = "sknBtn055BAF26px";
      }else{
        this.view.lblChequeNumberValue.text="";
        this.view.btnContinue.setEnabled(false);
    this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
      }
    }
    
  },
  initActions:function(){
    this.view.customHeader.flxBack.onClick = this.backOnClick;
    this.view.btnContinue.onClick=this.continueOnClick;
    this.view.flxFromImage.onTouchEnd=this.navigateToFromAccount;
    this.view.flxAmountImage.onTouchEnd=this.navigateToAmount;
    this.view.flxPayeeImage.onTouchEnd=this.navigateToPayeeName;
    this.view.flxChequeTypeImage.onTouchEnd=this.navigateToChequeType;
    this.view.flxChequeNumberImage.onTouchEnd=this.navigateToChequeNumber;
    this.view.flxIssueDateImage.onTouchEnd=this.navigateToIssueDate;
    this.view.flxReasonImage.onTouchEnd=this.navigateToReason;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    scope_ChequePresentationController.isReview=true; 
  },
  
    backOnClick: function(){
    
    var commonBack = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    commonBack.initializeStateData(true,"frmSCTermsAndCondition");
    commonBack.commonFunctionForgoBack();
    
  },
  
  setUIData:function(){
    var transObj = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
     var reasondata = transObj.stopReasonsList;
     var forUtility = applicationManager.getFormatUtilManager();
    var objData=transObj.getTransObject();
    
    
       if(objData.checkDateOfIssue===""){
       this.view.lblIssueDateValue.text="Not defined";
     }else{
        this.view.lblIssueDateValue.text= scope_ChequePresentationController.chequeIssuedDate;
     }
    if(objData.payeeName===""){
       this.view.lblPayeeNameValue.text="Not defined";
     }else{
         this.view.lblPayeeNameValue.text= objData.payeeName;
     }
    if(objData.checkReason){
         var reasonkey =""
          reasondata.forEach(function(item) {
           if (item[1] === objData.checkReason) {
                    reasonkey= item[0];
                }
           });
           this.view.lblReasonValue.text =reasonkey;          
    }
  this.view.lblFromAccountValue.text= scope_ChequePresentationController.processedName;
     if(objData.amount===""){
       this.view.lblAmountValue.text="Not defined";
     }else{
       this.view.lblAmountValue.text=forUtility.formatAmountandAppendCurrencySymbol(objData.amount,transObj.currencyCode);
     }
  if(objData.transactionsNotes===""){
             this.view.txtNotes.text=objData.transactionsNotes;
         }
   if(scope_ChequePresentationController.fees!==""){
      this.view.flxFee.setVisibility(true);
      this.view.flxSeperator5.setVisibility(true);
      this.view.lblFeeValue.text=forUtility.formatAmountandAppendCurrencySymbol(scope_ChequePresentationController.fees,transObj.currencyCode);
     
    }else{
       this.view.flxFee.setVisibility(false);
      this.view.flxSeperator5.setVisibility(false);
    }
    
  },
 
 navigateToFromAccount:function(){
  var controller = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
   controller.initializeStateData(true,"frmSCReview");
  controller.navigateToAccountScreen();
   controller.entryFormForAccounts="frmSCReview";
  },
  navigateToAmount:function(){
  var controller = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    controller.initializeStateData(true,"frmSCReview");
  controller.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmAmount"});
  },
  navigateToPayeeName:function(){
  var controller = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    controller.initializeStateData(true,"frmSCReview");
  controller.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmPayeeName"});
  },
  navigateToChequeType:function(){
  var controller = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    controller.initializeStateData(true,"frmSCReview");
  controller.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmSCChequeType"});
  },
  navigateToChequeNumber:function(){
  var controller = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    controller.initializeStateData(true,"frmSCReview");
    if(scope_ChequePresentationController.chequeTypeSelection=="Single Cheque"){
  controller.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmChequeNumber"});
    }else{
      controller.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmSeriesCheque"});
    }
   
  },
  navigateToIssueDate:function(){
  var controller = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    controller.initializeStateData(true,"frmSCReview");
  controller.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmIssueDate"});
  },
  navigateToReason:function(){
  var controller = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    controller.initializeStateData(true,"frmSCReview");
  controller.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmSCReason"});
  },
  
continueOnClick:function(){
  applicationManager.getPresentationUtility().showLoadingScreen(); 

  var data;
  if(this.view.txtNotes.text!==null&&this.view.txtNotes.text!==""){
     data=this.view.txtNotes.text;
  }else{
    data="";
  }
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
   presentation.stopChequePaymentRequest(data);

  
},
  onCancelClick:function(){
    var loggerManager = applicationManager.getLoggerManager();
      function alertHandler(response) {
        if (response === true) {
          applicationManager.getPresentationUtility().showLoadingScreen();
          var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
          presentation.commonCancel();
          applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
      }
      try {
        loggerManager.log("#### start frmSCReviewController : onCancelClick");
        var alertmessage = kony.i18n.getLocalizedString("i18n.StopCheckPayments.AreYouSureToCancelTheRequest");
        var yesText = kony.i18n.getLocalizedString("kony.mb.common.Yes");
        var noText = kony.i18n.getLocalizedString("kony.mb.common.No");
        var basicConfig = {
          "alertType": constants.ALERT_TYPE_CONFIRMATION,
          "alertTitle": "",
          "yesLabel": yesText,
          "noLabel": noText,
          "message": alertmessage,
          "alertHandler": alertHandler.bind(this)
        };
        applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});
      } catch (error) {
        loggerManager.log("#### in catch of frmSCReviewController : onCancelClick" + JSON.stringify(err) + " ####");
      }
  },
  bindGenericError: function (errorMsg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
     applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
}
  
});