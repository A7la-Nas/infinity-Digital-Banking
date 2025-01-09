define({ 

init : function(){
    var FormValidator = require("FormValidatorManager");
    this.fv = new FormValidator(1);
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },

  frmCardTransactionDetailsPreShow : function(){
    this.setPreshowData();
    this.setFlowActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  
  setPreshowData : function(){
//     this.setCardTransactionDetailsData();
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxCardTransactionDetails.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxCardTransactionDetails.top = "0dp";
    }
    this.view.btnContinue.onClick = function() {
      var navManager = applicationManager.getNavigationManager();
      var disputeModule = applicationManager.getModulesPresentationController("DisputeTransactions");
      navManager.setCustomInfo("frmDisputeTransactionDetails", navManager.getCustomInfo("frmCardTransactionDetails"));
      navManager.setEntryPoint("DisputeEntry", "frmCardTransactionDetails");
      disputeModule.navigateToDisputeReason("frmDisputeReason");
    };
    this.setCardTransactionDetailsData();
  },

  mappingCodes: function()
  {
    var code = {
      "C" : "Posted",
      "P" : "Pending",
      "T" : "Transaction",
      "F" : "Fee/Charges",
      "B" : "Billed",
      "U" : "UnBilled"
    };
    return code;
  },
  
  setFlowActions : function(){
    this.view.customHeader.flxBack.onClick = this.goBack;
    // this.view.btnContinue.setVisibility(false);
    var navMan = applicationManager.getNavigationManager();
    var formatUtil = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager();
    var transactionData = navMan.getCustomInfo("frmCardTransactionDetails");
    var dateDiff = formatUtil.getNumberOfDaysBetweenTwoDates(formatUtil.getDateObjectfromString(transactionData.transactionDate), new Date());
    if(transactionData.transactionType === "T") transactionData.transactionType = "CardPayment";
    if (configManager.getDisputeConfig(transactionData.transactionType) === "true") {
      if (transactionData.transactionStatus !== "P" && configManager.getDisputeConfig(transactionData.transactionType) === "true" && dateDiff <= configManager.getDisputeDuration() && (configManager.checkUserFeature("DISPUTE_TRANSACTIONS") === true || configManager.checkUserFeature("DISPUTE_TRANSACTIONS") === "true")) {
        if (configManager.getDisputeCDConfig("both") || (configManager.getDisputeCDConfig("debit") && formatUtil.isDebitTransaction(transactionData.amount)) || (configManager.getDisputeCDConfig("credit") && formatUtil.isCreditTransaction(transactionData.amount))) {
          if (transactionData.isDisputed && transactionData.isDisputed === "true") {
            this.view.btnContinue.setVisibility(false);
          }
          else {
            this.view.btnContinue.setVisibility(true);
          }
        }
        else {
          this.view.btnContinue.setVisibility(false);
        }
      }
      else {
        this.view.btnContinue.setVisibility(false);
      }
    } else {
      this.view.btnContinue.setVisibility(false);
    }
  },
   setCardTransactionDetailsData : function(){
    var formatUtil = applicationManager.getFormatUtilManager();
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmCardTransactionDetails");
    var mapper = this.mappingCodes();
    this.view.lblTransactionDescriptionValue.text = data.transactionDetailDescription;
    this.view.lblTransactionDateValue.text = data.date;
    this.view.lblTransactionAmountValue.text = formatUtil.formatAmountandAppendCurrencySymbol(data.transactionAmount,data.transactionCurrencyCode);
    this.view.lblTransactionMerchantAddressNameValue.text = data.transactionMerchantAddressName;
    this.view.lblTransactionMerchantCityValue.text = data.transactionMerchantCity;
    this.view.lblMerchantCategoryValue.text = data.merchantCategory;
    this.view.lblTransactionStatusValue.text = mapper[data.transactionStatus];
    if(data.transactionStatus === "C")
    {
      this.view.lblTransactionSuccess.text = "Successful";
      this.view.lblTransactionSuccess.skin = "sknlblSSPR22px";
    }
    if(data.transactionStatus === "P")
    {
      this.view.lblTransactionSuccess.text = "Pending";
      this.view.lblTransactionSuccess.skin = "sknlblSSPR22px";
    }
    this.view.lblTransactionTypeValue.text = mapper[data.transactionType];
    var currentDate = new Date(data.transactionDate);
    this.view.lblTransactionTimeValue.text = currentDate.toLocaleTimeString("it-IT");
    this.view.lblTransactionReferenceNumberValue.text = data.transactionReferenceNumber;
    if(!kony.sdk.isNullOrUndefined(data.transactionExchangeRate)){
    this.view.lblTransactionExchangeRateValue.text = data.transactionExchangeRate;
    this.view.flxTransactionExchangeRate.setVisibility(true);
    }
    else{
      this.view.flxTransactionExchangeRate.setVisibility(false);
    }
    if(!kony.sdk.isNullOrUndefined(data.exchangeCurrency)){
        this.view.lblExchangeCurrencyValue.text = data.exchangeCurrency;
        this.view.flxExchangeCurrency.setVisibility(true);
    }
    else{
        this.view.flxExchangeCurrency.setVisibility(false);
    }
    if(!kony.sdk.isNullOrUndefined(data.exchangeAmount)){
      this.view.lblExchangeAmountValue.text = data.exchangeAmount;
      this.view.flxExchangeAmount.setVisibility(true);
    }
    else{
      this.view.flxExchangeAmount.setVisibility(false);
    }
    if(data.cardType == "Credit")
    {
      this.view.lblTransactionCategoryValue.text = mapper[data.transactionCategory];
      if(!kony.sdk.isNullOrUndefined(data.transactionTaxIndicator) && data.transactionTaxIndicator === "Y"){
        if(!kony.sdk.isNullOrUndefined(data.taxPercentage)){
          this.view.lblTaxPercentageValue.text = data.taxPercentage;
          this.view.flxTaxPercentage.setVisibility(true);
        }
        else{
          this.view.flxTaxPercentage.setVisibility(false);
        }
        if(!kony.sdk.isNullOrUndefined(data.transactionTaxAmount)){
          this.view.lblTransactionTaxAmountValue.text = data.transactionTaxAmount;
          this.view.flxTransactionTaxAmount.setVisibility(true);
        }
        else{
          this.view.flxTransactionTaxAmount.setVisibility(false);
        }
      }
      else{
        this.view.flxTaxPercentage.setVisibility(false);
        this.view.flxTransactionTaxAmount.setVisibility(false);
      }
    }
    else
    {
      this.view.flxTransactionCategory.setVisibility(false);
      this.view.flxTaxPercentage.setVisibility(false);
      this.view.flxTransactionTaxAmount.setVisibility(false);
    }
  },

 goBack : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
 });