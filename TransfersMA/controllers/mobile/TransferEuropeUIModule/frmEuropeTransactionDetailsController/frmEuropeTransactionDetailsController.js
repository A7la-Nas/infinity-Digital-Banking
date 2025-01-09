define({
  customerId: "",
  accountId: "",
  transactionType: "",
  mediaType: "pdf",
  base64Front: "",
  base64Back: "",
  segmentCheckdata : [{}],
  init : function(){
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  
  onNavigate: function(obj) {
    var config = applicationManager.getConfigurationManager();
    var navMan = applicationManager.getNavigationManager();
    if (!config.isDisputeConfigurationAdded && navMan.getEntryPoint("frmEuropeTransactionDetails") === "Accounts") {
      var disputePresentationController = applicationManager.getModulesPresentationController("DisputeTransactions")
      disputePresentationController.fetchDisputeConfiguration(this.preShow);
    }
    else {
      this.preShow();
    }
  },
  
  preShow:function(obj)
  {
    var MenuHandler = applicationManager.getMenuHandler();
    var navMan=applicationManager.getNavigationManager();
	  var userManager = applicationManager.getUserPreferencesManager();
    this.customerId = userManager.getBackendIdentifier();
    this.view.lblAttachmentsValue.text = "";
    //var requestParamAccount = navMan.getCustomInfo("frmAccountDetails");
    var transactionData =navMan.getCustomInfo("frmEuropeTransactionDetails");
    var downloadAttachments = transactionData.fileNames;
    navMan.setCustomInfo("existingAttachments", transactionData.fileNames);
    var downloadAttachmentFileNames = [];
    if(downloadAttachments && downloadAttachments.length>0){
      for(var i=0; i<downloadAttachments.length;i++){
        this.view.lblAttachmentsValue.text += downloadAttachments[i].fileName;
        downloadAttachmentFileNames.push(downloadAttachments[i].fileName);
        if(i !== downloadAttachments.length-1)
        this.view.lblAttachmentsValue.text += ", "; 
      }
      var attachmentsValue = this.view.lblAttachmentsValue.text;
      this.view.lblAttachmentsValue.text = attachmentsValue.substring(0, 35)+"...";
      this.view.flxViewAttachments.setVisibility(true);
      this.view.flxViewAttachments.onClick = this.navigateToDownloadAttachments;
    }
    else{
      this.view.lblAttachmentsValue.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.common.none");
      this.view.flxViewAttachments.setVisibility(false);
    }
    navMan.setCustomInfo("downloadAttachments", downloadAttachmentFileNames);
    this.accountId = transactionData.fromAccountNumber;
    this.transactionType = transactionData.transactionType;
    var deviceUtilManager =applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
	this.view.lblReferenceNoValueTrans.setVisibility(true);
	this.view.btnReferenceValue.setVisibility(false);
	this.view.segCheckImages.setVisibility(false);
    this.view.flxCheckNumber.setVisibility(false);
    this.view.flxCross.onClick = this.flxCrossOnClick;
    if(isIphone){
      this.view.flxHeader.isVisible = false;
      this.view.flxFooter.isVisible=false;
    }
    else{
      this.view.flxHeader.isVisible = true;
    }
    if(transactionData.isScheduled!==undefined && transactionData.isScheduled!== null && transactionData.isScheduled=== "true")
    {
      this.view.customHeader.btnRight.setVisibility(true);
      this.view.customHeader.btnRight.onClick = this.btnEditOnClick;
      if(isIphone){
        var rightBarButtonItem = new kony.ui.BarButtonItem({
          type: constants.BAR_BUTTON_TITLE,
          style: constants.BAR_ITEM_STYLE_PLAIN,
          enabled: true,
          action: this.btnEditOnClick,
          tintColor: "sknBtnffffffSSPSemiBold30px",
          metaData: {
            title:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Edit","Edit")
          }
        });
        this.view.setRightBarButtonItems({items:[rightBarButtonItem],animated:true});
      }
    }
    else {
      this.view.customHeader.btnRight.setVisibility(false);
      if (isIphone)
      {
        var rightBarButtonItem = new kony.ui.BarButtonItem({
          type: constants.BAR_BUTTON_TITLE,
          style: constants.BAR_ITEM_STYLE_PLAIN,
          enabled: false,
          action: function(){},
          tintColor: "FFFFFF00",
          metaData: {
            title:""
          }
        });
        this.view.setRightBarButtonItems({items:[rightBarButtonItem],animated:true});
      }
    }
    if(transactionData.isScheduled === "true")
      this.renderViewForTransfer('pending');
    else if(transactionData.statusDescription==="Pending")
    {
      this.renderViewForTransfer('pending1');
    }
    else
    {
      this.renderViewForTransfer();
    }
    var navManager =applicationManager.getNavigationManager();
	this.view.btnReferenceValue.onClick = this.btnReferenceValueOnClick;
    this.view.segCheckImages["widgetSkin"] = "sknSegffffff";
	this.view.segCheckImages.pageSkin = "sknManageCardsPage";
    this.bindDataForTransfer(transactionData);
    this.view.customHeader.flxBack.onTouchEnd = function(){
      navManager.goBack();
    }
    this.view.btnViewRequest.onClick = function(){
       navManager.setEntryPoint("ViewRequest","TransactionDetails");
      applicationManager.getPresentationUtility().showLoadingScreen();
      applicationManager.getModulesPresentationController("DisputeTransactions").getDisputeTransactionDetails();   
    }
    this.view.btnDisputetTransactionTrans.onClick=function(){
      var disputeModule = applicationManager.getModulesPresentationController("DisputeTransactions");
      navMan.setCustomInfo("frmDisputeTransactionDetails",navMan.getCustomInfo("frmEuropeTransactionDetails"));
      navMan.setEntryPoint("DisputeEntry","frmEuropeTransactionDetails");
      disputeModule.navigateToDisputeReason("frmDisputeReason");
    }
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
	if(this.transactionType !== "Cheque" && this.transactionType !== "Draft" && this.transactionType !== "SwiftPayment" && this.transactionType !== "CheckWithdrawal" && this.transactionType !== "CheckDeposit")
    {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    this.postShow();
  },

  postShow: function () {
    var navMan = applicationManager.getNavigationManager();
    if (navMan.getEntryPoint("frmEuropeTransactionDetails") === "Accounts") {
      var formatUtil = applicationManager.getFormatUtilManager();
      var configManager = applicationManager.getConfigurationManager();
      var transactionData = navMan.getCustomInfo("frmEuropeTransactionDetails");
      var dateDiff = formatUtil.getNumberOfDaysBetweenTwoDates(formatUtil.getDateObjectfromString(transactionData.transactionDate), new Date());
      if (configManager.getDisputeConfig(transactionData.transactionType)) {
        if (transactionData.isScheduled !== "true" && transactionData.statusDescription !== "Pending" && configManager.getDisputeConfig(transactionData.transactionType) === "true" && dateDiff <= configManager.getDisputeDuration() && (configManager.checkUserFeature("DISPUTE_TRANSACTIONS") === true || configManager.checkUserFeature("DISPUTE_TRANSACTIONS") === "true")) {
          if (configManager.getDisputeCDConfig("both") || (configManager.getDisputeCDConfig("debit") && formatUtil.isDebitTransaction(transactionData.amount)) || (configManager.getDisputeCDConfig("credit") && formatUtil.isCreditTransaction(transactionData.amount))) {
            if (transactionData.isDisputed && transactionData.isDisputed === "true") {
              this.view.btnDisputetTransactionTrans.setVisibility(false);
              this.view.btnViewRequest.setVisibility(true);
            }
            else {
              this.view.btnDisputetTransactionTrans.setVisibility(true);
              this.view.btnViewRequest.setVisibility(false);
            }
          }
          else {
            this.view.btnDisputetTransactionTrans.setVisibility(false);
            this.view.btnViewRequest.setVisibility(false);
          }
        }
        else {
          this.view.btnDisputetTransactionTrans.setVisibility(false);
          this.view.btnViewRequest.setVisibility(false);
        }
      }
    }
    else {
      this.view.btnDisputetTransactionTrans.setVisibility(false);
      this.view.btnViewRequest.setVisibility(false);
    }
  },
  bindDataForTransfer:function(transactionData)
  {
    var transactionObj = applicationManager.getTransactionManager();
    var frequencyTypes= transactionObj.getAvailableFrequencyType();
    var formatUtil = applicationManager.getFormatUtilManager();
    var userPrefManager = applicationManager.getUserPreferencesManager();
    var customerIDs=userPrefManager.accessibleCustomerIds;
    var singleCustomerID=userPrefManager.isSingleCustomerProfile;
    var iconVisibility=false;
      customerIDs.forEach((item,index)=>{
       if(index!==0){
         if(customerIDs[0].type!==item.type){
           iconVisibility=true;
         }
       }
      });
   this.view.lblTransferValue.text = transactionData.amount;
    var name="";
    if (transactionData.fromNickName === null || transactionData.fromNickName === undefined) {
      name = transactionData.fromAccountName;
    } else {
      name =transactionData.fromNickName;
    }
    this.view.lblTransferredFromValueTrans.text = applicationManager.getPresentationUtility().formatText(name, 10, transactionData.fromAccountNumber, 4);
    this.view.lblAccTypeFromTrans.text = transactionData.fromAccountType;
    if(singleCustomerID){
      this.view.flxFromAccountType.isVisible=false;
      this.view.flxToAccountType.isVisible=false;
      this.view.lblTransferredToValueTrans.left="20dp";
      this.view.lblTransferredFromValueTrans.left="20dp";
    }
    else{
      if(iconVisibility){
        this.setIconType(transactionData);
     }
    }
   if(transactionData.transactionType == "P2P"){
      this.view.lblTransferredToValueP2P.text = transactionData.payPersonName;
      this.view.lblPhoneNo.text = transactionData.payPersonPhone;
      if(transactionData.toAccountType)
        this.view.lblAccTypeP2P.text = transactionData.toAccountType;
      else
        this.view.lblAccTypeP2P.text = "";
      this.view.flxTransferredToTrans.setVisibility(false);
      this.view.flxTransferredToP2P.setVisibility(true);
    }
	else if (transactionData.transactionType === "Cheque" || transactionData.transactionType === "Draft" || transactionData.transactionType === "CheckWithdrawal" || transactionData.transactionType === "CheckDeposit") {
      this.view.lblTransfer.text = transactionData.transactionType;
      this.view.flxTransactionDateTrans.setVisibility(false);
      this.view.lblTransDateValueTrans.text = transactionData.scheduledDate || "-";
      //             this.view.flxPostedDateTrans.setVisibility(true);
      this.view.flxCheckNumber.setVisibility(true);
      this.view.segCheckImages.setVisibility(true);
      this.view.lblCheckNumberValue.text = "N.A";
      this.view.btnRepeatTransactionTrans.setVisibility(false);
      this.view.btnDownloadTransactionTrans.setVisibility(true);
      this.view.btnDisputetTransactionTrans.setVisibility(true);
      //             this.view.btnViewRequest.setVisibility(false);
      this.view.btnCancelTransactionTrans.setVisibility(false);
      this.view.btnCancelThisOccurenceTrans.setVisibility(false);
      //             this.view.btnCancelSeriesTrans.setVisibility(false);
      this.view.btnReferenceValue.setVisibility(false);
      this.mediaType = "png";
      this.segmentCheckdata=[{}];
      applicationManager.getPresentationUtility().showLoadingScreen();
      
      var paramsFrontBase64 = {
        "customerId": this.customerId,
        "accountId": this.accountId,
        "transactionRef": transactionData.transactionId,
        "mediaType": this.mediaType,
        "transactionType": this.transactionType,
        "page": "0"
      };
      var ModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      ModulePresentationController.viewImage(paramsFrontBase64);
      
      if (this.transactionType !== "Draft") {
        var paramsBackBase64 = {
          "customerId": this.customerId,
          "accountId": this.accountId,
          "transactionRef": transactionData.transactionId,
          "mediaType": this.mediaType,
          "transactionType": this.transactionType,
          "page": "1"
        };
        ModulePresentationController.viewImage(paramsBackBase64);
      }
      this.view.forceLayout();
    }
    else if (transactionData.transactionType === "SwiftPayment") {
      this.view.lblTransfer.text = transactionData.transactionType;
      this.view.flxTransactionDateTrans.setVisibility(true);
      this.view.lblTransDateValueTrans.text = transactionData.scheduledDate;
//       this.view.flxPostedDateTrans.setVisibility(false);
      this.view.flxCheckNumber.setVisibility(false);
      this.view.segCheckImages.setVisibility(false);
      //       this.view.lblCheckNumberValue.text = transactionData.checkNumber;
      this.view.btnReferenceValue.text = transactionData.transactionId;
      this.view.btnRepeatTransactionTrans.setVisibility(true);
      this.view.btnDownloadTransactionTrans.setVisibility(true);
      this.view.btnDisputetTransactionTrans.setVisibility(true);
//       this.view.btnViewRequest.setVisibility(false);
      this.view.btnCancelTransactionTrans.setVisibility(false);
      this.view.btnCancelThisOccurenceTrans.setVisibility(false);
//       this.view.btnCancelSeriesTrans.setVisibility(false);
      this.view.forceLayout();
      var transactionType = transactionData.transactionType;
      this.mediaType = "pdf";
      this.segmentCheckdata=[{}];
      applicationManager.getPresentationUtility().showLoadingScreen();
      var paramsFrontBase64 = {
        "customerId": this.customerId,
        "accountId": this.accountId,
        "transactionRef": transactionData.transactionId,
        "mediaType": this.mediaType,
        "transactionType": this.transactionType,
        "page": "0"
      };
      var ModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      ModulePresentationController.viewImage(paramsFrontBase64);

    }    
    else{
      if(transactionData.toAccountNumber)
        this.view.lblTransferredToValueTrans.text = applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.toAccountNumber, 4);
      else
        this.view.lblTransferredToValueTrans.text = applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.ExternalAccountNumber, 4);
      if(transactionData.toAccountType)
        this.view.lblAccTypeTrans.text = transactionData.toAccountType;
      else
        this.view.lblAccTypeTrans.text = "";
      this.view.flxTransferredToTrans.setVisibility(true);
      this.view.flxTransferredToP2P.setVisibility(false);
    }
    this.view.lblDescValueTrans.text = transactionData.description || "-";
    this.view.lblTransDateValueTrans.text = formatUtil.getFormatedDateString(formatUtil.getDateObjectfromString(transactionData.scheduledDate), formatUtil.getApplicationDateFormat())|| "-";
    this.view.lblFreqTransValue.text = transactionData.frequencyType || "-";
    this.view.lblRecurrenceValueTrans.text = this.getRecurrenceValue(transactionData);
    if (transactionData.transactionType === "ExternalTransfer") {
      this.view.flxPaymentMethod.setVisibility(true);
      this.view.flxBeneficiaryNickname.setVisibility(true);
      this.view.flxBeneficiaryAddress.setVisibility(true);
      this.view.lblPaymentMethodValue.text = this.getPaymentMethodByType(transactionData.serviceName);
      this.view.lblBeneficiaryNicknameValue.text = transactionData.beneficaryNickname || "-";
      this.view.lblBeneficiaryAddressValue.text = transactionData.beneficaryAddress || "-";
    }  
    else { 
      this.view.flxPaymentMethod.setVisibility(false);
      this.view.flxBeneficiaryNickname.setVisibility(false);
      this.view.flxBeneficiaryAddress.setVisibility(false);
    }    
    
    if(transactionData.isScheduled == "true" && transactionData.frequencyType!=frequencyTypes.ONCE)
    {
      this.view.btnCancelThisOccurenceTrans.setVisibility(false);
      this.view.btnCancelSeriesTrans.setVisibility(true);
      this.view.btnCancelTransactionTrans.setVisibility(false);
    }
    else
    {
      this.view.btnCancelThisOccurenceTrans.setVisibility(false);
      this.view.btnCancelSeriesTrans.setVisibility(false);
    }
    if(kony.sdk.isNullOrUndefined(transactionData.IBAN)){
      this.view.flxIBAN.setVisibility(false);
    }
    else{
      this.view.lblIBANValue.text = formatUtil.formatIBAN(transactionData.IBAN);
      this.view.flxIBAN.setVisibility(true);
    }
    if(kony.sdk.isNullOrUndefined(transactionData.transactionCurrency)){
      this.view.flxCurrencyTransfer.setVisibility(false);
    }
    else{
      this.view.lblCurrencyValueTransfer.text = transactionData.transactionCurrency;
      this.view.flxCurrencyTransfer.setVisibility(true);
    }
    if(kony.sdk.isNullOrUndefined(transactionData.convertedAmount)){
      this.view.flxConvertedAmount.setVisibility(false);
    }
    else{
      this.view.lblConvertedValue.text = transactionData.convertedAmount;
      this.view.flxConvertedAmount.setVisibility(true);
    }
    if(kony.sdk.isNullOrUndefined(transactionData.feeCurrency) || kony.sdk.isNullOrUndefined(transactionData.fee)){
      this.view.flxTransactionFeeTransfer.setVisibility(false);
    }
    else{
      if(!kony.sdk.isNullOrUndefined(transactionData.fee) && Number(transactionData.fee) > 0){
        this.view.lblTransactionFeeValueTransfer.text = formatUtil.formatAmountandAppendCurrencySymbol(transactionData.fee,transactionData.feeCurrency);
        this.view.flxTransactionFeeTransfer.setVisibility(true);
      }
      else
        this.view.flxTransactionFeeTransfer.setVisibility(false);
    }
    this.view.lblReferenceNoValueTrans.text = transactionData.transactionId || "-";
    this.view.lblNotesValueTrans.text = (transactionData.isScheduled === "true") ? transactionData.transactionsNotes : transactionData.description;
    this.view.btnRepeatTransactionTrans.onClick = this.repeatTrans;
    this.view.btnCancelTransactionTrans.onClick = this.cancelTransactionTrans;
    //this.view.btnCancelThisOccurenceTrans.onClick = this.cancelRecurrenceTrans;
    this.view.btnCancelSeriesTrans.onClick = this.cancelSerieTrans;
    this.view.btnDownloadTransactionTrans.onClick = this.onclickdownload;
  },
  setIconType : function(transactionData){
    var serviceName=transactionData.serviceName;
    if(serviceName.includes("TRANSFER_BETWEEN_OWN_ACCOUNT")){
      this.view.flxToAccountType.isVisible=true;
      this.view.lblTransferredToValueTrans.left="10dp";
      if(transactionData.isBusinessPayee==="0")
        this.view.ImageToAccountType.src="personalaccount.png";
      else
        this.view.ImageToAccountType.src="businessaccount.png";
    }
    else{
       this.view.flxToAccountType.isVisible=false;
      this.view.lblTransferredToValueTrans.left="20dp";
    }
    this.view.flxFromAccountType.isVisible=true;
     this.view.lblTransferredFromValueTrans.left="10dp";
    var isBusinessaccount=this.getAccountTypeFromAcc(transactionData.fromAccountNumber);
    if(isBusinessaccount){
      this.view.ImageFromAccountType.src="businessaccount.png";
    }
    else{
      this.view.ImageFromAccountType.src="personalaccount.png";
    }
  },
  getAccountTypeFromAcc: function(fromAccountNumber){
     var accountObj = applicationManager.getAccountManager();
    var accountData = accountObj.getInternalAccounts();
    var isBusinessacc=false;
    accountData.forEach(item=>{
      if(item.Account_id===fromAccountNumber){
        isBusinessacc=(item.isBusinessAccount==="false")?false:true;
      }
    });
    return isBusinessacc; 

  },
  cancelSerieTrans:function()
  {
    var basicConfig={
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cancelSeries"),
      "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
      "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
      "alertHandler": this.cancelTrans
    };
    applicationManager.getPresentationUtility().showAlertMessage(basicConfig,{});
  },
  cancelTransactionTrans:function()
  {
    var basicConfig={
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.AreyousuredoyouwanttocancelTransaction?"),
      "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
      "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
      "alertHandler": this.cancelTrans
    };
    applicationManager.getPresentationUtility().showAlertMessage(basicConfig,{});
  },
  cancelTrans:function(response)
  {
    if(response===true)
    {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      var navMan=applicationManager.getNavigationManager();
      var transactionData =navMan.getCustomInfo("frmEuropeTransactionDetails");
      if (transactionData) 
      transferModPresentationController.setTransactionMode(transactionData.serviceName);
      transferModPresentationController.deleteTransaction(transactionData.transactionId);
    }
  },
  cancelRecurrenceTrans:function()
  {
    var basicConfig={
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
      "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
      "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cancelOccurence"),
      "alertHandler": this.cancelRecTrans
    };
    applicationManager.getPresentationUtility().showAlertMessage(basicConfig,{});
  },
  cancelRecTrans:function(response)
  {
    if(response===true)
    {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      var navMan=applicationManager.getNavigationManager();
      var transactionData =navMan.getCustomInfo("frmEuropeTransactionDetails");
      if (transactionData) 
      transferModPresentationController.setTransactionMode(transactionData.serviceName);
      transferModPresentationController.deleteRecurrenceTransaction(transactionData.transactionId);
    }
  },
  repeatTrans:function()
  {
    var navMan=applicationManager.getNavigationManager();
    var transactionData =navMan.getCustomInfo("frmEuropeTransactionDetails");
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
	  transferModPresentationController.initializeStateData(false, "");
    if (transactionData)
    transferModPresentationController.setTransactionMode(transactionData.serviceName);
    if (transferModPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts")) {
      transferModPresentationController.setEuropeFlowType("INTERNAL");
      transferModPresentationController.getFromAccounts(function(res) {
        transferModPresentationController.setFromAndToAccounts(res);
        transferModPresentationController.repeatTransfer(transactionData);
      });
    }
    else {
      transferModPresentationController.setEuropeFlowType("EXTERNAL");
      transferModPresentationController.getFromAndToAccounts(function(res) {
        transferModPresentationController.setFromAndToAccounts(res);
        transferModPresentationController.repeatTransfer(transactionData);
      });
    }  
  },
  renderViewForTransfer:function(viewMode)
  {
    var navManager=applicationManager.getNavigationManager();
    var transactionData =navManager.getCustomInfo("frmEuropeTransactionDetails");
    if(viewMode==='pending')
    {
      this.view.btnCancelTransactionTrans.setVisibility(true);
      //this.view.btnDisputetTransactionTrans.setVisibility(false);
      this.view.btnRepeatTransactionTrans.setVisibility(false);
      this.view.lblSuccess.setVisibility(false);
      //this.view.btnViewRequest.setVisibility(false);
    }
    else if(viewMode==='pending1')
    {
      this.view.btnCancelTransactionTrans.setVisibility(false);
      //this.view.btnDisputetTransactionTrans.setVisibility(false);
      this.view.btnRepeatTransactionTrans.setVisibility(false);
      this.view.lblSuccess.setVisibility(false);
      this.view.lblPending.setVisibility(true);
      //this.view.btnViewRequest.setVisibility(false);
    }
    else
    {
      var Mod = navManager.getEntryPoint("frmEuropeTransactionDetails");
      this.view.btnCancelTransactionTrans.setVisibility(false);
      // if(Mod === "Accounts"){
      //   if(transactionData.isDisputed && transactionData.isDisputed === "true"){
      //     this.view.btnDisputetTransactionTrans.setVisibility(false);
      //     this.view.btnViewRequest.setVisibility(true);
      //   }
      //   else{
      //     this.view.btnDisputetTransactionTrans.setVisibility(true);
      //     this.view.btnViewRequest.setVisibility(false);
      //   }
      // }
      // else
      //   this.view.btnDisputetTransactionTrans.setVisibility(false);
      this.view.btnRepeatTransactionTrans.setVisibility(true);
      this.view.lblSuccess.setVisibility(true);
      this.view.lblPending.setVisibility(false);
    }
  },
  onclickdownload: function() {
    var searchDownloadFileParams = {
      "format": "pdf",
      "transactionId": this.view.lblReferenceNoValueTrans.text
    };
    var navMan=applicationManager.getNavigationManager();
    var transactionData =navMan.getCustomInfo("frmEuropeTransactionDetails");
    searchDownloadFileParams.accountNumber = transactionData.fromAccountNumber
    var ModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    ModulePresentationController.downloadTransactionFile(searchDownloadFileParams, "frmEuropeTransactionDetails");
  },

  navigateToDownloadAttachments: function(){
    var ntf = new kony.mvc.Navigation("frmAttachments");
    ntf.navigate();
  },

  flxFrontDownloadOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    var transactionData = navMan.getCustomInfo("frmEuropeTransactionDetails");
    var checkDownloadFileParams = {
      "page": "0",
      "accountId": this.accountId,
      "customerId": this.customerId,
      "transactionId": transactionData.transactionId,
      "mediaType": this.mediaType,
      "transactionType": this.transactionType
    };
    var ModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    ModulePresentationController.downloadChequeFile(checkDownloadFileParams, "frmEuropeTransactionDetails");
  },
  flxBackDownloadOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    var transactionData = navMan.getCustomInfo("frmEuropeTransactionDetails");
    var chequeDownloadFileParams = {
      "page": "1",
      "accountId": this.accountId,
      "customerId": this.customerId,
      "transactionId": transactionData.transactionId,
      "mediaType": this.mediaType,
      "transactionType": this.transactionType
    };
    var ModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    ModulePresentationController.downloadChequeFile(chequeDownloadFileParams, "frmEuropeTransactionDetails");
  },
  btnReferenceValueOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    var transactionData = navMan.getCustomInfo("frmEuropeTransactionDetails");
    var chequeDownloadFileParams = {
      "page": "0",
      "accountId": this.accountId,
      "customerId": this.customerId,
      "transactionId": transactionData.transactionId,
      "mediaType": this.mediaType,
      "transactionType": this.transactionType
    };
    var ModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    ModulePresentationController.downloadChequeFile(chequeDownloadFileParams, "frmEuropeTransactionDetails");
  },
  btnEditOnClick: function()
  {
    var navMan=applicationManager.getNavigationManager();
    var transactionData =navMan.getCustomInfo("frmEuropeTransactionDetails");
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transferModPresentationController.initializeStateData(false, "");
    if (transactionData)
      transferModPresentationController.setTransactionMode(transactionData.serviceName);
      if (transferModPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts")) {
        transferModPresentationController.setEuropeFlowType("INTERNAL");
        transferModPresentationController.getFromAccounts(function(res) {
          transferModPresentationController.setFromAndToAccounts(res);
          transferModPresentationController.setTransactionObject(transactionData);
        });
      }
      else {
        transferModPresentationController.setEuropeFlowType("EXTERNAL");
        transferModPresentationController.getFromAndToAccounts(function(res){
          transferModPresentationController.setFromAndToAccounts(res);
          transferModPresentationController.setTransactionObject(transactionData);
        });
      }  
  },
  flxCrossOnClick: function() {
    this.view.flxCheckZoomView.setVisibility(false);
    this.view.flxHeader.setEnabled(true);
    this.view.flxCheckDeposit.setEnabled(true);
    this.view.flxCheckDeposit.enableScrolling = true;
    //this.view.flxFooter.setEnabled(true);
    this.view.forceLayout();
  },
  imgCheckDraftFrontOnTouchEnd: function() {
    this.view.imgCheckZoom.setVisibility(true);
    this.view.imgCheckZoom.base64 = this.base64Front;

    this.view.flxCheckZoomView.setVisibility(true);
    this.view.flxHeader.setEnabled(false);
    this.view.flxCheckDeposit.setEnabled(false);
    this.view.flxCheckDeposit.enableScrolling = false;
    this.setGesture();
    //this.view.flxFooter.setEnabled(false);
    this.view.forceLayout();
  },  
  imgCheckDraftBackOnTouchEnd: function() {
    this.view.imgCheckZoom.setVisibility(true);
    this.view.imgCheckZoom.base64 = this.base64Back;

    this.view.flxCheckZoomView.setVisibility(true);
    this.view.flxHeader.setEnabled(false);
    this.view.flxCheckDeposit.setEnabled(false);
    this.view.flxCheckDeposit.enableScrolling = false;
    this.setGesture();
    //this.view.flxFooter.setEnabled(false);
    this.view.forceLayout();
  },  
  checkDraftFrontImgEnable: function(response) {
	var scope = this;
	this.base64Front = response.base64;
	this.segmentCheckdata[0]["lblFront"] = "Front Image";
	this.segmentCheckdata[0]["imgFront"] = {
		"src": "checksmall.png",
		"onTouchEnd": scope.imgCheckDraftFrontOnTouchEnd.bind(this, {}),
		"isVisible": true
	};
	this.segmentCheckdata[0]["flxFrontDownload"] = {
		"onClick": scope.flxFrontDownloadOnClick.bind(scope, {})
	};
	this.segmentCheckdata[0]["imgFrontDownload"] = {
		"src": "download.png"
	};
	if(this.transactionType === "Draft"){
	  this.segmentCheckdata[0]["flxBackImg"] = {
	  "isVisible": false
	 };
	}
	this.segmentCheckdata[0]["lblFrontCheckNotAvailable"] = {
	  "isVisible": false
	};
	this.view.segCheckImages.setData(this.segmentCheckdata);
	applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  checkDraftFrontImgDisable: function() {
	this.segmentCheckdata[0]["lblFront"] = "Front Image";
	
	this.segmentCheckdata[0]["imgFront"] = {
	  "isVisible": false
	};
	this.segmentCheckdata[0]["lblFrontCheckNotAvailable"] = {
	  "isVisible": true
	};
	this.segmentCheckdata[0]["lblFrontCheckNotAvailable"] = this.transactionType + kony.i18n.getLocalizedString("i18n.payments.imageNotAvailable");
	if (this.transactionType === "Draft") {
		this.segmentCheckdata[0]["flxBackImg"] = {
			"isVisible": false
		};
	}
	this.view.segCheckImages.setData(this.segmentCheckdata);
	applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  checkBackImgEnable: function(response) {
	var scope = this;
	this.base64Back = response.base64;
	this.segmentCheckdata[0]["flxBackImg"] = {
		"isVisible": true
	};
	this.segmentCheckdata[0]["lblBack"] = "Back Image";
	this.segmentCheckdata[0]["imgBack"] = {
		"src": "checksmall.png",
		"onTouchEnd": scope.imgCheckDraftBackOnTouchEnd.bind(this, {}),
		"isVisible": true
	};
	this.segmentCheckdata[0]["flxBackDownload"] = {
		"onClick": scope.flxBackDownloadOnClick.bind(scope, {})
	};
	this.segmentCheckdata[0]["imgBackDownload"] = {
		"src": "download.png"
	};
	this.segmentCheckdata[0]["lblBackCheckNotAvailable"] = {
	  "isVisible": false
	};
	this.view.segCheckImages.setData(this.segmentCheckdata);
	applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  checkBackImgDisable: function() {
	this.segmentCheckdata[0]["flxBackImg"] = {
		"isVisible": true
	};
	this.segmentCheckdata[0]["lblBack"] = "Back Image";
	
	this.segmentCheckdata[0]["imgBack"] = {
	  "isVisible": false
	};      
	this.segmentCheckdata[0]["lblBackCheckNotAvailable"] = {
	  "isVisible": true
	};
	this.segmentCheckdata[0]["lblBackCheckNotAvailable"] = this.transactionType + kony.i18n.getLocalizedString("i18n.payments.imageNotAvailable");

	this.view.segCheckImages.setData(this.segmentCheckdata);
	applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  ExternalTransferRefernceBtnEnable: function(){
	this.view.lblReferenceNoValueTrans.setVisibility(false);
    this.view.btnReferenceValue.setVisibility(true);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  ExternalTransferRefernceBtnDisable: function(){
	this.view.lblReferenceNoValueTrans.setVisibility(true);
	this.view.btnReferenceValue.setVisibility(false);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  getRecurrenceValue: function(transactionData) {
    if (transactionData.frequencyType === "Once" || transactionData.isScheduled === "false") {
      return "-";
    }
    else {
      var formatUtility = applicationManager.getFormatUtilManager();
      var startDate = formatUtility.getFormatedDateString(formatUtility.getDateObjectfromString(transactionData.frequencyStartDate), formatUtility.getApplicationDateFormat());
      var endDate = formatUtility.getFormatedDateString(formatUtility.getDateObjectfromString(transactionData.frequencyEndDate), formatUtility.getApplicationDateFormat());
      return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange") + " - " + startDate + " to " + endDate;
    }
  },

  getPaymentMethodByType: function(type) {
    switch(type) {
      case "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE":
        return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.Domestic");
      case "INTRA_BANK_FUND_TRANSFER_CREATE":
        return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.Internal");
      case "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE":
        return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.International");
    }
  }
});