define(["CommonUtilities"], function(CommonUtilities){ 
  return {
    onInit : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      this.view.preShow = this.preShowfunc;  
    },

    onNavigate:function()
    {
      try { 
      }catch(error){
        kony.print(" onnavigateerror-->"+error);
      }
    },

    preShowfunc:function()
    {
      try {   
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.customHeader.isVisible = false;
        }else{
          this.view.customHeader.isVisible = true;
        }
        this.bindevents();
        this.fetchSelectedTitleandCount();
      }catch(error){
        kony.print("preShowfunc-->"+error);
      }
    },


    ///////********bindevents is used set thewidgets onclick and initialise the data*****////////

    bindevents:function()
    {
      try {          
        this.view.btnManageCustomgroup.onClick = this.onClickManageGroup;
        this.view.btnApply.onClick = this.onclickApply;
        this.view.onDeviceBack = this.dummyfunc;
      }catch(error){
        kony.print(" bindevents-->"+error);
      }       
    },

    dummyfunc:function()
    { },

    onClickManageGroup:function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmManageCustomGroup");
      }catch(er){

      }
    },

    onclickApply:function(){
      try{
        var rawArr = [];
        var navManager = applicationManager.getNavigationManager();
        var accountIds = navManager.getCustomInfo("CreateCustomAccountIds"); //set in frmcreatecustomgroup
        rawArr=this.fetchCustomViewAccounts(accountIds);
        var groupBySelVal = [];
        var grouped = [];       
        rawArr.forEach(function(account) {
          if (account.isBusinessAccount === "false") account.MembershipName = "Personal Accounts";
        });
        groupBySelVal.push("Company");
        grouped = rawArr.reduce(function(h, obj) {
          if (groupBySelVal[0] == "Company") {
            h[obj.MembershipName] = (h[obj.MembershipName] || []).concat(obj);
          }
          return h;
        }, {});

        var processedArry = this.getSegmentDataForAccounts(grouped, 3);
        //Header Totaling and count addtion
        var forUtility = applicationManager.getFormatUtilManager();
        var totalBalance = 0;
        var currencyCode;
        for (d in processedArry) {
          totalBalance = 0;
          for (i = 0; i < processedArry[d][1].length; i++) {
            totalBalance = totalBalance + parseInt(processedArry[d][1][i]["availableBalance"]);
          }
          if (processedArry[d][1].length > 0) {
            currencyCode = processedArry[d][1][0]["currencyCode"];
          }
          processedArry[d][0].lblTypeValue.text = forUtility.formatAmountandAppendCurrencySymbol(totalBalance, currencyCode);
          processedArry[d][0].lblTypeName.text = processedArry[d][0].lblTypeName.text.split("(")[0] + "(" + processedArry[d][1].length + ")";
        }
        var accSegData = [];
        for (var i = 0; i < processedArry.length; i++) {
          var acc = [];
          var key = processedArry[i][0].lblTypeName.text.split("(")[0];
          for (var j in processedArry[i][1]) {
            acc.push(processedArry[i][1][j]);
          }
          accSegData[key] = acc;
        }
        //Setting data
        var data = {
          "segData": processedArry,
          "accountData":accSegData,
          "isFilterApplied": true,
          "accountData":rawArr,
          "selectedAccountsName" : this.view.lblCustomviewName.text         
        };
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmFilterAccounts", data);
          var frmName = {"appName": "HomepageMA","friendlyName": "AccountsUIModule/frmUnifiedDashboard"}; 
        navManager.navigateTo(frmName);
   
      }catch(er){
       kony.print("Exception in onclickApply " + er); 
      }
    },
  
     fetchCustomViewAccounts : function(accountIdsValue){
    try{
      var navManager = applicationManager.getNavigationManager();    
      var custominfoInt = navManager.getCustomInfo("frmDashboard");
      var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
      var internalAccounts;
      var accounts;
      internalAccounts = CommonUtilities.cloneJSON(custominfoInt.accountData);
      var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
      if (Array.isArray(externalAccounts)) {
        if (externalAccounts.length === 0) {
          accounts = internalAccounts.concat(externalAccounts);
        } else {
          accounts = custominfoInt.accountData;
        }
      } else {
        accounts = custominfoInt.accountData;
      }
      var accountIds = accountIdsValue;//navManager.getCustomInfo("CustomviewSelectedAccountIds");
      var accountIDs = accountIds.split(",");
      var AccountFilterarray = [];
      ///***this loop is used  for filter the custom view accounts from All acoounts***////
      ///**using accountIDs to filter
      for (var j = 0; j < accountIDs.length; j++) {
        for (var k = 0; k < accounts.length; k++) {
          if (accounts[k].accountID === accountIDs[j]) {
            AccountFilterarray.push(accounts[k]);
          }
        }
      }
      return AccountFilterarray;
    }catch(e){
      kony.print("Exception in fetchCustomViewAccounts "+e);}
  },
     processAccountsDataForSegment : function(accounts){
    var configurationManager = applicationManager.getConfigurationManager();
    for(var key in accounts) {
      accounts[key].forEach(function(account){
        var imgIcon = "businessaccount.png";
        if( configurationManager.isCombinedUser === "true"){
          if(account.isBusinessAccount === "false"){
            imgIcon = "personalaccount.png" ;
          }else{
            imgIcon = "businessaccount.png";
          }
        }
        else if(configurationManager.isSMEUser === "true"){
          imgIcon = "businessaccount.png";
        }
        else{
          imgIcon = "personalaccount.png" ;
        }


        account.imgAccountType = {
          "src" : imgIcon
        };
        account.imgBank = {
          "src" : (account.logoURL) ? account.logoURL : "",
          "isVisible" : (account.logoURL) ? true : false
        };
        account.flximgBank = {
          "isVisible" : (account.logoURL) ? true : false
        };
        account.availableBalanceValue = {
          "text" : applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(account.availableBalance, account.currencyCode)
        };
        account.lblAccountBal = {
          "text" : kony.i18n.getLocalizedString("kony.mb.managecustom.lblAccountBalance")
        };
        account.flxSeparator = {
          "isVisible" : true
        };

        account.maskedNickName = {
          "text" : (account.nickName).substr(0, 25).trim()
        }
        account.maskedAccountNumber = {
          "text" : "..." + (account.accountID).substr((account.accountID).length - 4)
        };
        account.flxStatus = {
          "isVisible" : !kony.sdk.isNullOrUndefined(account.accountStatus)? (account.accountStatus.toUpperCase() == "CLOSED" ? true : false): false
        }
      });
    }
    this.filteredAccountsData = accounts;
  },

  getSegmentDataForAccounts : function(accounts, limit){
    var segData = [];
    this.processAccountsDataForSegment(accounts);
    var templateName = "";
    //Sibhi Start
    var configurationManager = applicationManager.getConfigurationManager();
    if( configurationManager.isCombinedUser === "true"){
      templateName = "flxClearViewAll";
    }
    else if(configurationManager.isSMEUser === "true"){
      templateName = "flxViewAll";
    }
    else{
      templateName = "flxViewAll";
    }
    //Sibhi End
    for(var key in accounts) {
      var viewAllConfig = {
        "template" : templateName, //"flxClearViewAll"
        "lblViewAll" : {
          //"text" : "View All"   
          "isVisible": false   // Disabling it as the text is not need
        },
        "imgViewAll": {//"left" : "200%" ,
          "src":"blue_downarrow.png"
        },
        "flxViewContainer" : {
          "onClick" : function(eventobject, context){
            var accountsData = {};
            var accountsKeys = Object.keys(this.filteredAccountsData);
            accountsData[accountsKeys[context.sectionIndex]] = this.filteredAccountsData[accountsKeys[context.sectionIndex]];
            //Upon clicking the downarrow, processing the entire set of data to be visible in the list
            if (accountsData[accountsKeys[context.sectionIndex]].length > limit) {
              var pendingRowdata = accountsData[accountsKeys[context.sectionIndex]].slice(limit, accountsData[accountsKeys[context.sectionIndex]].length);
              var acctSegData = this.getSegmentDataForAccounts(this.filteredAccountsData, 3);
              acctSegData.forEach(function(sectionData, index) {
                if (index == context.sectionIndex) {
                  sectionData[1].pop();
                  Array.prototype.push.apply(sectionData[1], pendingRowdata)
                }
              });
            }
          }.bind(this)
        }
      };
      var rowData = accounts[key];
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
      var sum= accountMod.presentationController.getTotalAvailableBalance(rowData);
      segData.push([
        {
          "template" : "flxAccountsHeaderDashboardwithBorder",
          "flxHeaderShadows" : {
            "isVisible" : true
          },
          "flxSeperator" : {
            "isVisible" : true
          },
          "lblTypeName" : {
            "text" : key + "("+ accounts[key].length +")"
          },
          "lblTypeValue": {
            "text": sum
          },
          "lblAccountBal": {
            "isVisible" : true
          }
        },
        rowData
      ]);
    }
    return segData;
  },
    ///////********fetchSelectedTitleandCount is used set the title and count*****////////

    fetchSelectedTitleandCount:function()
    {
      try {
        var navManager = applicationManager.getNavigationManager()
        var getData = navManager.getCustomInfo("CreateCustomGroup"); 
        this.view.lblTotalcount.text = getData.totalCount;
        this.view.lblCustomviewName.text = getData.customViewName;
        var selectedTitleCount= getData.selectedTitleCount;
        var segDataArray = [];
        for(var i=0;i<selectedTitleCount.length;i++){
          if(selectedTitleCount[i].selectedCount !== 0 || selectedTitleCount[i].selectedCount !== 0.0){
            var json={ 
              "lblKey":selectedTitleCount[i].selectedTitle,
              "lblValue":selectedTitleCount[i].selectedCount.toFixed(0)
            };
            segDataArray.push(json);
          }}
        this.view.segDetails.setData(segDataArray);
      }catch(error){
        kony.print("fetchSelectedTitleandCount -->"+error);
      }       
    },

  };
});