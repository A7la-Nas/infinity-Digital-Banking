define({
  init : function(){
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  onNavigate: function(obj) {
    var scope = this;
    var config = applicationManager.getConfigurationManager();
    var navManager = applicationManager.getNavigationManager();
    var requestParamAccount = navManager.getCustomInfo("frmMMTransactionDetails");
    this.accountId = requestParamAccount.ExternalAccountNumber;
    var context =  navManager.getCustomInfo("frmMMTransactionDetails");
    var customerId = applicationManager.getUserPreferencesManager().getUserObj().userId;
    context["customerId"] = customerId;
	context["accountId"] = this.accountId;
    kony.store.setItem("CURRENCYCODE", "$");
    this.view.accountsTransactionDetailsNative.setContext(context);
	this.view.accountsTransactionDetailsNative.downloadCheck = this.btnReferenceValueOnClick;
    this.preShow();
    this.view.accountsTransactionDetailsNative.navigateToViewAttachments = function(attachments)
    {
      navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("attachmentsList", attachments);
      var accMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
      accMod.presentationController.commonFunctionForNavigation("AccountsUIModule/frmShowAttachments");
    };
  },
  preShow:function()
  {
    var MenuHandler = applicationManager.getMenuHandler();
    var navMan=applicationManager.getNavigationManager();
    var transactionData =navMan.getCustomInfo("frmMMTransactionDetails");
    var deviceUtilManager =applicationManager.getDeviceUtilManager();
    if(transactionData.hasOwnProperty["transactionType"]){
      this.view.customHeader.lblLocateUs.text = "Transaction Details";
    }
    if(transactionData.hasOwnProperty["installmentType"]){
      this.view.customHeader.lblLocateUs.text = "Installment Details";
    }
    var isIphone = deviceUtilManager.isIPhone();
    if(isIphone){
      this.view.flxHeader.isVisible = false;
      this.view.flxFooter.isVisible=false;
    }
    else{
      this.view.flxHeader.isVisible = true;
    }
    this.view.accountsTransactionDetailsNative.contextualActionButtonOnClick= this.getContextualData;
    this.view.accountsTransactionDetailsNative.getBtnEntitlement= this.getBtnEntitlement;
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
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
    this.bindDataForTransfer(transactionData);
//     this.view.customHeader.flxBack.onTouchEnd = function(){
//       navManager.goBack();
//     }
    this.view.btnViewRequest.onClick = function(){
      navManager.setEntryPoint("ViewRequest","TransactionDetails");
      applicationManager.getPresentationUtility().showLoadingScreen();
      applicationManager.getModulesPresentationController("DisputeTransactions").getDisputeTransactionDetails();   
    }
    this.view.btnDisputetTransactionTrans.onClick=function(){
      var disputeModule = applicationManager.getModulesPresentationController("DisputeTransactions");
      navMan.setCustomInfo("frmDisputeTransactionDetails",navMan.getCustomInfo("frmMMTransactionDetails"));
      navMan.setEntryPoint("DisputeEntry","frmMMTransactionDetails");
      disputeModule.navigateToDisputeReason("frmDisputeReason");
    }
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.postShow();
  },

  postShow: function () {
    var navMan = applicationManager.getNavigationManager();
    if (navMan.getEntryPoint("frmMMTransactionDetails") === "Accounts") {
      var formatUtil = applicationManager.getFormatUtilManager();
      var configManager = applicationManager.getConfigurationManager();
      var transactionData = navMan.getCustomInfo("frmMMTransactionDetails");
      var dateDiff = formatUtil.getNumberOfDaysBetweenTwoDates(formatUtil.getDateObjectfromString(transactionData.transactionDate), new Date());
      if (configManager.getDisputeConfig(transactionData.transactionType)) {
        if (transactionData.statusDescription !== "Pending" && configManager.getDisputeConfig(transactionData.transactionType) === "true" && dateDiff <= configManager.getDisputeDuration() && (configManager.checkUserFeature("DISPUTE_TRANSACTIONS") === true || configManager.checkUserFeature("DISPUTE_TRANSACTIONS") === "true")) {
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
    try{
      var transactionObj = applicationManager.getTransactionManager();
      var frequencyTypes= transactionObj.getAvailableFrequencyType();
      var formatUtil = applicationManager.getFormatUtilManager();
      this.view.lblTransferValue.text = transactionData.amount;
      var name="";
      if (transactionData.fromNickName === null || transactionData.fromNickName === undefined) {
        name = transactionData.fromAccountName;
      } else {
        name =transactionData.fromNickName;
      }
      this.view.lblTransferredFromValueTrans.text = applicationManager.getPresentationUtility().formatText(name, 10, transactionData.fromAccountNumber, 4);
      this.view.lblAccTypeFromTrans.text = transactionData.fromAccountType;
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
      this.view.lblDescValueTrans.text = transactionData.description;
      this.view.lblTransDateValueTrans.text=transactionData.scheduledDate;
      this.view.lblFreqTransValue.text = transactionData.frequencyType;
      if(transactionData.recurrenceDesc!==undefined && transactionData.recurrenceDesc!== null  && transactionData.recurrenceDesc!=="0")
      {
        this.view.lblRecurrenceValueTrans.text = transactionData.recurrenceDesc;
        this.view.flxRecurrenceTrans.setVisibility(true);
      }
      else
        this.view.flxRecurrenceTrans.setVisibility(false);
      if(transactionData.isScheduled == "true" && transactionData.frequencyType!=frequencyTypes.ONCE)
      {
        this.view.btnCancelThisOccurenceTrans.setVisibility(true);
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
        if(!kony.sdk.isNullOrUndefined(transactionData.fee)&&Number(transactionData.fee)>0){
          this.view.lblTransactionFeeValueTransfer.text = formatUtil.formatAmountandAppendCurrencySymbol(transactionData.fee,transactionData.feeCurrency);
          this.view.flxTransactionFeeTransfer.setVisibility(true);
        }
        else
          this.view.flxTransactionFeeTransfer.setVisibility(false);
      }
      var configManager = applicationManager.getConfigurationManager();
     // if(configManager.isCombinedUser === "true"){
        if(transactionData.transactionType === "P2P"){
          this.view.flxAccountType1.isVisible=true;
        }else{
          this.view.flxAccountType1.isVisible=false;
        }
        if(transactionData.toAccountNumber){
          this.view.flxAccountType.isVisible=true;
        }else{
          this.view.flxAccountType.isVisible=false;
        }
        var isBusinessAccount = this.displayIcon(transactionData.fromAccountNumber);
        if(transactionData.isBusinessPayee==="1"|| transactionData.isBusinessPayee===1){
          this.view.imgAccountType.src="businessaccount.png";
          this.view.imgAccountType1.src="businessaccount.png";
        }else{
          this.view.imgAccountType.src="personalaccount.png";
          this.view.imgAccountType1.src="personalaccount.png";
        }
        
        var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
        if (!isSingleCustomerProfile) {
          this.view.imgAccountType2.src = isBusinessAccount === "0" ? "personalaccount.png" : "businessaccount.png"
          this.view.imgAccountType2.isVisible = true;
          
        this.view.flxAccountType2.isVisible = true;
        this.view.flxToValue.width="90%";
        this.view.flxToValue.left="10%";
        this.view.flxP2PValue.width="90%";
        this.view.flxP2PValue.left="10%";
        this.view.flxFromValue.width="90%";
        this.view.flxFromValue.left="10%";
        this.view.lblTransferredToValueTrans.left="5dp";
        this.view.lblPhoneNo.left="5dp";
        this.view.lblTransferredToValueP2P.left="5dp";
        this.view.lblTransferredFromValueTrans.left="5dp";
        } else {
          this.view.imgAccountType2.src = "";
          this.view.imgAccountType2.isVisible = false;
          
          this.view.flxToValue.width="100%";
          this.view.flxToValue.left="0%";
          this.view.flxAccountType.isVisible=false;
          this.view.flxP2PValue.width="100%";
          this.view.flxP2PValue.left="0%";
          this.view.flxAccountType1.isVisible=false;
          this.view.flxFromValue.width="100%";
          this.view.flxFromValue.left="0%";
          this.view.flxAccountType2.isVisible=false;
          this.view.lblTransferredToValueTrans.left="20dp";
          this.view.lblPhoneNo.left="20dp";
          this.view.lblTransferredToValueP2P.left="20dp";
          this.view.lblTransferredFromValueTrans.left="20dp";
        }
//         if(isBusinessAccount==="true"){
//           this.view.imgAccountType2.src="businessaccount.png";
//         }else{
//           this.view.imgAccountType2.src="personalaccount.png";
//         }
       
//       }else{
        
//       }

      this.view.lblReferenceNoValueTrans.text = transactionData.transactionId;
      this.view.lblNotesValueTrans.text = transactionData.transactionsNotes;
      this.view.btnRepeatTransactionTrans.onClick = this.repeatTrans;
      this.view.btnCancelTransactionTrans.onClick = this.cancelTransactionTrans;
      this.view.btnCancelThisOccurenceTrans.onClick = this.cancelRecurrenceTrans;
      this.view.btnCancelSeriesTrans.onClick = this.cancelSerieTrans;
      this.view.btnDownloadTransactionTrans.onClick= this.onclickdownload;
    }catch(er){
      kony.print(er);
    }
  },
  btnReferenceValueOnClick: function() {
        var navMan = applicationManager.getNavigationManager();
        var transactionData = navMan.getCustomInfo("frmMMTransactionDetails");
        var chequeDownloadFileParams = {
            "page": "0",
            "accountId": this.accountId,
            "customerId": this.customerId,
            "transactionId": transactionData.transactionId,
            "mediaType": "pdf",
            "transactionType": transactionData.transactionType
        };
        var ModulePresentationController = applicationManager.getModulesPresentationController({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
        ModulePresentationController.downloadChequeFile(chequeDownloadFileParams, "frmMMTransactionDetails");
    },
  displayIcon: function(accountNumber) {
    try{
      var isBusinessAccount = "false";
      var navMan = applicationManager.getNavigationManager();
      var custominfoInt = navMan.getCustomInfo("frmDashboard");
      var accounts = custominfoInt.accountData;
      //var accounts = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule").presentationController.accounts;
      for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].accountID === accountNumber){
          isBusinessAccount = accounts[i].isBusinessAccount;
        }
      }
      return isBusinessAccount === "true" ? "true" : "false";
    }catch(er){
      kony.print(er);
    }

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
  onclickdownload:function(){
    var navMan = applicationManager.getNavigationManager();
    var transactionData = navMan.getCustomInfo("frmMMTransactionDetails");
    var searchDownloadFileParams = {
      "format": "pdf",
      "transactionId": this.view.lblReferenceNoValueTrans.text,
      "searchTransactionType":transactionData.transactionType
    };
    searchDownloadFileParams.isSearchParam = false;
    var ModulePresentationController = applicationManager.getModulesPresentationController({ "moduleName": "MoneyMovementUIModule",
    "appName": "TransfersMA"});
    ModulePresentationController.downloadTransactionReport(searchDownloadFileParams,"frmMMTransactionDetails");
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
      var mmModulePresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
      var navMan=applicationManager.getNavigationManager();
      var transactionData =navMan.getCustomInfo("frmMMTransactionDetails");
      if (transactionData) 
        mmModulePresentationController.setTransactionMode(transactionData.serviceName);
      mmModulePresentationController.deleteTransaction(transactionData.transactionId);
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
      var mmModulePresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
      var navMan=applicationManager.getNavigationManager();
      var transactionData =navMan.getCustomInfo("frmMMTransactionDetails");
      if (transactionData) 
        mmModulePresentationController.setTransactionMode(transactionData.serviceName);
      mmModulePresentationController.deleteRecurrenceTransaction(transactionData.transactionId);
    }
  },
  repeatTrans:function()
  {
    var navMan=applicationManager.getNavigationManager();
    var transactionData =navMan.getCustomInfo("frmMMTransactionDetails");
    var mmModulePresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    mmModulePresentationController.haveLimitsBeenFetched = false;
    mmModulePresentationController.initializeStateData(false, "");
    if (transactionData)
      mmModulePresentationController.setTransactionMode(transactionData.serviceName);
    mmModulePresentationController.getFromAndToAccounts(function(res){
      mmModulePresentationController.setFromAndToAccounts(res);
      mmModulePresentationController.repeatTransfer(transactionData);});
  },
  renderViewForTransfer:function(viewMode)
  {
    var navMan=applicationManager.getNavigationManager();
    var transactionData =navMan.getCustomInfo("frmMMTransactionDetails");
    if(viewMode==='pending')
    {
      this.view.btnCancelTransactionTrans.setVisibility(true);
      // this.view.btnDisputetTransactionTrans.setVisibility(false);
      // this.view.btnViewRequest.setVisibility(false);
      this.view.btnRepeatTransactionTrans.setVisibility(false);
      this.view.lblSuccess.setVisibility(false);
    }
    else if(viewMode==='pending1')
    {
      this.view.btnCancelTransactionTrans.setVisibility(false);
      // this.view.btnDisputetTransactionTrans.setVisibility(false);
      // this.view.btnViewRequest.setVisibility(false);
      this.view.btnRepeatTransactionTrans.setVisibility(false);
      this.view.lblSuccess.setVisibility(false);
    }
    else
    {
      var navManager = applicationManager.getNavigationManager();
      var Mod = navManager.getEntryPoint("frmMMTransactionDetails");
      this.view.btnCancelTransactionTrans.setVisibility(false);
      // if(Mod == "Accounts"){
      //   if(transactionData.isDisputed && transactionData.isDisputed=="true"){
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
    }
  },
  btnEditOnClick: function()
  {
    var navMan=applicationManager.getNavigationManager();
    applicationManager.getPresentationUtility().showLoadingScreen();
   var transactionData =navMan.getCustomInfo("frmMMTransactionDetails");
    var mmModulePresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    mmModulePresentationController.haveLimitsBeenFetched = false;
    mmModulePresentationController.initializeStateData(false, "");
    if (transactionData)
      mmModulePresentationController.setTransactionMode(transactionData.serviceName);
    mmModulePresentationController.getFromAndToAccounts(function(res){
      mmModulePresentationController.setFromAndToAccounts(res);
      mmModulePresentationController.setTransactionObject(transactionData);});
  },
	navigateToPayment: function() {
        var cm = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();
        if (cm.isFastTransfersFlowEnabled()) {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
            var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
            navManager.setEntryPoint("centralmoneymovement", "frmAccountDetails");
            moneyMovementModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
            moneyMovementModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
        } else {
            applicationManager.getPresentationUtility().showLoadingScreen();
            if (cm.getDeploymentGeography() === "EUROPE") {
                var transferModule = applicationManager.getModulesPresentationController("TransferModule");
                var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
                navManager.setEntryPoint("europeTransferFlow", "frmAccountDetails");
                transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
                transferModule.setEuropeFlowType("INTERNAL");
                applicationManager.getPresentationUtility().showLoadingScreen();
                transferModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
            } else {
                var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
                var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
                transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
                transferModulePresentationController.navigateToTransfers(accountsDetails.selectedAccountData);
            }
        }
    },
   getContextualData: function(data) {
     var scope = this;
     if(data === "CancelPayment"){
       scope.cancelTransactionTrans();
     }
     if(data === "DownloadTransaction"){
       scope.onclickdownload();
     }
     if(data === "RepeatTransaction"){
       scope.repeatTrans();
     }
     if(data === "DisputeTransaction"){
      var disputeModule = applicationManager.getModulesPresentationController("DisputeTransactions");
	  var navMan = applicationManager.getNavigationManager();													 
      navMan.setCustomInfo("frmDisputeTransactionDetails",navMan.getCustomInfo("frmMMTransactionDetails"));
      navMan.setEntryPoint("DisputeEntry","frmMMTransactionDetails");
      disputeModule.navigateToDisputeReason("frmDisputeReason")
     }
     if(data === "ViewRequest"){
	  var navManager = applicationManager.getNavigationManager();														 
      navManager.setEntryPoint("ViewRequest","TransactionDetails");
      applicationManager.getPresentationUtility().showLoadingScreen();
      applicationManager.getModulesPresentationController("DisputeTransactions").getDisputeTransactionDetails(); 
     }
	if(data === "PayOverdue"){
       scope.navigateToPayment();
     }
    },
    getBtnEntitlement: function(btnId, entitlementKeys, callback){ 																 																   
      if (btnId === "DisputeTransaction"){
        var navMan = applicationManager.getNavigationManager();
        var formatUtil = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        var transactionData = navMan.getCustomInfo("frmMMTransactionDetails");
        var dateDiff = formatUtil.getNumberOfDaysBetweenTwoDates(formatUtil.getDateObjectfromString(transactionData.transactionDate), new Date());
        if (configManager.getDisputeConfig(transactionData.transactionType)) {
          if (transactionData.isScheduled !== "true" && transactionData.statusDescription !== "Pending" && configManager.getDisputeConfig(transactionData.transactionType) === "true" && dateDiff <= configManager.getDisputeDuration() && (configManager.checkUserFeature(entitlementKeys[0]) === true || configManager.checkUserFeature(entitlementKeys[0]) === "true") && entitlementKeys[0] !== null) {																													   
            if (configManager.getDisputeCDConfig("both") || (configManager.getDisputeCDConfig("debit") && formatUtil.isDebitTransaction(transactionData.amount)) || (configManager.getDisputeCDConfig("credit") && formatUtil.isCreditTransaction(transactionData.amount))) {
              if (transactionData.isDisputed && transactionData.isDisputed === "true") {					  
                callback(false);
              }
              else {
                callback(true);
              }
            }
            else {
              callback(false);
            }
          }
          else {
            callback(false);
          }
        }
      } 
      if (btnId === "ViewRequest") {
        var configManager = applicationManager.getConfigurationManager();
        var navMan = applicationManager.getNavigationManager();
        var transactionData = navMan.getCustomInfo("frmMMTransactionDetails");
        if(!(kony.sdk.isNullOrUndefined(transactionData))){
          if ((configManager.checkUserPermission(entitlementKeys[0]) || configManager.checkUserFeature(entitlementKeys[0])) && (transactionData.isDisputed === true || transactionData.isDisputed === "true") && entitlementKeys[0] !== null){
            callback(true);
          } else{ 
            callback(false);
          }
        }else{
          callback(false);
        }
      }
      if (btnId === "CancelPayment") {
        var navMan = applicationManager.getNavigationManager();																 
        var transactionData = navMan.getCustomInfo("frmMMTransactionDetails");																	  
        if (transactionData.isScheduled !== undefined && transactionData.isScheduled !== null && (transactionData.isScheduled === "true" || transactionData.isScheduled === true)&& transactionData.serviceName !== undefined && transactionData.serviceName !== null && transactionData.serviceName !== "") {																																																																			 																							   
          callback(true);
        }
        else{
          callback(false);
        }
      }
      if (btnId === "RepeatTransaction") {
        var navMan = applicationManager.getNavigationManager();
        var transactionData = navMan.getCustomInfo("frmMMTransactionDetails");
        if (transactionData.isScheduled !== undefined && transactionData.isScheduled !== null && (transactionData.isScheduled === "false" || transactionData.isScheduled === false) && transactionData.serviceName !== undefined && transactionData.serviceName !== null && transactionData.serviceName !== "") {
          callback(true);
        }		   
        else{						   			 
          callback(false);
        }
      }
    },
   flxBackOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
   }
});