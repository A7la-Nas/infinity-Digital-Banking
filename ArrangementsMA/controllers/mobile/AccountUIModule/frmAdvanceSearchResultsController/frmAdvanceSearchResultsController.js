define({
  onNavigate:function()
  {
    var scope=this;
    var navMan=applicationManager.getNavigationManager();
    var context = navMan.getCustomInfo("frmAdvanceSearch");
    context["transactionType"]="All";
     context["limit"]=applicationManager.getConfigurationManager().transactionsPerPage;
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
    this.view.customHeader.lblLocateUs.text=context["selectedType"];
    }
     else{
     this.view.title = context["selectedType"];
    }
    this.view.accountsTransactionListNative.setContext(context);
    scope.initActionCalls();
  },
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preshow: function () {
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    var searchParams = navManager.getCustomInfo("frmAdvanceSearch");
    this.view.customSearchbox.tbxSearch.text = searchParams.searchDescription ;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.enableScrolling = true;
    this.titleText = kony.i18n.getLocalizedString("kony.mb.AdvanceSearch.Title");
     //if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone")
      //this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.AdvanceSearch.Title");
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxBlueBg.isVisible = true;
      this.view.flxTransactions.top = "56dp";
    }
    else {
      this.view.flxBlueBg.isVisible = false;
      this.view.flxTransactions.top = "0dp";
    }
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function () {
    this.view.segTransactions.onRowClick = this.segTransactionsOnRowClick;
    this.view.flxHeaderSearchbox.customSearchbox.flxSearchMain.btnCancel.onClick= this.btnCancelClick ;
    this.view.customSearchbox.tbxSearch.onDone = this.searchText;
    this.view.btnDownload.onClick=this.gotoDownload;
    //this.view.flxDummySearch.onTouchEnd = this.textEdit1 ;
     if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone")
    this.view.customHeader.flxBack.onClick = this.navigateBack;
  },
  initActionCalls:function()
  {
    this.view.accountsTransactionListNative.onRequestStart = function() {
      kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    };
    this.view.accountsTransactionListNative.onRequestEnd = function() {
      kony.application.dismissLoadingScreen();
    };
    this.view.accountsTransactionListNative.swipeActionBtn = function(RowData){
      
    }; 
    this.view.accountsTransactionListNative.getTransactionDetails = function(data) {
    if (!JSON.stringify(data).includes("flxNoRecords"))
      {
        applicationManager.getPresentationUtility().showLoadingScreen();
      var moneyMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmMMTransactionDetails", data);
        moneyMod.presentationController.commonFunctionForNavigation("AccountUIModule/frmTransactionDetails");
      }
    }
  },
  gotoDownload:function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmDownloadSearchResult");
  },
  searchText: function(){
  applicationManager.getPresentationUtility().showLoadingScreen();
  var navManager = applicationManager.getNavigationManager();
   var searchParams = navManager.getCustomInfo("frmAdvanceSearch");
   searchParams.searchDescription=this.view.customSearchbox.tbxSearch.text;
   var TransModPresentationController = applicationManager.getModulesPresentationController("AccountUIModule");
   TransModPresentationController.getPendingPostedTransactions(searchParams);
  navManager.setCustomInfo("frmAdvanceSearch",searchParams);
  },
  setTransactionData : function() {
    var scope = this;
    var navManager = applicationManager.getNavigationManager();
    var searchParams = navManager.getCustomInfo("frmAdvanceSearch");
    var TransModPresentationController = applicationManager.getModulesPresentationController("AccountUIModule");
    var transactionData =  TransModPresentationController.getPendPostTransactions();
    var configManager = applicationManager.getConfigurationManager();
    var pendingTransactions = transactionData.pendingTransactions;
    var postedTransactions = transactionData.postedTransactions;
    if(postedTransactions.length===0&&pendingTransactions.length===0){
      this.view.flxSearchResults.flxNoTransactions.setVisibility(true);
      this.view.segTransactions.setVisibility(false);
	   this.view.btnDownload.setVisibility(false);
    }
    else{
      this.view.flxSearchResults.flxNoTransactions.setVisibility(false);
	   this.view.btnDownload.setVisibility(true);
      this.view.segTransactions.setVisibility(true);
      var data = [];
      var data2=[];
      var max_size =0;
      this.view.segTransactions.widgetDataMap = this.getDataMap();
      max_size = Math.abs(pendingTransactions.length-25);
      if(max_size>postedTransactions.length){
        max_size = postedTransactions.length;
      }
      //pending transaction data
      if(!kony.sdk.isNullOrUndefined(pendingTransactions)){
        if(Array.isArray(pendingTransactions)) {
          for(var i=0;i<pendingTransactions.length;i++){
            var forUtility=applicationManager.getFormatUtilManager();
            var trandateobj=forUtility.getDateObjectfromString(pendingTransactions[i]["transactionDate"],"YYYY-MM-DD");
            pendingTransactions[i].transactionDate =  forUtility.getFormatedDateString(trandateobj,forUtility.getApplicationDateFormat());
            pendingTransactions[i].amount = forUtility.formatAmountandAppendCurrencySymbol(pendingTransactions[i]["amount"],pendingTransactions[i]["transactionCurrency"]);
          }
        }
      }
      if(!kony.sdk.isNullOrUndefined(postedTransactions)){
        if(Array.isArray(postedTransactions)) {
          for(var i=0;i<max_size;i++){
            var forUtility = applicationManager.getFormatUtilManager();
            var trandateobj=forUtility.getDateObjectfromString(postedTransactions[i]["transactionDate"],"YYYY-MM-DD");
            postedTransactions[i].transactionDate =  forUtility.getFormatedDateString(trandateobj,forUtility.getApplicationDateFormat());
            postedTransactions[i].amount = forUtility.formatAmountandAppendCurrencySymbol(postedTransactions[i]["amount"],postedTransactions[i]["transactionCurrency"]);
          }
        }
      }
      var dataSeg=  [
        [
          {
            "lblHeader": kony.i18n.getLocalizedString("kony.mb.accdetails.pendingTransactions")
          },
          pendingTransactions
        ],[{"lblHeader": kony.i18n.getLocalizedString("kony.mb.accdetails.postedTransactions")},postedTransactions]];
      this.view.segTransactions.setData(dataSeg);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  // Setting the datamap for the segment
  getDataMap: function(){
    var dataMap = {"lblTransactionAmount": "amount",
                   "lblDate":"transactionDate",
                   "lblTransaction":"description",
                   "transactionId": "transactionId",
                   "lblHeader":"lblHeader"
                  }
    return dataMap;
  },
  segTransactionsOnRowClick:function(){
    var navMan = applicationManager.getNavigationManager();
    var selectedSectionIndex=Math.floor(this.view.segTransactions.selectedRowIndex[0]);
    var selectedRowIndex=Math.floor(this.view.segTransactions.selectedRowIndex[1]);
    var data = navMan.getCustomInfo("frmAdvanceSearch");
    var transactionData=this.view.segTransactions.data[selectedSectionIndex][1][selectedRowIndex];
    if(applicationManager.getConfigurationManager().isFastTransfersFlowEnabled()&&(transactionData.transactionType == "P2P"||transactionData.transactionType == "InternalTransfer"||transactionData.transactionType == "ExternalTransfer")){
      navMan.setCustomInfo("frmMMTransactionDetails",transactionData);
      navMan.setEntryPoint("frmMMTransactionDetails","AdvanceSearch");
      navMan.navigateTo("frmMMTransactionDetails");
    }
    else{
      if (applicationManager.getConfigurationManager().getDeploymentGeography() === "EUROPE") {
        navMan.setCustomInfo("frmEuropeTransactionDetails", transactionData);
        navMan.setEntryPoint("frmEuropeTransactionDetails", "AdvanceSearch");
        navMan.navigateTo("frmEuropeTransactionDetails")
      }
      else {
        navMan.setCustomInfo("frmTransactionDetails",transactionData);
        navMan.setEntryPoint("frmTransactionDetails","AdvanceSearch");
        var transModPresentationController = applicationManager.getModulesPresentationController("AccountUIModule");
        transModPresentationController.commonFunctionForNavigation("frmTransactionDetails");
      }  
    }
  },
  navigateBack: function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  onScrollEndTransactions : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var searchParams = navManager.getCustomInfo("frmAdvanceSearch");
    var segData = this.view.segTransactions.data ;
    if(this.enableScrolling ===true && segData[1][1].length>=25)
    {
       var TransModPresentationController = applicationManager.getModulesPresentationController("AccountUIModule");
       TransModPresentationController.getNextPostedTransactions(searchParams,segData);
    }
    else
     {
       applicationManager.getPresentationUtility().dismissLoadingScreen();
      return;
     }
  },
  assignScrollEndData : function(response){
    if(response){
      if(response.length<25)
        this.enableScrolling = false;
      var data2=[] ;
      var configManager = applicationManager.getConfigurationManager();
      // looping the data
      var len =  this.view.segTransactions.data[1][1].length ;
      for(var i=0;i<response.length;i++){
        var forUtility=applicationManager.getFormatUtilManager();
        var trandateobj=forUtility.getDateObjectfromString(response[i]["transactionDate"],"YYYY-MM-DD");
        response[i].transactionDate =  forUtility.getFormatedDateString(trandateobj,forUtility.getApplicationDateFormat());
        response[i].amount = forUtility.formatAmountandAppendCurrencySymbol(response[i]["amount"],response[i]["transactionCurrency"]);
        this.view.segTransactions.addDataAt(response[i],i+len,1);
      }
    }
  },
  textEdit1 : function(){
    this.view.flxHeaderSearchbox.customSearchbox.tbxSearch.setFocus = false;
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  btnCancelClick : function()
  {
    var transModPresentationController = applicationManager.getModulesPresentationController("AccountUIModule");
    transModPresentationController.commonFunctionForNavigation("frmAdvanceSearch");
  }
});