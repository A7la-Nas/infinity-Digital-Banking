define({
  tickmarkValue:"0",
	init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
    preShow: function () {
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        }
        else{
            this.view.flxHeader.isVisible = true;
        }
        this.initActions();
        //this.setAccountsSegmentData();
        //this.setSegDefaultAcct();
        this.setSegDefaultAcctCifID();
        var navManager = applicationManager.getNavigationManager();
	  	var currentForm = navManager.getCurrentForm();
	    applicationManager.getPresentationFormUtility().logFormName(currentForm);
	  	applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    initActions: function () {
        var scope = this;
        this.view.segAccounts.onRowClick=this.segAccountsOnClick;
        this.view.customHeader.flxBack.onClick=function(){
        	var navManager = applicationManager.getNavigationManager();
           navManager.goBack();
    	};
    },
	  setSegDefaultAcct : function(){
        var navManager = applicationManager.getNavigationManager();
        var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
        var data = navManager.getCustomInfo("frmPreferencesDefaultAccount");
		if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.title = kony.i18n.getLocalizedString("kony.mb.default.account");
        }
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.default.account");
        this.view.segAccounts.widgetDataMap={
              				       lblAccountName:"nickName",
                                   lblBankName:"bankName",
              					   lblAccountID:"accountID",
                       			   imgRadio:"imgRadio",
                                   flxAccountType:"flxAccountType",
                                   imgAccountType:"imgAccountType" 
                             };
         for(var i=0;i<data[1].length;i++){
           if(!isSingleCustomerProfile){
             var isBusinessAccount = data[1][i].isBusinessAccount;
             if(isBusinessAccount === "false"){
               data[1][i].imgAccountType = {"src":"personalaccount.png"};
               data[1][i].flxAccountType = {"isVisible":true};
               data[1][i].lblAccountName = {"left":"40dp"}
             }else{
              data[1][i].imgAccountType = {"src":"businessaccount.png"};
              data[1][i].flxAccountType = {"isVisible":true};
              data[1][i].lblAccountName = {"left":"40dp"}
             }
             
           }else{
             data[1][i].flxAccountType = {"isVisible":false};
             data[1][i].lblAccountName = {"left":"20dp"}
           }
          if(data[1][i].accountID === data[0].lblAccId){
              data[1][i].imgRadio = {src:"radiobtn.png"};
           }
           else{
          	  data[1][i].imgRadio = {src:"radiobuttoninactive.png"};
           }
         }
         if(data[1].length>0)
        {
         this.view.segAccounts.setData(data[1]);
           this.view.segAccounts.isVisible = true;
          this.view.flxNoTransactions.isVisible = false;
        }
        else
        {
            this.view.flxNoTransactions.isVisible = true;
            this.view.segAccounts.isVisible = false;
        }
    },
  segAccountsOnClick : function(){
    try{
      var selectedAcntRow = this.view.segAccounts.selectedIndex[1];
            var segData = this.view.segAccounts.selectedRowItems[0];
                    if (segData.imgRadio.src === "tickmark_green.png"){
                      segData.imgRadio.src = "";
                      segData.imgRadio.isVisible = false;
                    }
                    else {
                        segData.imgRadio.isVisible = true;
                        segData.imgRadio.src = "tickmark_green.png";
                        this.selAccountId = segData.accountID;
                      	this.tickmarkValue = segData.accountID;
                        var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsModule");
                        settingsMode.presentationController.defaultAccountBack(this.selAccountId);
                    }
      this.view.segAccounts.setData(segData);
    }catch(er){
      kony.print(er);
    }
  },
//     segAccountsOnClick: function() {
//         try {
//             var selectedAcntRow = this.view.segAccounts.selectedIndex[1];
//             var segData = this.view.segAccounts.data;
//             //var segData = this.view.segAccounts.selectedRowItems[0];
//             for (var i = 0; i < segData.length; i++) {
//                 if (selectedAcntRow === i) {
//                     if (segData[i][1][0].imgRadio.src === "tickmark_green.png"){
//                       segData[i][1][0].imgRadio.src = "";
//                       segData[i][1][i].imgRadio.isVisible = false;
//                     }
//                     else {
//                         segData[i][1][0].imgRadio.isVisible = true;
//                         segData[i][1][0].imgRadio.src = "tickmark_green.png";
//                         this.selAccountId = segData[i][1][0].accountID;
//                       	this.tickmarkValue = segData[i][1][0].accountID;
//                         var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsModule");
//                         settingsMode.presentationController.defaultAccountBack(this.selAccountId);
//                     }
//                 } else{
//                   segData[i][1][0].imgRadio.src = "";
//                   segData[i][1][0].imgRadio.isVisible = false;
//                 }
//             }
//             this.view.segAccounts.setData(segData);
//         } catch (er) {
//             kony.print(er);
//         }
//     },
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
      kony.print(er)
    }
  },
  widgetDataMap:function(){
    var dataMap={
      lblAccountName:"nickName",
      lblBankName:"bankName",
      lblAccountID:"accountID",
      imgRadio:"imgRadio",
      lblHeader: "lblHeader",
      imgUpArrow : "imgUpArrow",
      flxAccountType:"flxAccountType",
      imgAccountType:"imgAccountType"
    }
    return dataMap;
  },
  setSegDefaultAcctCifID:function(){
    try{
      var navManager = applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("frmPreferencesDefaultAccount");
      this.tickmarkValue = data[0].lblAccId;
      if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
        this.view.title = kony.i18n.getLocalizedString("kony.mb.default.account");
      }
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.default.account");
      var processedAccounts=this.getOrganisationAccountsMap(data[1]);
      var rowArray=[];
      var setdataArr=[];
      var configurationManager = applicationManager.getConfigurationManager();
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
            if(profileAccess==="both"){
              var iconVisible=true;
              var left="47dp";
              var imgIcon = "businessaccount.png";
              if(processedAccounts[key][i].isBusinessAccount==="true" ||processedAccounts[key][i].isBusinessAccount === true){
                imgIcon = "businessaccount.png";
              }else{
                imgIcon = "personalaccount.png";
              }
            }else{
              var iconVisible=false;
              var left="20dp";
            }
          }
          if(this.tickmarkValue!=="0"){
            if(processedAccounts[key][i].accountID === this.tickmarkValue){
              var tickImg="tickmark_green.png";
              var icontickVisible=true;
            } 
            else {
              var tickImg = "";
              var icontickVisible = false;
            }
          }else{
            if (processedAccounts[key][i].accountID === data[0].lblAccId){
              var tickImg ="tickmark_green.png";
              var icontickVisible = true;
            } 
            else {
              var tickImg="";
              var icontickVisible=false;
            }
          }
          var name = processedAccounts[key][i].accountName;
          var rowJson={ 
            "template": "flxDefaultAccount",
                        "nickName": {
                            text: applicationManager.getPresentationUtility().formatText(name, 10, processedAccounts[key][i].accountID, 4),
                        },
                        "bankName": {
                            text: processedAccounts[key][i].accountType,
                            left: left
                        },
                        "imgAccountType": {
                            src: imgIcon
                        },
                        "flxAccountType": {
                            isVisible: iconVisible
                        },
                        "imgRadio": {
                            src: tickImg,
                            isVisible: icontickVisible
                        },
            "accountID":processedAccounts[key][i].accountID,
            // "isEnable":processedAccounts[key][i].isEnabled ==="true"?"On":"Off",
            

          };
          rowArray.push(rowJson);
        }
        if(rowArray.length!==0)
        {
          setdataArr.push([headerJson,rowArray]);
          this.view.segAccounts.widgetDataMap=this.widgetDataMap();
          this.view.segAccounts.setData(setdataArr);
          this.view.segAccounts.setVisibility(true);
        }else{
          this.view.segAccounts.setVisibility(false);
        }
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
});