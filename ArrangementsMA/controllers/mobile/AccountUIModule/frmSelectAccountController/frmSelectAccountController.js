define({
  initActions: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.customHeader.btnRight.isVisible=false;
    this.view.customHeader.btnRight.onClick = scope.cancelOnClick;
    this.view.customHeader.flxBack.onTouchEnd = scope.navigateBack;
    this.view.customSearchbox.btnCancel.onClick = scope.cancelOnClick;
  },
  preShow: function () {
    this.initActions();
    //this.view.customSearchbox.btnCancel.onClick = this.resetSearch;
    //this.view.segAccounts.widgetDataMap = this.getWidgetDataMap();
    // this.view.flxSearch.isVisible = true;
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    }
    this.view.flxSearch.height = "55dp";
    this.view.tbxSearch.placeholder = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.FromAccountPlaceholder");
    this.view.tbxSearch.onTextChange=this.searchdata;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    this.accountsData = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboard")));
    this.view.flxNoAccounts.isVisible=false;
    this.view.lblNoAccounts.isVisible=false;
    this.view.segAccounts.isVisible=true;
    this.setSegmentData(this.accountsData.accountData);
  },

  sortAccountsBasedOnType : function(accounts){
    accounts.sort(function(account1, account2){
      return account1.accountType.localeCompare(account2.accountType);
    });
  },
  setSegmentData: function(accountsData) {
	var self = this;
    this.view.segAccounts.widgetDataMap = {
      lblTypeName: "lblTypeName",
      flxTypeOneShadow: "flxTypeOneShadow",
      flxShadowBottom: "flxShadowBottom",
      flxSeparator: "flxSeparator",
      flxExpand: "flxExpand",
      imgExpand : "imgExpand",
      flxAccountNames:"flxAccountNames",
      lblAccountName:"lblAccountName",
      flxSeparator:"flxSeparator"
    };
    var savingsAccounts=[];
    var checkingAccounts=[];
    var loanAccounts=[];
    var creditCardAccounts=[];
    var depositAccounts=[];
    accountsData.forEach(function (account) {
      var savingsAccountType = "Savings";
      var checkingAccountType = "Checking";
      var creditCardAccountType = "CreditCard";
      var loanAccountType = "Loan";
      var depositAccountType ="Deposit";
      if(account.accountType===savingsAccountType){
        var dataObject = {
        "lblAccountName": self.accountDiplayName(account.accountType,26,account.Account_id)
      };
        savingsAccounts.push(dataObject);
      }
      else if(account.accountType===checkingAccountType){
        var dataObject = {
        "lblAccountName": self.accountDiplayName(account.accountType,26,account.Account_id)
      };
        checkingAccounts.push(dataObject);
      }
      else if(account.accountType===loanAccountType){
        var dataObject = {
        "lblAccountName": self.accountDiplayName(account.accountType,26,account.Account_id)
      };
        loanAccounts.push(dataObject);
      }
      else if(account.accountType===creditCardAccountType){
        var dataObject = {
        "lblAccountName": self.accountDiplayName(account.accountType,26,account.Account_id)
      };
        creditCardAccounts.push(dataObject);
      }
      else if(account.accountType===depositAccountType){
        var dataObject = {
        "lblAccountName": self.accountDiplayName(account.accountType,26,account.Account_id)
      };
        depositAccounts.push(dataObject);
      }
      else{
        kony.print("Not belongs to any account type");
      }
    });
    var segmentData=[];
    if(checkingAccounts.length>0){
      var checkingAccountsData=[{
        "lblTypeName": kony.i18n.getLocalizedString("kony.mb.CM.myCheckingAccounts")+"("+checkingAccounts.length+")",
        "imgExpand":{src:"downarrow_blue.png"}},checkingAccounts];
      segmentData.push(checkingAccountsData);
    }
    if(savingsAccounts.length>0){
      var SavingsAccountsData=[{
        "lblTypeName": kony.i18n.getLocalizedString("kony.mb.CM.mySavingAccounts")+"("+savingsAccounts.length+")",
        "imgExpand":{src:"downarrow_blue.png"}},savingsAccounts];
      segmentData.push(SavingsAccountsData);
    }
    if(loanAccounts.length>0){
      var loanAccountsData=[{
        "lblTypeName": kony.i18n.getLocalizedString("kony.mb.CM.myLoanAccounts")+"("+loanAccounts.length+")",
        "imgExpand":{src:"downarrow_blue.png"}},loanAccounts];
      segmentData.push(loanAccountsData);
    }
    if(creditCardAccounts.length>0){
      var creditCardAccountsData=[{
        "lblTypeName": kony.i18n.getLocalizedString("kony.mb.CM.myCreditCardAccounts")+"("+creditCardAccounts.length+")",
        "imgExpand":{src:"downarrow_blue.png"}},creditCardAccounts];
      segmentData.push(creditCardAccountsData);
    }
    if(depositAccounts.length>0){
      var depositAccountsData=[{
        "lblTypeName": kony.i18n.getLocalizedString("kony.mb.CM.myDepositAccounts")+"("+depositAccounts.length+")",
        "imgExpand":{src:"downarrow_blue.png"}},depositAccounts];
      segmentData.push(depositAccountsData);
    }
    this.view.segAccounts.setData(segmentData);
    this.segmentInitialData=segmentData;
    this.view.segAccounts.onRowClick = this.segYearsOnRowClick;
  },

  cancelOnClick:function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  navigateBack:function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  
  accountDiplayName : function(str, maxLength,numberStr){
    var accNoLastDigits;
    var accountName;
    if(numberStr)
    {
      if (numberStr.length < 4) {
        accNoLastDigits= numberStr;
      }else{
        accNoLastDigits= numberStr.slice(-4);
      }
    }
    str = str || "N/A" ;
    if(kony.sdk.isNullOrUndefined(maxLength)){
      return str+"..."+accNoLastDigits;
    }
    if(!kony.sdk.isNullOrUndefined(maxLength) && maxLength>str.length){
      return str+"..."+accNoLastDigits;
    }
    var result = str.substring(0, maxLength-3);
    result = result+"..."+accNoLastDigits;
    return result;
  },
  
  segYearsOnRowClick: function(){
    var selectedAccount;
    var selectedSectionIndex = Math.floor(this.view.segAccounts.selectedIndex[0]);
    var selectedRowIndex = Math.floor(this.view.segAccounts.selectedIndex[1]);
    if(this.view.segAccounts.data[selectedSectionIndex][1][selectedRowIndex]){
      selectedAccount = this.view.segAccounts.data[selectedSectionIndex][1][selectedRowIndex]["lblAccountName"];
    }
    else{
      selectedAccount = this.view.segAccounts.data[selectedRowIndex]["lblAccountName"];
    }
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("selectedAccount", selectedAccount);
    navManager.navigateTo("frmAccStatements");
  },
  searchdata:function()
  {
    var searchData;
    var navMan=applicationManager.getNavigationManager();
    var searchtext=this.view.tbxSearch.text.toLowerCase();
    if(searchtext)
    {
      this.view.segAccounts.removeAll();
      
      var data = this.segmentInitialData;
      searchData = this.getSegmntsearchData("lblAccountName",searchtext,data);
      if(searchData.length>0)
      {
        this.view.segAccounts.setData(searchData);
        this.view.flxNoAccounts.isVisible=false;
        this.view.segAccounts.isVisible=true;
      }
      else
      {
        this.view.segAccounts.isVisible=false;
        this.view.flxNoAccounts.isVisible=true;
        this.view.lblNoAccounts.isVisible=true;
      }
    }
    else
    {
      if( typeof(segmentData) === "undefined" || this.segmentData.length)
      {
        this.view.segAccounts.setData(this.segmentInitialData);
        this.view.flxNoAccounts.isVisible=false;
        this.view.segAccounts.isVisible=true;
      }
      else
      {
        this.view.flxNoAccounts.isVisible=true;
        this.view.lblNoAccounts.isVisible=true;
        this.view.segAccounts.isVisible=false;
      }
    }
  },
  getSegmntsearchData:function(field,searchText,data)
  {
    var searchdata=[];
    for (var i = 0; i < data.length; i++) {
      var segRecord=data[i][1];
      for(var j=0; j<segRecord.length;j++){
        if(segRecord[j][field]!==undefined&&segRecord[j][field].toLowerCase().indexOf(searchText)>=0)
        {
          searchdata.push(segRecord[j]);
        }
      }
    }
    return searchdata;
  },
  
  
  sectionClicked :function(context, sectionIndex){
      var sectionHeaderIndex = sectionIndex.sectionIndex;
      var data = this.view.segAccounts.data;
      var selectedHeaderData = data[sectionHeaderIndex][0];  
      if(selectedHeaderData["imgExpand"].src==="arrowdown.png"){
        selectedHeaderData["imgExpand"].src="arrowup.png";
        data[sectionHeaderIndex][1] = [];
        this.view.segAccounts.setData(data);
      }else{
        selectedHeaderData["imgExpand"].src="arrowdown.png";
        data[sectionHeaderIndex][1] = this.segmentInitialData[sectionHeaderIndex][1];
        this.view.segAccounts.setData(data);
      }
    }
});