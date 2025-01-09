define({
  init : function() {
         var navManager = applicationManager.getNavigationManager();
         var currentForm=navManager.getCurrentForm();
         var info = navManager.getCustomInfo("frmChequeRevokeAckn");
         applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
         this.view.lblReferenceValue.text = info.referenceId; 
    },
  /** preShow defined for frmChequeRevokeAck **/ 
  preShow:function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
     this.view.flxHeader.isVisible = false;
    }
    this.view.onDeviceBack = this.backToStopCheques;
    this.view.btnBack.onClick = this.backToStopCheques;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  }, 
  backToStopCheques: function() {
       var varPass;
       varPass = "MyChequesView";
       var navObj = new kony.mvc.Navigation({"appName":"ArrangementsMA", "friendlyName":"frmChequeManagement"});
       navObj.navigate(varPass); 
    } 
});