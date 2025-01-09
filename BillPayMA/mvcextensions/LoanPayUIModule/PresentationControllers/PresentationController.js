var arridglobal = {};
var botherror = {};
var billcount = 1;
define(['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
    function LoanPay_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
        var viewModel = [];

        //Managers
        this.accountManager = applicationManager.getAccountManager();
        this.formatUtilManager = applicationManager.getFormatUtilManager();
        this.loansManager = applicationManager.getLoansManager();
        this.navigationManager = applicationManager.getNavigationManager();
        this.recipientsManager = applicationManager.getRecipientsManager();
        this.termsAndConditionsManager = applicationManager.getTermsAndConditionsManager();
        this.transactionManager = applicationManager.getTransactionManager();
    }
    inheritsFrom(LoanPay_PresentationController, kony.mvc.Presentation.BasePresenter);
    LoanPay_PresentationController.prototype.initializePresentationController = function() {};
    LoanPay_PresentationController.prototype.presentLoanPay = function(data) {
        if (kony.application.getCurrentForm().id !== "frmPayDueAmount") {
            // const navObj = { 
            //     context: this
            // }; 
            // kony.mvc.getNavigationManager().navigate(navObj);
            const navObj = {
                appName: 'BillPayMA',
                friendlyName: 'frmPayDueAmount'
            };
            this.navigationManager.navigateTo(navObj);
        }
        this.navigationManager.updateForm(data, 'frmPayDueAmount');
    };

    LoanPay_PresentationController.prototype.payDueDetails = function(data, action) {
        var self = this;
        self.showProgressBar();
        this.accountManager.fetchAccountDetails(data, this.paySuccessDetails.bind(this, data, action), this.payErrorDetails.bind(this, data));
    };
    LoanPay_PresentationController.prototype.paySuccessDetails = function(data, action, response) {
        var self = this;
        self.showProgressBar();
        if (action === "PayDue") {
            this.presentLoanPay({
                "payDueDetails": response
            });
        } else if (action === "toAccountDetails") {
            this.presentLoanPay({
                "accountDetails": response
            });
        } else {
            this.presentLoanPay({
                "accountBalance": response
            });
        }
    };
    LoanPay_PresentationController.prototype.payErrorDetails = function(data, response) {
        this.presentLoanPay({
            "serverError": response.errorMessage
        });
        this.hideProgressBar();
    };

    //SimulationCallBack
    LoanPay_PresentationController.prototype.simulation = function(data) {
        billcount = 1;
        var self = this;
        self.showProgressBar();
        this.loansManager.simulationCall(data, this.simulationSuccessCallback.bind(this, data), this.simulationErrorCallback.bind(this, data));
    };
    //SimulationSuccessCallBack
    LoanPay_PresentationController.prototype.simulationSuccessCallback = function(data, response) {
        var self = this;
        self.showProgressBar();
        arridglobal = {
            "arrangementId": data.arrangementId,
            "billType": "PAYOFF",
            "paymentDate": data.effectiveDate
        };
        kony.timer.schedule("fetchamounttimer", this.getBillAmount.bind(this), 15, false);
    };
    //SimulationErrorCallBack
    LoanPay_PresentationController.prototype.getBillAmount = function() {
        var self = this;
        self.showProgressBar();
        this.loansManager.fetchLoanPayoffAmount(arridglobal, this.BillSuccessCallback.bind(this), this.BillErrorCallback.bind(this));
    };
    LoanPay_PresentationController.prototype.simulationErrorCallback = function(data, params) {
        var self = this;
        self.showProgressBar();
        botherror = {};
        arridglobal = {
            "arrangementId": data.arrangementId,
            "billType": "PAYOFF",
            "paymentDate": data.effectiveDate
        };
        this.getBillAmount();
        botherror.errorMessage = params.errorMessage;
    };
    //BillAmountSuccessCallBack
    LoanPay_PresentationController.prototype.BillSuccessCallback = function(response) {
        var self = this;
        self.showProgressBar();
        this.presentLoanPay({
            "properties": response
        });
    };
    //BillAmountErrorCallBack
    LoanPay_PresentationController.prototype.BillErrorCallback = function(response) {
        var self = this;
        self.showProgressBar();
        if (billcount <= 2) {
            billcount++;
            this.getBillAmount();
        } else {
            var obj;
            if (response.serverErrorRes.backendError != null || response.serverErrorRes.backendError != undefined)
                obj = JSON.parse(response.serverErrorRes.backendError);
            else
                obj = response.serverErrorRes.dbpErrMsg;
            if (botherror.errorMessage) {
                this.presentLoanPay({
                    "fetchAmountError": botherror.errorMessage + " & " + obj.message
                });
            } else {
                this.presentLoanPay({
                    "fetchAmountError": obj.message
                });
            }
        }
    };
    //Transacte Date
    LoanPay_PresentationController.prototype.getTBankDate = function(callback) {
        this.recipientsManager.fetchBankDate({}, this.getBankDateSuccess.bind(this, callback), this.getBankDateFailure.bind(this, callback));
    };
    LoanPay_PresentationController.prototype.getBankDateSuccess = function(callback, response) {
        this.bankDate = response.date[0];
        this.presentLoanPay({
            'bankDate': response.date[0]
        });
    };
    LoanPay_PresentationController.prototype.getBankDateFailure = function(callback, response) {
        this.presentLoanPay({
            'bankDate': true
        });
    };
    //TermsandConditionsCall
    LoanPay_PresentationController.prototype.termsandconditions = function() {
        var self = this;
        self.showProgressBar();
        const params = {
            "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
            "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.BillPay_TnC
        };
        this.termsAndConditionsManager.fetchTermsAndConditionsPostLogin(params, self.getTnCSuccess.bind(self), self.getTnCSuccess.bind(self));
    };
    LoanPay_PresentationController.prototype.getTnCSuccess = function(termsAndConditionContent) {
        if (termsAndConditionContent) {
            viewModel = termsAndConditionContent;
        }
        this.presentLoanPay({
            transferConfirm: viewModel
        });
    };
    LoanPay_PresentationController.prototype.getTnCOnFailure = function(response) {

    };
    /**
     * To get frontend date string
     * @member LoanPay_PresentationController
     * @param {Date} dateString
     * @returns {Date} frontend date
     * @throws {void} - None
     */
    LoanPay_PresentationController.prototype.getFormattedDateString = function(dateString) {
        return CommonUtilities.getFrontendDateString(dateString);
    };
    /**
     * To get backend date string
     * @member LoanPay_PresentationController
     * @param {Date} dateString
     * @param {String} dateFormat
     * @returns {Date} backend date (yyyy-mm-dd) format
     * @throws {void} - None
     */
    LoanPay_PresentationController.prototype.getBackendDate = function(dateString) {
        return CommonUtilities.getBackendDateFormat(dateString);
    };
    /**
     * Entry Function for Loan Due
     * @member LoanPay_PresentationController
     * @param {Object} response contains account details
     * @returns {void} - None
     * @throws {void} - None
     */
    LoanPay_PresentationController.prototype.navigateToLoanDue = function(response) {
        var self = this;
        self.showProgressBar();
        if (response)
            viewModel = response;
        this.presentLoanPay({
            loanDue: viewModel
        });
    };
    /**
     * Entry Function for Loan Pay Off
     * @member LoanPay_PresentationController
     * @param {Object} response contains account details
     * @returns {void} - None
     * @throws {void} - None
     */
    LoanPay_PresentationController.prototype.navigateToLoanPay = function(response) {
        var self = this;
        self.showProgressBar();
        if (response)
            viewModel = response;
        this.presentLoanPay({
            loanPayoff: viewModel
        });
    };
    LoanPay_PresentationController.prototype.showView = function(frm, data) {
        this.presentUserInterface(frm, data);
    };
    /**
     * Function to Show Progress Bar
     * @member LoanPay_PresentationController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    LoanPay_PresentationController.prototype.showProgressBar = function() {
        var self = this;
        self.presentLoanPay({
            "ProgressBar": {
                show: true
            }
        });
    };
    /**
     * Function to Hide Progress Bar
     * @member LoanPay_PresentationController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    LoanPay_PresentationController.prototype.hideProgressBar = function() {
        var self = this;
        self.presentLoanPay({
            "ProgressBar": {
                show: false
            }
        });
    };
    /**
     * Function to create transfer for Loan Pay Off and Loan Pay Due Amount
     * @member LoanPay_PresentationController
     * @param {Object} data
     * @param {String} context stores context
     * @returns {void} - None
     * @throws {void} - None
     */
    LoanPay_PresentationController.prototype.payLoanOff = function(data, context) {
        var self = this;
        self.showProgressBar();
        this.transactionManager.createTransferToOwnAccounts(data, this.onSuccessPayLoanOff.bind(this, data, context), this.onFailurePayLoanOff.bind(this));
    };
    /**
     * Method called as success callback for PayLoanOff
     * @param {Object} response - response from service for PayLoanOff
     */
    LoanPay_PresentationController.prototype.onSuccessPayLoanOff = function(data, context, response) {
        this.hideProgressBar();
        var responseData = {
            "data": data,
            "referenceId": response.referenceId
        };
        if (context === "payOtherAmount") {
            this.presentLoanPay({
                payOtherAmount: responseData
            });
        } else if (context === "payCompleteDue") {
            this.presentLoanPay({
                payCompleteDue: responseData
            });
        } else if (context === "payCompleteMonthlyDue") {
            this.presentLoanPay({
                payCompleteMonthlyDue: responseData
            });
        }
    };
    /**
     * Method called as failure calback for PayLoanOff
     * @param {Object} response - response from service for PayLoanOff
     */
    LoanPay_PresentationController.prototype.onFailurePayLoanOff = function(response) {
        this.presentLoanPay({
            "serverError": response.errorMessage
        });
        this.hideProgressBar();
    };
    /**
     * Function to Navigate to Accounts module
     * @member LoanPay_PresentationController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    LoanPay_PresentationController.prototype.backToAccount = function() {
        applicationManager.getModulesPresentationController({ appName: 'HomepageMA', moduleName: 'AccountsUIModule' }).showAccountsDashboard();
    };
    /**
     * Function to fetch updated account object
     * @member LoanPay_PresentationController
     * @param {Object} accountID
     * @param {String} context stores context
     * @returns {void} - None
     * @throws {void} - None
     */
    LoanPay_PresentationController.prototype.fetchUpdatedAccountDetails = function(accountID, context) {
        this.loanaccount = accountID;
        var self = this;
        var param = {
            "accountID": accountID
        };
        this.accountManager.fetchInternalAccountByID(param, this.onSuccessFetchUpdatedAccountDetails.bind(this, context), this.onFailureFetchUpdatedAccountDetails.bind(this));
    };
    /**
     * Method called as success callback for FetchUpdatedAccountDetails
     * @param {Object} response - response from service for FetchUpdatedAccountDetails
     */
    LoanPay_PresentationController.prototype.onSuccessFetchUpdatedAccountDetails = function(context, response) {
        if (context === "newAccountSelection") {
            this.presentLoanPay({
                newAccountSelection: response
            });
        } else if (context === "navigationToAccountDetails") {
            applicationManager.getModulesPresentationController({ 'appName': 'HomepageMA', 'moduleName': 'AccountsUIModule' }).showAccountDetails(response[0]);
        } else if (context === "validateData") {
            this.presentLoanPay({
                validateData: response
            });
        } else if (context === "updateFromAccount") {
            this.presentLoanPay({
                updateFromAccount: response
            });
        } else if (context === "updateToAccount") {
            this.presentLoanPay({
                updateToAccount: response
            });
        } else if (context === "populateAccountData") {
            this.presentLoanPay({
                populateAccountData: response
            });
        } else if (context === "navigationToAccountDetailsfromLoan") {
            for (var i = 0; i < response.length; i++) {
                if (response[i].accountID == this.loanaccount) {
                    applicationManager.getModulesPresentationController({ 'appName': 'ArrangementsMA', 'moduleName': 'AccountsUIModule' }).showAccountDetails(response[i]);
                }
            }
        }
    };
    /**
     * Method called as failure calback for FetchUpdatedAccountDetails
     * @param {Object} response - response from service for FetchUpdatedAccountDetails
     */
    LoanPay_PresentationController.prototype.onFailureFetchUpdatedAccountDetails = function(response) {
        this.hideProgressBar();
        CommonUtilities.showServerDownScreen();
    };
    LoanPay_PresentationController.prototype.fetchCheckingAccounts = function() {
        this.accountManager.fetchInternalAccounts(this.onSuccessFetchCheckingAccounts.bind(this), this.onFailureFetchCheckingAccounts.bind(this));
    };
    /**
     * Method called as success callback for FetchCheckingAccounts
     * @param {Object} response - response from service for FetchCheckingAccounts
     */
    LoanPay_PresentationController.prototype.onSuccessFetchCheckingAccounts = function(accounts) {
        let filteredaccounts =  accounts.filter(account => {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
          }) 
        this.presentLoanPay({
            "loadAccounts": filteredaccounts
        });
    };
    /**
     * Method called as failure calback for FetchCheckingAccounts
     * @param {Object} response - response from service for FetchCheckingAccounts
     */
    LoanPay_PresentationController.prototype.onFailureFetchCheckingAccounts = function(response) {
        this.hideProgressBar();
        CommonUtilities.showServerDownScreen();
    };
    LoanPay_PresentationController.prototype.convertDateFormat = function (dateString) {
        return this.formatUtilManager.getDateObjectfromString(dateString, "dd/mm/yyyy").format("m/d/Y");
    };
    LoanPay_PresentationController.prototype.getTypeFromTransferData = function (transferData) {
        if (transferData.toAccount.accountID) {
            return "OWN_INTERNAL_ACCOUNTS"
        }
        if (transferData.toAccount.isInternationalAccount === "true") {
            return "INTERNATIONAL_ACCOUNT"
        }
        if (transferData.toAccount.isSameBankAccount === "true") {
            return "OTHER_INTERNAL_MEMBER"
        }
        return "OTHER_EXTERNAL_ACCOUNT";
    };
    LoanPay_PresentationController.prototype.createTransaction = function (transferData, validate) {
        var currentDate = this.bankDate && this.bankDate.currentWorkingDate ? new Date(this.bankDate.currentWorkingDate) : new Date();
        var sendonDateObject = this.formatUtilManager.getDateObjectfromString(transferData.sendOnDate, "dd/mm/yyyy");
        if(sendonDateObject){
            transferData.isRecurring = (transferData.frequency !== "Once" || sendonDateObject.toDateString() !== currentDate.toDateString()) ? true : false;
        }
        this.transferData = transferData;
        var mfaManager = applicationManager.getMFAManager();
        mfaManager.setMFAOperationType("CREATE");
        if (transferData.serviceName) {
            mfaManager.setServiceId(transferData.serviceName);
        } else {
            var displayName = applicationManager.getPresentationUtility().MFA.getDisplayNameForTransfer(this.getTypeFromTransferData(transferData));
            applicationManager.getPresentationUtility().MFA.getServiceIdBasedOnDisplayName(displayName);
        }
        var mfaParams = {
            serviceName: mfaManager.getServiceId(),
        };
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("deletedDocuments", transferData.deletedDocuments);
        transactionManager.setTransactionAttribute("uploadedattachments", transferData.supportedDocumentObjects);
        transactionManager.setTransactionAttribute("fromAccountNumber", transferData.fromAccount.accountID);
        transactionManager.setTransactionAttribute("amount", transferData.amount);
        transactionManager.setTransactionAttribute("transactionsNotes", transferData.paymentReference);
        transactionManager.setTransactionAttribute("ExternalAccountNumber", transferData.accountNumber);
        if(sendonDateObject){
            transactionManager.setTransactionAttribute("isScheduled", (transferData.frequency !== "Once" || sendonDateObject.toDateString() !== currentDate.toDateString()) ? "1" : "0");
            transactionManager.setTransactionAttribute("frequencyStartDate", sendonDateObject.format("m/d/Y"));
            transactionManager.setTransactionAttribute("scheduledDate", sendonDateObject.format("m/d/Y"));
       }
        if (transferData.isOwnAccount) {
            transactionManager.setTransactionAttribute("toAccountNumber", transferData.toAccount.accountID);
            transactionManager.setTransactionAttribute("transactionType", "InternalTransfer");
        } else {
            transactionManager.setTransactionAttribute("transactionType", "ExternalTransfer");
            transactionManager.setTransactionAttribute("toAccountNumber", transferData.toAccount.accountNumber);
        }
        transactionManager.setTransactionAttribute("transactionCurrency", transferData.currency);
        transactionManager.setTransactionAttribute("toAccountCurrency", transferData.toAccount.currencyCode ? transferData.toAccount.currencyCode : transferData.fromAccount.currencyCode);
        transactionManager.setTransactionAttribute("frequencyType", transferData.frequency);
        transactionManager.setTransactionAttribute("paymentType", transferData.paymentMedium === kony.i18n.getLocalizedString("i18n.TransfersEur.InstantPayment") ? "" : "SEPA")
        transactionManager.setTransactionAttribute("frequencyEndDate", transferData.frequency !== "Once" ? this.convertDateFormat(transferData.endOnDate) : null);
        transactionManager.setTransactionAttribute("numberOfRecurrences", null);
        transactionManager.setTransactionAttribute("fromAccountCurrency", transferData.fromAccount.currencyCode);
        transactionManager.setTransactionAttribute("fromAccountCurrency", transferData.fromAccount.currencyCode);
        transactionManager.setTransactionAttribute("swiftCode", transferData.swiftCode);
        transactionManager.setTransactionAttribute("paidBy", transferData.isPaidBy);
        transactionManager.setTransactionAttribute("serviceName", transferData.serviceName);
        transactionManager.setTransactionAttribute("transactionAmount", transferData.transactionAmount);
        transactionManager.setTransactionAttribute("serviceCharge", transferData.serviceCharge);
        transactionManager.setTransactionAttribute("beneficiaryName", transferData.toAccount.beneficiaryName);
        transactionManager.setTransactionAttribute("beneficiaryNickname", transferData.toAccount.nickName);
        transactionManager.setTransactionAttribute("MFAAttributes", mfaParams);
        if (validate) {
            transactionManager.setTransactionAttribute("transactionId", "");
            transactionManager.setTransactionAttribute("chargesList", "");
            transactionManager.setTransactionAttribute("exchangeRate", "");
            transactionManager.setTransactionAttribute("totalAmount", "");
            transactionManager.setTransactionAttribute("charges", "");
            transactionManager.setTransactionAttribute("creditValueDate", "");
        }
        this.showProgressBar();
        this.createTransferBasedOnType(transactionManager.getTransactionObject(), transferData, validate);
    };
    LoanPay_PresentationController.prototype.createTransferBasedOnType = function (data, transferData, validate) {
        var mfaManager = applicationManager.getMFAManager();
        var transactionManager = applicationManager.getTransactionManager();
        var successCallBack = validate ? this.validateCallbackSuccess.bind(this, transferData) : this.createTransferSuccessCallback.bind(this);
        var errorCallback = validate ? this.validateCallbackError.bind(this, transferData) : this.createTransferErrorCallback.bind(this, transferData);
        var transformedData = this.transformData(data);
        if (validate) {
            transformedData.validate = "true";
            transformedData.uploadedattachments = "";
        }
        if (transferData.oneTimePayment) {
            transactionManager.createOneTimeTransfer(transformedData, successCallBack, errorCallback);
            return;
        }
        if (transferData.isOwnAccount && transferData.toAccount.accountType === "CreditCard") {
            transactionManager.createCreditCardTransaction(transformedData, successCallBack, errorCallback);
            return;
        }
        if (transferData.toAccount.accountID) {
            mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
            transactionManager.createTransferToOwnAccounts(transformedData, successCallBack, errorCallback)
        } else {
            if (transferData.toAccount.isInternationalAccount === "true") {
                mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE");
                transactionManager.createInternationalAccFundTransfer(transformedData, successCallBack, errorCallback)
            } else if (transferData.toAccount.isSameBankAccount === "true") {
                mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_CREATE");
                transactionManager.createIntraBankAccFundTransfer(transformedData, successCallBack, errorCallback)
            } else {
                mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE");
                transactionManager.createInterBankAccFundTransfer(transformedData, successCallBack, errorCallback)
            }
        }
    };
    LoanPay_PresentationController.prototype.transformData = function (data) {
        return {
            "amount": (data.amount !== null ? data.amount : ""),
            "createWithPaymentId": data.createWithPaymentId,
            "transactionId": (data.transactionId !== null ? data.transactionId : ""),
            "frequencyType": (data.frequencyType !== null ? data.frequencyType : ""),
            "fromAccountNumber": (data.fromAccountNumber !== null ? data.fromAccountNumber : ""),
            "isScheduled": (data.isScheduled !== null ? data.isScheduled : ""),
            "frequencyStartDate": (data.frequencyStartDate !== null ? data.frequencyStartDate : ""),
            "frequencyEndDate": (data.frequencyEndDate !== null ? data.frequencyEndDate : ""),
            "scheduledDate": (data.scheduledDate !== null ? data.scheduledDate : ""),
            "toAccountNumber": (data.toAccountNumber !== null ? data.toAccountNumber : ""),
            "paymentType": (data.paymentType !== null ? data.paymentType : ""),
            "paidBy": (data.paidBy !== null ? data.paidBy : ""),
            "swiftCode": (data.swiftCode !== null ? data.swiftCode : ""),
            "serviceName": (data.serviceName !== null ? data.serviceName : ""),
            "beneficiaryName": (data.beneficiaryName !== null ? data.beneficiaryName : ""),
            "beneficiaryNickname": (data.beneficiaryNickname !== null ? data.beneficiaryNickname : ""),
            "transactionsNotes": (data.transactionsNotes !== null ? data.transactionsNotes : ""),
            "transactionType": (data.transactionType !== null ? data.transactionType : ""),
            "transactionCurrency": (data.transactionCurrency !== null ? data.transactionCurrency : ""),
            "fromAccountCurrency": (data.fromAccountCurrency !== null ? data.fromAccountCurrency : ""),
            "toAccountCurrency": (data.toAccountCurrency !== null ? data.toAccountCurrency : ""),
            "numberOfRecurrences": (data.numberOfRecurrences !== null ? data.numberOfRecurrences : ""),
            "ExternalAccountNumber": (data.ExternalAccountNumber !== null ? data.ExternalAccountNumber : ""),
            "transactionFlow": (data.transactionFlow !== null ? data.transactionFlow : ""),
            "uploadedattachments": (data.uploadedattachments !== null ? data.uploadedattachments : ""),
            "deletedDocuments": (data.deletedDocuments !== null ? data.deletedDocuments : ""),
            "transactionAmount": (data.transactionAmount !== null ? data.transactionAmount : ""),
            "serviceCharge": (data.serviceCharge !== null ? data.serviceCharge : ""),
            "charges": (data.charges !== null ? data.charges : ""),
            "totalAmount": (data.totalAmount !== null ? data.totalAmount : ""),
            "creditValueDate": (data.creditValueDate !== null ? data.creditValueDate : "")
        }
    };
    LoanPay_PresentationController.prototype.validateCallbackSuccess = function (transferData, response) {
        this.hideProgressBar();
        //parse charges from response
        var transactionManager = applicationManager.getTransactionManager();
        var charges = [];
        if (response.charges) {
            try {
                charges = JSON.parse(response.charges);
                for (var i = 0; i < charges.length; i++) {
                    charges[i].amountCurrency = CommonUtilities.formatCurrencyWithCommas(charges[i].chargeAmount, false, charges[i].chargeCurrency);
                }
                transactionManager.setTransactionAttribute("chargesList", charges);
            } catch (e) { }
        }
        transactionManager.setTransactionAttribute("exchangeRate", response.exchangeRate);
        transactionManager.setTransactionAttribute("totalAmount", response.totalAmount);
        transactionManager.setTransactionAttribute("transactionId", response.referenceId);
        transactionManager.setTransactionAttribute("createWithPaymentId", "true");
        transactionManager.setTransactionAttribute("charges", response.charges);
        transactionManager.setTransactionAttribute("creditValueDate", response.creditValueDate);
        // verify for overrides
        response.warn = true;
        if (!response.overrideList) {
            this.presentLoanPay({
                validationSuccess: true,
                confirmDetails: transferData,
                chargesList: charges,
                exchangeRate: response.exchangeRate,
                totalAmount: response.totalAmount,
                creditValueDate: response.creditValueDate,
                details: response
            });
            return;
        }
        try {
            var overrides = JSON.parse(response.overrideList);
            var cutoffOverride = overrides.includes("cutOfTimeBreached");
            var productOverride = overrides.includes("changeProduct");
            if (cutoffOverride) {
                this.presentLoanPay({
                    validationFailed: {
                        cutoffOverride: cutoffOverride,
                        productOverride: productOverride
                    }
                });
            } else {
                transferData.isInsufficientFundsTransfer = overrides.includes("overdraft");
                this.presentLoanPay({
                    validationSuccess: true,
                    confirmDetails: transferData,
                    chargesList: charges,
                    exchangeRate: response.exchangeRate,
                    totalAmount: response.totalAmount,
                    creditValueDate: response.creditValueDate,
                    details: response

                });
            }
        } catch (e) {
            this.presentLoanPay({
                validationSuccess: true,
                confirmDetails: transferData,
                chargesList: charges,
                exchangeRate: response.exchangeRate,
                totalAmount: response.totalAmount,
                creditValueDate: response.creditValueDate
            });
        }
    };
    LoanPay_PresentationController.prototype.validateCallbackError = function (transferData, response) {
        this.hideProgressBar();
        this.presentLoanPay({
            "serverError": response.serverErrorRes
        });
    };
    LoanPay_PresentationController.prototype.createTransferSuccessCallback = function (response) {
        this.transferData.failedUploads = [];
        this.transferData.successfulUploads = [];
        if (response.successfulUploads) {
            var successfulUploadsArray = response.successfulUploads.split(",");
            this.transferData.successfulUploads = successfulUploadsArray;
        }
        if (response.failedUploads) {
            var failedUploadsArray = response.failedUploads.split(",");
            this.transferData.failedUploads = failedUploadsArray;
        }
        var mfaManager = applicationManager.getMFAManager();
        var chargesList = [];
        if (response.charges) {
            chargesList = JSON.parse(response.charges);
        }
        if (response.backendReferenceId && (response.status === "Sent" || response.status === "success")) {
            this.transferData.referenceId = response.backendReferenceId;
            this.transferData.serviceName = mfaManager.getServiceId();
            this.transferData.status = "Done";
            var acknowledgeViewModel = {
                transferData: this.transferData,
                chargesDetails: chargesList,
                exchangeRate: response.exchangeRate,
                totalAmount: response.totalAmount
            };
            this.fetchUserAccountAndNavigate(acknowledgeViewModel);
        } else if (response.referenceId && (response.status === "Sent" || response.status === "success")) {
            if (this.transferData.action) {
                var responseData = {
                    "data": this.transferData,
                    "referenceId": response.referenceId
                };
                if (this.transferData.action === "payOtherAmount") {
                    this.presentLoanPay({
                        payOtherAmount: responseData
                    });
                } else if (this.transferData.action === "payCompleteDue") {
                    this.presentLoanPay({
                        payCompleteDue: responseData
                    });
                } else if (this.transferData.action === "payCompleteMonthlyDue") {
                    this.presentLoanPay({
                        payCompleteMonthlyDue: responseData
                    });
                }
            } else {
                this.transferData.referenceId = response.referenceId;
                this.transferData.serviceName = mfaManager.getServiceId();
                this.transferData.status = "Done";
                var acknowledgeViewModel = {
                    transferData: this.transferData,
                    chargesDetails: chargesList,
                    exchangeRate: response.exchangeRate,
                    totalAmount: response.totalAmount
                };
                this.fetchUserAccountAndNavigate(acknowledgeViewModel);
            }
        } else if (response.status === "Pending") {
            this.transferData.referenceId = response.referenceId;
            this.transferData.serviceName = mfaManager.getServiceId();
            this.transferData.message = response.message;
            this.transferData.status = response.status;
            var acknowledgeViewModel = {
                transferData: this.transferData,
                chargesDetails: chargesList,
                exchangeRate: response.exchangeRate,
                totalAmount: response.totalAmount
            };
            this.fetchUserAccountAndNavigate(acknowledgeViewModel);
        } else if (response.status === "Denied") {
            var viewmodel = {};
            viewmodel.transferError = response.message;
            viewmodel.modifyTransaction = this.transferData;
            this.transferData.status = response.status;

            this.hideProgressBar();
            this.presentTransfers(viewmodel);
        } else if (response.transactionId) {
            this.transferData.referenceId = response.transactionId;
            this.transferData.serviceName = mfaManager.getServiceId();
            this.transferData.status = "Done";
            var acknowledgeViewModel = {
                transferData: this.transferData,
                chargesDetails: chargesList,
                exchangeRate: response.exchangeRate,
                totalAmount: response.totalAmount
            };
            this.fetchUserAccountAndNavigate(acknowledgeViewModel);
        } else if (response.MFAAttributes) {
            var operationName = this.getOperationName();
            this.transferData.status = "Done";
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": applicationManager.getMFAManager().getMFAFlowType(),
                "response": response,
                "objectServiceDetails": {
                    "action": operationName,
                    "serviceName": "TransactionObjects",
                    "dataModel": "Transaction",
                    "verifyOTPOperationName": operationName,
                    "requestOTPOperationName": operationName,
                    "resendOTPOperationName": operationName,
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        }
    };
    LoanPay_PresentationController.prototype.createTransferErrorCallback = function (transferData, response) {
        this.hideProgressBar();
        this.presentLoanPay({
            "serverError": response.errorMessage
        });
    };
    LoanPay_PresentationController.prototype.fetchUserAccountAndNavigate = function (acknowledgeViewModel) {
        this.accountManager.fetchInternalAccounts(this.fetchUserAccountAndNavigateSuccess.bind(this, acknowledgeViewModel), this.fetchUserAccountAndNavigateFailure.bind(this));
    };
    LoanPay_PresentationController.prototype.fetchUserAccountAndNavigateSuccess = function (acknowledgeViewModel, response) {
        acknowledgeViewModel.transferData.accountFrom = response.filter(function (account) {
            return acknowledgeViewModel.transferData.fromAccount.accountID === account.accountID
        })[0];
        this.presentLoanPay({
            transferAcknowledge: acknowledgeViewModel
        });
        this.hideProgressBar();
    };
    LoanPay_PresentationController.prototype.fetchUserAccountAndNavigateFailure = function () {
        this.hideProgressBar();
        CommonUtilities.showServerDownScreen();
    };
    LoanPay_PresentationController.prototype.getOperationName = function () {
        var operationName = "";
        var flowType = applicationManager.getMFAManager().getMFAFlowType();
        switch (flowType) {
            case "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE":
                operationName = "TransferToOwnAccounts";
                break;
            case "INTRA_BANK_FUND_TRANSFER_CREATE":
                operationName = "IntraBankAccFundTransfer";
                break;
            case "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE":
                operationName = "InterBankAccFundTransfer";
                break;
            case "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE":
                operationName = "InternationalAccFundTransfer";
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
    return LoanPay_PresentationController;
});