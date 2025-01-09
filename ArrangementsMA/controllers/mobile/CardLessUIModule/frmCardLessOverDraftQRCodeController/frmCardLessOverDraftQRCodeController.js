define({
  preShow: function() {
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    }
    this.setSegmentData();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  init : function(){
    this.view.btnEditTransaction.onClick=this.btnEditOnClick;
    this.view.btnContinue.onClick=this.btnContinueOnClick;
    this.view.customHeader.flxHeader.btnRight.onClick = this.btnRightOnClick;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"NO",currentForm);
  },
  btnRightOnClick: function() {
    var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cLMod.presentationController.cancelCommonQR();
  },
  setSegmentData:function(){
    var dataMap=this.getDataMap();
    this.view.segAccounts.widgetDataMap=dataMap;
    var navMan=applicationManager.getNavigationManager();
    var txnDetails=navMan.getCustomInfo("frmCardLessOverdraftQR");
    var cardlessTxnDetails=txnDetails.createResponse;
    var forUtility=applicationManager.getFormatUtilManager();
    for(var i =0 ; i < cardlessTxnDetails.length;i++)
    {
      var trandateobj=forUtility.getDateObjectfromString(cardlessTxnDetails[i]["transactionDate"],"YYYY-MM-DD");
      cardlessTxnDetails[i].transactionDate=forUtility.getFormatedDateString(trandateobj,forUtility.getApplicationDateFormat());
      cardlessTxnDetails[i].amount=forUtility.formatAmountandAppendCurrencySymbol(cardlessTxnDetails[i].amount);
    }
    cardlessTxnDetails=[[{"lblHeader": "Scheduled Transactions"},cardlessTxnDetails]];
    this.view.segAccounts.setData(cardlessTxnDetails);
  },
  getDataMap : function(){
    var dataMap={};
    dataMap = {
      "lblAccountName":"description",
      "lblAccountBal":"transactionDate",
      "lblAccountBalValue":"amount",
      "lblBankName":"fromAccountType",
      "accountID":"accountID",
      "lblHeader":"lblHeader"
    };
    return dataMap;
  },
  btnEditOnClick:function(){
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cardlessModule.presentationController.commonFunctionForNavigation("frmCardLessWithdrawQR");
  },
  btnContinueOnClick:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
   	cardlessModule.presentationController.setOverDraftFlag("false");
    cardlessModule.presentationController.createCardlessQRTransaction();
  },
  btnCancelOnClick:function(){
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cardlessModule.presentationController.commonFunctionForNavigation("frmCardLessHomeQR");
  }
});