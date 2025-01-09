define(['ApplicationManager', 'OLBConstants', './rmsCallController'], function (ApplicationManager, OLBConstants, rmsCallController) {

  return {
    contructor: function () {
      this.userNameStatusIdMap = new Map();
      this.userNameUserIdMap = new Map();
    },
    sknErrorFlex: "sknborderff0000error",
    sknNormalFlex: "sknBorderE3E3E3",
    sknFocusSkin: "sknFlxBorder4A90E23px",
    sknBlockedBtn: "sknBtnBlockedSSP0273e315px",
    sknNormalBtn: "sknBtnNormalSSPFFFFFF15Px",
    sknHoverBtn: "sknBtnNormalSSPFFFFFFHover15Px",
    sknFocusBtn: "sknBtnNormalSSPFFFFFF15PxFocus",

    preshow: function () {
      this.SCARiskAssessment();
      this.resetScopeVariables();
      this.setFlowActions();
      this.view.regenerateCode.fontIconOption.skin = "sknFontIconSignin0273E324Px";
      this.validationUtilManager = ApplicationManager.getApplicationManager().getValidationUtilManager();
    },
    SCARiskAssessment: function () {
      if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT.toUpperCase() === "TRUE")
        isSCARMSEnabled = "true";
      else
         isSCARMSEnabled = "false";
    },
    postShow: function () {
      this.onBreakpointChange();
    },
    resetScopeVariables: function () {
      this.userNameStatusIdMap = new Map();
      this.userNameUserIdMap = new Map();
    },
    setFlowActions: function () {
      let scopeObj = this;
      scopeObj.view.tbxEmailAddress.onKeyUp = function () {
        scopeObj.enableContinue();
      };
      scopeObj.view.tbxEmailAddress.onTouchStart = function () {
        scopeObj.setFocusSkin(scopeObj.view.flxEmailAddress);
      };
      scopeObj.view.tbxEmailAddress.onEndEditing = function () {
        scopeObj.setNormalSkin(scopeObj.view.flxEmailAddress);
      };
      scopeObj.view.tbxCountryCode.onKeyUp = function () {
        scopeObj.enableContinue();
      };
      scopeObj.view.tbxCountryCode.onTouchStart = function () {
        scopeObj.setFocusSkin(scopeObj.view.flxCountryCode);
      };
      scopeObj.view.tbxCountryCode.onEndEditing = function () {
        scopeObj.setNormalSkin(scopeObj.view.flxCountryCode);
      };
      scopeObj.view.tbxMobileNumber.onKeyUp = function () {
        scopeObj.enableContinue();
      };
      scopeObj.view.tbxMobileNumber.onTouchStart = function () {
        scopeObj.setFocusSkin(scopeObj.view.flxMobileNumber);
      };
      scopeObj.view.tbxMobileNumber.onEndEditing = function () {
        scopeObj.setNormalSkin(scopeObj.view.flxMobileNumber);
      };
      scopeObj.view.tbxCaptcha.onKeyUp = function () {
        scopeObj.enableContinue();
      };
      scopeObj.view.tbxCaptcha.onTouchStart = function () {
        scopeObj.setFocusSkin(scopeObj.view.flxCaptchaText);
      };
      scopeObj.view.tbxCaptcha.onEndEditing = function () {
        scopeObj.setNormalSkin(scopeObj.view.flxCaptchaText);
      };
      scopeObj.view.lstBoxSelectUsername.onSelection = () => {
        scopeObj.view.lblSelectedUsername.text = scopeObj.view.lstBoxSelectUsername.selectedKey;
      };
      scopeObj.view.tbxPassword.onTouchStart = function () {
        scopeObj.setFocusSkin(scopeObj.view.flxPassword);
      };
      scopeObj.view.tbxPassword.onKeyUp = function () {
        scopeObj.enableOrDisbaleButton(scopeObj.view.btnContinue, scopeObj.view.tbxPassword.text.length > 0);
      };
      scopeObj.view.tbxPassword.onEndEditing = function () {
        scopeObj.setNormalSkin(scopeObj.view.flxPassword);
        scopeObj.enableOrDisbaleButton(scopeObj.view.btnContinue, scopeObj.view.tbxPassword.text.length > 0);
      };
      scopeObj.view.btnContinue.onClick = function () {
        scopeObj.validatePassword();
      };
      scopeObj.view.btnHome.onClick = function () {
        scopeObj.view.flxClose.onClick();
      };
     
    },
    validatePasswordScreen: function () {
      let scopeObj = this;
      scopeObj.view.flxWelcomeBack.setVisibility(false);
      scopeObj.view.flxVerifyPassword.setVisibility(true);
      scopeObj.view.flxContent.forceLayout();
    },
    onBreakpointChange: function () {
      let scopeObj = this;
      let breakpoint = kony.application.getCurrentBreakpoint();
      let isMobilebreakpoint = (breakpoint === 640 || breakpoint === 768);
      if (isMobilebreakpoint || breakpoint === 1024) {
        scopeObj.view.flxLetsVerifyCntr.layoutType = kony.flex.FLOW_VERTICAL;
        scopeObj.view.flxHeader.height = "160dp";
        scopeObj.view.flxLetsVerifyCntr.height = "100dp";
        scopeObj.view.flxUserVerify.centerX = "50%";
        scopeObj.view.lblLetsVerify.width = "";
        scopeObj.view.lblLetsVerify.centerX = "50%";
        scopeObj.view.lblLetsVerify.top = "0dp";
        scopeObj.view.flxWelcomeBackHeader.layoutType = kony.flex.FLOW_VERTICAL;
        scopeObj.view.flxWelcomeBackHeader.height = "100dp";
        scopeObj.view.flxWelcomeBackImg.centerX = "50%";
        scopeObj.view.lblWelcomeBack.width = "";
        scopeObj.view.lblWelcomeBack.centerX = "50%";
      } else {
        scopeObj.view.flxLetsVerifyCntr.layoutType = kony.flex.FLOW_HORIZONTAL;
        scopeObj.view.flxHeader.height = "120dp";
        scopeObj.view.flxLetsVerifyCntr.height = "60dp";
        scopeObj.view.flxUserVerify.centerX = "";
        scopeObj.view.lblLetsVerify.width = "75%";
        scopeObj.view.lblLetsVerify.centerX = "";
        scopeObj.view.lblLetsVerify.top = "10dp";
        scopeObj.view.flxWelcomeBackHeader.layoutType = kony.flex.FLOW_HORIZONTAL;
        scopeObj.view.flxWelcomeBackHeader.height = "60dp";
        scopeObj.view.flxWelcomeBackImg.centerX = "";
        scopeObj.view.lblWelcomeBack.centerX = "";
      }
      scopeObj.setSkins();
    },
    setFocusSkin: function (flexWidget) {
      flexWidget.skin = this.sknFocusSkin;
    },
    setNormalSkin: function (flexWidget) {
      flexWidget.skin = this.sknNormalFlex;
    },
    setErrorSkin: function (flexWidget) {
      flexWidget.skin = this.sknErrorFlex;
    },
    setSkins: function (isMobilebreakpoint) {
      let scopeObj = this;
      scopeObj.sknNormalBtn = isMobilebreakpoint ? "sknBtnNormalSSPFFFFFF13Px" : "sknBtnNormalSSPFFFFFF15Px";
      scopeObj.hoverSkin = isMobilebreakpoint ? "sknBtnNormalSSPFFFFFFHover13Px" : "sknBtnNormalSSPFFFFFFHover15Px";
      scopeObj.focusSkin = isMobilebreakpoint ? "sknBtnNormalSSPFFFFFF13PxFocus" : "sknBtnNormalSSPFFFFFF15PxFocus";
      scopeObj.sknBlockedBtn = isMobilebreakpoint ? "sknBtnBlockedSSP0273e313px" : "sknBtnBlockedSSP0273e315px";
      scopeObj.view.lblLetsVerify.skin = isMobilebreakpoint ? "sknLblSSP42424215px" : "sknlblSSPreg42424220px";
      scopeObj.view.lblErrorMsg.skin = isMobilebreakpoint ? "sknlblSSPff000013px" : "sknLabelSSPFF000015Px";
      scopeObj.view.lblEmailAddress.skin = isMobilebreakpoint ? "sknLblSSP72727213px" : "sknLblSSP72727215px";
      scopeObj.view.lblMobileNumber.skin = isMobilebreakpoint ? "sknLblSSP72727213px" : "sknLblSSP72727215px";
      scopeObj.view.lblDOB.skin = isMobilebreakpoint ? "sknLblSSP72727213px" : "sknLblSSP72727215px";
      scopeObj.view.lblCallUs.skin = isMobilebreakpoint ? "sknLblSSP42424213px" : "sknSSP42424215Px";
      scopeObj.view.tbxEmailAddress.skin = isMobilebreakpoint ? "sknTbxSSP42424213PxWithoutBorder" : "sknTbxSSP42424215PxWithoutBorder";
      scopeObj.view.tbxMobileNumber.skin = isMobilebreakpoint ? "sknTbxSSP42424213PxWithoutBorder" : "sknTbxSSP42424215PxWithoutBorder";
      scopeObj.view.DateInput.tbxDateInputKA.skin = isMobilebreakpoint ? "sknTbxSSP42424213PxWithoutBorder0Opacity" : "sknTbxSSP42424215PxWithoutBorder0Opacity";
      scopeObj.view.DateInput.lblEnteredDateKA.skin = isMobilebreakpoint ? "sknLblSSP72727213px" : "sknLblSSP72727215px";
      scopeObj.view.DateInput.lblDatePlaceholderKA.skin = isMobilebreakpoint ? "sknLblSSP72727213px" : "sknLblSSP72727215px";
      //scopeObj.view.tbxDOB.skin = isMobilebreakpoint ? "sknTbxSSP42424213PxWithoutBorder" : "sknTbxSSP42424215PxWithoutBorder";
      scopeObj.view.tbxCaptcha.skin = isMobilebreakpoint ? "sknTbxSSP42424213PxWithoutBorder" : "sknTbxSSP42424215PxWithoutBorder";
      scopeObj.view.lblWelcomeBack.skin = isMobilebreakpoint ? "sknLblSSP42424215px" : "sknlblSSPreg42424220px";
      scopeObj.view.lblUsername.skin = isMobilebreakpoint ? "sknLblSSP42424215px" : "sknlblSSPreg42424220px";
      scopeObj.view.resetPassword.rtxCVV.skin = isMobilebreakpoint ? "sknSSPLight0273E313Px" : "sknSSPLight0273E315Px";
      scopeObj.view.signInNow.rtxCVV.skin = isMobilebreakpoint ? "sknSSPLight0273E313Px" : "sknSSPLight0273E315Px";
      scopeObj.view.regenerateCode.lblName.skin = isMobilebreakpoint ? "sknSSP4176a413px" : "sknSSP4176a415px";
    },
    resetUI: function () {
      let scopeObj = this;
      scopeObj.view.flxVerify.setVisibility(true);
      scopeObj.view.flxWelcomeBack.setVisibility(false);
      scopeObj.view.lblErrorMsg.setVisibility(false);
      scopeObj.view.flxOptions.setVisibility(true);
      scopeObj.view.flxRegenerateCode.setVisibility(false);
      scopeObj.view.flxCongratulations.setVisibility(false);
      scopeObj.view.flxVerifyPassword.setVisibility(false);
      scopeObj.view.lblError1.setVisibility(false);
      scopeObj.view.lblError.setVisibility(false);
      scopeObj.view.flxClose.setVisibility(true);
      scopeObj.view.tbxEmailAddress.text = "";
      scopeObj.view.tbxMobileNumber.text = "";
      scopeObj.view.DateInput.setText("");
      scopeObj.view.tbxCaptcha.text = "";
      scopeObj.view.tbxCountryCode.text = "";
      scopeObj.view.tbxPassword.text = "";
      scopeObj.view.lstBoxSelectUsername.selectedKey = scopeObj.view.lstBoxSelectUsername.masterData[0][0];
      scopeObj.view.lblSelectedUsername.text = scopeObj.view.lstBoxSelectUsername.selectedKey;
      scopeObj.setNormalSkin(scopeObj.view.flxEmailAddress);
      scopeObj.setNormalSkin(scopeObj.view.flxMobileNumber);
      scopeObj.setNormalSkin(scopeObj.view.flxDOB);
      scopeObj.setNormalSkin(scopeObj.view.flxCaptchaText);
      scopeObj.enableContinue();
      scopeObj.enableOrDisbaleButton(scopeObj.view.btnContinue, false);
    },
    setUsers: function (users) {
      var scopeObj = this;
      let usersList = [];
      users.forEach(function (data) {
        var user = [];
        user.push(data.UserName);
        user.push(data.UserName);
        scopeObj.userNameStatusIdMap.set(data.UserName, data.Status_id);
        scopeObj.userNameUserIdMap.set(data.UserName, data.id);
        usersList.push(user);
      });
      scopeObj.view.lstBoxSelectUsername.masterData = usersList;
      scopeObj.view.lstBoxSelectUsername.selectedKey = scopeObj.view.lstBoxSelectUsername.masterData[0][0];
      scopeObj.view.lblSelectedUsername.text = scopeObj.view.lstBoxSelectUsername.selectedKey;
      scopeObj.view.flxVerify.setVisibility(false);
      scopeObj.view.flxWelcomeBack.setVisibility(true);
        scopeObj.view.signInNow.setVisibility(false);
        scopeObj.view.lostDevice.setVisibility(true);
         scopeObj.view.lostDevice.onTouchStart = function () {
        scopeObj.SCARiskAssessment();
        if (isSCARMSEnabled == "true") {
			 kony.application.showLoadingScreen("loadingskin","Data is still Loading");
          scopeObj.action = "LOST_DEVICE";
          let typedArray = new Uint8Array(1)
          let randomValues = crypto.getRandomValues(typedArray)[0]
          let randomFloat = randomValues / Math.pow(2, 8)
          let randomValue = Math.floor(randomFloat * 10000000);
          let appSessionId = String(randomValue);

      applicationManager.setRmsUserID(scopeObj.view.lstBoxSelectUsername.selectedKey);
          var S_CB = response => {
			   kony.application.dismissLoadingScreen();
            if (response.userBlock && response.userBlock == "true") {
              let rmsUserBlock = kony.i18n.getLocalizedString("kony.sca.rms.userBlock");
              response.errmsg = rmsUserBlock;
              scopeObj.errorCallback(response);
            }
            else {
              scopeObj.validatePasswordScreen();
            }
          };
          var F_CB = response => {
			  kony.application.dismissLoadingScreen();
            scopeObj.validatePasswordScreen();
          };
          rmsCallController.rmsActionCreate(scopeObj.action, appSessionId, S_CB, F_CB);
        }
        else
          scopeObj.validatePasswordScreen();
      };
       
    },
    enableContinue: function () {
      let scopeObj = this;
      let isValidEmail = (scopeObj.view.tbxEmailAddress.text.trim() !== "") && (scopeObj.validationUtilManager.isValidEmail(scopeObj.view.tbxEmailAddress.text.trim()));
      let isValidMobile = (scopeObj.view.tbxMobileNumber.text.trim()) !== "" && (scopeObj.view.tbxCountryCode.text !== "") && (scopeObj.validationUtilManager.isValidPhoneNumber(scopeObj.view.tbxMobileNumber.text.trim()));
      let isValidDOB = (scopeObj.view.DateInput.getText() !== "") && (scopeObj.validationUtilManager.isDOBValid(scopeObj.view.DateInput.getText()));
      let isValidCatcha = (scopeObj.view.tbxCaptcha.text.trim() !== "");
      let isValidCountryCode = scopeObj.view.tbxCountryCode.text.trim() !== "";
      let isEnabled = isValidEmail && isValidMobile && isValidDOB && isValidCatcha && isValidCountryCode;
      scopeObj.enableOrDisbaleButton(scopeObj.view.btnProceed, isEnabled);
    },
    showError: function (errorMessage, flxCaptchaError) {
      let scopeObj = this;
      // Error msg text changed as suggested in AAC-7518
      scopeObj.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.login.CantSignIn.userDoesntExists");
      if (errorMessage) scopeObj.view.lblErrorMsg.text = errorMessage;
      scopeObj.view.lblErrorMsg.setVisibility(true);
      if (flxCaptchaError) scopeObj.setErrorSkin(scopeObj.view.flxCaptchaText);
      else scopeObj.setErrorSkin(scopeObj.view.flxEmailAddress);
      scopeObj.view.forceLayout();
    },
    fetchUserIdOnUserName: function (userName) {
      return this.userNameUserIdMap.get(userName);
    },
    errorCallback: function (response) {
      let scopeObj = this;
      let errmsg = response.errmsg ? response.errmsg : "Please check with administrator";
      scopeObj.view.lblError.text = errmsg;
      //scopeObj.view.lblError.setVisibility(true);
      scopeObj.view.lblError1.text = errmsg;
      scopeObj.view.lblError1.setVisibility(true);
      kony.application.dismissLoadingScreen();
      // scopeObj.view.flxPassword.skin = scopeObj.sknErrorFlex;
    },
    enableOrDisbaleButton: function (widget, isEnabled) {
      let scopeObj = this;
      widget.setEnabled(isEnabled);
      widget.skin = isEnabled ? scopeObj.sknNormalBtn : scopeObj.sknBlockedBtn;
      widget.hoverSkin = isEnabled ? scopeObj.sknHoverBtn : scopeObj.sknBlockedBtn;
      widget.focusSkin = isEnabled ? scopeObj.sknFocusBtn : scopeObj.sknBlockedBtn;
    },

    validatePassword: function () {
      let scopeObj = this;
      let request = {
        "userid": scopeObj.view.lblSelectedUsername.text,
        "password": scopeObj.view.tbxPassword.text
      };
      scopeObj.callServcie("SCAActivationObjects", "SCADevice", "lostDevice", request, scopeObj.showSuccessMsg, scopeObj.showErrorMsg);
    },

    showSuccessMsg: function () {
      let scopeObj = this;
      scopeObj.view.flxClose.setVisibility(false);
      scopeObj.view.flxVerifyPassword.setVisibility(false);
      scopeObj.view.flxCongratulations.setVisibility(true);
      scopeObj.view.flxContent.forceLayout();
      kony.application.dismissLoadingScreen();
     
    },

    showErrorMsg: function (error) {
      let scopeObj = this;
      scopeObj.view.lblError.text = error.errmsg ? error.errmsg : error;
      scopeObj.view.lblError.setVisibility(true);
      scopeObj.view.flxContent.forceLayout();
      kony.application.dismissLoadingScreen();
     
    },

    callServcie: function (objServiceName, objName, operation, payload, successCallback, errorCallback) {
      kony.application.showLoadingScreen("loadingskin","Data is still Loading");
      try {
        const objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
          "access": "online"
        });
        const dataObject = new kony.sdk.dto.DataObject(objName);
        for (let key in payload) {
          dataObject.addField(key, payload[key]);
        }
        const options = {
          "dataObject": dataObject
        };
        const serviceCallback = function (res) {
          if (res && res.errmsg) {
            kony.print(`Call FAILED ObjectService: ${objServiceName}, ObjectName: ${objName}, operation: ${operation} ` + JSON.stringify(res));
            errorCallback(res.errmsg);
          } else {
            kony.print(`Call SUCCESSFUL ObjectService: ${objServiceName}, ObjectName: ${objName}, operation: ${operation} ` + JSON.stringify(res));
            successCallback(res);
          }
        };
        const serviceErrorCallback = function (err) {
          kony.print(`Call FAILED ObjectService: ${objServiceName}, ObjectName: ${objName}, operation: ${operation} ` + JSON.stringify(err));
          errorCallback(err.errmsg);
        };
        objSvc.customVerb(operation, options, serviceCallback, serviceErrorCallback);
      } catch (err) {
        errorCallback(err);
      }
    },
  };

});
