define([], function() {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function LoansPayoffModule_PresentationController() {
    scope_LoansPayoffModulePresentationController = this;
    scope_LoansPayoffModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
    scope_LoansPayoffModulePresentationController.mfaFlowType = '';
    scope_LoansPayoffModulePresentationController.fetchPayOffAmountCounter = 0;
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(LoansPayoffModule_PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  LoansPayoffModule_PresentationController.prototype.initializePresentationController = function() {

  };

  LoansPayoffModule_PresentationController.prototype.navigateToLoansPayoff = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navigationManager = applicationManager.getNavigationManager();
    navigationManager.setCustomInfo("frmLoansFromAccount", "passed");
    var recipientManager = applicationManager.getRecipientsManager();
    applicationManager.getPresentationUtility().showLoadingScreen();
    recipientManager.fetchBankDate({}, scope_LoansPayoffModulePresentationController.fetchBankDateSuccess.bind(this), scope_LoansPayoffModulePresentationController.fetchBankDateFailure.bind(this));
  };
  
  LoansPayoffModule_PresentationController.prototype.fetchBankDateSuccess = function(response) {
    var params = scope_LoansPayoffModulePresentationController.getLoansParams(response);
    var loansManager = applicationManager.getLoansManager();
    loansManager.simulationCall(params, scope_LoansPayoffModulePresentationController.presentationSimulationSuccess.bind(this, params), scope_LoansPayoffModulePresentationController.presentationSimulationError.bind(this, params));
  };

  LoansPayoffModule_PresentationController.prototype.fetchBankDateFailure = function (err) {
    var params = scope_LoansPayoffModulePresentationController.getLoansParams(err);
    var loansManager = applicationManager.getLoansManager();
    loansManager.simulationCall(params, scope_LoansPayoffModulePresentationController.presentationSimulationSuccess.bind(this, params), scope_LoansPayoffModulePresentationController.presentationSimulationError.bind(this, params));
  };

  LoansPayoffModule_PresentationController.prototype.presentationSimulationSuccess = function(params, res) {
    var criteria = {
      "arrangementId" : params.arrangementId,
      "billType" : "PAYOFF",
      "paymentDate" : params.effectiveDate
    };
    var loansManager = applicationManager.getLoansManager();
    kony.timer.schedule("timerId", function () {
      loansManager.fetchLoanPayoffAmount(criteria, scope_LoansPayoffModulePresentationController.presentationFetchLoanPayoffAmountSuccess, scope_LoansPayoffModulePresentationController.presentationFetchLoanPayoffAmountError.bind(this, params));
    }, 10, false);
  };

  LoansPayoffModule_PresentationController.prototype.presentationSimulationError = function(params, err) {
    var criteria = {
      "arrangementId" : params.arrangementId,
      "billType" : "PAYOFF",
      "paymentDate" : params.effectiveDate
    };
    var loansManager = applicationManager.getLoansManager();
     kony.timer.schedule("timerId", function () {
      loansManager.fetchLoanPayoffAmount(criteria, scope_LoansPayoffModulePresentationController.presentationFetchLoanPayoffAmountSuccess, scope_LoansPayoffModulePresentationController.presentationFetchLoanPayoffAmountError.bind(this, params));
    }, 10, false);
  };

  LoansPayoffModule_PresentationController.prototype.presentationFetchLoanPayoffAmountSuccess = function(res) {
    scope_LoansPayoffModulePresentationController.fetchPayOffAmountCounter = 0;
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("amount", res.totalAmount);
    transactionManager.setTransactionAttribute("payoffAmount", res.totalAmount);
    var responseObj = {};
    for (var obj of res.properties) {
      responseObj[obj.propertyName] = obj.interestAmount;
    }
    transactionManager.setTransactionAttribute("payoffErrMsg", null);
    transactionManager.setTransactionAttribute("payoffFee", responseObj["Payoff Fee"]);
    transactionManager.setTransactionAttribute("totalInterest", responseObj["Principal Interest"]);
    //transactionManager.setTransactionAttribute("totalPrincipal", responseObj["Account"]);
    //transactionManager.setTransactionAttribute("totalInterest", responseObj["Principal Interest"]);
    //scope_LoansPayoffModulePresentationController.commonFunctionForNavigation("frmLoanPayoff");
    scope_LoansPayoffModulePresentationController.commonFunctionForNavigation({
            "appName": "BillPayMA",
            "friendlyName": "LoanPayUIModule/frmLoanPayoff"
        });
  };

  LoansPayoffModule_PresentationController.prototype.presentationFetchLoanPayoffAmountError = function(params, errorResponse) {
    if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else {   
      if (scope_LoansPayoffModulePresentationController.fetchPayOffAmountCounter > 1) {
        scope_LoansPayoffModulePresentationController.fetchPayOffAmountCounter = 0;
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("payoffAmount", null);
        transactionManager.setTransactionAttribute("amount", null);
        transactionManager.setTransactionAttribute("payoffFee", null);
        transactionManager.setTransactionAttribute("totalInterest", null);
        transactionManager.setTransactionAttribute("payoffErrMsg",errorResponse.errorMessage);
        scope_LoansPayoffModulePresentationController.commonFunctionForNavigation({
            "appName": "BillPayMA",
            "friendlyName": "LoanPayUIModule/frmLoanPayoff"
        });
      }
      else {
        scope_LoansPayoffModulePresentationController.fetchPayOffAmountCounter++;
        var criteria = {
          "arrangementId" : params.arrangementId,
          "billType" : "PAYOFF",
          "paymentDate" : params.effectiveDate
        };
        var loansManager = applicationManager.getLoansManager();
        kony.timer.schedule("timerId", function () {
          loansManager.fetchLoanPayoffAmount(criteria, scope_LoansPayoffModulePresentationController.presentationFetchLoanPayoffAmountSuccess, scope_LoansPayoffModulePresentationController.presentationFetchLoanPayoffAmountError.bind(this, params));
        }, 10, false);
      }
    }
  };


  LoansPayoffModule_PresentationController.prototype.getLoansParams = function(response) {
    var navMan = applicationManager.getNavigationManager();
    var forUtility = applicationManager.getFormatUtilManager();
    var accountDetails = navMan.getCustomInfo("frmAccountDetails");
    accountDetails = accountDetails.selectedAccountData;
    var transactionManager = applicationManager.getTransactionManager();
    var transactionObject = transactionManager.getTransactionObject();
    var activityId = "LENDING-CALCULATE-PAYOFF";
    //var productId = accountDetails.accountName.toUpperCase();
    var productId = accountDetails.productId.toUpperCase();
    //var productId = "MORTGAGE";
    this.bankDate="";
    if(response && response.date[0])
      this.bankDate=response.date[0];
    if (this.bankDate && this.bankDate.currentWorkingDate) {
      var dateObj = forUtility.getDateObjectFromCalendarString(this.bankDate.currentWorkingDate,"yyyy-mm-dd");
      var effectiveDate = forUtility.getFormatedDateString(dateObj, "Ymd");
    }
    else {
      var dateObj = new Date();
      transactionManager.setTransactionAttribute("scheduledDate", forUtility.getFormatedDateString(dateObj, forUtility.getApplicationDateFormat()));
      transactionManager.setTransactionAttribute("isScheduled", "0");
      var effectiveDate = forUtility.getFormatedDateString(dateObj, "Ymd");
    }
    var arrangementId = accountDetails.arrangementId;
    return {
      "activityId" : activityId,
      "productId" : productId,
      "effectiveDate" : effectiveDate,
      "arrangementId" : arrangementId
    };
  };

  LoansPayoffModule_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo(formName);
  };
  
  LoansPayoffModule_PresentationController.prototype.cancelCommon = function() {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.clearTransferObject();
    scope_LoansPayoffModulePresentationController.fetchPayOffAmountCounter = 0;
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "HomepageMA", "moduleName" : "AccountsUIModule"});
    accountMod.presentationController.showDashboard();
  };

  LoansPayoffModule_PresentationController.prototype.getFromAccounts = function() {
    var accountManager = applicationManager.getAccountManager();
    accountManager.fetchInternalAccounts(scope_LoansPayoffModulePresentationController.fromAccountsPresentationSuccessCallBack, scope_LoansPayoffModulePresentationController.fromAccountsPresentationErrorCallBack);
  };

  LoansPayoffModule_PresentationController.prototype.fromAccountsPresentationSuccessCallBack = function(res) {
    let filteredAccountsData =res.filter(filteredAccountData => filteredAccountData.accountStatus === "ACTIVE" || filteredAccountData.accountStatus === "CLOSURE_PENDING");
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmLoansFromAccount", {
        "fromaccounts": filteredAccountsData
    });
    scope_LoansPayoffModulePresentationController.commonFunctionForNavigation("frmLoansFromAccount");
  };

  LoansPayoffModule_PresentationController.prototype.fromAccountsPresentationErrorCallBack = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"]){
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    }
    else{
        kony.print("error in showFromAccountsPresentationErrorCallBack");
    }
  };

  LoansPayoffModule_PresentationController.prototype.processAccountsData = function(data,screenType) {
    var accProcessedData = [];
    for (var i = 0; i < data.length; i++) {
      accProcessedData[i] = {};
      var name = "";
      if (data[i].nickName === null || data[i].nickName === undefined) {
        name = data[i].accountName;
      } else {
        name = data[i].nickName;
      }
      accProcessedData[i].accountName = data[i].accountName;
      accProcessedData[i].nickName = data[i].nickName;
      accProcessedData[i].availableBalance = scope_LoansPayoffModulePresentationController.getAvailableBalanceCurrencyString(data[i],screenType);
      accProcessedData[i].accountID = data[i].accountID;
      accProcessedData[i].bankName = (data[i].bankName) ? data[i].bankName.trim() : data[i].bankName;
      accProcessedData[i].accountBalanceType = scope_LoansPayoffModulePresentationController.getAvailableBalanceType(data[i],screenType);
      accProcessedData[i].accountType = data[i].accountType;
      accProcessedData[i].fromAccountCurrency = data[i].currencyCode;
      accProcessedData[i].toAccountCurrency = data[i].currencyCode;
      accProcessedData[i].fromAccountBalance = data[i].availableBalance;
      accProcessedData[i].accountPreference = data[i].accountPreference;
      accProcessedData[i].transactionMode = data[i].transactionMode;
      accProcessedData[i].processedName = applicationManager.getPresentationUtility().formatText(name, 10, data[i].accountID, 4);
    }
    return accProcessedData;
  };

  LoansPayoffModule_PresentationController.prototype.getAvailableBalanceCurrencyString = function(data,screenType) {
    var forUtility = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager();
    var currencyCode = data["currencyCode"];
    switch (data.accountType) {
      case configManager.constants.SAVINGS:
        return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
      case configManager.constants.CHECKING:
        return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
      case configManager.constants.CREDITCARD:
        if(screenType=="from")
        return forUtility.formatAmountandAppendCurrencySymbol(data["availableCredit"], currencyCode);
        else
        return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"], currencyCode);
      case configManager.constants.LOAN:
        return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"], currencyCode);
      default:
        return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
    }
  };

  LoansPayoffModule_PresentationController.prototype.getAvailableBalanceType = function(data,screenType) {
    var configManager = applicationManager.getConfigurationManager();
    switch (data.accountType) {
      case configManager.constants.SAVINGS:
        return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
      case configManager.constants.CHECKING:
        return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
      case configManager.constants.CREDITCARD:
        if(screenType=="from")
        return kony.i18n.getLocalizedString("kony.mb.accdetails.availCred");
        else
        return kony.i18n.getLocalizedString("kony.mb.accdetails.outstandingBal");
      case configManager.constants.LOAN:
        return kony.i18n.getLocalizedString("kony.mb.accdetails.outstandingBal");
      default:
        return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
    }
  };

  LoansPayoffModule_PresentationController.prototype.processViewFormattedData = function(data) {
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

  LoansPayoffModule_PresentationController.prototype.orderByPriority = function(data) {
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

  LoansPayoffModule_PresentationController.prototype.sortByPrefrence = function(accountsCollection) {
    if (accountsCollection.length > 1) accountsCollection.sort(function(record1, record2) {
      return record1.accountPreference - record2.accountPreference;
    });
    return accountsCollection;
  };

  LoansPayoffModule_PresentationController.prototype.setFromAccountsForTransactions = function(selectedFromAccount) {
    var trasMan = applicationManager.getTransactionManager();
    trasMan.setTransactionAttribute("fromAccountNumber", selectedFromAccount.accountID);
    trasMan.setTransactionAttribute("fromAccountName", selectedFromAccount.accountName);
    trasMan.setTransactionAttribute("fromAccountType", selectedFromAccount.accountType);
    trasMan.setTransactionAttribute("fromBankName", selectedFromAccount.bankName);
    trasMan.setTransactionAttribute("fromProcessedName", selectedFromAccount.processedName);
    if(selectedFromAccount.fromAccountCurrency)
    {
      trasMan.setTransactionAttribute("fromAccountCurrency",selectedFromAccount.fromAccountCurrency);
    }
    else
    {
      trasMan.setTransactionAttribute("fromAccountCurrency",selectedFromAccount.currencyCode);
    }
  };

  LoansPayoffModule_PresentationController.prototype.setToAccountsDataForLoans = function(toAccountData) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("toAccountNumber",toAccountData["accountID"]);
    transactionManager.setTransactionAttribute("toAccountType",toAccountData["accountType"]);
    transactionManager.setTransactionAttribute("toAccountName",toAccountData["accountName"]);
    transactionManager.setTransactionAttribute("transactionType","InternalTransfer");
    transactionManager.setTransactionAttribute("toProcessedName",toAccountData["processedName"]);
    transactionManager.setTransactionAttribute("bankName",toAccountData["bankName"]);
    transactionManager.setTransactionAttribute("toAccountCurrency",toAccountData["toAccountCurrency"]);
  };

  LoansPayoffModule_PresentationController.prototype.getVerifyScreenData = function() {
    var segData = [];
    var transactionManager = applicationManager.getTransactionManager();
    var forUtility = applicationManager.getFormatUtilManager();
    var transObj = transactionManager.getTransactionObject();
    segData.push({
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.FromAccount")+":",
        "value1": transObj.fromProcessedName || "",
        "value2": transObj.fromBankName || ""
      }, {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.ToAccount")+":",
        "value1": transObj.toProcessedName || "",
        "value2" : ""
      }, {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.PayoffPenalty")+":",
        "value1": forUtility.formatAmountandAppendCurrencySymbol(transObj.payoffFee , transObj.transactionCurrency) || "",
        "value2" : ""
      }, {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.currBal")+":",
        "value1": forUtility.formatAmountandAppendCurrencySymbol(transObj.currentBalance , transObj.transactionCurrency) || "",
        "value2" : ""
      }, {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.TotalPrincipal")+":",
        "value1": forUtility.formatAmountandAppendCurrencySymbol(transObj.totalPrincipal , transObj.transactionCurrency) || "",
        "value2" : ""
      }, {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.TotalInterest")+":",
        "value1": forUtility.formatAmountandAppendCurrencySymbol(transObj.totalInterest , transObj.transactionCurrency) || "",
        "value2" : ""
      }, {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.Rate")+":",
        "value1": transObj.interestRate+"%" || "",
        "value2" : ""
      }, {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.ActualLoanEndDate")+":",
        "value1": transObj.closingDate || "",
        "value2" : ""
      }, {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.PayoffDate")+":",
        "value1": transObj.scheduledDate || "",
        "value2" : ""
      });
      return segData;
  };

  LoansPayoffModule_PresentationController.prototype.getTermsAndConditions = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var config = applicationManager.getConfigurationManager();
    var locale=config.getLocale();
    var termsAndConditions=config.getTermsAndConditions();
    var param={
     "languageCode": termsAndConditions[locale],
      "termsAndConditionsCode": termsAndConditions["Footer"]
   };
    var termsAndConditions = applicationManager.getTermsAndConditionsManager();
    termsAndConditions.fetchTermsAndConditionsPostLogin(param,scope_LoansPayoffModulePresentationController.getTermsandConditionsSuccessCallBack,scope_LoansPayoffModulePresentationController.getTermsandConditionsErrorCallback);
  };

  LoansPayoffModule_PresentationController.prototype.getTermsandConditionsSuccessCallBack = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    navManager.setCustomInfo("frmSupportInfo",{"richTextData":"<font face='SourceSansPro-Regular'>"+response.termsAndConditionsContent,"flowType":"Footer","contentTypeID":response.contentTypeId,"header":configManager.constants.TERMS});
    var info = applicationManager.getNavigationManager().getCustomInfo("frmSupportInfo");
    if(info.contentTypeID == "URL"){
    kony.application.openURL(info.content);
    }
    else{
      navManager.navigateTo("frmSupportInfo");
    }
  };

  LoansPayoffModule_PresentationController.prototype.getTermsandConditionsErrorCallback = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
       }else{
     var controller = applicationManager.getPresentationUtility().getController('frmLoansVerify', true);
     controller.bindGenericError(response.errorMessage);
     }
  };
  
  LoansPayoffModule_PresentationController.prototype.makeATransfer = function() {
    var transactionManager = applicationManager.getTransactionManager();
    var transactionObj = transactionManager.getTransactionObject();
    var mfaManager = applicationManager.getMFAManager();
    var serviceName = transactionObj.serviceName;
    if(kony.sdk.isNullOrUndefined(serviceName)){
      var displayName = applicationManager.getPresentationUtility().MFA.getDisplayNameBasedOnTransactionMode({
                  "appName": "BillPayMA",
                  "moduleName": "LoanPayUIModule"
              });
      applicationManager.getPresentationUtility().MFA.getServiceIdBasedOnDisplayName(displayName);
      serviceName = mfaManager.getServiceId();
    }
    else {
      mfaManager.setServiceId(serviceName);
    }  
    if (serviceName) {
      var mfaParams = {
        serviceName: serviceName,
      };
      transactionManager.setTransactionAttribute("MFAAttributes", mfaParams);
    }
    transactionManager.setTransactionAttribute("serviceName",serviceName);
    scope_LoansPayoffModulePresentationController.mfaFlowType="TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE";
    var requestData = scope_LoansPayoffModulePresentationController.filterTransactionObject();
    var requestTransferData = {};
    requestTransferData.amount=requestData.amount;
    if(!kony.sdk.isNullOrUndefined(requestData.frequencyType)) {
    requestTransferData.frequencyType=requestData.frequencyType;  
    } else {
    requestTransferData.frequencyType = "Once";
    }
    requestTransferData.fromAccountNumber=requestData.fromAccountNumber;
    requestTransferData.isScheduled=requestData.isScheduled;
    requestTransferData.frequencyStartDate=requestData.frequencyStartDate;
    requestTransferData.frequencyEndDate=requestData.frequencyEndDate;
    requestTransferData.scheduledDate=requestData.scheduledDate;
    requestTransferData.toAccountNumber=requestData.toAccountNumber;
    requestTransferData.transactionType=requestData.transactionType;
    requestTransferData.fromAccountCurrency=requestData.fromAccountCurrency;
    requestTransferData.toAccountCurrency=requestData.toAccountCurrency;
    requestTransferData.transactionCurrency=requestData.fromAccountCurrency;
    if(!kony.sdk.isNullOrUndefined(requestData.paymentMedium)){
    requestTransferData.paymentType = requestData.paymentMedium;  
    } else {
    requestTransferData.paymentType = "SEPA";
    }
    transactionManager.createTransferToOwnAccounts(requestTransferData,scope_LoansPayoffModulePresentationController.presentationMakeATransferSuccess,scope_LoansPayoffModulePresentationController.presentationMakeATransferError);
  };
  
  LoansPayoffModule_PresentationController.prototype.presentationMakeATransferSuccess = function(resp) {
    if(resp.MFAAttributes && resp.MFAAttributes.isMFARequired == "true") {
      var mfaJSON = {
        "flowType" : scope_LoansPayoffModulePresentationController.mfaFlowType,
        "response" : resp
      };
      applicationManager.getMFAManager().setMFAOperationType("LOANPAYOFF");
      applicationManager.getMFAManager().initMFAFlow(mfaJSON);
    }
    else {
      var transactionManager = applicationManager.getTransactionManager();
      if(resp.backendReferenceId)
        transactionManager.setTransactionAttribute("referenceId",resp.backendReferenceId);
      else if(resp.referenceId)
        transactionManager.setTransactionAttribute("referenceId",resp.referenceId);
      scope_LoansPayoffModulePresentationController.commonFunctionForNavigation("frmLoansAcknowledgement");
    }
  };
  
  LoansPayoffModule_PresentationController.prototype.presentationMakeATransferError = function(err) {
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
      var transactionManager = applicationManager.getTransactionManager();
      transactionManager.setTransactionAttribute("errmsg",err.errorMessage);
      scope_LoansPayoffModulePresentationController.commonFunctionForNavigation("frmLoansAcknowledgement");
    }
  };
  
  LoansPayoffModule_PresentationController.prototype.filterTransactionObject = function() {
    var transactionManager = applicationManager.getTransactionManager();
    var request = transactionManager.getTransactionObject();
    var requestdata = {};
    for (var prop in request) { 
      if (request[prop] !== null) { 
        requestdata[prop]=request[prop];
      } 
    }
    return requestdata;
  };
  
  LoansPayoffModule_PresentationController.prototype.removeLoanAccounts = function(accounts) {
    return accounts.filter(function(account) {
      return account.accountType !== "Loan";
    });
  };

  LoansPayoffModule_PresentationController.prototype.clearFlowAttributes = function() {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.clearTransferObject();
  };

  LoansPayoffModule_PresentationController.prototype.getAcknowledgementScreenData = function() {
    var segData = [];
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    if (!kony.sdk.isNullOrUndefined(transObj.referenceId)) {
        segData.push({
          "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ReferenceID"),
          "value1" : transObj.referenceId,
          "value2" : ""
        });
      }
      else if (!kony.sdk.isNullOrUndefined(transObj.transactionId)) {
        segData.push({
          "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.TransactionID"),
          "value1" : transObj.transactionId,
          "value2" : ""
        });
      }
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.from"),
        "value1" : transObj.fromProcessedName,
        "value2" : ""
      },{
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.To"),
        "value1" : transObj.toProcessedName,
        "value2" : ""
      },{
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"),
        "value1" : applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.scheduledDate),
        "value2" : ""
      }, {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Amount"),
        "value1" : applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(transObj.amount,transObj.transactionCurrency),
        "value2" : ""
      });
      return segData; 
  };

  return LoansPayoffModule_PresentationController;
});
