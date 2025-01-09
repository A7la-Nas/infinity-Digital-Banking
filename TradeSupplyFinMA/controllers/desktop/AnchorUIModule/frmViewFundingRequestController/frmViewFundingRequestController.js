define(["ViewConstants", "CommonUtilities", "SCFUtils"], function (ViewConstants, CommonUtilities, SCFUtils) {
  const fontIcons = {
    'chevronUp': 'P',
    'chevronDown': 'O',
    'checkboxSelected': '\uE926',
    'checkboxUnselected': '\uE924'
  }, skins = {
    'checkboxSelected': 'sknLbl003e75InfinityIcons20px',
    'checkboxUnselected': 'sknLbl647277InfinityIcons20px',
    'pageEnabled': 'sknOLBFonts003e7512px',
    'pageDisabled': 'sknLblFontTypeIcona0a0a012px',
  }, images = {
    'sortAsc': ViewConstants.IMAGES.SORT_PREV_IMAGE,
    'sortDesc': ViewConstants.IMAGES.SORT_NEXT_IMAGE,
    'noSort': ViewConstants.IMAGES.SORT_FINAL_IMAGE
  };
  let scope, presenter, contentScope, breakpoint, previousIndex, fundingRequestInfo, invoicesData, paymentHistoryData,
    documentDetails, bankUploadedDocs, counterPartyWiseLimitData, tabSelected = 1, docWidgetId, totalPages, currentPage, allChecked, listParams = {
      sortByParam: "",
      sortOrder: ""
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
      footerContentScope = this.view.formTemplate12.flxPageFooter;
      [
        contentScope.flxPageStart,
        contentScope.flxPagePrevious,
        contentScope.flxPageNext,
        contentScope.flxPageEnd,
        contentScope.flxBankDocDropdown,
        contentScope.flxUserDocDropdown
      ].map(widget => widget.cursorType = 'pointer');
      contentScope.btnTransactionDetails.toolTip = kony.i18n.getLocalizedString("i18n.billPay.TransactionDetails");
      contentScope.btnFacilityLimits.toolTip = kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.facilityAndLimits");
      contentScope.btnPaymentHistory.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentHistory");
      contentScope.btnDocuments.toolTip = kony.i18n.getLocalizedString("i18n.TradeFinance.Documents");
      //Handle onClicks Of tabs...
      contentScope.btnTransactionDetails.onClick = () => this.setListTab(1);
      contentScope.btnFacilityLimits.onClick = () => this.setListTab(2);
      contentScope.btnPaymentHistory.onClick = () => this.setListTab(3);
      contentScope.btnDocuments.onClick = () => this.setListTab(4);
      contentScope.btnExportInvoices.onClick = this.exportSelectedInvoices;
      //Handle Paginations Events...
      [contentScope.flxPageStart, contentScope.flxPaymentHisPageStart].map(widget => widget.onClick = this.applyPagination.bind(this, 'start'));
      [contentScope.flxPagePrevious, contentScope.flxPaymentHisPagePrevious].map(widget => widget.onClick = this.applyPagination.bind(this, 'previous'));
      [contentScope.flxPageNext, contentScope.flxPaymentHisPageNext].map(widget => widget.onClick = this.applyPagination.bind(this, 'next'));
      [contentScope.flxPageEnd, contentScope.flxPaymentHisPageEnd].map(widget => widget.onClick = this.applyPagination.bind(this, 'end'));
      //Handle Document Section...
      contentScope.flxBankDocDropdown.onClick = this.toggleDropdown.bind(this, contentScope.flxBankDocumentSection, contentScope.imgBankDocDropdown);
      contentScope.flxUserDocDropdown.onClick = this.toggleDropdown.bind(this, contentScope.flxUserDocumentSection, contentScope.imgUserDocDropdown);
      contentScope.flxUserRequestDocument.setVisibility(false);
      contentScope.flxUserSettlementInstructionDocument.setVisibility(false);
      contentScope.flxUserReceivablesDocument.setVisibility(false);
      contentScope.flxUserOtherDocument.setVisibility(false);
      contentScope.flxBankRequestDocument.setVisibility(false);
      //Initialize the chart...
      contentScope.flxCounterPartyWiseLimit.skin = 'sknFlxBgFFFFFFBorderE3E3E3Radius4Px';
      contentScope.flxCounterPartyWiseLimitHeader.skin = 'sknflxffffffBottomBorder';
      this.initialiseCharts();
      footerContentScope.btnBackToDashboard.onClick = () => scope.backToDashboard();
      contentScope.btnUserDocAddDocument.onClick = () => this.toggleAddDocumentScreen(true);
      contentScope.btnCancel.onClick = () => {
        contentScope.flxDetails.widgets().forEach(widget => contentScope.flxDetails.remove(widget));
        scope.toggleAddDocumentScreen(false);
      }
      contentScope.btnSubmit.onClick = () => {
        let popupContext = {
          heading: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.confirmSubmission"),
          message: "Document once added cannot be removed.\nAre you sure you want to submit the document?",
          noText: kony.i18n.getLocalizedString("i18n.konybb.common.cancel"),
          yesText: kony.i18n.getLocalizedString("i18n.common.confirm"),
          yesClick: () => scope.onDocumentSubmission()
        };
        scope.view.formTemplate12.setPopup(popupContext);
      }
      this.handleEnableDisableBtnWidget(contentScope.btnSubmit, false);
      this.handleEnableDisableBtnWidget(contentScope.btnExportInvoices, false);
      this.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.fundingRequest");
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
        fundingRequestInfo = viewModel.fundingRequestData;
        documentDetails = fundingRequestInfo.fundingDocuments;
        bankUploadedDocs = presenter.bankUploadedDocsList;
        paymentHistoryData = presenter.fundingPaymentHistory;
        counterPartyWiseLimitData = presenter.counterPartyWiseLimits;
        invoicesData = fundingRequestInfo.invoiceReferences ?
          viewModel.fundingRequestData.invoiceReferences.map(obj => ({
            ...obj,
            isChecked: false
          })) : [];
        fundingRequestInfo.status === presenter.fundingStatus.Cancelled ? contentScope.btnUserDocAddDocument.setVisibility(false) : contentScope.btnUserDocAddDocument.setVisibility(true);
        this.toggleAddDocumentScreen(false);
        this.setListTab(1);
      }
      if (viewModel.uploadDocument) {
        contentScope[docWidgetId].addDocument(viewModel.uploadDocument.LCDocuments[0].documentReference);
        if (!contentScope.btnSubmit.enable) this.handleEnableDisableBtnWidget(contentScope.btnSubmit, true);
      }
      if (viewModel.deleteDocument) {
        contentScope[docWidgetId].removeDocument();
        let uploadedDocCount = contentScope.flxDetails.widgets().reduce((count, widget) => (count = count + widget.getData().length), 0);
        if (uploadedDocCount === 0) {
          this.handleEnableDisableBtnWidget(contentScope.btnSubmit, false);
          contentScope.flxBtnActions.forceLayout();
        }
      }
      if (viewModel.saveFundingRequest) {
        documentDetails = presenter.fundingRequest.data.fundingDocuments;
        this.toggleAddDocumentScreen(false);
        this.setDocumentDetails();
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'dbpErrMsg': viewModel.serverError
        });
      }
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
      if (tabSelected === 1) {
        this.setInvoicesData();
      } else if (tabSelected === 3) {
        this.setPaymentHistoryData();
      }
    },

    /**
     * Sets the pagination container.
     */
    setPagination: function () {
      if (tabSelected == 1) {
        contentScope.lblPageText.text = `${currentPage} - ${totalPages} ${kony.i18n.getLocalizedString('i18n.konybb.Common.Pages')}`;
        contentScope.lblPageStartIcon.skin = currentPage === 1 ? skins.pageDisabled : skins.pageEnabled;
        contentScope.lblPagePreviousIcon.skin = currentPage > 1 ? skins.pageEnabled : skins.pageDisabled;
        contentScope.lblPageNextIcon.skin = currentPage < totalPages ? skins.pageEnabled : skins.pageDisabled;
        contentScope.lblPageEndIcon.skin = currentPage === totalPages ? skins.pageDisabled : skins.pageEnabled;
      } else if (tabSelected == 3) {
        contentScope.lblPaymentHisPageText.text = `${currentPage} - ${totalPages} ${kony.i18n.getLocalizedString('i18n.konybb.Common.Pages')}`;
        contentScope.lblPaymentHisPageStart.skin = currentPage === 1 ? skins.pageDisabled : skins.pageEnabled;
        contentScope.lblPaymentHisPagePrevious.skin = currentPage > 1 ? skins.pageEnabled : skins.pageDisabled;
        contentScope.lblPaymentHisPageNext.skin = currentPage < totalPages ? skins.pageEnabled : skins.pageDisabled;
        contentScope.lblPaymentHisPageEnd.skin = currentPage === totalPages ? skins.pageDisabled : skins.pageEnabled;
      }
    },

    /**
     * Method to Handle the tab...
     */
    setListTab: function (tabIdx) {
      tabSelected = tabIdx;
      [
        contentScope.btnTransactionDetails,
        contentScope.btnFacilityLimits,
        contentScope.btnPaymentHistory,
        contentScope.btnDocuments
      ].map((widget, index) => ((index === tabSelected - 1) ? widget.skin = 'ICSknBtnAccountSummarySelected2' : widget.skin = 'ICSknBtnAccountSummaryUnselected2'));
      [
        contentScope.flxTransactionDetailsContainer,
        contentScope.flxFacilityLimitContainer,
        contentScope.flxPaymentHistory,
        contentScope.flxDocuments
      ].map((widget, index) => ((index === tabSelected - 1) ? widget.setVisibility(true) : widget.setVisibility(false)));
      if (tabSelected == 1) {
        this.setFRDetails();
        if (invoicesData.length === 0) {
          contentScope.flxInvoicesList.setVisibility(false);
          contentScope.flxPagination.setVisibility(false);
          contentScope.flxNoInvoice.setVisibility(true);
          return;
        }
        contentScope.flxInvoicesList.setVisibility(true);
        contentScope.flxPagination.setVisibility(true);
        contentScope.flxNoInvoice.setVisibility(false);
        totalPages = Math.ceil(invoicesData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        allChecked = false;
        listParams = {
          sortByParam: 'supplierName',
          sortOrder: 'ASC'
        };
        this.setPagination();
        this.sortRecords();
      } else if (tabSelected == 2) {
        this.setFacilityInfo();
        this.setCounterPartywiseLimitData();
      } else if (tabSelected == 3) {
        if (paymentHistoryData.length === 0) {
          contentScope.flxPaymentHistoryList.setVisibility(false);
          contentScope.flxPaymentListPagination.setVisibility(false);
          contentScope.flxNoPaymentHistory.setVisibility(true);
          return;
        }
        contentScope.flxPaymentHistoryList.setVisibility(true);
        contentScope.flxPaymentListPagination.setVisibility(true);
        contentScope.flxNoPaymentHistory.setVisibility(false);
        totalPages = Math.ceil(paymentHistoryData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        listParams = {
          sortByParam: 'paymentDate',
          sortOrder: 'ASC'
        };
        this.setPagination();
        this.sortRecords();
      } else if (tabSelected == 4) {
        this.setBankDocumentDetails();
        this.setDocumentDetails();
      }
    },

    /**
     * Method to Populate the additonal Info Section.
     */
    setFRDetails: function () {
      let facilityName = "";
      const totalInvoiceAmount = String(fundingRequestInfo.invoiceReferences.reduce((total, item) => (total = total + item.invoiceAmount), 0));
      contentScope.segFRDetails.widgetDataMap = {
        'flxValue': 'flxValue',
        'lblKey': 'lblKey',
        'lblValue': 'lblValue'
      };
      (presenter.anchorProgramsList || []).forEach(program => {
        (program.facilities || []).forEach(f => {
          if (fundingRequestInfo.facilityId === f.account) {
            facilityName = f.shortTitle;
          }
        });
      });
      contentScope.segFRDetails.setData([{
        lblKey: kony.i18n.getLocalizedString("kony.mb.common.refNumberColon"),
        lblValue: fundingRequestInfo.fundingRequestId || 'NA'
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.programmeNameWithColon"),
        lblValue: fundingRequestInfo.programName || 'NA'
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.CardManagement.productName"),
        lblValue: fundingRequestInfo.productName || 'NA'
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.facilityIDWithColon"),
        lblValue: fundingRequestInfo.facilityId || 'NA'
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.payments.faciltyNameWithColon"),
        lblValue: facilityName,
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.totalInvoiceAmountWithColon"),
        lblValue: `${presenter.configurationManager.getCurrency(fundingRequestInfo.currency)}${presenter.formatUtilManager.formatAmount(totalInvoiceAmount)}`,
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.totalAdvanceAmountWithColon"),
        lblValue: `${presenter.configurationManager.getCurrency(fundingRequestInfo.currency)}${presenter.formatUtilManager.formatAmount("900000.00")}`,
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.totalNetValueWithColon"),
        lblValue: `${presenter.configurationManager.getCurrency(fundingRequestInfo.currency)}${presenter.formatUtilManager.formatAmount("832000.00")}`,
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.pricingWithColon"),
        lblValue: '2.50' + '%'
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.feeWithColon"),
        lblValue: '5' + '%'
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.discountMethodWithColon"),
        lblValue: 'Simple Discount',
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.bankReferenceNumberWithColon"),
        lblValue: "FR1265787" || 'NA',
      },]);
      contentScope.flxFRDetails.forceLayout();
    },

    /**
     * Method to Populate the Facility Info Section.
     */
    setFacilityInfo: function () {
      contentScope.segFacilityDetails.widgetDataMap = {
        'flxValue': 'flxValue',
        'flxKey': 'flxKey',
        'lblKey': 'lblKey',
        'lblValue': 'lblValue',
        'flxDetails': 'flxDetails'
      };
      let segRowData = [{
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.facilityID"),
        lblValue: fundingRequestInfo.facilityId || 'NA'
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.facilityAvailableLimit"),
        lblValue: `${presenter.configurationManager.getCurrency(fundingRequestInfo.currency)}${presenter.formatUtilManager.formatAmount(fundingRequestInfo.facilityAvailableLimit)}`,
      }, {
        lblKey: kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.facilityUtilisedLimit"),
        lblValue: `${presenter.configurationManager.getCurrency(fundingRequestInfo.currency)}${presenter.formatUtilManager.formatAmount(fundingRequestInfo.facilityUtilisedLimit)}`,
      }, {
        lblKey: '',
        lblValue: ''
      }, {
        lblKey: '',
        lblValue: ''
      }, {
        lblKey: '',
        lblValue: ''
      }];
      segRowData = segRowData.map(obj => ({
        ...obj,
        flxKey: {
          centerY: '50%'
        },
        lblValue: {
          'text': obj.lblValue,
          'top': '10dp',
          'contentAlignment': constants.CONTENT_ALIGN_MIDDLE_RIGHT
        },
        flxDetails: {
          'skin': 'sknflxffffffBottomBorder'
        }
      }));
      contentScope.segFacilityDetails.setData(segRowData);
      contentScope.flxFacilityDetails.forceLayout();
    },

    /**
     * Method to Sort the Invoice Data.
     */
    sortRecords: function (context) {
      if (context) {
        const widgetSrc = context.widgets()[1].src;
        listParams['sortOrder'] = (widgetSrc === images.noSort) ? 'ASC' : (widgetSrc === images.sortAsc) ? 'DESC' : 'ASC';
      }
      if (tabSelected === 1) {
        invoicesData = SCFUtils.sortRecords(invoicesData, listParams);
        this.setInvoicesData();
      } else if (tabSelected === 3) {
        paymentHistoryData = SCFUtils.sortRecords(paymentHistoryData, listParams);
        this.setPaymentHistoryData();
      }
    },

    /**
     * Method to Populate the segment Data.
     */
    setInvoicesData: function () {
      const start = parseInt(currentPage - 1 + "0"),
        end = start + 10;
      const paginatedRecords = (invoicesData || []).slice(start, end);
      let segData = [],
        segRowData = [];
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
            'width': '20.5%',
          },
          'flxColumn2': {
            'width': '18%'
          },
          'flxColumn3': {
            'width': '17%',
          },
          'flxColumn4': {
            'isVisible': true,
            'layoutType': kony.flex.FREE_FORM,
            'width': '17%',
          },
          'flxColumn5': {
            'isVisible': true,
            'layoutType': kony.flex.FREE_FORM,
            'width': '14%',
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
            'skin': record.isChecked ? skins.checkboxSelected : skins.checkboxUnselected
          },
          'lblColumn1': record.supplierName || '',
          'lblColumn2': record.buyerName || '',
          'lblColumn3': record.invoiceReference || '',
          'lblColumn4': {
            'text': `${presenter.configurationManager.getCurrency(record.invoiceCurrency)}${presenter.formatUtilManager.formatAmount(record.invoiceAmount)}`,
            'left': '',
            'right': '20dp'
          },
          'lblColumn5': {
            'text': record.maturityDate || '',
            'left': '',
            'right': '0dp'
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
          'lblRow5Value': record.status || ''
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
          'width': '20.5%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'supplierName';
            scope.sortRecords(context)
          }
        },
        'flxColumn2': {
          'width': '18%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'buyerName';
            scope.sortRecords(context)
          }
        },
        'flxColumn3': {
          'width': '17%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'invoiceReference';
            scope.sortRecords(context)
          }
        },
        'flxColumn4': {
          'isVisible': true,
          'width': '17%',
          'layoutType': kony.flex.FREE_FORM,
          'onClick': function (context) {
            listParams['sortByParam'] = 'invoiceAmount';
            scope.sortRecords(context)
          }
        },
        'flxColumn5': {
          'isVisible': true,
          'width': '14%',
          'layoutType': kony.flex.FREE_FORM,
          'onClick': function (context) {
            listParams['sortByParam'] = 'maturityDate';
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
        'lblColumn1': kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.supplierName"),
        'lblColumn2': kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.buyerName"),
        'lblColumn3': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.InvoiceReference'),
        'lblColumn4': {
          'text': kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.invoiceAmount"),
          'left': '',
          'right': '40dp'
        },
        'lblColumn5': {
          'text': kony.i18n.getLocalizedString("i18n.accountDetail.maturityDate"),
          'left': '',
          'right': '20dp'
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
        },
        'imgColumn5': {
          'left': '',
          'right': '0dp',
          'src': scope.getSortImage('maturityDate')
        }
      }, segRowData]);
      contentScope.segInvoices.setData(segData);
      contentScope.flxInvoicesList.forceLayout();
    },

    /**
     * Method to Populate the segment Data for the Payment History
     */
    setPaymentHistoryData: function () {
      const start = parseInt(currentPage - 1 + "0"),
        end = start + 10;
      const paginatedRecords = (paymentHistoryData || []).slice(start, end);
      let segData = [],
        segRowData = [];
      previousIndex = undefined;
      for (const record of paginatedRecords) {
        segRowData.push({
          'flxDashboardListRow': {
            'skin': 'sknflxffffffnoborder'
          },
          "flxDetails": {
            "isVisible": false
          },
          "flxIdentifier": {
            'isVisible': false
          },
          "flxDropdown": {
            'isVisible': false
          },
          'flxColumn1': {
            'left': '1.5%',
            'width': '20%',
          },
          'flxColumn2': {
            'width': '20%'
          },
          'flxColumn3': {
            'width': '20%',
          },
          'flxColumn4': {
            'isVisible': true,
            'width': '20%',
          },
          'flxColumn5': {
            'isVisible': false,
          },
          'flxAction': {
            'isVisible': true,
            'width': '20%'
          },
          'flxCheckbox': {
            'isVisible': false,
          },
          'lblColumn1': record.transactionId || '',
          'lblColumn2': {
            'text': `${presenter.configurationManager.getCurrency(record.currencyId)}${presenter.formatUtilManager.formatAmount(record.amount)}`,
          },
          'lblColumn4': record.accountNumber || '',
          'lblColumn3': record.paymentDate || '',
          'btnAction': {
            'text': kony.i18n.getLocalizedString('i18n.common.Download'),
            'toolTip': kony.i18n.getLocalizedString('i18n.common.Download')
          }
        });
      }
      segData.push([{
        'flxCheckbox': {
          'isVisible': false,
        },
        'flxColumn1': {
          'width': '20%',
          'left': '1.5%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'transactionId';
            scope.sortRecords(context)
          }
        },
        'flxColumn2': {
          'width': '20%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'amount';
            scope.sortRecords(context)
          }
        },
        'flxColumn3': {
          'width': '20%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'paymentDate';
            scope.sortRecords(context)
          }
        },
        'flxColumn4': {
          'isVisible': true,
          'width': '20%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'accountNumber';
            scope.sortRecords(context)
          }
        },
        'flxColumn5': {
          'isVisible': false,
        },
        'flxAction': {
          'isVisible': true,
          'width': '18%'
        },
        'lblColumn1': kony.i18n.getLocalizedString("kony.i18n.common.transactionID"),
        'lblColumn2': kony.i18n.getLocalizedString("kony.mb.common.Amount"),
        'lblColumn3': kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentDate"),
        'lblColumn4': kony.i18n.getLocalizedString("i18n.common.accountNumber"),
        'lblAction': kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.swiftPayment"),
        'imgColumn1': {
          'src': scope.getSortImage('transactionID')
        },
        'imgColumn2': {
          'src': scope.getSortImage('amount')
        },
        'imgColumn3': {
          'src': scope.getSortImage('paymentDate')
        },
        'imgColumn4': {
          'src': scope.getSortImage('accountNumber')
        }
      }, segRowData]);
      contentScope.segPaymentHistory.setData(segData);
      contentScope.flxPaymentHistoryList.forceLayout();
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
        allChecked = !(segData[0][0]['lblCheckbox'].text === fontIcons.checkboxSelected);
        invoicesData.forEach(r => r['isChecked'] = allChecked);
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
        } else {
          segData[0][1][rowIndex]['lblCheckbox']['text'] = fontIcons.checkboxUnselected;
          segData[0][1][rowIndex]['lblCheckbox']['skin'] = skins.checkboxUnselected;
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
      if (this.getCheckedInvoices().length > 0)
        this.handleEnableDisableBtnWidget(contentScope.btnExportInvoices, true);
      else
        this.handleEnableDisableBtnWidget(contentScope.btnExportInvoices, false);
    },

    /**
     * Toggles the Document Section.
     */
    toggleDropdown: function (flxDropdownList, lblDropdownIcon) {
      if (flxDropdownList.isVisible) {
        flxDropdownList.setVisibility(false);
        lblDropdownIcon.text = fontIcons.chevronDown;
      } else {
        flxDropdownList.setVisibility(true);
        lblDropdownIcon.text = fontIcons.chevronUp;
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

    /**
     * Sets Data to The Document Section
     */
    setDocumentDetails: function () {
      let documents = Object.keys(documentDetails);
      documents = documents.filter(item => (item !== 'Others'));
      documents.push('Others');
      if (documents.length > 0) {
        documents.forEach(detail => {
          this.setdocs(documentDetails[detail], detail);
        });
      }
    },

    /**
     * Handles the Document Meta-Data
     */
    setdocs: function (docs, clonedId) {
      contentScope.flxListOfDocs.widgets().forEach(widget => {
        if (widget && widget.id.startsWith('doc')) {
          contentScope.flxListOfDocs.remove(widget);
        }
      });
      contentScope.flxUserDocumentSection.remove(contentScope[(contentScope.flxUserRequestDocument.clone(clonedId)).id])
      if (docs.length > 0) {
        contentScope.flxUserDocumentSection.add(contentScope.flxUserRequestDocument.clone(clonedId));
        contentScope[clonedId + "lblHeader1"].text = presenter.SCF_Document_category.find(item => item.key === clonedId).displayName;
        this.processDocumentDetails(docs, contentScope.flxUserRequestDocument.clone(clonedId).id, contentScope[clonedId + "lblDocName"], contentScope[clonedId + "imgDocType"], contentScope[clonedId + "flxListOfDocs"], contentScope[clonedId + "flxDocRD"]);
      }
    },

    /**
     * Handles the setting the bank uploaded Document Details section...
     */
    setBankDocumentDetails: function () {
      let docContainerId = 'bankUploadedDoc';
      if (bankUploadedDocs.length > 0) {
        contentScope.flxListOfBankDocs.widgets().forEach(widget => {
          if (widget && widget.id.startsWith('doc')) {
            contentScope.flxListOfBankDocs.remove(widget);
          }
        });
        contentScope.flxBankDocumentSection.remove(contentScope[(contentScope.flxBankRequestDocument.clone(docContainerId)).id])
        contentScope.flxBankDocumentSection.add(contentScope.flxBankRequestDocument.clone(docContainerId));
        this.processDocumentDetails(bankUploadedDocs, contentScope.flxBankRequestDocument.clone(docContainerId).id, contentScope[docContainerId + "lblBankDocName"], contentScope[docContainerId + "imgBankDocType"], contentScope[docContainerId + "flxListOfBankDocs"], contentScope[docContainerId + "flxBankDoc"], false);
      }
    },


    /**
     * Initialize the chart Data...
     *
     */
    initialiseCharts: function () {
      const limitChartOptions = {
        'title': '',
        'height': 330,
        'width': 600,
        'legend': 'none',
        'bar': {
          'groupWidth': "50%"
        },
        'bars': 'horizontal',
        'annotations': {
          'alwaysOutside': true,
          'textStyle': {
            'color': '#727272',
            'fontName': 'SourceSansPro-Regular',
            'fontSize': '13'
          },
          'datum': {
            'stem': {
              'color': 'transparent'
            }
          }
        },
        'hAxis': {
          'baselineColor': '#E3E3E3',
          'gridlines': {
            'color': "#E3E3E3"
          },
          'viewWindow': {
            'min': 0
          },
          'format': "short",
          'textStyle': {
            'color': '#727272',
            'fontName': 'SourceSansPro-Regular',
            'fontSize': '13'
          }
        },
        'vAxis': {
          'textStyle': {
            'color': '#424242',
            'fontName': 'SourceSansPro-Regular',
            'fontSize': '15'
          }
        },
        'chartArea': {
          'left': 180,
          'top': 25
        },
        'colors': ['#4176A4', '#CFDDE8'],
        'tooltip': {
          'textStyle': {
            'fontName': 'SourceSansPro-Regular'
          }
        }
      };
      let limitsChart = new kony.ui.CustomWidget({
        "id": "limitsChart",
        "isVisible": true,
        "width": "90%",
        "top": "20px",
        "height": "93%",
        "zIndex": 1
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "SCFBarChart",
        "chartData": [],
        "chartProperties": limitChartOptions,
        "chartId": 'limitsChart_div'
      });
      contentScope.flxDataCPL.add(limitsChart);
    },
    /**
     * setData to the CounterParty wise Chart.
     */
    setCounterPartywiseLimitData: function () {
      let chartData = [];
      chartData.push(['CounterPartyName', 'Utilised', { role: 'annotation' }, 'Available', { role: 'annotation' }]);
      // chartData.push(['CounterPartyName', 'Utilised', 'Available']);
      if (counterPartyWiseLimitData.length > 0) {
        counterPartyWiseLimitData.forEach(item => {
          chartData.push([item.counterpartyName, item.utilisedLimit, String(this.formatAnnotationLabel(item.utilisedLimit)), item.availableLimit, String(this.formatAnnotationLabel(item.availableLimit))]);
        });
        contentScope.flxDataCPL.limitsChart.chartData = chartData;
      }
    },
    /**
     * format Annotation Data...
     */
    formatAnnotationLabel: function (val) {
      if (Math.floor(val / 1000000) > 0) {
        return (val / 1000000).toFixed(2) + 'M';
      } else if (Math.floor(val / 1000) > 0) {
        return (val / 1000).toFixed(2) + 'K';
      } else {
        return val;
      }
    },

    populateDocumentWidgets: function () {
      contentScope.flxDetails.widgets().forEach(widget => contentScope.flxDetails.remove(widget));
      for (const category of presenter.SCF_Document_category) {
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

    backToDashboard: function () {
      presenter.loadScreenWithContext({
        'context': 'anchorDashboard'
      });
    },

    setDocumentContext: function () {
      const context = {
        'format': presenter.fundingRequest.config.documentFormat,
        'maxSize': presenter.fundingRequest.config.documentMaxSize
      };
      contentScope.lblInfo.text = `Following file types can be Uploaded - ${presenter.fundingRequest.config.documentFormat.map(e => `.${e}`).join(', ')} & Maximum file size ${presenter.fundingRequest.config.documentMaxSize}.`;
      const docWidgets = contentScope.flxDetails.widgets();
      docWidgets.forEach(w => w.setContext(context));
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

    toggleAddDocumentScreen: function (visibility) {
      contentScope.flxTabsContainer.setVisibility(!visibility);
      contentScope.flxDocuments.setVisibility(!visibility);
      footerContentScope.btnBackToDashboard.setVisibility(!visibility);
      contentScope.flxAddDocuments.setVisibility(visibility);
      contentScope.flxBtnActions.setVisibility(visibility);
      if (visibility) {
        this.view.formTemplate12.pageTitle = '';
        this.populateDocumentWidgets();
        this.setDocumentContext();
      } else {
        this.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.fundingRequest");
      }
    },

    onDocumentSubmission: function () {
      let docData = fundingRequestInfo.fundingDocuments;
      contentScope.flxDetails.widgets().forEach(widget => {
        docData[widget.id] = docData[widget.id].concat(widget.getData());
      })
      presenter.saveFundingRequest({ form: this.view.id, formData: fundingRequestInfo });
    },

    togglePopup: function (flow, message, widgetId) {
      let popupContext = {};
      switch (flow) {
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

    /**
         * getCheckedInvoices Returns the invoices that are selected using the check box.
         */
    getCheckedInvoices() {
      let checkedInvoices = invoicesData.filter((aRow) => { return aRow.isChecked === true; });
      return checkedInvoices;
    },

    /**
        * prepareAndGetCSVDataOfCheckedInvices Prepares the CSV data of invoices that are selected using checkbox.
        */
    prepareAndGetCSVDataOfCheckedInvices(checkedInvoices) {
      let csvData = "";
      let labelKeys = contentScope.segInvoices.data[0][1][0];
      csvData += labelKeys.lblRow2Key.replace(/:$/, '') + ","; //Supplier id
      csvData += contentScope.segInvoices.data[0][0].lblColumn1.replace(/:$/, '') + ","; //Supplier name
      csvData += labelKeys.lblRow1Key.replace(/:$/, '') + ","; //Buyer id
      csvData += contentScope.segInvoices.data[0][0].lblColumn2.replace(/:$/, '') + ","; //buyer name
      csvData += contentScope.segInvoices.data[0][0].lblColumn3.replace(/:$/, '') + ","; //Invoice reference
      csvData += contentScope.segInvoices.data[0][0].lblColumn4.text.replace(/:$/, '') + ","; //invoice amount 
      csvData += contentScope.segInvoices.data[0][0].lblColumn5.text.replace(/:$/, '') + ","; //maturity date
      csvData += labelKeys.lblRow3Key.replace(/:$/, '') + ","; //Creation Date
      csvData += labelKeys.lblRow5Key.replace(/:$/, ''); //status
      csvData += "\n";

      for (let ind = 0; ind < checkedInvoices.length; ind++) {
        csvData += checkedInvoices[ind].supplierId + ","; //"Supplier ID
        csvData += "\"" + checkedInvoices[ind].supplierName + "\"" + ","; //supplier name 
        csvData += checkedInvoices[ind].buyerId + ",";  //buyer id value
        csvData += "\"" + checkedInvoices[ind].buyerName + "\"" + ",";  //buyer name value
        csvData += checkedInvoices[ind].invoiceReference + ",";  //Invoice reference
        csvData += "\"" + `${presenter.configurationManager.getCurrency(checkedInvoices[ind].invoiceCurrency)}${presenter.formatUtilManager.formatAmount(checkedInvoices[ind].invoiceAmount)}` + "\"" + ",";  //Invoice amount       
        csvData += checkedInvoices[ind].maturityDate + ","; //Maturity date
        csvData += checkedInvoices[ind].issueDate + ","; //creation date
        csvData += "\"" + checkedInvoices[ind].status + "\"" + ","; //status
        if (ind < checkedInvoices.length - 1) {
          csvData += "\n";
        }
      }
      return csvData;
    },

    /**
    * exportSelectedInvoices Handles the export button click for the selected invoices to export into csv file.
    */
    exportSelectedInvoices: function () {
      let checkedInvoices = this.getCheckedInvoices();
      if (checkedInvoices.length > 0) {
        let csvData = this.prepareAndGetCSVDataOfCheckedInvices(checkedInvoices);
        presenter.generateCSVFile(csvData, "InvoiceExport.csv", scope.view.id);
      }

    },

    /**
     * Hanlde EnableDisable Btn
     */
    handleEnableDisableBtnWidget: function (widget, visibility) {
      widget.setEnabled(visibility);
      widget.skin = visibility ? "sknBtnNormalSSPFFFFFF15Px" : "ICSknbtnDisablede2e9f036px";
      widget.hoverSkin = widget.skin;
    },
    /**
     * Returns the sort image.
     * @param {string} sortBy - Specifies the sort by field name.
     * @returns {string} - Sort image name.
     */
    getSortImage: function (sortBy) {
      return listParams['sortByParam'] === sortBy ? (listParams['sortOrder'] === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
    }
  };
});