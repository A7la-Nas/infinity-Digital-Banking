define(['CommonUtilities', 'OLBConstants'], function (CommonUtilities, OLBConstants) {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function GuaranteesPresentationController() {
        this.navigationManager = applicationManager.getNavigationManager();
        this.exportLCManager = applicationManager.getExportLCManager();
        this.guaranteesManager = applicationManager.getGuaranteesManager();
        this.configurationManager = applicationManager.getConfigurationManager();
        this.recipientsManager = applicationManager.getRecipientsManager();
        this.asyncManager = applicationManager.getAsyncManager();
        this.userPreferencesManager = applicationManager.getUserPreferencesManager();
        this.formatUtilManager = applicationManager.getFormatUtilManager();
        this.guaranteeConfig = {
            'productTypes': {
                'Guarantee': kony.i18n.getLocalizedString('i18n.TradeFinance.guarantee'),
                'Standby LC': kony.i18n.getLocalizedString('i18n.TradeFinance.StandByLC')
            },
            'guaranteeAndSBLCTypes': scope_configManager.guaranteeBillType.reduce((acc, obj) => { acc[obj.type] = obj.type; return acc; }, []),
            'transactionModes': {
                'Swift': kony.i18n.getLocalizedString('i18n.TradeFinance.swift'),
                'Non Swift': kony.i18n.getLocalizedString('i18n.TradeFinance.nonSwift'),
            },
            'currencies': {
                'USD': 'USD',
                'EUR': 'EUR'
            },
            'transferable': {
                'YES': kony.i18n.getLocalizedString('kony.tab.popUpAnswerYes'),
                'NO': kony.i18n.getLocalizedString('kony.tab.popUpAnswerNo')
            },
            'expiryTypes': {
                'Open Ended': kony.i18n.getLocalizedString('i18n.TradeFinance.openEnded'),
                'Date': kony.i18n.getLocalizedString('i18n.ChequeManagement.Date'),
                'Conditions': kony.i18n.getLocalizedString('i18n.TradeFinance.conditions')
            },
            'applicableRules': {
                'ISPR': 'ISPR',
                'OTHR': 'OTHR',
                'UCPR': 'UCPR',
                'URDG': 'URDG'
            },
            'beneficiariesLimit': 5,
            'settlementAccountTypes': {
                'Charge': kony.i18n.getLocalizedString('i18n.TradeFinance.charge'),
                'Commission': kony.i18n.getLocalizedString('i18n.TradeFinance.commission'),
                'Cash Margin': kony.i18n.getLocalizedString('i18n.TradeFinance.cashMargin')
            },
            'documentsLimit': 20,
            'documentMaxSize': 25000000,
            'fileExtensions': {
                'pdf': 'pdf.png',
                'jpeg': 'jpeg_image.png',
                'doc': 'word.png',
                'docx': 'word.png',
                'xlsx': 'excel.png',
                'bmp': 'png.png',
                'zip': 'zip.png'
            },
            'accountTypes': [OLBConstants.ACCOUNT_TYPE.SAVING, OLBConstants.ACCOUNT_TYPE.CHECKING, OLBConstants.ACCOUNT_TYPE.CURRENT]
        };
        this.guaranteeRoadmap = {
            'productDetails': kony.i18n.getLocalizedString('i18n.TradeFinance.productDetails'),
            'transactionDetails': kony.i18n.getLocalizedString('i18n.billPay.TransactionDetails'),
            'beneficiaryAndAdvisingBankDetails': kony.i18n.getLocalizedString('i18n.TradeFinance.beneficiary&AdvisingBankDetails'),
            'bankInstructionAndDocumentDetails': kony.i18n.getLocalizedString('i18n.TradeFinance.bankInstructions&Documents'),
            'clauseConditionDetails': kony.i18n.getLocalizedString('i18n.TradeFinance.clauses&Conditions'),
            'reviewAndSubmitDetails': kony.i18n.getLocalizedString('i18n.kony.BulkPayments.ViewRequests')
        };
        this.contextualMenuData = [
            {
                'id': 'download',
                'src': 'download_3x.png',
                'text': this.renderI18nKeys('i18n.common.Download', false)
            },
            {
                'id': 'print',
                'src': 'print_blue.png',
                'text': this.renderI18nKeys('i18n.accounts.print', false)
            },
            {
                'id': 'raiseQuery',
                'src': 'menu_messages_1.png',
                'text': this.renderI18nKeys('i18n.TradeFinance.RaiseAQuery', false)
            }
        ];
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
            }
        };
        this.guaranteeData = {};
        this.amendmentData = {};
        this.receivedClaimData = {};
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(GuaranteesPresentationController, kony.mvc.Presentation.BasePresenter);

    GuaranteesPresentationController.prototype.downloadGeneratedFile = function (response, fileName, fileType) {
        let url;
        const mfURL = KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url;
        if (fileType === "xlsx") {
            url = `${mfURL}/operations/LCSummary/downloadGeneratedList`;
        } else if (fileType === "pdf") {
            url = `${mfURL}/operations/LCSummary/downloadGeneratedAcknowledgement`;
        }
        CommonUtilities.downloadGeneratedFile({ url, fileName, fileType }, {"fileId": response.fileId});
    };

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    GuaranteesPresentationController.prototype.initializeGuaranteesPresentationController = function () { };

    /**
     * Entry Point method for Guarantees module
     * @param {object} context - contains info to load the screen
     */
    GuaranteesPresentationController.prototype.showGuaranteesScreen = function (params) {
        switch (params.context) {
            case 'createGuarantee':
                this.guaranteeData = params.data || {};
                this.showView({ form: 'frmProductDetails' });
                break;
            case 'viewGuarantees':
                this.showView({ form: 'GuaranteesUIModule/frmGuaranteesLCDashboard' });
                break;
            case 'viewClaimDetails':
                this.getIssuedGuaranteeAndReceivedClaimById(params.data, params.form, this.showView.bind(this, { form: 'frmViewReceivedClaim' }));
                break;
            case 'printClaim':
                this.getIssuedGuaranteeAndReceivedClaimById(params.data, params.form, this.showView.bind(this, { form: 'frmPrintReceivedClaims' }));
                break;
            case 'viewAllReceivedClaims':
                this.navigationManager.navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmGuaranteesLCDashboard' }, false, { flowType: 'Claims' });
                break;
            case 'viewAmendment':
                this.getGuaranteeAndAmendmentById(params.data, params.form, this.showView.bind(this, { form: 'frmViewAmendmentDetails' }));
                break;
            case 'viewGuaranteeDetails':
                this.getGuaranteeById(params.data, params.form, this.showView.bind(this, { form: 'frmGuaranteesLCDetails' }));
                break;
        }
    };
    GuaranteesPresentationController.prototype.showMessagesScreen = function (params) {
        const messagesPresenter = applicationManager.getModulesPresentationController({
            appName: 'SecureMessageMA',
            moduleName: 'AlertsMsgsUIModule'
          });
          let contextObj = {};
          params.Category = "RCID_TF_GUARANTEES";
          contextObj.record = params;
          contextObj.show = "CreateNewMessage"
          contextObj.cancelCallback = false;
          params.tradeModule = true;
          messagesPresenter.showAlertsPage("Trade Finance IssuedGuarantee", contextObj);
    };
    /**
     * Method to show a particular form
     * @param {object} param0 - contains info to load the particular form
     */
    GuaranteesPresentationController.prototype.showView = function ({ appName, form, data }) {
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
     * @api : renderI18nKeys
     * Rendering 
     * @return : NA
     */
    GuaranteesPresentationController.prototype.renderI18nKeys = function (i18nKeyString, renderColon) {
        var scope = this;
        try {
            let i18nValue = kony.i18n.getLocalizedString(i18nKeyString);
            if (renderColon)
                i18nValue = kony.i18n.getCurrentLocale() === 'ar_AE' ? ":" + i18nValue : i18nValue + ":";
            return i18nValue;
        } catch (err) {
            var errorObj =
            {
                "method": "renderI18nKeys",
                "error": err
            };
            scope.onError(errorObj);
        }
    };
    /**
     * Method to verify whether the value is empty, null or undefined
     * @param {any} data - value to be verified
     * @returns {boolean} - validity of the value passed
     */
    GuaranteesPresentationController.prototype.isEmptyNullOrUndefined = function (data) {
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
    GuaranteesPresentationController.prototype.showProgressBar = function () {
        this.navigationManager.updateForm({
            isLoading: true
        });
    };
    /**
     * Method to hide the loading indicator
     */
    GuaranteesPresentationController.prototype.hideProgressBar = function () {
        this.navigationManager.updateForm({
            isLoading: false
        });
    };
    /**
     * Method to upload the document to server
     * @param {*} uploadedattachments 
     * @param {string} form - Form name
     */
    GuaranteesPresentationController.prototype.uploadDocument = function (attachment, form) {
        this.showProgressBar();
        const params = {
            "uploadedattachments": attachment
        };
        this.exportLCManager.uploadExportLCDocuments(params, this.uploadDocumentSuccess.bind(this, form), this.uploadDocumentError.bind(this, form));
    };
    /**
     * Success callback for upload document
     * @param {string} form - Form name
     * @param {object} response - contains success info
     */
    GuaranteesPresentationController.prototype.uploadDocumentSuccess = function (form, response) {
        this.hideProgressBar();
        if (response && response[0].failedUploads) {
            this.showView({
                form,
                data: {
                    "serverError": kony.i18n.getLocalizedString('i18n.payments.unableToUploadFile')
                }
            });
        } else {
            this.showView({
                form,
                data: {
                    "uploadDocument": response
                }
            });
        }
    };
    /**
     * Failure callback for upload document
     * @param {string} form - Form name
     * @param {object} response - contains error info
     */
    GuaranteesPresentationController.prototype.uploadDocumentError = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    /**
     * Method to delete the document from server
     * @param {string} deleteParams - document reference
     * @param {string} form - Form name
     */
    GuaranteesPresentationController.prototype.deleteDocument = function (deleteParams, form) {
        this.showProgressBar();
        const params = {
            "documentReference": deleteParams
        };
        this.exportLCManager.deleteDocument(params, this.deleteDocumentSuccess.bind(this, form), this.deleteDocumentError.bind(this, form));
    };
    /**
     * Success callback for delete document
     * @param {string} form - Form name
     * @param {object} response - contains success info
     */
    GuaranteesPresentationController.prototype.deleteDocumentSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "deleteDocument": response
            }
        });
    };
    /**
     * Failure callback for delete document
     * @param {string} form - Form name
     * @param {object} response - contains error info
     */
    GuaranteesPresentationController.prototype.deleteDocumentError = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.storeGuaranteeData = function (detailsKey, detailsValue) {
        this.guaranteeData = Object.assign(this.guaranteeData, detailsValue);
        this.guaranteeData[detailsKey] = 'done';
        switch (detailsKey) {
            case 'productDetails':
                this.showView({ form: 'frmTransactionDetails' });
                break;
            case 'transactionDetails':
                this.showView({ form: 'frmBeneficiaryAndAdvisingBankDetails' });
                break;
            case 'beneficiaryAndAdvisingBankDetails':
                this.showView({ form: 'frmBankInstructionAndDocumentDetails' });
                break;
            case 'bankInstructionAndDocumentDetails':
                this.showView({ form: 'frmClauseConditionDetails' });
                break;
            case 'clauseConditionDetails':
                this.showView({ form: 'frmReviewAndSubmitGuarantee' });
                break;
        }
    };
    GuaranteesPresentationController.prototype.getSwiftBicCodes = function (params, form) {
        this.showProgressBar();
        this.guaranteesManager.fetchSwiftBicCodes(params, this.getSwiftBicCodesSuccess.bind(this, form), this.getSwiftBicCodesFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.getSwiftBicCodesSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesPresentationController.prototype.getSwiftBicCodesFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.saveGuarantee = function (params, form, flow) {
        this.showProgressBar();
        this.guaranteeData = Object.assign(this.guaranteeData, params);
        const transformedGuaranteeData = this.transformGuaranteeData();
        this.guaranteesManager.saveGuarantee(transformedGuaranteeData, this.saveGuaranteeSuccess.bind(this, form, flow), this.saveGuaranteeFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.saveGuaranteeSuccess = function (form, flow, response) {
        this.hideProgressBar();
        if (flow === 'saveOrDeleteDraft') {
            this.showGuaranteesScreen({ context: 'viewGuarantees' });
        } else {
            response['saveDraft'] = true;
            this.guaranteeData['guaranteesSRMSId'] = response.guaranteesSRMSId;
            this.showView({
                form,
                data: response
            });
        }
    };
    GuaranteesPresentationController.prototype.saveGuaranteeFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.createGuarantee = function (form) {
        this.showProgressBar();
        const transformedGuaranteeData = this.transformGuaranteeData();
        this.guaranteesManager.createGuarantee(transformedGuaranteeData, this.createGuaranteeSuccess.bind(this, form), this.createGuaranteeFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.createGuaranteeSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesPresentationController.prototype.createGuaranteeFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.getGuarantees = function (params, form) {
        this.showProgressBar();
        this.guaranteesManager.fetchGuarantees(params, this.getGuaranteesSuccess.bind(this, form), this.getGuaranteesFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.getGuaranteesSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesPresentationController.prototype.getGuaranteesFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.getGuaranteeById = function (params, form, callback) {
        this.showProgressBar();
        this.guaranteesManager.fetchGuaranteeById(params, this.getGuaranteeByIdSuccess.bind(this, form, callback), this.getGuaranteeByIdFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.getGuaranteeByIdSuccess = function (form, callback, response) {
        this.hideProgressBar();
        this.guaranteeData = response[0];
        if (callback && typeof callback === 'function') {
            callback();
        } else {
            this.showView({
                form,
                data: response[0]
            });
        }
    };
    GuaranteesPresentationController.prototype.getGuaranteeByIdFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.getContractDetails = function (form) {
        this.showProgressBar();
        this.recipientsManager.getInfinityUserContractCustomers('', this.getContractDetailsSuccess.bind(this, form), this.getContractDetailsError.bind(this, form))
    };
    GuaranteesPresentationController.prototype.getContractDetailsSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesPresentationController.prototype.getContractDetailsError = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.getBeneficiaries = function (form) {
        const scope = this;
        this.showProgressBar();
        const corporateParams = this.guaranteeData.cif ? [{ 'cif': this.guaranteeData.cif }] : [{}];
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.guaranteesManager, 'fetchPaymentPayees', [{}]),
                this.asyncManager.asyncItem(this.guaranteesManager, 'fetchCorporatePayees', corporateParams)
            ],
            scope.getBeneficiariesCompletionCallBack.bind(scope, form)
        );
    };
    GuaranteesPresentationController.prototype.getBeneficiariesCompletionCallBack = function (form, syncResponseObject) {
        this.hideProgressBar();
        if (syncResponseObject.isAllSuccess()) {
            const beneficiaries = this.getFilteredBeneficiaries(syncResponseObject.responses);
            this.showView({
                form,
                data: { beneficiaries }
            });
        } else {
            this.showView({
                form,
                data: syncResponseObject.responses[0]
            });
        }
    };
    GuaranteesPresentationController.prototype.getFilteredBeneficiaries = function (response) {
        let paymentBeneficiaries = response[0].data ? (response[0].data.ExternalAccounts || []) : [];
        if (this.guaranteeData.cif) {
            const cif = JSON.parse(this.guaranteeData.cif)[0];
            paymentBeneficiaries = paymentBeneficiaries.filter(b => {
                let beneficiaryCif = JSON.parse(b.cif);
                return beneficiaryCif.find(({ contractId, coreCustomerId }) => (contractId === cif.contractId) && (coreCustomerId === cif.coreCustomerId));
            });
        }
        paymentBeneficiaries.forEach(beneficiary => beneficiary['payeeType'] = (beneficiary.isSameBankAccount === 'true') ? 'sameBank' : (beneficiary.isInternationalAccount === 'true') ? 'international' : 'domestic');
        let corporateBeneficiaries = response[1].data ? (response[1].data.Payees || []) : [];
        corporateBeneficiaries.forEach(beneficiary => beneficiary['payeeType'] = 'trade');
        return paymentBeneficiaries.concat(corporateBeneficiaries);
    };
    GuaranteesPresentationController.prototype.createCorporatePayee = function (params, form) {
        this.showProgressBar();
        this.guaranteesManager.createCorporatePayee(params, this.createCorporatePayeeSuccess.bind(this, form), this.createCorporatePayeeFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.createCorporatePayeeSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesPresentationController.prototype.createCorporatePayeeFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.deleteGuarantee = function (form) {
        this.showProgressBar();
        const transformedGuaranteeData = this.transformGuaranteeData();
        this.guaranteesManager.deleteGuarantee(transformedGuaranteeData, this.deleteGuaranteeSuccess.bind(this, form), this.deleteGuaranteeFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.deleteGuaranteeSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form: 'frmGuaranteesLCDashboard',
            data: response
        });
    };
    GuaranteesPresentationController.prototype.deleteGuaranteeFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.getClauses = function (params, form) {
        this.showProgressBar();
        this.guaranteesManager.fetchClauses(params, this.getClausesSuccess.bind(this, form), this.getClausesError.bind(this, form));
    };
    GuaranteesPresentationController.prototype.getClausesSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesPresentationController.prototype.getClausesError = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.getLimitInstructions = function (params, form) {
        this.showProgressBar();
        this.guaranteesManager.fetchLimitInstructions(params, this.getLimitInstructionsSuccess.bind(this, form), this.getLimitInstructionsError.bind(this, form));
    };
    GuaranteesPresentationController.prototype.getLimitInstructionsSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesPresentationController.prototype.getLimitInstructionsError = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.getAllCountries = function (form) {
        this.showProgressBar();
        this.recipientsManager.fetchCountriesList(this.getAllCountriesSuccess.bind(this, form), this.getAllCountriesError.bind(this, form));
    };
    GuaranteesPresentationController.prototype.getAllCountriesSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: { countries: response.records }
        });
    };
    GuaranteesPresentationController.prototype.getAllCountriesError = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.createBeneficiaryAndClause = function (form) {
        const scope = this;
        this.showProgressBar();
        let asyncParams = [];
        const { beneficiariesToSave, clausesToCreate } = this.guaranteeData;
        if (beneficiariesToSave && beneficiariesToSave.length > 0) {
            let beneficiariesParams = {
                payeeDetails: JSON.stringify(beneficiariesToSave)
            };
            if (this.guaranteeData.cif) {
                beneficiariesParams['cif'] = this.guaranteeData.cif;
            }
            asyncParams.push(this.asyncManager.asyncItem(this.guaranteesManager, 'createCorporatePayee', [beneficiariesParams]));
        }
        if (clausesToCreate && clausesToCreate.length > 0) {
            asyncParams.push(this.asyncManager.asyncItem(this.guaranteesManager, 'createClause', [{ ClauseString: JSON.stringify(clausesToCreate) }]));
        }
        if (asyncParams.length === 0) {
            if (this.guaranteeData.isReviseFlow) {
                this.updateGuarantee(form);
            } else {
                this.createGuarantee(form);
            }
        } else {
            this.asyncManager.callAsync(asyncParams, scope.createBeneficiaryAndClauseCallBack.bind(scope, form));
        }
    };
    GuaranteesPresentationController.prototype.createBeneficiaryAndClauseCallBack = function (form, syncResponseObject) {
        this.hideProgressBar();
        if (syncResponseObject.isAllSuccess()) {
            let clauses;
            for (const response of syncResponseObject.responses) {
                clauses = response.data.Clauses;
            }
            if (clauses && clauses.length > 0) {
                let clauseConditions = JSON.parse(this.guaranteeData.clauseConditions), i = 0;
                clauseConditions.map(x => {
                    if (!x.clauseId) {
                        x['clauseId'] = clauses[i++]['clauseId'];
                    }
                    return x;
                });
                this.guaranteeData['clauseConditions'] = JSON.stringify(clauseConditions);
            }
            if (this.guaranteeData.isReviseFlow) {
                this.updateGuarantee(form);
            } else {
                this.createGuarantee(form);
            }
        } else {
            this.showView({
                form,
                data: syncResponseObject.responses[0].dbpErrMsg || syncResponseObject.responses[1].dbpErrMsg
            });
        }
    };
    GuaranteesPresentationController.prototype.getGuaranteeAmendments = function (params, form) {
        this.showProgressBar();
        this.guaranteesManager.fetchGuaranteesAmendments(params, this.getGuaranteesAmendmentsSuccess.bind(this, form), this.getGuaranteesAmendmentsFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.getGuaranteesAmendmentsSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesPresentationController.prototype.getGuaranteesAmendmentsFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    /**
     * Method to generate the guarantee LC file
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    GuaranteesPresentationController.prototype.generateGuaranteesLC = function (params, frm) {
        this.showProgressBar();
        this.guaranteesManager.generateGuaranteesLC(params, this.generateGuaranteesLCSuccess.bind(this), this.generateGuaranteesLCFailure.bind(this, frm));
    };

    /**
     * Success callback for generating the guarantee LC file
     * @param {object} response - consist fileId of generated file
     */
    GuaranteesPresentationController.prototype.generateGuaranteesLCSuccess = function (response) {
        this.downloadGeneratedFile(response, "Guarantee and Standby LC", "pdf");
        this.hideProgressBar();
    };
    /**
     * Failure callback for generating the guarantee LC file
     * @param {onject} response - consist of error details
     * @param {string} frm - form name
     */
    GuaranteesPresentationController.prototype.generateGuaranteesLCFailure = function (frm, response) {
        this.hideProgressBar();
        this.showView(frm, {
            "serverError": response.errmsg || response.errorMessage
        });
    };

    /**
     * Method to generate the guarantee LC list file
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    GuaranteesPresentationController.prototype.generateGuaranteesList = function (params, frm) {
        this.showProgressBar();
        this.guaranteesManager.generateGuaranteesList(params, this.generateGuaranteesListSuccess.bind(this), this.generateGuaranteesListFailure.bind(this, frm));
    };

    /**
     * Success callback for generating the guarantee LC list file
     * @param {object} response - consist fileId of generated file
     */
    GuaranteesPresentationController.prototype.generateGuaranteesListSuccess = function (response) {
        this.downloadGeneratedFile(response, "Guarantee and Standby LC", "xlsx");
        this.hideProgressBar();
    };
    /**
     * Failure callback for generating the guarantee LC list file
     * @param {onject} response - consist of error details
     * @param {string} frm - form name
     */
    GuaranteesPresentationController.prototype.generateGuaranteesListFailure = function (frm, response) {
        this.hideProgressBar();
        this.showView(frm, {
            "serverError": response.errmsg || response.errorMessage
        });
    };
    GuaranteesPresentationController.prototype.transformGuaranteeData = function () {
        const data = JSON.parse(JSON.stringify(this.guaranteeData));
        const userObj = this.userPreferencesManager.getUserObj();
        let transformedData = {
            'productType': data.productType || '',
            'guaranteeAndSBLCType': data.guaranteeAndSBLCType || '',
            'guaranteesReferenceNo': data.guaranteesReferenceNo || '',
            'modeOfTransaction': data.modeOfTransaction || '',
            'instructingPartyName': data.instructingPartyName || '',
            'instructingPartyId': data.instructingPartyId || '',
            'applicantPartyName': data.applicantPartyName || '',
            'applicantPartyId': data.applicantPartyId || '',
            'currency': data.currency || '',
            'amount': data.amount || '',
            'demandAcceptance': data.demandAcceptance || '',
            'transferable': data.transferable || '',
            'issueDate': data.issueDate || '',
            'expiryType': data.expiryType || '',
            'expiryDate': data.expiryDate || '',
            'expiryCondition': data.expiryCondition || '',
            'extendExpiryDate': data.extendExpiryDate || '',
            'extensionPeriod': data.extensionPeriod || '',
            'extensionCapPeriod': data.extensionCapPeriod || '',
            'notificationPeriod': data.notificationPeriod || '',
            'extensionDetails': data.extensionDetails || '',
            'governingLaw': data.governingLaw || '',
            'applicableRules': data.applicableRules || '',
            'otherInstructions': data.otherInstructions || '',
            'deliveryInstructions': data.deliveryInstructions || '',
            'beneficiaryDetails': data.beneficiaryDetails ? JSON.stringify(JSON.parse(data.beneficiaryDetails.replace(/'/g, '"')).map(x => { delete x.saveBeneficiary; return x; })) : '',
            'swiftCode': data.swiftCode || '',
            'bankName': data.bankName || '',
            'iban': data.iban || '',
            'localCode': data.localCode || '',
            'bankAddress1': data.bankAddress1 || '',
            'bankAddress2': data.bankAddress2 || '',
            'bankCity': data.bankCity || '',
            'bankState': data.bankState || '',
            'bankCountry': data.bankCountry || '',
            'bankZipCode': data.bankZipCode || '',
            'isSingleSettlement': data.isSingleSettlement || '',
            'instructionCurrencies': data.instructionCurrencies || '',
            'limitInstructions': data.limitInstructions || '',
            'otherBankInstructions': data.otherBankInstructions || '',
            'messageToBank': data.messageToBank || '',
            'documentReferences': data.documentReferences || '',
            'documentName': data.documentName || '',
            'clauseConditions': data.clauseConditions || '',
            'guaranteesSRMSId': data.guaranteesSRMSId || '',
            'createdOn': data.createdOn || new Date().toISOString()
        };
        for (const key in transformedData) {
            if (this.isEmptyNullOrUndefined(transformedData[key])) delete transformedData[key];
        }
        if (data.isReviseFlow) {
            transformedData['corporateUserName'] = [userObj.userfirstname, userObj.userlastname].join(' ').trim();
        }
        return transformedData;
    };
    GuaranteesPresentationController.prototype.retrieveDocument = function (docReference, form) {
        this.showProgressBar();
        const params = {
            'documentReference': docReference
        };
        this.guaranteesManager.retrieveDocuments(params, this.retrieveDocumentSuccess.bind(this, form), this.retrieveDocumentError.bind(this, form));
    };
    GuaranteesPresentationController.prototype.retrieveDocumentSuccess = function (form, response) {
        this.hideProgressBar();
        if (response) {
            let downloadUrl = `${KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url}/operations/LCDocuments/downloadDocument`;
            CommonUtilities.downloadAttachment(downloadUrl, {"fileId": response[0].fileID});
        }
    };
    GuaranteesPresentationController.prototype.retrieveDocumentError = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    /**
     * Method to generate the guarantee LC file
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    GuaranteesPresentationController.prototype.generateGuaranteesAmendments = function (params, frm) {
        this.showProgressBar();
        this.guaranteesManager.generateGuaranteesAmendments(params, this.generateGuaranteesAmendmentsSuccess.bind(this), this.generateGuaranteesAmendmentsFailure.bind(this, frm));
    };
    /**
     * Success callback for generating the guarantee LC file
     * @param {object} response - consist fileId of generated file
     */
    GuaranteesPresentationController.prototype.generateGuaranteesAmendmentsSuccess = function (response) {
        this.downloadGeneratedFile(response, "Guarantee Amendment", "pdf");
        this.hideProgressBar();
    };
    /**
     * Failure callback for generating the guarantee LC file
     * @param {onject} response - consist of error details
     * @param {string} frm - form name
     */
    GuaranteesPresentationController.prototype.generateGuaranteesAmendmentsFailure = function (frm, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    /**
     * Method to create the guarantee amendment 
     * @param {object} lcData - consist of payload 
     * @param {string} form - form name
     */
    GuaranteesPresentationController.prototype.createAmendment = function (params, form) {
        this.showProgressBar();
        this.guaranteesManager.createGuaranteeAmendment(params, this.createAmendmentSuccess.bind(this, form), this.createAmendmentFailure.bind(this, form));
    };
    /**
     * Method to handle success call back of create amendment
     * @param {string} form - form name
     */
    GuaranteesPresentationController.prototype.createAmendmentSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "createAmendSuccess": response
            }
        });
    };
    /**
     * Method to handle failure call back of create amendment
     * @param {string} form - form name
     */
    GuaranteesPresentationController.prototype.createAmendmentFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    /**
     * Method to edit payment Payee 
     * @param {object} lcData - consist of payload 
     * @param {string} form - form name
     */
    GuaranteesPresentationController.prototype.editPayee = function (params, form) {
        this.showProgressBar();
        this.guaranteesManager.editPayee(params, this.editPayeeSuccess.bind(this, form), this.editPayeeFailure.bind(this, form));
    };

    /**
     * Method to handle success call back of save Beneficiary
     * @param {string} form - form name
     */
    GuaranteesPresentationController.prototype.editPayeeSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "editPayee": response
            }
        });
    };

    /**
     * Method to handle failure call back of save Beneficiary
     * @param {string} form - form name
     */
    GuaranteesPresentationController.prototype.editPayeeFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    /**
     * Method to generate the guarantee LC list file
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    GuaranteesPresentationController.prototype.generateGuaranteeAmendmentList = function (params, frm) {
        this.showProgressBar();
        this.guaranteesManager.generateGuaranteeAmendmentList(params, this.generateGuaranteeAmendmentListSuccess.bind(this), this.generateGuaranteeAmendmentListFailure.bind(this, frm));
    };
    /**
     * Success callback for generating the guarantee LC list file
     * @param {object} response - consist fileId of generated file
     */
    GuaranteesPresentationController.prototype.generateGuaranteeAmendmentListSuccess = function (response) {
        this.downloadGeneratedFile(response, "Guarantee Amendment", "xlsx");
        this.hideProgressBar();
    };
    /**
     * Failure callback for generating the guarantee LC list file
     * @param {onject} response - consist of error details
     * @param {string} frm - form name
     */
    GuaranteesPresentationController.prototype.generateGuaranteeAmendmentListFailure = function (frm, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    /**
     * Method to update the guarantee amendment 
     * @param {object} lcData - consist of payload 
     * @param {string} form - form name
     */
    GuaranteesPresentationController.prototype.updateAmendment = function (params, form) {
        this.showProgressBar();
        this.guaranteesManager.updateGuaranteeAmendment(params, this.updateAmendmentSuccess.bind(this, form), this.updateAmendmentFailure.bind(this, form));
    };

    /**
     * Method to handle success call back of create amendment
     * @param {string} form - form name
     */
    GuaranteesPresentationController.prototype.updateAmendmentSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "updateAmendSuccess": response
            }
        });
    };

    /**
     * Method to handle failure call back of create amendment
     * @param {string} form - form name
     */
    GuaranteesPresentationController.prototype.updateAmendmentFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.getGuaranteeAmendmentsById = function (params, form) {
        this.showProgressBar();
        this.guaranteesManager.fetchGuaranteeAmendmentsById(params, this.getGuaranteeAmendmentsByIdSuccess.bind(this, form), this.getGuaranteeAmendmentsByIdFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.getGuaranteeAmendmentsByIdSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesPresentationController.prototype.getGuaranteeAmendmentsByIdFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.updateGuarantee = function (form) {
        this.showProgressBar();
        const transformedGuaranteeData = this.transformGuaranteeData();
        this.guaranteesManager.updateGuarantee(transformedGuaranteeData, this.updateGuaranteeSuccess.bind(this, form), this.updateGuaranteeFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.updateGuaranteeSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesPresentationController.prototype.updateGuaranteeFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    /**
     * Method to get Countdown image and text values
     */
    GuaranteesPresentationController.prototype.getCountdownValues = function (date1, date2) {
        if (!date1 || !date2) return;
        const diff = Math.round((Date.parse(date2) - Date.parse(date1)) / 86400000);
        return {
            lblCountdown: diff > 0 ? `${diff} ${kony.i18n.getLocalizedString('i18n.ProfileManagement.daysLeft')}` : kony.i18n.getLocalizedString('i18n.AccountSummary.overdue'),
            imgCountdown: diff >= 5 ? 'days_left_green.png' : (diff >= 3) ? 'inprogress.png' : 'days_left_red.png'
        };
    };
    GuaranteesPresentationController.prototype.getReceivedClaims = function (params, form) {
        this.showProgressBar();
        this.guaranteesManager.fetchReceivedClaims(params, this.getReceivedClaimsSuccess.bind(this, form), this.getReceivedClaimsFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.getReceivedClaimsSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: Array.isArray(response) ? { ClaimsReceived: response } : response
        });
    };
    GuaranteesPresentationController.prototype.getReceivedClaimsFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.generateReceivedClaimReport = function (params, form) {
        this.showProgressBar();
        const payload = {
            claimsSRMSId: params.claimsSRMSId
        };
        this.guaranteesManager.generateReceivedClaimReport(payload, this.generateReceivedClaimReportSuccess.bind(this), this.generateReceivedClaimReportFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.generateReceivedClaimReportSuccess = function (response) {
        this.downloadGeneratedFile(response, "Claim Received", "pdf");
        this.hideProgressBar();
    };
    GuaranteesPresentationController.prototype.generateReceivedClaimReportFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.generateReceivedClaimsList = function (params, form) {
        this.showProgressBar();
        this.guaranteesManager.generateReceivedClaimsList(params, this.generateReceivedClaimsListSuccess.bind(this), this.generateReceivedClaimsListFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.generateReceivedClaimsListSuccess = function (response) {
        this.downloadGeneratedFile(response, "Claim Received", "xlsx");
        this.hideProgressBar();
    };
    GuaranteesPresentationController.prototype.generateReceivedClaimsListFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.getIssuedGuaranteeAndReceivedClaimById = function (params, form, callback) {
        this.showProgressBar();
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.guaranteesManager, 'fetchGuaranteeById', [{ guaranteesSRMSId: params.guaranteesSRMSId }]),
                this.asyncManager.asyncItem(this.guaranteesManager, 'fetchReceivedClaimById', [{ claimsSRMSId: params.claimsSRMSId }])
            ],
            this.getIssuedGuaranteeAndReceivedClaimByIdCallback.bind(this, form, callback)
        );
    };
    GuaranteesPresentationController.prototype.getIssuedGuaranteeAndReceivedClaimByIdCallback = function (form, callback, syncResponseObject) {
        this.hideProgressBar();
        if (syncResponseObject.isAllSuccess()) {
            this.guaranteeData = syncResponseObject.responses[0].data[0];
            this.receivedClaimData = syncResponseObject.responses[1].data;
            if (callback && typeof callback === 'function') {
                callback();
            } else {
                this.showView({
                    form
                });
            }
        } else {
            this.showView({
                form,
                data: {
                    serverError: syncResponseObject.responses[0].data.errorMessage || syncResponseObject.responses[1].data.dbpErrMsg
                }
            });
        }
    };
    GuaranteesPresentationController.prototype.transformReceivedClaimData = function () {
        const data = JSON.parse(JSON.stringify(this.receivedClaimData));
        const userObj = this.userPreferencesManager.getUserObj();
        let transformedData = {
            'claimAcceptance': data.claimAcceptance || '',
            'claimsSRMSId': data.claimsSRMSId || '',
            'corporateUserName': [userObj.userfirstname, userObj.userlastname].join(' ').trim(),
            'debitAccount': data.debitAccount || '',
            'discrepancyAcceptance': data.discrepancyAcceptance || '',
            'messageToBank': data.messageToBank || '',
            'reasonForRejection': data.reasonForRejection || '',
            'requestedOverdraft': data.requestedOverdraft || ''
        };
        for (const key in transformedData) {
            if (this.isEmptyNullOrUndefined(transformedData[key])) delete transformedData[key];
        }
        return transformedData;
    };
    GuaranteesPresentationController.prototype.updateReceivedClaim = function (form) {
        this.showProgressBar();
        const transformedReceivedClaimData = this.transformReceivedClaimData();
        this.guaranteesManager.updateReceivedClaim(transformedReceivedClaimData, this.updateReceivedClaimSuccess.bind(this, form), this.updateReceivedClaimFailure.bind(this, form));
    };
    GuaranteesPresentationController.prototype.updateReceivedClaimSuccess = function (form, response) {
        this.receivedClaimData = Object.assign(this.receivedClaimData, response);
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesPresentationController.prototype.updateReceivedClaimFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesPresentationController.prototype.getAccountDisplayName = function (accId) {
        const accounts = applicationManager.getAccountManager().getInternalAccounts();
        for (const account of accounts) {
            if (account.accountID === accId) {
                return CommonUtilities.getAccountDisplayName(account);
            }
        }
        return kony.i18n.getLocalizedString("i18n.common.NA");
    };
    GuaranteesPresentationController.prototype.getGuaranteeAndAmendmentById = function (params, form, callback) {
        this.showProgressBar();
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.guaranteesManager, 'fetchGuaranteeAmendmentsById', [{ amendmentSRMSRequestId: params.transactionReference }]),
                this.asyncManager.asyncItem(this.guaranteesManager, 'fetchGuaranteeById', [{ guaranteesSRMSId: params.guaranteesSRMSId }])
            ],
            this.getGuaranteeAndAmendmentByIdCallback.bind(this, form, callback)
        );
    };
    GuaranteesPresentationController.prototype.getGuaranteeAndAmendmentByIdCallback = function (form, callback, syncResponseObject) {
        this.hideProgressBar();
        if (syncResponseObject.isAllSuccess()) {
            this.amendmentData = syncResponseObject.responses[0].data;
            this.guaranteeData = syncResponseObject.responses[1].data[0];
            if (callback && typeof callback === 'function') {
                callback();
            } else {
                this.showView({
                    form
                });
            }
        } else {
            this.showView({
                form,
                data: {
                    serverError: syncResponseObject.responses[0].data.dbpErrMsg || syncResponseObject.responses[1].data.dbpErrMsg
                }
            });
        }
    };
    return GuaranteesPresentationController;
});