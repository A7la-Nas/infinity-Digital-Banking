define({
	loggerManager : applicationManager.getLoggerManager(),
    init : function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    preShow: function() {
      try{
      	var navManager = applicationManager.getNavigationManager();
      	var frmData = navManager.getCustomInfo("frmCardMngReasons");
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = this.cancelOnClick;
		this.cardData = frmData;
      	if (frmData === undefined) {
            var newObj = {
                "view": "none"
            };
            frmData = newObj;
        }
        if (frmData.view === "pinChange") {
            this.renderViewForPinChange();
        }
        else if (frmData.view === "replaceCard") {
            this.renderViewForReplaceCard();
        }
        else if (frmData.view === "lostCard") {
            this.renderViewForStolenCard();
        }
        else if (frmData.view === "cancelCard") {
            this.renderViewForCancelCard();
        }
        this.objToReturn = frmData;
        this.renderTitleBar();
      	this.view.forceLayout();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
         applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    renderTitleBar: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
          	if ((this.titleText !== null) && (this.titleText !== '')) {
                this.view.title = this.titleText;
            }
        }
    },
    renderViewForPinChange: function() {
      try{
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.requestingPinChange");
        this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.requestingPinChange");
        this.view.flxReasonsPinChange.setVisibility(true);
        this.view.flxReasonsReplacingCard.setVisibility(false);
        this.view.flxReasonStolenCard.setVisibility(false);
        this.view.flxReasonsCancelCard.setVisibility(false);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
   segReasonsPinChangeOnRowClick: function() {
      try {
        this.loggerManager.log("#### start frmCardMngReasonsController : segReasonsPinChangeOnRowClick ####");
        var selectedData = this.view.segReasonsPinChange.selectedItems[0];
      //  this.cardData.Reason = selectedData.lblReason;
        var configManager = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();
              var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        var cardType = this.cardData.cardType;
        scope_ManageCards_Pres.cardType=cardType;
        if (cardType === 'Credit') {
          this.cardData.RequestReason=selectedData.lblReason;
          navManager.setCustomInfo("frmCardMngPinChgTypes",this.cardData);
          manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngPinChgTypes");
        }
        else if (cardType === "Debit") {
          this.cardData.Reason = selectedData.lblReason;
		  navManager.setCustomInfo("frmCardMngNewPin",this.cardData);
          manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngNewPin");
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    renderViewForReplaceCard: function() {
      try{
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.replacingCard");
        this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.replacingCard");
        this.view.flxReasonsPinChange.setVisibility(false);
        this.view.flxReasonsReplacingCard.setVisibility(true);
        this.view.flxReasonStolenCard.setVisibility(false);
        this.view.flxReasonsCancelCard.setVisibility(false);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    segReasonsReplaceCardOnRowClick: function() {
      try{
      	var selectedData = this.view.segReasonsReplaceCard.selectedItems[0];
      	this.cardData.Reason = selectedData.lblReason;
		var userPrefMang = applicationManager.getUserPreferencesManager();
		var regAddress = userPrefMang.getEntitlementAddresses();
        this.loggerManager.log("####User Addresses: " + JSON.stringify(regAddress));
        this.cardData.Addresses = regAddress;
        this.onClickOfActionsForReplaceCard();
        //var regAddress = userPrefMang.getUserAllAddresses();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    renderViewForStolenCard: function() {
      try{
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.stolenCreditCard");
        this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.stolenCreditCard");
        this.view.flxReasonsPinChange.setVisibility(false);
        this.view.flxReasonsReplacingCard.setVisibility(false);
        this.view.flxReasonStolenCard.setVisibility(true);
        this.view.flxReasonsCancelCard.setVisibility(false);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    segReasonsStolenCardOnRowClick: function() {
      try{
      	var selectedData = this.view.segReasonsStolenCard.selectedItems[0];
      	this.cardData.Reason = selectedData.lblReason;
        this.onClickOfActions();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    renderViewForCancelCard: function() {
      try{
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelCardTitle");
        this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelCardTitle");
        this.view.flxReasonsPinChange.setVisibility(false);
        this.view.flxReasonsReplacingCard.setVisibility(false);
        this.view.flxReasonStolenCard.setVisibility(false);
        this.view.flxReasonsCancelCard.setVisibility(true);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
   segReasonsCancelCardOnRowClick: function() {
     	var selectedData = this.view.segReasonsCancelCard.selectedItems[0];
      	this.cardData.Reason = selectedData.lblReason;
		this.onClickOfActions();
    },
  	onClickOfActions : function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngConfirmDetails",this.cardData);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngConfirmDetails");
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
	onClickOfActionsForReplaceCard : function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngReplaceCardConfirm",this.cardData);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReplaceCardConfirm");
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
  	flxBackOnClick: function(){
       var navManager = applicationManager.getNavigationManager();
      	navManager.goBack();
  	},
	cancelOnClick: function(){
      try{
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
    }
});