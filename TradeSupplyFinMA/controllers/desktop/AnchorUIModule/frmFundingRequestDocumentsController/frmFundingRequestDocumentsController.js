define(["FormControllerUtility"], function (FormControllerUtility) {
  let scope, presenter, contentScope, popupScope, breakpoint, fundingRequest, docWidgetId;
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
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
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
      for (const [key, value] of Object.entries(presenter.fundingRequest.roadmap)) {
        roadmapData.push({
          'isCurrentRow': key === 'step3',
          'rowStatus': fundingRequest.data[key] === 'done' ? 'done' : key === 'step3' ? 'Inprogress' : 'Incomplete',
          'rowLabel': value.text,
          'rowForm': value.form
        });
      }
      contentScope.ProgressTracker.setData({
        'heading': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.fundingRequest'),
        'subheading': `${kony.i18n.getLocalizedString('i18n.serviceRequests.ReferenceNo')} ${fundingRequest.data.fundingRequestId || '-'}`,
        'data': roadmapData
      });
      if (fundingRequest.data.step3 !== 'done') {
        this.resetForm();
      }
      let fundingDocuments = fundingRequest.data.fundingDocuments;
      for (var key in fundingDocuments) {
        fundingDocuments[key].forEach(document => contentScope[key].setDocumentData(document.documentName, document.documentReference));
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
      contentScope.btnClose.onClick = () => scope.togglePopup("saveDraftOrClose");
      contentScope.btnBack.onClick = () => {
        delete presenter.fundingRequest.data['step2'];
        presenter.showView({ 'form': 'frmInvoiceDetails' });}
      contentScope.btnSubmit.onClick = this.saveRequest;
      for (const category of scope_configManager.SCF_Document_category) {
        const documentWidget = new com.InfinityOLB.TradeSupplyFin.FundingRequestDocument({
          'clipBounds': false,
          'id': category.key,
          'isVisible': true,
          'top': '12dp',
          'zIndex': 1,
          'appName': 'TradeSupplyFinMA',
          'masterType': constants.MASTER_TYPE_DEFAULT
        }, {}, {});
        contentScope.flxDetails.add(documentWidget);
        contentScope[category.key].lblHeading.text = category.displayName;
      }
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
        contentScope[docWidgetId].addDocument(viewModel.uploadDocument.LCDocuments[0].documentReference);
      }
      if (viewModel.deleteDocument) {
        contentScope[docWidgetId].removeDocument();
      }
      if (viewModel.saveFundingRequest) {
        presenter.fundingRequest.data['step3'] = 'done';
        presenter.showView({ 'form': 'frmFundingRequestSummary' });
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
      const context = {
        'format': fundingRequest.config.documentFormat,
        'maxSize': fundingRequest.config.documentMaxSize
      };
      contentScope.lblInfo.text = `Following file types can be Uploaded - ${fundingRequest.config.documentFormat.map(e => `.${e}`).join(', ')} & Maximum file size ${fundingRequest.config.documentMaxSize}.`;
      const docWidgets = contentScope.flxDetails.widgets();
      docWidgets.forEach(w => w.setContext(context));
    },
    togglePopup: function (flow, message, widgetId) {
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
        case 'uploadDocument':
          popupContext = {
            heading: kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocument"),
            message: message,
            noText: kony.i18n.getLocalizedString("i18n.common.close"),
            yesText: kony.i18n.getLocalizedString("kony.mb.common.TryAgain"),
            yesClick: () => contentScope[widgetId].browseSupportingDocument()
          };
          break;
      }
      this.view.formTemplate12.setPopup(popupContext);
    },
    uploadDocument: function (document, widgetId) {
      docWidgetId = widgetId;
      presenter.uploadDocument(document, this.view.id);
    },
    deleteDocument: function (document, widgetId) {
      docWidgetId = widgetId;
      let popupContext = {
        heading: kony.i18n.getLocalizedString("kony.mb.common.Delete"),
        message: `${kony.i18n.getLocalizedString("i18n.TradeFinance.deleteDocumentMessage")} "${document.documentName}"?`,
        noText: kony.i18n.getLocalizedString("i18n.common.no"),
        yesText: kony.i18n.getLocalizedString("i18n.common.yes"),
        yesClick: () => presenter.deleteDocument(document.documentReference, this.view.id)
      };
      this.view.formTemplate12.setPopup(popupContext);
    },
    downloadDocument: function (docRef) {
      presenter.downloadDocument(docRef, this.view.id);
    },
    getFormData: function () {
      let fundingDocuments = {};
      const docWidgets = contentScope.flxDetails.widgets();
      docWidgets.forEach(w => fundingDocuments[w.id] = w.getData());
      return { fundingDocuments };
    },
    saveRequest: function (flow) {
      const formData = this.getFormData();
      presenter.saveFundingRequest({ 'form': this.view.id, flow, formData });
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