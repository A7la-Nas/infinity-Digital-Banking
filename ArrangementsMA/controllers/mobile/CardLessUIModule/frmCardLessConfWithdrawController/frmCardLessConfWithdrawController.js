define({
  preShow:function(){
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
   		this.view.customHeader.btnRight.onClick = this.btnRightOnClick;
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
  	flxBackOnClick:function(){
    	var navMan=applicationManager.getNavigationManager();
    	navMan.goBack();
  	},
  	btnRightOnClick: function(){
	    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
		cardlessModule.presentationController.cancelCommon();
  	},
  	flxConfirmOnClick:function(){
	    applicationManager.getPresentationUtility().showLoadingScreen();
        var description=this.view.txtDescription.text;
    	var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
		cardlessModule.presentationController.setTransactionsNotes(description);
    	cardlessModule.presentationController.setOverDraftFlag("true");
    	cardlessModule.presentationController.setScheduledDate(this.view.lblTransactionDateValue.text);
    	cardlessModule.presentationController.createCardlessTransaction();
  },
  populateDetails:function(){
    var navMan=applicationManager.getNavigationManager();
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    var txnData=navMan.getCustomInfo("frmCardLessConfWithdraw");
    var forUtility=applicationManager.getFormatUtilManager();
    var dateobj=new Date();
    var configurationManager = applicationManager.getConfigurationManager();
    var formatedDate = forUtility.getFormatedDateString(dateobj,forUtility.getApplicationDateFormat());
    if(txnData&&txnData!==null)
    {
      if( configurationManager.isCombinedUser === "true"){
        this.view.imgBankType.isVisible = true;
        this.view.lblToAccountValue.left ="5dp";
        if( txnData.isBusinessAccount === "true"){
          this.view.imgBankType.src = "businessaccount.png";
        }else{
          this.view.imgBankType.src = "personalaccount.png";
        }
      }else {
        this.view.imgBankType.isVisible = false;
        this.view.lblToAccountValue.left ="0dp";
      }
      this.view.lblBankName.text = txnData.fromAccountType.text;
      this.view.lblAmountValue.text = forUtility.formatAmountandAppendCurrencySymbol(txnData.amount);
      this.view.lblToAccountValue.text = txnData.fromAccountNickName;
      if(txnData.cashlessMode==="Self"){
        this.view.lblForCollectionByValue.text="Self";
        this.view.lblPhoneNumber.isVisible=false;
      }
      else{
        this.view.lblForCollectionByValue.text = txnData.cashlessPersonName;
        if(cardlessModule.presentationController.getCashlessContactType()==="phone"){
          this.view.lblPhoneNumber.text=txnData.cashlessPhone;
        }
        else{
          this.view.lblPhoneNumber.text=txnData.cashlessEmail;
        }
        this.view.lblPhoneNumber.isVisible=true;
      }
      this.view.lblTransactionDateValue.text = formatedDate;
      if(txnData.transactionsNotes){
        this.view.txtDescription.text=txnData.transactionsNotes;
      }
      else{
        this.view.txtDescription.text="";
      }
    }
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }
 });