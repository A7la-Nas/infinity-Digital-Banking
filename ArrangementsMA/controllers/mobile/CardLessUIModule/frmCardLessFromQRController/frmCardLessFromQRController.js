define({
  cardlessAccounts:null,
  preShow:function(){
    var self = this;
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    }
    var navMan=applicationManager.getNavigationManager();
    var fromAccountsList = navMan.getCustomInfo("frmCardLessFromQR");
    var fromaccounts = fromAccountsList.fromaccounts;
    this.view.customSearchbox.tbxSearch.text="";
    this.view.flxMainContainer.skin="slfSbox";
    this.view.tbxSearch.text="";
    this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
    var accProcessedData = (JSON.parse(JSON.stringify(fromaccounts)));
    this.setSegmentData(accProcessedData);
    this.view.flxSearch.top = "0dp";
    this.addDummyRows();
    this.btnCancelOnClick();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
     this.view.segToAccount.onScrolling = function () {
      self.transactionsSegmentOnScrolling();
    }
  },
   addDummyRows: function () {
        var segWidgetDataMap = this.view.segToAccount.widgetDataMap;
        segWidgetDataMap["flxEmptyHeader"] = "flxEmptyHeader";
        segWidgetDataMap["flxEmptyRow"] = "flxEmptyRow";
        this.view.segToAccount.widgetDataMap = segWidgetDataMap;
        var segData = this.view.segToAccount.data;
        var segLength = 0;
        for (let i = 0; i < segData.length; i++) {
            segLength = segLength + (segData[i][1].length * 70) + 49; //66 is the row height and 49 is the header height
        }
                if(segData == null || segData == undefined){
          segData = [];
        }
        segData.unshift([{
                "template": "flxEmptyHeader",
                "flxEmptyHeader": {
                    "height": "0dp"
                }
            },
            [{
                "template": "flxEmptyRow",
                "flxEmptyRow": {
                    "height": "145dp"
                }
            }]
        ]);
        segLength = segLength + 145;
        this.view.segToAccount.setData(segData);
        this.segLength = segLength;
    },
  transactionsSegmentOnScrolling: function () {
        var parallaxSpeed = 1;
        var yOffset = this.view.segToAccount.contentOffsetMeasured.y;
        this.view.flxSearch.top = 0 - (yOffset * parallaxSpeed) + "dp";
    },
  init : function(){
    this.view.customHeader.flxBack.onClick=this.flxBackOnClick;
    this.view.tbxSearch.onTouchStart = this.tbxSearchOnTouchEnd;
    this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
    this.view.customSearchbox.btnCancel.onClick = this.btnCancelOnClick;
    this.view.segToAccount.onRowClick = this.segToAccountOnRowClick;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  segToAccountOnRowClick:function(){
   	applicationManager.getPresentationUtility().showLoadingScreen();
    var navMan=applicationManager.getNavigationManager();
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    var preAccData = this.view.segToAccount.selectedItems[0];
    cardlessModule.presentationController.setFromAccountDetails(preAccData);
    var txnDetails=cardlessModule.presentationController.getTransactionObject();
	txnDetails=cardlessModule.presentationController.processAccountsData(txnDetails);
    navMan.setCustomInfo("frmCardLessWithdrawQR",txnDetails);
    cardlessModule.presentationController.commonFunctionForNavigation("frmCardLessWithdrawQR");
  },
  flxBackOnClick:function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  tbxSearchOnTouchEnd: function() {
    this.view.flxMainContainer.skin="sknFlxScrlffffff";
	this.view.customSearchbox.tbxSearch.setFocus(true);
    this.view.tbxSearch.setFocus(true);
    this.view.flxHeader.setVisibility(false);
    this.view.flxHeaderSearchbox.setVisibility(true);
    this.view.flxMainContainer.top = "40dp";
    this.view.flxSearch.setVisibility(false);
  },
  btnCancelOnClick: function() {
    this.view.flxMainContainer.skin="slfSbox";
    this.view.customSearchbox.tbxSearch.text="";
    this.view.tbxSearch.text="";
    this.view.flxHeaderSearchbox.setVisibility(false);
    this.view.flxSearch.setVisibility(true);
    this.view.flxNoTransactions.isVisible=false;
    this.view.lblNoTransaction.isVisible=false;
    this.view.segToAccount.isVisible=true;
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
      this.view.segToAccount.top="56dp";
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    this.view.segToAccount.setData(this.cardlessAccounts);
    this.addDummyRows();
  },
  setSegmentData:function(res){
    var dataMap=this.getDataMap();
    this.view.segToAccount.widgetDataMap=dataMap;
    if(res.length === 0)
    {
      this.view.segToAccount.isVisible=false;
      this.view.flxNoTransactions.isVisible=true;
      this.view.lblNoTransaction.isVisible=true;
    }
    else
    {
      this.view.segToAccount.isVisible=true;
      this.view.flxNoTransactions.isVisible=false;
      this.view.lblNoTransaction.isVisible=false;
      var forUtility=applicationManager.getFormatUtilManager();
      for(var i =0 ; i < res.length;i++)
      {
        res[i].lblAccountBal=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.AvailableBalance");
        res[i].amount=res[i].availableBalance;
        res[i].availableBalance=forUtility.formatAmountandAppendCurrencySymbol(res[i].availableBalance);
      }
      this.view.segToAccount.setData(res);
      this.cardlessAccounts=res;
    }
  },
  getDataMap : function(){
    var dataMap={};
    dataMap = {
      "lblAccountName":"accountName",
      "lblAccountBal":"lblAccountBal",
      "lblAccountBalValue":"availableBalance",
      "lblBankName":"accountType",
      "accountID":"accountID",
      "amount":"amount"
    };
    return dataMap;
  },
  tbxSearchOnTextChange:function(){
    var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    var data = this.cardlessAccounts;
    var searchSegmentData= applicationManager.getDataProcessorUtility().commonSegmentSearch("accountName",searchtext,data);
    if(searchSegmentData && searchSegmentData.length===0){
      this.view.flxNoTransactions.isVisible=true;
      this.view.lblNoTransaction.isVisible=true;
      this.view.segToAccount.isVisible=false;
    }
    else{
      this.view.flxNoTransactions.isVisible=false;
      this.view.lblNoTransaction.isVisible=false;
      this.view.segToAccount.isVisible=true;
      this.view.segToAccount.setData(searchSegmentData);
      this.addDummyRows();
    }
  }
});