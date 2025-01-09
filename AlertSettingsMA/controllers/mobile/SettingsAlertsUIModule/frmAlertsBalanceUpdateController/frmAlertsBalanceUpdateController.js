define({
  	init : function(){
      try {
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err){
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
     },
    /**
     * Description
     * @method preShow
     * @return
     */
    preShow: function() {
      try{
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxHeader.isVisible = false;
        } else {
            this.view.flxHeader.isVisible = true;
        }
		applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.initActions();
        var navManager = applicationManager.getNavigationManager();
        this.alertData = navManager.getCustomInfo("frmAlertsBalanceUpdate");
		this.setHeaderTitle(this.alertData);
        this.setPreviousUpdateTime();
   		var currentForm=navManager.getCurrentForm();
   		applicationManager.getPresentationFormUtility().logFormName(currentForm);
      }
      catch(err){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
  	setHeaderTitle: function(formData){
      try{
        if(formData.key==="balanceUpdate"){
          this.view.title = kony.i18n.getLocalizedString("kony.mb.Alerts.BalanceUpdateTitle");
          this.view.customHeader.lblLocateUs.text =  kony.i18n.getLocalizedString("kony.mb.Alerts.BalanceUpdateTitle");
        }
        else if(formData.key==="paymentDueReminder"){
          this.view.title = kony.i18n.getLocalizedString("kony.mb.Alerts.PaymentDueReminderTitle");
          this.view.customHeader.lblLocateUs.text =  kony.i18n.getLocalizedString("kony.mb.Alerts.PaymentDueReminderTitle");
        }
        else if(formData.key==="depositDueReminder"){
          this.view.title = kony.i18n.getLocalizedString("kony.mb.Alerts.DepositDueReminderTitle");
          this.view.customHeader.lblLocateUs.text =  kony.i18n.getLocalizedString("kony.mb.Alerts.DepositDueReminderTitle");
        }
      }
      catch(err){
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method setPreviousUpdateTime
     * @return
     */
    setPreviousUpdateTime: function() {
    },
    /**
     * Description
     * @method initActions
     * @return
     */
    initActions: function() {
      try {
        var self = this;
        this.view.customHeader.flxBack.onClick = function(){
          var navMan=applicationManager.getNavigationManager();
          navMan.goBack();
        };
        /**
         * Description
         * @method onRowClick
         * @return
         */
        this.view.segBalanceUpdateTime.onRowClick = function() {
            self.updateTime();
        };
      }
      catch(err){
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method updateTime
     * @return
     */
    updateTime: function() {
      try{
        applicationManager.getPresentationUtility().showLoadingScreen();
        var selectedData = this.view.segBalanceUpdateTime.selectedRowItems[0];
        var key = this.alertData.key;
        var inputParams = {
          "alertId": this.alertData.alertId
        };
        var selectedIndex = this.view.segBalanceUpdateTime.selectedRowIndex[1];
        inputParams[key + "TypeId"] = parseInt(selectedIndex) + 1;
        var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
        SettingsAlertsUIModule.presentationController.updateUserAccountAlerts(inputParams, this.updateTimeSuccess.bind(this), this.updateTimeFailure.bind(this));
      }
      catch(err){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method updateTimeSuccess
     * @param {} response
     * @return
     */
    updateTimeSuccess: function(response) {
      try{
        var self = this;
        var key = this.alertData.key;
        var navManager = applicationManager.getNavigationManager();
        var accountsDetails = navManager.getCustomInfo("frmAlertsAccountList");
        var accountsData = navManager.getCustomInfo("frmAlertsAccountDetail");
        var selectedData = this.view.segBalanceUpdateTime.selectedRowItems[0];
        accountsDetails.forEach(function(account) {
            if (account.alertId === self.alertData.alertId) {
                account[key] = selectedData.lblTitle;
            }
        });
        accountsData[key] = selectedData.lblTitle;
      	var alertUpdateData=key;
        navManager.setCustomInfo("frmAlertsAccountList", accountsDetails);
        navManager.setCustomInfo("frmAlertsAccountDetail", accountsData);
      	navManager.setCustomInfo("frmAlertsAccountDetail_AlertUpdate", alertUpdateData);
        var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
		settingsMod.presentationController.commonFunctionForNavigation("frmAlertsAccountDetail");
      }
      catch(err){
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method updateTimeFailure
     * @param {} response
     * @return
     */
    updateTimeFailure: function(response) {
    },
});