define(['FormControllerUtility','CommonUtilities'],function(FormControllerUtility,CommonUtilities){

  return {
    onNavigate:function(params) {
      var scope = this;
      this.view.SavePayee.setContext(params,scope); 
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
     this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
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
    postShow: function() {
      var scope =this;
      var form = kony.application.getCurrentForm();
      form.title = "Save Payee";
      this.view.flxDialogs.zIndex= 1000;
      this.view.SavePayee.height = "700dp";
      this.view.SavePayee.height = kony.flex.USE_PREFERRED_SIZE;
      this.view.customheadernew.btnSkipNav.onClick= function(){
       scope.view.lblTransfersHead.setActive(true);
      }
      this.view.forceLayout();
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      if(kony.application.getCurrentBreakpoint() === 640){
        this.view.customheadernew.height="40dp";
        this.view.flxHeader.height = "40dp";
        this.view.customheadernew.flxHamburger.width = "90%";
        this.view.customheadernew.flxLegalEntityHamburger.setVisibility(true);
      }
      if (kony.application.getCurrentBreakpoint() === 1024) {
        this.view.customheadernew.flxActionsMenu.right = "15dp";
        this.view.customheadernew.flxMenuLeft.left  = "17dp";
        this.view.customheadernew.flximgKony.left = "20dp";
        this.view.customheadernew.flxHamburger.width = "60%";
    }
    },
    cancelSaveYes: function() {
       var navManager = kony.mvc.getNavigationManager();
       var obj = {
          context: this,
          callbackModelConfig:{"frm":"frmUTFLanding",
          "appName":"TransfersMA" }
        };
       navManager.navigate(obj);  
    },

    newTransfer: function() {
       var navManager = kony.mvc.getNavigationManager();
       var obj = {
          context: this,
          callbackModelConfig:{"frm":"frmUTFLanding",
          "appName":"TransfersMA" }
        };
       navManager.navigate(obj);
    },

    listAccounts: function() {
      new kony.mvc.Navigation({
        "appName": "HomepageMA",
        "friendlyName": "AccountsUIModule/frmDashboard"
      }).navigate();
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

