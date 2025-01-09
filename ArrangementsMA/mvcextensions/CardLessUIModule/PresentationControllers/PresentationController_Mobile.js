define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController"], function(AsyncManager) {
  function CardLess_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    scope_cardlessPresentationController = this;
    this.asyncManager = new AsyncManager();
    this.deletedTransactionFlag=false;
    this.deletedTransactionErrorFlag=false;
    this.deletedTransactionErrorMessage="";
    scope_cardlessPresentationController.fromBankName="";
    scope_cardlessPresentationController.contactPickerObject=null;
    scope_cardlessPresentationController.cardlessTransactionId="";
    scope_cardlessPresentationController.cashlessContactType="";
    scope_cardlessPresentationController.cashlessFirstName="";
    scope_cardlessPresentationController.cashlessLastName="";
    scope_cardlessPresentationController.transactionId="";
    scope_cardlessPresentationController.qrSuccessFlag="";
    /**   numberOfAsyncForCWTransactions
          *  1.getPendingCardlessTransactions
          *  2.getPostedCardlessTransactions
            */
    scope_cardlessPresentationController.numberOfAsyncForCWTransactions=2;
    /**   numberOfAsyncForCWQRTransactions
          *  1.getPendingCardlessTransactions
          *  2.getPostedCardlessTransactions
            */
    scope_cardlessPresentationController.numberOfAsyncForCWQRTransactions=2;
  }
  inheritsFrom(CardLess_PresentationController, kony.mvc.Presentation.BasePresenter);
  CardLess_PresentationController.prototype.initializePresentationController = function() {
  };
  CardLess_PresentationController.prototype.clearBuilderNonGeneratedAttributes = function() {
    scope_cardlessPresentationController.fromBankName="";
    scope_cardlessPresentationController.cardlessTransactionId="";
    scope_cardlessPresentationController.cashlessContactType="";
    scope_cardlessPresentationController.cashlessFirstName="";
    scope_cardlessPresentationController.cashlessLastName="";
  };
  CardLess_PresentationController.prototype.setFromBankName=function(fromBankName)
  {
    scope_cardlessPresentationController.fromBankName=fromBankName;
  };
  CardLess_PresentationController.prototype.getFromBankName=function()
  {
    return scope_cardlessPresentationController.fromBankName;
  };
  CardLess_PresentationController.prototype.setcardlessTransactionId=function(id){
    scope_cardlessPresentationController.cardlessTransactionId=id;
  };
  CardLess_PresentationController.prototype.getCardlessTransactionId=function(){
    return scope_cardlessPresentationController.cardlessTransactionId;
  };
  CardLess_PresentationController.prototype.setCashlessContactType=function(contactType){
    scope_cardlessPresentationController.cashlessContactType=contactType;
  };
  CardLess_PresentationController.prototype.getCashlessContactType=function(){
    return scope_cardlessPresentationController.cashlessContactType;
  };
  CardLess_PresentationController.prototype.setCashlessFirstName=function(firstName){
    scope_cardlessPresentationController.cashlessFirstName=firstName;
  };
  CardLess_PresentationController.prototype.getCashlessFirstName=function(){
    return scope_cardlessPresentationController.cashlessFirstName;
  };
  CardLess_PresentationController.prototype.setCashlessLastName=function(lastName){
    scope_cardlessPresentationController.cashlessLastName=lastName;
  };
  CardLess_PresentationController.prototype.getCashlessLastName=function(){
    return scope_cardlessPresentationController.cashlessLastName;
  };
  CardLess_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
    var formNameCust = "CardLessUIModule/" + formName;
    navManager.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : formNameCust});
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  CardLess_PresentationController.prototype.fetchAccountsSuccCallBack = function(res){
    var navMan=applicationManager.getNavigationManager();
    var internalAccounts = res.filter(function (el) {if(el.externalIndicator !== "true") return el});
    var customData = {
      "fromaccounts": internalAccounts
    }
    navMan.setCustomInfo("frmCardLessFrom", customData);
    scope_cardlessPresentationController.goToAmountForm();
  };
  CardLess_PresentationController.prototype.fetchAccountsErrCallBack = function(error){
    kony.print("error in fetching accounts");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(error["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
  };
  CardLess_PresentationController.prototype.showFromAccounts=function()
  {
    var accMan=applicationManager.getAccountManager();
    accMan.fetchInternalAccounts(scope_cardlessPresentationController.showFromAccountsPresentationSuccessCallBack,scope_cardlessPresentationController.showFromAccountsPresentationErrorCallBack);
  };
  CardLess_PresentationController.prototype.showFromAccountsPresentationSuccessCallBack=function(res)
  {
    var accNav=applicationManager.getAccountManager();
    var frmacc=accNav.getCardLessWithdrawlSupportedAccounts();
    var navMan=applicationManager.getNavigationManager();
    var customData = {
      "fromaccounts":frmacc
    }
    navMan.setCustomInfo("frmCardLessFrom",customData);
    navMan.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "frmCardLessFrom"});
  };
  CardLess_PresentationController.prototype.showFromAccountsPresentationErrorCallBack=function(error)
  {
    kony.print("error in showFromAccountsPresentationErrorCallBack");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(error["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
  };
  CardLess_PresentationController.prototype.navigateToNewCashWithDrawForm = function(data)
  {
    var accountsManager=applicationManager.getAccountManager();
    accountsManager.fetchInternalAccounts(scope_cardlessPresentationController.fetchAccountsSuccCallBack,scope_cardlessPresentationController.fetchAccountsErrCallBack);
  };
  CardLess_PresentationController.prototype.navigateToCashRecipientForm = function(accountDateails)
  {
    var transactionObject = applicationManager.getTransactionsListManager();
    transactionObject.setTransactionAttribute("fromAccountName",accountDateails.accountName);
    transactionObject.setTransactionAttribute("fromAccountNumber",accountDateails.accountID);
    transactionObject.setTransactionAttribute("fromAccountBalance",accountDateails.availableBalance);
    transactionObject.setTransactionAttribute("fromAccountType",accountDateails.accountType);
    transactionObject.setTransactionAttribute("fromCurrencyCode", accountDateails.currencyCode);
    transactionObject.setTransactionAttribute("fromAccountNickName", accountDateails.nickName);
    var configManager = applicationManager.getConfigurationManager();
    var bankName = configManager.getBankName();
    scope_cardlessPresentationController.setFromBankName(bankName);
    var navMan=applicationManager.getNavigationManager();
    navMan.setEntryPoint("cardlessEntry","frmAccountDetails");
    scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessCashRec");
  };
  CardLess_PresentationController.prototype.navigateToQRCashWithdrawForm = function(accountDateails)
  {
    var transactionObject = applicationManager.getTransactionsListManager();
    transactionObject.setTransactionAttribute("fromAccountName",accountDateails.accountName);
    transactionObject.setTransactionAttribute("fromAccountNumber",accountDateails.accountID);
    transactionObject.setTransactionAttribute("fromAccountBalance",accountDateails.availableBalance);
    transactionObject.setTransactionAttribute("fromAccountType",accountDateails.accountType);
    transactionObject.setTransactionAttribute("fromAccountNickName", accountDateails.nickName);
    var configManager = applicationManager.getConfigurationManager();
    var bankName = configManager.getBankName();
    scope_cardlessPresentationController.setFromBankName(bankName);
    var navMan=applicationManager.getNavigationManager();
    navMan.setEntryPoint("cardlessEntry","frmAccountDetails");
    scope_cardlessPresentationController.navigateToNewCashWithDrawQRForm();
  };
  CardLess_PresentationController.prototype.goToAmountForm = function() {
    var transactionObject = applicationManager.getTransactionsListManager();
    var navMan = applicationManager.getNavigationManager();
    var txnModel = scope_cardlessPresentationController.getTransactionObject();
    var accId = txnModel.fromAccountNumber;
    var accMan = applicationManager.getAccountManager();
    var preAccData = accMan.getCardlessPreferredAccount();
    if (accId !== null && accId !== "" && accId !== undefined) {
      var txnDetails = transactionObject.getTransactionObject();
      txnDetails = scope_cardlessPresentationController.processAccountsData(txnDetails);
      navMan.setCustomInfo("frmCardLessWithdraw", txnDetails);
      navMan.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCardLessWithdraw"});
    } else if (preAccData === "" || preAccData === undefined || preAccData === null) {
      scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessFrom");
    } else {
      transactionObject.setTransactionAttribute("fromAccountName", preAccData.accountName);
      transactionObject.setTransactionAttribute("fromAccountNumber", preAccData.accountID);
      transactionObject.setTransactionAttribute("fromAccountBalance", preAccData.availableBalance);
      transactionObject.setTransactionAttribute("fromAccountType", preAccData.accountType);
      transactionObject.setTransactionAttribute("fromAccountNickName", preAccData.nickName);
      transactionObject.setTransactionAttribute("fromCurrencyCode", preAccData.currencyCode);
      transactionObject.setTransactionAttribute("transactionCurrency", preAccData.currencyCode);
      var configManager = applicationManager.getConfigurationManager();
      var bankName = configManager.getBankName();
      scope_cardlessPresentationController.setFromBankName(bankName);
      var txnDetails = transactionObject.getTransactionObject();
      txnDetails = scope_cardlessPresentationController.processAccountsData(txnDetails);
      navMan.setCustomInfo("frmCardLessWithdraw", txnDetails);
      navMan.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCardLessWithdraw"});
    }
  };
  CardLess_PresentationController.prototype.getcashlessMode=function()
  {
    var transactionObj=scope_cardlessPresentationController.getTransactionObject();
    var selectedMode = transactionObj.cashlessMode;
    return selectedMode;
  }
  CardLess_PresentationController.prototype.setCashLessMode=function(mode)
  {
    var transactionObj = applicationManager.getTransactionsListManager();
    transactionObj.setTransactionAttribute("cashlessMode",mode);
    var navManager = applicationManager.getNavigationManager();
    if(mode==="Self")
    {
      scope_cardlessPresentationController.navigateToNewCashWithDrawForm();
    }
    else if(mode==="others")
    {
      navManager.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCardLessContactType"});
    }
  };
  CardLess_PresentationController.prototype.setCardlessContactType=function(contactType)
  {
    scope_cardlessPresentationController.setCashlessContactType(contactType);
    var navManager = applicationManager.getNavigationManager();
    if(contactType==="phone")
    {
      navManager.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCardLessPhoneNo"});
    }
    else if(contactType==="email")
    {
      navManager.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCardLessEmail"});
    }
  };
  CardLess_PresentationController.prototype.setCardlessPhoneNumber=function(data,formName)
  {
    var transactionObj = applicationManager.getTransactionsListManager();
    if(data.contact)
    {
      transactionObj.setTransactionAttribute("cashlessPhone",data.contact);
      scope_cardlessPresentationController.setCashlessFirstName(data.firstName);
      if(data.lastName)
        scope_cardlessPresentationController.setCashlessLastName(data.lastName);
      else
        scope_cardlessPresentationController.setCashlessLastName("");
    }
    else
      transactionObj.setTransactionAttribute("cashlessPhone",data);
    transactionObj.setTransactionAttribute("cashlessEmail","");
    var navManager = applicationManager.getNavigationManager();
    var formNameCust = "CardLessUIModule/" + formName;
    navManager.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : formNameCust});
  };
  CardLess_PresentationController.prototype.setCardlessEmail=function(data,formName)
  {
    var formNameCust = "CardLessUIModule/" + formName;
    var transactionObj = applicationManager.getTransactionsListManager();
    if(data.contact)
    {
      //         var validationManager = applicationManager.getValidationUtilManager();
      //         var validemail= validationManager.isValidEmail(data.contact);
      //         if(validemail){
      transactionObj.setTransactionAttribute("cashlessEmail",data.contact);
      transactionObj.setTransactionAttribute("cashlessPhone","");
      var navManager = applicationManager.getNavigationManager();
      scope_cardlessPresentationController.setCashlessFirstName(data.firstName);
      if(data.lastName)
        scope_cardlessPresentationController.setCashlessLastName(data.lastName);
      else
        scope_cardlessPresentationController.setCashlessLastName("");

      navManager.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : formNameCust});
      //   		}
      //         else
      //           {
      //             var controller = applicationManager.getPresentationUtility().getController('frmCardLessPickContacts', true);
      //             controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.OnBoarding.InvalidEmail"));
      //           }
    }
    else{
      var validationManager = applicationManager.getValidationUtilManager();
      var validemail= validationManager.isValidEmail(data);
      if(validemail){
        transactionObj.setTransactionAttribute("cashlessEmail",data);
        transactionObj.setTransactionAttribute("cashlessPhone","");
        var navManager = applicationManager.getNavigationManager();

        navManager.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : formNameCust});
      }
      else{
        var controller = applicationManager.getPresentationUtility().getController('frmCardLessEmail', true);
        controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.OnBoarding.InvalidEmail"));
      }
    }
  };
  CardLess_PresentationController.prototype.setCardlessPersonName=function(personName)
  {
    var navManager = applicationManager.getNavigationManager();
    var person=personName[0];
    scope_cardlessPresentationController.setCashlessFirstName(personName[0]);
    scope_cardlessPresentationController.setCashlessLastName(personName[1]);
    if(personName[1]===null || personName[1]===""){
      personName[1]="";
    }
    person=person+" "+personName[1];
    var transactionObj = applicationManager.getTransactionsListManager();
    transactionObj.setTransactionAttribute("cashlessPersonName",person);
    scope_cardlessPresentationController.navigateToNewCashWithDrawForm();
  };
  CardLess_PresentationController.prototype.cancelCommon=function()
  {
    var transactionObj = applicationManager.getTransactionsListManager();
    transactionObj.clearTransferObject();
    scope_cardlessPresentationController.clearBuilderNonGeneratedAttributes();
    var navManager = applicationManager.getNavigationManager();
    var form=navManager.getEntryPoint("cardlessEntry");
    scope_cardlessPresentationController.commonFunctionForNavigation(form);
  };
  CardLess_PresentationController.prototype.cancelCommonQR=function()
  {
    var transactionObj = applicationManager.getTransactionsListManager();
    transactionObj.clearTransferObject();
    scope_cardlessPresentationController.clearBuilderNonGeneratedAttributes();
    var navManager = applicationManager.getNavigationManager();
    var form=navManager.getEntryPoint("cardlessEntry");
    scope_cardlessPresentationController.commonFunctionForNavigation(form);
  };
  CardLess_PresentationController.prototype.contactCallBack=function(object){
    var controller=null;
    var resultContact=(JSON.parse(object));
    var cntType= scope_cardlessPresentationController.getCashlessContactType();
    var transactionObj = applicationManager.getTransactionsListManager();
    if(cntType==="phone"){
      if(resultContact.phone){
        resultContact.phone.replace(/\u00A0/g," ");
      }
      transactionObj.setTransactionAttribute("cashlessPhone",resultContact.phone);
      scope_cardlessPresentationController.setCashlessFirstName(resultContact.firstName);
      scope_cardlessPresentationController.setCashlessLastName(resultContact.lastName);
      controller = applicationManager.getPresentationUtility().getController('frmCardLessPhoneNo', true);
    }else{
      transactionObj.setTransactionAttribute("cashlessEmail",resultContact.email);
      scope_cardlessPresentationController.setCashlessFirstName(resultContact.firstName);
      scope_cardlessPresentationController.setCashlessLastName(resultContact.lastName);
      controller = applicationManager.getPresentationUtility().getController('frmCardLessEmail', true);
    }
    controller.bindContactData(resultContact);
  };
  CardLess_PresentationController.prototype.navigateToContacts=function()
  {
    var options = {isAccessModeAlways:true};
    var result = kony.application.checkPermission(kony.os.RESOURCE_CONTACTS,options);
    if(result.status === kony.application.PERMISSION_DENIED) {
      kony.application.requestPermission(kony.os.RESOURCE_CONTACTS,function success(response){
        if(response.status === kony.application.PERMISSION_GRANTED)
        {
          scope_cardlessPresentationController.pickContact();
        }
        else if(response.status === kony.application.PERMISSION_DENIED)
        {
          var scope=this;
          var i18nKey="";
          var cntType= scope_cardlessPresentationController.getCashlessContactType();
          var transactionObj = applicationManager.getTransactionsListManager();
          if(cntType==="phone"){
            var controller = applicationManager.getPresentationUtility().getController('frmCardLessPhoneNo', true);
            scope=controller.getScope();
            i18nKey= applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardLess.permissionContacts");
          }
          else{
            var controller = applicationManager.getPresentationUtility().getController('frmCardLessEmail', true);
            scope=controller.getScope();
            i18nKey= applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardLess.permissionContacts");
          }
          applicationManager.getDataProcessorUtility().showToastMessageError(scope,i18nKey);
        }
      });
    }
    else if(result.status === kony.application.PERMISSION_GRANTED ){
      scope_cardlessPresentationController.pickContact();
    }
  };
  CardLess_PresentationController.prototype.pickContact=function(){
	var scope = this;
	let contactPickerObjectLocal;
      if (kony.os.deviceInfo().name === "iPhone") {
        contactPickerObjectLocal = new contactsAPI.ContactPicker();        
      }
      else{
       let contactsAPI = java.import("com.konyffi.contacts.ContactPicker");
        contactPickerObjectLocal = new contactsAPI();
      }
    var cntType= scope_cardlessPresentationController.getCashlessContactType();
    if(cntType==="phone")
        contactPickerObjectLocal.selectSinglePhoneNumber(scope_cardlessPresentationController.contactCallBack);
    else
        contactPickerObjectLocal.selectSingleEmail(scope_cardlessPresentationController.contactCallBack);
  };
  CardLess_PresentationController.prototype.getCardlessPendingAndPostedTransactions=function(){
    var navMan=applicationManager.getNavigationManager();
    var navToForm=navMan.getEntryPoint("cardlessEntry");
    if(navToForm!=="frmCardLessHome"){
      var navMan=applicationManager.getNavigationManager();
      var accountsManager=applicationManager.getAccountManager();
      if(applicationManager.getConfigurationManager().isAccountDetailsServiceConfigured)
      {
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "AccountUIModule", "appName": "ArrangementsMA"});
        accountMod.presentationController.fetchAccountDetailsAndTransactions(scope_cardlessPresentationController.getTransactionObject().fromAccountNumber);
      }
      else
        accountsManager.fetchInternalAccounts(scope_cardlessPresentationController.fetchAccountsSuccCallBackNew,scope_cardlessPresentationController.fetchAccountsErrCallBackNew);
    }
    else{
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
      scope_cardlessPresentationController.asyncManager.initiateAsyncProcess(scope_cardlessPresentationController.numberOfAsyncForCWTransactions);
      var transactionObj = applicationManager.getTransactionsListManager();
      transactionObj.fetchCardlessPendingTransactions(scope_cardlessPresentationController.fetchCardlessPenTranPresSucCallback,scope_cardlessPresentationController.fetchCardlessPenTranPreErrCallback);
      transactionObj.fetchCardlessPostedTransactions(scope_cardlessPresentationController.fetchCardlessPosTranPresSucCallback,scope_cardlessPresentationController.fetchCardlessPosTranErrCallback);
    }
  };
  CardLess_PresentationController.prototype.fetchAccountTransactions = function(){
    var transactionManager = applicationManager.getTransactionsListManager();
    var fromAccountID = transactionManager.getTransactionObject().fromAccountNumber;
    transactionManager.clearTransferObject();
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "AccountsUIModule", "appName": "ArrangementsMA"});
    accountMod.presentationController.fetchAccountTransactions(fromAccountID);
  };
  CardLess_PresentationController.prototype.fetchAccountsSuccCallBackNew = function(res){
    scope_cardlessPresentationController.fetchAccountTransactions();
  };
  CardLess_PresentationController.prototype.fetchAccountsErrCallBackNew = function(err){
    kony.print(err);
  };
  CardLess_PresentationController.prototype.fetchCardlessPenTranPresSucCallback = function(resTransPend){
    scope_cardlessPresentationController.asyncManager.setSuccessStatus(0, resTransPend);
    if(scope_cardlessPresentationController.asyncManager.areAllservicesDone(scope_cardlessPresentationController.numberOfAsyncForCWTransactions)){
      scope_cardlessPresentationController.navigateToCardlessLandingScreen();
    }
  };
  CardLess_PresentationController.prototype.fetchCardlessPenTranPreErrCallback = function(resTransPendErr){
    scope_cardlessPresentationController.asyncManager.setErrorStatus(0, resTransPendErr);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(resTransPendErr["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPendErr);
  };
  CardLess_PresentationController.prototype.fetchCardlessPosTranPresSucCallback = function(resTransPost){
    scope_cardlessPresentationController.asyncManager.setSuccessStatus(1, resTransPost);
    if(scope_cardlessPresentationController.asyncManager.areAllservicesDone(scope_cardlessPresentationController.numberOfAsyncForCWTransactions)){
      scope_cardlessPresentationController.navigateToCardlessLandingScreen();
    }
  };
  CardLess_PresentationController.prototype.fetchCardlessPosTranErrCallback = function(resTransPostErr){
    scope_cardlessPresentationController.asyncManager.setErrorStatus(1, resTransPostErr);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(resTransPostErr["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPostErr);
  };
  CardLess_PresentationController.prototype.processAmount =  function(amount)
  {
    var formatUtil=applicationManager.getFormatUtilManager();
    amount=formatUtil.formatAmountandAppendCurrencySymbol(amount);
    return amount;
  };
  CardLess_PresentationController.prototype.navigateToCardlessLandingScreen =function(res){
    var formatUtil=applicationManager.getFormatUtilManager();
    var navMan = applicationManager.getNavigationManager();
    var transactions={};
    transactions.pendingTransactions = scope_cardlessPresentationController.asyncManager.getData(0).Transactions;
    transactions.postedTransactions = scope_cardlessPresentationController.asyncManager.getData(1).Transactions;
    if (transactions.pendingTransactions === "[]") {
      transactions.pendingTransactions = [];
    }
    if (transactions.postedTransactions === "[]") {
      transactions.postedTransactions = [];
    }
    for(var i=0; i<transactions.pendingTransactions.length; i++){
      var trandateobj=formatUtil.getDateObjectfromString(transactions.pendingTransactions[i]["transactionDate"],"YYYY-MM-DD");
      transactions.pendingTransactions[i]["scheduledDate"]= formatUtil.getFormatedDateString(trandateobj,formatUtil.getApplicationDateFormat());
      transactions.pendingTransactions[i]["amount"]=formatUtil.formatAmountandAppendCurrencySymbol(transactions.pendingTransactions[i]["amount"],transactions.pendingTransactions[i]["transactionCurrency"]);
    }
    for(var j=0; j<transactions.postedTransactions.length; j++){
      var trandateobj=formatUtil.getDateObjectfromString(transactions.postedTransactions[j]["transactionDate"],"YYYY-MM-DD");
      transactions.postedTransactions[j]["scheduledDate"]= formatUtil.getFormatedDateString(trandateobj,formatUtil.getApplicationDateFormat());
      transactions.postedTransactions[j]["amount"]=formatUtil.formatAmountandAppendCurrencySymbol(transactions.postedTransactions[j]["amount"],transactions.postedTransactions[j]["transactionCurrency"]);
    }
    navMan.setCustomInfo("frmCardLessHome", transactions);
    scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessHome");
  };
  CardLess_PresentationController.prototype.searchInputStringForContactsList=function(inputString,contactsArray)
  {
    var transactionObj = applicationManager.getTransactionsListManager();
    var segmentData=transactionObj.searchInputStringForContactsList(inputString,contactsArray);
    return segmentData;
  };
  CardLess_PresentationController.prototype.createCardlessTransaction =  function()
  {
    var transactionManager = applicationManager.getTransactionsListManager();
    var cardlessObject = Object.assign({}, transactionManager.getTransactionObject());
    transactionManager.createCardlessTransaction(cardlessObject, scope_cardlessPresentationController.presentationMakeACardlessTransferSuccess,scope_cardlessPresentationController.presentationMakeACardlessTransferError);
  };
  CardLess_PresentationController.prototype.presentationMakeACardlessTransferSuccess =  function(createSuccess)
  {
    var txnDetails = createSuccess;
    var navMan=applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmCardLessConfWithdraw",txnDetails);
    var userPrefObj=applicationManager.getUserPreferencesManager();
    var contact={};
    contact.email=userPrefObj.getUserEmail();
    contact.phone=userPrefObj.getUserPhone();
    if(createSuccess.success){
      scope_cardlessPresentationController.setcardlessTransactionId(createSuccess.referenceId);
      var customData = {
        "createResponse":createSuccess,
        "transnDetails":txnDetails,
        "userDetails":contact
      }
      navMan.setCustomInfo("frmCardLessCWCode",customData);
      navMan.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCardLessCWCode"});
/*      var navManager = applicationManager.getNavigationManager();
      navManager.setEntryPoint("Feedback","frmCardLessCWCode");
      var feedbackModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("FeedBackModule");
      feedbackModule.presentationController.showFeedbackPopup({from : "transaction"});*/
    }
    else{
      var customData = {
        "createResponse":createSuccess,
        "transnDetails":txnDetails,
        "userDetails":contact
      }
      navMan.setCustomInfo("frmCardLessOverdraft",customData);
      navMan.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCardLessOverdraft"});
    }
  };
  CardLess_PresentationController.prototype.presentationMakeACardlessTransferError =  function(createError)
  {
    kony.print("error in create cardless transaction");
    var controller = applicationManager.getPresentationUtility().getController('frmCardLessConfWithdraw', true);
    controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardLessWithdraw.errorMessage"));
    if(createError["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", createError);
  };
  CardLess_PresentationController.prototype.processAccountsData =  function(data)
  {
    var forUtility=applicationManager.getFormatUtilManager();
    var accProcessedData = (JSON.parse(JSON.stringify(data)));
    accProcessedData.fromAccountName = data.fromAccountName;
    accProcessedData.fromAccountBalance = forUtility.formatAmountandAppendCurrencySymbol(data.fromAccountBalance,data.fromCurrencyCode);
    accProcessedData.fromBankName =data.fromBankName;
    accProcessedData.fromAccountCurrency=data.fromCurrencyCode;
    return accProcessedData;
  };
  CardLess_PresentationController.prototype.setTransactionAmount =  function(amount)
  {
    var transactionObject = applicationManager.getTransactionsListManager();
    var navMan=applicationManager.getNavigationManager();
    var transactionObj=scope_cardlessPresentationController.getTransactionObject();
    var bal=transactionObj.fromAccountBalance;
    var accountData=navMan.getCustomInfo("frmCardLessWithdraw");
    accountData.amount=amount;
    navMan.setCustomInfo("frmCardLessWithdraw",accountData);
    var forUtility=applicationManager.getFormatUtilManager();
    amount= forUtility.deFormatAmount(amount);
    bal= forUtility.deFormatAmount(bal);
    if(Number(amount)>Number(bal))
    {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmCardLessWithdraw', true);
      controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.amountGreaterThanAvailBal"));
    }
    else
    {
      var confManager = applicationManager.getConfigurationManager();
      var denominations = confManager.getDenominationAmountValues();
      var validateAmount = scope_cardlessPresentationController.validateAmount(denominations, amount);
      if(validateAmount)
      {
        transactionObject.setTransactionAttribute("amount",amount);
        transactionObject.setTransactionAttribute("transactionType","Cardless");
        navMan.setCustomInfo("frmCardLessConfWithdraw",transactionObj);
        if(scope_cardlessPresentationController.getcashlessMode()==="Self"){
          scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessConfWithdraw");
        }
        else{
          scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessSecureCode");
        }
      }
      else
      {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmCardLessWithdraw', true);
        controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardless.DenominationError"));
      }
    }
  };
  CardLess_PresentationController.prototype.validateAmount = function(denomination, amount) {
    s = 0;
    if ((denomination.length === 0) || (parseInt(amount) === 0))
      return false;
    return scope_cardlessPresentationController.validateAmountSub(denomination, amount, (denomination.length - 1));
  };
  CardLess_PresentationController.prototype.validateAmountSub = function(denomination, amount, index) {
    if (index < 0) {
      kony.print("Failed to meet demand");
      return false;
    }
    // If amount is a perfect multiple of the denomination we are good
    if (amount % denomination[index] === 0) {
      s += " + " + (denomination[index] + "*" + Math.floor(amount / denomination[index]));
      return true;
    }
    // If amount is not a perfect multiple of the denomination
    if (amount % denomination[index] !== 0) {
      // If amount is greater than the denomination value
      if (amount > denomination[index]) {
        // There is enough quantity, so get remaining fractional amount
        s += " + " + (denomination[index] + "*" + Math.floor(amount / denomination[index]));
        //The () around amount/denomination[index] below is an absolute must
        // given compiler optimisations
        return scope_cardlessPresentationController.validateAmountSub(denomination,
                                                                      amount - (denomination[index] * Math.floor((amount / denomination[index]))), (index - 1));
      }
      // Amount is less than denomination value, just move to a lesser denomination
      else {
        return scope_cardlessPresentationController.validateAmountSub(denomination, amount, (index - 1));
      }
    }
    return false;
  };
  CardLess_PresentationController.prototype.setCardlessSecurityCode=function(securityCode)
  {
    var transactionObject = applicationManager.getTransactionsListManager();
    transactionObject.setTransactionAttribute("cashlessSecurityCode",securityCode);
    scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessConfWithdraw");
  };
  CardLess_PresentationController.prototype.deleteCardlessTransaction =  function(record)
  {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transactionManager = applicationManager.getTransactionsListManager();
    scope_cardlessPresentationController.transactionId = record.transactionId;
    transactionManager.setTransactionAttribute("fromAccountNumber",record.fromAccountNumber);
    transactionManager.deleteCardlessTransaction(record, scope_cardlessPresentationController.presentationDeleteACardlessTransferSuccess,scope_cardlessPresentationController.presentationDeleteACardlessTransferError);
  };
  CardLess_PresentationController.prototype.presentationDeleteACardlessTransferSuccess =  function(res)
  {
    var navMan=applicationManager.getNavigationManager();
    var transactionManager = applicationManager.getTransactionsListManager();
    var navigateTo= navMan.getEntryPoint("cancelCardlessTransaction");
    if(navigateTo==="frmAccountDetails"){
      var data = {};
      data.type="success";
      data.typeOfTransaction="delete";
      data.res=res;
      navMan.setCustomInfo("frmAccountDetails",data);
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "AccountUIModule", "appName": "ArrangementsMA"});
      if(applicationManager.getConfigurationManager().isAccountDetailsServiceConfigured)
      {
        accountMod.presentationController.fetchAccountDetailsAndTransactions(scope_cardlessPresentationController.getTransactionObject().fromAccountNumber);
      }
      else
        accountMod.presentationController.fetchAccountTransactions(scope_cardlessPresentationController.getTransactionObject().fromAccountNumber);
    }
    else{
      scope_cardlessPresentationController.getCardlessPendingAndPostedTransactions();
      //scope_cardlessPresentationController.getCardlessPendingAndPostedTransactionsQRScanner();
      scope_cardlessPresentationController.deletedTransactionFlag=true;
    }
  };
  CardLess_PresentationController.prototype.presentationDeleteACardlessTransferError =  function(error)
  {
    if(error["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    else{
      kony.print("error in delete cardless transaction");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navMan=applicationManager.getNavigationManager();
      var transactionManager = applicationManager.getTransactionsListManager();
      var navigateTo= navMan.getEntryPoint("cancelCardlessTransaction");
      if(navigateTo==="frmAccountDetails"){
        var data = {};
        data.type="error";
        data.typeOfTransaction="delete";
        data.res=error;
        navMan.setCustomInfo("frmAccountDetails",data);
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "AccountUIModule", "appName": "ArrangementsMA"});
        if(applicationManager.getConfigurationManager().isAccountDetailsServiceConfigured)
        {
          accountMod.presentationController.fetchAccountDetailsAndTransactions(scope_cardlessPresentationController.getTransactionObject().fromAccountNumber);
        }
        else
        {
          accountMod.presentationController.fetchAccountTransactions(scope_cardlessPresentationController.getTransactionObject().fromAccountNumber);
        }
      }
      else{
        scope_cardlessPresentationController.getCardlessPendingAndPostedTransactions();
        //scope_cardlessPresentationController.getCardlessPendingAndPostedTransactionsQRScanner();
        scope_cardlessPresentationController.deletedTransactionErrorFlag=true;
        scope_cardlessPresentationController.deletedTransactionErrorMessage=error.errorMessage;
      }
    }
  };
  CardLess_PresentationController.prototype.navigateToNewCashWithDrawQRForm = function(data)
  {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var accountsManager=applicationManager.getAccountManager();
    accountsManager.fetchInternalAccounts(scope_cardlessPresentationController.fetchAccountsQRSuccCallBack,scope_cardlessPresentationController.fetchAccountsQRErrCallBack);
  };
  CardLess_PresentationController.prototype.fetchAccountsQRSuccCallBack = function(res){
    var navMan=applicationManager.getNavigationManager();
    var accountsManager=applicationManager.getAccountManager();
    var data=accountsManager.getCardLessWithdrawlSupportedAccounts();
    var customData = {
      "fromaccounts":data
    }
    navMan.setCustomInfo("frmCardLessFromQR",customData);
    scope_cardlessPresentationController.goToAmountQRForm();
  };
  CardLess_PresentationController.prototype.fetchAccountsQRErrCallBack = function(err){
    kony.print("error in fetching accounts");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  CardLess_PresentationController.prototype.goToAmountQRForm = function()
  {
    var transactionObject = applicationManager.getTransactionsListManager();
    var navMan=applicationManager.getNavigationManager();
    var txnModel=scope_cardlessPresentationController.getTransactionObject();
    var accId=txnModel.fromAccountNumber;
    var accMan=applicationManager.getAccountManager();
    var preAccData=accMan.getCardlessPreferredAccount();
    if(accId!==null && accId!=="" && accId!==undefined)
    {
      var txnDetails=transactionObject.getTransactionObject();
      txnDetails=scope_cardlessPresentationController.processAccountsData(txnDetails);
      navMan.setCustomInfo("frmCardLessWithdrawQR",txnDetails);
      navMan.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCardLessWithdrawQR"});
    }
    else if((preAccData===""))
    {
      scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessFromQR");
    }
    else{
      transactionObject.setTransactionAttribute("fromAccountName",preAccData.accountName);
      transactionObject.setTransactionAttribute("fromAccountNumber",preAccData.accountID);
      transactionObject.setTransactionAttribute("fromAccountBalance",preAccData.availableBalance);
      transactionObject.setTransactionAttribute("fromAccountType",preAccData.accountType);
      var configManager = applicationManager.getConfigurationManager();
      var bankName = configManager.getBankName();
      scope_cardlessPresentationController.setFromBankName(bankName);
      var txnDetails=transactionObject.getTransactionObject();
      txnDetails=scope_cardlessPresentationController.processAccountsData(txnDetails);
      navMan.setCustomInfo("frmCardLessWithdrawQR",txnDetails);
      navMan.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCardLessWithdrawQR"});
    }
  };
  CardLess_PresentationController.prototype.showFromQRScannedAccounts=function()
  {
    var accMan=applicationManager.getAccountManager();
    accMan.fetchInternalAccounts(scope_cardlessPresentationController.showFromQRScannedAccountsPresentationSuccessCallBack,scope_cardlessPresentationController.showFromQRScannedAccountsPresentationErrorCallBack);
  };
  CardLess_PresentationController.prototype.showFromQRScannedAccountsPresentationSuccessCallBack=function(res)
  {
    var accNav=applicationManager.getAccountManager();
    var frmacc=accNav.getCardLessWithdrawlSupportedAccounts();
    var navMan=applicationManager.getNavigationManager();
    var customData = {
      "fromaccounts":frmacc
    }
    navMan.setCustomInfo("frmCardLessFromQR",customData);
    navMan.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCardLessFromQR"});
  };
  CardLess_PresentationController.prototype.showFromQRScannedAccountsPresentationErrorCallBack=function(error)
  {
    kony.print("error in showFromQRScannedAccountsPresentationErrorCallBack");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(error["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
  };
  CardLess_PresentationController.prototype.getCardlessPendingAndPostedTransactionsQRScanner=function(){
    var navMan=applicationManager.getNavigationManager();
    var navToForm=navMan.getEntryPoint("cardlessEntry");
    if(navToForm!=="frmCardLessHomeQR"){
      var navMan=applicationManager.getNavigationManager();
      scope_cardlessPresentationController.qrSuccessFlag=true;
      var txnId=scope_cardlessPresentationController.getCardlessTransactionId();
      var transactionObject = applicationManager.getTransactionsListManager();
      transactionObject.setTransactionprimaryAttribute({"transactionId":txnId});
      var toAccountID = transactionObject.transferObject.fromAccountNumber;
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "AccountsUIModule", "appName": "ArrangementsMA"});
      if(applicationManager.getConfigurationManager().isAccountDetailsServiceConfigured)
      {
        accountMod.presentationController.fetchAccountDetailsAndTransactions(scope_cardlessPresentationController.getTransactionObject().fromAccountNumber);
      }
      else
        accountMod.presentationController.fetchAccountTransactions(toAccountID);
    }
    else{
      applicationManager.getPresentationUtility().showLoadingScreen();
      scope_cardlessPresentationController.qrSuccessFlag=false;
      var navMan = applicationManager.getNavigationManager();
      scope_cardlessPresentationController.asyncManager.initiateAsyncProcess(scope_cardlessPresentationController.numberOfAsyncForCWQRTransactions);
      var transactionObj = applicationManager.getTransactionsListManager();
      transactionObj.fetchCardlessPendingTransactions(scope_cardlessPresentationController.fetchCardlessPenTranPresQRScannerSucCallback,scope_cardlessPresentationController.fetchCardlessPenTranPreQRScannerErrCallback);
      transactionObj.fetchCardlessPostedTransactions(scope_cardlessPresentationController.fetchCardlessPosTranPresQRScannerSucCallback,scope_cardlessPresentationController.fetchCardlessPosTranQRScannerErrCallback);
    }
  };
  CardLess_PresentationController.prototype.fetchCardlessPenTranPresQRScannerSucCallback = function(resTransPend){
    scope_cardlessPresentationController.asyncManager.setSuccessStatus(0, resTransPend);
    if(scope_cardlessPresentationController.asyncManager.areAllservicesDone(scope_cardlessPresentationController.numberOfAsyncForCWQRTransactions)){
      scope_cardlessPresentationController.navigateToQRCardlessLandingScreen();
    }
  };
  CardLess_PresentationController.prototype.fetchCardlessPenTranPreQRScannerErrCallback = function(err){
    scope_cardlessPresentationController.asyncManager.setErrorStatus(0, err);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  CardLess_PresentationController.prototype.fetchCardlessPosTranPresQRScannerSucCallback = function(resTransPost){
    scope_cardlessPresentationController.asyncManager.setSuccessStatus(1, resTransPost);
    if(scope_cardlessPresentationController.asyncManager.areAllservicesDone(scope_cardlessPresentationController.numberOfAsyncForCWQRTransactions)){
      scope_cardlessPresentationController.navigateToQRCardlessLandingScreen();
    }
  };
  CardLess_PresentationController.prototype.fetchCardlessPosTranQRScannerErrCallback = function(err){
    scope_cardlessPresentationController.asyncManager.setErrorStatus(1, err);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  CardLess_PresentationController.prototype.navigateToQRCardlessLandingScreen =function(res){
    var formatUtil=applicationManager.getFormatUtilManager();
    var navMan = applicationManager.getNavigationManager();
    var transactions={};
    transactions.pendingTransactions = scope_cardlessPresentationController.asyncManager.getData(0);
    transactions.postedTransaction = scope_cardlessPresentationController.asyncManager.getData(1);
    for(var i=0;i<transactions.pendingTransactions.length;i++){
      var trandateobj=formatUtil.getDateObjectfromString(transactions.pendingTransactions[i]["transactionDate"],"YYYY-MM-DD");
      transactions.pendingTransactions[i]["scheduledDate"]= formatUtil.getFormatedDateString(trandateobj,formatUtil.getApplicationDateFormat());
      transactions.pendingTransactions[i]["amount"]=formatUtil.formatAmountandAppendCurrencySymbol(transactions.pendingTransactions[i]["amount"],transactions.pendingTransactions[i]["transactionCurrency"]);
    }
    for(var i=0;i<transactions.postedTransaction.length;i++){
      var trandateobj=formatUtil.getDateObjectfromString(transactions.postedTransaction[i]["transactionDate"],"YYYY-MM-DD");
      transactions.postedTransaction[i]["scheduledDate"]= formatUtil.getFormatedDateString(trandateobj,formatUtil.getApplicationDateFormat())
      transactions.postedTransaction[i]["amount"]=formatUtil.formatAmountandAppendCurrencySymbol(transactions.postedTransaction[i]["amount"],transactions.postedTransaction[i]["transactionCurrency"]);
    }
    navMan.setCustomInfo("frmCardLessHomeQR",transactions);
    //scope_cardlessPresentationController.setTransactionId();
    scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessHomeQR");
  };
  CardLess_PresentationController.prototype.createCardlessQRTransaction =  function()
  {
    var transactionManager = applicationManager.getTransactionsListManager();
    transactionManager.createCardlessTransaction(transactionManager.getTransactionObject(), scope_cardlessPresentationController.presentationMakeACardlessQRTransferSuccess,scope_cardlessPresentationController.presentationMakeACardlessQRTransferError);
  };
  CardLess_PresentationController.prototype.presentationMakeACardlessQRTransferSuccess =  function(createSuccess)
  {
    var transactionObject = applicationManager.getTransactionsListManager();
    var txnDetails = scope_cardlessPresentationController.getTransactionObject();
    var navMan = applicationManager.getNavigationManager();
    var customData = {
      "createResponse":createSuccess,
      "transnDetails":txnDetails
    }
    navMan.setCustomInfo("frmCardLessConfWithdrawQR",customData);
    if(createSuccess.success){
      scope_cardlessPresentationController.setcardlessTransactionId(createSuccess.referenceId);
      navMan.setCustomInfo("frmCardLessQRCode",customData);
      navMan.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCardLessQRCode"});
    }
    else{
      navMan.setCustomInfo("frmCardLessOverdraftQR",customData);
      navMan.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCardLessOverDraftQRCode"});
    }
  };
  CardLess_PresentationController.prototype.presentationMakeACardlessQRTransferError =  function(createError)
  {
    kony.print("error in create cardless qr transaction");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(createError["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", createError);
  };
  CardLess_PresentationController.prototype.setQRTransactionAmount =  function(amount)
  {
    var transactionObject = applicationManager.getTransactionsListManager();
    transactionObject.setTransactionAttribute("cashlessMode","Self");
    var navMan=applicationManager.getNavigationManager();
    var transactionObj=scope_cardlessPresentationController.getTransactionObject();
    var bal=transactionObj.fromAccountBalance;
    var accountData=navMan.getCustomInfo("frmCardLessWithdrawQR");
    accountData.amount=amount;
    navMan.setCustomInfo("frmCardLessWithdrawQR",accountData);
    if(Number(amount)>Number(bal))
    {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmCardLessWithdrawQR', true);
      controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.amountGreaterThanAvailBal"));
    }
    else
    {
      var confManager = applicationManager.getConfigurationManager();
      var denominations = confManager.getDenominationAmountValues();
      var validateAmount = scope_cardlessPresentationController.validateAmount(denominations, amount);
      if(validateAmount)
      {
        transactionObject.setTransactionAttribute("amount",amount);
        transactionObject.setTransactionAttribute("transactionType","Cardless");
        var txnDetails=transactionObject.getTransactionObject();
        navMan.setCustomInfo("frmCardLessConfWithdrawQR",txnDetails);
        scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessConfWithdrawQR");
      }
      else
      {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmCardLessWithdrawQR', true);
        controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardless.denominationNote"));
      }
    }
  };
  CardLess_PresentationController.prototype.validateAmount = function(denomination, amount) {
    s = 0;
    if ((denomination.length === 0) || (parseInt(amount) === 0))
      return false;
    return scope_cardlessPresentationController.validateAmountSub(denomination, amount, (denomination.length - 1));
  };
  CardLess_PresentationController.prototype.validateAmountSub = function(denomination, amount, index) {
    if (index < 0) {
      kony.print("Failed to meet demand");
      return false;
    }
    // If amount is a perfect multiple of the denomination we are good
    if (amount % denomination[index] === 0) {
      s += " + " + (denomination[index] + "*" + Math.floor(amount / denomination[index]));
      return true;
    }
    // If amount is not a perfect multiple of the denomination
    if (amount % denomination[index] !== 0) {
      // If amount is greater than the denomination value
      if (amount > denomination[index]) {
        // There is enough quantity, so get remaining fractional amount
        s += " + " + (denomination[index] + "*" + Math.floor(amount / denomination[index]));
        //The () around amount/denomination[index] below is an absolute must
        // given compiler optimisations
        return scope_cardlessPresentationController.validateAmountSub(denomination,
                                                                      amount - (denomination[index] * Math.floor((amount / denomination[index]))), (index - 1));
      }
      // Amount is less than denomination value, just move to a lesser denomination
      else {
        return scope_cardlessPresentationController.validateAmountSub(denomination, amount, (index - 1));
      }
    }
    return false;
  };
  CardLess_PresentationController.prototype.invokeQRCodeFunctionality = function(){
    var name = applicationManager.getPresentationFormUtility().getDeviceName();
    if(name==="android"){
      scope_cardlessPresentationController.barcodeScannerAndroid();
    }
    else{
      scope_cardlessPresentationController.barcodeScannerIPhone();
    }
  };
  CardLess_PresentationController.prototype.barcodeScannerAndroid = function(){
    var barcodeCaptureCallback = function (barcodeDataDummmy, barcodeData) {
      try {
        kony.print(barcodeData);
        var response = JSON.parse(barcodeData);
        if(response){
          var transactionID=response.id;
          var timeStamp=response.timeStamp;
          var uniqueIdentifier=response.AtmId;
          var qrCodeDetails={id:transactionID,timestamp:timeStamp,AtmId:uniqueIdentifier};
          scope_cardlessPresentationController.forCardLessTransaction(qrCodeDetails);
        }
      } catch (err) {
        kony.ui.Alert("Invalid QR code scanned. Please rescan correct QR code");
      }
    };
    try {
      Barcode.captureBarcode(barcodeCaptureCallback);
    } catch (e) {
      kony.ui.Alert(e);
    }
  };
  CardLess_PresentationController.prototype.barcodeScannerIPhone=function(){
    var barcodeCaptureCallback = function ( barcodeData,barcodeDataDummmy) {
      try {
        var response = JSON.parse(barcodeData.barcodestring);
        if(response){
          var transactionID=response.id;
          var timeStamp=response.timeStamp;
          var uniqueIdentifier=response.AtmId;
          var qrCodeDetails={id:transactionID,timestamp:timeStamp,AtmId:uniqueIdentifier};
          scope_cardlessPresentationController.forCardLessTransaction(qrCodeDetails);
        }
      } catch (err) {
        kony.ui.Alert("Invalid QR code scanned. Please rescan correct QR code");
      }
    };
    try {
      Barcode.captureBarcode(barcodeCaptureCallback);
    } catch (e) {
      kony.ui.Alert(e);
    }
  };
  CardLess_PresentationController.prototype.forCardLessTransaction=function(qrCodeDetails){
    var QRCodeManager = applicationManager.getQRCodeManager();
    QRCodeManager.createCardlessTransactionQRCode(qrCodeDetails,scope_cardlessPresentationController.presentationTransferSuccessCallback,scope_cardlessPresentationController.presentationTransferErrorCallback);
  };
  CardLess_PresentationController.prototype.presentationTransferSuccessCallback =  function(createSuccess){
    var transactionObject = applicationManager.getTransactionsListManager();
    scope_cardlessPresentationController.setcardlessTransactionId(createSuccess.id);
    scope_cardlessPresentationController.getCardlessPendingAndPostedTransactionsQRScanner();
  };
  CardLess_PresentationController.prototype.presentationTransferErrorCallback =  function(error){
    kony.print("error in create cardless transaction");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(error["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
  };
  CardLess_PresentationController.prototype.getTransactionId = function(){
    var transactionID=scope_cardlessPresentationController.getCardlessTransactionId();
    return transactionID;
  };
  CardLess_PresentationController.prototype.setTransactionId = function(){
    scope_cardlessPresentationController.setcardlessTransactionId("");
  };
  CardLess_PresentationController.prototype.clearAmount = function(){
    var transactionObject = applicationManager.getTransactionsListManager();
    transactionObject.setTransactionAttribute("amount","");
  };
  CardLess_PresentationController.prototype.clearTransactionObject=function()
  {
    var transactionObj = applicationManager.getTransactionsListManager();
    transactionObj.clearTransferObject();
    scope_cardlessPresentationController.clearBuilderNonGeneratedAttributes();
  };
  CardLess_PresentationController.prototype.getTransactionObject=function()
  {
    var transactionObj = applicationManager.getTransactionsListManager();
    return transactionObj.getTransactionObject();
  };
  CardLess_PresentationController.prototype.setFromAccountDetails=function(fromAccountDetails){
    var transactionObj = applicationManager.getTransactionsListManager();
    transactionObj.setTransactionAttribute("fromAccountName",fromAccountDetails.accountName);
    transactionObj.setTransactionAttribute("fromAccountNumber",fromAccountDetails.accountID);
    transactionObj.setTransactionAttribute("fromAccountType",fromAccountDetails.accountType);
    transactionObj.setTransactionAttribute("fromAccountBalance",fromAccountDetails.amount);
    transactionObj.setTransactionAttribute("fromAccountNickName",fromAccountDetails.nickName);
    transactionObj.setTransactionAttribute("transactionCurrency",fromAccountDetails.currencyCode);
    transactionObj.setTransactionAttribute("fromAccountCurrency",fromAccountDetails.currencyCode);
    transactionObj.setTransactionAttribute("isBusinessAccount", fromAccountDetails.isBusinessAccount);
    var configManager = applicationManager.getConfigurationManager();
    var bankName = configManager.getBankName();
    scope_cardlessPresentationController.setFromBankName(bankName);
  };
  CardLess_PresentationController.prototype.setTransactionsNotes=function(description){
    var transactionObj = applicationManager.getTransactionsListManager();
    transactionObj.setTransactionAttribute("transactionsNotes",description);
  };
  CardLess_PresentationController.prototype.setOverDraftFlag=function(value){
    var transactionObj = applicationManager.getTransactionsListManager();
    transactionObj.setTransactionAttribute("overdraft",value);
  };
  CardLess_PresentationController.prototype.setScheduledDate=function(date){
    var transactionObj = applicationManager.getTransactionsListManager();
    transactionObj.setTransactionAttribute("scheduledDate",date);
  };
  CardLess_PresentationController.prototype.processViewFormattedData = function(data) {
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
  };
  /**
   * This method is used to sort the groups based on their priority defined in configuration manager
   *  data - {Object} holds the group names as key and respective accounts collection as value
   */
  CardLess_PresentationController.prototype.orderByPriority = function(data) {
    var cm = applicationManager.getConfigurationManager();
    var prioritizedData = {};
    var metaData = cm.getAccountTypesMetaData();
    for (var key1 in metaData) {
      if (data[metaData[key1].backendValue]) {
        prioritizedData[metaData[key1].backendValue] = data[metaData[key1].backendValue];
      }
    }
    return prioritizedData;
  };
  /**
   * This method is used to sort the accounts within the group based on their preference value
   *  accountsCollection - {Array} holds the collection of accounts within in a single group that needs to be sorted
   */
  CardLess_PresentationController.prototype.sortByPrefrence = function(accountsCollection) {
    if (accountsCollection.length > 1) accountsCollection.sort(function(record1, record2) {
      return record1.accountPreference - record2.accountPreference;
    });
    return accountsCollection;
  };
  return CardLess_PresentationController;
});