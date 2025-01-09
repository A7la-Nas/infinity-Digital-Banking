define(['CommonUtilities', 'OLBConstants', 'ViewConstants'], function(CommonUtilities, OLBConstants, ViewConstants) {
  var frmFastTransfers = "frmFastTransfers";
  var frmFastManagePayee = "frmFastManagePayee";
  var frmReview = "frmReview";
  var flagFrmAccounts = false;
  var flagToAccounts = false;
  var frmAccounts = {};
  var toAccounts = {};
  var allAccounts = {};
  var frmConfirmTransfer = "frmConfirmTransfer";
  var frmFastActiveRecipient = "frmFastActiveRecipient";
  var frmFastActiveServices = "frmFastActiveServices";
  var frmFastActiveAck = "frmFastActiveAck";
  var frmFastDeActiveRecipient = "frmFastDeActiveRecipient";
  var frmFastDeActiveRecipienttAcknowledgement = "frmFastDeActiveRecipienttAcknowledgement";
  var frmFastAddDBXAccount = "frmFastP2P";
  var frmFastAddDBXAccountConfirm = "frmFastAddDBXAccountConfirm";
  var frmFastAddDBXAccountAcknowledgement = "frmFastAddDBXAccountAcknowledgement";
  var frmFastAddExternalAccount = "frmFastP2P";
  var frmFastAddExternalAccountConfirm = "frmFastAddExternalAccountConfirm";
  var frmFastAddExternalAccountAcknowledgement = "frmFastAddExternalAccountAcknowledgement";
  var frmFastAddInternationalAccount = "frmFastP2P";
  var frmFastAddInternationalAccountConfirm = "frmFastAddInternationalAccountConfirm";
  var frmFastAddInternationalAccountAcknowledgement = "frmFastAddInternationalAccountAcknowledgement";
  var frmFastAddRecipient = "frmFastP2P";
  var frmFastAddRecipientConfirm = "frmFastAddRecipientConfirm";
  var frmFastAddRecipientAcknowledgement = "frmFastAddRecipientAcknowledgement";
  var frmFastRecipientGateWay = "frmFastRecipientGateWay";
  var frmFastTransfersActivites = "frmFastTransfersActivites";
  var frmFastViewActivity = "frmFastViewActivity";
  var frmP2PSettings = "frmP2PSettings";
  var frmFastAddDBXLinkRecipient = "frmFastAddDBXLinkRecipient";
  var frmScheduledPayments = "frmScheduledPaymentsNew";
  var frmPastPayments = "frmPastPaymentsNew";
  var frmDirectDebits = "frmDirectDebits";
  this.transferData = "";
  var p2pEnabled = true;
  var p2pSuccess = true;
  var scheduledConfig = {
    'sortBy': 'scheduledDate',
    'defaultSortBy': 'scheduledDate',
    'order': OLBConstants.DESCENDING_KEY,
    'defaultOrder': OLBConstants.DESCENDING_KEY,
    'offset': OLBConstants.DEFAULT_OFFSET,
    'limit': OLBConstants.PAGING_ROWS_LIMIT
  };
  var pastConfig = {
    'sortBy': 'transactionDate',
    'defaultSortBy': 'transactionDate',
    'order': OLBConstants.DESCENDING_KEY,
    'defaultOrder': OLBConstants.DESCENDING_KEY,
    'offset': OLBConstants.DEFAULT_OFFSET,
    'limit': OLBConstants.PAGING_ROWS_LIMIT
  };
  var viewConfig = {};
  /**
   * User defined presentation controller
   * @constructor
   * @extends kony.mvc.Presentation.BasePresenter
   */
  function TransferFastPresentationController() {
    var configurationManager = applicationManager.getConfigurationManager();
    this.externalAccountsConfig = {
      'sortBy': 'transactionDate',
      'defaultSortBy': 'transactionDate',
      'order': OLBConstants.DESCENDING_KEY,
      'defaultOrder': OLBConstants.DESCENDING_KEY,
      'offset': OLBConstants.DEFAULT_OFFSET,
      'limit': OLBConstants.PAGING_ROWS_LIMIT
    };
    this.manageRecipientSortConfig = {
      'sortBy': 'nickName',
      'defaultSortBy': 'nickName',
      'order': configurationManager.OLBConstants.ASCENDING_KEY,
      'defaultOrder': configurationManager.OLBConstants.ASCENDING_KEY,
      'offset': OLBConstants.DEFAULT_OFFSET,
      'limit': OLBConstants.PAGING_ROWS_LIMIT
    };
    kony.mvc.Presentation.BasePresenter.call(this);
  }
  inheritsFrom(TransferFastPresentationController, kony.mvc.Presentation.BasePresenter);
  /**
   * Overridden Method of kony.mvc.Presentation.BasePresenter
   * This method gets called when presentation controller gets initialized
   * @method
   */
    TransferFastPresentationController.prototype.initializePresentationController = function() {};
  /** Entry Point Method of Transfer Module
     * @param {object} context - value to handle the flow
     */
    TransferFastPresentationController.prototype.showTransferScreen = function(context) {
    var initialContext = context || {};
    var isTransferCashWealth = (initialContext.isTransferCashWealth) ? "true" : "false";
    if (initialContext.initialView === undefined) {
      initialContext.initialView = "makeTransfer";
    }
    if (initialContext.initialView === "externalAccounts") {
      this.showProgressBar();
      //this.showExternalAccounts();
      return;
    }
	if (initialContext.initialView === "ScheduledPayments") {
      this.getScheduledPayments();
      return;
    }
    if (initialContext.initialView === "PastPayments") {
      this.getPastPayments();
      return;
    }
     if (initialContext.initialView === "DirectDebits") {
      this.getDirectDebits();
      return;
    }
	if (initialContext.initialView === "Editpayment") {
      this.resetAndShowProgressBar();
      this.showMakeTransferForEditTransaction(initialContext.editTransaction, context.onCancelCreateTransfer);
      return;
    }
     if (initialContext.initialView === "Repeatpayment") {
      this.resetAndShowProgressBar();
      this.repeatTransfer(initialContext.repeatTransaction, context.onCancelCreateTransfer);
      return;
    }
    if (initialContext.initialView === "addDBXAccount") {
      var combineduser = applicationManager.getConfigurationManager().isCombinedUser === "true";
            applicationManager.getNavigationManager().setCustomInfo('componentP2P', {
                "initialView": true,
                "flowType": "ADD",
                "beneficiaryType": "Same Bank",
                "displayName": "OTHER_INTERNAL_MEMBER",
                "isSameBankAccount": "true",
                "isInternationalAccount": "false",
                "isVerified": "true",
                "bankName": "Infinity",
                "isCombinedUser": combineduser
            });
      this.showView(frmFastAddDBXAccount);
      return;

    }
    if (initialContext.initialView === "addExternalAccount") {
      var combineduser = applicationManager.getConfigurationManager().isCombinedUser === "true";
            applicationManager.getNavigationManager().setCustomInfo('componentP2P', {
                "initialView": true,
                "flowType": "ADD",
                "beneficiaryType": "External",
                "displayName": "OTHER_EXTERNAL_ACCOUNT",
                "isSameBankAccount": "false",
                "isInternationalAccount": "false",
                "isVerified": "true",
                "bankName": "Infinity",
                "isCombinedUser": combineduser
            });
      this.showView(frmFastAddExternalAccount);
      //this.showDomesticAccounts();

      return;

    }
    if (initialContext.initialView === "addInternationalAccount") {
      var combineduser = applicationManager.getConfigurationManager().isCombinedUser === "true";
            applicationManager.getNavigationManager().setCustomInfo('componentP2P', {
                "initialView": true,
                "flowType": "ADD",
                "beneficiaryType": "International",
                "displayName": "INTERNATIONAL_ACCOUNT",
                "isSameBankAccount": "false",
                "isInternationalAccount": "true",
                "isVerified": "true",
                "bankName": "Infinity",
                "isCombinedUser": combineduser
            });
      this.showView(frmFastAddInternationalAccount);
      //this.showDomesticAccounts();

      return;

    }
    if (initialContext.initialView === "addRecipient") {
      var payApersonEligibility = applicationManager.getUserPreferencesManager().checkP2PEligibilityForUser();
      if (payApersonEligibility === 'Activated') {
        var combineduser = applicationManager.getConfigurationManager().isCombinedUser === "true";
                applicationManager.getNavigationManager().setCustomInfo('componentP2P', {
                    "initialView": true,
                    "flowType": "ADD",
                    "beneficiaryType": "P2P",
                    "isCombinedUser": combineduser
                });
        this.showView(frmFastAddRecipient);
        return;
      } else {
        initialContext.activateRecipient = true;
      }
    }
    if (initialContext.transactionObject) {
      this.resetAndShowProgressBar();
      this.repeatTransfer(initialContext.transactionObject, initialContext.onCancelCreateTransfer);
      return;
    }
    if (initialContext.editTransactionObject) {
      this.resetAndShowProgressBar();
      this.showMakeTransferForEditTransaction(context.editTransactionObject, context.onCancelCreateTransfer);
      return;
    }
    if (initialContext.accountTo) {
      this.resetAndShowProgressBar();
            if (initialContext.Id != null || initialContext.Id != undefined) {
                this.loadAccounts(initialContext.displayName, {
                    accountTo: initialContext.accountTo,
                    Id: initialContext.Id
                }, null);
            } else {
				this.loadAccounts(initialContext.displayName, initialContext.accountTo, null);
			}
      return;
    }
      if (initialContext.accountFrom) {
        this.resetAndShowProgressBar();
        this.loadAccounts(initialContext.displayName, null, initialContext.accountFrom);
        return;
      }
    if (initialContext.showManageRecipients) {
      this.showView(frmFastManagePayee);
      //applicationManager.getNavigationManager().navigateTo(frmFastManagePayee);
     // this.showView(frmFastManagePayee);
      return;
    }
        if (initialContext.showRecipientGateway) {
      this.showView(frmFastRecipientGateWay);
      return;
    }
        if (initialContext.activateRecipient) {
      this.showView(frmFastActiveRecipient);
      return;
    }
    if (initialContext.deactivateRecipient) {
            this.showView(frmFastDeActiveRecipient, {
                "initialView": kony.application.getCurrentForm().id
            });
      return;
    }
    this.presentTransfers({
      /*gateway: {
          overrideFromAccount: initialContext.accountObject ? initialContext.accountObject.accountID : null
      }*/
      gateway: {
        overrideFromAccount: initialContext.initialView
      }
    })
  };
  
  /**
   * Method to reset the value to fetch the Past Payments
   */
    TransferFastPresentationController.prototype.getPastPayments = function(sortingData) {
//       applicationManager.getNavigationManager().navigateTo(frmPastPayments);
      this.showView(frmPastPayments);
      
    };
    TransferFastPresentationController.prototype.getDirectDebits = function() {
      this.showView(frmDirectDebits);
      //applicationManager.getNavigationManager().navigateTo(frmDirectDebits);
    };
  /**
   * Method to reset the value to fetch the Scheduled Payments
   */
    TransferFastPresentationController.prototype.getScheduledPayments = function(data) {
      this.showView(frmScheduledPayments);
      //applicationManager.getNavigationManager().navigateTo(frmScheduledPayments);
      //this.fetchScheduledPayments(data);
    };
  
  /** Shows Transfer form with existing transaction
     * @param {object} transactionObject Transaction Object
     * @param {function} onBackPressed when cancel is clicked
     */
    TransferFastPresentationController.prototype.repeatTransfer = function(transactionObject, onBackPressed) {
        this.showProgressBar();
        this.fetchFromAccounts(null, null, this.repeatTransferSuccess.bind(this, transactionObject, onBackPressed));
        this.fetchToAccounts(null, null, this.repeatTransferSuccess.bind(this, transactionObject, onBackPressed));
        //fetchUserAccountsAndProfile(this.businessController, this.repeatTransferSuccess.bind(this, transactionObject, onBackPressed));
    };
  /** Repeats the transaction successfully and then maps the data
     * @param {object} transactionObject Transaction Object
     * @param {function} onBackPressed when cancel is clicked
     * @param {object} userAccounts All Accounts of the User object
     * @param {object} externalAccounts All External Accounts of the User object
     */
    TransferFastPresentationController.prototype.repeatTransferSuccess = function(transactionObject, onBackPressed, viewModel) {
        var transaction = {
            repeatTransaction: {
                transactionObject: transactionObject,
                onBackPressed: onBackPressed,
                userAccounts: viewModel
            }
        };
        this.hideProgressBar();
        this.presentTransfers(transaction);
    };
   /** Shows Transfer for Editing a Transaction
     * @param {object} editTransactionObject Objct of Transaction Model
     * @param {function} onCancelCreateTransfer function to be binded on click of cancel button
     */
    TransferFastPresentationController.prototype.showMakeTransferForEditTransaction = function(editTransactionObject, onCancelCreateTransfer) {
    this.showProgressBar();
        this.fetchFromAccounts(null, null, this.showMakeTransferForEditTransactionSuccess.bind(this, editTransactionObject, onCancelCreateTransfer));
        this.fetchToAccounts(null, null, this.showMakeTransferForEditTransactionSuccess.bind(this, editTransactionObject, onCancelCreateTransfer));
    //fetchUserAccountsAndProfile(this.businessController, this.showMakeTransferForEditTransactionSuccess.bind(this, editTransactionObject, onCancelCreateTransfer));
  };
  /** Success callback after Editing a Transaction
     * @param {object} editTransactionObject Objct of Transaction Model
     * @param {function} onCancelCreateTransfer function to be binded on click of cancel button
     * @param {object} userAccounts All Accounts of the User object
     * @param {object} externalAccounts All External Accounts of the User object
     */
    TransferFastPresentationController.prototype.showMakeTransferForEditTransactionSuccess = function(editTransactionObject, onCancelCreateTransfer, viewModel) {
    var transaction = {
      editTransaction: {
        editTransactionObject: editTransactionObject,
        onCancelCreateTransfer: onCancelCreateTransfer,
        userAccounts: viewModel
      }
    };
    this.hideProgressBar();
    this.presentTransfers(transaction);
  };
    TransferFastPresentationController.prototype.resetAndShowProgressBar = function() {
    this.presentTransfers({
      resetAndShowProgressBar: {}
    })
  };
  /**
  * This method is used to search for recipients.
  * @param {String} data - Contains the search string.
  */
    TransferFastPresentationController.prototype.searchPayAPerson = function(data) {
    this.showProgressBar();
    var self = this;
    if (data && data.searchKeyword.length > 0) {
      var searchInputs = {
        'searchString': data.searchKeyword
      };
      var criteria = kony.mvc.Expression.eq("searchString", searchInputs.searchString);
      applicationManager.getRecipientsManager().getP2PRecipientList(criteria, this.searchPayAPersonSuccess.bind(this, searchInputs), this.searchPayAPersonFailure.bind(this));
    }
  };
  /**
  * This method acts as the success call back for the searchPayAPerson method.
  * @param {Object} searchInputs - contains the search string used for the search.
  * @param {Object} response - contains the response for the search.
  */
    TransferFastPresentationController.prototype.searchPayAPersonSuccess = function(searchInputs, response) {
    var viewProperties = {};
    viewProperties.searchPayAPerson = {
      payAPersonData: response,
      searchInputs: searchInputs
    };
    this.showView(frmFastManagePayee, viewProperties);
  };
  /**
  * This method is used as the failure callback for the searchPayAPerson.
  * @param {String} errmsg - this contains the error message for the pay a person.
  */
    TransferFastPresentationController.prototype.searchPayAPersonFailure = function(errmsg) {
    var viewProperties = {};
    viewProperties.inFormError = errmsg;
    this.showView(frmFastManagePayee, viewProperties);
    this.hideProgressBar();
  };
  /** Search Payees
     * @member  TransferFastPresentationController
     * @param  {object} data Search Inputs
     * @throws {void} None
     * @returns {void} None
     */
    TransferFastPresentationController.prototype.searchTransferPayees = function(data) {
    if (data && data.searchKeyword.length > 0) {
      var searchInputs = {
        searchString: data.searchKeyword
      }
      var criteria = kony.mvc.Expression.eq("searchString", data.searchKeyword)
      this.showProgressBar();
      applicationManager.getAccountManager().fetchExternalAccountsByCriteria(criteria, this.searchSuccess.bind(this, searchInputs), this.searchFailure.bind(this));
    }
  };
  TransferFastPresentationController.prototype.payDueDetails = function(data) {
    var loanManager = applicationManager.getAccountManager();
    loanManager.fetchAccountDetails(data, this.paySuccessDetailsTransfer.bind(this, data), this.payErrorDetailsTransfer.bind(this, data));
  };
  TransferFastPresentationController.prototype.paySuccessDetailsTransfer = function(data, response) {
    var viewModel = {};
    viewModel.paydueDetails = response;
    this.hideProgressBar();
    this.showView(frmFastTransfers, viewModel)
  };
  TransferFastPresentationController.prototype.payErrorDetailsTransfer = function(data, response) {
    var viewModel = {};
        viewModel.searchTransferPayees = {
            "error": response.errorMessage
        };
    this.hideProgressBar();
    this.showView(frmFastTransfers, viewModel);
  };
  
  TransferFastPresentationController.prototype.payLoanOff = function(data, context) {
    var self = this;
    self.showProgressBar();
    applicationManager.getTransactionManager().createTransferToOwnAccounts(data, this.onSuccessPayLoanOff.bind(this, data, context), this.onFailurePayLoanOff.bind(this));
  };

  TransferFastPresentationController.prototype.onSuccessPayLoanOff = function(data, context, response) {
    var responseData = {
      "data": data,
      "referenceId": response.referenceId
    };
    if (context === "TransferLoan") {
      this.showView(frmFastTransfers, responseData)
    } 
    this.hideProgressBar();
  };

  TransferFastPresentationController.prototype.onFailurePayLoanOff = function(response) {
    var viewModel = {};
        viewModel.searchTransferPayees = {
            "error": response.errorMessage
        };
    this.hideProgressBar();
    this.showView(frmFastTransfers, viewModel);
    this.hideProgressBar();
  };
  /** Search Payees
     * @member  searchSuccess
     * @param  {object} searchInputs Search Inputs
     * @param  {object} payees payees
  */
    TransferFastPresentationController.prototype.searchSuccess = function(searchInputs, payees) {
    var viewModel = {};
    viewModel.searchTransferPayees = {
      externalAccounts: payees,
      searchInputs: searchInputs
    }
    this.hideProgressBar();
    this.showView(frmFastManagePayee, viewModel)
  }
  /** Search Payees error
     * @member  TransferFastPresentationController
     * @param  {object} searchInputs Search Inputs
     * @param {object} response
     * @returns {void} None
     */
    TransferFastPresentationController.prototype.searchFailure = function(searchInputs, response) {
    var viewModel = {};
        viewModel.searchTransferPayees = {
            "error": response.errorMessage
        };
    this.hideProgressBar();
    this.showView(frmFastManagePayee, viewModel);
  }
  /**
     * This function is used to show manage recipients tab view.
     */
    TransferFastPresentationController.prototype.showRecipients = function(sortingInputs) {
    this.showProgressBar();
    applicationManager.getPaginationManager().resetValues();
    this.fetchRecipientsList(sortingInputs);
  };
  /**
  * This function is used to fetch the recipients(pay a person payees) list.
  *@param {String} view - this is used the required view  either SendMoneyTab or manageRecipientsTab.
  */
    TransferFastPresentationController.prototype.fetchRecipientsList = function(sortingInputs) {
    var params, sortConfig;
    var paginationManager = applicationManager.getPaginationManager();
    sortConfig = this.manageRecipientSortConfig;
    params = paginationManager.getValues(sortConfig, sortingInputs);
    var criteria = kony.mvc.Expression.and(kony.mvc.Expression.eq("sortBy", params.sortBy), kony.mvc.Expression.eq("order", params.order), kony.mvc.Expression.eq("offset", params.offset), kony.mvc.Expression.eq("limit", params.limit));
    var recipientsManager = applicationManager.getRecipientsManager();
    recipientsManager.getP2PRecipientList(criteria, this.fetchRecipientsListSuccess.bind(this, sortConfig), this.fetchRecipientsListFailure.bind(this));
  };
  /**
     * This function acts as the success call back for the fetchRecipientsList.
     *@param {array} response - it contains a list of recipients.
     *@param {String} view - it represents the view to be displayed.
     */
    TransferFastPresentationController.prototype.fetchRecipientsListSuccess = function(sortConfig, response) {
    var viewProperties = {};
    var paginationManager = applicationManager.getPaginationManager();
    if (response.length > 0) {
      viewProperties.ShowRecipients = response;
      paginationManager.updatePaginationValues();
      viewProperties.pagination = paginationManager.getValues(sortConfig);
      viewProperties.pagination.limit = response.length;
      viewProperties.pagination.config = sortConfig;
    } else {
      var values = paginationManager.getValues(sortConfig);
      if (values.offset === 0) {
        viewProperties.ShowRecipients = response;
      } else {
        viewProperties.noMoreRecords = true;
      }
    }
    this.showView(frmFastManagePayee, viewProperties);
    this.hideProgressBar();
  };
  /**
   * This function acts as the failure call back for the fetchRecipientsList.
   *@param {String} response - the error message for the service.
   */
    TransferFastPresentationController.prototype.fetchRecipientsListFailure = function(response) {
        this.showView(frmFastManagePayee, {
            "inFormError": response
        });
    this.hideProgressBar();
  };
  /**
     * This function is used to fetch the next set(page) of recipients.
     * @param {string} View - this represents the view to be shown.
     */
    TransferFastPresentationController.prototype.fetchNextRecipientsList = function(view) {
    this.showProgressBar();
    var paginationManager = applicationManager.getPaginationManager();
    paginationManager.getNextPage();
    this.fetchRecipientsList(view);
  };
  /**
   * This function is used to fetch the previous set(page) of recipients.
   * @param{string} View - this represents the view to be shown.
   */
    TransferFastPresentationController.prototype.fetchPreviousRecipientsList = function(view) {
    this.showProgressBar();
    var PaginationManager = applicationManager.getPaginationManager();
    PaginationManager.getPreviousPage();
    this.fetchRecipientsList(view);
  };
  /**Resets the pagination value to fetch external transactions
    * @param {object} data data for sorting
  */
    TransferFastPresentationController.prototype.showExternalAccounts = function(data) {
    var paginationManager = applicationManager.getPaginationManager();
    paginationManager.resetValues();
    this.fetchExternalAccounts(data);
  };
  /**Shows External Accounts Based on flow
   * @param {object} navFlow flow from where the external accounts are suppose to show
   */
    TransferFastPresentationController.prototype.fetchExternalAccounts = function(navFlow) {
    var paginationManager = applicationManager.getPaginationManager();
    var params = paginationManager.getValues(this.externalAccountsConfig, navFlow);
    if (navFlow !== undefined) {
      params.sortBy = navFlow.sortBy;
        } else {
      params.sortBy = "createdOn";
    }
    this.getExternalAccounts({
      "offset": params.offset,
      "limit": params.limit,
      'resetSorting': true,
      "sortBy": params.sortBy,
      "order": params.order
    });
  }
  /** Get External accounts from backend
     * @param {object} value - Sorting and pagination parameters
     */
    TransferFastPresentationController.prototype.getExternalAccounts = function(value) {
    var recipientManager = applicationManager.getRecipientsManager();
    this.showProgressBar();
    recipientManager.fetchAllExternalAccountsWithPagination(value, this.getExternalAccountsSuccess.bind(this), this.getExternalAccountsFailure.bind(this));
  };
  /**Success callback after external accounts are fetched and updates the from transfers
   * @param  {object} response object which consists of external account
   */
    TransferFastPresentationController.prototype.getExternalAccountsSuccess = function(response) {
    var paginationManager = applicationManager.getPaginationManager();
    var viewProperties = {};
    if (response.ExternalAccounts.length > 0) {
      paginationManager.updatePaginationValues();
      viewProperties.externalAccounts = response.ExternalAccounts;
      viewProperties.pagination = paginationManager.getValues(this.externalAccountsConfig);
      viewProperties.pagination.limit = response.ExternalAccounts.length;
      viewProperties.config = this.externalAccountsConfig;
    } else {
        var values = paginationManager.getValues(this.externalAccountsConfig);
        if (values.offset === 0) {
          viewProperties.externalAccounts = response.ExternalAccounts;
          viewProperties.fromExternalAccount = true;
          viewProperties.noTransaction = true;
        } else {
            viewProperties.noMoreRecords = true;
        }
    }
    this.hideProgressBar();
    this.showView(frmFastManagePayee, viewProperties);
  };
  /**Failure callback when external accounts are fetched
     * @param  {object} response failure object which comes from backend
     */
    TransferFastPresentationController.prototype.getExternalAccountsFailure = function(response) {
    var errorExternalAccounts = "errorExternalAccounts";
    this.hideProgressBar();
    this.showView(frmFastManagePayee, errorExternalAccounts);
  };
  /**Initialises the pagination values to fetch external accounts for next page
   */
    TransferFastPresentationController.prototype.fetchNextExternalAccounts = function() {
    var paginationManager = applicationManager.getPaginationManager();
    paginationManager.getNextPage();
    this.fetchExternalAccounts();
  };
  /**Initialises the pagination values to fetch external accounts for previous page
     */
    TransferFastPresentationController.prototype.fetchPreviousExternalAccounts = function() {
    var paginationManager = applicationManager.getPaginationManager();
    paginationManager.getPreviousPage();
    this.fetchExternalAccounts();
  };
  /** Deletes External Account
     * @param {JSON} payload
     */
    TransferFastPresentationController.prototype.deleteExternalAccount = function(payload, length) {
        if (length === 1) {
            var paginationManager = applicationManager.getPaginationManager();
            paginationManager.getPreviousPage();
        }
        var recipientsManager = applicationManager.getRecipientsManager();
        this.showProgressBar();
        recipientsManager.deleteABenificiary(
            payload, this.deleteExternalAccountSuccess.bind(this), this.deleteExternalAccountFailure.bind(this));
    };
  /** Shows External Account after deletion
     * @param {object} response Success response after deletion
     */
    TransferFastPresentationController.prototype.deleteExternalAccountSuccess = function(response) {
    this.fetchExternalAccounts();
  };
  /** Failure callback when Deletion of External Account fails
     */
    TransferFastPresentationController.prototype.deleteExternalAccountFailure = function() {
        this.showView(frmFastManagePayee, {
            "serverError": true
        });
    this.hideProgressBar();
  };
  /**
 *  deletes a payaperson recipient.
 * @param {object}  payeeID - payee Id to be deleted.
 */
    TransferFastPresentationController.prototype.deleteRecipient = function(payeeID) {
    this.showProgressBar();
        var params = {
            "PayPersonId": payeeID
        };
    applicationManager.getRecipientsManager().deleteP2PRecipient(params, this.deleteRecipientSuccess.bind(this), this.deleteRecipientFailure.bind(this));
  };
  /**
   * This method acts as the success Call back for the deleteRecipient.
   * @param {object}  response - status of deleting a recipient - success or failure.
   */
    TransferFastPresentationController.prototype.deleteRecipientSuccess = function(response) {
    this.fetchCurrentRecipientsList();
  };
  /**
   * This method acts as the failure method for deleteRecipient.
   * @param {object}  payeeID - payee Id to be deleted.
   */
    TransferFastPresentationController.prototype.deleteRecipientFailure = function(response) {
        this.showView(frmFastManagePayee, {
            "serverError": true
        });
    this.hideProgressBar();
  };
  /**
   * This function is used to fetch the current set(page) of recipients.
   * @param {string} view - this represents the view to be shown.
   */
    TransferFastPresentationController.prototype.fetchCurrentRecipientsList = function() {
    this.showProgressBar();
    var PaginationManager = applicationManager.getPaginationManager();
    PaginationManager.getCurrentPage();
    this.fetchRecipientsList();
  };
  /**
     * This method is used to check the eligibility of user for p2p service.
     */
    TransferFastPresentationController.prototype.checkP2pEligibility = function() {
    return applicationManager.getUserPreferencesManager().checkP2PEligibilityForUser();
  };
  /**
     * used to show the Transfer Page and executes the particular Page.
     * @param {string} frm  used to load the form
     * @param {object}  data  used to load the particular form and having key value pair.
     */
    TransferFastPresentationController.prototype.showView = function(frm, data) {
    if (kony.application.getCurrentForm().id !== frm) {
      applicationManager.getNavigationManager().navigateTo({
			"appName":"TransfersMA",
			"friendlyName":frm });
//       var obj = {
//         "context": this,
//         "callbackModelConfig":{"frm":frm, "UIModule":"TransferFastUIModule"}
//       };
//       var navManager = kony.mvc.getNavigationManager();
//       navManager.navigate(obj);
    }
    if (data) {
      applicationManager.getNavigationManager().updateForm(data, {
			"appName":"TransfersMA",
			"friendlyName":frm });
    }
  };
    TransferFastPresentationController.prototype.fetchP2PdataSettings = function(id) {
    //applicationManager.getNavigationManager().navigateTo(frmP2PSettings);
      this.showView(frmP2PSettings);
    var userData = {};
    userData.userDetails = {
      "userId": applicationManager.getUserPreferencesManager().getUserId(),
            "userName": applicationManager.getUserPreferencesManager().getUserObj()["userfirstname"] + " " + applicationManager.getUserPreferencesManager().getUserObj()["userlastname"],
      "phone": this.getPrimaryDetails(applicationManager.getUserPreferencesManager().getEntitlementPhoneNumbers()),
      "email": this.getPrimaryDetails(applicationManager.getUserPreferencesManager().getEntitlementEmailIds()),
      "formId": id
    };
    userData.accounts = applicationManager.getAccountManager().getFromTransferSupportedAccounts();
    this.showView(frmP2PSettings, userData);
  };
  /** Presents Transfer Form
     * @param {object} viewModel - To handle the flow of where it is suppose to go
     */
    TransferFastPresentationController.prototype.presentTransfers = function(viewModel) {
    if (kony.application.getCurrentForm().id !== frmFastTransfers) {
//       applicationManager.getNavigationManager().navigateTo(frmFastTransfers);
      this.showView(frmFastTransfers);
    }
    applicationManager.getNavigationManager().updateForm(viewModel, frmFastTransfers);
  };
  /**Load Accounts by Transfer Type
   * @param {string} type Type of Transfer
   * @param {object} accountTo Account to object
   * @param {object} accountFrom Account From Object
   */
    TransferFastPresentationController.prototype.loadAccounts = function(type, accountTo, accountFrom) {
    this.displayName = type;
    this.showProgressBar();
    this.fetchFromAccounts(accountTo, accountFrom, this.presentTransfers.bind(this));
    this.fetchToAccounts(accountTo, accountFrom, this.presentTransfers.bind(this));
  };
  /**Fetch From Accounts
   */
    TransferFastPresentationController.prototype.fetchFromAccounts = function(accountTo, accountFrom, successCall) {
    var configurationManager = applicationManager.getConfigurationManager();
        applicationManager.getAccountManager().fetchInternalAccounts(this.fetchFromAccountSuccess.bind(this, accountTo, accountFrom, successCall), this.fetchFromAccountError.bind(this));
  };

    TransferFastPresentationController.prototype.getAllowedFromAccounts = function(accounts) {
    var CREATE_ACTIONS = [
      "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE",
      "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE",
      "INTRA_BANK_FUND_TRANSFER_CREATE",
      "P2P_CREATE_RECEPIENT",
      "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE"
    ];
     return accounts.filter(this.isAccountHaveAtleastOneActions.bind(this, CREATE_ACTIONS));
  }

    TransferFastPresentationController.prototype.isAccountHaveAtleastOneActions = function(permissions, accountObject) {
    return permissions.some(function(permission) {
            return applicationManager.getConfigurationManager().checkAccountAction(accountObject.accountID, permission)
    })
  }

  /**Success Callback of From Accounts Service call
   */
    TransferFastPresentationController.prototype.fetchFromAccountSuccess = function(accountTo, accountFrom, successCall, response) {
    flagFrmAccounts = true;
    // Getting All accounts. Chnaged after new permission framework
    frmAccounts = this.getAllowedFromAccounts(applicationManager.getAccountManager().getInternalAccounts());  
    frmAccounts =  frmAccounts.filter(function (account) {
      return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
    })  
    for (var vals in frmAccounts) {
      frmAccounts[vals].type = "OWN_INTERNAL_ACCOUNTS"
    }
    if (flagFrmAccounts === true && flagToAccounts === true) {
      var toSupportedAccounts = applicationManager.getAccountManager().getToTransferSupportedAccounts();
      for (var vals in toSupportedAccounts) {
        toSupportedAccounts[vals].type = "OWN_INTERNAL_ACCOUNTS"
      }
            allAccounts = toSupportedAccounts.length > 0 ? toSupportedAccounts.concat(toAccounts) : toAccounts;
      if (p2pEnabled) {
        viewModel = {
          accountsValue: {
            fromAccounts: frmAccounts,
            toAccounts: allAccounts,
            p2pEnabled: p2pEnabled,
            p2pSuccess: p2pSuccess,
            accountTo: accountTo,
            accountFrom: accountFrom
          }
        };
      } else {
        viewModel = {
          accountsValue: {
            fromAccounts: frmAccounts,
            toAccounts: allAccounts,
            p2pEnabled: p2pEnabled,
            accountTo: accountTo,
            accountFrom: accountFrom
          }
        };
      }
      flagFrmAccounts = false;
      flagToAccounts = false;
      successCall(viewModel);
    }
    this.hideProgressBar();
    //this.presentTransfers(viewModel);
  };
    TransferFastPresentationController.prototype.fetchFromAccountError = function(responce) {
    CommonUtilities.showServerDownScreen();
  };
    TransferFastPresentationController.prototype.showProgressBar = function() {
        applicationManager.getNavigationManager().updateForm({
            isLoading: true
        });
  };
    TransferFastPresentationController.prototype.hideProgressBar = function() {
        applicationManager.getNavigationManager().updateForm({
            isLoading: false
        });
  };
  /** Parallely fetches the initial data - User Accounts and User Profile
     * @param  {object} businessController
     * @param  {function} success callback when successfull
     * @param  {function} error callback when unsuccessfull
     */
    TransferFastPresentationController.prototype.fetchToAccounts = function(accountTo, accountFrom, successCall) {
    var self = this;

    function completionCallback(calls, accountTo, accountFrom, successCall, asyncResponse) {
      var accounts = [];
      if (asyncResponse.isAllSuccess()) {
        var responseList = this.updateResponseList(asyncResponse.responses, calls);
        for (var vals in responseList) {
          if (responseList[vals].data.ExternalAccounts)
            accounts = accounts.concat(responseList[vals].data.ExternalAccounts);
          else if (responseList[vals].data.PayPerson)
            accounts = accounts.concat(responseList[vals].data.PayPerson);
          else
            accounts = accounts.concat(responseList[vals].data);
        }
        toAccounts = accounts;
        flagToAccounts = true;
        //self.hideProgressBar();
        if (flagFrmAccounts === true && flagToAccounts === true) {
          this.sendDataAndResetFlags(p2pEnabled, p2pSuccess, accountTo, accountFrom, successCall);
        }
        //self.hideProgressBar();
      } else if (calls.includes("P2P_MEMBER") && asyncResponse.responses[calls.length - 1].isSuccess === false) {
        p2pSuccess = false;
        var responseList = this.updateResponseList(asyncResponse.responses, calls);
        for (var vals in responseList) {
          if (responseList[vals].data.ExternalAccounts)
            accounts = accounts.concat(responseList[vals].data.ExternalAccounts);
          else if (responseList[vals].data.PayPerson)
            accounts = accounts.concat(responseList[vals].data.PayPerson);
          else
            accounts = accounts.concat(responseList[vals].data);
        }
        toAccounts = accounts;
        flagToAccounts = true;
        self.hideProgressBar();
        if (flagFrmAccounts === true && flagToAccounts === true) {
          this.sendDataAndResetFlags(p2pEnabled, p2pSuccess, accountTo, accountFrom, successCall);
        }
        self.hideProgressBar();
        //error();
      } else {
        CommonUtilities.showServerDownScreen();
      }
    }
    var asyncManager = applicationManager.getAsyncManager();
    var res = this.checkServiceConfiguration();
    var calls = res[0];
    asyncManager.callAsync(res[1], completionCallback.bind(this, calls, accountTo, accountFrom, successCall));
  };
    TransferFastPresentationController.prototype.checkServiceConfiguration = function() {
    var asyncManager = applicationManager.getAsyncManager();
    var configurationManager = applicationManager.getConfigurationManager();
    var serviceCalls = [];
    var calls = [];
        if (applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_CREATE") === true) {
    //if (configurationManager.isOtherKonyAccountsTransfer == "true") {
      calls.push("OTHER_INTERNAL_MEMBER");
      serviceCalls.push(asyncManager.asyncItem(applicationManager.getRecipientsManager(), 'fetchAllInternalBenificiaries'));
    }
        if (applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") === true) {
    //if (configurationManager.isOtherBankAccountsTransfer == "true") {
      calls.push("OTHER_EXTERNAL_MEMBER");
      serviceCalls.push(asyncManager.asyncItem(applicationManager.getRecipientsManager(), 'fetchAllExternalBenificiaries'));
    }
        if (applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") === true) {
    //if (configurationManager.isInternationalAccountsTransfer == "true") {
      calls.push("INTERNATIONAL_MEMBER");
      serviceCalls.push(asyncManager.asyncItem(applicationManager.getRecipientsManager(), 'fetchInternationalRecepients'));
    }
    //if (applicationManager.getConfigurationManager().checkUserPermission("P2P_ACTIVATE") === true){
    if (applicationManager.getUserPreferencesManager().checkP2PEligibilityForUser() !== 'NotEligible') {
            if (applicationManager.getConfigurationManager().checkUserPermission("P2P_CREATE") === true) {
      if (this.checkP2pEligibility() === 'Activated') {
        p2pEnabled = true;
        calls.push("P2P_MEMBER");
        serviceCalls.push(asyncManager.asyncItem(applicationManager.getRecipientsManager(), 'getP2PRecipientList', [""]));
      } else {
        p2pEnabled = false;
      }
     }
    }
    return [calls, serviceCalls];
  };
    TransferFastPresentationController.prototype.sendDataAndResetFlags = function(p2pEnabled, p2pSuccess, accountTo, accountFrom, successCall) {
    var toSupportedAccounts = applicationManager.getAccountManager().getToTransferSupportedAccounts();
    for (var vals in toSupportedAccounts) {
      toSupportedAccounts[vals].type = "OWN_INTERNAL_ACCOUNTS"
    }
        allAccounts = toSupportedAccounts.length > 0 ? toSupportedAccounts.concat(toAccounts) : toAccounts;
    var viewModel = this.createJson(p2pEnabled, p2pSuccess, accountTo, accountFrom);
    flagFrmAccounts = false;
    flagToAccounts = false;
    successCall(viewModel);
  };
    TransferFastPresentationController.prototype.updateResponseList = function(responseList, calls) {
    if (calls.includes("OTHER_INTERNAL_MEMBER")) {
      var index = calls.indexOf("OTHER_INTERNAL_MEMBER");
      if (responseList[index].isSuccess) {
          for (var vals in responseList[index].data.ExternalAccounts) {
          responseList[index].data.ExternalAccounts[vals].accountType = "External";
          responseList[index].data.ExternalAccounts[vals].type = "OTHER_INTERNAL_MEMBER"
      }
    } else {
        CommonUtilities.showServerDownScreen();
      }
    }
    if (calls.includes("OTHER_EXTERNAL_MEMBER")) {
      var index = calls.indexOf("OTHER_EXTERNAL_MEMBER");
      if (responseList[index].isSuccess) {
        for (var vals in responseList[index].data.ExternalAccounts) {
          responseList[index].data.ExternalAccounts[vals].accountType = "External";
          responseList[index].data.ExternalAccounts[vals].type = "OTHER_EXTERNAL_ACCOUNT"
        }
      } else {
        CommonUtilities.showServerDownScreen();
      }
    }
    if (calls.includes("INTERNATIONAL_MEMBER")) {
      var index = calls.indexOf("INTERNATIONAL_MEMBER");
      if (responseList[index].isSuccess) {
        for (var vals in responseList[index].data.ExternalAccounts) {
          responseList[index].data.ExternalAccounts[vals].accountType = "External";
          responseList[index].data.ExternalAccounts[vals].type = "INTERNATIONAL_ACCOUNT"
        }
      } else {
        CommonUtilities.showServerDownScreen();
      }
    }
    if (calls.includes("P2P_MEMBER")) {
      var index = calls.indexOf("P2P_MEMBER");
      if (responseList[index].isSuccess) {
        for (var vals in responseList[index].data.PayPerson) {
          responseList[index].data.PayPerson[vals].type = "P2P_ACCOUNT";
        }
      }
    }
    return responseList;
  };
    TransferFastPresentationController.prototype.createJson = function(p2pEnabled, p2pSuccess, accountTo, accountFrom) {
    if (p2pEnabled) {
      return viewModel = {
        accountsValue: {
          fromAccounts: frmAccounts,
          toAccounts: allAccounts,
          p2pEnabled: p2pEnabled,
          p2pSuccess: p2pSuccess,
          accountTo: accountTo,
          accountFrom: accountFrom
        }
      };
    } else {
      return viewModel = {
        accountsValue: {
          fromAccounts: frmAccounts,
          toAccounts: allAccounts,
          p2pEnabled: p2pEnabled,
          accountTo: accountTo,
          accountFrom: accountFrom
        }
      };
    }
  };
  /** Confirm Transfer  - Shows Confirmation for transfer
     * @param {object} makeTransferViewModel data of transfer
     * @param {object} formData new data
     */
    TransferFastPresentationController.prototype.confirmFastTransfer = function(makeTransferViewModel, formData) {
    var transfer = {
      transferConfirm: {
        makeTransferViewModel: makeTransferViewModel,
        transferData: formData
      }
    };
      this.showView(frmReview);
    //applicationManager.getNavigationManager().navigateTo(frmReview);
    applicationManager.getNavigationManager().updateForm(transfer, frmReview);
  };
  /**Saves Transfer Data
    * @param {object} transferData Create Transfer from form Data
    */
    TransferFastPresentationController.prototype.createTransfer = function(transferData) {
    this.transferData = transferData;
    var mfaManager = applicationManager.getMFAManager();
    mfaManager.setMFAOperationType("CREATE");
    if (transferData.serviceName) {
      mfaManager.setServiceId(transferData.serviceName);
    } else {
            if (transferData.action === undefined || transferData.action == "") {
        var displayName = applicationManager.getPresentationUtility().MFA.getDisplayNameForTransfer(transferData.accountTo.type);
        applicationManager.getPresentationUtility().MFA.getServiceIdBasedOnDisplayName(displayName);
      }
    }
    var mfaParams = {
      serviceName: mfaManager.getServiceId(),
    };
    var transactionManager = applicationManager.getTransactionManager();
    transactionManager.setTransactionAttribute("fromAccountNumber", transferData.fromAccountNumber.accountID);
    transactionManager.setTransactionAttribute("amount", transferData.amount);
    transactionManager.setTransactionAttribute("transactionAmount", transferData.amount);
    transactionManager.setTransactionAttribute("transactionsNotes", transferData.notes);
    transactionManager.setTransactionAttribute("ExternalAccountNumber", transferData.ExternalAccountNumber);
    transactionManager.setTransactionAttribute("isScheduled", transferData.isScheduled);
    transactionManager.setTransactionAttribute("transactionType", transferData.transactionType);
    transactionManager.setTransactionAttribute("toAccountNumber", transferData.toAccountNumber);
    transactionManager.setTransactionAttribute("personId", transferData.personId);
    transactionManager.setTransactionAttribute("p2pContact", transferData.p2pContact);
    transactionManager.setTransactionAttribute("frequencyType", transferData.frequencyType);
    transactionManager.setTransactionAttribute("numberOfRecurrences", transferData.numberOfRecurrences);
    transactionManager.setTransactionAttribute("frequencyEndDate", transferData.frequencyEndDate);
    transactionManager.setTransactionAttribute("scheduledDate", transferData.scheduledDate); 
    if (transferData.accountTo.isInternationalAccount === "true") {
      transactionManager.setTransactionAttribute("transactionCurrency", transferData.currency);
        } else {
      transactionManager.setTransactionAttribute("transactionCurrency", transferData.fromAccountCurrency);   
    }
	if (transferData.accountTo.isInternationalAccount === "true") {
            transactionManager.setTransactionAttribute("swiftCode", transferData.swiftCode);
        }
	transactionManager.setTransactionAttribute("beneficiaryName", transferData.beneficiaryName);
    transactionManager.setTransactionAttribute("fromAccountCurrency", transferData.fromAccountCurrency);  
	transactionManager.setTransactionAttribute("routingNumber", transferData.accountTo.routingNumber);	
    transactionManager.setTransactionAttribute("toAccountCurrency", null);
        if (transferData.transactionType === "ExternalTransfer") {
            if (transferData.accountTo.beneficiaryId !== undefined && transferData.accountTo.beneficiaryId !== null) {
        transactionManager.setTransactionAttribute("beneficiaryId", transferData.accountTo.beneficiaryId);
            } else if (transferData.accountTo.Id !== undefined && transferData.accountTo.Id !== null) {
        transactionManager.setTransactionAttribute("beneficiaryId", transferData.accountTo.Id);
      }
    }
        if (transferData.transactionType === "InternalTransfer")
      transactionManager.setTransactionAttribute("toAccountCurrency", transferData.toAccountCurrency);
    transactionManager.setTransactionAttribute("MFAAttributes", mfaParams);
    //transactionManager.setTransactionAttribute("serviceName", mfaManager.getServiceId());
    this.showProgressBar();
    this.createTransferBasedOnType(transactionManager.getTransactionObject(), transferData);
  };


    TransferFastPresentationController.prototype.createTransferBasedOnType = function(data, transferData) {
    var mfaManager = applicationManager.getMFAManager();
    var type = transferData.accountTo.type;
     var transactionManager = applicationManager.getTransactionManager();
    var successCallBack = this.createTransferSuccessCallback.bind(this);
    var errorCallback = this.createTransferErrorCallback.bind(this, transferData);
    if (transferData.accountTo.isInternationalAccount === "true") {
             var transformedData = this.transformData1(data);
        } else {
        var transformedData = this.transformData(data);
		}

        switch (type) {
      case OLBConstants.TRANSFER_TYPES.OWN_INTERNAL_ACCOUNTS: 
        mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
                transactionManager.createTransferToOwnAccounts(transformedData, successCallBack, errorCallback)
        break;
      case OLBConstants.TRANSFER_TYPES.OTHER_INTERNAL_MEMBER: 
        mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_CREATE");
                transactionManager.createIntraBankAccFundTransfer(transformedData, successCallBack, errorCallback)
        break;
      case OLBConstants.TRANSFER_TYPES.OTHER_EXTERNAL_ACCOUNT:
        mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE");
                transactionManager.createInterBankAccFundTransfer(transformedData, successCallBack, errorCallback)
        break;
      case OLBConstants.TRANSFER_TYPES.INTERNATIONAL_ACCOUNT:
        mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE");
                transactionManager.createInternationalAccFundTransfer(transformedData, successCallBack, errorCallback)
        break;
      case OLBConstants.TRANSFER_TYPES.P2P_ACCOUNT:
        mfaManager.setMFAFlowType("P2P_CREATE");
        transformedData.personId = data.personId;
        transactionManager.createP2PTransaction(transformedData, successCallBack, errorCallback);
        break;
    }
   
  }

    TransferFastPresentationController.prototype.transformData = function(data) {
    return {
      "amount": data.amount,
      "transactionAmount": data.transactionAmount,
      "beneficiaryId": data.beneficiaryId,
      "frequencyEndDate": data.frequencyEndDate,
      "frequencyType": data.frequencyType,
      "fromAccountNumber": data.fromAccountNumber,
      "isScheduled": data.isScheduled,
      "scheduledDate": data.scheduledDate,
      "toAccountNumber": data.toAccountNumber,
      "transactionsNotes": data.transactionsNotes,
      "transactionType": data.transactionType,
      "transactionCurrency": data.transactionCurrency,
      "fromAccountCurrency": data.fromAccountCurrency,
      "toAccountCurrency": data.toAccountCurrency,
      "numberOfRecurrences": data.numberOfRecurrences,
      "ExternalAccountNumber": data.ExternalAccountNumber,
      "routingNumber": data.routingNumber,
	  "beneficiaryName": data.beneficiaryName
    }
  }
  TransferFastPresentationController.prototype.transformData1 = function(data) {
            return {
                "amount": data.amount,
                "beneficiaryId": data.beneficiaryId,
                "frequencyEndDate": data.frequencyEndDate,
                "frequencyType": data.frequencyType,
                "fromAccountNumber": data.fromAccountNumber,
                "isScheduled": data.isScheduled,
                "scheduledDate": data.scheduledDate,
                "toAccountNumber": data.toAccountNumber,
                "transactionsNotes": data.transactionsNotes,
                "transactionType": data.transactionType,
                "transactionCurrency": data.transactionCurrency,
                "fromAccountCurrency": data.fromAccountCurrency,
                "toAccountCurrency": data.toAccountCurrency,
                "numberOfRecurrences": data.numberOfRecurrences,
                "ExternalAccountNumber": data.ExternalAccountNumber,
                "routingNumber": data.routingNumber,
				"swiftCode": data.swiftCode,
				"beneficiaryName": data.beneficiaryName
            }
        }

  /**Success callback after the transaction is saved
   * @param {object} transferData transaction data
   * @param {object} response success response from backend
  */
    TransferFastPresentationController.prototype.createTransferSuccessCallback = function(response) {
    var mfaManager = applicationManager.getMFAManager();
    var operationName = this.getOperationName();
    if (response.referenceId && response.status === "Sent") {
            if (this.transferData.action) {
        var responseData = {
          "data": this.transferData,
          "referenceId": response.referenceId
        };
        var transferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule");
        if (this.transferData.action === "transferOther") {
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
        var acknowledgeViewModel = {};
        acknowledgeViewModel.transferData = this.transferData;
        this.fetchUserAccountAndNavigate(acknowledgeViewModel);
      }
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
    TransferFastPresentationController.prototype.fetchLimits = function(makeTransferViewModel, formData) {
    var featureAction;
        if (formData.accountTo.type === "OTHER_INTERNAL_MEMBER") {
		featureAction = "INTRA_BANK_FUND_TRANSFER_CREATE";
	}
        if (formData.accountTo.type === "OWN_INTERNAL_ACCOUNTS") {
		featureAction = "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE";
	}
        if (formData.accountTo.type === "OTHER_EXTERNAL_ACCOUNT") {
		featureAction = "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
	}
        if (formData.accountTo.type === "INTERNATIONAL_ACCOUNT") {
		featureAction = "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE";
	}
        if (formData.accountTo.type === "P2P_ACCOUNT") {
		featureAction = "P2P_CREATE";
	}
        applicationManager.getConfigurationManager().fetchLimitsForAnAction(featureAction, this.fetchLimitsSuccess.bind(this, makeTransferViewModel, formData), this.fetchLimitsError.bind(this));
  };
    TransferFastPresentationController.prototype.fetchLimitsSuccess = function(makeTransferViewModel, formData, response) {
    var viewModel = {
            limit: response,
            makeTransferViewModel: makeTransferViewModel,
            formData: formData
        };
        this.showView(frmFastTransfers ,viewModel);
  };
    TransferFastPresentationController.prototype.fetchLimitsError = function(response) {
    var viewmodel = {};
        if (response.errorMessage !== undefined || response.errorMessage !== null) {
      viewmodel.transferError = response.errorMessage;
      this.presentTransfers(viewmodel);
        } else {
      CommonUtilities.showServerDownScreen();
    }
    this.hideProgressBar();
  };
  /**Error callback after the transaction is saved
   * @param {object} response failure response from backend
  */
    TransferFastPresentationController.prototype.createTransferErrorCallback = function(transferData, response) {
        if (transferData.action) {
      var transferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule");
      transferModule.presentationController.presentTransfers({
        "serverError":  response.errorMessage
      });
        } else {
      var viewmodel = {};
      viewmodel.transferError = response.errorMessage;
      viewmodel.modifyTransaction = transferData;
      this.hideProgressBar();
      this.presentTransfers(viewmodel);
    }
  };
  /**Error callback after the transaction is saved
   * @param {object} response failure response from backend
  */
    TransferFastPresentationController.prototype.createTransferMFAErrorCallback = function(response) {
    var viewmodel = {};
    viewmodel.transferError = response.errorMessage;
    this.hideProgressBar();
    this.presentTransfers(viewmodel);
  };
  /** Refresh user account from which transfer is made and shows Acknowledge
   * @param  {object} acknowledgeViewModel JSON containing transfer data and reference number
   */
    TransferFastPresentationController.prototype.fetchUserAccountAndNavigate = function(acknowledgeViewModel) {
    var accountManager = applicationManager.getAccountManager();
    accountManager.fetchInternalAccounts(this.fetchUserAccountAndNavigateSuccess.bind(this, acknowledgeViewModel), this.fetchUserAccountAndNavigatesFailure.bind(this));
  };
    TransferFastPresentationController.prototype.fetchUserAccountAndNavigatesFailure = function() {
    this.hideProgressBar();
    CommonUtilities.showServerDownScreen();
  };
  /** When fetching of external Account Succeeds
   * @param {object} acknowledgeViewModel data of transaction
   * @param {object} response response from backend
       */
    TransferFastPresentationController.prototype.fetchUserAccountAndNavigateSuccess = function(acknowledgeViewModel, response) {
    this.hideProgressBar();
        acknowledgeViewModel.transferData.accountFrom = response.filter(function(account) {
            return acknowledgeViewModel.transferData.accountFrom.accountID === account.accountID
        })[0];
    this.presentTransferAcknowledge({
      transferAcknowledge: acknowledgeViewModel
    });
  };
  /** Present frmConfirmTransfer
   * @param {object} viewModel acknowledgement data
   */
    TransferFastPresentationController.prototype.presentTransferAcknowledge = function(viewModel) {
    this.showView(frmConfirmTransfer);
    //applicationManager.getNavigationManager().navigateTo(frmConfirmTransfer);
    applicationManager.getNavigationManager().updateForm(viewModel, frmConfirmTransfer);
  }
  /** Edit Transfer -
   * @param  {object} transaction Model  Object
   */
    TransferFastPresentationController.prototype.editTransfer = function(transactionObject) {
    var mfaManager = applicationManager.getMFAManager();
    mfaManager.setMFAOperationType("UPDATE");
    if (transactionObject.serviceName) {
      mfaManager.setServiceId(transactionObject.serviceName);
    } else {
      var displayName = applicationManager.getPresentationUtility().MFA.getDisplayNameForTransfer(transactionObject.accountTo.type);
      applicationManager.getPresentationUtility().MFA.getServiceIdBasedOnDisplayName(displayName);
    }
    var mfaParams = {
      serviceName: mfaManager.getServiceId(),
    };
    var transactionsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Transaction");
    var transactionOBJ = new transactionsModel({
      'transactionId': transactionObject.transactionId,
      'isScheduled': transactionObject.isScheduled ? "true" : "false",
      'fromAccountNumber': transactionObject.fromAccountNumber,
      'amount': transactionObject.amount,
      'transactionsNotes': transactionObject.transactionsNotes,
      'toAccountNumber': transactionObject.toAccountNumber,
      'frequencyType': transactionObject.frequencyType,
      'transactionType': transactionObject.transactionType,
      'scheduledDate': transactionObject.scheduledDate,
      'ExternalAccountNumber': transactionObject.ExternalAccountNumber,
      'numberOfRecurrences': transactionObject.numberOfRecurrences,
      'frequencyStartDate': transactionObject.frequencyStartDate,
      'frequencyEndDate': transactionObject.frequencyEndDate,
      'category': transactionObject.Category,
	    'routingNumber': transactionObject.accountTo.routingNumber,
      'MFAAttributes': mfaParams
    });
    if (transactionObject.confirmationNumber !== undefined) {
      transactionOBJ.confirmationNumber = transactionObject.confirmationNumber;
    }
    if (transactionObject.accountTo.beneficiaryId !== undefined && transactionObject.accountTo.beneficiaryId !== null) {
      transactionOBJ.beneficiaryId = transactionObject.accountTo.beneficiaryId;
    } else if (transactionObject.accountTo.Id !== undefined && transactionObject.accountTo.Id !== null) {
      transactionOBJ.beneficiaryId = transactionObject.accountTo.Id;
    }
    this.showProgressBar();
    this.editTransferBasedOnType(transactionOBJ, transactionObject.accountTo.type);
  };
    TransferFastPresentationController.prototype.editTransferBasedOnType = function(data, type) {
    var mfaManager = applicationManager.getMFAManager();
    var transactionManager = applicationManager.getTransactionManager();
    var successCallBack = this.editTransactionSuccess.bind(this);
    var errorCallback = this.editTransactionError.bind(this, data);
    var transformedData =  this.transformEditData(data);
        switch (type) {
      case OLBConstants.TRANSFER_TYPES.OWN_INTERNAL_ACCOUNTS: 
        mfaManager.setMFAFlowType("TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE");
                transactionManager.editTransferToOwnAccounts(transformedData, successCallBack, errorCallback);
        break;
      case OLBConstants.TRANSFER_TYPES.OTHER_INTERNAL_MEMBER: 
        mfaManager.setMFAFlowType("INTRA_BANK_FUND_TRANSFER_UPDATE");
                transactionManager.editIntraBankAccFundTransfer(transformedData, successCallBack, errorCallback);
        break;
      case OLBConstants.TRANSFER_TYPES.OTHER_EXTERNAL_ACCOUNT: 
        mfaManager.setMFAFlowType("INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE");
                transactionManager.editInterBankAccFundTransfer(transformedData, successCallBack, errorCallback);
        break;
      case OLBConstants.TRANSFER_TYPES.INTERNATIONAL_ACCOUNT: 
        mfaManager.setMFAFlowType("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE");
                transactionManager.editInternationalAccFundTransfer(transformedData, successCallBack, errorCallback);
        break;
      case OLBConstants.TRANSFER_TYPES.P2P_ACCOUNT:
        mfaManager.setMFAFlowType("P2P_EDIT");
        transactionManager.updateP2PTransaction(transformedData, successCallBack, errorCallback);
        break;
    }
   
  };
  TransferFastPresentationController.prototype.transformEditData = function(data) {
        var payload = {
      "amount": data.amount,
	  "beneficiaryId": data.beneficiaryId,
      "transactionId": data.transactionId,
      "frequencyEndDate": data.frequencyEndDate,
      "frequencyType": data.frequencyType,
      "fromAccountNumber": data.fromAccountNumber,
      "isScheduled": data.isScheduled,
      "scheduledDate": data.scheduledDate,
      "toAccountNumber": data.toAccountNumber,
      "transactionsNotes": data.transactionsNotes,
      "transactionType": data.transactionType,
      "transactionCurrency": data.transactionCurrency,
      "fromAccountCurrency": data.fromAccountCurrency,
      "toAccountCurrency": data.toAccountCurrency,
      "numberOfRecurrences": data.numberOfRecurrences,
      "ExternalAccountNumber": data.ExternalAccountNumber,
	  "routingNumber": data.routingNumber
    };
        if (data.confirmationNumber !== undefined) {
      payload.confirmationNumber = data.confirmationNumber;
    }
    return payload;
  };
    TransferFastPresentationController.prototype.editTransactionSuccess = function(response) {
    var mfaManager = applicationManager.getMFAManager();
    var operationName = this.getOperationName();
    if (response && response.MFAAttributes && response.MFAAttributes.isMFARequired) {
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
    } else {
            this.showTransferScreen({
                "initialView": "scheduled"
            });
    }
  };
    TransferFastPresentationController.prototype.editTransactionError = function(transactionObj, response) {
    var transferData = {};
    transferData.transferError = response.errorMessage;
    transferData.modifyTransaction = transactionObj;
    this.hideProgressBar();
    this.presentTransfers(transferData);
  };
  /**Shows Transfer form with existing transferData
     * @param {object} transferConfirmViewModel
     */
    TransferFastPresentationController.prototype.modifyTransaction = function(transferConfirmViewModel) {
        this.presentTransfers({
            modifyTransaction: transferConfirmViewModel.transferData
        });
  };
  /**
   * This method is used to fetch the pay a person details.
   * @param {Object} userData - contains the list of properties to be updated in the pay a person screen.
   */
    TransferFastPresentationController.prototype.fetchP2Pdata = function() {
    var userData = {};
    userData.userDetails = {
      "userId": applicationManager.getUserPreferencesManager().getUserId(),
            "userName": applicationManager.getUserPreferencesManager().getUserObj()["userfirstname"] + " " + applicationManager.getUserPreferencesManager().getUserObj()["userlastname"],
      "phone": this.getPrimaryDetails(applicationManager.getUserPreferencesManager().getEntitlementPhoneNumbers()),
      "email": this.getPrimaryDetails(applicationManager.getUserPreferencesManager().getEntitlementEmailIds())
    };
    // Need to discuss
    userData.accounts = applicationManager.getAccountManager().getFromTransferSupportedAccounts();
    this.showView(frmFastActiveServices, userData);
  };
  /**
   * Method to get user's primary details
   */
    TransferFastPresentationController.prototype.getPrimaryDetails = function(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].isPrimary === "true") {
        return data[i].Value;
      }
    }
  };

  /**
   * used to get the savings and checking accounts.
   * @param {object} accounts - get the accounts
   */
    TransferFastPresentationController.prototype.getPayAPersonSupportedAccounts = function() {
    var payAPersonAccounts = [];
    var accounts = applicationManager.getAccountManager().getFromTransferSupportedAccounts();
      accounts.forEach(function(account) {
            if (account.accountType == OLBConstants.ACCOUNT_TYPE.SAVING ||
                account.accountType == OLBConstants.ACCOUNT_TYPE.CHECKING)
      payAPersonAccounts.push(account);
    });
    return payAPersonAccounts;
  };


  /**
   * used to activate pay a person Service for a user.
   * @param {object} preferencesObject - contains default deposit account for p2p.
   */
    TransferFastPresentationController.prototype.ActivateP2P = function(preferencesObject) {
    this.showProgressBar();
    applicationManager.getUserPreferencesManager().activateP2P(this.ActivateP2PSuccess.bind(this, preferencesObject), this.ActivateP2PFailure.bind(this));
  };
  /**
   * This method acts as the success call back for the ActivateP2P method.
   * @param {object} preferencesObject - contains default deposit account for p2p.
   * @param {object} response - contains the response object for activate p2p.
   */
    TransferFastPresentationController.prototype.ActivateP2PSuccess = function(preferencesObject, response) {
    this.updateP2PPreferencesForUser(preferencesObject);
    applicationManager.getUserPreferencesManager().updateP2PActivationFlag(true);
  };
  /**
   * This method is used to update the pay a person preferences for a user.
   * @param {object} preferencesObject - contains default to account for p2p , default from account for p2p.
   */
    TransferFastPresentationController.prototype.updateP2PPreferencesForUser = function(preferencesObject) {
    this.showProgressBar();
    var param = {
      "default_to_account_p2p": preferencesObject.defaultDepositAccount
    };
    applicationManager.getUserPreferencesManager().updateP2PPreferencesForUser(param, this.updateP2PPreferencesForUserSuccess.bind(this, preferencesObject), this.updateP2PPreferencesForUserFailure.bind(this, preferencesObject));
  };
  /**
   * This method acts as the success call back for the update pay a person preferences service.
   * @param {object} preferencesObject - contains default to account for p2p , default from account for p2p.
   * @param {Object} response - contins the status for the update pay a person preferences service call. with success or failure.
   */
    TransferFastPresentationController.prototype.updateP2PPreferencesForUserSuccess = function(preferencesObject, response) {
    if (preferencesObject.formId === "frmFastActiveServices") {
      var userData = {};
      userData = {
        "userId": applicationManager.getUserPreferencesManager().getUserId(),
        "userName": applicationManager.getUserPreferencesManager().getUserObj()["userfirstname"] + " " + applicationManager.getUserPreferencesManager().getUserObj()["userlastname"],
        "phone": this.getPrimaryDetails(applicationManager.getUserPreferencesManager().getEntitlementPhoneNumbers()),
        "email": this.getPrimaryDetails(applicationManager.getUserPreferencesManager().getEntitlementEmailIds())
      };
      this.showView(frmFastActiveAck, userData);
    } else if (preferencesObject.formId === "frmP2PSettings") {
            applicationManager.getNavigationManager().navigateTo("frmFastManagePayee", undefined, {
                "refreshComponent": true,
                "activeTab": "Tab2"
            });
      this.showRecipients();
    }
    this.hideProgressBar();
  };
  /**
   * This method is used as the failure call back for the update pay a person preferences service.
   * @param {String} errmsg - contains error message.
   */
  TransferFastPresentationController.prototype.updateP2PPreferencesForUserFailure = function(preferencesObject, response) {
        this.showView(preferencesObject.formId, {
            "serverError": response.errorMessage
        });
    this.hideProgressBar();
  };
  /**
   * This method acts as the failure call back for the Activate Pay a person Service.
   * @param {String} errmsg - contains error message.
   */
    TransferFastPresentationController.prototype.ActivateP2PFailure = function(response) {
        this.showView(frmFastActiveServices, {
            "serverError": response.errorMessage
        });
    this.hideProgressBar();
  };
  /**
   * used to deactivate the pay a person.
   */
    TransferFastPresentationController.prototype.DeactivateP2P = function() {
    this.showProgressBar();
    applicationManager.getUserPreferencesManager().deactivateP2P(this.deactivateP2PSuccess.bind(this), this.deactivateP2PFailure.bind(this));
  }
  /**
   * This method is used as the success call back for the deactivateP2P.
   * @param {object} response - contains the success message for  deactivateP2P.
   */
    TransferFastPresentationController.prototype.deactivateP2PSuccess = function(response) {
    var userData = {};
    userData = {
      "userId": applicationManager.getUserPreferencesManager().getUserId(),
            "userName": applicationManager.getUserPreferencesManager().getUserObj()["userfirstname"] + " " + applicationManager.getUserPreferencesManager().getUserObj()["userlastname"],
      "phone": this.getPrimaryDetails(applicationManager.getUserPreferencesManager().getEntitlementPhoneNumbers()),
      "email": this.getPrimaryDetails(applicationManager.getUserPreferencesManager().getEntitlementEmailIds())
    };
    this.showView(frmFastDeActiveRecipienttAcknowledgement, userData);
    applicationManager.getUserPreferencesManager().updateP2PActivationFlag(false);
    this.hideProgressBar();
  };
  /**
   * This method is used as the failure call back for the deactivateP2P.
   * @param {String} errmsg - contains the error message for  deactivateP2P.
   */
    TransferFastPresentationController.prototype.deactivateP2PFailure = function(response) {
        this.showView(frmFastDeActiveRecipient, {
            "serverError": response.errorMessage
        });
    this.hideProgressBar();
  };
  /**Load Accounts by Transfer Type
   * @param {string} query search query
   * @param {string} type Type of Transfer
   * @param {string} accountId account id of selected from account
  */
    TransferFastPresentationController.prototype.searchAccounts = function(query, type, accountId) {
    if (type === "from") {
      if (query.length > 0) {
                var data = frmAccounts.filter(function(record) {
          return (record["nickName"] && record["nickName"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["accountID"] && record["accountID"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["accountName"] && record["accountName"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["phone"] && record["phone"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["accountNumber"] && record["accountNumber"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["email"] && record["email"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["name"] && record["name"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["PayPersonId"] && record["PayPersonId"].toUpperCase().indexOf(query.toUpperCase()) !== -1);
        });
      } else {
        var data = frmAccounts
      }
      if (p2pEnabled) {
        viewModel = {
          accountsValue: {
            fromAccounts: data,
            isSearch: true,
            p2pEnabled: p2pEnabled,
            p2pSuccess: p2pSuccess
          }
        };
      } else {
        viewModel = {
          accountsValue: {
            fromAccounts: data,
            isSearch: true,
            p2pEnabled: p2pEnabled
          }
        };
      }
            if (!accountId) viewModel.accountsValue.toAccounts = allAccounts;
    } else {
      if (query.length > 0) {
                var data = allAccounts.filter(function(record) {
          return (record["nickName"] && record["nickName"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["accountID"] && record["accountID"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["accountName"] && record["accountName"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["phone"] && record["phone"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["accountNumber"] && record["accountNumber"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["email"] && record["email"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["name"] && record["name"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["PayPersonId"] && record["PayPersonId"].toUpperCase().indexOf(query.toUpperCase()) !== -1);
        });
      } else {
        var data = allAccounts
      }
      if (accountId) {
                var modData = data.filter(function(record) {
          return (record["accountID"] !== accountId);
        });
        data = modData;
      }
      if (p2pEnabled) {
        viewModel = {
          accountsValue: {
            toAccounts: data,
            isSearch: true,
            p2pEnabled: p2pEnabled,
            p2pSuccess: p2pSuccess
          }
        };
      } else {
        viewModel = {
          accountsValue: {
            toAccounts: data,
            isSearch: true,
            p2pEnabled: p2pEnabled
          }
        };
      }
    }
    this.presentTransfers(viewModel);
  };
    TransferFastPresentationController.prototype.addDBXAccount = function(viewModel) {
    this.showView(frmFastAddDBXAccountConfirm, viewModel);
   // this.showView(frmFastAddDBXLinkRecipient,viewModel);
  };
    TransferFastPresentationController.prototype.addDBXAccountConfirm = function(viewModel) {
    this.showView(frmFastAddDBXAccountConfirm, viewModel);
  };
    TransferFastPresentationController.prototype.addExternalAccount = function(viewModel) {
    this.showView(frmFastAddExternalAccountConfirm, viewModel);
  };
    TransferFastPresentationController.prototype.addInternationalAccount = function(viewModel) {
    this.showView(frmFastAddInternationalAccountConfirm, viewModel);
  };
  /** Save Changed External Account
   * @param {object} editedInfo Save Changed External Account to backend
   */
    TransferFastPresentationController.prototype.saveChangedAccountDetails = function(editedInfo) {
    this.showProgressBar();
    applicationManager.getRecipientsManager().editABenificiary(editedInfo, this.saveChangedExternalAccountSuccess.bind(this, editedInfo), this.saveChangedExternalAccountFailure.bind(this));
  }
  /** Success callback after Saving Changed External Account
   * @param {object} response response Changing External Account to backend
   */
    TransferFastPresentationController.prototype.saveChangedExternalAccountSuccess = function(editedInfo, response) {
    //response.externalaccount[0].oldName = editedInfo.oldName;
    //response.externalaccount[0].routingNumber = editedInfo.routingNumber;
    if (editedInfo.isInternationalAccount === "true") {
            this.showView(frmFastAddInternationalAccountAcknowledgement, {
                showEditAcknowledgement: editedInfo
            });
    } else if (editedInfo.isSameBankAccount === "true") {
            this.showView(frmFastAddDBXAccountAcknowledgement, {
                showEditAcknowledgement: editedInfo
            });
    } else {
            this.showView(frmFastAddExternalAccountAcknowledgement, {
                showEditAcknowledgement: editedInfo
            });
    }
    this.hideProgressBar();
  };
  /**
   * Failure callback after Saving Changed External Account
   */
    TransferFastPresentationController.prototype.saveChangedExternalAccountFailure = function() {
    var frm = kony.application.getCurrentForm().id;
    this.hideProgressBar();
    var errorMessage = response.errmsg ? response.errmsg : kony.i18n.getLocalizedString("i18n.common.OoopsServerError");
        this.showView(frm, {
            "serverError": errorMessage
        });
    };
  /** Adding of new Account
  */
    TransferFastPresentationController.prototype.navigateToVerifyAccount = function(viewModel) {
  var accountsManager = applicationManager.getAccountManager();
  var self = this;
  var result = viewModel;
  if (viewModel.DBXAccount) {
    viewModel.DBXAccount["displayName"] = "OTHER_INTERNAL_MEMBER";
    viewModel.DBXAccount["isSameBankAccount"] = "true";
    viewModel.DBXAccount["isInternationalAccount"] = "false";
    viewModel.DBXAccount["isVerified"] = "true";
    this.showProgressBar();
    applicationManager.getAccountManager().createExternalAccounts(viewModel.DBXAccount, this.addDBXAccountSuccess.bind(this, result), this.addDBXAccountFailure.bind(this));
  }
  if (viewModel.ExternalAccount) {
    var result = viewModel;
    viewModel.ExternalAccount["displayName"] = "OTHER_EXTERNAL_ACCOUNT";
    viewModel.ExternalAccount["isSameBankAccount"] = "false";
    viewModel.ExternalAccount["isInternationalAccount"] = "false";
    viewModel.ExternalAccount.isVerified = "true";
    this.showProgressBar();
    applicationManager.getAccountManager().createExternalAccounts(viewModel.ExternalAccount, this.addExternalAccountSuccess.bind(this, result), this.addExternalAccountFailure.bind(this));
  }
  if (viewModel.InternationalAccount) {
    var result = viewModel;
    viewModel.InternationalAccount["displayName"] = "INTERNATIONAL_ACCOUNT";
    viewModel.InternationalAccount["isSameBankAccount"] = "false";
    viewModel.InternationalAccount["isInternationalAccount"] = "true";
    viewModel.InternationalAccount.isVerified = "true";
    this.showProgressBar();
    applicationManager.getAccountManager().createExternalAccounts(viewModel.InternationalAccount, this.addInternationalAccountSuccess.bind(this, result), this.addInternationalAccountFailure.bind(this));
  }
    };
  /**
   * Success call when creation of DBX account is done
   * @param {object} result account data
   * @param {object} response response from the backend
   */
    TransferFastPresentationController.prototype.addDBXAccountSuccess = function(result, response) {
    this.hideProgressBar();
    result.DBXAccount["referenceNo"] = response.Id;
        this.showView(frmFastAddDBXAccountAcknowledgement, {
            showAddAcknowledgement: result
        });
  };
  /**
   * Failure call when creation of DBX account fails
   * @param {object} response response from the backend
   */
    TransferFastPresentationController.prototype.addDBXAccountFailure = function(response) {
    this.hideProgressBar();
        this.showView(frmFastAddDBXAccount, {
            "serverError": response.errorMessage
        });
  };
  /**
   * Success call when creation of External account is done
   * @param {object} result account data
   * @param {object} response response from the backend
   */
    TransferFastPresentationController.prototype.addExternalAccountSuccess = function(result, response) {
    this.hideProgressBar();
    result.ExternalAccount["referenceNo"] = response.Id;
        this.showView(frmFastAddExternalAccountAcknowledgement, {
            showAddAcknowledgement: result
        });
  };
  /**
   * Failure call when creation of External account fails
   * @param {object} response response from the backend
   */
    TransferFastPresentationController.prototype.addExternalAccountFailure = function(response) {
    this.hideProgressBar();
        this.showView(frmFastAddExternalAccount, {
            "serverError": response.errorMessage
        });
  };
  /**
   * Success call when creation of International account is done
   * @param {object} result account data
   * @param {object} response response from the backend
   */
    TransferFastPresentationController.prototype.addInternationalAccountSuccess = function(result, response) {
    this.hideProgressBar();
    result.InternationalAccount["referenceNo"] = response.Id;
        this.showView(frmFastAddInternationalAccountAcknowledgement, {
            showAddAcknowledgement: result
        });
  };
  /**
   * Failure call when creation of International account fails
   * @param {object} response response from the backend
   */
    TransferFastPresentationController.prototype.addInternationalAccountFailure = function(response) {
    this.hideProgressBar();
        this.showView(frmFastAddInternationalAccount, {
            "serverError": response.errorMessage
        });
  };
  /**
    * This method is used to create a new recipient.
    * @param {object} payPersonJSON - contains info like name, nickname, phone, email.
    */
    TransferFastPresentationController.prototype.addP2PRecipient = function(payPersonJSON) {
    if (payPersonJSON.addP2P) {
      this.showView(frmFastAddRecipientConfirm, payPersonJSON.addP2P);
    } else {
      this.showProgressBar();
      applicationManager.getRecipientsManager().createP2PRecipient(payPersonJSON, this.createP2PPayeeSuccess.bind(this, payPersonJSON), this.createP2PPayeeFailure.bind(this));
    }
  };
  /**
  * This method is used as the success callback for create pay a person recipient.
  * @param {object} payPersonJSON - contains info like name, nickname, phone, email.
  * @param {response} response - contains the response to the create recipient service.
  */
    TransferFastPresentationController.prototype.createP2PPayeeSuccess = function(payPersonJSON, response) {
    var self = this;
    payPersonJSON["PayPersonId"] = response.PayPersonId;
        this.showView(frmFastAddRecipientAcknowledgement, {
            "showAddAcknowledgement": payPersonJSON
        });
    this.hideProgressBar();
  };
  /**
  *This method is used as the failure callback for the create recipient.
  * @param {String} errmsg - error message for the failure of create recipient.
  */
    TransferFastPresentationController.prototype.createP2PPayeeFailure = function(response) {
    this.hideProgressBar();
        this.showView(frmFastAddRecipient, {
            "serverError": response.errorMessage
        });
  };
  /**
   * This method is used to edit recipient.
   * @param {object} payPersonJSON - contains info like id, nickname, name,phone, email.
   */
    TransferFastPresentationController.prototype.editP2PRecipient = function(payPersonJSON) {
    this.showProgressBar();
    applicationManager.getRecipientsManager().editP2PRecipient(payPersonJSON, this.editRecipientSuccess.bind(this, payPersonJSON), this.editRecipientFailure.bind(this));
  };
  /**
   * This method acts as the success call back method for edit recipient.
   * @param {object}  payPersonJSON - contains info like name, nickname, phone, email and primary contact.
   * @param {object} response - contains the response for edit recipient service.
   */
    TransferFastPresentationController.prototype.editRecipientSuccess = function(payPersonJSON, response) {
        this.showView(frmFastAddRecipientAcknowledgement, {
            showEditAcknowledgement: payPersonJSON
        });
    this.hideProgressBar();
  };
  /**
  * This method is used as the failure call back for the edit recipient
  * @param {String} errmsg - Contains the error message for the service failure.
  */
    TransferFastPresentationController.prototype.editRecipientFailure = function(response) {
        this.showView(frmFastAddRecipient, {
            "serverError": response.errorMessage
        });
    this.hideProgressBar();
  };


    TransferFastPresentationController.prototype.isP2PActivityView = function() {
    return viewConfig.payPersonId ? true : false;
  };
    TransferFastPresentationController.prototype.initViewConfig = function() {
    viewConfig = {
      'sortBy': 'createdDate',
      'defaultSortBy': 'createdDate',
      'order': OLBConstants.DESCENDING_KEY,
      'defaultOrder': OLBConstants.DESCENDING_KEY,
      'offset': OLBConstants.DEFAULT_OFFSET,
      'limit': OLBConstants.PAGING_ROWS_LIMIT
    };
  }
  /** Shows Selected Account Transactions
   * @param {object} selectedRow Selected Row data
   */
    TransferFastPresentationController.prototype.showSelectedAccountTransactions = function(selectedRow, data) {
    this.showProgressBar();
    var paginationManager = applicationManager.getPaginationManager();
    var params = paginationManager.getValues(viewConfig, data);
    if (data !== undefined) {
      applicationManager.getPaginationManager().resetValues();
      params.sortBy = data.sortBy;
    }
        if (selectedRow) {
      applicationManager.getPaginationManager().resetValues();
      this.initViewConfig();
      viewConfig.accountNumber = selectedRow.accountNumber;
      viewConfig.beneficiaryId = selectedRow.beneficiaryId;
    }
    applicationManager.getTransactionManager().fetchToExternalAccountTransactions({
      "beneficiaryId": viewConfig.beneficiaryId,
      "accountNumber": viewConfig.accountNumber,
      "firstRecordNumber": params.offset,
      "lastRecordNumber": params.limit,
      "sortBy": params.sortBy,
      "order": params.order
    }, this.showSelectedAccountTransactionsSuccess.bind(this, selectedRow), this.showSelectedAccountTransactionsFailure.bind(this))
  };
    TransferFastPresentationController.prototype.showSelectedP2PTransactions = function(selectedRow, data) {
    this.showProgressBar();
    var paginationManager = applicationManager.getPaginationManager();
    var params = paginationManager.getValues(viewConfig, data);
    if (data !== undefined) {
      applicationManager.getPaginationManager().resetValues();
      params.sortBy = data.sortBy;
    }
        if (selectedRow) {
      applicationManager.getPaginationManager().resetValues();
      this.initViewConfig();
      viewConfig.payPersonId = selectedRow.payPersonId;
    }
    applicationManager.getTransactionManager().getRecipientActivity({
      "personId": viewConfig.payPersonId,
      "offset": params.offset,
      "limit": params.limit,
      "sortBy": params.sortBy,
      "order": params.order
    }, this.showSelectedAccountTransactionsSuccess.bind(this, selectedRow), this.showSelectedAccountTransactionsFailure.bind(this))
  };
  /** Gives Selected Account transaction
       * @param {object} selectedRow External Account Data
       * @param {object} response Success response after deletion
       */
    TransferFastPresentationController.prototype.showSelectedAccountTransactionsSuccess = function(selectedRow, response) {
        var paginationManager = applicationManager.getPaginationManager();
        var viewProperties = {
            headerData: selectedRow
        };
        if (response.Transactions) response = response.Transactions;
        if (response.length > 0) {
          paginationManager.updatePaginationValues();
          viewProperties.viewTransactionsData = {};
          viewProperties.viewTransactionsData.data = response;
          viewProperties.viewTransactionsData.pagination = paginationManager.getValues(viewConfig);
          viewProperties.viewTransactionsData.config = viewConfig;
        } else {
          var values = paginationManager.getValues(viewConfig);
          if (values.offset > 0) {
            viewProperties.noMoreRecords = true;
          } else {
            viewProperties.viewTransactionsData = {};
            viewProperties.viewTransactionsData.noTransaction = true;
          }
        }
        //response.push(selectedRow);
        this.hideProgressBar();
        this.showView(frmFastViewActivity, viewProperties);
      };
  /**
   * Initialize the value to fetch the next view Transactions
  */
    TransferFastPresentationController.prototype.fetchNextViewTransactions = function() {
    var paginationManager = applicationManager.getPaginationManager();
    paginationManager.getNextPage();
    if (this.isP2PActivityView()) {
      this.showSelectedP2PTransactions();
    } else {
      this.showSelectedAccountTransactions();
    }
  };
  /*
  *Initialize the value to fetch the previous view Transactions
  */
    TransferFastPresentationController.prototype.fetchPreviousViewTransactions = function() {
    var paginationManager = applicationManager.getPaginationManager();
    paginationManager.getPreviousPage();
    if (this.isP2PActivityView()) {
      this.showSelectedP2PTransactions();
    } else {
      this.showSelectedAccountTransactions();
    }
  };
      /** Failure callback when Selected Account transaction fails
         */
    TransferFastPresentationController.prototype.showSelectedAccountTransactionsFailure = function() {
        var error = {
          serverError: true
        };
        this.hideProgressBar();
        this.showView(frmFastManagePayee,  error);
      };
      /** Present frmConfirmTransfer
     * @param {object} account Account Data
     * @return {String} Weather account is internal or external
     */
    TransferFastPresentationController.prototype.getTransferType = function(account) {
      	var accountsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("DigitalArrangements")
      	return account instanceof accountsModel ? "InternalTransfer" : "ExternalTransfer";
      };
    TransferFastPresentationController.prototype.cancelTransaction = function(data) {
        this.showProgressBar();
        //this.checkTransactionDeletionType(data);
        var payload = {
            transactionId: data.transactionId
        };
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.deleteTransaction(payload, this.fetchScheduledUserTransactions.bind(this), this.fetchScheduledUserTransactionsFailure.bind(this));
      }
    TransferFastPresentationController.prototype.checkTransactionDeletionType = function(data) {
        var transactionManager = applicationManager.getTransactionManager();
        var successCallBack = this.fetchScheduledUserTransactions.bind(this);
        var errorCallback = this.fetchScheduledUserTransactionsFailure.bind(this);
        var payload = {
            transactionId: data.transactionId
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
          case OLBConstants.TRANSFER_TYPES.P2P_TRANSFER:
            transactionManager.deleteP2PTransaction(payload, successCallBack, errorCallback);
            break;
        }
      }
    TransferFastPresentationController.prototype.cancelTransactionOccurrence = function(data) {
        this.showProgressBar();
        this.checkTransactionType(data);
        //var transactionManager = applicationManager.getTransactionManager();
        //transactionManager.deleteRecurrenceTransaction(data,this.fetchScheduledUserTransactions.bind(this),this.fetchScheduledUserTransactionsFailure.bind(this));
      }
    TransferFastPresentationController.prototype.checkTransactionType = function(data) {
        var transactionManager = applicationManager.getTransactionManager();
        var successCallBack = this.fetchScheduledUserTransactions.bind(this);
        var errorCallback = this.fetchScheduledUserTransactionsFailure.bind(this);
        var payload = {
            transactionId: data.transactionId
        };
        switch (data.serviceName) {
      	  case OLBConstants.TRANSFER_TYPES.OWN_INTERNAL_TRANSFER: 
                transactionManager.cancelOccurrenceTransferToOwnAccounts(payload, successCallBack, errorCallback);
            break;
          case OLBConstants.TRANSFER_TYPES.INTER_BANK_TRANSFER: 
                transactionManager.cancelOccurrenceInterBankAccFundTransfer(payload, successCallBack, errorCallback);
            break;
          case OLBConstants.TRANSFER_TYPES.INTRA_BANK_TRANSFER: 
                transactionManager.cancelOccurrenceIntraBankAccFundTransfer(payload, successCallBack, errorCallback);
            break;
          case OLBConstants.TRANSFER_TYPES.INTERNATIONAL_TRANSFER: 
                transactionManager.cancelOccurrenceInternationalAccFundTransfer(payload, successCallBack, errorCallback);
            break;
          case OLBConstants.TRANSFER_TYPES.P2P_TRANSFER:
            transactionManager.deleteP2PRecurrenceTransaction(payload, successCallBack, errorCallback);
            break;
        }
      }
      /**
      * Initialize the service call to download Transactions report
      */
    TransferFastPresentationController.prototype.fetchTransactionsReportFastTransfer = function(transactionObj) {
      this.showProgressBar();
      let params = {
        "transactionId": transactionObj.transactionId
      };
      applicationManager.getTransactionManager().generateTransactionReport(params, this.generateTransactionReportSuccess.bind(this), this.generateTransactionReportFailure.bind(this));
    };

    TransferFastPresentationController.prototype.generateTransactionReportSuccess = function(successResponse) {
      var downloadReportURL = applicationManager.getTransactionManager().fetchTransactionReport(successResponse);
      var data = {
        "url": downloadReportURL
      };
      CommonUtilities.downloadFile(data);
      this.hideProgressBar();
    };

    TransferFastPresentationController.prototype.generateTransactionReportFailure = function(error) {
      this.hideProgressBar();
      applicationManager.getNavigationManager().updateForm({
        "serverError": error
      })
    };
  /**
  * Method to navigate Print Transactions form and upadate active form.
  * @param {object} data  view model for Print form
  */
    TransferFastPresentationController.prototype.showPrintPage = function(data) {
    var self = this;
    applicationManager.getNavigationManager().navigateTo({ appName: 'CommonsMA', friendlyName: 'frmPrintTransfer' });
    applicationManager.getNavigationManager().updateForm(data, { appName: 'CommonsMA', friendlyName: 'frmPrintTransfer' });
  };
  
    TransferFastPresentationController.prototype.getOperationName = function() {
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
  
    TransferFastPresentationController.prototype.filterToAccountsByMembershipId = function(membershipId, toAccounts) {
        return applicationManager.getRecipientsManager().filterToAccountsByMembershipId(membershipId, toAccounts)
    };
  TransferFastPresentationController.prototype.downloadReport = function(transactionObj,frm) {
    this.showProgressBar();
    let params = {
      "transactionType": transactionObj.frequencyType || transactionObj.frequency,
      "transactionId": transactionObj.transactionId ||  transactionObj.referenceId,
      "contentType": "pdf"
    };
    applicationManager.getTransactionManager().DownloadTransactionPDF(params, this.downloadReportSuccess.bind(this),this.downloadReportFailure.bind(this,frm));
  };
  TransferFastPresentationController.prototype.downloadReportSuccess = function(response){
    var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url;
    var fileUrl = mfURL + "/objects/DownloadTransactionPDF?fileId=" + response.fileId;
    kony.application.openURL(fileUrl);
    this.hideProgressBar();
  };
  TransferFastPresentationController.prototype.downloadReportFailure = function(frm,response){
    this.hideProgressBar();
    this.showView(frm, {
      "downloadError": response
    });
  };
  
   TransferFastPresentationController.prototype.retrieveAttachments = function(transactionId, viewAttachmentCallback) {
        var requestParam = {};
        var successCallback = this.retrieveAttachmentsSuccessCallback.bind(this);
        var errorCallback = this.retrieveAttachmentsErrorCallback.bind(this);
        requestParam.customerId = applicationManager.getUserPreferencesManager().getUserObj().userId;
        requestParam.transactionId = transactionId;
        applicationManager.getTransactionManager().retrieveAttachments(requestParam, viewAttachmentCallback, viewAttachmentCallback);
    };

    TransferFastPresentationController.prototype.retrieveAttachmentsSuccessCallback = function(response) {
        if (response.fileNames)
            return response.fileNames;
    };

    TransferFastPresentationController.prototype.retrieveAttachmentsErrorCallback = function() {
        this.hideProgressBar();
        return [];
    };

  return TransferFastPresentationController;
});