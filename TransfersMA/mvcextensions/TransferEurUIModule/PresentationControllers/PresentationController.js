define(['CommonUtilities', 'OLBConstants', 'ViewConstants'], function(CommonUtilities, OLBConstants, ViewConstants) {
    var frmMakePayment = "frmMakePayment";
    var frmConfirmEuro = "frmConfirmEuro";
    var frmAddBeneficiaryEuro = "frmAddBeneficiaryEuro";
    var frmAddBeneficiaryConfirmEuro = "frmAddBeneficiaryConfirmEuro";
    var frmAddBeneficiaryAcknowledgementEuro = "frmAddBeneficiaryAcknowledgementEuro";
    var frmFrom = "";
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    var MDABasePresenter = kony.mvc.Presentation.BasePresenter;

    /**
     * Description of TransferEur Presentation Controller.
     * @class
     * @alias module:TransferEurPresentationController
     */
    function TransferEurPresentationController() {
        this.userAccounts = [];
        this.externalaccounts = [];
        MDABasePresenter.call(this);
    }

    inheritsFrom(TransferEurPresentationController, MDABasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    TransferEurPresentationController.prototype.initializePresentationController = function() {};

    /**
     * Entry Point Method for Transfer Eur Module
     * @param {object} param.context - used to load a particular flow
     */
    TransferEurPresentationController.prototype.showTransferScreen = function(param) {
        switch (param.context) {
            case "MakePayment":
                kony.application.showLoadingScreen("loadingskin","Data is still Loading");
                var transactionObj = {
                    "editTransaction": param.editTransaction,
                    "isScheduled": (param.editTransaction) ? param.editTransaction.isScheduled : "false",
                    "ExternalAccounts": true,
                    "modifyTransaction": param.modifyTransaction,
                    "transferError": param.errorMessage,
                    "isLoading": true
                };
                this.getBankDate(transactionObj, this.loadTransactionForm.bind(this, param));
                this.editTransactionObject = param.editTransaction;
                break;
            case "MakePaymentOwnAccounts":
                kony.application.showLoadingScreen("loadingskin","Data is still Loading");
                var transactionObj = {
                    "editTransaction": param.editTransaction,
                    "isScheduled": (param.editTransaction) ? param.editTransaction.isScheduled : "false",
					"isTransferCashWealth": (param.isTransferCashWealth) ? "true" : "false",
                    "OwnAccounts": true,
                    "modifyTransaction": param.modifyTransaction,
                    "transferError": param.errorMessage,
                    "isLoading": true
                };
                this.getBankDate(transactionObj, this.loadTransactionForm.bind(this, param));
                this.editTransactionObject = param.editTransaction;
                break;
            case "AddBeneficiary":
                this.showView(frmAddBeneficiaryEuro, {
                    "initialView": true
                });
                break;
        }
    };


    TransferEurPresentationController.prototype.loadAccounts = function(params, successCall) {
        this.showProgressBar();
        this.fetchFromAccounts(params, successCall);
    };
    TransferEurPresentationController.prototype.fetchFromAccounts = function(params, successCall) {
        var asyncManager = applicationManager.getAsyncManager();
        var accountsManager = applicationManager.getAccountManager();
        if (params.context === "MakePayment") {
            asyncManager.callAsync(
                [
                    asyncManager.asyncItem(accountsManager, 'fetchInternalAccounts'),
                ],
                this.fetchFromAccountsCompletionCallBack.bind(this, params, successCall)
            );
        } else {
            asyncManager.callAsync(
                [
                    asyncManager.asyncItem(accountsManager, 'fetchInternalAccounts'),
                    asyncManager.asyncItem(accountsManager, 'fetchCreditCardAccounts')
                ],
                this.fetchFromAccountsCompletionCallBack.bind(this, params, successCall)
            );
        }
    };
    TransferEurPresentationController.prototype.fetchFromAccountsCompletionCallBack = function(params, successCall, syncResponseObject) {
        if (syncResponseObject.isAllSuccess()) {
            // Getting All accounts. Changed after new permission framework
            var frmAccounts = this.getAllowedFromAccounts(applicationManager.getAccountManager().getInternalAccounts());
            frmAccounts =  frmAccounts.filter(function (account) {
                return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
            }) 
            this.userAccounts = frmAccounts;
            var viewModel = {
                context: params,
                fromAccounts: frmAccounts
            };
            if (params.context === "MakePaymentOwnAccounts") {
                viewModel.fromAccounts.push(...syncResponseObject.responses[1].data.Accounts);
            }
            successCall(viewModel);
            if (params.context !== "MakePaymentOwnAccounts") {
                this.fetchToAccounts(params, successCall);
            } else {
                this.hideProgressBar();
            }
        } else {
            this.hideProgressBar();
            CommonUtilities.showServerDownScreen();
        }
    };

    TransferEurPresentationController.prototype.getAllowedFromAccounts = function(accounts) {
        var CREATE_ACTIONS = [
            "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE",
            "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE",
            "INTRA_BANK_FUND_TRANSFER_CREATE",
            "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE"
        ];
        return accounts.filter(this.isAccountHaveAtleastOneActions.bind(this, CREATE_ACTIONS));
    }

    TransferEurPresentationController.prototype.isAccountHaveAtleastOneActions = function(permissions, accountObject) {
        return permissions.some(function(permission) {
            return applicationManager.getConfigurationManager().checkAccountAction(accountObject.accountID, permission)
        })
    }


    TransferEurPresentationController.prototype.fetchToAccounts = function(context, successCall) {
        applicationManager.getRecipientsManager().fetchAllExternalAccounts(this.fetchToAccountsSuccess.bind(this, context, successCall), this.fetchToAccountsFailure.bind(this, successCall));
    };
    TransferEurPresentationController.prototype.fetchToAccountsSuccess = function(context, successCall, response) {
        var processedRecipientArray = [];
        processedRecipientArray = this.filterToAccountsBasedOnPermissions(response);
        processedRecipientArray = this.filterBeneficiariesBasedOnPermissions(processedRecipientArray)
        this.externalaccounts = processedRecipientArray;
        var viewModel = {
            toAccounts: processedRecipientArray,
            context: context,
            isLoading: false
        }
        successCall(viewModel);
        if (this.userAccounts.length > 0) {
            this.hideProgressBar();
        }
    };
    TransferEurPresentationController.prototype.filterToAccountsBasedOnPermissions = function(beneficiaries) {
        var userPermissions = ["INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE",
            "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE",
            "INTRA_BANK_FUND_TRANSFER_CREATE"
        ].filter(function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        })
        var beneficiariesToShow = beneficiaries.filter(function(beneficiary) {
            if (beneficiary.isSameBankAccount === "true" && userPermissions.indexOf("INTRA_BANK_FUND_TRANSFER_CREATE") > -1) {
                return true;
            }
            if (beneficiary.isSameBankAccount === "false" && beneficiary.isInternationalAccount === "false" && userPermissions.indexOf("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") > -1) {
                return true;
            }
            if (beneficiary.isInternationalAccount === "true" && userPermissions.indexOf("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") > -1) {
                return true;
            }
        })
        return beneficiariesToShow;
    };
    TransferEurPresentationController.prototype.fetchToAccountsFailure = function (successCall, response) {
        successCall({ "isLoading": false, "transferError": response.errorMessage });
    };
    TransferEurPresentationController.prototype.confirmTransferDetails = function(data) {

        kony.print(data);
        var viewModel = {
            confirmDetails: data
        }

        this.showView("frmConfirmEuro", data);
    }

    TransferEurPresentationController.prototype.getTypeFromTransferData = function(transferData) {
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
    }

    TransferEurPresentationController.prototype.validateTransfer = function(transferData) {
        this.createTransaction(transferData, true)
    }
    TransferEurPresentationController.prototype.convertDateFormat = function(dateString) {
            return applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(dateString, "dd/mm/yyyy").format("m/d/Y");
        },

        /**Saves Transfer Data
         * @param {object} transferData Create Transfer from form Data
         */
        TransferEurPresentationController.prototype.createTransaction = function(transferData, validate) {
            var currentDate = this.bankDate && this.bankDate.currentWorkingDate ? new Date(this.bankDate.currentWorkingDate) : new Date();
            var sendonDateObject = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(transferData.sendOnDate, "dd/mm/yyyy");
            transferData.isRecurring = (transferData.frequency !== "Once" || sendonDateObject.toDateString() !== currentDate.toDateString()) ? true : false;
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
            transactionManager.setTransactionAttribute("isScheduled", (transferData.frequency !== "Once" || sendonDateObject.toDateString() !== currentDate.toDateString()) ? "1" : "0");
            if (transferData.isOwnAccount) {
                transactionManager.setTransactionAttribute("toAccountNumber", transferData.toAccount.accountID);
                transactionManager.setTransactionAttribute("transactionType", "InternalTransfer");
            } else {
				transactionManager.setTransactionAttribute("ExternalAccountNumber", transferData.accountNumber);
                transactionManager.setTransactionAttribute("transactionType", "ExternalTransfer");
                transactionManager.setTransactionAttribute("toAccountNumber", transferData.toAccount.accountNumber);
            }
            transactionManager.setTransactionAttribute("transactionCurrency", transferData.currency);
            transactionManager.setTransactionAttribute("toAccountCurrency", transferData.toAccount.currencyCode ? transferData.toAccount.currencyCode : transferData.fromAccount.currencyCode);
            transactionManager.setTransactionAttribute("frequencyType", transferData.frequency);
            transactionManager.setTransactionAttribute("paymentType", transferData.paymentMedium === kony.i18n.getLocalizedString("i18n.TransfersEur.InstantPayment") ? "" : "SEPA")
            transactionManager.setTransactionAttribute("frequencyStartDate", this.convertDateFormat(transferData.sendOnDate));
            transactionManager.setTransactionAttribute("frequencyEndDate", transferData.frequency !== "Once" ? (transferData.endOnDate ? this.convertDateFormat(transferData.endOnDate) : null) : null);
            transactionManager.setTransactionAttribute("numberOfRecurrences", null);
            transactionManager.setTransactionAttribute("scheduledDate", this.convertDateFormat(transferData.sendOnDate));
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
            //transactionManager.setTransactionAttribute("serviceName", mfaManager.getServiceId());
            this.showProgressBar();
            this.createTransferBasedOnType(transactionManager.getTransactionObject(), transferData, validate);
        };

    TransferEurPresentationController.prototype.transformData = function(data,transferData) {
        return {
            "amount": (data.amount !== null ? data.amount : ""),
            "createWithPaymentId" : data.createWithPaymentId,
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
			"creditValueDate": (data.creditValueDate !== null ? data.creditValueDate : ""),
            "exchangeRate":(data.exchangeRate !== null ? data.exchangeRate : ""),
            "isMFARequired" : transferData.isMFARequired? transferData.isMFARequired: "false"
        }
    }

    /**Error callback after the transaction is saved
     * @param {object} response failure response from backend
     */
    TransferEurPresentationController.prototype.createTransferErrorCallback = function(transferData, response) {
        if (transferData.action) {
            var LoanModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoanPayModule");
            LoanModule.presentationController.presentLoanPay({
                "serverError": response.errorMessage
            });
        } else {
            this.hideProgressBar();
            this.showTransferScreen({
                context: transferData.isOwnAccount ? "MakePaymentOwnAccounts" : "MakePayment",
                modifyTransaction: transferData,
                errorMessage: response.serverErrorRes
            });
        }
    };

    /**Error callback after the transaction is saved
     * @param {object} response failure response from backend
     */
    TransferEurPresentationController.prototype.editTransactionError = function(transferData, response) {
        this.hideProgressBar();
        this.showTransferScreen({
            context: transferData.transactionType === "InternalTransfer" ? "MakePaymentOwnAccounts" : "MakePayment",
            editTransaction: transferData,
            errorMessage: response.serverErrorRes
        });
    };

    /**Error callback after the transaction is saved
     * @param {object} response failure response from backend
     */
    TransferEurPresentationController.prototype.createTransferMFAErrorCallback = function(response) {
        var scaType = CommonUtilities.getSCAType();
		//Adding else to check if SCA push denied error message
            if (scaType && scaType == 0) {
        var viewmodel = {};
        viewmodel.transferError = response.errorMessage || response.message
        this.hideProgressBar();
			this.showView(frmMakePayment, viewmodel);
			}
			else{
				var errorMessage = response.errorMessage || response.message;
            this.hideProgressBar();
            var data = this.transferData;
            if (data.isTaxPaymentFlow) {
                this.showTaxPaymentScreen({
                    context: "PayTax",
                    modifyTransaction: data,
                    errorMessage: response
                });
                return;
            } else if (data.isOwnAccount) {
                if (data.action) {
                    var LoanModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoanPayModule");
                    LoanModule.presentationController.presentLoanPay({
                        "serverError": response.errorMessage
                    });
                } else {
                    this.showTransferScreen({
                        context: "MakePaymentOwnAccounts",
                        modifyTransaction: data,
                        errorMessage: response
                    });
                }
            } else {
                this.showTransferScreen({
                    context: "MakePayment",
                    modifyTransaction: data,
                    errorMessage: response
                });
            }
			}
    };


    TransferEurPresentationController.prototype.validateCallbackSuccess = function(transferData, response) {

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
            } catch (e) {}
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
            this.showView(frmMakePayment, {
                validationSuccess: true,
                confirmDetails: transferData,
                chargesList: charges,
                exchangeRate: response.exchangeRate,
                totalAmount: response.totalAmount,
                creditValueDate: response.creditValueDate,
				details: response
            })
            return;
        }
        try {
            var overrides = JSON.parse(response.overrideList);
            var cutoffOverride = overrides.includes("cutOfTimeBreached");
            var productOverride = overrides.includes("changeProduct");
            if (cutoffOverride) {
                this.showView(frmMakePayment, {
                    validationFailed: {
                        cutoffOverride: cutoffOverride,
                        productOverride: productOverride
                    }
                })
            } else {
                transferData.isInsufficientFundsTransfer = overrides.includes("overdraft");
                this.showView(frmMakePayment, {
                    validationSuccess: true,
                    confirmDetails: transferData,
                    chargesList: charges,
                    exchangeRate: response.exchangeRate,
                    totalAmount: response.totalAmount,
                    creditValueDate: response.creditValueDate,
					details: response
                  
                })
            }
        } catch (e) {
            this.showView(frmMakePayment, {
                validationSuccess: true,
                confirmDetails: transferData,
                chargesList: charges,
                exchangeRate: response.exchangeRate,
                totalAmount: response.totalAmount,
                creditValueDate: response.creditValueDate
            })
        }
    };


    TransferEurPresentationController.prototype.createTransferBasedOnType = function(data, transferData, validate) {
        var mfaManager = applicationManager.getMFAManager();
        var transactionManager = applicationManager.getTransactionManager();
        var successCallBack = validate ? this.validateCallbackSuccess.bind(this, transferData) : this.createTransferSuccessCallback.bind(this);
        var errorCallback = validate ? this.validateCallbackError.bind(this, transferData) : this.createTransferErrorCallback.bind(this, transferData);
        var transformedData = this.transformData(data, transferData);
        if (validate) {
            transformedData.validate = "true";
            transformedData.uploadedattachments = "";
        }
        if (transferData.oneTimePayment) {
            if (transferData.toAccount.isInternationalAccount === "true") 
                mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE");
            else if (transferData.toAccount.isSameBankAccount === "true") 
                mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_CREATE");
            else if (transferData.toAccount.accountID)
                mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
            else
                mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE");
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

    TransferEurPresentationController.prototype.fetchUserAccountAndNavigatesFailure = function() {
        this.hideProgressBar();
        CommonUtilities.showServerDownScreen();
    };

    TransferEurPresentationController.prototype.createTransferSuccessCallback = function(response) {
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
                var LoanModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoanPayModule");
                var transferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule");
                if (this.transferData.action === "payOtherAmount") {
                    LoanModule.presentationController.presentLoanPay({
                        payOtherAmount: responseData
                    });
                } else if (this.transferData.action === "payCompleteDue") {
                    LoanModule.presentationController.presentLoanPay({
                        payCompleteDue: responseData
                    });
                } else if (this.transferData.action === "payCompleteMonthlyDue") {
                    LoanModule.presentationController.presentLoanPay({
                        payCompleteMonthlyDue: responseData
                    });
                } else if (this.transferData.action === "transferOther") {
                    transferModule.presentationController.presentTransfers({
                        transferOther: responseData
                    });
                } else if (this.transferData.action === "transferDue") {
                    transferModule.presentationController.presentTransfers({
                        transferDue: responseData
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
    TransferEurPresentationController.prototype.editTransactionSuccess = function(response) {
        var mfaManager = applicationManager.getMFAManager();
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
        if (response.referenceId && response.status === "Sent") {
            this.transferData.referenceId = response.referenceId;
            this.transferData.serviceName = mfaManager.getServiceId();
            this.transferData.status = "Done";
            var acknowledgeViewModel = {};
            acknowledgeViewModel.transferData = this.transferData;
            this.fetchUserAccountAndNavigate(acknowledgeViewModel);
        } else if (response.transactionId) {
            this.transferData.referenceId = response.transactionId;
            this.transferData.serviceName = mfaManager.getServiceId();
            this.transferData.status = "Done";
            var acknowledgeViewModel = {};
            acknowledgeViewModel.transferData = this.transferData;
            this.fetchUserAccountAndNavigate(acknowledgeViewModel);
        } else if (response.status === "Pending") {
            this.transferData.referenceId = response.referenceId;
            this.transferData.serviceName = mfaManager.getServiceId();
            this.transferData.message = response.message;
            this.transferData.status = response.status;
            var acknowledgeViewModel = {};
            acknowledgeViewModel.transferData = this.transferData;
            this.fetchUserAccountAndNavigate(acknowledgeViewModel);
        } else if (response.status === "Denied") {
            var viewmodel = {};
            viewmodel.transferError = response.message;
            viewmodel.modifyTransaction = transferData;
            this.transferData.status = response.status;
            this.hideProgressBar();
            this.presentTransfers(viewmodel);
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


    TransferEurPresentationController.prototype.fetchUserAccountAndNavigate = function(acknowledgeViewModel) {
        var accountManager = applicationManager.getAccountManager();
        this.fetchUserAccountAndNavigateSuccess(acknowledgeViewModel);
        accountManager.fetchInternalAccounts(function() {}, function() {});
        //accountManager.fetchInternalAccounts(this.fetchUserAccountAndNavigateSuccess.bind(this, acknowledgeViewModel), this.fetchUserAccountAndNavigatesFailure.bind(this));
    };



    TransferEurPresentationController.prototype.fetchUserAccountAndNavigateSuccess = function(acknowledgeViewModel, response) {
        // acknowledgeViewModel.transferData.accountFrom = response.filter(function(account) {
        //     return acknowledgeViewModel.transferData.fromAccount.accountID === account.accountID
        // })[0];
        this.showView("frmAcknowledgementEuro", {
            transferAcknowledge: acknowledgeViewModel
        });
      	this.hideProgressBar();
    };



  
    TransferEurPresentationController.prototype.filterBeneficiariesBasedOnPermissions = function(response) {
        var configManager = applicationManager.getConfigurationManager();
        var processedRecipientArray = [];
        for (var i = 0; i < response.length; i++) {
            var processedRecipient = null;
            var isInternationalBen = (response[i].isInternationalAccount === "true" && response[i].isSameBankAccount === "false") ? true : false;
            var isInternalBen = (response[i].isInternationalAccount === "false" && response[i].isSameBankAccount === "true") ? true : false;
            var isDomesticBen = (response[i].isInternationalAccount === "false" && response[i].isSameBankAccount === "false") ? true : false;
            if (isInternalBen && configManager.checkUserPermission("INTRA_BANK_FUND_TRANSFER_VIEW_RECEPIENT")) {
                processedRecipient = response[i];
            } else if (isInternationalBen && configManager.checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT")) {
                processedRecipient = response[i];
            } else if (isDomesticBen && configManager.checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT")) {
                processedRecipient = response[i];
            }
            if (processedRecipient !== null && processedRecipient !== undefined)
                processedRecipientArray.push(processedRecipient);
        }

        return processedRecipientArray;
    };


    /**
     * Method to call delete Command Handler to delete biller in manage payee.
     * @param {object} request delete object
     */
    TransferEurPresentationController.prototype.cancelPayment = function(transaction) {
        this.showProgressBar();
        //this.checkTransactionDeletionType(transaction);
        applicationManager.getTransactionManager().deleteTransaction({
            frequencyType: transaction.frequencyType,
            transactionId: transaction.transactionId,
            transactionType: transaction.transactionType
        }, this.updateCancelPaymentSuccessCallBack.bind(this), this.updateCancelPaymentErrorCallBack.bind(this));
    };
    TransferEurPresentationController.prototype.checkTransactionDeletionType = function(data) {
        var transactionManager = applicationManager.getTransactionManager();
        var successCallBack = this.updateCancelPaymentSuccessCallBack.bind(this);
        var errorCallback = this.updateCancelPaymentErrorCallBack.bind(this);
        var payload = {
            frequencyType: data.frequencyType,
            transactionId: data.transactionId,
            transactionType: data.transactionType
        };
        switch (data.serviceName) {
            case OLBConstants.TRANSFER_TYPES.OWN_INTERNAL_TRANSFER:
                transactionManager.cancelTransferToOwnAccounts(payload, successCallBack, errorCallback);
                break;
            case OLBConstants.TRANSFER_TYPES.INTER_BANK_TRANSFER:
                transactionManager.cancelInterBankAccFundTransfer(payload, successCallBack, errorCallback);
                break;
            case OLBConstants.TRANSFER_TYPES.INTRA_BANK_TRANSFER:
                transactionManager.cancelIntraBankAccFundTransfer(payload, successCallBack, errorCallback);
                break;
            case OLBConstants.TRANSFER_TYPES.INTERNATIONAL_TRANSFER:
                transactionManager.cancelInternationalAccFundTransfer(payload, successCallBack, errorCallback);
                break;
                /*case OLBConstants.TRANSFER_TYPES.P2P_TRANSFER:
                  transactionManager.cancelOccurrenceInternationalAccFundTransfer(payload,successCallBack, errorCallback);
                  break;*/
        }
    }
    /**
     * sucess callback for delete beneficiary
     * @param {object} response success reponse
     */
    TransferEurPresentationController.prototype.updateCancelPaymentSuccessCallBack = function(response) {
        var self = this;
        self.fetchScheduledPayments();
    };
    /**
     * error callback fordelete beneficiary
     * @param {object} response error response
     */
    TransferEurPresentationController.prototype.updateCancelPaymentErrorCallBack = function(response) {
        this.hideProgressBar();
        this.showView(frmScheduledPaymentsEur, {
            "serverError": response.errorMessage
        });
    };
    /**
     * used to show the Transfer Page and executes the particular Page.
     * @param {string} frm  used to load the form
     * @param {object}  data  used to load the particular form and having key value pair.
     */
    TransferEurPresentationController.prototype.showView = function(frm, data) {
      if (kony.application.getCurrentForm().id !== frm) {
        applicationManager.getNavigationManager().navigateTo({
          "appName": "TransfersMA",
          "friendlyName": frm
        });
        // var obj = {
        //   "context": this,
        //   "callbackModelConfig":{"frm":frm, "UIModule":"TransferEurUIModule","appName": "TransfersMA"}
        // };
        // var navManager = kony.mvc.getNavigationManager();
        // navManager.navigate(obj);
      }
        if (data) {
            applicationManager.getNavigationManager().updateForm(data, frm);
        }
    };
    /**
     * used to update the form with some data.
     * @param {string} frm form to be updated
     * @param {object}  data data to be set in the form
     */
    TransferEurPresentationController.prototype.updateView = function(frm, data) {
        if (data) {
            applicationManager.getNavigationManager().updateForm(data, frm);
        }
    };
    TransferEurPresentationController.prototype.showProgressBar = function() {
        applicationManager.getNavigationManager().updateForm({
            isLoading: true
        },kony.application.getCurrentForm().id);
    };
    TransferEurPresentationController.prototype.hideProgressBar = function() {
        applicationManager.getNavigationManager().updateForm({
            isLoading: false
        },kony.application.getCurrentForm().id);
    };
    /**
     * Method to send transaction data to confirmation screen
     * @param {object} data - object containing transaction data
     */
    TransferEurPresentationController.prototype.showConfirmation = function(data) {
        this.showView(frmConfirmEuro, {
            "confirmDetails": data
        });
    };
    /**
     * Method to add new Beneficiary
     * @param {Object} beneficiaryData contains beneficiary details to be added
     */
    TransferEurPresentationController.prototype.addBeneficiaryDetails = function(beneficiaryData, frm) {
        this.showProgressBar();
        applicationManager.getRecipientsManager().createABenificiary(beneficiaryData, this.createBeneficiarySuccess.bind(this, beneficiaryData, frm), this.createBeneficiaryFailure.bind(this, frm));
    };
    /**
     * Create Beneficiary Success Callback
     */
    TransferEurPresentationController.prototype.createBeneficiarySuccess = function(beneficiaryData, frm, response) {
        this.hideProgressBar();
        beneficiaryData["beneficiaryId"] = response.Id;
		beneficiaryData["transactionStatus"] = response.transactionStatus;
        beneficiaryData["referenceId"] = response.referenceId;
        this.showView(frm, {
            "showAddBeneficiaryAck": beneficiaryData
        });
    };
    /**
     * Create Beneficiary Failure Callback
     */
    TransferEurPresentationController.prototype.createBeneficiaryFailure = function(frm, response) {
        this.hideProgressBar();
        if (frm === frmAddBeneficiaryAcknowledgementEuro) {
            frm = frmAddBeneficiaryEuro
        }
        this.showView(frm, {
            "serverError": response.errorMessage
        });
    };
    /**
     * Method to save changed Beneficiary details
     * @param {object} editedInfo Save Changed Beneficiary details to backend
     */
    TransferEurPresentationController.prototype.saveChangedBeneficiaryDetails = function(data, editedInfo) {
        this.showProgressBar();
        applicationManager.getRecipientsManager().editABenificiary(editedInfo, this.saveChangedBeneficiaryDetailsSuccess.bind(this, data), this.saveChangedBeneficiaryDetailsFailure.bind(this));
    };
    /**
     * Success callback after Saving Changed Beneficiary details
     * @param {object} response response Changing Beneficiary details to backend
     */
    TransferEurPresentationController.prototype.saveChangedBeneficiaryDetailsSuccess = function(data, response) {
        this.hideProgressBar();
        data["transactionStatus"] = response.transactionStatus;
        this.showView(frmAddBeneficiaryAcknowledgementEuro, {
            "showEditBeneficiaryAck": data
        });
    };
    /**
     * Failure callback after Saving Changed Beneficiary details
     */
    TransferEurPresentationController.prototype.saveChangedBeneficiaryDetailsFailure = function(error) {
        this.hideProgressBar();
        var errorMessage =  kony.i18n.getLocalizedString("i18n.common.OoopsServerError");
        if(error.serverErrorRes && error.serverErrorRes.dbpErrCode && error.serverErrorRes.dbpErrCode === "12001"){
          errorMessage = error.serverErrorRes.dbpErrMsg;
        }
        this.showView(frmAddBeneficiaryEuro, {
            "serverError":errorMessage
        });
    };

    TransferEurPresentationController.prototype.editTransaction = function(transferData) {
        this.showProgressBar();
        var currentDate = this.bankDate && this.bankDate.currentWorkingDate ? new Date(this.bankDate.currentWorkingDate) : new Date();
        var sendonDateObject = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(transferData.sendOnDate, "dd/mm/yyyy");
        function clean(obj) {
            for (var propName in obj) {
                if (obj[propName] === null || obj[propName] === undefined) {
                    delete obj[propName];
                }
            }
        }
        transferData.isRecurring = (transferData.frequency !== "Once" || sendonDateObject.toDateString() !== currentDate.toDateString()) ? true : false;
        this.transferData = transferData;
        var mfaManager = applicationManager.getMFAManager();
        mfaManager.setMFAOperationType("UPDATE");
        if (transferData.serviceName) {
            mfaManager.setServiceId(transferData.serviceName);
        } else {
            var displayName = applicationManager.getPresentationUtility().MFA.getDisplayNameForTransfer(transferData.toAccount.type);
            applicationManager.getPresentationUtility().MFA.getServiceIdBasedOnDisplayName(displayName);
        }
        var mfaParams = {
            serviceName: mfaManager.getServiceId(),
        };
        var editTransactionobject = JSON.parse(JSON.stringify(this.editTransactionObject));
        clean(editTransactionobject);
        editTransactionobject.deletedDocuments = transferData.deletedDocuments;
        editTransactionobject.uploadedattachments = transferData.supportedDocumentObjects; // new documents attached to transaction
        editTransactionobject.amount = transferData.amount;
        editTransactionobject.frequencyType = transferData.frequency;
        editTransactionobject.frequencyStartDate =this.convertDateFormat(transferData.sendOnDate)
        editTransactionobject.frequencyEndDate = transferData.endOnDate ? this.convertDateFormat(transferData.endOnDate) : "";
        editTransactionobject.scheduledDate = this.convertDateFormat(transferData.sendOnDate);
        editTransactionobject.transactionDate = this.convertDateFormat(transferData.sendOnDate);
        editTransactionobject.transactionCurrency = transferData.transactionCurrency;
        editTransactionobject.transactionsNotes = transferData.paymentReference;
        editTransactionobject.toAccountName = transferData.toAccount.beneficiaryName
        editTransactionobject.toAccountNumber = transferData.toAccount.accountNumber || transferData.toAccount.accountID;
        this.editTransferBasedOnType(editTransactionobject, transferData);
    };
    TransferEurPresentationController.prototype.editTransferBasedOnType = function(data, transferData) {
        var mfaManager = applicationManager.getMFAManager();
        var transactionManager = applicationManager.getTransactionManager();
        var successCallBack = this.editTransactionSuccess.bind(this);
        var errorCallback = this.editTransactionError.bind(this, data);
        // var transformedData =  this.transformData(data);
        data.isMFARequired = transferData.isMFARequired;

        if (transferData.toAccount.accountID) {
            mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE");
            transactionManager.editTransferToOwnAccounts(data, successCallBack, errorCallback)
        } else {
            if (transferData.toAccount.isInternationalAccount === "true") {
                mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE");
                transactionManager.editInternationalAccFundTransfer(data, successCallBack, errorCallback)
            } else if (transferData.toAccount.isSameBankAccount === "true") {
                mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_UPDATE");
                transactionManager.editIntraBankAccFundTransfer(data, successCallBack, errorCallback)
            } else {
                mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE");
                transactionManager.editInterBankAccFundTransfer(data, successCallBack, errorCallback)
            }
        }
    };
    /**
     * Method to check valid IBAN using service call
     * @param {String} iban - value to be checked
     */
    TransferEurPresentationController.prototype.isValidIBAN = function(iban, frm) {
        this.showProgressBar();
        var params = {
            "iban": iban
        };
        applicationManager.getRecipientsManager().checkValidIBAN(params, this.isValidIBANSuccess.bind(this, frm), this.isValidIBANFailure.bind(this, frm));
    };
    /**
     * IBAN valid checker service Success Callback
     * @param {Object} response object containing isIBANValid key
     */
    TransferEurPresentationController.prototype.isValidIBANSuccess = function(frm, response) {
        if (response.isIBANValid === "YES") {
            this.fetchBIC(response.iban, frm);
        } else {
            this.hideProgressBar();
            this.showView(frm, {
                "IBanerror": response
            });
        }
    };
    /**
     * IBAN valid checker service Failure Callback
     * @param {Object} response object which comes from service when the service fails
     */
    TransferEurPresentationController.prototype.isValidIBANFailure = function(frm, response) {
        this.hideProgressBar();
        this.showView(frm, {
            "serverError": response.errmsg
        });
    };
    /**
     * Method to fetch beneficiary name using service call
     * @param {String} iban - value to be checked
     */
    TransferEurPresentationController.prototype.getBeneficiaryName = function(accountNumber, frm) {
        this.showProgressBar();
        var params = {
            "accountNumber": accountNumber
        };
        applicationManager.getRecipientsManager().getPayeeName(params, this.getBeneficiaryNameSuccess.bind(this, frm), this.getBeneficiaryNameFailure.bind(this, frm));
    };
    /**
     * fetch beneficiary name service Success Callback
     * @param {Object} response object containing isIBANValid key
     */
    TransferEurPresentationController.prototype.getBeneficiaryNameSuccess = function(frm, response) {

        this.hideProgressBar();
        this.showView(frm, {
            "beneficiaryName": response
        });

    };
    /**
     * fetch beneficiary name service Failure Callback
     * @param {Object} response object which comes from service when the service fails
     */
    TransferEurPresentationController.prototype.getBeneficiaryNameFailure = function(frm, response) {
        this.hideProgressBar();
        this.showView(frm, {
            "transferError": response.errorMessage
        });
    };
    /**
     * Method to fetch BIC for a valid IBAN
     * @param {String} iban valid IBAN value of which BIC details to be fetched
     */
    TransferEurPresentationController.prototype.fetchBIC = function(iban, frm) {
        var params = {
            "iban": iban,
            "countryCode": iban.slice(0, 2)
        };
        applicationManager.getRecipientsManager().searchSwiftorBICCode(params, this.fetchBICSuccess.bind(this, frm), this.fetchBICFailure.bind(this, frm));
    };
    /**
     * Fetch BIC service Success Callback
     * @param {Object} response object containing BIC details of a valid IBAN
     */
    TransferEurPresentationController.prototype.fetchBICSuccess = function(frm, response) {
        this.hideProgressBar();
        this.showView(frm, {
            "BICdetails": response
        });
    };
    /**
     * Fetch BIC service Failure Callback
     * @param {Object} response object which comes from service when the service fails
     */
    TransferEurPresentationController.prototype.fetchBICFailure = function(frm, response) {
        this.hideProgressBar();
        this.showView(frm, {
            "serverError": response.errmsg
        });
    };
    /**
     * Fetch Account Due Bqalance using account details call.
     * @param {Object} account object which comes from service when the service fails
     */
    TransferEurPresentationController.prototype.fetchAmountDueBalance = function(account) {
        this.showProgressBar();
        var params = {
            "accountID": account.accountID
        };
        applicationManager.getAccountManager().fetchAccountDetails(params, this.fetchAmountDueBalanceSuccess.bind(this), function() {});


    };

    TransferEurPresentationController.prototype.fetchAmountDueBalanceSuccess = function(response) {
        var accountDetails = response[0];
        this.showView(frmMakePayment, {
            "accountDetails": accountDetails
        })
        this.hideProgressBar();
    };
    /**
     * Method to get the bank date
     * @param {object} transactionObj - object containing transaction data
     * @param {function} callback call to set bank date in form
     */
    TransferEurPresentationController.prototype.getBankDate = function (transactionObj, callback) {
        applicationManager.getRecipientsManager().fetchBankDate({}, this.getBankDateSuccess.bind(this, transactionObj, callback), this.getBankDateFailure.bind(this, transactionObj, callback));
    };
    /**
     * get bank date Success Callback
     * @param {object} transactionObj - object containing transaction data
     * @param {function} callback call to set API bank date in form
     * @param {Object} response object containing bank date
     */
    TransferEurPresentationController.prototype.getBankDateSuccess = function (transactionObj, callback, response) {
        this.bankDate = response.date[0];
        transactionObj['bankDate'] = response.date[0];
        callback(transactionObj);
    };
    /**
     * get bank date Failure Callback
     * @param {object} transactionObj - object containing transaction data
     * @param {function} callback call to set server bank date in form
     * @param {Object} response object containing failure message
     */
    TransferEurPresentationController.prototype.getBankDateFailure = function (transactionObj, callback, response) {
        transactionObj['bankDate'] = true;
        callback(transactionObj);
    };

    TransferEurPresentationController.prototype.validateCallbackError = function(transferData, response) {
        this.hideProgressBar();
        this.showTransferScreen({
            context: transferData.isOwnAccount ? "MakePaymentOwnAccounts" : "MakePayment",
            modifyTransaction: transferData,
            errorMessage: response.serverErrorRes
        });

    };

    TransferEurPresentationController.prototype.searchAllSwiftBICCode = function(searchData, locationFrom) {
        this.showProgressBar();
        frmFrom = locationFrom;
        var recipientsManager = applicationManager.getRecipientsManager();
        var criteria = searchData;
        //   this.searchSwiftData=searchData;
        recipientsManager.searchAllSwiftBICCode(criteria, this.searchAllSwiftBICCodePresentationSuccessCallBack.bind(this), this.searchAllSwiftBICCodeErrorCallBack.bind(this));
    };


    TransferEurPresentationController.prototype.searchAllSwiftBICCodePresentationSuccessCallBack = function(succRes) {
        this.hideProgressBar();
        var controller = applicationManager.getPresentationUtility().getController(frmFrom, true);
        controller.setSegmentData(succRes.swiftCodes);
    };

    TransferEurPresentationController.prototype.searchAllSwiftBICCodeErrorCallBack = function(response) {
        this.hideProgressBar();
        if (frmFrom === "frmMakePayment") {
            this.showTransferScreen({
                context: transferData.isOwnAccount ? "MakePaymentOwnAccounts" : "MakePayment",
                modifyTransaction: transferData,
                errorMessage: response.errorMessage
            });
        } else {
            this.showView(frmAddBeneficiaryEuro, {
                "serverError": response.errorMessage
            });
        }
    };
    TransferEurPresentationController.prototype.getContracts = function(data) {
        this.showProgressBar();
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.fetchContractDetails(data.feature, this.getContractsSuccess.bind(this, data), this.getContractsError.bind(this));
    };

    TransferEurPresentationController.prototype.getContractsSuccess = function(data, contracts) {
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm({
            "contracts": contracts,
            "data": data
        },frmAddBeneficiaryEuro);
    };

    TransferEurPresentationController.prototype.getContractsError = function(response) {
        this.hideProgressBar();
        this.showView(frmAddBeneficiaryEuro, {
            "serverError":response.errmsg || response.errorMessage
        });
    };

    TransferEurPresentationController.prototype.getOperationName = function() {
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

    TransferEurPresentationController.prototype.filterToAccountsByMembershipId = function(membershipId, toAccounts) {
        return applicationManager.getRecipientsManager().filterToAccountsByMembershipId(membershipId, toAccounts)
    };
  	TransferEurPresentationController.prototype.filterCreditCardAccount = function(accountType, toAccounts) {
        return applicationManager.getRecipientsManager().filterCreditCardAccount(accountType, toAccounts)
    };
    TransferEurPresentationController.prototype.loadTransactionForm = function(param, transactionObj) {
        this.loadAccounts(param, this.updateView.bind(this, frmMakePayment));
        this.showView(frmMakePayment, transactionObj);
    };
    TransferEurPresentationController.prototype.downloadReport = function(transactionObj) {
        this.showProgressBar();
        let params = {
            "transactionType": transactionObj.frequencyType || transactionObj.frequency,
            "transactionId": transactionObj.transactionId ||  transactionObj.referenceId,
            "contentType": "pdf"
        };
	applicationManager.getTransactionManager().DownloadTransactionPDF(params, this.downloadReportSuccess.bind(this),this.downloadReportFailure.bind(this));
    };
    TransferEurPresentationController.prototype.downloadReportSuccess = function(response){
      var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url;
      var fileUrl = mfURL + "/objects/DownloadTransactionPDF?fileId=" + response.fileId;
      kony.application.openURL(fileUrl);
      this.hideProgressBar();
    };
    TransferEurPresentationController.prototype.downloadReportFailure = function(response){
      this.hideProgressBar();
      this.showView("frmAcknowledgementEuro", {
        "downloadError": response
      });
    };
    return TransferEurPresentationController;
});