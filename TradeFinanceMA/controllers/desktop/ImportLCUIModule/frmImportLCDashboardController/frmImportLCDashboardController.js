define(['FormControllerUtility', 'OLBConstants'], function(FormControllerUtility, OLBConstants) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.isAmendBackEvent = "";
      this.isDrawingsBack = "";
    },
    onNavigate: function(...data){
      var scope = this; 
      FormControllerUtility.hideProgressBar(this.view);
      if(data[0]){
        scope.isAmendBackEvent = data[0].isAmendBackEvent;
        scope.isDrawingsBack = data[0].isDrawingsBack;
      }else{
        scope.isAmendBackEvent = "";
        scope.isDrawingsBack = "";
      }
    },
    preShow: function() {
      var scope = this;
      var param = {};
      scope.view.customheadernew.forceCloseHamburger();
      scope.view.customheadernew.activateMenu("TradeFinance","Imports");
      if(scope.isAmendBackEvent){
        var amendContext = {};
        amendContext.isAmendBackEvent = scope.isAmendBackEvent;
        scope.view.ImportLCDashboard.setContext(amendContext);
      }
      else if (scope.isDrawingsBack) {
        var drawingContext = {};
        drawingContext.isDrawingsBack = scope.isDrawingsBack;
        scope.view.ImportLCDashboard.setContext(drawingContext);
      }
      else{
        scope.view.ImportLCDashboard.setContext(param);
      }
      scope.view.ImportLCDashboard.contextualActionButtonOnClick = scope.contextualActionButtonOnClick;
      scope.view.ImportLCDashboard.invokePrint = scope.invokePrint;
    },
    postShow: function() {
      var scope = this;
      var breakpoint = kony.application.getCurrentBreakpoint();
      var orientationHandler = new OrientationHandler();
      if (kony.application.getCurrentBreakpoint() < 640 || orientationHandler.isMobile) {
        this.view.flxFooter.centerx = "35%";
      }
      this.view.flxMainContainer.doLayout = this.view.customfooternew.setMinHeight.bind(this, this.view.flxMain);
      this.view.flxMainContainer.doLayout();
    },
    contextualActionButtonOnClick: function(id, data) {
      var scope = this;
      data["previousFormName"] = "frmImportLCDashboard";
      if (id === "Copy & Create New LC" || id === "Continue Editing" || id === "btnCreateNewLC") {
        FormControllerUtility.showProgressBar(this.view);
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ImportLCUIModule/frmIssuance"
        }).navigate(data);
      } else if (id === "Print") {
        if(data.Tab === "Amendments"){
          data["frmName"] = "frmDashboard";
          var navData = {};
          navData["Data"] = data;
           new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmAmendmentsPrint"
          }).navigate(navData);
        } else {
          if(kony.sdk.isNullOrUndefined(data.isSwiftFormatPrint)){
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCPrint"
          }).navigate(data);
          }
          else{
            if(!kony.sdk.isNullOrUndefined(data.isSwiftFormatPrintWithoutCode)){
             data.swiftWithoutCode = true;
            }
            new kony.mvc.Navigation({
              "appName": "TradeFinanceMA",
              "friendlyName": "ImportLCUIModule/frmSwiftPrint"
            }).navigate(data);
          }
        }
      } else {
        if(data.Tab === "Amendments"){
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmLCAmendment"
          }).navigate(data);
        }
        else if(data.Tab === "Drawings"){
          let { SUBMITTED_TO_BANK, SETTLED, REJECTED, PROCESSING_BY_BANK } = OLBConstants.IMPORT_DRAWINGS_STATUS;
          if (data.status === "New") {
            if (data.drawingSubmitPermission === true) {
              new kony.mvc.Navigation({
                "appName": "TradeFinanceMA",
                "friendlyName": "ImportLCUIModule/frmImportLCDrawingVerifySubmit"
              }).navigate(data);
            } else {
              new kony.mvc.Navigation({
                "appName": "TradeFinanceMA",
                "friendlyName": "ImportLCUIModule/frmImportLCDrawingViewDetails"
              }).navigate(data);
            }
          } else if (data.status === SUBMITTED_TO_BANK || data.status === SETTLED || data.status === REJECTED || data.status === PROCESSING_BY_BANK) {
            new kony.mvc.Navigation({
              "appName": "TradeFinanceMA",
              "friendlyName": "ImportLCUIModule/frmImportLCDrawingViewDetails"
            }).navigate(data);
          }
        }
        else {
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCDetails"
          }).navigate(data);
        }
      }
    },
    invokePrint: function() {
      var scope = this;
      this.view.flxMainContainer.setVisibility(false);
      this.view.flxPrint.setVisibility(true);
      window.print();
      this.invokeFormVisibility();
    },
    invokeFormVisibility: function() {
      var scope = this;
      this.view.flxMainContainer.setVisibility(true);
      this.view.flxPrint.setVisibility(false);
    },
    createNewLC: function(data) {
      var scope = this;
    },
    onBreakpointChange: function() {
      this.view.flxMainContainer.doLayout = this.view.customfooternew.setMinHeight.bind(this, this.view.flxMain);
      this.view.flxMainContainer.doLayout();
      this.view.customheadernew.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
      this.view.customfooternew.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
    },
    getSearchedRecords: function () {
      this.view.ImportLCDashboard.getSearchedRecords();
    }
  }
});