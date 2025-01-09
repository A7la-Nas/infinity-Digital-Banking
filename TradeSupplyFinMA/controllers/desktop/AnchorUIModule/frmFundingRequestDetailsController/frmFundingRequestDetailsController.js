define(["FormControllerUtility"], function (FormControllerUtility) {
  let scope, presenter, contentScope, popupScope, breakpoint, fundingRequest, facilityData, selectedFacilityData;
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
     * Handles the breakpoint change.
     * @param {object} formHandle - Specifies the handle of form.
     * @param {number} breakpoint - Specifies the current breakpoint value.
     */
    onBreakpointChange: function (form, width) {
      breakpoint = kony.application.getCurrentBreakpoint();
    },
    /**
     * Performs the actions required before rendering form.
     */
    preShow: function () {
      fundingRequest = JSON.parse(JSON.stringify(presenter.fundingRequest));
      this.view.formTemplate12.hideBannerError();
      contentScope.flxReturnRequestReason.setVisibility(false);
      contentScope.flxContainer.top = "0dp";
      if (fundingRequest.data.status === presenter.fundingStatus.ReturnedByBank) {
        contentScope.flxReturnRequestReason.setVisibility(true);
        contentScope.flxContainer.top = "20dp";
      }
    },
    /**
     * Performs the actions required after rendering form.
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      let roadmapData = [];
      for (const [key, value] of Object.entries(fundingRequest.roadmap)) {
        roadmapData.push({
          'isCurrentRow': key === 'step1',
          'rowStatus': fundingRequest.data[key] === 'done' ? 'done' : key === 'step1' ? 'Inprogress' : 'Incomplete',
          'rowLabel': value.text,
          'rowForm': value.form
        });
      }
      contentScope.ProgressTracker.setData({
        'heading': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.fundingRequest'),
        'subheading': `${kony.i18n.getLocalizedString('i18n.serviceRequests.ReferenceNo')} ${fundingRequest.data.fundingRequestId || '-'}`,
        'data': roadmapData
      });
      if (fundingRequest.data.step1 !== 'done') {
        this.resetForm();
        this.setDropdownData();
        if (Object.keys(fundingRequest.data).length != 0)
          this.populateData();
      }
    },
    /**
     * Initialises the form actions.
     */
    initFormActions: function () {
      scope = this;
      presenter = applicationManager.getModulesPresentationController({ appName: 'TradeSupplyFinMA', moduleName: 'AnchorUIModule' });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      contentScope.tbxProgramName.setEnabled(false);
      contentScope.tbxFacilityAvailableLimit.setEnabled(false);
      contentScope.tbxFacilityUtilisedLimit.setEnabled(false);
      contentScope.tbxAmount.onTextChange = () => {
        contentScope.tbxAmount.text = contentScope.tbxAmount.text.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1').replace(/^(\d+\.\d{2}).*$/, '$1');
        scope.enableOrDisableSubmitButton();
      };
      contentScope.btnClose.onClick = () => scope.togglePopup("saveDraftOrClose");
      contentScope.btnSubmit.onClick = this.saveRequest;
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
      if (viewModel.saveFundingRequest) {
        presenter.fundingRequest.data['step1'] = 'done';
        presenter.showView({ 'form': 'frmInvoiceDetails' });
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
      contentScope.FacilityDropdown.removeSelection();
      contentScope.FacilityDropdown.setDefaultText();
      contentScope.tbxProgramName.text = '';
      contentScope.tbxFacilityAvailableLimit.text = '';
      contentScope.tbxFacilityUtilisedLimit.text = '';
      contentScope.ProductDropdown.removeSelection();
      contentScope.ProductDropdown.setDefaultText();
      contentScope.CurrencyDropdown.removeSelection();
      contentScope.CurrencyDropdown.setDefaultText();
      contentScope.tbxAmount.text = '';
      FormControllerUtility.disableButton(contentScope.btnSubmit);
    },
    setDropdownData: function () {
      const facility = (presenter.anchorProgramsList || []).reduce(function (acc, obj) {
        (obj.facilities || []).forEach(f => {
          const currSymbol = presenter.configurationManager.getCurrency(f.currency);
          acc['data'][f.account] = {
            'currency': f.currency,
            'availableLimit': `${currSymbol}${presenter.formatUtilManager.formatAmount(f.availableCommitment)}`,
            'utilisedLimit': `${currSymbol}${presenter.formatUtilManager.formatAmount(f.utilisedCommitment)}`,
            'programName': obj.shortTitle,
            'allowedProduct': (f.allowedProduct || '').split(','),
            'allowedCurrency': (f.allowedCurrency || '').split(',')
          };
          acc['dropdown'][f.account] = `${f.shortTitle}(${f.account})`;
        });
        return acc;
      }, { 'data': {}, 'dropdown': {} });
      facilityData = facility.data;
      contentScope.FacilityDropdown.setContext(facility.dropdown);
    },
    /**
     * Handles the dropdown selection trigerred from component.
     * @param {string} widgetId - Specifies widget id.
     * @param {string} selectedKey - Specifies selected key.
     */
    handleDropdownSelection: function (widgetId, selectedKey) {
      switch (widgetId) {
        case 'FacilityDropdown':
          selectedFacilityData = facilityData[selectedKey];
          contentScope.tbxProgramName.text = selectedFacilityData.programName;
          contentScope.tbxFacilityAvailableLimit.text = selectedFacilityData.availableLimit;
          contentScope.tbxFacilityUtilisedLimit.text = selectedFacilityData.utilisedLimit;
          contentScope.ProductDropdown.setContext(selectedFacilityData.allowedProduct);
          contentScope.CurrencyDropdown.setContext(selectedFacilityData.allowedCurrency);
          contentScope.ProductDropdown.setDefaultText();
          contentScope.CurrencyDropdown.setDefaultText();
          contentScope.tbxAmount.text = '';
        case 'CurrencyDropdown':
          if ((widgetId === 'FacilityDropdown' && presenter.fundingRequest.data['facilityId'] !== selectedKey) ||
            (widgetId === 'CurrencyDropdown' && presenter.fundingRequest.data['currency'] !== selectedKey)) {
            ['step2', 'supplierId', 'buyerId', 'invoiceReferences'].forEach(f => delete presenter.fundingRequest.data[f]);
          }
        case 'ProductDropdown':
          scope.enableOrDisableSubmitButton();
          break;
      }
    },
    togglePopup: function (flow) {
      let popupContext = {};
      switch (flow) {
        case "saveDraftOrClose":
          popupContext = {
            'heading': 'Close Confirmation',
            'message': kony.i18n.getLocalizedString('i18n.TradeFinance.saveThisRequestAsDraftOrClose'),
            'noText': kony.i18n.getLocalizedString("i18n.TradeFinance.closeWithoutSaving"),
            'yesText': kony.i18n.getLocalizedString("i18n.TradeFinance.SaveasDraft&Close"),
            'noClick': () => presenter.loadScreenWithContext({ context: 'anchorDashboard' }),
            'yesClick': () => this.saveRequest(flow)
          };
          break;
      }
      this.view.formTemplate12.setPopup(popupContext);
    },
    getFormData: function () {
      let formData = {
        'facilityId': contentScope.FacilityDropdown.getSelectedKey() || '',
        'facilityCurrency': selectedFacilityData.currency || '',
        'programName': contentScope.tbxProgramName.text,
        'facilityAvailableLimit': presenter.formatUtilManager.deFormatAmount(contentScope.tbxFacilityAvailableLimit.text),
        'facilityUtilisedLimit': presenter.formatUtilManager.deFormatAmount(contentScope.tbxFacilityUtilisedLimit.text),
        'productName': contentScope.ProductDropdown.getSelectedKey() || '',
        'currency': contentScope.CurrencyDropdown.getSelectedKey() || '',
        'fundingRequestAmount': contentScope.tbxAmount.text
      };
      return formData;
    },
    enableOrDisableSubmitButton: function () {
      const formData = this.getFormData();
      const mandatoryFilled = [formData['facilityId'], formData['productName'], formData['currency'], formData['fundingRequestAmount']].every(value => !!value);
      FormControllerUtility[mandatoryFilled ? 'enableButton' : 'disableButton'](contentScope.btnSubmit);
    },
    saveRequest: function (flow) {
      const formData = this.getFormData();
      presenter.saveFundingRequest({ 'form': this.view.id, flow, formData });
    },
    /**
     * Handles population of data in the funding request details screen.
     */
    populateData: function () {
      let currentData = fundingRequest.data;
      if (currentData.facilityId) {
        contentScope.FacilityDropdown.selectKey(currentData.facilityId);
      }
      if (currentData.productName) {
        contentScope.ProductDropdown.selectKey(currentData.productName);
      }
      if (currentData.currency) {
        contentScope.CurrencyDropdown.selectKey(currentData.currency);
      }
      if (currentData.fundingRequestAmount) {
        contentScope.tbxAmount.text = currentData.fundingRequestAmount;
      }
      if (currentData.status === presenter.fundingStatus.ReturnedByBank) {
        contentScope.FacilityDropdown.disableDrodown();
        contentScope.ProductDropdown.disableDrodown();
        contentScope.CurrencyDropdown.disableDrodown();
      }
      this.enableOrDisableSubmitButton();
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