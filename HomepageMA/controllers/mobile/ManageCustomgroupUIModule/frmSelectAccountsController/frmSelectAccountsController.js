define(["CommonUtilities"],function(CommonUtilities){
  return {
    _originalArrayAccounts : [],
    timerCounter:0,
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
          this.view.flxHeader.isVisible = false;
        }else{
          this.view.flxHeader.isVisible = true;
        }
        this.bindevents();
        this.resetForm();
        var navManager = applicationManager.getNavigationManager();    
        var formFlow = navManager.getCustomInfo("Customview"); 
        if(formFlow==="RemoveAccount" ){
          this.fetchAccountsForRemove();
        }else if(formFlow==="AddCustomAccount" ){
          this.fetchAccountsListForAddMore();
        }else if(formFlow==="CreateCustomview"){          
          this.fetchAllAccounts();               
        }

      }catch(error){
        kony.print("preShowfunc-->"+error);
      }
    },

    ///////********bindevents is used set thewidgets onclick and initialise the data*****////////
    bindevents:function()
    {
      try {  

        var navManager = applicationManager.getNavigationManager();    
        var formFlow = navManager.getCustomInfo("Customview");  
        var customviewName= navManager.getCustomInfo("customViewDetails");  
        if(formFlow==="RemoveAccount"){
          this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.selectaccounts.txtButton.Remove");
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = customviewName.customviewName;
          }else{
            this.view.customHeader.lblLocateUs.text = customviewName.customviewName;
          }
          this.view.btnContinue.onClick = this.onClickContinue;
          this.view.confirmationAlertPopup.onClickflxYes = this.removeAccountConfirm;

        }else if(formFlow==="CreateCustomview"){
          this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.selectaccounts.txtButton.Continue");
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = kony.i18n.getLocalizedString("kony.mb.customview.selectedaccounts");

          }else{
            this.view.customHeader.lblLocateUs.text =  kony.i18n.getLocalizedString("kony.mb.customview.selectedaccounts");
          }
          this.view.btnContinue.onClick = this.onClickContinue;

        }else if(formFlow==="AddCustomAccount"){
          this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.selectaccounts.txtButton.AddAccounts");
          if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.title = kony.i18n.getLocalizedString("kony.mb.customview.selectedaccounts");
          }else{
            this.view.customHeader.lblLocateUs.text =  kony.i18n.getLocalizedString("kony.mb.customview.selectedaccounts");
          }
          this.view.btnContinue.onClick = this.onClickContinue;
          //this.view.confirmationAlertPopup.onClickflxYes = this.addAccountConfirm;
        }

        this.view.flxConfirmationPopUp.isVisible = false;
        this.view.flxSegSelectAccounts.isVisible = true;
        this.view.flxsep.isVisible = true;
        this.view.lblNodatafound.isVisible = false;
        this.view.flxPopup.isVisible = false;
        this.view.customHeader.flxBack.onClick = this.backNavigation;
        this.view.onDeviceBack = this.backNavigation;        
        this.view.confirmationAlertPopup.onClickflxNo = this.onClickNo;
        this.view.flxConfirmationPopUp.onClick = this.dummyFunc;
        this.view.tbxSearch.onTextChange=this.searchCustomViewListLocal;
        this.view.imgCross.onTouchEnd = this.searchCustomViewListLocal.bind(this,true);
      }catch(error){
        kony.print(" bindevents-->"+error);
      }       
    },
    resetForm:function()
    {
      try { 
        this.view.tbxSearch.text = "";
        this.view.managecustomexpandCollapseView.segList.removeAll();
        this._originalArrayAccounts = [];
      }catch(error){
        kony.print(" resetForm-->"+error);
      }
    },

    backNavigation:function(){
      try{
        var navManager = applicationManager.getNavigationManager();    
        var formFlow = navManager.getCustomInfo("Customview"); 
        if(formFlow==="RemoveAccount" ||formFlow=== "AddCustomAccount"){
          navManager = applicationManager.getNavigationManager();
          navManager.navigateTo("frmCustomView");
        }else{
          navManager = applicationManager.getNavigationManager();
          navManager.navigateTo("frmManageCustomGroup");
        }
      }catch(er){
      }
    },

    dummyFunc:function(){
      try{

      }catch(er){
      }
    },

    onClickContinue:function(){
      try{                
        var data=this.view.managecustomexpandCollapseView.segList.data;
        var selectedTitleCountArr=[];
        var selectedRowValue=[];
        var totalCount=0;
        var selrowjson={};

        for(var i=0;i<data.length;i++)
        {
          var selectedCount=0;           
          for(var j=0;j<data[i][1].length;j++)
          {              
            if(data[i][1][j].imgSelectAccounts.src==="activebox.png"){
              totalCount= totalCount+1;
              selectedCount=selectedCount+1;
              selrowjson={"accountID":data[i][1][j].accountID};
              selectedRowValue.push(selrowjson);
            }
          }
          var keyjson={"selectedTitle":data[i][0].lblHeader,
                       "selectedCount":selectedCount,                        
                      };
          selectedTitleCountArr.push(keyjson);
        }
        var formflow={
          "selectedTitleCountArr": selectedTitleCountArr,
          "totalCount": totalCount,
          "selectedAccounts":selectedRowValue

        };

        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("SelectedAccountsTitleCount",formflow);   
        var formFlow = navManager.getCustomInfo("Customview"); 
        var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
        var msgText;
        var basicConfig;
        var pspConfig = {};
        if(formFlow==="RemoveAccount"){        
          if(isiPhone) {
            msgText = kony.i18n.getLocalizedString("kony.mb.customView.removemsg");
            basicConfig = {message: msgText,
                           alertTitle:"",
                           alertIcon:null,
                           alertType: constants.ALERT_TYPE_CONFIRMATION,
                           yesLabel:"Yes",
                           noLabel:"No", 
                           alertHandler: this.removeAccountConfirmIphone
                          };
            applicationManager.getPresentationUtility().showAlertMessage(basicConfig,pspConfig);
          }else{
            this.view.confirmationAlertPopup.lblMessage =kony.i18n.getLocalizedString("kony.mb.customView.removemsg");
            this.view.flxConfirmationPopUp.isVisible = true;
          }          
        }else if(formFlow==="CreateCustomview"){
          navManager.navigateTo("frmCreateCustomGroup");

        }else if(formFlow==="AddCustomAccount"){ 
          this.addAccountConfirm();
          //           if(isiPhone) {
          //             msgText = "Are you sure do you want to Add these account";
          //             basicConfig = {message: msgText,
          //                            alertTitle:"",
          //                            alertIcon:null,
          //                            alertType: constants.ALERT_TYPE_CONFIRMATION,
          //                            yesLabel:"Yes",
          //                            noLabel:"No", 
          //                            alertHandler: this.addAccountConfirmIphone
          //                           };           
          //             applicationManager.getPresentationUtility().showAlertMessage(basicConfig,pspConfig);
          //           }else{
          //             this.view.confirmationAlertPopup.lblMessage ="Are you sure do you want to Add these account";
          //             this.view.flxConfirmationPopUp.isVisible = true;
          //           }
        }

      }catch(er){
      }
    },

    removeAccountConfirmIphone : function(response){
      if(response === true)
      {
        this.removeAccountConfirm();
      }
    },

    addAccountConfirmIphone : function(response){
      if(response === true)
      {
        this.addAccountConfirm();
      }
    },

    removeAccountConfirm:function(){
      try{ 
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navMan=applicationManager.getNavigationManager();
        var customView= navMan.getCustomInfo("CustomviewSelectedAccountIds");
        var customviewIDandName= navMan.getCustomInfo("customViewDetails");         
        var getData = navMan.getCustomInfo("SelectedAccountsTitleCount"); 
        var selectedAccount = getData.selectedAccounts; 
        var customViewAccountid = customView.split(",");
        var filterAccountId=[];
        var finalFilteredAccountId="";
        ///***this filter is used for filter the accountid 
        if(selectedAccount.length!==customViewAccountid.length){
          filterAccountId = customViewAccountid.filter(function(obj) {
            return !selectedAccount.some(function(obj2) {
              return obj === obj2.accountID;
            });

          });   
          finalFilteredAccountId = filterAccountId.toString();
        }else{
          finalFilteredAccountId=" ";
        }
        ////***end of filter
        var inputParams = {
          "id":customviewIDandName.id,
          "name": customviewIDandName.customviewName,
          "accountIds":finalFilteredAccountId
        };
        var screenName = "frmSelectAccounts";
        var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule');
        accountModule.presentationController.updateCustomview(inputParams,screenName);
      }catch(er){     
      }
    },

    addAccountConfirm:function(){
      try{ 
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navMan=applicationManager.getNavigationManager();
        var customViewAccountid= navMan.getCustomInfo("CustomviewSelectedAccountIds"); 
        var customviewIDandName= navMan.getCustomInfo("customViewDetails"); 
        var getData = navMan.getCustomInfo("SelectedAccountsTitleCount"); 
        var selectedAccount = getData.selectedAccounts; 
        var selectedAccountId="";

        for(var i=0;i<selectedAccount.length;i++)
        {
          if(i===0)
          {
            selectedAccountId = selectedAccount[i].accountID;
          }
          else{
            selectedAccountId = selectedAccountId+","+selectedAccount[i].accountID;
          }
        }       
        var combineAccountId=selectedAccountId+","+customViewAccountid;          
        var inputParams = {
          "id":customviewIDandName.id,
          "name": customviewIDandName.customviewName,
          "accountIds": combineAccountId
        };
        var screenName = "frmSelectAccounts";
        var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule');
        accountModule.presentationController.updateCustomview(inputParams,screenName);
      }catch(er){     
      }
    },

    updateCustomViewSuccessCallBack: function(response){
      try{ 
        if(!kony.sdk.isNullOrUndefined(response)){
          var navManager = applicationManager.getNavigationManager();  
          var formFlow = navManager.getCustomInfo("Customview");
          var accountIds =  response.accountIds;
          navManager.setCustomInfo("CustomviewSelectedAccountIds",accountIds);
          if(formFlow==="RemoveAccount"){
            var successFlag ="RemovecustomAccount_Sucess";
            navManager.setCustomInfo("formFlow",successFlag);
            navManager.navigateTo("frmCustomView")
          }else if(formFlow==="AddCustomAccount"){
            var successFlag ="AddcustomAccount_Sucess";
            navManager.setCustomInfo("formFlow",successFlag);
            navManager.navigateTo("frmCustomView");
          }
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }catch(er){   
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },

    onClickNo:function(){
      try{                
        this.view.flxConfirmationPopUp.isVisible = false;
      }catch(er){     
      }
    },


    ///////********fetchAccounts is used set the account list*****////////

    fetchAllAccounts:function()
    {
      try {

        var navManager = applicationManager.getNavigationManager();
        var custominfoInt = navManager.getCustomInfo("frmDashboard");      
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts = CommonUtilities.cloneJSON(custominfoInt.accountData);
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        }
        var processedAccounts= this.getOrganisationAccountsMap(accounts);
        var rowArray=[];
        var setdataArr=[];
        var scopeobj = this;
        for(var key in processedAccounts) {  
          var header;
          var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
          if(isSingleCustomerProfile===true || isSingleCustomerProfile==="true"){
            header = key === "Checking" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Checking") 
            : key === "Savings" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Savings")
            : key === "CreditCard" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.CreditCard")
            : key === "Deposit" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Deposit")
            : key === "Mortgage" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Mortgage")
            : key === "Loan" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Loan")
            : key === "CURRENT" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.CURRENT")
            : key === "Investment" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Investment")
            : key === "Line of Credit" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Line of Credit")
            : kony.i18n.getLocalizedString("kony.mb.common.AccountType.Other")
          }else{
            header = key;
          }
          var headerJson={ 
            "template" : "flxCustomManageExpColHeader",           
            "lblHeader":header,          
            "imgUpArrow":{"src": "arrowup.png"},
            "lblSelectall":{"skin":"sknLbl4176A4SSPReg26px"},
            "imgSelectall":{"src": "inactivebox.png"},
            "flxSelectall":{
              onClick : function(eventObject,context){
                var secIndex = context["sectionIndex"];
                var rowIndex = context["rowIndex"];
                scopeobj.view.managecustomexpandCollapseView.onclickSelectedAllDetected({section:secIndex,row:rowIndex});
              }
            },
            "flxContent":{
              onClick : function(eventObject,context){
                var secIndex = context["sectionIndex"];
                var rowIndex = context["rowIndex"];
                scopeobj.view.managecustomexpandCollapseView.headerSelectionDetected({section:secIndex,row:rowIndex});
              }
            },
          };
          rowArray=[];
          for(var i=0;i<processedAccounts[key].length;i++){
            var imgIcon = "businessaccount.png";
            var isCombineduser=false;
            var bankNameleft;
            var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            //             if(applicationManager.getConfigurationManager().isCombinedUser === "true") {
            //               isCombineduser=true;
            //               if(key === "Personal Accounts"){
            //                 bankNameleft = "5DP";
            //                 imgIcon = "personalaccount.png" ;
            //               }          
            //             }            
            if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
              isCombineduser = false;
              bankNameleft = "0DP";
            }else{
              if(profileAccess === "both") {
                isCombineduser = true;
                bankNameleft = "5Dp";
                if(processedAccounts[key][i].isBusinessAccount === false || processedAccounts[key][i].isBusinessAccount === "false"){
                  imgIcon = "personalaccount.png" ;
                }
              }}
            var isback = navManager.getCustomInfo("isBackfrmCreateCustomGroup"); 
            var imgSelectAccount = "inactivebox.png";
            if(isback.isBackSelectAccount===true){
              ///***this loop is used  for filter the selectedaccounts to show the select image***////
              ///**using accountIDs to filter
              var getData = navManager.getCustomInfo("SelectedAccountsTitleCount");    
              var selectedAccount = getData.selectedAccounts; 
              for(var k=0;k<selectedAccount.length;k++){
                if(processedAccounts[key][i].accountID===selectedAccount[k].accountID){
                  imgSelectAccount="activebox.png";
                }           
              }}       
            ////***end of filter**///
            var bankNameLabel = processedAccounts[key][i].accountType === "Checking" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Checking.key") 
            : processedAccounts[key][i].accountType === "Savings" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Savings.key")
            : processedAccounts[key][i].accountType === "CreditCard" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.CreditCard.key")
            : processedAccounts[key][i].accountType === "Deposit" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Deposit.key")
            : processedAccounts[key][i].accountType === "Mortgage" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Mortgage.key")
            : processedAccounts[key][i].accountType === "Loan" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Loan.key")
            : processedAccounts[key][i].accountType === "CURRENT" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.CURRENT.key")
            : processedAccounts[key][i].accountType === "Investment" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Investment.key")
            : processedAccounts[key][i].accountType === "Line of Credit" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Line of Credit.key")
            : kony.i18n.getLocalizedString("kony.mb.common.AccountType.Other.key")

            var rowJson={ 
              "template": "flxSelectAccounts",
              "lblAccountName":CommonUtilities.truncateStringWithGivenLength(processedAccounts[key][i].nickName + "....", 20)+(processedAccounts[key][i].accountID).substr((processedAccounts[key][i].accountID).length - 4),
              "imgAccountType":{"src":imgIcon},
              "flxAccountType":{isVisible:isCombineduser},
              "imgBank":{"src" :(processedAccounts[key][i].logoURL) ? processedAccounts[key][i].logoURL : ""},
              "flximgBank" :{"isVisible" : (processedAccounts[key][i].logoURL) ? true : false  },
              "lblBankName":{"text":bankNameLabel,"left":bankNameleft},
              "imgSelectAccounts":{src:imgSelectAccount},
              "accountID":processedAccounts[key][i].accountID,
              "flxMain":{isVisible:true},
              "flxSeparator":{isVisible:true}, 
            };
            rowArray.push(rowJson);

          }

          if(rowArray.length!==0)
          {
            rowArray[rowArray.length-1].flxSeparator.isVisible=false;
            setdataArr.push([headerJson,rowArray]);
          }
        }

        var widgetDataMapping = {
          "lblHeader" : "lblHeader",
          "flxImgUp" : "flxImgUp",
          "imgUpArrow" : "imgUpArrow",
          "lblSelectall":"lblSelectall",
          "imgSelectall":"imgSelectall",
          "lblAccountName":"lblAccountName",
          "imgAccountType":"imgAccountType",
          "imgBank":"imgBank",
          "lblBankName":"lblBankName",
          "imgSelectAccounts":"imgSelectAccounts", 
          "flxMain": "flxMain",
          "flximgBank":"flximgBank",
          "flxSeparator":"flxSeparator",
          "flxAccountType":"flxAccountType",
          "flxContent":"flxContent",
          "flxSelectall":"flxSelectall"
        };
        this._originalArrayAccounts = CommonUtilities.cloneJSON(setdataArr);
        this.view.managecustomexpandCollapseView.setDataInList(widgetDataMapping,setdataArr);
        var self=this;
        this.view.managecustomexpandCollapseView.btnContinueOnclickEnable(self);
      }catch(error){
        kony.print("fetchAllAccounts -->"+error);
      }       
    },



    ///////********fetchAccountsForRemove is used set the account list for remove*****////////
    fetchAccountsForRemove:function()
    {
      try {
        var navManager = applicationManager.getNavigationManager();
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts = CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        } 
        var accountIds = navManager.getCustomInfo("CustomviewSelectedAccountIds");
        var accountIDs = accountIds.split(",");
        var AccountFilterarray = [];
        var setdataArr=[];

        ///***this loop is used  for filter the custom view accounts from All acoounts***////
        ///**using accountIDs to filter
        for(var j=0;j<accountIDs.length;j++){
          for(var k=0;k<accounts.length;k++){
            if(accounts[k].accountID===accountIDs[j]){
              AccountFilterarray .push(accounts[k]);
            }            
          }         
        }
        ////***end of filter**///
        if(AccountFilterarray.length===0){
          this.view.flxSegSelectAccounts.isVisible = false;
          this.view.lblNodatafound.isVisible = true;
          this.view.flxsep.isVisible = false;
        }else{
          var processedAccounts = this.getOrganisationAccountsMap(AccountFilterarray);
          var rowArray=[];
          var scopeobj = this;
          for(var key in processedAccounts) {
            var header;
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            if(isSingleCustomerProfile===true || isSingleCustomerProfile==="true"){
              header = key === "Checking" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Checking") 
            : key === "Savings" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Savings")
            : key === "CreditCard" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.CreditCard")
            : key === "Deposit" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Deposit")
            : key === "Mortgage" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Mortgage")
            : key === "Loan" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Loan")
            : key === "CURRENT" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.CURRENT")
            : key === "Investment" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Investment")
            : key === "Line of Credit" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Line of Credit")
            : kony.i18n.getLocalizedString("kony.mb.common.AccountType.Other")
            }else{
              header = key;
            }
            var headerJson={ 
              "template" : "flxCustomManageExpColHeader",
              "lblHeader":header,          
              "imgUpArrow":{"src": "arrowup.png"},
              "lblSelectall":{"skin":"sknLbl4176A4SSPReg26px"},
              "imgSelectall":{"src": "inactivebox.png"},
              "flxSelectall":{
                onClick : function(eventObject,context){
                  var secIndex = context["sectionIndex"];
                  var rowIndex = context["rowIndex"];
                  scopeobj.view.managecustomexpandCollapseView.onclickSelectedAllDetected({section:secIndex,row:rowIndex});
                }
              },
              "flxContent":{
                onClick : function(eventObject,context){
                  var secIndex = context["sectionIndex"];
                  var rowIndex = context["rowIndex"];
                  scopeobj.view.managecustomexpandCollapseView.headerSelectionDetected({section:secIndex,row:rowIndex});
                }
              },
            };
            //  headerArray.push(headerJson);
            rowArray=[];
            for(var i=0;i<processedAccounts[key].length;i++){

              var imgIcon = "businessaccount.png";
              var isCombineduser=false;  
              var bankNameleft;
              var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
              if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
                bankNameleft = "0Dp";
                isCombineduser = false;
              }else{
                if(profileAccess === "both") {
                  isCombineduser = true;
                  bankNameleft = "5Dp";
                  if(processedAccounts[key][i].isBusinessAccount === false || processedAccounts[key][i].isBusinessAccount === "false"){
                    imgIcon = "personalaccount.png" ;
                  }
                }}
                var bankNameLabel = processedAccounts[key][i].accountType === "Checking" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Checking.key") 
            : processedAccounts[key][i].accountType === "Savings" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Savings.key")
            : processedAccounts[key][i].accountType === "CreditCard" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.CreditCard.key")
            : processedAccounts[key][i].accountType === "Deposit" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Deposit.key")
            : processedAccounts[key][i].accountType === "Mortgage" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Mortgage.key")
            : processedAccounts[key][i].accountType === "Loan" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Loan.key")
            : processedAccounts[key][i].accountType === "CURRENT" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.CURRENT.key")
            : processedAccounts[key][i].accountType === "Investment" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Investment.key")
            : processedAccounts[key][i].accountType === "Line of Credit" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Line of Credit.key")
            : kony.i18n.getLocalizedString("kony.mb.common.AccountType.Other.key")
              var rowJson={ 
                "template": "flxSelectAccounts",
                "lblAccountName":CommonUtilities.truncateStringWithGivenLength(processedAccounts[key][i].nickName + "....", 20)+"..."+ (processedAccounts[key][i].accountID).substr((processedAccounts[key][i].accountID).length - 4),
                "imgAccountType":{"src":imgIcon},
                "flxAccountType":{isVisible:isCombineduser},
                "imgBank":{"src" :(processedAccounts[key][i].logoURL) ? processedAccounts[key][i].logoURL : ""},
                "flximgBank" :{"isVisible" : (processedAccounts[key][i].logoURL) ? true : false  },
                "lblBankName":{"text":bankNameLabel,"left":bankNameleft},
                "imgSelectAccounts":{src:"inactivebox.png"},
                "accountID":processedAccounts[key][i].accountID,
                "flxMain":{isVisible:true},
                "flxSeparator":{isVisible:true}, 
              };
              rowArray.push(rowJson);
            }
            if(rowArray.length!==0)
            {
              rowArray[rowArray.length-1].flxSeparator.isVisible=false;
              setdataArr.push([headerJson,rowArray]);
            }
          }
        }

        var widgetDataMapping = {
          "lblHeader" : "lblHeader",
          "flxImgUp" : "flxImgUp",
          "imgUpArrow" : "imgUpArrow",
          "lblSelectall":"lblSelectall",
          "imgSelectall":"imgSelectall",
          "lblAccountName":"lblAccountName",
          "imgAccountType":"imgAccountType",
          "imgBank":"imgBank",
          "lblBankName":"lblBankName",
          "imgSelectAccounts":"imgSelectAccounts", 
          "flxMain": "flxMain",
          "flximgBank":"flximgBank",
          "flxSeparator":"flxSeparator",
          "flxAccountType":"flxAccountType",
          "flxSelectall":"flxSelectall",
          "flxContent":"flxContent"
        };
        this._originalArrayAccounts = CommonUtilities.cloneJSON(setdataArr);
        this.view.managecustomexpandCollapseView.setDataInList(widgetDataMapping,setdataArr);
        var self=this;
        this.view.managecustomexpandCollapseView.btnContinueOnclickEnable(self);
      }catch(error){
        kony.print("fetchAccountsForRemove -->"+error);
      }       
    },
    ///////********fetchAccountsListForAddMore is used set the account list for addmore account*****////////
    fetchAccountsListForAddMore:function()
    {
      try {
        var navManager = applicationManager.getNavigationManager();
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts = CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts = CommonUtilities.cloneJSON(custominfoExt.accountData);
        if(Array.isArray(externalAccounts)){
          if(externalAccounts.length===0){
            accounts = internalAccounts.concat(externalAccounts);
          }else{
            accounts = custominfoInt.accountData; 
          }
        }else{
          accounts = custominfoInt.accountData;
        } 
        var accountIds = navManager.getCustomInfo("CustomviewSelectedAccountIds");
        var accountIDs = accountIds.split(",");
        var AccountFilterarray = []; 
        ///***this loop is used  for filter the custom view accounts from All acoounts***////
        ///**using accountIDs to filter
        AccountFilterarray = accounts.filter(function(obj) {
          return !accountIDs.some(function(obj2) {
            return obj.accountID === obj2;
          });
        });
        ////*****End of filter****///

        if(AccountFilterarray.length===0){
          this.view.flxSegSelectAccounts.isVisible = false;
          this.view.lblNodatafound.isVisible = true;
          this.view.flxsep.isVisible = false;
        }else{
          var processedAccounts = this.getOrganisationAccountsMap(AccountFilterarray);
          var rowArray=[];
          var setdataArr=[];
          var scopeobj = this;
          for(var key in processedAccounts) {
            var header;
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
              header = key === "Checking" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Checking") 
            : key === "Savings" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Savings")
            : key === "CreditCard" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.CreditCard")
            : key === "Deposit" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Deposit")
            : key === "Mortgage" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Mortgage")
            : key === "Loan" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Loan")
            : key === "CURRENT" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.CURRENT")
            : key === "Investment" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Investment")
            : key === "Line of Credit" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Line of Credit")
            : kony.i18n.getLocalizedString("kony.mb.common.AccountType.Other")
            }else{
              header = key;
            }
            var headerJson={ 
              "template" : "flxCustomManageExpColHeader",
              "lblHeader":header,          
              "imgUpArrow":{"src": "arrowup.png"},
              "lblSelectall":{"skin":"sknLbl4176A4SSPReg26px"},
              "imgSelectall":{"src": "inactivebox.png"},
              "flxSelectall":{
                onClick : function(eventObject,context){
                  var secIndex = context["sectionIndex"];
                  var rowIndex = context["rowIndex"];
                  scopeobj.view.managecustomexpandCollapseView.onclickSelectedAllDetected({section:secIndex,row:rowIndex});
                }
              },
              "flxContent":{
                onClick : function(eventObject,context){
                  var secIndex = context["sectionIndex"];
                  var rowIndex = context["rowIndex"];
                  scopeobj.view.managecustomexpandCollapseView.headerSelectionDetected({section:secIndex,row:rowIndex});
                }
              },
            };
            rowArray=[];
            for(var i=0;i<processedAccounts[key].length;i++){
              var imgIcon = "businessaccount.png";
              var isCombineduser=false;
              var bankNameleft;
              var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
              if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
                isCombineduser = false;
                bankNameleft = "0DP";
              }else{
                if(profileAccess === "both") {
                  isCombineduser = true;
                  if(processedAccounts[key][i].isBusinessAccount === false || processedAccounts[key][i].isBusinessAccount === "false"){
                    imgIcon = "personalaccount.png" ;
                    bankNameleft = "5DP"
                  }
                }}
                var bankNameLabel = processedAccounts[key][i].accountType === "Checking" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Checking.key") 
            : processedAccounts[key][i].accountType === "Savings" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Savings.key")
            : processedAccounts[key][i].accountType === "CreditCard" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.CreditCard.key")
            : processedAccounts[key][i].accountType === "Deposit" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Deposit.key")
            : processedAccounts[key][i].accountType === "Mortgage" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Mortgage.key")
            : processedAccounts[key][i].accountType === "Loan" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Loan.key")
            : processedAccounts[key][i].accountType === "CURRENT" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.CURRENT.key")
            : processedAccounts[key][i].accountType === "Investment" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Investment.key")
            : processedAccounts[key][i].accountType === "Line of Credit" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Line of Credit.key")
            : kony.i18n.getLocalizedString("kony.mb.common.AccountType.Other.key")
              var rowJson={ 
                "template": "flxSelectAccounts",
                "lblAccountName":CommonUtilities.truncateStringWithGivenLength(processedAccounts[key][i].nickName + "....", 20)+"..."+ (processedAccounts[key][i].accountID).substr((processedAccounts[key][i].accountID).length - 4),
                "imgAccountType":{"src":imgIcon},
                "flxAccountType":{isVisible:isCombineduser},
                "imgBank":{"src" :(processedAccounts[key][i].logoURL) ? processedAccounts[key][i].logoURL : ""},
                "flximgBank" :{"isVisible" : (processedAccounts[key][i].logoURL) ? true : false  },
                "lblBankName":{"text":bankNameLabel,"left":bankNameleft},
                "imgSelectAccounts":{src:"inactivebox.png"},
                "accountID":processedAccounts[key][i].accountID,
                "flxMain":{isVisible:true}, 
                "flxSeparator":{isVisible:true}, 
              };
              rowArray.push(rowJson);
            }

            if(rowArray.length!==0)
            {
              rowArray[rowArray.length-1].flxSeparator.isVisible=false;
              setdataArr.push([headerJson,rowArray]);
            }
          }

          var widgetDataMapping = {
            "lblHeader" : "lblHeader",
            "flxImgUp" : "flxImgUp",
            "imgUpArrow" : "imgUpArrow",
            "lblSelectall":"lblSelectall",
            "imgSelectall":"imgSelectall",
            "lblAccountName":"lblAccountName",
            "imgAccountType":"imgAccountType",
            "imgBank":"imgBank",
            "lblBankName":"lblBankName",
            "imgSelectAccounts":"imgSelectAccounts", 
            "flxMain": "flxMain",
            "flximgBank":"flximgBank",
            "flxSeparator":"flxSeparator",
            "flxAccountType":"flxAccountType",
            "flxSelectall":"flxSelectall",
            "flxContent":"flxContent"
          };
          this._originalArrayAccounts = CommonUtilities.cloneJSON(setdataArr);
          this.view.managecustomexpandCollapseView.setDataInList(widgetDataMapping,setdataArr);
          var self=this;
          this.view.managecustomexpandCollapseView.btnContinueOnclickEnable(self);
        }

      }catch(error){
        kony.print("fetchAccountsListForAddMore -->"+error);
      }       
    },


    getOrganisationAccountsMap : function(accounts) {
      try{
        var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
        if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){

          var moneyMovementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });

          var viewBindData=moneyMovementModule.presentationController.processViewFormattedData(accounts);
          var processedAccounts=moneyMovementModule.presentationController.orderByPriority(viewBindData);
          return processedAccounts;

        }
        else{
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
                if(account.Membership_id === primaryCustomerId.id && account.isBusinessAccount === "false"){
                  orgAccounts["Personal Accounts"].push(account);
                }

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
          if(!kony.sdk.isNullOrUndefined(orgAccounts["Personal Accounts"])){
            if(orgAccounts["Personal Accounts"].length === 0){
              delete orgAccounts["Personal Accounts"];
            }
          }
          if(!kony.sdk.isNullOrUndefined(orgAccounts["Business Accounts"])){
            if(orgAccounts["Business Accounts"].length === 0){
              delete orgAccounts["Business Accounts"];
            }
          }
          return orgAccounts;
        }
      }catch(error){

      }

    },


    getDistinctBusinessAccount: function(accounts){
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
    },

    gblselectedarraydata:[],
    getSelectedAccountsInSearch : function(){
      var data=this.view.managecustomexpandCollapseView.invokeToSercheddata();
      this.gblselectedarraydata= data;
      for(var i=0;i<this.gblselectedarraydata.length;i++)
      {
        for(var j=0;j<i;j++)
        {
          if(this.gblselectedarraydata[i].accountID==this.gblselectedarraydata[j].accountID)
          {
            this.gblselectedarraydata.splice(i,1);
            i--;
          }
        }
      }
      return  this.gblselectedarraydata;
    },

    searchCustomViewListLocal : function(flag){//flag is set to true when clicked on cross icon.
      this.view.imgCross.setVisibility(true);

      try{    
        var self=this;
        this.view.managecustomexpandCollapseView.btnContinueOnclickEnable(self);
        var selectedAccountsarr =  this. getSelectedAccountsInSearch();
        var searchText = "";
        if(!kony.sdk.isNullOrUndefined(flag) && flag === true){
          searchText = "";
          this.view.tbxSearch.text = "";
          this.view.imgCross.setVisibility(false);
        }
        else{
          searchText = this.view.tbxSearch.text.toLowerCase();
        }
        var segData = CommonUtilities.cloneJSON(this._originalArrayAccounts);
        for(var i =0 ; i<segData.length; i++){
          for(var j =0 ; j<segData[i][1].length; j++){
            for(var k=0;k<selectedAccountsarr.length;k++)
            {               
              if(selectedAccountsarr[k].accountID==segData[i][1][j].accountID)
              {
                segData[i][1][j].imgSelectAccounts.src="activebox.png";
              }           
            }
          }
        }
        if(searchText === ""){
          this.view.imgCross.setVisibility(false);
          this.view.flxSegSelectAccounts.isVisible = true;
          this.view.lblNodatafound.isVisible = false;
          this.setDataInAccountList(segData);
          return;
        }
        if(searchText.length > 2){
          var addSearchedArr = [];
          for(var m =0 ; m<segData.length; m++){
            addSearchedArr = [];
            var rowItems = segData[m][1];
            if(rowItems.length > 0){
              if(rowItems[0].template !== "flxNoPending"){
                for(var r=0 ; r<rowItems.length; r++){
                  var lblTransactionAP = rowItems[r].lblAccountName.toLowerCase();
				  var acctId = rowItems[r].accountID;
                  var achTransReqType = kony.sdk.isNullOrUndefined(rowItems[r].lblBankName.text) ? ""  : rowItems[r].lblBankName.text.toLowerCase();
                  if(lblTransactionAP.indexOf(searchText) > -1 || achTransReqType.indexOf(searchText) > -1 || acctId.indexOf(searchText) > -1 )  {
                    addSearchedArr.push(rowItems[r]);
                  }
                }//End of rowITems for loop
                segData[m].pop();
                segData[m].push(addSearchedArr);
              }
            }
          }//End of header for Loop
          for(var s=0;s<segData.length;s++)
          {
            if(segData[s][1].length===0)
            {        
              segData.splice(s,1);	
              s--;
            }
          }

          if(segData.length===0){
            this.view.flxSegSelectAccounts.isVisible = false;
            this.view.lblNodatafound.isVisible = true;
            this.view.lblNodatafound.text = kony.i18n.getLocalizedString("i18n.konybb.manageUser.noAccountAccess");
          }else{
            this.view.flxSegSelectAccounts.isVisible = true;
            this.view.lblNodatafound.isVisible = false;
            this.setDataInAccountList(segData);
          }

        }
      }catch(e){
        //alert("Exception in searchMyRequestsListLocal::"+e);
      }
    },

    setDataInAccountList: function(segData) {
      try {
        kony.print("entered setDataInAccountList"+JSON.stringify(segData));

        var widgetDataMapping = {
          "lblHeader" : "lblHeader",
          "flxImgUp" : "flxImgUp",
          "imgUpArrow" : "imgUpArrow",
          "lblSelectall":"lblSelectall",
          "lblAccountName":"lblAccountName",
          "imgAccountType":"imgAccountType",
          "imgBank":"imgBank",
          "lblBankName":"lblBankName",
          "imgSelectAccounts":"imgSelectAccounts", 
          "flxMain": "flxMain",
          "flxNoPending": "flxNoPending",
          "lblTransactionPending":"lblTransactionPending",
          "flximgBank":"flximgBank"
        };
        var dataArr = [] ;
        dataArr = CommonUtilities.cloneJSON(segData);
        this.view.managecustomexpandCollapseView.setDataInList(widgetDataMapping,dataArr);
        var self = this;
        this.view.managecustomexpandCollapseView.btnContinueOnclickEnable(self);
      } catch (e) {
        kony.print("Exception in setDataInAccountList" + e);
      }
    },

    fetchErrorcallBack:function(response)
    {
      try {    
        if(!kony.sdk.isNullOrUndefined(response)){
          var scopeObj=this;
          var errorResponse = response.errorMessage;
          this.view.flxPopup.customPopup.lblPopup.text = errorResponse;      
          this.timerCounter=parseInt(this.timerCounter)+1;
          var timerId="timerPopupError"+this.timerCounter;
          this.view.flxPopup.skin = "sknflxff5d6e";
          this.view.customPopup.imgPopup.src = "errormessage.png";    
          this.view.flxPopup.setVisibility(true);
          kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
          }, 1.5, false);             
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }catch(error){
        kony.print("frmACHTransactions fetchErrorcallBack-->"+error);
      }       
    },


  };
});