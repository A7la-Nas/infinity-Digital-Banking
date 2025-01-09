define(["FormControllerUtility", "ViewConstants", "SCFUtils", "CommonUtilities"], function (FormControllerUtility, ViewConstants, SCFUtils, CommonUtilities) {
  const fontIcons = {
    'chevronUp': 'P',
    'chevronDown': 'O',
  }, images = {
    'sortAsc': ViewConstants.IMAGES.SORT_PREV_IMAGE,
    'sortDesc': ViewConstants.IMAGES.SORT_NEXT_IMAGE,
    'noSort': ViewConstants.IMAGES.SORT_FINAL_IMAGE
  };
  let scope, presenter, contentScope, popupScope, breakpoint, bulkInvoiceUpload, inoviceConfig,
    documentsList, selectedDocument, documentReference,
    invoicesData, sortByParam, sortOrder, previousIndex;
  return {
    /**
     * Sets the initial actions for form.
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.formTemplate12.onError = this.onError;
      this.initFormActions();
    },
    /**
     * Handles the navigation.
     */
    onNavigate: function () {
      breakpoint = kony.application.getCurrentBreakpoint();
    },
    /**
     * Handles breakpoint change.
     * @param {object} formHandle - Specifies the handle of form.
     * @param {number} breakpoint - Specifies the current breakpoint value.
     */
    onBreakpointChange: function (formHandle, breakpoint) {
      breakpoint = kony.application.getCurrentBreakpoint();
      this.view.formTemplate12.hideBannerError();
    },
    /**
     * Performs the actions required before rendering form.
     */
    preShow: function () {
      bulkInvoiceUpload = presenter.bulkInvoiceUpload;
      this.view.formTemplate12.activeSubMenuID = presenter.invoiceUploader === 'anchor' ? 'Anchor' : 'CounterParty';
      popupScope.flxInvoicesContainer.doLayout = CommonUtilities.centerPopupFlex;
      this.view.formTemplate12.hideBannerError();
    },
    /**
     * Performs the actions required after rendering form.
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
    },
    /**
     * Method to initialise form actions.
     */
    initFormActions: function () {
      scope = this;
      presenter = applicationManager.getModulesPresentationController({ 'appName': 'TradeSupplyFinMA', 'moduleName': 'InvoicesUIModule' });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      [
        contentScope.flxAddDocument,
        popupScope.flxInvoicesClose
      ].forEach(w => w.cursorType = 'pointer');
      contentScope.flxAddDocument.onClick = this.browseDocument;
      contentScope.btnCancel.onClick = () => scope.togglePopup({ 'context': 'cancelInvoices' });
      contentScope.btnSubmit.onClick = () => scope.togglePopup({ 'context': 'submitInvoices' });
      contentScope.btnValidate.onClick = () => presenter.validateInvoices(scope.view.id);
      contentScope.btnValidAction.onClick = this.showInvoices;
      contentScope.btnInvalidAction.onClick = () => SCFUtils.downloadFile({
        'content': bulkInvoiceUpload.data.validationErrors,
        'fileName': 'Error Log.txt'
      });
      contentScope.btnReupload.onClick = this.browseFile;
      popupScope.flxInvoicesClose.onClick = () => {
        popupScope.setVisibility(false);
        popupScope.flxInvoicesPopup.setVisibility(false);
      };
    },
    /**
     * Entry point method for the form controller.
     * @param {Object} viewModel - Specifies the set of view properties and keys.
     */
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        this.view.formTemplate12.showLoading();
      } else if (viewModel.isLoading === false) {
        this.view.formTemplate12.hideLoading();
      }
      if (viewModel.showDetails) {
        this.setDetails();
      }
      if (viewModel.uploadDocument) {
        this.addDocument(viewModel.uploadDocument.LCDocuments[0].documentReference);
      }
      if (viewModel.deleteDocument) {
        this.removeDocument();
      }
      if (viewModel.validation) {
        this.setValidationDetails();
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({ 'dbpErrMsg': viewModel.serverError });
      }
    },
    /**
     * Resets the form.
     */
    resetForm: function () {
      documentsList = [];
      inoviceConfig = bulkInvoiceUpload.config;
      contentScope.btnValidate.setVisibility(true);
      contentScope.btnSubmit.setVisibility(false);
      const docWidget = contentScope.flxDocument.clone();
      contentScope.flxDocumentList.removeAll();
      contentScope.flxDocumentList.add(docWidget);
      contentScope.flxDocuments.setVisibility(false);
      contentScope.flxInvalidWarning.setVisibility(false);
      contentScope.flxReupload.setVisibility(false);
      contentScope.flxRow4.setVisibility(false);
      contentScope.flxRow5.setVisibility(false);
    },
    /**
     * Toggles the popup.
     * @param {object} param - Specifies the popup info.
     */
    togglePopup: function ({ context, message, docRef }) {
      let popupContext = {};
      switch (context) {
        case 'uploadDocument':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.TradeFinance.UploadDocument'),
            'message': message || '',
            'noText': kony.i18n.getLocalizedString('i18n.common.close'),
            'yesText': kony.i18n.getLocalizedString('kony.mb.common.TryAgain'),
            'yesClick': () => scope.browseDocument()
          };
          break;
        case 'deleteDocument':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('kony.mb.common.Delete'),
            'message': message || '',
            'noText': kony.i18n.getLocalizedString('i18n.common.no'),
            'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
            'yesClick': () => presenter.deleteDocument(documentReference, this.view.id)
          };
          break;
        case 'cancelInvoices':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.konybb.common.cancel'),
            'message': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.cancelInvoiceMessage'),
            'noText': kony.i18n.getLocalizedString('i18n.common.no'),
            'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
            'yesClick': () => presenter.showView({ 'form': 'frmUploadInvoices' })
          };
          break;
        case 'submitInvoices':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.wealth.submit'),
            'message': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.submitInvoicesMessage'),
            'noText': kony.i18n.getLocalizedString('i18n.common.no'),
            'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
            'yesClick': () => {
              presenter.bulkInvoiceUpload.data['invoiceDocuments'] = documentsList;
              presenter.submitBulkInvoices(scope.view.id);
            }
          };
          break;
      }
      this.view.formTemplate12.setPopup(popupContext);
    },
    /**
     * Browses the documents to upload.
     */
    browseDocument: function () {
      if (documentsList.length >= inoviceConfig.documentLimit) {
        this.togglePopup({
          'context': 'uploadDocument',
          'message': `${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedDocumentsLimitMessage")} ${inoviceConfig.documentLimit}.`
        });
        return;
      }
      const config = {
        'selectMultipleFiles': false,
        'filter': SCFUtils.getMimeTypes(bulkInvoiceUpload.config.documentFormat)
      };
      kony.io.FileSystem.browse(config, this.selectedDocumentCallback);
    },
    /**
     * Callback for document selection.
     * @param {object} events - Specifies the event object.
     * @param {object} files - Specifies the files object.
     * @returns {void} - Returns nothing if validation fails.
     */
    selectedDocumentCallback: function (events, files) {
      const scope = this;
      const { documentFormat, documentMaxSize } = inoviceConfig;
      const maxBytes = parseInt(documentMaxSize) * (2 ** 20);
      try {
        if (files.length > 0) {
          const { name, type, size } = files[0].file;
          if (documentsList.some(d => d.documentName.toLowerCase() === name.toLowerCase())) {
            throw new Error('Document with same name was already uploaded, please try uploading document with different name or extension.');
          }
          const extension = (name.split('.').pop() || '').toLowerCase();
          if (extension && !documentFormat.includes(extension)) {
            throw new Error(`${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${name} ${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedFileExtensionsMessage")} ${documentFormat.map(e => `.${e}`).join(', ')}.`);
          }
          if (size > maxBytes) {
            throw new Error(`${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${name} ${kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentSizeErrorMsg")} ${documentMaxSize}.`);
          }
          selectedDocument = { 'documentName': name };
          SCFUtils.getBase64(files[0].file, function (base64String) {
            const fileContents = base64String.split(';base64,')[1];
            const fileDataItemParsed = [name, type, fileContents].join('~');
            presenter.uploadDocument(fileDataItemParsed, scope.view.id);
          });
        }
      } catch (err) {
        this.togglePopup({
          'context': 'uploadDocument',
          'message': err.message
        });
      }
    },
    /**
     * Adds the document.
     * @param {string} docRef - Specifies the document reference.
     */
    addDocument: function (docRef) {
      selectedDocument['documentReference'] = docRef;
      documentsList.push(selectedDocument);
      contentScope.flxDocumentList.add(contentScope.flxDocument.clone(docRef));
      contentScope[`${docRef}flxDocument`].setVisibility(true);
      contentScope[`${docRef}imgType`].src = SCFUtils.getDocumentImages(selectedDocument['documentName'].split('.').pop()) || 'aa_password_error.png';
      contentScope[`${docRef}lblName`].text = selectedDocument['documentName'];
      contentScope[`${docRef}lblName`].cursorType = 'pointer';
      contentScope[`${docRef}lblName`].onTouchEnd = function () {
        presenter.downloadDocument(docRef, this.view.id);
      }.bind(this);
      contentScope[`${docRef}flxCross`].cursorType = 'pointer';
      contentScope[`${docRef}flxCross`].onClick = function () {
        documentReference = docRef;
        this.togglePopup({
          'context': 'deleteDocument',
          'message': `${kony.i18n.getLocalizedString("i18n.TradeFinance.deleteDocumentMessage")} "${contentScope[`${docRef}lblName`].text}"?`,
          docRef
        });
      }.bind(this);
    },
    /**
     * Removes the document.
     */
    removeDocument: function () {
      const idx = documentsList.findIndex(obj => obj.documentReference === documentReference);
      (idx !== -1) && documentsList.splice(idx, 1);
      contentScope.flxDocumentList.remove(contentScope[`${documentReference}flxDocument`]);
    },
    /**
     * Sets the details.
     */
    setDetails: function () {
      const data = bulkInvoiceUpload.data;
      contentScope.lblValue1.text = data.fileName;
      contentScope.imgFile.src = SCFUtils.getDocumentImages(data.fileName.split('.').pop()) || 'aa_password_error.png';
      contentScope.lblValue2.text = presenter.formatUtilManager.getFormattedCalendarDate(new Date());
      contentScope.lblValue3.text = SCFUtils.bytesToKBOrMB(data.fileSize);
      this.resetForm();
    },
    /**
     * Sets the validation details.
     */
    setValidationDetails: function () {
      const { invoices } = bulkInvoiceUpload.data;
      invoicesData = JSON.parse(JSON.stringify(invoices.filter(i => i.isValid)));
      const validCount = invoicesData.length,
        invalidCount = invoices.length - invoicesData.length;
      sortByParam = 'billReference';
      sortOrder = 'DESC';
      contentScope.flxRow4.setVisibility(true);
      contentScope.flxRow5.setVisibility(true);
      contentScope.lblValidMessage.text = `${validCount}/${invoices.length} ${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.recordsValidatedSuccessfully')} - `;
      contentScope.lblInvalidMessage.text = `${invalidCount}/${invoices.length} ${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.recordsHaveIssues')} - `;
      contentScope.flxValid.setVisibility(validCount !== 0);
      if (invalidCount > 0) {
        contentScope.lblValue4.text = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.fileUploadFailure');
        contentScope.lblInvalidWarning.text = `${invalidCount}/${invoices.length} ${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.invalidInvoiceWarning')}`;
        contentScope.flxInvalid.setVisibility(true);
        contentScope.flxInvalidWarning.setVisibility(true);
        contentScope.flxReupload.setVisibility(true);
        FormControllerUtility.disableButton(contentScope.btnSubmit);
      } else {
        contentScope.lblValue4.text = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.fileUploadSuccess');
        contentScope.flxInvalid.setVisibility(false);
        contentScope.flxDocuments.setVisibility(true);
        FormControllerUtility.enableButton(contentScope.btnSubmit);
      }
      contentScope.btnValidate.setVisibility(false);
      contentScope.btnSubmit.setVisibility(true);
    },
    /**
     * Shows the invoices.
     */
    showInvoices: function () {
      let segData = [], segRowData = [], totalAmount = 0;
      previousIndex = undefined;
      const currSymbol = presenter.configurationManager.getCurrency(invoicesData[0].invoiceCurrency);
      if (breakpoint > 1024) {
        for (const record of invoicesData) {
          totalAmount += parseFloat(record.invoiceAmount);
          segRowData.push({
            'flxIdentifier': {
              'skin': 'slFbox'
            },
            'flxDropdown': {
              'isVisible': false
            },
            'flxDetails': {
              'isVisible': false
            },
            'flxColumn1': {
              'isVisible': true,
              'left': '2%',
              'width': '16%'
            },
            'flxColumn2': {
              'isVisible': true,
              'left': '0%',
              'width': '12%'
            },
            'flxColumn3': {
              'isVisible': true,
              'left': '0%',
              'width': '12%'
            },
            'flxColumn4': {
              'isVisible': true,
              'left': '0%',
              'width': '15%',
              'layoutType': kony.flex.FREE_FORM
            },
            'flxColumn5': {
              'isVisible': true,
              'left': '3%',
              'width': '14%'
            },
            'flxColumn6': {
              'isVisible': true,
              'left': '0%',
              'width': '13%'
            },
            'flxColumn7': {
              'isVisible': true,
              'left': '0%',
              'width': '13%'
            },
            'flxAction': {
              'isVisible': false
            },
            'lblColumn1': record.billReference,
            'lblColumn2': record.supplierId,
            'lblColumn3': record.buyerId,
            'lblColumn4': {
              'text': `${currSymbol}${presenter.formatUtilManager.formatAmount(record.invoiceAmount)}`,
              'left': '',
              'right': '0dp'
            },
            'lblColumn5': record.billType,
            'lblColumn6': presenter.formatUtilManager.getFormattedCalendarDate(SCFUtils.getDateObjectFromDateString(record.issueDate, 'd/m/y')),
            'lblColumn7': presenter.formatUtilManager.getFormattedCalendarDate(SCFUtils.getDateObjectFromDateString(record.maturityDate, 'd/m/y'))
          });
        }
        segData.push([{
          'flxCheckbox': {
            'isVisible': false
          },
          'flxColumn1': {
            'isVisible': true,
            'left': '2%',
            'width': '16%',
            'onClick': function (context) {
              sortByParam = 'billReference';
              scope.sortRecords(context);
            }
          },
          'flxColumn2': {
            'isVisible': true,
            'left': '0%',
            'width': '12%',
            'onClick': function (context) {
              sortByParam = 'supplierId';
              scope.sortRecords(context);
            }
          },
          'flxColumn3': {
            'isVisible': true,
            'left': '0%',
            'width': '12%',
            'onClick': function (context) {
              sortByParam = 'buyerId';
              scope.sortRecords(context);
            }
          },
          'flxColumn4': {
            'isVisible': true,
            'left': '0%',
            'width': '15%',
            'layoutType': kony.flex.FREE_FORM,
            'onClick': function (context) {
              sortByParam = 'invoiceAmount';
              scope.sortRecords(context);
            }
          },
          'flxColumn5': {
            'isVisible': true,
            'left': '3%',
            'width': '14%',
            'onClick': function (context) {
              sortByParam = 'billType';
              scope.sortRecords(context);
            }
          },
          'flxColumn6': {
            'isVisible': true,
            'left': '0%',
            'width': '13%',
            'onClick': function (context) {
              sortByParam = 'issueDate';
              scope.sortRecords(context);
            }
          },
          'flxColumn7': {
            'isVisible': true,
            'left': '0%',
            'width': '13%',
            'onClick': function (context) {
              sortByParam = 'maturityDate';
              scope.sortRecords(context);
            }
          },
          'flxAction': {
            'isVisible': false
          },
          'lblColumn1': kony.i18n.getLocalizedString('i18n.TradeFinance.billReference'),
          'lblColumn2': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.supplierID'),
          'lblColumn3': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.buyerID'),
          'lblColumn4': {
            'text': kony.i18n.getLocalizedString('i18n.wealth.amount'),
            'left': '',
            'right': '20dp'
          },
          'lblColumn5': kony.i18n.getLocalizedString('i18n.TradeFinance.billType'),
          'lblColumn6': kony.i18n.getLocalizedString('i18n.TradeFinance.IssueDate'),
          'lblColumn7': kony.i18n.getLocalizedString('i18n.accountDetail.maturityDate'),
          'imgColumn1': {
            'src': sortByParam === 'billReference' ? (sortOrder === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
          },
          'imgColumn2': {
            'src': sortByParam === 'supplierId' ? (sortOrder === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
          },
          'imgColumn3': {
            'src': sortByParam === 'buyerId' ? (sortOrder === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
          },
          'imgColumn4': {
            'left': '',
            'right': '0dp',
            'src': sortByParam === 'invoiceAmount' ? (sortOrder === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
          },
          'imgColumn5': {
            'src': sortByParam === 'billType' ? (sortOrder === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
          },
          'imgColumn6': {
            'src': sortByParam === 'issueDate' ? (sortOrder === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
          },
          'imgColumn7': {
            'src': sortByParam === 'maturityDate' ? (sortOrder === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
          },
        }, segRowData]);
      } else {
        for (const record of invoicesData) {
          totalAmount += parseFloat(record.invoiceAmount);
          segRowData.push({
            'lblDropdown': fontIcons.chevronDown,
            'flxDashboardListRow': {
              'skin': 'sknflxffffffnoborder'
            },
            'flxIdentifier': {
              'skin': 'slFbox'
            },
            'flxDropdown': {
              'onClick': this.handleSegmentRowView
            },
            'flxDetails': {
              'isVisible': false
            },
            'flxColumn1': {
              'isVisible': true,
              'left': '0%',
              'width': '18%'
            },
            'flxColumn2': {
              'isVisible': true,
              'left': '0%',
              'width': '25%'
            },
            'flxColumn3': {
              'isVisible': true,
              'left': '0%',
              'width': '25%'
            },
            'flxColumn4': {
              'isVisible': true,
              'left': '0%',
              'width': '22%',
              'layoutType': kony.flex.FREE_FORM
            },
            'flxAction': {
              'isVisible': false
            },
            'flxRow1': {
              'isVisible': true,
            },
            'flxRow2': {
              'isVisible': true,
            },
            'flxRow3': {
              'isVisible': true,
            },
            'lblColumn1': record.billReference,
            'lblColumn2': record.supplierId,
            'lblColumn3': record.buyerId,
            'lblColumn4': {
              'text': `${currSymbol}${presenter.formatUtilManager.formatAmount(record.invoiceAmount)}`,
              'left': '',
              'right': '0dp'
            },
            'lblRow1Key': kony.i18n.getLocalizedString('i18n.TradeFinance.billTypeWithColon'),
            'lblRow2Key': kony.i18n.getLocalizedString('i18n.TradeFinance.issueDateWithColon'),
            'lblRow3Key': kony.i18n.getLocalizedString('i18n.Wealth.maturityDate'),
            'lblRow1Value': record.billType,
            'lblRow2Value': presenter.formatUtilManager.getFormattedCalendarDate(SCFUtils.getDateObjectFromDateString(record.issueDate, 'd/m/y')),
            'lblRow3Value': presenter.formatUtilManager.getFormattedCalendarDate(SCFUtils.getDateObjectFromDateString(record.maturityDate, 'd/m/y'))
          });
        }
        segData.push([{
          'flxCheckbox': {
            'isVisible': false
          },
          'flxColumn1': {
            'isVisible': true,
            'left': '7.5%',
            'width': '18%',
            'onClick': function (context) {
              sortByParam = 'billReference';
              scope.sortRecords(context);
            }
          },
          'flxColumn2': {
            'isVisible': true,
            'left': '0%',
            'width': '25%',
            'onClick': function (context) {
              sortByParam = 'supplierId';
              scope.sortRecords(context);
            }
          },
          'flxColumn3': {
            'isVisible': true,
            'left': '0%',
            'width': '25%',
            'onClick': function (context) {
              sortByParam = 'buyerId';
              scope.sortRecords(context);
            }
          },
          'flxColumn4': {
            'isVisible': true,
            'left': '0%',
            'width': '22%',
            'layoutType': kony.flex.FREE_FORM,
            'onClick': function (context) {
              sortByParam = 'invoiceAmount';
              scope.sortRecords(context);
            }
          },
          'flxAction': {
            'isVisible': false
          },
          'lblColumn1': kony.i18n.getLocalizedString('i18n.TradeFinance.billReference'),
          'lblColumn2': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.supplierID'),
          'lblColumn3': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.buyerID'),
          'lblColumn4': {
            'text': kony.i18n.getLocalizedString('i18n.wealth.amount'),
            'left': '',
            'right': '20dp'
          },
          'imgColumn1': {
            'src': sortByParam === 'billReference' ? (sortOrder === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
          },
          'imgColumn2': {
            'src': sortByParam === 'supplierId' ? (sortOrder === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
          },
          'imgColumn3': {
            'src': sortByParam === 'buyerId' ? (sortOrder === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
          },
          'imgColumn4': {
            'left': '',
            'right': '0dp',
            'src': sortByParam === 'invoiceAmount' ? (sortOrder === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
          }
        }, segRowData]);
      }
      popupScope.segInvoices.setData(segData);
      popupScope.lblTotalAmountValue.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalAmount)}`;
      popupScope.setVisibility(true);
      popupScope.flxInvoicesPopup.setVisibility(true);
      popupScope.forceLayout();
    },
    /**
     * Sorts the records.
     * @param {object} context - Specifies the context.
     */
    sortRecords: function (context) {
      if (context) {
        const widgetSrc = context.widgets()[1].src;
        sortOrder = (widgetSrc === images.noSort) ? 'ASC' : (widgetSrc === images.sortAsc) ? 'DESC' : 'ASC';
      }
      this.view.formTemplate12.showLoading();
      setTimeout(function () {
        invoicesData = SCFUtils.sortRecords(invoicesData, { sortByParam, sortOrder });
        scope.showInvoices();
        scope.view.formTemplate12.hideLoading();
      }, 10);
    },
    /**
     * Browses the file to upload.
     */
    browseFile: function () {
      const config = {
        'selectMultipleFiles': false,
        'filter': SCFUtils.getMimeTypes(bulkInvoiceUpload.config.uploadFormat)
      };
      kony.io.FileSystem.browse(config, this.selectedFileCallback);
    },
    /**
     * Callback for file selection.
     * @param {object} events - Specifies the event object.
     * @param {object} files - Specifies the files object.
     * @returns {void} - Returns nothing if validation fails.
     */
    selectedFileCallback: function (events, files) {
      const { uploadFormat, uploadMaxSize } = bulkInvoiceUpload.config;
      const maxBytes = parseInt(uploadMaxSize) * (2 ** 20);
      try {
        if (files.length > 0) {
          const { name, type, size } = files[0].file;
          const extension = (name.split('.').pop() || '').toLowerCase();
          if (extension && !uploadFormat.includes(extension)) {
            throw new Error(`${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${name} ${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedFileExtensionsMessage")} ${uploadFormat.map(e => `.${e}`).join(', ')}.`);
          }
          if (size > maxBytes) {
            throw new Error(`${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${name} ${kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentSizeErrorMsg")} ${uploadMaxSize}.`);
          }
          SCFUtils.getBase64(files[0].file, function (base64String) {
            const fileContents = base64String.split(';base64,')[1];
            presenter.parseBulkInoviceFile({
              'fileName': name,
              'fileSize': size,
              fileContents
            }, scope.view.id);
          });
        }
      } catch (err) {
        this.togglePopup({
          'context': 'uploadDocument',
          'message': err.message
        });
      }
    },
    /**
     * Handles the segment row view on click of dropdown.
     */
    handleSegmentRowView: function () {
      const rowIndex = popupScope.segInvoices.selectedRowIndex[1],
        segData = popupScope.segInvoices.data[0][1],
        data = segData[rowIndex],
        collapsedView = [fontIcons.chevronDown, false, "slFbox", "sknflxffffffnoborder"],
        expandedView = [fontIcons.chevronUp, true, "skbflx293276", "ICSknFlxfbfbfb"];
      if (previousIndex === rowIndex) {
        this.toggleSegmentRowView(data, rowIndex, data.lblDropdown === fontIcons.chevronUp ? collapsedView : expandedView);
      } else {
        if (previousIndex >= 0) {
          this.toggleSegmentRowView(segData[previousIndex], previousIndex, collapsedView);
        }
        this.toggleSegmentRowView(data, rowIndex, expandedView);
      }
      previousIndex = rowIndex;
    },
    /**
     * Toggles the segment row view.
     * @param {Array} data - Data of segent row.
     * @param {Number} index - Index of segment row to toggle.
     * @param {Array} viewData - Data which need to be assigned to toggled view.
     */
    toggleSegmentRowView: function (data, index, viewData) {
      data['lblDropdown'] = viewData[0];
      data['flxDetails'].isVisible = viewData[1];
      data['flxIdentifier'].skin = viewData[2];
      data['flxDashboardListRow'].skin = viewData[3];
      popupScope.segInvoices.setDataAt(data, index, 0);
      popupScope.forceLayout();
    },
    /**
     * Handles the errors.
     * @param {object} err - Specifies the error details.
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    }
  };
});