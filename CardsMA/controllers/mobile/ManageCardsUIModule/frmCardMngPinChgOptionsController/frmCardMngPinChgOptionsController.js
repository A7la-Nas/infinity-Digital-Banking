define(["CommonUtilities"], function (CommonUtilities){
  return{
    objView:{},
    scinstance:null,
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
    preShow: function(obj) {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngPinChgOptionsController : preShow ####");
		this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = this.cancelOnClick;
        var navManager = applicationManager.getNavigationManager();
        var frmData = navManager.getCustomInfo("frmCardMngPinChgTypes");
        if (frmData === undefined) {
          var newObj = {
            "type": "email"
          };
          frmData = newObj;
        }
        if (frmData.type === "email") {
          this.renderViewForEmail();
        }
        else if (frmData.type === "phoneNo") {
          this.renderViewForPhoneNo();
        }
        else if (frmData.type === "postalAddress") {
          this.renderViewForPostalAddress();
        }
        this.objView = frmData;
        this.cardData = frmData;
        this.renderTitleBar();
        this.initActions();
        this.view.postShow = this.postShow;
              if (1 === CommonUtilities.getSCAType()) {
                this.addComponentforSCA();
                this.view.SCAComponent.zIndex = 1;
                this.view.SCAComponent.onSuccessCallback = this.scaSuccessCallback;
                this.view.SCAComponent.onFailureCallback = this.scaFailureCallback;
              }
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    postShow: function(){
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngPinChgOptionsController : postShow ####");
        if (this.objView.type === "email") {
          this.view.txtRegEmailIdValue.setFocus(true);
        }
        if (this.objView.type === "phoneNo") {
        //  this.view.txtRegPhoneNoValue.setFocus(true);
        }
        if (this.objView.type === "postalAddress") {
         // this.view.txtAreaAddressValue.setFocus(true);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    initActions: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngPinChgOptionsController : initActions ####");
        this.view.btnContinue.onClick = this.onClickAction;
        this.view.btnContinuePhone.onClick = this.onClickAction;
        this.view.btnContinueAddress.onClick = this.onClickAction;
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    onClickAction: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngPinChgOptionsController : onClickAction ####");
		this.updateCurrentCard();
        applicationManager.getPresentationUtility().showLoadingScreen();
// 		var validationMan = applicationManager.getValidationUtilManager();
//         var validInfo = false;
// //         if (this.objView.type === "email") {
//           if(validationMan.isValidEmail(this.view.txtRegEmailIdValue.text)){
//             validInfo = true;
//           }
//         }
//         if (this.objView.type === "phoneNo") {
//           if(validationMan.isValidPhoneNumber(this.view.txtRegPhoneNoValue.text)){
//             validInfo = true;
//           }
//         }
//         if (this.objView.type === "postalAddress") {
//           if(this.view.txtAreaAddressValue.text != "" && !(kony.sdk.isNullOrUndefined(this.view.txtAreaAddressValue.text))){
//             validInfo = true;
//           }
//         }
//         if(validInfo === true){
//         	this.updateCurrentCard();
//         }else
//           alert("Invalid Information");
//         	throw "error";
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    updateCurrentCard : function(){
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngPinChgOptionsController : updateCurrentCard ####");
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        if(this.cardData.cardType=="Credit")
        {
          this.cardData.Action="PinChangeCredit";
        delete this.cardData["CardAccountNumber"]
      }
      	manageCardsModule.presentationController.updateCardData(this.cardData);
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
//     updateCardSuccess : function(response){
//       var loggerManager = applicationManager.getLoggerManager();
//       try {
//         loggerManager.log("#### start frmCardMngPinChgOptionsController : updateCardSuccess ####");
// 		applicationManager.getPresentationUtility().dismissLoadingScreen();
//         var navManager = applicationManager.getNavigationManager();
//         var nextfrmData = navManager.getCustomInfo("frmCardManageHome");
//         nextfrmData.cardData = this.cardData;
//         navManager.setCustomInfo("frmCardManageHome", nextfrmData);
//         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
//         manageCardsModule.presentationController.showCardsHome();
//       }
//       catch(err) {
//         applicationManager.getPresentationUtility().dismissLoadingScreen();
//         throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
//       }
//     },
//     updateCardFailure : function(response){
//       var loggerManager = applicationManager.getLoggerManager();
//       try {
//         loggerManager.log("#### start frmCardMngPinChgOptionsController : updateCardFailure ####");
// 		applicationManager.getPresentationUtility().dismissLoadingScreen();
//         if(response["isServerUnreachable"])
//                   applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
//         else{
//           kony.ui.Alert("Something went wrong - card request");
//         }
//       }
//       catch(err) {
//         applicationManager.getPresentationUtility().dismissLoadingScreen();
//         throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
//       }
//     },
    renderTitleBar: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngPinChgOptionsController : renderTitleBar ####");
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
          this.view.flxHeader.setVisibility(false);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    renderViewForEmail: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngPinChgOptionsController : renderViewForEmail ####");
        this.view.flxMainEmail.setVisibility(true);
        this.view.flxMainEmail.zIndex= 5;
        this.view.btnContinue.setEnabled(true);
        var userPrefMang = applicationManager.getUserPreferencesManager();
        var email = userPrefMang.getEntitlementEmailIds();
        var regEmail;
         for (var i = 0; i < email.length; i++) {
          if (email[i].isPrimary === "true") {
            regEmail = email[i].Value;
			break;
          }
         }
        if(regEmail !== ""){
          this.view.lblRegEmailIValue.text = regEmail;
        }else{
          this.view.lblRegEmailIValue.text = kony.i18n.getLocalizedString("kony.mb.cardManage.NoRegisteredEmail");
          this.view.btnContinue.setEnabled(false);
        }
        this.view.flxMainPhoneNum.setVisibility(false);
        this.view.flxMainPostalAddress.setVisibility(false);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    renderViewForPhoneNo: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngPinChgOptionsController : renderViewForPhoneNo ####");
        this.view.flxMainEmail.setVisibility(false);
        this.view.btnContinuePhone.setEnabled(true);
        var userPrefMang = applicationManager.getUserPreferencesManager();
        var phoneNumbers = userPrefMang.getEntitlementPhoneNumbers();
        var regPhoneNo;
        for(var i=0;i<phoneNumbers.length;i++){
          if(phoneNumbers[i].isPrimary === "true"){
          regPhoneNo = phoneNumbers[i].Value;
		  break;
          }
        }
        if(regPhoneNo !== ""){
          this.view.lblRegPhoneNoValue.text = regPhoneNo;
        }else{
          this.view.lblRegPhoneNoValue.text = kony.i18n.getLocalizedString("kony.mb.cardManage.NoRegisteredPhone");
          this.view.btnContinuePhone.setEnabled(false);
        }
        this.view.flxMainPhoneNum.setVisibility(true);
        this.view.flxMainPhoneNum.zIndex= 5;
        this.view.flxMainPostalAddress.setVisibility(false);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    renderViewForPostalAddress: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngPinChgOptionsController : renderViewForPostalAddress ####");
        this.view.flxMainEmail.setVisibility(false);
        this.view.btnContinueAddress.setEnabled(true);
        var userPrefMang = applicationManager.getUserPreferencesManager();
        var addressObj = userPrefMang.getEntitlementAddresses();
        var userAddressJSON;
        for(var i =0;i<addressObj.length;i++){
         if (addressObj[i].isPrimary === "true") {
           userAddressJSON = addressObj[i];
           break;
         }
        }
        var regAddress = "";
        for (var key in userAddressJSON){
          if(userAddressJSON[key] !== "" && userAddressJSON[key] !== null && userAddressJSON[key] !== undefined){
            regAddress = 	userAddressJSON.AddressLine1 + ", "+
								userAddressJSON.AddressLine2 + ", "+
								userAddressJSON.CityName + ", " +
								userAddressJSON.CountryName + ", "+
                                userAddressJSON.ZipCode;
            break;
          }
        }
        if(regAddress !== ""){
          this.view.lblRegAddressValue.text = regAddress;
        }
        else{
          this.view.lblRegAddressValue.text = kony.i18n.getLocalizedString("kony.mb.cardManage.NoRegisteredAddress");
          this.view.btnContinueAddress.setEnabled(false);
        }
        this.view.flxMainPhoneNum.setVisibility(false);
        this.view.flxMainPostalAddress.setVisibility(true);
        this.view.flxMainPostalAddress.zIndex= 5;

      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
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
    },
  	flxBackOnClick: function(){
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
  	},
     SCAComponentChangePinCall : function(response){
      var scopeObj =this;
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      response.userName = userName;
      response.userDetails={
        "data1": response.flowType,
        "data2": response.action
      };
      applicationManager.getMFAManager().setMFAFlowType(response.flowType);
      if (1 === CommonUtilities.getSCAType()){
        try{
          scopeObj.view.SCAComponent.setVisibility(true);
          scopeObj.view.SCAComponent.setContext(response);
        }catch(e){
          kony.print(" Change PIN SCAComponent Call-->"+e);
          kony.print(e);
        }
      }
    },
    scaSuccessCallback: function(response){
      applicationManager.getPresentationUtility().MFA.navigateToAckScreen(response);
    },
    scaFailureCallback : function(response){
      if(response.hasOwnProperty("isLogoutUser") && response.isLogoutUser ){
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