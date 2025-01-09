define(['CampaignUtility'], function(CampaignUtility){
  return{
    preShow: function () {
      this.view.postShow = this.postShow;
      this.initActions();
      //  this.enableOrDisableHamburger();
      var navManager = applicationManager.getNavigationManager();
      var configManager = applicationManager.getConfigurationManager();
      var MenuHandler =  applicationManager.getMenuHandler();
      var userObj = applicationManager.getUserPreferencesManager();
      if (userObj.isUserLoggedin() === true) {
        MenuHandler.setUpHamburgerForForm(this, configManager.constants.MENUCONTACT);
      }
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      var ContactUs = applicationManager.getLoggerManager();
      ContactUs.setCustomMetrics(this, false, "Support");
      let scopeObj = this;
      function campaignPopUpSuccess(response){
        CampaignUtility.showCampaign(response, scopeObj.view);
      }
      function campaignPopUpError(response){
        kony.print(response, "Campaign Not Found!");
      }
      if(applicationManager.getUserPreferencesManager().isUserLoggedin()){
        CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
      }
      if(applicationManager.getStorageManager().getStoredItem("langObj") && applicationManager.getStorageManager().getStoredItem("langObj").language === 'Arabic'){
        scopeObj.view.customHeader.imgBack.src = "backbutton_reverse.png";
      }
    },
    postShow : function(){
      this.setSegmentData();
      this.view.customHeader.flxBack.onClick=this.backIcon;
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
      }
      else{
        this.view.flxHeader.isVisible = true;
      }
      this.view.onDeviceBack =this.backIcon;
      //hard-coded version due to techincal limation of XXX.YYY.ZZZ
      this.view.lblAppVersion.text= kony.i18n.getLocalizedString("kony.mb.Support.AppVersion")+" "+"20"+appConfig.appVersion;
      this.enableOrDisableHamburger();
    },
    init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
     initActions: function(){
        var scope = this;
        this.view.btnCallBranch.onClick = function(){
            applicationManager.getPresentationUtility().showLoadingScreen();
            var infoCall = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
            infoCall.presentationController.onClickCallUs();
        }
    },
    enableOrDisableHamburger :function(){
       var userObj = applicationManager.getUserPreferencesManager();
       var Login = userObj.isUserLoggedin();
       if(Login === true){
           this.view.customHeader.flxBack.imgBack.src = "hamburger.png";
           if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
               this.view.flxSupportMain.bottom = "60dp";
               this.view.flxFooter.isVisible = true;
            }
           else{
               this.view.flxSupportMain.bottom = "0dp";
               this.view.flxFooter.isVisible = false;
           }
       }else{
           var scope = this;
           this.view.flxFooter.isVisible = false;
           this.view.flxSupportMain.bottom = "0dp";
        this.view.customHeader.flxBack.imgBack.src = "backbutton.png";
        this.view.customHeader.flxBack.onClick = function(){
         scope.backIcon();
       };
       }
       },
    showDial: function (phoneNumber) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.phone.dial(phoneNumber);
    },
    backIcon: function() {
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        var userObj = applicationManager.getUserPreferencesManager();
        var Login = userObj.isUserLoggedin();
        if(Login === true){
//           var navManager = applicationManager.getNavigationManager();
//           navManager.goBack();
          var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName": "AccountsUIModule"});
          accountMod.presentationController.showDashboard();

        }
       else{
          var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
          informationPC.presentationController.commonFunctionForNavigation({"appName":"AuthenticationMA","friendlyName": "AuthUIModule/frmLogin"});
        }
      }
      else{
        var userObj = applicationManager.getUserPreferencesManager();
        var Login = userObj.isUserLoggedin();
        if(Login === true){
          //           var navManager = applicationManager.getNavigationManager();
          //           navManager.goBack();
          var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName": "AccountsUIModule"});
          accountMod.presentationController.showDashboard();

        }
        else{
          var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
          informationPC.presentationController.commonFunctionForNavigation({"appName":"AuthenticationMA","friendlyName": "AuthUIModule/frmLogin"});
        }
      }
    },
    setSegmentData: function () {
        var scope = this;
        var configManager = applicationManager.getConfigurationManager();
        if(applicationManager.getStorageManager().getStoredItem("langObj") && applicationManager.getStorageManager().getStoredItem("langObj").language === 'Arabic'){
        var data = [{
                "imgArrow": "chevron_reverse.png",
                "lblTitle": configManager.constants.FAQ
            }, {
                "imgArrow": "chevron_reverse.png",
                "lblTitle": configManager.constants.TERMS
            },
            {
                "imgArrow": "chevron_reverse.png",
                "lblTitle": configManager.constants.PRIVACY
            }
        ];
        }
        else{
          data = [{
            "imgArrow": "chevron.png",
            "lblTitle": configManager.constants.FAQ
        }, {
            "imgArrow": "chevron.png",
            "lblTitle": configManager.constants.TERMS
        },
        {
            "imgArrow": "chevron.png",
            "lblTitle": configManager.constants.PRIVACY
        }
    ];
        }
        this.view.segSupport.setData(data);
        var segData = [{
          "lblTimeZone": kony.i18n.getLocalizedString("kony.mb.informationUI.timeZone"),
          "lblTimingTitle": kony.i18n.getLocalizedString("kony.mb.support.MonToFri"),
          "lblTimingValue": kony.i18n.getLocalizedString("kony.mb.informationUI.time")
        },{
          "lblTimeZone": kony.i18n.getLocalizedString("kony.mb.informationUI.timeZone"),
          "lblTimingTitle": kony.i18n.getLocalizedString("kony.mb.support.Sat"),
          "lblTimingValue": kony.i18n.getLocalizedString("kony.mb.segtimings.lblTimingvalue")
        }
        ];
        this.view.segTimings.setData(segData);
        this.view.segSupport.onRowClick = function(){
           var selectedvalue = scope.view.segSupport.selectedItems[0].lblTitle;
            if(selectedvalue === configManager.constants.PRIVACY){
             applicationManager.getPresentationUtility().showLoadingScreen();
             var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
             informationPC.presentationController.onClickPrivacyPolicy(selectedvalue);
            } else if(selectedvalue === configManager.constants.TERMS){
             applicationManager.getPresentationUtility().showLoadingScreen();
             var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
             informationPC.presentationController.onClickTermsAndConditions(selectedvalue);
            } else if(selectedvalue === configManager.constants.ABOUT){
             applicationManager.getPresentationUtility().showLoadingScreen();
             var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
             informationPC.presentationController.onClickAboutUs(selectedvalue);
            } else if(selectedvalue === configManager.constants.FAQ){
             applicationManager.getPresentationUtility().showLoadingScreen();
             var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
             informationPC.presentationController.onClickFAQs(selectedvalue);
            }
        }
    }
  };
});