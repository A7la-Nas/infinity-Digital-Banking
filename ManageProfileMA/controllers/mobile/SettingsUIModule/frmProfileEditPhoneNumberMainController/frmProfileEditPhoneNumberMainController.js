define(["CommonUtilities","SCAUtility"], function (CommonUtilities, SCAUtility){
  const SDKConstants = {
    "PIN_REQUEST" : 100,
    "OKRA_OTP_GENERATED" : 107,
    "TX_ACCEPTED" : 101,
    "TX_DENIED"   : 102
  };
  const SCAPhoneContext = {
    serviceName: "UPDATE_PHONE_NUMBER",
    phoneNumbers: null,
    modifiedByName: null,
    userName: null
  };
  return{
  selectedType : "",
  PhoneTypes : {},
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  keypadString: '',
  timerCounter: 0,
  currentInputModule: 'phonenumber',
  preShow: function () {
    var scopeObj = this;
    scopeObj.PhoneTypes = {
      'Mobile': kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Mobile"),
      'Work': kony.i18n.getLocalizedString("i18n.common.Work"),
      'Home': kony.i18n.getLocalizedString("kony.tab.common.home"),
      'Other': kony.i18n.getLocalizedString("i18n.cardsManagement.others")
    };
    scopeObj.selectedType = "";
    scopeObj.initActions();
    scopeObj.titleFlowChange();
    this.view.flxPhoneType.isVisible = false;
    this.view.flxConfirmationPopUp.isVisible=false;
    this.view.imgArrow.src = "arrowdown.png";
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
    var navManager = applicationManager.getNavigationManager();
    var jsonValue = navManager.getCustomInfo("frmProfileEditPhoneNumberMain");
    this.onNavigate(jsonValue.flow);
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    const configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
    configurationSvc.getAllClientAppProperties((response) => {
      CommonUtilities.CLIENT_PROPERTIES = {...CommonUtilities.CLIENT_PROPERTIES, ...response};
    });
    this.setSegData();
    if(this.view.sdk){
      this.view.remove(this.view.sdk);
    }
  },
  
  setSegData : function(){
    try{
      this.view.segDisplayType.isVisible = false;
      this.view.segDisplayType.widgetDataMap = {
        "lblTitle" : "lblTitle",
        "imgPhoneNoTypeToggle" : "imgPhoneNoTypeToggle",
        "flxPhoneNoTypeToggle" : "flxPhoneNoTypeToggle",
      };

      var segData = [kony.i18n.getLocalizedString("kony.tab.common.home"), kony.i18n.getLocalizedString("i18n.common.Work"), kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Mobile"), kony.i18n.getLocalizedString("i18n.cardsManagement.others")];
      var finalArr = [];
      var tempArr = [];
      for(var i in segData){
        var obj = {
          "lblTitle": {"text" : segData[i]},
          "imgPhoneNoTypeToggle":  {"src" :"radiobuttoninactive_big.png"}
        }
        finalArr.push(obj);
      }
      //finalArr.push(tempArr);
      this.view.segDisplayType.setData(finalArr);
    }catch(e){
      kony.print(e);
    }
  },
  initActions :function(){
    var scopeObj = this;
    this.view.keypad.btnOne.onClick = function(){
      scopeObj.setKeypadChar("1");
    };
    this.view.keypad.btnTwo.onClick = function(){
      scopeObj.setKeypadChar("2");
    };
    this.view.keypad.btnThree.onClick = function(){
      scopeObj.setKeypadChar("3");
    };
    this.view.keypad.btnFour.onClick = function(){
      scopeObj.setKeypadChar("4");
    };
    this.view.keypad.btnFive.onClick = function(){
      scopeObj.setKeypadChar("5");
    };
    this.view.keypad.btnSix.onClick = function(){
      scopeObj.setKeypadChar("6");
    };
    this.view.keypad.btnSeven.onClick = function(){
      scopeObj.setKeypadChar("7");
    };
    this.view.keypad.btnEight.onClick = function(){
      scopeObj.setKeypadChar("8");
    };
    this.view.keypad.btnNine.onClick = function(){
      scopeObj.setKeypadChar("9");
    };
    this.view.keypad.btnZero.onClick = function(){
      scopeObj.setKeypadChar("0");
    };
    this.view.keypad.imgClearKeypad.onTouchEnd = function(){
      scopeObj.clearKeypadChar("");
    };
    this.view.confirmationAlertPopup.onClickflxYes=function(){
      scopeObj.onBtnDeleteClick();
    };

    this.view.confirmationAlertPopup.onClickflxNo=function(){
      scopeObj.deleteCancel();
    };
    
    this.view.flxCheckboxPrimary.onClick = function(){
      scopeObj.toggle(scopeObj.view.imgCheckboxPrimary);
      scopeObj.validatePhone();
    };
    this.view.flxCheckboxInternational.onClick = function(){
      scopeObj.toggle(scopeObj.view.imgCheckboxInternational);
      scopeObj.validatePhone();
    };
    this.view.customHeader.flxBack.onClick = function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    };
    this.view.customHeader.btnRight.onClick = function(){
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
      settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
    };
    this.view.segDisplayType.onRowClick = function () {
      try{
      var type = "";
      var segLayout = scopeObj.view.segDisplayType;
      segLayout.isVisible = false;
      scopeObj.view.imgArrow.src = "arrowdown.png";
      var indexval = segLayout.selectedIndex[1];
      var index = parseInt(indexval);
      var rowval = segLayout.data[index];
      type = rowval.lblTitle.text;
      scopeObj.view.lblEnterPhoneNumberHeader.text = kony.i18n.getLocalizedString("i18n.common.Type")+"(" + type + ")";
      for (var i = 0; i < segLayout.data.length; i++) {
        var rowInfo = segLayout.data[i];
        if (segLayout.data[i].lblTitle.text === type && segLayout.data[i].imgPhoneNoTypeToggle.src === "radiobuttoninactive_big.png") {
          var checkedRadio = {
            lblTitle: {"text" :rowInfo.lblTitle.text},
            imgPhoneNoTypeToggle: {"src": "radiobtn_big.png"}
          };
          scopeObj.selectedType = rowInfo.lblTitle.text;
          segLayout.setDataAt(checkedRadio, i);
        }else{
          var UncheckedRadio = {
            lblTitle: {"text" :rowInfo.lblTitle.text},
            imgPhoneNoTypeToggle: {"src" : "radiobuttoninactive_big.png"}
          };
          segLayout.setDataAt(UncheckedRadio, i);
        }
      }
      }catch(e){
        kony.print(""+e);
      }
    };
    this.view.flxEnterPhoneNumberDropdown.onClick = function(){
      try{
      var segLayout = scopeObj.view.segDisplayType;
      if(scopeObj.view.segDisplayType.isVisible === true){
        segLayout.isVisible=false;
        scopeObj.view.imgArrow.src = "arrowdown.png";
      }else{
        segLayout.isVisible=true;
        scopeObj.view.imgArrow.src = "arrowup.png";
      }
        var self= this;
      var nav = applicationManager.getNavigationManager();
      var data1 = nav.getCustomInfo('frmProfileEditPhoneNumberMain');
        data1 = data1.data;
        var type = this.PhoneTypes[data1.Extension];
        if(scopeObj.selectedType == ""){//if(segLayout.selectedItems === null){
          if(!kony.sdk.isNullOrUndefined(segLayout)){
            for(var i=0; i< segLayout.data.length; i++){
              if(segLayout.data[i].lblTitle.text === type && segLayout.data[i].imgPhoneNoTypeToggle.src === "radiobuttoninactive_big.png"){
                var checkedRadio = {
                  lblTitle: {"text" : segLayout.data[i].lblTitle.text},
                  imgPhoneNoTypeToggle:  {"src" :"radiobtn_big.png"}
                };
                segLayout.setDataAt(checkedRadio, i);
              }else {
                var UncheckedRadio = {
                  lblTitle:  {"text" :segLayout.data[i].lblTitle.text},
                  imgPhoneNoTypeToggle:  {"src" :"radiobuttoninactive_big.png"}
                };
                segLayout.setDataAt(UncheckedRadio, i);
              }
            }
          }
        }
      }catch(es){
        kony.print(es);
      }
    };
    this.view.flxCode.onTouchEnd = this.showCountriesList;
  },
  onNavigate : function(param){
    var self = this;
    var configManager = applicationManager.getConfigurationManager();
    if (configManager.isRBUser === "true" || configManager. isSMEUser === "true") {
      self.view.flxDropdowm.isVisible = false;
    }else {
      self.view.flxDropdowm.isVisible = true;
    }
    if(param === "add"){
      self.setAddFlow();
    }
    else if(param === "edit"){
      self.setEditFlow();
    }
  },
  setAddFlow : function(){
    var scopeObj = this;
    scopeObj.incompleteView();
    this.view.flxDropdowm.setVisibility(false);
    this.view.flxInternational.setVisibility(false);
    this.view.segDisplayType.isVisible = false;
    this.view.btnVerifyPhoneNumber.text = kony.i18n.getLocalizedString("kony.mb.common.continue");
    this.view.btnVerifyPhoneNumber.setVisibility(true);
    this.view.btnVerifyPhoneNumber.bottom="10dp";
    this.view.imgCheckboxPrimary.src = "checkboxempty.png";
    this.view.imgCheckboxInternational.src = "checkboxempty.png";
    this.view.btnDelete.setVisibility(false);
    this.view.flxPrimary.isVisible = true;
    this.view.lblCode.text = this.setCountryCode();
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var data = settingsMode.presentationController.getPhoneBuilderObject();
    this.view.lblEnterPhoneNumberHeader.text = "Type("+data.type+")";
    var length = this.keypadString.length;
    for(var i=0;i<length;i++){
      scopeObj.clearKeypadChar("");
    }
    this.view.lblPhoneNumber.text = scopeObj.keypadString;
    this.view.btnVerifyPhoneNumber.onClick = function(){
      var number = scopeObj.keypadString;
      number = number.replace('(','');
      number = number.replace(')','');
      number = number.replace('-','');
      var isPrimary = "false";
      if(scopeObj.view.imgCheckboxPrimary.src === "checkboxtick.png"){
        isPrimary = "true";
      }
      var phoneCountryCode = scopeObj.view.lblCode.text;
      settingsMode.presentationController.createOrUpdatePhoneBuilderObject('phoneNumber',number);
      settingsMode.presentationController.createOrUpdatePhoneBuilderObject('phoneCountryCode',phoneCountryCode);
      settingsMode.presentationController.createOrUpdatePhoneBuilderObject('isPrimary',isPrimary);
      //settingsMode.addUserPhoneNumber();
      settingsMode.presentationController.navigateToAddPhoneNumberConfirmPage();
    };
  },
  setEditFlow : function(){
    var scopeObj = this;
    scopeObj.incompleteView();
    this.view.flxInternational.setVisibility(true);
    this.view.btnVerifyPhoneNumber.text = kony.i18n.getLocalizedString("kony.mb.Profile.UpdateChanges");
    this.view.btnVerifyPhoneNumber.setVisibility(true) ;
    this.view.btnVerifyPhoneNumber.bottom="60dp";
    this.view.btnDelete.setVisibility(true);
    this.view.flxDropdowm.setVisibility(true);
    this.view.btnDelete.onClick = function(){
      scopeObj.deleteYes()
    };
    this.view.btnVerifyPhoneNumber.onClick = function(){
      //scopeObj.navToEditPhoneList("edit");
      scopeObj.onUpdateButtonClick();
    };
    var nav = applicationManager.getNavigationManager();
    var data1 = nav.getCustomInfo('frmProfileEditPhoneNumberMain');
    data1 = data1.data;
    //     var type = data1.type;
    //     var phoneNumber = data1.phoneNumber;

    var type = data1.Extension===undefined?kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Mobile"):this.PhoneTypes[data1.Extension];
    var phoneNumber = data1.phoneNumber;
    //Temp fix;
    if(phoneNumber === undefined){
      phoneNumber = data1.Value;
    }
    var isPrimary = data1.isPrimary;
     if(isPrimary==="true")
      {
        this.primaryFlag=true;
      }
    else
      {
        this.primaryFlag=false;
      }
    var countryType = data1.countryType;
    this.selectedData = data1;
    this.view.lblEnterPhoneNumberHeader.text = "Type ("+type+")";
    //if(isPrimary === "1"){
    if(isPrimary === "true"){
      this.view.imgCheckboxPrimary.src = "checkboxtick.png";
    }
    else{
      this.view.imgCheckboxPrimary.src = "checkboxempty.png";
    }
    //if(isPrimary === "1"){
    if(isPrimary === "true"){
      this.view.flxPrimary.isVisible = false;
      this.view.btnDelete.isVisible = false;
    }
    else{
      this.view.flxPrimary.isVisible = true;
      this.view.btnDelete.isVisible = true;
    }
    if(countryType && countryType.toLowerCase() === "international"){
      this.view.imgCheckboxInternational.src = "checkboxtick.png";
    }
    else{
      this.view.imgCheckboxInternational.src = "checkboxempty.png";
    }
    scopeObj.keypadString = "";
    scopeObj.keypadString = phoneNumber;
    this.view.lblCode.text = this.setCountryCode();
    this.validatePhone();
    this.view.lblPhoneNumber.text = scopeObj.keypadString;
  },
  toggle : function(img){
    if(img.src === "checkboxtick.png"){
      img.src = "checkboxempty.png";
    }
    else
      img.src = "checkboxtick.png"
      },
  updateInputBullets: function () {
    var scope = this;
    scope.updateInputBulletsOf('(___)___-____', "flxInputPhoneNumber");
    //updateBullets[this.currentInputModule]();
  },
  updateInputBulletsOf: function (dummyString, inputFlx) {
    var widgets = this.view[inputFlx].widgets();
    for (var i = 0; i < this.keypadString.length; i++) {
      widgets[i].skin = "sknLbl979797SSP60px";
      widgets[i].text = this.keypadString[i];
    }
    for (var i = this.keypadString.length; i < widgets.length; i++) {
      widgets[i].skin = "sknLble3e3e3SSP60px";
      widgets[i].text = dummyString[i];
    }
    this.view.forceLayout();
  },
  showCountriesList : function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.getCountryCodes();
  },
  setKeypadChar: function(char) {
    this.keypadString = this.keypadString + char;
    this.view.lblPhoneNumber.text = this.keypadString;
    this.validatePhone();
    this.view.forceLayout();
    return;
  },
  clearKeypadChar: function() {
    if (this.keypadString.length === 0) return;
    this.keypadString = this.keypadString.substr(0, this.keypadString.length-1);
    this.view.lblPhoneNumber.text = this.keypadString;
    this.validatePhone();
    this.view.forceLayout();
    return;
  },
  validatePhone:function() {
    var scopeObj = this;
    var validationMan = applicationManager.getValidationUtilManager();
    if(validationMan.isValidPhoneNumber(this.keypadString))
      scopeObj.enterPostAction();
    else
      scopeObj.incompleteView();
  },
  enterPostAction: function() {
    this.view.btnVerifyPhoneNumber.setEnabled(true);
    this.view.btnVerifyPhoneNumber.skin = "sknBtn0095e4RoundedffffffSSP26px";
  },
  incompleteView: function() {
    this.view.btnVerifyPhoneNumber.skin = "sknBtna0a0a0SSPReg26px";
    this.view.btnVerifyPhoneNumber.setEnabled(false);
  },
  showPopupIncorrectCredentials: function (par) {
    var scopeObj = this;
    if (par === "invalidphoneno") {
      this.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.OnBoarding.InvaliPhoneno");
    }
    this.timerCounter = parseInt(this.timerCounter) + 1;
    var timerId = "timerPopupError" + this.timerCounter;
    this.view.flxPopup.skin = "sknFlxf54b5e";
    this.view.customPopup.imgPopup.src = "errormessage.png";
    this.view.flxPopup.setVisibility(true);
    kony.timer.schedule(timerId, function () {
      scopeObj.view.flxPopup.setVisibility(false);
      scopeObj.keypadString = '';
      scopeObj.updateInputBullets();
    }, 1.5, false);
  },
  navToEditPhoneList : function(param){
  },
  navToConfirmDetails : function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmProfileConfirmDetails");
  },
  setCountryCode : function(){
    var nav = applicationManager.getNavigationManager();
    var phoneData = nav.getCustomInfo('frmProfileEditPhoneNumberMain');
    if(!kony.sdk.isNullOrUndefined(phoneData)){
      if(!kony.sdk.isNullOrUndefined(phoneData.data.phoneCountryCode)){
        return phoneData.data.phoneCountryCode;
      }
      else if(!kony.sdk.isNullOrUndefined(phoneData.phoneCountryCode)){
        return phoneData.phoneCountryCode;
      }
    }
    return applicationManager.getConfigurationManager().getConfigurationValue("defaultCountryISDCode");
    //return '+967';
  },
  onUpdateButtonClick : function(){
         var number = this.keypadString;
          number = number.replace('(','');
          number = number.replace(')','');
          number = number.replace('-','');
          var isPrimary = "true";
          if(this.view.imgCheckboxPrimary.src === "checkboxempty.png"){
              isPrimary = "false";
          }
//          var countryType = "domestic";
//          if(this.view.imgCheckboxInternational.src === "checkboxtick.png"){
//              countryType = 'International';
//          }
          //     if(number && number.length < 10){
          //       return;
          //     }
          //var type=this.view.lblEnterPhoneNumberHeader.text;
         // this.selectedData.data.type=type.substring(type.indexOf("(")+1,type.indexOf(")"))
          var data = this.selectedData;
          data.isPrimary = isPrimary;
          //data.countryType = countryType;
          data.phoneNumber = number;
          data.phoneCountryCode = this.view.lblCode.text;
    
          /*if(this.selectedType != ""){// if(!kony.sdk.isNullOrUndefined(this.view.segDisplayType.selectedIndex)){
              // var index = parseInt(this.view.segDisplayType.selectedIndex[1]);
              // var rowval = this.view.segDisplayType.data[index];
              data.Extension = this.selectedType;//rowval.lblTitle.text;
          }else{
              var nav = applicationManager.getNavigationManager();
              var data1 = nav.getCustomInfo('frmProfileEditPhoneNumberMain');
              data1 = data1.data;
              var type;
              if(data1.Extension===undefined)
                  type = "Mobile";
              else {
                  for (var key in this.PhoneTypes) {
                      if(this.PhoneTypes[key] === data1.Extension) {
                          type = key;
                          break;
                      }
                  }
              }
              data.Extension = type;
          }*/
        if(CommonUtilities.isSCAEnabled()) {
          this.updatePhoneSCAUtility(data);
         } else {
          var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
          settingsMode.presentationController.updateUserPhoneNumber(data);
        }
      },
  onBtnDeleteClick : function(){
    var data = this.selectedData;
    var id = data.id;
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.deleteUserPhoneNumber(id);
  },
  titleFlowChange:function(){
    try{
      var navManager = applicationManager.getNavigationManager();
      var jsonValue = navManager.getCustomInfo("frmProfileEditPhoneNumberMain");
      if(jsonValue.flow==="edit" ||jsonValue.flow==="Edit" ){
        if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
          this.view.customHeader.lblLocateUs.text=kony.i18n.getLocalizedString("kony.mb.OnBoarding.EditPhoneNumber");
        }else{
          this.view.title=kony.i18n.getLocalizedString("kony.mb.OnBoarding.EditPhoneNumber");
        }
      }else{
        if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
          this.view.customHeader.lblLocateUs.text=kony.i18n.getLocalizedString("kony.mb.p2p.enterPhoneNo");
        }else{
          this.view.title=kony.i18n.getLocalizedString("kony.mb.p2p.enterPhoneNo");
        }
      }

    }catch(er){
      kony.print(er);
    }
  },
  deleteCancel : function(){
    try{
      this.view.flxConfirmationPopUp.isVisible=false;
    }catch(er){
      kony.print(er);
    }
  },
  deleteYes : function(){
    try{
      this.view.confirmationAlertPopup.lblMessage =kony.i18n.getLocalizedString("kony.tab.Profile.DeletePhoneNo");
      this.view.flxConfirmationPopUp.isVisible=true;
    }catch(er){
      kony.print(er);
    }
  },
