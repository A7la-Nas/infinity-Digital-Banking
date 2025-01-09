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
     var scopeObj=this;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
    this.view.flxFormContent.doLayout = function () {
      if(this.view.flxFooter.info.height!== undefined){
        this.view.flxMain.minHeight = this.view.flxFormContent.frame.height - this.view.flxFooter.info.height + "dp";
      }
    }.bind(this);
     FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter','flxMain','flxLogout']);
     this.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
       this.view.customheadernew.btnSkipNav.onClick = function() {
            scopeObj.view.lblAcknowledgement.setActive(true);
            }
    
     this.view.UnifiedTransfersAcknowledgement.button1Click = this.button1Click;
     this.view.UnifiedTransfersAcknowledgement.button2Click = this.button2Click;
     this.view.UnifiedTransfersAcknowledgement.button3Click = this.button3Click;
   },
   postShow: function(){
    this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
   },
    onHide: function() {
      this.view.UnifiedTransfersAcknowledgement.unsubscribeStore();
    },
    onNavigate:function(params) {
      var scope = this;
      if(params.Collection) params = params.Collection;
      this.view.UnifiedTransfersAcknowledgement.setContext(params,scope); 
      this.view.UnifiedTransfersAcknowledgement.onError = this.onError; 
    },

    button3Click: function() {
        applicationManager.getModulesPresentationController("ManageActivitiesUIModule").showTransferScreen({ context: "PastPayments" });
    },

    button1Click: function(){
      var navManager = kony.mvc.getNavigationManager();
      var obj = {
        context: this,
        callbackModelConfig:{"frm":"frmUTFLanding",
        "appName":"TransfersMA" }
      };
      navManager.navigate(obj);
    },

    button2Click: function(params) {
      params = Object.assign(params.Recipients, params.Transaction,params.BankDetails);
      var navManager = kony.mvc.getNavigationManager();
      var obj = {
        context: this,
        params:params,
        callbackModelConfig:{"frm":"frmSavePayeeforOTT",
        "appName":"TransfersMA" }
      };
      navManager.navigate(obj);
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
      onKeyPressCallBack: function(eventObject, eventPayload) {
        var self = this;
        if (eventPayload.keyCode === 27) {
            if (self.view.flxDialogs.isVisible === true) {
                self.view.flxDialogs.setVisibility(false);
              self.view.flxLogout.setVisibility(false);
                self.view.customheadernew.btnLogout.setFocus(true);
            }
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

