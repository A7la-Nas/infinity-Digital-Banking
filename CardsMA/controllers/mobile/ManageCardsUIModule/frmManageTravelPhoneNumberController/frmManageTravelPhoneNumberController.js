define({
	TravelPlanDetailsRequest: {},
	TravelPlanDetailsUpdate: {},
	navOption: "",
	keypadString: '',
	init: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start " + currentForm + " : init ####");
			applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	frmPreShow: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start " + currentForm + " : frmPreShow ####");
			this.getFrmData();
			this.setFlowActions();
			this.clearPhoneNumber();
          	this.goBackInfo();
			if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
				this.view.flxHeader.isVisible = false;
			} else {
				this.view.flxHeader.isVisible = true;
			}
//       var countryCode = this.TravelPlanDetailsRequest.phoneCountryCode;
// 			if (!isNaN(countryCode)) {
// 				this.view.lblCode.text = countryCode;
// 			}
			var phone = this.TravelPlanDetailsRequest.contactNumber;
			if (!isNaN(phone)) {
				for (var i = 0; i < phone.length; i++) {
					this.setKeypadChar(phone[i]);
				}
			}
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	clearPhoneNumber: function() {
		for (var i = 0; i < 13; i++) {
			this.clearKeypadChar();
		}
      this.view.lblPhoneNumber.text = "";
	},
	getFrmData: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        loggerManager.log("#### start " + currentForm + " : getFrmData ####");
        var custInfo = navManager.getCustomInfo("frmManageTravelPhoneNumber");
        this.TravelPlanDetailsRequest = custInfo.data;
        this.navOption = custInfo.option;
        loggerManager.log("entered this form with navigation option as: "+this.navOption);
        this.view.btnContinue.onClick = this.continueOnClick;
        this.view.btnSkip.onClick = this.skipOnClick;
        if (this.navOption === "edit") {
          this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.common.save");
          this.view.btnSkip.text = kony.i18n.getLocalizedString("kony.mb.Profile.DeletePhoneNumber");
        } else if (this.navOption === "add") {
          this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.common.continue");
          this.view.btnSkip.text = kony.i18n.getLocalizedString("kony.mb.common.skip");
        }
      } catch (exc) {
        loggerManager.log("#### in catch " + exc + " ####");
      }
    },
  	goBackInfo: function(){
      var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### goBackInfo #### for form: " + currentForm);
          if (this.navOption === "edit") {
            navManager.setCustomInfo("frmManageTravelDetails", this.TravelPlanDetailsRequest);
            //manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDetails");
          } else {
            navManager.setCustomInfo("frmManageTravelSelectCards", {"option": "add","data": this.TravelPlanDetailsRequest});
            //manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelSelectCards");
          }
        } catch (exc) {
          loggerManager.log("#### in catch " + JSON.stringify(exc) + " ####");
        }
    },
	setFlowActions: function() {
		var scope = this;
		this.view.customHeader.flxBack.onClick = this.backOnClick;
		this.view.customHeader.btnRight.onClick = this.cancelOnClick;
	},
	backOnClick: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start " + currentForm + " : backOnClick ####");
          	navManager.goBack();
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	cancelOnClick: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start " + currentForm + " : cancelOnClick ####");
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			if (this.navOption === "edit") {
				navManager.setCustomInfo("frmManageTravelDetails", this.TravelPlanDetailsRequest);
				manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDetails");
			} else {
				manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelPlans");
			}
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
  	validatePhone:function(char) {
      if(this.keypadString.length <= 15 && this.keypadString.length >= 10)
      {
        return true;
      }
      return false;
    },
    setKeypadChar: function(char) {
      this.keypadString = this.keypadString + char;
      this.view.lblPhoneNumber.text = this.keypadString;
      //if valid
      if(this.validatePhone())
      {
        this.enterPostAction();
      }
      else
      {
        this.incompleteView();
      }
      this.view.forceLayout();
      return;
    },
    clearKeypadChar: function() {
      if (this.keypadString.length === 0) return;
      this.keypadString = this.keypadString.substr(0, this.keypadString.length-1);
      this.view.lblPhoneNumber.text = this.keypadString;
      if (this.validatePhone())
      {
        this.enterPostAction();
      }
      else
      {
        this.incompleteView();
      }
      this.view.forceLayout();
      return;
    },
	incompleteView: function() {
		this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
		this.view.btnContinue.setEnabled(false);
	},
	enterPostAction: function() {
		this.view.btnContinue.setEnabled(true);
		this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
	},
	readPhoneNumberFromForm: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start " + currentForm + " : readPhoneNumberFromForm ####");
      var phoneNumber = this.view.lblPhoneNumber.text;
			loggerManager.log("Phone number entered in frmManageTravelPhoneNumber: " + phoneNumber);
			return phoneNumber;
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
    skipOnClick: function(){
      	var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### skipOnClick #### for form: " + currentForm);
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			this.TravelPlanDetailsUpdate = JSON.parse(JSON.stringify(this.TravelPlanDetailsRequest));
			this.TravelPlanDetailsUpdate.contactNumber = "None";
			if (this.navOption === "edit") {
				applicationManager.getPresentationUtility().showLoadingScreen();
				loggerManager.log("TravelDetailsObjectRequest: "+JSON.stringify(this.TravelPlanDetailsRequest));
				loggerManager.log("TravelDetailsObjectUpdated: "+JSON.stringify(this.TravelPlanDetailsUpdate));
				manageCardsModule.presentationController.updateTravelPlan(this.TravelPlanDetailsUpdate, this.successCallbackForUpdate, this.failureCallbackForUpdate);
			} else if (this.navOption === "add")
            {
              navManager.setCustomInfo("frmManageTravelConfirmation", this.TravelPlanDetailsUpdate);
              manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelConfirmation");
			}
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
    },
	continueOnClick: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### continueOnClick #### for form: " + currentForm);
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			this.TravelPlanDetailsUpdate = JSON.parse(JSON.stringify(this.TravelPlanDetailsRequest));
			this.TravelPlanDetailsUpdate.contactNumber = this.readPhoneNumberFromForm();
			if (this.navOption === "edit") {
				applicationManager.getPresentationUtility().showLoadingScreen();
				loggerManager.log("TravelDetailsObjectRequest: "+JSON.stringify(this.TravelPlanDetailsRequest));
				loggerManager.log("TravelDetailsObjectUpdated: "+JSON.stringify(this.TravelPlanDetailsUpdate));
				manageCardsModule.presentationController.updateTravelPlan(this.TravelPlanDetailsUpdate, this.successCallbackForUpdate, this.failureCallbackForUpdate);
			} else
				if (this.navOption === "add") {
					navManager.setCustomInfo("frmManageTravelConfirmation", this.TravelPlanDetailsUpdate);
					manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelConfirmation");
				}
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	successCallbackForUpdate: function(resp) {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start " + currentForm + " : successCallbackForUpdate ####");
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			this.TravelPlanDetailsUpdate.showToast = true;
			this.TravelPlanDetailsUpdate.isSuccess = true;
			this.TravelPlanDetailsUpdate.message = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.updateTravelPlanSuccess");
			navManager.setCustomInfo("frmManageTravelDetails", this.TravelPlanDetailsUpdate);
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDetails");
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	failureCallbackForUpdate: function(err) {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start " + currentForm + " : failureCallbackForUpdate ####");
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			loggerManager.log("error: came to  failureCallbackForUpdate: " + JSON.stringify(err));
			if (err["isServerUnreachable"])
				applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
			this.TravelPlanDetailsRequest.showToast = true;
			this.TravelPlanDetailsRequest.isSuccess = false;
			this.TravelPlanDetailsRequest.message = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.updateTravelPlanFailure");
			navManager.setCustomInfo("frmManageTravelDetails", this.TravelPlanDetailsRequest);
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDetails");
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	}
});