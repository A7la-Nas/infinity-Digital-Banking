define({

  init: function () {
    },

  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }

    this.initActions();

  },
  initActions: function () {
    this.view.btnGoal.onClick=this.goalNav;
    this.view.btnBudget.onClick=this.budgetNav;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    //this.view.customHeader.flxBack.onTouchEnd = this.onBack;
    this.view.customHeader.flxBack.onTouchEnd = this.onBackCustom;
  },
  postShow:function(){
 
  },
   onBack : function () {
    var navigationMan=applicationManager.getNavigationManager();
    navigationMan.goBack();
  },
   onBackCustom : function () {
    let navManager = applicationManager.getNavigationManager();
    let accountsDetails = navManager.getCustomInfo("frmAccountDetails");
    accountsDetails.fundingAccountId = accountsDetails.selectedAccountData.accountID;
    let SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "moduleName": "SavingsPotUIModule",
      "appName": "SavingsPotMA"
    });
    SavingsPotMod.presentationController.navToMySavingsPot(accountsDetails);
  },
  onCancelClick:function(){
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.clearCreateData();
     var navManager = applicationManager.getNavigationManager();
	 navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmMySavingsPot"});
  },
  budgetNav: function(){
    var SavingsPotModule = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotModule.clearCreateData();
	var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotMod.presentationController.initiatePot("Budget",{"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetName"});
},
  goalNav: function(){
        var SavingsPotModule = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotModule.clearCreateData();
		var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotMod.presentationController.initiatePot("Goal",{"appName" : "SavingsPotMA", "friendlyName" : "frmGoalsType"});
     SavingsPotMod.presentationController.setBiWeekly("");
}
});
