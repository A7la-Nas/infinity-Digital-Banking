define([], function() {
    function Survey_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }
    inheritsFrom(Survey_PresentationController, kony.mvc.Presentation.BasePresenter);
    Survey_PresentationController.prototype.initializePresentationController = function() {};
    /**
     * presentSurvey : Method to present data to form
     * @member of {Survey_PresentationController}
     * @param {Json object} data- viewmodel to present
     * @return {}
     * @throws {}
     */
    Survey_PresentationController.prototype.presentSurvey = function(data) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo('frmCustomerFeedbackSurvey');
        navManager.updateForm(data);
        //this.presentUserInterface('frmCustomerFeedbackSurvey', data);
    };
    /**
     * getDisplayRatingString : Method to get display rating string
     * @member of {Survey_PresentationController}
     * @param {Object} ratingObj- stores rating value and rating type
     * @return {String} rating string value
     * @throws {}
     */
    var getDisplayRatingString = function(ratingObj) {
        var ratingValue = ratingObj.rating;
        var ratingType = ratingObj.type;
        if (ratingType === "hardEasy") {
            switch (ratingValue) {
                case 1:
                    return "Very Hard";
                case 2:
                    return "Hard";
                case 3:
                    return "Normal";
                case 4:
                    return "Easy"
                case 5:
                    return "Very Easy"
            }
        } else if (ratingType === "goodBad") {
            switch (ratingValue) {
                case 1:
                    return "Very Bad";
                case 2:
                    return "Bad";
                case 3:
                    return "Fair";
                case 4:
                    return "Good"
                case 5:
                    return "Very Good"
            }
        } else if (ratingType === "likelyUnlikely") {
            switch (ratingValue) {
                case 1:
                    return "Very Unlikely";
                case 2:
                    return "Unlikely";
                case 3:
                    return "Niether Likely or Unlikely";
                case 4:
                    return "Likely"
                case 5:
                    return "Very Likely"
            }
        }
    }
    /**
     * getSelectedCheckBoxValue : Method to get selected checkbox values
     * @member of {Survey_PresentationController}
     * @param {Array, Array} sourceArray- all checkbox, filterArray- selected array value
     * @return {String} reslutArray
     * @throws {}
     */
    var getSelectedCheckBoxValue = function(sourceArray, filterArray) {
        var resArray = sourceArray.filter(function(val, index) {
            for (var i = 0; i < filterArray.length; i++) {
                if (filterArray[i] === index) {
                    return val;
                }
            }
        });
        return resArray.toString();
    }
    var surveyModel = {
        questions: null,
        updateQuestions: function(questions) {
            this.questions = questions;
        },
        updateAnswers: function(answers) {
            this.answers = answers;
        },
        getQuetionsWithAnswers: function() {
            var result = this.questions.map(function(question) {
                var answerString;
                if (question.inputType === "rating") {
                    answerString = getDisplayRatingString(surveyModel.answers[question.questionid]);
                } else if (question.inputType === "mcq") {
                    answerString = getSelectedCheckBoxValue(question.questionInput, surveyModel.answers[question.questionid])
                } else if (question.inputType === "text") {
                    answerString = surveyModel.answers[question.questionid];
                } else if (question.inputType === "yesNo") {
                    answerString = surveyModel.answers[question.questionid];
                }
                if (answerString === null || answerString === undefined || answerString.trim() === "") {
                    answerString = kony.i18n.getLocalizedString("i18n.Survey.NotAnswered");
                }
                question.answerString = answerString;
                return question;
            });
            return result;
        }
    };
    /**
     * showSurvey : Method to handle load survey init
     * @member of {Survey_PresentationController}
     * @param {}
     * @return {}
     * @throws {}
     */
    Survey_PresentationController.prototype.showSurvey = function() {
        var self = this;
        var userPrefManager = applicationManager.getUserPreferencesManager();
        if (userPrefManager.isLoggedIn !== true) {
            this.presentSurvey({
                "preLoginView": "preLoginView"
            });
        } else {
            this.presentSurvey({
                "postLoginView": "postLoginView"
            });
        }
        //TO DO fetch Questions
        this.getSurveyQuestions();
    };
    /**
     * showView : Method to handle present data to the form
     * @member of {Survey_PresentationController}
     * @param {String, Object} frm- form name, data- data to send form
     * @return {}
     * @throws {}
     */
    Survey_PresentationController.prototype.showView = function(frm, data) {
        this.presentUserInterface(frm, data);
    };
    /**
     * showProgressBar : Method to handle show progress bar
     * @member of {Survey_PresentationController}
     * @param {}
     * @return {}
     * @throws {}
     */
    Survey_PresentationController.prototype.showProgressBar = function() {
        var self = this;
        self.presentSurvey({
            "showProgressBar": "showProgressBar"
        });
    };
    /**
     * hideProgressBar : Method to handle hide progress bar
     * @member of {Survey_PresentationController}
     * @param {}
     * @return {}
     * @throws {}
     */
    Survey_PresentationController.prototype.hideProgressBar = function() {
        var self = this;
        self.presentSurvey({
            "hideProgressBar": "hideProgressBar"
        });
    };
    /**
     * getSurveyQuestions : Method to get survey questions from service and invoke UI
     * @member of {Survey_PresentationController}
     * @param {}
     * @return {}
     * @throws {}
     */
    Survey_PresentationController.prototype.getSurveyQuestions = function() {
        applicationManager.getFeedbackManager().getSurveyQuestions(this.onSuccessGetSurveyQuestions.bind(this), this.onFailureGetSurveyQuestions.bind(this));
    };
    /**
     * Method for success callback of GetSurveyQuestions
     * @param {Object} response response for whether cards fetched successfully and user can navigate to passwords restting page.
     */
    Survey_PresentationController.prototype.onSuccessGetSurveyQuestions = function(response) {
        surveyModel.updateQuestions(response.questions);
        this.hideProgressBar();
        this.presentSurvey({
            "surveyQuestion": response
        }); //TO Do if no survey question
    };
    /**
     * Method for failure callback of GetSurveyQuestions
     * @param {Object} response response for whether cards fetched successfully and user can navigate to passwords restting page.
     */
    Survey_PresentationController.prototype.onFailureGetSurveyQuestions = function(response) {
        this.hideProgressBar();
        //this.presentSurvey({ "" : "" }); To DO - Confirm UI
    };
    /**
     * showSurveyAnswer : Method to create view model with answers and update the form
     * @member of {Survey_PresentationController}
     * @param {Json object} answers- selected answers
     * @return {}
     * @throws {}
     */
    Survey_PresentationController.prototype.showSurveyAnswer = function(answers) {
        surveyModel.updateAnswers(answers);
        this.presentSurvey({
            "quetionsWithAnswers": surveyModel.getQuetionsWithAnswers()
        });
    }
    /**
     * surveyDone : Method to navigate to other module once the survey done.
     * @member of {Survey_PresentationController}
     * @param {}
     * @return {}
     * @throws {}
     */
    Survey_PresentationController.prototype.surveyDone = function() {
        var self = this;
        var userPrefManager = applicationManager.getUserPreferencesManager();
        if (userPrefManager.isLoggedIn !== true) {
            //var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AuthenticationMA","moduleName":"AuthUIModule"});
            //authModule.presentationController.showLoginScreen();
          applicationManager.doLogOut();
        } else {
            var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
            accountModule.presentationController.showAccountsDashboard();
        }
    };
    return Survey_PresentationController;
});