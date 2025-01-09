define({
  onNavigate: function (obj) {
    if (obj === undefined) {
      return;
    }
  },
  init:function(){
  	this.initActions();
  },
  preShow: function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    var navManager = applicationManager.getNavigationManager();
    var transactionDetails=navManager.getCustomInfo("frmManageTransferRecipientEurope");
    var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var benificiaryDetails=transferModPresentationController.getBenificiaryData();
    var txns=transactionDetails.Transactions;
    this.view.customHeader.lblLocateUs.text=benificiaryDetails.nickName;
    this.view.title=benificiaryDetails.nickName;
    this.setAccountDetails(benificiaryDetails);
    this.setTransactions(txns);
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function () {
    var scope = this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.btnTransfer.setVisibility(false);
    this.view.btnTransfer.onClick=function(){
      var transModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      transModPresentationController.setTransferToInfo();
     var navMan=applicationManager.getNavigationManager();
     navMan.setEntryPoint("makeatransfer","frmManageTransferRecipientEurope");
    };
    this.view.segTransactions.onRowClick = this.segTransactionsOnRowClick;
    this.view.customHeader.flxBack.onClick = function () {
		var navMan=applicationManager.getNavigationManager();
        navMan.goBack();
    };
    this.view.customHeader.flxSearch.onClick = function () {
      scope.showBenificiaryDetails();
    };
  },
  iphoneInformationIcononClick : function () {
    this.showBenificiaryDetails();
  },
  showBenificiaryDetails:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transferModulePresentationController.commonFunctionForNavigation("frmManageTransferRecipientInfoEurope");
  },
  setAccountDetails:function(accountDetails){
    this.view.lblBankName.text=accountDetails.bankName;
    this.view.lblAccountType.text=accountDetails.accountType;
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
	if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
      this.view.imgBank.isVisible=false;
    }
    else{
      this.view.imgBank.isVisible=true;
      this.view.imgBank.src="externalbank.png";
    }
  },
  setTransactions:function(data){
    var segmentData=[];
    for(var i=0;i<data.length;i++){
      if(data[i].transactionType==="ExternalTransfer"){
        data[i].fromAccountName=data[i].fromNickName;
        data[i].scheduledDate=data[i].transactionDate;
        segmentData.push(data[i]);
      }
    }
    var dataMap=this.getDataMap();
    this.view.segTransactions.widgetDataMap=dataMap;
    this.view.segTransactions.isVisible=true;
    if(segmentData.length>0){
    	this.view.flxNoTransactions.isVisible=false;
    	this.view.segTransactions.setData(segmentData);
    }else{
      this.view.segTransactions.isVisible=false;
      this.view.flxNoTransactions.isVisible=true;
    }
  },
  getDataMap : function(){
    var dataMap={};
    dataMap = {
      "lblAccountName":"description",
      "lblAccountBal":"transactionDate",
      "lblAccountBalValue":"amount",
      "lblTypeName":"lblHeader",
      "lblTypeValue":""
    };
    return dataMap;
  },
  segTransactionsOnRowClick:function(){
    var navManager = applicationManager.getNavigationManager();
	navManager.setEntryPoint("makeatransfer","frmManageTransferRecipientEurope");
    var transactionDetails=navManager.getCustomInfo("frmManageTransferRecipientEurope");
    var data=this.view.segTransactions.selectedRowItems[0];
    navManager.setCustomInfo("frmEuropeTransactionDetails",data);
	navManager.setEntryPoint("frmEuropeTransactionDetails","ManageTransferRecipient");
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transferModulePresentationController.commonFunctionForNavigation("frmEuropeTransactionDetails");
  }
});
