define(["CommonUtilities","OLBConstants"], function (CommonUtilities,OLBConstants){
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
      this.view.btnEnroll.onClick = this.navToActivate;
      this.view.btnEnroll.info = this.view.btnEnroll.text;
      if(kony.theme.getCurrentTheme()==="darkTheme"){
        this.view.imgLocateUs.src="locatedark.png";
        this.view.imgEnroll.src="groupdark.png";
        this.view.imgSupport.src="supportdark.png";
      }
      else{
        this.view.imgLocateUs.src="locateusfooter.png";
        this.view.imgEnroll.src="group.png";
        this.view.imgSupport.src="house.png";
      }
    },
    navToActivate : function(){
      const authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
authModule.presentationController.checkAppinit = true;
if(CommonUtilities.getSCAType() == 1){
      var frmName = "EnrollHIDUIModule/frmEnrollActivateProfileHID"; //"EnrollHIDUIModule/frmEnrollActivateProfileHID"
}
else if(CommonUtilities.getSCAType() == 2){
  var frmName = "EnrollUnikenUIModule/frmEnrollActivateProfileUniken"; //"EnrollHIDUIModule/frmEnrollActivateProfileHID"
}
else{
 var frmName = "EnrollUIModule/frmEnrollActivateProfile";	
}
authModule.presentationController.navigateToMicroApp({ 
  appName: "SelfServiceEnrolmentMA", 
  friendlyName: frmName,
  enrollActivate: this.view.btnEnroll.info
});

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
        this.view.flxLocateUsGroup.setVisibility(true);
        this.view.flxEnrollGroup.setVisibility(true);
        this.view.flxSupportGroup.setVisibility(true);
        this.view.flxLocateUsGroup.width = "32%";
        this.view.flxEnrollGroup.width = "32%";
        this.view.flxSupportGroup.width = "32%";
        //this.view.flxVerticalSeperator.setVisibility(true);
        //this.view.flxVerticalSeperator2.setVisibility(true);
      } else if(isAboutUsMAPresent===false && isEnrollMAPresent===true) {
        this.view.flxLocateUsGroup.setVisibility(false);
        this.view.flxEnrollGroup.setVisibility(true);
        this.view.flxSupportGroup.setVisibility(false);
        this.view.flxEnrollGroup.width = "100%";
        //this.view.flxVerticalSeperator.setVisibility(false);
        //this.view.flxVerticalSeperator2.setVisibility(false);
      } else if(isAboutUsMAPresent===true && isEnrollMAPresent===false){
        this.view.flxLocateUsGroup.setVisibility(true);
        this.view.flxEnrollGroup.setVisibility(false);
        this.view.flxSupportGroup.setVisibility(true);
        this.view.flxLocateUsGroup.width = "50%";
        this.view.flxSupportGroup.width = "50%";
        //this.view.flxVerticalSeperator.setVisibility(true);
        //this.view.flxVerticalSeperator2.setVisibility(false);
      } else if(isAboutUsMAPresent===false && isEnrollMAPresent===false){
        this.view.flxFooter.setVisibility(false);
      }
    },
    resetLoginUI : function (){
      this.adjustFooterUIWrapper();
      this.view.flxAccountPreview.top="27%";
      //this.view.flxContent.top="27%";
      this.view.imgKonyLogo.top="8%";
      this.view.imgKonyLogo.height = "40dp";
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
      Controllers.set("frmLoginUnikenController", this);
      this.initialize();
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
    initialize: function() {
      var agentInfo = "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";
      var gwHNIP = "43.205.181.99"; //temenos-dev1.rel-id.com ... 43.205.181.99
      var gwPort = 4443;
      var cipherSpec = "AES/256/CFB/NoPadding:SHA-256";
      var cipherSalt = "com.fadbank.OnlineBanking";
      var proxySettings = "";
      var rdnaSSLCertificate = "";
      var dnsServerList = null;
      var loggingLevel = 0;
      var appCtx = this;
      RDNAUtility.showLoadingScreen();
      RDNAAPI.initialize(agentInfo, RDNACallback.relidCallbacks, gwHNIP, gwPort, cipherSpec, cipherSalt, proxySettings, rdnaSSLCertificate, loggingLevel, this.initializeSyncRespose);
  },
  initializeSyncRespose: function(initializeSyncResponse) {
      function SHOW_ALERT__i2ee6381581545218c1ee33642e777ea_Callback() {}
      // Error Code 88 SDK is Already initialized hence suppressing..
      if (JSON.parse(JSON.parse(initializeSyncResponse).error).shortErrorCode !== 0 && JSON.parse(JSON.parse(initializeSyncResponse).error).shortErrorCode !== 88) {
          RDNAUtility.hideLoadingScreen();
          kony.runOnMainThread(function() {
             kony.print("RDNA Issue : " + initializeSyncResponse);
              kony.ui.Alert({
                  "alertType": constants.ALERT_TYPE_ERROR,
                  "alertTitle": null,
                  "yesLabel": null,
                  "noLabel": null,
                  "alertIcon": null,
                  "message": "InitializeSyncResponse",
                  "alertHandler": SHOW_ALERT__i2ee6381581545218c1ee33642e777ea_Callback
              }, {
                  "iconPosition": constants.ALERT_ICON_POSITION_LEFT
              });
          }, []);
      }
  },
  handleOnInitializeProgress: function(response) {
      RDNAUtility.showLoadingScreen();
      //TODO: Add view to show REL-ID init progress, mostly required for MTD module only
  },
  handleOnInitializeError: function(response) {
      var current = this;
      RDNAUtility.hideLoadingScreen();

      function SHOW_ALERT_Callback(isTryAgain) {
          if (isTryAgain) {
              current.initialize();
          } else {
              kony.application.exit();
          }
      }
      kony.print("RDNA Issue : " + response.errorString);
      kony.print("RDNA Errorcodes - longErrorCode : " + response.longErrorCode + ",shortErrorCode :"+response.shortErrorCode);
      kony.ui.Alert({
          "alertType": constants.ALERT_TYPE_ERROR,
          "alertTitle": "SDK Initialize Error",
          "yesLabel": "Try Again",
          "noLabel": "Exit",
          "alertIcon": null,
          "message": response.errorString +" LongErrorCode:" +response.longErrorCode,
          "alertHandler": SHOW_ALERT_Callback
      }, {
          "iconPosition": constants.ALERT_ICON_POSITION_LEFT
      });
  },
  handleOnInitialized: function(response) {
      //TODO: Add view to show REL-ID init complete
      RDNAUtility.hideLoadingScreen();
//             kony.ui.Alert({
//                 "alertType": constants.ALERT_TYPE_CONFIRMATION,
//                 "alertTitle": "SDK Initialized",
//                 "yesLabel": "Ok",
//                 "alertIcon": null,
//                 "message": "REL-ID Init Success"
//             }, {
//                 "iconPosition": constants.ALERT_ICON_POSITION_LEFT
//             });
  },
  handleOnTerminate: function(response) {
     this.initialize();
  },

  intializeSDKCallBack: function(status, callbackString) {
              const scopeObj = this;
              kony.print("SDK Initialization callback response : " + callbackString);
              if (status === 2) {
                  kony.application.dismissLoadingScreen();
                  kony.print("SDK Initialization Success");
              } else {
                  kony.application.dismissLoadingScreen();
                  scopeObj.sdkTouchOffAlert("SDK Initialization Failed.");
                  kony.print("SDK Initialization Failed.");
              }
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
      this.animateImgKonyLogoOnTouch("25dp");
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
      this.animateImgKonyLogoOnTouch("40dp");
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
        if(!OLBConstants.SCAType)
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
