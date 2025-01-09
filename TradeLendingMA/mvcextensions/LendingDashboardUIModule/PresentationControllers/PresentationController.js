define(["TradeLendingUtils"], function (TLUtils) {
  /**
   * User defined presentation controller
   * @constructor
   * @extends kony.mvc.Presentation.BasePresenter
   */
  function LDPresentationController() {
    this.configurationManager = applicationManager.getConfigurationManager();
    this.formatUtilManager = applicationManager.getFormatUtilManager();
    this.navigationManager = applicationManager.getNavigationManager();
    this.lendingDashboardManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ 'moduleName': 'LendingDashboardManager', 'appName': 'TradeLendingMA' }).businessController;
    /**
     * Specifies the lending dashboard configuration.
     */
    this.lendingDashboardConfig = {
      'upcomingMaturityDaysPeriod': 90,
      'upcomingPaymentsDaysPeriod': 90,
      'loansChartStatus': {
        'Active': kony.i18n.getLocalizedString('i18n.Search.Active'),
        'Matured': kony.i18n.getLocalizedString('i18n.TradeLending.matured'),
        'Closed': kony.i18n.getLocalizedString('i18n.LocateUs.CLOSED')
      },
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
    /**
     * Specifies mock deal records.
     */
    this.dealRecords = [{
      "account": "101777",
      "shortTitle": "GBP Deal 100M",
      "currency": "GBP",
      "totalCommitment": "100000000",
      "availableCommitment": "40000000",
      "utilisedCommitment": "60000000"
    }, {
      "account": "102261",
      "shortTitle": "USD Deal 100M",
      "currency": "USD",
      "totalCommitment": "100000000",
      "availableCommitment": "40000000",
      "utilisedCommitment": "60000000"
    }, {
      "account": "102407",
      "shortTitle": "EUR Deal 50M",
      "currency": "EUR",
      "totalCommitment": "50000000",
      "availableCommitment": "0",
      "utilisedCommitment": "50000000"
    }];
    /**
     * Specifies mock facility records.
     */
    this.facilityRecords = [{
      "account": "113457",
      "shortTitle": "GBP 60M Term",
      "currency": "GBP",
      "totalCommitment": "60000000",
      "availableCommitment": "0",
      "utilisedCommitment": "60000000",
      "dealId": "101777"
    }, {
      "account": "117986",
      "shortTitle": "GBP 40M Term",
      "currency": "GBP",
      "totalCommitment": "40000000",
      "availableCommitment": "0",
      "utilisedCommitment": "40000000",
      "dealId": "101777"
    }, {
      "account": "112909",
      "shortTitle": "USD 60M Term",
      "currency": "USD",
      "totalCommitment": "60000000",
      "availableCommitment": "0",
      "utilisedCommitment": "60000000",
      "dealId": "102261"
    }, {
      "account": "117455",
      "shortTitle": "USD 20M Term",
      "currency": "USD",
      "totalCommitment": "20000000",
      "availableCommitment": "0",
      "utilisedCommitment": "20000000",
      "dealId": "102261"
    }, {
      "account": "117675",
      "shortTitle": "USD 20M Term",
      "currency": "USD",
      "totalCommitment": "20000000",
      "availableCommitment": "0",
      "utilisedCommitment": "20000000",
      "dealId": "102261"
    }, {
      "account": "112645",
      "shortTitle": "EUR 50M Revolving",
      "currency": "EUR",
      "totalCommitment": "50000000",
      "availableCommitment": "20000000",
      "utilisedCommitment": "30000000",
      "dealId": "102407"
    }, {
      "account": "117836",
      "shortTitle": "GBP 60M Term",
      "currency": "GBP",
      "totalCommitment": "60000000",
      "availableCommitment": "10000000",
      "utilisedCommitment": "50000000"
    }, {
      "account": "115637",
      "shortTitle": "GBP 40M Term",
      "currency": "GBP",
      "totalCommitment": "40000000",
      "availableCommitment": "20000000",
      "utilisedCommitment": "20000000"
    }, {
      "account": "121935",
      "shortTitle": "USD 60M Term",
      "currency": "USD",
      "totalCommitment": "60000000",
      "availableCommitment": "5000000",
      "utilisedCommitment": "55000000"
    }, {
      "account": "123878",
      "shortTitle": "USD 20M Term",
      "currency": "USD",
      "totalCommitment": "20000000",
      "availableCommitment": "10000000",
      "utilisedCommitment": "10000000"
    }, {
      "account": "112845",
      "shortTitle": "USD 20M Term",
      "currency": "USD",
      "totalCommitment": "20000000",
      "availableCommitment": "12000000",
      "utilisedCommitment": "8000000"
    }];
    /**
     * Specifies mock loan records.
     */
    this.loanRecords = [{
      "account": "120804",
      "shortTitle": "GBP 60M Drawings",
      "currency": "GBP",
      "totalCommitment": "60000000",
      "availableCommitment": "0",
      "utilisedCommitment": "60000000",
      "facilityId": "113457",
      "status": "Active",
      "startDate": "06/13/2023",
      "dueDate": "03/03/2024",
      "maturityDate": "06/13/2028",
      "product": "LIBOR Drawing",
      "borrowerName": "Boeing",
      "totalInterest": "309715",
      "totalTaxes": "11070",
      "totalCharges": "39980",
      "dueAmount": "2000",
      "type": "Facility"
    }, {
      "account": "123218",
      "shortTitle": "GBP 40M Drawings",
      "currency": "GBP",
      "totalCommitment": "40000000",
      "availableCommitment": "0",
      "utilisedCommitment": "40000000",
      "facilityId": "117986",
      "status": "Active",
      "startDate": "04/08/2023",
      "dueDate": "03/03/2024",
      "maturityDate": "04/08/2028",
      "product": "LIBOR Drawing",
      "borrowerName": "Boeing",
      "totalInterest": "312658",
      "totalTaxes": "46304",
      "totalCharges": "38156",
      "dueAmount": "2000",
      "type": "Facility"
    }, {
      "account": "120478",
      "shortTitle": "USD 60M Drawings",
      "currency": "USD",
      "totalCommitment": "60000000",
      "availableCommitment": "0",
      "utilisedCommitment": "60000000",
      "facilityId": "112909",
      "status": "Active",
      "startDate": "11/01/2023",
      "dueDate": "03/03/2024",
      "maturityDate": "11/01/2028",
      "product": "LIBOR Drawing",
      "borrowerName": "Dell Computer",
      "totalInterest": "382171",
      "totalTaxes": "25794",
      "totalCharges": "56738",
      "dueAmount": "2000",
      "type": "Facility"
    }, {
      "account": "125647",
      "shortTitle": "USD 20M Drawings",
      "currency": "USD",
      "totalCommitment": "20000000",
      "availableCommitment": "0",
      "utilisedCommitment": "20000000",
      "facilityId": "117455",
      "status": "Active",
      "startDate": "04/27/2023",
      "dueDate": "03/03/2024",
      "maturityDate": "04/27/2028",
      "product": "Euribor Drawing",
      "borrowerName": "Coca-Cola",
      "totalInterest": "158362",
      "totalTaxes": "38325",
      "totalCharges": "57253",
      "dueAmount": "2000",
      "type": "Facility"
    }, {
      "account": "127584",
      "shortTitle": "USD 10M Drawings",
      "currency": "USD",
      "totalCommitment": "10000000",
      "availableCommitment": "0",
      "utilisedCommitment": "10000000",
      "facilityId": "117675",
      "status": "Active",
      "startDate": "06/19/2023",
      "dueDate": "03/03/2024",
      "maturityDate": "06/19/2028",
      "product": "Fixed Rate Drawing",
      "borrowerName": "Dell Computer",
      "totalInterest": "349560",
      "totalTaxes": "43752",
      "totalCharges": "40812",
      "dueAmount": "2000",
      "type": "Facility"
    }, {
      "account": "127856",
      "shortTitle": "USD 10M Drawings",
      "currency": "USD",
      "totalCommitment": "10000000",
      "availableCommitment": "0",
      "utilisedCommitment": "10000000",
      "facilityId": "117675",
      "status": "Active",
      "startDate": "12/25/2023",
      "dueDate": "03/03/2024",
      "maturityDate": "12/25/2028",
      "product": "Fixed Rate Drawing",
      "borrowerName": "Coca-Cola",
      "totalInterest": "445135",
      "totalTaxes": "54637",
      "totalCharges": "40441",
      "dueAmount": "2000",
      "type": "Facility"
    }, {
      "account": "122786",
      "shortTitle": "EUR 30M Drawings",
      "currency": "EUR",
      "totalCommitment": "30000000",
      "availableCommitment": "0",
      "utilisedCommitment": "30000000",
      "facilityId": "112645",
      "status": "Active",
      "startDate": "04/23/2023",
      "dueDate": "03/03/2024",
      "maturityDate": "04/23/2028",
      "product": "LIBOR Drawing",
      "borrowerName": "British Gas",
      "totalInterest": "127211",
      "totalTaxes": "52843",
      "totalCharges": "28201",
      "dueAmount": "2000",
      "type": "Facility"
    }, {
      "account": "120812",
      "shortTitle": "GBP 60M Drawings",
      "currency": "GBP",
      "totalCommitment": "50000000",
      "availableCommitment": "0",
      "utilisedCommitment": "50000000",
      "facilityId": "117836",
      "status": "Closed",
      "startDate": "10/25/2023",
      "dueDate": "03/03/2024",
      "maturityDate": "10/25/2028",
      "product": "LIBOR Drawing",
      "borrowerName": "Havel Technologies",
      "totalInterest": "426409",
      "totalTaxes": "15851",
      "totalCharges": "49899",
      "dueAmount": "2000",
      "type": "Facility"
    }, {
      "account": "120814",
      "shortTitle": "GBP 40M Drawings",
      "currency": "GBP",
      "totalCommitment": "20000000",
      "availableCommitment": "0",
      "utilisedCommitment": "20000000",
      "facilityId": "115637",
      "status": "Matured",
      "startDate": "07/16/2023",
      "dueDate": "03/03/2024",
      "maturityDate": "07/16/2028",
      "product": "LIBOR Drawing",
      "borrowerName": "Banca d'Italia",
      "totalInterest": "293494",
      "totalTaxes": "40555",
      "totalCharges": "52404",
      "dueAmount": "2000",
      "type": "Facility"
    }, {
      "account": "120816",
      "shortTitle": "USD 60M Drawings",
      "currency": "USD",
      "totalCommitment": "55000000",
      "availableCommitment": "0",
      "utilisedCommitment": "55000000",
      "facilityId": "121935",
      "status": "Matured",
      "startDate": "05/31/2023",
      "dueDate": "03/03/2024",
      "maturityDate": "05/31/2028",
      "product": "Fixed Rate Drawing",
      "borrowerName": "Coca-Cola",
      "totalInterest": "510641",
      "totalTaxes": "52551",
      "totalCharges": "44221",
      "dueAmount": "2000",
      "type": "Facility"
    }, {
      "account": "120818",
      "shortTitle": "USD 20M Drawings",
      "currency": "USD",
      "totalCommitment": "10000000",
      "availableCommitment": "0",
      "utilisedCommitment": "10000000",
      "facilityId": "123878",
      "status": "Matured",
      "startDate": "05/01/2023",
      "dueDate": "03/03/2024",
      "maturityDate": "05/01/2028",
      "product": "Fixed Rate Drawing",
      "borrowerName": "Ford Automobiles",
      "totalInterest": "501688",
      "totalTaxes": "27659",
      "totalCharges": "51316",
      "dueAmount": "2000",
      "type": "Facility"
    }, {
      "account": "120820",
      "shortTitle": "USD 20M Drawings",
      "currency": "USD",
      "totalCommitment": "8000000",
      "availableCommitment": "0",
      "utilisedCommitment": "8000000",
      "facilityId": "112845",
      "status": "Closed",
      "startDate": "05/26/2023",
      "dueDate": "03/03/2024",
      "maturityDate": "05/26/2028",
      "product": "Fixed Rate Drawing",
      "borrowerName": "Coca-Cola",
      "totalInterest": "273451",
      "totalTaxes": "25726",
      "totalCharges": "36626",
      "dueAmount": "2000",
      "type": "Facility"
    }];
    /**
     * Specifies mock upcoming maturity records.
     */
    this.upcomingMaturityRecords = [{
      "account": "118362",
      "product": "LIBOR Drawing",
      "loanAmount": "37326272",
      "maturityDate": "04/09/2028",
      "currency": "USD"
    }, {
      "account": "118378",
      "product": "LIBOR Drawing",
      "loanAmount": "45704686",
      "maturityDate": "10/10/2027",
      "currency": "USD"
    }, {
      "account": "119245",
      "product": "Fixed Rate Drawing",
      "loanAmount": "28350345",
      "maturityDate": "11/19/2026",
      "currency": "USD"
    }, {
      "account": "119253",
      "product": "LIBOR Drawing",
      "loanAmount": "27679004",
      "maturityDate": "06/14/2027",
      "currency": "USD"
    }, {
      "account": "119261",
      "product": "Euribor Drawing",
      "loanAmount": "40423226",
      "maturityDate": "10/23/2027",
      "currency": "USD"
    }, {
      "account": "119277",
      "product": "Fixed Rate Drawing",
      "loanAmount": "40043868",
      "maturityDate": "04/29/2028",
      "currency": "USD"
    }, {
      "account": "119288",
      "product": "Fixed Rate Drawing",
      "loanAmount": "12432670",
      "maturityDate": "09/28/2027",
      "currency": "USD"
    }, {
      "account": "119307",
      "product": "Euribor Drawing",
      "loanAmount": "48638608",
      "maturityDate": "04/09/2026",
      "currency": "USD"
    }, {
      "account": "119334",
      "product": "LIBOR Drawing",
      "loanAmount": "32958230",
      "maturityDate": "08/08/2028",
      "currency": "USD"
    }, {
      "account": "119423",
      "product": "Fixed Rate Drawing",
      "loanAmount": "26948967",
      "maturityDate": "09/24/2027",
      "currency": "USD"
    }, {
      "account": "119636",
      "product": "LIBOR Drawing",
      "loanAmount": "34126688",
      "maturityDate": "01/05/2028",
      "currency": "USD"
    }, {
      "account": "119733",
      "product": "LIBOR Drawing",
      "loanAmount": "42875607",
      "maturityDate": "07/17/2027",
      "currency": "USD"
    }, {
      "account": "119776",
      "product": "LIBOR Drawing",
      "loanAmount": "55679602",
      "maturityDate": "11/20/2027",
      "currency": "USD"
    }, {
      "account": "119814",
      "product": "LIBOR Drawing",
      "loanAmount": "19685880",
      "maturityDate": "02/03/2026",
      "currency": "USD"
    }, {
      "account": "119873",
      "product": "Fixed Rate Drawing",
      "loanAmount": "45245859",
      "maturityDate": "02/17/2028",
      "currency": "USD"
    }, {
      "account": "119881",
      "product": "LIBOR Drawing",
      "loanAmount": "26506087",
      "maturityDate": "07/23/2026",
      "currency": "USD"
    }, {
      "account": "119897",
      "product": "Euribor Drawing",
      "loanAmount": "50301528",
      "maturityDate": "08/04/2027",
      "currency": "USD"
    }, {
      "account": "119903",
      "product": "Fixed Rate Drawing",
      "loanAmount": "39462700",
      "maturityDate": "11/02/2027",
      "currency": "USD"
    }, {
      "account": "119911",
      "product": "Fixed Rate Drawing",
      "loanAmount": "50795427",
      "maturityDate": "04/09/2028,",
      "currency": "USD"
    }];
    /**
     * Specifies mock upcoming payment records.
     */
    this.upcomingPaymentRecords = [{
      "account": "119946",
      "product": "Term Facility",
      "type": "Facility ",
      "dueDate": "10/05/2024",
      "dueAmount": "368655",
      "currency": "USD",
      "totalCommitment": "52357621",
      "totalInterest": "309715",
      "totalTaxes": "39980",
      "totalCharges": "11070"
    }, {
      "account": "119954",
      "product": "Term Facility",
      "type": "Facility ",
      "dueDate": "12/01/2024",
      "dueAmount": "253180",
      "currency": "USD",
      "totalCommitment": "10815911",
      "totalInterest": "312658",
      "totalTaxes": "38156",
      "totalCharges": "46304"
    }, {
      "account": "119962",
      "product": "Term Facility",
      "type": "Facility ",
      "dueDate": "10/01/2024",
      "dueAmount": "459723",
      "currency": "USD",
      "totalCommitment": "18124277",
      "totalInterest": "382171",
      "totalTaxes": "56738",
      "totalCharges": "25794"
    }, {
      "account": "119978",
      "product": "Term Facility",
      "type": "Facility ",
      "dueDate": "02/24/2024",
      "dueAmount": "284356",
      "currency": "USD",
      "totalCommitment": "38707902",
      "totalInterest": "158362",
      "totalTaxes": "57253",
      "totalCharges": "38325"
    }, {
      "account": "119989",
      "product": "Term Facility",
      "type": "Facility ",
      "dueDate": "11/13/2024",
      "dueAmount": "145103",
      "currency": "USD",
      "totalCommitment": "54612031",
      "totalInterest": "349560",
      "totalTaxes": "40812",
      "totalCharges": "43752"
    }, {
      "account": "119997",
      "product": "Term Facility",
      "type": "Facility ",
      "dueDate": "02/03/2024",
      "dueAmount": "290474",
      "currency": "USD",
      "totalCommitment": "43115069",
      "totalInterest": "445135",
      "totalTaxes": "40441",
      "totalCharges": "54637"
    }, {
      "account": "120006",
      "product": "LIBOR Drawing",
      "type": "Loan",
      "dueDate": "10/29/2024",
      "dueAmount": "332654",
      "currency": "USD",
      "totalCommitment": "53648076",
      "totalInterest": "127211",
      "totalTaxes": "28201",
      "totalCharges": "52843"
    }, {
      "account": "120014",
      "product": "Fixed Rate Drawing",
      "type": "Loan",
      "dueDate": "07/24/2024",
      "dueAmount": "387886",
      "currency": "USD",
      "totalCommitment": "23822681",
      "totalInterest": "426409",
      "totalTaxes": "49899",
      "totalCharges": "15851"
    }, {
      "account": "120022",
      "product": "Fixed Rate Drawing",
      "type": "Loan",
      "dueDate": "10/13/2024",
      "dueAmount": "145017",
      "currency": "USD",
      "totalCommitment": "58196191",
      "totalInterest": "293494",
      "totalTaxes": "52404",
      "totalCharges": "40555"
    }, {
      "account": "120038",
      "product": "Fixed Rate Drawing",
      "type": "Loan",
      "dueDate": "06/26/2024",
      "dueAmount": "211649",
      "currency": "USD",
      "totalCommitment": "52985239",
      "totalInterest": "510641",
      "totalTaxes": "44221",
      "totalCharges": "52551"
    }, {
      "account": "120049",
      "product": "LIBOR Drawing",
      "type": "Loan",
      "dueDate": "08/21/2024",
      "dueAmount": "526949",
      "currency": "USD",
      "totalCommitment": "42234524",
      "totalInterest": "501688",
      "totalTaxes": "51316",
      "totalCharges": "27659"
    }, {
      "account": "120057",
      "product": "Fixed Rate Drawing",
      "type": "Loan",
      "dueDate": "09/18/2024",
      "dueAmount": "208273",
      "currency": "USD",
      "totalCommitment": "20465034",
      "totalInterest": "273451",
      "totalTaxes": "36626",
      "totalCharges": "25726"
    }, {
      "account": "120065",
      "product": "Euribor Drawing",
      "type": "Loan",
      "dueDate": "10/27/2024",
      "dueAmount": "215065",
      "currency": "USD",
      "totalCommitment": "11496209",
      "totalInterest": "566097",
      "totalTaxes": "51239",
      "totalCharges": "36105"
    }, {
      "account": "120073",
      "product": "Fixed Rate Drawing",
      "type": "Loan",
      "dueDate": "09/20/2024",
      "dueAmount": "526532",
      "currency": "USD",
      "totalCommitment": "58212852",
      "totalInterest": "197865",
      "totalTaxes": "14378",
      "totalCharges": "33840"
    }, {
      "account": "120081",
      "product": "Euribor Drawing",
      "type": "Loan",
      "dueDate": "10/07/2024",
      "dueAmount": "293345",
      "currency": "USD",
      "totalCommitment": "15326690",
      "totalInterest": "262864",
      "totalTaxes": "23602",
      "totalCharges": "57187"
    }, {
      "account": "120097",
      "product": "Euribor Drawing",
      "type": "Loan",
      "dueDate": "03/21/2024",
      "dueAmount": "556402",
      "currency": "USD",
      "totalCommitment": "11481618",
      "totalInterest": "206921",
      "totalTaxes": "18606",
      "totalCharges": "15231"
    }, {
      "account": "120103",
      "product": "Fixed Rate Drawing",
      "type": "Loan",
      "dueDate": "03/03/2024",
      "dueAmount": "111475",
      "currency": "USD",
      "totalCommitment": "37572456",
      "totalInterest": "150794",
      "totalTaxes": "51033",
      "totalCharges": "23443"
    }, {
      "account": "120127",
      "product": "LIBOR Drawing",
      "type": "Loan",
      "dueDate": "08/23/2024",
      "dueAmount": "454750",
      "currency": "USD",
      "totalCommitment": "27046138",
      "totalInterest": "111391",
      "totalTaxes": "18036",
      "totalCharges": "29758"
    }, {
      "account": "120138",
      "product": "Fixed Rate Drawing",
      "type": "Loan",
      "dueDate": "01/26/2024",
      "dueAmount": "385085",
      "currency": "USD",
      "totalCommitment": "45617566",
      "totalInterest": "384498",
      "totalTaxes": "22956",
      "totalCharges": "31012"
    }];
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(LDPresentationController, kony.mvc.Presentation.BasePresenter);

  /**
   * Overridden Method of kony.mvc.Presentation.BasePresenter
   * This method gets called when presentation controller gets initialized
   * @method
   */
  LDPresentationController.prototype.initializeLDPresentationController = function () { };
  /**
   * Entry Point method for Lending Dashboard module.
   * @param {object} params - Contains info to load the screen.
   */
  LDPresentationController.prototype.loadScreenWithContext = function (params) {
    switch (params.context) {
      case 'lendingDashboard':
        this.showView({ 'form': 'frmLendingDashboard' });
        break;
      case 'rolloverRequest':
        this.showView({ 'form': 'frmRolloverRequest' });
        break;
    }
  };
  /**
   * Shows a particular form.
   * @param {object} param0 - Contains info to load the particular form.
   */
  LDPresentationController.prototype.showView = function ({ appName, form, data }) {
    if (kony.application.getCurrentForm().id !== form) {
      const navObj = {
        'appName': appName || 'TradeLendingMA',
        'friendlyName': form
      };
      this.navigationManager.navigateTo(navObj);
    }
    if (!TLUtils.isEmptyNullOrUndefined(data)) {
      this.navigationManager.updateForm(data, form);
    }
  };
  /**
   * Shows the loading indicator.
   */
  LDPresentationController.prototype.showProgressBar = function () {
    this.navigationManager.updateForm({
      'isLoading': true
    });
  };
  /**
   * Hides the loading indicator.
   */
  LDPresentationController.prototype.hideProgressBar = function () {
    this.navigationManager.updateForm({
      'isLoading': false
    });
  };
  /**
   * Method to handle service failure.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Contains the error info.
   */
  LDPresentationController.prototype.commonServiceFailureMethod = function ({ form, method }, response) {
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
   * Retrieves the balances (deals, facilitites and loans).
   */
  LDPresentationController.prototype.getBalances = function (form) {
    const deals = JSON.parse(JSON.stringify(this.dealRecords)),
      facilities = JSON.parse(JSON.stringify(this.facilityRecords)),
      loans = JSON.parse(JSON.stringify(this.loanRecords));

    deals.forEach(d => {
      d['totalCommitment'] = parseFloat(d.totalCommitment);
      d['availableCommitment'] = parseFloat(d.availableCommitment);
      d['utilisedCommitment'] = parseFloat(d.utilisedCommitment);
      d['facilities'] = facilities.reduce((acc, obj) => {
        if (obj.dealId === d.account) {
          obj['totalCommitment'] = parseFloat(obj.totalCommitment);
          obj['availableCommitment'] = parseFloat(obj.availableCommitment);
          obj['utilisedCommitment'] = parseFloat(obj.utilisedCommitment);
          obj['dealNameWithId'] = `${d.account} / ${d.shortTitle}`;
          acc.push(obj);
        }
        return acc;
      }, []);
    });

    facilities.forEach(f => {
      f['totalCommitment'] = parseFloat(f.totalCommitment);
      f['availableCommitment'] = parseFloat(f.availableCommitment);
      f['utilisedCommitment'] = parseFloat(f.utilisedCommitment);
      f['loans'] = loans.reduce((acc, obj) => {
        if (obj.facilityId === f.account) {
          obj['totalCommitment'] = parseFloat(obj.totalCommitment);
          obj['availableCommitment'] = parseFloat(obj.availableCommitment);
          obj['utilisedCommitment'] = parseFloat(obj.utilisedCommitment);
          acc.push(obj);
        }
        return acc;
      }, []);
    });

    this.showView({
      form,
      'data': {
        'balances': {
          deals,
          facilities
        }
      }
    });
  };
  /**
   * Retrieves the loans.
   */
  LDPresentationController.prototype.getMyLoans = function (form) {
    this.showView({
      form,
      'data': {
        'myLoans': this.loanRecords
      }
    });
  };
  /**
   * Retrieves the upcoming maturity loans.
   */
  LDPresentationController.prototype.getUpcomingMaturityLoans = function (form) {
    this.showView({
      form,
      'data': {
        'upcomingMaturity': this.upcomingMaturityRecords
      }
    });
  };
  /**
   * Retrieves the upcoming loan payments.
   */
  LDPresentationController.prototype.getUpcomingLoanPayments = function (form) {
    this.showView({
      form,
      'data': {
        'upcomingPayments': this.upcomingPaymentRecords
      }
    });
  };
  /**
   * Submits the rollover request.
   * @param {object} params - Specifies the parameters.
   * @param {string} form - Specifies the form id.
   */
  LDPresentationController.prototype.submitRolloverRequest = function (params, form) {
    this.showProgressBar();
    this.lendingDashboardManager.submitRolloverRequest(params, this.submitRolloverRequestSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, { form }));
  };
  /**
   * Success callback for submit rollover request.
   * @param {string} form - Specifies the form id.
   * @param {object} response - Specifies the success response.
   */
  LDPresentationController.prototype.submitRolloverRequestSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView({
      form,
      'data': {
        'rolloverRequestSuccess': response
      }
    });
  };
  return LDPresentationController;
});
