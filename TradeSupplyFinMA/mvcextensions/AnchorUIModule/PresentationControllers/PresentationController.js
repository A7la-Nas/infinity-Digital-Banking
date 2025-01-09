define(['CommonUtilities', "SCFUtils"], function (CommonUtilities, SCFUtils) {
  /**
   * User defined presentation controller
   * @constructor
   * @extends kony.mvc.Presentation.BasePresenter
   */
  function AnchorPresentationController() {
    this.navigationManager = applicationManager.getNavigationManager();
    this.configurationManager = applicationManager.getConfigurationManager();
    this.formatUtilManager = applicationManager.getFormatUtilManager();
    this.userPreferencesManager = applicationManager.getUserPreferencesManager();
    this.asyncManager = applicationManager.getAsyncManager();
    this.anchorManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ 'moduleName': 'AnchorManager', 'appName': 'TradeSupplyFinMA' }).businessController;
    this.invoicesManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ 'appName': 'TradeSupplyFinMA', 'moduleName': 'InvoicesManager' }).businessController;
    this.paymentAllocationManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ 'appName': 'TradeSupplyFinMA', 'moduleName': 'PaymentAllocationManager' }).businessController;
    this.anchorDashboardConfig = {
      'fundingRequestChartStatus': {
        'Draft': kony.i18n.getLocalizedString('kony.mb.Messages.draft'),
        'Submitted': kony.i18n.getLocalizedString('i18n.TradeFinance.Submitted'),
        'Processing by Bank': kony.i18n.getLocalizedString('i18n.TradeFinance.ProcessingByBank'),
        'Returned by Bank': kony.i18n.getLocalizedString('i18n.TradeFinance.ReturnedbyBank'),
        'Resubmitted': kony.i18n.getLocalizedString('i18n.TradeFinance.Resubmitted'),
        'Submitted by Bank': kony.i18n.getLocalizedString('i18n.TradeFinance.SubmittedbyBank'),
        'Funded': kony.i18n.getLocalizedString('i18n.TradeFinance.Funded'),
        'Cancelled': kony.i18n.getLocalizedString('i18n.Transfers.Cancelled')
      },
      'flagsWithoutOutline': ['jpy', 'gel', 'ils', 'qar', 'rub', 'sgd', 'bgn'],
      'listTimePeriodFilters': {
        '7,DAY': 'Last 7 days',
        '14,DAY': 'Last 14 days',
        '1,MONTH': 'Last 1 month',
        '2,MONTH': 'Last 2 months',
        '3,MONTH': 'Last 3 months',
        '6,MONTH': 'Last 6 months',
        '12,MONTH': 'Last 12 months',
        'CUSTOM': 'Custom Date Range'
      },
      'paymentAllocationStatus': {
        'Requested': kony.i18n.getLocalizedString('i18n.ChequeManagement.Completed'),
        'Submitted': kony.i18n.getLocalizedString('i18n.TradeFinance.Submitted')
      }
    };
    /**
     * Mock records for Anchor Funding Requests.
     */
    this.anchorFundingRequests = [
      {
        "supplierName": "General Motors Uk",
        "facilityId": "AA23080Z950S",
        "facilityName": "Insurance Revolving Facility 2",
        "fundingRequestId": "1000049",
        "createdDate": "10/14/23",
        "currency": "USD",
        "fundingRequestAmount": 500000,
        "status": "Draft"
      },
      {
        "supplierName": "General Motors Uk",
        "facilityId": "AA23080Z950S",
        "facilityName": "Insurance Revolving Facility 2",
        "fundingRequestId": "1000048",
        "createdDate": "10/13/23",
        "currency": "USD",
        "fundingRequestAmount": 500000,
        "status": "Draft"
      },
      {
        "supplierName": "General Motors Uk",
        "facilityId": "AA23080Z949S",
        "facilityName": "Insurance Non-Revolving Facility",
        "fundingRequestId": "1000047",
        "createdDate": "10/12/23",
        "currency": "USD",
        "fundingRequestAmount": 100000.00,
        "status": "Processing by Bank"
      },
      {
        "supplierName": "General Motors India",
        "facilityId": "AA23080Z945S",
        "facilityName": "SBLC Revolving Facility",
        "fundingRequestId": "1000046",
        "createdDate": "10/11/23",
        "currency": "USD",
        "fundingRequestAmount": 125000.00,
        "status": "Submitted by Bank"
      },
      {
        "supplierName": "General Motors India",
        "facilityId": "AA23080Z945S",
        "facilityName": "SBLC Revolving Facility",
        "fundingRequestId": "1000045",
        "createdDate": "10/10/23",
        "currency": "USD",
        "fundingRequestAmount": 50000.00,
        "status": "Returned by Bank"
      },
      {
        "supplierName": "General Motors UK",
        "facilityId": "AA23080Z949S",
        "facilityName": "Insurance Non-Revolving Facility",
        "fundingRequestId": "1000044",
        "createdDate": "10/10/23",
        "currency": "USD",
        "fundingRequestAmount": 111000.00,
        "status": "Submitted"
      },
      {
        "supplierName": "General Motors Uk",
        "facilityId": "AA23080Z945S",
        "facilityName": "SBLC Revolving Facility",
        "fundingRequestId": "1000037",
        "createdDate": "10/9/23",
        "currency": "USD",
        "fundingRequestAmount": 50000.00,
        "status": "Returned by Bank"
      },
      {
        "supplierName": "General Motors India",
        "facilityId": "AA23080Z949S",
        "facilityName": "Insurance Non-Revolving Facility",
        "fundingRequestId": "1000035",
        "createdDate": "10/8/23",
        "currency": "USD",
        "fundingRequestAmount": 400000.00,
        "status": "Processing by Bank"
      },
      {
        "supplierName": "General Motors UK",
        "facilityId": "AA23080Z945S",
        "facilityName": "SBLC Revolving Facility",
        "fundingRequestId": "1000040",
        "createdDate": "10/7/23",
        "currency": "USD",
        "fundingRequestAmount": 275000.00,
        "status": "Returned by Bank"
      },
      {
        "supplierName": "General Motors India",
        "facilityId": "AA23080Z946S",
        "facilityName": "SBLC Non-Revolving Facility",
        "fundingRequestId": "1000033",
        "createdDate": "10/5/23",
        "currency": "USD",
        "fundingRequestAmount": 225000.00,
        "status": "Returned by Bank"
      },
      {
        "supplierName": "General Motors Germany",
        "facilityId": "AA23080Z949S",
        "facilityName": "Insurance Non-Revolving Facility",
        "fundingRequestId": "1000038",
        "createdDate": "10/4/23",
        "currency": "USD",
        "fundingRequestAmount": 200000.00,
        "status": "Funded"
      },
      {
        "supplierName": "General Motors Netherlands",
        "facilityId": "AA23080Z949S",
        "facilityName": "Insurance Non-Revolving Facility",
        "fundingRequestId": "1000041",
        "createdDate": "10/4/23",
        "currency": "USD",
        "fundingRequestAmount": 300000.00,
        "status": "Submitted by Bank"
      },
      {
        "supplierName": "General Motors UK",
        "facilityId": "AA23080Z949S",
        "facilityName": "Insurance Non-Revolving Facility",
        "fundingRequestId": "1000032",
        "createdDate": "10/3/23",
        "currency": "USD",
        "fundingRequestAmount": 100000.00,
        "status": "Funded"
      },
      {
        "supplierName": "General Motors UK",
        "facilityId": "AA23080Z948S",
        "facilityName": "Insurance Revolving Facility",
        "fundingRequestId": "1000030",
        "createdDate": "10/2/23",
        "currency": "USD",
        "fundingRequestAmount": 432110.00,
        "status": "Funded"
      }
    ];
    /**
     * Mock records for anchorInvoicePendingForApproval.
     */
    this.anchorInvoicePendingForApproval = [
      {
        "sNo": 1,
        "counterPartyName": "ARK Logistics",
        "invoiceReference": "345788",
        "creationDate": "10/12/23",
        "currencyCode": "USD",
        "amount": 100000,
        "status": "Pending for Approval"
      },
      {
        "sNo": 2,
        "counterPartyName": "Bosch",
        "invoiceReference": "345787",
        "creationDate": "10/11/23",
        "currencyCode": "USD",
        "amount": 75000,
        "status": "Pending for Approval"
      },
      {
        "sNo": 3,
        "counterPartyName": "KLINGER Fluid Control",
        "invoiceReference": "345786",
        "creationDate": "10/11/23",
        "currencyCode": "USD",
        "amount": 38750,
        "status": "Pending for Approval"
      },
      {
        "sNo": 4,
        "counterPartyName": "Bridgestone",
        "invoiceReference": "345785",
        "creationDate": "10/11/23",
        "currencyCode": "USD",
        "amount": 50000,
        "status": "Pending for Approval"
      },
      {
        "sNo": 5,
        "counterPartyName": "ARK Logistics",
        "invoiceReference": "345784",
        "creationDate": "10/10/23",
        "currencyCode": "USD",
        "amount": 56000,
        "status": "Pending for Approval"
      },
      {
        "sNo": 6,
        "counterPartyName": "ARK Logistics",
        "invoiceReference": "345783",
        "creationDate": "10/10/23",
        "currencyCode": "USD",
        "amount": 796000,
        "status": "Pending for Approval"
      },
      {
        "sNo": 7,
        "counterPartyName": "ARK Logistics",
        "invoiceReference": "345782",
        "creationDate": "10/10/23",
        "currencyCode": "USD",
        "amount": 250000,
        "status": "Pending for Approval"
      },
      {
        "sNo": 8,
        "counterPartyName": "Global Cargo Inc",
        "invoiceReference": "345781",
        "creationDate": "10/7/23",
        "currencyCode": "USD",
        "amount": 348000,
        "status": "Pending for Approval"
      },
      {
        "sNo": 9,
        "counterPartyName": "ABC Consultants",
        "invoiceReference": "345780",
        "creationDate": "10/7/23",
        "currencyCode": "USD",
        "amount": 500000,
        "status": "Pending for Approval"
      },
      {
        "sNo": 10,
        "counterPartyName": "Marine Shipping",
        "invoiceReference": "345779",
        "creationDate": "10/5/23",
        "currencyCode": "USD",
        "amount": 1000000,
        "status": "Pending for Approval"
      },
      {
        "sNo": 11,
        "counterPartyName": "Schlumberger Limited",
        "invoiceReference": "345778",
        "creationDate": "10/5/23",
        "currencyCode": "USD",
        "amount": 1500000,
        "status": "Pending for Approval"
      },
      {
        "sNo": 12,
        "counterPartyName": "KLINGER Fluid Control",
        "invoiceReference": "345777",
        "creationDate": "10/5/23",
        "currencyCode": "USD",
        "amount": 667500,
        "status": "Pending for Approval"
      },
      {
        "sNo": 13,
        "counterPartyName": "Marathon Petroleum Company LLC",
        "invoiceReference": "345776",
        "creationDate": "10/4/23",
        "currencyCode": "USD",
        "amount": 400050,
        "status": "Pending for Approval"
      },
      {
        "sNo": 14,
        "counterPartyName": "Bosch",
        "invoiceReference": "345775",
        "creationDate": "10/2/23",
        "currencyCode": "USD",
        "amount": 300404,
        "status": "Pending for Approval"
      },
      {
        "sNo": 15,
        "counterPartyName": "AZEE Pistons",
        "invoiceReference": "345774",
        "creationDate": "10/1/23",
        "currencyCode": "USD",
        "amount": 2000000,
        "status": "Pending for Approval"
      }
    ];
    /**
     *  Mock records for Exchange Rates.
     */
    this.exchangeRates = [
      {
        "currencyCode": "EUR",
        "currency": "Euro",
        "buy": 1.0509,
        "sell": 1.0562
      },
      {
        "currencyCode": "GBP",
        "currency": "Great Britain Pound",
        "buy": 1.22,
        "sell": 1.2201
      },
      {
        "currencyCode": "INR",
        "currency": "Indian Rupee",
        "buy": 83.227,
        "sell": 83.23
      },
      {
        "currencyCode": "JPY",
        "currency": "Japanese Yen",
        "buy": 149.47,
        "sell": 149.54
      },
      {
        "currencyCode": "AUD",
        "currency": "Australian Dollar",
        "buy": 1.5738,
        "sell": 1.5748
      }
    ];
    /**
     * Specifies the funding request info like data, roadmap and config.
     */
    this.fundingRequest = {
      'data': {
      },
      'config': {
        'documentFormat': ['pdf', 'jpeg', 'png', 'tiff', 'doc', 'xls', 'csv'],
        'documentMaxSize': '25mb'
      },
      'roadmap': {
        'step1': {
          'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.fundingRequestDetails'),
          'form': 'frmFundingRequestDetails'
        },
        'step2': {
          'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.invoiceDetails'),
          'form': 'frmInvoiceDetails'
        },
        'step3': {
          'text': kony.i18n.getLocalizedString('i18n.wealth.Documents'),
          'form': 'frmFundingRequestDocuments'
        },
        'step4': {
          'text': kony.i18n.getLocalizedString('i18n.payments.summary'),
          'form': 'frmFundingRequestSummary'
        },
        'step5': {
          'text': kony.i18n.getLocalizedString('i18n.wealth.acknowledgement'),
          'form': 'frmFundingRequestAcknowledgement'
        }
      }
    };

    this.fundingStatus = {
      'Draft': "Draft",
      'ReturnedByBank': "Returned by Bank",
      'Cancelled': "Cancelled",
      'Funded': "Funded",
      'SubmittedByBank': "Submitted by Bank",
      'Deleted': "Deleted",
      'Cancelled': "Cancelled"
    };

    /**
     * Mock records for Payment History
     */
    this.fundingPaymentHistory = [{
      "transactionId": "762003",
      "currencyId": "USD",
      "amount": "972023.00",
      "paymentDate": "6/28/2023",
      "accountNumber": "AA185703"
    },
    {
      "transactionId": "307509",
      "currencyId": "USD",
      "amount": "331568.00",
      "paymentDate": "11/9/2023",
      "accountNumber": "AA265344"
    },
    {
      "transactionId": "278526",
      "currencyId": "USD",
      "amount": "149299.00",
      "paymentDate": "5/14/2023",
      "accountNumber": "AA909055"
    },
    {
      "transactionId": "602556",
      "currencyId": "USD",
      "amount": "130587.00",
      "paymentDate": "9/24/2023",
      "accountNumber": "AA435462"
    },
    {
      "transactionId": "195209",
      "currencyId": "USD",
      "amount": "402740.00",
      "paymentDate": "1/8/2023",
      "accountNumber": "AA626756"
    },
    {
      "transactionId": "105624",
      "currencyId": "USD",
      "amount": "787415.00",
      "paymentDate": "6/11/2023",
      "accountNumber": "AA301118"
    },
    {
      "transactionId": "971925",
      "currencyId": "USD",
      "amount": "253452.00",
      "paymentDate": "11/15/2023",
      "accountNumber": "AA688022"
    },
    {
      "transactionId": "803387",
      "currencyId": "USD",
      "amount": "80482.00",
      "paymentDate": "3/13/2023",
      "accountNumber": "AA332770"
    },
    {
      "transactionId": "523813",
      "currencyId": "USD",
      "amount": "583923.00",
      "paymentDate": "5/18/2023",
      "accountNumber": "AA993566"
    },
    {
      "transactionId": "465802",
      "currencyId": "USD",
      "amount": "222491.00",
      "paymentDate": "10/21/2023",
      "accountNumber": "AA325225"
    },
    {
      "transactionId": "690561",
      "currencyId": "USD",
      "amount": "288726.00",
      "paymentDate": "6/26/2023",
      "accountNumber": "AA817293"
    },
    {
      "transactionId": "737122",
      "currencyId": "USD",
      "amount": "780534.00",
      "paymentDate": "8/18/2023",
      "accountNumber": "AA131090"
    },
    {
      "transactionId": "331533",
      "currencyId": "USD",
      "amount": "135923.00",
      "paymentDate": "4/16/2023",
      "accountNumber": "AA595100"
    },
    {
      "transactionId": "357122",
      "currencyId": "USD",
      "amount": "566112.00",
      "paymentDate": "4/28/2023",
      "accountNumber": "AA790840"
    }
    ];

    /**
     * Document Category Data
     */
    this.SCF_Document_category = [
      {
        "key": "FundingRequest",
        "displayName": "Funding Request Documents"
      },
      {
        "key": "SettlementInstructions",
        "displayName": "Settlement Instructions"
      },
      {
        "key": "ReceivablesInfo",
        "displayName": "Receivables Info"
      },
      {
        "key": "Others",
        "displayName": "Others"
      }
    ];

    /**
     * Mock Data for the Bank Uplaoded Documents...
     */
    this.bankUploadedDocsList = [{
      documentReference: 'TSFD8UQKm3mMVsH1Qfzir39gzLB8zCCbz6VN',
      documentName: 'Paymentletter.pdf'
    },
    {
      documentReference: 'TSFDlSduNi8snbieJE49RHEqGNt2cxPzxVby',
      documentName: 'DiscountConfirmation.pdf'
    },
    {
      documentReference: 'TSFDlSduNi8snbieJE49RHEqGNt2cxPzxVby',
      documentName: 'RepaymentSchedule.pdf'
    },
    {
      documentReference: 'TSFDlSduNi8snbieJE49RHEqGNt2cxPzxVby',
      documentName: 'AssignmentLetter.pdf'
    },
    ];

    /**
     * Mock Data for the CounterParty Chart Data.
     */
    this.counterPartyWiseLimits = [
      {
        "counterpartyName": "ARK Logistics",
        "currencyCode": "USD",
        "availableLimit": 22839450.00,
        "utilisedLimit": 9209696.00
      },
      {
        "counterpartyName": "KLINGER Fluid Control",
        "currencyCode": "USD",
        "availableLimit": 11419725.00,
        "utilisedLimit": 10524481.00
      },
      {
        "counterpartyName": "Bridgestone",
        "currencyCode": "USD",
        "availableLimit": 18271560.00,
        "utilisedLimit": 3188683.00
      },
      {
        "counterpartyName": "Bosch",
        "currencyCode": "USD",
        "availableLimit": 30452600.00,
        "utilisedLimit": 4188683.00
      }
    ];

    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(AnchorPresentationController, kony.mvc.Presentation.BasePresenter);

  /**
   * Overridden Method of kony.mvc.Presentation.BasePresenter
   * This method gets called when presentation controller gets initialized
   * @method
   */
  AnchorPresentationController.prototype.initializePresentationController = function () { };
  /**
   * Entry Point method for Anchor module.
   * @param {object} params - Contains info to load the screen.
   */
  AnchorPresentationController.prototype.loadScreenWithContext = function (params) {
    switch (params.context) {
      case 'anchorDashboard':
        this.showView({
          'form': 'frmAnchorDashboard'
        });
        break;
      case 'createFundingRequest':
        this.fundingRequest.data = {};
        if (params.data) {
          this.fundingRequest.data = params.data;
        }
        this.showView({
          'form': 'frmFundingRequestDetails'
        });
        break;
      case 'fundingRequestDocuments':
        this.fundingRequest.data = {};
        if (params.data) {
          this.fundingRequest.data = params.data;
        }
        this.showView({
          'form': 'frmFundingRequestDocuments'
        });
        break;
      case 'fundingRequestSummary':
        this.fundingRequest.data = {};
        if (params.data) {
          this.fundingRequest.data = params.data;
        }
        this.showView({
          'form': 'frmFundingRequestSummary'
        });
        break;
      case 'fundingInvoiceDetails':
        this.fundingRequest.data = {};
        if (params.data) {
          this.fundingRequest.data = params.data;
        }
        this.showView({
          'form': 'frmInvoiceDetails'
        });
        break;
    }
  };
  /**
   * Shows a particular form.
   * @param {object} param0 - Contains info to load the particular form.
   */
  AnchorPresentationController.prototype.showView = function ({ appName, form, data }) {
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
  AnchorPresentationController.prototype.showProgressBar = function () {
    this.navigationManager.updateForm({
      'isLoading': true
    });
  };
  /**
   * Hides the loading indicator.
   */
  AnchorPresentationController.prototype.hideProgressBar = function () {
    this.navigationManager.updateForm({
      'isLoading': false
    });
  };
  /**
   * Method to handle service failure
   * @param {string} form form id
   * @param {object} response contains error info
   */
  AnchorPresentationController.prototype.commonServiceFailureMethod = function ({ form, method }, response) {
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
   * Gets the funding requests.
   * @param {string} form - Specifies the form id.
   */
  AnchorPresentationController.prototype.getFundingRequests = function (form) {
    this.anchorManager.fetchFundingRequests(this.getFundingRequestsSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for get funding requests.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies the service response.
   */
  AnchorPresentationController.prototype.getFundingRequestsSuccess = function (form, response) {
    let fundingRequests = (response ? response.FundingRequests : []);
    fundingRequests.forEach(r => {
      r['supplierName'] = r.invoiceReferences ? JSON.parse(r.invoiceReferences)[0].supplierName : '';
      r['modificationDate'] = r.updatedDate ? r.updatedDate : r.createdDate;
    });
    fundingRequests = fundingRequests.concat(this.anchorFundingRequests);
    let filteredRequests = (fundingRequests).filter(fr => fr.status !== this.fundingStatus.Deleted);
    this.showView({
      form,
      'data': {
        'fundingRequests': filteredRequests
      }
    });
  };
  /**
   * Method to get transformed funding request data
   * @returns {object} - Return the transformed funding request data object
   */
  AnchorPresentationController.prototype.transformFundingRequestData = function (data) {
    let transformedData = {
      'facilityId': data.facilityId || '',
      'facilityCurrency': data.facilityCurrency || '',
      'programName': data.programName || '',
      'facilityAvailableLimit': data.facilityAvailableLimit || '',
      'facilityUtilisedLimit': data.facilityUtilisedLimit || '',
      'productName': data.productName || '',
      'currency': data.currency || '',
      'fundingRequestAmount': data.fundingRequestAmount || '',
      'supplierId': data.supplierId || '',
      'buyerId': data.buyerId || '',
      'invoiceReferences': data.invoiceReferences ? JSON.stringify(data.invoiceReferences) : '',
      'fundingDocuments': data.fundingDocuments ? JSON.stringify(data.fundingDocuments) : '',
      'fundingRequestId': data.fundingRequestId || '',
    };
    for (const key in transformedData) {
      if (SCFUtils.isEmptyNullOrUndefined(transformedData[key])) delete transformedData[key];
    }
    return transformedData;
  };
  /**
   * Saves the funding request.
   * @param {string} form - Specifies the form id.
   */
  AnchorPresentationController.prototype.saveFundingRequest = function (context) {
    this.showProgressBar();
    var fundingrequestkeys = Object.keys(this.fundingRequest.data);
    var self = this;
    if (context.formData) {
      fundingrequestkeys.forEach(function (key) {
        if (!context.formData.hasOwnProperty(key)) {
          context.formData[key] = self.fundingRequest.data[key];
        }
      });
    } else {
      context.formData = Object.assign({}, this.fundingRequest.data);
    }

    const data = Object.assign({}, context.formData);
    const transformedData = this.transformFundingRequestData(data);
    this.anchorManager.saveFundingRequest(transformedData, this.saveFundingRequestSuccess.bind(this, context), this.commonServiceFailureMethod.bind(this, { 'form': context.form }));
  };
  /**
   * Success callback for save funding request.
   * @param {string} flow - Specifies the flow type.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies the service response.
   */
  AnchorPresentationController.prototype.saveFundingRequestSuccess = function ({ form, flow, formData }, response) {
    this.hideProgressBar();
    if (flow === 'saveDraftOrClose') {
      form = 'frmAnchorDashboard';
    }
    Object.assign(this.fundingRequest.data, formData);
    this.fundingRequest.data['fundingRequestId'] = response.fundingRequestId;
    this.showView({
      form,
      'data': {
        'saveFundingRequest': true
      }
    });
  };
  /**
   * creates the funding request.
   * @param {string} form - Specifies the form id.
   */
  AnchorPresentationController.prototype.submitFundingRequest = function ({ form }) {
    this.showProgressBar();
    let payload = {
      'fundingRequestId': this.fundingRequest.data['fundingRequestId']
    }
    this.anchorManager.submitFundingRequest(payload, this.submitFundingRequestSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for submit funding request.
   * @param {string} flow - Specifies the flow type.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies the service response.
   */
  AnchorPresentationController.prototype.submitFundingRequestSuccess = function (form, response) {
    this.hideProgressBar();
    form = "frmFundingRequestAcknowledgement"
    this.showView({
      form,
      'data': {
        'submitFundingRequest': response
      }
    });
  };
  /**
 * Uploads the document.
 * @param {string} attachment - Specifies the document info.
 * @param {string} form - Specifies the form id.
 */
  AnchorPresentationController.prototype.uploadDocument = function (attachment, form) {
    this.showProgressBar();
    const params = {
      'uploadedattachments': attachment
    };
    this.anchorManager.uploadDocument(params, this.uploadDocumentSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for upload document.
   * @param {string} form - Specifies the form id.
   * @param {object} response contains service response data
   */
  AnchorPresentationController.prototype.uploadDocumentSuccess = function (form, response) {
    this.hideProgressBar();
    if (response && response.LCDocuments && response.LCDocuments[0].failedUploads) {
      this.showView({
        form,
        data: {
          'serverError': kony.i18n.getLocalizedString('i18n.payments.unableToUploadFile')
        }
      });
    } else {
      this.showView({
        form,
        data: {
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
  AnchorPresentationController.prototype.deleteDocument = function (deleteParams, form) {
    this.showProgressBar();
    const params = {
      'documentReference': deleteParams
    };
    this.anchorManager.deleteDocument(params, this.deleteDocumentSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for deleting the uploaded document
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  AnchorPresentationController.prototype.deleteDocumentSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      data: {
        'deleteDocument': response
      }
    });
  };
  /**
   * Downloads a document.
   * @param {string} docReference - Specifies document reference.
   * @param {string} form - Specifies the form id.
   */
  AnchorPresentationController.prototype.downloadDocument = function (docReference, form) {
    const downloadUrl = `${KNYMobileFabric.mainRef.config.services_meta.TradeSupplyFinance.url}/operations/TradeDocuments/downloadDocument`;
    CommonUtilities.downloadAttachment(downloadUrl, { 'fileId': docReference });
  };

  /**
   * creates the funding request.
   * @param {string} form - Specifies the form id.
   * @param {object} requestData - Funding Request Details of selected request.
   */
  AnchorPresentationController.prototype.cancelFundingRequest = function ({ form }, requestData) {
    this.showProgressBar();
    let payload = {
      'fundingRequestId': requestData['fundingRequestId']
    }
    this.anchorManager.cancelFundingRequest(payload, this.cancelFundingRequestSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for cancel funding request.
   * @param {string} flow - Specifies the flow type.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies the service response.
   */
  AnchorPresentationController.prototype.cancelFundingRequestSuccess = function (form, response) {
    this.hideProgressBar();
    form = "frmAnchorDashboard";
    this.showView({
      form,
      'data': {
        'cancelFundingRequest': response
      }
    });
    this.getFundingRequests(form);
  };
  /**
       * Method to generateCSVFile
       * @param {string} form form id
       */
  AnchorPresentationController.prototype.generateCSVFile = function (csvData, fileName, form) {
    try {
      const downloadLink = document.createElement("a");
      downloadLink.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvData));
      downloadLink.setAttribute("download", fileName);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      this.showView({
        form,
        data: {
          serverError: 'Error while generating CSV, please try again later.'
        }
      });
    }
  };
  /**
   * Retrieves the payment allocations.
   * @param {string} form - Specifies the form id.
   */
  AnchorPresentationController.prototype.getPaymentAllocations = function (form, isPending = false) {
    this.paymentAllocationManager.fetchPaymentAllocations(this.getPaymentAllocationsSuccess.bind(this, form, isPending), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for retreiving the payment allocations.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  AnchorPresentationController.prototype.getPaymentAllocationsSuccess = function (form, isPending, response) {
    const coreCustomerId = this.userPreferencesManager.getBackendIdentifier() || '';
    const paymentAllocation = (response || []).reduce(function (acc, obj) {
      switch (obj.status.toLowerCase()) {
        case 'pending':
          acc['pending'].push(obj);
          break;
        case 'requested':
          acc['requested'].push(obj);
          break;
        case 'submitted':
          obj['btnActionLabel'] = (obj.uploadedBy === coreCustomerId && (obj.uploadedFrom || '').toLowerCase().startsWith('anchor')) ? 'edit' : 'view';
          acc['requested'].push(obj);
          break;
      }
      return acc;
    }, {
      'pending': [],
      'requested': [],
      'submitted': []
    });
    let dataObj = {
      'pendingPaymentAllocations': paymentAllocation['pending']
    };
    !isPending && (dataObj['paymentAllocations'] = paymentAllocation['requested'].concat(paymentAllocation['submitted']));
    this.showView({
      form,
      'data': dataObj
    });
  };
  /**
   * Retrieves the list of programmes and facilities.
   * @param {string} form - Specifies the form id.
   */
  AnchorPresentationController.prototype.getProgrammesAndFacilities = function (form) {
    this.asyncManager.callAsync(
      [
        this.asyncManager.asyncItem(this.anchorManager, 'fetchListOfProgrammes', []),
        this.asyncManager.asyncItem(this.anchorManager, 'fetchListOfFacilities', [])
      ],
      this.getProgrammesAndFacilitiesCallback.bind(this, form)
    );
  };
  /**
   * Callback for retreiving the list of programmes and facilities.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies service response data.
   */
  AnchorPresentationController.prototype.getProgrammesAndFacilitiesCallback = function (form, syncResponseObject) {
    if (syncResponseObject.isAllSuccess()) {
      const programmes = syncResponseObject.responses[0].data || [];
      const facilities = (syncResponseObject.responses[1].data || []).reduce((acc, obj) => {
        if (!obj['account']) {
          const lastIndex = acc.length - 1;
          (obj['allowedProduct']) && (acc[lastIndex]['allowedProduct'] += `,${obj['allowedProduct'] || ''}`);
          (obj['allowedCurrency']) && (acc[lastIndex]['allowedCurrency'] += `,${obj['allowedCurrency'] || ''}`);
        } else {
          obj['allowedProduct'] = obj['allowedProduct'] || '';
          obj['allowedCurrency'] = obj['allowedCurrency'] || '';
          acc.push(obj);
        }
        return acc;
      }, []);
      programmes.forEach(p => {
        p['availableCommitment'] = parseFloat(p.availableCommitment);
        p['utilisedCommitment'] = parseFloat(p.utilisedCommitment);
        p['facilities'] = [];
        p.facilityId && p.facilityId.split(',').forEach(facId => {
          const fac = facilities.find(f => f.account === facId);
          if (fac) {
            fac['availableCommitment'] = parseFloat(fac.availableCommitment);
            fac['utilisedCommitment'] = parseFloat(fac.utilisedCommitment);
            p['facilities'].push(fac);
          }
        });
      });
      this.anchorProgramsList = programmes;
      this.showView({
        form,
        'data': {
          'programmesAndFacilities': this.anchorProgramsList
        }
      });
    } else {
      const errRes = syncResponseObject.responses[0].isSuccess ? syncResponseObject.responses[0] : syncResponseObject.responses[1];
      this.commonServiceFailureMethod({ form }, errRes);
    }
  };
  /**
   * Retrieves the live invoices.
   * @param {string} form - Specifies the form id.
   */
  AnchorPresentationController.prototype.getLiveInvoices = function (form) {
    this.invoicesManager.fetchLiveAnchorInvoices(this.getLiveInvoicesSuccess.bind(this), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for retreiving the live invoices.
   * @param {object} response - Specifies service response data.
   */
  AnchorPresentationController.prototype.getLiveInvoicesSuccess = function (response) {
    this.invoicesForFundingRequestByAnchor = response || [];
    this.invoicesForFundingRequestByAnchor.map(record => {
      if (record.parties && record.parties.length >= 2) {
        const [buyerIdx, supplierIdx] = (record.parties[0]['counterPartyRole'] === 'OWNER') ? [0, 1] : [1, 0];
        record['supplierId'] = record.parties[supplierIdx]['partyId'];
        record['supplierName'] = record.parties[supplierIdx]['partyName'];
        record['buyerId'] = record.parties[buyerIdx]['partyId'];
        record['buyerName'] = record.parties[buyerIdx]['partyName'];
      }
      record['issueDate'] = record['issueDate'] ? this.formatUtilManager.getFormattedCalendarDate(record['issueDate']) : '';
      record['maturityDate'] = record['maturityDate'] ? this.formatUtilManager.getFormattedCalendarDate(record['maturityDate']) : '';
    });
  };
  return AnchorPresentationController;
});