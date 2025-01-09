define({
	init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function () {
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        }
     var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var index= billPayMod.presentationController.getIndexForDuration();
      this.view.segDuration.retainSelection = false;
      if(index!==null&&index!==undefined&&index!=="")
      {
        this.view.segDuration.rowFocusSkin = "sknFlxf9f9f9";
      this.view.segDuration.retainSelection = true;
       // this.view.segDuration.selectedRowIndices = [[0,[index]]];
       this.view.segDuration.selectedRowIndex = [0,index];
      }
        this.initActions();
		var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    initActions: function () {
        var scope = this;
        this.view.customHeader.flxBack.onClick = function(){
           var navMan=applicationManager.getNavigationManager();
           navMan.goBack();
        }
        this.view.segDuration.onRowClick = function () {
            scope.segmentRowClick();
        }
        this.view.customHeader.btnRight.onClick = function(){
           var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        	billPayModule.presentationController.cancelCommon();
        }
    },
    segmentRowClick: function () {
       var index = this.view.segDuration.data[this.view.segDuration.selectedIndex[1]].lblFrequency;
        var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayModule.presentationController.switchDurationType(index);
    }
});