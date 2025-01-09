define({
    titleText: '',
    objReturn: null,
	loggerManager : applicationManager.getLoggerManager(),
    init : function() {
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
        this.view.btnSubmit.onClick = this.btnSubmitOnClick.bind(this);
      	this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = this.cancelOnClick;
		this.view.flxAddress1.onClick = this.addRadioOnclick1;
		this.view.flxAddress2.onClick = this.addRadioOnclick2;
		this.view.flxAddress3.onClick = this.addRadioOnclick3;
      	var navManager = applicationManager.getNavigationManager();
		var cardData = navManager.getCustomInfo("frmCardMngReplaceCardConfirm");
      	this.cardData = cardData;
      	if (cardData === undefined) {
            var newObj = {
                "view": "none"
            };
            cardData = newObj;
        }
		this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.replacingCard");
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.replacingCard");
        //this.renderViewForReplaceCard(cardData);
		this.objReturn = cardData;
      	this.view.txtNote.text = this.cardData.Reason;
		this.view.btnSubmit.skin = "sknBtna0a0a0SSPReg26px";
		this.view.btnSubmit.setEnabled(false);
      	//Setting Addresses
		var address1 = "";
		var address2 = "";
		var address3 = "";
		if(cardData.hasOwnProperty("Addresses")){
			var addressesOfUsers = cardData.Addresses;
			var noOfRegisteredAddresses = addressesOfUsers.length;
			if(noOfRegisteredAddresses===0){
				this.view.lblAddress1.text = kony.i18n.getLocalizedString("kony.mb.cardManage.NoRegisteredAddress");
				this.view.imgRadioAddress1.src = "radiobuttoninactive.png";
				this.view.imgRadioAddress1.setVisibility(false);
				this.view.lblAddress2.setVisibility(false);
				this.view.imgRadioAddress2.setVisibility(false);
				this.view.flxSeperatorWrapper3.setVisibility(false);
				this.view.lblAddress3.setVisibility(false);
				this.view.imgRadioAddress3.setVisibility(false);
				this.view.flxSeperatorWrapper4.setVisibility(false);
				this.view.flxMainContainer.forceLayout();
			} else if(noOfRegisteredAddresses===1){
				address1 = this.getAddress(addressesOfUsers[0]);
				this.view.lblAddress1.text = address1;
				this.view.imgRadioAddress1.setVisibility(true);
				this.view.imgRadioAddress1.src = "radiobuttoninactive.png";
				this.view.lblAddress2.setVisibility(false);
				this.view.imgRadioAddress2.setVisibility(false);
				this.view.flxSeperatorWrapper3.setVisibility(false);
				this.view.lblAddress3.setVisibility(false);
				this.view.imgRadioAddress3.setVisibility(false);
				this.view.flxSeperatorWrapper4.setVisibility(false);
				this.view.flxMainContainer.forceLayout();
			} else if(noOfRegisteredAddresses===2){
				address1 = this.getAddress(addressesOfUsers[0]);
				this.view.lblAddress1.text = address1;
				address2 = this.getAddress(addressesOfUsers[1]);
				this.view.lblAddress2.text = address2;
				this.view.imgRadioAddress1.setVisibility(true);
				this.view.imgRadioAddress1.src = "radiobuttoninactive.png";
				this.view.imgRadioAddress2.setVisibility(true);
				this.view.imgRadioAddress2.src = "radiobuttoninactive.png";
				this.view.lblAddress3.setVisibility(false);
				this.view.imgRadioAddress3.setVisibility(false);
				this.view.flxSeperatorWrapper4.setVisibility(false);
				this.view.flxMainContainer.forceLayout();
			} else {
                address1 = this.getAddress(addressesOfUsers[0]);
				this.view.lblAddress1.text = address1;
				address2 = this.getAddress(addressesOfUsers[1]);
				this.view.lblAddress2.text = address2;
				address3 = this.getAddress(addressesOfUsers[2]);
				this.view.lblAddress3.text = address3;
				this.view.imgRadioAddress1.setVisibility(true);
				this.view.imgRadioAddress1.src = "radiobuttoninactive.png";
				this.view.imgRadioAddress2.setVisibility(true);
				this.view.imgRadioAddress2.src = "radiobuttoninactive.png";
				this.view.imgRadioAddress3.setVisibility(true);
				this.view.imgRadioAddress3.src = "radiobuttoninactive.png";
				this.view.flxMainContainer.forceLayout();
			}
		} else{
			this.view.lblAddress1.text = kony.i18n.getLocalizedString("kony.mb.cardManage.NoRegisteredAddress");
			this.view.imgRadioAddress1.src = "radiobuttoninactive.png";
			this.view.imgRadioAddress1.setVisibility(false);
			this.view.lblAddress2.setVisibility(false);
			this.view.imgRadioAddress2.setVisibility(false);
			this.view.flxSeperatorWrapper3.setVisibility(false);
			this.view.lblAddress3.setVisibility(false);
			this.view.imgRadioAddress3.setVisibility(false);
			this.view.flxSeperatorWrapper4.setVisibility(false);
			this.view.flxMainContainer.forceLayout();
		}
		//this.view.forceLayout();
      	this.renderTitleBar();
      	var currentForm=navManager.getCurrentForm();
      	applicationManager.getPresentationFormUtility().logFormName(currentForm);
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    getAddress:function(addressesOfUsers){
      var finalData;
      if(addressesOfUsers.AddressLine1 !== undefined && addressesOfUsers.AddressLine1 !== "" && addressesOfUsers.AddressLine1 !== null)
        finalData= addressesOfUsers.AddressLine1;
      if(addressesOfUsers.AddressLine2 && finalData !== undefined)
        finalData= finalData+","+addressesOfUsers.AddressLine2;
      else finalData = addressesOfUsers.AddressLine2;
      if(addressesOfUsers.CityName)
        finalData= finalData+","+addressesOfUsers.CityName;
      if(addressesOfUsers.CountryName)
        finalData= finalData+","+addressesOfUsers.CountryName;
      if(addressesOfUsers.ZipCode)
        finalData= finalData+","+addressesOfUsers.ZipCode;
      return finalData;
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
  	renderTitleBar: function() {
      try{
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
            if ((this.titleText !== null) && (this.titleText !== '')) {
                this.view.title = this.titleText;
            }
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    btnSubmitOnClick: function() {
      try{
      	var addressSelected = "";
        if(this.view.imgRadioAddress1.src === "radiobtn.png"){
          addressSelected = this.view.lblAddress1.text;
        } else if(this.view.imgRadioAddress2.src === "radiobtn.png"){
          addressSelected = this.view.lblAddress2.text;
        } else {
          addressSelected = this.view.lblAddress3.text;
        }
        this.loggerManager.log("####Selected Address = "+addressSelected);
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.updateCurrentCard();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
	addRadioOnclick1: function() {
      try{
         if(this.view.lblAddress1.text != kony.i18n.getLocalizedString("kony.mb.cardManage.NoRegisteredAddress"))
            {
      	this.view.imgRadioAddress1.src = "radiobtn.png";
		this.view.imgRadioAddress2.src = "radiobuttoninactive.png";
		this.view.imgRadioAddress3.src = "radiobuttoninactive.png";
		this.view.btnSubmit.skin = "sknBtn0095e4RoundedffffffSSP26px";
		this.view.btnSubmit.setEnabled(true);
		this.view.flxMainContainer.forceLayout();
            }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
	addRadioOnclick2: function() {
      try{
      	this.view.imgRadioAddress2.src = "radiobtn.png";
		this.view.imgRadioAddress1.src = "radiobuttoninactive.png";
		this.view.imgRadioAddress3.src = "radiobuttoninactive.png";
		this.view.btnSubmit.skin = "sknBtn0095e4RoundedffffffSSP26px";
		this.view.btnSubmit.setEnabled(true);
		this.view.flxMainContainer.forceLayout();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
	addRadioOnclick3: function() {
      try{
      	this.view.imgRadioAddress3.src = "radiobtn.png";
		this.view.imgRadioAddress1.src = "radiobuttoninactive.png";
		this.view.imgRadioAddress2.src = "radiobuttoninactive.png";
		this.view.btnSubmit.skin = "sknBtn0095e4RoundedffffffSSP26px";
		this.view.btnSubmit.setEnabled(true);
		this.view.flxMainContainer.forceLayout();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
  	updateCurrentCard : function(){
      try{
        delete this.cardData.view;
        var updateCardDetails = {
          "cardId": this.cardData.cardId,
          "Action":this.cardData.Action,
          "Reason":this.view.txtNote.text
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
//       try{
//         var navManager = applicationManager.getNavigationManager();
//         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
//         manageCardsModule.presentationController.showCardsHome();
//       }
//       catch(err) {
//         applicationManager.getPresentationUtility().dismissLoadingScreen();
//         throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
//       }
//     },
// 	updateCardFailure : function(response){
//       try{
//         applicationManager.getPresentationUtility().dismissLoadingScreen();
//         if(response["isServerUnreachable"])
//           applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
//         else{
//           applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.cardManage.failUpdateCard"));
//         }
//       }
//       catch(err) {
//         applicationManager.getPresentationUtility().dismissLoadingScreen();
//         throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
//       }
//     },
    /*renderViewForReplaceCard:function(){
        this.view.flxCallCusCare.setVisibility(false);
        this.view.flxSeperator1.setVisibility(false);
    },*/
    flxBackOnClick:function(){
        var navManager = applicationManager.getNavigationManager();
      	navManager.goBack();
    },
});