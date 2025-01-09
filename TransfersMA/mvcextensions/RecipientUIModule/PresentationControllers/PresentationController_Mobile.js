define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController"], function(AsyncManager) {
    function Recipient_PresentationController() {
        scope_RecipientPresentationController = this;
        scope_RecipientPresentationController.externalAccount = false;
        scope_RecipientPresentationController.nickName = null;
        scope_RecipientPresentationController.entryPoint = "";
        scope_RecipientPresentationController.isNickNameUpdated = "";
        scope_RecipientPresentationController.isRecipientDeleted = "";
        scope_RecipientPresentationController.limitsData = null;
        scope_RecipientPresentationController.sameBankBenificiaryAdded = "";
        scope_RecipientPresentationController.otherBankBenificiaryAdded = "";
        scope_RecipientPresentationController.internationalBenificiaryAdded = "";
        scope_RecipientPresentationController.reEnteredAccountNumber = "";
        scope_RecipientPresentationController.swiftCode = "";
        scope_RecipientPresentationController.routingNumber = "";
        scope_RecipientPresentationController.countryName = "";
        scope_RecipientPresentationController.duration="";
        scope_RecipientPresentationController.toBankName="";
        scope_RecipientPresentationController.bankName="";
        scope_RecipientPresentationController.isNavigated = false;
      	scope_RecipientPresentationController.transactionMode="";
        scope_RecipientPresentationController.accDetHomeAcc="";
        scope_RecipientPresentationController.mfaFlowType="";
        scope_RecipientPresentationController.isAcknowledgmentFlow=false;
        scope_RecipientPresentationController.navData = {};
      /**   numberOfAsyncForInternalBen
          *  1.getFrequentSameBankAccount
          *  2.getSameBankAccount
            */
        scope_RecipientPresentationController.numberOfAsync = 1;
      /**   numberOfAsyncForExternalBen
          *  1.getFrequentOtherBankAccount
          *  2.getOtherBankAccount
            */
         /**   numberOfAsyncForInternationaAcc
          *  1.getFrequentInternationalExternalAccounts
          *  2.getAllInternationalExternalAccounts
            */
      scope_RecipientPresentationController.numberOfAsyncForInternationaAcc=2;
        kony.mvc.Presentation.BasePresenter.call(this);
        this.asyncManager = new AsyncManager();
    }
    inheritsFrom(Recipient_PresentationController, kony.mvc.Presentation.BasePresenter);
    Recipient_PresentationController.prototype.initializePresentationController = function() {
    };
    Recipient_PresentationController.prototype.clearBuilderNonGeneratedAttributes = function() {
        scope_RecipientPresentationController.toBankName="";
        scope_RecipientPresentationController.reEnteredAccountNumber = "";
        scope_RecipientPresentationController.swiftCode = "";
        scope_RecipientPresentationController.routingNumber = "";
        scope_RecipientPresentationController.countryName = "";
        scope_RecipientPresentationController.duration="";
    };
   Recipient_PresentationController.prototype.setToBankName=function(toBankName)
    {
      scope_RecipientPresentationController.toBankName=toBankName;
    };
     Recipient_PresentationController.prototype.getToBankName=function()
    {
       return scope_RecipientPresentationController.toBankName;
    };
   Recipient_PresentationController.prototype.setDuration=function(duration)
    {
      scope_RecipientPresentationController.duration=duration;
    };
     Recipient_PresentationController.prototype.getDuration=function()
    {
       return scope_RecipientPresentationController.duration;
    };
   Recipient_PresentationController.prototype.getReEnteredAccountNumber = function() {
        return scope_RecipientPresentationController.reEnteredAccountNumber;
    };
    Recipient_PresentationController.prototype.getSwiftCode = function() {
        return scope_RecipientPresentationController.swiftCode;
    };
    Recipient_PresentationController.prototype.getRoutingNumber = function() {
        return scope_RecipientPresentationController.routingNumber;
    };
    Recipient_PresentationController.prototype.getCountryName = function() {
        return scope_RecipientPresentationController.countryName;
    };
    Recipient_PresentationController.prototype.setSwiftCode = function(swiftCode) {
        scope_RecipientPresentationController.swiftCode=swiftCode;
    };
    Recipient_PresentationController.prototype.setRoutingNumber = function(routingNumber) {
        scope_RecipientPresentationController.routingNumber=routingNumber;
    };
    Recipient_PresentationController.prototype.setCountryName = function(countryName) {
        scope_RecipientPresentationController.countryName=countryName;
    };
    Recipient_PresentationController.prototype.setReEnteredAccountNumber = function(accNum) {
        scope_RecipientPresentationController.reEnteredAccountNumber = accNum;
    };
   Recipient_PresentationController.prototype.setBankNameFromResponse=function(bankName){
      scope_RecipientPresentationController.bankName=bankName;
    };
        Recipient_PresentationController.prototype.getBankNameFromResponse=function(){
      return scope_RecipientPresentationController.bankName;
    };
    Recipient_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo(formName);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    Recipient_PresentationController.prototype.fetchSameBankRecepients = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.fetchAllInternalBenificiaries(scope_RecipientPresentationController.fetchSameBankRecipientsPresentationSuccess, scope_RecipientPresentationController.fetchSameBankRecipientsPresentationError);
    };
    Recipient_PresentationController.prototype.fetchSameBankRecipientsPresentationSuccess = function(successResponse) {
       if(scope_RecipientPresentationController.isAcknowledgmentFlow==true) {
      scope_RecipientPresentationController.isAcknowledgmentFlow=false;
//       var navMan=applicationManager.getNavigationManager();
//       navMan.setCustomInfo("frmAcknowledgment",scope_RecipientPresentationController.navData);
//       navMan.setEntryPoint("acknowledgment","frmTransfers");
      scope_RecipientPresentationController.commonFunctionForNavigation("RecipientUIModule/frmAcknowledgement");
    }
      else
        scope_RecipientPresentationController.commonFunctionForNavigation("frmManageRecipientList");
    };
    Recipient_PresentationController.prototype.fetchSameBankRecipientsPresentationError = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
    };
    Recipient_PresentationController.prototype.getBenificiaryScheduledAndPostedTransactions = function(selectedAccountDetails) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryObject(selectedAccountDetails);
      	if (scope_RecipientPresentationController.getFlowType() === "SameBankRecipients") {
        	recipientsManager.setBeneficiaryAttribute("transactionMode",applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers"));
      	}
      	else if (scope_RecipientPresentationController.getFlowType() === "OtherBankRecipients") {
        	recipientsManager.setBeneficiaryAttribute("transactionMode",applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"));
      	}
       else if (scope_RecipientPresentationController.getFlowType() === "InternationalRecipients") {
        	recipientsManager.setBeneficiaryAttribute("transactionMode",applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"));
      	}
        var benificiaryDetails = recipientsManager.getBenificiaryData();
        var transactionObj = applicationManager.getTransactionManager();
        var criteria1 = {
            "accountNumber": benificiaryDetails.accountNumber,
            "firstRecordNumber": "0",
            "lastRecordNumber": "1000"
        };
        transactionObj.fetchToExternalAccountTransactions(criteria1, scope_RecipientPresentationController.fetchBenificiaryPenTranPresSucCallback, scope_RecipientPresentationController.fetchBenificiaryPenTranPreErrCallback);
    };
    Recipient_PresentationController.prototype.fetchBenificiaryPenTranPresSucCallback = function(resTransPend) {
        var formatUtil = applicationManager.getFormatUtilManager();
        var navMan = applicationManager.getNavigationManager();
        var selectedAccount = {};
        selectedAccount = resTransPend;
        for (var i = 0; i < selectedAccount.Transactions.length; i++) {
            var trandateobj = formatUtil.getDateObjectfromString(selectedAccount.Transactions[i]["transactionDate"], "YYYY-MM-DD");
            selectedAccount.Transactions[i]["transactionDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat());
            selectedAccount.Transactions[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(selectedAccount.Transactions[i]["amount"],selectedAccount.Transactions[i]["transactionCurrency"]);
        }
        navMan.setCustomInfo("frmManageTransferRecipient", selectedAccount);
        scope_RecipientPresentationController.commonFunctionForNavigation("frmManageTransferRecipient");
    };
    Recipient_PresentationController.prototype.fetchBenificiaryPenTranPreErrCallback = function(resTransPendErr) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resTransPendErr["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPendErr);
        }
    };
    Recipient_PresentationController.prototype.fetchBenificiaryPosTranPresSucCallback = function(resTransPost) {
        scope_RecipientPresentationController.asyncManager.setSuccessStatus(1, resTransPost);
        if (scope_RecipientPresentationController.asyncManager.areAllservicesDone(2)) {
            scope_RecipientPresentationController.navigateToBenificiaryTransactionDetails();
        }
    };
    Recipient_PresentationController.prototype.fetchBenificiaryPosTranErrCallback = function(resTransPostErr) {
        scope_RecipientPresentationController.asyncManager.setErrorStatus(1, resTransPostErr);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resTransPostErr["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPostErr);
        }
    };
    Recipient_PresentationController.prototype.navigateToBenificiaryTransactionDetails = function(res) {
        var formatUtil = applicationManager.getFormatUtilManager();
        var navMan = applicationManager.getNavigationManager();
        var selectedAccount = {};
        selectedAccount.pendingTransactions = scope_RecipientPresentationController.asyncManager.getData(0);
        selectedAccount.postedTransaction = scope_RecipientPresentationController.asyncManager.getData(1);
        for (var i = 0; i < selectedAccount.pendingTransactions.length; i++) {
            var trandateobj = formatUtil.getDateObjectfromString(selectedAccount.pendingTransactions[i]["transactionDate"], "YYYY-MM-DD");
            selectedAccount.pendingTransactions[i]["transactionDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat());
            selectedAccount.pendingTransactions[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(selectedAccount.pendingTransactions[i]["amount"],selectedAccount.pendingTransactions[i]["transactionCurrency"]);
        }
        for (var i = 0; i < selectedAccount.postedTransaction.length; i++) {
            var trandateobj = formatUtil.getDateObjectfromString(selectedAccount.postedTransaction[i]["transactionDate"], "YYYY-MM-DD");
            selectedAccount.postedTransaction[i]["transactionDate"] = formatUtil.getFormatedDateString(trandateobj, formatUtil.getApplicationDateFormat())
            selectedAccount.postedTransaction[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(selectedAccount.postedTransaction[i]["amount"],selectedAccount.postedTransaction[i]["transactionCurrency"]);
        }
        navMan.setCustomInfo("frmManageTransferRecipient", selectedAccount);
        scope_RecipientPresentationController.commonFunctionForNavigation("frmManageTransferRecipient");
    };
    Recipient_PresentationController.prototype.updateBenificiaryNickName = function(nickName) {
        var transferModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
        var benificiaryDetails = transferModPresentationController.getBenificiaryData();
        var editDetails = benificiaryDetails;
      	editDetails.nickName = nickName;
      	editDetails.payeeId = editDetails.Id;
        var maskedAccountNumber=applicationManager.getDataProcessorUtility().maskAccountNumber(benificiaryDetails["accountNumber"]);
        scope_RecipientPresentationController.navData ={};
        scope_RecipientPresentationController.navData["Reference ID"] = benificiaryDetails["Id"];
        scope_RecipientPresentationController.navData["Bank Name"] = benificiaryDetails["bankName"];
        scope_RecipientPresentationController.navData["Account Number"] = maskedAccountNumber;
        //scope_RecipientPresentationController.navData["Account Type"] = benificiaryDetails["accountType"];
        scope_RecipientPresentationController.navData["Recipient Name"] = benificiaryDetails["beneficiaryName"];
        scope_RecipientPresentationController.navData["Nick Name"] = nickName;
        scope_RecipientPresentationController.navData["Linked with"] = benificiaryDetails["noOfCustomersLinked"]+" Customers ID";
    
        var recipientsManager = applicationManager.getRecipientsManager();
        if (transferModPresentationController.getFlowType() === "InternationalRecipients") {
            editDetails.isInternationalAccount = "true";
            recipientsManager.editABenificiary(editDetails, scope_RecipientPresentationController.updateBankRecipientsPresentationSuccess, scope_RecipientPresentationController.updateBankRecipientsPresentationError);
        } else {
            recipientsManager.editABenificiary(editDetails, scope_RecipientPresentationController.updateBankRecipientsPresentationSuccess, scope_RecipientPresentationController.updateBankRecipientsPresentationError);
        }
    };
    Recipient_PresentationController.prototype.updateBankRecipientsPresentationSuccess = function(successResponse) {
        scope_RecipientPresentationController.isNickNameUpdated = true;
      scope_RecipientPresentationController.isAcknowledgmentFlow=true;
      var navMan=applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmAcknowledgment",scope_RecipientPresentationController.navData);
      navMan.setEntryPoint("acknowledgment","frmTransfersEdit");
        var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
       var benificiaryDetails = transferModulePresentationController.getBenificiaryData(); 
      if (benificiaryDetails.isSameBankAccount === true && benificiaryDetails.isInternationalAccount === false) {
            scope_RecipientPresentationController.fetchSameBankRecepients();
        } else if (benificiaryDetails.isSameBankAccount === false && benificiaryDetails.isInternationalAccount === true) {
            scope_RecipientPresentationController.fetchInternationalRecepients();
        } else {
            scope_RecipientPresentationController.fetchOtherBankRecepients();
        }
    };
    Recipient_PresentationController.prototype.updateBankRecipientsPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        } else {
			//var controller = applicationManager.getPresentationUtility().getController('frmManageEditRecipient', true);
			//controller.bindGenericError(errorResponse["errmsg"]);
          var navMan=applicationManager.getNavigationManager();
         navMan.setCustomInfo("frmAcknowledgment",{"error":errorResponse["errmsg"]});
          navMan.setEntryPoint("acknowledgment","frmTransfersEdit");
          scope_RecipientPresentationController.isAcknowledgmentFlow = false;
      scope_RecipientPresentationController.commonFunctionForNavigation("RecipientUIModule/frmAcknowledgement");
		}		
    };
    Recipient_PresentationController.prototype.updateBenificiaryCIF = function(cif) {
		applicationManager.getPresentationUtility().showLoadingScreen();
		var transferModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
        var benificiaryDetails = transferModPresentationController.getBenificiaryData();
        var editDetails = benificiaryDetails;
		editDetails.payeeId = editDetails.Id;
		editDetails.cif = cif;
		var recipientsManager = applicationManager.getRecipientsManager();
		recipientsManager.editABenificiary(editDetails, scope_RecipientPresentationController.updateRecipientsCIFSuccess(), scope_RecipientPresentationController.updateRecipientsCIFError);
    };
  
	Recipient_PresentationController.prototype.updateRecipientsCIFSuccess = function() {
        var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
		var benificiaryDetails = transferModulePresentationController.getBenificiaryData();
      scope_RecipientPresentationController.isAcknowledgmentFlow=true;
   var maskedAccountNumber=applicationManager.getDataProcessorUtility().maskAccountNumber(benificiaryDetails["accountNumber"]);
        scope_RecipientPresentationController.navData ={};
        scope_RecipientPresentationController.navData["Reference ID"] = benificiaryDetails["Id"];
        scope_RecipientPresentationController.navData["Bank Name"] = benificiaryDetails["bankName"];
        scope_RecipientPresentationController.navData["Account Number"] = maskedAccountNumber;
        //scope_RecipientPresentationController.navData["Account Type"] = benificiaryDetails["accountType"];
        scope_RecipientPresentationController.navData["Recipient Name"] = benificiaryDetails["beneficiaryName"];
        scope_RecipientPresentationController.navData["Nick Name"] = benificiaryDetails["nickName"];
        scope_RecipientPresentationController.navData["Linked with"] = benificiaryDetails["totalContractCustomerSelected"]+" Customers ID";
    var navMan=applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmAcknowledgment",scope_RecipientPresentationController.navData);
      navMan.setEntryPoint("acknowledgment","frmTransfersEdit");
        if (benificiaryDetails.isSameBankAccount === true && benificiaryDetails.isInternationalAccount === false) {
            scope_RecipientPresentationController.fetchSameBankRecepients();
        } else if (benificiaryDetails.isSameBankAccount === false && benificiaryDetails.isInternationalAccount === true) {
            scope_RecipientPresentationController.fetchInternationalRecepients();
        } else {
            scope_RecipientPresentationController.fetchOtherBankRecepients();
        }
    };
	Recipient_PresentationController.prototype.updateRecipientsCIFError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        } else {
			var navMan=applicationManager.getNavigationManager();
			navMan.setCustomInfo("frmAcknowledgment",{});
          navMan.setEntryPoint("acknowledgment","frmTransfersEdit");
          scope_RecipientPresentationController.isAcknowledgmentFlow = false;
			scope_RecipientPresentationController.commonFunctionForNavigation("RecipientUIModule/frmAcknowledgement");
		}		
    };
    Recipient_PresentationController.prototype.deleteSameBankBenificiary = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        var transferModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
        var benificiaryDetails = transferModPresentationController.getBenificiaryData();
        if (transferModPresentationController.getFlowType() === "SameBankRecipients") {
            recipientsManager.deleteABenificiary(benificiaryDetails, scope_RecipientPresentationController.deleteSameBankRecipientsPresentationSuccess, scope_RecipientPresentationController.deleteSameBankRecipientsPresentationError);
        } else if (transferModPresentationController.getFlowType() === "InternationalRecipients") {
            recipientsManager.deleteABenificiary(benificiaryDetails, scope_RecipientPresentationController.deleteInternationalBankRecipientsPresentationSuccess, scope_RecipientPresentationController.deleteInternationalBankRecipientsPresentationError);
        } else {
            recipientsManager.deleteABenificiary(benificiaryDetails, scope_RecipientPresentationController.deleteOtherBankRecipientsPresentationSuccess, scope_RecipientPresentationController.deleteOtherBankRecipientsPresentationError);
        }
    };
    Recipient_PresentationController.prototype.deleteInternationalBankRecipientsPresentationSuccess = function(successResponse) {
        scope_RecipientPresentationController.isRecipientDeleted = true;
        scope_RecipientPresentationController.fetchInternationalRecepients();
    };
    Recipient_PresentationController.prototype.deleteInternationalBankRecipientsPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        }
      	else {
      		var controller = applicationManager.getPresentationUtility().getController('frmManageRecipientList', true);
      		controller.bindGenericError(error.errmsg);
    	}
    };
    Recipient_PresentationController.prototype.deleteSameBankRecipientsPresentationSuccess = function(successResponse) {
        scope_RecipientPresentationController.isRecipientDeleted = true;
        scope_RecipientPresentationController.fetchSameBankRecepients();
    };
    Recipient_PresentationController.prototype.deleteSameBankRecipientsPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        }
      	else {
      		var controller = applicationManager.getPresentationUtility().getController('frmManageRecipientList', true);
      		controller.bindGenericError(error.errmsg);
    	}
    };
    Recipient_PresentationController.prototype.deleteOtherBankRecipientsPresentationSuccess = function(successResponse) {
        scope_RecipientPresentationController.isRecipientDeleted = true;
        scope_RecipientPresentationController.fetchOtherBankRecepients();
    };
    Recipient_PresentationController.prototype.deleteOtherBankRecipientsPresentationError = function(errorResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errorResponse["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errorResponse);
        }
      	else {
      		var controller = applicationManager.getPresentationUtility().getController('frmManageRecipientList', true);
      		controller.bindGenericError(error.errmsg);
    	}
    };
    Recipient_PresentationController.prototype.fetchOtherBankRecepients = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.fetchAllExternalBenificiaries(scope_RecipientPresentationController.fetchOtherBankRecepientsPresentationSuccess, scope_RecipientPresentationController.fetchOtherBankRecepientsPresentationError);
    };
   Recipient_PresentationController.prototype.getSelectedFrequencyIndex = function() {
        var transactionObj = applicationManager.getTransactionManager();
        var frequency = transactionObj.getTransactionObject().frequencyType;
        switch (frequency) {
            case "Once":
                if (transactionObj.getTransactionObject().isScheduled === "0")
                    return 0;
                else
                    return 1;
                break;
             case "Daily":
                return 2;
            case "Weekly":
                return 3;
            case "Every Two Weeks":
                return 4;
            case "Monthly":
                return 5;
            case "Quarterly":
                return 6;
            case "Half Yearly":
                return 7;
            case "Yearly":
                return 8;
            default:
                return "";
        }
    };
     Recipient_PresentationController.prototype.evaluateAmount = function(amount, fromAvlBal) {
        var forUtility = applicationManager.getFormatUtilManager();
        //fromAvlBal = forUtility.deFormatAmount(fromAvlBal);
        if (Number(amount) > Number(fromAvlBal)) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var controller = applicationManager.getPresentationUtility().getController('frmTransferAmount', true);
            controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.amountGreaterThanAvailBal"));
        } else if (Number(amount) === 0) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var controller = applicationManager.getPresentationUtility().getController('frmTransferAmount', true);
            controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.validAmount"));
        } else {
            var transactionManager = applicationManager.getTransactionManager();
            transactionManager.setTransactionAttribute("amount",amount);
            var navManager = applicationManager.getNavigationManager();
            //       var index = scope_RecipientPresentationController.getSelectedFrequencyIndex();
            //       navManager.setCustomInfo("frmTransferFrequency",{"index":index});
            navManager.navigateTo("frmTransferFrequency");
        }
    };
    Recipient_PresentationController.prototype.fetchOtherBankRecepientsPresentationSuccess = function(successResponse) {
       if(scope_RecipientPresentationController.isAcknowledgmentFlow==true) {
      scope_RecipientPresentationController.isAcknowledgmentFlow=false;
    //  var navMan=applicationManager.getNavigationManager();
//       navMan.setCustomInfo("frmAcknowledgment",scope_RecipientPresentationController.navData);
//       navMan.setEntryPoint("acknowledgment","frmTransfers");
       scope_RecipientPresentationController.commonFunctionForNavigation("RecipientUIModule/frmAcknowledgement");
    }
      else
        scope_RecipientPresentationController.commonFunctionForNavigation("frmManageRecipientList");
    };
    Recipient_PresentationController.prototype.fetchOtherBankRecepientsPresentationError = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
    };
    Recipient_PresentationController.prototype.processAccountsData = function(data) {
        var accProcessedData = [];
        for (var i = 0; i < data.length; i++) {
            accProcessedData[i] = {};
            accProcessedData[i].accountName = data[i].nickName;
            accProcessedData[i].availableBalance = this.getAvailableBalanceCurrencyString(data[i]);
            accProcessedData[i].accountID = data[i].accountID;
            accProcessedData[i].bankName = data[i].bankName.trim();
            accProcessedData[i].accountBalanceType = this.getAvailableBalanceType(data[i]);
            accProcessedData[i].accountType = data[i].accountType;
          	accProcessedData[i].fromAccountCurrency = data[i].currencyCode;
            accProcessedData[i].toAccountCurrency = data[i].currencyCode;
          	accProcessedData[i].fromAccountBalance = data[i].availableBalance;
          	var name="";
            if (data[i].nickName === null || data[i].nickName === undefined) {
      			name = data[i].accountName;
    		} else {
      			name =data[i].nickName;
    		}
    		accProcessedData[i].processedName = applicationManager.getPresentationUtility().formatText(name, 10, data[i].accountID, 4);
        }
        return accProcessedData;
    };
    Recipient_PresentationController.prototype.getAvailableBalanceCurrencyString = function(data) {
        var forUtility = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        var currencyCode = data["currencyCode"];
        switch (data.accountType) {
            case configManager.constants.SAVINGS:
                return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"],currencyCode);
            case configManager.constants.CHECKING:
                return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"],currencyCode);
            case configManager.constants.CREDITCARD:
                return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"],currencyCode);
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
    Recipient_PresentationController.prototype.getAvailableBalanceType = function(data) {
        var configManager = applicationManager.getConfigurationManager();
        switch (data.accountType) {
            case configManager.constants.SAVINGS:
                return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
            case configManager.constants.CHECKING:
                return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
            case configManager.constants.CREDITCARD:
                return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
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
     Recipient_PresentationController.prototype.showAccounts = function(type) {
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
      if (type === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts")) {
        action = scope_RecipientPresentationController.getActionByType(type);
        scope_RecipientPresentationController.setFlowType("MyKonyAccounts");
        trasMan.setTransactionAttribute("transactionType","InternalTransfer");
        scope_RecipientPresentationController.showFromAccounts(scope_RecipientPresentationController.showInternalAccountsPresentationSuccessCallBack);
      } else if (type === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")) {
            action = scope_RecipientPresentationController.getActionByType(type);
            scope_RecipientPresentationController.setFlowType("OtherKonyBankMembersCreateTransfer");
            trasMan.setTransactionAttribute("transactionType","ExternalTransfer");
            scope_RecipientPresentationController.numberOfAsync = 2;
            scope_RecipientPresentationController.asyncManager.initiateAsyncProcess(scope_RecipientPresentationController.numberOfAsync);
            var recMan = applicationManager.getRecipientsManager();
            recMan.fetchAllFrequentInternalBenificiaries(scope_RecipientPresentationController.showFreqExternalAccountsPresentationSuccessCallBack, scope_RecipientPresentationController.showFreqExternalAccountsPresentationErrorCallBack);
            recMan.fetchAllInternalBenificiaries(scope_RecipientPresentationController.showAllExternalAccountsPresentationSuccessCallBack, scope_RecipientPresentationController.showAllExternalAccountsPresentationErrorCallBack);
        } else if (type == applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")) {
            action = scope_RecipientPresentationController.getActionByType(type);
            scope_RecipientPresentationController.setFlowType("OtherBankAccountsCreateTransfer");
            trasMan.setTransactionAttribute("transactionType","ExternalTransfer");
            scope_RecipientPresentationController.numberOfAsync = 2;
            scope_RecipientPresentationController.asyncManager.initiateAsyncProcess(scope_RecipientPresentationController.numberOfAsync);
            var recMan = applicationManager.getRecipientsManager();
            recMan.fetchAllFrequentExternalBenificiaries(scope_RecipientPresentationController.showFreqExternalAccountsPresentationSuccessCallBack, scope_RecipientPresentationController.showFreqExternalAccountsPresentationErrorCallBack);
            recMan.fetchAllExternalBenificiaries(scope_RecipientPresentationController.showAllExternalAccountsPresentationSuccessCallBack, scope_RecipientPresentationController.showAllExternalAccountsPresentationErrorCallBack);
         } else if (type === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")) {
            action = scope_RecipientPresentationController.getActionByType(type);
            scope_RecipientPresentationController.setFlowType("InternationalTransferCreateTransfer");
            trasMan.setTransactionAttribute("transactionType","ExternalTransfer");
            scope_RecipientPresentationController.numberOfAsync = 2;
            scope_RecipientPresentationController.asyncManager.initiateAsyncProcess(scope_RecipientPresentationController.numberOfAsync);
            var recMan = applicationManager.getRecipientsManager();
            recMan.fetchAllFrequentInternationalBenificiaries(scope_RecipientPresentationController.showFreqExternalAccountsPresentationSuccessCallBack, scope_RecipientPresentationController.showFreqExternalAccountsPresentationErrorCallBack);
            recMan.fetchInternationalRecepients(scope_RecipientPresentationController.showAllExternalAccountsPresentationSuccessCallBack, scope_RecipientPresentationController.showAllExternalAccountsPresentationErrorCallBack);
        }
        if(action)
        scope_RecipientPresentationController.fetchTransferLimits(action);
    };
    Recipient_PresentationController.prototype.fetchTransferLimits = function(action){
        var configManager=applicationManager.getConfigurationManager();
        configManager.fetchLimitsForAnAction(action,scope_RecipientPresentationController.fetchLimitsSuccessCallBack,scope_RecipientPresentationController.fetchLimitsErrorCallBack);
    };
    Recipient_PresentationController.prototype.fetchLimitsSuccessCallBack = function(res){
        scope_RecipientPresentationController.limitsData = res;
    };
    Recipient_PresentationController.prototype.fetchLimitsErrorCallBack = function(resFSBAErr)
    {
        kony.print("error in fetchLimitsErrorCallBack");
    };
    Recipient_PresentationController.prototype.getActionByType = function (type) {
        switch (type) {
          case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts")):
            return "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE";
          case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")):
            return "INTRA_BANK_FUND_TRANSFER_CREATE";
          case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")):
            return "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
          case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")):
            return "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE";
          case "PayAPerson":
            return "P2P_CREATE";
    
        }
      };
      Recipient_PresentationController.prototype.getTypeByAction = function (action) {
        switch (action) {
          case "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE":
            return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts");
          case "INTRA_BANK_FUND_TRANSFER_CREATE":
            return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
          case "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE":
            return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
          case "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE":
            return applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
          case "P2P_CREATE":
            return "PayAPerson";
    
        }
      };
    Recipient_PresentationController.prototype.setLimitsForTransaction = function(accountId){
        var type = scope_RecipientPresentationController.transactionMode;
        var scope = this;
        if(!scope.limitsData)return;
        for (var i = 0; i <scope.limitsData["accounts"].length; i++) {
            if (scope.limitsData["accounts"][i].accountId === accountId) {
                switch(type){
                    case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts")):
                    scope.setLimits("minKonyBankAccountsTransferLimit","maxKonyBankAccountsTransferLimit", i);
                    break;
                    case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")):
                    scope.setLimits("minOtherKonyAccountsTransferLimit","maxOtherKonyAccountsTransferLimit", i);
                    break;
                    case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")):
                    scope.setLimits("minOtherBankAccountsTransferLimit","maxOtherBankAccountsTransferLimit", i);
                    break;
                    case(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")):
                    scope.setLimits("minInternationalAccountsTransferLimit","maxInternationalAccountsTransferLimit", i);
                    break;
                    case "PayAPerson":
                    scope.setLimits("minP2PLimit","maxP2PLimit", i);
                }
            }
        }

    };
    Recipient_PresentationController.prototype.setLimits = function(minLimit,maxLimit,index){
        var scope = this;
        applicationManager.getConfigurationManager().setConfigurationValue(minLimit, this.limitsData["accounts"][index]["limits"]["MIN_TRANSACTION_LIMIT"]);
        applicationManager.getConfigurationManager().setConfigurationValue(maxLimit, this.limitsData["accounts"][index]["limits"]["MAX_TRANSACTION_LIMIT"]);
    };
    Recipient_PresentationController.prototype.showInternalAccountsPresentationSuccessCallBack = function(res) {
        var navMan = applicationManager.getNavigationManager();
        var accNav = applicationManager.getAccountManager();
        var toacc = accNav.getToTransferSupportedAccounts();
        var accountList = navMan.getCustomInfo("frmTransfersToAccount");
        accountList.internalAccounts = toacc;
        navMan.setCustomInfo("frmTransfersToAccount", accountList);
        navMan.navigateTo("frmTransfersToAccount");
    };
    Recipient_PresentationController.prototype.showFreqExternalAccountsPresentationSuccessCallBack = function(resFSBA) {
        scope_RecipientPresentationController.asyncManager.setSuccessStatus(0, resFSBA);
        if (scope_RecipientPresentationController.asyncManager.areAllservicesDone(scope_RecipientPresentationController.numberOfAsync)) {
            scope_RecipientPresentationController.navigateToShowSBAAccountDetails();
        }
    };
    Recipient_PresentationController.prototype.showFreqExternalAccountsPresentationErrorCallBack = function(resFSBAErr) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resFSBAErr["isServerUnreachable"])
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resFSBAErr);
        else
            scope_RecipientPresentationController.asyncManager.setErrorStatus(0, resFSBAErr);
    };
    Recipient_PresentationController.prototype.showAllExternalAccountsPresentationSuccessCallBack = function(resFBA) {
        scope_RecipientPresentationController.asyncManager.setSuccessStatus(1, resFBA);
        if (scope_RecipientPresentationController.asyncManager.areAllservicesDone(scope_RecipientPresentationController.numberOfAsync)) {
            scope_RecipientPresentationController.navigateToShowSBAAccountDetails();
        }
    };
    Recipient_PresentationController.prototype.showAllExternalAccountsPresentationErrorCallBack = function(resSBAErr) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resSBAErr["isServerUnreachable"])
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resSBAErr);
        else
            scope_RecipientPresentationController.asyncManager.setErrorStatus(0, resSBAErr);
    };
    Recipient_PresentationController.prototype.navigateToShowSBAAccountDetails = function() {
        var navMan = applicationManager.getNavigationManager();
        var accountList = navMan.getCustomInfo("frmTransfersToAccount");
        accountList.addedFlag = scope_RecipientPresentationController.externalAccount;
        accountList.frequentExternalAccounts = scope_RecipientPresentationController.asyncManager.getData(0);
        accountList.allExternalAccounts = scope_RecipientPresentationController.asyncManager.getData(1).ExternalAccounts;
        navMan.setCustomInfo("frmTransfersToAccount", accountList);
        navMan.navigateTo("frmTransfersToAccount");
        scope_RecipientPresentationController.externalAccount = false;
    };
    Recipient_PresentationController.prototype.showFromAccounts = function(successCB) {
        var accMan = applicationManager.getAccountManager();
        accMan.fetchInternalAccounts(successCB, scope_RecipientPresentationController.showFromAccountsPresentationErrorCallBack);
    };
    Recipient_PresentationController.prototype.fromAccountsPresentationSuccessCallBack = function(res) {
        var accNav = applicationManager.getAccountManager();
        var frmacc = accNav.getFromTransferSupportedAccounts();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersFromAccount", {
            "fromaccounts": frmacc
        });
        navMan.navigateTo("frmTransfersFromAccount");
    };
    Recipient_PresentationController.prototype.fromAccountOnContinuePresentationSuccessCallBack = function(res) {
        var accNav = applicationManager.getAccountManager();
        var frmacc = accNav.getFromTransferSupportedAccounts();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersFromAccount", {
            "fromaccounts": frmacc
        });
        navMan.navigateTo("frmTransferAmount");
    };
    Recipient_PresentationController.prototype.showFromAccountsPresentationErrorCallBack = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"])
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        else
            kony.print("error in showFromAccountsPresentationErrorCallBack");
    };
  /*additional date field to use in  the calendar page in the back flow*/
  	Recipient_PresentationController.prototype.convertCalendarDateToLocaleDate = function(formatedDate){
      var forUtility=applicationManager.getFormatUtilManager();
      var configManager = applicationManager.getConfigurationManager()
      var convertedDate = forUtility.getFormatedDateString(forUtility.getDateObjectFromCalendarString(formatedDate,"MM/DD/YYYY"),configManager.frontendDateFormat[configManager.getLocale()]);
      return convertedDate;
    };
    Recipient_PresentationController.prototype.transferScheduledDate = function(strtDate) {
      var formatedDate = strtDate;
      var transactionManager = applicationManager.getTransactionManager();
      transactionManager.setTransactionAttribute("scheduledDate",formatedDate);
      transactionManager.setTransactionAttribute("scheduledCalendarDate",scope_RecipientPresentationController.convertCalendarDateToLocaleDate(formatedDate));
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("frmTransferConfirmation");
    };
    Recipient_PresentationController.prototype.transferScheduledStrtDate = function(strtDate) {
        var formatedDate = strtDate;
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("frequencyStartDate",formatedDate);
        transactionManager.setTransactionAttribute("scheduledDate",formatedDate);
      	transactionManager.setTransactionAttribute("scheduledCalendarDate",scope_RecipientPresentationController.convertCalendarDateToLocaleDate(formatedDate));
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo("frmTransfersEndDate");
    };
    Recipient_PresentationController.prototype.transferScheduledEndDate = function(endDate) {
        var formatedDate = endDate;
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("frequencyEndDate",formatedDate);
      	transactionManager.setTransactionAttribute("endCalendarDate",scope_RecipientPresentationController.convertCalendarDateToLocaleDate(formatedDate));
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo("frmTransferConfirmation");
    };
    Recipient_PresentationController.prototype.transferSetRecurrence = function(reccurrence) {
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("numberOfRecurrences",reccurrence);
        var navMan = applicationManager.getNavigationManager();
        // navMan.setCustomInfo("frmTransfersStartDate","NofRR");
        navMan.navigateTo("frmTransfersStartDate");
    };
    Recipient_PresentationController.prototype.getTransObject = function() {
        var transMan = applicationManager.getTransactionManager();
        var obj = transMan.getTransactionObject();
        return obj;
    };
  Recipient_PresentationController.prototype.switchDurationType = function(index) {
        var transactionObj = applicationManager.getTransactionManager();
        var frequencyTypes = transactionObj.getAvailableFrequencyType();
        var navMan = applicationManager.getNavigationManager();
        switch (index) {
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange"):
                transactionObj.setTransactionAttribute("numberOfRecurrences","");
                // transactionObj.setScheduledDate("");
                scope_RecipientPresentationController.setDuration(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.DateRange"));
                var startDate = transactionObj.getTransactionObject().scheduledDate;
                var data = {
                    "freq": "ReccDate"
                };
                navMan.setCustomInfo("frmTransfersStartDate", data);
                navMan.navigateTo("frmTransfersStartDate");
                break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.NumberofRecurrence"):
                transactionObj.setTransactionAttribute("frequencyStartDate","");
                transactionObj.setTransactionAttribute("frequencyEndDate","");
                var startDate =transactionObj.getTransactionObject().scheduledDate;
                var data = {
                    "freq": "NofRR"
                };
                var noOfRecur = {
                    "noofrecur": transactionObj.getTransactionObject().numberOfRecurrences
                };
                navMan.setCustomInfo("frmTransfersStartDate", data);
                navMan.setCustomInfo("frmTransfersRecurrence", noOfRecur);
                scope_RecipientPresentationController.setDuration(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.RecurrenceNo"));
                navMan.navigateTo("frmTransfersRecurrence");
                break;
        }
    };
    Recipient_PresentationController.prototype.switchFrequencyType = function(Index) {
        var transactionObj = applicationManager.getTransactionManager();
        var frequencyTypes = transactionObj.getAvailableFrequencyType();
        var navMan = applicationManager.getNavigationManager();
        var forUtility = applicationManager.getFormatUtilManager();
        switch (Index) {
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.TransferNow"):
                transactionObj.setTransactionAttribute("frequencyType",frequencyTypes.ONCE);
                transactionObj.setTransactionAttribute("isScheduled","0");
                transactionObj.setTransactionAttribute("numberOfRecurrences","");
                var dateobj = new Date();
                var month=(dateobj.getMonth() + 1);
         if(month<10)
         {
           month="0"+month;
         }
         var formatedDate = month + "/" + dateobj.getDate() + "/" + dateobj.getFullYear()
            	//var formatedDate = (dateobj.getMonth() + 1) + "/" + dateobj.getDate() + "/" + dateobj.getFullYear()
                transactionObj.setTransactionAttribute("scheduledDate",formatedDate);
                transactionObj.setTransactionAttribute("frequencyStartDate","");
                transactionObj.setTransactionAttribute("frequencyEndDate","");
                // var data=transactionObj.getP2PObject();
                //navMan.setCustomInfo("frmTransferConfirmation",data);
                navMan.navigateTo("frmTransferConfirmation");
                break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.OneTime"):
                transactionObj.setTransactionAttribute("frequencyType",frequencyTypes.ONCE);
                transactionObj.setTransactionAttribute("isScheduled","1");
                var startDate = transactionObj.getTransactionObject().scheduledDate;
                var data = {
                    "freq": "Once"
                };
                navMan.setCustomInfo("frmTransfersStartDate", data);
                navMan.navigateTo("frmTransfersStartDate");
                break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Daily"):
                transactionObj.setTransactionAttribute("frequencyType",frequencyTypes.DAILY);
                transactionObj.setTransactionAttribute("isScheduled","1");
                navMan.navigateTo("frmTransfersDuration");
                break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Weekly"):
                transactionObj.setTransactionAttribute("frequencyType",frequencyTypes.WEEKLY);
                transactionObj.setTransactionAttribute("isScheduled","1");
                navMan.navigateTo("frmTransfersDuration");
                break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.EveryTwoWeeks"):
                transactionObj.setTransactionAttribute("frequencyType",frequencyTypes.EVERYTWOWEEKS);
                transactionObj.setTransactionAttribute("isScheduled","1");
                navMan.navigateTo("frmTransfersDuration");
                break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Monthly"):
                transactionObj.setTransactionAttribute("frequencyType",frequencyTypes.MONTHLY);
                transactionObj.setTransactionAttribute("isScheduled","1");
                navMan.navigateTo("frmTransfersDuration");
                break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Quaterly"):
                transactionObj.setTransactionAttribute("frequencyType",frequencyTypes.QUARTERLY);
                transactionObj.setTransactionAttribute("isScheduled","1");
                navMan.navigateTo("frmTransfersDuration");
                break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.HalfYearly"):
                transactionObj.setTransactionAttribute("frequencyType",frequencyTypes.HALFYEARLY);
                transactionObj.setTransactionAttribute("isScheduled","1");
                navMan.navigateTo("frmTransfersDuration");
                break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.Yearly"):
                transactionObj.setTransactionAttribute("frequencyType",frequencyTypes.YEARLY);
                transactionObj.setTransactionAttribute("isScheduled","1");
                navMan.navigateTo("frmTransfersDuration");
                break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.frequency.BiWeekly"):
                transactionObj.setTransactionAttribute("frequencyType",frequencyTypes.BIWEEKLY);
                transactionObj.setTransactionAttribute("isScheduled","1");
                navMan.navigateTo("frmTransfersDuration");
                break;
            default:
                break;
        }
    };
    Recipient_PresentationController.prototype.getIndexForDuration = function() {
        var index;
        var transactionManager = applicationManager.getTransactionManager();
        //var  transactionObj=transactionManager.getP2PObject();
        if (transactionManager.getTransactionObject().frequencyEndDate)
            index = 0;
        else if (transactionManager.getTransactionObject().scheduledDate)
            index = 1;
        return index;
    };
   Recipient_PresentationController.prototype.navAfterToAcc = function() {
        //  var accdata=[];
        var accMan = applicationManager.getAccountManager();
        var transactionManager = applicationManager.getTransactionManager();
        var navMan = applicationManager.getNavigationManager();
        var accountList = navMan.getCustomInfo("frmTransfersToAccount");
        var preAccData = accMan.getTransfersPreferredAccount();
        if(transactionManager.transferObject.fromAccountNumber==""||transactionManager.transferObject.fromAccountNumber==null||transactionManager.transferObject.fromAccountNumber==undefined)
        scope_RecipientPresentationController.setFromAccountsForTransactions(preAccData);
        // var frmDetails=navMan.getCustomInfo("frmTransfersFromAccount");
        //  navMan.setCustomInfo("frmTransfersFromAccount",{});
        var selectedAccountData = accountList.selectedAccountData;
        if (accountList.type === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts")) {
            transactionManager.setTransactionAttribute("toAccountNumber",selectedAccountData["accountID"]);
            transactionManager.setTransactionAttribute("toAccountType",selectedAccountData["accountType"]);
            transactionManager.setTransactionAttribute("toAccountName",selectedAccountData["accountName"]);
           transactionManager.setTransactionAttribute("toAccountCurrency",selectedAccountData["toAccountCurrency"]);
           // transactionManager.setTransactionAttribute("toBankName",selectedAccountData["bankName"]);
            scope_RecipientPresentationController.setToBankName(selectedAccountData["bankName"]);
        } else {
            transactionManager.setTransactionAttribute("toAccountNumber",selectedAccountData["accountNumber"]);
            scope_RecipientPresentationController.setToBankName(selectedAccountData["bankName"]);
            transactionManager.setTransactionAttribute("toAccountName",selectedAccountData["nickName"]);
            transactionManager.setTransactionAttribute("toAccountType",selectedAccountData["accountType"]);
            transactionManager.setTransactionAttribute("beneficiaryId",selectedAccountData["beneficiaryId"]);
        }
        if ((preAccData === "") || (preAccData === undefined) || (preAccData === null) || ((accountList.type === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts")) && (accountList.selectedAccountData["accountID"] === transactionManager.transferObject.fromAccountNumber))) {
            applicationManager.getPresentationUtility().showLoadingScreen();
            scope_RecipientPresentationController.showFromAccounts(scope_RecipientPresentationController.fromAccountsPresentationSuccessCallBack);
        } else {
            scope_RecipientPresentationController.showPreferredAccount();
        }
    };
    Recipient_PresentationController.prototype.getTransferObjectById = function() {
        var accdata = [],
            processAccountsData = null;
        var trasMan = applicationManager.getTransactionManager();
        var accMan = applicationManager.getAccountManager();
        if (trasMan.getTransactionObject().fromAccountNumber) {
            var accData = accMan.getInternalAccountByID(trasMan.getTransactionObject().fromAccountNumber);
            accdata.push(accData);
            processAccountsData = scope_RecipientPresentationController.processAccountsData(accdata);
        }
        return processAccountsData;
    };
    Recipient_PresentationController.prototype.getAmount = function() {
        var amount = null;
        var transactionmanager = applicationManager.getTransactionManager();
        var formatUtil = applicationManager.getFormatUtilManager();
        if (transactionmanager.getTransactionObject().amount !== undefined && transactionmanager.getTransactionObject().amount !== null && transactionmanager.getTransactionObject().amount !== "") {
            amount = formatUtil.deFormatAmount(transactionmanager.getTransactionObject().amount);
        }
        return amount;
    };
    Recipient_PresentationController.prototype.showPreferredAccount = function() {
        scope_RecipientPresentationController.showFromAccounts(scope_RecipientPresentationController.fromAccountOnContinuePresentationSuccessCallBack)
    };
    Recipient_PresentationController.prototype.navigateToReEnterAccountNumber = function(accountNumber) {
        var recipientsManager = applicationManager.getRecipientsManager();
        var benificiaryData={};
        benificiaryData.accountNumber=accountNumber;
        recipientsManager.initializeBeneficiaryDataWithAccountNum(benificiaryData);
        if (scope_RecipientPresentationController.getFlowType() === "InternationalRecipients" || scope_RecipientPresentationController.getFlowType() === "InternationalTransferCreateTransfer") {
            var recipientsManager = applicationManager.getRecipientsManager();
            recipientsManager.setBeneficiaryAttribute("countryName",scope_RecipientPresentationController.countryName);
            recipientsManager.setBeneficiaryAttribute("swiftCode",scope_RecipientPresentationController.swiftCode);
            recipientsManager.setBeneficiaryAttribute("bankName",scope_RecipientPresentationController.bankName);
            scope_RecipientPresentationController.commonFunctionForNavigation("frmReEnterBenAccNumorIBAN");
        }
       else if (scope_RecipientPresentationController.getFlowType() === "OtherBankRecipients" || scope_RecipientPresentationController.getFlowType() === "OtherBankAccountsCreateTransfer") {
            var recipientsManager = applicationManager.getRecipientsManager();
            recipientsManager.setBeneficiaryAttribute("routingNumber",scope_RecipientPresentationController.routingNumber);
        	scope_RecipientPresentationController.commonFunctionForNavigation("frmReEnterBenAccNo");
        }
      else{
        scope_RecipientPresentationController.commonFunctionForNavigation("frmReEnterBenAccNo");
      }
    };
    Recipient_PresentationController.prototype.navigateToBenName = function(accountNumber) {
        scope_RecipientPresentationController.setReEnteredAccountNumber(accountNumber);
        scope_RecipientPresentationController.commonFunctionForNavigation("frmBenName");
    };
    Recipient_PresentationController.prototype.navigateToBenificiaryName = function(accountType) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("accountType",accountType);
        scope_RecipientPresentationController.commonFunctionForNavigation("frmBenName");
    };
  Recipient_PresentationController.prototype.navigateToBenificiaryAccountTypeSelection = function(recipientName) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
        scope_RecipientPresentationController.commonFunctionForNavigation("frmBenAccountTypeSelect");
    };
    Recipient_PresentationController.prototype.navigateToBenificiaryVerifyDetails = function(recipientName,frmName) {
        var recipientsManager = applicationManager.getRecipientsManager();
       var configurationManager = applicationManager.getConfigurationManager();
       var flowType = scope_RecipientPresentationController.getFlowType();
      if(configurationManager.isCombinedUser === "true"){
        recipientsManager.setBeneficiaryAttribute("isBusinessPayee",recipientName);
      }else{
        recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
      }
        scope_RecipientPresentationController.commonFunctionForNavigation(frmName);
    };
    Recipient_PresentationController.prototype.navigateToEnterBenificiaryAccountNumber = function(routingNumber) {
        var recipientsManager = applicationManager.getRecipientsManager();
        scope_RecipientPresentationController.setRoutingNumber(routingNumber);
        scope_RecipientPresentationController.commonFunctionForNavigation("frmEnterBenAccNo");
    };
   Recipient_PresentationController.prototype.setNickName=function(nickName){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("nickName",nickName);
    };
      Recipient_PresentationController.prototype.setIsVerified=function(value){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("isVerified",value);
    };
      Recipient_PresentationController.prototype.setIsSameBankAccount=function(value){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("isSameBankAccount",value);
    };
      Recipient_PresentationController.prototype.setIsInternationalAccount=function(value){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("isInternationalAccount",value);
    };
        Recipient_PresentationController.prototype.setBankName=function(bankName){
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryAttribute("bankName",bankName);
    };
    Recipient_PresentationController.prototype.navigateToEnterBenificiaryRoutingNumber = function(bankDetails) {
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmAddBenRoutNo", {
            "bankDetails": bankDetails
        });
        navMan.navigateTo("frmAddBenRoutNo");
    };
    Recipient_PresentationController.prototype.createInternalBenificiary = function() {
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
        var benificiaryData=scope_RecipientPresentationController.getBenificiaryData();
        var recipientsManager = applicationManager.getRecipientsManager();
        //benificiaryData.accountType = "Savings"; //Temp addition, because mobile doesn't have UI for selecting account type
      	var configManager = applicationManager.getConfigurationManager();
      	if(configManager.isSMEUser === "true" || configManager.isMBBUser === "true"){
        	benificiaryData.isBusinessPayee = "1";
      	}
        
        recipientsManager.createABenificiary(benificiaryData, scope_RecipientPresentationController.createSameBankBenificiaryPresentationSuccess, scope_RecipientPresentationController.createSameBankBenificiaryPresentationError);
    };
    Recipient_PresentationController.prototype.createSameBankBenificiaryPresentationSuccess = function(succResponse) {
        scope_RecipientPresentationController.sameBankBenificiaryAdded = true;
      scope_RecipientPresentationController.isAcknowledgmentFlow = true;
        var maskedAccountNumber=applicationManager.getDataProcessorUtility().maskAccountNumber(succResponse.selectedAccountData["accountNumber"]);
        scope_RecipientPresentationController.navData ={};
        scope_RecipientPresentationController.navData["Reference ID"] = succResponse["Id"];
        scope_RecipientPresentationController.navData["Bank Name"] = succResponse.selectedAccountData["bankName"];
        scope_RecipientPresentationController.navData["Account Number"] = maskedAccountNumber;
        //scope_RecipientPresentationController.navData["Account Type"] = succResponse.selectedAccountData["accountType"];
        scope_RecipientPresentationController.navData["Recipient Name"] = succResponse.selectedAccountData["beneficiaryName"];
        scope_RecipientPresentationController.navData["Nick Name"] = succResponse.selectedAccountData["nickName"];
        scope_RecipientPresentationController.navData["Linked with"] = succResponse.selectedAccountData["totalContractCustomerSelected"]+" Customers ID";
		
      	var navMan=applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmAcknowledgment",scope_RecipientPresentationController.navData);
      navMan.setEntryPoint("acknowledgment","frmTransfers");
      
        var accntType = navMan.getCustomInfo("frmTransfersToAccount");
        if (scope_RecipientPresentationController.getFlowType() === "OtherKonyBankMembersCreateTransfer") {
          navMan.setCustomInfo("frmTransfersToAccount",succResponse);
          scope_RecipientPresentationController.navAfterToAcc()
        }
        if (scope_RecipientPresentationController.getFlowType() === "SameBankRecipients") {
            scope_RecipientPresentationController.fetchSameBankRecepients();
        }
    };
    Recipient_PresentationController.prototype.createSameBankBenificiaryPresentationError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
           // var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetails', true);
            //controller.bindGenericError(err.errorMessage);
           var navMan=applicationManager.getNavigationManager();
         navMan.setCustomInfo("frmAcknowledgment",{"error":err.errorMessage});
          scope_RecipientPresentationController.isAcknowledgmentFlow = false;
          navMan.setEntryPoint("acknowledgment","frmTransfers");
      scope_RecipientPresentationController.commonFunctionForNavigation("RecipientUIModule/frmAcknowledgement");
        }
    };
    Recipient_PresentationController.prototype.createExternalBenificiary = function() {
        var navMan = applicationManager.getNavigationManager();
        var toDetails = navMan.getCustomInfo("frmTransfersToAccount");
        if (toDetails && toDetails !== null) {
            toDetails.accountDetailsType = "Other Bank Accounts";
        } else {
            toDetails = {
                "accountDetailsType": "Other Bank Accounts"
            };
        }
        navMan.setCustomInfo("frmTransfersToAccount", toDetails);
        var recipientsManager = applicationManager.getRecipientsManager();
        var benificiaryData=scope_RecipientPresentationController.getBenificiaryData();
        //benificiaryData.accountType = "Savings"; //Temp addition, because mobile doesn't have UI for selecting account type
      	var configManager = applicationManager.getConfigurationManager();
      	if(configManager.isSMEUser === "true" || configManager.isMBBUser === "true"){
        	benificiaryData.isBusinessPayee = "1";
      	}
       
        recipientsManager.createABenificiary(benificiaryData, scope_RecipientPresentationController.createOtherBankBenificiaryPresentationSuccess, scope_RecipientPresentationController.createOtherBankBenificiaryPresentationError);
    };
    Recipient_PresentationController.prototype.createOtherBankBenificiaryPresentationSuccess = function(succResponse) {
        scope_RecipientPresentationController.otherBankBenificiaryAdded = true;
      scope_RecipientPresentationController.isAcknowledgmentFlow = true;
        var navMan = applicationManager.getNavigationManager();
        var accntType = navMan.getCustomInfo("frmTransfersToAccount");
        var maskedAccountNumber=applicationManager.getDataProcessorUtility().maskAccountNumber(succResponse.selectedAccountData["accountNumber"]);
        scope_RecipientPresentationController.navData ={};
        scope_RecipientPresentationController.navData["Reference ID"] = succResponse["Id"];
        scope_RecipientPresentationController.navData["Bank Name"] = succResponse.selectedAccountData["bankName"];
        scope_RecipientPresentationController.navData["Account Number"] = maskedAccountNumber;
        //scope_RecipientPresentationController.navData["Account Type"] = succResponse.selectedAccountData["accountType"];
        scope_RecipientPresentationController.navData["Recipient Name"] = succResponse.selectedAccountData["beneficiaryName"];
        scope_RecipientPresentationController.navData["Nick Name"] = succResponse.selectedAccountData["nickName"];
        scope_RecipientPresentationController.navData["Linked with"] = succResponse.selectedAccountData["totalContractCustomerSelected"]+" Customers ID";
      	
      	var navMan=applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmAcknowledgment",scope_RecipientPresentationController.navData);
      navMan.setEntryPoint("acknowledgment","frmTransfers");
      
        if (scope_RecipientPresentationController.getFlowType() === "OtherBankAccountsCreateTransfer") {
          navMan.setCustomInfo("frmTransfersToAccount",succResponse);
          scope_RecipientPresentationController.navAfterToAcc()
        }
        if (scope_RecipientPresentationController.getFlowType() === "OtherBankRecipients") {
            scope_RecipientPresentationController.fetchOtherBankRecepients();
        }
    };
    Recipient_PresentationController.prototype.createOtherBankBenificiaryPresentationError = function(errResponse) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (errResponse["isServerUnreachable"])
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errResponse);
        else {
            kony.print("Error in create same bank recipients");
           // var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetails', true);
            //controller.bindGenericError(errResponse.errorMessage);
           var navMan=applicationManager.getNavigationManager();
         navMan.setCustomInfo("frmAcknowledgment",{"error":errResponse.errorMessage});
          scope_RecipientPresentationController.isAcknowledgmentFlow = false;
          navMan.setEntryPoint("acknowledgment","frmTransfers");
      scope_RecipientPresentationController.commonFunctionForNavigation("RecipientUIModule/frmAcknowledgement");
        }
    };
    Recipient_PresentationController.prototype.cancelCommon = function() {
        scope_RecipientPresentationController.clearBuilderNonGeneratedAttributes();
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.clearTransferObject();
        var navManager = applicationManager.getNavigationManager();
        var navigateToForm = navManager.getEntryPoint("makeatransfer");
        if (navigateToForm === "frmDashBoard") {
            var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AccountsUIModule", "appName":"HomepageMA"});
            accountMod.presentationController.showDashboard();
        } else
            navManager.navigateTo(navigateToForm);
        //var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
        //transModPresentationController.getTransactions();
    };
  Recipient_PresentationController.prototype.makeATransfer = function(description) {
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("transactionsNotes",description);
    var transactionObj = transactionManager.getTransactionObject();
    var mfaManager = applicationManager.getMFAManager();
    var serviceName = transactionObj.serviceName;
    if(kony.sdk.isNullOrUndefined(serviceName)){
      var displayName = applicationManager.getPresentationUtility().MFA.getDisplayNameBasedOnTransactionMode();
      applicationManager.getPresentationUtility().MFA.getServiceIdBasedOnDisplayName(displayName);
      serviceName = mfaManager.getServiceId();
    }
    else
      mfaManager.setServiceId(serviceName);
    if(serviceName){
      var mfaParams = {
        serviceName: serviceName,
      };
      transactionManager.setTransactionAttribute("MFAAttributes", mfaParams);
    }
    if (transactionManager.getTransactionObject().transactionId != "" && transactionManager.getTransactionObject().transactionId != null && transactionManager.getTransactionObject().transactionId != null) {
      mfaManager.setMFAFlowType("UPDATE");
       var request=transactionManager.getTransactionObject();
      var requestdata={};
      for (var prop in request) { 
                if (request[prop] !== null) { 
                    requestdata[prop]=request[prop];
                } 
            }
      switch(scope_RecipientPresentationController.transactionMode)
        {
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
              mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE");
              scope_RecipientPresentationController.mfaFlowType="TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE";
            transactionManager.editTransferToOwnAccounts(requestdata, scope_RecipientPresentationController.presentationMakeATransferSuccess, scope_RecipientPresentationController.presentationMakeATransferError);
            break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers"):
              mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_UPDATE");
             scope_RecipientPresentationController.mfaFlowType="INTRA_BANK_FUND_TRANSFER_UPDATE";
            transactionManager.editIntraBankAccFundTransfer(requestdata, scope_RecipientPresentationController.presentationMakeATransferSuccess, scope_RecipientPresentationController.presentationMakeATransferError);
            break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"):
            mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE");
            scope_RecipientPresentationController.mfaFlowType="INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE";
            transactionManager.editInterBankAccFundTransfer(requestdata, scope_RecipientPresentationController.presentationMakeATransferSuccess, scope_RecipientPresentationController.presentationMakeATransferError);
            break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"):
             mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE");
             scope_RecipientPresentationController.mfaFlowType="INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE";
            transactionManager.editInternationalAccFundTransfer(requestdata, scope_RecipientPresentationController.presentationMakeATransferSuccess, scope_RecipientPresentationController.presentationMakeATransferError);
            break;
        }
    } else {
      mfaManager.setMFAFlowType("CREATE");
      transactionManager.setTransactionAttribute("serviceName",serviceName);
      var request=transactionManager.getTransactionObject();
      var requestdata={};
      for (var prop in request) { 
                if (request[prop] !== null) { 
                    requestdata[prop]=request[prop];
                } 
            }
        switch(scope_RecipientPresentationController.transactionMode)
        {
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
            mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
             scope_RecipientPresentationController.mfaFlowType="TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE";
            transactionManager.createTransferToOwnAccounts(requestdata, scope_RecipientPresentationController.presentationMakeATransferSuccess, scope_RecipientPresentationController.presentationMakeATransferError);
            break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers"):
            mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_CREATE");
              scope_RecipientPresentationController.mfaFlowType="INTRA_BANK_FUND_TRANSFER_CREATE";
            transactionManager.createIntraBankAccFundTransfer(requestdata, scope_RecipientPresentationController.presentationMakeATransferSuccess, scope_RecipientPresentationController.presentationMakeATransferError);
            break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"):
             mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE");
            scope_RecipientPresentationController.mfaFlowType="INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
            transactionManager.createInterBankAccFundTransfer(requestdata, scope_RecipientPresentationController.presentationMakeATransferSuccess, scope_RecipientPresentationController.presentationMakeATransferError);
            break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"):
             mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE");
             scope_RecipientPresentationController.mfaFlowType="INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE";
            transactionManager.createInternationalAccFundTransfer(requestdata, scope_RecipientPresentationController.presentationMakeATransferSuccess, scope_RecipientPresentationController.presentationMakeATransferError);
            break;
        }
   //   transactionManager.createTransaction(transactionManager.getTransactionObject(), this.presentationMakeATransferSuccess, this.presentationMakeATransferError);
    }
  };
    Recipient_PresentationController.prototype.presentationMakeATransferSuccess = function(resp) {
      if(resp.MFAAttributes && resp.MFAAttributes.isMFARequired == "true"){
        var mfaJSON = {
        "flowType" :  scope_RecipientPresentationController.mfaFlowType,
          "response" : resp
        };
        applicationManager.getMFAManager().setMFAOperationType("Transfers");
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      }
      else{
        var navManager = applicationManager.getNavigationManager();
        var transactionManager = applicationManager.getTransactionManager();
        var navigateToForm = navManager.getEntryPoint("makeatransfer");
        if (navigateToForm !== "frmAccountDetails") {
           // var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
           // transModPresentationController.getTransactions();
            var navMan = applicationManager.getNavigationManager();
            var data = {};
            data.type = "success";
            data.typeOfTransaction = "create";
            data.res = resp;
            navMan.setCustomInfo("frmTransfers", data);
        } else {
            var navMan = applicationManager.getNavigationManager();
            var data = {};
            data.type = "success";
            data.typeOfTransaction = "create";
            data.res = resp;
            navMan.setCustomInfo("frmAccountDetails", data);
           if(applicationManager.getConfigurationManager().isAccountDetailsServiceConfigured)
        {
            var toAccountID = transactionManager.getTransactionObject().toAccountNumber;
           var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AccountsUIModule", "appName":"HomepageMA"});
        accountMod.presentationController.fetchAccountDetailsAndTransactions(scope_RecipientPresentationController.accDetHomeAcc);
        }
          else
		  {
            var accountsManager=applicationManager.getAccountManager();
            accountsManager.fetchInternalAccounts(scope_RecipientPresentationController.fetchAccountsSuccCallBack,scope_RecipientPresentationController.fetchAccountsErrCallBack);
		  }
        }
      }
    };
   Recipient_PresentationController.prototype.fetchAccountTransactions = function(){
      var transactionManager = applicationManager.getTransactionManager();
      var toAccountID = transactionManager.getTransactionObject().toAccountNumber;
      scope_RecipientPresentationController.clearBuilderNonGeneratedAttributes();
      transactionManager.clearTransferObject();
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AccountsUIModule", "appName":"HomepageMA"});
      accountMod.presentationController.fetchAccountTransactions(scope_RecipientPresentationController.accDetHomeAcc);
   };
    Recipient_PresentationController.prototype.fetchAccountsSuccCallBack = function(res){
      scope_RecipientPresentationController.fetchAccountTransactions();
    };
    Recipient_PresentationController.prototype.fetchAccountsErrCallBack = function(err){
      kony.print(err);
    };
    Recipient_PresentationController.prototype.presentationMakeATransferError = function(err) {
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var navMan = applicationManager.getNavigationManager();
            var navigateToForm = navMan.getEntryPoint("makeatransfer");
            var transactionManager = applicationManager.getTransactionManager();
             var toAccountID = transactionManager.getTransactionObject().toAccountNumber;
            scope_RecipientPresentationController.clearBuilderNonGeneratedAttributes();
            transactionManager.clearTransferObject();
            if (navigateToForm !== "frmAccountDetails") {
               // var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
                //transModPresentationController.getTransactions();
                var navMan = applicationManager.getNavigationManager();
                var data = {};
                data.type = "error";
                data.typeOfTransaction = "create";
                data.res = err["errorMessage"];
                navMan.setCustomInfo("frmTransfers", data);
            } else {
                var navMan = applicationManager.getNavigationManager();
                var data = {};
                data.type = "error";
                data.typeOfTransaction = "create";
                data.res = err["errorMessage"];
                navMan.setCustomInfo("frmAccountDetails", data);
               if(applicationManager.getConfigurationManager().isAccountDetailsServiceConfigured)
        {
           var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AccountsUIModule", "appName":"HomepageMA"});
        accountMod.presentationController.fetchAccountDetailsAndTransactions(scope_RecipientPresentationController.accDetHomeAcc);
        }
              else
                var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AccountsUIModule", "appName":"HomepageMA"});
                accountMod.presentationController.fetchAccountTransactions(scope_RecipientPresentationController.accDetHomeAcc);
            }
        }
    };
     Recipient_PresentationController.prototype.setFromAccountsForTransactions = function(selectedfromacc) {
       var formatUtil = applicationManager.getFormatUtilManager();
       var trasMan = applicationManager.getTransactionManager();
       trasMan.setTransactionAttribute("fromAccountNumber",selectedfromacc.accountID);
       trasMan.setTransactionAttribute("fromAccountName",selectedfromacc.accountName);
       trasMan.setTransactionAttribute("fromAccountType",selectedfromacc.accountType);
       trasMan.setTransactionAttribute("fromBankName",selectedfromacc.bankName);
       if(selectedfromacc.fromAccountCurrency)
       {
         trasMan.setTransactionAttribute("transactionCurrency",selectedfromacc.fromAccountCurrency);
         trasMan.setTransactionAttribute("fromAccountCurrency",selectedfromacc.fromAccountCurrency);
       }
       else
       {
         trasMan.setTransactionAttribute("transactionCurrency",selectedfromacc.currencyCode);
         trasMan.setTransactionAttribute("fromAccountCurrency",selectedfromacc.currencyCode);
       }
    };
    Recipient_PresentationController.prototype.setTransactionObject = function(transactionData) {
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
      if (transactionData.ExternalAccountNumber !== undefined && transactionData.ExternalAccountNumber !== null) {
        transactionObj.setTransactionAttribute("toAccountNumber",transactionData.ExternalAccountNumber);
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
	    if (transactionData.toAccountType !== undefined && transactionData.toAccountType !== null) {
        transactionObj.setTransactionAttribute("toAccountType",transactionData.toAccountType);
      }
      if (transactionData.transactionsNotes !== undefined && transactionData.transactionsNotes !== null) {
        transactionObj.setTransactionAttribute("transactionsNotes",transactionData.transactionsNotes);
      }
      if (transactionData.serviceName !== undefined && transactionData.serviceName !== null) {
        transactionObj.setTransactionAttribute("serviceName",transactionData.serviceName);
      }
      if(transactionData.fromAccountCurrency!==undefined && transactionData.fromAccountCurrency!==null)
      {
        transactionObj.setTransactionAttribute("fromAccountCurrency",transactionData.fromAccountCurrency);
      }
      if(transactionData.toAccountCurrency!==undefined && transactionData.toAccountCurrency!==null)
      {
        transactionObj.setTransactionAttribute("toAccountCurrency",transactionData.toAccountCurrency);
      }
       var transMode=   scope_RecipientPresentationController.getTypeByAction(transactionData.serviceName);
        scope_RecipientPresentationController.transactionMode=transMode;
       
      var action = transactionData.serviceName;
      if(action){
        var accMan = applicationManager.getAccountManager();
        var data = accMan.getInternalAccountByID(transactionData.fromAccountNumber);
        var configManager=applicationManager.getConfigurationManager();
        scope_RecipientPresentationController.numberOfAsync = 2;
        scope_RecipientPresentationController.asyncManager.initiateAsyncProcess(scope_RecipientPresentationController.numberOfAsync);
        scope_RecipientPresentationController.isNavigated = false;
        accMan.fetchInternalAccounts(scope_RecipientPresentationController.fromAccountPresentationSuccessCallBack, scope_RecipientPresentationController.fromAccountPresentationErrorCallBack);
        configManager.fetchLimitsForAnAction(action,scope_RecipientPresentationController.fetchLimitsAndFromAccSuccess,scope_RecipientPresentationController.fetchLimitsAsyncError);
       }
       else
       scope_RecipientPresentationController.showPreferredAccount();

    };
    Recipient_PresentationController.prototype.setFlowType = function(type) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setFlowType(type);
    };
    Recipient_PresentationController.prototype.getFlowType = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.getFlowType();
    };
    Recipient_PresentationController.prototype.getAllInternalBankBenificiaries = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.getAllInternalBenificiaries().ExternalAccounts;
    };
    Recipient_PresentationController.prototype.getAllExternalBankBenificiaries = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.getAllExternalBenificiaries().ExternalAccounts;
    };
    Recipient_PresentationController.prototype.clearBenificiaryData = function() {
      scope_RecipientPresentationController.clearBuilderNonGeneratedAttributes();
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.clearBeneficiaryObject();
    };
    Recipient_PresentationController.prototype.getBenificiaryData = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        return recipientsManager.getBenificiaryData();
    };
    Recipient_PresentationController.prototype.setIsSameBankBenificiary = function(value) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setIsSameBankBenificiary(value);
    };
    Recipient_PresentationController.prototype.setTransferToInfo = function() {
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.clearTransferObject();
        var navManager = applicationManager.getNavigationManager();
        var transferModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
        var benificiaryDetails = transferModPresentationController.getBenificiaryData();
        var transferDetails = {};
        transferDetails.selectedAccountData = benificiaryDetails;
        var transMan = applicationManager.getTransactionManager();
        transMan.setTransactionAttribute("toAccountNumber",benificiaryDetails["accountNumber"]);
        scope_RecipientPresentationController.setToBankName(benificiaryDetails["bankName"]);
        transMan.setTransactionAttribute("toAccountName",benificiaryDetails["nickName"]);
        transMan.setTransactionAttribute("toAccountType",benificiaryDetails["accountType"]);
        transMan.setTransactionAttribute("transactionType","ExternalTransfer");
        transMan.setTransactionAttribute("isBusiness",benificiaryDetails["isBusinessPayee"]);
        navManager.setCustomInfo("frmTransfersToAccount", transferDetails);
        var transModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
        transModPresentationController.navAfterToAcc();
    };
  Recipient_PresentationController.prototype.downloadTransactionReport = function(requestParam) {
    var userManager = applicationManager.getUserPreferencesManager();
    requestParam.generatedBy = userManager.getUserName();
    var pdfurl = applicationManager.getTransactionManager().DownloadTransactionPDF(requestParam);
    kony.application.openURL(pdfurl);
  };
    Recipient_PresentationController.prototype.getBankName = function() {
        var configMan = applicationManager.getConfigurationManager();
        return configMan.getBankName();
    };
	  /** fetches Bank Details For InternationalTransfer
    * @param {String} swiftCode swift code
    * @param {String} serviceName  service name
    */
  Recipient_PresentationController.prototype.fetchBankDetailsForInternationalTransfer = function (swiftCode, serviceName) {
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
  Recipient_PresentationController.prototype.fetchBankDetailsForInternationalTransferSuccess = function (response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var currentForm = kony.application.getCurrentForm().id;
    var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
     controller.validateSwiftcode(response.bankName);
  };
  /** Failure callback when fetching of bank details for international transfer fails
     */
  Recipient_PresentationController.prototype.fetchBankDetailsForInternationalTransferFailure = function (err) {
     applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmBenSwiftCode', true);
            controller.bindGenericError(err.errorMessage);
        }
  };
    Recipient_PresentationController.prototype.transfersModule = function() {
        //var transModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
        // transModPresentationController.showFromAccounts();
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.clearTransferObject();
        scope_RecipientPresentationController.clearBuilderNonGeneratedAttributes();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersDuration", {});
        navMan.setEntryPoint("makeatransfer", "frmTransfers");
        navMan.navigateTo("frmTransactionMode");
    };
     Recipient_PresentationController.prototype.repeatTransfer = function(transactionData) {
        var formatUtil = applicationManager.getFormatUtilManager();
        var transactionObj = applicationManager.getTransactionManager();
        if (transactionData.amount !== undefined && transactionData.amount !== null) {
          var amount=transactionData.amount;
          if(transactionData.amount.indexOf("-")!=-1)
          {
           		amount= transactionData.amount.split("-")[1];
          }
          amount = formatUtil.deFormatAmount(amount);
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
		if (transactionData.toAccountType !== undefined && transactionData.toAccountType !== null) {
        transactionObj.setTransactionAttribute("toAccountType",transactionData.toAccountType);
      }
        if (transactionData.toAccountNumber !== undefined && transactionData.toAccountNumber !== null) {
            transactionObj.setTransactionAttribute("toAccountNumber",transactionData.toAccountNumber);
        }
        if (transactionData.ExternalAccountNumber !== undefined && transactionData.ExternalAccountNumber !== null) {
            transactionObj.setTransactionAttribute("toAccountNumber",transactionData.ExternalAccountNumber);
        }
        if (transactionData.toAccountName !== undefined && transactionData.toAccountName !== null) {
            transactionObj.setTransactionAttribute("toAccountName",transactionData.toAccountName);
        }
        if (transactionData.frequencyStartDate !== undefined && transactionData.frequencyStartDate !== null) {
            var startdate = formatUtil.getDateObjectfromString(transactionData.frequencyStartDate, "YYYY-MM-DD");
            var startDate = formatUtil.getFormatedDateString(startdate, formatUtil.getApplicationDateFormat());
            transactionObj.setTransactionAttribute("frequencyStartDate",startDate);
        }
        if (transactionData.frequencyEndDate !== undefined && transactionData.frequencyEndDate !== null) {
            var enddate = formatUtil.getDateObjectfromString(transactionData.frequencyEndDate, "YYYY-MM-DD");
            var endDate = formatUtil.getFormatedDateString(enddate, formatUtil.getApplicationDateFormat());
            transactionObj.setTransactionAttribute("frequencyEndDate",endDate);
        }
        if (transactionData.scheduledDate !== undefined && transactionData.scheduledDate !== null) {
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
       if (transactionData.serviceName !== undefined && transactionData.serviceName !== null) {
         transactionObj.setTransactionAttribute("serviceName",transactionData.serviceName);
       }
       if(transactionData.fromAccountCurrency!==undefined && transactionData.fromAccountCurrency!==null)
       {
         transactionObj.setTransactionAttribute("fromAccountCurrency",transactionData.fromAccountCurrency);
       }
       if(transactionData.toAccountCurrency!==undefined && transactionData.toAccountCurrency!==null)
       {
         transactionObj.setTransactionAttribute("toAccountCurrency",transactionData.toAccountCurrency);
       }
        var transMode=   scope_RecipientPresentationController.getTypeByAction(transactionData.serviceName);
        scope_RecipientPresentationController.transactionMode=transMode;
       var action = transactionData.serviceName;
       if(action){
            scope_RecipientPresentationController.numberOfAsync = 2;
            var accMan = applicationManager.getAccountManager();
            var configManager=applicationManager.getConfigurationManager();
            scope_RecipientPresentationController.asyncManager.initiateAsyncProcess(scope_RecipientPresentationController.numberOfAsync);
            scope_RecipientPresentationController.isNavigated = false;
            accMan.fetchInternalAccounts(scope_RecipientPresentationController.fromAccountPresentationSuccessCallBack, scope_RecipientPresentationController.fromAccountPresentationErrorCallBack);
            configManager.fetchLimitsForAnAction(action,scope_RecipientPresentationController.fetchLimitsAndFromAccSuccess,scope_RecipientPresentationController.fetchLimitsAsyncError);
       }
        // scope_RecipientPresentationController.showPreferredAccount();
    };
    Recipient_PresentationController.prototype.fetchLimitsAndFromAccSuccess = function(res){
        scope_RecipientPresentationController.limitsData = res;
        scope_RecipientPresentationController.asyncManager.setSuccessStatus(1, res);
        if (scope_RecipientPresentationController.asyncManager.areAllMandatoryservicesDone(scope_RecipientPresentationController.numberOfAsync,[1]) && !scope_RecipientPresentationController.isNavigated) {
            var accNav = applicationManager.getAccountManager();
            var frmacc = accNav.getFromTransferSupportedAccounts();
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("frmTransfersFromAccount", {
                "fromaccounts": frmacc
            });
            scope_RecipientPresentationController.isNavigated = true;
            navMan.navigateTo("frmTransferAmount");
        }
    };
    Recipient_PresentationController.prototype.fromAccountPresentationSuccessCallBack = function(res){
        scope_RecipientPresentationController.asyncManager.setSuccessStatus(0, res);
        if (scope_RecipientPresentationController.asyncManager.areAllMandatoryservicesDone(scope_RecipientPresentationController.numberOfAsync,[1]) && !scope_RecipientPresentationController.isNavigated) {
            var accNav = applicationManager.getAccountManager();
            var frmacc = accNav.getFromTransferSupportedAccounts();
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("frmTransfersFromAccount", {
                "fromaccounts": frmacc
            });
            scope_RecipientPresentationController.isNavigated = true;
            navMan.navigateTo("frmTransferAmount");
        }
    };
    Recipient_PresentationController.prototype.fromAccountPresentationErrorCallBack = function(resTransPostErr){
        scope_RecipientPresentationController.asyncManager.setErrorStatus(0, resTransPostErr);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (resTransPostErr["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPostErr);
        }
    };
    Recipient_PresentationController.prototype.fetchLimitsAsyncError = function(error){
        scope_RecipientPresentationController.asyncManager.setErrorStatus(1, error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (scope_RecipientPresentationController.asyncManager.areAllMandatoryservicesDone(scope_RecipientPresentationController.numberOfAsync,[1]) && !scope_RecipientPresentationController.isNavigated) {
            var accNav = applicationManager.getAccountManager();
            var frmacc = accNav.getFromTransferSupportedAccounts();
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("frmTransfersFromAccount", {
                "fromaccounts": frmacc
            });
            scope_RecipientPresentationController.isNavigated = true;
            navMan.navigateTo("frmTransferAmount");
        }
        kony.print("error in fetchLimitsAsyncError");
    };
  Recipient_PresentationController.prototype.deleteTransaction = function(data) {
    var transactionObj = applicationManager.getTransactionManager().getTransactionObject();
    var transactionType = transactionObj.transactionType;
    var criteria = {
      "transactionId": data.transactionId
    };
    var transactionObj = applicationManager.getTransactionManager();
    //  transactionObj.deleteTransaction(criteria, scope_RecipientPresentationController.deleteSuccess, scope_RecipientPresentationController.deleteError);
    switch(scope_RecipientPresentationController.transactionMode)
    {
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
        transactionObj.cancelTransferToOwnAccounts(criteria, scope_RecipientPresentationController.deleteSuccess, scope_RecipientPresentationController.deleteError);
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers"):
        transactionObj.cancelIntraBankAccFundTransfer(criteria, scope_RecipientPresentationController.deleteSuccess, scope_RecipientPresentationController.deleteError);
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"):
        transactionObj.cancelInterBankAccFundTransfer(criteria, scope_RecipientPresentationController.deleteSuccess, scope_RecipientPresentationController.deleteError);
        break;
      case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"):
        transactionObj.cancelInternationalAccFundTransfer(criteria, scope_RecipientPresentationController.deleteSuccess, scope_RecipientPresentationController.deleteError);
        break;
    }
  };
    Recipient_PresentationController.prototype.deleteRecurrenceTransaction = function(data) {
       var criteria = {
             "transactionId": data.transactionId
        };
        var transactionManager = applicationManager.getTransactionManager();
      //  transactionObj.deleteRecurrenceTransaction(criteria, scope_RecipientPresentationController.deleteSuccess, scope_RecipientPresentationController.deleteError);
         switch(scope_RecipientPresentationController.transactionMode)
        {
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
            transactionManager.cancelOccurrenceTransferToOwnAccounts(criteria, scope_RecipientPresentationController.deleteSuccess, scope_RecipientPresentationController.deleteError);
            break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers"):
            transactionManager.cancelOccurrenceIntraBankAccFundTransfer(criteria, scope_RecipientPresentationController.deleteSuccess, scope_RecipientPresentationController.deleteError);
            break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts"):
            transactionManager.cancelOccurrenceInterBankAccFundTransfer(criteria, scope_RecipientPresentationController.deleteSuccess, scope_RecipientPresentationController.deleteError);
            break;
            case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"):
            transactionManager.cancelOccurrenceInternationalAccFundTransfer(criteria, scope_RecipientPresentationController.deleteSuccess, scope_RecipientPresentationController.deleteError);
            break;
        }
    };
    Recipient_PresentationController.prototype.deleteSuccess = function(res) {
        //alert(JSON.stringify(res));
       // var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
       // transModPresentationController.getTransactions();
        var navMan = applicationManager.getNavigationManager();
        var data = {};
        data.type = "success";
        data.typeOfTransaction = "delete";
        data.res = res;
        navMan.setCustomInfo("frmTransfers", data);
    };
    Recipient_PresentationController.prototype.deleteError = function(err) {
        //alert(JSON.stringify(err));
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var navMan = applicationManager.getNavigationManager();
          //  var transModPresentationController = applicationManager.getModulesPresentationController("TransactionUIModule");
          //  transModPresentationController.getTransactions();
            var data = {};
            data.type = "error";
            data.res = err["errorMessage"];
            navMan.setCustomInfo("frmTransfers", data);
        }
    };
    Recipient_PresentationController.prototype.navigateToTransfers = function(data) {
        var navMan = applicationManager.getNavigationManager();
        var transMan = applicationManager.getTransactionManager();
        scope_RecipientPresentationController.clearBuilderNonGeneratedAttributes();
        transMan.clearTransferObject();
        scope_RecipientPresentationController.accDetHomeAcc=data["accountID"]
        transMan.setTransactionAttribute("toAccountNumber",data["accountID"]);
        scope_RecipientPresentationController.setToBankName(data["bankName"]);
        transMan.setTransactionAttribute("toAccountName",data["nickName"]);
        transMan.setTransactionAttribute("toAccountType",data["accountType"]);
        transMan.setTransactionAttribute("transactionType","InternalTransfer");
        //alert(transMan.getP2PObject());
        //scope_RecipientPresentationController.showFromAccounts();
        var accMan = applicationManager.getAccountManager();
        var preAccData = accMan.getTransfersPreferredAccount();
        if (preAccData) {
            scope_RecipientPresentationController.setFromAccountsForTransactions(preAccData);
            scope_RecipientPresentationController.showFromAccounts(scope_RecipientPresentationController.fromAccountOnContinuePresentationSuccessCallBack);
            //navMan.navigateTo("frmTransferAmount");
        } else {
            scope_RecipientPresentationController.showFromAccounts(scope_RecipientPresentationController.fromAccountsPresentationSuccessCallBack);
            // navMan.navigateTo("frmTransfersFromAccount");
        }
        //  scope_RecipientPresentationController.showPreferredAccount();
    };
    Recipient_PresentationController.prototype.navigateToTransfersFromDetails = function(data) {
        var navMan = applicationManager.getNavigationManager();
        var transMan = applicationManager.getTransactionManager();
        scope_RecipientPresentationController.clearBuilderNonGeneratedAttributes();
        transMan.clearTransferObject();
        scope_RecipientPresentationController.accDetHomeAcc=data["accountID"]
        transMan.setTransactionAttribute("toAccountNumber",data["accountID"]);
        scope_RecipientPresentationController.setToBankName(data["bankName"]);
        transMan.setTransactionAttribute("toAccountName",data["nickName"]);
        transMan.setTransactionAttribute("toAccountType",data["accountType"]);
        transMan.setTransactionAttribute("transactionType","InternalTransfer");
        //alert(transMan.getP2PObject());
        //scope_RecipientPresentationController.showFromAccounts();
        var accMan = applicationManager.getAccountManager();
        var preAccData = accMan.getTransfersPreferredAccount();
        scope_RecipientPresentationController.numberOfAsync = 2;
        if (preAccData) {
            var configManager=applicationManager.getConfigurationManager();
            var action = data.serviceName;
            if(action){
            scope_RecipientPresentationController.setFromAccountsForTransactions(preAccData);
            scope_RecipientPresentationController.asyncManager.initiateAsyncProcess(scope_RecipientPresentationController.numberOfAsync);
            scope_RecipientPresentationController.isNavigated = false;
            accMan.fetchInternalAccounts(scope_RecipientPresentationController.fromAccountOnContinueAsyncPresentationSuccessCallBack, scope_RecipientPresentationController.fetchInternalAccPresentationErrorCallBack);
            configManager.fetchLimitsForAnAction(action,scope_RecipientPresentationController.limitsOnContinueAsyncPresentationSuccessCallBack,scope_RecipientPresentationController.limitsOnContinueAsyncPresentationErrorCallBack);
            }
            else{
                scope_RecipientPresentationController.setFromAccountsForTransactions(preAccData);
                scope_RecipientPresentationController.showFromAccounts(scope_RecipientPresentationController.fromAccountOnContinuePresentationSuccessCallBack);
            }
            //navMan.navigateTo("frmTransferAmount");
        } else {
            var configManager=applicationManager.getConfigurationManager();
            var action = data.serviceName;
            if(action){
            scope_RecipientPresentationController.asyncManager.initiateAsyncProcess(scope_RecipientPresentationController.numberOfAsync);
            scope_RecipientPresentationController.isNavigated = false;
            accMan.fetchInternalAccounts(scope_RecipientPresentationController.fromAccountsAsyncPresentationSuccessCallBack, scope_RecipientPresentationController.fetchInternalAccPresentationErrorCallBack);
            configManager.fetchLimitsForAnAction(action,scope_RecipientPresentationController.limitsAsyncPresentationSuccessCallBack,scope_RecipientPresentationController.limitsAsyncPresentationErrorCallBack);
            }
            else
            scope_RecipientPresentationController.showFromAccounts(scope_RecipientPresentationController.fromAccountsPresentationSuccessCallBack);
            // navMan.navigateTo("frmTransfersFromAccount");
        }
        //  scope_RecipientPresentationController.showPreferredAccount();
    };
    Recipient_PresentationController.prototype.fromAccountOnContinueAsyncPresentationSuccessCallBack = function(res){
        scope_RecipientPresentationController.asyncManager.setSuccessStatus(0, res);
        if (scope_RecipientPresentationController.asyncManager.areAllMandatoryservicesDone(scope_RecipientPresentationController.numberOfAsync,[1])&& !scope_RecipientPresentationController.isNavigated) {
        var accNav = applicationManager.getAccountManager();
        var frmacc = accNav.getFromTransferSupportedAccounts();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersFromAccount", {
            "fromaccounts": frmacc
        });
        scope_RecipientPresentationController.isNavigated = true;
        navMan.navigateTo("frmTransferAmount");
      }
    };
    Recipient_PresentationController.prototype.limitsOnContinueAsyncPresentationSuccessCallBack = function(res){
        scope_RecipientPresentationController.limitsData = res;
        scope_RecipientPresentationController.asyncManager.setSuccessStatus(1, res);
        if (scope_RecipientPresentationController.asyncManager.areAllMandatoryservicesDone(scope_RecipientPresentationController.numberOfAsync,[1])&& !scope_RecipientPresentationController.isNavigated) {
        var accNav = applicationManager.getAccountManager();
        var frmacc = accNav.getFromTransferSupportedAccounts();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersFromAccount", {
            "fromaccounts": frmacc
        });
        scope_RecipientPresentationController.isNavigated = true;
        navMan.navigateTo("frmTransferAmount");
      }
    };
    Recipient_PresentationController.prototype.limitsOnContinueAsyncPresentationErrorCallBack = function(error){
        scope_RecipientPresentationController.asyncManager.setErrorStatus(1, error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (scope_RecipientPresentationController.asyncManager.areAllMandatoryservicesDone(scope_RecipientPresentationController.numberOfAsync,[1]) && !scope_RecipientPresentationController.isNavigated) {
            var accNav = applicationManager.getAccountManager();
        var frmacc = accNav.getFromTransferSupportedAccounts();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersFromAccount", {
            "fromaccounts": frmacc
        });
        scope_RecipientPresentationController.isNavigated = true;
        navMan.navigateTo("frmTransferAmount");
        }
        kony.print("error in limitsOnContinueAsyncPresentationErrorCallBack");

    };
    Recipient_PresentationController.prototype.fromAccountsAsyncPresentationSuccessCallBack = function(res){
        scope_RecipientPresentationController.asyncManager.setSuccessStatus(0, res);
        if (scope_RecipientPresentationController.asyncManager.areAllMandatoryservicesDone(scope_RecipientPresentationController.numberOfAsync,[1])&& !scope_RecipientPresentationController.isNavigated) {
        var accNav = applicationManager.getAccountManager();
        var frmacc = accNav.getFromTransferSupportedAccounts();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersFromAccount", {
            "fromaccounts": frmacc
        });
        scope_RecipientPresentationController.isNavigated = true;
        navMan.navigateTo("frmTransfersFromAccount");
      }
    };
    Recipient_PresentationController.prototype.limitsAsyncPresentationErrorCallBack = function(error){
        scope_RecipientPresentationController.asyncManager.setErrorStatus(1, error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (scope_RecipientPresentationController.asyncManager.areAllMandatoryservicesDone(scope_RecipientPresentationController.numberOfAsync,[1]) && !scope_RecipientPresentationController.isNavigated) {
            scope_RecipientPresentationController.isNavigated = true;
            var accNav = applicationManager.getAccountManager();
            var frmacc = accNav.getFromTransferSupportedAccounts();
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("frmTransfersFromAccount", {
                "fromaccounts": frmacc
        });
        navMan.navigateTo("frmTransfersFromAccount");
        }
        kony.print("error in limitsAsyncPresentationErrorCallBack");
    };
    Recipient_PresentationController.prototype.limitsAsyncPresentationSuccessCallBack = function(res){
        scope_RecipientPresentationController.limitsData = res;
        scope_RecipientPresentationController.asyncManager.setSuccessStatus(1, res);
        if (scope_RecipientPresentationController.asyncManager.areAllMandatoryservicesDone(scope_RecipientPresentationController.numberOfAsync,[1])&& !scope_RecipientPresentationController.isNavigated) {
        var accNav = applicationManager.getAccountManager();
        var frmacc = accNav.getFromTransferSupportedAccounts();
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmTransfersFromAccount", {
            "fromaccounts": frmacc
        });
        scope_RecipientPresentationController.isNavigated = true;
        navMan.navigateTo("frmTransfersFromAccount");
      }
    };
    Recipient_PresentationController.prototype.fetchInternalAccPresentationErrorCallBack = function(error){
    scope_RecipientPresentationController.asyncManager.setErrorStatus(0, error);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    else
        kony.print("error in fetchInternalAccPresentationErrorCallBack");
    };
    Recipient_PresentationController.prototype.navigateToTransfersChecking = function(data) {
             scope_RecipientPresentationController.clearBuilderNonGeneratedAttributes();
       var transMan = applicationManager.getTransactionManager();
                    transMan.clearTransferObject();
       scope_RecipientPresentationController.accDetHomeAcc=data["accountID"];
        var navMan = applicationManager.getNavigationManager();
               navMan.setCustomInfo("frmTransfersDuration", {});
               navMan.navigateTo("frmTransactionMode");
                  scope_RecipientPresentationController.setFromAccountsForTransactions(data);                 
             
          };

    Recipient_PresentationController.prototype.fetchInternationalRecepients = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.fetchInternationalRecepients(scope_RecipientPresentationController.fetchInternationalRecepientsPresentationSuccess, scope_RecipientPresentationController.fetchInternationalRecepientsPresentationError);
    };
    Recipient_PresentationController.prototype.fetchInternationalRecepientsPresentationSuccess = function() {
       if(scope_RecipientPresentationController.isAcknowledgmentFlow==true) {
      scope_RecipientPresentationController.isAcknowledgmentFlow=false;
//       var navMan=applicationManager.getNavigationManager();
//       navMan.setCustomInfo("frmAcknowledgment",scope_RecipientPresentationController.navData);
//       navMan.setEntryPoint("acknowledgment","frmTransfers");
      scope_RecipientPresentationController.commonFunctionForNavigation("RecipientUIModule/frmAcknowledgement");
    }
      else
        scope_RecipientPresentationController.commonFunctionForNavigation("frmManageRecipientList");
    };
    Recipient_PresentationController.prototype.fetchInternationalRecepientsPresentationError = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
    };
    Recipient_PresentationController.prototype.navigateToEnterBenificiaryAccountNumberFromSwiftCode = function(swiftCode, bankName) {
        var recipientsManager = applicationManager.getRecipientsManager();
        scope_RecipientPresentationController.setSwiftCode(swiftCode);
        scope_RecipientPresentationController.setBankNameFromResponse(bankName);
        scope_RecipientPresentationController.commonFunctionForNavigation("frmEnterBenAccNumorIBAN");
       // scope_RecipientPresentationController.commonFunctionForNavigation("frmEnterBenAccNo");
    };
    Recipient_PresentationController.prototype.navigateToEnterSwiftCode = function(countryName) {
        var recipientsManager = applicationManager.getRecipientsManager();
        scope_RecipientPresentationController.setCountryName(countryName);
        scope_RecipientPresentationController.commonFunctionForNavigation("frmBenSwiftCode");
    };
    Recipient_PresentationController.prototype.createInternationalBenificiary = function() {
        var navMan = applicationManager.getNavigationManager();
        var recipientsManager = applicationManager.getRecipientsManager();
        var benificiaryData=scope_RecipientPresentationController.getBenificiaryData();
        //benificiaryData.accountType = "Savings"; //Temp addition, because mobile doesn't have UI for selecting account type
      	var configManager = applicationManager.getConfigurationManager();
      	if(configManager.isSMEUser === "true" || configManager.isMBBUser === "true"){
        	benificiaryData.isBusinessPayee = "1";
      	}
        recipientsManager.createABenificiary(benificiaryData, scope_RecipientPresentationController.createInternationalBenificiaryPresentationSuccess, scope_RecipientPresentationController.createInternationalBenificiaryPresentationError);
    };
    Recipient_PresentationController.prototype.createInternationalBenificiaryPresentationSuccess = function(succResponse) {
      
      scope_RecipientPresentationController.internationalBenificiaryAdded = true;
      scope_RecipientPresentationController.isAcknowledgmentFlow = true;
        var navMan = applicationManager.getNavigationManager();
        var accntType = navMan.getCustomInfo("frmTransfersToAccount");
        var maskedAccountNumber=applicationManager.getDataProcessorUtility().maskAccountNumber(succResponse.selectedAccountData["accountNumber"]);
        scope_RecipientPresentationController.navData ={};
        scope_RecipientPresentationController.navData["Reference ID"] = succResponse["Id"];
        if(succResponse.selectedAccountData["bankName"] !== null && succResponse.selectedAccountData["bankName"] !== undefined && succResponse.selectedAccountData["bankName"] !== ''){
			scope_RecipientPresentationController.navData["Bank Name"] = succResponse.selectedAccountData["bankName"];
		}
        scope_RecipientPresentationController.navData["Account Number"] = maskedAccountNumber;
        //scope_RecipientPresentationController.navData["Account Type"] = succResponse.selectedAccountData["accountType"];
        scope_RecipientPresentationController.navData["Recipient Name"] = succResponse.selectedAccountData["beneficiaryName"];
        scope_RecipientPresentationController.navData["Nick Name"] = succResponse.selectedAccountData["nickName"];
        scope_RecipientPresentationController.navData["Linked with"] = succResponse.selectedAccountData["totalContractCustomerSelected"]+" Customers ID";
      	
      	var navMan=applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmAcknowledgment",scope_RecipientPresentationController.navData);
      navMan.setEntryPoint("acknowledgment","frmTransfers");
      
        if (scope_RecipientPresentationController.getFlowType() === "InternationalTransferCreateTransfer") {
          navMan.setCustomInfo("frmTransfersToAccount",succResponse);
          scope_RecipientPresentationController.navAfterToAcc()
        }
        if (scope_RecipientPresentationController.getFlowType() === "InternationalRecipients") {
            scope_RecipientPresentationController.fetchInternationalRecepients();
        }
    };
    Recipient_PresentationController.prototype.createInternationalBenificiaryPresentationError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
           // var controller = applicationManager.getPresentationUtility().getController('frmBenVerifyDetails', true);
            //controller.bindGenericError(err.errorMessage);
           var navMan=applicationManager.getNavigationManager();
         navMan.setCustomInfo("frmAcknowledgment",{"error":err.errorMessage});
          scope_RecipientPresentationController.isAcknowledgmentFlow = false;
          navMan.setEntryPoint("acknowledgment","frmTransfers");
      scope_RecipientPresentationController.commonFunctionForNavigation("RecipientUIModule/frmAcknowledgement");
        }
    };
    Recipient_PresentationController.prototype.getAllInternationalBenificiaries = function(err) {
        var recipientManager = applicationManager.getRecipientsManager();
        return recipientManager.getAllInternationalBenificiaries().ExternalAccounts;
    }
    Recipient_PresentationController.prototype.navigateToTransfersRecipientDetails = function(data) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryObject(data);
        recipientsManager.setBeneficiaryAttribute("transactionMode", applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer"));
        scope_RecipientPresentationController.commonFunctionForNavigation("frmManageTransferRecipientInfo");
    }
    Recipient_PresentationController.prototype.fetchCountriesList = function() {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.fetchCountriesList(scope_RecipientPresentationController.fetchCountriesListSuccessCallBack, scope_RecipientPresentationController.fetchCountriesListErrorCallBack);
    };
    Recipient_PresentationController.prototype.fetchCountriesListSuccessCallBack = function(countryList) {
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmBenCountry", countryList);
        scope_RecipientPresentationController.commonFunctionForNavigation("frmBenCountry");
    };
    Recipient_PresentationController.prototype.fetchCountriesListErrorCallBack = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmManageRecipientList', true);
            controller.bindGenericError(err.errorMessage);
        }
    };
  
  Recipient_PresentationController.prototype.isValidAccNumOrIBAN = function(accNum, formName) {
        var validationUtility = applicationManager.getValidationUtilManager();
        var isValidAccountNumber = validationUtility.isValidAccountNumber(accNum);
        var isValidIBAN = validationUtility.isValidIBAN(accNum);
        if (isValidAccountNumber || isValidIBAN) {
            return true;
        } else {
            var controller = applicationManager.getPresentationUtility().getController(formName, true);
            controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.InvalidAccountNumberOrIBAN"));
            return false;
        }
    };  
  Recipient_PresentationController.prototype.isValidAccNum = function(accNum, formName) {
        var validationUtility = applicationManager.getValidationUtilManager();
        if (validationUtility.isValidAccountNumber(accNum)) {
            return true;
        } else {
            var controller = applicationManager.getPresentationUtility().getController(formName, true);
            controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.InvalidAccountNumber"));
            return false;
        }
    };
    Recipient_PresentationController.prototype.isValidSwiftCode = function(swiftCode, formName) {
        var validationUtility = applicationManager.getValidationUtilManager();
        if (validationUtility.isValidSwiftCode(swiftCode)) {
            return true;
        } else {
            var controller = applicationManager.getPresentationUtility().getController(formName, true);
            controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.InvalidSwiftCode"));
            return false;
        }
    };
    Recipient_PresentationController.prototype.setBenificiaryDetails = function(benificiaryData) {
        var recipientsManager = applicationManager.getRecipientsManager();
        recipientsManager.setBeneficiaryObject(benificiaryData);
    };
  	Recipient_PresentationController.prototype.isEligibleTransferType = function(transferType){
      var configManager = applicationManager.getConfigurationManager();
      return configManager.getConfigurationValue(transferType);
    };
    Recipient_PresentationController.prototype.evaluateMinMaxAmountLimits = function(amount){
      var configManager =  applicationManager.getConfigurationManager();
      var maxlimit,minlimit;
      switch(scope_RecipientPresentationController.transactionMode){
          case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
          	maxlimit = configManager.getConfigurationValue("maxKonyBankAccountsTransferLimit");
          	minlimit = configManager.getConfigurationValue("minKonyBankAccountsTransferLimit");
          	break;
          case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :
          	maxlimit = configManager.getConfigurationValue("maxOtherKonyAccountsTransferLimit");
          	minlimit = configManager.getConfigurationValue("minOtherKonyAccountsTransferLimit");
          	break;
          case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
          	maxlimit = configManager.getConfigurationValue("maxOtherBankAccountsTransferLimit");
          	minlimit = configManager.getConfigurationValue("minOtherBankAccountsTransferLimit");
          	break;
          case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
          	maxlimit = configManager.getConfigurationValue("maxInternationalAccountsTransferLimit");
          	minlimit = configManager.getConfigurationValue("minInternationalAccountsTransferLimit");
          	break;
      }
      if(Number(amount)>Number(maxlimit)){
        return {"max":maxlimit};
      }
      if(Number(amount)<Number(minlimit)){
        return {"min":minlimit};
      }
      return "valid";
    };
  
  	Recipient_PresentationController.prototype.navToContractDetails= function(recipientName){
      var recipientsManager = applicationManager.getRecipientsManager();
      if(recipientName !== undefined){
      	recipientsManager.setBeneficiaryAttribute("beneficiaryName",recipientName);
      }
      var flowType = scope_RecipientPresentationController.getFlowType();
      var featureAction = scope_RecipientPresentationController.getFeatureAction(flowType);
      scope_RecipientPresentationController.getContractDetails(featureAction);
  	};
  
  Recipient_PresentationController.prototype.getFeatureAction= function(flowType){
  	var action;
    switch(flowType){
      case "SameBankRecipients":
      case "OtherKonyBankMembersCreateTransfer":
        action = "INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT";
        break;
      case "InternationalRecipients":
      case "InternationalTransferCreateTransfer":
        action = "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT";
        break;
      default:
        action = "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT";
    }
    return action;
  };
  
  Recipient_PresentationController.prototype.getContractDetails = function(featureAction){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var recipientsManager = applicationManager.getRecipientsManager();
    recipientsManager.fetchContractDetails(featureAction, scope_RecipientPresentationController.getContractDetailsSuccessCallBack,scope_RecipientPresentationController.getContractDetailsErrorCallback);
  };
  
  Recipient_PresentationController.prototype.getContractDetailsSuccessCallBack = function(response){
    var controller = applicationManager.getPresentationUtility().getController('ManageActivitiesUIModule/frmContracts', true);
    var flowType = scope_RecipientPresentationController.getFlowType();
    var navMan = applicationManager.getNavigationManager();
    var previousForm = navMan.getEntryPoint("contracts");
    
    if(response.contracts.length == 0){
      var controller = applicationManager.getPresentationUtility().getController(previousForm, true);
      controller.bindGenericError("User Doesn't have access to any contracts");  
      
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
                applicationManager.getRecipientsManager().setBeneficiaryAttribute("totalContractCustomerSelected", 1);
        scope_RecipientPresentationController.commonFunctionForNavigation("frmBenVerifyDetails");
    	}
    }
    else{
      var controller = applicationManager.getPresentationUtility().getController('ManageActivitiesUIModule/frmContracts', true);
      controller.bindContractsData(response);
      if(flowType==="editTransfer"){
			var editController = applicationManager.getPresentationUtility().getController(previousForm, true);
			editController.isEditLinkedCustomerAvailable = true;
		}
		else {
			scope_RecipientPresentationController.commonFunctionForNavigation("ManageActivitiesUIModule/frmContracts");
		}
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
    
  Recipient_PresentationController.prototype.getContractDetailsErrorCallback = function(err){
    var navMan = applicationManager.getNavigationManager();
    var previousForm = navMan.getEntryPoint("contracts");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	 if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
   	 }else{
      var controller = applicationManager.getPresentationUtility().getController(previousForm, true);
      controller.bindGenericError(response.errorMessage);
      }
  };
  Recipient_PresentationController.prototype.getTnCcontent = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var config = applicationManager.getConfigurationManager();
    var locale=config.getLocale();
    var termsAndConditions=config.getTermsAndConditions();
    var param={
     "languageCode": termsAndConditions[locale],
      "termsAndConditionsCode": termsAndConditions["WireTransfers_TnC"]
   };
    var termsAndConditions = applicationManager.getTermsAndConditionsManager();
    termsAndConditions.fetchTermsAndConditionsPostLogin(param,scope_RecipientPresentationController.getTermsandConditionsSuccessCallBack,scope_RecipientPresentationController.getTermsandConditionsErrorCallback);
  };
  Recipient_PresentationController.prototype.getTermsandConditionsSuccessCallBack = function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    navManager.setCustomInfo("frmSupportInfo",{"richTextData":"<font face='SourceSansPro-Regular'>"+response.termsAndConditionsContent,"flowType":"Wire_Transfer","contentTypeID":response.contentTypeId,"header":configManager.constants.TERMS});
    var info = applicationManager.getNavigationManager().getCustomInfo("frmSupportInfo");
    if(info.contentTypeID == "URL"){
    kony.application.openURL(info.content);
    }
    else{
      navManager.navigateTo("frmSupportInfo");
    }
  };
  Recipient_PresentationController.prototype.getTermsandConditionsErrorCallback = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	 if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
   	 }else {
      var controller = applicationManager.getPresentationUtility().getController('frmWireTransferActivate', true);
      controller.bindGenericError(err.errorMessage);
      }
  };
  Recipient_PresentationController.prototype.validateAccountNumber = function(accountNo, formName) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transacManager = applicationManager.getRecipientsManager();
    var param = {"accountNumber" : accountNo};
    var dataJSON  = {
      "accountNumber" : accountNo,
      "formName" : formName
    };
    transacManager.getPayeeName(param,scope_RecipientPresentationController.getBeneficiaryNameSuccessCallBack.bind(this, dataJSON),scope_RecipientPresentationController.getBeneficiaryNameErrorCallback.bind(this, dataJSON));
  };
  Recipient_PresentationController.prototype.getBeneficiaryNameSuccessCallBack =  function(dataJSON, response) {
    if(response.beneficiaryName !== "" && !kony.sdk.isNullOrUndefined(response.beneficiaryName)) {
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmBenName", response);
      this.navigateToBenName(dataJSON.accountNumber);
    } else {
      var controller = applicationManager.getPresentationUtility().getController(dataJSON.formName, true);
      controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.InvalidAccountNumber"));
    }
  };
  Recipient_PresentationController.prototype.getBeneficiaryNameErrorCallback =  function(dataJSON, err) {
    var controller = applicationManager.getPresentationUtility().getController(dataJSON.formName, true);
    controller.bindGenericError(err.errorMessage);
  };
    return Recipient_PresentationController;
});