
define(['FormControllerUtility', 'CommonUtilities'], function(FormControllerUtility, CommonUtilities) {

  var responsiveUtils = new ResponsiveUtils();

  return {

    init: function(){
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
      var data = {};
      this.view.viewRequests.setContext();
    },

    //Type your controller code here 
    preShow: function() {
      this.view.customheadernew.activateMenu("ACCOUNTS", "Service Requests");
      this.view.flxDowntimeWarning.setVisibility(false);
      // this.view.viewRequests.onError = this.onError();
      //  this.view.viewRequests.showErrorMessage = this.showErrorMessage();
      var scope=this;
      this.view.customheadernew.btnSkipNav.onClick = function(){
        scope.view.lblServiceHead.setActive(true);
      }
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
    },
    onKeyPressCallBack: function (eventObject, eventPayload) {
      if (eventPayload.keyCode === 27) {
          if (this.view.flxDialogs.isVisible) {
              this.view.flxDialogs.isVisible = false;
          }
          this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
      }
    },
    postShow: function() {
      this.flxMainCalculateHeight();

      if(kony.i18n.getCurrentLocale() === "ar_AE"){

        if(kony.application.getCurrentBreakpoint() <= 640){
          this.view.viewRequests.setLayoutForMobileRTL();
        }else if(kony.application.getCurrentBreakpoint() <= 1024){
          this.view.viewRequests.setLayoutForTabletRTL();
        }else{
          this.view.viewRequests.setLayoutForDesktopRTL();
        } 
      }
      this.view.forceLayout();
    },
    onRequestSelection: function(account) {
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmRepaymentDayRequest", account);
      navMan.navigateTo({
        "appName": "ArrangementsMA",
        "friendlyName": "ServiceRequestsUIModule/frmRepaymentDayRequest"
      });
    },
    flxMainCalculateHeight: function() {
      let headerHeight = this.view.flxHeader.height;
      let footerHeight = this.view.flxFooter.height;
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - headerHeight.substring(0, headerHeight.length - 2) - footerHeight.substring(0, footerHeight.length - 2) + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
    },
    
    updateFormUI: function(viewModel) {
    },

    onBreakpointChange: function(form, width) {
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.flxMainCalculateHeight();
    },

  };
});

