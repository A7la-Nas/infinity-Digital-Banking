define(["CommonUtilities"],function(CommonUtilities){
  return  {
  keypadString:'0',
  isPeriodUsed : false,
  timerCounter: 0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
 
  preShow: function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.title=kony.i18n.getLocalizedString("i18n.savingspot.monthlydebitamount");
      this.view.flxHeader.isVisible = false;
    }
    this.view.btnContinue.onClick=this.btnContinueFunction;
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
     var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
    this.view.lblDollar.text = currencySymbol;
    this.view.customHeader.flxBack.onTouchEnd = this.onBack;
        var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    var flow=SavingsPotMod.presentationController.getSavingsFlow();
    if(flow){
     var navManager = applicationManager.getNavigationManager();
	var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
   this.setReference(goalDetails.periodicContribution);
    }
    else{
   var savingsObj= SavingsPotMod.presentationController.getCreateObject();
    this.setReference(savingsObj.periodicContribution);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
    postShow: function(){
        this.updateAmountValue();
  },
   setReference : function(periodicContribution){
    if(periodicContribution)
    {
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es")
      this.keypadString = periodicContribution.split(",")[0];
    else
      this.keypadString = periodicContribution
        if(periodicContribution == "0.00" || periodicContribution == "0,00"){
            this.view.lblAmount.text = "0";
            this.keypadString = "0";
                  }
    }
    else{
      this.view.lblAmount.text = "0";
      this.keypadString = "0";
    }
  },
  setKeypadChar: function (char) {
    CommonUtilities.setKeypadCharWOD(this,char);
    this.updateAmountValue();
  },
  clearKeypadChar: function () {
    CommonUtilities.clearKeypadCharWOD(this);
    this.updateAmountValue();
  },
  updateAmountValue: function(){
       if(this.keypadString==='0'){
       this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
       this.view.btnContinue.setEnabled(false);
       this.view.lblAmount.text = this.view.keypad.formatAmount(this.keypadString);
     }else{
       var finalValue =  CommonUtilities.updateAmountValueWOD(this);
       this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
       this.view.btnContinue.setEnabled(true);
       this.view.lblAmount.text = this.view.keypad.formatAmount(finalValue);
     }
  },
  onBack : function () {
    var navigationMan=applicationManager.getNavigationManager();
    navigationMan.goBack();
  },
   onCancelClick:function(){
          var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
	var flow=SavingsPotMod.presentationController.getSavingsFlow();
          var navManager = applicationManager.getNavigationManager();
              SavingsPotMod.presentationController.clearCreateData();
        if(flow)
          { 
             SavingsPotMod.presentationController.setSavingsFlow("");
    navManager.navigateTo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
          }
     else{
		navManager.navigateTo({"friendlyName" : "frmSavingsType", "appName" : "SavingsPotMA"});
     }
  },
  btnContinueFunction:function(){
    var periodicContribution = this.view.lblAmount.text;
    var navManager = applicationManager.getNavigationManager();
    var SavingsPotModule = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotModule.setSavingsType("periodicContribution");
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotMod.presentationController.periodicContribution = periodicContribution;
    var flow=SavingsPotMod.presentationController.getSavingsFlow();
    if(flow){ 
      var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
      goalDetails.periodicContribution=periodicContribution;
      navManager.setCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"},goalDetails);
      SavingsPotMod.presentationController.navToOptimizeGoal(periodicContribution,{"friendlyName" : "frmEditOptimizeGoal", "appName" : "SavingsPotMA"});
    }
    else{
      var previousForm = navManager.getPreviousForm();
      if (previousForm === "frmCreateGoalVerifyDetails") {
        SavingsPotModule.initializeStateData(true, {"friendlyName" : "frmOptimizeGoal", "appName" : "SavingsPotMA"});
      }
      SavingsPotMod.presentationController.navToOptimizeGoal(periodicContribution,{"friendlyName" : "frmOptimizeGoal", "appName" : "SavingsPotMA"});
    }
  }
};
});