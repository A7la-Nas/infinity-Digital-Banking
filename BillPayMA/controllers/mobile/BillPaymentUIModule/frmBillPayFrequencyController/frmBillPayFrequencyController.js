define({
	init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function () {
        this.renderTitleBar();
        this.initActions();
		var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
	 renderTitleBar: function(){
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if (isIphone) {
      this.view.flxHeader.setVisibility(false);
    }
  },
    initActions: function () {
      var scope = this;
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var index= billPayMod.presentationController.getSelectedFrequencyIndex();
      this.view.segFrequency.retainSelection = false;
      if(index!==null&&index!==undefined&&index!=="")
      {
        this.view.segFrequency.rowFocusSkin = "sknFlxf9f9f9";
        this.view.segFrequency.retainSelection = true;
        this.view.segFrequency.selectedRowIndex = [0,index];
      }
        this.view.segFrequency.onRowClick = function () {
            scope.segmentRowClick();
        }
        this.view.customHeader.flxBack.onClick = function () {
            var navMan=applicationManager.getNavigationManager();
           navMan.goBack();
        }
        this.view.customHeader.btnRight.onClick = function(){
           var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
           billPayModule.presentationController.cancelCommon();
        }
    },
    segmentRowClick: function () {
      var index = this.view.segFrequency.data[this.view.segFrequency.selectedIndex[1]].lblFrequency;
      var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      billPayModule.presentationController.switchFrequencyType(index);
    }
});