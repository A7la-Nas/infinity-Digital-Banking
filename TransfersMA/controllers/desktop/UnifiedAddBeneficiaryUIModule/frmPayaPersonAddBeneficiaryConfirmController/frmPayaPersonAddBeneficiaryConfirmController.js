define(['FormControllerUtility','CommonUtilities'], function (FormControllerUtility, CommonUtilities) {
  return {
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
    },
    preShow: function () {
      var scope = this;
      scope.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
      this.view.confirmTransfer.onError = this.onError;
      this.view.confirmTransfer.cancelReviewYes = function () {
        //         var obj = {
        //           "context": scope,
        //           "params": {
        //           },
        //           "callbackModelConfig": {
        //             "preshowCall":true
        //           }
        //         };
        //         var navManager = kony.mvc.getNavigationManager();
        //         navManager.navigate(obj);
        new kony.mvc.Navigation({
          "appName": "TransfersMA",
          "friendlyName": "frmUTFLanding"
        }).navigate();
      };
      this.view.customheadernew.btnSkipNav.onClick = function(){
        scope.view.lblHeader.setActive(true);
      };
      this.view.title = "Pay a Person Add Beneficiary- Confirmation";
    },
    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
    },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxDialogs.isVisible === true) {
                    self.view.flxDialogs.isVisible = false;
                 }
                self.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
            }
        },
    onBreakpointChange: function (form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
     
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },
    /**
     * @api : onNavigate
     * gets invoked as soon as the control comes to the form
     * @return : NA
     */
    onNavigate: function (data) {
      if (!kony.sdk.isNullOrUndefined(data.params)) {
        data = data.params;
      }
      var scope = this;
      this.setContextForAddBeneficiaryService(data);
      this.view.confirmTransfer.setContext(data, scope);
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
     * @api : setContextForAddBeneficiaryService
     * sets the corresponding context in criteria
     * @return : NA
     */
    setContextForAddBeneficiaryService: function (context) {
      context.isVerified = "true";
      context.isSameBankAccount = "false";
      context.isInternationalAccount = "false";
      if ((!kony.sdk.isNullOrUndefined(context.emailID)) && context.emailID !== "") {
        context.primaryContact = context.emailID;
      } else if ((!kony.sdk.isNullOrUndefined(context.phoneNumber)) && context.phoneNumber !== "") {
        context.primaryContact = context.phoneNumber;
        if (!kony.sdk.isNullOrUndefined(context.countryCode))
          context.phoneNumberData = context.countryCode + " " + context.displayPhoneNumber;
        else
          context.phoneNumberData = context.displayPhoneNumber;
      } else if ((!kony.sdk.isNullOrUndefined(context.nationalID)) && context.nationalID !== "") {
        context.primaryContact = context.nationalID;
        context.phoneNumber = context.nationalID;
      }
    },
    /**
     * @api : navToack
     * navigates to acknowledgement screen
     * @return : NA
     */
    navToack: function (context) {
      var scope = this;
      var obj = {
        "context": scope,
        "params": {
        },
        "callbackModelConfig": {
          "navToack": true
        }
      };
      var navManager = kony.mvc.getNavigationManager();
      navManager.navigate(obj);
    },
    /**
     * @api : modifyTransfer
     * navigates to acknowledgement screen
     * @return : NA
     */
    modifyTransfer: function (context) {
      context.flowType = "modify";
      context.transferFail = "";
      var scope = this;
      var obj = {
        "context": scope,
        "params": {
          "params": context
        },
        "callbackModelConfig": {
          "modifyTransfer": true
        }
      };
      var navManager = kony.mvc.getNavigationManager();
      navManager.navigate(obj);
    },
    /**
     * @api : confirmTransferSuccess
     * navigates to acknowledgement screen when service gets success
     * @return : NA
     */
    confirmTransferSuccess: function (params) {
      var scope = this;
      var obj = {
        "context": scope,
        "params": {
          "params": params
        },
        "callbackModelConfig": {
          "confirmTransferSuccess": true
        }
      };
      var navManager = kony.mvc.getNavigationManager();
      navManager.navigate(obj);
    },
    /**
     * @api : confirmTransferError
     * navigates to input screen when service fails
     * @return : NA
     */
    confirmTransferError: function (params) {
      params.flowType = "modify";
      params.errorMessage = "Failed to Add Beneficiary";
      var scope = this;
      var obj = {
        "context": scope,
        "params": {
          "params": params
        },
        "callbackModelConfig": {
          "confirmTransferError": true
        }
      };
      var navManager = kony.mvc.getNavigationManager();
      navManager.navigate(obj);
    },
    /**
     * @api : onError
     * gets handled on error scenario
     * @return : NA
     */
    onError: function (errObj) {
     kony.print(JSON.stringify(errObj));
    },
  };

});