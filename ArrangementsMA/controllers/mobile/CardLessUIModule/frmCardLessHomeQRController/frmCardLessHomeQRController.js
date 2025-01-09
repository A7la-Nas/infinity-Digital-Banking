define({
  pendingTxns:null,
  postedTxns:null,
  segmentData:null,
  preShow: function() {
     var scope =this;
    this.setFooterSkin();
    //this.view.tbxSearch.onTouchStart = this.tbxSearchOnTouchEnd;
    //this.view.customSearchbox.tbxSearch.text="";
    this.view.tbxSearch.text="";
    //this.view.customSearchbox.btnCancel.onClick = this.btnCancelOnClick;
    //this.view.segDepositFrom.onRowClick = this.segDepositFromOnClick;
    var configManager = applicationManager.getConfigurationManager();
    var MenuHandler =  applicationManager.getMenuHandler();
    MenuHandler.setUpHamburgerForForm(scope,configManager.constants.MENUCARDLESS);
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    }
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    var transactionID =  cardlessModule.presentationController.getTransactionId();
    if(transactionID)
    {
      this.showTransactionsToastMessage(transactionID);
      cardlessModule.presentationController.setTransactionId();
    }
    this.view.flxWithdrawCash.onTouchStart = function(){
      scope.view.imgCheckDeposit.src = "withdrawcashtap.png";
    };
    this.view.flxWithdrawCash.onTouchEnd = function(){
      scope.view.imgCheckDeposit.src = "withdrawcash.png";
    };
    var navManager = applicationManager.getNavigationManager();
    navManager.setEntryPoint("cancelCardlessTransaction","frmCardLessHomeQR");
    var transactionDetails=navManager.getCustomInfo("frmCardLessHomeQR");
    var pendingTransactions=transactionDetails.pendingTransactions;
    var postedTransactions=transactionDetails.postedTransaction;
    this.view.flxNoTransactions.isVisible=false;
    this.setTransactions(pendingTransactions,postedTransactions);
    this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
    this.view.segDepositFrom.isVisible=true;
    this.view.flxWithdrawCash.isVisible=true;
    this.btnCancelOnClick();
    this.showDeletedToast();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  init: function(){
    this.view.flxWithdrawCash.onClick = this.flxWithdrawCashOnClick;
    this.view.tbxSearch.onTouchStart = this.tbxSearchOnTouchEnd;
    this.view.customSearchbox.btnCancel.onClick = this.btnCancelOnClick;
    this.view.segDepositFrom.onRowClick = this.segDepositFromOnClick;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  postShow: function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  bindGenericSuccess : function(msg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,msg);
  },
  showTransactionsToastMessage:function(transactionID){
    this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardLess.transactionMessage")+transactionID);
  },
  setFooterSkin: function() {
    if(applicationManager.getPresentationFormUtility().getDeviceName()==='iPhone')
    {
      this.view.customFooter.lblAccounts.skin = "sknLblA0A0A0SSP20px";
      this.view.customFooter.flxAccSelect.setVisibility(false);
      this.view.customFooter.lblTransfer.skin = "sknLblA0A0A0SSP20px";
      this.view.customFooter.flxTransferSel.setVisibility(false);
      this.view.customFooter.lblBillPay.skin = "sknLblA0A0A0SSP20px";
      this.view.customFooter.flxBillSelected.setVisibility(false);
      this.view.customFooter.lblMore.skin = "sknLbl424242SSP20px";
      this.view.customFooter.flxMoreSelect.setVisibility(true);
    }
  },
  flxWithdrawCashOnClick: function() {
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cardlessModule.presentationController.navigateToNewCashWithDrawQRForm();
    var navMan=applicationManager.getNavigationManager();
    navMan.setEntryPoint("cardlessEntry","frmCardLessHomeQR");
    cardlessModule.presentationController.clearTransactionObject();
  },
  segDepositFromOnClick:function(){
    var navMan = applicationManager.getNavigationManager();
    var selectedSectionIndex=Math.floor(this.view.segDepositFrom.selectedRowIndex[0]);
    var selectedRowIndex=Math.floor(this.view.segDepositFrom.selectedRowIndex[1]);
    var transactionData=this.view.segDepositFrom.data[selectedSectionIndex][1][selectedRowIndex];
    navMan.setCustomInfo("frmTransactionDetails",transactionData);
    navMan.setEntryPoint("frmTransactionDetails","CardLess");
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cardlessModule.presentationController.commonFunctionForNavigation("frmTransactionDetails");
  },
  setTransactions:function(pendingTransactions,postedTransactions){
    var dataMap=this.getDataMap();
    var postedTransactions=postedTransactions;
    var pendingTransaction=pendingTransactions;
    this.pendingTxns=pendingTransactions;
    this.postedTxns=postedTransactions;
    this.view.segDepositFrom.widgetDataMap=dataMap;
    this.view.segDepositFrom.isVisible=true;
    this.view.flxNoTransactions.isVisible=false;
    if(pendingTransaction.length>0&&postedTransactions.length>0){
      var data=  [[{"lblHeader": "Pending Transactions"},pendingTransaction],[{"lblHeader": "Posted Payments" /*"Posted Transactions"*/ },postedTransactions]];
      this.view.segDepositFrom.setData(data);
    }
    else if(pendingTransaction.length>0){
      var data=  [[{"lblHeader": "Pending Transactions"},pendingTransaction]];
      this.view.segDepositFrom.setData(data);
      this.view.lblHeaderPending.text="Posted Payments"; //"Posted Transactions";
      this.view.flxNoTransactions.isVisible=true;
    }
    else if(postedTransactions.length>0){
      this.view.lblHeaderPending.text="Pending Transactions";
      this.view.flxNoTransactions.isVisible=true;
      var data=  [[{ "lblHeader": "Posted Payments" /*"Posted Transactions"*/},postedTransactions]];
      this.view.segDepositFrom.setData(data);
    }
    else{
      this.view.segDepositFrom.isVisible=false;
      this.view.flxNoTransactions.isVisible=true;
    }
    this.segmentData=this.view.segDepositFrom.data;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  tbxSearchOnTextChange:function()
  {
    var navObj=applicationManager.getNavigationManager();
     var searchtext= this.view.customSearchbox.tbxSearch.text.toLowerCase();
    this.view.flxMainContainer.skin="sknFlxScrlffffff";
    if(searchtext)
    {
      var data=[],headers=[];
      headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingTransactions"));
      headers.push(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.postedTransactions"));
      data.push(this.pendingTxns);
      data.push(this.postedTxns);
      this.view.segDepositFrom.isVisible=true;
      this.view.flxNoTransactions.isVisible=false;
      this.view.flxWithdrawCash.isVisible=false;
      this.view.segDepositFrom.removeAll();
      var searchobj= applicationManager.getDataProcessorUtility().commonSectionSegmentSearch("description",searchtext,data,headers);
      if(searchobj.length>0)
      {
        this.view.segDepositFrom.setData(searchobj);
      }
      else
      {
        this.view.segDepositFrom.isVisible=false;
        this.view.flxNoTransactions.isVisible=true;
        this.view.flxSeperator3.isVisible=false;
      }
    }
    else
    {
      if(this.segmentData.length>0)
      {
        this.view.segDepositFrom.setData(this.segmentData);
        this.view.segDepositFrom.isVisible=true;
        this.view.flxNoTransactions.isVisible=false;
        this.view.flxWithdrawCash.isVisible=true;
      }
      else
      {
        this.view.flxWithdrawCash.isVisible=true;
        this.view.segDepositFrom.isVisible=false;
        this.view.flxNoTransactions.isVisible=true;
        this.view.flxSeperator3.isVisible=false;
      }
    }
  },
  getDataMap : function(){
    var dataMap={};
    dataMap = {
      "lblAccountName":"description",
      "lblAccountBal":"scheduledDate",
      "lblAccountBalValue":"amount",
      "lblHeader":"lblHeader"
    };
    return dataMap;
  },
  tbxSearchOnTouchEnd: function() {
    this.view.flxMainContainer.skin="sknFlxScrlffffff";
	this.view.customSearchbox.tbxSearch.setFocus(true);
    this.view.tbxSearch.setFocus(true);
    this.view.customSearchbox.tbxSearch.text="";
    this.view.flxHeader.setVisibility(false);
    this.view.flxHeaderSearchbox.setVisibility(true);
    this.view.flxMainContainer.top = "40dp";
    this.view.flxSearch.setVisibility(false);
    this.view.flxShadow.setVisibility(false);
    this.view.flxWithdrawCash.setVisibility(false);
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="android"){
      this.view.flxGradient.top = "40dp";
    }
    this.view.customSearchbox.tbxSearch.setFocus(true);
  },
  btnCancelOnClick: function() {
    var navManager = applicationManager.getNavigationManager();
    this.view.flxMainContainer.skin="slfSbox";
	this.view.customSearchbox.tbxSearch.text="";
    this.view.tbxSearch.text="";
    var transactionDetails=navManager.getCustomInfo("frmCardLessHomeQR");
    var pendingTransactions=transactionDetails.pendingTransactions;
    var postedTransactions=transactionDetails.postedTransaction;
    this.view.flxNoTransactions.isVisible=false;
    this.setTransactions(pendingTransactions,postedTransactions);
    this.view.flxHeaderSearchbox.setVisibility(false);
    this.view.flxShadow.setVisibility(true);
    this.view.flxSearch.setVisibility(true);
    this.view.segDepositFrom.setVisibility(true);
    this.view.flxWithdrawCash.setVisibility(true);
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
      this.view.flxGradient.top = "56dp";
    }
  },
    showDeletedToast:function(){
  	if(scope_cardlessPresentationController.deletedTransactionFlag){
     	applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardless.cancelTransaction")+ "with reference id: "+scope_cardlessPresentationController.transactionId));
       	scope_cardlessPresentationController.deletedTransactionFlag=false;
     }
    if(scope_cardlessPresentationController.deletedTransactionErrorFlag){
       	applicationManager.getDataProcessorUtility().showToastMessageError(this,scope_cardlessPresentationController.deletedTransactionErrorMessage);
       	scope_cardlessPresentationController.deletedTransactionErrorFlag=false;
    }
  }
});
