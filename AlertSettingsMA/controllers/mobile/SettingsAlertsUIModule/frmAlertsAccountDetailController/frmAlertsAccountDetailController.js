define({
  	init : function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method preShow
     * @return
     */
    preShow: function() {
      try {
		applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.setFlowActions();
        this.setPreshowData();
        this.initActions();
      	this.checkForToastMessage();
      	var navManager = applicationManager.getNavigationManager();
   		var currentForm=navManager.getCurrentForm();
   		applicationManager.getPresentationFormUtility().logFormName(currentForm);
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
  	checkForToastMessage: function(){
      try{
      var navManager = applicationManager.getNavigationManager();
      this.alertUpdateKey = navManager.getCustomInfo("frmAlertsAccountDetail_AlertUpdate");
      if (!kony.sdk.isNullOrUndefined(this.alertUpdateKey)) {
        if(this.alertUpdateKey==="balanceUpdate"){
          applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Alerts.BalanceUpdate"));
        }
        else if(this.alertUpdateKey==="paymentDueReminder"){
          applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Alerts.PaymentDue"));
        }
        else if(this.alertUpdateKey==="depositDueReminder"){
          applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Alerts.DepositMaturityReminder"));
        }
        this.alertUpdateKey = navManager.setCustomInfo("frmAlertsAccountDetail_AlertUpdate",null);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
      this.limitUpdateKey=navManager.getCustomInfo("frmAlertsAccountDetail_LimitUpdate");
      if (!kony.sdk.isNullOrUndefined(this.limitUpdateKey)) {
        if(this.limitUpdateKey==="minimumBalance"){
          applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Alerts.MinimumBalance"));
        }
        else if(this.limitUpdateKey==="debitLimit"){
          applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Alerts.DebitLimit"));
        }
        else if(this.limitUpdateKey==="creditLimit"){
          applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Alerts.CreditLimit"));
        }
        this.limitUpdateKey = navManager.setCustomInfo("frmAlertsAccountDetail_LimitUpdate",null);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method setPreshowData
     * @return
     */
    setPreshowData: function() {
        try {
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                this.view.flxHeader.isVisible = false;
            } else {
                this.view.flxHeader.isVisible = true;
            }
            var navManager = applicationManager.getNavigationManager();
            this.singleAccountAlertDetails = navManager.getCustomInfo("frmAlertsAccountDetail");
            this.view.segAlert.isVisible = false;
            this.view.SegAlertSettingList.isVisible = false;
            this.view.switchSMS.selectedIndex = 1;
          	this.view.lblTitle.text = kony.i18n.getLocalizedString("kony.mb.common.alertFor") + " " + this.singleAccountAlertDetails.accountDisplayName;
            this.view.lblBankName.text = this.singleAccountAlertDetails.bankName;
            this.setSegmentsData(this.singleAccountAlertDetails);
            if (this.singleAccountAlertDetails.isEnabled === true) {
                this.view.segAlert.isVisible = true;
                this.view.SegAlertSettingList.isVisible = true;
                this.view.switchSMS.selectedIndex = 0;
            }
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method setFlowActions
     * @return
     */
    setFlowActions: function() {
        var scope = this;
    },
    /**
     * Description
     * @method initActions
     * @return
     */
    initActions: function() {
      try {
        var scope = this;
        this.view.switchSMS.onSlide = this.toggleSingleAccountAlertsRequired;
        this.view.customHeader.flxBack.onClick = function(){
           var navMan=applicationManager.getNavigationManager();
           navMan.goBack();
        };
        /**
         * Description
         * @method onRowClick
         * @return
         */
        this.view.segAlert.onRowClick = function() {
            scope.segAlertsOnClick();
        };
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method segAlertsOnClick
     * @return
     */
    segAlertsOnClick: function() {
        try {
            var navManager = applicationManager.getNavigationManager();
            var accountData = navManager.getCustomInfo("frmAlertsAccountDetail");
            var selectedData = this.view.segAlert.selectedRowItems[0];
            var jsData = this.swapKeyValues(this.alertFields);
            var selectedField = jsData[selectedData.key];
            var selectedFieldValue = selectedData.value;
            var customData = {
                "alertId": accountData.alertId,
                "selectedField": selectedFieldValue,
                "text": selectedData.key,
                "key": jsData[selectedData.key]
            };
          	var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
            if (selectedField === "minimumBalance" || selectedField === "debitLimit" || selectedField === "creditLimit") {
                navManager.setCustomInfo("frmAlertsMinimumBalance", customData);
                settingsMod.presentationController.commonFunctionForNavigation("frmAlertsMinimumBalance");
            } else if (selectedField === "balanceUpdate" || selectedField === "paymentDueReminder" || selectedField === "depositDueReminder") {
                navManager.setCustomInfo("frmAlertsBalanceUpdate", customData);
                settingsMod.presentationController.commonFunctionForNavigation("frmAlertsBalanceUpdate");
            } else {
                //Handle toggles
            }
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method swapKeyValues
     * @param {} json
     * @return ret
     */
    swapKeyValues: function(json) {
        var ret = {};
        for (var key in json) {
            ret[json[key]] = key;
        }
        return ret;
    },
    /**
     * Description
     * @method setSegmentsData
     * @param {} singleAccountAlertDetails
     * @return
     */
    setSegmentsData: function(singleAccountAlertDetails) {
        try {
            var formatUtility = applicationManager.getFormatUtilManager();
            this.alertFields = {
                "minimumBalance": "Minimum Balance",
                "balanceUpdate": "Balance Update",
                "debitLimit": "Debit Limit",
                "creditLimit": "Credit Limit",
                "paymentDueReminder": "Payment Due",
                "depositDueReminder": "Deposit Maturity Reminder",
            };
            this.alertFields2 = {
                "successfulTransfer": "Successful Transfer",
                "overdraft": "Overdraft",
                "checkClearance": "Check Clearance"
            };
            this.segAlertSettingListJson = this.swapKeyValues(this.alertFields2);
            var segData = [];
            var segData2 = [];
            for (var value in this.alertFields) {
                if (kony.sdk.isNullOrUndefined(singleAccountAlertDetails[value])) {
                    continue;
                }
                var tempjson = {};
                tempjson.key = this.alertFields[value];
                tempjson.value = formatUtility.formatAmountandAppendCurrencySymbol(singleAccountAlertDetails[value]);
                segData.push(tempjson);
            }
            for (var rowVal in this.alertFields2) {
                if (kony.sdk.isNullOrUndefined(singleAccountAlertDetails[rowVal])) {
                    continue;
                }
                var tempjs = {};
                tempjs.key = this.alertFields2[rowVal];
                tempjs.value = singleAccountAlertDetails[rowVal];
              	tempjs.segSwitch = {};
              if (tempjs.value == "true") {
                    tempjs.segSwitch.selectedIndex = 0;
              }
         	 else{
                    tempjs.segSwitch.selectedIndex = 1;
             }
         	 tempjs.segSwitch.onSlide = this.toggleSegAlertSettingListRowFlag;
                segData2.push(tempjs);
            }
            this.view.segAlert.widgetDataMap = {
                "lblTitle": "key",
                "lblValue": "value"
            };
            this.view.SegAlertSettingList.widgetDataMap = {
                "lblTitle": "key",
                "switchSMS" : "segSwitch"
            };
            this.view.segAlert.setData(segData);
            this.view.SegAlertSettingList.setData(segData2);
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method toggleSingleAccountAlertsRequired
     * @return
     */
    toggleSingleAccountAlertsRequired: function() {
        try {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var userPrefManager = applicationManager.getUserPreferencesManager();
            var alertsTurnedOn = userPrefManager.getAlertsInfo();
            var toggle = "true";
            if (alertsTurnedOn == "true") {
                toggle = "false";
            }
            var inputParams = {
                "alertId": this.singleAccountAlertDetails.alertId,
                "isEnabled": toggle
            };
          	var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      		SettingsAlertsUIModule.presentationController.updateUserAccountAlerts(inputParams, this.updateSingleAccountAlertsRequiredFlagSuccess.bind(this), this.updateSingleAccountAlertsRequiredFlagFailure.bind(this));
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method updateSingleAccountAlertsRequiredFlagSuccess
     * @param {} response
     * @return
     */
    updateSingleAccountAlertsRequiredFlagSuccess: function(response) {
        try {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (this.view.switchSMS.selectedIndex === 1) {
                this.view.segAlert.isVisible = false;
                this.view.SegAlertSettingList.isVisible = false;
            } else {
                this.view.segAlert.isVisible = true;
                this.view.SegAlertSettingList.isVisible = true;
            }
            var self = this;
            var navManager = applicationManager.getNavigationManager();
            var accountsDetails = navManager.getCustomInfo("frmAlertsAccountList");
            accountsDetails.forEach(function(account) {
                if (account.alertId === self.singleAccountAlertDetails.alertId) {
                    if (account.isEnabled == true) {
                        account.isEnabled = false;
                    } else {
                        account.isEnabled = true;
                    }
                }
            });
            navManager.setCustomInfo("frmAlertsAccountList", accountsDetails);
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method updateSingleAccountAlertsRequiredFlagFailure
     * @param {} response
     * @return
     */
    updateSingleAccountAlertsRequiredFlagFailure: function(response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    /**
     * Description
     * @method toggleSegAlertSettingListRowFlag
     * @return
     */
    toggleSegAlertSettingListRowFlag: function() {
        try {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var selectedData = this.view.SegAlertSettingList.selectedRowItems[0];
            var rowkey = selectedData.key;
            var rowItem = this.segAlertSettingListJson[rowkey];
            var toggle = "true";
            if (selectedData.segSwitch.selectedIndex === 1) {
                toggle = "false";
            } else if (selectedData.segSwitch.selectedIndex === 0) {
                toggle = "true";
            }
            var inputParams = {
                "alertId": this.singleAccountAlertDetails.alertId,
            };
            inputParams[rowItem] = toggle;
          	var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
            SettingsAlertsUIModule.presentationController.updateUserAccountAlerts(inputParams, this.updateSegAlertSettingListRowFlagSuccess.bind(this), this.updateSegAlertSettingListRowFlagFailure.bind(this));
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method updateSegAlertSettingListRowFlagSuccess
     * @param {} response
     * @return
     */
    updateSegAlertSettingListRowFlagSuccess: function(response) {
        try {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var segData = this.view.SegAlertSettingList.data;
            var selectedData = this.view.SegAlertSettingList.selectedRowItems[0];
            var currentSelected = false;
            var self = this;
            this.view.SegAlertSettingList.setData(segData);
            var selectedField = this.segAlertSettingListJson[selectedData.key];
            var navManager = applicationManager.getNavigationManager();
            var accountsDetails = navManager.getCustomInfo("frmAlertsAccountList");
            accountsDetails.forEach(function(account) {
                if (account.alertId === self.singleAccountAlertDetails.alertId) {
                    if (account[selectedField] == "true") {
                        account[selectedField] = "false";
                    } else {
                        account[selectedField] = "true";
                    }
                }
            });
            navManager.setCustomInfo("frmAlertsAccountList", accountsDetails);
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method updateSegAlertSettingListRowFlagFailure
     * @param {} response
     * @return
     */
    updateSegAlertSettingListRowFlagFailure: function(response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
});