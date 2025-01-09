define(['CommonUtilities', 'ViewConstants', 'OLBConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, ViewConstants, OLBConstants, FormControllerUtility, CampaignUtility) {
  /**
   * User defined presentation controller
   * @constructor
   * @extends kony.mvc.Presentation.BasePresenter
   */
  function PresentationController() {
    this.fileDetails = {
      fileName: '',
      fileId: '',
      category: '',
      uploadedTimeStamp: ''
    };
    this.navigationManager = applicationManager.getNavigationManager();
    this.configurationManager = applicationManager.getConfigurationManager();
    this.formatUtilManager = applicationManager.getFormatUtilManager();
    this.importLCManager = applicationManager.getImportLCManager();
    this.importLCConfig = {
      'currencies': {
        'USD': `USD ${this.configurationManager.getCurrency('USD')}`,
        'YER': `YER ${this.configurationManager.getCurrency('YER')}`,
        'SAR': `SAR ${this.configurationManager.getCurrency('SAR')}`,
        'EUR': `EUR ${this.configurationManager.getCurrency('EUR')}`
      },
      'chartFilter': {
        '7': `7 ${kony.i18n.getLocalizedString('i18n.TradeFinance.days')}`,
        '14': `14 ${kony.i18n.getLocalizedString('i18n.TradeFinance.days')}`,
        '30': `1 ${kony.i18n.getLocalizedString('i18n.AccountsDetails.month')}`
      },
      'recentLCLimit': 2,
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
          'text': kony.i18n.getLocalizedString('i18n.common.Download')
      },
      {
          'id': 'print',
          'src': 'print_blue.png',
          'text': kony.i18n.getLocalizedString('i18n.accounts.print')
      },
      {
          'id': 'raiseQuery',
          'src': 'menu_messages_1.png',
          'text': 'Raise a Query'
      }
    ];
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
   * Overridden Method of kony.mvc.Presentation.BasePresenter
   * This method gets called when presentation controller gets initialized
   * @method
   */
  PresentationController.prototype.initializePresentationController = function () {

  };

  /**
   * Method to fetch Amend Data
   */
  PresentationController.prototype.submitAmendData = function (params) {
    params.creditAmount = params.creditAmount ? String(Number(params.creditAmount)) : "";
    params.lcAmount = params.lcAmount ? String(Number(params.lcAmount)) : "";
    params.newLcAmount = params.newLcAmount ? String(Number(params.newLcAmount)) : "";
    var finalData = {
      "lcReferenceNo": params.lcReferenceNo,
      "lcAmount": params.newLcAmount,
      "lcCurrency": params.lcCurrency,
      "paymentTerms": params.paymentTerms,
      "issueDate": params.issueDate,
      "expiryDate": params.expiryDate,
      "amendmentExpiryDate": params.amendmentExpiryDate ? params.amendmentExpiryDate : "",
      "chargesAccount": params.chargesAccount ? params.chargesAccount : "",
      "chargesPaid": params.chargesPaid,
      "creditAmount": params.lcAmount,
      "beneficiaryName": params.beneficiaryName,
      "latestShippingDate": params.latestShippingDate ? params.latestShippingDate : "",
      "presentationPeriod": params.presentationPeriod ? params.presentationPeriod : "",
      "amountType": params.amountType ? params.amountType : "",
      "otherAmendments": params.otherAmendments ? params.otherAmendments : "",
      "amendCharges": params.amendCharges ? params.amendCharges : "",
      "amendStatus": "New",
      "lcSRMSId": params.srmsReqOrderID
    };
    if (applicationManager.getConfigurationManager().isMicroAppPresent("TradeFinanceMA")) {
      applicationManager.getImportLCManager().createImportLCAmendment(finalData, this.createImportLCAmendmentSuccess.bind(this), this.createImportLCAmendmentError.bind(this));
    }
  };

  /**
   * Method to execute after success call back of submitAmendData
   */
  PresentationController.prototype.createImportLCAmendmentSuccess = function (data) {
    applicationManager.getNavigationManager().updateForm({
      importLCAmendSuccess: data
    }, "frmImportLCAmendReviewAndAcknowledgement");

  };
  /**
   * Method to execute after error call back of submitAmendData
   */
  PresentationController.prototype.createImportLCAmendmentError = function (response) {
    applicationManager.getNavigationManager().updateForm({
      importLCAmendSuccess: response
    }, "frmImportLCAmendReviewAndAcknowledgement");
  };
  PresentationController.prototype.displayAmendData = function (args, formName) {
    var scope = this;
    var params = {
      "amendmentReference": args.amendmentReference
    };
    if (applicationManager.getConfigurationManager().isMicroAppPresent("TradeFinanceMA")) {
      applicationManager.getImportLCManager().createImportLCAmendmentDetails(params, this.createImportLCAmendmentDetailsSuccess.bind(this, formName), this.createImportLCAmendmentDetailsError.bind(this, formName));
    }
  };
  PresentationController.prototype.createImportLCAmendmentDetailsSuccess = function (formName, unformattedData) {
    var scope = this;
    var data = scope.formatAmendData(unformattedData);
    applicationManager.getNavigationManager().updateForm({
      importLCAmendSuccess: data
    }, formName);
  };
  PresentationController.prototype.createImportLCAmendmentDetailsError = function (formName, response) {
    applicationManager.getNavigationManager().updateForm({
      importLCAmendError: response
    }, formName);
  };
  PresentationController.prototype.getLOCByID = function (args, formName) {
    var scope = this;
    var params = {
      "srmsReqOrderID": args.lcSRMSId
    };
    if (applicationManager.getConfigurationManager().isMicroAppPresent("TradeFinanceMA")) {
      applicationManager.getImportLCManager().viewLCDetails(params, this.getLOCByIDSuccess.bind(this, args, formName), this.getLOCByIDError.bind(this, formName));
    }
  };
  PresentationController.prototype.getLOCByIDSuccess = function (params, formName, unformattedData) {
    var scope= this;
    var data = scope.formatLOCData(unformattedData.LetterOfCredits[0]);
    data.isAmendBackEvent = params.isAmendBackEvent ? params.isAmendBackEvent : "";
    new kony.mvc.Navigation({ "appName": "TradeFinanceMA", "friendlyName": formName}).navigate(data);
  };
  PresentationController.prototype.getLOCByIDError = function (formName, response) {
    new kony.mvc.Navigation({ "appName": "TradeFinanceMA", "friendlyName": formName}).navigate(response);
  };
  PresentationController.prototype.downloadsAmendmentsByID = function (args, formName) {
    var scope = this;
    var params = {
      "srmsReqOrderID": args.lcSRMSId
    };
    if(!kony.sdk.isNullOrUndefined(args.amendmentReference)){
      params = {
        "amendmentReference": args.amendmentReference
      };
    }
    if (applicationManager.getConfigurationManager().isMicroAppPresent("TradeFinanceMA")) {
      applicationManager.getImportLCManager().amendmentsDownloadByID(params, this.downloadAmendmnetSucess.bind(this, formName), this.downloadAmendmentError.bind(this, formName));
    }
  };
  PresentationController.prototype.downloadAmendmnetSucess = function (formName, data) {
    applicationManager.getNavigationManager().updateForm({
      downloadAmendmendDetailsSuccess: response
    }, formName);
  };
  PresentationController.prototype.downloadAmendmentError = function (formName, response) {
    applicationManager.getNavigationManager().updateForm({
      downloadAmendmendDetailsError: response
    }, formName);
  };
  PresentationController.prototype.navigateToForm = function (appName, form, data) {
    new kony.mvc.Navigation({ "appName": appName, "friendlyName": form}).navigate(data);
  };
  PresentationController.prototype.formatAmendData = function(data){
    var scope = this;
    formatUtil = applicationManager.getFormatUtilManager();
    data.amendmentDate = data.amendmentDate ? CommonUtilities.getDateAndTimeInUTC(data.amendmentDate).substr(0,10) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.expiryDate = data.expiryDate ? CommonUtilities.getDateAndTimeInUTC(data.expiryDate).substr(0,10) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.latestShippingDate = data.latestShippingDate ? CommonUtilities.getDateAndTimeInUTC(data.latestShippingDate).substr(0,10) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.issueDate = data.issueDate ? CommonUtilities.getDateAndTimeInUTC(data.issueDate).substr(0,10) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.amendmentExpiryDate = data.amendmentExpiryDate ? CommonUtilities.getDateAndTimeInUTC(data.amendmentExpiryDate).substr(0,10) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.chargesAccount = data.chargesAccount ? CommonUtilities.getMaskedAccName(data.chargesAccount)[0] :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.chargesPaid = data.chargesPaid  ? formatUtil.formatAmountandAppendCurrencySymbol(data.chargesPaid, data.lcCurrency) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.lcAmount = data.lcAmount ? formatUtil.formatAmountandAppendCurrencySymbol(data.lcAmount, data.lcCurrency) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.creditAmount = data.creditAmount ? formatUtil.formatAmountandAppendCurrencySymbol(data.creditAmount, data.lcCurrency) :  kony.i18n.getLocalizedString("i18n.common.NA");    
    return data;
  };
  PresentationController.prototype.formatLOCData = function(data){
    var scope = this;
    formatUtil = applicationManager.getFormatUtilManager();
    data.additionalAmountPayable = data.additionalAmountPayable ? formatUtil.formatAmountandAppendCurrencySymbol(data.additionalAmountPayable, data.additionalPayableCurrency) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.expiryDate = data.expiryDate ? CommonUtilities.getDateAndTimeInUTC(data.expiryDate).substr(0,10) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.latestShippingDate = data.latestShippingDate ? CommonUtilities.getDateAndTimeInUTC(data.latestShippingDate).substr(0,10) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.issueDate = data.issueDate ? CommonUtilities.getDateAndTimeInUTC(data.issueDate).substr(0,10) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.maximumCreditAmount = data.maximumCreditAmount  ? formatUtil.formatAmountandAppendCurrencySymbol(data.maximumCreditAmount, data.lcCurrency) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.lcAmount = data.lcAmount ? formatUtil.formatAmountandAppendCurrencySymbol(data.lcAmount, data.lcCurrency) :  kony.i18n.getLocalizedString("i18n.common.NA");
    data.documentCharges = data.documentCharges ? formatUtil.formatAmountandAppendCurrencySymbol(data.documentCharges, data.lcCurrency) :  kony.i18n.getLocalizedString("i18n.common.NA");

    return data;
  };
  PresentationController.prototype.showImportLCScreen = function (params) {
    switch (params.context) {
      case 'viewImportLoC':
        this.getLOCByID({lcSRMSId: params.data.transactionReference}, "ImportLCUIModule/frmImportLCDetails");
        break;
      case 'viewDrawing':
        break;
      case 'viewAmendment':
        this.displayAmendData(params.data, "ImportLCUIModule/frmLCAmendment");
        break;
    }
  };
  PresentationController.prototype.getFileResponse = function (params, form, record) {
    this.fileDetails = {
      fileName: params.fileName, 
      fileId: params.fileId,
      category: record.category,
      uploadedTimeStamp: record.uploadedTimeStamp,
    };
    var ExportLCManager = applicationManager.getExportLCManager();
    ExportLCManager.fetchFileResponse(params, this.getFileResponseSuccess.bind(this, form), this.getFileResponseFailure.bind(this, form));
  };
  PresentationController.prototype.getFileResponseSuccess = function (form, response) {
      applicationManager.getNavigationManager().updateForm({
        response
      }, form);
  };
  PresentationController.prototype.getFileResponseFailure = function (form, response) {
      applicationManager.getNavigationManager().updateForm({
        serverError: response
      }, form);
  };

  PresentationController.prototype.showMessagesScreen = function (params) {
    const messagesPresenter = applicationManager.getModulesPresentationController({
      appName: 'SecureMessageMA',
      moduleName: 'AlertsMsgsUIModule'
    });
    let contextObj = {};
    params.Category = "RCID_TF_LETTEROFCREDIT";
    contextObj.record = params;
    contextObj.show = "CreateNewMessage"
    contextObj.cancelCallback = false;
    params.tradeModule = true;
    messagesPresenter.showAlertsPage("Trade Finance Import LC", contextObj);
  };
  /**
   * Method to show a particular form
   * @param {object} param0 - contains info to load the particular form
   */
  PresentationController.prototype.showView = function ({ appName, form, data }) {
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
  PresentationController.prototype.isEmptyNullOrUndefined = function (data) {
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
  PresentationController.prototype.commonServiceFailureMethod = function (form, response) {
    kony.application.dismissLoadingScreen();
    this.showView({
      form,
      data: {
        serverError: response.errmsg || response.errorMessage
      }
    });
  };
  PresentationController.prototype.getImportLetterOfCredits = function (params, form) {
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    this.importLCManager.fetchImportLetterOfCredits(params, this.getImportLetterOfCreditsSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, form));
  };
  PresentationController.prototype.getImportLetterOfCreditsSuccess = function (form, response) {
    kony.application.dismissLoadingScreen();
    this.showView({
      form,
      data: response
    });
  };
  return PresentationController;
});