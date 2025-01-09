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
 * navigateCustomBack is triggered native/ ios back event 
 */
navigateCustomBack: function() {
 // this.presenter.getSweeps();
 // this.navManager.navigateTo("frmAccountSweepsDashBoard");
 this.presenter.commonFunctionForgoBack();
},
/**
 * preShowForm is called when the form is pre loaded 
 */
 preShowForm: function(){
  this.initActions();
  this.setSegmentData();
  if (kony.os.deviceInfo().name === "iPhone") {
    this.view.title = "Select Customer ID";
    this.view.flxHeader.isVisible = false;
  } else{
    this.view.flxHeader.isVisible = true;
  }
  this.view.flxSearchClose.isVisible = false;
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
    this.searchobje = [];
  this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
  this.view.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
  this.stack = [];
  this.view.segCustomers.onRowClick = this.segCustomersRowClick.bind(this);
  this.view.flxSearchClose.onTouchStart = this.clearSearch;
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
  this.view.flxSearch.top = 0 + "dp";
  this.view.flxGradient.top = "0dp";
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
    this.view.segCustomers.setData(cancelSearchSegmentData);
    this.view.segCustomers.isVisible = true;
    this.view.flxNoTransactions.isVisible = false;
  } else {
    this.view.flxNoAccounts.isVisible = true;
    this.view.lblNoAccounts.isVisible = true;
    this.view.segCustomers.isVisible = false;
    this.view.flxNoTransactions.isVisible = false;
  }
},
 /**
  * settingCancelSearchSegmentData : This function is used to set data to segment after onClick of cancel
  * @returns {[json]}
  */
settingCancelSearchSegmentData:function(){
  var segEachData = [];
  var finalArr = [];
  var data=this.segmentData;
  for (var i = 0; i < data.length; i++) {
    segEachData = [];
    if(!kony.sdk.isNullOrUndefined(data[i][1])){
      segEachData.push(data[i][1]);
    }
    finalArr.push(segEachData);    
  }
  return finalArr;
}, 
/**
     *tbxSearchOnTextChange : This function is used for search operation
  */
tbxSearchOnTextChange: function () {
    var searchtext = this.view.tbxSearch.text.toLowerCase();
    if (searchtext.length >= 3) {
      this.searchVariable = 1;
      this.view.flxCustomers.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
      this.view.flxSearchClose.isVisible = true;
      this.view.segCustomers.removeAll();
      var searchobj = applicationManager
        .getDataProcessorUtility()
        .multipleCommonSegmentSearch(
          [
            "MembershipName",
            "membershipId"
          ],
          searchtext,
          this.segmentData
        );
      if (searchobj.length > 0) {
        this.view.segCustomers.setData(searchobj);
      } else {
        this.view.flxCustomers.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = kony.i18n.getLocalizedString("kony.mb.transfers.noSearchResultFound");
      }
    } else {
      this.view.flxSearchClose.isVisible = false;
      this.view.flxCustomers.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
      if (this.searchVariable !== 0) {
        this.view.segCustomers.setData(this.segmentData);
      }
      this.searchVariable = 0;
    }
 },
 
/**
     *segCustomersRowClick : It is called when user selects the account in Primary Screen
  */
segCustomersRowClick: function (rowindex) {
  var secindex, rowindex,primaryData;
  if (Array.isArray(this.view.segCustomers.data[0])) {
      secindex = Math.floor(this.view.segCustomers.selectedRowIndex[0]);
      rowindex = Math.floor(this.view.segCustomers.selectedRowIndex[1]);
    primaryData = this.view.segCustomers.data[secindex][1][rowindex];
  } else {
       rowindex = Math.floor(this.view.segCustomers.selectedRowIndex[1]);
       primaryData = this.view.segCustomers.data[rowindex];
  }
  this.presenter.coreCustomerId = primaryData.membershipId;
  this.presenter.getSweeps(this.presenter.coreCustomerId);
},
/**
     *setSegmentData : It is used to set the data to segment
  */
  setSegmentData: function() {
    var scope = this;
    let custominfo = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
    var accountData = custominfo.accountData;
    var dataMap = {
        "lblFilterOption": "lblFilterOption",
        "flxSeparator": "flxSeparator",
        "flxFilterOptions": "flxFilterOptions",
        "imgFilterSelectedIcon": "imgFilterSelectedIcon"
    }
    scope.view.segCustomers.widgetDataMap = dataMap;
    if (accountData !== undefined) {
        var data = accountData.map(function(res) {
            return {
                "lblFilterOption": {
                    "text": res.MembershipName + ":" + res.membershipId,
                    "skin": "sknLbl424242SSP93prSansRegularPro"
                },
                "imgFilterSelectedIcon": {
                    "isVisible": false
                },                        
                "membershipId": res.membershipId,
                "MembershipName": res.MembershipName,
                "accountsCount": res.accountsCount,
                "flxSeparator": {
                    "isVisible": true
                }
            }
        });
      /*  for(var j=0; j<data.length; j++){
            if(data.length === j+1){
                data[j].flxSeparator = {
                    "isVisible": false
                };
            }else{
                data[j].flxSeparator = {
                   "isVisible": true
                };
               }
        }*/
        scope.view.segCustomers.setData(data);
        this.segmentData = data;
        scope.view.segCustomers.isVisible = true;
        scope.view.forceLayout();
    } else {
        this.view.segCustomers.isVisible = false;
        this.view.flxNoAccounts.isVisible = true;
    }
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
  },
  
  /**
     * clearSearch : This method is responsible for clearing the search text
  */
  clearSearch: function () {
    if (this.searchVariable !== 0) {
      this.view.flxCustomers.isVisible = true;
      this.view.segCustomers.setData(this.segmentData);
      this.view.flxSearchClose.isVisible = false;
    }
    this.searchVariable = 0;
    this.view.flxNoTransactions.isVisible = false;
    this.view.tbxSearch.text = "";
  },

});