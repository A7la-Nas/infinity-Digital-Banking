define({ 
  segmentData: [],

//Type your controller code here
/**
 * init is called when the form is loaded , initialisation happen here
 */
 init: function () {
  var scope=this;
  scope.view.preShow = scope.preShowForm;
  scope.view.postShow = scope.postShowForm;
  applicationManager.getPresentationFormUtility().initCommonActions(this, "NO", this.view.id, scope.navigateCustomBack);
  this.presenter = applicationManager.getModulesPresentationController({
    "moduleName": "AccountSweepsUIModule",
    "appName": "AccountSweepsMA"
});
  this.navManager = applicationManager.getNavigationManager();
   this.getString= applicationManager.getPresentationUtility();
},

/***
 * OnNavigate is called when the form is navigated after init 
 */
onNavigate: function() {

},
/***
 * native/ios cancel event 
 */
cancelOnClick:function(){
  this.segmentData = [];
  if(this.presenter.flowType === "AccountSweep"){
  this.presenter.cancelCommon("frmAccountSweepsDashBoard");
  } else if(this.presenter.flowType === "AccountDetails"){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"friendlyName": "AccountUIModule/frmAccountDetails","appName": "ArrangementsMA"});
  }
},

/***
 * navigateCustomBack is triggered native/ ios back event 
 */
 navigateCustomBack: function() {
  this.segmentData = [];
  this.presenter.getSweeps(this.presenter.coreCustomerId);
},
/**
 * preShowForm is called when the form is pre loaded 
 */
 preShowForm: function(){
  this.initActions();
  this.setSegmentData();
  if (kony.os.deviceInfo().name === "iPhone") {
    this.view.flxHeader.isVisible = false;
  } else{
    this.view.flxHeader.isVisible = true;
  }
 },
  /**
 * postShowForm is called when the form is post loaded 
 */
postShowForm: function(){

},
/**
 * initActions has all form action declarations
 */
initActions: function(){
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
    this.segPrimaryAccountsData ="";
    this.searchobje = [];
  this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
  this.view.customHeader.btnRight.onClick = this.cancelOnClick;
  this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
  this.stack = [];
  this.view.segPrimaryAccounts.onRowClick = this.segPrimaryAccountsRowClick.bind(this)
},   

 /**
     *cancelSearch : Will be called by the cancel button OnClick, It is used to UI when we click on cancel
  */
cancelSearch: function () {
  this.view.customSearchbox.tbxSearch.text = "";
  this.view.tbxSearch.text = "";
  this.view.flxMainContainer.skin = "slfSbox";
  this.view.flxHeaderSearchbox.height = "0dp";
  this.view.flxSearch.height = "55dp";
  this.view.flxDescription.height = "48dp";
  this.view.flxSearch.top = 0 + "dp";
  this.view.flxGradient.top = "0dp";
  this.view.flxDescription.top = "55dp";
  this.view.segPrimaryAccounts.top = "0dp";
  this.searchobje = [];
  this.setHeaderVisibility(true);
  if (kony.os.deviceInfo().name === "iPhone") {
    this.view.flxMainContainer.top = "0dp";
  } else {
    this.view.flxMainContainer.top = "56dp";
  }
  if (this.segmentData.length > 0) {
    var cancelSearchSegmentData = [];
    cancelSearchSegmentData = this.settingCancelSearchSegmentData();
    this.view.segPrimaryAccounts.setData(cancelSearchSegmentData);
    this.view.segPrimaryAccounts.top = "110dp";
    this.view.segPrimaryAccounts.isVisible = true;
    this.view.flxNoTransactions.isVisible = false;
  } else {
    this.view.flxNoAccounts.isVisible = true;
    this.view.lblNoAccounts.isVisible = true;
    this.view.segPrimaryAccounts.isVisible = false;
    this.view.flxNoTransactions.isVisible = false;
  }
},
 /**
  * settingCancelSearchSegmentData : This function is used to set data to segment after onClick of cancel
  * @returns {[json]}
  */
