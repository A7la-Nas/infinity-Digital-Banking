define(['DataFormattingUtils/FormatUtils', 'CommonUtilities', 'OLBConstants'], function (FormatUtils, CommonUtilities, OLBConstants) {
  /**
   * User defined presentation controller
   * @constructor
   * @extends kony.mvc.Presentation.BasePresenter
   */
  function ExportLCPresentationController() {
    this.navigationManager = applicationManager.getNavigationManager();
    this.configurationManager = applicationManager.getConfigurationManager();
    this.formatUtilManager = applicationManager.getFormatUtilManager();
    this.asyncManager = applicationManager.getAsyncManager();
    this.exportLCManager = applicationManager.getExportLCManager();
    this.exportLCConfig = {
      'documentsLimit': 20,
      'documentMaxSize': 25000000,
      'fileExtensions': {
        'pdf': 'pdf_image.png',
        'jpeg': 'jpeg_image.png',
        'doc': 'word.png',
        'docx': 'word.png',
        'xlsx': 'excel.png',
        'bmp': 'png.png',
        'zip': 'zip.png'
      },
      'recentLCLimit': 2,
      'graphCurrencyFilters': {
        'USD': `USD-${this.configurationManager.getCurrency('USD')}`,
        'EUR': `EUR-${this.configurationManager.getCurrency('EUR')}`
      },
      'graphDurationFilters': {
        '7': `7 ${kony.i18n.getLocalizedString('i18n.TradeFinance.days')}`,
        '14': `14 ${kony.i18n.getLocalizedString('i18n.TradeFinance.days')}`,
        '30': `1 ${kony.i18n.getLocalizedString('i18n.AccountsDetails.month')}`
      }
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
    this.formatUtils = new FormatUtils();
    this.formatJSON = {
      'CUSTOM_DATE': {
        'BusinessRuleType': 'FORMAT_DATE',
        'BusinessRule': {
          'inputFormat': 'MM-DD-YYYY',
          'displayFormat': 'MM/DD/YYYY'
        }
      }
    };
    this.formatUtils.updateFormatJSON(this.formatJSON);
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
    this.metadataObject = {
      "amount": { "format": "AMOUNT", "formatting_dependency": "currency" },
      "lcAmount": { "format": "AMOUNT", "formatting_dependency": "currency" },
      "utilizedLCAmount": { "format": "AMOUNT", "formatting_dependency": "currency" },
      "drawingAmount": { "format": "AMOUNT", "formatting_dependency": "currency" },
      "totalAmount": { "format": "AMOUNT", "formatting_dependency": "currency" },
      "drawingCreatedDate": { "format": "CUSTOM_DATE" },
      "expiryDate": { "format": "CUSTOM_DATE" },
      "issueDate": { "format": "CUSTOM_DATE" },
      "latestShipmentDate": { "format": "CUSTOM_DATE" },
      "approvedDate": { "format": "CUSTOM_DATE" },
      "paymentDate": { "format": "CUSTOM_DATE" },
      "lcIssueDate": { "format": "CUSTOM_DATE" },
      "lcExpiryDate": { "format": "CUSTOM_DATE" },
      "amendmentReceivedDate": { "format": "CUSTOM_DATE" },
      "selfAcceptanceDate": { "format": "CUSTOM_DATE" },
      "selfRejectedDate": { "format": "CUSTOM_DATE" },
      "newLcAmount": { "format": "AMOUNT", "formatting_dependency": "lcCurrency" },
      "lcUpdatedOn": { "format": "CUSTOM_DATE" },
      "lcCreatedOn": { "format": "CUSTOM_DATE" }
    };
    this.LCData = {};
    this.amendmentsData = {}
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(ExportLCPresentationController, kony.mvc.Presentation.BasePresenter);

  /**
       * Overridden Method of kony.mvc.Presentation.BasePresenter
       * This method gets called when presentation controller gets initialized
       * @method
       */
  ExportLCPresentationController.prototype.initializeExportLCExportLCPresentationController = function () { };
  /**
   * Entry Point method for Export LC module
   * @param {object} context - contains info to load the screen
   */
  ExportLCPresentationController.prototype.showExportLCScreen = function (params) {
    switch (params.context) {
      case 'viewExportLoC':
        this.getExportLCsAndSwifts(params.data, params.form, this.showView.bind(this, 'frmExportLCDetails'));
        break;
      case 'viewDrawing':
        params.data.flowType = 'viewDetails';
        this.getExportDrawingSummary(params.data, params.form);
        break;
      case 'viewAmendment':
        params.data.flowType = 'viewDetails';
        this.getExportAmendmentSummary(params.data, params.form);
        break;
      case 'viewConsolidated':
        let amendParams = {
          "sortByParam": "amendmentNo",
          "sortOrder": "DESC",
          "filterByValue": params.data.exportLCId,
          "filterByParam": "exportlcSRMSRequestId"
        };
        this.getExportLCAmmendments(amendParams, params.form, this.showView.bind(this, 'frmAmendmentConsolidatedView'));
        break;
      case 'printLC':
        this.getExportLetterOfCredit(params.data.exportLCId, params.form, 'print');
        break;
      case 'printDrawing':
        params.data.flowType = 'print'
        this.getExportDrawingSummary(params.data, params.form);
        break;
      case 'printAmendment':
        params.data.flowType = 'print';
        this.getExportAmendmentSummary(params.data, params.form);
        break;
    }
  };
  ExportLCPresentationController.prototype.showProgressBar = function () {
    this.navigationManager.updateForm({
      isLoading: true
    });
  };
  ExportLCPresentationController.prototype.hideProgressBar = function () {
    this.navigationManager.updateForm({
      isLoading: false
    });
  };
  /**
    * used to show the exportLc Page and executes the particular Page.
    * @param {string} frm  used to load the form
    * @param {object}  data  used to load the particular form and having key value pair.
    */
  ExportLCPresentationController.prototype.showView = function (frm, data) {
    if (kony.application.getCurrentForm().id !== frm) {
      this.navigationManager.navigateTo(frm);
    }
    if (!this.isEmptyNullOrUndefined(data)) {
      this.navigationManager.updateForm(data, frm);
    }
  };

  ExportLCPresentationController.prototype.showMessagesScreen = function (params) {
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
    messagesPresenter.showAlertsPage("Trade Finance ExportLC", contextObj);
  };

  ExportLCPresentationController.prototype.renderI18nKeys = function (i18nKeyString, renderColon) {
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
     * Method to verify whether the value is empty, null or undefined
     * @param {any} data - value to be verified
     * @returns {boolean} - validity of the value passed
     */
  ExportLCPresentationController.prototype.isEmptyNullOrUndefined = function (data) {
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
    * Method to fetch Export Letter Of Credit
    */
  ExportLCPresentationController.prototype.getExportLetterOfCredit = function (referenceID, frm, flowType) {
    this.showProgressBar();
    let params = {
      "lcReferenceNo": referenceID
    };
    this.exportLCManager.getExportLetterOfCreditById(params, this.getExportLetterOfCreditByIdSuccess.bind(this, flowType, frm), this.getExportLetterOfCreditByIdError.bind(this, frm));
  };
  /**
    * Method to execute after success call back of getExportLetterOfCredit
    */
  ExportLCPresentationController.prototype.getExportLetterOfCreditByIdSuccess = function (flowType, frm, response) {
    this.hideProgressBar();
    if (flowType && flowType === 'print') {
      this.navigationManager.navigateTo({ 'appName': "TradeFinanceMA", 'friendlyName': "frmPrintExportDrawing" }, false, {
        'drawingSummary': response,
        printCallback: function () {
          applicationManager.getNavigationManager().navigateTo({ 'appName': 'TradeFinanceMA', 'friendlyName': 'frmExportLCDashboard' });
        }
      });
    } else {
      this.showView(frm, {
        "getExportLetterOfCredit": response
      });
    }
  };
  /**
    * Method to execute after error call back of getExportLetterOfCredit
    */
  ExportLCPresentationController.prototype.getExportLetterOfCreditByIdError = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg || response.errorMessage
    });
  };
  /**
    * Method to upload the Export Docs
    */
  ExportLCPresentationController.prototype.uploadExportLCDocuments = function (uploadedattachments, frm) {
    this.showProgressBar();
    let params = {
      "uploadedattachments": uploadedattachments
    };
    this.exportLCManager.uploadExportLCDocuments(params, this.uploadExportLCDocumentsSuccess.bind(this, frm), this.uploadExportLCDocumentsError.bind(this, frm));
  };
  /**
    * Method to execute after success call back of uploadExportLCDocuments
    */
  ExportLCPresentationController.prototype.uploadExportLCDocumentsSuccess = function (frm, response) {
    this.hideProgressBar();
    if (response && response[0].failedUploads) {
      this.showView(frm, {
        "serverError": kony.i18n.getLocalizedString('i18n.payments.unableToUploadFile')
      });
    } else {
      this.showView(frm, {
        "uploadDocuments": response
      });
    }
  };
  /**
    * Method to execute after error call back of uploadExportLCDocuments
    */
  ExportLCPresentationController.prototype.uploadExportLCDocumentsError = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg || response.errorMessage
    });
  };
  /**
    * Method to create the Export Drawing
    */
  ExportLCPresentationController.prototype.createDrawing = function (drawings, frm) {
    this.showProgressBar();
    let params = drawings.params ? drawings.params : drawings;
    this.exportLCManager.createExportLCDrawing(params, this.createDrawingSuccess.bind(this, drawings, frm), this.createDrawingError.bind(this, frm));
  };
  /**
    * Method to execute after success call back of createDrawing
    */
  ExportLCPresentationController.prototype.createDrawingSuccess = function (formData, frm, response) {
    this.hideProgressBar();
    response.formData = formData.formData;
    if (frm === 'frmExportLCDashboard') {
      this.navigationManager.navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmExportLCDashboard' }, false, { flowType: 'GetAllExportDrawings', drawings: response });
    } else {
      this.showView(frm, {
        'drawings': response
      });
    }
  };
  /**
    * Method to execute after error call back of createDrawing
   */
  ExportLCPresentationController.prototype.createDrawingError = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg || response.errorMessage || response.dbpErrMsg
    });
  };
  /**
    * Method to retrieve the documents
    */
  ExportLCPresentationController.prototype.retrieveDocuments = function (documents, frm) {
    this.showProgressBar();
    let params = {
      "documentReference": documents
    };
    this.exportLCManager.retrieveDocuments(params, this.retrieveDocumentsSuccess.bind(this, frm), this.retrieveDocumentsError.bind(this, frm));
  };
  /**
     * Method to execute after success call back of retrieveDocuments
     */
  ExportLCPresentationController.prototype.retrieveDocumentsSuccess = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "retrieveDocuments": response
    });
  };
  /**
    * Method to execute after error call back of retrieveDocuments
    */
  ExportLCPresentationController.prototype.retrieveDocumentsError = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg || response.errorMessage
    });
  };
  /**
    * Method to delete the  document
    */
  ExportLCPresentationController.prototype.deleteDocument = function (deleteParams, frm) {
    let params = {
      "documentReference": deleteParams
    };
    this.showProgressBar();
    this.exportLCManager.deleteDocument(params, this.deleteDocumentSuccess.bind(this, frm), this.deleteDocumentError.bind(this, frm));
  };
  /**
    * Method to execute after success call back of deleteDocument
    */
  ExportLCPresentationController.prototype.deleteDocumentSuccess = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "deleteDocument": response
    });
  };

  /**
    * Method to execute after error call back of deleteDocument
    */
  ExportLCPresentationController.prototype.deleteDocumentError = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg || response.errorMessage
    });
  };
  /**
  * Method to get ExportLC Drawings
  */
  ExportLCPresentationController.prototype.getExportLCDrawings = function (params, frm) {
    this.showProgressBar();
    this.exportLCManager.getExportLCDrawings(params, this.getExportLCDrawingsSuccess.bind(this, frm), this.getExportLCDrawingsError.bind(this, frm));
  };
  /**
   * Method to execute after success call back of getExportLCDrawings
   */
  ExportLCPresentationController.prototype.getExportLCDrawingsSuccess = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, response);
  };
  /**
   * Method to execute after error call back of getExportLCDrawings
   */
  ExportLCPresentationController.prototype.getExportLCDrawingsError = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg || response.errorMessage
    });
  };

  /**
 * Method to fetch Export Letter Of Credit
 */
  ExportLCPresentationController.prototype.getExportDrawingById = function (referenceID, frm) {
    this.showProgressBar();
    let params = {
      "drawingReferenceNo": referenceID
    };
    this.exportLCManager.getExportDrawingById(params, this.getExportDrawingByIdSuccess.bind(this, frm), this.getExportDrawingByIdError.bind(this, frm));
  };

  /**
   * Method to execute after success call back of getExportDrawingById
   */
  ExportLCPresentationController.prototype.getExportDrawingByIdSuccess = function (frm, response) {
    response["originalPhysicalDocuments"] = response.physicalDocuments;
    response["originalUploadedDocs"] = response.uploadedDocuments;
    // Processing Amount to be Credited response    
    let amountToBeCreditedTo = kony.i18n.getLocalizedString("i18n.common.NA");
    if ('creditAccount' in response) {
      amountToBeCreditedTo = response.creditAccount;
    } else if ('externalAccount' in response) {
      amountToBeCreditedTo = response.externalAccount;
    }
    response.amountToBeCreditedTo = amountToBeCreditedTo;
    // Processing physicalDocumentsdiscrepanc
    if ('physicalDocuments' in response) {
      let tempPhysicalDocuments = this.stringToJSON(response.physicalDocuments, frm);
      let physicalDocumentsFormatted = [];
      tempPhysicalDocuments.map(function (record) {
        let title, originals, copies;
        if (record.hasOwnProperty('title') && record.hasOwnProperty('count1') && record.hasOwnProperty('count2')) {
          title = record.title;
          originals = " (" + record.count1;
          copies = ", " + record.count2 + ")";
          physicalDocumentsFormatted.push(title + originals + copies);
        } else {
          physicalDocumentsFormatted.push(kony.i18n.getLocalizedString("i18n.common.NA"));
          response.physicalDocumentsFormatted = physicalDocumentsFormatted;
          return;
        }
      });
      response.physicalDocumentsFormatted = physicalDocumentsFormatted;
    }
    // Processing Discrepancies and Response
    if ('discrepencies' in response) {
      let discrepanciesAndResponse = [];
      discrepanciesAndResponse.push({
        lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.ReasonforReturn") + ":",
        lblRight1: response.reasonForReturn
      });
      let tempLatestDiscrepancy = JSON.parse(response.discrepencies);
      for (let i = 0; i < tempLatestDiscrepancy.length; i++) {
        Object.keys(tempLatestDiscrepancy[i]).forEach(function (key) {
          let discrepancyObj = {};
          discrepancyObj.lblLeft1 = kony.i18n.getLocalizedString("i18n.TradeFinance.Discrepancy") + " " + (i + 1) + ":";
          discrepancyObj.lblRight1 = key;
          discrepanciesAndResponse.push(discrepancyObj);
          if ('userComment' in tempLatestDiscrepancy[i][key] && tempLatestDiscrepancy[i][key].userComment.length > 0) {
            let userCommentObj = {};
            userCommentObj.lblLeft1 = kony.i18n.getLocalizedString("i18n.TradeFinance.D")
              + (i + 1)
              + " "
              + kony.i18n.getLocalizedString("i18n.TradeFinance.UserComment")
              + ":";
            userCommentObj.lblRight1 = tempLatestDiscrepancy[i][key].userComment;
            discrepanciesAndResponse.push(userCommentObj);
          }
          if ('userResponse' in tempLatestDiscrepancy[i][key] && tempLatestDiscrepancy[i][key].userResponse.length > 0) {
            let userResponseObj = {};
            userResponseObj.lblLeft1 = kony.i18n.getLocalizedString("i18n.TradeFinance.D")
              + (i + 1)
              + " "
              + kony.i18n.getLocalizedString("i18n.TradeFinance.UserResponse")
              + ":";
            userResponseObj.lblRight1 = tempLatestDiscrepancy[i][key].userResponse;
            discrepanciesAndResponse.push(userResponseObj);
          }
        });
      }
      if (response.status !== "Returned By Bank") {
        let returnMessageToBank = "";
        if ('returnMessageToBank' in response) {
          returnMessageToBank = response.returnMessageToBank;
        } else {
          returnMessageToBank = kony.i18n.getLocalizedString("i18n.common.NA");
        }
        discrepanciesAndResponse.push({
          lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnMessagetoBank") + ":",
          lblRight1: returnMessageToBank
        });
      }
      response.discrepanciesAndResponse = discrepanciesAndResponse;
    }
    // Processing Discrepancy History
    if ('discrepanciesHistory' in response) {
      let discrepanciesHistory = JSON.parse(response.discrepanciesHistory);
      let wholeDiscrepanciesHistory = [];
      for (let i = 0; i < discrepanciesHistory.length; i++) {
        // Replacing single quotes with double quotes
        let tempObj = discrepanciesHistory[i].replace(/'/g, '"');
        tempObj = JSON.parse(tempObj);
        wholeDiscrepanciesHistory.push(tempObj);
      }
      response.wholeDiscrepanciesHistory = wholeDiscrepanciesHistory;
    }
    if (response.financeBill === 'Yes') {
      response.financeBillFormatted = "Selected";
    } else {
      response.financeBillFormatted = "UnSelected";
    }
    if (response.forwardDocuments === 'Yes') {
      response.forwardDocumentsFormatted = "Selected";
    } else {
      response.forwardDocumentsFormatted = "UnSelected";
    }
    response.drawingCreatedDateFormatted = response.drawingCreatedDate ? CommonUtilities.getDateAndTimeInUTC(response.drawingCreatedDate).substr(0, 10) : kony.i18n.getLocalizedString("i18n.common.NA");
    this.hideProgressBar();
    this.showView(frm, {
      "getExportDrawing": response
    });
  };


  /**
   * Method to execute after error call back of getExportDrawingById
   */
  ExportLCPresentationController.prototype.getExportDrawingByIdError = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg
    });
  };
  /**
     * Method to delete the  Draft
     */
  ExportLCPresentationController.prototype.deleteDraft = function (deleteParams, frm) {
    this.showProgressBar();
    this.exportLCManager.deleteExportLetterOfCreditDrawing(deleteParams, this.deleteDraftSuccess.bind(this, frm), this.deleteDraftError.bind(this, frm));
  };
  /**
     * Method to execute after success call back of deleteDraft
     */
  ExportLCPresentationController.prototype.deleteDraftSuccess = function (frm, response) {
    this.hideProgressBar();
    if (frm === 'frmExportLCDashboard') {
      this.navigationManager.navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmExportLCDashboard' }, false, { flowType: 'GetAllExportDrawings', deleteDrawing: response });
    } else {
      this.showView(frm, {
        'deleteDrawing': response
      });
    }
  };
  /**
     * Method to execute after error call back of deleteDraft
     */
  ExportLCPresentationController.prototype.deleteDraftError = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg || response.errorMessage
    });
  };
  /**
   * Method to generate the export drawing file
   * @param {object} params - consist of payload to generate file
   * @param {string} frm - form name
   */
  ExportLCPresentationController.prototype.generateExportDrawing = function (params, frm) {
    this.showProgressBar();
    this.exportLCManager.generateExportDrawing(params, this.generateExportDrawingSuccess.bind(this), this.generateExportDrawingFailure.bind(this, frm));
  };
  /**
   * Success callback for generating the export drawing file
   * @param {object} response - consist fileId of generated file
   */
  ExportLCPresentationController.prototype.generateExportDrawingSuccess = function (response) {
    this.downloadGeneratedFile(response, 'Export Drawing');
    this.hideProgressBar();
  };
  /**
   * Failure callback for generating the export drawing file
   * @param {onject} response - consist of error details
   * @param {string} frm - form name
   */
  ExportLCPresentationController.prototype.generateExportDrawingFailure = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg || response.errorMessage
    });
  };
  /**
   * Method to download the generated file
   * @param {object} params - consist fileId of generated file
   */
  ExportLCPresentationController.prototype.downloadGeneratedFile = function (response, fileName) {
    const mfURL = KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url;
    const url = `${mfURL}/operations/LCSummary/downloadGeneratedAcknowledgement`;
    CommonUtilities.downloadGeneratedFile({ url, fileName, fileType: 'pdf' }, {"fileId": response.fileId});
  };

  /**
  * @api : stringToJSON
  * This method will convert String to JSON
  * @return : JSON object
  */
  ExportLCPresentationController.prototype.stringToJSON = function (stringData, frm) {
    var scope = this;
    try {
      stringData = stringData.replaceAll("'", "\"");
      return JSON.parse(stringData);
    } catch (err) {
      let errorObj = {
        "level": "ExportLcUiModulePresentationControllers",
        "method": "stringToJSON",
        "error": err
      };
      scope.onError(errorObj, frm);
    }
  };

  /**
  * @api : onError
  * Error thrown from catch block will be shown here
  * @return : NA
  */
  ExportLCPresentationController.prototype.onError = function (err, frm) {
    let errMsg = JSON.stringify(err);
    this.showView(frm, {
      "onError": errMsg
    });
  };
  /** 
   * Method to print export drawing details
   * @param {object} data - details of export drawing to be printed
   */
  ExportLCPresentationController.prototype.printExportDrawing = function (data) {
    this.navigationManager.navigateTo({ appName: "TradeFinanceMA", friendlyName: "frmPrintExportDrawing" }, false, data);
  };

  /**
   * Method to update the drawings
   * @param {object} params - consist of payload to updateDrawing
   * @param {string} frm - form name
   */
  ExportLCPresentationController.prototype.updateExportDrawings = function (drawings, frm) {
    this.showProgressBar();
    this.exportLCManager.updateExportLetterOfCreditDrawing(drawings, this.getExportDrawingByIdSuccess.bind(this, frm), this.updateDrawingError.bind(this, frm));
  };

  /**
  * Method to execute after error call back of updateDrawing

  */
  ExportLCPresentationController.prototype.updateDrawingError = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": !kony.sdk.isNullOrUndefined(response.serverErrorRes.dbpErrMsg) ? response.serverErrorRes.dbpErrMsg : response.errorMessage
    });
  };

  /**
   * Method to fetch Export AmendmentDetailsByID
   */
  ExportLCPresentationController.prototype.getExportLCAmendmentById = function (referenceID, frm) {
    this.showProgressBar();
    let params = {
      "amendmentSRMSRequestId": referenceID
    };
    this.exportLCManager.getExportLetterofCreditCAmendmentById(params, this.getExportLCAmendmentByIdSuccess.bind(this, frm), this.getExportLCAmendmentByIdError.bind(this, frm));
  };

  /* Method to execute after success call back of getExportLCAmendmentById
     */
  ExportLCPresentationController.prototype.getExportLCAmendmentByIdSuccess = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "exportLCAmendmentById": response
    });
  };


  /**
     * Method to execute after error call back of getExportLCAmendmentById
     */
  ExportLCPresentationController.prototype.getExportLCAmendmentByIdError = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg
    });
  };

  /**
       * Method to update the Amendments
       * @param {object} params - consist of payload to updateAmendments
       * @param {string} frm - form name
       */
  ExportLCPresentationController.prototype.updateExportLCAmendment = function (amendments, frm) {
    this.showProgressBar();
    this.exportLCManager.updateExportLetterofCreditAmendment(amendments, this.updateExportLCAmendmentSuccess.bind(this, frm), this.updateExportLCAmendmentError.bind(this, frm));
  };

  /* Method to execute after success call back of updateExportLCAmendment
   */
  ExportLCPresentationController.prototype.updateExportLCAmendmentSuccess = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "updatedExportLCAmendment": response
    });
  };

  /**
    * Method to execute after error call back of updateAmendment SelfAcceptance
    */
  ExportLCPresentationController.prototype.updateExportLCAmendmentError = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": !kony.sdk.isNullOrUndefined(response.serverErrorRes.dbpErrMsg) ? response.serverErrorRes.dbpErrMsg : response.errorMessage
    });
  };

  /**
   * Method to generate the export drawing file
   * @param {object} params - consist of payload to generate file
   * @param {string} frm - form name
   */
  ExportLCPresentationController.prototype.generateExportAmendment = function (params, frm) {
    this.showProgressBar();
    this.exportLCManager.generateExportAmendment(params, this.generateExportAmendmentSuccess.bind(this), this.generateExportAmendmentFailure.bind(this, frm));
  };

  /**
   * Success callback for generating the export Amendment file
   * @param {object} response - consist fileId of generated file
   */
  ExportLCPresentationController.prototype.generateExportAmendmentSuccess = function (response) {
    this.downloadGeneratedFile(response, 'Export LC Amendment');
    this.hideProgressBar();
  };
  /**
   * Failure callback for generating the export drawing file
   * @param {onject} response - consist of error details
   * @param {string} frm - form name
   */
  ExportLCPresentationController.prototype.generateExportAmendmentFailure = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg || response.errorMessage
    });
  };
  /**
   * Method to generate the Export LC file
   * @param {object} params - consist of payload to generate file
   * @param {string} frm - form name
   */
  ExportLCPresentationController.prototype.generateExportLC = function (params, frm) {
    this.showProgressBar();
    this.exportLCManager.generateExportLetterOfCredit(params, this.generateExportLCSuccess.bind(this), this.generateExportLCFailure.bind(this, frm));
  };

  /**
   * Success callback for generating the Export LC file
   * @param {object} response - consist fileId of generated file
   */
  ExportLCPresentationController.prototype.generateExportLCSuccess = function (response) {
    this.downloadGeneratedFile(response, 'Export Letter Of Credit');
    this.hideProgressBar();
  };
  /**
   * Failure callback for generating the Export LC file
   * @param {onject} response - consist of error details
   * @param {string} frm - form name
   */
  ExportLCPresentationController.prototype.generateExportLCFailure = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg || response.errorMessage
    });
  };
  /**
    * Method to fetch ExportLC Ammendments
    */
  ExportLCPresentationController.prototype.getExportLCAmmendments = function (params, frm, callback) {
    this.showProgressBar();
    this.exportLCManager.getExportLCAmmendments(params, this.getExportLCAmmendmentsSuccess.bind(this, frm, callback), this.getExportLCAmmendmentsError.bind(this, frm));
  };
  /**
   * Method to execute after success call back of getExportLCAmmendments
   */
  ExportLCPresentationController.prototype.getExportLCAmmendmentsSuccess = function (frm, callback, response) {
    this.hideProgressBar();
    if (callback && typeof callback === 'function') {
      this.amendmentsData = response.ExportLcAmendments;
      callback();
    }
    else {
      this.showView(frm, {
        "getExportLCAmmendments": response
      })
    }
  };
  /**
   * Method to execute after error call back of getExportLCAmmendments
   */
  ExportLCPresentationController.prototype.getExportLCAmmendmentsError = function (frm, response) {
    this.hideProgressBar();
    this.showView(frm, {
      "serverError": response.errmsg || response.errorMessage
    });
  };
  ExportLCPresentationController.prototype.getFormattedData = function (data) {
    var scope = this;
    let objectMetadata = scope.metadataObject;
    var formattedData = JSON.parse(JSON.stringify(data));
    formattedData.map(function (record) {
      var keys = Object.keys(record);
      keys.forEach((key) => {
        if (objectMetadata.hasOwnProperty(key)) {
          var metaData = objectMetadata[key];
          if (metaData.format != undefined) {
            var dependentData;
            if (metaData.formatting_dependency) {
              dependentData = record[metaData.formatting_dependency]
            }
            if (key === "drawingAmount" || key === "lcAmount" || key === "amount")
              record[key] = record[key].replace(/,/g, '');
            var formattedValue = scope.formatUtils.formatData(metaData.format, record[key], dependentData);
            if (key === "drawingAmount") {
              formattedValue = formattedValue.charAt(0).concat(formattedValue.split(formattedValue.charAt(0)).join(" "));
            }
            record[key + "Formatted"] = formattedValue;
          }
        }
      });
    });
    return formattedData;
  };
  ExportLCPresentationController.prototype.getExportDrawingSummary = function (params, form) {
    this.showProgressBar();
    this.asyncManager.callAsync(
      [
        this.asyncManager.asyncItem(this.exportLCManager, 'getExportDrawingById', [{ "drawingReferenceNo": params.transactionReference || params.drawingReferenceNo }]),
        this.asyncManager.asyncItem(this.exportLCManager, 'getExportLetterOfCreditById', [{ "lcReferenceNo": params.exportlcSRMSRequestId || params.exportLCId }])
      ], this.getExportDrawingSummaryCallback.bind(this, params.flowType, form));
  };
  ExportLCPresentationController.prototype.getExportDrawingSummaryCallback = function (flowType, form, syncResponseObject) {
    this.hideProgressBar();
    if (syncResponseObject.isAllSuccess()) {
      let drawingData = this.getFormattedData([syncResponseObject.responses[0].data]);
      let SwiftsAndAdvises = syncResponseObject.responses[0].data['SwiftsAndAdvises'] ? this.getFormattedData(syncResponseObject.responses[0].data[0]['SwiftsAndAdvises']) : [];
      let LCreditData = this.getFormattedData(syncResponseObject.responses[1].data.ExportLC);
      let PaymentAdvices = syncResponseObject.responses[1].data.ExportLC[0]['PaymentAdvices'] ? this.getFormattedData(syncResponseObject.responses[1].data['PaymentAdvices']) : [];
      let record = {
        ExportLetterOfCredit: Object.assign(LCreditData[0], { SwiftsAndAdvises }),
        ExportDrawing: Object.assign(drawingData[0], { PaymentAdvices })
      };
      const navManager = applicationManager.getNavigationManager();
      if (flowType === "viewDetails") {
        switch (record.ExportDrawing.status) {
          case OLBConstants.EXPORT_DRAWING_STATUS.DRAFT:
            record = Object.assign(record.ExportLetterOfCredit, record.ExportDrawing);
            record.recordStatus = record.status;
            navManager.navigateTo({
              appName: "TradeFinanceMA",
              friendlyName: "frmExportLCCreateDrawings"
            }, false, record);
            break;
          case OLBConstants.EXPORT_DRAWING_STATUS.RETURNED_BY_BANK:
            navManager.navigateTo({
              appName: "TradeFinanceMA",
              friendlyName: "frmExportLCViewDetailsReturned"
            }, false, record);
            break;
          default:
            navManager.navigateTo({
              appName: "TradeFinanceMA",
              friendlyName: "frmExportDrawingDetails"
            }, false, record);
            break;
        }
      } else {
        navManager.navigateTo({
          appName: "TradeFinanceMA",
          friendlyName: "frmPrintExportDrawing"
        }, false, {
          drawingSummary: record,
          printCallback: function () {
            navManager.navigateTo({
              appName: 'TradeFinanceMA',
              friendlyName: 'frmExportLCDashboard'
            });
          }
        });
      }
    } else {
      this.showView(form, {
        serverError: syncResponseObject.responses[0].data.errorMessage || syncResponseObject.responses[1].data.dbpErrMsg
      });
    }
  };
  ExportLCPresentationController.prototype.getExportAmendmentSummary = function (params, form) {
    this.showProgressBar();
    this.asyncManager.callAsync(
      [
        this.asyncManager.asyncItem(this.exportLCManager, 'getExportLetterofCreditCAmendmentById', [{ amendmentSRMSRequestId: params.amendmentSRMSRequestId || params.transactionReference }]),
        this.asyncManager.asyncItem(this.exportLCManager, 'getExportLetterOfCreditById', [{ "lcReferenceNo": params.exportlcSRMSRequestId }])
      ],
      this.getExportAmendmentSummaryCallback.bind(this, params.flowType, form)
    );
  };
  ExportLCPresentationController.prototype.getExportAmendmentSummaryCallback = function (flowType, form, syncResponseObject) {
    this.hideProgressBar();
    if (syncResponseObject.isAllSuccess()) {
      let ammendmentData = this.getFormattedData([syncResponseObject.responses[0].data]);
      let SwiftsAndAdvises = syncResponseObject.responses[0].data['SwiftsAndAdvises'] ? this.getFormattedData(syncResponseObject.responses[0].data['SwiftsAndAdvises']) : [];
      let LCreditData = this.getFormattedData(syncResponseObject.responses[1].data.ExportLC);
      if (flowType === 'viewDetails') {
        this.navigationManager.navigateTo({ appName: "TradeFinanceMA", friendlyName: "frmExportAmendmentViewDetails" }, false, {
          'ExportLetterOfCredit': Object.assign(LCreditData[0], { SwiftsAndAdvises }),
          'ExportAmendment': Object.assign(ammendmentData[0])
        });
      } else {
        let navData = {};
        navData.importLCId = ammendmentData[0].amendmentSRMSRequestId;
        navData = ammendmentData[0];
        navData["frmName"] = "frmExportLCDashboard";
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ImportLCUIModule").presentationController.navigateToForm("TradeFinanceMA", "ImportLCUIModule/frmAmendmentsPrint", {
          "Data": navData,
          "LOCNavData": Object.assign(LCreditData[0], { SwiftsAndAdvises })
        });
      }
    } else {
      this.showView(form, {
        serverError: syncResponseObject.responses[0].data.errorMessage || syncResponseObject.responses[1].data.dbpErrMsg
      });
    }
  };
  ExportLCPresentationController.prototype.getExportLCsAndSwifts = function (params, form, callback) {
    this.showProgressBar();
    let swiftParams = {
      "orderId": params.exportLCId || params.transactionReference,
      "product": "LETTEROFCREDIT"
    };
    this.asyncManager.callAsync(
      [
        this.asyncManager.asyncItem(this.exportLCManager, 'getExportLetterOfCreditById', [{
          "lcReferenceNo": params.exportLCId || params.transactionReference
        }]),
        this.asyncManager.asyncItem(this.exportLCManager, 'fetchSwiftsAdvices', [swiftParams])
      ], this.getExportLCsAndSwiftsCallback.bind(this, form, callback));
  };
  ExportLCPresentationController.prototype.getExportLCsAndSwiftsCallback = function (form, callback, syncResponseObject) {
    this.hideProgressBar();
    if (syncResponseObject.isAllSuccess()) {
      this.LCData = syncResponseObject.responses[0].data.ExportLC ? this.getFormattedData(syncResponseObject.responses[0].data.ExportLC) : [];
      let SwiftsAndAdvises = syncResponseObject.responses[1].data;
      this.LCData = Object.assign(this.LCData[0], SwiftsAndAdvises);
      if (callback && typeof callback === 'function') {
        callback();
      } else {
        this.showView({
          form,
          data: response[0]
        });
      }
    } else {
      this.showView(form, {
        serverError: syncResponseObject.responses[0].data.errorMessage || syncResponseObject.responses[1].data.dbpErrMsg
      });
    }
  };
  ExportLCPresentationController.prototype.getExportLetterOfCredits = function (params, form) {
    this.showProgressBar();
    this.exportLCManager.fetchExportLetterOfCredits(params, this.getExportLetterOfCreditsSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, form));
  };
  ExportLCPresentationController.prototype.getExportLetterOfCreditsSuccess = function (form, response) {
    if (response && response.ExportLetterOfCredits) {
      response.ExportLetterOfCredits = this.getFormattedData(response.ExportLetterOfCredits);
    }
    this.hideProgressBar();
    this.showView(form, response);
  };
  ExportLCPresentationController.prototype.commonServiceFailureMethod = function (form, response) {
    this.hideProgressBar();
    this.showView(form, {
      serverError: response.errmsg || response.errorMessage
    });
  };
  /**
   * Method to get Swift Advices
   * @param {object} params - consist of payload to generate file
   * @param {string} frm - form name
   */
  ExportLCPresentationController.prototype.getFileResponse = function (params, form) {
    this.showProgressBar();
    this.exportLCManager.fetchFileResponse(params, this.getFileResponseSuccess.bind(this, form), this.getFileResponseFailure.bind(this, form));
  };
  /**
   * Success callback for save get Swift Advices
   * @param {object} response - consist fileId of generated file
   */
  ExportLCPresentationController.prototype.getFileResponseSuccess = function (form, response) {
    this.hideProgressBar();
    this.showView(
      form,
      { fileResponse: response }
    );
  };
  /**
   * Failure callback for get Swift Advices
   * @param {string} frm - form name
   * @param {object} response - consist of error details
   */
  ExportLCPresentationController.prototype.getFileResponseFailure = function (form, response) {
    this.hideProgressBar();
    this.showView(form, { serverError: response });
  };
  ExportLCPresentationController.prototype.submitBeneficiaryConsent = function (params, form) {
    this.showProgressBar();
    this.exportLCManager.submitBeneficiaryConsent(params, this.submitBeneficiaryConsentSuccess.bind(this, form), this.commonServiceFailureMethod.bind(this, form));
  };
  ExportLCPresentationController.prototype.submitBeneficiaryConsentSuccess = function (form, response) {
    this.LCData = Object.assign(this.LCData, response);
    this.hideProgressBar();
    this.showView(form, { beneficiaryConsent: true });
  };
  ExportLCPresentationController.prototype.generateList = function ({ flow, criteria, form }) {
    this.showProgressBar();
    const methodName = {
      'Export Letter Of Credit': 'generateExportLCList',
      'Export LC Amendment': 'generateExportAmendmentList',
      'Export Drawing': 'generateExportDrawingList'
    }[flow];
    this.exportLCManager[methodName](criteria, this.generateListSuccess.bind(this, flow), this.commonServiceFailureMethod.bind(this, form));
  };
  ExportLCPresentationController.prototype.generateListSuccess = function (fileName, response) {
    this.hideProgressBar();
    const mfURL = KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url;
    const url = `${mfURL}/operations/LCSummary/downloadGeneratedList`;
    CommonUtilities.downloadGeneratedFile({ url, fileName, fileType: 'xlsx' }, { "fileId": response.fileId });
  };
  return ExportLCPresentationController;
});
