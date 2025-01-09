define([], function() {
  function Information_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
  }
  inheritsFrom(Information_PresentationController, kony.mvc.Presentation.BasePresenter);
  Information_PresentationController.prototype.initializePresentationController = function() {
  };
  Information_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo(formName);
  };
  Information_PresentationController.prototype.onClickPrivacyPolicy = function(headerValue) {
    var privacyBC = applicationManager.getInformationManager();
    privacyBC.fetchPrivacyPolicy(presentationSuccessCallback, presentationErrorCallback);
    function presentationSuccessCallback(response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmSupportInfo", {"richTextData": response.records[0].Description, "header": headerValue});
      navManager.navigateTo("frmSupportInfo");
    }
    function presentationErrorCallback(response) {
      var error = applicationManager.getLoggerManager();
      error.log(response);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(response["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
    }
  };
  Information_PresentationController.prototype.onClickTermsAndConditions = function(headerValue) {
    var termsBC = applicationManager.getInformationManager();
    termsBC.fetchTermsAndConditions(presentationSuccessCallback, presentationErrorCallback);
    function presentationSuccessCallback(response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmSupportInfo", {"richTextData": response.records[0].Description, "header": headerValue});
      navManager.navigateTo("frmSupportInfo");
    }
    function presentationErrorCallback(response) {
      var error = applicationManager.getLoggerManager();
      error.log(response);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(response["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
    }
  };
  Information_PresentationController.prototype.onClickAboutUs = function(headerValue) {
    var termsBC = applicationManager.getInformationManager();
    termsBC.fetchAboutUs(presentationSuccessCallback, presentationErrorCallback);
    function presentationSuccessCallback(response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmSupportInfo", {"richTextData":response[0].infoContent, "header":headerValue});
      navManager.navigateTo("frmSupportInfo");
    }
    function presentationErrorCallback(response) {
      var error = applicationManager.getLoggerManager();
      error.log(response);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(response["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
    }
  };
  Information_PresentationController.prototype.onClickFAQs = function(headerValue) {
    var faqBC = applicationManager.getInformationManager();
    faqBC.fetchFAQs(presentationSuccessCallback, presentationErrorCallback);
    function presentationSuccessCallback(response) {
      var navManager = applicationManager.getNavigationManager();
     var faqsData = response.categories;
     var arrayofFAQs = [];
            for (var i = 0; i < faqsData.length; i++) {
            var nestedfaqs =  [{"lblHeader":faqsData[i]["categoryName"]},faqsData[i]["faqs"]];
           arrayofFAQs.push(nestedfaqs);
            }
      navManager.setCustomInfo("frmSupportInfo", {"richTextData": arrayofFAQs, "header": headerValue});
      navManager.navigateTo("frmSupportInfo");
    }
    function presentationErrorCallback(response) {
      var error = applicationManager.getLoggerManager();
      error.log(response);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(response["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
    }
  };
  Information_PresentationController.prototype.onClickCallUs = function() {
    var callBC = applicationManager.getInformationManager();
    callBC.fetchContactUs(presentationSuccessCallback, presentationErrorCallback);
    function presentationSuccessCallback(response) {
      var phoneNumber = "";
      var records = response.records[0].Phone;
      for(var i=0; i < records.length; i++)
      {
        var num = records[i].value.replace(/[|&;$%@"<>()+,-]/g, "");
        if(!isNaN(num)) {
          phoneNumber = num;
          break;
        }
      }
      var controller = applicationManager.getPresentationUtility().getController('frmSupport', true);
      controller.showDial(phoneNumber);
    }
    function presentationErrorCallback(response) {
      var error = applicationManager.getLoggerManager();
      error.log(response);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(response["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
    }
  };
  return Information_PresentationController;
});