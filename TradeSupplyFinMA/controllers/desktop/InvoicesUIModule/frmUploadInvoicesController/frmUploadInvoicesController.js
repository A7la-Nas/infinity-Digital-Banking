define(["SCFUtils"], function (SCFUtils) {
  let scope, presenter, contentScope, popupScope, breakpoint, bulkInvoiceUpload;
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
      presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeSupplyFinMA',
        'moduleName': 'InvoicesUIModule'
      });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      contentScope.btnUploadManual.onClick = () => presenter.loadScreenWithContext({ 'context': 'uploadManualInvoice' });
      contentScope.btnDownload.onClick = () => presenter.downloadBulkInvoiceSampleFile(scope.view.id);
      contentScope.btnBulkUpload.onClick = this.browseFile;
      contentScope.lblBulkSubheader.text = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.supportedFileTypeWithColon')} ${presenter.bulkInvoiceUpload.config.uploadFormat.join(', ').toUpperCase()}`;
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
      if (viewModel.invoiceSuccess) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({ 'i18n': viewModel.invoiceSuccess });
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'dbpErrMsg': viewModel.serverError
        });
      }
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
     * Toggles the popup.
     * @param {object} param - Specifies the popup info.
     */
    togglePopup: function ({ context, message }) {
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
      }
      this.view.formTemplate12.setPopup(popupContext);
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