define(["CommonUtilities"], function(CommonUtilities){
  return{
  segData: [],
  searchText: "",
  dataToAfterSearch: [],
  fromAccountsList: [],
  checkDepositToInit: function() {
    var loggerManager=applicationManager.getLoggerManager();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow:function(){
    this.view.tbxSearch.text = "";
    this.renderTitleBar();
    var navMan=applicationManager.getNavigationManager();
    this.fromAccountsList = navMan.getCustomInfo("frmCheckDepositTo");
    var fromaccounts = [];
    if( !kony.sdk.isNullOrUndefined(this.fromAccountsList) && this.fromAccountsList.length ) {
      fromaccounts = this.fromAccountsList;
    }
    var accProcessedData = (JSON.parse(JSON.stringify(fromaccounts)));
    this.setSegmentData(accProcessedData);
    this.view.customHeader.flxBack.onClick=this.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    this.view.btnAddAccount.onClick = this.btnAddAccountOnClick;
    this.view.tbxSearch.onTextChange = this.onSearchTextChange;
  applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  renderTitleBar: function(){
   var deviceUtilManager = applicationManager.getDeviceUtilManager();
   var isIphone = deviceUtilManager.isIPhone();
   if (isIphone) {
     this.view.flxHeader.setVisibility(false);
   }
 },
  flxBackOnClick:function(){
     var navManager = applicationManager.getNavigationManager();
     navManager.goBack();
  },
  onCancelClick: function() {
    var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "moduleName": "CheckDepositUIModule",
      "appName": "ArrangementsMA"
    });
    checkDepositModule.presentationController.cancelDeposit();
  },
  getWidgetDataMap : function(){
    var dataMap = {
      "lblHeader" : "lblHeader",
      "flxTypeOneShadow" : "flxTypeOneShadow",
      "flximgUp" : "flximgUp",
      "imgUpArrow" : "imgUpArrow",
      "lblAccountNumber": "lblAccountNumber",
      "lblAccountName":"nickName",
      "lblBankName" : "lblBankName",
      "lblAccountBalValue":"lblAccountBalValue",
      "lblAccountBal":"AvailableBalStaticLabel",
      "imgBank": "imgBank",
      "imgWarn":"imgWarn",
      "flximgBank" :"flximgBank",
      "flxAccountType":"flxAccountType",
      "imgAccountType":"imgAccountType",
      
    };
    return dataMap;
  },
  segToAccountOnClick:function(){
      var selectedToAccountData = this.view.segToAccount.selectedRowItems[0];
       var checkDepositModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CheckDepositUIModule", "appName": "ArrangementsMA"});
      checkDepositModule.presentationController.setSelectedAccountData(selectedToAccountData);
  },
  setSegmentData : function(segData){
    var navManager = applicationManager.getNavigationManager();
    var configurationManager = applicationManager.getConfigurationManager();
    var dataToSet = [];
    if(kony.sdk.isNullOrUndefined(segData)){
      this.segData = navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmCheckDepositTo"});
      dataToSet = this.segData;
      this.dataToAfterSearch = dataToSet;
    }
    else {
      segData.length ? (this.segData = segData) : null;
      dataToSet = segData;
    }
        if(dataToSet && dataToSet.length !== 0) {
          var dataMap = this.getWidgetDataMap();
          this.view.segToAccount.widgetDataMap = dataMap;
          if(configurationManager.isCombinedUser === "true"){
            dataToSet.forEach(element=>element[1]
                              .forEach(elem=>{if(elem.nickName.length>25){
                                elem["nickName"]= elem.nickName.substr(0,25);
                              }}));
          } else {
            dataToSet.forEach(element =>{if(element.nickName.length>25){
              element["nickName"]=element.nickName.substr(0,25);
            }});
          }
          this.view.segToAccount.setData(dataToSet);
          this.view.segToAccount.setVisibility(true);
          this.view.flxNoTransactions.setVisibility(false);
        }
        else
        {
          this.view.segToAccount.setVisibility(false);
          this.view.flxNoTransactions.setVisibility(true);
        }
    var processedAccounts=this.getOrganisationAccountsMap(dataToSet)
    var rowArray=[];
    var setdataArr=[];
    var configManager = applicationManager.getConfigurationManager();
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
        "lblHeader":header+" ("+processedAccounts[key].length+")",          
        "imgUpArrow":{"src": "arrowup.png"},
      };
      rowArray=[];
      for(var i=0;i<processedAccounts[key].length;i++){
        var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
        var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
        if(isSingleCustomerProfile===true || isSingleCustomerProfile==="true"){
          var iconVisible=false; 
        }else{
          if(profileAccess === "both"){
            var iconVisible=true;
            var imgIcon = "businessaccount.png";
            if(processedAccounts[key][i].isBusinessAccount==="true" ||processedAccounts[key][i].isBusinessAccount === true){
              imgIcon = "businessaccount.png";
            }else{
              imgIcon = "personalaccount.png";
            }
          }else{
            var iconVisibles=false;      
          }
        }
      
        var accountBalValue=kony.sdk.isNullOrUndefined(processedAccounts[key][i].availableBalance) ? "0" : processedAccounts[key][i].availableBalance;
        var accountBalValueCurrency=configManager.getCurrencyCode()+" "+accountBalValue;
        var rowJson={ 
          "template": "flxAccounts",
          "lblAccountBalValue": accountBalValueCurrency, 
          "accountID": processedAccounts[key][i].accountID,
          "isBusinessAccount":processedAccounts[key][i].isBusinessAccount,
          "currencyCode":processedAccounts[key][i].currencyCode,
          "nickName": CommonUtilities.truncateStringWithGivenLength(processedAccounts[key][i].accountName + "....", 20),
          "lblAccountNumber":(processedAccounts[key][i].accountID).substr((processedAccounts[key][i].accountID).length - 4),
          "lblBankName":processedAccounts[key][i].accountType,
          "AvailableBalStaticLabel":"Available Balance",
          "imgBank":{isVisible:iconVisible,
                     src:imgIcon},
          "imgWarn":{isVisible:false},
          "flxSeparator":{isVisible:true},
        };
        rowArray.push(rowJson);
      }
      if(rowArray.length!==0)
      {
        rowArray[rowArray.length-1].flxSeparator.isVisible=false;
        setdataArr.push([headerJson,rowArray]);
        var dataMap = this.getWidgetDataMap();
        this.view.segToAccount.widgetDataMap = dataMap;
        this.view.segToAccount.setData(setdataArr);
        this.view.segToAccount.setVisibility(true);
        this.view.flxNoTransactions.setVisibility(false)
      }else{
        this.view.segToAccount.setVisibility(false);
        this.view.flxNoTransactions.setVisibility(true);
      }
    }
  },
  onSearchTextChange: function() {
    var searchText = this.view.tbxSearch.text.toLowerCase();
    var navManager = applicationManager.getNavigationManager();
    var configurationManager = applicationManager.getConfigurationManager();
    try{
    if(searchText && this.segData.length !== 0) {
      this.view.segToAccount.removeAll();
      var data = this.segData;
      var searchSegData = [];
      if( configurationManager.isCombinedUser === "true"){
        searchSegData = this.commonSectionSegmentSearch("nickName", searchText, data);
        if (!searchSegData.length) {
          searchSegData = this.commonSectionSegmentSearch("accountID", searchText, data);
        }
      }
      else {
        searchSegData = applicationManager.getDataProcessorUtility().commonSegmentSearch("nickName", searchText, data);
        if (!searchSegData.length) {
          searchSegData = applicationManager.getDataProcessorUtility().commonSegmentSearch("accountID", searchText, data);
        }
      }
      this.setSegmentData(searchSegData);
    }
    else if(!searchText && this.segData.length !== 0){
      this.segData = this.fromAccountsList;
      if( configurationManager.isCombinedUser === "true"){
        var segEachData = [],
            combinedRowHeader = [],
            finalArr = [];
        var data=this.segData;
        for (var i = 0; i < data.length; i++) {
          segEachData = [];
          combinedRowHeader = [];
			if(!kony.sdk.isNullOrUndefined(data[i][1])){
          for (var j = 0; j < data[i][1].length; j++) {
            segEachData.push(data[i][1][j]);
          }
            }
          if(!kony.sdk.isNullOrUndefined(data[i][0])){
          data[i][0].lblHeader.text = (data[i][0].lblHeader.text).split("(")[0] + "(" +segEachData.length+")";
          combinedRowHeader.push(data[i][0]);
          }
          combinedRowHeader.push(segEachData);
          finalArr.push(combinedRowHeader);
        }
        this.setSegmentData(finalArr);
      }
      else{
        this.setSegmentData(this.segData);
      }
    }
    }
    catch(err){
      loggerManager.log("#### in catch" + JSON.stringify(err) + " ####");
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  commonSectionSegmentSearch : function(field, searchText, data) {
    try{
    var segEachData = [],
        combinedRowHeader = [],
        finalArr = [];
    for (var i = 0; i < data.length; i++) {
      segEachData = [];
      combinedRowHeader = [];

      for (var j = 0; j < data[i][1].length; j++) {
        if(typeof(data[i][1][j][field]) == "string" && typeof(data[i][1][j].lblAccountName) == "string" && typeof(data[i][1][j].lblAccountNumber) == "string"){
          if (kony.sdk.isNullOrUndefined(data[i][1][j][field]) !== undefined && data[i][1][j][field].toLowerCase().indexOf(searchText.toLowerCase()) >= 0
              ||data[i][1][j].lblAccountName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
              ||data[i][1][j].lblAccountNumber.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
            segEachData.push(data[i][1][j]);
          }
        }
      }
      data[i][0].lblHeader.text = (data[i][0].lblHeader.text).split("(")[0] + "(" +segEachData.length+")";

      combinedRowHeader.push(data[i][0]);

      combinedRowHeader.push(segEachData);
      finalArr.push(combinedRowHeader);

    }
    return finalArr;
    }catch(er){
      kony.print(er)
    }
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
                    if(kony.sdk.isNullOrUndefined(orgAccounts[account.MembershipName])){
                      orgAccounts[account.MembershipName] = Array(account);
                    }else{
                      orgAccounts[account.MembershipName].push(account);
                    }
                  }
                }else{
                  if(primaryCustomerId.id !== account.Membership_id ){
                    if(kony.sdk.isNullOrUndefined(orgAccounts[account.MembershipName])){
                      orgAccounts[account.MembershipName] = Array(account);
                    }else{
                      orgAccounts[account.MembershipName].push(account);               
                    }
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
                  if(kony.sdk.isNullOrUndefined(orgAccounts[account.MembershipName])){
                    orgAccounts[account.MembershipName] = Array(account);
                  }else{
                    orgAccounts[account.MembershipName].push(account);
                  }
                }
              }else{
                if(primaryCustomerId.id !== account.Membership_id ){
                  if(kony.sdk.isNullOrUndefined(orgAccounts[account.MembershipName])){
                    orgAccounts[account.MembershipName] = Array(account);
                  }else{
                    orgAccounts[account.MembershipName].push(account);               
                  }
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
                if(kony.sdk.isNullOrUndefined(orgAccounts[account.MembershipName])){
                  orgAccounts[account.MembershipName] = Array(account);
                }else{
                  orgAccounts[account.MembershipName].push(account);
                }
              }
            }
          });
        }
        return orgAccounts;
      }
    }catch(er){
      kony.print(er);
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
  }
});