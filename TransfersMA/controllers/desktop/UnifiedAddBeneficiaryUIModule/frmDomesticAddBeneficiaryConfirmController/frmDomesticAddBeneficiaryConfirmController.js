define(['FormControllerUtility','CommonUtilities'],function(FormControllerUtility,CommonUtilities){ 
  return {
    /**
	* @api : onNavigate
	* called when the application gets navigated to the respective form
	* @return : NA
	*/
    onNavigate: function(data){
      var scope = this;
      this.setContextForAddBeneficiaryService(data);      
      this.view.confirmTransfer.setContext(data,scope);
      this.view.confirmTransfer.onError = this.onError;
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
    },
    
    onKeyPressCallBack: function(eventObject, eventPayload)
    {
      if (eventPayload.keyCode === 27) {
        if (this.view.flxDialogs.isVisible === true) {
          this.view.flxDialogs.isVisible = false;
          this.view.customheadernew.btnLogout.setFocus(true);
          this.view.customheadernew.onKeyPressCallBack(eventObject,eventPayload);
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
	* @api : setContextForAddBeneficiaryService
	* sets the corresponding context in criteria
	* @return : NA
	*/
    setContextForAddBeneficiaryService: function(context){
      context.isVerified = "true";
      context.isSameBankAccount = "false";
      context.isInternationalAccount = "false";
      if(context.countryCode)
        context.phoneNumberData = context.countryCode+" "+context.displayPhoneNumber;
      else
        context.phoneNumberData = context.displayPhoneNumber;
    },

    /**
	* @api : navToack
	* navigates to acknowledgement screen
	* @return : NA
	*/
    navToack: function(context) {
       var navManager = kony.mvc.getNavigationManager();
      var obj = {
        context: this,
        params:context,
        callbackModelConfig:{"frm":"frmDomesticAddBeneAcknowledgement","UIModule":"UnifiedAddBeneficiaryUIModule","appName": "TransfersMA" }
      };    
      navManager.navigate(obj);
    },

    /**
	* @api : modifyTransfer
	* navigates to input screen on modify flow
	* @return : NA
	*/
    modifyTransfer: function(context) {
      context.flowType = "modify";
      context.transferFail = "";
		var navManager = kony.mvc.getNavigationManager();
      var obj = {
        context: this,
        params:context,
        callbackModelConfig:{"frm":"frmDomesticAddBeneficiary","UIModule":"UnifiedAddBeneficiaryUIModule","appName": "TransfersMA" }
      };    
      navManager.navigate(obj);
    },

    /**
	* @api : confirmTransferSuccess
	* navigates to acknowledgement screen when service gets success
	* @return : NA
	*/
    confirmTransferSuccess: function(params) {
      var navManager = kony.mvc.getNavigationManager();
      var obj = {
        context: this,
        params:params,
        callbackModelConfig:{"frm":"frmDomesticAddBeneAcknowledgement","UIModule":"UnifiedAddBeneficiaryUIModule","appName": "TransfersMA" }
      };    
      navManager.navigate(obj);
    },

    /**
	* @api : confirmTransferError
	* navigates to input screen when service fails
	* @return : NA
	*/
    confirmTransferError: function(params) {
      params.flowType = "modify";
      params.errorMessage = "Failed to Add Beneficiary";
       var navManager = kony.mvc.getNavigationManager();
      var obj = {
        context: this,
        params:params,
        callbackModelConfig:{"frm":"frmDomesticAddBeneficiary","UIModule":"UnifiedAddBeneficiaryUIModule","appName": "TransfersMA" }
      };    
      navManager.navigate(obj);
    },

    /**
	* @api : onError
	* gets handled on error scenario
	* @return : NA
	*/
    onError: function(errObj) {
     kony.print(JSON.stringify(errObj));
    },

    /**
	* @api : preShow
	* Reponsible to retain the data for custom properties for multiple entries into the component
	* @return : NA
	*/
    preShow: function(){
      var scope = this;
      scope.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
      this.view.customheadernew.btnSkipNav.onClick= function(){
        scope.view.lblHeader.setActive(true);
      }
      this.view.confirmTransfer.cancelReviewYes = function(){
		var navManager = kony.mvc.getNavigationManager();
		var obj = {
        context: this,
        callbackModelConfig:{"frm":"frmUTFLanding","UIModule":"UnifiedTransferFlowUIModule","appName": "TransfersMA" }
      };    
      navManager.navigate(obj);
      };
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
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