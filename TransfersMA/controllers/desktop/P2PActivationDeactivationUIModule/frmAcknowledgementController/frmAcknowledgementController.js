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
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxLogout']);
      this.view.customheadernew.btnSkipNav.onClick = function(){
        scope.view.lblActivate.setActive(true);
      }
      this.view.UnifiedTransfersAcknowledgement.button1Click = function () {
        var userData = applicationManager.getUserPreferencesManager().getUserObj();
        scope.button1Clicked(userData);
      };
      this.view.UnifiedTransfersAcknowledgement.button2Click = scope.button2Click;
      this.view.UnifiedTransfersAcknowledgement.onError = this.onError;
      this.view.title="Activate Person-to-Person- Acknowledgement";    
    },
    postShow: function () {
      this.view.customheadernew.collapseAll();
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
	    this.view.flxLogout.height="100%";
      this.view.customheadernew.lblHeaderMobile.text = "Activate Person-to-Person- Acknowledgement";
      this.view.customheadernew.lblHeaderMobile.left = "25%";
      this.view.customheadernew.lblHeaderMobile.centerX = "";
      this.view.customheadernew.lblHeaderMobile.width = "70%";
      if(kony.application.getCurrentBreakpoint()===640){
          this.view.lblActivate.isVisible = false;
      }
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
      var scope = this;
      if (!kony.sdk.isNullOrUndefined(data.data)) {
        data = data.data;
      }
      var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("P2PActivationDeactivationUIModule");
      p2pMod.presentationController.fetchUser();
      this.setHeaderLabel(data.Ack["flowType"]);
      this.view.UnifiedTransfersAcknowledgement.setContext(data, scope);
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
     * @api : setHeaderLabel
     *set the text for header label
     * @return : NA
     */
    setHeaderLabel: function (flowType) {
     if (flowType === "Activation") {
        this.view.lblActivate.text =kony.i18n.getLocalizedString("i18n.P2P.ActivatePersontoPersonAck");
      } else {
        this.view.lblActivate.text = kony.i18n.getLocalizedString("i18n.P2P.deactivatePersonToPerson");
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
    button1Clicked: function (data) {
      var scope = this;
      //       var obj = {
      //         "context": scope,
      //         "params": {
      //         },
      //         "callbackModelConfig": {
      //           "button2click":true
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
    button2Click: function (params) {
      var scope = this;
      //       var obj = {
      //         "context": scope,
      //         "params": {
      //         },
      //         "callbackModelConfig": {
      //           "button1click":true
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
  };
});