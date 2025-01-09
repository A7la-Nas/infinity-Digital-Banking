define(["CommonUtilities"], function(CommonUtilities){
  return{
  	init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"CALLBACK",currentForm, this.customBack);
    },
    preShow: function () {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.view.flxMainContainer.skin="slfSbox";
     if (this.view.flxHeaderSearchbox.height === "40dp") {
       this.view.flxHeaderSearchbox.height = "0dp";
            // this.view.flxHeaderSearchbox.isVisible = false;
            // this.view.flxSearch.isVisible = true;
        this.view.flxSearch.height = "55dp";
             this.view.flxHeader.isVisible = true;
        }
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
     else{
        this.view.flxHeader.isVisible = true;
       this.view.flxMainContainer.top = "56dp";
     }
      this.initActions();
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      try{
        this.filterEmptyRows();
      }
      catch(err) {}
  },
    
    customBack: function() {
      var navMan = applicationManager.getNavigationManager();
      if (navMan.getPreviousForm() === "frmAcknowledgement") {
        navMan.navigateTo("frmBillPay");
      }
      else {
        navMan.goBack();
      }   
    },
    
    initActions: function () {
        var scope = this;
    this.view.flxNoTransactions.isVisible=false;
    this.view.flxHeaderNT.isVisible=true;
    this.view.flxSeperator3.isVisible=true;
    this.view.segAccounts.isVisible=true;
    this.view.tbxSearch.text="";
    //this.setSegmentData();
    this.setSegmentDataCIF();
    this.view.customHeader.flxBack.onClick = this.customBack;
        this.view.segAccounts.onRowClick = function(response) {
          var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BillPaymentUIModule');
          presenter.presentationController.selectedAccount = response["selectedRowItems"][0]["processedAccountName"] + " …" + response["selectedRowItems"][0]["lblAccountNumber"];
          presenter.presentationController.selectedAccountBank = response["selectedRowItems"][0]["bankName"];
          presenter.presentationController.selectedAccountBalance = response["selectedRowItems"][0]["availableBalance"];
          presenter.presentationController.selectedAccountBankDone = true;
          scope.segmentRowClick(response);
    }
    this.view.customHeader.btnRight.onClick = function () {
       var bPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        bPayModule.presentationController.cancelCommon();
    }
    this.view.tbxSearch.onTouchStart = this.showSearch;
    // this.view.tbxSearch.onTextChange = this.showSearch;
    this.view.customSearchbox.btnCancel.onClick = this.showSearch;
    },
    segmentRowClick: function(response) {
        var selaccdata=[];
        var navMan=applicationManager.getNavigationManager();
      var rowindex=this.view.segAccounts.selectedRowIndex[1];
      var sectionIndex = this.view.segAccounts.selectedRowIndex[0];
      var frmaccdata=this.view.segAccounts.data[sectionIndex][1][rowindex];
        selaccdata.push(frmaccdata);
        var bPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      	bPayModule.presentationController.setFromAccountsForTransactions(selaccdata[0]);
      	var isFromAcc = bPayModule.presentationController.isDefaultFromAccount();
      	var showPopup = bPayModule.presentationController.isSetAccountPopupEnabled();
      if(!isFromAcc && showPopup){
      	var basicConfig={
            "alertType": constants.ALERT_TYPE_CONFIRMATION,
            "yesLabel":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.yesSetAsDefault"),
            "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.notnow"),
            "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.BillPay.setDefaultAccountMessage"),
            "alertHandler": this.setDefaultAcc
          };
          applicationManager.getPresentationUtility().showAlertMessage(basicConfig,{});
      }
        else{
          
          bPayModule.presentationController.getBillPayTransactionalLimits();
        }
    },

  filterEmptyRows: function(){
    var data=this.view.segAccounts.data;
    var isChangeRequired = false;
    var i = 0;

    if(kony.sdk.isNullOrUndefined(data)) return;
    if(kony.sdk.isNullOrUndefined(data.length)) return;
    if(data.length === 0 || data.length === 1) return;

    try{
      for(i=0;i<data.length; i++)
      {
        if(kony.sdk.isNullOrUndefined(data[i]));
        else if(kony.sdk.isNullOrUndefined(data[i][1].length));
        else if(data[i][1].length === 0) {
          data.splice(i, 1);
          isChangeRequired = true;
        }
      }
    }
    catch(err) {}

    try{
      if(isChangeRequired) {
        this.view.segAccounts.data = data;
      }
    }
    catch(err){}
  },

  	setDefaultAcc: function (response) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var dataJSON={};
      if(response){
      	var selectedAcntRow = this.view.segAccounts.selectedItems[0];
        this.selAccountId = selectedAcntRow.accountID;
        dataJSON["default_account_billPay"] = this.selAccountId;
      }
      dataJSON.showBillPayFromAccPopup = false;
      var bPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      bPayModule.presentationController.updateBillPayFromAcc(dataJSON);
    },
    setSegmentData: function () {
        var frmaccdata=[];
        var navMan=applicationManager.getNavigationManager();
        var accdata=  navMan.getCustomInfo("frmBillPayFromAccount");
        var accountsData=accdata.fromaccounts;
        var segData=[];
        var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
        frmaccdata=accountsData;
        var bPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        var processedData=bPayModule.presentationController.processAccountsData(frmaccdata);
      var configManager = applicationManager.getConfigurationManager();
      var orgAccounts={};
     // if(configManager.isCombinedUser === "true"){
        orgAccounts = {
          "Personal Accounts": [],
          "Business Accounts": []
        };
      var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;     
      for (var i = 0; i < processedData.length; i++) {
        if(isSingleCustomerProfile === false){
          if(profileAccess === "both"){
            if (processedData[i].isBusinessAccount === "true") {
              processedData[i].flxAccountType={"isVisible":true};
              processedData[i].imgAccountType={"src":"businessaccount.png",
                                               "isVisible":true};
              orgAccounts["Business Accounts"].push(processedData[i]);
            } else {
              processedData[i].flxAccountType={"isVisible":true};
              processedData[i].imgAccountType={"src":"personalaccount.png",
                                               "isVisible":true};
              orgAccounts["Personal Accounts"].push(processedData[i]);
            }
          }else{
            processedData[i].flxAccountType={"isVisible":false};
            processedData[i].imgAccountType={"src":"personalaccount.png",
                                             "isVisible":false};
          }
        }else{
          processedData[i].flxAccountType={"isVisible":false};
          processedData[i].imgAccountType={"src":"personalaccount.png",
                                           "isVisible":false};
        }

      }
          for (var key in orgAccounts) {
             var headerJson = {
              "template": "flxTransHeader",
              "flximgUp": {"isVisible": true},
              "imgUpArrow":{"src":"arrowup.png"},
              "lblHeader": {"text": key +" ("+orgAccounts[key].length+")"}
            };
               segData.push([headerJson,orgAccounts[key]]);
          }
            if(segData.length>0)
          {
            this.view.flxNoTransactions.isVisible=false;
            this.view.segAccounts.isVisible=true;
            this.view.segAccounts.widgetDataMap={
              lblAccountName:"processedAccountName",
              lblBankName:"bankName",
              lblHeader:"lblHeader",
              imgUpArrow:"imgUpArrow",
              flximgUp:"flximgUp",
              lblAccountBalValue:"lblAccountBalValue", //availableBalance
              lblAccountBal:"accountBalanceType",
              accountNumber:"accountNumber",
              imgAccountType:"imgAccountType",
              flxAccountType:"flxAccountType"
            };
         
            this.view.segAccounts.setData(segData);
            this.segmentData=this.view.segAccounts.data;
          }
          else
          {
            this.segmentData=[];
            this.view.flxNoTransactions.isVisible=true;
            this.view.flxHeaderNT.isVisible=false;
            this.view.flxSeperator3.isVisible=false;
            this.view.segAccounts.isVisible=false;
          }
//       }else{
//           if(processedData.length>0)
//           {
//             for(var i =0;i<processedData.length;i++){
//               processedData[i].flxAccountType={"isVisible":false};
//               processedData[i].imgAccountType={"isVisible":false};
//             }
//             this.view.flxNoTransactions.isVisible=false;
//             this.view.segAccounts.isVisible=true;
//             this.view.segAccounts.widgetDataMap={
//               lblAccountName:"processedAccountName",
//               lblBankName:"bankName",
//               lblAccountBalValue:"availableBalance",
//               lblAccountBal:"accountBalanceType",
//               accountNumber:"accountNumber",
//               lblHeader:"",
//               imgUpArrow:"",
//               flximgUp:"",
//               imgAccountType:"imgAccountType",
//              flxAccountType:"flxAccountType"
//             };
//             this.view.segAccounts.setData(processedData);
//             this.segmentData=this.view.segAccounts.data;
//           }
//           else
//           {
//             this.segmentData=[];
//             this.view.flxNoTransactions.isVisible=true;
//             this.view.flxHeaderNT.isVisible=false;
//             this.view.flxSeperator3.isVisible=false;
//             this.view.segAccounts.isVisible=false;
//           }
//         }        
      },
    showSearch: function () {
      var scope = this;
        if (this.view.flxHeaderSearchbox.height === "40dp") {
          this.view.customSearchbox.tbxSearch.text = ""
          this.view.flxHeaderSearchbox.height = "0dp";
          this.view.flxMainContainer.skin="slfSbox";
          //is.view.flxSearch.isVisible = true;
          this.view.flxSearch.height = "55dp";
          if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxHeader.isVisible = false;
            this.view.flxMainContainer.top = "0dp";
          }
          else{
            this.view.flxHeader.isVisible = true;
            this.view.flxMainContainer.top = "56dp";
          }
          if(this.segmentData && this.segmentData.length>0)
          {
            this.view.segAccounts.setData(this.segmentData);
            this.view.flxNoTransactions.isVisible=false;
            this.view.flxHeaderNT.isVisible=true;
            this.view.flxSeperator3.isVisible=true;
            this.view.segAccounts.isVisible=true;
          }
          else
          {
            this.view.flxNoTransactions.isVisible=true;
            this.view.flxHeaderNT.isVisible=false;
            this.view.flxSeperator3.isVisible=false;
            this.view.segAccounts.isVisible=false;
          }
        } else {
          this.view.flxMainContainer.skin="slFSbox0gff85612494c44Tab";
          this.view.flxSearch.height = "0dp";
          //is.view.flxSearch.isVisible = false;
          this.view.flxHeader.isVisible = false;
          this.view.flxMainContainer.top = "40dp";
          this.view.customSearchbox.tbxSearch.text="";
          this.view.flxHeaderSearchbox.height = "40dp";
         // this.view.flxHeaderSearchbox.isVisible = true;
       //   this.view.customSearchbox.tbxSearch.setFocus(true);
          kony.timer.schedule("timerId", function() {
                           scope.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.2, false);
          this.view.customSearchbox.tbxSearch.onTextChange=this.searchdata;
        }
    },
  searchdata:function()
  {
    var searchData;
    var navMan=applicationManager.getNavigationManager();
    var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
    if(searchtext)
    {
      this.view.segAccounts.removeAll();
      var data = this.segmentData;
      var configurationManager = applicationManager.getConfigurationManager();
      if(configurationManager.isCombinedUser === "true"){
        searchData = this.commonSectionSegmentSearch("accountName", searchtext, data);
      }else{
        searchData = this.commonSegmentSearch("accountName",searchtext,data);
      }
      if(searchData && searchData.length>0)
      {
        this.view.segAccounts.setData(searchData);
        this.view.flxNoTransactions.isVisible=false;
        this.view.flxHeaderNT.isVisible=true;
        this.view.flxSeperator3.isVisible=true;
        this.view.segAccounts.isVisible=true;
      }
      else
      {
        this.view.segAccounts.isVisible=false;
        this.view.flxNoTransactions.isVisible=true;
        this.view.flxHeaderNT.isVisible=false;
        this.view.flxSeperator3.isVisible=false;
      }
    }
    else
    {
      if(this.segmentData && this.segmentData.length>0)
      {
        this.view.segAccounts.setData(this.segmentData);
        this.view.flxNoTransactions.isVisible=false;
        this.view.flxHeaderNT.isVisible=true;
        this.view.flxSeperator3.isVisible=true;
        this.view.segAccounts.isVisible=true;
      }
      else
      {
        this.view.flxNoTransactions.isVisible=true;
        this.view.flxHeaderNT.isVisible=false;
        this.view.flxSeperator3.isVisible=false;
        this.view.segAccounts.isVisible=false;
      }
    }
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
          if(typeof(data[i][1][j][field]) == "string" && typeof(data[i][1][j].processedAccountName) == "string" 
             && typeof(data[i][1][j].bankName) == "string"){
            if (data[i][1][j][field] !== undefined && data[i][1][j][field].toLowerCase().indexOf(searchText.toLowerCase()) >= 0
                ||data[i][1][j].processedAccountName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 
                ||data[i][1][j].bankName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
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
      kony.print(er);
    }
  },
    commonSegmentSearch:function(field, searchText, data) {
    var searchdata = [];
    for (var i = 0; i < data.length; i++) {
      if(typeof(data[i][field]) == "string" && typeof(data[i].processedAccountName) == "string"
        && typeof(data[i].bankName) == "string"){
        if (data[i][field] !== undefined && data[i][field].toLowerCase().indexOf(searchText) >= 0 
            ||data[i].processedAccountName.toLowerCase().indexOf(searchText) >= 0
           ||data[i].bankName.toLowerCase().indexOf(searchText) >= 0) {
          searchdata.push(data[i]);
        }
      }
    }
    return searchdata;
  },
  getWidgetDataMap:function(){
    var dataMap={
      lblAccountName:"processedAccountName",
      lblAccountNumber:"lblAccountNumber",
      lblBankName:"bankName",
      lblHeader:"lblHeader",
      imgUpArrow:"imgUpArrow",
      flximgUp:"flximgUp",
      lblAccountBalValue:"lblAccountBalValue", //availableBalance
      lblAccountBal:"accountBalanceType",
      accountNumber:"accountNumber",
      imgAccountType:"imgAccountType",
      flxAccountType:"flxAccountType"
    }
    return dataMap;
  },
  setSegmentDataCIF:function(){
    try{
      var navMan=applicationManager.getNavigationManager();
      var accdata=  navMan.getCustomInfo("frmBillPayFromAccount");
      var accountsData=accdata.fromaccounts;
      var processedAccounts=this.getOrganisationAccountsMap(accountsData);
      var rowArray=[];
      var setdataArr=[];
      var configManager = applicationManager.getConfigurationManager();
      var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
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
      var forUtility=applicationManager.getFormatUtilManager();
      for(var i=0;i<processedAccounts[key].length;i++){
        var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
        if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
          var iconVisible=false;
        }else{
          if(profileAccess==="both"){
            var iconVisible=true;
            var imgIcon = "businessaccount.png";
            if(processedAccounts[key][i].isBusinessAccount==="true" ||processedAccounts[key][i].isBusinessAccount === true){
              imgIcon = "businessaccount.png";
            }else{
              imgIcon = "personalaccount.png";
            }
          }else{
            var iconVisible=false;
          }
        }
        var accountBalValue=kony.sdk.isNullOrUndefined(processedAccounts[key][i].availableBalance) ? "0" : processedAccounts[key][i].availableBalance;
        var accountBalValueCurrency=  forUtility.formatAmountandAppendCurrencySymbol(processedAccounts[key][i]["availableBalance"],processedAccounts[key][i]["currencyCode"]) ;
        //configManager.getCurrencyCode()+" "+accountBalValue;
        processedAccounts[key][i].lblAccountBalValue = accountBalValueCurrency;
        processedAccounts[key][i].template = "flxAccountsNoImage";
        processedAccounts[key][i].availableBalance = processedAccounts[key][i]["availableBalance"];
        processedAccounts[key][i].processedAccountName  =  CommonUtilities.truncateStringWithGivenLength(processedAccounts[key][i].accountName+ "....", 20),
        processedAccounts[key][i].lblAccountNumber  =  (processedAccounts[key][i].accountID).substr((processedAccounts[key][i].accountID).length - 4);
        processedAccounts[key][i].accountBalanceType  = kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
        processedAccounts[key][i].flxAccountType  = {isVisible:iconVisible} ;
        processedAccounts[key][i].imgAccountType  = {src:imgIcon} ;
        processedAccounts[key][i].flxSeparator  = {isVisible:true} ;
        processedAccounts[key][i].bankName  = processedAccounts[key][i].accountType ;

//         var rowJson={ 
//           "template": "flxAccountsNoImage",
//           "availableBalance": accountBalValueCurrency, 
//           "processedAccountName": CommonUtilities.truncateStringWithGivenLength(processedAccounts[key][i].accountName+ "....", 20),
//           "lblAccountNumber":(processedAccounts[key][i].accountID).substr((processedAccounts[key][i].accountID).length - 4),
//           "bankName":processedAccounts[key][i].accountType,
//           "accountBalanceType":"Available Balance",
//           "flxAccountType":{isVisible:iconVisible},
//           "imgAccountType":{src:imgIcon},
//           "flxSeparator":{isVisible:true},
//         };
        rowArray.push(processedAccounts[key][i]);
      }
      if(rowArray.length!==0)
      {
        setdataArr.push([headerJson,rowArray]);
        var dataMap = this.getWidgetDataMap();
        this.view.segAccounts.widgetDataMap = dataMap;
        this.view.segAccounts.setData(setdataArr);
        this.view.segAccounts.setVisibility(true);
      }else{
        this.view.segAccounts.setVisibility(false);
      }
    }
    }catch(er){
      kont.print(er);
    }
  },
  getOrganisationAccountsMap : function(accounts){
    try{
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
        var BillPayModule = applicationManager.getModulesPresentationController("BillPaymentUIModule");  
        var viewBindData=BillPayModule.processViewFormattedData(accounts);
        var  processedAccounts=BillPayModule.orderByPriority(viewBindData);
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
      kony.print(er)
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
  }
  }  
});