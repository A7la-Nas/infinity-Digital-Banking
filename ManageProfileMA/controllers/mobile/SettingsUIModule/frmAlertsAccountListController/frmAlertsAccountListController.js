  define({
    init : function(){
      try {
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
        this.frmPreShow();
        this.initActions();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
             * Description
             * @method setFlowActions
             * @return
             */
    setFlowActions: function() {
      try {
        var scope = this;
        this.view.segAlert.onRowClick = this.segAlertsAccountListOnClick;
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
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
             * Description
             * @method frmPreShow
             * @return
             */
    frmPreShow: function() {
      try {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        var alertsTurnedOn = userPrefManager.getAlertsInfo();
        this.setSegmentAlertsAccountList();
        if (alertsTurnedOn == "true") {
          this.view.switchSMS.selectedIndex = 0;
          this.view.segAlert.isVisible = true;
        } else {
          this.view.switchSMS.selectedIndex = 1;
          this.view.segAlert.isVisible = false;
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
             * Description
             * @method initActions
             * @return
             */
    initActions: function() {
      try {
        var scope = this;
        this.view.customHeader.flxBack.onClick = function(){
          var navMan=applicationManager.getNavigationManager();
          navMan.goBack();
        };
        this.view.switchSMS.onSlide = this.toggleAlertsRequiredFlag;
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
             * Description
             * @method setSegmentAlertsAccountList
             * @return
             */
    setSegmentAlertsAccountList: function() {
      try {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        var navManager = applicationManager.getNavigationManager();
        var accountsDetails = navManager.getCustomInfo("frmAlertsAccountList");
        for (var i = 0; i < accountsDetails.length; i++) {
          var len = accountsDetails[i].accountNumber.length;
          accountsDetails[i].alertsTurned = "Off";
          if (accountsDetails[i].isEnabled == true) {
            accountsDetails[i].alertsTurned = "On";
          }
          accountsDetails[i].accountDisplayName = accountsDetails[i].accountName + "..." +
            accountsDetails[i].accountNumber.substring(len - 4, len);
          accountsDetails[i].bankName = userPrefManager.getBankName();
        }
        this.view.segAlert.widgetDataMap = {
          lblTitle: "accountDisplayName",
          lblSubTitle: "bankName",
          lblAlertStatus: "alertsTurned"
        };
        this.view.segAlert.setData(accountsDetails);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
             * Description
             * @method segAlertsAccountListOnClick
             * @return
             */
    segAlertsAccountListOnClick: function() {
      this.gotoAlertsAccountDetail();
    },
    /**
             * Description
             * @method gotoAlertsAccountDetail
             * @return
             */
    gotoAlertsAccountDetail: function() {
      try {
        var accountAlertsDetails = this.view.segAlert.selectedRowItems[0];
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmAlertsAccountDetail", accountAlertsDetails);
        var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsModule");
        settingsMod.presentationController.commonFunctionForNavigation("frmAlertsAccountDetail");
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
             * Description
             * @method clone
             * @param {} obj
             * @return copy
             */
    clone: function(obj) {
      if (null === obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
    },
    /**
             * Description
             * @method toggleBtnActionBankIDChange
             * @return
             */
    toggleAlertsRequiredFlag: function() {
      try {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var userPrefManager = applicationManager.getUserPreferencesManager();
        var alertsTurnedOn = userPrefManager.getAlertsInfo();
        var toggle = "true";
        if (alertsTurnedOn == "true") {
          toggle = "false";
        }
        var inputParam={
          "alertsTurnedOn": toggle
        };
        var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsModule");
        settingsModule.presentationController.updateAccountAlertsFlag(inputParam, this.updateAccountAlertsFlagSuccess.bind(this), this.updateAccountAlertsFlagFailure.bind(this));
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
             * Description
             * @method updateBankingIDChangeFlagSuccess
             * @param {} response
             * @return
             */
    updateAccountAlertsFlagSuccess: function(response) {
      try {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        userPrefManager.fetchUser(this.refreshAlertsScreenSuccess,this.updateAccountAlertsFlagFailure);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    refreshAlertsScreenSuccess : function(response){
      try {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        var alertsTurnedOn = userPrefManager.getAlertsInfo();
        this.view.segAlert.isVisible=false;
        if (alertsTurnedOn == "true") {
          this.view.segAlert.isVisible=true;
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
             * DescriptionX
             * @method updateBankingIDChangeFlagFailure
             * @param {} response
             * @return
             */
    updateAccountAlertsFlagFailure: function(response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
  });