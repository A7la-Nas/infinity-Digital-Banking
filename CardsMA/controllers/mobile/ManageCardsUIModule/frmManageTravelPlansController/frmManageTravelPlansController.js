define({
	TravelRequests: [],
	TravelRequestsActive: [],
	TravelRequestsExpired: [],
	init: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start "+currentForm+" : init ####");
			applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	preShow: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start "+currentForm+" :: preShow ####");
			this.setPreShowData();
			this.SetFlowActions();
      var finalRsp = navManager.getCustomInfo("frmManageTravelPlans");
      if(kony.sdk.isNullOrUndefined(finalRsp))
      {
        this.TravelRequests = [];
        this.TravelRequestsActive = [];
        this.TravelRequestsExpired = [];
        loggerManager.log("No Travel Plan Data.");
      }
		  else
      {
        var response = finalRsp.response;
        if(kony.sdk.isNullOrUndefined(response.TravelRequests))
        {
          this.TravelRequests = [];
          this.TravelRequestsActive = [];
          this.TravelRequestsExpired = [];
          loggerManager.log("No Travel Plan Data.");
        }
        else
        {
          this.TravelRequests = response.TravelRequests;
          loggerManager.log("Travel Plan Data: " + JSON.stringify(this.TravelRequests));
          this.TravelRequestsActive = this.TravelRequests.filter(function(plan) {
            return plan.status === 'Active';
          });
          this.TravelRequestsExpired = this.TravelRequests.filter(function(plan) {
            return plan.status != 'Active';
          });
          loggerManager.log("Segregated travel plans: Active: " + JSON.stringify(this.TravelRequestsActive) +
                            " Expired:" + JSON.stringify(this.TravelRequestsExpired));
        }
      }
      this.setTravelPlansSegmentData(this.TravelRequestsActive, this.TravelRequestsExpired);
			this.showPopupToast();
    	this.goBackInfo();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	showPopupToast: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start "+currentForm+" : showPopupToast ####");
			var custInfo = navManager.getCustomInfo("frmManageTravelPlans");
			if (!kony.sdk.isNullOrUndefined(custInfo) && !kony.sdk.isEmptyObject(custInfo)) {
				if (custInfo.showToast.type === "success") {
					applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, custInfo.showToast.Message);
					navManager.setCustomInfo("frmManageTravelPlans", {});
				}
				if (custInfo.showToast.type === "failure") {
					applicationManager.getDataProcessorUtility().showToastMessageError(this, custInfo.showToast.Message);
					navManager.setCustomInfo("frmManageTravelPlans", {});
				}
			}
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	setPreShowData: function() {
		if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
			this.view.flxHeader.isVisible = true;
		} else {
			this.view.flxHeader.isVisible = false;
		}
	},
	SetFlowActions: function() {
		var scope = this;
		this.view.customHeader.flxBack.onClick = function() {
			scope.navToManageCardHome();
		};
		this.view.segTravelPlans.onRowClick = function() {
			scope.navToTravelDetails();
		};
		this.view.btnAddTravelPlans.onClick = function() {
			scope.navToTravelStartDate();
		};
	},
	navToTravelDetails: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start "+currentForm+" : navToTravelDetails ####");
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			navManager.setCustomInfo("frmManageTravelDetails", this.view.segTravelPlans.selectedRowItems[0]);
			manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDetails");
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	navToTravelStartDate: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start "+currentForm+" : navToTravelStartDate ####");
			navManager.setCustomInfo("frmManageTravelStartDate", {
				"option": "add",
				"data": {}
			});
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelStartDate");
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
  	goBackInfo: function(){
      	var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start "+currentForm+" : goBackInfo ####");
          	navManager.setCustomInfo("frmCardManageHome", {
				"isMainScreen": false
			});
        } catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
    },
	navToManageCardHome: function() {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start "+currentForm+" : navToManageCardHome ####");
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            manageCardsModule.presentationController.cancelCommon();
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
	setTravelPlansSegmentData: function(TrvReqActv, TrvReqExp) {
		var loggerManager = applicationManager.getLoggerManager();
		try {
			var navManager = applicationManager.getNavigationManager();
			var currentForm = navManager.getCurrentForm();
			loggerManager.log("#### start "+currentForm+" : setTravelPlansSegmentData ####");
			this.view.segTravelPlans.widgetDataMap = {
				lblPlanDescription: "destinations",
				lblFromDate: "startDate",
				lblToDate: "endDate",
				lblSelectedCardsValue: "cardCount",
				lblHeaderTitle: "lblHeaderTitle"
			};
          if (kony.sdk.isEmptyObject(TrvReqActv) && kony.sdk.isEmptyObject(TrvReqExp))
          {
            this.view.segTravelPlans.setVisibility(false);
            this.view.flxNoTransactions.setVisibility(true);
          }
          else
          {
            this.view.segTravelPlans.setVisibility(true);
            this.view.flxNoTransactions.setVisibility(false);
            var segdata = [
				[{
					"lblHeaderTitle": (kony.sdk.isEmptyObject(TrvReqActv))?applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.noActiveTravelPlans"):"Active"
				}, TrvReqActv],
				[{
					"lblHeaderTitle": (kony.sdk.isEmptyObject(TrvReqExp))?applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.noExpiredTravelPlans"):"Expired"
				}, TrvReqExp]
			];
          this.view.segTravelPlans.setData(segdata);
          this.view.forceLayout();
          }
		} catch (exc) {
			loggerManager.log("#### in catch " + exc + " ####");
		}
	},
});