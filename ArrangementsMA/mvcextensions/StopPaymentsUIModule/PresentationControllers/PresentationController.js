/**
 * StopPayments Presenation to handle all check related functionalties
 * @module StopPaymentsPresentationController
 */
define(['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
    /**
     * Stop payements Presenation to handle all check related activities
     * @class
     * @alias module:StopPaymentsPresentationController
     */
    function StopPaymentsPresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
        this.initializePresentationController();
        scope_ChequePresentationController = this;
        scope_StopChequeRequestsPresentationController = this;
        scope_MyChequePresentationController = this;
        scope_ChequePresentationController.uniqueChequeIssueIdResponse = "";
        scope_ChequePresentationController.fees = "";
        scope_ChequePresentationController.chequeId = "";
        scope_ChequePresentationController.leavesCount = "";
        scope_ChequePresentationController.currencyCode = "";
        scope_ChequePresentationController.address = "";
        scope_ChequePresentationController.chequeIssueId = "";
        scope_ChequePresentationController.accountNumber = "";
        scope_ChequePresentationController.currencySymbol = "";
    }
    inheritsFrom(StopPaymentsPresentationController, kony.mvc.Presentation.BasePresenter);
    /**
     * initializePresentationController - Method to intialize Presentation controller data , called by constructor
     * @param {Object} dataInputs - dataInputs to configure Presentation controller. (optional) - useful when we need to customize.
     */
    StopPaymentsPresentationController.prototype.getAccountDeatilsAllAccounts = function() {
        var internalAccounts = applicationManager.getAccountManager().getInternalAccounts();
        if (internalAccounts) {
            applicationManager.getNavigationManager().updateForm({
                accountList: internalAccounts
            }, "frmStopPayments");
        } else {
            this.showOnServerError();
        }
    };

    StopPaymentsPresentationController.prototype.showAccountDetails = function(account) {
        if (account) {
            currentAccount = account;
        }
        if (applicationManager.getConfigurationManager().getConfigurationValue('isAccountDetailsServiceConfigured') == "false") {
            //this.showSelectedAccountTransaction(currentAccount);
          new kony.mvc.Navigation({"appName" : "ArrangementsMA", "friendlyName" : "StopPaymentsUIModule/frmStopPayments"}).navigate();
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true
                }
            }, "frmStopPayments");
            this.getAccountDeatilsAllAccounts();

        }
    };
    StopPaymentsPresentationController.prototype.initializePresentationController = function(dataInputs) {
        var scopeObj = this;
        scopeObj.viewFormsList = {
            frmStopPayments: 'frmStopPayments'
        };
        //Handling loading progreebar
        scopeObj.totalServiceModels = 0; //flag to wait for models from service
        scopeObj.tmpSerViewModels = []; //array to store models from service
        scopeObj.serverErrorVieModel = 'serverError';
        scopeObj.serviceViewModels = {
            frmStopPayments: []
        };
        scopeObj.activeForm = scopeObj.viewFormsList.frmStopPayments;
        var stopReasonsList = applicationManager.getConfigurationManager().getStopReasons();
        scopeObj.checkRequestReasons = stopReasonsList;






        scopeObj.disputeTransactionRequestReasons = [
            kony.i18n.getLocalizedString("i18n.StopPayments.disputeTransaction.dontRecognise"),
            kony.i18n.getLocalizedString("i18n.StopPayments.disputeTransaction.GoodsAndService"),
            kony.i18n.getLocalizedString("i18n.StopPayments.disputeTransaction.duplicate"),
            kony.i18n.getLocalizedString("i18n.StopPayments.disputeTransaction.recurringTransaction"),
            kony.i18n.getLocalizedString("i18n.StopCheckPayments.BillingError"),
            kony.i18n.getLocalizedString("i18n.StopPayments.checkRequest.Others")
        ];
        //Stop check request sort config
        scopeObj.stopChekRequestsConfig = {
            'sortBy': 'transactionDate',
            'defaultSortBy': 'transactionDate',
            'order': OLBConstants.DESCENDING_KEY,
            'defaultOrder': OLBConstants.DESCENDING_KEY
        };
        scopeObj.disputedTransactionRequestsConfig = {
            'sortBy': 'disputeDate',
            'defaultSortBy': 'disputeDate',
            'order': OLBConstants.DESCENDING_KEY,
            'defaultOrder': OLBConstants.DESCENDING_KEY
        };
        scopeObj.navManager = applicationManager.getNavigationManager();
        scopeObj.accountManager = applicationManager.getAccountManager();
        scopeObj.transactionManager = applicationManager.getTransactionsListManager();
        scopeObj.paginationManager = applicationManager.getPaginationManager();
    };
    /**
     * showStopPayments : Entry point for Stop payment form
     * @param {object} dataInputs, required object to show specific view
     */
    StopPaymentsPresentationController.prototype.showStopPayments = function(dataInputs) {
        var scopeObj = this;
        scopeObj.activeForm = scopeObj.viewFormsList.frmStopPayments;
        scopeObj.navManager.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : scopeObj.viewFormsList.frmStopPayments});
        if (dataInputs && dataInputs.show) {
            switch (dataInputs.show) {
                case OLBConstants.ACTION.SHOW_STOPCHECKS_FORM:
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showStopChecksForm(dataInputs);
                    break;
                case OLBConstants.ACTION.REQUEST_CHEQUE_BOOK:
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showRequestChequeBookForm(dataInputs);
                    break;
                case OLBConstants.ACTION.REQUEST_CHEQUE_BOOK_FORM:
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showRequestChequeBookForm(dataInputs);
                    break;
                case OLBConstants.ACTION.SHOW_DISPUTE_TRANSACTION_FORM:
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showDisputeTransaction(dataInputs.data);
                    break;
                case OLBConstants.DISPUTED_CHECKS:
                    dataInputs.selectTab = OLBConstants.DISPUTED_CHECKS
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showMyRequests(dataInputs);
                    break;
                case OLBConstants.MY_CHEQUES:
                    dataInputs.selectTab = OLBConstants.MY_CHEQUES
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showMyRequests(dataInputs);
                    break;
                case OLBConstants.ACTION.VIEW_MYCHEQUES_FORM:
                    dataInputs.selectTab = OLBConstants.MY_CHEQUES
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showMyRequests(dataInputs);
                    break;
                case OLBConstants.DISPUTED_TRANSACTIONS:
                    dataInputs.selectTab = OLBConstants.DISPUTED_TRANSACTIONS
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showMyRequests(dataInputs);
                    break;
                default: //Default form view
                    dataInputs.selectTab = OLBConstants.DISPUTED_TRANSACTIONS
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showMyRequests(dataInputs);
            }
        } else {
            dataInputs = dataInputs || {};
            dataInputs.selectTab = OLBConstants.DISPUTED_TRANSACTIONS
            dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
            scopeObj.showMyRequests(dataInputs);
        }
    };
    /**
     * used to update the form with some data.
     * @param {string} frm form to be updated 
     * @param {object}  data data to be set in the form
     */
    StopPaymentsPresentationController.prototype.updateView = function(frm, data) {
        if (data) {
            applicationManager.getNavigationManager().updateForm(data, frm);
        }
    };
    /**
     * Method to get the bank date
     * @param {function} callback call to set bank date in form 
     */
    StopPaymentsPresentationController.prototype.getBankDate = function(callback) {
        applicationManager.getRecipientsManager().fetchBankDate({}, this.getBankDateSuccess.bind(this, callback), this.getBankDateFailure.bind(this, callback));
    };
    /**
     * get bank date Success Callback
     * @param {function} callback call to set API bank date in form 
     * @param {Object} response object containing bank date
     */
    StopPaymentsPresentationController.prototype.getBankDateSuccess = function(callback, response) {
        this.bankDate = response.date[0];
        callback({
            'bankDate': response.date[0]
        });
    };
    /**
     * get bank date Failure Callback
     * @param {function} callback call to set server bank date in form 
     * @param {Object} response object containing failure message
     */
    StopPaymentsPresentationController.prototype.getBankDateFailure = function(callback, response) {
        callback({
            'bankDate': true
        });
    };
    /**
     * presentStopPayments : Update stop payments form
     * @param {Object} viewModel, view model for stop payments
     */
    StopPaymentsPresentationController.prototype.presentStopPayments = function(viewModel) {
        var scopeObj = this;
        if (viewModel.stopCheckRequestsViewModel && viewModel.stopCheckRequestsViewModel.stopchecksRequests && viewModel.stopCheckRequestsViewModel.stopchecksRequests.length) {
            viewModel.stopCheckRequestsViewModel.stopchecksRequests.forEach(function(stopchecksRequest, index) {
                if (!stopchecksRequest.payeeName) {
                    viewModel.stopCheckRequestsViewModel.stopchecksRequests[index].payeeName = "";
                }
            });
        }
        scopeObj.navManager.updateForm(viewModel, scopeObj.viewFormsList.frmStopPayments);
        scopeObj.updateLoadingForCompletePage(viewModel);
    };
    /**
     * presentMyCheques : Update stop payments form
     * @param {Object} viewModel, view model for stop payments
     */
    StopPaymentsPresentationController.prototype.presentMyCheques = function(viewModel) {
        var scopeObj = this;
        if (viewModel.myChequesViewModel && viewModel.myChequesViewModel.stopMyChequeRequests && viewModel.myChequesViewModel.stopMyChequeRequests.length) {
            viewModel.myChequesViewModel.stopMyChequeRequests.forEach(function(stopchecksRequest, index) {
                if (!stopMyChequeRequests.payeeName) {
                    viewModel.myChequesViewModel.stopMyChequeRequests[index].payeeName = "";
                }
            });
        }
        scopeObj.navManager.updateForm(viewModel, scopeObj.viewFormsList.frmStopPayments);
        scopeObj.updateLoadingForCompletePage(viewModel);
    };
    /**
     * Method to handle Progress bar
     * @param {boolean} isLoading , loading flag true.false
     */
    StopPaymentsPresentationController.prototype.updateProgressBarState = function(isLoading) {
        var scopeObj = this;
        scopeObj.navManager.updateForm({
            "progressBar": isLoading
        }, scopeObj.activeForm);
    };
    /**
     * updateLoadingForCompletePage : Method to handle loading progress bar w.r.t expected view models.
     * @param {Object}  viewModel ,  form view model
     */
    StopPaymentsPresentationController.prototype.updateLoadingForCompletePage = function(viewModel) {
        var scopeObj = this;
        if (viewModel.isLoading === true) {
            scopeObj.tmpSerViewModels = viewModel.serviceViewModels;
            scopeObj.totalServiceModels = 0;
            scopeObj.updateProgressBarState(true);
        } else {
            if (scopeObj.isServiceViewModel(viewModel, scopeObj.tmpSerViewModels)) {
                scopeObj.totalServiceModels++;
            }
            if (scopeObj.totalServiceModels === scopeObj.tmpSerViewModels.length) {
                scopeObj.updateProgressBarState(false);
                scopeObj.totalServiceModels = 0;
            }
        }
    };
    /**
     * isServiceViewModel  Method to validate service view models.
     * @param {Object} viewModel   form view model
     * @param {Array} serviceViewModels expected serice view models.
     * @returns {object} object
     */
    StopPaymentsPresentationController.prototype.isServiceViewModel = function(viewModel, serviceViewModels) {
        var scopeObj = this;
        return Object.keys(viewModel).filter(function(key) {
            return serviceViewModels.indexOf(key) >= 0 || key === scopeObj.serverErrorVieModel; //include server error as expected
        }).length > 0;
    };
    /**
     * onServerError : Method to handle server errors.
     * @param {object} data - Service error object
     */
    StopPaymentsPresentationController.prototype.onServerError = function(data) {
        var scopeObj = this;
        if (scopeObj.activeForm) {
            scopeObj.navManager.updateForm({
                serverError: data
            }, scopeObj.activeForm);
            scopeObj.updateLoadingForCompletePage({
                serverError: data
            });
        }
    };
    /**
     * fetchAccounts: fetches accounts using Command - 'com.kony.StopPayments.getAccounts'
     * @param {function} onSuccess , success callback
     * @param {function} onError , error callback
     */
    StopPaymentsPresentationController.prototype.fetchAccounts = function(onSuccess, onError) {
        var scopeObj = this;
        scopeObj.accountManager.fetchInternalAccounts(scopeObj.fetchInternalAccountsSuccessCallBack.bind(scopeObj, onSuccess),
            scopeObj.fetchInternalAccountsFailureCallBack.bind(scopeObj, onError));
    };
    /**
     * used to handels the fetchInternalAccounts success schenario
     * @param {function} onSuccess onSuccess
     * @param {object} response response
     */
    StopPaymentsPresentationController.prototype.fetchInternalAccountsSuccessCallBack = function(onSuccess, response) {
        onSuccess(response)
    };
    /**
     * used to handels the fetchInternalAccounts success schenario
     * @param {function} onError onError
     * @param {object} response response
     */
    StopPaymentsPresentationController.prototype.fetchInternalAccountsFailureCallBack = function(onError, response) {
        onError(response);
    };
    /****************************************************************************************************************************
     * Stop Payments : Dispute transaction details
     ****************************************************************************************************************************/
    /**
     * showDisputeTransactionRequests: Method to show My Requests Disputed transaction request
     * @param {object} dataInputs config
     */
    StopPaymentsPresentationController.prototype.showDisputeTransactionRequests = function(dataInputs) {
        var scopeObj = this;
        dataInputs = dataInputs || {};
        scopeObj.paginationManager.resetValues();
        scopeObj.paginationManager.getValues(scopeObj.disputedTransactionRequestsConfig, dataInputs);
        var transMan = applicationManager.getTransactionsListManager();
        var transObj = transMan.getTransactionObject();
        var accountsList = this.getAccounts();
        if(accountsList && accountsList.length>0){
        var criteria = {
            "offset": 0,
            "limit": "",
            "sortBy": "transactionDate",
            "order": "desc",
            "paginationRowLimit": 10,
            "transactionType": "StopCheckPaymentRequest",
            "accountID": accountsList[0].accountID
        };
        transMan.getStopCheckPaymentRequestTransactions(criteria, scope_StopChequeRequestsPresentationController.getStopChequeRequestSuccess, scope_StopChequeRequestsPresentationController.getTransactionsError);
        } else{
            applicationManager.getNavigationManager().updateForm({
                emptyAccounts:accountsList
            },"frmStopPayments");
        }
    };



    /** @param {function} onError onError
     */
    StopPaymentsPresentationController.prototype.getViewRequestsDisputedTransactions = function(onSuccess, onError) {
        var scopeObj = this;
        scopeObj.updateLoadingForCompletePage({
            isLoading: true,
            serviceViewModels: ['viewDisputedRequestsResponse']
        });
        var dataInputs = applicationManager.getPaginationManager().getValues(scopeObj.disputedTransactionRequestsConfig);
        dataInputs.transactionType = OLBConstants.TRANSACTION_TYPE.DISPUTEDTRANSACTIONSREQUEST;
        scopeObj.transactionManager.getDisputedTransactions(dataInputs, scopeObj.getDisputedTransactionsSuccessCallBack.bind(scopeObj, onSuccess),
            scopeObj.getDisputedTransactionsFailureCallBack.bind(scopeObj, onError));
    };
    /**
     * get View RequestsDisputedTransactions success schenario
     * @param {function} onSuccess onSuccess
     * @param {object} response response
     */
    StopPaymentsPresentationController.prototype.getDisputedTransactionsSuccessCallBack = function(onSuccess, response) {
        var scopeObj = this;
        var dataInputs = applicationManager.getPaginationManager().getValues(scopeObj.disputedTransactionRequestsConfig);
        dataInputs.transactionType = OLBConstants.TRANSACTION_TYPE.DISPUTEDTRANSACTIONSREQUEST;
        response.config = dataInputs;
        onSuccess(response);
    };
    /**
     * get View RequestsDisputedTransactions success schenario
     * @param {function} onError onError
     * @param {object} response response
     */
    StopPaymentsPresentationController.prototype.getDisputedTransactionsFailureCallBack = function(onError, response) {
        onError(response);
    };
    /**
     * onDisputeTransactionRequestsSuccess: Methods that excutes as success callback for getViewRequestsDisputedTransactions
     * @param {object} responseData responseData
     */
    StopPaymentsPresentationController.prototype.onDisputeTransactionRequestsSuccess = function(responseData) {
        var scopeObj = this;
        if (responseData) {
            scopeObj.presentStopPayments({
                'viewDisputedRequestsResponse': {
                    "stopDisputedRequests": scopeObj.getDisputeRequestsViewModel(responseData),
                    "config": responseData.config
                }
            });
        } else {
            scopeObj.onServerError(responseData);
        }
    };
    /**
     * getDisputeRequestsViewModel: Methods that gets view model for dispute transactions view requests
     * @param {object} disputeViewRequests data from service
     * @returns {object} viewModel for get view requests for dispute
     */
    StopPaymentsPresentationController.prototype.getDisputeRequestsViewModel = function(disputeViewRequests) {
        var scopeObj = this;
        var disputeTransactionRequestsViewmodel = disputeViewRequests || [];
        disputeTransactionRequestsViewmodel = disputeViewRequests.map(function(requestObject) {
            var finalRequestObject = {
                disputeDate: requestObject.disputeDate === undefined || requestObject.disputeDate === null ? kony.i18n.getLocalizedString("i18n.common.none") : CommonUtilities.getFrontendDateString(requestObject.disputeDate),
                transactionDesc: requestObject.description === undefined || requestObject.description === null ? kony.i18n.getLocalizedString("i18n.common.none") : requestObject.description,
                transactionId: requestObject.transactionId,
                amount: requestObject.amount === undefined || requestObject.amount === null ? kony.i18n.getLocalizedString("i18n.common.none") : CommonUtilities.formatCurrencyWithCommas(requestObject.amount, false, requestObject.currencyCode),
                disputeStatus: requestObject.disputeStatus,
                fromAccountNumber: requestObject.fromAccountNumber,
                fromAccountNickName: requestObject.fromNickName,
                fromAccountName: requestObject.fromAccountName,
                fromAccount: CommonUtilities.getAccountDisplayName({
                    name: requestObject.fromAccountName,
                    accountID: requestObject.fromAccountNumber,
                    nickName: requestObject.fromNickName,
                    Account_id: requestObject.fromAccountNumber
                }),
                toAccountName: requestObject.toAccountName || requestObject.payPersonName || requestObject.payeeNickName || requestObject.payeeName,
                transactionDate: CommonUtilities.getFrontendDateString(requestObject.transactionDate),
                transactionType: requestObject.transactionType,
                disputeReason: requestObject.disputeReason,
                disputeDescription: requestObject.disputeDescription === undefined || requestObject.disputeDescription === null ? kony.i18n.getLocalizedString("i18n.common.none") : requestObject.disputeDescription,
                /**
                 * used to navigate the message
                 */
                onSendMessageAction: function() {
                    var alertsMsgsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsMsgsModule");
                    alertsMsgsModule.presentationController.showAlertsPage(null, {
                        show: "CreateNewMessage",
                        cancelCallback: scopeObj.showStopPayments.bind(scopeObj, {
                            show: OLBConstants.DISPUTED_TRANSACTIONS
                        })
                    });
                }
            };
            if (requestObject.disputeStatus === OLBConstants.TRANSACTION_STATUS.INPROGRESS) {
                finalRequestObject.onCancelRequest = function() {
                    scopeObj.onCancelDisputeTransactionRequest({
                        transactionId: requestObject.transactionId,
                        transactionType: requestObject.transactionType
                    });
                };
            }
            return finalRequestObject;
        });
        return disputeTransactionRequestsViewmodel;
    };
    /**
     * getdisputeTransactionReasonsListViewModel: Method  return dispute transaction reasons
     * @return {Array}, dispute transaction reasons list
     */
    StopPaymentsPresentationController.prototype.getdisputeTransactionReasonsListViewModel = function() {
        var scopeObj = this;
        return scopeObj.disputeTransactionRequestReasons.map(function(reason) {
            return {
                id: reason,
                name: reason
            };
        });
    };
    /**
     * createDisputeTransaction : Method for calling create transaction service for dispute a transaction
     * @param {object} params  params
     * @param {object} input input
     */
    StopPaymentsPresentationController.prototype.createDisputeTransaction = function(params, input) {
        var self = this;
        var dataParams = {
            "transactionId": params.transactionId,
            "disputeReason": params.disputeReason, // Platform defect for special character(ticket number 102172)
            "disputeDescription": params.disputeDescription // Platform defect for special character(ticket number 102172)
        };
        this.updateLoadingForCompletePage({
            isLoading: true,
            serviceViewModels: ['disputeTransactionResponse']
        });
        self.transactionManager.createDisputedTransaction(dataParams, self.createDisputedTransactionSuccessCallBack.bind(self, input),
            self.createDisputedTransactionFailureCallBack.bind(self));
    };
    /**
     * handels the createDisputedTransaction Success schenario
     * @param {*} input input
     * @param {*} response  response
     */
    StopPaymentsPresentationController.prototype.createDisputedTransactionSuccessCallBack = function(input, response) {
        var self = this;
        self.presentStopPayments({
            "disputeTransactionResponse": {
                data: response,
                values: input
            }
        });
    };
    /**
     * handels the createDisputedTransaction Failure schenario
     * @param {*} response  response
     */
    StopPaymentsPresentationController.prototype.createDisputedTransactionFailureCallBack = function(response) {
        var self = this;
        self.onServerError(response.data);
    };
    /**
     * showDisputeTransaction : Method to show dispute transaction pageX
     * @param {object} data transaction
     */
    StopPaymentsPresentationController.prototype.showDisputeTransaction = function(data) {
        var formatUtil = applicationManager.getFormatUtilManager();
        var transaction = data.disputeTransactionObject;
        var From = CommonUtilities.getAccountDisplayName({
            name: transaction.fromAccountName,
            accountID: transaction.fromAccountNumber,
            nickName: transaction.fromNickName,
            Account_id: transaction.fromAccountNumber
        });
        var transactionDate = formatUtil.getFormatedDateString(formatUtil.getDateObjectfromString(transaction.transactionDate, "YYYY-MM-DD HH:MM:SS"), formatUtil.getApplicationDateFormat());
        var viewModel = {
            fromAccountNumber: From,
            toAccount: transaction.payPersonName || transaction.payeeNickName || transaction.payeeName || transaction.toAccountName,
            amount: CommonUtilities.formatCurrencyWithCommas(Math.abs(transaction.amount), true),
            date: transactionDate,
            types: transaction.transactionType,
            referenceNumber: data.disputeTransactionObject.transactionId,
            notes: transaction.transactionsNotes,
            accountNumber: transaction.fromAccountNumber
        };
        this.presentStopPayments({
            disputeTransactionObject: {
                data: viewModel,
                onCancel: data.onCancel,
                /**
                 * used to navigate the accountDetails
                 */
                onBacktoAccountDetails: function() {
					applicationManager.getPresentationUtility().showLoadingScreen();
                    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"AccountsUIModule"});
                    accountsModule.presentationController.showAgainAccountsDetails(transaction.fromAccountNumber);
                }
            }
        });
    };
    /****************************************************************************************************************************
     * Stop Payments : Checks
     ****************************************************************************************************************************/
    /**
     * isCheckAccount: Method to return whether account support checks or not
     * @param {RBObjects.Account} account , account object  - RBObjects.Account.
     * @returns {boolean} is this Account support check?
     */
    StopPaymentsPresentationController.prototype.isCheckAccount = function(account) {
        return account.supportChecks && account.supportChecks === '1';
    };
    /**
     * showStopChecksForm: Method to show Stop Check request form
     * @param {object} dataInputs ,input values for pre popultated data
     */
    StopPaymentsPresentationController.prototype.showStopChecksForm = function(dataInputs) {
        var scopeObj = this;
        var asyncManager = applicationManager.getAsyncManager();
        scopeObj.updateLoadingForCompletePage({
            isLoading: true,
            serviceViewModels: ['stopChecksFormAccounts']
        });
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(scopeObj.accountManager, 'fetchInternalAccounts'),
                asyncManager.asyncItem(applicationManager.getTermsAndConditionManager(), 'fetchTermsAndConditionsPostLogin', [{
                    "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
                    "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.StopPayment_TnC
                }]),
            ],
            scopeObj.onCompletionCallback.bind(scopeObj)
        );
        scopeObj.presentStopPayments({
            'stopChecksFormData': scopeObj.getStopChecksFormViewModel(dataInputs)
        });
    };
    StopPaymentsPresentationController.prototype.showRequestChequeBookForm = function(dataInputs) {
        var scopeObj = this;
        var asyncManager = applicationManager.getAsyncManager();
        scopeObj.updateLoadingForCompletePage({
            isLoading: true,
            serviceViewModels: ['stopChecksFormAccounts']
        });
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(scopeObj.accountManager, 'fetchInternalAccounts'),

            ],
            scopeObj.onCompletionCallback1.bind(scopeObj)
        );
        scopeObj.presentStopPayments({
            'ChequeBookFormData': scopeObj.getChequeBookFormViewModel(dataInputs)
        });
    };
    StopPaymentsPresentationController.prototype.onCompletionCallback = function(syncResponseObject) {
        var scopeObj = this;
        if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
            scopeObj.onStopChecksFormAccountsSuccess(syncResponseObject.responses[0].data);
            scopeObj.getTnCOnSuccess(syncResponseObject.responses[1].data);

        } else {
            CommonUtilities.showServerDownScreen();
        }
    };
    StopPaymentsPresentationController.prototype.onCompletionCallback1 = function(syncResponseObject) {
        var scopeObj = this;
        if (syncResponseObject.responses[0].isSuccess) {
            scopeObj.onStopChecksFormAccountsSuccess(syncResponseObject.responses[0].data);
        } else {
            CommonUtilities.showServerDownScreen();
        }
    };
    StopPaymentsPresentationController.prototype.getTnCOnSuccess = function(response) {
        var scopeObj = this;
        scopeObj.presentStopPayments({
            "TnCcontent": response
        });
    };
    /**
     * onStopChecksFormAccountsSuccess: Method to handle check accounts list
     * @param {object} accounts  accounts
     */
    StopPaymentsPresentationController.prototype.onStopChecksFormAccountsSuccess = function(accountsinp) {
        var scopeObj = this;
		var chequeSupportedAccounts = [];
        var filterList = function (input) {
          try {
            let accountData = JSON.parse(JSON.stringify(input));
            let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
            return filteredAccountData;
          } catch(err){
            return input;
          }
        };
        var accounts = filterList(accountsinp);
		for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].accountType === "Checking" || accounts[i].accountType === "Savings") {
                chequeSupportedAccounts.push(accounts[i]);
            }
        }
        scopeObj.presentStopPayments({
            'stopChecksFormAccounts': scopeObj.getStopChecksFormAccountsViewModel(chequeSupportedAccounts.filter(scopeObj.isCheckAccount))
        });
    };
    /**
     * getStopChecksFormAccountsViewModel: Method to create and return Stop check form accounts view model
     * @param {Array} accounts, RBObjects.Account array
     * @return {Array} Stop check form accounts view model
     */
    StopPaymentsPresentationController.prototype.getStopChecksFormAccountsViewModel = function(accounts) {
        /**
         * create the account view
         * @param {*} account account
         * @returns {object} accounts
         */
        var createAccountsViewModal = function(account) {
            return {
                accountName: CommonUtilities.getAccountDisplayName(account),
                accountID: account.accountID,
                type: account.accountType,
                currencyCode: account.currencyCode,
                availableBalance: account.availableBalance,
                availableCredit: account.availableCredit,
                isBusinessAccount: account.isBusinessAccount,
                bankName: account.bankName,
                MembershipName: account.MembershipName,
                Membership_id: account.Membership_id,
				nickName: account.nickName
            };
        };
        return accounts.map(createAccountsViewModal);
    };
    /**
     * getStopChecksFormViewModel: Method to create and return Stop check form
     * @param {object} data, pre populated form data
     * @return {object} Stop check form view model
     */
    StopPaymentsPresentationController.prototype.getStopChecksFormViewModel = function(data) {
        var scopeObj = this;
        data = data || {};
        var isSeriesChecks = data.requestType === OLBConstants.CHECK_REQUEST_TYPES.SERIES;
        scopeObj.onCancel = data.onCancel || function() {
            scopeObj.presentStopPayments({
                "myRequests": {
                    selectTab: OLBConstants.DISPUTED_TRANSACTIONS
                }
            });
        };
        return {
            accountID: data.accountID || data.fromAccountNumber || null,
            payeeName: data.payeeName || "",
            isSeriesChecks: isSeriesChecks,
            checkNumber1: data.checkNumber1,
            checkNumber2: data.checkNumber2,
            checkDateOfIssue: data.checkDateOfIssue ? CommonUtilities.getFrontendDateString(data.checkDateOfIssue) : CommonUtilities.getFrontendDateString(kony.os.date("YYYY-MM-DD")),
            checkReason: data.checkReason,
            checkAmount: Math.abs(data.amount),
            description: data.transactionsNotes || "",
            maxDesriptionLength: OLBConstants.NOTES_MAX_LENGTH,
            maxDesripLength: OLBConstants.NOTES_MAXIMUM_LENGTH,
            showStopPaymentServiceFeesAndValidity: applicationManager.getConfigurationManager().enalbeStopPaymentServiceFeesAndValidity === "true",
            checkServiceFee: applicationManager.getConfigurationManager().checkServiceFee,
            checkServiceVality: applicationManager.getConfigurationManager().checkServiceVality,
            serviceChargableText: kony.i18n.getLocalizedString("i18n.StopPayments.ChargeableService1") + " " + applicationManager.getConfigurationManager().getCurrencyCode() + applicationManager.getConfigurationManager().checkServiceFee + " " + kony.i18n.getLocalizedString("i18n.StopPayments.ChargeableService2") + " " + applicationManager.getConfigurationManager().checkServiceVality + " " + kony.i18n.getLocalizedString("i18n.StopPayments.ThisServiceIsChargeable13"),
            onCancel: scopeObj.onCancel
        };
    };
    StopPaymentsPresentationController.prototype.getChequeBookFormViewModel = function(data) {
        var scopeObj = this;
        data = data || {};
        scopeObj.onCancel = data.onCancel || function() {
            scopeObj.presentStopPayments({
                "myRequests": {
                    selectTab: OLBConstants.DISPUTED_CHECKS
                }
            });
        };
        return {
            accountID: data.accountID || data.fromAccountNumber || null,
            onCancel: scopeObj.onCancel
        };
    };

    /**
     * stopCheckRequest: Method to create stop check request
     * @param {object} transactionModel, check request transaction object
     */
    StopPaymentsPresentationController.prototype.stopCheckRequest = function(transactionModel) {
        var scopeObj = this;
        scopeObj.updateLoadingForCompletePage({
            isLoading: true,
            serviceViewModels: ['successStopCheckRequest']
        });
        var checkRequestModel = scopeObj.createCheckRequestModel(transactionModel);
        scopeObj.transactionManager.createTransaction(checkRequestModel, scopeObj.createCheckPaymentRequestSuccessCallBack.bind(scopeObj, transactionModel),
            scopeObj.createCheckPaymentRequestFailureCallBack.bind(scopeObj));
    };

    StopPaymentsPresentationController.prototype.stopChequeRequest = function(transactionModel) {
        var scopeObj = this;
        scopeObj.updateLoadingForCompletePage({
            isLoading: true,
            serviceViewModels: ['successStopCheckRequest']
        });
        var checkRequestModel = scopeObj.createStopChequeRequestModel(transactionModel);
        scopeObj.transactionManager.createStopChequePayment(checkRequestModel, scopeObj.createStopChequePaymentRequestSuccessCallBack.bind(scopeObj, transactionModel),
            scopeObj.createStopChequePaymentRequestFailureCallBack.bind(scopeObj));
    };
    /**
     * used to handels the create check request success schenario
     * @param {object} transactionModel transaction
     * @param {object} response response
     */
    StopPaymentsPresentationController.prototype.createCheckPaymentRequestSuccessCallBack = function(transactionModel, response) {
        var scopeObj = this;
        response.fromAccountNumber = transactionModel.fromAccountNumber;
        scopeObj.onCreateStopCheckRequestSuccess(response);
    };

    StopPaymentsPresentationController.prototype.createStopChequePaymentRequestSuccessCallBack = function(transactionModel, response) {
        var scopeObj = this;
        response.fromAccountNumber = transactionModel.fromAccountNumber;
        scopeObj.onCreateStopChequeRequestSuccess(response);
    };
    /**
     * used to handels the create check request Failure schenario
     * @param {object} response response
     */
    StopPaymentsPresentationController.prototype.createCheckPaymentRequestFailureCallBack = function(response) {
        var scopeObj = this;
        scopeObj.onServerError(response);
    };
    StopPaymentsPresentationController.prototype.createStopChequePaymentRequestFailureCallBack = function(response) {
        var scopeObj = this;
        scopeObj.onServerError(response);
    };
    /**
     * createCheckRequestModel: Method to create Check request model object for Create check request
     * @param {object} transactionModel, check request transaction object
     * @return {object} formatted transasction model for Create check request
     */
    StopPaymentsPresentationController.prototype.createCheckRequestModel = function(transactionModel) {
        var checkRequestModel = {};
        if (transactionModel) {
            checkRequestModel = {
                transactionType: transactionModel.transactionType || OLBConstants.TRANSACTION_TYPE.STOPCHECKPAYMENTREQUEST,
                fromAccountNumber: transactionModel.fromAccountNumber,
                payeeName: transactionModel.payeeName.trim(),
                checkNumber1: transactionModel.checkNumber1,
                amount: transactionModel.amount,
                requestValidityInMonths: applicationManager.getConfigurationManager().checkServiceVality,
                checkReason: transactionModel.checkReason,
                transactionsNotes: transactionModel.description.trim(),
            };
            if (transactionModel.checkNumber2) { //for series checks
                checkRequestModel.checkNumber2 = transactionModel.checkNumber2;
            }
            if (transactionModel.amount) { //for single check
                checkRequestModel.amount = transactionModel.amount;
            }
            if (transactionModel.checkDateOfIssue) { //for single check
                checkRequestModel.checkDateOfIssue = CommonUtilities.sendDateToBackend(transactionModel.checkDateOfIssue);
            }
        } else {
            CommonUtilities.ErrorHandler.onError("Invalid transaction Model");
        }
        return checkRequestModel;
    };

    StopPaymentsPresentationController.prototype.createStopChequeRequestModel = function(transactionModel) {
        var checkRequestModel = {};
        if (transactionModel) {
            checkRequestModel = {
                transactionType: transactionModel.transactionType || OLBConstants.TRANSACTION_TYPE.STOPCHECKPAYMENTREQUEST,
                fromAccountNumber: transactionModel.fromAccountNumber,
                payeeName: transactionModel.payeeName.trim(),
                checkNumber1: transactionModel.checkNumber1,
                amount: transactionModel.amount,
                requestValidityInMonths: applicationManager.getConfigurationManager().checkServiceVality,
                checkReason: transactionModel.checkReason,
                transactionsNotes: transactionModel.description.trim(),
                validate: ""
            };
            if (transactionModel.checkNumber2) { //for series checks
                checkRequestModel.checkNumber2 = transactionModel.checkNumber2;
            }
            if (transactionModel.amount) { //for single check
                checkRequestModel.amount = transactionModel.amount;
            }
            if (transactionModel.checkDateOfIssue) { //for single check

                //                 var date= CommonUtilities.sendDateToBackend(transactionModel.checkDateOfIssue);
                //                 var str = date.toString();
                //                 var year = str.substring(0,4);
                //                 var month = str.substring(5,7);
                //                 var day= str.substring(8);
                checkRequestModel.checkDateOfIssue = transactionModel.checkDateOfIssue;
            }
        } else {
            CommonUtilities.ErrorHandler.onError("Invalid transaction Model");
        }
        return checkRequestModel;
    };
    /**
     * stopCheckRequest: Method to create stop check request
     * @param {object} successData, stop check request success resposne
     */
    StopPaymentsPresentationController.prototype.onCreateStopCheckRequestSuccess = function(successData) {
        var scopeObj = this;
        if (successData && successData.referenceId) {
            scopeObj.presentStopPayments({
                "successStopCheckRequest": {
                    referenceNumber: successData.referenceId,
                    onMyRequestAction: function() {
                        scopeObj.showMyRequests({
                            selectTab: OLBConstants.DISPUTED_CHECKS
                        });
                    },
                    onBacktoAccountDetails: function() {
						applicationManager.getPresentationUtility().showLoadingScreen();
                        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"AccountsUIModule"});
                        accountsModule.presentationController.showAgainAccountsDetails(successData.fromAccountNumber);
                    }
                }
            });
        } else {
            scopeObj.onServerError(successData);
        }
    };

    StopPaymentsPresentationController.prototype.onCreateStopChequeRequestSuccess = function(successData) {
        var scopeObj = this;
        if (successData && successData.referenceId) {
            scopeObj.presentStopPayments({
                "successStopCheckRequest": {
                    referenceNumber: successData.referenceId,
                    onMyRequestAction: function() {
                        scopeObj.showMyRequests({
                            selectTab: OLBConstants.DISPUTED_CHECKS
                        });
                    },
                    onBacktoAccountDetails: function() {
						applicationManager.getPresentationUtility().showLoadingScreen();
                        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"AccountsUIModule"});
                        accountsModule.presentationController.showAgainAccountsDetails(successData.fromAccountNumber);
                    }
                }
            });
        } else {
            scopeObj.onServerError(successData);
        }
    };
    /**
     * getCheckReasonsListViewModel: Method  return check reasons
     * @return {Array}, check request reasons list
     */
    StopPaymentsPresentationController.prototype.getCheckReasonsListViewModel = function() {
        var scopeObj = this;
        return scopeObj.checkRequestReasons.map(function(reason) {
            return {
                id: reason[1],
                name: reason[0]
            };
        });
    };
    /******************************************************************************************************
     * Stop Payments : My Requests
     ******************************************************************************************************/
    /**
     * showMyRequests: Method to show My Requests
     * @param {object} dataInputs dataInputs
     * @throws {}
     */
    StopPaymentsPresentationController.prototype.showMyRequests = function(dataInputs) {
        var scopeObj = this;
        var configManager = applicationManager.getConfigurationManager();
        dataInputs = dataInputs || {};
        var selectTab = dataInputs.selectTab || OLBConstants.DISPUTED_TRANSACTIONS;
        var accountID = dataInputs.accountID || "";
        scopeObj.presentStopPayments({
            "myRequests": {
                selectTab: selectTab,
                accountID: accountID,
                addNewStopCheckRequestAction: {
                    displayName: kony.i18n.getLocalizedString("i18n.ChequeManagement.NewStopChequeRequest"),
                    action: function() {
                        scopeObj.showStopChecksForm({
                            onCancel: function() {
                                scopeObj.presentStopPayments({
                                    "myRequests": {
                                        selectTab: OLBConstants.DISPUTED_TRANSACTIONS
                                    }
                                });
                            }
                        });
                    }
                }
            }
        });
        applicationManager.getPresentationUtility().showLoadingScreen();
        switch (selectTab) {
            case OLBConstants.DISPUTED_TRANSACTIONS:
                if (configManager.checkUserFeature("STOP_PAYMENT_REQUEST"))
                    scopeObj.showDisputeTransactionRequests({
                        resetSorting: true
                    });
                else {
                    scopeObj.showDisputeCheckRequests({
                        resetSorting: true
                    });
                    scopeObj.fetchMyCheques(dataInputs);
                }
                break;
            case OLBConstants.DISPUTED_CHECKS:
                if (configManager.checkUserFeature("CHEQUE_BOOK_REQUEST"))
                    scopeObj.showDisputeCheckRequests({
                        resetSorting: true
                    });
                else {
                    scopeObj.showDisputeTransactionRequests({
                        resetSorting: true
                    });
                    scopeObj.fetchMyCheques(dataInputs);
                }
                break;

            case OLBConstants.MY_CHEQUES:
                if (configManager.checkUserFeature("VIEW_CHEQUES"))
                    scopeObj.fetchMyCheques(dataInputs);
                else {
                    scopeObj.showDisputeTransactionRequests({
                        resetSorting: true
                    });
                    scopeObj.showDisputeCheckRequests({
                        resetSorting: true
                    });
                }
                break;
        }
    };
    /* * showDisputeTransactionsRequests: Method to show My Requests Disputed stop check request
     * @param {object} dataInputs dataInputs
     */
    StopPaymentsPresentationController.prototype.showDisputeTransactionsRequests = function(dataInputs) {
        var scopeObj = this;
        scopeObj.paginationManager.resetValues();
        dataInputs = dataInputs || {};
        scopeObj.paginationManager.getValues(scopeObj.disputedTransactionRequestsConfig, dataInputs);
        scopeObj.getStopCheckRequests(scopeObj.onStopCheckRequestsSuccess.bind(scopeObj), scopeObj.onServerError.bind(scopeObj));
    };

    /**
     * get StopCheckRequests success schenario
     * @param {function} onSuccess onSuceess
     * @param {object} response  response
     */
    StopPaymentsPresentationController.prototype.getStopCheckPaymentRequestsSuccessCallBack = function(onSuccess, response) {
        var scopeObj = this;
        var dataInputs = scopeObj.paginationManager.getValues(scopeObj.stopChekRequestsConfig);
        dataInputs.transactionType = OLBConstants.TRANSACTION_TYPE.STOPCHECKPAYMENTREQUEST;
        response.config = dataInputs;
        onSuccess(response);
    };
    /**
     * get StopCheckRequests Failure schenario
     * @param {function} onError onError
     * @param {object} response response
     */
    StopPaymentsPresentationController.prototype.getStopCheckPaymentRequestsFailureCallBack = function(onError, response) {
        onError(response);
    };
    /**
     * showDisputeCheckRequests: Method to show My Requests Disputed stop check request
     * @param {object} dataInputs dataInputs
     */
    StopPaymentsPresentationController.prototype.showDisputeCheckRequests = function(dataInputs) {
        var scopeObj = this;
        scopeObj.paginationManager.resetValues();
        dataInputs = dataInputs || {};
        scopeObj.paginationManager.getValues(scopeObj.stopChekRequestsConfig, dataInputs);
        scopeObj.getStopCheckRequests(scopeObj.onStopCheckRequestsSuccess.bind(scopeObj), scopeObj.onServerError.bind(scopeObj));
    };
    /**
     * getStopCheckRequests: Method to fetch stop check request from MF/Command handler - com.kony.StopPayments.getStopCheckPaymentRequests.
     * @param {function} onSuccess, success call back
     * @param {function} onError, error call back
     */
    StopPaymentsPresentationController.prototype.getStopCheckRequests = function(onSuccess, onError) {
        var scopeObj = this;
        var dataInputs = scopeObj.paginationManager.getValues(scopeObj.stopChekRequestsConfig);
        dataInputs.transactionType = OLBConstants.TRANSACTION_TYPE.STOPCHECKPAYMENTREQUEST;
        scopeObj.updateLoadingForCompletePage({
            isLoading: true,
            serviceViewModels: ['stopCheckRequestsViewModel'] //expected view model object
        });
        dataInputs.limit = ""; //Pagination not implemnted
        scopeObj.transactionManager.getStopCheckPaymentRequests(dataInputs, scopeObj.getStopCheckPaymentRequestsSuccessCallBack.bind(scopeObj, onSuccess),
            scopeObj.getStopCheckPaymentRequestsFailureCallBack.bind(scopeObj, onError));
    };
    /**
     * get StopCheckRequests success schenario
     * @param {function} onSuccess onSuceess
     * @param {object} response  response
     */
    StopPaymentsPresentationController.prototype.getStopCheckPaymentRequestsSuccessCallBack = function(onSuccess, response) {
        var scopeObj = this;
        var dataInputs = scopeObj.paginationManager.getValues(scopeObj.stopChekRequestsConfig);
        dataInputs.transactionType = OLBConstants.TRANSACTION_TYPE.STOPCHECKPAYMENTREQUEST;
        response.config = dataInputs;
        onSuccess(response);
    };
    /**
     * get StopCheckRequests Failure schenario
     * @param {function} onError onError
     * @param {object} response response
     */
    StopPaymentsPresentationController.prototype.getStopCheckPaymentRequestsFailureCallBack = function(onError, response) {
        onError(response);
    };
    /**
     * onStopCheckRequestsSuccess: Method to handle successful stop check requests
     * @param {object} responseData, response data
     */
    StopPaymentsPresentationController.prototype.onStopCheckRequestsSuccess = function(responseData) {
        var scopeObj = this;
        if (responseData) {
            scopeObj.presentStopPayments({
                'stopCheckRequestsViewModel': {
                    "stopchecksRequests": scopeObj.getStopCheckRequestsViewModel(responseData),
                    "config": responseData.config
                }
            });
        } else {
            scopeObj.onServerError(responseData);
        }
    };
    /*
     * getStopCheckRequestsViewModel: Method to return Stop Check Requests view model
     * @param {Array} stopChecksRequests, stop check requests data array
     * @return {Array} stopCheckRequestsViewModel, stop check requests view model array
     * @throws {}
     */
    StopPaymentsPresentationController.prototype.getStopCheckRequestsViewModel = function(stopChecksRequests) {
        var scopeObj = this;
        var stopCheckRequestsViewModel = stopChecksRequests || [];
        stopCheckRequestsViewModel = stopChecksRequests.map(function(requestObject) {
            var finalRequestObject = {
                transactionId: requestObject.transactionId,
                transactionDate: CommonUtilities.getFrontendDateString(requestObject.transactionDate),
                transactionType: requestObject.transactionType,
                payeeName: requestObject.payeeName,
                statusDescription: requestObject.statusDescription,
                fromAccountNumber: requestObject.fromAccountNumber,
                fromAccountName: requestObject.fromAccountName,
                fromAccountNickName: requestObject.fromNickName,
                fromAccount: CommonUtilities.getAccountDisplayName({
                    name: requestObject.fromAccountName,
                    accountID: requestObject.fromAccountNumber,
                    nickName: requestObject.fromNickName,
                    Account_id: requestObject.fromAccountNumber
                }),
                requestValidity: requestObject.requestValidity ? CommonUtilities.getFrontendDateString(requestObject.requestValidity) : kony.i18n.getLocalizedString("i18n.common.none"),
                checkReason: requestObject.checkReason,
                transactionsNotes: requestObject.transactionsNotes === undefined || requestObject.transactionsNotes === null ? kony.i18n.getLocalizedString("i18n.common.none") : requestObject.transactionsNotes,
                requestType: requestObject.requestType,
                amount: requestObject.amount === undefined || requestObject.amount === null ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.formatCurrencyWithCommas(requestObject.amount, false, requestObject.currencyCode),
                checkDateOfIssue: requestObject.checkDateOfIssue ? CommonUtilities.getFrontendDateString(requestObject.checkDateOfIssue) : kony.i18n.getLocalizedString("i18n.common.NA"),
                /**
                 * used to navigate the new message flow
                 */
                onSendMessageAction: function() {
                    var alertsMsgsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsMsgsModule");
                    alertsMsgsModule.presentationController.showAlertsPage(null, {
                        show: "CreateNewMessage",
                        cancelCallback: scopeObj.showStopPayments.bind(scopeObj, {
                            show: OLBConstants.DISPUTED_CHECKS
                        })
                    });
                }
            };
            if (requestObject.requestType === OLBConstants.CHECK_REQUEST_TYPES.SINGLE) {
                finalRequestObject.checkNumber = requestObject.checkNumber1;
            } else if (requestObject.requestType === OLBConstants.CHECK_REQUEST_TYPES.SERIES) {
                finalRequestObject.checkNumber = requestObject.checkNumber1 + " " + OLBConstants.CHECK_SERIES_SEPARATOR + " " + requestObject.checkNumber2;
            } else {
                CommonUtilities.ErrorHandler.onError("getStopCheckRequestsViewModel : Invalid request type: " + requestObject.requestType);
            }
            if (requestObject.statusDescription === OLBConstants.TRANSACTION_STATUS.STOPPED || requestObject.statusDescription === OLBConstants.TRANSACTION_STATUS.ACTIVE || requestObject.statusDescription === OLBConstants.TRANSACTION_STATUS.INPROGRESS) {
                finalRequestObject.onCancelRequest = function() {
                    scopeObj.onCancelStopCheckRequest(requestObject.transactionId);
                };
            } else if (requestObject.statusDescription === OLBConstants.TRANSACTION_STATUS.REQUESTEXPIRED) {
                finalRequestObject.onReNewRequest = function() {
                    requestObject.onCancel = scopeObj.presentStopPayments.bind(scopeObj, {
                        "myRequests": {
                            selectTab: OLBConstants.DISPUTED_CHECKS
                        }
                    });
                    scopeObj.showStopChecksForm(requestObject);
                };
            } else if (requestObject.statusDescription === OLBConstants.TRANSACTION_STATUS.CLEARED) {
                //Nothing
            } else if (requestObject.statusDescription === OLBConstants.TRANSACTION_STATUS.FAILED) {
                //Nothing
            }
            return finalRequestObject;
        });
        return stopCheckRequestsViewModel;
    };
    /**
     * onCancelDisputeTransactionRequest: Method to handle cancel dispute transactions request action,
     * @param {String} transactionId, requested disputed transaction, transaction id.
     */
    StopPaymentsPresentationController.prototype.onCancelDisputeTransactionRequest = function(transactionParams) {
        var scopeObj = this;
        scopeObj.presentStopPayments({
            "cancelStopCheckAction": {
                headerText: kony.i18n.getLocalizedString("i18n.StopCheckPayments.CancelDisputeTransaction"),
                message: kony.i18n.getLocalizedString("i18n.StopCheckPayments.AreYouSureToCancelTheDisputeRequest"),
                /**
                 * used to delete the dispute transaction
                 */
                confirmCancelAction: function() {
                    scopeObj.cancelDisputeTransactionRequest(transactionParams, scopeObj.showDisputeTransactionRequests.bind(scopeObj), scopeObj.onServerError.bind(scopeObj));
                }
            }
        });
    };
    /**
     * cancelDisputeTransactionRequest: Method to cancel/delete dispute a transaction
     * @param {String} transactionId requested disputed transaction
     * @param {function} onSuccess success call back
     * @param {function} onError error call back
     */
    StopPaymentsPresentationController.prototype.cancelDisputeTransactionRequest = function(transactionParams, onSuccess, onError) {
        var scopeObj = this;
        if (transactionParams.transactionId) {
            scopeObj.updateLoadingForCompletePage({
                isLoading: true,
                serviceViewModels: ['cancelRequestSuccess'] //expected view model object
            });
            scopeObj.transactionManager.deleteTransaction(transactionParams, scopeObj.cancelDisputedTransactionSuccessCallBack.bind(scopeObj, onSuccess), scopeObj.cancelDisputedTransactionFailureCallBack.bind(scopeObj, onError));
        } else {
            CommonUtilities.ErrorHandler.onError("cancelDisputeTransactionRequest : Invalid transaction Id" + transactionParams.transactionId);
        }
    };
    /**
     * cancelDisputed Transaction Success Schenario
     * @param {function} onSuccess onSuccess
     * @param {object} response reponse
     */
    StopPaymentsPresentationController.prototype.cancelDisputedTransactionSuccessCallBack = function(onSuccess, response) {
        onSuccess(response);
    };
    /**
     * cancelDisputed Transaction Failure Schenario
     * @param {function} onError onSuccess
     * @param {object} response reponse
     */
    StopPaymentsPresentationController.prototype.cancelDisputedTransactionFailureCallBack = function(onError, response) {
        onError(response);
    };
    /**
     * onCancelStopCheckRequest: Method to handle cancel stop check request action,
     * @param {String} transactionId, requested stop check transaction id.
     */
    StopPaymentsPresentationController.prototype.onCancelStopCheckRequest = function(transactionId) {
        var scopeObj = this;
        scopeObj.presentStopPayments({
            "cancelStopCheckAction": {
                headerText: kony.i18n.getLocalizedString("i18n.StopCheckPayments.CancelStopCheckPayment"),
                message: kony.i18n.getLocalizedString("i18n.StopCheckPayments.AreYouSureToCancelTheRequest"),
                showStopPaymentServiceFeesAndValidity: applicationManager.getConfigurationManager().enalbeStopPaymentServiceFeesAndValidity === "true",
                checkServiceFee: applicationManager.getConfigurationManager().checkServiceFee,
                checkServiceVality: applicationManager.getConfigurationManager().checkServiceVality,
                serviceChargableText: kony.i18n.getLocalizedString("i18n.StopPayments.ChargeableService1") + " " + applicationManager.getConfigurationManager().getCurrencyCode() + applicationManager.getConfigurationManager().checkServiceFee + " " + kony.i18n.getLocalizedString("i18n.StopPayments.ChargeableService2") + " " + applicationManager.getConfigurationManager().checkServiceVality + " " + kony.i18n.getLocalizedString("i18n.StopPayments.ThisServiceIsChargeable13") + " " + kony.i18n.getLocalizedString("i18n.StopcheckPayments.ThisRequestWillbeProcessedWithin12hrs"),
                /**
                 * used to cancel the cheque
                 */
                confirmCancelAction: function() {
                    scopeObj.canelStopCheckRequest(transactionId, scopeObj.showDisputeCheckRequests.bind(scopeObj), scopeObj.onServerError.bind(scopeObj));
                }
            }
        });
    };
    /**
     * canelStopCheckRequest: Method to cancel/delete stop check request transaction.
     * @param {String} transactionId, requested stop check transaction id.
     * @param {function} onSuccess, success call back
     * @param {function} onError error call back
     */
    StopPaymentsPresentationController.prototype.canelStopCheckRequest = function(transactionId, onSuccess, onError) {
        var scopeObj = this;
        if (transactionId) {
            scopeObj.updateLoadingForCompletePage({
                isLoading: true,
                serviceViewModels: ['cancelRequestSuccess'] //expected view model object
            });
            var params = {
                transactionId: transactionId,
                transactionType: OLBConstants.TRANSACTION_TYPE.STOPCHECKPAYMENTREQUEST
            };
            scopeObj.transactionManager.deleteTransaction(params, scopeObj.canelStopCheckRequestSuccessCallBack.bind(scopeObj, onSuccess),
                scopeObj.canelStopCheckRequestFailureCallBack.bind(scopeObj, onError));
        } else {
            CommonUtilities.ErrorHandler.onError("canelStopCheckRequest : Invalid transaction Id" + transactionId);
        }
    };
    /**
     * canelStopCheckRequest success schenario
     * @param {function} onSuccess success callBack
     * @param {object} response response
     */
    StopPaymentsPresentationController.prototype.canelStopCheckRequestSuccessCallBack = function(onSuccess, response) {
        onSuccess(response);
    };
    /**
     * canelStopCheckRequest Failure schenario
     * @param {function} onError success callBack
     * @param {object} response response
     */
    StopPaymentsPresentationController.prototype.canelStopCheckRequestFailureCallBack = function(onError, response) {
        onError(response);
    };
    StopPaymentsPresentationController.prototype.showPrintPage = function(data) {
        applicationManager.getNavigationManager().navigateTo('frmPrintTransfer');
        applicationManager.getNavigationManager().updateForm(data, 'frmPrintTransfer');
    };

    StopPaymentsPresentationController.prototype.getAccounts = function() {

        var configManager = applicationManager.getConfigurationManager();
        var accountsInp = configManager.userAccounts;
        var filterList = function (input) {
            try {
                let accountData = JSON.parse(JSON.stringify(input));
                let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
                return filteredAccountData;
            } catch (err) {
                return input;
            }
        };
        var accounts = filterList(accountsInp);
        var chequeSupportedAccounts = [];
        for (var i = 0; i < accounts.length; i++) {
			
			  var processedName = CommonUtilities.getAccountDisplayName(accounts[i]);
			  accounts[i].accountName = processedName;
            if ((accounts[i].accountType === "Checking" || accounts[i].accountType === "Savings") && (accounts[i].externalIndicator !== "true")) {
                chequeSupportedAccounts.push(accounts[i]);
            }
        }
        return chequeSupportedAccounts;
    }
    StopPaymentsPresentationController.prototype.getChequeLeavesandAddress = function(accountDetails) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var configManager = applicationManager.getConfigurationManager();
        var accounts = configManager.userAccounts;
        var chequeSupportedAccounts = [];
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].accountType === "Checking" || accounts[i].accountType === "Savings") {
                chequeSupportedAccounts.push(accounts[i]);
            }
        }
        var allAccounts = chequeSupportedAccounts;

        var selectedAccountCategory = "";
        var selectedAccountDetails = "";
        for (var i = 0; i < allAccounts.length; i++) {
            if (allAccounts[i].accountID == accountDetails) {
                selectedAccountDetails = allAccounts[i];
                break;
            }
        }

        selectedAccountCategory = selectedAccountDetails.categoryId;
        if (selectedAccountCategory === undefined || selectedAccountCategory === null) {
            if (selectedAccountDetails.accountType === "Checking") {
                selectedAccountCategory = "1001";
            }
            if (selectedAccountDetails.accountType === "Savings") {
                selectedAccountCategory = "6001";
            }
        }
        scope_ChequePresentationController.currencyCode = selectedAccountDetails.currencyCode;
        var transObj = applicationManager.getTransactionsListManager();
        transObj.setTransactionAttribute("fromAccountNumber", selectedAccountDetails.accountID);
        transObj.setTransactionAttribute("fromAccountName", selectedAccountDetails.accountName);

        var transMan = applicationManager.getTransactionsListManager();
        var criteria = {
            "category": selectedAccountCategory
        };
        transMan.fetchChequeIDAndLeavesCount(criteria, scope_ChequePresentationController.fetchChequeIDAndLeavesCountSuccess, scope_ChequePresentationController.fetchChequeIDAndLeavesCountError);
    };
    StopPaymentsPresentationController.prototype.fetchChequeIDAndLeavesCountSuccess = function(response) {
        var chequeTypes = response.ChequeTypes;
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        if (chequeTypes.length === 0) {
            var leavesCount = " ";
            controller.bindTransaction(leavesCount);
        } else {
            scope_ChequePresentationController.chequeId = chequeTypes[0].chequeId;
            scope_ChequePresentationController.leavesCount = chequeTypes[0].defaultIssueNumber;
            controller.bindTransaction(chequeTypes[0].defaultIssueNumber);
        }
        controller.bindAddress(scope_ChequePresentationController.address);
        applicationManager.getPresentationUtility().dismissLoadingScreen();

    };
    StopPaymentsPresentationController.prototype.fetchChequeIDAndLeavesCountError = function(response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };

    StopPaymentsPresentationController.prototype.validateandfetchfee = function() {
        var transMan = applicationManager.getTransactionsListManager();
        var transObj = transMan.getTransactionObject();
        scope_ChequePresentationController.accountNumber = transObj.fromAccountNumber;
        var criteria = {
            "chequeIssueId": scope_ChequePresentationController.chequeId + "." + transObj.fromAccountNumber,
            "validate": "true",
            "note": "",
            "accountID": transObj.fromAccountNumber
        };
        transMan.createChequeBookRequests(criteria, scope_ChequePresentationController.validateAndFetchFeeDetailsSuccess.bind(this,transObj.fromAccountNumber), scope_ChequePresentationController.validateAndFetchFeeDetailsError);
    };

    StopPaymentsPresentationController.prototype.validateAndFetchFeeDetailsSuccess = function(accountId, response) {
        scope_ChequePresentationController.uniqueChequeIssueIdResponse = response.chequeIssueId;
        scope_ChequePresentationController.fees = response.fees;
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        controller.bindfee(response, accountId);

    };
    StopPaymentsPresentationController.prototype.validateAndFetchFeeDetailsError = function(error) {
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        controller.bindError(error);
    };
    StopPaymentsPresentationController.prototype.getUserAddress = function() {
        var userObj = applicationManager.getUserPreferencesManager();
        var addressObj = userObj.getEntitlementAddresses();
        var details = "";
        for (var i = 0; i < addressObj.length; i++) {
            if (addressObj[i].isPrimary === "true") {
                if (addressObj[i].AddressLine1)
                    details = addressObj[i].AddressLine1;
                if(details[0]===undefined || details[0] === null || details[0]===''){
                    if (addressObj[i].AddressLine2) details = details + addressObj[i].AddressLine2;
                }
                else{
                    if (addressObj[i].AddressLine2) details = details + "," + addressObj[i].AddressLine2;
                }
                if (addressObj[i].CityName)
                    details = details + "," + addressObj[i].CityName;
                if (addressObj[i].RegionName)
                    details = details + ", " + addressObj[i].RegionName;
                if (addressObj[i].CountryName)
                    details = details + "," + addressObj[i].CountryName;
                if (addressObj[i].ZipCode)
                    details = details + "," + addressObj[i].ZipCode;
                break;
            }
        }
        if (addressObj.length == 1 && !details) {
            if (addressObj[0].AddressLine1) details = addressObj[0].AddressLine1;
            if (addressObj[0].AddressLine2) details = details + "," + addressObj[0].AddressLine2;
            if (addressObj[0].CityName) details = details + "," + addressObj[0].CityName;
            if (addressObj[0].RegionName) details = details + ", " + addressObj[0].RegionName;
            if (addressObj[0].CountryName) details = details + "," + addressObj[0].CountryName;
            if (addressObj[0].ZipCode) details = details + "," + addressObj[0].ZipCode;
        }
        scope_ChequePresentationController.address = details;

    };
    StopPaymentsPresentationController.prototype.createChequeBookRequest = function(requestData,desc) {
        var transMan = applicationManager.getTransactionsListManager();
        transMan.setTransactionAttribute("transactionsNotes", desc);
		requestData.chequeIssueId = scope_ChequePresentationController.uniqueChequeIssueIdResponse;	  
        var criteria = {
            "chequeIssueId": scope_ChequePresentationController.uniqueChequeIssueIdResponse,
            "note": desc,
            "validate": ""
        };
        if(CommonUtilities.getSCAType()==1){
            var mfaManager = applicationManager.getMFAManager();
        mfaManager.setMFAFlowType("CREATE_CHEQUE_BOOK_REQUEST");
        }
        transMan.createChequeBookRequests(requestData, scope_ChequePresentationController.createChequeBookSuccess, scope_ChequePresentationController.createChequeBookError);
    };



    StopPaymentsPresentationController.prototype.createChequeBookSuccess = function(Response) {
        if (Response.MFAAttributes) { 
            var operationName = "createRequest"; 
            var mfaManager = applicationManager.getMFAManager(); 
            var mfaJSON = { 
                "serviceName": applicationManager.getMFAManager().getMFAFlowType(), 
                "flowType": applicationManager.getMFAManager().getMFAFlowType(), 
                "response": Response, 
                "objectServiceDetails": { 
                "action": operationName, 
                "serviceName": "ChequeManagement", 
                "dataModel": "ChequeBook", 
                "verifyOTPOperationName": operationName, 
                "requestOTPOperationName": operationName, 
                "resendOTPOperationName": operationName, 
              } 
            }; 
            applicationManager.getMFAManager().initMFAFlow(mfaJSON); 
        }
        else{
            scope_ChequePresentationController.chequeIssueId = Response.chequeIssueId;
            if (CommonUtilities.getSCAType!=0) {
                applicationManager.getNavigationManager().navigateTo({"appName":"ArrangementsMA","friendlyName":"frmStopPayments" }); 
            }
       
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        controller.bindReferenceNumber(Response);
        scope_ChequePresentationController.clearcache();
        }

        // scope_ChequePresentationController.commonFunctionForNavigation("frmCMConfirmation");
    };
    StopPaymentsPresentationController.prototype.createChequeBookError = function(err) {
        kony.print("In error response", err);
        if (CommonUtilities.getSCAType!=0) 
		applicationManager.getNavigationManager().navigateTo({"appName":"ArrangementsMA", "friendlyName":"frmStopPayments" }); 
        var controller = _kony.mvc.GetController('StopPaymentsUIModule/frmStopPayments', true, { "appName": "ArrangementsMA" });
        controller.bindError(err);
        scope_ChequePresentationController.clearcache();

    };
    StopPaymentsPresentationController.prototype.backToAccountDetails = function() {

        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"AccountsUIModule"});
        accountsModule.presentationController.showAgainAccountsDetails(scope_ChequePresentationController.accountNumber);


    };
    StopPaymentsPresentationController.prototype.clearcache = function() {
        scope_ChequePresentationController.uniqueChequeIssueIdResponse = "";
        scope_ChequePresentationController.fees = "";
        scope_ChequePresentationController.chequeId = "";
        scope_ChequePresentationController.leavesCount = "";
        scope_ChequePresentationController.currencyCode = "";
        scope_ChequePresentationController.address = "";
        scope_ChequePresentationController.chequeIssueId = "";

    };


    /*To Display the ChequeBook Request  Summary screen
     **/
    StopPaymentsPresentationController.prototype.fetchTransactionForAccount = function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transMan = applicationManager.getTransactionsListManager();
        var transObj = transMan.getTransactionObject();
        scope_ChequePresentationController.currencySymbol = transObj.accountCurrencyCode;
        var criteria = {
            "offset": 0,
            "limit": "10",
            "sortBy": "transactionDate",
            "order": "desc",
            "paginationRowLimit": 10,
            "transactionType": "StopCheckPaymentRequest",
            "accountID": transObj.fromAccountNumber
        };
        transMan.getAccountTransactions(criteria, scope_ChequePresentationController.getTransactionsSuccess, scope_ChequePresentationController.getTransactionsError);
    };
    StopPaymentsPresentationController.prototype.getTransactionsSuccess = function(response) {
        var formattedResponse = [];
        response = response.ChequeBookRequests;
        if (Array.isArray(response)) {
            for (var i = 0; i < response.length; i++) {
                var data = {};
                data.lblDescription = "Book";
                if (response[i].numberIssued) {
                    data.lblDescription = "Book" + " " + "(" + response[i].numberIssued + " " + "Leaves)";
                }
                data.lblDate = "-";
                data.lblStatus = "-";
                data.lblAmount = "-";
                data.lblReferenceNo = kony.sdk.isNullOrUndefined(response[i].deliveryType) ? "-" : response[i].deliveryType;
                data.lblExpiresOnData0 = "-";
                data.lblFromAccountData = "-";
                data.lblPayeeName = {
                    "isVisible": false
                };
                data.lblCurrency = {
                    "isVisible": false
                };
                data.lblToAccountData = {
                    "isVisible": false
                };
                data.lblDateOfDescriptionKey = {
                    "isVisible": false
                };
                data.lblDateOfDescriptionValue = {
                    "isVisible": false
                };
                data.lblChequeManagementNotes = {
                    "isVisible": false
                };
                data.lblChequeManagementFee = {
                    "isVisible": false
                };
                data.lblReasonKey = {
                    "isVisible": false
                };
                //data.lblFromAccountData="-";
                //data.lblTransactionTypeValue="-";
                /*if(Array.isArray(response[i].notes)){
			if(response[i].notes.length>0){
				data.lblExpiresOnData0=response[i].notes[0].note;
			}
		}*/
                if (response[i].issueDate) {
                    data.lblDate = response[i].issueDate;
                    var yyyy = response[i].issueDate.substring(0, 4);
                    var mon = response[i].issueDate.substring(4, 6);
                    var dd = response[i].issueDate.substring(6, 8);
                    data.lblDate = mon + "/" + dd + "/" + yyyy;
                }
                if (response[i].chequeStatus) {
                    data.lblStatus = response[i].chequeStatus;
                    if (response[i].chequeStatus === "REQUEST RECIEVED") {
                        data.lblStatus = "Requested";
                    }
                    if (response[i].chequeStatus === "ISSUED") {
                        data.lblStatus = "Issued";
                    }
                }
                if (response[i].chequeIssueId) {
                    data.lblAmount = response[i].chequeIssueId;
                }
                /*if(response[i].note){
			data.lblTransactionTypeValue=response[i].note;
		}*/               
                data.lblExpiresOnKey = kony.i18n.getLocalizedString("i18n.ChequeManagement.Fee");
                data.lblExpiresOnKey0 = kony.i18n.getLocalizedString("i18n.ChequeManagement.Notes");
                data.lblChequeDate = kony.i18n.getLocalizedString("i18n.ChequeBookReq.Address");
                data.lblReferenceDataVertical = kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber:");
                data.lblReason = kony.i18n.getLocalizedString("i18n.ChequeManagement.Reason");
                data.lblSeparator12 = "-";
                data.lblRefNo = kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber:");
                data.lblExpiresOnData = "-";
				if (response[i].note) {
                    data.lblExpiresOnData0 = response[i].note;
                }
				if(response[i].address){
                	data.lblFromAccountData = response[i].address;  
                }    
                //data.lblReasonKey="-"; 
                if (response[i].fees) {
                    data.lblExpiresOnData = CommonUtilities.formatCurrencyWithCommas(response[i].fees, true);
                }
                /*if(response[i].fee){
			data.lblReasonKey=scope_ChequePresentationController.currencySymbol +" "+ response[i].fee;
		}*/
                data.imgDropDown = {
                    "src": "arrow_down.png",
                    "isVisible": true
                };
                // if(response[i].notes.length>0)
                //  data.lblExpiresOnData=response[i].notes[0].note;
                formattedResponse.push(data);
            }
        }
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        controller.bindChequeBookRequests(formattedResponse);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    StopPaymentsPresentationController.prototype.getTransactionsError = function(err) {
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            controller.showNoTransactionsUI({
                noServiceMessage: "kony.mb.An.error.occurred.while.making.the.request."
            });
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    };



    /* To display the Stop Cheque Payment summary screen
	 Stop Cheque Request
*/
    StopPaymentsPresentationController.prototype.fetchStopChequePayment = function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transMan = applicationManager.getTransactionsListManager();
        var transObj = transMan.getTransactionObject();
        scope_ChequePresentationController.currencySymbol = transObj.accountCurrencyCode;
        var criteria = {
            "offset": 0,
            "limit": "10",
            "sortBy": "transactionDate",
            "order": "desc",
            "paginationRowLimit": 10,
            "transactionType": "StopCheckPaymentRequest",
            "accountID": transObj.fromAccountNumber
        };
        transMan.getStopCheckPaymentRequestTransactions(criteria, scope_StopChequeRequestsPresentationController.getStopChequeRequestSuccess, scope_StopChequeRequestsPresentationController.getTransactionsError);
    };
    StopPaymentsPresentationController.prototype.getStopChequeRequestSuccess = function(response) {
        var formattedResponse = [];
        for (var i = 0; i < response.length; i++) {
            var data = {};
            data.lblReferenceNo = "-";
            data.lblTransactionTypeValue = "-";
            data.lblDate = "-";
            data.lblChequeDate = {
                "isVisible": false
            };
            data.lblFromAccountData = {
                "isVisible": false
            };
            data.lblExpiresOnKey0 = {
                "isVisible": false
            };
            data.lblExpiresOnData0 = {
                "isVisible": false
            };
            data.lblDateOfDescriptionKey = {
                "isVisible": false
            };
            data.lblDateOfDescriptionValue = {
                "isVisible": false
            };
            data.lblChequeManagementNotes = {
                "isVisible": false
            };
            data.lblTransactionTypeValue = {
                "isVisible": false
            };
            data.lblChequeManagementFee = {
                "isVisible": false
            };
            data.lblReasonKey = {
                "isVisible": false
            };
            data.lblDescription = "-";
            data.lblToAccountData = "-";
            data.lblDateOfDescriptionValue = "-";
            data.lblStatus = "Completed";
            if (response[i].statusDescription) {
                data.lblStatus = response[i].statusDescription;
            }
            if (response[i].checkReason) {
                data.lblReferenceNo = response[i].checkReason;
            }
            if (response[i].checkDateOfIssue) {
                data.lblToAccountData = response[i].checkDateOfIssue;
                if (response[i].checkDateOfIssue.indexOf("-") > -1) {
                    var yyyy = response[i].checkDateOfIssue.substring(0, 4);
                    var mon = response[i].checkDateOfIssue.substring(5, 7);
                    var dd = response[i].checkDateOfIssue.substring(8, 10);
                    data.lblToAccountData = mon + "/" + dd + "/" + yyyy;
                }
            }
            if (response[i].transactionsNotes) {
                data.lblTransactionTypeValue = response[i].transactionsNotes;
            }
            if (response[i].transactionDate) {
                data.lblDate = response[i].transactionDate;
                if (response[i].transactionDate.indexOf("-") > -1) {
                    var yyyy = response[i].transactionDate.substring(0, 4);
                    var mon = response[i].transactionDate.substring(5, 7);
                    var dd = response[i].transactionDate.substring(8, 10);
                    data.lblDate = mon + "/" + dd + "/" + yyyy;
                }
            }
            // data.lblAccount=response[i].transactionId;
            if (response[i].checkNumber1) {
                data.lblDescription = response[i].checkNumber1;
            }
            if (response[i].checkNumber2) {
                data.lblDescription = data.lblDescription + "-" + response[i].checkNumber2;
                var checks = response[i].checkNumber2 - response[i].checkNumber1 + 1;
                data.lblDateOfDescriptionValue = checks.toString();
            }
            data.lblSeparator12 = "-";
            data.lblPayeeName = kony.i18n.getLocalizedString("i18n.ChequeManagement.ChequeManagement");
            data.imgDropDown = {
                "src": "arrow_down.png",
                "isVisible": true
            };
            data.lblAmount = "-";
            if (response[i].transactionId) {
                data.lblAmount = response[i].transactionId;
            }
            //data.lblCurrency=kony.i18n.getLocalizedString("i18n.common.currencySymbol");
            data.lblReason = kony.i18n.getLocalizedString("i18n.ChequeManagement.Reason:");
            data.lblDateVertical = kony.i18n.getLocalizedString("i18n.ChequeManagement.Date:");
            data.lblExpiresOnKey = kony.i18n.getLocalizedString("i18n.ChequeManagement.PayeeNames");
            data.lblExpiresOnKey0 = kony.i18n.getLocalizedString("i18n.StopCheckPayments.Amount");
            data.lblChequeManagementFee = kony.i18n.getLocalizedString("i18n.ChequeManagement.Fee");
            data.lblChequeManagementNotes = kony.i18n.getLocalizedString("i18n.ChequeManagement.Notes");
            data.lblDateOfDescriptionKey = kony.i18n.getLocalizedString("i18n.ChequeManagement.Cheques");
            data.lblExpiresOnData = "-";
            data.lblExpiresOnData0 = "-";
            data.lblReasonKey = "-";
            if (response[i].payeeName) {
                data.lblExpiresOnData = response[i].payeeName;
            }
            if (response[i].amount) {
                data.lblExpiresOnData0 = scope_ChequePresentationController.currencySymbol + " " + CommonUtilities.formatCurrencyWithCommas(response[i].amount, true);
            }
            if (response[i].fees) {
                data.lblReasonKey = scope_ChequePresentationController.currencySymbol + " " + CommonUtilities.formatCurrencyWithCommas(response[i].fees, true);
            }

            //   if(response[i].notes.length>0)
            //  data.notes=response[i].notes[0].note;
            formattedResponse.push(data);
        }
        // }
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        controller.bindTransactions(formattedResponse);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };


    /*
    To fetch My Cheques Summary Tab
    	My Cheques
    */

    StopPaymentsPresentationController.prototype.fetchMyCheques = function(dataInputs) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transMan = applicationManager.getTransactionsListManager();
        var transObj = transMan.getTransactionObject();
        var accountID = dataInputs ? dataInputs.accountID : transObj.fromAccountNumber;
        scope_ChequePresentationController.currencySymbol = transObj.accountCurrencyCode;
        var criteria = {
            "accountID": accountID,
            "limit": 50
        };
        transMan.getChequeSupplements(criteria, scope_MyChequePresentationController.getMyChequesSuccess, scope_MyChequePresentationController.getMyChequesError);
    };
    StopPaymentsPresentationController.prototype.getMyChequesSuccess = function(response) {
        var formattedResponse = [];
        response = response.ChequeSupplements;
        if (Array.isArray(response)) {
            for (var i = 0; i < response.length; i++) {
                var data = {};
                data.lblToAccountData = "-";
                data.lblStatus = "-";
                data.lblAmount = "-";
                data.lblDescription = "-";
                data.lblDate = "-";
                data.lblReferenceNo = "-";
                data.lblExpiresOnKey0 = {
                    "isVisible": false
                };
                data.lblExpiresOnData0 = {
                    "isVisible": false
                };
                data.lblDateOfDescriptionKey = {
                    "isVisible": false
                };
                data.lblDateOfDescriptionValue = {
                    "isVisible": false
                };
                data.lblChequeManagementNotes = {
                    "isVisible": false
                };
                data.lblTransactionTypeValue = {
                    "isVisible": false
                };
                data.lblChequeManagementFee = {
                    "isVisible": false
                };
                data.lblReasonKey = {
                    "isVisible": false
                };
                if (Array.isArray(response[i].payeeNames)) {
                    if (response[i].payeeNames.length > 0) {
                        data.lblReferenceNo = response[i].payeeNames[0].payeeName;
                    }
                }
                if (response[i].referenceNumber) {
                    data.lblToAccountData = response[i].referenceNumber;
                }
                if (response[i].amount) {
                    data.lblStatus = CommonUtilities.formatCurrencyWithCommas(response[i].amount, true);
                }
                if (response[i].issueDate) {
                    data.lblAmount = response[i].issueDate;
                    if (response[i].issueDate.indexOf("-") > -1) {
                        var yyyy = response[i].issueDate.substring(0, 4);
                        var mon = response[i].issueDate.substring(5, 7);
                        var dd = response[i].issueDate.substring(8, 10);
                        data.lblAmount = mon + "/" + dd + "/" + yyyy;
                    }
                }
                if (response[i].chequeStatus) {
                    data.lblDescription = response[i].chequeStatus;
                }
                if (response[i].checkNumber) {
                    data.lblDate = response[i].checkNumber;
                }
                if (response[i].chequeTypeId) {
                    data.lblChequeTypeId = response[i].chequeTypeId;
                }
                data.lblFromAccountData = response[i].note? response[i].note : "-";
                data.imgDropDown = {
                    "src": "arrow_down.png",
                    "isVisible": true
                };
                data.lblSeparator12 = "-";
                //data.lblFromAccountData = "-";
                data.lblExpiresOnData = "-";
                data.lblCurrency = scope_ChequePresentationController.currencySymbol;
                data.lblExpiresOnKey = kony.i18n.getLocalizedString("i18n.ChequeManagement.Reason:");
                data.lblPayeeName = kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber:");
                data.lblChequeDate = kony.i18n.getLocalizedString("i18n.ChequeBookReq.Notes"),
                    data.lblDateVertical = kony.i18n.getLocalizedString("i18n.ChequeManagement.Date:"),
                    formattedResponse.push(data);
            }
        }
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        controller.bindMyChequeRequests(formattedResponse);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    StopPaymentsPresentationController.prototype.getMyChequesError = function(err) {
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            controller.showNoTransactionsUI({
                noServiceMessage: "kony.mb.An.error.occurred.while.making.the.request."
            });
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    };


    /*Validate call for fetching fee */
    StopPaymentsPresentationController.prototype.validatefetchFee = function(Model) {

        var configManager = applicationManager.getConfigurationManager();
        var accounts = configManager.userAccounts;
        var chequeSupportedAccounts = [];
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].accountType === "Checking" || accounts[i].accountType === "Savings") {
                chequeSupportedAccounts.push(accounts[i]);
            }
        }
        var allAccounts = chequeSupportedAccounts;

        var selectedAccountCategory = "";
        var selectedAccountDetails = "";
        for (var i = 0; i < allAccounts.length; i++) {
            if (allAccounts[i].accountID === Model.fromAccountNumber) {
                selectedAccountDetails = allAccounts[i];
                break;
            }
        }

        scope_ChequePresentationController.currencyCode = selectedAccountDetails.currencyCode;
        var transMan = applicationManager.getTransactionsListManager();
        transMan.createStopChequePayment(Model, scope_ChequePresentationController.createStopChequeValidateSuccess, scope_ChequePresentationController.createStopChequeValidateError);
    };

    StopPaymentsPresentationController.prototype.createStopChequeValidateSuccess = function(response) {
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        var fee = CommonUtilities.formatCurrencyWithCommas(response.fee, false, scope_ChequePresentationController.currencyCode);
        controller.bindStopFee(fee);
    };
    StopPaymentsPresentationController.prototype.createStopChequeValidateError = function(err) {
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        controller.bindStopError(err.errorMessage);
    };
    /* Cheque Management Search */
    StopPaymentsPresentationController.prototype.showSearchDetails = function(SearchData) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transMan = applicationManager.getTransactionsListManager();
        var transObj = transMan.getTransactionObject();
        var criteria = {
            "accountID": transObj.fromAccountNumber,
            "payeeName": SearchData.payeeName,
            "checkNumber": SearchData.chequeNumber,
            "chequeRange": SearchData.chequeNumberRange,
            "amount": SearchData.amount,
            "amountRange": SearchData.amountRange,
            "chequeStatus": SearchData.searchStatusType
        };
        transMan.getChequeSupplements(criteria, scope_ChequePresentationController.getMyChequesSuccess, scope_ChequePresentationController.getMyChequesSearchError);
    };
    StopPaymentsPresentationController.prototype.getMyChequesSearchError = function(err) {
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        controller.bindMyChequeError();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    /**
     * Method to revoke stopped cheque payment
     */
    StopPaymentsPresentationController.prototype.updateRevokeStopChequePayment = function(params) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var revokeData = {
            "accountNumber": params.lblToAccountData,
            "checkNumber": params.lblDate
        };
        this.revokeData = revokeData;
        applicationManager.getTransactionsListManager().revokeStopChequePayment({
            "fromAccountNumber": params.lblToAccountData,
            "checkNumber1": params.lblDate,
            "payeeName": params.lblReferenceNo,
            "revokeDate": params.revokeDate,
            "revokeChequeTypeId": params.lblChequeTypeId
        }, this.updateRevokeStopChequePaymentSuccess.bind(this), this.updateRevokeStopChequePaymentFailure.bind(this));
    };
    /**
     * method used as success call back update revoke stopped cheque payment
     * @param {Object} 
     * @param {String}  action - contains the action to be - revoke stopped cheque payment.
     * @param {Object} response - contains the response revoke stopped cheque payment
     */
    StopPaymentsPresentationController.prototype.updateRevokeStopChequePaymentSuccess = function(response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        response.onBacktoAccountDetails = function() {
        	var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"AccountsUIModule"});
            accountsModule.presentationController.showAgainAccountsDetails(this.revokeData.accountNumber);
        }
        response.revokeData = this.revokeData;
        controller.showRevokeStopCheckAcknowledgement(response);
    };
    /**
     * method used as failure call back update revoke stopped cheque payment
     * @param {String} errorMessage - contains the errormessage update revoke stopped cheque payment
     */
    StopPaymentsPresentationController.prototype.updateRevokeStopChequePaymentFailure = function(error) {
        if (error["isServerUnreachable"]) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
            controller.showNoTransactionsUI({
                noServiceMessage: "kony.mb.An.error.occurred.while.making.the.request."
            });
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }

    };


    return StopPaymentsPresentationController;
});