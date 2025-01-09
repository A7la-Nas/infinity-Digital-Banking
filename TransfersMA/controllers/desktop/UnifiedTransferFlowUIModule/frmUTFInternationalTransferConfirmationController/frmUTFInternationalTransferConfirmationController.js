define(['FormControllerUtility', 'CommonUtilities'], function (FormControllerUtility, CommonUtilities) {
  return {
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.onHide = this.onHide;
    },
    onBreakpointChange: function (form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.unifiedTransfer.TransfersConfirmation");     
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },
    preShow: function () {
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
      this.view.flxFormContent.doLayout = function () {
        if(this.view.flxFooter.info.height!== undefined){
          this.view.flxMain.minHeight = this.view.flxFormContent.frame.height - this.view.flxFooter.info.height + "dp";
        }
      }.bind(this);
      this.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
      this.view.lblConfirm.text = kony.i18n.getLocalizedString("i18n.unifiedTransfer.TransfersConfirmation");
    },
    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.flxDialogs.zIndex = 1200;
      var self = this;
      this.view.customheadernew.btnSkipNav.onClick = function(){
        self.view.lblConfirm.setActive(true);
      }
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
    },
    onKeyPressCallBack: function (eventObject, eventPayload) {
      if (eventPayload.keyCode === 27) {
          if (this.view.flxLogout.isVisible === true) {
              this.view.flxLogout.setVisibility(false);
              this.view.flxDialogs.setVisibility(false);
              this.view.customheadernew.btnLogout.setFocus(true);
          }
      }
      this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
    },
    onHide: function () {
      this.view.UnifiedTransferConfirm.unsubscribeStore();
    },

    onNavigate: function (param) {
      this.view.UnifiedTransferConfirm.setContext(param);
      this.view.flxMakeTransferError.setVisibility(false);
      this.view.GenericMessageNew.setVisibility(false);
      if(param.Transaction.messageDetails){
        param.Transaction["warn"] = true;
        this.view.flxMakeTransferError.setVisibility(true);
        this.view.GenericMessageNew.setVisibility(true);
        this.view.GenericMessageNew.setContext(param.Transaction);
      }
      this.view.UnifiedTransferConfirm.buttonConfirmOnClick = this.buttonConfirmOnClick;
      this.view.UnifiedTransferConfirm.buttonModifyOnClick = this.buttonModifyOnClick;
      this.view.UnifiedTransferConfirm.btnCancelOnClick = this.buttonCancelOnClick;
      this.view.UnifiedTransferConfirm.confirmTransferMFA = this.confirmTransferMFA;
      this.view.UnifiedTransferConfirm.onError = this.onError;
    },
    confirmTransferMFA: function (params) {
      var navMan = kony.mvc.getNavigationManager();
      if (params.MFAAttributes.MFAType === "SECURE_ACCESS_CODE") {
        navMan.navigate(
          {
          context: this,
          params: params,
          callbackModelConfig : {
            "frm": "frmUTFEmailOrSMS", 
            "appName": "TransfersMA" }
        });
      } else if (params.MFAAttributes.MFAType === "SECURITY_QUESTIONS") {
        navMan.navigate(
          {
          context: this,
          params: params,
          callbackModelConfig : {
            "frm": "frmUTFSecurityQuestions", 
             "appName": "TransfersMA" }
        });
      }
    },
    buttonConfirmOnClick: function (param) {
      var navMan = kony.mvc.getNavigationManager();
      navMan.navigate(
        {
          context: this,
          params: param,
          callbackModelConfig : {
            "frm": "frmUTFInternationalTransferAcknowledgement", 
            "appName": "TransfersMA" }
        });
    },
    buttonModifyOnClick: function (param) {
      var addedParam = (!kony.sdk.isNullOrUndefined(param.Collection) && Object.keys(param.Collection).length > 0) ? param.Collection : param;
      const transferFlow = (addedParam.transferFlow === "Edit" || addedParam.transferFlow === "EditModify") ? "EditModify" : "Modify";
      var params = {
        "transferType": addedParam.Transaction.transferType,
        "transferFlow": transferFlow,
        "ErrorDetails": addedParam.ErrorDetails
      };
      kony.mvc.getNavigationManager().navigate(
        {
          context: this,
          params: params,
          callbackModelConfig : {
            "frm": "frmUTFInternationalTransfer",
            "appName": "TransfersMA" }
        });
    },
    buttonCancelOnClick: function () {
      kony.mvc.getNavigationManager().navigate(
          {
          context: this,
          callbackModelConfig : {
            "frm": "frmUTFLanding", 
             "appName": "TransfersMA" }
        
        });
    },
    /**
     * updateFormUI - the entry point method for the form controller.
     * @param {Object} viewModel - it contains the set of view properties and keys.
     */
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @return : NA
     */
    onError: function (err) {
     kony.print(JSON.stringify(err));
    },
  };
});