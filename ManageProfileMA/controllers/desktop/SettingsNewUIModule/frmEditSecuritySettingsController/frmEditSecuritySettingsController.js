define(['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  var selectAQuestioni18N=kony.i18n.getLocalizedString("i18n.ProfileManagement.selectQuestion").trim();
  return {
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.securityQuestion) {
          this.setSecurityQuestions(viewModel.securityQuestion);
        }
        if(viewModel.verifyOtpError)this.showSecurityQuestionsError(viewModel);
        if(viewModel.requestOtpError)this.showSecurityQuestionsError(viewModel);
        if(viewModel.updateSecurityQuestionError)this.showSecurityQuestionsError(viewModel);
        if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
      }
      this.view.lblEditSecuritySettingsHeader.setActive(true);
    },
    preShow: function() {
      this.view.flxRight.setVisibility(true);
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile','flxRight']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.customheadernew.activateMenu("Settings","Security Settings");
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("SECURITYSETTINGS","Security Setting");
      this.setSelectedValue("i18n.ProfileManagement.SecuritySettings");
      this.setAccessibility();
      this.view.forceLayout();
    },
    init: function() {
      var self = this;
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
      this.setFlowActions();
    },
    /**
         * *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
         *  Method to set the text in mobile breakpoint
         */
    setSelectedValue: function(text) {
      var self = this;
      self.view.lblAccountSettingsMobile.text= kony.i18n.getLocalizedString(text);
    },
    showSecurityQuestionsError:function(viewModel){
      this.view.lblErrorSecuritySettings.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.updateServerError");
      this.view.flxErrorEditSecuritySettings.setVisibility(true);
      this.view.forceLayout();
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile', 'flxRight']);
      this.view.flxLeft.height = this.view.flxRight.info.frame.height;
      this.view.profileMenu.flxSeperator.height = this.view.flxRight.info.frame.height;
      FormControllerUtility.hideProgressBar(this.view);
      this.view.customheadernew.setFocus(true);
    },
    /**
         *  Method to set the Accessibility configurations
         */
    setAccessibility: function() {
      //this.view.btnEditSecuritySettingsCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
      //this.view.btnEditSecuritySettingsProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
       //this.view.customheadernew.lblAccounts.toolTip=kony.i18n.getLocalizedString("i18n.topmenu.accounts");
      this.view.customheadernew.lblHeaderMobile.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.SecuritySettings");
      this.view.lblEditSecuritySettingsHeader.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.EditSecuritySettings");
      this.view.lblWarningText1.text= kony.i18n.getLocalizedString("i18n.Profile.pleaseselectYourSecurityQuestions");
      this.view.lblWarningText2.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.WeMayAskYou");
      this.view.lblRules.text= kony.i18n.getLocalizedString("i18n.StopPayment.PleaseNote");
      this.view.lblSecurityRule1.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.AnswersareCaseSesitive");
      this.view.lblSecurityRule2.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.PleaseDoNotshareThese");
      this.view.lblSelectQuestionsAndAnswersSet.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.SelectQuestionsandSetYourAnswers");
      //CommonUtilities.setText(this.view.btnEditSecuritySettingsCancel, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
      this.view.lblHeading.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": this.view.lblEditSecuritySettingsHeader.text 
      };
      //CommonUtilities.setText(this.view.btnEditSecuritySettingsProceed, kony.i18n.getLocalizedString("i18n.common.proceed"), accessibilityConfig);    
      this.view.lblQuestion1.text= kony.i18n.getLocalizedString("i18n.SecuritySettings.Question1");    
      this.view.lblQuestion2.text= kony.i18n.getLocalizedString("i18n.SecuritySettings.Question2");    
      this.view.lblQuestion3.text= kony.i18n.getLocalizedString("i18n.SecuritySettings.Question3");    
      this.view.lblQuestion4.text= kony.i18n.getLocalizedString("i18n.SecuritySettings.Question4");    
      this.view.lblQuestion5.text= kony.i18n.getLocalizedString("i18n.SecuritySettings.Question5");    
      this.view.lblAnswer1.text= kony.i18n.getLocalizedString("i18n.SecuritySettings.Answer");    
      this.view.lblAnswer2.text= kony.i18n.getLocalizedString("i18n.SecuritySettings.Answer");    
      this.view.lblAnswer3.text= kony.i18n.getLocalizedString("i18n.SecuritySettings.Answer");    
      this.view.lblAnswer4.text= kony.i18n.getLocalizedString("i18n.SecuritySettings.Answer");    
      this.view.lblAnswer5.text= kony.i18n.getLocalizedString("i18n.SecuritySettings.Answer");    
     /* this.view.lblAnswer1.accessibilityConfig = {
        "a11yLabel" : kony.i18n.getLocalizedString("i18n.SecuritySettings.Answerfor") + " " + kony.i18n.getLocalizedString("i18n.SecuritySettings.Question1")
      }; 
      this.view.lblAnswer2.accessibilityConfig = {
        "a11yLabel" : kony.i18n.getLocalizedString("i18n.SecuritySettings.Answerfor") + " " + kony.i18n.getLocalizedString("i18n.SecuritySettings.Question2")
      }; 
      this.view.lblAnswer3.accessibilityConfig = {
        "a11yLabel" : kony.i18n.getLocalizedString("i18n.SecuritySettings.Answerfor") + " " + kony.i18n.getLocalizedString("i18n.SecuritySettings.Question3")
      }; 
      this.view.lblAnswer4.accessibilityConfig = {
        "a11yLabel" : kony.i18n.getLocalizedString("i18n.SecuritySettings.Answerfor") + " " + kony.i18n.getLocalizedString("i18n.SecuritySettings.Question4")
      }; 
      this.view.lblAnswer5.accessibilityConfig = {
        "a11yLabel" : kony.i18n.getLocalizedString("i18n.SecuritySettings.Answerfor") + " " + kony.i18n.getLocalizedString("i18n.SecuritySettings.Question5")
      };
      this.view.lbxQuestion1.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.selectQuestion1")
      };
      this.view.tbxAnswer1.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.MFA.TypeYourAnswerHere")
      };
      this.view.lbxQuestion2.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.selectQuestion2")
      };
      this.view.tbxAnswer2.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.MFA.TypeYourAnswerHere")
      };
      this.view.lbxQuestion3.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.selectQuestion3")
      };
      this.view.tbxAnswer3.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.MFA.TypeYourAnswerHere")
      };
      this.view.lbxQuestion4.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.selectQuestion4")
      };
      this.view.tbxAnswer4.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.MFA.TypeYourAnswerHere")
      };
      this.view.lbxQuestion5.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.selectQuestion5")
      };
      this.view.tbxAnswer5.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.MFA.TypeYourAnswerHere")
      };
      */
     this.view.btnEditSecuritySettingsProceed.accessibilityConfig = {
        "a11yLabel": "Continue to Confirmation"
      };
      this.view.btnEditSecuritySettingsCancel.accessibilityConfig = {
        "a11yLabel": "Cancel edit security settings process"
      };
      this.view.lblCollapseMobile.accessibilityConfig = {
        "a11yARIA": {
            "tabindex": -1
        }
      };
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
        "a11yLabel": "Dropdown"
      };
      this.view.imgWarning2.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1,
          "aria-hidden": true
      }
      };
    this.view.lblWarningText1.accessibilityConfig = {
        "a11yLabel": ""
    }
    this.view.lblWarningText2.accessibilityConfig = {
        "a11yLabel": ""
    }
    this.view.lblRules.accessibilityConfig = {
        "a11yLabel": ""
    }
    this.view.lblSecurityRule1.accessibilityConfig = {
        "a11yLabel": ""
    }
    this.view.lblSecurityRule2.accessibilityConfig = {
        "a11yLabel": ""
    }
    this.view.lblSelectQuestionsAndAnswersSet.accessibilityConfig = {
        "a11yLabel": ""
    }
    this.view.lblQuestion1.accessibilityConfig = {
        "a11yLabel": ""
    }
    },
    onBreakpointChange: function(width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        this.view.customheadernew.lblHeaderMobile.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.SecuritySettings");
      }
      this.view.forceLayout();
    },
    /**
       * Method to Enable a button
       * @param {String} button - ID of the button to be enabled
       */
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
       * Method to manipulate data in listbox
       * @param {Object} data- JSON of all the questions
       * @returns {Object} selectedData- JSON of seleted question and answer
       */
    flagManipulation: function(data, selectedData) {
      var tempData1 = [],
          tempData2 = [];
      if (selectedData[0] !== "lb0") {
        tempData1[0] = selectedData;
        tempData2 = tempData1.concat(data);
      } else
        tempData2 = data;
      return tempData2;
    },
    /**
       * Method to toggle the proceed button visibility
       * @param {Boolean} status - Status of the button to be enabled or disabled
       */
    btnSecurityQuestions: function(status) {
      if (status === true) {
        this.enableButton(this.view.btnEditSecuritySettingsProceed);
      } else {
        this.disableButton(this.view.btnEditSecuritySettingsProceed);
      }
    },
    /**
       * Method that changes questions into key-value pairs basing on the flagManipulation
       * @param {Object} response- JSON of all the questions
       */
    getQuestions: function(response) {
      var temp = [];
      temp[0] = ["lb0", selectAQuestioni18N];
      for (var i = 0, j = 1; i < response.securityQuestions.length; i++) {
        var arr = [];
        if (response.flagToManipulate[i] === "false") {
          arr[0] = "lb" + (i + 1);
          arr[1] = response.securityQuestions[i];
          temp[j] = arr;
          j++;
        }
      }
      return temp;
    },
    setFlowActions: function() {
      var self = this;
      /*this.view.tbxAnswer1.onTextChange = function(){
        //CommonUtilities.setText(self.view.tbxAnswer1,self.view.tbxAnswer1.text.trim() , CommonUtilities.getaccessibilityConfig());
        self.view.tbxAnswer1.accessibilityConfig ={
          "a11yValue":self.view.tbxAnswer1.text.trim()
        }
      };
      this.view.tbxAnswer2.onTextChange = function(){
        //CommonUtilities.setText(self.view.tbxAnswer2,self.view.tbxAnswer2.text.trim() , CommonUtilities.getaccessibilityConfig());
        self.view.tbxAnswer2.accessibilityConfig ={
          "a11yValue":self.view.tbxAnswer2.text.trim()
        }
      };
      this.view.tbxAnswer3.onTextChange = function(){
        //CommonUtilities.setText(self.view.tbxAnswer3,self.view.tbxAnswer3.text.trim() , CommonUtilities.getaccessibilityConfig());
        self.view.tbxAnswer3.accessibilityConfig ={
          "a11yValue":self.view.tbxAnswer3.text.trim()
        }
      };
      this.view.tbxAnswer4.onTextChange = function(){
        //CommonUtilities.setText(self.view.tbxAnswer4,self.view.tbxAnswer4.text.trim() , CommonUtilities.getaccessibilityConfig());
        self.view.tbxAnswer4.accessibilityConfig ={
          "a11yValue":self.view.tbxAnswer4.text.trim()
        }
      };
      this.view.tbxAnswer5.onTextChange = function(){
        //CommonUtilities.setText(self.view.tbxAnswer5,self.view.tbxAnswer5.text.trim() , CommonUtilities.getaccessibilityConfig());
        self.view.tbxAnswer5.accessibilityConfig ={
          "a11yValue":self.view.tbxAnswer5.text.trim()
        }
      };*/
      this.view.lbxQuestion1.onSelection = this.setQuestionForListBox1.bind(this);
      this.view.lbxQuestion2.onSelection = this.setQuestionForListBox2.bind(this);
      this.view.lbxQuestion3.onSelection = this.setQuestionForListBox3.bind(this);
      this.view.lbxQuestion4.onSelection = this.setQuestionForListBox4.bind(this);
      this.view.lbxQuestion5.onSelection = this.setQuestionForListBox5.bind(this);
      this.view.tbxAnswer1.onBeginEditing = this.onEditingAnswer1.bind(this);
      this.view.tbxAnswer2.onBeginEditing = this.onEditingAnswer2.bind(this);
      this.view.tbxAnswer3.onBeginEditing = this.onEditingAnswer3.bind(this);
      this.view.tbxAnswer4.onBeginEditing = this.onEditingAnswer4.bind(this);
      this.view.tbxAnswer5.onBeginEditing = this.onEditingAnswer5.bind(this);
      this.view.btnEditSecuritySettingsProceed.onClick = function(){
        self.view.flxErrorEditSecuritySettings.setVisibility(false);
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.requestOtp(self.onSaveSecurityQuestions());
      };
      this.view.btnEditSecuritySettingsCancel.onClick = function(){
        self.view.flxErrorEditSecuritySettings.setVisibility(false);
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.checkSecurityQuestions();
      }
      this.view.tbxAnswer1.onEndEditing = function(){
        self.enableSecurityQuestions(self.view.tbxAnswer1.text, self.view.tbxAnswer2.text, self.view.tbxAnswer3.text, self.view.tbxAnswer4.text, self.view.tbxAnswer5.text);
      };
      this.view.tbxAnswer2.onEndEditing = function(){
        self.enableSecurityQuestions(self.view.tbxAnswer1.text, self.view.tbxAnswer2.text, self.view.tbxAnswer3.text, self.view.tbxAnswer4.text, self.view.tbxAnswer5.text);
      };
      this.view.tbxAnswer3.onEndEditing = function(){
        self.enableSecurityQuestions(self.view.tbxAnswer1.text, self.view.tbxAnswer2.text, self.view.tbxAnswer3.text, self.view.tbxAnswer4.text, self.view.tbxAnswer5.text);
      };
      this.view.tbxAnswer4.onEndEditing = function(){
        self.enableSecurityQuestions(self.view.tbxAnswer1.text, self.view.tbxAnswer2.text, self.view.tbxAnswer3.text, self.view.tbxAnswer4.text, self.view.tbxAnswer5.text);
      };
      this.view.tbxAnswer5.onEndEditing = function(){
        self.enableSecurityQuestions(self.view.tbxAnswer1.text, self.view.tbxAnswer2.text, self.view.tbxAnswer3.text, self.view.tbxAnswer4.text, self.view.tbxAnswer5.text);
      };
      this.view.tbxAnswer1.onKeyUp = function(){
        self.enableSecurityQuestions(self.view.tbxAnswer1.text, self.view.tbxAnswer2.text, self.view.tbxAnswer3.text, self.view.tbxAnswer4.text, self.view.tbxAnswer5.text);
      };
      this.view.tbxAnswer2.onKeyUp = function(){
        self.enableSecurityQuestions(self.view.tbxAnswer1.text, self.view.tbxAnswer2.text, self.view.tbxAnswer3.text, self.view.tbxAnswer4.text, self.view.tbxAnswer5.text);
      };
      this.view.tbxAnswer3.onKeyUp = function(){
        self.enableSecurityQuestions(self.view.tbxAnswer1.text, self.view.tbxAnswer2.text, self.view.tbxAnswer3.text, self.view.tbxAnswer4.text, self.view.tbxAnswer5.text);
      };
      this.view.tbxAnswer4.onKeyUp = function(){
        self.enableSecurityQuestions(self.view.tbxAnswer1.text, self.view.tbxAnswer2.text, self.view.tbxAnswer3.text, self.view.tbxAnswer4.text, self.view.tbxAnswer5.text);
      };
      this.view.tbxAnswer5.onKeyUp = function(){
        self.enableSecurityQuestions(self.view.tbxAnswer1.text, self.view.tbxAnswer2.text, self.view.tbxAnswer3.text, self.view.tbxAnswer4.text, self.view.tbxAnswer5.text);
      };
    },
    /**
       * Method to enable Proceed button
       * @param {String} question1- First question selected
       * @param {String} question1- Second question selected
       * @param {String} question1- Third question selected
       * @param {String} question1- Fourth question selected
       * @param {String} question1- Fifth question selected
       */
    enableSecurityQuestions: function(question1, question2, question3, question4, question5) {
      if (CommonUtilities.isCSRMode()) {
        this.view.btnEditSecuritySettingsProceed.onClick = CommonUtilities.disableButtonActionForCSRMode();
        this.view.btnEditSecuritySettingsProceed.skin = CommonUtilities.disableButtonSkinForCSRMode();
      }else{
        if (question1 !== null && question1 !== "" && question2 !== null && question2 !== "" && question3 !== null && question3 !== "" && question4 !== null && question4 !== "" && question5 !== null && question5 !== "") {
          this.btnSecurityQuestions(true);
        } else {
          this.btnSecurityQuestions(false);
        }
      }
    },


    /**
       * Method to set Question for lbxQuestion1
       */
    setQuestionForListBox1: function() {
      var value = [];
      value = this.view.lbxQuestion1.selectedKeyValue;
      var data = [];
      var selectedQues = {
        ques: "null",
        key: "null"
      };
      selectedQues.ques = this.selectedQuestions.ques[0];
      selectedQues.key = this.selectedQuestions.key[0];
      var position = 0;
      data = this.getQuestionsAfterSelected(value, selectedQues, position);
      var mainData = [],
          selectedData = [];
      selectedData = this.view.lbxQuestion2.selectedKeyValue;
      mainData = this.flagManipulation(data, selectedData);
      this.view.lbxQuestion2.masterData = mainData;
      this.view.lbxQuestion2.selectedKey = selectedData[0];
      var mainData2 = [],
          selectedData2 = [];
      selectedData2 = this.view.lbxQuestion3.selectedKeyValue;
      mainData2 = this.flagManipulation(data, selectedData2);
      this.view.lbxQuestion3.masterData = mainData2;
      this.view.lbxQuestion3.selectedKey = selectedData2[0];
      var mainData3 = [],
          selectedData3 = [];
      selectedData3 = this.view.lbxQuestion4.selectedKeyValue;
      mainData3 = this.flagManipulation(data, selectedData3);
      this.view.lbxQuestion4.masterData = mainData3;
      this.view.lbxQuestion4.selectedKey = selectedData3[0];
      var mainData4 = [],
          selectedData4 = [];
      selectedData4 = this.view.lbxQuestion5.selectedKeyValue;
      mainData4 = this.flagManipulation(data, selectedData4);
      this.view.lbxQuestion5.masterData = mainData4;
      this.view.lbxQuestion5.selectedKey = selectedData4[0];
    },
    /**
     * Method to set Question for lbxQuestion4
     */
    setQuestionForListBox4: function() {
      var value = [];
      value = this.view.lbxQuestion4.selectedKeyValue;
      var data = [];
      var selectedQues = {
        ques: "null",
        key: "null"
      };
      selectedQues.ques = this.selectedQuestions.ques[3];
      selectedQues.key = this.selectedQuestions.key[3];
      var position = 3;
      data = this.getQuestionsAfterSelected(value, selectedQues, position);
      var mainData = [],
          selectedData = [];
      selectedData = this.view.lbxQuestion1.selectedKeyValue;
      mainData = this.flagManipulation(data, selectedData);
      this.view.lbxQuestion1.masterData = mainData;
      this.view.lbxQuestion1.selectedKey = selectedData[0];
      var mainData2 = [],
          selectedData2 = [];
      selectedData2 = this.view.lbxQuestion3.selectedKeyValue;
      mainData2 = this.flagManipulation(data, selectedData2);
      this.view.lbxQuestion3.masterData = mainData2;
      this.view.lbxQuestion3.selectedKey = selectedData2[0];
      var mainData3 = [],
          selectedData3 = [];
      selectedData3 = this.view.lbxQuestion2.selectedKeyValue;
      mainData3 = this.flagManipulation(data, selectedData3);
      this.view.lbxQuestion2.masterData = mainData3;
      this.view.lbxQuestion2.selectedKey = selectedData3[0];
      var mainData4 = [],
          selectedData4 = [];
      selectedData4 = this.view.lbxQuestion5.selectedKeyValue;
      mainData4 = this.flagManipulation(data, selectedData4);
      this.view.lbxQuestion5.masterData = mainData4;
      this.view.lbxQuestion5.selectedKey = selectedData4[0];
    },
    /**
     * Method to set Question for lbxQuestion3
     */
    setQuestionForListBox3: function() {
      var value = [];
      value = this.view.lbxQuestion3.selectedKeyValue;
      var data = [];
      var selectedQues = {
        ques: "null",
        key: "null"
      };
      selectedQues.ques = this.selectedQuestions.ques[2];
      selectedQues.key = this.selectedQuestions.key[2]
      var position = 2;
      data = this.getQuestionsAfterSelected(value, selectedQues, position);
      var mainData = [],
          selectedData = [];
      selectedData = this.view.lbxQuestion1.selectedKeyValue;
      mainData = this.flagManipulation(data, selectedData);
      this.view.lbxQuestion1.masterData = mainData;
      this.view.lbxQuestion1.selectedKey = selectedData[0];
      var mainData2 = [],
          selectedData2 = [];
      selectedData2 = this.view.lbxQuestion2.selectedKeyValue;
      mainData2 = this.flagManipulation(data, selectedData2);
      this.view.lbxQuestion2.masterData = mainData2;
      this.view.lbxQuestion2.selectedKey = selectedData2[0];
      var mainData3 = [],
          selectedData3 = [];
      selectedData3 = this.view.lbxQuestion4.selectedKeyValue;
      mainData3 = this.flagManipulation(data, selectedData3);
      this.view.lbxQuestion4.masterData = mainData3;
      this.view.lbxQuestion4.selectedKey = selectedData3[0];
      var mainData4 = [],
          selectedData4 = [];
      selectedData4 = this.view.lbxQuestion5.selectedKeyValue;
      mainData4 = this.flagManipulation(data, selectedData4);
      this.view.lbxQuestion5.masterData = mainData4;
      this.view.lbxQuestion5.selectedKey = selectedData4[0];
    },
    /**
     * Method to set Question for lbxQuestion2
     */
    setQuestionForListBox2: function() {
      var value = [];
      value = this.view.lbxQuestion2.selectedKeyValue;
      var data = [];
      var selectedQues = {
        ques: "null",
        key: "null"
      };
      selectedQues.ques = this.selectedQuestions.ques[1];
      selectedQues.key = this.selectedQuestions.key[1]
      var position = 1;
      data = this.getQuestionsAfterSelected(value, selectedQues, position);
      var mainData = [],
          selectedData = [];
      selectedData = this.view.lbxQuestion1.selectedKeyValue;
      mainData = this.flagManipulation(data, selectedData);
      this.view.lbxQuestion1.masterData = mainData;
      this.view.lbxQuestion1.selectedKey = selectedData[0];
      var mainData2 = [],
          selectedData2 = [];
      selectedData2 = this.view.lbxQuestion3.selectedKeyValue;
      mainData2 = this.flagManipulation(data, selectedData2);
      this.view.lbxQuestion3.masterData = mainData2;
      this.view.lbxQuestion3.selectedKey = selectedData2[0];
      var mainData3 = [],
          selectedData3 = [];
      selectedData3 = this.view.lbxQuestion4.selectedKeyValue;
      mainData3 = this.flagManipulation(data, selectedData3);
      this.view.lbxQuestion4.masterData = mainData3;
      this.view.lbxQuestion4.selectedKey = selectedData3[0];
      var mainData4 = [],
          selectedData4 = [];
      selectedData4 = this.view.lbxQuestion5.selectedKeyValue;
      mainData4 = this.flagManipulation(data, selectedData4);
      this.view.lbxQuestion5.masterData = mainData4;
      this.view.lbxQuestion5.selectedKey = selectedData4[0];
    },
    /**
       * Method  to manipulate the flag of the question selected
       * @param {Object} data - JSON of all the questions with answers
       * @param {Object} selectedQues - JSON of the selected question with its answer
       * @param {Object} key - ID of the question selected
       */
    getQuestionsAfterSelected: function(data, selectedQues, key) {
      var response = [];
      var temp = 10;
      if (data[1] !== selectAQuestioni18N) {
        for (var i = 0; i < this.selectedQuestionsTemp.securityQuestions.length; i++) {
          if (this.selectedQuestionsTemp.securityQuestions[i] === data[1]) {
            if (this.selectedQuestionsTemp.flagToManipulate[i] === "false") {
              this.selectedQuestionsTemp.flagToManipulate[i] = "true";
              temp = i;
            }
          }
          if (this.selectedQuestionsTemp.securityQuestions[i] === selectedQues.ques) {
            if (this.selectedQuestionsTemp.flagToManipulate[i] === "true") {
              this.selectedQuestionsTemp.flagToManipulate[i] = "false";
              this.selectedQuestions.key[key] = "lb" + (i + 1);
            }
          }
        }
      } else {
        this.disableButton(this.view.btnEditSecuritySettingsProceed);
        if (key === 0) {
          this.view.tbxAnswer1.text = "";
        } else if (key === 1) {
          this.view.tbxAnswer2.text = "";
        } else if (key === 2) {
          this.view.tbxAnswer3.text = "";
        } else if (key === 3) {
          this.view.tbxAnswer4.text = "";
        } else if (key === 4) {
          this.view.tbxAnswer5.text = "";
        }
        for (var ij = 0; ij < this.selectedQuestionsTemp.securityQuestions.length; ij++) {
          if (this.selectedQuestionsTemp.securityQuestions[ij] === selectedQues.ques) {
            if (this.selectedQuestionsTemp.flagToManipulate[ij] === "true") {
              this.selectedQuestionsTemp.flagToManipulate[ij] = "false";
              this.selectedQuestions.key[key] = "lb" + (ij + 1);
            }
          }
        }
      }
      if (temp !== 10) {
        this.selectedQuestions.ques[key] = this.selectedQuestionsTemp.securityQuestions[temp];
        this.selectedQuestions.key[key] = "lb" + (temp + 1);
      } else {
        this.selectedQuestions.ques[key] = selectAQuestioni18N;
        this.selectedQuestions.key[key] = "lb0";
      }
      var questions = [];
      questions = this.getQuestions(this.selectedQuestionsTemp);
      return questions;
    },
    successCallback: function(e) {
      var t;
      this.selectedQuestionsTemp = e,
        t = this.getQuestions(e),
        this.view.lbxQuestion1.masterData = t,
        this.view.lbxQuestion2.masterData = t,
        this.view.lbxQuestion3.masterData = t,
        this.view.lbxQuestion4.masterData = t,
        this.view.lbxQuestion5.masterData = t,
        this.view.lbxQuestion1.selectedKey = "lb0",
        this.view.lbxQuestion2.selectedKey = "lb0",
        this.view.lbxQuestion3.selectedKey = "lb0",
        this.view.lbxQuestion4.selectedKey = "lb0",
        this.view.lbxQuestion5.selectedKey = "lb0",
        this.view.tbxAnswer1.text = "",
        this.view.tbxAnswer2.text = "",
        this.view.tbxAnswer3.text = "",
        this.view.tbxAnswer4.text = "",
        this.view.tbxAnswer5.text = "",
        this.disableButton(this.view.btnEditSecuritySettingsProceed)
    },
    selectedQuestions: {
      ques: [selectAQuestioni18N, selectAQuestioni18N, selectAQuestioni18N, selectAQuestioni18N, selectAQuestioni18N],
      key: ["lb0", "lb0", "lb0", "lb0", "lb0"]
    },
    selectedQuestionsTemp: {
      securityQuestions: [],
      flagToManipulate: []
    },
    responseBackend: [{
      question: "",
      SecurityID: ""
    }],
    /**
       * Method to assign onBeginEditing function of tbxAnswer1
       */
    onEditingAnswer1: function() {
      var data = [];
      data = this.view.lbxQuestion1.selectedKeyValue;
      if (data[1] === selectAQuestioni18N) {
        this.view.tbxAnswer1.maxTextLength = 0;
      } else {
        this.view.tbxAnswer1.maxTextLength = 50;
      }
    },
    /**
     * Method to assign onBeginEditing function of tbxAnswer2
     */
    onEditingAnswer2: function() {
      var data = [];
      data = this.view.lbxQuestion2.selectedKeyValue;
      if (data[1] === selectAQuestioni18N) {
        this.view.tbxAnswer2.maxTextLength = 0;
      } else {
        this.view.tbxAnswer2.maxTextLength = 50;
      }
    },
    /**
     * Method to assign onBeginEditing function of tbxAnswer3
     */
    onEditingAnswer3: function() {
      var data = [];
      data = this.view.lbxQuestion3.selectedKeyValue;
      if (data[1] === selectAQuestioni18N) {
        this.view.tbxAnswer3.maxTextLength = 0;
      } else {
        this.view.tbxAnswer3.maxTextLength = 50;
      }
    },
    /**
     * Method to assign onBeginEditing function of tbxAnswer4
     */
    onEditingAnswer4: function() {
      var data = [];
      data = this.view.lbxQuestion4.selectedKeyValue;
      if (data[1] === selectAQuestioni18N) {
        this.view.tbxAnswer4.maxTextLength = 0;
      } else {
        this.view.tbxAnswer4.maxTextLength = 50;
      }
    },
    /**
     * Method to assign onBeginEditing function of tbxAnswer5
     */
    onEditingAnswer5: function() {
      var data = [];
      data = this.view.lbxQuestion5.selectedKeyValue;
      if (data[1] === selectAQuestioni18N) {
        this.view.tbxAnswer5.maxTextLength = 0;
      } else {
        this.view.tbxAnswer5.maxTextLength = 50;
      }
    },
    /**
     * Method for saving security questions
     */
    onSaveSecurityQuestions: function() {
      var data = [{
        customerAnswer: "",
        questionId: ""
      }, {
        customerAnswer: "",
        questionId: ""
      }, {
        customerAnswer: "",
        questionId: ""
      }, {
        customerAnswer: "",
        questionId: ""
      }, {
        customerAnswer: "",
        questionId: ""
      }];
      var quesData = "";
      quesData = this.view.lbxQuestion1.selectedKeyValue;
      data[0].customerAnswer = this.view.tbxAnswer1.text;
      data[0].questionId = this.getQuestionID(quesData);
      quesData = this.view.lbxQuestion2.selectedKeyValue;
      data[1].customerAnswer = this.view.tbxAnswer2.text;
      data[1].questionId = this.getQuestionID(quesData);
      quesData = this.view.lbxQuestion3.selectedKeyValue;
      data[2].customerAnswer = this.view.tbxAnswer3.text;
      data[2].questionId = this.getQuestionID(quesData);
      quesData = this.view.lbxQuestion4.selectedKeyValue;
      data[3].customerAnswer = this.view.tbxAnswer4.text;
      data[3].questionId = this.getQuestionID(quesData);
      quesData = this.view.lbxQuestion5.selectedKeyValue;
      data[4].customerAnswer = this.view.tbxAnswer5.text;
      data[4].questionId = this.getQuestionID(quesData);
      return data;
    },
    /**
     * Method to get questionID from question
     */
    getQuestionID: function(quesData) {
      var qData;
      for (var i = 0; i < this.responseBackend.length; i++) {
        if (quesData[1] === this.responseBackend[i].SecurityQuestion) {
          qData = this.responseBackend[i].SecurityQuestion_id;
        }
      }
      return qData;
    },

    /**
     * Method to set Question for lbxQuestion5
     */
    setQuestionForListBox5: function() {
      var value = [];
      value = this.view.lbxQuestion5.selectedKeyValue;
      var data = [];
      var selectedQues = {
        ques: "null",
        key: "null"
      };
      selectedQues.ques = this.selectedQuestions.ques[4];
      selectedQues.key = this.selectedQuestions.key[4];
      var position = 4;
      data = this.getQuestionsAfterSelected(value, selectedQues, position);
      var mainData = [],
          selectedData = [];
      selectedData = this.view.lbxQuestion1.selectedKeyValue;
      mainData = this.flagManipulation(data, selectedData);
      this.view.lbxQuestion1.masterData = mainData;
      this.view.lbxQuestion1.selectedKey = selectedData[0];
      var mainData2 = [],
          selectedData2 = [];
      selectedData2 = this.view.lbxQuestion3.selectedKeyValue;
      mainData2 = this.flagManipulation(data, selectedData2);
      this.view.lbxQuestion3.masterData = mainData2;
      this.view.lbxQuestion3.selectedKey = selectedData2[0];
      var mainData3 = [],
          selectedData3 = [];
      selectedData3 = this.view.lbxQuestion4.selectedKeyValue;
      mainData3 = this.flagManipulation(data, selectedData3);
      this.view.lbxQuestion4.masterData = mainData3;
      this.view.lbxQuestion4.selectedKey = selectedData3[0];
      var mainData4 = [],
          selectedData4 = [];
      selectedData4 = this.view.lbxQuestion2.selectedKeyValue;
      mainData4 = this.flagManipulation(data, selectedData4);
      this.view.lbxQuestion2.masterData = mainData4;
      this.view.lbxQuestion2.selectedKey = selectedData4[0];
    },
    /**
         *  Method to set ui for the component in mobile breakpoint
         */
    toggleMenuMobile: function() {
      if (this.view.lblCollapseMobile.text === "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "aria-labelledby": "lblAccountSettingsMobile",
            "role": "button",
            "aria-expanded": true
          }
        };
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
      } else {
        this.view.lblCollapseMobile.text = "O";
         this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "aria-labelledby": "lblAccountSettingsMobile",
            "role": "button",
            "aria-expanded": false
          }
        };
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
      }
    },
    setSecurityQuestions: function(viewModel) {
      /**
       * Method to assign initial action on onclick of widgets
       * @param {Object} response- JSON of the questions fetched from MF
       * @param {Object} data- JSON of the questions
       */
      if (!viewModel.data.errmsg) {
        this.view.flxErrorEditSecuritySettings.setVisibility(false);
        this.responseBackend = viewModel.data;
        this.successCallback(viewModel.response);
        //this.showSetSecurityQuestions();
        FormControllerUtility.hideProgressBar(this.view);
      } 
    },
    /**
     * *@param {Boolean} isLoading- True or false to show/hide the progess bar
     *  Method to set show/hide the progess bar
     */
    changeProgressBarState: function(isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      } else {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
    postShow: function() {
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.profileMenu.flxSeperator.height = this.view.flxRight.info.frame.height;
      this.view.flxLeft.height = this.view.flxRight.info.frame.height;
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      this.view.forceLayout();
      //var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
     // this.view.imgWarning2.toolTip=kony.i18n.getLocalizedString("i18n.payments.displayError");
      this.view.lblHeading.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.customheadernew.btnSkipNav.onClick= this.skipToMainContent.bind(this);
      this.view.lblEditSecuritySettingsHeader.setActive(true);
	  this.view.tbxAnswer1.placeholder="Type your answer here for question 1";
      this.view.tbxAnswer2.placeholder="Type your answer here for question 2";
      this.view.tbxAnswer3.placeholder="Type your answer here for question 3";
      this.view.tbxAnswer4.placeholder="Type your answer here for question 4";
      this.view.tbxAnswer5.placeholder="Type your answer here for question 5";
    },
    skipToMainContent : function(){
      this.view.lblHeading.setActive(true);
    },
    onKeyPressCallBack: function(eventObject, eventPayload){
      if (eventPayload.keyCode === 27) {
        if (this.view.flxDialogs.isVisible === true) {
          this.view.flxDialogs.isVisible = false;
          this.view.customheadernew.btnLogout.setFocus(true);
        }
        if(kony.application.getCurrentBreakpoint()===640){
          if(this.view.flxLeft.isVisible === true){
            this.toggleMenuMobile();
            this.view.flxAccountSettingsCollapseMobile.setActive(true);
          }
        }
        this.view.customheadernew.onKeyPressCallBack(eventObject,eventPayload);
      }
    },
  };
});