define(['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function DisputeTransactionPresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(DisputeTransactionPresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    DisputeTransactionPresentationController.prototype.initializePresentationController = function() {
        this.transactionManager = applicationManager.getTransactionManager();
    };

    /**
     * showStopPayments : Entry point for Stop payment form
     * @param {object} dataInputs, required object to show specific view
     */
    DisputeTransactionPresentationController.prototype.showDisputeTransactionModule = function(dataInputs) {
        var scopeObj = this;
        if (dataInputs && dataInputs.show) {
            switch (dataInputs.show) {
                case OLBConstants.ACTION.SHOW_DISPUTE_TRANSACTION_FORM:
                    scopeObj.showDisputeTransaction(dataInputs.data);
                    break;
                case OLBConstants.ACTION.SHOW_DISPUTE_LIST:
                    scopeObj.showDisputedList();
                    break;
                default:
                    scopeObj.showDisputedList();
            }
        }
        if (dataInputs.backToDisputeDetailPage) {
            //applicationManager.getNavigationManager().navigateTo("frmDisputeTransactionDetail");
            new kony.mvc.Navigation({"appName" : "ArrangementsMA", "friendlyName" : "frmDisputeTransactionDetail"}).navigate();
        }
    };

    /**
     * createDisputeTransaction : Method for calling create transaction service for dispute a transaction
     * @param {object} params  params
     * @param {object} input input
     */
    DisputeTransactionPresentationController.prototype.createDisputeTransaction = function(params, input) {
        var self = this;
        this.showProgressBar();
        var dataParams = {
            "transactionId": params.transactionId,
            "disputeReason": (input.reason),
            "disputeDescription": (input.description),
            "transactionType": params.transactionType,
            'transactionsNotes': params.transactionsNotes !== null ? params.transactionsNotes : "",
            'amount': params.amount,
            'description': params.description,
            'fromAccountName': params.fromAccountName,
            'fromAccountNumber': params.fromAccountNumber,
            'fromAccountType': params.fromAccountType,
            'toAccountType': params.toAccountType !== null ? params.toAccountType : "",
            'toAccountName': params.toAccountName || params.payeeName || params.payeeNickName || "",
            'toAccountNumber': params.toAccountNumber || params.ExternalAccountNumber || params.payeeId || "",
            'transactionDate': params.transactionDate,
            'secureMessageId': '',
            'merchantCity': '',
            'merchantAddressName': ''
        };
        applicationManager.getTransactionsListManager().createDisputedTransaction(dataParams, self.createDisputedTransactionSuccessCallBack.bind(self, input),
            self.createDisputedTransactionFailureCallBack.bind(self));
    };

    /**
     * handels the createDisputedTransaction Success schenario
     * @param {*} input input
     * @param {*} response  response
     */
    DisputeTransactionPresentationController.prototype.createDisputedTransactionSuccessCallBack = function(input, response) {
        var self = this;
        if(applicationManager.getConfigurationManager().isMicroAppPresent("SecureMessageMA")){
        this.sendDisputeMessage(input, response);
        } else{
        this.hideProgressBar(); 
        self.presentStopPayments({
            "disputeTransactionResponse": {
                response: response,
                referenceId:response.referenceId,
                data: input
            }
        }, "frmDisputeTransactionAcknowledgement");
    }
    };

    /**
     * handels the createDisputedTransaction Failure schenario
     * @param {*} response  response
     */
    DisputeTransactionPresentationController.prototype.createDisputedTransactionFailureCallBack = function(response) {
        var self = this;
        self.showServerError(response, "frmConfirmDisputeTransaction");
    };

    /**
     * shows the error message with error response.
     * @param {object} data used to show the error message
     */
    DisputeTransactionPresentationController.prototype.showServerError = function(data, formName) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": data
        }, formName);
    };

    /**
     * cancelDisputeTransactionRequest: Method to cancel/delete dispute a transaction
     * @param {String} transactionId requested disputed transaction
     * @param {function} onSuccess success call back
     * @param {function} onError error call back
     */
    DisputeTransactionPresentationController.prototype.cancelDisputeTransactionRequest = function(transactionParams, onSuccess, onError) {
        var scopeObj = this;
        if (transactionParams.transactionId) {
            applicationManager.getTransactionManager().deleteDisputeTransaction(transactionParams, scopeObj.showDisputedList.bind(scopeObj), scopeObj.showServerError.bind(scopeObj));
        } else {
            CommonUtilities.ErrorHandler.onError("cancelDisputeTransactionRequest : Invalid transaction Id" + transactionParams.transactionId);
        }
    };

    /**
     * showDisputeTransaction : Method to show dispute transaction pageX
     * @param {object} data transaction
     */
    DisputeTransactionPresentationController.prototype.showDisputeTransaction = function(data) {
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
            displayAmount: CommonUtilities.formatCurrencyWithCommas(transaction.amount, true),
            date: transactionDate,
            types: transaction.transactionType,
            referenceNumber: data.disputeTransactionObject.transactionId,
            notes: transaction.transactionsNotes,
            accountNumber: transaction.fromAccountNumber,
            fromAccountType: transaction.fromAccountType
        };
        this.presentStopPayments({
            disputeTransactionObject: {
                data: viewModel,
                onCancel: data.onCancel,
                transactionData: transaction,
                /**
                 * used to navigate the accountDetails
                 */
                onBacktoAccountDetails: function() {
                    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
                    accountsModule.presentationController.showAgainAccountsDetails(transaction.fromAccountNumber);
                }
            }
        }, "frmDisputeTransactionDetail");
    };

    DisputeTransactionPresentationController.prototype.onSendMessageAction = function() {
        var scopeObj = this;
        var alertsMsgsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AlertsMsgsUIModule", "appName" : "SecureMessageMA"});
        alertsMsgsModule.presentationController.showAlertsPage(null, {
            show: "CreateNewMessage",
            cancelCallback: scopeObj.showDisputeTransactionModule.bind(scopeObj, {
                show: OLBConstants.ACTION.SHOW_DISPUTE_LIST
            })
        });
    };

    DisputeTransactionPresentationController.prototype.sendDisputeMessage = function(input, res) {
        var scopeObj = this;
        // "requestid": requestParams.requestid,
        var messagedescription = 'A new Dispute Request has been raised with the following details.<br><br>' +
            '... DO NOT EDIT BELOW THIS LINE ...<br>' +
            'Reason for Dispute: ' + (input.reason || '-') + '<br>' +
            'Description: ' + (input.description || '-') + '<br>' +
            'From: ' + (input.fromAccountNumber || '-') + '<br>' +
            'To: ' + (input.toAccount || '-') + '<br>' +
            'TransactionDate: ' + (input.date || '-') + '<br>' +
            'Transaction Type: ' + (input.types || '-') + '<br>' +
            'Amount: ' + (input.amount || '-') + '<br>' +
            'Reference Number: ' + (input.referenceNumber || '-') + '<br>' +
            'Notes: ' + (input.notes || '-');
        this.messagesManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "MessagesManager", "appName" : "SecureMessageMA"}).businessController;
        var requestMessageInputs = {
           // "requestsubject": "Dispute Transaction Request #" + res.referenceId,
           "requestsubject": "Dispute Transaction Request with Id" + res.referenceId,
            "messagedescription": messagedescription,
            "requestcategory_id": "RCID_DISPUTETRANSACTION"
        }
        this.messagesManager.createNewRequestWithAttachments(
            requestMessageInputs,
            scopeObj.sendDisputeMessageSuccess.bind(scopeObj, input, res.referenceId),
            scopeObj.sendDisputeMessageError.bind(scopeObj, input, res.referenceId)
        );
    };

    DisputeTransactionPresentationController.prototype.sendDisputeMessageSuccess = function(input, referenceId, response) {
        var self = this;
        this.hideProgressBar();
        self.presentStopPayments({
            "disputeTransactionResponse": {
                response: response,
                referenceId: referenceId,
                data: input
            }
        }, "frmDisputeTransactionAcknowledgement");
    };

    DisputeTransactionPresentationController.prototype.sendDisputeMessageError = function(input, referenceId, response) {
        var self = this;
        // self.showServerError(response, "frmConfirmDisputeTransaction");
        this.hideProgressBar();
        self.presentStopPayments({
            "disputeTransactionResponse": {
                errorResponse: response,
                referenceId: referenceId,
                data: input
            }
        }, "frmDisputeTransactionAcknowledgement");
    };

    DisputeTransactionPresentationController.prototype.showProgressBar = function() {
        applicationManager.getNavigationManager().updateForm({
            isLoading: true
        });
    };

    DisputeTransactionPresentationController.prototype.hideProgressBar = function() {
        applicationManager.getNavigationManager().updateForm({
            isLoading: false
        });
    };

    DisputeTransactionPresentationController.prototype.showDisputedList = function() {
        var scopeObj = this;
        this.showProgressBar();
        applicationManager.getAccountManager().getDisputedTransactions({}, scopeObj.getDisputedTransactionsSuccessCallBack.bind(scopeObj), scopeObj.getDisputedTransactionsFailureCallBack.bind(scopeObj));
    };

    /**
     * get View RequestsDisputedTransactions success schenario
     * @param {function} onSuccess onSuccess
     * @param {object} response response
     */
    DisputeTransactionPresentationController.prototype.getDisputedTransactionsSuccessCallBack = function(response) {
        var scopeObj = this;
        var dataInputs = {};
        dataInputs.transactionType = OLBConstants.TRANSACTION_TYPE.DISPUTEDTRANSACTIONSREQUEST;
        response.config = dataInputs;
        var viewModel = {
            disputedList: {
                data: response
            }
        };
        this.presentStopPayments(viewModel, "frmDisputedTransactionsList");
        this.hideProgressBar();
        // onSuccess(response);
    };

    /**
     * get View RequestsDisputedTransactions success schenario
     * @param {function} onError onError
     * @param {object} response response
     */
    DisputeTransactionPresentationController.prototype.getDisputedTransactionsFailureCallBack = function(response) {
        // onError(response);
        this.hideProgressBar();
    };

    DisputeTransactionPresentationController.prototype.navigateToConfirmScreen = function(viewModel) {
        this.presentStopPayments(viewModel, "frmConfirmDisputeTransaction");
    };

    /**
     * getdisputeTransactionReasonsListViewModel: Method  return dispute transaction reasons
     * @return {Array}, dispute transaction reasons list
     */
    DisputeTransactionPresentationController.prototype.getdisputeTransactionReasonsListViewModel = function() {
        var scopeObj = this;
        var config = applicationManager.getConfigurationManager();
        var disputeTransactionRequestReasons = config.getDisputeReasons();
        return disputeTransactionRequestReasons.map(function(reason) {
            return {
                id: reason,
                name: reason
            };
        });
    };

    /**
     * presentStopPayments : Update stop payments form
     * @param {Object} viewModel, view model for stop payments
     */
    DisputeTransactionPresentationController.prototype.presentStopPayments = function(viewModel, formName) {
        var scopeObj = this;
      new kony.mvc.Navigation({"appName" : "ArrangementsMA", "friendlyName" :formName}).navigate();
          //applicationManager.getNavigationManager().navigateTo(formName);
        applicationManager.getNavigationManager().updateForm(viewModel, formName);
    };

    return DisputeTransactionPresentationController;
});