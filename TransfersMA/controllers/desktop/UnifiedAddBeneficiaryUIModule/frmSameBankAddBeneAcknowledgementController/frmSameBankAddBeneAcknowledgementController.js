define(['FormControllerUtility', 'CommonUtilities'],function(FormControllerUtility, CommonUtilities){ 
  return {
    /**
	* @api : onNavigate
	* called when the application gets navigated to the respective form
	* @return : NA
	*/
    onNavigate:function(context) {  
      var scope = this;
      scope.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
      this.view.TransferAcknowledgement.setContext(context,scope);          
    },

    postShow: function() {
      this.view.flxContent.accessibilityConfig = {
          a11yARIA: {
              "tabindex": -1,
          }
      };
      this.view.onKeyPress = this.popUpDismiss;
      this.view.CustomPopup.onKeyPress = this.popUpDismiss;
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      var self = this;
      this.view.customheadernew.btnSkipNav.onClick = function() {
        self.view.lblHeaderName.setActive(true);
      }
  },
  popUpDismiss: function(a, b) {
      if (b.keyCode === 27) {
          if (this.view.flxDialogs.isVisible === true) {
              this.view.flxDialogs.setVisibility(false);
              this.view.customheadernew.btnLogout.setFocus(true);
              this.view.customheadernew.onKeyPressCallBack(a, b);
          }
      }
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
      var navManager = kony.mvc.getNavigationManager();
      var obj = {
        context: this,
        callbackModelConfig:{"frm":"frmUTFLanding","UIModule":"UnifiedTransferFlowUIModule","appName": "TransfersMA" }
      };    
      navManager.navigate(obj);
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