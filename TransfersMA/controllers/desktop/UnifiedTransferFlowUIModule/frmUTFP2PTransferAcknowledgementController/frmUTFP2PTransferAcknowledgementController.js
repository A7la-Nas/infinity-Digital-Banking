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
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },

    /**
       * preShow
       * @api : preShow    
       * @return : NA
       */
    preShow : function(){
      var scope = this;
      this.view.flxFormContent.doLayout = function () {
        if(this.view.flxFooter.info.height!== undefined){
          this.view.flxMain.minHeight = this.view.flxFormContent.frame.height - this.view.flxFooter.info.height + "dp";
        }
      }.bind(this);
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter','flxMain','flxLogout']);
      this.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
      this.view.UnifiedTransfersAcknowledgement.button1Click = this.button1Click;
      this.view.UnifiedTransfersAcknowledgement.button2Click = this.button2Click;
      this.view.UnifiedTransfersAcknowledgement.button3Click = this.button3Click;
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
      this.view.customheadernew.btnSkipNav.onClick = function(){
        scope.view.lblAcknowledgement.setActive(true);
      };
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
    },

    onKeyPressCallBack: function(eventObject, eventPayload) {
      var self = this;
      if (eventPayload.keyCode === 27) {
          if (self.view.flxLogout.isVisible === true) {
              self.view.flxLogout.isVisible = false;
              self.view.flxDialogs.setVisibility(false);
              self.view.customheadernew.btnLogout.setFocus(true);
          }
      }
  },

    postShow: function(){},

    onHide: function() {
      this.view.UnifiedTransfersAcknowledgement.unsubscribeStore();
    },

    onNavigate:function(params) {
      var scope = this;
      if(!kony.sdk.isNullOrUndefined(params.params)){
        params = params.params;
      }
      if(params.Collection) params = params.Collection;
      this.view.UnifiedTransfersAcknowledgement.setContext(params,scope); 
      this.view.UnifiedTransfersAcknowledgement.onError = this.onError; 
    },

    button3Click: function () {
        applicationManager.getModulesPresentationController({
          "moduleName": "ManageActivitiesUIModule",
          "appName": "TransfersMA"
        }).showTransferScreen({ context: "PastPayments" });
    },

    button1Click: function(){
      var navMan = kony.mvc.getNavigationManager();
      navMan.navigate(
      {
        context: this,
        callbackModelConfig:
        {
          "button1click":true,
          "frm": "frmUTFLanding",
          "appName":"TransfersMA"
        }
      });
    },

    button2Click: function(params) {
      params = Object.assign(params.Recipients, params.Transaction);
      var navMan = kony.mvc.getNavigationManager();
      navMan.navigate({
        context: this,
        params: params,
        callbackModelConfig: {
        "button2click":true,
        "frm":"frmSavePayeeforOTT",
        "appName":"TransfersMA"        
      }
      });
    },
    /**
     * updateFormUI - the entry point method for the form controller.
     * @param {Object} viewModel - it contains the set of view properties and keys.
     */
    updateFormUI: function(viewModel) {
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

