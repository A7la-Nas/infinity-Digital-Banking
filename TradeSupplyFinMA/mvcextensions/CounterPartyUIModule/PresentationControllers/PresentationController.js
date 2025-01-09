define(["SCFUtils"], function (SCFUtils) {
  /**
   * User defined presentation controller
   * @constructor
   * @extends kony.mvc.Presentation.BasePresenter
   */
  function CounterPartyPresentationController() {
    this.navigationManager = applicationManager.getNavigationManager();
    this.configurationManager = applicationManager.getConfigurationManager();
    this.formatUtilManager = applicationManager.getFormatUtilManager();
    this.userPreferencesManager = applicationManager.getUserPreferencesManager();
    this.counterPartyManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: 'CounterPartyManager', appName: 'TradeSupplyFinMA' }).businessController;
    this.paymentAllocationManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ 'appName': 'TradeSupplyFinMA', 'moduleName': 'PaymentAllocationManager' }).businessController;
    this.counterPartyDashboardConfig = {
      'myInvoiceChartStatus': {
        'Approved': kony.i18n.getLocalizedString('i18n.konybb.Common.Approved'),
        'Pending Approval': kony.i18n.getLocalizedString('i18n.Search.PendingApproval'),
        'Rejected': kony.i18n.getLocalizedString('i18n.konybb.Common.Rejected')
      },
      'listTimePeriodFilters': {
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
    /**
     *  Mock records for counterparty Programs
     */
    this.counterpartyProgramList = [
        {
          "programName": "General Motors SCF Programme -SBLC",
          "programId": "AA23080Z942S",
          "currencyCode": "USD",
          "programTotalLimit": 2100000,
          "programUtilisedBalance": 500000,
          "facilities": [
            {
              "facilityId": "AA23080Z945S",
              "facilityName": "SBLC Revolving Facility",
              "currencyCode": "USD",
              "facilityTotalLimit": 1000000,
              "facilityUtilisedBalance": 400000
            },
            {
              "facilityId": "AA23080Z946S",
              "facilityName": "SBLC Non-Revolving Facility",
              "currencyCode": "USD",
              "facilityTotalLimit": 800000,
              "facilityUtilisedBalance": 100000
            },
            {
              "facilityId": "AA23080Z947S",
              "facilityName": "SBLC Revolving Facility -2",
              "currencyCode": "USD",
              "facilityTotalLimit": 300000,
              "facilityUtilisedBalance": 0.00
            }
          ]
        },
        {
          "programName": "General Motors SCF Programme- Insurance",
          "programId": "AA23080Z943S",
          "currencyCode": "USD",
          "programTotalLimit": 1209588,
          "programUtilisedBalance": 437023,
          "facilities": [
            {
              "facilityId": "AA23080Z948S",
              "facilityName": "Insurance Revolving Facility",
              "currencyCode": "USD",
              "facilityTotalLimit": 578088.00,
              "facilityUtilisedBalance": 234567.00
            },
            {
              "facilityId": "AA23080Z949S",
              "facilityName": "Insurance Non-Revolving Facility",
              "currencyCode": "USD",
              "facilityTotalLimit": 250977.00,
              "facilityUtilisedBalance": 70000.00
            },
            {
              "facilityId": "AA23080Z950S",
              "facilityName": "Insurance Revolving Facility-2",
              "currencyCode": "USD",
              "facilityTotalLimit": 380523.00,
              "facilityUtilisedBalance": 132456.00
            }
          ]
        }
    ];

    /**
     *  Mock records for counterpartyAssignedReceivables
     */
    this.counterpartyAssignedReceivables = [
        {
          "invoiceReference": "442812",
          "currencyCode": "USD",
          "amount": 81539.00,
          "maturityDate": "10/15/23",
          "counterParty": "ARK Logistics",
          "invoiceDate": "7/15/23",
          "financedDate": "9/2/2023"
        },
        {
          "invoiceReference": "597835",
          "currencyCode": "USD",
          "amount": 10960,
          "maturityDate": "11/21/23",
          "counterParty": "ARK Logistics",
          "invoiceDate": "8/21/23",
          "financedDate": "9/15/2023"
        },
        {
          "invoiceReference": "157363",
          "currencyCode": "USD",
          "amount": 23480,
          "maturityDate": "12/27/23",
          "counterParty": "ARK Logistics",
          "invoiceDate": "9/27/23",
          "financedDate": "9/27/2023"
        },
        {
          "invoiceReference": "411185",
          "currencyCode": "USD",
          "amount": 17904,
          "maturityDate": "12/3/23",
          "counterParty": "ARK Logistics",
          "invoiceDate": "9/3/23",
          "financedDate": "10/5/2023"
        },
        {
          "invoiceReference": "347738",
          "currencyCode": "USD",
          "amount": 48875,
          "maturityDate": "4/15/23",
          "counterParty": "ARK Logistics",
          "invoiceDate": "1/10/23",
          "financedDate": "2/18/2023"
        },
        {
          "invoiceReference": "124984",
          "currencyCode": "USD",
          "amount": 135375,
          "maturityDate": "4/21/23",
          "counterParty": "ARK Logistics",
          "invoiceDate": "1/16/23",
          "financedDate": "4/10/2023"
        },
        {
          "invoiceReference": "432624",
          "currencyCode": "USD",
          "amount": 66381,
          "maturityDate": "5/27/23",
          "counterParty": "ARK Logistics",
          "invoiceDate": "2/22/23",
          "financedDate": "3/8/2023"
        },
        {
          "invoiceReference": "397332",
          "currencyCode": "USD",
          "amount": 49183,
          "maturityDate": "6/3/23",
          "counterParty": "ARK Logistics",
          "invoiceDate": "3/30/23",
          "financedDate": "4/25/2023"
        },
        {
          "invoiceReference": "397145",
          "currencyCode": "USD",
          "amount": 58095,
          "maturityDate": "8/15/23",
          "counterParty": "ARK Logistics",
          "invoiceDate": "5/6/23",
          "financedDate": "6/9/2023"
        },
        {
          "invoiceReference": "581899",
          "currencyCode": "USD",
          "amount": 57863,
          "maturityDate": "9/21/23",
          "counterParty": "ARK Logistics",
          "invoiceDate": "6/12/23",
          "financedDate": "7/27/2023"
        },
        {
          "invoiceReference": "317768",
          "currencyCode": "USD",
          "amount": 37135,
          "maturityDate": "10/27/23",
          "counterParty": "ARK Logistics",
          "invoiceDate": "7/19/23",
          "financedDate": "9/12/2023"
        }
    ];

    /**
 *  Mock records for counterpartyReceivablesApprovedForFunding
*/

    this.counterpartyReceivablesApprovedForFunding = [
        {
          "invoiceReference": "347012",
          "currencyCode": "USD",
          "amount": 40024.00,
          "maturityDate": "10/15/23",
          "anchorName": "General Motors UK",
          "facilityName": "SBLC Revolving Facility",
          "creationDate": "7/15/23"
        },
        {
          "invoiceReference": "377241",
          "currencyCode": "USD",
          "amount": 46078,
          "maturityDate": "11/21/23",
          "anchorName": "General Motors UK",
          "facilityName": "SBLC Revolving Facility",
          "creationDate": "8/21/23"
        },
        {
          "invoiceReference": "655507",
          "currencyCode": "USD",
          "amount": 63610,
          "maturityDate": "12/27/23",
          "anchorName": "General Motors UK",
          "facilityName": "SBLC Revolving Facility",
          "creationDate": "9/27/23"
        },
        {
          "invoiceReference": "305594",
          "currencyCode": "USD",
          "amount": 59438,
          "maturityDate": "12/3/23",
          "anchorName": "General Motors UK",
          "facilityName": "SBLC Revolving Facility",
          "creationDate": "9/3/23"
        },
        {
          "invoiceReference": "600317",
          "currencyCode": "USD",
          "amount": 24148,
          "maturityDate": "4/15/23",
          "anchorName": "General Motors UK",
          "facilityName": "SBLC Revolving Facility",
          "creationDate": "1/10/23"
        },
        {
          "invoiceReference": "689812",
          "currencyCode": "USD",
          "amount": 15070,
          "maturityDate": "4/21/23",
          "anchorName": "General Motors UK",
          "facilityName": "SBLC Revolving Facility",
          "creationDate": "1/16/23"
        },
        {
          "invoiceReference": "462347",
          "currencyCode": "USD",
          "amount": 19848,
          "maturityDate": "5/27/23",
          "anchorName": "General Motors UK",
          "facilityName": "SBLC Revolving Facility",
          "creationDate": "2/22/23"
        },
        {
          "invoiceReference": "216939",
          "currencyCode": "USD",
          "amount": 20910,
          "maturityDate": "6/3/23",
          "anchorName": "General Motors UK",
          "facilityName": "SBLC Revolving Facility",
          "creationDate": "3/30/23"
        },
        {
          "invoiceReference": "379375",
          "currencyCode": "USD",
          "amount": 79147,
          "maturityDate": "8/15/23",
          "anchorName": "General Motors India",
          "facilityName": "SBLC Revolving Facility",
          "creationDate": "5/6/23"
        },
        {
          "invoiceReference": "263300",
          "currencyCode": "USD",
          "amount": 28209,
          "maturityDate": "9/21/23",
          "anchorName": "General Motors India",
          "facilityName": "SBLC Revolving Facility",
          "creationDate": "6/12/23"
        }
    ];

    /**
     *  Mock records for Invoices
    */
    this.myInvoices = [
      {
        "valueDate": "9/2/2023",
        "currencyCode": "USD",
        "originalAmount": 494219,
        "status": "Approved",
        "counterPartyName": "ARK Logistics",
        "receiptAmount": 306968
      },
      {
        "valueDate": "9/15/2023",
        "currencyCode": "USD",
        "originalAmount": 320717,
        "status": "Pending Approval",
        "counterPartyName": "ARK Logistics",
        "receiptAmount": 295916
      },
      {
        "valueDate": "9/27/2023",
        "currencyCode": "USD",
        "originalAmount": 583728,
        "status": "Approved",
        "counterPartyName": "ARK Logistics",
        "receiptAmount": 278213
      },
      {
        "valueDate": "10/5/2023",
        "currencyCode": "USD",
        "originalAmount": 357475,
        "status": "Pending Approval",
        "counterPartyName": "ARK Logistics",
        "receiptAmount": 566251
      },
      {
        "valueDate": "2/18/2023",
        "currencyCode": "USD",
        "originalAmount": 581153,
        "status": "Pending Approval",
        "counterPartyName": "ARK Logistics",
        "receiptAmount": 286719
      },
      {
        "valueDate": "4/10/2023",
        "currencyCode": "USD",
        "originalAmount": 137160,
        "status": "Approved",
        "counterPartyName": "ARK Logistics",
        "receiptAmount": 597406
      },
      {
        "valueDate": "3/8/2023",
        "currencyCode": "USD",
        "originalAmount": 439978,
        "status": "Pending Approvald",
        "counterPartyName": "ARK Logistics",
        "receiptAmount": 444140
      },
      {
        "valueDate": "4/25/2023",
        "currencyCode": "USD",
        "originalAmount": 695871,
        "status": "Pending Approval",
        "counterPartyName": "ARK Logistics",
        "receiptAmount": 602999
      },
      {
        "valueDate": "6/9/2023",
        "currencyCode": "USD",
        "originalAmount": 312810,
        "status": "Rejected",
        "counterPartyName": "ARK Logistics",
        "receiptAmount": 118195
      },
      {
        "valueDate": "7/27/2023",
        "currencyCode": "USD",
        "originalAmount": 331216,
        "status": "Rejected",
        "counterPartyName": "ARK Logistics",
        "receiptAmount": 547221
      },
      {
        "valueDate": "9/12/2023",
        "currencyCode": "USD",
        "originalAmount": 462810,
        "status": "Rejected",
        "counterPartyName": "ARK Logistics",
        "receiptAmount": 112905
      }
    ];

    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(CounterPartyPresentationController, kony.mvc.Presentation.BasePresenter);

  /**
   * Overridden Method of kony.mvc.Presentation.BasePresenter
   * This method gets called when presentation controller gets initialized
   * @method
   */
  CounterPartyPresentationController.prototype.initializePresentationController = function () { };
  /**
   * Entry Point method for Anchor module.
   * @param {object} params - Contains info to load the screen.
   */
  CounterPartyPresentationController.prototype.loadScreenWithContext = function (params) {
    switch (params.context) {
      case 'counterPartyDashboard':
        this.showView({ form: 'frmCounterPartyDashboard' });
        break;
    }
  };
  /**
   * Shows a particular form.
   * @param {object} param0 - Contains info to load the particular form.
   */
  CounterPartyPresentationController.prototype.showView = function ({ appName, form, data }) {
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
  CounterPartyPresentationController.prototype.showProgressBar = function () {
    this.navigationManager.updateForm({
      'isLoading': true
    });
  };
  /**
  * Hides the loading indicator.
  */
  CounterPartyPresentationController.prototype.hideProgressBar = function () {
    this.navigationManager.updateForm({
      'isLoading': false
    });
  };
  /**
   * Filters the submittedPaymentAllocation Record.
   * @param {String} form - Form name.
   * @returns {Array} - Result array.
   */
  CounterPartyPresentationController.prototype.fetchPaymentAllocationData = function (form, isPending = false) {
    try {
      const customerId = [this.userPreferencesManager.getBackendIdentifier()];
      Promise.all([
        new Promise((resolve, reject) => this.paymentAllocationManager.fetchPaymentAllocations(resolve, reject))
      ]).then(resp => {
        const requestedPaymentAllocationList = resp[0].filter(item => (item.status.toLowerCase() === 'requested'));
        const filterdListData = !isPending && resp[0].filter(item => (item.status.toLowerCase() === 'submitted' && item.uploadedFrom.toLowerCase() === 'counterparty' && customerId.includes(item.uploadedBy)));
        let onSuccess = {};
        onSuccess['requestedPaymentAllocationList'] = requestedPaymentAllocationList;
        onSuccess[!isPending && 'paymentAllocationList'] = filterdListData;
        this.showView({
          form,
          'data': onSuccess
        });
      });
    } catch (response) {
      this.showView({
        form,
        'data': {
          'serverError': response.errmsg || response.errorMessage,
        }
      });
    }
  };
  return CounterPartyPresentationController;
});