define(["SCFUtils"], function (SCFUtils) {
  let scope, presenter, contentScope, breakpoint, invoiceDetails,tabSelected = 1;
  return {
    /**
     * Sets the initial actions for form.
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () {};
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

    onBreakpointChange: function (form, width) {
      breakpoint = kony.application.getCurrentBreakpoint();
    },

    /**
     * Performs the actions required before rendering form.
     */
    preShow: function () {
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
        appName: 'TradeSupplyFinMA',
        moduleName: 'AnchorUIModule'
      });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      contentScope.btnInvoiceDetails.onClick = () => this.setListTab(1);
      contentScope.btnAttachedDocument.onClick = () => this.setListTab(2);
      contentScope.flxBankRequestDocument.setVisibility(false);
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
      if (viewModel.fundingRequestData) {
        invoiceDetails = viewModel.fundingRequestData;
        this.setListTab(1);
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'dbpErrMsg': viewModel.serverError
        });
      }
    },

    /**
     * Populate the Invoice details 
     */
    setInvoiceDetails: function () {
      contentScope.segInvoiceDetails.widgetDataMap = {
        'flxValue': 'flxValue',
        'flxKey': 'flxKey',
        'lblKey': 'lblKey',
        'lblValue': 'lblValue'
      };
      let segRowData = [{
        lblKey: kony.i18n.getLocalizedString("kony.mb.common.refNumberColon"),
        lblValue: invoiceDetails.invoiceReference || 'NA'
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.supplierIDWithColon"),
        lblValue: invoiceDetails.supplierId || 'NA'
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.buyerIDWithColon"),
        lblValue: invoiceDetails.buyerId || 'NA'
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.billPayee.review.amount"),
        lblValue: `${presenter.configurationManager.getCurrency(invoiceDetails.invoiceCurrency)}${presenter.formatUtilManager.formatAmount(invoiceDetails.invoiceAmount)}`,
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.savingsPot.createdDate"),
        lblValue: invoiceDetails.createdDate,
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.issueDateWithColon"),
        lblValue: invoiceDetails.issueDate
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.Wealth.maturityDate"),
        lblValue: invoiceDetails.maturityDate
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.serviceRequests.Status:"),
        lblValue: invoiceDetails.status,
      }, ];
      segRowData = segRowData.map(item => ({
        ...item,
        'flxKey': {
          'width':'29%'
        }
      }));
      contentScope.segInvoiceDetails.setData(segRowData);
      contentScope.flxInvoiceDetails.forceLayout();
    },

    /**
     * Method to Handle the tab...
     */
    setListTab: function (tabIdx) {
      tabSelected = tabIdx;
      [
        contentScope.btnInvoiceDetails,
        contentScope.btnAttachedDocument
      ].map((widget, index) => ((index === tabSelected - 1) ? widget.skin = 'ICSknBtnAccountSummarySelected2' : widget.skin = 'ICSknBtnAccountSummaryUnselected2'));
      [
        contentScope.flxInvoiceDetails,
        contentScope.flxAttachedDocuments
      ].map((widget, index) => ((index === tabSelected - 1) ? widget.setVisibility(true) : widget.setVisibility(false)));
      if (Object.keys(invoiceDetails).length === 0) {
        contentScope.flxInvoiceDetails.setVisibility(false);
        contentScope.flxAttachedDocuments.setVisibility(false);
        contentScope.flxNoInvoice.setVisibility(true);
        return;
      }
      if (tabSelected == 1) {
        this.setInvoiceDetails();
        contentScope.flxInvoiceDetails.setVisibility(true);
        contentScope.flxAttachedDocuments.setVisibility(false);
        contentScope.flxNoInvoice.setVisibility(false);
      } else if (tabSelected == 2) {
        this.setDocumentsData();
        contentScope.flxAttachedDocuments.setVisibility(true);
        contentScope.flxInvoiceDetails.setVisibility(false);
        contentScope.flxNoInvoice.setVisibility(false);
      }
    },

    /**
     * Handles the setting the uploaded Document Details section...
     */
    setDocumentsData: function () {
      let docContainerId = 'uploadedDoc';
      let documents = invoiceDetails.invoiceDocuments ? JSON.parse(invoiceDetails.invoiceDocuments) : [];
      if (documents.length > 0) {
        contentScope.flxNoDocuments.setVisibility(false);
        contentScope.flxListOfDocuments.widgets().forEach(widget => {
          if (widget && widget.id.startsWith('doc')) {
            contentScope.flxListOfDocuments.remove(widget);
          }
        });
        contentScope.flxAttachedDocuments.remove(contentScope[(contentScope.flxBankRequestDocument.clone(docContainerId)).id])
        contentScope.flxAttachedDocuments.add(contentScope.flxBankRequestDocument.clone(docContainerId));
        this.processDocumentDetails(documents, contentScope.flxBankRequestDocument.clone(docContainerId).id, contentScope[docContainerId + "lblDocumentName"], contentScope[docContainerId + "imgDocumentType"], contentScope[docContainerId + "flxListOfDocuments"], contentScope[docContainerId + "flxDocument"], true);
      } else {
        contentScope.flxAttachedDocuments.remove(contentScope[(contentScope.flxBankRequestDocument.clone(docContainerId)).id])
        contentScope.flxNoDocuments.setVisibility(true);
      }
    },

    /**
     * Process the Document Details
     */
    processDocumentDetails: function (documents, content, label, image, list, replica, isDownloadAllowed = true) {
      contentScope[content].setVisibility(false);
      list.widgets().forEach(widget => {
        if (widget && widget.id.startsWith('doc')) {
          list.remove(widget);
        }
      });
      if (documents.length > 0) {
        contentScope[content].setVisibility(true);
        label.text = documents[0].documentName;
        image.src = SCFUtils.getDocumentImages(documents[0].documentName.split('.').pop());
        if (isDownloadAllowed) {
          replica.onClick = () => presenter.downloadDocument(documents[0].documentReference, kony.application.getCurrentForm().id);
          replica.cursorType = 'pointer';
        }
        documents.slice(1).forEach((document, i) => {
          list.remove(contentScope[replica.clone("doc" + i).id])
          list.add(replica.clone("doc" + i));
          if (isDownloadAllowed) {
            contentScope["doc" + i + replica.id].onClick = () => presenter.downloadDocument(document.documentReference, kony.application.getCurrentForm().id)
            contentScope[["doc" + i + replica.id]].cursorType = 'pointer';
          }
          contentScope["doc" + i + label.id].text = document.documentName;
          contentScope["doc" + i + image.id].src = SCFUtils.getDocumentImages(document.documentName.split('.').pop());
        });
      }
    },
  };
});