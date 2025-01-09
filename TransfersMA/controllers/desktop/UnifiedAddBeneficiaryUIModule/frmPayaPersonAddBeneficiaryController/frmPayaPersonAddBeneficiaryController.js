define(['FormControllerUtility','CommonUtilities'], function (FormControllerUtility,CommonUtilities) {
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
      this.view.flxAddSameBankAccount.onTouchStart = this.sameBankTransfer;
      this.view.flxAddDomesticAccount.onTouchStart = this.domesticTransfer;
      this.view.flxAddInternationalAccount.onTouchStart = this.internationalTransfer;
      this.view.flxAddPersonToPerson.onTouchStart = this.p2pTransfer;
      this.view.unifiedAddBeneficiary.onError = this.onError;
    },
    postShow: function () {
      var scope=this;
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      if (this.context.transferFail !== "" && (!kony.sdk.isNullOrUndefined(this.context.transferFail))) {
        this.view.flxError.setVisibility(true);
        this.view.lblError1.text = this.context.errorMessage;
        this.view.lblError2.text = this.context.transferFail;
      }
      this.view.customheadernew.collapseAll();
      this.view.CustomPopup.doLayout=CommonUtilities.centerPopupFlex;
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.customheadernew.btnSkipNav.onClick = function () {
        scope.view.lblAddNewAccount.setActive(true);
      }
      this.view.btnBypassBlock.onClick = function () {
        scope.view.flxAddSameBankAccount.setActive(true);
      }
    },
    onKeyPressCallBack: function (eventObject, eventPayload) {
      if (eventPayload.keyCode === 27) {
          if (this.view.flxDialogs.isVisible) {
              this.view.flxDialogs.isVisible = false;
          }
          this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
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
    onNavigate: function (context) {
      if (!kony.sdk.isNullOrUndefined(context.params)) {
        context = context.params;
      }
      var scope = this;
      this.context = context;
      this.view.unifiedAddBeneficiary.setContext(scope, this.context);
      this.view.imgCloseIcon.onTouchStart = this.closeErrorFlex;
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
     * @api : sameBankTransfer
     * navigate to same bank add beneficiary form
     * @return : NA
     */
    sameBankTransfer: function () {
      var selectedTrasferType = {
        "transferType": "Same Bank Transfer",
        "clickedButton": "AddNewAccount",
        "flowType": "add",
        "payeeType": "New Payee"
      };
      frmName = {
        "appName": "TransfersMA",
        "friendlyName": "frmSameBankAddBeneficiary"
      };
      applicationManager.getNavigationManager().navigateTo(frmName, false, selectedTrasferType);

      //       var scope=this;
      //       var obj = {
      //         "context": scope,
      //         "params": {
      //           "selectedTrasferType":selectedTrasferType
      //         },
      //         "callbackModelConfig": {
      //           "samebankTransfer":true
      //         }
      //       };
      //       var navManager = kony.mvc.getNavigationManager();
      //       navManager.navigate(obj);
    },
    /**
     * @api : domesticTransfer
     * navigate to domestic add beneficiary form
     * @return : NA
     */
    domesticTransfer: function () {
      var selectedTrasferType = {
        "transferType": "Domestic Transfer",
        "clickedButton": "AddNewAccount",
        "flowType": "add",
        "payeeType": "New Payee"
      };
      frmName = {
        "appName": "TransfersMA",
        "friendlyName": "frmDomesticAddBeneficiary"
      };
      applicationManager.getNavigationManager().navigateTo(frmName, false, selectedTrasferType);

      //       var scope=this;
      //       var obj = {
      //         "context": scope,
      //         "params": {
      //           "selectedTrasferType":selectedTrasferType
      //         },
      //         "callbackModelConfig": {
      //           "domesticTransfer":true
      //         }
      //       };
      //       var navManager = kony.mvc.getNavigationManager();
      //       navManager.navigate(obj);
    },
    /**
     * @api : internationalTransfer
     * navigate to international add beneficiary form
     * @return : NA
     */
    internationalTransfer: function () {
      var selectedTrasferType = {
        "transferType": "International Transfer",
        "clickedButton": "AddNewAccount",
        "flowType": "add",
        "payeeType": "New Payee"
      };
      frmName = {
        "appName": "TransfersMA",
        "friendlyName": "frmInternationalAddBeneficiary"
      };
      applicationManager.getNavigationManager().navigateTo(frmName, false, selectedTrasferType);

      //       var scope=this;
      //       var obj = {
      //         "context": scope,
      //         "params": {
      //           "selectedTrasferType":selectedTrasferType
      //         },
      //         "callbackModelConfig": {
      //           "internationalTransfer":true
      //         }
      //       };
      //       var navManager = kony.mvc.getNavigationManager();
      //       navManager.navigate(obj);
    },
    /**
     * @api : p2pTransfer
     * navigate to pay a person add beneficiary form
     * @return : NA
     */
    p2pTransfer: function () {
      var selectedTrasferType = {
        "transferType": "Pay a Person",
        "clickedButton": "AddNewAccount",
        "flowType": "add",
        "payeeType": "New Payee"
      };
      frmName = {
        "appName": "TransfersMA",
        "friendlyName": "frmPayaPersonAddBeneficiary"
      };
      applicationManager.getNavigationManager().navigateTo(frmName, false, selectedTrasferType);

      //       var scope=this;
      //       var obj = {
      //         "context": scope,
      //         "params": {
      //           "selectedTrasferType":selectedTrasferType
      //         },
      //         "callbackModelConfig": {
      //           "p2pTransfer":true
      //         }
      //       };
      //       var navManager = kony.mvc.getNavigationManager();
      //       navManager.navigate(obj);
    },
    /**
     * continueAddBeneficiary
     * @api : continueAddBeneficiary
     * Method to perform continue navigation action
     * @return : NA
     */
    continueAddBeneficiary: function (params) {
      var scope = this;
      var formName;
      if (params.contractListData.hasOwnProperty("isSingleProfile")) {
        params.isSingleCustomer = params.contractListData["isSingleProfile"].toString();
        var obj = {
          "context": scope,
          "params": {
            "params": params
          },
          "callbackModelConfig": {
            "continueAddBen": params.contractListData["isSingleProfile"]
          }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
      }
    },
    /**
     * @api : confirmCancel
     * navigates to landing screen										   
     * @return : NA
     */
    confirmCancel: function () {
      //       var scope=this;
      //       var obj = {
      //         "context": scope,
      //         "params": {
      //         },
      //         "callbackModelConfig": {
      //           "buttonConfirmCancel":true
      //         }
      //       };
      //       var navManager = kony.mvc.getNavigationManager();
      //       navManager.navigate(obj);

      new kony.mvc.Navigation({
        "appName": "TransfersMA",
        "friendlyName": "frmUTFLanding"
      }).navigate();
    },
    /**
     * onError
     * Error thrown from catch block and shown on the form
     *  
     */
    onError: function (err) {
      kony.application.dismissLoadingScreen();
     kony.print(JSON.stringify(err));
    },
    /**
     * @api : closeErrorFlex
     * closes the error flex
     * @return : NA
     */
    closeErrorFlex: function () {
      this.view.flxError.setVisibility(false);
    },
    showSameBankCreateOption: function () {
      this.view.flxAddSameBankAccount.setVisibility(true);
    },
    hideSameBankCreateOption: function () {
      this.view.flxAddSameBankAccount.setVisibility(false);
    },
    showDomesticCreateOption: function () {
      this.view.flxAddDomesticAccount.setVisibility(true);
    },
    hideDomesticCreateOption: function () {
      this.view.flxAddDomesticAccount.setVisibility(false);
    },
    showInternationalCreateOption: function () {
      this.view.flxAddInternationalAccount.setVisibility(true);
    },
    hideInternationalCreateOption: function () {
      this.view.flxAddInternationalAccount.setVisibility(false);
    },
    showP2PCreateOption: function () {
      this.view.flxAddPersonToPerson.setVisibility(true);
    },
    hideP2PCreateOption: function () {
      this.view.flxAddPersonToPerson.setVisibility(false);
    },
  };

});