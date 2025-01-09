define([], function () {
  /**
   * User defined business controller
   * @constructor
   * @extends kony.mvc.Business.Delegator
   */
  function InvoicesBusinessManager() {
    try {
      this.serviceResponseHandler = applicationManager.getServiceResponseHandler();
      this.tradeDocumentsModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("TradeDocuments");
      this.anchorFundingInvoicesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("AnchorFundingInvoices");
      this.counterPartyFundingInvoicesModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CounterPartyFundingInvoices");
    } catch (e) { }
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(InvoicesBusinessManager, kony.mvc.Business.Delegator);

  /**
   * Fetches the anchor invoices.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.fetchAnchorInovices = function (successCallback, errorCallback) {
    this.anchorFundingInvoicesModel.customVerb('GetAll', {}, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Saves the anchor invoice.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.saveAnchorInovice = function (params, successCallback, errorCallback) {
    this.anchorFundingInvoicesModel.customVerb('Save', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Deletes the anchor invoice.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.deleteAnchorInovice = function (params, successCallback, errorCallback) {
    this.anchorFundingInvoicesModel.customVerb('delete', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Fetches the counterparty invoices.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.fetchCounterpartyInovices = function (successCallback, errorCallback) {
    this.counterPartyFundingInvoicesModel.customVerb('GetAll', {}, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Save the counterparty invoice.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.saveCounterpartyInovice = function (params, successCallback, errorCallback) {
    this.counterPartyFundingInvoicesModel.customVerb('Save', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Delete the counterparty invoice.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.deleteCounterpartyInvoice = function (params, successCallback, errorCallback) {
    this.counterPartyFundingInvoicesModel.customVerb('delete', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Uploads the document.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.uploadDocument = function (params, successCallback, errorCallback) {
    this.tradeDocumentsModel.customVerb('uploadDocument', params, getAllCompletionCallback.bind(this));
    function getAllCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Deletes the uploaded document.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.deleteDocument = function (params, successCallback, errorCallback) {
    this.tradeDocumentsModel.customVerb('deleteDocument', params, getAllCompletionCallback.bind(this));
    function getAllCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Submits the anchor invoices.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.submitAnchorInvoices = function (params, successCallback, errorCallback) {
    this.anchorFundingInvoicesModel.customVerb('SubmitAll', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Submits the counterparty invoices.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.submitCounterpartyInvoices = function (params, successCallback, errorCallback) {
    this.counterPartyFundingInvoicesModel.customVerb('SubmitAll', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };

  /**
   * Approves the anchor invoices.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.approvePendingInvoices = function (params, successCallback, errorCallback) {
    this.anchorFundingInvoicesModel.customVerb('Approve', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };

  /**
   * Rejects the anchor invoices.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.rejectPendingInvoices = function (params, successCallback, errorCallback) {
    this.anchorFundingInvoicesModel.customVerb('Reject', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Parses the anchor bulk invoices file.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.parseAnchorBulkInvoiceFile = function (params, successCallback, errorCallback) {
    this.anchorFundingInvoicesModel.customVerb('ParseBulkUploadedXlsx', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Parses the counterparty bulk invoices file.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.parseCounterpartyBulkInvoiceFile = function (params, successCallback, errorCallback) {
    this.counterPartyFundingInvoicesModel.customVerb('ParseBulkUploadedXlsx', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Creates the bulk anchor invoices.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.createBulkAnchorInvoices = function (params, successCallback, errorCallback) {
    this.anchorFundingInvoicesModel.customVerb('CreateBulkInvoices', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Creates the bulk counterparty invoices.
   * @param {Object} params - Specifies request parameters.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.createBulkCounterpartyInvoices = function (params, successCallback, errorCallback) {
    this.counterPartyFundingInvoicesModel.customVerb('CreateBulkInvoices', params, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  /**
   * Fetches the live anchor invoices.
   * @param {function} successCallback - Invokes the call back with success response.
   * @param {function} errorCallback - Invokes the call back with error response.
   */
  InvoicesBusinessManager.prototype.fetchLiveAnchorInvoices = function (successCallback, errorCallback) {
    this.anchorFundingInvoicesModel.customVerb('GetLiveInvoices', {}, getCompletionCallback.bind(this));
    function getCompletionCallback(status, data, error) {
      const obj = this.serviceResponseHandler.manageResponse(status, data, error);
      if (obj.status === true) {
        successCallback(obj.data);
      } else {
        errorCallback(obj.errmsg);
      }
    }
  };
  return InvoicesBusinessManager;
});