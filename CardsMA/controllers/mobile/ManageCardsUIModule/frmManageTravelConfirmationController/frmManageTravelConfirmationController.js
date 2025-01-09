define({
  TravelPlanDetails: {},
  init: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start :" + currentForm + ": init ####");
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  preShow: function() {
    this.setPreShowData();
    this.SetFlowActions();
    this.goBackInfo();
  },
  setPreShowData: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start :" + currentForm + ": init ####");
      this.view.flxMain.isVisible = true;
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.flxHeader.isVisible = false;
      }
      var frmData = navManager.getCustomInfo("frmManageTravelConfirmation");
      loggerManager.log("got Custom Info:" + JSON.stringify(frmData));
      this.TravelPlanDetails = frmData;
      loggerManager.log("entry frmManageTravelDetailsController data: " + this.TravelPlanDetails);
      this.view.lblFromDate.text = this.TravelPlanDetails.startDate.toString();
      this.view.lblToDate.text = this.TravelPlanDetails.endDate.toString();
      this.view.lblContactPhoneNumberValue.text = this.TravelPlanDetails.contactNumber.toString();
      if (!kony.sdk.isNullOrUndefined(this.TravelPlanDetails.additionalNotes)) {
        this.view.txtAreaReply.text = this.TravelPlanDetails.additionalNotes.toString();
      } else
        this.view.txtAreaReply.text = "";
	  this.view.customHeader.flxSearch.isVisible = false;
      this.setTravelDestinationSegData();
      this.setSelectedCardsSegData();
      this.view.forceLayout();
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  SetFlowActions: function() {
    var scope = this;
    this.view.customHeader.flxBack.onClick = this.backOnClick;
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.btnConfirm.onClick = this.confirmOnClick;
  },
  goBackInfo: function(){
      var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### goBackInfo #### for form: " + currentForm);
          	navManager.setCustomInfo("frmManageTravelPhoneNumber", {
              "option": "add",
              "data": this.TravelPlanDetails
            });
        } catch (exc) {
          loggerManager.log("#### in catch " + JSON.stringify(exc) + " ####");
        }
    },
  backOnClick: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start :" + currentForm + ": init ####");
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
      loggerManager.log("#### start :" + currentForm + ": init ####");
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelPlans");
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  setTravelDestinationSegData: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start :" + currentForm + ": init ####");
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
      loggerManager.log("#### in catch " + exc + " ####");
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
  confirmOnClick: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### confirmOnClick #### for form: " + currentForm);
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      applicationManager.getPresentationUtility().showLoadingScreen();
      this.TravelPlanDetails.additionalNotes = this.view.txtAreaReply.text;
      manageCardsModule.presentationController.createNewTravelPlan(this.TravelPlanDetails, this.successCallbackForCreate, this.failureCallbackForCreate);
    } catch (exc) {
      loggerManager.log("#### in catch " + JSON.stringify(exc) + " ####");
    }
  },
  successCallbackForCreate: function(resp) {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start :" + currentForm + ": init ####");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var toastDetails = {
        "showToast": {
          "type": "success",
          "Message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.createTravelPlanSuccess")
        }
      };
      navManager.setCustomInfo("frmManageTravelPlans", toastDetails);
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.fetchTravelPlans();
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  failureCallbackForCreate: function(err) {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start :" + currentForm + ": init ####");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      loggerManager.log("error: came to  failureCallbackForUpdate: " + JSON.stringify(err));
      if (err["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      var toastDetails = {
        "showToast": {
          "type": "failure",
          "Message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.createTravelPlanFailure")
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