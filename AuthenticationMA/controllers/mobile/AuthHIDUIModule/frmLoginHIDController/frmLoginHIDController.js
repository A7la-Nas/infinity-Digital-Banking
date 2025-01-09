define(["CommonUtilities"], function (CommonUtilities){
  return{
    timerCounter: 0,
    dialPadNo: "",
    lengthOfDialNo: 0,
    popupMsg:'',
    selectedLanguage: -1,
    mfaSecureAccessKey: "",
    init: function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      this.view.postShow = this.frmLoginPostshow;
    },
    frmLoginPostshow: function() {
      const self = this;
      const navManager = applicationManager.getNavigationManager();
      let appLaunchError = navManager.getCustomInfo("appLaunchError");
      if(!kony.sdk.isNullOrUndefined(appLaunchError)) {
        kony.ui.Alert(appLaunchError.basic, appLaunchError.psp);
        navManager.setCustomInfo("appLaunchError", undefined);
        return;
      }
      this.showErrorToastMessage();
      let loginData = navManager.getCustomInfo("frmLogin");
      let logindatatoast = navManager.getCustomInfo("frmLoginToast");
      if(logindatatoast && logindatatoast!== undefined && logindatatoast.postupdateusernameandpassword!== undefined){
        this.showUernamePasswordSuccessMessage(logindatatoast.postupdateusernameandpassword);
      }
      if(loginData && loginData.showPasswordUpdatedSuccessMessage){
        this.showPasswordUpdatedSuccessMessage();
      }
      this.checkForEnrollSuccess();
      const configManager = applicationManager.getConfigurationManager();
      const isEnrollMAPresent = configManager.isMicroAppPresent('SelfServiceEnrolmentMA');
      if(isEnrollMAPresent){
        const newUserManager = kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager()
        .getModule({
          moduleName: "NewUserBusinessManager",
          appName: "SelfServiceEnrolmentMA",
        }).businessController;
        newUserManager.resetEnrollObj();
      }
      
      var multiEntityValue  = "false";
      if(applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity")!==undefined){
           multiEntityValue = applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity");
        }
      if (multiEntityValue === "true") {
        this.view.btnEnroll.text = kony.i18n.getLocalizedString("i18n.Login.Activate");
      }else {
        this.view.btnEnroll.text = kony.i18n.getLocalizedString("i18n.Login.EnrollActivate");
      }
      
      this.view.btnEnroll.info = this.view.btnEnroll.text;
      
    },
    showErrorToastMessage : function(){
      const navManager = applicationManager.getNavigationManager();
      let loginData = navManager.getCustomInfo("frmLoginToast");
      if(loginData && loginData.toastMessage && loginData.toastMessage !== ""){
        this.bindGenericError(loginData.toastMessage);
        loginData.toastMessage = "";
        navManager.setCustomInfo("frmLoginToast",loginData);
      }
    },
    initActions: function(){
      this.view.flxLanguageSelection.onClick = this.showLanguages;
      this.view.btnupdateLanguage.onClick = this.btnUpdateLanguageOnClick;
      this.view.btnCancel.onClick = this.btnCancelLanguageOnClick;
      this.view.segSelectLanguage.onRowClick = this.segSelectLanguageOnRowClick;
      this.view.flxDashboard.onClick = this.accountPreview;
    },
    showUernamePasswordSuccessMessage: function(msg){
      const navManager = applicationManager.getNavigationManager();
      let loginData = navManager.getCustomInfo("frmLoginToast");
      this.bindGenericSuccess(msg);
      loginData.postupdateusernameandpassword = "";
      navManager.setCustomInfo("frmLoginToast",loginData);
    },
    showLanguages : function(){
      const self = this;
      this.view.flxSelectLanguage.isVisible = true;
      if(this.view.imgDropdown.src === "arrowup.png"){
        self.view.imgDropdown.src = "arrowdown.png";
        self.HideLanguages();
      } else {
        this.view.imgDropdown.src = "arrowup.png";
        let topValue, topback;
        if(this.view.flxWelcome.top === "20%"){
          topValue = "26.9%";
          topback = "20%"
        } else {
          topValue = "22%";
          topback = "15%"
        }
        this.animateWidgetWrapper({
          widgetId: "flxSelectLanguage",
          top0: topback,
          top0Opacity: 1,
          top100: topValue,
          top100Opacity: 1,
          animationEndCb: ()=>{}
        });
      }
    },
    HideLanguages : function(){
      const scopeObj = this;
      let topValue, topback;
      if(this.view.flxWelcome.top === "20%") {
        topValue = "27%";
        topback = "20%";
      } else {
        topValue = "22%";
        topback = "15%";
      }
      const animationEndCb = function(){
        this.view.flxSelectLanguage.setVisibility(false);
        this.view.imgDropdown.src = "arrowdown.png";
      };
      this.animateWidgetWrapper({
        widgetId: "flxSelectLanguage",
        top0: topValue,
        top0Opacity: 0,
        top100: topback,
        top100Opacity: 0,
        animationEndCb: animationEndCb.bind(scopeObj)
      });
    },
     animateWidgetWrapper: function({
      widgetId,
      top0,
      top0Opacity,
      top100,
      top100Opacity,
      animationEndCb = () => {}
    }){
      this.view[widgetId].animate(
        kony.ui.createAnimation({
          "0": {
            "anchorPoint": {
              "x": 0.5,
              "y": 0.5
            },
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
            "rectified": true,
            "top": top0,
            "opacity": top0Opacity
          },
          "100": {
            "anchorPoint": {
              "x": 0.5,
              "y": 0.5
            },
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
            "rectified": true,
            "top": top100,
            "opacity": top100Opacity
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.3
        }, {
          "animationEnd": animationEndCb
        });
    },
    segSelectLanguageOnRowClick: function() {
      const navMan = applicationManager.getNavigationManager();
      const config = applicationManager.getConfigurationManager();
      let selectedSectionIndex = Math.floor(this.view.segSelectLanguage.selectedRowIndex[0]);
      let selectedRowIndex = Math.floor(this.view.segSelectLanguage.selectedRowIndex[1]);
      this.selectedLanguage = this.getBackendLanguage(this.view.segSelectLanguage.data[selectedRowIndex].lblLanguage);
      let currentLocale = kony.i18n.getCurrentLocale();
      if (currentLocale === 'en') {
        currentLocale = 'en_US';
      }
      if (currentLocale === config.locale[this.selectedLanguage]) {
        this.view.btnupdateLanguage.setEnabled(false);
        this.view.btnupdateLanguage.skin = "sknBtna0a0a0SSPReg26px";
      } else {
        this.view.btnupdateLanguage.setEnabled(true);
        this.view.btnupdateLanguage.skin = "sknBtn0095e4RoundedffffffSSP26px";
      }
    },
    btnUpdateLanguageOnClick: function() {
      var config = applicationManager.getConfigurationManager();
      var scope = this;
      var basicProperties ={
        "message": applicationManager.getPresentationUtility().getStringFromi18n("i18n.common.changeLanguageMessage") + " " + scope.selectedLanguage + " ?",
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "alertTitle": "",
        "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Yes"),
        "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
        "alertIcon": "",
        "alertHandler": function(response) {
          if(response){
            scope.changeLanguage();
          }
        }
      };
      applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
    },
    changeLanguage : function(){
      var sm = applicationManager.getStorageManager();
      var config = applicationManager.getConfigurationManager();
      var index =Math.floor(this.view.segSelectLanguage.selectedRowIndex[1]);
      var langObj = {
        "language": this.selectedLanguage,
        "index": index,
        "flow": config.constants.LANG_CHANGE_FROM_LOGIN
      };
      this.view.flxLanguageSelection.lblLanguageValue.text = this.selectedLanguage;
      sm.setStoredItem("langObj", langObj);
      config.setLocaleAndDateFormat();
      var currentLocale = config.getLocale();
      if (currentLocale === 'en_US')
        currentLocale = 'en';
      if (currentLocale) {
        kony.i18n.setCurrentLocaleAsync(currentLocale, this.languageChangeOnSuccess, this.languageChangeOnFailure);
      }
    },
    languageChangeOnSuccess: function() {
      var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      authMod.presentationController.commonFunctionForNavigation("frmLanguageSelectionLoading");
    },
    languageChangeOnFailure: function() {
        kony.print("Fail");
    },
    btnCancelLanguageOnClick: function() {
        var sm = applicationManager.getStorageManager();
        var langObjFromStorage = sm.getStoredItem("langObj");
        var index = 0;
        if (!kony.sdk.isNullOrUndefined(langObjFromStorage)) {
            index = langObjFromStorage.index;
        }
        this.view.segSelectLanguage.selectedRowIndices = [
            [0, [index]]
        ];
        this.selectedLanguage = this.view.segSelectLanguage.data[index].lblLanguage;
        this.view.flxLanguageSelection.lblLanguageValue.text = this.selectedLanguage;
        this.HideLanguages();
    },
    getLanguageMasterData: function() {
        return {
           "US English" : "en_US",
           "UK English" : "en_GB",
           "Spanish" : "es_ES",
           "German" : "de_DE",
           "French" : "fr_FR",
           "Arabic" : "ar_AE"
        }
    },
    getValueFromKey : function(value){
      var configManager = applicationManager.getConfigurationManager();
      var langObject = configManager.locale;
      for (var key in langObject) {
        if (langObject.hasOwnProperty(key)) {
           var shortLang = langObject[key];
           if(shortLang===value){
               return key;
           }
        }
      }
    },
    getBackendLanguage : function(lang){
         var languageData = this.getLanguageMasterData();
         for(var key in languageData) {
            if (languageData.hasOwnProperty(key)) {
                if(key===lang){
                  return this.getValueFromKey(languageData[key]);
                }
           }
        }
    },
    setDataToLanguage: function() {
      var languageData = this.getLanguageMasterData();
      
      var translatedLanguage = {
        "US English": "English",
        "UK English": "English",
        "Spanish": "Español",
        "German": "Deutsch",
        "French": "Français",
        "Arabic": "عربي"
      };

      var data = [];
      for (var key in languageData) {
        if (languageData.hasOwnProperty(key)) {
          var language = key;
          var dataElt = {
            "imgCheckbox": {
              "src": "radiobuttonactive.png",
            },
            "lblLanguage": language,
            "lblTranslatedLanguage": translatedLanguage[language],
            "template": "flxLanguage"
          };
          data.push(dataElt);
        }
      }
      this.view.segSelectLanguage.setData(data);
      var sm = applicationManager.getStorageManager();
      var langObjFromStorage = sm.getStoredItem("langObj");
      var index = 0;
      if (!kony.sdk.isNullOrUndefined(langObjFromStorage)) {
        index = langObjFromStorage.index;
      }
      this.view.segSelectLanguage.selectedRowIndices = [
        [0, [index]]
      ];
      this.selectedLanguage = this.view.segSelectLanguage.data[index].lblLanguage;
      this.view.flxLanguageSelection.lblLanguageValue.text = this.selectedLanguage;
      this.view.btnupdateLanguage.setEnabled(false);
      this.view.btnupdateLanguage.skin = "sknBtna0a0a0SSPReg26px";
      this.view.forceLayout();
    },
    bindAccountPreViewData: function(data, timestamp){
      if(data.length == 0){
        this.bindGenericError("Failed to fetch accounts");
      } else {
        var index;
        var businessIndex = false;
        var personalIndex = false;
        for (index = 0; index < data.length; ++index) {
          var indexData = data[index];
          if(kony.sdk.isNullOrUndefined(indexData["isBusinessAccount"])) {
            indexData["isBusinessAccount"] = "false";
          }
          if(indexData["isBusinessAccount"] === "true") {
            data[index]["imgBusinessAccount"] = "businessaccount.png";
            businessIndex = true;
          } else {
            data[index]["imgBusinessAccount"] = "personalaccount.png";
            personalIndex = true;
          }
        }
        var isCombinedUser = personalIndex && businessIndex;
        if(isCombinedUser) {
          this.view.segAccountPreview.rowTemplate = "flxAccountPreviewCombined";
        } else {
          this.view.segAccountPreview.rowTemplate = "flxAccountPreview";
        }
        this.view.lblAccountPreviewTime.text = "As of " + timestamp;
        this.view.segAccountPreview.widgetDataMap = {
          lblAccountName: "lblAccountName",
          lblAccountBalValue: "lblAccountBalValue",
          lblBankName:"lblBankName",
          lblAccountBal:"lblAccountBal" ,
          imgBank: "imgBank",
          imgBusinessAccount: "imgBusinessAccount",
          lblAccountType: "lblAccountType"
        };        
        let mappedAccountPreviewData = data.map(this.getMappedAccountPreviewData);
        this.view.segAccountPreview.setData(mappedAccountPreviewData);
        this.flxDashboardOnClick();
      }
    },
    getMappedAccountPreviewData: function(accountPreviewData) {
      let {
        nickName,
        accountName,
        availableBalance,
        bankName,
        accountType,
        bankImg,
        imgBusinessAccount,
        account_type_name,
      } = accountPreviewData;
        return {
        lblAccountName: nickName || accountName,
        lblAccountBalValue: availableBalance,
        lblBankName: bankName,
        lblAccountBal: accountType,
        imgBank: bankImg,
        imgBusinessAccount: imgBusinessAccount,
        lblAccountType: account_type_name,
      };
    },
    flxDashboardOnClick: function() {
      if (this.view.imgDashboard.src === "dashboardicon.png") {
        this.view.imgDashboard.src = "dbicon_up.png";
        this.view.flxDashboard.forceLayout();
        this.view.lblWelcomeMessage.setVisibility(false);
        this.view.lblAccountPreview.setVisibility(true);
        this.view.lblAccountPreviewTime.setVisibility(true);
        this.view.flxWelcome.forceLayout();
        this.view.flxAccountPreview.setVisibility(true);
        this.view.flxContent.setEnabled(false);
        this.animateAccountPreview();
        this.animateFlxContent();          
      } else {
        this.view.imgDashboard.src = "dashboardicon.png";
        this.view.flxDashboard.forceLayout();
        this.view.lblWelcomeMessage.setVisibility(true);
        this.view.lblAccountPreview.setVisibility(false);
        this.view.lblAccountPreviewTime.setVisibility(false);
        //this.view.flxContent.setEnabled(true);
        this.view.flxWelcome.forceLayout();
        this.animateAccountPreviewBack();
        this.animateFlxContentBack();
      }
    },
    animateAccountPreview: function() {
      var topValue,topback;
      if(this.view.flxWelcome.top === "20%"){
        topValue = "26.9%";
        topback = "20%"
      } else{
        topValue = "22%";
        topback = "15%"
      }
      this.animateWidgetWrapper({
        widgetId: "flxAccountPreview",
        top0: topback,
        top0Opacity: 1,
        top100: topValue,
        top100Opacity: 1,
        animationEndCb: () => {}
      });
    },
    animateAccountPreviewBack: function() {
      const scopeObj = this;
      var topValue, topback;
      if(this.view.flxWelcome.top === "20%"){
        topValue = "27%";
        topback = "20%";
      } else {
        topValue = "22%";
        topback = "15%";
      }
      const animationEndCb = function(){
        this.view.flxAccountPreview.setVisibility(false);
      };
      this.animateWidgetWrapper({
        widgetId: "flxAccountPreview",
        top0: topValue,
        top0Opacity: 100,
        top100: topback,
        top100Opacity: 0,
        animationEndCb: animationEndCb.bind(scopeObj)
      });
    },
    animateFlxContent: function() {
      //       this.view.flxContent.animate(
      //         kony.ui.createAnimation({
      //           "100": {
      //             "anchorPoint": {
      //               "x": 0.5,
      //               "y": 0.5
      //             },
      //             "stepConfig": {
      //               "timingFunction": kony.anim.EASE
      //             },
      //             "rectified": true,
      //             "top": "70.1%",
      //           }
      //         }), {
      //           "delay": 0,
      //           "iterationCount": 1,
      //           "fillMode": kony.anim.FILL_MODE_FORWARDS,
      //           "duration": 0.3
      //         }, {
      //           "animationEnd": function() {}
      //         });
    },
    animateFlxContentBack: function() {
      var topValue;
      if(this.view.flxWelcome.top === "20%"){
        topValue = "27%";
      } else {
        topValue = "22%";
      }    
//       this.view.flxContent.animate(
//         kony.ui.createAnimation({
//           "100": {
//             "anchorPoint": {
//               "x": 0.5,
//               "y": 0.5
//             },
//             "stepConfig": {
//               "timingFunction": kony.anim.EASE
//             },
//             "rectified": true,
//             "top": topValue,
//           }
//         }), {
//           "delay": 0,
//           "iterationCount": 1,
//           "fillMode": kony.anim.FILL_MODE_FORWARDS,
//           "duration": 0.3
//         }, {
//           "animationEnd": function() {}
//         });
    },
    roundNum: function(num, decimals) {
      var t = Math.pow(10, decimals);
      return (Math.round((num * t) + (decimals > 0 ? 1 : 0) * (Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
    },
    customAlertPopUpFlxCancelOnClick:function(){
      this.view.customAlertPopUp.setVisibility(false);
      this.view.flxContent.setEnabled(true);
      this.view.flxFooter.setEnabled(true);
      this.view.flxWelcome.setEnabled(true);
      kony.localAuthentication.cancelAuthentication();
      this.view.flxPopup.setVisibility(false);
      this.view.forceLayout();
    },
    adjustFooterUIWrapper: function(){
      const configManager = applicationManager.getConfigurationManager();
      const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
      const isEnrollMAPresent = configManager.isMicroAppPresent('SelfServiceEnrolmentMA');
      this.adjustFooterUI({isAboutUsMAPresent, isEnrollMAPresent});
    },
    adjustFooterUI: function({isAboutUsMAPresent, isEnrollMAPresent}){
      if(isAboutUsMAPresent===true && isEnrollMAPresent===true){
        this.view.btnLocate.setVisibility(true);
        this.view.btnEnroll.setVisibility(true);
        this.view.btnSupport.setVisibility(true);
        this.view.btnLocate.width = "32%";
        this.view.btnEnroll.width = "32%";
        this.view.btnSupport.width = "32%";
        this.view.flxVerticalSeperator.setVisibility(true);
        this.view.flxVerticalSeperator2.setVisibility(true);
      } else if(isAboutUsMAPresent===false && isEnrollMAPresent===true) {
        this.view.btnLocate.setVisibility(false);
        this.view.btnEnroll.setVisibility(true);
        this.view.btnSupport.setVisibility(false);
        this.view.btnEnroll.width = "100%";
        this.view.flxVerticalSeperator.setVisibility(false);
        this.view.flxVerticalSeperator2.setVisibility(false);
      } else if(isAboutUsMAPresent===true && isEnrollMAPresent===false){
        this.view.btnLocate.setVisibility(true);
        this.view.btnEnroll.setVisibility(false);
        this.view.btnSupport.setVisibility(true);
        this.view.btnLocate.width = "48.25%";
        this.view.btnSupport.width = "49%";
        this.view.flxVerticalSeperator.setVisibility(true);
        this.view.flxVerticalSeperator2.setVisibility(false);
      } else if(isAboutUsMAPresent===false && isEnrollMAPresent===false){
        this.view.flxFooter.setVisibility(false);
      }
    },
    resetLoginUI : function (){
      this.adjustFooterUIWrapper();
      this.view.flxAccountPreview.top="27%";
      //this.view.flxContent.top="27%";
      this.view.imgKonyLogo.top="3%";
      this.view.imgKonyLogo.height = "14%";
      this.view.flxWelcome.top="20%";
      this.view.flxShadow.top = "18.5%";
      //this.view.flxAccountPreview.setVisibility(false);      
      this.view.lblWelcomeMessage.setVisibility(true);
      this.view.lblAccountPreview.setVisibility(false);
      this.view.lblAccountPreviewTime.setVisibility(false);
      this.view.flxPopup.setVisibility(false);
      this.view.imgDashboard.src = "dashboardicon.png";
      //this.view.flxContent.forceLayout();
      this.view.customAlertPopUp.setVisibility(false);
      this.view.forceLayout();
      this.view.flxWelcome.setEnabled(true);
      //this.view.flxContent.setEnabled(true);
      this.view.flxFooter.setEnabled(true);
    },
    loginFunctionalPreshow: function() {      
      var configManager = applicationManager.getConfigurationManager();
      this.view.lblWelcomeMessage.left="20dp";
      if(configManager.appLaunchedMode.length === 0) {
        configManager.appLaunchedMode = "normal"
      }
      var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      var navData=applicationManager.getNavigationManager().getCustomInfo("frmLogin");
      if (navData && !(navData.isFirstTimeLoginUname) && (navData.isRememberMeOn) && (navData.userName)){
        var userPreferencesManager = applicationManager.getUserPreferencesManager();
        var firstname = userPreferencesManager.getUserFirstName();
        var lastname = userPreferencesManager.getUserLastName();
        this.view.lblWelcomeMessage.text = kony.i18n.getLocalizedString("kony.mb.Welcome")+" "+kony.i18n.getLocalizedString("kony.mb.login.back")+" "+firstname+" "+lastname;
        this.view.lblWelcomeMessage.text = this.view.lblWelcomeMessage.text.trim()+".";
      } else {
        this.view.lblWelcomeMessage.text = kony.i18n.getLocalizedString("kony.mb.Welcome");
      }      
      this.showWelcomeBackUser(navData);
      if(navData && navData.isAccountPreviewEnabled){
        this.view.flxDashboard.setVisibility(true);
        this.view.lblWelcomeMessage.left="60dp";
      } else {
        this.view.flxDashboard.setVisibility(false);
        this.view.lblWelcomeMessage.left="20dp";
      }
    },
    showWelcomeBackUser: function(loginData){
      if(loginData && loginData.usernameFromForgotUsername && (loginData.usernameFromForgotUsername !== undefined || loginData.usernameFromForgotUsername !== "")){
        this.view.lblWelcomeMessage.text = "Welcome Back " + loginData.usernameFromForgotUsername;
      } else if (loginData && loginData.NUOUsername && (loginData.NUOUsername !== undefined || loginData.NUOUsername !== "")){
        this.view.lblWelcomeMessage.text = "Welcome Back " + loginData.NUOUsername;
      }
    },
    accountPreview :function(){
      if(this.view.flxAccountPreview.isVisible === false ){
        var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        authMod.presentationController.showAccountPreview();
      } else{
        this.flxDashboardOnClick();
      }
    },
    frmLoginPreShow:function(){
      const configManager = applicationManager.getConfigurationManager();
      const isCampaignMAPresent = configManager.isMicroAppPresent('CampaignMA');      
      if(isCampaignMAPresent){
        this.view.campaignCarousel.setVisibility(true);
      } else {
        this.view.campaignCarousel.setVisibility(false);
      }
      if(kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)){
        applicationManager.getPresentationUtility().showLoadingScreen();
      }
      var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      authMode.presentationController.startUpCompleted();
      this.view.flxWelcome.setVisibility(true);
      this.initActions();
      this.setFlowActions();
      this.resetLoginUI();
      this.loginFunctionalPreshow();
      this.setDataToLanguage();      
      this.changeUIBasedOnLoginPopupVisibility(false);
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      this.view.flxWelcome.zIndex = 10;
      var loggerManager = applicationManager.getLoggerManager();
      loggerManager.setCustomMetrics(this,true,"#App Launch");
      this.view.SecurityQuestionsComponent.setVisibility(false);
      this.view.SecurityCodeComponent.setVisibility(false);
      this.view.login.top = "27%";      
    },
    setFlowActions: function(){
      // Method to capture Events of SecurityCode, SecurityQuestions MFA Components & login, loginPopups.
      let scopeObj = this;
      scopeObj.view.SecurityCodeComponent.rememberDeviceRegFlag = function (rememberDeviceReg) {
        scopeObj.setRememberDeviceRegFlag(rememberDeviceReg);
      };
      scopeObj.view.SecurityCodeComponent.onSuccessCallback = function (response) {
        scopeObj.mfaComponentsOnVerifySuccess(response);
      };
      scopeObj.view.SecurityCodeComponent.onFailureCallback = function (response) {
        scopeObj.mfaComponentsOnLogout(response);
      };
      scopeObj.view.SecurityCodeComponent.onCancel = function (response) {
        scopeObj.mfaComponentsOnLogout();
      };
      scopeObj.view.SecurityQuestionsComponent.rememberDeviceRegFlag = function (rememberDeviceReg) {
        scopeObj.setRememberDeviceRegFlag(rememberDeviceReg);
      };
      scopeObj.view.SecurityQuestionsComponent.onSuccessCallback = function (response) {
        scopeObj.mfaComponentsOnVerifySuccess(response);
      };
      scopeObj.view.SecurityQuestionsComponent.onFailureCallback = function (response) {
        scopeObj.mfaComponentsOnLogout(response);
      };
      scopeObj.view.SecurityQuestionsComponent.onCancel = function () {
        scopeObj.mfaComponentsOnLogout();
      };
      this.view.login.onFocusStart = this.tbxOnTouchStart;
      this.view.login.onFocusEnd = this.animateflxContentAndWelcomeFlexBack;
      this.view.login.hideDashboardIcon = this.hideFlxDashboard;
      this.view.login.onLoginSuccess = function(loginSuccessObj){
        scopeObj.loginSuccessNavigate(loginSuccessObj);
      };
      this.view.login.onLoginFailure = function(loginFailureObj){
        scopeObj.bindGenericError(loginFailureObj);
      };
      this.view.login.setErrorStatus = function(errorData){
        scopeObj.setErrorStatus(errorData);
      };
      this.view.login.forgotNavigation = function(enteredUsername){
        scopeObj.forgotNavigation(enteredUsername);
      };
      this.view.login.setUIAtFormLevelEvent = function(loginType){
        scopeObj.changeUIBasedOnLoginType(loginType);
      };
      this.view.login.initiateLoginFlow = function(loginType){
        scopeObj.initiateLoginFlow(loginType);
      };
      this.view.loginPopups.onLoginSuccess = function(loginSuccessObj){
        scopeObj.loginSuccessNavigate(loginSuccessObj);
      };
      this.view.loginPopups.onPopupVisible = function(isPopupVisible){
        scopeObj.changeUIBasedOnLoginPopupVisibility(isPopupVisible);
      };
      this.view.loginPopups.onLoginFailure = function(loginFailureObj){
        scopeObj.bindGenericError(loginFailureObj);
      };
      this.view.campaignCarousel.onDownloadComplete = function(){
        scopeObj.view.login.textboxFocus();
      }
    },
    toggleSwitch : function(){
      var self = this;
      if(this.view.flxSwitch.left === "0dp"){
        self.animate(self.view.flxSwitchBackground,self.view.flxSwitch,"20dp");
        self.animateShadow(self.view.flxSwitchShadow,"18dp");
      } else {
        self.animate(self.view.flxSwitchBackground,self.view.flxSwitch,"0dp");
        self.animateShadow(self.view.flxSwitchShadow,"0dp");
      }
    },
    animate: function(parentWidget, widget, value){
      var self = this;
      widget.animate(
        kony.ui.createAnimation({
          "100": {
            "left": value,
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            }
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.25
        }, {
          "animationEnd": function(){
            if(widget.left === "0dp" ){
              parentWidget.skin = "sknflxa0a0a0Switch";
            } else if(widget.left === "20dp"){
              parentWidget.skin = "sknflx0095e4B0095e4100pxRadius2";
            }
          }
        });
    },
    animateShadow: function(widget,value){
      var self = this;
      widget.animate(
        kony.ui.createAnimation({
          "100": {
            "left": value,
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            }
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.25
        }, {
          "animationEnd": function(){}
        });
    },
    showPasswordUpdatedSuccessMessage: function(){
      var msg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.login.pwdUpdateMsg");
      this.bindGenericSuccess(msg);
      var navManager = applicationManager.getNavigationManager();
      var loginData = navManager.getCustomInfo("frmLogin");
      loginData.showPasswordUpdatedSuccessMessage = false;
      navManager.setCustomInfo("frmLogin",loginData);
    },
    bindGenericError: function(msg){
      applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
    },
    bindGenericSuccess: function(msg){
      applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, msg);
    },
    bindLoginErrorMessage: function(err){
      var scope = this;
      //applicationManager.getDataProcessorUtility().showToastMessageError(this,err,scope.clearUsernamePwd);
    },
    bindPinError: function(err){
      var scope = this;
      //applicationManager.getDataProcessorUtility().showToastMessageError(this,err,scope.clearProgressFlexLogin);
    },
    checkForEnrollSuccess : function(){
      this.popupMsg = "";
      var navManager = applicationManager.getNavigationManager();
      var enrollInfo = navManager.getCustomInfo("frmEnrollSignUp");
      if(enrollInfo !== null && enrollInfo !== undefined){
        if(enrollInfo.isEnrollSuccess){
          var msg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.Congrats") + " " +enrollInfo.userName + "! " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.successMessage");
          this.popupMsg = msg;
          this.bindGenericSuccess(msg);
        }
        navManager.setCustomInfo("frmEnrollSignUp", null);
      }
    },
    animateWidgetOnTbxTouch: function(widgetId, top){
      this.view[widgetId].animate(
        kony.ui.createAnimation({
          "100": {
            "anchorPoint": {
              "x": 0.5,
              "y": 0.5
            },
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
            "rectified": true,
            "top": top,
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.3
        }, {
          "animationEnd": function() {}
        });
    },
    animateImgKonyLogoOnTouch: function(height){
      this.view.imgKonyLogo.animate(
        kony.ui.createAnimation({
          "100": {
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
            "height": height
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.25
        }, {
          "animationEnd": function() {}
        });
    },
    tbxOnTouchStart: function() {
      // Linked to onFocusStart Event of login COMPONENT
      let widgetsList = [
        {widgetId: "flxWelcome", top: "15%"},
        {widgetId: "flxShadow", top: "13.5%"},
        {widgetId: "login", top: "21.7%"}
      ];
      for(let i=0; i<widgetsList.length; i++){
        const {widgetId, top} = widgetsList[i];
        this.animateWidgetOnTbxTouch(widgetId, top);
      }
      this.animateImgKonyLogoOnTouch("9%");
    },
    animateflxContentAndWelcomeFlexBack: function(){
      // Linked to onFocusEnd Event of login COMPONENT
      let widgetsList = [
        {widgetId: "flxWelcome", top: "20%"},
        {widgetId: "flxShadow", top: "20%"},
        {widgetId: "login", top: "27%"}
      ];
      for(let i=0; i<widgetsList.length; i++){
        const {widgetId, top} = widgetsList[i];
        this.animateWidgetOnTbxTouch(widgetId, top);
      }
      this.animateImgKonyLogoOnTouch("14%");
    },
    changeUIBasedOnLoginType: function(loginType){
      /** ACCESSED: when setUIAtFormLevelEvent event raised from 'login' COMPONENT */      
      if(this.view.loginPopups){
        this.view.loginPopups.zIndex = 2;
        if(loginType==="password"){
          this.view.loginPopups.setVisibility(false);
          this.changeUIBasedOnLoginPopupVisibility(false);
        } else {
          this.view.loginPopups.setVisibility(true);          
        }
        this.view.loginPopups.setVisibilityForSpecificLoginType(loginType);
      } else {
        this.changeUIBasedOnLoginPopupVisibility(false);
      }
    },
    changeUIBasedOnLoginPopupVisibility: function(isPopupOpen){
      // To change UI when opening/closing the popup in loginPopups Component.
      this.view.flxWelcome.setEnabled(!isPopupOpen);
      this.view.flxFooter.setEnabled(!isPopupOpen);
      this.view.login.setEnabled(!isPopupOpen);
      if(this.view.loginPopups){
        if(isPopupOpen){
          this.view.loginPopups.zIndex = 800;
        } else {
          this.view.loginPopups.zIndex = 2;
        }
      }
    },
    hideFlxDashboard: function(){
      // Linked to hideDashboardIcon Event of login COMPONENT
      this.view.flxDashboard.setVisibility(false);
      this.view.lblWelcomeMessage.left = "20dp";
    },
    setErrorStatus: function(response){
      // Linked to setErrorStatus Event of login COMPONENT
      let authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");      
      authMod.presentationController.asyncManager.setErrorStatus(response.serviceNumber, response.serviceResponse);
    },
    loginSuccessNavigate: function(data){
      // Linked to onLoginSuccess Event of login COMPONENT
      let authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      authMode.presentationController.currentAuthMode = data["currentAuthMode"];
      authMode.presentationController.rememberdeviceregflag = data["rememberdeviceregflag"];
      authMode.presentationController.setUsernamePasswordJSON(data["UsernamePasswordJSON"]);
      authMode.presentationController.presentationLoginSuccess(data["resSuccess"]);
    },
    forgotNavigation: function(enteredUserName) {
      // Linked to forgotNavigation Event of login COMPONENT
      const authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      authMode.presentationController.forgotNavigationNew(enteredUserName);
    },
    initiateLoginFlow: function(loginMode){
      // Linked to 'initiateLoginFlow' event of login COMPONENT
      // This method executes certain methods for faceid/touchid login flow.
      if(loginMode==="faceid"){
        this.faceIdLogin();
      } else if(loginMode==="touchid"){
        this.touchIdLogin();
      } else if(loginMode==="pin"){
        this.changeUIBasedOnLoginPopupVisibility(true);
      }
    },
    faceIdLogin: function(){
      const scopeObj = this;
      scopeObj.changeUIBasedOnLoginType("faceid"); // This will make the loginPopups Component Visible
      scopeObj.changeUIBasedOnLoginPopupVisibility(true); // Since popup has will open so changing zIndex of loginPopups Component
      scopeObj.view.loginPopups.initiateLoginFlow("faceid");
    },
    touchIdLogin: function(){
      const scopeObj = this;
      const deviceManager = applicationManager.getDeviceUtilManager();
      if(deviceManager.isTouchIDSupported()){
         scopeObj.changeUIBasedOnLoginType("touchid");
         scopeObj.changeUIBasedOnLoginPopupVisibility(true);
         scopeObj.view.loginPopups.initiateLoginFlow("touchid");   
      } else {
        scopeObj.setTouchIdflag(false);
        scopeObj.setLoginPasswordUI();
      }
    },
    setLoginPasswordUI: function(){
     // this.setDefaultMode("password");  ARB-23558
      this.changeUIBasedOnLoginPopupVisibility(false);
     // this.changeUIBasedOnLoginType("password"); ARB-23558
    },
    setDefaultMode: function(authMode) {
      const userManager = applicationManager.getUserPreferencesManager();
      userManager.setDefaultAuthMode(authMode);
    },
    setFaceIdflag: function(value) {
      const userManager = applicationManager.getUserPreferencesManager();
      userManager.updateFaceIdFlag(value);
    },    
    setTouchIdflag: function(value) {
      const userManager = applicationManager.getUserPreferencesManager();
      userManager.upadateTouchIdFlag(value);
    },
    mfaComponentsOnVerifySuccess: function(response){
      // Linked to onVerifySuccess Event of SecurityQuestions & SecurityCode COMPONENTS
      const authMod= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      authMod.presentationController.mfaLoginFlow(response);
    },    
    mfaComponentsOnLogout: function(response){
      // Linked to onLogout Event of SecurityQuestions & SecurityCode COMPONENTS
      if(response){
        let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLoginToast");
        loginData = loginData ? loginData : {};
        loginData.toastMessage = response.errorMessage;
        applicationManager.getNavigationManager().setCustomInfo("frmLoginToast",loginData);
      }      
      const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      authMod.presentationController.onLogout();
    },
    setRememberDeviceRegFlag: function(flag){
      // Linked to rememberDeviceRegFlag Event of SecurityQuestions & SecurityCode COMPONENTS
      const authMod= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      authMod.presentationController.rememberdeviceregflag=flag;
    },
    initMFAFlow:function(mfaJSON){
      // Invoked from Presentation Controller to decide which mfa COMPONENT to open
      let mfaAttributes = mfaJSON.response.MFAAttributes;
      let mfaType = mfaAttributes.MFAType;
      this.mfaSecureAccessKey = mfaAttributes.serviceKey;
      this.navigateBasedOnMFAType(mfaType, mfaJSON);
    },    
    navigateBasedOnMFAType: function(mfaType, mfaJSON){
      const scopeObj = this;
      switch(mfaType){
        case "SECURE_ACCESS_CODE" :
          scopeObj.view.SecurityCodeComponent.setVisibility(true);
          scopeObj.view.SecurityQuestionsComponent.setVisibility(false);
          scopeObj.view.SecurityCodeComponent.setContext(mfaJSON);
          break;
        case "SECURITY_QUESTIONS" :
          scopeObj.view.SecurityQuestionsComponent.setVisibility(true);
          scopeObj.view.SecurityCodeComponent.setVisibility(false);
          scopeObj.view.SecurityQuestionsComponent.setContext(mfaJSON);
          break;
      }
    },
    getServicekey: function(){
      // Invoked from Presentation Controller
      return this.mfaSecureAccessKey;
    },
  };
});
