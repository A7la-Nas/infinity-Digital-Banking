define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController"], function(AsyncManager) {
	function CardLess_PresentationController() {
		kony.mvc.Presentation.BasePresenter.call(this);
		scope_cardlessPresentationController = this;
		this.asyncManager = new AsyncManager();
		this.deletedTransactionFlag = false;
		this.deletedTransactionErrorFlag = false;
		this.deletedTransactionErrorMessage = "";
		scope_cardlessPresentationController.fromBankName = "";
		scope_cardlessPresentationController.cardlessTransactionId = "";
		scope_cardlessPresentationController.cashlessContactType = "";
		scope_cardlessPresentationController.cashlessFirstName = "";
		scope_cardlessPresentationController.cashlessLastName = "";
		scope_cardlessPresentationController.transactionId = "";
		scope_cardlessPresentationController.qrSuccessFlag = "";
			/**   numberOfAsyncForCWTransactions
				*  1.getPendingCardlessTransactions
				*  2.getPostedCardlessTransactions
			*/
		scope_cardlessPresentationController.numberOfAsyncForCWTransactions=2;
			/**   numberOfAsyncForCWQRTransactions
				*  1.getPendingCardlessTransactions
				*  2.getPostedCardlessTransactions
			*/
		scope_cardlessPresentationController.numberOfAsyncForCWQRTransactions = 2;
	}
	inheritsFrom(CardLess_PresentationController, kony.mvc.Presentation.BasePresenter);
	CardLess_PresentationController.prototype.initializePresentationController = function() {
	};
	CardLess_PresentationController.prototype.clearBuilderNonGeneratedAttributes = function() {
		scope_cardlessPresentationController.fromBankName = "";
		scope_cardlessPresentationController.cardlessTransactionId = "";
		scope_cardlessPresentationController.cashlessContactType = "";
		scope_cardlessPresentationController.cashlessFirstName = "";
		scope_cardlessPresentationController.cashlessLastName = "";
	};
	CardLess_PresentationController.prototype.setFromBankName = function(fromBankName) {
		scope_cardlessPresentationController.fromBankName = fromBankName;
	};
	CardLess_PresentationController.prototype.getFromBankName = function() {
		return scope_cardlessPresentationController.fromBankName;
	};
	CardLess_PresentationController.prototype.setcardlessTransactionId = function(id) {
		scope_cardlessPresentationController.cardlessTransactionId = id;
	};
	CardLess_PresentationController.prototype.getCardlessTransactionId = function() {
		return scope_cardlessPresentationController.cardlessTransactionId;
	};
	CardLess_PresentationController.prototype.setCashlessContactType = function(contactType) {
		scope_cardlessPresentationController.cashlessContactType=contactType;
	};
	CardLess_PresentationController.prototype.getCashlessContactType = function() {
		return scope_cardlessPresentationController.cashlessContactType;
	};
	CardLess_PresentationController.prototype.setCashlessFirstName = function(firstName) {
		scope_cardlessPresentationController.cashlessFirstName=firstName;
	};
	CardLess_PresentationController.prototype.getCashlessFirstName = function() {
		return scope_cardlessPresentationController.cashlessFirstName;
	};
	CardLess_PresentationController.prototype.setCashlessLastName = function(lastName) {
		scope_cardlessPresentationController.cashlessLastName=lastName;
	};
	CardLess_PresentationController.prototype.getCashlessLastName = function() {
		return scope_cardlessPresentationController.cashlessLastName;
	};
    CardLess_PresentationController.prototype.setCashlessRecipientName = function(name) {
		scope_cardlessPresentationController.cashlessRecipientName=name;
	};
	CardLess_PresentationController.prototype.getCashlessRecipientName = function() {
		return scope_cardlessPresentationController.cashlessRecipientName;
	};
	CardLess_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
		var navManager = applicationManager.getNavigationManager();
		navManager.navigateTo(formName);
		applicationManager.getPresentationUtility().dismissLoadingScreen();
	};
	CardLess_PresentationController.prototype.fetchAccountsSuccCallBack = function(res) {
		var navMan = applicationManager.getNavigationManager();
		var accountsManager = applicationManager.getAccountManager();
		var data = accountsManager.getCardLessWithdrawlSupportedAccounts();
		navMan.setCustomInfo("frmCardLessFrom", {"fromaccounts": data});
		scope_cardlessPresentationController.goToAmountForm();
	};
	CardLess_PresentationController.prototype.fetchAccountsErrCallBack = function(error) {
		kony.print("error in fetching accounts");
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if (error["isServerUnreachable"]) {
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
	};
	CardLess_PresentationController.prototype.showFromAccounts = function() {
		var accMan = applicationManager.getAccountManager();
		accMan.fetchInternalAccounts(scope_cardlessPresentationController.showFromAccountsPresentationSuccessCallBack,
                                     scope_cardlessPresentationController.showFromAccountsPresentationErrorCallBack);
	};
	CardLess_PresentationController.prototype.showFromAccountsPresentationSuccessCallBack = function(res) {
		var accNav = applicationManager.getAccountManager();
		var frmacc = accNav.getCardLessWithdrawlSupportedAccounts();
		var navMan = applicationManager.getNavigationManager();
		navMan.setCustomInfo("frmCardLessFrom", {"fromaccounts": frmacc});
		navMan.navigateTo("frmCardLessFrom");
	};
	CardLess_PresentationController.prototype.showFromAccountsPresentationErrorCallBack = function(error) {
		kony.print("error in showFromAccountsPresentationErrorCallBack");
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if (error["isServerUnreachable"]) {
        	applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
	};
	CardLess_PresentationController.prototype.navigateToNewCashWithDrawForm = function(data) {
		var accountsManager = applicationManager.getAccountManager();
		accountsManager.fetchInternalAccounts(scope_cardlessPresentationController.fetchAccountsSuccCallBack,
                                          scope_cardlessPresentationController.fetchAccountsErrCallBack);
	};
	CardLess_PresentationController.prototype.navigateToCashRecipientForm = function(accountDateails) {
		var transactionObject = applicationManager.getTransactionManager();
		transactionObject.setTransactionAttribute("fromAccountName", accountDateails.accountName);
		transactionObject.setTransactionAttribute("fromAccountNumber", accountDateails.accountID);
		transactionObject.setTransactionAttribute("fromAccountBalance", accountDateails.availableBalance);
		transactionObject.setTransactionAttribute("fromAccountType", accountDateails.accountType);
		var configManager = applicationManager.getConfigurationManager();
		var bankName = configManager.getBankName();
		scope_cardlessPresentationController.setFromBankName(bankName);
		var navMan = applicationManager.getNavigationManager();
		navMan.setEntryPoint("cardlessEntry", "frmAccountDetails");
		scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessCashRec");
	};
	CardLess_PresentationController.prototype.navigateToQRCashWithdrawForm = function(accountDateails) {
		var transactionObject = applicationManager.getTransactionManager();
		transactionObject.setTransactionAttribute("fromAccountName", accountDateails.accountName);
		transactionObject.setTransactionAttribute("fromAccountNumber", accountDateails.accountID);
		transactionObject.setTransactionAttribute("fromAccountBalance", accountDateails.availableBalance);
		transactionObject.setTransactionAttribute("fromAccountType", accountDateails.accountType);
		var configManager = applicationManager.getConfigurationManager();
		var bankName = configManager.getBankName();
		scope_cardlessPresentationController.setFromBankName(bankName);
		var navMan = applicationManager.getNavigationManager();
		navMan.setEntryPoint("cardlessEntry", "frmAccountDetails");
		scope_cardlessPresentationController.navigateToNewCashWithDrawQRForm();
	};
	CardLess_PresentationController.prototype.goToAmountForm = function() {
		var transactionObject = applicationManager.getTransactionManager();
		var navMan = applicationManager.getNavigationManager();
		var txnModel = scope_cardlessPresentationController.getTransactionObject();
		var accId = txnModel.fromAccountNumber;
		var accMan = applicationManager.getAccountManager();
		var preAccData = accMan.getCardlessPreferredAccount();
		if (accId !== null && accId !== "" && accId !== undefined) {
			var txnDetails = transactionObject.getTransactionObject();
			txnDetails=scope_cardlessPresentationController.processAccountsData(txnDetails);
			navMan.setCustomInfo("frmCardLessWithdraw", txnDetails);
		} else  if (preAccData === "") {
 			scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessFrom");
		} else {
			transactionObject.setTransactionAttribute("fromAccountName", preAccData.accountName);
			transactionObject.setTransactionAttribute("fromAccountNumber", preAccData.accountID);
			transactionObject.setTransactionAttribute("fromAccountBalance", preAccData.availableBalance);
			transactionObject.setTransactionAttribute("fromAccountType", preAccData.accountType);
			var configManager = applicationManager.getConfigurationManager();
			var bankName = configManager.getBankName();
			scope_cardlessPresentationController.setFromBankName(bankName);
			var txnDetails = transactionObject.getTransactionObject();
			txnDetails = scope_cardlessPresentationController.processAccountsData(txnDetails);
			navMan.setCustomInfo("frmCardLessWithdraw", txnDetails);
		}
	};
	CardLess_PresentationController.prototype.getcashlessMode = function() {
		var transactionObj = scope_cardlessPresentationController.getTransactionObject();
		var selectedMode = transactionObj.cashlessMode;
		return selectedMode;
	}
	CardLess_PresentationController.prototype.setCashLessMode = function(mode) {
		var transactionObj = applicationManager.getTransactionManager();
		transactionObj.setTransactionAttribute("cashlessMode", mode);
		var navManager = applicationManager.getNavigationManager();
		if (mode === "Self") {
			scope_cardlessPresentationController.navigateToNewCashWithDrawForm();
          	navManager.navigateTo("frmCardLessWithdraw");
		} else if (mode === "others") {
          	scope_cardlessPresentationController.navigateToNewCashWithDrawForm();
			navManager.navigateTo("frmCardLessContactType");
		} else {
        	scope_cardlessPresentationController.navigateToNewCashWithDrawForm();
        }
	};
	CardLess_PresentationController.prototype.setCardlessContactType = function(contactType) {
		scope_cardlessPresentationController.setCashlessContactType(contactType);
		var navManager = applicationManager.getNavigationManager();
		if (contactType === "phone") {
			navManager.navigateTo("frmCardLessPhoneNo");
		} else if (contactType === "email") {
			navManager.navigateTo("frmCardLessEmail");
		}
	};
	CardLess_PresentationController.prototype.setCardlessPhoneNumber = function(data, formName) {
		var transactionObj = applicationManager.getTransactionManager();
		if (data.contact) {
			transactionObj.setTransactionAttribute("cashlessPhone",data.contact);
			scope_cardlessPresentationController.setCashlessFirstName(data.recipientName);
			if(data.lastName)
				scope_cardlessPresentationController.setCashlessLastName(data.lastName);
			else
				scope_cardlessPresentationController.setCashlessLastName("");
		} else
			transactionObj.setTransactionAttribute("cashlessPhone",data);
		transactionObj.setTransactionAttribute("cashlessEmail","");
		var navManager = applicationManager.getNavigationManager();
		navManager.setCustomInfo("frmCardLessRecName",data);
		navManager.navigateTo(formName);
	};
	CardLess_PresentationController.prototype.setCardlessEmail = function(data, formName) {
		var transactionObj = applicationManager.getTransactionManager();
		if (data.contact) {
			var validationManager = applicationManager.getValidationUtilManager();
			var validemail = validationManager.isValidEmail(data.contact);
			if (validemail) {
				transactionObj.setTransactionAttribute("cashlessEmail", data.contact);
				transactionObj.setTransactionAttribute("cashlessPhone", "");
				var navManager = applicationManager.getNavigationManager();
				scope_cardlessPresentationController.setCashlessFirstName(data.recipientName);
				if (data.lastName)
					scope_cardlessPresentationController.setCashlessLastName(data.lastName);
				else
					scope_cardlessPresentationController.setCashlessLastName("");
				navManager.setCustomInfo("frmCardLessRecName", data);
				navManager.navigateTo(formName);
			} else {
				var controller = applicationManager.getPresentationUtility().getController('frmCardLessEmail', true);
				controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.OnBoarding.InvalidEmail"));
			}
		} else {
			var validationManager = applicationManager.getValidationUtilManager();
			var validemail= validationManager.isValidEmail(data);
			if (validemail) {
				transactionObj.setTransactionAttribute("cashlessEmail", data);
				transactionObj.setTransactionAttribute("cashlessPhone", "");
				var navManager = applicationManager.getNavigationManager();
				navManager.setCustomInfo("frmCardLessRecName", data);
				navManager.navigateTo("frmCardLessRecName");
			} else {
				var controller = applicationManager.getPresentationUtility().getController('frmCardLessEmail', true);
				controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.OnBoarding.InvalidEmail"));
			}
		}
	};
	CardLess_PresentationController.prototype.setCardlessPersonName = function(personName) {
		var navManager = applicationManager.getNavigationManager();
		var person=personName[0];
		scope_cardlessPresentationController.setCashlessFirstName(personName[0]);
		scope_cardlessPresentationController.setCashlessLastName(personName[1]);
		if (kony.sdk.isNullOrUndefined(personName[1]) || personName[1] == "") {
			personName[1] = "";
		}
		person = person + " " + personName[1];
		var transactionObj = applicationManager.getTransactionManager();
		transactionObj.setTransactionAttribute("cashlessPersonName", person);
		scope_cardlessPresentationController.navigateToNewCashWithDrawForm();
	};
	CardLess_PresentationController.prototype.cancelCommon = function() {
		var transactionObj = applicationManager.getTransactionManager();
		transactionObj.clearTransferObject();
		scope_cardlessPresentationController.clearBuilderNonGeneratedAttributes();
		var navManager = applicationManager.getNavigationManager();
		var form = navManager.getEntryPoint("cardlessEntry");
		scope_cardlessPresentationController.commonFunctionForNavigation(form);
	};
	CardLess_PresentationController.prototype.cancelCommonQR = function() {
		var transactionObj = applicationManager.getTransactionManager();
		transactionObj.clearTransferObject();
		scope_cardlessPresentationController.clearBuilderNonGeneratedAttributes();
		var navManager = applicationManager.getNavigationManager();
		var form = navManager.getEntryPoint("cardlessEntry");
		scope_cardlessPresentationController.commonFunctionForNavigation(form);
	};
	CardLess_PresentationController.prototype.navigateToContacts=function() {
		var navManager = applicationManager.getNavigationManager();
		var cntType= scope_cardlessPresentationController.getCashlessContactType();
		try {
			applicationManager.getPresentationUtility().showLoadingScreen();
			var array=kony.contact.find("*", true);
			navManager.setCustomInfo("frmCardLessPickContacts",array);
			navManager.navigateTo("frmCardLessPickContacts");
		} catch(err) {
			if (cntType === "phone")
				var controller = applicationManager.getPresentationUtility().getController('frmCardLessPhoneNo', true);
			else
				var controller = applicationManager.getPresentationUtility().getController('frmCardLessEmail', true);
			controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardLess.permissionContacts"));
		}
	};
	CardLess_PresentationController.prototype.getCardlessPendingAndPostedTransactions=function(){
		var navMan=applicationManager.getNavigationManager();
		var navToForm=navMan.getEntryPoint("cardlessEntry");
		if (navToForm !== "frmCardLessHome") {
			var navMan = applicationManager.getNavigationManager();
			var transactionObject = applicationManager.getTransactionManager();
			var toAccountID = transactionObject.transferObject.fromAccountNumber;
			var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
			accountMod.presentationController.fetchAccountTransactions(toAccountID);
		} else {
			applicationManager.getPresentationUtility().showLoadingScreen();
			var navMan = applicationManager.getNavigationManager();
			scope_cardlessPresentationController.asyncManager.initiateAsyncProcess(scope_cardlessPresentationController.numberOfAsyncForCWTransactions);
			var transactionObj = applicationManager.getTransactionManager();
			transactionObj.fetchCardlessPendingTransactions(scope_cardlessPresentationController.fetchCardlessPenTranPresSucCallback,
                                                            scope_cardlessPresentationController.fetchCardlessPenTranPreErrCallback);
			transactionObj.fetchCardlessPostedTransactions(scope_cardlessPresentationController.fetchCardlessPosTranPresSucCallback,
                                                           scope_cardlessPresentationController.fetchCardlessPosTranErrCallback);
		}
	};
	CardLess_PresentationController.prototype.fetchCardlessPenTranPresSucCallback = function(resTransPend) {
		scope_cardlessPresentationController.asyncManager.setSuccessStatus(0, resTransPend);
		if (scope_cardlessPresentationController.asyncManager.areAllservicesDone(scope_cardlessPresentationController.numberOfAsyncForCWTransactions)) {
			scope_cardlessPresentationController.navigateToCardlessLandingScreen();
		}
	};
	CardLess_PresentationController.prototype.fetchCardlessPenTranPreErrCallback = function(resTransPendErr) {
		scope_cardlessPresentationController.asyncManager.setErrorStatus(0, resTransPendErr);
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if (resTransPendErr["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPendErr);
	};
	CardLess_PresentationController.prototype.fetchCardlessPosTranPresSucCallback = function(resTransPost) {
		scope_cardlessPresentationController.asyncManager.setSuccessStatus(1, resTransPost);
		if (scope_cardlessPresentationController.asyncManager.areAllservicesDone(scope_cardlessPresentationController.numberOfAsyncForCWTransactions)) {
			scope_cardlessPresentationController.navigateToCardlessLandingScreen();
		}
	};
	CardLess_PresentationController.prototype.fetchCardlessPosTranErrCallback = function(resTransPostErr) {
		scope_cardlessPresentationController.asyncManager.setErrorStatus(1, resTransPostErr);
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if(resTransPostErr["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resTransPostErr);
	};
	CardLess_PresentationController.prototype.processAmount =  function(amount) {
		var formatUtil = applicationManager.getFormatUtilManager();
		amount = formatUtil.formatAmountandAppendCurrencySymbol(amount);
		return amount;
	};
	CardLess_PresentationController.prototype.navigateToCardlessLandingScreen = function(res) {
		var formatUtil=applicationManager.getFormatUtilManager();
		var navMan = applicationManager.getNavigationManager();
		var transactions = {};
		transactions.pendingTransactions = scope_cardlessPresentationController.asyncManager.getData(0);
		transactions.postedTransaction = scope_cardlessPresentationController.asyncManager.getData(1);
      	for (var i = 0; i < transactions.pendingTransactions.length; i++) {
			var trandateobj = formatUtil.getDateObjectfromString(transactions.pendingTransactions[i]["transactionDate"], "YYYY-MM-DD");
			transactions.pendingTransactions[i]["scheduledDate"]= formatUtil.getFormatedDateString(trandateobj, formatUtil.APPLICATION_DATE_FORMAT);
			transactions.pendingTransactions[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(transactions.pendingTransactions[i]["amount"]);
		}
		for (var i = 0; i < transactions.postedTransaction.length; i++) {
			var trandateobj = formatUtil.getDateObjectfromString(transactions.postedTransaction[i]["transactionDate"], "YYYY-MM-DD");
			transactions.postedTransaction[i]["scheduledDate"] = formatUtil.getFormatedDateString(trandateobj,formatUtil.APPLICATION_DATE_FORMAT)
			transactions.postedTransaction[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(transactions.postedTransaction[i]["amount"]);
		}
		navMan.setCustomInfo("frmCardLessHome",transactions);
		scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessHome");
	};
	CardLess_PresentationController.prototype.searchInputStringForContactsList = function(inputString, contactsArray) {
		var transactionObj = applicationManager.getTransactionManager();
		var segmentData=transactionObj.searchInputStringForContactsList(inputString,contactsArray);
		return segmentData;
	};
	CardLess_PresentationController.prototype.createCardlessTransaction =  function() {
		var transactionManager = applicationManager.getTransactionManager();
		transactionManager.createCardlessTransaction(transactionManager.getTransactionObject(),
                                                 scope_cardlessPresentationController.presentationMakeACardlessTransferSuccess,
                                                 scope_cardlessPresentationController.presentationMakeACardlessTransferError);
	};
	CardLess_PresentationController.prototype.presentationMakeACardlessTransferSuccess =  function(createSuccess) {
		var transactionObject = applicationManager.getTransactionManager();
		var txnDetails = scope_cardlessPresentationController.getTransactionObject();
		var navMan = applicationManager.getNavigationManager();
		navMan.setCustomInfo("frmCardLessConfWithdraw", txnDetails);
		var userPrefObj = applicationManager.getUserPreferencesManager();
		var contact = {};
	 	contact.email = userPrefObj.getUserEmail();
		contact.phone = userPrefObj.getUserPhone();
		if (createSuccess.success) {
			scope_cardlessPresentationController.setcardlessTransactionId(createSuccess.referenceId);
			navMan.setCustomInfo("frmCardLessCWCode", {"createResponse": createSuccess, "transnDetails": txnDetails, "userDetails": contact});
			navMan.navigateTo("frmCardLessCWCode");
		} else {
			navMan.setCustomInfo("frmCardLessOverdraft", {"createResponse": createSuccess, "transnDetails": txnDetails, "userDetails": contact});
			navMan.navigateTo("frmCardLessOverdraft");
		}
	};
	CardLess_PresentationController.prototype.presentationMakeACardlessTransferError =  function(createError) {
		kony.print("error in create cardless transaction");
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if(createError["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", createError);
	};
	CardLess_PresentationController.prototype.processAccountsData =  function(data) {
		var forUtility=applicationManager.getFormatUtilManager();
		var accProcessedData = (JSON.parse(JSON.stringify(data)));
		accProcessedData.fromAccountName = data.fromAccountName;
		accProcessedData.fromAccountBalance = forUtility.formatAmountandAppendCurrencySymbol(data.fromAccountBalance);
		accProcessedData.fromBankName = data.fromBankName;
		return accProcessedData;
	};
	CardLess_PresentationController.prototype.setTransactionAmount =  function(amount) {
		var transactionObject = applicationManager.getTransactionManager();
		var navMan = applicationManager.getNavigationManager();
		var transactionObj = scope_cardlessPresentationController.getTransactionObject();
		var bal = transactionObj.fromAccountBalance;
		var accountData = navMan.getCustomInfo("frmCardLessWithdraw");
		accountData.amount = amount;
		navMan.setCustomInfo("frmCardLessWithdraw", accountData);
		if (Number(amount) > Number(bal)) {
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			var controller = applicationManager.getPresentationUtility().getController('frmCardLessWithdraw', true);
			controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.amountGreaterThanAvailBal"));
		} else {
			var confManager = applicationManager.getConfigurationManager();
			var denominations = confManager.getDenominationAmountValues();
			var validateAmount = scope_cardlessPresentationController.validateAmount(denominations, amount);
			if (validateAmount) {
				transactionObject.setTransactionAttribute("amount", amount);
				transactionObject.setTransactionAttribute("transactionType", "Cardless");
				navMan.setCustomInfo("frmCardLessConfWithdraw", transactionObj);
				if (scope_cardlessPresentationController.getcashlessMode() === "Self") {
					scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessConfWithdraw");
				} else {
					scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessSecureCode");
				}
			} else {
				applicationManager.getPresentationUtility().dismissLoadingScreen();
				var controller = applicationManager.getPresentationUtility().getController('frmCardLessWithdraw', true);
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
			} else {
		// Amount is less than denomination value, just move to a lesser denomination
				return scope_cardlessPresentationController.validateAmountSub(denomination, amount, (index - 1));
			}
		}
		return false;
	};
	CardLess_PresentationController.prototype.setCardlessSecurityCode = function(securityCode) {
  		var transactionObject = applicationManager.getTransactionManager();
  		transactionObject.setTransactionAttribute("cashlessSecurityCode", securityCode);
  		scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessConfWithdraw");
	};
	CardLess_PresentationController.prototype.deleteCardlessTransaction =  function(record) {
		applicationManager.getPresentationUtility().showLoadingScreen();
		var transactionManager = applicationManager.getTransactionManager();
		scope_cardlessPresentationController.transactionId=record.transactionId;
		transactionManager.setTransactionAttribute("fromAccountNumber", record.fromAccountNumber);
		transactionManager.deleteTransaction(record, scope_cardlessPresentationController.presentationDeleteACardlessTransferSuccess,
                                             scope_cardlessPresentationController.presentationDeleteACardlessTransferError);
	};
	CardLess_PresentationController.prototype.presentationDeleteACardlessTransferSuccess =  function(res) {
		var navMan = applicationManager.getNavigationManager();
		var transactionManager = applicationManager.getTransactionManager();
		var navigateTo = navMan.getEntryPoint("cancelCardlessTransaction");
		if (navigateTo == "frmAccountDetails") {
			var data = {};
			data.type = "success";
			data.typeOfTransaction = "delete";
			data.res = res;
			navMan.setCustomInfo("frmAccountDetails", data);
			var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
			accountMod.presentationController.fetchAccountTransactions(scope_cardlessPresentationController.getTransactionObject().fromAccountNumber);
		} else {
			scope_cardlessPresentationController.getCardlessPendingAndPostedTransactions();
			//scope_cardlessPresentationController.getCardlessPendingAndPostedTransactionsQRScanner();
			scope_cardlessPresentationController.deletedTransactionFlag=true;
		}
	};
	CardLess_PresentationController.prototype.presentationDeleteACardlessTransferError =  function(error) {
		if(error["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
		else {
			kony.print("error in delete cardless transaction");
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			var navMan = applicationManager.getNavigationManager();
			var transactionManager = applicationManager.getTransactionManager();
			var navigateTo = navMan.getEntryPoint("cancelCardlessTransaction");
          	if (navigateTo == "frmAccountDetails") {
				var data = {};
				data.type = "error";
				data.typeOfTransaction = "delete";
				data.res = error;
				navMan.setCustomInfo("frmAccountDetails", data);
				var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
				accountMod.presentationController.fetchAccountTransactions(scope_cardlessPresentationController.getTransactionObject().fromAccountNumber);
			} else {
				scope_cardlessPresentationController.getCardlessPendingAndPostedTransactions();
				//scope_cardlessPresentationController.getCardlessPendingAndPostedTransactionsQRScanner();
				scope_cardlessPresentationController.deletedTransactionErrorFlag = true;
				scope_cardlessPresentationController.deletedTransactionErrorMessage = error.errorMessage;
            }
		}
	};
	CardLess_PresentationController.prototype.navigateToNewCashWithDrawQRForm = function(data) {
		applicationManager.getPresentationUtility().showLoadingScreen();
		var accountsManager=applicationManager.getAccountManager();
		accountsManager.fetchInternalAccounts(scope_cardlessPresentationController.fetchAccountsQRSuccCallBack,
                                              scope_cardlessPresentationController.fetchAccountsQRErrCallBack);
	};
	CardLess_PresentationController.prototype.fetchAccountsQRSuccCallBack = function(res){
		var navMan = applicationManager.getNavigationManager();
		var accountsManager = applicationManager.getAccountManager();
		var data = accountsManager.getCardLessWithdrawlSupportedAccounts();
		navMan.setCustomInfo("frmCardLessFromQR", {"fromaccounts": data});
		scope_cardlessPresentationController.goToAmountQRForm();
	};
	CardLess_PresentationController.prototype.fetchAccountsQRErrCallBack = function(err) {
		kony.print("error in fetching accounts");
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if(err["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
	};
	CardLess_PresentationController.prototype.goToAmountQRForm = function() {
		var transactionObject = applicationManager.getTransactionManager();
		var navMan = applicationManager.getNavigationManager();
		var txnModel = scope_cardlessPresentationController.getTransactionObject();
		var accId = txnModel.fromAccountNumber;
		var accMan = applicationManager.getAccountManager();
		var preAccData = accMan.getCardlessPreferredAccount();
		if(accId !== null && accId !== "" && accId !== undefined) {
			var txnDetails = transactionObject.getTransactionObject();
			txnDetails = scope_cardlessPresentationController.processAccountsData(txnDetails);
			navMan.setCustomInfo("frmCardLessWithdrawQR", txnDetails);
			navMan.navigateTo("frmCardLessWithdrawQR");
		} else if (preAccData === "") {
			scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessFromQR");
		} else {
			transactionObject.setTransactionAttribute("fromAccountName",preAccData.accountName);
			transactionObject.setTransactionAttribute("fromAccountNumber",preAccData.accountID);
			transactionObject.setTransactionAttribute("fromAccountBalance",preAccData.availableBalance);
			transactionObject.setTransactionAttribute("fromAccountType",preAccData.accountType);
			var configManager = applicationManager.getConfigurationManager();
			var bankName = configManager.getBankName();
			scope_cardlessPresentationController.setFromBankName(bankName);
			var txnDetails=transactionObject.getTransactionObject();
			txnDetails = scope_cardlessPresentationController.processAccountsData(txnDetails);
			navMan.setCustomInfo("frmCardLessWithdrawQR", txnDetails);
			navMan.navigateTo("frmCardLessWithdrawQR");
		}
    };
	CardLess_PresentationController.prototype.showFromQRScannedAccounts = function() {
		var accMan = applicationManager.getAccountManager();
		accMan.fetchInternalAccounts(scope_cardlessPresentationController.showFromQRScannedAccountsPresentationSuccessCallBack,
                                     scope_cardlessPresentationController.showFromQRScannedAccountsPresentationErrorCallBack);
	};
	CardLess_PresentationController.prototype.showFromQRScannedAccountsPresentationSuccessCallBack = function(res) {
		var accNav = applicationManager.getAccountManager();
		var frmacc = accNav.getCardLessWithdrawlSupportedAccounts();
		var navMan = applicationManager.getNavigationManager();
		navMan.setCustomInfo("frmCardLessFromQR", {"fromaccounts": frmacc});
		navMan.navigateTo("frmCardLessFromQR");
	};
	CardLess_PresentationController.prototype.showFromQRScannedAccountsPresentationErrorCallBack = function(error) {
		kony.print("error in showFromQRScannedAccountsPresentationErrorCallBack");
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if(error["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    };
	CardLess_PresentationController.prototype.getCardlessPendingAndPostedTransactionsQRScanner = function() {
		var navMan = applicationManager.getNavigationManager();
		var navToForm = navMan.getEntryPoint("cardlessEntry");
		if (navToForm !== "frmCardLessHomeQR") {
			var navMan = applicationManager.getNavigationManager();
			scope_cardlessPresentationController.qrSuccessFlag = true;
			var txnId = scope_cardlessPresentationController.getCardlessTransactionId();
			var transactionObject = applicationManager.getTransactionManager();
			transactionObject.setTransactionprimaryAttribute({"transactionId": txnId});
			var toAccountID = transactionObject.transferObject.fromAccountNumber;
			var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
			accountMod.presentationController.fetchAccountTransactions(toAccountID);
		} else {
			applicationManager.getPresentationUtility().showLoadingScreen();
			scope_cardlessPresentationController.qrSuccessFlag = false;
			var navMan = applicationManager.getNavigationManager();
			scope_cardlessPresentationController.asyncManager.initiateAsyncProcess(scope_cardlessPresentationController.numberOfAsyncForCWQRTransactions);
			var transactionObj = applicationManager.getTransactionManager();
			transactionObj.fetchCardlessPendingTransactions(scope_cardlessPresentationController.fetchCardlessPenTranPresQRScannerSucCallback,
                                                            scope_cardlessPresentationController.fetchCardlessPenTranPreQRScannerErrCallback);
			transactionObj.fetchCardlessPostedTransactions(scope_cardlessPresentationController.fetchCardlessPosTranPresQRScannerSucCallback,
                                                           scope_cardlessPresentationController.fetchCardlessPosTranQRScannerErrCallback);
		}
	};
	CardLess_PresentationController.prototype.fetchCardlessPenTranPresQRScannerSucCallback = function(resTransPend){
		scope_cardlessPresentationController.asyncManager.setSuccessStatus(0, resTransPend);
		if (scope_cardlessPresentationController.asyncManager.areAllservicesDone(scope_cardlessPresentationController.numberOfAsyncForCWQRTransactions)) {
			scope_cardlessPresentationController.navigateToQRCardlessLandingScreen();
		}
	};
	CardLess_PresentationController.prototype.fetchCardlessPenTranPreQRScannerErrCallback = function(err) {
		scope_cardlessPresentationController.asyncManager.setErrorStatus(0, err);
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if (err["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
	};
	CardLess_PresentationController.prototype.fetchCardlessPosTranPresQRScannerSucCallback = function(resTransPost) {
		scope_cardlessPresentationController.asyncManager.setSuccessStatus(1, resTransPost);
		if (scope_cardlessPresentationController.asyncManager.areAllservicesDone(scope_cardlessPresentationController.numberOfAsyncForCWQRTransactions)) {
			scope_cardlessPresentationController.navigateToQRCardlessLandingScreen();
		}
	};
	CardLess_PresentationController.prototype.fetchCardlessPosTranQRScannerErrCallback = function(err) {
		scope_cardlessPresentationController.asyncManager.setErrorStatus(1, err);
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if(err["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
	};
	CardLess_PresentationController.prototype.navigateToQRCardlessLandingScreen = function(res) {
		var formatUtil = applicationManager.getFormatUtilManager();
		var navMan = applicationManager.getNavigationManager();
		var transactions = {};
		transactions.pendingTransactions = scope_cardlessPresentationController.asyncManager.getData(0);
		transactions.postedTransaction = scope_cardlessPresentationController.asyncManager.getData(1);
		for (var i = 0; i < transactions.pendingTransactions.length; i++) {
			var trandateobj = formatUtil.getDateObjectfromString(transactions.pendingTransactions[i]["transactionDate"], "YYYY-MM-DD");
			transactions.pendingTransactions[i]["scheduledDate"]= formatUtil.getFormatedDateString(trandateobj,formatUtil.APPLICATION_DATE_FORMAT);
			transactions.pendingTransactions[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(transactions.pendingTransactions[i]["amount"]);
		}
		for (var i = 0; i < transactions.postedTransaction.length; i++) {
			var trandateobj = formatUtil.getDateObjectfromString(transactions.postedTransaction[i]["transactionDate"], "YYYY-MM-DD");
			transactions.postedTransaction[i]["scheduledDate"]= formatUtil.getFormatedDateString(trandateobj,formatUtil.APPLICATION_DATE_FORMAT)
			transactions.postedTransaction[i]["amount"] = formatUtil.formatAmountandAppendCurrencySymbol(transactions.postedTransaction[i]["amount"]);
		}
		navMan.setCustomInfo("frmCardLessHomeQR", transactions);
		//scope_cardlessPresentationController.setTransactionId();
		scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessHomeQR");
	};
	CardLess_PresentationController.prototype.createCardlessQRTransaction =  function() {
		var transactionManager = applicationManager.getTransactionManager();
		transactionManager.createCardlessTransaction(transactionManager.getTransactionObject(), scope_cardlessPresentationController.presentationMakeACardlessQRTransferSuccess,
                                                     scope_cardlessPresentationController.presentationMakeACardlessQRTransferError);
	};
	CardLess_PresentationController.prototype.presentationMakeACardlessQRTransferSuccess = function(createSuccess) {
		var transactionObject = applicationManager.getTransactionManager();
		var txnDetails = scope_cardlessPresentationController.getTransactionObject();
		var navMan = applicationManager.getNavigationManager();
		navMan.setCustomInfo("frmCardLessConfWithdrawQR", txnDetails);
		if (createSuccess.success) {
			scope_cardlessPresentationController.setcardlessTransactionId(createSuccess.referenceId);
			navMan.setCustomInfo("frmCardLessQRCode",{"createResponse": createSuccess, "transnDetails": txnDetails});
			navMan.navigateTo("frmCardLessQRCode");
		} else {
			navMan.setCustomInfo("frmCardLessOverdraftQR", {"createResponse": createSuccess, "transnDetails": txnDetails});
			navMan.navigateTo("frmCardLessOverDraftQRCode");
		}
	};
	CardLess_PresentationController.prototype.presentationMakeACardlessQRTransferError = function(createError) {
		kony.print("error in create cardless qr transaction");
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if (createError["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", createError);
	};
	CardLess_PresentationController.prototype.setQRTransactionAmount = function(amount) {
		var transactionObject = applicationManager.getTransactionManager();
		transactionObject.setTransactionAttribute("cashlessMode", "Self");
		var navMan = applicationManager.getNavigationManager();
		var transactionObj = scope_cardlessPresentationController.getTransactionObject();
		var bal = transactionObj.fromAccountBalance;
		var accountData = navMan.getCustomInfo("frmCardLessWithdrawQR");
		accountData.amount = amount;
		navMan.setCustomInfo("frmCardLessWithdrawQR", accountData);
		if (Number(amount) > Number(bal)) {
  			applicationManager.getPresentationUtility().dismissLoadingScreen();
  			var controller = applicationManager.getPresentationUtility().getController('frmCardLessWithdrawQR', true);
  			controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.amountGreaterThanAvailBal"));
		} else {
			var confManager = applicationManager.getConfigurationManager();
			var denominations = confManager.getDenominationAmountValues();
			var validateAmount = scope_cardlessPresentationController.validateAmount(denominations, amount);
			if (validateAmount) {
				transactionObject.setTransactionAttribute("amount", amount);
				transactionObject.setTransactionAttribute("transactionType", "Cardless");
				var txnDetails = transactionObject.getTransactionObject();
				navMan.setCustomInfo("frmCardLessConfWithdrawQR", txnDetails);
				scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessConfWithdrawQR");
			} else {
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
			} else {
		// Amount is less than denomination value, just move to a lesser denomination
				return scope_cardlessPresentationController.validateAmountSub(denomination, amount, (index - 1));
			}
		}
		return false;
	};
	CardLess_PresentationController.prototype.invokeQRCodeFunctionality = function() {
		var deviceInfo = kony.os.deviceInfo();
		var name = deviceInfo.name;
		if (name === "android") {
			scope_cardlessPresentationController.barcodeScannerAndroid();
		} else {
			scope_cardlessPresentationController.barcodeScannerIPhone();
		}
	};
  	CardLess_PresentationController.prototype.barcodeScannerAndroid = function(){
		var barcodeCaptureCallback = function (barcodeDataDummmy, barcodeData) {
			try {
				kony.print(barcodeData);
				var response = JSON.parse(barcodeData);
				if (response) {
					var transactionID = response.id;
					var timeStamp = response.timeStamp;
					var uniqueIdentifier = response.AtmId;
					var qrCodeDetails = {id: transactionID, timestamp: timeStamp, AtmId: uniqueIdentifier};
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
				if (response) {
					var transactionID = response.id;
					var timeStamp = response.timeStamp;
					var uniqueIdentifier = response.AtmId;
					var qrCodeDetails = {id: transactionID, timestamp: timeStamp, AtmId: uniqueIdentifier};
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
	CardLess_PresentationController.prototype.forCardLessTransaction = function(qrCodeDetails){
		var QRCodeManager = applicationManager.getQRCodeManager();
		QRCodeManager.createCardlessTransactionQRCode(qrCodeDetails,scope_cardlessPresentationController.presentationTransferSuccessCallback,scope_cardlessPresentationController.presentationTransferErrorCallback);
	};
	CardLess_PresentationController.prototype.presentationTransferSuccessCallback =  function(createSuccess) {
		var transactionObject = applicationManager.getTransactionManager();
		scope_cardlessPresentationController.setcardlessTransactionId(createSuccess.id);
		scope_cardlessPresentationController.getCardlessPendingAndPostedTransactionsQRScanner();
	};
	CardLess_PresentationController.prototype.presentationTransferErrorCallback =  function(error) {
		kony.print("error in create cardless transaction");
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if (error["isServerUnreachable"])
			applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
	};
	CardLess_PresentationController.prototype.getTransactionId = function() {
		var transactionID = scope_cardlessPresentationController.getCardlessTransactionId();
		return transactionID;
	};
	CardLess_PresentationController.prototype.setTransactionId = function() {
		scope_cardlessPresentationController.setcardlessTransactionId("");
    };
	CardLess_PresentationController.prototype.clearAmount = function() {
		var transactionObject = applicationManager.getTransactionManager();
		transactionObject.setTransactionAttribute("amount","");
	};
	CardLess_PresentationController.prototype.clearTransactionObject = function() {
		var transactionObj = applicationManager.getTransactionManager();
		transactionObj.clearTransferObject();
		scope_cardlessPresentationController.clearBuilderNonGeneratedAttributes();
	};
	CardLess_PresentationController.prototype.getTransactionObject = function() {
		var transactionObj = applicationManager.getTransactionManager();
		return transactionObj.getTransactionObject();
	};
	CardLess_PresentationController.prototype.setFromAccountDetails = function(fromAccountDetails) {
		var transactionObj = applicationManager.getTransactionManager();
		transactionObj.setTransactionAttribute("fromAccountName", fromAccountDetails.accountName);
		transactionObj.setTransactionAttribute("fromAccountNumber", fromAccountDetails.accountID);
		transactionObj.setTransactionAttribute("fromAccountType", fromAccountDetails.accountType);
		transactionObj.setTransactionAttribute("fromAccountBalance", fromAccountDetails.amount);
		var configManager = applicationManager.getConfigurationManager();
		var bankName = configManager.getBankName();
		scope_cardlessPresentationController.setFromBankName(bankName);
	};
	CardLess_PresentationController.prototype.setTransactionsNotes = function(description) {
		var transactionObj = applicationManager.getTransactionManager();
		transactionObj.setTransactionAttribute("transactionsNotes", description);
	};
	CardLess_PresentationController.prototype.setOverDraftFlag = function(value) {
		var transactionObj = applicationManager.getTransactionManager();
		transactionObj.setTransactionAttribute("overdraft", value);
	};
	CardLess_PresentationController.prototype.setScheduledDate = function(date) {
		var transactionObj = applicationManager.getTransactionManager();
		transactionObj.setTransactionAttribute("scheduledDate", date);
    };
  	return CardLess_PresentationController;
});