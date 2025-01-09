define(['FormControllerUtility','CommonUtilities'],function(FormControllerUtility,CommonUtilities){
  return {
    contextData: {},
    transferType: "",
    confirmFrm: "",
    inputFrm:"",
    p2p : false,
    /**
	* @api : onNavigate
	* called when the application gets navigated to the respective form
	* @return : NA
	*/
    onNavigate: function(params) {
      var scope = this;
      if(!kony.sdk.isNullOrUndefined(params.params)){
        params = params.params;
      }
      scope.contextData = params;
      if(params.contractListData.hasOwnProperty("transferType")) {
        scope.transferType = params.contractListData["transferType"];
      }
      if(params.contractListData.hasOwnProperty("profileAccess")) {
        this.view.contractList.setContext(params.contractListData["profileAccess"]);
      }
      if(params.contractListData.hasOwnProperty("contractList")) {
        if(params.flowType === "EDIT"){
          this.view.contractList.initialiseComponent(params.contractListData["contractList"], params.data);
        } else {
          this.view.contractList.initialiseComponent(params.contractListData["contractList"]);
        }
      }
      this.view.contractList.setParentScope(this);
      this.decideFormName();
    },

    init: function() {      
      this.view.postShow = this.postShow;      
  },

  postShow: function() {    
    var self =this;
    this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;    
    this.view.customheadernew.btnSkipNav.onClick = function() {
      self.view.lblPayeeHeader.setActive(true);
    }
    this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
    this.view.customheadernew.collapseAll();
    this.view.customheadernew.flxAccounts.accessibilityConfig = {
      a11yLabel:"accounts overview",
      a11yARIA:{
        "tabindex":0,
        "role":"link"
      }
    }
    //this.view.CustomPopupCancel.onKeyPress = this.onKeyPressCallBack;
},

onKeyPressCallBack: function(eventObject, eventPayload) {
  if (eventPayload.keyCode === 27) {
      if (this.view.flxLogout.isVisible === true) {
          this.view.flxDialogs.isVisible = false;
          this.view.customheadernew.btnLogout.setFocus(true);
      }      
      this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
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
	* @api : decideFormName
	* decides the form to which navigation should be done
	* @return : NA
	*/
    decideFormName: function() {
      var scope = this;
      p2p = false;
      if(scope.transferType === "Domestic") {
        scope.confirmFrm = "frmDomesticAddBeneficiaryConfirm";
        scope.inputFrm = "frmDomesticAddBeneficiary";
      } else if(scope.transferType === "International") {
        scope.confirmFrm = "frmInternationalAddBeneficiaryConfirm";
        scope.inputFrm = "frmInternationalAddBeneficiary";
      } else if(scope.transferType === "SameBank") {
        scope.confirmFrm = "frmSameBankAddBeneficiaryConfirm";
        scope.inputFrm = "frmSameBankAddBeneficiary";
      } else {
        p2p = true;
        scope.confirmFrm = "frmPayaPersonAddBeneficiaryConfirm";
        scope.inputFrm = "frmPayaPersonAddBeneficiary";
      }
    },

    /**
	* @api : continueLinkPayee
	* navigates to acknowledgement screen
	* @return : NA
	*/
    continueLinkPayee: function(data) {
      var scope = this;
      scope.contextData["data"] = data;
      var navManager = kony.mvc.getNavigationManager();
      var obj = {
        context: this,
        params:scope.contextData,
        callbackModelConfig:{"frm":scope.confirmFrm,
                             "UIModule": "UnifiedAddBeneficiaryUIModule",
								"appName": "TransfersMA"}
      };    
      navManager.navigate(obj);
    },

    /**
	* @api : backLinkPayee
	* navigates to input screen on click of back button
	* @return : NA
	*/
    backLinkPayee: function() {    
      var scope = this;
      scope.contextData["flowType"] = "modify";
      var navManager = kony.mvc.getNavigationManager();
      var obj = {
        context: this,
        params:scope.contextData,
        callbackModelConfig:{"frm":scope.inputFrm,"UIModule": "UnifiedAddBeneficiaryUIModule",
                    "appName":"TransfersMA" }
      };    
      navManager.navigate(obj);
    },

    /**
	* @api : cancelLinkPayee
	* navigates to landing screen on click of cancel button
	* @return : NA
	*/
    cancelLinkPayee: function() {
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