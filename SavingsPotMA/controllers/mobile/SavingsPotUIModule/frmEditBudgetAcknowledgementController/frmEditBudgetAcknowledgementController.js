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
    this.view.btnContinue.onClick = this.navigatetoMySavingsPot;
         this.setDataToForm();
  },
    setDataToForm: function(){
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var navManager = applicationManager.getNavigationManager();
      var budgetDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
      var formatUtil=applicationManager.getFormatUtilManager();
      var fromDetails =  SavingsPotMod.presentationController.getMaskedAccountName();
      var currencyCode = SavingsPotMod.presentationController.getCurrencyCode();
      this.view.lblBudgetAn.text=budgetDetails.potName;
      this.view.lblAmountAn.text= formatUtil.formatAmountandAppendCurrencySymbol(budgetDetails.targetAmount,currencyCode);
      this.view.lblCurrentBalanceValue.text=formatUtil.formatAmountandAppendCurrencySymbol(budgetDetails.availableBalance,currencyCode);
      this.view.lblAccAn.text = fromDetails;
      var today= new Date();
      var month = today.getMonth() + 1;
      var date = today.getDate();
      if(month<10){
        month = "0" + month;
      }
      if(date<10){
        date = "0" + date;
      }
    var createdDate = month + "/" + date + "/" + today.getFullYear();
    this.view.lblDateAn.text = createdDate;
    },
  postShow:function(){
 
  },
  
  navigatetoMySavingsPot : function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.setSavingsFlow("");
    SavingsPotMod.clearCreateData();
    var accountsID = SavingsPotMod.getAccountId();
    SavingsPotMod.getAllSavingsPot(accountsID);
  }
});
