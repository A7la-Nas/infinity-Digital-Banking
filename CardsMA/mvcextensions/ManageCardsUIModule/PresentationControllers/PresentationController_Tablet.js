define([], function() {
	function ManageCards_PresentationController() {
		scope_ManageCards_Pres = this;
		/**   numberOfAsyncForCards
          *  1.getAllCountries
          *  2.getAllRegions
          *  3.getAllCities
            */
		scope_ManageCards_Pres.numberOfAsyncForCards=3;
		kony.mvc.Presentation.BasePresenter.call(this);
	}
	inheritsFrom(ManageCards_PresentationController, kony.mvc.Presentation.BasePresenter);
	ManageCards_PresentationController.prototype.initializePresentationController = function() {
	};
	ManageCards_PresentationController.prototype.showCardsHome = function() {
		var navManager = applicationManager.getNavigationManager();
		var frmData = {
			"isMainScreen": true
		};
		navManager.setCustomInfo("frmCardManageHome",frmData);
		navManager.navigateTo("frmCardManageHome");
	};
	ManageCards_PresentationController.prototype.getCardsList = function() {
		var manageCards = applicationManager.getCardsManager();
		manageCards.fetchCardsList(this.getCardsListSuccess,this.getCardsListFailure);
	};
  	ManageCards_PresentationController.prototype.getCardsListSuccess = function(successResponse){
      var formController = applicationManager.getPresentationUtility().getController('frmCardManageHome',true);
      formController.cardsFetchSuccess(successResponse);
    };
  	ManageCards_PresentationController.prototype.getCardsListFailure = function(errorResponse){
      var formController = applicationManager.getPresentationUtility().getController('frmCardManageHome',true);
      formController.cardsFetchFailure(errorResponse);
    };
    /**
       * method used to perform respective service calls
       * @param {Object} params - contains the card data
       * @param {String} action - contains the action to be performed.
       */
      ManageCards_PresentationController.prototype.updateCardBasedOnAction = function(params, action) {
        if(params.MFAAttributes){
          params.MFAAttributes.serviceName = "SERVICE_ID_40";
        }
        else{
			params.MFAAttributes = {
                serviceName: "SERVICE_ID_40"
            };
        }
        if (action === kony.i18n.getLocalizedString("i18n.CardManagement.LockCard")) {
          this.lockCard(params.card, action);
        } else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.ChangePinCredit")) {
          this.createCardRequest(params, action);
        } else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.ChangePinDebit")) {
          this.changePin(params, action);
        } else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard")) {
          this.unlockCard(params.card, action);
        } else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.ReportCard")) {
          this.reportLost(params, action);
        } else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.ReplaceCard")) {
          this.createCardRequest(params, action);
        }else if (action === kony.i18n.getLocalizedString("i18n.cardsManagement.CancelCard")) {
          this.cancelCard(params, action);
        }
    };
  /**
 * Issues a command to lock the given card and then presents the user interface.
     * @param {Object, String} - Card object.
     * @param {String} action - contains the action to be performed.
     */
    ManageCards_PresentationController.prototype.lockCard = function(card, action) {
      this.card = card;
      this.action = action;
      var params = {
        "cardId" : card.cardId,
        "MFAAttributes" : card.MFAAttributes
      }
        applicationManager.getCardsManager().lockCard(params,this.updateCardDataSuccess,this.updateCardDataFailure);
    };
    /**
     * Issues a command to Un-lock the given card and then presents the user interface.
     * @param {Object, String} - Card object.
     * @param {String} action - contains the action to be performed.
     */
    ManageCards_PresentationController.prototype.unlockCard = function(card, action) {
      this.card = card;
      this.action = action;
       var params = {
            "cardId": card.cardId,
            "MFAAttributes":card.MFAAttributes
        };
        applicationManager.getCardsManager().unLockCard(params,this.updateCardDataSuccess,this.updateCardDataFailure);
    };
    /**
     * Method used to change pin for the card.
     * @param {Object} card - contains card object
     * @param {String} action - contains the action to be - change pin.
     */
    ManageCards_PresentationController.prototype.changePin = function(params, action) {
      this.card = params.card;
      this.action = action;
        applicationManager.getCardsManager().changePin({
            cardId: params.card.cardId,
            Reason: params.reason,
            notes: params.notes,
            newPin:params.newPin
        },this.updateCardDataSuccess,this.updateCardDataFailure);
    };
    /**
     * reportLost - Issues a command to report a lost card and then presents the user interface.
     * @param {Object} card - contains card object
     * @param {String} action - contains the action to be - report lost card.
     */
    ManageCards_PresentationController.prototype.reportLost = function(params, action) {
      this.card = params.card;
      this.action = action;
        applicationManager.getCardsManager().reportLost({
            cardId: params.card.cardId,
            Reason: params.Reason,
            notes: params.notes,
          "MFAAttributes":params.card.MFAAttributes
        },this.updateCardDataSuccess,this.updateCardDataFailure);
    };
    ManageCards_PresentationController.prototype.cancelCard = function(params,action){
      this.card = params.card;
      this.action = action;
        applicationManager.getCardsManager().updateCardStatus({
            cardId: params.card.cardId,
            Reason: params.Reason,
            notes: params.notes,
            Action : 'Cancel',
           "MFAAttributes":params.MFAAttributes
        },this.updateCardDataSuccess,this.updateCardDataFailure);
    };
    /**
  * Method used to create a card request.
  * @param {Object} params - contains the pin.
    * @param {String} action - contains the action to be performed.
  */
    ManageCards_PresentationController.prototype.createCardRequest = function(params, action) {
        applicationManager.getCardsManager().createCardRequest(params,this.updateCardDataSuccess,this.updateCardDataFailure);
    };
	ManageCards_PresentationController.prototype.updateCardData = function(inputParams) {
		var manageCards = applicationManager.getCardsManager();
      	if(inputParams.MFAAttributes){
          inputParams.MFAAttributes.serviceName = "SERVICE_ID_40";
        }
        else{
			inputParams.MFAAttributes = {
                serviceName: "SERVICE_ID_40"
            };
        }
      	applicationManager.getMFAManager().setServiceId("SERVICE_ID_40");
		manageCards.updateCardStatus(inputParams,this.updateCardDataSuccess,this.updateCardDataFailure);
	};
  	ManageCards_PresentationController.prototype.updateCardDataSuccess = function(successRes){
      if(successRes.MFAAttributes && successRes.MFAAttributes.isMFARequired == "true"){
        var mfaJSON = {
          "flowType" : "MANAGECARDS",
          "response" : successRes
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      }
      else{
       try {
            this.getCardsList();
        } catch (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
      }
    };
  	ManageCards_PresentationController.prototype.updateCardDataFailure = function(errorRes){
      try {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (response["isServerUnreachable"])
                applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorRes);
            else {
              	var formController = applicationManager.getPresentationUtility().getController('frmCardManageHome',true);
                applicationManager.getDataProcessorUtility().showToastMessageError(formController, kony.i18n.getLocalizedString("kony.mb.cardManage.failLockUnlock"));
            }
        } catch (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    };
	ManageCards_PresentationController.prototype.dismissLoadingScreen = function(error) {
		applicationManager.getPresentationUtility().dismissLoadingScreen();
	};
	ManageCards_PresentationController.prototype.getTravelPlansList = function(successCallback, failureCallback) {
		var manageCards = applicationManager.getCardsManager();
		var userManager = applicationManager.getUserPreferencesManager();
		var usernameToQuery = userManager.getUserName();
		kony.print("ManageCards Presentation Controller: usernameToQuery: "+usernameToQuery);
		manageCards.fetchTravelPlansList(usernameToQuery, successCallback,failureCallback);
		//applicationManager.getPresentationUtility().dismissLoadingScreen();
	};
/**
   * @function
   * Fetch Travel Plans to display.
   */
	ManageCards_PresentationController.prototype.fetchTravelPlans = function() {
		applicationManager.getPresentationUtility().showLoadingScreen();
		scope_ManageCards_Pres.getTravelPlansList(this.plansFetchSuccess.bind(this), this.plansFetchFailure.bind(this));
	};
	ManageCards_PresentationController.prototype.plansFetchSuccess = function(response) {
			var navManager = applicationManager.getNavigationManager();
      		var custInfo = navManager.getCustomInfo("frmManageTravelPlans");
      		var finalResp = {};
      		if (!kony.sdk.isNullOrUndefined(custInfo) && !kony.sdk.isEmptyObject(custInfo)&&
                !kony.sdk.isNullOrUndefined(custInfo.showToast) && !kony.sdk.isEmptyObject(custInfo.showToast)) {
      			finalResp = {"response":response,"showToast":custInfo.showToast};
            }else{
              finalResp = {"response":response};
            }
      		kony.print("finalresp "+ JSON.stringify(finalResp));
      		kony.print("resp "+ JSON.stringify(response));
      		navManager.setCustomInfo("frmManageTravelPlans",finalResp);
            navManager.navigateTo("frmManageTravelPlans");
	};
	ManageCards_PresentationController.prototype.plansFetchFailure = function(response) {
        var navManager = applicationManager.getNavigationManager();
		applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(response["isServerUnreachable"])
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
        navManager.navigateTo("frmManageTravelPlans");
	};
	ManageCards_PresentationController.prototype.getDestinationList = function() {
		scope_ManageCards_Pres.asyncManager.initiateAsyncProcess(scope_ManageCards_Pres.numberOfAsyncForCards);
		var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
		manageCardsModule.presentationController.getCountriesList(scope_ManageCards_Pres.fetchCountrySuccess, scope_ManageCards_Pres.fetchCountryFailure);
		manageCardsModule.presentationController.getStatesList(scope_ManageCards_Pres.fetchStatesSuccess, scope_ManageCards_Pres.fetchStatesFailure);
		manageCardsModule.presentationController.getCitiesList(scope_ManageCards_Pres.fetchCitiesSuccess, scope_ManageCards_Pres.fetchCitiesFailure);
		//      }
		//      else{
		//        var navManager = applicationManager.getNavigationManager();
		//        navManager.setCustomInfo("frmManageTravelDestination",{"locationData":locationData});
		//        navManager.navigateTo("frmManageTravelDestination");
		//      }
	};
	ManageCards_PresentationController.prototype.getCountriesList = function(successCallback, failureCallback) {
		var manageCards = applicationManager.getCardsManager();
		manageCards.fetchAllCountries(successCallback,failureCallback);
	};
	ManageCards_PresentationController.prototype.getStatesList = function(successCallback, failureCallback) {
		var manageCards = applicationManager.getCardsManager();
		manageCards.fetchAllStates(successCallback,failureCallback);
	};
	ManageCards_PresentationController.prototype.getCitiesList = function(successCallback, failureCallback) {
		var manageCards = applicationManager.getCardsManager();
		manageCards.fetchAllCities(successCallback,failureCallback);
	};
	ManageCards_PresentationController.prototype.fetchCountrySuccess = function(response){
		scope_ManageCards_Pres.asyncManager.setSuccessStatus(0, response);
		kony.print("ManageCards Presentation Controller Countries: "+JSON.stringify(response.records));
		if (scope_ManageCards_Pres.asyncManager.areAllservicesDone(scope_ManageCards_Pres.numberOfAsyncForCards)) {
			scope_ManageCards_Pres.commonFunctionForNavigation("frmManageTravelDestination");
		}
	};
	ManageCards_PresentationController.prototype.fetchCountryFailure = function(response){
		scope_ManageCards_Pres.asyncManager.setErrorStatus(0, response);
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if(response["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
	};
	ManageCards_PresentationController.prototype.fetchStatesSuccess = function(response){
		scope_ManageCards_Pres.asyncManager.setSuccessStatus(1, response);
		kony.print("ManageCards Presentation Controller States: "+JSON.stringify(response.records));
		if (scope_ManageCards_Pres.asyncManager.areAllservicesDone(scope_ManageCards_Pres.numberOfAsyncForCards)) {
			scope_ManageCards_Pres.commonFunctionForNavigation("frmManageTravelDestination");
		}
	};
	ManageCards_PresentationController.prototype.fetchStatesFailure = function(response){
		scope_ManageCards_Pres.asyncManager.setErrorStatus(1, response);
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if(response["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
	};
	ManageCards_PresentationController.prototype.fetchCitiesSuccess = function(response){
		scope_ManageCards_Pres.asyncManager.setSuccessStatus(2, response);
		kony.print("ManageCards Presentation Controller Cities: "+JSON.stringify(response.records));
		if (scope_ManageCards_Pres.asyncManager.areAllservicesDone(scope_ManageCards_Pres.numberOfAsyncForCards)) {
			scope_ManageCards_Pres.commonFunctionForNavigation("frmManageTravelDestination");
		}
	};
	ManageCards_PresentationController.prototype.fetchCitiesFailure = function(response){
		scope_ManageCards_Pres.asyncManager.setErrorStatus(2, response);
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if(response["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
	};
	ManageCards_PresentationController.prototype.updateTravelPlan = function(data,updateTravelPlanSuccess, updateTravelPlanFailure) {
		applicationManager.getPresentationUtility().showLoadingScreen();
		var manageCards = applicationManager.getCardsManager();
		kony.print("ManageCardsModule Going to Business for Updating data:: "+JSON.stringify(data));
		manageCards.updateTravelNotifications(data,updateTravelPlanSuccess,updateTravelPlanFailure);
	};
	ManageCards_PresentationController.prototype.createNewTravelPlan = function(data,createTravelPlanSuccess, createTravelPlanFailure) {
		applicationManager.getPresentationUtility().showLoadingScreen();
		var manageCards = applicationManager.getCardsManager();
		kony.print("ManageCardsModule Going to Business for creating TravelPlan:: "+JSON.stringify(data));
		manageCards.createTravelNotification(data,createTravelPlanSuccess,createTravelPlanFailure);
	};
	ManageCards_PresentationController.prototype.deleteTravelPlan = function(data,deleteTravelPlanSuccess, deleteTravelPlanFailure) {
		applicationManager.getPresentationUtility().showLoadingScreen();
		var manageCards = applicationManager.getCardsManager();
		kony.print("ManageCardsModule Going to Business for deleting TravelPlan:: "+JSON.stringify(data));
		manageCards.deleteTravelNotifications(data.notificationId,deleteTravelPlanSuccess,deleteTravelPlanFailure);
	};
	ManageCards_PresentationController.prototype.commonFunctionForNavigation = function(formName){
		var navManager = applicationManager.getNavigationManager();
		navManager.navigateTo(formName);
	};
	ManageCards_PresentationController.prototype.navigateToTravelDestination = function(){
		applicationManager.getPresentationUtility().showLoadingScreen();
		var cardsMan = applicationManager.getCardsManager();
		var locs = cardsMan.getLocations();
		if(kony.sdk.isNullOrUndefined(locs) || kony.sdk.isEmptyObject(locs)){
			kony.print("Manage Cards Presentation Controller: NavigateToTravelDestination: ifnot Locations:"+JSON.stringify(locs));
			scope_ManageCards_Pres.getDestinationList();
		} else{
			kony.print("Manage Cards Presentation Controller: NavigateToTravelDestination: if Locations:"+JSON.stringify(locs));
			scope_ManageCards_Pres.commonFunctionForNavigation("frmManageTravelDestination");
		}
	};
	return ManageCards_PresentationController;
});