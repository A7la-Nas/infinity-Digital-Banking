define(['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function PayMultipleBeneficiariesPresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
        this.prevPageRecords = [];
        this.nextPageRecords = [];
        this.allRecords = [];
        this.selectedMap = new Map();
    }

    inheritsFrom(PayMultipleBeneficiariesPresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    PayMultipleBeneficiariesPresentationController.prototype.initializePresentationController = function() {};

    this.manageBeneficiaryConfig = {
        'sortBy': 'beneficiaryName',
        'defaultSortBy': 'beneficiaryName',
        'order': OLBConstants.ASCENDING_KEY,
        'defaultOrder': OLBConstants.ASCENDING_KEY,
        'offset': OLBConstants.DEFAULT_T24_OFFSET,
        'limit': OLBConstants.PAGING_ROWS_LIMIT
    };
    /**
     * Entry Point Method for Transfer Eur Module
     * @param {object} context - used to load a particular flow
     */
    PayMultipleBeneficiariesPresentationController.prototype.showPayMultipleBeneficiaries = function(context) {
        if (context.showAddBeneficiary) {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferEurUIModule").presentationController.showTransferScreen({
                context: "AddBeneficiary"
            });
        }
        if (context.showManageBeneficiaries) {
            this.prevPageRecords = [];
            this.nextPageRecords = [];
            this.allRecords = [];
            this.selectedMap = new Map();
            this.showView("frmBulkBeneficiariesLanding");
            this.showBeneficiaries();
            return;
        }
        if (context.selectedBeneficiaries) {
            this.showView("frmBulkBeneficiariesSelected");
            this.showProgressBar();
            this.getFromAccounts(context);
        }
        if (context.selectedBeneficiariesConfirm) {
            this.showProgressBar();
            this.showView("frmBulkBeneficiariesSelectedConfirm", context);
        }
        if (context.backToBeneficiariesLandingPage) {
            this.showView("frmBulkBeneficiariesLanding", context);
        }
    };
    /**
     * used to show the Transfer Page and executes the particular Page.
     * @param {string} frm  used to load the form
     * @param {object}  data  used to load the particular form and having key value pair.
     */
    PayMultipleBeneficiariesPresentationController.prototype.showView = function(frm, data) {
        if (kony.application.getCurrentForm().id !== frm) {
           applicationManager.getNavigationManager().navigateTo({
          "appName": "TransfersMA",
          "friendlyName": "PayMultipleBeneficiariesUIModule/" + frm
        });
        }
        if (data) {
            applicationManager.getNavigationManager().updateForm(data, frm);
        }
    };

    /**
     * used to show Manage beneficiaries
     * @param {string} offSetVal used to set offSet Value
     */
    PayMultipleBeneficiariesPresentationController.prototype.showBeneficiaries = function() {
        var scopeObj = this;
        this.showProgressBar();
        applicationManager.getPaginationManager().resetT24PaginationValues();
        scopeObj.manageBeneficiaryPagination();
    };

    /**
     * used to perform the pagination
     * @param {object} sortingInputs sorting input values
     */
    PayMultipleBeneficiariesPresentationController.prototype.manageBeneficiaryPagination = function(sortingInputs) {
        var params = applicationManager.getPaginationManager().getT24PaginationValues(this.manageBeneficiaryConfig, sortingInputs);
        var criteria = {
            "offset": params.offset,
            "limit": params.limit
        };
        applicationManager.getRecipientsManager().fetchAllIntraAndInterBankBenificiaries(this.fetchManageBeneficiarySuccessCallBack.bind(this, criteria), this.fetchManageBeneficiaryErrorCallBack.bind(this));
    };
    /**
     * used to show managebeneficiaries flow.
     * @param {object} response list of beneficiaries
     */
    PayMultipleBeneficiariesPresentationController.prototype.fetchManageBeneficiarySuccessCallBack = function(criteria, response) {
        //this.records = response;
        this.records = response.ExternalAccounts ? response.ExternalAccounts : response;
        var viewProperties = this.getPaginationConfig(criteria, response);
        applicationManager.getNavigationManager().updateForm({
            "manageBeneficiary": viewProperties,
            "selectedBeneficiaries": this.allRecords
        }, "frmBulkBeneficiariesLanding");
    };
    /**
     * used to show manage beneficiaries error schenario
     * @param {object} res error object
     */
    PayMultipleBeneficiariesPresentationController.prototype.fetchManageBeneficiaryErrorCallBack = function(response) {
        this.hideProgressBar();
        this.showServerError(response.errorMessage, "frmBulkBeneficiariesLanding");
    };

    PayMultipleBeneficiariesPresentationController.prototype.getPaginationData = function(pageNumber, recordsPerPage) {
        return this.records.length > 0 ? (this.records.slice((pageNumber - 1) * recordsPerPage, pageNumber * recordsPerPage)) : "";
    };

    PayMultipleBeneficiariesPresentationController.prototype.getPaginationConfig = function(criteria, response) {
        var pageRecords = this.getPaginationData(criteria.offset, criteria.limit);
        var viewProperties = {};
        var paginationManager = applicationManager.getPaginationManager();
        if (pageRecords.length > 0) {
            paginationManager.updateT24PaginationValues();
            viewProperties.noOfRecords = paginationManager.getT24PaginationValues(this.manageBeneficiaryConfig);
            viewProperties.manageBeneficiary = pageRecords;
        } else {
            var values = paginationManager.getT24PaginationValues();
            if (values.offset === 1) {
                viewProperties.noHistory = true;
            } else {
                viewProperties.noMoreRecords = true;
                this.hideProgressBar();
            }
        }
        return viewProperties;
    }
    /**
     * fetches the previous beneficiaries
     */
    PayMultipleBeneficiariesPresentationController.prototype.fetchPreviousBeneficiaries = function(records, allData, sortingInputs) {
        var self = this;
        allData.forEach(function(item) {
            self.selectedMap.set(item.id.text, item.isSelected)
        });
        this.nextPageRecords = records;
        this.allRecords = this.allRecords.concat(this.nextPageRecords.concat(this.prevPageRecords));
        this.allRecords = Array.from(new Set(this.allRecords.map(JSON.stringify))).map(JSON.parse);
        this.allRecords = this.makeSelectedData();
        applicationManager.getPaginationManager().getPreviousPage();
        var params = applicationManager.getPaginationManager().getT24PaginationValues(this.manageBeneficiaryConfig, sortingInputs);
        var criteria = {
            "offset": params.offset,
            "limit": params.limit
        };
        var viewProperties = this.getPaginationConfig(criteria);
        applicationManager.getNavigationManager().updateForm({
            "manageBeneficiary": viewProperties,
            "selectedBeneficiaries": this.allRecords
        }, "frmBulkBeneficiariesLanding");
    };
    /**
     * fetches the next beneficiaries
     */
    PayMultipleBeneficiariesPresentationController.prototype.fetchNextBeneficiaries = function(records, allData, sortingInputs) {
        var self = this;
        allData.forEach(function(item) {
            self.selectedMap.set(item.id.text, item.isSelected)
        });
        this.prevPageRecords = records;
        this.allRecords = this.allRecords.concat(this.nextPageRecords.concat(this.prevPageRecords));
        this.allRecords = Array.from(new Set(this.allRecords.map(JSON.stringify))).map(JSON.parse);
        this.allRecords = this.makeSelectedData();
        applicationManager.getPaginationManager().getNextPage();
        var params = applicationManager.getPaginationManager().getT24PaginationValues(this.manageBeneficiaryConfig, sortingInputs);
        var criteria = {
            "offset": params.offset,
            "limit": params.limit
        };
        var viewProperties = this.getPaginationConfig(criteria);
        applicationManager.getNavigationManager().updateForm({
            "manageBeneficiary": viewProperties,
            "selectedBeneficiaries": this.allRecords
        }, "frmBulkBeneficiariesLanding");
    };

    /**
     * search Beneficiaries with some keyword.
     * @param {object}  data search string
     */
    PayMultipleBeneficiariesPresentationController.prototype.searchBeneficiaries = function(data, records, allData) {
        this.showProgressBar();
        var self = this;
        allData.forEach(function(item) {
            self.selectedMap.set(item.id.text, item.isSelected)
        });
        this.prevPageRecords = records;
        this.allRecords = this.allRecords.concat(this.nextPageRecords.concat(this.prevPageRecords));
        this.allRecords = Array.from(new Set(this.allRecords.map(JSON.stringify))).map(JSON.parse);
        this.allRecords = this.makeSelectedData();
        if (data && data.searchKeyword.length > 0) {
            var query = data.searchKeyword;
            var results = this.records.filter(function(record) {
                return (record["nickName"] && record["nickName"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["beneficiaryName"] && record["beneficiaryName"].toUpperCase().indexOf(query.toUpperCase()) !== -1) || (record["accountNumber"] && record["accountNumber"].toUpperCase().indexOf(query.toUpperCase()) !== -1);
            });
            applicationManager.getNavigationManager().updateForm({
                "manageBeneficiary": results,
                "selectedBeneficiaries": this.allRecords
            }, "frmBulkBeneficiariesLanding");
        } else {
            this.manageBeneficiaryPagination();
        }
    };

    /**
     * used to get billPayAccounts
     * @returns {object} -- list of bill Pay accounts
     */
    PayMultipleBeneficiariesPresentationController.prototype.getFromAccounts = function(context) {
        applicationManager.getAccountManager().fetchInternalAccounts(this.fetchUserAccountAndNavigateSuccess.bind(this, context), this.fetchUserAccountAndNavigatesFailure.bind(this, context));
    };

    PayMultipleBeneficiariesPresentationController.prototype.fetchUserAccountAndNavigatesFailure = function() {
        this.hideProgressBar();
        CommonUtilities.showServerDownScreen();
    };

    PayMultipleBeneficiariesPresentationController.prototype.makeSelectedData = function() {
        var finalArr = [];
        var self = this;
        this.allRecords.forEach(function(item) {
            if (self.selectedMap.get(item.id)) {
                finalArr.push(item);
            }
        });
        return finalArr;
    };
    /** When fetching of external Account Succeeds
     * @param {object} acknowledgeViewModel data of transaction
     * @param {object} response response from backend
     */
    PayMultipleBeneficiariesPresentationController.prototype.fetchUserAccountAndNavigateSuccess = function(context, response) {
        var self = this;
        this.allRecords = this.allRecords.concat(context.selectedBeneficiaries);
        this.allRecords = Array.from(new Set(self.allRecords.map(JSON.stringify))).map(JSON.parse);
        context.allData.forEach(function(item) {
            self.selectedMap.set(item.id.text, item.isSelected)
        });
        let accounts = this.getAllowedFromAccounts(applicationManager.getAccountManager().getInternalAccounts())
        accounts =  accounts.filter(account => {
            return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
        }) 
        var finalData = this.makeSelectedData();
        var viewModel = {
            "selectedBeneficiaries": finalData,
            "fromAccounts": accounts

        };
        this.hideProgressBar();
        applicationManager.getNavigationManager().updateForm(viewModel, "frmBulkBeneficiariesSelected");
    };

    PayMultipleBeneficiariesPresentationController.prototype.getAllowedFromAccounts = function(accounts) {
        var CREATE_ACTIONS = [
            "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE",
            "INTRA_BANK_FUND_TRANSFER_CREATE"
        ];
        return accounts.filter(this.isAccountHaveAtleastOneActions.bind(this, CREATE_ACTIONS));
    };

    PayMultipleBeneficiariesPresentationController.prototype.isAccountHaveAtleastOneActions = function(permissions, accountObject) {
        return permissions.some(function(permission) {
            return applicationManager.getConfigurationManager().checkAccountAction(accountObject.accountID, permission)
        })
    };

    PayMultipleBeneficiariesPresentationController.prototype.getTnC = function() {
        var self = this;
        self.showProgressBar();
        const params = {
            "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
            "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.BillPay_TnC
        }
        applicationManager.getTermsAndConditionsManager().fetchTermsAndConditionsPostLogin(params, self.getTnCTransferSuccess.bind(self), self.getTnCOnFailure.bind(self));
    };

    PayMultipleBeneficiariesPresentationController.prototype.getTnCTransferSuccess = function(TnCresponse) {
        applicationManager.getNavigationManager().updateForm({
            "TnCcontentTransfer": TnCresponse
        }, "frmBulkBeneficiariesSelectedConfirm");
        this.hideProgressBar();
    };

    PayMultipleBeneficiariesPresentationController.prototype.getTnCOnFailure = function(response) {
        this.showServerError(response, "frmBulkBeneficiariesSelectedConfirm");
    };

    /**
     * shows the error message with error response.
     * @param {object} data used to show the error message
     */
    PayMultipleBeneficiariesPresentationController.prototype.showServerError = function(data, formName) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": data
        }, formName);
    };

    PayMultipleBeneficiariesPresentationController.prototype.getDefaultFromAccount = function() {
        return applicationManager.getUserPreferencesManager().getDefaultAccountforTransfers();
    };

    PayMultipleBeneficiariesPresentationController.prototype.showProgressBar = function() {
        applicationManager.getNavigationManager().updateForm({
            isLoading: true
        });
    };
    PayMultipleBeneficiariesPresentationController.prototype.hideProgressBar = function() {
        applicationManager.getNavigationManager().updateForm({
            isLoading: false
        });
    };

    /**
     * used to create the bulkPayment transaction
     * @param {list} bulkPayRecords list of transactions.
     */
    PayMultipleBeneficiariesPresentationController.prototype.createBulkTransfer = function(selectedBeneficiaries) {
        var transactions = [];
        // var mfaManager = applicationManager.getMFAManager();
        var self = this;
        self.showProgressBar();
        var records = selectedBeneficiaries.records;
        var displayName = "PayMultipleBeneficiaries";
        applicationManager.getPresentationUtility().MFA.getServiceIdBasedOnDisplayName(displayName);
        for (var index in records) {
            var record = records[index];
            transactions.push({
                'fromAccountNumber': record.lblAccountNumber,
                'toAccountNumber': record.toAccountNumber,
                "transactionType": "ExternalTransfer",
                'payeeId': record.payeeId,
                'scheduledDate': new Date(),
                'amount': applicationManager.getFormatUtilManager().deFormatAmount(record.lblAmount.replace(applicationManager.getConfigurationManager().getCurrencyCode(), "")),
                'transactionsNotes': record.transactionNotes,
                'paymentType': record.paymentType === "Standard" ? "SEPA" : (record.paymentType !== "" ? "INSTPAY" : undefined),
                'payeeName': record.lblPayee || record.lblBeneficiaryName || "",
                "transactionCurrency": record.fromAccountCurrency,
                "fromAccountCurrency": record.fromAccountCurrency,
                "feeCurrency": record.fromAccountCurrency,
                "frequencyType": "Once",
                "ExternalAccountNumber": record.toAccountNumber,
                "swiftCode": "",
                "paidBy": "SHA",
                "createWithPaymentId":"false",
                "isScheduled":"0",
                "frequencyStartDate":"",
                "frequencyEndDate":"",
                "beneficiaryName":record.lblPayee || record.lblBeneficiaryName || "",
                "beneficiaryNickname":"",
                "toAccountCurrency": record.fromAccountCurrency,
                "numberOfRecurrences":"",
                "uploadedattachments":"",
                "deletedDocuments":"",
                "transactionAmount": applicationManager.getFormatUtilManager().deFormatAmount(record.lblAmount.replace(applicationManager.getConfigurationManager().getCurrencyCode(), "")),
                "serviceCharge":0,
                "charges":"",
                "totalAmount": applicationManager.getFormatUtilManager().deFormatAmount(record.lblAmount.replace(applicationManager.getConfigurationManager().getCurrencyCode(), ""))
            });
            if (transactions[index].paymentType === "INSTPAY" || transactions[index].paymentType === "SEPA") transactions[index].serviceName = "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
            else transactions[index].serviceName = "INTRA_BANK_FUND_TRANSFER_CREATE";
        }
        var transactionsList = JSON.stringify(transactions);
        transactionsList.replace(/"/g, "'");
        var params = {
            'bulkTransferString': transactionsList
        };
        this.selectedBeneficiaries = selectedBeneficiaries;
        applicationManager.getTransactionManager().createBulkTransfer(params, this.createBulkTransferSuccessCallBack.bind(this), this.createBulkTransferErrorCallBack.bind(this));
    };
    /**
     * used to handle the bulk payement success schenario
     * @param {list} response -- list of response records
     *
     */
    PayMultipleBeneficiariesPresentationController.prototype.createBulkTransferSuccessCallBack = function(response) {
        var mfaManager = applicationManager.getMFAManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
            var mfaJSON = {
                "serviceName": mfaManager.getServiceId(),
                "flowType": "PAY_MULTIPLE_BENEFICIARIES",
                "response": response
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else {
            var viewModel = {
                "selectedBeneficiaries": this.selectedBeneficiaries.records,
                "paymentResponse": response,
                "totalAmount": this.selectedBeneficiaries.totalAmount
            };
            this.hideProgressBar();
			this.showView("frmBulkBeneficiariesSelectedAcknowledgement",viewModel);
        }
    };
    /**
     *used to handle the bulk payement error schenario.
     * @param {object} response bulk bill pay response
     */
    PayMultipleBeneficiariesPresentationController.prototype.createBulkTransferErrorCallBack = function(response) {
        var self = this;
        self.showServerError(response.errmsg || response.dbpErrMsg, "frmBulkBeneficiariesSelectedAcknowledgement");
    };
    /**
     * used to modify the bulk billPay screen
     */
    PayMultipleBeneficiariesPresentationController.prototype.modifyBulkPayement = function() {
		this.showView("frmBulkBeneficiariesSelected");
    };

    return PayMultipleBeneficiariesPresentationController;
});