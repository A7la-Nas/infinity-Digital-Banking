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
        },
	    /**
	     * Description
	     * @method setPreshowData
	     * @return
	     */
	    setPreshowData: function() {
          try {
            if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
              this.view.flxHeader.isVisible = false;
            }
            else {
              this.view.flxHeader.isVisible = true;
            }
          }
          catch(err){
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
	            var navManager = applicationManager.getNavigationManager();
	            dealsAndSecurityAlertsList = navManager.getCustomInfo("frmAlertsDealsAndSecurity");
	            if(dealsAndSecurityAlertsList[1] === 1) {
	                this.view.title = kony.i18n.getLocalizedString("kony.mb.Alerts.SecurityAlerts");
                  this.view.flxBodyTxt.lblBodyTxt.text = kony.i18n.getLocalizedString("kony.mb.Alerts.SecurityAlertMsg");
	                this.view.flxBankIDChange.isVisible = true;
	                this.view.flxPasswordChange.isVisible = true;
	                this.view.flxPasswordExpired.isVisible = true;
	                this.view.flxAddressOrPhoneChange.isVisible = true;
	                this.view.flxNewPayeeAdded.isVisible = true;
	                this.view.flxPayeeDetailsUpdated.isVisible = true;
	                this.view.flxNewDealsAvailable.isVisible = false;
	                this.view.flxDealsExpiringInOneday.isVisible = false;
	                this.setSecurityAlertsList();
	            }
              	else if(dealsAndSecurityAlertsList[1] === 2) {
	                this.view.title = kony.i18n.getLocalizedString("kony.mb.Alerts.DealsAlerts");
                  this.view.flxBodyTxt.lblBodyTxt.text = kony.i18n.getLocalizedString("kony.mb.Alerts.DealsAlertMsg");
	                this.view.flxBankIDChange.isVisible = false;
	                this.view.flxPasswordChange.isVisible = false;
	                this.view.flxPasswordExpired.isVisible = false;
	                this.view.flxAddressOrPhoneChange.isVisible = false;
	                this.view.flxNewPayeeAdded.isVisible = false;
	                this.view.flxPayeeDetailsUpdated.isVisible = false;
	                this.view.flxNewDealsAvailable.isVisible = true;
	                this.view.flxDealsExpiringInOneday.isVisible = true;
	                this.setDealsAlertsList();
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
              	this.view.customHeader.flxBack.onClick = function(){
          			 var navMan=applicationManager.getNavigationManager();
          			 navMan.goBack();
       			 };
	            var scopeObj = this;
	            this.view.switchBankIDChange.onSlide = this.toggleBtnActionBankIDChange;
	            this.view.switchPasswordChange.onSlide = this.toggleBtnActionPasswordChange;
	            this.view.switchPasswordExpired.onSlide = this.toggleBtnActionPasswordExpired;
	            this.view.switchAddressOrPhoneChange.onSlide = this.toggleBtnActionAddressOrPhoneChange;
	            this.view.switchNewPayeeAdded.onSlide = this.toggleBtnActionNewPayeeAdded;
	            this.view.switchPayeeDetailsUpdated.onSlide = this.toggleBtnActionPayeeDetailsUpdated;
	            this.view.switchNewDealsAvailable.onSlide = this.toggleBtnActionNewDealsAvailable;
	            this.view.switchDealsExpiringInOneday.onSlide = this.toggleBtnActionDealsExpiringInOneDay;
            }
            catch(err) {
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
	    },
	    /**
	     * Description
	     * @method setSecurityAlertsList
	     * @return
	     */
	    setSecurityAlertsList: function() {
	        try {
	            this.view.lblBankIDChange.text = kony.i18n.getLocalizedString("kony.mb.Alerts.BankingIDChange");
	            this.view.lblPasswordChange.text = kony.i18n.getLocalizedString("kony.mb.Alerts.PasswordChange");
	            this.view.lblPasswordExpired.text = kony.i18n.getLocalizedString("kony.mb.Alerts.PasswordExpired");
	            this.view.lblAddressOrPhoneChange.text = kony.i18n.getLocalizedString("kony.mb.Alerts.AddressOrPhoneChange");
	            this.view.lblNewPayeeAdded.text = kony.i18n.getLocalizedString("kony.mb.Alerts.NewPayeeAdded");
	            this.view.lblPayeeDetailsUpdated.text = kony.i18n.getLocalizedString("kony.mb.Alerts.PayeeDetailsUpdated");
	            //alert(JSON.stringify(dealsAndSecurityAlertsList));
	            if (dealsAndSecurityAlertsList[0].bankingIDChange === "true") {
	                this.view.switchBankIDChange.selectedIndex = 0;
	            } else {
	                this.view.switchBankIDChange.selectedIndex = 1;
	            }
	            if (dealsAndSecurityAlertsList[0].passwordChange === "true") {
	                this.view.switchPasswordChange.selectedIndex = 0;
	            } else {
	                this.view.switchPasswordChange.selectedIndex = 1;
	            }
	            if (dealsAndSecurityAlertsList[0].passwordExpired === "true") {
	                this.view.switchPasswordExpired.selectedIndex = 0;
	            } else {
	                this.view.switchPasswordExpired.selectedIndex = 1;
	            }
	            if (dealsAndSecurityAlertsList[0].communicationChange === "true") {
	                this.view.switchAddressOrPhoneChange.selectedIndex = 0;
	            } else {
	                this.view.switchAddressOrPhoneChange.selectedIndex = 1;
	            }
	            if (dealsAndSecurityAlertsList[0].newPayeeAdded === "true") {
	                this.view.switchNewPayeeAdded.selectedIndex = 0;
	            } else {
	                this.view.switchNewPayeeAdded.selectedIndex = 1;
	            }
	            if (dealsAndSecurityAlertsList[0].payeeDetailsUpdated === "true") {
	                this.view.switchPayeeDetailsUpdated.selectedIndex = 0;
	            } else {
	                this.view.switchPayeeDetailsUpdated.selectedIndex = 1;
	            }
            }
            catch(err) {
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
	    },
	    /**
	     * Description
	     * @method setDealsAlertsList
	     * @return
	     */
	    setDealsAlertsList: function() {
	        try {
	            this.view.lblNewDealsAvailable.text = kony.i18n.getLocalizedString("kony.mb.Alerts.NewDealsAvailable");
	            this.view.lblDealsExpiringInOneDay.text = kony.i18n.getLocalizedString("kony.mb.Alerts.DealsExpiringInOneDay");
	            if (dealsAndSecurityAlertsList[0].newDealsAvailable === "true") {
	                this.view.switchNewDealsAvailable.selectedIndex = 0;
	            } else {
	                this.view.switchNewDealsAvailable.selectedIndex = 1;
	            }
	            if (dealsAndSecurityAlertsList[0].dealsExpiring === "true") {
	                this.view.switchDealsExpiringInOneday.selectedIndex = 0;
	            } else {
	                this.view.switchDealsExpiringInOneday.selectedIndex = 1;
	            }
            }
            catch(err) {
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
	    },
	    /**
	     * Description
	     * @method toggleBtnActionBankIDChange
	     * @return
	     */
	    toggleBtnActionBankIDChange: function() {
	        try {
	            applicationManager.getPresentationUtility().showLoadingScreen();
	            var toggle = "true";
	            if (this.view.switchBankIDChange.selectedIndex === 0) {
	                toggle = "true";
	            } else if (this.view.switchBankIDChange.selectedIndex === 1) {
	                toggle = "false";
	            }
	            var inputParams = {
	                "alertid": dealsAndSecurityAlertsList[0].alertid,
	                "bankingIDChange": toggle
	            }
                var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      			SettingsAlertsUIModule.presentationController.updateUserAlerts(inputParams, this.updateBankingIDChangeFlagSuccess.bind(this), this.updateBankingIDChangeFlagFailure.bind(this));
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
	    updateBankingIDChangeFlagSuccess: function(response) {
	        try {
	            applicationManager.getPresentationUtility().dismissLoadingScreen();
            }
            catch(err) {
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
	    },
	    /**
	     * Description
	     * @method updateBankingIDChangeFlagFailure
	     * @param {} response
	     * @return
	     */
	    updateBankingIDChangeFlagFailure: function(response) {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
	    },
	    /**
	     * Description
	     * @method toggleBtnActionPasswordChange
	     * @return
	     */
	    toggleBtnActionPasswordChange: function() {
	        try {
	            applicationManager.getPresentationUtility().showLoadingScreen();
	            var toggle = "true";
	            if (this.view.switchPasswordChange.selectedIndex === 0) {
	                toggle = "true";
	            } else if (this.view.switchPasswordChange.selectedIndex === 1) {
	                toggle = "false";
	            }
	            var inputParams = {
	                "alertid": dealsAndSecurityAlertsList[0].alertid,
	                "passwordChange": toggle
	            }
              	var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      			SettingsAlertsUIModule.presentationController.updateUserAlerts(inputParams, this.updatePasswordChangeFlagSuccess.bind(this), this.updateupdatePasswordChangeFlagFailure.bind(this));
            }
            catch(err) {
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
	    },
	    /**
	     * Description
	     * @method updatePasswordChangeFlagSuccess
	     * @param {} response
	     * @return
	     */
	    updatePasswordChangeFlagSuccess: function(response) {
	        try {
	            applicationManager.getPresentationUtility().dismissLoadingScreen();
            }
            catch(err) {
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
	    },
      /**
	     * Description
	     * @method updateupdatePasswordChangeFlagFailure
	     * @param {} response
	     * @return
	     */
	    updateupdatePasswordChangeFlagFailure: function(response) {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
	    },
	    /**
	     * Description
	     * @method toggleBtnActionPasswordExpired
	     * @return
	     */
	    toggleBtnActionPasswordExpired: function() {
	        try {
	            applicationManager.getPresentationUtility().showLoadingScreen();
	            var toggle = "true";
	            if (this.view.switchPasswordExpired.selectedIndex === 0) {
	                toggle = "true";
	            } else if (this.view.switchPasswordExpired.selectedIndex === 1) {
	                toggle = "false";
	            }
	            var inputParams = {
	                "alertid": dealsAndSecurityAlertsList[0].alertid,
	                "passwordExpired": toggle
	            }
                var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      			SettingsAlertsUIModule.presentationController.updateUserAlerts(inputParams, this.updatePasswordExpiredFlagSuccess.bind(this), this.updatePasswordExpiredFlagFailure.bind(this));
            }
            catch(err) {
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
	    },
	    /**
	     * Description
	     * @method updatePasswordExpiredFlagSuccess
	     * @param {} response
	     * @return
	     */
	    updatePasswordExpiredFlagSuccess: function(response) {
          try {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
          }
          catch(err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
          }
	    },
	    /**
	     * Description
	     * @method updatePasswordExpiredFlagFailure
	     * @param {} response
	     * @return
	     */
	    updatePasswordExpiredFlagFailure: function(response) {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
	    },
	    /**
	     * Description
	     * @method toggleBtnActionAddressOrPhoneChange
	     * @return
	     */
	    toggleBtnActionAddressOrPhoneChange: function() {
	        try {
	            applicationManager.getPresentationUtility().showLoadingScreen();
	            var toggle = "true";
	            if (this.view.switchAddressOrPhoneChange.selectedIndex === 0) {
	                toggle = "true";
	            } else if (this.view.switchAddressOrPhoneChange.selectedIndex === 1) {
	                toggle = "false";
	            }
	            var inputParams = {
	                "alertid": dealsAndSecurityAlertsList[0].alertid,
	                "communicationChange": toggle
	            }
               	var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
   			   	SettingsAlertsUIModule.presentationController.updateUserAlerts(inputParams, this.updateAddressOrPhoneChangeFlagSuccess.bind(this), this.updateAddressOrPhoneChangeFlagFailure.bind(this));
            }
            catch(err) {
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
	    },
	    /**
	     * Description
	     * @method updateAddressOrPhoneChangeFlagSuccess
	     * @param {} response
	     * @return
	     */
	    updateAddressOrPhoneChangeFlagSuccess: function(response) {
          try {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
          }
          catch(err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
          }
	    },
	    /**
	     * Description
	     * @method updateAddressOrPhoneChangeFlagFailure
	     * @param {} response
	     * @return
	     */
	    updateAddressOrPhoneChangeFlagFailure: function(response) {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
	    },
	    /**
	     * Description
	     * @method toggleBtnActionNewPayeeAdded
	     * @return
	     */
	    toggleBtnActionNewPayeeAdded: function() {
	        try {
              applicationManager.getPresentationUtility().showLoadingScreen();
              var toggle = "true";
              if(this.view.switchNewPayeeAdded.selectedIndex === 0) {
                toggle = "true";
              }
              else if(this.view.switchNewPayeeAdded.selectedIndex === 1) {
                toggle = "false";
              }
              var inputParams = {
                "alertid": dealsAndSecurityAlertsList[0].alertid,
                "newPayeeAdded": toggle
              }
              var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
              SettingsAlertsUIModule.presentationController.updateUserAlerts(inputParams, this.updateNewPayeeAddedFlagSuccess.bind(this), this.updateNewPayeeAddedFlagFailure.bind(this));
            }
            catch(err) {
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
	    },
	    /**
	     * Description
	     * @method updateNewPayeeAddedFlagSuccess
	     * @param {} response
	     * @return
	     */
	    updateNewPayeeAddedFlagSuccess: function(response) {
          try {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
          }
          catch(err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
          }
	    },
	    /**
	     * Description
	     * @method updateNewPayeeAddedFlagFailure
	     * @param {} response
	     * @return
	     */
	    updateNewPayeeAddedFlagFailure: function(response) {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
	    },
	    /**
	     * Description
	     * @method toggleBtnActionPayeeDetailsUpdated
	     * @return
	     */
	    toggleBtnActionPayeeDetailsUpdated: function() {
	        try {
	            applicationManager.getPresentationUtility().showLoadingScreen();
	            var toggle = "true";
	            if (this.view.switchPayeeDetailsUpdated.selectedIndex === 0) {
	                toggle = "true";
	            } else if (this.view.switchPayeeDetailsUpdated.selectedIndex === 1) {
	                toggle = "false";
	            }
	            var inputParams = {
	                "alertid": dealsAndSecurityAlertsList[0].alertid,
	                "payeeDetailsUpdated": toggle
	            }
				var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      			SettingsAlertsUIModule.presentationController.updateUserAlerts(inputParams, this.updatePayeeDetailsUpdatedFlagSuccess.bind(this), this.updatePayeeDetailsUpdatedFlagFailure.bind(this));
            }
            catch(err) {
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
	    },
	    /**
	     * Description
	     * @method updatePayeeDetailsUpdatedFlagSuccess
	     * @param {} response
	     * @return
	     */
	    updatePayeeDetailsUpdatedFlagSuccess: function(response) {
          try {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
          }
          catch(err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
          }
	    },
	    /**
	     * Description
	     * @method updatePayeeDetailsUpdatedFlagFailure
	     * @param {} response
	     * @return
	     */
	    updatePayeeDetailsUpdatedFlagFailure: function(response) {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
	    },
	    /**
	     * Description
	     * @method toggleBtnActionNewDealsAvailable
	     * @return
	     */
	    toggleBtnActionNewDealsAvailable: function() {
	        try {
	            applicationManager.getPresentationUtility().showLoadingScreen();
	            var toggle = "true";
	            if (this.view.switchNewDealsAvailable.selectedIndex === 0) {
	                toggle = "true";
	            } else if (this.view.switchNewDealsAvailable.selectedIndex === 1) {
	                toggle = "false";
	            }
	            var inputParams = {
	                "alertid": dealsAndSecurityAlertsList[0].alertid,
	                "newDealsAvailable": toggle
	            };
              	var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      			SettingsAlertsUIModule.presentationController.updateUserAlerts(inputParams, this.updateUserAlertsSuccess.bind(this), this.updateUserAlertsFailure.bind(this));
            }
            catch(err) {
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
	    },
	    /**
	     * Description
	     * @method updateUserAlertsSuccess
	     * @param {} response
	     * @return
	     */
	    updateUserAlertsSuccess: function(response) {
          try {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
          }
          catch(err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
          }
	    },
	    /**
	     * Description
	     * @method updateUserAlertsFailure
	     * @param {} response
	     * @return
	     */
	    updateUserAlertsFailure: function(response) {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
	    },
	    /**
	     * Description
	     * @method toggleBtnActionDealsExpiringInOneDay
	     * @return
	     */
	    toggleBtnActionDealsExpiringInOneDay: function() {
	        try {
	            applicationManager.getPresentationUtility().showLoadingScreen();
	            var toggle = "true";
	            if (this.view.switchDealsExpiringInOneday.selectedIndex === 0) {
	                toggle = "true";
	            } else if (this.view.switchDealsExpiringInOneday.selectedIndex === 1) {
	                toggle = "false";
	            }
	            var inputParams = {
	                "alertid": dealsAndSecurityAlertsList[0].alertid,
	                "dealsExpiring": toggle
	            };
              	var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      			SettingsAlertsUIModule.presentationController.updateUserAlerts(inputParams, this.updateDealsExpiringInOneDayFlagSuccess.bind(this), this.updateDealsExpiringInOneDayFlagFailure.bind(this));
            }
            catch(err) {
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
	    },
	    /**
	     * Description
	     * @method updateDealsExpiringInOneDayFlagSuccess
	     * @param {} response
	     * @return
	     */
	    updateDealsExpiringInOneDayFlagSuccess: function(response) {
          try {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
          }
          catch(err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
          }
	    },
	    /**
	     * Description
	     * @method updateDealsExpiringInOneDayFlagFailure
	     * @param {} response
	     * @return
	     */
	    updateDealsExpiringInOneDayFlagFailure: function(response) {
	        applicationManager.getPresentationUtility().dismissLoadingScreen();
	    },
	    /**
	     * Description
	     * @method imgbackAction
	     * @return
	     */
	    imgbackAction: function() {
          try {
	        var navManager = applicationManager.getNavigationManager();
	        navManager.goBack();
          }
          catch(err) {
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
          }
	    }
	});