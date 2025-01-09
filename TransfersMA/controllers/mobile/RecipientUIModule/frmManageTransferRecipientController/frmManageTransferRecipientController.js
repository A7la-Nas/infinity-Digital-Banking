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
    var transactionDetails=navManager.getCustomInfo("frmManageTransferRecipient");
    var transferModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
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
    this.view.btnTransfer.onClick=function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var cm=applicationManager.getConfigurationManager();
      if(cm.isFastTransfersFlowEnabled()){
        var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
                navManager.setEntryPoint("makeatransferMoneyModule", "frmManageTransferRecipientInfo");
        moneyMovementPresentationController.haveLimitsBeenFetched = false;
        moneyMovementPresentationController.initializeStateData(false, "");
        moneyMovementPresentationController.setTransferToAccountFromManageFlow();
      }
      else{
        var transMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferEuropeUIModule");
        transMod.presentationController.setTransferToInfo();
        navManager.setEntryPoint("makeatransfer","frmManageTransferRecipient");
      }
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
    var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    transferModulePresentationController.commonFunctionForNavigation("frmManageTransferRecipientInfo");
  },
  setAccountDetails:function(accountDetails){
    this.view.lblBankName.text=accountDetails.bankName;
    this.view.lblAccountType.text=accountDetails.accountType;
    var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
	/*if(transferModulePresentationController.getFlowType()==="SameBankRecipients"){
      this.view.imgBank.isVisible=false;
    }
    else{
      this.view.imgBank.isVisible=true;
      this.view.imgBank.src="externalbank.png";
    }*/
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
	navManager.setEntryPoint("makeatransfer","frmManageTransferRecipient");
    navManager.getCustomInfo("frmManageTransferRecipient");
    var data=this.view.segTransactions.selectedRowItems[0];
    if(applicationManager.getConfigurationManager().isFastTransfersFlowEnabled()){
      navManager.setCustomInfo("frmMMTransactionDetails",data);
      navManager.setEntryPoint("frmMMTransactionDetails","ManageTransferRecipient");
      navManager.navigateTo("frmMMTransactionDetails");
    }
    else{
      navManager.setCustomInfo("frmTransactionDetails",data);
      navManager.setEntryPoint("frmTransactionDetails","ManageTransferRecipient");
      var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
      transferModulePresentationController.commonFunctionForNavigation("frmTransactionDetails");
    }
  },
});