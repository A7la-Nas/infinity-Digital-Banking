define({
  depositToCDInit: function() {
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function() {
    this.renderTitleBar();
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    this.setSegmentData();
  	applicationManager.getPresentationUtility().dismissLoadingScreen();
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
setSegmentData: function() {
  var segData = [{
          "lblTransactionMode":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts"),
          "lblTransactionModeDescription":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.DepositToMyKonyAccounts"),
          "imgArrow":"chevron.png"
      },
     ];
  this.view.segTransactionMode.setData(segData);
 },
  flxBackOnClick : function(){
      var navManager = applicationManager.getNavigationManager();
  navManager.goBack();
  },
  segTransactionModeRowClick : function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CheckDepositUIModule", "appName": "ArrangementsMA"});
      var depObj = checkDepositModule.presentationController.getDepositObjInView();
      if(depObj.amount) {
         checkDepositModule.presentationController.getCheckDepositTransactionalLimits();
      }
      else {
         checkDepositModule.presentationController.getToAccounts(false);
      }
  }
});