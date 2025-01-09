define( function() {
  function ManageCards_PresentationController() {
    scope_ManageCards_Pres = this;
    /**   numberOfAsyncForCards
          *  1.getAllCountries
          *  2.getAllRegions
          *  3.getAllCities
            */
    scope_ManageCards_Pres.numberOfAsyncForCards=3;
    scope_ManageCards_Pres.cardIndexReset = false;
    scope_ManageCards_Pres.cardView=null;
    scope_ManageCards_Pres.cardType=null;
    scope_ManageCards_Pres.mfaerrflag=false;
    scope_ManageCards_Pres.flowType=null;
    scope_ManageCards_Pres.expiryCardId=[];
    scope_ManageCards_Pres.currentCardDetails=null;
    scope_ManageCards_Pres.ackFlag=false;
    scope_ManageCards_Pres.oldCVV="";
    scope_ManageCards_Pres.activeCardsScenario=false;
	scope_ManageCards_Pres.errorMsg="";
  scope_ManageCards_Pres.isBillingAddressAvailable = true;
	scope_ManageCards_Pres.isReplaceCardScenario=false;
    scope_ManageCards_Pres.isFirstTime = true;
    scope_ManageCards_Pres.reqID="";
    kony.mvc.Presentation.BasePresenter.call(this);    
  //  this.asyncManager = new AsyncManager();
  }
  inheritsFrom(ManageCards_PresentationController, kony.mvc.Presentation.BasePresenter);
  ManageCards_PresentationController.prototype.initializePresentationController = function() {
  };
  ManageCards_PresentationController.prototype.cancelCommon =function()
  {
      var manageCards = applicationManager.getCardsManager();
      manageCards.clearCardObject();
      applicationManager.getPresentationUtility().showLoadingScreen();
    try{
      var navManager = applicationManager.getNavigationManager();
      var frmData = {
        "isMainScreen": false
      };
      navManager.setCustomInfo("frmCardManageHome",frmData);
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "ManageCardsUIModule", "appName" : "CardsMA"});
      manageCardsModule.presentationController.showCardsHome();
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }
  };
    ManageCards_PresentationController.prototype.showCardsHome = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var manageCards = applicationManager.getCardsManager();
      manageCards.fetchCardsList(scope_ManageCards_Pres.cardsFetchSuccess.bind(this), scope_ManageCards_Pres.cardsFetchFailure.bind(this));
    };
           ManageCards_PresentationController.prototype.cardsFetchSuccess = function(response) {
        var issuedCards=[];
        var flag=false;
        var actresponse = response;
      var navManager = applicationManager.getNavigationManager();
      var frmData = navManager.getCustomInfo("frmCardManageHome");
       for(var i=0;i<response.length;i++)
       {
         flag=false;
         if(response[i]["cardStatus"]==="Expired" || response[i]["cardStatus"]==="Issued")
         {
           if(response[i]["cardStatus"]==="Issued")
           {
             for(var j=0;j<response.length;j++)
             {
               if(i!==j&&(response[i]["maskedCardNumber"]=== response[j]["maskedCardNumber"]))
               {
                var cardId=response[j]["cardId"];
                 if(response[j]["isExpiring"]=="1")
                   {
                 scope_ManageCards_Pres.expiryCardId.push(cardId);
                   }
                  var id = actresponse.findIndex(x => x.cardId === response[i].cardId);
                 actresponse.splice(id, 1);
                 flag=true;
                 break;
               }
             
             }
             if(flag===false)
             {
               issuedCards.push(response[i]);
                 var id = actresponse.findIndex(x => x.cardId === response[i].cardId);
                 actresponse.splice(id, 1);
             }
           }
           else 
           {
           var id = actresponse.findIndex(x => x.cardId === response[i].cardId);
                 actresponse.splice(id, 1);
           }
         }
         }
      if (issuedCards.length > 0) {
            response = issuedCards.concat(actresponse);
        }
        else
        {
            response=actresponse;
        }
      var newFrmData = {
          "isMainScreen": true,
          "response":response
      };
	       var manageCards = applicationManager.getCardsManager();
           manageCards.setCards(response);
          
	   if(scope_ManageCards_Pres.cardView==="PinChange")
        {
          newFrmData.pinChange="pinChange";
          scope_ManageCards_Pres.cardView="";
        }
      if(!kony.sdk.isNullOrUndefined(frmData) && !kony.sdk.isNullOrUndefined(frmData.isMainScreen))
      {
          newFrmData.isMainScreen = frmData.isMainScreen;
      }
	    if (!kony.sdk.isNullOrUndefined(frmData) ) {
            newFrmData.reqID = frmData.reqID;
        }
      navManager.setCustomInfo("frmCardManageHome", newFrmData);
     
        if (kony.application.getCurrentForm().id != "frmCardManageHome") {
    navManager.navigateTo({"appName" : "CardsMA", "friendlyName" : "frmCardManageHome" });
          
         }
      else
        {
          var controller = _kony.mvc.GetController('frmCardManageHome', true);
          controller.postShow();
        }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
      ManageCards_PresentationController.prototype.cardsFetchFailure = function(response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardsFetchFailure ####");
        if(response["isServerUnreachable"])
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
        else{
          var controller = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
          applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.errorFetchCards"));
        }
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    };
  ManageCards_PresentationController.prototype.getTermsandConditions = function(){
     var config = applicationManager.getConfigurationManager();
    var locale=config.getLocale();
    var termsAndCondition=config.getTermsAndConditions();
    if(scope_ManageCards_Pres.flowType==="LOCK_CARD")
     var param={
     "languageCode": termsAndCondition[locale],
      "termsAndConditionsCode": "LockCard_TnC"
     };
    else
      var param={
     "languageCode": termsAndCondition[locale],
      "termsAndConditionsCode": "CancelCard_TnC"
     };
    var termsAndConditions = applicationManager.getTermsAndConditionsManager();
    termsAndConditions.fetchTermsAndConditionsPostLogin(param,scope_ManageCards_Pres.getTermsandConditionsSuccessCallBack,scope_ManageCards_Pres.getTermsandConditionsErrorCallback);
  };
   ManageCards_PresentationController.prototype.getTermsandConditionsSuccessCallBack = function(response){
    var navManager = applicationManager.getNavigationManager();
    if(scope_ManageCards_Pres.flowType==="LOCK_CARD")
       navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"LockCard","contentTypeID":response.contentTypeId});
    else
       navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"CancelCard","contentTypeID":response.contentTypeId});
    navManager.navigateTo({"appName" : "AuthenticationMA", "friendlyName" : "frmTermsAndCondition" });
   };
  ManageCards_PresentationController.prototype.getTermsandConditionsErrorCallback = function(err){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
		 if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
   	 }else{
              var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
            var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
            controller.bindViewError(errorMsg);
        }
   };
   ManageCards_PresentationController.prototype.LockCard = function(){
    var manageCards = applicationManager.getCardsManager();
    manageCards.lockCard(scope_ManageCards_Pres.inputParams,scope_ManageCards_Pres.updateCardDataSuccessCallback,scope_ManageCards_Pres.updateCardDataFailureCallback);
   };
   ManageCards_PresentationController.prototype.CancelCard = function(){
    var manageCards = applicationManager.getCardsManager();
    manageCards.cancelCard(scope_ManageCards_Pres.inputParams,scope_ManageCards_Pres.updateCardDataSuccessCallback,scope_ManageCards_Pres.updateCardDataFailureCallback);
   };
 ManageCards_PresentationController.prototype.updateCardData = function(inputParams) {
    scope_ManageCards_Pres.mfaerrflag=false;
    scope_ManageCards_Pres.cardView=inputParams.Action;
    scope_ManageCards_Pres.cardType=inputParams.cardType;
    var manageCards = applicationManager.getCardsManager();
    switch( scope_ManageCards_Pres.cardView)
    {
      case "PinChange":
        if(scope_ManageCards_Pres.cardType=="Debit")
          {
            scope_ManageCards_Pres.flowType="CHANGE_PIN_DEBIT";
        manageCards.changePin(inputParams,scope_ManageCards_Pres.updateCardDataSuccessCallback,scope_ManageCards_Pres.updateCardDataFailureCallback);
          }
        else
          {
		inputParams.Channel="Mobile Native";
        scope_ManageCards_Pres.flowType="CHANGE_PIN_CREDIT";
        manageCards.createCardRequest(inputParams,scope_ManageCards_Pres.updateCardDataSuccessCallback,scope_ManageCards_Pres.updateCardDataFailureCallback);
          }
        break;
      case "Replace":    scope_ManageCards_Pres.flowType="REPLACE_CARD";
        manageCards.replaceCard(inputParams,scope_ManageCards_Pres.updateCardDataSuccessCallback,scope_ManageCards_Pres.updateCardDataFailureCallback);
        break;
      case "Report Lost":  scope_ManageCards_Pres.flowType="REPORT_LOST";
        manageCards.reportLost(inputParams,scope_ManageCards_Pres.updateCardDataSuccessCallback,scope_ManageCards_Pres.updateCardDataFailureCallback);
        break;
      case "Cancel":    scope_ManageCards_Pres.flowType="CANCEL_CARD";
                        scope_ManageCards_Pres.inputParams = inputParams;
                        scope_ManageCards_Pres.getTermsandConditions();
                        break;
      case "Lock":      scope_ManageCards_Pres.flowType="LOCK_CARD";
                        //scope_ManageCards_Pres.inputParams = inputParams;
                        //scope_ManageCards_Pres.getTermsandConditions();
         manageCards.lockCard(inputParams,scope_ManageCards_Pres.updateCardDataSuccessCallback,scope_ManageCards_Pres.updateCardDataFailureCallback);
                        break;
                        
      case "Unlock":   scope_ManageCards_Pres.flowType="UNLOCK_CARD";
        manageCards.unLockCard(inputParams,scope_ManageCards_Pres.updateCardDataSuccessCallback,scope_ManageCards_Pres.updateCardDataFailureCallback);
        break;
      case "Activate":   scope_ManageCards_Pres.flowType="UNLOCK_CARD";
        delete inputParams.Reason
        delete inputParams.view
        manageCards.unLockCard(inputParams,scope_ManageCards_Pres.updateCardDataSuccessCallback,scope_ManageCards_Pres.updateCardDataFailureCallback);
        break;
    }
   // manageCards.updateCardStatus(inputParams,scope_ManageCards_Pres.updateCardDataSuccessCallback,scope_ManageCards_Pres.updateCardDataFailureCallback);
  };
  ManageCards_PresentationController.prototype.updateCardDataSuccessCallback=function(res)
  {
    if(res.MFAAttributes && res.MFAAttributes.isMFARequired === "true"){
        scope_ManageCards_Pres.mfaerrflag=true;
      var mfaJSON = {
        "flowType" : scope_ManageCards_Pres.flowType,
        "response" : res
      };
      switch( scope_ManageCards_Pres.cardView){
        case "PinChange":
          mfaJSON.objectServiceDetails = {
            "serviceName" : "CardManagementServices",
            "dataModel" : "ChangePIN",
            "operationName" : (scope_ManageCards_Pres.cardType === "Debit") ? "createRequest" : "updateCreditCardPin"
          };
          mfaJSON.action = (scope_ManageCards_Pres.cardType === "Debit") ? "PinChange" : "";
          break;
        case "Replace":
          mfaJSON.objectServiceDetails = {
            "serviceName" : "CardManagementServices",
            "dataModel" : "ReplaceCard",
            "operationName" : "createRequest"
          };
          mfaJSON.action = "Replace Request";
          break;
        case "Report Lost":
          mfaJSON.objectServiceDetails = {
            "serviceName" : "CardManagementServices",
            "dataModel" : "ReportLost",
            "operationName" : "createRequest"
          };
          mfaJSON.action = "Report Lost";
          break;
        case "Cancel":
          mfaJSON.objectServiceDetails = {
            "serviceName" : "CardManagementServices",
            "dataModel" : "CancelCard",
            "operationName" : "createRequest"
          };
          mfaJSON.action = "Cancel";
          break;
        case "Lock":
          mfaJSON.objectServiceDetails = {
            "serviceName" : "CardManagementServices",
            "dataModel" : "LockCard",
            "operationName" : "createRequest"
          };
          mfaJSON.action = "Lock";
          break;
        case "Activate":
          mfaJSON.objectServiceDetails = {
            "serviceName" : "CardManagementServices",
            "dataModel" : "UnlockCard",
            "operationName" : "createRequest"
          };
          mfaJSON.action = "Activate";
          break;
        default:
          break;
      }
      applicationManager.getMFAManager().initMFAFlow(mfaJSON);
    }
    else {
      if( scope_ManageCards_Pres.cardView==="pinChange")
      {
        var loggerManager = applicationManager.getLoggerManager();
        try {
          loggerManager.log("#### start cardpresentationcontroller : updateCardSuccess ####");
          var navManager = applicationManager.getNavigationManager();
          var nextfrmData = navManager.getCustomInfo("frmCardManageHome");
          nextfrmData.cardData = this.cardData;
		  nextfrmData.reqID=res.orderId;
          navManager.setCustomInfo("frmCardManageHome", nextfrmData);
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule","appName":"CardsMA"});
          manageCardsModule.presentationController.showCardsHome();
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
      }
      else
      {
        try {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          var navManager = applicationManager.getNavigationManager();
		  var nextfrmData = navManager.getCustomInfo("frmCardManageHome");
      nextfrmData.reqID=  res.id || res.orderId;
          navManager.setCustomInfo("frmCardManageHome", nextfrmData);
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule","appName":"CardsMA"});
          manageCardsModule.presentationController.showCardsHome();
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
      }
    }
  };
  ManageCards_PresentationController.prototype.updateCardDataFailureCallback=function(response)
  {
    try{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(response["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
      else{
        var navMan=applicationManager.getNavigationManager();
        switch( scope_ManageCards_Pres.cardView)
        {
          case "PinChange":
            if(scope_ManageCards_Pres.cardType==="Debit")
            {
              if( scope_ManageCards_Pres.mfaerrflag===true)
              {navMan.navigateTo({"appName" : "CardsMA", "friendlyName" : "frmCardMngNewPin"});}
              var controller = applicationManager.getPresentationUtility().getController('frmCardMngNewPin', true);
              applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("i18n.common.errorCodes.10118"));
            }
            else
            {
              if( scope_ManageCards_Pres.mfaerrflag===true)
              {navMan.navigateTo({"appName" : "CardsMA", "friendlyName" : "frmCardMngPinChgOptions"});}
              kony.ui.Alert("Something went wrong - card request");
              var controller = applicationManager.getPresentationUtility().getController('frmCardMngPinChgOptions', true);
              applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("i18n.common.errorCodes.10118"));
            }
            break;
          case "Replace":
            if( scope_ManageCards_Pres.mfaerrflag===true)
            {navMan.navigateTo({"appName" : "CardsMA", "friendlyName" : "frmCardMngReplaceCardConfirm"}); }
            var controller = applicationManager.getPresentationUtility().getController('frmCardMngReplaceCardConfirm', true);
            applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failUpdateCard"));
            break;
          case "Report Lost":
            if( scope_ManageCards_Pres.mfaerrflag===true)
            {navMan.navigateTo({"appName" : "CardsMA", "friendlyName" : "frmCardMngReplaceCardConfirm"});}
            var controller = applicationManager.getPresentationUtility().getController('frmCardMngConfirmDetails', true);
            applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failUpdateCard"));
            break;
          case "Cancel":
            if( scope_ManageCards_Pres.mfaerrflag===true)
            {navMan.navigateTo({"appName" : "CardsMA", "friendlyName" : "frmCardMngConfirmDetails"});}
            var controller = applicationManager.getPresentationUtility().getController('frmCardMngConfirmDetails', true);
            applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failUpdateCard"));
            break;
          case "Lock":
            if( scope_ManageCards_Pres.mfaerrflag===true)
            {navMan.navigateTo({"appName" : "CardsMA", "friendlyName" : "frmCardManageHome"});}
            var controller = applicationManager.getPresentationUtility().getController('frmCardManageHome', true);
            applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failLockUnlock"));
            break;
          case "Activate":
            if( scope_ManageCards_Pres.mfaerrflag===true)
            {navMan.navigateTo({"appName" : "CardsMA", "friendlyName" : "frmCardManageHome"});}
            var controller = applicationManager.getPresentationUtility().getController('frmCardManageHome', true);
            applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failLockUnlock"));
            break;
          case "Unlock":
            if( scope_ManageCards_Pres.mfaerrflag===true)
            {navMan.navigateTo({"appName" : "CardsMA", "friendlyName" : "frmCardManageHome"}); }
            var controller = applicationManager.getPresentationUtility().getController('frmCardManageHome', true);
            applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failLockUnlock"));
            break;
        }
     }
    }
    catch(err) {
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
// 		scope_ManageCards_Pres.asyncManager.setErrorStatus(0, response);
        var navManager = applicationManager.getNavigationManager();
		applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(response["isServerUnreachable"])
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
        navManager.navigateTo("frmManageTravelPlans");
  };
  ManageCards_PresentationController.prototype.getTransactionsForCard = function(cardId,offset)
  {
      var manageCards = applicationManager.getCardsManager();
      var params = {
        "cardId": cardId,
        "offset": offset,
        "limit": 50,
        "order":"DESC"
      };
      manageCards.fetchTransactionsForCard(params,this.getTransactionsForCardSuccess,this.getTransactionsForCardError);
  };
  ManageCards_PresentationController.prototype.getTransactionsForCardSuccess = function(success){
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmCardManageHomeTransactions",success);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var controller = applicationManager.getPresentationUtility().getController('frmCardManageHome', true);
    controller.setSegmentData();
  };
  ManageCards_PresentationController.prototype.getTransactionsForCardError = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
		if(error["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    else{
      var controller = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
      controller.showTransactions(true);
      applicationManager.getDataProcessorUtility().showToastMessageError(controller, "Error in Transactions");
    }
  };
	ManageCards_PresentationController.prototype.getDestinationList = function() {		
	    var asyncManager = applicationManager.getAsyncManager();
        var userPrefManager = applicationManager.getUserPreferencesManager();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(userPrefManager, 'getCountryList'),
                asyncManager.asyncItem(userPrefManager, 'getStatesList'),
                asyncManager.asyncItem(userPrefManager, 'getCityList'),
            ],
            this.fetchAllLocationsSuccess.bind(this)
        );
    };
	ManageCards_PresentationController.prototype.getAllLocationsList = function(successCallback, failureCallback) {
		var manageCards = applicationManager.getCardsManager();
		manageCards.fetchAllLocations(successCallback,failureCallback);
	};
    ManageCards_PresentationController.prototype.fetchAllLocationsSuccess = function(data){
        var city = {};
        var state = {};
        var country = {};
        var  locData = {};
        var locations = [];
        locations.country = data.responses[0].data.records;
        locations.states = data.responses[1].data.records;
        locations.city = data.responses[2].data.records;        
        locData.countries ={};
        locData.states ={};
        locData.cities ={};        
        (locations.country).forEach(
          function(element) {
            country[element.id] = {
              "name": element.Name
            }
          });
        (locations.states).forEach(
            function(element) {
              state[element.id] = {
                "name": element.Name,
                "country_id": element.Country_id
              }
            });
        (locations.city).forEach(
          function(element) {
            city[element.id] = {
              "name": element.Name,
              "state_id": element.Region_id,
              "country_id": element.Country_id
            }
          });
        locData.cities = JSON.parse(JSON.stringify(city));
        locData.states = JSON.parse(JSON.stringify(state));
        locData.countries = JSON.parse(JSON.stringify(country));
        var cardsMan = applicationManager.getCardsManager();
        cardsMan.setLocations(locData);
        scope_ManageCards_Pres.commonFunctionForNavigation("frmManageTravelDestination");
	};
    ManageCards_PresentationController.prototype.fetchAllLocationsFailure = function(response){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if(response["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
	};
	ManageCards_PresentationController.prototype.updateTravelPlan = function(data,updateTravelPlanSuccess, updateTravelPlanFailure) {
		applicationManager.getPresentationUtility().showLoadingScreen();
		var manageCards = applicationManager.getCardsManager();
		var userManager = applicationManager.getUserPreferencesManager();
		var loggedInUserName = userManager.getUserName();
		var cards = [];
		if(typeof(data.cardNumber)=="string"){
			var cardNum = data.cardNumber.split(",");
			cardNum.forEach(
				function(ele){
					cards.push({"name":ele.substring(0,ele.indexOf("*")).trim(),
								"number": ele.substring(ele.indexOf("*"))});
				});
		} else{
			cards = data.cardNumber;
		}
		var travelObject ={
			"request_id":data.notificationId,
			"Destinations": JSON.stringify(data.destinations),
			"Channel_id": "Mobile Native",
			"StartDate": data.startDate,
			"userName": loggedInUserName,
			"additionNotes":data.additionalNotes,
			"EndDate": data.endDate,
			"phonenumber": data.contactNumber,
     // "phoneCountryCode": data.phoneCountryCode,
			"Cards": JSON.stringify(cards)
		};
		manageCards.updateTravelNotifications(travelObject,updateTravelPlanSuccess,updateTravelPlanFailure);
	};
	ManageCards_PresentationController.prototype.createNewTravelPlan = function(data,createTravelPlanSuccess, createTravelPlanFailure) {
		applicationManager.getPresentationUtility().showLoadingScreen();
		var manageCards = applicationManager.getCardsManager();
		kony.print("ManageCardsModule Going to Business for creating TravelPlan:: "+JSON.stringify(data));
		var userManager = applicationManager.getUserPreferencesManager();
		var loggedInUserName = userManager.getUserName();
		kony.print("In Cards Manager: createTravelNotification: "+JSON.stringify(data));
		var cards = [];
		if(typeof(data.cardNumber)=="string"){
			var cardNum = data.cardNumber.split(",");
			cardNum.forEach(
				function(ele){
					cards.push({"name":ele.substring(0,ele.indexOf("*")).trim(),
								"number": ele.substring(ele.indexOf("*"))});
				});
		} else{
			cards = data.cardNumber;
		}
		var travelObject ={
			"Destinations": JSON.stringify(data.destinations),
			"Channel_id": "Mobile Native",
			"StartDate": data.startDate,
			"userName": loggedInUserName,
			"additionNotes":data.additionalNotes,
			"EndDate": data.endDate,
			"phonenumber": data.contactNumber,
			"Cards": JSON.stringify(cards)
		};
		kony.print("CardsManager: createTravelNotification: TransformedObject:  "+JSON.stringify(travelObject));
		manageCards.createTravelNotification(travelObject,createTravelPlanSuccess,createTravelPlanFailure);
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
  ManageCards_PresentationController.prototype.setCardIndexStatus = function(flag)
    {
	    scope_ManageCards_Pres.cardIndexReset = flag;
  };
 ManageCards_PresentationController.prototype.getCardIndexStatus = function()
    {
        return scope_ManageCards_Pres.cardIndexReset;
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
  ManageCards_PresentationController.prototype.activateCards = function(data) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var manageCards = applicationManager.getCardsManager();
    kony.print("ManageCardsModule Going to Business for activate Cards:: "+JSON.stringify(data));
    manageCards.activateCards(data,scope_ManageCards_Pres.activateCardsSuccess,scope_ManageCards_Pres.activateCardsFailure);
  };
 ManageCards_PresentationController.prototype.activateCardsSuccess = function(res)
  {
      if(res.MFAAttributes && res.MFAAttributes.isMFARequired === "true"){
        scope_ManageCards_Pres.mfaerrflag=true;
      var mfaJSON = {
        "flowType" : "ACTIVATE_CARD",
        "response" : res
      };
      mfaJSON.objectServiceDetails = {
        "serviceName" : "CardManagementServices",
        "dataModel" : "ActivateCard",
        "operationName" : "createRequest"
      };
      applicationManager.getMFAManager().initMFAFlow(mfaJSON);
    }
    else
      {
    scope_ManageCards_Pres.ackFlag=true;
    scope_ManageCards_Pres.reqID=res.orderId;
        // scope_ManageCards_Pres.isReplaceCardScenario=false;
    scope_ManageCards_Pres.commonFunctionForNavigation({"appName" : "CardsMA", "friendlyName" : "frmCardManageAck"}); 
      }
  };
  ManageCards_PresentationController.prototype.activateCardsFailure = function(err)
  {
    scope_ManageCards_Pres.ackFlag=false;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]) 
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  
        if(typeof err.errorMessage == "object" && err.errorMessage.errorMessage)
            scope_ManageCards_Pres.errorMsg = err.errorMessage.errorMessage;
        else
        scope_ManageCards_Pres.errorMsg = err.errorMessage;
        if ((err.serverErrorRes && err.serverErrorRes.dbpErrCode) && err.serverErrorRes.dbpErrCode == "21016") 
      {
        if(scope_ManageCards_Pres.isReplaceCardScenario===true)
          {
            var controller = applicationManager.getPresentationUtility().getController('frmCardManageOldCVV', true);
             controller.setFormUI(scope_ManageCards_Pres.errorMsg);
            scope_ManageCards_Pres.commonFunctionForNavigation({"appName" : "CardsMA", "friendlyName" :"frmCardManageOldCVV"}); 
            scope_ManageCards_Pres.isReplaceCardScenario=false;
          }
        else
          {
             var controller = applicationManager.getPresentationUtility().getController('frmCardManageNewCVV', true);
             controller.setFormUI(scope_ManageCards_Pres.errorMsg);
             scope_ManageCards_Pres.commonFunctionForNavigation({"appName" : "CardsMA", "friendlyName" :"frmCardManageNewCVV"}); 
          }
	  }
		    else
      {
    scope_ManageCards_Pres.commonFunctionForNavigation({"appName" : "CardsMA", "friendlyName" :"frmCardManageAck"}); 
      }
     
  };
	 ManageCards_PresentationController.prototype.fetchCardTransactions = function(cardNo){	
		var cardsMan = applicationManager.getCardsManager();
        var  params={
           cardNo: cardNo
          };
        cardsMan.fetchCardTransactions(params, scope_ManageCards_Pres.fetchAccountPosDetailTranPresSucCallback, scope_ManageCards_Pres.fetchAccountPosDetailTranErrCallback);
  
	};
    ManageCards_PresentationController.prototype.fetchAccountPosDetailTranPresSucCallback = function(resTrans) {
      
    };
    ManageCards_PresentationController.prototype.fetchAccountPosDetailTranErrCallback = function(resTransErr) {
     scope_ManageCards_Pres.asyncManager.setErrorStatus(1, resTransErr);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resTransErr["isServerUnreachable"]) 
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransErr);
    };

    ManageCards_PresentationController.prototype.fetchCardStatements = function(params){	
		var cardsMan = applicationManager.getCardsManager();  
        cardsMan.fetchCardStatements(params, scope_ManageCards_Pres.fetchCardStatemtsSuccess, scope_ManageCards_Pres.fetchCardStatementsFailure);
	};
    ManageCards_PresentationController.prototype.fetchCardStatemtsSuccess = function(res) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
		  if(res.length==0)
        {
            var controller = applicationManager.getPresentationUtility().getController('frmCardStatements', true);
            var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.noStatementMsg");
            controller.bindGenericError(errorMsg);
        }
        else
		{
        kony.application.openURL(res[0].statementLink);
		}
    };
    ManageCards_PresentationController.prototype.fetchCardStatementsFailure = function(resTransErr) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resTransErr["isServerUnreachable"]) 
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransErr);
    };

    ManageCards_PresentationController.prototype.navigateToCardstatements = function(card_id,cardNumber) {
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmCardStatements", carddetails={"card_id": card_id,"maskedCardNumber":cardNumber});
      navMan.navigateTo("frmCardStatements");
     };
  
  ManageCards_PresentationController.prototype.navigateToSetPurchaseCardLimit = function(cardLimitDetails) {
    var navMan = applicationManager.getNavigationManager();

    navMan.setCustomInfo("frmSetPurchaseCardLimit", cardLimitDetails);
    navMan.navigateTo("frmSetPurchaseCardLimit");
  };

  ManageCards_PresentationController.prototype.updatePurchaseLimit = function(inputParams) {

    scope_ManageCards_Pres.cardView=inputParams.Action;
    this.currentCardDetails.purchaseLimit = inputParams.purchaseLimit;
    var manageCards = applicationManager.getCardsManager();
    manageCards.updatePurchaseLimit(inputParams,scope_ManageCards_Pres.updateCardLimitsSuccessCallback.bind(this),scope_ManageCards_Pres.updateCardLimitsFailureCallback.bind(this));

  };

  ManageCards_PresentationController.prototype.navigateToSetWithdrawalCardLimit = function(cardLimitDetails) {
    var navMan = applicationManager.getNavigationManager();

    navMan.setCustomInfo("frmSetWithdrawalCardLimit", cardLimitDetails);
    navMan.navigateTo("frmSetWithdrawalCardLimit");
  };

  ManageCards_PresentationController.prototype.updateWithdrawalLimit = function(inputParams) {
    scope_ManageCards_Pres.cardView=inputParams.Action;
    this.currentCardDetails.withdrawlLimit = inputParams.withdrawalLimit;
    var manageCards = applicationManager.getCardsManager();
    manageCards.updateWithdrawalLimit(inputParams,scope_ManageCards_Pres.updateCardLimitsSuccessCallback.bind(this),scope_ManageCards_Pres.updateCardLimitsFailureCallback.bind(this));
  };

  ManageCards_PresentationController.prototype.updateCardLimitsSuccessCallback = function (res) {
    if (res.MFAAttributes && res.MFAAttributes.isMFARequired === "true") {
      let mfaJSON = {
        "flowType" : scope_ManageCards_Pres.flowType,
        "response" : res
      };
      switch( scope_ManageCards_Pres.cardView){
        case "updatePurchaseLimit":
          mfaJSON.objectServiceDetails = {
            "serviceName" : "CardManagementServices",
            "dataModel" : "PurchaseLimit",
            "operationName" : "updateLimit"
          };
          mfaJSON.action = "updatePurchaseLimit";
          break;
        case "updateWithdrawalLimit":
          mfaJSON.objectServiceDetails = {
            "serviceName" : "CardManagementServices",
            "dataModel" : "WithdrawalLimit",
            "operationName" : "updateLimit"
          };
          mfaJSON.action = "updateWithdrawalLimit";
          break;
        default:
          break;
      }
      applicationManager.getMFAManager().initMFAFlow(mfaJSON);
    } else {
      var cardDetails = {
        "cardId": this.currentCardDetails.cardId,
        "currencyCode": this.currentCardDetails.currencyCode,
        "requestId": res.orderId
      };
      if (scope_ManageCards_Pres.cardView === "updatePurchaseLimit") {
        cardDetails.newLimit = this.currentCardDetails.purchaseLimit;
        cardDetails.view = "purchase";
      }
      if (scope_ManageCards_Pres.cardView === "updateWithdrawalLimit") {
        cardDetails.newLimit = this.currentCardDetails.withdrawlLimit;
        cardDetails.view = "withdrawal";
      }
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmSetCardLimitConfirmation", cardDetails);
      navMan.navigateTo("ManageCardsUIModule/frmSetCardLimitConfirmation");
    }
  };

  ManageCards_PresentationController.prototype.updateCardLimitsFailureCallback=function(response)
  {
    try{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(response["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
      else{
        var navMan=applicationManager.getNavigationManager();
        var controller = applicationManager.getPresentationUtility().getController('frmSetCardLimitConfirmation', true);
        applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failUpdateCard"));
      }
    }
    catch(err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }
  };
  
     ManageCards_PresentationController.prototype.navigateToNewCardFlow = function()
    {
        var accountManager = applicationManager.getAccountManager();
        accountManager.fetchInternalAccounts(scope_ManageCards_Pres.fetchAccountsSuccess, scope_ManageCards_Pres.fetchAccountsError);
       
    };
    ManageCards_PresentationController.prototype.fetchAccountsSuccess = function(resInp)
    {
      var filterList = function (input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
          return filteredAccountData;
        } catch(err){
          return input;
        }
      };
      //var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
        var cardsMan = applicationManager.getCardsManager();
        var accounts = cardsMan.fetchAccountsForNewcard();
        var savingAcc = scope_ManageCards_Pres.processAccountsData(filterList(accounts[1]));
        var checkingAcc = scope_ManageCards_Pres.processAccountsData(filterList(accounts[0]));
        var processedAcc= [];
        processedAcc.push(checkingAcc);
        processedAcc.push(savingAcc);
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmManageNewCardAccounts",processedAcc);
        navMan.navigateTo({"appName" : "CardsMA", "friendlyName" : "frmManageNewCardAccounts"});
    };
     ManageCards_PresentationController.prototype.fetchAccountsError = function(error)
    {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
          if (error["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
          else kony.print("error in getAccounts");
    };
      ManageCards_PresentationController.prototype.filterCards = function(accountId) {
        
        var cardsManager = applicationManager.getCardsManager();
        cardsManager.fetchCardsList(this.cardFetchFilterSuccess.bind(this,accountId),this.cardFetchFilterError.bind(this,accountId));
    };
    ManageCards_PresentationController.prototype.cardFetchFilterSuccess= function(accountId,response)
    {
        var filteredCards = [];
        if(response.length>0)
        {
         var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmCardManageHome", {
                "isMainScreen": false
            });
        var data = response.filter(acc => acc.accountNumber === accountId);
        filteredCards = data.concat(filteredCards);
        scope_ManageCards_Pres.cardsFetchSuccess(filteredCards);
        }
      else{
         scope_ManageCards_Pres.cardsFetchSuccess(filteredCards);
      }

    }
    ManageCards_PresentationController.prototype.cardFetchFilterError= function(accountId,response)
    {
         applicationManager.getPresentationUtility().dismissLoadingScreen();
          if (error["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
          else kony.print("error in getAccounts");
    };
      ManageCards_PresentationController.prototype.getSelectCardProducts = function(accountData) {
        var cardsManager = applicationManager.getCardsManager();
        var cardObj = applicationManager.getCardsManager();
        var amount = accountData.availableBalance;
        if (isNaN(amount.slice(0, 1))) {
                amount = amount.substring(1);
                }
        amount = applicationManager.getFormatUtilManager().deFormatAmount(amount);
        var currencyCode = accountData.availableBalance.substring(0, 1);
        var accountType = accountData.accountType == "Savings" ? "Savings" : "Checking";
        cardObj.setCardAttribute("accountId", accountData.accountID);
        cardObj.setCardAttribute("currentBalance", amount);
        cardObj.setCardAttribute("availableBalance", amount);
        cardObj.setCardAttribute("currencyCode", currencyCode);
        cardObj.setCardAttribute("bankName", accountData.bankName);
        cardObj.setCardAttribute("accountName",accountData.nickName);
        cardObj.setCardAttribute("accountBalanceType",accountData.accountBalanceType);
        cardObj.setCardAttribute("accountType",accountType);
        
        cardsManager.fetchCardProducts({
            "accountType": accountData.accountType
        }, scope_ManageCards_Pres.fetchCardProductsSuccess, scope_ManageCards_Pres.fetchCardProductsError);
    };

  ManageCards_PresentationController.prototype.fetchCardProductsSuccess=function(res)
   {
               var navMan = applicationManager.getNavigationManager();
               navMan.setCustomInfo("frmManageSelectNewCards",res);
               navMan.navigateTo("frmManageSelectNewCards");
   
   };
   ManageCards_PresentationController.prototype.fetchCardProductsError=function(err)
   {
     applicationManager.getPresentationUtility().dismissLoadingScreen();
          if (error["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
          else kony.print("error in getCardProducts");
   };
      ManageCards_PresentationController.prototype.navigateToLearnMore=function(data1)
    {
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmManageNewCardOverview",data1);
      navMan.navigateTo("frmManageNewCardOverview");
    };
   ManageCards_PresentationController.prototype.navigateToCardName = function(data1) {
        var cardObj = applicationManager.getCardsManager();
        cardObj.setCardAttribute("cardProductName", data1.productName);
        cardObj.setCardAttribute("withdrawlLimit", data1.withdrawlLimit);
        cardObj.setCardAttribute("withdrawalMinLimit", data1.withdrawalMinLimit);
        cardObj.setCardAttribute("withdrawalMaxLimit", data1.withdrawalMaxLimit);
        cardObj.setCardAttribute("withdrawalStepLimit", data1.withdrawalStepLimit);
        cardObj.setCardAttribute("purchaseLimit", data1.purchaseLimit);
        cardObj.setCardAttribute("purchaseMinLimit", data1.purchaseMinLimit);
        cardObj.setCardAttribute("purchaseMaxLimit", data1.purchaseMaxLimit);
       
        
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmManageNewCardName", data1);
        navMan.navigateTo("frmManageNewCardName");
    };
       ManageCards_PresentationController.prototype.applyNewCard = function(pin) {
        var cardObj = applicationManager.getCardsManager();
        var billingAddr= this.getBillingAddress();
        if(billingAddr === ""){
          var navManager = applicationManager.getNavigationManager();
          this.isBillingAddressAvailable = false;
          navManager.navigateTo("frmCardManageHome");
        }else{
          this.isBillingAddressAvailable = true;
        cardObj.setCardAttribute("billingAddress", billingAddr);
        var cardObj = applicationManager.getCardsManager();
        var cardobjIns = cardObj.getCardObject();
          var params = {
           "accountId":cardobjIns.accountId,
           "cardHolderName":cardobjIns.cardHolderName,
           "billingAddress":cardobjIns.billingAddress,
           "cardProductName":cardobjIns.cardProductName,
           "withdrawlLimit":cardobjIns.withdrawlLimit,
           "withdrawalMinLimit":cardobjIns.withdrawalMinLimit,
           "withdrawalMaxLimit":cardobjIns.withdrawalMaxLimit,
           "purchaseLimit":cardobjIns.purchaseLimit,
           "purchaseMinLimit":cardobjIns.purchaseMinLimit,
           "purchaseMaxLimit":cardobjIns.purchaseMaxLimit,
           "currencyCode":cardobjIns.currencyCode,
           "currentBalance":cardobjIns.currentBalance,
           "availableBalance":cardobjIns.availableBalance,
           "pinNumber":cardobjIns.pinNumber,
           "cardDisplayName":cardobjIns.cardDisplayName,
           "AccountType":cardobjIns.accountType
        };

        cardObj.applyNewCard(params, this.applyNewCardSuccess, this.applyNewCardError);
      }
    };
   ManageCards_PresentationController.prototype.getBillingAddress=function()
   {
      
        var userpref = applicationManager.getUserPreferencesManager();
        var address = [];
        if(userpref.getUserObj().Addresses && userpref.getUserObj().Addresses.length!==0){
          if(userpref.getUserObj().Addresses[0].AddressLine1)
              address.push(userpref.getUserObj().Addresses[0].AddressLine1);
          if(userpref.getUserObj().Addresses[0].AddressLine2)
              address.push(userpref.getUserObj().Addresses[0].AddressLine2);
          if(userpref.getUserObj().Addresses[0].CityName)
              address.push(userpref.getUserObj().Addresses[0].CityName);
          if(userpref.getUserObj().Addresses[0].RegionName)
              address.push(userpref.getUserObj().Addresses[0].RegionName);
          if(userpref.getUserObj().Addresses[0].CountryName)
              address.push(userpref.getUserObj().Addresses[0].CountryName);
          if(userpref.getUserObj().Addresses[0].ZipCode)
              address.push(userpref.getUserObj().Addresses[0].ZipCode);
          var addrString = "";
          for (var i = 0; i < address.length; i++) {
                  addrString += address[i] + ",";
          }
          if (addrString.charAt(addrString.length - 1) == ",") addrString = addrString.slice(0, -1);
          return addrString;
          }
        else{
          return "";
        }
     
   }
   
    ManageCards_PresentationController.prototype.applyNewCardSuccess = function(res) {
         if (res.MFAAttributes && res.MFAAttributes.isMFARequired === "true") {
                  scope_ManageCards_Pres.mfaerrflag = true;
                  var mfaJSON = {
                      "flowType": "APPLY_FOR_DEBIT_CARD",
                      "response": res
                  };
                  mfaJSON.objectServiceDetails = {
                    "serviceName" : "CardManagementServices",
                    "dataModel" : "RequestDebitCard",
                    "operationName" : "createRequest"
                  };
                  applicationManager.getMFAManager().initMFAFlow(mfaJSON);
              } else {
                var navMan = applicationManager.getNavigationManager();
                       navMan.setCustomInfo("frmManageNewCardAck", res);
                       navMan.navigateTo({"appName":"CardsMA","friendlyName":"frmManageNewCardAck"});
                       
              }
    };
    ManageCards_PresentationController.prototype.applyNewCardError = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        else 
        {
           var controller = applicationManager.getPresentationUtility().getController('frmManageNewCardConfirmPin', true);
            controller.bindGenericError(error.errorMessage);
        }
    };
    ManageCards_PresentationController.prototype.navigateToConfirm = function(name)
    {
        var cardObj = applicationManager.getCardsManager();
        cardObj.setCardAttribute("cardDisplayName", name);
         cardObj.setCardAttribute("cardHolderName", name);
        var navMan = applicationManager.getNavigationManager();
        var cardobjIns = applicationManager.getCardsManager().getCardObject();
        navMan.setCustomInfo("frmManageNewCardReview", cardobjIns);
        navMan.navigateTo("frmManageNewCardReview");
    };
    ManageCards_PresentationController.prototype.navigateToConfirmPin = function(pin)
    {
        var cardObj = applicationManager.getCardsManager();
         cardObj.setCardAttribute("pinNumber", pin);
        var navMan = applicationManager.getNavigationManager();
        var cardobjIns = applicationManager.getCardsManager().getCardObject();
        navMan.setCustomInfo("frmManageNewCardConfirmPin", cardobjIns);
        navMan.navigateTo("frmManageNewCardConfirmPin");
    };
   
    ManageCards_PresentationController.prototype.processAccountsData = function(data) 
    {
          var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"});
          var accProcessedData = [];
          for (var i = 0; i < data.length; i++) {
              accProcessedData[i] = {};
              accProcessedData[i].accountName = data[i].accountName;
              accProcessedData[i].availableBalance = accountMod.presentationController.getAvailableBalanceCurrencyString(data[i]);
              accProcessedData[i].accountID = data[i].accountID;
              accProcessedData[i].bankName = data[i].bankName;
              accProcessedData[i].accountBalanceType = accountMod.presentationController.getAvailableBalanceType(data[i]);
              accProcessedData[i].accountType = data[i].accountType;
              accProcessedData[i].nickName = data[i].nickName;
              accProcessedData[i].imgBankIcon={
                  "src":"konybanklogo.png",
                  "isVisible":true
              }
          }
          return accProcessedData;
      };
	  
	  /**
   *SamsungPay
  **/
  ManageCards_PresentationController.prototype.createCardDataForSamsungPay = function(cardParams)
  {
    applicationManager.getCardsManager().createCardDataForSamsungPay(cardParams,this.createCardDataForSamsungPaySuccess.bind(this),this.createCardDataForAllPayError.bind(this));
  };
  ManageCards_PresentationController.prototype.createCardDataForSamsungPaySuccess = function(successRespone){
    var wallet = new WalletsIntegration();
    var data = {      
      "cardType" : successRespone.cardType,
      "tokenizationProvider": "Visa",
      "payload":JSON.stringify(successRespone)
    }
    wallet.addCardtoSPayWallet(data,this.addCardSuccess.bind(this),this.addCardError.bind(this));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
   
  /**
   *ApplePay
  **/
  ManageCards_PresentationController.prototype.createCardDataForApplePay = function(cardParams)
  {
    applicationManager.getCardsManager().createCardDataForApplePay(cardParams,this.createCardDataForApplePaySuccess.bind(this),this.createCardDataForAllPayError.bind(this));
  };
  ManageCards_PresentationController.prototype.createCardDataForApplePaySuccess = function(successRespone){     
    var wallet = new WalletsIntegration();    
    wallet.sendEncryptedDataToAppleWallet(successRespone,this.addCardSuccess.bind(this), this.addCardError.bind(this));    
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  
  /**
   *GooglePay
  **/
  ManageCards_PresentationController.prototype.createCardDataForGooglePay = function(cardParams)
  {
    applicationManager.getCardsManager().createCardDataForGooglePay(cardParams,this.createCardDataForGooglePaySuccess.bind(this),this.createCardDataForAllPayError.bind(this));
  };
  ManageCards_PresentationController.prototype.createCardDataForGooglePaySuccess = function(successRespone){ 
    var wallet = new WalletsIntegration();
    var navManager = applicationManager.getNavigationManager();     
    var cardDetails = navManager.getCustomInfo("frmCardManagePay_cardDetails");
    var data = {
    	"tokenizationProvider": "Visa",
    	"networkType": "Visa",
      	"opaquePaymentCard": successRespone.opaquePaymentCard,
      	"displayName": cardDetails.cardHolderName,
        "last4": successRespone.last4,
        "address": "[{\"name\":\"Digital Issuance\",\"line1\":\"12301 Research Boulevard\",\"line2\":\"Research Boulevard\",\"line3\":\"Visa USA\",\"city\":\"Austin\",\"state\":\"TX\",\"countryCode\":\"US\",\"postalCode\":\"78759\"}]",
    };      
    wallet.addCardtoGPayWallet(data,this.addCardSuccess.bind(this),this.addCardError.bind(this));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
 
  ManageCards_PresentationController.prototype.addCardSuccess = function(successRespone){  
    var controller = applicationManager.getPresentationUtility().getController('frmCardManagePay', true); 
    controller.addedToCard(successRespone);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  ManageCards_PresentationController.prototype.addCardError = function(err){  
    var controller = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
    var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.walletaddfailed");
          controller.showErrorPopUp(errorMsg);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  
  ManageCards_PresentationController.prototype.createCardDataForAllPayError = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(error["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        else{
          var controller = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
          controller.showErrorPopUp(error.errorMessage);
        }
  };

      

  ManageCards_PresentationController.prototype.getBillingAddressJson = function(billingAddress){
    var address = billingAddress.split(",");
    address.reverse();
    let billingAddressArray = [];
    let billingAddressJson = {};
    billingAddressJson.postalCode = address[0];
    billingAddressJson.countryCode = "US";
    billingAddressJson.state = "TX";
    billingAddressJson.city = address[2];
    var length = address.length;
    var mid = Math.floor((length-3)/2);
    var i,addressline1="";
    var addressline2="";
    if(address[3]){
      for(i=length-1;i>=3+mid;i--)
        addressline1+=address[i]+",";
      for(i=2+mid;i>=3;i--)
        addressline2+=address[i]+",";
    }
    addressline1=addressline1.slice(0,-1);
     if(kony.sdk.isNullOrUndefined(addressline1))
        addressline1="12301 Research Boulevard";
    addressline2=addressline2.slice(0,-1);
    billingAddressJson.line1 = addressline1;
    billingAddressJson.line2 = addressline2;
    billingAddressArray[0] = billingAddressJson;
    return billingAddressArray;
  };
    ManageCards_PresentationController.prototype.enrollCard = function(cardData) {
       //cardData.billingAddress=JSON.stringify(this.getBillingAddressJson(cardData.billingAddress));
        applicationManager.getCardsManager().enrollCard(cardData, this.enrollCardSuccess.bind(this, cardData.cardHolderName), this.enrollCarderror)
    };
    ManageCards_PresentationController.prototype.enrollCardSuccess = function(name, successRespone) {
        successRespone.cardHolderName = name;
        var wallet = new WalletsIntegration();
        wallet.addCardtoAPayWallet(successRespone, this.addCardSuccess.bind(this), this.addCardError.bind(this));
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    ManageCards_PresentationController.prototype.enrollCarderror = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    }


	return ManageCards_PresentationController;
});