/**
     * AAC-8579: Update Phone - SCA
     */
    updatePhoneSCAUtility: function(data){
      const userObj = applicationManager.getUserPreferencesManager();
      let phoneNumbers = [{
        "id": data.id,
        "Extension": data.type,
        "isPrimary": (data.isPrimary === "true") ? "1" : "0",
        "isAlertsRequired": "0",
        "phoneNumber": data.phoneNumber,
        "phoneCountryCode":data.prefix,
        "countryType":data.countryType
      }];
      phoneNumbers = JSON.stringify(phoneNumbers);
      phoneNumbers = phoneNumbers.replace(/"/g, "'");
      SCAPhoneContext.phoneNumbers = phoneNumbers;
      SCAPhoneContext.modifiedByName = userObj.getCurrentUserName();
      SCAPhoneContext.userName = userObj.getCurrentUserName();
      this.updatePhoneSCA();
    },
    updatePhoneSCA: function(){
      const scopeObj = this;
      const currentForm = kony.application.getCurrentForm();
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      const OKRAcontext = SCAPhoneContext.serviceName;
      var HIDApproveSDKManager = require('HIDApproveSDKManager');
      hidApplicationSDKManager = HIDApproveSDKManager.getHIDApproveSDKManager();
      var sdk = hidApplicationSDKManager.getSdkInstance();
      if(currentForm.sdk){
        currentForm.remove(sdk);
      }
      currentForm.add(sdk);
      currentForm.sdk.setVisibility(false);
      currentForm.sdk.generateOCRAOTP(userName, OKRAcontext, function(status, otpJSON) {
        const otp = JSON.parse(otpJSON).otp;
        const context = SCAPhoneContext.serviceName;
        if(SDKConstants.PIN_REQUEST === status) {
          var pinLength = JSON.parse(otpJSON).MAX_LENGTH;
          currentForm.sdk.setVisibility(true);
          currentForm.sdk.showPinDialog(pinLength);
        } else if(SDKConstants.OKRA_OTP_GENERATED === status) {
          currentForm.sdk.hidePinDialog();
          applicationManager.getPresentationUtility().showLoadingScreen();
          const servicePayload = {
            objServiceName: "SCAObjects",
            objName: "SCAUser",
            operationName: "updateMyProfileDetails",
            payload: {
              "serviceName": SCAPhoneContext.serviceName,
              "isMobile": true,
              "otp": otp,
              "context": context,
              "phoneNumbers": SCAPhoneContext.phoneNumbers,
              "modifiedByName": SCAPhoneContext.modifiedByName
            },
            successCallback: scopeObj.updatePhoneSCASuccessCallback,
            errorCallback: scopeObj.updatePhoneSCAFailureCallback
          };
          SCAUtility.callBackendService(servicePayload);
        }
      });
    },
    updatePhoneSCASuccessCallback: function(){
      const dataToDisplay = {
        msgTitle: `Success!`,
        msgDesc: `You have updated the phone number successfully.`
      };
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      const currentForm = kony.application.getCurrentForm();
      currentForm.sdk.setVisibility(true);
      currentForm.sdk.showOrHideTxStatus(SDKConstants.TX_ACCEPTED, dataToDisplay);
      currentForm.sdk.setFlowActions(this.updatePhoneSuccessNavigation);
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
      settingsMode.presentationController.updateUserPhoneNumber(this.selectedData);
    },
    updatePhoneSuccessNavigation: function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      const settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
      settingsMode.presentationController.updatePhoneSCASuccess({"flow":"editsuccess"});
    },
    updatePhoneSCAFailureCallback: function(){
      const dataToDisplay = {
        msgTitle: `Failed!`,
        msgDesc: `Phone number not updated in Infinity System.`
      };
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      const currentForm = kony.application.getCurrentForm();
      currentForm.sdk.setVisibility(true);
      currentForm.sdk.showOrHideTxStatus(SDKConstants.TX_DENIED, dataToDisplay);
      currentForm.sdk.setFlowActions();
    },
    bindViewError: function(msg) {
      applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
    },
  };
});