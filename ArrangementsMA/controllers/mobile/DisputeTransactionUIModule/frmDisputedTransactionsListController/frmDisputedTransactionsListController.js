define(['CommonUtilities'], function (CommonUtilities) {
  return {
  init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	  this.view.onNavigate = this.onNavigate;
  },
   onNavigate: function () {
	    // Footer Menu
		if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
		  var footerMenuUtility = require("FooterMenuUtility");
		  this.footerMenuUtility =
			footerMenuUtility.getFooterMenuUtilityInstance();
		  var cm = applicationManager.getConfigurationManager();
		  this.footerMenuUtility.entitlements = {
			features: cm.getUserFeatures(),
			permissions: cm.getUserPermissions(),
		  };
		  this.footerMenuUtility.scope = this;
		}
    },
  preShow: function() {
    
    this.view.flxNoTransactions.top="0dp";
    this.view.flxMainContainer.skin="slFbox";
       if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
       this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "0dp";

		this.view.customHeader.flxBack.isVisible = false;
       }
       else
       {
            //Footer menu //osama
        //this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
        //this.view.flxMainContainer.top = "56dp";
      }
    this.view.segAccounts.rowFocusSkin = "sknFlxf9f9f9";
    this.view.flxNoTransactions.isVisible=false;
    this.view.segAccounts.isVisible=true;
    this.setSegmentData();
    this.initActions();
    this.bindGenericSuccess();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
	
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions: function() {
    var scope = this;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    //osama
    this.view.onDeviceBack = this.navigateCustomBack;
    this.view.segAccounts.onRowClick = function() {
      scope.segmentRowClick();
    };
  },
  navigateCustomBack: function() {
 //     var disputeTransactions = applicationManager.getModulesPresentationController({"moduleName" : "DisputeTransactionUIModule", "appName" : "ArrangementsMA"});
//     disputeTransactions.commonFunctionForgoBack();
   var accountMod = applicationManager.getModulesPresentationController({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"});
   accountMod.showDashboard();
  },
  segmentRowClick: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var rowindex;
    rowindex = Math.floor(this.view.segAccounts.selectedRowIndex[1]);
    selectedAccount = this.view.segAccounts.data[rowindex];
    var navMan=applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmDisputedTransactionsList",selectedAccount);
    var disputeModule = applicationManager.getModulesPresentationController({"moduleName" : "DisputeTransactionUIModule", "appName" : "ArrangementsMA"});
    var frmName = {
                    "appName": "ArrangementsMA",
                    "friendlyName": "frmDisputeTransactionDetails"
                };
            disputeModule.commonFunctionForNavigation(frmName);
  },
  setSegmentData: function() {
    this.view.segAccounts.widgetDataMap=this.getWidgetDataMap();
    var disputeTransactions= applicationManager.getModulesPresentationController({"moduleName" : "DisputeTransactionUIModule", "appName" : "ArrangementsMA"});
    var data = disputeTransactions.getAlldisputeTransactions();
    if(data && data.length>0){
      this.view.flxNoTransactions.setVisibility(false);
      this.view.segAccounts.setVisibility(true);
      var segData=this.processData(data);
      this.view.segAccounts.setData(segData); 
    }
    else{
      this.view.flxNoTransactions.setVisibility(true);
     this.view.segAccounts.setVisibility(false);
    }
    
  },
  getWidgetDataMap: function () {
    var dataMap = {
      lblAccountName: "formattedfromAccountName",
      lblBankName: "orderStatus",
      lblAccountBalValue: "formattedAmount",
      lblAccountBal:"formattedDisputeDate",
      flxMain: "flxMain",
      "orderId": "orderId",
      "template": "flxAccountsNoImage"
    };
    return dataMap;
  },
  processData : function(data){
    var forUtility = applicationManager.getFormatUtilManager();
    for(var i=0;i<data.length;i++){
      if(data[i].orderedDate){
        var trandateobj=forUtility.getDateObjectfromString(data[i].orderedDate, "YYYY-MM-DD");
        var formattedDisputeDate =  forUtility.getFormatedDateString(trandateobj, forUtility.getApplicationDateFormat());
        data[i].formattedDisputeDate=formattedDisputeDate;
      } else {
        data[i].formattedDisputeDate = "-";
      }
      if(data[i].transactionDate){
        var trandateobj=forUtility.getDateObjectfromString(data[i].transactionDate, "YYYY-MM-DD");
         var formattedTransactionDate =  forUtility.getFormatedDateString(trandateobj, forUtility.getApplicationDateFormat());
        data[i].formattedTransactionDate=formattedTransactionDate;
      } else {
        data[i].formattedTransactionDate = "-";
      }
      if(data[i].amount){
        var configManager = applicationManager.getConfigurationManager();
        if(data[i].transactionCurrency){
          var formattedAmount= CommonUtilities.formatCurrencyWithCommas(data[i].amount, true, data[i].transactionCurrency);
          data[i].formattedAmount=formattedAmount;
        }
        else{
          var formattedAmount= CommonUtilities.formatCurrencyWithCommas(data[i].amount, false);
          data[i].formattedAmount=formattedAmount;
        }
       } else {
         data[i].formattedAmount = "-";
       }
      if(data[i].fromAccountNumber && data[i].fromAccountName){
        data[i].formattedfromAccountName=applicationManager.getPresentationUtility().formatText(data[i].fromAccountName, 10, data[i].fromAccountNumber, 4);
      } else {
        data[i].formattedfromAccountName = "-";
      }
      if (data[i].statusDescription || data[i].orderStatus ) {
        //data[i].orderStatus = data[i].statusDescription || data[i].orderStatus;
        data[i].orderStatus = "Requested";
      } else {
        data[i].orderStatus = "-";
      }
      if (data[i].disputeId || data[i].orderId) {
        data[i].orderId = data[i].disputeId || data[i].orderId;
      } else {
        data[i].orderId = "-";
      }
    }
    return data;
  },
  bindGenericSuccess : function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var disputeTransactions = applicationManager.getModulesPresentationController({"moduleName" : "DisputeTransactionUIModule", "appName" : "ArrangementsMA"});
    if(disputeTransactions.isRequestCancelled){
      disputeTransactions.isRequestCancelled=false;
     applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.disputeTransaction.cancelledDisputepopup"));
    }
  },
  }
});
