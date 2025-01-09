define(["CommonUtilities", "SCFUtils"], function (CommonUtilities, SCFUtils) {
  /**
   * User defined presentation controller
   * @constructor
   * @extends kony.mvc.Presentation.BasePresenter
   */
  function InvoicesPresentationController() {
    this.navigationManager = applicationManager.getNavigationManager();
    this.configurationManager = applicationManager.getConfigurationManager();
    this.formatUtilManager = applicationManager.getFormatUtilManager();
    this.userPreferencesManager = applicationManager.getUserPreferencesManager();
    this.invoicesManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ 'appName': 'TradeSupplyFinMA', 'moduleName': 'InvoicesManager' }).businessController;
    /**
     * Specifies the manual invoice upload info.
     */
    this.manualInvoiceUpload = {
      'config': {
        'documentFormat': ['pdf', 'jpeg', 'png', 'tiff', 'doc', 'xls', 'csv'],
        'documentMaxSize': '25mb',
        'documentLimit': 20
      },
      'data': {}
    };
    /**
     * Specifies the bulk invoice upload info.
     */
    this.bulkInvoiceUpload = {
      'config': {
        'uploadFormat': ['xls', 'xlsx'],
        'uploadMaxSize': '25mb',
        'documentFormat': ['pdf', 'jpeg', 'png', 'tiff', 'doc', 'xls', 'csv'],
        'documentMaxSize': '25mb',
        'documentLimit': 10
      },
      'data': {}
    };
    this.fundingInvoiceStatus = {
      'Approved': 'Approved',
      'Rejected': 'Rejected',
      'PendingApproval': 'Pending Approval',
      'Draft': 'Draft'
    };
    /**
     * Mock customer ids
     */
    this.customerId = {
      '100100': 'Harry Crisp',
      '100110': 'John Hollands',
      '100112': 'Abn Amro Securities',
      '100114': 'Nomura Securities International Plc',
      '100115': 'Jp Morgan Chase'
    };
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(InvoicesPresentationController, kony.mvc.Presentation.BasePresenter);

  /**
   * Overridden Method of kony.mvc.Presentation.BasePresenter
   * This method gets called when presentation controller gets initialized
   * @method
   */
  InvoicesPresentationController.prototype.initializePresentationController = function () { };
  /**
   * Entry Point method for Anchor module.
   * @param {object} params - Contains info to load the screen.
   */
  InvoicesPresentationController.prototype.loadScreenWithContext = function (params) {
    switch (params.context) {
      case 'invoiceUpload':
        this.invoiceUploader = params.uploader;
        this.showView({ 'form': 'frmUploadInvoices' });
        break;
      case 'uploadManualInvoice':
        this.showView({ 'form': 'frmUploadManualInvoice' });
        break;
      case 'uploadBulkInvoice':
        this.bulkInvoiceUpload.data = params.data || {};
        this.showView({ 'form': 'frmUploadBulkInvoice' });
        break;
      case 'anchorDashboard':
        this.showView({
          'form': 'frmAnchorDashboard'
        });
        break;
      case 'backToDashboard':
        this.showView({
          'form': this.invoiceUploader === 'anchor' ? 'frmAnchorDashboard' : 'frmCounterPartyDashboard'
        });
        break;
    }
  };
  /**
   * Shows a particular form.
   * @param {object} param0 - Contains info to load the particular form.
   */
  InvoicesPresentationController.prototype.showView = function ({ appName, form, data }) {
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
  InvoicesPresentationController.prototype.showProgressBar = function () {
    this.navigationManager.updateForm({
      'isLoading': true
    });
  };
  /**
   * Hides the loading indicator.
   */
  InvoicesPresentationController.prototype.hideProgressBar = function () {
    this.navigationManager.updateForm({
      'isLoading': false
    });
  };
  /**
   * Method to handle service failure
   * @param {string} form form id
   * @param {object} response contains error info
   */
  InvoicesPresentationController.prototype.commonServiceFailureMethod = function ({ form, method }, response) {
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
  InvoicesPresentationController.prototype.uploadDocument = function (attachment, form) {
    this.showProgressBar();
    const params = {
      'uploadedattachments': attachment
    };
    this.invoicesManager.uploadDocument(params, this.uploadDocumentSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for upload document.
   * @param {string} form - Specifies the form id.
   * @param {object} response contains service response data
   */
  InvoicesPresentationController.prototype.uploadDocumentSuccess = function (form, response) {
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
  InvoicesPresentationController.prototype.deleteDocument = function (deleteParams, form) {
    this.showProgressBar();
    const params = {
      'documentReference': deleteParams
    };
    this.invoicesManager.deleteDocument(params, this.deleteDocumentSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for deleting the uploaded document
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  InvoicesPresentationController.prototype.deleteDocumentSuccess = function (form, response) {
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
  InvoicesPresentationController.prototype.downloadDocument = function (docReference, form) {
    const downloadUrl = `${KNYMobileFabric.mainRef.config.services_meta.TradeSupplyFinance.url}/operations/TradeDocuments/downloadDocument`;
    CommonUtilities.downloadAttachment(downloadUrl, { 'fileId': docReference });
  };
  /**
   * Method to get transformed invoice data
   * @returns {object} - Return the transformed invoice data object
   */
  InvoicesPresentationController.prototype.transformInvoiceData = function (data) {
    let transformedData = {
      'billReference': data.billReference || '',
      'billType': data.billType || '',
      'supplierId': data.supplierId || '',
      'supplierName': data.supplierName || '',
      'buyerId': data.buyerId || '',
      'buyerName': data.buyerName || '',
      'issueDate': data.issueDate ? this.formatUtilManager.getFormatedDateString(new Date(data.issueDate), 'Y-m-d') : '',
      'maturityDate': data.maturityDate ? this.formatUtilManager.getFormatedDateString(new Date(data.maturityDate), 'Y-m-d') : '',
      'invoiceCurrency': data.invoiceCurrency || '',
      'invoiceAmount': data.invoiceAmount || '',
      'invoiceDocuments': SCFUtils.isEmptyNullOrUndefined(data.invoiceDocuments) ? '' : JSON.stringify(data.invoiceDocuments),
      'invoiceReference': data.invoiceReference || ''
    };
    for (const key in transformedData) {
      if (SCFUtils.isEmptyNullOrUndefined(transformedData[key])) delete transformedData[key];
    }
    return transformedData;
  };
  /**
   * Saves an invoice.
   * @param {object} params - Specifies the invoice info.
   * @param {string} form - Specifies the form id.
   */
  InvoicesPresentationController.prototype.saveInvoice = function (params, form) {
    this.showProgressBar();
    const payload = this.transformInvoiceData(params);
    this.invoicesManager[this.invoiceUploader === 'anchor' ? 'saveAnchorInovice' : 'saveCounterpartyInovice'](payload, this.saveInvoiceSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for saving the invoice.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  InvoicesPresentationController.prototype.saveInvoiceSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      'data': {
        'saveInvoice': response
      }
    });
  };
  /**
   * Deletes the invoice.
   * @param {object} params - Specifies the invoice info.
   * @param {string} form - Specifies the form id.
   */
  InvoicesPresentationController.prototype.deleteInvoice = function (params, form) {
    this.showProgressBar();
    const payload = {
      'invoiceReference': params
    };
    this.invoicesManager[this.invoiceUploader === 'anchor' ? 'deleteAnchorInovice' : 'deleteCounterpartyInvoice'](payload, this.deleteInvoiceSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for deleting the invoice.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  InvoicesPresentationController.prototype.deleteInvoiceSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      'data': {
        'deleteInvoice': response
      }
    });
  };
  /**
   * Submits the invoices.
   * @param {object} params - Specifies the invoices info.
   * @param {string} form - Specifies the form id.
   */
  InvoicesPresentationController.prototype.submitInvoices = function (params, form) {
    this.showProgressBar();
    const payload = {
      'invoiceReferences': params
    };
    this.invoicesManager[this.invoiceUploader === 'anchor' ? 'submitAnchorInvoices' : 'submitCounterpartyInvoices'](payload, this.submitInvoicesSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for submitting the invoices.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  InvoicesPresentationController.prototype.submitInvoicesSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView({
      'form': 'frmUploadInvoices',
      'data': {
        'invoiceSuccess': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.manualInvoiceUploadSuccessMessage')
      }
    });
  };

  /**
   * Gets all funding invoices.
   */
  InvoicesPresentationController.prototype.getAllInvoices = function () {
    return new Promise((resolve, reject) => {
      Promise.all([
        new Promise((resolve, reject) => this.invoicesManager.fetchAnchorInovices(resolve, reject)),
        new Promise((resolve, reject) => this.invoicesManager.fetchCounterpartyInovices(resolve, reject)),
      ]).then(resp => {
        resolve([...resp[0].AnchorInvoices, ...resp[1].CounterPartyInvoices]);
      }).catch(error => {
        reject(error);
      })
    });
  };

  /**
   * Fetch invoice data.
   */
  InvoicesPresentationController.prototype.fetchInvoices = async function () {
    let record = [];
    const resp = await Promise.all([
      new Promise((resolve, reject) => this.invoicesManager[this.invoiceUploader === 'anchor' ? 'fetchAnchorInovices' : 'fetchCounterpartyInovices'](resolve, reject))
    ]);
    record = this.invoiceUploader === 'anchor' ? resp[0].AnchorInvoices : resp[0].CounterPartyInvoices;
    return (record && record.length > 0) ?
      record.filter(item => item.status.toLowerCase() !== 'deleted').filter(item => item.status.toLowerCase() !== 'draft') : [];
  };


  /**
   * Gets all funding Invoice data based on dashboard.
   */
  InvoicesPresentationController.prototype.fetchExistingInvoices = async function (form) {
    try {
      this.showProgressBar();
      // const resp = await Promise.all([
      //   new Promise((resolve, reject) => this.invoicesManager[this.invoiceUploader === 'anchor' ? 'fetchAnchorInovices':'fetchCounterpartyInovices'](resolve, reject))
      // ]);
      // let record = this.invoiceUploader === 'anchor' ? resp[0].AnchorInvoices : resp[0].CounterPartyInvoices;
      // let record = await this.fetchInvoices();
      let onSuccess = {};
      //We should allow user to add the deleted or draft records..
      onSuccess.existingInvoices = await this.fetchInvoices();
      this.hideProgressBar();
      this.showView({
        form,
        'data': onSuccess
      });
    } catch (response) {
      this.hideProgressBar();
      this.commonServiceFailureMethod({ from }, response);
    }
  };

  /**
   * Returns if the records contains duplicate Invoices...
   */
  InvoicesPresentationController.prototype.isDuplicateRecordPresent = function (record) {
    return record.map(item => {
      let newObj = {
        'billReference': item.billReference,
        'billType': item.billType,
        'invoiceCurrency': item.invoiceCurrency,
        'invoiceAmount': item.invoiceAmount
      };
      return JSON.stringify(newObj);
    }).filter((item, index, list) => (list.indexOf(item) !== index));
  };

  /**
   * Gets filtered funding invoices.
   * @param {string} form - Specifies the form id.
   * @param {boolean} isPendingOnly it indicates if only pending invoices should be returned
   */
  InvoicesPresentationController.prototype.getFilteredInvoices = async function (form, isPendingOnly) {
    try {
      const resp = await this.getAllInvoices();
      resp.forEach(invoice =>
        invoice['modificationDate'] = invoice.updatedDate ? invoice.updatedDate : invoice.createdDate
      )
      let filteredInvoices = [];
      if (isPendingOnly !== undefined) {
        filteredInvoices = resp.filter(item => (isPendingOnly ?
          (item.status.toLowerCase().startsWith("pending")) :
          (item.status.toLowerCase() === this.fundingInvoiceStatus.Approved.toLowerCase() || item.status.toLowerCase() === this.fundingInvoiceStatus.Rejected.toLowerCase()))
        );
      } else {
        filteredInvoices = resp.filter(item =>
        (item.status.toLowerCase().startsWith("pending") ||
          item.status.toLowerCase() === this.fundingInvoiceStatus.Approved.toLowerCase() ||
          item.status.toLowerCase() === this.fundingInvoiceStatus.Rejected.toLowerCase())
        );
      }
      let invoicesData = {};
      if (isPendingOnly !== undefined) {
        isPendingOnly ? (invoicesData = { 'pendingInvoices': filteredInvoices }) :
          (invoicesData = { 'filteredInvoices': filteredInvoices });
      } else {
        invoicesData = { 'allInvoices': filteredInvoices };
      }
      this.showView({
        form,
        'data': invoicesData
      });
    } catch (error) {
      this.commonServiceFailureMethod({ form }, error);
    }
  };
  /**
   * Downloads sample file
   * @param {string} form - Specifies the form id.
   */
  InvoicesPresentationController.prototype.downloadBulkInvoiceSampleFile = function (form) {
    try {
      const downloadUrl = `${KNYMobileFabric.mainRef.config.services_meta.TradeSupplyFinance.url}/operations/${this.invoiceUploader === 'anchor' ? 'AnchorFundingInvoices' : 'CounterPartyFundingInvoices'}/DownloadSampleXlsx`;
      CommonUtilities.downloadAttachment(downloadUrl);
    } catch (err) {
      this.showView({
        form,
        'data': {
          'serverError': err
        }
      });
    }
  };
  /**
   * Validates the invoices.
   * @param {string} form - Specififes the form id.
   */
  InvoicesPresentationController.prototype.validateInvoices = function (form) {
    const coreCustomerID = this.userPreferencesManager.getBackendIdentifier(),
      scfConfig = scope_configManager.SCF_INVOICE_UPLOAD_CONFIG || {},
      invoices = this.bulkInvoiceUpload.data.invoices;
    let inoviceConfig = {
      'billType': scfConfig.BILL_TYPE || [],
      'currency': scfConfig.CURRENCY || [],
      'customerId': [coreCustomerID].concat(Object.keys(this.customerId))
    };
    let invoiceErrors = {};
    const isSameCurrency = invoices.every(({ invoiceCurrency }) => invoiceCurrency === invoices[0].invoiceCurrency);
    for (const invoice of invoices) {
      let errors = [];
      if (!/^[a-zA-Z0-9]+$/.test(invoice.billReference)) {
        errors.push('The Bill Reference should be alphanumeric value.');
      }
      if (!inoviceConfig.billType.includes(invoice.billType)) {
        errors.push('The Bill Type is invalid.');
      }
      if (!inoviceConfig.customerId.includes(invoice.supplierId)) {
        errors.push('The Supplier ID is invalid.');
      }
      if (!inoviceConfig.customerId.includes(invoice.buyerId)) {
        errors.push('The Buyer ID is invalid.');
      }
      if (invoice.supplierId === invoice.buyerId) {
        errors.push('The Supplier ID and Buyer ID cannot be identical.');
      }
      if (invoice.supplierId !== inoviceConfig.customerId[0] && invoice.buyerId !== inoviceConfig.customerId[0]) {
        errors.push('Either the Supplier ID or the Buyer ID must belong to the logged-in customer.');
      }
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(invoice.issueDate)) {
        errors.push('The Issue Date should follow the DD/MM/YYYY format.');
      } else if (!SCFUtils.isValidDate(invoice.issueDate, 'DD/MM/YYYY')) {
        errors.push('The Issue Date is invalid.');
      }
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(invoice.maturityDate)) {
        errors.push('The Maturity Date should follow the DD/MM/YYYY format.');
      } else if (!SCFUtils.isValidDate(invoice.maturityDate, 'DD/MM/YYYY')) {
        errors.push('The Maturity Date is invalid.');
      }
      if (invoice.issueDate && invoice.maturityDate && new Date(invoice.maturityDate) <= new Date(invoice.issueDate)) {
        errors.push('The Maturity Date cannot be earlier than or equal to the Issue Date.');
      }
      if (!inoviceConfig.currency.includes(invoice.invoiceCurrency)) {
        errors.push(`The Currency is invalid${!isSameCurrency ? ' and must be unique across all invoices' : ''}.`);
      } else if (!isSameCurrency) {
        errors.push('The Currency must be unique across all invoices.');
      }
      if (!/^\d+(\.\d{1,2})?$/.test(invoice.invoiceAmount)) {
        errors.push('The Amount should be a numeric value with upto two decimal places.');
      }
      if (errors.length) {
        invoiceErrors[invoice.billReference] = errors;
        invoice['isValid'] = false;
      } else {
        invoice['isValid'] = true;
      }
    }
    let validationErrors = '', i = 1;
    for (const key in invoiceErrors) {
      validationErrors += `${i++}. Bill Reference: ${key}\n`;
      const errors = invoiceErrors[key];
      validationErrors += `${''.padStart(3)}Error: ${errors[0]}\n`;
      errors.shift();
      errors.forEach(e => validationErrors += `${''.padStart(10)}${e}\n`);
    }
    //Logic to check for duplicates present or not...
    let duplicatesRecord = this.isDuplicateRecordPresent([...this.existingInvoices, ...invoices]).map(item => JSON.parse(item).billReference);
    if (duplicatesRecord.length > 0) {
      invoices.forEach(item => {
        if (duplicatesRecord.includes(item.billReference)) {
          item['isValid'] = (duplicatesRecord.includes(item.billReference)) ? false : true;
          validationErrors += `${i++}. Bill Reference: ${item.billReference}\n`;
          validationErrors += `${''.padStart(3)}Error: Duplicate Invoice Record present, Please Try Again !\n`;
        }
      });
    }
    this.bulkInvoiceUpload.data['validationErrors'] = validationErrors;
    this.showView({
      form,
      'data': {
        'validation': true
      }
    });
  };

  /**
   *  updatePendingInvoices Statue to Approve or reject
   * @param {Array} params - Specifies the records.
   * @param {object} flow - Specifies the criteria.
   * @returns {Array} - Result array.
   */
  InvoicesPresentationController.prototype.updatePendingInvoicesStatus = function (records, flow, form) {
    this.showProgressBar();
    const payload = {
      'invoiceReferences': records
    };
    Promise.all([
      new Promise((resolve, reject) => this.invoicesManager[flow === 'Approve' ? 'approvePendingInvoices' : 'rejectPendingInvoices'](payload, resolve, reject))
    ]).then(async (resp) => {
      //backend-call successful...
      let onSucess = {};
      const allInvoices = await this.getAllInvoices();
      this.hideProgressBar();
      onSucess[flow === 'Approve' ? 'onInvoicesApprove' : 'onInvoicesReject'] = allInvoices.filter(item => (item.status.toLowerCase().startsWith("pending")));
      this.showView({
        form,
        'data': onSucess
      });
    }).catch(error => {
      //backend-call failure....
      this.hideProgressBar();
      this.showView({
        form,
        'data': {
          'serverError': error || 'Internal Error',
        }

      })
    })
  };

  /**
   * Downloads multiple documents.
   * @param {Object} invoiceDocs - Specifies documents ref details
   * @param {string} form - Specifies the form id.
   */
  InvoicesPresentationController.prototype.downloadMultipleDocuments = function (invoiceDocs, form) {
    const downloadUrl = `${KNYMobileFabric.mainRef.config.services_meta.TradeSupplyFinance.url}/operations/TradeDocuments/downloadDocument`;
    let requestParamsArr = [];
    invoiceDocs.forEach(doc => {
      let requestParamObj = {
        'fileId': doc.documentReference,
        'fileName': doc.documentName
      };
      requestParamsArr.push(requestParamObj);
    })
    CommonUtilities.downloadMultipleAttachments(downloadUrl, requestParamsArr);
  };
  /**
   * Parses the bulk invoice file.
   * @param {object} params - Specifies the file info.
   * @param {string} form - Specifies the form id.
   */
  InvoicesPresentationController.prototype.parseBulkInoviceFile = function (params, form) {
    this.showProgressBar();
    const payload = {
      'base64Input': params.fileContents
    };
    this.invoicesManager[this.invoiceUploader === 'anchor' ? 'parseAnchorBulkInvoiceFile' : 'parseCounterpartyBulkInvoiceFile'](payload, this.parseBulkInoviceFileSucess.bind(this, params, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for parsing the bulk invoice file.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  InvoicesPresentationController.prototype.parseBulkInoviceFileSucess = async function (params, form, response) {
    this.existingInvoices = await this.fetchInvoices();
    this.hideProgressBar();
    this.bulkInvoiceUpload.data = {
      'fileName': params.fileName,
      'fileSize': params.fileSize,
      'invoices': response.BulkInvoices
    };
    this.showView({
      'form': 'frmUploadBulkInvoice',
      'data': {
        'showDetails': true
      }
    });
  };
  /**
   * Method to get transformed bulk invoice data
   * @returns {object} - Return the transformed bulk invoice data object
   */
  InvoicesPresentationController.prototype.transformBulkInvoiceData = function (records) {
    const userObj = this.userPreferencesManager.getUserObj(),
      coreCustomerID = this.userPreferencesManager.getBackendIdentifier();
    const customerIds = Object.assign({ [coreCustomerID]: [userObj.userfirstname, userObj.userlastname].join(' ') }, this.customerId);
    let transformedData = [];
    records.forEach(record => {
      transformedData.push({
        'billReference': record.billReference || '',
        'billType': record.billType || '',
        'supplierId': record.supplierId || '',
        'supplierName': customerIds[record.supplierId] || '',
        'buyerId': record.buyerId || '',
        'buyerName': customerIds[record.buyerId] || '',
        'issueDate': record.issueDate ? this.formatUtilManager.getFormatedDateString(SCFUtils.getDateObjectFromDateString(record.issueDate, 'd/m/y'), 'Y-m-d') : '',
        'maturityDate': record.maturityDate ? this.formatUtilManager.getFormatedDateString(SCFUtils.getDateObjectFromDateString(record.maturityDate, 'd/m/y'), 'Y-m-d') : '',
        'invoiceCurrency': record.invoiceCurrency || '',
        'invoiceAmount': record.invoiceAmount || ''
      });
    });
    return transformedData;
  };
  /**
   * Submits the bulk invoices.
   * @param {string} form - Specifies the form id.
   */
  InvoicesPresentationController.prototype.submitBulkInvoices = function (form) {
    this.showProgressBar();
    const payload = {
      'invoices': this.transformBulkInvoiceData(this.bulkInvoiceUpload.data.invoices),
      'invoiceDocuments': this.bulkInvoiceUpload.data.invoiceDocuments || []
    };
    this.invoicesManager[this.invoiceUploader === 'anchor' ? 'createBulkAnchorInvoices' : 'createBulkCounterpartyInvoices'](payload, this.submitBulkInvoicesSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for submitting bulk invoices.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  InvoicesPresentationController.prototype.submitBulkInvoicesSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView({
      'form': 'frmUploadInvoices',
      'data': {
        'invoiceSuccess': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.bulkInvoiceUploadSuccessMessage')
      }
    });
  };

  return InvoicesPresentationController;
});