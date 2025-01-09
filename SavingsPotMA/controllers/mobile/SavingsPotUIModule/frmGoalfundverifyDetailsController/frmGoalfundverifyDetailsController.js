define({ 
  init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"NO",currentForm);
    },
  preShow:function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.setVisibility(false);
      }
    this.view.imgChevron.onTouchEnd = this.navAmount;
    this.view.btnContinue.onClick = this.continueOnClick;
    this.view.customHeader.flxBack.onClick = this.onBack;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
        this.setDataToForm();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
    setDataToForm: function(){
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var potName = SavingsPotMod.presentationController.getSavingsPotName();
      var fromDetails =  SavingsPotMod.presentationController.getMaskedAccountName();
      this.view.lblFromValue.text = fromDetails;
      this.view.lblToValue.text = potName;
      var budgetDetails = SavingsPotMod.presentationController.getFundWithDrawDetails();
      var formatUtil = applicationManager.getFormatUtilManager();
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      var amount;
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
        amount = budgetDetails.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      else{
       amount = formatUtil.formatAmount(budgetDetails.amount);
      }
      this.view.lblFundAmountValue.text = currencySymbol + amount;
    },
  navAmount: function(){
      var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
      SavingsPotMod.initializeStateData(true,{"friendlyName" : "frmGoalfundverifyDetails", "appName" : "SavingsPotMA"});
      SavingsPotMod.commonFunctionForNavigation({"friendlyName" : "frmGoalfundAmount", "appName" : "SavingsPotMA"});
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
          var params = {
              //"amount": amount.slice(1),
              "amount": amount.match(/[\d,]+(\.\d+)?/)[0].replace(/,/g, ''),
              "isCreditDebit" : "Credit"
        }
        var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
        SavingsPotMod.savingspotFund(params);
    },
    onCancelClick : function(){
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var type = SavingsPotMod.presentationController.getSavingsType();
      SavingsPotMod.presentationController.clearFundWithdrawData();
    if(type === "Goal"){
           var navManager = applicationManager.getNavigationManager();
           navManager.navigateTo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
        } else if(type === "Budget"){
          var navManager = applicationManager.getNavigationManager();
          navManager.navigateTo({"friendlyName" : "frmBudgetPotDetails", "appName" : "SavingsPotMA"}); 
       }
    },
      onBack : function () {
      var navigationMan=applicationManager.getNavigationManager();
      navigationMan.goBack();
    }
   });