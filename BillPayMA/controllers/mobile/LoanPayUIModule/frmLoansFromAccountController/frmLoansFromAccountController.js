define(['CampaignUtility'], function(CampaignUtility){
  return{
  segmentData:null,
  sec: -1,
  row: -1,
  segmentHeight:0,
  rowTemplateHeight:70,
  sectionTemplateHeight:60,
  init: function () {
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },

  navigateCustomBack: function() {
    var navigationManager = applicationManager.getNavigationManager();
    navigationManager.goBack();
  },
  
  //Purpose is to scroll to the selected row while moving to and fro between screens.
  postShow: function() {
    // var scope = this;
    // if (this.sec !== "" && this.row !== "" && this.sec !== -1 && this.row !== -1) {
    //   if (!(this.sec === 0 && this.row === 0)) {
    //     if ((kony.os.deviceInfo().name !== "iPhone")) {
    //       //Need to invoke scroll manually (only in android) to get the UX experience of docking whenever segment rendered data is greater than viewable area.
    //       if(parseInt(this.segmentHeight)>this.view.segTransactions.frame.height || (this.view.segTransactions.frame.height-(this.segmentHeight))<this.rowTemplateHeight)
    //         this.scrollManually();
    //     } else {
    //       scope.view.segTransactions.selectedRowIndex = [this.sec + 1, this.row];
    //     }
    //   }
    // }
  },

  preShow: function () {
    this.view.flxMainContainer.skin = "slfSbox";
    var self = this;
    this.segmentHeight=0;
    if (this.view.flxHeaderSearchbox.height ==="40dp") {
      //this.view.flxHeaderSearchbox.isVisible = false;
      this.view.flxHeaderSearchbox.height ="0dp";
      //this.view.flxSearch.isVisible = true;
      this.view.flxSearch.height = "55dp";
      this.view.flxHeader.isVisible = true;
    }
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxOuterGradient.height = "223dp";
      this.view.flxSearch.top = 0 + "dp";
      this.view.flxDescription.top = 55 + "dp";
      this.view.flxGradient.top = "0dp";
      this.view.flxMainContainer.top = "0dp";
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxSearch.top = 0 + "dp";
      this.view.flxDescription.top = 55 + "dp";
      this.view.flxGradient.top = "0dp";
      this.view.flxMainContainer.top = "56dp";
    }
    this.initActions();
    this.setSegmentData();
    this.addDummyRows();
   // this.view.flxSearch.isVisible = true;
    this.view.flxSearch.height = "55dp";
   // this.view.flxDescription.isVisible = true;
    this.view.flxDescription.height="48dp";
    this.view.flxGradient.isVisible = true;
    this.view.customSearchbox.tbxSearch.placeholder = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.FromAccountPlaceholder");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    this.view.segTransactions.onScrolling = function () {
      self.transactionsSegmentOnScrolling();
    };
    let scopeObj = this;
    function campaignPopUpSuccess(response){
      CampaignUtility.showCampaign(response, scopeObj.view);
    }
    function campaignPopUpError(response){
      kony.print(response, "Campaign Not Found!");
    }
    CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
  },
  initActions: function () {
    var self = this;
    this.view.tbxSearch.onTouchStart = function() {
      if (kony.os.deviceInfo().name === "iPhone") {
        self.view.flxOuterGradient.height = "0dp";
        kony.timer.schedule("timerId", function() {
          self.showSearch();
        }, 0.1, false);
      }
      else {
        self.showSearch();
      }
    }
    this.view.customSearchbox.btnCancel.onClick = function() {
      if (kony.os.deviceInfo().name === "iPhone") {
        self.view.flxOuterGradient.height = "223dp";
        kony.timer.schedule("timerId", function() {
          self.cancelSearch();
        }, 0.1, false);
      }
      else {
        self.cancelSearch();
      }
    }
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
    this.view.flxNoTransactions.isVisible = false;
    var navMan = applicationManager.getNavigationManager();
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.segTransactions.onRowClick = this.onRowClick;
    // this.view.btnApplyForNewAccount.onClick = function() {
    //   var NAOModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("NewAccountOpeningModule");
    //   NAOModule.presentationController.showAllProducts();
    // }
  },
  onRowClick:function(){
    var secindex, rowindex, frmaccdata;
    var transactionManager = applicationManager.getTransactionManager();
    var navigationManager = applicationManager.getNavigationManager();
    var transObj = transactionManager.getTransactionObject();
    if (Array.isArray(this.view.segTransactions.data[0])) {
      secindex = Math.floor(this.view.segTransactions.selectedRowIndex[0]);
      rowindex = Math.floor(this.view.segTransactions.selectedRowIndex[1]);
      frmaccdata = this.view.segTransactions.data[secindex][1][rowindex];
    }
    else {
      rowindex = Math.floor(this.view.segTransactions.selectedRowIndex[1]);
      frmaccdata = this.view.segTransactions.data[rowindex];
    }
    if(frmaccdata.accountID){
      var loansMod = applicationManager.getModulesPresentationController({
                  "appName": "BillPayMA",
                  "moduleName": "LoanPayUIModule"
              });
      if (Number(frmaccdata.fromAccountBalance) < transObj.payoffAmount) {
        navigationManager.setCustomInfo("frmLoansFromAccount", "failed");
        loansMod.commonFunctionForNavigation("frmLoanPayoff");
      }
      else {
        navigationManager.setCustomInfo("frmLoansFromAccount", "passed");
        loansMod.setFromAccountsForTransactions(frmaccdata);
        loansMod.commonFunctionForNavigation("frmLoansVerify");
        applicationManager.getPresentationUtility().showLoadingScreen();
      }  
    }
  },

  transactionsSegmentOnScrolling: function () {
    var parallaxSpeed = 1;
    var yOffset = this.view.segTransactions.contentOffsetMeasured.y;
    if(this.view.flxHeaderSearchbox.height ==="40dp")
      this.view.flxDescription.top = 40 - (yOffset * parallaxSpeed) + "dp";
    else
      this.view.flxDescription.top = 55 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxSearch.top = 0 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxGradient.top = 0 - (yOffset * parallaxSpeed) + "dp";
  },
  cancelOnClick:function(){
    var loansMod = applicationManager.getModulesPresentationController("LoansPayoffModule");
    loansMod.cancelCommon();
  },
  setSegmentData:function(){
    var navMan = applicationManager.getNavigationManager();
    var transactionManager = applicationManager.getTransactionManager();
    var data=navMan.getCustomInfo("frmLoansFromAccount");
    var loansMod = applicationManager.getModulesPresentationController({
                  "appName": "BillPayMA",
                  "moduleName": "LoanPayUIModule"
              });
    if (!kony.sdk.isNullOrUndefined(data)) {
      var accountsList = data.fromaccounts;
      accountsList = loansMod.removeLoanAccounts(accountsList);
      this.view.segTransactions.widgetDataMap=this.getWidgetDataMap();
      this.processedData = loansMod.processAccountsData(accountsList,"from");
      var viewBindData = loansMod.processViewFormattedData(this.processedData);
      viewBindData=loansMod.orderByPriority(viewBindData);
      var segData=[];
      if(this.processedData.length>0){
        for(var key in viewBindData){
          var sectionHeaderData={};
          var combinedData=[];
          if(key != "CreditCard"){
            if (viewBindData[key].length > 1) {
              sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My")+" " + key + " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.accounts")+" (" + viewBindData[key].length + ")";
            } else {
              sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My")+" " + key + " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.account")+" (" + viewBindData[key].length + ")";
            }
          }
          else{
            if (viewBindData[key].length > 1) {
              sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My") + " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.creditcards")+" (" + viewBindData[key].length + ")";
            } else {
              sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My")+ " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.creditcard")+" (" + viewBindData[key].length + ")";
            }
          }
          var rowDataForSection=loansMod.sortByPrefrence(viewBindData[key]);
          if(rowDataForSection.length > 0){
            combinedData.push(sectionHeaderData);
            combinedData.push(rowDataForSection);
            combinedData.push(rowDataForSection);
            this.calcualteSegmentRenderedDataHeight(1,rowDataForSection.length);
            segData.push(combinedData);
          }
        }
      }
      this.sec = -1;
      this.row = -1;
      var transObj = transactionManager.getTransactionObject();
      for (var i = 0; i < segData.length; i++) {
        for (var j = 0; j < segData[i][1].length; j++) {
          if (transObj && transObj.fromAccountNumber == segData[i][1][j].accountID) {
            segData[i][1][j].flxMain = {
              "skin": "sknFlxF6F6F6"
            };
            this.sec = i;
            this.row = j;
          } else {
            segData[i][1][j].flxMain = {
              "skin": "slFbox"
            };
          }
        }
      }
      if(segData.length>0)
      {
        this.view.flxNoTransactions.isVisible=false;
        this.view.segTransactions.isVisible=true;
        this.view.segTransactions.setData(segData);
        this.segmentData=this.view.segTransactions.data;
      }
      else
      {
        this.segmentData=[];
        this.view.flxNoTransactions.isVisible=true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NoResultsFound");
        this.view.segTransactions.isVisible=false;
      }
    }
    else {
      this.view.segTransactions.isVisible = false;
      this.view.flxNoAccounts.isVisible = true;
      this.view.lblNoAccounts.isVisible = true;
      this.view.lblAddABankAccount.isVisible = true;
      this.view.btnViewTransferActivities.isVisible = false;
      this.view.btnApplyForNewAccount.isVisible = true;
    }
  },
  addDummyRows: function () {
    var segWidgetDataMap = this.view.segTransactions.widgetDataMap;
    segWidgetDataMap["flxEmptyHeader"] = "flxEmptyHeader";
    segWidgetDataMap["flxEmptyRow"] = "flxEmptyRow";
    this.view.segTransactions.widgetDataMap = segWidgetDataMap;
    var segData = this.view.segTransactions.data;
    if(segData === null || segData === undefined){
      segData = [];
    }
    var segLength = 0;
    for (let i = 0; i < segData.length; i++) {
      segLength = segLength + (segData[i][1].length * 70) + 49; //66 is the row height and 49 is the header height
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
                         "height": "104dp"
                       }
                     }]
                    ]);
    segLength = segLength + 104;
    this.view.segTransactions.setData(segData);
    this.segLength = segLength;
  },
  removeDummyRows:function(){
    var data=this.view.segTransactions.data;
    if(data === null || data === undefined){
      kony.print("no data");
    }
    else{
      data.shift();
      this.view.segTransactions.setData(data);
    }
  },
  getWidgetDataMap:function(){
    var dataMap={
      lblAccountName:"processedName",
      lblBankName:"bankName",
      lblAccountBalValue:"availableBalance",
      lblAccountBal:"accountBalanceType",
      lblHeader:"lblHeader",
      flxMain:"flxMain"
    };
    return dataMap;
  },
  resetSearch : function(){
      this.view.customSearchbox.tbxSearch.text = ""
      if(this.segmentdata && this.segmentdata.length>0){
           this.view.segTransactions.setData(this.segmentdata);
           this.view.segTransactions.isVisible=true;
           this.view.flxNoTransactions.isVisible=false;
         }
         else{
           this.view.segTransactions.isVisible=false;
           this.view.flxNoTransactions.isVisible=true;
         }
    },
  showSearch: function() {
    var self = this;
    this.view.flxMainContainer.skin = "slFSbox0gff85612494c44Tab";
    if (kony.os.deviceInfo().name === "iPhone") {
      if (this.view.flxHeaderSearchbox.height ==="40dp") {
       // this.view.flxHeaderSearchbox.isVisible = false;
        this.view.flxHeaderSearchbox.height ="0dp";
       // this.view.flxSearch.isVisible = true;
        this.view.flxSearch.height = "55dp";
        this.view.flxMainContainer.top = "40dp";
        this.view.flxDescription.top = "54dp";
       // this.view.flxDescription.isVisible = true;
         this.view.flxDescription.height="48dp";
        this.view.flxGradient.isVisible = true;
      } else {
        if (this.view.flxNoAccounts.isVisible) {
          this.view.lblNoAccounts.isVisible = false;
          this.view.lblAddABankAccount.isVisible = false;
        }
      //  this.view.flxHeaderSearchbox.isVisible = true;
        this.view.flxHeaderSearchbox.height ="40dp";
      //  this.view.flxSearch.isVisible = false;
        this.view.flxSearch.height = "0dp";
        this.view.flxMainContainer.top = "40dp";
        this.view.flxDescription.height="0dp";
        //this.view.flxDescription.isVisible = false;
        this.view.flxGradient.isVisible = false;
        this.view.customSearchbox.tbxSearch.text = "";
        this.view.customSearchbox.tbxSearch.setFocus(true);
        this.removeDummyRows();
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchForAnAccount");
		kony.timer.schedule("timerId", function() {
          self.view.customSearchbox.tbxSearch.setFocus(true);
        }, 0.1, false);
        this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
      }
    } else {
      if (this.view.flxHeaderSearchbox.height ==="40dp") {
        this.view.flxHeaderSearchbox.height ="0dp";
        //this.view.flxHeaderSearchbox.isVisible = false;
       // this.view.flxSearch.isVisible = true;
        this.view.flxSearch.height = "55dp";
        this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
        this.view.flxGradient.top = "0dp";
        this.view.flxDescription.height="0dp";
       // this.view.flxDescription.isVisible = false;
      } else {
        if (this.view.flxNoAccounts.isVisible) {
          this.view.lblNoAccounts.isVisible = false;
          this.view.lblAddABankAccount.isVisible = false;
        }
        this.view.flxGradient.isVisible = false;
        this.view.flxDescription.height="0dp";
       // this.view.flxDescription.isVisible = false;
        this.removeDummyRows();
        this.view.flxSearch.height = "0dp";
       // this.view.flxSearch.isVisible = false;
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "40dp";
       // this.view.flxHeaderSearchbox.isVisible = true;
        this.view.flxHeaderSearchbox.height ="40dp";
        this.view.customSearchbox.tbxSearch.text = "";
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchForAnAccount");
        kony.timer.schedule("timerId", function() {
          self.view.customSearchbox.tbxSearch.setFocus(true);
        }, 0.1, false);
        this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
      }
    }
  },
  tbxSearchOnTextChange: function() {
    var searchtext = this.view.customSearchbox.tbxSearch.text.toLowerCase();
    if (searchtext) {
      var data = [];
      data.push(this.processedData);
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
      this.view.segTransactions.removeAll();
      var searchobj = applicationManager.getDataProcessorUtility().multipleCommonSegmentSearch(["accountName","accountID","nickName"], searchtext, data[0]);
      if (searchobj.length > 0) {
        this.view.segTransactions.widgetDataMap = this.getWidgetDataMapNoHeader();
        this.view.segTransactions.setData(searchobj);
      } else {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NoResultsFound");
      }
    } else {
      if (this.segmentData.length > 0) {
		this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchForAnAccount");
      } else {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NoResultsFound");
      }
    }
  },
  cancelSearch: function() {
    this.view.flxMainContainer.skin = "slfSbox";
    this.view.flxHeaderSearchbox.height ="0dp";
    //this.view.flxHeaderSearchbox.isVisible = false;
   // this.view.flxSearch.isVisible = true;
    this.view.flxSearch.height = "55dp";
    this.view.flxGradient.isVisible = true;
    this.view.flxDescription.height="48dp";
    //this.view.flxDescription.isVisible = true;
    this.view.flxSearch.top = 0 + "dp";
    this.view.flxGradient.top = "0dp";
    this.view.flxDescription.top = "55dp";
    this.view.segTransactions.top = "0dp";
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    if (this.segmentData.length > 0) {
      this.view.segTransactions.widgetDataMap = this.getWidgetDataMap();
      this.view.segTransactions.setData(this.segmentData);
      this.addDummyRows();
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
    } else {
      this.view.flxNoAccounts.isVisible = true;
      this.view.lblNoAccounts.isVisible = true;
      this.view.lblAddABankAccount.isVisible = true;
      this.addDummyRows();
      this.view.segTransactions.isVisible = false;
      this.view.flxNoTransactions.isVisible = false;
    }
  },
  getWidgetDataMapNoHeader:function(){
    var dataMap={
      lblAccountName:"processedName",
      lblBankName:"bankName",
      lblAccountBalValue:"availableBalance",
      lblAccountBal:"accountBalanceType"
    };
    return dataMap;
  },
  scrollManually: function() {
    var scope = this;
    scope.view.segTransactions.selectedRowIndex = [this.sec + 1, this.row-2];
    var parallaxSpeed = 1;
    if(Math.abs(this.view.segTransactions.frame.height-(this.segmentHeight))<this.rowTemplateHeight && this.payeesList!==0)
      var yOffset = this.view.segTransactions.contentOffsetMeasured.y+this.sectionTemplateHeight;
    else
      var yOffset = this.view.segTransactions.contentOffsetMeasured.y+(2*this.rowTemplateHeight);
    if (this.view.flxHeaderSearchbox.height ==="40dp") this.view.flxDescription.top = 40 - (yOffset * parallaxSpeed) + "dp";
    else this.view.flxDescription.top = 55 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxSearch.top = 0 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxGradient.top = 0 - (yOffset * parallaxSpeed) + "dp";
  },
  calcualteSegmentRenderedDataHeight:function(numberOfSections,numberOfRows){
    this.segmentHeight=parseInt(this.segmentHeight)+(numberOfSections*this.sectionTemplateHeight);
    if(numberOfRows){
      this.segmentHeight=this.segmentHeight+(numberOfRows*this.rowTemplateHeight);
    }
  }
  };
});