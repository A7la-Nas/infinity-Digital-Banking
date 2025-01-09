define({ 
init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"NO",currentForm);
  },
preShow:function(){
  if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
  this.view.customHeader.flxBack.onTouchEnd = this.onBack;
  this.view.customHeader.btnRight.onClick = this.onCancelClick;
  this.view.imgChevron.onTouchEnd = this.navAmount;
  this.view.btnContinue.onClick = this.continueOnClick;
  this.setDataToForm();
  applicationManager.getPresentationUtility().dismissLoadingScreen();
},
    setDataToForm: function(){
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    var withdrawDetails = SavingsPotMod.presentationController.getFundWithDrawDetails();
    var potName = SavingsPotMod.presentationController.getSavingsPotName();
    var fromDetails =  SavingsPotMod.presentationController.getMaskedAccountName();
    this.view.lblFromValue.text = potName;
    this.view.lblToValue.text = fromDetails;
    var formatUtil = applicationManager.getFormatUtilManager();
    var amount;
    var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
    var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
    if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
      amount = withdrawDetails.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    else{
     amount = formatUtil.formatAmount(withdrawDetails.amount);
    }
    this.view.lblFundAmountValue.text = currencySymbol+amount;
  },
  onBack : function () {
    var navigationMan=applicationManager.getNavigationManager();
    navigationMan.goBack();
  },
  onCancelClick : function(){
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    var type = SavingsPotMod.presentationController.getSavingsType();
    SavingsPotMod.presentationController.clearFundWithdrawData();
     var navManager = applicationManager.getNavigationManager();
	if(type === "Goal"){
         navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
      } else if(type === "Budget"){
        navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"}); 
     }
  },
navAmount: function(){
  var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.initializeStateData(true,{"appName" : "SavingsPotMA", "friendlyName" : "frmWithdrawVerifyDetails"});
    SavingsPotMod.commonFunctionForNavigation({"appName" : "SavingsPotMA", "friendlyName" : "frmWithdrawAmount"});
},
   continueOnClick: function(){
    var amount;
    var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
    if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
      amount = this.view.lblFundAmountValue.text;
      amount = amount.replace(/[\\.]+/g,"");
      amount = amount.replace(",",".");
    }
    else {
      amount = this.view.lblFundAmountValue.text.replace(/[, ]+/g, "");
    }
    //osama
    var firstNumberIndex = amount.search(/\d/);
      var params = {
            "amount": amount.slice(firstNumberIndex),
            "isCreditDebit" : "Debit"
      }
      var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
      SavingsPotMod.savingspotWithdraw(params);
      
  }
 });