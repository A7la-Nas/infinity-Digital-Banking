define({

  sec: -1,
  row: -1,
  segmentHeight:0,
  payeesList:0,
  list: [],
  rowTemplateHeight:70,
  sectionTemplateHeight:60,
  rowTemplateP2PHeight:110,
  searchData: [],
  isUpdate: false,
  
  init: function () {
    var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },

 
  //Purpose is to scroll to the selected row while moving to and fro between screens.
  postShow: function() {
  },
  
  preShow: function () {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var self = this;
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxDescription.top = "0dp";
      this.view.segTransactions.top = "0dp";
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxDescription.top = 55 + "dp";
     
    }
    this.view.flxNoTransactions.isVisible = false;
	var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    if((!this.isUpdate) && applicationManager.getConfigurationManager().getAccountIDLevelAlertsFlag() === true){
		this.view.flxAlertsAccountLevel.isVisible = true;
		this.view.flxAlertsAccountType.isVisible = false;
		this.setSegmentDataAccountLevel();
        //this.setSegmentDataAccountLevelID();
    }
    else if(!this.isUpdate){
		this.view.flxAlertsAccountLevel.isVisible = false;
		this.view.flxAlertsAccountType.isVisible = true;
		this.setSegmentDataAccountType();
	}
    this.view.customHeader.btnRight.isVisible =false; 
    var headerText = navManager.getCustomInfo("accountAlertsData").lblTitle;
    this.view.customHeader.lblLocateUs.text = headerText;
    this.view.title = headerText;
    this.initActions();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
 
  cancelOnClick:function(){
 
 },
  
  initActions: function () {
     var scope = this;
    this.view.customHeader.flxBack.onClick = function() {
      scope.goBack();
    };
    this.view.segTransactions.onRowClick = this.onSegRowClick;
    this.view.segTransactions1.onRowClick = this.onSegRowClick;
  },
  goBack:function()
  {
     applicationManager.getPresentationUtility().showLoadingScreen();
      applicationManager.getNavigationManager().navigateTo({
                        "appName": "ManageProfileMA",
                        "friendlyName": "SettingsUIModule/frmSettings"
                    });
  },
  onSegRowClick : function() {
    var secindex,rowindex,selectedAccount,params;
    var SettingsAlertsUIModule = applicationManager.getModulesPresentationController("SettingsAlertsUIModule");
   var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmAlertsAccountPrefBack","frmAlertsAccountPref");
    if(this.view.flxAlertsAccountType.isVisible){
      if (Array.isArray(this.view.segTransactions1.data[0])) {
        secindex = Math.floor(this.view.segTransactions1.selectedRowIndex[0]);
        rowindex = Math.floor(this.view.segTransactions1.selectedRowIndex[1]);
        selectedAccount = this.view.segTransactions1.data[secindex][1][rowindex];
      } else {
        rowindex = Math.floor(this.view.segTransactions1.selectedRowIndex[1]);
        selectedAccount = this.view.segTransactions1.data[rowindex];
      }
      params={
        "AlertCategoryId":"ALERT_CAT_ACCOUNTS",
        "AccountTypeId":selectedAccount["accountTypeId"]
      };
       var accountTypeID = selectedAccount.accountTypeId;
       SettingsAlertsUIModule.setAccountTypeID(accountTypeID);
	   var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmAlertsListHeader",selectedAccount["accountType"]);
    }
    else{
      secindex = Math.floor(this.view.segTransactions.selectedRowIndex[0]);
      rowindex = Math.floor(this.view.segTransactions.selectedRowIndex[1]);
      selectedAccount = this.view.segTransactions.data[secindex][1][rowindex];
      params={
        "AlertCategoryId":"ALERT_CAT_ACCOUNTS",
        "AccountId": selectedAccount["accountID"]
      };
    var accountID = selectedAccount.accountID;
    SettingsAlertsUIModule.setAccountID(accountID);
	var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmAlertsListHeader",selectedAccount["processedName"]);
    }
    SettingsAlertsUIModule.alertsCurrency=selectedAccount["transactionCurrency"];
    SettingsAlertsUIModule.getAlertsBasedOnAccounts(params);
  },
  //This executes when the form is loaded ahead and services are in transition state and after service execution this is invoked from presentation layer.
  bindDataAfterTransition:function(flag){
    if (flag) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    if(this.segmentHeight===0){
      this.setSegmentData();
    }
  },
    setAccountsData: function () {
        var data = [
            [{
                "lblHeader": "Saving Accounts (3)"
            },
            [{
                "lblValue": "On",
                "lblAccountName": "SavingsAcc...",
                "lblAccountNumber": "2343",
                "lblBankName": "Bank of America"
            },
            {
                "lblValue": "On",
                "lblAccountName": "SavingsAcc...",
                "lblAccountNumber": "5486",
              	"imgArrow": "chevron.png",
                "lblBankName": "Bank of America"
            },
            {
                "lblValue": "On",
                "lblAccountName": "SavingsAcc...",
                "lblAccountNumber": "2223",
                "lblBankName": "Bank of America"
            },
            ]
            ],
            [{
                "lblHeader": "Checking Accounts (3)"
               
            },
            [{
                "lblValue": "On",
                "lblAccountName": "CheckingAcc...",
                "lblAccountNumber": "2343",
                "lblBankName": "Bank of America"
            },
            {
               "lblValue": "On",
                "lblAccountName": "CheckingAcc...",
                "lblAccountNumber": "2111",
                "lblBankName": "Bank of America"
            },
            ]
            ],
            [{
                "lblHeader": "Credit Cards (3)",
              
            },
            [{
                "lblValue": "On",
                "lblAccountName": "CreditCard...",
                "lblAccountNumber": "2233",
                "lblBankName": "Bank of America"
            },
            {
                "lblValue": "On",
                "lblAccountName": "CreditCard...",
                "lblAccountNumber": "2353",
                "lblBankName": "Bank of America"
            },
            ]
            ]
            
        ];
       this.view.segTransactions.setData(data);
      
    },
  setSegmentDataAccountLevel(){
    var navManager = applicationManager.getNavigationManager();
    var accountList = navManager.getCustomInfo("frmAlertsAccountPref");
    this.processedData = this.processData(accountList);
    var viewFormatData = this.processViewFormattedData(this.processedData);
    viewFormatData=this.orderByPriority(viewFormatData);
      var segData=[];
      if(this.processedData.length>0){
        for(var key in viewFormatData){
          var sectionHeaderData={};
          var combinedData=[];
          if(key != "CreditCard"){
            if (viewFormatData[key].length > 1) {
              sectionHeaderData["lblHeader"] =  key + " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.accounts");
            } else {
              sectionHeaderData["lblHeader"] =  key + " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.account");
            }
          }
          else{
            if (viewFormatData[key].length > 1) {
              sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.creditcards");
            } else {
              sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.creditcard");
            }
          }
              var rowDataForSection=this.sortByPrefrence(viewFormatData[key]);
          if(rowDataForSection.length>0){
            combinedData.push(sectionHeaderData);
            combinedData.push(rowDataForSection);
            combinedData.push(rowDataForSection);
     //       this.calcualteSegmentRenderedDataHeight(1,rowDataForSection.length);
            segData.push(combinedData);
        }
          
      }
          
      }
      this.view.segTransactions.widgetDataMap=this.getWidgetDataMap();
          this.view.segTransactions.setData(segData);
  },
  processData(data){
     var accProcessedData = [];
    for (var i = 0; i < data.length; i++) {
      accProcessedData[i] = {};
      //var name = "";
      var name = data[i].nickName;
	  accProcessedData[i].nickName = data[i].nickName;
      accProcessedData[i].accountID = data[i].accountID; 
      accProcessedData[i].processedName = applicationManager.getPresentationUtility().formatText(name, 10, data[i].accountID, 4);
      accProcessedData[i].accountTypeId = data[i].accountTypeId;
	  accProcessedData[i].accountType = data[i].accountType;
      accProcessedData[i].bankName = data[i].bankName;
      accProcessedData[i].isEnable =  data[i].isEnabled ==="true"?"On":"Off";
      accProcessedData[i].transactionCurrency=data[i].transactionCurrency;
      
    }
    return accProcessedData;
  },
  processViewFormattedData(data) {
    var processedData = {}
    for (var i = 0; i < data.length; i++) {
      if (!processedData.hasOwnProperty(data[i].accountType)) {
        processedData[data[i].accountType] = [];
      }
      if (processedData.hasOwnProperty(data[i].accountType)) {
        processedData[data[i].accountType].push(data[i]);
      }
    }
   return processedData;
  },
  updateData(accountName){
    this.isUpdate = true;
    if(applicationManager.getConfigurationManager().getAccountIDLevelAlertsFlag() === true){
    var segData = this.view.segTransactions.data;
     var recordID,recNameID;
        for(var i=0;i<segData.length;i++){
          if(recNameID != null && recNameID != "" && recNameID != undefined)break;
          for(var j=0;j<segData[i][1].length;j++){
            if(segData[i][1][j].processedName===accountName){
                recordID = i;
                recNameID = j;
                break;
            }
          }
        }
        segData[recordID][1][recNameID].isEnable = segData[recordID][1][recNameID].isEnable==="On"?"Off":"On";
        this.view.segTransactions.setData(segData);
    }
    else{
      var segData = this.view.segTransactions1.data;
     var recordID;
        for(var i=0;i<segData.length;i++){
            if(segData[i].accountType===accountName){
                recordID = i;break;
            }
        }
        segData[recordID].isEnable = segData[recordID].isEnable==="On"?"Off":"On";
        this.view.segTransactions1.setData(segData);
    }
  },
  orderByPriority(data) {
    var cm = applicationManager.getConfigurationManager();
    var prioritizedData = {};
    var metaData = cm.getAccountTypesMetaData();
    for (var key1 in metaData) {
      if (data[metaData[key1].backendValue]) {
        prioritizedData[metaData[key1].backendValue] = data[metaData[key1].backendValue];
      }
    }
    return prioritizedData;
  },
    sortByPrefrence(accountsCollection) {
    if (accountsCollection.length > 1) accountsCollection.sort(function(record1, record2) {
      return record1.accountPreference - record2.accountPreference;
    });
    return accountsCollection;
  },
   getWidgetDataMap:function(){
    var dataMap={
      lblAccountName:"processedName",
      lblBankName:"bankName",
      lblValue: "isEnable",
      lblHeader: "lblHeader",
      imgUpArrow : "imgUpArrow",
      imgUser:"imgUser",
      flxImg:"flxImg"
    };
	 return dataMap;
   },
	getWidgetDataMapAT:function(){
    var dataMap={
      lblName:"accountType",
      lblValue:"isEnable"
    
    };
    return dataMap;
  },
  setSegmentDataAccountType: function(){
    var navManager = applicationManager.getNavigationManager();
    var accountList = navManager.getCustomInfo("frmAlertsAccountPref");
    this.processedData = this.processAccountTypeData(accountList);
    this.view.segTransactions1.widgetDataMap=this.getWidgetDataMapAT();
    this.view.segTransactions1.setData(this.processedData);
     
  },
   processAccountTypeData(data){
     var accProcessedData = [];
    for (var i = 0; i < data.length; i++) {
      accProcessedData[i] = {};
	   accProcessedData[i].accountTypeId = data[i].accountTypeId;
      accProcessedData[i].accountType = data[i].accountType;
      accProcessedData[i].isEnable =  data[i].isEnabled ==="true"?"On":"Off";
    }
 
    return accProcessedData;
  },
  setUpdateFlag(){
    this.isUpdate = false;
  },
  getOrganisationAccountsMap : function(accounts){
    try{
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
        var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementModule");  
        var viewBindData=moneyMovementModule.processViewFormattedData(accounts);
        var  processedAccounts=moneyMovementModule.orderByPriority(viewBindData);
        return processedAccounts;
      }else{
       var primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
          var businessAccounts = this.getDistinctBusinessAccount(accounts);
          var orgAccounts = {};
          if(!kony.sdk.isNullOrUndefined(primaryCustomerId)){
            if(primaryCustomerId.type === 'personal'){
              orgAccounts = {
                "Personal Accounts" : [],
                "Business Accounts" : []
              };
              orgAccounts["Personal Accounts"] = [];
              for(var i=0; i<businessAccounts.length; i++){
                orgAccounts[businessAccounts[i]] = [];
              } 
              accounts.forEach(function(account){            
                if(account.Membership_id === primaryCustomerId.id && account.isBusinessAccount === "false")          
                  orgAccounts["Personal Accounts"].push(account);
                else {
                  if(account.isBusinessAccount === "true"){
                    if(!kony.sdk.isNullOrUndefined(account.MembershipName) && account.MembershipName !== ""){
                      orgAccounts[account.MembershipName].push(account);
                    }
                  }else{
                    if(primaryCustomerId.id !== account.Membership_id ){
                      orgAccounts[account.MembershipName].push(account);               
                    }
                  }
                } 
              });              
            }
            else{
              orgAccounts["Personal Accounts"] = [];
              for(var i=0; i<businessAccounts.length; i++){
                orgAccounts[businessAccounts[i]] = [];
              }                  
              accounts.forEach(function(account){
                if(account.isBusinessAccount === "true"){
                  if(!kony.sdk.isNullOrUndefined(account.MembershipName) && account.MembershipName !== ""){
                    orgAccounts[account.MembershipName].push(account);
                  }
                }else{
                  if(primaryCustomerId.id !== account.Membership_id ){
                    orgAccounts[account.MembershipName].push(account);               
                  }
                }
              });
            }                                
          }
          else{
            orgAccounts["Personal Accounts"] = [];
            for(var i=0; i<businessAccounts.length; i++){
              orgAccounts[businessAccounts[i]] = [];
            }                  
            accounts.forEach(function(account){
              if(account.isBusinessAccount === "true"){
                if(!kony.sdk.isNullOrUndefined(account.MembershipName) && account.MembershipName !== ""){
                  orgAccounts[account.MembershipName].push(account);
                }
              }
            });
          }
          return orgAccounts;
      }
    }catch(er){
      kony.print(er)
    }
  },
  setSegmentDataAccountLevelID:function(){
    try{
      var navManager = applicationManager.getNavigationManager();
      var accountList = navManager.getCustomInfo("frmAlertsAccountPref");
      var processedAccounts=this.getOrganisationAccountsMap(accountList)
      var rowArray=[];
      var setdataArr=[];
      for(var key in processedAccounts) {
        var header;
        var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
        if(isSingleCustomerProfile===true || isSingleCustomerProfile==="true"){
          header = key+" "+"Account";
        }else{
          header = key;
        }
        var headerJson={ 
          "template" : "flxTransHeader",
          "lblHeader":header,          
          "imgUpArrow":{"src": "arrowup.png"},
        };
        rowArray=[];
        for(var i=0;i<processedAccounts[key].length;i++){
          var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
        if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
          var iconVisible=false;
          var left="20dp";
        }else{
          var iconVisible=true;
          var left="45dp";
          var imgIcon = "businessaccount.png";
          if(processedAccounts[key][i].isBusinessAccount==="true" ||processedAccounts[key][i].isBusinessAccount === true){
            imgIcon = "businessaccount.png";
          }else{
            imgIcon = "personalaccount.png";
          }
        }
          var name = processedAccounts[key][i].nickName;
          var rowJson={ 
            "template": "flxAlertsPref",
            "processedName":applicationManager.getPresentationUtility().formatText(name, 10, processedAccounts[key][i].accountID, 4),
            "bankName":{text:processedAccounts[key][i].accountType,
                       left:left},
            "isEnable":processedAccounts[key][i].isEnabled ==="true"?"On":"Off",
            "accountID":processedAccounts[key][i].accountID,
            "imgUser":{
              src:imgIcon
            },
            "flxImg":{
              isVisible:iconVisible,
            }
          };
          rowArray.push(rowJson);
        }
        if(rowArray.length!==0)
        {
          setdataArr.push([headerJson,rowArray]);
          this.view.segTransactions.widgetDataMap=this.getWidgetDataMap();
          this.view.segTransactions.setData(setdataArr);
          this.view.segTransactions.setVisibility(true);
        }else{
          this.view.segTransactions.setVisibility(false);
        }
      }
    }
    catch(er){
      Kony.print(er);
    }
  },
    getDistinctBusinessAccount: function(accounts){
    try{
      var businessAccounts = [];
      for(var i=0;i<accounts.length;i++){
        if(accounts[i].isBusinessAccount === "true"){
          if(!kony.sdk.isNullOrUndefined(accounts[i].MembershipName) && accounts[i].MembershipName !== ""){
            if(businessAccounts.indexOf(accounts[i].MembershipName)===-1){
              businessAccounts.push(accounts[i].MembershipName);
            }
          }
        }
      }
      businessAccounts.sort();
      return businessAccounts;
    }catch(er){
      kony.print(er);
    }
  },
});