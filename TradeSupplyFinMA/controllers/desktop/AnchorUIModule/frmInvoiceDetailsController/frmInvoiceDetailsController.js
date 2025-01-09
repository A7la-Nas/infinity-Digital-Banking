define(["FormControllerUtility", "ViewConstants", "SCFUtils"], function (FormControllerUtility, ViewConstants, SCFUtils) {
  const fontIcons = {
    'chevronUp': 'P',
    'chevronDown': 'O',
    'checkboxSelected': '\uE926',
    'checkboxUnselected': '\uE924'
  }, skins = {
    'checkboxSelected': 'sknLbl003e75InfinityIcons20px',
    'checkboxUnselected': 'sknLbl647277InfinityIcons20px',
    'pageEnabled': 'sknOLBFonts003e7512px',
    'pageDisabled': 'sknLblFontTypeIcona0a0a012px'
  }, images = {
    'sortAsc': ViewConstants.IMAGES.SORT_PREV_IMAGE,
    'sortDesc': ViewConstants.IMAGES.SORT_NEXT_IMAGE,
    'noSort': ViewConstants.IMAGES.SORT_FINAL_IMAGE
  };
  let scope, presenter, contentScope, popupScope, breakpoint, fundingRequest,
    invoicesData, previousIndex, totalPages, currentPage, allChecked, totalInvoiceAmount = 0, listParams = {
      sortByParam: '',
      sortOrder: ''
    };
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
          'isCurrentRow': key === 'step2',
          'rowStatus': fundingRequest.data[key] === 'done' ? 'done' : key === 'step2' ? 'Inprogress' : 'Incomplete',
          'rowLabel': value.text,
          'rowForm': value.form
        });
      }
      contentScope.ProgressTracker.setData({
        'heading': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.fundingRequest'),
        'subheading': `${kony.i18n.getLocalizedString('i18n.serviceRequests.ReferenceNo')} ${fundingRequest.data.fundingRequestId || '-'}`,
        'data': roadmapData
      });
      contentScope.lblInvoicesAmount.text = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.TotalInvoiceAmount')} - ${presenter.configurationManager.getCurrency(fundingRequest.data.currency)} 0.00`;
      contentScope.lblFundingRequestAmount.text = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.fundingRequestAmount')} - ${presenter.configurationManager.getCurrency(fundingRequest.data.currency)}${presenter.formatUtilManager.formatAmount(fundingRequest.data.fundingRequestAmount)}`;
      if (fundingRequest.data.step2 !== 'done') {
        this.resetForm();
        this.populateData();
      }
    },

    /**
     * Initialises the form actions.
     */
    initFormActions: function () {
      scope = this;
      presenter = applicationManager.getModulesPresentationController({ 'appName': 'TradeSupplyFinMA', 'moduleName': 'AnchorUIModule' });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      [
        contentScope.flxPageStart,
        contentScope.flxPagePrevious,
        contentScope.flxPageNext,
        contentScope.flxPageEnd,
      ].forEach(w => w.cursorType = 'pointer');
      contentScope.tbxCurrency.setEnabled(false);
      contentScope.btnFetchInvoices.onClick = this.fetchInvoices;
      contentScope.flxPageStart.onClick = this.applyPagination.bind(this, 'start');
      contentScope.flxPagePrevious.onClick = this.applyPagination.bind(this, 'previous');
      contentScope.flxPageNext.onClick = this.applyPagination.bind(this, 'next');
      contentScope.flxPageEnd.onClick = this.applyPagination.bind(this, 'end');
      contentScope.btnClose.onClick = () => scope.togglePopup("saveDraftOrClose");
      contentScope.btnBack.onClick = () => {
        delete presenter.fundingRequest.data['step1'];
        presenter.showView({ 'form': 'frmFundingRequestDetails' });
      };
      contentScope.btnSubmit.onClick = this.onClickOfSave;
      this.renderCalendars();
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
        presenter.fundingRequest.data['step2'] = 'done';
        presenter.showView({ 'form': 'frmFundingRequestDocuments' });
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({ 'dbpErrMsg': viewModel.serverError });
      }
    },
    /**
    * Sets the position of calendars.
    */
    renderCalendars: function () {
      const calendars = [contentScope.calFinancingDate];
      for (const calWidget of calendars) {
        calWidget.dateEditable = false;
        calWidget.setContext({
          "widget": calWidget,
          "anchor": "bottom"
        });
      }
    },
    /**
     * Resets the form.
     */
    resetForm: function () {
      totalInvoiceAmount = 0;
      listParams = {
        'sortByParam': 'supplierName',
        'sortOrder': 'ASC'
      };
      contentScope.tbxSupplierId.text = '';
      contentScope.tbxCurrency.text = fundingRequest.data.currency;
      contentScope.tbxBuyerId.text = '';
      contentScope.calFinancingDate.clear();
      contentScope.flxInvoices.setVisibility(false);
      contentScope.flxNoInvoice.setVisibility(false);
      FormControllerUtility.disableButton(contentScope.btnSubmit);
    },
    fetchInvoices: function () {
      let criteria = {
        'searchParam': {},
        'filterParam': {
          'invoiceCurrency': contentScope.tbxCurrency.text
        },
        'dateParam': {}
      };
      if (contentScope.tbxSupplierId.text) {
        criteria['filterParam']['supplierId'] = contentScope.tbxSupplierId.text;
      }
      if (contentScope.tbxBuyerId.text) {
        criteria['filterParam']['buyerId'] = contentScope.tbxBuyerId.text;
      }
      if (contentScope.calFinancingDate.formatted) {
        criteria['filterParam']['issueDate'] = contentScope.calFinancingDate.formatted;
      }

      contentScope.lblInvoicesAmount.text = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.TotalInvoiceAmount')} - ${presenter.configurationManager.getCurrency(fundingRequest.data.currency)}${presenter.formatUtilManager.formatAmount(totalInvoiceAmount)}`;
      invoicesData = JSON.parse(JSON.stringify(SCFUtils.searchAndFilterRecords(presenter.invoicesForFundingRequestByAnchor, criteria)));
      if (invoicesData.length === 0) {
        contentScope.flxInvoices.setVisibility(false);
        contentScope.flxNoInvoice.setVisibility(true);
        return;
      }
      contentScope.flxInvoices.setVisibility(true);
      contentScope.flxNoInvoice.setVisibility(false);
      totalPages = Math.ceil(invoicesData.length / 10);
      currentPage = totalPages === 0 ? 0 : 1;
      allChecked = false;
      if (fundingRequest.data.invoiceReferences) {
        let selectedInvoices = fundingRequest.data.invoiceReferences;
        let selectedInvoiceIds = [];
        selectedInvoices.forEach(i => selectedInvoiceIds.push(i.invoiceReference));
        invoicesData.forEach(function (invoice) {
          if (selectedInvoiceIds.includes(invoice.invoiceReference)) {
            invoice['isChecked'] = true;
            totalInvoiceAmount += invoice['invoiceAmount'];
          }
        });
        if (selectedInvoices.length === invoicesData.length) {
          allChecked = true;
        }
      }
      contentScope.lblInvoicesAmount.text = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.TotalInvoiceAmount')} - ${presenter.configurationManager.getCurrency(fundingRequest.data.currency)}${presenter.formatUtilManager.formatAmount(totalInvoiceAmount)}`;
      this.setPagination();
      this.sortRecords();
      this.enableOrDisableSubmitButton();
    },
    sortRecords: function (context) {
      if (context) {
        const widgetSrc = context.widgets()[1].src;
        listParams['sortOrder'] = (widgetSrc === images.noSort) ? 'ASC' : (widgetSrc === images.sortAsc) ? 'DESC' : 'ASC';
      }
      invoicesData = SCFUtils.sortRecords(invoicesData, listParams);
      this.setInvoicesData();
    },
    /**
     * Applies the pagination.
     * @param {string} pageFlow - Specifies the page flow.
     * @returns {void} - Returns nothing if pagination is not applicable.
     */
    applyPagination: function (pageFlow) {
      if (totalPages === 0) {
        return;
      }
      switch (pageFlow) {
        case 'previous':
          if (currentPage === 1) {
            return;
          }
          currentPage--;
          break;
        case 'next':
          if (totalPages === currentPage) {
            return;
          }
          currentPage++;
          break;
        case 'start':
          if (currentPage === 1) {
            return;
          }
          currentPage = 1;
          break;
        case 'end':
          if (currentPage === totalPages) {
            return;
          }
          currentPage = totalPages;
          break;
      }
      previousIndex = undefined;
      this.setPagination();
      this.setInvoicesData();
    },
    /**
     * Sets the pagination container.
     */
    setPagination: function () {
      contentScope.lblPageText.text = `${currentPage} - ${totalPages} ${kony.i18n.getLocalizedString('i18n.konybb.Common.Pages')}`;
      contentScope.lblPageStartIcon.skin = currentPage === 1 ? skins.pageDisabled : skins.pageEnabled;
      contentScope.lblPagePreviousIcon.skin = currentPage > 1 ? skins.pageEnabled : skins.pageDisabled;
      contentScope.lblPageNextIcon.skin = currentPage < totalPages ? skins.pageEnabled : skins.pageDisabled;
      contentScope.lblPageEndIcon.skin = currentPage === totalPages ? skins.pageDisabled : skins.pageEnabled;
    },
    /**
     * Sets the Invoices data.
     */
    setInvoicesData: function () {
      const start = parseInt(currentPage - 1 + "0"),
        end = start + 10;
      const paginatedRecords = (invoicesData || []).slice(start, end);
      let segData = [], segRowData = [];
      previousIndex = undefined;
      for (const record of paginatedRecords) {
        segRowData.push({
          'lblDropdown': fontIcons.chevronDown,
          'flxDashboardListRow': {
            'skin': 'sknflxffffffnoborder'
          },
          "flxDetails": {
            "isVisible": false
          },
          "flxIdentifier": {
            "skin": "slFbox"
          },
          "flxDropdown": {
            "onClick": this.handleSegmentRowView
          },
          'flxColumn1': {
            'width': '22.5%',
          },
          'flxColumn2': {
            'width': '25%'
          },
          'flxColumn3': {
            'width': '20%',
          },
          'flxColumn4': {
            'isVisible': true,
            'layoutType': kony.flex.FREE_FORM,
            'width': '20%',
          },
          'flxAction': {
            'isVisible': false
          },
          'flxCheckbox': {
            'isVisible': true,
            'onClick': function () {
              scope.toggleCheckbox(arguments[1].rowIndex);
            }
          },
          'flxRow4': {
            'isVisible': true
          },
          'flxRow5': {
            'isVisible': true
          },
          'lblCheckbox': {
            'text': record.isChecked ? fontIcons.checkboxSelected : fontIcons.checkboxUnselected,
            'skin': record.isChecked ? skins.checkboxSelected : skins.checkboxUnselected,
          },
          'lblColumn1': record.supplierName || '',
          'lblColumn2': record.buyerName || '',
          'lblColumn3': record.invoiceReference || '',
          'lblColumn4': {
            'text': `${presenter.configurationManager.getCurrency(record.invoiceCurrency)}${presenter.formatUtilManager.formatAmount(record.invoiceAmount)}`,
            'left': '',
            'right': '20dp'
          },
          'lblRow1Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.buyerIDWithColon'),
          'lblRow1Value': record.buyerId || '',
          'lblRow2Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.supplierIDWithColon'),
          'lblRow2Value': record.supplierId || '',
          'lblRow3Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.CreationDateWithColon'),
          'lblRow3Value': record.issueDate || '',
          'lblRow4Key': kony.i18n.getLocalizedString('i18n.Wealth.maturityDate'),
          'lblRow4Value': record.maturityDate || '',
          'lblRow5Key': kony.i18n.getLocalizedString('i18n.wealth.statuswithColon'),
          'lblRow5Value': record.status || '',
          'invoiceAmount': record.invoiceAmount
        });
      }
      segData.push([{
        'flxCheckbox': {
          'isVisible': true,
          'onClick': function () {
            scope.toggleCheckbox(arguments[1].rowIndex);
          }
        },
        'flxColumn1': {
          'width': '22.5%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'supplierName';
            scope.sortRecords(context)
          }
        },
        'flxColumn2': {
          'width': '25%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'buyerName';
            scope.sortRecords(context)
          }
        },
        'flxColumn3': {
          'width': '20%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'invoiceReference';
            scope.sortRecords(context)
          }
        },
        'flxColumn4': {
          'isVisible': true,
          'width': '20%',
          'layoutType': kony.flex.FREE_FORM,
          'onClick': function (context) {
            listParams['sortByParam'] = 'invoiceAmount';
            scope.sortRecords(context)
          }
        },
        'flxAction': {
          'isVisible': false
        },
        'lblCheckbox': {
          'text': allChecked ? fontIcons.checkboxSelected : fontIcons.checkboxUnselected,
          'skin': allChecked ? skins.checkboxSelected : skins.checkboxUnselected
        },
        'lblColumn1': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.supplierName'),
        'lblColumn2': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.buyerName'),
        'lblColumn3': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.InvoiceReference'),
        'lblColumn4': {
          'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.invoiceAmount'),
          'left': '',
          'right': '40dp'
        },
        'imgColumn1': {
          'src': scope.getSortImage('supplierName')
        },
        'imgColumn2': {
          'src': scope.getSortImage('buyerName')
        },
        'imgColumn3': {
          'src': scope.getSortImage('invoiceReference')
        },
        'imgColumn4': {
          'left': '',
          'right': '20dp',
          'src': scope.getSortImage('invoiceAmount')
        }
      }, segRowData
      ]);
      contentScope.segInvoices.setData(segData);
      contentScope.flxInvoicesList.forceLayout();
    },
    /**
     * Returns the sort image.
     * @param {string} sortBy - Specifies the sort by field name.
     * @returns {string} - Sort image name.
     */
    getSortImage: function (sortBy) {
      return listParams['sortByParam'] === sortBy ? (listParams['sortOrder'] === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
    },
    /**
     * Handles the segment row view on click of dropdown.
     */
    handleSegmentRowView: function () {
      const rowIndex = contentScope.segInvoices.selectedRowIndex[1],
        segData = contentScope.segInvoices.data[0][1],
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
      contentScope.segInvoices.setDataAt(data, index, 0);
    },
    /**
     * Toggles the checkbox.
     * @param {Number} rowIndex - Index of segment row.
     */
    toggleCheckbox: function (rowIndex) {
      const segData = contentScope.segInvoices.data;
      if (rowIndex === -1) {
        totalInvoiceAmount = 0;
        allChecked = !(segData[0][0]['lblCheckbox'].text === fontIcons.checkboxSelected);
        invoicesData.forEach(r => {
          r['isChecked'] = allChecked;
          if (allChecked)
            totalInvoiceAmount += parseFloat(r['invoiceAmount']);
        });
        if (allChecked) {
          segData[0][0]['lblCheckbox'].text = fontIcons.checkboxSelected;
          segData[0][0]['lblCheckbox'].skin = skins.checkboxSelected;
        } else {
          segData[0][0]['lblCheckbox'].text = fontIcons.checkboxUnselected;
          segData[0][0]['lblCheckbox'].skin = skins.checkboxUnselected;
        }
        segData[0][1].forEach(r => {
          if (allChecked) {
            r['lblCheckbox']['text'] = fontIcons.checkboxSelected;
            r['lblCheckbox']['skin'] = skins.checkboxSelected;
          } else {
            r['lblCheckbox']['text'] = fontIcons.checkboxUnselected;
            r['lblCheckbox']['skin'] = skins.checkboxUnselected;
          }
        });
      } else {
        allChecked = false;
        const isChecked = !(segData[0][1][rowIndex]['lblCheckbox']['text'] === fontIcons.checkboxSelected);
        invoicesData[(currentPage - 1) * 10 + rowIndex]['isChecked'] = isChecked;
        if (isChecked) {
          segData[0][1][rowIndex]['lblCheckbox']['text'] = fontIcons.checkboxSelected;
          segData[0][1][rowIndex]['lblCheckbox']['skin'] = skins.checkboxSelected;
          totalInvoiceAmount += parseFloat(segData[0][1][rowIndex]['invoiceAmount']);
        } else {
          segData[0][1][rowIndex]['lblCheckbox']['text'] = fontIcons.checkboxUnselected;
          segData[0][1][rowIndex]['lblCheckbox']['skin'] = skins.checkboxUnselected;
          totalInvoiceAmount -= parseFloat(segData[0][1][rowIndex]['invoiceAmount']);
        }
        if (allChecked && isChecked) {
          segData[0][0]['lblCheckbox'].text = fontIcons.checkboxSelected;
          segData[0][0]['lblCheckbox'].skin = skins.checkboxSelected;
        } else {
          segData[0][0]['lblCheckbox'].text = fontIcons.checkboxUnselected;
          segData[0][0]['lblCheckbox'].skin = skins.checkboxUnselected;
        }
      }
      contentScope.segInvoices.setData(segData);
      contentScope.lblInvoicesAmount.text = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.TotalInvoiceAmount')} - ${presenter.configurationManager.getCurrency(fundingRequest.data.currency)}${presenter.formatUtilManager.formatAmount(totalInvoiceAmount)}`;
      this.enableOrDisableSubmitButton();
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
        case "InvoiceAmountMore":
          popupContext = {
            'heading': kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.confirmSubmission"),
            'message': kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.invoiceAmountMoreMsg"),
            'noText': kony.i18n.getLocalizedString("i18n.common.no"),
            'yesText': kony.i18n.getLocalizedString("i18n.common.yes"),
            'yesClick': () => this.saveRequest(flow)
          };
          break;
        case "InvoiceAmountLess":
          popupContext = {
            'heading': kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.confirmSubmission"),
            'message': kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.invoiceAmountLessMsg"),
            'noText': kony.i18n.getLocalizedString("i18n.common.no"),
            'yesText': kony.i18n.getLocalizedString("i18n.common.yes"),
            'yesClick': () => this.saveRequest(flow)
          };
          break;
      }
      this.view.formTemplate12.setPopup(popupContext);
    },
    getFormData: function () {
      let formData = {
        'supplierId': contentScope.tbxSupplierId.text,
        'buyerId': contentScope.tbxBuyerId.text,
        'invoiceReferences': []
      };
      invoicesData.forEach(i => i.isChecked && formData['invoiceReferences'].push(i));
      return formData;
    },
    enableOrDisableSubmitButton: function () {
      const formData = this.getFormData();
      FormControllerUtility[formData['invoiceReferences'].length > 0 ? 'enableButton' : 'disableButton'](contentScope.btnSubmit);
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
    },

    populateData: function () {
      let currentData = fundingRequest.data;
      if (currentData.supplierId)
        contentScope.tbxSupplierId.text = currentData.supplierId;
      if (currentData.buyerId)
        contentScope.tbxBuyerId.text = currentData.buyerId;
      if (fundingRequest.data.invoiceReferences)
        this.fetchInvoices();
    },

    onClickOfSave: function (flow) {
      if (totalInvoiceAmount > parseFloat(fundingRequest.data.fundingRequestAmount)) {
        this.togglePopup("InvoiceAmountMore");
      } else if (totalInvoiceAmount < parseFloat(fundingRequest.data.fundingRequestAmount)) {
        this.togglePopup("InvoiceAmountLess");
      } else {
        this.saveRequest();
      }
    }
  };
});