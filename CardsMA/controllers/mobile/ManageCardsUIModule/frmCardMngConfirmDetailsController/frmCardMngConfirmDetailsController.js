define(['CommonUtilities', 'SCAUtility'], function(CommonUtilities, SCAUtility){
  return{
    titleText: '',
    objReturn: null,
    scinstance:null,
  	init : function() {
      try {
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
        },
      addComponentforSCA : function()
      {
        if(this.scinstance!=null)
          return;
          var currform = kony.application.getCurrentForm();
        this.scinstance = new com.temenos.infinity.mb.sca.transactions.SCAComponent({
          "height": "100%",
          "id": "SCAComponent",
          "isVisible": true,
          "left": "0dp",
          "masterType": constants.MASTER_TYPE_USERWIDGET,
          "isModalContainer": false,
          "skin": "slFboxmb",
          "top": "0dp",
          "width": "100%",
          "appName": "ResourcesHIDMA",
          "viewType": "SCAComponent",
          "shouldGroup": false,
          "overrides": {
            "SCAComponent": {
              "right": "viz.val_cleared",
              "bottom": "viz.val_cleared",
              "minWidth": "viz.val_cleared",
              "minHeight": "viz.val_cleared",
              "maxWidth": "viz.val_cleared",
              "maxHeight": "viz.val_cleared",
              "centerX": "viz.val_cleared",
              "centerY": "viz.val_cleared"
            }
      }
        }, {
          "paddingInPixel": false,
          "overrides": {}
        }, {
          "overrides": {}
        });
        this.scinstance.flowType = "";
        this.scinstance.servicekey = "";
        currform.add(this.scinstance);

    },
    preShow: function() {
      try{
        this.view.flxCardNoToggle.setVisibility(false);
        this.view.btnSubmit.onClick = this.btnSubmitOnClick.bind(this);
        this.view.imgCardNoToggle.onTouchEnd = this.imgCardNumberToggle;
      	this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = this.cancelOnClick;
        var configManager=applicationManager.getConfigurationManager();
        if(configManager.isMicroAppPresent(configManager.microappConstants.ABOUTUS)){
          this.view.flxCallCusCare.setVisibility(true);
          this.view.btnCallCustomerCare.onClick = this.callCustomerCare;
        }
        else{
          this.view.flxCallCusCare.setVisibility(false);
        }
      	
      	var navManager = applicationManager.getNavigationManager();
		var cardData = navManager.getCustomInfo("frmCardMngConfirmDetails");
        var formatUtil = applicationManager.getFormatUtilManager();
      	this.cardData = cardData;
      	if (cardData === undefined) {
            var newObj = {
                "view": "none"
            };
            cardData = newObj;
        }
        if (cardData.view === "replaceCard") {
            this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.replacingCard");
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.replacingCard");
            this.renderViewForReplaceCard(cardData);
        }
        if (cardData.view === "lostCard") {
            this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.stolenCreditCard");
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.stolenCreditCard");
            this.renderViewForStolenCard(cardData);
        }
        if (cardData.view === "cancelCard") {
            this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelCardTitle");
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelCardTitle");
            this.renderViewForChangeCard(cardData);
        }
		if (cardData.view === "lockCard" || cardData.view === "unlockCard") {
                 var title = "";
                  if(cardData.view === "lockCard")
                     {
                    this.cardData.currentCardData.Action="Lock";
                    title = kony.i18n.getLocalizedString("kony.mb.cardManage.lockCard");
                     }
                     else
                     {
                    this.cardData.currentCardData.Action="Activate";
                    title = kony.i18n.getLocalizedString("kony.mb.cardManage.unlockCard");

                      }
                    this.titleText = title;
                    this.view.customHeader.lblLocateUs.text = title;
          this.cardData = cardData.currentCardData;
          this.renderViewForStolenCard(cardData);
        }
    this.view.imgCardNoToggle.src="view.png";
        this.objReturn = cardData;
        this.view.txtReason.text = this.cardData.Reason;
        this.view.lblAccHolderValue.text = this.cardData.cardHolderName;
        this.view.lblCardTypeValue.text = this.cardData.cardType;
        if(cardData.view === "lockCard" || cardData.view === "unlockCard"){
          this.view.lblCardNoValue.text = this.cardData.maskedCardNumber;
          this.view.lblValidThrough.text = kony.i18n.getLocalizedString("kony.mb.CardMng.cardProductName");
          this.view.lblValidThroughVal.text = this.cardData.cardProductName; 
          this.view.flxIssuingBank.setVisibility(false);
//          var companyName = this.cardData.companyName;
//           if(companyName === "" || companyName === null){
//             this.view.flxIssuingBank.setVisibility(false);
//           }
//           else{
//             this.view.flxIssuingBank.setVisibility(true);
//             this.view.lblIssuingBank.text = kony.i18n.getLocalizedString("kony.tab.OBEmployment.CompanyName");
//             this.view.lblIssuingBankValue.text = companyName;
//           }

          this.view.flxCallCusCare.setVisibility(false);
          this.view.lblReason.setVisibility(false);
          this.view.txtReason.setVisibility(false);
        }
        else{
          var maskedCardNo = applicationManager.getDataProcessorUtility().maskAccountNumber(this.cardData.cardNumber);
          this.view.lblCardNoValue.text = formatUtil.formatCardNumber(maskedCardNo);
          this.view.lblValidThrough.text = kony.i18n.getLocalizedString("kony.mb.cardManage.validThrough");
          this.view.lblIssuingBank.text = kony.i18n.getLocalizedString("kony.mb.cardManage.issuingBank");

          this.view.lblIssuingBankValue.text = this.cardData.issuerName;
          var expiryDate = new Date(this.cardData.expiryDate);
          var formatUtil = applicationManager.getFormatUtilManager();
          var formatedDate = formatUtil.getFormatedDateString(expiryDate,formatUtil.getApplicationDateFormat());
          this.view.lblValidThroughVal.text = formatedDate.slice(0,2)+"/"+formatedDate.slice(-4);

          this.view.flxCallCusCare.setVisibility(true);
          this.view.lblReason.setVisibility(true);
          this.view.txtReason.setVisibility(true);
        }
        this.renderTitleBar();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
                if (1 === CommonUtilities.getSCAType()) {
                    this.addComponentforSCA();
                  this.view.SCAComponent.zIndex = 1;
                  this.view.flxMainContainer.zIndex = 5;
                  this.view.btnSubmit.zIndex = 5;
        this.view.SCAComponent.onSuccessCallback = this.scaSuccessCallback;
        this.view.SCAComponent.onFailureCallback = this.scaFailureCallback;
          }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cancelOnClick: function(){
      try {
        var navManager = applicationManager.getNavigationManager();
      	var frmData = {
          "isMainScreen": false
        };
      	navManager.setCustomInfo("frmCardManageHome",frmData);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    	manageCardsModule.presentationController.showCardsHome();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
  	callCustomerCare: function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
           var infModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName":"InformationUIModule"});
            infModule.presentationController.onClickCallUs();
    },
     showDial: function (phoneNumber) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.phone.dial(phoneNumber);
    },
    renderTitleBar: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
            if ((this.titleText !== null) && (this.titleText !== '')) {
                this.view.title = this.titleText;
            }
        }
    },
    btnSubmitOnClick: function() {
      	applicationManager.getPresentationUtility().showLoadingScreen();
      	this.updateCurrentCard();
    },
  	updateCurrentCard : function(){
      try{
        delete this.cardData.view;
        var updateCardDetails = {
          "cardId": this.cardData.cardId,
          "Action":this.cardData.Action,
          "Reason":this.view.txtReason.text
        };
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.updateCardData(updateCardDetails);
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
//   	updateCardSuccess : function(response){
//       var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
//       manageCardsModule.presentationController.showCardsHome();
//     },
// 	updateCardFailure : function(response){
//       try{
//         applicationManager.getPresentationUtility().dismissLoadingScreen();
//         if(response["isServerUnreachable"])
//                     applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
//         else{
//           applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.cardManage.failUpdateCard"));
//         }
//       }
//       catch(err) {
//         applicationManager.getPresentationUtility().dismissLoadingScreen();
//         throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
//       }
//     },
    renderViewForReplaceCard:function(){
        this.view.flxCallCusCare.setVisibility(false);
        this.view.flxSeperator1.setVisibility(false);
    },
    renderViewForStolenCard:function(){
        this.view.flxCallCusCare.setVisibility(true);
        this.view.flxSeperator1.setVisibility(true);
    },
    renderViewForChangeCard:function(){
        this.view.flxCallCusCare.setVisibility(true);
        this.view.flxSeperator1.setVisibility(true);
    },
    flxBackOnClick:function(){
        var navManager = applicationManager.getNavigationManager();
      	navManager.goBack();
    },
    imgCardNumberToggle: function() {
      var formatUtil = applicationManager.getFormatUtilManager();
    if (this.view.imgCardNoToggle.src === "view.png") {
      this.view.imgCardNoToggle.src = "viewactive.png";
      this.view.lblCardNoValue.text = formatUtil.formatCardNumber(this.cardData.maskedCardNumber);//"1122  3424  6273  2390";
    } else {
      this.view.imgCardNoToggle.src = "view.png";
      var maskedCardNo = applicationManager.getDataProcessorUtility().maskAccountNumber(this.cardData.cardNumber);
      this.view.lblCardNoValue.text = formatUtil.formatCardNumber(maskedCardNo);//"XXXX  XXXX  XXXX  2390";
    }
  },
  updateCard : function(){
    try{
      //         delete this.cardData.view;
      var navManager = applicationManager.getNavigationManager();
      var cardData = navManager.getCustomInfo("frmCardMngConfirmDetails");
      var operation,reasonCode,Action,Reason;
      if(cardData.view === "lockCard"){
        operation = "S";
        reasonCode = "04";
        Action = "Lock";
        Reason = "Lock";
      }
      else{
        operation = "R";
        reasonCode = "06";
        Action = "Activate";
        Reason = "Unlock";
      }
      //var startAndEndDate = this.getStartAndEndRangeDate();
      var updateCardDetails = {
        "cardId": this.cardData.cardId,
        //"operation" : operation,
        //"reasonCode" : reasonCode,
        //"startRangeDate": startAndEndDate.startDate,
        //"endRangeDate" : startAndEndDate.endDate,
        "Action":Action,
        "Reason":Reason
      };
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      //manageCardsModule.presentationController.updateCard(updateCardDetails);
      manageCardsModule.presentationController.updateCardData(updateCardDetails);//base 
    }
    catch(err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }
  },
  getStartAndEndRangeDate(){
    var date = new Date();
    var startRangeDate = date.toISOString().replace('T','+').substring(0,16);
    date.setFullYear(date.getFullYear() + 3);
    var endRangeDate = date.toISOString().replace('T','+').substring(0,16);
    var startAndEndDate = {
      "startDate" : startRangeDate,
      "endDate" : endRangeDate
    }
    return startAndEndDate;
  },
  SCAComponentLockCall: function(response) {
    var scopeObj = this;
    const userManager = applicationManager.getUserPreferencesManager();
    const userName = userManager.getUserObj().userName;
    response.userName = userName;
    response.userDetails = {
      "data1": response.flowType,
      "data2": response.action
    };
    applicationManager.getMFAManager().setMFAFlowType(response.flowType);
    if (1 === CommonUtilities.getSCAType()) {
      try {
        scopeObj.view.SCAComponent.setVisibility(true);
        scopeObj.view.SCAComponent.setContext(response);
      } catch (e) {
        kony.print("Card activation SCAComponent Call-->" + e);
        kony.print(e);
      }
    }
  },
  scaSuccessCallback: function(response) {
    applicationManager.getPresentationUtility().MFA.navigateToAckScreen(response);
  },
  scaFailureCallback: function(response) {
    if (response.hasOwnProperty("isLogoutUser") && response.isLogoutUser) {
      let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLoginToast");
      loginData = loginData ? loginData : {};
      loginData.toastMessage = response.errorMessage;
      applicationManager.getNavigationManager().setCustomInfo("frmLoginToast", loginData);
      const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
      authMod.presentationController.onLogout();
    } else {
      applicationManager.getPresentationUtility().MFA.onMFAError(response);
    }
  }
}
});