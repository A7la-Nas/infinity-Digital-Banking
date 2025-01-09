define(['FormControllerUtility'],function(FormControllerUtility){
  return {
    onNavigate: function(params) {
      this.view.securityQuestions.setContext(params);
      this.view.securityQuestions.showSecurityQuestions(params);
      this.initActions();
    },
     /**
     * preShow
     * @api : preShow    
     * @return : NA
     */
   preShow : function(){
     FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter','flxMain','flxLogout']);
     this.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
   },

    initActions: function() {
      var scope = this;
      var frmName;
      scope.view.securityQuestions.onSuccessCallback = function(params) {
        if(params.serviceName === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE")
          frmName = "frmUTFInternationalTransferAcknowledgement";
        else if(params.serviceName === "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE")
          frmName = "frmUTFDomesticTransferAcknowledgement";
        else if(params.serviceName === "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE" || 
                params.serviceName === "INTRA_BANK_FUND_TRANSFER_CREATE")
          frmName = "frmUTFSameBankTransferAcknowledgement";
        var navMan = kony.mvc.getNavigationManager();
        navMan.navigate({
          context:this,
          params:params,
          callbackModelConfig:{
            "frm":frmName,
            "appName":"TransfersMA"
          }});
      };
      scope.view.securityQuestions.onFailureCallback = function(response, error) {
      };
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
    }
  };

});