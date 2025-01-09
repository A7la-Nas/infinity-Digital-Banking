define(['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
    function PersonalFinanceManagement_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
        this.initializePresentationController();
    }
    inheritsFrom(PersonalFinanceManagement_PresentationController, kony.mvc.Presentation.BasePresenter);
    /**
     * initializePresentationController - Method to intialize Presentation controller data , called by constructor
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {Object} dataInputs - dataInputs to configure Presentation controller. (optional) - useful when we need customize.
     * @returns {}
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.initializePresentationController = function() {
        var scopeObj = this;
        scopeObj.viewModel = {};
        scopeObj.serverErrorVieModel = 'serverError';
        var configManager = applicationManager.getConfigurationManager();
        scopeObj.sortUnCatTranascionsConfig = {
            'sortBy': 'transactionDate',
            'defaultSortBy': 'transactionDate',
            'order': configManager.OLBConstants.DESCENDING_KEY,
            'defaultOrder': configManager.OLBConstants.DESCENDING_KEY
        };
    };
   
    /**
     * naviageteToAccountLandingPage : used to naviagte the dashboard page.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {} //sending particular month
     * @returns {} get all list of categories with spendings.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.naviageteToAccountLandingPage = function() {
       // var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
       // accountsModule.presentationController.showAccountsDashboard();
     this.showAccountsDashboard();
    };
  
     /**
     * Entery method for accounts landing page. This method inturns calls 3 methods to get data for different section of form
     */
	 PersonalFinanceManagement_PresentationController.prototype.showAccountsDashboard = function(params, data) {
      params = params || {};
      if (CommonUtilities.isCSRMode()) 
      {
		scope.CSRModeAccountID = params && params.accountID ? params.accountID:"";
      }
      this.loadSystemConfigurations();
      var configurationManager = applicationManager.getConfigurationManager();
      if (configurationManager.isSMEUser === "true")
        frmName = "frmDashboard";
      else if (configurationManager.isCombinedUser === "true")
        frmName = "frmDashboard";
      else 
		frmName = "frmDashboard";
      if (!scope.CSRModeAccountID) {
        applicationManager.getNavigationManager().navigateTo(frmName);
        applicationManager.getNavigationManager().updateForm({
          showLoadingIndicator: {
            status: true
          }
        }, frmName);
      }
      this.showWelcomeBanner();
      this.showAllAccounts(params.noRefresh);
      this.loadAccountsLandingComponents();
    };
  
   /**
     * Method to show Welcome banner in accounts Landing page like last logged in time/User Name etc.
     */
    PersonalFinanceManagement_PresentationController.prototype.showWelcomeBanner = function() {
        var userPreferenceManager = applicationManager.getUserPreferencesManager();
        var cachedUser = userPreferenceManager.getUserObj();
        if (cachedUser) {
            this.fetchWelcomeBannerSuccess(cachedUser);
            this.updateFeedBackId(cachedUser);
        } else {
            this.showOnServerError.bind(this);
        }
    };
    
    /**
     * Method to recieve backend data of the current User for populating data in welcome banner
     * @param {JSON} userData User Data containing all details of current loggedin user
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchWelcomeBannerSuccess = function(userData) {
        var dateObj = applicationManager.getFormatUtilManager().getDateObjectfromString(userData.lastlogintime, "YYYY-MM-DDTHH:MM:SS");
        var lastLoggedInTime = applicationManager.getFormatUtilManager().getFormatedDateString(dateObj, "m/d/Y h:m A");
        userData.lastlogintime = lastLoggedInTime;
        userData.userImageURL = applicationManager.getUserPreferencesManager().getUserImage();
        applicationManager.getNavigationManager().updateForm({
            welcomeBanner: userData
        }, frmName);
    };
  
  PersonalFinanceManagement_PresentationController.prototype.updateFeedBackId = function(userData) {
        if (applicationManager.getConfigurationManager().isFeedbackEnabled === "true") {
            applicationManager.getStorageManager().setStoredItem("feedbackUserId", userData.feedbackUserId);
        }
        applicationManager.getFeedbackManager().updateFeedbackId(null);
    };
  
  /**
     * Method takes you to server error page in case if a critical/required service call fails.
     */
    PersonalFinanceManagement_PresentationController.prototype.showOnServerError = function() {
        CommonUtilities.showServerDownScreen();
    };
  
  /**
     *Method to get all accounts i.e internal and external based on aggregatedAccount flag of configurations
     */
    PersonalFinanceManagement_PresentationController.prototype.showAllAccounts = function(noRefresh) {
        var self = this;
        if (!noRefresh) {
            this.fetchAccounts();
        }
        if (this.isAccountsLoading) {
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true
                }
            }, frmName);
            this.mapAccounts = true;
        } else {
            this.fetchAccountsSuccess();
        }
    };
    
    PersonalFinanceManagement_PresentationController.prototype.fetchAccounts = function(userName) {
        var self = this;

        function completionCallback(accountsData) {
            this.accounts = accountsData;
            this.isAccountsLoading = false;
            if (this.mapAccounts) {
                this.fetchAccountsSuccess();
            }
        }
        this.isAccountsLoading = true;
        if(applicationManager.getConfigurationManager().isMicroAppPresent("HomepageMA")){
            applicationManager.getAccountManager().fetchInternalAccounts(completionCallback.bind(this), this.showOnServerError.bind(this));
        }

        // if (applicationManager.getConfigurationManager().checkUserPermission("MANAGE_EXTERNAL_ACCOUNT")) {
        //     function completionCallback(asyncResponse) {
        //         if (asyncResponse.isAllSuccess()) {
        //             self.accounts = asyncResponse.responses;
        //             self.isAccountsLoading = false;
        //             if (self.mapAccounts) {
        //                 self.fetchAccountsSuccess();
        //             }
        //         } else {
        //             self.showOnServerError();
        //         }
        //     }
        //     var username = userName || applicationManager.getUserPreferencesManager().getUserObj().userName
        //     var asyncManager = applicationManager.getAsyncManager();
        //     asyncManager.callAsync(
        //         [
        //             asyncManager.asyncItem(applicationManager.getAccountManager(), "fetchInternalAccounts"),
        //             asyncManager.asyncItem(applicationManager.getAccountManager(), "fetchExternalAccountsData", [username])
        //         ], completionCallback);
        // } else {
        //     applicationManager.getAccountManager().fetchInternalAccounts(completionCallback.bind(this), this.showOnServerError.bind(this));
        // }
    };
    
     /**
     *Method is invoked when fetching of accounts is successful. It covers both scenarios of internal and external accounts
     * @param {Collection} accounts list of all the accounts i.e internal account and external accounts based on aggregatedAccount flag of configurations
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchAccountsSuccess = function() {
        var self = this;
        /** External Account service call removed
                if (applicationManager.getConfigurationManager().checkUserPermission("MANAGE_EXTERNAL_ACCOUNT")) {
                    var finalAccounts = [];
                    this.accounts[0].data.forEach(function(internalAccount) {
                        finalAccounts.push(internalAccount);
                    });
                    this.accounts[1].data.forEach(function(externalAccount) {
                        finalAccounts.push(self.processExternalAccountsData(externalAccount));
                    });
                    applicationManager.getNavigationManager().updateForm({
                        accountsSummary: finalAccounts
                    }, frmName);
                } else {
                    applicationManager.getNavigationManager().updateForm({
                        accountsSummary: this.accounts
                    }, frmName);
                }
        */
      var finalData = JSON.parse(JSON.stringify(this.accounts));
        for (var i = finalData.length-1; i >=0; i--) {
                if (finalData[i].isPortFolioAccount === "true") {
                    finalData.splice(i, 1);
                }
            }
        applicationManager.getNavigationManager().updateForm({
            accountsSummary: finalData
        }, frmName);
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false
            }
        }, frmName);
        this.callPostAccountsService();
      if (CommonUtilities.isCSRMode()) {
        var accountList = finalData;
        if (scope.CSRModeAccountID) {
          for (var i = 0; i < accountList.length; i++) {
            if (scope.CSRModeAccountID == accountList[i].accountID) {
              this.showAccountDetails(accountList[i]);
              scope.CSRModeAccountID="";
              break;
            }
          }
        }
      }
    };
  
   PersonalFinanceManagement_PresentationController.prototype.callPostAccountsService = function() {
        var scope = this;
        var userName = null;
        if (this.fetchPasswordWarningAndOutageMessages) {
            if (CommonUtilities.isCSRMode()) {
                function onGetUserAttributesSuccess(response) {
                    scope.performServiceCallsOnAccountsSuccess(response.UserName);
                }
                var configManager = applicationManager.getConfigurationManager();
                kony.sdk.getCurrentInstance().getIdentityService(configManager.constants.IDENTITYSERVICENAME).getUserAttributes(onGetUserAttributesSuccess, {});
            } else {
                userName = applicationManager.getUserPreferencesManager().getUserObj().userName;
                this.performServiceCallsOnAccountsSuccess(userName);
            }
        } else {
            scope.showPasswordExpiryMessage();
            scope.showOutageMessage();
        }
    };
  
  PersonalFinanceManagement_PresentationController.prototype.performServiceCallsOnAccountsSuccess = function(userName) {
        var scope = this;
        if(applicationManager.getConfigurationManager().isMicroAppPresent("HomepageMA")){
            var asyncManager = applicationManager.getAsyncManager();
            var userPrefManager = applicationManager.getUserPreferencesManager();
            var accountsManager = applicationManager.getAccountManager();
            var userName = null;
            var breakpoint = kony.application.getCurrentBreakpoint();
            asyncManager.callAsync(
                [
                    asyncManager.asyncItem(userPrefManager, 'showPasswordResetWarning', [{
                        userName: userName
                    }]),
                    asyncManager.asyncItem(accountsManager, 'fetchOutageMessages')
                ],
                function(asyncResponses) {
                    scope.showPasswordExpiryMessage();
                    scope.showOutageMessage();
                    scope.fetchPasswordWarningAndOutageMessages = false;
                }
            );
        }
    };
  
  PersonalFinanceManagement_PresentationController.prototype.showPasswordExpiryMessage = function() {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        var passwordlockSettings = userPrefManager.getPasswordWarning();
        applicationManager.getNavigationManager().updateForm({
            "passwordResetWarning": {
                "show": this.fetchPasswordWarningAndOutageMessages,
                "message": passwordlockSettings
            }
        });
    };
  
  /**
     * Method to show outage message
     */
    PersonalFinanceManagement_PresentationController.prototype.showOutageMessage = function() {
        if(applicationManager.getConfigurationManager().isMicroAppPresent("HomepageMA")){
            var outageMessage = applicationManager.getAccountManager().getOutageMessages();
            if (outageMessage && outageMessage.length > 0) {
                outageMessage.join("\n");
            } else {
                outageMessage = "";
            }
            if (!CommonUtilities.isEmptyString(outageMessage)) {
                applicationManager.getNavigationManager().updateForm({
                    "outageMessage": {
                        "show": this.fetchPasswordWarningAndOutageMessages,
                        "message": outageMessage
                    }
                });
            }
        }
    };
  
  /**
     * Entry Point for Account Details, this method load Account detail components
     * @param {JSON} account account json for which yout want to get details
     */
    PersonalFinanceManagement_PresentationController.prototype.showAccountDetails = function(account) {
        if (account) {
            currentAccount = account;
        }
        if (applicationManager.getConfigurationManager().getConfigurationValue('isAccountDetailsServiceConfigured') == "false") {
            this.showSelectedAccountTransaction(currentAccount);
            applicationManager.getNavigationManager().navigateTo("frmAccountsDetails", false, account);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true
                }
            }, "frmAccountsDetails");
            this.getAccountDeatilsAllAccounts();
            this.updateAccountDetails(currentAccount);
        } else {
            var isAccountDetailsServiceCallRequired = true;
            this.showSelectedAccountTransaction(currentAccount, null, null, isAccountDetailsServiceCallRequired);
            applicationManager.getNavigationManager().navigateTo("frmAccountsDetails", false, account);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true
                }
            }, "frmAccountsDetails");
            this.getAccountDeatilsAllAccounts();
        }
    };
  /**
     * Method to get transactions for specific selected account
     * @param {JSON} account Account for which you want transactions
     * @param {JSON} dataInputs dataInputs for getting specific type of data or for resetting sorting
     * @param {String} navigationMode Navigation Mode
     */
    PersonalFinanceManagement_PresentationController.prototype.showSelectedAccountTransaction = function(account, dataInputs, navigationMode, isParallelCall) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true
            }
        }, "frmAccountsDetails");
        var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
        if (account) {
            currentAccount = account;
        }
        if (!dataInputs) {
            dataInputs = {
                resetSorting: true,
                transactionType: OLBConstants.ALL,
                account: account
            };
        } else {
            if (dataInputs.resetSorting === undefined || dataInputs.resetSorting === null) {
                dataInputs.resetSorting = true;
            }
            dataInputs["account"] = currentAccount;
        }
        var transactionType = dataInputs.transactionType;
        var paginationManager = applicationManager.getPaginationManager();
        if (dataInputs.resetSorting === true) {
            paginationManager.resetValues();
        }
        var sortingConfig = this.sortConfig[transactionType];
        var sortParams;
        if (navigationMode !== "nextTransaction" && navigationMode !== "previousTransaction") {
            sortParams = paginationManager.getValues(sortingConfig, dataInputs);
        } else {
            sortParams = paginationManager.getValues(sortingConfig);
        }
        if (
            (dataInputs.sortBy !== undefined || dataInputs.sortBy !== null) && sortParams.sortBy !== dataInputs.sortBy) {
            sortParams.sortBy = dataInputs.sortBy;
        }
        var commandObj = {
            accountID: currentAccount.accountID,
            transactionType: transactionType,
            offset: sortParams.offset,
            limit: sortParams.limit,
            isScheduled: "false", //not getting scheduled transactions for account details page
            sortBy: sortParams.sortBy,
            order: sortParams.order
        };
        dataInputs.sortConfig = sortingConfig;
        if(applicationManager.getConfigurationManager().isMicroAppPresent("HomepageMA") && applicationManager.getConfigurationManager().isMicroAppPresent("TransactionMA")){
            if(isParallelCall){
                var asyncManager = applicationManager.getAsyncManager();
                var transactionManager = applicationManager.getTransactionManager();
                var accountsManager = applicationManager.getAccountManager();
                asyncManager.callAsync(
                    [
                        asyncManager.asyncItem(transactionManager, 'fetchAccountTransactionByType', [commandObj]),
                        asyncManager.asyncItem(accountsManager, 'fetchAccountDetails', [{
                            accountID: currentAccount.accountID
                        }]),
                    ],
                    this.onPostGetAccountDetailsComplete.bind(this, dataInputs)
                );
            } else {
                applicationManager.getTransactionManager().fetchAccountTransactionByType(commandObj, this.fetchTrasactionsSuccess.bind(this, dataInputs), this.showAccountDetailsError.bind(this));
            }
        }
    };
  
  PersonalFinanceManagement_PresentationController.prototype.onPostGetAccountDetailsComplete = function(dataInputs, syncResponseObject) {
        var scopeObj = this;
        if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
            this.fetchTrasactionsSuccess(dataInputs, syncResponseObject.responses[0].data);
            this.getAccountDetailsSuccessCallback(syncResponseObject.responses[1].data[0]);
        } else {
            applicationManager.getNavigationManager().updateForm({
                "hideProgressBar": true
            });
            scopeObj.showOnServerError();
        }
    };
  
  /**
     * Method gets invoked once fetching of transactions is successful
     * @param {Object} dataInputs Object containing sortConfig, transactType i.e 'All','Transfer' etc and current account
     * @param {Collection} transactions List of fetched transactions
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchTrasactionsSuccess = function(dataInputs, transactions) {
        var uiDataObj = {};
        var paginationManager = applicationManager.getPaginationManager();
        if (transactions.length === 0 && dataInputs.sortConfig.offset !== 0) {
            applicationManager.getNavigationManager().updateForm({
                noMoreRecords: true
            }, "frmAccountsDetails");
            return;
        }
        paginationManager.updatePaginationValues();
        uiDataObj.transactions = transactions;
        uiDataObj.dataInputs = dataInputs;
        uiDataObj.pagination = {
            limit: paginationManager.limit,
            offset: paginationManager.offset,
            paginationRowLimit: paginationManager.paginationRowLimit
        };
        uiDataObj.pagination.limit = transactions.length;
        applicationManager.getNavigationManager().updateForm({
            transactionDetails: uiDataObj
        }, "frmAccountsDetails");
    };
  
  PersonalFinanceManagement_PresentationController.prototype.getAccountDetailsSuccessCallback = function(accountObject) {
        applicationManager.getNavigationManager().updateForm({
            accountDetails: accountObject
        }, "frmAccountsDetails")
    };
  /**
     * Method to show account details page error
     */
    PersonalFinanceManagement_PresentationController.prototype.showAccountDetailsError = function() {
        applicationManager.getNavigationManager().updateForm({
            showOnServerError: true,
            showLoadingIndicator: {
                status: false
            }
        }, "frmAccountsDetails");
    };
