define({

  init: function () {
    },

  preShow: function () {
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
     var navManager = applicationManager.getNavigationManager();	
     if(navManager.getPreviousForm() === "frmCreateGoalVerifyDetails"){
        this.view.lblDescription.text = "Goal Creation Failed";
        this.view.lblErrorMessage.text = "Goal creation failed due to server  error. Please try again.";
     } else if(navManager.getPreviousForm() === "frmCreateBudgetVerifyDetails"){
        this.view.lblDescription.text = "Budget Creation Failed";
        this.view.lblErrorMessage.text = "Budget creation failed due to server  error. Please try again.";
      } else if(navManager.getPreviousForm() === "frmWithdrawVerifyDetails"){
        this.view.lblDescription.text = "Withdraw amount failed";
        this.view.lblErrorMessage.text = "Withdraw amount failed due to server  error. Please try again.";
      } else if(navManager.getPreviousForm() === "frmGoalfundverifyDetails"){
        this.view.lblDescription.text = "Transfer fund failed";
        this.view.lblErrorMessage.text = "Transfer fund failed due to server  error. Please try again.";
      } else if(navManager.getPreviousForm() === "frmEditSavingsGoal"){
        this.view.lblDescription.text = "Edit Goal Failed";
        this.view.lblErrorMessage.text = "Edit gaol failed due to server  error. Please try again.";
      } else if(navManager.getPreviousForm() === "frmEditBudget"){
        this.view.lblDescription.text = "Edit Budget Failed";
        this.view.lblErrorMessage.text = "Edit budget failed due to server  error. Please try again.";
      } else if(navManager.getPreviousForm() === "frmBudgetInitiateTransferDetails"){
        this.view.lblDescription.text = "Transfer fund failed";
        this.view.lblErrorMessage.text = "Transfer fund failed due to server  error. Please try again.";
      }  
    this.initActions();

  },
  initActions: function () {
       this.view.btnFund.onClick = this.continueOnClick;
  },
  postShow:function(){
 
  },
   continueOnClick: function(){
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.clearCreateData();
    var accountsID = SavingsPotMod.getAccountId();
    SavingsPotMod.getAllSavingsPot(accountsID);
  }
});
