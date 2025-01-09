define({
  
init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
},
 
  preshow:function(){
  if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
   
      this.view.flxHeader.isVisible = false;
    }
    this.initActions();
    this.chartLoad();
  }, 
  postShow:function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions:function(){
     this.view.customHeader.flxBack.onClick = this.onBack;
     this.view.customHeader.btnRight.onClick = this.onEdit;
     this.view.btnSaveConfirm.onClick = this.fundNav;
     this.view.btnClose.onClick = this.withdrawNav;
     this.setDataToForm();
     this.view.browserChart.onSuccess=this.chartLoad;
     this.view.browserChart.onPageFinished=this.chartLoad;
     this.checkPermissions();
  },
  
  setDataToForm: function(){
        var navManager = applicationManager.getNavigationManager();
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
         var goalDetails=JSON.parse(JSON.stringify(SavingsPotMod.presentationController.getEditObj()));
	navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"}, goalDetails);
            SavingsPotMod.presentationController.setSavingsFlow("");
         this.view.customHeader.lblLocateUs.text=goalDetails.potName;
  this.view.title=goalDetails.potName;
    var formatUtil=applicationManager.getFormatUtilManager();
    var currentdateObj = formatUtil.getDateObjectfromString(goalDetails.creationDate,"MM/DD/YYYY");
    var currentdate = formatUtil.getFormatedDateString(currentdateObj, formatUtil.getApplicationDateFormat());
    var startDateobj = formatUtil.getDateObjectfromString(goalDetails.startDate,"MM/DD/YYYY");
    var startDate = formatUtil.getFormatedDateString(startDateobj, formatUtil.getApplicationDateFormat());
    var endDateobj = formatUtil.getDateObjectfromString(goalDetails.endDate,"MM/DD/YYYY");
    var endDate = formatUtil.getFormatedDateString(endDateobj, formatUtil.getApplicationDateFormat());
    var currencyCode = SavingsPotMod.presentationController.getCurrencyCode();
     if(goalDetails.amountWithdrawn === "0"){
      this.view.flxWithDraw.setVisibility(false);
    }else {
    this.view.flxWithDraw.setVisibility(true);
    this.view.lblWithdrawValue.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.amountWithdrawn,currencyCode);
    }
  //  this.view.lblWithdrawValue.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.amountWithdrawn,currencyCode);
    this.view.lblMonthlyAmountValue.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.periodicContribution,currencyCode);
    this.view.lblMonthsValue.text = goalDetails.targetPeriod;
  this.view.lblFrequencyvalue.text = goalDetails.frequencyDay;
    this.view.lblCreatedDateValue.text = currentdate;  
    this.view.lblStartDateValue.text = startDate;  
    this.view.lblFinalDateValue.text = endDate;  
    this.view.lblGoalAmountvalue.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.targetAmount,currencyCode);  
    this.view.lblCurrentBalancevalue.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.availableBalance,currencyCode);
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.setSavingsPotId(goalDetails.savingsPotId);
    SavingsPotMod.setTransactPotId(goalDetails.potAccountId);
    SavingsPotMod.setSavingsPotName(goalDetails.potName);
    if(goalDetails.availableBalance > goalDetails.targetAmount){
      this.view.lblSavingsAmount.text = "$0.00";
    }else {
    this.view.lblSavingsAmount.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.remainingSavings,currencyCode);
    }
    if( parseFloat(goalDetails.targetAmount) < parseFloat(goalDetails.availableBalance) ){
      var excessAmount = goalDetails.availableBalance - goalDetails.targetAmount;
      this.view.flxSavings.setVisibility(false);
      this.view.flxExcessAmount.setVisibility(true);
      this.view.lblExcessAmountValue.text = formatUtil.formatAmountandAppendCurrencySymbol(excessAmount,currencyCode);
    } else {
       var excessAmount = goalDetails.targetAmount - goalDetails.availableBalance;
       this.view.flxExcessAmount.setVisibility(false);
       this.view.flxSavings.setVisibility(true);
       this.view.lblSavingsAmount.text = formatUtil.formatAmountandAppendCurrencySymbol(excessAmount,currencyCode);
    }
    if(goalDetails.potCurrentStatus === "On Track"){
     this.view.flxNotonTrack.isVisible = false;
     this.view.flxOnTrack.isVisible = true;
     this.view.lblOnTrack.text = goalDetails.potCurrentStatus;
      this.view.flxInSufficient.isVisible = false;
    } else if(goalDetails.potCurrentStatus === "Not On Track") {
     this.view.flxOnTrack.isVisible = false;
     this.view.flxNotonTrack.isVisible = true;
     this.view.lblNotOnTrack.text = goalDetails.potCurrentStatus;
     this.view.flxInSufficient.isVisible = true;
     this.view.imgAlert.src = "alert.png";
     this.view.lblMessage.text =  "You might not reach your goal on final date";  
    } else if(goalDetails.potCurrentStatus === "Completed" ){
     this.view.flxNotonTrack.isVisible = false;
     this.view.flxOnTrack.isVisible = true;
     this.view.lblOnTrack.text = goalDetails.potCurrentStatus;
     this.view.flxInSufficient.isVisible = true;
     this.view.imgAlert.src = "greentick.png";
      if(this.view.lblCreatedDateValue.text != this.view.lblFinalDateValue.text){
        this.view.lblMessage.text =  "You achieved the Goal Amount too soon! And you will be saving more till your Final Date";
      }
      else{
     this.view.lblMessage.text =  "You achieved the Goal Amount!";
      }
    } 

  },
  /* Function to show/hide buttons based on user permissions */
  checkPermissions:function(){
      var self = this;
      var editGoalPotPermission = applicationManager.getConfigurationManager().checkUserPermission("GOAL_POT_EDIT");
      var closeGoalPotPermission = applicationManager.getConfigurationManager().checkUserPermission("GOAL_POT_CLOSE");
      var fundGoalPotPermission = applicationManager.getConfigurationManager().checkUserPermission("GOAL_POT_ADHOC_FUND");
      var withdrawGoalPotPermission = applicationManager.getConfigurationManager().checkUserPermission("GOAL_POT_WITHDRAW_FUND");

      if(editGoalPotPermission){
        self.view.btnCloseSavingsGoal.isVisible = false;
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          self.view.setTitleBarRightSideButtonSkin("Edit", "sknBtnffffffSSPSemiBold30px", this.onEdit);
        } else{
          self.view.customHeader.btnRight.isVisible = true;
        }
      }else{
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          self.view.setTitleBarRightSideButtonSkin("", "sknBtnffffffSSPSemiBold30px", function(){});
        } else{
          self.view.customHeader.btnRight.isVisible = false;
        }
        self.view.btnCloseSavingsGoal.onClick=this.onClose;
        (closeGoalPotPermission)?self.view.btnCloseSavingsGoal.isVisible = true:self.view.btnCloseSavingsGoal.isVisible=false;
      }
      (fundGoalPotPermission)?self.view.btnSaveConfirm.isVisible=true:self.view.btnSaveConfirm.isVisible=false;
      (withdrawGoalPotPermission)?self.view.btnClose.isVisible=true:self.view.btnClose.isVisible=false;
  },
  /* Function to show a alert based on the balance on clcking close savings goal*/
   onClose:function(){
            var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
            var navManager = applicationManager.getNavigationManager();
	        var goalDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
            var potName = this.view.customHeader.lblLocateUs.text;
            var accountName = SavingsPotMod.getMaskedAccountName();
            if(goalDetails.availableBalance >  "0"){
            var message = "Your Goal pot "+potName+" is not zero, do you want to move the balance to Primary Account "+accountName+" and close";
            } else {
             var message = "Do you want to close your Savings Goal "+potName;
            }
            var basicProperties =
            {
                "message": message,
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "alertTitle": "Close Savings Goal",
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
  chartLoad: function(){
        var navManager = applicationManager.getNavigationManager();
    var budgetDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
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
  },
  fundNav: function(){
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.setSavingsType("Goal");
    var SavingsPotModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotModule.presentationController.clearFundWithdrawData();
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmGoalfundAmount"});
  },
  withdrawNav: function(){
    var navManager = applicationManager.getNavigationManager();
     var Details = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
     var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
     var potName = SavingsPotMod.getSavingsPotName();
    if(Details.availableBalance === "0"){
      alert("You have zero balance in your"+" "+potName+". You can close the pot now!");
    } else {
    SavingsPotMod.setSavingsType("Goal");
    var SavingsPotModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotModule.presentationController.clearFundWithdrawData();
     navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmWithdrawAmount"});
      }
  },
  onEdit:function(){
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotMod.presentationController.setSavingsFlow("YES");
    SavingsPotMod.presentationController.initiatePot("Goal",{"appName" : "SavingsPotMA", "friendlyName" : "frmEditSavingsGoal"});
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
  bindGenericError: function (errorMsg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
     applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
}
  
});