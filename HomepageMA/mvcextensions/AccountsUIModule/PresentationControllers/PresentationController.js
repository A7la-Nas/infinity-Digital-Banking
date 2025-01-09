define(["CommonUtilities", "OLBConstants"], function(CommonUtilities, OLBConstants) {
    function PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
        this.initializePresentationController();
        this.isAccountsLoading = false;
        this.mapAccounts = false;
        this.fetchPasswordWarningAndOutageMessages = true;
        this.customViews = null;
        this.accountIdsCreate = "";
        this.accountIdsEdit = "";
        this.currentCustomView = "";
        this.CSRModeAccountID="";
        this.transactionDetails={};
		this.permissionData = {};
        this.Customers = null;
        this.customeraccounts = null;
        this.customerdashboard = null;
        this.customerId = "";
		this.customerIdName = "";
		this.allActionsFetched = false;
		this.showbackNavigation = true;
    }
    var currentAccount = null;
    var scope = this;
    var frmName = {"appName": "HomepageMA"};
    var frmAccountsDetails = {"friendlyName":"AccountsUIModule/frmAccountsDetails","appName":"ArrangementsMA"}

    inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);
    PresentationController.prototype.initializePresentationController = function() {
		require(['ApplicationManager'], function(ApplicationManager){
          applicationManager =  ApplicationManager.getApplicationManager();
        var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
        this.scheduleTransactonsConfig = {
            All: {
                sortBy: "scheduledDate",
                defaultSortBy: "scheduledDate",
                order: OLBConstants.DESCENDING_KEY,
                defaultOrder: OLBConstants.DESCENDING_KEY,
                offset: OLBConstants.DEFAULT_OFFSET,
                limit: OLBConstants.PAGING_ROWS_LIMIT
            }
        };
        this.sortConfig = {
            All: {
                sortBy: "transactionDate",
                defaultSortBy: "transactionDate",
                order: OLBConstants.DESCENDING_KEY,
                defaultOrder: OLBConstants.DESCENDING_KEY,
                offset: OLBConstants.DEFAULT_OFFSET,
                limit: OLBConstants.PAGING_ROWS_LIMIT
            },
            Checks: {
                sortBy: "transactionDate",
                defaultSortBy: "transactionDate",
                order: OLBConstants.DESCENDING_KEY,
                defaultOrder: OLBConstants.DESCENDING_KEY,
                offset: OLBConstants.DEFAULT_OFFSET,
                limit: OLBConstants.PAGING_ROWS_LIMIT
            },
            Deposits: {
                sortBy: "transactionDate",
                defaultSortBy: "transactionDate",
                order: OLBConstants.DESCENDING_KEY,
                defaultOrder: OLBConstants.DESCENDING_KEY,
                offset: OLBConstants.DEFAULT_OFFSET,
                limit: OLBConstants.PAGING_ROWS_LIMIT
            },
            Transfers: {
                sortBy: "transactionDate",
                defaultSortBy: "transactionDate",
                order: OLBConstants.DESCENDING_KEY,
                defaultOrder: OLBConstants.DESCENDING_KEY,
                offset: OLBConstants.DEFAULT_OFFSET,
                limit: OLBConstants.PAGING_ROWS_LIMIT
            },
            Withdrawals: {
                sortBy: "transactionDate",
                defaultSortBy: "transactionDate",
                order: OLBConstants.DESCENDING_KEY,
                defaultOrder: OLBConstants.DESCENDING_KEY,
                offset: OLBConstants.DEFAULT_OFFSET,
                limit: OLBConstants.PAGING_ROWS_LIMIT
            },
            Payments: {
                sortBy: "transactionDate",
                defaultSortBy: "transactionDate",
                order: OLBConstants.DESCENDING_KEY,
                defaultOrder: OLBConstants.DESCENDING_KEY,
                offset: OLBConstants.DEFAULT_OFFSET,
                limit: OLBConstants.PAGING_ROWS_LIMIT
            },
            Purchases: {
                sortBy: "transactionDate",
                defaultSortBy: "transactionDate",
                order: OLBConstants.DESCENDING_KEY,
                defaultOrder: OLBConstants.DESCENDING_KEY,
                offset: OLBConstants.DEFAULT_OFFSET,
                limit: OLBConstants.PAGING_ROWS_LIMIT
            },
            Interest: {
                sortBy: "transactionDate",
                defaultSortBy: "transactionDate",
                order: OLBConstants.DESCENDING_KEY,
                defaultOrder: OLBConstants.DESCENDING_KEY,
                offset: OLBConstants.DEFAULT_OFFSET,
                limit: OLBConstants.PAGING_ROWS_LIMIT
            }
        };
        var self = this;
        this.Transactions = {
            showTransactionsByType: function(dataInputs) {
                this.showSelectedAccountTransaction(null, dataInputs);
            }.bind(self),
            showAll: function(dataInputs) {
                var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
                this.showSelectedAccountTransaction(null, dataInputs || {
                    resetSorting: true,
                    transactionType: OLBConstants.ALL
                });
            }.bind(self),
            showChecks: function(dataInputs) {
                var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
                this.showSelectedAccountTransaction(null, dataInputs || {
                    resetSorting: true,
                    transactionType: OLBConstants.TRANSACTION_TYPE.CHECKS
                });
            }.bind(self),
            showDeposits: function(dataInputs) {
                var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
                this.showSelectedAccountTransaction(null, dataInputs || {
                    resetSorting: true,
                    transactionType: OLBConstants.TRANSACTION_TYPE.DEPOSITS
                });
            }.bind(self),
            showTransfers: function(dataInputs) {
                var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
                this.showSelectedAccountTransaction(null, dataInputs || {
                    resetSorting: true,
                    transactionType: OLBConstants.TRANSACTION_TYPE.TRANSFERS
                });
            }.bind(self),
            showWithdrawals: function(dataInputs) {
                var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
                this.showSelectedAccountTransaction(null, dataInputs || {
                    resetSorting: true,
                    transactionType: OLBConstants.TRANSACTION_TYPE.WITHDRAWLS
                });
            }.bind(self),
            showInterest: function(dataInputs) {
                var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
                this.showSelectedAccountTransaction(null, dataInputs || {
                    resetSorting: true,
                    transactionType: OLBConstants.TRANSACTION_TYPE.INTEREST
                });
            }.bind(self),
            showPurchase: function(dataInputs) {
                var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
                this.showSelectedAccountTransaction(null, dataInputs || {
                    resetSorting: true,
                    transactionType: OLBConstants.TRANSACTION_TYPE.PURCHASES
                });
            }.bind(self),
            showPayment: function(dataInputs) {
                var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
                this.showSelectedAccountTransaction(null, dataInputs || {
                    resetSorting: true,
                    transactionType: OLBConstants.TRANSACTION_TYPE.PAYMENTS
                });
            }.bind(self)
        };
    }
                );};
	
    /**
     * Entery method for accounts landing page. This method inturns calls 3 methods to get data for different section of form
     */
	 PresentationController.prototype.showAccountsDashboard = function(params, data) {
      params = params || {};
      if (CommonUtilities.isCSRMode()) 
      {
		scope.CSRModeAccountID = params && params.accountID ? params.accountID:"";
      }
      this.loadSystemConfigurations();
      this.showCustomers(params);
//       var configurationManager = applicationManager.getConfigurationManager();
//       if (!scope.CSRModeAccountID) {
//         applicationManager.getNavigationManager().navigateTo(frmName);
//         applicationManager.getNavigationManager().updateForm({
//           showLoadingIndicator: {
//             status: true
//           }
//         }, frmName);
//       }
//       this.showWelcomeBanner();
//       this.showAllAccounts(params.noRefresh);
//       this.loadAccountsLandingComponents();
    };
   
    /**
     * Method takes you to server error page in case if a critical/required service call fails.
     */
    PresentationController.prototype.showOnServerError = function() {
        CommonUtilities.showServerDownScreen();
    };

    PresentationController.prototype.updateFeedBackId = function(userData) {
        if (applicationManager.getConfigurationManager().isFeedbackEnabled === "true") {
            applicationManager.getStorageManager().setStoredItem("feedbackUserId", userData.feedbackUserId);
        }
        applicationManager.getFeedbackManager().updateFeedbackId(null);
    }
    /**
     * Method to show Welcome banner in accounts Landing page like last logged in time/User Name etc.
     */
    PresentationController.prototype.showWelcomeBanner = function() {
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
    PresentationController.prototype.fetchWelcomeBannerSuccess = function(userData) {
        var dateObj = applicationManager.getFormatUtilManager().getDateObjectfromString(userData.lastlogintime, "YYYY-MM-DDTHH:MM:SS");
        var lastLoggedInTime = applicationManager.getFormatUtilManager().getFormatedDateString(dateObj, "m/d/Y h:m A");
        userData.lastlogintime = lastLoggedInTime;
        userData.userImageURL = applicationManager.getUserPreferencesManager().getUserImage();
        applicationManager.getNavigationManager().updateForm({
            welcomeBanner: userData
        }, frmName);
    };
	  PresentationController.prototype.navCustomerDashboard = function() {          
          var frmNavName = {"friendlyName":"AccountsUIModule/frmCustomerDashboard","appName":"HomepageMA"}
          applicationManager.getNavigationManager().updateForm({
            accountsSummary: this.Customers
        }, frmNavName);
     }
	  PresentationController.prototype.showCustomers = function(params) {
        var self = this;
        applicationManager.getAccountManager().fetchInternalCustomerAccounts(this.fetchCustomersSuccess.bind(this, params), this.fetchCustomersFailure.bind(this));
     }
     PresentationController.prototype.fetchCustomersSuccess = function(params, response) {
	   this.showUpgradePopup = response.showUpgradePopup;
       if(response.reDesignFlow === "true"){
         this.customerdashboard = response.reDesignFlow;
         frmName.friendlyName = "AccountsUIModule/frmCustomerDashboard";
         this.Customers = response.Accounts;
         applicationManager.getNavigationManager().navigateTo(frmName);
         applicationManager.getNavigationManager().updateForm({
            accountsSummary: this.Customers
        }, frmName);
        applicationManager.getNavigationManager().updateForm({
          showLoadingIndicator: {
            status: false
          }
        }, frmName); 
        this.showWelcomeBanner();
        this.showAllAccounts(params.noRefresh);
		this.saveCustomersAndFetchActions(response.Accounts);
        this.loadAccountsLandingComponents();
        
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false
            }
        }, frmName);
       } else {
         frmName.friendlyName = "AccountsUIModule/frmDashboard";
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
       }
     }
    PresentationController.prototype.fetchCustomersFailure = function(response) {
     applicationManager.getNavigationManager().updateForm({
            serviceError: true,
            showLoadingIndicator: {
                status: false
            }
        });
    }

    PresentationController.prototype.fetchAccounts = function(userName) {
        var self = this;
		var params = {};
        function completionCallback(accountsData) {
            this.accounts = accountsData;
            this.isAccountsLoading = false;
            if (this.mapAccounts) {
                this.fetchAccountsSuccess();
          }
        }
		 this.isAccountsLoading = true;
        if(this.customerdashboard === "true"){
            params = {
              "actions":"false"
            }
        }
        if(this.customerId !== ""){
            params = {
              "Membership_id":this.customerId
            }
        }
        applicationManager.getAccountManager().getInternalAccountsWithParams(params, completionCallback.bind(this), this.showOnServerError.bind(this));

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
    }
    /**
     *Method to get all accounts i.e internal and external based on aggregatedAccount flag of configurations
     */
    PresentationController.prototype.showAllAccounts = function(noRefresh) {
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
          applicationManager.getPresentationUtility().showLoadingScreen();
            this.mapAccounts = true;
        } else {
            this.fetchAccountsSuccess();
        }
    };
   
    /**
     *Method is invoked when fetching of accounts is successful. It covers both scenarios of internal and external accounts
     * @param {Collection} accounts list of all the accounts i.e internal account and external accounts based on aggregatedAccount flag of configurations
     */
    PresentationController.prototype.fetchAccountsSuccess = function() {
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
      this.fetchScheduledTransactions();
      var finalData = JSON.parse(JSON.stringify(this.accounts));
        for (var i = finalData.length-1; i >=0; i--) {
                if (finalData[i].isPortFolioAccount === "true") {
                    finalData.splice(i, 1);
                }
            }
      var mortgageAccounts = finalData.filter(function(account){
        return account.accountType==="mortgageFacility"
      });
      if(mortgageAccounts.length){
        finalData = finalData.filter(function(account){
          return !(account.accountType === "Loan" && account.productGroup === "MORTGAGE")
        });
      }
      this.accounts = finalData;
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
     /**
     *Method is invoked when fetching of accounts is successful. It covers both scenarios of internal and external accounts
     * @param {Collection} accounts list of all the accounts i.e internal account and external accounts based on aggregatedAccount flag of configurations
     */
    PresentationController.prototype.fetchCustomerAccountsSuccess = function() {
      var self = this;      
      this.fetchScheduledTransactions();
      var finalData = JSON.parse(JSON.stringify(this.customeraccounts));
        for (var i = finalData.length-1; i >=0; i--) {
                if (finalData[i].isPortFolioAccount === "true") {
                    finalData.splice(i, 1);
                }
            }
      var mortgageAccounts = finalData.filter(function(account){
        return account.accountType==="mortgageFacility"
      });
      if(mortgageAccounts.length){
        finalData = finalData.filter(function(account){
          return !(account.accountType === "Loan" && account.productGroup === "MORTGAGE")
        });
      }
      this.customeraccounts = finalData;
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
    PresentationController.prototype.callPostAccountsService = function() {
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
    PresentationController.prototype.performServiceCallsOnAccountsSuccess = function(userName) {
        var scope = this;
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
            ],
            function(asyncResponses) {
                scope.showPasswordExpiryMessage();
                scope.showOutageMessage();
                scope.fetchPasswordWarningAndOutageMessages = false;
            }
        )
    };
    PresentationController.prototype.saveCustomersAndFetchActions = function(customers){
        var customerList = [];
        customers.forEach(function(customer){
            customerList.push(customer["membershipId"]);
        });
        applicationManager.getUserPreferencesManager().allCustomerIdList = customerList;
        this.fetchActions();
    };
    /**
     * Method for declaring counts for actions and fetching for first few coreCustomer ID
     */
    PresentationController.prototype.fetchActions = function() {
        var custIdList = applicationManager.getUserPreferencesManager().allCustomerIdList;
        this.customerIdLength = custIdList.length;
        this.currentCall = 1;
        this.totalCallsForAction  = 0;
        this.totalAsyncCallForActions = 5;
        this.totalNoOfCustomerPerCall  = 10;
        this.totalSyncCallForActions = parseInt(this.customerIdLength/(this.totalNoOfCustomerPerCall * this.totalAsyncCallForActions));
        this.totalSyncCallForActions = (this.customerIdLength%(this.totalNoOfCustomerPerCall * this.totalAsyncCallForActions)) ? this.totalSyncCallForActions+1 : this.totalSyncCallForActions;
          if (custIdList.length > 0) {
              this.fetchActionsList();
          } else {
              this.logOut("");
          }             
      };  
    /**
       * Method for preparing the params and fetching actions for give coreCustomerId
       */
    PresentationController.prototype.fetchActionsList = function() {
          this.currentAsyncCount = 0;
          var custIdList = applicationManager.getUserPreferencesManager().allCustomerIdList;
          var start = (this.currentCall - 1) * (this.totalNoOfCustomerPerCall * this.totalAsyncCallForActions);
          var end = (this.currentCall) * (this.totalNoOfCustomerPerCall * this.totalAsyncCallForActions);
          if (this.currentCall == this.totalSyncCallForActions) {
              end = custIdList.length;
          }
          for (var i = start; i < end; i = i + this.totalNoOfCustomerPerCall) {
              var params = {
                  "coreCustomerId": ""
              };
              var value = custIdList[i];
              for (j = i + 1; j < i + this.totalNoOfCustomerPerCall; j++) {
                  if (custIdList[j] != undefined) {
                      value += " " + custIdList[j];
                  } else {
                      break;
                  }
              }
              params['coreCustomerId'] = value;
              applicationManager.getAccountManager().fetchInternalAccountsActions(params, this.fetchActionsListSuccess.bind(this), this.fetchActionsListFailure.bind(this));
          }
      };
        /**
       * fetchActionsList Success call back
       */
      PresentationController.prototype.fetchActionsListSuccess = function(data) {
          this.totalCallsForAction++;
          this.currentAsyncCount++;
          if (this.currentAsyncCount == this.totalAsyncCallForActions) {
              this.currentCall++;
              this.currentAsyncCount = 0
              this.fetchActionsList();
          }
          var accData = JSON.parse(JSON.stringify(data.Accounts));
          for (var account = 0; account < accData.length; account++) {
              this.permissionData[accData[account].account_id] = {
                  "actions": JSON.parse(accData[account].actions),
                  "isBusinessAccount": accData[account].isBusinessAccount === "true"
              };
          }
          applicationManager.getConfigurationManager().setAccountPermissions(this.permissionData);
          if (this.totalCallsForAction == Math.ceil(this.customerIdLength / this.totalNoOfCustomerPerCall)) {
             this.saveActionsPermissionsInCache();           
              if (this.accounts != undefined && this.accounts.length > 0) {
                  applicationManager.getNavigationManager().updateForm({
                      accountPermission: "true"
                  }, frmName);
              }
          }
      };
      /**
       * fetchActionsList Failure call back
       */
      PresentationController.prototype.fetchActionsListFailure = function() {
          this.totalCallsForAction++;
          this.currentAsyncCount++;
          if (this.currentAsyncCount == this.totalAsyncCallForActions) {
              this.currentCall++;
              this.currentAsyncCount = 0
              this.fetchActionsList();
          }
          if (this.totalCallsForAction == Math.ceil(this.customerIdLength / this.totalNoOfCustomerPerCall)) {
             this.saveActionsPermissionsInCache();
              if (this.accounts != undefined && this.accounts.length > 0) {
                  applicationManager.getNavigationManager().updateForm({
                      accountPermission: "true"
                  }, frmName);
              }
          }
      };
      /**
       * to save account level permissions in cache
       */
      PresentationController.prototype.saveActionsPermissionsInCache = function() {
                this.allActionsFetched = true;
              var value = "";
              var custIdList = applicationManager.getUserPreferencesManager().allCustomerIdList;
              for(var i=0;i<custIdList.length;i+=this.totalNoOfCustomerPerCall){
                  value = value + custIdList[i]+",";                ;
              }
              var params = {
                  "coreCustomerIdList": value.substring(0, value.length - 1)
              };
              applicationManager.getAccountManager().saveActionsPermissionsInCache(params,this.saveActionsPermissionsInCacheSuccess.bind(this),this.saveActionsPermissionsInCacheFailure.bind(this));
      };
      /**
       * saveActionsPermissionsInCache success callback
       */
      PresentationController.prototype.saveActionsPermissionsInCacheSuccess = function(data) {
          console.log("saveActionsPermissionsInCacheSuccess");
      };
      /**
       * saveActionsPermissionsInCache error call back
       */
      PresentationController.prototype.saveActionsPermissionsInCacheFailure = function(error) {
          console.log("saveActionsPermissionsInCacheFailure");
      };
    PresentationController.prototype.getAccountDashboardCampaignsOnBreakpointChange = function() {
        var self = this;
        if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.OLB_ENABLE_INAPP_CAMPAIGNS && OLBConstants.CLIENT_PROPERTIES.OLB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE") {
            var directMktManager = applicationManager.getDirectMarketingManager();
            directMktManager.getAds("accountDashboardCampaignsWeb", self.getCampaignsSuccess.bind(self), self.getCampaignsFailure.bind(self));
        } else {
            self.getCampaignsSuccess([]);
        }
    };
    /**
     *Method is used for fetching of campaigns
     * @param {Object}- list of campaigns
     */
    PresentationController.prototype.getCampaigns = function(response) {
        if (response.campaignSpecifications)
            this.getCampaignsSuccess(response);
        else
            this.getCampaignsFailure(response);
    };
    /**
     * Method that gets called when fetching unread messages is successful
     * @param {Object} messagesObj List of messages Object
     */
    PresentationController.prototype.getCampaignsSuccess = function(res) {
        applicationManager.getNavigationManager().updateForm({
            "campaignRes": res
        });
    };
    /**
     * Method that gets called when there is an error in fetching unread messages for account dashboard
     * @param {Object} error Error Object
     */
    PresentationController.prototype.getCampaignsFailure = function(error) {
        applicationManager.getNavigationManager().updateForm({
            "campaignError": error
        });
    };
    /**
     *  Process external Account Data
     * @param {Collection} rawData External accounts JSON
     * @returns {Collection} Collection of altered data
     */
    PresentationController.prototype.processExternalAccountsData = function(rawData) {
        var isError = function(error) {
            try {
                if (error && error.trim() !== "") {
                    return true;
                }
                return false;
            } catch (err) {}
        };
        var account = {};
        account.accountName = rawData.AccountName;
        account.nickName = rawData.NickName;
        account.accountID = rawData.Number;
        account.accountType = rawData.TypeDescription;
        account.availableBalance = rawData.AvailableBalance;
        account.currentBalance = rawData.AvailableBalance;
        account.outstandingBalance = rawData.AvailableBalance;
        account.availableBalanceUpdatedAt = (rawData.LastUpdated) ? (CommonUtilities.getTimeDiferenceOfDate(rawData.LastUpdated)) : kony.i18n.getLocalizedString('i18n.AcountsAggregation.timeDifference.justNow');
        if (String(rawData.FavouriteStatus).trim().toLowerCase() === "true") {
            account.favouriteStatus = "1";
        } else {
            account.favouriteStatus = "0";
        }
        account.bankLogo = rawData.BankLogo;
        account.isError = isError(rawData.error);
        account.isExternalAccount = true;
        account.bankName = rawData.BankName;
        account.userName = (rawData.Username) ? rawData.Username : rawData.username;
        account.bankId = rawData.Bank_id;
        account.externalAccountId = rawData.Account_id;
        account.accountHolder = rawData.AccountHolder;
        return account;
    };

    PresentationController.prototype.fetchIsBusinessAccount = function(accountNumber) {
        var accountsList = this.accounts;
        for (i = 0; i < accountsList.length; i++) {
            if (accountsList[i].accountID === accountNumber) {
                return accountsList[i].isBusinessAccount;
            }
        }
        return "false";
    };
    /**
     * Method to toggle favourite account status of any specific selected account
     * @param {JSON} account details of the current account whose status is to be changed
     */
     PresentationController.prototype.changeAccountFavouriteStatus = function(account) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true
            }
        }, frmName);
        var favoriteStatus, accountModel, email, nickName, eStatementEnable;
        if (account.favouriteStatus === "1") {
            favoriteStatus = "0";
        } else {
            favoriteStatus = "1";
        }
        email = applicationManager.getUserPreferencesManager().getUserEmail();
        nickName = account.nickName ? account.nickName : "";
        eStatementEnable = account.eStatementEnable == "true" ? 1 : 0;
        if (account.isExternalAccount === true) {
            accountModel = {
                Account_id: account.externalAccountId,
                FavouriteStatus: favoriteStatus
            };
            applicationManager.getAccountManager().updateExternalAccountFavouriteStatus(accountModel, this.showAllAccounts.bind(this, false), this.showOnServerError.bind(this));
        } else {
            accountModel = {
                accountID: account.accountID,
                nickName: nickName,
                favouriteStatus: favoriteStatus,
                email: email,
                eStatementEnable: eStatementEnable
            };
			var controller = applicationManager.getPresentationUtility().getController('frmDashboard', true);
            controller.offset = 0;            
            controller.lastRecord = '';
            applicationManager.getAccountManager().updateFavouriteStatus(accountModel, this.showAllAccounts.bind(this, false), this.showFavouriteAccountsError.bind(this));
        }
    };
    PresentationController.prototype.showFavouriteAccountsError = function(account) {
      applicationManager.getNavigationManager().updateForm({
            errorMsg: "Account cannot be set as favourite"
          }, frmName);
    };
     /**
     * Method to toggle favourite account status of any specific selected account
     * @param {JSON} account details of the current account whose status is to be changed
     */
     PresentationController.prototype.changecustomerFavouriteStatus = function(Customer) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true
            }
        }, frmName);
        applicationManager.getAccountManager().updateCustomerFavouriteStatus(Customer, this.showFavouriteCustomersSuccess.bind(this, Customer), this.showFavouriteCustomersError.bind(this));
    };
      PresentationController.prototype.showFavouriteCustomersSuccess = function(Customer, response) {    
        for(var i = 0; i < this.Customers.length; i++){
          if(this.Customers[i].membershipId === Customer.coreCustomerId){
          if(Customer.favouriteStatus === "false"){
          this.Customers[i].favouriteStatus = "false";
          } else {
            this.Customers[i].favouriteStatus = "true";
          }
        }
        }
        if (kony.application.getCurrentForm().id === "frmCustomerDashboard") {
          //  navManager.navigateTo("frmCustomerDashboard");
		  if(frmName.friendlyName === "AccountsUIModule/frmDashboard"){
            frmName.friendlyName = "AccountsUIModule/frmCustomerDashboard"
          }
          applicationManager.getNavigationManager().updateForm({
            accountsSummary: this.Customers
        }, frmName);
        } 
      applicationManager.getNavigationManager().updateForm({
            serviceError: true,
            showLoadingIndicator: {
                status: false
            }
        });
    };
    PresentationController.prototype.showFavouriteCustomersError = function(Customer) {
      applicationManager.getNavigationManager().updateForm({
            errorMsg: "Account cannot be set as favourite"
          }, frmName);
      applicationManager.getNavigationManager().updateForm({
            serviceError: true,
            showLoadingIndicator: {
                status: false
            }
        });
    };
     /**
     * Method to fetch accounts for the customerID
     * @param {JSON} account details of the current account whose status is to be changed
     */
     PresentationController.prototype.getcustomerAccounts = function(params) {
       
        frmName.friendlyName = "AccountsUIModule/frmDashboard"; 
        kony.application.destroyForm(frmName); 
        applicationManager.getNavigationManager().navigateTo(frmName);
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.showWelcomeBanner();
        this.fetchCustomerAccounts(params);
        this.loadAccountsLandingComponents();
    };
    PresentationController.prototype.fetchCustomerAccounts = function(params) {
        var self = this;
      //  this.customerId = params.Membership_id;
        function completionCallback(accountsData) {
            this.customeraccounts = accountsData;
            this.isAccountsLoading = false;
            if (this.mapAccounts) {
                this.fetchCustomerAccountsSuccess();
          }
        }
        this.isAccountsLoading = true;
        applicationManager.getAccountManager().getInternalAccountsWithParams(params, completionCallback.bind(this), this.showOnServerError.bind(this));
     };
    /**
     * Method which calls all the functions for different components of accounts landing page except accounts accounts and user details.
     */
    PresentationController.prototype.loadAccountsLandingComponents = function() {
        this.getUnreadMessages();
        //this.fetchScheduledTransactions();
        var configurationManager = applicationManager.getConfigurationManager();
        if (configurationManager.isSMEUser === "false")
        if(applicationManager.getConfigurationManager().isMicroAppPresent("FinanceManagementMA")){
            this.fetchPFMData();
          }
        if (configurationManager.isCombinedUser === "false")
            this.fetchMessages();
    };

    PresentationController.prototype.showPasswordExpiryMessage = function() {
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
    PresentationController.prototype.showOutageMessage = function() {
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
    };
	
    /**
     * Method to get Unread messages count from messages module
     */
    PresentationController.prototype.getUnreadMessages = function() {
     if(applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.SECUREMESSAGE)){
      this.getUnreadMessagesOrNotificationsCount(this.getUnreadMessagesCountCompletionCallback.bind(this));
     }
        //var alertsMsgsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsMsgsUIModule");
        //alertsMsgsModule.presentationController.getUnreadMessagesOrNotificationsCount(this.getUnreadMessagesCountCompletionCallback.bind(this));
    };
  
	PresentationController.prototype.getUnreadMessagesOrNotificationsCount = function(unreadMsgsOrNotificationsCountCompletionCallback) {
        var scopeObj = this;
        var asyncManager = applicationManager.getAsyncManager();
        scopeObj.showProgressBar();
        scopeObj.messagesManager = applicationManager.getMessagesManager();
        scopeObj.alertsManager = applicationManager.getAlertsManager();
        var accountsManager = applicationManager.getAccountManager();
        asyncManager.callAsync(
          [
            asyncManager.asyncItem(accountsManager, 'fetchMessagesNotifications')
          ],
          scopeObj.onTotalUnreadCountComplete.bind(scopeObj, unreadMsgsOrNotificationsCountCompletionCallback)
        );
    };

	PresentationController.prototype.onTotalUnreadCountComplete = function(unreadMsgsOrNotificationsCountCompletionCallback, syncResponseObject) {
        var totalUnreadCount = 0,priorityMessageCount = 0;
        if (syncResponseObject.isAllSuccess()) {
            var unreadMessageCount = syncResponseObject.responses[0].data.unreadMessageCount;
            priorityMessageCount = Number(syncResponseObject.responses[0].data.priorityMessageCount);
            var unreadNotificationsCount = syncResponseObject.responses[0].data.notifications[0].UnreadNotificationCount;
            totalUnreadCount = Number(unreadMessageCount) + Number(unreadNotificationsCount);
        }
        var viewModel = {
            "totalUnreadCount": totalUnreadCount,
            "priorityMessageCount" : priorityMessageCount
        };
        unreadMsgsOrNotificationsCountCompletionCallback(viewModel);
    };
    
    PresentationController.prototype.showProgressBar = function() {
        this.presentAlerts({
            "showProgressBar": true
        });
    };

	PresentationController.prototype.presentAlerts = function(data) {
        //this.navManager.updateForm(data, this.frmNotificationsAndMessages);
    };
    /**
     * Method that receives unread message count from the Messages module
     * @param {JSON} response contains totalUnread count key for unread messages
     */
    PresentationController.prototype.getUnreadMessagesCountCompletionCallback = function(response) {
        applicationManager.getNavigationManager().updateForm({
            unreadCount: {
                count: response.totalUnreadCount,
              	priorityMessageCount : response.priorityMessageCount
            }
        }, frmName);
    };
    /**
     * Method to fetch upcomming scheduled transactions for accounts landing page
     */
    PresentationController.prototype.fetchScheduledTransactions = function() {
       applicationManager.getAccountManager().fetchScheduledTransaction(this.fetchScheduledTransactionSuccess.bind(this), this.fetchScheduledTransactionFailure.bind(this));
    };
    /**
     * Method that receives upcomming scheduled transactions for accounts dashboard
     * @param {Collection} transactions List of transactions
     */
    PresentationController.prototype.fetchScheduledTransactionSuccess = function(transactions) {
        applicationManager.getNavigationManager().updateForm({
            UpcomingTransactions: transactions
        });
    };
    /**
     * Method that gets called when there is an error in fetching upcomming account dasboard transactions
     * @param {Object} error Error Object
     */
    PresentationController.prototype.fetchScheduledTransactionFailure = function(error) {
        applicationManager.getNavigationManager().updateForm({
            UpcomingTransactions: [],
            serviceError: true
        });
    };
    /**
     * Method to fetch all the unread messages
     */
    PresentationController.prototype.fetchMessages = function() {
      if(applicationManager.getConfigurationManager().isMicroAppPresent("MessagesMA")){
        applicationManager.getMessagesManager().fetchAllRequestsForInbox(this.fetchMessagesSuccess.bind(this), this.fetchMessagesFailure.bind(this));
      }
    };
    /**
     * Method that gets called when fetching unread messages is successful
     * @param {Object} messagesObj List of messages Object
     */
    PresentationController.prototype.fetchMessagesSuccess = function(messagesObj) {
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
    PresentationController.prototype.fetchMessagesFailure = function(error) {
        applicationManager.getNavigationManager().updateForm({
            unreadMessages: [],
            serviceError: true
        });
    };

    /**
     * Method that fetches customview
     * @param request payload
     */
   PresentationController.prototype.fetchCustomViews = function(params) {
        applicationManager.getAccountManager().getCustomViews(params, this.onSuccessFetchCustomViews.bind(this), this.onErrorFetchCustomViews.bind(this));
    };
    /**
     * Method called as success callback for fetchCustomViews
     * @param {Object} response - response from service for fetchCustomViews
     */
    PresentationController.prototype.onSuccessFetchCustomViews = function(response) {
        this.customViews = response.customview;
        var data = {
            customView: response.customview
        };
        this.navigateToCustomviewDashboard(data);
    };
  /**
     * Method called as error callback for fetchCustomViews
     * @param {Object} response - response from service for fetchCustomViews
     */
    PresentationController.prototype.onErrorFetchCustomViews = function(response) {
        this.customViews = response;
    };

    /**
     * Method that creates custom view by passing the name and account Ids for the view
     * @param {JSON} request payload fwith name and accountIds
     */
    PresentationController.prototype.createCustomViews = function(param) {
        this.accountIdsCreate = param.accountIds;
        this.currentCustomView = param.name;
        applicationManager.getAccountManager().createCustomViews(param, this.onSuccessCreateCustomViews.bind(this), this.showOnServerError.bind(this));
    };

    /**
     * Method called as success callback for createCustomViews
     * @param {Object} response - response from service for createCustomViews
     */
    PresentationController.prototype.onSuccessCreateCustomViews = function(response) {
        var accounts = [];
        accounts = this.accountIdsCreate.split(',');
        var result = [];
        for (j = 0; j < accounts.length; j++) {
            for (i = 0; i < this.accounts.length; i++) {
                if (accounts[j] === this.accounts[i].Account_id) {
                    result.push(this.accounts[i]);
                    continue;
                }
            }
        }
        result.customView = response;
        result.customViewType = "Create";
        var data = {
            accountsSummary: result
        };
        this.navigateToCustomviewDashboard(data);
    };

    /*Method to navigate to dashboard after applying custom view */
    PresentationController.prototype.navigateToCustomviewDashboard = function(data) {
        var navManager = applicationManager.getNavigationManager();
        if (kony.application.getCurrentForm().id === "frmCustomerDashboard") {
            //  navManager.navigateTo("frmCustomerDashboard");
            applicationManager.getNavigationManager().updateForm({
                accountsSummary: this.Customers
            }, frmName);
        } else {
			if (kony.application.getCurrentForm().id === "frmCustomViews"){
				navManager.navigateTo("frmDashboard");
				navManager.updateForm(data);
			} else {
            navManager.updateForm(data);
			}
        }
    };

    /*Method to navigate to Custom View form for editing */
    PresentationController.prototype.navigateToEditCustomview = function(data) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmCustomViews");
        var dataResponse = {
            customView: data
        };
        navManager.updateForm(dataResponse);
    };

    /*Method to navigate to Custom View form for creating */
    PresentationController.prototype.navigateToCreateCustomview = function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmCustomViews");
        var dataResponse = {
            type: "Create"
        };
        navManager.updateForm({
            customView: dataResponse
        });
    };

    /**
     * Method that updates the existing custom view 
     * @param {JSON} request payload with name, id and accountIds for the custom view
     */
    PresentationController.prototype.updateCustomViews = function(param) {
        this.accountIdsEdit = param.accountIds;
        this.currentCustomView = param.name;
        applicationManager.getAccountManager().updateCustomViews(param, this.onSuccessUpdateCustomViews.bind(this), this.showOnServerError.bind(this));
    };

    /**
     * Method called as success callback for updateCustomViews
     * @param {Object} response - response from service for updateCustomViews
     */
    PresentationController.prototype.onSuccessUpdateCustomViews = function(response) {
        var accounts = [];
        accounts = this.accountIdsEdit.split(',');
        var result = [];
        for (j = 0; j < accounts.length; j++) {
            for (i = 0; i < this.accounts.length; i++) {
                if (accounts[j] === this.accounts[i].Account_id) {
                    result.push(this.accounts[i]);
                    continue;
                }
            }
        }
        result.customView = response;
        result.customViewType = "Edit";
        var data = {
            accountsSummary: result
        };
        this.navigateToCustomviewDashboard(data);
    };

    /**
     * Method that deletes custom view by passing the custom view id 
     * @param {JSON} request payload for delete custom view
     */
    PresentationController.prototype.deleteCustomViews = function(param) {
        applicationManager.getAccountManager().deleteCustomViews(param, this.onSuccessDeleteCustomViews.bind(this), this.showOnServerError.bind(this));
    };

    /**
     * Method called as success callback for deleteCustomViews
     * @param {Object} response - response from service for deleteCustomViews
     */
    PresentationController.prototype.onSuccessDeleteCustomViews = function(response) {
        var data = {
            accountsSummary: this.accounts,
            isDelete: true,
            deletedId: response.id
        };
        this.navigateToCustomviewDashboard(data);
    };

    /**
     * Method to fetch Product finance Management(PFM) data
     */
    PresentationController.prototype.fetchPFMData = function() {
        if (applicationManager.getConfigurationManager().getConfigurationValue("isPFMWidgetEnabled") !== "true") {
            applicationManager.getNavigationManager().updateForm({
                PFMDisabled: true
            }, frmName);
        } else {
            var date = new Date();
            var criteria;
            criteria = kony.mvc.Expression.and(criteria, kony.mvc.Expression.eq("monthId", date.getMonth() + 1), kony.mvc.Expression.eq("year", date.getFullYear()));
			applicationManager.getAccountManager().getMonthlySpending(criteria, this.fetchPFMSuccess.bind(this), this.fetchPFMFailure.bind(this));
        }
    };
    /**
     * Method that called on successful fetching of PFM data
     * @param {Object} PFMData PFMData object
     */
    PresentationController.prototype.fetchPFMSuccess = function(PFMData) {
        applicationManager.getNavigationManager().updateForm({
            PFMMonthlyWidget: PFMData
        });
    };
    /**
     * Method that gets called when there is an error in fetching PFMData for account dashboard
     * @param {Object} error Error Object
     */
    PresentationController.prototype.fetchPFMFailure = function(error) {
        applicationManager.getNavigationManager().updateForm({
            PFMMonthlyWidget: [],
            serviceError: true
        });
    };

    PresentationController.prototype.deleteExternalAccount = function(accountObject) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true
            }
        }, frmName);
        applicationManager.getAccountManager().deleteExternalAccount(accountObject, this.showAccountsDashboard.bind(this), this.deleteExternalAccountFailure.bind(this));
    };
    PresentationController.prototype.deleteExternalAccountFailure = function() {
        applicationManager.getNavigationManager().updateForm({
            serviceError: true,
            showLoadingIndicator: {
                status: false
            }
        });
    };
    PresentationController.prototype.fetchExternalBankAccounts = function(bankObj) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true
            }
        }, frmName);
        var bankCredentials = {
            mainUser: bankObj.mainUser,
            userName: bankObj.userName,
            bankId: bankObj.bankId
        };
        applicationManager.getAccountManager().fetchAccountsFromAnExternalBank(bankCredentials, this.fetchExternalBankAccountsSuccess.bind(this, bankObj), this.fetchExternalBankAccountsFailure.bind(this));
    };
    PresentationController.prototype.fetchExternalBankAccountsSuccess = function(bankObj, response) {
        var self = this;
        var externalAccount = [];
        if (response.length > 0) {
            externalAccount = self.processOtherBankAccountsData(response, bankObj.userName);
        }
        applicationManager.getNavigationManager().updateForm({
            externalBankAccountsModel: externalAccount
        });
    };
    PresentationController.prototype.fetchExternalBankAccountsFailure = function() {
        applicationManager.getNavigationManager().updateForm({
            serviceError: true,
            showLoadingIndicator: {
                status: false
            }
        });
    };
    PresentationController.prototype.processOtherBankAccountsData = function(data, userName) {
        var secData = [];
        var scopeObject = this;
        for (var i = 0; i < data.length; i++) {
            secData[i] = {};
            secData[i].AccountName = data[i].AccountName;
            //secData[i].checkImage= "checkboxtick.png";
            secData[i].AccountType = data[i].TypeDescription;
            secData[i].AvailableBalanceLabel = kony.i18n.getLocalizedString("i18n.accountDetail.availableBalance");
            var availableBalance = parseFloat(data[i].AvailableBalance).toFixed(2);
            secData[i].AvailableBalanceWithCurrency = CommonUtilities.formatCurrencyWithCommas(availableBalance, false, data[i].CurrencyCode);
            secData[i].AvailableBalance = availableBalance;
            secData[i].CurrencyCode = data[i].CurrencyCode;
            secData[i].Number = data[i].Number;
            secData[i].bank_id = data[i].Bank_id;
            secData[i].Type_id = data[i].Type_id;
            secData[i].AccountHolder = data[i].AccountHolder;
            secData[i].UserName = userName;
        }
        return secData;
    };
    PresentationController.prototype.prepareInputConfigForSavingEXternalBankAccounts = function(selectedData) {
        var accData = {};
        accData.AccountName = "";
        accData.main_user = "";
        accData.bank_id = "";
        accData.username = "";
        accData.CurrencyCode = "";
        accData.AvailableBalance = "";
        accData.Number = "";
        accData.Type_id = "";
        accData.AccountHolder = "";
        var mainUser = applicationManager.getUserPreferencesManager().getCurrentUserName();
        for (var i in selectedData) {
            accData.AccountName = accData.AccountName + selectedData[i].AccountName.text + ",";
            accData.main_user = accData.main_user + mainUser + ",";
            accData.bank_id = accData.bank_id + selectedData[i].BankId + ",";
            accData.CurrencyCode = accData.CurrencyCode + selectedData[i].CurrencyCode + ",";
            accData.AvailableBalance = accData.AvailableBalance + selectedData[i].AvailableBalance + ",";
            accData.Number = accData.Number + selectedData[i].AccountNumber + ",";
            accData.Type_id = accData.Type_id + selectedData[i].TypeId + ",";
            accData.AccountHolder = accData.AccountHolder + selectedData[i].AccountHolder + ",";
            accData.username = accData.username + selectedData[i].UserName + ",";
        }
        accData.loop_count = (++i).toString();
        accData.AccountName = accData.AccountName.slice(0, -1);
        accData.main_user = accData.main_user.slice(0, -1);
        accData.bank_id = accData.bank_id.slice(0, -1);
        accData.username = accData.username.slice(0, -1);
        accData.CurrencyCode = accData.CurrencyCode.slice(0, -1);
        accData.AvailableBalance = accData.AvailableBalance.slice(0, -1);
        accData.Number = accData.Number.slice(0, -1);
        accData.Type_id = accData.Type_id.slice(0, -1);
        accData.AccountHolder = accData.AccountHolder.slice(0, -1);
        return accData;
    };
    PresentationController.prototype.addExternalBankAccounts = function(selectedData) {
        applicationMfanager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true
            }
        }, frmName);
        var bankParameters = this.prepareInputConfigForSavingEXternalBankAccounts(selectedData);
        applicationManager.getAccountManager().addExternalAccounts(bankParameters, this.addExternalBankAccountsSuccess.bind(this), this.addExternalBankAccountsFailure.bind(this));
    };
    PresentationController.prototype.addExternalBankAccountsSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            savedExteranlAccountsModel: response
        });
    };
    PresentationController.prototype.addExternalBankAccountsFailure = function() {
        applicationManager.getNavigationManager().updateForm({
            serviceError: true
        });
    };
    PresentationController.prototype.authenticateUserInExternalBank = function(username, password, identityProvider) {
        var scopeObj = this;
        var asyncManager = applicationManager.getAsyncManager();
      if(applicationManager.getConfigurationManager().isMicroAppPresent("AuthenticationMA") && applicationManager.getConfigurationManager().isMicroAppPresent("TNCMA")){
          asyncManager.callAsync(
              [
                  asyncManager.asyncItem(applicationManager.getAuthManager(), 'loginExternalBank', [{
                      "username": username,
                      "password": password,
                      "identityProvider": identityProvider
                  }]),
                  asyncManager.asyncItem(applicationManager.getTermsAndConditionManager(), 'fetchTermsAndConditionsPostLogin', [{
                      "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
                      "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.AccountAggregation_TnC
                  }])
              ],
              scopeObj.onPostLoginServicesComplete.bind(scopeObj)
          );
        }
    };
    PresentationController.prototype.onPostLoginServicesComplete = function(syncResponseObject) {
        var scopeObj = this;
        if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
            scopeObj.authenticateUserInExternalBankSuccess(syncResponseObject.responses[0].data);
            scopeObj.getTnCOnSuccess(syncResponseObject.responses[1].data);
        } else {
            if (syncResponseObject.responses[0].data && syncResponseObject.responses[0].data.errorMessage) {
                scopeObj.authenticateUserInExternalBankFailure(syncResponseObject.responses[0].data);
            } else {
                scopeObj.showOnServerError();
            }
        }
    };
    PresentationController.prototype.authenticateUserInExternalBankSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "externalBankLogin": response
        });
    };
    PresentationController.prototype.authenticateUserInExternalBankFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "externalBankLoginFailure": response
        });
    };
    PresentationController.prototype.getTnCOnSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "TnCresponse": response
        });
    };
    /**
     * Method to navigate to open New Account(NAO)
     */
    PresentationController.prototype.navigateToNewAccountOpening = function() {
        var nuoModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("NAOModule");
        nuoModule.presentationController.showNewAccountOpening();
    };
    /**
     * Method to navigate and show contact us
     */
    PresentationController.prototype.showContactUs = function() {
        var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InformationContentModule");
        InformationContentModule.presentationController.showContactUsPage();
    };
    /**
     *Method to Navigate to Messages Module and loads the new Message screen
     */
    PresentationController.prototype.newMessage = function() {
        var alertsMsgsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsMsgsUIModule");
        alertsMsgsModule.presentationController.showAlertsPage("AccountsLanding", {
            show: "CreateNewMessage"
        });
    };
    /**
     * Method to Navigate to Messages Module and show selected message
     * @param {JSON} message selected essage object
     */
    PresentationController.prototype.showSelectedMessage = function(message) {
        var alertsMsgsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsMsgsUIModule");
        alertsMsgsModule.presentationController.showAlertsPage("AccountsLanding", {
            show: "ShowSelectedMessage",
            selectedRequestId: message.id
        });
    };
    /**
     * Method to navigate/show frmAccountsDetails
     */
    PresentationController.prototype.presentAccountDetails = function() {
        applicationManager.getNavigationManager().navigateTo(frmAccountsDetails, false, currentAccount);
    };
    /**
     * Method to navigate/show frmScheduledTransaction
     */
    PresentationController.prototype.presentScheduledTransaction = function() {
        applicationManager.getNavigationManager().navigateTo("frmScheduledTransactions");
    };
    /**
     * Method to navigate/show frmAccountsLanding
     */
    PresentationController.prototype.presentAccountsLanding = function() {
        applicationManager.getNavigationManager().navigateTo(frmName);
    };
    /**
     * Entry Point for Account Details, this method load Account detail components
     * @param {JSON} account account json for which yout want to get details
     */
    PresentationController.prototype.showAccountDetails = function(account) {
        if (account) {
            currentAccount = account;
        }
        if (applicationManager.getConfigurationManager().getConfigurationValue('isAccountDetailsServiceConfigured') == "false") {
            this.showSelectedAccountTransaction(currentAccount);
            applicationManager.getNavigationManager().navigateTo(frmAccountsDetails, false, account);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true
                }
            }, frmAccountsDetails);
            this.getAccountDeatilsAllAccounts();
            this.updateAccountDetails(currentAccount);
        } else {
            var isAccountDetailsServiceCallRequired = true;
            this.showSelectedAccountTransaction(currentAccount, null, null, isAccountDetailsServiceCallRequired);
            applicationManager.getNavigationManager().navigateTo(frmAccountsDetails, false, account);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true
                }
            }, frmAccountsDetails);
            this.getAccountDeatilsAllAccounts();
        }
    };
    /**
     * Method to get all internal accounts for account details page
     */
    PresentationController.prototype.getAccountDeatilsAllAccounts = function() {
        var internalAccounts = applicationManager.getAccountManager().getInternalAccounts();
        if (internalAccounts) {
            applicationManager.getNavigationManager().updateForm({
                accountList: internalAccounts
            }, frmAccountsDetails);
        } else {
            this.showOnServerError();
        }
    };
    /**
     * Method to get transactions for specific selected account
     * @param {JSON} account Account for which you want transactions
     * @param {JSON} dataInputs dataInputs for getting specific type of data or for resetting sorting
     * @param {String} navigationMode Navigation Mode
     */
    PresentationController.prototype.showSelectedAccountTransaction = function(account, dataInputs, navigationMode, isParallelCall) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true
            }
        }, frmAccountsDetails);
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
        if (isParallelCall) {
            var asyncManager = applicationManager.getAsyncManager();
          if(applicationManager.getConfigurationManager().isMicroAppPresent("TransactionMA")){
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
    PresentationController.prototype.onPostGetAccountDetailsComplete = function(dataInputs, syncResponseObject) {
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
     * Method to show account details page error
     */
    PresentationController.prototype.showAccountDetailsError = function() {
        applicationManager.getNavigationManager().updateForm({
            showOnServerError: true,
            showLoadingIndicator: {
                status: false
            }
        }, frmAccountsDetails);
    };
    /**
     * Method gets invoked once fetching of transactions is successful
     * @param {Object} dataInputs Object containing sortConfig, transactType i.e 'All','Transfer' etc and current account
     * @param {Collection} transactions List of fetched transactions
     */
    PresentationController.prototype.fetchTrasactionsSuccess = function(dataInputs, transactions) {
        var uiDataObj = {};
        var paginationManager = applicationManager.getPaginationManager();
        if (transactions.length === 0 && dataInputs.sortConfig.offset !== 0) {
            applicationManager.getNavigationManager().updateForm({
                noMoreRecords: true
            }, frmAccountsDetails);
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
        }, frmAccountsDetails);
    };
    /**
     * Method to fetch next transactions on click of pagination next button
     * @param {JSON} account account for which we want to fetch transactions
     * @param {Object} dataInputs Object containing sortConfig, transactType i.e 'All','Transfer' etc and current account
     */
    PresentationController.prototype.fetchNextTransactions = function(account, dataInputs) {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getNextPage();
        this.showSelectedAccountTransaction(account, dataInputs, "nextTransaction");
    };
    /**
     * Method to fetch previous transactions on click of pagination previous button
     * @param {JSON} account account for which we want to fetch transactions
     * @param {Object} dataInputs Object containing sortConfig, transactType i.e 'All','Transfer' etc and current account
     */
    PresentationController.prototype.fetchPreviousTransactions = function(account, dataInputs) {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getPreviousPage();
        this.showSelectedAccountTransaction(account, dataInputs, "previousTransaction");
    };
    /**
     * Method to fetch transactions based on serch keywords
     * @param {Object} searchParams Search Parameters
     */
    PresentationController.prototype.fetchTransactionsBySearch = function(searchParams) {
        var startDate = searchParams.dateRange.startDate;
        var endDate = searchParams.dateRange.endDate;
        var commandObj = {
            searchTransactionType: searchParams.transactionTypeSelected,
            searchDescription: searchParams.keyword,
            searchMinAmount: searchParams.fromAmount,
            searchMaxAmount: searchParams.toAmount,
            searchStartDate: startDate,
            searchEndDate: endDate,
            isScheduled: 0, //as per the reqirement from backend explicitly sending this value
            fromCheckNumber: searchParams.fromCheckNumber,
            toCheckNumber: searchParams.toCheckNumber,
            accountNumber: currentAccount.accountID
        };
        this.searchParams = commandObj;
        var criteria = kony.mvc.Expression.and(kony.mvc.Expression.eq("searchTransactionType", commandObj.searchTransactionType), kony.mvc.Expression.eq("searchDescription", commandObj.searchDescription), kony.mvc.Expression.eq("searchMinAmount", commandObj.searchMinAmount), kony.mvc.Expression.eq("searchMaxAmount", commandObj.searchMaxAmount), kony.mvc.Expression.eq("searchStartDate", commandObj.searchStartDate), kony.mvc.Expression.eq("searchEndDate", commandObj.searchEndDate), kony.mvc.Expression.eq("fromCheckNumber", commandObj.fromCheckNumber), kony.mvc.Expression.eq("toCheckNumber", commandObj.toCheckNumber), kony.mvc.Expression.eq("accountNumber", commandObj.accountNumber), kony.mvc.Expression.eq("isScheduled", commandObj.isScheduled), kony.mvc.Expression.eq("searchType", "Search"));
        applicationManager.getTransactionManager().fetchTransactionsByCriteria(criteria, this.fetchTransactionsBySearchSuccess.bind(this), this.showAccountDetailsError.bind(this));
    };
    /**
     * Methods gets called once when the fetching of transaction by search is successful
     * @param {Collection} transactions List of transactions
     */
    PresentationController.prototype.fetchTransactionsBySearchSuccess = function(transactions) {
        applicationManager.getNavigationManager().updateForm({
            searchTransactions: {
                transactions: transactions,
                dataInputs: {
                    account: currentAccount
                }
            }
        }, frmAccountsDetails);
    };
    /**
     * Method to present frmAccount details with specific account details
     * @param {JSON} account Account whose details needs to be displayed
     */
    PresentationController.prototype.updateAccountDetails = function(account) {
        applicationManager.getNavigationManager().updateForm({
            accountDetails: account
        }, frmAccountsDetails);
    };
    /**
     * Method to show account details by updating account info
     * @param {Number} accountID Account Id of the account
     */
    PresentationController.prototype.showAgainAccountsDetails = function(accountID) {
        /*applicationManager.getNavigationManager().navigateTo(frmAccountsDetails);
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true
            }
        }, frmAccountsDetails);*/
        applicationManager.getAccountManager().fetchInternalAccounts(this.fetchAccountsDetailsSuccess.bind(this, accountID), this.showOnServerError.bind(this));
    };
    /**
     * Method gets called if fetching of internal accounts is success for account details
     * @param {Number} accountID AccountID of the account
     * @param {Collection} accounts Array of accounts JSON
     */
    PresentationController.prototype.fetchAccountsDetailsSuccess = function(accountID, accounts) {
        var account;
        for (var i in accounts) {
            if (accounts[i].accountID === accountID) {
                account = accounts[i];
                break;
            }
        }
        this.showAccountDetails(account);
    };
    /**
     * Entry point method to show scheduled transactions forms and load all its dependencies
     * @param {JSON} account Account whose transactions needs to be fetched
     */
    PresentationController.prototype.showScheduledTransactionsForm = function(account) {
        if (account) {
            currentAccount = account;
        }
        applicationManager.getNavigationManager().navigateTo("frmScheduledTransactions", {
            showLoadingIndicator: {
                status: true
            }
        });
        this.showScheduledTransactionAccountInfo(currentAccount);
        applicationManager.getPaginationManager().resetValues();
        this.fetchScheduledFormTransactions(currentAccount, {
            resetSorting: true
        });
        this.loadScheduledTransctionsAllAccounts();
    };
    /**
     * Method toshow account info on frmScheduledTransaction form
     * @param {JSON} account Account whose details needs to be displayed
     */
    PresentationController.prototype.showScheduledTransactionAccountInfo = function(account) {
        if (account) {
            currentAccount = account;
        }
        applicationManager.getNavigationManager().updateForm({
            accountInfo: currentAccount
        }, "frmScheduledTransactions");
    };
    /**
     * Method to fetch scheduled transaction for selected account for frmScheduledTransaction
     * @param {JSON} account Account whose information needs to be fetched
     * @param {JSON} dataInputs Input for sorting like sortBy:Asc/Desc etc.
     */
    PresentationController.prototype.fetchScheduledFormTransactions = function(account, dataInputs) {
        var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true
            }
        }, "frmScheduledTransactions");
        if (account) {
            currentAccount = account;
        }
        var paginationManager = applicationManager.getPaginationManager();
        var sortingConfig = this.scheduleTransactonsConfig["All"];
        var sortParams = paginationManager.getValues(sortingConfig, dataInputs);
        var commandObj = {
            accountID: currentAccount.accountID,
            transactionType: OLBConstants.ALL,
            limit: sortParams.limit,
            paginationRowLimit: paginationManager.paginationRowLimit,
            offset: sortParams.offset,
            isScheduled: "true", //true to get scheduled transactions
            sortBy: sortParams.sortBy,
            order: sortParams.order
        };
      if(applicationManager.getConfigurationManager().isMicroAppPresent("TransactionMA")){
        applicationManager.getTransactionManager().fetchAccountTransactionByType(commandObj, this.fetchScheduledFormTransactionsSuccess.bind(this, sortParams), this.scheduledFormError.bind(this));
      }
    };
    /**
     * Method that gets invoked once fetching of scheduled transaction for frmScheduledTransaction for is successful
     * @param {JSON} sortConfig Sorting configurations for scheduled transactions
     * @param {Collection} transactions List of transactions
     */
    PresentationController.prototype.fetchScheduledFormTransactionsSuccess = function(sortConfig, transactions) {
        if (sortConfig.offset > 0 && transactions.length === 0) {
            applicationManager.getNavigationManager().updateForm({
                noMoreRecords: true
            }, "frmScheduledTransactions");
            return;
        }
        var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
        var uiData = {};
        uiData.showingType = OLBConstants.ALL;
        uiData.account = currentAccount;
        applicationManager.getPaginationManager().updatePaginationValues();
        uiData.pagination = sortConfig;
        uiData.scheduledTransactions = transactions;
        uiData.pagination.limit = transactions.length;
        applicationManager.getNavigationManager().updateForm({
            transactionDetails: uiData
        }, "frmScheduledTransactions");
    };
    /**
     * Methods gets called if any of the services for scheduled form fails
     */
    PresentationController.prototype.scheduledFormError = function() {
        applicationManager.getNavigationManager().updateForm({
            serverError: true,
            showLoadingIndicator: {
                status: false
            }
        }, "frmScheduledTransactions");
    };
    /**
     * Method to fetch next scheduled transactions on click of pagination next button
     * @param {JSON} account account for which we want to fetch transactions
     */
    PresentationController.prototype.fetchNextScheduledTransactions = function(account) {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getNextPage();
        this.fetchScheduledFormTransactions(account);
    };
    /**
     * Method to fetch previous scheduled transactions on click of pagination previous button
     * @param {JSON} account account for which we want to fetch transactions
     */
    PresentationController.prototype.fetchPreviousScheduledTransactions = function(account) {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getPreviousPage();
        this.fetchScheduledFormTransactions(account);
    };
    /**
     * Method to fetch all internal and external cached accounts based on aggregated account flag for external accounts
     * @returns {Collection} List of accounts
     */
    PresentationController.prototype.getAllAccounts = function() {
        var finalAccounts = [],
            self = this;
        var internalAccounts = applicationManager.getAccountManager().getInternalAccounts();
        if (internalAccounts.length > 0) {
            internalAccounts.forEach(function(account) {
                finalAccounts.push(account);
            });
        }
        /** External Account service call removed
                if (applicationManager.getConfigurationManager().checkUserPermission("MANAGE_EXTERNAL_ACCOUNT")) {
                    var externalAccount = applicationManager.getAccountManager().getExternalAccounts();
                    if (externalAccount.length > 0) {
                        externalAccount.forEach(function(account) {
                            finalAccounts.push(self.processExternalAccountsData(account));
                        });
                    }
                }
        */
        return finalAccounts;
    };
    /**
     * Method to load all the eligible accounts for scheduled transaction Form
     */
    PresentationController.prototype.loadScheduledTransctionsAllAccounts = function() {
        var finalAccounts = this.getAllAccounts();
        applicationManager.getNavigationManager().updateForm({
            accountList: finalAccounts
        }, "frmScheduledTransactions");
    };
    /**
     * Method to get E-StateMents for all internal accounts
     * @param {JSON} account Selected account for which you want estatement
     */
    PresentationController.prototype.showFormatEstatements = function(account,showCombinedStatements) {
        applicationManager.getNavigationManager().navigateTo(frmAccountsDetails);
        var navManager = applicationManager.getNavigationManager();
        navManager.updateForm({
            showLoadingIndicator: {
                status: true
            }
        });
        var internalAccounts = applicationManager.getAccountManager().getInternalAccounts();
        var uiData = {
            estatement: {
                account: account,
                allAccounts: internalAccounts
            }
        };
        if(showCombinedStatements){
            uiData.showCombinedStatements=true;
        }
        navManager.updateForm(uiData, frmAccountsDetails);
    };
    /**
     * Method to download e-state ment for selected account
     * @param {Number} accountID Account Id for which you want e-statement
     * @param {Number} year Year for which you want e-statement
     * @param {Number} month Month for which you want e-statement
     * @param {String} format Format in which you want e-statement
     */
    PresentationController.prototype.showDownloadStatementScreen = function(accountID, year, month, format) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true
            }
        });
        var context = {
            accountID: accountID,
            year: year,
            format: format,
            StatementMonth: month
        };
        applicationManager.getAccountManager().fetchAccountStatments(context, this.showDownloadStatementScreenSuccess.bind(this), this.showDownloadStatementScreenFailure.bind(this));
    };
    /**
     * Method that gets called once fetching e-statement link is successful
     * @param {Object} downloadURL Object containg details of e-statement download link
     */
    PresentationController.prototype.showDownloadStatementScreenSuccess = function(downloadURL) {
        applicationManager.getNavigationManager().updateForm({
            showDownloadStatement: downloadURL[0].StatementLink
        }, frmAccountsDetails);
    };
    /**
     * Method that gets called in case downloading e-statement link fails
     */
    PresentationController.prototype.showDownloadStatementScreenFailure = function() {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false
            }
        });
    };
    /**
     * Method to show print page with required data
     * @param {Object} uiData Objects required for printing transaction
     */
    PresentationController.prototype.showTransferPrintPage = function(uiData) {
        applicationManager.getNavigationManager().navigateTo("frmPrintTransfer", {
            context: null
        });
        applicationManager.getNavigationManager().updateForm(uiData, "frmPrintTransfer");
    };
    /**
     * Method to repeat any Transfer  transaction
     * @param {JSON} transaction transaction details for repeating the transaction
     * @param {function} onCancel - callback method if transaction cancel.
     */
    PresentationController.prototype.repeatTransfer = function(transaction, onCancel) {
        var context = {};
        context.transactionObject = transaction;
        context.onCancelCreateTransfer = onCancel;
      	if(applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")){
        	applicationManager.getModulesPresentationController("TransferModule").showTransferScreen(context);
        }
    };
    /**
     * Method to modify any Transfer  transaction
     * @param {JSON} transaction transaction details for repeating the transaction
     * @param {function} onCancel - callback method if transaction cancel.
     */
    PresentationController.prototype.modifyTransfer = function(transaction, onCancel) {
        var context = {};
        context.editTransactionObject = transaction;
        context.onCancelCreateTransfer = onCancel;
        if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") {
            applicationManager.getModulesPresentationController("TransferFastModule").showTransferScreen(context);
        } else {
            applicationManager.getModulesPresentationController("TransferModule").showTransferScreen(context);
        }
    };
    /**
     * Method to repeat any BillPay  transaction
     * @param {JSON} transaction transaction details for repeating the transaction
     * @param {function} onCancel - callback method if transaction cancel.
     */
    PresentationController.prototype.repeatBillPay = function(transaction, onCancel) {
        var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
        transaction.onCancel = onCancel;
        billPayModule.presentationController.showBillPayData("Accounts", "PayABill", true, transaction);
    };
    /**
     * Method to repeat any P2P  transaction
     * @param {JSON} transaction transaction details for repeating the transaction
     * @param {function} onCancel - callback method if transaction cancel.
     */
    PresentationController.prototype.repeatP2P = function(transaction, onCancel) {
        var p2pModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
        transaction.show = "SendMoney";
        transaction.amount = CommonUtilities.formatCurrencyWithCommas(String(Math.abs(transaction.amount)), true);
        transaction.onCancel = onCancel;
        if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") {
            applicationManager.getModulesPresentationController("TransferFastModule").showTransferScreen({
                transactionObject: transaction,
                onCancelCreateTransfer: onCancel
            });
        } else {
            p2pModule.presentationController.showPayAPerson("repeatTransaction", transaction);
        }
    };
    PresentationController.prototype.repeatWireTransfer = function(transaction, onCancel) {
        var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('WireTransferModule');
        wireTransferModule.presentationController.showWireTransfer({
            transactionObject: transaction,
            onCancel: onCancel
        });
    };
    /**
     * Method to modify  a load transaction
     * @param {Number} toAccountID AccountId to which you want to pay loan
     * @param {Number} onCancel Method to trigger on cancel
     */
    PresentationController.prototype.modifyLoan = function(toAccountID, onCancel) {
        var toAccount = {};
        var fromAccount = currentAccount;
        var internalAccount = applicationManager.getAccountManager().getInternalAccounts();
        for (var i = 0; i < internalAccount.length; i++) {
            if (internalAccount[i].accountID === toAccountID) {
                fromAccount = internalAccount[i];
                break;
            }
        }
        toAccount.currentAmountDue = CommonUtilities.formatCurrencyWithCommas(toAccount.currentAmountDue, false, toAccount.currencyCode);
        toAccount.currentAmountDue = toAccount.currentAmountDue.slice(1);
        var data = {
            accounts: toAccount,
            fromAccount: fromAccount,
            onCancel: onCancel
        };
        var loanModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoanPayModule");
        loanModule.presentationController.navigateToLoanDue(data);
    };
    /**
     * Method to cancel any scheduled transaction
     * @param {JSON} transaction transaction that you want to cancel
     */
    PresentationController.prototype.cancelScheduledTransaction = function(transaction) {
        if(applicationManager.getConfigurationManager().isMicroAppPresent("TransactionMA")){
          applicationManager.getTransactionManager().deleteTransaction({
              transactionId: transaction.transactionId,
              transactionType: transaction.transactionType,
              frequencyType: kony.sdk.isNullOrUndefined(transaction.frequencyType) ? "" : transaction.frequencyType
          }, this.showScheduledTransactionsForm.bind(this, currentAccount), this.scheduledFormError.bind(this));
      }
    };
    /**
     * Method to cancel any scheduled transactions occurances
     * @param {JSON} transaction transaction that you want to cancel occurance
     */
    PresentationController.prototype.cancelScheduledTransactionOccurrence = function(transaction) {
        if(applicationManager.getConfigurationManager().isMicroAppPresent("TransactionMA")){
          applicationManager.getTransactionManager().deleteRecurrenceTransaction({
              transactionId: transaction.transactionId
          }, this.showScheduledTransactionsForm.bind(this, currentAccount), this.scheduledFormError.bind(this));
      }
    };
    /**
     * Method to cancel any scheduled transaction series
     * @param {JSON} transaction transaction that you want to cancel
     */
    PresentationController.prototype.cancelScheduledTransactionSeries = function(transaction) {
      if(applicationManager.getConfigurationManager().isMicroAppPresent("TransactionMA")){
          applicationManager.getTransactionManager().deleteTransaction({
              transactionId: transaction.transactionId,
              transactionType: transaction.transactionType,
              frequencyType: kony.sdk.isNullOrUndefined(transaction.frequencyType) ? "" : transaction.frequencyType
          }, this.showScheduledTransactionsForm.bind(this, currentAccount), this.scheduledFormError.bind(this));
      }
    };
    /**
     * Method to dispute any transaction
     * @param {JSON} transaction Transaction that you want to dispute
     */
    PresentationController.prototype.onDisputeTransaction = function(transaction) {
        var self = this;
        var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
        var disputeModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DisputeTransactionModule");
        disputeModule.presentationController.showDisputeTransactionModule({
            show: OLBConstants.ACTION.SHOW_DISPUTE_TRANSACTION_FORM,
            data: {
                disputeTransactionObject: transaction,
                onCancel: function() {
                    self.presentAccountDetails();
                }
            }
        });
    };
    /**
     * Method to navigate Print Transactions form and upadate active form.
     * @param {object} data  view model for Print form
     */
    PresentationController.prototype.showPrintPage = function(data) {
        data.accountDetailsModel = currentAccount;
        applicationManager.getNavigationManager().navigateTo('frmPrintTransaction');
        applicationManager.getNavigationManager().updateForm({
            printData: data
        }, 'frmPrintTransaction');
    };
    /**
     * Method to view all disputed transactions request
     */
    PresentationController.prototype.onViewDisputedRequets = function() {
        var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
        var disputeModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DisputeTransactionModule");
        disputeModule.presentationController.showDisputeTransactionModule({
            show: OLBConstants.ACTION.SHOW_DISPUTE_LIST
        });
    };
  
    PresentationController.prototype.downloadTransactionFile = function(param) {
      var requestParam = {};
      if (param.isSearchParam) {
        requestParam = param.searchParams;
      } else {
        requestParam.accountNumber = currentAccount.accountID;
        requestParam.accountName = currentAccount.accountName;
        requestParam.searchTransactionType = param.transactionType;
        requestParam.searchStartDate = param.fromDate;
        requestParam.searchEndDate = param.toDate;
      }
      requestParam.transactionId = param.transactionId;

      requestParam.installmentType = param.installmentType;
      var configurationManager = applicationManager.getConfigurationManager();
      var dateFormat = configurationManager.getDateFormat();
      if (dateFormat) {
        requestParam.dateFormat = dateFormat;
      }
      requestParam.fileType = param.format;
      if (param.transactionType === "LoanSchedule") {
        requestParam.title = kony.i18n.getLocalizedString("i18n.AccountsDetails.loanSchedule");
      } else {
        requestParam.title = kony.i18n.getLocalizedString("i18n.common.transactions");
      }
      requestParam.generatedBy = applicationManager.getUserPreferencesManager().getUserObj().userName;
      this.transactionDetails = requestParam;
      applicationManager.getAccountManager().generateTransactionDetails(requestParam, this.generateTransactionDetailsSuccess.bind(this), this.generateTransactionDetailsFailure.bind(this));
    };

    PresentationController.prototype.generateTransactionDetailsSuccess = function(successResponse) {
      successResponse.fileType = this.transactionDetails.fileType;
      applicationManager.getNavigationManager().updateForm({
        transactionDownloadFile: applicationManager.getAccountManager().getDownloadTransctionURL(successResponse)
      }, frmAccountsDetails);
    };

    PresentationController.prototype.generateTransactionDetailsFailure = function(error) {
      applicationManager.getNavigationManager().updateForm({
            showOnServerError: true,
            showLoadingIndicator: {
                status: false
            }
        }, frmAccountsDetails);
    };
  
  
    PresentationController.prototype.externalDownload = function(param) {
        applicationManager.getNavigationManager().updateForm({
            transactionDownloadFile: applicationManager.getAccountManager().getChequeDownloadURL(param)
        }, frmAccountsDetails);
    };
    PresentationController.prototype.downloadImage = function(param) {
        var response = applicationManager.getAccountManager().getChequeDownloadURL(param);
        if (param.page === "0") {
            if (param.transactionType === "Cheque") {
                applicationManager.getNavigationManager().updateForm({
                    frontDownload: response
                }, 'frmAccountsDetails');
            } else {
                applicationManager.getNavigationManager().updateForm({
                    draftDownload: response
                }, 'frmAccountsDetails');
            }
        }
        if (param.page === "1") {
            applicationManager.getNavigationManager().updateForm({
                backDownload: response
            }, 'frmAccountsDetails');
        }
    };
    PresentationController.prototype.viewImage = function(param) {
        applicationManager.getAccountManager().getBaseImage(param, this.successImageDetails.bind(this, param), this.failImageDetails.bind(this, param));
    };
    PresentationController.prototype.successImageDetails = function(param, response) {
        if (param.page === "0") {
            if (param.transactionType === "Cheque") {
                applicationManager.getNavigationManager().updateForm({
                    frontImage: response.base64
                }, 'frmAccountsDetails');
            } else {
                applicationManager.getNavigationManager().updateForm({
                    draftImage: response.base64
                }, 'frmAccountsDetails');
            }
        }
        if (param.page === "1") {
            applicationManager.getNavigationManager().updateForm({
                backImage: response.base64
            }, 'frmAccountsDetails');
        }
    };
    PresentationController.prototype.failImageDetails = function(param, response) {
        if (param.page === "0") {
            if (param.transactionType === "Cheque") {
                applicationManager.getNavigationManager().updateForm({
                    frontImage: response.errorMessage
                }, 'frmAccountsDetails');
            } else {
                applicationManager.getNavigationManager().updateForm({
                    draftImage: response.errorMessage
                }, 'frmAccountsDetails');
            }
        }
        if (param.page === "1") {
            applicationManager.getNavigationManager().updateForm({
                backImage: response.errorMessage
            }, 'frmAccountsDetails');
        }
    };
    /**
     * Method that fetches account by accountID and navigates to account details page
     * @param {String} accountID account id for which yout want to get details
     */
    PresentationController.prototype.fetchUpdatedAccountDetails = function(accountID) {
        var self = this;
        var param = {
            "accountID": accountID
        };
        applicationManager.getAccountManager().fetchInternalAccountByID(param, this.onSuccessFetchUpdatedAccountDetails.bind(this), this.showOnServerError.bind(this));
    };
    /**
     * Method called as success callback for FetchUpdatedAccountDetails
     * @param {Object} response - response from service for FetchUpdatedAccountDetails
     */
    PresentationController.prototype.onSuccessFetchUpdatedAccountDetails = function(response) {
        this.showAccountDetails(response[0]);
    };
    /**
     * Method called on succes of getAccountDetails
     * @param {Object} accountObject - accountObject
     */
    PresentationController.prototype.getAccountDetailsSuccessCallback = function(accountObject) {
        applicationManager.getNavigationManager().updateForm({
            accountDetails: accountObject
        }, frmAccountsDetails)
    };


    //======================================================================================================================
    //BUSINESS BANKING SPECIFIC METHODS
    //======================================================================================================================

    /**
     * Method to fetch password expiration warning message
     */
    PresentationController.prototype.fetchPasswordExpirationWarning = function(navObject) {
        var scopeObj = this;
        applicationManager.getNavigationManager().updateForm({
            "key": BBConstants.LOADING_INDICATOR,
            "responseData": null
        }, navObject.onSuccess.form);
        applicationManager.getAccountManager().getPasswordExpirationWarningMessage(
            navObject.requestData,
            scopeObj.completeSuccessCall.bind(scopeObj, navObject, "fetchPasswordExpirationWarningSuccess"),
            scopeObj.completeSuccessCall.bind(scopeObj, navObject, "fetchPasswordExpirationWarningFailure")
        );
    };

    /**
      Password expiry warning success call back
      */
    PresentationController.prototype.fetchPasswordExpirationWarningSuccess = function(response, navObject) {
        if (response.passwordlockoutsettings) {
            applicationManager.getNavigationManager().updateForm({
                "key": navObject.onSuccess.context.key,
                "responseData": response
            }, navObject.onSuccess.form);
        } else {

            this.fetchPasswordExpirationWarningFailure(navObject, response);
        }
    };

    /**
    	Password expiry warning failure call back
    */
    PresentationController.prototype.fetchPasswordExpirationWarningFailure = function(response, navObject) {
        applicationManager.getNavigationManager().updateForm({
            "key": navObject.onFailure.context.key,
            "responseData": response
        }, navObject.onFailure.form);
    };

    /**
     * fetchUnreadMessagesOrNotificationsCount :This is the function which is used to get unread notifications count and unread messages count to show the red dot on the Alerts ICON
     *@param{function}  unreadMsgsOrNotificationsCountCompletionCallback method executed once the count of the notifications and the count of the messages is received
     * return {}
     */
    PresentationController.prototype.fetchUnreadMessagesOrNotificationsCount = function(navigationObject) {
        applicationManager.getNavigationManager().updateForm({
            "key": "LOADING_INDICATOR",
            "responseData": null
        }, navigationObject.onSuccess.form);

        var scopeObj = this;
        var asyncManager = applicationManager.getAsyncManager();
      if(applicationManager.getConfigurationManager().isMicroAppPresent("MessagesMA") && applicationManager.getConfigurationManager().isMicroAppPresent("AlertSettingsMA")){
          asyncManager.callAsync(
              [
                  asyncManager.asyncItem(applicationManager.getMessagesManager(), 'fetchNumberOfUnreadMessages'),
                  asyncManager.asyncItem(applicationManager.getAlertsManager(), 'getUnreadNotificationCount')
              ],
              scopeObj.fetchUnreadMessagesOrNotificationsCountCallback.bind(scopeObj, navigationObject)
          );
      }
    };

    /**
     *  Callback method for asyn calls for dashboard items, delegates success and failure callbacks internally
     * @param {Array} navigationObjects- array of navigationObject
     * @param {object} response object for async calls
     */
    PresentationController.prototype.fetchUnreadMessagesOrNotificationsCountCallback = function(navigationObject, asyncResponse) {

        if (asyncResponse.isAllSuccess()) {
            this.completeSuccessCall(navigationObject, "processUnreadMessagesOrNotificationsCount", asyncResponse);
        } else {
            this.logOut(navigationObject);
        }
    };

    /**
     * total count success schenario
     */
    PresentationController.prototype.processUnreadMessagesOrNotificationsCount = function(syncResponseObject) {
        var totalUnreadCount = 0;
        var unreadMessageCount = syncResponseObject.responses[0].data.unreadMessageCount;
        var unreadNotificationsCount = syncResponseObject.responses[1].data[0].unreadNotificationCount;
        totalUnreadCount = Number(unreadMessageCount) + Number(unreadNotificationsCount);
        return totalUnreadCount;
    };

    /**
     * Method that fetches cash position by duration and shows as chart on Landing Page
     * @param {object} navigationObject,data duration for which yout want to get cash positions
     *
     */
    PresentationController.prototype.getCashPosition = function(navigationObject) {
        applicationManager.getNavigationManager().updateForm({
            "key": "LOADING_INDICATOR",
            "responseData": null
        }, navigationObject.onSuccess.form);
        var data = navigationObject.requestData;
        applicationManager.getAccountManager().getCashPositionData(data, this.completeSuccessCall.bind(this, navigationObject, "processCashPosition"), this.completeFailedCall.bind(this, navigationObject, ""));
    };

    /**
     * Method called as success callback for getCashPosition
     * @param {Object} response - response from service for getCashPosition
     */
    PresentationController.prototype.processCashPosition = function(response) {
        var newData = [];
        response.forEach(function(item) {
            var cashObj = {};
            cashObj.label1 = parseInt(item.credit);
            cashObj.label2 = parseInt(item.debit);
            cashObj.label3 = parseInt(item.total_balance);
            cashObj.month = item.span;
            newData.push(cashObj);
        });

        return newData;
    };

    /**
     * This method does business call to get count of approvals and requests to be shown on dashboard
     *@param {object} navigaton object
     */
  PresentationController.prototype.fetchCountsOfApprovalAndRequest = function(navigationObject) {
	if(!kony.sdk.isNullOrUndefined(navigationObject)){  
		applicationManager.getNavigationManager().updateForm({
			"key": "LOADING_INDICATOR",
			"responseData": null
		}, navigationObject.onSuccess.form);
	}
    var params = {"languageCode": kony.i18n.getCurrentLocale().replace("_", "-")};
    if (applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.APPROVALREQUEST)){
    applicationManager.getApprovalsReqManager().fetchCounts(params, this.getAllCountsSuccess.bind(this, navigationObject, ""), this.logOut.bind(this, navigationObject));
    }
  };
 PresentationController.prototype.fetchPendingCountsOfApprovalAndRequest = function(navigationObject) {
	if(!kony.sdk.isNullOrUndefined(navigationObject)){  
		applicationManager.getNavigationManager().updateForm({
			"key": "LOADING_INDICATOR",
			"responseData": null
		}, navigationObject.onSuccess.form);
	}
    var params = {"languageCode": kony.i18n.getCurrentLocale().replace("_", "-")};
    if (applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.APPROVALREQUEST)){
    applicationManager.getApprovalsReqManager().fetchPendingCounts(params, this.getAllCountsSuccess.bind(this, navigationObject, ""), this.logOut.bind(this, navigationObject));
    }
  };

    PresentationController.prototype.getAllCountsSuccess = function(navigationObject, dataProcessor, response) {
        var data = response;
        //var viewController = applicationManager.getPresentationUtility().getController('frmUnifiedDashboard', true);
        var i, k, datagroup = [],
            datafeatureActions = [],
            datafeatureAction;
        var singleApprovalsPendingCounts = 0,
            singleApprovalsHistoryCounts = 0,
            singleRequestsPendingCounts = 0,
            singleRequestsHistoryCounts = 0;
        var bulkApprovalsPendingCounts = 0,
            bulkApprovalsHistoryCounts = 0,
            bulkRequestsPendingCounts = 0,
            bulkRequestsHistoryCounts = 0;
        var otherApprovalsPendingCounts = 0,
            otherApprovalsHistoryCounts = 0,
            otherRequestsPendingCounts = 0,
            otherRequestsHistoryCounts = 0;

        if (data.length === 0) return;
        for (i = 0; i < data.length; i++) {
            datagroup = data[i];
            if (kony.sdk.isNullOrUndefined(datagroup)) continue;
            if (kony.sdk.isNullOrUndefined(datagroup["limitgroupId"])) continue;
            if (datagroup["limitgroupId"] === "SINGLE_PAYMENT") {
                datafeatureActions = datagroup["featureActions"];
                if (kony.sdk.isNullOrUndefined(datafeatureActions)) continue;
                for (k = 0; k < datafeatureActions.length; k++) {
                    datafeatureAction = datafeatureActions[k];
                    if (kony.sdk.isNullOrUndefined(datafeatureAction)) continue;
                    singleApprovalsPendingCounts += parseInt(datafeatureAction["myApprovalsPending"]);
                    singleApprovalsHistoryCounts += parseInt(datafeatureAction["myApprovalsHistory"]);
                    singleRequestsPendingCounts += parseInt(datafeatureAction["myRequestsPending"]);
                    singleRequestsHistoryCounts += parseInt(datafeatureAction["myRequestHistory"]);

                }
            }
            if (datagroup["limitgroupId"] === "BULK_PAYMENT") {
                datafeatureActions = datagroup["featureActions"];
                if (kony.sdk.isNullOrUndefined(datafeatureActions)) continue;
                for (k = 0; k < datafeatureActions.length; k++) {
                    datafeatureAction = datafeatureActions[k];
                    if (kony.sdk.isNullOrUndefined(datafeatureAction)) continue;
                    bulkApprovalsPendingCounts += parseInt(datafeatureAction["myApprovalsPending"]);
                    bulkApprovalsHistoryCounts += parseInt(datafeatureAction["myApprovalsHistory"]);
                    bulkRequestsPendingCounts += parseInt(datafeatureAction["myRequestsPending"]);
                    bulkRequestsHistoryCounts += parseInt(datafeatureAction["myRequestHistory"]);

                }
            }
            if (datagroup["limitgroupId"] === "OTHER") {
                datafeatureActions = datagroup["featureActions"];
                if (kony.sdk.isNullOrUndefined(datafeatureActions)) continue;
                for (k = 0; k < datafeatureActions.length; k++) {
                    datafeatureAction = datafeatureActions[k];
                    if (kony.sdk.isNullOrUndefined(datafeatureAction)) continue;
                    otherApprovalsPendingCounts += parseInt(datafeatureAction["myApprovalsPending"]);
                    otherApprovalsHistoryCounts += parseInt(datafeatureAction["myApprovalsHistory"]);
                    otherRequestsPendingCounts += parseInt(datafeatureAction["myRequestsPending"]);
                    otherRequestsHistoryCounts += parseInt(datafeatureAction["myRequestHistory"]);

                }
            }
            if (datagroup["limitgroupId"] !== "SINGLE_PAYMENT" && datagroup["limitgroupId"] !== "BULK_PAYMENT" && datagroup["limitgroupId"] !== "OTHER") {
                datafeatureActions = datagroup["featureActions"];
                if (kony.sdk.isNullOrUndefined(datafeatureActions)) continue;
                for (k = 0; k < datafeatureActions.length; k++) {
                    datafeatureAction = datafeatureActions[k];
                    if (kony.sdk.isNullOrUndefined(datafeatureAction)) continue;
                    otherApprovalsPendingCounts += parseInt(datafeatureAction["myApprovalsPending"]);
                    otherApprovalsHistoryCounts += parseInt(datafeatureAction["myApprovalsHistory"]);
                    otherRequestsPendingCounts += parseInt(datafeatureAction["myRequestsPending"]);
                    otherRequestsHistoryCounts += parseInt(datafeatureAction["myRequestHistory"]);

                }
            }
        }

        applicationManager.getConfigurationManager().SingleApprovalCount = singleApprovalsPendingCounts;// + singleApprovalsHistoryCounts;
        applicationManager.getConfigurationManager().BulkApprovalCount = bulkApprovalsPendingCounts;// + bulkApprovalsHistoryCounts;
        applicationManager.getConfigurationManager().OtherApprovalCount = otherApprovalsPendingCounts;// + otherApprovalsHistoryCounts;
        applicationManager.getConfigurationManager().SingleRequestsCount = singleRequestsPendingCounts;// + singleRequestsHistoryCounts;
        applicationManager.getConfigurationManager().BulkRequestsCount = bulkRequestsPendingCounts;// + bulkRequestsHistoryCounts;
        applicationManager.getConfigurationManager().OtherRequestsCount = otherRequestsPendingCounts;// + otherRequestsHistoryCounts;
        applicationManager.getConfigurationManager().TotalApprovalCount = singleApprovalsPendingCounts + bulkApprovalsPendingCounts + otherApprovalsPendingCounts;
        applicationManager.getConfigurationManager().TotalRequestsCount = singleRequestsPendingCounts + bulkRequestsPendingCounts + otherRequestsPendingCounts;
        applicationManager.getConfigurationManager().CountResponse = response;
        this.hasCountsServiceFailed = 0;

        if (!kony.sdk.isNullOrUndefined(navigationObject)) {
            if (!kony.sdk.isNullOrUndefined(navigationObject.onSuccess)) {
                var processedData;
                if (!kony.sdk.isNullOrUndefined(dataProcessor) && dataProcessor !== "" && this[dataProcessor] instanceof Function) {
                    processedData = this[dataProcessor](response, navigationObject);
                } else {
                    processedData = response;
                }
                if (!kony.sdk.isNullOrUndefined(processedData)) {
                    var navigationContext = {};
                    navigationContext.context = {
                        key: navigationObject.onSuccess.context.key,
                        responseData: processedData
                    };
                    navigationContext.form = navigationObject.onSuccess.form;
                    applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
                } else {
                    kony.print("Response is null or undefined");
                }
            }
        }
    };

    PresentationController.prototype.getAllCountsFailure = function() {
        this.singleApprovalsPending = [];
        this.singleApprovalsHistory = [];
        this.singleRequestsPending = [];
        this.singleRequestsHistory = [];
        this.bulkApprovalsPending = [];
        this.bulkApprovalsHistory = [];
        this.bulkRequestsPending = [];
        this.bulkRequestsHistory = [];
        this.otherApprovalsPending = [];
        this.otherApprovalsHistory = [];
        this.otherRequestsPending = [];
        this.otherRequestsHistory = [];
        this.allApprovalsPendingCount = 0;
        this.allApprovalsHistoryCount = 0;
        this.allRequestsPendingCount = 0;
        this.allRequestsHistoryCount = 0;
        this.isSingleApprovalsPendingAvailable = false;
        this.isSingleApprovalsHistoryAvailable = false;
        this.isSingleRequestsPendingAvailable = false;
        this.isSingleRequestsHistoryAvailable = false;
        this.isBulkApprovalsPendingAvailable = false;
        this.isBulkApprovalsHistoryAvailable = false;
        this.isBulkRequestsPendingAvailable = false;
        this.isBulkRequestsHistoryAvailable = false;
        this.isOtherApprovalsPendingAvailable = false;
        this.isOtherApprovalsHistoryAvailable = false;
        this.isOtherRequestsPendingAvailable = false;
        this.isOtherRequestsHistoryAvailable = false;
        this.singleApprovalsPendingCount = 0;
        this.singleApprovalsHistoryCount = 0;
        this.singleRequestsPendingCount = 0;
        this.singleRequestsHistoryCount = 0;
        this.bulkApprovalsPendingCount = 0;
        this.bulkApprovalsHistoryCount = 0;
        this.bulkRequestsPendingCount = 0;
        this.bulkRequestsHistoryCount = 0;
        this.otherApprovalsPendingCount = 0;
        this.otherApprovalsHistoryCount = 0;
        this.otherRequestsPendingCount = 0;
        this.otherRequestsHistoryCount = 0;
        this.hasCountsServiceFailed = 1;
    };

    /**
     * Wrapper method to be passed as successcallback,updates desired form with help navigationObject,dataProcessor,and response
     *@param {object} navigaton object
     *@param {function} dataProcessor - this function is used to process and return formatted response.
     *@param response from service call
     */
    PresentationController.prototype.completeSuccessCall = function(navigationObject, dataProcessor, response) {
        if (!kony.sdk.isNullOrUndefined(navigationObject)) {
            if (!kony.sdk.isNullOrUndefined(navigationObject.onSuccess)) {
                var processedData;
                if (!kony.sdk.isNullOrUndefined(dataProcessor) && dataProcessor !== "" && this[dataProcessor] instanceof Function) {
                    processedData = this[dataProcessor](response, navigationObject);
                } else {
                    processedData = response;
                }
                if (!kony.sdk.isNullOrUndefined(processedData)) {
                    var navigationContext = {};
                    navigationContext.context = {
                        key: navigationObject.onSuccess.context.key,
                        responseData: processedData
                    };
                    navigationContext.form = navigationObject.onSuccess.form;
                    applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
                } else {
                    kony.print("Response is null or undefined");
                }
            }
        }
    };

    /**
     * Wrapper method to be passed as failurecallback,updates desired form with help navigationObject,dataProcessor,and response
     *@param {object} navigaton object
     *@param {function} dataProcessor - this function is used to process and return formatted response.
     *@param response from service call
     */
    PresentationController.prototype.completeFailedCall = function(navigationObject, dataProcessor, response) {
        if (!kony.sdk.isNullOrUndefined(navigationObject)) {
            if (!kony.sdk.isNullOrUndefined(navigationObject.onFailure)) {
                var processedData;
                if (!kony.sdk.isNullOrUndefined(dataProcessor) && dataProcessor !== "" && this[dataProcessor] instanceof Function) {
                    processedData = this[dataProcessor](response);
                } else {
                    processedData = response;
                }
                if (!kony.sdk.isNullOrUndefined(processedData)) {
                    var navigationContext = {};
                    navigationContext.context = {
                        key: navigationObject.onFailure.context.key,
                        responseData: processedData
                    };
                    navigationContext.form = navigationObject.onFailure.form;
                    applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
                } else {
                    kony.print("Response is null or undefined");
                }
            }
        }
    };

    /**
     * Universal Method that takes you to server error page in case if a critical/required service call fails.
     */
    PresentationController.prototype.logOut = function(navigationObject) {
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        var context = {
            action: "Logout"
        };
        authModule.presentationController.doLogout(context);
    };

    /**
     * Method to check if Quick/Secondary/RightSide action is valid or not
     * @param {String} actionName Name of action
     * @param {JSON} account object
     * @returns {Boolean} true/false
     */
    PresentationController.prototype.isValidAction = function(actionName, account) {
        var isValid = false;
        var orientationHandler = new OrientationHandler();
        var id = account.accountID;
        var configManager = applicationManager.getConfigurationManager();
        var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
        var principalBalance, currentAmountDue;
        if (account.externalIndicator && account.externalIndicator === "true") {
            switch (actionName) {
                case OLBConstants.ACTION.REFRESH_ACCOUNT:
                case OLBConstants.ACTION.REMOVE_ACCOUNT:
                    return true;
                default:
                    isValid = false;
            }
        } else {
            switch (actionName) {
                case OLBConstants.ACTION.PAY_A_BILL:
                    isValid = configManager.checkAccountAction(id, "BILL_PAY_CREATE");
                    break;
                case OLBConstants.ACTION.VIEW_DOCUMENT:
                    isValid = configManager.checkAccountAction(id, "VIEW_DOCUMENTS") || applicationManager.getConfigurationManager().checkUserPermission('VIEW_DOCUMENTS') ;
                    break;
                case OLBConstants.ACTION.CHANGE_REPAYMENT_DAY:
                    isValid = configManager.checkAccountAction(id, "CHANGE_REPAYMENT_DAY-VIEW")|| applicationManager.getConfigurationManager().checkUserPermission('CHANGE_REPAYMENT_DAY-VIEW') ;
                    break;
                case OLBConstants.ACTION.RAISE_A_REQUEST:
                    isValid = configManager.checkAccountAction(id, "MESSAGES_CREATE_OR_REPLY")|| applicationManager.getConfigurationManager().checkUserPermission('MESSAGES_CREATE_OR_REPLY');
                    break;
                case OLBConstants.ACTION.MAKE_A_TRANSFER:
                case OLBConstants.ACTION.TRANSFER_MONEY:
                    if (applicationManager.getConfigurationManager().getDeploymentGeography() == "EUROPE") {
                        if(configManager.TransferFlowType === "UTF"){
                            isValid =  false;
                            return;
                        }
                        isValid = configManager.checkAccountAction(id, "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
                    } 
                    else {
                        isValid = configManager.checkAccountAction(id, "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") ||
                            configManager.checkAccountAction(id, "INTRA_BANK_FUND_TRANSFER_CREATE") ||
                            configManager.checkAccountAction(id, "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") ||
                            configManager.checkAccountAction(id, "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
                        if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") {
                            isValid = isValid || configManager.checkAccountAction(id, "P2P_CREATE")
                        } else {
                            isValid = isValid || configManager.checkAccountAction(id, "DOMESTIC_WIRE_TRANSFER_CREATE") ||
                                configManager.checkAccountAction(id, "INTERNATIONAL_WIRE_TRANSFER_CREATE");
                        }
                    }
                    break;
                case OLBConstants.ACTION.PAY_MONEY:
                    if (applicationManager.getConfigurationManager().getDeploymentGeography() == "EUROPE") {
                        isValid = configManager.checkAccountAction(id, "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") ||
                            configManager.checkAccountAction(id, "INTRA_BANK_FUND_TRANSFER_CREATE") ||
                            configManager.checkAccountAction(id, "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE");
                    } else {
                        isValid = false
                    }
                    break;
                case OLBConstants.ACTION.PAY_A_PERSON_OR_SEND_MONEY:
                    if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true")
                        isValid = false;
                    else
                        isValid = configManager.checkAccountAction(id, "P2P_CREATE")
                    break;
                case OLBConstants.ACTION.PAY_DUE_AMOUNT:
                case OLBConstants.ACTION.PAYOFF_LOAN:
                    principalBalance = Number(account.principalBalance) ? Number(account.principalBalance) : 0;
                    currentAmountDue = Number(account.currentAmountDue) ? Number(account.currentAmountDue) : 0;
                    isValid = configManager.checkAccountAction(id, "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") ||
                        configManager.checkAccountAction(id, "INTRA_BANK_FUND_TRANSFER_CREATE") ||
                        configManager.checkAccountAction(id, "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") ||
                        configManager.checkAccountAction(id, "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE")
                    break;
                case OLBConstants.ACTION.STOPCHECKS_PAYMENT:
                    isValid = applicationManager.getConfigurationManager().checkUserPermission('STOP_PAYMENT_REQUEST_CREATE');
                    break;
                case OLBConstants.ACTION.REQUEST_CHEQUE_BOOK:
                //    isValid = applicationManager.getConfigurationManager().checkUserPermission('CHEQUE_BOOK_REQUEST_CREATE');
					isValid = applicationManager.getConfigurationManager().checkAccountAction(account.accountID, "CHEQUE_BOOK_REQUEST_CREATE");
                    break;
                case OLBConstants.ACTION.VIEW_MYCHEQUES:
                    isValid = applicationManager.getConfigurationManager().checkUserPermission('VIEW_CHEQUES_VIEW');
                    break;
                case OLBConstants.ACTION.MANAGE_CARDS:
                    isValid = true;
                    break;
                case OLBConstants.ACTION.SAVINGS_POT:
                    isValid = applicationManager.getConfigurationManager().checkUserPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_VIEW) || applicationManager.getConfigurationManager().checkUserPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_VIEW);
                    break;
                case OLBConstants.ACTION.UPDATE_ACCOUNT_SETTINGS:
                    isValid = !(orientationHandler.isMobile || kony.application.getCurrentBreakpoint() == 640);
                    break;
                case OLBConstants.ACTION.ACCOUNT_SETTINGS:
                    isValid = !(orientationHandler.isMobile || kony.application.getCurrentBreakpoint() == 640);
                    break;
                case OLBConstants.ACTION.ACCOUNT_ALERTS:
                    isValid = !(orientationHandler.isMobile || kony.application.getCurrentBreakpoint() == 640);
                    break;
                case OLBConstants.ACTION.ACCOUNT_PREFERENCES:
                    isValid = !(orientationHandler.isMobile || kony.application.getCurrentBreakpoint() == 640);
                    break;
                case OLBConstants.ACTION.EDIT_ACCOUNT:
                    return !(orientationHandler.isMobile || kony.application.getCurrentBreakpoint() == 640) && applicationManager.getConfigurationManager().checkUserPermission("ACCOUNT_SETTINGS_EDIT");
                    break;
                case OLBConstants.ACTION.REFRESH_ACCOUNT:
                case OLBConstants.ACTION.REMOVE_ACCOUNT:
                    return false;
                case OLBConstants.ACTION.SHOW_DISPUTE_LIST:
                    return applicationManager.getConfigurationManager().checkUserFeature("DISPUTE_TRANSACTIONS");
                 case OLBConstants.ACTION.VIEW_STATEMENTS:
                   return applicationManager.getConfigurationManager().checkUserPermission('VIEW_COMBINED_STATEMENTS')||applicationManager.getConfigurationManager().checkUserPermission('VIEW_ESTATEMENTS');
                default:
                    isValid = true;
            }
        }
        return isValid;
    };

    PresentationController.prototype.getAdvancedFilterResults = function(data, accounts) {
        return applicationManager.getAccountManager().getAdvancedFilterData(data, accounts);
    };

    PresentationController.prototype.loadSystemConfigurations = function() {
        var config = applicationManager.getConfigurationManager();
        config.getDisputeConfigurations();
    };

    PresentationController.prototype.processAccountsData = function(data) {
        var accProcessedData = [];
        for (var i = 0; i < data.length; i++) {
            accProcessedData[i] = {};
            accProcessedData[i].accountName = data[i].accountName;
            accProcessedData[i].availableBalance = this.getAvailableBalanceCurrencyString(data[i]);
            accProcessedData[i].accountID = data[i].accountID;
            accProcessedData[i].bankName = data[i].bankName;
            accProcessedData[i].accountBalanceType = this.getAvailableBalanceType(data[i]);
            accProcessedData[i].accountType = data[i].accountType;
            accProcessedData[i].nickName = data[i].nickName;
        }
        return accProcessedData;
    };

    PresentationController.prototype.getAvailableBalanceCurrencyString = function(data) {
        var forUtility = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        var currencyCode = data["currencyCode"];
        switch (data.accountType) {
            case configManager.constants.SAVINGS:
                return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
            case configManager.constants.CHECKING:
                return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
            case configManager.constants.CREDITCARD:
                return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"], currencyCode);
            case configManager.constants.DEPOSIT:
                return forUtility.formatAmountandAppendCurrencySymbol(data["currentBalance"], currencyCode);
            case configManager.constants.MORTGAGE:
                return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"], currencyCode);
            case configManager.constants.LOAN:
                return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"], currencyCode);
            default:
                return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
        }
    };
    PresentationController.prototype.getAvailableBalanceType = function(data) {
        var configManager = applicationManager.getConfigurationManager();
        switch (data.accountType) {
            case configManager.constants.SAVINGS:
                return kony.i18n.getLocalizedString("i18n.accounts.availableBalance");
            case configManager.constants.CHECKING:
                return kony.i18n.getLocalizedString("i18n.accounts.availableBalance");
            case configManager.constants.CREDITCARD:
                return kony.i18n.getLocalizedString("i18n.accounts.outstandingBalance");
            case configManager.constants.DEPOSIT:
                return kony.i18n.getLocalizedString("i18n.accounts.currentBalance");
            case configManager.constants.MORTGAGE:
                return kony.i18n.getLocalizedString("i18n.accounts.outstandingBalance");
            case configManager.constants.LOAN:
                return kony.i18n.getLocalizedString("i18n.accounts.outstandingBalance");
            default:
                return kony.i18n.getLocalizedString("i18n.accounts.availableBalance");
        }
    };
    PresentationController.prototype.externalView = function(param) {
        applicationManager.getAccountManager().getBaseImage(param, this.successExternalDetails.bind(this, param), this.failExternalDetails.bind(this, param));
    };

    PresentationController.prototype.successExternalDetails = function(param, response) {
        applicationManager.getNavigationManager().updateForm({
            externalImage: response.base64
        }, 'frmAccountsDetails');
    };

    PresentationController.prototype.failExternalDetails = function(param, response) {
        applicationManager.getNavigationManager().updateForm({
            externalImage: response.errorMessage
        }, 'frmAccountsDetails');
    };

    PresentationController.prototype.externalDownload = function(param) {
        applicationManager.getNavigationManager().updateForm({
            externalDownload: applicationManager.getAccountManager().getChequeDownloadURL(param)
        }, frmAccountsDetails);
    };
    PresentationController.prototype.getMonthlyStatements = function(context, SuccessCallback, FailureCallback) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true
            }
        });
        applicationManager.getAccountManager().getMonthlyStatements(context, function sucess(response) {
            SuccessCallback(response)
        }, function failure(response) {
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: false
                }
            })
            FailureCallback(response)
        });

    };
  
    PresentationController.prototype.DownloadCombinedStatement = function (context,SuccessCallback, FailureCallback) {
        var payload = {};
        payload.fileId = context.fileId;
        applicationManager.getNavigationManager().updateForm({
                transactionDownloadFile: applicationManager.getAccountServicesModule().DownloadCombinedStatement(payload)
              }, frmAccountsDetails);
      };
    
  PresentationController.prototype.checkDownloadStatusOfCombinedStatement = function(context, SuccessCallback, FailureCallback) {
        
		applicationManager.getAccountServicesModule().checkDownloadStatusOfCombinedStatement(context,function sucess(response){
		SuccessCallback(response)}, function failure(response){
		applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false
            }
        })
        FailureCallback(response)
        });
  };
    
    PresentationController.prototype.downloadAttachments = function(transactionObject, param, i) {
        var requestParam = {};
        if (transactionObject !== null) { //forsinglefile
            for (var i = 0; i < transactionObject.fileNames.length; i++) {
                if (param.filename === transactionObject.fileNames[i].fileName) {
                    requestParam.fileID = transactionObject.fileNames[i].fileID;
                    requestParam.fileName = transactionObject.fileNames[i].fileName;
                    break;
                }
            }
        } else { //formultiplefiles
            requestParam.fileID = param.fileNames[i].fileID;
            requestParam.fileName = param.fileNames[i].fileName;
        }
        requestParam.customerId = applicationManager.getUserPreferencesManager().getUserObj().userId;
      if(applicationManager.getConfigurationManager().isMicroAppPresent("TransactionMA")){
          applicationManager.getNavigationManager().updateForm({
              transactionDownloadFile: applicationManager.getTransactionManager().getDownloadAttachmentUrl(requestParam)
          }, frmAccountsDetails);
      }
    };

 PresentationController.prototype.loadWealthComponents=function(){
    var inputParams = {
        "Topic": "OLUSBUS"
            };
    //this.getTopNews(inputParams);
    var indexParam = {};
   //this.getMarketIndex(indexParam);
//    this.fetchInvestmentSummary();
//    this.fetchTotalAssets();
//    this.fetchIndexDetails();
//    this.fetchRecentActivity();
  };
     /**
     * Method to fetch Investment Summary
     */
   PresentationController.prototype.fetchInvestmentSummary=function(params){
   
 // applicationManager.getAccountManager().fetchInternalAccounts(this.getSummmaryOnSuccess.bind(this), this.getSummmaryOnError.bind(this));
     if(applicationManager.getConfigurationManager().isMicroAppPresent("WealthOrderMA")){
  		 applicationManager.getWealthManager().getInvestmentSummary(params, this.getSummmaryOnSuccess.bind(this), this.getSummmaryOnError.bind(this));
     }
   };
  PresentationController.prototype.getSummmaryOnSuccess=function(data){
   applicationManager.getNavigationManager().updateForm({
            InvestmentSummary: data
        }, "CopyfrmAccountsLanding");
 
 };
  PresentationController.prototype.getSummmaryOnError=function(){
   
  }; 
     /**
     * Method to fetchTotalAssets
     */
   PresentationController.prototype.fetchTotalAssets=function(params){
   if(applicationManager.getConfigurationManager().isMicroAppPresent("WealthOrderMA")){
   		applicationManager.getWealthManager().getTotalAssets(params, this.getAssetOnSuccess.bind(this), this.getAssetOnError.bind(this));
   }
   };
  
  PresentationController.prototype.getAssetOnSuccess=function(data){
   applicationManager.getNavigationManager().updateForm({
            TotalAssets: data
        }, "CopyfrmAccountsLanding");
 
 };
  PresentationController.prototype.getAssetOnError=function(){
   
  }; 
    PresentationController.prototype.getTopNews = function(params) {
      if(applicationManager.getConfigurationManager().isMicroAppPresent("WealthOrderMA")){
        var wealthManager = applicationManager.getWealthManager();
        wealthManager.getTopNews(params, this.getTopNewsSuccess.bind(this), this.getTopNewsError.bind(this));
      }
    };
    PresentationController.prototype.getTopNewsSuccess = function(response) {
      var navMan = applicationManager.getNavigationManager();
      var data = navMan.getCustomInfo('frmTopNews');
		if(data==undefined){
			data={};
		}
		data.News=response;
        navMan.setCustomInfo('frmTopNews', data);
        applicationManager.getNavigationManager().updateForm({
            NewsList: response
        }, "CopyfrmAccountsLanding");
    };
    PresentationController.prototype.getTopNewsError = function(err) {
     
    };
    /**
     * Method to fetch news highlights
     */
  PresentationController.prototype.getMarketIndex=function(params){
    if(applicationManager.getConfigurationManager().isMicroAppPresent("WealthOrderMA")){
      var wealthManager = applicationManager.getWealthManager();
      wealthManager.getTodayMarketNews(params,this.getMarketIndexOnSuccess.bind(this), this.getMarketIndexOnError.bind(this));
    }
  };
  
  PresentationController.prototype.getMarketIndexOnSuccess = function(response) {
    var data = {};
    data.response = response.GetSimpleData_Response_2.SimpleDataResult.ItemResponse[0].Item;
    applicationManager.getNavigationManager().updateForm({
      IndexList: data
    }, "CopyfrmAccountsLanding");
    
    
    var navMan = applicationManager.getNavigationManager();
    var data2 = navMan.getCustomInfo('frmTopNews');
    if(data2==undefined){
      data2={};
    }
    data2.Market=data.response;
    navMan.setCustomInfo('frmTopNews', data2);

     
     
 
 };
   PresentationController.prototype.getMarketIndexOnError=function(){
   
  };
   /**
     * Method to fetch news highlights
     */
 PresentationController.prototype.fetchNewsHighlights=function(){
   if(applicationManager.getConfigurationManager().isMicroAppPresent("WealthOrderMA")){
  		applicationManager.getWealthManager().getNewsHighlights(this.getNewsHighlightsOnSuccess.bind(this), this.getNewsHighlightsOnError.bind(this));
   }
 };
   PresentationController.prototype.fetchIndexDetails=function(){
   if(applicationManager.getConfigurationManager().isMicroAppPresent("WealthOrderMA")){
  		applicationManager.getWealthManager().getIndexDetails({}, this.getIndexDetailsOnSuccess.bind(this), this.getNewsHighlightsOnError.bind(this));
   }
 };
   PresentationController.prototype.fetchRecentActivity=function(){
   if(applicationManager.getConfigurationManager().isMicroAppPresent("WealthOrderMA")){
  		applicationManager.getWealthManager().getRecentActivityy(this.getRecentActivityOnSuccess.bind(this), this.getNewsHighlightsOnError.bind(this));
   }
 };
  PresentationController.prototype.getNewsHighlightsOnSuccess = function(response) {
		
		
		
        var navMan = applicationManager.getNavigationManager();
		var data=navMan.getCustomInfo('frmTopNews');
		if(data==undefined){
			data={};
		}
		data.News=response;
        navMan.setCustomInfo('frmTopNews', data);
        applicationManager.getNavigationManager().updateForm({
            NewsList: response
        }, "CopyfrmAccountsLanding");
 
 };
    PresentationController.prototype.getIndexDetailsOnSuccess=function(data){
   applicationManager.getNavigationManager().updateForm({
            IndexList: data
        }, "CopyfrmAccountsLanding");
 
 };
   PresentationController.prototype.getRecentActivityOnSuccess=function(data){
   applicationManager.getNavigationManager().updateForm({
            ActivityList: data
        }, "CopyfrmAccountsLanding");
 
 };
  PresentationController.prototype.getNewsHighlightsOnError=function(){
   
  };

   /**
 * Method to fetch the fileid value for Accounts estatements to download
 */
  PresentationController.prototype.getfileId = function(requestParam,fileName){
      applicationManager.getAccountManager().getFileidForEstatements(requestParam, this.getfileIdSuccess.bind(this,fileName), this.getfileIdFailure.bind(this));
   };

   PresentationController.prototype.getfileIdSuccess = function(fileName,response){
       applicationManager.getNavigationManager().updateForm({
            "fileIdEstatements": response.fileId,
            "fileName":fileName
        },frmAccountsDetails);
   };

 PresentationController.prototype.getfileIdFailure = function(){
 };
              
 /**
 * Method to fetch the fileid value for Accounts estatements to download
 */
  PresentationController.prototype.getcombinedstatements = function(requestParam){
      applicationManager.getAccountManager().getCombinedStatements(requestParam, this.getcombinedstatementsSuccess.bind(this), this.getcombinedstatementsFailure.bind(this));
   };

   PresentationController.prototype.getcombinedstatementsSuccess = function(response){
       applicationManager.getNavigationManager().updateForm({
            "combinedstatements": response
        },frmAccountsDetails);
   };

 PresentationController.prototype.getcombinedstatementsFailure = function(){
   applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: false
                }
            });
 };

    PresentationController.prototype.fetchTermsAndConditions = function (request, callback) {
        let scope = this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        let asyncManager = applicationManager.getAsyncManager();
        asyncManager.callAsync([
            asyncManager.asyncItem(applicationManager.getTermsAndConditionManager(), 'fetchTermsAndConditionsPostLogin', [{
                "legalEntityId": request.id,
                "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
                "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.Login_TnC
            }])
        ], scope.onCompletionOfFetchTermsAndConditions.bind(this, request, callback));
    };

    PresentationController.prototype.onCompletionOfFetchTermsAndConditions = function (request, callback, syncResponseObject) {
        let scope = this;
        if (syncResponseObject.responses[0].isSuccess) {
            let response = syncResponseObject.responses[0].data;
            if (response.alreadySigned === "true") {
                scope.updateCurrentEntityInCache(request, callback);
            } else {
                if (callback && typeof(callback) === 'function') {
                    callback(response);
                }
                applicationManager.getPresentationUtility().dismissLoadingScreen();
            }
        } else {
            if (callback && typeof(callback) === 'function') {
                callback();
            }
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    };

    PresentationController.prototype.updateTermsAndConditions = function (request, callback) {
        let scope = this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        let asyncManager = applicationManager.getAsyncManager();
        asyncManager.callAsync([
            asyncManager.asyncItem(applicationManager.getTermsAndConditionManager(), 'createTermsAndConditionsLogin', [{
                "legalEntityId": request.id,
                "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.Login_TnC,
                "languageCode": kony.i18n.getCurrentLocale().replace("_", "-")
            }])
        ], scope.onCompletionOfUpdateTermsAndConditions.bind(this, request, callback));
    };

    PresentationController.prototype.onCompletionOfUpdateTermsAndConditions = function (request, callback, syncResponseObject) {
        let scope = this;
        if (syncResponseObject.responses[0].isSuccess) {
            let response = syncResponseObject.responses[0].data;
            scope.updateCurrentEntityInCache(request, callback);
        } else {
            if (callback && typeof(callback) === 'function') {
                callback();
            }
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    };

    PresentationController.prototype.updateCurrentEntityInCache = function(request, callback) {
        let scope = this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        let asyncManager = applicationManager.getAsyncManager();
        asyncManager.callAsync([
            asyncManager.asyncItem(applicationManager.getMultiEntityManager(), 'updateCurrentEntityInCache', [{
                "currentLegalEntityId": request.id
            }])
        ], scope.onCompletionOfupdateCurrentEntityInCache.bind(this, request, callback));
    };

    PresentationController.prototype.onCompletionOfupdateCurrentEntityInCache = function (request, callback, syncResponseObject) {
        let scope = this;
        if (syncResponseObject.responses[0].isSuccess) {
            applicationManager.getUserPreferencesManager().saveCurrentLegalEntity(request.id);
            applicationManager.getStorageManager().setStoredItem('updateInternalAccounts', false);
            if (callback && typeof (callback) === 'function') {
                callback();
            }
            scope.renderDashBoardScreen();
        } else {
            if (callback && typeof (callback) === 'function') {
                callback();
            }
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    };

    PresentationController.prototype.renderDashBoardScreen = function () {
        let scope = this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        let userPrefManager = applicationManager.getUserPreferencesManager();
        let asyncManager = applicationManager.getAsyncManager();
        asyncManager.callAsync([
            asyncManager.asyncItem(userPrefManager, 'fetchUser'),
            asyncManager.asyncItem(userPrefManager, 'fetchUserImage'),
            asyncManager.asyncItem(userPrefManager, 'getUserFeaturesAndPermissions')
        ], scope.onCompletionOfRenderDashBoardScreen.bind(this));
    };

    PresentationController.prototype.onCompletionOfRenderDashBoardScreen = function (syncResponseObject) {
        let scope = this;
        if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
            scope.showAccountsDashboard();
        }
    };

    PresentationController.prototype.getCashFlow = function (params, form, callback) {
        showLoadingIndicator: {
            status: true
        }
        applicationManager.getAccountManager().fetchCashFlow(params, this.getCashFlowSuccess.bind(this, form, callback), this.getCashFlowFailure.bind(this, form, callback));
    };

    PresentationController.prototype.getCashFlowSuccess = function (form, callback, response) {
        showLoadingIndicator: {
            status: false
        }
        applicationManager.getNavigationManager().updateForm({
            "sbaCashFlowData": response

        }, "frmDashboard");
    };

    PresentationController.prototype.getCashFlowFailure = function (form, callback, response) {
        applicationManager.getNavigationManager().updateForm({
            sbaErrorMsg: response.serverErrorRes.dbpErrMsg || response.errorMessage,
            showLoadingIndicator: {
                status: false
            }
        }, form);
    };

    PresentationController.prototype.getHealthScore = function (params, form, callback) {
        showLoadingIndicator: {
            status: true
        }
        applicationManager.getAccountManager().fetchHealthScore(params, this.getHealthScoreSuccess.bind(this, form, callback), this.getHealthScoreFailure.bind(this, form, callback));
    };

    PresentationController.prototype.getHealthScoreSuccess = function (form, callback, response) {
        showLoadingIndicator: {
            status: false
        }

        applicationManager.getNavigationManager().updateForm({
            "sbaHealthScore": response
        }, form);
    };

    PresentationController.prototype.getHealthScoreFailure = function (form, callback, response) {
        applicationManager.getNavigationManager().updateForm({
            sbaErrorMsg: response.serverErrorRes.dbpErrMsg || response.errorMessage,
            showLoadingIndicator: {
                status: false
            }
        }, form);
    };

    PresentationController.prototype.updateSBAStatus = function (params, form, callback) {
        showLoadingIndicator: {
            status: true
        }
        applicationManager.getAccountManager().updateSBAStatus(params, this.updateSBAStatusSuccess.bind(this, form, callback), this.updateSBAStatusFailure.bind(this, form));
    };

    PresentationController.prototype.updateSBAStatusSuccess = function (form, callback, response) {
        showLoadingIndicator: {
            status: false
        }

        applicationManager.getNavigationManager().updateForm({
            "updateSBAStatus": response
        }, "frmDashboard");
    };

    PresentationController.prototype.updateSBAStatusFailure = function () {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false
            }
        });
    };
  
    /**
     * Method to call enrolment status for smart banking advisory
     */
    PresentationController.prototype.getSbaEnrolmentStatus = function (params, form, callback) {
        showLoadingIndicator: {
            status: true
        }
        applicationManager.getAccountManager().getEnrolmentStatus(params, this.getSbaEnrolmentStatusSuccess.bind(this, form, callback), this.getSbaEnrolmentStatusFailure.bind(this, form));
    };

    /**
     * Method to call enrolment status for smart banking advisory service call on success
     */
    PresentationController.prototype.getSbaEnrolmentStatusSuccess = function (form, callback, response) {
        showLoadingIndicator: {
            status: false
        }
        applicationManager.getNavigationManager().updateForm({
            "sbaEnrolmentStatus": response
        }, form);
    };

    /**
     * Method to call enrolment status for smart banking advisory service call on failure
     */
    PresentationController.prototype.getSbaEnrolmentStatusFailure = function (error) {
        applicationManager.getNavigationManager().updateForm({
            "sbaEnrolmentError": error
        });
    };

    /**
     * Method to call for smart banking advisory feature details
     */
    PresentationController.prototype.getSBAFeatureDetails = function (params, form, callback) {
        showLoadingIndicator: {
            status: true
        }
        applicationManager.getAccountManager().getSBAFeatureDetails(params, this.getSBAFeatureDetailsSuccess.bind(this, form, callback), this.getSBAFeatureDetailsFailure.bind(this, form));
    };

    /**
     * Method to call for smart banking advisory feature details service call on success
     */
    PresentationController.prototype.getSBAFeatureDetailsSuccess = function (form, callback, response) {
        showLoadingIndicator: {
            status: false
        }
        applicationManager.getNavigationManager().updateForm({
            "sbaFeatureDetails": response
        }, form);
    };

    /**
     * Method to call for smart banking advisory feature details service call on failure
     */
    PresentationController.prototype.getSBAFeatureDetailsFailure = function () {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false
            }
        });
    };
    return PresentationController;
});