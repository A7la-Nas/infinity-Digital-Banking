define(['CommonUtilities', 'OLBConstants'], function (CommonUtilities, OLBConstants) {
  let NA = kony.i18n.getLocalizedString("i18n.common.NA");
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function OutwardCollectionsPresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
        this.navigationManager = applicationManager.getNavigationManager();
        this.exportLCManager = applicationManager.getExportLCManager();
        this.guaranteesManager = applicationManager.getGuaranteesManager();
        this.configurationManager = applicationManager.getConfigurationManager();
        this.recipientsManager = applicationManager.getRecipientsManager();
        this.asyncManager = applicationManager.getAsyncManager();
        this.userPreferencesManager = applicationManager.getUserPreferencesManager();
        this.outwardCollectionsManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: 'OutwardCollectionsManager', appName: 'TradeFinanceMA' }).businessController;
        this.amendmentResponse = {};
        this.collectionResponse = {};
        this.previousFormName = "";
        //Outward Collection status  
      	this.collectionStatusConfig = {
            'Draft' : kony.i18n.getLocalizedString("kony.mb.Messages.draft"),
            'Submitted to Bank' : kony.i18n.getLocalizedString("i18n.TradeFinance.SubmittedToBank"),
            'Processing by Bank' : kony.i18n.getLocalizedString("i18n.TradeFinance.ProcessingByBank"),
            'Returned by Bank' : kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank"),
            'Rejected' : kony.i18n.getLocalizedString("i18n.Search.Rejected"),
            'Approved' : kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved"),
            'Overdue' : kony.i18n.getLocalizedString("i18n.AccountSummary.overdue"),
            'Settled' : kony.i18n.getLocalizedString("i18n.TradeFinance.settled"),
            'Cancelled' : kony.i18n.getLocalizedString("i18n.Transfers.Cancelled"),
        };
        this.amendmentStatusConfig = {
            'Submitted to Bank' : kony.i18n.getLocalizedString("i18n.TradeFinance.SubmittedToBank"),
            'Processing by Bank' : kony.i18n.getLocalizedString("i18n.TradeFinance.ProcessingByBank"),
            'Returned by Bank' : kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank"),
            'Rejected' : kony.i18n.getLocalizedString("i18n.Search.Rejected"),
            'Approved' : kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved"),
        };
        this.collectionsConfig = {
            'currencies': {
                'USD': 'USD',
                'EUR': 'EUR'
            },
            'month': {
                'ONE_MONTH' : "1 Month",
                'THREE_MONTH' : "3 Month",
                'SIX_MONTH' : "6 Month"
            },
            'documentsLimit': 30,
            'documentMaxSize': 25000000,
            'documentMaxSizeInMB': '25 MB',
            'fileExtensions': {
                'pdf': 'pdf.png',
                'jpeg': 'jpeg_image.png',
                'doc': 'word.png',
                'docx': 'word.png',
                'xlsx': 'excel.png',
                'bmp': 'png.png',
                'zip': 'zip.png'
            },
            physicalDocumentTitles: ['Drafts', 'Invoices', 'B/L or AWB', 'Shipment Advice', 'Cert. of Origin', 'Insurance', 'Packing List', ' Weight List', 'Inspection Cert.', 'Beneficiary Cert.', 'TCN/TWB', ' Original LC', 'Amendment'],
            physicalDocumentCounts: ['0', '1', '2', '3', '4', '5', '6', '7', '8', 'Will not submit'],
            physicalDocumentsLimit: 20,
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
            },
            'images': {
                failedBannerImage: 'failed_icon.png',
                successBannerImage: 'success_green.png',
                warningBannerImage: 'error_yellow.png',
            },
        };
        this.collectionsRoadmap = {
            collectionDetails: { name: kony.i18n.getLocalizedString('i18n.TradeFinance.collectionDetails'), lifeCycle: 'Inprogress' },
            draweeAndCollectingBank: { name: kony.i18n.getLocalizedString('i18n.TradeFinance.drawee&CollectingBank'), lifeCycle: 'Incomplete' },
            documentsAndBankInstructions: { name: kony.i18n.getLocalizedString('i18n.TradeFinance.documentsAndBankInstruction'), lifeCycle: 'Incomplete' },
            reviewAndSubmit: { name: kony.i18n.getLocalizedString('i18n.kony.BulkPayments.ViewRequests'), lifeCycle: 'Incomplete' },
        };
        this.createCollectionData = {};
        // Instructions for Bills 
      	this.collectionInstructionBills = {
            'ACCEPTANCE/ PAYMENT may await arrival of carrier': kony.i18n.getLocalizedString("i18n.TradeFinance.instructingBillsFirstOption"),
            'CABLE/ AIRMAIL advice for non payment / non acceptance': kony.i18n.getLocalizedString("i18n.TradeFinance.instructingBillsSecondOption"),
            'PROTEST for non payment / non acceptance': kony.i18n.getLocalizedString("i18n.TradeFinance.instructingBillsThirdOption"),
            'If unpaid/ unaccepted, store & insure goods': kony.i18n.getLocalizedString("i18n.TradeFinance.instructingBillsFourthOption"),
            'Collect overseas charges from Drawee': kony.i18n.getLocalizedString("i18n.TradeFinance.instructingBillsSixthOption"),
            'Deduct charges from proceeds': kony.i18n.getLocalizedString("i18n.TradeFinance.instructingBillsFivthOption"),
        };
        this.incoTerms = {
			"CIF": "COST,INSURANCE AND FREIGHT",
			"CFR": "COST AND FREIGHT",
			"FOB": "FREE ON BOARD",
			"FCA": "FREE CARRIER",
			"FAS": "FREE ALONGSIDE SHIP",
			"CPT": "CARRIAGE PAID TO",
			"CIP": "CARRIAGE AND INSURANCE PAID TO",
			"DAP": "DELEIVERED AT FRONTIER",
			"DDP": "DELIEVERED DUTY PAID",
			"DDU": "DELIVERED DUTY UNPAID",
			"DES": "DELIVERED EX SHIP",
			"DEQ": "DELIVERED EX QUAY",
			"EXW": "EX WORKS"
		};
        this.outwardConstants = {
            usance : 'Usance',
            sight : 'Sight',
            yes : 'Yes',
            no : 'No',
            draft: 'draft',
            submittedToBank: 'submitted to bank',
            processingByBank: 'processing by bank',
            returnedByBank: 'returned by bank',
            rejected: 'rejected',
            approved: 'approved',
            overdue: 'overdue',
            settled: 'settled',
            cancelled: 'cancelled',
            saveCollectionAsDraft: 'saveCollectionAsDraft',
            deletedCollection: 'deletedCollection',
            createdCollection: 'createdCollection',
            statusSubmittedToBank: 'Submitted to Bank',
            updateOutwardCollection: false,
            returnedByBankOriginalObj: {},
        };
        this.outwardCollectionData = {};
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
    }

    inheritsFrom(OutwardCollectionsPresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    OutwardCollectionsPresentationController.prototype.initializePresentationController = function() {
        
    };

    OutwardCollectionsPresentationController.prototype.renderI18nKeys = function (i18nKeyString, renderColon) {
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
     * Method to get Countdown image and text values
     */
       OutwardCollectionsPresentationController.prototype.calculateMaturityDate = function (maturityDate) {
        if (!maturityDate) return;
        const diff = Math.round((Date.parse(maturityDate) - Date.parse(new Date())) / 86400000);
        let tempConst = OLBConstants.OUTWARD_COLLECTION_AMENDMENTS_MATURITY_DATE_CONST;
        return {
            daysLeftToPay: diff
        };
    };

    OutwardCollectionsPresentationController.prototype.showMessagesScreen = function (params) {
        const messagesPresenter = applicationManager.getModulesPresentationController({
            appName: 'SecureMessageMA',
            moduleName: 'AlertsMsgsUIModule'
        });
        let contextObj = {};
        params.Category = "RCID_TF_COLLECTIONS";
        contextObj.record = params;
        contextObj.show = "CreateNewMessage"
        contextObj.cancelCallback = false;
        params.tradeModule = true;
        messagesPresenter.showAlertsPage("Trade Finance OutwardCollections", contextObj);
    };

    OutwardCollectionsPresentationController.prototype.getAccountDisplayName = function (selectedAccountId) {
        const accounts = applicationManager.getAccountManager().getInternalAccounts();
        for (const account of accounts) {
          if (account.accountID === selectedAccountId) {
            return CommonUtilities.getAccountDisplayName(account);
          }
        }
        return kony.i18n.getLocalizedString("i18n.common.NA");
    },

    OutwardCollectionsPresentationController.prototype.downloadGeneratedFile = function (response, fileName, fileType) {
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
     * Method to show the loading indicator
     */
    OutwardCollectionsPresentationController.prototype.showProgressBar = function () {
        this.navigationManager.updateForm({
            isLoading: true
        });
    };
    /**
     * Method to hide the loading indicator
     */
    OutwardCollectionsPresentationController.prototype.hideProgressBar = function () {
        this.navigationManager.updateForm({
            isLoading: false
        });
    };
  
    /**
     * @api : getConvertedDate
     * Getting the date based on input
     * @arg1 : response – Service response to capture the value
     * @arg2 : key - input key to get the value
     * @return : stringValue - Value based on provided input key
     */
     OutwardCollectionsPresentationController.prototype.getConvertedDate = function (response, key) {
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
     * @api : getDynamicData
     * Returning the dynamic data based on input parameter
     * @arg1 : response - Service response to capture the value
     * @arg2 : key - input key to get the value
     * @return : objValue - Value based on provided input key
     */
     OutwardCollectionsPresentationController.prototype.getDynamicData = function (response, key) {
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
     * Method to verify whether the value is empty, null or undefined
     * @param {any} data - value to be verified
     * @returns {boolean} - validity of the value passed
     */
    OutwardCollectionsPresentationController.prototype.isEmptyNullOrUndefined = function (data) {
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
     * Method to process documents and instructions responses
     * @param {any} response,responseKey - value to be verified
     * @returns - processed result
     */
    OutwardCollectionsPresentationController.prototype.processDocsAndInstructionBills = function (response,responseKey) {
      var scope = this;
      try {
        let tempResponse = !scope.isEmptyNullOrUndefined(response[responseKey]) ? JSON.parse(response[responseKey].replace(/'/g, "\"")) : NA;
        let tempResult = '';
        if (tempResponse !== NA) {
          tempResponse.map((item, index) => {
            if (scope.isEmptyNullOrUndefined(item.documentName))
              tempResult = tempResult + ((index + 1) + '. ' + item) + (tempResponse.length - 1 === index ? '' : '\n\n');
            else
              tempResult = (tempResult + item.documentName) + (tempResponse.length - 1 === index ? '' : '\n');
          });
        } else {
          tempResult = NA;
        }
        return tempResult;
      } catch (err) {
        var errorObj = {
          "method": "processDocsAndInstructionBills",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
      
    /**
     * Method to download pdf and xlsx file
     * @param {string} fileName - filename
     * @param {sting} fileType - pdf 0r xlsx 
     */
    OutwardCollectionsPresentationController.prototype.downloadGeneratedFile = function (response, fileName, fileType) {
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
     * Method to upload the document to server
     * @param {*} uploadedattachments 
     * @param {string} form - Form name
     */
    OutwardCollectionsPresentationController.prototype.uploadDocument = function (attachment, form) {
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
    OutwardCollectionsPresentationController.prototype.uploadDocumentSuccess = function (form, response) {
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
    OutwardCollectionsPresentationController.prototype.uploadDocumentError = function (form, response) {
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
    OutwardCollectionsPresentationController.prototype.deleteDocument = function (deleteParams, form) {
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
    OutwardCollectionsPresentationController.prototype.deleteDocumentSuccess = function (form, response) {
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
    OutwardCollectionsPresentationController.prototype.deleteDocumentError = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
  
      /**
     * Method to show a particular form
     * @param {object} param0 - contains info to load the particular form
     */
    OutwardCollectionsPresentationController.prototype.showView = function ({ appName, form, data }) {
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

    OutwardCollectionsPresentationController.prototype.getFormattedAddress = function(data, skin, width, left, aleft) {
        var scope = this;
        try {
            data = JSON.parse(data.replace(/'/g, "\""));
            let address1, address2, address3;
            address1 = data.address1;
            address2 = data.address2;
            address3 = [data.city, data.state, data.country, data.zipcode].join(',').replace(/^,+|,+$/g, '').replace(/,+/g, ', ');
            return {
                'flxAddress': {
                    isVisible: !!address1 || !!address2 || !!address3
                },
                'lblAddress1': {
                    isVisible: !!address1,
                    skin: skin,
                    text: address1,
                    left: aleft
                },
                'lblAddress2': {
                    isVisible: !!address2,
                    skin: skin,
                    text: address2,
                    left: aleft
                },
                'lblAddress3': {
                    isVisible: !!address3,
                    skin: skin,
                    text: address3,
                    left: aleft
                },
                "flxKey": {
                    "width": width,
                    "left": left,
                },
            };
        } catch (err) {
            var errorObj = {
                "method": "getFormattedAddress",
                "error": err
            };
            scope.onError(errorObj);
        }
    };

    OutwardCollectionsPresentationController.prototype.getMethodForAddress = function(data) {
        var scope = this;
        try {
            data = JSON.parse(data.replace(/'/g, "\""));
            let address1, address2, address3;
            address1 = data.address1;
            address2 = data.address2;
            address3 = [data.city, data.state, data.country, data.zipcode].join(',').replace(/^,+|,+$/g, '').replace(/,+/g, ', ');
            return {
                'flxAddress': {
                    isVisible: !!address1 || !!address2 || !!address3
                },
                'lblAddress1': {
                    isVisible: !!address1,
                    text: address1,
                },
                'lblAddress2': {
                    isVisible: !!address2,
                    text: address2,
                },
                'lblAddress3': {
                    isVisible: !!address3,
                    text: address3,
                }
            };
        } catch (err) {
            var errorObj = {
                "method": "getMethodForAddress",
                "error": err
            };
            scope.onError(errorObj);
        }
    };
    
    OutwardCollectionsPresentationController.prototype.getPhysicalDocumentCount = function(data)
     {
        let pyhDocResponse = data ? data : NA;
        let tempPhyDocResponse = "";
        if (pyhDocResponse !== NA) {
            pyhDocResponse = JSON.parse(data.replace(/'/g, "\""));
            pyhDocResponse.map((item, index) => {
              let title, originals, copies;
                if (item.hasOwnProperty('documentTitle') && item.hasOwnProperty('originalsCount') && item.hasOwnProperty('copiesCount')) {
                    title = item.documentTitle;
                    originals = item.originalsCount.slice(0,1);
                    copies = item.copiesCount.slice(0,1);
                    tempPhyDocResponse = (tempPhyDocResponse + (title + " (" + originals + ' ' + (originals == '1' ? 'Original' : this.renderI18nKeys('i18n.TradeFinance.Originals', false)) + ', ' + copies + ' ' + (copies == '1' ? this.renderI18nKeys('konybb.userMgmt.Copy', false) : this.renderI18nKeys('i18n.TradeFinance.Copies', false)) + ')')) + (pyhDocResponse.length - 1 === index ? '' : '\n');
              } else {
                   tempPhyDocResponse = NA;
              }
            });
        } else {
            tempPhyDocResponse = NA;
        }
        return tempPhyDocResponse;
    };


    /**
     * Entry Point method for Guarantees module
     * @param {object} context - contains info to load the screen
     */
    OutwardCollectionsPresentationController.prototype.showOutwardCollectionScreen = function (params) {
        switch (params.context) {
            case 'createCollection':
                var data = params.data || {};
                this.navigationManager.navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmCreateOutwardCollection' }, false, data);
                break;
            case 'draweeAndCollectingBank':
                this.showView({
                    form: 'frmCreateOutwardCollectionDraweeAndCollectingBank'
                });
                break;
            case 'documentAndTerms':
                this.showView({
                    form: 'frmCreateOutwardCollectionDocumentsTerms'
                });
                break;
            case 'outwardAmendments':
                this.getOutwardAmendments(params.data, params.form);                
                break;
            case 'outwardCollectionAmendmentDashboard':
                var data = params.data ;
                    this.navigationManager.navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmOutwardCollectionDashboard' }, false, data);
                break;
            case 'amendmentPrint':
                this.getAmendmentAndCollectionById(params.data, params.form, this.showView.bind(this, {
                    form: 'frmOutwardCollectionAmendmentPrint'
                }));
                break;
            case 'amendmentConsolidatedView':
                this.showView({
                    form: 'frmOutwardCollectionAmendmentsConsolidatedView',
                    data: params.data
                });
                break;
            case 'amendViewDetails':
                this.getAmendmentAndCollectionById(params.data, params.form, this.showView.bind(this, { form: 'frmOutwardCollectionsAmendmentViewDetails' }));
                break;
            case 'reviewAndSubmit':
                this.showView({
                    form: 'frmCreateOutwardCollectionReviewAndSubmit'
                });
                break;
            case 'collectionViewDetails':
                this.showView({
                    form: 'frmOutwardCollectionsViewDetails'
                });
                break;
            case 'createNewAmendment':
                this.createAmendment(params.data.payload, params.form, params.currentForm, params.data.collectionData);
                break;
            case 'updateAmendment':
                this.updateAmendment(params.data.payload, params.form, params.currentForm, params.data.collectionData);
                break;
		    case 'amendmentAcknowledgement':
                this.navigationManager.navigateTo({
                    appName: 'TradeFinanceMA',
                    friendlyName: 'frmOutwardCollectionsAmendmentAcknowledgement'
                }, false, params.data);
                break; 
            case 'reviseAmendment':
               this.navigationManager.navigateTo({
                    appName: 'TradeFinanceMA',
                    friendlyName: 'frmCreateOutwardCollectionsAmendment'
                }, false, params.data);
                break;
                case 'createAmendment':
                    var data = params.data ;
                    this.navigationManager.navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmCreateOutwardCollectionsAmendment' }, false, data);
                break; 
            case 'viewCollectionDetails':
                this.getOutwardCollectionsById(params.data, params.form, this.showView.bind(this, { form: 'frmOutwardCollectionsViewDetails' }));
                break;
            case 'outwardCollectionPrint':
                var data = params.data || {};
                new kony.mvc.Navigation({ "appName": "TradeFinanceMA", "friendlyName": 'OutwardCollectionsUIModule/frmOutwardCollectionPrint' }).navigate(data);
                break;
            case 'requestCancellation':
                var data = params.data;
                this.navigationManager.navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmOutwardCollectionCancellation' }, false, data);
                break;
            case 'createdCollection':
                var data = params.data || {};
                this.navigationManager.navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmOutwardCollectionsViewDetails' }, false, data);
                break;         
        }
    };

    /**
     * Method to show cursor as pointer
     * @param {Array} widgetRef - widget references array
     * @returns : NA
     */
    OutwardCollectionsPresentationController.prototype.cursorTypePointer = function (widgetRef) {
        try {
            widgetRef.map(item => {
                item.cursorType = "pointer";
            });
        } catch (err) {
            var errorObj = {
                "method": "cursorTypePointer",
                "error": err
            };
            scope.onError(errorObj);
        }
    };

    OutwardCollectionsPresentationController.prototype.getBeneficiaries = function (form) {
        const scope = this;
        this.showProgressBar();
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.outwardCollectionsManager, 'fetchPaymentPayees', [{}]),
                this.asyncManager.asyncItem(this.outwardCollectionsManager, 'fetchCorporatePayees', [{}])
            ],
            scope.getBeneficiariesCompletionCallBack.bind(scope, form)
        );
    };

    OutwardCollectionsPresentationController.prototype.getBeneficiariesCompletionCallBack = function (form, syncResponseObject) {
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

    OutwardCollectionsPresentationController.prototype.getFilteredBeneficiaries = function (response) {
        let paymentBeneficiaries = response[0].data ? (response[0].data.ExternalAccounts || []) : [];
        paymentBeneficiaries.forEach(beneficiary => beneficiary['payeeType'] = (beneficiary.isSameBankAccount === 'true') ? 'sameBank' : (beneficiary.isInternationalAccount === 'true') ? 'international' : 'domestic');
        let corporateBeneficiaries = response[1].data ? (response[1].data.Payees || []) : [];
        corporateBeneficiaries.forEach(beneficiary => beneficiary['payeeType'] = 'trade');
        return paymentBeneficiaries.concat(corporateBeneficiaries);
    };

    OutwardCollectionsPresentationController.prototype.getOutwardCollections = function (params, form) {
        this.showProgressBar();
        this.outwardCollectionsManager.fetchOutwardCollections(params, this.getOutwardCollectionsSuccess.bind(this, form), this.getOutwardCollectionsFailure.bind(this, form));
    };
    OutwardCollectionsPresentationController.prototype.getOutwardCollectionsSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: Array.isArray(response) ? { OutwardCollections: response } : response
        });
    };
    OutwardCollectionsPresentationController.prototype.getOutwardCollectionsFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

   /**
     * Method to get Collections record by ID
     * @param {object} params - consist of payload to get collections
     * @param {string} frm - form name
     */
    OutwardCollectionsPresentationController.prototype.getOutwardCollectionsById = function (params, form, callback) {
        this.showProgressBar();
        this.outwardCollectionsManager.fetchOutwardCollectionsById(params, this.getOutwardCollectionsByIdSuccess.bind(this, form, callback), this.getOutwardCollectionsByIdFailure.bind(this, form));
    };
    /**
     * Success callback for get Collections record by ID
     * @param {object} response - consist records
     */
    OutwardCollectionsPresentationController.prototype.getOutwardCollectionsByIdSuccess = function (form, callback, response) {
        this.hideProgressBar();
        this.collectionResponse = response;
        if (callback && typeof callback === 'function') {
            callback();
        } else {
            this.showView({
                form,
                data: response
            });
        }
    };

  /**
     * Failure callback for get Collections record by ID
     * @param {onject} response - consist of error details
     * @param {string} frm - form name
     */
    OutwardCollectionsPresentationController.prototype.getOutwardCollectionsByIdFailure = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      data: {
        serverError: response.errmsg || response.errorMessage
      }
    });
  };
  /**
     * Method to update request collection status
     * @param {object} params - consist of payload to update request collection status
     * @param {string} frm - form name
     */
  OutwardCollectionsPresentationController.prototype.updateRequestCollectionStatus = function (params, form) {
    this.showProgressBar();
    this.outwardCollectionsManager.updateRequestCollectionStatus(params, this.updateRequestCollectionStatusSuccess.bind(this, form), this.updateRequestCollectionStatusFailure.bind(this, form));
  };
  /**
     * Success callback for get Collections record by ID
     * @param {object} response - consist records
     */
    OutwardCollectionsPresentationController.prototype.updateRequestCollectionStatusSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      data: { updatedRequestCollectionStatus: response }
    });
  };

  /**
     * Failure callback for get Collections record by ID
     * @param {onject} response - consist of error details
     * @param {string} frm - form name
     */
    OutwardCollectionsPresentationController.prototype.updateRequestCollectionStatusFailure = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      data: {
        serverError: response.errmsg || response.errorMessage
      }
    });
  };
  
  /**
     * Method to generate the outward Collections pdf file
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    OutwardCollectionsPresentationController.prototype.generateOutwardCollections = function (params, frm) {
        this.showProgressBar();
        this.outwardCollectionsManager.generateOutwardCollections(params, this.generateOutwardCollectionsSuccess.bind(this), this.generateOutwardCollectionsFailure.bind(this, frm));
    };
      /**
       * Success callback for generating the outward Collections pdf file
       * @param {object} response - consist fileId of generated file
       */
    OutwardCollectionsPresentationController.prototype.generateOutwardCollectionsSuccess = function (response) {
        this.downloadGeneratedFile(response, "Outward Collection", "pdf");
        this.hideProgressBar();
    };
    /**
       * Failure callback for generating the outward Collections pdf file
       * @param {onject} response - consist of error details
       * @param {string} frm - form name
       */
    OutwardCollectionsPresentationController.prototype.generateOutwardCollectionsFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
  
   /**
     * Method to generate the outward Collections list file
     * @param {object} params - consist of payload to generate file
     * @param {string} form - form name
     */
    OutwardCollectionsPresentationController.prototype.generateOutwardCollectionsList = function (params, form) {
        this.showProgressBar();
        this.outwardCollectionsManager.generateOutwardCollectionsList(params, this.generateOutwardCollectionsListSuccess.bind(this), this.generateOutwardCollectionsListFailure.bind(this, form));
    };
    /**
    * Success callback for generating the outward collections list file
    * @param {object} response - consist fileId of generated file
    */
    OutwardCollectionsPresentationController.prototype.generateOutwardCollectionsListSuccess = function (response) {
        this.downloadGeneratedFile(response, "Outward Collection", "xlsx");
        this.hideProgressBar();
    };
    /**
    * Failure callback for generating the outward collections list file
    * @param {object} response - consist of error details
    * @param {string} form - form name
    */
    OutwardCollectionsPresentationController.prototype.generateOutwardCollectionsListFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
    OutwardCollectionsPresentationController.prototype.getOutwardAmendments = function (params, form) {
        this.showProgressBar();
        this.outwardCollectionsManager.fetchOutwardAmendments(params, this.getOutwardAmendmentsSuccess.bind(this, form), this.getOutwardAmendmentsFailure.bind(this, form));
    };

    OutwardCollectionsPresentationController.prototype.getOutwardAmendmentsSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form: form,
            data: Array.isArray(response) ? { OutwardAmendments: response } : response
        });
    };

    OutwardCollectionsPresentationController.prototype.getOutwardAmendmentsFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                amendmentsListServerError: response.errmsg || response.errorMessage
            }
        });
    };

       /**
       * Method to get Amendments record by ID
       * @param {object} params - consist of payload to get amendments
       * @param {string} frm - form name
       */
        OutwardCollectionsPresentationController.prototype.getOutwardAmendmentById = function (params, form) {
            this.showProgressBar();
            this.outwardCollectionsManager.fetchOutwardAmendmentById(params, this.getOutwardAmendmentByIdSuccess.bind(this, form), this.getOutwardAmendmentByIdFailure.bind(this, form));
        };
        /**
         * Success callback for get Amendments record by ID
         * @param {object} response - consist records
         */
        OutwardCollectionsPresentationController.prototype.getOutwardAmendmentByIdSuccess = function (form, response) {
            this.hideProgressBar();
            this.showView({
            form,
            data: response
            });
        };
        
        /**
         * Failure callback for get Collections record by ID
         * @param {onject} response - consist of error details
         * @param {string} frm - form name
         */
        OutwardCollectionsPresentationController.prototype.getOutwardAmendmentByIdFailure = function (form, response) {
            this.hideProgressBar();
            this.showView({
                form,
                data: {
                    serverError: response.errmsg || response.errorMessage
                }
            });
        };

        /**
       * Method to create cancellation request for a guarantee
       * @param {object} params - consist of payload to cancel guarantee
       * @param {string} frm - form name
       */
        OutwardCollectionsPresentationController.prototype.createCancellationRequest = function (params, form) {
            this.showProgressBar();
            this.outwardCollectionsManager.createAmendment (params, this.createCancellationRequestSuccess.bind(this, form), this.createCancellationRequestFailure.bind(this, form));
        };
        /**
         * Success callback for create cancellation request
         * @param {object} response - consist records
         */
        OutwardCollectionsPresentationController.prototype.createCancellationRequestSuccess = function (form, response) {
            this.hideProgressBar();
            this.showView({
                form,
                data: {
                    "cancelSuccess" : response
                }
            });
        };
        
        /**
         * Failure callback for create cancellation request
         * @param {object} response - consist of error details
         * @param {string} frm - form name
         */
        OutwardCollectionsPresentationController.prototype.createCancellationRequestFailure = function (form, response) {
            this.hideProgressBar();
            this.showView({
                form,
                data: {
                    serverError: response.errmsg || response.errorMessage
                }
            });
        };

        /**
         * Method to generate the outward Amendments pdf file
         * @param {object} params - consist of payload to generate file
         * @param {string} frm - form name
         */
        OutwardCollectionsPresentationController.prototype.generateOutwardAmendments = function (params, frm) {
            this.showProgressBar();
            this.outwardCollectionsManager.generateOutwardAmendments(params, this.generateOutwardAmendmentsSuccess.bind(this), this.generateOutwardAmendmentsFailure.bind(this, frm));
        };
        /**
         * Success callback for generating the outward Amendments pdf file
         * @param {object} response - consist fileId of generated file
         */
        OutwardCollectionsPresentationController.prototype.generateOutwardAmendmentsSuccess = function (response) {
            this.downloadGeneratedFile(response, "Outward Amendments", "pdf");
            this.hideProgressBar();
        };
        /**
         * Failure callback for generating the outward Amendments pdf file
         * @param {onject} response - consist of error details
         * @param {string} frm - form name
         */
        OutwardCollectionsPresentationController.prototype.generateOutwardAmendmentsFailure = function (form, response) {
            this.hideProgressBar();
            this.showView({
                form,
                data: {
                    "serverError": response.errmsg || response.errorMessage
                }
            });
        };
    OutwardCollectionsPresentationController.prototype.getAmendmentAndCollectionById = function (params, form, callback) {
        this.showProgressBar();
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.outwardCollectionsManager, 'fetchOutwardAmendmentById', [{
                    amendmentReference: params.amendmentReference || params.amendmentReference || params.transactionReference
                }]),
                this.asyncManager.asyncItem(this.outwardCollectionsManager, 'fetchOutwardCollectionsById', [{
                    collectionReference: params.collectionReference 
                }])
            ], this.getAmendmentAndCollectionByIdCallback.bind(this, form, callback));
    };
    OutwardCollectionsPresentationController.prototype.getAmendmentAndCollectionByIdCallback = function (form, callback, syncResponseObject) {
        this.hideProgressBar();
        if (syncResponseObject.isAllSuccess()) {
            this.amendmentResponse = syncResponseObject.responses[0].data;
            this.collectionResponse = syncResponseObject.responses[1].data;
            this.previousFormName = form;
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

    /**
     * Method to save outward collection record
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    OutwardCollectionsPresentationController.prototype.saveOutwardCollection = function (params, form) {
        this.showProgressBar();
        this.outwardCollectionsManager.saveOutwardCollection(params, this.saveOutwardCollectionSuccess.bind(this, form), this.saveOutwardCollectionFailure.bind(this, form));
    };

    /**
     * Success callback for save outward collection record
     * @param {object} response - consist fileId of generated file
     */
    OutwardCollectionsPresentationController.prototype.saveOutwardCollectionSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: { savedOutwardCollection: response }
        });
    };

    /**
     * Failure callback for save outward collection record
     * @param {string} frm - form name
     * @param {object} response - consist of error details
     */
    OutwardCollectionsPresentationController.prototype.saveOutwardCollectionFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    /**
     * Method to create outward collection record and saveDraweeForFutureRef
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    OutwardCollectionsPresentationController.prototype.createCollection = function (params, form) {
        const scope = this;
        this.showProgressBar();
        if (this.outwardConstants.saveDraweeForFutureRef) {
            this.outwardCollectionsManager.saveDraweeForFutureRef(this.outwardConstants.saveDraweeForFutureRefPayload, this.saveDraweeForFutureRefSuccess.bind(this, form, params), this.saveDraweeForFutureRefFailure.bind(this, form));
        } else {
            this.outwardCollectionsManager.createCollection(params, this.createCollectionSuccess.bind(this, form), this.createCollectionFailure.bind(this, form));
        }
    };

    /**
     * Success callback for Save Drawee For Future Ref
     * @param {object} response - consist fileId of generated file
     */
    OutwardCollectionsPresentationController.prototype.saveDraweeForFutureRefSuccess = function (form, createCollectionParams, response) {
        let tempDraweeAddress = JSON.parse(createCollectionParams.draweeAddress.replace(/'/g, "\""));
        let tempPayeeId = JSON.parse(response.payeeIds.replace(/'/g, "\""));
        tempDraweeAddress.payeeId = tempPayeeId;
        createCollectionParams.draweeAddress = JSON.stringify(tempDraweeAddress);
        this.outwardCollectionsManager.createCollection(createCollectionParams, this.createCollectionSuccess.bind(this, form), this.createCollectionFailure.bind(this, form));
    };

    /**
     * Failure callback for Save Drawee For Future Ref
     * @param {string} frm - form name
     * @param {object} response - consist of error details
     */
    OutwardCollectionsPresentationController.prototype.saveDraweeForFutureRefFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    /**
     * Success callback for creating outward collection record
     * @param {object} response - consist fileId of generated file
     */
    OutwardCollectionsPresentationController.prototype.createCollectionSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: { createCollection: response }
        });
    };

    /**
     * Failure callback for creating outward collection record
     * @param {string} frm - form name
     * @param {object} response - consist of error details
     */
    OutwardCollectionsPresentationController.prototype.createCollectionFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    OutwardCollectionsPresentationController.prototype.generateOutwardAmendmentsList = function(params, form) {
        this.showProgressBar();
        this.outwardCollectionsManager.generateOutwardAmendmentsList(params, this.generateOutwardAmendmentsListSuccess.bind(this), this.generateOutwardAmendmentsListFailure.bind(this, form));
    };
    /**
     * Success callback for generating the outward amendment list file
     * @param {object} response - consist fileId of generated file
     */
    OutwardCollectionsPresentationController.prototype.generateOutwardAmendmentsListSuccess = function(response) {
        this.downloadGeneratedFile(response, "Outward Amendments", "xlsx");
        this.hideProgressBar();
    };
    /**
     * Failure callback for generating the outward amendments list file
     * @param {object} response - consist of error details
     * @param {string} form - form name
     */
    OutwardCollectionsPresentationController.prototype.generateOutwardAmendmentsListFailure = function(form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
  
    /**
    * Method to create outward amendment record
    * @param {object} params - consist of payload to generate file
    * @param {string} frm - form name
    */
     OutwardCollectionsPresentationController.prototype.createAmendment = function (params, form, currentForm, collectionData) {
        this.showProgressBar();
        this.outwardCollectionsManager.createAmendment(params, this.createAmendmentSuccess.bind(this, form, collectionData), this.createAmendmentFailure.bind(this, currentForm));
    };

    /**
     * Success callback for creating outward amendment record
     * @param {object} response - consist fileId of generated file
     */
    OutwardCollectionsPresentationController.prototype.createAmendmentSuccess = function (form, collectionData, response) {
        this.hideProgressBar();
		this.showOutwardCollectionScreen({
          context: "amendmentAcknowledgement",
          form: form,
          data: {
            outwardAmendment : response,
            collectionData : collectionData
          }
        });
    };

    /**
     * Failure callback for creating outward amendment record
     * @param {string} frm - form name
     * @param {object} response - consist of error details
     */
    OutwardCollectionsPresentationController.prototype.createAmendmentFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

      /**
    * Method to update outward amendment record
    * @param {object} params - consist of payload to generate file
    * @param {string} frm - form name
    */
     OutwardCollectionsPresentationController.prototype.updateAmendment = function (params, form, currentForm, collectionData) {
        this.showProgressBar();
        this.outwardCollectionsManager.updateAmendment(params, this.updateAmendmentSuccess.bind(this, form, collectionData), this.updateAmendmentFailure.bind(this, currentForm));
    };

    /**
     * Success callback for updating outward amendment record
     * @param {object} response - consist fileId of generated file
     */
    OutwardCollectionsPresentationController.prototype.updateAmendmentSuccess = function (form, collectionData, response) {
        this.hideProgressBar();
		this.showOutwardCollectionScreen({
          context: "amendmentAcknowledgement",
          form: form,
          data: {
            outwardAmendment : response,
            collectionData : collectionData
          }
        });
    };

    /**
     * Failure callback for updating outward amendment record
     * @param {string} frm - form name
     * @param {object} response - consist of error details
     */
    OutwardCollectionsPresentationController.prototype.updateAmendmentFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };
    OutwardCollectionsPresentationController.prototype.getSwiftBicCodes = function (params, form) {
        this.showProgressBar();
        this.outwardCollectionsManager.fetchSwiftBicCodes(params, this.getSwiftBicCodesSuccess.bind(this, form), this.getSwiftBicCodesFailure.bind(this, form));
    };
    OutwardCollectionsPresentationController.prototype.getSwiftBicCodesSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: response
        });
    };
    OutwardCollectionsPresentationController.prototype.getSwiftBicCodesFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    /**
     * Method to fetch Swift Advices
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    OutwardCollectionsPresentationController.prototype.fetchSwiftsAdvices = function (params, form) {
        this.showProgressBar();
        this.outwardCollectionsManager.fetchSwiftsAdvices(params, this.fetchSwiftsAdvicesSuccess.bind(this, form), this.fetchSwiftsAdvicesFailure.bind(this, form));
    };

    /**
     * Success callback for save fetch Swift Advices
     * @param {object} response - consist fileId of generated file
     */
    OutwardCollectionsPresentationController.prototype.fetchSwiftsAdvicesSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: { fetchSwiftsAdvices: response }
        });
    };

    /**
     * Failure callback for fetch Swift Advices
     * @param {string} frm - form name
     * @param {object} response - consist of error details
     */
    OutwardCollectionsPresentationController.prototype.fetchSwiftsAdvicesFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    /**
     * Method to fetch Swift Advices
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    OutwardCollectionsPresentationController.prototype.fetchFileResponse = function (params, form) {
        this.showProgressBar();
        this.outwardCollectionsManager.fetchFileResponse(params, this.fetchFileResponseSuccess.bind(this, form), this.fetchFileResponseFailure.bind(this, form));
    };

    /**
     * Success callback for save fetch Swift Advices
     * @param {object} response - consist fileId of generated file
     */
    OutwardCollectionsPresentationController.prototype.fetchFileResponseSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: { fetchFileResponse: response }
        });
    };

    /**
     * Failure callback for fetch Swift Advices
     * @param {string} frm - form name
     * @param {object} response - consist of error details
     */
    OutwardCollectionsPresentationController.prototype.fetchFileResponseFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response
            }
        });
    };

    /**
     * Method to delete the outward collection record
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    OutwardCollectionsPresentationController.prototype.deleteCollection = function (params, form) {
        this.showProgressBar();
        this.outwardCollectionsManager.deleteCollection(params, this.deleteCollectionSuccess.bind(this, form), this.deleteCollectionFailure.bind(this, form));
    };

    /**
     * Success callback for deleting the outward collection record
     * @param {object} response - consist fileId of generated file
     */
    OutwardCollectionsPresentationController.prototype.deleteCollectionSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: { deletedOutwardCollection: response }
        });
    };

    /**
     * Failure callback for deleting the outward collection record
     * @param {string} frm - form name
     * @param {object} response - consist of error details
     */
    OutwardCollectionsPresentationController.prototype.deleteCollectionFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    /**
     * Method to update the outward collection record
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    OutwardCollectionsPresentationController.prototype.updateOutwardCollection = function (params, form) {
        this.showProgressBar();
        this.outwardCollectionsManager.updateCollection(params, this.updateOutwardCollectionSuccess.bind(this, form), this.updateOutwardCollectionFailure.bind(this, form));
    };

    /**
     * Success callback for updating the outward collection record
     * @param {object} response - consist fileId of generated file
     */
    OutwardCollectionsPresentationController.prototype.updateOutwardCollectionSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: { updateOutwardCollection: response }
        });
    };

    /**
     * Failure callback for updating the outward collection record
     * @param {string} frm - form name
     * @param {object} response - consist of error details
     */
    OutwardCollectionsPresentationController.prototype.updateOutwardCollectionFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                serverError: response.errmsg || response.errorMessage
            }
        });
    };

    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @arg: err - object based on error
     * @return : NA
    */
    OutwardCollectionsPresentationController.prototype.onError = function (err) {
        let errMsg = JSON.stringify(err);
        errMsg.level = " OutwardCollectionsPresentation";
        // kony.ui.Alert(errMsg);
    };

    return OutwardCollectionsPresentationController;
});