/**
     * Method to get all internal accounts for account details page
     */
    PersonalFinanceManagement_PresentationController.prototype.getAccountDeatilsAllAccounts = function() {
        var internalAccounts = applicationManager.getPersonalFinanceManager().getInternalAccounts();
        if (internalAccounts) {
            applicationManager.getNavigationManager().updateForm({
                accountList: internalAccounts
            }, "frmAccountsDetails");
        } else {
            this.showOnServerError();
        }
    };
      /**
     * Method to present frmAccount details with specific account details
     * @param {JSON} account Account whose details needs to be displayed
     */
    PersonalFinanceManagement_PresentationController.prototype.updateAccountDetails = function(account) {
        applicationManager.getNavigationManager().updateForm({
            accountDetails: account
        }, "frmAccountsDetails");
    };
  
  /**
     * Method which calls all the functions for different components of accounts landing page except accounts accounts and user details.
     */
    PersonalFinanceManagement_PresentationController.prototype.loadAccountsLandingComponents = function() {
        this.getUnreadMessages();
        this.fetchScheduledTransactions();

        var configurationManager = applicationManager.getConfigurationManager();
        if (configurationManager.isSMEUser === "false")
            this.fetchPFMData();
        if (configurationManager.isCombinedUser === "false")
            this.fetchMessages();
    };
	
	/**
     * Method to get Unread messages count from messages module
     */
    PersonalFinanceManagement_PresentationController.prototype.getUnreadMessages = function() {
        var alertsMsgsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsMsgsModule");
        alertsMsgsModule.presentationController.getUnreadMessagesOrNotificationsCount(this.getUnreadMessagesCountCompletionCallback.bind(this));
    };
	 /**
     * Method that receives unread message count from the Messages module
     * @param {JSON} response contains totalUnread count key for unread messages
     */
    PersonalFinanceManagement_PresentationController.prototype.getUnreadMessagesCountCompletionCallback = function(response) {
        applicationManager.getNavigationManager().updateForm({
            unreadCount: {
                count: response.totalUnreadCount
            }
        }, frmName);
    };
  /**
     * Method to fetch upcomming scheduled transactions for accounts landing page
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchScheduledTransactions = function() {
        applicationManager.getTransactionManager().fetchScheduledTransaction(this.fetchScheduledTransactionSuccess.bind(this), this.fetchScheduledTransactionFailure.bind(this));
    };
  
  /**
     * Method that receives upcomming scheduled transactions for accounts dashboard
     * @param {Collection} transactions List of transactions
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchScheduledTransactionSuccess = function(transactions) {
        applicationManager.getNavigationManager().updateForm({
            UpcomingTransactions: transactions
        });
    };
  /**
     * Method that gets called when there is an error in fetching upcomming account dasboard transactions
     * @param {Object} error Error Object
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchScheduledTransactionFailure = function(error) {
        applicationManager.getNavigationManager().updateForm({
            UpcomingTransactions: [],
            serviceError: true
        });
    };
  
  /**
     * Method to fetch Product finance Management(PFM) data
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchPFMData = function() {
        if (applicationManager.getConfigurationManager().getConfigurationValue("isPFMWidgetEnabled") !== "true") {
            applicationManager.getNavigationManager().updateForm({
                PFMDisabled: true
            }, frmName);
        } else {
            var date = new Date();
            var criteria;
            criteria = kony.mvc.Expression.and(criteria, kony.mvc.Expression.eq("monthId", date.getMonth() + 1), kony.mvc.Expression.eq("year", date.getFullYear()));
            applicationManager.getPersonalFinanceManager().getMonthlySpending(criteria, this.fetchPFMSuccess.bind(this), this.fetchPFMFailure.bind(this));
        }
    };
  
   /**fetchMessages
     * Method that called on successful fetching of PFM data
     * @param {Object} PFMData PFMData object
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchPFMSuccess = function(PFMData) {
        applicationManager.getNavigationManager().updateForm({
            PFMMonthlyWidget: PFMData
        });
    };
    /**
     * Method that gets called when there is an error in fetching PFMData for account dashboard
     * @param {Object} error Error Object
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchPFMFailure = function(error) {
        applicationManager.getNavigationManager().updateForm({
            PFMMonthlyWidget: [],
            serviceError: true
        });
    };
  
  /**
     * Method to fetch all the unread messages
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchMessages = function() {
        applicationManager.getMessagesManager().fetchAllRequestsForInbox(this.fetchMessagesSuccess.bind(this), this.fetchMessagesFailure.bind(this));
    };
    /**
     * Method that gets called when fetching unread messages is successful
     * @param {Object} messagesObj List of messages Object
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchMessagesSuccess = function(messagesObj) {
        var dashboardMessagesCount = applicationManager.getConfigurationManager().getConfigurationValue("getDashboardMessageCount");
        var messages = messagesObj.customerrequests_view.slice(0, parseInt(dashboardMessagesCount));
        applicationManager.getNavigationManager().updateForm({
            unreadMessages: messages
        });
    };
    /**
     * Method that gets called when there is an error in fetching unread messages for account dashboard
     * @param {Object} error Error Object
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchMessagesFailure = function(error) {
        applicationManager.getNavigationManager().updateForm({
            unreadMessages: [],
            serviceError: true
        });
    };


    /**
     * presentPFM : Method for used to initalize the form
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {data} /viewmodel for form
     * @returns {} get all list of Years.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.initPFMForm = function(data) {
        var date = new Date();
        var presentYear = date.getFullYear();
        var presentMonth = date.getMonth();
        if (presentYear && date.getMonth() === 0) {
            presentYear = presentYear - 1;
            presentMonth = 12;
        }
        var self = this;   
      pfmMAname="FinanceManagementMA";
       kony.application.destroyForm("frmPersonalFinanceManagement");
       applicationManager.getNavigationManager().navigateTo({"appName":pfmMAname, "friendlyName":"frmPersonalFinanceManagement"});
        self.showProgressBar();
        var viewModel = {};
        viewModel.hideflex = true;
        viewModel.getYears = self.getPFMYears();
        viewModel.getMonths = self.getPFMMonthsByYear(presentYear);
        viewModel.showMonthlyDonutChart = true;
        self.getMonthlySpending(true, presentMonth, presentYear, viewModel);
        self.getYearlySpending(presentYear);
        self.getPFMRelatedAccounts(presentMonth, presentYear);
        self.getPFMBudgetChart(presentMonth, presentYear);
    };
    /**
     * formatMonthlyCategorizedTransactions : used to format the Monthly Categorized transactions.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {data} /get monthly data
     * @returns {}
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.formatMonthlyCategorizedTransactions = function(data) {
        if (data.length != 0) {
            var categoryIds = [];
            var catgoriesArray = [];
            for (var i = 0; i < data.length; i++) {
                var totalAmount = 0.0;
                var transaction = data[i];
                if (categoryIds.indexOf(transaction.categoryId) == -1) {
                    var categoryobj = {};
                    var headerObj = {};
                    var transactionobj = {};
                    var categoryArray = [];
                    categoryIds.push(transaction.categoryId);
                    headerObj.categoryName = transaction.categoryName;
                    var configManager = applicationManager.getConfigurationManager();
                    headerObj.categoryColor = configManager.PFM_CATEGORIES_COLORS[transaction.categoryName];
                    for (var j = 0; j < data.length; j++) {
                        if (data[j].categoryId == data[i].categoryId) {
                            totalAmount += parseFloat(data[j].transactionAmount);
                            headerObj.totalAmount = totalAmount;
                            data[j].transactionDate = CommonUtilities.getFrontendDateString(data[j].transactionDate);
                            data[j].displayAmount = CommonUtilities.formatCurrencyWithCommas(data[j].transactionAmount)
                            categoryArray.push(data[j]);
                        }
                    }
                    transactionobj.categoryArray = categoryArray;
                    headerObj.totalAmount = CommonUtilities.formatCurrencyWithCommas(headerObj.totalAmount);
                    categoryobj.header = headerObj;
                    categoryobj.transactionobj = categoryArray;
                    catgoriesArray.push(categoryobj);
                } else {}
            }
            return catgoriesArray;
        } else {}
    }
    /**
     * getMonthlyCategorizedTransactions : used to get Monthly Categorized transactions.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {data} /get monthly data
     * @returns {}
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.getMonthlyCategorizedTransactions = function(monthId,yearId) {
        var self = this;
        self.showProgressBar();
        if (!monthId) {
            var date = new Date();
            monthId = date.getMonth();
        }
        var reqObject = {
            'monthId': monthId
        };
        var PersonalFinanceManager = applicationManager.getPersonalFinanceManager();
        PersonalFinanceManager.getMonthlyCategorizedTransactions(monthId,yearId, this.getMonthlyCategorizedTransactionsSuccess.bind(this), this.getMonthlyCategorizedTransactionsFailure.bind(this));
    };
    PersonalFinanceManagement_PresentationController.prototype.getMonthlyCategorizedTransactionsSuccess = function(response) {
        var viewModel = {};
        viewModel.showMonthlyCategorizedTransactions = true;
        viewModel.monthlyCategorizedTransactions = this.formatMonthlyCategorizedTransactions(response);
        this.presentPFM(viewModel);
    };
    PersonalFinanceManagement_PresentationController.prototype.getMonthlyCategorizedTransactionsFailure = function(error) {
        this.presentPFM({
            onServerDownError: true
        });
    };
    /**
     * formatPFMBudgetChartData : used to format the data.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {data} /get All monthly data
     * @returns {} get all list of months.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.formatPFMBudgetChartData = function(yearsPFMBudgetdata) {
        function addRequirePFMBudgetChartFields(yearBudget) {
            var leftBudget = (Number(yearBudget.allocatedAmount) - Number(yearBudget.amountSpent));
            yearBudget.categoryName = yearBudget.categoryName;
            yearBudget.budget = Number(yearBudget.amountSpent);
            var configManager = applicationManager.getConfigurationManager();
            yearBudget.budgetColorCode = configManager.PFM_CATEGORIES_COLORS[yearBudget.categoryName];
            yearBudget.budgetAnnotationText = "";
            yearBudget.tooltipText = CommonUtilities.formatCurrencyWithCommas(yearBudget.amountSpent) + "  " + kony.i18n.getLocalizedString("i18n.common.usedfrom") + "  " + CommonUtilities.formatCurrencyWithCommas(yearBudget.allocatedAmount);
            yearBudget.remaningBuget = leftBudget;
            if (leftBudget < 0) {
                yearBudget.remaningBuget = 0;
                yearBudget.tooltipText = CommonUtilities.formatCurrencyWithCommas(Math.abs(leftBudget)) + "  " + kony.i18n.getLocalizedString("i18n.common.over") + "  " + CommonUtilities.formatCurrencyWithCommas(yearBudget.allocatedAmount);
            } else {
                yearBudget.remaningBuget = leftBudget;
                yearBudget.tooltipText = CommonUtilities.formatCurrencyWithCommas(yearBudget.amountSpent) + "  " + kony.i18n.getLocalizedString("i18n.common.usedfrom") + "  " + CommonUtilities.formatCurrencyWithCommas(yearBudget.allocatedAmount);
            }
            yearBudget.remainingBudgeTooltipText = CommonUtilities.formatCurrencyWithCommas(leftBudget) + "  " + kony.i18n.getLocalizedString("i18n.common.leftfrom") + "  " + CommonUtilities.formatCurrencyWithCommas(yearBudget.allocatedAmount);
            yearBudget.remaningBugetColorCode = "color:" + configManager.PFM_CATEGORIES_COLORS[yearBudget.categoryName] + ";" + "opacity:0.3";
            yearBudget.remaingBudgetAnnotationText = "";
            yearBudget.remainingBudgeTooltipText = CommonUtilities.formatCurrencyWithCommas(leftBudget) + "  " + kony.i18n.getLocalizedString("i18n.common.leftfrom") + "  " + CommonUtilities.formatCurrencyWithCommas(yearBudget.allocatedAmount);
            return yearBudget;
        }
        var pfmBudgetData = yearsPFMBudgetdata.map(addRequirePFMBudgetChartFields);
        return pfmBudgetData;
    };
    /**
     * getPFMBudgetChart : Method for used to draw budget chart.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {year,viewModel} /get All monthly data
     * @returns {} get all list of months.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.getPFMBudgetChart = function(monthId, year) {
        var self = this;
        self.showProgressBar();
        var reqObject = {
            'year': year,
            'monthId': monthId
        };
        var criteria = kony.mvc.Expression.and(kony.mvc.Expression.eq("monthId", reqObject.monthId),
            kony.mvc.Expression.eq("year", reqObject.year));
        var PersonalFinanceManager = applicationManager.getPersonalFinanceManager();
        PersonalFinanceManager.getYearlyBudgetData(criteria, this.getPFMBudgetChartSuccess.bind(this), this.getPFMBudgetChartFailure.bind(this));
    };
    PersonalFinanceManagement_PresentationController.prototype.getPFMBudgetChartSuccess = function(response) {
        var viewModel = {};
        viewModel.showYearlyBudgetChart = true;
        viewModel.yearlyBudgetData = this.formatPFMBudgetChartData(response);
        this.presentPFM(viewModel);
    };
    PersonalFinanceManagement_PresentationController.prototype.getPFMBudgetChartFailure = function(error) {
        this.presentPFM({
            onServerDownError: true
        });
    };
    /**
     * presentPFM : Method for used to Format the Chart Data.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {monthlyData} /get All monthly data
     * @returns {} get all list of months.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.formatPFMDonuctChartData = function(monthlyData) {
        function addRequireDonutChartFields(month) {
            month.label = month.categoryName;
            month.Value = Number(month.cashSpent);
            var configManager = applicationManager.getConfigurationManager();
            month.colorCode = configManager.PFM_CATEGORIES_COLORS[month.categoryName];
            return month;
        }
        var pfmData = monthlyData.map(addRequireDonutChartFields);
        return pfmData;
    }
    /**
     * presentPFM : Method for used to Format the Chart Data.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {monthlyData} /get All Year data
     * @returns {} get all list of Years.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.formatPFMBarChartData = function(yearlyData) {
        function addRequireBarChartFields(yearSpending) {
            yearSpending.label = yearSpending.monthName;
            yearSpending.Value = Number(yearSpending.totalCashFlow);
            yearSpending.colorCode = "#3c6cbe";
            yearSpending.annotationText = CommonUtilities.formatCurrencyWithCommas(yearSpending.totalCashFlow);
            yearSpending.tooltipText = yearSpending.monthName + ": " + CommonUtilities.formatCurrencyWithCommas(yearSpending.totalCashFlow);
            return yearSpending;
        }
        var pfmData = yearlyData.map(addRequireBarChartFields).reverse();
        return pfmData;
    }
    /**
     * presentPFM : Method for return list of years
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {data} /viewmodel for form
     * @returns {} get all list of Years.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.getPFMYears = function() {
        var pfmYears = [];
        var date = new Date();
        var presentYear = date.getFullYear();
        if (presentYear && date.getMonth() === 0) {
            presentYear = presentYear - 1;
        }
        for (var i = 0; i < applicationManager.getConfigurationManager().pfmMaxYears; i++) {
            pfmYears.push(presentYear - i);
        }
        return pfmYears;
    };
    /**
     * presentPFM : Method for return List Of Months.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {data} /viewmodel for form
     * @returns {} get all list of months.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.getPFMMonthsByYear = function(year) {
        var pfmMonthsWithYear = {};
        pfmMonthsWithYear.year = year;
        var date = new Date();
        var presentYear = date.getFullYear();
        if (presentYear && date.getMonth() === 0) {
            pfmMonthsWithYear.pfmMonths = CommonUtilities.returnMonths();
        } else if (year == presentYear) {
            pfmMonthsWithYear.pfmMonths = CommonUtilities.returnMonths(date.getMonth());
        } else {
            pfmMonthsWithYear.pfmMonths = CommonUtilities.returnMonths();
        }
        return pfmMonthsWithYear;
    };
    /**
     * getMonthlySpending : used to get Montly Spening Data.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {monthId} //sending particular month
     * @returns {} get all list of categories with spendings.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.selectYear = function(year) {
        var viewModel = {};
        viewModel.getMonths = this.getPFMMonthsByYear(year);
        this.presentPFM(viewModel);
    };
    /**
     * getPFMAccounts : used to get All PFMAccouns.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {}
     * @returns {} get all list of categories with spendings.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.getPFMRelatedAccounts = function(monthId, year) {
        var self = this;
        self.showProgressBar();
        var reqObject = {
            'year': year,
            'monthId': monthId
        };
        var PersonalFinanceManager = applicationManager.getPersonalFinanceManager();
        PersonalFinanceManager.getSelecetdPFMAccounts(reqObject, this.getPFMRelatedAccountsSuccess.bind(this), this.getPFMRelatedAccountsFailure.bind(this));
    };
    PersonalFinanceManagement_PresentationController.prototype.getPFMRelatedAccountsSuccess = function(response) {
        var viewModel = {};
        viewModel.showPFMAccounts = true;
        viewModel.pfmAccounts = this.formatPFMAccounts(response.records);
        this.presentPFM(viewModel);
    };
    PersonalFinanceManagement_PresentationController.prototype.getPFMRelatedAccountsFailure = function(error) {
        this.presentPFM({
            onServerDownError: true
        });
    };
    /**
     * formatPFMAccounts : used to format the accounts.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {data}
     * @returns {} get all pfm related accounts.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.formatPFMAccounts = function(accounts) {
        function formatPFMAccount(account) {
            account.accountID = kony.i18n.getLocalizedString("i18n.common.accountNumber") + " " + CommonUtilities.getMaskedAccountNumber(account.accountID);
            account.availableBalance = CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode);
            account.totalDebits = CommonUtilities.getDisplayCurrencyFormat(account.totalDebitsMonth, false, account.currencyCode);
            account.totalCredits = CommonUtilities.getDisplayCurrencyFormat(account.totalCreditMonths, false, account.currencyCode);
            account.currentBalance = CommonUtilities.formatCurrencyWithCommas(account.currentBalance, false, account.currencyCode);
            account.outstandingBalance = CommonUtilities.formatCurrencyWithCommas(account.outstandingBalance, false, account.currencyCode);
            return account;
        }
      var pfmAccounts= [];
        if(!kony.sdk.isNullOrUndefined(accounts) && accounts !== ""){
           pfmAccounts = accounts.map(formatPFMAccount);  
        }
        return pfmAccounts;
    };
    /**
     * getMonthlySpending : used to get Montly Spening Data.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {monthId} //sending particular month
     * @returns {} get all list of categories with spendings.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.getMonthlySpending = function(showBothDonutChart, monthId, year, frmView) {
        var self = this;
        self.showProgressBar();
        var reqObject = {
            'monthId': monthId,
            'year': year
        };
        var criteria = kony.mvc.Expression.and(kony.mvc.Expression.eq("monthId", reqObject.monthId),
            kony.mvc.Expression.eq("year", reqObject.year));
        var PersonalFinanceManager = applicationManager.getPersonalFinanceManager();
        PersonalFinanceManager.getMonthlySpending(criteria, this.getMonthlySpendingSuccess.bind(this, showBothDonutChart, frmView), this.getMonthlySpendingFailure.bind(this));
    };
    PersonalFinanceManagement_PresentationController.prototype.getMonthlySpendingSuccess = function(showBothDonutChart, frmView, response) {
        if (frmView === undefined) {
            var viewModel = {};
            if (showBothDonutChart)
                viewModel.showBothDonutCharts = true;
            else
                viewModel.showBothDonutCharts = false;
            viewModel.showMonthlyDonutChart = true;
            viewModel.monthlySpending = this.formatPFMDonuctChartData(response);
            if (response.length !== 0)
                viewModel.totalCashSpent = CommonUtilities.formatCurrencyWithCommas(response[0].totalCashSpent);
            this.presentPFM(viewModel);
        } else {
            frmView.monthlySpending = this.formatPFMDonuctChartData(response);
            if (response.length !== 0)
                frmView.totalCashSpent = CommonUtilities.formatCurrencyWithCommas(response[0].totalCashSpent);
            if (showBothDonutChart)
                frmView.showBothDonutCharts = true;
            else
                frmView.showBothDonutCharts = false;
            this.presentPFM(frmView);
        }
    };
    PersonalFinanceManagement_PresentationController.prototype.getMonthlySpendingFailure = function(error) {
        this.presentPFM({
            onServerDownError: true
        });
    };
    /**
     * getYearlySpending : used to get Yearly Spening Data.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {yearId} //sending particular year
     * @returns {} get all list of categories with spendings.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.getYearlySpending = function(year) {
        var self = this;
        self.showProgressBar();
        var reqObject = {
            'year': year
        };
        var criteria = kony.mvc.Expression.eq("year", reqObject.year);
        var PersonalFinanceManager = applicationManager.getPersonalFinanceManager();
        PersonalFinanceManager.getYearlySpending(criteria, this.getYearlySpendingSuccess.bind(this, year), this.getYearlySpendingFailure.bind(this));
    };
    PersonalFinanceManagement_PresentationController.prototype.getYearlySpendingSuccess = function(year, response) {
        var pfmYearData = response;
        var date = new Date();
        if (date.getFullYear() == year) {
            pfmYearData = pfmYearData.slice(0, date.getMonth());
        }
        var viewModel = {};
        viewModel.showYearlyBarChart = true;
        viewModel.yearlySpending = this.formatPFMBarChartData(pfmYearData);
        this.presentPFM(viewModel);
    };
    PersonalFinanceManagement_PresentationController.prototype.getYearlySpendingFailure = function(error) {
        this.presentPFM({
            onServerDownError: true
        });
    };
    /**
     * createDataModelUnCategorizedTransations : Method for create data model for uncategorized transaction
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {transaction} /transaction array for form
     * @returns {}
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.createDataModelUnCategorizedTransations = function(transaction) {
        var currencySymbol = applicationManager.getFormatUtilManager().getCurrencySymbol(transaction.transactionCurrency);
        return {
            transactionId: transaction.transactionId,
            categoryName: transaction.categoryName,
            categoryId: transaction.categoryId,
            toAccountName: transaction.toAccountName,
            toAccountNumber: transaction.toAccountNumber,
            fromAccountName: transaction.fromAccountName,
            fromAccountNumber: transaction.fromAccountNumber,
            transactionAmount: CommonUtilities.formatCurrencyWithCommas(transaction.transactionAmount, false, currencySymbol),
            transactionDate: CommonUtilities.getFrontendDateString(transaction.transactionDate),
            transactionDescription: transaction.transactionDescription
        }
    };
    /**
     * showBulkUpdateTransaction : Method to present the viewmodel in form
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {} /viewmodel for form
     * @returns {}
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.showBulkUpdateTransaction = function() {
        this.presentPFM({
            bulkUpdateTransactionList: this.transactionViewModel
        });
    };
    /**
     * showUnCategorizedTransaction : Method to display viewmodel in form
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {data} /viewmodel for form
     * @returns {}
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.showUnCategorizedTransaction = function(transactionObj) {
        this.transactionViewModel = transactionObj.data.map(this.createDataModelUnCategorizedTransations);
        this.presentPFM({
            unCategorizedIdTransactionList: {
                data: this.transactionViewModel,
                config: transactionObj.config
            }
        });
    };
    /**
     * fetchUnCategorizedTransations : Method for load uncategorised transaction list.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {monthId} / monthId to load
     * @returns {} \
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchUnCategorizedTransations = function(monthId, yearId, dataInputs) {
        var self = this;
        if (monthId) {
            this.monthId = monthId;
            this.yearId = yearId;
        }
        if (this.unCategorizedId === undefined || this.unCategorizedId === null) {
            this.fetchCategoryList();
            return;
        }
        var sortInputs = this.sortUnCatTranascionsConfig;
        if (dataInputs) {
            sortInputs = CommonUtilities.Sorting.getSortConfigObject({
                sortBy: dataInputs.sortBy,
                order: dataInputs.order
            }, self.sortUnCatTranascionsConfig);
        }
        var reqObject = {
            monthId: self.monthId,
            yearId: self.yearId,
            categoryId: self.unCategorizedId,
            sortBy: sortInputs.sortBy,
            order: sortInputs.order
        };
        var criteria = kony.mvc.Expression.and(kony.mvc.Expression.eq("monthId", reqObject.monthId),
            kony.mvc.Expression.eq("year", reqObject.yearId),
            kony.mvc.Expression.eq("categoryId", reqObject.categoryId),
            kony.mvc.Expression.eq("sortBy", reqObject.sortBy),
            kony.mvc.Expression.eq("order", reqObject.order));
        var PersonalFinanceManager = applicationManager.getPersonalFinanceManager();
        PersonalFinanceManager.getUncategorizedTransactions(criteria, this.fetchUnCategorizedTransationsSuccess.bind(this, reqObject), this.fetchUnCategorizedTransationsFailure.bind(this));
    };
    PersonalFinanceManagement_PresentationController.prototype.fetchUnCategorizedTransationsSuccess = function(reqObject, response) {
        this.showUnCategorizedTransaction({
            data: response,
            config: reqObject
        });
    };
    PersonalFinanceManagement_PresentationController.prototype.fetchUnCategorizedTransationsFailure = function(error) {
        this.presentPFM({
            onServerDownError: true
        });
    };
    /**
     * bulkUpdateCategory : Method for update the transactions
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {transactionsList} /list of transactions
     * @returns {}
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.bulkUpdateCategory = function(transactionList) {
        var self = this;
        var PersonalFinanceManager = applicationManager.getPersonalFinanceManager();
        PersonalFinanceManager.bulkUpdateTransactions(transactionList, this.bulkUpdateCategorySuccess.bind(this), this.bulkUpdateCategoryFailure.bind(this));
    };
    PersonalFinanceManagement_PresentationController.prototype.bulkUpdateCategorySuccess = function(response) {};
    PersonalFinanceManagement_PresentationController.prototype.bulkUpdateCategoryFailure = function(error) {
        this.presentPFM({
            onServerDownError: true
        });
    };
    /**
     * fetchCategoryList : Method to load categories list.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {}
     * @returns {}
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.fetchCategoryList = function() {
        var self = this;
        var PersonalFinanceManager = applicationManager.getPersonalFinanceManager();
        PersonalFinanceManager.getPFMCategories(this.fetchCategoryListSuccess.bind(this), this.fetchCategoryListFailure.bind(this));
    };
    PersonalFinanceManagement_PresentationController.prototype.fetchCategoryListSuccess = function(response) {
        this.categoryList = response;
        this.unCategorizedId = response.filter(function(data) {
            if (data.categoryName === OLBConstants.UNCATEGORISED) {
                return data.categoryId;
            }
        })[0].categoryId;
        this.fetchUnCategorizedTransations();
        this.presentPFM({
            categoryList: this.categoryList
        });
    };
    PersonalFinanceManagement_PresentationController.prototype.fetchCategoryListFailure = function(error) {
        this.presentPFM({
            onServerDownError: true
        });
    };
    /**
     * presentPFM : Method for navigate to PersonalFinanceManagement form.
     * @member of {PersonalFinanceManagement_PresentationController}
     * @param {data} /viewmodel for form
     * @returns {} get all list of categories with spendings.
     * @throws {}
     */
    PersonalFinanceManagement_PresentationController.prototype.presentPFM = function(data) {
        var navigationManager = applicationManager.getNavigationManager();
        navigationManager.updateForm(data, "frmPersonalFinanceManagement");
      //  navigationManager.updateForm(data, ({"appName": "PfmMA","friendlyName": "frmPersonalFinanceManagement"}));
        //this.presentUserInterface("frmPersonalFinanceManagement", data);
    };
    PersonalFinanceManagement_PresentationController.prototype.showProgressBar = function(data) {
        var self = this;
        self.presentPFM({
            "showProgressBar": "showProgressBar"
        });
    };
    PersonalFinanceManagement_PresentationController.prototype.hideProgressBar = function(data) {
        var self = this;
        self.presentPFM({
            "hideProgressBar": "hideProgressBar"
        });
    };
    return PersonalFinanceManagement_PresentationController;
});