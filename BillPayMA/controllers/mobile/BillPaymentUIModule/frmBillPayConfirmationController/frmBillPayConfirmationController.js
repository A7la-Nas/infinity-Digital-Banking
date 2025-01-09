define({
    tnCClicked: false,
  	init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function(){
      var scope = this;
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
      }
      var btntxt=kony.i18n.getLocalizedString("kony.mb.TermsAndConditions.Title");
    this.view.lblRichTxt.text= kony.i18n.getLocalizedString("kony.mb.externalAccounts.termnsConditionsChk")+"  "+"<a href=''>"+btntxt+"</a>";
    this.view. lblRichTxt.linkSkin= "sknBtn0095e428px";
    this.view.lblRichTxt.onClick=this.termsAndConditions;
      this.view.txtDescription.onTextChange = function () {
        var notesObj = scope.view.txtDescription.text;
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("transactionsNotes", notesObj);
      };
      this.populateData();
      this.initActions();
      this.checkForTnC();
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    initActions: function(){
      var notesObj = {};
        this.view.customHeader.flxBack.onClick = function(){
           var navMan=applicationManager.getNavigationManager();
           navMan.goBack();
        }
        this.view.customHeader.btnRight.onClick = function(){
           var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
           billPayModule.presentationController.cancelCommon();
        }
        this.view.btnContinue.onClick = this.continueOnClick;
      	this.view.btnTnC.onClick = this.termsAndConditions;
    this.view.flxCheckBox.onClick = this.toggleCheckBox;
    // this.view.postShow = this.postShow;
    },
  checkForTnC : function(){
    if(!this.tnCClicked)
      this.view.imgTermsAccepted.src = "tickmarkbox.png";
    if(this.view.imgTermsAccepted.src == "tickmarkbox.png")
    {
      this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
      this.view.btnContinue.setEnabled(false);
    }
    this.tnCClicked = false;
    if (this.view.flxConfirmationDetails.flxToPayee.lblPayeeAddress.text) {
        this.view.flxToPayee.height = 100;  
    } else {
        this.view.flxToPayee.height = 75;
    }
  },
  toggleCheckBox:function(){
    if(this.view.imgTermsAccepted.src==="tickmarkbox.png")
    {
      this.view.imgTermsAccepted.src="a.png";
      this.view.btnContinue.setEnabled(true);
      this.view.btnContinue.skin = "sknBtn055BAF26px";
    }
    else
    {
      this.view.imgTermsAccepted.src="tickmarkbox.png";
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    }
   },
  termsAndConditions:function()
  {
    this.tnCClicked = true;
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.getTermsAndConditions();
  },
  continueOnClick: function(){
    var description=this.view.txtDescription.text;
    var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayModule.presentationController.makeATransfer(description);
   },
  populateData:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var transObj= billPayMod.presentationController.getTransObject();
    var forUtility=applicationManager.getFormatUtilManager();
    var amount=forUtility.formatAmountandAppendCurrencySymbol(transObj.amount,transObj.transactionCurrency);
    var configManager = applicationManager.getConfigurationManager();
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var dataobj;
    this.view.lblPaymentAmountValue.text=amount;
    var name="";
    if (transObj.fromAccNickName === null || transObj.fromAccNickName === undefined) {
        name = transObj.fromAccountName;
    } 
	else {
        name =transObj.fromAccNickName;
    }
    var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
    if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
      this.view.flxAccountType.isVisible = false;
    }else{
      if(profileAccess === "both") {
        var isBusinessAccount = accountMod.presentationController.fetchIsBusinessAccount(transObj.fromAccountNumber);        
        this.view.flxAccountType.isVisible = true;
        this.view.imgAccountType.src="businessaccount.png";
        if(isBusinessAccount === false ||isBusinessAccount === "false"){
          this.view.imgAccountType.src = "personalaccount.png" ;
        }
      }else{
        this.view.flxAccountType.isVisible = false;
      }}
    
//     if (configManager.isCombinedUser === "true") {
//       var isBusinessAccount = accountMod.presentationController.fetchIsBusinessAccount(transObj.fromAccountNumber);
//       this.view.flxAccountType.isVisible = true;
//       this.view.flxtoAccountType.isVisible = true;
//       this.view.imgAccountType.src = (isBusinessAccount === "false") ? "personalaccount.png" : "businessaccount.png";
//       this.view.imgtoAccountType.src = (transObj.isBusinessPayee === "0") ? "personalaccount.png" : "businessaccount.png";
//     } 
    this.view.lblFromAccountValue.text =applicationManager.getPresentationUtility().formatText(name, 10, transObj.fromAccountNumber, 4);
    this.view.lblBank.text=transObj.fromBankName;
    this.view.lblToPayeeValue.text=transObj.payeeNickName;
    this.view.lblPayeeAddress.text=transObj.payeeAdress;
    this.view.segDetails.widgetDataMap={
              				lblKey:"key",
              				lblValue:"value",
	          				 };
    if(transObj.transactionsNotes)
      this.view.txtDescription.text = transObj.transactionsNotes;
    else
      this.view.txtDescription.text = "";
      var deliverDate = '';
      var sendOnDate = '';
      var navMan = applicationManager.getNavigationManager();
      var billObj = navMan.getCustomInfo("billPayObj");
      if(billObj.deliverDate)
      deliverDate = forUtility.getFormattedCalendarDate(billObj.deliverDate);
      if(billObj.startDate)
      sendOnDate = forUtility.getFormattedCalendarDate(billObj.startDate);
      deliverDate = forUtility.getFormattedCalendarDate(billObj.deliverDate);
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var transitDays = billPayMod.presentationController.getTransitDays();
    if(transObj.isScheduled=="0"){
       dataobj=[
      {"key":kony.i18n.getLocalizedString("kony.mb.transaction.frequency"), "value":kony.i18n.getLocalizedString("kony.mb.frequency.TransferNow")},{"key":kony.i18n.getLocalizedString("kony.mb.BillPay.TransactionDate"), "value": sendOnDate },{"key":kony.i18n.getLocalizedString("kony.mb.BillPay.DeliverBy"),"value":deliverDate}
    ]
    }
    else  {
      if(transObj.frequencyType=="Once"){
       dataobj=[
      		{"key":kony.i18n.getLocalizedString("kony.mb.transaction.frequency"), "value":kony.i18n.getLocalizedString("kony.mb.frequency.OneTime")},{"key":kony.i18n.getLocalizedString("kony.mb.BillPay.TransactionDate"),"value": forUtility.getFormattedCalendarDate(transObj.scheduledDate)},{"key":kony.i18n.getLocalizedString("kony.mb.BillPay.DeliverBy"),"value": deliverDate}
    	]
       }
      else if(scope_BillPayPresentationController.getDuration()==applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange"))  {
         dataobj=[
      		{"key":kony.i18n.getLocalizedString("kony.mb.transaction.frequency"), "value":transObj.frequencyType},{"key":kony.i18n.getLocalizedString("kony.mb.Transfers.Duration"), "value":kony.i18n.getLocalizedString("kony.mb.frequency.DateRange")},{"key":kony.i18n.getLocalizedString("kony.mb.Transfers.StartDate"),"value":forUtility.getFormattedCalendarDate(transObj.frequencyStartDate)},{"key":kony.i18n.getLocalizedString("kony.mb.Transfers.EndDate"),"value":forUtility.getFormattedCalendarDate(transObj.frequencyEndDate)},{ "key" : kony.i18n.getLocalizedString("kony.mb.BillPay.DeliveredIn"), "value" : transitDays +" days from transaction date"}
      	]
      }
      else if(scope_BillPayPresentationController.getDuration()==applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.RecurrenceNo"))  {
         dataobj=[
      		{"key":kony.i18n.getLocalizedString("kony.mb.transaction.frequency"), "value":transObj.frequencyType},{"key":kony.i18n.getLocalizedString("kony.mb.Transfers.Duration"), "value":kony.i18n.getLocalizedString("kony.mb.Transfers.RecurrenceNo")},{"key":kony.i18n.getLocalizedString("kony.mb.frequency.NumberofRecurrence"),"value":transObj.numberOfRecurrences},{"key":kony.i18n.getLocalizedString("kony.mb.Transfers.StartDate"),"value":forUtility.getFormattedCalendarDate(transObj.scheduledDate)},{ "key" : kony.i18n.getLocalizedString("kony.mb.BillPay.DeliveredIn"), "value" : transitDays + " days from transaction date"}
      	]
      }
    }
    this.view.segDetails.setData(dataobj);
  }
 });