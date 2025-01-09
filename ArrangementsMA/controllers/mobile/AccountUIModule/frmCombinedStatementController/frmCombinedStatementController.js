define(["CommonUtilities"], function(CommonUtilities){ 
  return {
  //Type your controller code here 
  personalAccounts : [],
  businessAccounts : [],
  segmentData : [],
  filterKey : null,
  organisationName : null,
  timerCounter : 0,
  flowConstants : {"combinedBanking"   : "combinedBanking",
                   "businessBanking" : "businessBanking",
                   "personalBanking" : "personalBanking"
                  },
  flowName : "",
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
   // applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "appName": "ArrangementsMA",
      "moduleName": "AccountUIModule"
    });
    accountsModule.presentationController.getBankDate();
  },
  preshow:function(){
    var scope=this;
    this.personalAccounts = [];
    this.businessAccounts = [];
    this.segmentData = [];
    scope.view.lblStartDateValue.onTouchStart =this.navigateToStartDateForm;
    scope.view.lblEndDateValue.onTouchStart = this.navigateToEndDateForm;
    scope.view.btnDownload.onClick=this.generateCombinedStatement;
    var navMan = applicationManager.getNavigationManager();
    var startDate =navMan.getCustomInfo("CombinedStatementStartDate");
    var endDate =navMan.getCustomInfo("CombinedStatementEndDate");
    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "appName": "ArrangementsMA",
      "moduleName": "AccountUIModule"
    });
    accountsModule.presentationController.getBankDate();
    var transactCurrentDate = accountsModule.presentationController.getTransactDate();
    var transactEndDate= transactCurrentDate.currentWorkingDate.split('-');
    var selectedDateFormat = transactEndDate[1] + "/" + transactEndDate[2]+ "/" + transactEndDate[0];
    if(!kony.sdk.isNullOrUndefined(startDate) && startDate!== ""){
      scope.view.lblStartDateValue.text = startDate;
    } else{
      scope.view.lblStartDateValue.text = selectedDateFormat;
      navMan.setCustomInfo("CombinedStatementStartDate", selectedDateFormat);
    }
    if(!kony.sdk.isNullOrUndefined(endDate) && endDate!== ""){
      scope.view.lblEndDateValue.text = endDate;
    } else {
      scope.view.lblEndDateValue.text = selectedDateFormat;
      navMan.setCustomInfo("CombinedStatementEndDate", selectedDateFormat);
    }
    scope.view.flxAdditionalOptions.setVisibility(false);
    scope.view.customHeader.flxBack.onClick=this.flxBackOnClick;
    //osama
    this.view.onDeviceBack =this.flxBackOnClick;
    scope.view.flxShowAdditionalOptions.onClick = this.flxShowOptionsOnclick;
    scope.view.flxCancel.onClick =  this.flxCancelOnClick;
    var navManager = applicationManager.getNavigationManager();
    var accounts = navManager.getCustomInfo("frmDashboard");
    //     scope.view.flxViewAllAccounts.onClick = this.setAccountsToSegment.bind(this, accounts.accountData);
    //     scope.view.flxViewFavouriteAccounts.onClick = this.getAccountsBasedOnFilter.bind(this, this.view.lblViewFavouriteAccounts.text);
    //     scope.view.flxViewPersonalAccounts.onClick = this.getAccountsBasedOnFilter.bind(this, this.view.lblViewPersonalAccounts.text);
    //     scope.view.flxViewCompanyAccounts.onClick = this.getAccountsBasedOnFilter.bind(this, this.view.lblViewCompanyAccounts.text);
    this.filterKey = kony.i18n.getLocalizedString('kony.mb.CombinedStatements.ViewAllAccounts');
    scope.setFilterOptions();
    var data = navMan.getCustomInfo("frmCombinedStatementsSelectedAccounts");
    if(data && data.length > 0){
      scope.view.segAccounts.setData(data);
    } else {
      scope.setAccountsToSegment(accounts.accountData);
    }
    scope.view.flxNoTransactions.setVisibility(false); 
    scope.view.flxAccountsWrapper.setVisibility(true);
    scope.view.tbxSearch.setFocus(false);
    scope.view.customSearchbox.tbxSearch.text = "";
    scope.view.tbxSearch.text = "";
    scope.view.tbxSearch.onTouchEnd = this.flxSearchOnTouchEnd;
    scope.view.customSearchbox.btnCancel.onClick = this.btnCancelOnClick;
    scope.view.customSearchbox.btnCancel.text = kony.i18n.getLocalizedString("kony.mb.common.Cancel");
    scope.view.customSearchbox.tbxSearch.placeholder =kony.i18n.getLocalizedString("kony.mb.CombinedStatements.SearchByNameNumber");
    scope.view.segShowFilters.onRowClick = this.showFiltersOnRowClick;
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      scope.view.flxHeader.isVisible = true;
    }
    else{
      scope.view.flxHeader.isVisible = false;
      scope.view.flxMainContainer.top="0dp";
    }
  },
  getDistinctValuesFromArray : function(array,filterKey){
    try{
      var accounts = array;
      var flags = [], output = [], accountsArrlen = accounts.length, i;
      for( i=0; i<accountsArrlen; i++) {
        if( flags[accounts[i][filterKey]]) 
          continue;
        flags[accounts[i][filterKey]] = true;
        if(accounts[i][filterKey] !== null &&accounts[i][filterKey] !== undefined){
          var acc = {"lblName": accounts[i].MembershipName};
          output.push(accounts[i][filterKey]);
        }
      }
      return output;
    }catch(e){
      kony.print("Exception in getDistinctValuesFromArray"+e);
    }
  },
  setFilterOptions : function(){
    var finalOrgNames = [];
    var navManager = applicationManager.getNavigationManager();
    var accounts = navManager.getCustomInfo("frmDashboard");
    accounts = accounts.accountData;
    var configurationManager = applicationManager.getConfigurationManager();
    var orgNames = this.getDistinctValuesFromArray(accounts, "MembershipName");
    var self = this;
    var isSingleCIF = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    var isPrimaryCustID = applicationManager.getUserPreferencesManager().primaryCustomerId;
    var isFavouriteAccountsAvailable = false;
    //Checking Favourtie Accounts availability
    var filterFavAcc = [];
    if( configurationManager.isCombinedUser === "true"){
      this.flowName = this.flowConstants.combinedBanking;
      var dashboardSelctionFlow = navManager.getCustomInfo("frmDashboardSelector");
      if(!kony.sdk.isNullOrUndefined(dashboardSelctionFlow) ){
        this.flowName = dashboardSelctionFlow;
        //navManager.setCustomInfo("frmDashboardSelector", undefined);
      }
    }else if(configurationManager.isSMEUser === "true"){
      this.flowName = this.flowConstants.businessBanking;
    }
    else{
      this.flowName = this.flowConstants.personalBanking;
    }
    if (self.flowName === self.flowConstants.businessBanking) {
      filterFavAcc = accounts.filter(function(el) {
        return el.favouriteStatus == "1" && el.isBusinessAccount == "true";
      });
    } else if (self.flowName === self.flowConstants.combinedBanking) {
      filterFavAcc = accounts.filter(function(el) {
        return el.favouriteStatus == "1";
      });
    } else if (self.flowName === self.flowConstants.personalBanking) {
      filterFavAcc = accounts.filter(function(el) {
        return el.favouriteStatus == "1" && el.isBusinessAccount == "false";
      });
    }
    if (filterFavAcc.length > 0) {
      isFavouriteAccountsAvailable = true;
    }
    for(var i=0; i < orgNames.length; i++)
    {
      orgNames[i] = kony.i18n.getLocalizedString('i18n.wealth.view') +" "+orgNames[i];
    }
    if (orgNames.length > 0) {
      var orgNamesArr = [];
      for (var j = 0; j < orgNames.length; j++) {
        var obj = {
          "lblName": orgNames[j]
        };
        orgNamesArr.push(obj);
      }
    }
    if (isSingleCIF) {
      finalOrgNames = [{
        "lblName":kony.i18n.getLocalizedString('kony.mb.CombinedStatements.ViewAllAccounts')
      }, ]
      if (isFavouriteAccountsAvailable) {
        finalOrgNames.splice(2, 0, {
          "lblName": kony.i18n.getLocalizedString('kony.mb.CombinedStatements.ViewFavouriteAccounts')
        });
      }
    } else {
      finalOrgNames = [ {
        "lblName": kony.i18n.getLocalizedString('kony.mb.CombinedStatements.ViewAllAccounts')
      }, ];
      if (!kony.sdk.isNullOrUndefined(isPrimaryCustID)) {
        if (isPrimaryCustID.type == "personal") {
          finalOrgNames.splice(2, 0, {
            "lblName": kony.i18n.getLocalizedString('kony.mb.CombinedStatements.ViewPersonalAccounts')
          });
        }
      }
      if (isFavouriteAccountsAvailable) {
        finalOrgNames.splice(2, 0, {
          "lblName": kony.i18n.getLocalizedString('kony.mb.CombinedStatements.ViewFavouriteAccounts')
        });
      }
      if (orgNamesArr.length > 1) {
        finalOrgNames = finalOrgNames.concat(orgNamesArr);
      }
    }
    this.view.segShowFilters.widgetDataMap = {
      "flxAccountsSeparator" : "flxAccountsSeparator",
      "lblName" : "lblName"
    }
    this.view.segShowFilters.setData(finalOrgNames);
  },
  showFiltersOnRowClick : function(){
    var index = this.view.segShowFilters.selectedRowIndex;
    var rowIndex = index[1];
    var id=this.view.segShowFilters.data[rowIndex].lblName;
    this.getAccountsBasedOnFilter(id);
  },
  setAccountsToSegment: function(accounts) {
    var scope = this;
    var navManager = applicationManager.getNavigationManager();
    this.view.flxAccountsWrapper.setVisibility(true);
    this.view.flxNoTransactions.setVisibility(false); 
    this.flxCancelOnClick();
	this.accountTypeGrouping={};
    this.personalAccounts = [];
    this.businessAccounts = [];
    this.segmentData = [];
    for(var i=0; i< accounts.length; i++){
      var accountData = [];
      accountData = accounts[i];
      if(this.isPersonalAccount(accountData)){
     /*   this.personalAccounts[i] = {};
        this.personalAccounts[i] = accountData;
        this.personalAccounts[i].updatedAccountName = this.mergeAccountNameNumber(accountData);
        this.personalAccounts[i]["imgSelect"] = {
          "src": "inactivecheckbox.png"
        };*/
         accountData.updatedAccountName = this.mergeAccountNameNumber(accountData);
                    accountData.imgSelect= {
                                            "src": "inactivecheckbox.png"      
                }   
				    if (accountData.accountType in this.accountTypeGrouping){
						this.accountTypeGrouping[accountData.accountType].push(accountData);
					}
					else{
						this.accountTypeGrouping[accountData.accountType]=[];
						this.accountTypeGrouping[accountData.accountType].push(accountData);
					}
                    this.personalAccounts.push(accountData);
      }
      if(this.isBusinessAccount(accountData)){
       /* this.businessAccounts[i] = {};
        this.businessAccounts[i] = accountData;
        this.businessAccounts[i].updatedAccountName = this.mergeAccountNameNumber(accountData);
        this.businessAccounts[i]["imgSelect"] = {
          "src": "inactivecheckbox.png"
        };*/
         accountData.updatedAccountName = this.mergeAccountNameNumber(accountData);
                    accountData.imgSelect= {
                                            "src": "inactivecheckbox.png"                    
                }
                  this.businessAccounts.push(accountData);
				  if (accountData.accountType in this.accountTypeGrouping){
						this.accountTypeGrouping[accountData.accountType].push(accountData);
					}
					else{
						this.accountTypeGrouping[accountData.accountType]=[];
						this.accountTypeGrouping[accountData.accountType].push(accountData);
					}
      }
    }
	if (Object.keys(this.accountTypeGrouping).length > 0){
		for (const accountType in this.accountTypeGrouping){
			if (this.accountTypeGrouping[accountType].length>0){
		 var headerData = {
        "lblHeader": accountType,
        "imgSelectall" : {"src": "inactivecheckbox.png"},
        "flxSelectall":
                          {
                            "onClick":function(eventobject, context) {

                                  scope.toggleSegmentAccountCheckbox(context);

                               }.bind(this),

                          },
        "imgUpArrow" :{"src" : "arrowdown.png"},
        "flxImgUp": {
                            "onClick": function(eventobject, context) {
                              scope.sectionClicked(context);
                            }.bind(this),
                          }
      }
      var sectionData = [];
      sectionData.push(headerData);
      sectionData.push(this.accountTypeGrouping[accountType]);
      this.segmentData.push(sectionData);
		}
	}
	}
    /*if(this.personalAccounts.length > 0){      
      var headerData = {
        "lblHeader": kony.i18n.getLocalizedString('kony.mb.CombinedStatements.PersonalAccount'),
        "imgSelectall" : {"src": "inactivecheckbox.png"},
        "imgUpArrow" :{"src" : "arrowdown.png"}
      }
      var sectionData = [];
      sectionData.push(headerData);
      sectionData.push(this.personalAccounts);
      this.segmentData.push(sectionData);
    }
    if(this.businessAccounts.length > 0){
      var businessOrgNamesArr = this.getDistinctValuesFromArray(this.businessAccounts, "MembershipName");
      for(var i=0; i < businessOrgNamesArr.length; i++){
        var orgAccounts = [];
        this.organisationName = businessOrgNamesArr[i];
        orgAccounts = this.businessAccounts.filter(this.organisationFilter);
        var headerData = {
        "lblHeader": this.organisationName,
        "imgSelectall" : {"src": "inactivecheckbox.png"},
        "imgUpArrow" :{"src" : "arrowdown.png"}
      }
      var sectionData = [];
      sectionData.push(headerData);
      sectionData.push(orgAccounts);
      this.segmentData.push(sectionData);
      }
    }*/
    this.view.segAccounts.widgetDataMap = this.getWidgetMap();
    this.view.segAccounts.setData(this.segmentData);
    navManager.setCustomInfo("frmCombinedStatementsSelectedAccounts", this.segmentData);
  },
  organisationFilter : function(account){
    return account.MembershipName && account.MembershipName === this.organisationName;
  },
  getAccountsBasedOnFilter : function(filterType){
    this.filterKey = filterType;
    var scopeObj = this;
    var filterQuery = filterType.slice(5);
    var navManager = applicationManager.getNavigationManager();
    var accounts = navManager.getCustomInfo("frmDashboard");
    var accountsData = accounts.accountData;
    if(this.filterKey.includes(kony.i18n.getLocalizedString('kony.mb.FilterAccounts.AllAccounts'))){
    } else if (this.filterKey.includes(kony.i18n.getLocalizedString('kony.mb.CombinedStatements.FavouriteAccounts'))) {
      accountsData = accountsData.filter(this.isFavourite);
    } else if (this.filterKey.includes(kony.i18n.getLocalizedString('kony.mb.CombinedStatements.PersonalAccount'))) {
      accountsData = accountsData.filter(this.isPersonalAccount);
    } else if (this.filterKey.includes(kony.i18n.getLocalizedString('kony.mb.CombinedStatements.BusinessAccount'))) {
      accountsData = accountsData.filter(this.isBusinessAccount);
    } else if (this.filterKey.includes(this.bankName)) {
      accountsData = accountsData.filter(this.isDbx);
    } else if (this.filterKey.includes(kony.i18n.getLocalizedString('kony.mb.mm.externalaccounts'))) {
      accountsData = accountsData.filter(this.isExternal);
    } else {
      accountsData = accountsData.filter(this.cifFilter);
    }
    this.flxCancelOnClick();
    this.setAccountsToSegment(accountsData);   
  },
  searchAccounts: function() {
    var searchKey =this.view.customSearchbox.tbxSearch.text.trim().toLowerCase();
    var data = this.view.segAccounts.data;
    var navManager = applicationManager.getNavigationManager();
    var accounts = navManager.getCustomInfo("frmDashboard");
    var accountsData = accounts.accountData;
    var filterType = this.filterKey.slice(5);
    if(this.filterKey.includes(kony.i18n.getLocalizedString('kony.mb.FilterAccounts.AllAccounts'))){
    } else if (this.filterKey.includes(kony.i18n.getLocalizedString('kony.mb.CombinedStatements.FavouriteAccounts'))) {
      accountsData = accountsData.filter(this.isFavourite);
    } else if (this.filterKey.includes(kony.i18n.getLocalizedString('kony.mb.CombinedStatements.PersonalAccount'))) {
      accountsData = accountsData.filter(this.isPersonalAccount);
    } else if (this.filterKey.includes(kony.i18n.getLocalizedString('kony.mb.CombinedStatements.BusinessAccount'))) {
      accountsData = accountsData.filter(this.isBusinessAccount);
    } else if (this.filterKey.includes(this.bankName)) {
      accountsData = accountsData.filter(this.isDbx);
    } else if (this.filterKey.includes(kony.i18n.getLocalizedString('kony.mb.mm.externalaccounts'))) {
      accountsData = accountsData.filter(this.isExternal);
    } else {
      accountsData = accountsData.filter(this.cifFilter);
    }
    var searchArr = [];
    if (searchKey !== null && searchKey !== undefined && searchKey !== "") {
      for (var i = 0; i < accountsData.length; i++) {
        var nickname = accountsData[i].nickName.toLowerCase();
        var accountID = accountsData[i].accountID;
        if (nickname !== undefined && accountID !== undefined) {
          if (nickname.includes(searchKey) || accountID.includes(searchKey)) {
            searchArr.push(accountsData[i]);
          }
        }
      } 
    }else {
      searchArr = accountsData;
    }
    if(searchArr.length === 0){
      this.view.flxNoTransactions.isVisible = true;
      this.view.flxAccountsWrapper.isVisible = false;
    }
    else{
      this.setAccountsToSegment(searchArr);
    }
  },
  isFavourite: function(account) {
    return account.favouriteStatus && account.favouriteStatus === '1';
  },
  isExternal: function(account) {
    if(account.isExternalAccount){
      if(account.isExternalAccount === "true")
        return true;
    }
    else if(account.externalIndicator){
      if(account.externalIndicator === "true")
        return true;
    }
    else
      return false;
  },
  /**
       * Returns if a account is a DBX account or not
       * @param {JSON} account Account whose DBX status needs to be checked
       * @returns {boolean} true/false
       */
  isDbx: function(account) {
    if(account.isExternalAccount){
      if(account.isExternalAccount === "true")
        return false;
    }
    else if(account.externalIndicator){
      if(account.externalIndicator === "true")
        return false;
    }
    else
      return true;
  },
  /*
  * Method to return Business account status
  */
  isBusinessAccount: function(account) {
    return account.isBusinessAccount && account.isBusinessAccount === 'true';
  },
  /*
  * Method to return Personal Accounts status
  */
  isPersonalAccount: function(account) {
    return account.isBusinessAccount && account.isBusinessAccount === 'false';
  },
  /*
    * Method to return accounts grouped by selected cif
  */
  cifFilter: function(account) {
    var membershipName = this.filterKey.slice(5);
    return account.MembershipName && account.MembershipName === membershipName;
  },
  getWidgetMap: function(){
    var map = {
      "lblAccountName" : "updatedAccountName",
      "lblAccountType": "accountType",
      "imgSelect": "imgSelect",
      "lblHeader": "lblHeader",
      "imgSelectall": "imgSelectall",
      "imgUpArrow" : "imgUpArrow",
      "flxSelectall":"flxSelectall",
      "flxImgUp":"flxImgUp"
    }
    return map;
  },
  flxSearchOnTouchEnd: function() {
    var scope = this;
    this.view.flxMainContainer.skin = "slFSbox0gff85612494c44Tab";
    this.view.flxHeaderSearchbox.setVisibility(true);
    this.view.flxHeader.setVisibility(false);
    this.view.flxSearch.setVisibility(false);
    this.view.flxCombinedStatements.setVisibility(false);
    this.view.flxTImeRangeWrapper.setVisibility(false);
   // this.view.flxbtnDownload.setVisibility(false);
    this.view.segAccounts.height = "preferred";
    this.view.flxNoTransactions.height="100%";
    this.view.flxMainContainer.top="40dp";
    this.view.customSearchbox.tbxSearch.onTextChange = this.searchAccounts;
    kony.timer.schedule("timerId", function() {
      scope.view.customSearchbox.tbxSearch.setFocus(true);
    }, 0.1, false);
    this.view.flxMainContainer.forceLayout();
  },
  btnCancelOnClick: function() {
    this.view.flxMainContainer.skin = "slFSboxmb";
    this.view.flxHeaderSearchbox.setVisibility(false);
    this.view.flxHeader.setVisibility(true);
    this.view.flxSearch.setVisibility(true);
    this.view.flxCombinedStatements.setVisibility(false);//osama
    this.view.flxTImeRangeWrapper.setVisibility(true);
    this.view.flxbtnDownload.setVisibility(true);
    this.view.segAccounts.height = "preferred";
    this.view.flxNoTransactions.height="400dp";
    this.view.flxMainContainer.top="56dp";
    this.view.customSearchbox.tbxSearch.text="";
    this.view.tbxSearch.text="";
    this.view.flxMainContainer.forceLayout();
    this.getAccountsBasedOnFilter(this.filterKey);
  },
  mergeAccountNameNumber : function(account) {
    var accountID = account.accountID;
    var updatedAccountID = "";
    var externalaccountID = accountID.substring(accountID.length, accountID.indexOf('-'));     
    if (account.externalIndicator && account.externalIndicator === "true") {
      updatedAccountID = externalaccountID;
    } else {
      updatedAccountID = account.accountID
    }
    var accountName = account.nickName;
    return accountName + " ...." + (updatedAccountID.substring(updatedAccountID.length - 4, updatedAccountID.length));
  },
  flxBackOnClick : function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.setCustomInfo("CombinedStatementStartDate" , "");
    navMan.setCustomInfo("CombinedStatementEndDate" , "");
    navMan.goBack();
  },
  navigateToEndDateForm : function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo("frmStatementsEndDate");
  },
  navigateToStartDateForm : function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo("frmStatementStartDate");
  },
  flxShowOptionsOnclick: function() {
    this.view.flxAdditionalOptions.setVisibility(true);
  },
  flxCancelOnClick : function(){
    this.view.flxAdditionalOptions.setVisibility(false);
  },
  sectionClicked :function(context){
    var navManager = applicationManager.getNavigationManager();
    var sectionIndex = context.sectionIndex;
    var data = this.view.segAccounts.data;
    if(data[sectionIndex] !== null && data[sectionIndex].length > 0){
      var selectedHeaderData = data[sectionIndex][0];  
      if(selectedHeaderData["imgUpArrow"].src==="arrowdown.png"){
        selectedHeaderData["imgUpArrow"].src="arrowup.png";
        if(data[sectionIndex][1] !== null)
          data[sectionIndex][1] = [];
        this.view.segAccounts.setData(data);
        navManager.setCustomInfo("frmCombinedStatementsSelectedAccounts", data);
      }else{
        selectedHeaderData["imgUpArrow"].src="arrowdown.png";
        if(data[sectionIndex][1] !== null && data[sectionIndex].length > 0)
          data[sectionIndex][1] = this.segmentData[sectionIndex][1];
        this.view.segAccounts.setData(data);
        navManager.setCustomInfo("frmCombinedStatementsSelectedAccounts", data);
      }
    }
  },
  showErrorMessage:function(message)
  {
    try {   
      if(!kony.sdk.isNullOrUndefined(message)){
        var scopeObj=this;
        var errorResponse = message;
        this.view.customPopup.lblPopup.text = errorResponse;    
        if(!kony.sdk.isNullOrUndefined(this.timerCounter)){
          this.timerCounter = parseInt(this.timerCounter)+1;
        }
        else{
          this.timerCounter = 1;
        }
        var timerId="timerErrorMessage"+this.timerCounter;
        this.view.flxPopup.skin = "sknflxff5d6e";
        this.view.customPopup.imgPopup.src = "errormessage.png";   
        this.view.flxPopup.setVisibility(true);
        kony.timer.schedule(timerId, function() {
          scopeObj.view.flxPopup.setVisibility(false);
        }, 1.5, false);            
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(error){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }      
  },

  generateCombinedStatement : function(){
    var message;
    if (!(message = this.getDateValidationErrorMessage())){
      var payload={};
      var selectedAccountID ;
      var sectionData;
      var selectedAccInfo = {};
      payload.userId = applicationManager.getUserPreferencesManager().getUserObj().userId;
      var data=this.view.segAccounts.data;
      var startDate=this.view.lblStartDateValue.text; 
      var EndDate=this.view.lblEndDateValue.text;
      var startDateArray = startDate.split("/");
      var endDateArray = EndDate.split("/");
      //payload.fromDate=startDateArray[2]+"-"+startDateArray[0]+"-"+startDateArray[1];
      //payload.toDate=endDateArray[2]+"-"+endDateArray[0]+"-"+endDateArray[1];
      if(startDateArray!==null && startDateArray.length>=2 && endDateArray!==null && endDateArray.length>=2){
        var startMonth = startDateArray[0] >= 10 ? startDateArray[0] : ("0" + startDateArray[0]);
        var startDay = startDateArray[1] > 9 ? startDateArray[1] : ("0" + startDateArray[1]);
        payload.fromDate = startDateArray[2] + "-" + startMonth + "-" + startDay;
        var endMonth = endDateArray[0] >= 10 ? endDateArray[0] : ("0" + endDateArray[0]);
        var endDay = endDateArray[1] > 9 ? endDateArray[1] : ("0" + endDateArray[1]);
        payload.toDate = endDateArray[2] + "-" + endMonth + "-" + endDay;
      }
      
      for (var i = 0; i < data.length; i++) {
        sectionData=data[i][1];
        for(var j = 0; j < sectionData.length; j++){
          if(sectionData[j].imgSelect.src === "checkbox2.png"){
            selectedAccountID=sectionData[j].accountID;
            //selectedAccInfo.push(selectedAccountID);
				if(!(selectedAccInfo.hasOwnProperty(sectionData[j].coreCustomerId))) {
					selectedAccInfo[sectionData[j].coreCustomerId] = [];
				}
				selectedAccInfo[sectionData[j].coreCustomerId].push(selectedAccountID);
			}
          }
        }
      
      payload.accountsInfo = JSON.stringify(selectedAccInfo).replace(/"/g, "'");
      var navMan=applicationManager.getNavigationManager();
      navMan.setCustomInfo("CombinedStatementsPayload" , payload);
      navMan.navigateTo("frmViewCombinedStatements");
    }
    else{
      this.showErrorMessage(message);
    }
  },

  getDateValidationErrorMessage: function() {
    var startDate=this.view.lblStartDateValue.text;
    var EndDate=this.view.lblEndDateValue.text;
    var startDateArray = startDate.split("/");
    var startDateObj = new Date(startDateArray[2], parseInt(startDateArray[0]) - 1, startDateArray[1]);
    var endDateArray = EndDate.split("/");
    var endDateObj = new Date(endDateArray[2], parseInt(endDateArray[0]) - 1, endDateArray[1]);
    if (kony.sdk.isNullOrUndefined(startDate) || startDate==="" || startDate==="MM/DD/YYYY") {
      return kony.i18n.getLocalizedString("i18n.Calendar.startDateEmpty");
    }
    if ( kony.sdk.isNullOrUndefined(EndDate)|| EndDate === "" || EndDate==="MM/DD/YYYY") {
      return kony.i18n.getLocalizedString("i18n.Calendar.endDateEmpty");
    }
    if (startDateObj > endDateObj) {
      return kony.i18n.getLocalizedString("i18n.Calendar.startDateGreater");
    }
    var allowedPreviousMonths=parseInt(applicationManager.getConfigurationManager().getCombinedStatementsAllowedPeriod());
    endDateObj.setMonth(endDateObj.getMonth() - allowedPreviousMonths);
    if (endDateObj > startDateObj) {
      return kony.i18n.getLocalizedString("i18n.Calendar.durationGreater");
    }
    if(!this.checkEnableDownloadStatement()){
      return kony.i18n.getLocalizedString("i18n.combinedStatements.Error");
    }
    return false;
  },
  toggleSegmentAccountCheckbox: function (context) {
    var navManager = applicationManager.getNavigationManager();
    var sectionIndex = context.sectionIndex;
    var data=this.view.segAccounts.data;
    var checkboxUIValue;
    if(!kony.sdk.isNullOrUndefined(data[sectionIndex]) && !kony.sdk.isNullOrUndefined(data[sectionIndex][0]) && !kony.sdk.isNullOrUndefined(data[sectionIndex][1])){
      checkboxUIValue= data[sectionIndex][0].imgSelectall.src;
      var SectionData=data[sectionIndex][1];
      if (checkboxUIValue === "checkbox2.png") {
        data[sectionIndex][0].imgSelectall.src="inactivecheckbox.png";
        for (var i = 0; i < SectionData.length; i++) {
          data[sectionIndex][1][i].imgSelect.src="inactivecheckbox.png";
        }
      } else {
        data[sectionIndex][0].imgSelectall.src="checkbox2.png";
        for (var i = 0; i < SectionData.length; i++) {
          data[sectionIndex][1][i].imgSelect.src="checkbox2.png";
        }
      }
    }
    this.view.segAccounts.setData(data);
    navManager.setCustomInfo("frmCombinedStatementsSelectedAccounts", data);
    this.checkEnableDownloadStatement();
    this.view.forceLayout();
  },
  checkEnableDownloadStatement : function(){
    var data=this.view.segAccounts.data;
    var isAnyAccountSelected= false;
    var sectionData;
    //Checking is any of the account is selected
    for (var i = 0; i < data.length; i++) {
      sectionData=data[i][1];
      for(var j = 0; j < sectionData.length; j++){
        if(sectionData[j].imgSelect.src==="checkbox2.png"){
          isAnyAccountSelected=true;
          break;
        }          
      }
    }
    if(isAnyAccountSelected){
      return true;
    }else{
      return false;
    } 
  },
  toggleSegmentRowCheckbox: function (sectionIndex, context) {
    var navManager = applicationManager.getNavigationManager();
    var sectionIndex = context.sectionIndex;
    var data=this.view.segAccounts.data;
    var checkboxUIValue;
    var rowIndex=context.rowIndex;
    var sectionData=data[sectionIndex][1];
    var areAllAccountsselected=true;
    //Getting the value of the checkbox in UI to see it is selected or not
    if(!kony.sdk.isNullOrUndefined(data[sectionIndex]) && !kony.sdk.isNullOrUndefined(data[sectionIndex][0]) && !kony.sdk.isNullOrUndefined(data[sectionIndex][1]) && !kony.sdk.isNullOrUndefined(data[sectionIndex][1][rowIndex])){
      checkboxUIValue= data[sectionIndex][1][rowIndex].imgSelect.src;
      //toggling the value in the UI
      if (checkboxUIValue === "inactivecheckbox.png") {
        data[sectionIndex][1][rowIndex].imgSelect.src ="checkbox2.png";
      }else {          
        data[sectionIndex][1][rowIndex].imgSelect.src ="inactivecheckbox.png";          
      }
      //Checking is all the accounts of the section is selected
      for (var i = 0; i < sectionData.length; i++) {
        if(data[sectionIndex][1][i].imgSelect.src==="inactivecheckbox.png"){
          areAllAccountsselected=false;
        }      
      }
      if(areAllAccountsselected){
        data[sectionIndex][0].imgSelectall.src="checkbox2.png";
      }else{
        data[sectionIndex][0].imgSelectall.src="inactivecheckbox.png";
      }
      this.view.segAccounts.setData(data);
      navManager.setCustomInfo("frmCombinedStatementsSelectedAccounts", data);
      this.checkEnableDownloadStatement();
      this.view.forceLayout();
    } 
  }
  }
});