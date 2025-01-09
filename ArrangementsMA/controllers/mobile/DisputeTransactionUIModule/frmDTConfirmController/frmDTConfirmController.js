define({
  init: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
       this.initActions();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  navigateCustomBack: function() {
    
  },
  preShow: function () {
    
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxConfirmation.top = "0dp";
    }
    this.populateData();
    this.view.txtbxDescOptional.text="";
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions: function () {
    var scope=this;
    this.view.customHeader.flxBack.onClick = function(){
      var navMan = applicationManager.getNavigationManager();
      navMan.goBack();
    };
    this.view.btnContinue.onClick = function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navManager =applicationManager.getNavigationManager();
      var transactionData = navManager.getCustomInfo("frmDisputeTransactionDetails");
      var disputeMod = applicationManager.getModulesPresentationController({"moduleName" : "DisputeTransactionUIModule", "appName" : "ArrangementsMA"});
      transactionData.disputeDescription = scope.view.txtbxDescOptional.text;
      navManager.setCustomInfo("frmDisputeTransactionDetails",transactionData);
      disputeMod.createDisputeTransaction(transactionData);
    }
  },
  populateData:function(){
    var navManager =applicationManager.getNavigationManager();
    var transactionData = navManager.getCustomInfo("frmDisputeTransactionDetails");
    var formatUtil = applicationManager.getFormatUtilManager();
    var name="";
    var formattedfromAccountName="";
    if(transactionData.cardType) {
      this.view.flxCategory.setVisibility(true);
      this.view.flxMerchantAddressName.setVisibility(true);
      this.view.flxMerchantCity.setVisibility(true);
      this.view.lblCategoryValue.text = transactionData.merchantCategory;
      this.view.lblMerchantAddressNameValue = transactionData.transactionMerchantAddressName;
      this.view.lblMerchantCityValue = transactionData.transactionMerchantCity;
    } else {
      this.view.flxCategory.setVisibility(false);
      this.view.flxMerchantAddressName.setVisibility(false);
      this.view.flxMerchantCity.setVisibility(false);
    }
    if(transactionData.transactionType === "T") transactionData.transactionType = "Card Payment";
   this.view.lblTransferDescription.text=(transactionData.transactionType) ? transactionData.transactionType : "";
   this.view.lblTransferValue.text=(transactionData.amount) ? transactionData.amount : (transactionData.transactionAmount ? transactionData.transactionAmount : "");
   this.view.lblDisputeStatus.text=(transactionData.statusDescription) ? transactionData.statusDescription : "";
   this.view.lblReferenceValue.text=(transactionData.disputeReefernce)? transactionData.disputeReefernce:(transactionData.transactionReferenceNumber ? transactionData.transactionReferenceNumber : "");
    if (transactionData.fromNickName === null || transactionData.fromNickName === undefined) {
      name = transactionData.fromAccountName;
    } else {
      name =transactionData.fromNickName;
    }
     
//     if(transactionData.fromAccountName && transactionData.fromAccountNumber)
//     formattedfromAccountName = applicationManager.getPresentationUtility().formatText(name, 10, transactionData.fromAccountNumber, 4);
    formattedfromAccountName=(transactionData.fromAccountName && transactionData.fromAccountNumber)?  applicationManager.getPresentationUtility().formatText(name, 10, transactionData.fromAccountNumber, 4) : 
    (transactionData.fromAccountNumber)?applicationManager.getDataProcessorUtility().maskAccountNumber(transactionData.fromAccountNumber):
    (transactionData.accountId)?applicationManager.getDataProcessorUtility().maskAccountNumber(transactionData.accountId):
    (transactionData.fromAccountName)?transactionData.fromAccountName:""
    this.view.lblFromAccountValue.text= (formattedfromAccountName && formattedfromAccountName!=="" && formattedfromAccountName!==null) ? formattedfromAccountName:
                                             (name && name!="" && name!=null) ?name :   
                                             (transactionData.fromAccountNumber && transactionData.fromAccountNumber!="" && transactionData.fromAccountNumber!=null) ?transactionData.fromAccountNumber:"-";
   this.view.lblFromBankType.text= (transactionData.fromAccountType) ? transactionData.fromAccountType : "";
     if(transactionData.transactionType == "P2P"){
       if(transactionData.payPersonName)
        this.view.lblToAccountValue.text = transactionData.payPersonName;
       else
        this.view.lblToAccountValue.text = '-';
         
      if(transactionData.toAccountType)
        this.view.lblToBankType.text = transactionData.toAccountType;
      else
        this.view.lblToBankType.text = "";
    }
    else{
      if(transactionData.toAccountNumber)
        toAcc = applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.toAccountNumber, 4);
      else
        toAcc = applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.ExternalAccountNumber, 4);
        
      if (toAcc)
        this.view.lblToAccountValue.text = toAcc;
      else
        this.view.lblToAccountValue.text = '-';
      
      if(transactionData.toAccountType)
        this.view.lblToBankType.text = transactionData.toAccountType;
      else
        this.view.lblToBankType.text = "";
    }
    this.view.lblDescriptionValue.text = (transactionData.description) ? transactionData.description:(transactionData.transactionDescription ? transactionData.transactionDescription : "");
    this.view.lblTransactionDateValue.text =(transactionData.scheduledDate)?transactionData.scheduledDate:(transactionData.transactionDate ? 
                                                                          formatUtil.getFormatedDateString(formatUtil.getDateObjectfromString(transactionData.transactionDate, "YYYY-MM-DD HH:MM:SS"), formatUtil.getApplicationDateFormat()) : "");
    if(transactionData.recurrenceDesc!==undefined && transactionData.recurrenceDesc!== null  && transactionData.recurrenceDesc!=="0")
    {
     this.view.lblRecurrenceTypeValue.text = transactionData.recurrenceDesc;
      this.view.flxRecurrenceType.setVisibility(true);
    }
    else
      this.view.flxRecurrenceType.setVisibility(false);
    this.view.lblReferenceValue.text = (transactionData.transactionId) ? transactionData.transactionId :(transactionData.transactionReferenceNumber ? transactionData.transactionReferenceNumber : "");
    this.view.lblNoteValue.text = (transactionData.transactionsNotes) ? transactionData.transactionsNotes :"-";
    this.view.lblReasonValue.text=transactionData.disputeReason;

  }
 
});