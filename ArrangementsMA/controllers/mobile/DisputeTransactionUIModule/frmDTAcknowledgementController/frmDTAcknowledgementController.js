define({
  init: function () {
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    this.initActions();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, this.navigateCustomBack);
  },
  navigateCustomBack: function() {
    var navMan = applicationManager.getNavigationManager();
    if (navMan.getEntryPoint("DisputeEntry") === "frmCardTransactionDetails") {
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" :"ManageCardsUIModule", "appName" : "CardsMA"});
      manageCardsModule.presentationController.isFirstTime = true;
      manageCardsModule.presentationController.showCardsHome();
    }
    else {
      applicationManager.getModulesPresentationController({"moduleName" : "DisputeTransactionUIModule", "appName" : "ArrangementsMA"}).commonFunctionForNavigation({"appName":"ArrangementsMA","friendlyName":"frmAccountDetails"});
    }
  },
  preShow: function () {
    var navManager =applicationManager.getNavigationManager();
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxConfirmation.top = "0dp";
    }
    var navManager = applicationManager.getNavigationManager();
    var transactionData = navManager.getCustomInfo("frmDisputeTransactionDetails");
    if (!kony.sdk.isNullOrUndefined(transactionData.errmsg)) {
      this.view.flxConfirmation.isVisible = false;
      this.view.flxFailure.isVisible = true;
      this.view.lblError.text = transactionData.errmsg;
      this.view.lblSavedRecipient.isVisible = false;
    }
    else {
      this.view.flxConfirmation.isVisible = true;
      this.view.lblSavedRecipient.isVisible = true;
      this.view.flxFailure.isVisible = false;
      this.populateData();
    }  
    if(transactionData.isMesssageError) {
      this.view.flxConfirmation.isVisible = true;
      this.view.lblSavedRecipient.isVisible = true;
      this.view.flxFailure.isVisible = false;
      this.populateData();
      this.view.lblSavedRecipient.isVisible = false;
    }
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions: function () {
    this.view.btnViewRequests.onClick = function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
     var navMan=applicationManager.getNavigationManager();
        var formname="frmAccountDetails";
        var index = navMan.getFormIndex(formname);
        var stackLength=navMan.stack.length;
      	if(index === null)
          navMan.setFormIndex(formname,stackLength-1);
        else{
          for(var i=stackLength-1; i>index; i--){
            navMan.removeFormIndex(navMan.stack[i]);
            navMan.stack.pop();
          }
        }
      navMan.setEntryPoint("ViewRequest","");
      applicationManager.getModulesPresentationController({"moduleName" : "DisputeTransactionUIModule", "appName" : "ArrangementsMA"}).getDisputeTransactionDetails();
    };
    this.view.btnBackToAccounts.onClick = function(){
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"});
      accountMod.presentationController.showDashboard();
    }
    this.view.btnToAccount.onClick = function() {
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"});
      accountMod.presentationController.showDashboard();
    }
  },
  populateData:function(){
    var navManager =applicationManager.getNavigationManager();
    var formatUtil = applicationManager.getFormatUtilManager();
    var transactionData = navManager.getCustomInfo("frmDisputeTransactionDetails");
    var name="";
    var formattedfromAccountName="";
    this.view.lblReferenceValue.text=(transactionData.disputeReference)? transactionData.disputeReference:"-";
    if(transactionData.transactionType === "T") transactionData.transactionType = "Card Payment";
    if (transactionData.fromNickName === null || transactionData.fromNickName === undefined) {
      name = transactionData.fromAccountName;
    } else {
      name =transactionData.fromNickName;
    }
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
    if(transactionData.fromAccountName && transactionData.fromAccountNumber)
    formattedfromAccountName = applicationManager.getPresentationUtility().formatText(name, 10, transactionData.fromAccountNumber, 4);
 
    this.view.lblFromAccountValue.text= (formattedfromAccountName && formattedfromAccountName!="" && formattedfromAccountName!=null) ? formattedfromAccountName:
                                             (name && name!="" && name!=null) ?name :   
                                             (transactionData.fromAccountNumber && transactionData.fromAccountNumber!="" && transactionData.fromAccountNumber!=null) ?transactionData.fromAccountNumber:"-";
      
    this.view.lblFromBankName.text= (transactionData.fromAccountType) ? transactionData.fromAccountType : "-";
    if(transactionData.transactionType == "P2P"){
      this.view.lblToAccountValue.text=(transactionData.payPersonName) ? transactionData.payPersonName :"-";
      if(transactionData.toAccountType)
        this.view.lblToBankName.text = transactionData.toAccountType;
      else
        this.view.lblToBankName.text = "";
    }
    else{
      if(transactionData.toAccountNumber){
        toAccVal = applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.toAccountNumber, 4);         
      }
      else{
        toAccVal =  applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.ExternalAccountNumber, 4);       
      }
      this.view.lblToAccountValue.text = (toAccVal) ? toAccVal : "-";

      if(transactionData.toAccountType)
        this.view.lblToBankName.text = transactionData.toAccountType;
      else
        this.view.lblToBankName.text = "";
    }
    this.view.lblAmountValue.text=(transactionData.amount) ? transactionData.amount:(transactionData.transactionAmount ? transactionData.transactionAmount : "-");
    this.view.lblDescriptionValue.text = (transactionData.description) ? transactionData.description:(transactionData.transactionDescription ? transactionData.transactionDescription : "-");
    this.view.lblTransactionDateValue.text =(transactionData.scheduledDate)? transactionData.scheduledDate : (transactionData.transactionDate ? 
                                            formatUtil.getFormatedDateString(formatUtil.getDateObjectfromString(transactionData.transactionDate, "YYYY-MM-DD HH:MM:SS"), formatUtil.getApplicationDateFormat()) : "-");
    if(transactionData.recurrenceDesc!==undefined && transactionData.recurrenceDesc!== null  && transactionData.recurrenceDesc!=="0")
    {
     this.view.lblRecurrenceTypeValue.text = transactionData.recurrenceDesc;
      this.view.flxRecurrenceType.setVisibility(true);
    }
    else
      this.view.flxRecurrenceType.setVisibility(false);
    this.view.lbltransreferencevalue.text=(transactionData.disputeReference) ? transactionData.disputeReference : (transactionData.transactionReferenceNumber ? transactionData.transactionReferenceNumber : "-");
    this.view.lblNoteValue.text = (transactionData.transactionsNotes) ? transactionData.transactionsNotes :"-";
    this.view.lblReasonValue.text=transactionData.disputeReason;
    this.view.lblDisputeDescriptionValue.text=transactionData.disputeDescription;

  }
});