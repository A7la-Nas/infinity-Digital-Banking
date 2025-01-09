define({
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
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngPinChgTypesController : preShow ####");
      	var navManager = applicationManager.getNavigationManager();
      	var frmData = navManager.getCustomInfo("frmCardMngPinChgTypes");
		this.cardData = frmData;
        this.renderTitleBar();
        this.view.flxEmailID.onClick = this.flxOnClick;
        this.view.flxPhoneNum.onClick = this.flxOnClick;
        this.view.flxPostalAddress.onClick = this.flxOnClick;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = this.cancelOnClick;
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    renderTitleBar: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngPinChgTypesController : renderTitleBar ####");
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
          this.view.flxHeader.setVisibility(false);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxOnClick: function(eventObject) {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngPinChgTypesController : flxOnClick ####");
        if( eventObject.id === "flxEmailID") {
          this.cardData.type = "email";
        }
        else if(eventObject.id === "flxPhoneNum") {
          this.cardData.type = "phoneNo";
        }
        else if(eventObject.id === "flxPostalAddress") {
          this.cardData.type = "postalAddress";
        }
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngPinChgOptions", this.cardData);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngPinChgOptions");
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