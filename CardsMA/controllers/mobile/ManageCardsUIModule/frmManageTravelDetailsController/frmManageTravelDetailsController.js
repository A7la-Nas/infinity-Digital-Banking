define({
  TravelPlanDetails: {},
  init: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : init ####");
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    } catch (exc) {
      loggerManager.log("#### in catch of init" + exc + " ####");
    }
  },
  preShowDetails: function() {
    this.setPreShowData();
    this.SetFlowActions();
  },
  setPreShowData: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : setPreShowData ####");
      this.view.flxMain.isVisible = true;
      this.view.flxEditOptions.isVisible = false;
      this.view.customHeader.btnRight.isVisible = false;
      this.view.btnDelete.isVisible = false;
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.flxHeader.isVisible = false;
      }
      var frmData = navManager.getCustomInfo("frmManageTravelDetails");
      loggerManager.log("got Custom Info for frmManageTravelDetails: " + JSON.stringify(frmData));
      this.TravelPlanDetails = frmData;
      loggerManager.log("entry frmManageTravelDetailsController data: " + this.TravelPlanDetails);
      this.view.lblRequestIDValue.text = this.TravelPlanDetails.notificationId.toString();
      this.view.lblStatus.text = this.TravelPlanDetails.status.toString();
      if (this.TravelPlanDetails.status.toString().trim() === "Active") {
        this.view.btnDelete.isVisible = true;
        this.view.lblStatus.skin = "sknLbl43CE6E22px";
		if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
		  	var item = new kony.ui.BarButtonItem( {
				"type":constants.BAR_BUTTON_TITLE,
				"enabled" :true,
				"action": this.showEditOption,
				"tintColor": "ffffff",
    			"style" : constants.BAR_ITEM_STYLE_PLAIN,
				"metaData":{"title":"Edit"}}
				);
			var items = [];
			items.push(item);
			var enableButtonconfig = {"animated":false,"items":items};
			this.view.setRightBarButtonItems(enableButtonconfig);
		} else {
		  this.view.customHeader.btnRight.isVisible = true;
		}
      } else {
        this.view.btnDelete.isVisible = false;
        this.view.lblStatus.skin = "sknLbl66666622px";
		if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
			var disableButtonConfig = {"animated":false,"items":[]};
			this.view.setRightBarButtonItems(disableButtonConfig);
		} else {
			this.view.customHeader.btnRight.isVisible = false;
		}
	  }
      this.view.lblFromDate.text = this.TravelPlanDetails.startDate.toString();
      this.view.lblToDate.text = this.TravelPlanDetails.endDate.toString();
      this.view.lblContactPhoneNumberValue.text = this.TravelPlanDetails.contactNumber.toString();
      this.setTravelDestinationSegData();
      this.setSelectedCardsSegData();
      this.view.forceLayout();
      try {
        var toastShow = this.TravelPlanDetails.showToast;
        if (!kony.sdk.isNullOrUndefined(toastShow)) {
          if (this.TravelPlanDetails.isSuccess) {
            applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, this.TravelPlanDetails.message);
            this.TravelPlanDetails.showToast = null;
          } else {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, this.TravelPlanDetails.message);
            this.TravelPlanDetails.showToast = null;
          }
        }
      } catch (err) {
        loggerManager.log("exception in showing toast: " + err);
      }
    } catch (exc) {
      loggerManager.log("#### in catch setPreShowData " + exc + " ####");
    }
  },
  SetFlowActions: function() {
    var scope = this;
    this.view.customHeader.flxBack.onClick = this.navToTravelPlans;
    //#ifdef android
    this.view.onDeviceBack = this.navToTravelPlans;
    //#endif
    this.view.customHeader.btnRight.onClick = function() {
      scope.showEditOption();
    };
    this.view.flxEditAddPhoneNumber.onClick = function() {
      scope.NavToPhoneNumber();
    };
    this.view.flxEditTravelDates.onClick = function() {
      scope.NavToTravelStartDate();
    };
    this.view.flxEditTravelDestination.onClick = function() {
      scope.NavToTravelDestination();
    };
    this.view.flxEditSelectedCards.onClick = function() {
      scope.NavToSelectCards();
    };
    this.view.btnCancel.onClick = function() {
      scope.hideEditOptions();
    };
    this.view.flxTop.onClick = function() {
      scope.hideEditOptions();
    };
    this.view.btnDelete.onClick = this.deleteAlertConfirmation;
  },
  navToTravelPlans: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : navToTravelPlans ####");
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.fetchTravelPlans();
    } catch (exc) {
      loggerManager.log("#### in catch navToTravelPlans " + exc + " ####");
    }
  },
  showEditOption: function() {
    if(applicationManager.getDeviceUtilManager().isIPhone()) {
      var actionSheetObject = new kony.ui.ActionSheet(
        {
          "title":null,
          "message":null,
          "showCompletionCallback": null
        }
      );
	  applicationManager.actionSheetObject=actionSheetObject;
      var actionEditPhoneNumber = new kony.ui.ActionItem(
        {
          "title":"Edit/Add Contact Phone Number",
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.flxEditAddPhoneNumber.onClick
        }
      );
      var actionEditTravelDates = new kony.ui.ActionItem(
        {
          "title":"Edit Travel Dates",
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.flxEditTravelDates.onClick
        }
      );
      var actionEditTravelDestinations = new kony.ui.ActionItem(
        {
          "title":"Edit Travel Destinations",
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.flxEditTravelDestination.onClick
        }
      );
      var actionEditSelectedCards = new kony.ui.ActionItem(
        {
          "title":"Edit Selected Cards",
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.flxEditSelectedCards.onClick
        }
      );
      var actionCancel = new kony.ui.ActionItem(
        {
          "title":"Cancel",
          "style":constants.ACTION_ITEM_STYLE_CANCEL,
          "action": null
        }
      );
      actionSheetObject.addAction(actionEditPhoneNumber);
      actionSheetObject.addAction(actionEditTravelDates);
      actionSheetObject.addAction(actionEditTravelDestinations);
      actionSheetObject.addAction(actionEditSelectedCards);
      actionSheetObject.addAction(actionCancel);
      actionSheetObject.show();
    }else{
      this.view.flxEditOptions.isVisible = true;
    }
  },
  hideEditOptions: function() {
    this.view.flxEditOptions.isVisible = false;
  },
  NavToPhoneNumber: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : NavToPhoneNumber ####");
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      navManager.setCustomInfo("frmManageTravelPhoneNumber", {
        "option": "edit",
        "data": this.TravelPlanDetails
      });
      manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelPhoneNumber");
    } catch (exc) {
      loggerManager.log("#### in catch NavToPhoneNumber " + exc + " ####");
    }
  },
  NavToTravelStartDate: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : NavToTravelStartDate ####");
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      navManager.setCustomInfo("frmManageTravelStartDate", {
        "option": "edit",
        "data": this.TravelPlanDetails
      });
      manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelStartDate");
    } catch (exc) {
      loggerManager.log("#### in catch NavToTravelStartDate" + exc + " ####");
    }
  },
  NavToTravelDestination: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : NavToTravelDestination ####");
      navManager.setCustomInfo("frmManageTravelDestination", {
        "option": "edit",
        "data": this.TravelPlanDetails
      });
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.navigateToTravelDestination();
    } catch (exc) {
      loggerManager.log("#### in catch NavToTravelDestination " + exc + " ####");
    }
  },
  NavToSelectCards: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : NavToSelectCards ####");
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      navManager.setCustomInfo("frmManageTravelSelectCards", {
        "option": "edit",
        "data": this.TravelPlanDetails
      });
      manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelSelectCards");
    } catch (exc) {
      loggerManager.log("#### in catch NavToSelectCards " + exc + " ####");
    }
  },
  setTravelDestinationSegData: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : setTravelDestinationSegData ####");
      if (typeof(this.TravelPlanDetails.destinations) === "string") {
        this.TravelPlanDetails.destinations = this.TravelPlanDetails.destinations.split("-");
      }
      var segdata = [];
      for (var i = 0; i < this.TravelPlanDetails.destinations.length; i++) {
        segdata.push({
          "index": (i + 1).toString(10) + ".",
          "destination": this.TravelPlanDetails.destinations[i]
        });
      }
      this.view.segTravelDestination.widgetDataMap = {
        lblNumber: "index",
        lblDestinationValue: "destination",
      };
      loggerManager.log("setTravelDestinationSegData: " + JSON.stringify(segdata));
      this.view.segTravelDestination.setData(segdata);
    } catch (exc) {
      loggerManager.log("#### in catch setTravelDestinationSegData " + exc + " ####");
    }
  },
  setSelectedCardsSegData: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : setSelectedCardsSegData ####");
      var cards = [];
      var segdata = [];
      if (typeof(this.TravelPlanDetails.cardNumber) === "string") {
        cards = this.TravelPlanDetails.cardNumber.split(",");
        for (var i = 0; i < cards.length; i++) {
          segdata.push({
            "index": (i + 1).toString(10) + ".",
            "cardNumber": cards[i]
          });
        }
      } else {
        cards = this.TravelPlanDetails.cardNumber;
        for (var i = 0; i < cards.length; i++) {
          segdata.push({
            "index": (i + 1).toString(10) + ".",
            "cardNumber": cards[i].name + " " + cards[i].number
          });
        }
      }
      this.view.segSelectedCards.widgetDataMap = {
        lblNumber: "index",
        lblDestinationValue: "cardNumber",
      };
      loggerManager.log("setSelectedCardsSegData: " + JSON.stringify(segdata));
      this.view.segSelectedCards.setData(segdata);
    } catch (exc) {
      loggerManager.log("#### in catch setSelectedCardsSegData " + exc + " ####");
    }
  },
  deleteTravelPlanOnClick: function(alertResponse) {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### deleteTravelPlanOnClick #### for form: " + currentForm);
      if (alertResponse === true) {
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        applicationManager.getPresentationUtility().showLoadingScreen();
        manageCardsModule.presentationController.deleteTravelPlan(this.TravelPlanDetails, this.successCallbackForDelete, this.failureCallbackForDelete);
      } else {
        loggerManager.log("#### Cancel delete operation ####");
      }
    } catch (exc) {
      loggerManager.log("#### in catch deleteTravelPlanOnClick" + exc + " ####");
    }
  },
  deleteAlertConfirmation: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : deleteAlertConfirmation ####");
      var msgText = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.deleteTravelPlanAlert"); //delete message
      var basicConfig = {
        message: msgText,
        alertIcon: null,
        alertType: constants.ALERT_TYPE_CONFIRMATION,
        alertTitle: null,
        yesLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
        noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
        alertHandler: this.deleteTravelPlanOnClick
      };
      var pspConfig = {};
      applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  successCallbackForDelete: function(resp) {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : successCallbackForDelete ####");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var toastDetails = {
        "showToast": {
          "type": "success",
          "Message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.deleteTravelPlanSuccess")
        }
      };
      navManager.setCustomInfo("frmManageTravelPlans", toastDetails);
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.fetchTravelPlans();
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  failureCallbackForDelete: function(err) {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : failureCallbackForDelete ####");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      loggerManager.log("error: came to  failureCallbackForDelete: " + JSON.stringify(err));
      if (err["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      var toastDetails = {
        "showToast": {
          "type": "failure",
          "Message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.deleteTravelPlanFailure")
        }
      };
      navManager.setCustomInfo("frmManageTravelPlans", toastDetails);
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.fetchTravelPlans();
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  }
});