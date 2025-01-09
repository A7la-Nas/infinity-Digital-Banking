define({
  timerCounter:0,
  keypadString: '',
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmEnrollCVVPreshow : function(){
    this.setFlowActions();
    this.setPreshowData();
    this.clearCVV();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  setFlowActions : function(){
    var scope = this;
    this.view.customHeader.flxBack.onClick = function(){
      scope.navToSecurityCheck();
    };
    this.view.customHeader.btnRight.onClick = function(){
      scope.onClickCancel();
    };
    this.view.segCards.onRowClick = function(){
      scope.hideCards();
      scope.EnterCVV();
    };
    this.view.flxDropdown.onClick = function(){
      scope.showCards();
    };
    this.view.flxInputCVV.onClick = function(){
      scope.EnterCVV();
    };
    this.view.btnVerify.onClick = function(){
      scope.navToEnrollSignUp();
    };
  },
  setPreshowData : function(){
    this.view.customHeader.flxBack.isVisible = true;
    this.view.customHeader.lblLocateUs.text = "CVV Number";
    this.view.flxSelectedCard.setVisibility(true);
    this.view.segCards.isVisible = false;
    this.setCardData();
    this.showCVV();
    this.view.flxBottom.bottom = "32%";
    this.view.flxKeypad.isVisible = true;
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
  },
  navToSecurityCheck : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  setCardData : function(){
    var self = this;
    var navManager = applicationManager.getNavigationManager();
    var cardsData = navManager.getCustomInfo("frmEnrollCVV");
    cardsData = applicationManager.getDataProcessorUtility().getCardDescription(cardsData);
    var data = [];
    var dataMap = {
      "imgCheckbox": "imgCheckbox",
      "lblCard": "lblCard",
      "lblSeparator": "lblSeparator",
    };
    for(var i in cardsData) {
      var item = cardsData[i];
      data.push({
        "imgCheckbox":{"isvisible":false},
        "lblCard": item.cardDescription,
        "lblSeparator": ".",
        "cardNumber": item.cardNumber
      });
    }
    this.view.segCards.widgetDataMap = dataMap;
    //Default card data - first card is selected by default
    this.view.lblSelectedCardValue.text = data[0].lblCard ;
    this.view.segCards.selectedRowIndex = [0,0];
    //data[0].imgCheckbox = {"src" : ""};
    this.view.segCards.setData(data);
    this.view.forceLayout();
  },
  toggleCheckbox : function(){
    var index = this.view.segCards.selectedIndex;
    var rowIndex = index[1];
    var data = this.view.segCards.data;
//     for(var i = 0 ; i<data.length; i++)
//       data[i].imgCheckbox.src = "radiobuttoninactive.png";
//     data[rowIndex].imgCheckbox.src = "radiobtn.png";
    this.view.segCards.setData(data);
    this.view.forceLayout();
  },
  onClickCancel : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.resetEnrollObj();
  },
  hideCards : function(){
    this.view.segCards.isVisible = false;
   var selectedRow  =   this.view.segCards.selectedRowIndex[1];
    this.selectedRowIndex = selectedRow;
    var selectedCard =   this.view.segCards.data[selectedRow];
    this.view.lblSelectedCardValue.text = selectedCard.lblCard ;
    this.toggleCheckbox();
  },
  showCards : function(){
   if(this.view.segCards.isVisible === false){
      this.view.lblSelectedCardValue.text = "";
    this.view.segCards.isVisible = true;
    this.view.flxKeypad.isVisible = false;
    this.view.flxBottom.bottom = "0dp";
     this.view.imgDropdown.src="arrowup.png";
   }
    else
      {
        this.view.segCards.isVisible = false;
        this.view.imgDropdown.src="arrowdown.png";
      }
  },
  EnterCVV : function(){
    this.view.flxBottom.bottom = "32%";
    this.view.segCards.isVisible = false;
    this.view.flxKeypad.isVisible = true;
    this.view.forceLayout();
  },
  showCVV :function()
  {
    var scope = this;
    this.keypadString = '';
    this.incompleteCVVCodeView();
    this.updateInputBullets("flxInputCVV");
  },
  navToAlreadyEnrolled : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.commonFunctionForNavigation("frmAlreadyEnrolled");
  },
  navToEnrollAccInfo : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.commonFunctionForNavigation("frmEnrollAccinfo");
  },
  /**
  * code to check the cvv is valid or not
  */
  navToEnrollSignUp : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var scope = this;
    var CVV = scope.keypadString;
    if(CVV === null||CVV.length=== 0)
    {
      this.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.enterSSN"));
    }
    else
    {
      var selectedRow  =   this.selectedRowIndex;
      if(this.view.segCards.selectedRowIndex){
        selectedRow = this.view.segCards.selectedRowIndex[1];
      }
      var selectedCard =   this.view.segCards.data[0];
      if(selectedRow && selectedRow !== undefined && selectedRow !=="" && selectedRow !== null){
        selectedCard = this.view.segCards.data[selectedRow];
      }
      var cardNumber   =   selectedCard.cardNumber;
      var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
	  enrollModule.presentationController.validateCVV(cardNumber,CVV);
    }
  },
  setKeypadChar: function(char) {
    this.keypadString = this.keypadString + char;
    if (this.keypadString.length === 3) {
      this.enterSecurityCodePostAction();
    } else if (this.keypadString.length < 3) {
      this.incompleteCVVCodeView();
    } else if (this.keypadString.length > 3) {
      this.keypadString= this.keypadString.slice(0, 3);
      return;
    }
    this.updateInputBullets("flxInputCVV");
  },
  clearKeypadChar: function() {
    if (this.keypadString.length === 1) {
      this.keypadString = '';
      this.updateInputBullets("flxInputCVV");
    }
    if (this.keypadString.length !== 0) {
      this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
      if (this.keypadString.length <6)
      {
        this.incompleteCVVCodeView();
      }
      this.updateInputBullets("flxInputCVV");
    }
  },
  updateInputBullets: function(inputFlx) {
    var widgets = this.view[inputFlx].widgets();
    for (var i = 0; i < this.keypadString.length; i++) {
       widgets[i].skin = "sknLbl979797SSP60px";
      // widgets[i].text = this.keypadString[i];
      widgets[i].text = "•";
    }
    for (var i = this.keypadString.length; i < widgets.length; i++) {
      widgets[i].skin = "lblBlueFocus";
      widgets[i].text = '_';
    }
    this.view.forceLayout();
  },
  enterSecurityCodePostAction:function()
  {
    this.view.btnVerify.setEnabled(true);
    this.view.btnVerify.skin = "sknBtn0095e4RoundedffffffSSP26px";
    this.view.flxInputCVV.forceLayout();
  },
  incompleteCVVCodeView : function() {
    this.view.btnVerify.skin = "sknBtna0a0a0SSPReg26px";
    this.view.btnVerify.setEnabled(false);
    this.view.flxInputCVV.forceLayout();
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  clearCVV: function() {
    var widgets = this.view["flxInputCVV"].widgets();
    for (var i = 0; i < 3; i++) {
      widgets[i].text = '_';
    }
    this.view.forceLayout();
  }
});