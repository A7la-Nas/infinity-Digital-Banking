define(['FormControllerUtility','CommonUtilities'],function(FormControllerUtility,CommonUtilities){
  return {

    /**
	* @api : onNavigate
	* called when the application gets navigated to the respective form
	* @return : NA
	*/
    preShow: function(){
      this.view.flxContent.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
          "aria-live": "off"
        }
      }
      //this.view.customheadernew.btnSkipNav.onClick = this.view.TransferAcknowledgement.setbtnFocus;
      var scope = this;
      this.view.customheadernew.btnSkipNav.onClick = function () {
        scope.view.lblHeaderName.setActive(true);
      };
      this.view.onKeyPress= this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress= this.onKeyPressCallBack;
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.postShow = function(){
        scope.view.customheadernew.collapseAll();
      }
    },
    onKeyPressCallBack: function(eventObject, eventPayload) {
      var self = this;
      if (eventPayload.keyCode === 27) {
        if (self.view.flxDialogs.isVisible === true) {
          self.view.flxDialogs.setVisibility(false);
          self.view.customheadernew.btnLogout.setFocus(true);
        }
        self.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
      }
    },
    onNavigate:function(context) {  
      var scope = this;
      this.view.TransferAcknowledgement.setContext(context,scope);          
    },

    /**
	* @api : onBreakPointChange
	* Reponsible to retain the UI of the form
	* @return : NA
	*/
    onBreakPointChange: function(form,width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      this.view.customheadernew.onBreakpointChangeComponent(width);
    },

    /**
	* @api : transferActivities
	* navigates to transfers activities screen
	* @return : NA
	*/
    transferActivities: function() {
       //if(applicationManager.getConfigurationManager().getDeploymentGeography() === "EUROPE"){
        applicationManager.getModulesPresentationController("ManageActivitiesUIModule").showTransferScreen({ context: "PastPayments" });
      /* else{
        applicationManager.getModulesPresentationController("TransferFastUIModule").showTransferScreen({initialView: "PastPayments"});
      } */
    },

    /**
	* @api : newTransfer
	* navigates to landing screen
	* @return : NA
	*/
    newTransfer: function(){
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("UnifiedTransferFlowUIModule/frmUTFLanding");
    },

    updateFormUI: function(viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
    }
  };
});