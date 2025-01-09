define({
  cardList: [],
  TravelPlanDetailsRequest: [],
  TravelPlanDetailsUpdate: [],
  navOption: "",
  init: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### Start : " + currentForm + " : init ####");
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
      loggerManager.log("#### Start : " + currentForm + " : preshow ####");
      var custInfo = navManager.getCustomInfo("frmManageTravelSelectCards");
      this.TravelPlanDetailsRequest = custInfo.data;
      this.navOption = custInfo.option;
      loggerManager.log("entered this form with navigation option as: " + this.navOption);
      loggerManager.log("entered this form with this.TravelPlanDetailsRequest: " + JSON.stringify(this.TravelPlanDetailsRequest));
      this.TravelPlanDetailsUpdate = JSON.parse(JSON.stringify(this.TravelPlanDetailsRequest));
      this.setFlowActions();
      this.setPreShowData();
      this.goBackInfo();
      var cardsManager = applicationManager.getCardsManager();
      var tmpCardList = cardsManager.getCards();
      loggerManager.log("tmpCardList in frmManageTravelSelectCards: " + JSON.stringify(tmpCardList));
      /* To check for null or no cards scenario. */
      if (!kony.sdk.isNullOrUndefined(tmpCardList) && tmpCardList.length > 0) {
        loggerManager.log("frmManageTravelSelectCards getCardsList from preSet data: " + JSON.stringify(tmpCardList));
        this.view.segSelectCards.onRowClick = this.cardOnRowClick;
        this.setSegDataForCards(tmpCardList);
      } else {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.getCardsList(this.cardsFetchSuccess.bind(this), this.cardsFetchFailure.bind(this));
      }
      loggerManager.log("frmManageTravelSelectCards getCardsList done");
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
          } else if (this.navOption === "add") {
            navManager.setCustomInfo("frmManageTravelDestination", {
              "option": "add",
              "data": this.TravelPlanDetailsRequest
            });
            //manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDestination");
          }
        } catch (exc) {
          loggerManager.log("#### in catch " + JSON.stringify(exc) + " ####");
        }
  },
  /**
   * @function
   * Determines if atleast one of the destination country entered is same as user's primary address country.
   * if yes returns true; if no returns false.
   * if user doesn't have a primary address returns true. // can be set as per requirement.
   * if there are no destinations set, returns false.
   */
  enableNonInternationalCards: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### Start : " + currentForm + " : enableNonInternationalCards ####");
      var userManager = applicationManager.getUserPreferencesManager();
      var userAddressJSON = userManager.getUserAddress();
      var userCountry = "";
      for (var key in userAddressJSON){
          if(userAddressJSON[key] !== "" && userAddressJSON[key] !== null && userAddressJSON[key] !== undefined){
            userCountry  = userAddressJSON.country;
            break;
          }
      }
      loggerManager.log("frmManageTravelSelectCardsController: UserCountry: " + userCountry + "--");
      if (kony.sdk.isNullOrUndefined(userCountry) || kony.sdk.isEmptyObject(userCountry)) {
        loggerManager.log("frmManageTravelSelectCardsController userCountry is null or empty, returning true.");
        return true;
      }
      var destArray = this.TravelPlanDetailsRequest.destinations;
      loggerManager.log("frmManageTravelSelectCardsController: destArray: " + destArray.length + "::" + destArray);
      for (var count = 0; count < destArray.length; count++) {
        var destination = destArray[count].split(",");
        var destinationCountry = destination[((destination.length) - 1)];
        loggerManager.log("frmManageTravelSelectCardsController: Destination Country: " + destinationCountry);
        if (destinationCountry.trim().toLowerCase() === userCountry.trim().toLowerCase()) {
          return true;
        }
      }
      return false;
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  setPreShowData: function() {
    var loggerManager = applicationManager.getLoggerManager();
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxHeader.isVisible = true;
    } else {
      this.view.flxHeader.isVisible = false;
    }
    this.view.segSelectCards.onRowClick = this.cardOnRowClick;
    this.view.btnContinue.onClick = this.continueOnClick;
    if (this.navOption === "edit") {
      this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.common.save");
    } else if (this.navOption === "add") {
      this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.common.continue");
    }
    loggerManager.log("frmManageTravelSelectCards setPreShowData done");
  },
  setFlowActions: function() {
    var scope = this;
    this.view.customHeader.flxBack.onClick = this.backOnClick;
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.btnContinue.setEnabled(false);
    this.setEmptySegDataAndMessage(kony.i18n.getLocalizedString("kony.mb.cardManage.FetchingCards"));
  },
  backOnClick: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### Start : " + currentForm + " : backOnClick ####");
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
      loggerManager.log("#### Start : " + currentForm + " : cancelOnClick ####");
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      if (this.navOption === "edit") {
        navManager.setCustomInfo("frmManageTravelDetails", this.TravelPlanDetailsRequest);
        manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDetails");
      } else if (this.navOption === "add") {
        manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelPlans");
      }
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  cardsFetchSuccess: function(response) {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      loggerManager.log("#### start frmManageTravelSelectCardsController : cardsFetchSuccess ####");
      loggerManager.log("frmManageTravelSelectCards cardsFetchSuccess entered");
      if (!kony.sdk.isNullOrUndefined(response) && response.length > 0) {
        this.cardList = response;
        loggerManager.log("cardsFetchSuccess in frmManageTravelSelectCardsController: " + JSON.stringify(this.cardList));
        this.view.segSelectCards.onRowClick = this.cardOnRowClick;
        this.setSegDataForCards(this.cardList);
      } else {
        loggerManager.log("frmManageTravelSelectCards cardsFetchSuccess else entered");
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.setEmptySegDataAndMessage(kony.i18n.getLocalizedString("kony.mb.cardManage.NoCards"));
      }
    } catch (exc) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      loggerManager.log("#### in catch " + JSON.stringify(exc) + " ####");
    }
  },
  cardsFetchFailure: function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var loggerManager = applicationManager.getLoggerManager();
    try {
      loggerManager.log("#### start frmManageTravelSelectCardsController : cardsFetchFailure ####");
      if (response["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
      else {
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.cardManage.errorFetchCards"));
      }
    } catch (exc) {
      loggerManager.log("#### in catch " + JSON.stringify(exc) + " ####");
    }
  },
  setSegDataForCards: function(cards) {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      loggerManager.log("frmManageTravelSelectCards setSegDataForCards entered" + JSON.stringify(cards));
      loggerManager.log("frmManageTravelSelectCards setSegDataForCards length" + cards.length);
      var segData = [];
      var nonInternationalCardEnabled = this.enableNonInternationalCards();
      var bankName = applicationManager.getUserPreferencesManager().getBankName();
      var cardsInRequest = [];
      loggerManager.log("entered setSegDataForCards with this.TravelPlanDetailsRequest: " + JSON.stringify(this.TravelPlanDetailsRequest));
      var cardsInRequestTempToCompare = this.TravelPlanDetailsRequest.cardNumber;
      try {
        loggerManager.log("cardsInRequestTempToCompare " + cardsInRequestTempToCompare.length + JSON.stringify(cardsInRequestTempToCompare));
      } catch (e) {
        loggerManager.log("exception in cardsInRequestTempToCompare: " + e);
      }
      if (!kony.sdk.isNullOrUndefined(cardsInRequestTempToCompare)) {
        if (typeof(cardsInRequestTempToCompare) === "string") {
          loggerManager.log("entered type of CardNumnber string : " + cardsInRequestTempToCompare);
          cardsInRequest = this.TravelPlanDetailsRequest.cardNumber.split(",");
        } else {
          loggerManager.log("cardsInRequestTempToCompare seems array: " + cardsInRequestTempToCompare.length + ": " + JSON.stringify(cardsInRequestTempToCompare));
          for (var tmpcard = 0; tmpcard < cardsInRequestTempToCompare.length; tmpcard++) {
            cardsInRequest.push(cardsInRequestTempToCompare[tmpcard].name + " " + cardsInRequestTempToCompare[tmpcard].number);
          }
        }
      }
      loggerManager.log("frmManageTravelSelectCards: CardsInRequest: length: " + cardsInRequest.length + ": " + JSON.stringify(cardsInRequest));
      loggerManager.log("frmManageTravelSelectCards: CardsInRequest: length: " + cardsInRequest.length + ": " + cardsInRequest);
      loggerManager.log("frmManageTravelSelectCards bankName" + bankName);
      loggerManager.log("frmManageTravelSelectCards nonInternationalCardEnabled" + nonInternationalCardEnabled);
      for (var index = 0; index < cards.length; index++) {
        var currCard = cards[index];
        loggerManager.log("frmManageTravelSelectCards forLoop index: " + index + ": " + JSON.stringify(currCard));
        var cardObj = {};
        cardObj.identifier = "";
        cardObj.issuer = "";
        cardObj.accessType = "";
        cardObj.prodName = "";
        cardObj.isActive = true;
        cardObj.imgSrc = {};
        cardObj.imgCard = {};
        kony.print("rishi cardType2 "+currCard.cardType +" trim " + currCard.cardType.trim());
        if(currCard.cardType.trim() === "Debit")
        {
        	cardObj.imgCard.src ="atmcardblack.png";
        }
        else if(currCard.cardType.trim() === "Credit")
        {
        	cardObj.imgCard.src ="atmcardgold.png";
        }
        else
        {
          	cardObj.imgCard.src ="atmcardpetrol.png";
        }
        cardObj.maskedNo = applicationManager.getDataProcessorUtility().maskAccountNumber(currCard.maskedCardNumber);
        if (kony.sdk.isNullOrUndefined(currCard.cardProductName)) {
          cardObj.prodName = currCard.cardType.trim() + " Card ";
        } else {
          cardObj.prodName = currCard.cardProductName.trim();
        }
        cardObj.compareCardInfo = cardObj.prodName + " " + cardObj.maskedNo.trim();
        cardObj.lastFourDigits = currCard.maskedCardNumber.substring(currCard.maskedCardNumber.length - 4, currCard.maskedCardNumber.length).trim();
        var isCurrentCardInternational = ("true" === currCard.isInternational.toLowerCase()) ? true : false;
        cardObj.identifier = cardObj.prodName + "- X" + cardObj.lastFourDigits;
        loggerManager.log("frmManageTravelSelectCards card.identifier : " + cardObj.identifier);
        cardObj.issuer = (kony.sdk.isNullOrUndefined(currCard.serviceProvider)) ? bankName : currCard.serviceProvider;
        loggerManager.log("frmManageTravelSelectCards card.issuer : " + cardObj.issuer);
        cardObj.accessType = (isCurrentCardInternational) ? "International Access" : "Domestic";
        loggerManager.log("frmManageTravelSelectCards card.accessType : " + cardObj.accessType);
        cardObj.isActive = (currCard.cardStatus.trim() === "Active") ? true : false;
        loggerManager.log("frmManageTravelSelectCards card.isActive : " + cardObj.isActive);
        var imgSrcToSet = {};
        imgSrcToSet.src = "remeberme.png";
        imgSrcToSet.isVisible = (cardObj.isActive && (isCurrentCardInternational || nonInternationalCardEnabled)) ? true : false;
        var isCardPresentInRequest = cardsInRequest.includes(cardObj.compareCardInfo);
        if (isCardPresentInRequest) {
          imgSrcToSet.src = "remembermetick.png";
        }
        loggerManager.log("frmManageTravelSelectCards imgSrc for i: " + index + " : " + JSON.stringify(imgSrcToSet));
        cardObj.imgSrc = imgSrcToSet;
        cardObj.data = currCard;
        loggerManager.log("frmManageTravelSelectCards card.data : " + JSON.stringify(cardObj.data));
        if(imgSrcToSet.isVisible){
            segData.push(cardObj);
        }
      }
      if (kony.sdk.isEmptyObject(segData))
      {
        this.view.lblEligibleCards.text = kony.i18n.getLocalizedString("kony.mb.cardManage.NoEligibleCards");
      }
      else
      {
        this.view.lblEligibleCards.text = kony.i18n.getLocalizedString("kony.mb.cardManage.EligibleCards");
        loggerManager.log("segSelectCards: length: " + segData.length + " Data: " + JSON.stringify(segData));
        this.view.segSelectCards.widgetDataMap = {
          lblCardName: "identifier",
          lblBankName: "issuer",
          lblAccess: "accessType",
          imgCheckbox: "imgSrc",
          imgCard : "imgCard"
        };
        this.view.segSelectCards.setData(segData);
        this.enableContinueButton();
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.view.forceLayout();
    } catch (e) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      loggerManager.log("error in setSegDataForCards:: " + e);
    }
  },
  /**
   * @function
   *
   */
  cardOnRowClick: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### Start : " + currentForm + " : cardOnRowClick ####");
      loggerManager.log("frmManageTravelSelectCards full segment payload" + JSON.stringify(this.view.segSelectCards.data));
      loggerManager.log("frmManageTravelSelectCards fullpayload" + JSON.stringify(this.view.segSelectCards.selectedRowItems));
      loggerManager.log("frmManageTravelSelectCards cardObject" + JSON.stringify(this.view.segSelectCards.selectedRowItems[0].data));
      var cardData = this.view.segSelectCards.selectedRowItems[0];
      var cardIndex = this.view.segSelectCards.selectedRowIndex[1];
      cardIndex = parseInt(cardIndex, 10);
      loggerManager.log("frmManageTravelSelectCardsController: select row items: " + cardIndex);
      this.view.segSelectCards.widgetDataMap = {
        lblCardName: "identifier",
        lblBankName: "issuer",
        lblAccess: "accessType",
        imgCheckbox: "imgSrc",
        imgCard: "imgCard"
      };
      if (cardData.imgSrc.isVisible) {
        if (cardData.imgSrc.src === "remembermetick.png") {
          cardData.imgSrc.src = "remeberme.png";
        } else {
          cardData.imgSrc.src = "remembermetick.png";
        }
        this.view.segSelectCards.setDataAt(cardData, cardIndex);
        this.enableContinueButton();
        this.view.forceLayout();
      } else {
        return;
      }
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  enableContinueButton: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### Start : " + currentForm + " : enableContinueButton ####");
      loggerManager.log("frmManageTravelSelectCardsController: Entry");
      var cardsInSegment = this.view.segSelectCards.data;
      if (kony.sdk.isNullOrUndefined(cardsInSegment) || kony.sdk.isEmptyObject(cardsInSegment)) {
        cardsInSegment = [];
        this.view.btnContinue.setEnabled(false);
      }
      var isAnyCardSelected = cardsInSegment.filter(function(card) {
        return (card.imgSrc.src === "remembermetick.png" && card.imgSrc.isVisible);
      });
      loggerManager.log("frmManageTravelSelectCardsController: isAnyCardSelected: " + isAnyCardSelected.length + ":" + JSON.stringify(isAnyCardSelected));
      if (isAnyCardSelected.length > 0) {
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
      } else {
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
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
      var cardsInSegment = this.view.segSelectCards.data;
      var selectedCardsList = cardsInSegment.filter(function(card) {
        return (card.imgSrc.src === "remembermetick.png" && card.imgSrc.isVisible);
      });
      loggerManager.log("frmManageTravelSelectCardsController: selectedCardsList:" + JSON.stringify(selectedCardsList));
      var selectedCardsPayload = [];
      for (var index = 0; index < selectedCardsList.length; index++) {
        loggerManager.log("frmManageTravelSelectCardsController: tmpcard :" + JSON.stringify(selectedCardsList[index]));
        var tmp = {};
        tmp.name = selectedCardsList[index].prodName;
        tmp.number = selectedCardsList[index].maskedNo;
        selectedCardsPayload.push(tmp);
      }
      loggerManager.log("frmManageTravelSelectCardsController: selectedCardsPayload:" + JSON.stringify(selectedCardsPayload));
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      this.TravelPlanDetailsUpdate.cardNumber = selectedCardsPayload;
      if (this.navOption === "edit") {
        applicationManager.getPresentationUtility().showLoadingScreen();
        loggerManager.log("TravelDetailsObjectRequest: " + JSON.stringify(this.TravelPlanDetailsRequest));
        loggerManager.log("TravelDetailsObjectUpdated: " + JSON.stringify(this.TravelPlanDetailsUpdate));
        manageCardsModule.presentationController.updateTravelPlan(this.TravelPlanDetailsUpdate, this.successCallbackForUpdate, this.failureCallbackForUpdate);
      } else {
        navManager.setCustomInfo("frmManageTravelPhoneNumber", {
          "option": "add",
          "data": this.TravelPlanDetailsUpdate
        });
        manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelPhoneNumber");
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
      loggerManager.log("#### Start : " + currentForm + " : successCallbackForUpdate ####");
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
      loggerManager.log("#### Start : " + currentForm + " : failureCallbackForUpdate ####");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      loggerManager.log("error: came to  failureCallbackForUpdate: " + JSON.stringify(err));
      if (err["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      this.TravelPlanDetailsRequest.showToast = true;
      this.TravelPlanDetailsRequest.isSuccess = false;
      this.TravelPlanDetailsRequest.message = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.updateTravelPlanFailure");
      navManager.setCustomInfo("frmManageTravelDetails", this.TravelPlanDetailsRequest);
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDetails");
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  setEmptySegDataAndMessage: function(headerMessage) {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### Start : " + currentForm + " : setEmptySegDataAndMessage ####");
      this.view.segSelectCards.widgetDataMap = {
        lblCardName: "identifier",
        lblBankName: "issuer",
        lblAccess: "accessType",
        imgCheckbox: "imgSrc"
      };
      this.view.segSelectCards.setData([]);
      this.view.lblEligibleCards.text = headerMessage;
      this.view.segSelectCards.onRowClick = this.cardOnRowClickNoAction;
      this.view.btnContinue.setEnabled(false);
	  this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  cardOnRowClickNoAction: function() {
    return;
  }
});