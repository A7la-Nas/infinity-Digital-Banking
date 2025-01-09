define(['FormControllerUtility', 'ViewConstants', 'OLBConstants', 'CommonUtilities'], function(FormControllerUtility, ViewConstants, OLBConstants, CommonUtilities) {
    return {
        shouldUpdateUI: function(viewModel) {
            return viewModel !== undefined && viewModel !== null;
        },
        loadSurveyModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AboutUsMA","moduleName":"SurveyUIModule"});
        },
        /**
         * Function to make changes to UI
         * Parameters: surveyViewModel {Object}
         */
        updateFormUI: function(surveyViewModel) {
            if (surveyViewModel.showProgressBar) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (surveyViewModel.hideProgressBar) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (surveyViewModel.onServerDownError) {
                this.showServerDownForm(surveyViewModel.onServerDownError);
            }
            if (surveyViewModel.preLoginView) {
                this.showPreLoginView();
            }
            if (surveyViewModel.postLoginView) {
                this.showPostLoginView();
            }
            if (surveyViewModel.surveyQuestion) {
                this.setSurveyQuestionSegmentData(surveyViewModel.surveyQuestion.questions);
                var userObj = applicationManager.getUserPreferencesManager();
                var isLoggedin = userObj.isUserLoggedin();
                if (!isLoggedin) {
                    this.showPreLoginView();
                } else {
                    this.showPostLoginView();
                }
                this.view.forceLayout();
            }
            if (surveyViewModel.quetionsWithAnswers) {
                this.showSurveyAnswer(surveyViewModel.quetionsWithAnswers);
            }
            this.setFormScroll();
        },
        /**
         * Methoid to handle Server errors.
         * Will navigate to serverdown page.
         */
        showServerDownForm: function(onServerDownError) {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
            authModule.presentationController.navigateToServerDownScreen();
        },
        /**
         * Survey Pre-Login View UI
         */
        showPreLoginView: function() {
            this.view.flxHeaderPreLogin.setVisibility(true);
            this.view.flxHeaderPostLogin.setVisibility(false);
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.flxHeaderPreLogin.setVisibility(false);
                this.view.flxHeaderPostLogin.setVisibility(true);
            }
            this.view.imgKony.setFocus(true);
            this.view.customheader.topmenu.btnHamburger.isVisible = false;
            this.view.forceLayout();
            this.setFormScroll();
            this.setPreLoginValues();
        },
        /**
         * Survey Post-Login View UI
         */
        showPostLoginView: function() {
            this.view.flxHeaderPreLogin.setVisibility(false);
            this.view.flxHeaderPostLogin.setVisibility(true);
            this.view.customheader.imgKony.setFocus(true);
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Survey");
            this.view.customheader.customhamburger.activateMenu("About Us", "Feedback");
            this.view.customheader.topmenu.btnHamburger.isVisible = true;
        },
        //UI Code
        registerAction: function() {
            var scopeObj = this;
            this.view.btnLogin.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                authModule.presentationController.showLoginScreen();
            };
            this.view.flxPreLogout.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                authModule.presentationController.showLoginScreen();
            };
        },
        postShowCustomerFeedbackSurvey: function() {
            var userObj = applicationManager.getUserPreferencesManager();
            var isLoggedin = userObj.isUserLoggedin();
            applicationManager.getNavigationManager().applyUpdates(this);
            if (kony.os.deviceInfo().deviceWidth === 1152) {
                this.view.lblSurvey.left = "186dp";
                this.view.flxAcknowledgementThankyouMessage.width = "87.01%";
                this.view.flxAcknowledgementThankyouMessage.left = "101dp";
                this.view.flxFeedbackDetails.width = "87.01%";
                this.view.flxFeedbackDetails.left = "101dp";
            }
            if (!isLoggedin) {
                this.showPreLoginView();
            }
            else {
                this.showPostLoginView();
            }
            this.setFormScroll();
            // In 400% zoom, Added TextSpacing accessibility property
            var componentHeight = this.view.FeedbackSurvey.info.frame.height;
            if (componentHeight >= 1500 && kony.application.getCurrentBreakpoint() === 640) {
                this.view.flxFooter.top = (this.view.FeedbackSurvey.segSurveyQuestion1.data.length * 40) + "dp";
            }
        },
        preShowCustomerFeedbackSurvey: function() {
         	this.view.customheader.forceCloseHamburger();
            this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU_HOVER;
            this.view.customheader.topmenu.lblFeedback.skin = ViewConstants.SKINS.FEEDBACK_LABELFEEDBACK;
            this.registerAction();
            this.view.FeedbackSurvey.confirmButtons.btnConfirm.skin = ViewConstants.SKINS.BUTTON_ENABLED;
            this.view.FeedbackSurvey.confirmButtons.btnConfirm.hoverSkin = ViewConstants.SKINS.FOCUS;
            this.view.FeedbackSurvey.confirmButtons.btnConfirm.focusSkin = ViewConstants.SKINS.HOVER;
            this.view.FeedbackSurvey.confirmButtons.btnConfirm.onClick = this.btnSubmitAction;
            this.view.FeedbackSurvey.confirmButtons.btnModify.onClick = this.btnAckDoneAction;
            this.view.btnDone.onClick = this.btnAckDoneAction;
            var scopeObj = this;
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            this.view.forceLayout();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['customheader', 'flxMainContainer', 'flxFooter', 'flxHeaderPreLogin']);
            this.view.flxLogout.isVisible = false;
            this.view.customheader.btnSkip.onClick = this.skipNav;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.btnSkip.onClick = this.skipNav;
            this.setPreLoginValues();
            this.view.FeedbackSurvey.doLayout = function(widget) {
                widget.info.frame = widget.frame;
            }
            this.view.FeedbackSurvey.confirmButtons.btnModify.accessibilityConfig = {
                a11yLabel: "Cancel Survey"
            };
            this.view.FeedbackSurvey.confirmButtons.btnConfirm.accessibilityConfig = {
                a11yLabel: "Submit Survey"
            };
        },
        skipNav: function () {
//             if (this.view.flxFeedbackAcknowledgement.isVisible === true) {
//                 this.view.btnDone.setFocus(true);
//             }
          this.view.lblFSSurvey.setActive(true);
          this.view.lblSurvey.setActive(true);
        },
        onKeyPressCallBack: function (eventObject, eventPayload) {
            var scope = this;
            if (eventPayload.keyCode === 27) {
                if (scope.view.flxLogout.isVisible) {
                    scope.view.flxLogout.isVisible = false;
                    scope.view.customheader.headermenu.btnLogout.setFocus(true);
                }
                scope.view.customheader.onKeyPressCallBack(eventObject, eventPayload);
            }
        },
        setFormScroll: function () {
            if (kony.application.getCurrentBreakpoint() >= 1024) {
                if (this.view.flxHeaderPostLogin.isVisible === true) {
                    this.view.flxMainScroll.height = kony.os.deviceInfo().screenHeight - 120 + "dp";
                }
                if(this.view.flxHeaderPreLogin.isVisible === true) {
                    this.view.flxMainScroll.height = kony.os.deviceInfo().screenHeight - 120 + "dp";
                }
            }
            else if(kony.application.getCurrentBreakpoint() === 640){
                if (this.view.flxHeaderPostLogin.isVisible === true) {
                    this.view.flxMainScroll.height = kony.os.deviceInfo().screenHeight - 50 + "dp";
                }
                else if(this.view.flxHeaderPreLogin.isVisible === true) {
                    this.view.flxMainScroll.height = kony.os.deviceInfo().screenHeight - 51 + "dp";
                }
            }
        },
        setPreLoginValues: function(){
            if (this.view.flxHeaderPreLogin.isVisible === true) {
                if (kony.application.getCurrentBreakpoint() >= 1024) {
                    this.view.flxHeaderPreLogin.height = "70dp";
                }
                else {
                    this.view.flxHeaderPreLogin.height = "50dp";
                }
            }
        },
        onBreakpointChange: function(width) {
            this.view.customheader.customhamburger.width = "100%";
          this.view.customheader.onBreakpointChangeComponent(width);
          this.view.CustomFooterMain.onBreakpointChangeComponent(width);
          this.view.btnDone.skin="sknBtn0095e426pxEnabled";
          this.setFormScroll();
        },
        showRatingAction: function(val) {
            for (var i = 1; i <= val; i++) {
                this.view.FeedbackSurvey["imgRating" + i].src = ViewConstants.IMAGES.CIRCLE_BLUE_FILLED;
            }
            for (i = (val + 1); i <= 5; i++) {
                this.view.FeedbackSurvey["imgRating" + i].src = ViewConstants.IMAGES.CIRCLE_UNFILLED;
            }
            this.enableButton(this.view.FeedbackSurvey.confirmButtons.btnConfirm);
            this.view.flxMainContainer.parent.forceLayout();
        },
        btnAckDoneAction: function() {
            this.loadSurveyModule().presentationController.surveyDone();
        },
        btnSubmitAction: function() {
            var resAnswer = {};
            var disAnswers = {};
            var allQuest = kony.application.getCurrentForm().FeedbackSurvey.segSurveyQuestion1.data;
            var displayAnswer = [];
            for (var i = 0; i < allQuest.length; i++) {
                var quest = allQuest[i];
                if (quest.template === "flxRowSurvey") {
                    resAnswer[quest.questionid] = this.returnRating(quest);
                } else if (quest.template === "flxSurveyQuestion2") {
                    resAnswer[quest.questionid] = this.getSelectedCheckBoxValue(quest);
                } else if (quest.template === "flxSurveyQuestion3") {
                    resAnswer[quest.questionid] = quest.txtareaUserAdditionalComments.text;
                } else if (quest.template === "flxSurveyQuestion4") {
                    resAnswer[quest.questionid] = this.returnYesNoAnswer(quest);
                } else {
                    return false;
                }
            }
            this.loadSurveyModule().presentationController.showSurveyAnswer(resAnswer);
        },
        returnRating: function(quest) {
            var response = {};
            response["rating"] = quest.selectedRating;
            response["type"] = this.returnRatingType(quest.lblVeryHard);
            return response;
        },
        returnRatingType: function(label) {
            if (label === "Very Unlikely") {
                return "likelyUnlikely";
            } else if (label === "Very Hard") {
                return "hardEasy";
            } else if (label === "Very Bad") {
                return "goodBad";
            }
        },
        returnYesNoAnswer: function(quest) {
            if (quest.lblRadioBtn1.text === "M") {
                return quest.lblYes.text;
            } else if (quest.lblRadioBtn2.text === "M") {
                return quest.lblNo.text;
            } else {
                return "";
            }
        },
        showSurveyAnswer: function(data) {
            var orientationHandler = new OrientationHandler();
            this.view.flxFeedbackSurveyContainer.setVisibility(false);
            this.view.flxFeedbackAcknowledgement.setVisibility(true);
            var dataMap = {
                "flxRowFeedbackSurveyQuestion": "flxRowFeedbackSurveyQuestion",
                "flxSurveyQuestionWrapper": "flxSurveyQuestionWrapper",
                "flxQuestion1": "flxQuestion1",
                "lblQuestion1": "lblQuestion1",
                //"lblQuestionNo1": "lblQuestionNo1",
                "lblAnswer1": "lblAnswer1"
            };
            var numCounter = 1;
            var surveyData = data.map(function(dataItem) {
                return {
                  	"flxQuestion1": {
                        "top": "20dp"
                    },
                    //"lblQuestionNo1": numCounter++,
                     "lblQuestion1": {
			                        "text": numCounter++ + ". "+dataItem.question,
                        "left":"2.1%"
                     },
                    "lblAnswer1": {"text":dataItem.answerString,"left":"3.3%"},
                    "template": "flxRowFeedbackSurveyQuestion"
                }
            });
            this.view.segSurveyQuestion.widgetDataMap = dataMap;
            this.view.segSurveyQuestion.setData(surveyData);
            this.view.flxMainContainer.parent.forceLayout();
        },
        getSelectedCheckBoxValue: function(quest) {
            var selectedAns = [];
            for (var i = 1; quest["lblcheckbox" + i] != undefined; i++) {
                if (quest["lblcheckbox" + i] === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    selectedAns.push(i - 1)
                }
            }
            return selectedAns;
        },
        btnCancelAction: function() {
            if (this.view.FeedbackSurvey.flxRating1.src === ViewConstants.IMAGES.CIRCLE_BLUE_FILLED || this.view.FeedbackSurvey.flxRating2.src === ViewConstants.IMAGES.CIRCLE_BLUE_FILLED || this.view.FeedbackSurvey.flxRating3.src === ViewConstants.IMAGES.CIRCLE_BLUE_FILLED || this.view.FeedbackSurvey.flxRating4.src === ViewConstants.IMAGES.CIRCLE_BLUE_FILLED || this.view.FeedbackSurvey.flxRating5.src === ViewConstants.IMAGES.CIRCLE_BLUE_FILLED) {
                this.view.FeedbackSurvey.flxRating1.src = ViewConstants.IMAGES.CIRCLE_UNFILLED;
                this.view.FeedbackSurvey.flxRating2.src = ViewConstants.IMAGES.CIRCLE_UNFILLED;
                this.view.FeedbackSurvey.flxRating3.src = ViewConstants.IMAGES.CIRCLE_UNFILLED;
                this.view.FeedbackSurvey.flxRating4.src = ViewConstants.IMAGES.CIRCLE_UNFILLED;
                this.view.FeedbackSurvey.flxRating5.src = ViewConstants.IMAGES.CIRCLE_UNFILLED;
                this.view.flxMainContainer.parent.forceLayout();
            } else {
                applicationManager.getNavigationManager().navigateTo("frmLogin");
            }
        },
        toggleCheckBox: function(imgCheckBox) {
            if (imgCheckBox.src === ViewConstants.IMAGES.UNCHECKED_IMAGE) {
                imgCheckBox.src = ViewConstants.IMAGES.CHECKED_IMAGE;
            } else {
                imgCheckBox.src = ViewConstants.IMAGES.UNCHECKED_IMAGE;
            }
        },
        /**
         *  Disable button.
         */
        disableButton: function(button) {
            button.setEnabled(false);
            button.skin = ViewConstants.SKINS.BLOCKED;
            button.hoverSkin = ViewConstants.SKINS.BLOCKED;
            button.focusSkin = ViewConstants.SKINS.BLOCKED;
        },
        /**
         * Enable button.
         */
        enableButton: function(button) {
            button.setEnabled(true);
            button.skin = ViewConstants.SKINS.BUTTON_ENABLED;
            button.hoverSkin = ViewConstants.SKINS.FOCUS;
            button.focusSkin = ViewConstants.SKINS.HOVER;
        },
        setSurveyQuestionSegmentData: function(data) {
            var self = this;
            this.view.flxFeedbackSurveyContainer.setVisibility(true);
            this.view.lblFSSurvey.text=kony.i18n.getLocalizedString("i18n.CustomerFeedback.Survey");
            this.view.flxFeedbackAcknowledgement.setVisibility(false);
            var dataMap = {
                "flxRating1": "flxRating1",
                "flxRating2": "flxRating2",
                "flxRating3": "flxRating3",
                "flxRating4": "flxRating4",
                "flxRating5": "flxRating5",
                "flxRatingimg": "flxRatingimg",
                "flxRowSurvey": "flxRowSurvey",
                "flxSurveyQuestion1Wrapper": "flxSurveyQuestion1Wrapper",
                "flxaddress": "flxaddress",
                "imgRating1": "imgRating1",
                "imgRating2": "imgRating2",
                "imgRating3": "imgRating3",
                "imgRating4": "imgRating4",
                "imgRating5": "imgRating5",
                "lblRateYourExpeience": "lblRateYourExpeience",
                "lblVeryEasy": "lblVeryEasy",
                "lblVeryHard": "lblVeryHard",
                "flxNotificationsmsgs": "flxNotificationsmsgs",
                "flxSecurityQuestionSetting": "flxSecurityQuestionSetting",
                "flxSurveyQuestion2": "flxSurveyQuestion2",
                "flxSurveyQuestion2Wrapper": "flxSurveyQuestion2Wrapper",
                "flxTransfers": "flxTransfers",
                "flxbillpay": "flxbillpay",
                "flxcheckbox1": "flxcheckbox1",
                "flxcheckbox2": "flxcheckbox2",
                "flxcheckbox3": "flxcheckbox3",
                "flxcheckbox4": "flxcheckbox4",
                "lblcheckbox1": "lblcheckbox1",
                "lblcheckbox2": "lblcheckbox2",
                "lblcheckbox3": "lblcheckbox3",
                "lblcheckbox4": "lblcheckbox4",
                "lblAddYourComments": "lblAddYourComments",
                "lblBillpay": "lblBillpay",
                "lblSecurityQuestionSettings": "lblSecurityQuestionSettings",
                "lblTranfers": "lblTranfers",
                "lblnotificationsmsgs": "lblnotificationsmsgs",
                "flxSurveyQuestion3": "flxSurveyQuestion3",
                "flxSurveyQuestion3Wrapper": "flxSurveyQuestion3Wrapper",
                "flxUserFeedback": "flxUserFeedback",
                "lblQuestion": "lblQuestion",
                "txtareaUserAdditionalComments": "txtareaUserAdditionalComments",
                "flxSurveyQuestion4": "flxSurveyQuestion4",
                "flxSurveyQuestion4Wrapper": "flxSurveyQuestion4Wrapper",
                "lblYes": "lblYes",
                "lblNo": "lblNo",
                "lblRadioBtn1": "lblRadioBtn1",
                "lblRadioBtn2": "lblRadioBtn2",
                "flxNUORadioBtn1": "flxNUORadioBtn1",
                "flxNUORadioBtn2": "flxNUORadioBtn2",
                "flxRatingRadiobtn": "flxRatingRadiobtn"
            };
            var surveyData = [];
            if (data.length > 0) {
                surveyData = data.map(function(dataItem) {
                    var response = {};
                    if (dataItem.inputType === "rating") {
                        response = {
                            "flxRatingimg": {
                                "left": (kony.application.getCurrentBreakpoint() === 640 || kony.application.getCurrentBreakpoint() === 1024) ? "0px" : "-23px"
                            },
                            "flxSurveyQuestion1Wrapper": {},
                            "flxaddress": {},
                            "imgRating1": ViewConstants.IMAGES.CIRCLE_UNFILLED,
                            "imgRating2": ViewConstants.IMAGES.CIRCLE_UNFILLED,
                            "imgRating3": ViewConstants.IMAGES.CIRCLE_UNFILLED,
                            "imgRating4": ViewConstants.IMAGES.CIRCLE_UNFILLED,
                            "imgRating5": ViewConstants.IMAGES.CIRCLE_UNFILLED,
                            "lblRateYourExpeience": dataItem.question,
                            "lblVeryHard": dataItem.questionInput[0],
                            "lblVeryEasy": {
                                "text": dataItem.questionInput[1],
                                "left": (kony.application.getCurrentBreakpoint() === 640) ? "60%" : (kony.application.getCurrentBreakpoint() === 1366) ? "24.3%" : "60%",
                            },
                            "flxRating1":{
                                "left" : (kony.application.getCurrentBreakpoint() === 640) ? "0%" : "2.2%",
                                "accessibilityConfig":{
                                    "a11yLabel": dataItem.questionInput[0],
                                    "a11yARIA": {
                                        "role": "checkbox",
                                        "aria-checked": false
                                    }
                                }
                            },
                            "flxRating2":{
                                "left" : (kony.application.getCurrentBreakpoint() === 640) ? "8%" : "41px",
                                "accessibilityConfig":{
                                    "a11yLabel": dataItem.questionInput[0].slice(5),
                                    "a11yARIA": {
                                        "role": "checkbox",
                                        "aria-checked": false
                                    }
                                }
                            },
                            "flxRating3":{
                                "left" : (kony.application.getCurrentBreakpoint() === 640) ? "8%" : "41px",
                                "accessibilityConfig":{
                                    "a11yLabel": "Neutral",
                                    "a11yARIA": {
                                        "role": "checkbox",
                                        "aria-checked": false
                                    }
                                }
                            },
                            "flxRating4":{
                                "left" : (kony.application.getCurrentBreakpoint() === 640) ? "8%" : "41px",
                                "accessibilityConfig":{
                                    "a11yLabel": dataItem.questionInput[1].slice(5),
                                    "a11yARIA": {
                                        "role": "checkbox",
                                        "aria-checked": false
                                    }
                                }
                            },
                            "flxRating5":{
                                "left" : (kony.application.getCurrentBreakpoint() === 640) ? "8%" : "41px",
                                "accessibilityConfig":{
                                    "a11yLabel": dataItem.questionInput[1],
                                    "a11yARIA": {
                                        "role": "checkbox",
                                        "aria-checked": false
                                    }
                                }
                            },
                            "template": "flxRowSurvey"
                        }
                    } else if (dataItem.inputType === "mcq") {
                        response = {
                            "flxcheckbox1": {
                                "left": (kony.application.getCurrentBreakpoint() === 640) ? "7.05%" : "2.35%"
                            },
                            "flxcheckbox2": {
                                "left": (kony.application.getCurrentBreakpoint() === 640) ? "7.05%" : "2.35%"
                            },
                            "flxcheckbox3": {
                                "left": (kony.application.getCurrentBreakpoint() === 640) ? "7.05%" : "2.35%"
                            },
                            "flxcheckbox4": {
                                "left": (kony.application.getCurrentBreakpoint() === 640) ? "7.05%" : "2.35%"
                            },
                            "lblcheckbox1": OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                            "lblcheckbox2": OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                            "lblcheckbox3": OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                            "lblcheckbox4": OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                            "lblAddYourComments": dataItem.question,
                            "lblBillpay": {
                                "text": dataItem.questionInput[1],
                                "isVisible": true,
                            },
                            "lblSecurityQuestionSettings": {
                                "text": dataItem.questionInput[2],
                                "isVisible": true,
                            },
                            "lblTranfers": {
                                "text": dataItem.questionInput[0],
                                "isVisible": dataItem.questionInput[0] ? true : false,
                            },
                            "lblnotificationsmsgs": {
                                "text": dataItem.questionInput[3],
                                "isVisible": dataItem.questionInput[3] ? true : false,
                            },
                            "template": "flxSurveyQuestion2"
                        }
                    } else if (dataItem.inputType === "text") {
                        response = {
                            "flxSurveyQuestion3": "flxSurveyQuestion3",
                            "flxSurveyQuestion3Wrapper": "flxSurveyQuestion3Wrapper",
                            "flxUserFeedback": "flxUserFeedback",
                            "lblQuestion": dataItem.question,
                            "txtareaUserAdditionalComments": {
                                "width": (kony.application.getCurrentBreakpoint() === 640) ? "89%" : "96.5%",
                                "text" : ""
                            },
                            "template": "flxSurveyQuestion3"
                        }
                    } else if (dataItem.inputType === "yesNo") {
                        response = {
                            "flxSurveyQuestion4": "flxSurveyQuestion4",
                            "flxSurveyQuestion4Wrapper": "flxSurveyQuestion4Wrapper",
                            "lblRateYourExpeience": dataItem.question,
                            "lblYes": {
                                "text": dataItem.questionInput[0],
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "tabindex": -1,
                                        "aria-hidden": true
                                    }
                                }
                            },
                            "lblNo": {
                                "text": dataItem.questionInput[1],
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "tabindex": -1,
                                        "aria-hidden": true
                                    }
                                }
                            },
                            "lblRadioBtn1": {
                                "text": "L",
                                "skin": "sknC0C0C020pxNotFontIconsMOD",
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "tabindex": -1,
                                        "aria-hidden": true
                                    }
                                }
                            },
                            "lblRadioBtn2": {
                                "text": "L",
                                "skin": "sknC0C0C020pxNotFontIconsMOD",
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "tabindex": -1,
                                        "aria-hidden": true
                                    }
                                }
                            },
                            "flxRatingRadiobtn": {
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "tabindex": -1,
                                        "role": "radiogroup"
                                    }
                                }
                            },
                            "flxNUORadioBtn1": {
                                "onClick": self.toggleYesNo.bind(self, 1),
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "role": "radio",
                                        "aria-labelledby": "lblYes",
                                        "aria-checked": false
                                    }
                                }
                            },
                            "flxNUORadioBtn2": {
                                "onClick": self.toggleYesNo.bind(self, 2),
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "role": "radio",
                                        "aria-labelledby": "lblNo",
                                        "aria-checked": false
                                    }
                                }
                            },
                            "template": "flxSurveyQuestion4"
                        }
                    }
                    response.questionid = dataItem.questionid;
                    return response;
                });
            }
            this.view.FeedbackSurvey.segSurveyQuestion1.widgetDataMap = dataMap;
            this.view.FeedbackSurvey.segSurveyQuestion1.setData(surveyData);
            this.view.flxMainContainer.parent.forceLayout();
        },
        toggleYesNo: function(index) {
            var labelWidgetIndex = this.view.FeedbackSurvey.segSurveyQuestion1.selectedRowIndex[1];
            var segData = this.view.FeedbackSurvey.segSurveyQuestion1.data;
            var rowData = this.view.FeedbackSurvey.segSurveyQuestion1.selectedRowItems[0];
            let focusWidget = "";
          	rowData.lblRadioBtn1 = {
                "text": "L",
                "skin": "sknC0C0C020pxNotFontIconsMOD",
                "accessibilityConfig" : {
                    "a11yARIA": {
                        "tabindex": -1,
                        "aria-hidden": true
                    }
                }
            };
            rowData.lblRadioBtn2 = {
                "text": "L",
                "skin": "sknC0C0C020pxNotFontIconsMOD",
                "accessibilityConfig" : {
                    "a11yARIA": {
                        "tabindex": -1,
                        "aria-hidden": true
                    }
                }
            };
            rowData['lblRadioBtn' + index] = {
                "text": "M",
                "skin": "sknLblFontTypeIcon3343e820pxMOD",
                "accessibilityConfig" : {
                    "a11yARIA": {
                        "tabindex": -1,
                        "aria-hidden": true
                    }
                }
            };
            rowData.lblYes.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                }
            };
            rowData.lblNo.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                }
            };
            if (rowData.lblRadioBtn1.text === "M") {
              focusWidget= "flxNUORadioBtn1";
                rowData.flxNUORadioBtn1.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "radio",
                        "aria-labelledby": "lblYes",
                        "aria-checked": true
                    }
                }
                rowData.flxNUORadioBtn2.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "radio",
                        "aria-labelledby": "lblNo",
                        "aria-checked": false
                    }
                }
            } else {
              focusWidget= "flxNUORadioBtn2";
                rowData.flxNUORadioBtn1.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "radio",
                        "aria-labelledby": "lblYes",
                        "aria-checked": false
                    }
                }
                rowData.flxNUORadioBtn2.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "radio",
                        "aria-labelledby": "lblNo",
                        "aria-checked": true
                    }
                }
            }
            this.view.FeedbackSurvey.segSurveyQuestion1.setDataAt(rowData, labelWidgetIndex);
          	this.view.FeedbackSurvey.segSurveyQuestion1.rowTemplate="flxSurveyQuestion4";
			this.view.FeedbackSurvey.segSurveyQuestion1.setActive(0,-1, `flxSurveyQuestion4.flxSurveyQuestion4Wrapper.flxQuestion.flxRatingRadiobtn.${focusWidget}`);
        }
    }
});
