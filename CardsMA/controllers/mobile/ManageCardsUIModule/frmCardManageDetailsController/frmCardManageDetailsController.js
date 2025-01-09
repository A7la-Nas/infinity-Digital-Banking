define(['CommonUtilities'], function(CommonUtilities2){
  return { 
  	preShow: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageDetailsController : preShow ####");
        this.hidePopUp();
        // 	this.resetVisibilityOfDetails();
        this.addDataIntoSegment(this.getCardData());
        this.view.customHeader.btnRight.onClick = this.btnRightOnClick;
        //this.view.btnAddNickname.onClick = this.btnAddNicknameOnClick;
        //this.view.btnEditBillingAddtess.onClick = this.btnEditBillingAddressOnClick;
        //this.view.btnEditNickName.onClick = this.btnAddNicknameOnClick;
        this.view.flxCardNoToggle.setVisibility(false);
        this.view.flxCardNoToggle.onClick = this.flxCardNoToggleOnClick;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        var configManager =  applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();
        var formatUtil = applicationManager.getFormatUtilManager();
      var users = navManager.getCustomInfo("buisnessuser");
        if(configManager.isCombinedUser === "true"){
          //this.view.title = applicationManager.getUserPreferencesManager().getBankName();
          if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone'){
            this.view.title=users.title;
          }else{
            this.view.customHeader.lblLocateUs.text =users.title;
          }
        }else{
          if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone'){
            this.view.title = applicationManager.getUserPreferencesManager().getBankName();
          }else{
            this.view.customHeader.lblLocateUs.text = applicationManager.getUserPreferencesManager().getBankName();
          }
        }
        this.renderTitleBar();
        var cardData = this.getCardData();
        this.view.imgCardNoToggle.src = "view.png";
        this.view.lblCardNoValue.text = formatUtil.formatCardNumber(cardData.maskedCardNumber);   //1234 5678 9123 XXXX           
        this.view.flxMainContainer.forceLayout();
        var navManager = applicationManager.getNavigationManager();
        var frmData = {
          "isMainScreen": false
        };
        navManager.setCustomInfo("frmCardManageDetailsController_IsMaskedNumberEnabled", true);
        navManager.setCustomInfo("frmCardManageHome", frmData);

        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    resetVisibilityOfDetails: function(){
      try {
        this.view.flxAvailableBal.setVisibility(true);
        this.view.flxSeperator5.setVisibility(true);
        this.view.flxValidThrough.setVisibility(true);
        this.view.flxSeperator4.setVisibility(true);
        this.view.flxBillingAddress.setVisibility(true);
        this.view.flxSeperator8.setVisibility(true);
        this.view.imgCardNoToggle.src = "view.png";
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    init : function(){
      try {
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    getCardData: function() {
      try {
        var loggerManager = applicationManager.getLoggerManager();
        loggerManager.log("#### start frmExternalBankLoginController : getCardData ####");
        var navManager = applicationManager.getNavigationManager();
        var cardDetails = navManager.getCustomInfo("frmCardManageDetails");
        return cardDetails;
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    addDataIntoSegment: function(cardDetails) {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageDetailsController : addDataIntoSegment ####");
        var formatUtil = applicationManager.getFormatUtilManager();
        this.view.lblCardNoValue.text =  formatUtil.formatCardNumber(cardDetails.maskedCardNumber);  //1234 5678 9123 XXXX
        var cardType = cardDetails.cardType;
        this.view.segCardDetails.rowSkin="sknSegffffff";
        this.view.segCardDetails.rowFocusSkin= "sknSegffffff";
        this.view.segCardDetails.widgetDataMap={
          lblKey:"key",
          lblValue:"value"
        };
        if (cardType === 'Credit') {
          this.createViewForCredit(cardDetails);
        }
        else
        {
          this.createViewForDedit(cardDetails);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    createViewForCredit: function(cardDetails)
    {
      this.view.segCardDetails.removeAll();
      var formatUtil = applicationManager.getFormatUtilManager();
      var data =[
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.cardProductName"),
          "value":cardDetails.cardProductName
        },
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Alerts.CreditLimitTitle"),
          "value":formatUtil.formatAmountandAppendCurrencySymbol(cardDetails.creditLimit,cardDetails.transactionCurrency)
        },
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.availCred"),
          "value":formatUtil.formatAmountandAppendCurrencySymbol(cardDetails.availableCredit,cardDetails.transactionCurrency)
        },
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.serviceProvider"),
          "value":cardDetails.serviceProvider
        },
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.cardHolder"),
          "value":cardDetails.cardHolderName
        },
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardManage.BillingAddressTitle"),
          "value":cardDetails.billingAddress
        }
      ];
      if(cardDetails.secondaryCardHolder)
      {
        data.splice(data.length-1,0,{"key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.secCardHolder"),
                                     "value":cardDetails.secondaryCardHolder});
      }
      this.view.segCardDetails.setData(data);
    },
    createViewForDedit:function(cardDetails)
    {
      var formatUtil = applicationManager.getFormatUtilManager();
      this.view.segCardDetails.removeAll();
      var data =[
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.cardProductName"),
          "value":cardDetails.cardProductName
        },
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.dailyWithdrwalLimit"),
          "value":formatUtil.formatAmountandAppendCurrencySymbol(cardDetails.withdrawlLimit,cardDetails.transactionCurrency)
        },
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.AccountName"),
          "value":cardDetails.accountName
        },
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.tab.Manage.AccountNumber"),
          "value":cardDetails.maskedAccountNumber
        },
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.serviceProvider"),
          "value":cardDetails.serviceProvider
        },
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.cardHolder"),
          "value":cardDetails.cardHolderName
        },
      ];
      if(cardDetails.secondaryCardHolder)
      {
        data.push({"key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.secCardHolder"),
                   "value":cardDetails.secondaryCardHolder});
      }
      this.view.segCardDetails.setData(data);
    },
    flxCardNoToggleOnClick: function() {
      try {
        var loggerManager = applicationManager.getLoggerManager();
        loggerManager.log("#### start frmExternalBankLoginController : flxCardNoToggleOnClick ####");
        var cardData = this.getCardData();
        var navigationManager = applicationManager.getNavigationManager();
        var formatUtil = applicationManager.getFormatUtilManager();
        var IsMaskedNumberEnabled = navigationManager.getCustomInfo("frmCardManageDetailsController_IsMaskedNumberEnabled");
        if (IsMaskedNumberEnabled === true) {
          this.view.imgCardNoToggle.src = "viewactive.png";
          this.view.lblCardNoValue.text = formatUtil.formatCardNumber(cardData["maskedCardNumber"]);
          navigationManager.setCustomInfo("frmCardManageDetailsController_IsMaskedNumberEnabled", false);
          this.view.flxMainContainer.forceLayout();
        } else {
          this.view.imgCardNoToggle.src = "view.png";
          this.view.lblCardNoValue.text = formatUtil.formatCardNumber(cardData.maskedCardNumber);   //1234 5678 9123 XXXX
          navigationManager.setCustomInfo("frmCardManageDetailsController_IsMaskedNumberEnabled", true);
          this.view.flxMainContainer.forceLayout();
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    renderTitleBar: function() {
      var configManager =  applicationManager.getConfigurationManager();
      var navManager = applicationManager.getNavigationManager();
      var users = navManager.getCustomInfo("buisnessuser");
      var isMirrorLayoutEnabled = CommonUtilities2.isMirrorLayoutEnabled();
      this.view.flxHeaderUsers.isVisible=false;
      if(configManager.isCombinedUser === "true"){
        this.view.flxAccountType.isVisible=true;
        (!isMirrorLayoutEnabled) ? this.view.lblCardNoValue.left="50dp" : this.view.lblCardNoValue.right="50dp";
         if(users.buisnessuser===1){
                 this.view.imgAccountType.src="businessaccount.png";
         }else{
            this.view.imgAccountType.src="personalaccount.png";
          }
      }else{
        this.view.flxAccountType.isVisible=false;
        (!isMirrorLayoutEnabled) ? this.view.lblCardNoValue.left="20dp" : this.view.lblCardNoValue.right="20dp";
      }
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
          this.view.flxHeader.setVisibility(false);
        }else{
          this.view.flxHeader.setVisibility(true);
        }

    },
    btnRightOnClick: function() {
      if(applicationManager.getDeviceUtilManager().isIPhone()) {
        var actionSheetObject = new kony.ui.ActionSheet(
          {
            "title":null,
            "message":null,
            "showCompletionCallback": null
          }
        );
        applicationManager.actionSheetObject=actionSheetObject;
        var actionBillingAddress = new kony.ui.ActionItem(
          {
            "title":"Edit Billing Address",
            "style":constants.ACTION_STYLE_DEFAULT,
            "action": this.btnEditBillingAddressOnClick
          }
        );
        var actionEditNickName = new kony.ui.ActionItem(
          {
            "title":"Edit Card Nickname",
            "style":constants.ACTION_STYLE_DEFAULT,
            "action": this.btnAddNicknameOnClick
          }
        );
        var actionCancel = new kony.ui.ActionItem(
          {
            "title":"Cancel",
            "style":constants.ACTION_ITEM_STYLE_CANCEL,
            "action": null
          }
        );
        actionSheetObject.addAction(actionBillingAddress);
        actionSheetObject.addAction(actionEditNickName);
        actionSheetObject.addAction(actionCancel);
        actionSheetObject.show();
      }else{
        this.view.flxPopupNickName.setVisibility(true);
        this.view.flxMainContainer.setEnabled(false);
        this.view.flxHeader.setEnabled(false);
      }
    },
    hidePopUp: function() {
      this.view.flxPopupNickName.setVisibility(false);
      this.view.flxMainContainer.setEnabled(true);
      this.view.flxHeader.setEnabled(true);
    },
    btnAddNicknameOnClick: function() {
      try {
        var loggerManager = applicationManager.getLoggerManager();
        loggerManager.log("#### start frmExternalBankLoginController : btnAddNicknameOnClick ####");
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngNickName", this.getCardData());
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngNickName");
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    btnEditBillingAddressOnClick: function() {
      try {
        var loggerManager = applicationManager.getLoggerManager();
        loggerManager.log("#### start frmExternalBankLoginController : btnEditBillingAddressOnClick ####");
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngBillAddress", this.getCardData());
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngBillAddress");
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxBackOnClick: function() {
      var navManager = applicationManager.getNavigationManager();
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
      manageCardsModule.presentationController.showCardsHome();
    },
  };
});