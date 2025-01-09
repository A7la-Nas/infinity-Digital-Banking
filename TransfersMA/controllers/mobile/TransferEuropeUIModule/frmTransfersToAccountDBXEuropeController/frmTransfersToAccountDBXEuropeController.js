define({
  transferType: '',
  internalAccounts:null,
  externalFreqAccounts:null,
  externalAllAcconts:null,
  segmentData:null,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
   preShow: function() {
  //  applicationManager.getPresentationUtility().dismissLoadingScreen();
     if (this.view.flxHeaderSearchbox.isVisible === true) {
             this.view.flxHeaderSearchbox.isVisible = false;
             this.view.flxSearch.isVisible = true;
             this.view.flxHeader.isVisible = true;
             this.view.flxMainContainer.top = "56dp";
        }
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
    this.view.flxMainContainer.skin = "slFSboxmb";
    this.view.segAccounts.isVisible=true;
    this.view.flxNoTransactions.isVisible=false;
    this.initActions();
  this.showAddedToastMessage();
  applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function() {
    var scope = this;
    scope.segmentDataSet();
    this.view.customHeader.flxBack.onClick = function() {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    }
    this.view.segAccounts.onRowClick = function() {
      scope.segmentRowClick();
    }
    this.view.tbxSearch.onTouchStart = this.showSearch;
    // this.view.tbxSearch.onTextChange = this.showSearch;
    this.view.customSearchbox.btnCancel.onClick = this.showSearch;
    this.view.customHeader.btnRight.onClick =this.cancelOnClick;
  },
  cancelOnClick:function()
  {
    var transferModulePresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
        transferModulePresentationController.cancelCommon();
  },
  segmentDataSet:function()
  {
    var scope = this;
    var navMan=applicationManager.getNavigationManager();
    var accdata=  navMan.getCustomInfo("frmTransfersToAccount");
    var internalAcc=accdata.internalAccounts;
    scope.myKonySegmentData(internalAcc);
  },
  segmentRowClick: function() {
    var navMan=applicationManager.getNavigationManager();
    var accdata=  navMan.getCustomInfo("frmTransfersToAccount");
     var rowindex=Math.floor(this.view.segAccounts.selectedRowIndex[1]);
      var selectedAccountData=this.view.segAccounts.data[rowindex];
      accdata.selectedAccountData=selectedAccountData;
    navMan.setCustomInfo("frmTransfersToAccount",accdata);
    var transModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transModPresentationController.navAfterToAcc();
  },
  myKonySegmentData: function(data) {
    this.view.flxMainContainer.bottom = "0dp";
     this.view.btnAddRecipient.setVisibility(false);
    var transModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var processedData=transModPresentationController.processAccountsData(data);
    if(processedData.length>0)
    {
      this.view.flxNoTransactions.isVisible=false;
      this.view.segAccounts.isVisible=true;
      this.view.segAccounts.widgetDataMap={
        lblAccountName:"processedName",
        lblBankName:"bankName",
        lblAccountBalValue:"availableBalance",
        lblAccountBal:"accountBalanceType",
        accountNumber:"accountID",
        accountType:"accountType"
      };
      this.view.segAccounts.setData(processedData);
      this.segmentData=this.view.segAccounts.data;
      this.internalAccounts=this.view.segAccounts.data;
    }
    else
    {
      this.segmentData=[];
      this.internalAccounts=[];
      this.view.flxNoTransactions.isVisible=true;
      this.view.segAccounts.isVisible=false;
    }
  },
  showSearch: function() {
    //     if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
    //     } else {
    if (this.view.flxHeaderSearchbox.isVisible === true) {
      this.view.flxHeaderSearchbox.isVisible = false;
      this.view.flxMainContainer.skin = "slFSboxmb";
      this.view.flxSearch.isVisible = true;
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "0dp";
      }
      else{
        this.view.flxHeader.isVisible = true;
         this.view.flxMainContainer.top = "56dp";
      }
      if(this.segmentData.length>0)
      {
        this.view.segAccounts.setData(this.segmentData);
        this.view.flxNoTransactions.isVisible=false;
        this.view.segAccounts.isVisible=true;
      }
      else
      {
        this.view.flxNoTransactions.isVisible=true;
        this.view.segAccounts.isVisible=false;
      }
    } else {
      this.view.flxMainContainer.skin = "slFSbox0gff85612494c44Tab";
      this.view.flxSearch.isVisible = false;
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "40dp";
      this.view.customSearchbox.tbxSearch.text="";
      this.view.flxHeaderSearchbox.isVisible = true;
      this.view.customSearchbox.tbxSearch.setFocus(true);
      this.view.customSearchbox.tbxSearch.onTextChange=this.searchdata;
    }
    // }
  },
  searchdata: function()
  {
    var accdatajson={},searchData;
    var navMan=applicationManager.getNavigationManager();
//     var resMan=applicationManager.getRecipientsManager();
    var accdata=  navMan.getCustomInfo("frmTransfersToAccount");
    var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
    if(searchtext)
    {
      var data = [],headers = [];
      this.view.segAccounts.removeAll();
      data = this.internalAccounts;
      searchData = applicationManager.getDataProcessorUtility().commonSegmentSearch("accountName",searchtext,data);
      //         accdatajson.internalAccounts=this.internalAccounts;
      //         searchData=resMan.searchAccounts(searchtext,accdatajson,accdata.type);
      if(searchData.length>0)
      {
        this.view.segAccounts.setData(searchData);
        this.view.flxNoTransactions.isVisible=false;
        this.view.segAccounts.isVisible=true;
      }
      else
      {
        this.view.segAccounts.isVisible=false;
        this.view.flxNoTransactions.isVisible=true;
      }
    }
    else
    {
      if(this.segmentData.length>0)
      {
        this.view.segAccounts.setData(this.segmentData);
        this.view.flxNoTransactions.isVisible=false;
        this.view.segAccounts.isVisible=true;
      }
      else
      {
        this.view.flxNoTransactions.isVisible=true;
        this.view.segAccounts.isVisible=false;
      }
    }
  },
  showAddedToastMessage:function(){
      var navManager = applicationManager.getNavigationManager();
      var accdata = navManager.getCustomInfo("frmTransfersToAccount");
      if(accdata.addedFlag){
          this.bindGenericSuccess(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.addBenificiary"));
          accdata.addedFlag = false;
          navManager.setCustomInfo("frmTransfersToAccount",accdata);
      }
    },
    bindGenericSuccess : function(msg){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,msg);
    }
});