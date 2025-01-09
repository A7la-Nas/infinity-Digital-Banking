define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
  let navData = {};
  let swiftMessages = [], paymentAdvices = [];
  return{
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.response) {
        this.showSAPopup(viewModel.response)
      }
      if (viewModel.serverError) {
      }
    },
    onNavigate: function(param){
      FormControllerUtility.hideProgressBar(this.view);
      var Accounts = applicationManager.getConfigurationManager().userAccounts;
      if(!kony.sdk.isNullOrUndefined(param)) {
        param["userAccounts"] = Accounts;
      }
      if (!kony.sdk.isNullOrUndefined(param.drawingReferenceNo)) {
        param["isDrawingsBack"] = true;
      }
      navData = param;
      this.view.ViewDetails.setContext(param);
    },
  preShow : function(){
    var scope = this;
    scope.view.customheadernew.forceCloseHamburger();  
    scope.view.customheadernew.activateMenu("TradeFinance","Imports");	
    scope.view.ViewDetails.onBackClick = scope.onBackClick;
    scope.view.ViewDetails.onDrawingsClick = scope.onDrawingsClick;
    scope.view.ViewDetails.contextualActionButtonOnClick = scope.contextualActionButtonOnClick.bind(this);
    scope.view.ViewDetails.navigateToPrintScreen = scope.navigateToPrintScreen;
    scope.view.ViewDetails.FooterVisibility = scope.FooterVisibility.bind(this);
    scope.view.btnSAClose.onClick = () => {
      scope.view.flxDialogs.setVisibility(false);
      scope.view.flxSAPopup.setVisibility(false);
    }
    scope.view.flxSAContent.doLayout = CommonUtilities.centerPopupFlex
  },
  postShow: function(){
    var scope = this;
    this.view.flxMainContainer.doLayout = this.view.customfooternew.setMinHeight.bind(this, this.view.flxMain);
    this.view.flxMainContainer.doLayout();
  },
  onBackClick: function(){
    new kony.mvc.Navigation({"appName" : "TradeFinanceMA", "friendlyName" : "ImportLCUIModule/frmImportLCDashboard"}).navigate(navData);
  },
  onDrawingsClick: function(){
    new kony.mvc.Navigation({"appName" : "TradeFinanceMA", "friendlyName" : "ImportLCUIModule/frmImportLCDashboard"}).navigate();
  },
  FooterVisibility: function(data){
    this.view.flxFooter.setVisibility(data);
  },
  onBreakpointChange: function() {
    var scope = this;
    this.view.customheadernew.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
    this.view.customfooternew.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
  },

  contextualActionButtonOnClick: function(id, data, LOCData = null) {
    var scope = this;
    data["previousFormName"] = "frmImportLCDetails";
    if (id === "Print") {
      //this.invokePrint();
      if(data.Tab === "Amendments"){
        data["frmName"] = "frmLCDetails";
        var LOCNavData = {};
        LOCNavData["Data"] = data;
        LOCNavData["LOCData"]  = LOCData;
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ImportLCUIModule/frmAmendmentsPrint"
        }).navigate(LOCNavData);
      }else{
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ImportLCUIModule/frmImportLCPrint"
        }).navigate(data);
      }
    } else {
      if(data.Tab === "Amendments"){
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ImportLCUIModule/frmLCAmendment"
        }).navigate(data);
      }
      else{
        if(data.status === "New"){
          if(data.drawingSubmitPermission === true){
            new kony.mvc.Navigation({
              "appName": "TradeFinanceMA",
              "friendlyName": "ImportLCUIModule/frmImportLCDrawingVerifySubmit"
            }).navigate(data);
          }else{
            new kony.mvc.Navigation({
              "appName": "TradeFinanceMA",
              "friendlyName": "ImportLCUIModule/frmImportLCDrawingViewDetails"
            }).navigate(data);
          } 
        }else if(data.status === "Pending with Bank" || data.status === "Completed"){
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCDrawingViewDetails"
          }).navigate(data);	
        }else{
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCDetails"
          }).navigate(data);
        }
      }
    }
  },
  navigateToPrintScreen: function(data){
      data["previousFormName"] = "frmImportLCDetails";
      //this code is for permission related ,once it is available from backend will enable 
      if (kony.sdk.isNullOrUndefined(data.isSwiftFormatPrint)) {
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ImportLCUIModule/frmImportLCPrint"
        }).navigate(data);
      }
      else {
        if (!kony.sdk.isNullOrUndefined(data.isSwiftFormatPrintWithoutCode)) {
          data.swiftWithoutCode = true;
        }
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ImportLCUIModule/frmSwiftPrint"
        }).navigate(data);
      }
    },
    showSAPopup: function (record) {
      const scope = this;
      const presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'ImportLCUIModule' });
      const formatUtilManager = applicationManager.getFormatUtilManager();
      this.view.flxDialogs.setVisibility(true);
      this.view.flxSAPopup.setVisibility(true);
      if (presenter.fileDetails.category === 'SWIFT') {
       scope.view.lblSAHeading.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.swiftMT")} (${formatUtilManager.getFormattedCalendarDate(presenter.fileDetails.uploadedTimeStamp)})`;
        scope.view.flxSAContent.width = '73%'
      }
      else {
        scope.view.lblSAHeading.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice")} (${formatUtilManager.getFormattedCalendarDate(presenter.fileDetails.uploadedTimeStamp)})`;
        scope.view.flxSAContent.width = '51%'
      }
      this.view.rtxSA.text = record;
      this.view.flxSADownload.onClick = () => {
        let downloadUrl = `${KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url}/operations/LCDocuments/downloadDocument`;
        CommonUtilities.downloadAttachment(downloadUrl, {"fileId": presenter.fileDetails.fileId});
      };
    },
  }
});