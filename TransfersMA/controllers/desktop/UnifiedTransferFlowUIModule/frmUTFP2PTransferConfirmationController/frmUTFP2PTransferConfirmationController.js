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
      var self = this;
      this.view.flxFormContent.doLayout = function () {
        if(this.view.flxFooter.info.height!== undefined){
          this.view.flxMain.minHeight = this.view.flxFormContent.frame.height - this.view.flxFooter.info.height + "dp";
        }
      }.bind(this);
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
      this.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
      this.view.lblConfirm.text = kony.i18n.getLocalizedString("i18n.unifiedTransfer.TransfersConfirmation");
      this.view.customheadernew.btnSkipNav.onClick = function() {
                self.view.lblConfirm.setActive(true);
            }
    },

    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.customheadernew.collapseAll();
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
    },
    onKeyPressCallBack: function(eventObject, eventPayload){
      if (eventPayload.keyCode === 27) {
        if (this.view.flxDialogs.isVisible === true) {
          this.view.flxDialogs.isVisible = false;
          this.view.customheadernew.btnLogout.setFocus(true);
        }
        this.view.customheadernew.onKeyPressCallBack(eventObject,eventPayload);
      }
    },

    onHide: function() {
      this.view.UnifiedTransferConfirm.unsubscribeStore();
    },

    onNavigate: function (param) {
      if(!kony.sdk.isNullOrUndefined(param.context)){
        param = param.context;
      }
      this.view.UnifiedTransferConfirm.setContext(param);
      this.view.UnifiedTransferConfirm.buttonConfirmOnClick = this.buttonConfirmOnClick;
      this.view.UnifiedTransferConfirm.buttonModifyOnClick = this.buttonModifyOnClick;
      this.view.UnifiedTransferConfirm.btnCancelOnClick = this.buttonCancelOnClick;
      this.view.UnifiedTransferConfirm.confirmTransferMFA = this.confirmTransferMFA;
      this.view.UnifiedTransferConfirm.onError = this.onError;
    },
    confirmTransferMFA: function (params) {
      var navMan = kony.mvc.getNavigationManager();
      if (params.MFAAttributes.MFAType === "SECURE_ACCESS_CODE") {
        navMan.navigate({
          context: this,
          params:params,
          callbackModelConfig:{
            "frm":"frmUTFEmailOrSMS",
            "appName": "TransfersMA"
          }
        });
                       
      }
      else if (params.MFAAttributes.MFAType === "SECURITY_QUESTIONS") {
        navMan.navigate({
          context: this,
          params:params,
          callbackModelConfig:{
            "frm":"frmUTFSecurityQuestions",
            "appName": "TransfersMA"
          }
        });
      }
    },

    buttonConfirmOnClick: function (param) {
      var obj = {
        "context": this,
        "params": {
          "params":param
        },
        "callbackModelConfig": {
          "buttonConfirmClick":true
        }
      };
      var navManager = kony.mvc.getNavigationManager();
      navManager.navigate(obj);
    },

    buttonModifyOnClick: function (param) {
      var addedParam = (!kony.sdk.isNullOrUndefined(param.Collection) && Object.keys(param.Collection).length > 0) ? param.Collection : param;
      //adding transferFlow variable for modify flow
      var params = {
        "transferType": addedParam.Transaction.transferType,
        "transferFlow": "Modify",
        "ErrorDetails": addedParam.ErrorDetails
      };
      var obj = {
        "context": this,
        "params": {
          "params":params
        },
        "callbackModelConfig": {
          "buttonModifyClick":true
        }
      };
      var navManager = kony.mvc.getNavigationManager();
      navManager.navigate(obj);
    },

    buttonCancelOnClick: function () {
      var navManager = kony.mvc.getNavigationManager();
      navManager.navigate(
        {
          context:this,
          params:{},
          callbackModelConfig:{
            "buttonCancelClick" : true
          }
        }
      );
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