define(['CommonUtilities'], function(CommonUtilities) {
    function Feedback_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }
    inheritsFrom(Feedback_PresentationController, kony.mvc.Presentation.BasePresenter);
    Feedback_PresentationController.prototype.initializePresentationController = function() {};
    /**
     * Navigate to Survey
     * @member Feedback_PresentationController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    Feedback_PresentationController.prototype.showSurveyForm = function() {
        var self = this;
        var surveyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SurveyUIModule");
        surveyModule.presentationController.showSurvey();
    };
    /**
     * Navigate to AccountsLanding or Login page
     * @member Feedback_PresentationController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    Feedback_PresentationController.prototype.cancelAction = function() {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        if (userPrefManager.isLoggedIn !== true) {
          //  var navManager = applicationManager.getNavigationManager();
          //  navManager.navigateTo("frmLogin");
          applicationManager.doLogOut();
        } else {
            var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
            accountModule.presentationController.showAccountsDashboard();
        }
    };
    /**
     * Calls present user interface for frmCustomerFeedback form with data
     * @member Feedback_PresentationController
     * @param {JSON} data
     * @returns {void} - None
     * @throws {void} - None
     */
    Feedback_PresentationController.prototype.presentFeedback = function(data) {
        var navManager = applicationManager.getNavigationManager();
        if (kony.application.getCurrentForm().id !== "frmCustomerFeedback") {
           navManager.navigateTo({"appName" :"AboutUsMA","friendlyName" : "FeedbackUIModule/frmCustomerFeedback"});
            navManager.navigateTo("frmCustomerFeedback");
        }
        navManager.updateForm(data);
        //this.presentUserInterface('frmCustomerFeedback', data);
    };
    /**
     * Show feedback based on login status
     * @member Feedback_PresentationController
     * @param {JSON} data
     * @returns {void} - None
     * @throws {void} - None
     */
    Feedback_PresentationController.prototype.showFeedback = function(sender) {
        var self = this;
        var userPrefManager = applicationManager.getUserPreferencesManager();
        if (userPrefManager.isLoggedIn !== true) {
            this.presentFeedback({
                "preLoginView": "preLoginView"
            });
        } else {
            this.presentFeedback({
                "postLoginView": "postLoginView"
            });
        }
    };
    Feedback_PresentationController.prototype.showView = function(frm, data) {
        var navManager = applicationManager.getNavigationManager();
        if (kony.application.getCurrentForm().id !== frm) {
            navManager.navigateTo(frm);
        }
        navManager.updateForm(data);
        //this.presentUserInterface(frm, data);
    };
    /**
     * Show Progress Bar
     * @member Feedback_PresentationController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    Feedback_PresentationController.prototype.showProgressBar = function() {
        var self = this;
        self.presentFeedback({
            "showProgressBar": "showProgressBar"
        });
    };
    /**
     * Hide Progress Bar
     * @member Feedback_PresentationController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    Feedback_PresentationController.prototype.hideProgressBar = function(data) {
        var self = this;
        self.presentFeedback({
            "hideProgressBar": "hideProgressBar"
        });
    };
    /**
     * Create Feedback
     * @member Feedback_PresentationController
     * @param {JSON} feedbackParams
     * @returns {void} - None
     * @throws {void} - None
     */
    Feedback_PresentationController.prototype.createFeedback = function(feedbackParams) {
        applicationManager.getFeedbackManager().createUserFeedback(feedbackParams, this.onSuccessCreateUserFeedback.bind(this), this.onFailureCreateUserFeedback.bind(this));
    };
    /**
     * Method for success callback of CreateUserFeedback
     * @param {Object} response response for whether cards fetched successfully and user can navigate to passwords restting page.
     */
    Feedback_PresentationController.prototype.onSuccessCreateUserFeedback = function(response) {
        this.hideProgressBar();
        this.presentFeedback({
            "submitFeedbackSuccess": "submitFeedbackSuccess"
        });
    };
    /**
     * Method for failure callback of CreateUserFeedback
     * @param {Object} response response for whether cards fetched successfully and user can navigate to passwords restting page.
     */
    Feedback_PresentationController.prototype.onFailureCreateUserFeedback = function(response) {
        this.hideProgressBar();
        this.presentFeedback({
            "showServerError": response.errorMessage
        });
    };
    return Feedback_PresentationController;
});