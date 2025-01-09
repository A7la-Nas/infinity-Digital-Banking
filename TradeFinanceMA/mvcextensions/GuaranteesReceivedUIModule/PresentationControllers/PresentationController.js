define(['CommonUtilities', 'OLBConstants'], function (CommonUtilities, OLBConstants) {
    let NA = kony.i18n.getLocalizedString("i18n.common.NA");
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function GuaranteesReceivedPresentationController() {
        this.navigationManager = applicationManager.getNavigationManager();
        this.exportLCManager = applicationManager.getExportLCManager();
        this.guaranteesReceivedManager = applicationManager.getGuaranteesReceivedManager();
        this.asyncManager = applicationManager.getAsyncManager();
        this.claimData = {};
        this.reviseClaimData = {};
        this.guaranteeData = {};
        this.amendmentData = {};
        this.guaranteeClaimConfig = {
            'documentsLimit': 20,
            'documentMaxSize': 25000000,
            'fileExtensions': {
                'pdf': 'pdf_image.png',
                'jpeg': 'jpeg_image.png',
                'doc': 'word.png',
                'docx': 'word.png',
                'xlsx': 'excel.png',
                'bmp': 'png.png',
                'zip': 'zip.png'
            },
            'physicalDocumentTitles': ['Drafts', 'Invoices', 'B/L or AWB', 'Shipment Advice', 'Cert. of Origin', 'Insurance', 'Packing List', ' Weight List', 'Inspection Cert.', 'Beneficiary Cert.', 'TCN/TWB', ' Original LC', 'Amendment'],
            'physicalDocumentCounts': ['0', '1', '2', '3', '4', '5', '6', '7', '8', 'Will not submit'],
            'physicalDocumentsLimit': 20,
            'accountTypes': [OLBConstants.ACCOUNT_TYPE.SAVING, OLBConstants.ACCOUNT_TYPE.CHECKING, OLBConstants.ACCOUNT_TYPE.CURRENT]
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
            }
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
        this.guaranteeConfig = {
            'currencies': {
                'USD': 'USD',
                'EUR': 'EUR'
            }
        };
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(GuaranteesReceivedPresentationController, kony.mvc.Presentation.BasePresenter);

    GuaranteesReceivedPresentationController.prototype.downloadGeneratedFile = function (response, fileName, fileType) {
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
    GuaranteesReceivedPresentationController.prototype.initializePresentationController = function () { };
    /**
     * Entry Point method for GuaranteesReceived module
     * @param {object} context - contains info to load the screen
     */
    GuaranteesReceivedPresentationController.prototype.showGuaranteesReceivedScreen = function (params) {
        switch (params.context) {
            case 'createGuaranteeClaim':
                this.claimData = params.data || {};
                this.reviseClaimData = {};
                this.getReceivedGuaranteeById({ guaranteeSrmsId: params.data.guaranteeSrmsId || params.data.guaranteesSRMSId }, params.form, this.showView.bind(this, { form: 'frmCreateClaim' }));
                break;
            case 'viewAllReceivedGtAndSblc':
                this.navigationManager.navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmGuaranteesReceivedDashboard' }, false, { flowType: 'ReceivedGuarantees' });
                break;
            case 'viewAllInitiatedClaims':
                this.navigationManager.navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmGuaranteesReceivedDashboard' }, false, { flowType: 'Claims' });
                this.showView(params);
                break;
            case 'printClaim':
                this.claimData = params.data || {};
                this.getReceivedGuaranteeAndClaimById(params.data, params.form, this.showView.bind(this, { form: 'frmPrintClaim' }));
                break;
            case 'viewClaimDetails':
                this.claimData = params.data || {};
                this.reviseClaimData = {};
                this.getReceivedGuaranteeAndClaimById(params.data, params.form, this.showView.bind(this, { form: 'frmViewClaimDetails' }));
                break;
            case 'viewAmendment':
                this.getReceivedGuaranteeAndAmendmentById(params.data, params.form, this.showView.bind(this, { form: 'frmReceivedGuaranteeAmendment' }));
                break;
            case 'viewGuaranteeDetails':
                this.getReceivedGuaranteeById(params.data, params.form, this.showView.bind(this, { form: 'frmGuaranteeReceivedViewDetails' }));
                break;
        }
    };
    /**
     * Method to show a particular form
     * @param {object} param0 - contains info to load the particular form
     */
    GuaranteesReceivedPresentationController.prototype.showView = function ({ appName, form, data }) {
        if (!form) return;
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

    GuaranteesReceivedPresentationController.prototype.showMessagesScreen = function(params) {
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
          messagesPresenter.showAlertsPage("Trade Finance ReceivedGuarantee", contextObj);
    };
    /**
     * Method to verify whether the value is empty, null or undefined
     * @param {any} data - value to be verified
     * @returns {boolean} - validity of the value passed
     */
    GuaranteesReceivedPresentationController.prototype.isEmptyNullOrUndefined = function (data) {
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
    GuaranteesReceivedPresentationController.prototype.showProgressBar = function () {
        this.navigationManager.updateForm({
            isLoading: true
        });
    };
    /**
     * Method to hide the loading indicator
     */
    GuaranteesReceivedPresentationController.prototype.hideProgressBar = function () {
        this.navigationManager.updateForm({
            isLoading: false
        });
    };
    /**
     * Method to upload the document to server
     * @param {*} uploadedattachments
     * @param {string} form - Form name
     */
    GuaranteesReceivedPresentationController.prototype.uploadDocument = function (attachment, form) {
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
    GuaranteesReceivedPresentationController.prototype.uploadDocumentSuccess = function (form, response) {
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
    GuaranteesReceivedPresentationController.prototype.uploadDocumentError = function (form, response) {
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
    GuaranteesReceivedPresentationController.prototype.deleteDocument = function (deleteParams, form) {
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
    GuaranteesReceivedPresentationController.prototype.deleteDocumentSuccess = function (form, response) {
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
    GuaranteesReceivedPresentationController.prototype.deleteDocumentError = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };

    GuaranteesReceivedPresentationController.prototype.getGuaranteeClaims = function (params, form) {
        this.showProgressBar();
        this.guaranteesReceivedManager.fetchGuaranteeClaims(params, this.getGuaranteeClaimsSuccess.bind(this, form), this.getGuaranteeClaimsFailure.bind(this, form));
    };
    GuaranteesReceivedPresentationController.prototype.getGuaranteeClaimsSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesReceivedPresentationController.prototype.getGuaranteeClaimsFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesReceivedPresentationController.prototype.getGuaranteeClaimById = function (params, form) {
        this.showProgressBar();
        this.guaranteesReceivedManager.fetchGuaranteeClaimById(params, this.getGuaranteeClaimByIdSuccess.bind(this, form), this.getGuaranteeClaimByIdFailure.bind(this, form));
    };
    GuaranteesReceivedPresentationController.prototype.getGuaranteeClaimByIdSuccess = function (form, response) {
        this.hideProgressBar();
        this.claimData = Object.assign(this.claimData, response);
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesReceivedPresentationController.prototype.getGuaranteeClaimByIdFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesReceivedPresentationController.prototype.saveGuaranteeClaim = function (params, form, flow) {
        this.showProgressBar();
        this.claimData = Object.assign(this.claimData, params);
        const transformedGuaranteeClaimData = this.transformGuaranteeClaimData();
        this.guaranteesReceivedManager.saveGuaranteeClaim(transformedGuaranteeClaimData, this.saveGuaranteeClaimSuccess.bind(this, form, flow), this.saveGuaranteeClaimFailure.bind(this, form));
    };
    GuaranteesReceivedPresentationController.prototype.saveGuaranteeClaimSuccess = function (form, flow, response) {
        this.hideProgressBar();
        if (flow === 'saveOrDeleteDraft') {
            response['showSuccessMessage'] = true;
            this.showGuaranteesReceivedScreen({
                context: 'viewAllInitiatedClaims',
                form: 'frmGuaranteesReceivedDashboard',
                data: response
            });
        } else {
            this.claimData['claimsSRMSId'] = response.claimsSRMSId;
            this.showView({
                form,
                data: response
            });
        }
    };
    GuaranteesReceivedPresentationController.prototype.saveGuaranteeClaimFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesReceivedPresentationController.prototype.createGuaranteeClaim = function (form) {
        this.showProgressBar();
        const transformedGuaranteeClaimData = this.transformGuaranteeClaimData();
        this.guaranteesReceivedManager.createGuaranteeClaim(transformedGuaranteeClaimData, this.createGuaranteeClaimSuccess.bind(this, form), this.createGuaranteeClaimFailure.bind(this, form));
    };
    GuaranteesReceivedPresentationController.prototype.createGuaranteeClaimSuccess = function (form, response) {
        this.hideProgressBar();
        this.claimData = Object.assign(this.claimData, response);
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesReceivedPresentationController.prototype.createGuaranteeClaimFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesReceivedPresentationController.prototype.updateGuaranteeClaim = function (form) {
        this.showProgressBar();
        const transformedGuaranteeClaimData = this.transformGuaranteeClaimData();
        this.guaranteesReceivedManager.updateGuaranteeClaim(transformedGuaranteeClaimData, this.updateGuaranteeClaimSuccess.bind(this, form), this.updateGuaranteeClaimFailure.bind(this, form));
    };
    GuaranteesReceivedPresentationController.prototype.updateGuaranteeClaimSuccess = function (form, response) {
        this.hideProgressBar();
        this.reviseClaimData = Object.assign(this.reviseClaimData, response);
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesReceivedPresentationController.prototype.updateGuaranteeClaimFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesReceivedPresentationController.prototype.transformGuaranteeClaimData = function () {
        const claimData = JSON.parse(JSON.stringify(this.reviseClaimData.isRevise ? this.reviseClaimData : this.claimData));
        const guaranteeData = JSON.parse(JSON.stringify(this.guaranteeData))
        let transformedData = {
            'productType': guaranteeData.productType || '',
            'beneficiaryName': guaranteeData.beneficiaryName || guaranteeData.applicantName || '',
            'guaranteesSRMSId': guaranteeData.guaranteeSrmsId || guaranteeData.guaranteesSRMSId || '',
            'guaranteeAndSBLCType': guaranteeData.guaranteeAndSBLCType || guaranteeData.lcType || '',
            'guaranteesReferenceNo': guaranteeData.guaranteesReferenceNo || guaranteeData.relatedTransactionReference || '',
            'amount': guaranteeData.amount || '',
            'expiryType': guaranteeData.expiryType || '',
            'expiryDate': guaranteeData.expiryDate || '',
            'issuingBank': guaranteeData.issuingBankName || '',
            'issueDate': guaranteeData.issueDate || guaranteeData.expectedIssueDate || '',
            'claimCurrency': claimData.claimCurrency || '',
            'claimAmount': claimData.claimAmount || '',
            'claimCreditAccount': claimData.claimCreditAccount || '',
            'chargesDebitAccount': claimData.chargesDebitAccount || '',
            'demandType': claimData.demandType || '',
            'newExtensionDate': claimData.newExtensionDate || '',
            'documentInformation': claimData.documentInformation || '',
            'physicalDocuments': claimData.physicalDocuments || '',
            'forwardDocuments': claimData.forwardDocuments || '',
            'otherDemandDetails': claimData.otherDemandDetails || '',
            'messageToBank': claimData.messageToBank || '',
            'claimsSRMSId': claimData.claimsSRMSId || '',
            'createdOn': claimData.createdOn || new Date().toISOString(),
            'discrepancies': claimData.discrepancies || '',
            'isRevise': claimData.isRevise || '',
            'returnMessageToBank': claimData.returnMessageToBank || ''
        };
        for (const key in transformedData) {
            if (this.isEmptyNullOrUndefined(transformedData[key])) delete transformedData[key];
        }
        return transformedData;
    };

    /**
     * @api : renderI18nKeys
     * Rendering 
     * @return : NA
     */
    GuaranteesReceivedPresentationController.prototype.renderI18nKeys = function (i18nKeyString, renderColon) {
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
     * @api : getDynamicData
     * Returning the dynamic data based on input parameter
     * @arg1 : response - Service response to capture the value
     * @arg2 : key - input key to get the value
     * @return : objValue - Value based on provided input key
     */
    GuaranteesReceivedPresentationController.prototype.getDynamicData = function (response, key) {
        var scope = this;
        try {
            let tempDynamicData = NA;
            if (response.hasOwnProperty(key)) {
                if (!scope.isEmptyNullOrUndefined(response[key])) {
                    tempDynamicData = response[key];
                }
            }
            return tempDynamicData;
        } catch (err) {
            var errorObj =
            {
                "method": "getDynamicData",
                "error": err
            };
            scope.onError(errorObj);
        }
    };

    /**
     * @api : getConvertedDate
     * Getting the date based on input
     * @arg1 : response – Service response to capture the value
     * @arg2 : key - input key to get the value
     * @return : stringValue - Value based on provided input key
     */
    GuaranteesReceivedPresentationController.prototype.getConvertedDate = function (response, key) {
        var scope = this;
        try {
            let tempConvertedDate = NA;
            if (response.hasOwnProperty(key)) {
                if (!scope.isEmptyNullOrUndefined(response[key])) {
                    tempConvertedDate = CommonUtilities.getFrontendDateStringInUTC(scope.getDynamicData(response, key), applicationManager.getConfigurationManager().getConfigurationValue('frontendDateFormat'));
                }
            }
            return tempConvertedDate;
        } catch (err) {
            var errorObj =
            {
                "method": "getConvertedDate",
                "error": err
            };
            scope.onError(errorObj);
        }
    };

    /**
     * @api : getConvertedCurrency
     * Getting the currency based on input
     * @arg1 : response – Service response to capture the value
     * @arg2 : currencyKey - input key to get the currency symbol
     * @return : stringValue - Currency symbol based on provided input key
     */
    GuaranteesReceivedPresentationController.prototype.getConvertedCurrency = function (response, currencyKey) {
        var scope = this;
        try {
            let tempCurrency = NA;
            if (response.hasOwnProperty(currencyKey)) {
                if (!scope.isEmptyNullOrUndefined(response[currencyKey])) {
                    tempCurrency = applicationManager.getConfigurationManager().getCurrency(response[currencyKey]);
                }
            }

            if (tempCurrency === NA) {
                return '';
            } else {
                return tempCurrency;
            }
        } catch (err) {
            var errorObj =
            {
                "method": "getConvertedCurrency",
                "error": err
            };
            scope.onError(errorObj);
        }
    };

    /**
   * Method to submit the Received guarantee amendment 
   * @param {object} lcData - consist of payload 
   * @param {string} form - form name
   */
    GuaranteesReceivedPresentationController.prototype.submitConsent = function (params, form) {
        this.showProgressBar();
        this.guaranteesReceivedManager.submitReceivedGuaranteeAmendment(params, this.submitReceivedGuaranteeAmendmentSuccess.bind(this, form), this.submitReceivedGuaranteeAmendmentFailure.bind(this, form));
    };
    /**
     * Method to handle success call back of submit the Received guarantee amendment 
     * @param {string} form - form name
     */
    GuaranteesReceivedPresentationController.prototype.submitReceivedGuaranteeAmendmentSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                submitReceivedGuaranteeAmendSuccess: response
            }
        });
    };
    /**
     * Method to handle failure call back of submit the Received guarantee amendment 
     * @param {string} form - form name
     */
    GuaranteesReceivedPresentationController.prototype.submitReceivedGuaranteeAmendmentFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesReceivedPresentationController.prototype.retrieveDocument = function (docReference, form) {
        this.showProgressBar();
        const params = {
            'documentReference': docReference
        };
        this.guaranteesReceivedManager.retrieveDocuments(params, this.retrieveDocumentSuccess.bind(this, form), this.retrieveDocumentError.bind(this, form));
    };
    GuaranteesReceivedPresentationController.prototype.retrieveDocumentSuccess = function (form, response) {
        this.hideProgressBar();
        if (response) {
            let downloadUrl = `${KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url}/operations/LCDocuments/downloadDocument`;
            CommonUtilities.downloadAttachment(downloadUrl, {"fileId": response[0].fileID});
        }
    };
    GuaranteesReceivedPresentationController.prototype.retrieveDocumentError = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };

    /**
     * Method to generate the received guarantee list file
     * @param {object} params - consist of payload to generate file
     * @param {string} form - form name
     */
    GuaranteesReceivedPresentationController.prototype.generateReceivedGuaranteeList = function (params, form) {
        this.showProgressBar();
        this.guaranteesReceivedManager.generateReceivedGuaranteesList(params, this.generateReceivedGuaranteeListSuccess.bind(this), this.generateReceivedGuaranteeListFailure.bind(this, form));
    };
    /**
    * Success callback for generating the received guarantee list file
    * @param {object} response - consist fileId of generated file
    */
    GuaranteesReceivedPresentationController.prototype.generateReceivedGuaranteeListSuccess = function (response) {
        this.downloadGeneratedFile(response, "Received Guarantee", "xlsx");
        this.hideProgressBar();
    };
    /**
    * Failure callback for generating the received guarantee list file
    * @param {object} response - consist of error details
    * @param {string} form - form name
    */
    GuaranteesReceivedPresentationController.prototype.generateReceivedGuaranteeListFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };

    /**
   * Method to generate the received guarantee list file
   * @param {object} params - consist of payload to generate file
   * @param {string} form - form name
   */
    GuaranteesReceivedPresentationController.prototype.generateReceivedGuaranteeAmendmentList = function (params, form) {
        this.showProgressBar();
        this.guaranteesReceivedManager.generateReceivedGuaranteeAmendmentList(params, this.generateReceivedGuaranteeAmendmentListSuccess.bind(this), this.generateReceivedGuaranteeAmendmentListFailure.bind(this, form));
    };
    /**
    * Success callback for generating the received guarantee list file
    * @param {object} response - consist fileId of generated file
    */
    GuaranteesReceivedPresentationController.prototype.generateReceivedGuaranteeAmendmentListSuccess = function (response) {
        this.downloadGeneratedFile(response, "Received Guarantee Amendment", "xlsx");
        this.hideProgressBar();
    };
    /**
    * Failure callback for generating the received guarantee list file
    * @param {object} response - consist of error details
    * @param {string} form - form name
    */
    GuaranteesReceivedPresentationController.prototype.generateReceivedGuaranteeAmendmentListFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    /**
       * Method to generate the received Claims list file
       * @param {object} params - consist of payload to generate file
       * @param {string} form - form name
       */
    GuaranteesReceivedPresentationController.prototype.generateReceivedGuaranteeClaimsList = function (params, form) {
        this.showProgressBar();
        this.guaranteesReceivedManager.generateReceivedGuaranteeClaimsList(params, this.generateReceivedGuaranteeClaimsListSuccess.bind(this), this.generateReceivedGuaranteeClaimsListFailure.bind(this, form));
    };
    /**
    * Success callback for generating the received Claims list file
    * @param {object} response - consist fileId of generated file
    */
    GuaranteesReceivedPresentationController.prototype.generateReceivedGuaranteeClaimsListSuccess = function (response) {
        this.downloadGeneratedFile(response, "Received Guarantee Claim", "xlsx");
        this.hideProgressBar();
    };
    /**
    * Failure callback for generating the received Claims list file
    * @param {object} response - consist of error details
    * @param {string} form - form name
    */
    GuaranteesReceivedPresentationController.prototype.generateReceivedGuaranteeClaimsListFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesReceivedPresentationController.prototype.getReceivedGuarantees = function (params, form) {
        this.showProgressBar();
        this.guaranteesReceivedManager.fetchReceivedGuarantees(params, this.getReceivedGuaranteesSuccess.bind(this, form), this.getReceivedGuaranteesFailure.bind(this, form));
    };
    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteesSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteesFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteeById = function (params, form, callback) {
        this.showProgressBar();
        this.guaranteesReceivedManager.fetchReceivedGuaranteeById(params, this.getReceivedGuaranteeByIdSuccess.bind(this, form, callback), this.getReceivedGuaranteeByIdFailure.bind(this, form));
    };
    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteeByIdSuccess = function (form, callback, response) {
        this.hideProgressBar();
        if (callback && typeof callback === 'function') {
            this.guaranteeData = Object.assign(this.guaranteeData, response);
            callback();
        } else {
            this.showView({
                form,
                data: response
            });
        }
    };
    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteeByIdFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteeAmendmentsById = function (params, form) {
        this.showProgressBar();
        this.guaranteesReceivedManager.fetchReceivedGuaranteeAmendmentsId(params, this.getReceivedGuaranteeAmendmentsByIdSuccess.bind(this, form), this.getReceivedGuaranteeAmendmentsByIdFailure.bind(this, form));
    };

    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteeAmendmentsByIdSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };

    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteeAmendmentsByIdFailure = function (form, response) {
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
      * @param {string} form - form name
      */
    GuaranteesReceivedPresentationController.prototype.generateReceivedGuaranteesLC = function (params, form) {
        this.showProgressBar();
        this.guaranteesReceivedManager.generateReceivedGuaranteesLC(params, this.generateReceivedGuaranteesLCSuccess.bind(this), this.generateReceivedGuaranteesLCFailure.bind(this, form));
    };

    /**
     * Success callback for generating the guarantee LC file
     * @param {object} response - consist fileId of generated file
     */
    GuaranteesReceivedPresentationController.prototype.generateReceivedGuaranteesLCSuccess = function (response) {
        this.downloadGeneratedFile(response, "Received Guarantee", "pdf");
        this.hideProgressBar();
    };
    /**
     * Failure callback for generating the guarantee LC file
     * @param {onject} response - consist of error details
     * @param {string} form - form name
     */
    GuaranteesReceivedPresentationController.prototype.generateReceivedGuaranteesLCFailure = function (form, response) {
        this.hideProgressBar();
        this.showView(form, {
            "serverError": response.errmsg || response.errorMessage
        });
    };
    /**
   * Method to generate the guarantee Received Amendment LC file
   * @param {object} params - consist of payload to generate file
   * @param {string} frm - form name
   */
    GuaranteesReceivedPresentationController.prototype.generateGuaranteesReceivedAmendments = function (params, frm) {
        this.showProgressBar();
        this.guaranteesReceivedManager.generateGuaranteesReceivedAmendments(params, this.generateGuaranteesReceivedAmendmentsSuccess.bind(this), this.generateGuaranteesReceivedAmendmentsFailure.bind(this, frm));
    };
    /**
     * Success callback for generating the guarantee Received Amendment LC file
     * @param {object} response - consist fileId of generated file
     */
    GuaranteesReceivedPresentationController.prototype.generateGuaranteesReceivedAmendmentsSuccess = function (response) {
        this.downloadGeneratedFile(response, "Received Guarantee Amendment", "pdf");
        this.hideProgressBar();
    };
    /**
     * Failure callback for generating the guarantee Received Amendment LC file
     * @param {onject} response - consist of error details
     * @param {string} frm - form name
     */
    GuaranteesReceivedPresentationController.prototype.generateGuaranteesReceivedAmendmentsFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    /**
   * Method to generate the guarantee Received Claims LC file
   * @param {object} params - consist of payload to generate file
   * @param {string} frm - form name
   */
    GuaranteesReceivedPresentationController.prototype.generateGuaranteesReceivedClaims = function (data, frm) {
        this.showProgressBar();
        const params = {
            claimsSRMSId: data.claimsSRMSId
        };
        this.guaranteesReceivedManager.generateGuaranteesReceivedClaims(params, this.generateGuaranteesReceivedClaimsSuccess.bind(this), this.generateGuaranteesReceivedClaimsFailure.bind(this, frm));
    };
    /**
     * Success callback for generating the guarantee Received Claims LC file
     * @param {object} response - consist fileId of generated file
     */
    GuaranteesReceivedPresentationController.prototype.generateGuaranteesReceivedClaimsSuccess = function (response) {
        this.downloadGeneratedFile(response, "Received Guarantee Claim", "pdf");
        this.hideProgressBar();
    };
    /**
     * Failure callback for generating the guarantee Received Claims LC file
     * @param {onject} response - consist of error details
     * @param {string} frm - form name
     */
    GuaranteesReceivedPresentationController.prototype.generateGuaranteesReceivedClaimsFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };

    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteesAmendments = function (params, form) {
        this.showProgressBar();
        this.guaranteesReceivedManager.fetchReceivedGuaranteesAmendments(params, this.getReceivedGuaranteesAmendmentsSuccess.bind(this, form), this.getReceivedGuaranteesAmendmentsFailure.bind(this, form));
    };
    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteesAmendmentsSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteesAmendmentsFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    /**
     * Method to accepting or rejecting the guarantee
     * @param {object} params - consist of payload to generate file
     * @param {string} form - form name
     */
    GuaranteesReceivedPresentationController.prototype.acceptOrRejectGuarantee = function (params, form) {
        this.showProgressBar();
        this.guaranteesReceivedManager.acceptOrRejectGuarantee(params, this.acceptOrRejectGuaranteeSuccess.bind(this, form), this.acceptOrRejectGuaranteeFailure.bind(this, form));
    };
    /**
     * Success callback for accepting or rejecting the guarantee
     * @param {string} form - form name
     * @param {object} response - consist fileId of generated file
     */
    GuaranteesReceivedPresentationController.prototype.acceptOrRejectGuaranteeSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    /**
     * Failure callback for accepting or rejecting the guarantee
     * @param {string} form - form name
     * @param {onject} response - consist of error details
     */
    GuaranteesReceivedPresentationController.prototype.acceptOrRejectGuaranteeFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    /**
     * Method to release liability
     * @param {object} params - consist of payload to release liability
     * @param {string} form - form name
    */
    GuaranteesReceivedPresentationController.prototype.releaseLiability = function (params, form) {
        this.showProgressBar();
        this.guaranteesReceivedManager.releaseLiability(params, this.releaseLiabilitySuccess.bind(this, form), this.releaseLiabilityFailure.bind(this, form));
    };
    /**
     * Success callback for release liability
     * @param {string} form - form name
     * @param {object} response - consist success info
     */
    GuaranteesReceivedPresentationController.prototype.releaseLiabilitySuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    /**
     * Failure callback for release liability
     * @param {string} form - form name
     * @param {onject} response - consist of error details
     */
    GuaranteesReceivedPresentationController.prototype.releaseLiabilityFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteeAndClaimById = function (params, form, callback) {
        this.showProgressBar();
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.guaranteesReceivedManager, 'fetchReceivedGuaranteeById', [{ guaranteeSrmsId: params.guaranteeSrmsId || params.guaranteesSRMSId }]),
                this.asyncManager.asyncItem(this.guaranteesReceivedManager, 'fetchGuaranteeClaimById', [{ claimsSRMSId: params.claimsSRMSId }])
            ],
            this.getReceivedGuaranteeAndClaimByIdCallback.bind(this, form, callback)
        );
    };
    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteeAndClaimByIdCallback = function (form, callback, syncResponseObject) {
        this.hideProgressBar();
        if (syncResponseObject.isAllSuccess()) {
            this.guaranteeData = syncResponseObject.responses[0].data;
            this.claimData = syncResponseObject.responses[1].data;
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
                data: syncResponseObject.responses[0]
            });
        }
    };
    GuaranteesReceivedPresentationController.prototype.deleteGuaranteeClaim = function (form) {
        this.showProgressBar();
        const transformedGuaranteeClaimData = this.transformGuaranteeClaimData();
        this.guaranteesReceivedManager.deleteGuaranteeClaim(transformedGuaranteeClaimData, this.deleteGuaranteeClaimSuccess.bind(this, form), this.deleteGuaranteeClaimFailure.bind(this, form));
    };
    GuaranteesReceivedPresentationController.prototype.deleteGuaranteeClaimSuccess = function (form, response) {
        this.hideProgressBar();
        response['showSuccessMessage'] = true;
        this.showGuaranteesReceivedScreen({ 
            context: 'viewAllInitiatedClaims',
            form: 'frmGuaranteesReceivedDashboard',
            data: response
        });
    };
    GuaranteesReceivedPresentationController.prototype.deleteGuaranteeClaimFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteeAndAmendmentById = function (params, form, callback) {
        this.showProgressBar();
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.guaranteesReceivedManager, 'fetchReceivedGuaranteeAmendmentsId', [{ amendmentSrmsId: params.transactionReference }]),
                this.asyncManager.asyncItem(this.guaranteesReceivedManager, 'fetchReceivedGuaranteeById', [{ guaranteeSrmsId: params.guaranteeSRMSId }])
            ],
            this.getReceivedGuaranteeAndAmendmentByIdCallback.bind(this, form, callback)
        );
    };
    GuaranteesReceivedPresentationController.prototype.getReceivedGuaranteeAndAmendmentByIdCallback = function (form, callback, syncResponseObject) {
        this.hideProgressBar();
        if (syncResponseObject.isAllSuccess()) {
            this.amendmentData = syncResponseObject.responses[0].data;
            this.guaranteeData = syncResponseObject.responses[1].data;
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
    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @arg: err - object based on error
     * @return : NA
     */
    onError = function (err) {
        let errMsg = JSON.stringify(err);
        errMsg.level = "GuaranteesReceivedPresentation";
        // kony.ui.Alert(errMsg);
    };

    return GuaranteesReceivedPresentationController;
});