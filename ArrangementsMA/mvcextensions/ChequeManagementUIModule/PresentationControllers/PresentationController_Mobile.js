define(["CommonUtilities", "SCAUtility"], function(CommonUtilities, SCAUtility) {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    scope_ChequePresentationController=this;
    scope_ChequePresentationController.chequeTypeSelection="";
    scope_ChequePresentationController.chequeSupportedAccounts=[];
    scope_ChequePresentationController.entryFormForAccounts=null;
    scope_ChequePresentationController.processedName=null;
    scope_ChequePresentationController.deliveryType="";
    scope_ChequePresentationController.chequeBooksCount="";
    scope_ChequePresentationController.isReview="";
    scope_ChequePresentationController.stateNavigation = "";
    scope_ChequePresentationController.stateTriggeredForm = "";
    scope_ChequePresentationController.leavesCount="";
    scope_ChequePresentationController.chequeId="";
    scope_ChequePresentationController.uniqueChequeIssueIdResponse= "";
    scope_ChequePresentationController.fees="";
    scope_ChequePresentationController.currencyCode="";
    scope_ChequePresentationController.selectedAccountCategory="";
    scope_ChequePresentationController.address="";
    scope_ChequePresentationController.chequeIssuedDate="";
    scope_ChequePresentationController.referenceId="";
    scope_ChequePresentationController.isInitial="";
    scope_ChequePresentationController.stopReasonsList ="";
    scope_ChequePresentationController.accountId="";
  }

  inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter 
     * This method gets called when presentation controller gets initialized
     * @method
     */
  PresentationController.prototype.initializePresentationController = function() {

  };
  PresentationController.prototype.navigateToChequeLandingScreen = function(selectedAccount) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    let navManager = applicationManager.getNavigationManager();	
    var custominfoInt = navManager.getCustomInfo("frmDashboard");
    var custominfoCD = navManager.getCustomInfo("frmCustomerDashboard");
    var chequeAccounts = [];
    if(custominfoCD && (custominfoCD.reDesignFlow === "true")){
      if(custominfoInt && custominfoInt.isGetListCalled===true && custominfoCD.isAccActionsCalled === true){
        chequeAccounts = this.getAccounts();
      }else{
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
        presenter.presentationController.showDataLoaderPopup();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        return;
      }
    }else{
      chequeAccounts = this.getAccounts();
    }
    
    let accountIndex = 0;
    for(currentIndex in chequeAccounts){
      let currentIndexAccount = chequeAccounts[currentIndex];
      if(currentIndexAccount && currentIndexAccount.account_id && currentIndexAccount.account_id === scope_ChequePresentationController.accountId) {
        accountIndex = currentIndex;
        break;
      }
    } 
    var accountId = selectedAccount ? selectedAccount.accountID : chequeAccounts[accountIndex].accountID;
    var accountName = selectedAccount ? selectedAccount.accountName : chequeAccounts[accountIndex].accountName;
    var nickName = selectedAccount ? selectedAccount.nickName : chequeAccounts[accountIndex].nickName;
    var categoryId = selectedAccount ? selectedAccount.categoryId : chequeAccounts[accountIndex].categoryId;
    var currencyCode = selectedAccount ? selectedAccount.currencyCode : chequeAccounts[accountIndex].currencyCode;
    var name = (nickName === null || nickName === undefined) ? accountName : nickName;
    var showView = selectedAccount ? selectedAccount.showView : "";
    scope_ChequePresentationController.processedName = applicationManager.getPresentationUtility().formatText(name, 15, accountId, 4);
    scope_ChequePresentationController.accountId = accountId;
    var trasMan = applicationManager.getTransactionsListManager();
    trasMan.setTransactionAttribute("fromAccountNumber", accountId);
    trasMan.setTransactionAttribute("fromAccountName", name);
    scope_ChequePresentationController.selectedAccountCategory = categoryId;
    scope_ChequePresentationController.currencyCode = currencyCode;
    //this.commonFunctionForNavigation("frmChequeManagement", showView);
    navManager.navigateTo({"appName":"ArrangementsMA", "friendlyName":"frmChequeManagement"});
  };


  PresentationController.prototype.getAccounts = function() {
    var configManager=applicationManager.getConfigurationManager();
    var allaccounts=configManager.userAccounts;
    var chequeSupportedAccounts=[];
     var filterList = function (input) {
      try {
        let accountData = JSON.parse(JSON.stringify(input));
        let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
        return filteredAccountData;
      } catch(err){
        return input;
      }
    };
    var accounts = filterList(allaccounts);
    for(var i=0;i<accounts.length;i++){
      if(accounts[i].accountType==="Checking"||accounts[i].accountType==="Savings"){
        chequeSupportedAccounts.push(accounts[i]);
      }
    }
    scope_ChequePresentationController.chequeSupportedAccounts=chequeSupportedAccounts;
    return scope_ChequePresentationController.chequeSupportedAccounts;
  };
  PresentationController.prototype.navigateToAccountScreen=function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmCMSelectAccount", {
      "fromaccounts": scope_ChequePresentationController.chequeSupportedAccounts
    });
    this.commonFunctionForNavigation({"friendlyName" : "frmCMSelectAccount", "appName" : "ArrangementsMA"} );
  };
  PresentationController.prototype.setFromAccountsForTransactions = function(selectedFromAccount) {
    var trasMan = applicationManager.getTransactionsListManager();
    trasMan.setTransactionAttribute("fromAccountNumber", selectedFromAccount.accountID);
    trasMan.setTransactionAttribute("fromAccountName", selectedFromAccount.accountName);
    scope_ChequePresentationController.selectedAccountCategory=selectedFromAccount.categoryId;
    scope_ChequePresentationController.currencyCode=selectedFromAccount.fromAccountCurrency;
    scope_ChequePresentationController.processedName = selectedFromAccount.processedName;
    scope_ChequePresentationController.accountId = selectedFromAccount.accountID;
    if(this.entryFormForAccounts=== "frmCMReview"){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var transMan = applicationManager.getTransactionsListManager();
      var criteria={"category" : scope_ChequePresentationController.selectedAccountCategory};
      transMan.fetchChequeIDAndLeavesCount(criteria,scope_ChequePresentationController.fetchChequeIDAndLeavesCountSuccess,scope_ChequePresentationController.fetchChequeIDAndLeavesCountError);
    }else if(scope_ChequePresentationController.isReview===true){
      this.commonFunctionForNavigation("frmSCReview");
    }else{
      this.commonFunctionForNavigation(this.entryFormForAccounts);
    }
  };

  PresentationController.prototype.processAccountsData = function(data) {
    var accProcessedData = [];
    for (var i = 0; i < data.length; i++) {
      accProcessedData[i] = {};
      var name = "";
      if(data[i].externalIndicator !== "true"){
      if (data[i].nickName === null || data[i].nickName === undefined) {
        name = data[i].accountName;
      } else {
        name = data[i].nickName;
      }
      var forUtility=applicationManager.getFormatUtilManager(); 
      accProcessedData[i].accountName = data[i].accountName;
      accProcessedData[i].categoryId = data[i].categoryId;
      accProcessedData[i].accountID = data[i].accountID;
      accProcessedData[i].accountType = data[i].accountType;
      accProcessedData[i].fromAccountCurrency = data[i].currencyCode;
      accProcessedData[i].toAccountCurrency = data[i].currencyCode;
      accProcessedData[i].fromAccountBalance = data[i].availableBalance;
      accProcessedData[i].availableBalance = forUtility.formatAmountandAppendCurrencySymbol(data[i].availableBalance,data[i].currencyCode);forUtility.formatAmountandAppendCurrencySymbol(data[i].availableBalance,data[i].currencyCode);
      accProcessedData[i].accountPreference = data[i].accountPreference;
      accProcessedData[i].accountBalanceType = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accounts.AvailableBalance");
      accProcessedData[i].processedName = applicationManager.getPresentationUtility().formatText(name, 15, data[i].accountID, 4);
      accProcessedData[i].membershipID=data[i].Membership_id;
      accProcessedData[i].membershipName=data[i].MembershipName;
      accProcessedData[i].isBusinessAccount=data[i].isBusinessAccount;
      accProcessedData[i].bankName=data[i].bankName;
      
    }
    }
    return accProcessedData;
  };

  PresentationController.prototype.processViewFormattedData = function(data) {
    var processedData = {};
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

  PresentationController.prototype.sortByPrefrence = function(accountsCollection) {
    if (accountsCollection.length > 1) accountsCollection.sort(function(record1, record2) {
      return record1.accountPreference - record2.accountPreference;
    });
    return accountsCollection;
  };

  PresentationController.prototype.getTransObject = function() {
    var transMan = applicationManager.getTransactionsListManager();
    var obj = transMan.getTransactionObject();
    return obj;
  };

  PresentationController.prototype.commonCancel = function() {
    this.clearFlowValues();
    var transactionManager = applicationManager.getTransactionsListManager();
    transactionManager.clearTransferObject();
    var navMan=applicationManager.getNavigationManager();
    var navForm=navMan.getEntryPoint("chequemanagement");
    if(navForm==="frmChequeManagement"|| navForm==="frmCMConfirmation"||navForm==="frmSCAcknowledgement"){
      this.navigateToChequeLandingScreen();
    }
    else{
      navMan.navigateTo({"friendlyName" : navForm, "appName" : "ArrangementsMA"} );
    }
  };
  PresentationController.prototype.clearFlowValues=function(){
    scope_ChequePresentationController.chequeTypeSelection="";
    scope_ChequePresentationController.deliveryType="";
    scope_ChequePresentationController.chequeBooksCount="";
    scope_ChequePresentationController.leavesCount="";
    scope_ChequePresentationController.chequeId="";
    scope_ChequePresentationController.uniqueChequeIssueIdResponse= "";
    scope_ChequePresentationController.fees="";
    scope_ChequePresentationController.currencyCode="";
    scope_ChequePresentationController.selectedAccountCategory="";
    scope_ChequePresentationController.address="";
  };
  PresentationController.prototype.setChequeCancelReason=function(data){
    var trasMan = applicationManager.getTransactionsListManager();
    trasMan.setTransactionAttribute("checkReason", data);
  };

  /**
   * This method is used to handle the forward navigation including state management
   * formName - {String} specifies the form name of the next screen that needs to be displayed.
   */
  PresentationController.prototype.commonFunctionForNavigation = function(formName, showView) {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = kony.application.getCurrentForm();
    // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
    if(scope_ChequePresentationController.stateNavigation && scope_ChequePresentationController.stateTriggeredForm!==currentForm.id){
      navManager.navigateTo(scope_ChequePresentationController.stateTriggeredForm,true);
      scope_ChequePresentationController.stateNavigation=false;
      scope_ChequePresentationController.stateTriggeredForm="";
    }
    // If state management is triggered and if it is on the state triggered form then we will navigate to specified form and ignoring it's entry into the navigation stack as the form is being re-visited
    else if(scope_ChequePresentationController.stateNavigation){
      navManager.navigateTo(formName,true);
    }
    // This is triggered when the forms are being visited for the first time.
    else{
      navManager.navigateTo(formName, true, showView);
    }
  };
  /**
   * This method is used to handle the backward navigation including state management
   */
  PresentationController.prototype.commonFunctionForgoBack = function() {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = kony.application.getCurrentForm();
    // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
    if(scope_ChequePresentationController.stateNavigation && scope_ChequePresentationController.stateTriggeredForm!==currentForm.id){
      navManager.navigateTo(scope_ChequePresentationController.stateTriggeredForm,true);
      scope_ChequePresentationController.stateNavigation=false;
      scope_ChequePresentationController.stateTriggeredForm="";
    }
    // This is triggered when the forms entry into navigation manager's stack is equal to one .
    else{
      navManager.goBack();
    }
  };

  /**
    * This method is used to initialise the state management flow
    * initialized- {boolean} hold the initialisation state value
    * triggeredForm - {String} holds the form name from where state management has been triggered.
    */
  PresentationController.prototype.initializeStateData=function(initialized,triggeredForm){
    scope_ChequePresentationController.stateNavigation = initialized;
    scope_ChequePresentationController.stateTriggeredForm = triggeredForm;
  };


  PresentationController.prototype.getTermsConditionsData= function() {
    var navManager=applicationManager.getTermsAndConditionsManager();
    var param ={"languageCode":"en-US","termsAndConditionsCode":"StopPayment_TnC"};
    navManager.fetchTermsAndConditionsPostLogin(param,this.termsAndConditionOnSuccess,this.termsAndConditiononError);  
  };

  PresentationController.prototype.termsAndConditionOnSuccess=function(response){
    //scope_ChequePresentationController.isReview=true;
    var controller = applicationManager.getPresentationUtility().getController('frmSCTermsAndCondition', true);
    controller.updateUIOnSuccess(response);
  };

  PresentationController.prototype.termsAndConditiononError=function(err){
if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmSCTermsAndCondition', true);
      controller.bindGenericError(err.errorMessage);
    }
  };
  PresentationController.prototype.getTransObject = function() {
    var transMan = applicationManager.getTransactionsListManager();
    var obj = transMan.getTransactionObject();
    return obj;
  };
  PresentationController.prototype.setAmount = function(selectedAmount) {
    var trasMan = applicationManager.getTransactionsListManager();
    trasMan.setTransactionAttribute("amount", selectedAmount);
  };
  PresentationController.prototype.setChequeNumber = function(selectedChequeNumber) {
    var trasMan = applicationManager.getTransactionsListManager();
    trasMan.setTransactionAttribute("checkNumber1", selectedChequeNumber);
  };
  PresentationController.prototype.seriesChequeNumber = function(selectedFirstCheque, selectedLastCheque) {
    var trasMan = applicationManager.getTransactionsListManager();
    trasMan.setTransactionAttribute("checkNumber1", selectedFirstCheque);
    trasMan.setTransactionAttribute("checkNumber2", selectedLastCheque);
  };
  PresentationController.prototype.setPayeeName = function(selectedPayeeName) {
    var trasMan = applicationManager.getTransactionsListManager();
    trasMan.setTransactionAttribute("payeeName", selectedPayeeName);
  };
  PresentationController.prototype.setIssueDate = function(selectedDate) {
    var trasMan = applicationManager.getTransactionsListManager();
    trasMan.setTransactionAttribute("checkDateOfIssue", selectedDate);
  };
      PresentationController.prototype.navigateToPayeeName = function(accountDetails) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var allAccounts = this.getAccounts();
        var selectedAccountCategory = "";
        var selectedAccountDetails = "";
        for (var i = 0; i < allAccounts.length; i++) {
            if (allAccounts[i].accountID === accountDetails.accountID) {
                selectedAccountDetails = allAccounts[i];
                break;
            }
        }
        selectedAccountCategory = selectedAccountDetails.categoryId;
        scope_ChequePresentationController.currencyCode = selectedAccountDetails.currencyCode;
        var transObj = applicationManager.getTransactionsListManager();
        transObj.setTransactionAttribute("fromAccountNumber", selectedAccountDetails.accountID);
        transObj.setTransactionAttribute("fromAccountName", selectedAccountDetails.accountName);
        var name = "";
        if (selectedAccountDetails.nickName === null || selectedAccountDetails.nickName === undefined) {
            name = selectedAccountDetails.accountName;
        } else {
            name = selectedAccountDetails.nickName;
        }
        scope_ChequePresentationController.processedName = applicationManager.getPresentationUtility().formatText(name, 15, selectedAccountDetails.accountID, 4);
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo("frmPayeeName");
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      };
  PresentationController.prototype.navigateFromAccountDetails=function(accountDetails){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var allAccounts=this.getAccounts();
    var selectedAccountCategory="";
    var selectedAccountDetails="";
    for(var i=0;i<allAccounts.length;i++){
      if(allAccounts[i].accountID===accountDetails.accountID){
        selectedAccountDetails=allAccounts[i];
        break;
      }
    }
    selectedAccountCategory=selectedAccountDetails.categoryId;
    scope_ChequePresentationController.currencyCode=selectedAccountDetails.currencyCode;
    var transObj = applicationManager.getTransactionsListManager();
    transObj.setTransactionAttribute("fromAccountNumber", selectedAccountDetails.accountID);
    transObj.setTransactionAttribute("fromAccountName", selectedAccountDetails.accountName);
    var name = "";
    if (selectedAccountDetails.nickName === null || selectedAccountDetails.nickName === undefined) {
      name = selectedAccountDetails.accountName;
    } else {
      name = selectedAccountDetails.nickName;
    }
    scope_ChequePresentationController.processedName = applicationManager.getPresentationUtility().formatText(name, 15, selectedAccountDetails.accountID, 4);
    var transMan = applicationManager.getTransactionsListManager();
    var criteria={"category" : selectedAccountCategory};
    transMan.fetchChequeIDAndLeavesCount(criteria,scope_ChequePresentationController.fetchChequeIDAndLeavesCountSuccess,scope_ChequePresentationController.fetchChequeIDAndLeavesCountError);
  };
  PresentationController.prototype.fetchChequeIDAndLeavesCountSuccess=function(response){
    var chequeTypes=response.ChequeTypes;
    if(Array.isArray(chequeTypes)){
      scope_ChequePresentationController.chequeId=chequeTypes[0].chequeId;
      scope_ChequePresentationController.leavesCount=chequeTypes[0].defaultIssueNumber;
      var transObj=scope_ChequePresentationController.getTransObject();
      var criteria={"chequeIssueId":scope_ChequePresentationController.chequeId+"."+transObj.fromAccountNumber,"validate":"true","note":"","accountID":transObj.fromAccountNumber};
      var transMan = applicationManager.getTransactionsListManager();
      transMan.createChequeBookRequests(criteria,scope_ChequePresentationController.validateAndFetchFeeDetailsSuccess,scope_ChequePresentationController.validateAndFetchFeeDetailsError);
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }

  };
  PresentationController.prototype.validateAndFetchFeeDetailsSuccess=function(response){
    scope_ChequePresentationController.uniqueChequeIssueIdResponse= response.chequeIssueId;
    scope_ChequePresentationController.fees=response.fees;
    var navMan=applicationManager.getNavigationManager();
    navMan.navigateTo("frmCMReview");
  };
  PresentationController.prototype.validateAndFetchFeeDetailsError=function(err){
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else {
      if(kony.application.getCurrentForm().id=== "frmAccountDetails"){
      var controller = applicationManager.getPresentationUtility().getController('frmAccountDetails', true);
      controller.showErrorPopup(err.errorMessage);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      } else {
      var controller = applicationManager.getPresentationUtility().getController('frmChequeManagement', true);
      controller.bindError(err.errorMessage);
      }
    }
  };
  PresentationController.prototype.fetchChequeIDAndLeavesCountError=function(err){
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };

  PresentationController.prototype.fetchTransactionForAccount=function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transObj=this.getTransObject();
    var transMan = applicationManager.getTransactionsListManager();
    transMan.getAccountTransactions({"accountID":transObj.fromAccountNumber,"limit":"20"},scope_ChequePresentationController.getTransactionsSuccess,scope_ChequePresentationController.getTransactionsError);
  };
  PresentationController.prototype.getTransactionsSuccess=function(response){
    var formattedResponse = [];
        response = response.ChequeBookRequests;
        if (Array.isArray(response)) {
            for (var i = 0; i < response.length; i++) {
                var data = {};
             var chequeBooks = "";
                if (response[i].numberOfChequeBooks === null || response[i].numberOfChequeBooks === undefined) {
                    chequeBooks = kony.i18n.getLocalizedString("kony.mb.CM.book(s)") + " " + "(" + " " + kony.i18n.getLocalizedString("kony.mb.CM.Leaves") + ")";
                } else {
                    var leaves = response[i].numberOfLeaves !== undefined ? response[i].numberOfLeaves : "";
                    chequeBooks = response[i].numberOfChequeBooks +" "+ kony.i18n.getLocalizedString("kony.mb.CM.book(s)") + " " + "(" + leaves + " " + kony.i18n.getLocalizedString("kony.mb.CM.Leaves") + ")";
                }
              data.bookCount = chequeBooks;
              data.booksCount = {
                    "text" : chequeBooks,
                    "skin" : "sknLbl424242SSP32pxTab"
                };
                if (response[i].issueDate === null || response[i].issueDate === undefined) {
                    data.lblDate = " ";
                } else {
				var date = response[i].issueDate;
                var str = date.toString();
                var year = str.substring(0,4);
                var month = str.substring(4,6);
                var day= str.substring(6,8);       
                data.lblDate = month + "/" + day + "/" + year;
                data.notes = response[i].note;
				}
            if(response[i].chequeStatus){
            data.lblStatus=response[i].chequeStatus;
            if(response[i].chequeStatus === "REQUEST RECIEVED"){
                data.lblStatus="Requested";
            }
            if(response[i].chequeStatus === "ISSUED"){
                data.lblStatus="Issued";
            }
        }
        //data.lblStatus=response[i].chequeStatus;
        data.image={"src":"","isVisible":false};
        data.description=response[i].description;
        data.chequeIssueId=response[i].chequeIssueId;
        data.chequeNumberStart=response[i].chequeNumberStart;
        data.accountID=response[i].accountID;
        data.fees=response[i].fees;
        data.deliveryType=response[i].deliveryType;
        data.address=response[i].address;
        if(response[i].notes){
        if(response[i].notes.length>0)
          data.notes=response[i].notes[0].note;}
        formattedResponse.push(data);
        }
    }
    var controller = applicationManager.getPresentationUtility().getController('frmChequeManagement', true);
    controller.bindTransactions(formattedResponse);
  };
  PresentationController.prototype.getTransactionsError=function(err){
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };

  PresentationController.prototype.btnNewRequestOnClick=function(){
    var transMan = applicationManager.getTransactionsListManager();
    var criteria={"category" : scope_ChequePresentationController.selectedAccountCategory};
    transMan.fetchChequeIDAndLeavesCount(criteria,scope_ChequePresentationController.fetchChequeIDAndLeavesCountSuccess,scope_ChequePresentationController.fetchChequeIDAndLeavesCountError);
  };

   PresentationController.prototype.createChequeBookRequest = function(desc) {
        if (1==CommonUtilities.getSCAType() && desc.serviceKey) {
            // desc will be object in the second call
            let criteria = {
                "MFAAttributes": {
                    "serviceName": desc.serviceName,
                    "serviceKey": desc.serviceKey,
                }
            };
            var transMan = applicationManager.getTransactionManager();
            transMan.createChequeBookRequests(criteria, scope_ChequePresentationController.createChequeBookSuccess, scope_ChequePresentationController.createChequeBookError);
        } else {
        var transMan = applicationManager.getTransactionsListManager();
        var chequeBookTransMan = scope_ChequePresentationController.getTransObject();
        transMan.setTransactionAttribute("transactionsNotes", desc);
        var criteria = {
            "chequeIssueId": scope_ChequePresentationController.uniqueChequeIssueIdResponse,
            "note": desc,
            "validate": "",
            "accountID": chequeBookTransMan.fromAccountNumber,
            "fees": scope_ChequePresentationController.fees,
            "numberOfLeaves": scope_ChequePresentationController.leavesCount,
            "numberOfChequeBooks": scope_ChequePresentationController.chequeBooksCount === "" ? 1 : scope_ChequePresentationController.chequeBooksCount,
            "deliveryType": scope_ChequePresentationController.deliveryType
        };
        transMan.createChequeBookRequests(criteria, scope_ChequePresentationController.createChequeBookSuccess, scope_ChequePresentationController.createChequeBookError);
        }
    };

  PresentationController.prototype.createChequeBookSuccess=function(response){
    if (1==CommonUtilities.getSCAType() && response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var controller = applicationManager.getPresentationUtility().getController('frmCMReview', true);
            console.log(controller);
            controller.showSCANotification(response);
        } else {
    scope_ChequePresentationController.uniqueChequeIssueIdResponse = response.chequeIssueId || response.orderId;
	var navMan=applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmCMConfirmation",response);
    scope_ChequePresentationController.commonFunctionForNavigation("frmCMConfirmation");
  }
  };
  PresentationController.prototype.createChequeBookError=function(err){
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
      var transactionManager = applicationManager.getTransactionsListManager();
      transactionManager.setTransactionAttribute("errmsg",err.errorMessage);
      scope_ChequePresentationController.commonFunctionForNavigation("frmCMConfirmation");
    }
  };

  PresentationController.prototype.getUserAddress=function(){
    var userObj = applicationManager.getUserPreferencesManager();
    var addressObj = userObj.getEntitlementAddresses();
    var details="";
    for(var i =0;i<addressObj.length;i++){
      if (addressObj[i].isPrimary === "true") {
        if(addressObj[i].AddressLine1)
          details = addressObj[i].AddressLine1;
        if(addressObj[i].AddressLine2)
          details = details +","+addressObj[i].AddressLine2;
        if(addressObj[i].CityName)
          details = details+","+addressObj[i].CityName;
        if(addressObj[i].RegionName)
          details = details+ ", " + addressObj[i].RegionName;
        if(addressObj[i].CountryName)
          details = details+","+addressObj[i].CountryName;
        if(addressObj[i].ZipCode)
          details = details+","+addressObj[i].ZipCode;
        break;
      }
    }
      if (addressObj.length === 1  && !details) {
        if (addressObj[0].AddressLine1)
          details = addressObj[0].AddressLine1;
		if (addressObj[0].AddressLine2)
          details = details + "," + addressObj[0].AddressLine2;
		if (addressObj[0].CityName) 
          details = details + "," + addressObj[0].CityName;
		if (addressObj[0].RegionName) 
          details = details + ", " + addressObj[0].RegionName;
		if (addressObj[0].CountryName) 
          details = details + "," + addressObj[0].CountryName;
		if (addressObj[0].ZipCode) 
          details = details + "," + addressObj[0].ZipCode;
    }
    scope_ChequePresentationController.address=details;
  };

  PresentationController.prototype.fetchStopChequeRequestsForAccount=function(){
    var transMan = applicationManager.getTransactionsListManager();
    var transObj=this.getTransObject();
    var criteria={"accountID":transObj.fromAccountNumber,"offset":0,"limit":"","sortBy":"transactionDate","order":"desc","paginationRowLimit":"","transactionType":"StopCheckPaymentRequest"};
    transMan.getStopCheckPaymentRequestTransactions(criteria,scope_ChequePresentationController.getStopChequeRequestSuccess,scope_ChequePresentationController.getStopChequeRequestError);
  };

  PresentationController.prototype.getStopChequeRequestSuccess=function(response){
    var formatUtil = applicationManager.getFormatUtilManager();
    var formattedResponse=[];
    if(Array.isArray(response)){
      for(var i=0;i<response.length;i++){
        var data={};
        if(response[i].requestType==="series"){
          data.booksCount=response[i].checkNumber1+"-"+response[i].checkNumber2;
        }
        else{
          data.booksCount=response[i].checkNumber1;
        }
        var trandateobj = formatUtil.getDateObjectfromString(response[i]["transactionDate"], "YYYY-MM-DD");
        var transactionDate = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat());
        data.lblDate=transactionDate;
        data.lblAccountNo=response[i].transactionId;
        if (response[i].statusDescription === null || response[i].statusDescription === undefined) {
        data.lblStatus= kony.i18n.getLocalizedString("kony.mb.cardManage.Active");
        }else{
        data.lblStatus=response[i].statusDescription;
        }
        data.image={"isVisible":true};
        data.amount=formatUtil.formatAmountandAppendCurrencySymbol(response[i].amount,scope_ChequePresentationController.currencyCode);
        data.payeeName=response[i].payeeName;
        data.transactionType=response[i].transactionType;
        data.checkReason=response[i].checkReason;
        if(response[i]["checkDateOfIssue"]==null){
        var trandateofissue = formatUtil.getDateObjectfromString(response[i]["checkDateOfIssue"], "YYYY-MM-DD");
        var checkDateOfIssue = formatUtil.getFormatedDateString(trandateofissue, formatUtil.getApplicationDateFormat());
        data.checkDateOfIssue=checkDateOfIssue;
        }
        else {
          var date= response[i]["checkDateOfIssue"];
          var newDate=date.slice(0,4)+ "-" + date.slice(4,6)+ "-" +date.slice(6,8);
          var trandateofissue = formatUtil.getDateObjectfromString(newDate, "YYYY-MM-DD");
          var checkDateOfIssue = formatUtil.getFormatedDateString(trandateofissue, formatUtil.getApplicationDateFormat());
          data.checkDateOfIssue=checkDateOfIssue;
        }
        var trandateobj1 = formatUtil.getDateObjectfromString(response[i]["requestValidity"], "YYYY-MM-DD");
        var requestValidity = formatUtil.getFormatedDateString(trandateobj1, formatUtil.getApplicationDateFormat());
        data.requestValidity=requestValidity;
        data.requestType=response[i].requestType;
        data.fee=formatUtil.formatAmountandAppendCurrencySymbol(response[i].fees,scope_ChequePresentationController.currencyCode);
        data.notes=response[i].transactionsNotes;
        data.accountType=response[i].accountType;
        formattedResponse.push(data);
      }
    }
    var controller = applicationManager.getPresentationUtility().getController('frmChequeManagement', true);
    controller.bindTransactions(formattedResponse);
  };
  PresentationController.prototype.getStopChequeRequestError=function(err){
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };

  PresentationController.prototype.getChequeSupplements=function(){
    var transMan = applicationManager.getTransactionsListManager();
    var transObj=this.getTransObject();
    var criteria={"accountID":transObj.fromAccountNumber,"limit":20};
    transMan.getChequeSupplements(criteria,scope_ChequePresentationController.getChequeSupplementsSuccess,scope_ChequePresentationController.getChequeSupplementsError); 
  };
  PresentationController.prototype.getChequeSupplementsSuccess=function(response){
    var formatUtil = applicationManager.getFormatUtilManager();
    var formattedResponse=[];
    response= response.ChequeSupplements;
    if(Array.isArray(response)){
      for (var i = 0; i < response.length; i++) {
        var data = {};
        data.booksCount = response[i].checkNumber;
        data.lblDate = formatUtil.formatAmountandAppendCurrencySymbol(response[i].amount, scope_ChequePresentationController.currencyCode);
        data.issueDate = response[i].issueDate;
        if(response[i].hasOwnProperty("payeeNames") && response[i].payeeNames.length>0)
          data.lblAccountNo = response[i].payeeNames[0].payeeName;
        else if(response[i].hasOwnProperty("payeeName")) data.lblAccountNo = response[i].payeeName;
        else
          data.lblAccountNo="";
        data.lblStatus = response[i].chequeStatus;
        data.referenceNumber=response[i].referenceNumber;
        data.chequeTypeId = response[i].chequeTypeId;
        formattedResponse.push(data);
      }
    }
    var controller = applicationManager.getPresentationUtility().getController('frmChequeManagement', true);
    controller.bindTransactions(formattedResponse);
  };
  PresentationController.prototype.getChequeSupplementsError=function(err){
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
PresentationController.prototype.stopChequePaymentRequest=function(data){
       var transMan = applicationManager.getTransactionsListManager();
  
      
    transMan.setTransactionAttribute("transactionsNotes", data);
       
     var param=scope_ChequePresentationController.setStopChequeRequestData();
    
     transMan.createStopChequePayment(param,scope_ChequePresentationController.stopChequePaymentOnSuccess,scope_ChequePresentationController.stopChequePaymentOnError);
   };
  PresentationController.prototype.stopChequePaymentOnSuccess=function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
   scope_ChequePresentationController.referenceId=response.referenceId;
    scope_ChequePresentationController.commonFunctionForNavigation("frmSCAcknowledgement");
    
      };
   PresentationController.prototype.stopChequePaymentOnError=function(err){
      if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmSCReview', true);
      controller.bindGenericError(err.errorMessage);
    }
   };
  PresentationController.prototype.setStopChequeRequestData=function(){
     var transObj=scope_ChequePresentationController.getTransObject();
   var param={
      "fromAccountNumber":transObj.fromAccountNumber,
      "transactionType":"StopCheckPaymentRequest",
       "checkNumber1":transObj.checkNumber1,
    "checkReason":transObj.checkReason,
       "requestValidityInMonths":"6",
     "payeeName":transObj.payeeName,
  
  "validate":""
   };
     if(transObj.transactionsNotes===null){
       param.transactionsNotes="";
     }else{
       param.transactionsNotes= transObj.transactionsNotes;
     }
    
     
    if(scope_ChequePresentationController.chequeTypeSelection==="Series of Cheques"){
      param.checkNumber2=transObj.checkNumber2;
    }
    else{
    
      param.amount=transObj.amount;
      param.checkDateOfIssue=transObj.checkDateOfIssue;
    }
      
    return param;
  };
    PresentationController.prototype.getStopChequeFee=function(){
    
   var param=scope_ChequePresentationController.setStopChequeRequestData();
      param.validate="true";
        var transMan = applicationManager.getTransactionsListManager();
       transMan.createStopChequePayment(param,scope_ChequePresentationController.createStopChequeValidateSuccess,scope_ChequePresentationController.createStopChequeValidateError);
     
  };
  
  /** to fetch the Transact stopCheque Reason **/
   PresentationController.prototype.getStopChequeReason=function(){
     scope_ChequePresentationController.stopReasonsList = applicationManager.getConfigurationManager().getStopReasons();
      var controller = applicationManager.getPresentationUtility().getController('frmSCReason', true);
      controller.bindStopChequeReason(scope_ChequePresentationController.stopReasonsList);
   };
  
  PresentationController.prototype.createStopChequeValidateSuccess=function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_ChequePresentationController.fees=response.fee;
    if( scope_ChequePresentationController.isReview==true){
         scope_ChequePresentationController.commonFunctionForNavigation("frmSCReview");
    }else{
             scope_ChequePresentationController.commonFunctionForNavigation("frmSCTermsAndCondition");
            }
  };
  PresentationController.prototype.createStopChequeValidateError=function(err){
     if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmSCReason', true);
      controller.bindGenericError(err.errorMessage);
    }
  };
    PresentationController.prototype.getSearchDetails=function(search){
    var transMan = applicationManager.getTransactionsListManager();
        var transObj=this.getTransObject();
    	var criteria =  {
                "accountID": transObj.fromAccountNumber,
                "amountRange": search.amountrange,
                "chequeRange": search.checknumberrange,
                "chequeStatus": search.searchStatusType,
                "checkNumber": search.checknumber,
                "amount": search.amount,
                "payeeName": search.payeeName,
          		"limit":"20"
            };
    transMan.getChequeSupplements(criteria,scope_ChequePresentationController.getSearchChequeDetailsOnSuccess,scope_ChequePresentationController.getSearchChequeDetailsOnError); 
  };
  PresentationController.prototype.getSearchChequeDetailsOnSuccess=function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var formatUtil = applicationManager.getFormatUtilManager();
    var formattedResponse=[];
    response= response.ChequeSupplements;
    if(Array.isArray(response)){
      for (var i = 0; i < response.length; i++) {
        var data = {};
        data.lblChequeNo = response[i].checkNumber;
        data.lblDate = formatUtil.formatAmountandAppendCurrencySymbol(response[i].amount, scope_ChequePresentationController.currencyCode);
        data.issueDate = response[i].issueDate;
        if(response[i].payeeNames.length>0)
          data.lblAccountNo = response[i].payeeNames[0].payeeName;
        else
          data.lblAccountNo=scope_ChequePresentationController.processedName;
        data.lblStatus = response[i].chequeStatus;
        data.referenceNumber=response[i].referenceNumber;
        formattedResponse.push(data);
      }
    }
    var navMan=applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmCMSearchResult",formattedResponse);
    scope_ChequePresentationController.commonFunctionForNavigation("frmCMSearchResult");
  };
  PresentationController.prototype.getSearchChequeDetailsOnError=function(err){
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else{
       applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
/**
      * Method to revoke stopped cheque payment
     * @param {Object}
     * @param {String}  - contains the action to be 
     */
  PresentationController.prototype.updateRevokeStopChequePayment = function(params) {
    var transObj=this.getTransObject();
    applicationManager.getTransactionsListManager().revokeStopChequePayment({
    "fromAccountNumber": transObj.fromAccountNumber,
    "checkNumber1": params.checkNumber1,
    "payeeName" : params.payeeName,  
    "revokeDate": params.revokeDate,
    "revokeChequeTypeId": params.chequeTypeId
    }, this.updateRevokeStopChequePaymentSuccess.bind(this), this.updateRevokeStopChequePaymentFailure.bind(this));

  };
  /**
     * method used as success call backupdate revoke stopped cheque payment 
     * @param {Object} 
     * @param {String}  action - contains the action to be - revoke stopped cheque payment.
     * @param {Object} response - contains the response revoke stopped cheque payment
     */
  PresentationController.prototype.updateRevokeStopChequePaymentSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    
 //   var navManager = applicationManager.getNavigationManager();
 //   navManager.navigateTo("frmChequeRevokeAckn");
    
     var controller = applicationManager.getPresentationUtility().getController('frmChequeTransactionDetails', true);
     controller.navigateToRevokeStopCheck(response);
  };
  /**
     * method used as failure call back update revoke stopped cheque payment
     * @param {String} errorMessage - contains the errormessage update revoke stopped cheque payment
     */
  PresentationController.prototype.updateRevokeStopChequePaymentFailure = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	if(error["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    else{
      var controller = applicationManager.getPresentationUtility().getController('frmChequeTransactionDetails', true);
      var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.An.error.occurred.while.making.the.request.");
      controller.bindGenericError(errorMsg);
    }
  };
  /**
* This method is used to sort the groups based on their priority defined in configuration manager
* data - {Object} holds the group names as key and respective accounts collection as value
*/
  PresentationController.prototype.orderByPriority = function(data) {
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
   * Method to get the bank date
   * @param {function} callback call to set bank date in form 
   */
  PresentationController.prototype.getBankDate = function () {
    applicationManager.getRecipientsManager().fetchBankDate({}, this.getBankDateSuccess.bind(this), this.getBankDateFailure.bind(this));
  };
  /**
   * get bank date Success Callback
   * @param {function} callback call to set API bank date in form 
   * @param {Object} response object containing bank date
   */
 PresentationController.prototype.getBankDateSuccess = function(res) {
        var bankDate = res.date[0];
        var controller = applicationManager.getPresentationUtility().getController('frmChequeTransactionDetails', true);
        controller.setBankDate(bankDate);
  };
  /**
   * get bank date Failure Callback
   * @param {function} callback call to set server bank date in form 
   * @param {Object} response object containing failure message
   */
  PresentationController.prototype.getBankDateFailure = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };  
  return PresentationController;
});