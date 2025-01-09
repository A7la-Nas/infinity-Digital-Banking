define(['CommonUtilities', 'IBANUtils', 'OLBConstants'], function(CommonUtilities, IBANUtils, OLBConstants) {
    var wireTransferForm = "frmWireTransfer";
    var frmWireTransfersWindow = "frmWireTransfersWindow";
    var frmConfirmDetails = "frmConfirmDetails";
    var frmWireTransferMakeTransfer = "frmWireTransferMakeTransfer";
    var wireTransferAddRecipientForm = "frmWireTransferAddKonyAccountStep1";
    var wireTransferAddRecipientFormStep2 = "frmWireTransferAddKonyAccountStep2";
    var wireTransferAddRecipientConfirmForm = "frmWireTransferAddKonyAccountConfirm";
    var wireTransferAddRecipientAckForm = "frmWireTransferAddKonyAccountAck";
    var wireTransferAddInternationalRecipientFormStep1 = "frmWireTransferAddInternationalAccountStep1";
    var wireTransferAddInternationalRecipientFormStep2 = "frmWireTransferAddInternationalAccountStep2";
    var wireTransferAddInternationalRecipientConfirmForm = "frmWireTransferAddInternationalAccountConfirm";
    var wireTransferAddInternationalRecipientAckForm = "frmWireTransferAddInternationalAccountAck";
    var wireTransferOTPstep1 = "frmWireTransferOneTimePaymentStep1";
    var wireOneTimeTransferFormStep2 = "frmWireTransferOneTimePaymentStep2";
    var frmWireTransfersManageRecipients = "frmWireTransfersManageRecipients";
    var progressBarShowCount = 0;
    var frmWireTransfersRecent = "frmWireTransfersRecent";
    var wireTransferActivationForm = "frmActivateWireTransfer";
    var wireTransferInboundData = "frmAccountInfoForInboundTransfer";
    var frmWireTransferViewActivity = "frmWireTransferViewActivity";
    this.transferData = "";
    this.fileData = "";
    this.checkingAccounts = "";
    this.bulkWireFileInfo = "";
    this.accounts = "";
    this.recipientData = "";
    this.selectedRecipients = "";
    this.editselectedRecipients = "";
    this.templateData = "";

    function WireTransferPresentationController() {
        var configurationManager = applicationManager.getConfigurationManager();
        this.bulkwirefilesConfig = {
            'sortByParam': 'createdts',
            'sortOrder': OLBConstants.DESCENDING_KEY,
            'pageOffset': OLBConstants.DEFAULT_OFFSET,
            'pageSize': OLBConstants.PAGING_ROWS_LIMIT
        };
        this.bulkwiretemplatesConfig = {
            'sortByParam': 'recipientName',
            'sortOrder': OLBConstants.DESCENDING_KEY
        };
        this.bulkwiretransactionsConfig = {
            'sortByParam': 'transactionDate',
            'sortOrder': OLBConstants.DESCENDING_KEY,
            'pageOffset': OLBConstants.DEFAULT_OFFSET,
            'pageSize': OLBConstants.PAGING_ROWS_LIMIT
        };
        this.bulkwirefilelineitemsConfig = {
            'sortByParam': 'recipientName',
            'sortOrder': OLBConstants.DESCENDING_KEY
        };
        this.recipientData = [];
        this.checkingAccounts = [];
        this.primaryDetails = "";
        this.templateID = "";
        this.addRecFlag = false;
        this.selectedRecipients = [];
        this.statesAddManually = [];
        this.editselectedRecipients = [];
        this.payeeList = [];
        this.frmToNavigate = "frmWireTransferAddKonyAccountStep1";
        kony.mvc.Presentation.BasePresenter.call(this);
    }
    var recipientSortConfig = {
        'sortBy': 'nickName',
        'defaultSortBy': 'nickName',
        'order': OLBConstants.ASCENDING_KEY,
        'defaultOrder': OLBConstants.ASCENDING_KEY,
        'offset': OLBConstants.DEFAULT_OFFSET,
        'limit': OLBConstants.PAGING_ROWS_LIMIT
    }
    var recentTransactionSortConfig = {
        'sortBy': 'transactionDate',
        'defaultSortBy': 'transactionDate',
        'order': OLBConstants.DESCENDING_KEY,
        'defaultOrder': OLBConstants.DESCENDING_KEY,
        'offset': OLBConstants.DEFAULT_OFFSET,
        'limit': OLBConstants.PAGING_ROWS_LIMIT
    }
    inheritsFrom(WireTransferPresentationController, kony.mvc.Presentation.BasePresenter);
    WireTransferPresentationController.prototype.showAccountDetailsForInboundTransfers = function(onCancel) {
        this.showProgressBar();
        applicationManager.getAccountManager().fetchCheckingAccounts(this.checkingAccountsForInboundSuccess.bind(this, onCancel), this.serverError.bind(this));
    }
    WireTransferPresentationController.prototype.checkingAccountsForInboundSuccess = function(onCancel, checkingAccounts) {
        this.hideProgressBar();
        var accounts = checkingAccounts.filter(function(account) {
            if (applicationManager.getConfigurationManager().checkAccountAction(account.accountID, "DOMESTIC_WIRE_TRANSFER_CREATE") || applicationManager.getConfigurationManager().checkAccountAction(account.accountID, "INTERNATIONAL_WIRE_TRANSFER_CREATE"))
                return account;
        });
        accounts =  accounts.filter(account => {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
          }) 
        // applicationManager.getNavigationManager().navigateTo(wireTransferInboundData);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireTransferInboundData]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            accountDetailsForInbound: {
                checkingAccounts: accounts
            }
        }, wireTransferInboundData);
    }
	
	 WireTransferPresentationController.prototype.setManageRecipientData = function(data) {
		this.managerecipientData = data;
    };
    WireTransferPresentationController.prototype.getManageRecipientData = function(data) {
		return this.managerecipientData;
    };
    WireTransferPresentationController.prototype.setwireTransfersTransactions = function(data) {
		this.wireTransfersTransactions = data;
    };
    WireTransferPresentationController.prototype.getwireTransfersTransactions = function(data) {
		return this.wireTransfersTransactions;
    };

    /**Entry Point method - Checks for wire transfer activation and shows appropriate view . Check configuration inside.
     * @param {Object} context Context for initial view
     * @param {Transaction} [context.transactionObject] Transaction object for repeating wire transfer.
     * for now there is only wire_transfer and international_wire_transfer TnC available in spotlight, so not handling one time wire transfer case.
     * @param {string} [context.landingPageView] For Specifying what view to show makeTransfer|wireTransferHistory|myRecipients|addRecipient
     */
    WireTransferPresentationController.prototype.showOneTimeWireTransfer = function(context, onCancel) {
        context = context || {};
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        if (!this.checkForActivation()) {
          var type = OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC; //using domestic as one_time_wire_transfer Tnc is not configured in spotlight.
           this.showActivationScreen(type); // gettnc            
        } else {
            applicationManager.getNavigationManager().navigateTo({
                appName: 'WireTransferMA',
                friendlyName: wireTransferOTPstep1
            });
            // var obj = {
            //     "context": this,
            //     "callbackModelConfig": {
            //         [wireTransferOTPstep1]: true
            //     }
            // };
            // var navManager = kony.mvc.getNavigationManager();
            // navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                isLoading: true
            }, wireTransferOTPstep1);
            this.showLandingPageView(context.landingPageView, onCancel);
        }
    }
    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    WireTransferPresentationController.prototype.showWireTransferInternationalStep1 = function(context, onCancel) {
        context = context || {};
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        if (!this.checkForActivation()) {
            var type = OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL;
            this.showActivationScreen(type);
        } else {
            this.frmToNavigate = wireTransferAddInternationalRecipientFormStep1;
            this.showLandingPageView(context.landingPageView, onCancel);
        }
    }
    /**
     * Calls when fetch state is successful and map states on UI
     * @param {Object[]} states Id of the country
     */
    WireTransferPresentationController.prototype.onFetchStateSuccess = function(states) {
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm({
            states: states.region_details_view
        })
    }
    WireTransferPresentationController.prototype.showWireTransferAddRecipientStep2 = function(data, editPayee, states, modify) {
        var viewModel = {};
        viewModel.resetForm = {};
        viewModel.data = data;
        viewModel.states = states;
        viewModel.editPayee = editPayee;
        viewModel.modify = modify;
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        // applicationManager.getNavigationManager().navigateTo(wireTransferAddRecipientFormStep2);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireTransferAddRecipientFormStep2]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            resetForm: {}
        }, wireTransferAddRecipientFormStep2);
        applicationManager.getNavigationManager().updateForm(viewModel, wireTransferAddRecipientFormStep2);
        if (!this.checkForActivation()) {
            var type = OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC;
            this.showActivationScreen(type);
        }
    }
    /**
     * Fetch the states by given country Id
     * @param {string} countryId Id of the country
     */
    WireTransferPresentationController.prototype.fetchStates = function(countryId) {
        this.showProgressBar();
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.fetchRegionsByCountryCode(countryId, this.onFetchStateSuccess.bind(this), this.serverError.bind(this));
    }
    WireTransferPresentationController.prototype.getSpecifiedCitiesAndStates = function(addressSelection, addressId, states) {
        var self = this;
        var data = [];
        if (addressSelection === "country") {
            var statesList = [];
            for (var i = 0; i < Object.keys(states).length; ++i) {
                if (states[i].country_Id === addressId) {
                    statesList.push({region_Id:states[i].region_Id, 
                        region_Name:states[i].region_Name});
                }
            }
            data = {
                "states": statesList
            };
        } else if (addressSelection === "state") {
            var cityList = [];
            cityList.push(["lbl2", "Select a City"]);
            for (var j = 0; j < Object.keys(states).length; ++j) {
                if (states[j][2] === addressId) {
                    cityList.push([states[j][0], states[j][1]]);
                }
            }
            data = {
                "cities": cityList
            };
        }
        return data;
    };
    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    WireTransferPresentationController.prototype.showWireTransferAddRecipientStep1 = function(context, onCancel) {
        context = context || {};
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        if (!this.checkForActivation()) {
            var type = OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC;
            this.showActivationScreen(type);
        } else {
            this.frmToNavigate=wireTransferAddRecipientForm;
            this.showLandingPageView(context.landingPageView, onCancel);
        }
    }
    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    WireTransferPresentationController.prototype.showWireTransfer = function(context, onCancel) {
        context = context || {};
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        //applicationManager.getNavigationManager().navigateTo(wireTransferAddRecipientForm);
        applicationManager.getNavigationManager().updateForm({
            resetForm: {}
        }, wireTransferAddRecipientForm);
        if (!this.checkForActivation()) {
            var type = OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC;
            this.showActivationScreen(type);
        } else {
            this.showLandingPageView(context.landingPageView, onCancel);
        }
    }
    WireTransferPresentationController.prototype.showWireTransferAddInternationalRecipientStep2 = function(data, editPayee, states, modify) {
        //context = context || {};
        var viewModel = {};
        viewModel.resetForm = {};
        viewModel.data = data;
        viewModel.editPayee = editPayee;
        viewModel.states = states;
        viewModel.modify = modify;
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        // applicationManager.getNavigationManager().navigateTo(wireTransferAddInternationalRecipientFormStep2);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireTransferAddInternationalRecipientFormStep2]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm(viewModel, wireTransferAddInternationalRecipientFormStep2);
        if (!this.checkForActivation()) {
            var type = OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL;
            this.showActivationScreen(type);
        }
    }
    WireTransferPresentationController.prototype.showWireTransferAddRecipientConfirmScreen = function(data, edit) {
        //context = context || {};
        var viewModel = {};
        viewModel.resetForm = {};
        viewModel.data = data;
        //viewModel.editPayee = editPayee;
        if (edit)
            viewModel.modify = true;
        else
            viewModel.modify = false;
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        // applicationManager.getNavigationManager().navigateTo(wireTransferAddRecipientConfirmForm);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireTransferAddRecipientConfirmForm]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm(viewModel, wireTransferAddRecipientConfirmForm);
        if (!this.checkForActivation()) {
           var type = OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC;
            this.showActivationScreen(type);
        }
    }
    WireTransferPresentationController.prototype.showWireTransferAddInternationalRecipientConfirmScreen = function(data, edit) {
        //context = context || {};
        var viewModel = {};
        viewModel.resetForm = {};
        viewModel.data = data;
        if (edit)
            viewModel.modify = true;
        else
            viewModel.modify = false;
        //viewModel.editPayee = editPayee;
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        // applicationManager.getNavigationManager().navigateTo(wireTransferAddInternationalRecipientConfirmForm);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireTransferAddInternationalRecipientConfirmForm]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm(viewModel, wireTransferAddInternationalRecipientConfirmForm);
        if (!this.checkForActivation()) {
            var type = OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL;
            this.showActivationScreen(type);
        }
    }
    /**
     * Noitifies the UI for loading state.
     */
    WireTransferPresentationController.prototype.showProgressBar = function(form) {
        var formName = form || kony.application.getCurrentForm().id;
        applicationManager.getNavigationManager().updateForm({
            "isLoading": true
        }, formName);
    };
    /**
     * used to show the Transfer Page and executes the particular Page.
     * @param {string} frm  used to load the form
     * @param {object}  data  used to load the particular form and having key value pair.
     */
    WireTransferPresentationController.prototype.formData = function(form, data) {
        if (kony.application.getCurrentForm().id !== form) {
            // applicationManager.getNavigationManager().navigateTo(form);
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    [form]: true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
        }
        if (data) {
            applicationManager.getNavigationManager().updateForm(data, form);
        }
    };
    WireTransferPresentationController.prototype.showWireOneTimeTransferStep2 = function(context, data, states) {
        context = context || {};
        var viewModel = {};
        viewModel.resetForm = {};
        viewModel.data = data;
        viewModel.states = states;
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        // applicationManager.getNavigationManager().navigateTo(wireOneTimeTransferFormStep2);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireOneTimeTransferFormStep2]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm(viewModel, wireOneTimeTransferFormStep2);
        if (!this.checkForActivation()) {
            var type = OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC;
            this.showActivationScreen(type);
        } else {
            this.showLandingPageView(context.landingPageView);
        }
    }
    /**
     * Checkes from cached user preferences for wire transfer activation
     * @returns {boolean} returns true if wire transfer is activated or not
     */
    WireTransferPresentationController.prototype.checkForActivation = function() {
        var userObj = applicationManager.getUserPreferencesManager().getUserObj();
        var wireTransferEligible = userObj.isWireTransferEligible;
        var wireTransferActivated = userObj.isWireTransferActivated;
        //Known MF issue - boolean and string both checks needed
        return (wireTransferActivated === "true" || wireTransferActivated === true);
    }
    /**
     * Shows Wire Transfer Activation Screen
     */
    WireTransferPresentationController.prototype.showActivationScreen = function(type) {
        this.showProgressBar(wireTransferActivationForm);
        applicationManager.getAccountManager().fetchCheckingAccounts(this.onCheckingAccountOTPSuccess.bind(this, type), this.serverError.bind(this));
      
    }
    /**
     * @param {Account[]} checkingAccounts List of checking accounts
     * Called when fetching checking accounts is successfull for activation
     */
    WireTransferPresentationController.prototype.onCheckingAccountOTPSuccess = function(type, checkingAccounts) {
        this.hideProgressBar();
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        var accounts = checkingAccounts.filter(function(account) {
            if (applicationManager.getConfigurationManager().checkAccountAction(account.accountID, "DOMESTIC_WIRE_TRANSFER_CREATE") || applicationManager.getConfigurationManager().checkAccountAction(account.accountID, "INTERNATIONAL_WIRE_TRANSFER_CREATE"))
                return account;
        });
        accounts =  accounts.filter(account => {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
          }) 
        applicationManager.getNavigationManager().navigateTo({
            appName: 'WireTransferMA',
            friendlyName: wireTransferActivationForm
        });
      	// var obj = {
        //     "context": this,
        //     "callbackModelConfig": {
        //         "activate": true
        //     }
        // };
        // var navManager = kony.mvc.getNavigationManager();
        // navManager.navigate(obj);
        this.getTnC(type, wireTransferActivationForm, accounts);
    }
    /**
     * Handles the error for add payee
     */
    WireTransferPresentationController.prototype.onAddPayeeError = function(type, response) {
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm({
            saveRecipientServerError: {
                errorMessage: response.errorMessage,
                type: type
            }
        })
    }
    /**
     * Shows the landing page view
     * @param {string} [landingPageView=makeTransfer] For Specifying what view to show makeTransfer|wireTransferHistory|myRecipients|addRecipient
     */
    WireTransferPresentationController.prototype.showLandingPageView = function(landingPageView, onCancel) {
        landingPageView = landingPageView || "makeTransfer";
        switch (landingPageView) {
            case "makeTransfer":
                this.showMakeTransferRecipientList();
                break;
            case "wireTransferHistory":
                this.showRecentTransactions();
                break;
            case "myRecipients":
                this.showManageRecipientList();
                break;
            case "addRecipient":
                this.showAddPayee(applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC, onCancel);
                break;
            case "addRecipientStep2":
                this.showAddPayee(applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC);
                break;
            case "addRecipientInternational":
                this.showAddPayee(applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL, onCancel);
                break;
            case "addRecipientInternationalStep2":
                this.showAddPayee(applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL);
                break;
            case "oneTimeTransfer":
                this.showOneTimeTransfer(onCancel);
                break;
                //       default:
                //         this.showMakeTransferRecipientList();
        }
    }
    /**
     * Shows make transfer recipient list.
     */
    WireTransferPresentationController.prototype.showManageRecipientList = function(sortingInputs) {
        applicationManager.getNavigationManager().navigateTo({
            appName: 'WireTransferMA',
            friendlyName: frmWireTransfersManageRecipients
        });
        // var obj = {
        //     "context": this,
        //     "callbackModelConfig": {
        //         [frmWireTransfersManageRecipients]: true
        //     }
        // };
        // var navManager = kony.mvc.getNavigationManager();
        // navManager.navigate(obj);
        this.showProgressBar(frmWireTransfersManageRecipients);
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        this.fetchManageRecipientList(frmWireTransfersManageRecipients, sortingInputs);
    }
    /**
     * Shows  transfer recipient list.
     */
    WireTransferPresentationController.prototype.showExistingRecipientList = function(sortingInputs) {
        // applicationManager.getNavigationManager().navigateTo("frmCreateTempSelectRecipients");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmCreateTempSelectRecipients": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        this.showProgressBar("frmCreateTempSelectRecipients");
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        this.fetchExistingManageRecipientList(sortingInputs, "frmCreateTempSelectRecipients");
    }
    /**
     * Shows  transfer recipient list.
     */
    WireTransferPresentationController.prototype.showEditExistingRecipientList = function(sortingInputs) {
        // applicationManager.getNavigationManager().navigateTo("frmEditTempSelectRecipients");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmEditTempSelectRecipients": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        this.showProgressBar("frmEditTempSelectRecipients");
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        this.fetchUnselectedExistingManageRecipientList(sortingInputs, "frmEditTempSelectRecipients");
    }
    /**
     * Entry Point Method of One Time Transfer
     * @param {string} type type of the recipient "International/Domestic"
     */
    WireTransferPresentationController.prototype.showOneTimeTransfer = function() {
        this.showProgressBar();
        var asyncManager = applicationManager.getAsyncManager();
        var recipientManager = applicationManager.getRecipientsManager();
        var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
        var asyncItems = [
            asyncManager.asyncItem(recipientManager, 'fetchRegionsByCountryCode', [OLBConstants.WireTransferConstants.DOMESTIC_COUNTRY_NAME]),
            asyncManager.asyncItem(recipientManager, 'fetchCountriesList'),
            //asyncManager.asyncItem(applicationManager.getAccountManager(), 'fetchCheckingAccounts')
        ]
        asyncManager.callAsync(asyncItems, this.onOneTimeTransferDataSucccess.bind(this))
    }
    /**
     * One Time TRansfer Success
     * @param {AsyncResponse} asyncResponse Response of Async Calls
     */
    WireTransferPresentationController.prototype.onOneTimeTransferDataSucccess = function(asyncResponse) {
        applicationManager.getNavigationManager().updateForm({
            isLoading: true
        }, wireTransferOTPstep1);
        var responses = asyncResponse.responses;
        if (asyncResponse.isAllSuccess()) {
            this.showOneTimeTransferOnUI(responses[0].data.region_details_view, responses[1].data.records);
        } else {
            this.serverError.bind(this);
        }
    }
    /**
     * Show Add Recipient on UI
     * @param {Object[]} states list of states
     * @param {Object[]} countries list of countries
     * @param {Object[]} checkingAccounts list of countries
     */
    WireTransferPresentationController.prototype.showOneTimeTransferOnUI = function(states, countries, checkingAccounts) {
        applicationManager.getNavigationManager().updateForm({
            oneTimeTransfer: {
                states: states,
                countries: countries,
                checkingAccounts: checkingAccounts
            }
        }, wireTransferOTPstep1);
        this.hideProgressBar();
    }
    /**
     * Entry Point Method of Add Payee
     * @param {string} type type of the recipient "International/Domestic"
     */
    WireTransferPresentationController.prototype.showAddPayee = function(type, onCancel) {
        this.showProgressBar();
        var asyncManager = applicationManager.getAsyncManager();
        var recipientManager = applicationManager.getRecipientsManager();
        var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
        var asyncItems = [
            asyncManager.asyncItem(recipientManager, 'fetchRegionsByCountryCode', [OLBConstants.WireTransferConstants.DOMESTIC_COUNTRY_NAME])
        ]
        if (type === applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL) {
            asyncItems.push(asyncManager.asyncItem(recipientManager, 'fetchCountriesList'))
        }
        asyncManager.callAsync(asyncItems, this.onAddPayeeDataFetchSuccess.bind(this, type, onCancel))
    }
    /**
     * Noitifies the UI for end of a loading state.
     */
    WireTransferPresentationController.prototype.hideProgressBar = function(form) {
        var formName = form || kony.application.getCurrentForm().id;
        applicationManager.getNavigationManager().updateForm({
            "isLoading": false
        }, formName);
    };
    /**
     * Shows the add payee on UI - Called when initial data is loaded
     * @param {string} type Type of Recipient - Domestic/International
     * @param {AsyncResponse} asyncResponse Response of Async Calls
     */
    WireTransferPresentationController.prototype.onAddPayeeDataFetchSuccess = function(type, onCancel, asyncResponse) {
        this.hideProgressBar();
        if (asyncResponse.isAllSuccess()) {
            var responses = asyncResponse.responses;
            var countries = responses[1] ? responses[1].data.records : [];
            applicationManager.getNavigationManager().navigateTo({
                appName: 'WireTransferMA',
                friendlyName: this.frmToNavigate
            });
            var form = this.frmToNavigate;
            // var obj = {
            //     "context": this,
            //     "callbackModelConfig": {
            //         [form]: true
            //     }
            // };
            // var navManager = kony.mvc.getNavigationManager();
            // navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                resetForm: {}
            }, form);
            this.showAddRecipientOnUI(responses[0].data.region_details_view, countries, type, onCancel, form);
        } else {
            this.serverError();
        }
    }
    WireTransferPresentationController.prototype.serverError = function() {
        CommonUtilities.showServerDownScreen();
    }
    /**
     * Save Wire Transfer Payee
     * @param {Object} recipientData Data of the recipient
     * @param {string} type type of the recipient International/Domestic
     */
    WireTransferPresentationController.prototype.saveWireTransferPayee = function(recipientData, type) {
        this.showProgressBar();
        var recipientManager = applicationManager.getRecipientsManager();
        var data = {
            "payeeNickName": recipientData.recipientAccountDetails.payeeNickName,
            "payeeAccountNumber": recipientData.recipientAccountDetails.payeeAccountNumber,
            "payeeName": recipientData.recipientDetails.payeeName,
            "zipCode": recipientData.recipientDetails.zipCode,
            "cityName": recipientData.recipientDetails.cityName,
            "state": recipientData.recipientDetails.state,
            "addressLine1": recipientData.recipientDetails.addressLine1,
            "addressLine2": recipientData.recipientDetails.addressLine2,
            "type": recipientData.recipientDetails.type,
            "country": recipientData.recipientDetails.country,
            "bankName": recipientData.recipientAccountDetails.bankName,
            "bankAddressLine1": recipientData.recipientAccountDetails.bankAddressLine1,
            "bankAddressLine2": recipientData.recipientAccountDetails.bankAddressLine2,
            "bankCity": recipientData.recipientAccountDetails.bankCity,
            "bankState": recipientData.recipientAccountDetails.bankState,
            "bankZip": recipientData.recipientAccountDetails.bankZip,
            "wireAccountType": type,
            "isBusinessPayee": recipientData.recipientAccountDetails.isBusinessPayee,
            "cif": recipientData.cif
        }
        if (type === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) {
            data.routingCode = recipientData.recipientAccountDetails.routingCode;
            data.country = recipientData.recipientDetails.country;
            recipientManager.saveWireTransferRecipient(data, this.showAddRecipientAcknowledgement.bind(this, data, recipientData.cifSegData), this.onAddKonyPayeeError.bind(this, type));
        } else {
            data.swiftCode = recipientData.recipientAccountDetails.swiftCode;
            data.country = recipientData.recipientDetails.country;
            if (IBANUtils.isCountrySupportsIBAN(recipientData.recipientDetails.country)) {
                data.iban = recipientData.recipientAccountDetails.IBAN;
            } else {
                data.internationalRoutingCode = recipientData.recipientAccountDetails.internationalRoutingCode;
            }
            recipientManager.saveWireTransferRecipient(data, this.showAddRecipientInternationalAcknowledgement.bind(this, data, recipientData.cifSegData), this.onAddInternationalPayeeError.bind(this, type));

        }
    }
    /**
     * Handles the error for add payee
     */
    WireTransferPresentationController.prototype.onAddKonyPayeeError = function(type, response) {
        this.hideProgressBar();
        var viewModel = {};
        viewModel.serverError = response.errorMessage;
        // applicationManager.getNavigationManager().navigateTo(wireTransferAddRecipientForm);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireTransferAddRecipientForm]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm(viewModel, wireTransferAddRecipientForm);
    }
    /**
     * Calls when add payee is successfull
     * @param {Object} data Object containing data of payee
     * @param {Object} addPayeeResponse Object containing add payee response
     */
    WireTransferPresentationController.prototype.showAddRecipientAcknowledgement = function(data, cifSegData, addPayeeResponse) {
        this.hideProgressBar();
        data.payeeId = addPayeeResponse.payeeId;
        data.cifSegData = cifSegData;
        // applicationManager.getNavigationManager().navigateTo(wireTransferAddRecipientAckForm);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireTransferAddRecipientAckForm]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        var viewModel = {};
        viewModel.resetForm = {};
        viewModel.data = data;
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        applicationManager.getNavigationManager().updateForm(viewModel, wireTransferAddRecipientAckForm);
        //     applicationManager.getNavigationManager().updateForm({
        //       addRecipientAcknowledgement: data
        //     })
    }
    /**
     * Handles the error for add payee
     */
    WireTransferPresentationController.prototype.onAddInternationalPayeeError = function(type, response) {
        this.hideProgressBar();
        // applicationManager.getNavigationManager().navigateTo(wireTransferAddInternationalRecipientFormStep1);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireTransferAddInternationalRecipientFormStep1]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            saveRecipientServerError: {
                errorMessage: response.errorMessage,
                type: type
            }
        }, wireTransferAddInternationalRecipientFormStep1);
    }
    /**
     * Calls when add payee is successfull
     * @param {Object} data Object containing data of payee
     * @param {Object} addPayeeResponse Object containing add payee response
     */
    WireTransferPresentationController.prototype.showAddRecipientInternationalAcknowledgement = function(data, cifSegData, addPayeeResponse) {
        this.hideProgressBar();
        data.payeeId = addPayeeResponse.payeeId;
        data.cifSegData = cifSegData;
        // applicationManager.getNavigationManager().navigateTo(wireTransferAddInternationalRecipientAckForm);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireTransferAddInternationalRecipientAckForm]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        var viewModel = {};
        viewModel.resetForm = {};
        viewModel.data = data;
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        applicationManager.getNavigationManager().updateForm(viewModel, wireTransferAddInternationalRecipientAckForm);
        //     applicationManager.getNavigationManager().updateForm({
        //       addRecipientAcknowledgement: data
        //     })
    }
    /**
     * Show Add Recipient on UI
     * @param {Object[]} states list of states
     * @param {Object[]} countries list of countries
     * @param {string} type type of recipient - International/Domestic
     */
    WireTransferPresentationController.prototype.showAddRecipientOnUI = function(states, countries, type, onCancel, form) {
        applicationManager.getNavigationManager().updateForm({
            addPayee: {
                states: states,
                countries: countries,
                type: type,
                onCancel: onCancel
            }
        }, form);
    }
    /**
     * Increments the page and fetch the new page for make transfer recipients
     */
    WireTransferPresentationController.prototype.getNextMakeTransferRecipients = function() {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getNextPage();
        this.fetchMakeTransferRecipientList();
    }
    /**
     * Decrements the page and fetch the previous page for make transfer recipients
     */
    WireTransferPresentationController.prototype.getPrevioustMakeTransferRecipients = function() {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getPreviousPage();
        this.fetchMakeTransferRecipientList();
    }
    /**
     * Increments the page and fetch the new page for make transfer recipients
     */
    WireTransferPresentationController.prototype.getNextManageRecipients = function() {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getNextPage();
        this.fetchManageRecipientList(frmWireTransfersManageRecipients);
    }
    /**
     * Decrements the page and fetch the previous page for make transfer recipients
     */
    WireTransferPresentationController.prototype.getPreviousManageRecipients = function() {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getPreviousPage();
        this.fetchManageRecipientList(frmWireTransfersManageRecipients);
    }

    WireTransferPresentationController.prototype.getLimits = function(featureAction, formToNavigateTo) {
        applicationManager.getConfigurationManager().fetchLimitsForAnAction(featureAction, this.onFetchLimitSuccess.bind(this, formToNavigateTo), this.onFetchLimitError.bind(this, formToNavigateTo));
    }
    WireTransferPresentationController.prototype.onFetchLimitSuccess = function(formToNavigateTo, limits) {
        var viewModel = {
            limits: limits
        };
        applicationManager.getNavigationManager().updateForm(viewModel, formToNavigateTo);
    }
    WireTransferPresentationController.prototype.onFetchLimitError = function(formToNavigateTo, response) {
        var viewModel = {
            errorResponse: response
        };
        applicationManager.getNavigationManager().updateForm(viewModel, formToNavigateTo);
    }
    /**
     * Shows make transfer recipient list.
     */
    WireTransferPresentationController.prototype.fetchWireTransactions = function(sortingInputs) {
        var paginationManager = applicationManager.getPaginationManager();
        var paginationValues = paginationManager.getValues(recentTransactionSortConfig, sortingInputs);
        var params = {
            firstRecordNumber: paginationValues.offset,
            lastRecordNumber: paginationValues.limit,
            sortBy: paginationValues.sortBy,
            order: paginationValues.order
        }
        this.showProgressBar();
		params.lastRecordNumber = null;
        applicationManager.getTransactionManager().fetchWireTransactions(params, this.onWireTransactionFetchSuccess.bind(this), this.serverError.bind(this));
    }
    /**
     * Show Server Flex on UI
     * @param {string} errorMessage Non breaking error message
     */
    WireTransferPresentationController.prototype.showServerErrorFlex = function(errorMessage, formName) {
        applicationManager.getNavigationManager()
            .updateForm({
                serverError: errorMessage
            }, formName);
    }
    /**
     * Shows make transfer recipient list.
     */
    WireTransferPresentationController.prototype.fetchManageRecipientList = function(formName, sortingInputs) {
        this.showProgressBar();
        var paginationManager = applicationManager.getPaginationManager();
        var searchString = sortingInputs ? sortingInputs.searchString : null;
        var params = {};
        if (typeof searchString === "string" && searchString.length > 0) {
            params.searchString = searchString;
        } else {
            params = paginationManager.getValues(recipientSortConfig, sortingInputs);
        }
		params.limit = null;
        applicationManager.getRecipientsManager().fetchWireTransferRecipients(params, this.manageRecipientFetchSuccess.bind(this, searchString, formName), this.serverError.bind(this));
    }


    /**
     * Shows Wire transfer recipient list.
     */
    WireTransferPresentationController.prototype.fetchUnselectedExistingManageRecipientList = function(sortingInputs, form) {
        var scope = this;
        scope.showProgressBar();
        var searchString = sortingInputs ? sortingInputs.searchString : null;
        var params = {
            "bulkWireTemplateID": scope.getBulkWireTemplateID(),
            "sortByParam": "name",
            "sortOrder": "asc",
            "searchString": searchString
        };
        applicationManager.getRecipientsManager().fetchUnselectedWireTransferRecipients(params, this.manageRecipientFetchSuccess.bind(this, searchString, form), this.serverError.bind(this));
    }

    /**
     * Shows Wire transfer recipient list.
     */
    WireTransferPresentationController.prototype.fetchExistingManageRecipientList = function(sortingInputs, formName) {
        this.showProgressBar();
        var searchString = sortingInputs ? sortingInputs.searchString : null;
        var params = {};
        applicationManager.getRecipientsManager().fetchWireTransferRecipients(params, this.manageRecipientFetchSuccess.bind(this, searchString, formName), this.serverError.bind(this, formName));
    }
    /**
     * Called when recipient list fetch is successful for make transfer
     * @param {Payee[]} wireTransferRecipients Array of Payee Objects to be shown on UI
     */
    WireTransferPresentationController.prototype.manageRecipientFetchSuccess = function(searchString, formName, wireTransferRecipients) {
        var paginationValues = applicationManager.getPaginationManager().getValues(recipientSortConfig);
        paginationValues.limit = wireTransferRecipients.length;
        this.hideProgressBar();
        if (wireTransferRecipients.length > 0 || paginationValues.offset === 0) {
            applicationManager.getPaginationManager().updatePaginationValues();
            applicationManager.getNavigationManager().updateForm({
                manageRecipients: {
                    recipients: wireTransferRecipients,
                    config: paginationValues,
                    searchString: searchString
                }
            }, formName);
        } else if (paginationValues.offset !== 0) {
            applicationManager.getNavigationManager().updateForm({
                noMoreRecords: true
            }, formName);
        }
        this.hideProgressBar();
    }
    /**
     * Increments the page and fetch the new page for make transfer recipients
     */
    WireTransferPresentationController.prototype.getNextWireTransactions = function() {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getNextPage();
        this.paginateTransactions();
    }
    /**
     * Decrements the page and fetch the previous page for make transfer recipients
     */
    WireTransferPresentationController.prototype.getPreviousWireTransactions = function() {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getPreviousPage();
        this.paginateTransactions();
    }
    WireTransferPresentationController.prototype.paginateTransactions = function(sortingInputs){
        var self = this;
        function manageRecipientSuccessCallback(wiretransferRecipient){    	
            this.payeeList = wiretransferRecipient;	
            // applicationManager.getNavigationManager().navigateTo(frmWireTransfersRecent);
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    [frmWireTransfersRecent]: true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            self.showProgressBar(frmWireTransfersRecent);
            self.fetchWireTransactions(sortingInputs,wiretransferRecipient);
        }
        applicationManager.getRecipientsManager().fetchWireTransferRecipients(sortingInputs,manageRecipientSuccessCallback.bind(this), this.serverError.bind(this));
    }
    /**
     * Shows make transfer recipient list.
     */
    WireTransferPresentationController.prototype.fetchMakeTransferRecipientList = function(sortingInputs) {
        this.showProgressBar(frmWireTransfersWindow);
        var paginationManager = applicationManager.getPaginationManager();
        var searchString = sortingInputs ? sortingInputs.searchString : null;
        var params = {};
        if (typeof searchString === "string" && searchString.length > 0) {
            params.searchString = searchString;
        } else {
            params = paginationManager.getValues(recipientSortConfig, sortingInputs);
        }
		params.limit = null;
        applicationManager.getRecipientsManager().fetchWireTransferRecipients(params, this.makeTransferRecipientFetchSuccess.bind(this, searchString), this.serverError.bind(this));
    }
    /**
     * Starts MFA for Wire Transfer
     * @param {Object} transferData Object containg data for wire transfer
     */
    WireTransferPresentationController.prototype.authorizeWireTransfer = function(transferData) {
        //Removed OLD MFA
        this.createWireTransfer(transferData);
    }
    /**
     * Calls UserPreferencesManager for activating wire transfer for user
     * @param {string} defaultAccountForWireTransfers Default Account for wire transfers
     */
    WireTransferPresentationController.prototype.activateWireTransfer = function(defaultAccountForWireTransfers) {
        this.showProgressBar();
        applicationManager.getUserPreferencesManager().activateWireTransferForUser(defaultAccountForWireTransfers, this.onActivationSuccess.bind(this), this.onActivationError.bind(this));
    }
    /**
     * Calls if activation is successfull for user, and show landing page view   *
     */
    WireTransferPresentationController.prototype.onActivationSuccess = function() {
        this.hideProgressBar();
        var userObj = applicationManager.getUserPreferencesManager().getUserObj();
        userObj.isWireTransferActivated = "true";
        this.showLandingPageView();
    }
    /**
     * Calls if activation is not successfull for user, and shows error page
     */
    WireTransferPresentationController.prototype.onActivationError = function() {
        CommonUtilities.showServerDownScreen();
    }
    /**
     * Calls Transaction Manager and creates a transaction of wire transfer type.
     * @param {Object} transferData Object containing data for wie transfer
     */
    WireTransferPresentationController.prototype.createWireTransfer = function(transferData) {
        this.showProgressBar();
        var mfaManager = applicationManager.getMFAManager();
        // mfaManager.setMFAOperationType("CREATE");
        // var displayName =  applicationManager.getPresentationUtility().MFA.getDisplayNameForTransfer(transferData.payeeObject.wireAccountType);
        //  applicationManager.getPresentationUtility().MFA.getServiceIdBasedOnDisplayName(displayName);
        //  var mfaParams = {
        //         serviceName: mfaManager.getServiceId(),
        //     };
        var transactionManager = applicationManager.getTransactionManager();
        var payeeObj = transferData.payeeObject;
        //var transactionsModel  =  kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Transactions");
        if (payeeObj.payeeId) {
            var newTransaction = {
                "payeeId": payeeObj.payeeId,
                "amount": transferData.amount,
                "fromAccountNumber": transferData.fromAccountNumber,
                "transactionsNotes": transferData.reasonForTransfer,
                "transactionType": applicationManager.getConfigurationManager().OLBConstants.TRANSACTION_TYPE.WIRE,
                "payeeCurrency": transferData.currency,
                "transactionCurrency": transferData.currency,
                "payeeName": payeeObj.payeeName,
                "payeeNickName": payeeObj.payeeNickName,

                "payeeAccountNumber": payeeObj.accountNumber,
                "payeeAddressLine1": payeeObj.addressLine1,
                "wireAccountType": payeeObj.wireAccountType,
                "bankName": payeeObj.bankName,
                "routingNumber": payeeObj.routingCode || payeeObj.internationalRoutingCode,
                "zipCode": payeeObj.zipCode,
                "cityName": payeeObj.cityName,
                "state": payeeObj.state,
                "bankAddressLine1": payeeObj.bankAddressLine1,
                "bankAddressLine2": payeeObj.bankAddressLine2,
                "bankCity": payeeObj.bankCity,
                "bankState": payeeObj.bankState,
                "bankZip": payeeObj.bankZip,
                "payeeType": payeeObj.type,
                "payeeAddressLine2": payeeObj.addressLine2
            }
        } else {
            var newTransaction = {
                "payeeId": payeeObj.payeeId,
                "amount": transferData.amount,
                "fromAccountNumber": transferData.fromAccountNumber,
                "payeeAccountNumber": payeeObj.payeeAccountNumber,
                "payeeAddressLine1": payeeObj.addressLine1,
                "payeeName": payeeObj.payeeName,
                "payeeNickName": payeeObj.payeeNickName,
                "transactionsNotes": transferData.reasonForTransfer,
                "transactionType": applicationManager.getConfigurationManager().OLBConstants.TRANSACTION_TYPE.WIRE,
                "payeeCurrency": transferData.currency,
                "transactionCurrency": transferData.currency,
                "wireAccountType": payeeObj.wireAccountType,
                "bankName": payeeObj.bankName,
                "routingNumber": payeeObj.routingCode || payeeObj.internationalRoutingCode,
                "zipCode": payeeObj.zipCode,
                "cityName": payeeObj.cityName,
                "state": payeeObj.state,
                "bankAddressLine1": payeeObj.bankAddressLine1,
                "bankAddressLine2": payeeObj.bankAddressLine2,
                "bankCity": payeeObj.bankCity,
                "bankState": payeeObj.bankState,
                "bankZip": payeeObj.bankZip,
                "payeeType": payeeObj.type,
                "payeeAddressLine2": payeeObj.addressLine2
            }
        }
        if (payeeObj.wireAccountType === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) {
            mfaManager.setMFAFlowType("DOMESTIC_WIRE_TRANSFER");
            if (payeeObj.payeeId)
                transactionManager.createDomesticWireTransfer(newTransaction, this.showMakeTransferAcknowledgement.bind(this), this.showMakeTransferError.bind(this));
            else
                transactionManager.createDomesticWireTransfer(newTransaction, this.showMakeTransferAcknowledgement.bind(this), this.showMakeTransferErrorOneTimePayment.bind(this));
        } else {
            mfaManager.setMFAFlowType("INTERNATIONAL_WIRE_TRANSFER");
            if (payeeObj.payeeId)
                transactionManager.createInternationalWireTransfer(newTransaction, this.showMakeTransferAcknowledgement.bind(this), this.showMakeTransferError.bind(this));
            else
                transactionManager.createInternationalWireTransfer(newTransaction, this.showMakeTransferAcknowledgement.bind(this), this.showMakeTransferErrorOneTimePayment.bind(this));
        }
    }
    /**
     * Calls when wire transfer is successfull
     * @param {Object} transactionResponse Object containing transaction response
     */
    WireTransferPresentationController.prototype.showMakeTransferAcknowledgement = function(transactionResponse) {
        var mfaManager = applicationManager.getMFAManager();
        var operationName = this.getOperationName();
        if (transactionResponse.referenceId || transactionResponse.status) {
            this.hideProgressBar();
            // applicationManager.getNavigationManager().navigateTo(frmConfirmDetails);
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    [frmConfirmDetails]: true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                wireTransferAcknowledgement: {
                    referenceId: transactionResponse.referenceId,
                    status: transactionResponse.status,
                    message: transactionResponse.message
                }
            }, frmConfirmDetails);
        } else if (transactionResponse.MFAAttributes) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": applicationManager.getMFAManager().getMFAFlowType(),
                "response": transactionResponse,
                "objectServiceDetails": {
                    "action": "Wire Transfer",
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
    /**
     * Calls when wire transfer is not successfull
     * @param {Object} transactionResponse Object containing transaction response
     */
    WireTransferPresentationController.prototype.showMakeTransferError = function(transactionResponse) {
        this.hideProgressBar();
        // applicationManager.getNavigationManager().navigateTo(frmWireTransferMakeTransfer);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [frmWireTransferMakeTransfer]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            wireTransferError: {
                errorMessage: transactionResponse.errorMessage
            }
        }, frmWireTransferMakeTransfer);
    }

    /**
     * Calls when wire transfer is not successfull
     * @param {Object} transactionResponse Object containing transaction response
     */
    WireTransferPresentationController.prototype.showMakeTransferErrorOneTimePayment = function(transactionResponse) {
        this.hideProgressBar();
        // applicationManager.getNavigationManager().navigateTo("frmWireTransferOneTimePaymentStep3");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmWireTransferOneTimePaymentStep3": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            wireTransferError: {
                errorMessage: transactionResponse.errorMessage
            }
        }, "frmWireTransferOneTimePaymentStep3");
    }
    /**
     * Called when recipient list fetch is successful for make transfer
     * @param {Payee[]} wireTransferRecipients Array of Payee Objects to be shown on UI
     */
    WireTransferPresentationController.prototype.makeTransferRecipientFetchSuccess = function(searchString, wireTransferRecipients) {
        var paginationValues = applicationManager.getPaginationManager().getValues(recipientSortConfig);
        paginationValues.limit = wireTransferRecipients.length;
        this.hideProgressBar();
        if (wireTransferRecipients.length > 0 || paginationValues.offset === 0) {
            applicationManager.getPaginationManager().updatePaginationValues();
            applicationManager.getNavigationManager().updateForm({
                makeTransferRecipients: {
                    recipients: wireTransferRecipients,
                    config: paginationValues,
                    searchString: searchString
                }
            }, frmWireTransfersWindow);
        } else if (paginationValues.offset !== 0) {
            applicationManager.getNavigationManager().updateForm({
                noMoreRecords: true
            }, frmWireTransfersWindow);
        }
    }
    WireTransferPresentationController.prototype.updateRecipient = function(editRecipient, type, config) {
        var data = {
            "payeeName": editRecipient.recipientDetails.payeeName,
            "zipCode": editRecipient.recipientDetails.zipCode,
            "cityName": editRecipient.recipientDetails.cityName,
            "state": editRecipient.recipientDetails.state,
            "addressLine1": editRecipient.recipientDetails.addressLine1,
            "addressLine2": editRecipient.recipientDetails.addressLine2,
            "type": editRecipient.recipientDetails.type,
            "country": editRecipient.recipientDetails.country,
            "payeeId": editRecipient.recipientDetails.payeeId,
            "wireAccountType": type,
            "routingCode": editRecipient.recipientAccountDetails.routingCode,
            "swiftCode": editRecipient.recipientAccountDetails.swiftCode,
            "internationalRoutingCode": editRecipient.recipientAccountDetails.internationalRoutingCode,
            "accountNumber": editRecipient.recipientAccountDetails.payeeAccountNumber,
            "payeeNickName": editRecipient.recipientAccountDetails.payeeNickName,
            "bankName": editRecipient.recipientAccountDetails.bankName,
            "bankAddressLine1": editRecipient.recipientAccountDetails.bankAddressLine1,
            "bankAddressLine2": editRecipient.recipientAccountDetails.bankAddressLine2,
            "bankCity": editRecipient.recipientAccountDetails.bankCity,
            "bankState": editRecipient.recipientAccountDetails.bankState,
            "bankZip": editRecipient.recipientAccountDetails.bankZip,
            "isBusinessPayee": editRecipient.recipientAccountDetails.isBusinessPayee,
            "iban": editRecipient.recipientAccountDetails.IBAN,
            "cif": editRecipient.cif
        };
        if (type === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) {
            delete data.swiftCode;
            applicationManager
                .getRecipientsManager()
                .updateWireTransferRecipient(data, this.onWireRecipientUpdatedSuccess.bind(this, data, editRecipient.cifSegData), this.onWireRecipientUpdateError.bind(this));
        } else {
            delete data.routingCode;
            applicationManager
                .getRecipientsManager()
                .updateWireTransferRecipient(data, this.onWireInternationalRecipientUpdatedSuccess.bind(this, data, editRecipient.cifSegData), this.onWireRecipientUpdateError.bind(this));
        }       
    }
    WireTransferPresentationController.prototype.onWireRecipientUpdatedSuccess = function(data, cifSegData) {
        this.hideProgressBar();
        // applicationManager.getNavigationManager().navigateTo(wireTransferAddRecipientAckForm);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireTransferAddRecipientAckForm]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        var viewModel = {};
        viewModel.resetForm = {};
        viewModel.editData = data;
        viewModel.editData.cifSegData = cifSegData;
        viewModel.editRecipientSuccessMsg = data;
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        applicationManager.getNavigationManager().updateForm(viewModel, wireTransferAddRecipientAckForm);
    }
    WireTransferPresentationController.prototype.onWireInternationalRecipientUpdatedSuccess = function(data, cifSegData) {
        this.hideProgressBar();
        // applicationManager.getNavigationManager().navigateTo(wireTransferAddInternationalRecipientAckForm);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireTransferAddInternationalRecipientAckForm]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        var viewModel = {};
        viewModel.resetForm = {};
        viewModel.editData = data;
        viewModel.editData.cifSegData = cifSegData;
        viewModel.editRecipientSuccessMsg = data;
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        applicationManager.getNavigationManager().updateForm(viewModel, wireTransferAddInternationalRecipientAckForm);
    }
    /**
     * Shows make transfer recipient list.
     */
    WireTransferPresentationController.prototype.showMakeTransferRecipientList = function(sortingInputs) {
        applicationManager.getNavigationManager().navigateTo({appName: 'WireTransferMA', friendlyName: frmWireTransfersWindow});
      	// var obj = {
        //     "context": this,
        //     "callbackModelConfig": {
        //         "window": true
        //     }
        // };
        // var navManager = kony.mvc.getNavigationManager();
        // navManager.navigate(obj);
        this.showProgressBar(frmWireTransfersWindow);
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        this.fetchMakeTransferRecipientList(sortingInputs);
    }
    /**
     * Shows Make Transfer for a Payee Object
     * @param {Payee} payeeObject Payee Object for make transfer needs to be shown
     * @param {Object} [transactionObject] Transaction Object for repeat
     */
    WireTransferPresentationController.prototype.showMakeTransferForPayee = function(payeeObject, transactionObject, onCancel, formName) {
        this.showProgressBar();
        applicationManager.getAccountManager().fetchCheckingAccounts(this.onCheckingAccountSuccessForMakeTransfer.bind(this, payeeObject, transactionObject, onCancel, formName), this.serverError.bind(this));
    }
    /**
     * Calls when checking accounts are successfully fetched for Make Transfer also shows the UI
     * @param {Payee} payeeObject Payee Object for make transfer needs to be shown
     * @param {Account[]} checkingAccounts Checking Accounts for selection
     */
    WireTransferPresentationController.prototype.onCheckingAccountSuccessForMakeTransfer = function(payeeObject, transactionObject, onCancel, formName, checkingAccounts) {
        this.hideProgressBar();
        var accounts, featureAction;
        var wireAccountType = payeeObject ? payeeObject.wireAccountType : transactionObject.wireAccountType;
        var formToNavigateTo = formName ? formName : frmWireTransferMakeTransfer;
        checkingAccounts = checkingAccounts.filter(account => {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
        }) 
        if (wireAccountType === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) {
            featureAction = "DOMESTIC_WIRE_TRANSFER_CREATE";
            accounts = checkingAccounts.filter(function(account) {
                if (applicationManager.getConfigurationManager().checkAccountAction(account.accountID, featureAction))
                    return account;
            });
            this.getLimits(featureAction, formToNavigateTo);
        } else {
            featureAction = "INTERNATIONAL_WIRE_TRANSFER_CREATE";
            accounts = checkingAccounts.filter(function(account) {
                if (applicationManager.getConfigurationManager().checkAccountAction(account.accountID, featureAction))
                    return account;
            });
            this.getLimits(featureAction, formToNavigateTo);
        }
        // applicationManager.getNavigationManager().navigateTo(formToNavigateTo);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [formToNavigateTo]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            makeTransfer: {
                payee: payeeObject,
                checkingAccounts: accounts,
                transactionObject: transactionObject,
                onCancel: onCancel
            }
        }, formToNavigateTo);
    }
    WireTransferPresentationController.prototype.onWireRecipientUpdateError = function(error) {
        this.hideProgressBar();
        var viewModel = {};
        viewModel.serverError = error.errorMessage;
        // applicationManager.getNavigationManager().navigateTo(wireTransferAddRecipientForm);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [wireTransferAddRecipientForm]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm(viewModel, wireTransferAddRecipientForm);
    }
    /**
     * Method to show Recent Transactions
     */
    WireTransferPresentationController.prototype.showRecentTransactions = function(sortingInputs) {
        var self = this;

        function manageRecipientSuccessCallback(wiretransferRecipient) {
            this.payeeList = wiretransferRecipient;
            applicationManager.getNavigationManager().navigateTo({
                appName: 'WireTransferMA',
                friendlyName: frmWireTransfersRecent
            });
            // var obj = {
            //     "context": this,
            //     "callbackModelConfig": {
            //         [frmWireTransfersRecent]: true
            //     }
            // };
            // var navManager = kony.mvc.getNavigationManager();
            // navManager.navigate(obj);
            self.showProgressBar(frmWireTransfersRecent);
            var paginationManager = applicationManager.getPaginationManager();
            paginationManager.resetValues();
            self.fetchWireTransactions(sortingInputs, wiretransferRecipient);
        }
        if(sortingInputs===undefined){
            sortingInputs = {};
        }
        applicationManager.getRecipientsManager().fetchWireTransferRecipients(sortingInputs, manageRecipientSuccessCallback.bind(this), this.serverError.bind(this));
    }
    /**
     * Entry Point Method of One Time Transfer
     * @param {string} payee Payee Object
     */
    WireTransferPresentationController.prototype.showEditPayee = function(payee) {
        this.showProgressBar();
        var asyncManager = applicationManager.getAsyncManager();
        var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
        var recipientManager = applicationManager.getRecipientsManager();
        var country = payee.wireAccountType === OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL ? payee.country : OLBConstants.WireTransferConstants.DOMESTIC_COUNTRY_NAME;
        var asyncItems = [
            asyncManager.asyncItem(recipientManager, 'fetchRegionsByCountryCode', [country]),
            asyncManager.asyncItem(recipientManager, 'fetchCountriesList')
        ]
        asyncManager.callAsync(asyncItems, this.onEditPayeeDataSucccess.bind(this, payee))
    }
    /**
     * Shows the add payee on UI - Called when initial data is loaded
     * @param {AsyncResponse} asyncResponse Response of Async Calls
     */
    WireTransferPresentationController.prototype.onEditPayeeDataSucccess = function(payee, asyncResponse) {
        this.hideProgressBar();
        var responses = asyncResponse.responses;
        if (asyncResponse.isAllSuccess()) {
            this.showEditPayeeOnUI(payee, responses[0].data.region_details_view, responses[1].data.records);
        } else {
            this.serverError.bind(this);
        }
    }
    /**
     * Show Add Recipient on UI
     * @param {Object} payee Payee OBject
     * @param {Object[]} states list of states
     * @param {Object[]} countries list of countries
     */
    WireTransferPresentationController.prototype.showEditPayeeOnUI = function(payee, states, countries) {
        var formToNavigateTo = payee.wireAccountType === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC ? wireTransferAddRecipientForm : wireTransferAddInternationalRecipientFormStep1;
        // applicationManager.getNavigationManager().navigateTo(formToNavigateTo);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [formToNavigateTo]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            editPayee: {
                states: states,
                countries: countries,
                payee: payee
            }
        }, formToNavigateTo);
    }
    /**
     * Shows make transfer recipient list.
     */
    WireTransferPresentationController.prototype.fetchWireTransactions = function(sortingInputs, wiretransferRecipient) {
        var paginationManager = applicationManager.getPaginationManager();
        var paginationValues = paginationManager.getValues(recentTransactionSortConfig, sortingInputs);
        var params = {
            firstRecordNumber: paginationValues.offset,
            lastRecordNumber: paginationValues.limit,
            sortBy: paginationValues.sortBy,
            order: paginationValues.order
        }
        params.lastRecordNumber = null;
        this.showProgressBar();
        applicationManager.getTransactionManager().fetchWireTransactions(params, this.onWireTransactionFetchSuccess.bind(this, wiretransferRecipient), this.serverError.bind(this));
    }
    /**
     * Called when transaction list fetch is successful for make transfer
     * @param {object[]} transactions List of transactions
     */
    WireTransferPresentationController.prototype.onWireTransactionFetchSuccess = function(wiretransferRecipient, transactions) {
        var paginationValues = applicationManager.getPaginationManager().getValues(recipientSortConfig);
        paginationValues.limit = transactions.length;
        if (transactions.length > 0 || paginationValues.offset === 0) {
            applicationManager.getPaginationManager().updatePaginationValues();
            applicationManager.getNavigationManager().updateForm({
                wireTransactions: {
                    transactions: transactions,
                    config: paginationValues,
                    wiretransferRecipient: wiretransferRecipient
                }
            }, frmWireTransfersRecent);
        } else if (paginationValues.offset !== 0) {
            // applicationManager.getNavigationManager().navigateTo(frmWireTransfersRecent);
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    [frmWireTransfersRecent]: true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                noMoreRecords: true
            }, frmWireTransfersRecent);
        }
        this.hideProgressBar();
    }
    WireTransferPresentationController.prototype.showNotEligibleScreen = function() {
        // applicationManager.getNavigationManager().navigateTo("frmNotEligibleToTransfer");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmNotEligibleToTransfer": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            notEligible: true
        }, "frmNotEligibleToTransfer");
    }
    WireTransferPresentationController.prototype.fetchRecipientTransactions = function(recipient) {
        this.showProgressBar();
        var params = {
            "payeeId": recipient.payeeId,
            "limit": applicationManager.getConfigurationManager().OLBConstants.WIRE_ACTIVITY_LIMIT
        };
        applicationManager.getTransactionManager().fetchRecipientWireTransactions(params, this.onViewActivitySuccess.bind(this, recipient), this.serverError.bind(this))
    }
    WireTransferPresentationController.prototype.onViewActivitySuccess = function(recipient, transactions) {
        this.hideProgressBar();
        // applicationManager.getNavigationManager().navigateTo(frmWireTransferViewActivity);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [frmWireTransferViewActivity]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            recipientActivity: {
                transactions: transactions,
                recipient: recipient
            }
        }, frmWireTransferViewActivity);
    }
    WireTransferPresentationController.prototype.deleteRecipient = function(recipient) {
        //applicationManager.getRecipientsManager().deletePayeeById(recipient.payeeId, this.deletePayeeSuccess.bind(this), this.deletePayeeError.bind(this))
        applicationManager.getRecipientsManager().deleteWireTransferPayeeById(recipient.payeeId, this.deletePayeeSuccess.bind(this), this.deletePayeeError.bind(this))
    }
    WireTransferPresentationController.prototype.deletePayeeSuccess = function(response) {
        this.showManageRecipientList();
      	applicationManager.getNavigationManager().updateForm({
             "deleteResponse": response
        }, frmWireTransfersManageRecipients);
    }
    WireTransferPresentationController.prototype.deletePayeeError = function() {}
    WireTransferPresentationController.prototype.navigateToConfirmationScreen = function(data, onCancel) {
        // applicationManager.getNavigationManager().navigateTo(frmConfirmDetails);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [frmConfirmDetails]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            confirmationDetails: data,
            onCancel: onCancel
        }, frmConfirmDetails);
    }
    WireTransferPresentationController.prototype.getTnC = function(type, formName, accounts) {
        this.showProgressBar();
        var flowType;
        if (type === OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL) flowType = OLBConstants.TNC_FLOW_TYPES.International_WireTransfer_TnC;
        else if (type === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) flowType = OLBConstants.TNC_FLOW_TYPES.WireTransfer_TnC;
        else flowType = OLBConstants.TNC_FLOW_TYPES.OneTime_WireTransfer_TnC;
        var self = this;
        this.showTermsAndConditions(flowType, self.getTnCSuccess.bind(self, formName, accounts), self.getTnCOnFailure.bind(self, formName));
    };
    WireTransferPresentationController.prototype.getTnCSuccess = function(formName, accounts, response) {
        var scopeObj = this;
        scopeObj.showTnCView(formName, response, accounts);
    };
    WireTransferPresentationController.prototype.getTnCOnFailure = function(formName, response) {
        applicationManager.getNavigationManager().updateForm({
            "TnCFailure": true
        }, formName);
        this.hideProgressBar(formName);
        this.showServerErrorFlex(response, formName);
    };
    WireTransferPresentationController.prototype.showTnCView = function(formName, TnCcontent, checkingAccounts) {
        this.hideProgressBar(formName);
        var self = this;
       // applicationManager.getNavigationManager().navigateTo(formName);
        applicationManager.getNavigationManager().updateForm({
            "TnCcontent": TnCcontent,
          activationScreen: {
                checkingAccounts: checkingAccounts
            }
        }, formName);
    };

    WireTransferPresentationController.prototype.presentTermsAndConditions = function(viewModel) {
        if (kony.application.getCurrentForm().id !== frmPreTermsandCondition) {
            // applicationManager.getNavigationManager().navigateTo(frmPreTermsandCondition);
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    [frmPreTermsandCondition]: true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
        }
        applicationManager.getNavigationManager().updateForm(viewModel, frmPreTermsandCondition);
    };
    /**
     * Method to create Tnc when user agree to Tnc
     * @member of Class TermsAndConditionsPresentationController
     * @param {void} - none
     * @returns {void} - None
     * @throws {void} -None
     */
     WireTransferPresentationController.prototype.createTnC = function(flowType) {
        params = {
            "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
            "termsAndConditionsCode": flowType
        };
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Login_TnC) {
            applicationManager.getTermsAndConditionManager().createTermsAndConditionsLogin(params, this.onSuccessCreateTnC.bind(this, flowType), this.onFailureCreateTnC.bind(this, flowType));
        }
    };
    WireTransferPresentationController.prototype.onSuccessCreateTnC = function(flowType) {
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Login_TnC) {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
            authModule.presentationController.doPostLoginWork();
        }
    };
    WireTransferPresentationController.prototype.onFailureCreateTnC = function(flowType, response) {
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Login_TnC) {
            applicationManager.getNavigationManager().updateForm({
                error: response
            }, "frmPreTermsandCondition");
        }
    };
    /**
     * Method to fetch terms and conditions information terms and conditions
     * @member of Class TermsAndConditionsPresentationController
     * @param flowType - flow value from OLBConstants.TNC_FLOW_TYPES
     * @param success - success callback
     * @param failure - failure callback
     * @returns {void} - None
     * @throws {void} -None
     */
     WireTransferPresentationController.prototype.showTermsAndConditions = function(flowType, success, failure) {
        params = {
            "languageCode": kony.i18n.getCurrentLocale().replace("_", "-")
        };
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Footer_TnC || flowType === OLBConstants.TNC_FLOW_TYPES.Hamburger_TnC) {
            if (flowType === OLBConstants.TNC_FLOW_TYPES.Footer_TnC) {
                params.termsAndConditionsCode = OLBConstants.TNC_FLOW_TYPES.Common_TnC;
                applicationManager.getTermsAndConditionManager().fetchTermsAndConditionsPreLogin(params, this.onSuccessShowTermsAndConditions.bind(this, flowType, success), this.onFailureShowTermsAndConditions.bind(this, flowType, failure));
            } else if (flowType === OLBConstants.TNC_FLOW_TYPES.Hamburger_TnC) {
                params.termsAndConditionsCode = OLBConstants.TNC_FLOW_TYPES.Common_TnC;
                applicationManager.getTermsAndConditionManager().fetchTermsAndConditionsPostLogin(params, this.onSuccessShowTermsAndConditions.bind(this, flowType, success), this.onFailureShowTermsAndConditions.bind(this, flowType, failure));
            }
        } else if (flowType === OLBConstants.TNC_FLOW_TYPES.Enroll_TnC) {
            params.termsAndConditionsCode = OLBConstants.TNC_FLOW_TYPES.Enroll_TnC;
            applicationManager.getTermsAndConditionManager().fetchTermsAndConditionsPreLogin(params, this.onSuccessShowTermsAndConditions.bind(this, flowType, success), this.onFailureShowTermsAndConditions.bind(this, flowType, failure));
        } else {
            params.termsAndConditionsCode = flowType;
            applicationManager.getTermsAndConditionManager().fetchTermsAndConditionsPostLogin(params, this.onSuccessShowTermsAndConditions.bind(this, flowType, success), this.onFailureShowTermsAndConditions.bind(this, flowType, failure));
        }
    };
    /**
     * Method will handle once Terms and conditions response is successfull.
     * @param {Object} response success response object
     */
     WireTransferPresentationController.prototype.onSuccessShowTermsAndConditions = function(flowType, success, response) {
        var userPrefManager = applicationManager.getUserPreferencesManager();
        var navManager = applicationManager.getNavigationManager();
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Footer_TnC || flowType === OLBConstants.TNC_FLOW_TYPES.Hamburger_TnC) {
            if (response.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                window.open(response.termsAndConditionsContent);
            } else {
                // navManager.navigateTo("frmContactUsPrivacyTandC");
                var obj = {
                    "context": this,
                    "callbackModelConfig": {
                        "frmContactUsPrivacyTandC": true
                    }
                };
                var navManager = kony.mvc.getNavigationManager();
                navManager.navigate(obj);
                if (userPrefManager.isLoggedIn !== true) {
                    navManager.updateForm({
                        viewType: "preLogin"
                    });
                } else {
                    navManager.updateForm({
                        viewType: "postLogin"
                    });
                }
            }
            if (userPrefManager.isLoggedIn !== true) {
                navManager.updateForm({
                    "showTnC": {
                        serviceData: response,
                        param: "preLoginView"
                    }
                });
            } else {
                FormControllerUtility.showProgressBar(this.view);
                navManager.updateForm({
                    "showTnC": {
                        serviceData: response,
                        param: "postLoginView"
                    }
                });
                FormControllerUtility.hideProgressBar(this.view);
            }
        } else {
            success(response);
        }
    };
    /**
     * Method will handle once Terms and conditions response is failure.
     * @param {Object} response failure response object
     */
     WireTransferPresentationController.prototype.onFailureShowTermsAndConditions = function(flowType, failure, response) {
        var navManager = applicationManager.getNavigationManager();
        var userPrefManager = applicationManager.getUserPreferencesManager();
        if (flowType === OLBConstants.TNC_FLOW_TYPES.Footer_TnC || flowType === OLBConstants.TNC_FLOW_TYPES.Hamburger_TnC) {
            // navManager.navigateTo("frmContactUsPrivacyTandC");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmContactUsPrivacyTandC": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            if (userPrefManager.isLoggedIn !== true) {
                navManager.updateForm({
                    "showTnC": {
                        serviceData: "error",
                        errorMessage: response.errorMessage,
                        param: "preLoginView"
                    }
                });
            } else {
                navManager.updateForm({
                    "showTnC": {
                        serviceData: "error",
                        errorMessage: response.errorMessage,
                        param: "postLoginView"
                    }
                });
            }
        } else {
            if (response.isServerUnreachable) {
                this.navigateToServerDownScreen();
            } else {
                if (typeof failure === "function") {
                    failure(response.errorMessage);
                } else {
                    this.navigateToServerDownScreen();
                }
            }
        }
    };
    /**
     * navigateToServerDownScreen :Function to navigate to server down screen
     */
     WireTransferPresentationController.prototype.navigateToServerDownScreen = function() {
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule","appName" :"AuthenticationMA"});
        authModule.presentationController.showLoginScreen({
            "hideProgressBar": true,
            "action": "ServerDown"
        });
    };

    WireTransferPresentationController.prototype.showBulkWireConfirmTransfer = function(params, additionalData, context) {
        var self = this;
        if (context === "EDIT_FLOW") {
            // applicationManager.getNavigationManager().navigateTo("frmBulkWireConfirmTransfer");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmBulkWireConfirmTransfer": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            var response = {};
            response.bulkWireResponse = params;
            response.accountsResponse = self.checkingAccounts;
            response.removedRecipientData = additionalData;
            applicationManager.getNavigationManager().updateForm({
                fileDetails: self.fileData
            }, "frmBulkWireConfirmTransfer");
            applicationManager.getNavigationManager().updateForm({
                "recipientsData": response
            }, "frmBulkWireConfirmTransfer");
        } else {
            function bulkWireDataCompletionCallback(syncResponseObject) {
                if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
                    self.fetchFileLineItemsAndCheckingAccountsSuccess(syncResponseObject.responses[0].data, syncResponseObject.responses[1].data);
                } else {
                    self.fetchFileLineItemsOrCheckingAccountsFailure();
                }
            }
            // applicationManager.getNavigationManager().navigateTo("frmBulkWireConfirmTransfer");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmBulkWireConfirmTransfer": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true,
                }
            }, "frmBulkWireConfirmTransfer");
            var fileObj = {
                bulkWireFileID: params.bulkWireFileID,
                sortBy: params.sortBy ? params.sortBy : "",
                order: params.order ? params.order : "",
                searchString: params.searchString ? params.searchString : ""
            }
            if (context !== "search") {
                this.fileData = params;
                applicationManager.getNavigationManager().updateForm({
                    fileDetails: params
                }, "frmBulkWireConfirmTransfer");
                var asyncManager = applicationManager.getAsyncManager();
                asyncManager.callAsync(
                    [
                        asyncManager.asyncItem(applicationManager.getTransactionManager(), "fetchBulkWireFileLineItems", [fileObj]),
                        asyncManager.asyncItem(applicationManager.getAccountManager(), "fetchCheckingAccounts")
                    ], bulkWireDataCompletionCallback);
            } else {
                applicationManager.getTransactionManager().fetchBulkWireFileLineItems(fileObj, this.fetchFileLineItemsSuccess.bind(this), this.fetchFileLineItemsOrCheckingAccountsFailure.bind(this));
            }
        }
    };

    WireTransferPresentationController.prototype.fetchFileLineItemsAndCheckingAccountsSuccess = function(bulkWireResponse, accountsResponse) {
        var response = {};
        response.bulkWireResponse = bulkWireResponse.BulkWireFileLineItems[0];
        accountsResponse =  accountsResponse.filter(account => {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
        }) 
        response.accountsResponse = accountsResponse;
        this.checkingAccounts = accountsResponse;
        applicationManager.getNavigationManager().updateForm({
            "recipientsData": response
        }, "frmBulkWireConfirmTransfer");
    };

    WireTransferPresentationController.prototype.fetchFileLineItemsOrCheckingAccountsFailure = function() {
        CommonUtilities.showServerDownScreen();
    };

    WireTransferPresentationController.prototype.fetchFileLineItemsSuccess = function(bulkWireResponse) {
        var response = {};
        response.bulkWireResponse = bulkWireResponse.BulkWireFileLineItems[0];
        response.isSearchSort = true;
        applicationManager.getNavigationManager().updateForm({
            "recipientsData": response
        }, "frmBulkWireConfirmTransfer");
    };

    WireTransferPresentationController.prototype.showBulkWireEditTransfer = function(data) {
        // applicationManager.getNavigationManager().navigateTo("frmBulkWireEditRecipient");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkWireEditRecipient": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        this.showProgressBar("frmBulkWireEditRecipient");
        applicationManager.getNavigationManager().updateForm({
            bulkWireEditResponse: data
        }, "frmBulkWireEditRecipient");
    };

    WireTransferPresentationController.prototype.showView = function(frm, data) {
        if (kony.application.getCurrentForm().id !== frm) {
            // applicationManager.getNavigationManager().navigateTo(frm);
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    [frm]: true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
        }
        if (data) {
            applicationManager.getNavigationManager().updateForm(data, frm);
        }
    };

    WireTransferPresentationController.prototype.uploadBulkWireFile = function(requestParam) {
        var scopeObj = this;
        applicationManager.getTransactionManager().UploadBWFile(
            requestParam,
            scopeObj.onUploadSuccess.bind(scopeObj),
            scopeObj.onUploadFailure.bind(scopeObj)
        );
    };

    /**
     * onUploadSuccess : Method to handle success response of upload file Request
     * @member of {ACHModule_PresentationController}
     * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
     * @param {object} response - success response object of upload file Request response
     * @return {} 
     * @throws {}
     */
    WireTransferPresentationController.prototype.onUploadSuccess = function(response) {
        // applicationManager.getNavigationManager().navigateTo('frmAddBulkTransferFile');
        if(kony.application.getCurrentForm().id != 'frmAddBulkTransferFile') {
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmAddBulkTransferFile": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
        }    
        var formController = applicationManager.getPresentationUtility().getController('frmAddBulkTransferFile', true);
        formController.showUploadBWAck();
        formController.openfile(response);
        this.hideProgressBar("frmAddBulkTransferFile");
    };


    /**
     * getTemplateTypes : This is the function used to fetch Template Types 
     * @member of {ACHModule_PresentationController}
     * @param {object} responseError - failure response object of upload file Request response
     * @return {object} responseError - failure response object of upload file Request response
     * @throws {}
     */
    WireTransferPresentationController.prototype.onUploadFailure = function(responseError) {
      	responseError = responseError.serverErrorRes;
        // applicationManager.getNavigationManager().navigateTo('frmAddBulkTransferFile');
        if(kony.application.getCurrentForm().id != 'frmAddBulkTransferFile') {
          var obj = {
              "context": this,
              "callbackModelConfig": {
                  "frmAddBulkTransferFile": true
              }
          };
          var navManager = kony.mvc.getNavigationManager();
          navManager.navigate(obj);
        }
        var formController = applicationManager.getPresentationUtility().getController('frmAddBulkTransferFile', true);
        var errorMsg = responseError.dbpErrMsg;
        switch (responseError.dbpErrCode) {
            case 14005:
                responseError.dbpErrMsg = kony.i18n.getLocalizedString("i18n.bulkwires.errorcode.14005");
                break;
            case 14004:
                responseError.dbpErrMsg = kony.i18n.getLocalizedString("i18n.bulkwires.errorcode.14004");
                break;
            case 14006:
                responseError.dbpErrMsg = kony.i18n.getLocalizedString("i18n.bulkwires.errorcode.14006") + " " + applicationManager.getConfigurationManager().bulkWireFileTransactionsLimit + ".";
                break;
            case 14019:
                responseError.dbpErrMsg = kony.i18n.getLocalizedString("i18n.bulkwires.errorcode.14019");
                break;
        }
        if (responseError.dbpErrMsg)
            formController.UploadFailed(responseError.dbpErrMsg);
        else if (responseError.errmsg)
            formController.UploadFailed(responseError.errmsg);
        this.hideProgressBar("frmAddBulkTransferFile");
    };
    /**Resets the pagination value to fetch external transactions
     * @param {object} data data for sorting
     */
    WireTransferPresentationController.prototype.showBulkwirefiles = function(data, deleteSuccess) {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        this.showProgressBar();
        this.fetchBulkWireFilesUser(data, deleteSuccess);
    };
    /**Shows External Accounts Based on flow
     * @param {object} navFlow flow from where the external accounts are suppose to show
     */
    WireTransferPresentationController.prototype.fetchBulkWireFilesUser = function(navFlow, deleteSuccess) {
        var paginationManager = applicationManager.getPaginationManager();
        var params = paginationManager.getValues(this.bulkwirefilesConfig, navFlow);
        var form;
        if (navFlow !== undefined) {
            params.sortBy = navFlow.sortBy;
        } else {
            params.sortBy = "createdts";
        }
        if (navFlow !== undefined && navFlow.formName !== undefined) {
            form = navFlow.formName;
        } else {
            if (kony.application.getCurrentForm().id === "frmBulkTransferFiles") {
                form = "frmBulkTransferFiles";
            } else if (kony.application.getCurrentForm().id === "frmMakeBulkTransfer") {
                form = "frmMakeBulkTransfer";
            } else if (kony.application.getCurrentForm().id === "frmMakeBulkTransferTemplate") {
                form = "frmMakeBulkTransferTemplate";
            }
        }
        this.getBulkFiles({
            "pageOffset": params.offset,
            "sortByParam": params.sortBy,
            "sortOrder": params.order,
            "bulkWireCategoryFilter": navFlow ? navFlow.bulkWireCategoryFilter : "Files",
            "searchString": navFlow ? navFlow.searchKeyword : "",
        }, form, navFlow ? navFlow.bulkWireCategoryFilter : "Files", deleteSuccess);
        // "pageSize": params.limit,
    }
    /** Get External accounts from backend
     * @param {object} value - Sorting and pagination parameters
     */
    WireTransferPresentationController.prototype.getBulkFiles = function(value, form, Type, deleteSuccess) {
        var transactionManager = applicationManager.getRecipientsManager();
        this.showProgressBar(form);
        applicationManager.getTransactionManager().fetchBulkWireFilesForUser(value, this.getBulkFilesSuccess.bind(this, form, Type, deleteSuccess), this.getBulkFilesFailure.bind(this, form));
    };
    /**Success callback after external accounts are fetched and updates the from transfers
     * @param  {object} response object which consists of external account
     */
    WireTransferPresentationController.prototype.getBulkFilesSuccess = function(form, Type, deleteSuccess, response) {
        var paginationManager = applicationManager.getPaginationManager();
        var viewProperties = {};
        if (response.BulkWires.length > 0) {
            paginationManager.updatePaginationValues();
            viewProperties.bulkWireFiles = response.BulkWires;
            viewProperties.pagination = paginationManager.getValues(this.bulkwirefilesConfig);
            viewProperties.pagination.limit = response.BulkWires.length;
            viewProperties.config = this.bulkwirefilesConfig;
            viewProperties.bulkWireType = Type;
            if (deleteSuccess) {
                viewProperties.deletionSuccess = deleteSuccess;
            }
        } else {
            var values = paginationManager.getValues(this.bulkwirefilesConfig);
            if (response.BulkWires.length === 0 && values.offset !== 0) {
                applicationManager.getNavigationManager().navigateTo({
                    appName: 'WireTransferMA',
                    friendlyName: form
                });
                // var obj = {
                //     "context": this,
                //     "callbackModelConfig": {
                //         [form]: true
                //     }
                // };
                // var navManager = kony.mvc.getNavigationManager();
                // navManager.navigate(obj);
                applicationManager.getNavigationManager().updateForm({
                    noMoreRecords: true
                }, form);
            } else if (values.offset === 0) {
                viewProperties.bulkWireFiles = response.BulkWires;
                viewProperties.bulkWireType = Type;
            }
        }
        applicationManager.getNavigationManager().navigateTo({
            appName: 'WireTransferMA',
            friendlyName: form
        });
        // var obj = {
        //     "context": this,
        //     "callbackModelConfig": {
        //         [form]: true
        //     }
        // };
        // var navManager = kony.mvc.getNavigationManager();
        // navManager.navigate(obj);
        if (form === "frmBulkTransferFiles") {
            applicationManager.getNavigationManager().updateForm(viewProperties, form);
        } else if (form === "frmMakeBulkTransfer") {
            applicationManager.getNavigationManager().updateForm(viewProperties, form);
        } else if (form === "frmMakeBulkTransferTemplate") {
            applicationManager.getNavigationManager().updateForm(viewProperties, form);
        }
        this.hideProgressBar(form);
    };
    /**Failure callback when external accounts are fetched
     * @param  {object} response failure object which comes from backend
     */
    WireTransferPresentationController.prototype.getBulkFilesFailure = function(form, response) {
        var errorExternalAccounts = "errorExternalAccounts";
        var viewProperties = {};
        viewProperties.serverError = response.errorMessage;
        this.hideProgressBar(form);
        applicationManager.getNavigationManager().navigateTo({
            appName: 'WireTransferMA',
            friendlyName: form
        });
        // var obj = {
        //     "context": this,
        //     "callbackModelConfig": {
        //         [form]: true
        //     }
        // };
        // var navManager = kony.mvc.getNavigationManager();
        // navManager.navigate(obj);
        if (form === "frmBulkTransferFiles") {
            applicationManager.getNavigationManager().updateForm(viewProperties, form);
        } else if (form === "frmMakeBulkTransfer") {
            applicationManager.getNavigationManager().updateForm(viewProperties, form);
        } else if (form === "frmMakeBulkTransferTemplate") {
            applicationManager.getNavigationManager().updateForm(viewProperties, form);
        }
    };
    /**Initialises the pagination values to fetch external accounts for previous page
     */
    WireTransferPresentationController.prototype.fetchPreviousBulkWireFiles = function(data) {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getPreviousPage();
//         data = {
//             "formName": "frmMakeBulkTransfer",
//             "bulkWireCategoryFilter": "Files"
//         };
        this.fetchBulkWireFilesUser(data);
    };
    /**Initialises the pagination values to fetch external accounts for next page
     */
    WireTransferPresentationController.prototype.fetchNextBulkWireFiles = function(data) {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getNextPage();
//         data = {
//             "formName": "frmMakeBulkTransfer",
//             "bulkWireCategoryFilter": "Files"
//         };
        this.fetchBulkWireFilesUser(data);
    };
    /** Search Payees
     * @member  TransferFastPresentationController
     * @param  {object} data Search Inputs
     * @throws {void} None
     * @returns {void} None
     */
    WireTransferPresentationController.prototype.searchBulkWireFiles = function(data) {
        // if (data && data.searchKeyword.length > 0) {
        var searchInputs = {
            searchString: data.searchKeyword,
            bulkWireCategoryFilter: data.bulkWireCategory
        }
        //   var criteria = kony.mvc.Expression.eq("searchString", data.searchKeyword)
        this.showProgressBar();
        applicationManager.getTransactionManager().fetchBulkWireFilesForUser(searchInputs, this.searchSuccess.bind(this, searchInputs), this.searchFailure.bind(this));

    };
    /** Search Payees
     * @member  searchSuccess
     * @param  {object} searchInputs Search Inputs
     * @param  {object} payees payees
     */
    WireTransferPresentationController.prototype.searchSuccess = function(searchInputs, files) {
        var viewModel = {};
        viewModel.searchBulkWireFiles = {
            bulkWireFiles: files.BulkWires,
            searchInputs: searchInputs
        }
        this.hideProgressBar();
        if (kony.application.getCurrentForm().id === "frmBulkTransferFiles") {
            applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkTransferFiles");
        } else if (kony.application.getCurrentForm().id === "frmMakeBulkTransfer") {
            applicationManager.getNavigationManager().updateForm(viewModel, "frmMakeBulkTransfer");
        } else if (kony.application.getCurrentForm().id === "frmMakeBulkTransferTemplate") {
            applicationManager.getNavigationManager().updateForm(viewModel, "frmMakeBulkTransferTemplate");
        }
    };
    /** Search Payees error
     * @member  TransferFastPresentationController
     * @param  {object} searchInputs Search Inputs
     * @param {object} response
     * @returns {void} None
     */
    WireTransferPresentationController.prototype.searchFailure = function(searchInputs, response) {
        var viewModel = {};
        viewModel.searchBulkWireFiles = {
            "error": response.errorMessage
        };
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkTransferFiles");
    };

    WireTransferPresentationController.prototype.downloadSampleBulkWireFile = function() {
      	var requestParam ={};
        applicationManager.getTransactionManager().downloadUploadedSampleBulkWireFile(requestParam,
            this.downloadSampleBulkWireFileSuccess.bind(this),
            this.downloadSampleBulkWireFileFailure.bind(this));
    };

    WireTransferPresentationController.prototype.downloadSampleBulkWireFileSuccess = function(response) {
        var scopeObj = this;
        var requestInputs = response.fileId;
        var downloadReportURL = applicationManager.getTransactionManager().downloadSampleBulkWireFile(requestInputs);
        var data = {
            "url": downloadReportURL
        };
        CommonUtilities.downloadFile(data);
    };

    WireTransferPresentationController.prototype.downloadSampleBulkWireFileFailure = function(response) {
        var viewModel = {};
        viewModel.searchBulkWireFiles = {
            "error": response.errorMessage
        };
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkTransferFiles");
    };

    WireTransferPresentationController.prototype.downloadBulkWireFile = function(requestParam) {
        applicationManager.getTransactionManager().downloadUplodedBulkWireFile(requestParam, this.downloadBulkWireFileSuccess.bind(this), this.downloadBulkWireFileFailure.bind(this));
    };

    WireTransferPresentationController.prototype.downloadBulkWireFileSuccess = function(response) {
        var scopeObj = this;
        var requestInputs = response.fileId;
        var downloadReportURL = applicationManager.getTransactionManager().downloadBulkWireFile(requestInputs);
        var data = {
            "url": downloadReportURL
        };
        CommonUtilities.downloadFile(data);
    }

    WireTransferPresentationController.prototype.downloadBulkWireFileFailure = function(response) {
        var viewModel = {};
        viewModel.searchBulkWireFiles = {
            "error": response.errorMessage
        };
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkTransferFiles");
    }
    /**Shows bulk wire file transaction for a file ID	
     * @param {object} data data for searching
     */
    WireTransferPresentationController.prototype.showBulkWireTransactions = function(data, isFile) {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.resetValues();
        this.fetchBulkWireTransactions(data, isFile);
    };
    /**fetches bulk wire file transaction for a file ID	
     * @param {object} request flow from where the file transactions are fetched
     */
    WireTransferPresentationController.prototype.fetchBulkWireTransactions = function(request, isFile) {
        var paginationManager = applicationManager.getPaginationManager();
        var params = paginationManager.getValues(this.bulkwiretransactionsConfig, request);
        if (request !== undefined) {
            params.sortBy = request.sortBy;
        } else {
            params.sortBy = "transactionDate";
        }
        if (request != null && request != undefined) {
            if (isFile)
                this.getBulkFileTransactions({
                    "bulkWireFileID": request.bulkWireFileID,
                    "pageOffset": params.offset,
                    "pageSize": params.limit,
                    "sortByParam": params.sortBy,
                    "sortOrder": params.order
                }, request);
            else {
                this.getBulkTemplateTransactions({
                    "bulkWireTemplateID": request.bulkWireTemplateID,
                    "pageOffset": params.offset,
                    "pageSize": params.limit,
                    "sortByParam": params.sortBy,
                    "sortOrder": params.order
                }, request);
            }
        }
    };
    /** Get bulk wire file transactions from backend
     * @param {object} value - Sorting and pagination parameters
     * @param {object} fileDetails - consists of fileID and file names
     */
    WireTransferPresentationController.prototype.getBulkFileTransactions = function(value, fileDetails) {
        this.showProgressBar();
        if (fileDetails.addedBy != undefined && fileDetails.addedBy != "" && fileDetails.addedBy != null) {
            applicationManager.getTransactionManager().fetchBulkWireFilesTransactions(value, this.getBulkFileTransactionsSuccess.bind(this, fileDetails), this.getBulkFileTransactionsFailure.bind(this));
        } else {
            var paramByIDFilter = {
                searchString: fileDetails.bulkWireFileName,
                bulkWireCategoryFilter: "Files"
            };
            var asyncManager = applicationManager.getAsyncManager();
            asyncManager.callAsync(
                [
                    asyncManager.asyncItem(applicationManager.getTransactionManager(), "fetchBulkWireFilesTransactions", [value]),
                    asyncManager.asyncItem(applicationManager.getTransactionManager(), "fetchBulkWireFilesForUser", [paramByIDFilter])
                ], bulkWireExecutionCompletionCallback.bind(this));
            var self = this;

            function bulkWireExecutionCompletionCallback(syncResponseObject) {
                if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
                    var forUtility = applicationManager.getFormatUtilManager();
                    var transactionDate = forUtility.getDateObjectFromCalendarString(syncResponseObject.responses[1].data.BulkWires[0].createdts, "YYYY-MM-DD");
                    transactionDate = forUtility.getFormattedSelectedDate(transactionDate);
                    fileDetails.addedBy = syncResponseObject.responses[1].data.BulkWires[0].firstname + " " + syncResponseObject.responses[1].data.BulkWires[0].lastname;
                    fileDetails.addedOn = transactionDate;
                    self.getBulkFileTransactionsSuccess(fileDetails, syncResponseObject.responses[0].data);
                } else {
                    if (syncResponseObject.responses[0].isSuccess)
                        self.getBulkFileTransactionsSuccess(fileDetails, syncResponseObject.responses[0].data);
                    else
                        self.getBulkFileTransactionsFailure();
                }
            }
        }
    };
    /**Success callback after file transactions are fetched and updates the form filebulkwirefiletransactionsactivity
     * @param  {object} response object which consists of file activity transactions
     */
    WireTransferPresentationController.prototype.getBulkFileTransactionsSuccess = function(fileDetails, response) {
        var paginationManager = applicationManager.getPaginationManager();
        var viewProperties = {};
        if (response.BulkWireFileTransactDetails.length > 0) {
            paginationManager.updatePaginationValues();
            viewProperties.bulkWireFileTransactions = response.BulkWireFileTransactDetails;
            viewProperties.FileDetails = fileDetails;
            viewProperties.pagination = paginationManager.getValues(this.bulkwiretransactionsConfig);
            viewProperties.pagination.limit = response.BulkWireFileTransactDetails.length;
            viewProperties.config = this.bulkwiretransactionsConfig;
        } else {
            var values = paginationManager.getValues(this.bulkwiretransactionsConfig);
            if (values.offset === 0) {
                viewProperties.bulkWireFileTransactions = response.BulkWireFileTransactDetails;
                viewProperties.FileDetails = fileDetails;
            }
        }
        this.hideProgressBar("frmBulkWireFileTransactionsActivity");
        // applicationManager.getNavigationManager().navigateTo("frmBulkWireFileTransactionsActivity");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkWireFileTransactionsActivity": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmBulkWireFileTransactionsActivity");
    };
    /**Failure callback when file activity transactions are fetched
     * @param  {object} response failure object which comes from backend
     */
    WireTransferPresentationController.prototype.getBulkFileTransactionsFailure = function(response) {
        var errorExternalAccounts = "errorExternalAccounts";
        this.hideProgressBar("frmBulkWireFileTransactionsActivity");
        applicationManager.getNavigationManager().updateForm(errorExternalAccounts, "frmBulkWireFileTransactionsActivity");
    };
    /**Initialises the pagination values to fetch file activity transactions for previous page
     */
    WireTransferPresentationController.prototype.fetchPreviousBulkWireFileTransactions = function(param, isFile) {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getPreviousPage();
        this.fetchBulkWireTransactions(param, isFile);
    };
    /**Initialises the pagination values to fetch file activity transactions for next page
     */
    WireTransferPresentationController.prototype.fetchNextBulkWireFileTransactions = function(param, isFile) {
        var paginationManager = applicationManager.getPaginationManager();
        paginationManager.getNextPage();
        this.fetchBulkWireTransactions(param, isFile);
    };
    /** Search BulkWireFile Transactions
     * @member  WireTrasferNewPresentationController
     * @param  {object} data Search Inputs
     * @throws {void} None
     * @returns {void} None
     */
    WireTransferPresentationController.prototype.searchBulkWireFileTransactions = function(data) {
        var searchInputs = {
            searchString: data.searchKeyword,
            bulkWireFileID: data.bulkWireFileID
        }
        this.showProgressBar();
        applicationManager.getTransactionManager().fetchBulkWireFilesTransactions(searchInputs, this.searchBulkWireFileTransactionsSuccess.bind(this, searchInputs), this.searchBulkWireFileTransactionsFailure.bind(this));
    };
    /** Search BulkWireFile Transactions
     * @member  searchSuccess
     * @param  {object} searchInputs Search Inputs
     * @param  {object} payees payees
     */
    WireTransferPresentationController.prototype.searchBulkWireFileTransactionsSuccess = function(searchInputs, files) {
        var viewModel = {};
        viewModel.searchBulkWireFiles = {
            bulkWireTransactions: files.BulkWireFileTransactDetails,
            searchInputs: searchInputs
        }
        this.hideProgressBar("frmBulkWireFileTransactionsActivity");
        if (kony.application.getCurrentForm().id === "frmBulkWireFileTransactionsActivity") {
            applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkWireFileTransactionsActivity");
        }

    };
    /** Search BulkWireFile Transactions
     * @member  WireTrasferNewPresentationController
     * @param  {object} searchInputs Search Inputs
     * @param {object} response
     * @returns {void} None
     */
    WireTransferPresentationController.prototype.searchBulkWireFileTransactionsFailure = function(searchInputs, response) {
        var viewModel = {};
        viewModel.searchBulkWireFiles = {
            "error": response.errorMessage
        };
        this.hideProgressBar("frmBulkWireFileTransactionsActivity");
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkWireFileTransactionsActivity");
    };

    WireTransferPresentationController.prototype.showBulkWireLineItems = function(params, context) {
        var self = this;
        var paginationManager = applicationManager.getPaginationManager();
        var param = paginationManager.getValues(this.bulkwirefilelineitemsConfig, params);
        if (params !== undefined) {
            param.sortBy = params.sortBy;
        } else {
            param.sortBy = "recipientName";
        }

        function bulkWireDataCompletionCallback(syncResponseObject) {
            if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
                self.fetchFileLineItemsAndCheckingAccountSuccess(syncResponseObject.responses[0].data, syncResponseObject.responses[1].data);
            } else {
                self.fetchFileLineItemsOrCheckingAccountFailure();
            }
        }
        // applicationManager.getNavigationManager().navigateTo("frmBulkWireViewFileDetails");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkWireViewFileDetails": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true,
            }
        }, "frmBulkWireViewFileDetails");

        var fileObj = {}
        if (params != null && params != undefined)
            fileObj = {
                bulkWireFileID: params.bulkWireFileID,
                sortBy: params.sortBy ? params.sortBy : "",
                "pageOffset": param.offset,
                "pageSize": param.limit,
                "sortByParam": param.sortBy,
                "sortOrder": param.order,
                searchString: params.searchKeyword ? params.searchKeyword : ""
            }
        if (context != "search") {
            applicationManager.getNavigationManager().updateForm({
                fileDetails: params
            }, "frmBulkWireViewFileDetails");
            var asyncManager = applicationManager.getAsyncManager();
            asyncManager.callAsync(
                [
                    asyncManager.asyncItem(applicationManager.getTransactionManager(), "fetchBulkWireFileLineItems", [fileObj]),
                    asyncManager.asyncItem(applicationManager.getAccountManager(), "fetchCheckingAccounts")
                ], bulkWireDataCompletionCallback);
        } else {
            applicationManager.getTransactionManager().fetchBulkWireFileLineItems(fileObj, this.fetchFileLineItemSuccess.bind(this), this.fetchFileLineItemsOrCheckingAccountFailure.bind(this));
        }
    };

    WireTransferPresentationController.prototype.fetchFileLineItemsAndCheckingAccountSuccess = function(bulkWireResponse, accountsResponse) {
        var paginationManager = applicationManager.getPaginationManager();
        accountsResponse =  accountsResponse.filter(account => {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
          }) 
        var response = {};
        response.pagination = paginationManager.getValues(this.bulkwirefilelineitemsConfig);
        response.config = this.bulkwiretransactionsConfig;
        response.bulkWireResponse = bulkWireResponse.BulkWireFileLineItems[0];
        response.accountsResponse = accountsResponse;
        applicationManager.getNavigationManager().updateForm({
            "recipientsData": response
        }, "frmBulkWireViewFileDetails");
    };

    WireTransferPresentationController.prototype.fetchFileLineItemsOrCheckingAccountFailure = function() {
        CommonUtilities.showServerDownScreen();
    };

    WireTransferPresentationController.prototype.fetchFileLineItemSuccess = function(bulkWireResponse) {
        var response = {};
        response.bulkWireResponse = bulkWireResponse;
        response.isSearchSort = true;
        applicationManager.getNavigationManager().updateForm({
            "recipientsData": response
        }, "frmBulkWireViewFileDetails");
    };

    WireTransferPresentationController.prototype.searchBulkWireFileLineItems = function(data) {
        if (data && data.searchKeyword.length > 0) {
            var searchInputs = {
                searchString: data.searchKeyword,
                bulkWireFileID: data.bulkWireFileID
            }
            this.showProgressBar();
            applicationManager.getTransactionManager().fetchBulkWireFileLineItems(searchInputs, this.searchBulkWireFileLineItemsSuccess.bind(this, searchInputs), this.searchBulkWireFileLineItemsFailure.bind(this));
        }
    };
    /** Search BulkWireFile Transactions
     * @member  searchSuccess
     * @param  {object} searchInputs Search Inputs
     * @param  {object} payees payees
     */
    WireTransferPresentationController.prototype.searchBulkWireFileLineItemsSuccess = function(searchInputs, files) {
        var viewModel = {};
        viewModel.searchBulkWireFiles = {
            bulkWireResponse: files.BulkWireFileLineItems[0],
            searchInputs: searchInputs
        }
        this.hideProgressBar("frmBulkWireViewFileDetails");
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkWireViewFileDetails");
    };
    /** Search BulkWireFile Transactions
     * @member  WireTrasferNewPresentationController
     * @param  {object} searchInputs Search Inputs
     * @param {object} response
     * @returns {void} None
     */
    WireTransferPresentationController.prototype.searchBulkWireFileLineItemsFailure = function(searchInputs, response) {
        var viewModel = {};
        viewModel.searchBulkWireFiles = {
            "error": searchInputs.errorMessage
        };
        this.hideProgressBar("frmBulkWireFileTransactionsActivity");
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkWireFileTransactionsActivity");
    };




    WireTransferPresentationController.prototype.createBulkWireTransaction = function(bulkWireObject, bulkWireFileInfo) {
        var mfaManager = applicationManager.getMFAManager();
        mfaManager.setMFAFlowType("CREATE_BULKWIRE_TRANSFER");
        var asyncManager = applicationManager.getAsyncManager();
        this.showProgressBar();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(applicationManager.getTransactionManager(), "createBulkWireTransaction", [bulkWireObject]),
                asyncManager.asyncItem(applicationManager.getAccountManager(), "fetchInternalAccounts")
            ], bulkWireExecutionCompletionCallback.bind(this));
        var self = this;

        function bulkWireExecutionCompletionCallback(syncResponseObject) {
            if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
                self.onCreateBulkWireTransactionSuccess(syncResponseObject.responses[0].data, syncResponseObject.responses[1].data, bulkWireFileInfo);
            } else {
                if (syncResponseObject.responses[0].isSuccess)
                    self.onCreateBulkWireTransactionFailure(syncResponseObject.responses[1].data);
                else
                    self.onCreateBulkWireTransactionFailure(syncResponseObject.responses[0].data);
            }
        }
        //      applicationManager.getTransactionManager().createBulkWireTransaction(bulkWireObject,this.onCreateBulkWireTransactionSuccess.bind(this),this.onCreateBulkWireTransactionFailure.bind(this));
    };

    WireTransferPresentationController.prototype.onCreateBulkWireTransactionSuccess = function(response, accResponse, bulkWireFileInfo) {
        var mfaManager = applicationManager.getMFAManager();
        var operationName = this.getOperationName();
        bulkWireFileInfo.fileName = bulkWireFileInfo.bulkWireFileName;
        bulkWireFileInfo.initiatedBy = applicationManager.getUserPreferencesManager().getUserObj().userfirstname + " " + applicationManager.getUserPreferencesManager().getUserObj().userlastname;
        bulkWireFileInfo.initiatedOn = CommonUtilities.getFrontendDateString(new Date().toISOString());
        accResponse =  accResponse.filter(account => {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
        }) 
        this.bulkWireFileInfo = bulkWireFileInfo;
        this.accounts = accResponse;
        if (response.MFAAttributes) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": applicationManager.getMFAManager().getMFAFlowType(),
                "response": response,
                "objectServiceDetails": {
                    "action": "Wire Transfer",
                    "serviceName": "TransactionObjects",
                    "dataModel": "Transaction",
                    "verifyOTPOperationName": operationName,
                    "requestOTPOperationName": operationName,
                    "resendOTPOperationName": operationName,
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            this.showBulkWireAcknowlegmentScreen(response);
        }
    };

    WireTransferPresentationController.prototype.showBulkWireAcknowlegmentScreen = function(response) {
        var scopeObj = this;
        var executionResponseID;
        if (response.BulkWireExecutionDetails[0].Domestic.length > 0) {
            executionResponseID = (response.BulkWireExecutionDetails[0].Domestic[0].wireFileExecution_id && response.BulkWireExecutionDetails[0].Domestic[0].wireFileExecution_id != "0") ? response.BulkWireExecutionDetails[0].Domestic[0].wireFileExecution_id : response.BulkWireExecutionDetails[0].Domestic[0].wireTemplateExecution_id;
        } else if (response.BulkWireExecutionDetails[0].International.length > 0) {
            executionResponseID = (response.BulkWireExecutionDetails[0].International[0].wireFileExecution_id && response.BulkWireExecutionDetails[0].International[0].wireFileExecution_id != "0") ? response.BulkWireExecutionDetails[0].International[0].wireFileExecution_id : response.BulkWireExecutionDetails[0].International[0].wireTemplateExecution_id;
        }
        response.sortConfig = {
            executionID: executionResponseID ? executionResponseID : "",
            sortBy: "",
            order: "",
            searchString: "",
            filterBy: ""
        };
        // applicationManager.getNavigationManager().navigateTo("frmBulkWireActivityAll");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkWireActivityAll": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            acknowledgment: response,
            checkingAccounts: scopeObj.accounts,
            notSearchFlow: true,
            fileDetails: scopeObj.bulkWireFileInfo
        }, "frmBulkWireActivityAll");
    };

    WireTransferPresentationController.prototype.onCreateBulkWireTransactionFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "errorMessage": response
        }, "frmBulkWireConfirmTransfer");
    };
    /** Search Payees error
     * @member  TransferFastPresentationController
     * @param  {object} searchInputs Search Inputs
     * @param {object} response
     * @returns {void} None
     */
    WireTransferPresentationController.prototype.fetchFileTransactionActivityByExecutionID = function(inputsParam, context) {
        this.showProgressBar();
        var self = this;

        function bulkWireExecutionCompletionCallback(context, params, syncResponseObject) {
            if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
                self.fetchFileTransactionActivityByExecutionIDSuccess(syncResponseObject.responses[0].data, syncResponseObject.responses[1].data, context, params);
            } else {
                if (syncResponseObject.responses[0].isSuccess)
                    self.fetchFileTransactionActivityByExecutionIDFailure(syncResponseObject.responses[1].data);
                else
                    self.fetchFileTransactionActivityByExecutionIDFailure(syncResponseObject.responses[0].data);
            }
        }
        var params = {
            BulkWireFileExecution_id: inputsParam.executionID,
            sortByParam: inputsParam.sortBy ? inputsParam.sortBy : "",
            sortOrder: inputsParam.order ? inputsParam.order : "",
            searchString: inputsParam.searchString ? inputsParam.searchString : "",
            statusFilter: inputsParam.filterBy ? inputsParam.filterBy : ""
        }

        var asyncManager = applicationManager.getAsyncManager();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(applicationManager.getTransactionManager(), "getFileTransactionActivityByExecutionID", [params]),
                asyncManager.asyncItem(applicationManager.getAccountManager(), "fetchInternalAccounts")
            ], bulkWireExecutionCompletionCallback.bind(this, context, inputsParam));
        //   applicationManager.getTransactionManager().getFileTransactionActivityByExecutionID(params,this.fetchFileTransactionActivityByExecutionIDSuccess.bind(this,context, params), this.fetchFileTransactionActivityByExecutionIDFailure.bind(this));  
    };

    /** Search Payees error
     * @member  TransferFastPresentationController
     * @param  {object} searchInputs Search Inputs
     * @param {object} response
     * @returns {void} None
     */
    WireTransferPresentationController.prototype.getBWTTransactionActivityByExecutionID = function(inputsParam, context) {
        this.showProgressBar();
        var self = this;

        function bulkWireExecutionCompletionCallback(context, params, syncResponseObject) {
            if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
                self.fetchFileTransactionActivityByExecutionIDSuccess(syncResponseObject.responses[0].data, syncResponseObject.responses[1].data, context, params);
            } else {
                if (syncResponseObject.responses[0].isSuccess)
                    self.fetchFileTransactionActivityByExecutionIDFailure(syncResponseObject.responses[1].data);
                else
                    self.fetchFileTransactionActivityByExecutionIDFailure(syncResponseObject.responses[0].data);
            }
        }
        var params = {
            BulkWireTemplateExecution_id: inputsParam.executionID,
            sortByParam: inputsParam.sortBy ? inputsParam.sortBy : "",
            sortOrder: inputsParam.order ? inputsParam.order : "",
            searchString: inputsParam.searchString ? inputsParam.searchString : "",
            statusFilter: inputsParam.filterBy ? inputsParam.filterBy : ""
        }

        var asyncManager = applicationManager.getAsyncManager();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(applicationManager.getTransactionManager(), "fetchBWTemplateTransactionsByExecutionId", [params]),
                asyncManager.asyncItem(applicationManager.getAccountManager(), "fetchInternalAccounts")
            ], bulkWireExecutionCompletionCallback.bind(this, context, inputsParam));
    };


    /** Search Payees error
     * @member  TransferFastPresentationController
     * @param  {object} searchInputs Search Inputs
     * @param {object} response
     * @returns {void} None
     */
    WireTransferPresentationController.prototype.fetchFileTransactionActivityByExecutionIDSuccess = function(response, accResponse, context, searchParams) {
        response.sortConfig = searchParams;
        // applicationManager.getNavigationManager().navigateTo(context.formName);
        var obj = {
            "context": this,
            "callbackModelConfig": {
                [context.formName]: true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        accResponse =  accResponse.filter(account => {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
          }) 
        if (!(searchParams.searchString.trim() != "" && context.formName == "frmBulkWireActivityAll")) {
            applicationManager.getNavigationManager().updateForm({
                countResponse: context.counts
            }, context.formName);
        }
        applicationManager.getNavigationManager().updateForm({
            checkingAccounts: accResponse,
            fileDetails: context.fileDetails
        }, context.formName);
        if (context.isAcknowledgment == true) {
            applicationManager.getNavigationManager().updateForm({
                acknowledgment: response
            }, context.formName);
        } else {
            applicationManager.getNavigationManager().updateForm({
                activity: response
            }, context.formName);
        }
        if (searchParams.searchString.trim() == "") {
            applicationManager.getNavigationManager().updateForm({
                notSearchFlow: true
            }, context.formName);
        }
        this.hideProgressBar(context.formName);
    };
    /** Search Payees error
     * @member  TransferFastPresentationController
     * @param  {object} searchInputs Search Inputs
     * @param {object} response
     * @returns {void} None
     */
    WireTransferPresentationController.prototype.fetchFileTransactionActivityByExecutionIDFailure = function(response, formName) {
        var viewModel = {};
        viewModel.serverError = response.errorMessage;
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm(viewModel, formName);

    };
    WireTransferPresentationController.prototype.navigateToBulkTransferFiles = function(requestParam) {
        var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName" : "WireTransferMA"});
        var params = {
            "formName": "frmBulkTransferFiles"
        };
        wireTransferModule.presentationController.showBulkwirefiles(params);

    };

    WireTransferPresentationController.prototype.showRemovedRecipient = function(removedRecipient, bulkWireResponse, checkingAccounts, fileInfo) {
        // applicationManager.getNavigationManager().navigateTo("frmBulkWireTransferRemovedRecipients");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkWireTransferRemovedRecipients": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        this.showProgressBar("frmBulkWireTransferRemovedRecipients");
        var response = {};
        response.removedRecipientData = removedRecipient;
        response.originaRecipientlData = bulkWireResponse;
        response.checkingAccounts = checkingAccounts;
        response.bulkWireFileInfo = fileInfo;
        applicationManager.getNavigationManager().updateForm({
            "recipientsData": response
        }, "frmBulkWireTransferRemovedRecipients");
    };

    /**
     * showBulkWireAddTemplateFile : Method to navigate to frmAddBulkTemplateFile
     * @member of {ACHModule_PresentationController}
     * @return {} 
     */
    WireTransferPresentationController.prototype.showBulkWireAddTemplateFile = function() {
        // applicationManager.getNavigationManager().navigateTo('frmAddBulkTemplateFile');
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmAddBulkTemplateFile": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
    };

    WireTransferPresentationController.prototype.showBulkWireEditTemplateFile = function() {
        // applicationManager.getNavigationManager().navigateTo('frmEditBulkTemplateFile');
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmEditBulkTemplateFile": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
    };

    /**
     * uploadEditBulkWireTemplateFile : Method to upload File
     * @member of {WireTransferModule_PresentationController}
     * @param {requestParam} : File records  
     * @return {Object} :  Array of recipients 
     */
    WireTransferPresentationController.prototype.uploadEditBulkWireTemplateFile = function(requestParam) {
        var scopeObj = this;
        applicationManager.getTransactionManager().UploadBWTemplateFile(requestParam,
            scopeObj.onUploadEditFileSuccess.bind(scopeObj),
            scopeObj.onUploadEditFileFailure.bind(scopeObj)
        );
    };

    /**
     * onUploadEditFileSuccess : Method called on the successful execution of the file
     * @member of {WireTransferModule_PresentationController}
     * @param {} :  
     * @return {Object} :  Array of recipients 
     */
    WireTransferPresentationController.prototype.onUploadEditFileSuccess = function(response) {
        // applicationManager.getNavigationManager().navigateTo('frmBWTEditRecipientFile');
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBWTEditRecipientFile": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true,
            }
        }, "frmBWTEditRecipientFile");
        applicationManager.getNavigationManager().updateForm({
            "fileRecipientData": response.recipients
        }, "frmBWTEditRecipientFile");
    };

    /**
     * onUploadEditFileFailure : Method called on the failure of execution of the file
     * @member of {WireTransferModule_PresentationController}
     * @param {} :  
     * @return {Object} :  Array of recipients 
     */
    WireTransferPresentationController.prototype.onUploadEditFileFailure = function(response) {
        if (response.dbpErrCode == 14006)
            response.dbpErrMsg = kony.i18n.getLocalizedString("i18n.bulkwires.errorcode.14006Recipients") + " " + applicationManager.getConfigurationManager().bulkWireFileTransactionsLimit + ".";
        applicationManager.getNavigationManager().updateForm({
            "serverError": response.dbpErrMsg
        }, "frmEditBulkTemplateFile");
    };

    /**
     * uploadBulkWireTemplateFile : Method to upload File
     * @member of {ACHModule_PresentationController}
     * @param {requestParam} : File records  
     * @return {Object} :  Array of recipients 
     */
    WireTransferPresentationController.prototype.uploadBulkWireTemplateFile = function(requestParam) {
        var scopeObj = this;
        applicationManager.getTransactionManager().UploadBWTemplateFile(requestParam,
            scopeObj.onUploadFileSuccess.bind(scopeObj),
            scopeObj.onUploadFileFailure.bind(scopeObj)
        );
    };

    /**
     * onUploadFileSuccess : Method called on the successful execution of the file
     * @member of {ACHModule_PresentationController}
     * @param {} :  
     * @return {Object} :  Array of recipients 
     */
    WireTransferPresentationController.prototype.onUploadFileSuccess = function(response) {
        // applicationManager.getNavigationManager().navigateTo('frmBWTCreateRecipientFile');
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBWTCreateRecipientFile": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                status: true,
            }
        }, "frmBWTCreateRecipientFile");
        applicationManager.getNavigationManager().updateForm({
            "fileRecipientData": response.recipients
        }, "frmBWTCreateRecipientFile");
    };

    /**
     * onUploadFileFailure : Method called on the failure of execution of the file
     * @member of {ACHModule_PresentationController}
     * @param {} :  
     * @return {Object} :  Array of recipients 
     */
    WireTransferPresentationController.prototype.onUploadFileFailure = function(response) {
        response = response.serverErrorRes;
        if (response.dbpErrCode == 14006)
            response.dbpErrMsg = kony.i18n.getLocalizedString("i18n.bulkwires.errorcode.14006Recipients") + " " + applicationManager.getConfigurationManager().bulkWireFileTransactionsLimit + ".";
        if (response.dbpErrCode == 14004)
            response.dbpErrMsg = kony.i18n.getLocalizedString("i18n.bulkwires.errorcode.14004");
        applicationManager.getNavigationManager().updateForm({
            "serverError": response.dbpErrMsg
        }, "frmAddBulkTemplateFile");
    };

    /**
     * addData : Method to add recipient data to the recipientData global
     * @member of {ACHModule_PresentationController}
     * @param {Object} : newData - Recipient Array
     * @param {boolean} : isUpdate - If flow is update then it is true else false
     * @return {Object} : recipient Array   
     */
    WireTransferPresentationController.prototype.addData = function(newData, isUpdate) {
        var self = this;
        if (isUpdate) {
            for (var eIndex = 0; eIndex < this.recipientData.length; eIndex++) {
                for (var nIndex = 0; nIndex < newData.length; nIndex++) {
                    if (this.recipientData[eIndex].recipientID === newData[nIndex].recipientID) {
                        this.recipientData[eIndex] = newData[nIndex];
                    }
                }
            }
        } else {
            newData.forEach(function(item) {
                self.recipientData.push(item);
            })
        }
        return this.recipientData;
    };

    /**
     * removeRecord : Method to remove recipient from recipientData global
     * @member of {ACHModule_PresentationController}
     * @param {Object} : record - Recipient data
     * @return {Object} : recipient Array   
     */
    WireTransferPresentationController.prototype.removeRecord = function(record) {
        for (var eIndex = 0; eIndex < this.recipientData.length; eIndex++) {
            for (var nIndex = 0; nIndex < record.length; nIndex++) {
                if (this.recipientData[eIndex].recipientID === record[nIndex].recipientID) {
                    this.recipientData.splice(eIndex, 1);
                }
            }
        }
        return this.recipientData;
    };

    /**
     * addData : Method to add Selected recipient data to the existingrecipientData global
     * @member of {ACHModule_PresentationController}
     * @param {Object} : newData - Recipient Array
     * @param {boolean} : isUpdate - If flow is update then it is true else false
     * @return {Object} : recipient Array   
     */
    WireTransferPresentationController.prototype.addSelectedRecipientData = function(newData) {
        var self = this;
        newData.forEach(function(item) {
            self.selectedRecipients.push(item);
        })
        return this.selectedRecipients;
    };
    /**
     * removeRecord : Method to remove existingrecipientDatarecipient from existingrecipientData global
     * @member of {ACHModule_PresentationController}
     * @param {Object} : record - Recipient data
     * @return {Object} : recipient Array   
     */
    WireTransferPresentationController.prototype.removeSelectedExistingRecord = function(record) {
        for (var eIndex = 0; eIndex < this.selectedRecipients.length; eIndex++) {
            for (var nIndex = 0; nIndex < record.length; nIndex++) {
                if (this.selectedRecipients[eIndex].recipientID === record[nIndex].recipientID) {
                    this.selectedRecipients.splice(eIndex, 1);
                }
            }
        }
        return this.selectedRecipients;
    };

    /**
     * addData : Method to add Selected recipient data to the existingrecipientData global
     * @member of {ACHModule_PresentationController}
     * @param {Object} : newData - Recipient Array
     * @param {boolean} : isUpdate - If flow is update then it is true else false
     * @return {Object} : recipient Array   
     */
    WireTransferPresentationController.prototype.addExistingEditRecipients = function(newData) {
        var self = this;
        newData.forEach(function(item) {
            self.editselectedRecipients.push(item);
        })
        return this.editselectedRecipients;
    };
    /**
     * removeRecord : Method to remove existingrecipientDatarecipient from existingrecipientData global
     * @member of {ACHModule_PresentationController}
     * @param {Object} : record - Recipient data
     * @return {Object} : recipient Array   
     */
    WireTransferPresentationController.prototype.removeExistingEditRecipients = function(record) {
        for (var eIndex = 0; eIndex < this.editselectedRecipients.length; eIndex++) {
            if (this.editselectedRecipients[eIndex].payeeId === record.payeeId) {
                this.editselectedRecipients.splice(eIndex, 1);
            }
        }
        return this.editselectedRecipients;
    };


    /**
     * addAdditionalKeysInRecipientsRecord : Method to add additional keys in recipient data
     * @member of {ACHModule_PresentationController}
     * @param {Object} : data - Recipient data
     * @return {Object} : recipient Array   
     */
    WireTransferPresentationController.prototype.addAdditionalKeysInRecipientsRecord = function(data, templateRecipientCategory) {
        data.forEach(function(item) {
            item.recipientID = CommonUtilities.getID();
            item.isDeleted = false;
            item.templateRecipientCategory = templateRecipientCategory;
            if (item.payeeId == "") {
                item.payeeId = null;
            }
        })
        return data;
    };
    /**
     * addAdditionalKeysInEditRecipientsRecord : Method to add additional keys in recipient data
     * @member of {ACHModule_PresentationController}
     * @param {Object} : data - Recipient data
     * @return {Object} : recipient Array   
     */
    WireTransferPresentationController.prototype.addAdditionalKeysInEditRecipientsRecord = function(data, templateRecipientCategory) {
        data.forEach(function(item) {
            item.templateRecipientCategory = templateRecipientCategory;
            if (item.payeeId == "") {
                item.payeeId = null;
            }
        })
        return data;
    };
    /**
     * sortBWTStringRecords : Method to sort record based on params and order
     * @member of {ACHModule_PresentationController}
     * @param {Object} : data - Recipient data
     * @param {Object} : sortParam - Parameter on which sorting is to be performed 
     * @param {Object} : data - sorting Order i.e ASC DSC
     * @return {Object} : recipient Array   
     */
    WireTransferPresentationController.prototype.sortBWTStringRecords = function(data, sortParam, sortOrder) {
        if (sortOrder === "ASC") {
            data.sort(function(name1, name2) {
                if (name1 && name2)
                    return name1[sortParam].localeCompare(name2[sortParam])
            })
        }
        if (sortOrder === "DSC") {
            data.sort(function(name1, name2) {
                if (name1 && name2)
                    return name2[sortParam].localeCompare(name1[sortParam])
            })
        }
        return data;
    };

    /**
     * sortBWTStringRecords : Method to sort record based on params and order
     * @member of {ACHModule_PresentationController}
     * @param {Object} : data - Recipient data
     * @param {Object} : sortParam - Parameter on which sorting is to be performed 
     * @param {Object} : data - sorting Order i.e ASC DSC
     * @return {Object} : recipient Array   
     */
    WireTransferPresentationController.prototype.sortBWTNumberRecords = function(data, sortParam, sortOrder) {
        if (sortOrder === "ASC") {
            data.sort(function(value1, value2) {
                if (value1 && value2)
                    return value1.sortParam - value2.sortParam;
            })
        }
        if (sortOrder === "DSC") {
            data.sort(function(value1, value2) {
                if (value1 && value2)
                    return value2.sortParam - value1.sortParam;
            })
        }
        return data;
    };

    /**
     * BWTLocalSearch : Method to search records based on given pattern
     * @member of {ACHModule_PresentationController}
     * @param {Object} : data - Recipient data
     * @param {Object} : pattern - text to be searched
     * @return {Object} : recipient Array   
     */
    WireTransferPresentationController.prototype.BWTLocalSearch = function(data, pattern, additionalFilter) {
        if (pattern === "" && additionalFilter === null)
            return data;

        function filterRecords(record) {
            for (var key in record) {
                if (record.hasOwnProperty(key)) {
                    var rValue = record[key];
                    if (!isNaN(rValue)) {
                        rValue = "" + rValue;
                        if (rValue.indexOf(pattern) >= 0) {
                            return record;
                        }
                    } else {
                        if (rValue !== undefined && typeof rValue !== "object") {
                            rValue = rValue.toLocaleLowerCase();
                            if (rValue.indexOf(pattern) >= 0) {
                                return record;
                            }
                        }
                    }
                }
            }
        }
        if (isNaN(pattern)) {
            pattern = pattern.toLocaleLowerCase();
        }
        var result = data.filter(filterRecords);

        function requiredFilter(record, additionalFilter) {
            for (var key in record) {
                if (record.hasOwnProperty(key)) {
                    if (key === additionalFilter.key && record[key] === additionalFilter.value) {
                        return record;
                    }
                }
            }
        }
        if (additionalFilter) {
            result = result.filter(function(record) {
                return requiredFilter(record, additionalFilter)
            })
        }
        return result;
    };

    WireTransferPresentationController.prototype.setPrimaryDetails = function(params) {
        this.primaryDetails = params;
    };
    WireTransferPresentationController.prototype.getPrimaryDetails = function() {
        return this.primaryDetails;
    };
    WireTransferPresentationController.prototype.getDefaultFromAccount = function() {
        return this.primaryDetails != "" ? this.primaryDetails.defaultFromAccount : "";
    };
    WireTransferPresentationController.prototype.getDefaultCurrency = function() {
        return this.primaryDetails != "" ? this.primaryDetails.defaultCurrency : "";
    };
    WireTransferPresentationController.prototype.getBulkWireTemplateName = function() {
        return this.primaryDetails != "" ? this.primaryDetails.bulkWireTemplateName : "";
    };
    WireTransferPresentationController.prototype.setBulkWireTemplateId = function(params) {
        this.templateID = params;
    };
    WireTransferPresentationController.prototype.getBulkWireTemplateID = function() {
        return this.templateID != "" ? this.templateID.bulkWireTemplateID : "";
    };
    WireTransferPresentationController.prototype.EditAddedRecipients = function() {
        this.navigateToAddRecipientsForm();
        applicationManager.getNavigationManager().updateForm({
            "editData": true
        }, "frmBulkwireCreateTemplateConfirm");
    };
    WireTransferPresentationController.prototype.navigateToAddRecipientsForm = function() {
        this.showProgressBar();
        // applicationManager.getNavigationManager().navigateTo("frmBulkTemplateAddRecipients");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkTemplateAddRecipients": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            "recipientData": this.recipientData,
            "showLoadingIndicator": {
                "status": false
            }
        }, "frmBulkTemplateAddRecipients");
    };
    WireTransferPresentationController.prototype.navigateToEditRecipientsForm = function() {
        this.showProgressBar();
        // applicationManager.getNavigationManager().navigateTo("frmBulkTemplateEditRecipients");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkTemplateEditRecipients": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            "recipientData": this.recipientData,
            "isLoading" : false
        }, "frmBulkTemplateEditRecipients");
    };
    WireTransferPresentationController.prototype.navigateToTemplateConfirmForm = function() {
        // applicationManager.getNavigationManager().navigateTo("frmBulkwireCreateTemplateConfirm");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkwireCreateTemplateConfirm": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
    };
    /**
     * Shows form for Creating new Template
     */
    WireTransferPresentationController.prototype.navigateToCreateTemplateForm = function() {
        this.showProgressBar();
        applicationManager.getAccountManager().fetchCheckingAccounts(this.onCheckingAccountSuccessForCreateTemplate.bind(this), this.serverError.bind(this));
    };
    /**
     * Calls when checking accounts are successfully fetched for create template also shows the UI
     * @param {Account[]} checkingAccounts Checking Accounts for selection
     */
    WireTransferPresentationController.prototype.onCheckingAccountSuccessForCreateTemplate = function(checkingAccounts) {
        this.hideProgressBar();
        checkingAccounts =  checkingAccounts.filter(account => {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
          }) 
        // var obj = {
        //     "context": this,
        //     "callbackModelConfig": {
        //         "frmCreateTemplatePrimaryDetails": true
        //     }
        // };
        // var navManager = kony.mvc.getNavigationManager();
        // navManager.navigate(obj);
        applicationManager.getNavigationManager().navigateTo({
            appName: 'WireTransferMA',
            friendlyName: "frmCreateTemplatePrimaryDetails"
        });
        applicationManager.getNavigationManager().updateForm({
            "fromDefaultAccounts": checkingAccounts
        }, "frmCreateTemplatePrimaryDetails");
    };
    WireTransferPresentationController.prototype.navigateFromEditAckoPrimary = function() {
        var self = this;
        applicationManager.getAccountManager().fetchCheckingAccounts(function(checkingAccounts) {
            // applicationManager.getNavigationManager().navigateTo("frmEditTemplatePrimaryDetails");
            var obj = {
                "context": self,
                "callbackModelConfig": {
                    "frmEditTemplatePrimaryDetails": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: false,
                }
            }, "frmEditTemplatePrimaryDetails");
            applicationManager.getNavigationManager().updateForm({
                "fromAck": true,
                "checkingAccounts": checkingAccounts
            }, "frmEditTemplatePrimaryDetails");
        }, this.serverError.bind(this));
    };

    /**
     * createBWTemplate : Method to create template
     * @member of {WireTransferPresentationController}
     * @param {requestParam} : template details 
     */
    WireTransferPresentationController.prototype.createBWTemplate = function(requestParams) {
        var scopeObj = this;
        applicationManager.getTransactionManager().createBWTemplate(requestParams, this.createBWTemplateSuccess.bind(this), this.createBWTemplateFailure.bind(this));
    };

    /**Success callback after creation of a template
     * @param  {object} response object which consists of template details
     */
    WireTransferPresentationController.prototype.createBWTemplateSuccess = function(response) {
        var viewModel = {
            "createSuccess": response
        };
        // applicationManager.getNavigationManager().navigateTo("frmBulkWireCreateTemplateAck");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkWireCreateTemplateAck": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkWireCreateTemplateAck");
        this.resetPrimaryDetails();
        this.resetRecipientData();
        this.hideProgressBar("frmBulkWireCreateTemplateAck");
    };
    /**Failure callback during creation of a template
     * @param  {object} response failure object which comes from backend
     */
    WireTransferPresentationController.prototype.createBWTemplateFailure = function(response) {
        var viewModel = {
            showLoadingIndicator: {
                status: false,
            },
            "serverError": response.errorMessage
        };
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkwireCreateTemplateConfirm");
    };
    /**
     * Fetch the states by given country Id
     * @param {string} countryId Id of the country
     */
    WireTransferPresentationController.prototype.fetchStatesCreateTemplate = function(countryId) {
        this.showProgressBar();
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.fetchRegionsByCountryCode(countryId, this.fetchStatesCreateTemplateSuccess.bind(this), this.serverError.bind(this));
    }
    /**
     * Calls when fetch state is successful and map states on UI
     * @param {Object[]} states Id of the country
     */
    WireTransferPresentationController.prototype.fetchStatesCreateTemplateSuccess = function(states) {
        this.statesAddManually = states;
    }
    /**
     * Fetch the states by given country Id
     * @param {string} countryId Id of the country
     */
    WireTransferPresentationController.prototype.fetchStatesForAddRecipientsManually = function(countryId, flow, path, records) {
        this.showProgressBar();
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.fetchRegionsByCountryCode(countryId, this.onFetchStatesSuccess.bind(this, flow, path, records), this.onFetchStatesFailure.bind(this));
    }
    /**
     * Calls when fetch state is successful and map states on UI
     * @param {Object[]} states Id of the country
     */
    WireTransferPresentationController.prototype.onFetchStatesSuccess = function(flow, path, records, states) {
        this.statesAddManually = states;
        if (flow === "Add") {
            var formController = applicationManager.getPresentationUtility().getController('frmBulkTemplateAddRecipients', true);
            formController.navToAddRecipientManually(path, records);
        } else {
            var formController = applicationManager.getPresentationUtility().getController('frmBulkTemplateEditRecipients', true);
            formController.navToAddRecipientManually(path, records);
        }
    }
    /**
     * Calls when fetch state is failure and map states on UI
     * @param {Object[]} states Id of the country
     */
    WireTransferPresentationController.prototype.onFetchStatesFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            serverError: {
                errorMessage: response.errorMessage,
            }
        }, "frmBulkTemplateAddRecipients");
    }

    WireTransferPresentationController.prototype.getStates = function() {
        return this.statesAddManually;
    };

    WireTransferPresentationController.prototype.addRecipientsManually = function(data, flow) {
        var recipientManager = applicationManager.getRecipientsManager();
        var param = {
            "payeeNickName": data.accountNickname,
            "payeeAccountNumber": data.recipientAccountNumber,
            "payeeName": data.recipientName,
            "zipCode": data.recipientZipCode,
            "cityName": data.recipientCity,
            "state": data.recipientState,
            "addressLine1": data.recipientAddressLine1,
            "addressLine2": data.recipientAddressLine2,
            "type": data.transactionType,
            "country": "United States of America",
            "bankName": data.recipientBankName,
            "bankAddressLine1": data.recipientBankAddress1,
            "bankAddressLine2": data.recipientBankAddress2,
            "bankCity": data.recipientBankcity,
            "bankState": data.recipientBankstate,
            "bankZip": data.recipientBankZipCode,
            "wireAccountType": data.bulkWireTransferType,
            "routingCode": data.routingNumber,
            "isBusinessPayee": data.isBusinessPayee
        }
        if (data.bulkWireTransferType == "International") {
            param.swiftCode = data.swiftCode;
            param.internationalRoutingCode = data.internationalRoutingNumber;
            recipientManager.saveWireTransferRecipient(param, this.addRecipientsManuallySuccess.bind(this, data, flow), this.addRecipientManuallyInternationalError.bind(this, flow));
        } else {
            recipientManager.saveWireTransferRecipient(param, this.addRecipientsManuallySuccess.bind(this, data, flow), this.addRecipientManuallyError.bind(this, flow));
        }
    };

    /**
     * Calls when add payee is successfull
     * @param {Object} data Object containing data of payee
     * @param {Object} addPayeeResponse Object containing add payee response
     */
    WireTransferPresentationController.prototype.addRecipientsManuallySuccess = function(data, flow, addPayeeResponse) {
        this.hideProgressBar();
        var newData = [];
        data.payeeId = addPayeeResponse.payeeId;
        if (flow === "addRecipient") {
            newData.push(data);
            this.addSelectedRecipientData(newData);
            this.removeRecord(newData);
            this.addAdditionalKeysInRecipientsRecord(newData, OLBConstants.RECIPIENT_CATEGORY.EXISTING_RECIPIENT);
            this.addData(newData, false);
            this.toggleAddRecFlag();
            this.navigateToAddRecipientsForm();
        } else {
            newData.push(data);
            this.UpdateBulkWireTemplateRecipients(newData);
        }
    };
    /**
     * Handles the error for add payee
     */
    WireTransferPresentationController.prototype.addRecipientManuallyError = function(flow, response) {
        this.hideProgressBar();
        if (flow === "addRecipient") {
            // applicationManager.getNavigationManager().navigateTo("frmCreateTempAddDomestic");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmCreateTempAddDomestic": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    ststus: false,
                },
                serverError: {
                    errorMessage: response.errorMessage,
                }
            }, "frmCreateTempAddDomestic");
        } else {
            // applicationManager.getNavigationManager().navigateTo("frmEditTempAddDomestic");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmEditTempAddDomestic": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    ststus: false,
                },
                serverError: {
                    errorMessage: response.errorMessage,
                }
            }, "frmEditTempAddDomestic");
        }

    };
    /**
     * Handles the error for add payee
     */
    WireTransferPresentationController.prototype.addRecipientManuallyInternationalError = function(flow, response) {
        this.hideProgressBar();
        if (flow === "addRecipient") {
            // applicationManager.getNavigationManager().navigateTo("frmCreateTempAddInternational");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmCreateTempAddInternational": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    ststus: false,
                },
                serverError: {
                    errorMessage: response.errorMessage,
                }
            }, "frmCreateTempAddInternational");
        } else {
            // applicationManager.getNavigationManager().navigateTo("frmEditTempAddInternational");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmEditTempAddInternational": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    ststus: false,
                },
                serverError: {
                    errorMessage: response.errorMessage,
                }
            }, "frmEditTempAddInternational");
        }

    };

    WireTransferPresentationController.prototype.getAddRecFlag = function() {
        return this.addRecFlag;
    };
    WireTransferPresentationController.prototype.toggleAddRecFlag = function() {
        return (this.addRecFlag) ? this.addRecFlag = false : this.addRecFlag = true;
    };
    WireTransferPresentationController.prototype.getRecipientData = function() {
        return this.recipientData;
    };



    /**
     * isBWTAdditionOfRecordPossible : Method to determine if the recipient data is full
     * @member of {ACHModule_PresentationController}
     * @return {Number} : Number of records that can be added to recipient data
     */
    WireTransferPresentationController.prototype.isBWTAdditionOfRecordPossible = function() {
        var curr_length = this.recipientData.length;
        return 200 - curr_length;
    };
    WireTransferPresentationController.prototype.resetPrimaryDetails = function() {
        this.primaryDetails = "";
    };
    WireTransferPresentationController.prototype.navigateFromAcktoPrimary = function() {
        // applicationManager.getNavigationManager().navigateTo("frmCreateTemplatePrimaryDetails");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmCreateTemplatePrimaryDetails": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            "fromAck": true
        }, "frmCreateTemplatePrimaryDetails");
    };
    WireTransferPresentationController.prototype.resetRecipientData = function() {
        this.recipientData = [];
        this.primaryDetails = "";
        this.selectedRecipients = [];
    };
    WireTransferPresentationController.prototype.getRecord = function(record) {
        for (var eIndex = 0; eIndex < this.recipientData.length; eIndex++) {
            for (var nIndex = 0; nIndex < record.length; nIndex++) {
                if (this.recipientData[eIndex].recipientID === record[nIndex].recipientID) {
                    return this.recipientData[eIndex];
                }
            }
        }
        return null;
    };
    WireTransferPresentationController.prototype.updateRecipientsManually = function(data) {
        var recipientManager = applicationManager.getRecipientsManager();
        var param = {
            "payeeNickName": data.accountNickname,
            "payeeAccountNumber": data.recipientAccountNumber,
            "payeeName": data.recipientName,
            "zipCode": data.recipientZipCode,
            "cityName": data.recipientCity,
            "state": data.recipientState,
            "addressLine1": data.recipientAddressLine1,
            "addressLine2": data.recipientAddressLine2,
            "type": data.transactionType,
            "country": "United States of America",
            "bankName": data.recipientBankName,
            "bankAddressLine1": data.recipientBankAddress1,
            "bankAddressLine2": data.recipientBankAddress2,
            "bankCity": data.recipientBankcity,
            "bankState": data.recipientBankstate,
            "bankZip": data.recipientBankZipCode,
            "wireAccountType": data.bulkWireTransferType,
            "routingCode": data.routingNumber,
            "payeeId": data.payeeId
        }
        if (data.bulkWireTransferType == "International") {
            param.swiftCode = data.swiftCode;
            param.internationalRoutingCode = data.internationalRoutingNumber;
            recipientManager.updateWireTransferRecipient(param, this.updateRecipientDomesticSuccess.bind(this, data), this.updateRecipientInternationalError.bind(this));
        } else {
            recipientManager.updateWireTransferRecipient(param, this.updateRecipientDomesticSuccess.bind(this, data), this.updateRecipientDomesticError.bind(this));
        }
    };

    /**
     * Calls when add payee is successfull
     * @param {Object} data Object containing data of payee
     * @param {Object} addPayeeResponse Object containing add payee response
     */
    WireTransferPresentationController.prototype.updateRecipientDomesticSuccess = function(data, addPayeeResponse) {
        this.hideProgressBar();
        var newData = [];
        data.payeeId = addPayeeResponse.payeeId;
        newData.push(data);
        //this.removeRecord(newData);
        //this.addAdditionalKeysInEditRecipientsRecord(newData, OLBConstants.RECIPIENT_CATEGORY.EXISTING_RECIPIENT);
        //this.addExistingEditRecipients(newData);
        this.addData(newData, true);
        this.toggleAddRecFlag();
        this.navigateToAddRecipientsForm();
    };
    /**
     * Handles the error for add payee
     */
    WireTransferPresentationController.prototype.updateRecipientDomesticError = function(response) {
        this.hideProgressBar();
        // applicationManager.getNavigationManager().navigateTo("frmCreateTempAddDomestic");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmCreateTempAddDomestic": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                ststus: false,
            },
            serverError: {
                errorMessage: response.errorMessage,
            }
        }, "frmCreateTempAddDomestic");
    };
    /**
     * Handles the error for add payee
     */
    WireTransferPresentationController.prototype.updateRecipientInternationalError = function(response) {
        this.hideProgressBar();
        // applicationManager.getNavigationManager().navigateTo("frmCreateTempAddInternational");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmCreateTempAddInternational": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm({
            showLoadingIndicator: {
                ststus: false,
            },
            serverError: {
                errorMessage: response.errorMessage,
            }
        }, "frmCreateTempAddInternational");
    };

    /**
     * deleteTemplate : Method to delete template
     * @member of {WireTransferPresentationController}
     * @param {requestParam} : template details 
     */
    WireTransferPresentationController.prototype.deleteTemplate = function(requestParams) {
        var scopeObj = this;
        applicationManager.getTransactionManager().deleteBWTemplate(requestParams, this.deleteTemplateSuccess.bind(this), this.deleteTemplateFailure.bind(this));
    };

    /**Success callback after deletion of a template
     * @param  {object} response object which consists of template details
     */
    WireTransferPresentationController.prototype.deleteTemplateSuccess = function(response) {
        var params = {
            "formName": "frmBulkTransferFiles",
            "bulkWireCategoryFilter": "Templates"
        };
        this.showBulkwirefiles(params, response.Success);
        this.hideProgressBar();
    };
    /**Failure callback during deletion of a template
     * @param  {object} response failure object which comes from backend
     */
    WireTransferPresentationController.prototype.deleteTemplateFailure = function(response) {
        var viewModel = {
            showLoadingIndicator: {
                status: false,
            },
            "serverError": response.errorMessage
        };
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkWireViewTemplate");
    };

    /**
     * deleteTemplate : Method to delete template recipient
     * @member of {WireTransferPresentationController}
     * @param {requestParam} : template details 
     */
    WireTransferPresentationController.prototype.removeTemplateLineItem = function(requestParams) {
        var scopeObj = this;
        applicationManager.getTransactionManager().removeTemplateRecipient(requestParams, this.removeTemplateLineItemSuccess.bind(this), this.removeTemplateLineItemFailure.bind(this));
    };

    /**Success callback after deletion of a template
     * @param  {object} response object which consists of template details
     */
    WireTransferPresentationController.prototype.removeTemplateLineItemSuccess = function(response) {
        var params = {
            "bulkWireTemplateID": response.bulkWireTemplateID
        };
        this.showBulkWiretemplatesEditRecipients(params, "remove");
        this.hideProgressBar();
    };
    /**Failure callback during deletion of a template
     * @param  {object} response failure object which comes from backend
     */
    WireTransferPresentationController.prototype.removeTemplateLineItemFailure = function(response) {
        var viewModel = {
            showLoadingIndicator: {
                status: false,
            },
            "serverError": response.errorMessage
        };
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkTemplateEditRecipients");
    };


    /**Shows External Accounts Based on flow
     * @param {object} navFlow flow from where the external accounts are suppose to show
     */
    WireTransferPresentationController.prototype.showBulkWiretemplatesEditRecipients = function(navFlow, isUpdate) {
        var paginationManager = applicationManager.getPaginationManager();
        var params = paginationManager.getValues(this.bulkwiretemplatesConfig, navFlow);
        this.getBulkTemplatesLineitems({
            "sortByParam": navFlow.sortBy,
            "sortOrder": params.order,
            "searchString": navFlow.searchKeyword,
            "bulkWireTemplateID": navFlow.bulkWireTemplateID
        }, isUpdate);
    }
    /** Get External accounts from backend
     * @param {object} value - Sorting and pagination parameters
     */
    WireTransferPresentationController.prototype.getBulkTemplatesLineitems = function(value, isUpdate) {
        var transactionManager = applicationManager.getRecipientsManager();
        this.showProgressBar();
        applicationManager.getTransactionManager().fetchBWRecipientsByTemplateID(value, this.getBulktemplateslineitemsSuccess.bind(this, isUpdate), this.getBulktemplateslineitemsFailure.bind(this));
    };
    /**Success callback after external accounts are fetched and updates the from transfers
     * @param  {object} response object which consists of external account
     */
    WireTransferPresentationController.prototype.getBulktemplateslineitemsSuccess = function(isUpdate, response) {
        var paginationManager = applicationManager.getPaginationManager();
        var viewProperties = {};
        viewProperties.bulkWireTemplates = response.BulkWireTemplateLineItems;
        viewProperties.config = this.bulkwiretemplatesConfig;
        viewProperties.updateTemplateSuccess = isUpdate
        // applicationManager.getNavigationManager().navigateTo("frmBulkTemplateEditRecipients");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkTemplateEditRecipients": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmBulkTemplateEditRecipients");
        this.hideProgressBar("frmBulkTemplateEditRecipients");
    };
    /**Failure callback when external accounts are fetched
     * @param  {object} response failure object which comes from backend
     */
    WireTransferPresentationController.prototype.getBulktemplateslineitemsFailure = function(response) {
        var errorExternalAccounts = "errorExternalAccounts";
        this.hideProgressBar("frmBulkTemplateEditRecipients");
        applicationManager.getNavigationManager().updateForm(errorExternalAccounts, "frmBulkTemplateEditRecipients");
    };


    /**
     * deleteTemplate : Method to delete template
     * @member of {WireTransferPresentationController}
     * @param {requestParam} : template details 
     */
    WireTransferPresentationController.prototype.fetchRecipientsByTemplateID = function(params, isUpdate) {
        var scopeObj = this;
        var requestParams = {
            bulkWireTemplateID: params.bulkWireTemplateID,
            sortByParam: params.sortBy ? params.sortBy : "",
            sortOrder: params.order ? params.order : "",
            searchString: params.searchString ? params.searchString : "",
            groupBy: ""
        }
        applicationManager.getTransactionManager().fetchBWRecipientsByTemplateID(requestParams, this.fetchRecipientsByTemplateIDSuccess.bind(this, params, isUpdate), this.fetchRecipientsByTemplateIDFailure.bind(this));
    };

    /**Success callback after deletion of a template
     * @param  {object} response object which consists of template details
     */
    WireTransferPresentationController.prototype.fetchRecipientsByTemplateIDSuccess = function(config, isUpdate, response) {
        var scopeObj = this;
        if (isUpdate) {
            scopeObj.primaryDetails.noOfTransactions = response.BulkWireTemplateLineItems.length;
            if (response.BulkWireTemplateLineItems.length > 0) {
                scopeObj.primaryDetails.noOfDomesticTransactions = response.BulkWireTemplateLineItems.filter(function(item) {
                    return item.bulkWireTransferType == "Domestic";
                }).length;
                scopeObj.primaryDetails.noOfInternationalTransactions = scopeObj.primaryDetails.noOfTransactions - scopeObj.primaryDetails.noOfDomesticTransactions;
            } else {
                scopeObj.primaryDetails.noOfDomesticTransactions = response.BulkWireTemplateLineItems.length;
                scopeObj.primaryDetails.noOfInternationalTransactions = response.BulkWireTemplateLineItems.length;
            }
        }
        var templatesResponse = {
            "recipientsResponse": response.BulkWireTemplateLineItems,
            "sortConfig": config
        }
        var params = {
            "Recipients": templatesResponse,
            "primaryDetails": scopeObj.primaryDetails,
            "updateTemplateSuccess": isUpdate
        };
        if (config.searchString && config.searchString.trim() == "")
            params.notSearchFlow = true;
        else
            params.notSearchFlow = false;
        // applicationManager.getNavigationManager().navigateTo("frmBulkWireViewTemplate");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkWireViewTemplate": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm(params, "frmBulkWireViewTemplate");
        this.hideProgressBar("frmBulkWireViewTemplate");
    };
    /**Failure callback during deletion of a template
     * @param  {object} response failure object which comes from backend
     */
    WireTransferPresentationController.prototype.fetchRecipientsByTemplateIDFailure = function(response) {
        var viewModel = {
            showLoadingIndicator: {
                status: false,
            },
            isLoading: false,
            "serverError": response.errorMessage
        };
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkWireViewTemplate");
    };

    WireTransferPresentationController.prototype.showBulkWireEditRecipientTemplate = function(params, isEdit) {
        var self = this;
        if (isEdit === true) {
            // applicationManager.getNavigationManager().navigateTo("frmBulkWireEditTemplateRecipient");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmBulkWireEditTemplateRecipient": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true,
                }
            }, "frmBulkWireEditTemplateRecipient");
            applicationManager.getNavigationManager().updateForm({
                "templateRecipientsData": params
            }, "frmBulkWireEditTemplateRecipient");

        } else {
            function bulkWireTemplateDataCompletionCallback(syncResponseObject) {
                if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
                    self.fetchBWTLineItemAndCheckingAccountsSuccess(syncResponseObject.responses[0].data, syncResponseObject.responses[1].data);
                } else {
                    self.fetchBWTLineItemAndCheckingAccountsSuccessFailure();
                }
            }
            // applicationManager.getNavigationManager().navigateTo("frmBulkWireEditTemplateRecipient");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmBulkWireEditTemplateRecipient": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                showLoadingIndicator: {
                    status: true,
                }
            }, "frmBulkWireEditTemplateRecipient");
            var templateObj = {
                bulkWireTemplateID: params.bulkWireID,
                sortByParam: "",
                sortOrder: "",
                searchString: "",
                groupBy: ""
            }
            this.templateData = params;
            if (this.checkingAccounts.length <= 0) {
                var asyncManager = applicationManager.getAsyncManager();
                asyncManager.callAsync(
                    [
                        asyncManager.asyncItem(applicationManager.getTransactionManager(), "fetchBulkWireTemplateLineItems", [templateObj]),
                        asyncManager.asyncItem(applicationManager.getAccountManager(), "fetchCheckingAccounts")
                    ], bulkWireTemplateDataCompletionCallback);
            } else {
                applicationManager.getTransactionManager().fetchBulkWireTemplateLineItems(templateObj, this.fetchBWTLineItemAndCheckingAccountsSuccess.bind(this), this.fetchBWTLineItemAndCheckingAccountsSuccessFailure.bind(this));
            }
        }
    };
    WireTransferPresentationController.prototype.fetchBWTLineItemAndCheckingAccountsSuccess = function(bulkWireTemplateResponse, accountsResponse) {
        var response = {};
        accountsResponse =  accountsResponse.filter(account => {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
          }) 
        if (this.checkingAccounts.length <= 0) {
            this.checkingAccounts = accountsResponse;
        }
        response.bulkWireTemplateResponse = bulkWireTemplateResponse.BulkWireTemplateLineItems;
        response.accountsResponse = this.checkingAccounts;
        response.templateDetails = this.templateData;
        applicationManager.getNavigationManager().updateForm({
            "templateRecipientsData": response
        }, "frmBulkWireEditTemplateRecipient");
    };

    WireTransferPresentationController.prototype.fetchBWTLineItemAndCheckingAccountsSuccessFailure = function() {
        CommonUtilities.showServerDownScreen();
    }
    /**
     * updateTemplate : Method to update template
     * @member of {WireTransferPresentationController}
     * @param {requestParam} : template details
     */

    WireTransferPresentationController.prototype.UpdateBulkWireTemplateRecipients = function(formName,request) {
        var scopeObj = this;
        var templateDetails = {};
        var Recipients = [];
        templateDetails.bulkWireTemplateID = this.getBulkWireTemplateID();
        templateDetails.bulkWireTemplateName = this.getBulkWireTemplateName();
        templateDetails.defaultFromAccount = this.getDefaultFromAccount();
        templateDetails.defaultCurrency = this.getDefaultCurrency();
        templateDetails.Recipients = request;
        applicationManager.getTransactionManager().updateBulkWireTemplate(templateDetails, this.UpdateBulkWireTemplateRecipientsSuccess.bind(this,formName), this.UpdateBulkWireTemplateRecipientsFailure.bind(this,formName));
    };

    /**Success callback after update of a template
     * @param  {object} response object which consists of template details
     */
    WireTransferPresentationController.prototype.UpdateBulkWireTemplateRecipientsSuccess = function(formName,response) {
        var params = {
            "bulkWireTemplateID": response.bulkWireTemplateID
        };
        this.showBulkWiretemplatesEditRecipients(params, true);
        this.hideProgressBar(formName);
    };
    /**Failure callback during update of a template
     * @param  {object} response failure object which comes from backend
     */
    WireTransferPresentationController.prototype.UpdateBulkWireTemplateRecipientsFailure = function(formName,response) {
        this.hideProgressBar(formName);
        var viewModel = {
            "serverError": response.errorMessage
        };
        applicationManager.getNavigationManager().updateForm(viewModel,formName);
    };
    /**
     * updateTemplate : Method to update template
     * @member of {WireTransferPresentationController}
     * @param {requestParam} : template details
     */

    WireTransferPresentationController.prototype.UpdateBulkWireTemplateDetails = function(request) {
        var scopeObj = this;
        var templateDetails = {};
        var Recipients = [];
        templateDetails.bulkWireTemplateID = this.getBulkWireTemplateID();
        templateDetails.bulkWireTemplateName = this.getBulkWireTemplateName();
        templateDetails.defaultFromAccount = this.getDefaultFromAccount();
        templateDetails.defaultCurrency = this.getDefaultCurrency();
        templateDetails.Recipients = request;
        applicationManager.getTransactionManager().updateBulkWireTemplate(templateDetails, this.UpdateBulkWireTemplateDetailsSuccess.bind(this), this.UpdateBulkWireTemplateDetailsFailure.bind(this));
    };

    /**Success callback after update of a template
     * @param  {object} response object which consists of template details
     */
    WireTransferPresentationController.prototype.UpdateBulkWireTemplateDetailsSuccess = function(response) {
        var params = {
            "bulkWireTemplateID": response.bulkWireTemplateID
        };
        this.fetchRecipientsByTemplateID(params);
    };
    /**Failure callback during update of a template
     * @param  {object} response failure object which comes from backend
     */
    WireTransferPresentationController.prototype.UpdateBulkWireTemplateDetailsFailure = function(response) {
        var viewModel = {
            showLoadingIndicator: {
                status: false,
            },
            "serverError": response.errorMessage
        };
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkWireViewTemplate");
    };
    /**  navigate method to navigate to confirm page while making a bulk transfer using template
     * @param  {object} data  object containing recipients data and template data
     */
    WireTransferPresentationController.prototype.navigateToTransferBWTConfirm = function(data) {
        // applicationManager.getNavigationManager().navigateTo("frmBWTemplateConfirmTransfer");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBWTemplateConfirmTransfer": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        this.showProgressBar("frmBWTemplateConfirmTransfer");
        applicationManager.getNavigationManager().updateForm({
            recipientData: data.recipientData,
            templateDetails: data.templateDetails,
            removedRecipientData: data.removedRecipientData,
            checkingAccounts: data.checkingAccounts
        }, "frmBWTemplateConfirmTransfer");
    };

    WireTransferPresentationController.prototype.showRemovedRecipientTemplate = function(data) {
        // applicationManager.getNavigationManager().navigateTo("frmBulkWireTemplateRemovedRecipients");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkWireTemplateRemovedRecipients": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        this.showProgressBar("frmBulkWireTemplateRemovedRecipients");
        applicationManager.getNavigationManager().updateForm({
            "data": data
        }, "frmBulkWireTemplateRemovedRecipients");
    };

    WireTransferPresentationController.prototype.createBulkWireTemplateTransaction = function(bulkWireTemplateObject, bulkWireFileInfo) {
        var mfaManager = applicationManager.getMFAManager();
        mfaManager.setMFAFlowType("CREATE_BULKWIRE_TRANSFER_TEMPLATE");
        var asyncManager = applicationManager.getAsyncManager();
        this.showProgressBar();
        asyncManager.callAsync(
            [
                asyncManager.asyncItem(applicationManager.getTransactionManager(), "createBulkWireTransferOperation", [bulkWireTemplateObject]),
                asyncManager.asyncItem(applicationManager.getAccountManager(), "fetchInternalAccounts")
            ], bulkWireExecutionCompletionCallback.bind(this));
        var self = this;

        function bulkWireExecutionCompletionCallback(syncResponseObject) {
            if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
                self.onCreateBulkWireTemplateTransactionSuccess(syncResponseObject.responses[0].data, syncResponseObject.responses[1].data, bulkWireFileInfo);
            } else {
                if (syncResponseObject.responses[0].isSuccess)
                    self.onCreateBulkWireTemplateTransactionFailure(syncResponseObject.responses[1].data);
                else
                    self.onCreateBulkWireTemplateTransactionFailure(syncResponseObject.responses[0].data);
            }
        }
    };

    WireTransferPresentationController.prototype.onCreateBulkWireTemplateTransactionSuccess = function(response, accResponse, bulkWireFileInfo) {
        var mfaManager = applicationManager.getMFAManager();
        var operationName = this.getOperationName();
        var userPreferencesManager = applicationManager.getUserPreferencesManager();
        this.bulkWireFileInfo = bulkWireFileInfo;
        this.bulkWireFileInfo.lastExecutedOn = CommonUtilities.getFrontendDateString(new Date().toISOString());
        this.bulkWireFileInfo.firstname = userPreferencesManager.getUserObj().userfirstname;
        this.bulkWireFileInfo.lastname = userPreferencesManager.getUserObj().userlastname;
        this.bulkWireFileInfo.bulkWireCategory = "Templates";
        accResponse =  accResponse.filter(account => {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
        }) 
        this.accounts = accResponse;
        if (response.MFAAttributes) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": applicationManager.getMFAManager().getMFAFlowType(),
                "response": response,
                "objectServiceDetails": {
                    "action": "Wire Transfer",
                    "serviceName": "TransactionObjects",
                    "dataModel": "Transaction",
                    "verifyOTPOperationName": operationName,
                    "requestOTPOperationName": operationName,
                    "resendOTPOperationName": operationName,
                }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            this.showBulkWireAcknowlegmentScreen(response);
        }
    };

    WireTransferPresentationController.prototype.onCreateBulkWireTemplateTransactionFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "errorMessage": response.errorMessage
        }, "frmBWTemplateConfirmTransfer");
    };
    /** Search BulkWire template Transactions
     * @member  WireTrasferNewPresentationController
     * @param  {object} data Search Inputs
     * @throws {void} None
     * @returns {void} None
     */
    WireTransferPresentationController.prototype.searchBWTemplateTransactions = function(data) {
        var searchInputs = {
            searchString: data.searchKeyword,
            bulkWireTemplateID: data.bulkWireTemplateID
        }
        this.showProgressBar();
        applicationManager.getTransactionManager().fetchBulkWireTemplateTransactions(searchInputs, this.searchBWTemplateTransactionsSuccess.bind(this, searchInputs), this.searchBWTemplateTransactionsFailure.bind(this));
    };
    /** Search BulkWireFile Transactions
     * @member  searchSuccess
     * @param  {object} searchInputs Search Inputs
     * @param  {object} payees payees
     */
    WireTransferPresentationController.prototype.searchBWTemplateTransactionsSuccess = function(searchInputs, templates) {
        var viewModel = {};
        viewModel.searchBulkWireFiles = {
            bulkWireTransactions: templates.BulkWireTemplateTransactDetails,
            searchInputs: searchInputs
        }
        this.hideProgressBar();
        if (kony.application.getCurrentForm().id === "frmBulkWireFileTransactionsActivity") {
            applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkWireFileTransactionsActivity");
        }

    };
    /** Search BulkWireFile Transactions
     * @member  WireTrasferNewPresentationController
     * @param  {object} searchInputs Search Inputs
     * @param {object} response
     * @returns {void} None
     */
    WireTransferPresentationController.prototype.searchBWTemplateTransactionsFailure = function(searchInputs, response) {
        var viewModel = {};
        viewModel.searchBulkWireFiles = {
            "error": response.errorMessage
        };
        this.hideProgressBar("frmBulkWireFileTransactionsActivity");
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkWireFileTransactionsActivity");
    };

    /** Get bulk wire file transactions from backend
     * @param {object} value - Sorting and pagination parameters
     * @param {object} fileDetails - consists of fileID and file names
     */
    WireTransferPresentationController.prototype.getBulkTemplateTransactions = function(value, fileDetails) {
        this.showProgressBar();
        if (fileDetails.addedBy != undefined && fileDetails.addedBy != "" && fileDetails.addedBy != null) {
            applicationManager.getTransactionManager().fetchBulkWireTemplateTransactions(value, this.getBulkTemplateTransactionsSuccess.bind(this, fileDetails), this.getBulkTemplateTransactionsFailure.bind(this));
        } else {
            var paramByIDFilter = {
                searchString: fileDetails.bulkWireTemplateName,
                bulkWireCategoryFilter: "Templates"
            };
            var asyncManager = applicationManager.getAsyncManager();
            asyncManager.callAsync(
                [
                    asyncManager.asyncItem(applicationManager.getTransactionManager(), "fetchBulkWireTemplateTransactions", [value]),
                    asyncManager.asyncItem(applicationManager.getTransactionManager(), "fetchBulkWireFilesForUser", [paramByIDFilter])
                ], bulkWireExecutionCompletionCallback.bind(this));
            var self = this;

            function bulkWireExecutionCompletionCallback(syncResponseObject) {
                if (syncResponseObject.responses[0].isSuccess && syncResponseObject.responses[1].isSuccess) {
                    var forUtility = applicationManager.getFormatUtilManager();
                    var transactionDate = forUtility.getDateObjectFromCalendarString(syncResponseObject.responses[1].data.BulkWires[0].createdts, "YYYY-MM-DD");
                    transactionDate = forUtility.getFormattedSelectedDate(transactionDate);
                    fileDetails.addedBy = syncResponseObject.responses[1].data.BulkWires[0].firstname + " " + syncResponseObject.responses[1].data.BulkWires[0].lastname;
                    fileDetails.addedOn = transactionDate;
                    self.getBulkTemplateTransactionsSuccess(fileDetails, syncResponseObject.responses[0].data);
                } else {
                    if (syncResponseObject.responses[0].isSuccess)
                        self.getBulkTemplateTransactionsSuccess(fileDetails, syncResponseObject.responses[0].data);
                    else
                        self.getBulkTemplateTransactionsFailure();
                }
            }
        }
    };
    /**Success callback after file transactions are fetched and updates the form filebulkwirefiletransactionsactivity
     * @param  {object} response object which consists of file activity transactions
     */
    WireTransferPresentationController.prototype.getBulkTemplateTransactionsSuccess = function(fileDetails, response) {
        var paginationManager = applicationManager.getPaginationManager();
        var viewProperties = {};
        if (response.BulkWireTemplateTransactDetails.length > 0) {
            paginationManager.updatePaginationValues();
            viewProperties.bulkWireFileTransactions = response.BulkWireTemplateTransactDetails;
            viewProperties.FileDetails = fileDetails;
            viewProperties.pagination = paginationManager.getValues(this.bulkwiretransactionsConfig);
            viewProperties.pagination.limit = response.BulkWireTemplateTransactDetails.length;
            viewProperties.config = this.bulkwiretransactionsConfig;
        } else {
            var values = paginationManager.getValues(this.bulkwiretransactionsConfig);
            if (values.offset === 0) {
                viewProperties.bulkWireFileTransactions = response.BulkWireTemplateTransactDetails;
                viewProperties.FileDetails = fileDetails;
            }
        }
        viewProperties.isLoading = false;
        // applicationManager.getNavigationManager().navigateTo("frmBulkWireFileTransactionsActivity");
        var obj = {
            "context": this,
            "callbackModelConfig": {
                "frmBulkWireFileTransactionsActivity": true
            }
        };
        var navManager = kony.mvc.getNavigationManager();
        navManager.navigate(obj);
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmBulkWireFileTransactionsActivity");
    };
    /**Failure callback when file activity transactions are fetched
     * @param  {object} response failure object which comes from backend
     */
    WireTransferPresentationController.prototype.getBulkTemplateTransactionsFailure = function(response) {
        var errorExternalAccounts = "errorExternalAccounts";
        this.hideProgressBar("frmBulkWireFileTransactionsActivity");
        applicationManager.getNavigationManager().updateForm(errorExternalAccounts, "frmBulkWireFileTransactionsActivity");
    };
    WireTransferPresentationController.prototype.getMakeTransferRecipientList = function(sortingInputs) {
        this.showProgressBar();
        var paginationManager = applicationManager.getPaginationManager();
        var searchString = sortingInputs ? sortingInputs.searchString : null;
        var params = {};
        if (typeof searchString === "string" && searchString.length > 0) {
            params.searchString = searchString;
        } else {
            params = paginationManager.getValues(recipientSortConfig, sortingInputs);
        }
        applicationManager.getRecipientsManager().fetchWireTransferRecipients(params, this.getMakeTransferRecipientFetchSuccess.bind(this, searchString), this.serverError.bind(this));
    };
    WireTransferPresentationController.prototype.getMakeTransferRecipientFetchSuccess = function(searchString, wireTransferRecipients) {
        this.hideProgressBar();
        if (wireTransferRecipients.length > 0) {
            var payeeObj = "";
            for (var i = 0; i < wireTransferRecipients.length; i++) {
                if (searchString === wireTransferRecipients[i].payeeName) {
                    payeeObj = wireTransferRecipients[i];
                    break;
                }
            }
            this.showMakeTransferForPayee(payeeObj, null, null, frmWireTransferMakeTransfer);

        }
    };

    WireTransferPresentationController.prototype.getPayee = function(payeeName) {
        var payees = this.payeeList;
        for (var i = 0; i < payees.length; i++) {
            if (payees[i]["payeeNickName"] === payeeName) {
                return payees[i];
            }
        }
    };

    WireTransferPresentationController.prototype.getOperationName = function() {
        var operationName = "";
        var flowType = applicationManager.getMFAManager().getMFAFlowType();
        switch (flowType) {
            case "DOMESTIC_WIRE_TRANSFER":
                operationName = "DomesticWireTransfer";
                break;
            case "INTERNATIONAL_WIRE_TRANSFER":
                operationName = "InternationalWireTransfer";
                break;
            case "CREATE_BULKWIRE_TRANSFER":
                operationName = "CreateBulkWireTransfer";
                break;
            case "CREATE_BULKWIRE_TRANSFER_TEMPLATE":
                operationName = "CreateBulkWireTransfer";
                break;
        }
        return operationName;
    };

    WireTransferPresentationController.prototype.getContracts = function(action, form) {
        this.showProgressBar();
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.fetchContractDetails(action, this.getContractsSuccess.bind(this, form), this.serverError.bind(this));
    };

    WireTransferPresentationController.prototype.getContractsSuccess = function(form, contracts) {
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm({
            "contracts": contracts,
        }, form);
    }

    return WireTransferPresentationController;
});