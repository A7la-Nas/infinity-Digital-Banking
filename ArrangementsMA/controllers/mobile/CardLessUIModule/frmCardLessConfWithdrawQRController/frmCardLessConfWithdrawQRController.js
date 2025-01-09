define({
  preShow:function(){
    //    this.view.customHeader.flxBack.onClick=this.flxBackOnClick;
    //    this.view.btnConfirm.onClick = this.flxConfirmOnClick;
    //    this.view.customHeader.flxHeader.btnRight.onClick = this.btnRightOnClick;
    this.renderTitleBar();
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    }
    this.populateDetails();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  init : function(){
    this.view.customHeader.flxBack.onClick=this.flxBackOnClick;
    this.view.btnConfirm.onClick = this.flxConfirmOnClick;
    this.view.customHeader.flxHeader.btnRight.onClick = this.btnRightOnClick;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  renderTitleBar:function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName()==='iPhone')
    {
      this.view.flxHeader.setVisibility(false);
    }
  },
  btnRightOnClick: function(){
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cardlessModule.presentationController.cancelCommonQR();
  },
  flxBackOnClick:function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  flxConfirmOnClick:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var description=this.view.txtDescription.text;
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
	cardlessModule.presentationController.setTransactionsNotes(description);
    cardlessModule.presentationController.setOverDraftFlag("true");
    cardlessModule.presentationController.setScheduledDate(this.view.lblTransactionDateValue.text);
    cardlessModule.presentationController.createCardlessQRTransaction();
  },
  populateDetails:function(){
    var navMan=applicationManager.getNavigationManager();
    var txnData=navMan.getCustomInfo("frmCardLessConfWithdrawQR");
    var forUtility=applicationManager.getFormatUtilManager();
    var dateobj=new Date();
    var formatedDate = forUtility.getFormatedDateString(dateobj,forUtility.getApplicationDateFormat());
    if(txnData&&txnData!==null)
    {
      this.view.lblBankName.text = txnData.fromAccountType;
      this.view.lblAmountValue.text = forUtility.formatAmountandAppendCurrencySymbol(txnData.amount);
      this.view.lblToAccountValue.text = txnData.fromAccountName;
      this.view.lblForCollectionByValue.text="Self";
      this.view.lblTransactionDateValue.text = formatedDate;
      if(txnData.transactionsNotes){
        this.view.txtDescription.text=txnData.transactionsNotes;
      }
      else{
        this.view.txtDescription.text="";
      }
    }
  }
});