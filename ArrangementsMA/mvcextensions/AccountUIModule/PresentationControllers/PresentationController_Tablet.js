define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController", "dataFormatUtility"], function(AsyncManager, dataFormater) {
    function Account_PresentationController() {
        scope_Acc_Pres = this;
        kony.mvc.Presentation.BasePresenter.call(this);
        this.asyncManager = new AsyncManager();
      /**   numberOfAsyncForTransactions
          *  1.getAccountPendingTransactions
          *  2.getAccountPostedTransactions
            */
        scope_Acc_Pres.numberOfAsyncForTransactions=2;
      /**   numberOfAsyncForPFMGraph
          *  1.getPFMBarGraph
          *  2.getPFMBudgetGraph
            */
       scope_Acc_Pres.numberOfAsyncForPFMGraph=2;
        this.directMarketingManager = applicationManager.getDirectMarketingManager();
    }
    inheritsFrom(Account_PresentationController, kony.mvc.Presentation.BasePresenter);
    Account_PresentationController.prototype.initializePresentationController = function() {
    };
    Account_PresentationController.prototype.navigateToManageExternalAccounts = function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmManageExternalAccounts");
    };
    /**
     * fetch the List of External Accounts added in our app.
     * @member of Account_PresentationController
     * @param {data} data containing username of the signed in user.
     */
    Account_PresentationController.prototype.fetchExternalAccountsData = function(username) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start Account_PresentationController : fetchExternalAccountsData ####");
            applicationManager.getPresentationUtility().showLoadingScreen();
            var accountManager = applicationManager.getAccountManager();
            accountManager.fetchExternalAccounts(username, scope_Acc_Pres.presentationExtAccountsSucc, scope_Acc_Pres.presentationExtAccountsErr);
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    };
    /**
     * Success callback function for fetchExternalAccounts call.
     * @member of AccountManager
     * @param {data} data containing success response.
     */
    Account_PresentationController.prototype.presentationExtAccountsSucc = function(sucResponse) {
		for(var i in sucResponse) {
            sucResponse[i].displayAccountName = sucResponse[i].AccountName + "..." + String(sucResponse[i].Number).substr(-4);
        }
        var externalAccountsData = dataFormater.makeGroupsWithMultipleKeys(["AccountHolder", "BankName"], sucResponse);
        var formattedData = [];
        for (var i in externalAccountsData) {
            var sectionData = [];
            var accoutHeader = {};
            var errorString;
            for (var j in externalAccountsData[i]) {
                errorString = externalAccountsData[i][j]['error'];
                if (errorString && (errorString !== undefined && String(errorString).trim() !== "")) {
                    accoutHeader.errorLogo = {
                        src: "erroricon.png",
                        isVisible:true
                    };
                    break;
                }
            }
            accoutHeader.AccountHolder = externalAccountsData[i][0]['AccountHolder'];
            accoutHeader.BankName = externalAccountsData[i][0]['BankName'];
            accoutHeader.BankLogo = {
                src: externalAccountsData[i][0]['BankLogo']
            };
            sectionData.push(accoutHeader);
            sectionData.push(externalAccountsData[i]);
            formattedData.push(sectionData);
        }
        if (formattedData && formattedData != undefined && formattedData != "") {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmManageExternalAccounts", formattedData);
        }
        scope_Acc_Pres.navigateToManageExternalAccounts();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    /**
     * Error callback function for fetchExternalAccounts call.
     * @member of AccountManager
     * @param {data} data containing error response.
     */
    Account_PresentationController.prototype.presentationExtAccountsErr = function(errResponse) {
        scope_Acc_Pres.navigateToManageExternalAccounts();
    };
    Account_PresentationController.prototype.navigateToExternalAccountsData = function() {
        this.fetchExternalAccountsData();
    };
    /**
     * fetch the  External banks.
     * @member of AccountManager
     */
    Account_PresentationController.prototype.navigateToSelectExternalBanks = function() {
        var accountObj = applicationManager.getAccountManager();
        accountObj.fetchExternalBanks(scope_Acc_Pres.presentationExternalBanksFetchSuccess, scope_Acc_Pres.presentationExternalBanksFetchError);
    };
    /**
     * Success callback function for fetchExternalBanks call.
     * @member of AccountManager
     * @param {data} data containing username of the signed in user, username for the external bank, id of the external bank.
     */
    Account_PresentationController.prototype.presentationExternalBanksFetchSuccess = function(data) {
        var navManager = applicationManager.getNavigationManager();
        var formattedData = scope_Acc_Pres.processExternalBanksData(data);
        navManager.setCustomInfo("frmSelectExternalBank", formattedData);
        navManager.navigateTo("frmSelectExternalBank");
        //return ExternalBanksData;
    };
    /**
     * Error callback function for fetchExternalBanks call.
     * @member of AccountManager
     * @param {data} data containing the error response.
     */
    Account_PresentationController.prototype.presentationExternalBanksFetchError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        kony.print("error finding external banks");
        //generic error callback
    };
    /**
     * helper function for formatting list of external banks in required format.
     * @member of AccountManager
     * @param {data} data containing list of external banks.
     * @returns {Array} returns array of external banks in required format.
     */
    Account_PresentationController.prototype.processExternalBanksData = function(data) {
        var secData = [];
        for (var i = 0; i < data.length; i++) {
            secData[i] = {};
            secData[i].bankName = data[i].BankName;
            secData[i].logo = {
                src: data[i].logo
            };
            secData[i].identityProvider = data[i].IdentityProvider;
            secData[i].isOauth2 = data[i].Oauth2;
            secData[i].bankId = data[i].id;
        }
        var externalBanksProcessedData = [];
        var sectionJson = {
            headerName: kony.i18n.getLocalizedString("kony.mb.common.allBanks")
        };
        var sectionFinal = [];
        sectionFinal.push(sectionJson);
        sectionFinal.push(secData);
        externalBanksProcessedData.push(sectionFinal);
        return externalBanksProcessedData;
    };
    /**
     * fetch the  Accounts in external banks.
     * @member of AccountManager
     * @param {data} data containing username of the signed in user, username for the external bank, id of the external bank.
     */
    Account_PresentationController.prototype.fetchOtherBankAccounts = function(inputData) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start Account_PresentationController : fetchExternalAccountsData ####");
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navigationManager = applicationManager.getNavigationManager();
            navigationManager.setCustomInfo("frmSelectExternalAccounts_BankIdAndUserNameInfo", inputData);
            var accountManager = applicationManager.getAccountManager();
            accountManager.fetchAccountsFromAnExternalBank(inputData, scope_Acc_Pres.fetchOtherBankAccountsSuccess, scope_Acc_Pres.fetchOtherBankAccountsError);
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    };
    /**
     * Success callback function for Account_PresentationController:fetchOtherBankAccounts.
     * @member of AccountManager
     * @param {data} data containing success response.
     */
    Account_PresentationController.prototype.fetchOtherBankAccountsSuccess = function(successsResponse) {
        var navManager = applicationManager.getNavigationManager();
        var formattedData = scope_Acc_Pres.processOtherBankAccountsData(successsResponse);
        navManager.setCustomInfo("frmSelectExternalAccounts", formattedData);
        scope_Acc_Pres.navigateToSelectExternalAccountsForm();
    };
    /**
     * Eror callback function for Account_PresentationController:fetchOtherBankAccounts.
     * @member of AccountManager
     * @param {data} data containing error response.
     */
    Account_PresentationController.prototype.fetchOtherBankAccountsError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        kony.print("error finding accounts of the external bank");
    };
    /**
     * helper function to format accounts data of an external bank in required form.
     * @member of Account_PresentationController
     * @param {data} data containing account details of an external bank.
     * @returns {Array} - Array of accounts in external bank.
     */
    Account_PresentationController.prototype.processOtherBankAccountsData = function(data) {
        var secData = [];
        var configManager = applicationManager.getConfigurationManager();
        for (var i = 0; i < data.length; i++) {
            secData[i] = {};
            secData[i].AccountName = data[i].AccountName;
            secData[i].checkImage= "checkboxtick.png";
            secData[i].AccountType = data[i].TypeDescription;
            if ((data[i].TypeDescription.toLowerCase().trim() === (configManager.getConstantValue('SAVINGS')).toLowerCase()) || (data[i].TypeDescription.toLowerCase().trim() === (configManager.getConstantValue('CHECKING')).toLowerCase())) {
              secData[i].AvailableBalanceLabel = kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
            } else if ((data[i].TypeDescription.toLowerCase().trim() === (configManager.getConstantValue('DEPOSIT')).toLowerCase()) || (data[i].TypeDescription.toLowerCase().trim() === (configManager.getConstantValue('CREDITCARD')).toLowerCase())) {
              secData[i].AvailableBalanceLabel = kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
            } else if ((data[i].TypeDescription.toLowerCase().trim() === (configManager.getConstantValue('LOAN')).toLowerCase()) || (data[i].TypeDescription.toLowerCase().trim() === (configManager.getConstantValue('MORTGAGE')).toLowerCase())) {
              secData[i].AvailableBalanceLabel = kony.i18n.getLocalizedString("kony.mb.accdetails.outstandingBal");
            } else {
              secData[i].AvailableBalanceLabel = kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
            }
            var formatManager = applicationManager.getFormatUtilManager();
            var availableBalance = formatManager.formatAmount(parseFloat(data[i].AvailableBalance).toFixed(2), ",");
            secData[i].AvailableBalanceWithCurrency = configManager.getCurrencyCode() + availableBalance;
            secData[i].AvailableBalance = availableBalance;
            secData[i].CurrencyCode = data[i].CurrencyCode;
            secData[i].Number = data[i].Number;
            secData[i].bank_id = data[i].Bank_id;
            secData[i].Type_id = data[i].Type_id;
            secData[i].AccountHolder = data[i].AccountHolder;
        }
        var externalBanksProcessedData = [];
        var sectionJson = {
            headerName: "Available accounts"
        };
        var sectionFinal = [];
        sectionFinal.push(sectionJson);
        sectionFinal.push(secData);
        externalBanksProcessedData.push(sectionFinal);
        return externalBanksProcessedData;
    };
    /**
     * navigates to the frmSelectExternalAccounts form.
     * @member of Account_PresentationController
     */
    Account_PresentationController.prototype.navigateToSelectExternalAccountsForm = function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start Account_PresentationController : navigateToSelectExternalAccountsForm ####");
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmSelectExternalAccounts");
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    };
    /** fetch the List of External Accounts added in our app.
     * @member of Account_PresentationController
     * @param {data} data containing username of the signed in user.
     */
    Account_PresentationController.prototype.fetchSingleExternalAccountDetails = function(inputDetails) {
        var loggerManager = applicationManager.getLoggerManager();
        function presentationExtAccountsSuccess(successResponse) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (successResponse && (successResponse !== undefined && successResponse !== "" && successResponse.length > 0)) {
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("frmExternalAccountDetails", successResponse);
                navManager.navigateTo("frmExternalAccountDetails");
            }
        }
        function presentationExtAccountsError(errorResponse) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            kony.print("error finding accounts of the external bank");
        }
        try {
            loggerManager.log("#### start Account_PresentationController : fetchExternalAccountsData ####");
            applicationManager.getPresentationUtility().showLoadingScreen();
            var accountManager = applicationManager.getAccountManager();
            accountManager.fetchExternalAccountDetails(inputDetails, presentationExtAccountsSuccess, presentationExtAccountsError);
        } catch (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    };
    /**
     * delete external account
     * @member of Account_PresentationController
     * @param {data} data containing username of the signed in user.
     */
    Account_PresentationController.prototype.deleteExternalAccount = function(inputDetails, successCallback, failureCallback) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start Account_PresentationController : deleteExternalAccount ####");
            var accountManager = applicationManager.getAccountManager();
            accountManager.deleteExternalAccount(inputDetails, successCallback, failureCallback);
        } catch (err) {
            loggerManager.log("#### in catch of Account_PresentationController : deleteExternalAccount" + JSON.stringify(err) + " ####");
        }
    };
    Account_PresentationController.prototype.saveExternalAccountsAndNavigateToManageExternalAccounts = function(selectedData, successCallback, failureCallBack) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start Account_PresentationController : saveExternalAccountsAndNavigateToManageExternalAccounts ####");
            var accData = {};
            accData.AccountName = "";
            accData.main_user = "";
            accData.bank_id = "";
            accData.username = "";
            accData.CurrencyCode = "";
            accData.AvailableBalance = "";
            accData.Number = "";
            accData.Type_id = "";
            accData.AccountHolder = "";
            var userManager = applicationManager.getUserPreferencesManager();
            var mainUser = userManager.getUserName();
            for (var i in selectedData) {
                accData.AccountName = accData.AccountName + selectedData[i].AccountName + ",";
                accData.main_user = accData.main_user + mainUser + ",";
                accData.bank_id = accData.bank_id + selectedData[i].bank_id + ",";
                accData.CurrencyCode = accData.CurrencyCode + selectedData[i].CurrencyCode + ",";
                selectedData[i].AvailableBalance = selectedData[i].AvailableBalance.replace(/\,/g,"");
                accData.AvailableBalance = accData.AvailableBalance + selectedData[i].AvailableBalance + ",";
                accData.Number = accData.Number + selectedData[i].Number + ",";
                accData.Type_id = accData.Type_id + selectedData[i].Type_id + ",";
                accData.AccountHolder = accData.AccountHolder + selectedData[i].AccountHolder + ",";
                accData.username = accData.username + selectedData[i].userName + ",";
            }
            accData.loop_count = (++i).toString();
            accData.AccountName = accData.AccountName.slice(0, -1);
            accData.main_user = accData.main_user.slice(0, -1);
            accData.bank_id = accData.bank_id.slice(0, -1);
            accData.username = accData.username.slice(0, -1);
            accData.CurrencyCode = accData.CurrencyCode.slice(0, -1);
            accData.AvailableBalance = accData.AvailableBalance.slice(0, -1);
            accData.Number = accData.Number.slice(0, -1);
            accData.Type_id = accData.Type_id.slice(0, -1);
            accData.AccountHolder = accData.AccountHolder.slice(0, -1);
            var accountManager = applicationManager.getAccountManager();
            accountManager.addExternalAccounts(accData, successCallback, failureCallBack);
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    };
    /**
     * update external account nickName
     * @member of Account_PresentationController
     * @param {data} data containing Account_id and updated NickName of the signed in user.
     */
    Account_PresentationController.prototype.patialUpdateExternalAccount = function(inputDetails, successCallback, failureCallback) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start Account_PresentationController : updateExternalAccount ####");
            var accountManager = applicationManager.getAccountManager();
            accountManager.partialUpdateExternalAccount(inputDetails, successCallback, failureCallback);
        } catch (err) {
            loggerManager.log("#### in catch of Account_PresentationController : updateExternalAccount" + JSON.stringify(err) + " ####");
        }
    };
    Account_PresentationController.prototype.processAccountsData = function(data) {
        var accProcessedData = [];
        for (var i = 0; i < data.length; i++) {
            accProcessedData[i] = {};
            accProcessedData[i].accountName = data[i].accountName;
            accProcessedData[i].availableBalance = this.getAvailableBalanceCurrencyString(data[i]);
            accProcessedData[i].accountID = data[i].accountID;
            accProcessedData[i].bankName = data[i].bankName;
            accProcessedData[i].accountBalanceType = this.getAvailableBalanceType(data[i]);
            accProcessedData[i].accountType=data[i].accountType;
            accProcessedData[i].nickName=data[i].nickName;
        }
        return accProcessedData;
    };
    Account_PresentationController.prototype.getAvailableBalanceCurrencyString = function(data) {
        var forUtility = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        switch (data.accountType) {
            case configManager.constants.SAVINGS:
                return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"]);
            case configManager.constants.CHECKING:
                return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"]);
            case configManager.constants.CREDITCARD:
                return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"]);
            case configManager.constants.DEPOSIT:
                return forUtility.formatAmountandAppendCurrencySymbol(data["currentBalance"]);
            case configManager.constants.MORTGAGE:
                return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"]);
            case configManager.constants.LOAN:
                return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"]);
            default:
                return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"]);
        }
    };
    Account_PresentationController.prototype.getAvailableBalanceType = function(data) {
        var configManager = applicationManager.getConfigurationManager();
        switch (data.accountType) {
            case configManager.constants.SAVINGS:
                return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
            case configManager.constants.CHECKING:
                return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
            case configManager.constants.CREDITCARD:
                return kony.i18n.getLocalizedString("kony.mb.accdetails.outstandingBal");
            case configManager.constants.DEPOSIT:
                return kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
            case configManager.constants.MORTGAGE:
                return kony.i18n.getLocalizedString("kony.mb.accdetails.outstandingBal");
            case configManager.constants.LOAN:
                return kony.i18n.getLocalizedString("kony.mb.accdetails.outstandingBal");
            default:
                return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
        }
    };
    Account_PresentationController.prototype.fetchAccountTransactions = function(selectedAccountId) {
        var navMan = applicationManager.getNavigationManager();
        var selectedAccount = navMan.getCustomInfo("frmAccountDetails");
      	if(selectedAccount === undefined || selectedAccount === null)
          selectedAccount = {};
        var accountManager = applicationManager.getAccountManager();
        selectedAccount.selectedAccountData = accountManager.getInternalAccountByID(selectedAccountId);
        selectedAccount.selectedAccountData.type = "internal";
        navMan.setCustomInfo("frmAccountDetails", selectedAccount);
        scope_Acc_Pres.asyncManager.initiateAsyncProcess(scope_Acc_Pres.numberOfAsyncForTransactions);
        Account_PresentationController.prototype.selectedAccountId = selectedAccountId;
        var transactionObj = applicationManager.getTransactionManager();
        var criteria1 = {
            "accountID": selectedAccountId
        };
        transactionObj.fetchAccountPendingTransactions(criteria1, scope_Acc_Pres.fetchAccountPenTranPresSucCallback, scope_Acc_Pres.fetchAccountPenTranPreErrCallback);
        var criteria2 = {
             "accountID": selectedAccountId
           };
        transactionObj.fetchAccountPostedTransactions(criteria2, scope_Acc_Pres.fetchAccountPosTranPresSucCallback, scope_Acc_Pres.fetchAccountPosTranErrCallback);
    };
    Account_PresentationController.prototype.fetchAccountPenTranPresSucCallback = function(resTransPend) {
        scope_Acc_Pres.asyncManager.setSuccessStatus(0, resTransPend);
        if (scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForTransactions)) {
            scope_Acc_Pres.navigateToAccountDetails();
        }
    };
    Account_PresentationController.prototype.fetchAccountPenTranPreErrCallback = function(resTransPendErr) {
        scope_Acc_Pres.asyncManager.setErrorStatus(0, resTransPendErr);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(resTransPendErr["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPendErr);
    };
    Account_PresentationController.prototype.fetchAccountPosTranPresSucCallback = function(resTransPost) {
        scope_Acc_Pres.asyncManager.setSuccessStatus(1, resTransPost);
        if (scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForTransactions)) {
            scope_Acc_Pres.navigateToAccountDetails();
        }
    };
    Account_PresentationController.prototype.fetchAccountPosTranErrCallback = function(resTransPostErr) {
        scope_Acc_Pres.asyncManager.setErrorStatus(1, resTransPostErr);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(resTransPostErr["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPostErr);
    };
    Account_PresentationController.prototype.fetchAccountExternalTransactions = function(mainUser, userName, bankId, account, accountDetailsObj) {
        var navMan = applicationManager.getNavigationManager();
        var selectedAccount = accountDetailsObj;
        selectedAccount.mainUser = mainUser;
        selectedAccount.userName = userName;
        selectedAccount.bankId = bankId;
        selectedAccount.account = account;
        navMan.setCustomInfo("frmAccountDetails", selectedAccount);
        var transactionObj = applicationManager.getTransactionManager();
        var params = kony.mvc.Expression.and(
            kony.mvc.Expression.eq("main_user", mainUser),
            kony.mvc.Expression.eq("username", userName),
            kony.mvc.Expression.eq("bank_id", bankId),
            kony.mvc.Expression.eq("account", account)
        );
        transactionObj.fetchAccountPostedExternalTransactions(params, scope_Acc_Pres.fetchAccountExternalPosTranSucCallback, scope_Acc_Pres.fetchAccountExternalPosTranErrCallback);
    };
    Account_PresentationController.prototype.fetchAccountExternalPosTranSucCallback = function(resTransPost) {
        //alert(JSON.stringify(resTransPost));
        scope_Acc_Pres.navigateToExternalAccountDetails(resTransPost);
    };
    Account_PresentationController.prototype.fetchAccountExternalPosTranErrCallback = function(resTransPostErr) {
        kony.ui.Alert("Error fetching Transactions");
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
      Account_PresentationController.prototype.navigateToAccountDetails = function(res) {
        var navMan = applicationManager.getNavigationManager();
        var formatUtil = applicationManager.getFormatUtilManager();
        var accountManager = applicationManager.getAccountManager();
        var selectedAccount = navMan.getCustomInfo("frmAccountDetails");
        selectedAccount.pendingTransactions = scope_Acc_Pres.asyncManager.getData(0);
        selectedAccount.postedTransaction = scope_Acc_Pres.asyncManager.getData(1);
        for (var i = 0; i < selectedAccount.pendingTransactions.length; i++) {
         if(selectedAccount.pendingTransactions[i]["isScheduled"] === "true")
            var trandateobj=formatUtil.getDateObjectfromString(selectedAccount.pendingTransactions[i]["scheduledDate"],"YYYY-MM-DD");
           else
            var trandateobj=formatUtil.getDateObjectfromString(selectedAccount.pendingTransactions[i]["transactionDate"],"YYYY-MM-DD");
            selectedAccount.pendingTransactions[i]["scheduledDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.APPLICATION_DATE_FORMAT)
            selectedAccount.pendingTransactions[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(selectedAccount.pendingTransactions[i]["amount"]);
        }
        for (var i = 0; i < selectedAccount.postedTransaction.length; i++) {
           if(selectedAccount.postedTransaction[i]["isScheduled"] === "true")
             var trandateobj=formatUtil.getDateObjectfromString(selectedAccount.postedTransaction[i]["scheduledDate"],"YYYY-MM-DD");
           else
            var trandateobj=formatUtil.getDateObjectfromString(selectedAccount.postedTransaction[i]["transactionDate"],"YYYY-MM-DD");
            selectedAccount.postedTransaction[i]["scheduledDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.APPLICATION_DATE_FORMAT)
            selectedAccount.postedTransaction[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(selectedAccount.postedTransaction[i]["amount"]);
        }
        navMan.setCustomInfo("frmAccountDetails", selectedAccount);
        navMan.navigateTo("frmAccountDetails");
    };
   Account_PresentationController.prototype.navigateToExternalAccountDetails = function(res) {
        var navMan = applicationManager.getNavigationManager();
        var formatUtil = applicationManager.getFormatUtilManager();
        var accountManager = applicationManager.getAccountManager();
        var externalTransactionObj = {};
        var externalPendingTransactions = [];
        var externalPostedTransactions = [];
        var selectedAccountData = navMan.getCustomInfo("frmAccountDetails");
        for (var i = 0; i < res.length; i++) {
            var data = {};
            if (res[i].Status === "COMPLETED") {
                data = res[i];
                externalPostedTransactions.push(data);
            } else {
                data = res[i];
                externalPendingTransactions.push(data);
            }
        }
        for (var i = 0; i < externalPostedTransactions.length; i++) {
            var trandateobj = formatUtil.getDateObjectfromString(externalPostedTransactions[i]["TransactionDate"], "YYYY-MM-DD");
            externalPostedTransactions[i]["TransactionDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.APPLICATION_DATE_FORMAT);
            externalPostedTransactions[i]["Amount"] = formatUtil.formatAmountandAppendCurrencySymbol(externalPostedTransactions[i]["Amount"]);
        }
        for (var i = 0; i < externalPendingTransactions.length; i++) {
            var trandateobj = formatUtil.getDateObjectfromString(externalPendingTransactions[i]["TransactionDate"], "YYYY-MM-DD");
            externalPendingTransactions[i]["TransactionDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.APPLICATION_DATE_FORMAT)
            externalPendingTransactions[i]["Amount"] = formatUtil.formatAmountandAppendCurrencySymbol(externalPendingTransactions[i]["Amount"]);
        }
        externalTransactionObj.externalPendingTransactions = externalPendingTransactions;
        externalTransactionObj.externalPostedTransactions = externalPostedTransactions;
        externalTransactionObj.selectedAccountData = selectedAccountData;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        navMan.setCustomInfo("frmAccountDetails", externalTransactionObj);
        navMan.navigateTo("frmAccountDetails");
    };
    Account_PresentationController.prototype.fetchAccountStataments = function() {
        var statedata = {};
        var navMan = applicationManager.getNavigationManager();
        var accDet = navMan.getCustomInfo("frmAccountDetails");
        var accountId = accDet.selectedAccountData.accountID;
        statedata.accountdata = accDet.selectedAccountData;
        var navMan = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        navMan.setCustomInfo("frmAccStatements", statedata);
        navMan.navigateTo("frmAccStatements");
    };
    Account_PresentationController.prototype.fetchAccountStatamentsLink = function(params) {
        var accStatementObj = applicationManager.getAccountManager();
        accStatementObj.fetchAccountStatments(params, this.statementsPresentationSuccessCallback, this.statementsPresentationErrorCallback);
    };
    Account_PresentationController.prototype.statementsPresentationSuccessCallback = function(res) {
         applicationManager.getPresentationUtility().dismissLoadingScreen();
        kony.application.openURL(res[0]["StatementLink"]);
    };
    Account_PresentationController.prototype.statementsPresentationErrorCallback = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        kony.print("error in statementsPresentationErrorCallback ");
          if(error["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    };
    Account_PresentationController.prototype.editAccountNickName = function(accountNickName) {
        var navMan = applicationManager.getNavigationManager();
        var accDetails = navMan.getCustomInfo("frmAccountDetails")
        var accData = (navMan.getCustomInfo("frmAccountDetails")).selectedAccountData;
        var data = {
            "accountID": accData.accountID,
            "nickName": accountNickName
        };
        var accountManager = applicationManager.getAccountManager();
        var isExternalAccount = accData.type === "external" ? true : false;
        if(isExternalAccount){
          var accountId = accData.accountID;
          var userName = accData.userName;
          var bankId = parseInt(accData.bankId,10);
          var accountName = accData.account;
          var mainUser = applicationManager.getUserPreferencesManager().getUserName();
          var loopCount = "1";
          var records = {
            "Account_id" :accountId,
            "NickName" : accountNickName,
            "main_user" : mainUser,
            "username" : userName,
            "bank_id" : bankId,
            "AccountName" : accountName,
            "loop_count" :loopCount
          };
          accountManager.partialUpdateExternalAccount(records, function(){
            scope_Acc_Pres.fetchInfoForExternalBankAccount();
          }, scope_Acc_Pres.editNickNamePresError);
        }
        else {
          navMan.setCustomInfo("frmAccInfoEdit", data.nickName);
          accountManager.updateNickName(data, scope_Acc_Pres.editNickNamePresSucc, scope_Acc_Pres.editNickNamePresError);
        }
    };
    Account_PresentationController.prototype.editNickNamePresSucc = function(res) {
        var navMan = applicationManager.getNavigationManager();
        var accData = navMan.getCustomInfo("frmAccInfoEdit");
        var accDetails = navMan.getCustomInfo("frmAccountDetails");
        accDetails.selectedAccountData.nickName = accData;
        navMan.setCustomInfo("frmAccountDetails", accDetails);
        var accountManager = applicationManager.getAccountManager();
        accountManager.updateNickNameLocally(accData);
        navMan.goBack();
    };
    Account_PresentationController.prototype.editNickNamePresError = function(err) {
        kony.print("error in edit nick Name" + err);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(err["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    };
    Account_PresentationController.prototype.getTotalAvailableBalance = function(data) {
        var forUtility = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        var totalBalance = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].accountType == configManager.constants.SAVINGS || data[i].accountType == configManager.constants.CHECKING)
                totalBalance = totalBalance + parseInt(data[i]["availableBalance"]);
        }
        return forUtility.formatAmountandAppendCurrencySymbol(totalBalance);
    };
    Account_PresentationController.prototype.getTotalDebtBalance = function(data) {
//         var forUtility = applicationManager.getFormatUtilManager();
//         var configManager = applicationManager.getConfigurationManager();
//         var totalDebt = 0;
//         for (i = 0; i < data.length; i++) {
//             if (data[i].accountType == configManager.constants.CREDITCARD)
//                 totalDebt = totalDebt + parseInt(data[i]["currentBalance"]);
//         }
//         return forUtility.formatAmountandAppendCurrencySymbol(totalDebt);
       var forUtility = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        var totalDebt = 0;
        var currencyCode;
        for (i = 0; i < data.length; i++) {
            if (data[i].accountType == configManager.constants.CREDITCARD) totalDebt = totalDebt + parseInt(data[i]["currentBalance"]);
        }
        if(data.length > 0){
            currencyCode = data[0]["currencyCode"];
        }
        return forUtility.formatAmountandAppendCurrencySymbol(totalDebt,currencyCode);
    };
    Account_PresentationController.prototype.showDashboard = function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var accountManager = applicationManager.getAccountManager();
        accountManager.fetchInternalAccounts(scope_Acc_Pres.presentationAccountsSucc, scope_Acc_Pres.presentationAccountsErr);
    };
    Account_PresentationController.prototype.presentationAccountsSucc = function(res) {
      var navManger = applicationManager.getNavigationManager();
      var accountObj = applicationManager.getAccountManager();
      var accountData = accountObj.getInternalAccounts();
      var custominfo = navManger.getCustomInfo("frmDashboard");
      if(!custominfo){
        custominfo = {};
      }
      custominfo.accountData = accountData;
      navManger.setCustomInfo("frmDashboard", custominfo);
      navManger.navigateTo("frmDashboardAggregated");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    Account_PresentationController.prototype.presentationAccountsErr = function(err) {
        kony.print(err);
       applicationManager.getPresentationUtility().dismissLoadingScreen();
      	if(error["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    };
    Account_PresentationController.prototype.fetchAccountsRealTime = function(user_id, getAccountsRealTimeSuccess, getAccountsRealTimeError) {
        function fetchAccountsRealTimeSuccess(response) {
            scope_Acc_Pres.updateDashboardAggregatedData(response, getAccountsRealTimeSuccess);
        }
        function fetchAccountsRealTimeFailure(response) {
            var logger = applicationManager.getLoggerManager();
            logger.log(response);
            if (getAccountsRealTimeError && typeof getAccountsRealTimeError === "function") {
                getAccountsRealTimeError();
            }
        }
        var accountManager = applicationManager.getAccountManager();
        accountManager.getUserAccountsRealTime(user_id, fetchAccountsRealTimeSuccess, fetchAccountsRealTimeFailure);
    };
    Account_PresentationController.prototype.updateDashboardAggregatedData = function(accountsResponse, callback) {
      var navManager = applicationManager.getNavigationManager();
      var custominfo = navManager.getCustomInfo("frmDashboardAggregated");
      if(!custominfo){
        custominfo = {};
      }
      custominfo.accountData = accountsResponse;
      navManager.setCustomInfo("frmDashboardAggregated", custominfo);
      if (callback !== null && callback !== undefined && typeof callback === "function") {
        callback();
      }
    };
    Account_PresentationController.prototype.fetchInfoForExternalBankAccount = function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var loggerManager = applicationManager.getLoggerManager();
        loggerManager.log("----Start: Account_PresentationController.prototype.fetchInfoForExternalBankAccount----");
        var navManager = applicationManager.getNavigationManager();
        var accountsDetails = navManager.getCustomInfo("frmAccountDetails");
        function success(accountID, res) {
            if(res && Array.isArray(res) && res.length > 0) {
                var isFound = false;
                for(var i in res) {
                    if(String(res[i].Account_id).trim() === accountID) {
                        accountsDetails.selectedAccountData.externalAccountDetails = res[i];
                        isFound = true;
                        break;
                    }
                }
                if(isFound) {
                    navManager.setCustomInfo("frmAccountInfo", accountsDetails);
                    navManager.navigateTo("frmAccountInfo");
                } else {
                    error("Something went wrong: Can't retrieve account info");
                }
            } else {
                error("Something went wrong: Can't retrieve account info");
                applicationManager.getPresentationUtility().dismissLoadingScreen();
            }
        }
        function error(err) {
            kony.ui.Alert(err);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
        try {
            var selectedAccount = accountsDetails.selectedAccountData;
            var accountID = String(accountsDetails.selectedAccountData.accountID).trim();
            var accountManager = applicationManager.getAccountManager();
            accountManager.getSingleAccountDetails(selectedAccount.mainUser, selectedAccount.userName, selectedAccount.bankId, selectedAccount.account, success.bind(this, accountID), error.bind(this));
        } catch(err) {
            loggerManager.log("----In catch: Account_PresentationController.prototype.fetchInfoForExternalBankAccount: " + JSON.stringify(err) + "----")
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
        loggerManager.log("----End: Account_PresentationController.prototype.fetchInfoForExternalBankAccount----");
    };
    Account_PresentationController.prototype.fetchSingleAccountDetails = function(user_id, username, bank_id, account, successCallback) {
        var accountManager = applicationManager.getAccountManager();
        accountManager.getSingleAccountDetails(user_id, username, bank_id, account, successCallback, this.fetchSingleAccountDetailsFailureCallback.bind(this));
    };
    Account_PresentationController.prototype.fetchSingleAccountDetailsFailureCallback = function(error) {
        kony.ui.Alert("Error in fetching account details");
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
  	Account_PresentationController.prototype.fetchPFMDetails = function(){
     	applicationManager.getPresentationUtility().showLoadingScreen();
     	var monthId = "1";
    	var accountManager = applicationManager.getAccountManager();
        scope_Acc_Pres.asyncManager.initiateAsyncProcess(scope_Acc_Pres.numberOfAsyncForPFMGraph);
		accountManager.getPFMBarGraphData(scope_Acc_Pres.barGraphSuccessCallback,scope_Acc_Pres.barGraphFailureCallback);
		accountManager.getPFMBudgetGraphData(scope_Acc_Pres.budgetGraphSuccessCallback,scope_Acc_Pres.budgetGraphFailureCallback);
  };
  Account_PresentationController.prototype.barGraphSuccessCallback = function(response){
    	var accountManager = applicationManager.getAccountManager();
    	var pieData = {};
    	var monthName = "";
    	var emptyMonths= 0;
    	for(i=0;i<response.length;i++){
		  accountManager.getPFMPieChartData(response[i].monthId,successCallback,failureCallback);
        }
    	function successCallback(pieResponse){
          if(!pieResponse.length){
            emptyMonths++;
          }
          else{
            pieData[pieResponse[0].monthName] = pieResponse;
          }
          if(Object.keys(pieData).length+emptyMonths === response.length){
				scope_Acc_Pres.asyncManager.setSuccessStatus(0,response);
	  			scope_Acc_Pres.navigateToPFMMyMoney(pieData);
          }
        }
    	function failureCallback(){
          kony.ui.Alert("Something went wrong");
        }
  };
  Account_PresentationController.prototype.fetchMonthPFMData = function(monthId,successCallback,failureCallback){
    	var accountManager = applicationManager.getAccountManager();
    	accountManager.getPFMPieChartData(monthId,successCallback,failureCallback);
  };
  Account_PresentationController.prototype.barGraphFailureCallback = function(response){
    scope_Acc_Pres.asyncManager.setErrorStatus(0,response);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Account_PresentationController.prototype.budgetGraphSuccessCallback = function(response){
        scope_Acc_Pres.asyncManager.setSuccessStatus(1, response);
    	 if(scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForPFMGraph)){
  			scope_Acc_Pres.navigateToPFMMyMoney();
			}
  };
  Account_PresentationController.prototype.budgetGraphFailureCallback = function(response){
    scope_Acc_Pres.asyncManager.setErrorStatus(1, response);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Account_PresentationController.prototype.navigateToPFMMyMoney = function(pieData){
    var navManager = applicationManager.getNavigationManager();
    var pfmData = {
      				"pie":pieData,
                   "bar":scope_Acc_Pres.asyncManager.getData(0),
                   "budget":scope_Acc_Pres.asyncManager.getData(1)
    };
	applicationManager.getPresentationUtility().dismissLoadingScreen();
    navManager.setCustomInfo("frmPFMMyMoney",pfmData);
    navManager.navigateTo("frmPFMMyMoney");
  };
  Account_PresentationController.prototype.getPFMTransactions = function(inputParams,successCallback,failureCallback){
     var accountManager = applicationManager.getAccountManager();
	accountManager.getPFMTransactions(inputParams,successCallback,failureCallback);
  };
  Account_PresentationController.prototype.updatePFMTransaction = function(transactionRecord,successCallback,failureCallback){
    var accountManager = applicationManager.getAccountManager();
    accountManager.updatePFMTransaction(transactionRecord,successCallback,failureCallback);
  };
  Account_PresentationController.prototype.getPFMCategories = function(successCallback,failureCallback){
      var accountManager = applicationManager.getAccountManager();
      accountManager.getPFMCategories(successCallback,failureCallback);
  };
 Account_PresentationController.prototype.fetchExternalAccounts = function(user_id, getAccountsRealTimeSuccess, getAccountsRealTimeError) {
        function fetchExternalAccountsSuccess(response) {
            scope_Acc_Pres.updateDashboardAggregatedData(response, getAccountsRealTimeSuccess);
        }
        function fetchExternalAccountsFailure(response) {
            var logger = applicationManager.getLoggerManager();
            logger.log(response);
            if (getAccountsRealTimeError && typeof getAccountsRealTimeError === "function") {
                getAccountsRealTimeError();
            }
        }
        var accountManager = applicationManager.getAccountManager();
        accountManager.getUserAccounts(user_id,fetchExternalAccountsSuccess,fetchExternalAccountsFailure);
    };
  Account_PresentationController.prototype.fetchAccountDashboardCampaignsForAggregatedDashboard = function(){
    var logger = applicationManager.getLoggerManager();
   	var navManager = applicationManager.getNavigationManager();
   	var custominfo = navManager.getCustomInfo("frmDashboardAggregated");
      if(!custominfo){
        custominfo = {};
      }
   	custominfo.accountDashboardCampaignData = [];
   	if (!scope_Acc_Pres.directMarketingManager.areAccountDashboardCampaignsFetched()) {
        scope_Acc_Pres.directMarketingManager.getAccountDashboardCampaigns(scope_Acc_Pres.fetchAccountDashboardCampaignsPresentationSuccessCallback, scope_Acc_Pres.fetchAccountDashboardCampaignsPresentationErrorCallback);
    } else {
        var accountDashboardCampaignsData = scope_Acc_Pres.directMarketingManager.getAccountDashboardCampaigns();
        var maxNumOfAccountDashboardCampaigns = scope_Acc_Pres.directMarketingManager.getMaxNumOfAccountDashboardCampaigns();
        if (accountDashboardCampaignsData.length > maxNumOfAccountDashboardCampaigns) {
            logger.log("###Account dashboard Campaign's count exceeded maxNumOfAds : " + maxNumOfAccountDashboardCampaigns + " \n####Therefore Hiding them");
        } else if (accountDashboardCampaignsData.length === 0) {
            logger.log("###Account dashboard Campaign's count is 0 \n####Therefore Hiding them");
        } else {
            logger.log("###Succesfully fetched Account Dashboard Campaigns");
            custominfo.accountDashboardCampaignData = accountDashboardCampaignsData;
        }
        navManager.setCustomInfo("frmDashboardAggregated", custominfo);
        navManager.navigateTo("frmDashboardAggregated");
    }
   };
  Account_PresentationController.prototype.fetchAccountDashboardCampaigns = function(){
   var logger = applicationManager.getLoggerManager();
   var navManager = applicationManager.getNavigationManager();
   var accMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
   var custominfo = navManager.getCustomInfo("frmDashboard");
      if(!custominfo){
        custominfo = {};
      }
   custominfo.accountDashboardCampaignData = [];
   if (!scope_Acc_Pres.directMarketingManager.areAccountDashboardCampaignsFetched()) {
      scope_Acc_Pres.directMarketingManager.getAccountDashboardCampaigns(scope_Acc_Pres.fetchAccountDashboardCampaignsPresentationSuccessCallback, scope_Acc_Pres.fetchAccountDashboardCampaignsPresentationErrorCallback);
    } else {
      var accountDashboardCampaignsData = scope_Acc_Pres.directMarketingManager.getAccountDashboardCampaigns();
      var maxNumOfAccountDashboardCampaigns = scope_Acc_Pres.directMarketingManager.getMaxNumOfAccountDashboardCampaigns();
      if (accountDashboardCampaignsData.length > maxNumOfAccountDashboardCampaigns) {
        logger.log("###Account dashboard Campaign's count exceeded maxNumOfAds : " + maxNumOfAccountDashboardCampaigns + " \n####Therefore Hiding them");
      } else if (accountDashboardCampaignsData.length === 0) {
        logger.log("###Account dashboard Campaign's count is 0 \n####Therefore Hiding them");
      } else {
        logger.log("###Succesfully fetched Account Dashboard Campaigns");
        custominfo.accountDashboardCampaignData = accountDashboardCampaignsData;
      }
      navManager.setCustomInfo("frmDashboardAggregated", custominfo);
      navManager.navigateTo("frmDashboardAggregated");
    }
   };
   Account_PresentationController.prototype.fetchAccountDashboardCampaignsPresentationSuccessCallback = function(successResponse) {
      var navManager = applicationManager.getNavigationManager();
      var custominfo = navManager.getCustomInfo("frmDashboardAggregated");
      if(!custominfo){
        custominfo = {};
      }
      var logger = applicationManager.getLoggerManager();
      var accountDashboardCampaignsData = successResponse;
      var maxNumOfAccountDashboardCampaigns = scope_Acc_Pres.directMarketingManager.getMaxNumOfAccountDashboardCampaigns();
      custominfo.accountDashboardCampaignData = [];
      if (accountDashboardCampaignsData.length > maxNumOfAccountDashboardCampaigns) {
        logger.log("###Account dashboard Campaign's count exceeded maxNumOfAds : " + maxNumOfAccountDashboardCampaigns + " \n####Therefore Hiding them");
      } else if (accountDashboardCampaignsData.length === 0) {
        logger.log("###Account dashboard Campaign's count is 0 \n####Therefore Hiding them");
      } else {
        logger.log("###Succesfully fetched Account Dashboard Campaigns");
        custominfo.accountDashboardCampaignData = accountDashboardCampaignsData;
      }
      navManager.setCustomInfo("frmDashboardAggregated", custominfo);
      navManager.navigateTo("frmDashboardAggregated");
   };
   Account_PresentationController.prototype.fetchAccountDashboardCampaignsPresentationErrorCallback = function(errorResponse) {
      var navManager = applicationManager.getNavigationManager();
      var custominfo = navManager.getCustomInfo("frmDashboardAggregated");
      if(!custominfo){
        custominfo = {};
      }
      var logger = applicationManager.getLoggerManager();
      logger.log("###In Error callback while fetching Account Dashboard Campaigns : "+errorResponse+"\n####Therefore Not Showing them");
      custominfo.accountDashboardCampaignData = [];
      navManager.setCustomInfo("frmDashboardAggregated", custominfo);
      navManager.navigateTo("frmDashboardAggregated");
   };
   Account_PresentationController.prototype.sendDmResponseForInfeedAds = function(navId){
    var sessionId = scope_Acc_Pres.directMarketingManager.getPostLoginAdsSessionId();
    var paramObj = {"sessionId" : sessionId,"navigationId" : navId};
    scope_Acc_Pres.directMarketingManager.sendDmResponse(paramObj,scope_Acc_Pres.sendDmResponseForInfeedAdsSuccessCallback,scope_Acc_Pres.sendDmResponseForInfeedAdsErrorCallback);
  };
   Account_PresentationController.prototype.sendDmResponseForInfeedAdsSuccessCallback = function(successResponse){
    var logger = applicationManager.getLoggerManager();
    logger.log("###Succesfully sent metrics to DMEngine");
  };
   Account_PresentationController.prototype.sendDmResponseForInfeedAdsErrorCallback = function(errorResponse){
    var logger = applicationManager.getLoggerManager();
    logger.log("###Error in sending metrics to DMEngine : "+errorResponse);
  };
  Account_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo(formName);
  };
  Account_PresentationController.prototype.setEntryPoints=function(transactionType)
  {
    var navMan=applicationManager.getNavigationManager();
    switch(transactionType)
      {
        case "InternalTransfer":  navMan.setEntryPoint("makeatransfer","frmAccountDetails");
                                        break;
        case "ExternalTransfer":  navMan.setEntryPoint("makeatransfer","frmAccountDetails");
                                        break;
        case "P2P":  navMan.setEntryPoint("payaperson","frmAccountDetails");
                                        break;
         case "Deposit":  navMan.setEntryPoint("Deposit","frmAccountDetails");
                                        break;
         case "Cardless":  navMan.setEntryPoint("cancelCardlessTransaction","frmAccountDetails");
                                        break;
         case "BillPay":  navMan.setEntryPoint("payBill","frmAccountDetails");
                                        break;
      }
  };
    return Account_PresentationController;
});