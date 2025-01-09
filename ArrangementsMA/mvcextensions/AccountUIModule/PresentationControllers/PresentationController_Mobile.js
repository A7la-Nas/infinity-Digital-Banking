define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController", "dataFormatUtility", "CommonUtilities"], function(AsyncManager, dataFormater, CommonUtilities) {
    function Account_PresentationController() {
        scope_Acc_Pres = this;
        kony.mvc.Presentation.BasePresenter.call(this);
        this.asyncManager = new AsyncManager();
      /**   numberOfAsyncForTransactions
          *  1.getAccountPendingTransactions
          *  2.getAccountPostedTransactions
            */
        scope_Acc_Pres.numberOfAsyncForTransactions=2;
        scope_Acc_Pres.numberOfAsyncForAccounts=2;
        scope_Acc_Pres.numberOfAsyncForDetails=3;
        scope_Acc_Pres.codeVerifier = "";
      /**   numberOfAsyncForPFMGraph
          *  1.getPFMBarGraph
          *  2.getPFMBudgetGraph
          *  3.getPFMPieChartData
            */
       scope_Acc_Pres.numberOfAsyncForPFMGraph=3;
      downloadtransactionDetails="";
      scope_Acc_Pres.blockedFundsData= [];
      scope_Acc_Pres = this;
      scope_Acc_Pres.transactionsData = null;
      scope_Acc_Pres.blockedFundsData = null;
       /**   numberOfAsyncForUserTransactions
            *  1.getPendingUserTransactions
            *  2.getPostedUserTransactions
              */
      scope_Acc_Pres.numberOfAsyncForUserTransactions=2;
      scope_Acc_Pres.formName="";
      scope_Acc_Pres.closureRequestPayload = {};
      //  this.directMarketingManager = applicationManager.getDirectMarketingManager();
    }
    inheritsFrom(Account_PresentationController, kony.mvc.Presentation.BasePresenter);
    Account_PresentationController.prototype.initializePresentationController = function() {
    };
    Account_PresentationController.prototype.navigateToManageExternalAccounts = function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmManageExternalAccounts");
    };
      /**
       * Method to get bank date
       */

      Account_PresentationController.prototype.getBankDate = function () {
        applicationManager.getRecipientsManager().fetchBankDate({}, this.getBankDateSuccess.bind(this), this.getBankDateFailure.bind(this));
      };
      /**
       * get bank date Success Callback
       */
      Account_PresentationController.prototype.getBankDateSuccess = function (response) {
        this.bankDate = response.date[0];
      };
      Account_PresentationController.prototype.getTransactDate = function (response) {
        return this.bankDate;
      };
      /**
       * get bank date Failure Callback
       */
      Account_PresentationController.prototype.getBankDateFailure = function (response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
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
            accountManager.fetchExternalAccountsData(username, scope_Acc_Pres.presentationExtAccountsSucc, scope_Acc_Pres.presentationExtAccountsErr);
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    };
    /**
     * Success callback function for fetchExternalAccountsData call.
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
            if (externalAccountsData[i][0]['BankLogo'] && !kony.sdk.isNullOrUndefined(externalAccountsData[i][0]['BankLogo']) && String(externalAccountsData[i][0]['BankLogo']).trim() !== "") {
              accoutHeader.BankLogo = {
                src: externalAccountsData[i][0]['BankLogo']
              };
            }
            else {
              accoutHeader.BankLogo = {
                src: "",
                isVisible:false
              };
            }
            sectionData.push(accoutHeader);
            sectionData.push(externalAccountsData[i]);
            formattedData.push(sectionData);
        }
        if (formattedData) {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmManageExternalAccounts", formattedData);
        }
        scope_Acc_Pres.navigateToManageExternalAccounts();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    /**
     * Error callback function for fetchExternalAccountsData call.
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
        if(err["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
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
     	scope_Acc_Pres.getTermsandConditions();
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
  * get Terms and conditions
  */
  	Account_PresentationController.prototype.getTermsandConditions = function(){
     var config = applicationManager.getConfigurationManager();
    var locale=config.getLocale();
    var termsAndConditions=config.getTermsAndConditions();
     var param={
     "languageCode": termsAndConditions[locale],
      "termsAndConditionsCode": termsAndConditions["AccountAggregation"]
   };
    var termsAndConditions = applicationManager.getTermsAndConditionsManager();
    termsAndConditions.fetchTermsAndConditionsPostLogin(param,scope_Acc_Pres.getTermsandConditionsSuccessCallBack,scope_Acc_Pres.getTermsandConditionsErrorCallback);
  };
   Account_PresentationController.prototype.getTermsandConditionsSuccessCallBack = function(response){
    var navManager = applicationManager.getNavigationManager();
     var configManager= applicationManager.getConfigurationManager();
    // navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll"});
    navManager.setCustomInfo("frmSupportInfo",{"richTextData":"<font face='SourceSansPro-Regular'>"+response.termsAndConditionsContent,"flowType":"AccountAggregation","contentTypeID":response.contentTypeId,"header":configManager.constants.TERMS});
   };
  Account_PresentationController.prototype.getTermsandConditionsErrorCallback = function(err){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
		 if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
   	 }else{
              var controller = applicationManager.getPresentationUtility().getController('frmSelectExternalAccounts', true);
            var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
            controller.bindViewError(errorMsg);
        }
   };
   
     // below method gets the base64 string of cheques image
  Account_PresentationController.prototype.viewImage = function(param) {
	applicationManager.getAccountManager().getBaseImage(param, this.successImageDetails.bind(this, param), this.failImageDetails.bind(this, param));
  };
  
  Account_PresentationController.prototype.successImageDetails = function( param, response) {
	var controller = applicationManager.getPresentationUtility().getController('frmAccountsTransactionDetails', true);
    if(param.transactionType === "Cheque"){
      if(param.page === "0"){
        controller.checkDraftFrontImgEnable(response);
      }
      else{
        controller.checkBackImgEnable(response);
      }
    }
    if(param.transactionType === "Draft"){
      controller.checkDraftFrontImgEnable(response);
    }
    if(param.transactionType === "SwiftPayment"){
      controller.ExternalTransferRefernceBtnEnable();
    }
    
  };  
  Account_PresentationController.prototype.failImageDetails = function( param, response) {
	var controller = applicationManager.getPresentationUtility().getController('frmAccountsTransactionDetails', true);
	if(param.transactionType === "Cheque"){
      if(param.page === "0"){
        controller.checkDraftFrontImgDisable();
      }
      else{
        controller.checkBackImgDisable();
      }
    }
    if(param.transactionType === "Draft"){
      controller.checkDraftFrontImgDisable();
    }
    if(param.transactionType === "SwiftPayment"){
      controller.ExternalTransferRefernceBtnDisable();
    }
  };
  /*
  	below method is used to download the cheques pdf for cheque and swift payment transactions
  */
  Account_PresentationController.prototype.downloadChequeFile = function(params,formname) {
		var navMan = applicationManager.getNavigationManager();
        var requestParam = navMan.getCustomInfo(formname);
        requestParam.page = params.page;
        requestParam.customerId = params.customerId;
		requestParam.accountId = params.accountId;
        requestParam.transactionRef = params.transactionId;
        requestParam.transactionType = params.transactionType; 		
		requestParam.mediaType = params.mediaType;
		var am = applicationManager.getAccountManager();
        var chequeurl = am.getChequeDownloadURL(requestParam);
		kony.application.openURL(chequeurl);
    }; 
   
  	Account_PresentationController.prototype.downloadTransactionFile = function(params,formname) {
        var navMan = applicationManager.getNavigationManager();
        var requestParam = navMan.getCustomInfo(formname);
        var userManager = applicationManager.getUserPreferencesManager();
        var requestParamAccount = navMan.getCustomInfo("frmAccountDetails");
        var configurationManager = applicationManager.getConfigurationManager();
        requestParam.transactionId = params.transactionId;
        requestParam.generatedBy = userManager.getUserName();
        requestParam.fileType = params.format;
        requestParam.accountNumber=requestParamAccount.selectedAccountData.accountID;
        requestParam.accountName=requestParamAccount.selectedAccountData.accountName;
        requestParam.searchTransactionType=params.searchTransactionType;
        var dateFormat = configurationManager.getDateFormat();
        if (dateFormat) {
          requestParam.dateFormat = dateFormat;
        }
        this.downloadtransactionDetails = requestParam;
        requestParam.transactionDetails = JSON.stringify(params.transactionDetails);
        applicationManager.getAccountManager().generateTransactionDetails(requestParam, this.generateTransactionDetailsSuccess.bind(this), this.generateTransactionDetailsFailure.bind(this));
    };
  Account_PresentationController.prototype.downloadLoanScheduleFile = function(params) {
      var navMan = applicationManager.getNavigationManager();
      var requestParamAccount = navMan.getCustomInfo("frmAccountDetails");
      var userManager = applicationManager.getUserPreferencesManager();
      var requestParam ={};

      requestParam.generatedBy = userManager.getUserName();
      requestParam.fileType = params.format;
      requestParam.accountNumber = requestParamAccount.selectedAccountData.accountID;
      requestParam.accountName = requestParamAccount.selectedAccountData.accountName;
      requestParam.installmentType = params.installmentType;
      requestParam.searchTransactionType = params.transactionType;
      requestParam.title = "Loan Schedule";

      var configurationManager = applicationManager.getConfigurationManager();
      var dateFormat = configurationManager.getDateFormat();
      requestParam.dateFormat = dateFormat;
	  this.downloadtransactionDetails = requestParam;
      applicationManager.getAccountManager().generateTransactionDetails(requestParam, this.generateTransactionDetailsSuccess.bind(this), this.generateTransactionDetailsFailure.bind(this));
    };
  
    Account_PresentationController.prototype.downloadTransactions = function(){
      var navMan=applicationManager.getNavigationManager();
      var searchData =  navMan.getCustomInfo("frmAdvanceSearch");
      var userManager = applicationManager.getUserPreferencesManager();
      searchData.generatedBy = userManager.getUserName();
      searchData.title="Transactions";
      this.downloadtransactionDetails = searchData;
      applicationManager.getAccountManager().generateTransactionDetails(searchData, this.generateTransactionDetailsSuccess.bind(this), this.generateTransactionDetailsFailure.bind(this));

   };
  Account_PresentationController.prototype.generateTransactionDetailsSuccess = function(successResponse) {
     var searchData={};
      searchData.fileId=successResponse.fileId;
      searchData.fileType = this.downloadtransactionDetails.fileType;
      var am = applicationManager.getAccountManager();
      var pdfurl = am.getDownloadTransctionURL(searchData);
      kony.application.openURL(pdfurl);
    };

    Account_PresentationController.prototype.generateTransactionDetailsFailure = function(error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    Account_PresentationController.prototype.downloadEstatements = function(requestParam, successCallBack, failureCallBack){
      applicationManager.getAccountManager().getFileidForEstatements(requestParam, successCallBack, failureCallBack);
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
      var configManager = applicationManager.getConfigurationManager();
      var dualBalanceConfig = CommonUtilities.CLIENT_PROPERTIES.DUAL_BALANCE;
      if (!kony.sdk.isNullOrUndefined(dualBalanceConfig)) {
        dualBalanceConfig = JSON.parse(CommonUtilities.CLIENT_PROPERTIES.DUAL_BALANCE);
      } else {
        dualBalanceConfig = {
          "isAvailableBalanceToBeDisplayed": true,
          "isCurrentBalanceToBeDisplayed": false
        }
      }
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
      var accProcessedData = [];
      var balanceType = "";
      var imgIcon = "";
      var balanceTypeVisiblity = false;
      var forUtility = applicationManager.getFormatUtilManager();
      for (var i = 0; i < data.length; i++) {
        accProcessedData[i] = {};
        accProcessedData[i].accountName = data[i].accountName;
        accProcessedData[i].availableBalance = this.getAvailableBalanceCurrencyString(data[i]);
        if (data[i].accountType === configManager.constants.SAVINGS || data[i].accountType === configManager.constants.CHECKING) {
          accProcessedData[i].balaceToShow = data[i].availableBalance;
        } else if (data[i].accountType === configManager.constants.CREDITCARD || data[i].accountType === configManager.constants.DEPOSIT) {
          accProcessedData[i].balaceToShow = data[i].currentBalance;
        } else if (data[i].accountType === configManager.constants.MORTGAGE || data[i].accountType === configManager.constants.LOAN) {
          accProcessedData[i].balaceToShow = data[i].outstandingBalance;
        }
        accProcessedData[i].accountID = data[i].Account_id;
        accProcessedData[i].maskedAccountNumber = "...."+data[i].Account_id.substr((data[i].Account_id).length - 4);
        accProcessedData[i].bankName = data[i].bankName;
        accProcessedData[i].accountBalanceType = this.getAvailableBalanceType(data[i]);
        accProcessedData[i].MembershipName = data[i].MembershipName;
        accProcessedData[i].Membership_id = data[i].Membership_id;
        accProcessedData[i].accountType = data[i].accountType;
        accProcessedData[i].isBusinessAccount = data[i].isBusinessAccount;
        accProcessedData[i].nickName = kony.sdk.isNullOrUndefined(data[i].nickName) ? " " : (data[i].nickName).substr(0, 25).trim();
        accProcessedData[i].currencyCode = data[i].currencyCode;
        accProcessedData[i].flxStatus = {
        "isVisible" : !kony.sdk.isNullOrUndefined(data[i].accountStatus)? (data[i].accountStatus.toUpperCase() == "CLOSED" ? true : false): false
        }
        if (!isSingleCustomerProfile) {
          if(profileAccess!== "both"){
            if (!kony.sdk.isNullOrUndefined(dualBalanceConfig.isAvailableBalanceToBeDisplayed) &&
                !kony.sdk.isNullOrUndefined(dualBalanceConfig.isCurrentBalanceToBeDisplayed)) {
              if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === true &&
                  dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
                accProcessedData[i].template = "flxAccountsNoImageEuro";
              }
			  else if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === false &&
                  dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
                accProcessedData[i].template = "flxAccountsNoImageCur";
              }
			  else {
                accProcessedData[i].template = "flxAccountsNoImage";
              }
            } else {
              accProcessedData[i].template = "flxAccountsNoImage";
            }
          }else {
            if (!kony.sdk.isNullOrUndefined(dualBalanceConfig.isAvailableBalanceToBeDisplayed) &&
                !kony.sdk.isNullOrUndefined(dualBalanceConfig.isCurrentBalanceToBeDisplayed)) {
              if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === true &&
                  dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
                accProcessedData[i].template = "flxCombinedAccountsEuro";
              }
			  else if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === false &&
                  dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
                accProcessedData[i].template = "flxCombinedAccountsCur";
              }
			  else {
                accProcessedData[i].template = "flxCombinedAccounts";
              }
            } else {
              accProcessedData[i].template = "flxCombinedAccounts";
            }

          }

        } else {
          if (!kony.sdk.isNullOrUndefined(dualBalanceConfig.isAvailableBalanceToBeDisplayed) &&
              !kony.sdk.isNullOrUndefined(dualBalanceConfig.isCurrentBalanceToBeDisplayed)) {
            if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === true &&
                dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
              accProcessedData[i].template = "flxAccountsNoImageEuro";
            }
			else if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === false &&
                  dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
                accProcessedData[i].template = "flxAccountsNoImageCur";
              }
			else {
              accProcessedData[i].template = "flxAccountsNoImage";
            }
          } else {
            accProcessedData[i].template = "flxAccountsNoImage";
          }
        }
        accProcessedData[i].flxBankIcon = {
          "isVisible": false
        };
        if (!isSingleCustomerProfile) {
           if(profileAccess!== "both"){
            imgIcon = "";
            accProcessedData[i].imgAccountType = {
              "isVisible" : false
            };
            accProcessedData[i].flxAccountType = {
              "isVisible" : false
            };
          }else {
            imgIcon = data[i].isBusinessAccount === "false" ? "personalaccount.png" : "businessaccount.png"
            accProcessedData[i].imgAccountType = {
              "src" : imgIcon,
              "isVisible" : true
            };
            accProcessedData[i].flxAccountType = {
              "isVisible" : true
            };
          }
        } else {
          imgIcon = "";
          accProcessedData[i].imgAccountType = {
            "isVisible" : false
          };
          accProcessedData[i].flxAccountType = {
            "isVisible" : false
          };
        }
        accProcessedData[i].currentBalanceForDual = data[i].currentBalance;
        if (configManager.constants.SAVINGS === data[i].accountType) {
          balanceType = kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
          balanceTypeVisiblity = true;
          accProcessedData[i].currentBalanceForDual = {
            "text": forUtility.formatAmountandAppendCurrencySymbol(data[i].currentBalance, data[i].currencyCode),
            "isVisible": true
          }
        } else if (configManager.constants.CHECKING === data[i].accountType) {
          balanceType = kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
          balanceTypeVisiblity = true;
          accProcessedData[i].currentBalanceForDual = {
            "text": forUtility.formatAmountandAppendCurrencySymbol(data[i].currentBalance, data[i].currencyCode),
            "isVisible": true
          }
        } else {
          balanceType = "";
          balanceTypeVisiblity = false;
          accProcessedData[i].currentBalanceForDual = {
            "text": forUtility.formatAmountandAppendCurrencySymbol(data[i].currentBalanceForDual, data[i].currencyCode),
            "isVisible": false
          }
        }
        accProcessedData[i].lblAccountBal2 = {
          "text": balanceType,
          "isVisible": balanceTypeVisiblity
        };
		//dual balance userstory 
		if(dualBalanceConfig.isCurrentBalanceToBeDisplayed === true && dualBalanceConfig.isAvailableBalanceToBeDisplayed === false)
		{
		    if(configManager.constants.SAVINGS ===  accProcessedData[i].accountType || configManager.constants.CHECKING === accProcessedData[i].accountType){
			  //turn current balance widgets on
              if(typeof(accProcessedData[i].currentBalanceForDual) === "object")accProcessedData[i].currentBalanceForDual.isVisible = true;
			  else {
				  var value = accProcessedData[i].currentBalanceForDual;
				  accProcessedData[i].currentBalanceForDual = { "text" : value , "isVisible": true}
			  }
              if(typeof(accProcessedData[i].lblAccountBal2) === "object")accProcessedData[i].currentBalanceForDual.isVisible = true;
			  else {
				  var value = accProcessedData[i].lblAccountBal2;
				  accProcessedData[i].lblAccountBal2 = { "text" : value , "isVisible": true}
			  }
			  //turn availableBalance widgets off
			  if(typeof(accProcessedData[i].accountBalanceType) === "object")accProcessedData[i].accountBalanceType.isVisible = false;
			  else {
				  var value = accProcessedData[i].accountBalanceType;
				  accProcessedData[i].accountBalanceType = { "text" : value , "isVisible": false}
			  }
              if(typeof(accProcessedData[i].availableBalance) === "object")accProcessedData[i].availableBalance.isVisible = false;
			  else {
				  var value = accProcessedData[i].availableBalance;
				  accProcessedData[i].availableBalance = { "text" : value , "isVisible": false}
			  }
            }
		    else{
				//turn availableBalance widgets on
			  if(typeof(accProcessedData[i].accountBalanceType) === "object")accProcessedData[i].accountBalanceType.isVisible = true;
			  else {
				  var value = accProcessedData[i].accountBalanceType;
				  accProcessedData[i].accountBalanceType = { "text" : value , "isVisible": true}
			  }
              if(typeof(accProcessedData[i].availableBalance) === "object")accProcessedData[i].availableBalance.isVisible = true;
			  else {
				  var value = accProcessedData[i].availableBalance;
				  accProcessedData[i].availableBalance = { "text" : value , "isVisible": true}
			  }
			  //turn current balance widgets off
			  if(typeof(accProcessedData[i].currentBalanceForDual) === "object")accProcessedData[i].currentBalanceForDual.isVisible = false;
			  else {
				  var value = accProcessedData[i].currentBalanceForDual;
				  accProcessedData[i].currentBalanceForDual = { "text" : value , "isVisible": false}
			  }
              if(typeof(accProcessedData[i].lblAccountBal2) === "object")accProcessedData[i].currentBalanceForDual.isVisible = false;
			  else {
				  var value = accProcessedData[i].lblAccountBal2;
				  accProcessedData[i].lblAccountBal2 = { "text" : value , "isVisible": false}
			  }
            }
		}
      }
      return accProcessedData;
    };
    Account_PresentationController.prototype.getAvailableBalanceCurrencyString = function(data) {
        var forUtility = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        var currencyCode = data["currencyCode"];
        switch (data.accountType) {
            case configManager.constants.SAVINGS:
                return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"],currencyCode);
            case configManager.constants.CHECKING:
                return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"],currencyCode);
            case configManager.constants.CREDITCARD:
                return forUtility.formatAmountandAppendCurrencySymbol(data["currentBalance"],currencyCode);
            case configManager.constants.DEPOSIT:
                return forUtility.formatAmountandAppendCurrencySymbol(data["currentBalance"],currencyCode);
            case configManager.constants.MORTGAGE:
                return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"],currencyCode);
            case configManager.constants.LOAN:
                return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"],currencyCode);
            default:
                return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"],currencyCode);
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
                return kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
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
        //scope_Acc_Pres.asyncManager.initiateAsyncProcess(scope_Acc_Pres.numberOfAsyncForTransactions);
        Account_PresentationController.prototype.selectedAccountId = selectedAccountId;
        var accountType =selectedAccount.selectedAccountData.accountType;
        var transactionObj = applicationManager.getTransactionsListManager();
        //var position = selectedAccountId.search("-");// as this variable is not beign used anywhere so commenting it out.
        var accountIdPen;
//         if(position>=0)
//           {
//             accountIdPen= selectedAccountId.slice(position+1,selectedAccountId.length);
//           }
//         else
//           {
//             accountIdPen = selectedAccountId;
//           }
        var criteria1 = {
            "accountID": selectedAccountId
        };
        var criteria2 = {
             "accountID": selectedAccountId
           };
        var configManager = applicationManager.getConfigurationManager();
//       if(accountType === configManager.constants.CHECKING ||accountType === configManager.constants.SAVINGS){
//         transactionObj.fetchAccountBlockedFunds(criteria2, scope_Acc_Pres.fetchAccountBlockedFundsPresSucCallback, scope_Acc_Pres.fetchAccountBlockedFundsErrCallback);        
//         if(selectedAccount.selectedAccountData.externalIndicator===true || selectedAccount.selectedAccountData.externalIndicator==="true"){
//           scope_Acc_Pres.numberOfAsyncForTransactions=1;
//           transactionObj.fetchAccountPostedTransactions(criteria2, scope_Acc_Pres.fetchAccountPosTranPresSucCallback, scope_Acc_Pres.fetchAccountPosTranErrCallback);
//         }else{
//           scope_Acc_Pres.numberOfAsyncForTransactions=2;
//           transactionObj.fetchAccountPendingTransactions(criteria1, scope_Acc_Pres.fetchAccountPenTranPresSucCallback, scope_Acc_Pres.fetchAccountPenTranPreErrCallback);   
//           transactionObj.fetchAccountPostedTransactions(criteria2, scope_Acc_Pres.fetchAccountPosTranPresSucCallback, scope_Acc_Pres.fetchAccountPosTranErrCallback);
//         }
//       }
		 scope_Acc_Pres.navigateToAccountDetails();
	      
    };
    Account_PresentationController.prototype.fetchAccountPenTranPresSucCallback = function(resTransPend) {
        scope_Acc_Pres.asyncManager.setSuccessStatus(2, resTransPend);
        if (scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForTransactions)) {
            scope_Acc_Pres.navigateToAccountDetails();
        }
    };
    Account_PresentationController.prototype.fetchAccountPenTranPreErrCallback = function(resTransPendErr) {
        scope_Acc_Pres.asyncManager.setErrorStatus(2, resTransPendErr);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(resTransPendErr["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPendErr);
    };
    Account_PresentationController.prototype.fetchAccountPosTranPresSucCallback = function(resTransPost) {
      
        scope_Acc_Pres.asyncManager.setSuccessStatus(0, resTransPost);
        if (scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForTransactions)) {
            scope_Acc_Pres.navigateToAccountDetails();
        }
    };
    Account_PresentationController.prototype.fetchAccountPosTranErrCallback = function(resTransPostErr) {
        scope_Acc_Pres.asyncManager.setErrorStatus(0, resTransPostErr);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(resTransPostErr["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPostErr);
    };
   Account_PresentationController.prototype.fetchAccountBlockedFundsPresSucCallback = function(resBockedFunds) {
		scope_Acc_Pres.setBlockedFundsData(resBockedFunds); 
    };
    Account_PresentationController.prototype.fetchAccountBlockedFundsErrCallback = function(resBlockedFundsErr) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(resBlockedFundsErr["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resBlockedFundsErr);
    };
    Account_PresentationController.prototype.fetchAccountExternalTransactions = function(mainUser, userName, bankId, account, accountDetailsObj) {
        var navMan = applicationManager.getNavigationManager();
        var selectedAccount = accountDetailsObj;
        selectedAccount.mainUser = mainUser;
        selectedAccount.userName = userName;
        selectedAccount.bankId = bankId;
        selectedAccount.account = account;
        navMan.setCustomInfo("frmAccountDetails", selectedAccount);
        var transactionObj = applicationManager.getTransactionsListManager();
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
       // selectedAccount.pendingTransactions = scope_Acc_Pres.asyncManager.getData(0);
        //selectedAccount.postedTransaction = scope_Acc_Pres.asyncManager.getData(1);
        var accountType =selectedAccount.selectedAccountData.accountType;
        var configManager = applicationManager.getConfigurationManager();
//         if(accountType === configManager.constants.CHECKING ||accountType === configManager.constants.SAVINGS){
//           selectedAccount.blockedFunds = scope_Acc_Pres.getBlockedFundsData();
//            for (var i = 0; i < selectedAccount.blockedFunds.length; i++) {
//             var fromdateobj=formatUtil.getDateObjectfromString(selectedAccount.blockedFunds[i]["fromDate"],"YYYY-MM-DD");
//             var todateobj=formatUtil.getDateObjectfromString(selectedAccount.blockedFunds[i]["toDate"],"YYYY-MM-DD");
//             selectedAccount.blockedFunds[i]["fromDate"] = formatUtil.getFormatedDateString(fromdateobj, formatUtil.getApplicationDateFormat());
//             selectedAccount.blockedFunds[i]["toDate"] = formatUtil.getFormatedDateString(todateobj, formatUtil.getApplicationDateFormat());
//             selectedAccount.blockedFunds[i]["accountType"] = selectedAccount.selectedAccountData.accountType;
//             selectedAccount.blockedFunds[i]["lockedAmount"]= formatUtil.formatAmountandAppendCurrencySymbol(selectedAccount.blockedFunds[i]["lockedAmount"]);
//             selectedAccount.blockedFunds[i]["description"]= selectedAccount.blockedFunds[i]["lockReason"];  
//             selectedAccount.blockedFunds[i]["template"] = "flxBlockedFunds"; 
//             selectedAccount.blockedFunds[i]["transactionType"] = "BlockedFund"; 
//         }
//           scope_Acc_Pres.blockedFundsData = [];
//         }
//         for (var i = 0; i < selectedAccount.pendingTransactions.length; i++) {
//          if(selectedAccount.pendingTransactions[i]["isScheduled"] === "true")
//             var trandateobj=formatUtil.getDateObjectfromString(selectedAccount.pendingTransactions[i]["scheduledDate"],"YYYY-MM-DD");
//            else
//             var trandateobj=formatUtil.getDateObjectfromString(selectedAccount.pendingTransactions[i]["transactionDate"],"YYYY-MM-DD");
//             selectedAccount.pendingTransactions[i]["scheduledDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat());
//             selectedAccount.pendingTransactions[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(selectedAccount.pendingTransactions[i]["amount"],selectedAccount.pendingTransactions[i]["transactionCurrency"]);
//             selectedAccount.pendingTransactions[i]["template"] = "flxTransactions"; 
//         }
//         for (var i = 0; i < selectedAccount.postedTransaction.length; i++) {
//            if(selectedAccount.postedTransaction[i]["isScheduled"] === "true")
//              var trandateobj=formatUtil.getDateObjectfromString(selectedAccount.postedTransaction[i]["scheduledDate"],"YYYY-MM-DD");
//            else
//              {
//             var trandateobj=formatUtil.getDateObjectfromString(selectedAccount.postedTransaction[i]["transactionDate"],"YYYY-MM-DD");
//             selectedAccount.postedTransaction[i]["scheduledDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat());
//             selectedAccount.postedTransaction[i]["showDate"]=selectedAccount.postedTransaction[i]["scheduledDate"];
//             selectedAccount.postedTransaction[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(selectedAccount.postedTransaction[i]["amount"],selectedAccount.postedTransaction[i]["transactionCurrency"]);
//              }
//            selectedAccount.postedTransaction[i]["template"] = "flxTransactions";
//         }
        navMan.setCustomInfo("frmAccountDetails", selectedAccount);
        navMan.navigateTo({"friendlyName": "AccountUIModule/frmAccountDetails","appName": "ArrangementsMA"});
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
            externalPostedTransactions[i]["TransactionDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat());
            externalPostedTransactions[i]["Amount"] = formatUtil.formatAmountandAppendCurrencySymbol(externalPostedTransactions[i]["Amount"]);
        }
        for (var i = 0; i < externalPendingTransactions.length; i++) {
            var trandateobj = formatUtil.getDateObjectfromString(externalPendingTransactions[i]["TransactionDate"], "YYYY-MM-DD");
            externalPendingTransactions[i]["TransactionDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat());
            externalPendingTransactions[i]["Amount"] = formatUtil.formatAmountandAppendCurrencySymbol(externalPendingTransactions[i]["Amount"]);
        }
        externalTransactionObj.externalPendingTransactions = externalPendingTransactions;
        externalTransactionObj.externalPostedTransactions = externalPostedTransactions;
        externalTransactionObj.selectedAccountData = selectedAccountData;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        navMan.setCustomInfo("frmAccountDetails", externalTransactionObj);
        navMan.navigateTo("frmAccountDetails");
    };
  	
  	Account_PresentationController.prototype.getMonthlyStatements = function(context, SuccessCallback, FailureCallback) {
      applicationManager.getAccountManager().getMonthlyStatements(context,function success(response){
      SuccessCallback(response)}, function failure(response){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        FailureCallback(response);
      });
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
  Account_PresentationController.prototype.getAccountStataments = function(accountID, accountdata) {
    var statedata = {}; 
    statedata.accountdata = accountdata;
    var navMan = applicationManager.getNavigationManager();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    navMan.setCustomInfo("frmAccStatements", statedata);
    navMan.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "frmAccStatements"});
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
        var isBusinessUser = navMan.getCustomInfo("isBusinessUserFlow");
        var accountDetailsForm = "frmAccountDetails";
      	if(isBusinessUser){
         accountDetailsForm = "frmAccountDetailsNew";
        }
      	var accDetails = navMan.getCustomInfo(accountDetailsForm);
        var accData = accDetails.selectedAccountData;
        var data = {
            "accountID": accData.accountID,
            "nickName": accountNickName
        };
        var accountManager = applicationManager.getAccountManager();
        var addData = accountManager.getInternalAccountByID(data.accountID);
        data.email="";
        data.favouriteStatus= addData.favouriteStatus=="1"?1:0;
        data.eStatementEnable= addData.eStatementEnable=="1"?1:0;
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
      	var isBusinessUser = navMan.getCustomInfo("isBusinessUserFlow");
      	var accountDetailsForm = "frmAccountDetails";
      	if(isBusinessUser){
         accountDetailsForm = "frmAccountDetailsNew";
        }
        var accData = navMan.getCustomInfo("frmAccInfoEdit");
        var accDetails = navMan.getCustomInfo(accountDetailsForm);
        accDetails.selectedAccountData.nickName = accData;
        navMan.setCustomInfo(accountDetailsForm, accDetails);
		var accInfo = navMan.getCustomInfo("frmAccountInfo");
        accInfo["Accounts[0].nickName"]= accData;
        navMan.setCustomInfo("frmAccountInfo", accInfo);
        var accountManager = applicationManager.getAccountManager();
        accountManager.updateNickNameLocally(accDetails.selectedAccountData);
        navMan.goBack();
//         if (isBusinessUser) {
//            // navMan.navigateTo("frmAccountInfoNew");
//         } else {
//            // navMan.navigateTo("frmAccountInfo");
//         }
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
        var totalBalance = 0.0;
        var currencyCode;
      for (var i = 0; i < data.length; i++) {
        if (data[i].accountType === configManager.constants.SAVINGS || data[i].accountType === configManager.constants.CHECKING){
          if(!kony.sdk.isNullOrUndefined(data[i]["availableBalance"])){
            totalBalance = totalBalance + parseFloat(data[i]["availableBalance"]);
          }
      }else if(data[i].accountType === configManager.constants.CREDITCARD || data[i].accountType === configManager.constants.DEPOSIT){
        if(!kony.sdk.isNullOrUndefined(data[i]["currentBalance"])){
          totalBalance = totalBalance + parseFloat(data[i]["currentBalance"]);
        }
      }else if(data[i].accountType === configManager.constants.MORTGAGE|| data[i].accountType === configManager.constants.LOAN ){
        if(!kony.sdk.isNullOrUndefined(data[i]["outstandingBalance"])){
          totalBalance = totalBalance + parseFloat(data[i]["outstandingBalance"]);
        }
      }   
    }
    if(data.length > 0){
            currencyCode = data[0]["currencyCode"];
        }
        return forUtility.formatAmountandAppendCurrencySymbol(totalBalance,currencyCode);
    };
  
  Account_PresentationController.prototype.getTotalAvailableBalanceType = function(data) {
        var forUtility = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        var typeOfTotalAccount;
      for (var i = 0; i < data.length; i++) {
        if (data[i].accountType === configManager.constants.SAVINGS || data[i].accountType === configManager.constants.CHECKING){
          typeOfTotalAccount = kony.i18n.getLocalizedString("kony.mb.dashboard.TotalAvailableBalance");
      }else if(data[i].accountType === configManager.constants.CREDITCARD || data[i].accountType === configManager.constants.DEPOSIT){
        typeOfTotalAccount = kony.i18n.getLocalizedString("kony.mb.dashboard.TotalAvailableCredit");
      }else if(data[i].accountType === configManager.constants.MORTGAGE|| data[i].accountType === configManager.constants.LOAN ){
         typeOfTotalAccount = kony.i18n.getLocalizedString("kony.mb.dashboard.TotalOutstandingBalance");
      }
        
    }
    
        return typeOfTotalAccount;
    };
    Account_PresentationController.prototype.getTotalDebtBalance = function(data) {
        var forUtility = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        var totalDebt = 0;
        var currencyCode;
        for (i = 0; i < data.length; i++) {
            if (data[i].accountType === configManager.constants.CREDITCARD) totalDebt = totalDebt + parseInt(data[i]["currentBalance"]);
        }
        if(data.length > 0){
            currencyCode = data[0]["currencyCode"];
        }
        return forUtility.formatAmountandAppendCurrencySymbol(totalDebt,currencyCode);
    };
    Account_PresentationController.prototype.showDashboard = function() {
      var navManager = applicationManager.getNavigationManager();
      var custominfoCD = navManager.getCustomInfo("frmCustomerDashboard");
      if(!(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")))
      applicationManager.getPresentationUtility().showLoadingScreen();
      var accountManager = applicationManager.getAccountManager();
      var configManager = applicationManager.getConfigurationManager();
      //if(configManager.isAggregatedExternalAccountEnabled()){
      //scope_Acc_Pres.asyncManager.initiateAsyncProcess(scope_Acc_Pres.numberOfAsyncForAccounts);
      //accountManager.fetchInternalAccounts(scope_Acc_Pres.presentationInterAccountsSucc, scope_Acc_Pres.presentationInterAccountsErr);
      //var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
      //var main_user = applicationManager.getUserPreferencesManager().getUserName();
      //accountsModule.presentationController.fetchExternalAccounts(main_user,scope_Acc_Pres.presentationExterAccountsSucc, scope_Acc_Pres.presentationExterAccountsErr);
      //}
      // else
      // {
      if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")){
        accountManager.fetchInternalAccountsWithOutActions(scope_Acc_Pres.presentationAccountsSucc, scope_Acc_Pres.presentationAccountsErr);
      }else{
        accountManager.fetchInternalAccounts(scope_Acc_Pres.presentationAccountsSucc, scope_Acc_Pres.presentationAccountsErr);
      }
      this.getWealthPortfolio();
    
  };
  
   Account_PresentationController.prototype.presentationAccountsSucc = function(res) {
      var navManager = applicationManager.getNavigationManager();
      var accountObj = applicationManager.getAccountManager();
      var accountData = accountObj.getInternalAccounts();
      var custominfo = navManager.getCustomInfo("frmDashboard");
      var custominfoCD = navManager.getCustomInfo("frmCustomerDashboard");
      if(!custominfo){
        custominfo = {};
      }
      var closedAccounts = new Map();
      var closedAccts = [];
      accountData.forEach(function(account) {
         if (closedAccounts.has(account.Membership_id)) {
            closedAccounts.set(account.Membership_id, closedAccounts.get(account.Membership_id) + 1);
         } else {
            closedAccounts.set(account.Membership_id, 1);
         }
      });
      accountData.forEach(function(account) {
         if (!((closedAccounts.get(account.Membership_id) === 1) && (account.accountStatus === 'CLOSED' || account.accountStatus === 'Closed') && 
               !applicationManager.getConfigurationManager().checkUserPermission('VIEW_CLOSED_ACCOUNT'))) {
             closedAccts.push(account);
         }
      });
      accountData = closedAccts;
      //added to stop showing portfolio accounts on dashboard
     var removePortifolioAccountsData = JSON.parse(JSON.stringify(accountData)) 
     for(var i = removePortifolioAccountsData.length-1; i >=0; i--){
       if(removePortifolioAccountsData[i].isPortFolioAccount===true){
         removePortifolioAccountsData.splice(i,1);
       }
     }
     if(removePortifolioAccountsData.length==accountData.length)
       custominfo.accountData = accountData;
     else
       custominfo.accountData = removePortifolioAccountsData;
      navManager.setCustomInfo("frmDashboard", custominfo);
      var configurationManager = applicationManager.getConfigurationManager();
      var frmName = "";
      frmName = {
            "appName": "HomepageMA",
            "friendlyName": "AccountsUIModule/frmUnifiedDashboard"
        };	
      if(!(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")))
      navManager.navigateTo(frmName);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    Account_PresentationController.prototype.presentationAccountsErr = function(err) {
        kony.print(err);
       applicationManager.getPresentationUtility().dismissLoadingScreen();
      	if(error["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    };
    Account_PresentationController.prototype.presentationInterAccountsSucc = function(res) {
      scope_Acc_Pres.asyncManager.setSuccessStatus(0, res);
        if (scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForAccounts)) {
            scope_Acc_Pres.navigateToAccounts();
        }
    };
    Account_PresentationController.prototype.presentationInterAccountsErr = function(err) {
        kony.print(err);
       scope_Acc_Pres.asyncManager.setErrorStatus(0, err);
       applicationManager.getPresentationUtility().dismissLoadingScreen();
      	if(error["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    };
     Account_PresentationController.prototype.presentationExterAccountsSucc = function(res) {
      scope_Acc_Pres.asyncManager.setSuccessStatus(1, res);
        if (scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForAccounts)) {
            scope_Acc_Pres.navigateToAccounts();
        }
    };
    Account_PresentationController.prototype.presentationExterAccountsErr = function(err) {
        kony.print(err);
       scope_Acc_Pres.asyncManager.setErrorStatus(1, err);
       applicationManager.getPresentationUtility().dismissLoadingScreen();
      	if(error["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    };
    Account_PresentationController.prototype.navigateToAccounts = function(){
       var navManager = applicationManager.getNavigationManager();
      var accountObj = applicationManager.getAccountManager();
      var accountData = accountObj.getInternalAccounts();
      var custominfo = navManager.getCustomInfo("frmDashboard");
      if(!custominfo){
        custominfo = {};
      }
      custominfo.accountData = accountData;
      navManager.setCustomInfo("frmDashboard", custominfo);
      //navManager.navigateTo("frmDashboardAggregated");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
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
  Account_PresentationController.prototype.fetchPFMDetails = function(toBeNavigated){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var monthId = "1";
    var date  = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var accountManager = applicationManager.getAccountManager();
    var navManager = applicationManager.getNavigationManager();
    var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
    if (!kony.sdk.isNullOrUndefined(selectedData) && !kony.sdk.isNullOrUndefined(selectedData.fromMyMoneyflag) &&  selectedData.fromMyMoneyflag === true)
    {
      year = selectedData.year;
    }
    scope_Acc_Pres.asyncManager.initiateAsyncProcess(scope_Acc_Pres.numberOfAsyncForPFMGraph);
    accountManager.getPFMBarGraphData(year,scope_Acc_Pres.barGraphSuccessCallback.bind(this,toBeNavigated),scope_Acc_Pres.barGraphFailureCallback);
    accountManager.getPFMBudgetGraphData(month,year,scope_Acc_Pres.budgetGraphSuccessCallback.bind(this,toBeNavigated),scope_Acc_Pres.budgetGraphFailureCallback);
    accountManager.getPFMPieChartData("",year,scope_Acc_Pres.pieChartSuccessCallback.bind(this,toBeNavigated),scope_Acc_Pres.pieChartFailureCallback);
  };
  Account_PresentationController.prototype.barGraphSuccessCallback = function(toBeNavigated,response){
    var accountManager = applicationManager.getAccountManager();
    var date = new Date();
    var presentYear = date.getFullYear();
    var pfmYearData = response;
    if(date.getFullYear() === response.year)
    {
      pfmYearData = pfmYearData.slice(0,date.getMonth()+1);
    }
    scope_Acc_Pres.asyncManager.setSuccessStatus(0,pfmYearData);
    if(scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForPFMGraph)){
      scope_Acc_Pres.navigateToPFMMyMoney(toBeNavigated);
    }
  };
 
   Account_PresentationController.prototype.barGraphPFMSuccessCallback = function(response){
     
    var viewController = applicationManager.getPresentationUtility().getController('frmUnifiedDashboard', true);
    viewController.monthFetchSuccessBar(response);
    applicationManager.getPresentationUtility().dismissLoadingScreen();     
  };
 
  
  Account_PresentationController.prototype.barGraphPFM = function(year){
    var accountManager = applicationManager.getAccountManager();
    accountManager.getPFMBarGraphData(year,scope_Acc_Pres.barGraphPFMSuccessCallback,scope_Acc_Pres.barGraphFailureCallback);
  };
  
  Account_PresentationController.prototype.barGraphFailureCallback = function(response){
    scope_Acc_Pres.asyncManager.setErrorStatus(0,response);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Account_PresentationController.prototype.budgetGraphSuccessCallback = function(toBeNavigated,response){
        scope_Acc_Pres.asyncManager.setSuccessStatus(1, response);
    	 if(scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForPFMGraph)){
  			scope_Acc_Pres.navigateToPFMMyMoney(toBeNavigated);
			}
  };
  Account_PresentationController.prototype.budgetGraphFailureCallback = function(response){
    scope_Acc_Pres.asyncManager.setErrorStatus(1, response);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Account_PresentationController.prototype.pieChartFailureCallback = function(response){
    scope_Acc_Pres.asyncManager.setErrorStatus(2, response);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Account_PresentationController.prototype.pieChartSuccessCallback = function(toBeNavigated,response){
    var pieData = {};
    var date  = new Date();
    var pieResponse = response;
    var navManager = applicationManager.getNavigationManager();
    var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
    var MONTH_NAMES = ["None", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for(var i=0;i<12;i++)
    {
      var pieMonthData = [];
      for(var j=0;j<pieResponse.length;j++){
          if(pieResponse[j].monthName === MONTH_NAMES[i])
          {
              pieMonthData.push(pieResponse[j]);
          }
      }
      pieData[MONTH_NAMES[i]] = pieMonthData;
    }
    scope_Acc_Pres.asyncManager.setSuccessStatus(2,pieData);
    if(scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForPFMGraph)){
        scope_Acc_Pres.navigateToPFMMyMoney(toBeNavigated);
    }
  };
  Account_PresentationController.prototype.fetchMonthPFMData = function(monthId,yearId,successCallback,failureCallback){
    	var accountManager = applicationManager.getAccountManager();
    	accountManager.getPFMPieChartData(monthId,yearId,successCallback,failureCallback);
  };
  Account_PresentationController.prototype.navigateToPFMMyMoney = function(toBeNavigated){
    var navManager = applicationManager.getNavigationManager();
    var pfmData = {
      				"pie":scope_Acc_Pres.asyncManager.getData(2),
                   "bar":scope_Acc_Pres.asyncManager.getData(0),
                   "budget":scope_Acc_Pres.asyncManager.getData(1)
    };
	applicationManager.getPresentationUtility().dismissLoadingScreen();

    navManager.setCustomInfo("frmPFMMyMoney",pfmData);
    if(toBeNavigated)
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
      if (CommonUtilities.CLIENT_PROPERTIES && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE") {
        scope_Acc_Pres.directMarketingManager.getAccountDashboardCampaigns(scope_Acc_Pres.fetchAccountDashboardCampaignsPresentationSuccessCallback, scope_Acc_Pres.fetchAccountDashboardCampaignsPresentationErrorCallback);
      } else {
        scope_Acc_Pres.fetchAccountDashboardCampaignsPresentationSuccessCallback([]);
      }
    }
    else {
      var accountDashboardCampaignsData = [];
        if (CommonUtilities.CLIENT_PROPERTIES && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE") {
          accountDashboardCampaignsData = scope_Acc_Pres.directMarketingManager.getAccountDashboardCampaigns();
        }
        var maxNumOfAccountDashboardCampaigns = scope_Acc_Pres.directMarketingManager.getMaxNumOfAccountDashboardCampaigns();
        if (accountDashboardCampaignsData.length > maxNumOfAccountDashboardCampaigns) {
            logger.log("###account dashboard Campaign's count exceeded maxNumOfAds : " + maxNumOfAccountDashboardCampaigns + " \n####Therefore Hiding them");
        } else if (accountDashboardCampaignsData.length === 0) {
            logger.log("###Account dashboard Campaign's count is 0 \n####Therefore Hiding them");
        } else {
            logger.log("###Succesfully fetched Account Dashboard Campaigns");
            custominfo.accountDashboardCampaignData = accountDashboardCampaignsData;
        }
        navManager.setCustomInfo("frmDashboardAggregated", custominfo);
        var configurationManager = applicationManager.getConfigurationManager();
       // var frmName = "frmUnifiedDashboard";
      	var frmName = {
            "appName": "HomepageMA",
            "friendlyName": "AccountsUIModule/frmUnifiedDashboard"
        };
        navManager.navigateTo(frmName);
    }
   };
  Account_PresentationController.prototype.fetchAccountDashboardCampaigns = function(){
   var logger = applicationManager.getLoggerManager();
   var navManager = applicationManager.getNavigationManager();
   var custominfo = navManager.getCustomInfo("frmDashboard");
      if(!custominfo){
        custominfo = {};
      }
   custominfo.accountDashboardCampaignData = [];
    if (!scope_Acc_Pres.directMarketingManager.areAccountDashboardCampaignsFetched()) {
      if (CommonUtilities.CLIENT_PROPERTIES && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE") {
        scope_Acc_Pres.directMarketingManager.getAccountDashboardCampaigns(scope_Acc_Pres.fetchAccountDashboardCampaignsPresentationSuccessCallback, scope_Acc_Pres.fetchAccountDashboardCampaignsPresentationErrorCallback);
      } else {
        scope_Acc_Pres.fetchAccountDashboardCampaignsPresentationSuccessCallback([]);
      }
    } else {
      var accountDashboardCampaignsData = [];
      if (CommonUtilities.CLIENT_PROPERTIES && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE") {
        accountDashboardCampaignsData = scope_Acc_Pres.directMarketingManager.getAccountDashboardCampaigns();
      }
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
     // navManager.navigateTo("frmDashboardAggregated");
    }
   };
   Account_PresentationController.prototype.showAccountsData = function(accountsData){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmCombinedDashboard", accountsData);
      navManager.navigateTo("frmAccountSelector");
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
    var controller = applicationManager.getPresentationUtility().getController('frmUnifiedDashboard', true);
    controller.getSuccessResponse(successResponse);
      navManager.setCustomInfo("frmDashboardAggregated", custominfo);
      var configurationManager = applicationManager.getConfigurationManager();
//       var frmName = "";
//       frmName = "frmUnifiedDashboard";// "frmCombinedDashboard";	
//       navManager.navigateTo(frmName);
       var wealthModule = applicationManager.getModulesPresentationController("WealthModule");
       var customerId = "";
	   var userMan = applicationManager.getUserPreferencesManager();
       if (userMan.backendIdentifier && userMan.backendIdentifier  !== "") {
			customerId = userMan.backendIdentifier;
		  } else if(userMan.primaryCustomerId.id && userMan.primaryCustomerId.id !== "") {
			customerId = userMan.primaryCustomerId.id;
		  } else {
			customerId = userMan.accessibleCustomerIds[0].id;
		  }
        var checkUserPermission = function (permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
        }
        var investmentPermission = configurationManager.getInvestmentSummaryPermissionsList().some(checkUserPermission);
     if(investmentPermission){  
     wealthModule.getPortfolioList({
         "customerId": customerId
       });
     }
     else{
                   var frmName = "";
             //  frmName = "frmUnifiedDashboard";// "frmCombinedDashboard";	
       		   frmName = {
            "appName": "HomepageMA",
            "friendlyName": "AccountsUIModule/frmUnifiedDashboard"
        };
               navManager.navigateTo(frmName);
        }
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
      var configurationManager = applicationManager.getConfigurationManager();
      var frmName = "";
      frmName = "frmUnifiedDashboard";	
//       if( configurationManager.isCombinedUser === "true"){
//         frmName = "frmCombinedDashboard";	
//       }
//       else if(configurationManager.isSMEUser === "true"){
//         frmName = "frmBusinessDashboard";	
//       }
//       else{
//         frmName = "frmDashboardAggregated";
//       }
     // navManager.navigateTo(frmName);
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
  Account_PresentationController.prototype.fetchAccountDetailsAndTransactions=function(selectedAccountId)
  {
        scope_Acc_Pres.asyncManager.initiateAsyncProcess( scope_Acc_Pres.numberOfAsyncForDetails);
        Account_PresentationController.prototype.selectedAccountId = selectedAccountId;
        var transactionObj = applicationManager.getTransactionManager();
        var criteria1 = {
            "accountID": selectedAccountId
        };
        transactionObj.fetchAccountPendingTransactions(criteria1, scope_Acc_Pres.fetchAccountPenDetailTranPresSucCallback, scope_Acc_Pres.fetchAccountPenDetailTranPreErrCallback);
        var criteria2 = {
             "accountID": selectedAccountId
           };
        transactionObj.fetchAccountPostedTransactions(criteria2, scope_Acc_Pres.fetchAccountPosDetailTranPresSucCallback, scope_Acc_Pres.fetchAccountPosDetailTranErrCallback)
       var accountManager = applicationManager.getAccountManager();
      var params = {
            "accountID": selectedAccountId
        };
    accountManager.fetchAccountDetails(params,scope_Acc_Pres.fetchAccountDetailPresSucCallback,scope_Acc_Pres.fetchAccountDetailPresErrCallback);
  };
  Account_PresentationController.prototype.setBlockedFundsData=function(response)
  {
    scope_Acc_Pres.blockedFundsData=response;
  };
  Account_PresentationController.prototype.getBlockedFundsData = function() {
    return scope_Acc_Pres.blockedFundsData;
  };
  Account_PresentationController.prototype.fetchAccountDetailPresSucCallback=function(response)
  {
    var navMan = applicationManager.getNavigationManager();
    var selectedAccount = navMan.getCustomInfo("frmAccountDetails");
    if(selectedAccount === undefined || selectedAccount === null)
      selectedAccount = {};
    selectedAccount.selectedAccountData = response[0];
    selectedAccount.selectedAccountData.type = "internal";
    navMan.setCustomInfo("frmAccountDetails", selectedAccount);
    var selectedAccountId = Account_PresentationController.prototype.selectedAccountId;
    var accountType =selectedAccount.selectedAccountData.accountType;
    var configManager = applicationManager.getConfigurationManager(); 
    if(accountType === configManager.constants.CHECKING ||accountType === configManager.constants.SAVINGS){
      var criteria = {
      "accountID": selectedAccountId
      };
      var transactionObj = applicationManager.getTransactionManager();
      transactionObj.fetchAccountBlockedFunds(criteria, scope_Acc_Pres.fetchAccountBlockedPresSucCallback, scope_Acc_Pres.fetchAccountBlockedErrCallback);
    }
    else{
       scope_Acc_Pres.asyncManager.setSuccessStatus(2, response[0]);
       if (scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForDetails)) {
         scope_Acc_Pres.navigateToAccountDetails();
       }
    }
  };
  Account_PresentationController.prototype.fetchAccountDetailPresErrCallback=function(error)
  {
        scope_Acc_Pres.asyncManager.setErrorStatus(2, error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(error["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
  }
    Account_PresentationController.prototype.fetchAccountPenDetailTranPresSucCallback = function(resTransPend) {
        scope_Acc_Pres.asyncManager.setSuccessStatus(0, resTransPend);
        if (scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForDetails)) {
            scope_Acc_Pres.navigateToAccountDetails();
        }
    };
    Account_PresentationController.prototype.fetchAccountPenDetailTranPreErrCallback = function(resTransPendErr) {
        scope_Acc_Pres.asyncManager.setErrorStatus(0, resTransPendErr);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resTransPendErr["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPendErr);
    };
    Account_PresentationController.prototype.fetchAccountPosDetailTranPresSucCallback = function(resTransPost) {
        scope_Acc_Pres.asyncManager.setSuccessStatus(1, resTransPost);
        if (scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForDetails)) {
            scope_Acc_Pres.navigateToAccountDetails();
        }
    };
    Account_PresentationController.prototype.fetchAccountPosDetailTranErrCallback = function(resTransPostErr) {
        scope_Acc_Pres.asyncManager.setErrorStatus(1, resTransPostErr);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resTransPostErr["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPostErr);
    };
  	Account_PresentationController.prototype.fetchAccountBlockedPresSucCallback = function(resBlocked) {
      scope_Acc_Pres.setBlockedFundsData(resBlocked);  
      var navMan = applicationManager.getNavigationManager();
      var selectedAccount = navMan.getCustomInfo("frmAccountDetails");
	  scope_Acc_Pres.asyncManager.setSuccessStatus(1, selectedAccount.selectedAccountData);
      if (scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForDetails)) 
         scope_Acc_Pres.navigateToAccountDetails();
    };
    Account_PresentationController.prototype.fetchAccountBlockedErrCallback = function(resBlockedErr) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    	kony.print("Error in getBlockedFunds call :");
    	if(resBlockedErr){
    	kony.print(JSON.stringify(resBlockedErr));
    	}
        var navMan = applicationManager.getNavigationManager();
        var selectedAccount = navMan.getCustomInfo("frmAccountDetails");
        scope_Acc_Pres.asyncManager.setSuccessStatus(1, selectedAccount.selectedAccountData);
        if (scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForDetails)) {
         scope_Acc_Pres.navigateToAccountDetails();
       }
       //if (resBlockedErr["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resBlockedErr);
    };
	Account_PresentationController.prototype.fetchLoanSchedule = function(selectedAccountId) {
     var accountManager = applicationManager.getAccountManager();
     var params = {
       "accountID": selectedAccountId
     };
     accountManager.fetchAccountDetails(params,scope_Acc_Pres.fetchAccountDetailPreSucCallback,scope_Acc_Pres.fetchAccountDetailPreErrCallback);
    };
    Account_PresentationController.prototype.fetchAccountDetailPreSucCallback=function(response){
      var navMan = applicationManager.getNavigationManager();
      var selectedAccount = navMan.getCustomInfo("frmAccountDetails");
      if(selectedAccount === undefined || selectedAccount === null)
        selectedAccount = {};
      selectedAccount.selectedAccountData = response[0]
      navMan.setCustomInfo("frmAccountDetails", selectedAccount);
      scope_Acc_Pres.fetchTransactionsForLoanSchedule(selectedAccount.selectedAccountData);
    };
    Account_PresentationController.prototype.fetchAccountDetailPreErrCallback=function(error){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(error["isServerUnreachable"])
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    };
  	Account_PresentationController.prototype.fetchTransactionsByAccountId = function(accountData){
      var inputParam = {
        accountID: accountData.accountID,
        transactionType: "All", 
        limit: 10,
        offset: 0,
        isScheduled: "false",
        sortBy: "transactionDate",
        order: "desc"
      };
      applicationManager.getTransactionManager().fetchAccountTransactionByType(inputParam, this.fetchTransactionsSuccess.bind(this, accountData), this.fetchTransactionsError.bind(this));
    };
    Account_PresentationController.prototype.fetchTransactionsForLoanSchedule = function(accountData){
      var inputParam = {
        accountID: accountData.accountID,
        transactionType: "LoanSchedule", 
        limit: 10,
        offset: 0,
        isScheduled: "false",
        order: "desc"
      };
      applicationManager.getTransactionManager().fetchAccountTransactionByType(inputParam, this.fetchLoanScheduleTransactionsSuccess.bind(this, accountData), this.fetchTransactionsError.bind(this));
    };
    Account_PresentationController.prototype.fetchLoanScheduleTransactionsSuccess = function(accountData, response){
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("LoanScheduleTransactions",response);
      navManager.navigateTo("frmLoanSchedule");
    };

  	Account_PresentationController.prototype.fetchTransactionsSuccess = function(accountData, response){
      if(!kony.sdk.isNullOrUndefined(accountData)){
        accountData.type = "internal";
      }      
      var finalResponse = {
        "postedTransaction" : [],
        "pendingTransactions" : [],
        "selectedAccountData" : accountData
      };
      var formatUtility = applicationManager.getFormatUtilManager();
      response.forEach(function(transaction){
        var trandateobj = formatUtility.getDateObjectfromString(transaction.transactionDate, "YYYY-MM-DD");
        transaction.TransactionDate= formatUtility.getFormatedDateString(trandateobj, formatUtility.getApplicationDateFormat());
        transaction.Amount = formatUtility.formatAmountandAppendCurrencySymbol(transaction.amount, accountData.currencyCode);
        if(transaction.statusDescription === "Successful")
          finalResponse.postedTransaction.push(transaction);
        else if(transaction.statusDescription === "Pending")
          finalResponse.pendingTransactions.push(transaction);
      });
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmAccountDetailsNew", finalResponse);
      navManager.navigateTo("frmAccountDetailsNew");
    };
  	Account_PresentationController.prototype.fetchTransactionsError = function(error){
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmCombinedDashboard", {
       "failure" : error
      });
      navManager.navigateTo("frmCombinedDashboard");
    };
  
  Account_PresentationController.prototype.createCustomView = function(navobj){
    var scopeObj = this;      
    var Accountmodule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountManager').businessController;
    Accountmodule.createCustomViews(
      navobj,
      scopeObj.createCustomViewSuccess,
      scopeObj.createCustomViewFailure);
  };
  Account_PresentationController.prototype.createCustomViewSuccess = function(response){
    var viewController = applicationManager.getPresentationUtility().getController('frmCreateCustomGroup', true);
    viewController.createCustomViewSuccessCallBack(response);
  };
  Account_PresentationController.prototype.createCustomViewFailure = function(error){
    var viewController = applicationManager.getPresentationUtility().getController('frmCreateCustomGroup', true);
    viewController.fetchErrorcallBack(error);
  };

  Account_PresentationController.prototype.getCustomview = function(navobj){
    var scopeObj = this;      
    var Accountmodule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountManager').businessController;
    Accountmodule.getCustomViews(navobj.requestData, scopeObj.getCustomviewViewSuccess.bind(scopeObj,navobj), scopeObj.getCustomviewViewFailure.bind(scopeObj,navobj));
  };

  Account_PresentationController.prototype.getCustomviewViewSuccess = function(navobj,response){
    var proccessedResponse = Account_PresentationController.prototype.dataProcessorForGetCustomview(response);
    if(navobj.formData.viewId === "AccountModule/frmFilterAccounts"){
    var viewController = applicationManager.getPresentationUtility().getController('frmFilterAccounts', true);
    viewController.getCustomviewViewSuccessCallBack(response);
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('frmManageCustomGroup', true);
    viewController.getCustomviewViewSuccessCallBack(proccessedResponse);
    }
    
  };

  Account_PresentationController.prototype.dataProcessorForGetCustomview = function(response){
    var segDataArray = [];
    var sortArray = [];
    var responseArray = response.customview;     
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("CustomviewList",responseArray);
    let field='name';
    var sortArray = (responseArray.sort((a, b) => (a[field] || "").toString().localeCompare((b[field] || "").toString())));
    if(Array.isArray(sortArray)){
      for(var i=0;i<sortArray.length;i++){
        var json={ 
          "lblTitle":{text:kony.sdk.isNullOrUndefined(sortArray[i].name)?"-": sortArray[i].name,skin:"sknLbl424242SSP26px"},
          "customviewName":kony.sdk.isNullOrUndefined(sortArray[i].name)?"-": sortArray[i].name,
          "imgArrow":{src:"chevron.png"},
          "lblSeparator":{isVisible:false},
          "flxsep":{skin:"sknflxe7e7e7"},
          "id":sortArray[i].id,
          "accountIds":kony.sdk.isNullOrUndefined(sortArray[i].accountIds)?"-": sortArray[i].accountIds,
          "customerId":kony.sdk.isNullOrUndefined(sortArray[i].customerId)?"-": sortArray[i].customerId,
        };
        segDataArray.push(json);
      }}
    return(segDataArray);
  };

  Account_PresentationController.prototype.getCustomviewViewFailure = function(navObj,error){
    if(navObj.formData.viewId === "AccountModule/frmFilterAccounts"){
      var viewController = applicationManager.getPresentationUtility().getController('frmFilterAccounts', true);
      viewController.fetchErrorcallBack(error);
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('frmManageCustomGroup', true);
      viewController.fetchErrorcallBack(error);
    }
  };

  Account_PresentationController.prototype.deleteCustomview = function(navobj){
    var scopeObj = this;      
    var Accountmodule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountManager').businessController;
    Accountmodule.deleteCustomViews(
      navobj,
      scopeObj.deleteCustomViewSuccess,
      scopeObj.deleteCustomViewFailure);
  };

  Account_PresentationController.prototype.deleteCustomViewSuccess = function(response){
    var viewController = applicationManager.getPresentationUtility().getController('frmCustomView', true);
    viewController.deleteCustomViewSuccessCallBack(response);
  };

  Account_PresentationController.prototype.deleteCustomViewFailure = function(error){
    var viewController = applicationManager.getPresentationUtility().getController('frmCustomView', true);
    viewController.fetchErrorcallBack(error);
  };

  Account_PresentationController.prototype.updateCustomview = function(inputparams,screenname){
    var scopeObj = this;    
    if(screenname==="frmEditCustomGroupName"){
      var Accountmodule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountManager').businessController;
      Accountmodule.updateCustomViews( inputparams, scopeObj.updateCustomViewNameEditSuccess, scopeObj.updateCustomViewNameEditFailure);
    } else if(screenname==="frmSelectAccounts"){
      var Accountmodule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountManager').businessController;
      Accountmodule.updateCustomViews( inputparams, scopeObj.updateCustomViewSuccess, scopeObj.updateCustomViewFailure);
    }

  };
  Account_PresentationController.prototype.updateCustomViewSuccess = function(response){
    var viewController = applicationManager.getPresentationUtility().getController('frmSelectAccounts', true);
    viewController.updateCustomViewSuccessCallBack(response);
  };

  Account_PresentationController.prototype.updateCustomViewFailure = function(error){
    var viewController = applicationManager.getPresentationUtility().getController('frmSelectAccounts', true);
    viewController.fetchErrorcallBack(error);
  };

  Account_PresentationController.prototype.updateCustomViewNameEditSuccess = function(response){
    var viewController = applicationManager.getPresentationUtility().getController('frmEditCustomGroupName', true);
    viewController.updateCustomViewNameEditSuccessCallBack(response);
  };

  Account_PresentationController.prototype.updateCustomViewNameEditFailure = function(error){
    var viewController = applicationManager.getPresentationUtility().getController('frmEditCustomGroupName', true);
    viewController.fetchErrorcallBack(error);
  };
  
  Account_PresentationController.prototype.fetchIsBusinessAccount = function(accountNumber) {
    var navMan = applicationManager.getNavigationManager();
    var custominfoInt = navMan.getCustomInfo("frmDashboard");
    var accounts = custominfoInt.accountData;
    for(i=0;i<accounts.length;i++){
      if(accounts[i].accountID === accountNumber){
        return accounts[i].isBusinessAccount;
      }
    }
    return "false";
  };
  
  Account_PresentationController.prototype.generateCombinedStatement = function(context, SuccessCallback, FailureCallback) {
    applicationManager.getAccountServicesModule().generateCombinedStatement(context,function sucess(response){
      SuccessCallback(response)}, function failure(response){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      FailureCallback(response);
    });
  };

  Account_PresentationController.prototype.checkDownloadStatusOfCombinedStatement = function(context, SuccessCallback, FailureCallback) {        
    applicationManager.getAccountServicesModule().checkDownloadStatusOfCombinedStatement(context,function sucess(response){
      SuccessCallback(response)}, function failure(response){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      FailureCallback(response)
    });
  }; 

    Account_PresentationController.prototype.validateClosure = function(payload) {        
    requestParam = {accountID : payload}
    applicationManager.getAccountServicesModule().validateClosure(requestParam, this.validateClosureSC.bind(this), this.validateClosureEC.bind(this));
    
  };
    
  Account_PresentationController.prototype.validateClosureSC = function(response){
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("statusMessage", response.description);
    if(kony.sdk.isNullOrUndefined(response.description)){
    navMan.navigateTo({
            "appName": "ArrangementsMA",
            "friendlyName": "AccountUIModule/frmAccountClosure"
        });
      }
      else{
        navMan.navigateTo({
          "appName": "ArrangementsMA",
          "friendlyName": "AccountUIModule/frmCloseAccount"
      });
      }
  };
  
  Account_PresentationController.prototype.validateClosureEC = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("error fetching attachments");
  }; 
  Account_PresentationController.prototype.getTandCData = function() {
    data = {"languageCode":"en-US","termsAndConditionsCode":"AccountClosure_TnC"};
    var mortgageObj = applicationManager.getAccountServicesModule();
    mortgageObj.getTandCData(data, this.getTandCDataSC.bind(this), this.getTandCDataEC.bind(this));
};
Account_PresentationController.prototype.getTandCDataSC = function(response) {
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("TandCdata", response);
};
Account_PresentationController.prototype.getTandCDataEC = function(response) {
  applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("error fetching attachments");
};
  Account_PresentationController.prototype.uploadDocumentsMB = function(payload,res) {
    scope_Acc_Pres.closureRequestPayload = res;
    params = {};
    params.Documents = [];
    for(i=0; i<payload.length;i++){
      let file = {};
      file.fileName = payload[i].file.name;
      file.fileType = "application/"+payload[i].file.name.split(".")[1];
      file.fileContents = payload[i].base64;
      params.Documents.push(file)
    }        
    
    applicationManager.getAccountServicesModule().uploadMultipleDouments(params, this.uploadDocumentsMBSC.bind(this), this.uploadDocumentsMBSC.bind(this));
    
  };
  
      Account_PresentationController.prototype.submitClosureRequest = function(payload) {        
    
    applicationManager.getAccountServicesModule().submitClosureRequest(payload, this.submitClosureRequestSC.bind(this), this.submitClosureRequestEC.bind(this));
    
  };
  Account_PresentationController.prototype.uploadDocumentsMBSC = function(response){
    scope_Acc_Pres.closureRequestPayload.supportingDocumentData = response.supportingDocumentData;
    scope_Acc_Pres.submitClosureRequest(scope_Acc_Pres.closureRequestPayload)
  };
  
  Account_PresentationController.prototype.uploadDocumentsMBEC = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("error fetching attachments");
  }; 
    
  Account_PresentationController.prototype.submitClosureRequestSC = function(response){
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("response", response);
    navMan.navigateTo({
            "appName": "ArrangementsMA",
            "friendlyName": "AccountUIModule/frmAccountClosureAck"
        });
  };
  
  Account_PresentationController.prototype.submitClosureRequestEC = function(error){
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("response", error);
    navMan.navigateTo({
            "appName": "ArrangementsMA",
            "friendlyName": "AccountUIModule/frmAccountClosureAck"
        });
  }; 
  
  
  Account_PresentationController.prototype.DownloadCombinedStatement = function (context,SuccessCallback, FailureCallback) {
    var payload = {};
    payload.fileId = context.fileId;
      var self = this;
      scope_Acc_Pres.codeVerifier=kony.crypto.generateSecureRandom({
      type:"base64",
      size:5
      });
      var algo="sha256";
      var inputstr= scope_Acc_Pres.codeVerifier
      var options = {"returnBase64String":"false"};
      var codeCh= kony.crypto.createHash(algo,inputstr,options);
      payload.codeCh=codeCh;

    applicationManager.getAccountManager().getCombinedStatements(payload, function success(response){
      var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url;
      var serviceURL = mfURL + "/objects/CombinedStatements?";
      var paramURL = "fileType=" + response.fileType;
      paramURL = paramURL + "&fileName=" + response.fileName;
      paramURL = paramURL + "&id=" + response.id;
          if(scope_Acc_Pres.codeVerifier!=null)
            paramURL += "&codeVerifier=" + scope_Acc_Pres.codeVerifier;

      kony.application.openURL(serviceURL+paramURL);             
    },
    function failure(error){
      kony.print("FailureCallback"+error);
    }
    );    
  };
  
  Account_PresentationController.prototype.retriveAttachments = function(transactionId) {
    var requestParam = {};
    //requestParam.customerId = applicationManager.getUserPreferencesManager().getUserObj().userId;
    requestParam.transactionId = transactionId;
    applicationManager.getTransactionManager().retrieveAttachments(requestParam, this.retriveAttachmentsSuccess.bind(this), this.retriveAttachmentsError.bind(this));
  };
  
  Account_PresentationController.prototype.retriveAttachmentsSuccess = function(response){
    var navMan = applicationManager.getNavigationManager();
    var transactionData = navMan.getCustomInfo("frmAccountsTransactionDetails");
    if(response && response.fileNames){
      transactionData.fileNames = response.fileNames;
    }
    navMan.setCustomInfo("frmAccountsTransactionDetails", transactionData);
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo('frmAccountsTransactionDetails');
  };
  
  Account_PresentationController.prototype.retriveAttachmentsError = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("error fetching attachments");
  }; 
    
  Account_PresentationController.prototype.downloadAttachments = function(isSingleFile, fileNames, i) {
    var requestParam = {};
    if (isSingleFile) {
      requestParam.fileID = fileNames.fileID;
      requestParam.fileName = fileNames.fileName;
    }
    else {
      requestParam.fileID = fileNames[i].fileID;
      requestParam.fileName = fileNames[i].fileName;
    }
    //requestParam.customerId = applicationManager.getUserPreferencesManager().getUserObj().userId;
    var downloadURL = applicationManager.getTransactionManager().getDownloadAttachmentUrl(requestParam);
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("downloadURL", downloadURL);
  };

  Account_PresentationController.prototype.navigateToCombinedStatements = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var config = applicationManager.getConfigurationManager();
    var param = {
      "bundle_name": "DBP"
    };
    config.fetchDisputeConfigurations(param, this.navigateToCombinedStatementsSuccess.bind(this), this.navigateToCombinedStatementsFailure.bind(this));
  };
  
  Account_PresentationController.prototype.navigateToCombinedStatementsSuccess = function(res) {
    var configManager = applicationManager.getConfigurationManager();
    var configurationArray = res;
	if (!(Array.isArray(configurationArray))) {
		configurationArray = configurationArray.rawResponse.Configurations;
	}
    configurationArray.forEach(function(arrayItem) {
      if (arrayItem["key"] && arrayItem["key"] ===  "COMBINED_STATEMENT_PERIOD_ALLOWED_MONTHS") {
        configManager.setCombinedStatementsAllowedPeriod(arrayItem["value"]);
      }
    });
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navMan=applicationManager.getNavigationManager();
    navMan.navigateTo("frmCombinedStatement");
  };
  
  Account_PresentationController.prototype.navigateToCombinedStatementsFailure = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("Error in fetching Configurations :" +err);
    var navMan=applicationManager.getNavigationManager();
    navMan.navigateTo("frmCombinedStatement");
  };
  
  Account_PresentationController.prototype.checkAccountStamentPermission = function() {
    var configManager = applicationManager.getConfigurationManager();
    var navManager = applicationManager.getNavigationManager();
    var CombinedStatement = configManager.checkUserPermission("VIEW_COMBINED_STATEMENTS");
    var Estatement = configManager.checkUserPermission("VIEW_ESTATEMENTS");   
    var userPermission = {"combinedStatement":CombinedStatement,"eStatement":Estatement};    
    var viewController = applicationManager.getPresentationUtility().getController('frmAccStatements', true);
    viewController.showAccoutStatements(userPermission);
  };
  /* transaction module presentation controller related code
  */
  Account_PresentationController.prototype.setPendPostTransactions=function(response)
  {
    scope_Acc_Pres.transactionsData=response;
  };
  
  Account_PresentationController.prototype.getPendPostTransactions = function() {
    return scope_Acc_Pres.transactionsData;
  };
  Account_PresentationController.prototype.setBlockedFundsData=function(response)
  {
    scope_Acc_Pres.blockedFundsData=response;
  };
  Account_PresentationController.prototype.getBlockedFundsData = function() {
    return scope_Acc_Pres.blockedFundsData;
  };
  
  Account_PresentationController.prototype.getPendingPostedTransactions = function(searchOptions) {
    scope_Acc_Pres.asyncManager.initiateAsyncProcess( scope_Acc_Pres.numberOfAsyncForUserTransactions);
    scope_Acc_Pres.getPendingTransactions(searchOptions);
    scope_Acc_Pres.getPostedTransactions(searchOptions);
  };
  Account_PresentationController.prototype.getPendingTransactions = function(searchOptions){
    searchOptions.isScheduled ="1";
    var transactionManager=applicationManager.getTransactionsListManager();
    transactionManager.fetchPendingTransactions(searchOptions,this.getPendingTransactionsPresentationSuccessCallback,this.getPendingTransactionsPresentationErrorCallback);
  };
  Account_PresentationController.prototype.getPendingTransactionsPresentationSuccessCallback = function(resSuccess){
    scope_Acc_Pres.asyncManager.setSuccessStatus(0,resSuccess);
    scope_Acc_Pres.navigateTofrmAdvanceSearchResults();
  };
  Account_PresentationController.prototype.getPendingTransactionsPresentationErrorCallback = function(resErr){
    scope_Acc_Pres.asyncManager.setErrorStatus(0,resErr);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(resErr["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resErr);
  };
  Account_PresentationController.prototype.getPostedTransactions = function(searchOptions){
    searchOptions.isScheduled ="0";
    var transactionManager=applicationManager.getTransactionsListManager();
    transactionManager.fetchPostedTransactions(searchOptions,this.getPostedTransactionsPresentationSuccessCallback,this.getPostedTransactionsPresentationErrorCallback);
  };
  Account_PresentationController.prototype.getPostedTransactionsPresentationSuccessCallback = function(resSuccess){
    scope_Acc_Pres.asyncManager.setSuccessStatus(1,resSuccess);
    scope_Acc_Pres.navigateTofrmAdvanceSearchResults();
  };
  Account_PresentationController.prototype.getPostedTransactionsPresentationErrorCallback = function(resErr){
    scope_Acc_Pres.asyncManager.setErrorStatus(1,resErr);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(resErr["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resErr);
  };
  Account_PresentationController.prototype.getBlockedTransactions = function(searchOptions) {
    var transactionManager=applicationManager.getTransactionsListManager();
    transactionManager.fetchAccountBlockedFunds(searchOptions,this.getBlockedTransactionsPresentationSuccessCallback,this.getBlockedTransactionsPresentationErrorCallback);
  };
  Account_PresentationController.prototype.getBlockedTransactionsPresentationSuccessCallback = function(resSuccess){
    scope_Acc_Pres.navigateToAccountDetails(resSuccess);
  };
  Account_PresentationController.prototype.getBlockedTransactionsPresentationErrorCallback = function(resErr){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(resErr["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resErr);
  };
  Account_PresentationController.prototype.navigateTofrmAdvanceSearchResults =function(res)
  {
    if(scope_Acc_Pres.asyncManager.areAllservicesDone(scope_Acc_Pres.numberOfAsyncForUserTransactions))
    {
      var navMan = applicationManager.getNavigationManager();
      var transactionDetails = {};
      transactionDetails.pendingTransactions = scope_Acc_Pres.asyncManager.getData(0);
      transactionDetails.postedTransactions = scope_Acc_Pres.asyncManager.getData(1);
      // navMan.setCustomInfo("frmAdvanceSearch",transactionDetails);
      scope_Acc_Pres.setPendPostTransactions(transactionDetails);
      var controller = applicationManager.getPresentationUtility().getController('frmAdvanceSearchResults', true);
      controller.setTransactionData();
      var currentForm = kony.application.getCurrentForm().id;
      if(currentForm!=="frmAdvanceSearchResults")
      navMan.navigateTo("frmAdvanceSearchResults");
    } 
  };
  Account_PresentationController.prototype.getCustomRange = function(beginingDate,endDate){
    if(endDate-beginingDate>=0){
      var fotmatUtilManager = applicationManager.getFormatUtilManager();
      var startDate = fotmatUtilManager.getFormatedDateString(beginingDate,fotmatUtilManager.getBackendDateTimeFormat());
      var lastDate = fotmatUtilManager.getFormatedDateString(endDate,fotmatUtilManager.getBackendDateTimeFormat());
      //     var startDate = JSON.stringify(sDate);
      //     var lastDate = JSON.stringify(lDate);
      return {"searchStartDate":startDate,"searchEndDate":lastDate};
    }
    else{
      return null;
    }
  };
  Account_PresentationController.prototype.getDateRange = function(noOfDays){
    var fotmatUtilManager = applicationManager.getFormatUtilManager();
    var startDate = fotmatUtilManager.getFormatedDateString(fotmatUtilManager.getPreviousDate(noOfDays),fotmatUtilManager.getBackendDateTimeFormat());
    var lastDate = fotmatUtilManager.getFormatedDateString(new Date(),fotmatUtilManager.getBackendDateTimeFormat());
    return {"searchStartDate":startDate,"searchEndDate":lastDate};
  };
  Account_PresentationController.prototype.getDateRangeForMonths = function(noOfMonths){
    var fotmatUtilManager = applicationManager.getFormatUtilManager();
    var d = new Date();
    var month = d.getMonth();
    d.setMonth(d.getMonth() - noOfMonths);
    while (d.getMonth() === month) {
      d.setDate(d.getDate() - 1);
    }
    var startDate = fotmatUtilManager.getFormatedDateString(d,fotmatUtilManager.getBackendDateTimeFormat());
    var lastDate = fotmatUtilManager.getFormatedDateString(new Date(),fotmatUtilManager.getBackendDateTimeFormat());
    return {"searchStartDate":startDate,"searchEndDate":lastDate};
  };
  /**
* code for getting the posted transactions for pagenation
* @member of Account_PresentationController
* @param {JSON}
*/
  Account_PresentationController.prototype.getNextPostedTransactions = function(searchOptions, segData) {
    searchOptions.isScheduled = "0";
    var paginationManager = applicationManager.getPaginationManager();
    paginationManager.paging(scope_Acc_Pres.getPostedTransForPNSuccess, scope_Acc_Pres.getPostedTransForPNError, scope_Acc_Pres.getPostedTransForPN, segData, 1, searchOptions);
  };
  Account_PresentationController.prototype.getPostedTransForPN = function(searchOptions, getPostedTransForPNSuccess, getPostedTransForPNError) {
    var transactionManager = applicationManager.getTransactionsListManager();
    transactionManager.fetchPostedTransactions(searchOptions, getPostedTransForPNSuccess, getPostedTransForPNError);
  };
  Account_PresentationController.prototype.getPostedTransForPNSuccess = function(resSuccess) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var controller = applicationManager.getPresentationUtility().getController('frmAdvanceSearchResults', true);
    controller.assignScrollEndData(resSuccess);
  };
  Account_PresentationController.prototype.getPostedTransForPNError = function(resErr) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (resErr["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resErr);
  };
  Account_PresentationController.prototype.setEntryPoints=function(transactionType)
  {
    var navMan=applicationManager.getNavigationManager();
    switch(transactionType)
    {
      case "InternalTransfer":  navMan.setEntryPoint("makeatransfer","frmTransfers");
        break;
      case "ExternalTransfer":  navMan.setEntryPoint("makeatransfer","frmTransfers");
        break;
      case "P2P":  navMan.setEntryPoint("payaperson","frmTransfers");
        break;
    }
  };
  
  Account_PresentationController.prototype.showCustomerAccounts = function(membershipId) {
    var navManager = applicationManager.getNavigationManager();
    applicationManager.getPresentationUtility().showLoadingScreen();
    var accountManager = applicationManager.getAccountManager();
    var params = {
      "Membership_id": membershipId
    };
    accountManager.fetchInternalAccountBycustID(params, scope_Acc_Pres.presentationCustAccountsSucc, scope_Acc_Pres.presentationCustAccountsErr);
  };
  
  Account_PresentationController.prototype.presentationCustAccountsSucc = function(res) {
    var navManager = applicationManager.getNavigationManager();
    var accountObj = applicationManager.getAccountManager();
    var accountData = res;//accountObj.getInternalAccounts();
    var custominfo = navManager.getCustomInfo("frmDashboard");
    var custominfoCD = navManager.getCustomInfo("frmCustomerDashboard");
    if(!custominfo){
      custominfo = {};
    }
    var closedAccounts = new Map();
    var closedAccts = [];
    if (!kony.sdk.isNullOrUndefined(accountData) && accountData !== "") {
    accountData.forEach(function(account) {
      	if (closedAccounts.has(account.Membership_id)) {
           closedAccounts.set(account.Membership_id, closedAccounts.get(account.Membership_id) + 1);
        } else {
           closedAccounts.set(account.Membership_id, 1);
        }
    });
    accountData.forEach(function(account) {
        if (!((closedAccounts.get(account.Membership_id) === 1) && (account.accountStatus === 'CLOSED' || account.accountStatus === 'Closed') && 
              !applicationManager.getConfigurationManager().checkUserPermission('VIEW_CLOSED_ACCOUNT'))) {
            closedAccts.push(account);
        }
    });
    accountData = closedAccts;
    //added to stop showing portfolio accounts on dashboard and added additional condition to stop showing mortgageFacility ccounts in mobile native
    var removePortifolioAccountsData = JSON.parse(JSON.stringify(accountData)) 
    for(var i = removePortifolioAccountsData.length-1; i >=0; i--){
      if(removePortifolioAccountsData[i].isPortFolioAccount==="true" || removePortifolioAccountsData[i].accountType=='Investment' || removePortifolioAccountsData[i].accountType== 'mortgageFacility'){
        removePortifolioAccountsData.splice(i,1);
      }
    }
    if(removePortifolioAccountsData.length==accountData.length)
      custominfo.accountData = accountData;
    else
      custominfo.accountData = removePortifolioAccountsData;
    }
  //  custominfo.isGetListCalled =true
    navManager.setCustomInfo("frmDashboard", custominfo);
    var configurationManager = applicationManager.getConfigurationManager();
    var frmName = "";
    frmName = {"appName": "HomepageMA","friendlyName": "AccountsUIModule/frmUnifiedDashboard"}; 
    //Added if the user has already navigated to new dashboard, then he shouldn't navigate to old dashboard
//	if(!(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")))   
     applicationManager.getNavigationManager().setCustomInfo("frmFilterAccounts",{}); 
    navManager.navigateTo(frmName);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  
  Account_PresentationController.prototype.presentationCustAccountsErr = function(err) {
    kony.print(err);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(error["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  Account_PresentationController.prototype.getAdhocStatements = function(getAdhocSuccess,getAdhocFailure) {
  var accountManager = applicationManager.getAccountManager();
    accountManager.getAdhocStatements({},getAdhocSuccess, getAdhocFailure);
  };
 
    return Account_PresentationController;
});