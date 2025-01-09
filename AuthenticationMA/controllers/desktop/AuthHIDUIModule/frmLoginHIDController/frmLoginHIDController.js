/**
 * Login form controller which will handle all login page UI changes
 * @module frmLoginController
 */
 define(['FormControllerUtility', 'Deeplinking', 'ViewConstants', 'CommonUtilities', 'OLBConstants','SCAConfiguration'], function (FormControllerUtility, Deeplinking, ViewConstants, CommonUtilities, OLBConstants,SCAConfiguration) {
    var DEVICE_TYPES = {
      DESKTOP: {},
      IPHONE: {
        linkConfigKey: 'iphoneNativeAppLink',
        image: ViewConstants.IMAGES.APP_STORE
      },
      IPAD: {
        linkConfigKey: 'ipadNativeAppLink',
        image: ViewConstants.IMAGES.APP_STORE
      },
      ANDROID_PHONE: {
        linkConfigKey: 'androidPhoneNativeAppLink',
        image: ViewConstants.IMAGES.PLAY_STORE
      },
      ANDROID_TABLET: {
        linkConfigKey: 'androidTabletNativeAppLink',
        image: ViewConstants.IMAGES.PLAY_STORE
      },
    }
    var orientationHandler = new OrientationHandler();
    var langDropdownClosed="false";
    var keystoke="";
    this.customerPhone = "";
    this.customerEmail = "";
    var userFlow = "";
    this.verifyUserNameError = false;
    var navigationFlow = false;
    return /** @alias module:frmLoginController */ {
      isOriginationFlow: false,
      /**
               * Method to load and return Auth Module
               * @returns {object} Auth Module object.
               */
      loadAuthModule: function () {
        return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      },
  
      onNavigate: function (context) {
        if (!kony.sdk.isNullOrUndefined(context)) {
          this.context = context;
          this.isOriginationFlow = this.context.isOriginationFlow;
        }
      },
  
      goBack: function () {
        var self = this;
        self.context.isBack = true;
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "appName": "AuthenticationMA",
          "moduleName": "AuthUIModule"
        }).presentationController.onSubmoduleExit(self.context);
      },
      hidePopupsFunction : function() {
       if(this.view.flxLanguagePicker.isVisible === true){
          this.view.flxLanguagePicker.isVisible=false;
          this.view.lblCheckBox.text = "O";
          this.view.flxDropdown.accessibilityConfig = {
            a11yARIA: {
              "aria-expanded": false,
              "aria-labelledby":"lblLanguage",
              role: "button"
            },
          };
       }
       if(this.view.AllForms1.isVisible === true){
         this.view.AllForms1.isVisible=false;
          this.view.flxImgInfoIcon.accessibilityConfig = {
            a11yLabel: kony.i18n.getLocalizedString("i18n.WireTransfers.Information"),
            a11yARIA: {
              role: "button",
              "aria-expanded": false
            },
          };
       }
      },
      /**
               * Function to be called on pre show of the frmLogin
               */
      onPreShow: function () {
        this.view.loginComponent.closePopups =this.hidePopupsFunction;
        this.view.CustomChangeLanguagePopup.flxCross.onClick = this.hideLanguageSelectionPopUp.bind(this);
        this.view.CustomChangeLanguagePopup.flxCross.accessibilityConfig = {
          a11yLabel: kony.i18n.getLocalizedString("i18n.common.close"),
          a11yARIA: {
            role: "button",
          }
        };
        this.view.TermsAndConditionLegalEntity.btnAcceptTAndC.focusSkin = "sknBtnNormalSSPFFFFFF15PxFocus";
        var authModule = this.loadAuthModule();
        this.attachToModule(authModule);
        this.presentationValidationUtility = applicationManager.getPresentationValidationUtility();
        this.dataProcessUtilityManager = applicationManager.getDataProcessorUtility();
        this.validationUtilManager = applicationManager.getValidationUtilManager();
        this.view.forceLayout();
        this.restoreOriginalMainLoginUIChanges();
        this.preshowFrmLogin();
        this.initializeResponsiveViews();
        this.setLanguages();
        this.view.resetPasswordComponent.resetUI();
        this.view.BrowserCheckPopup.setOnBrowserDownloaded(this.setOnBrowserDownloadedClicked);
        this.view.BrowserCheckPopup.setOnContinue(this.setOnBrowserCheckContinue);
        if (!this.isOriginationFlow) {
          if (applicationManager.getStorageManager().getStoredItem("langObj")) {
            var langObj = applicationManager.getStorageManager().getStoredItem("langObj").language;
            this.showDefaultLanguageOnLoginScreen(langObj);
            if(langObj === "Arabic"){
              this.view.lblCopyright.width = "280dp";
            }
          }
          this.view.flxInfo.setVisibility(false);
        } else {
          this.view.flxCloseIcon.onClick = this.goBack.bind(this);
          this.view.flxInfo.setVisibility(true);
        }
        this.setAriaLabels();
        var scope = this;
        this.view.btnOpenNewAccount.accessibilityConfig = {
          //a11yLabel:kony.i18n.getLocalizedString("i18n.WireTransfer.CreateNewAccount"),
          a11yARIA: {
          },
        };
        this.view.flxImgInfoIcon.accessibilityConfig = {
          a11yLabel: kony.i18n.getLocalizedString("i18n.WireTransfers.Information"),
          a11yARIA: {
            role: "button",
            "aria-expanded": false
          },
        };
        this.view.AllForms1.flxCross.accessibilityConfig = {
          a11yLabel : kony.i18n.getLocalizedString("i18n.common.close"),
          a11yARIA : {
             role: "button"
          },
        };
        //             this.view.carousel.accessibilityConfig = {
        //                 //a11yLabel:"Segement for advertisement",
        //                 a11yARIA: {
        //                     tabindex: -1,
        //                 },
        //             };
        this.view.flxDropdown.accessibilityConfig = {
          a11yARIA: {
            "aria-expanded": false,
            "aria-labelledby":"lblLanguage",
            role: "button"
          },
        };
        this.view.flxDifferentLanguagesSegment.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": -1,
          },
        };
        this.view.CustomChangeLanguagePopup.flxCross.accessibilityConfig = {
          a11yLabel: "language popup close",
          a11yARIA: {
          },
        };
        this.view.CustomChangeLanguagePopup.btnNo.accessibilityConfig = {
          a11yLabel: kony.i18n.getLocalizedString("i18n.common.no"),
          a11yARIA: {
          },
        };
        this.view.CustomChangeLanguagePopup.btnYes.accessibilityConfig = {
          a11yLabel: kony.i18n.getLocalizedString("i18n.common.yes"),
          a11yARIA: {
          },
        };
        this.view.btnVeiwMore.accessibilityConfig = {
          //a11yLabel:kony.i18n.getLocalizedString("i18n.login.viewMore"),
          a11yARIA: {
          },
        };
  
        this.view.btnLocateUs.accessibilityConfig = {
          //a11yLabel:kony.i18n.getLocalizedString("i18n.footer.locateUs"),
          a11yARIA: {
             "role": "link"
          },
        };
  
        this.view.btnContactUs.accessibilityConfig = {
          //a11yLabel:kony.i18n.getLocalizedString("i18n.footer.contactUs"),
          a11yARIA: {
             "role": "link"
          },
        };
        this.view.btnPrivacy.accessibilityConfig = {
          //a11yLabel:kony.i18n.getLocalizedString("i18n.footer.privacy"),
          a11yARIA: {
             "role": "link"
          },
        };
        this.view.btnTermsAndConditions.accessibilityConfig = {
          //a11yLabel:kony.i18n.getLocalizedString("i18n.common.TnC"),
          a11yARIA: {
             "role": "link"
          },
        };
  
        this.view.btnFaqs.accessibilityConfig = {
          //a11yLabel:kony.i18n.getLocalizedString("i18n.footer.faqs"),
          a11yARIA: {
             "role": "link"
          },
        };
        this.view.lblCheckBox.accessibilityConfig = {
         "a11yHidden":true,
          a11yARIA: {
            tabindex: -1,
          },
        };
        this.view.CustomChangeLanguagePopup.lblHeading.accessibilityConfig = {
          a11yARIA: {
            tabindex: -1,
          },
        };
        this.view.lblLanguage.accessibilityConfig = {
          a11yARIA: {
            tabindex: -1,
          },
        };
        this.view.imgInfoIcon.accessibilityConfig = {
          a11yARIA: {
            tabindex: -1,
          },
        };
        this.view.CustomChangeLanguagePopup.accessibilityConfig = {
          a11yARIA: {
            tabindex: -1,
          },
        };
        //             this.view.carousel.segCarousel.accessibilityConfig = {
        //                 a11yARIA: {
        //                     tabindex: -1,
        //                 },
        //             };
        this.view.AllForms1.lblInfo.accessibilityConfig = {
          a11yARIA: {
            tabindex: -1,
          },
        };
  
        this.view.AllForms1.RichTextInfo.accessibilityConfig = {
          a11yARIA: {
            tabindex: -1,
          },
        };
  
        this.view.AllForms1.imgCross.accessibilityConfig = {
          a11yARIA: {
            tabindex: -1,
          },
        };
        this.view.CustomChangeLanguagePopup.isModalContainer = true;
  
      },
  
      popupYesClicked: function () {
        this.context.loginErrorPopup = true;
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.exitAuthModule();
      },
  
      frmLoginInit: function () {
        this.view.tbxAutopopulateIssueFix.secureTextEntry = true;
        this.view.tbxAutopopulateIssueFix.setVisibility(true);
      },
      setOnBrowserDownloadedClicked: function (params) {
        //application manager service call
        applicationManager.logBrowser(params);
      },
      setOnBrowserCheckContinue: function (params) {
        applicationManager.logBrowser(params);
      },
      onKeyPressCallBack: function (eventObject, eventPayload) {
            var scopeObj = this;
            if (eventPayload.keyCode === 27) {
                if (scopeObj.view.AllForms1.isVisible === true) {
                    scopeObj.view.AllForms1.isVisible = false;
                    scopeObj.view.flxImgInfoIcon.accessibilityConfig = {
                        a11yLabel: kony.i18n.getLocalizedString("i18n.WireTransfers.Information"),
                        a11yARIA: {
                            role: "button",
                            "aria-expanded": false
                        },
                    };
                    scopeObj.view.flxImgInfoIcon.setActive(true);                  
                }
                else if(scopeObj.view.flxLanguagePicker.isVisible === true || scopeObj.view.CustomChangeLanguagePopup.isVisible === true){
                    scopeObj.hideLanguageSelectionPopUp();
                    scopeObj.view.flxLanguagePicker.isVisible=false;
                }
              scopeObj.view.loginComponent.onKeyPressCallBack(eventObject, eventPayload);
            }
        },
      /**
               * setLanguages :This function sets the languages in the dropdown list
               */
      setLanguages: function () {
        var scope=this;
        var langlist = this.getLanguageMasterData();
        var languages = [];
        var translatedLanguage = {
          "US English": "(English)",
          "UK English": "(English)",
          "Spanish": "(Español)",
          "German": "(Deutsch)",
          "French": "(Français)",
          "Arabic": "(عربي)"
        };
        for (var lang in langlist) {
          if (langlist.hasOwnProperty(lang)) {
            var temp = {
              "flxLangList": {
              },
              "btnLang":{"onClick":scope.selectYourLanguage},
              "lblLang": lang,
              "lblTranslatedLang": translatedLanguage[lang],
              "lblSeparator": "a"
            };
            languages.push(temp);
          }
        }
        this.view.segLanguagesList.setData(languages);
      },
      /**
               * showDefaultLanguage :This function sets the default language in the textbox as the value in local store or coming from backend
               * @param {String} lang - selected language
               */
      showDefaultLanguageOnLoginScreen: function (lang) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.lblLanguage, this.getFrontendLanguage(lang), accessibilityConfig);
        this.view.lblLanguage.toolTip = this.getFrontendLanguage(lang);
        this.setLocale(lang);
      },
      /**
               * setLocale :This function sets the locale selected
               * @param {String} lang - selected language
               */
      setLocale: function (lang) {
        var localeCode = applicationManager.getConfigurationManager().locale[lang];
        kony.i18n.setCurrentLocaleAsync(localeCode, function () {
          applicationManager.getStorageManager().setStoredItem("langObj", {
            language: lang
          });
          applicationManager.getConfigurationManager().setLocaleAndDateFormat({
            "data": {}
          });
        }, function () { });
      },
      /**
               * Method to fetch languages JSON
               */
      getLanguageMasterData: function () {
        return {
          "US English": "en_US",
          "UK English": "en_GB",
          "Spanish": "es_ES",
          "German": "de_DE",
          "French": "fr_FR",
          "Arabic": "ar_AE"
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
      /**
               * Method to change the selected language to backend language string
               * @param {String} lang - selected language
               */
      getBackendLanguage: function (lang) {
        var languageData = this.getLanguageMasterData();
        var configManager = applicationManager.getConfigurationManager();
        var langObject = configManager.locale;
        for (var key in languageData) {
          if (languageData.hasOwnProperty(key)) {
            if (key === lang) {
              return this.getValueFromKey(languageData[key], langObject);
            }
          }
        }
      },
      /**
               * Method to change the selected language to backend language string
               * @param {String} lang - selected language
               */
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
               * showDefaultLanguage :This function sets the default language in the textbox if nothing is set in local store
               */
      showDefaultLanguage: function () {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.lblLanguage, this.view.segLanguagesList.data[0].lblLang, accessibilityConfig);
        this.view.lblLanguage.toolTip = this.view.segLanguagesList.data[0].lblLang;
        this.setLocale(this.getBackendLanguage(this.view.segLanguagesList.data[0].lblLang));
      },
      hideTextBox: function () {
        var scopeObj = this;
  
        function timerFunc() {
          scopeObj.view.tbxAutopopulateIssueFix.setVisibility(false);
          kony.timer.cancel("mytimer");
        }
        kony.timer.schedule("mytimer", timerFunc, 0.5, false);
      },
      /**
               * Method triggers when click on language dropdown
               */       
      languageDropdownClick : function() {
        var scopeObj=this;
        if (scopeObj.view.lblCheckBox.text === "O"){
          if (CommonUtilities.isMirrorLayoutEnabled()){
            var right = (scopeObj.view.flxMain.info.frame.width - (scopeObj.view.flxMain.info.frame.width - (scopeObj.view.flxDropdown.info.frame.width + scopeObj.view.flxDropdown.info.frame.y))) - 250;
            scopeObj.view.flxLanguagePicker.right = right + "dp";
            } 
          else {
            var right = scopeObj.view.flxMain.info.frame.width - (scopeObj.view.flxDropdown.info.frame.width + scopeObj.view.flxDropdown.info.frame.x);
            scopeObj.view.flxLanguagePicker.left = "";
            //TODO: remove Desktop conditional statement.
            if (orientationHandler.isDesktop)
              right += 25;
            scopeObj.view.flxLanguagePicker.right = right + "dp";
          }
          scopeObj.view.AllForms1.isVisible = false;
          scopeObj.view.flxImgInfoIcon.accessibilityConfig = {
            a11yLabel: kony.i18n.getLocalizedString("i18n.WireTransfers.Information"),
            a11yARIA: {
              role: "button",
              "aria-expanded": false
            },
          };
          scopeObj.view.flxLanguagePicker.isVisible = true;
          scopeObj.view.loginComponent.closeUserNameDropdown();
          scopeObj.view.lblCheckBox.text = "P";
          scopeObj.view.flxDropdown.accessibilityConfig = {
            a11yARIA: {
              "aria-expanded": true,
              "aria-labelledby":"lblLanguage",
              role: "button"
            },
          };
        } 
        else {
          scopeObj.view.flxLanguagePicker.isVisible = false;
          scopeObj.view.lblCheckBox.text = "O";
          scopeObj.view.flxDropdown.accessibilityConfig = {
            a11yARIA: {
              "aria-expanded": false,
              role: "button",
              "aria-labelledby":"lblLanguage",
            },
          };
        }
      },
      /**
               * Function to be called on onTouchEnd of the frmLogin
               */
      frmOnTouchEnd : function() {
        var scopeObj=this;
        lblTextCheck=scopeObj.view.lblCheckBox.text;
        hidePopups();
        if(lblTextCheck!==scopeObj.view.lblCheckBox.text){
          langDropdownClosed = "true";
        }
        else{
          langDropdownClosed = "false";  
        }
        keystoke="";
      },    
      /**
               * Function to be called on post show of the frmLogin
               */
      onPostShow: function () {
        var scopeObj = this;
        this.view.onTouchEnd= function(){
          if(kony.application.getCurrentBreakpoint() >= 1024){
            scopeObj.frmOnTouchEnd();
          }
        };
        this.view.flxDropdown.onClick = function() {
          if(langDropdownClosed==="true" && keystoke!=="Enter"){
            langDropdownClosed="";
            keystoke="";
          }
          else if(langDropdownClosed==="false" && scopeObj.view.lblCheckBox.text === "O"){
            scopeObj.languageDropdownClick();
            langDropdownClosed="";
          }
          else{
            scopeObj.languageDropdownClick();
          }
        };
       /*var isSingleEntity=true;
        if(applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity")!==undefined){
        	isSingleEntity=applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity");
        }*/
        scopeObj.hideTextBox();
        this.view.letsverify.flxDateInput.setVisibility(true);
        this.view.letsverify.flxDOB.setVisibility(false);
        this.view.letsverify.DateInput.onPostShow(applicationManager.getFormatUtilManager().getDateFormat(), "frmLogin_letsverify_DateInput");
        this.view.letsverify.DateInput.textChangeCallback = function () {
          this.view.letsverify.lblWrongInfo.isVisible = false;
          var text = this.view.letsverify.DateInput.getText();
          if (text.length === 10) {
            var date = this.view.letsverify.DateInput.getDateObject();
            if (!(date instanceof Date) || isNaN(date.getDay())) {
              var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
              CommonUtilities.setText(this.view.letsverify.lblWrongInfo, kony.i18n.getLocalizedString("i18n.common.invalidDOB"), accessibilityConfig);
              //this.view.letsverify.lblWrongInfo.text =  kony.i18n.getLocalizedString("i18n.common.invalidDOB");
              this.view.letsverify.lblWrongInfo.isVisible = true;
              this.view.letsverify.DateInput.setText("");
            } else {
              this.view.letsverify.lblWrongInfo.isVisible = false;
            }
          }
          this.view.forceLayout();
          this.allFieldsCheck();
        }.bind(this);
        if (!this.isOriginationFlow) {
          if (applicationManager.getStorageManager().getStoredItem("langObj")) {
            var langObj = applicationManager.getStorageManager().getStoredItem("langObj").language;
            this.showDefaultLanguageOnLoginScreen(langObj);
          }
          applicationManager.getNavigationManager().applyUpdates(this);
          var configManager = applicationManager.getConfigurationManager();
          if (configManager.isAppPropertiesLoaded == "false") {
            applicationManager.getPresentationUtility().showLoadingScreen();
          }
        }
        //executing deeplinking function to validate csr mode login
        this.view.AlterneteActionsSignIn.fontIconOption.text = "L";
        this.view.AlterneteActionsResetPassword.fontIconOption.text = "r";
        this.view.AlterneteActionsEnterCVV.fontIconOption.text = "x";
        this.view.AlterneteActionsEnterPIN.fontIconOption.text = "y";
        //this.view.AlterneteActionsLoginNow.fontIconOption.text = "l";
        this.view.logOutMsg.AlterneteActionsLoginNow.fontIconOption.skin = "sknlblfonticon24px0273e3";
        this.view.logOutMsg.AlterneteActionsLoginNow.fontIconOption.text = "V";
        //this.view.orline.top="36%";
        this.view.AlterneteActionsSignIn.skin = "sknBGFFFFFBdrE3E3E3BdrRadius2Px";
        this.view.AlterneteActionsSignIn.hoverSkin = "sknBGFFFFFBdrE3E3E3BdrRadius2PxHover";
        this.view.AlterneteActionsResetPassword.skin = "sknBGFFFFFBdrE3E3E3BdrRadius2Px";
        this.view.AlterneteActionsResetPassword.hoverSkin = "sknBGFFFFFBdrE3E3E3BdrRadius2PxHover";
        this.view.AlterneteActionsEnterCVV.skin = "sknBGFFFFFBdrE3E3E3BdrRadius2Px";
        this.view.AlterneteActionsEnterCVV.hoverSkin = "sknBGFFFFFBdrE3E3E3BdrRadius2PxHover";
        this.view.AlterneteActionsEnterPIN.skin = "sknBGFFFFFBdrE3E3E3BdrRadius2Px";
        this.view.AlterneteActionsEnterPIN.hoverSkin = "sknBGFFFFFBdrE3E3E3BdrRadius2PxHover";
  
        if (CommonUtilities.isMirrorLayoutEnabled()){  
          scopeObj.view.flxBeyondBankingContent.right = "";
          scopeObj.view.flxBeyondBankingDesc.right = "83px";
          scopeObj.view.flxFooterMenu.right = "";
          scopeObj.view.flxCopyRight.right = "";
        } 
        this.view.flxDropdown.accessibilityConfig = {
          a11yARIA: {
            "aria-expanded": false,
            "aria-labelledby":"lblLanguage",
            role: "button"
          },
        };
        this.view.logOutMsg.AlterneteActionsLoginNow.skin = "sknBGFFFFFBdrE3E3E3BdrRadius2Px";
        this.view.logOutMsg.AlterneteActionsLoginNow.hoverSkin = "sknBGFFFFFBdrE3E3E3BdrRadius2PxHover";
        var handCursor = document.querySelectorAll(".sknBGFFFFFBdrE3E3E3BdrRadius2Px");
        for (var i = 0; i < handCursor.length; i++) {
          handCursor[i].style.cursor = "pointer";
        }
        try {
          var sessiontoken = Deeplinking.deeplinking();
        }
        catch (e) {
          kony.print(e);
        }
        if (CommonUtilities.isCSRMode()) {
          this.view.setVisibility(false);
          kony.mvc.MDAApplication.getSharedInstance().appContext._isSSOEnabled=false;
          var formId = kony.mvc.MDAApplication.getSharedInstance().appContext.deeplinkUrl.formID;
          if (formId) {
          var queryParameter = formId.split("?")[1];
           if (queryParameter) {
           var urlKeyValue = queryParameter.split("=");
           sessiontoken = urlKeyValue[1];
          }
        }
          this.loadAuthModule().presentationController.onLogin({
            "username": "",
            "password": "",
            "rememberMe": false,
            "sessiontoken": sessiontoken
          });
        } else if (CommonUtilities.isCSRMode() && CommonUtilities.isSSOEnabled()) {
          this.view.setVisibility(false);
          var params = {
            "rememberMe": false,
            "loginOptions": {
              "isOfflineEnabled": false,
              "isSSOEnabled": true
            }
          };
          this.loadAuthModule().presentationController.onLogin(params);
        }
        this.setFlowActions();
        this.onLoadChangePointer();
        this.view.CustomFeedbackPopup.btnYes.toolTip = kony.i18n.getLocalizedString("i18n.CustomerFeedback.TakeSurvey");
        this.view.CustomFeedbackPopup.btnNo.toolTip = kony.i18n.getLocalizedString("i18n.CustomerFeedback.MaybeLater");
        FormControllerUtility.disableButton(this.view.letsverify.btnProceed);
        FormControllerUtility.disableButton(this.view.resetusingOTPEnterOTP.btnNext);
        FormControllerUtility.disableButton(this.view.ResetOrEnroll.btnNext);
        FormControllerUtility.disableButton(this.view.newpasswordsetting.btnNext);
        this.view.forceLayout(); //Reset complete view at once
        //Move to Form Init Actions
        this.view.newpasswordsetting.tbxNewPassword.onBeginEditing = this.passwordEditing;
        this.view.newpasswordsetting.tbxNewPassword.onKeyUp = this.newPwdKeyUp;
        this.view.newpasswordsetting.tbxMatchPassword.onKeyUp = this.matchPwdKeyUp;
        this.view.flxClose.onClick = this.restoreOriginalMainLoginUIChanges.bind(this);
        this.view.flxCloseResetPassword.onClick = this.emptyLoginData.bind(this);
        this.view.flxCloseResetPswd.onClick  = this.emptyLoginData.bind(this);
        this.view.flxCloseResetUsingCVV.onClick = this.emptyLoginData.bind(this);
        this.view.flxCloseFontIconParent.onClick = this.emptyLoginData.bind(this);
        this.view.flxCloseSendOTP.onClick = this.emptyLoginData.bind(this);
        this.view.flxCloseResetUsingOTP.onClick = this.emptyLoginData.bind(this);
        this.view.flxCloseBlocked.onClick = this.emptyLoginData.bind(this);
        this.view.flxCloseEnroll.onClick = this.emptyLoginData.bind(this);
        this.view.flxCloseWelcomeBack.onClick = this.emptyLoginData.bind(this);
        this.view.flxCloseResetSuccessful.onClick = this.emptyLoginData.bind(this);
        this.view.flxCloseSelectUsername.onClick = this.emptyLoginData.bind(this);
        this.view.flxCloseMFA.onClick = this.emptyLoginData.bind(this);
        //Footer actions.
        this.view.btnFaqs.onClick = scopeObj.loadAuthModule().presentationController.navigateToFAQ.bind(scopeObj);
        this.view.btnContactUs.onClick = scopeObj.loadAuthModule().presentationController.navigateToContactUs.bind(scopeObj);
        this.view.btnPrivacy.onClick = scopeObj.loadAuthModule().presentationController.navigateToPrivacyPrivacy.bind(scopeObj);
        this.view.btnTermsAndConditions.onClick = scopeObj.loadAuthModule().presentationController.navigateToTermsAndConditions.bind(scopeObj);
        this.view.btnLocateUs.onClick = function () {
          scopeObj.view.flxLogoutMsg.isVisible = false;
          scopeObj.loadAuthModule().presentationController.navigateToLocateUs();
        };
        this.resetToLoginScreen();
        this.initializeResponsiveViews();
        this.setupNativeAppLink();
        //Workaround for password autocomplete issue.
        if (document.getElementById("frmLogin_main_tbxPassword")) {
          document.getElementById("frmLogin_main_tbxPassword").autocomplete = "new-password";
        }
        this.view.logOutMsg.AlterneteActionsLoginNow.onClick = function () {
          scopeObj.loginLater(scopeObj.view.flxLogoutMsg);
        };
        scopeObj.setContext();
        scopeObj.AdjustScreen();
  
        if (this.isOriginationFlow) {
          this.view.flxFooterMenu.setVisibility(this.isMicroAppPresent("AuthenticationMA"));
        } else {
          this.view.flxFooterMenu.setVisibility(this.isMicroAppPresent("AboutUsMA"));
        }
         this.view.onKeyPress = this.onKeyPressCallBack;
         this.view.CustomChangeLanguagePopup.onKeyPress = this.onKeyPressCallBack;
//         var isSingleEntity = "true";
//         this.view.btnOnlineAccessEnroll.setVisibility(this.isMicroAppPresent("SelfServiceEnrolmentMA"));
//           applicationManager.getConfigurationManager().fetchApplicationProperties(function (res) {
//           if(res.isSingleEntity !== undefined){
// //             var isSingleEntity = res.isSingleEntity;
//             if(isSingleEntity === "true"){
//               scopeObj.view.btnOnlineAccessEnroll.text=kony.i18n.getLocalizedString("i18n.Login.EnrollActivate");
//               scopeObj.view.lblSelectOption.setVisibility(true);
//               scopeObj.view.EnrollNow.setVisibility(true);
//               scopeObj.view.lblSeperator.setVisibility(true);
//             }
//             else{
//               scopeObj.view.btnOnlineAccessEnroll.text=kony.i18n.getLocalizedString("i18n.Login.Activate");
//               scopeObj.view.lblSelectOption.setVisibility(false);
//               scopeObj.view.EnrollNow.setVisibility(false);
//               scopeObj.view.lblSeperator.setVisibility(false);
//             }
//           }
//         });
        /*if(isSingleEntity){
          this.view.btnOnlineAccessEnroll.text=kony.i18n.getLocalizedString("i18n.Login.EnrollActivate");
          this.view.lblSelectOption.setVisibility(true);
          this.view.EnrollNow.setVisibility(true);
          this.view.lblSeperator.setVisibility(true);
        }
        else{
          this.view.btnOnlineAccessEnroll.text=kony.i18n.getLocalizedString("i18n.Login.Activate");
	      this.view.lblSelectOption.setVisibility(false);
          this.view.EnrollNow.setVisibility(false);
          this.view.lblSeperator.setVisibility(false);
        }*/
      },
      /**
               * showDates :This function sets the Date Of Birth
               */
      showDates: function () {
        this.setNoOfDays();
        this.allFieldsCheck();
      },
      /**
               * setNoOfDays :This function sets the Date Of Birth (day,month and year)
               */
      setNoOfDays: function () {
        var selectedMonth = this.view.letsverify.lbxMonth.selectedKey;
        var dayArray = [];
        dayArray = [{
          "daykey": "day0",
          "dayvalue": "Day"
        }, {
          "daykey": "day1",
          "dayvalue": 1
        }, {
          "daykey": "day2",
          "dayvalue": 2
        }, {
          "daykey": "day3",
          "dayvalue": 3
        },
                    {
                      "daykey": "day4",
                      "dayvalue": 4
                    }, {
                      "daykey": "day5",
                      "dayvalue": 5
                    }, {
                      "daykey": "day6",
                      "dayvalue": 6
                    },
                    {
                      "daykey": "day7",
                      "dayvalue": 7
                    }, {
                      "daykey": "day8",
                      "dayvalue": 8
                    }, {
                      "daykey": "day9",
                      "dayvalue": 9
                    },
                    {
                      "daykey": "day10",
                      "dayvalue": 10
                    }, {
                      "daykey": "day11",
                      "dayvalue": 11
                    }, {
                      "daykey": "day12",
                      "dayvalue": 12
                    },
                    {
                      "daykey": "day13",
                      "dayvalue": 13
                    }, {
                      "daykey": "day14",
                      "dayvalue": 14
                    }, {
                      "daykey": "day15",
                      "dayvalue": 15
                    },
                    {
                      "daykey": "day16",
                      "dayvalue": 16
                    }, {
                      "daykey": "day17",
                      "dayvalue": 17
                    }, {
                      "daykey": "day18",
                      "dayvalue": 18
                    },
                    {
                      "daykey": "day19",
                      "dayvalue": 19
                    }, {
                      "daykey": "day20",
                      "dayvalue": 20
                    }, {
                      "daykey": "day21",
                      "dayvalue": 21
                    },
                    {
                      "daykey": "day22",
                      "dayvalue": 22
                    }, {
                      "daykey": "day23",
                      "dayvalue": 23
                    }, {
                      "daykey": "day24",
                      "dayvalue": 24
                    },
                    {
                      "daykey": "day25",
                      "dayvalue": 25
                    }, {
                      "daykey": "day26",
                      "dayvalue": 26
                    }, {
                      "daykey": "day27",
                      "dayvalue": 27
                    },
                    {
                      "daykey": "day28",
                      "dayvalue": 28
                    }
                   ];
        var dayV, dayK;
        var dayObj;
        if (selectedMonth === 'm1' || selectedMonth === 'm3' || selectedMonth === 'm5' || selectedMonth === 'm7' || selectedMonth === 'm8' || selectedMonth === 'm10' || selectedMonth === 'm12') {
          var MaxMonths = 31;
          for (var i = 29; i <= MaxMonths; i++) {
            dayK = "day" + i;
            dayV = i;
            dayObj = {
              "daykey": dayK,
              "dayvalue": dayV
            };
            dayArray.push(dayObj);
          }
        } else if (selectedMonth === 'm4' || selectedMonth === 'm6' || selectedMonth === 'm9' || selectedMonth === 'm11') {
          var MonthEnd = 30;
          for (var j = 29; j <= MonthEnd; j++) {
            dayK = "day" + j;
            dayV = j;
            dayObj = {
              "daykey": dayK,
              "dayvalue": dayV
            };
            dayArray.push(dayObj);
          }
        } else {
          if ((this.view.letsverify.lbxYear.selectedKeyValue !== undefined) && (this.view.letsverify.lbxYear.selectedKeyValue !== null)) {
            var thisYear = this.view.letsverify.lbxYear.selectedKeyValue[1];
            var leapCheck1 = 4;
            var leapCheck2 = 100;
            var leapCheck3 = 400;
            var daysAdded = 29;
            if (((thisYear % leapCheck1 === 0) && (thisYear % leapCheck2 !== 0)) || (thisYear % leapCheck3 === 0)) {
              dayK = "day" + daysAdded;
              dayV = daysAdded;
              dayObj = {
                "daykey": dayK,
                "dayvalue": dayV
              };
              dayArray.push(dayObj);
            }
          }
        }
        this.view.letsverify.lbxDate.masterDataMap = [dayArray, "daykey", "dayvalue"];
      },
      /**
               * Method to set flow actions
               */
      setFlowActions: function () {
        var scopeObj = this;
        this.view.letsverify.flxWhatIsSSN.onClick = function () {
          if (scopeObj.view.AllForms.isVisible === false)
            scopeObj.view.AllForms.setVisibility(true);
          else
            scopeObj.view.AllForms.setVisibility(false);
        };
        this.view.AllForms.flxCross.onClick = function () {
          scopeObj.view.AllForms.setVisibility(false);
        };
        this.view.AllForms1.flxCross.onClick = function () {
          scopeObj.view.AllForms1.isVisible = false;
          scopeObj.view.flxImgInfoIcon.accessibilityConfig = {
             a11yLabel: kony.i18n.getLocalizedString("i18n.WireTransfers.Information"),
             a11yARIA: {
               role: "button",
               "aria-expanded": false
             },
           };  
          scopeObj.view.flxImgInfoIcon.setActive(true);
        };
  
        // start of adding code for componentization
  
        scopeObj.view.btnOnlineAccessEnroll.onClick = function () {
          scopeObj.goToEnrollActivate();
        };
			//Adding LegalEntity in Enroll flow
            scopeObj.view.EnrollNow.flxOption.onClick = function() {
            scopeObj.view.lblSelectLegalEntity.text = "Select";
                scopeObj.view.txtLegalSearch.text="";
                scopeObj.fetchLegalEntity();
  
                //scopeObj.view.flxLegalEntity.setVisibility(true);
                userFlow="Enroll";
                //scopeObj.legalEntity(null,"Enroll");
                // let context = {
                //     "action": "NavigateToEnroll"
                // };
                // let enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                //     "moduleName": "EnrollModule",
                //     "appName": "SelfServiceEnrolmentMA"
                // });
                // enrollModule.presentationController.showEnrollPage(context);
          };
            scopeObj.view.ActivateNow.flxOption.onClick = function() {
          scopeObj.navigateToActivation();
        };
  
        scopeObj.view.btnOpenNewAccount.onClick = function () {
          scopeObj.navigateToNewUserOnBoarding();
        };
  
        scopeObj.view.flxImgInfoIcon.onClick = function () {
          if (!scopeObj.view.AllForms1.isVisible) {
            scopeObj.view.AllForms1.isVisible = true;
            scopeObj.view.loginComponent.closeUserNameDropdown();
            if (kony.application.getCurrentBreakpoint() > 1400) {
              scopeObj.view.AllForms1.top="-130dp";       
            }
            else if (kony.application.getCurrentBreakpoint() <= 1400 && kony.application.getCurrentBreakpoint() > 1024) { 
              scopeObj.view.AllForms1.width = "400px";
              scopeObj.view.AllForms1.lblInfo.text = kony.i18n.getLocalizedString("i18n.WireTransfers.Information");
              scopeObj.view.AllForms1.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.accountDetails.balanceInfo");
              scopeObj.view.AllForms1.flxInformationText.width = "85%";  
            } 
          } else {
            scopeObj.view.AllForms1.isVisible = false;
          }
          if(scopeObj.view.AllForms1.isVisible===true){
            scopeObj.view.flxLanguagePicker.isVisible= false;
            scopeObj.view.flxDropdown.accessibilityConfig = {
              a11yARIA: {
                "aria-expanded": false,
                role: "button",
                "aria-labelledby": "lblLanguage",
              },
            };
           scopeObj.view.flxImgInfoIcon.accessibilityConfig = {
             a11yLabel: kony.i18n.getLocalizedString("i18n.WireTransfers.Information"),
             a11yARIA: {
               role: "button",
               "aria-expanded": true
             },
           };
          }else{
            scopeObj.view.flxImgInfoIcon.accessibilityConfig = {
             a11yLabel: kony.i18n.getLocalizedString("i18n.WireTransfers.Information"),
             a11yARIA: {
               role: "button",
               "aria-expanded": false
             },
           };           
          }
          scopeObj.view.AllForms1.accessibilityConfig = {
            a11yARIA: {
              "aria-live": "off",
              "tabindex": -1
            },
          };    
        };
  
        scopeObj.view.cantSignIn.flxClose.onClick = function () {
          scopeObj.resetToLoginScreen();
        };
  
        scopeObj.view.cantSignIn.resetPassword.onTouchStart = function () {
          FormControllerUtility.showProgressBar();
          scopeObj.view.resetPasswordComponent.username = scopeObj.view.cantSignIn.lstBoxSelectUsername.selectedKey;
          scopeObj.view.resetPasswordComponent.serviceKey = applicationManager.getAuthManager().getServicekey();
          scopeObj.view.resetPasswordComponent.enableRequestResetComponent();
        };
  
        scopeObj.view.cantSignIn.signInNow.onTouchStart = function () {
          scopeObj.view.loginComponent.username = scopeObj.view.cantSignIn.lstBoxSelectUsername.selectedKey;
          scopeObj.resetToLoginScreen();
        };
  
        scopeObj.view.cantSignIn.lostDevice.onTouchStart = function () {
          // TODO
        };
  
        scopeObj.view.cantSignIn.regenerateCode.onTouchStart = function () {
          scopeObj.regenerateActivationCode();
        };
  
        scopeObj.view.cantSignIn.btnProceed.onClick = function () {
          scopeObj.verifyUserDetails();
        };
        scopeObj.view.cantSignIn.flxRefresh.onClick = function () {
          scopeObj.fetchCaptcha();
        };
  
        scopeObj.view.flxCloseEnrollActivate.onClick = function () {
          scopeObj.resetToLoginScreen();
        };
  
        scopeObj.view.loginComponent.showServerErrorPage = function () {
          scopeObj.showServerErrorPage(scopeObj.view.flxLogin);
        };
  
        scopeObj.view.loginComponent.forceLayout = function () {
          scopeObj.view.forceLayout();
        };
  
        scopeObj.view.loginComponent.MFANavigation = function (response) {
          scopeObj.MFANavigation(response);
        };
  
        scopeObj.view.loginComponent.cantSignIn = function () {
          scopeObj.cantSignIn();
        };
  
        scopeObj.view.loginComponent.onSuccessCallback = function (response) {
          scopeObj.postLoginSuccess(response);
        };
  
        scopeObj.view.loginComponent.onFailureCallback = function (response) {
          scopeObj.showLoginError(response);
        };
  
        scopeObj.view.activateNow1.closeActivateProfile = function () {
          scopeObj.resetToLoginScreen();
        };
  
        scopeObj.view.activateNow1.cantSignIn = function () {
          scopeObj.cantSignIn();
          scopeObj.view.flxLogin.setVisibility(true);
          scopeObj.view.flxEnrollActivateContainer.setVisibility(false);
          scopeObj.screenAdjustments();
        };
  
        scopeObj.view.OTPComponent.closeOTP = function () {
          scopeObj.showOrHideMFAAuthentication(false, false, false);
        };
  
        scopeObj.view.OTPComponent.onFailureCallback = function (response, isTransactionalError) {
          scopeObj.showLoginError(response);
        };
  
        scopeObj.view.OTPComponent.onSuccessCallback = function (response) {
          scopeObj.postMFAAuthentication(response);
        };
  
        scopeObj.view.OTPComponent.forceLayout = function (response) {
          scopeObj.view.forceLayout();
        };
  
        //             scopeObj.view.securityQuestionsComponent.closeSecurityQuestions = function() {
        //                 scopeObj.showOrHideMFAAuthentication(false, false, false);
        //             };
  
        //             scopeObj.view.securityQuestionsComponent.onSuccessCallback = function(response) {
        //                 scopeObj.postMFAAuthentication(response);
        //             };
  
        //             scopeObj.view.securityQuestionsComponent.errorMFANavigation = function(response) {
        //                 scopeObj.MFANavigation(response);
        //             };
  
        //             scopeObj.view.securityQuestionsComponent.forceLayout = function(response) {
        //                 scopeObj.view.forceLayout();
        //             };
  
        //             scopeObj.view.securityQuestionsComponent.onFailureCallback = function(response, isTransactionalError) {
        //                 scopeObj.showLoginError(response);
        //             };
  
        scopeObj.view.resetPasswordComponent.showLogin = function (errorMessage) {
          scopeObj.resetToLoginScreen(errorMessage);
        };
  
        scopeObj.view.resetPasswordComponent.displayRequestResetPasswordComponenet = function () {
          scopeObj.displayRequestResetPasswordComponenet();
        };
        
			scopeObj.view.resetPasswordComponent.rmsUserBlock = function(output){
        scopeObj.rmsUserBlock(output);
      };
      
  
        scopeObj.view.regenrateActivationCodeComponent.navigateToLogin = function () {
          scopeObj.resetToLoginScreen();
        };
  
        // end for adding code for componentization
      },
      /**
               * This function used to update form using given context
               * @param {object} context depending on the context the appropriate function is executed to update view
               */
      updateFormUI: function (context) {
        if (context.action === "Logout") {
          this.showLogoutPage();
        }
        if (context.action === "SessionExpired") {
          this.showSessionExpiredPage();
        }
        if (context.campaignRes) {
          this.showOrHideCampaign(context.campaignRes);
        }
        if (context.campaignError) {
          this.showOrHideCampaign([]);
        }
        if (context.action === "ServerDown") {
          this.showServerErrorPage(this.view.flxLogin);
        }
        if (context.showProgressBar) {
          FormControllerUtility.showProgressBar(this.view);
        }
        if (context.hideProgressBar) {
          FormControllerUtility.hideProgressBar(this.view);
        }
        if (context.action === "userNamePasswordSuccessfullyChanged") {
          this.showUserNameSuccessfulMessage(context);
        }
        if (context.errorMessage) {
          this.showLoginError(context);
        }
        if (context.loginFailure) {
          this.showLoginError(context);
        }
        if (context.isLanguageSelectionEnabled) {
          this.languageDropdownEnabled(context.isLanguageSelectionEnabled);
        }
        if (applicationManager.getStorageManager().getStoredItem("langObj")) {
          var langObj = applicationManager.getStorageManager().getStoredItem("langObj").language;
          this.showDefaultLanguageOnLoginScreen(langObj);
        } else if (context.defaultLanguage) {
          this.showDefaultLanguageOnLoginScreen(context.defaultLanguage);
        } else {
          this.showDefaultLanguage();
        }
        if (context.welcomeUser) {
          this.welcomeVerifiedUser(context.welcomeUser);
        }
        if (context.userEnroll) {
          this.showEnrollFlex(context.userEnroll);
        }
        if (context.fetchUserFail) {
          this.showFetchUserNameErrorUI(context.fetchUserFail);
        }
        if (context.cardsDataForResetPassword) {
          this.showResetPasswordUI(context.cardsDataForResetPassword);
        }
        if (context.cvvFailure) {
          this.showErrorForCVV();
        }
        if (context.resetPasswordFailed) {
          this.showErrorForResetPassword(context.resetPasswordFailed);
        }
        if (context.passwordPolicies) {
          this.showResetPasswordPage(context.passwordPolicies);
        }
        if (context.resetPasswordSuccss) {
          this.showResetPasswordConfirmation();
        }
        if (context.fetchOTPSuccess) {
          this.showEnterOTPPage();
        }
        if (context.OTPFailed) {
          this.showErrorForOTP();
        }
        if (context.fetchOTPBBSuccess) {
          this.showResetUsingOTPBB();
        }
        if (context.passwordPoliciesBB) {
          this.showResetPasswordPageBB(context.passwordPoliciesBB);
        }
        if (context.action === "LogOutMFA") {
          this.showLogoutPageMFA();
        }
        if (context.action === "LockOutMFA") {
          this.showLockoutPageMFA(context.lockOutTime);
        }
        if (context.browserConfiguration) {
          this.checkBrowser();
        }
        if (context.showScreenToEnterSecureCode) {
          this.showScreenToEnterSecureCode(context.showScreenToEnterSecureCode);
        }
        if (context.isEnteredOTPIncorrect) {
          this.showIncorrectOTPError(context.isEnteredOTPIncorrect);
        }
        if (context.isOTPReceived) {
          this.showScreentoEnterOTP(context.isOTPReceived);
        }
        if (context.isOTPRequestFailed) {
          this.showRequestOTPError(context.isOTPRequestFailed);
        }
        if (context.showSecureAccessCodeScreenAfterResend) {
          this.showSecureAccessCodeScreenAfterResend(context.showSecureAccessCodeScreenAfterResend);
        }
        if (context.verifyUserList) {
          this.showUsersList(context.verifyUserList);
        }
        if (context.verifyUserDetailsError) {
          this.verifyUserDetailsError(context.verifyUserDetailsError.response);
        }
        if (context.dispalyRegenerateScreen) {
          this.displayRegenerateScreen();
        }
        if (context.captchaSuccess) {
          this.setCaptcha(context.captchaSuccess.response, context.captchaSuccess.isLabelRefresh);
        }
        if(context.legalEntitySuccess){
          this.legalEntity(context.legalEntitySuccess);
        }
        if (context.action === "NavigateToActivate") {
          this.goToEnrollActivate();
          this.navigateToActivation();
        }
        if (context.entities) {
          this.legalEntity(context.entities);
        }
        if (context.entityTNC) {
          this.configureTNCLegalEntity(context.entityTNC);
        }
        if (context.entitiesPreLogin) {
          this.preloginLegalEntity(context.entitiesPreLogin);
        }
        this.initializeResponsiveViews();
      },
      goToEnrollActivate: function () {
        var scopeObj = this;
        if(applicationManager.getStorageManager().getStoredItem("langObj") && applicationManager.getStorageManager().getStoredItem("langObj").language === "Arabic")
        {
          scopeObj.view.EnrollNow.imgRightTip.src = "right_arrow_white.png";
          scopeObj.view.ActivateNow.imgRightTip.src = "right_arrow_white.png";
          scopeObj.view.lblSelectOption.text = kony.i18n.getLocalizedString("i18n.LoginEnrollActivate.PleaseSelectAnOption");
        }
        scopeObj.view.EnrollNow.lblName.text = kony.i18n.getLocalizedString("i18n.LoginActivation.Enrollnow");
        scopeObj.view.ActivateNow.lblName.text = kony.i18n.getLocalizedString("i18n.LoginActivation.ActivateYourProfile");
        scopeObj.view.flxCloseFontIconParent.setVisibility(false);
        scopeObj.view.flxContent.setVisibility(true);
        scopeObj.view.flxActivateProfile.setVisibility(false);
        scopeObj.view.flxEnrollActivateContainer.setVisibility(true);
        scopeObj.view.flxCloseEnrollActivate.setVisibility(true);
        scopeObj.view.flxLogin.setVisibility(false);
        let breakPoint = kony.application.getCurrentBreakpoint();
        let isAppstore = scopeObj.view.flxAppStore.isVisible;
        let loginHeight = isAppstore ? (scopeObj.view.flxAppStore.info.frame.y + scopeObj.view.flxAppStore.info.frame.height) :
        (scopeObj.view.flxPlayStore.info.frame.y + scopeObj.view.flxPlayStore.info.frame.height);
        loginHeight += (scopeObj.view.carousel.isVisible ? 175 : 0);
        if (breakPoint > 1024)
          scopeObj.showOrHideLangaugeDropDown(true);
        else if (breakPoint === 1024 || breakPoint === 768) {
          loginHeight += 70;
          scopeObj.view.flxEnrollActivateContainer.height = loginHeight + "dp";
        }
        else if(breakPoint === 640){
          loginHeight += 50;
          scopeObj.view.flxEnrollActivateContainer.height = loginHeight + "dp";
        }           
        else{
          loginHeight += 50;
          scopeObj.view.flxEnrollActivateContainer.height = (scopeObj.view.flxMain.info.frame.height > loginHeight ? scopeObj.view.flxMain.info.frame.height : loginHeight) + "dp";
        }
        scopeObj.showOrHideLangaugeDropDown(false);
        let height = scopeObj.view.activateNow1.info.frame.height + 20;
        height = (scopeObj.view.flxMain.info.frame.height > height) ? scopeObj.view.flxMain.info.frame.height : height;
        scopeObj.view.flxActivateProfile.height = height + "dp";
        //scopeObj.view.flxEnrollActivateContainer.height = height + "dp";
        FormControllerUtility.updateWidgetsHeightInInfo(this, [
          'EnrollNow',
          'EnrollNow.flxInfoContent',
          'ActivateNow',
          'ActivateNow.flxInfoContent'
        ]);
        scopeObj.view.forceLayout();
        scopeObj.view.EnrollNow.lblInfo.top = scopeObj.view.EnrollNow.flxInfoContent.info.frame.height > 25 ? "0dp" : "5dp";
        scopeObj.view.ActivateNow.lblInfo.top = scopeObj.view.ActivateNow.flxInfoContent.info.frame.height > 25 ? "0dp" : "5dp";
        scopeObj.setFooterHeight(loginHeight);
        scopeObj.view.forceLayout();
      },
      navigateToActivation: function () {
        var scopeObj = this;
        scopeObj.view.flxContent.setVisibility(false);
         //for SCA 
		 let presentationUtility = applicationManager.getPresentationUtility(); 
		 if (presentationUtility.MFA && presentationUtility.MFA.isSCAEnabled && presentationUtility.MFA.isSCAEnabled()) { 
		  scopeObj.showActivateProfileQRScan(); 
         } else{ 
         scopeObj.view.activateNow1.resetUI();
	     scopeObj.view.activateNow1.setVisibility(true);
         scopeObj.view.flxActivateProfile.setVisibility(false);
         scopeObj.view.flxCloseEnrollActivate.setVisibility(true);
		} 
		scopeObj.view.flxContent.setVisibility(false); 
		scopeObj.view.flxActivateProfile.setVisibility(true); 
        scopeObj.view.forceLayout();
      },
      
      showActivateProfileQRScan: function() { 
		this.SCAIsMobileFirst = this.getSCAIsMobileFirst();
		if(this.SCAIsMobileFirst){
        //Work around end 
        this.view.ActivateProfile.showQRCode(); 
        this.view.ActivateProfile.setVisibility(true); 
        this.view.activateNow1.setVisibility(false); 
        this.view.flxActivateProfile.setVisibility(true);
        this.view.flxCloseEnrollActivate.setVisibility(true); 
        this.view.forceLayout(); 
		
          } else
            {
              //Work around fix for browser widget content not getting visible for first time.
          	this.view.ActivateProfile.setVisibility(false);
            this.view.activateNow1.setVisibility(true);
            this.view.flxActivateProfile.setVisibility(true);
          	this.view.flxCloseEnrollActivate.setVisibility(true);
            this.view.forceLayout();
              
            }

      }, 
      getSCAIsMobileFirst : function(){
        let self = this;
        if(self.clientProperties){
          if(self.clientProperties && self.clientProperties.SCA_IS_MOBILE_FIRST && self.clientProperties.SCA_IS_MOBILE_FIRST.toUpperCase()==="FALSE")
            return false;
          else 
            return true;
        } else {
          let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
          configurationSvc.getAllClientAppProperties(function(response) {
            self.clientProperties = response;
            if(response && response.SCA_IS_MOBILE_FIRST && response.SCA_IS_MOBILE_FIRST.toUpperCase()==="FALSE")
              return false;
            else 
              return true;
          },function(){
            kony.print("error", "unable to fetch client properties");
          });
        }
      },
      
      AdjustScreen: function () {
        let self = this;
        let breakPoint = kony.application.getCurrentBreakpoint();
        let isAppstore = self.view.flxAppStore.isVisible;
        let loginHeight = isAppstore ? (self.view.flxAppStore.info.frame.y + self.view.flxAppStore.info.frame.height) :
        (self.view.flxPlayStore.info.frame.y + self.view.flxPlayStore.info.frame.height);
        loginHeight += (self.view.carousel.isVisible ? 175 : 0);
        if (breakPoint === 1024 || breakPoint === 768) {
          loginHeight += 70;
          self.view.flxLoginComponentContainer.height = loginHeight + "dp";
          self.view.flxLogin.height = loginHeight + "dp";
        } else if (breakPoint === 640) {
          loginHeight += 50;
          self.view.flxLoginComponentContainer.height = loginHeight + "dp";
          self.view.flxLogin.height = loginHeight + "dp";
        } else {
          loginHeight += 50;
          self.view.flxLoginComponentContainer.height = loginHeight + "dp";
          self.view.flxLogin.height = (self.view.flxMain.info.frame.height > loginHeight ? self.view.flxMain.info.frame.height : loginHeight) + "dp";
        }
        self.setFooterHeight(loginHeight);
        self.view.forceLayout();
      },
      mappingCampaingsData: function (campaign) {
        let url = campaign.destinationURL;
        return {
          "flxCampaignCarousel": {
            "onClick": () => kony.application.openURL(url)
          },
          "imgCampaign": {
            "src": campaign.imageURL
          }
        };
      },
      showOrHideCampaign: function (data) {
        var self = this;
        if (data.length === 0) {
          self.view.carousel.setVisibility(false);
        } else {
          //var CampaignManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManagement");
          //CampaignManagementModule.presentationController.updateCampaignDetails(data);
          let widgetMap = {
            "flxCampaignCarousel": "flxCampaignCarousel",
            "imgCampaign": "imgCampaign",
          };
          let campaignsData = data.map(self.mappingCampaingsData);
          self.view.carousel.setVisibility(true);
          self.view.carousel.segCarousel.widgetDataMap = widgetMap;
          self.view.carousel.segCarousel.setData(campaignsData);
        }
        self.AdjustScreen();
      },
      getQueryString: function (field, url) {
        var href = url;
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var string = reg.exec(href);
        return string ? string[1] : null;
      },
      /**
               * Method to hides all views in login form.
               */
      hideAllLoginViews: function () {
        this.view.flxLogin.setVisibility(false);
        this.view.flxVerification.setVisibility(false);
        this.view.flxWelcomeBack.setVisibility(false);
        this.view.flxResetPasswordOptions.setVisibility(false);
        this.view.flxSendOTP.setVisibility(false);
        this.view.flxResetUsingOTP.setVisibility(false);
        this.view.flxResetUsingCVV.setVisibility(false);
        this.view.flxResetPassword.setVisibility(false);
        this.view.flxLoginMFA.setVisibility(false);
        this.view.flxResetSuccessful.setVisibility(false);
        this.view.flxBlocked.setVisibility(false);
        this.view.flxEnrollOrServerError.setVisibility(false);
        this.view.flxEnroll.setVisibility(false);
        this.view.flxLogoutMsg.setVisibility(false);
        this.view.flxLegalEntity.serVisibility(false);
      },
      /**
               * This function shows the logout Message on the login form
               */
      showLogoutPage: function () {
        // this.view.lblLoggedOut.text = kony.i18n.getLocalizedString("i18n.login.SuccessfullyLoggedOut");
        // this.view.imgLogoutSuccess.src = ViewConstants.IMAGES.LOGOUT_TICK_MARK;
        var scopeObj = this;
        this.view.logOutMsg.imgLogoutSuccess.src = ViewConstants.IMAGES.SUCCESS_GREEN;
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.logOutMsg.lblLoggedOut, kony.i18n.getLocalizedString("i18n.login.SuccessfullyLoggedOut"), accessibilityConfig);
        CommonUtilities.setText(this.view.logOutMsg.lblSuccessIcon, kony.i18n.getLocalizedString("i18n.login.LogOutSuccess"), accessibilityConfig);
        //this.view.logOutMsg.lblLoggedOut.text = kony.i18n.getLocalizedString("i18n.login.SuccessfullyLoggedOut");
        //this.view.logOutMsg.lblSuccessIcon.text = kony.i18n.getLocalizedString("i18n.login.LogOutSuccess");
        //             this.view.logOutMsg.lblLoggedOut.top = "45%";
        //             this.view.logOutMsg.lblLoggedOut.height = "27%";
        this.restoreOriginalMainLoginUIChanges();
        this.changesAfterLogout();
        kony.timer.schedule("survey", function () {
          scopeObj.changesAfterLogout();
        }, 1, false);
        FormControllerUtility.hideProgressBar(scopeObj.view);
        this.initializeResponsiveViews();
      },
      /**
               * This function shows the logout Message on the login form
               */
      showLogoutPageMFA: function () {
        var scopeObj = this;
        this.view.logOutMsg.imgLogoutSuccess.src = "error_yellow.png";
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.logOutMsg.lblLoggedOut, kony.i18n.getLocalizedString("i18n.login.logoutMFA"), accessibilityConfig);
        //this.view.logOutMsg.lblLoggedOut.text = kony.i18n.getLocalizedString("i18n.login.logoutMFA");
        this.view.logOutMsg.lblSuccessIcon.setVisibility(false);
        //             this.view.logOutMsg.lblLoggedOut.top = "45%";
        //             this.view.logOutMsg.lblLoggedOut.height = "27%";
        this.restoreOriginalMainLoginUIChanges();
        this.changesAfterLogout();
        kony.timer.schedule("survey", function () {
          scopeObj.changesAfterLogout();
        }, 1, false);
        FormControllerUtility.hideProgressBar(scopeObj.view);
        this.initializeResponsiveViews();
      },
      /**
               * This function shows the logout Message on the login form
               */
      showLockoutPageMFA: function (lockTime) {
        var scopeObj = this;
        this.view.logOutMsg.imgLogoutSuccess.src = "error_yellow.png";
        var text = kony.i18n.getLocalizedString("i18n.login.LockoutMFA") + " " + lockTime + " " + kony.i18n.getLocalizedString("i18n.mfa.minutes");
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.logOutMsg.lblLoggedOut, text, accessibilityConfig);
        //this.view.logOutMsg.lblLoggedOut.text = kony.i18n.getLocalizedString("i18n.login.LockoutMFA") + " " + lockTime + " " + kony.i18n.getLocalizedString("i18n.mfa.minutes");
        this.view.logOutMsg.lblSuccessIcon.setVisibility(false);
        //             this.view.logOutMsg.lblLoggedOut.top = "45%";
        //             this.view.logOutMsg.lblLoggedOut.height = "27%";
        this.restoreOriginalMainLoginUIChanges();
        this.changesAfterLogout();
        kony.timer.schedule("survey", function () {
          scopeObj.changesAfterLogout();
        }, 1, false);
        this.initializeResponsiveViews();
      },
      showUserNameSuccessfulMessage: function (context) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        if (context.text === "username") {
          CommonUtilities.setText(this.view.logOutMsg.lblLoggedOut, kony.i18n.getLocalizedString("i18n.common.usernamechanged"), accessibilityConfig);
          //this.view.logOutMsg.lblLoggedOut.text = kony.i18n.getLocalizedString("i18n.common.usernamechanged");
        } else if (context.text === "password") {
          CommonUtilities.setText(this.view.logOutMsg.lblLoggedOut, kony.i18n.getLocalizedString("i18n.common.passwordchanged"), accessibilityConfig);
          //this.view.logOutMsg.lblLoggedOut.text = kony.i18n.getLocalizedString("i18n.common.passwordchanged");
        }
        this.view.logOutMsg.imgLogoutSuccess.src = ViewConstants.IMAGES.SUCCESS_GREEN;
        this.restoreOriginalMainLoginUIChanges();
        this.initializeResponsiveViews();
      },
      /**
               * This function shows the message when the session is Expired
               */
      showSessionExpiredPage: function () {
        this.view.logOutMsg.imgLogoutSuccess.src = ViewConstants.IMAGES.SUCCESS_GREEN;
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.logOutMsg.lblLoggedOut, kony.i18n.getLocalizedString("i18n.login.SessionExpired"), accessibilityConfig);
        //this.view.logOutMsg.lblLoggedOut.text = kony.i18n.getLocalizedString("i18n.login.SessionExpired");
        //             this.view.logOutMsg.lblLoggedOut.top = "22%";
        //          this.view.logOutMsg.lblLoggedOut.height = "9%";
        this.restoreOriginalMainLoginUIChanges();
        this.changesAfterLogout();
        this.initializeResponsiveViews();
      },
      /**
               * selectYourLanguage :This function sets the language selected from the dropdown menu to the label and also stores it in localstore
               */
      selectYourLanguage: function (widgetInfo,segInfo) {
        this.view.flxLanguagePicker.setVisibility(false);
        var langSelected = JSON.stringify(this.view.segLanguagesList.data[segInfo.rowIndex]["lblLang"]);
        langSelected = langSelected.replace(/"/g, "");
        this.showLanguageSelectionPopUp(langSelected);
      },
      /**
               * Method to show language selection popup
               * @param {String} langSelected - selected language
               */
      showLanguageSelectionPopUp: function (langSelected) {
        var scopeObj = this;
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.CustomChangeLanguagePopup.lblPopupMessage, kony.i18n.getLocalizedString("i18n.common.changeLanguageMessage") + " " + langSelected + "?", accessibilityConfig);
        //this.view.CustomChangeLanguagePopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.common.changeLanguageMessage") + " " + langSelected + "?";
        this.view.flxChangeLanguage.setVisibility(true);
        this.view.CustomChangeLanguagePopup.flxCross.setFocus(true);
        this.view.CustomChangeLanguagePopup.btnYes.onClick = function () {
          applicationManager.getStorageManager().setStoredItem("langObj", {
            language: scopeObj.getBackendLanguage(langSelected)
          });
          var localeCode = applicationManager.getConfigurationManager().locale[scopeObj.getBackendLanguage(langSelected)];
          kony.i18n.setCurrentLocaleAsync(localeCode, function () {
            applicationManager.getStorageManager().setStoredItem("langObj", {
              language: scopeObj.getBackendLanguage(langSelected)
            });
            applicationManager.getConfigurationManager().setLocaleAndDateFormat({
              "data": {}
            });
            applicationManager.getNavigationManager().navigateTo("frmLoginLanguage");
          }, function () { });
          CommonUtilities.setText(this.view.lblLanguage, langSelected, accessibilityConfig);
          //this.view.lblLanguage.text = langSelected;
          this.hideLanguageSelectionPopUp();
        }.bind(this);
        this.view.CustomChangeLanguagePopup.btnNo.onClick = this.hideLanguageSelectionPopUp.bind(this);
        this.view.CustomChangeLanguagePopup.flxCross.onClick = this.hideLanguageSelectionPopUp.bind(this);
      },
      hideLanguageSelectionPopUp: function () {
        this.view.lblCheckBox.text = "O";
        this.view.flxDropdown.accessibilityConfig = {
              a11yARIA: {
                "aria-expanded": false,
                role: "button",
                "aria-labelledby":"lblLanguage",
              },
            };
        this.view.flxChangeLanguage.setVisibility(false);
        this.view.flxDropdown.setActive(true);
      },
      updateFeedbackId: function () {
        var feedbackID = applicationManager.getStorageManager().removeStoredItem("feedbackUserId");
        if (feedbackID) {
          applicationManager.getFeedbackManager().updateFeedbackId(feedbackID);
        }
      },
      /**
               * This UI function does the needed changes once we click on logout button to the login form
               */
      changesAfterLogout: function () {
        this.updateFeedbackId();
        //  this.view.flxLogoutMsg.setVisibility(true);
        if (applicationManager.getConfigurationManager().isFeedbackEnabled === "false") {
          this.view.flxFeedbackTakeSurvey.setVisibility(false);
        } else {
          if (kony.application.getCurrentBreakpoint() === 1400 && orientationHandler.isTablet) {
            this.view.CustomFeedbackPopup.width = "60%";
          }
          this.view.flxFeedbackTakeSurvey.setVisibility(true);
        }
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          this.view.flxImgKony.left = "14%";
        }
        // this.view.lblLanguage.skin = ViewConstants.SKINS.LANGUAGE1;
        this.view.flxMain.skin = ViewConstants.SKINS.LOGIN_AFTER_LOGOUT;
        // this.view.flxLogin.top = "120dp";
        //this.view.flxMain.top = "0dp";
        this.view.flxLogin.setVisibility(true);
        this.view.logOutMsg.AlterneteActionsLoginNow.fontIconOption.skin = "sknlblfonticon24px0273e3";
        this.view.logOutMsg.AlterneteActionsLoginNow.fontIconOption.text = "V";
        this.view.flxMain.parent.forceLayout();
      },
      showErrorForResetPassword: function (errorMessage) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.newpasswordsetting.lblErrorInfo, errorMessage.dbpErrMsg, accessibilityConfig);
        //this.view.newpasswordsetting.lblErrorInfo.text = errorMessage.dbpErrMsg;
        this.view.newpasswordsetting.lblErrorInfo.isVisible = true;
        this.view.newpasswordsetting.tbxNewPassword.text = "";
        this.view.newpasswordsetting.imgValidPassword.isVisible = false;
        this.view.newpasswordsetting.imgPasswordMatched.isVisible = false;
        FormControllerUtility.disableButton(this.view.newpasswordsetting.btnNext);
        this.view.newpasswordsetting.tbxMatchPassword.text = "";
        this.view.forceLayout();
      },
  
      /**
               * The function is used to turn the visibility on or off for the Language Selection
               */
      languageDropdownEnabled: function (isEnabled) {
        if (isEnabled === "true") {
          this.view.flxDropdown.setVisibility(true);
        } else {
          this.view.flxDropdown.setVisibility(false);
        }
        this.view.forceLayout();
      },
  
      /**
               * This function is called on PreShow of the Login form
               */
      preshowFrmLogin: function () {
        var scopeObj = this;
        scopeObj.view.OTPModule.lblWrongOTP.isVisible = false;
        var OLBLogoutStatus = kony.store.getItem('OLBLogoutStatus');
        this.view.EnrollAlert.flxServerError.top = "120dp";
        this.view.OTPModule.btnResendOTP.toolTip = kony.i18n.getLocalizedString("i18n.login.ResendOtp");
        this.view.OTPModule.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
        this.view.OTPModule.lblFavoriteEmailCheckBox.onTouchEnd = function () {
          CommonUtilities.toggleFontCheckbox(scopeObj.view.OTPModule.lblFavoriteEmailCheckBox);
        };
        /*  if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                              this.view.lblCopyright.contentAlignment = "2";
                          } else {
                              this.view.lblCopyright.contentAlignment = "1";
                          } */ // ARB-12578
        this.view.EnrollAlert.lblAppTitle.isVisible = false;
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.letsverify.lblSSN, kony.i18n.getLocalizedString("i18n.common.SSN"), accessibilityConfig);
        // this.view.letsverify.lblSSN.text = kony.i18n.getLocalizedString("i18n.common.SSN");
        this.view.btnVeiwMore.hoverSkin = "sknbtn41a0edviewmoreHover";
        this.view.flxLogoutMsg.setVisibility(false);
        this.view.flxEnrollActivateContainer.setVisibility(false);
        this.view.btnVeiwMore.onClick = function () {
          var config = applicationManager.getConfigurationManager();
          kony.application.openURL(config.getConfigurationValue("LINK_TO_DBX"));
        }
        if (this.view.flxEnrollOrServerError.isVisible || this.view.flxVerification.isVisible) {
          scopeObj.view.flxLogin.setVisibility(false);
        } else {
          scopeObj.view.flxLogin.setVisibility(true);
        }
        this.view.flxPlayStore.setVisibility(false);
        FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxAppStore',
                                                               'flxPlayStore',
                                                               'flxMain',
                                                               'cantSignIn.flxVerify',
                                                               'flxDropdown',
                                                               'flxNewNEnroll', 'activateNow1',
                                                               'flxLoginComponentContainer',
                                                               'AllForms1'
                                                              ]);
  
        this.view.carousel.accessibilityConfig = {
  
          "a11yHidden":true,
          a11yARIA:{
            tabindex:-1
          },
        };
        this.view.carousel.segCarousel.accessibilityConfig={
          "a11yHidden":true,
          a11yARIA:{
            tabindex:-1
          },
        };
  
        this.view.forceLayout();
      },
      /**
               * This function is for recovering the original UI changes
               */
      restoreOriginalMainLoginUIChanges: function () {
        this.view.flxImgKony.setVisibility(true);
        this.view.flxMain.skin = ViewConstants.SKINS.LOGIN_MAIN_BAKGROUND;
        this.view.flxLogin.left = "0px";
        this.view.btnOnlineAccessEnroll.isVisible = true;
        this.view.flxResetUsingOTP.setVisibility(false);
        this.view.flxResetUsingCVV.setVisibility(false);
        this.view.flxResetPassword.setVisibility(false);
        this.view.flxResetSuccessful.setVisibility(false);
        this.view.flxWelcomeBack.setVisibility(false);
        this.view.flxLogin.setVisibility(true);
        this.view.flxVerification.setVisibility(false);
        this.view.flxResetPasswordOptions.setVisibility(false);
        this.view.flxSendOTP.setVisibility(false);
        this.view.flxBlocked.setVisibility(false);
        this.view.flxEnrollOrServerError.setVisibility(false);
        this.view.flxEnroll.setVisibility(false);
        this.view.flxFeedbackTakeSurvey.setVisibility(false);
        this.view.flxLoginMFA.setVisibility(false);
        this.view.imgDropdown.src = ViewConstants.IMAGES.CHEVRON_DOWN_WHITE;
        this.view.newpasswordsetting.tbxNewPassword.text = "";
        this.view.newpasswordsetting.tbxMatchPassword.text = "";
        this.view.newpasswordsetting.imgValidPassword.isVisible = false;
        this.view.newpasswordsetting.imgPasswordMatched.isVisible = false;
        this.view.flxPhoneAndEmail.setVisibility(false);
        this.view.OTPModule.flxEnterOTP.setVisibility(false);
        this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(false);
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        this.view.flxDropdown.isVisible = true;
        FormControllerUtility.disableButton(this.view.letsverify.btnProceed);
        FormControllerUtility.disableButton(this.view.resetusingOTPEnterOTP.btnNext);
        FormControllerUtility.disableButton(this.view.ResetOrEnroll.btnNext);
        FormControllerUtility.disableButton(this.view.newpasswordsetting.btnNext);
        this.view.btnOpenNewAccount.isVisible = true;
        this.view.ResetOrEnroll.lblWrongCvv.isVisible = false;
        this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = false;
        this.view.newpasswordsetting.lblErrorInfo.isVisible = false;
        this.view.resetusingOTPEnterOTP.tbxCVV.text = "";
        this.initializeResponsiveViews();
        this.showOrHideMFAAuthentication(false, false, false);
      },
      /**
               * showServerErrorPage :This function is for showing the server DownTime Screen
               * @param {object} currentFlex - flex object
               */
      showServerErrorPage: function (currentFlex) {
        //to handle csr successs but entitlements failure
        if (!this.view.isVisible) {
          this.view.setVisibility(true);
        }
        currentFlex.isVisible = false;
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.EnrollAlert.rtxServerError, kony.i18n.getLocalizedString("i18n.common.OoopsServerError"), accessibilityConfig);
        this.view.EnrollAlert.btnBackToLogin.setVisibility(false);
        this.view.logOutMsg.lblSuccessIcon.setVisibility(false);
        this.view.logOutMsg.lblLoggedOut.setVisibility(false);
        this.view.logOutMsg.imgLogoutSuccess.setVisibility(false);
        this.view.flxLoginMFA.setVisibility(false);
        FormControllerUtility.hideProgressBar(this.view);
        this.view.flxEnrollOrServerError.isVisible = true;
        this.view.EnrollAlert.btnBackToLogin.setVisibility(true);
        currentFlex.parent.forceLayout();
      },
      /**
               * This function is called once the user clicks on loginlater after resetting the password
               * @param {obejct} currentFlex current flex object
               */
      loginLater: function (currentFlex) {
        currentFlex.isVisible = false;
        this.restoreOriginalMainLoginUIChanges();
        applicationManager.getConfigurationManager().fetchApplicationProperties(function (res) {
          applicationManager.getNavigationManager().updateForm({
            isLanguageSelectionEnabled: res.isLanguageSelectionEnabled,
            defaultLanguage: res.language
          }, "frmLogin");
        }, function () { })
        // if(kony.application.getCurrentBreakpoint() === 1400){
        //   this.view.flxLogin.top = "0dp";
        // }
        // else if(kony.application.getCurrentBreakpoint() === 640){
        //   this.view.flxLogin.top = "40dp";
        // }
        // else if(kony.application.getCurrentBreakpoint() === 768 || kony.application.getCurrentBreakpoint() === 1024){
        //   this.view.flxLogin.top = "60dp";
        // }
        currentFlex.parent.forceLayout();
        this.initializeResponsiveViews();
      },
      /**
               * UI Function change all button widget pointer
               */
      onLoadChangePointer: function () {
        var elems = document.querySelectorAll("input[kwidgettype='Button']");
        for (var i = 0, iMax = elems.length; i < iMax; i++) {
          elems[i].style.cursor = 'pointer';
        }
      },
      /**
               * This function gets the unmasked username while traversing through the JSON in the local Storage
               * @param {string} enteredUserName entered username
               * @returns {string} ummasked username
               */
      getUnMaskedUserName: function (enteredUserName) {
        var names = JSON.parse(applicationManager.getStorageManager().getStoredItem("olbNames")) || [];
        var maskedUserValues = [];
        var unmaskedUserValues = [];
        maskedUserValues = names.map(function (nameObj) {
          unmaskedUserValues.push(Object.keys(nameObj)[0]);
          return nameObj[Object.keys(nameObj)[0]];
        });
        var index = maskedUserValues.indexOf(enteredUserName);
        if (index >= 0) {
          return unmaskedUserValues[index];
        }
        return null;
      },
  
      /**
               * Method to show Forgot UI
               * This function is called once the user clicks on forgot button then login form visiblilty is set to false and verification flex visibility is set to true
               */
      verifyUser: function () {
        var self = this;
        this.view.flxLogoutMsg.setVisibility(false);
        //             this.view.flxMain.skin = ViewConstants.SKINS.LOGIN_ERROR_BAKGROUND;
        this.view.flxLogin.isVisible = false;
        // this.view.main.rtxErrorMsgUser.setVisibility(false);
        this.view.flxVerification.isVisible = true;
        this.view.flxDropdown.isVisible = false;
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          this.view.flxDropdown.setVisibility(false);
          this.view.flxLanguagePicker.setVisibility(false);
        }
        if (kony.application.getCurrentBreakpoint() === 768 || orientationHandler.isTablet) {
          this.view.flxDropdown.setVisibility(false);
          this.view.flxLanguagePicker.setVisibility(false);
        }
        if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
          this.view.flxDropdown.setVisibility(false);
          this.view.flxLanguagePicker.setVisibility(false);
        }
        if (kony.application.getCurrentBreakpoint() === 1400) {
          this.view.letsverify.flxLetsVerifyCntr.height = "100dp";
          this.view.letsverify.flxLetsVerifyCntr.top = "115dp";
        }
        this.emptyUserDetails();
        this.view.flxClose.onClick = function () {
          self.view.flxLogin.isVisible = true;
          self.view.flxDropdown.isVisible = true;
          self.view.flxVerification.isVisible = false;
          self.emptyUserDetails();
          self.initializeResponsiveViews();
        }
        this.view.flxVerification.parent.forceLayout();
        this.initializeResponsiveViews();
      },
      /**
               * This function clear all fields date in form Login view.
               */
      emptyLoginData: function () {
        this.emptyUserDetails();
        this.view.flxResetPasswordOptions.isVisible = false;
        this.view.flxVerification.isVisible = false;
        this.view.flxWelcomeBack.isVisible = false;
        this.view.flxResetUsingCVV.isVisible = false;
        this.view.flxResetPassword.isVisible = false;
        this.view.flxSendOTP.isVisible = false;
        this.view.flxResetUsingOTP.isVisible = false;
        this.view.flxEnroll.isVisible = false;
        this.view.flxResetSuccessful.isVisible = false;
        this.view.flxLogin.isVisible = true;
        this.view.flxSelectUsername.isVisible = false;
        this.view.flxPhoneAndEmail.isVisible = false;
        this.view.OTPModule.flxEnterSecureAccessCode.isVisible = false;
        this.view.OTPModule.flxEnterOTP.isVisible = false;
        this.view.flxDropdown.isVisible = true;
        this.loadAuthModule().presentationController.clearForgotObject();
        this.initializeResponsiveViews();
      },
      /**
               * This function empties all the user details entered in  verify form and disable the login button
               */
      emptyUserDetails: function () {
        this.view.letsverify.tbxSSN.text = "";
  
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        this.view.letsverify.tbxLastName.text = "";
        this.view.ResetOrEnroll.tbxCVV.text = "";
        this.view.resetusingOTPEnterOTP.tbxCVV.text = "";
        this.view.newpasswordsetting.tbxNewPassword.text = "";
        this.view.newpasswordsetting.tbxMatchPassword.text = "";
        this.view.newpasswordsetting.imgValidPassword.isVisible = false;
        this.view.newpasswordsetting.imgPasswordMatched.isVisible = false;
        FormControllerUtility.disableButton(this.view.newpasswordsetting.btnNext);
        FormControllerUtility.disableButton(this.view.resetusingOTPEnterOTP.btnNext);
        FormControllerUtility.disableButton(this.view.ResetOrEnroll.btnNext);
        this.view.letsverify.lblWrongInfo.setVisibility(false);
        this.view.flxPhoneAndEmail.isVisible = false;
        this.view.letsverify.DateInput.setText("");
        this.view.forceLayout();
        FormControllerUtility.disableButton(this.view.letsverify.btnProceed);
      },
      /**
               * Ui Method to handle the responsive things
               * @param {integer} width value specifies width
               */
      onBreakpointChange: function (width) {
        kony.print('on breakpoint change');
        if (this.isMicroAppPresent("CampaignMA"))
          this.loadAuthModule().presentationController.getPreLoginCampaignsOnBreakpointChange();
        else {
          this.view.carousel.setVisibility(false);
          if (!this.isOriginationFlow)
            this.loadAuthModule().presentationController.getAllClientAppProperties();
        }
        orientationHandler.onOrientationChange(this.onBreakpointChange);
        this.view.lblCopyright.setVisibility(true);
        this.view.lblCopyrightTab1.setVisibility(false);
        this.view.lblCopyrightTab2.setVisibility(false);
        this.view.logOutMsg.lblSuccessIcon.contentAlignment = constants.CONTENT_ALIGN_CENTER;
        var responsiveFonts = new ResponsiveFonts();
        if ((width <= 1024 && orientationHandler.isTablet) || (width <= 1024 && orientationHandler.isDesktop)) {
          this.view.letsverify.width = "100%";
          this.view.loginComponent.top="45dp";
          this.view.letsverify.lblWrongInfo.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.ResetOrEnroll.lblResetPassword.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.ResetOrEnroll.lblWrongCvv.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.resetusingOTP.lblResetPasswordMsg.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.resetusingOTP.lblResendOTPMsg.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.passwordresetsuccess.lblReserSuccessMsg.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.ResetOrEnroll.lblWrongCvv.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.resetusingOTPEnterOTP.lblResendOTPMsg.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.resetusingOTPEnterOTP.lblResetPasswordMsg.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.ResetOrEnroll.lblWrongCvv.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.resetusingOTPEnterOTP.rtxEnterCVVCode.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.resetusingOTP.rtxEnterCVVCode.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.ResetOrEnroll.rtxEnterCVV.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.letsverify.btnProceed.width = "85%";
          this.view.AlterneteActionsEnterCVV.rtxCVV.skin = "sknSSPLight0273E314Px";
          this.view.newpasswordsetting.lblErrorInfo.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.newpasswordsetting.lblResetPasswordTitle.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        }
        if ((width === 640 && orientationHandler.isMobile) || (width === 640 && orientationHandler.isDesktop)) {
          this.view.letsverify.width = "100%";
          this.view.flxCloseFontIconParent.left = "";
          this.view.flxCloseFontIconParent.right = "7.50%";
          this.view.flxCloseFontIconParent.top = "40dp";
          this.view.flxDropdown.right = "13.88%";
          this.view.flxFooterMenu.width = "145dp";
          this.view.btnLocateUs.left = "0dp";
          this.view.flxLogin.top = "40dp";
          this.view.EnrollPromptScreen.rtxServerError.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.logOutMsg.lblSuccessIcon.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.logOutMsg.lblLoggedOut.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        }
        if ((width <= 640 && orientationHandler.isMobile) || (width <= 640 && orientationHandler.isDesktop)) {
          this.view.letsverify.width = "100%";
          this.view.loginComponent.top="45dp";
          this.view.AlterneteActionsSignIn.rtxCVV.skin = "sknSSPLight0273E315Px";
          this.view.AlterneteActionsResetPassword.rtxCVV.skin = "sknSSPLight0273E315Px";
          this.view.AlterneteActionsEnterCVV.rtxCVV.skin = "sknSSPLight0273E315Px";
          this.view.AlterneteActionsEnterPIN.rtxCVV.skin = "sknSSPLight0273E315Px";
          responsiveFonts.setMobileFonts();
          this.view.letsverify.lbxDate.left = "4%";
          this.view.forceLayout();
        }
        if ((width === 768 && orientationHandler.isTablet) || (width === 768 && orientationHandler.isDesktop)) {
          this.view.letsverify.width = "100%";
          this.view.flxCloseFontIconParent.left = "";
          this.view.flxCloseFontIconParent.right = "15%";
          this.view.flxCloseFontIconParent.top = "60dp";
          this.view.flxDropdown.right = "20.25%";
          this.view.flxLogin.top = "60dp";
          this.view.resetusingOTPEnterOTP.rtxEnterCVVCode.left = "86dp";
          this.view.resetusingOTPEnterOTP.rtxEnterCVVCode.top = "16dp";
          this.view.logOutMsg.lblLoggedOut.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.logOutMsg.lblSuccessIcon.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.EnrollPromptScreen.rtxServerError.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        }
        if ((width === 1024 && orientationHandler.isTablet) || (width === 1024 && orientationHandler.isDesktop)) {
          this.view.letsverify.width = "100%";
          this.view.flxSelectSignInOrResetPassword.width = "100%";
          this.view.flxDropdown.right = "24.5%";
          this.view.flxCloseFontIconParent.left = "";
          this.view.flxCloseFontIconParent.right = "20%";
          this.view.flxCloseFontIconParent.top = "60dp";
          this.view.ResetOrEnroll.flxHeaderNError.top = "130dp";
          this.view.resetusingOTP.flxHeaderNError.top = "130dp";
          this.view.resetusingOTPEnterOTP.flxHeaderNError.top = "130dp";
          this.view.resetusingOTPEnterOTP.flxImgTxt.height = "60dp";
          this.view.flxLogin.top = "60dp";
          this.view.logOutMsg.lblLoggedOut.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.logOutMsg.lblSuccessIcon.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
          this.view.EnrollPromptScreen.rtxServerError.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        }
        if (width > 1024) {
          this.view.letsverify.btnProceed.width = "68%";
          this.view.ResetOrEnroll.btnNext.width = "68%";
          this.view.resetusingOTP.btnNext.width = "68%";
          this.view.EnrollAlert.btnBackToLogin.width = "68%";
          this.view.EnrollAlert.flxServerError.width = "68%";
          this.view.resetusingOTPEnterOTP.btnNext.width = "68%";
          this.view.loginComponent.top="20dp";
          this.view.ResetOrEnroll.flxHeaderNError.top = "130dp";
          this.view.resetusingOTP.flxHeaderNError.top = "130dp";
          this.view.resetusingOTPEnterOTP.flxHeaderNError.top = "130dp";
          this.view.resetusingOTPEnterOTP.flxImgTxt.height = "60dp";
          this.view.ResetOrEnroll.lblWrongCvv.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
          this.view.ResetOrEnroll.lblWrongCvv.left = "75dp";
          this.view.resetusingOTP.lblResetPasswordMsg.left = "86px";
          this.view.resetusingOTPEnterOTP.lblResendOTPMsg.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
          this.view.resetusingOTPEnterOTP.lblResendOTPMsg.left = "88px";
          this.view.resetusingOTPEnterOTP.lblResetPasswordMsg.left = "88px";
          this.view.resetusingOTPEnterOTP.lblWrongOTP.left = "88px";
          this.view.newpasswordsetting.lblErrorInfo.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
          this.view.logOutMsg.lblSuccessIcon.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;       
        }
        if (width!== 1400){     
        }
        if(width >=1024 && width!==1024){
          scopeObj=this;
          this.view.onTouchEnd = function() {
            scopeObj.frmOnTouchEnd();
          };
        }
        else{
          this.view.onTouchEnd = function() {};   
        }
        if(this.view.flxDropdown.isVisible){
          var scopeObj=this;
          if(scopeObj.view.flxLanguagePicker.isVisible===true){
            scopeObj.view.lblCheckBox.text="P";
          }
          else if(scopeObj.view.flxLanguagePicker.isVisible===false){
            scopeObj.view.lblCheckBox.text="O";
          }
          else if(scopeObj.view.lblCheckBox.text="O"){
            scopeObj.view.flxLanguagePicker.isVisible=false ;
          }
          else{
            scopeObj.view.flxLanguagePicker.isVisible=true
          }
        }
        var scope = this;
        var views = Object.keys(this.responsiveViews);
        views.forEach(function (e) {
          scope.view[e].isVisible = scope.responsiveViews[e];
        });
        if (width >= 768 && orientationHandler.isTablet) {
          this.view.flxLogin.top = "60dp";
          this.view.letsverify.flxDateInput.width = "85%";
          this.view.letsverify.btnProceed.width = "85%";
        }
        this.view.loginComponent.onBreakpointChange();
        scope.AdjustScreen();
        scope.screenAdjustments();
        //this.allFieldsCheck();
      },
      setupFormOnTouchEnd: function (width) {
        if (width == 640) {
          this.view.onTouchEnd = function () { }
          this.nullifyPopupOnTouchStart();
        } else {
          if (width == 1024 || width == 768) {
            this.view.onTouchEnd = function () { }
            this.nullifyPopupOnTouchStart();
          } else {
            scopeObj=this;
            this.view.onTouchEnd = function() {
              scopeObj.frmOnTouchEnd();
          }
          var userAgent = kony.os.deviceInfo().userAgent;
          if (userAgent.indexOf("iPad") != -1) {
            this.view.onTouchEnd = function () { }
            this.nullifyPopupOnTouchStart();
          } else if (userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") == -1) {
            this.view.onTouchEnd = function () { }
            this.nullifyPopupOnTouchStart();
          }
        }}
      },
      nullifyPopupOnTouchStart: function () { },
      /**
               * Navigates to new user on boarding
               */
      navigateToNewUserOnBoarding: function () {
        this.loadAuthModule().presentationController.navigateToNewUserOnBoarding();
      },
      /**
               * This function enables the Proceed button only if all the fields(SSN,DOB,lastName) are correct in Forgot form /verify form.
               */
      allFieldsCheck: function () {
        var SSN = this.view.letsverify.tbxSSN.text.trim();
        var lastName = this.view.letsverify.tbxLastName.text.trim();
        var text = this.view.letsverify.DateInput.getText();
        var date = "";
        if (text.length === 10) {
          date = this.view.letsverify.DateInput.getDateObject();
        }
        if (lastName != "" && SSN != "" && date instanceof Date && !isNaN(date.getDay())) {
          FormControllerUtility.enableButton(this.view.letsverify.btnProceed);
        } else {
          FormControllerUtility.disableButton(this.view.letsverify.btnProceed);
        }
      },
      /**
               * This function used to check whether the SSN entered is correct or not ..If it is wrong the error message is shown
               */
      ssnCheck: function () {
        /*
                          var input = this.view.letsverify.tbxSSN.text.trim();
                          //var SSNLENGTH = 9;
                          //if ((input.length < SSNLENGTH && isNaN(input)) || (input.length >= SSNLENGTH && !this.validationUtilManager.isValidSSNNumber(input))) {
                          if (!this.validationUtilManager.isValidSSNNumber(input)) {
                              this.view.letsverify.lblWrongInfo.text = kony.i18n.getLocalizedString("i18n.login.incorrectSSN");
                              this.view.letsverify.lblWrongInfo.isVisible = true;
                          } else {
                              this.view.letsverify.lblWrongInfo.isVisible = false;
                          }
                          this.view.letsverify.forceLayout();
                          */
      },
      /**
               * This function calls the function which fetches the user based on the details entered
               */
      verifyUserDetails: function () {
        let scopeObj = this;
        this.loadAuthModule().presentationController.verifyUserName({
          "serviceKey": applicationManager.getAuthManager().getServicekey(),
          "captchaValue": scopeObj.view.cantSignIn.tbxCaptcha.text,
          "Phone": scopeObj.getPhone(),
          "legalEntityId": companyNameid,
          "Email": scopeObj.view.cantSignIn.tbxEmailAddress.text.trim(),
          "DateOfBirth": applicationManager.getFormatUtilManager().getFormatedDateString(scopeObj.view.cantSignIn.DateInput.getDateObject(), applicationManager.getFormatUtilManager().getBackendDateFormat()),
        });
      },
  
      getPhone: function () {
        let scopeObj = this;
        let phoneCountryCode = scopeObj.view.cantSignIn.tbxCountryCode.text.trim();
        let phone = scopeObj.view.cantSignIn.tbxMobileNumber.text.trim();
        if (!phoneCountryCode.includes("+")) {
          phoneCountryCode = "+" + phoneCountryCode;
        }
        return phoneCountryCode + "-" + phone;
      },
  
      /**
               * This function is showing the flxWelcomeBack once all the details are filled and proceed button is clicked
               * @param {object} users is success response for fetch user name
               */
      welcomeVerifiedUser: function (users) {
        this.emptyUserDetails();
        this.view.flxVerification.isVisible = false;
        var usersList = [];
        users.forEach(function (data) {
          var user = [];
          user.push(data.UserName);
          user.push(data.UserName);
          usersList.push(user);
        });
        this.view.lstBoxSelectUsername.masterData = usersList;
        this.view.flxSelectUsername.setVisibility(true);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.SignInAs.rtxCVV, kony.i18n.getLocalizedString("i18n.login.SignInAs") + " " + users[0].UserName, accessibilityConfig);
        CommonUtilities.setText(this.view.ResetMyPassword.rtxCVV, kony.i18n.getLocalizedString("i18n.login.ResetMyPassword"), accessibilityConfig);
        this.view.flxCloseSelectUsername.onClick = this.emptyLoginData.bind(this);
        this.view.lstBoxSelectUsername.onSelection = function () {
          this.userName = this.view.lstBoxSelectUsername.selectedKey;
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          CommonUtilities.setText(this.view.SignInAs.rtxCVV, kony.i18n.getLocalizedString("i18n.login.SignInAs") + " " + this.userName, accessibilityConfig);
        }.bind(this);
        this.view.SignInAs.onTouchEnd = function () {
          this.userName = this.view.lstBoxSelectUsername.selectedKey;
          this.loginWithVerifiedUserName();
        }.bind(this);
        this.view.ResetMyPassword.onTouchEnd = function () {
          var authManager = applicationManager.getAuthManager();
          authManager.setUserName(this.view.lstBoxSelectUsername.selectedKey);
          this.userName = this.view.lstBoxSelectUsername.selectedKey;
          var selectedUser = users.filter(function (data) {
            return data.UserName === this.userName;
          }.bind(this))[0];
          this.securityKey = selectedUser.securityKey;
          this.goToPasswordResetOptionsPage();
        }.bind(this);
        this.view.flxWelcomeBack.parent.forceLayout();
      },
      /**
               * This function shows the enroll page when clicked on enroll button from the login page.
               * @param {object} userDetails - user details object
               */
      showEnrollFlex: function (userDetails) {
        var self = this;
        self.emptyUserDetails();
        self.view.EnrollPromptScreen.rtxServerError.text = kony.i18n.getLocalizedString("i18n.common.EnrollAlert");
        self.view.EnrollPromptScreen.rtxServerError.setVisibility(true);
        self.view.flxVerification.setVisibility(false);
        self.view.flxEnroll.setVisibility(true);
        var breakpoint = kony.application.getCurrentBreakpoint();
        if (breakpoint !== 1400) {
          this.view.flxDropdown.setVisibility(false);
          if (breakpoint !== 1024)
            self.view.EnrollPromptScreen.rtxServerError.skin = ViewConstants.SKINS.RTEXT_ERROR_MOBILE;
          else
            self.view.EnrollPromptScreen.rtxServerError.skin = ViewConstants.SKINS.RTEXT_ERROR_DESKTOP;
        } else {
          self.view.EnrollPromptScreen.rtxServerError.skin = ViewConstants.SKINS.RTEXT_ERROR_DESKTOP;
        }
        self.view.flxEnroll.parent.forceLayout();
        self.view.flxCloseEnroll.onClick = self.emptyLoginData.bind(self);
        self.view.EnrollPromptScreen.btnBackToLogin.onClick = function () {
          var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("EnrollModule");
          enrollModule.presentationController.showEnrollPage();
        };
        self.view.EnrollPromptScreen.btnEnroll.onClick = function () {
          self.view.EnrollPromptScreen.rtxServerError.setVisibility(true);
          self.loadAuthModule().presentationController.navigateToEnroll(userDetails);
        };
        this.initializeResponsiveViews();
      },
      /**
               * This function shows the error message if fetching user name fails.
               */
      showFetchUserNameErrorUI: function () {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.letsverify.lblWrongInfo, kony.i18n.getLocalizedString("i18n.login.wrongInfo"), accessibilityConfig);
        //this.view.letsverify.lblWrongInfo.text = kony.i18n.getLocalizedString("i18n.login.wrongInfo");
        this.view.letsverify.lblWrongInfo.isVisible = true;
        this.view.letsverify.parent.forceLayout();
      },
      /**
               * This function is used to update voew for logging with the fetched username where the username is prepopulated after verifying the user
               */
      loginWithVerifiedUserName: function () {
        this.view.loginComponent.recoveredUsernameUIChanges(this.userName);
        this.view.btnOnlineAccessEnroll.isVisible = false;
        this.view.btnOpenNewAccount.isVisible = false;
        this.view.flxSelectUsername.setVisibility(false);
        var buttonText = this.view.AlterneteActionsSignIn.rtxCVV.text;
        var position = buttonText.indexOf(this.userName, 0);
        buttonText = buttonText.substring(0, position);
        this.view.AlterneteActionsSignIn.rtxCVV.text = buttonText.trim();
        this.view.AlterneteActionsSignIn.rtxCVV.toolTip = buttonText.trim();
        this.view.flxLogin.isVisible = true;
        this.initializeResponsiveViews();
      },
      /**
               * This function calls the function to retrieve the cards for the user.
               * Fetch the Cards details by username and navigate to corresponding view.
               */
      goToPasswordResetOptionsPage: function () {
        FormControllerUtility.showProgressBar(this.view);
        var authManager = applicationManager.getAuthManager();
        var params = {
          "UserName": authManager.getUserName(),
          "MFAAttributes": {
            "serviceKey": authManager.getServicekey()
          }
        };
        this.loadAuthModule().presentationController.requestResetPasswordOTP(params);
        this.initializeResponsiveViews();
      },
      /**
               * This function shows Send OTP Page for a Business Banking User
               */
      showSendOTPBB: function () {
        this.view.flxSelectUsername.setVisibility(false);
        this.view.flxSendOTP.setVisibility(true);
        this.view.resetusingOTP.orline.setVisibility(false);
        this.view.resetusingOTP.btnUseCVV.setVisibility(false);
        this.view.resetusingOTP.btnNext.onClick = this.loadAuthModule().presentationController.requestOTPBB.bind(this);
        this.view.flxCloseSendOTP.onClick = this.emptyLoginData.bind(this);
        this.view.forceLayout();
      },
      /**
               * This function shows the Reset OTP Page where you can enter the recieved otp
               */
      showResetUsingOTPBB: function () {
        this.view.flxSendOTP.setVisibility(false);
        this.view.flxResetUsingOTP.setVisibility(true);
        this.view.resetusingOTPEnterOTP.flxCVV.setVisibility(true);
        this.view.resetusingOTPEnterOTP.orline.setVisibility(false);
        this.view.resetusingOTPEnterOTP.btnUseCVV.setVisibility(false);
        this.view.resetusingOTPEnterOTP.btnNext.onClick = this.verifyOTPBB.bind(this);
        this.view.forceLayout();
      },
      /**
               * Method to Validate OTP
               */
      verifyOTPBB: function () {
        this.loadAuthModule().presentationController.verifyOTPBB(this.view.resetusingOTPEnterOTP.tbxCVV.text);
      },
      /**
               * This function shows the reset password page for a Business Banking User
               * @param {string[]} rules - password rules form service
               */
      showResetPasswordPageBB: function (rules) {
        this.view.flxResetUsingOTP.setVisibility(false);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.newpasswordsetting.rtxRulesPassword, rules.content, accessibilityConfig);
        this.view.flxResetPassword.setVisibility(true);
        this.view.newpasswordsetting.btnNext.onClick = this.resetPasswordBB.bind(this);
        this.view.forceLayout();
      },
      /**
               * This function checks whether to show the password Confirmation Screen - Reset password button action handler.
               */
      resetPasswordBB: function () {
        var userDetails = {
          "userName": this.userName,
          "securityKey": this.securityKey,
          "password": this.view.newpasswordsetting.tbxNewPassword.text
        };
        this.view.newpasswordsetting.lblErrorInfo.isVisible = false;
        this.loadAuthModule().presentationController.resetPassword(userDetails);
      },
      /**
               * This function show the reset password options based in cards Data
               * @param {object[]} cards -  fetch cards success response - contians cards data
               * @param {string} cards.cardHolderName -  card holder name
               * @param {string} cards.cardNumber -  card number
               * @param {string} cards.cardType -  card type
               */
      showResetPasswordUI: function (cards) {
        this.view.flxSelectUsername.setVisibility(false);
        this.view.flxResetPasswordOptions.setVisibility(true);
        if (cards.length !== 0) {
          this.showCVVCards(cards);
          this.showCVVOption();
        } else {
          this.hideCVVOption();
        }
      },
      /**
               * This function prepares the list of cards available for the user and stores in the form of key and value where the key is the actual card number and value is the masked card number
               * @param {Cards[]} presentCards -  fetch cards success response - contians cards data
               * @param {string} presentCards.cardHolderName -  card holder name
               * @param {string} presentCards.cardNumber -  card number
               * @param {string} presentCards.cardType -  card type
               */
      showCVVCards: function (presentCards) {
        var scopeObj = this;
  
        function maskCard(card) {
          return scopeObj.dataProcessUtilityManager.maskCardNumber(card.cardNumber);
        }
        this.view.ResetOrEnroll.lstbxCards.masterData = FormControllerUtility.getListBoxDataFromObjects(presentCards, "cardNumber", maskCard);
      },
      /**
               * This function is for hiding the CVV option if there are no cards available for the user
               */
      hideCVVOption: function () {
        this.view.flxWelcomeBack.isVisible = false;
        this.view.flxResetPasswordOptions.isVisible = true;
        this.view.AlterneteActionsEnterCVV.isVisible = false;
        this.view.OrLineForCVVandPIN.isVisible = false;
        this.view.resetusingOTP.btnUseCVV.isVisible = false;
        this.view.resetusingOTP.orline.isVisible = false;
        this.view.resetusingOTPEnterOTP.orline.isVisible = false;
        this.view.resetusingOTPEnterOTP.btnUseCVV.isVisible = false;
        this.view.flxResetPasswordOptions.parent.forceLayout();
      },
      /**
               * This function is for showing the CVV option if there are cards available for the user
               */
      showCVVOption: function () {
        this.view.flxWelcomeBack.isVisible = false;
        this.view.flxResetPasswordOptions.isVisible = true;
        this.view.resetusingOTP.btnUseCVV.isVisible = true;
        this.view.resetusingOTP.orline.isVisible = true;
        this.view.AlterneteActionsEnterCVV.isVisible = true;
        this.view.OrLineForCVVandPIN.isVisible = true;
        var buttonText = this.view.AlterneteActionsSignIn.rtxCVV.text;
        var position = buttonText.indexOf(this.userName, 0);
        buttonText = buttonText.substring(0, position);
        this.view.AlterneteActionsSignIn.rtxCVV.text = buttonText.trim();
        this.view.AlterneteActionsSignIn.rtxCVV.toolTip = buttonText.trim();
        this.view.flxResetPasswordOptions.isVisible = true;
        this.view.resetusingOTPEnterOTP.orline.isVisible = true;
        this.view.resetusingOTPEnterOTP.btnUseCVV.isVisible = true;
        this.view.flxResetPasswordOptions.parent.forceLayout();
      },
      /**
               * This function shows the CVV flex once the user clicks on "Reset using the CVV" Option
               */
      showEnterCVVPage: function () {
        this.view.flxResetPasswordOptions.isVisible = false;
        this.view.flxResetUsingCVV.isVisible = true;
        this.view.flxResetUsingCVV.parent.forceLayout();
        this.initializeResponsiveViews();
      },
      /**
               * This function shows the masked CVV on click of eye icon
               */
      showCVV: function () {
        if (this.view.ResetOrEnroll.tbxCVV.secureTextEntry === true) {
          this.view.ResetOrEnroll.tbxCVV.secureTextEntry = false;
        } else {
          this.view.ResetOrEnroll.tbxCVV.secureTextEntry = true;
        }
      },
      /**
               * This function shows the error message if the user enters incorrect CVV
               */
      reEnterCVV: function () {
        this.view.ResetOrEnroll.lblWrongCvv.isVisible = false;
        this.view.ResetOrEnroll.parent.forceLayout();
      },
      /**
               * showRulesPassword :This function shows the password rules on click of password textbox
               */
      showRulesPassword: function () {
        this.view.newpasswordsetting.flxMain.height = "610dp";
        // this.view.newpasswordsetting.flxRulesUsername.setVisibility(false);
        this.view.newpasswordsetting.flxRulesPassword.setVisibility(true);
        this.view.forceLayout();
      },
      /**
               * This function checks whether the entered CVV  is valid or not and enalbe next button if valid CVV number enter
               */
      cvvCheck: function () {
        var input = this.view.ResetOrEnroll.tbxCVV.text.trim();
        var CVVLENGTH = 3;
        if (input.length < CVVLENGTH || !this.validationUtilManager.isValidCVV(input)) {
          if (isNaN(input) || input.length >= CVVLENGTH) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.ResetOrEnroll.lblWrongCvv, kony.i18n.getLocalizedString("i18n.login.IncorrectCVV"), accessibilityConfig);
            //this.view.ResetOrEnroll.lblWrongCvv.text = kony.i18n.getLocalizedString("i18n.login.IncorrectCVV");
            this.view.ResetOrEnroll.lblWrongCvv.isVisible = true;
          }
          FormControllerUtility.disableButton(this.view.ResetOrEnroll.btnNext);
        } else {
          this.view.ResetOrEnroll.lblWrongCvv.isVisible = false;
          FormControllerUtility.enableButton(this.view.ResetOrEnroll.btnNext);
        }
        this.view.ResetOrEnroll.parent.forceLayout();
      },
      /**
               * This function is for selecting the OTP option from the CVV screen
               */
      useOTPForReset: function () {
        this.view.flxResetUsingCVV.isVisible = false;
        this.view.flxSendOTP.isVisible = true;
        this.view.ResetOrEnroll.tbxCVV.text = "";
        this.view.ResetOrEnroll.lblWrongCvv.isVisible = false;
        FormControllerUtility.disableButton(this.view.ResetOrEnroll.btnNext);
        this.view.ResetOrEnroll.forceLayout();
        this.initializeResponsiveViews();
      },
      /**
               * This function is for selecting the CVV option from the OTP screen
               */
      useCVVForReset: function () {
        this.view.flxResetUsingOTP.isVisible = false;
        this.view.flxSendOTP.isVisible = false;
        this.view.flxResetUsingCVV.isVisible = true;
        this.view.resetusingOTPEnterOTP.tbxCVV.text = "";
        this.view.ResetOrEnroll.lstbxCards.selectedKey = this.view.ResetOrEnroll.lstbxCards.masterData[0][0]; //reset drop down.
        FormControllerUtility.disableButton(this.view.resetusingOTPEnterOTP.btnNext);
        this.view.ResetOrEnroll.tbxCVV.secureTextEntry = true;
        this.view.resetusingOTPEnterOTP.tbxCVV.secureTextEntry = true;
        this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = false;
        this.view.ResetOrEnroll.forceLayout();
        this.initializeResponsiveViews();
      },
      /**
               * This function checks whether the  CVV  is correct  or not for the selected card
               */
      isCVVCorrect: function () {
        this.loadAuthModule().presentationController.validateCVV({
          "cvv": this.view.ResetOrEnroll.tbxCVV.text,
          "cardNumber": this.view.ResetOrEnroll.flxCards.lstbxCards.selectedKey
        });
      },
      /**
               * This function shows the error message if the user enters the incorrect CVV
               */
      showErrorForCVV: function () {
        this.view.ResetOrEnroll.lblWrongCvv.isVisible = true;
      },
      /**
               * This function shows Reset Password Flex form CVV with password rules
               * @param {string[]} rules - password rules form service
               */
      showResetPasswordPage: function (rules) {
        this.view.newpasswordsetting.rtxRulesPassword.text = rules.content;
        this.view.flxPhoneAndEmail.setVisibility(false);
        this.view.OTPModule.flxEnterOTP.setVisibility(false);
        this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(false);
        this.view.OTPModule.tbxCVV.text = "";
        this.view.flxResetPassword.isVisible = true;
        this.view.newpasswordsetting.lblErrorInfo.isVisible = false;
        //this.view.ResetOrEnroll.isVisible = true;
        this.view.flxResetPassword.parent.forceLayout();
      },
      /**
               * The function is called when the user enters the wrong password and gives an error that password doesnot meet the required criteria
               */
      passwordEditing: function () {
        this.showRulesPassword();
        if (this.view.newpasswordsetting.lblErrorInfo.isVisible) {
          this.reEnterNewPassword();
        }
      },
      /**
               * This function shows the error message if the entered password is wrong
               */
      reEnterNewPassword: function () {
        this.view.newpasswordsetting.lblErrorInfo.isVisible = false;
        this.view.newpasswordsetting.flxNewPassword.top = "8.8%";
      },
      /**
               * The function is used to check whether the entered password is valid or not
               */
      newPwdKeyUp: function () {
        this.validateNewPassword(this.view.newpasswordsetting.tbxNewPassword.text);
      },
      /**
               * This function validates whether the entered new password is correct or not and enable / disable reset password button
               * @param {string}  enteredPassword -  password entered by the user
               */
      validateNewPassword: function (enteredPassword) {
        if (this.validationUtilManager.isPasswordValidForPolicy(enteredPassword)) {
          this.view.newpasswordsetting.lblErrorInfo.isVisible = false;
          this.view.newpasswordsetting.imgValidPassword.isVisible = true;
          if (this.isPasswordValidAndMatchedWithReEnteredValue()) {
            this.view.newpasswordsetting.imgPasswordMatched.isVisible = true;
            FormControllerUtility.enableButton(this.view.newpasswordsetting.btnNext);
          } else {
            this.view.newpasswordsetting.imgPasswordMatched.isVisible = false;
            FormControllerUtility.disableButton(this.view.newpasswordsetting.btnNext);
          }
        } else {
          this.view.newpasswordsetting.lblErrorInfo.isVisible = true;
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          CommonUtilities.setText(this.view.newpasswordsetting.lblErrorInfo, kony.i18n.getLocalizedString("i18n.login.invalidPassword"), accessibilityConfig);
          //this.view.newpasswordsetting.lblErrorInfo.text = kony.i18n.getLocalizedString("i18n.login.invalidPassword");
          this.view.newpasswordsetting.imgValidPassword.isVisible = false;
          this.view.newpasswordsetting.imgPasswordMatched.isVisible = false;
          FormControllerUtility.disableButton(this.view.newpasswordsetting.btnNext);
        }
        this.view.newpasswordsetting.parent.forceLayout();
      },
      /**
               * This function checks whether the entered password and reenter password are same or not
               * @returns {boolean} true if they match,false if they do not match
               */
      isPasswordValidAndMatchedWithReEnteredValue: function () {
        if (this.view.newpasswordsetting.tbxNewPassword.text && this.view.newpasswordsetting.tbxMatchPassword.text) {
          if (this.view.newpasswordsetting.tbxNewPassword.text === this.view.newpasswordsetting.tbxMatchPassword.text) {
            return true;
          }
        }
        return false;
      },
      /**
               * The function is used to confirm whether the entered password and renter password are same or not
               */
      matchPwdKeyUp: function () {
        this.validateConfirmPassword(this.view.newpasswordsetting.tbxMatchPassword.text);
      },
      /**
               * This function validates whether the  re-entered password is correct or not and enable / disable reset password button
               * @param {string} confirmedPwd - confirmed password
               */
      validateConfirmPassword: function (confirmedPwd) {
        if (this.isPasswordValidAndMatchedWithReEnteredValue()) {
          this.view.newpasswordsetting.lblErrorInfo.isVisible = false;
          this.view.newpasswordsetting.imgPasswordMatched.isVisible = true;
          this.validateNewPassword(confirmedPwd);
        } else {
          this.view.newpasswordsetting.lblErrorInfo.isVisible = true;
          this.view.newpasswordsetting.imgPasswordMatched.isVisible = false;
          FormControllerUtility.disableButton(this.view.newpasswordsetting.btnNext);
        }
        this.view.newpasswordsetting.forceLayout();
      },
      /**
               * This function checks whether to show the password Confirmation Screen - Reset password button action handler.
               */
      showResetConfirmationPage: function () {
        var userDetails = {
          "userName": this.userName,
          "securityKey": this.securityKey,
          "password": this.view.newpasswordsetting.tbxNewPassword.text
        };
        this.view.newpasswordsetting.lblErrorInfo.isVisible = false;
        this.loadAuthModule().presentationController.resetPassword(userDetails);
        this.initializeResponsiveViews();
      },
      /**
               * This function shows the reset password Confirmation Screen once the password is reset successfully i.e.success from the service
               */
      showResetPasswordConfirmation: function () {
        this.showResetConfirmationScreen();
      },
      /**
               * This function update view for Confirmation Screen
               */
      showResetConfirmationScreen: function () {
        this.view.flxResetPassword.isVisible = false;
        this.view.flxResetSuccessful.isVisible = true;
        this.view.flxResetPassword.parent.forceLayout();
      },
      /**
               * This function is to update view for Reset password using OTP- on clicking of the "Reset using OTP" option
               */
      goToResetUsingOTP: function () {
        this.view.flxResetPasswordOptions.isVisible = false;
        this.view.flxSendOTP.isVisible = true;
        this.view.ResetOrEnroll.tbxCVV.secureTextEntry = true;
        this.view.resetusingOTPEnterOTP.tbxCVV.secureTextEntry = false;
        this.view.flxResetPasswordOptions.parent.forceLayout();
        this.initializeResponsiveViews();
        this.view.resetusingOTP.btnResendOTP.setVisibility(false);
      },
      /**
               * This function is for calling the other function in the presentation Controller for requesting OTP from the server
               */
      requestOTPValue: function () {
        this.loadAuthModule().presentationController.requestOTP();
      },
      /**
               * This function shows the OTP flex once the user clicks on "Reset using the Secure Access Code" Option
               */
      showEnterOTPPage: function () {
        this.view.resetusingOTPEnterOTP.tbxCVV.text = "";
        if (this.view.flxSendOTP.isVisible && !this.view.flxResetUsingOTP.isVisible) {
          this.view.flxSendOTP.isVisible = false;
          this.view.resetusingOTPEnterOTP.flxCVV.isVisible = true;
          this.view.resetusingOTPEnterOTP.btnResendOTP.isVisible = true;
          this.view.resetusingOTPEnterOTP.btnResendOTP.onClick = this.resendOTPValue;
          this.view.resetusingOTPEnterOTP.btnNext.top = "3.52%";
          this.view.resetusingOTPEnterOTP.imgCVVOrOTP.top = "3.52%";
          this.view.resetusingOTPEnterOTP.btnUseCVV.top = "2.61%";
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          CommonUtilities.setText(this.view.resetusingOTPEnterOTP.btnNext, kony.i18n.getLocalizedString("i18n.common.next"), accessibilityConfig);
          //this.view.resetusingOTPEnterOTP.btnNext.text = kony.i18n.getLocalizedString("i18n.common.next");
          this.view.flxResetUsingOTP.isVisible = true;
        }
        FormControllerUtility.disableButton(this.view.resetusingOTPEnterOTP.btnNext);
        this.view.resetusingOTPEnterOTP.btnResendOTP.setEnabled(false);
        this.view.resetusingOTPEnterOTP.btnResendOTP.skin = ViewConstants.SKINS.LOGIN_RESEND_OTP_DISABLED;
        this.view.resetusingOTPEnterOTP.btnResendOTP.hoverSkin = ViewConstants.SKINS.LOGIN_RESEND_OTP_DISABLED;
        this.view.flxResetUsingOTP.parent.forceLayout();
        this.enalbeResendButton();
      },
      /**
               * Enable Re-send button after one second.
               */
      enalbeResendButton: function () {
        var scopeObj = this;
        /**
                     * Funtion to enable resend button.
                     */
        var enableResendBtn = function () {
          scopeObj.view.resetusingOTPEnterOTP.btnResendOTP.setEnabled(true);
          scopeObj.view.resetusingOTPEnterOTP.btnResendOTP.skin = ViewConstants.SKINS.LOGIN_RESEND_OTP_ENABLED;
          scopeObj.view.resetusingOTPEnterOTP.btnResendOTP.hoverSkin = ViewConstants.SKINS.LOGIN_RESEND_OTP_ENABLED;
        };
        kony.timer.schedule("otpTimer", enableResendBtn, 1, false); //As per the requirement need timer here. Enable OTP button after 1 sec.
      },
      /**
               * The function is called when the user enters the wrong OTP - not requied method but placed in code bcx action was binded in snippet.
               */
      reTypeOTP: function () {
        this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = false;
      },
      /**
               * This function checks the OTP entered is correct or not and shows the error message if it is incorrect and enable/ disalbe next button.
               */
      otpCheck: function () {
        var input = this.view.resetusingOTPEnterOTP.tbxCVV.text.trim();
        var OTP_LENGTH = 6;
        if (input.length < OTP_LENGTH || !this.validationUtilManager.isValidOTP(input)) {
          if (isNaN(input) || input.length >= OTP_LENGTH) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.resetusingOTPEnterOTP.lblWrongOTP, kony.i18n.getLocalizedString("i18n.login.incorrectOTP"), accessibilityConfig);
            //this.view.resetusingOTPEnterOTP.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.login.incorrectOTP");
            this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = true;
          }
          FormControllerUtility.disableButton(this.view.resetusingOTPEnterOTP.btnNext);
        } else {
          this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = false;
          FormControllerUtility.enableButton(this.view.resetusingOTPEnterOTP.btnNext);
        }
        this.view.resetusingOTPEnterOTP.parent.forceLayout();
      },
      /**
               * This function shows the masked OTP on click of eye icon
               */
      showOTP: function () {
        if (this.view.resetusingOTPEnterOTP.tbxCVV.secureTextEntry === true) {
          this.view.resetusingOTPEnterOTP.tbxCVV.secureTextEntry = false;
        } else {
          this.view.resetusingOTPEnterOTP.tbxCVV.secureTextEntry = true;
        }
      },
      /**
               * This function is called when the user clicks on resend OTP button
               */
      resendOTPValue: function () {
        this.requestOTPValue();
      },
      /**
               * This function calls the service which validates whether entered OTP is correct or not
               */
      isOTPCorrect: function () {
        this.loadAuthModule().presentationController.verifyOTP(this.view.resetusingOTPEnterOTP.tbxCVV.text);
      },
      /**
               *This function shows error message if user enters the wrong OTP
               */
      showErrorForOTP: function () {
        this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = true;
        this.view.resetusingOTPEnterOTP.forceLayout();
      },
      responsiveViews: {},
      /**
               * Method to initialize Response views
               */
      initializeResponsiveViews: function () {
        this.responsiveViews["flxLogin"] = this.view.flxLogin.isVisible;
        this.responsiveViews["flxVerification"] = this.view.flxVerification.isVisible;
        this.responsiveViews["flxWelcomeBack"] = this.view.flxWelcomeBack.isVisible;
        this.responsiveViews["flxResetPasswordOptions"] = this.view.flxResetPasswordOptions.isVisible;
        this.responsiveViews["flxSendOTP"] = this.view.flxSendOTP.isVisible;
        this.responsiveViews["flxResetUsingOTP"] = this.view.flxResetUsingOTP.isVisible;
        this.responsiveViews["flxResetUsingCVV"] = this.view.flxResetUsingCVV.isVisible;
        this.responsiveViews["flxResetPassword"] = this.view.flxResetPassword.isVisible;
        this.responsiveViews["flxLoginMFA"] = this.view.flxLoginMFA.isVisible;
        this.responsiveViews["flxResetSuccessful"] = this.view.flxResetSuccessful.isVisible;
        this.responsiveViews["flxBlocked"] = this.view.flxBlocked.isVisible;
        this.responsiveViews["flxEnrollOrServerError"] = this.view.flxEnrollOrServerError.isVisible;
        this.responsiveViews["flxEnroll"] = this.view.flxEnroll.isVisible;
        this.responsiveViews["flxFeedbackTakeSurvey"] = this.view.flxFeedbackTakeSurvey.isVisible;
        this.responsiveViews["flxImgKony"] = this.view.flxImgKony.isVisible;
        this.responsiveViews["flxPhoneAndEmail"] = this.view.flxPhoneAndEmail.isVisible;
        this.responsiveViews["flxLoginComponentContainer"] = this.view.flxLoginComponentContainer.isVisible;
        this.responsiveViews["cantSignIn"] = this.view.cantSignIn.isVisible;
        this.responsiveViews["flxEnrollActivateContainer"] = this.view.flxEnrollActivateContainer.isVisible;
        this.responsiveViews["OTPComponent"] = this.view.OTPComponent.isVisible;
        //this.responsiveViews["securityQuestionsComponent"] = this.view.securityQuestionsComponent.isVisible;
        this.responsiveViews["regenrateActivationCodeComponent"] = this.view.regenrateActivationCodeComponent.isVisible;
        this.responsiveViews["resetPasswordComponent"] = this.view.resetPasswordComponent.isVisible;
      },
      /**
               * This function navigates to the customer Feedback form.
               */
      btnYesTakeSurvey: function () {
        this.view.flxFeedbackTakeSurvey.setVisibility(false);
        this.loadAuthModule().presentationController.navigateToFeedbackPage();
      },
      /**
               * This function sets the visibility of the Survey Flex to false
               */
      btnNoTakeSurvey: function () {
        this.view.flxFeedbackTakeSurvey.setVisibility(false);
      },
      /**
               * Set up native app link for mobile and tablet
               */
      setupNativeAppLink: function () {
        var configurationManager = applicationManager.getConfigurationManager();
        var deviceConfig = this.detectDevice();
        this.view.flxPlayStore.setVisibility(false);
        if (deviceConfig !== DEVICE_TYPES.DESKTOP) {
          this.view.imgAppstore.src = deviceConfig.image;
          this.view.flxAppStore.onClick = function () {
            // Picking Native App Link from Configuration
            kony.application.openURL(configurationManager[deviceConfig.linkConfigKey])
          }
        }
        this.view.forceLayout();
      },
      /**
               * detects the device type
               * @returns {Number} Type of device
               */
      detectDevice: function () {
        var userAgent = kony.os.deviceInfo().userAgent
        if (/iphone/i.test(userAgent)) {
          return DEVICE_TYPES.IPHONE;
        } else if (/ipad/i.test(userAgent)) {
          return DEVICE_TYPES.IPAD;
        } else if (/android/i.test(userAgent) && /mobile/i.test(userAgent)) {
          return DEVICE_TYPES.ANDROID_PHONE;
        } else if (/android/i.test(userAgent)) {
          return DEVICE_TYPES.ANDROID_TABLET;
        }
        return DEVICE_TYPES.DESKTOP;
      },
      /**
               * Method to close the feedback pop up.
               */
      onFeedbackCrossClick: function () {
        this.view.flxFeedbackTakeSurvey.setVisibility(false);
        this.initializeResponsiveViews();
      },
      showScreenToEnterSecureCode: function (response) {
        var authManager = applicationManager.getAuthManager();
        var communicationType = authManager.getCommunicationType();
        this.view.OTPModule.lblFavoriteEmailCheckBox.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        this.view.OTPModule.lblFavoriteEmailCheckBox.skin = OLBConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
        if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_ALL) {
          this.showPhoneEmailScreen(response);
        } else if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_PRIMARY) {
          this.showPrimaryEmailScreen(response);
        } else if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_NO_VALUE) {
          this.showDefaultPhoneEmailScreen(response);
        }
      },
      showSecureAccessCodeScreenAfterResend: function (response) {
        var authManager = applicationManager.getAuthManager();
        var communicationType = authManager.getCommunicationType();
        if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_ALL) {
          this.showScreentoEnterOTP(response);
        } else if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_PRIMARY) {
          this.showPrimaryEmailScreen(response);
        } else if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_NO_VALUE) {
          this.showDefaultPhoneEmailScreen(response);
        }
      },
      showPhoneEmailScreen: function (response) {
        var scopeObj = this;
        this.view.flxSelectUsername.setVisibility(false);
        FormControllerUtility.showProgressBar(this.view);
        this.bindUIForOTPMFAScreen(response.MFAAttributes.customerCommunication);
        this.view.OTPModule.btnProceed.onClick = function () {
          this.view.flxLoading.height = "100%";
          FormControllerUtility.showProgressBar(scopeObj.view);
          var selectedData = {};
          if (scopeObj.view.OTPModule.lbxPhone.selectedKeyValue)
            selectedData.phone = scopeObj.view.OTPModule.lbxPhone.selectedKeyValue[0];
          if (scopeObj.view.OTPModule.lbxEmail.selectedKeyValue)
            selectedData.email = scopeObj.view.OTPModule.lbxEmail.selectedKeyValue[0];
          scopeObj.customerPhone = selectedData.phone;
          scopeObj.customerEmail = selectedData.email;
          this.requestOTP(selectedData);
        }.bind(this);
        this.view.forceLayout();
      },
      bindUIForOTPMFAScreen: function (customerCommunicationInfo) {
        this.view.flxPhoneAndEmail.setVisibility(true);
        this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(false);
        this.view.OTPModule.lblHeaderOTP.setVisibility(false);
        this.view.OTPModule.flxEnterOTP.setVisibility(true);
        FormControllerUtility.enableButton(this.view.OTPModule.btnProceed);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.OTPModule.lblResendMessage, kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTP"), accessibilityConfig);
        //this.view.OTPModule.lblResendMessage.text = kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTP");
        CommonUtilities.setText(this.view.OTPModule.btnProceed, kony.i18n.getLocalizedString("i18n.common.proceed"), accessibilityConfig);
        //this.view.OTPModule.btnProceed.text = kony.i18n.getLocalizedString("i18n.common.proceed");
        if (customerCommunicationInfo.phone && customerCommunicationInfo.email) {
          CommonUtilities.setText(this.view.OTPModule.lblResendMessage, kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTP"), accessibilityConfig);
          //this.view.OTPModule.lblResendMessage.text = kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTP");
          this.view.OTPModule.lbxPhone.masterData = this.setDataForPhoneListBox(customerCommunicationInfo.phone);
          this.view.OTPModule.lbxEmail.masterData = this.setDataForEmailListBox(customerCommunicationInfo.email);
          this.view.OTPModule.lblRegisteredPhone.setVisibility(true);
          this.view.OTPModule.lbxPhone.setVisibility(true);
          this.view.OTPModule.lblRegisteredEmail.setVisibility(true);
          this.view.OTPModule.lbxEmail.setVisibility(true);
          this.view.forceLayout();
        } else {
          if (customerCommunicationInfo.phone || customerCommunicationInfo.email) {
            if (customerCommunicationInfo.phone) {
              CommonUtilities.setText(this.view.OTPModule.lblResendMessage, kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTPPhone"), accessibilityConfig);
              //this.view.OTPModule.lblResendMessage.text = kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTPPhone");
              this.view.OTPModule.lbxPhone.masterData = this.setDataForPhoneListBox(customerCommunicationInfo.phone);
              this.view.OTPModule.lblRegisteredPhone.setVisibility(true);
              this.view.OTPModule.lbxPhone.setVisibility(true);
              this.view.OTPModule.lblRegisteredEmail.setVisibility(false);
              this.view.OTPModule.lbxEmail.setVisibility(false);
              this.view.forceLayout();
            } else if (customerCommunicationInfo.email) {
              CommonUtilities.setText(this.view.OTPModule.lblResendMessage, kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTPEmail"), accessibilityConfig);
              //this.view.OTPModule.lblResendMessage.text = kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTPEmail");
              this.view.OTPModule.lbxEmail.masterData = this.setDataForEmailListBox(customerCommunicationInfo.email);
              this.view.OTPModule.lblRegisteredPhone.setVisibility(false);
              this.view.OTPModule.lbxPhone.setVisibility(false);
              this.view.OTPModule.lblRegisteredEmail.setVisibility(true);
              this.view.OTPModule.lbxEmail.setVisibility(true);
              this.view.forceLayout();
            }
          }
        }
        FormControllerUtility.hideProgressBar(this.view);
        this.view.forceLayout();
      },
      setDataForPhoneListBox: function (phoneObj) {
        var phoneNumbers = phoneObj.map(function (dataItem) {
          var phoneNumber = [];
          phoneNumber.push(dataItem.unmasked);
          phoneNumber.push(dataItem.masked);
          return phoneNumber;
        });
        return phoneNumbers;
      },
      setDataForEmailListBox: function (emailObj) {
        var emailsIds = emailObj.map(function (dataItem) {
          var email = [];
          email.push(dataItem.unmasked);
          email.push(dataItem.masked);
          return email;
        });
        return emailsIds;
      },
      requestOTP: function (selectedData) {
        var authManager = applicationManager.getAuthManager();
        var params = {
          "UserName": authManager.getUserName(),
          "MFAAttributes": {
            "serviceKey": authManager.getServicekey(),
            "OTP": selectedData
          }
        };
        this.loadAuthModule().presentationController.requestOTPUsingPhoneEmail(params);
      },
      resendOTP: function (params) {
        var authManager = applicationManager.getAuthManager();
        var params = {
          "UserName": authManager.getUserName(),
          "MFAAttributes": {
            "serviceKey": authManager.getServicekey(),
            "OTP": params
          }
        };
        this.loadAuthModule().presentationController.resendOTPForResetPassword(params);
      },
      showPrimaryEmailScreen: function (response) {
        this.bindUIForPrimaryScreen(response);
      },
      bindUIForResendButton: function (response) {
        var scopeObj = this;
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        this.view.OTPModule.btnResendOTP.onClick = function () {
          FormControllerUtility.showProgressBar(scopeObj.view);
          if (response.MFAAttributes.customerCommunication) {
            var params = {
              "phone": response.MFAAttributes.customerCommunication.phone[0].unmasked,
              "email": response.MFAAttributes.customerCommunication.email[0].unmasked,
              "securityKey": response.MFAAttributes.securityKey,
            };
          } else {
            var params = {
              "phone": scopeObj.customerPhone,
              "email": scopeObj.customerEmail,
              "securityKey": response.MFAAttributes.securityKey,
            };
          }
          scopeObj.resendOTP(params);
        };
      },
      bindUIForPrimaryScreen: function (response) {
        if (response.MFAAttributes.remainingResendAttempts <= 0) {
          this.view.OTPModule.btnResendOTP.setVisibility(false);
        } else {
          this.bindUIForResendButton(response);
          this.view.OTPModule.btnResendOTP.setVisibility(true);
        }
        if (response.MFAAttributes.isOTPExpired === "true") {
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.otpExpired"), accessibilityConfig);
          //this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
          this.view.OTPModule.lblWrongOTP.setVisibility(true);
          this.view.OTPModule.tbxCVV.text = "";
          FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
          FormControllerUtility.hideProgressBar(this.view);
        } else {
          this.view.OTPModule.lblWrongOTP.setVisibility(false);
        }
        this.view.flxPhoneAndEmail.setVisibility(true);
        this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(true);
        this.view.OTPModule.flxEnterOTP.setVisibility(false);
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        this.view.OTPModule.tbxCVV.text = "";
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.OTPModule.btnLogin, kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify"), accessibilityConfig);
        //this.view.OTPModule.btnLogin.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
        var phone = response.MFAAttributes.customerCommunication.phone[0].masked;
        var email = response.MFAAttributes.customerCommunication.email[0].masked;
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.OTPModule.rtxEnterCVVCode, kony.i18n.getLocalizedString("i18n.mfa.EnterSACMobile") + phone + " & " + email, accessibilityConfig);
        this.view.OTPModule.tbxCVV.onKeyUp = function () {
          this.validatetoEnableContinueButton();
        }.bind(this);
        this.view.OTPModule.tbxCVV.onDone = function () {
          FormControllerUtility.showProgressBar(this.view);
          var params = {
            "securityKey": response.MFAAttributes.securityKey,
            "otp": this.view.OTPModule.tbxCVV.text.trim()
          };
          this.verifyOTP(params);
        }.bind(this);
        this.view.OTPModule.btnLogin.onClick = function () {
          FormControllerUtility.showProgressBar(this.view);
          var params = {
            "securityKey": response.MFAAttributes.securityKey,
            "otp": this.view.OTPModule.tbxCVV.text.trim()
          };
          this.verifyOTP(params);
        }.bind(this);
        FormControllerUtility.hideProgressBar(this.view);
        this.view.forceLayout();
      },
      validatetoEnableContinueButton: function () {
        var otp = this.view.OTPModule.tbxCVV.text.trim();
        if (otp === "") {
          FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        } else {
          FormControllerUtility.enableButton(this.view.OTPModule.btnLogin);
        }
      },
      verifyOTP: function (data) {
        var authManager = applicationManager.getAuthManager();
        var params = {
          "MFAAttributes": {
            "serviceKey": authManager.getServicekey(),
            "OTP": data
          }
        };
        this.loadAuthModule().presentationController.verifyOTPPreLogin(params);
      },
      showIncorrectOTPError: function (response) {
        var scopeObj = this;
        if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts && response.MFAAttributes.remainingFailedAttempts > 0) {
          this.view.OTPModule.lblWrongOTP.setVisibility(true);
          var text = kony.i18n.getLocalizedString("i18n.mfa.invalidAccessCode") + " " + response.MFAAttributes.remainingFailedAttempts + " " + kony.i18n.getLocalizedString("i18n.mfa.remainingAttempts");;
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, text, accessibilityConfig);
          //this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.invalidAccessCode") + " " + response.MFAAttributes.remainingFailedAttempts + " " + kony.i18n.getLocalizedString("i18n.mfa.remainingAttempts");
          this.view.flxPhoneAndEmail.setVisibility(true);
          this.view.OTPModule.flxEnterOTP.setVisibility(false);
          this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(true);
          this.view.OTPModule.tbxCVV.text = "";
          FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
          FormControllerUtility.hideProgressBar(this.view);
          this.view.forceLayout();
        } else if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts === "0" && response.MFAAttributes.lockUser === "true") {
          FormControllerUtility.showProgressBar(this.view);
          var scopeObj = this;
          var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
          authModule.presentationController.showLoginScreen({
            "hideProgressBar": true,
            "errorMessage": kony.i18n.getLocalizedString("i18n.mfalogin.lockeduser") + " " + response.MFAAttributes.lockoutTime + " " + kony.i18n.getLocalizedString("i18n.mfa.minutes")
          });
          FormControllerUtility.hideProgressBar(this.view);
        } else if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts === "0" && response.MFAAttributes.logoutUser === "true") {
          FormControllerUtility.showProgressBar(this.view);
          var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
          authModule.presentationController.showLoginScreen({
            "hideProgressBar": true,
            "errorMessage": kony.i18n.getLocalizedString("i18n.mfaenroll.exceededOTP")
          });
          FormControllerUtility.hideProgressBar(this.view);
        } else {
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, response.dbpErrMsg, accessibilityConfig);
          //this.view.OTPModule.lblWrongOTP.text = response.dbpErrMsg;
          this.view.OTPModule.lblWrongOTP.setVisibility(true);
          this.view.OTPModule.tbxCVV.text = "";
          FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
          FormControllerUtility.hideProgressBar(this.view);
        }
        this.view.forceLayout();
      },
      showDefaultPhoneEmailScreen: function (customerCommunicationInfo) {
        this.bindUIForDefaultScreen(customerCommunicationInfo);
      },
      bindUIForDefaultScreen: function (response) {
        if (response.MFAAttributes.remainingResendAttempts <= 0) {
          this.view.OTPModule.btnResendOTP.setVisibility(false);
        } else {
          this.bindUIForResendButton(response);
          this.view.OTPModule.btnResendOTP.setVisibility(true);
        }
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        if (response.isOTPExpired === "true") {
          CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.otpExpired"), accessibilityConfig);
          //this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
          this.view.OTPModule.lblWrongOTP.setVisibility(true);
          this.view.OTPModule.tbxCVV.text = "";
          FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
          FormControllerUtility.hideProgressBar(this.view);
        } else {
          this.view.OTPModule.lblWrongOTP.setVisibility(false);
        }
        this.view.flxPhoneAndEmail.setVisibility(true);
        this.view.OTPModule.flxEnterOTP.setVisibility(false);
        this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(true);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.OTPModule.rtxEnterCVVCode, kony.i18n.getLocalizedString("i18n.mfa.SACHeader"), accessibilityConfig);
        CommonUtilities.setText(this.view.OTPModule.btnLogin, kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify"), accessibilityConfig);
        CommonUtilities.setText(this.view.OTPModule.btnResendOTP, kony.i18n.getLocalizedString("i18n.login.ResendOtp"), accessibilityConfig);
        CommonUtilities.setText(this.view.OTPModule.lblRememberMe, kony.i18n.getLocalizedString("i18n.mfaprelogin.registerthisdevice"), accessibilityConfig);
        //         this.view.OTPModule.btnLogin.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
        //         this.view.OTPModule.btnResendOTP.text =  kony.i18n.getLocalizedString("i18n.login.ResendOtp");
        //         this.view.OTPModule.lblRememberMe.text = kony.i18n.getLocalizedString("i18n.mfaprelogin.registerthisdevice");
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        this.view.OTPModule.tbxCVV.onKeyUp = function () {
          this.validatetoEnableContinueButton();
        }.bind(this);
        this.view.OTPModule.tbxCVV.onDone = function () {
          FormControllerUtility.showProgressBar(this.view);
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          CommonUtilities.setText(this.view.OTPModule.rtxEnterCVVCode, kony.i18n.getLocalizedString("i18n.mfa.SACHeader"), accessibilityConfig);
          var params = {
            "securityKey": response.MFAAttributes.securityKey,
            "otp": this.view.OTPModule.tbxCVV.text.trim()
          };
          this.verifyOTP(params);
        }.bind(this);
        this.view.OTPModule.btnLogin.onClick = function () {
          FormControllerUtility.showProgressBar(this.view);
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          CommonUtilities.setText(this.view.OTPModule.rtxEnterCVVCode, kony.i18n.getLocalizedString("i18n.mfa.SACHeader"), accessibilityConfig);
          var params = {
            "securityKey": response.MFAAttributes.securityKey,
            "otp": this.view.OTPModule.tbxCVV.text.trim()
          };
          this.verifyOTP(params);
        }.bind(this);
        FormControllerUtility.hideProgressBar(this.view);
        this.view.forceLayout();
      },
      showScreentoEnterOTP: function (response) {
        var scopeObj = this;
        if (response.MFAAttributes.remainingResendAttempts <= 0) {
          this.view.OTPModule.btnResendOTP.setVisibility(false);
        } else {
          this.bindUIForResendButton(response);
          this.view.OTPModule.btnResendOTP.setVisibility(true);
        }
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        if (response.MFAAttributes.isOTPExpired === "true") {
          this.view.OTPModule.lblWrongOTP.setVisibility(true);
          CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.otpExpired"), accessibilityConfig);
          this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
          this.view.OTPModule.tbxCVV.text = "";
          FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
          FormControllerUtility.hideProgressBar(this.view);
        } else {
          this.view.OTPModule.lblWrongOTP.setVisibility(false);
        }
        this.view.flxPhoneAndEmail.setVisibility(true);
        this.view.OTPModule.flxEnterOTP.setVisibility(false);
        this.view.OTPModule.tbxCVV.text = "";
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.OTPModule.rtxEnterCVVCode, kony.i18n.getLocalizedString("i18n.MFA.EnterSACOnPhone"), accessibilityConfig);
        this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(true);
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        CommonUtilities.setText(this.view.OTPModule.btnLogin, kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify"), accessibilityConfig);
        CommonUtilities.setText(this.view.OTPModule.btnResendOTP, kony.i18n.getLocalizedString("i18n.login.ResendOtp"), accessibilityConfig);
        //         this.view.OTPModule.btnLogin.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
        //         this.view.OTPModule.btnResendOTP.text = kony.i18n.getLocalizedString("i18n.login.ResendOtp");
        this.view.OTPModule.tbxCVV.onKeyUp = function () {
          this.validatetoEnableContinueButton();
        }.bind(this);
        this.view.OTPModule.tbxCVV.onDone = function () {
          FormControllerUtility.showProgressBar(scopeObj.view);
          var selectedData = {
            "securityKey": response.MFAAttributes.securityKey,
            "otp": this.view.OTPModule.tbxCVV.text.trim()
          };
          this.verifyOTP(selectedData);
        }.bind(this);
        this.view.OTPModule.btnLogin.onClick = function () {
          FormControllerUtility.showProgressBar(scopeObj.view);
          var selectedData = {
            "securityKey": response.MFAAttributes.securityKey,
            "otp": this.view.OTPModule.tbxCVV.text.trim()
          };
          this.verifyOTP(selectedData);
        }.bind(this);
        FormControllerUtility.hideProgressBar(this.view);
        this.view.forceLayout();
      },
      showRequestOTPError: function (error) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.requestOTPMessageFailed"), accessibilityConfig);
        //this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.requestOTPMessageFailed");
        this.view.OTPModule.lblWrongOTP.setVisibility(true);
        FormControllerUtility.hideProgressBar(this.view);
        this.view.forceLayout();
      },
      setAriaLabels: function () {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.passwordresetsuccess.btnProceed, kony.i18n.getLocalizedString("i18n.enrollNow.login"), accessibilityConfig);
        CommonUtilities.setText(this.view.EnrollPromptScreen.btnBackToLogin, kony.i18n.getLocalizedString("i18n.enrollNow.Enrolling"), accessibilityConfig);
      },
  
      setContext: function () {
        var authModule = this.loadAuthModule();
        let context = {
          "riskScore": "1",
          "successCallback": authModule.presentationController.onLoginSuccess,
          "failureCallback": authModule.presentationController.onLoginFailure
        };
        if (this.isOriginationFlow) {
          this.view.imgKony.setVisibility(false);
          this.view.imgTemenos.setVisibility(false);
          this.view.btnLocateUs.setVisibility(false);
          this.view.flxVBar1.setVisibility(false);
          this.view.imgAppLogo.src = "header_infinity_logo.png";
          this.view.flxAppLogo.setVisibility(true);
          this.view.flxCloseIcon.setVisibility(true);
          context.parentScope = this;
        }
        this.view.loginComponent.setContext(context);
      },
  
      showLockOrLogoutScreen: function (isLockUser, isLogoutUser, lockTime) {
        let self = this;
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        if (isLockUser) {
          CommonUtilities.setText(self.view.logOutMsg.lblLoggedOut, kony.i18n.getLocalizedString("i18n.mfalogin.lockeduser") + " " + lockTime + kony.i18n.getLocalizedString("i18n.mfa.minutes"), accessibilityConfig);
        } else if (isLogoutUser) {
          CommonUtilities.setText(self.view.logOutMsg.lblLoggedOut, kony.i18n.getLocalizedString("i18n.mfalogin.LockoutMFA"), accessibilityConfig);
        }
        self.view.logOutMsg.imgLogoutSuccess.src = "error_yellow.png";
        self.view.logOutMsg.AlterneteActionsLoginNow.fontIconOption.skin = "sknlblfonticon24px0273e3";
        self.view.logOutMsg.AlterneteActionsLoginNow.fontIconOption.text = "V";
        self.view.logOutMsg.lblSuccessIcon.setVisibility(false);
        FormControllerUtility.hideProgressBar(self.view);
      },
  
      showOrHideMFAAuthentication: function (isOTP, isSecurityQuestions, isLogoutUser) {
        let self = this;
        let isLogin = !(isOTP || isSecurityQuestions || isLogoutUser);
        let isShowLanguage = !(isOTP || isSecurityQuestions);
        self.view.OTPComponent.setVisibility(isOTP);
        //self.view.securityQuestionsComponent.setVisibility(isSecurityQuestions);
        self.view.flxLogoutMsg.setVisibility(isLogoutUser);
        self.view.flxLoginComponentContainer.setVisibility(isLogin);
        self.showOrHideOtherLoginOptions(isLogin);
        self.showOrHideLangaugeDropDown(isShowLanguage);
        self.view.forceLayout();
        kony.application.dismissLoadingScreen();
      },
  
      showOrHideLangaugeDropDown: function (isVisible) {
        let self = this;
        if (this.isOriginationFlow) {
          self.view.flxDropdown.setVisibility(false);
        } else {
          self.view.flxDropdown.setVisibility(isVisible);
        }
        self.view.flxLanguagePicker.setVisibility(false);
      },
  
      resetToLoginScreen: function (errorMessage) {
        let scopeObj = this;
        this.verifyUserNameError = false;
        applicationManager.getAuthManager().setEncodedimage(null);
        scopeObj.view.flxLogin.setVisibility(true);
        scopeObj.view.loginComponent.resetUI();
        scopeObj.view.flxLoginComponentContainer.setVisibility(true);
        scopeObj.showOrHideOtherLoginOptions(true);
        scopeObj.view.flxContent.setVisibility(true);
        let self = this;
        var locale = kony.i18n.getCurrentLocale();
        if (locale === "ar_AE") {
          self.view.lblBeyondBankingDesc.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
          self.view.lblCopyright.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
          self.view.lblBeyondBankingDesc.left = "82dp";
          self.view.lblBeyondBankingDesc.width = "81%";
          self.view.lblCopyright.right = "-15dp";
          self.view.lblCopyright.width = "90%";
          self.view.lblCopyright.height = "16dp";
  
        }
        scopeObj.view.flxActivateProfile.setVisibility(false);
			
            scopeObj.view.flxLegalEntity.setVisibility(false);
        scopeObj.view.flxEnrollActivateContainer.setVisibility(false);
        scopeObj.view.activateNow1.clearUserNameAndActivationCode();
        scopeObj.view.activateNow1.resetUI();
        //scopeObj.view.securityQuestionsComponent.setVisibility(false);
        scopeObj.view.OTPComponent.setVisibility(false);
        scopeObj.view.cantSignIn.setVisibility(false);
        scopeObj.view.regenrateActivationCodeComponent.setVisibility(false);
        scopeObj.view.resetPasswordComponent.setVisibility(false);
        scopeObj.view.resetPasswordComponent.resetUI();
        scopeObj.showOrHideLangaugeDropDown(true);
        scopeObj.view.flxLogin.forceLayout();
        scopeObj.AdjustScreen();
        if (errorMessage) {
          scopeObj.showLoginError(errorMessage);
        }
        scopeObj.initializeResponsiveViews();
      },
  
      MFANavigation: function (response) {
        let scopeObj = this;
        if (response && response.MFAAttributes && parseInt(response.MFAAttributes.remainingFailedAttempts) === 0) {
          scopeObj.showLockOrLogoutScreen(response.MFAAttributes.lockUser === "true",
                                          response.MFAAttributes.logoutUser === "true", response.MFAAttributes.lockoutTime);
          scopeObj.showOrHideMFAAuthentication(false, false, true);
        } else if (response.MFAAttributes.MFAType === OLBConstants.MFA_FLOW_TYPES.SECURE_ACCESS_CODE) {
          scopeObj.view.OTPComponent.showMFA(response);
          scopeObj.showOrHideMFAAuthentication(true, false, false);
        } else if (response.MFAAttributes.MFAType === OLBConstants.MFA_FLOW_TYPES.SECURITY_QUESTIONS) {
          //scopeObj.view.securityQuestionsComponent.showSecurityQuestions(response);
          scopeObj.showOrHideMFAAuthentication(false, true, false);
        }
      },
  
      postLoginSuccess: function (response) {
        this.loadAuthModule().presentationController.onLoginSuccess(response);
      },
  
      postMFAAuthentication: function (response) {
        this.loadAuthModule().presentationController.onLoginMFA(response.serviceKey);
      },
  
      showLoginError: function (response) {
        let errorMessage = response.errorMessage ? response.errorMessage : response;
        this.view.loginComponent.showLoginError(errorMessage);
        this.showOrHideMFAAuthentication(false, false, false);
      },

		//Enroll and can't signin flow
        currentFlow: function (userFlow) {
            scopeObj=this;
            if (userFlow) {
                if (userFlow === "Enroll") {
                    let context = {
                        "action": "NavigateToEnroll"
                    };
                    let enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "EnrollModule",
                        "appName": "SelfServiceEnrolmentMA"
                    });
                    enrollModule.presentationController.showEnrollPage(context);
                    
                    //this.view.flxLogin.setVisibility(false);
                    //this.view.flxLegalEntity.setVisibility(false);
                }
                if (userFlow === "cantsignin") {
                  scopeObj.fetchCaptcha();
              }
            }
        },
        legalEntity: function(entityValues) {
          var scopeObj = this;
          var entityValues = {
              "companyLegalUnits": entityValues.customerlegalentity
          };
          scopeObj.view.flxLogin.setVisibility(false);
          scopeObj.view.flxLegalEntity.setVisibility(true);
          scopeObj.view.btnLegalEntity.isVisible = true;
          scopeObj.entityMasterData = entityValues.companyLegalUnits;
          if(entityValues.companyLegalUnits.length >5){
              scopeObj.view.flxLegalSearch.setVisibility(true);
          }else{
              scopeObj.view.flxLegalSearch.setVisibility(false);
          }
          scopeObj.view.btnLegalEntity.skin = "sknBtnNormalSSPFFFFFF15Px";
          var homeEntityData = applicationManager.getMultiEntityManager().getUserLegalEntitiesListObj()[applicationManager.getUserPreferencesManager().getHomeLegalEntity()];
          scopeObj.view.lblSelectLegalEntity.text = homeEntityData.companyName;
          scopeObj.entityId = homeEntityData.id;
          FormControllerUtility.hideProgressBar();
          // TO POPULATE DATA IN THE SEGMENT
          var segDataRegion = [];
              var storeDataRegion;
              for (var i = 0; i < entityValues.companyLegalUnits.length; i++) {
                  storeDataRegion = {
                      Details: entityValues.companyLegalUnits[i].companyName,
                      id: entityValues.companyLegalUnits[i].id
                  };
                  segDataRegion.push(storeDataRegion);
              }
              scopeObj.view.segLegalEntity.widgetDataMap = {
                  lblLegalEntityList: "Details",
                  entityId: "id"
              };
              scopeObj.view.segLegalEntity.setData(segDataRegion);
              allRegionData = segDataRegion;
              //LEGAL ENTITY DROPdOWN
          scopeObj.view.flxLegalEntityDropDown.onClick = function() {                
              //onclick dropdown
              if (scopeObj.view.flxLegalEntityCombine.isVisible === true) {
                  scopeObj.view.flxLegalEntityCombine.setVisibility(false);
                  scopeObj.view.flxLegalSearch.setVisibility(false);
              } else {
                  scopeObj.view.flxLegalEntityCombine.setVisibility(true);
                  scopeObj.view.txtLegalSearch.text = "";
                  scopeObj.view.segLegalEntity.setData(allRegionData);
                  scopeObj.isDefaultEntityCheckBoxEnabed = false;
                  scopeObj.view.lblFavoriteEmailCheckBox.text = "D";
                  if(entityValues.companyLegalUnits.length >5){
                      scopeObj.view.flxLegalSearch.setVisibility(true);
                  }else{
                      scopeObj.view.flxLegalSearch.setVisibility(false);
                  }
              }
          };
          //SEARCH FUNCTIONALITY IN LEGAL ENTITY DROPDOWN
          scopeObj.view.txtLegalSearch.onKeyUp = function() {
              if (scopeObj.view.txtLegalSearch.text.trim().length > 0) {
                  var segTest = scopeObj.view.segLegalEntity.data;
                  var search = scopeObj.view.txtLegalSearch.text;
                  var filterData = CommonUtilities.sortAndSearchJSON(allRegionData,"","ASC","Details,id",search);
                  if (filterData.length === 0) {
                      scopeObj.view.segLegalEntity.setVisibility(false);
                  } else {
                      scopeObj.view.segLegalEntity.setData(filterData);
                      scopeObj.view.segLegalEntity.setVisibility(true);
                  }
              } else {
                  scopeObj.view.segLegalEntity.setData(allRegionData);
                  scopeObj.view.segLegalEntity.setVisibility(true);
              }
              scopeObj.view.forceLayout();
          };
          scopeObj.view.segLegalEntity.onRowClick = function() {
              scopeObj.view.lblSelectLegalEntity.text = scopeObj.view.segLegalEntity.selectedRowItems[0].Details; //inserts the selected value from the dropdown
              var selectedEntity = scopeObj.view.segLegalEntity.selectedRowItems[0].id;
              var region = scopeObj.view.lblSelectLegalEntity.text;
              regionForCreate = region;
              scopeObj.view.flxLegalEntityCombine.setVisibility(false);
              scopeObj.view.flxLegalSearch.setVisibility(false);
              selectedEntityId = entityValues.companyLegalUnits.filter(function(item) {
                  if (item.legalEntityName === region) return item.id;
              });
              // companyNameid = selectedEntityId[0].legalEntityId;
              if (scopeObj.view.flxLegalEntity.isVisible === true) {
                  //                     scopeObj.view.flxLogin.setVisibility(true);
                  //                     scopeObj.view.flxLegalEntity.setVisibility(false);
              }
              scopeObj.entityId = selectedEntity;
          };
          scopeObj.view.btnLegalEntity.onClick = function() {
              scopeObj.loadAuthModule().presentationController.callGetPostLoginWithEntity(scopeObj.entityId);
              scopeObj.loadAuthModule().presentationController.isDefaultEntityCheckBoxEnabed = scopeObj.isDefaultEntityCheckBoxEnabed;
          }
          scopeObj.view.flexcheckuncheck.onClick = function() {
              if (scopeObj.view.lblFavoriteEmailCheckBox.text === "C") {
                  scopeObj.isDefaultEntityCheckBoxEnabed = false;
                  scopeObj.view.lblFavoriteEmailCheckBox.text = "D";
              } else {
                  scopeObj.isDefaultEntityCheckBoxEnabed = true;
                  scopeObj.view.lblFavoriteEmailCheckBox.text = "C";
              }
          }
      },
      cantSignIn: function () {
        let scopeObj = this;
			//can't signin flow
            userFlow="cantsignin";
            scopeObj.view.lblSelectLegalEntity.text = "Select";
            scopeObj.view.txtLegalSearch.text="";
            scopeObj.fetchLegalEntity();
            
            //this.loadAuthModule().presentationController.getLegalEntities({});
        //this.legalEntity();
        //FormControllerUtility.showProgressBar();
      },
		//fetching legalEntity
        fetchLegalEntity: function(){
           this.loadAuthModule().presentationController.getLegalEntities({});
  
        },
        //CALLING FROM resetPasswordComponent
        changeNavigationFlow: function(errorMessage) {
          navigationFlow = true;
          this.verifyUserNameError = false;
          let scopeObj = this;
          FormControllerUtility.showProgressBar();
          scopeObj.fetchCaptcha();
          scopeObj.view.cantSignIn.flxClose.setVisibility(true);
          scopeObj.view.cantSignIn.lblErrorMsg.text = errorMessage;
      },
        fetchCaptcha: function() {
        this.loadAuthModule().presentationController.generateCaptcha({});
      },
  
      setCaptcha: function (response, isLabelRefresh) {
        let scopeObj = this;
        if (response.encodedImage) applicationManager.getAuthManager().setEncodedimage(response.encodedImage);
        if (response.serviceKey) applicationManager.getAuthManager().setServicekey(response.serviceKey);
        scopeObj.view.cantSignIn.imgCaptcha.base64 = applicationManager.getAuthManager().getEncodedimage();
        if (navigationFlow) {
          scopeObj.view.flxLoginComponentContainer.setVisibility(false);
          scopeObj.showOrHideOtherLoginOptions(false);
          scopeObj.view.cantSignIn.imgCaptcha.base64 = applicationManager.getAuthManager().getEncodedimage();
          scopeObj.view.cantSignIn.resetUI();
          scopeObj.view.cantSignIn.setVisibility(true);
          scopeObj.showOrHideLangaugeDropDown(false);
          scopeObj.screenAdjustments();
          FormControllerUtility.hideProgressBar();
          scopeObj.view.resetPasswordComponent.setVisibility(false);
          navigationFlow = false;
          scopeObj.view.cantSignIn.lblErrorMsg.setVisibility(true);
      }
        if (!isLabelRefresh) {
          scopeObj.view.flxLoginComponentContainer.setVisibility(false);
          scopeObj.showOrHideOtherLoginOptions(false);
          scopeObj.view.cantSignIn.imgCaptcha.base64 = applicationManager.getAuthManager().getEncodedimage();
          scopeObj.view.cantSignIn.resetUI();
          scopeObj.view.cantSignIn.setVisibility(true);
          scopeObj.showOrHideLangaugeDropDown(false);
          scopeObj.screenAdjustments();
          FormControllerUtility.hideProgressBar();
        }
        if (this.verifyUserNameError) {
          scopeObj.view.cantSignIn.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.login.CantSignIn.userDoesntExists");
          scopeObj.view.cantSignIn.lblErrorMsg.setVisibility(true);
          scopeObj.view.cantSignIn.flxEmailAddress.skin = scopeObj.view.cantSignIn.sknErrorFlex;
          FormControllerUtility.hideProgressBar();
        }
        if (kony.application.getCurrentBreakpoint() > 1400) {
          this.view.cantSignIn.top = "5%";
        }
        scopeObj.view.cantSignIn.tbxCaptcha.text = "";
        scopeObj.view.cantSignIn.enableContinue();
        scopeObj.initializeResponsiveViews();
        if(scopeObj.view.flxLegalEntity.isVisible === true){
          scopeObj.view.flxLogin.setVisibility(true);
          scopeObj.view.flxLegalEntity.setVisibility(false);
      }
      },
  
      screenAdjustments: function () {
        let scopeObj = this;
        scopeObj.view.forceLayout();
        let verifyHeight = scopeObj.view.cantSignIn.flxVerify.info.frame.height;
        let mainHeight = scopeObj.view.flxMain.info.frame.height;
        let loginHeight = mainHeight > (verifyHeight + 130) ? mainHeight : (verifyHeight + 130);
        scopeObj.view.cantSignIn.height = loginHeight + "dp";
        scopeObj.view.regenrateActivationCodeComponent.height = loginHeight + "dp";
        scopeObj.view.flxLogin.height = loginHeight + "dp";
        scopeObj.setFooterHeight(loginHeight);
      },
      showUsersList: function (usersList) {
        if (this.isOriginationFlow) {
          var isExistentMemberCheck = (this.context.isExistentMember) ? true : false
          this.view.cantSignIn.setUserFlow(this.isOriginationFlow);
          this.view.cantSignIn.setUsers(usersList, isExistentMemberCheck);
        } else {
          this.view.cantSignIn.setUsers(usersList);
        }
      },
  
      regenerateActivationCode: function () {
        let scopeObj = this;
        let userId = scopeObj.view.cantSignIn.fetchUserIdOnUserName(scopeObj.view.cantSignIn.lstBoxSelectUsername.selectedKey);
        this.loadAuthModule().presentationController.regenerateActivationCode({
          "serviceKey": applicationManager.getAuthManager().getServicekey(),
          "id": userId
        });
      },
  
      displayRegenerateScreen: function () {
        let scopeObj = this;
        scopeObj.view.cantSignIn.setVisibility(false);
        scopeObj.view.regenrateActivationCodeComponent.setVisibility(true);
        scopeObj.showOrHideLangaugeDropDown(false);
        scopeObj.view.forceLayout();
      },
      rmsUserBlock: function(output){
        let scopeObj = this;
        scopeObj.view.cantSignIn.setVisibility(true);
        scopeObj.view.cantSignIn.errorCallback(output);
      },
  
      displayRequestResetPasswordComponenet: function () {
        let scopeObj = this;
        scopeObj.view.resetPasswordComponent.setVisibility(true);
        scopeObj.view.cantSignIn.setVisibility(false);
        scopeObj.view.forceLayout();
        scopeObj.view.flxLogin.forceLayout();
        FormControllerUtility.hideProgressBar();
      },
  
      verifyUserDetailsError: function (response) {
        let scopeObj = this;
        if (response.serverErrorRes && response.serverErrorRes.dbpErrCode && response.serverErrorRes.encodedImage) {
          applicationManager.getAuthManager().setEncodedimage(response.serverErrorRes.encodedImage);
          scopeObj.view.cantSignIn.imgCaptcha.base64 = response.serverErrorRes.encodedImage;
          scopeObj.view.cantSignIn.tbxCaptcha.text = "";
          scopeObj.view.cantSignIn.showError(kony.i18n.getLocalizedString("i18n.login.CantSignIn.invalidCaptcha"), true);
          scopeObj.view.cantSignIn.enableContinue();
          FormControllerUtility.hideProgressBar();
        } else {
          this.verifyUserNameError = true;
          scopeObj.fetchCaptcha();
        }
      },
  
      showOrHideOtherLoginOptions: function (isVisible) {
        let scopeObj = this;
        if (this.isOriginationFlow) {
          scopeObj.view.flxNewNEnroll.setVisibility(false);
        } else {
          scopeObj.view.flxNewNEnroll.setVisibility(isVisible);
        }
      },
  
      setFooterHeight: function (height) {
        let scopeObj = this;
        let breakPoint = kony.application.getCurrentBreakpoint();
        if (breakPoint <= 1024) {
          let bufferHeight = (breakPoint === 640) ? 50 : 70;
          scopeObj.view.flxFooterMenu.top = (height + bufferHeight) + "dp";
          scopeObj.view.flxCopyRight.top = (height + bufferHeight + 45) + "dp";
        }
      },
  
      isMicroAppPresent: function (microApp) {
        let configManager = applicationManager.getConfigurationManager();
        return configManager.isMicroAppPresent(microApp);
      },
  
      exitAuthModule: function () {
        if (this.context.deepLinkParams !== undefined && this.context.deepLinkParams.DocId && (this.context.loginErrorPopup === undefined || !this.context.loginErrorPopup)) {
          this.context.isDocId = true;
          kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "DocumentMA", "moduleName": "DownloadUIModule" }).presentationController.downloadAssistDocument(this.context, this.downloadAssistDocumentSuccessCallback, this.downloadAssistDocumentFailureCallback);
        } else {
          kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AuthenticationMA", "moduleName": "AuthUIModule" }).presentationController.onSubmoduleExit(this.context);
        }
      },
  
      downloadAssistDocumentSuccessCallback: function () {
        this.doLogout();
      },
  
      downloadAssistDocumentFailureCallback: function () {
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AuthenticationMA", "moduleName": "AuthUIModule" }).presentationController.onSubmoduleExit(this.context);
      },
  
      doLogout: function () {
        var authenticationManager = applicationManager.getAuthManager();
        authenticationManager.doLogout(this.context, this.logoutFailure);//Pass the context to the doLogout Method
      },
  
      logoutFailure: function () {
        //Handle Failure scenario
      },
  
      idleLogOut: function () {
        this.doLogout();
      },
  
      loginSuccessCallback: function (response) {
        var self = this;
        if (self.context.FlowType != undefined && self.context.FlowType == "Business" && self.context.isCompanySelection === undefined) {
          var userParams = { "partyId": response.partyDetails.id };
          applicationManager.getAuthManager().getPartyRelations(userParams, function (res) {
            self.context.relatedParties = res.partyRelations;
            self.context.isCompanySelection = true;
            self.loginSuccessCallbackContinue(response);
          }, function (err) {
            FormControllerUtility.hideProgressBar();
            //applicationManager.getPresentationUtility().dismissLoadingScreen();
            self.context.isCompanySelection = true;
            self.loginSuccessCallbackContinue(response);
          });
        } else {
          self.loginSuccessCallbackContinue(response);
        }
      },
  
      loginSuccessCallbackContinue: function (response) {
        var self = this;
        var configManager = applicationManager.getConfigurationManager();
        if (self.context.BranchRef == "" || self.context.BranchRef === undefined) {
          self.context.BranchRef = configManager.getSystemConfig("BRANCH_REF");
        }
        self.context.isUserLoggedIn = true;
        kony.print("Login successful");
        self.context.partyResponse = response.partyDetails;
        self.context.FirstName = response.partyDetails.FirstName;
        if (self.context.isExistentMember !== undefined && !self.context.isExistentMember) {
          self.context.fromProspectResumeUsernameAndPwd = true;
          self.context.fromOTP = false;
          self.context.isProspectLogin = true;
          self.context.fromResumeModule = true;
          if (response.partyDetails.isProspectExpired && response.partyDetails.isProspectExpired != "") {
            self.context.isProspectExpired = response.partyDetails.isProspectExpired;
          }
        }
        //Phone number for OTP in funding flow
        self.context.loginPhoneNumber = response.partyDetails.CountryCode + response.partyDetails.MobileNumber;
        if (self.context.partyResponse.BranchRef != undefined && self.context.partyResponse.BranchRef != "") {
          self.context.BranchRef = self.context.partyResponse.BranchRef; // Overridding the BranchRef value in context with BranchRef value from login reponse 
          var previousForm = kony.application.getPreviousForm().id;
          if (previousForm === "frmLandingDashboard" || previousForm === "frmProductDetails" || previousForm === "frmProductGroup" || previousForm === "frmExistingCustomer") {
            if (self.context.BranchRef != self.context.partyResponse.BranchRef) {
              self.context.BranchRef = self.context.partyResponse.BranchRef;
              self.context.isClose = true;
              self.context.isDeepLinked = false;
              //applicationManager.getPresentationUtility().dismissLoadingScreen();
              self.view.popup.flxClose.setVisibility(false);
              self.view.popup.btnNo.setVisibility(false);
              self.view.popup.lblHeader.setVisibility(false);
              self.view.flxPopUp.setVisibility(true);
              FormControllerUtility.hideProgressBar();
              self.view.forceLayout();
            } else {
              FormControllerUtility.hideProgressBar();
              self.exitAuthModule();
            }
          } else {
            self.context.BranchRef = self.context.partyResponse.BranchRef;
            FormControllerUtility.hideProgressBar();
            self.exitAuthModule();
          }
        } else {
          FormControllerUtility.hideProgressBar();
          self.exitAuthModule();
        }
      },
      configureTNCLegalEntity: function(response) {
            this.view.flxTNCEntity.isVisible = true;
            if (kony.application.getCurrentBreakpoint() === 640 && kony.os.deviceInfo().screenHeight <= 750) {
              this.view.flxTNCEntity.height = "134%";
            }
            kony.application.dismissLoadingScreen();
            this.view.TermsAndConditionLegalEntity.flxClose.onClick = this.onClickOfCancelTAndCLegalEntity;
            this.view.TermsAndConditionLegalEntity.btnCancelTAndC.onClick = this.onClickOfCancelTAndCLegalEntity;
            this.view.TermsAndConditionLegalEntity.btnAcceptTAndC.onClick = this.onClickOfAcceptTAndCLegalEntity;
            this.view.TermsAndConditionLegalEntity.TermsAndConditionBody.text = response && response.termsAndConditionsContent ? response.termsAndConditionsContent : "";
        },
        addTermsAndConditionsLegalEntityPopup: function() {
            let currForm = kony.application.getCurrentForm();
            if (!currForm.flxTermsAndConditionsLegalEntity) {
                var flxTermsAndConditionsLegalEntity = new kony.ui.FlexContainer({
                    "id": "flxTermsAndConditionsLegalEntity",
                    "autogrowMode": kony.flex.AUTOGROW_NONE,
                    "clipBounds": false,
                    "top": "0dp",
                    "left": "0dp",
                    "width": "100%",
                    "height": "100%",
                    "isVisible": false,
                    "layoutType": kony.flex.FREE_FORM,
                    "isModalContainer": true,
                    "skin": "sknflx000000op50",
                    "zIndex": 1000,
                    "appName": "ResourcesMA"
                }, {}, {});
                flxTermsAndConditionsLegalEntity.setDefaultUnit(kony.flex.DP);
                currForm.add(flxTermsAndConditionsLegalEntity);
            }
            if (!currForm.flxTermsAndConditionsLegalEntity.tandcLegalEntity) {
                var componentTAndCLegalEntity = new com.InfinityOLB.Resources.TermsAndConditionLegalEntity({
                    "autogrowMode": kony.flex.AUTOGROW_NONE,
                    "id": "tandcLegalEntity",
                    "layoutType": kony.flex.FLOW_VERTICAL,
                    "masterType": constants.MASTER_TYPE_DEFAULT,
                    "isModalContainer": true,
                    "appName": "ResourcesMA"
                });
                flxTermsAndConditionsLegalEntity.add(componentTAndCLegalEntity);
            }
        },
        showTermsAndConditionsLegalEntityPopup: function(response, seg, flx, lbl, callback) {
            let scope = this;
            if (kony.application.getCurrentForm()) {
                let currForm = kony.application.getCurrentForm();
                if (!currForm.flxTermsAndConditionsLegalEntity || !currForm.flxTermsAndConditionsLegalEntity.tandcLegalEntity) {
                    scope.addTermsAndConditionsLegalEntityPopup();
                }
                currForm.tandcLegalEntity.TermsAndConditionBody.text = response && response.termsAndConditionsContent ? response.termsAndConditionsContent : "";
                currForm.tandcLegalEntity.flxClose.setActive(true);
                currForm.tandcLegalEntity.flxClose.onClick = scope.onClickOfCancelTAndCLegalEntity.bind(scope, flx, callback);
                currForm.tandcLegalEntity.btnCancelTAndC.accessibilityConfig = {
                    "a11yARIA": {
                        "tabindex": 0
                    }
                };
                currForm.tandcLegalEntity.btnCancelTAndC.onClick = scope.onClickOfCancelTAndCLegalEntity.bind(scope, flx, callback);
                currForm.tandcLegalEntity.btnAcceptTAndC.accessibilityConfig = {
                    "a11yARIA": {
                        "tabindex": 0
                    }
                };
                currForm.tandcLegalEntity.btnAcceptTAndC.onClick = scope.onClickOfAcceptTAndCLegalEntity.bind(scope, seg, flx, lbl, callback);
                currForm.flxTermsAndConditionsLegalEntity.setVisibility(true);
                currForm.forceLayout();
            }
        },
        onClickOfAcceptTAndCLegalEntity: function() {
            let scope = this;
            // let selectedEntityRowData = seg.selectedRowItems[0];
            // let selectedEntityData = seg.data.find(entityData => entityData.id === selectedEntityRowData.id);
            let requestObj = {
                "id": scope.entityId ? scope.entityId : scope.loadAuthModule().presentationController.entityId
            };
            this.view.flxTNCEntity.isVisible = false;
            this.loadAuthModule().presentationController.acceptEntityTNC(requestObj.id);
        },
        onClickOfCancelTAndCLegalEntity: function() {
            let scope = this;
            // flxTNC.setVisibility(false);
            this.view.flxTNCEntity.isVisible = false;
            
        },
        acceptEntityTNC: function() {
            this.view.flxTNCEntity.isVisible = false;
            this.loadAuthModule().presentationController.acceptEntityTNC(this.entityId);
        },
        rejectEntityTNC: function() {
            this.view.flxTNCEntity.isVisible = false;
            this.loadAuthModule().presentationController.getEntity("");
        },
        preloginLegalEntity: function(entityValues) {
          var scopeObj = this;
              //FormControllerUtility.showProgressBar(this.view);
              scopeObj.view.flxLogin.setVisibility(false);
              scopeObj.view.flxLegalEntity.setVisibility(true);
              scopeObj.view.btnLegalEntity.isVisible = false;
              scopeObj.view.flxRemember.setVisibility(false);
          //LEGAL ENTITY DROPdOWN
          scopeObj.view.flxLegalEntityDropDown.onClick = function() {
              // TO POPULATE DATA IN THE SEGMENT
              var segDataRegion = [];
              var storeDataRegion;
              for (var i = 0; i < entityValues.companyLegalUnits.length; i++) {
                  storeDataRegion = {
                      Details: entityValues.companyLegalUnits[i].companyName,
                      entityId: "id"
                  };
                  segDataRegion.push(storeDataRegion);
              }
              scopeObj.view.segLegalEntity.widgetDataMap = {
                  lblLegalEntityList: "Details",

              };
              scopeObj.view.segLegalEntity.setData(segDataRegion);
              scopeObj.view.flxLegalEntityCombine.isVisible = true;
              allRegionData = segDataRegion;
              //onclick dropdown
              //     if (scopeObj.view.flxsearchandsegcombined.isVisible === true) {
              //         //scopeObj.view.flxDropdownContainer.setVisibility(false);
              //         scopeObj.view.flxOuter.setVisibility(false);
              //         scopeObj.view.flxsearchandsegcombined.setVisibility(false);
                      
              // } else {
              //         //scopeObj.view.flxDropdownContainer.setVisibility(true);
              //         scopeObj.view.flxOuter.setVisibility(true);
              //         scopeObj.view.flxsearchandsegcombined.setVisibility(true);
                     
              // }
                 
          };
             scopeObj.view.flxOuter.onClick = function(){
                scopeObj.view.flxOuter.setVisibility(false);
                scopeObj.view.flxsearchandsegcombined.setVisibility(false);
              }
              //SEARCH FUNCTIONALITY IN LEGAL ENTITY DROPDOWN
              scopeObj.view.txtLegalSearch.onKeyUp = function() {
              if (scopeObj.view.txtLegalSearch.text.trim().length > 0) {
                  var segTest = scopeObj.view.segLegalEntity.data;
                      var search = scopeObj.view.txtLegalSearch.text.toLowerCase();
                  var status = "";
                      var filterData = segTest.filter(function(response) {
                      status = response.Details.toLowerCase();
                      if (status.indexOf(search) >= 0) return response;
                  });
                  if (filterData.length === 0) {
                      scopeObj.view.segLegalEntity.setVisibility(false);
                  } else {
                      scopeObj.view.segLegalEntity.setData(filterData);
                      scopeObj.view.segLegalEntity.setVisibility(true);
                  }
              } else {
                  scopeObj.view.segLegalEntity.setData(allRegionData);
                  scopeObj.view.segLegalEntity.setVisibility(true);
              }
              scopeObj.view.forceLayout();
          };
          scopeObj.view.segLegalEntity.onRowClick = function() {
              scopeObj.view.flxLegalEntityCombine.isVisible = false;
              scopeObj.view.lblSelectLegalEntity.text = scopeObj.view.segLegalEntity.selectedRowItems[0].Details; //inserts the selected value from the dropdown
              var region = scopeObj.view.lblSelectLegalEntity.text;
              regionForCreate = region;
                  // scopeObj.view.flxsearchandsegcombined.setVisibility(false);
                  
              selectedEntityId = entityValues.companyLegalUnits.filter(function(item) {
                  if (item.companyName === region) return item.id;
              });
              companyNameid = selectedEntityId[0].id;
              
                  kony.timer.schedule("LoginTimer1",scopeObj.currentFlow(userFlow), 5, false);
                  var navManager = applicationManager.getNavigationManager();
                  navManager.setCustomInfo("enrollPersonal",companyNameid);
                  navManager.setCustomInfo("legalEntityName", regionForCreate);
                  // if (scopeObj.view.flxLegalEntity.isVisible === true) {
                  //     scopeObj.view.flxLogin.setVisibility(true);
                  //     scopeObj.view.flxLegalEntity.setVisibility(false);
                  // }
              };
              //CloseButton
              scopeObj.view.flxCloseLegalEntity.onClick = function() {
  //                 scopeObj.view.flxLegalDropdown.setVisibility(false);
  //                 scopeObj.view.flxLegalSearch.setVisibility(false);
                  // scopeObj.view.flxsearchandsegcombined.setVisibility(false);
                  scopeObj.resetToLoginScreen();
          };
      },
    };
  });