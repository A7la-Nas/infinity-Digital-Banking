define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController"], function(AsyncManager) {
  function CheckDeposit_PresentationController() {
    scope_CheckDepositPresentationController = this;
    scope_CheckDepositPresentationController.accountID="";
    this.logger = applicationManager.getLoggerManager();
    this.navManager = applicationManager.getNavigationManager();
    this.transactionManager = applicationManager.getTransactionsListManager();
    this.asyncManager = new AsyncManager();
    this.preferredDepositToaccountData = {};
     /**   numberOfAsyncForDeposits
          *  1.getPendingDeposits
          *  2.getPostedDeposits
            */
    scope_CheckDepositPresentationController.numberOfAsyncForDeposits=2;
    kony.mvc.Presentation.BasePresenter.call(this);
  }
  inheritsFrom(CheckDeposit_PresentationController, kony.mvc.Presentation.BasePresenter);
  CheckDeposit_PresentationController.prototype.initializePresentationController = function() {
  };
  CheckDeposit_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
	  var formNameCust = "CheckDepositUIModule/" + formName;
    scope_CheckDepositPresentationController.navManager.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : formNameCust});
  };
  CheckDeposit_PresentationController.prototype.fetchDeposits = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    scope_CheckDepositPresentationController.asyncManager.initiateAsyncProcess(scope_CheckDepositPresentationController.numberOfAsyncForDeposits);
    scope_CheckDepositPresentationController.fetchPendingDeposits();
    scope_CheckDepositPresentationController.fetchPostedDeposits();
  };
  CheckDeposit_PresentationController.prototype.fetchPendingDeposits = function() {
    scope_CheckDepositPresentationController.transactionManager.getPendingDeposits(scope_CheckDepositPresentationController.fetchPendingDepositsPresentationSuccessCallback,scope_CheckDepositPresentationController.fetchPendingDepositsPresentationErrorCallback);
  };
  CheckDeposit_PresentationController.prototype.fetchPendingDepositsPresentationSuccessCallback = function(successResponse) {
    scope_CheckDepositPresentationController.asyncManager.setSuccessStatus(0, successResponse);
    if (scope_CheckDepositPresentationController.asyncManager.isServiceCompleted(1))
    {
      var depositsData = [];
      var pendingDepositsData = successResponse;
      var postedDepositsData = [];
      if(scope_CheckDepositPresentationController.asyncManager.isServiceSuccess(1)) {
        postedDepositsData = scope_CheckDepositPresentationController.asyncManager.getData(1);
      }
      depositsData =   scope_CheckDepositPresentationController.getDepositData(pendingDepositsData,postedDepositsData);
      var data = scope_CheckDepositPresentationController.navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmCheckDeposit"});
      if(!data)
        data  = {"depositsData":depositsData};
      else
        data.depositsData = depositsData;
      scope_CheckDepositPresentationController.navManager.setCustomInfo("frmCheckDeposit",data);
      scope_CheckDepositPresentationController.commonFunctionForNavigation("frmCheckDeposit");
    }
  };
  CheckDeposit_PresentationController.prototype.fetchPendingDepositsPresentationErrorCallback = function(errorResponse) {
    if(errorResponse.isServerUnreachable) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    }
    else {
    	scope_CheckDepositPresentationController.asyncManager.setErrorStatus(0, errorResponse);
    	if (scope_CheckDepositPresentationController.asyncManager.isServiceCompleted(1)) {
      		var depositsData = [];
      		if(scope_CheckDepositPresentationController.asyncManager.isServiceSuccess(1)){
        		var postedDepositsData = scope_CheckDepositPresentationController.asyncManager.getData(1);
        		depositsData = scope_CheckDepositPresentationController.getDepositData([],postedDepositsData);
      		}
      		var data = scope_CheckDepositPresentationController.navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmCheckDeposit"});
      		if(!data)
        		data  = {"depositsData":depositsData};
      		else
        		data.depositsData = depositsData;
		scope_CheckDepositPresentationController.navManager.setCustomInfo("frmCheckDeposit",data);
          scope_CheckDepositPresentationController.commonFunctionForNavigation("frmCheckDeposit");
          applicationManager.getPresentationUtility().dismissLoadingScreen();
    	}
    }
  };
  CheckDeposit_PresentationController.prototype.fetchPostedDeposits = function() {
    scope_CheckDepositPresentationController.transactionManager.getPostedDeposits(scope_CheckDepositPresentationController.fetchPostedDepositsPresentationSuccessCallback,scope_CheckDepositPresentationController.fetchPostedDepositsPresentationErrorCallback);
  };
  CheckDeposit_PresentationController.prototype.fetchPostedDepositsPresentationSuccessCallback = function(successResponse) {
    scope_CheckDepositPresentationController.asyncManager.setSuccessStatus(1, successResponse);
    if (scope_CheckDepositPresentationController.asyncManager.isServiceCompleted(0))
    {
      var depositsData = [];
      var pendingDepositsData = [];
      var postedDepositsData = successResponse;
      if(scope_CheckDepositPresentationController.asyncManager.isServiceSuccess(0)) {
        pendingDepositsData = scope_CheckDepositPresentationController.asyncManager.getData(0);
      }
      depositsData =   scope_CheckDepositPresentationController.getDepositData(pendingDepositsData,postedDepositsData);
      var data = scope_CheckDepositPresentationController.navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmCheckDeposit"});
      if(!data)
        data  = {"depositsData":depositsData};
      else
        data.depositsData = depositsData;
	scope_CheckDepositPresentationController.navManager.setCustomInfo("frmCheckDeposit",data);
      scope_CheckDepositPresentationController.commonFunctionForNavigation("frmCheckDeposit");
    }
  };
  CheckDeposit_PresentationController.prototype.fetchPostedDepositsPresentationErrorCallback = function(errorResponse) {
    if(errorResponse.isServerUnreachable) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    }
    else {
    	scope_CheckDepositPresentationController.asyncManager.setErrorStatus(1, errorResponse);
    	if (scope_CheckDepositPresentationController.asyncManager.isServiceCompleted(0)) {
      		var depositsData = [];
      		if(scope_CheckDepositPresentationController.asyncManager.isServiceSuccess(0)) {
        		var pendingDepositsData = scope_CheckDepositPresentationController.asyncManager.getData(0);
        		depositsData = scope_CheckDepositPresentationController.getDepositData(pendingDepositsData,[]);
      		}
      		var data = scope_CheckDepositPresentationController.navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmCheckDeposit"});
      		if(!data)
        		data  = {"depositsData":depositsData};
      		else
        		data.depositsData = depositsData;
      		scope_CheckDepositPresentationController.navManager.setCustomInfo("frmCheckDeposit",data);
          scope_CheckDepositPresentationController.commonFunctionForNavigation("frmCheckDeposit");
          applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    }
  };
  CheckDeposit_PresentationController.prototype.getDepositData = function(pendingDepositsData,postedDepositsData){
    var depositsData = {};
    pendingDepositsData = scope_CheckDepositPresentationController.processDeposits(pendingDepositsData.records);
    postedDepositsData = scope_CheckDepositPresentationController.processDeposits(postedDepositsData.records);
   // depositsData.push(pendingDepositsData);
    depositsData.pendingDepositsData=pendingDepositsData;
   // depositsData.push(postedDepositsData);
     depositsData.postedDepositsData=postedDepositsData;
    return depositsData;
  };
  CheckDeposit_PresentationController.prototype.processDeposits = function(depositData){
    if(depositData && depositData !== "[]" && depositData.length!==0){
      var formatUtilManager=applicationManager.getFormatUtilManager();
      for(var i=0;i<depositData.length;i++){
        var dateTimeObj = formatUtilManager.getDateObjectfromString( depositData[i].transactionDate, "YYYY-MM-DDTHH:MM:SS");
        var dateTimeString = formatUtilManager.getFormatedDateString(dateTimeObj, formatUtilManager.getApplicationDateFormat());
        depositData[i].transactionDate = dateTimeString;
        depositData[i].amount= formatUtilManager.formatAmountandAppendCurrencySymbol(depositData[i].amount,depositData[i].transactionCurrency);
      }
    } else {
      depositData = [];
    }
    return depositData;
  };
  CheckDeposit_PresentationController.prototype.goToDepositDetails = function(selectedDepositData){
    selectedDepositData.scheduledDate = selectedDepositData.transactionDate;
    scope_CheckDepositPresentationController.navManager.setCustomInfo("frmCheckDepositTransactionDetails",selectedDepositData);
    scope_CheckDepositPresentationController.navManager.setEntryPoint("frmCheckDepositTransactionDetails","Deposits");
    scope_CheckDepositPresentationController.commonFunctionForNavigation("frmCheckDepositTransactionDetails");
  };
 CheckDeposit_PresentationController.prototype.setNotesToDepositObject = function(notes) {
   scope_CheckDepositPresentationController.transactionManager.setTransactionAttribute("transactionsNotes",notes);
 };
  CheckDeposit_PresentationController.prototype.createDeposit = function(notes) {
    var depositObj = scope_CheckDepositPresentationController.transactionManager.getTransactionObject();
     var requestdata={};
      for (var prop in depositObj) { 
                if (depositObj[prop] !== null) { 
                    requestdata[prop]=depositObj[prop];
                } 
            }
    scope_CheckDepositPresentationController.transactionManager.createRDC(requestdata,scope_CheckDepositPresentationController.createDepositPresentationSuccessCallback,scope_CheckDepositPresentationController.createDepositPresentationErrorCallback);
  };
   CheckDeposit_PresentationController.prototype.createDepositPresentationSuccessCallback = function(successResponse) {
    var formName = scope_CheckDepositPresentationController.navManager.getEntryPoint("Deposit");
    if(formName==="frmAccountDetails")
    {
      var data1 = {};
      data1.type="success";
      data1.typeOfTransaction="create";
      data1.res = successResponse;
      scope_CheckDepositPresentationController.navManager.setCustomInfo("frmAccountDetails",data1);
      var accountsManager=applicationManager.getAccountManager();
         if(applicationManager.getConfigurationManager().isAccountDetailsServiceConfigured)
        {
           var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "ArrangementsMA"});
        accountMod.presentationController.fetchAccountDetailsAndTransactions(scope_CheckDepositPresentationController.transactionManager.getTransactionObject().toAccountNumber);
        }
      else
      accountsManager.fetchInternalAccounts(scope_CheckDepositPresentationController.fetchAccountsSuccCallBack,scope_CheckDepositPresentationController.fetchAccountsErrCallBack);
    }
    else
    {
      var referenceId = successResponse.referenceId;
      var data = scope_CheckDepositPresentationController.navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmCheckDeposit"});
      if(!data)
      {
        data = {};
      }
      data.refId = referenceId;
      data.transactionSuccess = true;
      scope_CheckDepositPresentationController.navManager.setCustomInfo("frmCheckDeposit", data);
      scope_CheckDepositPresentationController.fetchDeposits();
    }
  };
    CheckDeposit_PresentationController.prototype.fetchAccountTransactions = function(){
       var toAccountNumber = scope_CheckDepositPresentationController.transactionManager.getTransactionObject().toAccountNumber;
      scope_CheckDepositPresentationController.transactionManager.clearTransferObject();
       var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "ArrangementsMA"});
      accountMod.presentationController.fetchAccountTransactions(toAccountNumber);
   };
    CheckDeposit_PresentationController.prototype.fetchAccountsSuccCallBack = function(res){    
      var navMan=applicationManager.getNavigationManager();
      var internalAccounts = res.filter(function (el) {if(el.externalIndicator !== "true") return el});
      var customData = {
        "fromaccounts": internalAccounts
      }
      navMan.setCustomInfo("frmCheckDepositTo", customData);
      scope_CheckDepositPresentationController.fetchAccountTransactions();            
    };
    CheckDeposit_PresentationController.prototype.fetchAccountsErrCallBack = function(err){
      kony.print(err);
    };
  CheckDeposit_PresentationController.prototype.createDepositPresentationErrorCallback = function(errorResponse) {
    var formName = scope_CheckDepositPresentationController.navManager.getEntryPoint("Deposit");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(errorResponse.isServerUnreachable) {
    	applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    }
    else {
      scope_CheckDepositPresentationController.logger.log("####Error in creating deposit"+ errorResponse);
      if(formName==="frmAccountDetails")
      {
        var toAccountNumber = scope_CheckDepositPresentationController.transactionManager.getTransactionObject().toAccountNumber;
        var data1 = {};
        data1.type="error";
        data1.typeOfTransaction="create";
        scope_CheckDepositPresentationController.navManager.setCustomInfo("frmAccountDetails",data1);
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "ArrangementsMA"});
           if(applicationManager.getConfigurationManager().isAccountDetailsServiceConfigured)
        {
           var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "ArrangementsMA"});
        accountMod.presentationController.fetchAccountDetailsAndTransactions(scope_CheckDepositPresentationController.transactionManager.getTransactionObject().toAccountNumber);
        }
      else
        accountMod.presentationController.fetchAccountTransactions(toAccountNumber);
      }
      else
      {
        var data = scope_CheckDepositPresentationController.navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmCheckDeposit"});
        if(!data)
        {
          data = {};
        }
        data.transactionError = true;
        data.transactionErrorMsg = errorResponse.errorMessage;
        scope_CheckDepositPresentationController.navManager.setCustomInfo("frmCheckDeposit", data);
        scope_CheckDepositPresentationController.fetchDeposits();
      }
      scope_CheckDepositPresentationController.transactionManager.clearTransferObject();
    }
  };
  CheckDeposit_PresentationController.prototype.cancelDeposit = function(){
     scope_CheckDepositPresentationController.transactionManager.clearTransferObject();
     var formName = scope_CheckDepositPresentationController.navManager.getEntryPoint("Deposit");
     if(formName==="frmCheckDeposit")
      {
       scope_CheckDepositPresentationController.commonFunctionForNavigation("frmCheckDeposit");
      }
     else if (formName==="frmAccountDetails")
       {
         scope_CheckDepositPresentationController.commonFunctionForNavigation("frmAccountDetails");
       }
     else
      {
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "ArrangementsMA"});
        accountMod.presentationController.showDashboard();
      }
  };
  CheckDeposit_PresentationController.prototype.navigateFromAccountDetails = function(accountData){
	var data = scope_CheckDepositPresentationController.navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmDepositAmountCD"});
    if(!data) {
        data = {};
    }
    data.isNewCheckDeposit = true;
    scope_CheckDepositPresentationController.navManager.setCustomInfo("frmDepositAmountCD",data);
    scope_CheckDepositPresentationController.transactionManager.clearTransferObject();
    var depositAccountData = scope_CheckDepositPresentationController.processToAccount(accountData);
    scope_CheckDepositPresentationController.setSelectedAccountData(depositAccountData);
  };
  CheckDeposit_PresentationController.prototype.processToAccount = function(depositToAccountData){
      depositToAccountData.lblAccountName = depositToAccountData.accountName;
      depositToAccountData.lblBankName = depositToAccountData.bankName;
      var formatUtility=applicationManager.getFormatUtilManager();
      var availBal = formatUtility.formatAmountandAppendCurrencySymbol(depositToAccountData.availableBalance,depositToAccountData.currencyCode);
      depositToAccountData.lblAccountBalValue = availBal;
      depositToAccountData.lblAccountNumber = depositToAccountData.accountID;
      depositToAccountData.AvailableBalStaticLabel = "Available Balance";
      depositToAccountData.imgBank = {
        "src": "konybanklogo.png"
      };
      depositToAccountData.imgWarn = {
                           "src": ""
                       };
    return depositToAccountData;
  };
  CheckDeposit_PresentationController.prototype.processToAccounts = function(depositToAccountsData){
    for(var i = 0; i<depositToAccountsData.length; i++){
      depositToAccountsData[i].lblAccountName = depositToAccountsData[i].accountName;
      depositToAccountsData[i].lblBankName = depositToAccountsData[i].bankName;
      var formatUtility=applicationManager.getFormatUtilManager();
      var availBal = formatUtility.formatAmountandAppendCurrencySymbol(depositToAccountsData[i].availableBalance,depositToAccountsData[i].currencyCode);
      depositToAccountsData[i].lblAccountBalValue = availBal;
      depositToAccountsData[i].lblAccountNumber = "..." + (depositToAccountsData[i].accountID).substr((depositToAccountsData[i].accountID).length - 4);
      depositToAccountsData[i].AvailableBalStaticLabel = "Available Balance";
      depositToAccountsData[i].imgBank = {
        "src": "konybanklogo.png"
      };
     depositToAccountsData[i].imgWarn = {
        "src": ""
      };
    }
    return depositToAccountsData;
  };
  CheckDeposit_PresentationController.prototype.processToAccountsCombinedAccess = function(depositToAccountsData){
    
    
    for(var i = 0; i<depositToAccountsData.length; i++){
      depositToAccountsData[i].template = "flxCombinedAccounts";
      depositToAccountsData[i].lblAccountName = depositToAccountsData[i].accountName;
      //depositToAccountsData[i].lblBankName = depositToAccountsData[i].bankName;
      var formatUtility=applicationManager.getFormatUtilManager();
      var availBal = formatUtility.formatAmountandAppendCurrencySymbol(depositToAccountsData[i].availableBalance,depositToAccountsData[i].currencyCode);
      depositToAccountsData[i].lblAccountBalValue = availBal;
      depositToAccountsData[i].lblAccountNumber = "..." + (depositToAccountsData[i].accountID).substr((depositToAccountsData[i].accountID).length - 4);
      depositToAccountsData[i].AvailableBalStaticLabel = "Available Balance";
      depositToAccountsData[i].imgAccountType = {
        "src": depositToAccountsData[i].isBusinessAccount ==="true" ? "businessaccount.png" :"personalaccount.png"
      };
      depositToAccountsData[i].flximgBank = {
        "isVisible": false
      };
      depositToAccountsData[i].lblBankName = {"text" : depositToAccountsData[i].accountType};
     /* depositToAccountsData[i].imgWarn = {
        "src": ""
      };*/
    }

    var filterBusinessAcc = depositToAccountsData.filter(function(el){
      return el.isBusinessAccount == "true";
    });
    var filterPersonalAcc = depositToAccountsData.filter(function(el){
      return el.isBusinessAccount == "false";
    });
    
    var segData = [];
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
        ],[
          {
            "template" : "flxTransHeader",
            "lblHeader" : {"text" : "Business Accounts ("+ filterBusinessAcc.length +")"},
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
          filterBusinessAcc
        ]);

    return segData;
  };
  CheckDeposit_PresentationController.prototype.navigateTofrmCheckDepositTo = function() {
    var accountManager = applicationManager.getAccountManager();
    var depositToAccounts = accountManager.getDepositSupportedAccounts();
    var configurationManager = applicationManager.getConfigurationManager();
    var segData = [];
    if( configurationManager.isCombinedUser === "true"){
      segData = scope_CheckDepositPresentationController.processToAccountsCombinedAccess(depositToAccounts);
    }
    else {
      segData = scope_CheckDepositPresentationController.processToAccounts(depositToAccounts);
    }
    scope_CheckDepositPresentationController.navManager.setCustomInfo("frmCheckDepositTo", segData);
    scope_CheckDepositPresentationController.commonFunctionForNavigation("frmCheckDepositTo");
  };
  
  CheckDeposit_PresentationController.prototype.getToAccounts = function(isChange) {
    var accountManager = applicationManager.getAccountManager();
    if(isChange)
      accountManager.fetchInternalAccounts(scope_CheckDepositPresentationController.navigateTofrmCheckDepositTo,scope_CheckDepositPresentationController.getToAccountsPresentationErrorCallback);
    else
      accountManager.fetchInternalAccounts(scope_CheckDepositPresentationController.getToAccountsPresentationSuccessCallback,scope_CheckDepositPresentationController.getToAccountsPresentationErrorCallback);
  };
  CheckDeposit_PresentationController.prototype.getToAccountsPresentationSuccessCallback = function(successResponse) {
    var accountManager = applicationManager.getAccountManager();
    var preferredDepositToaccountData = accountManager.getDepositPreferredAccount();
    if(preferredDepositToaccountData === "" || preferredDepositToaccountData === null || preferredDepositToaccountData ===undefined ){
      scope_CheckDepositPresentationController.navigateTofrmCheckDepositTo();
    }
    else{
      var preferredAccountData = scope_CheckDepositPresentationController.processToAccount(preferredDepositToaccountData);
      scope_CheckDepositPresentationController.setSelectedAccountData(preferredAccountData);
    }
  };
  CheckDeposit_PresentationController.prototype.getToAccountsPresentationErrorCallback = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(errorResponse.isServerUnreachable) {
    	applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    }
    else {
      scope_CheckDepositPresentationController.logger.log("####Error in fetching deposits"+ errorResponse);
    }
    //generic error callback
  };
  CheckDeposit_PresentationController.prototype.captureCheckImage = function(base64Str, orientation) {
    if(orientation === "front"){
      scope_CheckDepositPresentationController.transactionManager.setTransactionAttribute("checkImage",base64Str);
    }
    else{
      scope_CheckDepositPresentationController.transactionManager.setTransactionAttribute("checkImageBack",base64Str);
    }
    var controller = applicationManager.getPresentationUtility().getController('frmUploadCheckImages', true);
    controller.afterImageCapture(orientation);
  };
  CheckDeposit_PresentationController.prototype.navigateToConfirmTransfer = function(){
    var data = [];
    var formatUtility=applicationManager.getFormatUtilManager();
    var amount = scope_CheckDepositPresentationController.transactionManager.getTransactionObject().amount;
    data.amount = formatUtility.formatAmountandAppendCurrencySymbol(amount,scope_CheckDepositPresentationController.transactionManager.getTransactionObject().transactionCurrency);
    data.toAccountName = scope_CheckDepositPresentationController.transactionManager.getTransactionObject().toAccountName;
    data.toAccountNumber = scope_CheckDepositPresentationController.transactionManager.getTransactionObject().accountID;
    data.toBankName = scope_CheckDepositPresentationController.transactionManager.getTransactionObject().bankName;
    data.checkImage = scope_CheckDepositPresentationController.transactionManager.getTransactionObject().checkImage;
    data.checkImageBack = scope_CheckDepositPresentationController.transactionManager.getTransactionObject().checkImageBack;
    scope_CheckDepositPresentationController.navManager.setCustomInfo("frmConfirmTransferCD", data);
    scope_CheckDepositPresentationController.commonFunctionForNavigation("frmConfirmTransferCD");
  };
  CheckDeposit_PresentationController.prototype.setSelectedAccountData = function(selectedToAccountData){
    var data = scope_CheckDepositPresentationController.navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmDepositAmountCD"});
    if(!data) {
      data = {};
    }
    data.accountInfo = selectedToAccountData;
    scope_CheckDepositPresentationController.navManager.setCustomInfo("frmDepositAmountCD", data);
    //scope_CheckDepositPresentationController.commonFunctionForNavigation("frmDepositAmountCD");
    var navManager = applicationManager.getNavigationManager();
    var flxData = navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmDepositAmountCD"});
    scope_CheckDepositPresentationController.accountID=flxData.accountInfo.accountID;
    debugger;
    // temporary disable this limits set
    //scope_CheckDepositPresentationController.getCheckDepositTransactionalLimits();
    scope_CheckDepositPresentationController.commonFunctionForNavigation("frmDepositAmountCD");
  };
  CheckDeposit_PresentationController.prototype.setDepositDetails = function(frmData){
    scope_CheckDepositPresentationController.transactionManager.setTransactionAttribute("toAccountNumber",frmData.toAccountNumber);
    scope_CheckDepositPresentationController.transactionManager.setTransactionAttribute("bankName",frmData.bankName);
    scope_CheckDepositPresentationController.transactionManager.setTransactionAttribute("toAccountName",frmData.toAccountName);
    scope_CheckDepositPresentationController.transactionManager.setTransactionAttribute("amount",frmData.amount);
    scope_CheckDepositPresentationController.transactionManager.setTransactionAttribute("transactionCurrency",frmData.currency);
     scope_CheckDepositPresentationController.transactionManager.setTransactionAttribute("fromAccountCurrency",frmData.currency);
    scope_CheckDepositPresentationController.transactionManager.setTransactionAttribute("transactionType","Deposit");
    scope_CheckDepositPresentationController.commonFunctionForNavigation("frmUploadCheckImages");
  };
  CheckDeposit_PresentationController.prototype.getDepositObjInView = function(){
    var depositObj = JSON.parse(JSON.stringify(scope_CheckDepositPresentationController.transactionManager.getTransactionObject()));
    return depositObj;
  };
  CheckDeposit_PresentationController.prototype.navigationFromNewCheckDeposit = function() {
    var data = scope_CheckDepositPresentationController.navManager.getCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmDepositAmountCD"});
    if(!data) {
        data = {};
    }
    data.isNewCheckDeposit = true;
    scope_CheckDepositPresentationController.transactionManager.clearTransferObject();
    scope_CheckDepositPresentationController.navManager.setEntryPoint("Deposit","frmCheckDeposit");
    scope_CheckDepositPresentationController.navManager.setCustomInfo({"appName" : "ArrangementsMA", "friendlyName" : "CheckDepositUIModule/frmDepositAmountCD"},data);
    scope_CheckDepositPresentationController.commonFunctionForNavigation("frmDepositToCD");
  };
    CheckDeposit_PresentationController.prototype.getCheckDepositTransactionalLimits = function()
  {
    applicationManager.getConfigurationManager().fetchLimitsForAnAction("RDC",scope_CheckDepositPresentationController.getCheckDepositTransactionalLimitsSuccessCallback,scope_CheckDepositPresentationController.getCheckDepositTransactionalLimitsErrorCallback);
  };
  CheckDeposit_PresentationController.prototype.getCheckDepositTransactionalLimitsSuccessCallback = function(response) {
       if(scope_CheckDepositPresentationController.accountID)
         {
        for (var i = 0; i < response["accounts"].length; i++) {
            if (response["accounts"][i].accountId === scope_CheckDepositPresentationController.accountID) {
                applicationManager.getConfigurationManager().setConfigurationValue('minRDCLimit', response["accounts"][i]["limits"]["MIN_TRANSACTION_LIMIT"]);
                applicationManager.getConfigurationManager().setConfigurationValue('maxRDCLimit', response["accounts"][i]["limits"]["MAX_TRANSACTION_LIMIT"]);
            }
        }
         }
        scope_CheckDepositPresentationController.accountID="";
        scope_CheckDepositPresentationController.commonFunctionForNavigation("frmDepositAmountCD");
    };
  CheckDeposit_PresentationController.prototype.getCheckDepositTransactionalLimitsErrorCallback=function(error)
  {
    scope_CheckDepositPresentationController.commonFunctionForNavigation("frmDepositAmountCD");
    kony.print("error in getCheckDepositTransactionalLimits");
  };
  return CheckDeposit_PresentationController;
});