settingCancelSearchSegmentData:function(){
  var segEachData = [];
  var combinedRowHeader = [];
  var finalArr = [];
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
/**
     *tbxSearchOnTextChange : This function is used for search operation
  */
tbxSearchOnTextChange: function() {
  var searchtext = this.view.customSearchbox.tbxSearch.text.toLowerCase();
  if (searchtext.length<3){
    this.view.segPrimaryAccounts.isVisible = true;
    this.view.flxNoTransactions.isVisible = false;
    this.view.segPrimaryAccounts.top = "40dp";
    this.view.segPrimaryAccounts.setData(this.segmentData);
  } else if(searchtext.length>= 3){
    var data = JSON.parse(JSON.stringify(this.segmentData));
    
    this.view.segPrimaryAccounts.isVisible = true;
    this.view.flxNoTransactions.isVisible = false;
    this.view.segPrimaryAccounts.removeAll();
    
    
    var searchobj = applicationManager.getDataProcessorUtility().segmentSearchWithMultipleHeaders(["accountName","primaryAccountNumber","nickName"], searchtext, data);
    this.searchobje = searchobj;
    for(let i=0; i<searchobj.length; i++)
    {
    if (searchobj[i][1].length > 0 ) {
      this.view.segPrimaryAccounts.setData(searchobj);
    } else {
      this.view.segPrimaryAccounts.isVisible = false;
      this.view.flxNoTransactions.isVisible = true;
      this.view.lblNoTransaction.text = this.getString.getStringFromi18n("kony.mb.MM.NoResultsFound");
    }
  }
  } else {
    if (this.segmentData.length > 0) {
      this.view.segPrimaryAccounts.isVisible = false;
      this.view.flxNoTransactions.isVisible = true;
      this.view.lblNoTransaction.text =this.getString.getStringFromi18n("kony.mb.MM.SearchForAnAccount");
    } else {
      this.view.segPrimaryAccounts.isVisible = false;
      this.view.flxNoTransactions.isVisible = true;
      this.view.lblNoTransaction.text = this.getString.getStringFromi18n("kony.mb.MM.NoResultsFound");
    }
  }
}, 
/**
     *segPrimaryAccountsRowClick : It is called when user selects the account in Primary Screen
  */
segPrimaryAccountsRowClick: function (rowindex) {
  var secindex, rowindex,primaryData;
  if (Array.isArray(this.view.segPrimaryAccounts.data[0])) {
    secindex = Math.floor(this.view.segPrimaryAccounts.selectedRowIndex[0]);
    rowindex = Math.floor(this.view.segPrimaryAccounts.selectedRowIndex[1]);
    primaryData = this.view.segPrimaryAccounts.data[secindex][1][rowindex];
} else {
    rowindex = Math.floor(this.view.segPrimaryAccounts.selectedRowIndex[1]);
    primaryData = this.view.segPrimaryAccounts.data[rowindex];
}
  this.presenter.setPrimaryAccountsForTransactions(primaryData);
  this.navManager.navigateTo("frmAccountSweepsSecondaryAccount");

},
/**
     *rowExpandCollapse : It is called when user clicks on expand button
     @param {json}
  */
rowExpandCollapse: function(context, temp) {
  var scope = this;
  try {
    var stackLength = scope.stack.length;
          var sectionIndex = temp.section;
          if (this.segPrimaryAccountsData === '') this.segPrimaryAccountsData = JSON.parse(JSON.stringify(this.view.segPrimaryAccounts.data));
          var data = this.view.segPrimaryAccounts.data;
          var selectedHeaderData = data[sectionIndex][0];
          if (!JSON.stringify(data).includes("flxNoRecords")) {
              if (selectedHeaderData["imgUpArrow"] === "arrowup.png") {
                  if(this.searchobje.length !==0){
                      selectedHeaderData["imgUpArrow"] = "arrowdown.png";
                      this.segPrimaryAccountsDat = JSON.parse(JSON.stringify(this.searchobje));
                      data[sectionIndex][1] = [];
                      this.view.segPrimaryAccounts.setData(data);
                  }
                  else{
                  selectedHeaderData["imgUpArrow"] = "arrowdown.png";
                  data[sectionIndex][1] = [];
                  this.view.segPrimaryAccounts.setData(data);
                  }
              } else {
                  selectedHeaderData["imgUpArrow"] = "arrowup.png";
                  if(this.searchobje.length !==0){
                      this.segPrimaryAccountsDat = JSON.parse(JSON.stringify(this.searchobje));
                      data[sectionIndex][1] = this.segPrimaryAccountsDat[sectionIndex][1];
                      this.view.segPrimaryAccounts.setData(data);
                  }
                  else{
                  data[sectionIndex][1] = this.segPrimaryAccountsData[sectionIndex][1];
                  this.view.segPrimaryAccounts.setData(data);
                  }
              }
          }
  } catch (err) {
    var errorObj = {
      "errorInfo": "Error in rowExpandCollapse",
      "errorLevel": "Configuration",
      "error": err
    };
    scope.onError(errorObj);
  }
},
/**
     *setSegmentData : It is used to set the data to segment
  */
  setSegmentData: function() {
      var data = this.navManager.getCustomInfo("fromAccounts");
      var contractCase = this.decideCatergoryOfContracts();
       if (!kony.sdk.isNullOrUndefined(data) ) {
          var segData;
          switch(contractCase) {
              case 1 : 
                segData = this.setSegmentForSingleContractCase(data);
                break;
              case 2 : 
                segData = this.setSegmentForMultipleContractsCase(data);
                break;
            }  
          
          this.setFinalProcessedDataToSegment(segData);
      }
          else {
          this.view.segPrimaryAccounts.isVisible = false;
          this.view.flxNoAccounts.isVisible = true;
          this.view.lblNoAccounts.isVisible = true;
          this.view.lblAddABankAccount.isVisible = true;
      }
  },
  /**
     *setSegmentForSingleContractCase : It is used to set the data to segment according to membershipwise
     @param {[json]}
     @returns {[json]}
  */
  setSegmentForSingleContractCase: function(data) {
      this.view.segPrimaryAccounts.rowTemplate = "flxAccountsNoImageTransfersOne";
      this.view.segPrimaryAccounts.widgetDataMap = this.getWidgetDataMap();
      this.processedData = this.presenter.processAccountsData(data,"primary");
      var viewBindData = this.presenter.processViewFormattedData(this.processedData);
      var segData = [];
      if (this.processedData.length > 0) {
          for (var key in viewBindData) {
              var sectionHeaderData = {};
              var combinedData = [];
              if (key != "CreditCard") {
                  if (viewBindData[key].length > 1) {
                      sectionHeaderData["lblHeader"] = this.getString.getStringFromi18n("kony.mb.mm.My") + " " + key + " " + this.getString.getStringFromi18n("kony.mb.mm.accounts") + " (" + viewBindData[key].length + ")";
                      sectionHeaderData["imgUpArrow"] = "arrowup.png";
                  } else {
                      sectionHeaderData["lblHeader"] = this.getString.getStringFromi18n("kony.mb.mm.My") + " " + key + " " + this.getString.getStringFromi18n("kony.mb.mm.account") + " (" + viewBindData[key].length + ")";
                      sectionHeaderData["imgUpArrow"] = "arrowup.png";
                  }
              } 
              var rowDataForSection = this.presenter.sortByPrefrence(viewBindData[key]);
              if (rowDataForSection.length > 0) {
                  combinedData.push(sectionHeaderData);
                  combinedData.push(rowDataForSection);
                  this.calcualteSegmentRenderedDataHeight(1, rowDataForSection.length);
                  segData.push(combinedData);
              }
          }
      }
      segData = this.getSegDataWithHighlightedRow(segData);
      return segData;
  },
/**
     *setSegmentForMultipleContractsCase : It is used to set the data to segment according to membershipwise
     @param {[json]}
     @returns {[json]}
  */
  setSegmentForMultipleContractsCase : function(data) {    
      this.view.segPrimaryAccounts.rowTemplate="flxAccountsNoImageTransfersOne";
      this.view.segPrimaryAccounts.widgetDataMap=this.getWidgetDataMap();
      this.processedData = this.presenter.processAccountsData(data,"primary");
      var viewBindData = this.presenter.processDataMembershipNameWise(this.processedData);
      var segData=[];
      var personalAccountsKey = kony.i18n.getLocalizedString("kony.mb.fastTransfers.personalAccounts");
      if(this.processedData.length > 0) {
        if(!kony.sdk.isNullOrUndefined(viewBindData[personalAccountsKey])){
          let sectionHeaderData={};
          let combinedData=[];
          sectionHeaderData["lblHeader"] =  personalAccountsKey + " (" + viewBindData[personalAccountsKey].length + ")";
          sectionHeaderData["imgUpArrow"] = "arrowup.png";
          let rowDataForSection = this.presenter.sortByPrefrence(viewBindData[personalAccountsKey]);
          if(rowDataForSection.length>0){
            combinedData.push(sectionHeaderData);
            combinedData.push(rowDataForSection);
            this.calcualteSegmentRenderedDataHeight(1,rowDataForSection.length);
            segData.push(combinedData);
          }       
        }
  
        for(var key in viewBindData){
          if( key !== personalAccountsKey ) {
            var sectionHeaderData={};
            var combinedData=[];
            sectionHeaderData["lblHeader"] =  key + " (" + viewBindData[key].length + ")";
            sectionHeaderData["imgUpArrow"] = "arrowup.png";
            var rowDataForSection = this.presenter.sortByPrefrence(viewBindData[key]);
            if(rowDataForSection.length>0){
              combinedData.push(sectionHeaderData);
              combinedData.push(rowDataForSection);
              this.calcualteSegmentRenderedDataHeight(1,rowDataForSection.length);
              segData.push(combinedData);
            }          
          }
        }
      }
  
      segData = this.getSegDataWithHighlightedRow(segData);
      return segData;
    },
  /**
   * getWidgetDataMap - responsible for getting the widgetDataMap
   * @return {json}
  */
  getWidgetDataMap:function(){
      var dataMap={
        lblAccountName:"processedPrimaryName",
        accountTypeIcon:"src",
        lblAccountBalValue:"availableBalance",
        lblAccountBal:"accountBalanceType",
        flxMain:"flxMain",
        lblHeader:"lblHeader",
        imgUpArrow: "imgUpArrow",
        lblBankName:"accountType",
      };
      return dataMap;
    },
  calcualteSegmentRenderedDataHeight: function(numberOfSections, numberOfRows) {
      this.segmentHeight = parseInt(this.segmentHeight) + (numberOfSections * this.sectionTemplateHeight);
      if (numberOfRows) {
          this.segmentHeight = this.segmentHeight + (numberOfRows * this.rowTemplateHeight);
      }
  },
  /**
     *getSegDataWithHighlightedRow : It is used to Highlight the selected account
      @param {[json]}
      @returns {[json]}
  */
  getSegDataWithHighlightedRow: function(segData) {
      this.sec = -1;
      this.row = -1;
      var transObj = this.presenter.getAccountSweepsObject();
      for (var i = 0; i < segData.length; i++) {
          for (var j = 0; j < segData[i][1].length; j++) {
              if (transObj && transObj.primaryAccountNumber == segData[i][1][j].primaryAccountNumber) {
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
      return segData;
  },
/**
     *decideCatergoryOfContracts : It is used to find the logged in user configuration
  */
    decideCatergoryOfContracts : function() {
      var userPrefManager = applicationManager.getUserPreferencesManager();
      if(userPrefManager.isSingleCustomerProfile){
        this.contractCase = 1;
      }
      else {
        this.contractCase = 2;
      }
  
      return this.contractCase;
    },
/**
     *setFinalProcessedDataToSegment : It is used to set final data and to set visibilities
     @param {[json]}
  */
  setFinalProcessedDataToSegment: function(segData) {
      if (segData.length > 0) {
          this.view.flxNoTransactions.isVisible = false;
          this.view.flxNoAccounts.isVisible = false;
          this.view.segPrimaryAccounts.isVisible = true;
          this.view.segPrimaryAccounts.setData(segData);
          this.segmentData = this.view.segPrimaryAccounts.data;
      } else {
          this.segmentData = [];
          this.view.flxNoTransactions.isVisible = true;
          this.view.lblNoTransaction.text = this.getString.getStringFromi18n("kony.mb.MM.NoResultsFound");
          this.view.segPrimaryAccounts.isVisible = false;
      }
  },
/**
     *showSearch : this is used to set the Ui for search
  */
  showSearch: function () {
    if (this.view.flxNoAccounts.isVisible) {
      this.view.lblNoAccounts.isVisible = false;
    }
    this.view.flxDescription.height = "0dp";
    this.view.flxGradient.isVisible = false;
    this.view.flxHeaderSearchbox.height = "40dp";
    this.view.flxSearch.height = "0dp";
    this.setHeaderVisibility(false);
    this.view.flxMainContainer.top = "40dp";
    this.view.segPrimaryAccounts.isVisible = false;
    this.view.flxNoTransactions.isVisible = true;
    this.view.lblNoTransaction.text = this.getString.getStringFromi18n("kony.mb.MM.SearchForAnAccount");
    this.view.customSearchbox.tbxSearch.text = "";
    const self = this;
    kony.timer.schedule(
      "timerId",
      function () {
        self.view.customSearchbox.tbxSearch.setFocus(true);
      },
      0.1,
      false
    );
  },
  /**
     *setHeaderVisibility : this is used to set the header for iPhones
  */
  setHeaderVisibility : function(isVisible){
    if (kony.os.deviceInfo().name === "iPhone") {
      var titleBarAttributes = this.view.titleBarAttributes;
      titleBarAttributes["navigationBarHidden"] = !isVisible;
      this.view.titleBarAttributes = titleBarAttributes;
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = isVisible;
    }
  }

});