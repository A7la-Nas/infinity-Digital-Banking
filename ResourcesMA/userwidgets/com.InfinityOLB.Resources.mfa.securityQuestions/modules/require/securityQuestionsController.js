define(function () {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      let scopeObj = this;
      scopeObj._primaryBtnEnableSkin = {};
      scopeObj._primaryBtnDisableSkin = {};
      scopeObj.securityQuestions = {};
      scopeObj._serviceId = "";
      scopeObj._serviceKey = "";
      scopeObj._objectService = "";
      scopeObj._dataModel = "";
      scopeObj._operationName = "";
      scopeObj._checkboxSelected = "";
      scopeObj._checkboxUnSelected = "";
      scopeObj._checkboxSelectedSkin = "";
      scopeObj._checkboxUnSelectedSkin = "";
      scopeObj._isPostLogin = true;
      scopeObj._action = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineSetter(this, "primaryBtnEnableSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._primaryBtnEnableSkin=val;
        }
      });
      defineGetter(this, "primaryBtnEnableSkin", function() {
        return this._primaryBtnEnableSkin;
      });
      defineSetter(this, "primaryBtnDisableSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._primaryBtnDisableSkin=val;
        }
      });
      defineGetter(this, "primaryBtnDisableSkin", function() {
        return this._primaryBtnDisableSkin;
      });
      defineSetter(this, "serviceId", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._serviceId=val;
        }
      });
      defineGetter(this, "serviceId", function() {
        return this._serviceId;
      });
      defineSetter(this, "serviceKey", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._serviceKey=val;
        }
      });
      defineGetter(this, "serviceKey", function() {
        return this._serviceKey;
      });
      defineSetter(this, "objectService", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._objectService=val;
        }
      });
      defineGetter(this, "objectService", function() {
        return this._objectService;
      });
      defineSetter(this, "dataModel", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._dataModel=val;
        }
      });
      defineGetter(this, "dataModel", function() {
        return this._dataModel;
      });
      defineSetter(this, "operationName", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._operationName=val;
        }
      });
      defineGetter(this, "operationName", function() {
        return this._operationName;
      });
      defineSetter(this, "checkboxUnSelected", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._checkboxUnSelected=val;
        }
      });
      defineGetter(this, "checkboxUnSelected", function() {
        return this._checkboxUnSelected;
      });
      defineSetter(this, "checkboxSelected", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._checkboxSelected=val;
        }
      });
      defineGetter(this, "checkboxSelected", function() {
        return this._checkboxSelected;
      });
      defineSetter(this, "checkboxSelectedSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._checkboxSelectedSkin=val;
        }
      });
      defineGetter(this, "checkboxSelectedSkin", function() {
        return this._checkboxSelectedSkin;
      });
      defineSetter(this, "checkboxUnSelectedSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._checkboxUnSelectedSkin=val;
        }
      });
      defineGetter(this, "checkboxUnSelectedSkin", function() {
        return this._checkboxUnSelectedSkin;
      });
      defineSetter(this, "isPostLogin", function(val) {
        if((typeof val === 'boolean')){
          this._isPostLogin=val;
        }
      });
      defineGetter(this, "isPostLogin", function() {
        return this._isPostLogin;
      });
      defineSetter(this, "action", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._action=val;
        }
      });
      defineGetter(this, "action", function() {
        return this._action;
      });
    },

    preShow: function () {
      this.setFlowActions();
      this.postLoginUIChanges();
    },

    postLoginUIChanges: function(){
      let scopeObj = this;
      if(scopeObj.isPostLogin){
        scopeObj.view.flxClose.setVisibility(false);
        scopeObj.view.flxActions.setVisibility(false);
        scopeObj.view.flxNotes.setVisibility(true);
        scopeObj.view.flxConfirmation.setVisibility(true);
        scopeObj.view.flxQuestions.width = "350dp";
        scopeObj.view.flxContainer.top = "20dp";
      }
    },

    setFlowActions: function () {
      let scopeObj = this;

      scopeObj.view.flxEnabledIcon.onClick = function () {
        if (scopeObj.view.lblEnabledIcon.text === scopeObj.checkboxUnSelected) {
          scopeObj.view.lblEnabledIcon.text = scopeObj.checkboxSelected;
          kony.mvc.MDAApplication.getSharedInstance().appContext.registerStatus = true;
        } else {
          scopeObj.view.lblEnabledIcon.text = scopeObj.checkboxUnSelected;
          kony.mvc.MDAApplication.getSharedInstance().appContext.registerStatus = false;
        }
      };

      scopeObj.view.tbxAnswers1.onKeyUp = function(){
        scopeObj.isValidAnswer();
      };

      scopeObj.view.tbxAnswers2.onKeyUp = function(){
        scopeObj.isValidAnswer();
      };

      scopeObj.view.btnProceed.onClick = function() {
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        var data  = scopeObj.onSaveAnswerSecurityQuestions();
        var inputparams = {
          "MFAAttributes": {
            "serviceName": scopeObj.serviceId,
            "serviceKey": scopeObj.serviceKey,
            "securityQuestions": data
          }
        };
        scopeObj.verifySecurityQuestions(inputparams);
      };

      scopeObj.view.flxClose.onClick = function(){
        if (scopeObj.closeSecurityQuestions) {
          scopeObj.closeSecurityQuestions();
        }
      };

      scopeObj.view.btnCancel.onClick = function(){
        if (scopeObj.closeSecurityQuestions) {
          scopeObj.closeSecurityQuestions();
        }
      };

      scopeObj.view.btnContinue.onClick = function() {
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        var data  = scopeObj.onSaveAnswerSecurityQuestions();
        var inputparams = {
          "MFAAttributes": {
            "serviceName": scopeObj.serviceId,
            "serviceKey": scopeObj.serviceKey,
            "securityQuestions": data
          }
        };
        scopeObj.verifySecurityQuestions(inputparams);
      };

    },

    setText : function (widgetID, text) {
      switch (typeof text) {
        case 'string': widgetID.text = text;         // if text parameter is a string
          widgetID.accessibilityConfig = {
            "a11yLabel": text
          };
          break;
        case 'object': if (text !== null && typeof text.text !== 'undefined') {         // if text parameter is an object and contains some text
          widgetID.text = text.text;
          widgetID.accessibilityConfig = {
            "a11yLabel": text.text
          };
        }
          break;
        default: widgetID.text = "";         // if text parameter is undefined
          widgetID.accessibilityConfig = {
            "a11yLabel": ""
          };
      }
    },

    disableButton : function(button){
      let scopeObj = this;
      let skins = JSON.parse(scopeObj.primaryBtnDisableSkin);
      button.setEnabled(false);
      button.skin = "sknBtnBlockedSSPFFFFFF15Px";
      button.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";
      button.focusSkin = "sknBtnBlockedSSPFFFFFF15Px";
    },

    enableButton : function(button) {
      let scopeObj = this;
      let skins = JSON.parse(scopeObj.primaryBtnEnableSkin);
      button.setEnabled(true);
      button.skin = "sknBtnSSPBg0273e3Border0273e3";
      button.hoverSkin = "sknBtnHoverSSPFFFFFF15Px";
      button.focusSkin = "sknBtnSSPBg0273e3Border0273e3";
    },

    showSecurityQuestions: function (response) {
      let scopeObj = this;
      scopeObj.serviceKey = response.MFAAttributes.serviceKey;
      scopeObj.setSecurityQuestionsUI(response);
      scopeObj.onBreakpointChange();
      if (scopeObj.forceLayout) {
        scopeObj.forceLayout();
      }
    },

    setSecurityQuestionsUI: function (response) {
      let scopeObj = this;
      scopeObj.securityQuestions = response.MFAAttributes.securityQuestions;
      scopeObj.view.lblWrongOTP.setVisibility(false);
      if (kony.mvc.MDAApplication.getSharedInstance().appContext.rememberMeStatus) {
        //scopeObj.view.flxActions.isVisible = !scopeObj.isPostLogin;
        //scopeObj.view.flxRegisterDevice.isVisible = true;
        //scopeObj.setText(scopeObj.view.lblAlertDescription, kony.i18n.getLocalizedString("i18n.mfaprelogin.registerthisdevice"));
      } else {
        scopeObj.view.flxRegisterDevice.isVisible = false;
      }
      if (scopeObj.securityQuestions) {
        scopeObj.view.tbxAnswers1.text = "";
        scopeObj.view.tbxAnswers2.text = "";
        scopeObj.setText(scopeObj.view.lblHeading2, kony.i18n.getLocalizedString("i18n.mfa.newDeviceDetectedSecurityQues"));
        scopeObj.bindUIForSecurityQuestionsMFAScreen(scopeObj.securityQuestions);
        scopeObj.disableButton(scopeObj.view.btnProceed);
        scopeObj.disableButton(scopeObj.view.btnContinue);
      }
      if (response.MFAAttributes.remainingFailedAttempts && parseInt(response.MFAAttributes.remainingFailedAttempts) > 0) {
        scopeObj.setText(scopeObj.view.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.incorrectanswer") + response.MFAAttributes.remainingFailedAttempts + " " + kony.i18n.getLocalizedString("i18n.mfa.remainingAttempts"));
        scopeObj.view.lblWrongOTP.setVisibility(true);
        if (scopeObj.view.lblEnabledIcon.text === scopeObj.checkboxSelected) {
          scopeObj.view.lblEnabledIcon.text = scopeObj.checkboxUnSelected;
          kony.mvc.MDAApplication.getSharedInstance().appContext.registerStatus = false;
        }
        if(scopeObj.isPostLogin){
          scopeObj.view.lblWrongOTP.setVisibility(false);
          scopeObj.onFailureCallback(scopeObj.view.lblWrongOTP.text);
        }
      } else if(response.MFAAttributes.remainingFailedAttempts && parseInt(response.MFAAttributes.remainingFailedAttempts) === 0 && scopeObj.errorMFANavigation) {
        scopeObj.errorMFANavigation(response);
      }
      kony.application.dismissLoadingScreen();
    },

    bindUIForSecurityQuestionsMFAScreen: function() {
      let scopeObj = this;
      if(scopeObj.securityQuestions.length === 2){
        scopeObj.view.flxAnswerSecurityQuestionsQASet2.setVisibility(true);
        scopeObj.setText(scopeObj.view.lblSecurityQuestion1Desc, scopeObj.securityQuestions[0].Question);
        scopeObj.setText(scopeObj.view.lblSecurityQuestion2Desc, scopeObj.securityQuestions[1].Question);
      }else{
        scopeObj.setText(scopeObj.view.lblSecurityQuestion1Desc, scopeObj.securityQuestions[0].Question);
        scopeObj.view.flxAnswerSecurityQuestionsQASet2.setVisibility(false);
      }
    },

    isValidAnswer:function(){
      let scopeObj = this;
      var answer1 = scopeObj.view.tbxAnswers1.text;
      var answer2 = scopeObj.view.flxAnswerSecurityQuestionsQASet2.isVisible ? scopeObj.view.tbxAnswers2.text : "abc";
      if(answer1 === "" || answer2 === ""){
        scopeObj.disableButton(scopeObj.view.btnProceed);
        scopeObj.disableButton(scopeObj.view.btnContinue);
      }else{
        scopeObj.enableButton(scopeObj.view.btnProceed);
        scopeObj.enableButton(scopeObj.view.btnContinue);
      }
    },

    onSaveAnswerSecurityQuestions:function(){
      let scopeObj = this;
      var data = [{
        customerAnswer: "",
        questionId: ""
      }, {
        customerAnswer: "",
        questionId: ""
      }];
      var quesData = "";
      quesData = scopeObj.view.lblSecurityQuestion1Desc.text;
      data[0].customerAnswer = scopeObj.view.tbxAnswers1.text;
      data[0].questionId = scopeObj.getQuestionIDForAnswer(quesData,scopeObj.securityQuestions);
      quesData =  scopeObj.view.lblSecurityQuestion2Desc.text;
      data[1].customerAnswer = scopeObj.view.tbxAnswers2.text;
      data[1].questionId = scopeObj.getQuestionIDForAnswer(quesData,scopeObj.securityQuestions);
      return data;
    },

    getQuestionIDForAnswer: function(quesData,responseBackend) {
      var qData;
      for (var i = 0; i < responseBackend.length; i++) {
        if (quesData === responseBackend[i].Question) {
          qData = responseBackend[i].SecurityQuestion_id;
        }
      }
      return qData;
    },

    showIncorrectSecurityAnswerError:function(error){
      let scopeObj = this;
      scopeObj.setText(scopeObj.view.lblWrongOTP, error.errmsg);
      scopeObj.view.tbxAnswers1.text ="";
      scopeObj.view.tbxAnswers2.text = "";
      scopeObj.disableButton(scopeObj.view.btnProceed);
      scopeObj.disableButton(scopeObj.view.btnContinue);
      if(scopeObj.isPostLogin && scopeObj.view.lblWrongOTP.isVisible){
        scopeObj.view.lblWrongOTP.setVisibility(false);
        scopeObj.onFailureCallback(scopeObj.view.lblWrongOTP.text);
      }
      kony.application.dismissLoadingScreen();
    },

    onBreakpointChange : function(){
      let scopeObj = this;
      let breakpoint = kony.application.getCurrentBreakpoint();
      if(breakpoint === 640 || breakpoint === 768) {
        scopeObj.view.flxAnswerSecurityQuestions.width = "85%";
        scopeObj.view.flxHeaderText.layoutType = kony.flex.FLOW_VERTICAL;
        scopeObj.view.lblQuestionImage.centerX = "50%";
        scopeObj.view.lblHeading2.centerX = "50%";
        scopeObj.view.lblHeading2.left = "0dp";
        scopeObj.view.lblHeading2.width = "100%";
        scopeObj.view.lblQuestions1.width = "16%";
        scopeObj.view.lblSecurityQuestion1Desc.width = "87%";
        scopeObj.view.lblQuestions2.width = "16%";
        scopeObj.view.lblSecurityQuestion2Desc.width = "87%";
        scopeObj.view.btnProceed.width = "85%";
      } else if(breakpoint === 1024) {
        scopeObj.view.flxAnswerSecurityQuestions.width = "85%";
        scopeObj.view.flxHeaderText.layoutType = kony.flex.FLOW_VERTICAL;
        scopeObj.view.lblQuestionImage.centerX = "50%";
        scopeObj.view.lblHeading2.centerX = "50%";
        scopeObj.view.lblHeading2.left = "0dp";
        scopeObj.view.lblHeading2.width = "100%";
        scopeObj.view.lblQuestions1.width = "14%";
        scopeObj.view.lblSecurityQuestion1Desc.width = "85%";
        scopeObj.view.lblQuestions2.width = "14%";
        scopeObj.view.lblSecurityQuestion2Desc.width = "85%";
        scopeObj.view.btnProceed.width = "85%";
      } else {
        scopeObj.view.flxAnswerSecurityQuestions.width = scopeObj.isPostLogin ? "90%" : "350dp";
        scopeObj.view.flxHeaderText.layoutType = kony.flex.FLOW_HORIZONTAL;
        scopeObj.view.lblQuestionImage.centerX = "";
        scopeObj.view.lblHeading2.centerX = "";
        scopeObj.view.lblHeading2.left = "15dp";
        scopeObj.view.lblHeading2.width = "270dp";
        scopeObj.view.lblQuestions1.width = "22%";
        scopeObj.view.lblSecurityQuestion1Desc.width = "77%";
        scopeObj.view.lblQuestions2.width = "22%";
        scopeObj.view.lblSecurityQuestion2Desc.width = "77%";
        scopeObj.view.btnProceed.width = "150dp";
      }
    },

    verifySecurityQuestions: function(params){
      let scopeObj = this;
      var objSvc = kony.sdk.getCurrentInstance().getObjectService(scopeObj.objectService, {
        "access": "online"
      });
      if(scopeObj.action)
        params.Action = scopeObj.action;
      var dataObject = new kony.sdk.dto.DataObject(scopeObj.dataModel);
      for(var key in params){
        dataObject.addField(key,params[key]);
      }
      var options = {
        "dataObject": dataObject
      };
      function completionCallback(status, data, error) {
        let hasError = data === undefined || data.hasOwnProperty("dbpErrCode") || data.hasOwnProperty("dbpErrMsg") || data.opstatus.toString() !== "0";
        if(status == kony.mvc.constants.STATUS_SUCCESS && !hasError){
          scopeObj.verifyAnswersSuccess(data);
        } else {
          scopeObj.verifyAnswersFailure(hasError && data ? data : error);
        }
      }
      var userobj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj.dataModel);
      userobj.customVerb(scopeObj.operationName, params, completionCallback);
    },

    verifyAnswersSuccess: function(response){
      if (response.MFAAttributes) {
        this.showSecurityQuestions(response);
      }
      else if(this.onSuccessCallback){
        response.serviceKey = this.serviceKey;
        this.onSuccessCallback(response);
      }
    },

    verifyAnswersFailure: function(response){
      let scopeObj = this;
      if (!(response.dbpErrCode >= 10500 && response.dbpErrCode <= 10700)) {
        if (scopeObj.onFailureCallback) {
          scopeObj.onFailureCallback(response, true);
        }
        let errorMessage = (response.details && response.details.errmsg)  ? response.details.errmsg : ((response.errmsg && response.errmsg.errorMessage) ? response.errmsg.errorMessage: "User does not exist.");
        scopeObj.view.setVisibility(false);
        if (scopeObj.onFailureCallback) {
          scopeObj.onFailureCallback(errorMessage);
        }
      } else {
        scopeObj.showIncorrectSecurityAnswerError(response);
      }
    },
    

  };
});