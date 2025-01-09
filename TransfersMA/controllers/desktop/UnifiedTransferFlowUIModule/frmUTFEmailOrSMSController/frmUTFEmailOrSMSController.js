define(['FormControllerUtility'],function(FormControllerUtility){

  return {
    onNavigate: function(params) {
      var scope = this;
      scope.view.OTPModule.showMFA(params);
      scope.initActions();
    },
     /**
     * preShow
     * @api : preShow    
     * @return : NA
     */
   preShow : function(){
    this.view.flxFormContent.doLayout = function () {
      if(this.view.flxFooter.info.height!== undefined){
        this.view.flxMain.minHeight = this.view.flxFormContent.frame.height - this.view.flxFooter.info.height + "dp";
      }
    }.bind(this);
     FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter','flxMain','flxLogout']);
     this.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
   },

    initActions: function() {
      var frmName;
      this.view.OTPModule.onSuccessCallback = function(params) {
        if(params.serviceName === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE")
          frmName = "frmUTFInternationalTransferAcknowledgement";
        else if(params.serviceName === "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE")
          frmName = "frmUTFDomesticTransferAcknowledgement";
        else if(params.serviceName === "TransferToOwnAccounts" || 
            params.serviceName === "INTRA_BANK_FUND_TRANSFER_CREATE")
          frmName = "frmUTFSameBankTransferAcknowledgement";
        var navMan = kony.mvc.getNavigationManager();
        navMan.navigate(
          {
            context:this,
            params:params,
            callBackModelConfig:{"frm":frmName,"appName":"TransfersMA"}});
      };
      this.view.OTPModule.onFailureCallback = function(response, error) {

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

