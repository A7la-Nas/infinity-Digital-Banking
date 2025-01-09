    define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'CampaignUtility'], function(FormControllerUtility, CommonUtilities, ViewConstants, CampaignUtility) {
      return {
        loginView : "",
        /**
             * Method to load Feedback Module
             */
        loadFeedbackModule: function() { //TODO: will be replaced with Commom Utitlty method if any.
          return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AboutUsMA","moduleName":"FeedbackUIModule"});
        },
        shouldUpdateUI: function(viewModel) {
          return viewModel !== undefined && viewModel !== null;
        },
        updateFormUI: function(feedbackViewModel) {
          if (feedbackViewModel.showProgressBar) {
            FormControllerUtility.showProgressBar(this.view);
          } else if (feedbackViewModel.hideProgressBar) {
            FormControllerUtility.hideProgressBar(this.view);
          }
          if (feedbackViewModel.onServerDownError) {
            this.showServerDownForm(feedbackViewModel.onServerDownError);
          }
          if (feedbackViewModel.submitFeedbackSuccess) {
            this.submitFeedbackSuccessFlow();
          }
          if (feedbackViewModel.showServerError) {
            this.showServerError(feedbackViewModel.showServerError);
          }
          if (feedbackViewModel.campaign) {
            CampaignUtility.showCampaign(feedbackViewModel.campaign, this.view, "flxMainContainer");
          }
          this.AdjustScreen();
        },
        /**
             * Method to handle Server errors. Will navigate to serverdown page.
             * @member frmCustomerFeedbackController
             * @param {object} onServerDownError
             * @returns {void} - None
             * @throws {void} - None
             */
        showServerDownForm: function(onServerDownError) {
          var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
          authModule.presentationController.navigateToServerDownScreen();
        },
        showServerError: function(errMessage) {
          this.view.flxDowntimeWarning.isVisible = true;
          this.view.lblDowntimeWarning.text = errMessage;
          this.AdjustScreen();
          this.view.imgCloseDowntimeWarning.setFocus();
        },
        /**
             * Show Feedback Pre-Login View UI
             * @member frmCustomerFeedbackController
             * @param {void} - None
             * @returns {void} - None
             * @throws {void} - None
             */
        showPreLoginView: function() {
          this.view.flxHeaderPreLogin.setVisibility(true);
          this.view.flxHeaderPostLogin.setVisibility(false);
          this.view.flxFormContent.top = "70dp";
          if (kony.application.getCurrentBreakpoint() === 640) {
            this.view.flxHeaderPreLogin.setVisibility(false);
            this.view.flxHeaderPostLogin.setVisibility(true);
          }
          if (kony.application.getCurrentBreakpoint() >= 1366) {
            this.view.flxFooter.top="530px";
          }
          this.view.btnSkipContent.onClick = this.skipNav;
          this.view.customheader.topmenu.btnHamburger.isVisible = false;
          this.view.flxSignin.onClick = function() {
            applicationManager.getNavigationManager().navigateTo({
              "appName": "AuthenticationMA",
              "friendlyName": "frmLogin"
          });
          };
          this.view.forceLayout();
        },
        /**
             * Show Feedback Post-Login View UI
             * @member frmCustomerFeedbackController
             * @param {void} - None
             * @returns {void} - None
             * @throws {void} - None
             */
        showPostLoginView: function() {
          if (kony.application.getCurrentBreakpoint() === 640) {
            this.view.flxFormContent.top = "50dp";
          } else {
            this.view.flxFormContent.top = "120dp";
          }
          if (kony.application.getCurrentBreakpoint() ===1366) {
            this.view.CustomFooterMain.flxFooterMenu.left="6.5%";
            this.view.CustomFooterMain.lblCopyright.left="6.5%";
          }
          applicationManager.getLoggerManager().setCustomMetrics(this, false, "Feedback");
          this.view.flxHeaderPreLogin.setVisibility(false);
          this.view.flxHeaderPostLogin.setVisibility(true);
          this.view.customheader.imgKony.setFocus(true);
          this.view.customheader.customhamburger.activateMenu("About Us", "Feedback");
          this.view.customheader.topmenu.btnHamburger.isVisible = true;
        },
        /**
             * Post show for customer feedback
             * @member frmCustomerFeedbackController
             * @param {void} - None
             * @returns {void} - None
             * @throws {void} - None
             */
        postShowCustomerFeedback: function() {

          applicationManager.getNavigationManager().applyUpdates(this);
          this.view.flxDowntimeWarning.isVisible = false;
          if(kony.application.getCurrentBreakpoint() === 1024){
            this.view.Feedback.txtareaUserComments.width = "96%";
            this.view.Feedback.lblPlusIcon.skin = "ICsknOlbFonts0273e317px" ;
          }
          var isLoggedin = applicationManager.getUserPreferencesManager().isUserLoggedin();
          if (!isLoggedin) {
            this.showPreLoginView();
          }
          else {
            this.showPostLoginView();
          }      
          this.AdjustScreen();
          this.disableButton(this.view.Feedback.confirmButtons.btnConfirm);
          if (this.loginView === "preLoginView"){
            this.view.flxHeaderPostLogin.isVisible = true;
          }
          this.view.customheader.customhamburger.collapseAll();
          this.view.Feedback.txtareaUserComments.accessibilityConfig={
            "a11yLabel": "Add Your Comments",
            "a11yARIA":{
              "tabindex":0,
              "aria-labelledby":"lblAddYourComments"
            }
          }
          this.view.Feedback.txtareaUserAdditionalComments.accessibilityConfig={
            "a11yLabel": "What feature would you like to see added to our business banking suite?",
            "a11yARIA":{
              "tabindex":0,
              "aria-labelledby":"lblQuestion"
            }
          }
          this.view.CustomerFeedbackDetails.flxScrollContainerCustomerFeedback.accessibilityConfig={
            "a11yARIA":{
              "tabindex":-1
            }
          }
          this.view.flxSpace.accessibilityConfig={
            "a11yHidden":true,
            "a11yARIA":{
              "tabindex":-1
            }
          }
          this.view.Feedback.lblCharCountComments.accessibilityConfig={
            "a11yLabel" : "Used 0 of 1000 characters",
            "a11yARIA":{
              "tabindex":-1
            }
          }
          this.view.Feedback.lblCharCountFeedback.accessibilityConfig={
            "a11yLabel" : "Used 0 of 1000 characters",
            "a11yARIA":{
              "tabindex":-1
            }
          }
          this.view.Feedback.confirmButtons.btnModify.accessibilityConfig = {
            "a11yLabel" : "Cancel feedback process"
          }
          this.view.Feedback.confirmButtons.btnConfirm.accessibilityConfig = {
            "a11yLabel" : "Submit feedback"
          }

        },
        /**
             * Funtion to adjust screen
             * @member frmCustomerFeedbackController
             * @param {void} - None
             * @returns {void} - None
             * @throws {void} - None
             */
        AdjustScreen: function() {
          var mainheight = 0;
          var screenheight = kony.os.deviceInfo().screenHeight;
          mainheight = this.view.customheader.frame.height + this.view.flxMainContainer.frame.height;
          if (this.view.customheader.frame.height == 0) {
            mainheight += 13;
          }
          if (this.view.flxDowntimeWarning.isVisible) {
            mainheight += 60;
          }
          var diff = screenheight - mainheight;
          if (mainheight < screenheight) {
            diff = diff - this.view.flxFooter.frame.height;
            if (diff > 0){ 
              if (kony.application.getCurrentBreakpoint() === 640) {
                // if(this.view.flxFeedback.isVisible && this.view.Feedback.flxUserFeedback.isVisible){
                  this.view.flxFooter.top = "0dp";
                // }else if(this.view.Feedback.flxUserFeedback.isVisible === false && this.view.flxFeedback.isVisible=== true){
                //   this.view.flxFooter.top = mainheight + diff+620+ "dp";
                // }
                // else
                //   this.view.flxFooter.top = mainheight + diff + 300 + "dp";
              }
              else {
                if(this.view.Feedback.flxUserFeedback.isVisible){
                  this.view.flxFooter.top = mainheight + diff+200 + "dp";
                  if (this.loginView === "preLoginView"&& kony.application.getCurrentBreakpoint() >= 1366) {
                    this.view.flxFooter.top = "530dp";
                  } else if (kony.application.getCurrentBreakpoint() === 1024) {
                    this.view.flxFooter.top = "60dp";
                    this.view.CustomFooterMain.top = "0dp";
                  }
                }else{
                  this.view.flxFooter.top = mainheight + diff + 200 + "dp";
                  if (this.loginView === "preLoginView"&& kony.application.getCurrentBreakpoint() >= 1366) {
                    this.view.flxFooter.top = "530dp";
                  } else if (kony.application.getCurrentBreakpoint() === 1024) {
                    this.view.flxFooter.top = "60dp";
                    this.view.CustomFooterMain.top = "0dp";
                  }
                }
              }
            }
            else {
              this.view.flxFooter.top = mainheight + 600 + "dp";
              if (this.loginView === "preLoginView" && kony.application.getCurrentBreakpoint() >= 1366) {
                this.view.flxFooter.top = "530dp";
              } else if (kony.application.getCurrentBreakpoint() === 1024) {
                this.view.flxFooter.top = "60dp";
                this.view.CustomFooterMain.top = "0dp";
              }
            }
          } else {
            this.view.flxFooter.top = mainheight + "dp";
            if (this.loginView === "preLoginView"&& kony.application.getCurrentBreakpoint() >= 1366) {
              this.view.flxFooter.top = "530dp";
            } else if (kony.application.getCurrentBreakpoint() === 1024) {
              this.view.flxFooter.top = "60dp";
              this.view.CustomFooterMain.top = "0dp";
            }
          }
          this.view.forceLayout();
        },
        /**
             * Pre show of Customer Feedback
             * @member frmCustomerFeedbackController
             * @param {void} - None
             * @returns {void} - None
             * @throws {void} - None
             */
        preShowCustomerFeedback: function() {
          var scopeObj = this;
          this.feedbackRating = 0;
          var feedback = this.view.Feedback;
          this.view.customheader.forceCloseHamburger();
          this.view.flxLogout.isVisible = false;
          this.view.onBreakpointChange = function() {
            scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
          };
          this.view.flxFeedbackAcknowledgement.setVisibility(false);
          this.view.flxAcknowledgementContainer.setVisibility(false);
          this.view.flxFeedbackContainer.setVisibility(true);
          this.view.flxFeedback.setVisibility(true);
          this.view.Feedback.imgRating1.skin = "sknLblFontTypeIcon72727230px";
          this.view.Feedback.imgRating1.text = "k";
          this.view.Feedback.flxRating1.accessibilityConfig = {
            "a11yLabel": "1 Star",
            "a11yARIA" : {
              "role" : "checkbox",
              "aria-checked" : false,
              "aria-required": true
            }
          }
          this.view.Feedback.imgRating2.skin = "sknLblFontTypeIcon72727230px";
          this.view.Feedback.imgRating2.text = "k";
          this.view.Feedback.flxRating2.accessibilityConfig = {
            "a11yLabel": "2 Stars",
            "a11yARIA" : {
              "role" : "checkbox",
              "aria-checked" : false,
              "aria-required": true
            }
          }
          this.view.Feedback.imgRating3.skin = "sknLblFontTypeIcon72727230px";
          this.view.Feedback.imgRating3.text = "k";
          this.view.Feedback.flxRating3.accessibilityConfig = {
            "a11yLabel": "3 Stars",
            "a11yARIA" : {
              "role" : "checkbox",
              "aria-checked" : false,
              "aria-required": true
            }
          }
          this.view.Feedback.imgRating4.skin = "sknLblFontTypeIcon72727230px";
          this.view.Feedback.imgRating4.text = "k";
          this.view.Feedback.flxRating4.accessibilityConfig = {
            "a11yLabel": "4 Stars",
            "a11yARIA" : {
              "role" : "checkbox",
              "aria-checked" : false,
              "aria-required": true
            }
          }
          this.view.Feedback.imgRating5.skin = "sknLblFontTypeIcon72727230px";
          this.view.Feedback.imgRating5.text = "k";
          this.view.Feedback.flxRating5.accessibilityConfig = {
            "a11yLabel": "5 Stars",
            "a11yARIA" : {
              "role" : "checkbox",
              "aria-checked" : false,
              "aria-required": true
            }
          }
          var isLoggedin = applicationManager.getUserPreferencesManager().isUserLoggedin();
          if (!isLoggedin) {
            this.showPreLoginView();
          }
          else {
            //this.showPostLoginView();
          }      
          this.AdjustScreen();
          this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU_HOVER;
          this.view.customheader.topmenu.lblFeedback.skin = ViewConstants.SKINS.FEEDBACK_LABELFEEDBACK;
          feedback.flxAddFeatureRequest.setVisibility(true);
          feedback.flxUserFeedback.setVisibility(false);
          this.view.Feedback.txtareaUserComments.placeholder=kony.i18n.getLocalizedString("i18n.transfers.optional");
          feedback.txtareaUserComments.onKeyUp = this.updateCharCountComments.bind(this);
          this.view.Feedback.txtareaUserAdditionalComments.placeholder=kony.i18n.getLocalizedString("i18n.transfers.optional");
          feedback.txtareaUserAdditionalComments.onKeyUp = this.updateCharCountFeedback.bind(this);
          feedback.txtareaUserComments.text = "";
          feedback.txtareaUserAdditionalComments.text = "";
          feedback.txtareaUserComments.onKeyUp();
          feedback.txtareaUserAdditionalComments.onKeyUp();
          this.view.CopylblSurvey0cb6dc11415f44a.text = kony.i18n.getLocalizedString("i18n.CustomerFeedback.Feedback");
          this.view.Feedback.LblAddFeatureRequest.text = kony.i18n.getLocalizedString("i18n.CustomerFeedback.AddFeatureRequest");
          this.view.CustomFooterMain.lblCopyright.text = kony.i18n.getLocalizedString("i18n.footer.copyright");
          this.view.forceLayout();
          this.showActions();
          CampaignUtility.fetchPopupCampaigns();
          FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['customheader', 'flxMainContainer', 'flxHeaderPreLogin', 'flxHeaderPostLogin', 'flxFooter', 'flxHeader','flxFormContent']);
          this.view.customheader.btnSkip.onClick = this.skipNav;
          this.view.onKeyPress = this.onKeyPressCallBack;
          this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
          this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
          this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
          this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
          this.view.Feedback.flxAddFeatureRequestandimg.accessibilityConfig = {
            "a11yARIA": {
              tabindex: -1
            }
          }
          this.view.Feedback.AllForms.accessibilityConfig = {
            "a11yARIA": {
              tabindex: -1,
              "role": "dialog"
            }
          }
          this.view.Feedback.flxImgInfoIcon.accessibilityConfig = {
            a11yLabel: "Read more information about adding a feature request",
            a11yARIA: {
              tabindex: 0,
              role: "button"
            }
          };
          this.view.Feedback.AllForms.flxCross.accessibilityConfig = {
            a11yLabel: "Close this dialog",
            a11yARIA: {
              tabindex: 0,
              role: "button"
            }
          };
          this.view.Feedback.flxImgInfoIcon.onKeyPress = this.onKeyPressCallBackforInfo;
          this.view.Feedback.AllForms.lblInfo.onKeyPress = this.onKeyPressCallBackforInfo;
          this.view.Feedback.AllForms.flxCross.onKeyPress = this.onKeyPressCallBackforInfo;
        },
        onKeyPressCallBackforInfo: function(eventobject, eventPayload){
          if (eventPayload.keyCode === 27) {
            eventPayload.preventDefault();
            this.view.Feedback.AllForms.isVisible = false;
            this.view.Feedback.flxImgInfoIcon.setActive(true);
            return;
          }
          if (eventobject.id === "flxCross" ) {
            if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
              eventPayload.preventDefault();
              this.view.Feedback.AllForms.isVisible = false;
              this.view.Feedback.flxImgInfoIcon.setActive(true);
            }
          }
          else if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
            if (this.view.Feedback.AllForms.isVisible) {
              eventPayload.preventDefault();
              this.view.Feedback.AllForms.isVisible = false;
              this.view.Feedback.flxImgInfoIcon.setActive(true);
            }
          }
        },
        skipNav: function(){
          if(this.view.Feedback.isVisible = true){
            //this.view.Feedback.flxRating1.setActive(true);
            this.view.Feedback.lblHeading.setActive(true);
          }
          if(this.view.flxAcknowledgementContainer.isVisible) {
            //this.view.acknowledgment.flxTakeSurvey.setActive(true);
            this.view.CopylblSurvey0cb6dc11415f44a.setActive(true);
          }
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
          var self = this;
          if (eventPayload.keyCode === 27) {
            if (self.view.flxLogout.isVisible === true) {
              self.view.flxLogout.isVisible = false;
              self.view.customheader.headermenu.btnLogout.setFocus(true);
            }
            self.view.customheader.onKeyPressCallBack(eventObject,eventPayload);
            if (self.view.flxPopup.isVisible === true) {
              self.view.flxPopup.isVisible = false;
            }
            if(self.view.Feedback.AllForms.isVisible === true) {
              self.view.Feedback.AllForms.isVisible = false;
              self.view.Feedback.flxImgInfoIcon.setActive(true);
            }
          }
        },
        updateCharCountComments: function() {
          this.view.Feedback.lblCharCountComments.text = this.view.Feedback.txtareaUserComments.text.length + "/1000";
          this.view.Feedback.lblCharCountComments.accessibilityConfig={
            "a11yLabel" : "Used " + this.view.Feedback.txtareaUserComments.text.length +  " " + "  of 1000 characters",
            "a11yARIA":{
              "tabindex":-1,
              "aria-live": "polite"
            }
          }
          if(this.view.Feedback.txtareaUserComments.text.length === 0)
          {
            this.view.Feedback.txtareaUserComments.placeholder=kony.i18n.getLocalizedString("i18n.transfers.optional");
          }
          this.view.Feedback.forceLayout(); // temp fix, need to remove
        },
        updateCharCountFeedback: function() {
          this.view.Feedback.lblCharCountFeedback.text = this.view.Feedback.txtareaUserAdditionalComments.text.length + "/1000";
          this.view.Feedback.lblCharCountFeedback.accessibilityConfig={
            "a11yLabel" : "Used " + this.view.Feedback.txtareaUserAdditionalComments.text.length + " " + " of 1000 characters",
            "a11yARIA":{
              "tabindex":-1,
              "aria-live": "polite"
            }
          }
          if(this.view.Feedback.txtareaUserComments.text.length === 0)
          {
            this.view.Feedback.txtareaUserAdditionalComments.placeholder=kony.i18n.getLocalizedString("i18n.transfers.optional");
          }
        },
        /**
             * Register actions for Customer Feedback
             * @member frmCustomerFeedbackController
             * @param {void} - None
             * @returns {void} - None
             * @throws {void} - None
             */
        showActions: function() {
          var scopeObj = this;
          this.view.Feedback.flxImgInfoIcon.onClick = function() {
            scopeObj.view.Feedback.AllForms.top = "0dp";
            if (scopeObj.view.Feedback.AllForms.isVisible === false) {
              scopeObj.view.Feedback.AllForms.isVisible = true;
              if (kony.application.getCurrentBreakpoint() === 1366) {
                scopeObj.view.Feedback.AllForms.left = "100dp";
              } else if (kony.application.getCurrentBreakpoint() === 1024) {
                scopeObj.view.Feedback.AllForms.left = "70dp";
              } else if (kony.application.getCurrentBreakpoint() === 640) {
                scopeObj.view.Feedback.AllForms.left = "10dp";
              }
            } else scopeObj.view.Feedback.AllForms.isVisible = false;
            scopeObj.view.Feedback.AllForms.lblInfo.setActive(true);
          };
          // 			 if(kony.application.getCurrentBreakpoint() <= 640) {
          //                          scopeObj.view.Feedback.lblPlusIcon.height="8dp";
          //                     }
          this.view.Feedback.AllForms.flxCross.onClick = function() {
            scopeObj.view.Feedback.AllForms.isVisible = false;
            scopeObj.view.Feedback.flxImgInfoIcon.setActive(true);

          };
          this.view.Feedback.flxRating1.onClick = function() {
            scopeObj.showRatingAction(1);
          };
          this.view.Feedback.flxRating2.onClick = function() {
            scopeObj.showRatingAction(2);
          };
          this.view.Feedback.flxRating3.onClick = function() {
            scopeObj.showRatingAction(3);
          };
          this.view.Feedback.flxRating4.onClick = function() {
            scopeObj.showRatingAction(4);
          };
          this.view.Feedback.flxRating5.onClick = function() {
            scopeObj.showRatingAction(5);
          };
          this.view.Feedback.confirmButtons.btnModify.onClick = function() {
            scopeObj.view.flxDowntimeWarning.isVisible = false;
            scopeObj.addCancelAction();
            scopeObj.AdjustScreen();
          };
          this.view.flxCloseDowntimeWarning.onClick = function() {
            this.view.flxDowntimeWarning.isVisible = false;
            this.AdjustScreen();
          }.bind(this);
          if (CommonUtilities.isCSRMode()) {
            this.view.Feedback.confirmButtons.btnConfirm.onClick = CommonUtilities.disableButtonActionForCSRMode();
          } else {
            this.view.Feedback.confirmButtons.btnConfirm.onClick = function() {
              scopeObj.addSubmitAction();
            };
          }
          this.view.Feedback.flxAddRequest.onClick = function() {
            scopeObj.addFeatureRequestAction();
            scopeObj.AdjustScreen();
            scopeObj.view.Feedback.txtareaUserAdditionalComments.setActive(true);
          };
          this.view.btnAddAnotherAccount.onClick = function() {
            var surveyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName":"SurveyUIModule"});
            surveyModule.presentationController.surveyDone();
          };
          this.view.btnDone.onClick = function() {
            scopeObj.showAccountModule();
          };
          this.view.acknowledgment.flxTakeSurvey.onClick = function() {
            scopeObj.loadFeedbackModule().presentationController.showSurveyForm();
          };
          this.view.btnLogin.onClick = function() {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
            authModule.presentationController.showLoginScreen();
          };
        },
        /**
             * Toggle checkbox
             * @member frmCustomerFeedbackController
             * @param {String} imgCheckBox
             * @returns {void} - None
             * @throws {void} - None
             */
        toggleCheckBox: function(imgCheckBox) {
          CommonUtilities.toggleCheckbox(imgCheckBox);
        },
        /**
             * Show Ratings
             * @member frmCustomerFeedbackController
             * @param {Int} val
             * @returns {void} - None
             * @throws {void} - None
             */
        showRatingAction: function(val) {
          for (var i = 1; i <= val; i++) {
            this.view.Feedback["imgRating" + i].skin = "sknLblFontType0273E330px";
            this.view.Feedback["imgRating" + i].text = "F";
          }
          for (i = (val + 1); i <= 5; i++) {
            this.view.Feedback["imgRating" + i].skin = "sknLblFontTypeIcon72727230px";
            this.view.Feedback["imgRating" + i].text = "k";
          }
          for (i = 1; i <= 5; i++) {
            this.view.CustomerFeedbackDetails["imgRating" + i].skin = this.view.Feedback["imgRating" + i].skin;
            this.view.CustomerFeedbackDetails["imgRating" + i].text = this.view.Feedback["imgRating" + i].text;
          }
          this.enableButton(this.view.Feedback.confirmButtons.btnConfirm);
          var rating = val.toString();
          this.feedbackRating = rating;
          this.setAccessibility(val);
          this.view.forceLayout();
        },
        setAccessibility: function(val2){
          var text1 = "1 Star";
          var text2 = "2 Stars";
          var text3 = "3 Stars";
          var text4 = "4 Stars";
          var text5 = "5 Stars";
          this.setAccessibilityFalse(1,text1);
          this.setAccessibilityFalse(2,text2);
          this.setAccessibilityFalse(3,text3);
          this.setAccessibilityFalse(4,text4);
          this.setAccessibilityFalse(5,text5);
          this.view.CustomerFeedbackDetails.flxRatingimg.accessibilityConfig = {
            "a11yLabel": val2 + "Star Experience",
            "a11yARIA": {
              "tabindex": -1,
              "role":"img"
            }
          };
          if(val2 ===1){
            this.setAccessibilityTrue(val2,text1);
          }
          else if(val2 === 2){
            this.setAccessibilityTrue(val2,text2);
            this.setAccessibilityTrue(1,text1);
          }
          else if(val2 ===3){
            this.setAccessibilityTrue(val2,text3);
            this.setAccessibilityTrue(1,text1);
            this.setAccessibilityTrue(2,text2);
          }
          else if(val2 === 4){
            this.setAccessibilityTrue(val2,text4);
            this.setAccessibilityTrue(1,text1);
            this.setAccessibilityTrue(2,text2);
            this.setAccessibilityTrue(3,text3);
          }
          else if(val2 ===5){
            this.setAccessibilityTrue(val2,text5);
            this.setAccessibilityTrue(1,text1);
            this.setAccessibilityTrue(2,text2);
            this.setAccessibilityTrue(3,text3);
            this.setAccessibilityTrue(4,text4);
          }
        },
        setAccessibilityFalse: function (val1, text) {
          for (var i = 1; i <= 5; i++) {
            var path = this.view.Feedback["flxRating" + val1];
            path.accessibilityConfig = {
              a11yLabel: text,
              "a11yARIA": {
                "role": "checkbox",
                "aria-checked": false
              }
            }
          }
        },
        setAccessibilityTrue: function (val1, text) {

          for (var i = 1; i <= 5; i++) {
            var path = this.view.Feedback["flxRating" + val1];
            path.accessibilityConfig = {
              a11yLabel: text,
              "a11yARIA": {
                "role": "checkbox",
                "aria-checked": true
              }
            }
          }
        },
        /**
             * Show Ratings
             * @member frmCustomerFeedbackController
             * @param {Int} val
             * @returns {void} - None
             * @throws {void} - None
             */
        showRatingActionCircle: function(val) {
          for (var i = 1; i <= val; i++) {
            this.view.FeedbackSurvey["imgRating" + i].src = ViewConstants.IMAGES.CIRCLE_BLUE_FILLED;
          }
          for (i = (val + 1); i <= 5; i++) {
            this.view.FeedbackSurvey["imgRating" + i].src = ViewConstants.IMAGES.CIRCLE_UNFILLED;
          }
          this.enableButton(this.view.FeedbackSurvey.confirmButtons.btnConfirm);
          this.view.forceLayout();
        },
        /**
             * Show Add Feature Request UI
             * @member frmCustomerFeedbackController
             * @param {void} - None
             * @returns {void} - None
             * @throws {void} - None
             */
        addFeatureRequestAction: function() {
          this.view.Feedback.flxAddFeatureRequest.setVisibility(false);
          this.view.Feedback.flxUserFeedback.setVisibility(true);
          this.view.forceLayout();
        },
        /**
             * Show Survey UI
             * @member frmCustomerFeedbackController
             * @param {void} - None
             * @returns {void} - None
             * @throws {void} - None
             */
        TakeSurveyAction: function() {
          this.view.flxFeedback.setVisibility(false);
          this.view.flxFeedbackMoneyTransferProcess.setVisibility(true);
          this.view.flxFeedbackAcknowledgement.setVisibility(false);
          this.view.flxAcknowledgementContainer.setVisibility(false);
        },
        /**
             * Calls presenter function to submit feedback
             * @member frmCustomerFeedbackController
             * @param {void} - None
             * @returns {void} - None
             * @throws {void} - None
             */
        addSubmitAction: function() {
          var self = this;
          FormControllerUtility.showProgressBar(this.view);
          var feedback = {
            'rating': self.feedbackRating,
            'description': self.view.Feedback.txtareaUserComments.text.trim().replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/=/g,"&eq;"),
            'featureRequest': self.view.Feedback.txtareaUserAdditionalComments.text.trim().replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/=/g,"&eq;"),
          };
          self.loadFeedbackModule().presentationController.createFeedback(feedback);
        },
        /**
             * Show feedback confirmation screen
             * @member frmCustomerFeedbackController
             * @param {void} - None
             * @returns {void} - None
             * @throws {void} - None
             */
        submitFeedbackSuccessFlow: function() {
          var self = this;
          FormControllerUtility.hideProgressBar(this.view);
          var customerFeedback = self.view.CustomerFeedbackDetails;
          var feedback = self.view.Feedback;
          customerFeedback.lblcomments.text = feedback.txtareaUserComments.text.trim().replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/=/g,"&eq;");
          customerFeedback.lblAnswer1.text = feedback.txtareaUserAdditionalComments.text.trim().replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/=/g,"&eq;");
          if (feedback.txtareaUserComments.text.trim() === "") {
            customerFeedback.lblcomments.text = kony.i18n.getLocalizedString("i18n.common.none");
          }
          if (feedback.txtareaUserAdditionalComments.text.trim() === "") {
            customerFeedback.lblAnswer1.text = kony.i18n.getLocalizedString("i18n.common.none");
          }
          self.view.flxFeedback.setVisibility(false);
          self.view.flxFeedbackAcknowledgement.setVisibility(false);
          self.view.flxAcknowledgementContainer.setVisibility(true);
          self.view.forceLayout();
        },
        /**
            * Reset Feedback form if ratings were done, else navigate to Accounts dashboard
            * @member frmCustomerFeedbackController
            * @param {void} - None
            * @returns {void} - None
            * @throws {void} - None
            */
        addCancelAction: function() {
          var feedback = this.view.Feedback;
          if (this.view.Feedback.imgRating1.skin === "sknLblFontType0273E330px" && this.view.Feedback.imgRating1.text === "F") {
            this.view.Feedback.imgRating1.skin = "sknLblFontTypeIcon72727230px";
            this.view.Feedback.imgRating1.text = "k";
            this.view.Feedback.imgRating2.skin = "sknLblFontTypeIcon72727230px";
            this.view.Feedback.imgRating2.text = "k";
            this.view.Feedback.imgRating3.skin = "sknLblFontTypeIcon72727230px";
            this.view.Feedback.imgRating3.text = "k";
            this.view.Feedback.imgRating4.skin = "sknLblFontTypeIcon72727230px";
            this.view.Feedback.imgRating4.text = "k";
            this.view.Feedback.imgRating5.skin = "sknLblFontTypeIcon72727230px";
            this.view.Feedback.imgRating5.text = "k";
            this.disableButton(feedback.confirmButtons.btnConfirm);
            feedback.txtareaUserComments.text = "";
            feedback.txtareaUserAdditionalComments.text = "";
            feedback.txtareaUserComments.onKeyUp();
            feedback.txtareaUserAdditionalComments.onKeyUp();
            feedback.flxAddFeatureRequest.setVisibility(true);
            feedback.flxUserFeedback.setVisibility(false);
            this.setAccessibility();
            this.view.forceLayout();
          } else {
            this.loadFeedbackModule().presentationController.cancelAction();
          }
        },
        /**
            * Navigate to Accounts Dashboard
            * @member frmCustomerFeedbackController
            * @param {void} - None
            * @returns {void} - None
            * @throws {void} - None
            */
        showAccountModule: function() {
          var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
          accountModule.presentationController.showAccountsDashboard();
        },
        /**
            * Disable button
            * @member frmCustomerFeedbackController
            * @param {String} button
            * @returns {void} - None
            * @throws {void} - None
            */
        disableButton: function(button) {
          button.setEnabled(false);
          button.skin = ViewConstants.SKINS.BLOCKED;
          button.hoverSkin = ViewConstants.SKINS.BLOCKED;
          button.focusSkin = ViewConstants.SKINS.BLOCKED;
        },
        /**
            * Enable button
            * @member frmCustomerFeedbackController
            * @param {String} button
            * @returns {void} - None
            * @throws {void} - None
            */
        enableButton: function(button) {
          if (!CommonUtilities.isCSRMode()) {
            button.setEnabled(true);
            button.skin = ViewConstants.SKINS.NORMAL;
            button.hoverSkin = ViewConstants.SKINS.HOVER;
            button.focusSkin = ViewConstants.SKINS.FOCUS;
          }
        },
        /**
            * onBreakpointChange : Handles ui changes on .
            * @member of {frmAccountsLandingController}
            * @param {integer} width - current browser width
            * @return {}
            * @throws {}
            */
        orientationHandler: null,
        onBreakpointChange: function(width) {
          var scope = this;
          this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
          this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
          this.view.CustomFooterMain.lblCopyright.text = kony.i18n.getLocalizedString("i18n.footer.copyright");
          kony.print('on breakpoint change');
          if (this.orientationHandler === null) {
            this.orientationHandler = new OrientationHandler();
          }
          this.orientationHandler.onOrientationChange(this.onBreakpointChange);
          this.view.customheader.onBreakpointChangeComponent(width);
          this.setupFormOnTouchEnd(width);
          var scope = this;
          if (width === 640) {
            this.view.Feedback.lblRatingtxt.skin = "sknBBSSP72727215px";
            this.view.Feedback.flxMain.top = "30dp";
            this.view.CustomPopupLogout.width = "75%";
          } else {
            this.view.Feedback.lblRatingtxt.skin = "sknBBSSP72727215px";
          }
          this.AdjustScreen();
        },
        setupFormOnTouchEnd: function(width) {
          if (width == 640) {
            this.view.onTouchEnd = function() {}
            this.nullifyPopupOnTouchStart();
          } else {
            if (width == 1024) {
              this.view.onTouchEnd = function() {}
              this.nullifyPopupOnTouchStart();
            } else {
              this.view.onTouchEnd = function() {
                hidePopups();
              }
            }
            var userAgent = kony.os.deviceInfo().userAgent;
            if (userAgent.indexOf("iPad") != -1) {
              this.view.onTouchEnd = function() {}
              this.nullifyPopupOnTouchStart();
            } else if (userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") == -1) {
              this.view.onTouchEnd = function() {}
              this.nullifyPopupOnTouchStart();
            }
          }
        },
        nullifyPopupOnTouchStart: function() {}
      }
    }); 