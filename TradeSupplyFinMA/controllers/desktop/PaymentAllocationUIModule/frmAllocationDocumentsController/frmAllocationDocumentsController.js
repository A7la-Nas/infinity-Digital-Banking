define(["FormControllerUtility", "SCFUtils"], function (FormControllerUtility, SCFUtils) {
  let scope, presenter, contentScope, popupScope, breakpoint, paymentAllocationConfig, allocationRecord,
    documentsList, selectedDocument, documentReference;
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
      paymentAllocationConfig = presenter.paymentAllocationConfig;
      this.view.formTemplate12.activeSubMenuID = presenter.allocater === 'anchor' ? 'Anchor' : 'CounterParty';
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
      presenter = applicationManager.getModulesPresentationController({ 'appName': 'TradeSupplyFinMA', 'moduleName': 'PaymentAllocationUIModule' });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      [
        contentScope.flxAddDocument
      ].forEach(w => w.cursorType = 'pointer');
      contentScope.flxAddDocument.onClick = this.browseDocument;
      contentScope.btnCancel.onClick = () => scope.togglePopup({
        'context': 'cancelAllocation'
      });
      contentScope.btnSubmit.onClick = () => presenter.submitDocumentation({
        'paymentAllocationId': allocationRecord.paymentAllocationId,
        'fundingDocuments': JSON.stringify(documentsList)
      }, this.view.id);
      contentScope.btnClose.onClick = () => presenter.loadScreenWithContext({
        'context': presenter.displayMode ? 'backToDashboard' : 'pendingPaymentAllocation'
      });
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
      if (viewModel.uploadDocument) {
        this.addDocument(viewModel.uploadDocument.LCDocuments[0].documentReference);
      }
      if (viewModel.deleteDocument) {
        this.removeDocument();
      }
      if (viewModel.allocationRecord) {
        allocationRecord = viewModel.allocationRecord;
        this.setDetails();
      }
      if (viewModel.submitDocumentation) {
        this.showAcknowledgement();
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
      const docWidget = contentScope.flxDocument.clone();
      contentScope.flxDocumentList.removeAll();
      contentScope.flxDocumentList.add(docWidget);
      contentScope.flxAllocationDetails.setVisibility(true);
      contentScope.flxDocuments.setVisibility(true);
      contentScope.flxAcknowledgement.setVisibility(false);
      contentScope.btnCancel.setVisibility(true);
      contentScope.btnSubmit.setVisibility(true);
      contentScope.btnClose.setVisibility(false);
      FormControllerUtility.disableButton(contentScope.btnSubmit);
    },
    /**
     * Sets the allocation details.
     */
    setDetails: function () {
      this.resetForm();
      let segData = [
        {
          'lblKey': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.transactionIdWithColon'),
          'lblValue': allocationRecord.transactionId || '-'
        },
        {
          'lblKey': kony.i18n.getLocalizedString('i18n.wealth.statuswithColon'),
          'lblValue': allocationRecord.status || '-'
        },
        {
          'lblKey': kony.i18n.getLocalizedString('i18n.wealth.valueDatemb'),
          'lblValue': allocationRecord.valueDate ? presenter.formatUtilManager.getFormattedCalendarDate(allocationRecord.valueDate) : '-',
        },
        {
          'lblKey': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.originalAmountWithColon'),
          'lblValue': (allocationRecord.currency && allocationRecord.originalAmount) ? `${presenter.configurationManager.getCurrency(allocationRecord.currency)}${presenter.formatUtilManager.formatAmount(allocationRecord.originalAmount)}` : '-',
        },
        {
          'lblKey': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.receiptAmountWthColon'),
          'lblValue': (allocationRecord.currency && allocationRecord.receiptAmount) ? `${presenter.configurationManager.getCurrency(allocationRecord.currency)}${presenter.formatUtilManager.formatAmount(allocationRecord.receiptAmount)}` : '-',
        },
        {
          'lblKey': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.senderNameWithColon'),
          'lblValue': allocationRecord.senderName || '-'
        },
        {
          'lblKey': kony.i18n.getLocalizedString('kony.mb.TransferEurope.beneficairyNameColon'),
          'lblValue': allocationRecord.beneficiaryName || '-'
        }
      ];
      documentsList = allocationRecord.fundingDocuments ? JSON.parse(allocationRecord.fundingDocuments) : [];
      if (presenter.displayMode === 'view') {
        let i = 0;
        for (const document of documentsList) {
          segData.push({
            'lblKey': i++ === 0 ? kony.i18n.getLocalizedString('i18n.TradeFinance.documentsWithColon') : '',
            'lblValue': {
              'isVisible': false
            },
            'flxDocument': {
              'isVisible': true
            },
            'imgDownload': {
              'src': SCFUtils.getDocumentImages(document.documentName.split('.').pop()) || 'aa_password_error.png'
            },
            'lblDocumentName': document.documentName
          });
        }
        contentScope.flxDocuments.setVisibility(false);
        contentScope.btnCancel.setVisibility(false);
        contentScope.btnSubmit.setVisibility(false);
        contentScope.btnClose.setVisibility(true);
      } else if (presenter.displayMode === 'edit') {
        this.preFillDocuments();
      }
      contentScope.segDetails.setData(segData);
      contentScope.forceLayout();
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
        case 'cancelAllocation':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.konybb.common.cancel'),
            'message': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.cancelAllocationDocumentMessage'),
            'noText': kony.i18n.getLocalizedString('i18n.common.no'),
            'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
            'yesClick': () => presenter.loadScreenWithContext({ 'context': presenter.displayMode ? 'backToDashboard' : 'pendingPaymentAllocation' })
          };
          break;
      }
      this.view.formTemplate12.setPopup(popupContext);
    },
    /**
     * Browses the documents to upload.
     */
    browseDocument: function () {
      const config = {
        'selectMultipleFiles': false,
        'filter': SCFUtils.getMimeTypes(paymentAllocationConfig.documentFormat)
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
      const { documentFormat, documentMaxSize } = paymentAllocationConfig;
      const maxBytes = parseInt(documentMaxSize) * (2 ** 20);
      try {
        if (files.length > 0) {
          const { name, type, size } = files[0].file;
          if (documentsList.some(d => d.documentName.toLowerCase() === name.toLowerCase())) {
            throw new Error(kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.sameDocumentUploadErrorMessage'));
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
      FormControllerUtility[documentsList.length > 0 ? 'enableButton' : 'disableButton'](contentScope.btnSubmit);
    },
    /**
     * Removes the document.
     */
    removeDocument: function () {
      const idx = documentsList.findIndex(obj => obj.documentReference === documentReference);
      (idx !== -1) && documentsList.splice(idx, 1);
      contentScope.flxDocumentList.remove(contentScope[`${documentReference}flxDocument`]);
      FormControllerUtility[documentsList.length > 0 ? 'enableButton' : 'disableButton'](contentScope.btnSubmit);
    },
    /**
     * Prefills the documents data.
     */
    preFillDocuments: function () {
      for (const document of documentsList) {
        const docRef = document.documentReference,
          docName = document.documentName;
        contentScope.flxDocumentList.add(contentScope.flxDocument.clone(docRef));
        contentScope[`${docRef}flxDocument`].setVisibility(true);
        contentScope[`${docRef}imgType`].src = SCFUtils.getDocumentImages(docName.split('.').pop()) || 'aa_password_error.png';
        contentScope[`${docRef}lblName`].text = docName;
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
      }
      FormControllerUtility[documentsList.length > 0 ? 'enableButton' : 'disableButton'](contentScope.btnSubmit);
    },
    /**
     * Shows the acknowledgement.
     * @param {string} message - Specifies success message.
     */
    showAcknowledgement: function () {
      contentScope.flxAllocationDetails.setVisibility(false);
      contentScope.flxAcknowledgement.setVisibility(true);
      contentScope.lblSuccessMessage.text = kony.i18n.getLocalizedString(presenter.displayMode === 'edit' ? 'i18n.TradeSupplyFinance.updateAllocationDocumentsSuccessMessage' : 'i18n.TradeSupplyFinance.submitAllocationDocumentsSuccessMessage');
      contentScope.btnCancel.setVisibility(false);
      contentScope.btnSubmit.setVisibility(false);
      contentScope.btnClose.setVisibility(true);
      contentScope.forceLayout();
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