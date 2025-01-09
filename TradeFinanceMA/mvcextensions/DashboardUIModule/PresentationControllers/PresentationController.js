define(["CommonUtilities", "OLBConstants"], function (CommonUtilities, OLBConstants) {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function DashboardPresentationController() {
        this.navigationManager = applicationManager.getNavigationManager();
        this.configurationManager = applicationManager.getConfigurationManager();
        this.formatUtilManager = applicationManager.getFormatUtilManager();
        this.accountManager = applicationManager.getAccountManager();
        this.dashboardManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: 'DashboardManager', appName: 'TradeFinanceMA' }).businessController;
        this.foreignExchangeManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: 'ForeignExchangeManager', appName: 'ForeignExchangeMA' }).businessController;
        this.dashboardConfig = {
            'currencies': {
                'USD': `USD ${this.configurationManager.getCurrency('USD')}`,
                'EUR': `EUR ${this.configurationManager.getCurrency('EUR')}`
            },
            'receivableStatus': {
                'receivable': {
                    [OLBConstants.TRADE_FINANCE_PRODUCT.EXPORT_DRAWING]: [OLBConstants.EXPORT_DRAWING_STATUS.APPROVED],
                    [OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_INITIATED]: [OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.PROCESSING_WITH_BANK],
                    [OLBConstants.TRADE_FINANCE_PRODUCT.OUTWARD_COLLECTION]: [OLBConstants.OUTWARD_COLLECTION_STATUS.APPROVED, OLBConstants.OUTWARD_COLLECTION_STATUS.OVERDUE]
                },
                'received': {
                    [OLBConstants.TRADE_FINANCE_PRODUCT.EXPORT_DRAWING]: [OLBConstants.EXPORT_DRAWING_STATUS.SETTLED],
                    [OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_INITIATED]: [OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.CLAIM_HONOURED],
                    [OLBConstants.TRADE_FINANCE_PRODUCT.OUTWARD_COLLECTION]: [OLBConstants.OUTWARD_COLLECTION_STATUS.SETTLED]
                }
            },
            'payableStatus': {
                'payable': {
                    [OLBConstants.TRADE_FINANCE_PRODUCT.IMPORT_DRAWING]: [OLBConstants.IMPORT_DRAWINGS_STATUS.SUBMITTED_TO_BANK],
                    [OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_RECEIVED]: [OLBConstants.CLAIMS_RECEIVED_STATUS.PROCESSING_BY_BANK, OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED_APPLICANT_REJECTED, OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED_PENDING_CONSENT],
                    [OLBConstants.TRADE_FINANCE_PRODUCT.INWARD_COLLECTION]: [OLBConstants.INWARD_COLLECTIONS_STATUS.APPROVED, OLBConstants.INWARD_COLLECTIONS_STATUS.PAY_DUE, OLBConstants.INWARD_COLLECTIONS_STATUS.OVERDUE]
                },
                'paid': {
                    [OLBConstants.TRADE_FINANCE_PRODUCT.IMPORT_DRAWING]: [OLBConstants.IMPORT_DRAWINGS_STATUS.SETTLED],
                    [OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_RECEIVED]: [OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED],
                    [OLBConstants.TRADE_FINANCE_PRODUCT.INWARD_COLLECTION]: [OLBConstants.INWARD_COLLECTIONS_STATUS.SETTLED]
                }
            },
            'receivableGraphFilters': {
                '7': `${kony.i18n.getLocalizedString('i18n.TradeFinance.expiryIn')} 7 ${kony.i18n.getLocalizedString('i18n.TradeFinance.days')}`,
                '14': `${kony.i18n.getLocalizedString('i18n.TradeFinance.expiryIn')} 14 ${kony.i18n.getLocalizedString('i18n.TradeFinance.days')}`,
                '30': `${kony.i18n.getLocalizedString('i18n.TradeFinance.expiryIn')} 1 ${kony.i18n.getLocalizedString('i18n.AccountsDetails.month')}`
            },
            'payableGraphFilters': {
                '7': `${kony.i18n.getLocalizedString('i18n.TradeFinance.expiryIn')} 7 ${kony.i18n.getLocalizedString('i18n.TradeFinance.days')}`,
                '14': `${kony.i18n.getLocalizedString('i18n.TradeFinance.expiryIn')} 14 ${kony.i18n.getLocalizedString('i18n.TradeFinance.days')}`,
                '30': `${kony.i18n.getLocalizedString('i18n.TradeFinance.expiryIn')} 1 ${kony.i18n.getLocalizedString('i18n.AccountsDetails.month')}`
            },
            'receivableListFilters': [{
                'key': 'product',
                'value': kony.i18n.getLocalizedString('i18n.TradeFinance.productRequired'),
                'filters': [{
                    'key': 'Select All',
                    'value': kony.i18n.getLocalizedString('i18n.TradeFinance.SelectAll')
                }, {
                    'key': OLBConstants.TRADE_FINANCE_PRODUCT.EXPORT_DRAWING,
                    'value': kony.i18n.getLocalizedString('i18n.TradeFinance.exportDrawing')
                }, {
                    'key': OLBConstants.TRADE_FINANCE_PRODUCT.OUTWARD_COLLECTION,
                    'value': kony.i18n.getLocalizedString('i18n.TradeFinance.outwardCollection')
                }, {
                    'key': OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_INITIATED,
                    'value': kony.i18n.getLocalizedString('i18n.TradeFinance.claimInitiated')
                }]
            }, {
                'key': 'paymentStatus',
                'value': kony.i18n.getLocalizedString('i18n.TradeFinance.statusRequired'),
                'filters': [{
                    'key': 'Select All',
                    'value': kony.i18n.getLocalizedString('i18n.TradeFinance.SelectAll')
                }, {
                    'key': 'Received',
                    'value': kony.i18n.getLocalizedString('i18n.PayAPerson.Received')
                }, {
                    'key': 'Pending',
                    'value': kony.i18n.getLocalizedString('i18n.konybb.Common.Pending')
                }, {
                    'key': 'Overdue',
                    'value': kony.i18n.getLocalizedString('i18n.AccountSummary.overdue')
                }]
            }],
            'payableListFilters': [{
                'key': 'product',
                'value': kony.i18n.getLocalizedString('i18n.TradeFinance.productRequired'),
                'filters': [{
                    'key': 'Select All',
                    'value': kony.i18n.getLocalizedString('i18n.TradeFinance.SelectAll')
                }, {
                    'key': OLBConstants.TRADE_FINANCE_PRODUCT.IMPORT_DRAWING,
                    'value': kony.i18n.getLocalizedString('i18n.ImportDrawings.ImportDrawing')
                }, {
                    'key': OLBConstants.TRADE_FINANCE_PRODUCT.INWARD_COLLECTION,
                    'value': kony.i18n.getLocalizedString('i18n.TradeFinance.inwardCollection')
                }, {
                    'key': OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_RECEIVED,
                    'value': kony.i18n.getLocalizedString('i18n.TradeFinance.claimReceived')
                }]
            }, {
                'key': 'paymentStatus',
                'value': kony.i18n.getLocalizedString('i18n.TradeFinance.statusRequired'),
                'filters': [{
                    'key': 'Select All',
                    'value': kony.i18n.getLocalizedString('i18n.TradeFinance.SelectAll')
                }, {
                    'key': 'Paid',
                    'value': kony.i18n.getLocalizedString('i18n.AccountSummary.paid')
                }, {
                    'key': 'Pending',
                    'value': kony.i18n.getLocalizedString('i18n.konybb.Common.Pending')
                }, {
                    'key': 'Overdue',
                    'value': kony.i18n.getLocalizedString('i18n.AccountSummary.overdue')
                }]
            }],
            'quickLinksLimit': 6,
            'needAttentionLimit': 4,
            'accountsLimit': 5,
            'accountTypes': [OLBConstants.ACCOUNT_TYPE.SAVING, OLBConstants.ACCOUNT_TYPE.CHECKING, OLBConstants.ACCOUNT_TYPE.CURRENT],
            'limitChartsCount': 5,
            'exchangeRatesLimit': 5,
            'quickLinks': {
                [OLBConstants.TRADE_FINANCE_QUICK_LINK.EXPORT_DRAWINGS]: {
                    'text': kony.i18n.getLocalizedString('i18n.ImportLC.ExportDrawings'),
                    'permission': this.configurationManager.checkUserPermission('EXPORT_LC_DRAWINGS_VIEW')
                },
                [OLBConstants.TRADE_FINANCE_QUICK_LINK.OUTWARD_COLLECTIONS]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.outwardCollections'),
                    'permission': this.configurationManager.checkUserPermission('OUTWARD_COLLECTIONS_VIEW')
                },
                [OLBConstants.TRADE_FINANCE_QUICK_LINK.CLAIMS_INITIATED]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.claimsInitiated'),
                    'permission': this.configurationManager.checkUserPermission('RECEIVED_GUARANTEES_CLAIMS_VIEW')
                },
                [OLBConstants.TRADE_FINANCE_QUICK_LINK.IMPORT_DRAWINGS]: {
                    'text': kony.i18n.getLocalizedString('i18n.ImportLC.ImportDrawings'),
                    'permission': this.configurationManager.checkUserPermission('IMPORT_LC_DRAWINGS_VIEW')
                },
                [OLBConstants.TRADE_FINANCE_QUICK_LINK.INWARD_COLLECTIONS]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.inwardCollections'),
                    'permission': this.configurationManager.checkUserPermission('INWARD_COLLECTIONS_VIEW')
                },
                [OLBConstants.TRADE_FINANCE_QUICK_LINK.CLAIMS_RECEIVED]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.claimsReceived'),
                    'permission': this.configurationManager.checkUserPermission('CLAIMS_RECEIVED_VIEW')
                },
                [OLBConstants.TRADE_FINANCE_QUICK_LINK.IMPORT_LETTER_OF_CREDIT]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.importLetterOfCredit'),
                    'permission': this.configurationManager.checkUserPermission('IMPORT_LC_VIEW')
                },
                [OLBConstants.TRADE_FINANCE_QUICK_LINK.EXPORT_LETTER_OF_CREDIT]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.exportLetterOfCredit'),
                    'permission': this.configurationManager.checkUserPermission('EXPORT_LC_VIEW')
                },
                [OLBConstants.TRADE_FINANCE_QUICK_LINK.ISSUED_GUARANTEE_AND_SBLC]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.issuedGuaranteeAndSblc'),
                    'permission': this.configurationManager.checkUserPermission('LC_GUARANTEES_VIEW')
                },
                [OLBConstants.TRADE_FINANCE_QUICK_LINK.RECEIVED_GUARANTEE_AND_SBLC]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.receivedGuaranteeAndSblc'),
                    'permission': this.configurationManager.checkUserPermission('RECEIVED_GUARANTEES_VIEW')
                }
            },
            'needAttention': {
                [OLBConstants.TRADE_FINANCE_NEED_ATTENTION.RETURNED_BY_BANK]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.ReturnedbyBank'),
                    'icon': 'F'
                },
                [OLBConstants.TRADE_FINANCE_NEED_ATTENTION.PENDING_DRAFTS]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.pendingDrafts'),
                    'icon': 'H'
                },
                [OLBConstants.TRADE_FINANCE_NEED_ATTENTION.PENDING_CONSENTS]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.pendingConsents'),
                    'icon': 'E'
                },
                [OLBConstants.TRADE_FINANCE_NEED_ATTENTION.PENDING_CLOSURES]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.pendingClosures'),
                    'icon': 'D'
                },
                [OLBConstants.TRADE_FINANCE_NEED_ATTENTION.EIGHTY_PERCENT_UTILIZED_LIMITS]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.80percentUtilizedLimits'),
                    'icon': 'G'
                },
                [OLBConstants.TRADE_FINANCE_NEED_ATTENTION.RECENTLY_REJECTED]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.recentlyRejected'),
                    'icon': 'J'
                },
                [OLBConstants.TRADE_FINANCE_NEED_ATTENTION.RECENTLY_COMPLETED]: {
                    'text': kony.i18n.getLocalizedString('i18n.TradeFinance.recentlyCompleted'),
                    'icon': 'I'
                }
            }
        };
        this.productPermission = {
            [OLBConstants.TRADE_FINANCE_PRODUCT.IMPORT_LC]: this.configurationManager.checkUserPermission('IMPORT_LC_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.IMPORT_DRAWING]: this.configurationManager.checkUserPermission('IMPORT_LC_DRAWINGS_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.IMPORT_AMENDMENT]: this.configurationManager.checkUserPermission('IMPORT_LC_AMENDMENT_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.EXPORT_LC]: this.configurationManager.checkUserPermission('EXPORT_LC_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.EXPORT_DRAWING]: this.configurationManager.checkUserPermission('EXPORT_LC_DRAWINGS_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.EXPORT_AMENDMENT]: this.configurationManager.checkUserPermission('EXPORT_LC_AMENDMENT_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.ISSUED_GT_AND_SBLC]: this.configurationManager.checkUserPermission('LC_GUARANTEES_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.ISSUED_GT_AND_SBLC_AMENDMENT]: this.configurationManager.checkUserPermission('LC_GUARANTEES_AMENDMENTS_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_RECEIVED]: this.configurationManager.checkUserPermission('CLAIMS_RECEIVED_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.RECEIVED_GT_AND_SBLC]: this.configurationManager.checkUserPermission('RECEIVED_GUARANTEES_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.RECEIVED_GT_AND_SBLC_AMENDMENT]: this.configurationManager.checkUserPermission('RECEIVED_GUARANTEES_AMENDMENTS_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_INITIATED]: this.configurationManager.checkUserPermission('RECEIVED_GUARANTEES_CLAIMS_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.INWARD_COLLECTION]: this.configurationManager.checkUserPermission('INWARD_COLLECTIONS_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.INWARD_COLLECTION_AMENDMENT]: this.configurationManager.checkUserPermission('INWARD_COLLECTIONS_AMENDMENTS_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.OUTWARD_COLLECTION]: this.configurationManager.checkUserPermission('OUTWARD_COLLECTIONS_VIEW'),
            [OLBConstants.TRADE_FINANCE_PRODUCT.OUTWARD_COLLECTION_AMENDMENT]: this.configurationManager.checkUserPermission('OUTWARD_COLLECTIONS_AMENDMENTS_VIEW')
        };
        this.resourcesConstants = {
            'fontIcons': {
                'radioSelected': 'M',
                'radioUnselected': 'L',
                'checkboxSelected': 'C',
                'checkboxUnselected': 'D',
                'chevronUp': 'P',
                'chevronDown': 'O',
            },
            'skins': {
                'radioSelected': 'ICSknLblRadioBtnSelectedFontIcon003e7520px',
                'radioUnselected': 'ICSknLblRadioBtnUnelectedFontIcona0a0a020px',
                'checkboxSelected': 'ICSknLblRadioBtnSelectedFontIcon003e7520px',
                'checkboxUnselected': 'ICSknLblRadioBtnSelectedFontIcon003e7520px',
                'chevron': 'sknLblFontTypeIcon1a98ff14pxOther',
                'received': 'sknLbl04a615OLBFontIcons8px',
                'paid': 'sknLbl04a615OLBFontIcons8px',
                'pending': 'sknLble5690bOLBFontIcons8px',
                'overdue': 'sknLblee0005OLBFontIcons8px'
            }
        };
        this.flagsWithoutOutline = ['jpy', 'gel', 'ils', 'qar', 'rub', 'sgd', 'bgn'];
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(DashboardPresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    DashboardPresentationController.prototype.initializePresentationController = function () { };
    /**
     * Entry Point method for Dashboard module
     * @param {object} params - contains info to load the screen
     */
    DashboardPresentationController.prototype.showDashboardScreen = function (params) {
        switch (params.context) {
            case 'showDashboard':
                this.navigationManager.navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmDashboard' });
                break;
        }
    };
    /**
     * Method to show a particular form
     * @param {object} param0 - contains info to load the particular form
     */
    DashboardPresentationController.prototype.showView = function ({ appName, form, data }) {
        if (kony.application.getCurrentForm().id !== form) {
            const navObj = {
                appName: appName || 'TradeFinanceMA',
                friendlyName: form
            };
            this.navigationManager.navigateTo(navObj);
        }
        if (!this.isEmptyNullOrUndefined(data)) {
            this.navigationManager.updateForm(data, form);
        }
    };
    /**
     * Method to verify whether the value is empty, null or undefined
     * @param {any} data - value to be verified
     * @returns {boolean} - validity of the value passed
     */
    DashboardPresentationController.prototype.isEmptyNullOrUndefined = function (data) {
        try {
            data = JSON.parse(data);
        } catch (err) { }
        if (data === null || data === undefined || (typeof data === "string" && data.trim() === "")) return true;
        if (typeof data === "object") {
            if (Array.isArray(data)) return data.length === 0;
            return Object.keys(data).length === 0;
        }
        return false;
    };
    /**
     * Method to show the loading indicator
     */
    DashboardPresentationController.prototype.showProgressBar = function (param) {
        if (param.service && !param.loader) {
            switch (param.service) {
                case 'getReceivables':
                    this.navigationManager.updateForm({
                        isReceivablesLoading: true
                    });
                    break;
                case 'getPayables':
                    this.navigationManager.updateForm({
                        isPayablesLoading: true
                    });
                case 'getLimits':
                    this.navigationManager.updateForm({
                        isLimitsLoading: true
                    });
                case 'getAllTradeDetails':
                    this.navigationManager.updateForm({
                        isTradeDetailsLoading: true
                    });
                case 'fetchTFConfiguration':
                    this.navigationManager.updateForm({
                        isTFConfigurationLoading: true
                    });
                case 'createorUpdateTFConfiguration':
                    this.navigationManager.updateForm({
                        isCreateorUpdateTFConfigurationLoading: true
                    });
                case 'fetchBaseCurrency':
                    this.navigationManager.updateForm({
                        isBaseCurrencyLoading: true
                    });
                case 'fetchDropdownCurrencyList':
                    this.navigationManager.updateForm({
                        isDropdownCurrencyListLoading: true
                    });
                case 'fetchCurrencyRates':
                    this.navigationManager.updateForm({
                        isCurrencyRatesLoading: true
                    });
            }
        }
        else {
            this.navigationManager.updateForm({
                isLoading: true
            });
        }
    };
    /**
     * Method to hide the loading indicator
     */
    DashboardPresentationController.prototype.hideProgressBar = function (param) {
        if (param.service && !param.loader) {
            switch (param.service) {
                case 'getReceivables':
                    this.navigationManager.updateForm({
                        isReceivablesLoading: false
                    });
                    break;
                case 'getPayables':
                    this.navigationManager.updateForm({
                        isPayablesLoading: false
                    });
                case 'getLimits':
                    this.navigationManager.updateForm({
                        isLimitsLoading: false
                    });
                case 'getAllTradeDetails':
                    this.navigationManager.updateForm({
                        isTradeDetailsLoading: false
                    });
                case 'fetchTFConfiguration':
                    this.navigationManager.updateForm({
                        isTFConfigurationLoading: false
                    });
                case 'createorUpdateTFConfiguration':
                    this.navigationManager.updateForm({
                        isCreateorUpdateTFConfigurationLoading: false
                    });
                case 'fetchBaseCurrency':
                    this.navigationManager.updateForm({
                        isBaseCurrencyLoading: false
                    });
                case 'fetchDropdownCurrencyList':
                    this.navigationManager.updateForm({
                        isDropdownCurrencyListLoading: false
                    });
                case 'fetchCurrencyRates':
                    this.navigationManager.updateForm({
                        isCurrencyRatesLoading: false
                    });
            }
        }
        else if (param.loader === "hideAll") {
            this.navigationManager.updateForm({
                hideAll: true
            });
        }
        else {
            this.navigationManager.updateForm({
                isLoading: false
            });
        }
    };
    DashboardPresentationController.prototype.commonServiceFailureMethod = function (form, response) {
        this.hideProgressBar({ "loader": "hideAll" });
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    DashboardPresentationController.prototype.getReceivables = function (params) {
        this.showProgressBar({ "loader": params.screenLoader, "service": "getReceivables" });
        this.dashboardManager.fetchReceivables(params.payload, this.getReceivablesSuccess.bind(this, params.formID), this.commonServiceFailureMethod.bind(this, params.formID));
    };
    DashboardPresentationController.prototype.getReceivablesSuccess = function (form, response) {
        response.Receivables = (response.Receivables || []).filter(x => this.productPermission[x.product]);
        this.hideProgressBar({ "loader": false, "service": "getReceivables" });
        this.showView({
            form,
            data: response
        });
    };
    DashboardPresentationController.prototype.getPayables = function (params) {
        this.showProgressBar({ "loader": params.screenLoader, "service": "getPayables" });
        this.dashboardManager.fetchPayables(params.payload, this.getPayablesSuccess.bind(this, params.formID), this.commonServiceFailureMethod.bind(this, params.formID));
    };
    DashboardPresentationController.prototype.getPayablesSuccess = function (form, response) {
        response.Payables = (response.Payables || []).filter(x => this.productPermission[x.product]);
        this.hideProgressBar({ "loader": false, "service": "getPayables" });
        this.showView({
            form,
            data: response
        });
    };
    DashboardPresentationController.prototype.getAllTradeDetails = function (params) {
        this.showProgressBar({ "loader": params.screenLoader, "service": "getAllTradeDetails" });
        this.dashboardManager.fetchAllTradeDetails(params.payload, this.getAllTradeDetailsSuccess.bind(this, params.formID), this.commonServiceFailureMethod.bind(this, params.formID));
    };
    DashboardPresentationController.prototype.getAllTradeDetailsSuccess = function (form, response) {
        response.AllTradeDetails = (response.AllTradeDetails || []).filter(x => this.productPermission[x.product]);
        this.hideProgressBar({ "loader": false, "service": "getAllTradeDetails" });
        this.showView({
            form,
            data: response
        });
    };
    DashboardPresentationController.prototype.getAccountDisplayName = function (accId) {
        if (!accId) return;
        const accounts = applicationManager.getAccountManager().getInternalAccounts();
        for (const account of accounts) {
            if (account.accountID === accId) {
                return CommonUtilities.getAccountDisplayName(account);
            }
        }
    };
    DashboardPresentationController.prototype.fetchTFConfiguration = function (params) {
        this.showProgressBar({ "loader": params.screenLoader, "service": "fetchTFConfiguration" });
        this.dashboardManager.fetchTradeFinanceConfiguration(params.payload, this.fetchTFConfigurationSuccess.bind(this, params.formID), this.fetchTFConfigurationSuccess.bind(this, params.formID));
    };
    DashboardPresentationController.prototype.fetchTFConfigurationSuccess = function (form, response) {
        response.quickLink = response.quickLink ? JSON.parse(response.quickLink) : Object.keys(this.dashboardConfig.quickLinks).slice(0, this.dashboardConfig.quickLinksLimit);
        response.needAttention = response.needAttention ? JSON.parse(response.needAttention) : Object.keys(this.dashboardConfig.needAttention).slice(0, this.dashboardConfig.needAttentionLimit);
        this.customConfig = response.customConfig;
        this.hideProgressBar({ "loader": false, "service": "fetchTFConfiguration" });
        this.showView({
            form,
            data: response
        });
    };
    DashboardPresentationController.prototype.createorUpdateTFConfiguration = function (params) {
        this.showProgressBar({ "loader": params.screenLoader, "service": "createorUpdateTFConfiguration" });
        if (this.customConfig === "false") {
            this.dashboardManager.createTradeFinanceConfiguration(params.payload, this.createorUpdateTFConfigurationSuccess.bind(this, params.formID), this.commonServiceFailureMethod.bind(this, params.formID));
        } else {
            this.dashboardManager.updateTradeFinanceConfiguration(params.payload, this.createorUpdateTFConfigurationSuccess.bind(this, params.formID), this.commonServiceFailureMethod.bind(this, params.formID));
        }
    };
    DashboardPresentationController.prototype.createorUpdateTFConfigurationSuccess = function (form, response) {
        this.customConfig = "true";
        this.hideProgressBar({ "loader": false, "service": "createorUpdateTFConfiguration" });
        this.showView({
            form,
            data: response
        });
    };
    DashboardPresentationController.prototype.downloadGeneratedFile = function (response, fileName, fileType) {
        let url;
        const mfURL = KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url;
        if (fileType === "xlsx") {
            url = `${mfURL}/operations/LCSummary/downloadGeneratedList`;
        } else if (fileType === "pdf") {
            url = `${mfURL}/operations/LCSummary/downloadGeneratedAcknowledgement`;
        }
        CommonUtilities.downloadGeneratedFile({ url, fileName, fileType }, {"fileId": response.fileId});
    };
    DashboardPresentationController.prototype.generateList = function (params) {
        this.showProgressBar({ "loader": params.screenLoader, "service": "generateList" });
        if (params.type === 'Receivables') {
            this.dashboardManager.generateReceivablesList(params.payload, this.generateListSuccess.bind(this, params.type), this.commonServiceFailureMethod.bind(this, params.formID));
        } else if (params.type === 'Payables') {
            this.dashboardManager.generatePayablesList(params.payload, this.generateListSuccess.bind(this, params.type), this.commonServiceFailureMethod.bind(this, params.formID));
        } else {
            this.dashboardManager.generateAllTradesList(params.payload, this.generateListSuccess.bind(this, params.type), this.commonServiceFailureMethod.bind(this, params.formID));
        }
    };
    DashboardPresentationController.prototype.generateListSuccess = function (type, response) {
        this.downloadGeneratedFile(response, type, "xlsx");
        this.hideProgressBar({ "loader": true, "service": "generateList" });
    };
    DashboardPresentationController.prototype.getLimits = function (params) {
        this.showProgressBar({ "loader": params.screenLoader, "service": "getLimits" });
        this.dashboardManager.fetchLimits(params.payload, this.getLimitsSuccess.bind(this, params.formID), this.commonServiceFailureMethod.bind(this, params.formID));
    };
    DashboardPresentationController.prototype.getLimitsSuccess = function (form, response) {
        this.hideProgressBar({ "loader": false, "service": "getLimits" });
        this.showView({
            form,
            data: response
        });
    };
    DashboardPresentationController.prototype.fetchBaseCurrency = function (params) {
        this.showProgressBar({ "loader": params.screenLoader, "service": "fetchBaseCurrency" });
        this.foreignExchangeManager.fetchBaseCurrency(params.payload, this.fetchBaseCurrencySuccess.bind(this, params.formID), this.commonServiceFailureMethod.bind(this, params.formID));
    };
    DashboardPresentationController.prototype.fetchBaseCurrencySuccess = function (form, response) {
        this.hideProgressBar({ "loader": false, "service": "fetchBaseCurrency" });
        this.showView({
            form,
            data: response
        });
    };
    DashboardPresentationController.prototype.fetchDropdownCurrencyList = function (params) {
        this.showProgressBar({ "loader": params.screenLoader, "service": "fetchDropdownCurrencyList" });
        this.foreignExchangeManager.fetchDashboardCurrencyList(params.payload, this.fetchDropdownCurrencyListSuccess.bind(this, params.formID), this.commonServiceFailureMethod.bind(this, params.formID));
    };
    DashboardPresentationController.prototype.fetchDropdownCurrencyListSuccess = function (form, response) {
        this.hideProgressBar({ "loader": false, "service": "fetchDropdownCurrencyList" });
        this.showView({
            form,
            data: response
        });
    };
    DashboardPresentationController.prototype.fetchCurrencyRates = function (params) {
        this.showProgressBar({ "loader": params.screenLoader, "service": "fetchCurrencyRates" });
        this.foreignExchangeManager.fetchDashboardCurrencyRates(params.payload, this.fetchCurrencyRatesSuccess.bind(this, params.formID), this.commonServiceFailureMethod.bind(this, params.formID));
    };
    DashboardPresentationController.prototype.fetchCurrencyRatesSuccess = function (form, response) {
        this.hideProgressBar({ "loader": false, "service": "fetchCurrencyRates" });
        this.showView({
            form,
            data: response
        });
    };
    DashboardPresentationController.prototype.updateRecentCurrencies = function (params) {
        this.showProgressBar({ "loader": params.screenLoader, "service": "updateRecentCurrencies" });
        this.foreignExchangeManager.updateRecentCurrency(params.payload, this.updateRecentCurrenciesSuccess.bind(this, params.formID), this.commonServiceFailureMethod.bind(this, params.formID));
    };
    DashboardPresentationController.prototype.updateRecentCurrenciesSuccess = function (form, response) {
        this.hideProgressBar({ "loader": false, "service": "updateRecentCurrencies" });
        this.showView({
            form,
            data: response
        });
    };
    return DashboardPresentationController;
});