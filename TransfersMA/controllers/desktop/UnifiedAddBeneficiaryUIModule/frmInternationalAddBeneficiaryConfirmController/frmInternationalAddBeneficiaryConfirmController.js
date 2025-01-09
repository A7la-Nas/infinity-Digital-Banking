define(['FormControllerUtility','CommonUtilities'],function(FormControllerUtility,CommonUtilities){
return {
  /**
	* @api : onNavigate
	* called when the application gets navigated to the respective form
	* @return : NA
	*/
  onNavigate: function(data) {
    var scope = this;
    this.setContextForAddBeneficiaryService(data);      
    this.view.confirmTransfer.setContext(data,scope);
    this.view.confirmTransfer.onError = this.onError;
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
	* @api : preShow
	* Reponsible to retain the data for custom properties for multiple entries into the component
	* @return : NA
	*/
  preShow: function() {
    var scope = this;
    this.view.customheadernew.btnSkipNav.onClick= function(){
	scope.view.lblHeader.setActive(true);
    };
    scope.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
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
  /**
	* @api : triggers when click on key
	* sets the focus based on visibility
	* @return : NA
	*/
  onKeyPressCallBack: function(eventObject, eventPayload)
  {
    if (eventPayload.keyCode === 27) {
        if (this.view.flxDialogs.isVisible === true) {
          this.view.flxDialogs.isVisible = false;
          this.view.customheadernew.btnLogout.setFocus(true);
        }
        this.view.customheadernew.onKeyPressCallBack(eventObject,eventPayload);
      }
  },
  

  /**
	* @api : setContextForAddBeneficiaryService
	* sets the corresponding context in criteria
	* @return : NA
	*/
  setContextForAddBeneficiaryService: function(context){
    context.isVerified = "true";
    context.isSameBankAccount = "false";
    context.isInternationalAccount = "true";
    if(context.countryCode)
      context.phoneNumberData = context.countryCode + " " + context.displayPhoneNumber;
    else
      context.phoneNumberData = context.displayPhoneNumber;
  },

  /**
	* @api : navToack
	* navigates to acknowledgement screen
	* @return : NA
	*/
  navToack: function(context) {
    var scope = this;
    scope.navigateToForm(context, "frmInternationalAddBeneAcknowledgement");
  },

  /**
	* @api : modifyTransfer
	* navigates to acknowledgement screen
	* @return : NA
	*/
  modifyTransfer: function(context) {
    context.flowType = "modify";
    context.transferFail = "";
    var scope = this;
    scope.navigateToForm(context, "frmInternationalAddBeneficiary");
  },

  /**
	* @api : confirmTransferSuccess
	* navigates to acknowledgement screen when service gets success
	* @return : NA
	*/
  confirmTransferSuccess: function(params) {
    var scope = this;
    scope.navigateToForm(params, "frmInternationalAddBeneAcknowledgement");
  },

  /**
	* @api : confirmTransferError
	* navigates to input screen when service fails
	* @return : NA
	*/
  confirmTransferError: function(params) {
    var scope = this;
    params.flowType = "modify";
    params.errorMessage = "Failed to Add Beneficiary";
    scope.navigateToForm(params, "frmInternationalAddBeneficiary");
  },
    /**
	* @api : navigateToForm
	* navigates to the specified form
	* @return : NA
	*/
  navigateToForm : function(params,frm){
    var navManager = kony.mvc.getNavigationManager();
    var obj = {
      context: this,
      params : params,
      callbackModelConfig:{"frm":frm,"UIModule":"UnifiedAddBeneficiaryUIModule","appName": "TransfersMA" }
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
  
   updateFormUI: function(viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
    }
   };

});