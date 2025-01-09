define({
    init: function() {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    preShow: function() {
      this.view.flxAmount.setVisibility(false);
      this.view.flxPrincipal.setVisibility(false);
      this.view.flxOutstandingBalance.setVisibility(false);
      this.view.flxCharges.setVisibility(false);
      this.view.flxTax.setVisibility(false);
      this.view.flxDate.setVisibility(false);
      this.view.flxInsurance.setVisibility(false);
      this.view.flxInterest.setVisibility(false);
      this.view.flxCumulativeInterest.setVisibility(false);
      this.view.btnPayOverdue.setVisibility(false);
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.btnPayOverdue.onClick = this.navigateToPayment;
      if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.flxHeader.isVisible = true;
        this.view.flxFooter.isVisible = false;
      }
      else{
        this.view.flxHeader.isVisible = false;
        this.view.flxFooter.isVisible = true;
      }
    },
    postShow: function () {
        this.populateFormData();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    populateFormData: function(){
        var navMan = applicationManager.getNavigationManager();
        var installmentDetails = navMan.getCustomInfo("frmInstallmentDetails");
        var charges = installmentDetails.charges;
        var tax = installmentDetails.tax;
        var insurance = installmentDetails.insurance;
        var date = installmentDetails.date;
        var amount = installmentDetails.amount;
        var outstandingBalance = installmentDetails.outstandingBalance;
        var principal = installmentDetails.principal;
        var interest = installmentDetails.interest;
        var installmentType = installmentDetails.installmentType;
        var cumulativeInterest = installmentDetails.cumulativeInterest
        if(amount){
            this.view.flxAmount.setVisibility(true);
            this.view.lblAmountValue.text = amount;
        }
        if(charges){
            this.view.flxCharges.setVisibility(true);
            this.view.lblChargesValue.text = charges;
        }
        if(outstandingBalance){
            this.view.flxOutstandingBalance.setVisibility(true);
          this.view.lblOutstandingBalanceValue.text = outstandingBalance;
        }
        if(principal){
            this.view.flxPrincipal.setVisibility(true);
            this.view.lblPrincipalValue.text = principal;
        }
        if(interest){
            this.view.flxInterest.setVisibility(true);
            this.view.lbIInterestValue.text = interest;
        }
      if(cumulativeInterest){
        this.view.flxCumulativeInterest.setVisibility(true);
        this.view.lblCumulativeInterestValue.text = cumulativeInterest;
      }
        if(insurance){
            this.view.flxInsurance.setVisibility(true);
            this.view.lblInsuranceValue.text = insurance;
        }
        if(date){
            this.view.flxDate.setVisibility(true);
            this.view.lblDateValue.text = date;
        }
        if(tax){
            this.view.flxTax.setVisibility(true);
            this.view.lblTaxValue.text = tax;
        }
        if(installmentType.toLowerCase() === "due"){
          this.view.lblSuccess.text = "Overdue";
          this.view.btnPayOverdue.setVisibility(true);
        }else{
            this.view.lblSuccess.text = "";
            this.view.btnPayOverdue.setVisibility(false);
        }
    },
    navigateToPayment: function() {
        var cm=applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();
        if(cm.isFastTransfersFlowEnabled()){
            applicationManager.getPresentationUtility().showLoadingScreen();
            var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementModule");
            var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
            navManager.setEntryPoint("centralmoneymovement","frmAccountDetails");
            moneyMovementModule.transactionMode=  applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
            moneyMovementModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
        }
        else{
            applicationManager.getPresentationUtility().showLoadingScreen();
            if (cm.getDeploymentGeography() === "EUROPE") {
                var transferModule = applicationManager.getModulesPresentationController("TransferModule");
                var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
                navManager.setEntryPoint("europeTransferFlow", "frmAccountDetails");
                transferModule.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
                transferModule.setEuropeFlowType("INTERNAL");
                applicationManager.getPresentationUtility().showLoadingScreen();
                transferModule.setTransferToAccountFromAccDetailsFlow(accountsDetails.selectedAccountData);
            }
            else {
                var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
                var transferModulePresentationController = applicationManager.getModulesPresentationController("TransferModule");
                transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
                transferModulePresentationController.navigateToTransfers(accountsDetails.selectedAccountData);
            }
        }
    },
  flxBackOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo("frmLoanSchedule");
  },
});

