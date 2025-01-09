define(['CommonUtilities', 'OLBConstants', 'ViewConstants'], function(CommonUtilities, OLBConstants, ViewConstants) {
    var frmMakePayment = "frmMakePayment";
    var frmManageBeneficiaries = "frmManageBeneficiaries";
    var frmConfirmEuro = "frmConfirmEuro";
    var frmAddBeneficiaryEuro = "frmAddBeneficiaryEuro";
    var frmAddBeneficiaryConfirmEuro = "frmAddBeneficiaryConfirmEuro";
    var frmAddBeneficiaryAcknowledgementEuro = "frmAddBeneficiaryAcknowledgementEuro";
    var frmScheduledPaymentsEur = "frmScheduledPaymentsEurNew";
    var frmPastPaymentsEur = "frmPastPaymentsEurNew";
    var frmDirectDebitsEur = "frmDirectDebitsEur";
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
     * @alias module:ManageActivitiesPresentationController
     */
    function ManageActivitiesPresentationController() {
        //Manage Beneficiary Configuration
        this.manageBeneficiaryConfig = {
            'sortBy': 'beneficiaryName',
            'defaultSortBy': 'beneficiaryName',
            'order': OLBConstants.ASCENDING_KEY,
            'defaultOrder': OLBConstants.ASCENDING_KEY,
            'offset': OLBConstants.DEFAULT_T24_OFFSET,
            'limit': OLBConstants.PAGING_ROWS_LIMIT
        };
        //Past Payments Configuration
        this.pastConfig = {
            'sortBy': 'transactionDate',
            'defaultSortBy': 'transactionDate',
            'order': OLBConstants.DESCENDING_KEY,
            'defaultOrder': OLBConstants.DESCENDING_KEY,
            'offset': OLBConstants.DEFAULT_OFFSET,
            'limit': OLBConstants.PAGING_ROWS_LIMIT
        };
        //Scheduled Payments Configuration
        this.ScheduleConfig = {
            'sortBy': 'transactionDate',
            'defaultSortBy': 'transactionDate',
            'order': OLBConstants.DESCENDING_KEY,
            'defaultOrder': OLBConstants.DESCENDING_KEY,
            'offset': OLBConstants.DEFAULT_OFFSET,
            'limit': OLBConstants.PAGING_ROWS_LIMIT
        };
        this.userAccounts = [];
        this.externalaccounts = [];
        MDABasePresenter.call(this);
    }

    inheritsFrom(ManageActivitiesPresentationController, MDABasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    ManageActivitiesPresentationController.prototype.initializePresentationController = function() {};

    /**
     * Entry Point Method for Transfer Eur Module
     * @param {object} param.context - used to load a particular flow
     */
    ManageActivitiesPresentationController.prototype.showTransferScreen = function(param) {
        switch (param.context) {
            case "ManageBeneficiaries":
                this.showView({"appName": "TransfersMA","friendlyName": frmManageBeneficiaries});
                this.showBeneficiaries();          
                break;
            case "ScheduledPayments":
                this.getScheduledPayments();
                break;
            case "PastPayments":
                this.getPastPayments();
                break;
            case "DirectDebits":
                this.getDirectDebits();
                break;
        }
    };

    ManageActivitiesPresentationController.prototype.downloadAttachments = function(isSingleFile, fileNames, i, formName) {
        var requestParam = {};
        if (isSingleFile) { //forsinglefile
            requestParam.fileID = fileNames.fileID;
            requestParam.fileName = fileNames.fileName;
        } else { //formultiplefiles
            requestParam.fileID = fileNames[i].fileID;
            requestParam.fileName = fileNames[i].fileName;
        }
        applicationManager.getNavigationManager().updateForm({
            transactionDownloadFile: applicationManager.getTransactionManager().getDownloadAttachmentUrl(requestParam)
        }, formName);
    };

    ManageActivitiesPresentationController.prototype.retrieveAttachments = function(transactionId, viewAttachmentCallback) {
        var requestParam = {};
        var successCallback = this.retrieveAttachmentsSuccessCallback.bind(this);
        var errorCallback = this.retrieveAttachmentsErrorCallback.bind(this);
        requestParam.transactionId = transactionId;
        applicationManager.getTransactionManager().retrieveAttachments(requestParam, viewAttachmentCallback, viewAttachmentCallback);
    };

    ManageActivitiesPresentationController.prototype.retrieveAttachmentsSuccessCallback = function(response) {
        if (response.fileNames)
            return response.fileNames;
    };

    ManageActivitiesPresentationController.prototype.retrieveAttachmentsErrorCallback = function() {
        this.hideProgressBar();
        return [];
    };

    ManageActivitiesPresentationController.prototype.loadAccounts = function(params, successCall) {
        this.showProgressBar();
        this.fetchFromAccounts(params, successCall);
    };
    ManageActivitiesPresentationController.prototype.fetchFromAccounts = function(params, successCall) {
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
    ManageActivitiesPresentationController.prototype.fetchFromAccountsCompletionCallBack = function(params, successCall, syncResponseObject) {
        if (syncResponseObject.isAllSuccess()) {
            // Getting All accounts. Changed after new permission framework
            var frmAccounts = this.getAllowedFromAccounts(applicationManager.getAccountManager().getInternalAccounts());
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

    ManageActivitiesPresentationController.prototype.getAllowedFromAccounts = function(accounts) {
        var CREATE_ACTIONS = [
            "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE",
            "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE",
            "INTRA_BANK_FUND_TRANSFER_CREATE",
            "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE"
        ];
        return accounts.filter(this.isAccountHaveAtleastOneActions.bind(this, CREATE_ACTIONS));
    }

    ManageActivitiesPresentationController.prototype.isAccountHaveAtleastOneActions = function(permissions, accountObject) {
        return permissions.some(function(permission) {
            return applicationManager.getConfigurationManager().checkAccountAction(accountObject.accountID, permission)
        })
    }


    ManageActivitiesPresentationController.prototype.fetchToAccounts = function(context, successCall) {
        applicationManager.getRecipientsManager().fetchAllExternalAccounts(this.fetchToAccountsSuccess.bind(this, context, successCall), this.fetchToAccountsFailure.bind(this, successCall));
    };
    ManageActivitiesPresentationController.prototype.fetchToAccountsSuccess = function(context, successCall, response) {
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
    ManageActivitiesPresentationController.prototype.filterToAccountsBasedOnPermissions = function(beneficiaries) {
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
    ManageActivitiesPresentationController.prototype.fetchToAccountsFailure = function (successCall, response) {
        successCall({ "isLoading": false, "transferError": response.errorMessage });
    };
    ManageActivitiesPresentationController.prototype.confirmTransferDetails = function(data) {

        kony.print(data);
        var viewModel = {
            confirmDetails: data
        }

        this.showView({"appName": "TransfersMA","friendlyName": "frmConfirmEuro"}, data);
    }

    ManageActivitiesPresentationController.prototype.getTypeFromTransferData = function(transferData) {
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

    ManageActivitiesPresentationController.prototype.validateTransfer = function(transferData) {
        this.createTransaction(transferData, true)
    }
    ManageActivitiesPresentationController.prototype.convertDateFormat = function(dateString) {
            return applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(dateString, "dd/mm/yyyy").format("m/d/Y");
        },

        /**Saves Transfer Data
         * @param {object} transferData Create Transfer from form Data
         */
        ManageActivitiesPresentationController.prototype.createTransaction = function(transferData, validate) {
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
            transactionManager.setTransactionAttribute("ExternalAccountNumber", transferData.accountNumber);
            transactionManager.setTransactionAttribute("isScheduled", (transferData.frequency !== "Once" || sendonDateObject.toDateString() !== currentDate.toDateString()) ? "1" : "0");
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
            transactionManager.setTransactionAttribute("frequencyStartDate", this.convertDateFormat(transferData.sendOnDate));
            transactionManager.setTransactionAttribute("frequencyEndDate", transferData.frequency !== "Once" ? this.convertDateFormat(transferData.endOnDate) : null);
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

    ManageActivitiesPresentationController.prototype.transformData = function(data) {
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
			"creditValueDate": (data.creditValueDate !== null ? data.creditValueDate : "")
        }
    }

    /**Error callback after the transaction is saved
     * @param {object} response failure response from backend
     */
    ManageActivitiesPresentationController.prototype.createTransferErrorCallback = function(transferData, response) {
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
    ManageActivitiesPresentationController.prototype.editTransactionError = function(transferData, response) {
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
    ManageActivitiesPresentationController.prototype.createTransferMFAErrorCallback = function(response) {
        var viewmodel = {};
        viewmodel.transferError = response.errorMessage || response.message
        this.hideProgressBar();
        this.showView({"appName": "TransfersMA","friendlyName": frmMakePayment}, viewmodel);
    };


    ManageActivitiesPresentationController.prototype.validateCallbackSuccess = function(transferData, response) {

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
            this.showView({"appName": "TransfersMA","friendlyName": frmMakePayment}, {
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
                this.showView({"appName": "TransfersMA","friendlyName": frmMakePayment}, {
                    validationFailed: {
                        cutoffOverride: cutoffOverride,
                        productOverride: productOverride
                    }
                })
            } else {
                transferData.isInsufficientFundsTransfer = overrides.includes("overdraft");
                this.showView({"appName": "TransfersMA","friendlyName": frmMakePayment}, {
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
            this.showView({"appName": "TransfersMA","friendlyName": frmMakePayment}, {
                validationSuccess: true,
                confirmDetails: transferData,
                chargesList: charges,
                exchangeRate: response.exchangeRate,
                totalAmount: response.totalAmount,
                creditValueDate: response.creditValueDate
            })
        }
    };


    ManageActivitiesPresentationController.prototype.createTransferBasedOnType = function(data, transferData, validate) {
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

    ManageActivitiesPresentationController.prototype.fetchUserAccountAndNavigatesFailure = function() {
        this.hideProgressBar();
        CommonUtilities.showServerDownScreen();
    };

    ManageActivitiesPresentationController.prototype.createTransferSuccessCallback = function(response) {
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
    ManageActivitiesPresentationController.prototype.editTransactionSuccess = function(response) {
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


    ManageActivitiesPresentationController.prototype.fetchUserAccountAndNavigate = function(acknowledgeViewModel) {
        var accountManager = applicationManager.getAccountManager();
        accountManager.fetchInternalAccounts(this.fetchUserAccountAndNavigateSuccess.bind(this, acknowledgeViewModel), this.fetchUserAccountAndNavigatesFailure.bind(this));
    };



    ManageActivitiesPresentationController.prototype.fetchUserAccountAndNavigateSuccess = function(acknowledgeViewModel, response) {
        acknowledgeViewModel.transferData.accountFrom = response.filter(function(account) {
            return acknowledgeViewModel.transferData.fromAccount.accountID === account.accountID
        })[0];
        this.showView({"appName": "TransfersMA","friendlyName": "frmAcknowledgementEuro"}, {
            transferAcknowledge: acknowledgeViewModel
        });
      	this.hideProgressBar();
    };


    /**
     * used to show Manage beneficiaries
     * @param {string} offSetVal used to set offSet Value
     */
    ManageActivitiesPresentationController.prototype.showBeneficiaries = function() {
        var scopeObj = this;
        applicationManager.getPaginationManager().resetT24PaginationValues();
        scopeObj.fetchManageBeneficiary();
    };
    /**
     * used to fetch beneficiaries & perform the pagination
     * @param {object} sortingInputs sorting input values
     */
    ManageActivitiesPresentationController.prototype.fetchManageBeneficiary = function(sortingInputs) {
        this.showProgressBar();
        var params = applicationManager.getPaginationManager().getT24PaginationValues(this.manageBeneficiaryConfig, sortingInputs);
        if (sortingInputs !== undefined) {
            params.sortBy = sortingInputs.sortBy;
        }
        var criteria = {
            "offset": params.offset,
            "limit": params.limit,
            'resetSorting': true,
            "sortBy": params.sortBy,
            "order": params.order
        }
        applicationManager.getRecipientsManager().fetchAllExternalAccounts(this.fetchManageBeneficiarySuccessCallBack.bind(this), this.fetchManageBeneficiaryErrorCallBack.bind(this));
    };
    /**
     * used to show managebeneficiaries flow.
     * @param {object} response list of beneficiaries
     */
    ManageActivitiesPresentationController.prototype.fetchManageBeneficiarySuccessCallBack = function(response) {
        var viewProperties = {};
        var processedRecipientArray = [];
        var paginationManager = applicationManager.getPaginationManager();
        processedRecipientArray = this.filterBeneficiariesBasedOnPermissions(response)

        if (processedRecipientArray.length > 0) {
            paginationManager.updateT24PaginationValues();
            this.records = response;
            viewProperties.noOfRecords = paginationManager.getT24PaginationValues(this.manageBeneficiaryConfig);
            viewProperties.manageBeneficiary = processedRecipientArray;
        } else {
            viewProperties.noBeneficiaries = true;
        }
        this.hideProgressBar();
        this.showView(frmManageBeneficiaries, viewProperties);
    };
    ManageActivitiesPresentationController.prototype.filterBeneficiariesBasedOnPermissions = function(response) {
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
     * used to show manage beneficiaries error schenario
     * @param {object} res error object
     */
    ManageActivitiesPresentationController.prototype.fetchManageBeneficiaryErrorCallBack = function(response) {
        this.hideProgressBar();        
        this.showView({"appName": "TransfersMA","friendlyName": frmManageBeneficiaries}, {
            "serverError": response.errorMessage
        });

    };
    /**
     * fetches the previous beneficiaries
     */
    ManageActivitiesPresentationController.prototype.fetchPreviousBeneficiaries = function() {
        applicationManager.getPaginationManager().getPreviousPage();
        this.fetchManageBeneficiary();
    };
    /**
     * fetches the next beneficiaries
     */
    ManageActivitiesPresentationController.prototype.fetchNextBeneficiaries = function() {
        applicationManager.getPaginationManager().getNextPage();
        this.fetchManageBeneficiary();
    };
    /**
     * search Beneficiaries with some keyword.
     * @param {object}  data search string
     */
    ManageActivitiesPresentationController.prototype.searchBeneficiaries = function(data, records) {
        this.showProgressBar();
        var self = this;
        var viewProperties = {};
        if (data && data.searchKeyword.length > 0) {
            var query = data.searchKeyword;
            var results = this.records.filter(function(record) {
                return (record["nickName"] && record["nickName"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["beneficiaryName"] && record["beneficiaryName"].toUpperCase().indexOf(query.toUpperCase()) !== -1) ||
                    (record["accountNumber"] && record["accountNumber"].toUpperCase().indexOf(query.toUpperCase()) !== -1 ||
                        (record["swiftCode"] && record["swiftCode"].toUpperCase().indexOf(query.toUpperCase()) !== -1) ||
                        (record["bankName"] && record["bankName"].toUpperCase().indexOf(query.toUpperCase()) !== -1));
            });
            if (results.length === 0) {
                viewProperties.noResults = true
            } else {
                viewProperties.noResults = false
            }
            viewProperties.manageBeneficiary = results;
            viewProperties.searchvisibility = true;
            viewProperties.searchKeyword = data.searchKeyword
        } else {
            viewProperties.searchvisibility = false;
        }
        this.showView(frmManageBeneficiaries, viewProperties);
    };
    /**
     * keyword search beneficiary success callback
     */
    ManageActivitiesPresentationController.prototype.fetchBeneficiaryListSuccessCallBack = function(searchInputs, response) {
        var dataModel = {};
        dataModel.managePayee = response;
        dataModel.searchvisibility = true;
        applicationManager.getNavigationManager().updateForm({
            "managePayee": dataModel
        }, frmManageBeneficiaries);
        this.hideProgressBar();
    };
    /**
     * keyword search beneficiary failure callback
     * @param {object} response response
     */
    ManageActivitiesPresentationController.prototype.fetchBeneficiaryListFailureCallBack = function(response) {
        this.showView({"appName": "TransfersMA","friendlyName": frmManageBeneficiaries}, {
            "serverError": response.errorMessage
        });
        this.hideProgressBar();
    };
    /**
     * Method to call delete Command Handler to delete biller in manage payee.
     * @param {object} request delete object
     * @param {string} deleted beneficiary name
     */
    ManageActivitiesPresentationController.prototype.deleteBeneficiary = function(request, beneficiaryName) {
        this.showProgressBar();
        applicationManager.getRecipientsManager().deleteABenificiary(request, this.updateDeleteBeneficiarySuccessCallBack.bind(this, beneficiaryName), this.updateDeleteBeneficiaryErrorCallBack.bind(this));
    };
    /**
     * sucess callback for delete beneficiary
     * @param {object} response success reponse
     */
    ManageActivitiesPresentationController.prototype.updateDeleteBeneficiarySuccessCallBack = function(beneficiaryName,response) {
        var self = this;
        if(response){
          response["beneficiaryName"] = beneficiaryName;
        }
      	self.showView({"appName": "TransfersMA","friendlyName": frmManageBeneficiaries}, {
            "deleteResponse": response
        });
      	self.fetchManageBeneficiary();
    };
    /**
     * error callback fordelete beneficiary
     * @param {object} response error response
     */
    ManageActivitiesPresentationController.prototype.updateDeleteBeneficiaryErrorCallBack = function(response) {
        this.hideProgressBar();
        this.showView({"appName": "TransfersMA","friendlyName": frmManageBeneficiaries}, {
            "serverError": response.errorMessage
        });
    };

    /**
     * Method to call delete Command Handler to delete biller in manage payee.
     * @param {object} request delete object
     */
    ManageActivitiesPresentationController.prototype.cancelPayment = function(transaction) {
        this.showProgressBar();
        //this.checkTransactionDeletionType(transaction);
        applicationManager.getTransactionManager().deleteTransaction({
            frequencyType: transaction.frequencyType,
            transactionId: transaction.transactionId,
            transactionType: transaction.transactionType
        }, this.updateCancelPaymentSuccessCallBack.bind(this), this.updateCancelPaymentErrorCallBack.bind(this));
    };
    ManageActivitiesPresentationController.prototype.checkTransactionDeletionType = function(data) {
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
    ManageActivitiesPresentationController.prototype.updateCancelPaymentSuccessCallBack = function(response) {
        var self = this;
        self.fetchScheduledPayments();
    };
    /**
     * error callback fordelete beneficiary
     * @param {object} response error response
     */
    ManageActivitiesPresentationController.prototype.updateCancelPaymentErrorCallBack = function(response) {
        this.hideProgressBar();
        this.showView({"appName": "TransfersMA","friendlyName": frmScheduledPaymentsEur}, {
            "serverError": response.errorMessage
        });
    };
    /**
     * used to show the Transfer Page and executes the particular Page.
     * @param {string} frm  used to load the form
     * @param {object}  data  used to load the particular form and having key value pair.
     */
    ManageActivitiesPresentationController.prototype.showView = function(frm, data) {
      if (kony.application.getCurrentForm().id !== frm) {
        applicationManager.getNavigationManager().navigateTo(frm);
        // var obj = {
        //   "context": this,
        //   "callbackModelConfig":{"frm":frm, "UIModule":"ManageActivitiesUIModule","appName": "TransfersMA" }
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
    ManageActivitiesPresentationController.prototype.updateView = function(frm, data) {
        if (data) {
            applicationManager.getNavigationManager().updateForm(data, frm);
        }
    };
    ManageActivitiesPresentationController.prototype.showProgressBar = function() {
        applicationManager.getNavigationManager().updateForm({
            isLoading: true
        },kony.application.getCurrentForm().id);
    };
    ManageActivitiesPresentationController.prototype.hideProgressBar = function() {
        applicationManager.getNavigationManager().updateForm({
            isLoading: false
        },kony.application.getCurrentForm().id);
    };
    /**
     * Method to send transaction data to confirmation screen
     * @param {object} data - object containing transaction data
     */
    ManageActivitiesPresentationController.prototype.showConfirmation = function(data) {
        this.showView({"appName": "TransfersMA","friendlyName": frmConfirmEuro}, {
            "confirmDetails": data
        });
    };
  
    /**
     * Method to reset the value to fetch the Scheduled Payments
     */
    ManageActivitiesPresentationController.prototype.getScheduledPayments = function(data) {
        applicationManager.getNavigationManager().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": frmScheduledPaymentsEur
            }
          );
    };
    /**
     * Method to fetch Scheduled Payments
     * @param  {object} data object of which Scheduled Payments are fetched
     */
    ManageActivitiesPresentationController.prototype.fetchScheduledPayments = function(data) {
        this.showProgressBar();
        applicationManager.getTransactionManager().fetchScheduledUserTransactions({}, this.fetchScheduledPaymentsSuccess.bind(this), this.fetchScheduledPaymentsFailure.bind(this));
    };
    /**
     * Fetch Scheduled Payments Success Callback
     * @param  {object} response object having Scheduled Payments data
     */
    ManageActivitiesPresentationController.prototype.fetchScheduledPaymentsSuccess = function(response) {
        var viewProperties = {};
        if (response.length > 0) {
            viewProperties.scheduledPayments = response;
        } else {
            viewProperties.noScheduledPayment = true;
        }
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm(viewProperties,frmScheduledPaymentsEur);
    };
    /**
     * Fetch Scheduled Payments Failure Callback
     * @param  {object} response object which comes from service when the service fails
     */
    ManageActivitiesPresentationController.prototype.fetchScheduledPaymentsFailure = function(response) {
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm({
            "serverError": response
        },frmScheduledPaymentsEur);
    };
    /**
     * Method to reset the value to fetch the Past Payments
     */
    ManageActivitiesPresentationController.prototype.getPastPayments = function(sortingData) {
        applicationManager.getNavigationManager().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": frmPastPaymentsEur
            }
          );
        //this.fetchPastPayments(sortingData);
    };
    /**
     * Method to fetch Past Payments
     * @param  {object} data object of which Past Payments are fetched
     */
    ManageActivitiesPresentationController.prototype.fetchPastPayments = function(data) {
        this.showProgressBar();
        var params = {
            "firstRecordNumber": "0",
            "lastRecordNumber": "1000"
        };
        applicationManager.getTransactionManager().fetchUserRecentTransactions(params, this.fetchPastPaymentsSuccess.bind(this), this.fetchPastPaymentsFailure.bind(this));
    };
    /**
     * Fetch Past Payments Success Callback
     * @param  {object} response object having Past Payments data
     */
    ManageActivitiesPresentationController.prototype.fetchPastPaymentsSuccess = function(response) {
        var viewProperties = {};
        if (response.length > 0) {
            viewProperties.pastPayments = response;
        } else {
            viewProperties.noPastPayment = true;
        }
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm(viewProperties,frmPastPaymentsEur);
    };
    /**
     * Fetch Past Payments Failure Callback
     * @param  {object} response object which comes from service when the service fails
     */
    ManageActivitiesPresentationController.prototype.fetchPastPaymentsFailure = function(response) {
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm({
            "serverError": response
        },frmPastPaymentsEur);
    };
    /**
     * Fetch the previous page Past Payments
     */
    ManageActivitiesPresentationController.prototype.fetchPreviousPastPayments = function() {
        applicationManager.getPaginationManager().getPreviousPage();
        this.fetchPastPayments();
    };
    /**
     * Fetch the next page Past Payments
     */
    ManageActivitiesPresentationController.prototype.fetchNextPastPayments = function() {
        applicationManager.getPaginationManager().getNextPage();
        this.fetchPastPayments();
    };
    ManageActivitiesPresentationController.prototype.editTransaction = function(transferData) {
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
        editTransactionobject.frequencyEndDate = this.convertDateFormat(transferData.endOnDate);
        editTransactionobject.scheduledDate = this.convertDateFormat(transferData.sendOnDate);
        editTransactionobject.transactionDate = this.convertDateFormat(transferData.sendOnDate);
        editTransactionobject.transactionCurrency = transferData.transactionCurrency;
        editTransactionobject.transactionsNotes = transferData.paymentReference;
        editTransactionobject.toAccountName = transferData.toAccount.beneficiaryName
        editTransactionobject.toAccountNumber = transferData.toAccount.accountNumber || transferData.toAccount.accountID;
        this.editTransferBasedOnType(editTransactionobject, transferData);
    };
    ManageActivitiesPresentationController.prototype.editTransferBasedOnType = function(data, transferData) {
        var mfaManager = applicationManager.getMFAManager();
        var transactionManager = applicationManager.getTransactionManager();
        var successCallBack = this.editTransactionSuccess.bind(this);
        var errorCallback = this.editTransactionError.bind(this, data);
        // var transformedData =  this.transformData(data);

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
    ManageActivitiesPresentationController.prototype.isValidIBAN = function(iban, frm) {
        this.showProgressBar();
        var params = {
            "IBAN": iban
        };
        applicationManager.getRecipientsManager().checkValidIBAN(params, this.isValidIBANSuccess.bind(this, frm), this.isValidIBANFailure.bind(this, frm));
    };
    /**
     * IBAN valid checker service Success Callback
     * @param {Object} response object containing isIBANValid key
     */
    ManageActivitiesPresentationController.prototype.isValidIBANSuccess = function(frm, response) {
        if (response.isIBANValid === "YES") {
            this.fetchBIC(response.IBAN, frm);
        } else {
            this.hideProgressBar();
        }
    };
    /**
     * IBAN valid checker service Failure Callback
     * @param {Object} response object which comes from service when the service fails
     */
    ManageActivitiesPresentationController.prototype.isValidIBANFailure = function(frm, response) {
        this.hideProgressBar();
        this.showView({"appName": "TransfersMA","friendlyName": frm}, {
            "serverError": response.errmsg
        });
    };
    /**
     * Method to fetch beneficiary name using service call
     * @param {String} iban - value to be checked
     */
    ManageActivitiesPresentationController.prototype.getBeneficiaryName = function(accountNumber, frm) {
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
    ManageActivitiesPresentationController.prototype.getBeneficiaryNameSuccess = function(frm, response) {

        this.hideProgressBar();
        this.showView({"appName": "TransfersMA","friendlyName": frm}, {
            "beneficiaryName": response
        });

    };
    /**
     * fetch beneficiary name service Failure Callback
     * @param {Object} response object which comes from service when the service fails
     */
    ManageActivitiesPresentationController.prototype.getBeneficiaryNameFailure = function(frm, response) {
        this.hideProgressBar();
        this.showView({"appName": "TransfersMA","friendlyName": frm}, {
            "transferError": response.errorMessage
        });
    };
    /**
     * Method to fetch BIC for a valid IBAN
     * @param {String} iban valid IBAN value of which BIC details to be fetched
     */
    ManageActivitiesPresentationController.prototype.fetchBIC = function(iban, frm) {
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
    ManageActivitiesPresentationController.prototype.fetchBICSuccess = function(frm, response) {
        this.hideProgressBar();
        this.showView({"appName": "TransfersMA","friendlyName": frm}, {
            "BICdetails": response
        });
    };
    /**
     * Fetch BIC service Failure Callback
     * @param {Object} response object which comes from service when the service fails
     */
    ManageActivitiesPresentationController.prototype.fetchBICFailure = function(frm, response) {
        this.hideProgressBar();
        this.showView({"appName": "TransfersMA","friendlyName": frm}, {
            "serverError": response.errmsg
        });
    };
    /**
     * Fetch Account Due Bqalance using account details call.
     * @param {Object} account object which comes from service when the service fails
     */
    ManageActivitiesPresentationController.prototype.fetchAmountDueBalance = function(account) {
        this.showProgressBar();
        var params = {
            "accountID": account.accountID
        };
        applicationManager.getAccountManager().fetchAccountDetails(params, this.fetchAmountDueBalanceSuccess.bind(this), function() {});


    };

    ManageActivitiesPresentationController.prototype.fetchAmountDueBalanceSuccess = function(response) {
        var accountDetails = response[0];
        this.showView({"appName": "TransfersMA","friendlyName": frmMakePayment}, {
            "accountDetails": accountDetails
        })
        this.hideProgressBar();
    };
    /**
     * Method to get the bank date
     * @param {object} transactionObj - object containing transaction data
     * @param {function} callback call to set bank date in form
     */
    ManageActivitiesPresentationController.prototype.getBankDate = function (transactionObj, callback) {
        applicationManager.getRecipientsManager().fetchBankDate({}, this.getBankDateSuccess.bind(this, transactionObj, callback), this.getBankDateFailure.bind(this, transactionObj, callback));
    };
    /**
     * get bank date Success Callback
     * @param {object} transactionObj - object containing transaction data
     * @param {function} callback call to set API bank date in form
     * @param {Object} response object containing bank date
     */
    ManageActivitiesPresentationController.prototype.getBankDateSuccess = function (transactionObj, callback, response) {
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
    ManageActivitiesPresentationController.prototype.getBankDateFailure = function (transactionObj, callback, response) {
        transactionObj['bankDate'] = true;
        callback(transactionObj);
    };

    ManageActivitiesPresentationController.prototype.validateCallbackError = function(transferData, response) {
        this.hideProgressBar();
        this.showTransferScreen({
            context: transferData.isOwnAccount ? "MakePaymentOwnAccounts" : "MakePayment",
            modifyTransaction: transferData,
            errorMessage: response.serverErrorRes
        });

    };

    ManageActivitiesPresentationController.prototype.searchAllSwiftBICCode = function(searchData, locationFrom) {
        frmFrom = locationFrom;
        var recipientsManager = applicationManager.getRecipientsManager();
        var criteria = searchData;
        //   this.searchSwiftData=searchData;
        recipientsManager.searchAllSwiftBICCode(criteria, this.searchAllSwiftBICCodePresentationSuccessCallBack.bind(this), this.searchAllSwiftBICCodeErrorCallBack.bind(this));
    };


    ManageActivitiesPresentationController.prototype.searchAllSwiftBICCodePresentationSuccessCallBack = function(succRes) {
        var controller = applicationManager.getPresentationUtility().getController(frmFrom, true);
        controller.setSegmentData(succRes.swiftCodes);
    };

    ManageActivitiesPresentationController.prototype.searchAllSwiftBICCodeErrorCallBack = function(response) {
        this.hideProgressBar();
        if (frmFrom === "frmMakePayment") {
            this.showTransferScreen({
                context: transferData.isOwnAccount ? "MakePaymentOwnAccounts" : "MakePayment",
                modifyTransaction: transferData,
                errorMessage: response.errorMessage
            });
        } else {
            this.showView({"appName": "TransfersMA","friendlyName": frmAddBeneficiaryEuro}, {
                "serverError": response.errorMessage
            });
        }
    };
    ManageActivitiesPresentationController.prototype.getDirectDebits = function() {
        applicationManager.getNavigationManager().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": frmDirectDebitsEur
            }
          );
    };

    ManageActivitiesPresentationController.prototype.getContracts = function(data) {
        this.showProgressBar();
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.fetchContractDetails(data.feature, this.getContractsSuccess.bind(this, data), this.getContractsError.bind(this));
    };

    ManageActivitiesPresentationController.prototype.getContractsSuccess = function(data, contracts) {
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm({
            "contracts": contracts,
            "data": data
        },frmAddBeneficiaryEuro);
    };

    ManageActivitiesPresentationController.prototype.getContractsError = function(response) {
        this.hideProgressBar();
        this.showView({"appName": "TransfersMA","friendlyName": frm}, {
            "serverError": response.errmsg
        });
    };

    ManageActivitiesPresentationController.prototype.getOperationName = function() {
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

    ManageActivitiesPresentationController.prototype.filterToAccountsByMembershipId = function(membershipId, toAccounts) {
        return applicationManager.getRecipientsManager().filterToAccountsByMembershipId(membershipId, toAccounts)
    };
  	ManageActivitiesPresentationController.prototype.filterCreditCardAccount = function(accountType, toAccounts) {
        return applicationManager.getRecipientsManager().filterCreditCardAccount(accountType, toAccounts)
    };
    ManageActivitiesPresentationController.prototype.loadTransactionForm = function(param, transactionObj) {
        this.loadAccounts(param, this.updateView.bind(this, frmMakePayment));
        this.showView({"appName": "TransfersMA","friendlyName": frmMakePayment}, transactionObj);
    };
    ManageActivitiesPresentationController.prototype.downloadReport = function(transactionObj) {
        this.showProgressBar();
        let params = {
            "transactionType": transactionObj.frequencyType || transactionObj.frequency,
            "transactionId": transactionObj.transactionId ||  transactionObj.referenceId,
            "contentType": "pdf"
        };
        var fileUrl =  applicationManager.getTransactionManager().DownloadTransactionPDF(params)
        kony.application.openURL(fileUrl);
        this.hideProgressBar();
    };
      
    ManageActivitiesPresentationController.prototype.downloadReport = function(transactionObj,frm) {
        this.showProgressBar();
        let params = {
            "transactionType": transactionObj.frequencyType || transactionObj.frequency,
            "transactionId": transactionObj.transactionId ||  transactionObj.referenceId,
            "contentType": "pdf"
        };
        applicationManager.getTransactionManager().DownloadTransactionPDF(params, this.downloadReportSuccess.bind(this),this.downloadReportFailure.bind(this,frm));
    };
  	ManageActivitiesPresentationController.prototype.downloadReportSuccess = function(response){
    	var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url;
   		var fileUrl = mfURL + "/objects/DownloadTransactionPDF?fileId=" + response.fileId;
    	kony.application.openURL(fileUrl);
    	this.hideProgressBar();
  	};
  	ManageActivitiesPresentationController.prototype.downloadReportFailure = function(frm,response){
      	this.hideProgressBar();
        this.showView(frm, {
            "downloadError": response
        });
    }
    return ManageActivitiesPresentationController;
});