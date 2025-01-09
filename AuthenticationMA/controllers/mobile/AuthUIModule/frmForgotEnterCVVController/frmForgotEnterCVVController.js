define({
    keypadString: '',
    timerCounter: 0,
    cardNumber:'',
    init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
 },
  preShow: function () {
        this.view.flxPopup.setVisibility(false);
        this.initActions();
        this.handleData();
        this.renderTitleBar();
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.ForgotLoginCredentials");
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.title=kony.i18n.getLocalizedString("kony.mb.ForgotLoginCredentials");
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
    	var currentForm=navManager.getCurrentForm();
    	applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    handleData : function(){
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      var forgotObj = authModule.presentationController.getForgotObjectForView();
      if(!forgotObj.cvv)
      {
        this.setCardData();
      }
      this.keypadString = "";
      this.updateInputBullets();
    },
    renderTitleBar :function(){
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if(!isIphone){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
  },
    showCards: function () {
        if (this.view.segCards.isVisible === true) {
            this.view.segCards.isVisible = false;
            this.view.flxInputCVV.isVisible = true;
            this.view.imgArrow.src = "arrowdown.png";
        } else {
            this.view.segCards.isVisible = true;
            this.view.flxInputCVV.isVisible = false;
            this.view.imgArrow.src = "arrowup.png";
        }
    },
    segSelection :function()
  {
    var selectedCardData = this.view.segCards.selectedRowItems[0];
    this.view.lblSelectedCardValue.text= selectedCardData.lblCard;
    this.cardNumber=selectedCardData.cardNumber;
  },
    initActions: function () {
        this.view.customHeader.flxBack.onClick = this.goBack;
        this.view.customHeader.btnRight.onClick = this.onCancel;
        this.view.flxDropdown.onClick = this.selectCard;
        this.view.segCards.onRowClick = this.onCardSelect;
    },
  selectCard : function () {
        this.showCards();
  },
  onCardSelect : function () {
            this.segSelection();
            this.toggleCheckbox();
            this.showCards();
    },
    goBack: function () {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
    onCancel: function () {
         var navManager = applicationManager.getNavigationManager();
         navManager.clearStack();
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        authModule.presentationController.navigateToLogin();
    },
    showCreatePassword: function () {
        applicationManager.getPresentationUtility().showLoadingScreen();
       if(this.cardNumber !== "")
         {
        var cvv = this.keypadString;
        var cardNumber = this.cardNumber;
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
		authModule.presentationController.validateCVV(cvv, cardNumber);
         }
      else
        {
          var errorMsg  = applicationManager.getPresentationUtility().getStringFromi18n(kony.mb.forgot.selectCard);
          this.bindGenericError(errorMsg);
        }
    },
    updateInputBullets: function () {
        var scope = this;
        var widgets = this.view["flxInputCVV"].widgets();
        for (var i = 0; i < this.keypadString.length; i++) {
            widgets[i].skin = "sknLbl979797SSP60px";
        }
        for (var i = this.keypadString.length; i < widgets.length - 1; i++) {
            widgets[i].skin = "lblWhiteDot";
        }
        if(this.keypadString.length !== 3)
          {
            this.view.btnVerify.skin = "sknBtna0a0a0SSPReg26px";
    		this.view.btnVerify.setEnabled(false);
      	  }
    	else
      	 {
       	   this.view.btnVerify.skin = "sknBtn055BAF26px";
       	   this.view.btnVerify.setEnabled(true);
      	 }
        this.view.forceLayout();
    },
    setKeypadChar: function (char) {
        if (this.keypadString.length === 3) return;
        this.keypadString = this.keypadString + char;
        this.updateInputBullets();
    },
    clearKeypadChar: function () {
        if (this.keypadString.length === 1) {
            this.keypadString = '';
            this.updateInputBullets();
        }
        if (this.keypadString.length !== 0) {
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            this.updateInputBullets();
        }
    },
    setCardData:function()
  {
     var scope = this;
     var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
     var forgotObj = authModule.presentationController.getForgotObjectForView();
     var cardsData = forgotObj.cardsData;
     cardsData = applicationManager.getDataProcessorUtility().getCardDescription(cardsData);
     var data = [];
     var dataMap ={
      "imgCheckbox": "imgCheckbox",
      "lblCard": "lblCard",
      "lblSeparator": "lblSeparator",
    };
     for(var i in cardsData) {
      var item = cardsData[i];
      data.push({
        "imgCheckbox":{"src" : "radiobuttoninactive.png"},
        "lblCard": item.cardDescription,
        "lblSeparator": ".",
        "cardNumber": item.cardNumber
      });
     }
     this.view.lblSelectedCardValue.text = data[0].lblCard;
     this.cardNumber = data[0].cardNumber;
     data[0].imgCheckbox = {"src" : "radiobtn.png"};
     this.view.segCards.widgetDataMap = dataMap;
      //Default card data - first card is selected by default
     this.view.segCards.setData(data);
     this.view.forceLayout();
  },
  toggleCheckbox : function(){
    var index = this.view.segCards.selectedIndex;
    var rowIndex = index[1];
    var data = this.view.segCards.data;
    for(var i = 0 ; i<data.length; i++)
      data[i].imgCheckbox.src = "radiobuttoninactive.png";
    data[rowIndex].imgCheckbox.src = "radiobtn.png";
    this.view.segCards.setData(data);
    this.view.forceLayout();
  },
    bindGenericError: function (errorMsg) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var scopeObj = this;
        applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
    }
});