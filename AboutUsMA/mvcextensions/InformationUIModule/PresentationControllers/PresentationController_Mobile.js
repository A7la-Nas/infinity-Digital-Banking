define([], function() {
    function Information_PresentationController() {
         scope_InformationPresenter = this;
        kony.mvc.Presentation.BasePresenter.call(this);
    }
    inheritsFrom(Information_PresentationController, kony.mvc.Presentation.BasePresenter);
    Information_PresentationController.prototype.initializePresentationController = function() {
    };
  Information_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo(formName);
  };
    Information_PresentationController.prototype.onClickPrivacyPolicy = function(headerValue){
      var privacyBC = applicationManager.getInformationManager();
      privacyBC.fetchPrivacyPolicy(presentationSuccessCallback,presentationErrorCallback);
      function presentationSuccessCallback(response){
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmSupportInfo",{"richTextData":"<font face='SourceSansPro-Regular'>"+response.records[0].Description,"header":headerValue});
         navManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"InformationUIModule/frmSupportInfo"}); 
        //navManager.navigateTo("frmSupportInfo");
      }
      function presentationErrorCallback(response){
       var error = applicationManager.getLoggerManager();
        error.log(response);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
         if(response["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
      }
    }
      Information_PresentationController.prototype.onClickTermsAndConditions = function(headerValue){
      var config = applicationManager.getConfigurationManager();
      var userPreferencesManager = applicationManager.getUserPreferencesManager();
      var tncman = applicationManager.getTermsAndConditionsManager();
      var locale=config.getLocale();
      var termsAndConditions=config.getTermsAndConditions();
      if(userPreferencesManager.isUserLoggedin()===true)
        {
          var parmns={
            "languageCode": termsAndConditions[locale],
            "termsAndConditionsCode": termsAndConditions["Hamburger"]
          };
      tncman.fetchTermsAndConditionsPostLogin(parmns,presentationSuccessCallback,presentationErrorCallback);
        }
      else
      {
        var parmns={
          "languageCode": termsAndConditions[locale],
          "termsAndConditionsCode": termsAndConditions["Footer"]
        };
        tncman.fetchTermsAndConditionsPreLogin(parmns,presentationSuccessCallback,presentationErrorCallback);
      }
      function presentationSuccessCallback(response){
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmSupportInfo",{"richTextData":"<font face='SourceSansPro-Regular'>"+response.termsAndConditionsContent,"header":headerValue});
        if(response.contentTypeId == "URL"){
            kony.application.openURL(response.termsAndConditionsContent);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
        else{
           navManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"InformationUIModule/frmSupportInfo"}); 
            //navManager.navigateTo("frmSupportInfo");
        }
      }
        function presentationErrorCallback(response){
          var error = applicationManager.getLoggerManager();
          error.log(response);
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          if(response["isServerUnreachable"])
          {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
          }
          else
          {
            var controller = applicationManager.getPresentationUtility().getController('frmTermsAndCondition', true);
            controller.bindGenericError(response.errorMessage);
          }
        }
    };
     Information_PresentationController.prototype.onClickAboutUs = function(headerValue){
      var termsBC = applicationManager.getInformationManager();
      termsBC.fetchAboutUs(presentationSuccessCallback,presentationErrorCallback);
      function presentationSuccessCallback(response){
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmSupportInfo",{"richTextData":"<font face='SourceSansPro-Regular'>"+response[0].infoContent,"header":headerValue});
       navManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"InformationUIModule/frmSupportInfo"}); 
        //navManager.navigateTo("frmSupportInfo");
      }
      function presentationErrorCallback(response){
        var error = applicationManager.getLoggerManager();
        error.log(response);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
         if(response["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
      }
    }
    Information_PresentationController.prototype.onClickFAQs = function(headerValue){
      var faqBC = applicationManager.getInformationManager();
      faqBC.fetchFAQs(presentationSuccessCallback,presentationErrorCallback);
     function presentationSuccessCallback(response){
     var navManager = applicationManager.getNavigationManager();
     var faqsData = response.categories;
     var arrayofFAQs = [];
            for (var i = 0; i < faqsData.length; i++) {
            var nestedfaqs =  [{"lblHeader":faqsData[i]["categoryName"]},faqsData[i]["faqs"]];
           arrayofFAQs.push(nestedfaqs);
            }
     navManager.setCustomInfo("frmSupportInfo",{"richTextData":arrayofFAQs,"header":headerValue});
     navManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"InformationUIModule/frmSupportInfo"});   
     //navManager.navigateTo("frmSupportInfo");
      }
      function presentationErrorCallback(response){
         var error = applicationManager.getLoggerManager();
         error.log(response);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
         if(response["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
      }
    }
	 Information_PresentationController.prototype.onClickCallUs = function(){
      var callBC = applicationManager.getInformationManager();
      callBC.fetchContactUs(presentationSuccessCallback,presentationErrorCallback);
      function presentationSuccessCallback(response){
     var phoneNumber = "";
        if(response.records.length===0){
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          var controller = applicationManager.getPresentationUtility().getController('frmSupport', true);
          applicationManager.getDataProcessorUtility().showToastMessageError(controller,"Your request cannot be processed right now, Please try again later.");
        }
        else{
      var records = response.records[0].Phone;
      for(var i=0; i<records.length; i++)
        {
          var number = records[i].value.replace(/[|&;$%@"<>()+,-]/g, "");
          if(!isNaN(number)){
            phoneNumber = number;
            break;
          }
        }
        
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          kony.phone.dial(phoneNumber);
      }
      }
      function presentationErrorCallback(response){
        var error = applicationManager.getLoggerManager();
        error.log(response);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
         if(response["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
      }
    };
   Information_PresentationController.prototype.acceptTermsAndCondition  =function()
  {
    var navigationMan=applicationManager.getNavigationManager();
    var formdata=navigationMan.getCustomInfo("frmTermsAndCondition");
    var flowtype=formdata.flowType;
    switch(flowtype)
    {
      case "Login":  var config = applicationManager.getConfigurationManager();
        //var locale=config.getLocale();
        //osama
        var locale="en_US";
        var termsAndConditions=config.getTermsAndConditions();
        var parmns={
          "languageCode": termsAndConditions[locale],
        };
        var tncman  =applicationManager.getTermsAndConditionsManager();
        tncman.createTermsAndConditionsLogin(parmns,scope_InformationPresenter.createTNCSuccessCallback,scope_InformationPresenter.createTNCErrorCallback);
        break;
      case "LockCard": 
         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" :"ManageCardsUIModule" , "appName":"CardsMA"});
        manageCardsModule.presentationController.LockCard();
		break;
      case "CancelCard": 
         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" :"ManageCardsUIModule" , "appName":"CardsMA"});
        manageCardsModule.presentationController.CancelCard();
    break;
      case "DisableEBanking":
        var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
        settingsModule.presentationController.disableEBankingAccess();
    break;
    }
  };
  Information_PresentationController.prototype.createTNCSuccessCallback=function()
  {
    var authMod = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "AuthenticationMA", moduleName: "AuthUIModule" });
    authMod.presentationController.navigationAfterLogin();
  };
  Information_PresentationController.prototype.createTNCErrorCallback=function(response)
  {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (response["isServerUnreachable"])
    {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
    }
    else
    {
      var controller = applicationManager.getPresentationUtility().getController('frmTermsAndCondition', true);
      controller.bindGenericError(response.errorMessage);
    }
  };
  Information_PresentationController.prototype.cancelOnClick=function()
  {
    var navigationMan=applicationManager.getNavigationManager();
    var formdata=navigationMan.getCustomInfo("frmTermsAndCondition");
    var flowtype=formdata.flowType;
    switch(flowtype)
    {        
      case "Login":    var authMod = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "AuthenticationMA", moduleName: "AuthUIModule" });
        authMod.presentationController.onLogout();
        break;
      case "LockCard":  var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" :"ManageCardsUIModule" , "appName":"CardsMA"});
        manageCardsModule.presentationController.cancelCommon();
        break;
     case "CancelCard":  var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" :"ManageCardsUIModule" , "appName":"CardsMA"});
        manageCardsModule.presentationController.cancelCommon();
        break;
     case "DisableEBanking": navigationMan.goBack();
        break;

    }
  };
    return Information_PresentationController;
});