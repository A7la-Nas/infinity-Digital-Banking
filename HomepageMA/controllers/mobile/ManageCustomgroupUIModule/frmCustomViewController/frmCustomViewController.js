define(["CommonUtilities"], function(CommonUtilities){ 
  return{
    _prevFormData : {},
     timerCounter: 0,
    _originalArrayAccounts : [],

    /*
     *init is called when the form is loaded , initialisation happen here
     *
     */
    init : function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();      
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
        this.view.preShow = this.preShowForm;
        this.view.postShow = this.postShowForm;
      }catch(e){
        kony.print("Exception in init::"+e);}
    },

    onNavigate: function(params) {
      try {
        kony.print("onNavigate inside" + JSON.stringify(params));

      } catch (e) {
        kony.print("Exception in onNavigate" + e);
      }
    },

    //preShowForm is called when the form is pre loaded 
    preShowForm : function(){
      try{
        kony.print("Entered preShowForm");
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
        this.initActions();
        this.resetForm();
        this.fetchAccounts();
      }catch(e){
        kony.print("Exception in preShowForm::"+e);}
    },
    
    postShowForm : function(){
      try{
        kony.print("Entered postShowForm");
      }catch(e){
        kony.print("Exception in postShowForm::"+e);}
    },

    /*
     *initActions is to bind the actions form widgets
     *
     */
    initActions: function() {
      try {
        kony.print("Entered initActions");
        this.view.expandCollapseView.segList.onRowClick = this.segListApprovalsonRowClick;
        this.view.customHeader.flxBack.onClick = this.navToPrevForm;
        this.view.tbxSearch.onTextChange=this.searchCustomViewListLocal;
        this.view.imgClear.onTouchEnd = this.searchCustomViewListLocal.bind(this,true);
        this.view.customHeader.btnRight.onClick=this.editCustomView;
        this.view.flxCancel.onClick = this.editCancel;
        this.view.flxEditCustomView.onClick = this.navToEditCustomView;
        this.view.customGroupDonePopup.btnDone.onClick = this.editDonClose;
        this.view.flxDeleteCustom.onClick = this.deleteCustomView;
        this.view.flxRemoveExisting.onClick = this.removeCustomView;
        this.view.flxAddMore.onClick = this.addCustomviewAccount;
        this.view.confirmationAlertPopup.onClickflxNo = this.deleteCustomViewNo;
        this.view.confirmationAlertPopup.onClickflxYes = this.deleteCustomViewYes;
        //this.view.onDeviceBack = this.dummyFunction;
        this.view.flxEditCustomViewPopup.onClick = this.dummyFunction;
        this.view.flxEditCustomViewDonPopup.onClick = this.dummyFunction;
        this.view.customHeaderTablet.btnRight.onClick = this.editCustomView;
        this.view.customHeaderTablet.flxBack.onClick =this.navToPrevForm;
      } catch (e) {
        kony.print("Exception in initActions" + e);
      }
    },

    dummyFunction: function() {

    },
    /*
     *resetForm is to reset the entire form widgets

     */
    resetForm: function() {
      try {
        kony.print("Entered resetForm");
        this.view.flxPopup.setVisibility(false);
        this.view.flxExpandCollapseView.isVisible = true;
        this.view.lblNodatafound.isVisible = false;
        this.view.flxsep.isVisible=true;
        this.view.flxEditCustomViewPopup.isVisible = false;
        this.view.flxEditCustomViewDonPopup.isVisible=false;
        this.view.flxConfirmationPopUp.isVisible=false;
        this.view.tbxSearch.text = "";
        this._originalArrayAccounts = [];
        this.view.expandCollapseView.segList.removeAll();
        var navMan=applicationManager.getNavigationManager();
        var formFlow = navMan.getCustomInfo("formFlow");
        if(formFlow==="showDonPopup"){       
          this.view.flxEditCustomViewDonPopup.isVisible=true;
          this.view.customGroupDonePopup.lblMessage.text= kony.i18n.getLocalizedString("kony.mb.customView.editmsg");
        }else if(formFlow==="RemovecustomAccount_Sucess"){
          this.view.flxEditCustomViewDonPopup.isVisible=true;
          this.view.customGroupDonePopup.lblMessage.text=kony.i18n.getLocalizedString("kony.mb.customview.accountsRemovedMessage");
        }else if(formFlow==="AddcustomAccount_Sucess"){
          this.view.flxEditCustomViewDonPopup.isVisible=true;
          this.view.customGroupDonePopup.lblMessage.text=kony.i18n.getLocalizedString("kony.mb.customview.accountsAddedMessage");
        }
        else{
          this.view.flxEditCustomViewDonPopup.isVisible=false;
        }
        
        var customviewName= navMan.getCustomInfo("customViewDetails");  
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.flxHeader.isVisible = false; 
          this.view.flxheaderiphone.isVisible = true;
          this.view.customHeaderTablet.lblHeaderTitle.text = customviewName.customviewName;
          //this.view.title = customviewName.lblTitle;
        }else{
          this.view.flxHeader.isVisible = true;
          this.view.flxheaderiphone.isVisible = false;
          this.view.customHeader.imgBack.src = "backbutton.png";
          this.view.customHeader.lblLocateUs.text = customviewName.customviewName;
          this.view.flxMainContainer.top = "56dp";
          this.view.flxMainContainer.bottom = "0dp";
        }
      } catch (e) {
        kony.print("Exception in resetForm" + e);
      }
    },

    editCancel:function(){
      try {  
        this.view.flxEditCustomViewPopup.isVisible = false;
      }catch(error){
        kony.print("editCancel-->"+error);
      }       
    },

    editCustomView:function(){
      try {  
        this.view.flxEditCustomViewPopup.isVisible = true;
      }catch(error){
        kony.print("editCustomView-->"+error);
      }       
    },

    removeCustomView:function(){
      try {  
        var navManager = applicationManager.getNavigationManager();
        var formFlow ="RemoveAccount"
        navManager.setCustomInfo("Customview",formFlow);
        navManager.navigateTo("frmSelectAccounts");
      }catch(error){
        kony.print("removeCustomView-->"+error);
      }       
    },

    addCustomviewAccount:function(){
      try {  
        var navManager = applicationManager.getNavigationManager();
        var formFlow ="AddCustomAccount"
        navManager.setCustomInfo("Customview",formFlow);
        navManager.navigateTo("frmSelectAccounts");
      }catch(error){
        kony.print("removeCustomView-->"+error);
      }       
    },

    deleteCustomView:function(){
      try {  
        var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
        if(isiPhone) {
          this.view.flxEditCustomViewPopup.isVisible = false;
          var msgText = kony.i18n.getLocalizedString("kony.mb.customview.confirmDeletePopup");
          var basicConfig = {message: msgText,
                             alertTitle:"",
                             alertIcon:null,
                             alertType: constants.ALERT_TYPE_CONFIRMATION,
                             yesLabel:"Yes",
                             noLabel:"No", 
                             alertHandler: this.deleteConfirmIphone
                            };
          var pspConfig = {};
          applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
        }else{
          this.view.flxEditCustomViewPopup.isVisible = false;
          this.view.confirmationAlertPopup.lblMessage= kony.i18n.getLocalizedString("kony.mb.customview.confirmDeletePopup");
          this.view.flxConfirmationPopUp.isVisible=true;
        }
      }catch(error){
        kony.print("deleteCustomView-->"+error);
      }       
    },

    deleteConfirmIphone : function(response){
      if(response === true)
      {
        this.deleteCustomViewYes();
      }else{
        this.deleteCustomViewNo();
      }
    },

    deleteCustomViewNo:function(){
      try {  
        this.view.flxConfirmationPopUp.isVisible=false;
      }catch(error){
        kony.print("editCancel-->"+error);
      }       
    },

    deleteCustomViewYes: function() {
      try {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navMan=applicationManager.getNavigationManager();
        var customviewID= navMan.getCustomInfo("customViewDetails");  
        var inputParams = {
          "id":customviewID.id
        };
        var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule');
        accountModule.presentationController.deleteCustomview(inputParams);
      } catch (e) {
        kony.print("exception navToEditCustomView" + e);
      }
    },

    deleteCustomViewSuccessCallBack: function(response) {
      try {
        if(!kony.sdk.isNullOrUndefined(response)){
          var navMan=applicationManager.getNavigationManager();
          var keyvalue="deleteShowPopup";
          navMan.setCustomInfo("formFlow",keyvalue); 
          navMan.navigateTo("frmManageCustomGroup");
          applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } catch (e) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        kony.print("exception deleteCustomViewSuccessCallBack" + e);
      }
    },

    navToEditCustomView: function() {
      try {
        kony.print("entered navToEditCustomView");
        var navMan=applicationManager.getNavigationManager();
        navMan.navigateTo("frmEditCustomGroupName");
      } catch (e) {
        kony.print("exception navToEditCustomView" + e);
      }
    },

    editDonClose:function()
    {
      try {  
        var navMan=applicationManager.getNavigationManager();
        var keyvalue="editHidePopup";
        navMan.setCustomInfo("formFlow",keyvalue);
        this.view.flxEditCustomViewDonPopup.isVisible=false;
      }catch(error){
        kony.print("frmACHTransactionsdetails rejectCancel-->"+error);
      }       
    },


    navToPrevForm: function() {
      try {
        kony.print("entered navToPrevForm");
        var navMan=applicationManager.getNavigationManager();
        navMan.goBack();
      } catch (e) {
        kony.print("exception navToPrevForm" + e);
      }
    },
   
    fetchAccounts:function()
    {
      try {
        var navManager = applicationManager.getNavigationManager();
//         var custominfoInt = navManager.getCustomInfo("frmDashboard");
//         var accounts = custominfoInt.accountData;      
        var custominfoInt = navManager.getCustomInfo("frmDashboard"); 
        var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
        var internalAccounts;
        var accounts;
        internalAccounts = CommonUtilities.cloneJSON(custominfoInt.accountData);                    
        var externalAccounts =  CommonUtilities.cloneJSON(custominfoExt.accountData);
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

        for(var j=0;j<accountIDs.length;j++){
          for(var k=0;k<accounts.length;k++){
            if(accounts[k].accountID===accountIDs[j]){
              AccountFilterarray .push(accounts[k]);
            }            
          }         
        }
        ////***end of filter**///

        if(AccountFilterarray.length===0){
          this.view.flxExpandCollapseView.isVisible = false;
          this.view.lblNodatafound.isVisible = true;
          this.view.flxsep.isVisible = false;
        }else{
          var processedAccounts = this.getOrganisationAccountsMap(AccountFilterarray);
          var rowArray=[];
          var setdataArr=[];

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
              "template" : "flxApprovalReqExpColHeader",
              "lblHeader":{text:header},          
              "imgUpArrow":{"src": "arrowupblue.png"},
            };

            rowArray=[];
            for(var i=0;i<processedAccounts[key].length;i++){             
              var imgIcon = "businessaccount.png";
               var isCombineduser=false;
               var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
              if(isSingleCustomerProfile === true || isSingleCustomerProfile === "true"){
                isCombineduser = false;
              }else{
                if(profileAccess === "both") {
                isCombineduser = true;
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
                "lblAccountName":{text:CommonUtilities.truncateStringWithGivenLength(processedAccounts[key][i].nickName + "....", 20)+(processedAccounts[key][i].accountID).substr((processedAccounts[key][i].accountID).length - 4)},
                "imgAccountType":{"src":imgIcon},
                "flxAccountType":{isVisible:isCombineduser},
                "imgBank":{"src" :(processedAccounts[key][i].logoURL) ? processedAccounts[key][i].logoURL : "","isVisible" : (processedAccounts[key][i].logoURL) ? true : false},
                "flximgBank" :{"isVisible" : (processedAccounts[key][i].logoURL) ? true : false  },
                "lblBankName":{text:bankNameLabel},
                "imgSelectAccounts":{isVisible:false},
                "accountID":processedAccounts[key][i].accountID,
                "flxMain":{isVisible:true},
                "flxSeparator":{isVisible:true}, 
              };
              rowArray.push(rowJson);
            }
             if(rowArray.length!==0){
                rowArray[rowArray.length-1].flxSeparator.isVisible=false;
                setdataArr.push([headerJson,rowArray]);
             }           
          }
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
            "flximgBank":"flximgBank",
            "flxSeparator":"flxSeparator",
            "flxAccountType":"flxAccountType"
          };
          this._originalArrayAccounts = CommonUtilities.cloneJSON(setdataArr);
          this.view.expandCollapseView.setDataInList(widgetDataMapping, setdataArr);
        }
      }catch(error){
        kony.print("managegroupListLoad -->"+error);
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

    searchCustomViewListLocal : function(flag){ //flag is set to true when cross icon is clicked.
      this.view.imgClear.setVisibility(true);
      try{
        kony.print("Entered searchMyRequestsListLocal");
        var searchText = "";
        if(!kony.sdk.isNullOrUndefined(flag) && flag === true){
          searchText ="";
          this.view.tbxSearch.text = "";
          this.view.imgClear.setVisibility(false);
        }
        else{
          searchText = this.view.tbxSearch.text.toLowerCase();
        }
        if(searchText === ""){
           this.view.imgClear.setVisibility(false);
           this.view.flxExpandCollapseView.isVisible = true;
           this.view.lblNodatafound.isVisible = false;
          this.setDataInAccountList(this._originalArrayAccounts);
          return;
        }
        if(searchText.length > 2){
          var segData = CommonUtilities.cloneJSON(this._originalArrayAccounts);
          var addSearchedArr = [];
          for(var i =0 ; i<segData.length; i++){
            kony.print("i::"+i);
            addSearchedArr = [];
            var rowItems = segData[i][1];
            if(rowItems.length > 0){
              if(rowItems[0].template !== "flxNoPending"){
                for(var j =0 ; j<rowItems.length; j++){
                  var lblTransactionAP = rowItems[j].lblAccountName.text.toLowerCase();
                  var achTransReqType = kony.sdk.isNullOrUndefined(rowItems[j].lblBankName) ? ""  : rowItems[j].lblBankName.text.toLowerCase();
                  if(lblTransactionAP.indexOf(searchText) > -1  || achTransReqType.indexOf(searchText) > -1  ){
                    addSearchedArr.push(rowItems[j]);
                  }
                }//End of rowITems for loop
                segData[i].pop();
                segData[i].push(addSearchedArr);              
              }
            }
          }//End of header for Loop
          for(var k=0;k<segData.length;k++)
          {
            if(segData[k][1].length===0)
            {        
              segData.splice(k,1);	
              k--;
            }
          }
          if(segData.length===0){
            this.view.flxExpandCollapseView.isVisible = false;
            this.view.lblNodatafound.isVisible = true;
            this.view.lblNodatafound.text = kony.i18n.getLocalizedString("kony.mb.customview.noDataFound");
          }else{
            this.view.flxExpandCollapseView.isVisible = true;
            this.view.lblNodatafound.isVisible = false;
            this.setDataInAccountList(segData);
          }
        }
      }catch(e){
        kony.print("Exception in searchMyRequestsListLocal::"+e);}
    },
    
    setDataInAccountList: function(segData) {
      try {
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
          "flximgBank":"flximgBank",
          "flxSeparator":"flxSeparator"
        };
        var dataArr = [] ;
        dataArr = CommonUtilities.cloneJSON(segData);
         //dataArr[dataArr.length-1].flxSeparator.isVisible=false;
        this.view.expandCollapseView.setDataInList(widgetDataMapping, dataArr);
      } catch (e) {
        kony.print("Exception in setDataInRequestList" + e);
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