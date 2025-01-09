define([], function() {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function FeedBack_PresentationController() {
        scope_FeedbackPresenter = this;
        kony.mvc.Presentation.BasePresenter.call(this);
    }
    inheritsFrom(FeedBack_PresentationController, kony.mvc.Presentation.BasePresenter);
    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    FeedBack_PresentationController.prototype.initializePresentationController = function() {
    };
     FeedBack_PresentationController.prototype.showFeedBack = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navObj = applicationManager.getNavigationManager();
        navObj.navigateTo({"appName" :"AboutUsMA","friendlyName":"FeedbackUIModule/frmInAppFeedbackRating"});
      //navObj.navigateTo("frmInAppFeedbackRating");
            applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
  FeedBack_PresentationController.prototype.showFeedbackPopup = function(context){
    var valManager = applicationManager.getValidationUtilManager();
    if(valManager.isFeedBackScreenRequired(context)){
      KNYMetricsService.sendCustomMetrics("frmInAppFeedbackRating", {"Show Rating":"Users Asked To Provide Feedback"});
      var config = applicationManager.getConfigurationManager();
            var scope = this;
            var basicProperties =
            {
                "message": "Are you enjoying the app?",
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "alertTitle": "We Value Your Feedback",
                "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Yes"),
                "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                "alertIcon": "appicon.png",
                "alertHandler": function(response) {
                    if(response){
                       scope_FeedbackPresenter.StoreRatingPopup();
                        KNYMetricsService.sendCustomMetrics("frmInAppFeedbackRating", {"Store Rating":"Users Enjoying App"});
                    }else{
                      scope_FeedbackPresenter.showFeedBack();
                      KNYMetricsService.sendCustomMetrics("frmInAppFeedbackRating", {"Dismiss Rating":"Users Not Enjoying App"});
                    }
                }
            };
        applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
    }
    };
   FeedBack_PresentationController.prototype.StoreRatingPopup = function(){
     if(kony.os.deviceInfo().name !== "iPhone"){
      var config = applicationManager.getConfigurationManager();
            var scope = this;
            var basicProperties =
            {
                "message": "Are you enjoying the app?",
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "alertTitle": "We Value Your Feedback",
                "yesLabel": "RATE NOW",
                "noLabel": "REMIND ME LATER",
                "alertIcon": "appicon.png",
                "alertHandler": function(response) {
                    if(response){
                       KNYMetricsService.sendCustomMetrics("frmInAppFeedbackRating", {"Store Rating":"Users Rating Now"});
                       kony.application.requestReview();
                    }else{
                      KNYMetricsService.sendCustomMetrics("frmInAppFeedbackRating", {"Dismiss Rating":"Users Rating Later"});
                      kony.print("Dismiss");
                    }
                }
            };
        applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
    }
    else{
       kony.application.requestReview();
    }
   };
     /**
* used to set the alert preferences of particular alert.
* @param {object} params - contains the categoryID, subscription value, channelPreferences and typePreferences.
* @param {Boolean} isMasterSwitchEnable - check if master switch is enabled.
* @param {function} setAlertPreferencesPresentationSuccessCallback will be called when call is successful
* @param {function} setAlertPreferencesPresentationErrorCallback will be called when call is not successful
*/
  FeedBack_PresentationController.prototype.setUserFeedback = function(params){
        var feedbackManager = applicationManager.getFeedbackManager();
        feedbackManager.createUserFeedback(params, scope_FeedbackPresenter.setUserFeedbackPresentationSuccessCallback, scope_FeedbackPresenter.setUserFeedbackPresentationErrorCallback);
  	};
  FeedBack_PresentationController.prototype.setUserFeedbackPresentationSuccessCallback = function(resSuccess){
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"FeedbackUIModule/frmFeedBackSuccess"});
         // navManager.navigateTo("frmFeedBackSuccess");
  };
  FeedBack_PresentationController.prototype.setUserFeedbackPresentationErrorCallback = function(reserr){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
         if (reserr["isServerUnreachable"]) {
              applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", reserr);
        } else{
           applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
  };
    return FeedBack_PresentationController;
});