define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController"], function(AsyncManager) {
    function Transfer_PresentationController() {
        
        scope_TransfersPresentationController = this;
        //stateNavigation - holds the value as true if it is on state management form like amount or review screen and for rest of screens hold false value
        scope_TransfersPresentationController.stateNavigation = "";
    //stateTriggeredForm - holds the value as mame of form where state management has triggered.
        scope_TransfersPresentationController.validateReferenceId = "";
        scope_TransfersPresentationController.stateTriggeredForm = "";
        scope_TransfersPresentationController.toSupportedOwnAccounts = [];
        scope_TransfersPresentationController.supportedCurrencies = [];
        scope_TransfersPresentationController.filteredToAccounts = [];
        scope_TransfersPresentationController.toAccountList = {};
        scope_TransfersPresentationController.europeFlowType = "";
        scope_TransfersPresentationController.externalAccount = false;
        scope_TransfersPresentationController.nickName = null;
        scope_TransfersPresentationController.entryPoint = "";
        scope_TransfersPresentationController.isNickNameUpdated = "";
        scope_TransfersPresentationController.isRecipientDeleted = "";
        scope_TransfersPresentationController.sameBankBenificiaryAdded = "";
        scope_TransfersPresentationController.otherBankBenificiaryAdded = "";
        scope_TransfersPresentationController.internationalBenificiaryAdded = "";
        scope_TransfersPresentationController.reEnteredAccountNumber = "";
        scope_TransfersPresentationController.swiftCode = "";
        scope_TransfersPresentationController.toBenCurrency = "";
        scope_TransfersPresentationController.routingNumber = "";
        scope_TransfersPresentationController.countryName = "";
        scope_TransfersPresentationController.duration="";
        scope_TransfersPresentationController.isNavigated = false;
        scope_TransfersPresentationController.toBankName="";
      	scope_TransfersPresentationController.transactionMode="";
		scope_TransfersPresentationController.bankName="";
		scope_TransfersPresentationController.IBAN="";
		scope_TransfersPresentationController.EnteredAccountNumber = "";
		scope_TransfersPresentationController.accDetHomeAcc="";
        scope_TransfersPresentationController.tncChcked=false;
        scope_TransfersPresentationController.limitsData = null;
    scope_TransfersPresentationController.haveLimitsBeenFetched = false;
      scope_TransfersPresentationController.mfaFlowType="";
      scope_TransfersPresentationController.asyncResponseData = {};
      scope_TransfersPresentationController.isRecipientSaveRequired = true;
      scope_TransfersPresentationController.searchSwiftData = {};
      scope_TransfersPresentationController.SwiftorBICCodeResults=[];
      scope_TransfersPresentationController.messageDetails=[];
      scope_TransfersPresentationController.swiftforEnteredIBAN ="";
      scope_TransfersPresentationController.isInternationIBANEntered=false;
      scope_TransfersPresentationController.isLoansAccountType = false;
      scope_TransfersPresentationController.previousAccountType = "";
      scope_TransfersPresentationController.currentAccountType = "";
      scope_TransfersPresentationController.serverDate = null;
      scope_TransfersPresentationController.selectedFromAccountData = {};
      scope_TransfersPresentationController.selectedToAccountData = {};
      scope_TransfersPresentationController.triggerOneTimePaymentFlow = false;
      scope_TransfersPresentationController.transactionTabSelected = ""; //Scheduled or Past 
      scope_TransfersPresentationController.filterTypeSelected = ""; //Transfer, Payment or Both
      /**   numberOfAsyncForInternalBen
          *  1.getFrequentSameBankAccount
          *  2.getSameBankAccount
            */
        scope_TransfersPresentationController.numberOfAsyncForInternalBen=2;
      /**   numberOfAsyncForExternalBen
          *  1.getFrequentOtherBankAccount
          *  2.getOtherBankAccount
            */
      scope_TransfersPresentationController.numberOfAsyncForExternalBen=2;
         /**   numberOfAsyncForInternationaAcc
          *  1.getFrequentInternationalExternalAccounts
          *  2.getAllInternationalExternalAccounts
            */
      scope_TransfersPresentationController.numberOfAsyncForInternationaAcc=2;
      scope_TransfersPresentationController.overrides = "";
        kony.mvc.Presentation.BasePresenter.call(this);
        this.asyncManager = new AsyncManager();
    }
    inheritsFrom(Transfer_PresentationController, kony.mvc.Presentation.BasePresenter);
    Transfer_PresentationController.prototype.initializePresentationController = function() {
    };
    Transfer_PresentationController.prototype.clearBuilderNonGeneratedAttributes = function() {
        scope_TransfersPresentationController.toBankName="";
        scope_TransfersPresentationController.reEnteredAccountNumber = "";
        scope_TransfersPresentationController.swiftCode = "";
        scope_TransfersPresentationController.routingNumber = "";
        scope_TransfersPresentationController.countryName = "";
        scope_TransfersPresentationController.duration="";
        scope_TransfersPresentationController.IBAN="";
    };
   Transfer_PresentationController.prototype.setToBankName=function(toBankName)
    {
      scope_TransfersPresentationController.toBankName=toBankName;
    };
     Transfer_PresentationController.prototype.getToBankName=function()
    {
       return scope_TransfersPresentationController.toBankName;
    };
   Transfer_PresentationController.prototype.setDuration=function(duration)
    {
      scope_TransfersPresentationController.duration=duration;
    };
     Transfer_PresentationController.prototype.getDuration=function()
    {
       return scope_TransfersPresentationController.duration;
    };
   Transfer_PresentationController.prototype.getReEnteredAccountNumber = function() {
        return scope_TransfersPresentationController.reEnteredAccountNumber;
    };
    Transfer_PresentationController.prototype.getEnteredAccountNumber = function() {
        return scope_TransfersPresentationController.EnteredAccountNumber;
    };
    Transfer_PresentationController.prototype.getSwiftCode = function() {
        return scope_TransfersPresentationController.swiftCode;
    };
	Transfer_PresentationController.prototype.getIBAN = function() {
        return scope_TransfersPresentationController.IBAN;
    };
    Transfer_PresentationController.prototype.getRoutingNumber = function() {
        return scope_TransfersPresentationController.routingNumber;
    };
    Transfer_PresentationController.prototype.getCountryName = function() {
        return scope_TransfersPresentationController.countryName;
    };
    Transfer_PresentationController.prototype.setSwiftCode = function(swiftCode) {
        scope_TransfersPresentationController.swiftCode=swiftCode;
    };
	 Transfer_PresentationController.prototype.setBankNameFromResponse=function(bankName){
      scope_TransfersPresentationController.bankName=bankName;
    };
        Transfer_PresentationController.prototype.getBankNameFromResponse=function(){
      return scope_TransfersPresentationController.bankName;
    };
    Transfer_PresentationController.prototype.setIBAN = function(IBAN) {
        scope_TransfersPresentationController.IBAN=IBAN;
    };
    Transfer_PresentationController.prototype.setRoutingNumber = function(routingNumber) {
        scope_TransfersPresentationController.routingNumber=routingNumber;
    };
    Transfer_PresentationController.prototype.setCountryName = function(countryName) {
        scope_TransfersPresentationController.countryName=countryName;
    };
    Transfer_PresentationController.prototype.setReEnteredAccountNumber = function(accNum) {
        scope_TransfersPresentationController.reEnteredAccountNumber = accNum;
    };
    Transfer_PresentationController.prototype.setEnteredAccountNumber = function(accNumber) {
        scope_TransfersPresentationController.EnteredAccountNumber = accNumber;
    };
 
    Transfer_PresentationController.prototype.fetchSameBankRecepients = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.fetchAllInternalBenificiaries(scope_TransfersPresentationController.fetchSameBankRecipientsPresentationSuccess, scope_TransfersPresentationController.fetchSameBankRecipientsPresentationError);
    };
    Transfer_PresentationController.prototype.fetchSameBankRecipientsPresentationSuccess = function(successResponse) {
        scope_TransfersPresentationController.commonFunctionForNavigation("frmManageRecipientList");
    };
    Transfer_PresentationController.prototype.fetchSameBankRecipientsPresentationError = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error.errorMessage);
        }
    };
    Transfer_PresentationController.prototype.getBenificiaryScheduledAndPostedTransactions = function(selectedAccountDetails) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryObject(selectedAccountDetails);
        var benificiaryDetails = recipientsManager.getBenificiaryData();
        var transactionObj = applicationManager.getTransactionManager();
        var criteria1 = {
            "IBAN": benificiaryDetails.IBAN,
            "accountNumber": benificiaryDetails.accountNumber,
            "firstRecordNumber": "0",
            "lastRecordNumber": "1000"
        };
        transactionObj.fetchToExternalAccountTransactions(criteria1, scope_TransfersPresentationController.fetchBenificiaryPenTranPresSucCallback, scope_TransfersPresentationController.fetchBenificiaryPenTranPreErrCallback);
    };
    Transfer_PresentationController.prototype.fetchBenificiaryPenTranPresSucCallback = function(resTransPend) {
        var formatUtil = applicationManager.getFormatUtilManager();
        var navMan = applicationManager.getNavigationManager();
        var selectedAccount = {};
        selectedAccount.Transactions = resTransPend;
        for (var i = 0; i < selectedAccount.Transactions.length; i++) {
            var trandateobj = formatUtil.getDateObjectfromString(selectedAccount.Transactions[i]["transactionDate"], "YYYY-MM-DD");
            selectedAccount.Transactions[i]["transactionDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat());
            selectedAccount.Transactions[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(selectedAccount.Transactions[i]["amount"],selectedAccount.Transactions[i]["transactionCurrency"]);
        }
        navMan.setCustomInfo("frmManageTransferRecipientEurope", selectedAccount);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmManageTransferRecipientEurope");
    };
    Transfer_PresentationController.prototype.fetchBenificiaryPenTranPreErrCallback = function(resTransPendErr) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resTransPendErr["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPendErr.errorMessage);
        }
    };
    Transfer_PresentationController.prototype.fetchBenificiaryPosTranPresSucCallback = function(resTransPost) {
        scope_TransfersPresentationController.asyncManager.setSuccessStatus(1, resTransPost);
        if (scope_TransfersPresentationController.asyncManager.areAllservicesDone(2)) {
            scope_TransfersPresentationController.navigateToBenificiaryTransactionDetails();
        }
    };
    Transfer_PresentationController.prototype.fetchBenificiaryPosTranErrCallback = function(resTransPostErr) {
        scope_TransfersPresentationController.asyncManager.setErrorStatus(1, resTransPostErr);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resTransPostErr["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPostErr.errorMessage);
        }
    };
    Transfer_PresentationController.prototype.downloadAttachments = function(isSingleFile, fileNames, i) {
      var requestParam = {};
            if (isSingleFile) {
                 requestParam.fileID = fileNames.fileID;
                 requestParam.fileName = fileNames.fileName;

            } else {
                requestParam.fileID = fileNames[i].fileID;
                requestParam.fileName = fileNames[i].fileName;
      }
      //requestParam.customerId = applicationManager.getUserPreferencesManager().getUserObj().userId;
      var downloadURL = applicationManager.getTransactionManager().getDownloadAttachmentUrl(requestParam);
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("downloadURL",downloadURL);
    },
	Transfer_PresentationController.prototype.fetchInternationalAccountsByAccNoOrName = function(query) {
    if (query && query.length > 0) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var data = applicationManager.getAccountManager().searchExternalInternationalAccounts(query);
      var currentForm = kony.application.getCurrentForm().id;
      var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
      controller.segmentDataSet(data);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
	Transfer_PresentationController.prototype.fetchExternalAccountsByIbanOrName = function(query) {
    if (query && query.length > 0) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var data = applicationManager.getAccountManager().searchExternalAccounts(query);
      for(var i = 0; i < data.length; i++){
        if(!data[i].nickName){
          data[i].nickName = data[i].beneficiaryName;
        }
      }
      var currentForm = kony.application.getCurrentForm().id;
      var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
      controller.segmentDataSet(data);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
  Transfer_PresentationController.prototype.checkExistingAccountwithAccountNumber = function(accNo){
    if (accNo.length >= 0) {
      var accList = applicationManager.getAccountManager().searchExternalInternationalAccounts(accNo);
      var navMan = applicationManager.getNavigationManager();
      var accdata =  navMan.getCustomInfo("frmTransfersToAccount");
      var accountNumber = accdata.selectedAccountData.accountNumber;
      if(accList.length == 1 && accList[0].accountNumber == accountNumber){
        accdata.selectedAccountData = accList[0];
        accdata.isNewRecipient = false;
        var currentForm = kony.application.getCurrentForm().id;
        var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
        controller.showAccountExistsPopup(accountNumber);
      }
      else {
        accdata.isNewRecipient = true;
      navMan.setCustomInfo("frmTransfersToAccount",accdata);
      scope_TransfersPresentationController.commonFunctionForNavigation("frmTransfersRecipientNameEurope");
      }
    }
  };
  Transfer_PresentationController.prototype.checkExistingAccountwithIBAN = function(IBAN){
    var accList = applicationManager.getAccountManager().searchExternalAccounts(IBAN);
    var navMan = applicationManager.getNavigationManager();
    var forUtility = applicationManager.getFormatUtilManager();
    var accdata =  navMan.getCustomInfo("frmTransfersToAccount");
    var IBAN = accdata.selectedAccountData.IBAN;
    if(accList.length == 1 && forUtility.deFormatIBAN(accList[0].IBAN) == IBAN){
      accList[0].IBAN = forUtility.deFormatIBAN(accList[0].IBAN);
      accdata.selectedAccountData = accList[0];
      accdata.isNewRecipient = false;
      var formController = applicationManager.getPresentationUtility().getController('frmTransfersToAccountEurope', true);
      formController.showAccountExistingAlert();
    }
    else{
      accdata.isNewRecipient = false;
      navMan.setCustomInfo("frmTransfersToAccount",accdata);
      scope_TransfersPresentationController.commonFunctionForNavigation("frmTransfersRecipientNameEurope");
    }
  };
  Transfer_PresentationController.prototype.getServiceName =function(displayName){
    var serviceName;
    if(displayName === "InternationalAccountsTransfer") {
      serviceName = "INTERNATIONAL_ACCOUNT_FUND_TRANSFER";
    } else if (displayName === "OtherBankAccountsTransfer") {
      serviceName ="INTER_BANK_ACCOUNT_FUND_TRANSFER";
    }
    var servicesForUser = applicationManager.getConfigurationManager().getServicesListForUser();
    if (servicesForUser) {
      serviceName = servicesForUser.filter(function(dataItem){
        if(dataItem === serviceName) return true;
        });
           if(serviceName && serviceName.length > 0) {
        serviceName = serviceName[0];
        }
      }
    return serviceName;
  };
  Transfer_PresentationController.prototype.saveRecipient = function(save){
    var navMan = applicationManager.getNavigationManager();
    var accountList = navMan.getCustomInfo("frmTransfersToAccount");
    var IBAN = accountList.selectedAccountData.IBAN;
    var serviceName = scope_TransfersPresentationController.getServiceName("OtherBankAccountsTransfer");
    scope_TransfersPresentationController.clearBenificiaryData();
    if(save == 0){
      navMan.setCustomInfo("frmManageTransferRecipient", accountList.selectedAccountData);
      var recipientName= accountList.selectedAccountData.beneficiaryName;
      scope_TransfersPresentationController.setIBAN(IBAN);
      scope_TransfersPresentationController.navigateToDomesticBenificiaryVerifyDetails(recipientName, IBAN);
    }
    else{
      scope_TransfersPresentationController.fetchBankDetailsForDomesticTransfer(IBAN, serviceName);
    }
  };
  Transfer_PresentationController.prototype.navFromRecipName = function(){
    var navMan = applicationManager.getNavigationManager();
    var accountList = navMan.getCustomInfo("frmTransfersToAccount");
    var transferType = accountList.transactionType;
    if (transferType == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToOtherEuropeanAccounts")) {
      var IBAN = accountList.selectedAccountData.IBAN;
      var serviceName = scope_TransfersPresentationController.getServiceName("OtherBankAccountsTransfer");
      scope_TransfersPresentationController.fetchBankDetailsForDomesticTransfer(IBAN, serviceName);
      }
    else{
        scope_TransfersPresentationController.commonFunctionForNavigation("frmTransfersSwiftCodeEurope");
      }
  };
    Transfer_PresentationController.prototype.navigateToBenificiaryTransactionDetails = function(res) {
        var formatUtil = applicationManager.getFormatUtilManager();
        var navMan = applicationManager.getNavigationManager();
        var selectedAccount = {};
        selectedAccount.pendingTransactions = scope_TransfersPresentationController.asyncManager.getData(0);
        selectedAccount.postedTransaction = scope_TransfersPresentationController.asyncManager.getData(1);
        for (var i = 0; i < selectedAccount.pendingTransactions.length; i++) {
            var trandateobj = formatUtil.getDateObjectfromString(selectedAccount.pendingTransactions[i]["transactionDate"], "YYYY-MM-DD");
            selectedAccount.pendingTransactions[i]["transactionDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat());
            selectedAccount.pendingTransactions[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(selectedAccount.pendingTransactions[i]["amount"]);
        }
        for (var i = 0; i < selectedAccount.postedTransaction.length; i++) {
            var trandateobj = formatUtil.getDateObjectfromString(selectedAccount.postedTransaction[i]["transactionDate"], "YYYY-MM-DD");
            selectedAccount.postedTransaction[i]["transactionDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat())
            selectedAccount.postedTransaction[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(selectedAccount.postedTransaction[i]["amount"]);
        }
        navMan.setCustomInfo("frmManageTransferRecipient", selectedAccount);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmManageTransferRecipient");
    };
    Transfer_PresentationController.prototype.updateBenificiaryNickName = function(nickName) {
        var benificiaryDetails = scope_TransfersPresentationController.getBenificiaryData();
        var editDetails = {
            "IBAN": benificiaryDetails.IBAN,
            "accountNumber": benificiaryDetails.accountNumber,
            "nickName": nickName,
            "isVerified": 1,
          	"payeeId": benificiaryDetails.Id,
          	"isInternationalAccount": benificiaryDetails.isInternationalAccount,
          	"isSameBankAccount": benificiaryDetails.isSameBankAccount,
          	"beneficiaryName": benificiaryDetails.beneficiaryName
        };
        var recipientsManager = applicationManager.getRecipientsManager();
        if (scope_TransfersPresentationController.getFlowType() === "InternationalRecipients") {
            editDetails.isInternationalAccount = "true";
            recipientsManager.editABenificiary(editDetails, scope_TransfersPresentationController.updateBankRecipientsPresentationSuccess, scope_TransfersPresentationController.updateBankRecipientsPresentationError);
        } else {
            recipientsManager.editABenificiary(editDetails, scope_TransfersPresentationController.updateBankRecipientsPresentationSuccess, scope_TransfersPresentationController.updateBankRecipientsPresentationError);
        }
    };
    Transfer_PresentationController.prototype.updateBankRecipientsPresentationSuccess = function(successResponse) {
       scope_TransfersPresentationController.isNickNameUpdated = true;
        if (scope_TransfersPresentationController.getFlowType() === "SameBankRecipients") {
            scope_TransfersPresentationController.fetchSameBankRecepients();
        } else if (scope_TransfersPresentationController.getFlowType() === "InternationalRecipients") {
            scope_TransfersPresentationController.fetchInternationalRecepients();
        } else {
            scope_TransfersPresentationController.fetchOtherBankRecepients();
        }
    };
    Transfer_PresentationController.prototype.updateBankRecipientsPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        } else {
			var controller = applicationManager.getPresentationUtility().getController('frmManageEditRecipient', true);
			controller.showErrorPopUp(errorResponse["errmsg"]);
		}
    };
    Transfer_PresentationController.prototype.deleteSameBankBenificiary = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        var transferModPresentationController = applicationManager.getModulesPresentationController("TransferEuropeUIModule");
        var benificiaryDetails = transferModPresentationController.getBenificiaryData();
        if (transferModPresentationController.getFlowType() === "SameBankRecipients") {
            recipientsManager.deleteABenificiary(benificiaryDetails, scope_TransfersPresentationController.deleteSameBankRecipientsPresentationSuccess, scope_TransfersPresentationController.deleteSameBankRecipientsPresentationError);
        } else if (transferModPresentationController.getFlowType() === "InternationalRecipients") {
            recipientsManager.deleteABenificiary(benificiaryDetails, scope_TransfersPresentationController.deleteInternationalBankRecipientsPresentationSuccess, scope_TransfersPresentationController.deleteInternationalBankRecipientsPresentationError);
        } else {
            recipientsManager.deleteABenificiary(benificiaryDetails, scope_TransfersPresentationController.deleteOtherBankRecipientsPresentationSuccess, scope_TransfersPresentationController.deleteOtherBankRecipientsPresentationError);
        }
    };
    Transfer_PresentationController.prototype.deleteInternationalBankRecipientsPresentationSuccess = function(successResponse) {
        scope_TransfersPresentationController.isRecipientDeleted = true;
        scope_TransfersPresentationController.fetchInternationalRecepients();
    };
    Transfer_PresentationController.prototype.deleteInternationalBankRecipientsPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        }
    };
    Transfer_PresentationController.prototype.deleteSameBankRecipientsPresentationSuccess = function(successResponse) {
        scope_TransfersPresentationController.isRecipientDeleted = true;
        scope_TransfersPresentationController.fetchSameBankRecepients();
    };
    Transfer_PresentationController.prototype.deleteSameBankRecipientsPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        }
    };
    Transfer_PresentationController.prototype.deleteOtherBankRecipientsPresentationSuccess = function(successResponse) {
        scope_TransfersPresentationController.isRecipientDeleted = true;
        scope_TransfersPresentationController.fetchOtherBankRecepients();
    };
    Transfer_PresentationController.prototype.deleteOtherBankRecipientsPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse.errorMessage);
        }
    };
    Transfer_PresentationController.prototype.fetchOtherBankRecepients = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.fetchAllExternalBenificiaries(scope_TransfersPresentationController.fetchOtherBankRecepientsPresentationSuccess, scope_TransfersPresentationController.fetchOtherBankRecepientsPresentationError);
    };
   
     Transfer_PresentationController.prototype.evaluateAmount = function(amount,fromAvlBal,selectedCurrency,fromAccCurrency) {
        var forUtility = applicationManager.getFormatUtilManager();
        fromAvlBal = forUtility.deFormatAmount(fromAvlBal);
       var configManager = applicationManager.getConfigurationManager();
       if(fromAccCurrency!=selectedCurrency){
         var transactionManager = applicationManager.getTransactionManager();
         transactionManager.setTransactionAttribute("transactionCurrency",selectedCurrency);
         transactionManager.setTransactionAttribute("amount",amount);
         var navManager = applicationManager.getNavigationManager();
         navManager.navigateTo("frmTransferFrequencyEurope");
        }
        amount = forUtility.deFormatAmount(amount);
        if (Number(amount) > Number(fromAvlBal)) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var controller = applicationManager.getPresentationUtility().getController('frmTransferAmountEurope', true);
            controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.amountGreaterThanAvailBal"));
        } else if (Number(amount) === 0) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var controller = applicationManager.getPresentationUtility().getController('frmTransferAmountEurope', true);
            controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.validAmount"));
        } else {
            var transactionManager = applicationManager.getTransactionManager();
            transactionManager.setTransactionAttribute("amount",amount);
            var navManager = applicationManager.getNavigationManager();
          	transactionManager.setTransactionAttribute("transactionCurrency",selectedCurrency);
            //       var index = scope_TransfersPresentationController.getSelectedFrequencyIndex();
            //       navManager.setCustomInfo("frmTransferFrequency",{"index":index});
            navManager.navigateTo("frmTransferFrequencyEurope");
        }
    };
    Transfer_PresentationController.prototype.fetchOtherBankRecepientsPresentationSuccess = function(successResponse) {
        scope_TransfersPresentationController.commonFunctionForNavigation("frmTransfersManageRecipientList");
    };
    Transfer_PresentationController.prototype.fetchOtherBankRecepientsPresentationError = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
    };
    

	  Transfer_PresentationController.prototype.showAccounts = function(type) {
        var navMan = applicationManager.getNavigationManager();
        var trasMan = applicationManager.getTransactionManager();
        //navMan.setCustomInfo("frmTransfersToAccount",{});
        var accountList = navMan.getCustomInfo("frmTransfersToAccount");
        if (accountList && accountList !== null) {
            accountList.type = type;
        } else {
            accountList = {
                "type": type
            };
        }
        navMan.setCustomInfo("frmTransfersToAccount", accountList);
        var action;
      if (type == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToMyDBXAccount")) {
        action= scope_TransfersPresentationController.getActionByType(type);
        scope_TransfersPresentationController.setFlowType("MyKonyAccounts");
        trasMan.setTransactionAttribute("transactionType","InternalTransfer");
        trasMan.setTransactionAttribute("transferType","internal");
        scope_TransfersPresentationController.showFromAccounts(scope_TransfersPresentationController.showInternalAccountsPresentationSuccessCallBack);
        
        //scope_TransfersPresentationController.fetchTransferLimits(action,scope_TransfersPresentationController.fetchLimitsForKonyAccountSuccessCallBack);
      } else if (type == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToOtherEuropeanAccounts")) {
        action= scope_TransfersPresentationController.getActionByType(type);
        scope_TransfersPresentationController.setFlowType("OtherBankAccountsCreateTransfer");
        trasMan.setTransactionAttribute("transactionType","ExternalTransfer");
        trasMan.setTransactionAttribute("transferType","domestic");
        scope_TransfersPresentationController.navigateToExternalFlow(type);
      } else if (type == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToInternationalAccounts")) {
        scope_TransfersPresentationController.setFlowType("InternationalTransferCreateTransfer");
        trasMan.setTransactionAttribute("transactionType","ExternalTransfer");
        trasMan.setTransactionAttribute("transferType","international");
        action= scope_TransfersPresentationController.getActionByType(type);
        scope_TransfersPresentationController.navigateToInternationalFlow(type);
      }
      if(action){
        scope_TransfersPresentationController.fetchLimits(action);
      }
    };
    Transfer_PresentationController.prototype.showInternalAccountsPresentationSuccessCallBack = function(res) {
        var navMan = applicationManager.getNavigationManager();
        var accNav = applicationManager.getAccountManager();
        var toacc = accNav.getToTransferSupportedAccounts();
        var accountList = navMan.getCustomInfo("frmTransfersToAccount");
        accountList.internalAccounts = toacc;
        navMan.setCustomInfo("frmTransfersToAccount", accountList);
        navMan.navigateTo("frmTransfersToAccountDBXEurope");
    };
	Transfer_PresentationController.prototype.navigateToInternationalFlow = function(type) {
        var navMan = applicationManager.getNavigationManager();
        var accountList = navMan.getCustomInfo("frmTransfersToAccount");
        accountList.addedFlag = scope_TransfersPresentationController.externalAccount;
      	accountList.transactionType = type;
        navMan.setCustomInfo("frmTransfersToAccount", accountList);
      	var accMan = applicationManager.getAccountManager();
        accMan.fetchExternalAccounts(function() {}, function(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
          }
        });
        navMan.navigateTo("frmtransfersAccountNumberEurope");
        scope_TransfersPresentationController.externalAccount = false;
    };
    Transfer_PresentationController.prototype.navigateToExternalFlow = function(type) {
		var navMan = applicationManager.getNavigationManager();
		var accountList = navMan.getCustomInfo("frmTransfersToAccount");
		accountList.addedFlag = scope_TransfersPresentationController.externalAccount;
		accountList.transactionType = type;
		navMan.setCustomInfo("frmTransfersToAccount", accountList);
		var accMan = applicationManager.getAccountManager();
		accMan.fetchExternalAccounts(function() {},function(){});
		var recipientManager = applicationManager.getRecipientsManager();
		recipientManager.fetchAllExternalBenificiaries(function() {
		  navMan.navigateTo("frmTransfersToRecipientList");
		  scope_TransfersPresentationController.externalAccount = false;
		}, function(err) {
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		  if (err["isServerUnreachable"]) {
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
		  }
		  navMan.navigateTo("frmTransfersToRecipientList");
		  scope_TransfersPresentationController.externalAccount = false;
		});
	};
    Transfer_PresentationController.prototype.showFromAccounts = function(successCB) {
        var accMan = applicationManager.getAccountManager();
        accMan.fetchInternalAccounts(successCB, scope_TransfersPresentationController.showFromAccountsPresentationErrorCallBack);
    };

    Transfer_PresentationController.prototype.fromAccountOnContinuePresentationSuccessCallBack = function(res) {
        var accNav = applicationManager.getAccountManager();
        var frmacc = accNav.getFromTransferSupportedAccounts();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersFromAccount", {
            "fromaccounts": frmacc
        });
        navMan.navigateTo("frmTransferAmountEurope");
    };
    Transfer_PresentationController.prototype.showFromAccountsPresentationErrorCallBack = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"])
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        else
            kony.print("error in showFromAccountsPresentationErrorCallBack");
    };
 
    Transfer_PresentationController.prototype.transferScheduledDate = function(strtDate) {
        var formatedDate = strtDate;
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("scheduledDate",formatedDate);
      	transactionManager.setTransactionAttribute("scheduledCalendarDate",scope_TransfersPresentationController.convertCalendarDateToLocaleDate(formatedDate));
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo("frmTransferConfirmationEurope");
    };
    Transfer_PresentationController.prototype.transferScheduledStrtDate = function(strtDate) {
        var formatedDate = strtDate;
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("frequencyStartDate",formatedDate);
        transactionManager.setTransactionAttribute("scheduledDate",formatedDate);
      	transactionManager.setTransactionAttribute("scheduledCalendarDate",scope_TransfersPresentationController.convertCalendarDateToLocaleDate(formatedDate));
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo("frmTransfersEndDateEurope");
    };
    Transfer_PresentationController.prototype.transferScheduledEndDate = function(endDate) {
        var formatedDate = endDate;
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("frequencyEndDate",formatedDate);
      	transactionManager.setTransactionAttribute("endCalendarDate",scope_TransfersPresentationController.convertCalendarDateToLocaleDate(formatedDate));
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo("frmTransferConfirmationEurope");
    };
    Transfer_PresentationController.prototype.transferSetRecurrence = function(reccurrence) {
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("numberOfRecurrences",reccurrence);
        var navMan = applicationManager.getNavigationManager();
        // navMan.setCustomInfo("frmTransfersStartDate","NofRR");
        navMan.navigateTo("frmTransfersStartDateEurope");
    };
  
 
    
   Transfer_PresentationController.prototype.navAfterToAcc = function() {
        var accMan = applicationManager.getAccountManager();
        var transactionManager = applicationManager.getTransactionManager();
        var navMan = applicationManager.getNavigationManager();
        var accountList = navMan.getCustomInfo("frmTransfersToAccount");
        var preAccData = accMan.getTransfersPreferredAccount();
        if(transactionManager.transferObject.fromAccountNumber==""||transactionManager.transferObject.fromAccountNumber==null||transactionManager.transferObject.fromAccountNumber==undefined)      
       scope_TransfersPresentationController.setFromAccountsForTransactions(preAccData);
        var selectedAccountData = accountList.selectedAccountData;
        if (accountList.type == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToMyDBXAccount")) {
            transactionManager.setTransactionAttribute("toAccountNumber",selectedAccountData["accountID"]);
            transactionManager.setTransactionAttribute("toAccountType",selectedAccountData["accountType"]);
            transactionManager.setTransactionAttribute("toAccountName",selectedAccountData["accountName"]);
           transactionManager.setTransactionAttribute("toAccountCurrency",selectedAccountData["toAccountCurrency"]);
           // transactionManager.setTransactionAttribute("toBankName",selectedAccountData["bankName"]);
            scope_TransfersPresentationController.setToBankName(selectedAccountData["bankName"]);
        } else {
          if(accountList.transactionType == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToInternationalAccounts")){
            if(!kony.sdk.isNullOrUndefined(selectedAccountData["accountNumber"]))
              transactionManager.setTransactionAttribute("toAccountNumber",selectedAccountData["accountNumber"]);
            if(!kony.sdk.isNullOrUndefined(selectedAccountData["swiftCode"])){
              transactionManager.setTransactionAttribute("swiftCode",selectedAccountData["swiftCode"]);
            }
          }
          else{
            if(!kony.sdk.isNullOrUndefined(selectedAccountData["IBAN"])){
              transactionManager.setTransactionAttribute("IBAN",selectedAccountData["IBAN"]);
            }
          }
          if(!kony.sdk.isNullOrUndefined(selectedAccountData["bankName"]))
            scope_TransfersPresentationController.setToBankName(selectedAccountData["bankName"]);
          if(!kony.sdk.isNullOrUndefined(selectedAccountData["beneficiaryName"])){
            transactionManager.setTransactionAttribute("toAccountName",selectedAccountData["beneficiaryName"]);
            transactionManager.setTransactionAttribute("beneficiaryName",selectedAccountData["beneficiaryName"]);
          }
        }
        if ((preAccData === "") || (preAccData === undefined) || (preAccData === null) || ((accountList.type === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToMyDBXAccount")) && (accountList.selectedAccountData["accountID"] === transactionManager.transferObject.fromAccountNumber))) {
            applicationManager.getPresentationUtility().showLoadingScreen();
            scope_TransfersPresentationController.showFromAccounts(scope_TransfersPresentationController.fromAccountsPresentationSuccessCallBack);
        } else {
            
            scope_TransfersPresentationController.showPreferredAccount();
        }
    };

    Transfer_PresentationController.prototype.getAmount = function() {
        var amount = null;
        var transactionmanager = applicationManager.getTransactionManager();
        var formatUtil = applicationManager.getFormatUtilManager();
        if (transactionmanager.getTransactionObject().amount !== undefined && transactionmanager.getTransactionObject().amount !== null && transactionmanager.getTransactionObject().amount !== "") {
            amount = formatUtil.deFormatAmount(transactionmanager.getTransactionObject().amount);
        }
        return amount;
    };
    Transfer_PresentationController.prototype.showPreferredAccount = function() {
        scope_TransfersPresentationController.showFromAccounts(scope_TransfersPresentationController.fromAccountOnContinuePresentationSuccessCallBack)
    };
    Transfer_PresentationController.prototype.navigateToReEnterAccountNumber = function(accountNumber) {
        var recipientsManager = applicationManager.getRecipientsManager();
        var benificiaryData={};
        benificiaryData.accountNumber=accountNumber;
        recipientsManager.initializeBeneficiaryDataWithAccountNum(benificiaryData);
        if (scope_TransfersPresentationController.getFlowType() === "InternationalRecipients" || scope_TransfersPresentationController.getFlowType() === "InternationalTransferCreateTransfer") {
            var recipientsManager = applicationManager.getRecipientsManager();
            recipientsManager.setBeneficiaryAttribute("countryName",scope_TransfersPresentationController.countryName);
            recipientsManager.setBeneficiaryAttribute("swiftCode",scope_TransfersPresentationController.swiftCode);
			recipientsManager.setBeneficiaryAttribute("bankName",scope_TransfersPresentationController.bankName);
        }
        if (scope_TransfersPresentationController.getFlowType() === "OtherBankRecipients" || scope_TransfersPresentationController.getFlowType() === "OtherBankAccountsCreateTransfer") {
            var recipientsManager = applicationManager.getRecipientsManager();
            recipientsManager.setBeneficiaryAttribute("routingNumber",scope_TransfersPresentationController.routingNumber);
        }
        scope_TransfersPresentationController.commonFunctionForNavigation("frmReEnterBenAccNoEurope");
    };
    Transfer_PresentationController.prototype.navigateToBenName = function(accountNumber) {
        scope_TransfersPresentationController.setReEnteredAccountNumber(accountNumber);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmBenNameEurope");
    };
    Transfer_PresentationController.prototype.navigateToBenificiaryName = function(accountType) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("accountType",accountType);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmBenNameEurope");
    };
//     Transfer_PresentationController.prototype.navigateToBenificiaryVerifyDetails = function(recipientName) {
//         var recipientsManager = applicationManager.getRecipientsManager();
//         recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
//         scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
//     };
  
  Transfer_PresentationController.prototype.navigateToBenificiaryVerifyDetails = function(accountNb) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("accountNumber",accountNb);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    };
  
  Transfer_PresentationController.prototype.navigateToVerifyDetailsFromPhoneNumber = function(PhoneData) {
    var recipientsManager = applicationManager.getRecipientsManager();
    recipientsManager.setBeneficiaryAttribute("phoneNumber",PhoneData.phoneNumber);
    scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
  };
  Transfer_PresentationController.prototype.navigateToVerifyDetailsFromEmailAddress = function(EmailData) {
    var recipientsManager = applicationManager.getRecipientsManager();
    if(EmailData.emailAddress){
      recipientsManager.setBeneficiaryAttribute("email",EmailData.emailAddress);
      scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      recipientsManager.setBeneficiaryAttribute("email",EmailData.emailAddress);
    }
    
  };
	 Transfer_PresentationController.prototype.navigateToDomesticBenificiaryVerifyDetails = function(recipientName, IBAN) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
        recipientsManager.setBeneficiaryAttribute("IBAN",IBAN);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    };
	 Transfer_PresentationController.prototype.navigateToBenificiaryInternationalVerifyDetails = function(recipientName, accNumber, swiftCode) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
        recipientsManager.setBeneficiaryAttribute("swiftCode",swiftCode);
        recipientsManager.setBeneficiaryAttribute("accountNumber",accNumber);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    };
    Transfer_PresentationController.prototype.navigateToEnterBenificiaryAccountNumber = function(routingNumber) {
        var recipientsManager = applicationManager.getRecipientsManager();
        scope_TransfersPresentationController.setRoutingNumber(routingNumber);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEnterBenAccNo");
    };
   Transfer_PresentationController.prototype.setNickName=function(nickName){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("nickName",nickName);
    };
      Transfer_PresentationController.prototype.setIsVerified=function(value){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("isVerified",value);
    };
      Transfer_PresentationController.prototype.setIsSameBankAccount=function(value){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("isSameBankAccount",value);
    };
      Transfer_PresentationController.prototype.setIsInternationalAccount=function(value){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("isInternationalAccount",value);
    };
        Transfer_PresentationController.prototype.setBankName=function(bankName){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("bankName",bankName);
    };
  Transfer_PresentationController.prototype.setBankCountryName = function(country) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("countryName", country);
    };
    Transfer_PresentationController.prototype.navigateToEnterBenificiaryRoutingNumber = function(bankDetails) {
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmAddBenRoutNo", {
            "bankDetails": bankDetails
        });
        navMan.navigateTo("frmAddBenRoutNo");
    };
    Transfer_PresentationController.prototype.createInternalBenificiary = function(flowType) {
        var navMan = applicationManager.getNavigationManager();
        var toDetails = navMan.getCustomInfo("frmTransfersToAccount");
        if (toDetails && toDetails !== null) {
            toDetails.accountDetailsType = "Other Kony Bank Members";
        } else {
            toDetails = {
                "accountDetailsType": "Other Kony Bank Members"
            };
        }
        navMan.setCustomInfo("frmTransfersToAccount", toDetails);
        var benificiaryData=scope_TransfersPresentationController.getBenificiaryData();
        var recipientsManager = applicationManager.getRecipientsManager();
        //benificiaryData.accountType = "Savings"; //Temp addition, because mobile doesn't have UI for selecting account type
      	var configManager = applicationManager.getConfigurationManager();
      	if(configManager.isSMEUser === "true" || configManager.isMBBUser === "true" || configManager.isCombinedUser == "true"){
        	benificiaryData.isBusinessPayee = "1";
      	}
      	else{
        	benificiaryData.isBusinessPayee = "0";
      	}
        if (flowType === "MANAGE") {
            recipientsManager.createABenificiary(benificiaryData, scope_TransfersPresentationController.createBenificiaryManageFlowPresentationSuccess.bind(this, benificiaryData), scope_TransfersPresentationController.createBenificiaryManageFlowPresentationError);
        }
        else {
            recipientsManager.createABenificiary(benificiaryData, scope_TransfersPresentationController.createSameBankBenificiaryPresentationSuccess, scope_TransfersPresentationController.createSameBankBenificiaryPresentationError);
        }
    };
    Transfer_PresentationController.prototype.createSameBankBenificiaryPresentationSuccess = function(succResponse) {
        scope_TransfersPresentationController.sameBankBenificiaryAdded = true;
        var navMan = applicationManager.getNavigationManager();
        var accntType = navMan.getCustomInfo("frmTransfersToAccount");
        var recipientsManager = applicationManager.getRecipientsManager();
        var benificiaryData=scope_TransfersPresentationController.getBenificiaryData();
        if (scope_TransfersPresentationController.getFlowType() === "OtherKonyBankMembersCreateTransfer") {
          //var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
          var accountsList=scope_TransfersPresentationController.getToAccounts();
          var internalAccList =scope_TransfersPresentationController.getAllInternalBankBenificiaries();
          internalAccList.push(succResponse.selectedAccountData);
          accountsList.internalBenificiaries = internalAccList;
          scope_TransfersPresentationController.setToAccountsList(accountsList);
          var transactionManager = applicationManager.getTransactionManager();
          scope_TransfersPresentationController.setBenAddressInTransactionObject(benificiaryData);
          transactionManager.setTransactionAttribute("isRecipientAdded",true);
          transactionManager.setTransactionAttribute("countryName", benificiaryData.countryName);
          transactionManager.setTransactionAttribute("bankName", benificiaryData.bankName);
          transactionManager.setTransactionAttribute("addedRecipientDetails",succResponse.selectedAccountData);
          transactionManager.setTransactionAttribute("serviceName", 'INTRA_BANK_FUND_TRANSFER_CREATE');
          var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
          controller.navigateToAmountScreen();
        }
        if (scope_TransfersPresentationController.getFlowType() === "SameBankRecipients") {
            scope_TransfersPresentationController.fetchSameBankRecepients();
        }
    };
    Transfer_PresentationController.prototype.createSameBankBenificiaryPresentationError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
            controller.bindGenericError(err.errorMessage);
        }
    };
    Transfer_PresentationController.prototype.createExternalBenificiary = function(flowType) {
        var navMan = applicationManager.getNavigationManager();
        var toDetails = navMan.getCustomInfo("frmTransfersToAccount");
        if (toDetails && toDetails !== null) {
            toDetails.accountDetailsType = "Other Bank Accounts";
        } else {
            toDetails = {
                "accountDetailsType": "Other Bank Accounts"
            };
        }
      if(navMan.getEntryPoint("createEuropeExternalBenificiaries")==="frmTransfersManageRecipientList"){
          scope_TransfersPresentationController.setFlowType("OtherBankRecipients");
      }
        navMan.setCustomInfo("frmTransfersToAccount", toDetails);
        var recipientsManager = applicationManager.getRecipientsManager();
        var benificiaryData=scope_TransfersPresentationController.getBenificiaryData();
        //benificiaryData.accountType = "Savings"; //Temp addition, because mobile doesn't have UI for selecting account type
      	var configManager = applicationManager.getConfigurationManager();
      	if(configManager.isSMEUser === "true" || configManager.isMBBUser === "true" || configManager.isCombinedUser == "true"){
        	benificiaryData.isBusinessPayee = "1";
      	}
      	else{
        	benificiaryData.isBusinessPayee = "0";
      	}
        if (flowType === "MANAGE") {
            recipientsManager.createABenificiary(benificiaryData, scope_TransfersPresentationController.createBenificiaryManageFlowPresentationSuccess.bind(this, benificiaryData), scope_TransfersPresentationController.createBenificiaryManageFlowPresentationError);
        }
        else {
            recipientsManager.createABenificiary(benificiaryData, scope_TransfersPresentationController.createOtherBankBenificiaryPresentationSuccess, scope_TransfersPresentationController.createOtherBankBenificiaryPresentationError);
        } 
    };
    Transfer_PresentationController.prototype.createOtherBankBenificiaryPresentationSuccess = function(succResponse) {
        scope_TransfersPresentationController.otherBankBenificiaryAdded = true;
        var navMan = applicationManager.getNavigationManager();
        var accntType = navMan.getCustomInfo("frmTransfersToAccount");
       var benificiaryData=scope_TransfersPresentationController.getBenificiaryData();
       if (scope_TransfersPresentationController.getFlowType() === "OtherBankRecipientsCreateTransfer") {
        //var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
        //transModPresentationController.getTransactions();
        var accountsList=scope_TransfersPresentationController.getToAccounts();
        var externalAccList=scope_TransfersPresentationController.getAllExternalBankBenificiaries();
         if (succResponse.selectedAccountData && !succResponse.selectedAccountData.accountNumber) {
           succResponse.selectedAccountData.accountNumber = succResponse.selectedAccountData.IBAN;
         }
      	 externalAccList.push(succResponse.selectedAccountData);
         accountsList.externalBenificiaries=externalAccList;
        scope_TransfersPresentationController.setToAccountsList(accountsList);
         var transactionManager = applicationManager.getTransactionManager();
         scope_TransfersPresentationController.setBenAddressInTransactionObject(benificiaryData);
         transactionManager.setTransactionAttribute("isRecipientAdded",true);
         transactionManager.setTransactionAttribute("countryName", benificiaryData.countryName);
         transactionManager.setTransactionAttribute("bankName", benificiaryData.bankName);
         transactionManager.setTransactionAttribute("addedRecipientDetails",succResponse.selectedAccountData);
         transactionManager.setTransactionAttribute("serviceName", 'INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE');
        var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
        controller.navigateToAmountScreen();
      }
        if (scope_TransfersPresentationController.getFlowType() === "OtherBankRecipients") {
            scope_TransfersPresentationController.fetchOtherBankRecepients();
        }
    };
    Transfer_PresentationController.prototype.createOtherBankBenificiaryPresentationError = function(errResponse) {
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if (errResponse["isServerUnreachable"])
		  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errResponse);
		else if (scope_TransfersPresentationController.getFlowType() === "OtherBankAccountsCreateTransfer") {
		  var navMan = applicationManager.getNavigationManager();
		  var accntType = navMan.getCustomInfo("frmTransfersToAccount");
		  accntType.newBeneficiaryAdded = "false";
		  accntType.errMsg = errResponse;
		  navMan.getCustomInfo("frmTransfersToAccount",accntType);
		  scope_TransfersPresentationController.navAfterToAcc();
		}
		else {
		  kony.print("Error in create same bank recipients");
		  var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
		  controller.bindGenericError(errResponse.errorMessage);
		}
    };
  
  	    Transfer_PresentationController.prototype.createBenificiaryManageFlowPresentationSuccess = function(beneficiaryData, response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var referenceId = response.Id;
        var navMan = applicationManager.getNavigationManager();
        var segData = scope_TransfersPresentationController.getAcknowledgementSegmentData("ADD", referenceId);
        var beneficiaryName = beneficiaryData.beneficiaryName;
        var title = beneficiaryName + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.BenAdded");
        var ackdata = {
            "title": title,
            "segData": segData,
            "screenType": "ADD"
        };
        navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
        scope_TransfersPresentationController.isNavigated = true;
        navMan.navigateTo({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
    };

    Transfer_PresentationController.prototype.createBenificiaryManageFlowPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        else {
            var navMan = applicationManager.getNavigationManager();
            var ackdata = {
                "title": errorResponse.errorMessage
            }
            navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
            scope_TransfersPresentationController.isNavigated = true;
            navMan.navigateTo({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
        }
    };
  
    Transfer_PresentationController.prototype.navigateToTransfersChecking = function(data) {
               scope_TransfersPresentationController.clearBuilderNonGeneratedAttributes();
         var transMan = applicationManager.getTransactionManager();
                      transMan.clearTransferObject();
         scope_TransfersPresentationController.accDetHomeAcc=data["accountID"];
          var navMan = applicationManager.getNavigationManager();
                 navMan.setCustomInfo("frmTransfersDuration", {});
                 navMan.navigateTo("frmTransactionModeEurope");
                    scope_TransfersPresentationController.setFromAccountsForTransactions(data);       
               
            };

	
     
    Transfer_PresentationController.prototype.setTransactionObject = function(transactionData) {
        var formatUtil = applicationManager.getFormatUtilManager();
        var transactionObj = applicationManager.getTransactionManager();
         if (transactionData.transactionId !== undefined && transactionData.transactionId !== null) {
                    transactionObj.setTransactionprimaryAttribute({"transactionId":transactionData.transactionId});
                }
        if (transactionData.amount !== undefined && transactionData.amount !== null) {
            var amount = formatUtil.deFormatAmount(transactionData.amount);
            transactionObj.setTransactionAttribute("amount",amount);
        }
        if (transactionData.frequencyType !== undefined && transactionData.frequencyType !== null) {
            transactionObj.setTransactionAttribute("frequencyType",transactionData.frequencyType);
        }
        if (transactionData.isScheduled !== undefined && transactionData.isScheduled !== null) {
            if (transactionData.isScheduled === "true")
                transactionObj.setTransactionAttribute("isScheduled","1");
            else
                transactionObj.setTransactionAttribute("isScheduled","0");
        }
        if (transactionData.fromAccountNumber !== undefined && transactionData.fromAccountNumber !== null) {
            transactionObj.setTransactionAttribute("fromAccountNumber",transactionData.fromAccountNumber);
        }
        //   if(transactionData.toAccountNumber!==undefined && transactionData.toAccountNumber!==null)
        if (transactionData.ExternalAccountNumber !== "" && transactionData.ExternalAccountNumber !== undefined && transactionData.ExternalAccountNumber !== null) {
            transactionObj.setTransactionAttribute("toAccountNumber", transactionData.ExternalAccountNumber);
        }
        if (transactionData.toAccountNumber !== undefined && transactionData.toAccountNumber !== null) {
            transactionObj.setTransactionAttribute("toAccountNumber",transactionData.toAccountNumber);
        }
        if (transactionData.toAccountName !== undefined && transactionData.toAccountName !== null) {
            transactionObj.setTransactionAttribute("toAccountName",transactionData.toAccountName);
        }
        if (transactionData.frequencyStartDate !== undefined && transactionData.frequencyStartDate !== null) {
            //var startdate=formatUtil.getDateObjectfromString(transactionData.frequencyStartDate,"YYYY-MM-DD");
            //var startDate= formatUtil.getFormatedDateString(startdate,formatUtil.APPLICATION_DATE_FORMAT);
            transactionObj.setTransactionAttribute("frequencyStartDate",transactionData.frequencyStartDate);
        }
        if (transactionData.frequencyEndDate !== undefined && transactionData.frequencyEndDate !== null) {
            // var enddate=formatUtil.getDateObjectfromString(transactionData.frequencyEndDate,"YYYY-MM-DD");
            //var endDate=formatUtil.getFormatedDateString(enddate,formatUtil.APPLICATION_DATE_FORMAT);
            transactionObj.setTransactionAttribute("frequencyEndDate",transactionData.frequencyEndDate);
        }
        if (transactionData.scheduledDate !== undefined && transactionData.scheduledDate !== null) {
            //var sheduleddate=formatUtil.getDateObjectfromString(transactionData.scheduledDate,"YYYY-MM-DD");
            //var sheduledDate=formatUtil.getFormatedDateString(sheduleddate,formatUtil.APPLICATION_DATE_FORMAT);
            transactionObj.setTransactionAttribute("scheduledDate",transactionData.scheduledDate);
        }
        if (transactionData.numberOfRecurrences !== undefined && transactionData.numberOfRecurrences !== null) {
            transactionObj.setTransactionAttribute("numberOfRecurrences",transactionData.numberOfRecurrences);
        }
        if (transactionData.fromAccountName !== undefined && transactionData.fromAccountName !== null) {
            transactionObj.setTransactionAttribute("fromAccountName",transactionData.fromAccountName);
        }
        if (transactionData.transactionType !== undefined && transactionData.transactionType !== null) {
            transactionObj.setTransactionAttribute("transactionType",transactionData.transactionType);
        }
        if (transactionData.fromAccountType !== undefined && transactionData.fromAccountType !== null) {
            transactionObj.setTransactionAttribute("fromAccountType",transactionData.fromAccountType);
        }
      if (transactionData.transactionsNotes !== undefined && transactionData.transactionsNotes !== null) {
        transactionObj.setTransactionAttribute("reference",transactionData.transactionsNotes);
        transactionObj.setTransactionAttribute("transactionsNotes",transactionData.transactionsNotes);
      }
      else {
        transactionObj.setTransactionAttribute("reference","");
        transactionObj.setTransactionAttribute("transactionsNotes","");
      }
      if(transactionData.fromAccountCurrency!==undefined && transactionData.fromAccountCurrency!==null)
      {
        transactionObj.setTransactionAttribute("fromAccountCurrency",transactionData.fromAccountCurrency);
      }
      if(transactionData.toAccountCurrency!==undefined && transactionData.toAccountCurrency!==null)
      {
        transactionObj.setTransactionAttribute("toAccountCurrency",transactionData.toAccountCurrency);
      }
        var accMan = applicationManager.getAccountManager();
      	var configManager = applicationManager.getConfigurationManager();
      	var action = transactionData.serviceName;
        var data = accMan.getInternalAccountByID(transactionData.fromAccountNumber);
      if(action){
        scope_TransfersPresentationController.transactionMode = scope_TransfersPresentationController.getTypeByAction(action);
             scope_TransfersPresentationController.numberOfAsync = 2;
      
      scope_TransfersPresentationController.asyncManager.initiateAsyncProcess(scope_TransfersPresentationController.numberOfAsync);
      scope_TransfersPresentationController.isNavigated = false;
      accMan.fetchInternalAccounts(scope_TransfersPresentationController.fromAccountPresentationSuccessCallBack, scope_TransfersPresentationController.fromAccountPresentationErrorCallBack);
      configManager.fetchLimitsForAnAction(action,scope_TransfersPresentationController.fetchLimitsAndFromAccSuccess,scope_TransfersPresentationController.fetchLimitsAndFromAccErrorCallback);
      }else{
        scope_TransfersPresentationController.showPreferredAccount();

      }
      
    };
    Transfer_PresentationController.prototype.setFlowType = function(type) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setFlowType(type);
    };
    Transfer_PresentationController.prototype.getFlowType = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.getFlowType();
    };
    Transfer_PresentationController.prototype.getAllInternalBankBenificiaries = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.getAllInternalBenificiaries().ExternalAccounts;
    };
    Transfer_PresentationController.prototype.getAllExternalBankBenificiaries = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.getAllExternalBenificiaries().ExternalAccounts;
    };
    Transfer_PresentationController.prototype.clearBenificiaryData = function() {
      scope_TransfersPresentationController.clearBuilderNonGeneratedAttributes();
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.clearBeneficiaryObject();
    };
    Transfer_PresentationController.prototype.getBenificiaryData = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.getBenificiaryData();
    };
    Transfer_PresentationController.prototype.setIsSameBankBenificiary = function(value) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setIsSameBankBenificiary(value);
    };
    Transfer_PresentationController.prototype.setTransferToInfo = function() {
      var transactionManager = applicationManager.getTransactionManager();
      transactionManager.clearTransferObject();
      var navManager = applicationManager.getNavigationManager();
      var transferModPresentationController = applicationManager.getModulesPresentationController("TransferEuropeUIModule");
      var benificiaryDetails = transferModPresentationController.getBenificiaryData();
      var transferDetails = {};
      transferDetails.selectedAccountData = benificiaryDetails;
      var transMan = applicationManager.getTransactionManager();
      if(benificiaryDetails["isInternationalAccount"]=="true")
        transMan.setTransactionAttribute("transferType","international");
      else
        transMan.setTransactionAttribute("transferType","domestic");
      transMan.setTransactionAttribute("toAccountNumber",benificiaryDetails["accountNumber"]);
      scope_TransfersPresentationController.setToBankName(benificiaryDetails["bankName"]);
      transMan.setTransactionAttribute("toAccountName",benificiaryDetails["nickName"]);
      transMan.setTransactionAttribute("toAccountType",benificiaryDetails["accountType"]);
      transMan.setTransactionAttribute("transactionType","ExternalTransfer");
      navManager.setCustomInfo("frmTransfersToAccount", transferDetails);
      var transModPresentationController = applicationManager.getModulesPresentationController("TransferEuropeUIModule");
      transModPresentationController.navAfterToAcc();
    };
    Transfer_PresentationController.prototype.getBankName = function() {
        var configMan = applicationManager.getConfigurationManager();
        return configMan.getBankName();
    };
    Transfer_PresentationController.prototype.transfersModule = function() {
        //var transModPresentationController = applicationManager.getModulesPresentationController("TransferEuropeUIModule");
        // transModPresentationController.showFromAccounts();
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.clearTransferObject();
        scope_TransfersPresentationController.clearBuilderNonGeneratedAttributes();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersDuration", {});
        navMan.setEntryPoint("makeatransfer", "frmTransfersEurope");
        navMan.navigateTo("frmTransactionModeEurope");
    };
     
   Transfer_PresentationController.prototype.fromAccountPresentationSuccessCallBack = function(res){
     scope_TransfersPresentationController.asyncManager.setSuccessStatus(0, res);
        if (scope_TransfersPresentationController.asyncManager.areAllMandatoryservicesDone(scope_TransfersPresentationController.numberOfAsync,[1])&& !scope_TransfersPresentationController.isNavigated) {
           var accNav = applicationManager.getAccountManager();
           var frmacc = accNav.getFromTransferSupportedAccounts();
           var navMan = applicationManager.getNavigationManager();
           navMan.setCustomInfo("frmTransfersFromAccount",
                                {"fromaccounts": frmacc});
           scope_TransfersPresentationController.isNavigated = true;
           navMan.navigateTo("frmTransferAmountEurope");
        }
   };
     Transfer_PresentationController.prototype.fromAccountPresentationErrorCallBack = function(err){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
       scope_TransfersPresentationController.asyncManager.setErrorStatus(0, err);
		if (error["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
		else
			kony.print("error in showFromAccountsPresentationErrorCallBack");
     };
     Transfer_PresentationController.prototype.fetchLimitsAndFromAccSuccess = function(res){
       scope_TransfersPresentationController.limitsData = res;
     scope_TransfersPresentationController.asyncManager.setSuccessStatus(1, res);
        if (scope_TransfersPresentationController.asyncManager.areAllMandatoryservicesDone(scope_TransfersPresentationController.numberOfAsync,[1])&& !scope_TransfersPresentationController.isNavigated) {
           var accNav = applicationManager.getAccountManager();
           var frmacc = accNav.getFromTransferSupportedAccounts();
           var navMan = applicationManager.getNavigationManager();
           navMan.setCustomInfo("frmTransfersFromAccount",
                                {"fromaccounts": frmacc});
           scope_TransfersPresentationController.isNavigated = true;
           navMan.navigateTo("frmTransferAmountEurope");
        }
   };
     Transfer_PresentationController.prototype.fetchLimitsAndFromAccErrorCallback = function(err){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
       scope_TransfersPresentationController.asyncManager.setErrorStatus(1, err);
      if(scope_TransfersPresentationController.asyncManager.areAllMandatoryservicesDone(scope_PayAPersonPresentationController.numberOfAsyncForPayees,[1])&& !scope_TransfersPresentationController.isNavigated)
      {
        var accNav = applicationManager.getAccountManager();
           var frmacc = accNav.getFromTransferSupportedAccounts();
           var navMan = applicationManager.getNavigationManager();
           navMan.setCustomInfo("frmTransfersFromAccount",
                                {"fromaccounts": frmacc});
           scope_TransfersPresentationController.isNavigated = true;
           navMan.navigateTo("frmTransferAmountEurope");
      }
        kony.print("error in fetching limits");
     };

    Transfer_PresentationController.prototype.navigateToTransfers = function(data) {
        var navMan = applicationManager.getNavigationManager();
        var transMan = applicationManager.getTransactionManager();
        scope_TransfersPresentationController.clearBuilderNonGeneratedAttributes();
        transMan.clearTransferObject();
        scope_TransfersPresentationController.accDetHomeAcc=data["accountID"];
        transMan.setTransactionAttribute("toAccountNumber",data["accountID"]);
        scope_TransfersPresentationController.setToBankName(data["bankName"]);
        transMan.setTransactionAttribute("toAccountName",data["nickName"]);
        transMan.setTransactionAttribute("toAccountType",data["accountType"]);
        transMan.setTransactionAttribute("transactionType","InternalTransfer");
        //alert(transMan.getP2PObject());
        //scope_TransfersPresentationController.showFromAccounts();
        var accMan = applicationManager.getAccountManager();
        var preAccData = accMan.getTransfersPreferredAccount();
        if (preAccData) {
            scope_TransfersPresentationController.setFromAccountsForTransactions(preAccData);
            scope_TransfersPresentationController.showFromAccounts(scope_TransfersPresentationController.fromAccountOnContinuePresentationSuccessCallBack);
            //navMan.navigateTo("frmTransferAmount");
        } else {
            scope_TransfersPresentationController.showFromAccounts(scope_TransfersPresentationController.fromAccountsPresentationSuccessCallBack);
            // navMan.navigateTo("frmTransfersFromAccount");
        }
        //  scope_TransfersPresentationController.showPreferredAccount();
    };
  	Transfer_PresentationController.prototype.navigateToTransfersFromDetails = function(data) {
        var navMan = applicationManager.getNavigationManager();
        var transMan = applicationManager.getTransactionManager();
        scope_TransfersPresentationController.clearBuilderNonGeneratedAttributes();
        transMan.clearTransferObject();
        scope_TransfersPresentationController.accDetHomeAcc=data["accountID"];
        transMan.setTransactionAttribute("toAccountNumber",data["accountID"]);
        scope_TransfersPresentationController.setToBankName(data["bankName"]);
        transMan.setTransactionAttribute("toAccountName",data["nickName"]);
        transMan.setTransactionAttribute("toAccountType",data["accountType"]);
        transMan.setTransactionAttribute("transactionType","InternalTransfer");
        //alert(transMan.getP2PObject());
        //scope_TransfersPresentationController.showFromAccounts();
        var accMan = applicationManager.getAccountManager();
        var preAccData = accMan.getTransfersPreferredAccount();
        scope_TransfersPresentationController.numberOfAsync = 2;
        if (preAccData) {
          	var configManager=applicationManager.getConfigurationManager();
            var action = data.serviceName;
            if(action){
                scope_TransfersPresentationController.setFromAccountsForTransactions(preAccData);
                //scope_TransfersPresentationController.showFromAccounts(scope_TransfersPresentationController.fromAccountOnContinuePresentationSuccessCallBack);
                scope_TransfersPresentationController.asyncManager.initiateAsyncProcess(scope_TransfersPresentationController.numberOfAsync);
                scope_TransfersPresentationController.isNavigated = false;
                accMan.fetchInternalAccounts(scope_TransfersPresentationController.fromAccountOnContinueAsyncPresentationSuccessCallBack, scope_TransfersPresentationController.fetchInternalAccPresentationErrorCallBack);
                configManager.fetchLimitsForAnAction(action,scope_TransfersPresentationController.limitsOnContinueAsyncPresentationSuccessCallBack,scope_TransfersPresentationController.limitsOnContinueAsyncPresentationErrorCallBack);
        	}else{
              scope_TransfersPresentationController.setFromAccountsForTransactions(preAccData);
              scope_TransfersPresentationController.showFromAccounts(scope_TransfersPresentationController.fromAccountOnContinuePresentationSuccessCallBack);
            }
            //navMan.navigateTo("frmTransferAmount");
        } else {
          var configManager=applicationManager.getConfigurationManager();
            var action = data.serviceName;
            if(action){
                  scope_TransfersPresentationController.asyncManager.initiateAsyncProcess(scope_TransfersPresentationController.numberOfAsync);
                  scope_TransfersPresentationController.isNavigated = false;
            	accMan.fetchInternalAccounts(scope_TransfersPresentationController.fromAccountsAsyncPresentationSuccessCallBack, scope_TransfersPresentationController.fetchInternalAccPresentationErrorCallBack);
            	configManager.fetchLimitsForAnAction(action,scope_TransfersPresentationController.limitsOnContinueAsyncPresentationSuccessCallBack,scope_TransfersPresentationController.limitsOnContinueAsyncPresentationErrorCallBack);
			}else{
            	scope_TransfersPresentationController.showFromAccounts(scope_TransfersPresentationController.fromAccountsPresentationSuccessCallBack);
            }
            // navMan.navigateTo("frmTransfersFromAccount");
        }
        //  scope_TransfersPresentationController.showPreferredAccount();
    };
  Transfer_PresentationController.prototype.fromAccountOnContinueAsyncPresentationSuccessCallBack = function(res){
        scope_TransfersPresentationController.asyncManager.setSuccessStatus(0, res);
        if (scope_TransfersPresentationController.asyncManager.areAllMandatoryservicesDone(scope_TransfersPresentationController.numberOfAsync,[1])&& !scope_TransfersPresentationController.isNavigated) {
          var accNav = applicationManager.getAccountManager();
          var frmacc = accNav.getFromTransferSupportedAccounts();
          var navMan = applicationManager.getNavigationManager();
          navMan.setCustomInfo("frmTransfersFromAccount", {
              "fromaccounts": frmacc
          });
          scope_TransfersPresentationController.isNavigated =  true;
          navMan.navigateTo("frmTransferAmountEurope");
        }
    };
  	Transfer_PresentationController.prototype.fetchInternalAccPresentationErrorCallBack = function(error){
    scope_TransfersPresentationController.asyncManager.setErrorStatus(0, error);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    else
        kony.print("error in fetchInternalAccPresentationErrorCallBack");
    };
  	Transfer_PresentationController.prototype.limitsOnContinueAsyncPresentationSuccessCallBack = function(res){
        scope_TransfersPresentationController.limitsData = res;
        scope_TransfersPresentationController.asyncManager.setSuccessStatus(1, res);
        if (scope_TransfersPresentationController.asyncManager.areAllMandatoryservicesDone(scope_TransfersPresentationController.numberOfAsync,[1])&& !scope_TransfersPresentationController.isNavigated) {
        	var accNav = applicationManager.getAccountManager();
          var frmacc = accNav.getFromTransferSupportedAccounts();
          var navMan = applicationManager.getNavigationManager();
          navMan.setCustomInfo("frmTransfersFromAccount", {
              "fromaccounts": frmacc
          });
          scope_TransfersPresentationController.isNavigated = true;
          navMan.navigateTo("frmTransferAmountEurope");
      }
    };
  	Transfer_PresentationController.prototype.limitsOnContinueAsyncPresentationErrorCallBack = function(error){
        scope_TransfersPresentationController.asyncManager.setErrorStatus(1, error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (scope_TransfersPresentationController.asyncManager.areAllMandatoryservicesDone(scope_TransfersPresentationController.numberOfAsync,[1])&& !scope_TransfersPresentationController.isNavigated) {
            var accNav = applicationManager.getAccountManager();
          var frmacc = accNav.getFromTransferSupportedAccounts();
          var navMan = applicationManager.getNavigationManager();
          navMan.setCustomInfo("frmTransfersFromAccount", {
              "fromaccounts": frmacc
          });
          scope_TransfersPresentationController.isNavigated = true;
          navMan.navigateTo("frmTransferAmountEurope");
        }
        kony.print("error in limitsOnContinueAsyncPresentationErrorCallBack");

    };
  Transfer_PresentationController.prototype.fromAccountsAsyncPresentationSuccessCallBack = function(res){
        scope_TransfersPresentationController.asyncManager.setSuccessStatus(0, res);
        if (scope_TransfersPresentationController.asyncManager.areAllMandatoryservicesDone(scope_TransfersPresentationController.numberOfAsync,[1])&& !scope_TransfersPresentationController.isNavigated) {
        var accNav = applicationManager.getAccountManager();
        var frmacc = accNav.getFromTransferSupportedAccounts();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersFromAccount", {
            "fromaccounts": frmacc
        });
        scope_TransfersPresentationController.isNavigated = true;
        navMan.navigateTo("frmTransfersFromAccountEurope");
      }
    };
    Transfer_PresentationController.prototype.fetchInternationalRecepients = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.fetchInternationalRecepients(scope_TransfersPresentationController.fetchInternationalRecepientsPresentationSuccess, scope_TransfersPresentationController.fetchInternationalRecepientsPresentationError);
    };
    Transfer_PresentationController.prototype.fetchInternationalRecepientsPresentationSuccess = function() {
         var currentForm = kony.application.getCurrentForm().id;
        if(currentForm === "frmTransactionModeEurope"){
            scope_TransfersPresentationController.commonFunctionForNavigation("frmTransferToAccountInterEurope");
        } else {
        scope_TransfersPresentationController.commonFunctionForNavigation("frmTransfersManageRecipientList");
        }
    };
    Transfer_PresentationController.prototype.fetchInternationalRecepientsPresentationError = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
    };
    Transfer_PresentationController.prototype.navigateToEnterBenificiaryAccountNumberFromSwiftCode = function(swiftCode, bankName) {
        var recipientsManager = applicationManager.getRecipientsManager();
        scope_TransfersPresentationController.setSwiftCode(swiftCode);
		scope_TransfersPresentationController.setBankNameFromResponse(bankName);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEnterBenAccNoEurope");
    };
    Transfer_PresentationController.prototype.navigateToEnterSwiftCode = function(countryName) {
        var recipientsManager = applicationManager.getRecipientsManager();
        scope_TransfersPresentationController.setCountryName(countryName);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmTransferEuropeSearchSwiftCode");
    };
	  Transfer_PresentationController.prototype.navigateToEnterBenificiaryNameFromIBAN = function(IBAN, bankName) {
        var recipientsManager = applicationManager.getRecipientsManager();
        scope_TransfersPresentationController.setIBAN(IBAN);
        recipientsManager.setBeneficiaryAttribute("IBAN", IBAN);
        scope_TransfersPresentationController.setBankNameFromResponse(bankName);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmBenNameEurope");
    };
    Transfer_PresentationController.prototype.createInternationalBenificiary = function(flowType) {
        var navMan = applicationManager.getNavigationManager();
        var recipientsManager = applicationManager.getRecipientsManager();
        var benificiaryData=scope_TransfersPresentationController.getBenificiaryData();
        if(navMan.getEntryPoint("createEuropeExternalBenificiaries")==="frmTransfersManageRecipientList"){
          scope_TransfersPresentationController.setFlowType("InternationalRecipients");
        }
        //benificiaryData.accountType = "Savings"; //Temp addition, because mobile doesn't have UI for selecting account type
      	var configManager = applicationManager.getConfigurationManager();
      	if(configManager.isSMEUser === "true" || configManager.isMBBUser === "true" || configManager.isCombinedUser == "true"){
        	benificiaryData.isBusinessPayee = "1";
      	}
      	else{
        	benificiaryData.isBusinessPayee = "0";
      	}
      	if (flowType === "MANAGE") {
        	recipientsManager.createABenificiary(benificiaryData, scope_TransfersPresentationController.createBenificiaryManageFlowPresentationSuccess.bind(this, benificiaryData), scope_TransfersPresentationController.createBenificiaryManageFlowPresentationError);
      	}
      	else {
        	recipientsManager.createABenificiary(benificiaryData, scope_TransfersPresentationController.createInternationalBenificiaryPresentationSuccess, scope_TransfersPresentationController.createInternationalBenificiaryPresentationError);
      	}    
    };
    Transfer_PresentationController.prototype.createInternationalBenificiaryPresentationSuccess = function(succResponse) {
      scope_TransfersPresentationController.internationalBenificiaryAdded = true;
      var navMan = applicationManager.getNavigationManager();
      var accntType = navMan.getCustomInfo("frmTransfersToAccount");
      var recipientsManager = applicationManager.getRecipientsManager();
      var benificiaryData=scope_TransfersPresentationController.getBenificiaryData();
      if (scope_TransfersPresentationController.getFlowType() === "InternationalRecipientCreateTransfer") {
        //var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
        //transModPresentationController.getTransactions();
        var accountsList=scope_TransfersPresentationController.getToAccounts();
        var internationalAccList =scope_TransfersPresentationController.getAllInternationalBenificiaries();
        internationalAccList.push(succResponse.selectedAccountData);
        accountsList.internationalBenificiaries = internationalAccList;
        scope_TransfersPresentationController.setToAccountsList(accountsList);
        var transactionManager = applicationManager.getTransactionManager();
        scope_TransfersPresentationController.setBenAddressInTransactionObject(benificiaryData);
        transactionManager.setTransactionAttribute("isRecipientAdded",true);
        transactionManager.setTransactionAttribute("addedRecipientDetails",succResponse.selectedAccountData);
        transactionManager.setTransactionAttribute("countryName", benificiaryData.countryName);
        transactionManager.setTransactionAttribute("bankName", benificiaryData.bankName);
        transactionManager.setTransactionAttribute("serviceName", 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE');
        var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
        controller.navigateToAmountScreen();
      }
        if (scope_TransfersPresentationController.getFlowType() === "InternationalRecipients") {
            scope_TransfersPresentationController.fetchInternationalRecepients();
        }
    };
    Transfer_PresentationController.prototype.createInternationalBenificiaryPresentationError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
            controller.bindGenericError(err.errorMessage);
        }
    };
    Transfer_PresentationController.prototype.saveChangedBeneficiaryDetails = function(data, editedInfo) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        applicationManager.getRecipientsManager().editABenificiary(editedInfo, this.saveChangedBeneficiaryDetailsSuccess.bind(this, data), this.saveChangedBeneficiaryDetailsFailure.bind(this, "frmBeneficiaryDetailsEurope"));
    };
    Transfer_PresentationController.prototype.saveChangedBeneficiaryDetailsSuccess = function(data, response) {
       applicationManager.getPresentationUtility().dismissLoadingScreen();
       var navMan=applicationManager.getNavigationManager();
       var modifiedBeneficiaryArray = {};
       var address = "";
        if (data.addressLine1) {
            address = data.addressLine1;
        }
        if (data.addressLine2) {
            if (address !== "") address = address + ", " + data.addressLine2;
            else address = data.addressLine2;
        }
        if (data.city) {
            if (address !== "") address = address + ", " + data.city;
            else address = data.city;
        }
        if (data.country) {
            if (address !== "") address = address + ", " + data.country;
            else address = data.country;
        }
      if (data.zipcode) {
            if (address !== "") address = address + ", " + data.zipcode;
            else address = data.zipcode;
        }
      data.address = address;
      navMan.setCustomInfo("frmBeneficiaryDetailsEurope", data);
      var beneficiaryListArray = navMan.getCustomInfo("frmEuropeManageBeneficiaries");
      modifiedBeneficiaryArray = this.editedBeneficiaryDetails(beneficiaryListArray,data);
      navMan.setCustomInfo("frmEuropeManageBeneficiaries", modifiedBeneficiaryArray);
      scope_TransfersPresentationController.isNavigated = true;
      navMan.navigateTo({"friendlyName": "ManageActivitiesUIModule/frmBeneficiaryDetailsEurope","appName": "TransfersMA"});
      if (data.successMessage) {
        var controller = applicationManager.getPresentationUtility().getController("frmBeneficiaryDetailsEurope", true);
        controller.showSuccessPopup(data.successMessage);
      }
    };
  
     Transfer_PresentationController.prototype.saveChangedBeneficiaryDetailsFailure = function(formName, errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	  if (errorResponse["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
      else {
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({"friendlyName": "ManageActivitiesUIModule/frmBeneficiaryDetailsEurope","appName": "TransfersMA"});
		var controller = applicationManager.getPresentationUtility().getController(formName, true);
    	controller.bindGenericError(errorResponse.errorMessage);
      }  
    };
  
    Transfer_PresentationController.prototype.editedBeneficiaryDetails = function (recipient,data) {
      var benID = data.Id;
      for(var i = 0; i < recipient.length; i++) {
     if(recipient[i].Id === benID) {
    var processedName = "";
    if (!kony.sdk.isNullOrUndefined(data.beneficiaryName)) {
      processedName = data.beneficiaryName;
    } else {
      processedName = data.nickName;
    }
    recipient[i].processedName = processedName;
    if (data.address) {
	 var address = data.address;
     recipient[i].address = address; }
    if (data.nickName) {
	 var nickName = data.nickName;
     recipient[i].nickName = nickName; }
     }
      }
     return recipient;
  };
	
    Transfer_PresentationController.prototype.getAllInternationalBenificiaries = function(err) {
        var recipientManager = applicationManager.getRecipientsManager();
        return recipientManager.getAllInternationalBenificiaries().ExternalAccounts;
    }
    Transfer_PresentationController.prototype.navigateToTransfersRecipientDetails = function(data) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryObject(data);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmManageTransferRecipientInfoEurope");
    }
    Transfer_PresentationController.prototype.fetchCountriesList = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.fetchCountriesList(scope_TransfersPresentationController.fetchCountriesListSuccessCallBack, scope_TransfersPresentationController.fetchCountriesListErrorCallBack);
    };
    Transfer_PresentationController.prototype.fetchCountriesListSuccessCallBack = function(countryList) {
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmBenCountryEurope", countryList);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmBenCountryEurope");
    };
    Transfer_PresentationController.prototype.fetchCountriesListErrorCallBack = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmTransferEuropeSearchSwiftCode', true);
            controller.bindGenericError(err.errorMessage);
        }
    };
	  /** fetches Bank Details For InternationalTransfer
    * @param {String} swiftCode swift code
    * @param {String} serviceName  service name
    */
  Transfer_PresentationController.prototype.fetchBankDetailsForInternationalTransfer = function (swiftCode, serviceName) {
    var params = {
      "swiftCode": swiftCode,
      "serviceName": serviceName
    }
    var accountsManager = applicationManager.getAccountManager();
    accountsManager.fetchBankDetails(params, this.fetchBankDetailsForInternationalTransferSuccess.bind(this), this.fetchBankDetailsForInternationalTransferFailure.bind(this))
  };
  /** Gives Details of the bank for international transfer
     * @param {object} response Success response of bank details
     */
  Transfer_PresentationController.prototype.fetchBankDetailsForInternationalTransferSuccess = function (response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var currentForm = kony.application.getCurrentForm().id;
    var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
     controller.validateSwiftcode(response.bankName);
  };
  /** Failure callback when fetching of bank details for international transfer fails
     */
  Transfer_PresentationController.prototype.fetchBankDetailsForInternationalTransferFailure = function (err) {
     applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmBenSwiftCodeEurope', true);
            controller.bindGenericError(err.errorMessage);
        }
  };
  	  /** fetches Bank Details For DomesticRecepient
    * @param {String} IBAN code
    * @param {String} serviceName  service name
    */
  Transfer_PresentationController.prototype.fetchBankDetailsForDomesticTransfer = function (IBAN, serviceName) {
    var params = {
      "IBAN": IBAN,
      "serviceName": serviceName
    }
    var accountsManager = applicationManager.getAccountManager();
    accountsManager.fetchBankDetails(params, this.fetchBankDetailsForDomesticTransferSuccess.bind(this), this.fetchBankDetailsForDomesticTransferFailure.bind(this))
  };
  /** Gives Details of the bank for DomesticRecepient
     * @param {object} response Success response of bank details
     */
  Transfer_PresentationController.prototype.fetchBankDetailsForDomesticTransferSuccess = function (response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var currentForm = kony.application.getCurrentForm().id;
    var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
     controller.validateIBAN(response.bankName);
  };
  /** Failure callback when fetching of bank details for DomesticRecepient fails
     */
  Transfer_PresentationController.prototype.fetchBankDetailsForDomesticTransferFailure = function (err) {
     applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmtransfersIBANEurope', true);
            controller.bindGenericError(err.errorMessage);
        }
  };
    Transfer_PresentationController.prototype.isValidAccNum = function(accNum, formName) {
        var validationUtility = applicationManager.getValidationUtilManager();
        if (validationUtility.isValidAccountNumber(accNum)) {
            return true;
        } else {
            var controller = applicationManager.getPresentationUtility().getController(formName, true);
            controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.InvalidAccountNumber"));
            return false;
        }
    };
    Transfer_PresentationController.prototype.isValidSwiftCode = function(swiftCode, formName) {
        var validationUtility = applicationManager.getValidationUtilManager();
        if (validationUtility.isValidSwiftCode(swiftCode)) {
          if(scope_TransfersPresentationController.validateSwiftRegex(swiftCode, formName))
            return true;
          else
            return false;
        } else {
            var controller = applicationManager.getPresentationUtility().getController(formName, true);
            controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.InvalidSwiftCode"));
            return false;
        }
    };
    Transfer_PresentationController.prototype.validateSwiftRegex = function(swiftCode, formName) {
        var validationUtility = applicationManager.getValidationUtilManager();
        var swiftRegex=/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
        if (swiftRegex.test(swiftCode)) {
            return true;
        } else {
            var controller = applicationManager.getPresentationUtility().getController(formName, true);
            controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.InvalidSwiftCode"));
            return false;
        }
    };
	 Transfer_PresentationController.prototype.isValidIBAN = function(IBAN, formName) {
        var validationUtility = applicationManager.getValidationUtilManager();
        if (validationUtility.isValidIBAN(IBAN)) {
            return true;
        } else {
           var controller = applicationManager.getPresentationUtility().getController(formName, true);
           controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transferEurope.invalidIBAN"));
           return false;
        }
    };
    Transfer_PresentationController.prototype.setBenificiaryDetails = function(benificiaryData) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryObject(benificiaryData);
    };
  	Transfer_PresentationController.prototype.isEligibleTransferType = function(transferType){
      var configManager = applicationManager.getConfigurationManager();
      return configManager.getConfigurationValue(transferType);
    }
    
    Transfer_PresentationController.prototype.getTermsAndConditionsEurope = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var config = applicationManager.getConfigurationManager();
    var locale=config.getLocale();
    var termsAndConditions=config.getTermsAndConditions();
    var param={
     "languageCode": termsAndConditions[locale],
      "termsAndConditionsCode": termsAndConditions["SEPA_TnC"]
   };
    var termsAndConditions = applicationManager.getTermsAndConditionsManager();
    termsAndConditions.fetchTermsAndConditionsPostLogin(param,scope_TransfersPresentationController.getTermsandConditionsSuccessCallBack,scope_TransfersPresentationController.getTermsandConditionsErrorCallback);
  };
  Transfer_PresentationController.prototype.getTermsandConditionsSuccessCallBack = function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    navManager.setCustomInfo("frmSupportInfo",{"richTextData":"<font face='SourceSansPro-Regular'>"+response.termsAndConditionsContent,"flowType":"SEPA","contentTypeID":response.contentTypeId,"header":configManager.constants.TERMS});
    var info = applicationManager.getNavigationManager().getCustomInfo("frmSupportInfo");
    if(info.contentTypeID == "URL"){
    kony.application.openURL(info.content);
    }
    else{
      navManager.navigateTo("frmSupportInfo");
    }
  };
  Transfer_PresentationController.prototype.getTermsandConditionsErrorCallback = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	 if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
   	 }else{
      var controller = applicationManager.getPresentationUtility().getController('frmTransferConfirmationEurope', true);
      controller.bindGenericError(err.errorMessage);
      }
  };
  //   Transfer_PresentationController.prototype.fetchLimits = function(action){
  //     var configManager=applicationManager.getConfigurationManager();
  //    configManager.fetchLimitsForAnAction(action,scope_TransfersPresentationController.fetchLimitsSuccessCallBack,scope_TransfersPresentationController.fetchLimitsErrorCallBack);
  // };
    // Transfer_PresentationController.prototype.fetchLimitsSuccessCallBack = function(res){
    //     scope_TransfersPresentationController.limitsData = res;   
    // };
    // Transfer_PresentationController.prototype.fetchLimitsErrorCallBack = function(err)
    // {
    //     kony.print("error in fetching limits");
    // };
    Transfer_PresentationController.prototype.getActionByType = function (type) {
        switch (type) {
          case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToMyDBXAccount")):
            return "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE";
          case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToOtherEuropeanAccounts")):
            return "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
          case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToInternationalAccounts")):
            return "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE";
          case "PayAPerson" :
            return "P2P_CREATE"; 
    
        }
      };
  Transfer_PresentationController.prototype.getTypeByAction = function (action) {
        switch (action) {
          case "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE":
            return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToMyDBXAccount");
          case "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE":
            return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToOtherEuropeanAccounts");
          case "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE":
            return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToInternationalAccounts");
          case "P2P_CREATE":
            return "PayAPerson";
    
        }
      };
    Transfer_PresentationController.prototype.setLimitsForTransaction = function(accountId){
        var type = scope_TransfersPresentationController.transactionMode;
        var scope = this;
      	if(!scope.limitsData){
          return;
        }
        for (var i = 0; i <scope.limitsData["accounts"].length; i++) {
            if (scope.limitsData["accounts"][i].accountId === accountId) {
                switch(type){
                    case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToMyDBXAccount")):
                    scope.setLimits("minKonyBankAccountsTransferLimit","maxKonyBankAccountsTransferLimit",i);
                    break;
                    case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToOtherEuropeanAccounts")):
                    scope.setLimits("minOtherBankAccountsTransferLimit","maxOtherBankAccountsTransferLimit",i);
                    break;
                    case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToInternationalAccounts")):
                    scope.setLimits("minInternationalAccountsTransferLimit","maxInternationalAccountsTransferLimit",i);
                    break;
                    case "PayAPerson" :
                    scope.setLimits("minP2PLimit","maxP2PLimit",i);
                }
            }
        }

    };
    Transfer_PresentationController.prototype.setLimits = function(minLimit,maxLimit,i){
        applicationManager.getConfigurationManager().setConfigurationValue(minLimit, this.limitsData["accounts"][i]["limits"]["MIN_TRANSACTION_LIMIT"]);
        applicationManager.getConfigurationManager().setConfigurationValue(maxLimit, this.limitsData["accounts"][i]["limits"]["MAX_TRANSACTION_LIMIT"]);
    };


    //----------------------------------------------------------------------------------------------------------------------------------

    Transfer_PresentationController.prototype.getFromAccounts = function(successCallback) {
        var accountManager = applicationManager.getAccountManager();
        scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus={};
        if (successCallback) {
          accountManager.fetchInternalAccounts(successCallback, scope_TransfersPresentationController.fromAccountsPresentationErrorCallBack);
        }  
        else {
          accountManager.fetchInternalAccounts(scope_TransfersPresentationController.fromAccountsPresentationSuccessCallBack, scope_TransfersPresentationController.fromAccountsPresentationErrorCallBack);
        }
        if (scope_TransfersPresentationController.getEuropeFlowType() === "INTERNAL") {
        	scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.creditCardAccountsStatus = 0;
        	accountManager.fetchCreditCardAccounts(scope_TransfersPresentationController.fetchCreditCardsPresentationSuccess, scope_TransfersPresentationController.fetchCreditCardsPresentationError);
        }  
      };

      Transfer_PresentationController.prototype.fetchCreditCardsPresentationSuccess = function(response) {
        scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.creditCardAccountsStatus = 1;
        scope_TransfersPresentationController.asyncResponseData.CreditCardAccountsData = response.Accounts;
        if (scope_TransfersPresentationController.areAllServicesDone()) {
          scope_TransfersPresentationController.navigateToShowToListOwnAccounts();
        }
      };

      Transfer_PresentationController.prototype.fetchCreditCardsPresentationError = function(res) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]){
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
        else{
          kony.print("error in showFromAccountsPresentationErrorCallBack");
        }
      };

      Transfer_PresentationController.prototype.navigateToShowToListOwnAccounts = function() {
        scope_TransfersPresentationController.toAccountList.CreditCardAccounts = scope_TransfersPresentationController.asyncResponseData.CreditCardAccountsData;
        /*var controller = applicationManager.getPresentationUtility().getController({"appName":"TransfersMA","friendlyName":"TransferEuropeUIModule/frmEuropeTransferToAccount"}, true);
        if (scope_TransfersPresentationController.toAccountList.CreditCardAccounts.length === 0 )
          controller.bindDataAfterTransition(1);
        else
          controller.bindDataAfterTransition(0); */
      };
    
      Transfer_PresentationController.prototype.fromAccountsPresentationSuccessCallBack = function(res) {
        scope_TransfersPresentationController.setFromAndToAccounts(res);
        scope_TransfersPresentationController.commonFunctionForNavigation({"appName":"TransfersMA","friendlyName":"TransferEuropeUIModule/frmEuropeTransferFromAccount"});
      };  
	  
	  Transfer_PresentationController.prototype.isEmptyOrNullOrUndefined = function (value) {
        var valueCheck = (value == "" || value == null || value == undefined) ? true : false;
        return valueCheck;
      };

      Transfer_PresentationController.prototype.setFromAndToAccounts = function(res) {
       // var accountManager = applicationManager.getAccountManager();
       // let filteredAccountsData = scope_TransfersPresentationController.getAllowedFromAccounts(res);
        let filteredAccountsData =res.filter(filteredAccountData => filteredAccountData.accountStatus === "ACTIVE" || filteredAccountData.accountStatus === "CLOSURE_PENDING");
        //var fromSupportedAccounts = accountManager.getFromTransferSupportedAccounts();
        //var toSupportedAccounts = accountManager.getToTransferSupportedAccounts();
		    filteredAccountsData = this.isEmptyOrNullOrUndefined(filteredAccountsData) ? [] : filteredAccountsData;
        //let toSupportedAccounts = this.isEmptyOrNullOrUndefined(filteredAccountsData) ? [] : filteredAccountsData;
        scope_TransfersPresentationController.toSupportedOwnAccounts = filteredAccountsData;
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmEuropeTransferFromAccount", {
          "fromaccounts": filteredAccountsData
        });
      };
  
  Transfer_PresentationController.prototype.getFromAndToSupportedCurrencies = function () {
    var transObj = scope_TransfersPresentationController.getTransObject();
    var currencies = [];
        //osama
    if (transObj.toAccountCurrency) 
      currencies.push({ currency: transObj.toAccountCurrency });
    if (transObj.fromAccountCurrency) 
      currencies.push({ currency: transObj.fromAccountCurrency });
    //osama //if ((scope_TransfersPresentationController.getEuropeFlowType() === "INTERNAL") && (transObj.fromAccountCurrency !== transObj.transactionCurrency)) 
       //currencies.push({ currency: transObj.transactionCurrency });
    if ((!kony.sdk.isNullOrUndefined(scope_TransfersPresentationController.toBenCurrency)) && scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") && (scope_TransfersPresentationController.toBenCurrency != transObj.fromAccountCurrency) && (scope_TransfersPresentationController.toBenCurrency != "")) 
      currencies.push({ currency: scope_TransfersPresentationController.toBenCurrency });
    scope_TransfersPresentationController.supportedCurrencies = currencies;
  };
    
      Transfer_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = kony.application.getCurrentForm();
        // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
        if(scope_TransfersPresentationController.stateNavigation && scope_TransfersPresentationController.stateTriggeredForm!==currentForm.id){
          navManager.navigateTo(scope_TransfersPresentationController.stateTriggeredForm,true);
          scope_TransfersPresentationController.stateNavigation=false;
          scope_TransfersPresentationController.stateTriggeredForm="";
        }
        // If state management is triggered and if it is on the state triggered form then we will navigate to specified form and ignoring it's entry into the navigation stack as the form is being re-visited
        else if(scope_TransfersPresentationController.stateNavigation){
          navManager.navigateTo(formName,true);
        }
        // This is triggered when the forms are being visited for the first time.
        else{
          navManager.navigateTo(formName);
        }
      };
    
        /**
       * This method is used to handle the error scenario when from accounts fetch call is failing.
       */
      Transfer_PresentationController.prototype.fromAccountsPresentationErrorCallBack = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]){
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
        else{
          kony.print("error in showFromAccountsPresentationErrorCallBack");
        }
      };
    
      /**
       * This method is used to handle the backward navigation including state management
       */
      Transfer_PresentationController.prototype.commonFunctionForgoBack = function() {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = kony.application.getCurrentForm();
         var navigateToForm = navManager.getEntryPoint("europeTransferFlow");
        // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
        if(scope_TransfersPresentationController.stateNavigation && scope_TransfersPresentationController.stateTriggeredForm!==currentForm.id){
          navManager.navigateTo(scope_TransfersPresentationController.stateTriggeredForm,true);
          scope_TransfersPresentationController.stateNavigation=false;
          scope_TransfersPresentationController.stateTriggeredForm="";
        }
        // This is triggered when the forms entry into navigation manager's stack is equal to one .
        else{
          if(navigateToForm=="frmTransferActivitiesTransfersEurope" || navigateToForm=="frmTransferActivitiesRecurringEurope"){
           navigateToForm = {"appName":"TransfersMA","friendlyName":"ManageActivitiesUIModule/"+navigateToForm}
           navManager.navigateTo(navigateToForm);
          }
          else
           navManager.goBack();
        }
      };
    
      /**
       * This method is used to handle the cancel navigation across the flow at a central place based on the entry points.
       */
      Transfer_PresentationController.prototype.cancelCommon = function() {
        this.clearEuropeFlowAtributes();
        var navManager = applicationManager.getNavigationManager();
        var navigateToForm = navManager.getEntryPoint("europeTransferFlow");
        navManager.setCustomInfo("removeAttachments",true);
        //specific check as we need to make a service call to refresh the account balances.
        if(navigateToForm=="frmDashboardAggregated" || navigateToForm == "frmDashboard"){
            var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AccountsUIModule", "appName":"HomepageMA"});
            accountMod.presentationController.showDashboard();
        }
        else{
            if(navigateToForm === "frmAccountDetails")
             	navigateToForm = {"appName":"ArrangementsMA","friendlyName":"AccountUIModule/frmAccountDetails"}
            if(navigateToForm==="frmTransferActivitiesTransfersEurope" || navigateToForm==="frmTransferActivitiesRecurringEurope"|| navigateToForm==="frmEuropeManageBeneficiaries")
           		navigateToForm = {"appName":"TransfersMA","friendlyName":"ManageActivitiesUIModule/"+navigateToForm}
            navManager.navigateTo(navigateToForm);
        }
      };
    
      /**
        * This method is used to clear the values in the model definition, reset state management and limit fetch status
        */
       Transfer_PresentationController.prototype.clearEuropeFlowAtributes=function(){
        scope_TransfersPresentationController.initializeStateData(false, "");
        scope_TransfersPresentationController.previousAccountType = null;
        scope_TransfersPresentationController.currentAccountType = null;
        scope_TransfersPresentationController.isLoansAccountType = false;
        scope_TransfersPresentationController.triggerOneTimePaymentFlow = false;
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.clearTransferObject();
      };
    
       /**
        * This method is used to initialise the state management flow
        * initialized- {boolean} hold the initialisation state value
        * triggeredForm - {String} holds the form name from where state management has been triggered.
        */
       Transfer_PresentationController.prototype.initializeStateData=function(initialized,triggeredForm){
        scope_TransfersPresentationController.stateNavigation = initialized;
        scope_TransfersPresentationController.stateTriggeredForm = triggeredForm;
      };
    
      /**
       * This method is used to process the internal accounts in the format required for initiating service call
       * data - {Array} holds the transfer supported accounts collection
       * screenType - {String} specifies the screen whether from or to based on which account balance type is assigned (ex: Credit card account in from screen should display available balance and in to should show outstanding balance).
       */
      Transfer_PresentationController.prototype.processAccountsData = function(data,screenType) {
        var accProcessedData = [];
        for (var i = 0; i < data.length; i++) {
          accProcessedData[i] = {};
          var name = "";
          //if (data[i].nickName === null || data[i].nickName === undefined) {
            name = data[i].accountName;
          //} else {
            //name = data[i].nickName;
          //}
          accProcessedData[i].accountName = data[i].accountName;
          accProcessedData[i].nickName = data[i].nickName;
          accProcessedData[i].availableBalance = scope_TransfersPresentationController.getAvailableBalanceCurrencyString(data[i],screenType);
          accProcessedData[i].accountID = data[i].accountID;
          accProcessedData[i].bankName = (data[i].bankName) ? data[i].bankName.trim() : data[i].bankName;
          accProcessedData[i].accountBalanceType = scope_TransfersPresentationController.getAvailableBalanceType(data[i],screenType);
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
          accProcessedData[i].accountTypeFlx = {isVisible: false};
          accProcessedData[i].imgBankIcon = {isVisible: false};  
          accProcessedData[i].membershipID = data[i].Membership_id;
          accProcessedData[i].membershipName = data[i].MembershipName;
          accProcessedData[i].isBusinessAccount=data[i].isBusinessAccount;
          accProcessedData[i].flximgBank = {isVisible: false};
          accProcessedData[i].flxAccountType = {isVisible: false};
        }
        return accProcessedData;
      };
    
      /**
       * This method is used return the formatted amount along with the currency code
       * data - {Object} holds the account object
       * screenType - {string} specifies whether data required in to or from screen based on which type of balance needs to be included in formatting.
       */
      Transfer_PresentationController.prototype.getAvailableBalanceCurrencyString = function(data,screenType) {
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
    
      /**
       * This method is used return the account balance type
       * data - {Object} holds the account object
       * screenType - {string} specifies whether data required in to or from screen based on which type of account balance is returned.
       */
      Transfer_PresentationController.prototype.getAvailableBalanceType = function(data,screenType) {
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
    
       /**
       * This method is used process the internal accounts data for grouping purpose based on the account type
       * data - {Array} holds the collection of internal accounts
       */
      Transfer_PresentationController.prototype.processViewFormattedData = function(data) {
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
     * This method is used process the internal accounts data for grouping purpose based on the account type
     * data - {Array} holds the collection of internal accounts
     */
    Transfer_PresentationController.prototype.processDataMembershipNameWise = function(data) {
        var userPrefManager = applicationManager.getUserPreferencesManager();
      	var personalID = userPrefManager.primaryCustomerId;
        var personal = false;
        var others = false;

        for( var i = 0; i < data.length; i++ ) {
          if(data[i].isBusinessAccount == "true") {
            others = true;
          }
          else {
            personal = true;
          }
        }

      function isPersonal(id) {
        if (personalID && (id == personalID.id) && personalID.type==="personal") {
          return true;
        }
        else 
          return false;
      }
        var processedData = {}
        
        for (var i = 0; i < data.length; i++) {
          if(personal && others) {
            data[i].flxAccountType = {"isVisible" : true};
            data[i].src=data[i].isBusinessAccount==="true"?"businessaccount.png":"personalaccount.png";
          }
          else {
            data[i].flxAccountType = {"isVisible" : false};
          }
          if(isPersonal(data[i].membershipID)){
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
       * This method is used to sort the groups based on their priority defined in configuration manager
       *  data - {Object} holds the group names as key and respective accounts collection as value
       */
      Transfer_PresentationController.prototype.orderByPriority = function(data) {
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
    
      Transfer_PresentationController.prototype.sortByPrefrence = function(accountsCollection) {
        if (accountsCollection.length > 1) accountsCollection.sort(function(record1, record2) {
          return record1.accountPreference - record2.accountPreference;
        });
        return accountsCollection;
      };
    
      /**
       * This method is a pass-through to return the transaction object
       */
      Transfer_PresentationController.prototype.getTransObject = function() {
        var transMan = applicationManager.getTransactionManager();
        var obj = transMan.getTransactionObject();
        return obj;
      };

      /**
   * This method is used to set the from account selection in the model definition object
   * selectedFromAccount - {Object} holds the from account selection
   */
  Transfer_PresentationController.prototype.setFromAccountsForTransactions = function(selectedFromAccount) {
    var trasMan = applicationManager.getTransactionManager();
    trasMan.setTransactionAttribute("fromAccountNumber", selectedFromAccount.accountID);
    trasMan.setTransactionAttribute("fromAccountName", selectedFromAccount.accountName);
    trasMan.setTransactionAttribute("fromAccountType", selectedFromAccount.accountType);
    trasMan.setTransactionAttribute("fromBankName", selectedFromAccount.bankName);
    trasMan.setTransactionAttribute("fromProcessedName", selectedFromAccount.processedName);
    trasMan.setTransactionAttribute("fromAccountBalance", selectedFromAccount.fromAccountBalance);
    trasMan.setTransactionAttribute("isfromAccountBusiness", selectedFromAccount.isBusinessAccount);
    trasMan.setTransactionAttribute("fromAccountMembershipId", selectedFromAccount.membershipID);
    if(selectedFromAccount.fromAccountCurrency)
    {
      trasMan.setTransactionAttribute("fromAccountCurrency",selectedFromAccount.fromAccountCurrency);
    }
    else
    {
      trasMan.setTransactionAttribute("fromAccountCurrency",selectedFromAccount.currencyCode);
    }
    var transObj = scope_TransfersPresentationController.getTransObject();
    if (!transObj.transactionCurrency) {
      trasMan.setTransactionAttribute("transactionCurrency", selectedFromAccount.fromAccountCurrency);
    }
  };

   /**
    * This method is used to filter the from selection from the transfer to supported accounts.
    */
   Transfer_PresentationController.prototype.filterToAccountsByExludingFromAccount = function() {
    var transactionManager = applicationManager.getTransactionManager();
    this.filteredToAccounts = [];
    var toSupportedAccounts = scope_TransfersPresentationController.toSupportedOwnAccounts;
    if (toSupportedAccounts) {
      for (var i = 0; i < toSupportedAccounts.length; i++) {
        if (toSupportedAccounts[i]["accountID"] !== transactionManager.getTransactionObject().fromAccountNumber) {
          toSupportedAccounts[i]["transactionMode"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          this.filteredToAccounts.push(toSupportedAccounts[i]);
        }
      }
    }
    scope_TransfersPresentationController.processAccountsData(this.filteredToAccounts);
  };

    /**
     * This method is a getter method to access transfer to supported accounts excluding from account selection.
     */
    Transfer_PresentationController.prototype.getFilteredToAccounts = function() {
        return this.filteredToAccounts;
    };

      /** This method is used as a pass through to return entitlement value from configuration manager
   *  key- {string} - value for which entitlement needs to be checked
   */
  Transfer_PresentationController.prototype.getEntitlementValue = function(key) {
    var cm = applicationManager.getConfigurationManager();
    return cm.getConfigurationValue(key);
  };

  /**
   * This method is used to set to account data in transaction object
   * toAccountData - {Object} holds the selected to account data
   */
  Transfer_PresentationController.prototype.setToAccountData = function (toAccountData) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transactionManager = applicationManager.getTransactionManager();
    var transactionObject = transactionManager.getTransactionObject();
    scope_TransfersPresentationController.previousAccountType = transactionObject.toAccountType;
    switch (toAccountData.transactionMode) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts"):
        transactionManager.setTransactionAttribute("toAccountNumber", toAccountData["accountID"]);
        transactionManager.setTransactionAttribute("toAccountType", toAccountData["accountType"]);
        scope_TransfersPresentationController.currentAccountType = toAccountData["accountType"];
        transactionManager.setTransactionAttribute("toAccountName", toAccountData["accountName"]);
        transactionManager.setTransactionAttribute("transactionType", "InternalTransfer");
        transactionManager.setTransactionAttribute("toProcessedName", toAccountData["processedName"]);
        transactionManager.setTransactionAttribute("bankName", toAccountData["bankName"]);
        transactionManager.setTransactionAttribute("toAccountCurrency", toAccountData["toAccountCurrency"]);
       //osama// transactionManager.setTransactionAttribute("transactionCurrency", toAccountData["toAccountCurrency"]);
        transactionManager.setTransactionAttribute("istoAccountBusiness", toAccountData["isBusinessAccount"]);
        transactionManager.setTransactionAttribute("toAccountMembershipId", toAccountData["membershipID"]);
        scope_TransfersPresentationController.transactionMode = toAccountData.transactionMode;
        scope_TransfersPresentationController.resetStateNavigationForCreditCardAccounts();
        if (toAccountData["accountType"] === "Loan") {
          scope_TransfersPresentationController.isLoansAccountType = true;
          var accountManager = applicationManager.getAccountManager();
          var params = {
            "accountID": toAccountData["accountID"]
          };
          accountManager.fetchAccountDetails(params,scope_TransfersPresentationController.fetchAccountDetailPresentationSuccessCallback,scope_TransfersPresentationController.fetchAccountDetailPresentationErrorCallback);
        }
        else if (toAccountData["accountType"] === "CreditCard") {
          var navigationManager = applicationManager.getNavigationManager();
          var creditCardData = {
            "minimumDue" : toAccountData["minimumDue"],
            "paymentDue" : toAccountData["paymentDue"],
            "dueDate" : toAccountData["dueDate"],
            "outstandingBalance" : toAccountData["outstandingBalance"],
            "currencyCode" : toAccountData["toAccountCurrency"]
          }
          transactionManager.setTransactionAttribute("outstandingBalance", toAccountData["outstandingBalance"]);
          navigationManager.setCustomInfo("frmEuropeCreditCardDetails", creditCardData);
          scope_TransfersPresentationController.isLoansAccountType = false;
          scope_TransfersPresentationController.setAmountBasedOnTransactionType();
          scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeCreditCardDetails");
        }
        else {
          scope_TransfersPresentationController.isLoansAccountType = false;
          scope_TransfersPresentationController.setAmountBasedOnTransactionType();
          scope_TransfersPresentationController.commonFunctionForNavigation({"appName": "TransfersMA", "friendlyName": "TransferEuropeUIModule/frmEuropeTransferAmount"});
        }
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers"):  
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"):
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"):
        transactionManager.setTransactionAttribute("toAccountNumber", toAccountData["accountID"]|| null);
        transactionManager.setTransactionAttribute("bankName", toAccountData["bankName"]);
        transactionManager.setTransactionAttribute("countryName", toAccountData["countryName"]);
        if (toAccountData["nickName"])
                    transactionManager.setTransactionAttribute("beneficiaryNickname", toAccountData["nickName"]);               
            transactionManager.setTransactionAttribute("toAccountName", toAccountData["accountName"]);  
                transactionManager.setTransactionAttribute("beneficiaryName", toAccountData["accountName"]);
        transactionManager.setTransactionAttribute("toAccountType", toAccountData["accountType"]);
        scope_TransfersPresentationController.currentAccountType = toAccountData["accountType"];
        transactionManager.setTransactionAttribute("toProcessedName", toAccountData["processedName"]);
        transactionManager.setTransactionAttribute("transactionType", "ExternalTransfer");
        transactionManager.setTransactionAttribute("beneficiaryId", toAccountData["beneficiaryId"] || null);
        transactionManager.setTransactionAttribute("IBAN", toAccountData["IBAN"] || null);
        transactionManager.setTransactionAttribute("routingNumber", toAccountData["routingNumber"] || null);
        transactionManager.setTransactionAttribute("swiftCode", toAccountData["swiftCode"] || "");
        scope_TransfersPresentationController.transactionMode = toAccountData.transactionMode;
        scope_TransfersPresentationController.setAmountBasedOnTransactionType();
        var navMan=applicationManager.getNavigationManager();
	    var entryPoint = navMan.getEntryPoint("editbeneficiary");
        if (entryPoint === "frmBenVerifyDetailsEurope" || toAccountData.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") || toAccountData.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")) {
            scope_TransfersPresentationController.commonFunctionForNavigation({"appName": "TransfersMA", "friendlyName": "TransferEuropeUIModule/frmEuropeTransferAmount"});
            }
        break;
    }
  };
  
  Transfer_PresentationController.prototype.getBeneficiaryCurrency = function(accountNumber) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var params = {
            "accountNumber": accountNumber
        };
        applicationManager.getRecipientsManager().getPayeeName(params, this.getBeneficiaryCurrencySuccess.bind(this, accountNumber));
    };
  Transfer_PresentationController.prototype.getBeneficiaryCurrencySuccess = function (accountNumber, res) {
    var transactionManager = applicationManager.getTransactionManager();
    if (res.currency && res.currency.length !== 0) {
      //osama //transactionManager.setTransactionAttribute("transactionCurrency", res.currency);
      scope_TransfersPresentationController.toBenCurrency = res.currency;
    } else {
      scope_TransfersPresentationController.toBenCurrency = '';
    }
    var fromAccountNumber = transactionManager.getTransactionObject().fromAccountNumber;
    if (fromAccountNumber) {
      scope_TransfersPresentationController.commonFunctionForNavigation({ "appName": "TransfersMA", "friendlyName": "TransferEuropeUIModule/frmEuropeTransferAmount" });
    } else {
      scope_TransfersPresentationController.getFromAndToAccounts();
    }
  };
  
  Transfer_PresentationController.prototype.setTransferToAccountFromManageFlow = function() {
    var navMan = applicationManager.getNavigationManager();
    var transactionManager = applicationManager.getTransactionManager();
    scope_TransfersPresentationController.setEuropeFlowType("EXTERNAL");
    scope_TransfersPresentationController.populateToAccountsDataFromManageFlow();
    if (scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")) {
      this.getBeneficiaryCurrency(transactionManager.getTransactionObject().toAccountNumber);
    } else {
      var fromAccountNumber = transactionManager.getTransactionObject().fromAccountNumber;
      if (fromAccountNumber) {
        scope_TransfersPresentationController.commonFunctionForNavigation({ "appName": "TransfersMA", "friendlyName": "TransferEuropeUIModule/frmEuropeTransferAmount" });
      } else {
        scope_TransfersPresentationController.getFromAndToAccounts();
      }
    }
  };
    /**
    * This method is used to build the values for to account data in the model definition as we enter from manage flow
    */
    Transfer_PresentationController.prototype.populateToAccountsDataFromManageFlow = function() {
    var transMan = applicationManager.getTransactionManager();
    var transferModPresentationController = applicationManager.getModulesPresentationController({"appName":"TransfersMA","moduleName":"TransferEuropeUIModule"});
	var navMan=applicationManager.getNavigationManager();
	var entryPoint = navMan.getEntryPoint("editbeneficiary");
	if(entryPoint === "frmBeneficiaryDetailsEurope"){
	var benificiaryDetails = navMan.getCustomInfo("frmBeneficiaryDetailsEurope");
	} else {
    var benificiaryDetails = transferModPresentationController.getBenificiaryData();
    var processedName;  
    if (benificiaryDetails.nickName === null || benificiaryDetails.nickName === undefined || benificiaryDetails.nickName === "" || benificiaryDetails.nickName === "-") {
      processedName = benificiaryDetails.beneficiaryName;
    } else {
      processedName = benificiaryDetails.nickName;
    }
    benificiaryDetails.processedName = processedName;
	}
    var name = "";
    //if (!benificiaryDetails.nickName){
      name = benificiaryDetails.beneficiaryName||benificiaryDetails.nickName;
    //} else {
     // name = benificiaryDetails.nickName;
    //}
    transMan.setTransactionAttribute("toProcessedName",applicationManager.getPresentationUtility().formatText(name, 10,benificiaryDetails.accountNumber, 4));
    transMan.setTransactionAttribute("toAccountNumber",benificiaryDetails["accountNumber"]|| null);
    transMan.setTransactionAttribute("bankName",benificiaryDetails["bankName"] !== "-" ? benificiaryDetails["bankName"] : null);
	if (benificiaryDetails["nickName"])
            transMan.setTransactionAttribute("toAccountName", benificiaryDetails["nickName"] !== "-" ? benificiaryDetails["nickName"] : null);
        else
            transMan.setTransactionAttribute("toAccountName", benificiaryDetails["accountName"] !== "-" ? benificiaryDetails["accountName"] : null);  
    transMan.setTransactionAttribute("toAccountType",benificiaryDetails["accountType"] !== "-" ? benificiaryDetails["accountType"] : null);
    scope_TransfersPresentationController.currentAccountType = benificiaryDetails["accountType"];
    transMan.setTransactionAttribute("beneficiaryName", benificiaryDetails["beneficiaryName"] !== "-" ? benificiaryDetails["beneficiaryName"] : null);
    transMan.setTransactionAttribute("beneficiaryNickname", benificiaryDetails["nickName"] !== "-" ? benificiaryDetails["nickName"] : null);
    //transMan.setTransactionAttribute("toProcessedName", benificiaryDetails["processedName"]);
    transMan.setTransactionAttribute("transactionType", "ExternalTransfer");
    transMan.setTransactionAttribute("disableToAccount",true);
    transMan.setTransactionAttribute("isBusiness",benificiaryDetails["isBusinessPayee"]);
    transMan.setTransactionAttribute("routingNumber",benificiaryDetails["routingNumber"] || null);
    transMan.setTransactionAttribute("beneficiaryId",benificiaryDetails["beneficiaryId"] || benificiaryDetails["Id"] || null);
	transMan.setTransactionAttribute("IBAN", benificiaryDetails["IBAN"] || null);
	transMan.setTransactionAttribute("swiftCode", benificiaryDetails["swiftCode"] !== "-" ? benificiaryDetails["swiftCode"] : null);
	scope_TransfersPresentationController.transactionMode = benificiaryDetails.transactionMode;
    scope_TransfersPresentationController.setAmountBasedOnTransactionType();
    if(benificiaryDetails.isInternationalAccount === "false" && benificiaryDetails.isSameBankAccount === "true"){
		scope_TransfersPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
    }
    else if(benificiaryDetails.isInternationalAccount === "false" && benificiaryDetails.isSameBankAccount === "false"){
		scope_TransfersPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
    }
    else{
		scope_TransfersPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
    }
  };
  
  Transfer_PresentationController.prototype.resetStateNavigationForCreditCardAccounts = function() {
    if (scope_TransfersPresentationController.previousAccountType === "CreditCard" || scope_TransfersPresentationController.currentAccountType === "CreditCard") {
      if (scope_TransfersPresentationController.stateNavigation) {
        var navMan = applicationManager.getNavigationManager();
        scope_TransfersPresentationController.initializeStateData(false, "");
        var formname = "frmEuropeTransferToAccount";
        var index = navMan.getFormIndex(formname);
        var stackLength = navMan.stack.length;
        if (index === null)
          navMan.setFormIndex(formname, stackLength - 1);
        else {
          for (var i = stackLength - 1; i > index; i--) {
            navMan.removeFormIndex(navMan.stack[i]);
            navMan.stack.pop();
          }
        }
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("isScheduled", "0");
        transactionManager.setTransactionAttribute("amount", null);
        transactionManager.setTransactionAttribute("reference", null);
        transactionManager.setTransactionAttribute("transactionsNotes", null);
      }
    }
  };

  Transfer_PresentationController.prototype.fetchAccountDetailPresentationSuccessCallback = function(response) {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("nextPaymentDate", response[0]["nextPaymentDate"]);
    transactionManager.setTransactionAttribute("nextPaymentAmount", response[0]["nextPaymentAmount"]);
    transactionManager.setTransactionAttribute("paymentDue", response[0]["paymentDue"]);
    scope_TransfersPresentationController.setAmountBasedOnTransactionType();
    scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeTransferAmount");
  };

    Transfer_PresentationController.prototype.fetchAccountDetailPresentationErrorCallback = function(error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(error["isServerUnreachable"])
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    };

    Transfer_PresentationController.prototype.getTransferObjectById = function(screenType) {
        var accdata = [];
        var processAccountsData = null;
        var trasMan = applicationManager.getTransactionManager();
        var accMan = applicationManager.getAccountManager();
      	var fromAccNr = trasMan.getTransactionObject().fromAccountNumber;
        if (fromAccNr) {
          var accData = accMan.getInternalAccountByID(fromAccNr);
          accdata.push(accData);
          processAccountsData = scope_TransfersPresentationController.processAccountsData(accdata,screenType);
        } else if (Object.keys(scope_TransfersPresentationController.selectedFromAccountData).length !== 0) {
          var accData = accMan.getInternalAccountByID(scope_TransfersPresentationController.selectedFromAccountData.accountID);
          accdata.push(accData);
          processAccountsData = scope_TransfersPresentationController.processAccountsData(accdata,screenType);
        }
        return processAccountsData;
      };

      /**
   * This method is used to get to account data from transaction object
   */
  Transfer_PresentationController.prototype.getToAccountData = function(){
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    var toAccountData= {};
    if(transObj.transactionType == "P2P"){
      toAccountData["payPersonName"] = transObj.toProcessedName;
      toAccountData["p2pContact"] = transObj.p2pContact;
      toAccountData["personId"] = transObj.personId;
    }
    else{
      if(transObj.transactionType == "InternalTransfer"){
        if (transObj.toAccountType === "CreditCard") {
          var forUtility = applicationManager.getFormatUtilManager();
          toAccountData["toAccountNumber"] = transObj.toAccountNumber;
          toAccountData["toAccountName"] = transObj.toProcessedName;
          toAccountData["toAccountType"] = transObj.toAccountType;
          toAccountData["availableBalance"] = forUtility.formatAmountandAppendCurrencySymbol(transObj["outstandingBalance"], transObj["toAccountCurrency"]);
          toAccountData["accountBalanceType"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.EuropeTransfer.OutstandingBalance");
        }
        else {
          var accDataArr = [];
          var accMan = applicationManager.getAccountManager();
          var accData = accMan.getInternalAccountByID(transObj.toAccountNumber);
          accDataArr.push(accData);
          accData = scope_TransfersPresentationController.processAccountsData(accDataArr)[0];
          toAccountData["toAccountNumber"] = accData.accountID;
          toAccountData["toAccountName"] = accData.processedName;
          toAccountData["toAccountType"] = accData.accountType;
          toAccountData["availableBalance"] = accData.availableBalance;
          toAccountData["accountBalanceType"] = scope_TransfersPresentationController.getAvailableBalanceType(accData);
        }
      }
      else{
        toAccountData["toAccountNumber"] = transObj.toAccountNumber;
        toAccountData["toAccountName"] = transObj.toProcessedName;
        toAccountData["toAccountType"] = transObj.toAccountType;
        toAccountData["bankName"] = transObj.bankName;
        toAccountData["IBAN"] = transObj.IBAN;
      }
    }
    toAccountData["disableToAccount"] = transObj.disableToAccount;
    toAccountData["transactionType"] = transObj.transactionType;
    return toAccountData;
  };

    /**
   * This method is used to set to account data in transaction object
   */
  Transfer_PresentationController.prototype.getReviewScreenData = function(){
    var segData = [];
    var transObj = scope_TransfersPresentationController.getTransObject();
    var configManager = applicationManager.getConfigurationManager();
    configManager.cutOffTimeBreachedOverride = false;
    configManager.cutOffProductOverride = false;
    configManager.awaitingFundsOverride = false;
    //     var amountValue;
    //     if (transObj.amount)
    //     	amountValue = scope_TransfersPresentationController.formatAmountAndAppendCurrencyEurope(transObj.amount,transObj.transactionCurrency);
    //    	if (scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")){
    //      	if (transObj.transactionCurrency !== transObj.fromAccountCurrency) {
    //           amountValue = null;
    //         }
    //    	}
    //     segData.push({
    //       "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Amount"),
    //       "value": amountValue || "",
    //       "chevronImg":"chevron.png"
    //     });
     
    //  if (scope_TransfersPresentationController.transactionMode !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")) {     
    //   segData.push({
    //   "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfersEurope.TotalCharges"),
    //   "value": scope_TransfersPresentationController.formatAmountAndAppendCurrencyEurope(transObj.totalCharges,transObj.transactionCurrency),
    //   "chevronImg": "chevron.png"
    // });
    //  }
    if (scope_TransfersPresentationController.europeFlowType === "EXTERNAL" && scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")) {
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.PaymentMedium"),
        "value": transObj.paymentMedium || "",
        "chevronImg": "chevron.png"
      });
    }
    else {
      transObj.paymentType = null;
      transObj.paymentMedium = null;
    }
    if (scope_TransfersPresentationController.europeFlowType === "EXTERNAL" && (scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") || scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"))) {
      var value = "";
       
      if (transObj.paidBy) {
        switch (transObj.paidBy) {
          case "OUR":
            value = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Self");
            break;
          case "BEN":
            value = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Beneficiary");
            break;
          case "SHA":
            value = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Both");
            break;
        }
      }
      var transactionManager = applicationManager.getTransactionManager();
      transactionManager.setTransactionAttribute("paidBy", transObj.paidBy);
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.FeesPaidBy"),
        "value": value,
        "chevronImg": "chevron.png"
      });
    }
    segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfersEurope.reference"),
        "value": transObj.reference,
        "chevronImg": "chevron.png"
      });
    if(transObj.isScheduled=="1"){
      var calendarDate=""
      if(transObj.scheduledDate){
      	calendarDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.scheduledDate);
      }
      if(transObj.frequencyType=="Once"){
        segData.push({
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"),
          "value": scope_TransfersPresentationController.getFrequencyTypei18n(transObj.frequencyType),
          "chevronImg":"chevron.png"
        },
        {
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"),
          "value":calendarDate,
          "chevronImg":"chevron.png"
        });
      }
      else{
        var calendarDate="";
        var freqType = scope_TransfersPresentationController.getFrequencyTypei18n(transObj.frequencyType);
        if(transObj.frequencyStartDate){
        	calendarDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.frequencyStartDate);
        }
        else if (transObj.scheduledDate){
          calendarDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.scheduledDate);
        }
        segData.push(/*{
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.FrequencyDetails"),
		  "value" : "",
		  "chevronImg" : ""
        }, */
                     {
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"),
          "value":freqType,
          "chevronImg":"chevron.png"
        },
                     {
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.Duration"),
          "value":transObj.duration,
          "chevronImg":"chevron.png"
        },
                     {
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"),
          "value":calendarDate,
          "chevronImg":"chevron.png"
        });
        if((transObj.numberOfRecurrences && transObj.numberOfRecurrences>0) || transObj.duration === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers")){
          segData.push({
            "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"),
            "value":(transObj.numberOfRecurrences) ? transObj.numberOfRecurrences : "",
            "chevronImg":"chevron.png"
          });
        }
        else{
          var calendarDate=""
          if(transObj.frequencyEndDate){
          	calendarDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.frequencyEndDate);
          }
          segData.push({
            "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.EndingOn"),
            "value": calendarDate,
            "chevronImg":"chevron.png"
          });
        }
        segData.push({
          "property":"",
          "value": {"text" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.RemoveRepeatingTransfer"), "right" : "20dp"},
		      "chevronImg":""
        });
      }
      var recipientManager = applicationManager.getRecipientsManager();
      applicationManager.getPresentationUtility().showLoadingScreen();
      recipientManager.fetchBankDate({}, scope_TransfersPresentationController.getBankDateSuccess.bind(this, segData), scope_TransfersPresentationController.getBankDateFailure.bind(this, segData));
      //return null;
    }
    else {
      var transactionManager = applicationManager.getTransactionManager();
      transactionManager.setTransactionAttribute("frequencyType", "Once");
      transactionManager.setTransactionAttribute("numberOfRecurrences", "");
      transactionManager.setTransactionAttribute("frequencyEndDate", "");
      transactionManager.setTransactionAttribute("frequencyStartDate", "");
      transactionManager.setTransactionAttribute("duration", "");
      transactionManager.setTransactionAttribute("endCalendarDate", "");
      var recipientManager = applicationManager.getRecipientsManager();
      applicationManager.getPresentationUtility().showLoadingScreen();
      recipientManager.fetchBankDate({}, scope_TransfersPresentationController.getBankDateSuccess.bind(this, segData), scope_TransfersPresentationController.getBankDateFailure.bind(this, segData));
      //return null;
    }
  };

  Transfer_PresentationController.prototype.getBankDateSuccess = function(segData, res) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var transObj = scope_TransfersPresentationController.getTransObject();
    var transactionManager = applicationManager.getTransactionManager();
    var formatUtilManager = applicationManager.getFormatUtilManager();
    var bankDate = res.date[0].currentWorkingDate;
    var formatedDateObject = formatUtilManager.getDateObjectfromString(bankDate);
    scope_TransfersPresentationController.serverDate = formatedDateObject;
    if (transObj.isScheduled === "0") {
      var formatedDate = formatUtilManager.getFormatedDateString(formatedDateObject, "m/d/Y"); 
      var calendarDate = formatUtilManager.getFormatedDateString(formatedDateObject, formatUtilManager.getApplicationDateFormat());
      segData.push({
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"),
        "value":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.Once"),
        "chevronImg":"chevron.png"
      },
      {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"),
        "value":calendarDate,
        "chevronImg":"chevron.png"
      });
      transactionManager.setTransactionAttribute("scheduledDate", formatedDate);
      transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_TransfersPresentationController.convertCalendarDateToLocaleDate(formatedDate));
    }  
    var controller = applicationManager.getPresentationUtility().getController('frmEuropeVerifyTransferDetails', true);
    //controller.bindDataToSegment(segData);
    controller.proceedWithPreshow(segData);
  };

  Transfer_PresentationController.prototype.getBankDateFailure = function(segData, err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]) 
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    else {
      var transObj = scope_TransfersPresentationController.getTransObject();
      var formatUtilManager = applicationManager.getFormatUtilManager();
      var transactionManager = applicationManager.getTransactionManager();
      var serverDate = scope_TransfersPresentationController.getServerDate();
      scope_TransfersPresentationController.serverDate = serverDate;
      if (transObj.isScheduled === "0") {
        var formatedDate = formatUtilManager.getFormatedDateString(serverDate, "m/d/Y"); 
        var calendarDate = formatUtilManager.getFormatedDateString(serverDate, formatUtilManager.getApplicationDateFormat());
        segData.push({
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"),
          "value":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.Once"),
          "chevronImg":"chevron.png"
        },
        {
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"),
          "value":calendarDate,
          "chevronImg":"chevron.png"
        });
        transactionManager.setTransactionAttribute("scheduledDate", formatedDate);
        transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_TransfersPresentationController.convertCalendarDateToLocaleDate(formatedDate));
      }  
      var controller = applicationManager.getPresentationUtility().getController('frmEuropeVerifyTransferDetails', true);
      // controller.bindDataToSegment(segData);
      controller.proceedWithPreshow(segData);
    }
  };

  Transfer_PresentationController.prototype.getServerDate = function(date) {
    var config = applicationManager.getConfigurationManager();              
    var offset = config.getOffset();
    var hours = offset[0];
    var minutes = offset[1];
    var dateUTC;
    if (date) 
      dateUTC = new Date(date);
    else {
      var srh = applicationManager.getServiceResponseHandler();
      var serverdate = srh.getServerDate();
      if(kony.sdk.isNullOrUndefined(serverdate) || serverdate == "") {
        serverdate = Date.now();
      }
      dateUTC = new Date(serverdate);
    }
    var dateIST = new Date(dateUTC);
    dateIST.setUTCHours(dateIST.getUTCHours() + hours);
    dateIST.setUTCMinutes(dateIST.getUTCMinutes() + minutes);
    return dateIST;
  };

  /**
   * This method is used to perform action based on the row clicked in review screen
   * rowData - {object} data of the selected row in the review screen
   */
  Transfer_PresentationController.prototype.reviewRowClick = function(rowData){
    switch(rowData.property){
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"):
        if (!scope_TransfersPresentationController.isLoansAccountType)
        	scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeFrequency");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.StartDate"):
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"):
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeStartDate");
        break;
//       case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Amount"):
//         scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeTransferAmount");
//         break;
     case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.FeeBreakdown"):        
        scope_TransfersPresentationController.commonFunctionForNavigation("TransferEuropeUIModule/frmChargesBreakdownEurope");      
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.EndDate"):
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.EndingOn"):  
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeEndDate");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"):
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeNumberOfTransfers");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.Duration"):
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeDuration");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfersEurope.reference"):
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeTransferReference");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.PaymentMedium"):
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropePaymentMedium");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.FeesPaidBy"):
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeFeePayment");
        break;     
      default:
        if(rowData.value.text==applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.RemoveRepeatingTransfer")){
          var transactionManager = applicationManager.getTransactionManager();
          transactionManager.setTransactionAttribute("isScheduled", "0");
          scope_TransfersPresentationController.initializeStateData(false, "");
          var controller = applicationManager.getPresentationUtility().getController('frmEuropeVerifyTransferDetails', true);
          scope_TransfersPresentationController.getReviewScreenData();
          controller.changeButtonText();
        }
    }
  };

  /**
   * This method is used to return the index of the type of frequency selected in the select frequency screen.
   */
  Transfer_PresentationController.prototype.getSelectedFrequencyIndex = function() {
    var transactionObj = applicationManager.getTransactionManager();
    var frequency = transactionObj.getTransactionObject().frequencyType;
    switch (frequency) {
      case "Once":
        return 0;
        break;
      case "Daily":
        return 1;
        break;
      case "Weekly":
        return 2;
        break;
      case "Every Two Weeks":
        return 3;
        break;
      case "Monthly":
        return 4;
        break;
      case "Quarterly":
        return 5;
        break;
      case "Half Yearly":
        return 6;
        break;
      case "Yearly":
        return 7;
        break;
      default:
        return "";
    }
  };

  /**
   * This method is used to populate the transaction object with the frequency selected in the frequency screen.
   * Index - {String} Type of frequency selected.
   */
  Transfer_PresentationController.prototype.switchFrequencyType = function(Index) {
    var transactionObj = applicationManager.getTransactionManager();
    var frequencyTypes = transactionObj.getAvailableFrequencyType();
    var navMan = applicationManager.getNavigationManager();
    var data = {};
    if(!(transactionObj.transferObject && transactionObj.transferObject.duration)){
        scope_TransfersPresentationController.initializeStateData(false, "");
    }
    switch (Index) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.Once"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.ONCE);
        transactionObj.setTransactionAttribute("isScheduled", "0");
        transactionObj.getTransactionObject().scheduledDate;
        data = {
          "freq": "Once"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Daily"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.DAILY);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Weekly"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.WEEKLY);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.BiWeekly"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.EVERYTWOWEEKS);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Monthly"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.MONTHLY);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Quaterly"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.QUARTERLY);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.EverySixMonths"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.HALFYEARLY);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Annually"):
        transactionObj.setTransactionAttribute("frequencyType", frequencyTypes.YEARLY);
        transactionObj.setTransactionAttribute("isScheduled", "1");
        data = {
          "freq": "NotOnce"
        };
        break;
      default:
        break;
    }
    navMan.setCustomInfo("frmEuropeStartDate", data);
    if (data["freq"] === "Once") {
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeStartDate");
    }
    else {
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeDuration");
    }
  };

  /**
   * This method is used to populate the transaction object with the start date selected in the start date calendar.
   * startData - {String} Date in format mm/dd/yyyy
   */
  Transfer_PresentationController.prototype.processStartDate = function(startDate) {
    var formattedDate = startDate;
    var transactionManager = applicationManager.getTransactionManager();
    var date1 = scope_TransfersPresentationController.serverDate;
    date1.setHours(0,0,0,0);
    var date2 = new Date(formattedDate);
    date2.setHours(0,0,0,0); // Setting the hours, minutes, seconds and milliseconds of selected send date and today's date so that they can be compared for equality.
    if (date1.getTime() !== date2.getTime()) // If transfer frequency is Once and the send date is equal to today's date, then the type of transaction is posted otherwise scheduled.
        transactionManager.setTransactionAttribute("isScheduled", "1");
    else
        transactionManager.setTransactionAttribute("isScheduled", "0");
    transactionManager.setTransactionAttribute("scheduledDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_TransfersPresentationController.convertCalendarDateToLocaleDate(formattedDate));
    scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
  };

  /*additional date field to use in  the calendar page in the back flow*/
  Transfer_PresentationController.prototype.convertCalendarDateToLocaleDate = function(formattedDate) {
    var forUtility = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager()
    var convertedDate = forUtility.getFormatedDateString(forUtility.getDateObjectFromCalendarString(formattedDate, "MM/DD/YYYY"), configManager.frontendDateFormat[configManager.getLocale()]);
    return convertedDate;
  };

  /**
   * This method is used to populate the transaction object with the start date selected in the start date calendar and navigate to the Recurrence screen if Number of Transfers is selected as duration type previously.
   * startData - {String} Date in format mm/dd/yyyy
   */
  Transfer_PresentationController.prototype.navigateToRecurrence = function(startDate) {
    var formattedDate = startDate;
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("frequencyStartDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_TransfersPresentationController.convertCalendarDateToLocaleDate(formattedDate));
    scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeNumberOfTransfers");
  };

  /**
   * This method is used to populate the transaction object with the start date selected in the start date calendar and navigate to the End Date calendar screen if Date Range is selected as duration type previously.
   * startData - {String} Date in format mm/dd/yyyy
   */
  Transfer_PresentationController.prototype.navigateToEndDate = function(startDate) {
    var formattedDate = startDate;
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("frequencyStartDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_TransfersPresentationController.convertCalendarDateToLocaleDate(formattedDate));
    scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeEndDate");
  };

  /**
   * This method is used to return the index of the type of duration selected in the select set duration screen.
   */
  Transfer_PresentationController.prototype.getIndexForDuration = function() {
    var index;
    var transactionManager = applicationManager.getTransactionManager();
    var durationOption = transactionManager.getTransactionObject().duration;
    if (durationOption === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange")) index = 0;
    else if (durationOption === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers")) index = 1;
    return index;
  };

  /**
   * This method is used to populate the transaction object with the duration selected in the set duration screen.
   * Index - {String} Type of duration selected.
   */
  Transfer_PresentationController.prototype.switchDurationType = function(index) {
    var transactionObj = applicationManager.getTransactionManager();
    transactionObj.getAvailableFrequencyType();
    var navMan = applicationManager.getNavigationManager();
    switch (index) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange"):
        transactionObj.setTransactionAttribute("numberOfRecurrences", null);
        transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange"));
        var data = {
          "freq": "ReccDate"
        };
        navMan.setCustomInfo("frmEuropeStartDate", data);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeStartDate");
        break;
      // case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"):
      //   transactionObj.setTransactionAttribute("frequencyEndDate", null);
      //   transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"));
      //   var data = {
      //     "freq": "NofRR"
      //   };
      //   navMan.setCustomInfo("frmEuropeStartDate", data);
      //   scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeStartDate");
      //   break;
    }
  };

  /**
   * This method is used to populate the transaction object with the end date selected.
   * endDate - {String} Date in format mm/dd/yyyy
   */
  Transfer_PresentationController.prototype.processEndDate = function(endDate) {
    var formattedDate = endDate;
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("frequencyEndDate", formattedDate);
    transactionManager.setTransactionAttribute("endCalendarDate", scope_TransfersPresentationController.convertCalendarDateToLocaleDate(formattedDate));
    scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
  };

  /**
   * This method is used to populate the transaction object with the Recurrnece number selected.
   * recurrence - {Number} Value of recurrence number.
   */
  Transfer_PresentationController.prototype.setRecurrence = function(reccurrence) {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("numberOfRecurrences", reccurrence);
    scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
  };
  
  /**
   * This method is used to fetch Limits from backend
   * data - {string} holds the amount user has entered in the transfer amount screen
   */
  Transfer_PresentationController.prototype.fetchLimits = function(amount){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var featureAction;
    var configManager =  applicationManager.getConfigurationManager();
    switch(scope_TransfersPresentationController.transactionMode){
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts"):
        featureAction = "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE";
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"):
        featureAction = "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"):
        featureAction = "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE";
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :  
        featureAction = "INTRA_BANK_FUND_TRANSFER_CREATE";
        break;
    }
    configManager.fetchLimitsForAnAction(featureAction,this.fetchLimitsSuccess.bind(this, amount) , this.fetchLimitsError.bind(this, amount));
  };

  Transfer_PresentationController.prototype.fetchLimitsSuccess = function(amount, res) {
    var fromAccountNumber = applicationManager.getTransactionManager().getTransactionObject().fromAccountNumber;
    var configManager = applicationManager.getConfigurationManager();
    scope_TransfersPresentationController.haveLimitsBeenFetched = true;
    if (fromAccountNumber && res.accounts) {
      var limit = res.accounts.filter(function(obj) {
        return obj.accountId === fromAccountNumber;
      });
      if (limit && limit.length > 0) {
        limit = limit[0].limits;
        switch(scope_TransfersPresentationController.transactionMode){
          case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts"):
            configManager.setConfigurationValue("maxKonyBankAccountsTransferLimit", limit.MAX_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("minKonyBankAccountsTransferLimit", limit.MIN_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("KonyBankAccountsAutoDeniedTransferLimit", limit.AUTO_DENIED_TRANSACTION_LIMIT);
            break;
          case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"):
            configManager.setConfigurationValue("maxOtherBankAccountsTransferLimit", limit.MAX_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("minOtherBankAccountsTransferLimit", limit.MIN_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("OtherBankAccountsAutoDeniedTransferLimit", limit.AUTO_DENIED_TRANSACTION_LIMIT);
            break;
          case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"):
            configManager.setConfigurationValue("maxInternationalAccountsTransferLimit", limit.MAX_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("minInternationalAccountsTransferLimit", limit.MIN_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("InternationalAccountsAutoDeniedTransferLimit", limit.AUTO_DENIED_TRANSACTION_LIMIT);
            break;
          case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :  
            configManager.setConfigurationValue("maxOtherKonyAccountsTransferLimit", limit.MAX_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("minOtherKonyAccountsTransferLimit", limit.MIN_TRANSACTION_LIMIT);
            configManager.setConfigurationValue("OtherKonyAccountsAutoDeniedTransferLimit", limit.AUTO_DENIED_TRANSACTION_LIMIT);
            break;       
        }
      }
    }
    var controller = applicationManager.getPresentationUtility().getController('frmEuropeTransferAmount', true);
    controller.executeAfterFetchingLimits(amount); 
  };


  Transfer_PresentationController.prototype.fetchLimitsError = function(amount, res) {
    scope_TransfersPresentationController.haveLimitsBeenFetched = true;
    var controller = applicationManager.getPresentationUtility().getController('frmEuropeTransferAmount', true);
    controller.executeAfterFetchingLimits(amount); 
  };
  
  Transfer_PresentationController.prototype.evaluateMinMaxAmountLimits = function(amount){
    var configManager =  applicationManager.getConfigurationManager();
    var maxlimit,minlimit,autoDeniedLimit;
    switch(scope_TransfersPresentationController.transactionMode){
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts"):
        maxlimit = configManager.getConfigurationValue("maxKonyBankAccountsTransferLimit");
        minlimit = configManager.getConfigurationValue("minKonyBankAccountsTransferLimit");
        autoDeniedLimit = configManager.getConfigurationValue("KonyBankAccountsAutoDeniedTransferLimit");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"):
        maxlimit = configManager.getConfigurationValue("maxOtherBankAccountsTransferLimit");
        minlimit = configManager.getConfigurationValue("minOtherBankAccountsTransferLimit");
        autoDeniedLimit = configManager.getConfigurationValue("OtherBankAccountsAutoDeniedTransferLimit");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"):
        maxlimit = configManager.getConfigurationValue("maxInternationalAccountsTransferLimit");
        minlimit = configManager.getConfigurationValue("minInternationalAccountsTransferLimit");
        autoDeniedLimit = configManager.getConfigurationValue("InternationalAccountsAutoDeniedTransferLimit");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :
        maxlimit = configManager.getConfigurationValue("maxOtherKonyAccountsTransferLimit");
        minlimit = configManager.getConfigurationValue("minOtherKonyAccountsTransferLimit");
        autoDeniedLimit = configManager.getConfigurationValue("OtherKonyAccountsAutoDeniedTransferLimit");
        break;
    }
    if(Number(amount)>Number(maxlimit)){
      return {"max":maxlimit};
    }
    if(Number(amount)<Number(minlimit)){
      return {"min":minlimit};
    }
    if (autoDeniedLimit) {
      var minValue = Math.min(Number(autoDeniedLimit), Number(maxlimit));
      if (Number(amount) > minValue) {
        return {"max":minValue}
      }
    }
    return "valid";
  };
  
  Transfer_PresentationController.prototype.setAmount = function(amount){
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    transactionManager.setTransactionAttribute("amount",amount);
    if(transObj.isScheduled==undefined || transObj.isScheduled==null ||transObj.isScheduled==""){
      transactionManager.setTransactionAttribute("isScheduled","0");
    }
    scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeTransferReference");
  };
Transfer_PresentationController.prototype.setReference = function(reference){
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    transactionManager.setTransactionAttribute("reference",reference);
    transactionManager.setTransactionAttribute("transactionsNotes",reference);
    if(transObj.isScheduled==undefined || transObj.isScheduled==null ||transObj.isScheduled==""){
      transactionManager.setTransactionAttribute("isScheduled","0");
    }
  	if (scope_TransfersPresentationController.europeFlowType === "INTERNAL") {
    	scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
    }  
  	else {
      var configManager = applicationManager.getConfigurationManager();
      if (configManager.europeConfiguration.isPaymentMediumAvailable && scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")) {
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropePaymentMedium");
      }
      else {
        if (configManager.europeConfiguration.isInternationalTransactionFeeEnabled)
			if ((scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")) || (scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")))
				scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeFeePayment");
			else
				scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
        else
          scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
      }
    }
  };

  Transfer_PresentationController.prototype.makeATransfer = function(fileInputs) {
    var transactionManager = applicationManager.getTransactionManager();
    var transactionObj = transactionManager.getTransactionObject();
    var mfaManager = applicationManager.getMFAManager();
    var serviceName = transactionObj.serviceName;
    if(kony.sdk.isNullOrUndefined(serviceName)){
      var displayName = applicationManager.getPresentationUtility().MFA.getDisplayNameBasedOnTransactionMode();
      applicationManager.getPresentationUtility().MFA.getServiceIdBasedOnDisplayName(displayName);
      serviceName = mfaManager.getServiceId();
    }
    else {
      mfaManager.setServiceId(serviceName);
    }
    if (serviceName) {
    	var mfaParams = {
        	serviceName: serviceName
    	};
    	transactionManager.setTransactionAttribute("MFAAttributes", mfaParams);
    }
    
    if (transactionManager.getTransactionObject().transactionId != "" && transactionManager.getTransactionObject().transactionId != null && transactionManager.getTransactionObject().transactionId != null) {
        //  alert(transactionManager.getP2PObject());
      	var requestData = scope_TransfersPresentationController.filterTransactionObject();
      	 if (requestData.IBAN) {
      		requestData.iban = requestData.IBAN;
           	requestData.iban = requestData.iban.replace(/\s/g, "");
           	delete requestData.IBAN; 
    	 }
   		 if (requestData.toAccountNumber) {
      		requestData.toAccountNumber = requestData.toAccountNumber.replace(/\s/g, "");
            if (requestData.transactionType === "ExternalTransfer") {
        		requestData.ExternalAccountNumber = requestData.toAccountNumber;
      		}
      		else {
      			requestData.ExternalAccountNumber = "";
      		}  

      }
      requestData.validate = "false";
      requestData.uploadedattachments = fileInputs;
      var navMan = applicationManager.getNavigationManager();
      var deletedDocuments = navMan.getCustomInfo("deletedDocuments");
      requestData.deletedDocuments = deletedDocuments.toString();
      var editTransactionBasedOnTransactionMode = scope_TransfersPresentationController.getEditFunctionReference();
      requestData = scope_TransfersPresentationController.filterRequestData(requestData);
      if (editTransactionBasedOnTransactionMode)
        editTransactionBasedOnTransactionMode(requestData, this.presentationMakeATransferSuccess, this.presentationMakeATransferError);
    } else {
      transactionManager.setTransactionAttribute("serviceName", serviceName);
      var requestData = scope_TransfersPresentationController.filterTransactionObject();
      if (requestData.IBAN) {
        requestData.iban = requestData.IBAN;
        requestData.iban = requestData.iban.replace(/\s/g, "");
        delete requestData.IBAN;
      }
      if (requestData.toAccountNumber) {
        requestData.toAccountNumber = requestData.toAccountNumber.replace(/\s/g, "");
        if (requestData.transactionType === "ExternalTransfer") {
          requestData.ExternalAccountNumber = requestData.toAccountNumber;
        }
        else {
          requestData.ExternalAccountNumber = "";
        }
      }
      requestData.uploadedattachments = fileInputs;
     // requestData.userId = applicationManager.getUserPreferencesManager().getUserId();
    if (!requestData.paidBy) {
      requestData.paidBy = "";
    }
    requestData.validate = "false";
    requestData.transactionId = scope_TransfersPresentationController.validateReferenceId;
    //PSD2 flag indicator for proper total debit and charge Values
    requestData.createWithPaymentId = "true";
    var createTransactionBasedOnTransactionMode = scope_TransfersPresentationController.getCreateFunctionReference();
    requestData = scope_TransfersPresentationController.filterRequestData(requestData);
    if (createTransactionBasedOnTransactionMode)
      createTransactionBasedOnTransactionMode(requestData, this.presentationMakeATransferSuccess, this.presentationMakeATransferError);
    }  
  };
Transfer_PresentationController.prototype.getOperationName= function() {
    var operationName = "";
    var flowType = scope_TransfersPresentationController.mfaFlowType;
    switch (flowType) {
      case "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE":
        operationName = "TransferToOwnAccounts";
        break;
      case "INTRA_BANK_FUND_TRANSFER_CREATE":
        operationName = "IntraBankAccFundTransfer";
        //operationName = "createOneTimeTransfer";
        break;
      case "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE":
        operationName = "InterBankAccFundTransfer";
        //operationName = "createOneTimeTransfer";
        break;
      case "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE":
        operationName = "InternationalAccFundTransfer";
        //operationName = "createOneTimeTransfer";
        break;
      case "P2P_CREATE":
        operationName = "P2PTransfer";
        break;
      case "TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE":
        operationName = "TransferToOwnAccountsEdit";
        break;
      case "INTRA_BANK_FUND_TRANSFER_UPDATE":
        operationName = "IntraBankAccFundTransferEdit";
        break;
      case "INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE":
        operationName = "InterBankFundTransferEdit";
        break;
      case "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE":
        operationName = "InternationalFundTransferEdit";
        break;
      case "P2P_EDIT":
        operationName = "P2PTransferEdit";
        break;
    }
    return operationName;
  };

Transfer_PresentationController.prototype.presentationMakeATransferSuccess = function(resp) {
  var navMan = applicationManager.getNavigationManager();
  var successfulUploadsArray = [];
  var failedUploadsArray = [];
  if (resp.successfulUploads){
    successfulUploadsArray = resp.successfulUploads.split(","); 
  }
  if (resp.failedUploads){
    failedUploadsArray = resp.failedUploads.split(",");
  }  
  navMan.setCustomInfo("successfulUploads", successfulUploadsArray);
  navMan.setCustomInfo("failedUploads", failedUploadsArray);
  if(resp.MFAAttributes && resp.MFAAttributes.isMFARequired == "true"){
      var operationName = scope_TransfersPresentationController.getOperationName();
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      var transactionManager = applicationManager.getTransactionManager();
      const transferObject = transactionManager.getTransactionObject();
      if (scope_TransfersPresentationController.transactionMode == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")) {
        var mfaJSON = {
          "flowType": scope_TransfersPresentationController.mfaFlowType,
          "response": resp,
          "objectServiceDetails": {
            "operationName": operationName,
            "serviceName": "TransactionObjects",
            "dataModel": "Transaction"
          },
          "userName": userName,
          "userDetails": {
            "data1": transferObject.fromAccountNumber,
            "data2": transferObject.amount
          }
        };
      }
      else {
        var mfaJSON = {
          "flowType": scope_TransfersPresentationController.mfaFlowType,
          "response": resp,
          "objectServiceDetails": {
            "operationName": operationName,
            "serviceName": "TransactionObjects",
            "dataModel": "Transaction"
          },
          "userName": userName,
          "userDetails": {
            "data1": transferObject.fromAccountNumber,
            "data2": transferObject.amount
          }
        };
      }
      applicationManager.getMFAManager().setMFAOperationType("EUROPETRANSFER");
      //applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmMFAValidation", mfaJSON);
      var viewController = applicationManager.getPresentationUtility().getController('frmEuropeVerifyTransferDetails', true);
      viewController.SCAComponentCall(mfaJSON);
    }
    else {
        var transactionManager = applicationManager.getTransactionManager();
        if(resp.backendReferenceId)
          transactionManager.setTransactionAttribute("referenceId",resp.backendReferenceId);
        else if(resp.referenceId)
          transactionManager.setTransactionAttribute("referenceId",resp.referenceId);
        transactionManager.setTransactionAttribute("shareReferenceId", resp.referenceId);
        var navigationManager = applicationManager.getNavigationManager();
      	if(resp.exchangeRate){
        	transactionManager.setTransactionAttribute("exchangeRate",resp.exchangeRate);
      	}
         if(resp.quoteCurrency){
        transactionManager.setTransactionAttribute("quoteCurrency",resp.quoteCurrency);
         }
        navigationManager.setCustomInfo("frmEuropeConfirmation", resp.status); 
        scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeConfirmation");
    }
  };

  /**
   * This method is a callback on eroor of creating or editing transfer
   * err - {object} error response
   */
  Transfer_PresentationController.prototype.presentationMakeATransferError = function(err) {
    if (err["isServerUnreachable"]) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
          var transactionManager = applicationManager.getTransactionManager();
          if(err.serverErrorRes&&err.serverErrorRes.errorDetails) {
          var errorDetails = JSON.parse(err.serverErrorRes.errorDetails);
          if(errorDetails != null && errorDetails != "") 
          transactionManager.setTransactionAttribute("errmsg",errorDetails);
          } else {
          var formattedResponse = [];
          var errMsg = {};
          errMsg.message = err.errorDetails;
          errMsg.imgIcon = " ";
          formattedResponse.push(errMsg)
          transactionManager.setTransactionAttribute("errmsg",formattedResponse);
          }
          scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeConfirmation");
    }
};
  
   Transfer_PresentationController.prototype.getEditFunctionReference = function() {
     var managerFunction;
     var mfaManager = applicationManager.getMFAManager();
     var transactionManager = applicationManager.getTransactionManager();
     switch(scope_TransfersPresentationController.transactionMode) {
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
         	mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE");
         	scope_TransfersPresentationController.mfaFlowType="TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE";
         	managerFunction = transactionManager.editTransferToOwnAccounts;
         	break;
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :
         	mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_UPDATE");
         	scope_TransfersPresentationController.mfaFlowType="INTRA_BANK_FUND_TRANSFER_UPDATE";
         	managerFunction = transactionManager.editIntraBankAccFundTransfer;
         	break;
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
         	mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE");
         	scope_TransfersPresentationController.mfaFlowType="INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE";
         	managerFunction = transactionManager.editInterBankAccFundTransfer;
         	break;
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
         	mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE");
         	scope_TransfersPresentationController.mfaFlowType="INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE";
         	managerFunction = transactionManager.editInternationalAccFundTransfer;
         	break;
     }
     if (managerFunction)
      return managerFunction.bind(transactionManager);
    return;  
   };
  
     Transfer_PresentationController.prototype.getCreateFunctionReference = function() {
      var managerFunction; 
      var mfaManager = applicationManager.getMFAManager();
      var transactionManager = applicationManager.getTransactionManager();
      switch(scope_TransfersPresentationController.transactionMode) {
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
          if (transactionManager.getTransactionObject()['toAccountType'] === "CreditCard") {
            managerFunction = transactionManager.createCreditCardTransaction;
          }
          else {
         	  mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
            scope_TransfersPresentationController.mfaFlowType="TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE";
            managerFunction = (scope_TransfersPresentationController.triggerOneTimePaymentFlow)? transactionManager.createOneTimeTransfer : transactionManager.createTransferToOwnAccounts;
          }  
         	break;
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :
         	mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_CREATE");
           scope_TransfersPresentationController.mfaFlowType="INTRA_BANK_FUND_TRANSFER_CREATE";
           managerFunction = (scope_TransfersPresentationController.triggerOneTimePaymentFlow)? transactionManager.createOneTimeTransfer : transactionManager.createIntraBankAccFundTransfer;
         	break;
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
         	mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE");
           scope_TransfersPresentationController.mfaFlowType="INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
           managerFunction = (scope_TransfersPresentationController.triggerOneTimePaymentFlow)? transactionManager.createOneTimeTransfer : transactionManager.createInterBankAccFundTransfer;
         	break;
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
         	mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE");
           scope_TransfersPresentationController.mfaFlowType="INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE";
           managerFunction = (scope_TransfersPresentationController.triggerOneTimePaymentFlow)? transactionManager.createOneTimeTransfer : transactionManager.createInternationalAccFundTransfer;
         	break;
     }
     if (managerFunction)
      return managerFunction.bind(transactionManager);
    return;   
   };
  	
  Transfer_PresentationController.prototype.filterTransactionObject = function() { 
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
  /**
   * This method is for initiating from and to accounts fetch calls
   * getFromAccountsCallback {callBack Function} - used for from accounts call when initiating same getFromAndToAccounts method from different entry points
   */
  Transfer_PresentationController.prototype.getFromAndToAccounts = function(getFromAccountsCallback) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var configManager = applicationManager.getConfigurationManager();
    //holds the information about the status of the service call that has been initiated
    scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus={};
    var recMan = applicationManager.getRecipientsManager();
    var payeeManager = applicationManager.getRecipientsManager();
    if(getFromAccountsCallback){
      scope_TransfersPresentationController.getFromAccounts(getFromAccountsCallback);
    }
    else{
      scope_TransfersPresentationController.getFromAccounts(scope_TransfersPresentationController.fromAccountsPresentationSuccessCallBack);
    }
    if (configManager.checkUserPermission("INTRA_BANK_FUND_TRANSFER_CREATE")) {
      //Setting status to 0 initially and after receiving completion callback we are changing it to 1 and hence areAllServicesDone method recognises service call is completed
      scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.SameBankTransferStatus = 0;
      recMan.fetchAllInternalBenificiaries(scope_TransfersPresentationController.fetchAllInternalBenificiariesPresentationSuccessCallBack, scope_TransfersPresentationController.fetchAllInternalBenificiariesPresentationErrorCallBack);
    }
    if (configManager.checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE")) {
      //Setting status to 0 initially and after receiving completion callback we are changing it to 1 and hence areAllServicesDone method recognises service call is completed
      scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.OtherBankTransferStatus = 0;
      recMan.fetchAllExternalBenificiaries(scope_TransfersPresentationController.fetchAllExternalBenificiariesPresentationSuccessCallBack, scope_TransfersPresentationController.fetchAllExternalBenificiariesPresentationErrorCallBack);
    }
    if (configManager.checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE")) {
      //Setting status to 0 initially and after receiving completion callback we are changing it to 1 and hence areAllServicesDone method recognises service call is completed
      scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.InternationalTransferStatus = 0;
      recMan.fetchInternationalRecepients(scope_TransfersPresentationController.fetchInternationalRecepientsPresentationSuccessCallBack, scope_TransfersPresentationController.fetchInternationalRecepientsPresentationErrorCallBack);
    }
    //scope_TransfersPresentationController.asyncResponseData.RecentStatus = 0;
    //recMan.fetchRecentBenificiaries({}, scope_TransfersPresentationController.fetchRecentBeneficiariesPresentationSuccessCallback, scope_TransfersPresentationController.fetchRecentBeneficiariesPresentationErrorCallback);
  };

  /** This method is invoked after successful retrieval of internal benificiaries
    *  response - {object} internal benificiaries response from the backend
   */
  Transfer_PresentationController.prototype.fetchAllInternalBenificiariesPresentationSuccessCallBack = function(response) {
    scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.SameBankTransferStatus = 1;
    scope_TransfersPresentationController.asyncResponseData.InternalBenificiariesData = response;
    if (scope_TransfersPresentationController.areAllServicesDone()) {
      scope_TransfersPresentationController.navigateToShowToList();
    }
  };

  /** This method is invoked if any error is triggered while retrieving list of internal benificiaries
    *  errorResponse - {object} error response from the backend
   */
  Transfer_PresentationController.prototype.fetchAllInternalBenificiariesPresentationErrorCallBack = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else {
      scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.SameBankTransferStatus = 1;
      scope_TransfersPresentationController.asyncResponseData.InternalBenificiariesData = 0;
      if (scope_TransfersPresentationController.areAllServicesDone()) {
        scope_TransfersPresentationController.navigateToShowToList();
      }
    }
  };
  /** This method is invoked after successful retrieval of external benificiaries
   *  response - {object} external benificiaries response from the backend
   */
  Transfer_PresentationController.prototype.fetchAllExternalBenificiariesPresentationSuccessCallBack = function(response) {
    scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.OtherBankTransferStatus = 1;
    scope_TransfersPresentationController.asyncResponseData.OtherBankBenificiariesData = response;
    if (scope_TransfersPresentationController.areAllServicesDone()) {
      scope_TransfersPresentationController.navigateToShowToList();
    }
  };
  /** This method is invoked if any error is triggered while retrieving list of external benificiaries
    *  errorResponse - {object} error response from the backend
   */
  Transfer_PresentationController.prototype.fetchAllExternalBenificiariesPresentationErrorCallBack = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else {
      scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.OtherBankTransferStatus = 1;
      scope_TransfersPresentationController.asyncResponseData.OtherBankBenificiariesData = 0;
      if (scope_TransfersPresentationController.areAllServicesDone()) {
        scope_TransfersPresentationController.navigateToShowToList();
      }
    }
  };
  /** This method is invoked after successful retrieval of international benificiaries
   *  response - {object} international benificiaries response from the backend
   */
  Transfer_PresentationController.prototype.fetchInternationalRecepientsPresentationSuccessCallBack = function(response) {
    scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.InternationalTransferStatus = 1;
    scope_TransfersPresentationController.asyncResponseData.InternationalBenificiariesData = response;
    if (scope_TransfersPresentationController.areAllServicesDone()) {
      scope_TransfersPresentationController.navigateToShowToList();
    }
  };
  /** This method is invoked if any error is triggered while retrieving list of international benificiaries
   *  errorResponse - {object} error response from the backend
   */
  Transfer_PresentationController.prototype.fetchInternationalRecepientsPresentationErrorCallBack = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else {
      scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.InternationalTransferStatus = 1;
      scope_TransfersPresentationController.asyncResponseData.InternationalBenificiariesData = 0;
      if (scope_TransfersPresentationController.areAllServicesDone()) {
        scope_TransfersPresentationController.navigateToShowToList();
      }
    }
  };
  /** This method checks for completion status of all to accounts calls that have been initiated
   */
  Transfer_PresentationController.prototype.areAllServicesDone = function() {
    for(var key in scope_TransfersPresentationController.asyncResponseData["serviceCallsStatus"]){
      if(scope_TransfersPresentationController.asyncResponseData["serviceCallsStatus"][key]===0){
        return false;
      }
    }
    return true;
  };
   /** This method is invoked after successful retrieval of payees
    *  response - {object} payees response from the backend
   */
  Transfer_PresentationController.prototype.allPayeeSuccess = function(response) {
    scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.P2PStatus = 1;
    scope_TransfersPresentationController.asyncResponseData.P2PData = response;
    if (scope_TransfersPresentationController.areAllServicesDone()) {
      scope_TransfersPresentationController.navigateToShowToList();
    }
  };
  /** This method is invoked if any error is triggered while retrieving list of payees
    *  errorResponse - {object} error response from the backend
   */
  Transfer_PresentationController.prototype.allPayeeError = function(errorResponse) {
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.P2PStatus = 1;
     scope_TransfersPresentationController.asyncResponseData.P2PData = 0;
     if (scope_TransfersPresentationController.areAllServicesDone()) {
        scope_TransfersPresentationController.navigateToShowToList();
     }
  };
  Transfer_PresentationController.prototype.navigateToShowToList = function() {
    scope_TransfersPresentationController.toAccountList.externalBenificiaries = [];
    scope_TransfersPresentationController.toAccountList.internationalBenificiaries = [];
    scope_TransfersPresentationController.toAccountList.internalBenificiaries = [];
    if (scope_TransfersPresentationController.asyncResponseData.InternalBenificiariesData)
    	scope_TransfersPresentationController.toAccountList.internalBenificiaries = scope_TransfersPresentationController.asyncResponseData.InternalBenificiariesData.ExternalAccounts;
    //scope_TransfersPresentationController.toAccountList.RecentBenificiaries = scope_TransfersPresentationController.asyncResponseData.RecentBenificiariesData;
    if (scope_TransfersPresentationController.asyncResponseData.OtherBankBenificiariesData)
    	scope_TransfersPresentationController.toAccountList.externalBenificiaries = scope_TransfersPresentationController.asyncResponseData.OtherBankBenificiariesData.ExternalAccounts;
    if (scope_TransfersPresentationController.asyncResponseData.InternationalBenificiariesData)
    	scope_TransfersPresentationController.toAccountList.internationalBenificiaries = scope_TransfersPresentationController.asyncResponseData.InternationalBenificiariesData.ExternalAccounts;
    //var controller = applicationManager.getPresentationUtility().getController({"appName":"TransfersMA","friendlyName":"TransferEuropeUIModule/frmEuropeTransferToAccountSM"}, true);
    if(scope_TransfersPresentationController.toAccountList.externalBenificiaries.length === 0 && scope_TransfersPresentationController.toAccountList.internationalBenificiaries.length === 0 && scope_TransfersPresentationController.toAccountList.internalBenificiaries.length === 0) {
      //controller.bindDataAfterTransition(1);
      if (Object.keys(scope_TransfersPresentationController.selectedFromAccountData).length !== 0) {
        scope_TransfersPresentationController.commonFunctionForNavigation({"appName":"TransfersMA","friendlyName":"TransferEuropeUIModule/frmEuropeTransferToAccountSM"});
      }
    }else {
      //controller.bindDataAfterTransition(0);
      if (Object.keys(scope_TransfersPresentationController.selectedFromAccountData).length !== 0) {
        scope_TransfersPresentationController.commonFunctionForNavigation({"appName":"TransfersMA","friendlyName":"TransferEuropeUIModule/frmEuropeTransferToAccountSM"});
      }
    }
     
  };

  Transfer_PresentationController.prototype.fetchRecentBeneficiariesPresentationSuccessCallback = function(response) {
    scope_TransfersPresentationController.asyncResponseData.RecentStatus = 1;
    scope_TransfersPresentationController.asyncResponseData.RecentBenificiariesData = response.recentTransactions;
    if (scope_TransfersPresentationController.areAllServicesDone()) {
      scope_TransfersPresentationController.navigateToShowToList();
    }
  };

  Transfer_PresentationController.prototype.fetchRecentBeneficiariesPresentationErrorCallback = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else {
      scope_TransfersPresentationController.asyncResponseData.serviceCallsStatus.RecentStatus = 1;
      scope_TransfersPresentationController.asyncResponseData.RecentBenificiariesData = 0;
      if (scope_TransfersPresentationController.areAllServicesDone()) {
        scope_TransfersPresentationController.navigateToShowToList();
      }
    }
  };

  Transfer_PresentationController.prototype.getConfirmationScreenData = function() {
    var segData = [];
    var navMan = applicationManager.getNavigationManager();
    var uploadedAttachments = navMan.getCustomInfo("uploadedAttachments");
    var transObj = scope_TransfersPresentationController.getTransObject();
    var paymentMethod = scope_TransfersPresentationController.getPaymentMethod();
	var iconMappingData=[];
     var fromIcon=false,toIcon=false,toIconImage="",fromIconImage="";
    iconMappingData=navMan.getCustomInfo("iconMappingData");
    if(!kony.sdk.isNullOrUndefined(iconMappingData)){
   	iconMappingData.forEach(item=>{
      if(item.toIconsrc){
        toIcon=true;
        toIconImage=item.toIconsrc;
      }
      else{
        fromIcon=true;
        fromIconImage=item.fromIconsrc;
      }
    });
    }
	var attachmentsValue = "";
    if(!kony.sdk.isNullOrUndefined(uploadedAttachments)){
    for(var i=0; i <uploadedAttachments.length; i++){
      attachmentsValue += uploadedAttachments[i];
      if(i != uploadedAttachments.length-1){
        attachmentsValue = attachmentsValue + ",";
      }
	}
  }
    if (!kony.sdk.isNullOrUndefined(transObj.referenceId)) {
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.PaymentReferenceId"),
        "value" : transObj.referenceId
        });
    }
    else if (!kony.sdk.isNullOrUndefined(transObj.transactionId)) {
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.TransactionID"),
        "value" : transObj.transactionId
       });
    }
    segData.push({
      "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.FromAccount"),
      "value" : transObj.fromProcessedName
      },{
      "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.ToAccount"),
      "value" : transObj.toProcessedName
     });
    if (scope_TransfersPresentationController.transactionMode !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts")) {
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.PaymentMethod"),
        "value": paymentMethod
        });
    }
    var bankAddress = "";
    if (transObj.bankName) {
      bankAddress = transObj.bankName;
    }
    if (transObj.countryName) {
      bankAddress =(bankAddress !== "") ? bankAddress + ", " + transObj.countryName : transObj.countryName;
    }
    if (bankAddress !== null && bankAddress !== undefined && bankAddress !== "") {
      transObj.bankName = bankAddress;
    }
    if (!kony.sdk.isNullOrUndefined(transObj.bankAddress)) {
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.WireTransfer.BankAddress"),
        "value": transObj.bankAddress
        });
    } else {
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.addBen.bankName"),
        "value": transObj.bankName || "-"
       });
    }
    segData.push({
      "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Amount"),
      "value" : scope_TransfersPresentationController.formatAmountAndAppendCurrencyEurope(transObj.amount,transObj.transactionCurrency)
     });
    if (transObj.exchangeRate && transObj.fromAccountCurrency !== transObj.transactionCurrency) {
      var exchangeRateValue;
    if(transObj.quoteCurrency !== transObj.transactionCurrency){
        exchangeRateValue = scope_TransfersPresentationController.formatAmountAndAppendCurrencyEurope(1, transObj.quoteCurrency) + ' = ' + scope_TransfersPresentationController.formatAmountAndAppendCurrencyEurope(transObj.exchangeRate, transObj.transactionCurrency);
      } else {
        exchangeRateValue = scope_TransfersPresentationController.formatAmountAndAppendCurrencyEurope(1, transObj.quoteCurrency) + ' = ' + scope_TransfersPresentationController.formatAmountAndAppendCurrencyEurope(transObj.exchangeRate, transObj.fromAccountCurrency);
      }
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.ExchangeRate"),
        "value": exchangeRateValue
       });
    }
    if (transObj.frequencyType === "Once"){
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"),
        "value" : scope_TransfersPresentationController.getFrequencyTypei18n(transObj.frequencyType)
        },{
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"),
        "value" : applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.scheduledDate)
        });
      if(!kony.sdk.isNullOrUndefined(transObj.creditValueDate) && transObj.creditValueDate!=""){
       segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.payments.creditValueDate"),
        "value" : applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.creditValueDate)
        });
      }
    }
    else {
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"),
        "value" : scope_TransfersPresentationController.getFrequencyTypei18n(transObj.frequencyType)
        },
      {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.StartDate"),
        "value" : applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.frequencyStartDate)
        });
      if (!kony.sdk.isNullOrUndefined(transObj.numberOfRecurrences)) {
        segData.push({
          "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"),
          "value" : transObj.numberOfRecurrences
         });
      }
      else{
       if(transObj.frequencyEndDate !== null && transObj.frequencyEndDate !== undefined && transObj.frequencyEndDate !== ""){
        var EndDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.frequencyEndDate);
        }
        segData.push({
          "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.EndDate"),
          "value" : EndDate || "-"
          });
      }
    }
    segData.push({
      "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfersEurope.reference"),
      "value" : transObj.reference
     });
      segData.forEach(item=>{
        if(item.property===applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.FromAccount")){
          item["flxAccountType"]={isVisible:fromIcon},
          item["imgAccountType"]={src:fromIconImage}
	 }
        else if(item.property===applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.ToAccount")){
          item["flxAccountType"]={isVisible:toIcon},
          item["imgAccountType"]={src:toIconImage}
          }
        else{
          item["flxAccountType"]={isVisible:false}
        }
      });
    return segData;
  };

  Transfer_PresentationController.prototype.setEuropeFlowType = function(flowType) {
    scope_TransfersPresentationController.europeFlowType = flowType;
  };

  Transfer_PresentationController.prototype.getEuropeFlowType = function() {
    return scope_TransfersPresentationController.europeFlowType;
  };

  Transfer_PresentationController.prototype.getFilteredRecentAccounts = function() {
    var recentsList = scope_TransfersPresentationController.toAccountList.RecentBenificiaries;
    var filteredRecentsList = [];
    if (recentsList) {
      for (var i = 0; i < recentsList.length; i++) {
        if (recentsList[i].IsInternationalAccount === "true" && scope_TransfersPresentationController.getEntitlementValue("isInternationalAccountsTransfer") === "true") {
          filteredRecentsList.push(recentsList[i]);
        }
        if (recentsList[i].IsInternationalAccount === "false" && scope_TransfersPresentationController.getEntitlementValue("isOtherBankAccountsTransfer") === "true") {
          filteredRecentsList.push(recentsList[i]);
        }
      }
      if (filteredRecentsList.length > 3) {
        filteredRecentsList.splice(3);
      }
    }
    return filteredRecentsList;
  };

  Transfer_PresentationController.prototype.processRecentsData = function (data) {
    var processedData = [];
    var dataArray = [];
    if (kony.sdk.isNullOrUndefined(data)) {
      return;
    }
    for (var i = 0; i < data.length; i++) {
      switch (data[i].TransactionType) {
        case "ExternalTransfer":
         if (data[i].IsInternationalAccount === "true") {
            data[i].transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
          }
          else {
            data[i].transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
          }
          dataArray = [];
          dataArray.push(data[i]);
          dataArray = scope_TransfersPresentationController.processExternalAccountsData(dataArray);
          processedData.push(dataArray.pop());
          break;
      }
    }
    return processedData;
  };

  /**
   * This method is used process the external accounts data in the format required for service definition
   * data - {Array} holds the collection of external accounts
   */
  Transfer_PresentationController.prototype.processExternalAccountsData = function(data) {
    var accProcessedData = [];
    for (var i = 0; i < data.length; i++) {
      accProcessedData[i] = {};
      var name = "";
      //if (data[i].nickName === null || data[i].nickName === undefined) {
        name = data[i].beneficiaryName||data[i].nickName;
      //} else {
        //name = data[i].nickName;
      //}
      accProcessedData[i].accountName = data[i].beneficiaryName;
      accProcessedData[i].nickName = data[i].nickName;
      accProcessedData[i].accountID = data[i].accountNumber;
      accProcessedData[i].bankName = data[i].bankName;
      accProcessedData[i].countryName = data[i].countryName;
      if (data[i].accountType) { 
        if (data[i].accountType.indexOf("Account") > -1)
        	accProcessedData[i].accountBalanceType = data[i].accountType;
        else 
        	accProcessedData[i].accountBalanceType = data[i].accountType + " Account";
      }
      else {
        accProcessedData[i].accountBalanceType = "";
      }
      accProcessedData[i].accountType = data[i].accountType;
      if(data[i].accountNumber){
      accProcessedData[i].processedName = applicationManager.getPresentationUtility().formatText(name, 10, data[i].accountNumber, 4);
      }
      else if(data[i].IBAN){
        accProcessedData[i].processedName = applicationManager.getPresentationUtility().formatText(name, 10, data[i].IBAN, 4);
      }
      accProcessedData[i].transactionMode = data[i].transactionMode;
      accProcessedData[i].beneficiaryId = data[i].beneficiaryId;
      accProcessedData[i].routingNumber = data[i].routingNumber;
      accProcessedData[i].IBAN = data[i].IBAN;
      accProcessedData[i].swiftCode = data[i].swiftCode;
      accProcessedData[i].accountTypeFlx = {isVisible: false};
      accProcessedData[i].imgBankIcon = {isVisible: false};  

    }
    return accProcessedData;
  };

  /**
   * This method is used to return the to supported transfer accounts
   */
  Transfer_PresentationController.prototype.getToAccounts = function() {
    return scope_TransfersPresentationController.toAccountList;
  };
  /**
   * This method is used to set the to accounts list from manage flow
   * parm {accList} - array of accounts with newly added account
   */
  Transfer_PresentationController.prototype.setToAccountsList=function(accList){
    scope_TransfersPresentationController.toAccountList=accList;
  };

    /**
   * This method is used to set setTransaction mode to each transfer
   * beneficiaries {array} - list of accounts/beneficiaries
   * transactionMode {string} - transaction mode of the beneficiaries/accounts
   */
  Transfer_PresentationController.prototype.addTransactionMode = function(beneficiaries,transactionMode){
    for(var i=0;i<beneficiaries.length;i++){
      beneficiaries[i]["transactionMode"]=transactionMode;
    }
    return beneficiaries;
  };

  Transfer_PresentationController.prototype.removeExternalAccountsWhichAreInRecents = function(externalAccountsData, recentsData) {
    var accountsToRemove = recentsData.map(function(obj) {
      return obj.accountID;
    });
    accountsToRemove = new Set(accountsToRemove);
    return externalAccountsData.filter(function(obj) {
      return !accountsToRemove.has(obj.accountID);
    });
  };
  
  

  Transfer_PresentationController.prototype.enterAddRecipientFlow = function(Index) {
    scope_TransfersPresentationController.clearBenificiaryData();
    
    var transactionObj = applicationManager.getRecipientsManager();
    
    switch (Index) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Beneficiary.SameBank"):
         transactionObj.setBeneficiaryAttribute("isSameBankAccount", true);
        transactionObj.setBeneficiaryAttribute("bankType", 'SAME.BANK');
        scope_TransfersPresentationController.setFlowType("OtherKonyBankMembersCreateTransfer");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Beneficiary.NotSameBank"):
       transactionObj.setBeneficiaryAttribute("bankType", 'OTHER.BANK');
         transactionObj.setBeneficiaryAttribute("isSameBankAccount", false);

        break;
     
      default:
        break;
    }
   
        scope_TransfersPresentationController.commonFunctionForNavigation("frmBenNameEurope");
    
  };
    
  
    

  Transfer_PresentationController.prototype.enterAddNewBen = function() {
    var navMan = applicationManager.getNavigationManager()
    navMan.navigateTo("TransferEuropeUIModule/frmEuropeTransferToAccountNewBen");
  };


    /**
    * This method is used to build the values for to internal account in the model definition
    * Invokes from account details screen
    * @param {data} selected to internal account
    */
   Transfer_PresentationController.prototype.setTransferToAccountFromAccDetailsFlow=function(data){
    scope_TransfersPresentationController.clearEuropeFlowAtributes();
    var selectedToAccount=[];
    selectedToAccount.push(data);
    var processedDataValue = scope_TransfersPresentationController.processAccountsData(selectedToAccount, "to");
    var processedData=processedDataValue[0];
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("toAccountNumber", processedData["accountID"]);
    transactionManager.setTransactionAttribute("toAccountType", processedData["accountType"]);
    scope_TransfersPresentationController.isLoansAccountType = (processedData["accountType"] === "Loan") ? true : false; 
    transactionManager.setTransactionAttribute("toAccountName", processedData["accountName"]);
    transactionManager.setTransactionAttribute("transactionType", "InternalTransfer");
    transactionManager.setTransactionAttribute("toProcessedName", processedData["processedName"]);
    transactionManager.setTransactionAttribute("bankName", processedData["bankName"]);
    transactionManager.setTransactionAttribute("nextPaymentDate", processedData["nextPaymentDate"]);
    transactionManager.setTransactionAttribute("nextPaymentAmount", processedData["nextPaymentAmount"]);
    transactionManager.setTransactionAttribute("paymentDue", processedData["paymentDue"]);
    transactionManager.setTransactionAttribute("toAccountCurrency", processedData["toAccountCurrency"]); 
    transactionManager.setTransactionAttribute("transactionCurrency", processedData["toAccountCurrency"]); 
    scope_TransfersPresentationController.getFromAndToAccounts();
  };

  /**
    * This method is used to build the values for to internal account in the model definition
    * Invokes from account details screen
    * @param {data} selected from internal account
    */
  Transfer_PresentationController.prototype.setTransferFromAccountFromAccDetailsFlow = function (data) {
    scope_TransfersPresentationController.clearEuropeFlowAtributes();
    var selectedFromAccount = [];
    selectedFromAccount.push(data);
    var processedDataValue = scope_TransfersPresentationController.processAccountsData(selectedFromAccount, "from");
    var processedData = processedDataValue[0];
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("fromAccountNumber", processedData["accountID"]);
    transactionManager.setTransactionAttribute("fromAccountType", processedData["accountType"]);
    transactionManager.setTransactionAttribute("fromAccountName", processedData["accountName"]);
    transactionManager.setTransactionAttribute("transactionType", "InternalTransfer");
    transactionManager.setTransactionAttribute("fromProcessedName", processedData["processedName"]);
    transactionManager.setTransactionAttribute("fromBankName", processedData["bankName"]);
    transactionManager.setTransactionAttribute("fromAccountBalance", processedData["fromAccountBalance"]);
    transactionManager.setTransactionAttribute("isfromAccountBusiness", processedData["isBusinessAccount"]);
    transactionManager.setTransactionAttribute("fromAccountMembershipId", processedData["membershipID"]);
    //scope_TransfersPresentationController.getFromAndToAccounts();
    if (processedData.fromAccountCurrency) {
            transactionManager.setTransactionAttribute("fromAccountCurrency", processedData.fromAccountCurrency);
        } else {
            transactionManager.setTransactionAttribute("fromAccountCurrency", selectedFromAccount.currencyCode);
        }
    if (scope_TransfersPresentationController.getEuropeFlowType() === "INTERNAL") {  
      scope_TransfersPresentationController.getFromAccounts(scope_TransfersPresentationController.navigateToToAccount);
    }
    else {
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmEuropeTransferAmount", data);
      navMan.setEntryPoint("makeatransferfromacc", "frmEuropeTransferAmount");
      scope_TransfersPresentationController.getFromAndToAccounts(scope_TransfersPresentationController.navigateToToAccountSM);
    }  
  };

  Transfer_PresentationController.prototype.navigateToToAccountSM = function(res) {
    scope_TransfersPresentationController.setFromAndToAccounts(res);
    scope_TransfersPresentationController.commonFunctionForNavigation({"appName":"TransfersMA","friendlyName":"TransferEuropeUIModule/frmEuropeTransferToAccountSM"});
  }

  Transfer_PresentationController.prototype.navigateToToAccount = function (res) {
    // var accountManager = applicationManager.getAccountManager();
    // var toSupportedAccounts = accountManager.getToTransferSupportedAccounts();
    // scope_TransfersPresentationController.toSupportedOwnAccounts = toSupportedAccounts;
    scope_TransfersPresentationController.setFromAndToAccounts(res);
    scope_TransfersPresentationController.filterToAccountsByExludingFromAccount();
    scope_TransfersPresentationController.commonFunctionForNavigation({"appName":"TransfersMA","friendlyName":"TransferEuropeUIModule/frmEuropeTransferToAccount"});
  };

  Transfer_PresentationController.prototype.navigateToIBANDetails = function(recipientName) {
    var recipientsManager = applicationManager.getRecipientsManager();
    recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
    if (recipientsManager.benificiaryData.bankType !== 'SAME.BANK'){
      scope_TransfersPresentationController.commonFunctionForNavigation("frmtransfersIBANEurope");     
    }    
    else{
      scope_TransfersPresentationController.commonFunctionForNavigation("frmEnterBenAccNoEurope");
    }
    
  };
  Transfer_PresentationController.prototype.navigateBackToVerifyDetails = function(accountData) {
    var recipientsManager = applicationManager.getRecipientsManager();
    recipientsManager.setBeneficiaryAttribute("addressLine2",accountData.addressLine2);
    recipientsManager.setBeneficiaryAttribute("addressLine1",accountData.addressLine1);
    recipientsManager.setBeneficiaryAttribute("city",accountData.city);
    recipientsManager.setBeneficiaryAttribute("zipcode",accountData.zipcode);
    recipientsManager.setBeneficiaryAttribute("country",accountData.country);    
    scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
  };
   Transfer_PresentationController.prototype.navigateToVerifyDetailsFromNickName = function(nickData) {
    var recipientsManager = applicationManager.getRecipientsManager();
    recipientsManager.setBeneficiaryAttribute("nickName",nickData.nickName);
    scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
  };
  Transfer_PresentationController.prototype.navigateToSwiftCodefromIBAN= function(data){
    var recipientsManager = applicationManager.getRecipientsManager();
    if(scope_TransfersPresentationController.isInternationIBANEntered){
      recipientsManager.setBeneficiaryAttribute("accountNumber","");
      recipientsManager.setBeneficiaryAttribute("IBAN",data);
    }
    else{
    recipientsManager.setBeneficiaryAttribute("accountNumber",data);
    recipientsManager.setBeneficiaryAttribute("IBAN","");
    scope_TransfersPresentationController.setIBAN("");
    }
    
    var bendata= scope_TransfersPresentationController.getBenificiaryData();
    if(bendata.swiftCode==scope_TransfersPresentationController.swiftforEnteredIBAN){
      recipientsManager.setBeneficiaryAttribute("swiftCode","");
      scope_TransfersPresentationController.setSwiftCode("");
      scope_TransfersPresentationController.swiftforEnteredIBAN="";
    }
    scope_TransfersPresentationController.setFlowType("InternationalRecipientCreateTransfer");
    scope_TransfersPresentationController.commonFunctionForNavigation("frmBenSwiftCodeEurope");
  };
  Transfer_PresentationController.prototype.navigateToVerifyDetailsFromSwiftCode= function(data){
    var recipientsManager = applicationManager.getRecipientsManager();
    var transactionManager = applicationManager.getTransactionManager();
    scope_TransfersPresentationController.setSwiftCode(data);
    recipientsManager.setBeneficiaryAttribute("swiftCode",data);
    var navMan=applicationManager.getNavigationManager();
    var lookUpResultData=navMan.getCustomInfo("frmLookUpResults");
     if(lookUpResultData && lookUpResultData.countryRegion && lookUpResultData.bic==data){
       if(lookUpResultData.countryRegion=="DOMESTIC"){
         scope_TransfersPresentationController.setFlowType("OtherBankRecipientsCreateTransfer");
       }
       else{
         scope_TransfersPresentationController.setFlowType("InternationalRecipientCreateTransfer");
       }
       if(lookUpResultData && lookUpResultData.formattedAddress!=undefined)
         transactionManager.setTransactionAttribute("bankAddress",lookUpResultData.formattedAddress)
       if (lookUpResultData && lookUpResultData.formattedAddress != undefined) 
         recipientsManager.setBeneficiaryAttribute("countryName", lookUpResultData.formattedAddress);        
        //  scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
     }
    else{
		//scope_TransfersPresentationController.fetchBankDetailsFromSwiftCode(data,"INTERNATIONAL_ACCOUNT_FUND_TRANSFER")
      if (lookUpResultData && lookUpResultData.formattedAddress != undefined) 
         recipientsManager.setBeneficiaryAttribute("countryName", lookUpResultData.formattedAddress)  
      // scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    }
    navMan.setEntryPoint("contracts",navMan.getCurrentForm());
    var flowType = scope_TransfersPresentationController.getFlowType();
    var featureAction = scope_TransfersPresentationController.getFeatureAction(flowType);
    scope_TransfersPresentationController.getContractDetails(featureAction);
  };
  
   Transfer_PresentationController.prototype.getPaymentMediumData = function () {
    var segData = [];
    segData.push({
      "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.DomesticPayment"),
      "description": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.NormalPaymentDescription")
    },{
      "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.InstantPayment"),
      "description": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.InstantPaymentDescription")
    });
    return segData;
  };

  Transfer_PresentationController.prototype.setPaymentMedium = function(paymentMedium) {
    var transactionManager = applicationManager.getTransactionManager();
    var configManager = applicationManager.getConfigurationManager();
    if (paymentMedium === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.DomesticPayment")) {
      transactionManager.setTransactionAttribute("paymentType", "SEPA");
      transactionManager.setTransactionAttribute("paymentMedium", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.DomesticPayment"));
    }
    else {
      transactionManager.setTransactionAttribute("paymentType", "INSTPAY");
      transactionManager.setTransactionAttribute("paymentMedium", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.InstantPayment"));
    }
    if (configManager.europeConfiguration.isInternationalTransactionFeeEnabled) {
		if ((scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")) || (scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")))
			scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeFeePayment");
		else
			scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
    }
    else {
      scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
    }
  };

Transfer_PresentationController.prototype.getFeesMediumData = function () {
var segData = [];
if (scope_TransfersPresentationController.transactionMode == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") || scope_TransfersPresentationController.transactionMode == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"))
{
segData.push({
"title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.IWillPay"),
"description": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.IWillPayDescription")
}, {
"title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.BenWillPay"),
"description": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.BenWillPayDescription")
}, {
"title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.SplitFees"),
"description": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.SplitFeesDescription")
});
}
return segData;
};
  Transfer_PresentationController.prototype.setFeesMedium = function(feesMedium) {
    var transactionManager = applicationManager.getTransactionManager();
    var configManager = applicationManager.getConfigurationManager();
    if (feesMedium === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.IWillPay")) {
      transactionManager.setTransactionAttribute("paidBy", "OUR");
    }
    else if (feesMedium === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.BenWillPay")) {
      transactionManager.setTransactionAttribute("paidBy", "BEN");
    }
    else {
      transactionManager.setTransactionAttribute("paidBy", "SHA");
    }
      transactionManager.setTransactionAttribute("feeCurrency", configManager.getBaseCurrency());
      //transactionManager.setTransactionAttribute("feeAmount", configManager.internationalTransactionFee); Removed due to security issues
      scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
  };
    Transfer_PresentationController.prototype.searchSwiftorBICCode= function(searchData){
    var recipientsManager = applicationManager.getRecipientsManager();
      var criteria= searchData; 
      scope_TransfersPresentationController.searchSwiftData=searchData
      recipientsManager.searchSwiftorBICCode(criteria,scope_TransfersPresentationController.searchSwiftorBICCodePresentationSuccessCallBack, scope_TransfersPresentationController.searchSwiftorBICCodeErrorCallBack);
  };
  Transfer_PresentationController.prototype.searchSwiftorBICCodePresentationSuccessCallBack=function(succRes){
    scope_TransfersPresentationController.SwiftorBICCodeResults=succRes.swiftCodes;
    scope_TransfersPresentationController.commonFunctionForNavigation("frmLookUpResults");
  };
   Transfer_PresentationController.prototype.searchSwiftorBICCodeErrorCallBack = function(errorResponse){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if (errorResponse["isServerUnreachable"])
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
     else {
       var controller = applicationManager.getPresentationUtility().getController('frmTransferEuropeSearchSwiftCode', true);
       controller.bindGenericError(errorResponse.errorMessage);
     }
   };
  Transfer_PresentationController.prototype.searchAllSwiftBICCode= function(searchData){
    var recipientsManager = applicationManager.getRecipientsManager();
      var criteria= searchData; 
      scope_TransfersPresentationController.searchSwiftData=searchData
      recipientsManager.searchAllSwiftBICCode(criteria,scope_TransfersPresentationController.searchAllSwiftBICCodePresentationSuccessCallBack, scope_TransfersPresentationController.searchAllSwiftBICCodeErrorCallBack);
  };
  Transfer_PresentationController.prototype.searchAllSwiftBICCodePresentationSuccessCallBack=function(succRes){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_TransfersPresentationController.SwiftorBICCodeResults=succRes.swiftCodes;
    scope_TransfersPresentationController.commonFunctionForNavigation({
      "appName": "TransfersMA",
      "friendlyName": "TransferEuropeUIModule/frmLookUpResults"
      });
  };
   Transfer_PresentationController.prototype.searchAllSwiftBICCodeErrorCallBack = function(errorResponse){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if (errorResponse["isServerUnreachable"])
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
     else {
       var controller = applicationManager.getPresentationUtility().getController('frmTransferEuropeSearchSwiftCode', true);
       controller.bindGenericError(errorResponse.errorMessage);
     }
   };
  Transfer_PresentationController.prototype.clearSwiftBICSearch = function () {
    scope_TransfersPresentationController.searchSwiftData = {};
  };  
  Transfer_PresentationController.prototype.getSwiftorBICCodeResults = function(){
    return scope_TransfersPresentationController.SwiftorBICCodeResults;
  };
  Transfer_PresentationController.prototype.setLookUpResultData = function(selectSwiftData){
    var recipientsManager = applicationManager.getRecipientsManager();
    scope_TransfersPresentationController.SwiftorBICCodeResults={};
    scope_TransfersPresentationController.setSwiftCode(selectSwiftData.bic);
    recipientsManager.setBeneficiaryAttribute("swiftCode",selectSwiftData.bic);
    scope_TransfersPresentationController.setBankName(selectSwiftData.bankName);
    recipientsManager.setBeneficiaryAttribute("bankName",selectSwiftData.bankName);
    scope_TransfersPresentationController.commonFunctionForNavigation("frmBenSwiftCodeEurope");
  };
  
  Transfer_PresentationController.prototype.getFurtherDetailsData = function() {
    var segData = [];
    var transObj = scope_TransfersPresentationController.getTransObject();
    var configManager = applicationManager.getConfigurationManager();
    var totalAmount = transObj.totalAmount;
    var feesPaidBy;  
    if(totalAmount){
     segData.push(
      {
      "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.TotalAmount"),
      "value" : scope_TransfersPresentationController.formatAmountAndAppendCurrencyEurope(totalAmount, transObj.fromAccountCurrency)
      });
    }
  //  segData.push({
   //   "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.BeneficiaryReceives"),
  //    "value" : scope_TransfersPresentationController.formatAmountAndAppendCurrencyEurope(transObj.amount,transObj.transactionCurrency)
  //    });
    
    if (transObj.paidBy){

      if (transObj.paidBy === "OUR") {
        feesPaidBy = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Self") + " (" + transObj.fromProcessedName + ")";
      }
      else if (transObj.paidBy === "BEN") {
        feesPaidBy = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Beneficiary");
      }
      else 
        feesPaidBy = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Both");

      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.FeesPaidBy"),
        "value" : feesPaidBy
      });
	}
    if (transObj.paymentType) {
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.PaymentMedium"),
        "value" : transObj.paymentMedium
      });
	}
    segData.push({
      "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.BeneficiariesNickname"),
      "value" : transObj.toAccountName
    },{
      "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.BeneficiarysAddress"),
      "value" : transObj.beneficiaryAddress
    })
    return segData;	 	
  };
  Transfer_PresentationController.prototype.getCurrencyData = function(){
      var configManager =  applicationManager.getConfigurationManager();
      var segData = [];
      segData.push(
        {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('AUD'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.AustralianDollar'),
          currencyCode: 'AUD',
          currencySymbol: "(" + configManager.getCurrency('AUD') + ")"
        },
        {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('CAD'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.CanadianDollar'),
          currencyCode: 'CAD',
          currencySymbol: "(" + configManager.getCurrency('CAD') + ")"
        },
        {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('EUR'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.Euro'),
          currencyCode: 'EUR',
          currencySymbol: "(" + configManager.getCurrency('EUR') + ")"
        },
        {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('GBP'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.BritishPound'),
          currencyCode: 'GBP',
          currencySymbol: "(" + configManager.getCurrency('GBP') + ")"
        },
        {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('JPY'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.JapaneseYen'),
          currencyCode: 'JPY',
          currencySymbol: "(" + configManager.getCurrency('JPY') + ")"
        },
        {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('CHF'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.SwissFranc'),
          currencyCode: 'CHF',
          currencySymbol: "(" + configManager.getCurrency('CHF') + ")"
        },
        {
          //imgSrc: scope_TransfersPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.USDollar'),
          currencyCode: 'USD',
          currencySymbol: "(" + configManager.getCurrency('USD') + ")"
        },
        {
          //imgSrc: scope_TransfersPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
          currencyName: 'YER',
          currencyCode: 'YER',
          currencySymbol: "(" + configManager.getCurrency('YER') + ")"
        },
        {
          //imgSrc: scope_TransfersPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
          currencyName: 'SAR',
          currencyCode: 'SAR',
          currencySymbol: "(" + configManager.getCurrency('SAR') + ")"
        }
      );
      return segData;
    };
  
 Transfer_PresentationController.prototype.getCurrenciesData = function(){
      var configManager =  applicationManager.getConfigurationManager();
      var currencyList = scope_TransfersPresentationController.supportedCurrencies;
      var segCurData = [];
      if (Array.isArray(currencyList)) {
      for (var i = 0; i < currencyList.length; i++) {
        var currency = currencyList[i].currency;
        var data = {};
        if (currency === 'AUD') 
        data = {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('AUD'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.AustralianDollar'),
          currencyCode: 'AUD',
          currencySymbol: "(" + configManager.getCurrency('AUD') + ")"
        };
        if (currency === 'CAD') 
        data = {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('CAD'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.CanadianDollar'),
          currencyCode: 'CAD',
          currencySymbol: "(" + configManager.getCurrency('CAD') + ")"
        };
         if (currency === 'EUR') 
        data = {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('EUR'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.Euro'),
          currencyCode: 'EUR',
          currencySymbol: "(" + configManager.getCurrency('EUR') + ")"
        };
         if (currency === 'GBP')
        data = {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('GBP'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.BritishPound'),
          currencyCode: 'GBP',
          currencySymbol: "(" + configManager.getCurrency('GBP') + ")"
        };
         if (currency === 'JPY') 
        data = {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('JPY'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.JapaneseYen'),
          currencyCode: 'JPY',
          currencySymbol: "(" + configManager.getCurrency('JPY') + ")"
        };
         if (currency === 'CHF') 
       data = { 
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('CHF'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.SwissFranc'),
          currencyCode: 'CHF',
          currencySymbol: "(" + configManager.getCurrency('CHF') + ")" 
        };
         if (currency === 'USD') 
        data = {
          //imgSrc: scope_TransfersPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.USDollar'),
          currencyCode: 'USD',
          currencySymbol: "(" + configManager.getCurrency('USD') + ")"
        };
         if (currency === 'YER') 
        data = {
          //imgSrc: scope_TransfersPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
          currencyName: 'YER',
          currencyCode: 'YER',
          currencySymbol: "(" + configManager.getCurrency('YER') + ")"
        };
         if (currency === 'SAR') 
        data = {
          //imgSrc: scope_TransfersPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
          currencyName: 'SAR',
          currencyCode: 'SAR',
          currencySymbol: "(" + configManager.getCurrency('SAR') + ")"
        };
        segCurData.push(data);
      }
    }
   return segCurData;
 };
  
  Transfer_PresentationController.prototype.getCurrencyFlag = function(currency){
    var currencyPairFlag = {
        'AUD' : 'australiandollar.png',
        'CAD' : 'canadiandollar.png',
        'EUR' : 'euro.png',
        'GBP' : 'britishpound.png',
        'JPY' : 'japaneseyen.png',
        'CHF' : 'swissfranc.png',
        'USD' : 'usdollar.png'
    }
    return currencyPairFlag[currency];
  };
  
  Transfer_PresentationController.prototype.isValidIBANCheck= function(data){
    var recipientsManager = applicationManager.getRecipientsManager();
     scope_TransfersPresentationController.setIBAN(data.replace(/\s/g, ""));
     recipientsManager.setBeneficiaryAttribute("IBAN",data.replace(/\s/g,""));
     recipientsManager.setBeneficiaryAttribute("accountNumber", data.replace(/\s/g, ""));
      var criteria={};
     /* if(data){
	 	criteria = kony.mvc.Expression.eq("iban", data);
      }*/ 
     var iban = data.replace(/\s/g, "");
     criteria.iban = iban;
     criteria.countryCode = iban.slice(0,2);
    applicationManager.getRecipientsManager().checkValidIBAN({"iban": criteria.iban}, this.isValidIBANCheckSuccess.bind(this, criteria), this.isValidIBANCheckFailure.bind(this,  criteria));
   
    //scope_TransfersPresentationController.searchSwiftorBICCodePresentationSuccessCallBack(response)
  };
  
  /**     * IBAN valid checker service Success Callback     
  * @param {Object} response object containing isIBANValid key     */    
  Transfer_PresentationController.prototype.isValidIBANCheckSuccess = function(criteria, response) {        
    if (response.isIBANValid === "YES") { 
      var recipientsManager = applicationManager.getRecipientsManager();
      recipientsManager.searchSwiftorBICCode(criteria,scope_TransfersPresentationController.searchSwiftorBICCodeSuccessCallBack, scope_TransfersPresentationController.searchSwiftorBICCodeErrorCallBack);     
    } else {            
      var controller = applicationManager.getPresentationUtility().getController('frmtransfersIBANEurope', true);
      controller.bindGenericError(kony.i18n.getLocalizedString("kony.mb.transferEurope.invalidIBAN"));    
    }    
  };

    /*** IBAN valid checker service Failure Callback    
    * @param {Object} response object which comes from service when the service fails     */   
  Transfer_PresentationController.prototype.isValidIBANCheckFailure = function(criteria, errorResponse) {        
    applicationManager.getPresentationUtility().dismissLoadingScreen();
     if (errorResponse["isServerUnreachable"])
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
     else {
       var controller = applicationManager.getPresentationUtility().getController('frmtransfersIBANEurope', true);
       controller.bindGenericError(kony.i18n.getLocalizedString("kony.mb.transferEurope.invalidIBAN"));
     } 
  };
  Transfer_PresentationController.prototype.searchSwiftorBICCodeSuccessCallBack= function(succRes){
     var bankData= (succRes.swiftCodes) ? succRes.swiftCodes[0] : succRes;
     var recipientsManager = applicationManager.getRecipientsManager();
     scope_TransfersPresentationController.setSwiftCode(bankData.bic);
     recipientsManager.setBeneficiaryAttribute("swiftCode",bankData.bic);
    // recipientsManager.setBeneficiaryAttribute("accountNumber","");
     scope_TransfersPresentationController.swiftforEnteredIBAN = bankData.bic;
     scope_TransfersPresentationController.setBankName(bankData.bankName);
     scope_TransfersPresentationController.setBankCountryName(bankData.country);
     if (succRes.sepaMember === undefined || succRes.sepaMember === "" || succRes.sepaMember === "Y") {
        scope_TransfersPresentationController.isInternationIBANEntered=false;
       scope_TransfersPresentationController.setFlowType("OtherBankRecipientsCreateTransfer"); 
     } else if (succRes.sepaMember === "N") { 
       scope_TransfersPresentationController.isInternationIBANEntered = true;
       scope_TransfersPresentationController.setFlowType("InternationalRecipientCreateTransfer"); 
     }
    //  scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    var navMan = applicationManager.getNavigationManager();
     navMan.setEntryPoint("contracts",navMan.getCurrentForm());
    var flowType = scope_TransfersPresentationController.getFlowType();
    var featureAction = scope_TransfersPresentationController.getFeatureAction(flowType);
    scope_TransfersPresentationController.getContractDetails(featureAction);
   };
  
  Transfer_PresentationController.prototype.fetchBankDetailsAndNavigate= function(data){
    var recipientsManager = applicationManager.getRecipientsManager();
     scope_TransfersPresentationController.setIBAN(data.replace(/\s/g, ""));
     recipientsManager.setBeneficiaryAttribute("IBAN",data.replace(/\s/g,""));
     recipientsManager.setBeneficiaryAttribute("accountNumber", data.replace(/\s/g, ""));
      var criteria={};
     /* if(data){
	 	criteria = kony.mvc.Expression.eq("iban", data);
      }*/ 
     var iban = data.replace(/\s/g, "");
     criteria.iban = iban;
     criteria.countryCode = iban.slice(0,2);
    recipientsManager.searchSwiftorBICCode(criteria,scope_TransfersPresentationController.fetchBankDetailsAndNavigatePresentationSuccessCallBack, scope_TransfersPresentationController.fetchBankDetailsAndNavigateErrorCallBack);
    //scope_TransfersPresentationController.searchSwiftorBICCodePresentationSuccessCallBack(response)
  };
   Transfer_PresentationController.prototype.fetchBankDetailsAndNavigatePresentationSuccessCallBack= function(succRes){
     var bankData= (succRes.swiftCodes) ? succRes.swiftCodes[0] : succRes;
     var recipientsManager = applicationManager.getRecipientsManager();
     scope_TransfersPresentationController.setSwiftCode(bankData.bic);
     recipientsManager.setBeneficiaryAttribute("swiftCode",bankData.bic);
    // recipientsManager.setBeneficiaryAttribute("accountNumber","");
     scope_TransfersPresentationController.swiftforEnteredIBAN = bankData.bic;
     scope_TransfersPresentationController.setBankName(bankData.bankName);
     scope_TransfersPresentationController.setBankCountryName(bankData.country);
      scope_TransfersPresentationController.setFlowType("OtherBankRecipientsCreateTransfer");
    //  scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    var navMan = applicationManager.getNavigationManager();
     navMan.setEntryPoint("contracts",navMan.getCurrentForm());
    var flowType = scope_TransfersPresentationController.getFlowType();
    var featureAction = scope_TransfersPresentationController.getFeatureAction(flowType);
    scope_TransfersPresentationController.getContractDetails(featureAction);
   };
    Transfer_PresentationController.prototype.fetchBankDetailsAndNavigateErrorCallBack= function(errorResponse){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if (errorResponse["isServerUnreachable"])
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
     else {
       var controller = applicationManager.getPresentationUtility().getController('frmtransfersIBANEurope', true);
       controller.bindGenericError(errorResponse.errorMessage);
     }
    };
  /* Inorder Fetch Valid BAnk Details on Inetrnational IBAN */
   Transfer_PresentationController.prototype.fetchInterBankDetailsAndNavigate= function(data){
    var recipientsManager = applicationManager.getRecipientsManager();
     scope_TransfersPresentationController.setIBAN(data.replace(/\s/g, ""));
     recipientsManager.setBeneficiaryAttribute("IBAN",data.replace(/\s/g,""));
     recipientsManager.setBeneficiaryAttribute("accountNumber", data.replace(/\s/g, ""));
      var criteria={};
     var iban = data.replace(/\s/g, "");
     criteria.iban = iban;
     criteria.countryCode = iban.slice(0,2);
    recipientsManager.searchSwiftorBICCode(criteria,scope_TransfersPresentationController.fetchInterBankDetailsAndNavigatePresentationSuccessCallBack, scope_TransfersPresentationController.fetchBankDetailsAndNavigateErrorCallBack);
  };
   Transfer_PresentationController.prototype.fetchInterBankDetailsAndNavigatePresentationSuccessCallBack= function(succRes){
     var bankData= (succRes.swiftCodes) ? succRes.swiftCodes[0] : succRes;
     var recipientsManager = applicationManager.getRecipientsManager();
     scope_TransfersPresentationController.setSwiftCode(bankData.bic);
     recipientsManager.setBeneficiaryAttribute("swiftCode",bankData.bic);
    // recipientsManager.setBeneficiaryAttribute("accountNumber","");
     scope_TransfersPresentationController.swiftforEnteredIBAN = bankData.bic;
     scope_TransfersPresentationController.setBankName(bankData.bankName);
     scope_TransfersPresentationController.setBankCountryName(bankData.country);
	 scope_TransfersPresentationController.setFlowType("InternationalRecipientCreateTransfer");
    //  scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    var navMan = applicationManager.getNavigationManager();
     navMan.setEntryPoint("contracts",navMan.getCurrentForm());
    var flowType = scope_TransfersPresentationController.getFlowType();
    var featureAction = scope_TransfersPresentationController.getFeatureAction(flowType);
    scope_TransfersPresentationController.getContractDetails(featureAction);
   };
  Transfer_PresentationController.prototype.fetchBankDetailsFromSwiftCode = function (swiftCode, serviceName) {
    var params = {
      "swiftCode": swiftCode,
      "serviceName": serviceName
    }
    var accountsManager = applicationManager.getAccountManager();
    accountsManager.fetchBankDetails(params, this.fetchBankDetailsFromSwiftCodeSuccess.bind(this), this.fetchBankDetailsFromSwiftCodeFailure.bind(this))
  };
  /** Gives Details of the bank for international transfer
     * @param {object} response Success response of bank details
     */
  Transfer_PresentationController.prototype.fetchBankDetailsFromSwiftCodeSuccess = function (response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	scope_TransfersPresentationController.setBankName(response.bankName);
    scope_TransfersPresentationController.setFlowType("InternationalRecipientCreateTransfer");
    scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
  };
  /** Failure callback when fetching of bank details for international transfer fails
     */
  Transfer_PresentationController.prototype.fetchBankDetailsFromSwiftCodeFailure = function (err) {
     applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmBenSwiftCodeEurope', true);
            controller.bindGenericError(err.errorMessage);
        }
  };

Transfer_PresentationController.prototype.setTransactionMode = function(serviceName) {
    switch (serviceName) {
      case "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE":
        scope_TransfersPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
        break;
      case "INTRA_BANK_FUND_TRANSFER_CREATE":
        scope_TransfersPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
        break;
      case "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE":
        scope_TransfersPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
        break;
      case "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE":
        scope_TransfersPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
        break;
      case "P2P_CREATE":
        scope_TransfersPresentationController.transactionMode = "PayAPerson";
        break;
      default :
        break;
    }
  };

  /**
   * This method is used to cancel a recurring transaction
   * data - {string} transactionId of the transaction
   * deleteSuccess  {callBack Function} - This method is the success callback on cancelling a transfer
   * deleteError {callBack Function} - This method is the error callback on cancelling a transfer
   */
  Transfer_PresentationController.prototype.deleteRecurrenceTransaction = function(data) {
    var criteria = {
      "transactionId": data
    };
    var cancelRecurrenceBasedOnTransactionMode = scope_TransfersPresentationController.getCanceRecFunctionReference();
    if (cancelRecurrenceBasedOnTransactionMode)
      cancelRecurrenceBasedOnTransactionMode(criteria, scope_TransfersPresentationController.deleteSuccess, scope_TransfersPresentationController.deleteError);
  };

  Transfer_PresentationController.prototype.getCanceRecFunctionReference = function() {
    var managerFunction;
    var transactionManager = applicationManager.getTransactionManager();
    switch(scope_TransfersPresentationController.transactionMode) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
        managerFunction = transactionManager.cancelOccurrenceTransferToOwnAccounts;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :  
        managerFunction = transactionManager.cancelOccurrenceIntraBankAccFundTransfer;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
        managerFunction = transactionManager.cancelOccurrenceInterBankAccFundTransfer;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
        managerFunction = transactionManager.cancelOccurrenceInternationalAccFundTransfer;
        break;
      case "PayAPerson":
        managerFunction = transactionManager.deleteP2PRecurrenceTransaction;
        break;
    }
    if (managerFunction)
      return managerFunction.bind(transactionManager);
    return;  
  };

   /**
   * This method is used to cancel a transaction
   * data - {string} transactionId of the transaction
   * deleteSuccess  {callBack Function} - This method is the success callback on cancelling a transfer
   * deleteError {callBack Function} - This method is the error callback on cancelling a transfer
   */
  Transfer_PresentationController.prototype.deleteTransaction = function(data) {
    var transactionObj = applicationManager.getTransactionManager().getTransactionObject();
    var transactionType = transactionObj.transactionType;
    var criteria = {
      "transactionId": data,
      "transactionType" : transactionType
    };
    var transactionObj = applicationManager.getTransactionManager();
    var deleteTransactionBasedOnTransactionMode = scope_TransfersPresentationController.getDeleteFunctionReference();
    if (deleteTransactionBasedOnTransactionMode)
      deleteTransactionBasedOnTransactionMode(criteria, scope_TransfersPresentationController.deleteSuccess, scope_TransfersPresentationController.deleteError);
  };

  Transfer_PresentationController.prototype.getDeleteFunctionReference = function() {
    var managerFunction;
    var transactionManager = applicationManager.getTransactionManager();
    switch(scope_TransfersPresentationController.transactionMode) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
        managerFunction = transactionManager.cancelTransferToOwnAccounts;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :  
        managerFunction = transactionManager.cancelIntraBankAccFundTransfer;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
        managerFunction = transactionManager.cancelInterBankAccFundTransfer;
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
        managerFunction = transactionManager.cancelInternationalAccFundTransfer;
        break;
      case "PayAPerson":
        managerFunction = transactionManager.deleteP2PTransaction;
        break;
    }
    if (managerFunction)
      return managerFunction.bind(transactionManager);
    return;  
  };

  /**
   * This method is the success callback on cancelling a transaction
   * res - {object} response
   */
  Transfer_PresentationController.prototype.deleteSuccess = function(res) {
    //var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
    //transModPresentationController.getScheduledTransactionsEurope();
    var navMan = applicationManager.getNavigationManager();
    var data = {};
    data.type = "success";
    data.typeOfTransaction = "delete";
    data.res = res;
    navMan.setCustomInfo("frmEuropeTransferActivities", data);
  };

    /**
   * This method is the error callback on cancelling a transaction
   * err - {object} error response
   */
  Transfer_PresentationController.prototype.deleteError = function(err) {
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
      var navMan = applicationManager.getNavigationManager();
     // var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
      //transModPresentationController.getScheduledTransactionsEurope();
      var data = {};
      data.type = "error";
      data.res = err["errorMessage"];
      navMan.setCustomInfo("frmEuropeTransferActivities", data);
    }
  };

  /**
   * This method is used to set the transaction to be repeated into the transaction object
   * transactionData - {object} data of transaction to be repeated.
   */
  Transfer_PresentationController.prototype.repeatTransfer = function (transactionData) {
    var formatUtil = applicationManager.getFormatUtilManager();
    var navMan = applicationManager.getNavigationManager();
    var transactionObj = applicationManager.getTransactionManager();
    var currencyArray = scope_TransfersPresentationController.getCurrencyArray();
    transactionObj.clearTransferObject();
    if (transactionData.amount !== undefined && transactionData.amount !== null) {
      var amount = formatUtil.deFormatAmount(transactionData.amount, currencyArray);
      if (Number(amount) < 0)
        amount = amount.substring(1);
      transactionObj.setTransactionAttribute("amount", amount);
    }
    if (transactionData.frequencyType !== undefined && transactionData.frequencyType !== null) {
      transactionObj.setTransactionAttribute("frequencyType", transactionData.frequencyType);
    }
    if (transactionData.isScheduled !== undefined && transactionData.isScheduled !== null) {
      if (transactionData.isScheduled === "true")
        transactionObj.setTransactionAttribute("isScheduled", "1");
      else
        transactionObj.setTransactionAttribute("isScheduled", "0");
    }
    if (transactionData.fromAccountNumber !== undefined && transactionData.fromAccountNumber !== null) {
      var accMan = applicationManager.getAccountManager();
      transactionObj.setTransactionAttribute("fromAccountNumber", transactionData.fromAccountNumber);
      transactionObj.setTransactionAttribute("fromAccountCurrency", accMan.getInternalAccountByID(transactionData.fromAccountNumber).currencyCode);
    }
    if (transactionData.toAccountType !== undefined && transactionData.toAccountType !== null) {
      transactionObj.setTransactionAttribute("toAccountType", transactionData.toAccountType);
    }
    if (transactionData.toAccountNumber !== undefined && transactionData.toAccountNumber !== null) {
      transactionObj.setTransactionAttribute("toAccountNumber", transactionData.toAccountNumber);
    }
        if (transactionData.ExternalAccountNumber !== "" && transactionData.ExternalAccountNumber !== undefined && transactionData.ExternalAccountNumber !== null) {
      transactionObj.setTransactionAttribute("toAccountNumber", transactionData.ExternalAccountNumber);
    }
    if (transactionData.toAccountName !== undefined && transactionData.toAccountName !== null) {
      transactionObj.setTransactionAttribute("toAccountName", transactionData.toAccountName);
            transactionObj.setTransactionAttribute("beneficiaryName", transactionData.toAccountName);
      if (transactionData.toAccountNumber)
        transactionObj.setTransactionAttribute("toProcessedName", applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.toAccountNumber, 4));
      else if (transactionData.ExternalAccountNumber)
        transactionObj.setTransactionAttribute("toProcessedName", applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.ExternalAccountNumber, 4));
    }
    if (transactionData.intermediaryBicCode !== undefined && transactionData.intermediaryBicCode !== null) {
      transactionObj.setTransactionAttribute("intermediarybic", transactionData.intermediaryBicCode);
    }
    if (transactionData.endToEndReference !== undefined && transactionData.endToEndReference !== null) {
      transactionObj.setTransactionAttribute("e2ereference", transactionData.endToEndReference);
    }
    if (transactionData.frequencyStartDate !== undefined && transactionData.frequencyStartDate !== null) {
      var startdate = formatUtil.getDateObjectfromString(transactionData.frequencyStartDate, "YYYY-MM-DD");
      var startDate = formatUtil.getFormatedDateString(startdate, formatUtil.getApplicationDateFormat());
      transactionObj.setTransactionAttribute("frequencyStartDate", startDate);
    }
    if (transactionData.numberOfRecurrences !== undefined && transactionData.numberOfRecurrences !== null && transactionData.numberOfRecurrences !== "0") {
      transactionObj.setTransactionAttribute("numberOfRecurrences", transactionData.numberOfRecurrences);
      transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"));
    }
    if (transactionData.frequencyEndDate !== undefined && transactionData.frequencyEndDate !== null) {
      var enddate = formatUtil.getDateObjectfromString(transactionData.frequencyEndDate, "YYYY-MM-DD");
      var endDate = formatUtil.getFormatedDateString(enddate, formatUtil.getApplicationDateFormat());
      transactionObj.setTransactionAttribute("frequencyEndDate", endDate);
      transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange"));
    }
    if (transactionData.scheduledDate !== undefined && transactionData.scheduledDate !== null) {
      transactionObj.setTransactionAttribute("scheduledDate", transactionData.scheduledDate);
    }
    if (transactionData.fromAccountName !== undefined && transactionData.fromAccountName !== null) {
      transactionObj.setTransactionAttribute("fromAccountName", transactionData.fromAccountName);
    }
    if (transactionData.transactionType !== undefined && transactionData.transactionType !== null) {
      transactionObj.setTransactionAttribute("transactionType", transactionData.transactionType);
    }
    if (transactionData.fromAccountType !== undefined && transactionData.fromAccountType !== null) {
      transactionObj.setTransactionAttribute("fromAccountType", transactionData.fromAccountType);
    }
    if (transactionData.serviceName !== undefined && transactionData.serviceName !== null) {
      transactionObj.setTransactionAttribute("serviceName", transactionData.serviceName);
    }
    if (transactionData.payPersonName !== undefined && transactionData.payPersonName !== null) {
      transactionObj.setTransactionAttribute("payPersonName", transactionData.payPersonName);
      if (transactionData.nickName !== undefined && transactionData.nickName !== null) {
        transactionObj.setTransactionAttribute("toProcessedName", transactionData.nickName);
      }
      else
        transactionObj.setTransactionAttribute("toProcessedName", transactionData.payPersonName);
    }
    if (transactionData.payPersonPhone !== undefined && transactionData.payPersonPhone !== null) {
      transactionObj.setTransactionAttribute("p2pContact", transactionData.payPersonPhone);
    }
    if (transactionData.personId !== undefined && transactionData.personId !== null) {
      transactionObj.setTransactionAttribute("personId", transactionData.personId);
    }
//     if (transactionData.fromAccountCurrency !== undefined && transactionData.fromAccountCurrency !== null) {
//       transactionObj.setTransactionAttribute("fromAccountCurrency", transactionData.fromAccountCurrency);
//     }
    if (transactionData.toAccountCurrency !== undefined && transactionData.toAccountCurrency !== null) {
      transactionObj.setTransactionAttribute("toAccountCurrency", transactionData.toAccountCurrency);
    }
    var name = "";
    //if (transactionData.fromNickName === null || transactionData.fromNickName === undefined) {
      name = transactionData.fromAccountName||transactionData.fromNickName;
    //}
    //else {
      //name = transactionData.fromNickName;
    //}
    if (transactionData.description !== undefined && transactionData.description !== null) {
      transactionObj.setTransactionAttribute("reference", transactionData.transactionsNotes);
      transactionObj.setTransactionAttribute("transactionsNotes", transactionData.transactionsNotes);
    }
    else {
      transactionObj.setTransactionAttribute("reference", "");
      transactionObj.setTransactionAttribute("transactionsNotes", "");
    }
    if (transactionData.paymentType !== undefined && transactionData.paymentType !== null) {
      transactionObj.setTransactionAttribute("paymentType", transactionData.paymentType);
      if (transactionData.paymentType === "SEPA")
        transactionObj.setTransactionAttribute("paymentMedium", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.DomesticPayment"));
      else if (transactionData.paymentType === "INSTPAY")
      transactionObj.setTransactionAttribute("paymentMedium",  applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.InstantPayment"));  
    }
    else {
      if (scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")) {
        transactionObj.setTransactionAttribute("paymentType", "SEPA");
        transactionObj.setTransactionAttribute("paymentMedium", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.DomesticPayment"));

      }
    }
    if(transactionData.chargeBearer !== null && transactionData.chargeBearer !== undefined) {
      transactionData.paidby = transactionData.chargeBearer;
      transactionObj.setTransactionAttribute("paidBy", transactionData.paidby);
    }
    if ((transactionData.paidby !== undefined && transactionData.paidby !== null) && (transactionData.chargeBearer === null || transactionData.chargeBearer === undefined)) {
      var chargeBearerValue = scope_TransfersPresentationController.getChargeBearerValue(transactionData.paidby);
      transactionObj.setTransactionAttribute("paidBy", chargeBearerValue);
    }
    if (transactionData.bankName !== undefined && transactionData.bankName !== null) {
      transactionObj.setTransactionAttribute("bankName", transactionData.bankName);
    }
    // if (transactionData.feeAmount !== undefined && transactionData.feeAmount !== null) {
    //   transactionObj.setTransactionAttribute("feeAmount", transactionData.feeAmount);
    // }
    if (transactionData.feeCurrency !== undefined && transactionData.feeCurrency !== null) {
      transactionObj.setTransactionAttribute("feeCurrency", transactionData.feeCurrency);
    }
    if (transactionData.transactionCurrency !== undefined && transactionData.transactionCurrency !== null) {
      transactionObj.setTransactionAttribute("transactionCurrency", transactionData.transactionCurrency);
    }
    transactionObj.setTransactionAttribute("fromProcessedName", applicationManager.getPresentationUtility().formatText(name, 10, transactionData.fromAccountNumber, 4));
    transactionObj.setTransactionAttribute("disableToAccount", true);
    if(scope_configManager.TransferFlowType === "UTF") {
      if(transactionData.serviceName === "INTRA_BANK_FUND_TRANSFER_CREATE") {
        navMan.setCustomInfo("frmSameBank", {"transferType":"Within Same Bank"});
        scope_TransfersPresentationController.commonFunctionForNavigation("UnifiedTransferFlowNew/frmSameBankNew");
      }
      else if(transactionData.serviceName === "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") {
        //navMan.setCustomInfo("frmDomesticTransferNew", {"transferType":"Domestic Transfer"});
        scope_TransfersPresentationController.commonFunctionForNavigation("UnifiedTransferFlowNew/frmDomesticTransferNew");
      }
      else if(transactionData.serviceName === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") {
        //navMan.setCustomInfo("frmInternationalTransferNew", {"transferType":"International Transfer"});
        scope_TransfersPresentationController.commonFunctionForNavigation("UnifiedTransferFlowNew/frmInternationalTransferNew");
      }
      else if(transactionData.serviceName === "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE") {
        navMan.setCustomInfo("frmSameBank", {"transferType":"Within Same Bank"});
        scope_TransfersPresentationController.commonFunctionForNavigation("UnifiedTransferFlowNew/frmSameBankNew");
      }
      else if(transactionData.serviceName === "P2P_CREATE") {
        navMan.setCustomInfo("frmP2PTransferNew", {"transferType":"Pay a Person"});
        scope_TransfersPresentationController.commonFunctionForNavigation("UnifiedTransferFlowNew/frmP2PTransferNew");
      }
      else {
        navMan.setCustomInfo("frmSameBank", {"transferType":"Within Same Bank"});
        scope_TransfersPresentationController.commonFunctionForNavigation("UnifiedTransferFlowNew/frmSameBankNew");
      }
    }
    else if(scope_configManager.TransferFlowType === "CTF") {
      scope_TransfersPresentationController.commonFunctionForNavigation({"appName":"TransfersMA", "friendlyName":"TransferEuropeUIModule/frmEuropeVerifyTransferDetails"});
    }
    else {
      scope_TransfersPresentationController.commonFunctionForNavigation({"appName":"TransfersMA", "friendlyName":"TransferEuropeUIModule/frmEuropeVerifyTransferDetails"});
    }
  };

  /**
   * This method is used to set the transaction to be edited into the transaction object
   * transactionData - {object} data of transaction to be edited.
   */
  Transfer_PresentationController.prototype.setTransactionObject = function(transactionData) {
    var formatUtil = applicationManager.getFormatUtilManager();
    var transactionObj = applicationManager.getTransactionManager();
    var currencyArray = scope_TransfersPresentationController.getCurrencyArray();
	  transactionObj.clearTransferObject();
    if (transactionData.transactionId !== undefined && transactionData.transactionId !== null) {
      transactionObj.setTransactionprimaryAttribute({"transactionId":transactionData.transactionId});
    }
    if (transactionData.amount !== undefined && transactionData.amount !== null) {
      var amount = formatUtil.deFormatAmount(transactionData.amount, currencyArray);
      if(Number(amount)<0)
        amount = amount.substring(1);
      transactionObj.setTransactionAttribute("amount",amount);
    }
    if (transactionData.frequencyType !== undefined && transactionData.frequencyType !== null) {
      transactionObj.setTransactionAttribute("frequencyType",transactionData.frequencyType);
    }
    if (transactionData.isScheduled !== undefined && transactionData.isScheduled !== null) {
      if (transactionData.isScheduled === "true")
        transactionObj.setTransactionAttribute("isScheduled","1");
      else
        transactionObj.setTransactionAttribute("isScheduled","0");
    }
    if (transactionData.fromAccountNumber !== undefined && transactionData.fromAccountNumber !== null) {
      var accMan = applicationManager.getAccountManager();
      transactionObj.setTransactionAttribute("fromAccountNumber",transactionData.fromAccountNumber);
      transactionObj.setTransactionAttribute("fromAccountCurrency", accMan.getInternalAccountByID(transactionData.fromAccountNumber).currencyCode);
    }
    if (transactionData.ExternalAccountNumber !== undefined && transactionData.ExternalAccountNumber !== null) {
      transactionObj.setTransactionAttribute("toAccountNumber",transactionData.ExternalAccountNumber);
    }
    if (transactionData.toAccountNumber !== undefined && transactionData.toAccountNumber !== null) {
      transactionObj.setTransactionAttribute("toAccountNumber",transactionData.toAccountNumber);
    }
    if (transactionData.toAccountName !== undefined && transactionData.toAccountName !== null) {
      transactionObj.setTransactionAttribute("toAccountName",transactionData.toAccountName);
            transactionObj.setTransactionAttribute("beneficiaryName", transactionData.toAccountName);
       if(transactionData.toAccountNumber)
        transactionObj.setTransactionAttribute("toProcessedName",applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.toAccountNumber, 4));
      else if(transactionData.ExternalAccountNumber)
        transactionObj.setTransactionAttribute("toProcessedName",applicationManager.getPresentationUtility().formatText(transactionData.toAccountName, 10, transactionData.ExternalAccountNumber, 4));
    }
    if (transactionData.payPersonName !== undefined && transactionData.payPersonName !== null) {
      transactionObj.setTransactionAttribute("payPersonName",transactionData.payPersonName);
      if (transactionData.nickName !== undefined && transactionData.nickName !== null) {
        transactionObj.setTransactionAttribute("toProcessedName",transactionData.nickName);
      }
      else
        transactionObj.setTransactionAttribute("toProcessedName",transactionData.payPersonName);
    }
    if(transactionData.payPersonPhone!==undefined && transactionData.payPersonPhone!==null)
    {
      transactionObj.setTransactionAttribute("p2pContact",transactionData.payPersonPhone);
    }
    if(transactionData.personId!==undefined && transactionData.personId!==null)
    {
      transactionObj.setTransactionAttribute("personId",transactionData.personId);
    }
    if (transactionData.frequencyStartDate !== undefined && transactionData.frequencyStartDate !== null) {
      transactionObj.setTransactionAttribute("frequencyStartDate",formatUtil.getFormatedDateString(formatUtil.getDateObjectFromCalendarString(transactionData.frequencyStartDate,'YYYY-MM-DD'), 'm/d/Y'));
    }
    if (transactionData.numberOfRecurrences !== undefined && transactionData.numberOfRecurrences !== null && transactionData.numberOfRecurrences !== "0") {
      transactionObj.setTransactionAttribute("numberOfRecurrences",transactionData.numberOfRecurrences);
      transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"));
    }
    if (transactionData.frequencyEndDate !== undefined && transactionData.frequencyEndDate !== null) {
      transactionObj.setTransactionAttribute("frequencyEndDate",formatUtil.getFormatedDateString(formatUtil.getDateObjectFromCalendarString(transactionData.frequencyEndDate,'YYYY-MM-DD'), 'm/d/Y'));
    }
    if (transactionData.frequencyType !== "Once") {
    transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange"));
    }	
    if (transactionData.scheduledDate !== undefined && transactionData.scheduledDate !== null) {
      transactionObj.setTransactionAttribute("scheduledDate",formatUtil.getFormatedDateString(formatUtil.getDateObjectFromCalendarString(transactionData.scheduledDate,'YYYY-MM-DD'), 'm/d/Y'));
    }
    if (transactionData.fromAccountName !== undefined && transactionData.fromAccountName !== null) {
      transactionObj.setTransactionAttribute("fromAccountName",transactionData.fromAccountName);
    }
    if (transactionData.transactionType !== undefined && transactionData.transactionType !== null) {
      transactionObj.setTransactionAttribute("transactionType",transactionData.transactionType);
    }
    if (transactionData.fromAccountType !== undefined && transactionData.fromAccountType !== null) {
      transactionObj.setTransactionAttribute("fromAccountType",transactionData.fromAccountType);
    }
    if (transactionData.toAccountType !== undefined && transactionData.toAccountType !== null) {
      transactionObj.setTransactionAttribute("toAccountType",transactionData.toAccountType);
    }
    if (transactionData.transactionsNotes !== undefined && transactionData.transactionsNotes !== null) {
      transactionObj.setTransactionAttribute("reference",transactionData.transactionsNotes);
      transactionObj.setTransactionAttribute("transactionsNotes",transactionData.transactionsNotes);
    }
    else {
       transactionObj.setTransactionAttribute("reference","");
      transactionObj.setTransactionAttribute("transactionsNotes","");
    }
    if (transactionData.serviceName !== undefined && transactionData.serviceName !== null) {
      transactionObj.setTransactionAttribute("serviceName",transactionData.serviceName);
    }
//     if(transactionData.fromAccountCurrency!==undefined && transactionData.fromAccountCurrency!==null)
//     {
//       transactionObj.setTransactionAttribute("fromAccountCurrency",transactionData.fromAccountCurrency);
//     }
    if(transactionData.toAccountCurrency!==undefined && transactionData.toAccountCurrency!==null)
    {
      transactionObj.setTransactionAttribute("toAccountCurrency",transactionData.toAccountCurrency);
    }
	var name="";
	//if (transactionData.fromNickName === null || transactionData.fromNickName === undefined) {
	  name = transactionData.fromAccountName||transactionData.fromNickName;
    //}
	//else {
      //name =transactionData.fromNickName;
    //}
    if (transactionData.paymentType !== undefined && transactionData.paymentType !== null) {
      transactionObj.setTransactionAttribute("paymentType", transactionData.paymentType);
      if (transactionData.paymentType === "SEPA")
        transactionObj.setTransactionAttribute("paymentMedium", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.DomesticPayment"));
      else if (transactionData.paymentType === "INSTPAY")
      transactionObj.setTransactionAttribute("paymentMedium",  applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.InstantPayment"));  
    }
    else {
      if (scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")) {
        transactionObj.setTransactionAttribute("paymentType", "SEPA");
        transactionObj.setTransactionAttribute("paymentMedium", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.DomesticPayment"));

      }
    }
        
         var chargeBearerValue = scope_TransfersPresentationController.getChargeBearerValue(transactionData.paidby);
         transactionObj.setTransactionAttribute("paidBy", chargeBearerValue);    
      
    if (transactionData.bankName !== undefined && transactionData.bankName !== null) {
      transactionObj.setTransactionAttribute("bankName", transactionData.bankName);
    }
    // if (transactionData.feeAmount !== undefined && transactionData.feeAmount !== null) {
    //   transactionObj.setTransactionAttribute("feeAmount", transactionData.feeAmount);
    // }
    if (transactionData.feeCurrency !== undefined && transactionData.feeCurrency !== null) {
      transactionObj.setTransactionAttribute("feeCurrency", transactionData.feeCurrency);
    }
    if (transactionData.transactionCurrency !== undefined && transactionData.transactionCurrency !== null) {
      transactionObj.setTransactionAttribute("transactionCurrency", transactionData.transactionCurrency);
    }
    else {
      transactionObj.setTransactionAttribute("transactionCurrency", transactionData.payeeCurrency);
    }
    transactionObj.setTransactionAttribute("fromProcessedName",applicationManager.getPresentationUtility().formatText(name, 10, transactionData.fromAccountNumber, 4));
    transactionObj.setTransactionAttribute("disableToAccount",true);
    scope_TransfersPresentationController.commonFunctionForNavigation({"appName":"TransfersMA","friendlyName":"TransferEuropeUIModule/frmEuropeVerifyTransferDetails"});
  };

  Transfer_PresentationController.prototype.getCurrencyArray = function() {
    var configManager = applicationManager.getConfigurationManager();
    var currencyArray = [];
    var currencyObject = configManager.currencyCode;
    for (var key in currencyObject) {
        currencyArray.push(currencyObject[key]);
    }
    return currencyArray;
  };
  Transfer_PresentationController.prototype.enterManageRecipientsFlow = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var recipientManager = applicationManager.getRecipientsManager();
    recipientManager.fetchAllExternalAccounts(scope_TransfersPresentationController.fetchAllExternalAccountsPresentationSuccessCallback, scope_TransfersPresentationController.fetchAllExternalAccountsPresentationErrorCallback);
  };

  Transfer_PresentationController.prototype.fetchAllExternalAccountsPresentationSuccessCallback = function(res) {
    var navMan = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    var processedRecipientArray = [];
    for (var i = 0; i < res.length; i++) {
      var processedRecipient = null;
      var isInternationalBen = (res[i].isInternationalAccount === "true" && res[i].isSameBankAccount === "false") ? true : false;
      var isInternalBen = (res[i].isInternationalAccount === "false" && res[i].isSameBankAccount === "true") ? true : false;
      var isDomesticBen = (res[i].isInternationalAccount === "false" && res[i].isSameBankAccount === "false") ? true : false;
      if (isInternalBen && configManager.checkUserPermission("INTRA_BANK_FUND_TRANSFER_VIEW_RECEPIENT")){
        processedRecipient = scope_TransfersPresentationController.processRecipient(res[i]);
      }
      else if (isInternationalBen && configManager.checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT")){
        processedRecipient = scope_TransfersPresentationController.processRecipient(res[i]);
      }
      else if (isDomesticBen && configManager.checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT")) {
        processedRecipient = scope_TransfersPresentationController.processRecipient(res[i]);
      }
      if (processedRecipient !== null && processedRecipient !== undefined)
        processedRecipientArray.push(processedRecipient);  
    }
    navMan.setCustomInfo("frmEuropeManageBeneficiaries", processedRecipientArray);
    scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeManageBeneficiaries");
  };

  Transfer_PresentationController.prototype.processRecipient = function (recipient) {
    //var processedName = "";
   // if (recipient.nickName === null || recipient.nickName === undefined || recipient.nickName === "") {
    var processedName = recipient.beneficiaryName;
   // } else {
   //   processedName = recipient.nickName;
    //}
    recipient.processedName = processedName;
    var verification = (recipient.isVerified === "true") ? applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.Verified") : "";
    recipient.verification = verification;
    var paymentMethod = "";
    if (recipient.isInternationalAccount === "false" && recipient.isSameBankAccount === "false") {
      paymentMethod = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.Domestic");
    }
    else if (recipient.isInternationalAccount === "true" && recipient.isSameBankAccount === "false") {
      paymentMethod = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.International");
    }
    else if (recipient.isInternationalAccount === "false" && recipient.isSameBankAccount === "true") {
      paymentMethod = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transferEurope.WithinBank");
    }
    else {
      paymentMethod = "";
    }
    recipient.paymentMethod = paymentMethod;
    var address = "";
    if (recipient.addressLine1) {
      address = recipient.addressLine1;
    }
    if (recipient.addressLine2) {
      if (address !== "")
        address = address + ", " + recipient.addressLine2;
      else
        address = recipient.addressLine2;
    }
    if (recipient.city) {
      if (address !== "")
        address = address + ", " + recipient.city;
      else
        address = recipient.city;
    }
    if (recipient.country) {
      if (address !== "")
        address = address + ", " + recipient.country;
      else
        address = recipient.country;
    }
    if (recipient.zipcode) {
      if (address !== "")
        address = address + ", " + recipient.zipcode;
      else
        address = recipient.zipcode;
    }
    recipient.address = address;
    return recipient;
  };

  Transfer_PresentationController.prototype.fetchAllExternalAccountsPresentationErrorCallback = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (errorRes["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
   Transfer_PresentationController.prototype.isEuropeanIBAN = function(IBAN) {
   var europenaIban =["AT","BE","BG","CY","CZ","DK","EE","FI","FE","DE",
                      "GR","HU","IE","IT","LV","LU","LT","NL","MT","PL",
                      "PT","RO","SK","SI","ES","SE","GB","IS","LI","NO","CH"];
     if(europenaIban.indexOf(IBAN.substr(0,2))>0)
       return true;
     else
       return false;
     
  };
  Transfer_PresentationController.prototype.isValidbenificiaryName = function(benName,formName){
    var validationUtility = applicationManager.getValidationUtilManager();
    if (validationUtility.isValidbenificiaryName(benName)) {
      return true;
    }else {
      var controller = applicationManager.getPresentationUtility().getController(formName, true);
      controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.validBenName"));
      return false;
    }
  };
  Transfer_PresentationController.prototype.isvalidateAccountorIBAN = function(enteredData,formName){
    var validationUtility = applicationManager.getValidationUtilManager();
    var alphabetRegex= /^[A-Za-z]+$/;
    var numericRegex=  /^[0-9]+$/
    if (alphabetRegex.test(enteredData.substr(0,2))) {
      scope_TransfersPresentationController.isInternationIBANEntered=true;
       if (validationUtility.isValidIBAN(enteredData)){
         return true;
       }
       else{
         var controller = applicationManager.getPresentationUtility().getController(formName, true);
         controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transferEurope.invalidIBAN"));
         return false;
       }
    }else {
      scope_TransfersPresentationController.isInternationIBANEntered=false;
      if(numericRegex.test(enteredData)){
        return true;
      }
      else{
      var controller = applicationManager.getPresentationUtility().getController(formName, true);
      controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transferEurope.invalidAccountNo"));
      return false;
      }
    }
  };
  
  Transfer_PresentationController.prototype.getFrequencyTypei18n = function(freqType) {
    var transactionManager = applicationManager.getTransactionManager();
    var frequencyTypes = transactionManager.getAvailableFrequencyType();
    var freqi18n;
    switch(freqType) {
      case frequencyTypes.ONCE:
        freqi18n = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.Once");
        break;
      case frequencyTypes.WEEKLY:
        freqi18n = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Weekly");
        break;
      case frequencyTypes.DAILY:
        freqi18n = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Daily");
        break;
      case frequencyTypes.MONTHLY:
        freqi18n = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Monthly");
        break;
      case frequencyTypes.QUARTERLY:
        freqi18n = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Quaterly");
        break;
      case frequencyTypes.YEARLY:
        freqi18n = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Annually");
        break;
      case frequencyTypes.HALFYEARLY:
        freqi18n = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.EverySixMonths");
        break;
      case frequencyTypes.EVERYTWOWEEKS:
        freqi18n = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.BiWeekly");
        break;              
    }
    return freqi18n;
  };

  Transfer_PresentationController.prototype.enableShare = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transactionManager = applicationManager.getTransactionManager();
    var transactionObject = transactionManager.getTransactionObject();
    var transactionMode = scope_TransfersPresentationController.getModeOfTransactionForShare("generate");
    var frequencyType = transactionObject.frequencyType;
    var transactionId = transactionObject.shareReferenceId;
    var params = {
      "transactionId" : transactionId,
      "transactionType" : frequencyType
    };
    transactionManager.generateTransactionPDF(params, scope_TransfersPresentationController.generateTransactionPDFSuccess.bind(this, params.transactionId), scope_TransfersPresentationController.generateTransactionPDFError);      
  };

  Transfer_PresentationController.prototype.generateTransactionPDFSuccess = function(tranId, res) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var controller = applicationManager.getPresentationUtility().getController('frmEuropeConfirmation', true);
    controller.showSharePopup(res.pdf, tranId);
  };
  
  // Transfer_PresentationController.prototype.getEncodedPDFStringSuccess = function(tranId, res) {
  //     applicationManager.getPresentationUtility().dismissLoadingScreen();
  //     var controller = applicationManager.getPresentationUtility().getController('frmEuropeConfirmation', true);
  //     controller.showSharePopup(res, tranId);
  // };

  Transfer_PresentationController.prototype.generateTransactionPDFError = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else {
      var controller = applicationManager.getPresentationUtility().getController('frmEuropeConfirmation', true);
      controller.bindGenericError("Unable to generate Report for sharing");
    }  
  };

  Transfer_PresentationController.prototype.getModeOfTransactionForShare = function(serviceName) {
    var transactionModeForShare;
    switch(scope_TransfersPresentationController.transactionMode) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
        transactionModeForShare = (serviceName === "generate") ? "ownaccounts" : "ownaccounttransfers";
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :
        transactionModeForShare = (serviceName === "generate") ? "intrabank" : "intrabanktransfers";
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
        transactionModeForShare = (serviceName === "generate") ? "interbank" : "interbankfundtransfers";
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
        transactionModeForShare = (serviceName === "generate") ? "international" : "internationalfundtransfers";
        break;  
    }
    return transactionModeForShare;
};
  
  Transfer_PresentationController.prototype.formatAmountAndAppendCurrencyEurope = function(amount, currencySymbolCode) {
    var formatUtilManager = applicationManager.getFormatUtilManager();
    if (kony.sdk.isNullOrUndefined(amount)) {
      amount = "0.00";
    }
    var formattedAmount = scope_TransfersPresentationController.formatAmountEurope(amount);
    var  currencySymbol= formatUtilManager.getCurrencySymbol(currencySymbolCode);
    return formattedAmount[0] === '-' ? ('-' + currencySymbol + formattedAmount.split('-')[1]) : currencySymbol + formattedAmount;
  };
  
  Transfer_PresentationController.prototype.formatAmountEurope = function(amount) {
    var num, flag = false;
    if (amount === null || amount === undefined || isNaN(amount)) {
      return;
    }
    amount = Number(amount).toFixed(2);
    var configurationManager = applicationManager.getConfigurationManager();
    var group = ".";
    var decimal = ",";
    if (amount.indexOf(".") != -1 || amount.indexOf(",") != -1) {
      if (amount.indexOf(".") != -1) {
        amount = amount.replace(".", decimal);
      }
      else if (amount.indexOf(",") != -1) {
        amount = amount.replace(",", decimal);
      }
      num = amount.split(decimal)[0];
      var dec = amount.split(decimal)[1];
      if (num.indexOf("-") != -1) {
        num = num.split("-")[1];
        flag = true;
      }
      if (num.length > 3) {
        for (var i = num.length - 1; i >= 0;) {
          if (i >= 3) {
            num = num.substring(0, i - 2) + group + num.substring(i - 2, num.length);
          }
          i = i - 3;
        }
      }
      if (flag === true) {
        return "-" + num + decimal + dec;
      }
      return num + decimal + dec;
    }
    else {
      return amount;
    }
  };
  
  Transfer_PresentationController.prototype.removeLoanAccounts = function(accounts) {
    return accounts.filter(function(account) {
      return account.accountType !== "Loan";
    });
  };
  
  Transfer_PresentationController.prototype.setAmountBasedOnTransactionType = function() {
    var transactionManager = applicationManager.getTransactionManager();
    if (scope_TransfersPresentationController.previousAccountType && (scope_TransfersPresentationController.previousAccountType === "Loan" && scope_TransfersPresentationController.currentAccountType !== "Loan")) {
      transactionManager.setTransactionAttribute("amount", null);
    }
    else if (scope_TransfersPresentationController.previousAccountType && (scope_TransfersPresentationController.previousAccountType !== "Loan" && scope_TransfersPresentationController.currentAccountType === "Loan")) {
      transactionManager.setTransactionAttribute("amount", null);
      transactionManager.setTransactionAttribute("isScheduled", "0");
    }
    else if (scope_TransfersPresentationController.previousAccountType && (scope_TransfersPresentationController.previousAccountType === "Loan" && scope_TransfersPresentationController.currentAccountType === "Loan")) {
      transactionManager.setTransactionAttribute("amount", null);
      transactionManager.setTransactionAttribute("isScheduled", "0");
    }
  };
  
          // below method gets the base64 string of cheques image
  Transfer_PresentationController.prototype.viewImage = function(param) {
	applicationManager.getAccountManager().getBaseImage(param, this.successImageDetails.bind(this, param), this.failImageDetails.bind(this, param));
  };
  
  Transfer_PresentationController.prototype.successImageDetails = function( param, response) {
    var navManager = applicationManager.getNavigationManager();
	var controller = applicationManager.getPresentationUtility().getController('frmEuropeTransactionDetails', true);
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
  Transfer_PresentationController.prototype.failImageDetails = function( param, response) {
    var navManager = applicationManager.getNavigationManager();
	var controller = applicationManager.getPresentationUtility().getController('frmEuropeTransactionDetails', true);
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
  Transfer_PresentationController.prototype.downloadChequeFile = function(params,formname) {
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
  
  Transfer_PresentationController.prototype.downloadTransactionFile = function(params,formname) {
        var navMan = applicationManager.getNavigationManager();
        var requestParam = navMan.getCustomInfo(formname);
        var userManager = applicationManager.getUserPreferencesManager();
        var requestParamAccount = navMan.getCustomInfo("frmAccountDetails");
    
        requestParam.transactionId = params.transactionId;
        requestParam.generatedBy = userManager.getUserName();
        requestParam.fileType = params.format;
         requestParam.accountNumber = params.accountNumber;
        
        var am = applicationManager.getAccountManager();
        var pdfurl = am.getDownloadTransctionURL(requestParam);
        kony.application.openURL(pdfurl);
    };
  
  Transfer_PresentationController.prototype.downloadTransactions = function(){
    var navMan=applicationManager.getNavigationManager();
    var searchData =  navMan.getCustomInfo("frmAdvanceSearch");
    var userManager = applicationManager.getUserPreferencesManager();
    searchData.generatedBy = userManager.getUserName();
    searchData.title="Transactions";
    var am = applicationManager.getAccountManager();
    var pdfurl = am.getDownloadTransctionURL(searchData);
    kony.application.openURL(pdfurl);
  };
  
  
  Transfer_PresentationController.prototype.getChargesBreakdown = function(){
    var segData = [];
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();

    if (transObj.chargesList) {
      for (var i = 0; i < transObj.chargesList.length; i++) {
        if (transObj.chargesList[i].chargeAccountCurrencyAmount){
        transactionFee = scope_TransfersPresentationController.formatAmountAndAppendCurrencyEurope(transObj.chargesList[i].chargeAccountCurrencyAmount, transObj.fromAccountCurrency);
          segData.push({
            "property": transObj.chargesList[i].chargeName,
            "value": transactionFee
          });
        }
      }
    }

    return segData;
  };
  
  Transfer_PresentationController.prototype.downloadTransactionReport = function(requestParam) {
     var userManager = applicationManager.getUserPreferencesManager();
     requestParam.generatedBy = userManager.getUserName();
      applicationManager.getTransactionManager().DownloadTransactionPDF(requestParam, this.downloadTransactionReportSuccess.bind(this), this.downloadTransactionReportError.bind(this));
        //var pdfurl = applicationManager.getTransactionManager().DownloadTransactionPDF(requestParam);
       // kony.application.openURL(pdfurl);
    };

  Transfer_PresentationController.prototype.downloadTransactionReportSuccess = function(response) {
    var mfURL = KNYMobileFabric.mainRef.config.services_meta.RBObjects.url;
    var pdfurl = mfURL + "/objects/DownloadTransactionPDF?fileId=" + response.fileId;
    kony.application.openURL(pdfurl);
  };

  Transfer_PresentationController.prototype.downloadTransactionReportError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("error downloading report");
  };
   Transfer_PresentationController.prototype.selectBenBank = function () {
        var segData = [];
        var configManager = applicationManager.getConfigurationManager();
        if (configManager.checkUserPermission("INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT")) {
            segData.push({
                "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Beneficiary.NotSameBank"),
            }, {
                "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Beneficiary.SameBank"),
            });
        }
        else {
            segData.push({
                "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Beneficiary.NotSameBank"),
            });
        }
        return segData;
  };
  
    Transfer_PresentationController.prototype.filterSegmentDataBasedOnType = function(data, filter) {
    return data.filter(function(transaction) {
      if (filter === "TRANSFER" && transaction.transactionType === "InternalTransfer") {
        return true;
      }
      else if (filter === "PAYMENT" && transaction.transactionType !== "InternalTransfer") {
        return true;
      } else if (filter === "BOTH") {
        return true
      }
      else
        return false;
    });
  };

  Transfer_PresentationController.prototype.getToAccountDataEditFlow = function() {
    var transactionManager = applicationManager.getTransactionManager();
    var transactionObject = transactionManager.getTransactionObject();
    return {
      "toProcessedName" : transactionObject.toProcessedName,
      "toAccountName" : transactionObject.toAccountName
    }
  };  
  
  Transfer_PresentationController.prototype.deleteBeneficiary = function(beneficiaryData) {
    var recipientManager = applicationManager.getRecipientsManager();
    recipientManager.deleteABenificiary(beneficiaryData, scope_TransfersPresentationController.deleteBeneficiaryPresentationSuccess.bind(this, beneficiaryData), scope_TransfersPresentationController.deleteBeneficiaryPresentationError);
  };

  Transfer_PresentationController.prototype.deleteBeneficiaryPresentationSuccess = function(beneficiaryData, res) {
    var referenceId = res.Id;
    var navMan = applicationManager.getNavigationManager();
    var segData = scope_TransfersPresentationController.getAcknowledgementSegmentData("DELETE", referenceId);
    var beneficiaryName = (beneficiaryData.beneficiaryName) ? beneficiaryData.beneficiaryName : beneficiaryData.nickName;
    var title = beneficiaryName + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.HasSuccessfullyBeenRemoved");
    var ackdata = {
      "title" : title,
      "segData" : segData,
      "screenType" : "DELETE"
    };
    navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
    scope_TransfersPresentationController.commonFunctionForNavigation({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
  };

  Transfer_PresentationController.prototype.deleteBeneficiaryPresentationError = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    }
    else {
      var navMan = applicationManager.getNavigationManager();
      var title = errorResponse.errorMessage;
      var ackdata = {
        "title" : title
      };
      navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
      scope_TransfersPresentationController.commonFunctionForNavigation({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
    }
  };

  Transfer_PresentationController.prototype.getAcknowledgementSegmentData = function(screenType, referenceId) {
    var segData = [];
    if (screenType === "DELETE") {
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ReferenceID"),
        "value" : referenceId
      });
    }
    else 
    {
      var beneficiaryData=scope_TransfersPresentationController.getBenificiaryData();
      var paymentMethod = "";
      var benAddress = "";
      var bankAddress = "";
      var linkedWith = "";
      if (kony.sdk.isNullOrUndefined(beneficiaryData.nickName)) {
            beneficiaryData["nickName"] = "-";
        }
        if (kony.sdk.isNullOrUndefined(beneficiaryData.phoneNumber)) {
            beneficiaryData["phoneNumber"] = "-";
        }
        if (kony.sdk.isNullOrUndefined(beneficiaryData.emailAddress)) {
            beneficiaryData["emailAddress"] = "-";
        }
		if (kony.sdk.isNullOrUndefined(beneficiaryData.swiftCode)) {
            beneficiaryData["swiftCode"] = "-";
        }
       if (kony.sdk.isNullOrUndefined(beneficiaryData.bankName)) {
            beneficiaryData["bankName"] = "-";
        }
       if (beneficiaryData.accountNumber === null || beneficiaryData.accountNumber === undefined || beneficiaryData.accountNumber === "") {
                beneficiaryData["accountNumber"] = beneficiaryData.IBAN;
            }
        if (kony.sdk.isNullOrUndefined(beneficiaryData.paymentMethod)){
               if (beneficiaryData.isInternationalAccount === "false" && beneficiaryData.isSameBankAccount === "false") {
                paymentMethod = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.Domestic");
            } else if (beneficiaryData.isInternationalAccount === "true" && beneficiaryData.isSameBankAccount === "false") {
                paymentMethod = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.International");
            } else if (beneficiaryData.isInternationalAccount === "false" && beneficiaryData.isSameBankAccount === "true") {
                paymentMethod = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transferEurope.WithinBank");
            }
             else {
                paymentMethod = "-";
            }
        }
       if (beneficiaryData.addressLine1) {
           benAddress = beneficiaryData.addressLine1;
         }
       if (beneficiaryData.addressLine2) {
            if (benAddress !== "") benAddress = benAddress + ", " + beneficiaryData.addressLine2;
            else benAddress = beneficiaryData.addressLine2;
        }
        if (beneficiaryData.city) {
            if (benAddress !== "") benAddress = benAddress + ", " + beneficiaryData.city;
            else benAddress = beneficiaryData.city;
        }
        if (beneficiaryData.country) {
            if (benAddress !== "") benAddress = benAddress + ", " + beneficiaryData.country;
            else benAddress = beneficiaryData.country;
        }
        if (beneficiaryData.zipcode) {
            if (benAddress !== "") benAddress = benAddress + ", " + beneficiaryData.zipcode;
            else benAddress = beneficiaryData.zipcode;
        }
        if(benAddress !== null && benAddress !== undefined && benAddress !== ""){
		beneficiaryData.address = benAddress;
        } else {
        beneficiaryData.address = "-";
        }
         if (beneficiaryData.bankName){
                bankAddress = beneficiaryData.bankName;
            }
        if (beneficiaryData.countryName) {
                if(bankAddress != "-" && bankAddress !== "") bankAddress = bankAddress + ", " + beneficiaryData.countryName;
                else bankAddress = beneficiaryData.countryName;
            }
       if (bankAddress !== null && bankAddress !== undefined && bankAddress !== "") {
                beneficiaryData.bankName = bankAddress;
            }
        if (beneficiaryData.totalContractCustomerSelected) {
          linkedWith = beneficiaryData.totalContractCustomerSelected + " Customer ID(s)";
        }
	 segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ReferenceID"),
        "value" : referenceId
      },
	  {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.BenName.Title"),
        "value" : beneficiaryData.beneficiaryName
      },
	  {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.accNumber"),
        "value" : beneficiaryData.accountNumber
      },
	  {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.PaymentMethod"),
        "value" : paymentMethod
      },
	  {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accountdetails.swiftCode"),
        "value" : beneficiaryData.swiftCode
      },
	  {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.WireTransfer.BankAddress"),
        "value" : beneficiaryData.bankName
      },
	  {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.NickName"),
        "value" : beneficiaryData.nickName
      },
	  {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TansfersEurope.BeneficiaryAddress"),
        "value" : beneficiaryData.address
      },
	  {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.phoneNo"),
        "value" : beneficiaryData.phoneNumber
      },
	  {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.EmailAddress"),
        "value" : beneficiaryData.emailAddress
      },
      {
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.billPay.LinkedWith"),
        "value" : linkedWith
      }
      );
    }
    return segData;
  };
  	        Transfer_PresentationController.prototype.addBeneficiaryDetails = function(beneficiaryData) {
        //applicationManager.getPresentationUtility().dismissLoadingScreen();
       applicationManager.getRecipientsManager().createExternalAccount(beneficiaryData, this.createBeneficiarySuccess.bind(this, beneficiaryData), this.createBeneficiaryFailure.bind(this));
    };
     Transfer_PresentationController.prototype.createBeneficiarySuccess = function(beneficiaryData, response) {
       applicationManager.getPresentationUtility().dismissLoadingScreen();
	   var referenceId =  response.Id;
       var navMan=applicationManager.getNavigationManager();
	   var segData = scope_TransfersPresentationController.getAcknowledgementSegmentData("ADD", referenceId);
	   var beneficiaryName = beneficiaryData.beneficiaryName;
       var title = beneficiaryName + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.BenAdded");
      var ackdata = {
      "title" : title,
      "segData" : segData,
      "screenType" : "ADD"
    };
	   navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
        scope_TransfersPresentationController.isNavigated = true;
       navMan.navigateTo({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
        };

   Transfer_PresentationController.prototype.createBeneficiaryFailure = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else
       var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
       controller.bindGenericError(errorResponse.errorMessage);
    };
  
  Transfer_PresentationController.prototype.validateATransfer = function(segData) {

    var transactionManager = applicationManager.getTransactionManager();
    var transactionObj = transactionManager.getTransactionObject();

    var requestData = scope_TransfersPresentationController.filterTransactionObject();
    if (requestData.IBAN) {
      requestData.iban = requestData.IBAN;
      requestData.iban = requestData.iban.replace(/\s/g, "");
      delete requestData.IBAN; 
    }
    if (requestData.toAccountNumber) {
      requestData.toAccountNumber = requestData.toAccountNumber.replace(/\s/g, "");
      if (requestData.transactionType === "ExternalTransfer") {
        requestData.ExternalAccountNumber = requestData.toAccountNumber;
      }
      else {
      	requestData.ExternalAccountNumber = "";
      }  

    }
    requestData.validate = "true";
    requestData.uploadedattachments = "";
    if (!requestData.frequencyType){
      requestData.frequencyType = "Once";
    }
    if (!requestData.paidBy){
      requestData.paidBy = "";
    }
		if (scope_TransfersPresentationController.europeFlowType === "EXTERNAL" && (scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") || scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"))) {
          if (requestData.swiftCode === "" || requestData.swiftCode === null || requestData.swiftCode === undefined) {
            var swiftCode = scope_TransfersPresentationController.getSwiftCodeForTransfer(requestData.toAccountNumber);
            transactionManager.setTransactionAttribute("swiftCode", swiftCode);
            requestData.swiftCode = swiftCode;
          }
        }
	if(scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")){
      transactionManager.setTransactionAttribute("serviceName", 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE');
      requestData.serviceName = transactionObj.serviceName;
    }
    var createTransactionBasedOnTransactionMode = scope_TransfersPresentationController.getCreateFunctionReference();
    requestData = scope_TransfersPresentationController.filterRequestData(requestData);
    ['charges', 'totalAmount', 'creditValueDate','exchangeRate'].forEach(e => delete requestData[e]);
    if (createTransactionBasedOnTransactionMode)
      createTransactionBasedOnTransactionMode(requestData, this.presentationValidateATransferSuccess.bind(this, segData), this.presentationValidateATransferError.bind(this, segData));

  };

  Transfer_PresentationController.prototype.presentationValidateATransferSuccess = function(segData, resp) {
    scope_TransfersPresentationController.validateReferenceId =resp.referenceId;
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    var totalCharges = 0;
    var totalChargeCurrency = 0;
    // total debit field for all type of transfers 
    if(resp.totalAmount){
     segData.unshift({
          "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.TotalAmount"),
        //    "value": {"text":scope_TransfersPresentationController.formatAmountAndAppendCurrencyEurope(transObj.amount, transObj.fromAccountCurrency),
        //              "right":"20dp","skin":"sknlbl424242ssp40px"
        //   },
          ///////////osama
          "value": {"text":scope_TransfersPresentationController.formatAmountAndAppendCurrencyEurope(resp.totalAmount, transObj.fromAccountCurrency),
                    "right":"20dp","skin":"sknlbl424242ssp40px"
          },
          "chevronImg": ""
        });
    }
    if(resp.creditValueDate){
      var creditValueDate="";
      if(resp && resp.creditValueDate){
        creditValueDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(resp.creditValueDate);
      }
      segData.push({
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.payments.creditValueDate"),
        "value":{"text":creditValueDate,"right":"20dp","skin":"sknlbl424242ssp40px"},
        "chevronImg":""
      });
    }
    // charges breakdown 
    if (resp.charges){
      var charges = JSON.parse(resp.charges);
      transactionManager.setTransactionAttribute("chargesList",charges);
      transactionManager.setTransactionAttribute("charges",resp.charges);
      segData.unshift({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.FeeBreakdown"),
        "value": "View",
        "chevronImg": "chevron.png"
      });
    }else{
       transactionManager.setTransactionAttribute("chargesList","");
       transactionManager.setTransactionAttribute("charges","");
    }
    transactionManager.setTransactionAttribute("creditValueDate",resp.creditValueDate?resp.creditValueDate:"");
    transactionManager.setTransactionAttribute("exchangeRate",resp.exchangeRate);
    transactionManager.setTransactionAttribute("quoteCurrency",resp.quoteCurrency);
    ////osama
    transactionManager.setTransactionAttribute("totalAmount",resp.totalAmount);
    //transactionManager.setTransactionAttribute("totalAmount",transObj.amount);
    
    if (resp.overrideList) {
      var overrides = JSON.parse(resp.overrideList);
      var configManager = applicationManager.getConfigurationManager();
      for (var i = 0; i < overrides.length; i++) {
        if (overrides[i]=== "cutOfTimeBreached") {
          configManager.cutOffTimeBreachedOverride = true;
        }
        if (overrides[i] === "changeProduct") {
          configManager.cutOffProductOverride = true;
        }
        if (overrides[i] === "overdraft") {
          configManager.awaitingFundsOverride = true;
        }
      }
    }

   if (resp.messageDetails) {
    var overrides = JSON.parse(resp.messageDetails);
    transactionManager.setTransactionAttribute("messageDetails",overrides);
   }

    var controller = applicationManager.getPresentationUtility().getController('frmEuropeVerifyTransferDetails', true);
    controller.afterValidateTransaction(segData);

  };
  
  Transfer_PresentationController.prototype.presentationValidateATransferError = function(segData, err) {
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
      var controller = applicationManager.getPresentationUtility().getController('frmEuropeVerifyTransferDetails', true);
        segData.unshift({
          "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfersEurope.TotalCharges"),
          // "value": "5,66",  
          "value": null,
          "chevronImg": "chevron.png"
        });
      controller.bindGenericError(err);
      controller.afterValidateTransaction(segData);
    }
    
 };
    Transfer_PresentationController.prototype.processCreditCardAccountsData = function(data) {
    var forUtility = applicationManager.getFormatUtilManager();
    if(!data)
      data = [];
    var accProcessedData = [];
    for (var i = 0; i < data.length; i++) {
      accProcessedData[i] = {};
      var name = "";
      //if (data[i].nickName === null || data[i].nickName === undefined) {
        name = data[i].AccountName||data[i].nickName;
      //} else {
        //name = data[i].nickName;
      //}
      accProcessedData[i].accountName = data[i].accountName;
      accProcessedData[i].nickName = data[i].nickName;
      accProcessedData[i].outstandingBalance = data[i].outstandingBalance;
      accProcessedData[i].availableBalance = forUtility.formatAmountandAppendCurrencySymbol(data[i]["outstandingBalance"], data[i]["currencyCode"]);
      accProcessedData[i].accountID = data[i].accountID;
      accProcessedData[i].accountBalanceType = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.EuropeTransfer.OutstandingBalance");
      accProcessedData[i].accountType = data[i].accountType;
      accProcessedData[i].toAccountCurrency = data[i].currencyCode;
      accProcessedData[i].transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
      accProcessedData[i].processedName = applicationManager.getPresentationUtility().formatText(name, 10, data[i].accountID, 4);
      accProcessedData[i].dueDate = forUtility.getFormatedDateString(forUtility.getDateObjectfromString(data[i].dueDate), forUtility.getApplicationDateFormat());
      accProcessedData[i].minimumDue = data[i].minimumDue;
      accProcessedData[i].paymentDue = data[i].paymentDue;
      accProcessedData[i].accountTypeFlx = {isVisible: false};
      accProcessedData[i].imgBankIcon = {isVisible: false}; 
      accProcessedData[i].flxAccountType = {isVisible: false};
    }
    return accProcessedData;
  };

  Transfer_PresentationController.prototype.checkForOverrides = function(requestPayload) {
    var transObj = scope_TransfersPresentationController.getTransObject();
    var navMan = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
//     if (scope_TransfersPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") && transObj.paymentType === "SEPA") {
    if(transObj.messageDetails !== null && transObj.messageDetails !== undefined && transObj.messageDetails !== " "){
        var data = {
                        attachmentPayload: requestPayload
                    };
       navMan.setCustomInfo("frmTransfersPaymentMedium", data);
       scope_TransfersPresentationController.commonFunctionForNavigation("frmTransfersPaymentMedium");
//        }
//         else {
//         if (configManager.cutOffTimeBreachedOverride === true && configManager.cutOffProductOverride === true){
//           var data = {
//             ui : "twoOptions",
//             attachmentPayload : requestPayload
//           }
//           navMan.setCustomInfo("frmTransfersPaymentMedium", data);
//           scope_TransfersPresentationController.commonFunctionForNavigation("frmTransfersPaymentMedium");
//         }
//         else if (configManager.cutOffTimeBreachedOverride === true && configManager.cutOffProductOverride === false) {
//           var data = {
//             ui : "oneOption",
//             attachmentPayload : requestPayload
//           };
//           navMan.setCustomInfo("frmTransfersPaymentMedium", data);
//           scope_TransfersPresentationController.commonFunctionForNavigation("frmTransfersPaymentMedium");
//         }
//         else {
//           scope_TransfersPresentationController.makeATransfer(requestPayload);
//         }
       } else {
        scope_TransfersPresentationController.makeATransfer(requestPayload);
    }
  };

  Transfer_PresentationController.prototype.continueWithDomesticPayment = function(attachmentReq) {
    var recipientManager = applicationManager.getRecipientsManager();
    applicationManager.getPresentationUtility().showLoadingScreen();
    recipientManager.fetchBankDate({}, scope_TransfersPresentationController.fetchBankDateSuccess.bind(this,attachmentReq), scope_TransfersPresentationController.fetchBankDateFailure);
  };

  Transfer_PresentationController.prototype.fetchBankDateSuccess = function(attachmentReq, response) {
    var transactionManager = applicationManager.getTransactionManager();
    var formatUtilManager = applicationManager.getFormatUtilManager();
    var bankDate = response.date[0].nextWorkingDate;
    var formattedDate = formatUtilManager.getFormatedDateString(formatUtilManager.getDateObjectfromString(bankDate), "m/d/yy");
    transactionManager.setTransactionAttribute("frequencyStartDate", formattedDate);
    transactionManager.setTransactionAttribute("isScheduled", "1");
    scope_TransfersPresentationController.makeATransfer(attachmentReq); 
  };

  Transfer_PresentationController.prototype.fetchBankDateFailure = function (err) {
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
      var transactionManager = applicationManager.getTransactionManager();
      transactionManager.setTransactionAttribute("errmsg", err.errorMessage);
      scope_TransfersPresentationController.commonFunctionForNavigation("frmEuropeConfirmation");
    }
  };

  Transfer_PresentationController.prototype.getBeneficiaryName = function(accountNumber) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var params = {
      "accountNumber": accountNumber
    };
    applicationManager.getRecipientsManager().getPayeeName(params, this.getBeneficiaryNameSuccess.bind(this, accountNumber), this.getBeneficiaryNameFailure);
  };

  Transfer_PresentationController.prototype.getBeneficiaryNameSuccess = function(accountNumber, res) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var recipientsManager = applicationManager.getRecipientsManager();
    var transactionManager = applicationManager.getTransactionManager();
    if (res.beneficiaryName  && res.beneficiaryName.length !== 0) {
      recipientsManager.setBeneficiaryAttribute("beneficiaryName", res.beneficiaryName);
      recipientsManager.setBeneficiaryAttribute("accountNumber", accountNumber);
	  recipientsManager.setBeneficiaryAttribute("IBAN", accountNumber);
      transactionManager.setTransactionAttribute("transactionCurrency", res.currency);
      scope_TransfersPresentationController.toBenCurrency = res.currency;
      //scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
      var navMan = applicationManager.getNavigationManager();
      navMan.setEntryPoint("contracts",navMan.getCurrentForm());
      var flowType = scope_TransfersPresentationController.getFlowType();
      var featureAction = scope_TransfersPresentationController.getFeatureAction(flowType);
      scope_TransfersPresentationController.getContractDetails(featureAction);
    }  
    else {
      var controller = applicationManager.getPresentationUtility().getController("frmEnterBenAccNoEurope", true);
      controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.AccountNumberDoesNotMatch"));
    }  
  };

  Transfer_PresentationController.prototype.getBeneficiaryNameFailure = function (error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error.errorMessage);
    }
  };
  
  Transfer_PresentationController.prototype.getPaymentMethod = function () {
    switch(scope_TransfersPresentationController.transactionMode) {
        case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :
        	return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transferEurope.WithinBank");
        case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
        	return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.Domestic");
        case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
        	return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.International");
      	default:
        	return "-";
    }
  };
  
  /*
  This method is used for setting the beneficiary address details in the transaction object to display in acknowledgement screen.
  */
  Transfer_PresentationController.prototype.setBenAddressInTransactionObject = function(data) {
    var address = "";
    if (data.addressLine1) {
      address = data.addressLine1;
    }
	if(data.addressLine2) {
		if(address !== "") address = address +"," + data.addressLine2;
		else address = data.addressLine2;
		}
    if (data.city) {
      if (address !== "") address = address + ", " + data.city;
      else address = data.city;
    }
    if (data.country) {
      if (address !== "") address = address + ", " + data.country;
      else address = data.country;
    }
    if (data.zipcode) {
      if (address !== "") address = address + ", " + data.zipcode;
      else address = data.zipcode;
    }
    var trasMan = applicationManager.getTransactionManager();
    trasMan.setTransactionAttribute("beneficiaryAddress", address);
  };

  Transfer_PresentationController.prototype.filterRequestData = function(transObj) {
    for(var key in transObj) {
      if (transObj.hasOwnProperty(key)) {
        if (typeof transObj[key] !== "string" || transObj[key] === "") {
          delete transObj[key];
        }
      }
    }
    return transObj;
  };

  Transfer_PresentationController.prototype.navToContractDetails= function(recipientName){
    var recipientsManager = applicationManager.getRecipientsManager();
    if(recipientName !== undefined){
      recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
    }
    var flowType = scope_TransfersPresentationController.getFlowType();
    var featureAction = scope_TransfersPresentationController.getFeatureAction(flowType);
    scope_TransfersPresentationController.getContractDetails(featureAction);
  };

  Transfer_PresentationController.prototype.getFeatureAction= function(flowType){
    var action;
    switch(flowType){
      case "OtherBankRecipients":
      case "OtherBankRecipientsCreateTransfer":
        action = "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT";
        break;
      case "InternationalRecipients":
      case "InternationalRecipientCreateTransfer":
        action = "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT";
        break;
      default:
        action = "INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT";
    }
    return action;
  };

  Transfer_PresentationController.prototype.getContractDetails = function(featureAction, successCallback, errorCallback){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var recipientsManager = applicationManager.getRecipientsManager();
    recipientsManager.fetchContractDetails(featureAction, scope_TransfersPresentationController.getContractDetailsSuccessCallBack.bind(this, successCallback),scope_TransfersPresentationController.getContractDetailsErrorCallback.bind(this, errorCallback));
  };

  Transfer_PresentationController.prototype.getContractDetailsSuccessCallBack = function(successCallback, response){
   // var controller = applicationManager.getPresentationUtility().getController('ManageActivitiesUIModule/frmContracts', true);
    var flowType = scope_TransfersPresentationController.getFlowType();
    var navMan = applicationManager.getNavigationManager();
    var previousForm = navMan.getEntryPoint("contracts");
    
    if(response.contracts.length == 0){
      var controller = applicationManager.getPresentationUtility().getController(previousForm, true);
      controller.bindGenericError("User Doesn't have access to any contracts");
      if (typeof successCallback === "function")
    	successCallback();
      return; // ask sparsh
    }
    
    if(response.contracts.length == 1 && response.contracts[0].contractCustomers.length == 1){
      if(flowType==="editTransfer"){
    var editController = applicationManager.getPresentationUtility().getController(previousForm, true);
    editController.isEditLinkedCustomerAvailable = false;
        if(navMan.getCurrentForm() === "frmManageTransferRecipientInfo"){
          scope_TransfersPresentationController.setFlowType(navMan.getCustomInfo('flowType'));
        }
      }
      else {
        var cif = [];
        var customerCount = response.contracts.length;
    cif.push({
          "contractId": response.contracts[0].contractId,
          "coreCustomerId": response.contracts[0].contractCustomers[0].coreCustomerId
        });
       
        applicationManager.getRecipientsManager().setBeneficiaryAttribute("cif", JSON.stringify(cif));
        applicationManager.getRecipientsManager().setBeneficiaryAttribute("totalContractCustomerSelected",1);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
      }
    }
	else{
      if(navMan.getEntryPoint("createEuropeExternalBenificiaries")==="frmEuropeTransferToAccountSM"){     
        var recipientsManager = applicationManager.getRecipientsManager();
        var cif = [];
        var customerCount = response.contracts.length;
        if(applicationManager.getUserPreferencesManager().isSingleCustomerProfile){
        for(let i=0; i<customerCount; i++){
          cif.push({"contractId": response.contracts[i].contractId,
                    "coreCustomerId": response.contracts[i].contractCustomers[0].coreCustomerId
                   }); 
        }}
        else
          {
            var navManager = applicationManager.getNavigationManager();
        var customer = navManager.getCustomInfo("frmBenDetails");
       var  customers= navManager.getCustomInfo("accountMembershipId");
            var entryPoint = navManager.getEntryPoint("europeTransferFlow");
             if(customer && (entryPoint === "frmDashboardAggregated")){
        var membership_id=customer.membershipID;
      }
      else
        {
          var membership_id=customers;

        }
          for (let i = 0; i < customerCount; i++) {
              if (response.contracts[i].contractCustomers[0].coreCustomerId===membership_id){
                
              var linkedId = response.contracts[i].contractId;
              
            cif.push({
          "contractId": linkedId,
          "coreCustomerId": membership_id
        }); break;
          }}}
        cif = JSON.stringify(cif);
        recipientsManager.setBeneficiaryAttribute("cif", cif);
        recipientsManager.setBeneficiaryAttribute("totalContractCustomerSelected", 1);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
      }
    else{
      var controller = applicationManager.getPresentationUtility().getController('ManageActivitiesUIModule/frmContracts', true);
      controller.bindContractsData(response);
      if(flowType==="editTransfer"){
      var editController = applicationManager.getPresentationUtility().getController(previousForm, true);
      editController.isEditLinkedCustomerAvailable = true;
        if(navMan.getCurrentForm() === "frmManageTransferRecipientInfo"){
          scope_TransfersPresentationController.setFlowType(navMan.getCustomInfo('flowType'));
        }
    }
    else {
      scope_TransfersPresentationController.commonFunctionForNavigation("ManageActivitiesUIModule/frmContracts");
    }
    }
	}
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (typeof successCallback === "function")
    successCallback();
  };
    
  Transfer_PresentationController.prototype.getContractDetailsErrorCallback = function(errorCallback, err){
    var navMan = applicationManager.getNavigationManager();
    var previousForm = navMan.getEntryPoint("contracts");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      }else{
      var controller = applicationManager.getPresentationUtility().getController(previousForm, true);
      controller.bindGenericError(response.errorMessage);
      }
      if (typeof errorCallback === "function")
      errorCallback();
  };

  Transfer_PresentationController.prototype.getChargeBearerValue = function(paidBy) {
    switch (paidBy) {
        case "Both":
            return "SHA";
        case "Beneficiary":
            return "BEN";
        case "Self":
            return "OUR";
        default:
            return "SHA";
    }
  };

  Transfer_PresentationController.prototype.getAllowedFromAccounts = function (accounts) {
    var CREATE_ACTIONS = [
      "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE",
      "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE",
      "INTRA_BANK_FUND_TRANSFER_CREATE",
      "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE"
    ];
     return accounts.filter(this.isAccountHaveAtleastOneActions.bind(this, CREATE_ACTIONS));
  };

  Transfer_PresentationController.prototype.isAccountHaveAtleastOneActions = function (permissions, accountObject) {
    return permissions.some(function(permission) {
     return  applicationManager.getConfigurationManager().checkAccountAction(accountObject.accountID,permission)
    })
  };
  
  Transfer_PresentationController.prototype.updateBenificiaryCIF = function() {
		applicationManager.getPresentationUtility().showLoadingScreen();
		var transferModPresentationController = applicationManager.getModulesPresentationController("TransferEuropeUIModule");
    var benificiaryDetails = transferModPresentationController.getBenificiaryData();
    var editDetails = benificiaryDetails;
		editDetails.payeeId = editDetails.Id;
		var recipientsManager = applicationManager.getRecipientsManager();
		recipientsManager.editABenificiary(editDetails, scope_TransfersPresentationController.updateRecipientsCIFSuccess, scope_TransfersPresentationController.updateRecipientsCIFError);
    };
  
	Transfer_PresentationController.prototype.updateRecipientsCIFSuccess = function(response) {        
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var referenceId = response.Id;
      var navMan = applicationManager.getNavigationManager();
      var segData = scope_TransfersPresentationController.getAcknowledgementSegmentData("ADD", referenceId);
      var beneficiaryData = scope_TransfersPresentationController.getBenificiaryData();
      var beneficiaryName = beneficiaryData.beneficiaryName;
      var title = beneficiaryName + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.BenEdited");
      var ackdata = {
          "title": title,
          "segData": segData,
          "screenType": "ADD"
      };
      navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
      scope_TransfersPresentationController.isNavigated = true;
      navMan.navigateTo({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
    };
	Transfer_PresentationController.prototype.updateRecipientsCIFError = function(errorResponse) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
      else {
          var navMan = applicationManager.getNavigationManager();
          var ackdata = {
              "title": errorResponse.errorMessage
          }
          navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
          scope_TransfersPresentationController.isNavigated = true;
          navMan.navigateTo({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
      }				
    };

    Transfer_PresentationController.prototype.navigateToBenificiaryDetails = function(selectedAccountDetails) {
      var recipientsManager = applicationManager.getRecipientsManager();
      recipientsManager.setBeneficiaryObject(selectedAccountDetails);
      if (scope_TransfersPresentationController.getFlowType() === "SameBankRecipients") {
        recipientsManager.setBeneficiaryAttribute("transactionMode",applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers"));
      }
      else if (scope_TransfersPresentationController.getFlowType() === "OtherBankRecipients") {
        recipientsManager.setBeneficiaryAttribute("transactionMode",applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"));
      }
     else if (scope_TransfersPresentationController.getFlowType() === "InternationalRecipients") {
        recipientsManager.setBeneficiaryAttribute("transactionMode",applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"));
      }
      scope_TransfersPresentationController.commonFunctionForNavigation("frmBeneficiaryDetailsEurope");
  };
  
  Transfer_PresentationController.prototype.filterToAccountsByMembershipId = function(membershipId, toAccounts) {
    var recipientsManager = applicationManager.getRecipientsManager();
    var filteredToAccount = recipientsManager.filterToAccountsByMembershipId(membershipId, toAccounts);
    return filteredToAccount;
  }

    Transfer_PresentationController.prototype.filterFromAccountBasedOnCIF = function(fromAccounts) {
      var navMan = applicationManager.getNavigationManager();
      var transferModPresentationController = applicationManager.getModulesPresentationController("TransferEuropeUIModule");
      var entryPoint = navMan.getEntryPoint("editbeneficiary");
      var benificiaryDetails;
      if (entryPoint === "frmBeneficiaryDetailsEurope") {
        benificiaryDetails = navMan.getCustomInfo("frmBeneficiaryDetailsEurope");
      } else {
        benificiaryDetails = transferModPresentationController.getBenificiaryData();
      }
      if (benificiaryDetails.cif !== null && benificiaryDetails.cif !== undefined) {
        var toMemId = JSON.parse(benificiaryDetails.cif)[0].coreCustomerId.split(',');
        fromAccounts.filter(x => {
          return toMemId.includes(x.Membership_id)
        });
      }
      return fromAccounts;
    }

  Transfer_PresentationController.prototype.retriveAttachments = function(data, successCallback) {
    var requestParam = {};
    //requestParam.customerId = applicationManager.getUserPreferencesManager().getUserObj().userId;
    requestParam.transactionId = data.transactionId;
    applicationManager.getTransactionManager().retrieveAttachments(requestParam, successCallback, this.retriveAttachmentsError.bind(this));
  };
  
  Transfer_PresentationController.prototype.retriveAttachmentsError = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("error fetching attachments");
    var navMan = applicationManager.getNavigationManager();
    var currentFormId = kony.application.getCurrentForm().id;
    navMan.setCustomInfo(currentFormId, {"attachmentError" : error});
    var controller = applicationManager.getPresentationUtility().getController(currentFormId, true);
    controller.bindGenericError(error);
  };
  
  Transfer_PresentationController.prototype.getSwiftCodeForTransfer = function(toAccountNumber) {
    var domesticBen = scope_TransfersPresentationController.toAccountList.externalBenificiaries;
    var internationalBen = scope_TransfersPresentationController.toAccountList.internationalBenificiaries;
    var combinedArray = domesticBen.concat(internationalBen);
    for (var i = 0; i < combinedArray.length; i++) {
      if (combinedArray[i].accountNumber === toAccountNumber) {
        return combinedArray[i].swiftCode;
      }
    }
    return null;
  };
  
  Transfer_PresentationController.prototype.getSavingsAndCheckingsAccounts = function(fromAccounts) {
    return fromAccounts.filter(function(account) {
      return (account.accountType !== "Loan" && account.accountType !== "CreditCard" && account.accountType !== "Deposit" && account.externalIndicator !== "true");
    });
  }
    return Transfer_PresentationController;
});
