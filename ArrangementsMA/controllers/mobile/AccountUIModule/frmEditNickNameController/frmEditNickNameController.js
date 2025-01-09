define({
  init : function() {
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShowUiSettings:function(){
    var loggerManager = applicationManager.getLoggerManager();
    try {
      loggerManager.log("#### start frmEditNickNameController : preShowUiSettings ####");
      kony.application.dismissLoadingScreen();
	  if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.flxHeader.isVisible = false;
      } else {
        this.view.flxHeader.isVisible = true;
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.accdetails.editNickName");
		this.view.customHeader.flxBack.onClick=this.onBack;
		this.view.customHeader.btnRight.onClick = this.onBack;
      }
      var navManager = applicationManager.getNavigationManager();
      var credentials = navManager.getCustomInfo("frmEditNickName");
      var nickName = credentials.nickName;
      this.view.tbxNickname.text = nickName;
      this.view.btnUpdateNickName.onClick = this.updateNickName;
      this.view.tbxNickname.onDone = this.updateNickName;
      this.view.btnUpdateNickName.setEnabled(false);
      this.view.btnUpdateNickName.skin="sknBtna0a0a0SSPReg26px";
      this.view.tbxNickname.onTextChange = this.changeNickName;
      this.view.tbxNickname.setEnabled(true);
      this.view.tbxNickname.setFocus(true);
     // alert(this.view.tbxNickname.setFocus)
    } catch (err) {
      loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
    }
  },
  onBack: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      loggerManager.log("#### start frmEditNickNameController : onBack ####");
      var navMan = applicationManager.getNavigationManager();
      navMan.goBack();
    } catch (err) {
      loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
    }
  },
  changeNickName: function(){
    var loggerManager = applicationManager.getLoggerManager();
    try {
      loggerManager.log("#### start frmEditNickNameController : changeNickName ####");
      var navManager = applicationManager.getNavigationManager();
      var credentials = navManager.getCustomInfo("frmEditNickName");
      var currNickName = credentials.nickName;
      var editedNickName = this.view.tbxNickname.text;
      if(editedNickName !== "" && editedNickName !== null && editedNickName !== undefined && editedNickName !== currNickName)
      {
        this.view.btnUpdateNickName.setEnabled(true);
        this.view.btnUpdateNickName.skin="sknBtn055BAF26px";
      }
      else
      {
        this.view.btnUpdateNickName.setEnabled(false);
        this.view.btnUpdateNickName.skin="sknBtna0a0a0SSPReg26px";
      }
    } catch (err) {
      loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
    }
  },
  updateNickName: function(){
        var loggerManager = applicationManager.getLoggerManager();
        function onAccountUpdationSucceess(successResponse) {
            if (successResponse && (successResponse !== undefined && successResponse !== "")) {
                var navigationManager = applicationManager.getNavigationManager();
                navigationManager.setCustomInfo("ExternalAccountNickNameUpdationSuccess", true);
                navigationManager.setCustomInfo("ExternalAccountNickNameUpdationFailure", false);
                accountModule.presentationController.fetchExternalAccountsData(userManager.getUserName());
            }
        }
        function onAccountUpdationFailure(errorResponse) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (errorResponse && errorResponse !== undefined) {
                var navigationManager = applicationManager.getNavigationManager();
                navigationManager.setCustomInfo("ExternalAccountNickNameUpdationFailure", true);
                navigationManager.setCustomInfo("ExternalAccountNickNameUpdationSuccess", false);
                accountModule.presentationController.navigateToManageExternalAccounts();
                kony.print("error updating the external account");
            }
        }
        try {
            loggerManager.log("#### start frmExternalAccountDetailsController : updateNickName ####");
            applicationManager.getPresentationUtility().showLoadingScreen();
            var accountModule;
            var navigationManager = applicationManager.getNavigationManager();
            var userManager = applicationManager.getUserPreferencesManager();
            var accountDetails = navigationManager.getCustomInfo("frmEditNickName");
            var records;
            if (accountDetails && (accountDetails !== undefined && typeof accountDetails === 'object')) {
                records = {
                  Account_id : accountDetails.accountId,
                  NickName : this.view.tbxNickname.text.trim(),
                  main_user : accountDetails.mainUser,
                  username : accountDetails.userName,
                  bank_id : accountDetails.bankId,
                  AccountName : accountDetails.accountName,
                  loop_count : accountDetails.loopCount
                };
                accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
                accountModule.presentationController.patialUpdateExternalAccount(records,onAccountUpdationSucceess,onAccountUpdationFailure);
            }
        } catch (err) {
            loggerManager.log("#### in catch of frmExternalAccountDetailsController : updateNickName" + JSON.stringify(err) + " ####");
        }
  }
});