define(["SCFUtils", "CommonUtilities"], function (SCFUtils, CommonUtilities) {
  /**
   * User defined presentation controller
   * @constructor
   * @extends kony.mvc.Presentation.BasePresenter
   */
  function PaymentAllocationPresentationController() {
    this.navigationManager = applicationManager.getNavigationManager();
    this.configurationManager = applicationManager.getConfigurationManager();
    this.formatUtilManager = applicationManager.getFormatUtilManager();
    this.userPreferencesManager = applicationManager.getUserPreferencesManager();
    this.paymentAllocationManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ 'appName': 'TradeSupplyFinMA', 'moduleName': 'PaymentAllocationManager' }).businessController;
    /**
     * Specifies the payment allocation config.
     */
    this.paymentAllocationConfig = {
      'documentFormat': ['pdf', 'jpeg', 'xls', 'csv'],
      'documentMaxSize': '25mb',
      'timePeriodFilters': {
        '7,DAY': 'Last 7 days',
        '14,DAY': 'Last 14 days',
        '1,MONTH': 'Last 1 month',
        '2,MONTH': 'Last 2 months',
        '3,MONTH': 'Last 3 months',
        '6,MONTH': 'Last 6 months',
        '12,MONTH': 'Last 12 months',
        'CUSTOM': 'Custom Date Range'
      }
    };
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(PaymentAllocationPresentationController, kony.mvc.Presentation.BasePresenter);

  /**
   * Overridden Method of kony.mvc.Presentation.BasePresenter
   * This method gets called when presentation controller gets initialized
   * @method
   */
  PaymentAllocationPresentationController.prototype.initializePresentationController = function () { };
  /**
   * Entry Point method for Anchor module.
   * @param {object} params - Contains info to load the screen.
   */
  PaymentAllocationPresentationController.prototype.loadScreenWithContext = function (params) {
    switch (params.context) {
      case 'pendingPaymentAllocation':
        params.allocater && (this.allocater = params.allocater);
        this.showView({ 'form': 'frmPendingPaymentAllocation' });
        break;
      case 'allocationDocuments':
        params.allocater && (this.allocater = params.allocater);
        this.displayMode = params.displayMode;
        this.showView({
          'form': 'frmAllocationDocuments',
          'data': {
            'allocationRecord': params.data
          }
        });
        break;
      case 'backToDashboard':
        this.showView({
          'form': this.allocater === 'anchor' ? 'frmAnchorDashboard' : 'frmCounterPartyDashboard'
        });
        break;
    }
  };
  /**
   * Shows a particular form.
   * @param {object} param0 - Contains info to load the particular form.
   */
  PaymentAllocationPresentationController.prototype.showView = function ({ appName, form, data }) {
    if (kony.application.getCurrentForm().id !== form) {
      const navObj = {
        appName: appName || 'TradeSupplyFinMA',
        friendlyName: form
      };
      this.navigationManager.navigateTo(navObj);
    }
    if (!SCFUtils.isEmptyNullOrUndefined(data)) {
      this.navigationManager.updateForm(data, form);
    }
  };
  /**
   * Shows the loading indicator.
   */
  PaymentAllocationPresentationController.prototype.showProgressBar = function () {
    this.navigationManager.updateForm({
      'isLoading': true
    });
  };
  /**
   * Hides the loading indicator.
   */
  PaymentAllocationPresentationController.prototype.hideProgressBar = function () {
    this.navigationManager.updateForm({
      'isLoading': false
    });
  };
  /**
   * Method to handle service failure
   * @param {string} form form id
   * @param {object} response contains error info
   */
  PaymentAllocationPresentationController.prototype.commonServiceFailureMethod = function ({ form, method }, response) {
    this.hideProgressBar();
    this.showView({
      form,
      'data': {
        'serverError': response.errmsg || response.errorMessage,
        method
      }
    });
  };
  /**
   * Uploads the document.
   * @param {string} attachment - Specifies the document info.
   * @param {string} form - Specifies the form id.
   */
  PaymentAllocationPresentationController.prototype.uploadDocument = function (attachment, form) {
    this.showProgressBar();
    const params = {
      'uploadedattachments': attachment
    };
    this.paymentAllocationManager.uploadDocument(params, this.uploadDocumentSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for upload document.
   * @param {string} form - Specifies the form id.
   * @param {object} response contains service response data
   */
  PaymentAllocationPresentationController.prototype.uploadDocumentSuccess = function (form, response) {
    this.hideProgressBar();
    if (response && response.LCDocuments && response.LCDocuments[0].failedUploads) {
      this.showView({
        form,
        'data': {
          'serverError': kony.i18n.getLocalizedString('i18n.payments.unableToUploadFile')
        }
      });
    } else {
      this.showView({
        form,
        'data': {
          'uploadDocument': response
        }
      });
    }
  };
  /**
   * Deletes the uploaded document.
   * @param {string} deleteParams - Specifies the document info.
   * @param {string} form - Specifies the form id.
   */
  PaymentAllocationPresentationController.prototype.deleteDocument = function (deleteParams, form) {
    this.showProgressBar();
    const params = {
      'documentReference': deleteParams
    };
    this.paymentAllocationManager.deleteDocument(params, this.deleteDocumentSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for deleting the uploaded document
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  PaymentAllocationPresentationController.prototype.deleteDocumentSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      'data': {
        'deleteDocument': response
      }
    });
  };
  /**
   * Downloads a document.
   * @param {string} docReference - Specifies document reference.
   * @param {string} form - Specifies the form id.
   */
  PaymentAllocationPresentationController.prototype.downloadDocument = function (docReference, form) {
    const downloadUrl = `${KNYMobileFabric.mainRef.config.services_meta.TradeSupplyFinance.url}/operations/TradeDocuments/downloadDocument`;
    CommonUtilities.downloadAttachment(downloadUrl, { 'fileId': docReference });
  };
  /**
   * Retrieves the payment allocations.
   * @param {string} form - Specifies the form id.
   */
  PaymentAllocationPresentationController.prototype.getPaymentAllocations = function (form) {
    this.showProgressBar();
    this.paymentAllocationManager.fetchPaymentAllocations(this.getPaymentAllocationsSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for retreiving the payment allocations.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  PaymentAllocationPresentationController.prototype.getPaymentAllocationsSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      'data': {
        'paymentAllocations': response || []
      }
    });
  };
  /**
   * Requests the payment allocation documents.
   * @param {object} data - Specifies the data.
   * @param {string} form - Specifies the form id.
   */
  PaymentAllocationPresentationController.prototype.requestDocumentation = function (data, form) {
    this.showProgressBar();
    const payload = {
      'paymentAllocationId': data.paymentAllocationId
    };
    this.paymentAllocationManager.requestDocumentation(payload, this.requestDocumentationSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for requesting the payment allocation documents.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  PaymentAllocationPresentationController.prototype.requestDocumentationSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      'data': {
        'requestDocumentation': response
      }
    });
  };
  /**
   * Submits the payment allocations documents.
   * @param {object} data - Specifies the data.
   * @param {string} form - Specifies the form id.
   */
  PaymentAllocationPresentationController.prototype.submitDocumentation = function (data, form) {
    this.showProgressBar();
    this.paymentAllocationManager.submitDocumentation(data, this.submitDocumentationSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for submitting the payment allocations documents.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  PaymentAllocationPresentationController.prototype.submitDocumentationSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      'data': {
        'submitDocumentation': response
      }
    });
  };
  return PaymentAllocationPresentationController;
});