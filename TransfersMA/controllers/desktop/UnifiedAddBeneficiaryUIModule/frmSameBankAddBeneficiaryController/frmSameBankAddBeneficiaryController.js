define(['FormControllerUtility','CommonUtilities'],function(FormControllerUtility,CommonUtilities) {
  return {
    /**
	* @api : onNavigate
	* called when the application gets navigated to the respective form
	* @return : NA
	*/
    onNavigate: function(context) {
      var scope = this;
      this.context = context;
      this.view.unifiedAddBeneficiary.setContext(scope, this.context);
      this.view.imgCloseIcon.onTouchStart = this.closeErrorFlex;
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
	* called when the form gets loaded
	* @return : NA
	*/
    preShow: function() {
      var scope = this;
      scope.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
      this.view.flxAddSameBankAccount.onClick = function(){
        scope.addBeneficiary("Same Bank Transfer");
      };
      this.view.flxAddDomesticAccount.onClick = function(){
        scope.addBeneficiary("Domestic Transfer");
      };
      this.view.flxAddInternationalAccount.onClick = function(){
        scope.addBeneficiary("International Transfer");
      };
      this.view.flxAddPersonToPerson.onClick = function(){
        scope.addBeneficiary("Pay a Person");
      };
      this.view.unifiedAddBeneficiary.onError = this.onError;
      this.view.title="Same Bank Add Beneficiary";
    },

    /**
	* @api : postShow
	* event called after ui rendered on the screen, is a component life cycle event.
	* @return : NA
    */
    postShow: function() {
      var scope = this;
      if (this.context.transferFail !== "" && (!kony.sdk.isNullOrUndefined(this.context.transferFail))) {
        this.view.flxError.setVisibility(true);
        this.view.lblError1.text = this.context.errorMessage;
        this.view.lblError2.text = this.context.transferFail;
      }
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      if(kony.application.getCurrentBreakpoint()<=1024){
        this.view.btnByPass.setVisibility(false);
      }
      this.view.customheadernew.btnSkipNav.onClick = function() {
       // scope.view.btnByPass.setFocus(true);
       scope.view.lblAddNewAccount.setActive(true);
      };
      this.view.btnByPass.onClick = function() {
        scope.view.flxAddSameBankAccount.setActive(true);
      };
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
    },
    onKeyPressCallBack: function(eventObject, eventPayload) {
      if (eventPayload.keyCode === 27) {
        if (this.view.flxDialogs.isVisible === true) {
          this.view.flxDialogs.isVisible = false;
          this.view.customheadernew.btnLogout.setFocus(true);
        }
        this.view.customheadernew.onKeyPressCallBack(eventObject,eventPayload);
      }
    },
    
            /**
	* @api : addBenificiary
	* navigate to particular add beneficiary form
	* @return : NA
	*/
    addBeneficiary: function(transferType){
      var frmName = "";
      var p2p = false;
      var TransfersMA = applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA");
      switch (transferType) {
        case "Same Bank Transfer":
          frmName = "frmSameBankAddBeneficiary";
          break;
        case "Domestic Transfer":
          frmName = "frmDomesticAddBeneficiary";
          break;
        case "International Transfer":
          frmName = "frmInternationalAddBeneficiary";
          break;
        case "Pay a Person":
          p2p = true;
          frmName = "frmPayaPersonAddBeneficiary";
          break;
      }
      var selectedTrasferType = { "transferType" : transferType,
                                 "clickedButton" : "AddNewAccount",
                                 "flowType" : "add",
                                 "payeeType" : "New Payee"
                                };
      var navManager = kony.mvc.getNavigationManager();
      var obj = {
        context: this,
        params: selectedTrasferType,
        callbackModelConfig:{"frm":frmName,"UIModule": "UnifiedAddBeneficiaryUIModule","appName": "TransfersMA" }
      };
      if(p2p){
        applicationManager.getNavigationManager().navigateTo({
          "appName": "TransfersMA",
          "friendlyName": frmName
        }, false, selectedTrasferType);
      }else{navManager.navigate(obj);} 
    },

    /**
     * continueAddBeneficiary
     * @api : continueAddBeneficiary
     * Method to perform continue navigation action
     * @return : NA
     */
    continueAddBeneficiary: function(params) {
      var scope = this;
      var formName;
      if(params.contractListData.hasOwnProperty("isSingleProfile")) {
        params.isSingleCustomer = params.contractListData["isSingleProfile"].toString(); 
        if(params.contractListData["isSingleProfile"] === false) {
          formName = "frmLinkPayee";
        } else {
          formName = "frmSameBankAddBeneficiaryConfirm";
        }}
      var navManager = kony.mvc.getNavigationManager();
      var obj = {
        context: this,
        params:params,
        callbackModelConfig:{"frm":formName,"UIModule":"UnifiedAddBeneficiaryUIModule","appName": "TransfersMA" }
      };    
      navManager.navigate(obj);
    },

    /**
     * @api : confirmCancel
     * navigates to landing screen										   
     * @return : NA
     */
    confirmCancel: function() {
      var navManager = kony.mvc.getNavigationManager();
      var obj = {
        context: this,
        callbackModelConfig:{"frm":"frmUTFLanding","UIModule":"UnifiedTransferFlowUIModule","appName": "TransfersMA" }
      };    
      navManager.navigate(obj);
    },

    /**
     * @api : closeErrorFlex
     * closes the error flex
     * @return : NA
     */
    closeErrorFlex: function() {
      this.view.flxError.setVisibility(false);
    },

    updateFormUI: function(viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
    
    onError: function(err){
     kony.print(JSON.stringify(err));
    }
  };

});