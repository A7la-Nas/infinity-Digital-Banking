define({
	cardlessAccounts:null,
  preShow:function(){
    var self = this;
    this.singleCustomerID;
    this.accessibleCustomerIds;
    this.primaryCustomerId;
    this.view.customHeader.flxBack.onClick=this.flxBackOnClick;
    this.view.customHeader.flxHeader.btnRight.onClick = this.flxBackOnClick;
    this.view.tbxSearch.onTouchStart = this.tbxSearchOnTouchEnd;
    this.view.customSearchbox.btnCancel.onClick = this.btnCancelOnClick;
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    }
    var navMan=applicationManager.getNavigationManager();
    var fromAccountsList = navMan.getCustomInfo("frmCardLessFrom");
    var fromaccounts = [];
    if( !kony.sdk.isNullOrUndefined(fromAccountsList.fromaccounts) && fromAccountsList.fromaccounts !== "" ) {
      fromaccounts = fromAccountsList.fromaccounts;
    }
    var userPrefManager = applicationManager.getUserPreferencesManager();
    
    this.singleCustomerID=userPrefManager.isSingleCustomerProfile;
    //true;
    this.accessibleCustomerIds = userPrefManager.accessibleCustomerIds;
      //[{"id":"2020131101","type":"business","name":"Kony India Pvt LTD1"},{"id":"2020131102","type":"personal","name":"Kony India Pvt LTD2"}];
    this.primaryCustomerId = userPrefManager.primaryCustomerId;
    //{"id":"2020131101","type":"personal"};
    this.isIconVisible = false;
    this.isPersonalAccounts = false;
    this.setIconVisibility();
    
    this.view.customSearchbox.tbxSearch.text="";
    this.view.flxSearch.top = "0dp";
    this.view.tbxSearch.text="";
    this.view.customSearchbox.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
    var accProcessedData = (JSON.parse(JSON.stringify(fromaccounts)));
    this.setSegmentData(accProcessedData);
    this.btnCancelOnClick();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
 },
  setIconVisibility: function(){
   this.accessibleCustomerIds.forEach((item,index)=>{
        if(index!==0){
         if(this.accessibleCustomerIds[0].type!==item.type){
           this.isIconVisible=true;
         }
       }
      });
  },

  segToAccountOnRowClick:function(){
	applicationManager.getPresentationUtility().showLoadingScreen();
    var navMan=applicationManager.getNavigationManager();
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    var preAccData = this.view.segToAccount.selectedItems[0];
    cardlessModule.presentationController.setFromAccountDetails(preAccData);
    var txnDetails=cardlessModule.presentationController.getTransactionObject();
	txnDetails=cardlessModule.presentationController.processAccountsData(txnDetails);
    navMan.setCustomInfo("frmCardLessWithdraw",txnDetails);
    cardlessModule.presentationController.commonFunctionForNavigation("frmCardLessWithdraw");
  },
  flxBackOnClick:function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  btnRightOnCLick:function(){
    var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
	cardlessModule.presentationController.cancelCommon();
  },
   tbxSearchOnTouchEnd: function() {
            var scope = this;
       kony.timer.schedule("timerId", function() {
                           scope.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.2, false);
         this.view.tbxSearch.setFocus(true);
         this.view.flxHeader.setVisibility(false);
         this.view.flxHeaderSearchbox.setVisibility(true);
         this.view.flxMainContainer.top = "40dp";
          this.view.segToAccount.top ="0dp";
         this.view.flxSearch.setVisibility(false);
     },
     btnCancelOnClick: function() {
        this.view.customSearchbox.tbxSearch.text="";
    	this.view.tbxSearch.text="";
         this.view.flxHeaderSearchbox.setVisibility(false);
         this.view.flxSearch.setVisibility(true);
             this.view.flxNoTransactions.isVisible=false;
          	//this.view.flxHeaderNT.isVisible=false;
          	//this.view.flxSeperator3.isVisible=false;
    	    this.view.lblNoTransaction.isVisible=false;
        	this.view.segToAccount.isVisible=true;
         if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
             this.view.flxHeader.isVisible = false;
             this.view.flxMainContainer.top = "0dp";
         } else {
             this.view.flxHeader.isVisible = true;
             this.view.flxMainContainer.top = "56dp";
         }
          this.view.segToAccount.top ="55dp";
         if( !kony.sdk.isNullOrUndefined(this.cardlessAccounts) ) {
           this.view.segToAccount.setData(this.cardlessAccounts);
         }
         else {
           this.view.segToAccount.setData([]);
         }
  },
  
  setSegmentData:function(res){
    var dataMap=this.getDataMap();
    this.view.segToAccount.widgetDataMap=dataMap;
    
    if(res.length === 0)
    {
      this.view.segToAccount.isVisible=false;
      this.view.flxNoTransactions.isVisible=true;
      //this.view.flxHeaderNT.isVisible=false;
      //this.view.flxSeperator3.isVisible=false;
      this.view.lblNoTransaction.isVisible=true;
    }
    else
    {
      this.view.segToAccount.isVisible=true;
      this.view.flxNoTransactions.isVisible=false;
      var i =0;
      //this.view.flxHeaderNT.isVisible=false;
      //this.view.flxSeperator3.isVisible=false;
      this.view.lblNoTransaction.isVisible=false;
      var forUtility=applicationManager.getFormatUtilManager();
      // var configurationManager = applicationManager.getConfigurationManager();     
      var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
      var profileaccessIconVisible;
      if(profileAccess==="both"){
        profileaccessIconVisible = true;
      }else{
        profileaccessIconVisible = false;
      }
      
      if(this.singleCustomerID) {
        for(i =0 ; i < res.length;i++)
        {
          res[i].lblAccountBal=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.AvailableBalance");
          res[i].lblAccountNumber = "..." + (res[i].accountID).substr((res[i].accountID).length - 4);
          res[i].amount=res[i].availableBalance;
          res[i].availableBalance=forUtility.formatAmountandAppendCurrencySymbol(res[i].availableBalance,res[i].currencyCode);
        }
        res.forEach(element =>{if(element.nickName.length>25){
          element["nickName"]=element.nickName.substr(0,25);
        }});
        this.groupAccounts(res);
      }

      else{
        var scope = this;
        var filterPersonalAcc=[];
        var map = {};
        
        for(i = 0; i < this.accessibleCustomerIds.length; i++){ //mapping all customer IDs to empyt array initially
          var x = this.accessibleCustomerIds[i].id;
          map[x] = [];
        }
        
        for(i = 0; i<res.length; i++){

          if(res[i].Membership_id === this.primaryCustomerId.id && this.primaryCustomerId.type === "personal"){ //checking for all personal Accounts 
            res[i].flxAccountType={
              "isVisible":profileaccessIconVisible
            }
            res[i].imgAccountType = {
              "src": res[i].isBusinessAccount ==="true" ? "businessaccount.png" :"personalaccount.png"
            };
             var formatUtility=applicationManager.getFormatUtilManager();
            var availBal = formatUtility.formatAmountandAppendCurrencySymbol(res[i].availableBalance,res[i].currencyCode);
            res[i].amount=res[i].availableBalance;          
            res[i].availableBalance = availBal;
            res[i].lblAccountNumber = "..." + (res[i].accountID).substr((res[i].accountID).length - 4);
            res[i].lblAccountBal = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.AvailableBalance");
            filterPersonalAcc.push(res[i]);
            scope.isPersonalAccounts = true;
          }
          else{
            for(var j =0;j<this.accessibleCustomerIds.length;j++){
              if(res[i].Membership_id === this.accessibleCustomerIds[j].id){
                res[i].flxAccountType={
                  "isVisible":profileaccessIconVisible
                }
                res[i].imgAccountType = {
                  "src": res[i].isBusinessAccount ==="true" ? "businessaccount.png" :"personalaccount.png"
                };
              }
            }
            res[i].template = "flxCombinedAccounts";
            res[i].lblAccountName = res[i].accountName;
            var formatUtility=applicationManager.getFormatUtilManager();
            var availBal = formatUtility.formatAmountandAppendCurrencySymbol(res[i].availableBalance,res[i].currencyCode);
            res[i].amount=res[i].availableBalance;          
            res[i].availableBalance = availBal;
            res[i].lblAccountNumber = "..." + (res[i].accountID).substr((res[i].accountID).length - 4);
            res[i].lblAccountBal = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.AvailableBalance");
            res[i].flximgBank = {
              "isVisible": false
            };
            res[i].accountType = {"text" : res[i].accountType};
            map[res[i].Membership_id].push(res[i]); 
          }
        }
          var segData = [];
          if(this.isPersonalAccounts){
            segData.push([
              {
                "template" : "flxTransHeader",
                "lblHeader" : {"text" : "Personal Accounts ("+ filterPersonalAcc.length +")"},
                "flxTypeOneShadow" : {
                  "isVisible" : true
                },
                "flximgUp" : {
                  "isVisible" : true
                },
                "imgUpArrow" : {
                  "src" : "arrowup.png"
                }
              },
              filterPersonalAcc
            ]);
          }
          for(i=0;i<this.accessibleCustomerIds.length;i++){
            
            if(map[this.accessibleCustomerIds[i].id].length){
            var array = [
              {
                "template" : "flxTransHeader",
                "lblHeader" : {"text" : this.accessibleCustomerIds[i].name+" ("+ map[this.accessibleCustomerIds[i].id].length +")"},
                "flxTypeOneShadow" : {
                  "isVisible" : true
                },
                "flximgUp" : {
                  "isVisible" : true
                },
                "imgUpArrow" : {
                  "src" : "arrowup.png"
                }
              },
             map[this.accessibleCustomerIds[i].id]
            ];
            segData.push(array);
          }
          }
          segData.forEach(element=>element[1]
                          .forEach(elem=>{if(elem.nickName.length>25){
                            elem["nickName"]= elem.nickName.substr(0,25);
                          }}));
          this.view.segToAccount.setData(segData);
          this.cardlessAccounts=segData;
        }
      
    }
  },
  groupAccounts : function(res){
    var cardLessCashModule = applicationManager.getModulesPresentationController("CardLessUIModule");
    this.processedData=res;
      var viewBindData=cardLessCashModule.processViewFormattedData(this.processedData);
      viewBindData=cardLessCashModule.orderByPriority(viewBindData);
      var segData=[];
      if(this.processedData.length>0){
        for(var key in viewBindData){
          var sectionHeaderData={};
          var combinedData=[];
          if(key !== "CreditCard"){
            if (viewBindData[key].length > 1) {
              sectionHeaderData["lblHeader"] = {"text":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My")+" " + key + " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.accounts")+" (" + viewBindData[key].length + ")"};
            } else {
              sectionHeaderData["lblHeader"] = {"text":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My")+" " + key + " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.account")+" (" + viewBindData[key].length + ")"};
            }
          }
          else{
            if (viewBindData[key].length > 1) {
              sectionHeaderData["lblHeader"] = {"text":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My") + " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.creditcards")+" (" + viewBindData[key].length + ")"};
            } else {
              sectionHeaderData["lblHeader"] = {"text":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My")+ " "+ applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.creditcard")+" (" + viewBindData[key].length + ")"};
            }
          }
          
          sectionHeaderData["flxImgUp"] = {
            isVisible : true,
          };
          sectionHeaderData["imgUpArrow"] = {
            isVisible : true,
          };
          
          var rowDataForSection=cardLessCashModule.sortByPrefrence(viewBindData[key]);
          if(rowDataForSection.length>0){
            combinedData.push(sectionHeaderData);
            combinedData.push(rowDataForSection);
            combinedData.push(rowDataForSection);
            segData.push(combinedData);
          }
        }
      }
    this.view.segToAccount.setData(segData);
    this.cardlessAccounts=segData;
  },
  
  getDataMap : function(){
    var dataMap={};
    dataMap = {
       "lblAccountName":"nickName",
      "lblAccountBal":"lblAccountBal",
      "lblAccountBalValue":"availableBalance",
	  "lblBankName":"accountType",
      "accountID":"accountID",
      "amount":"amount",
       "lblHeader" : "lblHeader",
      "flxTypeOneShadow" : "flxTypeOneShadow",
      "flximgUp" : "flximgUp",
      "imgUpArrow" : "imgUpArrow",
      "lblAccountNumber": "lblAccountNumber",
      "imgBank": "imgBank",
      "imgWarn":"imgWarn",
      "flximgBank" :"flximgBank",
      "flxAccountType":"flxAccountType",
      "imgAccountType":"imgAccountType",
    };
    return dataMap;
  },
  tbxSearchOnTextChange:function(){
    var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
    var data = this.cardlessAccounts;
    var searchSegData = this.commonSectionSegmentSearch("accountName", searchtext, data);
    this.view.segToAccount.setData(searchSegData);      
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
        if(typeof(data[i][1][j][field]) == "string" && typeof(data[i][1][j].lblAccountNumber) == "string" 
                  && typeof(data[i][1][j].nickName) == "string"){
          if (data[i][1][j][field] !== undefined && data[i][1][j][field].toLowerCase().indexOf(searchText.toLowerCase()) >= 0
              ||data[i][1][j].lblAccountNumber.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 
              ||data[i][1][j].nickName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
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
      if(typeof(data[i][field]) == "string" && typeof(data[i].nickName) == "string"){
        if (data[i][field] !== undefined && data[i][field].toLowerCase().indexOf(searchText) >= 0 
            ||data[i].nickName.toLowerCase().indexOf(searchText) >= 0) {
          searchdata.push(data[i]);
        }
      }
    }
    return searchdata;
  }
  
  
 });
