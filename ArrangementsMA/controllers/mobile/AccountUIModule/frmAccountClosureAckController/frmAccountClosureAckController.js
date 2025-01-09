define({
  accountNo: "",
  preshow: function() {
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.flxHeader.isVisible = true;
      }
      else{
        this.view.flxHeader.isVisible = false;
      }
      this.view.btnView.onClick = this.navigateToDashboard;
      this.view.flxEye.onClick = this.eyeOnclick;
      var navManager = applicationManager.getNavigationManager();
      account=navManager.getCustomInfo("selectedAccount");
      closingReason = navManager.getCustomInfo("AccountClosureReason");
      this.setFormData(account, closingReason);
      var response =  navManager.getCustomInfo("response");
      if(!kony.sdk.isNullOrUndefined(response.errorMessage)){
        this.showErrorScreen();
      }
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"NO",currentForm);
      kony.application.dismissLoadingScreen();
  },
  setFormData: function(account,closingReason){
    this.view.lblAccountNameValue.text = account.nickName?account.nickName : account.accountName;
     this.view.lblAccountNoValue.text = account.accountID;
     var navMan = applicationManager.getNavigationManager();
     var requestID =  navMan.getCustomInfo("response");
     this.view.lblReferenceNoValue.isVisible = false;
     this.view.lblReferenceNo.isVisible = false;
    if(!kony.sdk.isNullOrUndefined(requestID.Id) && requestID.Id!==""){
    this.view.lblReferenceNoValue.text = requestID.Id;
    this.view.lblReferenceNo.isVisible = true;
    this.view.lblReferenceNoValue.isVisible = true;
    }
    this.accountNo = account.accountID;
    this.view.lblAccountNoValue.text = "**" + this.accountNo.slice(-4);
      this.view.lblAccountTypeValue.text = account.accountType;
      this.view.lblIBANvalue.text = account.IBAN;
    configManager = applicationManager.getConfigurationManager();
      this.view.lblCurrentBalValue.text =  configManager.currencyCode[account.currencyCode] + account.currentBalance;
  },
  showErrorScreen: function(){
    this.view.lblReferenceNoValue.isVisible = false;
    this.view.lblReferenceNo.isVisible = false;
    this.view.lblSuccessMessage.text = "Failed to Capture the Service Request, Try again later";
    this.view.imgGreenTick.src = "failed.png";
  },
  eyeOnclick:function(){
      if(this.view.imgEyeIcon.src === 'view.png'){
        this.view.lblAccountNoValue.text = this.accountNo;
        this.view.imgEyeIcon.src ='strikedeyeicon.png';
      }
      else{
        this.view.lblAccountNoValue.text = "**" + this.accountNo.slice(-4);
        this.view.imgEyeIcon.src ='view.png';
      }
  },
  navigateToDashboard: function() {
    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "moduleName": "AccountsUIModule",
      "appName": "HomepageMA"
  });
  accountsModule.presentationController.showDashboard();
  },
});