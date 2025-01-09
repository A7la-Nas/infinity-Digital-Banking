define(["FormControllerUtility"], function (FormControllerUtility) {
  let scope, presenter, contentScope, popupScope, breakpoint, inoviceConfig, invoiceIndex, currInvoiceId, invoiceReferences, enableWidgets, existingInvoices;
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
      manualInvoiceUpload = presenter.manualInvoiceUpload;
      this.view.formTemplate12.activeSubMenuID = presenter.invoiceUploader === 'anchor' ? 'Anchor' : 'CounterParty';
      this.view.formTemplate12.hideBannerError();
      this.resetForm();
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
        contentScope.flxAddMore
      ].forEach(w => w.cursorType = 'pointer');
      contentScope.flxAddMore.onClick = this.addInvoiceInstance;
      contentScope.btnCancel.onClick = () => scope.togglePopup({ 'context': 'cancelInvoices' });
      contentScope.btnSubmit.onClick = () => scope.togglePopup({ 'context': 'submitInvoices' });
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
        contentScope[currInvoiceId].addDocument(viewModel.uploadDocument.LCDocuments[0].documentReference);
      }
      if (viewModel.deleteDocument) {
        contentScope[currInvoiceId].removeDocument();
      }
      if (viewModel.saveInvoice) {
        contentScope[currInvoiceId].showDetails(viewModel.saveInvoice.invoiceReference);
        this.toggleAddMore(true);
        this.toggleSubmitButton();
      }
      if (viewModel.deleteInvoice) {
        contentScope.flxDetails.remove(contentScope[currInvoiceId]);
        this.setInvoiceWidgetHeading();
        this.toggleAddMore(true);
        this.toggleSubmitButton();
      }
      if (viewModel.existingInvoices) {
        existingInvoices = viewModel.existingInvoices;
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
      invoiceIndex = 0;
      const userObj = presenter.userPreferencesManager.getUserObj(),
        scfConfig = scope_configManager.SCF_INVOICE_UPLOAD_CONFIG || {},
        coreCustomerID = presenter.userPreferencesManager.getBackendIdentifier();
      inoviceConfig = {
        'billType': scfConfig.BILL_TYPE || [],
        'currency': scfConfig.CURRENCY || [],
        ...manualInvoiceUpload.config
      };
      inoviceConfig['customerId'] = { [`_${coreCustomerID}`]: [userObj.userfirstname, userObj.userlastname].join(' ') };
      for (const [key, value] of Object.entries(presenter.customerId)) {
        inoviceConfig['customerId']['_' + key] = value;
      }
      contentScope.flxDetails.removeAll();
      this.addInvoiceInstance();
      presenter.fetchExistingInvoices(this.view.id);
    },
    /**
     * Add an invoice widget instance.
     */
    addInvoiceInstance: function () {
      invoiceIndex++;
      currInvoiceId = `ManualInvoiceUpload${invoiceIndex}`;
      this.collapseWidgets();
      const invoiceWidget = new com.InfinityOLB.TradeSupplyFin.ManualInvoiceUpload({
        'clipBounds': false,
        'id': currInvoiceId,
        'isVisible': true,
        'top': '12dp',
        'zIndex': 1,
        'appName': 'TradeSupplyFinMA',
        'masterType': constants.MASTER_TYPE_DEFAULT
      }, {}, {});
      contentScope.flxDetails.add(invoiceWidget);
      invoiceWidget.setContext(inoviceConfig);
      this.toggleAddMore(false);
      this.setInvoiceWidgetHeading();
    },
    /**
     * Handles the dropdown selection trigerred from component.
     * @param {string} widgetId - Specifies widget id.
     * @param {string} selectedKey - Specifies selected key.
     */
    handleDropdownSelection: function (widgetId, selectedKey) {
      contentScope[currInvoiceId].handleDropdownSelection(widgetId, selectedKey);
    },
    /**
     * Toggles the popup.
     * @param {object} param - Specifies the popup info.
     */
    togglePopup: function ({ context, widgetId, message, docReference }) {
      let popupContext = {};
      switch (context) {
        case 'deleteInvoice':
          if (!enableWidgets && currInvoiceId !== widgetId) {
            return;
          }
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Delete'),
            'message': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.deleteInvoiceMessage'),
            'noText': kony.i18n.getLocalizedString('i18n.common.no'),
            'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
            'yesClick': () => scope.deleteInvoice(widgetId)
          };
          break;
        case 'uploadDocument':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.TradeFinance.UploadDocument'),
            'message': message || '',
            'noText': kony.i18n.getLocalizedString('i18n.common.close'),
            'yesText': kony.i18n.getLocalizedString('kony.mb.common.TryAgain'),
            'yesClick': () => contentScope[widgetId].browseDocument()
          };
          break;
        case 'deleteDocument':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('kony.mb.common.Delete'),
            'message': message || '',
            'noText': kony.i18n.getLocalizedString('i18n.common.no'),
            'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
            'yesClick': () => presenter.deleteDocument(docReference, this.view.id)
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
            'yesClick': () => presenter.submitInvoices(invoiceReferences, scope.view.id)
          };
          break;
      }
      this.view.formTemplate12.setPopup(popupContext);
    },
    /**
     * Saves the invoice details.
     * @param {string} invoiceId - Specifies the invoice widget instance id.
     */
    saveInvoice: function (invoiceId) {
      currInvoiceId = invoiceId;
      const invoiceData = contentScope[invoiceId].getData();
      if (this.checkForDuplicates()) return;
      presenter.saveInvoice(invoiceData, this.view.id);
    },
    /**
     * Deleted the invoice.
     * @param {string} invoiceId - Specifies the invoice widget instance id.
     */
    deleteInvoice: function (invoiceId) {
      currInvoiceId = invoiceId;
      const invoiceData = contentScope[invoiceId].getData();
      if (invoiceData.invoiceReference) {
        presenter.deleteInvoice(invoiceData.invoiceReference, this.view.id);
      } else {
        contentScope.flxDetails.remove(contentScope[currInvoiceId]);
        this.setInvoiceWidgetHeading();
        this.toggleSubmitButton();
        this.toggleAddMore(true);
      }
    },
    /**
     * Toggles the Add More option.
     * @param {boolean} flag - Specifes whether to enable/disable Add More option.
     */
    toggleAddMore: function (flag) {
      if (flag) {
        contentScope.flxAddMore.skin = 'sknFlxBgFFFFFFBr003e75Rad3px';
        contentScope.lblAddMore.skin = 'sknLbl29327615px';
      } else {
        contentScope.flxAddMore.skin = 'sknFlxfbfbfbBorder1pxe3e3e3Radius4px';
        contentScope.lblAddMore.skin = 'sknSSP72727215Px';
      }
      contentScope.flxAddMore.setEnabled(flag);
    },
    /**
     * Sets the invoice widget instances heading.
     */
    setInvoiceWidgetHeading: function () {
      const invoiceWidgets = contentScope.flxDetails.widgets();
      if (invoiceWidgets.length === 0) {
        this.toggleAddMore(true);
      }
      invoiceWidgets.forEach((widget, idx) => widget.setHeading(idx + 1));
    },
    /**
     * Sets the current invoice widget instance id.
     * @param {string} invoiceId - Specifies the invoice widget instance id.
     */
    setCurrentInvoiceId: function (invoiceId) {
      currInvoiceId = invoiceId;
    },
    /**
     * Uploads the document.
     * @param {object} document - Specifies the document info.
     * @param {string} invoiceId - Specifies the invoice widget instance id.
     */
    uploadDocument: function (document, invoiceId) {
      currInvoiceId = invoiceId;
      presenter.uploadDocument(document, this.view.id);
    },
    /**
     * Downloads the document.
     * @param {string} docRef - Specifies the document reference.
     */
    downloadDocument: function (docRef) {
      presenter.downloadDocument(docRef, this.view.id);
    },
    /**
     * Toogle the submit button.
     * @returns {void} - Returns nothing if any invoice widget is not saved.
     */
    toggleSubmitButton: function () {
      const invoiceWidgets = contentScope.flxDetails.widgets();
      invoiceReferences = [];
      if (invoiceWidgets.length === 0) {
        FormControllerUtility.disableButton(contentScope.btnSubmit);
        return;
      }
      for (const widget of invoiceWidgets) {
        const invoiceRef = widget.getInvoiceReference();
        (widget.isDataSaved() && invoiceRef) && invoiceReferences.push(invoiceRef);
      }
      enableWidgets = invoiceReferences.length === invoiceWidgets.length;
      if (enableWidgets) {
        FormControllerUtility.enableButton(contentScope.btnSubmit);
      } else {
        FormControllerUtility.disableButton(contentScope.btnSubmit);
        this.toggleAddMore(false);
      }
    },
    /**
     * Collapses the invoice widgets.
     * @param {string} invoiceId - Specifies the invoice widget id.
     */
    collapseWidgets: function (invoiceId = currInvoiceId) {
      const invoiceWidgets = contentScope.flxDetails.widgets();
      for (const widget of invoiceWidgets) {
        if (widget.id === invoiceId) continue;
        widget.toggleDropdown(true);
      }
    },
    /**
     * Indicates whether widgets are enabled or not.
     * @returns {boolean} - true if widgets are enabled, otherwise false.
     */
    areWidgetsEnabled: function () {
      return enableWidgets;
    },
    /**
     * Handles the errors.
     * @param {object} err - Specifies the error details.
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    },
    /**
     * check Invoice Records for duplicates
     */
    checkForDuplicates: function () {
      let records = [];
      const invoiceWidgets = contentScope.flxDetails.widgets();
      invoiceWidgets.forEach(widget => records.push(widget.getData()));
      if(presenter.isDuplicateRecordPresent([...existingInvoices, ...records]).length > 0) {
        FormControllerUtility.disableButton(contentScope.btnSubmit);
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({ 
          'dbpErrMsg': 'Duplicate Invoice Record present, Please Try Again !'
        });
        return true;
      }
      FormControllerUtility.enableButton(contentScope.btnSubmit);
      return false;
    },
  };
});