define(['CommonUtilities', 'OLBConstants'], function (CommonUtilities, OLBConstants) {
    let NA = kony.i18n.getLocalizedString("i18n.common.NA");
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function InwardCollectionsPresentationController() {
        this.navigationManager = applicationManager.getNavigationManager();
        this.inwardCollectionsManager = applicationManager.getInwardCollectionsManager();
        this.asyncManager = applicationManager.getAsyncManager();
        this.collectionData = {};
        this.amendmentData = {};
        this.collectionsConfig = {
            'currencies': {
                'USD': 'USD',
                'EUR': 'EUR'
            },
        };
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
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(InwardCollectionsPresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    InwardCollectionsPresentationController.prototype.initializePresentationController = function () {

    };

    /**
     * Entry Point method for Inward Collection module
     * @param {object} context - contains info to load the screen
     */
    InwardCollectionsPresentationController.prototype.showInwardCollectionScreen = function (params) {
        switch (params.context) {
            case 'viewAmendmentDetails':
                this.getInwardCollectionAndAmendmentById(params.data, params.form, this.showView.bind(this, { form: 'frmInwardCollectionAmendmentViewDetails' }));
                break;
            case 'viewCollectionDetails':
                this.getInwardCollectionsById(params.data, params.form, this.showView.bind(this, { form: 'frmInwardCollectionsViewDetails' }));
                break;
        }
    };
    /**
     * Method to show a particular form
     * @param {object} param0 - contains info to load the particular form
     */
    InwardCollectionsPresentationController.prototype.showView = function ({ appName, form, data }) {
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
    InwardCollectionsPresentationController.prototype.isEmptyNullOrUndefined = function (data) {
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
    InwardCollectionsPresentationController.prototype.showProgressBar = function () {
        this.navigationManager.updateForm({
            isLoading: true
        });
    };
    /**
     * Method to hide the loading indicator
     */
    InwardCollectionsPresentationController.prototype.hideProgressBar = function () {
        this.navigationManager.updateForm({
            isLoading: false
        });
    };

    /**
     * @api : renderI18nKeys
     * Rendering 
     * @return : NA
     */
    InwardCollectionsPresentationController.prototype.renderI18nKeys = function (i18nKeyString, renderColon) {
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

    InwardCollectionsPresentationController.prototype.showMessagesScreen = function (params) {
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
        messagesPresenter.showAlertsPage("Trade Finance InwardCollections", contextObj);
    };

    /**
     * @api : getDynamicData
     * Returning the dynamic data based on input parameter
     * @arg1 : response - Service response to capture the value
     * @arg2 : key - input key to get the value
     * @return : objValue - Value based on provided input key
     */
    InwardCollectionsPresentationController.prototype.getDynamicData = function (response, key) {
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
    InwardCollectionsPresentationController.prototype.getConvertedDate = function (response, key) {
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
    InwardCollectionsPresentationController.prototype.getConvertedCurrency = function (response, currencyKey) {
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

    InwardCollectionsPresentationController.prototype.getInwardCollections = function (params, form) {
        this.showProgressBar();
        this.inwardCollectionsManager.fetchInwardCollections(params, this.getInwardCollectionsSuccess.bind(this, form), this.getInwardCollectionsFailure.bind(this, form));
    };
    InwardCollectionsPresentationController.prototype.getInwardCollectionsSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: Array.isArray(response) ? { InwardCollections: response } : response
        });
    };
    InwardCollectionsPresentationController.prototype.getInwardCollectionsFailure = function (form, response) {
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
  InwardCollectionsPresentationController.prototype.getInwardCollectionsById = function (params, form, callback) {
    this.showProgressBar();
    this.inwardCollectionsManager.fetchInwardCollectionsById(params, this.getInwardCollectionsByIdSuccess.bind(this, form, callback), this.getInwardCollectionsByIdFailure.bind(this, form));
  };
  /**
     * Success callback for get Collections record by ID
     * @param {object} response - consist records
     */
    InwardCollectionsPresentationController.prototype.getInwardCollectionsByIdSuccess = function (form, callback, response) {
        this.hideProgressBar();
        this.collectionData = response;
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
  InwardCollectionsPresentationController.prototype.getInwardCollectionsByIdFailure = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      data: {
        serverError: response.errmsg || response.errorMessage
      }
    });
  };
  
    InwardCollectionsPresentationController.prototype.downloadGeneratedFile = function (response, fileName, fileType) {
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
     * Method to generate the Inward Collections pdf file
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    InwardCollectionsPresentationController.prototype.generateInwardCollections = function (params, frm) {
        this.showProgressBar();
        this.inwardCollectionsManager.generateInwardCollections(params, this.generateInwardCollectionsSuccess.bind(this), this.generateInwardCollectionsFailure.bind(this, frm));
    };
    /**
       * Success callback for generating the Inward Collections pdf file
       * @param {object} response - consist fileId of generated file
       */
    InwardCollectionsPresentationController.prototype.generateInwardCollectionsSuccess = function (response) {
        this.downloadGeneratedFile(response, "Inward Collection", "pdf");
        this.hideProgressBar();
    };
    /**
       * Failure callback for generating the Inward Collections pdf file
       * @param {onject} response - consist of error details
       * @param {string} frm - form name
       */
    InwardCollectionsPresentationController.prototype.generateInwardCollectionsFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };

     /**
     * Method to generate the Inward Collections list file
     * @param {object} params - consist of payload to generate file
     * @param {string} form - form name
     */
    InwardCollectionsPresentationController.prototype.generateInwardCollectionsList = function (params, form) {
        this.showProgressBar();
        this.inwardCollectionsManager.generateInwardCollectionsList(params, this.generateInwardCollectionsListSuccess.bind(this), this.generateInwardCollectionsListFailure.bind(this, form));
    };
    /**
    * Success callback for generating the inward collections list file
    * @param {object} response - consist fileId of generated file
    */
    InwardCollectionsPresentationController.prototype.generateInwardCollectionsListSuccess = function (response) {
        this.downloadGeneratedFile(response, "Inward Collection", "xlsx");
        this.hideProgressBar();
    };
    /**
    * Failure callback for generating the inward collections list file
    * @param {object} response - consist of error details
    * @param {string} form - form name
    */
    InwardCollectionsPresentationController.prototype.generateInwardCollectionsListFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };

    InwardCollectionsPresentationController.prototype.getInwardAmendments = function (params, form) {
        this.showProgressBar();
        this.inwardCollectionsManager.fetchInwardAmendments(params, this.getInwardAmendmentsSuccess.bind(this, form), this.getInwardAmendmentsFailure.bind(this, form));
    };

    InwardCollectionsPresentationController.prototype.getInwardAmendmentsSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: Array.isArray(response) ? { ImwardAmendments: response } : response
        });
    };

    InwardCollectionsPresentationController.prototype.getInwardAmendmentsFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                amendmentsListServerError: response.errmsg || response.errorMessage
            }
        });
    };

   /**
    * Method to get amendment record by ID
    * @param {object} params - consist of payload to get collections
    * @param {string} frm - form name
    */
    InwardCollectionsPresentationController.prototype.getInwardAmendmentsById = function (params, form) {
        this.showProgressBar();
        this.inwardCollectionsManager.fetchInwardAmendmentsById(params, this.getInwardAmendmentsByIdSuccess.bind(this, form), this.getInwardAmendmentsByIdFailure.bind(this, form));
    };
  
   /**
    * Success callback for get amendment record by ID
    * @param {object} response - consist records
    */
    InwardCollectionsPresentationController.prototype.getInwardAmendmentsByIdSuccess = function (form, response) {
        this.hideProgressBar();
        this.showView({
        form,
        data: response
    });
  };
  /**
    * Failure callback for get amendment record by ID
    * @param {onject} response - consist of error details
    * @param {string} frm - form name
    */
    InwardCollectionsPresentationController.prototype.getInwardAmendmentsByIdFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
        form,
        data: {
            serverError: response.errmsg || response.errorMessage
        }
    });
  };
  
    /**
     * Method to generate the Inward amendmentt pdf file
     * @param {object} params - consist of payload to generate file
     * @param {string} frm - form name
     */
    InwardCollectionsPresentationController.prototype.generateInwardAmendment = function (params, frm) {
        this.showProgressBar();
        this.inwardCollectionsManager.generateInwardAmendment(params, this.generateInwardAmendmentSuccess.bind(this), this.generateInwardAmendmentFailure.bind(this, frm));
    };
    /**
       * Success callback for generating the Inward amendment pdf file
       * @param {object} response - consist fileId of generated file
       */
    InwardCollectionsPresentationController.prototype.generateInwardAmendmentSuccess = function (response) {
        this.downloadGeneratedFile(response, "Inward Collection Amendment", "pdf");
        this.hideProgressBar();
    };
    /**
       * Failure callback for generating the Inward amendment pdf file
       * @param {onject} response - consist of error details
       * @param {string} frm - form name
       */
    InwardCollectionsPresentationController.prototype.generateInwardAmendmentFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
            form,
            data: {
                "serverError": response.errmsg || response.errorMessage
            }
        });
    };
  
  /**
    * Method to generate the Inward amendment list file
    * @param {object} params - consist of payload to generate file
    * @param {string} form - form name
    */
    InwardCollectionsPresentationController.prototype.generateInwardAmendmentsList = function (params, form) {
        this.showProgressBar();
        this.inwardCollectionsManager.generateInwardAmendmentsList(params, this.generateInwardAmendmentsListSuccess.bind(this), this.generateInwardAmendmentsListFailure.bind(this, form));
    };
  /**
    * Success callback for generating the inward amendment list file
    * @param {object} response - consist fileId of generated file
    */
    InwardCollectionsPresentationController.prototype.generateInwardAmendmentsListSuccess = function (response) {
        this.downloadGeneratedFile(response, "Inward Collection Amendment", "xlsx");
        this.hideProgressBar();
    };
  /**
    * Failure callback for generating the inward amendments list file
    * @param {object} response - consist of error details
    * @param {string} form - form name
    */
     InwardCollectionsPresentationController.prototype.generateInwardAmendmentsListFailure = function (form, response) {
        this.hideProgressBar();
        this.showView({
        form,
        data: {
            "serverError": response.errmsg || response.errorMessage
        }
    });
  };

    /**
     * Method to Accept/Reject the Amendment
     */
    InwardCollectionsPresentationController.prototype.updateInwardCollectionAmendment = function (params, frm) {
        this.showProgressBar();
        applicationManager.getInwardCollectionsManager().updateInwardCollectionAmendment(params, this.updateInwardCollectionAmendmentSuccess.bind(this, frm), this.updateInwardCollectionAmendmentError.bind(this, frm));
    };
    /**
     * Method to execute after success call back of Accept/Reject the Amendment
     */
    InwardCollectionsPresentationController.prototype.updateInwardCollectionAmendmentSuccess = function (frm, response) {
        this.hideProgressBar();
        this.showView({
            form: frm,
            data: { updateInwardCollectionAmendment: response }
        });
    };
    /**
     * Method to execute after error call back of Accept/Reject the Amendment
     */
    InwardCollectionsPresentationController.prototype.updateInwardCollectionAmendmentError = function (frm, response) {
        this.hideProgressBar();
        this.showView(frm, {
            "serverError": response.errmsg || response.errorMessage
        });
    };
  
  /**
     * Method to execute for update Collection
     */
  InwardCollectionsPresentationController.prototype.UpdateInwardCollections = function (params, form) {
    this.showProgressBar();
    this.inwardCollectionsManager.updateInwardCollections(params, this.UpdateInwardCollectionsSuccess.bind(this, form), this.UpdateInwardCollectionsFailure.bind(this, form));
  };
  /**
     * Method to execute after success call back of update Collection
     */
  InwardCollectionsPresentationController.prototype.UpdateInwardCollectionsSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      data: {
        UpdateInwardCollection: response
      }
    });
  };
  /**
     * Method to execute after error call back of update Collection
     */
  InwardCollectionsPresentationController.prototype.UpdateInwardCollectionsFailure = function (form, response) {
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
     InwardCollectionsPresentationController.prototype.calculateMaturityDate = function (maturityDate) {
        if (!maturityDate) return;
        const diff = Math.round((Date.parse(maturityDate) - Date.parse(new Date())) / 86400000);
        let tempConst = OLBConstants.INWARD_COLLECTION_AMENDMENTS_MATURITY_DATE_CONST;
        return {
            daysLeft: diff > tempConst.LIMIT_ONE ? `${diff} ${kony.i18n.getLocalizedString('i18n.ProfileManagement.daysLeft')}` : kony.i18n.getLocalizedString('i18n.AccountSummary.overdue'),
            imageToLoad: diff >= tempConst.LIMIT_THREE ? 'days_left_green.png' : (diff >= tempConst.LIMIT_TWO) ? 'inprogress.png' : 'days_left_red.png',
            daysLeftToPay: diff
        };
    };
    InwardCollectionsPresentationController.prototype.getInwardCollectionAndAmendmentById = function (params, form, callback) {
        this.showProgressBar();
        this.asyncManager.callAsync(
            [
                this.asyncManager.asyncItem(this.inwardCollectionsManager, 'fetchInwardCollectionsById', [{ collectionSrmsId: params.collectionSrmsId }]),
                this.asyncManager.asyncItem(this.inwardCollectionsManager, 'fetchInwardAmendmentsById', [{ amendmentSrmsId: params.amendmentSrmsId }])
            ],
            this.getInwardCollectionAndAmendmentByIdCallback.bind(this, form, callback)
        );
    };
    InwardCollectionsPresentationController.prototype.getInwardCollectionAndAmendmentByIdCallback = function (form, callback, syncResponseObject) {
        this.hideProgressBar();
        if (syncResponseObject.isAllSuccess()) {
            this.collectionData = syncResponseObject.responses[0].data;
            this.amendmentData = syncResponseObject.responses[1].data;
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
        errMsg.level = "InwardCollectionsPresentation";
        // kony.ui.Alert(errMsg);
    };

    return InwardCollectionsPresentationController;
});