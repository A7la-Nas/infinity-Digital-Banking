define({
  initActions: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.customHeader.btnRight.onClick = scope.cancelOnClick;
    this.view.customHeader.flxBack.onTouchEnd = scope.navigateBack;
  },
  navigateToReviewScreen:function(){
  var reviewScreen = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
  reviewScreen.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmCMReview"});
  },
  segmentData:null,
  sec: -1,
  row: -1,
  segmentHeight:0,
  rowTemplateHeight:70,
  sectionTemplateHeight:60,
  //Purpose is to scroll to the selected row while moving to and fro between screens.
  postShow: function() {
    var scope = this;
    if (this.sec !== "" && this.row !== "" && this.sec !== -1 && this.row !== -1) {
      if (!(this.sec === 0 && this.row === 0)) {
        if ((kony.os.deviceInfo().name !== "iPhone")) {
          //Need to invoke scroll manually (only in android) to get the UX experience of docking whenever segment rendered data is greater than viewable area.
          if(parseInt(this.segmentHeight)>this.view.segTransactions.frame.height || (this.view.segTransactions.frame.height-(this.segmentHeight))<this.rowTemplateHeight)
            this.scrollManually();
        } else {
          scope.view.segTransactions.selectedRowIndex = [this.sec + 1, this.row];
        }
      }
    }
  },
  preShow: function () {
    this.view.flxMainContainer.skin = "slFSboxmb";
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
    this.initActions1();
    this.setSegmentData();
    this.addDummyRows();
   // this.view.flxSearch.isVisible = true;
    this.view.flxSearch.height = "55dp";
    this.view.flxDescription.isVisible = true;
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
  },
  initActions1: function () {
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
    
    this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
    this.view.flxNoTransactions.isVisible = false;
  },
  onRowClick:function(){
    var secindex, rowindex, frmaccdata;
    var accMan=applicationManager.getAccountManager();
    var toacc = accMan.getToTransferSupportedAccounts();
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
      var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
      presentation.setFromAccountsForTransactions(frmaccdata);
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
  setSegmentData:function(){
    var navMan = applicationManager.getNavigationManager();
    var data=navMan.getCustomInfo("frmCMSelectAccount");
    if (!kony.sdk.isNullOrUndefined(data)) {
      var accountsList=data.fromaccounts;
      this.view.segTransactions.widgetDataMap=this.getWidgetDataMap();
      var userPrefManager = applicationManager.getUserPreferencesManager();
      var customerIDs=userPrefManager.accessibleCustomerIds;
      var personalID=userPrefManager.primaryCustomerId;
      var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
      this.processedData=presentation.processAccountsData(accountsList,"from");
      var mappingData={};
      var iconVisibility=false;
      customerIDs.forEach((item,index)=>{
        mappingData[item.id]={
          "isPersonal": personalID && personalID.id===item.id && personalID.type==="personal"?true:false,
          "accounts":[],
          "name": item.name
        }
       if(index!==0){
         if(customerIDs[0].type!==item.type){
           iconVisibility=true;
         }
       }
      });
      for(let key in mappingData){
        this.processedData.forEach(item=>{
          if(key===item.membershipID){
            if(iconVisibility){
            item.src=item.isBusinessAccount==="true"?"businessaccount.png":"personalaccount.png";
            }
            
            else{
              item.flxAccountType={
                "isVisible":false
              }
            }
            item.flximgBank={
              "isVisible":false
            };
            mappingData[key]["accounts"].push(item);
          }
        });
      }
      var viewBindData=presentation.processViewFormattedData(this.processedData);
      viewBindData=presentation.orderByPriority(viewBindData);
      var size=Object.keys(mappingData).length;
      var segData=[];
      if(this.processedData.length>0 ){
        if(size<=1){
          segData=this.setaccountDatabyAccountType(viewBindData);
      }
        else{
          segData=this.setSegmentDataforMultipleIds(mappingData);
        }
      }
      this.sec = -1;
      this.row = -1;
      var transObj = presentation.getTransObject();
      for (var i = 0; i < segData.length; i++) {
        for (var j = 0; j < segData[i][1].length; j++) {
          if (transObj && transObj.fromAccountNumber == segData[i][1][j].accountID) {
            segData[i][1][j].flxMain = {
              "skin": "sknFlxF6F6F6mb"
            };
            this.sec = i;
            this.row = j;
          } else {
            segData[i][1][j].flxMain = {
              "skin": "slFboxmb"
            };
          }
        }
      }
      if(segData.length>0)
      {
        this.view.flxNoTransactions.isVisible=false;
        this.view.flxNoAccounts.isVisible =false;
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
        this.view.flxNoAccounts.isVisible =false;
      }
    }
    else {
      this.view.segTransactions.isVisible = false;
      this.view.flxNoTransactions.isVisible=false;
      this.view.flxNoAccounts.isVisible = true;
      //this.view.lblNoAccounts.isVisible = true;
    }
  },
  setaccountDatabyAccountType : function(viewBindData){
    var segmentDataforAccountType=[];
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
   for(var key in viewBindData){
          var sectionHeaderData={};
          var combinedData=[];
     var rowDataForSection=[];
     if(key !== "CreditCard"){
            if (viewBindData[key].length > 1) {
              sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My")+" " + key + " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.accounts")+" (" + viewBindData[key].length + ")";
            } else {
              sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My")+" " + key + " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.account")+" (" + viewBindData[key].length + ")";
            }
             rowDataForSection=presentation.sortByPrefrence(viewBindData[key]);
         }
          if(rowDataForSection.length>0){
            combinedData.push(sectionHeaderData);
            combinedData.push(rowDataForSection);
            this.calcualteSegmentRenderedDataHeight(1,rowDataForSection.length);
            segmentDataforAccountType.push(combinedData);
          }
        }
    return segmentDataforAccountType;
  },
  setSegmentDataforMultipleIds: function(mappingData){
    var segmentDataforMultipleIds=[];
    this.view.segTransactions.rowTemplate="flxCombinedAccounts";
    for(let key in mappingData){
      if(mappingData[key].isPersonal===true){
        var sectionHeaderforMultipleIDswithPersonal={};
        var finalDataMultipleIDswithPersonal=[];
        sectionHeaderforMultipleIDswithPersonal["lblHeader"]="Personal Accounts"+"("+mappingData[key].accounts.length+")"
        finalDataMultipleIDswithPersonal.push(sectionHeaderforMultipleIDswithPersonal);
        finalDataMultipleIDswithPersonal.push(mappingData[key].accounts);
        segmentDataforMultipleIds.push(finalDataMultipleIDswithPersonal);
      }
    }
    for(let key in mappingData){
      if(mappingData[key].isPersonal!==true){
        var sectionHeaderforMultipleIDs={};
        var finalDataMultipleIDs=[];
        sectionHeaderforMultipleIDs["lblHeader"]=mappingData[key].name+"("+mappingData[key].accounts.length+")"
        finalDataMultipleIDs.push(sectionHeaderforMultipleIDs);
        finalDataMultipleIDs.push(mappingData[key].accounts);
        segmentDataforMultipleIds.push(finalDataMultipleIDs);
      }
    }
    return segmentDataforMultipleIds;
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
      flxMain:"flxMain",
      imgAccountType:"src",
      flximgBank:"flximgBank",
      flxAccountType:"flxAccountType"
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
      data=this.segmentData;
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
      this.view.segTransactions.removeAll();
      var searchobj=[];
       searchobj = this.segmentSearch("processedName", searchtext, data);
        if (searchobj.length > 0) {
        this.view.segTransactions.widgetDataMap = this.getWidgetDataMap();
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
  segmentSearch : function(field, searchText, data) {
    try{
    var segEachData = [],
        combinedRowHeader = [],
        finalArr = [];
    for (var i = 0; i < data.length; i++) {
      segEachData = [];
      combinedRowHeader = [];

      for (var j = 0; j < data[i][1].length; j++) {
        if(typeof(data[i][1][j][field]) === "string" && typeof(data[i][1][j].accountName) === "string"){
          if (kony.sdk.isNullOrUndefined(data[i][1][j][field]) !== undefined && data[i][1][j][field].toLowerCase().indexOf(searchText.toLowerCase()) >= 0
              ||data[i][1][j].accountName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
            segEachData.push(data[i][1][j]);
          }
        }
      }
      if(data[i][0].lblHeader){
      data[i][0].lblHeader= (data[i][0].lblHeader).split("(")[0] + "(" +segEachData.length+")";
		combinedRowHeader.push(data[i][0]);
		combinedRowHeader.push(segEachData);
        finalArr.push(combinedRowHeader);
      }
      
 }
    return finalArr;
    }catch(er){
      kony.print(er)
    }
  },
  cancelSearch: function() {
    this.view.flxMainContainer.skin = "slFSboxmb";
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
      this.view.customSearchbox.tbxSearch="";
      var cancelSearchSegmentData=[];
      cancelSearchSegmentData=this.settingCancelSearchSegmentData();
    this.view.segTransactions.setData(cancelSearchSegmentData);
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
  settingCancelSearchSegmentData:function(){
    var segEachData = [],
        combinedRowHeader = [],
        finalArr = [];
    var data=this.segmentData;
    for (var i = 0; i < data.length; i++) {
      segEachData = [];
      combinedRowHeader = [];
      if(!kony.sdk.isNullOrUndefined(data[i][1])){
        for (var j = 0; j < data[i][1].length; j++) {
          segEachData.push(data[i][1][j]);
        }
      }
      if(!kony.sdk.isNullOrUndefined(data[i][0])){
        if(data[i][0].lblHeader){
        data[i][0].lblHeader = (data[i][0].lblHeader).split("(")[0] + "(" +segEachData.length+")";
        combinedRowHeader.push(data[i][0]);
        combinedRowHeader.push(segEachData);
       finalArr.push(combinedRowHeader);
        }
      }
    }
    return finalArr;
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
  },
  cancelOnClick:function(){
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.commonCancel();
  },
  navigateBack:function(){
 var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.commonFunctionForgoBack();
  }
});