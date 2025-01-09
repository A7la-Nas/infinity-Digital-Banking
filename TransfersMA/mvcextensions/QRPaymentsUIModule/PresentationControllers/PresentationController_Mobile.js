define(['DataFormattingUtils/FormatUtils'], function (FormatUtils) {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function QR_PresentationController() {
    scope_QRPresentationController = this;
    this.formatUtils = new FormatUtils();
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(QR_PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  QR_PresentationController.prototype.initializePresentationController = function () {
  };

  /**
  * calls terms and conditions api.
  */
  QR_PresentationController.prototype.getTermsAndConditions = function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var config = applicationManager.getConfigurationManager();
    var locale = kony.i18n.getCurrentLocale();
    var termsAndConditions = config.getTermsAndConditions();
    var param = {
      "languageCode": termsAndConditions[locale],
      "termsAndConditionsCode": termsAndConditions["QRPayment"]
    };
    var termsAndConditions = applicationManager.getTermsAndConditionsManager();
    termsAndConditions.fetchTermsAndConditionsPostLogin(param, scope_QRPresentationController.getTermsandConditionsSuccessCallBack, scope_QRPresentationController.getTermsandConditionsErrorCallback);
  };

  /**
  * Successcallback of terms and conditions api.
  *
  * Navigates to terms and conditions screen.
  * 
  * @param {Object} response     Contains terms and conditions and status and other fields.
  */
  QR_PresentationController.prototype.getTermsandConditionsSuccessCallBack = function (response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    navManager.setCustomInfo("frmQRTAndC", { "richTextData": "<font face='SourceSansPro-Regular'>" + response.termsAndConditionsContent });
    navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRTAndC" });
  };

  /**
  * Errorcallback of terms and conditions api.
  *
  * Shows a toast message in top of the current form.
  * 
  * @param {Object} err     Contains error message and other fields.
  */
  QR_PresentationController.prototype.getTermsandConditionsErrorCallback = function (err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
      var controller = applicationManager.getPresentationUtility().getController('frmQRActivation', true);
      controller.bindGenericError(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage"));
    }
  };

  /**
  * calls getlist api.
  */
  QR_PresentationController.prototype.getFromAccounts = function () {
    var accountManager = applicationManager.getAccountManager();
    accountManager.fetchInternalAccounts(scope_QRPresentationController.fromAccountsPresentationSuccessCallBack,
      scope_QRPresentationController.fromAccountsPresentationErrorCallBack);
  };

  /**
  * Successcallback of getlist api.
  *
  * Navigates to qr from account screen.
  * 
  * @param {Object} res     Contains array of internal accounts.
  */
  QR_PresentationController.prototype.fromAccountsPresentationSuccessCallBack = function (res) {
    var navMan = applicationManager.getNavigationManager();
    var accounts = res.filter(function (account) {
      return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING";
    });
    navMan.setCustomInfo("frmQRFromAccount", {
      "fromaccounts": accounts
    });
    navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRFromAccount" });
  };

  /**
  * Errorcallback of getList api.
  *
  * Shows a toast message in top of the current form.
  * 
  * @param {Object} error     Contains error message and other fields.
  */
  QR_PresentationController.prototype.fromAccountsPresentationErrorCallBack = function (error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    }
    else {
      var currentForm = kony.application.getCurrentForm().id;
      var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
      controller.bindGenericError(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage"));
    }
  };

  /**
  * returns savings and checkings accounts.
  * 
  * @param {Object} fromAccounts     Contains array of internal accounts.
  * 
  * @return {Object} Returns array of savings and checkings accounts.
  */
  QR_PresentationController.prototype.getSavingsAndCheckingsAccounts = function (fromAccounts) {
    return fromAccounts.filter(function (account) {
      return (account.accountType !== "Loan" && account.accountType !== "CreditCard" &&
        account.accountType !== "Deposit" && account.externalIndicator !== "true" &&
        (account.accountType === "Savings" || account.accountType === "Checking"));
    });
  };

  /**
  * sets the selected from account fields in transaction object.
  * 
  * @param {Object} selectedFromAccount     holds the from account selection.
  */
  QR_PresentationController.prototype.setFromAccountsForTransactions = function (selectedFromAccount) {
    var trasMan = applicationManager.getTransactionManager();
    trasMan.setTransactionAttribute("fromAccountNumber", selectedFromAccount.accountID);
    trasMan.setTransactionAttribute("fromAccountName", selectedFromAccount.accountName);
    trasMan.setTransactionAttribute("fromProcessedName", selectedFromAccount.processedName);
    trasMan.setTransactionAttribute("fromProcessedAvailableBalance", selectedFromAccount.availableBalance);
    if (selectedFromAccount.fromAccountCurrency) {
      trasMan.setTransactionAttribute("fromAccountCurrency", selectedFromAccount.fromAccountCurrency);
      trasMan.setTransactionAttribute("transactionCurrency", selectedFromAccount.fromAccountCurrency);
    }
    else {
      trasMan.setTransactionAttribute("fromAccountCurrency", selectedFromAccount.currencyCode);
      trasMan.setTransactionAttribute("transactionCurrency", selectedFromAccount.currencyCode);
    }
  };

  /**
  * processes the accounts data to set in the segment.
  * 
  * @param {Object} data     Contains array of internal accounts.
  * 
  * @return {Object} Returns array of processed accounts.
  */
  QR_PresentationController.prototype.processAccountsData = function (data) {
    var accProcessedData = [];
    for (var i = 0; i < data.length; i++) {
      accProcessedData[i] = {};
      var name = "";
      name = data[i].accountName;
      accProcessedData[i].accountName = data[i].accountName;
      accProcessedData[i].nickName = data[i].nickName;
      accProcessedData[i].availableBalance = scope_QRPresentationController.getAvailableBalanceCurrencyString(data[i]);
      accProcessedData[i].accountID = data[i].accountID;
      accProcessedData[i].bankName = (data[i].bankName) ? data[i].bankName.trim() : data[i].bankName;
      accProcessedData[i].accountBalanceType = kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
      accProcessedData[i].accountType = data[i].accountType;
      accProcessedData[i].fromAccountCurrency = data[i].currencyCode;
      accProcessedData[i].toAccountCurrency = data[i].currencyCode;
      accProcessedData[i].fromAccountBalance = data[i].availableBalance;
      accProcessedData[i].accountPreference = data[i].accountPreference;
      accProcessedData[i].transactionMode = data[i].transactionMode;
      accProcessedData[i].processedName = applicationManager.getPresentationUtility().formatText(name, 10, data[i].accountID, 4);
      accProcessedData[i].nextPaymentDate = data[i].nextPaymentDate;
      accProcessedData[i].nextPaymentAmount = data[i].nextPaymentAmount;
      accProcessedData[i].paymentDue = data[i].paymentDue;
      accProcessedData[i].accountTypeFlx = { isVisible: false };
      accProcessedData[i].flximgBankIcon = { isVisible: false };
      accProcessedData[i].imgBankIcon = { isVisible: false };
      accProcessedData[i].membershipID = data[i].Membership_id;
      accProcessedData[i].membershipName = data[i].MembershipName;
      accProcessedData[i].isBusinessAccount = data[i].isBusinessAccount;
      accProcessedData[i].flximgBank = { isVisible: false };
      accProcessedData[i].flxAccountType = { isVisible: false };
    }
    return accProcessedData;
  };

  /**
  * return the formatted amount along with the currency code.
  * 
  * @param {Object} data     holds the account object.
  * 
  * @return {String}  formatted amount with currency code.
  */
  QR_PresentationController.prototype.getAvailableBalanceCurrencyString = function (data) {
    var forUtility = applicationManager.getFormatUtilManager();
    var currencyCode = data["currencyCode"];
    return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
  };

  /**
  * process the internal accounts data for grouping purpose based on the account type.
  * 
  * @param {Object} data     Contains array of internal accounts.
  * 
  * @return {Object} Returns processed accounts.
  */
  QR_PresentationController.prototype.processViewFormattedData = function (data) {
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

  /**
  * sort the groups based on their priority defined in configuration manager.
  * 
  * @param {Object} data     holds the group names as key and respective accounts collection as value.
  * 
  * @return {Object} Returns grouped prioritized accouunts.
  */
  QR_PresentationController.prototype.orderByPriority = function (data) {
    var cm = applicationManager.getConfigurationManager();
    var prioritizedData = {};
    var metaData = cm.getAccountTypesMetaData();
    for (var key in metaData) {
      if (data[metaData[key].backendValue]) {
        prioritizedData[metaData[key].backendValue] = data[metaData[key].backendValue];
      }
    }
    return prioritizedData;
  };

  /**
  * sort the accounts based on their account preference.
  * 
  * @param {Object} accountsCollection     Contains array of internal accounts.
  * 
  * @return {Object} Returns sorted accounts.
  */
  QR_PresentationController.prototype.sortByPrefrence = function (accountsCollection) {
    if (accountsCollection.length > 1) accountsCollection.sort(function (record1, record2) {
      return record1.accountPreference - record2.accountPreference;
    });
    return accountsCollection;
  };

  /**
  * process the internal accounts data for grouping purpose based on the account type.
  * 
  * Groups internal accounts into personal or business accounts
  * 
  * @param {Object} data     Contains array of internal accounts.
  * 
  * @return {Object} Returns grouped accounts.
  */
  QR_PresentationController.prototype.processDataMembershipNameWise = function (data) {
    var userPrefManager = applicationManager.getUserPreferencesManager();
    var personalID = userPrefManager.primaryCustomerId;
    var personal = false;
    var others = false;

    for (var i = 0; i < data.length; i++) {
      if (data[i].isBusinessAccount == "true") {
        others = true;
      }
      else {
        personal = true;
      }
    }

    function isPersonal(id) {
      if (personalID && (id == personalID.id) && personalID.type === "personal") {
        return true;
      }
      else
        return false;
    }
    var processedData = {}

    for (var i = 0; i < data.length; i++) {
      if (personal && others) {
        data[i].flxAccountType = { "isVisible": true };
        data[i].src = data[i].isBusinessAccount === "true" ? "businessaccount.png" : "personalaccount.png";
      }
      else {
        data[i].flxAccountType = { "isVisible": false };
      }
      if (isPersonal(data[i].membershipID)) {
        if (!processedData.hasOwnProperty("Personal Accounts")) {
          processedData["Personal Accounts"] = [];
        }
        if (processedData.hasOwnProperty("Personal Accounts")) {
          processedData["Personal Accounts"].push(data[i]);
        }
      }
      else {
        if (!processedData.hasOwnProperty(data[i].membershipName)) {
          processedData[data[i].membershipName] = [];
        }
        if (processedData.hasOwnProperty(data[i].membershipName)) {
          processedData[data[i].membershipName].push(data[i]);
        }
      }

    }

    return processedData;
  };

  /**
  * checks whether provided value is either empty , null or undefined.
  * 
  * @param {} value     Contains any value.
  * 
  * @return {Boolean} Returns true or false.
  */
  QR_PresentationController.prototype.isEmptyOrNullOrUndefined = function (value) {
    var valueCheck = (value === "" || value === null || value === undefined) ? true : false;
    return valueCheck;
  };

  /**
  * returns transaction object.
  * 
  * @return {Object} Returns transaction object.
  */
  QR_PresentationController.prototype.getTransObject = function () {
    var transMan = applicationManager.getTransactionManager();
    var obj = transMan.getTransactionObject();
    return obj;
  };

  /**
  * sets the amount in transaction object.
  * 
  * @param {String} amount     Contains amount.
  */
  QR_PresentationController.prototype.setAmount = function (amount) {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("amount", amount);
  };

  /**
  * Calls getList api inorder to fetch the latest balance.
  * 
  * @param {String} accountId     Contains accountId.
  */
  QR_PresentationController.prototype.getLatestBalance = function (accountId) {
    var accountManager = applicationManager.getAccountManager();
    applicationManager.getPresentationUtility().showLoadingScreen();
    accountManager.fetchInternalAccounts(scope_QRPresentationController.latestBalancePresentationSuccessCallBack.bind(this, accountId),
      scope_QRPresentationController.fromAccountsPresentationErrorCallBack);
  };

  /**
  * Successcallback of getlist api for latest balance.
  * 
  * Sets the available balance in transaction object for the given account Id and navigates to QR Scan form.
  * 
  * @param {String} accountId     Contains array of internal accounts.
  * @param {Object} res     Contains array of internal accounts.
  */
  QR_PresentationController.prototype.latestBalancePresentationSuccessCallBack = function (accountId, res) {
    var navMan = applicationManager.getNavigationManager();
    var accounts = res;
    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].account_id === accountId) {
        var trasMan = applicationManager.getTransactionManager();
        var formattedBalance = scope_QRPresentationController.getFormattedAmount(accounts[i].availableBalance, accounts[i].currencyCode);
        trasMan.setTransactionAttribute("fromProcessedAvailableBalance", formattedBalance);
      }
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
  };

  /**
  * Sets the required fields of default account in transaction object.
  * 
  * @param {String} accountId     Contains accountId.
  */
  QR_PresentationController.prototype.getProcessedDefaultAccDetails = function (accountId) {
    var accountManager = applicationManager.getAccountManager();
    var internalAccounts = accountManager.internalAccounts;
    var defaultAcc = internalAccounts.filter(function (account) {
      return (account.accountID === accountId);
    });
    var trasMan = applicationManager.getTransactionManager();
    trasMan.setTransactionAttribute("fromAccountNumber", defaultAcc[0].accountID);
    trasMan.setTransactionAttribute("fromAccountName", defaultAcc[0].accountName);
    trasMan.setTransactionAttribute("fromProcessedName", applicationManager.getPresentationUtility().formatText(defaultAcc[0].accountName, 10, defaultAcc[0].accountID, 4));
    trasMan.setTransactionAttribute("fromAccountCurrency", defaultAcc[0].currencyCode);
    trasMan.setTransactionAttribute("transactionCurrency", defaultAcc[0].currencyCode);
  };

  /**
  * Sets the segment data in acknowledgement screen.
  * 
  * @return {Object} Returns array of objects.
  */
  QR_PresentationController.prototype.getAcknowledgmentScreenData = function () {
    var segData = [];
    var transObj = scope_QRPresentationController.getTransObject();

    if (!kony.sdk.isNullOrUndefined(transObj.referenceId)) {
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ReferenceID"),
        "value": transObj.referenceId
      });
    }
    else if (!kony.sdk.isNullOrUndefined(transObj.transactionId)) {
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.i18n.common.transactionID"),
        "value": transObj.transactionId
      });
    }
    segData.push({
      "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.from"),
      "value": transObj.fromProcessedName
    }, {
      "property": applicationManager.getPresentationUtility().getStringFromi18n("i18n.common.To"),
      "value": transObj.toProcessedName
    });
    return segData;
  };

  /**
  * calls createQR paymemt api.
  */
  QR_PresentationController.prototype.makeATransfer = function () {
    var transactionManager = applicationManager.getTransactionManager();
    var request = scope_QRPresentationController.getRequestPayload();
    transactionManager.createQRPayment(request, this.presentationMakeATransferSuccess, this.presentationMakeATransferError);
  };

  /**
  * successcallback of createqrpayment api.
  * 
  * Navigates to acknowledgement screen.
  * 
  * @param {Object} response     Contains details returned by the api like referenceID and other fields.
  */
  QR_PresentationController.prototype.presentationMakeATransferSuccess = function (response) {
    if (!response.referenceId) {
      errmsg = {
        errorMessage: kony.i18n.getLocalizedString("kony.error.StandardErrorMessage")
      };
      scope_QRPresentationController.presentationMakeATransferError(errmsg);
    }
    else {
      var transactionManager = applicationManager.getTransactionManager();
      var navMan = applicationManager.getNavigationManager();
      if (response.referenceId) {
        transactionManager.setTransactionAttribute("referenceId", response.referenceId);
      }
      navMan.navigateTo("frmQRAcknowledgement");
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };

  /**
  * errorcallback of createqrpayment api.
  * 
  * Navigates to acknowledgement screen.
  * 
  * @param {Object} response     Contains details returned by the api like errMsg and other fields.
  */
  QR_PresentationController.prototype.presentationMakeATransferError = function (response) {
    if (response["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
    } else {
      var transactionManager = applicationManager.getTransactionManager();
      var navMan = applicationManager.getNavigationManager();
      if (response.serverErrorRes.errorDetails) {
        var errorDetails = JSON.parse(response.serverErrorRes.errorDetails);
        if (errorDetails != null && errorDetails != "")
          transactionManager.setTransactionAttribute("errmsg", errorDetails);
      } else {
        var formattedResponse = [];
        var errMsg = {};
        errMsg.errorMessage = response.errorMessage;
        errMsg.imgIcon = " ";
        formattedResponse.push(errMsg)
        transactionManager.setTransactionAttribute("errmsg", formattedResponse);
      }
      navMan.navigateTo("frmQRAcknowledgement");
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };

  /**
  * sets the request payload required to make qr payment create call.
  * 
  * @return {Object} Returns payload containing mandatory fields.
  */
  QR_PresentationController.prototype.getRequestPayload = function () {
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    var param = {
      "fromAccountNumber": transObj.fromAccountNumber,
      "toAccountNumber": transObj.toAccountNumber,
      "amount": transObj.amount,
      "fromAccountName": transObj.fromAccountName,
      "toAccountName": transObj.toAccountName,
      "notes": transObj.notes || "",
      "fromAccountCurrency": transObj.fromAccountCurrency,
      "transactionCurrency": transObj.transactionCurrency
    };
    return param;
  };

  /**
  * calls ActivateQRPayment api.
  */
  QR_PresentationController.prototype.activateQRPayment = function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var params = {};
    params = { "userName": applicationManager.getUserPreferencesManager().getUserName() };
    applicationManager.getUserPreferencesManager().activateQRPayment(
      params,
      scope_QRPresentationController.activateQRPresentationSuccessCallBack,
      scope_QRPresentationController.fromAccountsPresentationErrorCallBack);
  };

  /**
  * Successcallback of ActivateQRPayment api.
  * 
  * Updates the selected default account for qr payments.
  * 
  * @param {Object} response     Contains fields returned by the api like status.
  */
  QR_PresentationController.prototype.activateQRPresentationSuccessCallBack = function (response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_QRPresentationController.updateQRPaymentPreferredAccount();
  };

  /**
  * Clears the transaction object.
  */
  QR_PresentationController.prototype.clearTransObj = function () {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.clearTransferObject();
  };

  /**
  * calls the updateQRpreferredaccount api.
  */
  QR_PresentationController.prototype.updateQRPaymentPreferredAccount = function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    var params = {};
    params = {
      "userName": applicationManager.getUserPreferencesManager().getUserName(),
      "default_from_account_qr": transObj.fromAccountNumber
    };
    applicationManager.getUserPreferencesManager().updateQRPaymentPreferredAccount(
      params,
      scope_QRPresentationController.updateQRPreferredAccPresentationSuccessCallBack,
      scope_QRPresentationController.fromAccountsPresentationErrorCallBack);
  };

  /**
  * Successcallback of updateQRpreferredaccount api.
  * 
  * Navigates to qr payments dashboard screen.
  */
  QR_PresentationController.prototype.updateQRPreferredAccPresentationSuccessCallBack = function () {
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRPaymentsLanding" });
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };

  /**
  * returns the formatted amount based on locale with comma or dot notation.
  * 
  * @param {String} amountValue  Amount.
  * 
  * @return {Object} Returns formattedamount.
  */
  QR_PresentationController.prototype.getFormattedAmountWithOutCurrency = function (amountValue) {
    var scope = this;
    if (amountValue) {
      amountValue = amountValue.replace(/[^0-9\.-]+/g, "");
      return scope.formatUtils.formatData("AMOUNT_WITHOUT_CURRENCY", amountValue);
    }
    return "";
  };

  /**
  * returns the formatted amount with currency icon based on locale with comma or dot notation.
  * 
  * @param {String} amountValue  Amount.
  * @param {String} currency     Currency.
  * 
  * @return {Object} Returns formattedamount.
  */
  QR_PresentationController.prototype.getFormattedAmount = function (amountValue, currency) {
    var scope = this;
    if (amountValue) {
      return scope.formatUtils.formatData("AMOUNT", amountValue, currency);
    }
    return "";
  };
  return QR_PresentationController;
});