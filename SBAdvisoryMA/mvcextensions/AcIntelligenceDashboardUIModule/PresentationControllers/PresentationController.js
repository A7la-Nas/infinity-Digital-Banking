define(['CommonUtilities', 'OLBConstants'], function (CommonUtilities, OLBConstants) {
  /**
   * User defined presentation controller
   * @constructor
   * @extends kony.mvc.Presentation.BasePresenter
   */
  function AcIntelligenceDashboardPresentationController() {
    this.SBAReceivablePayableSummary = "frmReceivablePayableSummary";
    this.SBAReceivablePayableOverdue = "frmReceivablePayableOverdue";
    this.SBAReceivablePayablePayment = "frmReceivablePayablePayment";
    this.SBAReceivablePayableUpcoming = "frmReceivablePayableUpcoming";
    this.SBAReceivablePayableByCustomer = "frmReceivablePayableByCustomer";
    this.Receivables = "Receivable";
    this.Payables = "Payable";
    this.navigationManager = applicationManager.getNavigationManager();
    this.receivableSummaryData = {};
    this.receivablePayableData = {};
    this.AcIntelligenceDashboardManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      moduleName: 'AcIntelligenceDashboardManager',
      appName: 'SBAdvisoryMA'
    }).businessController;
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(AcIntelligenceDashboardPresentationController, kony.mvc.Presentation.BasePresenter);

  /**
   * Overridden Method of kony.mvc.Presentation.BasePresenter
   * This method gets called when presentation controller gets initialized
   * @method
   */
  AcIntelligenceDashboardPresentationController.prototype.initializePresentationController = function () {

  };

  /**
  * Method to handle all navigations for Smart Banking Advisory
  * @param {object} param - form context
  */
  AcIntelligenceDashboardPresentationController.prototype.navigateToScreens = function (param, data) {
    let navObj = {
      appName: 'SBAdvisoryMA',
    };
    switch (param) {

      case 'SBAReceivablePayableSummary':
        navObj.friendlyName = this.SBAReceivablePayableSummary;
        this.navigationManager.navigateTo(navObj, false, data);
        break;
      case 'SBAReceivablePayableOverdue':
        navObj.friendlyName = this.SBAReceivablePayableOverdue;
        this.navigationManager.navigateTo(navObj, false, data);
        break;
      case 'SBAReceivablePayablePayment':
        navObj.friendlyName = this.SBAReceivablePayablePayment;
        this.navigationManager.navigateTo(navObj, false, data);
        break;
      case 'SBAReceivablePayableUpcoming':
        navObj.friendlyName = this.SBAReceivablePayableUpcoming;
        this.navigationManager.navigateTo(navObj, false, data);
        break;
      case 'SBAReceivablePayableByCustomer':
        navObj.friendlyName = this.SBAReceivablePayableByCustomer;
        this.navigationManager.navigateTo(navObj, false, data);
        break;
    }
  };

  /**
   * Method to handle tab UI and navigations for Smart Banking Advisory
   * @param {object} param - form context
   */
  AcIntelligenceDashboardPresentationController.prototype.setTabsFunctionality = function (selectedBtn, btnUnSelected1, btnUnSelected2, formId, data) {
    selectedBtn.skin = "sknBtnAccountSummarySelectedmod";
    btnUnSelected1.skin = "sknBtnAccountSummaryUnselectedTransferFocus";
    btnUnSelected2.skin = "sknBtnAccountSummaryUnselectedTransferFocus";
    if (formId) {
      this.navigateToScreens(formId, data);
    }
  };

  /**
 * Method to handle Options UI and navigations for Smart Banking Advisory
 * @param {object} param - form context
 */
  AcIntelligenceDashboardPresentationController.prototype.setOptionsUIFunctionality = function (selectedOpt, optUnSelected1, optUnSelected2, optUnSelected3, optUnSelected4, formId, data) {
    selectedOpt.skin = "ICSknBtn293276Bge5e6ef";
    optUnSelected1.skin = "ICSknBtn424242Bordere3e3e3";
    optUnSelected2.skin = "ICSknBtn424242Bordere3e3e3";
    optUnSelected3.skin = "ICSknBtn424242Bordere3e3e3";
    optUnSelected4.skin = "ICSknBtn424242Bordere3e3e3";
    if (formId) {
      this.navigateToScreens(formId, data);
    }
  };

  /* Method to show cursor as pointer
   * @param {Array} widgetRef - form name
   * @returns : NA
   */
  AcIntelligenceDashboardPresentationController.prototype.cursorTypePointer = function (widgetRef) {
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

  /**
 * Method to get Receivables data
 * @param {object} params - consist of payload to get Accounting Receivables
 * @param {string} frm - form name
 */
  AcIntelligenceDashboardPresentationController.prototype.getReceivables = function (params, form, callback) {
    this.showProgressBar();
    this.AcIntelligenceDashboardManager.fetchReceivables(params, this.getReceivablesSuccess.bind(this, form, callback), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
   * Success callback for get Receivables
   * @param {object} response - consist records
   */
  AcIntelligenceDashboardPresentationController.prototype.getReceivablesSuccess = function (form, callback, response) {
    this.hideProgressBar();
    if (callback && typeof callback === 'function') {
      callback();
    } else {
      this.showView({
        form,
        data: {
          Receivables: response.value
        }
      });
    }
  };

  /**
   * Method to handle service failure
   * @param {string} form form id
   * @param {object} response contains error info
   */
  AcIntelligenceDashboardPresentationController.prototype.commonServiceFailureMethod = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      data: {
        errResponse: response,
      }
    });
  };

  /**
  * Method to show the loading indicator
  */
  AcIntelligenceDashboardPresentationController.prototype.showProgressBar = function () {
    this.navigationManager.updateForm({
      isLoading: true
    });
  };

  /**
   * Method to hide the loading indicator
   */
  AcIntelligenceDashboardPresentationController.prototype.hideProgressBar = function () {
    this.navigationManager.updateForm({
      isLoading: false
    });
  };

  /**
* Method to show a particular form
* @param {object} param - contains info to load the particular form
*/
  AcIntelligenceDashboardPresentationController.prototype.showView = function ({
    appName,
    form,
    data
  }) {
    if (kony.application.getCurrentForm().id !== form) {
      const navObj = {
        appName: appName || 'SBAdvisoryMA',
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
  AcIntelligenceDashboardPresentationController.prototype.isEmptyNullOrUndefined = function (data) {
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
  * Method to format and append the currency symbol
  * @param {any} data - value to be verified
  * @returns {boolean} - validity of the value passed
  */
  AcIntelligenceDashboardPresentationController.prototype.formatAmount = function (data) {
    return applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data);
  };

  /**
    * Method to convert a number to percentage
    * @param {any} data - value to be formatted
    * @returns {intger} - returned as percentage format 
    */
  AcIntelligenceDashboardPresentationController.prototype.getPercentageValue = function (data) {
    return new Intl.NumberFormat('default', {
      style: 'percent',
    }).format(data / 100);
  };


    /**
    * Method to convert a Amount to Formate K
    * @param {any} data - value to be formatted
    * @returns {intger} - returned as percentage format 
    */
    AcIntelligenceDashboardPresentationController.prototype.getFormateCurrency = function(data) {
      return Number(data).toLocaleString('en', { notation: 'compact', compactDisplay: 'short' });
  };

  /**
  * Method to add the particular object property value from array of objects
  * @param {any} responseData, property - value to be added
  * @returns {integer} - returned as sum
  */
  AcIntelligenceDashboardPresentationController.prototype.addAndReturnSum = function (responseData, property) {
    return responseData.reduce((acc, data) => {
      return acc + parseInt(data[property]);
    }, 0);
  };

  /**
  * Method to sort and return top 5 values from array of objects
  * @param {any} responseData, property - value to be sorted
  * @returns {array} - returned as sorted array with top 5 values
  */
  AcIntelligenceDashboardPresentationController.prototype.sortAndReturnTop5Values = function (responseData, property) {
    responseData.sort((data1, data2) => {
      return parseInt(data1[property]) - parseInt(data2[property]);
    });
    return responseData.slice(0, 5);
  };

  /**
  * Method to get Payables data
  * @param {object} params - consist of payload to get Accounting Payables
  * @param {string} frm - form name
  */
  AcIntelligenceDashboardPresentationController.prototype.getPayables = function (params, form, callback) {
    this.showProgressBar();
    this.AcIntelligenceDashboardManager.fetchPayables(params, this.getPayablesSuccess.bind(this, form, callback), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
   * Success callback for get Payables
   * @param {object} response - consist records
   */
  AcIntelligenceDashboardPresentationController.prototype.getPayablesSuccess = function (form, callback, response) {
    this.hideProgressBar();
    if (callback && typeof callback === 'function') {
      callback();
    } else {
      this.showView({
        form,
        data: {
          Payables: response.value
        }
      });
    }
  };


  /**
   * Method to get ReceivableSummary download data
   * @param {object} params - consist of payload to get ReceivableSummary download data
   * @param {string} frm - form name
   */
  AcIntelligenceDashboardPresentationController.prototype.downloadReceivableSummary = function (form, callback) {
    this.showProgressBar();
    var params = {
      "queryParam": "Receivables",
      "modelName": "Receivables",
      "Subscriber": "Receivables",
      "topParam": "Receivables",
      "orderParam": "Receivables",
      "subTitle": "Accounts Receivable Analysis",
      "businessName": applicationManager.getSelectedSbaBusiness().coreCustomerName || applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0].coreCustomerName
    };
    this.AcIntelligenceDashboardManager.generateReceivableSummary(params, this.downloadReceivableSummarySuccess.bind(this, form, params, callback), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
   * Success callback for get Payables
   * @param {object} response - consist records
   */
  AcIntelligenceDashboardPresentationController.prototype.downloadReceivableSummarySuccess = function (form, params, callback, response) {
    this.hideProgressBar();
    if (response) {
      var url = response.httpresponse.url;
      CommonUtilities.downloadAttachment(url, params);
    }
  };

  /**
    * Method to get PayableSummary download data
    * @param {object} params - consist of payload to get ReceivableSummary download data
    * @param {string} frm - form name
    */
  AcIntelligenceDashboardPresentationController.prototype.downloadPayableSummary = function (form, callback) {
    this.showProgressBar();
    var params = {
      "queryParam": "Payables",
      "modelName": "Payables",
      "topParam": "Payables",
      "orderParam": "Payables",
      "subTitle": "Accounts Payable Analysis",
      "businessName": applicationManager.getSelectedSbaBusiness().coreCustomerName || applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0].coreCustomerName
    };
    this.AcIntelligenceDashboardManager.generatePayableSummary(params, this.downloadPayableSummarySuccess.bind(this, form, params, callback), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
   * Success callback for get Payables
   * @param {object} response - consist records
   */
  AcIntelligenceDashboardPresentationController.prototype.downloadPayableSummarySuccess = function (form, params, callback, response) {
    this.hideProgressBar();
    if (response) {
      var url = response.httpresponse.url;
      CommonUtilities.downloadAttachment(url, params);
    }
  };

      /**
* Method to get Receivables ByCustomer Download data
* @param {object} params - consist of payload to get Accounting Receivables ByCustomer Download
* @param {string} frm - form name
*/
AcIntelligenceDashboardPresentationController.prototype.getReceivablesByCustomerDownload = function ( params, form, callback) {
  this.showProgressBar();
  this.AcIntelligenceDashboardManager.generateReceivablesByCustomerDownload(params, this.getReceivablesByCustomerDownloadSuccess.bind(this, form, params,callback), this.commonServiceFailureMethod.bind(this, form));
};

/**
 * Success callback for get ByCustomer Download data
 * @param {object} response - consist records
 */
AcIntelligenceDashboardPresentationController.prototype.getReceivablesByCustomerDownloadSuccess = function (form, params, callback, response) {
  this.hideProgressBar();
  if (response) {
    var url = response.httpresponse.url;
    CommonUtilities.downloadAttachment(url, params);
  }
};

 /**
* Method to get PayableSupplier Download data
* @param {object} params - consist of payload to get Accounting PayableSupplier Download
* @param {string} frm - form name
*/
AcIntelligenceDashboardPresentationController.prototype.getPayableSupplierDownload = function ( params, form, callback) {
  this.showProgressBar();
  this.AcIntelligenceDashboardManager.generatePayableSupplierDownload(params, this.getPayableSupplierSuccess.bind(this, form, params,callback), this.commonServiceFailureMethod.bind(this, form));
};

/**
 * Success callback for PayableSupplier Download data
 * @param {object} response - consist records
 */
AcIntelligenceDashboardPresentationController.prototype.getPayableSupplierSuccess = function (form, params, callback, response) {
  this.hideProgressBar();
  if (response) {
    var url = response.httpresponse.url;
    CommonUtilities.downloadAttachment(url, params);
  }
};

/**
* Method to get Receivables ByCustomer Download data on By Customer screen
* @param {object} params - consist of payload to get Accounting Receivables ByCustomer Download
* @param {string} frm - form name
*/
AcIntelligenceDashboardPresentationController.prototype.getReceivablesByCustomerScreenDownload = function ( params, form, callback) {
  this.showProgressBar();
  this.AcIntelligenceDashboardManager.generateReceivablesByCustomerScreenDownload(params, this.generateReceivablesByCustomerScreenDownloadSuccess.bind(this, form, params,callback), this.commonServiceFailureMethod.bind(this, form));
};

/**
 * Success callback for get ByCustomer Download data on By Customer screen
 * @param {object} response - consist records
 */
AcIntelligenceDashboardPresentationController.prototype.generateReceivablesByCustomerScreenDownloadSuccess = function (form, params, callback, response) {
  this.hideProgressBar();
  if (response) {
    var url = response.httpresponse.url;
    CommonUtilities.downloadAttachment(url, params);
  }
};

  /**
  * Method to get Receivables average payment data
  * @param {object} params - consist of payload to get Accounting Receivables average payment data
  * @param {string} frm - form name
  */
  AcIntelligenceDashboardPresentationController.prototype.getReceivablesAveragePayment = function (params, form, callback) {
    this.showProgressBar();
    this.AcIntelligenceDashboardManager.fetchReceivablesAveragePayment(params, this.getReceivablesAveragePaymentSuccess.bind(this, form, callback), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
   * Success callback for get ReceivablesAveragePaymentdays 
   * @param {object} response - consist records
   */
  AcIntelligenceDashboardPresentationController.prototype.getReceivablesAveragePaymentSuccess = function (form, callback, response) {
    this.hideProgressBar();
    if (callback && typeof callback === 'function') {
      callback();
    } else {
      this.showView({
        form,
        data: {
          ReceivablesAveragePayment: response.value
        }
      });
    }
  };

  /**
  * Method to get Payable average payment data
  * @param {object} params - consist of payload to get Accounting Payables average payment data
  * @param {string} frm - form name
  */
  AcIntelligenceDashboardPresentationController.prototype.getPayablesAveragePayment = function (params, form, callback) {
    this.showProgressBar();
    this.AcIntelligenceDashboardManager.fetchPayablesAveragePayments(params, this.getPayablesAveragePaymentSuccess.bind(this, form, callback), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
   * Success callback for get PayablesAveragePaymentdays 
   * @param {object} response - consist records
   */
  AcIntelligenceDashboardPresentationController.prototype.getPayablesAveragePaymentSuccess = function (form, callback, response) {
    this.hideProgressBar();
    if (callback && typeof callback === 'function') {
      callback();
    } else {
      this.showView({
        form,
        data: {
          PayablesAveragePayment: response.value
        }
      });
    }
  };

  /**
* Method to get Receivables ByCustomer data
* @param {object} params - consist of payload to get Accounting Receivables ByCustomer
* @param {string} frm - form name
*/
  AcIntelligenceDashboardPresentationController.prototype.getReceivablesByCustomer = function (params, form, callback) {
    this.showProgressBar();
    this.AcIntelligenceDashboardManager.fetchReceivablesByCustomer(params, this.getReceivablesByCustomerSuccess.bind(this, form, callback), this.commonServiceFailureMethod.bind(this, form));
  };

  /**
   * Success callback for get ReceivablesByCustomer
   * @param {object} response - consist records
   */
  AcIntelligenceDashboardPresentationController.prototype.getReceivablesByCustomerSuccess = function (form, callback, response) {
    this.hideProgressBar();
    if (callback && typeof callback === 'function') {
      callback();
    } else {
      this.showView({
        form,
        data: {
          ReceivablesByCustomer: response.value
        }
      });
    }
  };

    /**
* Method to get PayableBySupplier data
* @param {object} params - consist of payload to get Accounting PayableBySupplier
* @param {string} frm - form name
*/
AcIntelligenceDashboardPresentationController.prototype.getPayableBySupplier = function (params, form, callback) {
  this.showProgressBar();
  this.AcIntelligenceDashboardManager.fetchPayableBySupplier(params, this.getPayableBySupplierSuccess.bind(this, form, callback), this.commonServiceFailureMethod.bind(this, form));
};

/**
 * Success callback for get PayableBySupplier
 * @param {object} response - consist records
 */
AcIntelligenceDashboardPresentationController.prototype.getPayableBySupplierSuccess = function (form, callback, response) {
  this.hideProgressBar();
  if (callback && typeof callback === 'function') {
    callback();
  } else {
    this.showView({
      form,
      data: {
        PayableBySupplier: response.value
      }
    });
  }
};




  return AcIntelligenceDashboardPresentationController;
});