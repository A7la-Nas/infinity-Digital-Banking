define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController"], function(AsyncManager) {
    function ManageActivities_PresentationController() {
        
        scope_ManageActivitiesPresentationController = this;
        //stateNavigation - holds the value as true if it is on state management form like amount or review screen and for rest of screens hold false value
        scope_ManageActivitiesPresentationController.stateNavigation = "";
    //stateTriggeredForm - holds the value as mame of form where state management has triggered.
        scope_ManageActivitiesPresentationController.validateReferenceId = "";
        scope_ManageActivitiesPresentationController.stateTriggeredForm = "";
        scope_ManageActivitiesPresentationController.toSupportedOwnAccounts = [];
        scope_ManageActivitiesPresentationController.supportedCurrencies = [];
        scope_ManageActivitiesPresentationController.filteredToAccounts = [];
        scope_ManageActivitiesPresentationController.toAccountList = {};
        scope_ManageActivitiesPresentationController.europeFlowType = "";
        scope_ManageActivitiesPresentationController.externalAccount = false;
        scope_ManageActivitiesPresentationController.nickName = null;
        scope_ManageActivitiesPresentationController.entryPoint = "";
        scope_ManageActivitiesPresentationController.isNickNameUpdated = "";
        scope_ManageActivitiesPresentationController.isRecipientDeleted = "";
        scope_ManageActivitiesPresentationController.sameBankBenificiaryAdded = "";
        scope_ManageActivitiesPresentationController.otherBankBenificiaryAdded = "";
        scope_ManageActivitiesPresentationController.internationalBenificiaryAdded = "";
        scope_ManageActivitiesPresentationController.reEnteredAccountNumber = "";
        scope_ManageActivitiesPresentationController.swiftCode = "";
        scope_ManageActivitiesPresentationController.toBenCurrency = "";
        scope_ManageActivitiesPresentationController.routingNumber = "";
        scope_ManageActivitiesPresentationController.countryName = "";
        scope_ManageActivitiesPresentationController.duration="";
        scope_ManageActivitiesPresentationController.isNavigated = false;
        scope_ManageActivitiesPresentationController.toBankName="";
      	scope_ManageActivitiesPresentationController.transactionMode="";
		scope_ManageActivitiesPresentationController.bankName="";
		scope_ManageActivitiesPresentationController.IBAN="";
		scope_ManageActivitiesPresentationController.EnteredAccountNumber = "";
		scope_ManageActivitiesPresentationController.accDetHomeAcc="";
        scope_ManageActivitiesPresentationController.tncChcked=false;
        scope_ManageActivitiesPresentationController.limitsData = null;
    scope_ManageActivitiesPresentationController.haveLimitsBeenFetched = false;
      scope_ManageActivitiesPresentationController.mfaFlowType="";
      scope_ManageActivitiesPresentationController.asyncResponseData = {};
      scope_ManageActivitiesPresentationController.isRecipientSaveRequired = true;
      scope_ManageActivitiesPresentationController.searchSwiftData = {};
      scope_ManageActivitiesPresentationController.SwiftorBICCodeResults=[];
      scope_ManageActivitiesPresentationController.messageDetails=[];
      scope_ManageActivitiesPresentationController.swiftforEnteredIBAN ="";
      scope_ManageActivitiesPresentationController.isInternationIBANEntered=false;
      scope_ManageActivitiesPresentationController.isLoansAccountType = false;
      scope_ManageActivitiesPresentationController.previousAccountType = "";
      scope_ManageActivitiesPresentationController.currentAccountType = "";
      scope_ManageActivitiesPresentationController.serverDate = null;
      scope_ManageActivitiesPresentationController.selectedFromAccountData = {};
      scope_ManageActivitiesPresentationController.selectedToAccountData = {};
      scope_ManageActivitiesPresentationController.triggerOneTimePaymentFlow = false;
      scope_ManageActivitiesPresentationController.transactionTabSelected = ""; //Scheduled or Past 
      scope_ManageActivitiesPresentationController.filterTypeSelected = ""; //Transfer, Payment or Both
      /**   numberOfAsyncForInternalBen
          *  1.getFrequentSameBankAccount
          *  2.getSameBankAccount
            */
        scope_ManageActivitiesPresentationController.numberOfAsyncForInternalBen=2;
      /**   numberOfAsyncForExternalBen
          *  1.getFrequentOtherBankAccount
          *  2.getOtherBankAccount
            */
      scope_ManageActivitiesPresentationController.numberOfAsyncForExternalBen=2;
         /**   numberOfAsyncForInternationaAcc
          *  1.getFrequentInternationalExternalAccounts
          *  2.getAllInternationalExternalAccounts
            */
      scope_ManageActivitiesPresentationController.numberOfAsyncForInternationaAcc=2;
      scope_ManageActivitiesPresentationController.overrides = "";
        kony.mvc.Presentation.BasePresenter.call(this);
        this.asyncManager = new AsyncManager();
    }
    inheritsFrom(ManageActivities_PresentationController, kony.mvc.Presentation.BasePresenter);
    ManageActivities_PresentationController.prototype.initializePresentationController = function() {
    };
    ManageActivities_PresentationController.prototype.clearBuilderNonGeneratedAttributes = function() {
        scope_ManageActivitiesPresentationController.toBankName="";
        scope_ManageActivitiesPresentationController.reEnteredAccountNumber = "";
        scope_ManageActivitiesPresentationController.swiftCode = "";
        scope_ManageActivitiesPresentationController.routingNumber = "";
        scope_ManageActivitiesPresentationController.countryName = "";
        scope_ManageActivitiesPresentationController.duration="";
        scope_ManageActivitiesPresentationController.IBAN="";
    };
   ManageActivities_PresentationController.prototype.setToBankName=function(toBankName)
    {
      scope_ManageActivitiesPresentationController.toBankName=toBankName;
    };
     ManageActivities_PresentationController.prototype.getToBankName=function()
    {
       return scope_ManageActivitiesPresentationController.toBankName;
    };
   ManageActivities_PresentationController.prototype.setDuration=function(duration)
    {
      scope_ManageActivitiesPresentationController.duration=duration;
    };
     ManageActivities_PresentationController.prototype.getDuration=function()
    {
       return scope_ManageActivitiesPresentationController.duration;
    };
   ManageActivities_PresentationController.prototype.getReEnteredAccountNumber = function() {
        return scope_ManageActivitiesPresentationController.reEnteredAccountNumber;
    };
    ManageActivities_PresentationController.prototype.getEnteredAccountNumber = function() {
        return scope_ManageActivitiesPresentationController.EnteredAccountNumber;
    };
    ManageActivities_PresentationController.prototype.getSwiftCode = function() {
        return scope_ManageActivitiesPresentationController.swiftCode;
    };
	ManageActivities_PresentationController.prototype.getIBAN = function() {
        return scope_ManageActivitiesPresentationController.IBAN;
    };
    ManageActivities_PresentationController.prototype.getRoutingNumber = function() {
        return scope_ManageActivitiesPresentationController.routingNumber;
    };
    ManageActivities_PresentationController.prototype.getCountryName = function() {
        return scope_ManageActivitiesPresentationController.countryName;
    };
    ManageActivities_PresentationController.prototype.setSwiftCode = function(swiftCode) {
        scope_ManageActivitiesPresentationController.swiftCode=swiftCode;
    };
	 ManageActivities_PresentationController.prototype.setBankNameFromResponse=function(bankName){
      scope_ManageActivitiesPresentationController.bankName=bankName;
    };
        ManageActivities_PresentationController.prototype.getBankNameFromResponse=function(){
      return scope_ManageActivitiesPresentationController.bankName;
    };
    ManageActivities_PresentationController.prototype.setIBAN = function(IBAN) {
        scope_ManageActivitiesPresentationController.IBAN=IBAN;
    };
    ManageActivities_PresentationController.prototype.setRoutingNumber = function(routingNumber) {
        scope_ManageActivitiesPresentationController.routingNumber=routingNumber;
    };
    ManageActivities_PresentationController.prototype.setCountryName = function(countryName) {
        scope_ManageActivitiesPresentationController.countryName=countryName;
    };
    ManageActivities_PresentationController.prototype.setReEnteredAccountNumber = function(accNum) {
        scope_ManageActivitiesPresentationController.reEnteredAccountNumber = accNum;
    };
    ManageActivities_PresentationController.prototype.setEnteredAccountNumber = function(accNumber) {
        scope_ManageActivitiesPresentationController.EnteredAccountNumber = accNumber;
    };
 
    ManageActivities_PresentationController.prototype.fetchSameBankRecepients = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.fetchAllInternalBenificiaries(scope_ManageActivitiesPresentationController.fetchSameBankRecipientsPresentationSuccess, scope_ManageActivitiesPresentationController.fetchSameBankRecipientsPresentationError);
    };
    ManageActivities_PresentationController.prototype.fetchSameBankRecipientsPresentationSuccess = function(successResponse) {
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmManageRecipientList");
    };
    ManageActivities_PresentationController.prototype.fetchSameBankRecipientsPresentationError = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error.errorMessage);
        }
    };
    ManageActivities_PresentationController.prototype.getBenificiaryScheduledAndPostedTransactions = function(selectedAccountDetails) {
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
        transactionObj.fetchToExternalAccountTransactions(criteria1, scope_ManageActivitiesPresentationController.fetchBenificiaryPenTranPresSucCallback, scope_ManageActivitiesPresentationController.fetchBenificiaryPenTranPreErrCallback);
    };
    ManageActivities_PresentationController.prototype.fetchBenificiaryPenTranPresSucCallback = function(resTransPend) {
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
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmManageTransferRecipientEurope");
    };
    ManageActivities_PresentationController.prototype.fetchBenificiaryPenTranPreErrCallback = function(resTransPendErr) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resTransPendErr["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPendErr.errorMessage);
        }
    };
    ManageActivities_PresentationController.prototype.fetchBenificiaryPosTranPresSucCallback = function(resTransPost) {
        scope_ManageActivitiesPresentationController.asyncManager.setSuccessStatus(1, resTransPost);
        if (scope_ManageActivitiesPresentationController.asyncManager.areAllservicesDone(2)) {
            scope_ManageActivitiesPresentationController.navigateToBenificiaryTransactionDetails();
        }
    };
    ManageActivities_PresentationController.prototype.fetchBenificiaryPosTranErrCallback = function(resTransPostErr) {
        scope_ManageActivitiesPresentationController.asyncManager.setErrorStatus(1, resTransPostErr);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resTransPostErr["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPostErr.errorMessage);
        }
    };
    ManageActivities_PresentationController.prototype.downloadAttachments = function(isSingleFile, fileNames, i) {
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
	ManageActivities_PresentationController.prototype.fetchInternationalAccountsByAccNoOrName = function(query) {
    if (query && query.length > 0) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var data = applicationManager.getAccountManager().searchExternalInternationalAccounts(query);
      var currentForm = kony.application.getCurrentForm().id;
      var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
      controller.segmentDataSet(data);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
	ManageActivities_PresentationController.prototype.fetchExternalAccountsByIbanOrName = function(query) {
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
  ManageActivities_PresentationController.prototype.checkExistingAccountwithAccountNumber = function(accNo){
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
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmTransfersRecipientNameEurope");
      }
    }
  };
  ManageActivities_PresentationController.prototype.checkExistingAccountwithIBAN = function(IBAN){
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
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmTransfersRecipientNameEurope");
    }
  };
  ManageActivities_PresentationController.prototype.getServiceName =function(displayName){
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
  ManageActivities_PresentationController.prototype.saveRecipient = function(save){
    var navMan = applicationManager.getNavigationManager();
    var accountList = navMan.getCustomInfo("frmTransfersToAccount");
    var IBAN = accountList.selectedAccountData.IBAN;
    var serviceName = scope_ManageActivitiesPresentationController.getServiceName("OtherBankAccountsTransfer");
    scope_ManageActivitiesPresentationController.clearBenificiaryData();
    if(save == 0){
      navMan.setCustomInfo("frmManageTransferRecipient", accountList.selectedAccountData);
      var recipientName= accountList.selectedAccountData.beneficiaryName;
      scope_ManageActivitiesPresentationController.setIBAN(IBAN);
      scope_ManageActivitiesPresentationController.navigateToDomesticBenificiaryVerifyDetails(recipientName, IBAN);
    }
    else{
      scope_ManageActivitiesPresentationController.fetchBankDetailsForDomesticTransfer(IBAN, serviceName);
    }
  };
  ManageActivities_PresentationController.prototype.navFromRecipName = function(){
    var navMan = applicationManager.getNavigationManager();
    var accountList = navMan.getCustomInfo("frmTransfersToAccount");
    var transferType = accountList.transactionType;
    if (transferType == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToOtherEuropeanAccounts")) {
      var IBAN = accountList.selectedAccountData.IBAN;
      var serviceName = scope_ManageActivitiesPresentationController.getServiceName("OtherBankAccountsTransfer");
      scope_ManageActivitiesPresentationController.fetchBankDetailsForDomesticTransfer(IBAN, serviceName);
      }
    else{
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmTransfersSwiftCodeEurope");
      }
  };
    ManageActivities_PresentationController.prototype.navigateToBenificiaryTransactionDetails = function(res) {
        var formatUtil = applicationManager.getFormatUtilManager();
        var navMan = applicationManager.getNavigationManager();
        var selectedAccount = {};
        selectedAccount.pendingTransactions = scope_ManageActivitiesPresentationController.asyncManager.getData(0);
        selectedAccount.postedTransaction = scope_ManageActivitiesPresentationController.asyncManager.getData(1);
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
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmManageTransferRecipient");
    };
    ManageActivities_PresentationController.prototype.updateBenificiaryNickName = function(nickName) {
        var benificiaryDetails = scope_ManageActivitiesPresentationController.getBenificiaryData();
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
        if (scope_ManageActivitiesPresentationController.getFlowType() === "InternationalRecipients") {
            editDetails.isInternationalAccount = "true";
            recipientsManager.editABenificiary(editDetails, scope_ManageActivitiesPresentationController.updateBankRecipientsPresentationSuccess, scope_ManageActivitiesPresentationController.updateBankRecipientsPresentationError);
        } else {
            recipientsManager.editABenificiary(editDetails, scope_ManageActivitiesPresentationController.updateBankRecipientsPresentationSuccess, scope_ManageActivitiesPresentationController.updateBankRecipientsPresentationError);
        }
    };
    ManageActivities_PresentationController.prototype.updateBankRecipientsPresentationSuccess = function(successResponse) {
       scope_ManageActivitiesPresentationController.isNickNameUpdated = true;
        if (scope_ManageActivitiesPresentationController.getFlowType() === "SameBankRecipients") {
            scope_ManageActivitiesPresentationController.fetchSameBankRecepients();
        } else if (scope_ManageActivitiesPresentationController.getFlowType() === "InternationalRecipients") {
            scope_ManageActivitiesPresentationController.fetchInternationalRecepients();
        } else {
            scope_ManageActivitiesPresentationController.fetchOtherBankRecepients();
        }
    };
    ManageActivities_PresentationController.prototype.updateBankRecipientsPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        } else {
			var controller = applicationManager.getPresentationUtility().getController('frmManageEditRecipient', true);
			controller.showErrorPopUp(errorResponse["errmsg"]);
		}
    };
    ManageActivities_PresentationController.prototype.deleteSameBankBenificiary = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        var transferModPresentationController = applicationManager.getModulesPresentationController("ManageActivitiesUIModule");
        var benificiaryDetails = transferModPresentationController.getBenificiaryData();
        if (transferModPresentationController.getFlowType() === "SameBankRecipients") {
            recipientsManager.deleteABenificiary(benificiaryDetails, scope_ManageActivitiesPresentationController.deleteSameBankRecipientsPresentationSuccess, scope_ManageActivitiesPresentationController.deleteSameBankRecipientsPresentationError);
        } else if (transferModPresentationController.getFlowType() === "InternationalRecipients") {
            recipientsManager.deleteABenificiary(benificiaryDetails, scope_ManageActivitiesPresentationController.deleteInternationalBankRecipientsPresentationSuccess, scope_ManageActivitiesPresentationController.deleteInternationalBankRecipientsPresentationError);
        } else {
            recipientsManager.deleteABenificiary(benificiaryDetails, scope_ManageActivitiesPresentationController.deleteOtherBankRecipientsPresentationSuccess, scope_ManageActivitiesPresentationController.deleteOtherBankRecipientsPresentationError);
        }
    };
    ManageActivities_PresentationController.prototype.deleteInternationalBankRecipientsPresentationSuccess = function(successResponse) {
        scope_ManageActivitiesPresentationController.isRecipientDeleted = true;
        scope_ManageActivitiesPresentationController.fetchInternationalRecepients();
    };
    ManageActivities_PresentationController.prototype.deleteInternationalBankRecipientsPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        }
    };
    ManageActivities_PresentationController.prototype.deleteSameBankRecipientsPresentationSuccess = function(successResponse) {
        scope_ManageActivitiesPresentationController.isRecipientDeleted = true;
        scope_ManageActivitiesPresentationController.fetchSameBankRecepients();
    };
    ManageActivities_PresentationController.prototype.deleteSameBankRecipientsPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        }
    };
    ManageActivities_PresentationController.prototype.deleteOtherBankRecipientsPresentationSuccess = function(successResponse) {
        scope_ManageActivitiesPresentationController.isRecipientDeleted = true;
        scope_ManageActivitiesPresentationController.fetchOtherBankRecepients();
    };
    ManageActivities_PresentationController.prototype.deleteOtherBankRecipientsPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse.errorMessage);
        }
    };
    ManageActivities_PresentationController.prototype.fetchOtherBankRecepients = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.fetchAllExternalBenificiaries(scope_ManageActivitiesPresentationController.fetchOtherBankRecepientsPresentationSuccess, scope_ManageActivitiesPresentationController.fetchOtherBankRecepientsPresentationError);
    };
   
     ManageActivities_PresentationController.prototype.evaluateAmount = function(amount,fromAvlBal,selectedCurrency,fromAccCurrency) {
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
            //       var index = scope_ManageActivitiesPresentationController.getSelectedFrequencyIndex();
            //       navManager.setCustomInfo("frmTransferFrequency",{"index":index});
            navManager.navigateTo("frmTransferFrequencyEurope");
        }
    };
    ManageActivities_PresentationController.prototype.fetchOtherBankRecepientsPresentationSuccess = function(successResponse) {
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmTransfersManageRecipientList");
    };
    ManageActivities_PresentationController.prototype.fetchOtherBankRecepientsPresentationError = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
    };
    

	  ManageActivities_PresentationController.prototype.showAccounts = function(type) {
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
        action= scope_ManageActivitiesPresentationController.getActionByType(type);
        scope_ManageActivitiesPresentationController.setFlowType("MyKonyAccounts");
        trasMan.setTransactionAttribute("transactionType","InternalTransfer");
        trasMan.setTransactionAttribute("transferType","internal");
        scope_ManageActivitiesPresentationController.showFromAccounts(scope_ManageActivitiesPresentationController.showInternalAccountsPresentationSuccessCallBack);
        
        //scope_ManageActivitiesPresentationController.fetchTransferLimits(action,scope_ManageActivitiesPresentationController.fetchLimitsForKonyAccountSuccessCallBack);
      } else if (type == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToOtherEuropeanAccounts")) {
        action= scope_ManageActivitiesPresentationController.getActionByType(type);
        scope_ManageActivitiesPresentationController.setFlowType("OtherBankAccountsCreateTransfer");
        trasMan.setTransactionAttribute("transactionType","ExternalTransfer");
        trasMan.setTransactionAttribute("transferType","domestic");
        scope_ManageActivitiesPresentationController.navigateToExternalFlow(type);
      } else if (type == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToInternationalAccounts")) {
        scope_ManageActivitiesPresentationController.setFlowType("InternationalTransferCreateTransfer");
        trasMan.setTransactionAttribute("transactionType","ExternalTransfer");
        trasMan.setTransactionAttribute("transferType","international");
        action= scope_ManageActivitiesPresentationController.getActionByType(type);
        scope_ManageActivitiesPresentationController.navigateToInternationalFlow(type);
      }
      if(action){
        scope_ManageActivitiesPresentationController.fetchLimits(action);
      }
    };
    ManageActivities_PresentationController.prototype.showInternalAccountsPresentationSuccessCallBack = function(res) {
        var navMan = applicationManager.getNavigationManager();
        var accNav = applicationManager.getAccountManager();
        var toacc = accNav.getToTransferSupportedAccounts();
        var accountList = navMan.getCustomInfo("frmTransfersToAccount");
        accountList.internalAccounts = toacc;
        navMan.setCustomInfo("frmTransfersToAccount", accountList);
        navMan.navigateTo("frmTransfersToAccountDBXEurope");
    };
	ManageActivities_PresentationController.prototype.navigateToInternationalFlow = function(type) {
        var navMan = applicationManager.getNavigationManager();
        var accountList = navMan.getCustomInfo("frmTransfersToAccount");
        accountList.addedFlag = scope_ManageActivitiesPresentationController.externalAccount;
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
        scope_ManageActivitiesPresentationController.externalAccount = false;
    };
    ManageActivities_PresentationController.prototype.navigateToExternalFlow = function(type) {
		var navMan = applicationManager.getNavigationManager();
		var accountList = navMan.getCustomInfo("frmTransfersToAccount");
		accountList.addedFlag = scope_ManageActivitiesPresentationController.externalAccount;
		accountList.transactionType = type;
		navMan.setCustomInfo("frmTransfersToAccount", accountList);
		var accMan = applicationManager.getAccountManager();
		accMan.fetchExternalAccounts(function() {},function(){});
		var recipientManager = applicationManager.getRecipientsManager();
		recipientManager.fetchAllExternalBenificiaries(function() {
		  navMan.navigateTo("frmTransfersToRecipientList");
		  scope_ManageActivitiesPresentationController.externalAccount = false;
		}, function(err) {
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		  if (err["isServerUnreachable"]) {
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
		  }
		  navMan.navigateTo("frmTransfersToRecipientList");
		  scope_ManageActivitiesPresentationController.externalAccount = false;
		});
	};
    ManageActivities_PresentationController.prototype.showFromAccounts = function(successCB) {
        var accMan = applicationManager.getAccountManager();
        accMan.fetchInternalAccounts(successCB, scope_ManageActivitiesPresentationController.showFromAccountsPresentationErrorCallBack);
    };

    ManageActivities_PresentationController.prototype.fromAccountOnContinuePresentationSuccessCallBack = function(res) {
        var accNav = applicationManager.getAccountManager();
        var frmacc = accNav.getFromTransferSupportedAccounts();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersFromAccount", {
            "fromaccounts": frmacc
        });
        navMan.navigateTo("frmTransferAmountEurope");
    };
    ManageActivities_PresentationController.prototype.showFromAccountsPresentationErrorCallBack = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"])
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        else
            kony.print("error in showFromAccountsPresentationErrorCallBack");
    };
 
    ManageActivities_PresentationController.prototype.transferScheduledDate = function(strtDate) {
        var formatedDate = strtDate;
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("scheduledDate",formatedDate);
      	transactionManager.setTransactionAttribute("scheduledCalendarDate",scope_ManageActivitiesPresentationController.convertCalendarDateToLocaleDate(formatedDate));
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo("frmTransferConfirmationEurope");
    };
    ManageActivities_PresentationController.prototype.transferScheduledStrtDate = function(strtDate) {
        var formatedDate = strtDate;
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("frequencyStartDate",formatedDate);
        transactionManager.setTransactionAttribute("scheduledDate",formatedDate);
      	transactionManager.setTransactionAttribute("scheduledCalendarDate",scope_ManageActivitiesPresentationController.convertCalendarDateToLocaleDate(formatedDate));
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo("frmTransfersEndDateEurope");
    };
    ManageActivities_PresentationController.prototype.transferScheduledEndDate = function(endDate) {
        var formatedDate = endDate;
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("frequencyEndDate",formatedDate);
      	transactionManager.setTransactionAttribute("endCalendarDate",scope_ManageActivitiesPresentationController.convertCalendarDateToLocaleDate(formatedDate));
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo("frmTransferConfirmationEurope");
    };
    ManageActivities_PresentationController.prototype.transferSetRecurrence = function(reccurrence) {
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("numberOfRecurrences",reccurrence);
        var navMan = applicationManager.getNavigationManager();
        // navMan.setCustomInfo("frmTransfersStartDate","NofRR");
        navMan.navigateTo("frmTransfersStartDateEurope");
    };
  
 
    
   ManageActivities_PresentationController.prototype.navAfterToAcc = function() {
        var accMan = applicationManager.getAccountManager();
        var transactionManager = applicationManager.getTransactionManager();
        var navMan = applicationManager.getNavigationManager();
        var accountList = navMan.getCustomInfo("frmTransfersToAccount");
        var preAccData = accMan.getTransfersPreferredAccount();
        if(transactionManager.transferObject.fromAccountNumber==""||transactionManager.transferObject.fromAccountNumber==null||transactionManager.transferObject.fromAccountNumber==undefined)      
       scope_ManageActivitiesPresentationController.setFromAccountsForTransactions(preAccData);
        var selectedAccountData = accountList.selectedAccountData;
        if (accountList.type == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToMyDBXAccount")) {
            transactionManager.setTransactionAttribute("toAccountNumber",selectedAccountData["accountID"]);
            transactionManager.setTransactionAttribute("toAccountType",selectedAccountData["accountType"]);
            transactionManager.setTransactionAttribute("toAccountName",selectedAccountData["accountName"]);
           transactionManager.setTransactionAttribute("toAccountCurrency",selectedAccountData["toAccountCurrency"]);
           // transactionManager.setTransactionAttribute("toBankName",selectedAccountData["bankName"]);
            scope_ManageActivitiesPresentationController.setToBankName(selectedAccountData["bankName"]);
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
            scope_ManageActivitiesPresentationController.setToBankName(selectedAccountData["bankName"]);
          if(!kony.sdk.isNullOrUndefined(selectedAccountData["beneficiaryName"])){
            transactionManager.setTransactionAttribute("toAccountName",selectedAccountData["beneficiaryName"]);
            transactionManager.setTransactionAttribute("beneficiaryName",selectedAccountData["beneficiaryName"]);
          }
        }
        if ((preAccData === "") || (preAccData === undefined) || (preAccData === null) || ((accountList.type === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.ToMyDBXAccount")) && (accountList.selectedAccountData["accountID"] === transactionManager.transferObject.fromAccountNumber))) {
            applicationManager.getPresentationUtility().showLoadingScreen();
            scope_ManageActivitiesPresentationController.showFromAccounts(scope_ManageActivitiesPresentationController.fromAccountsPresentationSuccessCallBack);
        } else {
            
            scope_ManageActivitiesPresentationController.showPreferredAccount();
        }
    };

    ManageActivities_PresentationController.prototype.getAmount = function() {
        var amount = null;
        var transactionmanager = applicationManager.getTransactionManager();
        var formatUtil = applicationManager.getFormatUtilManager();
        if (transactionmanager.getTransactionObject().amount !== undefined && transactionmanager.getTransactionObject().amount !== null && transactionmanager.getTransactionObject().amount !== "") {
            amount = formatUtil.deFormatAmount(transactionmanager.getTransactionObject().amount);
        }
        return amount;
    };
    ManageActivities_PresentationController.prototype.showPreferredAccount = function() {
        scope_ManageActivitiesPresentationController.showFromAccounts(scope_ManageActivitiesPresentationController.fromAccountOnContinuePresentationSuccessCallBack)
    };
    ManageActivities_PresentationController.prototype.navigateToReEnterAccountNumber = function(accountNumber) {
        var recipientsManager = applicationManager.getRecipientsManager();
        var benificiaryData={};
        benificiaryData.accountNumber=accountNumber;
        recipientsManager.initializeBeneficiaryDataWithAccountNum(benificiaryData);
        if (scope_ManageActivitiesPresentationController.getFlowType() === "InternationalRecipients" || scope_ManageActivitiesPresentationController.getFlowType() === "InternationalTransferCreateTransfer") {
            var recipientsManager = applicationManager.getRecipientsManager();
            recipientsManager.setBeneficiaryAttribute("countryName",scope_ManageActivitiesPresentationController.countryName);
            recipientsManager.setBeneficiaryAttribute("swiftCode",scope_ManageActivitiesPresentationController.swiftCode);
			recipientsManager.setBeneficiaryAttribute("bankName",scope_ManageActivitiesPresentationController.bankName);
        }
        if (scope_ManageActivitiesPresentationController.getFlowType() === "OtherBankRecipients" || scope_ManageActivitiesPresentationController.getFlowType() === "OtherBankAccountsCreateTransfer") {
            var recipientsManager = applicationManager.getRecipientsManager();
            recipientsManager.setBeneficiaryAttribute("routingNumber",scope_ManageActivitiesPresentationController.routingNumber);
        }
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmReEnterBenAccNoEurope");
    };
    ManageActivities_PresentationController.prototype.navigateToBenName = function(accountNumber) {
        scope_ManageActivitiesPresentationController.setReEnteredAccountNumber(accountNumber);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenNameEurope");
    };
    ManageActivities_PresentationController.prototype.navigateToBenificiaryName = function(accountType) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("accountType",accountType);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenNameEurope");
    };
//     ManageActivities_PresentationController.prototype.navigateToBenificiaryVerifyDetails = function(recipientName) {
//         var recipientsManager = applicationManager.getRecipientsManager();
//         recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
//         scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
//     };
  
  ManageActivities_PresentationController.prototype.navigateToBenificiaryVerifyDetails = function(accountNb) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("accountNumber",accountNb);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    };
  
  ManageActivities_PresentationController.prototype.navigateToVerifyDetailsFromPhoneNumber = function(PhoneData) {
    var recipientsManager = applicationManager.getRecipientsManager();
    recipientsManager.setBeneficiaryAttribute("phoneNumber",PhoneData.phoneNumber);
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
  };
  ManageActivities_PresentationController.prototype.navigateToVerifyDetailsFromEmailAddress = function(EmailData) {
    var recipientsManager = applicationManager.getRecipientsManager();
    if(EmailData.emailAddress){
      recipientsManager.setBeneficiaryAttribute("email",EmailData.emailAddress);
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    }
    else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      recipientsManager.setBeneficiaryAttribute("email",EmailData.emailAddress);
    }
    
  };
	 ManageActivities_PresentationController.prototype.navigateToDomesticBenificiaryVerifyDetails = function(recipientName, IBAN) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
        recipientsManager.setBeneficiaryAttribute("IBAN",IBAN);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    };
	 ManageActivities_PresentationController.prototype.navigateToBenificiaryInternationalVerifyDetails = function(recipientName, accNumber, swiftCode) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
        recipientsManager.setBeneficiaryAttribute("swiftCode",swiftCode);
        recipientsManager.setBeneficiaryAttribute("accountNumber",accNumber);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    };
    ManageActivities_PresentationController.prototype.navigateToEnterBenificiaryAccountNumber = function(routingNumber) {
        var recipientsManager = applicationManager.getRecipientsManager();
        scope_ManageActivitiesPresentationController.setRoutingNumber(routingNumber);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEnterBenAccNo");
    };
   ManageActivities_PresentationController.prototype.setNickName=function(nickName){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("nickName",nickName);
    };
      ManageActivities_PresentationController.prototype.setIsVerified=function(value){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("isVerified",value);
    };
      ManageActivities_PresentationController.prototype.setIsSameBankAccount=function(value){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("isSameBankAccount",value);
    };
      ManageActivities_PresentationController.prototype.setIsInternationalAccount=function(value){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("isInternationalAccount",value);
    };
        ManageActivities_PresentationController.prototype.setBankName=function(bankName){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("bankName",bankName);
    };
  ManageActivities_PresentationController.prototype.setBankCountryName = function(country) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("countryName", country);
    };
    ManageActivities_PresentationController.prototype.navigateToEnterBenificiaryRoutingNumber = function(bankDetails) {
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmAddBenRoutNo", {
            "bankDetails": bankDetails
        });
        navMan.navigateTo("frmAddBenRoutNo");
    };
    ManageActivities_PresentationController.prototype.createInternalBenificiary = function(flowType) {
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
        var benificiaryData=scope_ManageActivitiesPresentationController.getBenificiaryData();
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
            recipientsManager.createABenificiary(benificiaryData, scope_ManageActivitiesPresentationController.createBenificiaryManageFlowPresentationSuccess.bind(this, benificiaryData), scope_ManageActivitiesPresentationController.createBenificiaryManageFlowPresentationError);
        }
        else {
            recipientsManager.createABenificiary(benificiaryData, scope_ManageActivitiesPresentationController.createSameBankBenificiaryPresentationSuccess, scope_ManageActivitiesPresentationController.createSameBankBenificiaryPresentationError);
        }
    };
    ManageActivities_PresentationController.prototype.createSameBankBenificiaryPresentationSuccess = function(succResponse) {
        scope_ManageActivitiesPresentationController.sameBankBenificiaryAdded = true;
        var navMan = applicationManager.getNavigationManager();
        var accntType = navMan.getCustomInfo("frmTransfersToAccount");
        var recipientsManager = applicationManager.getRecipientsManager();
        var benificiaryData=scope_ManageActivitiesPresentationController.getBenificiaryData();
        if (scope_ManageActivitiesPresentationController.getFlowType() === "OtherKonyBankMembersCreateTransfer") {
          //var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
          var accountsList=scope_ManageActivitiesPresentationController.getToAccounts();
          var internalAccList =scope_ManageActivitiesPresentationController.getAllInternalBankBenificiaries();
          internalAccList.push(succResponse.selectedAccountData);
          accountsList.internalBenificiaries = internalAccList;
          scope_ManageActivitiesPresentationController.setToAccountsList(accountsList);
          var transactionManager = applicationManager.getTransactionManager();
          scope_ManageActivitiesPresentationController.setBenAddressInTransactionObject(benificiaryData);
          transactionManager.setTransactionAttribute("isRecipientAdded",true);
          transactionManager.setTransactionAttribute("countryName", benificiaryData.countryName);
          transactionManager.setTransactionAttribute("bankName", benificiaryData.bankName);
          transactionManager.setTransactionAttribute("addedRecipientDetails",succResponse.selectedAccountData);
          transactionManager.setTransactionAttribute("serviceName", 'INTRA_BANK_FUND_TRANSFER_CREATE');
          var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
          controller.navigateToAmountScreen();
        }
        if (scope_ManageActivitiesPresentationController.getFlowType() === "SameBankRecipients") {
            scope_ManageActivitiesPresentationController.fetchSameBankRecepients();
        }
    };
    ManageActivities_PresentationController.prototype.createSameBankBenificiaryPresentationError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
            controller.bindGenericError(err.errorMessage);
        }
    };
    ManageActivities_PresentationController.prototype.createExternalBenificiary = function(flowType) {
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
          scope_ManageActivitiesPresentationController.setFlowType("OtherBankRecipients");
      }
        navMan.setCustomInfo("frmTransfersToAccount", toDetails);
        var recipientsManager = applicationManager.getRecipientsManager();
        var benificiaryData=scope_ManageActivitiesPresentationController.getBenificiaryData();
        //benificiaryData.accountType = "Savings"; //Temp addition, because mobile doesn't have UI for selecting account type
      	var configManager = applicationManager.getConfigurationManager();
      	if(configManager.isSMEUser === "true" || configManager.isMBBUser === "true" || configManager.isCombinedUser == "true"){
        	benificiaryData.isBusinessPayee = "1";
      	}
      	else{
        	benificiaryData.isBusinessPayee = "0";
      	}
        if (flowType === "MANAGE") {
            recipientsManager.createABenificiary(benificiaryData, scope_ManageActivitiesPresentationController.createBenificiaryManageFlowPresentationSuccess.bind(this, benificiaryData), scope_ManageActivitiesPresentationController.createBenificiaryManageFlowPresentationError);
        }
        else {
            recipientsManager.createABenificiary(benificiaryData, scope_ManageActivitiesPresentationController.createOtherBankBenificiaryPresentationSuccess, scope_ManageActivitiesPresentationController.createOtherBankBenificiaryPresentationError);
        } 
    };
    ManageActivities_PresentationController.prototype.createOtherBankBenificiaryPresentationSuccess = function(succResponse) {
        scope_ManageActivitiesPresentationController.otherBankBenificiaryAdded = true;
        var navMan = applicationManager.getNavigationManager();
        var accntType = navMan.getCustomInfo("frmTransfersToAccount");
       var benificiaryData=scope_ManageActivitiesPresentationController.getBenificiaryData();
       if (scope_ManageActivitiesPresentationController.getFlowType() === "OtherBankRecipientsCreateTransfer") {
        //var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
        //transModPresentationController.getTransactions();
        var accountsList=scope_ManageActivitiesPresentationController.getToAccounts();
        var externalAccList=scope_ManageActivitiesPresentationController.getAllExternalBankBenificiaries();
         if (succResponse.selectedAccountData && !succResponse.selectedAccountData.accountNumber) {
           succResponse.selectedAccountData.accountNumber = succResponse.selectedAccountData.IBAN;
         }
      	 externalAccList.push(succResponse.selectedAccountData);
         accountsList.externalBenificiaries=externalAccList;
        scope_ManageActivitiesPresentationController.setToAccountsList(accountsList);
         var transactionManager = applicationManager.getTransactionManager();
         scope_ManageActivitiesPresentationController.setBenAddressInTransactionObject(benificiaryData);
         transactionManager.setTransactionAttribute("isRecipientAdded",true);
         transactionManager.setTransactionAttribute("countryName", benificiaryData.countryName);
         transactionManager.setTransactionAttribute("bankName", benificiaryData.bankName);
         transactionManager.setTransactionAttribute("addedRecipientDetails",succResponse.selectedAccountData);
         transactionManager.setTransactionAttribute("serviceName", 'INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE');
        var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
        controller.navigateToAmountScreen();
      }
        if (scope_ManageActivitiesPresentationController.getFlowType() === "OtherBankRecipients") {
            scope_ManageActivitiesPresentationController.fetchOtherBankRecepients();
        }
    };
    ManageActivities_PresentationController.prototype.createOtherBankBenificiaryPresentationError = function(errResponse) {
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if (errResponse["isServerUnreachable"])
		  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errResponse);
		else if (scope_ManageActivitiesPresentationController.getFlowType() === "OtherBankAccountsCreateTransfer") {
		  var navMan = applicationManager.getNavigationManager();
		  var accntType = navMan.getCustomInfo("frmTransfersToAccount");
		  accntType.newBeneficiaryAdded = "false";
		  accntType.errMsg = errResponse;
		  navMan.getCustomInfo("frmTransfersToAccount",accntType);
		  scope_ManageActivitiesPresentationController.navAfterToAcc();
		}
		else {
		  kony.print("Error in create same bank recipients");
		  var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
		  controller.bindGenericError(errResponse.errorMessage);
		}
    };
  
  	    ManageActivities_PresentationController.prototype.createBenificiaryManageFlowPresentationSuccess = function(beneficiaryData, response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var referenceId = response.Id;
        var navMan = applicationManager.getNavigationManager();
        var segData = scope_ManageActivitiesPresentationController.getAcknowledgementSegmentData("ADD", referenceId);
        var beneficiaryName = beneficiaryData.beneficiaryName;
          var title = beneficiaryName + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.BenAdded");
          if(response.transactionStatus && response.transactionStatus.toUpperCase() === "PENDING"){
             title = beneficiaryName + " " + applicationManager.getPresentationUtility().getStringFromi18n("i18n.TransfersEur.SubmittedForApproval");
          }
        var ackdata = {
            "title": title,
            "segData": segData,
            "screenType": "ADD"
        };
        navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
        scope_ManageActivitiesPresentationController.isNavigated = true;
        navMan.navigateTo({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
    };

    ManageActivities_PresentationController.prototype.createBenificiaryManageFlowPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        else {
            var navMan = applicationManager.getNavigationManager();
            var ackdata = {
                "title": errorResponse.errorMessage
            }
            navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
            scope_ManageActivitiesPresentationController.isNavigated = true;
            navMan.navigateTo({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
        }
    };
  
    ManageActivities_PresentationController.prototype.navigateToTransfersChecking = function(data) {
               scope_ManageActivitiesPresentationController.clearBuilderNonGeneratedAttributes();
         var transMan = applicationManager.getTransactionManager();
                      transMan.clearTransferObject();
         scope_ManageActivitiesPresentationController.accDetHomeAcc=data["accountID"];
          var navMan = applicationManager.getNavigationManager();
                 navMan.setCustomInfo("frmTransfersDuration", {});
                 navMan.navigateTo("frmTransactionModeEurope");
                    scope_ManageActivitiesPresentationController.setFromAccountsForTransactions(data);       
               
            };

	
     
    ManageActivities_PresentationController.prototype.setTransactionObject = function(transactionData) {
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
        scope_ManageActivitiesPresentationController.transactionMode = scope_ManageActivitiesPresentationController.getTypeByAction(action);
             scope_ManageActivitiesPresentationController.numberOfAsync = 2;
      
      scope_ManageActivitiesPresentationController.asyncManager.initiateAsyncProcess(scope_ManageActivitiesPresentationController.numberOfAsync);
      scope_ManageActivitiesPresentationController.isNavigated = false;
      accMan.fetchInternalAccounts(scope_ManageActivitiesPresentationController.fromAccountPresentationSuccessCallBack, scope_ManageActivitiesPresentationController.fromAccountPresentationErrorCallBack);
      configManager.fetchLimitsForAnAction(action,scope_ManageActivitiesPresentationController.fetchLimitsAndFromAccSuccess,scope_ManageActivitiesPresentationController.fetchLimitsAndFromAccErrorCallback);
      }else{
        scope_ManageActivitiesPresentationController.showPreferredAccount();

      }
      
    };
    ManageActivities_PresentationController.prototype.setFlowType = function(type) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setFlowType(type);
    };
    ManageActivities_PresentationController.prototype.getFlowType = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.getFlowType();
    };
    ManageActivities_PresentationController.prototype.getAllInternalBankBenificiaries = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.getAllInternalBenificiaries().ExternalAccounts;
    };
    ManageActivities_PresentationController.prototype.getAllExternalBankBenificiaries = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.getAllExternalBenificiaries().ExternalAccounts;
    };
    ManageActivities_PresentationController.prototype.clearBenificiaryData = function() {
      scope_ManageActivitiesPresentationController.clearBuilderNonGeneratedAttributes();
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.clearBeneficiaryObject();
    };
    ManageActivities_PresentationController.prototype.getBenificiaryData = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.getBenificiaryData();
    };
    ManageActivities_PresentationController.prototype.setIsSameBankBenificiary = function(value) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setIsSameBankBenificiary(value);
    };
    ManageActivities_PresentationController.prototype.setTransferToInfo = function() {
      var transactionManager = applicationManager.getTransactionManager();
      transactionManager.clearTransferObject();
      var navManager = applicationManager.getNavigationManager();
      var transferModPresentationController = applicationManager.getModulesPresentationController("ManageActivitiesUIModule");
      var benificiaryDetails = transferModPresentationController.getBenificiaryData();
      var transferDetails = {};
      transferDetails.selectedAccountData = benificiaryDetails;
      var transMan = applicationManager.getTransactionManager();
      if(benificiaryDetails["isInternationalAccount"]=="true")
        transMan.setTransactionAttribute("transferType","international");
      else
        transMan.setTransactionAttribute("transferType","domestic");
      transMan.setTransactionAttribute("toAccountNumber",benificiaryDetails["accountNumber"]);
      scope_ManageActivitiesPresentationController.setToBankName(benificiaryDetails["bankName"]);
      transMan.setTransactionAttribute("toAccountName",benificiaryDetails["nickName"]);
      transMan.setTransactionAttribute("toAccountType",benificiaryDetails["accountType"]);
      transMan.setTransactionAttribute("transactionType","ExternalTransfer");
      navManager.setCustomInfo("frmTransfersToAccount", transferDetails);
      var transModPresentationController = applicationManager.getModulesPresentationController("ManageActivitiesUIModule");
      transModPresentationController.navAfterToAcc();
    };
    ManageActivities_PresentationController.prototype.getBankName = function() {
        var configMan = applicationManager.getConfigurationManager();
        return configMan.getBankName();
    };
    ManageActivities_PresentationController.prototype.transfersModule = function() {
        //var transModPresentationController = applicationManager.getModulesPresentationController("ManageActivitiesUIModule");
        // transModPresentationController.showFromAccounts();
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.clearTransferObject();
        scope_ManageActivitiesPresentationController.clearBuilderNonGeneratedAttributes();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersDuration", {});
        navMan.setEntryPoint("makeatransfer", "frmTransfersEurope");
        navMan.navigateTo("frmTransactionModeEurope");
    };
     
   ManageActivities_PresentationController.prototype.fromAccountPresentationSuccessCallBack = function(res){
     scope_ManageActivitiesPresentationController.asyncManager.setSuccessStatus(0, res);
        if (scope_ManageActivitiesPresentationController.asyncManager.areAllMandatoryservicesDone(scope_ManageActivitiesPresentationController.numberOfAsync,[1])&& !scope_ManageActivitiesPresentationController.isNavigated) {
           var accNav = applicationManager.getAccountManager();
           var frmacc = accNav.getFromTransferSupportedAccounts();
           var navMan = applicationManager.getNavigationManager();
           navMan.setCustomInfo("frmTransfersFromAccount",
                                {"fromaccounts": frmacc});
           scope_ManageActivitiesPresentationController.isNavigated = true;
           navMan.navigateTo("frmTransferAmountEurope");
        }
   };
     ManageActivities_PresentationController.prototype.fromAccountPresentationErrorCallBack = function(err){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
       scope_ManageActivitiesPresentationController.asyncManager.setErrorStatus(0, err);
		if (error["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
		else
			kony.print("error in showFromAccountsPresentationErrorCallBack");
     };
     ManageActivities_PresentationController.prototype.fetchLimitsAndFromAccSuccess = function(res){
       scope_ManageActivitiesPresentationController.limitsData = res;
     scope_ManageActivitiesPresentationController.asyncManager.setSuccessStatus(1, res);
        if (scope_ManageActivitiesPresentationController.asyncManager.areAllMandatoryservicesDone(scope_ManageActivitiesPresentationController.numberOfAsync,[1])&& !scope_ManageActivitiesPresentationController.isNavigated) {
           var accNav = applicationManager.getAccountManager();
           var frmacc = accNav.getFromTransferSupportedAccounts();
           var navMan = applicationManager.getNavigationManager();
           navMan.setCustomInfo("frmTransfersFromAccount",
                                {"fromaccounts": frmacc});
           scope_ManageActivitiesPresentationController.isNavigated = true;
           navMan.navigateTo("frmTransferAmountEurope");
        }
   };
     ManageActivities_PresentationController.prototype.fetchLimitsAndFromAccErrorCallback = function(err){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
       scope_ManageActivitiesPresentationController.asyncManager.setErrorStatus(1, err);
      if(scope_ManageActivitiesPresentationController.asyncManager.areAllMandatoryservicesDone(scope_PayAPersonPresentationController.numberOfAsyncForPayees,[1])&& !scope_ManageActivitiesPresentationController.isNavigated)
      {
        var accNav = applicationManager.getAccountManager();
           var frmacc = accNav.getFromTransferSupportedAccounts();
           var navMan = applicationManager.getNavigationManager();
           navMan.setCustomInfo("frmTransfersFromAccount",
                                {"fromaccounts": frmacc});
           scope_ManageActivitiesPresentationController.isNavigated = true;
           navMan.navigateTo("frmTransferAmountEurope");
      }
        kony.print("error in fetching limits");
     };

    ManageActivities_PresentationController.prototype.navigateToTransfers = function(data) {
        var navMan = applicationManager.getNavigationManager();
        var transMan = applicationManager.getTransactionManager();
        scope_ManageActivitiesPresentationController.clearBuilderNonGeneratedAttributes();
        transMan.clearTransferObject();
        scope_ManageActivitiesPresentationController.accDetHomeAcc=data["accountID"];
        transMan.setTransactionAttribute("toAccountNumber",data["accountID"]);
        scope_ManageActivitiesPresentationController.setToBankName(data["bankName"]);
        transMan.setTransactionAttribute("toAccountName",data["nickName"]);
        transMan.setTransactionAttribute("toAccountType",data["accountType"]);
        transMan.setTransactionAttribute("transactionType","InternalTransfer");
        //alert(transMan.getP2PObject());
        //scope_ManageActivitiesPresentationController.showFromAccounts();
        var accMan = applicationManager.getAccountManager();
        var preAccData = accMan.getTransfersPreferredAccount();
        if (preAccData) {
            scope_ManageActivitiesPresentationController.setFromAccountsForTransactions(preAccData);
            scope_ManageActivitiesPresentationController.showFromAccounts(scope_ManageActivitiesPresentationController.fromAccountOnContinuePresentationSuccessCallBack);
            //navMan.navigateTo("frmTransferAmount");
        } else {
            scope_ManageActivitiesPresentationController.showFromAccounts(scope_ManageActivitiesPresentationController.fromAccountsPresentationSuccessCallBack);
            // navMan.navigateTo("frmTransfersFromAccount");
        }
        //  scope_ManageActivitiesPresentationController.showPreferredAccount();
    };
  	ManageActivities_PresentationController.prototype.navigateToTransfersFromDetails = function(data) {
        var navMan = applicationManager.getNavigationManager();
        var transMan = applicationManager.getTransactionManager();
        scope_ManageActivitiesPresentationController.clearBuilderNonGeneratedAttributes();
        transMan.clearTransferObject();
        scope_ManageActivitiesPresentationController.accDetHomeAcc=data["accountID"];
        transMan.setTransactionAttribute("toAccountNumber",data["accountID"]);
        scope_ManageActivitiesPresentationController.setToBankName(data["bankName"]);
        transMan.setTransactionAttribute("toAccountName",data["nickName"]);
        transMan.setTransactionAttribute("toAccountType",data["accountType"]);
        transMan.setTransactionAttribute("transactionType","InternalTransfer");
        //alert(transMan.getP2PObject());
        //scope_ManageActivitiesPresentationController.showFromAccounts();
        var accMan = applicationManager.getAccountManager();
        var preAccData = accMan.getTransfersPreferredAccount();
        scope_ManageActivitiesPresentationController.numberOfAsync = 2;
        if (preAccData) {
          	var configManager=applicationManager.getConfigurationManager();
            var action = data.serviceName;
            if(action){
                scope_ManageActivitiesPresentationController.setFromAccountsForTransactions(preAccData);
                //scope_ManageActivitiesPresentationController.showFromAccounts(scope_ManageActivitiesPresentationController.fromAccountOnContinuePresentationSuccessCallBack);
                scope_ManageActivitiesPresentationController.asyncManager.initiateAsyncProcess(scope_ManageActivitiesPresentationController.numberOfAsync);
                scope_ManageActivitiesPresentationController.isNavigated = false;
                accMan.fetchInternalAccounts(scope_ManageActivitiesPresentationController.fromAccountOnContinueAsyncPresentationSuccessCallBack, scope_ManageActivitiesPresentationController.fetchInternalAccPresentationErrorCallBack);
                configManager.fetchLimitsForAnAction(action,scope_ManageActivitiesPresentationController.limitsOnContinueAsyncPresentationSuccessCallBack,scope_ManageActivitiesPresentationController.limitsOnContinueAsyncPresentationErrorCallBack);
        	}else{
              scope_ManageActivitiesPresentationController.setFromAccountsForTransactions(preAccData);
              scope_ManageActivitiesPresentationController.showFromAccounts(scope_ManageActivitiesPresentationController.fromAccountOnContinuePresentationSuccessCallBack);
            }
            //navMan.navigateTo("frmTransferAmount");
        } else {
          var configManager=applicationManager.getConfigurationManager();
            var action = data.serviceName;
            if(action){
                  scope_ManageActivitiesPresentationController.asyncManager.initiateAsyncProcess(scope_ManageActivitiesPresentationController.numberOfAsync);
                  scope_ManageActivitiesPresentationController.isNavigated = false;
            	accMan.fetchInternalAccounts(scope_ManageActivitiesPresentationController.fromAccountsAsyncPresentationSuccessCallBack, scope_ManageActivitiesPresentationController.fetchInternalAccPresentationErrorCallBack);
            	configManager.fetchLimitsForAnAction(action,scope_ManageActivitiesPresentationController.limitsOnContinueAsyncPresentationSuccessCallBack,scope_ManageActivitiesPresentationController.limitsOnContinueAsyncPresentationErrorCallBack);
			}else{
            	scope_ManageActivitiesPresentationController.showFromAccounts(scope_ManageActivitiesPresentationController.fromAccountsPresentationSuccessCallBack);
            }
            // navMan.navigateTo("frmTransfersFromAccount");
        }
        //  scope_ManageActivitiesPresentationController.showPreferredAccount();
    };
  ManageActivities_PresentationController.prototype.fromAccountOnContinueAsyncPresentationSuccessCallBack = function(res){
        scope_ManageActivitiesPresentationController.asyncManager.setSuccessStatus(0, res);
        if (scope_ManageActivitiesPresentationController.asyncManager.areAllMandatoryservicesDone(scope_ManageActivitiesPresentationController.numberOfAsync,[1])&& !scope_ManageActivitiesPresentationController.isNavigated) {
          var accNav = applicationManager.getAccountManager();
          var frmacc = accNav.getFromTransferSupportedAccounts();
          var navMan = applicationManager.getNavigationManager();
          navMan.setCustomInfo("frmTransfersFromAccount", {
              "fromaccounts": frmacc
          });
          scope_ManageActivitiesPresentationController.isNavigated =  true;
          navMan.navigateTo("frmTransferAmountEurope");
        }
    };
  	ManageActivities_PresentationController.prototype.fetchInternalAccPresentationErrorCallBack = function(error){
    scope_ManageActivitiesPresentationController.asyncManager.setErrorStatus(0, error);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    else
        kony.print("error in fetchInternalAccPresentationErrorCallBack");
    };
  	ManageActivities_PresentationController.prototype.limitsOnContinueAsyncPresentationSuccessCallBack = function(res){
        scope_ManageActivitiesPresentationController.limitsData = res;
        scope_ManageActivitiesPresentationController.asyncManager.setSuccessStatus(1, res);
        if (scope_ManageActivitiesPresentationController.asyncManager.areAllMandatoryservicesDone(scope_ManageActivitiesPresentationController.numberOfAsync,[1])&& !scope_ManageActivitiesPresentationController.isNavigated) {
        	var accNav = applicationManager.getAccountManager();
          var frmacc = accNav.getFromTransferSupportedAccounts();
          var navMan = applicationManager.getNavigationManager();
          navMan.setCustomInfo("frmTransfersFromAccount", {
              "fromaccounts": frmacc
          });
          scope_ManageActivitiesPresentationController.isNavigated = true;
          navMan.navigateTo("frmTransferAmountEurope");
      }
    };
  	ManageActivities_PresentationController.prototype.limitsOnContinueAsyncPresentationErrorCallBack = function(error){
        scope_ManageActivitiesPresentationController.asyncManager.setErrorStatus(1, error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (scope_ManageActivitiesPresentationController.asyncManager.areAllMandatoryservicesDone(scope_ManageActivitiesPresentationController.numberOfAsync,[1])&& !scope_ManageActivitiesPresentationController.isNavigated) {
            var accNav = applicationManager.getAccountManager();
          var frmacc = accNav.getFromTransferSupportedAccounts();
          var navMan = applicationManager.getNavigationManager();
          navMan.setCustomInfo("frmTransfersFromAccount", {
              "fromaccounts": frmacc
          });
          scope_ManageActivitiesPresentationController.isNavigated = true;
          navMan.navigateTo("frmTransferAmountEurope");
        }
        kony.print("error in limitsOnContinueAsyncPresentationErrorCallBack");

    };
  ManageActivities_PresentationController.prototype.fromAccountsAsyncPresentationSuccessCallBack = function(res){
        scope_ManageActivitiesPresentationController.asyncManager.setSuccessStatus(0, res);
        if (scope_ManageActivitiesPresentationController.asyncManager.areAllMandatoryservicesDone(scope_ManageActivitiesPresentationController.numberOfAsync,[1])&& !scope_ManageActivitiesPresentationController.isNavigated) {
        var accNav = applicationManager.getAccountManager();
        var frmacc = accNav.getFromTransferSupportedAccounts();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersFromAccount", {
            "fromaccounts": frmacc
        });
        scope_ManageActivitiesPresentationController.isNavigated = true;
        navMan.navigateTo("frmTransfersFromAccountEurope");
      }
    };
    ManageActivities_PresentationController.prototype.fetchInternationalRecepients = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.fetchInternationalRecepients(scope_ManageActivitiesPresentationController.fetchInternationalRecepientsPresentationSuccess, scope_ManageActivitiesPresentationController.fetchInternationalRecepientsPresentationError);
    };
    ManageActivities_PresentationController.prototype.fetchInternationalRecepientsPresentationSuccess = function() {
         var currentForm = kony.application.getCurrentForm().id;
        if(currentForm === "frmTransactionModeEurope"){
            scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmTransferToAccountInterEurope");
        } else {
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmTransfersManageRecipientList");
        }
    };
    ManageActivities_PresentationController.prototype.fetchInternationalRecepientsPresentationError = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
    };
    ManageActivities_PresentationController.prototype.navigateToEnterBenificiaryAccountNumberFromSwiftCode = function(swiftCode, bankName) {
        var recipientsManager = applicationManager.getRecipientsManager();
        scope_ManageActivitiesPresentationController.setSwiftCode(swiftCode);
		scope_ManageActivitiesPresentationController.setBankNameFromResponse(bankName);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEnterBenAccNoEurope");
    };
    ManageActivities_PresentationController.prototype.navigateToEnterSwiftCode = function(countryName) {
        var recipientsManager = applicationManager.getRecipientsManager();
        scope_ManageActivitiesPresentationController.setCountryName(countryName);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmTransferEuropeSearchSwiftCode");
    };
	  ManageActivities_PresentationController.prototype.navigateToEnterBenificiaryNameFromIBAN = function(IBAN, bankName) {
        var recipientsManager = applicationManager.getRecipientsManager();
        scope_ManageActivitiesPresentationController.setIBAN(IBAN);
        recipientsManager.setBeneficiaryAttribute("IBAN", IBAN);
        scope_ManageActivitiesPresentationController.setBankNameFromResponse(bankName);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenNameEurope");
    };
    ManageActivities_PresentationController.prototype.createInternationalBenificiary = function(flowType) {
        var navMan = applicationManager.getNavigationManager();
        var recipientsManager = applicationManager.getRecipientsManager();
        var benificiaryData=scope_ManageActivitiesPresentationController.getBenificiaryData();
        if(navMan.getEntryPoint("createEuropeExternalBenificiaries")==="frmTransfersManageRecipientList"){
          scope_ManageActivitiesPresentationController.setFlowType("InternationalRecipients");
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
        	recipientsManager.createABenificiary(benificiaryData, scope_ManageActivitiesPresentationController.createBenificiaryManageFlowPresentationSuccess.bind(this, benificiaryData), scope_ManageActivitiesPresentationController.createBenificiaryManageFlowPresentationError);
      	}
      	else {
        	recipientsManager.createABenificiary(benificiaryData, scope_ManageActivitiesPresentationController.createInternationalBenificiaryPresentationSuccess, scope_ManageActivitiesPresentationController.createInternationalBenificiaryPresentationError);
      	}    
    };
    ManageActivities_PresentationController.prototype.createInternationalBenificiaryPresentationSuccess = function(succResponse) {
      scope_ManageActivitiesPresentationController.internationalBenificiaryAdded = true;
      var navMan = applicationManager.getNavigationManager();
      var accntType = navMan.getCustomInfo("frmTransfersToAccount");
      var recipientsManager = applicationManager.getRecipientsManager();
      var benificiaryData=scope_ManageActivitiesPresentationController.getBenificiaryData();
      if (scope_ManageActivitiesPresentationController.getFlowType() === "InternationalRecipientCreateTransfer") {
        //var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
        //transModPresentationController.getTransactions();
        var accountsList=scope_ManageActivitiesPresentationController.getToAccounts();
        var internationalAccList =scope_ManageActivitiesPresentationController.getAllInternationalBenificiaries();
        internationalAccList.push(succResponse.selectedAccountData);
        accountsList.internationalBenificiaries = internationalAccList;
        scope_ManageActivitiesPresentationController.setToAccountsList(accountsList);
        var transactionManager = applicationManager.getTransactionManager();
        scope_ManageActivitiesPresentationController.setBenAddressInTransactionObject(benificiaryData);
        transactionManager.setTransactionAttribute("isRecipientAdded",true);
        transactionManager.setTransactionAttribute("addedRecipientDetails",succResponse.selectedAccountData);
        transactionManager.setTransactionAttribute("countryName", benificiaryData.countryName);
        transactionManager.setTransactionAttribute("bankName", benificiaryData.bankName);
        transactionManager.setTransactionAttribute("serviceName", 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE');
        var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
        controller.navigateToAmountScreen();
      }
        if (scope_ManageActivitiesPresentationController.getFlowType() === "InternationalRecipients") {
            scope_ManageActivitiesPresentationController.fetchInternationalRecepients();
        }
    };
    ManageActivities_PresentationController.prototype.createInternationalBenificiaryPresentationError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
            controller.bindGenericError(err.errorMessage);
        }
    };
    ManageActivities_PresentationController.prototype.saveChangedBeneficiaryDetails = function(data, editedInfo) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        applicationManager.getRecipientsManager().editABenificiary(editedInfo, this.saveChangedBeneficiaryDetailsSuccess.bind(this, data), this.saveChangedBeneficiaryDetailsFailure.bind(this, "frmBeneficiaryDetailsEurope"));
    };
    ManageActivities_PresentationController.prototype.saveChangedBeneficiaryDetailsSuccess = function(data, response) {
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
      scope_ManageActivitiesPresentationController.isNavigated = true;
      navMan.navigateTo({"appName":"TransfersMA","friendlyName":"ManageActivitiesUIModule/frmBeneficiaryDetailsEurope"});
      if (data.successMessage) {
        var controller = applicationManager.getPresentationUtility().getController("frmBeneficiaryDetailsEurope", true);
        controller.showSuccessPopup(data.successMessage);
      }
    };
  
     ManageActivities_PresentationController.prototype.saveChangedBeneficiaryDetailsFailure = function(formName, errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	  if (errorResponse["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
      else {
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({"appName":"TransfersMA","friendlyName":"ManageActivitiesUIModule/frmBeneficiaryDetailsEurope"});
		var controller = applicationManager.getPresentationUtility().getController(formName, true);
    	controller.bindGenericError(errorResponse.errorMessage);
      }  
    };
  
    ManageActivities_PresentationController.prototype.editedBeneficiaryDetails = function (recipient,data) {
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
	
    ManageActivities_PresentationController.prototype.getAllInternationalBenificiaries = function(err) {
        var recipientManager = applicationManager.getRecipientsManager();
        return recipientManager.getAllInternationalBenificiaries().ExternalAccounts;
    }
    ManageActivities_PresentationController.prototype.navigateToTransfersRecipientDetails = function(data) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryObject(data);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmManageTransferRecipientInfoEurope");
    }
    ManageActivities_PresentationController.prototype.fetchCountriesList = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.fetchCountriesList(scope_ManageActivitiesPresentationController.fetchCountriesListSuccessCallBack, scope_ManageActivitiesPresentationController.fetchCountriesListErrorCallBack);
    };
    ManageActivities_PresentationController.prototype.fetchCountriesListSuccessCallBack = function(countryList) {
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmBenCountryEurope", countryList);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenCountryEurope");
    };
    ManageActivities_PresentationController.prototype.fetchCountriesListErrorCallBack = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmManageRecipientList', true);
            controller.bindGenericError(err.errorMessage);
        }
    };
	  /** fetches Bank Details For InternationalTransfer
    * @param {String} swiftCode swift code
    * @param {String} serviceName  service name
    */
  ManageActivities_PresentationController.prototype.fetchBankDetailsForInternationalTransfer = function (swiftCode, serviceName) {
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
  ManageActivities_PresentationController.prototype.fetchBankDetailsForInternationalTransferSuccess = function (response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var currentForm = kony.application.getCurrentForm().id;
    var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
     controller.validateSwiftcode(response.bankName);
  };
  /** Failure callback when fetching of bank details for international transfer fails
     */
  ManageActivities_PresentationController.prototype.fetchBankDetailsForInternationalTransferFailure = function (err) {
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
  ManageActivities_PresentationController.prototype.fetchBankDetailsForDomesticTransfer = function (IBAN, serviceName) {
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
  ManageActivities_PresentationController.prototype.fetchBankDetailsForDomesticTransferSuccess = function (response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var currentForm = kony.application.getCurrentForm().id;
    var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
     controller.validateIBAN(response.bankName);
  };
  /** Failure callback when fetching of bank details for DomesticRecepient fails
     */
  ManageActivities_PresentationController.prototype.fetchBankDetailsForDomesticTransferFailure = function (err) {
     applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmtransfersIBANEurope', true);
            controller.bindGenericError(err.errorMessage);
        }
  };
    ManageActivities_PresentationController.prototype.isValidAccNum = function(accNum, formName) {
        var validationUtility = applicationManager.getValidationUtilManager();
        if (validationUtility.isValidAccountNumber(accNum)) {
            return true;
        } else {
            var controller = applicationManager.getPresentationUtility().getController(formName, true);
            controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.InvalidAccountNumber"));
            return false;
        }
    };
    ManageActivities_PresentationController.prototype.isValidSwiftCode = function(swiftCode, formName) {
        var validationUtility = applicationManager.getValidationUtilManager();
        if (validationUtility.isValidSwiftCode(swiftCode)) {
          if(scope_ManageActivitiesPresentationController.validateSwiftRegex(swiftCode, formName))
            return true;
          else
            return false;
        } else {
            var controller = applicationManager.getPresentationUtility().getController(formName, true);
            controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.InvalidSwiftCode"));
            return false;
        }
    };
    ManageActivities_PresentationController.prototype.validateSwiftRegex = function(swiftCode, formName) {
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
	 ManageActivities_PresentationController.prototype.isValidIBAN = function(IBAN, formName) {
        var validationUtility = applicationManager.getValidationUtilManager();
        if (validationUtility.isValidIBAN(IBAN)) {
            return true;
        } else {
           var controller = applicationManager.getPresentationUtility().getController(formName, true);
           controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transferEurope.invalidIBAN"));
           return false;
        }
    };
    ManageActivities_PresentationController.prototype.setBenificiaryDetails = function(benificiaryData) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryObject(benificiaryData);
    };
  	ManageActivities_PresentationController.prototype.isEligibleTransferType = function(transferType){
      var configManager = applicationManager.getConfigurationManager();
      return configManager.getConfigurationValue(transferType);
    }
    
    ManageActivities_PresentationController.prototype.getTermsAndConditionsEurope = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var config = applicationManager.getConfigurationManager();
    var locale=config.getLocale();
    var termsAndConditions=config.getTermsAndConditions();
    var param={
     "languageCode": termsAndConditions[locale],
      "termsAndConditionsCode": termsAndConditions["SEPA_TnC"]
   };
    var termsAndConditions = applicationManager.getTermsAndConditionsManager();
    termsAndConditions.fetchTermsAndConditionsPostLogin(param,scope_ManageActivitiesPresentationController.getTermsandConditionsSuccessCallBack,scope_ManageActivitiesPresentationController.getTermsandConditionsErrorCallback);
  };
  ManageActivities_PresentationController.prototype.getTermsandConditionsSuccessCallBack = function(response){
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
  ManageActivities_PresentationController.prototype.getTermsandConditionsErrorCallback = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	 if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
   	 }else{
      var controller = applicationManager.getPresentationUtility().getController('frmTransferConfirmationEurope', true);
      controller.bindGenericError(err.errorMessage);
      }
  };
  //   ManageActivities_PresentationController.prototype.fetchLimits = function(action){
  //     var configManager=applicationManager.getConfigurationManager();
  //    configManager.fetchLimitsForAnAction(action,scope_ManageActivitiesPresentationController.fetchLimitsSuccessCallBack,scope_ManageActivitiesPresentationController.fetchLimitsErrorCallBack);
  // };
    // ManageActivities_PresentationController.prototype.fetchLimitsSuccessCallBack = function(res){
    //     scope_ManageActivitiesPresentationController.limitsData = res;   
    // };
    // ManageActivities_PresentationController.prototype.fetchLimitsErrorCallBack = function(err)
    // {
    //     kony.print("error in fetching limits");
    // };
    ManageActivities_PresentationController.prototype.getActionByType = function (type) {
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
  ManageActivities_PresentationController.prototype.getTypeByAction = function (action) {
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
    ManageActivities_PresentationController.prototype.setLimitsForTransaction = function(accountId){
        var type = scope_ManageActivitiesPresentationController.transactionMode;
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
    ManageActivities_PresentationController.prototype.setLimits = function(minLimit,maxLimit,i){
        applicationManager.getConfigurationManager().setConfigurationValue(minLimit, this.limitsData["accounts"][i]["limits"]["MIN_TRANSACTION_LIMIT"]);
        applicationManager.getConfigurationManager().setConfigurationValue(maxLimit, this.limitsData["accounts"][i]["limits"]["MAX_TRANSACTION_LIMIT"]);
    };


    //----------------------------------------------------------------------------------------------------------------------------------

    ManageActivities_PresentationController.prototype.getFromAccounts = function(successCallback) {
        var accountManager = applicationManager.getAccountManager();
        scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus={};
        if (successCallback) {
          accountManager.fetchInternalAccounts(successCallback, scope_ManageActivitiesPresentationController.fromAccountsPresentationErrorCallBack);
        }  
        else {
          accountManager.fetchInternalAccounts(scope_ManageActivitiesPresentationController.fromAccountsPresentationSuccessCallBack, scope_ManageActivitiesPresentationController.fromAccountsPresentationErrorCallBack);
        }
        if (scope_ManageActivitiesPresentationController.getEuropeFlowType() === "INTERNAL") {
        	scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.creditCardAccountsStatus = 0;
        	accountManager.fetchCreditCardAccounts(scope_ManageActivitiesPresentationController.fetchCreditCardsPresentationSuccess, scope_ManageActivitiesPresentationController.fetchCreditCardsPresentationError);
        }  
      };

      ManageActivities_PresentationController.prototype.fetchCreditCardsPresentationSuccess = function(response) {
        scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.creditCardAccountsStatus = 1;
        scope_ManageActivitiesPresentationController.asyncResponseData.CreditCardAccountsData = response;
        if (scope_ManageActivitiesPresentationController.areAllServicesDone()) {
          scope_ManageActivitiesPresentationController.navigateToShowToListOwnAccounts();
        }
      };

      ManageActivities_PresentationController.prototype.fetchCreditCardsPresentationError = function(res) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]){
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
        else{
          kony.print("error in showFromAccountsPresentationErrorCallBack");
        }
      };

      ManageActivities_PresentationController.prototype.navigateToShowToListOwnAccounts = function() {
        scope_ManageActivitiesPresentationController.toAccountList.CreditCardAccounts = scope_ManageActivitiesPresentationController.asyncResponseData.CreditCardAccountsData;
        var controller = applicationManager.getPresentationUtility().getController('frmEuropeTransferToAccount', true);
        if (scope_ManageActivitiesPresentationController.toAccountList.CreditCardAccounts.length === 0 )
          controller.bindDataAfterTransition(1);
        else
          controller.bindDataAfterTransition(0);
      };
    
      ManageActivities_PresentationController.prototype.fromAccountsPresentationSuccessCallBack = function(res) {
        scope_ManageActivitiesPresentationController.setFromAndToAccounts(res);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation({"appName" : "TransfersMA", "friendlyName" : "TransferEuropeUIModule/frmEuropeTransferFromAccount"});
      };  
	  
	  ManageActivities_PresentationController.prototype.isEmptyOrNullOrUndefined = function (value) {
        var valueCheck = (value == "" || value == null || value == undefined) ? true : false;
        return valueCheck;
      };

      ManageActivities_PresentationController.prototype.setFromAndToAccounts = function(res) {
        var accountManager = applicationManager.getAccountManager();
        var fromSupportedAccounts = accountManager.getFromTransferSupportedAccounts();
        var toSupportedAccounts = accountManager.getToTransferSupportedAccounts();
		fromSupportedAccounts = this.isEmptyOrNullOrUndefined(fromSupportedAccounts) ? [] : fromSupportedAccounts;
        toSupportedAccounts = this.isEmptyOrNullOrUndefined(toSupportedAccounts) ? [] : toSupportedAccounts;
        scope_ManageActivitiesPresentationController.toSupportedOwnAccounts = toSupportedAccounts;
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmEuropeTransferFromAccount", {
          "fromaccounts": fromSupportedAccounts
        });
      };
  
  ManageActivities_PresentationController.prototype.getFromAndToSupportedCurrencies = function() {
    var transObj = scope_ManageActivitiesPresentationController.getTransObject();
    var formattedResponse = [];
    var currency = "";
    if (transObj.fromAccountCurrency === null || transObj.fromAccountCurrency === undefined) {
      currency =  " ";
    } else {
      currency = transObj.fromAccountCurrency;
    } formattedResponse.push(currency);
    if(scope_ManageActivitiesPresentationController.getEuropeFlowType() === "INTERNAL") {
     currency = transObj.transactionCurrency;
     formattedResponse.push(currency);
    }
     if(scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")) {
     currency = scope_ManageActivitiesPresentationController.toBenCurrency;
     formattedResponse.push(currency);
     }
    var formattedCurrency = formattedResponse.filter((data,index)=>{ return formattedResponse.indexOf(data) === index; })
    var finalCurrencyList = [];
    if (Array.isArray(formattedCurrency)) {
      for (var i = 0; i < formattedCurrency.length; i++) {
        var data = {};
        data.currency = formattedCurrency[i];
        finalCurrencyList.push(data);
      }
    }
    scope_ManageActivitiesPresentationController.supportedCurrencies = finalCurrencyList;
  };
    
      ManageActivities_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = kony.application.getCurrentForm();
        // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
        if(scope_ManageActivitiesPresentationController.stateNavigation && scope_ManageActivitiesPresentationController.stateTriggeredForm!==currentForm.id){
          navManager.navigateTo(scope_ManageActivitiesPresentationController.stateTriggeredForm,true);
          scope_ManageActivitiesPresentationController.stateNavigation=false;
          scope_ManageActivitiesPresentationController.stateTriggeredForm="";
        }
        // If state management is triggered and if it is on the state triggered form then we will navigate to specified form and ignoring it's entry into the navigation stack as the form is being re-visited
        else if(scope_ManageActivitiesPresentationController.stateNavigation){
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
      ManageActivities_PresentationController.prototype.fromAccountsPresentationErrorCallBack = function(error) {
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
      ManageActivities_PresentationController.prototype.commonFunctionForgoBack = function() {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = kony.application.getCurrentForm();
        // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
        if(scope_ManageActivitiesPresentationController.stateNavigation && scope_ManageActivitiesPresentationController.stateTriggeredForm!==currentForm.id){
          navManager.navigateTo(scope_ManageActivitiesPresentationController.stateTriggeredForm,true);
          scope_ManageActivitiesPresentationController.stateNavigation=false;
          scope_ManageActivitiesPresentationController.stateTriggeredForm="";
        }
        // This is triggered when the forms entry into navigation manager's stack is equal to one .
        else{
          navManager.goBack();
        }
      };
    
      /**
       * This method is used to handle the cancel navigation across the flow at a central place based on the entry points.
       */
      ManageActivities_PresentationController.prototype.cancelCommon = function() {
        this.clearEuropeFlowAtributes();
        var navManager = applicationManager.getNavigationManager();
        var navigateToForm = navManager.getEntryPoint("europeTransferFlow");
        navManager.setCustomInfo("removeAttachments",true);
        //specific check as we need to make a service call to refresh the account balances.
        if(navigateToForm=="frmDashboardAggregated" || navigateToForm == "frmDashboard"){
            var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountUIModule");
            accountMod.presentationController.showDashboard();
        }
        else{
            navManager.navigateTo(navigateToForm);
        }
      };
    
      /**
        * This method is used to clear the values in the model definition, reset state management and limit fetch status
        */
       ManageActivities_PresentationController.prototype.clearEuropeFlowAtributes=function(){
        scope_ManageActivitiesPresentationController.initializeStateData(false, "");
        scope_ManageActivitiesPresentationController.previousAccountType = null;
        scope_ManageActivitiesPresentationController.currentAccountType = null;
        scope_ManageActivitiesPresentationController.isLoansAccountType = false;
        scope_ManageActivitiesPresentationController.triggerOneTimePaymentFlow = false;
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.clearTransferObject();
      };
    
       /**
        * This method is used to initialise the state management flow
        * initialized- {boolean} hold the initialisation state value
        * triggeredForm - {String} holds the form name from where state management has been triggered.
        */
       ManageActivities_PresentationController.prototype.initializeStateData=function(initialized,triggeredForm){
        scope_ManageActivitiesPresentationController.stateNavigation = initialized;
        scope_ManageActivitiesPresentationController.stateTriggeredForm = triggeredForm;
      };
    
      /**
       * This method is used to process the internal accounts in the format required for initiating service call
       * data - {Array} holds the transfer supported accounts collection
       * screenType - {String} specifies the screen whether from or to based on which account balance type is assigned (ex: Credit card account in from screen should display available balance and in to should show outstanding balance).
       */
      ManageActivities_PresentationController.prototype.processAccountsData = function(data,screenType) {
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
          accProcessedData[i].availableBalance = scope_ManageActivitiesPresentationController.getAvailableBalanceCurrencyString(data[i],screenType);
          accProcessedData[i].accountID = data[i].accountID;
          accProcessedData[i].bankName = (data[i].bankName) ? data[i].bankName.trim() : data[i].bankName;
          accProcessedData[i].accountBalanceType = scope_ManageActivitiesPresentationController.getAvailableBalanceType(data[i],screenType);
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
      ManageActivities_PresentationController.prototype.getAvailableBalanceCurrencyString = function(data,screenType) {
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
      ManageActivities_PresentationController.prototype.getAvailableBalanceType = function(data,screenType) {
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
      ManageActivities_PresentationController.prototype.processViewFormattedData = function(data) {
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
    ManageActivities_PresentationController.prototype.processDataMembershipNameWise = function(data) {
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
      ManageActivities_PresentationController.prototype.orderByPriority = function(data) {
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
    
      ManageActivities_PresentationController.prototype.sortByPrefrence = function(accountsCollection) {
        if (accountsCollection.length > 1) accountsCollection.sort(function(record1, record2) {
          return record1.accountPreference - record2.accountPreference;
        });
        return accountsCollection;
      };
    
      /**
       * This method is a pass-through to return the transaction object
       */
      ManageActivities_PresentationController.prototype.getTransObject = function() {
        var transMan = applicationManager.getTransactionManager();
        var obj = transMan.getTransactionObject();
        return obj;
      };

      /**
   * This method is used to set the from account selection in the model definition object
   * selectedFromAccount - {Object} holds the from account selection
   */
  ManageActivities_PresentationController.prototype.setFromAccountsForTransactions = function(selectedFromAccount) {
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
    var transObj = scope_ManageActivitiesPresentationController.getTransObject();
    if (!transObj.transactionCurrency) {
      trasMan.setTransactionAttribute("transactionCurrency", selectedFromAccount.fromAccountCurrency);
    }
  };

   /**
    * This method is used to filter the from selection from the transfer to supported accounts.
    */
   ManageActivities_PresentationController.prototype.filterToAccountsByExludingFromAccount = function() {
    var transactionManager = applicationManager.getTransactionManager();
    this.filteredToAccounts = [];
    var toSupportedAccounts = scope_ManageActivitiesPresentationController.toSupportedOwnAccounts;
    if (toSupportedAccounts) {
      for (var i = 0; i < toSupportedAccounts.length; i++) {
        if (toSupportedAccounts[i]["accountID"] !== transactionManager.getTransactionObject().fromAccountNumber) {
          toSupportedAccounts[i]["transactionMode"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          this.filteredToAccounts.push(toSupportedAccounts[i]);
        }
      }
    }
    scope_ManageActivitiesPresentationController.processAccountsData(this.filteredToAccounts);
  };

    /**
     * This method is a getter method to access transfer to supported accounts excluding from account selection.
     */
    ManageActivities_PresentationController.prototype.getFilteredToAccounts = function() {
        return this.filteredToAccounts;
    };

      /** This method is used as a pass through to return entitlement value from configuration manager
   *  key- {string} - value for which entitlement needs to be checked
   */
  ManageActivities_PresentationController.prototype.getEntitlementValue = function(key) {
    var cm = applicationManager.getConfigurationManager();
    return cm.getConfigurationValue(key);
  };

  /**
   * This method is used to set to account data in transaction object
   * toAccountData - {Object} holds the selected to account data
   */
  ManageActivities_PresentationController.prototype.setToAccountData = function (toAccountData) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transactionManager = applicationManager.getTransactionManager();
    var transactionObject = transactionManager.getTransactionObject();
    scope_ManageActivitiesPresentationController.previousAccountType = transactionObject.toAccountType;
    switch (toAccountData.transactionMode) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts"):
        transactionManager.setTransactionAttribute("toAccountNumber", toAccountData["accountID"]);
        transactionManager.setTransactionAttribute("toAccountType", toAccountData["accountType"]);
        scope_ManageActivitiesPresentationController.currentAccountType = toAccountData["accountType"];
        transactionManager.setTransactionAttribute("toAccountName", toAccountData["accountName"]);
        transactionManager.setTransactionAttribute("transactionType", "InternalTransfer");
        transactionManager.setTransactionAttribute("toProcessedName", toAccountData["processedName"]);
        transactionManager.setTransactionAttribute("bankName", toAccountData["bankName"]);
        transactionManager.setTransactionAttribute("toAccountCurrency", toAccountData["toAccountCurrency"]);
        transactionManager.setTransactionAttribute("transactionCurrency", toAccountData["toAccountCurrency"]);
        transactionManager.setTransactionAttribute("istoAccountBusiness", toAccountData["isBusinessAccount"]);
        transactionManager.setTransactionAttribute("toAccountMembershipId", toAccountData["membershipID"]);
        scope_ManageActivitiesPresentationController.transactionMode = toAccountData.transactionMode;
        scope_ManageActivitiesPresentationController.resetStateNavigationForCreditCardAccounts();
        if (toAccountData["accountType"] === "Loan") {
          scope_ManageActivitiesPresentationController.isLoansAccountType = true;
          var accountManager = applicationManager.getAccountManager();
          var params = {
            "accountID": toAccountData["accountID"]
          };
          accountManager.fetchAccountDetails(params,scope_ManageActivitiesPresentationController.fetchAccountDetailPresentationSuccessCallback,scope_ManageActivitiesPresentationController.fetchAccountDetailPresentationErrorCallback);
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
          scope_ManageActivitiesPresentationController.isLoansAccountType = false;
          scope_ManageActivitiesPresentationController.setAmountBasedOnTransactionType();
          scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeCreditCardDetails");
        }
        else {
          scope_ManageActivitiesPresentationController.isLoansAccountType = false;
          scope_ManageActivitiesPresentationController.setAmountBasedOnTransactionType();
          scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeTransferAmount");
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
        scope_ManageActivitiesPresentationController.currentAccountType = toAccountData["accountType"];
        transactionManager.setTransactionAttribute("toProcessedName", toAccountData["processedName"]);
        transactionManager.setTransactionAttribute("transactionType", "ExternalTransfer");
        transactionManager.setTransactionAttribute("beneficiaryId", toAccountData["beneficiaryId"] || null);
        transactionManager.setTransactionAttribute("IBAN", toAccountData["IBAN"] || null);
        transactionManager.setTransactionAttribute("routingNumber", toAccountData["routingNumber"] || null);
        transactionManager.setTransactionAttribute("swiftCode", toAccountData["swiftCode"] || "");
        scope_ManageActivitiesPresentationController.transactionMode = toAccountData.transactionMode;
        scope_ManageActivitiesPresentationController.setAmountBasedOnTransactionType();
        var navMan=applicationManager.getNavigationManager();
	    var entryPoint = navMan.getEntryPoint("editbeneficiary");
        if (entryPoint === "frmBenVerifyDetailsEurope" || toAccountData.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") || toAccountData.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")) {
            scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeTransferAmount");
            }
        break;
    }
  };
  
  ManageActivities_PresentationController.prototype.getBeneficiaryCurrency = function(accountNumber) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var params = {
            "accountNumber": accountNumber
        };
        applicationManager.getRecipientsManager().getPayeeName(params, this.getBeneficiaryCurrencySuccess.bind(this, accountNumber));
    };
    ManageActivities_PresentationController.prototype.getBeneficiaryCurrencySuccess = function(accountNumber, res) {
      var transactionManager = applicationManager.getTransactionManager();
      if (res.currency && res.currency.length !== 0) {
         transactionManager.setTransactionAttribute("transactionCurrency", res.currency);   
         scope_ManageActivitiesPresentationController.toBenCurrency = res.currency;
        }
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeTransferAmount");
    };
  
  ManageActivities_PresentationController.prototype.setTransferToAccountFromManageFlow = function() {
    var navMan = applicationManager.getNavigationManager();
    var transactionManager = applicationManager.getTransactionManager();
    scope_ManageActivitiesPresentationController.setEuropeFlowType("EXTERNAL");
    scope_ManageActivitiesPresentationController.populateToAccountsDataFromManageFlow();
    var fromAccountNumber = transactionManager.getTransactionObject().fromAccountNumber;
    if (fromAccountNumber) {
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation({"appName" : "TransfersMA", "friendlyName" : "TransferEuropeUIModule/frmEuropeTransferAmount"});
    }
    else {
      scope_ManageActivitiesPresentationController.getFromAndToAccounts();
    }
  };
    /**
    * This method is used to build the values for to account data in the model definition as we enter from manage flow
    */
    ManageActivities_PresentationController.prototype.populateToAccountsDataFromManageFlow = function() {
    var transMan = applicationManager.getTransactionManager();
    var transferModPresentationController = applicationManager.getModulesPresentationController("ManageActivitiesUIModule");
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
    scope_ManageActivitiesPresentationController.currentAccountType = benificiaryDetails["accountType"];
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
	scope_ManageActivitiesPresentationController.transactionMode = benificiaryDetails.transactionMode;
    scope_ManageActivitiesPresentationController.setAmountBasedOnTransactionType();
    if(benificiaryDetails.isInternationalAccount === "false" && benificiaryDetails.isSameBankAccount === "true"){
		scope_ManageActivitiesPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
    }
    else if(benificiaryDetails.isInternationalAccount === "false" && benificiaryDetails.isSameBankAccount === "false"){
		scope_ManageActivitiesPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
    }
    else{
		scope_ManageActivitiesPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
    }
  };
  
  ManageActivities_PresentationController.prototype.resetStateNavigationForCreditCardAccounts = function() {
    if (scope_ManageActivitiesPresentationController.previousAccountType === "CreditCard" || scope_ManageActivitiesPresentationController.currentAccountType === "CreditCard") {
      if (scope_ManageActivitiesPresentationController.stateNavigation) {
        var navMan = applicationManager.getNavigationManager();
        scope_ManageActivitiesPresentationController.initializeStateData(false, "");
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

  ManageActivities_PresentationController.prototype.fetchAccountDetailPresentationSuccessCallback = function(response) {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("nextPaymentDate", response[0]["nextPaymentDate"]);
    transactionManager.setTransactionAttribute("nextPaymentAmount", response[0]["nextPaymentAmount"]);
    transactionManager.setTransactionAttribute("paymentDue", response[0]["paymentDue"]);
    scope_ManageActivitiesPresentationController.setAmountBasedOnTransactionType();
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeTransferAmount");
  };

    ManageActivities_PresentationController.prototype.fetchAccountDetailPresentationErrorCallback = function(error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(error["isServerUnreachable"])
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    };

    ManageActivities_PresentationController.prototype.getTransferObjectById = function(screenType) {
        var accdata = [];
        var processAccountsData = null;
        var trasMan = applicationManager.getTransactionManager();
        var accMan = applicationManager.getAccountManager();
      	var fromAccNr = trasMan.getTransactionObject().fromAccountNumber;
        if (fromAccNr) {
          var accData = accMan.getInternalAccountByID(fromAccNr);
          accdata.push(accData);
          processAccountsData = scope_ManageActivitiesPresentationController.processAccountsData(accdata,screenType);
        } else if (Object.keys(scope_ManageActivitiesPresentationController.selectedFromAccountData).length !== 0) {
          var accData = accMan.getInternalAccountByID(scope_ManageActivitiesPresentationController.selectedFromAccountData.accountID);
          accdata.push(accData);
          processAccountsData = scope_ManageActivitiesPresentationController.processAccountsData(accdata,screenType);
        }
        return processAccountsData;
      };

      /**
   * This method is used to get to account data from transaction object
   */
  ManageActivities_PresentationController.prototype.getToAccountData = function(){
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
          accData = scope_ManageActivitiesPresentationController.processAccountsData(accDataArr)[0];
          toAccountData["toAccountNumber"] = accData.accountID;
          toAccountData["toAccountName"] = accData.processedName;
          toAccountData["toAccountType"] = accData.accountType;
          toAccountData["availableBalance"] = accData.availableBalance;
          toAccountData["accountBalanceType"] = scope_ManageActivitiesPresentationController.getAvailableBalanceType(accData);
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
  ManageActivities_PresentationController.prototype.getReviewScreenData = function(){
    var segData = [];
    var transObj = scope_ManageActivitiesPresentationController.getTransObject();
    var configManager = applicationManager.getConfigurationManager();
    configManager.cutOffTimeBreachedOverride = false;
    configManager.cutOffProductOverride = false;
    configManager.awaitingFundsOverride = false;
    //     var amountValue;
    //     if (transObj.amount)
    //     	amountValue = scope_ManageActivitiesPresentationController.formatAmountAndAppendCurrencyEurope(transObj.amount,transObj.transactionCurrency);
    //    	if (scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")){
    //      	if (transObj.transactionCurrency !== transObj.fromAccountCurrency) {
    //           amountValue = null;
    //         }
    //    	}
    //     segData.push({
    //       "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Amount"),
    //       "value": amountValue || "",
    //       "chevronImg":"chevron.png"
    //     });
     
    //  if (scope_ManageActivitiesPresentationController.transactionMode !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")) {     
    //   segData.push({
    //   "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfersEurope.TotalCharges"),
    //   "value": scope_ManageActivitiesPresentationController.formatAmountAndAppendCurrencyEurope(transObj.totalCharges,transObj.transactionCurrency),
    //   "chevronImg": "chevron.png"
    // });
    //  }
    if (scope_ManageActivitiesPresentationController.europeFlowType === "EXTERNAL" && scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")) {
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
    if (scope_ManageActivitiesPresentationController.europeFlowType === "EXTERNAL" && (scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") || scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"))) {
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
          "value": scope_ManageActivitiesPresentationController.getFrequencyTypei18n(transObj.frequencyType),
          "chevronImg":"chevron.png"
        },
        {
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"),
          "value":calendarDate,
          "chevronImg":"chevron.png"
        },
        {
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.payments.creditValueDate"),
          "value":{"text":"","right":"20dp","skin":"sknlbl424242ssp40px"},
          "chevronImg":""
        });
      }
      else{
        var calendarDate="";
        var freqType = scope_ManageActivitiesPresentationController.getFrequencyTypei18n(transObj.frequencyType);
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
      recipientManager.fetchBankDate({}, scope_ManageActivitiesPresentationController.getBankDateSuccess.bind(this, segData), scope_ManageActivitiesPresentationController.getBankDateFailure.bind(this, segData));
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
      recipientManager.fetchBankDate({}, scope_ManageActivitiesPresentationController.getBankDateSuccess.bind(this, segData), scope_ManageActivitiesPresentationController.getBankDateFailure.bind(this, segData));
      //return null;
    }
  };

  ManageActivities_PresentationController.prototype.getBankDateSuccess = function(segData, res) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var transObj = scope_ManageActivitiesPresentationController.getTransObject();
    var transactionManager = applicationManager.getTransactionManager();
    var formatUtilManager = applicationManager.getFormatUtilManager();
    var bankDate = res.date[0].currentWorkingDate;
    var formatedDateObject = formatUtilManager.getDateObjectfromString(bankDate);
    scope_ManageActivitiesPresentationController.serverDate = formatedDateObject;
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
      },
      {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.payments.creditValueDate"),
        "value":{"text":"","right":"20dp","skin":"sknlbl424242ssp40px"},
        "chevronImg":""
      });
      transactionManager.setTransactionAttribute("scheduledDate", formatedDate);
      transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_ManageActivitiesPresentationController.convertCalendarDateToLocaleDate(formatedDate));
    }  
    var controller = applicationManager.getPresentationUtility().getController('frmEuropeVerifyTransferDetails', true);
    //controller.bindDataToSegment(segData);
    controller.proceedWithPreshow(segData);
  };

  ManageActivities_PresentationController.prototype.getBankDateFailure = function(segData, err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]) 
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    else {
      var transObj = scope_ManageActivitiesPresentationController.getTransObject();
      var formatUtilManager = applicationManager.getFormatUtilManager();
      var transactionManager = applicationManager.getTransactionManager();
      var serverDate = scope_ManageActivitiesPresentationController.getServerDate();
      scope_ManageActivitiesPresentationController.serverDate = serverDate;
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
        },
        {
          "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.payments.creditValueDate"),
          "value":{"text":"","right":"20dp","skin":"sknlbl424242ssp40px"},
          "chevronImg":""
        });
        transactionManager.setTransactionAttribute("scheduledDate", formatedDate);
        transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_ManageActivitiesPresentationController.convertCalendarDateToLocaleDate(formatedDate));
      }  
      var controller = applicationManager.getPresentationUtility().getController('frmEuropeVerifyTransferDetails', true);
      // controller.bindDataToSegment(segData);
      controller.proceedWithPreshow(segData);
    }
  };

  ManageActivities_PresentationController.prototype.getServerDate = function(date) {
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
  ManageActivities_PresentationController.prototype.reviewRowClick = function(rowData){
    switch(rowData.property){
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"):
        if (!scope_ManageActivitiesPresentationController.isLoansAccountType)
        	scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeFrequency");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.StartDate"):
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"):
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeStartDate");
        break;
//       case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Amount"):
//         scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeTransferAmount");
//         break;
     case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.FeeBreakdown"):        
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("ManageActivitiesUIModule/frmChargesBreakdownEurope");      
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.EndDate"):
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.EndingOn"):  
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeEndDate");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"):
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeNumberOfTransfers");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.Duration"):
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeDuration");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfersEurope.reference"):
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeTransferReference");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.PaymentMedium"):
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropePaymentMedium");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.FeesPaidBy"):
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeFeePayment");
        break;     
      default:
        if(rowData.value.text==applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.RemoveRepeatingTransfer")){
          var transactionManager = applicationManager.getTransactionManager();
          transactionManager.setTransactionAttribute("isScheduled", "0");
          scope_ManageActivitiesPresentationController.initializeStateData(false, "");
          var controller = applicationManager.getPresentationUtility().getController('frmEuropeVerifyTransferDetails', true);
          scope_ManageActivitiesPresentationController.getReviewScreenData();
          controller.changeButtonText();
        }
    }
  };

  /**
   * This method is used to return the index of the type of frequency selected in the select frequency screen.
   */
  ManageActivities_PresentationController.prototype.getSelectedFrequencyIndex = function() {
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
  ManageActivities_PresentationController.prototype.switchFrequencyType = function(Index) {
    var transactionObj = applicationManager.getTransactionManager();
    var frequencyTypes = transactionObj.getAvailableFrequencyType();
    var navMan = applicationManager.getNavigationManager();
    var data = {};
    if(!(transactionObj.transferObject && transactionObj.transferObject.duration)){
        scope_ManageActivitiesPresentationController.initializeStateData(false, "");
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
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeStartDate");
    }
    else {
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeDuration");
    }
  };

  /**
   * This method is used to populate the transaction object with the start date selected in the start date calendar.
   * startData - {String} Date in format mm/dd/yyyy
   */
  ManageActivities_PresentationController.prototype.processStartDate = function(startDate) {
    var formattedDate = startDate;
    var transactionManager = applicationManager.getTransactionManager();
    var date1 = scope_ManageActivitiesPresentationController.serverDate;
    date1.setHours(0,0,0,0);
    var date2 = new Date(formattedDate);
    date2.setHours(0,0,0,0); // Setting the hours, minutes, seconds and milliseconds of selected send date and today's date so that they can be compared for equality.
    if (date1.getTime() !== date2.getTime()) // If transfer frequency is Once and the send date is equal to today's date, then the type of transaction is posted otherwise scheduled.
        transactionManager.setTransactionAttribute("isScheduled", "1");
    else
        transactionManager.setTransactionAttribute("isScheduled", "0");
    transactionManager.setTransactionAttribute("scheduledDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_ManageActivitiesPresentationController.convertCalendarDateToLocaleDate(formattedDate));
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
  };

  /*additional date field to use in  the calendar page in the back flow*/
  ManageActivities_PresentationController.prototype.convertCalendarDateToLocaleDate = function(formattedDate) {
    var forUtility = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager()
    var convertedDate = forUtility.getFormatedDateString(forUtility.getDateObjectFromCalendarString(formattedDate, "MM/DD/YYYY"), configManager.frontendDateFormat[configManager.getLocale()]);
    return convertedDate;
  };

  /**
   * This method is used to populate the transaction object with the start date selected in the start date calendar and navigate to the Recurrence screen if Number of Transfers is selected as duration type previously.
   * startData - {String} Date in format mm/dd/yyyy
   */
  ManageActivities_PresentationController.prototype.navigateToRecurrence = function(startDate) {
    var formattedDate = startDate;
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("frequencyStartDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_ManageActivitiesPresentationController.convertCalendarDateToLocaleDate(formattedDate));
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeNumberOfTransfers");
  };

  /**
   * This method is used to populate the transaction object with the start date selected in the start date calendar and navigate to the End Date calendar screen if Date Range is selected as duration type previously.
   * startData - {String} Date in format mm/dd/yyyy
   */
  ManageActivities_PresentationController.prototype.navigateToEndDate = function(startDate) {
    var formattedDate = startDate;
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("frequencyStartDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledDate", formattedDate);
    transactionManager.setTransactionAttribute("scheduledCalendarDate", scope_ManageActivitiesPresentationController.convertCalendarDateToLocaleDate(formattedDate));
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeEndDate");
  };

  /**
   * This method is used to return the index of the type of duration selected in the select set duration screen.
   */
  ManageActivities_PresentationController.prototype.getIndexForDuration = function() {
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
  ManageActivities_PresentationController.prototype.switchDurationType = function(index) {
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
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeStartDate");
        break;
      // case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"):
      //   transactionObj.setTransactionAttribute("frequencyEndDate", null);
      //   transactionObj.setTransactionAttribute("duration", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NumberOfTransfers"));
      //   var data = {
      //     "freq": "NofRR"
      //   };
      //   navMan.setCustomInfo("frmEuropeStartDate", data);
      //   scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeStartDate");
      //   break;
    }
  };

  /**
   * This method is used to populate the transaction object with the end date selected.
   * endDate - {String} Date in format mm/dd/yyyy
   */
  ManageActivities_PresentationController.prototype.processEndDate = function(endDate) {
    var formattedDate = endDate;
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("frequencyEndDate", formattedDate);
    transactionManager.setTransactionAttribute("endCalendarDate", scope_ManageActivitiesPresentationController.convertCalendarDateToLocaleDate(formattedDate));
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
  };

  /**
   * This method is used to populate the transaction object with the Recurrnece number selected.
   * recurrence - {Number} Value of recurrence number.
   */
  ManageActivities_PresentationController.prototype.setRecurrence = function(reccurrence) {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("numberOfRecurrences", reccurrence);
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
  };
  
  /**
   * This method is used to fetch Limits from backend
   * data - {string} holds the amount user has entered in the transfer amount screen
   */
  ManageActivities_PresentationController.prototype.fetchLimits = function(amount){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var featureAction;
    var configManager =  applicationManager.getConfigurationManager();
    switch(scope_ManageActivitiesPresentationController.transactionMode){
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

  ManageActivities_PresentationController.prototype.fetchLimitsSuccess = function(amount, res) {
    var fromAccountNumber = applicationManager.getTransactionManager().getTransactionObject().fromAccountNumber;
    var configManager = applicationManager.getConfigurationManager();
    scope_ManageActivitiesPresentationController.haveLimitsBeenFetched = true;
    if (fromAccountNumber && res.accounts) {
      var limit = res.accounts.filter(function(obj) {
        return obj.accountId === fromAccountNumber;
      });
      if (limit && limit.length > 0) {
        limit = limit[0].limits;
        switch(scope_ManageActivitiesPresentationController.transactionMode){
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


  ManageActivities_PresentationController.prototype.fetchLimitsError = function(amount, res) {
    scope_ManageActivitiesPresentationController.haveLimitsBeenFetched = true;
    var controller = applicationManager.getPresentationUtility().getController('frmEuropeTransferAmount', true);
    controller.executeAfterFetchingLimits(amount); 
  };
  
  ManageActivities_PresentationController.prototype.evaluateMinMaxAmountLimits = function(amount){
    var configManager =  applicationManager.getConfigurationManager();
    var maxlimit,minlimit,autoDeniedLimit;
    switch(scope_ManageActivitiesPresentationController.transactionMode){
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
  
  ManageActivities_PresentationController.prototype.setAmount = function(amount){
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    transactionManager.setTransactionAttribute("amount",amount);
    if(transObj.isScheduled==undefined || transObj.isScheduled==null ||transObj.isScheduled==""){
      transactionManager.setTransactionAttribute("isScheduled","0");
    }
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeTransferReference");
  };
ManageActivities_PresentationController.prototype.setReference = function(reference){
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    transactionManager.setTransactionAttribute("reference",reference);
    transactionManager.setTransactionAttribute("transactionsNotes",reference);
    if(transObj.isScheduled==undefined || transObj.isScheduled==null ||transObj.isScheduled==""){
      transactionManager.setTransactionAttribute("isScheduled","0");
    }
  	if (scope_ManageActivitiesPresentationController.europeFlowType === "INTERNAL") {
    	scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
    }  
  	else {
      var configManager = applicationManager.getConfigurationManager();
      if (configManager.europeConfiguration.isPaymentMediumAvailable && scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")) {
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropePaymentMedium");
      }
      else {
        if (configManager.europeConfiguration.isInternationalTransactionFeeEnabled)
			if ((scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")) || (scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")))
				scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeFeePayment");
			else
				scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
        else
          scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
      }
    }
  };

  ManageActivities_PresentationController.prototype.makeATransfer = function(fileInputs) {
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
      	var requestData = scope_ManageActivitiesPresentationController.filterTransactionObject();
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
      var editTransactionBasedOnTransactionMode = scope_ManageActivitiesPresentationController.getEditFunctionReference();
      requestData = scope_ManageActivitiesPresentationController.filterRequestData(requestData);
      if (editTransactionBasedOnTransactionMode)
        editTransactionBasedOnTransactionMode(requestData, this.presentationMakeATransferSuccess, this.presentationMakeATransferError);
    } else {
      transactionManager.setTransactionAttribute("serviceName", serviceName);
      var requestData = scope_ManageActivitiesPresentationController.filterTransactionObject();
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
    requestData.transactionId = scope_ManageActivitiesPresentationController.validateReferenceId;
    //PSD2 flag indicator for proper total debit and charge Values
    requestData.createWithPaymentId = "true";
    var createTransactionBasedOnTransactionMode = scope_ManageActivitiesPresentationController.getCreateFunctionReference();
    requestData = scope_ManageActivitiesPresentationController.filterRequestData(requestData);
    if (createTransactionBasedOnTransactionMode)
      createTransactionBasedOnTransactionMode(requestData, this.presentationMakeATransferSuccess, this.presentationMakeATransferError);
    }  
  };

ManageActivities_PresentationController.prototype.presentationMakeATransferSuccess = function(resp) {
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
      var mfaJSON = {
        "flowType" : scope_ManageActivitiesPresentationController.mfaFlowType,
        "response" : resp
      };
      applicationManager.getMFAManager().setMFAOperationType("EUROPETRANSFER");
      applicationManager.getMFAManager().initMFAFlow(mfaJSON);
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
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeConfirmation");
    }
  };

  /**
   * This method is a callback on eroor of creating or editing transfer
   * err - {object} error response
   */
  ManageActivities_PresentationController.prototype.presentationMakeATransferError = function(err) {
    if (err["isServerUnreachable"]) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
          var transactionManager = applicationManager.getTransactionManager();
          if(err.serverErrorRes.errorDetails) {
          var errorDetails = JSON.parse(err.serverErrorRes.errorDetails);
          if(errorDetails != null && errorDetails != "") 
          transactionManager.setTransactionAttribute("errmsg",errorDetails);
          } else {
          var formattedResponse = [];
          var errMsg = {};
          errMsg.message = err.errorMessage;
          errMsg.imgIcon = " ";
          formattedResponse.push(errMsg)
          transactionManager.setTransactionAttribute("errmsg",formattedResponse);
          }
          scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeConfirmation");
    }
};
  
   ManageActivities_PresentationController.prototype.getEditFunctionReference = function() {
     var managerFunction;
     var mfaManager = applicationManager.getMFAManager();
     var transactionManager = applicationManager.getTransactionManager();
     switch(scope_ManageActivitiesPresentationController.transactionMode) {
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
         	mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE");
         	scope_ManageActivitiesPresentationController.mfaFlowType="TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE";
         	managerFunction = transactionManager.editTransferToOwnAccounts;
         	break;
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :
         	mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_UPDATE");
         	scope_ManageActivitiesPresentationController.mfaFlowType="INTRA_BANK_FUND_TRANSFER_UPDATE";
         	managerFunction = transactionManager.editIntraBankAccFundTransfer;
         	break;
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
         	mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE");
         	scope_ManageActivitiesPresentationController.mfaFlowType="INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE";
         	managerFunction = transactionManager.editInterBankAccFundTransfer;
         	break;
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
         	mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE");
         	scope_ManageActivitiesPresentationController.mfaFlowType="INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE";
         	managerFunction = transactionManager.editInternationalAccFundTransfer;
         	break;
     }
     if (managerFunction)
      return managerFunction.bind(transactionManager);
    return;  
   };
  
     ManageActivities_PresentationController.prototype.getCreateFunctionReference = function() {
      var managerFunction; 
      var mfaManager = applicationManager.getMFAManager();
      var transactionManager = applicationManager.getTransactionManager();
      switch(scope_ManageActivitiesPresentationController.transactionMode) {
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
          if (transactionManager.getTransactionObject()['toAccountType'] === "CreditCard") {
            managerFunction = transactionManager.createCreditCardTransaction;
          }
          else {
         	  mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
            scope_ManageActivitiesPresentationController.mfaFlowType="TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE";
            managerFunction = (scope_ManageActivitiesPresentationController.triggerOneTimePaymentFlow)? transactionManager.createOneTimeTransfer : transactionManager.createTransferToOwnAccounts;
          }  
         	break;
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :
         	mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_CREATE");
           scope_ManageActivitiesPresentationController.mfaFlowType="INTRA_BANK_FUND_TRANSFER_CREATE";
           managerFunction = (scope_ManageActivitiesPresentationController.triggerOneTimePaymentFlow)? transactionManager.createOneTimeTransfer : transactionManager.createIntraBankAccFundTransfer;
         	break;
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
         	mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE");
           scope_ManageActivitiesPresentationController.mfaFlowType="INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
           managerFunction = (scope_ManageActivitiesPresentationController.triggerOneTimePaymentFlow)? transactionManager.createOneTimeTransfer : transactionManager.createInterBankAccFundTransfer;
         	break;
         case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
         	mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE");
           scope_ManageActivitiesPresentationController.mfaFlowType="INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE";
           managerFunction = (scope_ManageActivitiesPresentationController.triggerOneTimePaymentFlow)? transactionManager.createOneTimeTransfer : transactionManager.createInternationalAccFundTransfer;
         	break;
     }
     if (managerFunction)
      return managerFunction.bind(transactionManager);
    return;   
   };
  	
  ManageActivities_PresentationController.prototype.filterTransactionObject = function() { 
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
  ManageActivities_PresentationController.prototype.getFromAndToAccounts = function(getFromAccountsCallback) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var configManager = applicationManager.getConfigurationManager();
    //holds the information about the status of the service call that has been initiated
    scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus={};
    var recMan = applicationManager.getRecipientsManager();
    var payeeManager = applicationManager.getRecipientsManager();
    if(getFromAccountsCallback){
      scope_ManageActivitiesPresentationController.getFromAccounts(getFromAccountsCallback);
    }
    else{
      scope_ManageActivitiesPresentationController.getFromAccounts(scope_ManageActivitiesPresentationController.fromAccountsPresentationSuccessCallBack);
    }
    if (configManager.checkUserPermission("INTRA_BANK_FUND_TRANSFER_CREATE")) {
      //Setting status to 0 initially and after receiving completion callback we are changing it to 1 and hence areAllServicesDone method recognises service call is completed
      scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.SameBankTransferStatus = 0;
      recMan.fetchAllInternalBenificiaries(scope_ManageActivitiesPresentationController.fetchAllInternalBenificiariesPresentationSuccessCallBack, scope_ManageActivitiesPresentationController.fetchAllInternalBenificiariesPresentationErrorCallBack);
    }
    if (configManager.checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE")) {
      //Setting status to 0 initially and after receiving completion callback we are changing it to 1 and hence areAllServicesDone method recognises service call is completed
      scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.OtherBankTransferStatus = 0;
      recMan.fetchAllExternalBenificiaries(scope_ManageActivitiesPresentationController.fetchAllExternalBenificiariesPresentationSuccessCallBack, scope_ManageActivitiesPresentationController.fetchAllExternalBenificiariesPresentationErrorCallBack);
    }
    if (configManager.checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE")) {
      //Setting status to 0 initially and after receiving completion callback we are changing it to 1 and hence areAllServicesDone method recognises service call is completed
      scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.InternationalTransferStatus = 0;
      recMan.fetchInternationalRecepients(scope_ManageActivitiesPresentationController.fetchInternationalRecepientsPresentationSuccessCallBack, scope_ManageActivitiesPresentationController.fetchInternationalRecepientsPresentationErrorCallBack);
    }
    //scope_ManageActivitiesPresentationController.asyncResponseData.RecentStatus = 0;
    //recMan.fetchRecentBenificiaries({}, scope_ManageActivitiesPresentationController.fetchRecentBeneficiariesPresentationSuccessCallback, scope_ManageActivitiesPresentationController.fetchRecentBeneficiariesPresentationErrorCallback);
  };

  /** This method is invoked after successful retrieval of internal benificiaries
    *  response - {object} internal benificiaries response from the backend
   */
  ManageActivities_PresentationController.prototype.fetchAllInternalBenificiariesPresentationSuccessCallBack = function(response) {
    scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.SameBankTransferStatus = 1;
    scope_ManageActivitiesPresentationController.asyncResponseData.InternalBenificiariesData = response;
    if (scope_ManageActivitiesPresentationController.areAllServicesDone()) {
      scope_ManageActivitiesPresentationController.navigateToShowToList();
    }
  };

  /** This method is invoked if any error is triggered while retrieving list of internal benificiaries
    *  errorResponse - {object} error response from the backend
   */
  ManageActivities_PresentationController.prototype.fetchAllInternalBenificiariesPresentationErrorCallBack = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else {
      scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.SameBankTransferStatus = 1;
      scope_ManageActivitiesPresentationController.asyncResponseData.InternalBenificiariesData = 0;
      if (scope_ManageActivitiesPresentationController.areAllServicesDone()) {
        scope_ManageActivitiesPresentationController.navigateToShowToList();
      }
    }
  };
  /** This method is invoked after successful retrieval of external benificiaries
   *  response - {object} external benificiaries response from the backend
   */
  ManageActivities_PresentationController.prototype.fetchAllExternalBenificiariesPresentationSuccessCallBack = function(response) {
    scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.OtherBankTransferStatus = 1;
    scope_ManageActivitiesPresentationController.asyncResponseData.OtherBankBenificiariesData = response;
    if (scope_ManageActivitiesPresentationController.areAllServicesDone()) {
      scope_ManageActivitiesPresentationController.navigateToShowToList();
    }
  };
  /** This method is invoked if any error is triggered while retrieving list of external benificiaries
    *  errorResponse - {object} error response from the backend
   */
  ManageActivities_PresentationController.prototype.fetchAllExternalBenificiariesPresentationErrorCallBack = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else {
      scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.OtherBankTransferStatus = 1;
      scope_ManageActivitiesPresentationController.asyncResponseData.OtherBankBenificiariesData = 0;
      if (scope_ManageActivitiesPresentationController.areAllServicesDone()) {
        scope_ManageActivitiesPresentationController.navigateToShowToList();
      }
    }
  };
  /** This method is invoked after successful retrieval of international benificiaries
   *  response - {object} international benificiaries response from the backend
   */
  ManageActivities_PresentationController.prototype.fetchInternationalRecepientsPresentationSuccessCallBack = function(response) {
    scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.InternationalTransferStatus = 1;
    scope_ManageActivitiesPresentationController.asyncResponseData.InternationalBenificiariesData = response;
    if (scope_ManageActivitiesPresentationController.areAllServicesDone()) {
      scope_ManageActivitiesPresentationController.navigateToShowToList();
    }
  };
  /** This method is invoked if any error is triggered while retrieving list of international benificiaries
   *  errorResponse - {object} error response from the backend
   */
  ManageActivities_PresentationController.prototype.fetchInternationalRecepientsPresentationErrorCallBack = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else {
      scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.InternationalTransferStatus = 1;
      scope_ManageActivitiesPresentationController.asyncResponseData.InternationalBenificiariesData = 0;
      if (scope_ManageActivitiesPresentationController.areAllServicesDone()) {
        scope_ManageActivitiesPresentationController.navigateToShowToList();
      }
    }
  };
  /** This method checks for completion status of all to accounts calls that have been initiated
   */
  ManageActivities_PresentationController.prototype.areAllServicesDone = function() {
    for(var key in scope_ManageActivitiesPresentationController.asyncResponseData["serviceCallsStatus"]){
      if(scope_ManageActivitiesPresentationController.asyncResponseData["serviceCallsStatus"][key]===0){
        return false;
      }
    }
    return true;
  };
   /** This method is invoked after successful retrieval of payees
    *  response - {object} payees response from the backend
   */
  ManageActivities_PresentationController.prototype.allPayeeSuccess = function(response) {
    scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.P2PStatus = 1;
    scope_ManageActivitiesPresentationController.asyncResponseData.P2PData = response;
    if (scope_ManageActivitiesPresentationController.areAllServicesDone()) {
      scope_ManageActivitiesPresentationController.navigateToShowToList();
    }
  };
  /** This method is invoked if any error is triggered while retrieving list of payees
    *  errorResponse - {object} error response from the backend
   */
  ManageActivities_PresentationController.prototype.allPayeeError = function(errorResponse) {
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.P2PStatus = 1;
     scope_ManageActivitiesPresentationController.asyncResponseData.P2PData = 0;
     if (scope_ManageActivitiesPresentationController.areAllServicesDone()) {
        scope_ManageActivitiesPresentationController.navigateToShowToList();
     }
  };
  ManageActivities_PresentationController.prototype.navigateToShowToList = function() {
    scope_ManageActivitiesPresentationController.toAccountList.externalBenificiaries = [];
    scope_ManageActivitiesPresentationController.toAccountList.internationalBenificiaries = [];
    scope_ManageActivitiesPresentationController.toAccountList.internalBenificiaries = [];
    if (scope_ManageActivitiesPresentationController.asyncResponseData.InternalBenificiariesData)
    	scope_ManageActivitiesPresentationController.toAccountList.internalBenificiaries = scope_ManageActivitiesPresentationController.asyncResponseData.InternalBenificiariesData.ExternalAccounts;
    //scope_ManageActivitiesPresentationController.toAccountList.RecentBenificiaries = scope_ManageActivitiesPresentationController.asyncResponseData.RecentBenificiariesData;
    if (scope_ManageActivitiesPresentationController.asyncResponseData.OtherBankBenificiariesData)
    	scope_ManageActivitiesPresentationController.toAccountList.externalBenificiaries = scope_ManageActivitiesPresentationController.asyncResponseData.OtherBankBenificiariesData.ExternalAccounts;
    if (scope_ManageActivitiesPresentationController.asyncResponseData.InternationalBenificiariesData)
    	scope_ManageActivitiesPresentationController.toAccountList.internationalBenificiaries = scope_ManageActivitiesPresentationController.asyncResponseData.InternationalBenificiariesData.ExternalAccounts;
    //var controller = applicationManager.getPresentationUtility().getController('frmEuropeTransferToAccountSM', true);
    if(scope_ManageActivitiesPresentationController.toAccountList.externalBenificiaries.length === 0 && scope_ManageActivitiesPresentationController.toAccountList.internationalBenificiaries.length === 0 && scope_ManageActivitiesPresentationController.toAccountList.internalBenificiaries.length === 0) {
      //controller.bindDataAfterTransition(1);
      if (Object.keys(scope_ManageActivitiesPresentationController.selectedFromAccountData).length !== 0) {
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeTransferToAccountSM");
      }
    }else {
      //controller.bindDataAfterTransition(0);
      if (Object.keys(scope_ManageActivitiesPresentationController.selectedFromAccountData).length !== 0) {
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeTransferToAccountSM");
      }
    }
     
  };

  ManageActivities_PresentationController.prototype.fetchRecentBeneficiariesPresentationSuccessCallback = function(response) {
    scope_ManageActivitiesPresentationController.asyncResponseData.RecentStatus = 1;
    scope_ManageActivitiesPresentationController.asyncResponseData.RecentBenificiariesData = response.recentTransactions;
    if (scope_ManageActivitiesPresentationController.areAllServicesDone()) {
      scope_ManageActivitiesPresentationController.navigateToShowToList();
    }
  };

  ManageActivities_PresentationController.prototype.fetchRecentBeneficiariesPresentationErrorCallback = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else {
      scope_ManageActivitiesPresentationController.asyncResponseData.serviceCallsStatus.RecentStatus = 1;
      scope_ManageActivitiesPresentationController.asyncResponseData.RecentBenificiariesData = 0;
      if (scope_ManageActivitiesPresentationController.areAllServicesDone()) {
        scope_ManageActivitiesPresentationController.navigateToShowToList();
      }
    }
  };

  ManageActivities_PresentationController.prototype.getConfirmationScreenData = function() {
    var segData = [];
    var navMan = applicationManager.getNavigationManager();
    var uploadedAttachments = navMan.getCustomInfo("uploadedAttachments");
    var transObj = scope_ManageActivitiesPresentationController.getTransObject();
    var paymentMethod = scope_ManageActivitiesPresentationController.getPaymentMethod();
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
    if (scope_ManageActivitiesPresentationController.transactionMode !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts")) {
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
      "value" : scope_ManageActivitiesPresentationController.formatAmountAndAppendCurrencyEurope(transObj.amount,transObj.transactionCurrency)
     });
    if (transObj.exchangeRate && transObj.fromAccountCurrency !== transObj.transactionCurrency) {
      var exchangeRateValue;
    if(transObj.quoteCurrency !== transObj.transactionCurrency){
        exchangeRateValue = scope_ManageActivitiesPresentationController.formatAmountAndAppendCurrencyEurope(1, transObj.quoteCurrency) + ' = ' + scope_ManageActivitiesPresentationController.formatAmountAndAppendCurrencyEurope(transObj.exchangeRate, transObj.transactionCurrency);
      } else {
        exchangeRateValue = scope_ManageActivitiesPresentationController.formatAmountAndAppendCurrencyEurope(1, transObj.quoteCurrency) + ' = ' + scope_ManageActivitiesPresentationController.formatAmountAndAppendCurrencyEurope(transObj.exchangeRate, transObj.fromAccountCurrency);
      }
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.ExchangeRate"),
        "value": exchangeRateValue
       });
    }
    if (transObj.frequencyType === "Once"){
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"),
        "value" : scope_ManageActivitiesPresentationController.getFrequencyTypei18n(transObj.frequencyType)
        },{
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.TransferDate"),
        "value" : applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.scheduledDate)
        },{
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.payments.creditValueDate"),
        "value" : applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.creditValueDate)
        });
    }
    else {
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.frequency"),
        "value" : scope_ManageActivitiesPresentationController.getFrequencyTypei18n(transObj.frequencyType)
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
        segData.push({
          "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.EndDate"),
          "value" : applicationManager.getFormatUtilManager().getFormattedCalendarDate(transObj.frequencyEndDate)
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

  ManageActivities_PresentationController.prototype.setEuropeFlowType = function(flowType) {
    scope_ManageActivitiesPresentationController.europeFlowType = flowType;
  };

  ManageActivities_PresentationController.prototype.getEuropeFlowType = function() {
    return scope_ManageActivitiesPresentationController.europeFlowType;
  };

  ManageActivities_PresentationController.prototype.getFilteredRecentAccounts = function() {
    var recentsList = scope_ManageActivitiesPresentationController.toAccountList.RecentBenificiaries;
    var filteredRecentsList = [];
    if (recentsList) {
      for (var i = 0; i < recentsList.length; i++) {
        if (recentsList[i].IsInternationalAccount === "true" && scope_ManageActivitiesPresentationController.getEntitlementValue("isInternationalAccountsTransfer") === "true") {
          filteredRecentsList.push(recentsList[i]);
        }
        if (recentsList[i].IsInternationalAccount === "false" && scope_ManageActivitiesPresentationController.getEntitlementValue("isOtherBankAccountsTransfer") === "true") {
          filteredRecentsList.push(recentsList[i]);
        }
      }
      if (filteredRecentsList.length > 3) {
        filteredRecentsList.splice(3);
      }
    }
    return filteredRecentsList;
  };

  ManageActivities_PresentationController.prototype.processRecentsData = function (data) {
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
          dataArray = scope_ManageActivitiesPresentationController.processExternalAccountsData(dataArray);
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
  ManageActivities_PresentationController.prototype.processExternalAccountsData = function(data) {
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
  ManageActivities_PresentationController.prototype.getToAccounts = function() {
    return scope_ManageActivitiesPresentationController.toAccountList;
  };
  /**
   * This method is used to set the to accounts list from manage flow
   * parm {accList} - array of accounts with newly added account
   */
  ManageActivities_PresentationController.prototype.setToAccountsList=function(accList){
    scope_ManageActivitiesPresentationController.toAccountList=accList;
  };

    /**
   * This method is used to set setTransaction mode to each transfer
   * beneficiaries {array} - list of accounts/beneficiaries
   * transactionMode {string} - transaction mode of the beneficiaries/accounts
   */
  ManageActivities_PresentationController.prototype.addTransactionMode = function(beneficiaries,transactionMode){
    for(var i=0;i<beneficiaries.length;i++){
      beneficiaries[i]["transactionMode"]=transactionMode;
    }
    return beneficiaries;
  };

  ManageActivities_PresentationController.prototype.removeExternalAccountsWhichAreInRecents = function(externalAccountsData, recentsData) {
    var accountsToRemove = recentsData.map(function(obj) {
      return obj.accountID;
    });
    accountsToRemove = new Set(accountsToRemove);
    return externalAccountsData.filter(function(obj) {
      return !accountsToRemove.has(obj.accountID);
    });
  };
  
  

  ManageActivities_PresentationController.prototype.enterAddRecipientFlow = function(Index) {
    scope_ManageActivitiesPresentationController.clearBenificiaryData();
    
    var transactionObj = applicationManager.getRecipientsManager();
    
    switch (Index) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Beneficiary.SameBank"):
         transactionObj.setBeneficiaryAttribute("isSameBankAccount", true);
        transactionObj.setBeneficiaryAttribute("bankType", 'SAME.BANK');
        scope_ManageActivitiesPresentationController.setFlowType("OtherKonyBankMembersCreateTransfer");
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Beneficiary.NotSameBank"):
       transactionObj.setBeneficiaryAttribute("bankType", 'OTHER.BANK');
         transactionObj.setBeneficiaryAttribute("isSameBankAccount", false);

        break;
     
      default:
        break;
    }
   
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenNameEurope");
    
  };
    
  
    

  ManageActivities_PresentationController.prototype.enterAddNewBen = function() {
    var navMan = applicationManager.getNavigationManager()
    navMan.navigateTo("frmEuropeTransferToAccountNewBen");
  };


    /**
    * This method is used to build the values for to internal account in the model definition
    * Invokes from account details screen
    * @param {data} selected to internal account
    */
   ManageActivities_PresentationController.prototype.setTransferToAccountFromAccDetailsFlow=function(data){
    scope_ManageActivitiesPresentationController.clearEuropeFlowAtributes();
    var selectedToAccount=[];
    selectedToAccount.push(data);
    var processedDataValue = scope_ManageActivitiesPresentationController.processAccountsData(selectedToAccount, "to");
    var processedData=processedDataValue[0];
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("toAccountNumber", processedData["accountID"]);
    transactionManager.setTransactionAttribute("toAccountType", processedData["accountType"]);
    scope_ManageActivitiesPresentationController.isLoansAccountType = (processedData["accountType"] === "Loan") ? true : false; 
    transactionManager.setTransactionAttribute("toAccountName", processedData["accountName"]);
    transactionManager.setTransactionAttribute("transactionType", "InternalTransfer");
    transactionManager.setTransactionAttribute("toProcessedName", processedData["processedName"]);
    transactionManager.setTransactionAttribute("bankName", processedData["bankName"]);
    transactionManager.setTransactionAttribute("nextPaymentDate", processedData["nextPaymentDate"]);
    transactionManager.setTransactionAttribute("nextPaymentAmount", processedData["nextPaymentAmount"]);
    transactionManager.setTransactionAttribute("paymentDue", processedData["paymentDue"]);
    transactionManager.setTransactionAttribute("toAccountCurrency", processedData["toAccountCurrency"]); 
    transactionManager.setTransactionAttribute("transactionCurrency", processedData["toAccountCurrency"]); 
    scope_ManageActivitiesPresentationController.getFromAndToAccounts();
  };

  /**
    * This method is used to build the values for to internal account in the model definition
    * Invokes from account details screen
    * @param {data} selected from internal account
    */
  ManageActivities_PresentationController.prototype.setTransferFromAccountFromAccDetailsFlow = function (data) {
    scope_ManageActivitiesPresentationController.clearEuropeFlowAtributes();
    var selectedFromAccount = [];
    selectedFromAccount.push(data);
    var processedDataValue = scope_ManageActivitiesPresentationController.processAccountsData(selectedFromAccount, "from");
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
    //scope_ManageActivitiesPresentationController.getFromAndToAccounts();
    if (processedData.fromAccountCurrency) {
            transactionManager.setTransactionAttribute("fromAccountCurrency", processedData.fromAccountCurrency);
        } else {
            transactionManager.setTransactionAttribute("fromAccountCurrency", selectedFromAccount.currencyCode);
        }
    if (scope_ManageActivitiesPresentationController.getEuropeFlowType() === "INTERNAL") {  
      scope_ManageActivitiesPresentationController.getFromAccounts(scope_ManageActivitiesPresentationController.navigateToToAccount);
    }
    else {
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmEuropeTransferAmount", data);
      navMan.setEntryPoint("makeatransferfromacc", "frmEuropeTransferAmount");
      scope_ManageActivitiesPresentationController.getFromAndToAccounts(scope_ManageActivitiesPresentationController.navigateToToAccountSM);
    }  
  };

  ManageActivities_PresentationController.prototype.navigateToToAccountSM = function(res) {
    scope_ManageActivitiesPresentationController.setFromAndToAccounts(res);
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeTransferToAccountSM");
  }

  ManageActivities_PresentationController.prototype.navigateToToAccount = function (res) {
    // var accountManager = applicationManager.getAccountManager();
    // var toSupportedAccounts = accountManager.getToTransferSupportedAccounts();
    // scope_ManageActivitiesPresentationController.toSupportedOwnAccounts = toSupportedAccounts;
    scope_ManageActivitiesPresentationController.setFromAndToAccounts(res);
    scope_ManageActivitiesPresentationController.filterToAccountsByExludingFromAccount();
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeTransferToAccount");
  };

  ManageActivities_PresentationController.prototype.navigateToIBANDetails = function(recipientName) {
    var recipientsManager = applicationManager.getRecipientsManager();
    recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
    if (recipientsManager.benificiaryData.bankType !== 'SAME.BANK'){
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmtransfersIBANEurope");     
    }    
    else{
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEnterBenAccNoEurope");
    }
    
  };
  ManageActivities_PresentationController.prototype.navigateBackToVerifyDetails = function(accountData) {
    var recipientsManager = applicationManager.getRecipientsManager();
    recipientsManager.setBeneficiaryAttribute("addressLine2",accountData.addressLine2);
    recipientsManager.setBeneficiaryAttribute("addressLine1",accountData.addressLine1);
    recipientsManager.setBeneficiaryAttribute("city",accountData.city);
    recipientsManager.setBeneficiaryAttribute("zipcode",accountData.zipcode);
    recipientsManager.setBeneficiaryAttribute("country",accountData.country);    
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
  };
   ManageActivities_PresentationController.prototype.navigateToVerifyDetailsFromNickName = function(nickData) {
    var recipientsManager = applicationManager.getRecipientsManager();
    recipientsManager.setBeneficiaryAttribute("nickName",nickData.nickName);
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
  };
  ManageActivities_PresentationController.prototype.navigateToSwiftCodefromIBAN= function(data){
    var recipientsManager = applicationManager.getRecipientsManager();
    if(scope_ManageActivitiesPresentationController.isInternationIBANEntered){
      recipientsManager.setBeneficiaryAttribute("accountNumber","");
      recipientsManager.setBeneficiaryAttribute("IBAN",data);
    }
    else{
    recipientsManager.setBeneficiaryAttribute("accountNumber",data);
    recipientsManager.setBeneficiaryAttribute("IBAN","");
    scope_ManageActivitiesPresentationController.setIBAN("");
    }
    
    var bendata= scope_ManageActivitiesPresentationController.getBenificiaryData();
    if(bendata.swiftCode==scope_ManageActivitiesPresentationController.swiftforEnteredIBAN){
      recipientsManager.setBeneficiaryAttribute("swiftCode","");
      scope_ManageActivitiesPresentationController.setSwiftCode("");
      scope_ManageActivitiesPresentationController.swiftforEnteredIBAN="";
    }
    scope_ManageActivitiesPresentationController.setFlowType("InternationalRecipientCreateTransfer");
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenSwiftCodeEurope");
  };
  ManageActivities_PresentationController.prototype.navigateToVerifyDetailsFromSwiftCode= function(data){
    var recipientsManager = applicationManager.getRecipientsManager();
    var transactionManager = applicationManager.getTransactionManager();
    scope_ManageActivitiesPresentationController.setSwiftCode(data);
    recipientsManager.setBeneficiaryAttribute("swiftCode",data);
    var navMan=applicationManager.getNavigationManager();
    var lookUpResultData=navMan.getCustomInfo("frmLookUpResults");
     if(lookUpResultData && lookUpResultData.countryRegion && lookUpResultData.bic==data){
       if(lookUpResultData.countryRegion=="DOMESTIC"){
         scope_ManageActivitiesPresentationController.setFlowType("OtherBankRecipientsCreateTransfer");
       }
       else{
         scope_ManageActivitiesPresentationController.setFlowType("InternationalRecipientCreateTransfer");
       }
       if(lookUpResultData && lookUpResultData.formattedAddress!=undefined)
         transactionManager.setTransactionAttribute("bankAddress",lookUpResultData.formattedAddress)
       if (lookUpResultData && lookUpResultData.formattedAddress != undefined) 
         recipientsManager.setBeneficiaryAttribute("countryName", lookUpResultData.formattedAddress);        
        //  scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
     }
    else{
		//scope_ManageActivitiesPresentationController.fetchBankDetailsFromSwiftCode(data,"INTERNATIONAL_ACCOUNT_FUND_TRANSFER")
      if (lookUpResultData && lookUpResultData.formattedAddress != undefined) 
         recipientsManager.setBeneficiaryAttribute("countryName", lookUpResultData.formattedAddress)  
      // scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    }
    navMan.setEntryPoint("contracts",navMan.getCurrentForm());
    var flowType = scope_ManageActivitiesPresentationController.getFlowType();
    var featureAction = scope_ManageActivitiesPresentationController.getFeatureAction(flowType);
    scope_ManageActivitiesPresentationController.getContractDetails(featureAction);
  };
  
   ManageActivities_PresentationController.prototype.getPaymentMediumData = function () {
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

  ManageActivities_PresentationController.prototype.setPaymentMedium = function(paymentMedium) {
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
		if ((scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")) || (scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")))
			scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeFeePayment");
		else
			scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
    }
    else {
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
    }
  };

  ManageActivities_PresentationController.prototype.getFeesMediumData = function () {
    var segData = [];
    switch (scope_ManageActivitiesPresentationController.transactionMode) {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"):
		segData.push({
			"title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.IWillPay"),
			"description": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.IWillPayDescription")
			},{
			"title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.BenWillPay"),
			"description": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.BenWillPayDescription")
			},{
			"title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.SplitFees"),
			"description": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.SplitFeesDescription")
		});
		break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"):	
		segData.push({
			"title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.SplitFees"),
			"description": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.SplitFeesDescription")
		});
		break;
	}
    return segData;
  };

  ManageActivities_PresentationController.prototype.setFeesMedium = function(feesMedium) {
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
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
  };
    ManageActivities_PresentationController.prototype.searchSwiftorBICCode= function(searchData){
    var recipientsManager = applicationManager.getRecipientsManager();
      var criteria= searchData; 
      scope_ManageActivitiesPresentationController.searchSwiftData=searchData
      recipientsManager.searchSwiftorBICCode(criteria,scope_ManageActivitiesPresentationController.searchSwiftorBICCodePresentationSuccessCallBack, scope_ManageActivitiesPresentationController.searchSwiftorBICCodeErrorCallBack);
  };
  ManageActivities_PresentationController.prototype.searchSwiftorBICCodePresentationSuccessCallBack=function(succRes){
    scope_ManageActivitiesPresentationController.SwiftorBICCodeResults=succRes.swiftCodes;
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmLookUpResults");
  };
   ManageActivities_PresentationController.prototype.searchSwiftorBICCodeErrorCallBack = function(errorResponse){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if (errorResponse["isServerUnreachable"])
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
     else {
       var controller = applicationManager.getPresentationUtility().getController('frmTransferEuropeSearchSwiftCode', true);
       controller.bindGenericError(errorResponse.errorMessage);
     }
   };
  ManageActivities_PresentationController.prototype.searchAllSwiftBICCode= function(searchData){
    var recipientsManager = applicationManager.getRecipientsManager();
      var criteria= searchData; 
      scope_ManageActivitiesPresentationController.searchSwiftData=searchData
      recipientsManager.searchAllSwiftBICCode(criteria,scope_ManageActivitiesPresentationController.searchAllSwiftBICCodePresentationSuccessCallBack, scope_ManageActivitiesPresentationController.searchAllSwiftBICCodeErrorCallBack);
  };
  ManageActivities_PresentationController.prototype.searchAllSwiftBICCodePresentationSuccessCallBack=function(succRes){
    scope_ManageActivitiesPresentationController.SwiftorBICCodeResults=succRes.swiftCodes;
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmLookUpResults");
  };
   ManageActivities_PresentationController.prototype.searchAllSwiftBICCodeErrorCallBack = function(errorResponse){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if (errorResponse["isServerUnreachable"])
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
     else {
       var controller = applicationManager.getPresentationUtility().getController('frmTransferEuropeSearchSwiftCode', true);
       controller.bindGenericError(errorResponse.errorMessage);
     }
   };
  ManageActivities_PresentationController.prototype.clearSwiftBICSearch = function () {
    scope_ManageActivitiesPresentationController.searchSwiftData = {};
  };  
  ManageActivities_PresentationController.prototype.getSwiftorBICCodeResults = function(){
    return scope_ManageActivitiesPresentationController.SwiftorBICCodeResults;
  };
  ManageActivities_PresentationController.prototype.setLookUpResultData = function(selectSwiftData){
    var recipientsManager = applicationManager.getRecipientsManager();
    scope_ManageActivitiesPresentationController.SwiftorBICCodeResults={};
    scope_ManageActivitiesPresentationController.setSwiftCode(selectSwiftData.bic);
    recipientsManager.setBeneficiaryAttribute("swiftCode",selectSwiftData.bic);
    scope_ManageActivitiesPresentationController.setBankName(selectSwiftData.bankName);
    recipientsManager.setBeneficiaryAttribute("bankName",selectSwiftData.bankName);
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenSwiftCodeEurope");
  };
  
  ManageActivities_PresentationController.prototype.getFurtherDetailsData = function() {
    var segData = [];
    var transObj = scope_ManageActivitiesPresentationController.getTransObject();
    var configManager = applicationManager.getConfigurationManager();
    var totalAmount = transObj.totalAmount;
    var feesPaidBy;  
    if(totalAmount){
     segData.push(
      {
      "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.TotalAmount"),
      "value" : scope_ManageActivitiesPresentationController.formatAmountAndAppendCurrencyEurope(totalAmount, transObj.fromAccountCurrency)
      });
    }
  //  segData.push({
   //   "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.BeneficiaryReceives"),
  //    "value" : scope_ManageActivitiesPresentationController.formatAmountAndAppendCurrencyEurope(transObj.amount,transObj.transactionCurrency)
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
  ManageActivities_PresentationController.prototype.getCurrencyData = function(){
      var configManager =  applicationManager.getConfigurationManager();
      var segData = [];
      segData.push(
        {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('AUD'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.AustralianDollar'),
          currencyCode: 'AUD',
          currencySymbol: "(" + configManager.getCurrency('AUD') + ")"
        },
        {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('CAD'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.CanadianDollar'),
          currencyCode: 'CAD',
          currencySymbol: "(" + configManager.getCurrency('CAD') + ")"
        },
        {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('EUR'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.Euro'),
          currencyCode: 'EUR',
          currencySymbol: "(" + configManager.getCurrency('EUR') + ")"
        },
        {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('GBP'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.BritishPound'),
          currencyCode: 'GBP',
          currencySymbol: "(" + configManager.getCurrency('GBP') + ")"
        },
        {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('JPY'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.JapaneseYen'),
          currencyCode: 'JPY',
          currencySymbol: "(" + configManager.getCurrency('JPY') + ")"
        },
        {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('CHF'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.SwissFranc'),
          currencyCode: 'CHF',
          currencySymbol: "(" + configManager.getCurrency('CHF') + ")"
        },
        {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.USDollar'),
          currencyCode: 'USD',
          currencySymbol: "(" + configManager.getCurrency('USD') + ")"
        },
        {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
          currencyName: 'YER',
          currencyCode: 'YER',
          currencySymbol: "(" + configManager.getCurrency('YER') + ")"
        },
        {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
          currencyName: 'SAR',
          currencyCode: 'SAR',
          currencySymbol: "(" + configManager.getCurrency('SAR') + ")"
        }
      );
      return segData;
    };
  
 ManageActivities_PresentationController.prototype.getCurrenciesData = function(){
      var configManager =  applicationManager.getConfigurationManager();
      var currencyList = scope_ManageActivitiesPresentationController.supportedCurrencies;
      var segCurData = [];
      if (Array.isArray(currencyList)) {
      for (var i = 0; i < currencyList.length; i++) {
        var currency = currencyList[i].currency;
        var data = {};
        if (currency === 'AUD') 
        data = {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('AUD'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.AustralianDollar'),
          currencyCode: 'AUD',
          currencySymbol: "(" + configManager.getCurrency('AUD') + ")"
        };
        if (currency === 'CAD') 
        data = {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('CAD'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.CanadianDollar'),
          currencyCode: 'CAD',
          currencySymbol: "(" + configManager.getCurrency('CAD') + ")"
        };
         if (currency === 'EUR') 
        data = {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('EUR'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.Euro'),
          currencyCode: 'EUR',
          currencySymbol: "(" + configManager.getCurrency('EUR') + ")"
        };
         if (currency === 'GBP')
        data = {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('GBP'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.BritishPound'),
          currencyCode: 'GBP',
          currencySymbol: "(" + configManager.getCurrency('GBP') + ")"
        };
         if (currency === 'JPY') 
        data = {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('JPY'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.JapaneseYen'),
          currencyCode: 'JPY',
          currencySymbol: "(" + configManager.getCurrency('JPY') + ")"
        };
         if (currency === 'CHF') 
       data = { 
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('CHF'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.SwissFranc'),
          currencyCode: 'CHF',
          currencySymbol: "(" + configManager.getCurrency('CHF') + ")" 
        };
         if (currency === 'USD') 
        data = {
          imgSrc: scope_ManageActivitiesPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
          currencyName: kony.i18n.getLocalizedString('kony.mb.TransfersEurope.USDollar'),
          currencyCode: 'USD',
          currencySymbol: "(" + configManager.getCurrency('USD') + ")"
        };
        if (currency === 'YER') 
        data = {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
          currencyName: 'YER',
          currencyCode: 'YER',
          currencySymbol: "(" + configManager.getCurrency('YER') + ")"
        };
         if (currency === 'SAR') 
        data = {
          imgSrc: scope_TransfersPresentationController.getCurrencyFlag('USD'),//'australiandollar.png',
          currencyName: 'SAR',
          currencyCode: 'SAR',
          currencySymbol: "(" + configManager.getCurrency('SAR') + ")"
        };
        segCurData.push(data);
      }
    }
   return segCurData;
 };
  
  ManageActivities_PresentationController.prototype.getCurrencyFlag = function(currency){
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
  ManageActivities_PresentationController.prototype.fetchBankDetailsAndNavigate= function(data){
    var recipientsManager = applicationManager.getRecipientsManager();
     scope_ManageActivitiesPresentationController.setIBAN(data.replace(/\s/g, ""));
     recipientsManager.setBeneficiaryAttribute("IBAN",data.replace(/\s/g,""));
     recipientsManager.setBeneficiaryAttribute("accountNumber", data.replace(/\s/g, ""));
      var criteria={};
     /* if(data){
	 	criteria = kony.mvc.Expression.eq("iban", data);
      }*/ 
     var iban = data.replace(/\s/g, "");
     criteria.iban = iban;
     criteria.countryCode = iban.slice(0,2);
    recipientsManager.searchSwiftorBICCode(criteria,scope_ManageActivitiesPresentationController.fetchBankDetailsAndNavigatePresentationSuccessCallBack, scope_ManageActivitiesPresentationController.fetchBankDetailsAndNavigateErrorCallBack);
    //scope_ManageActivitiesPresentationController.searchSwiftorBICCodePresentationSuccessCallBack(response)
  };
   ManageActivities_PresentationController.prototype.fetchBankDetailsAndNavigatePresentationSuccessCallBack= function(succRes){
     var bankData= (succRes.swiftCodes) ? succRes.swiftCodes[0] : succRes;
     var recipientsManager = applicationManager.getRecipientsManager();
     scope_ManageActivitiesPresentationController.setSwiftCode(bankData.bic);
     recipientsManager.setBeneficiaryAttribute("swiftCode",bankData.bic);
    // recipientsManager.setBeneficiaryAttribute("accountNumber","");
     scope_ManageActivitiesPresentationController.swiftforEnteredIBAN = bankData.bic;
     scope_ManageActivitiesPresentationController.setBankName(bankData.bankName);
     scope_ManageActivitiesPresentationController.setBankCountryName(bankData.country);
      scope_ManageActivitiesPresentationController.setFlowType("OtherBankRecipientsCreateTransfer");
    //  scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    var navMan = applicationManager.getNavigationManager();
     navMan.setEntryPoint("contracts",navMan.getCurrentForm());
    var flowType = scope_ManageActivitiesPresentationController.getFlowType();
    var featureAction = scope_ManageActivitiesPresentationController.getFeatureAction(flowType);
    scope_ManageActivitiesPresentationController.getContractDetails(featureAction);
   };
    ManageActivities_PresentationController.prototype.fetchBankDetailsAndNavigateErrorCallBack= function(errorResponse){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if (errorResponse["isServerUnreachable"])
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
     else {
       var controller = applicationManager.getPresentationUtility().getController('frmtransfersIBANEurope', true);
       controller.bindGenericError(errorResponse.errorMessage);
     }
    };
  /* Inorder Fetch Valid BAnk Details on Inetrnational IBAN */
   ManageActivities_PresentationController.prototype.fetchInterBankDetailsAndNavigate= function(data){
    var recipientsManager = applicationManager.getRecipientsManager();
     scope_ManageActivitiesPresentationController.setIBAN(data.replace(/\s/g, ""));
     recipientsManager.setBeneficiaryAttribute("IBAN",data.replace(/\s/g,""));
     recipientsManager.setBeneficiaryAttribute("accountNumber", data.replace(/\s/g, ""));
      var criteria={};
     var iban = data.replace(/\s/g, "");
     criteria.iban = iban;
     criteria.countryCode = iban.slice(0,2);
    recipientsManager.searchSwiftorBICCode(criteria,scope_ManageActivitiesPresentationController.fetchInterBankDetailsAndNavigatePresentationSuccessCallBack, scope_ManageActivitiesPresentationController.fetchBankDetailsAndNavigateErrorCallBack);
  };
   ManageActivities_PresentationController.prototype.fetchInterBankDetailsAndNavigatePresentationSuccessCallBack= function(succRes){
     var bankData= (succRes.swiftCodes) ? succRes.swiftCodes[0] : succRes;
     var recipientsManager = applicationManager.getRecipientsManager();
     scope_ManageActivitiesPresentationController.setSwiftCode(bankData.bic);
     recipientsManager.setBeneficiaryAttribute("swiftCode",bankData.bic);
    // recipientsManager.setBeneficiaryAttribute("accountNumber","");
     scope_ManageActivitiesPresentationController.swiftforEnteredIBAN = bankData.bic;
     scope_ManageActivitiesPresentationController.setBankName(bankData.bankName);
     scope_ManageActivitiesPresentationController.setBankCountryName(bankData.country);
	 scope_ManageActivitiesPresentationController.setFlowType("InternationalRecipientCreateTransfer");
    //  scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
    var navMan = applicationManager.getNavigationManager();
     navMan.setEntryPoint("contracts",navMan.getCurrentForm());
    var flowType = scope_ManageActivitiesPresentationController.getFlowType();
    var featureAction = scope_ManageActivitiesPresentationController.getFeatureAction(flowType);
    scope_ManageActivitiesPresentationController.getContractDetails(featureAction);
   };
  ManageActivities_PresentationController.prototype.fetchBankDetailsFromSwiftCode = function (swiftCode, serviceName) {
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
  ManageActivities_PresentationController.prototype.fetchBankDetailsFromSwiftCodeSuccess = function (response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	scope_ManageActivitiesPresentationController.setBankName(response.bankName);
    scope_ManageActivitiesPresentationController.setFlowType("InternationalRecipientCreateTransfer");
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
  };
  /** Failure callback when fetching of bank details for international transfer fails
     */
  ManageActivities_PresentationController.prototype.fetchBankDetailsFromSwiftCodeFailure = function (err) {
     applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmBenSwiftCodeEurope', true);
            controller.bindGenericError(err.errorMessage);
        }
  };

ManageActivities_PresentationController.prototype.setTransactionMode = function(serviceName) {
    switch (serviceName) {
      case "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE":
        scope_ManageActivitiesPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
        break;
      case "INTRA_BANK_FUND_TRANSFER_CREATE":
        scope_ManageActivitiesPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
        break;
      case "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE":
        scope_ManageActivitiesPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
        break;
      case "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE":
        scope_ManageActivitiesPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
        break;
      case "P2P_CREATE":
        scope_ManageActivitiesPresentationController.transactionMode = "PayAPerson";
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
  ManageActivities_PresentationController.prototype.deleteRecurrenceTransaction = function(data) {
    var criteria = {
      "transactionId": data
    };
    var cancelRecurrenceBasedOnTransactionMode = scope_ManageActivitiesPresentationController.getCanceRecFunctionReference();
    if (cancelRecurrenceBasedOnTransactionMode)
      cancelRecurrenceBasedOnTransactionMode(criteria, scope_ManageActivitiesPresentationController.deleteSuccess, scope_ManageActivitiesPresentationController.deleteError);
  };

  ManageActivities_PresentationController.prototype.getCanceRecFunctionReference = function() {
    var managerFunction;
    var transactionManager = applicationManager.getTransactionManager();
    switch(scope_ManageActivitiesPresentationController.transactionMode) {
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
  ManageActivities_PresentationController.prototype.deleteTransaction = function(data) {
    var transactionObj = applicationManager.getTransactionManager().getTransactionObject();
    var transactionType = transactionObj.transactionType;
    var criteria = {
      "transactionId": data,
      "transactionType" : transactionType
    };
    var transactionObj = applicationManager.getTransactionManager();
    var deleteTransactionBasedOnTransactionMode = scope_ManageActivitiesPresentationController.getDeleteFunctionReference();
    if (deleteTransactionBasedOnTransactionMode)
      deleteTransactionBasedOnTransactionMode(criteria, scope_ManageActivitiesPresentationController.deleteSuccess, scope_ManageActivitiesPresentationController.deleteError);
  };

  ManageActivities_PresentationController.prototype.getDeleteFunctionReference = function() {
    var managerFunction;
    var transactionManager = applicationManager.getTransactionManager();
    switch(scope_ManageActivitiesPresentationController.transactionMode) {
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
  ManageActivities_PresentationController.prototype.deleteSuccess = function(res) {
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
  ManageActivities_PresentationController.prototype.deleteError = function(err) {
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
      var navMan = applicationManager.getNavigationManager();
      //var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
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
  ManageActivities_PresentationController.prototype.repeatTransfer = function (transactionData) {
    var formatUtil = applicationManager.getFormatUtilManager();
    var navMan = applicationManager.getNavigationManager();
    var transactionObj = applicationManager.getTransactionManager();
    var currencyArray = scope_ManageActivitiesPresentationController.getCurrencyArray();
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
      if (scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")) {
        transactionObj.setTransactionAttribute("paymentType", "SEPA");
        transactionObj.setTransactionAttribute("paymentMedium", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.DomesticPayment"));

      }
    }
    if(transactionData.chargeBearer !== null && transactionData.chargeBearer !== undefined) {
      transactionData.paidby = transactionData.chargeBearer;
      transactionObj.setTransactionAttribute("paidBy", transactionData.paidby);
    }
    if ((transactionData.paidby !== undefined && transactionData.paidby !== null) && (transactionData.chargeBearer === null || transactionData.chargeBearer === undefined)) {
      var chargeBearerValue = scope_ManageActivitiesPresentationController.getChargeBearerValue(transactionData.paidby);
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
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("UnifiedTransferFlowUIModule/frmSameBankNew");
      }
      else if(transactionData.serviceName === "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") {
        //navMan.setCustomInfo("frmDomesticTransferNew", {"transferType":"Domestic Transfer"});
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("UnifiedTransferFlowUIModule/frmDomesticTransferNew");
      }
      else if(transactionData.serviceName === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") {
        //navMan.setCustomInfo("frmInternationalTransferNew", {"transferType":"International Transfer"});
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("UnifiedTransferFlowUIModule/frmInternationalTransferNew");
      }
      else if(transactionData.serviceName === "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE") {
        navMan.setCustomInfo("frmSameBank", {"transferType":"Within Same Bank"});
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("UnifiedTransferFlowUIModule/frmSameBankNew");
      }
      else if(transactionData.serviceName === "P2P_CREATE") {
        navMan.setCustomInfo("frmP2PTransferNew", {"transferType":"Pay a Person"});
        if (applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")) {
          scope_ManageActivitiesPresentationController.commonFunctionForNavigation({ appName: 'TransfersMA', friendlyName: 'frmP2PTransferNew' });
        }
      }
      else {
        navMan.setCustomInfo("frmSameBank", {"transferType":"Within Same Bank"});
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("UnifiedTransferFlowUIModule/frmSameBankNew");
      }
    }
    else if(scope_configManager.TransferFlowType === "CTF") {
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation({"appName" : "TransfersMA", "friendlyName" : "TransferEuropeUIModule/frmEuropeVerifyTransferDetails"});
    }
    else {
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation({"appName" : "TransfersMA", "friendlyName" : "TransferEuropeUIModule/frmEuropeVerifyTransferDetails"});
    }
  };

  /**
   * This method is used to set the transaction to be edited into the transaction object
   * transactionData - {object} data of transaction to be edited.
   */
  ManageActivities_PresentationController.prototype.setTransactionObject = function(transactionData) {
    var formatUtil = applicationManager.getFormatUtilManager();
    var transactionObj = applicationManager.getTransactionManager();
    var navMan = applicationManager.getNavigationManager();
    var currencyArray = scope_ManageActivitiesPresentationController.getCurrencyArray();
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
      if (scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")) {
        transactionObj.setTransactionAttribute("paymentType", "SEPA");
        transactionObj.setTransactionAttribute("paymentMedium", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.DomesticPayment"));

      }
    }
        
         var chargeBearerValue = scope_ManageActivitiesPresentationController.getChargeBearerValue(transactionData.paidby);
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
     if(scope_configManager.TransferFlowType === "UTF") {
      if(transactionData.serviceName === "INTRA_BANK_FUND_TRANSFER_CREATE") {
        navMan.setCustomInfo("frmSameBank", {"transferType":"Within Same Bank"});
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("UnifiedTransferFlowUIModule/frmSameBankNew");
      }
      else if(transactionData.serviceName === "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") {
        navMan.setCustomInfo("frmDomesticTransferNew", {"transferType":"Domestic Transfer"});
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("UnifiedTransferFlowUIModule/frmDomesticTransferNew");
      }
      else if(transactionData.serviceName === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") {
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("UnifiedTransferFlowUIModule/frmInternationalTransferNew");
      }
      else if(transactionData.serviceName === "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE") {
        navMan.setCustomInfo("frmSameBank", {"transferType":"Within Same Bank"});
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("UnifiedTransferFlowUIModule/frmSameBankNew");
      }
      else if(transactionData.serviceName === "P2P_CREATE") {
        navMan.setCustomInfo("frmP2PTransferNew", {"transferType":"Pay a Person"});
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("UnifiedTransferFlowNew/frmP2PTransferNew");
      }
      else {
        navMan.setCustomInfo("frmSameBank", {"transferType":"Within Same Bank"});
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("UnifiedTransferFlowUIModule/frmSameBankNew");
      }
    }
    else if(scope_configManager.TransferFlowType === "CTF") {
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
    }
    else {
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeVerifyTransferDetails");
    }
  };

  ManageActivities_PresentationController.prototype.getCurrencyArray = function() {
    var configManager = applicationManager.getConfigurationManager();
    var currencyArray = [];
    var currencyObject = configManager.currencyCode;
    for (var key in currencyObject) {
        currencyArray.push(currencyObject[key]);
    }
    return currencyArray;
  };
  ManageActivities_PresentationController.prototype.enterManageRecipientsFlow = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var recipientManager = applicationManager.getRecipientsManager();
    recipientManager.fetchAllExternalAccounts(scope_ManageActivitiesPresentationController.fetchAllExternalAccountsPresentationSuccessCallback, scope_ManageActivitiesPresentationController.fetchAllExternalAccountsPresentationErrorCallback);
  };

  ManageActivities_PresentationController.prototype.fetchAllExternalAccountsPresentationSuccessCallback = function(res) {
    var navMan = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    var processedRecipientArray = [];
    for (var i = 0; i < res.length; i++) {
      var processedRecipient = null;
      var isInternationalBen = (res[i].isInternationalAccount === "true" && res[i].isSameBankAccount === "false") ? true : false;
      var isInternalBen = (res[i].isInternationalAccount === "false" && res[i].isSameBankAccount === "true") ? true : false;
      var isDomesticBen = (res[i].isInternationalAccount === "false" && res[i].isSameBankAccount === "false") ? true : false;
      if (isInternalBen && configManager.checkUserPermission("INTRA_BANK_FUND_TRANSFER_VIEW_RECEPIENT")){
        processedRecipient = scope_ManageActivitiesPresentationController.processRecipient(res[i]);
      }
      else if (isInternationalBen && configManager.checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT")){
        processedRecipient = scope_ManageActivitiesPresentationController.processRecipient(res[i]);
      }
      else if (isDomesticBen && configManager.checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT")) {
        processedRecipient = scope_ManageActivitiesPresentationController.processRecipient(res[i]);
      }
      if (processedRecipient !== null && processedRecipient !== undefined)
        processedRecipientArray.push(processedRecipient);  
    }
    navMan.setCustomInfo("frmEuropeManageBeneficiaries", processedRecipientArray);
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation({"appName":"TransfersMA","friendlyName":"ManageActivitiesUIModule/frmEuropeManageBeneficiaries"});
  };

  ManageActivities_PresentationController.prototype.processRecipient = function (recipient) {
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

  ManageActivities_PresentationController.prototype.fetchAllExternalAccountsPresentationErrorCallback = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (errorRes["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
   ManageActivities_PresentationController.prototype.isEuropeanIBAN = function(IBAN) {
   var europenaIban =["AT","BE","BG","CY","CZ","DK","EE","FI","FE","DE",
                      "GR","HU","IE","IT","LV","LU","LT","NL","MT","PL",
                      "PT","RO","SK","SI","ES","SE","GB","IS","LI","NO","CH"];
     if(europenaIban.indexOf(IBAN.substr(0,2))>0)
       return true;
     else
       return false;
     
  };
  ManageActivities_PresentationController.prototype.isValidbenificiaryName = function(benName,formName){
    var validationUtility = applicationManager.getValidationUtilManager();
    if (validationUtility.isValidbenificiaryName(benName)) {
      return true;
    }else {
      var controller = applicationManager.getPresentationUtility().getController(formName, true);
      controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.validBenName"));
      return false;
    }
  };
  ManageActivities_PresentationController.prototype.isvalidateAccountorIBAN = function(enteredData,formName){
    var validationUtility = applicationManager.getValidationUtilManager();
    var alphabetRegex= /^[A-Za-z]+$/;
    var numericRegex=  /^[0-9]+$/
    if (alphabetRegex.test(enteredData.substr(0,2))) {
      scope_ManageActivitiesPresentationController.isInternationIBANEntered=true;
       if (validationUtility.isValidIBAN(enteredData)){
         return true;
       }
       else{
         var controller = applicationManager.getPresentationUtility().getController(formName, true);
         controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transferEurope.invalidIBAN"));
         return false;
       }
    }else {
      scope_ManageActivitiesPresentationController.isInternationIBANEntered=false;
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
  
  ManageActivities_PresentationController.prototype.getFrequencyTypei18n = function(freqType) {
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

  ManageActivities_PresentationController.prototype.enableShare = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transactionManager = applicationManager.getTransactionManager();
    var transactionObject = transactionManager.getTransactionObject();
    var transactionMode = scope_ManageActivitiesPresentationController.getModeOfTransactionForShare("generate");
    var frequencyType = transactionObject.frequencyType;
    var transactionId = transactionObject.shareReferenceId;
    var params = {
      "transactionId" : transactionId,
      "transactionType" : frequencyType
    };
    transactionManager.generateTransactionPDF(params, scope_ManageActivitiesPresentationController.generateTransactionPDFSuccess.bind(this, params.transactionId), scope_ManageActivitiesPresentationController.generateTransactionPDFError);      
  };

  ManageActivities_PresentationController.prototype.generateTransactionPDFSuccess = function(tranId, res) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var controller = applicationManager.getPresentationUtility().getController('frmEuropeConfirmation', true);
    controller.showSharePopup(res.pdf, tranId);
  };
  
  // ManageActivities_PresentationController.prototype.getEncodedPDFStringSuccess = function(tranId, res) {
  //     applicationManager.getPresentationUtility().dismissLoadingScreen();
  //     var controller = applicationManager.getPresentationUtility().getController('frmEuropeConfirmation', true);
  //     controller.showSharePopup(res, tranId);
  // };

  ManageActivities_PresentationController.prototype.generateTransactionPDFError = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else {
      var controller = applicationManager.getPresentationUtility().getController('frmEuropeConfirmation', true);
      controller.bindGenericError("Unable to generate Report for sharing");
    }  
  };

  ManageActivities_PresentationController.prototype.getModeOfTransactionForShare = function(serviceName) {
    var transactionModeForShare;
    switch(scope_ManageActivitiesPresentationController.transactionMode) {
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
  
  ManageActivities_PresentationController.prototype.formatAmountAndAppendCurrencyEurope = function(amount, currencySymbolCode) {
    var formatUtilManager = applicationManager.getFormatUtilManager();
    if (kony.sdk.isNullOrUndefined(amount)) {
      amount = "0.00";
    }
    var formattedAmount = scope_ManageActivitiesPresentationController.formatAmountEurope(amount);
    var  currencySymbol= formatUtilManager.getCurrencySymbol(currencySymbolCode);
    return formattedAmount[0] === '-' ? ('-' + currencySymbol + formattedAmount.split('-')[1]) : currencySymbol + formattedAmount;
  };
  
  ManageActivities_PresentationController.prototype.formatAmountEurope = function(amount) {
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
  
  ManageActivities_PresentationController.prototype.removeLoanAccounts = function(accounts) {
    return accounts.filter(function(account) {
      return account.accountType !== "Loan";
    });
  };
  
  ManageActivities_PresentationController.prototype.setAmountBasedOnTransactionType = function() {
    var transactionManager = applicationManager.getTransactionManager();
    if (scope_ManageActivitiesPresentationController.previousAccountType && (scope_ManageActivitiesPresentationController.previousAccountType === "Loan" && scope_ManageActivitiesPresentationController.currentAccountType !== "Loan")) {
      transactionManager.setTransactionAttribute("amount", null);
    }
    else if (scope_ManageActivitiesPresentationController.previousAccountType && (scope_ManageActivitiesPresentationController.previousAccountType !== "Loan" && scope_ManageActivitiesPresentationController.currentAccountType === "Loan")) {
      transactionManager.setTransactionAttribute("amount", null);
      transactionManager.setTransactionAttribute("isScheduled", "0");
    }
    else if (scope_ManageActivitiesPresentationController.previousAccountType && (scope_ManageActivitiesPresentationController.previousAccountType === "Loan" && scope_ManageActivitiesPresentationController.currentAccountType === "Loan")) {
      transactionManager.setTransactionAttribute("amount", null);
      transactionManager.setTransactionAttribute("isScheduled", "0");
    }
  };
  
          // below method gets the base64 string of cheques image
  ManageActivities_PresentationController.prototype.viewImage = function(param) {
	applicationManager.getAccountManager().getBaseImage(param, this.successImageDetails.bind(this, param), this.failImageDetails.bind(this, param));
  };
  
  ManageActivities_PresentationController.prototype.successImageDetails = function( param, response) {
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
  ManageActivities_PresentationController.prototype.failImageDetails = function( param, response) {
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
  ManageActivities_PresentationController.prototype.downloadChequeFile = function(params,formname) {
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
  
  ManageActivities_PresentationController.prototype.downloadTransactionFile = function(params,formname) {
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
  
  ManageActivities_PresentationController.prototype.downloadTransactions = function(){
    var navMan=applicationManager.getNavigationManager();
    var searchData =  navMan.getCustomInfo("frmAdvanceSearch");
    var userManager = applicationManager.getUserPreferencesManager();
    searchData.generatedBy = userManager.getUserName();
    searchData.title="Transactions";
    var am = applicationManager.getAccountManager();
    var pdfurl = am.getDownloadTransctionURL(searchData);
    kony.application.openURL(pdfurl);
  };
  
  
  ManageActivities_PresentationController.prototype.getChargesBreakdown = function(){
    var segData = [];
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();

    if (transObj.chargesList) {
      for (var i = 0; i < transObj.chargesList.length; i++) {
        if (transObj.chargesList[i].chargeAmount){
        transactionFee = scope_ManageActivitiesPresentationController.formatAmountAndAppendCurrencyEurope(transObj.chargesList[i].chargeAmount, transObj.chargesList[i].chargeCurrency);
          segData.push({
            "property": transObj.chargesList[i].chargeName,
            "value": transactionFee
          });
        }
      }
    }

    return segData;
  };
  
  ManageActivities_PresentationController.prototype.downloadTransactionReport = function(requestParam) {
     var userManager = applicationManager.getUserPreferencesManager();
     requestParam.generatedBy = userManager.getUserName();
      applicationManager.getTransactionManager().DownloadTransactionPDF(requestParam, this.downloadTransactionReportSuccess.bind(this), this.downloadTransactionReportError.bind(this));
        //var pdfurl = applicationManager.getTransactionManager().DownloadTransactionPDF(requestParam);
       // kony.application.openURL(pdfurl);
    };

  ManageActivities_PresentationController.prototype.downloadTransactionReportSuccess = function(response) {
    var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url;
    var pdfurl = mfURL + "/objects/DownloadTransactionPDF?fileId=" + response.fileId;
    kony.application.openURL(pdfurl);
  };

  ManageActivities_PresentationController.prototype.downloadTransactionReportError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("error downloading report");
  };
   ManageActivities_PresentationController.prototype.selectBenBank = function () {
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
  
    ManageActivities_PresentationController.prototype.filterSegmentDataBasedOnType = function(data, filter) {
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

  ManageActivities_PresentationController.prototype.getToAccountDataEditFlow = function() {
    var transactionManager = applicationManager.getTransactionManager();
    var transactionObject = transactionManager.getTransactionObject();
    return {
      "toProcessedName" : transactionObject.toProcessedName,
      "toAccountName" : transactionObject.toAccountName
    }
  };  
  
  ManageActivities_PresentationController.prototype.deleteBeneficiary = function(beneficiaryData) {
    var recipientManager = applicationManager.getRecipientsManager();
    recipientManager.deleteABenificiary(beneficiaryData, scope_ManageActivitiesPresentationController.deleteBeneficiaryPresentationSuccess.bind(this, beneficiaryData), scope_ManageActivitiesPresentationController.deleteBeneficiaryPresentationError);
  };

  ManageActivities_PresentationController.prototype.deleteBeneficiaryPresentationSuccess = function(beneficiaryData, res) {
    var referenceId = res.Id;
    var navMan = applicationManager.getNavigationManager();
    var segData = scope_ManageActivitiesPresentationController.getAcknowledgementSegmentData("DELETE", referenceId);
    var beneficiaryName = (beneficiaryData.beneficiaryName) ? beneficiaryData.beneficiaryName : beneficiaryData.nickName;
    var title = beneficiaryName + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.HasSuccessfullyBeenRemoved");
    if(res.transactionStatus && res.transactionStatus.toUpperCase() === "PENDING"){
      title = beneficiaryName + " " + applicationManager.getPresentationUtility().getStringFromi18n("i18n.TransfersEur.BeneficiaryRemovedApproval");
    }
    var ackdata = {
      "title" : title,
      "segData" : segData,
      "screenType" : "DELETE"
    };
    navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
    scope_ManageActivitiesPresentationController.commonFunctionForNavigation({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
  };

  ManageActivities_PresentationController.prototype.deleteBeneficiaryPresentationError = function(errorResponse) {
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
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
    }
  };

  ManageActivities_PresentationController.prototype.getAcknowledgementSegmentData = function(screenType, referenceId) {
    var segData = [];
    if (screenType === "DELETE") {
      segData.push({
        "property" : applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ReferenceID"),
        "value" : referenceId
      });
    }
    else 
    {
      var beneficiaryData=scope_ManageActivitiesPresentationController.getBenificiaryData();
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
  	        ManageActivities_PresentationController.prototype.addBeneficiaryDetails = function(beneficiaryData) {
        //applicationManager.getPresentationUtility().dismissLoadingScreen();
       applicationManager.getRecipientsManager().createExternalAccount(beneficiaryData, this.createBeneficiarySuccess.bind(this, beneficiaryData), this.createBeneficiaryFailure.bind(this));
    };
     ManageActivities_PresentationController.prototype.createBeneficiarySuccess = function(beneficiaryData, response) {
       applicationManager.getPresentationUtility().dismissLoadingScreen();
	   var referenceId =  response.Id;
       var navMan=applicationManager.getNavigationManager();
	   var segData = scope_ManageActivitiesPresentationController.getAcknowledgementSegmentData("ADD", referenceId);
	   var beneficiaryName = beneficiaryData.beneficiaryName;
       var title = beneficiaryName + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.BenAdded");
      var ackdata = {
      "title" : title,
      "segData" : segData,
      "screenType" : "ADD"
    };
	   navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
        scope_ManageActivitiesPresentationController.isNavigated = true;
       navMan.navigateTo({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
        };

   ManageActivities_PresentationController.prototype.createBeneficiaryFailure = function(errorResponse) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errorResponse["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
    else
       var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetailsEurope', true);
       controller.bindGenericError(errorResponse.errorMessage);
    };
  
  ManageActivities_PresentationController.prototype.validateATransfer = function(segData) {

    var transactionManager = applicationManager.getTransactionManager();
    var transactionObj = transactionManager.getTransactionObject();

    var requestData = scope_ManageActivitiesPresentationController.filterTransactionObject();
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
		if (scope_ManageActivitiesPresentationController.europeFlowType === "EXTERNAL" && (scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") || scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"))) {
          if (requestData.swiftCode === "" || requestData.swiftCode === null || requestData.swiftCode === undefined) {
            var swiftCode = scope_ManageActivitiesPresentationController.getSwiftCodeForTransfer(requestData.toAccountNumber);
            transactionManager.setTransactionAttribute("swiftCode", swiftCode);
            requestData.swiftCode = swiftCode;
          }
        }
    var createTransactionBasedOnTransactionMode = scope_ManageActivitiesPresentationController.getCreateFunctionReference();
    requestData = scope_ManageActivitiesPresentationController.filterRequestData(requestData);
    ['charges', 'totalAmount', 'creditValueDate','exchangeRate'].forEach(e => delete requestData[e]);
    if (createTransactionBasedOnTransactionMode)
      createTransactionBasedOnTransactionMode(requestData, this.presentationValidateATransferSuccess.bind(this, segData), this.presentationValidateATransferError.bind(this, segData));

  };

  ManageActivities_PresentationController.prototype.presentationValidateATransferSuccess = function(segData, resp) {
    scope_ManageActivitiesPresentationController.validateReferenceId =resp.referenceId;
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    var totalCharges = 0;
    var totalChargeCurrency = 0;
    // total debit field for all type of transfers 
    if(resp.totalAmount){
     segData.unshift({
          "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.TotalAmount"),
          "value": scope_ManageActivitiesPresentationController.formatAmountAndAppendCurrencyEurope(resp.totalAmount, transObj.fromAccountCurrency),
          "chevronImg": "chevron.png"
        });
    }
    if(resp.creditValueDate){
      var creditValueDate="";
      if(resp && resp.creditValueDate){
        creditValueDate = applicationManager.getFormatUtilManager().getFormattedCalendarDate(resp.creditValueDate);
      }
      segData.forEach(function(obj){
        if(obj["property"] == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.payments.creditValueDate"))
          obj["value"] = {"text":creditValueDate,"right":"20dp","skin":"sknlbl424242ssp40px"};
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
    transactionManager.setTransactionAttribute("totalAmount",resp.totalAmount);
    
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
  
  ManageActivities_PresentationController.prototype.presentationValidateATransferError = function(segData, err) {
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
    ManageActivities_PresentationController.prototype.processCreditCardAccountsData = function(data) {
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
    }
    return accProcessedData;
  };

  ManageActivities_PresentationController.prototype.checkForOverrides = function(requestPayload) {
    var transObj = scope_ManageActivitiesPresentationController.getTransObject();
    var navMan = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
//     if (scope_ManageActivitiesPresentationController.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") && transObj.paymentType === "SEPA") {
    if(transObj.messageDetails !== null && transObj.messageDetails !== undefined && transObj.messageDetails !== " "){
        var data = {
                        attachmentPayload: requestPayload
                    };
       navMan.setCustomInfo("frmTransfersPaymentMedium", data);
       scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmTransfersPaymentMedium");
//        }
//         else {
//         if (configManager.cutOffTimeBreachedOverride === true && configManager.cutOffProductOverride === true){
//           var data = {
//             ui : "twoOptions",
//             attachmentPayload : requestPayload
//           }
//           navMan.setCustomInfo("frmTransfersPaymentMedium", data);
//           scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmTransfersPaymentMedium");
//         }
//         else if (configManager.cutOffTimeBreachedOverride === true && configManager.cutOffProductOverride === false) {
//           var data = {
//             ui : "oneOption",
//             attachmentPayload : requestPayload
//           };
//           navMan.setCustomInfo("frmTransfersPaymentMedium", data);
//           scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmTransfersPaymentMedium");
//         }
//         else {
//           scope_ManageActivitiesPresentationController.makeATransfer(requestPayload);
//         }
       } else {
        scope_ManageActivitiesPresentationController.makeATransfer(requestPayload);
    }
  };

  ManageActivities_PresentationController.prototype.continueWithDomesticPayment = function(attachmentReq) {
    var recipientManager = applicationManager.getRecipientsManager();
    applicationManager.getPresentationUtility().showLoadingScreen();
    recipientManager.fetchBankDate({}, scope_ManageActivitiesPresentationController.fetchBankDateSuccess.bind(this,attachmentReq), scope_ManageActivitiesPresentationController.fetchBankDateFailure);
  };

  ManageActivities_PresentationController.prototype.fetchBankDateSuccess = function(attachmentReq, response) {
    var transactionManager = applicationManager.getTransactionManager();
    var formatUtilManager = applicationManager.getFormatUtilManager();
    var bankDate = response.date[0].nextWorkingDate;
    var formattedDate = formatUtilManager.getFormatedDateString(formatUtilManager.getDateObjectfromString(bankDate), "m/d/yy");
    transactionManager.setTransactionAttribute("frequencyStartDate", formattedDate);
    transactionManager.setTransactionAttribute("isScheduled", "1");
    scope_ManageActivitiesPresentationController.makeATransfer(attachmentReq); 
  };

  ManageActivities_PresentationController.prototype.fetchBankDateFailure = function (err) {
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    } else {
      var transactionManager = applicationManager.getTransactionManager();
      transactionManager.setTransactionAttribute("errmsg", err.errorMessage);
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmEuropeConfirmation");
    }
  };

  ManageActivities_PresentationController.prototype.getBeneficiaryName = function(accountNumber) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var params = {
      "accountNumber": accountNumber
    };
    applicationManager.getRecipientsManager().getPayeeName(params, this.getBeneficiaryNameSuccess.bind(this, accountNumber), this.getBeneficiaryNameFailure);
  };

  ManageActivities_PresentationController.prototype.getBeneficiaryNameSuccess = function(accountNumber, res) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var recipientsManager = applicationManager.getRecipientsManager();
    var transactionManager = applicationManager.getTransactionManager();
    if (res.beneficiaryName  && res.beneficiaryName.length !== 0) {
      recipientsManager.setBeneficiaryAttribute("beneficiaryName", res.beneficiaryName);
      recipientsManager.setBeneficiaryAttribute("accountNumber", accountNumber);
	  recipientsManager.setBeneficiaryAttribute("IBAN", accountNumber);
      transactionManager.setTransactionAttribute("transactionCurrency", res.currency);
      scope_ManageActivitiesPresentationController.toBenCurrency = res.currency;
      //scope_ManageActivitiesPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
      var navMan = applicationManager.getNavigationManager();
      navMan.setEntryPoint("contracts",navMan.getCurrentForm());
      var flowType = scope_ManageActivitiesPresentationController.getFlowType();
      var featureAction = scope_ManageActivitiesPresentationController.getFeatureAction(flowType);
      scope_ManageActivitiesPresentationController.getContractDetails(featureAction);
    }  
    else {
      var controller = applicationManager.getPresentationUtility().getController("frmEnterBenAccNoEurope", true);
      controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransferEurope.AccountNumberDoesNotMatch"));
    }  
  };

  ManageActivities_PresentationController.prototype.getBeneficiaryNameFailure = function (error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error.errorMessage);
    }
  };
  
  ManageActivities_PresentationController.prototype.getPaymentMethod = function () {
    switch(scope_ManageActivitiesPresentationController.transactionMode) {
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
  ManageActivities_PresentationController.prototype.setBenAddressInTransactionObject = function(data) {
    var address = "";
    if (data.addressLine1) {
      address = data.addressLine1;
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

  ManageActivities_PresentationController.prototype.filterRequestData = function(transObj) {
    for(var key in transObj) {
      if (transObj.hasOwnProperty(key)) {
        if (typeof transObj[key] !== "string" || transObj[key] === "") {
          delete transObj[key];
        }
      }
    }
    return transObj;
  };

  ManageActivities_PresentationController.prototype.navToContractDetails= function(recipientName){
    var recipientsManager = applicationManager.getRecipientsManager();
    if(recipientName !== undefined){
      recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
    }
    var flowType = scope_ManageActivitiesPresentationController.getFlowType();
    var featureAction = scope_ManageActivitiesPresentationController.getFeatureAction(flowType);
    scope_ManageActivitiesPresentationController.getContractDetails(featureAction);
  };

  ManageActivities_PresentationController.prototype.getFeatureAction= function(flowType){
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

  ManageActivities_PresentationController.prototype.getContractDetails = function(featureAction, successCallback, errorCallback){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var recipientsManager = applicationManager.getRecipientsManager();
    recipientsManager.fetchContractDetails(featureAction, scope_ManageActivitiesPresentationController.getContractDetailsSuccessCallBack.bind(this, successCallback),scope_ManageActivitiesPresentationController.getContractDetailsErrorCallback.bind(this, errorCallback));
  };

  ManageActivities_PresentationController.prototype.getContractDetailsSuccessCallBack = function(successCallback, response){
   // var controller = applicationManager.getPresentationUtility().getController('ManageActivitiesUIModule/frmContracts', true);
    var flowType = scope_ManageActivitiesPresentationController.getFlowType();
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
      }
      else {
        var cif = []
        cif.push({
          "contractId": response.contracts[0].contractId,
          "coreCustomerId": response.contracts[0].contractCustomers[0].coreCustomerId
        });
        applicationManager.getRecipientsManager().setBeneficiaryAttribute("cif", JSON.stringify(cif));
        applicationManager.getRecipientsManager().setBeneficiaryAttribute("totalContractCustomerSelected",1);
        scope_ManageActivitiesPresentationController.commonFunctionForNavigation("ManageActivitiesUIModule/frmBenVerifyDetailsEurope");
      }
    }
	else{
      if(navMan.getEntryPoint("createEuropeExternalBenificiaries")==="frmEuropeTransferToAccountSM"){     
        var recipientsManager = applicationManager.getRecipientsManager();
        var cif = [];
        var customerCount = response.contracts.length;
        for(let i=0; i<customerCount; i++){
          cif.push({"contractId": response.contracts[i].contractId,
                    "coreCustomerId": response.contracts[i].contractCustomers[0].coreCustomerId
                   }); 
        }
        cif = JSON.stringify(cif);
        recipientsManager.setBeneficiaryAttribute("cif", cif);
        recipientsManager.setBeneficiaryAttribute("totalContractCustomerSelected", customerCount);
        scope_TransfersPresentationController.commonFunctionForNavigation("frmBenVerifyDetailsEurope");
      }
    else{
      var controller = applicationManager.getPresentationUtility().getController('ManageActivitiesUIModule/frmContracts', true);
      controller.bindContractsData(response);
      if(flowType==="editTransfer"){
      var editController = applicationManager.getPresentationUtility().getController(previousForm, true);
      editController.isEditLinkedCustomerAvailable = true;
    }
    else {
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation("ManageActivitiesUIModule/frmContracts");
    }
    }
	}
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (typeof successCallback === "function")
    successCallback();
  };
    
  ManageActivities_PresentationController.prototype.getContractDetailsErrorCallback = function(errorCallback, err){
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

  ManageActivities_PresentationController.prototype.getChargeBearerValue = function(paidBy) {
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

  ManageActivities_PresentationController.prototype.getAllowedFromAccounts = function (accounts) {
    var CREATE_ACTIONS = [
      "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE",
      "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE",
      "INTRA_BANK_FUND_TRANSFER_CREATE",
      "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE"
    ];
     return accounts.filter(this.isAccountHaveAtleastOneActions.bind(this, CREATE_ACTIONS));
  };

  ManageActivities_PresentationController.prototype.isAccountHaveAtleastOneActions = function (permissions, accountObject) {
    return permissions.some(function(permission) {
     return  applicationManager.getConfigurationManager().checkAccountAction(accountObject.accountID,permission)
    })
  };
  
  ManageActivities_PresentationController.prototype.updateBenificiaryCIF = function() {
		applicationManager.getPresentationUtility().showLoadingScreen();
		var transferModPresentationController = applicationManager.getModulesPresentationController("ManageActivitiesUIModule");
    var benificiaryDetails = transferModPresentationController.getBenificiaryData();
    var editDetails = benificiaryDetails;
		editDetails.payeeId = editDetails.Id;
		var recipientsManager = applicationManager.getRecipientsManager();
		recipientsManager.editABenificiary(editDetails, scope_ManageActivitiesPresentationController.updateRecipientsCIFSuccess, scope_ManageActivitiesPresentationController.updateRecipientsCIFError);
    };
  
	ManageActivities_PresentationController.prototype.updateRecipientsCIFSuccess = function(response) {        
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var referenceId = response.Id;
      var navMan = applicationManager.getNavigationManager();
      var segData = scope_ManageActivitiesPresentationController.getAcknowledgementSegmentData("ADD", referenceId);
      var beneficiaryData = scope_ManageActivitiesPresentationController.getBenificiaryData();
      var beneficiaryName = beneficiaryData.beneficiaryName;
      var title = beneficiaryName + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.BenEdited");
      if(response.transactionStatus && response.transactionStatus.toUpperCase() === "PENDING"){
        title = beneficiaryName + " " + applicationManager.getPresentationUtility().getStringFromi18n("i18n.TransfersEur.AmendmentRequestForApproval");
      }
      var ackdata = {
          "title": title,
          "segData": segData,
          "screenType": "ADD"
      };
      navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
      scope_ManageActivitiesPresentationController.isNavigated = true;
      navMan.navigateTo({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
    };
	ManageActivities_PresentationController.prototype.updateRecipientsCIFError = function(errorResponse) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (errorResponse["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
      else {
          var navMan = applicationManager.getNavigationManager();
          var ackdata = {
              "title": errorResponse.errorMessage
          }
          navMan.setCustomInfo("frmEuropeAcknowledgement", ackdata);
          scope_ManageActivitiesPresentationController.isNavigated = true;
          navMan.navigateTo({"friendlyName": "ManageActivitiesUIModule/frmEuropeAcknowledgement","appName": "TransfersMA"});
      }				
    };

    ManageActivities_PresentationController.prototype.navigateToBenificiaryDetails = function(selectedAccountDetails) {
      var recipientsManager = applicationManager.getRecipientsManager();
      recipientsManager.setBeneficiaryObject(selectedAccountDetails);
      if (scope_ManageActivitiesPresentationController.getFlowType() === "SameBankRecipients") {
        recipientsManager.setBeneficiaryAttribute("transactionMode",applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers"));
      }
      else if (scope_ManageActivitiesPresentationController.getFlowType() === "OtherBankRecipients") {
        recipientsManager.setBeneficiaryAttribute("transactionMode",applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"));
      }
     else if (scope_ManageActivitiesPresentationController.getFlowType() === "InternationalRecipients") {
        recipientsManager.setBeneficiaryAttribute("transactionMode",applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"));
      }
      scope_ManageActivitiesPresentationController.commonFunctionForNavigation({"appName":"TransfersMA","friendlyName":"ManageActivitiesUIModule/frmBeneficiaryDetailsEurope"});
  };
  
  ManageActivities_PresentationController.prototype.filterToAccountsByMembershipId = function(membershipId, toAccounts) {
    var recipientsManager = applicationManager.getRecipientsManager();
    var filteredToAccount = recipientsManager.filterToAccountsByMembershipId(membershipId, toAccounts);
    return filteredToAccount;
  }

    ManageActivities_PresentationController.prototype.filterFromAccountBasedOnCIF = function(fromAccounts) {
      var navMan = applicationManager.getNavigationManager();
      var transferModPresentationController = applicationManager.getModulesPresentationController("ManageActivitiesUIModule");
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

  ManageActivities_PresentationController.prototype.retriveAttachments = function(data, successCallback) {
    var requestParam = {};
    //requestParam.customerId = applicationManager.getUserPreferencesManager().getUserObj().userId;
    requestParam.transactionId = data.transactionId;
    applicationManager.getTransactionManager().retrieveAttachments(requestParam, successCallback, this.retriveAttachmentsError.bind(this));
  };
  
  ManageActivities_PresentationController.prototype.retriveAttachmentsError = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("error fetching attachments");
    var navMan = applicationManager.getNavigationManager();
    var currentFormId = kony.application.getCurrentForm().id;
    navMan.setCustomInfo(currentFormId, {"attachmentError" : error});
    var controller = applicationManager.getPresentationUtility().getController(currentFormId, true);
    controller.bindGenericError(error);
  };
  
  ManageActivities_PresentationController.prototype.getSwiftCodeForTransfer = function(toAccountNumber) {
    var domesticBen = scope_ManageActivitiesPresentationController.toAccountList.externalBenificiaries;
    var internationalBen = scope_ManageActivitiesPresentationController.toAccountList.internationalBenificiaries;
    var combinedArray = domesticBen.concat(internationalBen);
    for (var i = 0; i < combinedArray.length; i++) {
      if (combinedArray[i].accountNumber === toAccountNumber) {
        return combinedArray[i].swiftCode;
      }
    }
    return null;
  };
  
  ManageActivities_PresentationController.prototype.getSavingsAndCheckingsAccounts = function(fromAccounts) {
    return fromAccounts.filter(function(account) {
      return (account.accountType !== "Loan" && account.accountType !== "CreditCard" && account.accountType !== "Deposit" && account.externalIndicator !== "true");
    });
  }
    return ManageActivities_PresentationController;
});
