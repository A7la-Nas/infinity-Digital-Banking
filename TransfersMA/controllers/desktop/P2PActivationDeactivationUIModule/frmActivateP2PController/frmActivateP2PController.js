define(['CommonUtilities','FormControllerUtility'], function (CommonUtilities,FormControllerUtility) {
  return {
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
    },
    preShow: function () {
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxLogout']);
    },
    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      var scope = this;
      kony.application.getCurrentForm().title = this.view.lblActivate.text;
      this.view.flxLogout.isModalContainer = true;
      this.view.customheadernew.btnSkipNav.onClick = function(){
        scope.view.lblActivate.setActive(true);
      };
      this.view.flxLogout.onKeyPress = function(eventObject, eventPayload){
        if(eventPayload.keyCode === 27){
        scope.view.flxDialogs.setVisibility(false);
        scope.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
        }
      };
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.customheadernew.collapseAll();
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
    onNavigate: function (JSONData) {
      this.view.activateDeactivateP2P.onError = this.onError;
      this.view.activateDeactivateP2P.setContext(JSONData);
      this.view.activateDeactivateP2P.setHeaderLabel = this.setHeaderLabel;
      this.view.activateDeactivateP2P.onCancelTransfer = this.onCancelTransfer;
      this.view.activateDeactivateP2P.setAcknowledgementData = this.setAcknowledgementData;
      this.view.activateDeactivateP2P.failAckService = this.failAckService;
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
    onCancelTransfer: function (data) {
      var scope = this;
      //       var obj = {
      //         "context": scope,
      //         "params": {
      //           "data":data
      //         },
      //         "callbackModelConfig": {
      //           "buttonCancelclick":true
      //         }
      //       };
      //       var navManager = kony.mvc.getNavigationManager();
      //       navManager.navigate(obj);
      var navMan = applicationManager.getNavigationManager();
      new kony.mvc.Navigation({
        "appName": "TransfersMA",
        "friendlyName": "frmUTFLanding"
      }).navigate();
    },
    setHeaderLabel: function (text) {
      this.view.lblActivate.text = text;
    },
    setAcknowledgementData: function (data) {
      var scope = this;
      if (!kony.sdk.isNullOrUndefined(data["DeactivateP2P"])) {
        delete data["DeactivateP2P"];
      } else {
        delete data["UpdatePreferredP2PAccounts"];
      }
      var obj = {
        "context": scope,
        "params": {
          "data": data
        },
        "callbackModelConfig": {
          "setAckFlow": data["flowType"]
        }
      };
      var navManager = kony.mvc.getNavigationManager();
      navManager.navigate(obj);
    },
    failAckService: function (data) {
      var scope = this;
      //       var obj = {
      //         "context": scope,
      //         "params": {
      //           "data":data
      //         },
      //         "callbackModelConfig": {
      //           "setAckFlowFailure":true
      //         }
      //       };
      //       var navManager = kony.mvc.getNavigationManager();
      //       navManager.navigate(obj);
      var navMan = applicationManager.getNavigationManager();
      new kony.mvc.Navigation({
        "appName": "TransfersMA",
        "friendlyName": "frmUTFLanding"
      }).navigate();
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