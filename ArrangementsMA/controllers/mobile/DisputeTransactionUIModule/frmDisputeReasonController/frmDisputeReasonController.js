define({
  selectedReason: -1,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function () {
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
    this.setMasterDataToSegment();
    var navManager =applicationManager.getNavigationManager();
    var disputeData = navManager.getCustomInfo("frmDisputeTransactionDetails");
    this.assignDataToForm(disputeData);
    this.view.customHeader.flxBack.onClick = this.onBack;
    this.view.customHeader.btnRight.onClick = this.onCancel;
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  onBack : function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  onCancel : function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo("frmTransactionDetails");
  },
  setMasterDataToSegment: function () {
    var scope = this;
    var confManager = applicationManager.getConfigurationManager();
    var disputeReason = confManager.getDisputeReasons();
    var segData = [];
    for (var i = 0; i < disputeReason.length; i++) {
      var temp = {
        "btnOption": {"text": disputeReason[i],"skin":"sknBtnOnBoardingOptionsInActive"}
      };
      segData.push(temp);
    }
    for (var i = 0; i < segData.length; i++) {
      segData[i].btnOption.skin = "sknBtnOnBoardingOptionsInActive";
      segData[i].btnOption.onClick = function () {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager =applicationManager.getNavigationManager();
        var transactionData = navManager.getCustomInfo("frmDisputeTransactionDetails");
          if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone")
        transactionData.disputeReason = scope.view.segReasons.selectedItems[0].btnOption["text"];
          else
        transactionData.disputeReason = this.text;

        navManager.setCustomInfo("frmDisputeTransactionDetails",transactionData);
        var disputeModule = applicationManager.getModulesPresentationController({"moduleName" : "DisputeTransactionUIModule", "appName" : "ArrangementsMA"});
        disputeModule.commonFunctionForNavigation({"appName" : "ArrangementsMA", "friendlyName" :"frmDTConfirm"});
        //scope.processAndNavigate();
      }
    }
   // scope.view.segReasons.data = segData;
       scope.view.segReasons.setData(segData);
  },
  processAndNavigate : function () {
    var scope = this;
   /* var data = {
      "data.disputeReason" : scope.view.segReasons.selectedItems[0].btnOption["text"]
    };
    var segData = scope.view.segReasons.data;
    for(var i=0;i<segData.length;i++){
      if(segData[i]["btnOption"]["text"] === data.disputeReason){
        segData[i]["btnOption"].skin="sknBtnOBSegSelected";
      }
      else{
        segData[i]["btnOption"].skin="sknBtnOnBoardingOptionsInActive";
      }
    }
    scope.view.segReasons.setData(segData);*/

    //disputeModule.presentationController.commonFunctionForNavigation("frmOBCreditCheck");
  },
  assignDataToForm : function(data){
    var Reason = (data.disputeReason && data.disputeReason !== "" && data.disputeReason !== null)?data.disputeReason:"";
    var segData = this.view.segReasons.data;
    for(var i=0;i<segData.length;i++){
      if(segData[i]["btnOption"]["text"] === Reason){
        segData[i]["btnOption"].skin="sknBtnOBSegSelected";
      }
      else{
        segData[i]["btnOption"].skin="sknBtnOnBoardingOptionsInActive";
      }
    }
    this.view.segReasons.setData(segData);
  }
});