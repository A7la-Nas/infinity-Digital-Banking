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

    this.initActions();
    this.view.browserChart.onSuccess=this.chartLoad;
    this.view.browserChart.onPageFinished=this.chartLoad;
    this.chartLoad();
},
  initActions: function(){
    this.view.btnFund.onClick = this.navFund;
    this.view.btnWithdraw.onClick = this.withdraw;
    this.view.customHeader.flxBack.onClick = this.onBack;
    this.view.customHeader.btnRight.onClick = this.onEdit;
    this.setDataToForm();
    this.checkPermissions();
       applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  
  setDataToForm: function(){
            var navManager = applicationManager.getNavigationManager();
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
         var budgetDetails=JSON.parse(JSON.stringify(SavingsPotMod.presentationController.getEditObj()));
	navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"}, budgetDetails);
            SavingsPotMod.presentationController.setSavingsFlow("");
      this.view.customHeader.lblLocateUs.text=budgetDetails.potName;
  this.view.title=budgetDetails.potName;
    var formatUtil=applicationManager.getFormatUtilManager();
    var date = formatUtil.getDateObjectfromString(budgetDetails.creationDate,"MM/DD/YYYY");
    var currentdate = formatUtil.getFormatedDateString(date, formatUtil.getApplicationDateFormat());
    var currencyCode = SavingsPotMod.presentationController.getCurrencyCode();
    if(budgetDetails.amountWithdrawn === "0"){
      this.view.flxWithdrawn.setVisibility(false);
    }else {
    this.view.flxWithdrawn.setVisibility(true);
    this.view.lblWithdrawnValue.text = formatUtil.formatAmountandAppendCurrencySymbol(budgetDetails.amountWithdrawn,currencyCode);
    }
     if(parseFloat(budgetDetails.availableBalance) > parseFloat(budgetDetails.targetAmount)){
       this.view.flxExcessAmount.setVisibility(true);
       var excessAmount = parseFloat(budgetDetails.availableBalance) - parseFloat(budgetDetails.targetAmount);
       this.view.lblExcessAmountValue.text = formatUtil.formatAmountandAppendCurrencySymbol(excessAmount,currencyCode);
     } else {
        this.view.flxExcessAmount.setVisibility(false);
     }
    this.view.lblDateValue.text = currentdate;   
    this.view.lblBudgetAmountAns.text = formatUtil.formatAmountandAppendCurrencySymbol(budgetDetails.targetAmount,currencyCode);
    this.view.lblCurrBalanceAns.text = formatUtil.formatAmountandAppendCurrencySymbol(budgetDetails.availableBalance,currencyCode);
        if(budgetDetails.potCurrentStatus === "Completed"){
	this.view.lblWarn.src="greentick.png";
    this.view.lblMessage.text = "You achieved the Budget Amount";
    } 
    else if(budgetDetails.potCurrentStatus === "Yet to Fund"){
     this.view.lblWarn.src="alert.png";
     this.view.lblMessage.text = "Yet to Fund";
    }
    else {
     this.view.lblWarn.src="alert.png";
     this.view.lblMessage.text = "Partially Funded";
    }
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.setSavingsPotId(budgetDetails.savingsPotId);
    SavingsPotMod.setTransactPotId(budgetDetails.potAccountId);
    SavingsPotMod.setSavingsPotName(budgetDetails.potName);
  },
  /* Function to show/hide buttons based on user permissions */
  checkPermissions:function(){
      var self = this;
      var editBudgetPotPermission = applicationManager.getConfigurationManager().checkUserPermission("BUDGET_POT_EDIT");
      var closeBudgetPotPermission = applicationManager.getConfigurationManager().checkUserPermission("BUDGET_POT_CLOSE");
      var fundBudgetPotPermission = applicationManager.getConfigurationManager().checkUserPermission("BUDGET_POT_ADHOC_FUND");
      var withdrawBudgetPotPermission = applicationManager.getConfigurationManager().checkUserPermission("BUDGET_POT_WITHDRAW_FUND");
      if(editBudgetPotPermission){
        self.view.btnCloseSavingsBudget.isVisible = false;
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          self.view.setTitleBarRightSideButtonSkin("Edit", "sknBtnffffffSSPSemiBold30px", this.onEdit);
    	}
        else{
          self.view.customHeader.btnRight.isVisible = true;
        }
      }else{
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          self.view.setTitleBarRightSideButtonSkin("", "sknBtnffffffSSPSemiBold30px", function(){});
    	}
        else{
          self.view.customHeader.btnRight.isVisible = false;
        }
        self.view.btnCloseSavingsBudget.onClick=this.closeOnClick;
        (closeBudgetPotPermission)?self.view.btnCloseSavingsBudget.isVisible = true:self.view.btnCloseSavingsBudget.isVisible=false;
      }
      (fundBudgetPotPermission)?self.view.btnFund.isVisible=true:self.view.btnFund.isVisible=false;
      (withdrawBudgetPotPermission)?self.view.btnWithdraw.isVisible=true:self.view.btnWithdraw.isVisible=false;
  },
  /* Function to show a alert based on the balance on clcking close savings budget*/
  closeOnClick:function(){
            var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
            var navManager = applicationManager.getNavigationManager();
            var budgetDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
            var potName = this.view.customHeader.lblLocateUs.text;
            var accountName = SavingsPotMod.getMaskedAccountName();
            if(budgetDetails.availableBalance >  "0"){
            var message = "Your Budget pot "+potName+" is not zero, do you want to move the balance to Primary Account "+accountName+" and close";
            } else {
             var message = "Do you want to close your Savings Budget "+potName;
            }
            var basicProperties =
            {
                "message": message,
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "alertTitle": "Close Savings Budget",
                "noLabel": "NO",
                "yesLabel": "YES",
                "alertIcon": "appicon.png",
                "alertHandler": function(response) {
                    if(response){
                        var savingsPotId = SavingsPotMod.getSavingsPotId();
                        var params = {
                            "savingsPotId": savingsPotId
                            }
                      SavingsPotMod.closeSavingsPot(params);
                    }else{
                      kony.print("Dismiss");
                    }
                }
            };
        applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
},
  navFund: function(){
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.setSavingsType("Budget");
    var SavingsPotModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotModule.presentationController.clearFundWithdrawData();
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmGoalfundAmount"}); 
},
  withdraw: function(){
     var navManager = applicationManager.getNavigationManager();
     var Details = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
     var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
     var potName = SavingsPotMod.getSavingsPotName();
    if(Details.availableBalance === "0"){
      alert("You have zero balance in your"+" "+potName+". You can close the pot now!");
    } else {
    SavingsPotMod.setSavingsType("Budget");
    var SavingsPotModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotModule.presentationController.clearFundWithdrawData();
    navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmWithdrawAmount"});
    }  
  },
  onBack : function () {
    let navManager = applicationManager.getNavigationManager();
    let accountsDetails = navManager.getCustomInfo("frmAccountDetails");
    accountsDetails.fundingAccountId = accountsDetails.selectedAccountData.accountID;
    let SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "moduleName": "SavingsPotUIModule",
      "appName": "SavingsPotMA"
    });
    SavingsPotMod.presentationController.navToMySavingsPot(accountsDetails);
  },
  onEdit : function () {
           var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotMod.presentationController.setSavingsFlow("YES");
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmEditBudget"});
  },
  chartLoad: function(){
        var navManager = applicationManager.getNavigationManager();
    var budgetDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
	var percentage=(budgetDetails.availableBalance*100)/budgetDetails.targetAmount;
    var remaining=100-parseInt(percentage);
	if(percentage>=100){
          percentage=100;
      this.view.lblPercent.text=percentage+"%";
      this.view.lblCur.skin="lbldotgreen";
       var x = this.view.browserChart.evaluateJavaScript("AddDonutChart(" + JSON.stringify([]) +","+JSON.stringify([0,0,percentage])+");");
        }
       else{
       percentage=parseInt(percentage);
          this.view.lblPercent.text=percentage+"%";
         this.view.lblCur.skin="lbldotblue";
         var x = this.view.browserChart.evaluateJavaScript("AddDonutChart(" + JSON.stringify([]) +","+JSON.stringify([percentage,remaining,])+");");
       }
  }


 });