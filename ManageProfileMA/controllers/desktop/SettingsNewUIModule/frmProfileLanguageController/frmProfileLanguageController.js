define(['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function (CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  this.i18nLang = {};
  return {
    updateFormUI: function (viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
        if (viewModel.updatelanguageError) this.updateDefaultLanguageError(viewModel.updatelanguageError);
        if (viewModel.updatelanguageSuccess) this.updateDefaultLanguageSuccess();
      }
      this.view.lblChangeLanguageHeading.setActive(true);
    },

    init : function(){
       this.view.preShow=this.preShow;
       this.view.postShow=this.postShowProfileLanguage;
    },

    preShow: function () {
      var self = this;
      this.i18nLang = {
      "US - English": kony.i18n.getLocalizedString("i18n.language.USEnglish"),
      "UK - English": kony.i18n.getLocalizedString("i18n.language.UKEnglish"),
      "Spanish": kony.i18n.getLocalizedString("i18n.language.Spanish"),
      "German": kony.i18n.getLocalizedString("i18n.language.German"),
      "French": kony.i18n.getLocalizedString("i18n.language.French"),
      "Arabic": kony.i18n.getLocalizedString("i18n.language.Arabic")
    };
      this.view.flxRight.setVisibility(true);
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "frmProfileLanguage");
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile']);
      this.view.lblCollapseMobile.text = "O";
      this.view.customheadernew.activateMenu("Settings", "Profile Settings");
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("PROFILESETTINGS", "Language");
      this.setSelectedValue("i18n.Profile.Language");
      this.view.lbxSelectLanguage.onSelection = this.disableorEnableSaveButton;
      this.setAccessibility();
      this.setActions();
      this.setLanguages();
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      this.view.onBreakpointChange = function () {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      }
      this.disableorEnableSaveButton();
      this.view.forceLayout();
    },


    setSelectedValue: function (text) {
      var self = this;
      self.view.lblAccountSettingsMobile.text= kony.i18n.getLocalizedString(text);
    },


    disableorEnableSaveButton:function(){
      var scopeObj= this;
      var selectedLang = this.view.lbxSelectLanguage.selectedKey;
      var langlist = this.getLanguageMasterData();
      if(this.view.lbxSelectLanguage.selectedKey == langlist[scopeObj.getFrontendLanguage(applicationManager.getStorageManager().getStoredItem("loginLangObj").language)]){
          this.disableButton(this.view.btnChangeLanguage);
        }else{
          this.enableButton(this.view.btnChangeLanguage);
        }
    },

    /**
	* *@param {Boolean} isLoading- True or false to show/hide the progess bar
	*  Method to set show/hide the progess bar
	*/
    changeProgressBarState: function (isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      } else {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },

    postShowProfileLanguage: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
       //this.view.lblHeading.toolTip=kony.i18n.getLocalizedString("i18n.bulkWire.acknowledgmentHeader");
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      this.view.forceLayout();
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.CustomChangeLanguagePopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomChangeLanguagePopup.onKeyPress = this.onKeyPressCallBack;
      this.view.lblChangeLanguageHeading.setActive(true);
    },
    onKeyPressCallBack : function(eventobject,eventPayload){
      if(eventPayload.keyCode===27){
      if(this.view.flxDialogs.isVisible){
        if(this.view.flxChangeLanguage.isVisible){
          this.view.flxDialogs.isVisible = false;
          this.view.btnChangeLanguage.setActive(true);
      }
      else
          this.view.flxDialogs.isVisible = false; 
      }
      if(kony.application.getCurrentBreakpoint()===640){
        if(this.view.flxLeft.isVisible){
            this.toggleMenuMobile();
            this.view.flxAccountSettingsCollapseMobile.setActive(true);
        }
    }
      this.view.customheadernew.onKeyPressCallBack(eventobject,eventPayload);
      }
    },
    onBreakpointChange: function (width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.customheadernew.lblHeaderMobile.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings");
        this.view.flxLeft.accessibilityConfig={
          a11yARIA:{
              "aria-live": "off",
              "tabindex":-1
          }
      };
      this.view.flxRight.accessibilityConfig={
          a11yARIA:{
              "aria-live": "off",
              "tabindex":-1
          }
      }
  }
  else{
      this.view.flxLeft.accessibilityConfig={
          a11yARIA:{
              "tabindex":-1
          }
      }
      this.view.flxRight.accessibilityConfig={
          a11yARIA:{
              "tabindex":-1
          }
      }
  }
  this.view.forceLayout();     
},

    getFrontendLanguage: function (lang) {
      var languageData = this.getLanguageMasterData();
      var configManager = applicationManager.getConfigurationManager();
      var langObject = configManager.locale;
      for (var key in langObject) {
        if (langObject.hasOwnProperty(key)) {
          if (key === lang) {
            return this.getValueFromKey(langObject[key], languageData);
          }
        }
      }
    },

      /**
       * Method to change the selected language to backend language string
       * @param {String} lang - selected language
       */
      getBackendLanguage : function(lang){
        var languageData = this.getLanguageMasterData();
        var configManager = applicationManager.getConfigurationManager();
        var langObject = configManager.locale;
        for(var key in languageData) {
           if (languageData.hasOwnProperty(key)) {
               if(key===lang){
                 return this.getValueFromKey(languageData[key],langObject);
               }
          }
       }
   },

    /**
     * Method to fetch language from key
     * @param {String} value - selected language
     * @param {Object} langObject - language Object
     */
    getValueFromKey: function (value, langObject) {
      for (var key in langObject) {
        if (langObject.hasOwnProperty(key)) {
          var shortLang = langObject[key];
          if (shortLang === value) {
            return key;
          }
        }
      }
    },

    enableButton: function(button) {
      if(!CommonUtilities.isCSRMode()){
         button.setEnabled(true);
         button.skin = "sknbtnSSPffffff15px0273e3bg";
         button.hoverSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
         button.focusSkin = "sknBtnHoverSSPFFFFFF15Px0273e3";
      }
    },

  disableButton: function(button) {
    button.setEnabled(false);
    button.skin = "sknBtnBlockedSSPFFFFFF15Px";
    button.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";
    button.focusSkin = "sknBtnBlockedSSPFFFFFF15Px";
  },

    /**
	*  Method to set the Accessibility configurations
	*/
    setAccessibility: function () {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //this.view.btnChangeLanguage.toolTip = kony.i18n.getLocalizedString("i18n.profile.change");
      this.view.customheadernew.lblHeaderMobile.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings");
      this.view.CustomChangeLanguagePopup.btnYes.text= kony.i18n.getLocalizedString("i18n.common.yes");
      this.view.CustomChangeLanguagePopup.btnNo.text= kony.i18n.getLocalizedString("i18n.common.no");
      this.view.CustomChangeLanguagePopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.Profile.Language");
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": this.view.lblChangeLanguageHeading.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
      };
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
        "a11yARIA": {
          "role":"button",
          "tabindex": 0,
          "aria-expanded": false,
          "aria-labelledby": "lblAccountSettingsMobile"
        }
      }
      //this.view.btnCancel.toolTip= kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
      //this.view.customheadernew.lblAccounts.toolTip=kony.i18n.getLocalizedString("i18n.topmenu.accounts");
      //CommonUtilities.setText(this.view.lblChangeLanguageHeading, kony.i18n.getLocalizedString("i18n.Profile.Language"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblSelectLanguage, kony.i18n.getLocalizedString("i18n.Profile.SelectLanguage"), accessibilityConfig);
      //CommonUtilities.setText(this.view.btnChangeLanguage, kony.i18n.getLocalizedString("i18n.profile.change"), accessibilityConfig);
      //CommonUtilities.setText(this.view.btnCancel, kony.i18n.getLocalizedString("i18n.konybb.common.cancel"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
      this.view.btnChangeLanguage.accessibilityConfig = {
        "a11yLabel": "Save language settings"
      };
      this.view.btnCancel.accessibilityConfig = {
        "a11yLabel": "Cancel change language process"
      };
    },

    setActions: function () {
      var scopeObj = this;
      this.view.btnChangeLanguage.onClick = function () {
        var langSelected;
        var selectedValue = scopeObj.view.lbxSelectLanguage.selectedKeyValue[1].substring(0, scopeObj.view.lbxSelectLanguage.selectedKeyValue[1].indexOf('('));
        for (var key in scopeObj.i18nLang) {
          if (scopeObj.i18nLang[key] === selectedValue) {
            langSelected = key;
            break;
          }
        }
        scopeObj.view.CustomChangeLanguagePopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.common.changeLanguageMessage") + " " + langSelected + "?";
        scopeObj.view.flxDialogs.setVisibility(true);
        scopeObj.view.flxDialogs.isModalContainer = true;
        scopeObj.view.flxChangeLanguage.setVisibility(true);
        scopeObj.view.flxLogout.setVisibility(false);
        scopeObj.view.CustomChangeLanguagePopup.flxCross.onClick = function () {
          scopeObj.view.flxDialogs.isModalContainer = false;
          scopeObj.view.flxDialogs.setVisibility(false);
          scopeObj.view.flxChangeLanguage.setVisibility(false);
          scopeObj.view.forceLayout();
          scopeObj.view.btnChangeLanguage.setActive(true);
        }
        scopeObj.view.forceLayout();
        scopeObj.view.CustomChangeLanguagePopup.lblHeading.setActive(true);
      };
      this.view.CustomChangeLanguagePopup.flxCross.accessibilityConfig = {
        a11yLabel: kony.i18n.getLocalizedString("i18n.settings.closeChangeLanguageDialog"),
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
     this.view.CustomChangeLanguagePopup.btnNo.accessibilityConfig = {
        a11yLabel: kony.i18n.getLocalizedString("i18n.settings.noDontChangeLanguage"),
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
     this.view.CustomChangeLanguagePopup.btnYes.accessibilityConfig = {
        a11yLabel:kony.i18n.getLocalizedString("i18n.settings.yesChangeLanguage"),
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      this.view.CustomChangeLanguagePopup.btnYes.onClick = function () {
        var langSelected;
        var selectedValue = scopeObj.view.lbxSelectLanguage.selectedKeyValue[1].substring(0, scopeObj.view.lbxSelectLanguage.selectedKeyValue[1].indexOf('('));
        for (var key in scopeObj.i18nLang) {
          if (scopeObj.i18nLang[key] === selectedValue) {
            langSelected = key;
            break;
          }
        }
        var langSelected = scopeObj.getBackendLanguage(langSelected);
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.updateDefaultLanguage(langSelected);
       
      };
      this.view.btnCancel.onClick = function(){
        applicationManager.getNavigationManager().navigateTo("frmProfile");
      };
      this.view.CustomChangeLanguagePopup.btnNo.onClick = function(){
          scopeObj.view.flxDialogs.isModalContainer = false;
          scopeObj.view.flxChangeLanguage.setVisibility(false);
          scopeObj.view.flxDialogs.setVisibility(false);
          scopeObj.view.forceLayout();
          scopeObj.view.btnChangeLanguage.setActive(true);
          kony.application.dismissLoadingScreen();
      }

    },

    updateDefaultLanguageSuccess:function (){
      var scopeObj= this;
      var localeCode = scopeObj.view.lbxSelectLanguage.selectedKey;
      var langSelected;
      var selectedValue = scopeObj.view.lbxSelectLanguage.selectedKeyValue[1].substring(0, scopeObj.view.lbxSelectLanguage.selectedKeyValue[1].indexOf('('));
      for (var key in scopeObj.i18nLang) {
        if (scopeObj.i18nLang[key] === selectedValue) {
          langSelected = key;
          break;
        }
      }
      kony.i18n.setCurrentLocaleAsync(localeCode, function () {
        applicationManager.getStorageManager().setStoredItem("loginLangObj", { language: scopeObj.getBackendLanguage(langSelected) });
        applicationManager.getStorageManager().setStoredItem("langObj", { language: scopeObj.getBackendLanguage(langSelected) });
        applicationManager.getConfigurationManager().setLocaleAndDateFormat({ "data": {} });
        scopeObj.view.flxDialogs.isModalContainer = false;
        scopeObj.view.flxDialogs.setVisibility(false);
        scopeObj.view.flxChangeLanguage.setVisibility(false);
        applicationManager.getNavigationManager().navigateTo({
          "appName"     : "AuthenticationMA",
          "friendlyName": "frmLoginLanguage"
        });
      }, function () { });
      
      kony.application.dismissLoadingScreen();
      scopeObj.view.forceLayout();
    },



    getLanguageMasterData: function () {
      return {
        "US - English": "en_US",
        "UK - English": "en_GB",
        "Spanish": "es_ES",
        "German": "de_DE",
        "French": "fr_FR",
        "Arabic": "ar_AE"
      }
    },
    
    getLocaleMasterData: function() {
      return {
        "US - English": "English",
        "UK - English": "British English",
        "Spanish": "Español",
        "German": "Deutsch",
        "French": "Français",
        "Arabic": "العربية"
      }
    },
    
    setLanguages: function () {
      var langlist = this.getLanguageMasterData();
      var localelist = this.getLocaleMasterData();
      var scopeObj = this;
      var languages = [];
      for (var lang in langlist) {
        if (langlist.hasOwnProperty(lang)) {
          var temp = ([langlist[lang], this.i18nLang[lang] + "(" + localelist[lang] + ")"]) ;
          languages.push(temp);
        }
      }
      this.view.lbxSelectLanguage.masterData = languages;
    var loginLanguage =   applicationManager.getStorageManager().getStoredItem("loginLangObj").language ;
    this.view.lbxSelectLanguage.selectedKey =  (loginLanguage) ? langlist[scopeObj.getFrontendLanguage(loginLanguage)] : null;
     if (this.view.lbxSelectLanguage.selectedKey === langlist[scopeObj.getFrontendLanguage(applicationManager.getStorageManager().getStoredItem("loginLangObj").language)]) {
        this.disableButton(this.view.btnChangeLanguage);
      } else {
        this.enableButton(this.view.btnChangeLanguage);
      }
    },

    toggleMenuMobile: function () {
      if (this.view.lblCollapseMobile.text == "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": 0,
            "aria-expanded": true,
            "aria-labelledby":"lblAccountSettingsMobile",
            "role":"button"
          }
        }
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
      } else {
        this.view.lblCollapseMobile.text  = "O";
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": 0,
            "aria-expanded": false,
            "aria-labelledby":"lblAccountSettingsMobile",
            "role":"button"
          }
        }
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
      }
    }, 
    showError: function (errorMessage) {
      this.view.flxProfileError.setVisibility(true);
      CommonUtilities.setText(this.view.rtxError, errorMessage.errorMessage, CommonUtilities.getaccessibilityConfig());
    },
    updateDefaultLanguageError:function(errMessage){
      scopeObj= this;
      scopeObj.showError(errMessage);
      scopeObj.view.flxDialogs.isModalContainer = false;
      scopeObj.view.flxDialogs.setVisibility(false);
      scopeObj.view.flxChangeLanguage.setVisibility(false);
      scopeObj.view.forceLayout();
      scopeObj.view.btnChangeLanguage.setActive(true);

    }
  };
});