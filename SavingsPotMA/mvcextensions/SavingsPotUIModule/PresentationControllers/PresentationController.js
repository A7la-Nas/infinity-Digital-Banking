define(['OLBConstants', 'CommonUtilities'], function(OLBConstants, CommonUtilities) {
    this.filteredAccounts = [];
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    this.budgetList = {};
    this.goalList = {};
    this.savingsPotDetails = [];
    this.savingsPotCategories = [];
    this.associatedAccountId = null;

    function SavingsPotPresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
        this.savingsPotDetails = [];
        this.savingsPotCategories = [];
        this.associatedAccountId = null;
    }
    inheritsFrom(SavingsPotPresentationController, kony.mvc.Presentation.BasePresenter);
    /**
     * fundBudget: method that triggers service call to  fund  a budget
     * @param1 {Object} budgetData - Contains details of the budget 
     * @param2 {Object} params - Values to be sent to the server write request 
     * @method Contains business controller call to fund budget
     */
    SavingsPotPresentationController.prototype.fundBudget = function(budgetData, params) {
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true,
                }
            });
            applicationManager.getSavingsPotManager().updateSavingsPotBalance(params, this.onFundBudgetSuccess.bind(this, budgetData), this.savingsPotFailure.bind(this));
        },
        /**
         * onFundBudgetSuccess: success callback of fundBudget method
         * @param1 {Object} budgetData - Contains details of the budget 
         * @param2 {Object} response - Response returned from the server
         * @method Associates budget data to calling function.
         */
        SavingsPotPresentationController.prototype.onFundBudgetSuccess = function(budgetData, response) {
            applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmFundBudgetAck"});
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: false,
                },
                budgetSuccess: budgetData
            }, {"appName" : "SavingsPotMA", "friendlyName" : "frmFundBudgetAck"});
        },
        /**
         *fundGoal: method that triggers service call to  fund  a goal
         * @param1 {Object} goalData - goal details
         * @param2 {Object} params - Values to be sent to the server write request
         * @method Contains business controller call to fund the goal
         */
        SavingsPotPresentationController.prototype.fundGoal = function(goalData, params) {
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true,
                }
            });
            applicationManager.getSavingsPotManager().updateSavingsPotBalance(params, this.onFundGoalSuccess.bind(this, goalData), this.savingsPotFailure.bind(this));
        },
        /**
         * onFundGoalSuccess: success callback of fundGoal method
         * @param1 {Object} goalData - data 
         * @param2 {Object} response - Response data values sent from the server.
         * @method Associates goalData with the calling function
         */
        SavingsPotPresentationController.prototype.onFundGoalSuccess = function(goalData, response) {
            applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmFundGoalAck"});
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: false,
                },
                goalSuccess: goalData
            }, {"appName" : "SavingsPotMA", "friendlyName" : "frmFundGoalAck"});
        },
        /**
         *fetchSavingsPot: method that triggers service call to fetch all the available  goals and budget 
         * @param1 {Object} accountID - account Id 
         * @param2 {String} msg 
         * @method Contains call to business controller to fetch details required in savings pot landing page
         */
        SavingsPotPresentationController.prototype.fetchSavingsPot = function(accountID, msg, isCloseFlow) {
            var self = this;
            new kony.mvc.Navigation({"friendlyName" : "SavingsPotUIModule/frmSavingsPotLanding", "appName" : "SavingsPotMA"}).navigate(accountID, msg, isCloseFlow);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true
                }
            });

            function savingsPotDetailsCompletionCallback(syncResponseObject) {
                if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
                    self.fetchSavingsPotAndCategoriesSuccess(syncResponseObject.responses[0].data, syncResponseObject.responses[1].data, msg, accountID, isCloseFlow);
                } else {
                    self.fetchSavingsPotFailure();
                }
            }
            this.setSavingsPotCurrentAccount(accountID);
            var asyncManager = applicationManager.getAsyncManager();
            if (this.getSavingsPotCategories().length === 0) {
                asyncManager.callAsync(
                    [
                        asyncManager.asyncItem(applicationManager.getSavingsPotManager(), "fetchSavingsPotsDetails", [{
                            "fundingAccountId": accountID
                        }]),
                        asyncManager.asyncItem(applicationManager.getSavingsPotManager(), "fetchCategoriesForGoal")
                    ], savingsPotDetailsCompletionCallback);
            } else {
                applicationManager.getSavingsPotManager().fetchSavingsPotsDetails({
                    "fundingAccountId": accountID
                }, this.fetchSavingsPotSuccess.bind(this, null, msg, accountID, isCloseFlow), this.fetchSavingsPotFailure.bind(this));
            }
        };
    /*
     *fetchAccountByID: Method retunrs account details taking Account ID as parameter
     * @param1 {String} accountID - account Id 
     * @return {Object} filteredAccounts - account details
     */
    SavingsPotPresentationController.prototype.fetchAccountByID = function(accountID) {
        for (var i = 0; i < this.filteredAccounts.length; i++) {
            if (this.filteredAccounts[i].accountID.includes(accountID)) {
                return this.filteredAccounts[i];
            }
        }
        return "";
    }
    /**
     *fetchSavingsPotSuccess: success callback of fetchSavingsPot method
     * @param1 {Object} savingsPotDetails - Details of the Savings Pot
     * @param2 {Object} categories - categories
     * @param3 {String} msg - Response Message
     * @param4 {String} accountID - account Identifier
     */
    SavingsPotPresentationController.prototype.fetchSavingsPotSuccess = function(categories, msg, accountID, isCloseFlow, savingsPotDetails) {
        this.fetchSavingsPotAndCategoriesSuccess(savingsPotDetails, categories, msg, accountID, isCloseFlow);
    }

    /**
     *fetchSavingsPotSuccess: success callback of fetchSavingsPot method
     * @param1 {Object} savingsPotDetails - Details of the Savings Pot
     * @param2 {Object} categories - categories
     * @param3 {String} msg - Response Message
     * @param4 {String} accountID - account Identifier
     */
    SavingsPotPresentationController.prototype.fetchSavingsPotAndCategoriesSuccess = function(savingsPotDetails, categories, msg, accountID, isCloseFlow) {
        var self = this;
        var internalAccounts = applicationManager.getAccountManager().getInternalAccounts();
        var accounts = internalAccounts.filter(function(data) {
            return ((data.accountType === OLBConstants.ACCOUNT_TYPE.SAVING || data.accountType === OLBConstants.ACCOUNT_TYPE.CHECKING) && (data.isBusinessAccount !== "true"));
        });
        self.filteredAccounts = accounts;
        if (internalAccounts) {
            applicationManager.getNavigationManager().updateForm({
                accountList: accounts,
                selectedAccount: self.getAccount(accountID),
                closeSavingsPotSuccess: isCloseFlow
            }, {"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsPotLanding"});
        }

        self.setSavingsPotDetails(savingsPotDetails.savingsPot);
        if (self.getSavingsPotCategories().length === 0)
            self.setSavingsPotCategories(categories.category);

        if (msg) {
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: false,
                },
                savingsPotDetails: savingsPotDetails.savingsPot,
                categories: self.getSavingsPotCategories(),
                errorMsg: msg
            }, {"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsPotLanding"});
        } else {
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: false,
                },
                savingsPotDetails: savingsPotDetails.savingsPot,
                categories: self.getSavingsPotCategories(),
            }, {"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsPotLanding"});
        }
    }
    /**
     *fetchSavingsPotFailure: error callback of fetchSavingsPot method
     * @param1 {Object} Takes no parameter
     * @method Navigates to common error phase
     */
    SavingsPotPresentationController.prototype.fetchSavingsPotFailure = function() {
        CommonUtilities.showServerDownScreen();
    };
    /**
     * createBudget: method that triggers service call to  fund  a Budget
     * @param1 {Object} budgetData: Details of the budget as entered by the user
     * @param2 {Object} params: Holds the values to be sent to the server write request
     * @method contains call to business controller for creating budget
     */
    SavingsPotPresentationController.prototype.createBudget = function(budgetData, params) {
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true,
                }
            });
            applicationManager.getSavingsPotManager().createSavingsPot(params, this.createBudgetSuccess.bind(this, budgetData), this.createBudgetFailure.bind(this));
        },
        SavingsPotPresentationController.prototype.createBudgetSuccess = function(budgetData, response) {
            budgetData.savingsPotId = response.savingsPotId;
            budgetData.potAccountId = response.potAccountId;
            applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmCreateBudgetAck"});
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: false,
                },
                createBudgetSuccess: budgetData
            }, {"appName" : "SavingsPotMA", "friendlyName" : "frmCreateBudgetAck"});
        }
    /**
     * createBudgetFailure: Error callback of create budget call
     * @param1 {Object} response: response sent from the server call
     * @method associates error message with the calling function 
     */
    SavingsPotPresentationController.prototype.createBudgetFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true,
            }
        });
        var accountID = this.associatedAccountId;
        this.fetchSavingsPot(accountID, {
            serverError: kony.i18n.getLocalizedString("i18n.savingspot.budgetCreateErrMsg")
        });
    }
    /**
     * withdrawBudget: method that triggers service call to  withdraw amount from budget
     * @param1 {Object} budgetData: Object holding details of the budget
     * @param2 {Object} params: Values to be sent to the server write request
     * @method contains call to business controller for withdraw budget
     */
    SavingsPotPresentationController.prototype.withdrawBudget = function(budgetData, params) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true,
            }
        });
        applicationManager.getSavingsPotManager().updateSavingsPotBalance(params, this.onWithdrawBudgetSuccess.bind(this, budgetData), this.savingsPotFailure.bind(this));
    };
    /**
     * onWithdrawBudgetSuccess: Success callback for withdraw budget 
     * @param1 {Object} budgetData: Object holding details of the budget
     * @param2 {Object} response: Response sent fromt he server
     * @method associates budget data with the calling function
     */
    SavingsPotPresentationController.prototype.onWithdrawBudgetSuccess = function(budgetData, response) {
        applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmWithdrawBudgetAck"});
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false,
            },
            budgetSuccess: budgetData
        }, {"appName" : "SavingsPotMA", "friendlyName" : "frmWithdrawBudgetAck"});
    };
    /**
     * withdrawGoal: method that triggers service call to  withdraw amount from Goal
     * @param1 {Object} goalData: Object holding details of the Goal
     * @param2 {Object} params: Values to be sent to the server write request
     * @method contains call to business controller for withdraw goal
     */
    SavingsPotPresentationController.prototype.withdrawGoal = function(goalData, params) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true,
            }
        });
        applicationManager.getSavingsPotManager().updateSavingsPotBalance(params, this.onWithdrawGoalSuccess.bind(this, goalData), this.savingsPotFailure.bind(this));
    };
    /**
     * onWithdrawGoalSuccess: Success callback for withdraw goal 
     * @param1 {Object} goalData: Object holding details of the goal
     * @param2 {Object} response: Response sent from the server
     * @method associates goal data with the calling function
     */
    SavingsPotPresentationController.prototype.onWithdrawGoalSuccess = function(goalData, response) {
        applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmWithdrawGoalAck"});
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false,
            },
            goalSuccess: goalData
        }, {"appName" : "SavingsPotMA", "friendlyName" : "frmWithdrawGoalAck"});
    };
    /**
     * createGoal: method that triggers service call to  create Goal
     * @param1 {Object} goalData: Object holding details of the goal
     * @param2 {Object} params: Object holding goal data and values to be sent to the server write request
     * @method Containes bussiness controller call to create the Savings Pot Goal
     */
    SavingsPotPresentationController.prototype.createGoal = function(goalData, params) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true,
            }
        });
        applicationManager.getSavingsPotManager().createSavingsPot(params, this.createGoalSuccess.bind(this, goalData), this.createGoalFailure.bind(this));
    };
    /**
     * createGoalSuccess: Success call back of create goal call
     * @param1 {Object} goalData: Object holding details of the goal
     * @param2 {Object} response: Response sent from the server
     * @method Associates goal data with the calling function
     */
    SavingsPotPresentationController.prototype.createGoalSuccess = function(goalData, response) {
        applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalAck"});
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false,
            },
            createGoalSuccess: goalData
        }, {"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalAck"});
    };
    /**
     * createGoalFailure: Error call back of create goal call
     * @param1 {Object} response: Response sent from the server
     * @method Associates the error message with the calling function
     */
    SavingsPotPresentationController.prototype.createGoalFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true,
            }
        });
        var accountID = this.associatedAccountId;
        this.fetchSavingsPot(accountID, {
            serverError: kony.i18n.getLocalizedString("i18n.savingsPot.goalCreationFailedMessage")
        });
    }
    /**
     * editGoal: method that triggers service call to  edit Goal
     * @param1 {Object} goalData: Object holding details of the goal
     * @param2 {Object} params: Holds values to be sent to the server write request
     * @method Associates goal data with the calling function
     */
    SavingsPotPresentationController.prototype.editGoal = function(goalData, params) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true,
            }
        });
        applicationManager.getSavingsPotManager().updateSavingsPot(params, this.editGoalSuccess.bind(this, goalData), this.savingsPotFailure.bind(this));
    };
    /**
     * editGoalSuccess: Success call back of edit goal call
     * @param1 {Object} goalData: Object holding details of the goal
     * @param2 {Object} response: Response sent form the server
     * @method Associates goal data with the calling function
     */
    SavingsPotPresentationController.prototype.editGoalSuccess = function(goalData, response) {
        applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalAck"});
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false,
            },
            editGoalSuccess: goalData
        }, {"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalAck"});
    };
    /**
     * editBudget: Method that triggers service call to edit budget
     * @param1 {Object} budgetData: Object holding details of the budget
     * @param2 {Object} params: Values to be sent to the server write request
     * @method Contains business controller call to edit the budget
     */
    SavingsPotPresentationController.prototype.editBudget = function(budgetData, params) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true,
            }
        });
        applicationManager.getSavingsPotManager().updateSavingsPot(params, this.editBudgetSuccess.bind(this, budgetData), this.savingsPotFailure.bind(this));
    };
    /**
     * editBudgetSuccess: Success call back of edit budget call
     * @param1 {Object} budgetData: Object holding details of the budget
     * @param2 {Object} response: Response received from the server
     * @method Associates budget data with the calling function
     */
    SavingsPotPresentationController.prototype.editBudgetSuccess = function(budgetData, response) {
        applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmCreateBudgetAck"});
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false,
            },
            editBudgetSuccess: budgetData
        }, {"appName" : "SavingsPotMA", "friendlyName" : "frmCreateBudgetAck"});
    };
    /**
     * savingsPotFailure: Error call back of create Savings pot
     * @param1 {Object} response: Response received from the server
     * @method Associates error message with the calling function
     */
    SavingsPotPresentationController.prototype.savingsPotFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false,
            },
            serverError: response.errorMessage
        });
    };
    /**
     * showAccountDetails - Entry Point for Account Details, this method load Account detail components
     * @param {JSON} account account json for which yout want to get details
     */
    SavingsPotPresentationController.prototype.showAccountDetails = function(account) {
        //  this.getAccountDeatilsAllAccounts();
        this.updateAccountDetails(account);

    };
    /**
     * updateAccountDetails - Method to present frmAccount details with specific account details
     * @param {JSON} account Account whose details needs to be displayed
     */
    SavingsPotPresentationController.prototype.updateAccountDetails = function(account) {
        applicationManager.getNavigationManager().updateForm({
            accountDetails: account
        });
    };
    /**
     * showFundGoal - Method to navigate to navigate to fund goal screen
     * @param {JSON} frmFundGoal goalData
     */
    SavingsPotPresentationController.prototype.showFundGoal = function(fundGoalData) {
        applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmFundGoal"});
        applicationManager.getNavigationManager().updateForm({
            fundGoal: fundGoalData
        });
    };
    /**
     * showWithdrawGoal - Method to navigate to navigate to withdraw goal screen
     * @param {JSON} withdrawGoalData withdrawGoalData
     */
    SavingsPotPresentationController.prototype.showWithdrawGoal = function(withdrawGoalData) {
        applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmWithdrawGoal"});
        applicationManager.getNavigationManager().updateForm({
            withdrawGoal: withdrawGoalData
        });
    };
    /**
     * showFundBudgetScreen - Method to navigate to navigate to fund budget screen
     * @param {JSON} fundBudgetData fundBudgetData
     */
    SavingsPotPresentationController.prototype.showFundBudgetScreen = function(fundBudgetData) {
        applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmFundBudget"});
        applicationManager.getNavigationManager().updateForm({
            fundBudget: fundBudgetData
        });
    };
    /**
     * showWithdrawBudgetScreen - Method to navigate to navigate to withdrawal budget screen
     * @param {JSON} withdrawBudget withdrawBudget
     */
    SavingsPotPresentationController.prototype.showWithdrawBudgetScreen = function(withdrawBudget) {
        applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmWithdrawBudget"});
        applicationManager.getNavigationManager().updateForm({
            withdrawBudget: withdrawBudget
        });
    };
    /**
     * showEditGoalScreen - Method to navigate to navigate to edit goal screen
     * @param {JSON} editGoalData editGoalData
     */
    SavingsPotPresentationController.prototype.showEditGoalScreen = function(editGoalData) {
        applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmEditGoal"});
        applicationManager.getNavigationManager().updateForm({
            editGoalData: editGoalData
        });
    };
    /**
     * showEditBudgetScreen - Method to navigate to navigate to edit budget screen
     * @param {JSON} editBudgetData editBudgetData
     */
    SavingsPotPresentationController.prototype.showEditBudgetScreen = function(editBudgetData) {
        applicationManager.getNavigationManager().navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmEditBudget"});
        applicationManager.getNavigationManager().updateForm({
            editBudgetData: editBudgetData
        });
    };
    /**
     * presentUserInterface - Method to navigate to navigate to form given
     * @param {String} form form for navigation
     * @param {JSON} potData savings pot data navigation
     */
    SavingsPotPresentationController.prototype.presentUserInterface = function(form, potData) {
        applicationManager.getNavigationManager().navigateTo(form);
        applicationManager.getNavigationManager().updateForm(potData);
    };
    /**
     * getBudgetList : Method to get Budget List
     * @param {Object} : Takes no parameter
     * @return {Object} : Budget List 
     */
    SavingsPotPresentationController.prototype.getBudgetList = function() {
        var type = OLBConstants.SAVINGS_POT_TYPE.BUDGET;
        var budget = [];
        if (this.savingsPotDetails.length > 0) {
            this.savingsPotDetails.forEach(function(item) {
                if (item.potType.toLowerCase() === type) {
                    budget.push(item);
                }
            })
        }
        return budget;
    };
    /**
     * getGoalList : Method to get Goal List
     * @param {Object} : None
     * @return {Object} : Goal List 
     */
    SavingsPotPresentationController.prototype.getGoalList = function() {
        var type = OLBConstants.SAVINGS_POT_TYPE.GOAL;
        var goals = [];
        if (this.savingsPotDetails.length > 0) {
            this.savingsPotDetails.forEach(function(item) {
                if (item.potType.toLowerCase() === type) {
                    goals.push(item);
                }
            })
        }
        return goals;
    };
    /**
     * setSavingsPotDetails : Method to set Savings Pot Details
     * @member of {SavingsPotModule_PresentationController}
     * @param {Object} : savingsPotDetails - savings pot data
     * @return {Object} : None 
     */
    SavingsPotPresentationController.prototype.setSavingsPotDetails = function(savingsPotDetails) {
        this.savingsPotDetails = savingsPotDetails;
    };
    /**
     * getSavingsPotDetails : Method to get Savings Pot Details
     * @member of {SavingsPotModule_PresentationController}
     * @param {Object} : None
     * @return {Object} : savingsPotDetails - savings pot data 
     */
    SavingsPotPresentationController.prototype.getSavingsPotDetails = function() {
        return this.savingsPotDetails;
    };
    /**
     * setSavingsPotCategories : Method to set Savings Pot Categories
     * @member of {SavingsPotModule_PresentationController}
     * @param {Object} : savingsPotCategories - savings pot savingsPotCategories
     * @return {Object} : None 
     */
    SavingsPotPresentationController.prototype.setSavingsPotCategories = function(savingsPotCategories) {
        this.savingsPotCategories = savingsPotCategories;
    }
    /**
     * getSavingsPotCategories : Method to set Savings Pot Categories
     * @member of {SavingsPotModule_PresentationController}
     * @param {Object} : None
     * @return {Object} : savingsPotCategories - savings pot savingsPotCategories 
     */
    SavingsPotPresentationController.prototype.getSavingsPotCategories = function() {
        return this.savingsPotCategories;
    }
    /**
     * setSavingsPotCurrentAccount : Method to set Savings Pot Details
     * @member of {SavingsPotModule_PresentationController}
     * @param {String} : accountId - accountId
     * @return {Object} : None 
     */
    SavingsPotPresentationController.prototype.setSavingsPotCurrentAccount = function(accountId) {
        this.associatedAccountId = accountId;
    }
    /**
     * getSavingsPotCurrentAccount : Method to set Savings Pot Details
     * @member of {SavingsPotModule_PresentationController}
     * @param {Object} : None
     * @return {Object} : accountId - accountId
     */
    SavingsPotPresentationController.prototype.getSavingsPotCurrentAccount = function() {
        return this.associatedAccountId;
    }
    /**
     * getSavingPotForId : Method to get savings pot based on id
     * @member of {SavingsPotModule_PresentationController}
     * @param {Object} : savingPotId - saving Id
     * @return {Object} : savingPot Object
     */
    SavingsPotPresentationController.prototype.getSavingPotForId = function(savingPotId) {
        if (this.savingsPotDetails.length > 0) {
            for (var index = 0; index < this.savingsPotDetails.length; index++) {
                if (this.savingsPotDetails[index].savingsPotId === savingPotId) {
                    return this.savingsPotDetails[index];
                }
            }
        }
        return null;
    }
    /**
     * closeSavingsPot : Method to close savings pot
     * @member of {SavingsPotModule_PresentationController}
     * @param {Object} : savingsPotId - saving pot Id
     * @return {Object} : None
     */
    SavingsPotPresentationController.prototype.closeSavingsPot = function(savingsPotId, accountID) {
        var params = {
            "savingsPotId": savingsPotId,
            "potAccountId": accountID
        }
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true,
            }
        });
        applicationManager.getSavingsPotManager().closeSavingsPot(params, this.onCloseSavingsPotSuccess.bind(this, accountID), this.onCloseSavingsPotFailure.bind(this));
    }

    SavingsPotPresentationController.prototype.onCloseSavingsPotSuccess = function(accountID) {
        this.fetchSavingsPot(accountID, null, true);
    }
    SavingsPotPresentationController.prototype.onCloseSavingsPotFailure = function() {
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: false,
            }
        });
    };
    /**
     * getAccount : Method to get account details
     * @member of {SavingsPotModule_PresentationController}
     * @param {String} : accountId - Account Identifier
     * @return {Object} : filteredAccounts - Account details
     */
    SavingsPotPresentationController.prototype.getAccount = function(accountId) {
        if (this.filteredAccounts.length > 0) {
            for (var index = 0; index < this.filteredAccounts.length; index++) {
                if (this.filteredAccounts[index].Account_id === accountId) {
                    return this.filteredAccounts[index];
                }
            }
        }
    }

    /**
     * getCurrentAccountSupportedCurrency : Method to get account's currency
     * @member of {SavingsPotModule_PresentationController}
     * @param {} : None
     * @return {currency Code} : currency code
     */
    SavingsPotPresentationController.prototype.getCurrentAccountSupportedCurrency = function() {
        var accountID = this.getSavingsPotCurrentAccount();
        var accountObject = this.getAccount(accountID);
        return accountObject.currencyCode ? accountObject.currencyCode : "USD";
    }

    return SavingsPotPresentationController;
});