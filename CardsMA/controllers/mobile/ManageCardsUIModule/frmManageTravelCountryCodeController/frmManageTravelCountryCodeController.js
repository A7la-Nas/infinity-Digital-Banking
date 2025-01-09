define({
  TravelPlanDetailsRequest: {},
  TravelPlanDetailsUpdate: {},
  navOption: "",
  keypadString: '',
  timerCounter: 0,
  init : function(){
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : init ####");
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  initActions: function() {
    this.view.btnVerify.onClick = this.VerifyOnClick;
    this.view.customHeader.flxBack.onClick = this.backOnClick;
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.setKeyPadActions();
  },
  preShow: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : frmPreShow ####");
      this.keypadString = "";
      this.view.lblCode.text = "";
      this.getFrmData();
      this.view.flxPopup.setVisibility(false);
      this.initActions();
      this.renderTitleBar();
      this.goBackInfo();
      this.clearCountryCode();
      var countryCode = this.TravelPlanDetailsRequest.phoneCountryCode;
      if (!kony.sdk.isNullOrUndefined(countryCode)) {
        for (var i = 0; i < countryCode.length; i++) {
          this.setKeypadChar(countryCode[i]);
        }
      }
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  clearCountryCode: function() {
    for (var i = 0; i < 3; i++) {
      this.clearKeypadChar();
    }
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
  getFrmData: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : getFrmData ####");
      var custInfo = navManager.getCustomInfo("frmManageTravelCountryCode");
      this.TravelPlanDetailsRequest = custInfo.data;
      this.navOption = custInfo.option;
      loggerManager.log("entered this form with navigation option as: "+this.navOption);
      if (this.navOption === "edit") {
        this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.common.save");
      } else if (this.navOption === "add") {
        this.view.btnVerify.text = kony.i18n.getLocalizedString("kony.mb.common.continue");
      }
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
      } else {
        navManager.setCustomInfo("frmManageTravelSelectCards", {"option": "add","data": this.TravelPlanDetailsRequest});
      }
    } catch (exc) {
      loggerManager.log("#### in catch " + JSON.stringify(exc) + " ####");
    }
  },
  backOnClick: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : backOnClick ####");
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
      loggerManager.log("#### start " + currentForm + " : cancelOnClick ####");
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      if (this.navOption === "edit") {
        navManager.setCustomInfo("frmManageTravelDetails", this.TravelPlanDetailsRequest);
        manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelDetails");
      } else {
        manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelPlans");
      }
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  validateCountryCode:function(char) {
    if(this.keypadString.length <= 3 && this.keypadString.length >= 1)
    {
      return true;
    }
    return false;
  },
  setKeypadChar: function(char) {
    this.keypadString = this.keypadString + char;
    this.view.lblCode.text = this.keypadString;
    if(this.validateCountryCode())
    {
      this.enterPostAction();
    }
    else
    {
      this.incompleteView();
    }
    this.view.forceLayout();
    return;
  },
  clearKeypadChar: function() {
    if (this.keypadString.length === 0) return;
    this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
    this.view.lblCode.text = this.keypadString;
    if (this.validateCountryCode())
    {
      this.enterPostAction();
    }
    else
    {
      this.incompleteView();
    }
    this.view.forceLayout();
    return;
  },
  incompleteView: function() {
    this.view.btnVerify.skin = "sknBtna0a0a0SSPReg26px";
    this.view.btnVerify.setEnabled(false);
  },
  enterPostAction: function() {
    this.view.btnVerify.setEnabled(true);
    this.view.btnVerify.skin = "sknBtn0095e4RoundedffffffSSP26px";
  },
  readCountryCodeFromForm: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### start " + currentForm + " : readPhoneNumberFromForm ####");
      var countryCode = this.view.lblCode.text;
      loggerManager.log("Country code entered in frmManageTravelCountryCode: " + countryCode);
      return countryCode;
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  VerifyOnClick: function() {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      loggerManager.log("#### continueOnClick #### for form: " + currentForm);
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      this.TravelPlanDetailsUpdate = JSON.parse(JSON.stringify(this.TravelPlanDetailsRequest));
      this.TravelPlanDetailsUpdate.phoneCountryCode = this.readCountryCodeFromForm();
      if (this.navOption === "edit") {
        navManager.setCustomInfo("frmManageTravelPhoneNumber", {
          "option": "edit",
          "data": this.TravelPlanDetailsUpdate
        });
      } else if (this.navOption === "add") {
        navManager.setCustomInfo("frmManageTravelPhoneNumber", {
          "option": "add",
          "data": this.TravelPlanDetailsUpdate
        });
      }
      manageCardsModule.presentationController.commonFunctionForNavigation("frmManageTravelPhoneNumber");
    } catch (exc) {
      loggerManager.log("#### in catch " + exc + " ####");
    }
  },
  setKeyPadActions: function() {
    var scopeObj = this;
    this.view.keypad.btnOne.onClick = function() {
      scopeObj.setKeypadChar(1);
    };
    this.view.keypad.btnTwo.onClick = function() {
      scopeObj.setKeypadChar(2);
    };
    this.view.keypad.btnThree.onClick = function() {
      scopeObj.setKeypadChar(3);
    };
    this.view.keypad.btnFour.onClick = function() {
      scopeObj.setKeypadChar(4);
    };
    this.view.keypad.btnFive.onClick = function() {
      scopeObj.setKeypadChar(5);
    };
    this.view.keypad.btnSix.onClick = function() {
      scopeObj.setKeypadChar(6);
    };
    this.view.keypad.btnSeven.onClick = function() {
      scopeObj.setKeypadChar(7);
    };
    this.view.keypad.btnEight.onClick = function() {
      scopeObj.setKeypadChar(8);
    };
    this.view.keypad.btnNine.onClick = function() {
      scopeObj.setKeypadChar(9);
    };
    this.view.keypad.btnZero.onClick = function() {
      scopeObj.setKeypadChar(0);
    };
    this.view.keypad.imgClearKeypad.onTouchEnd = function() {
      scopeObj.clearKeypadChar();
    };
    // this.view.btnDot.onClick = function() {
    //    scopeObj.setKeypadChar('.');
    // };
  },
});