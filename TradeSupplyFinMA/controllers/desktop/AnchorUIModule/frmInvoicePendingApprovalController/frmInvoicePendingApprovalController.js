define(["ViewConstants", "SCFUtils"], function (ViewConstants, SCFUtils) {
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
  let scope, presenter, contentScope, breakpoint, previousIndex, pendingInvoicesInfo,
    totalPages, currentPage, allChecked, anchorPresenter, searchCriteria, tagsData, isSearchApplied, listData, currentDate,
    listParams = {
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
      currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      presenter = applicationManager.getModulesPresentationController({
        appName: 'TradeSupplyFinMA',
        moduleName: 'InvoicesUIModule'
      });
      anchorPresenter = applicationManager.getModulesPresentationController({
        appName: 'TradeSupplyFinMA',
        moduleName: 'AnchorUIModule'
      });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      contentPopupScope = this.view.formTemplate12.flxContentPopup;
      contentScope.lblListInfo.text = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.showingRecentInvoices');
      [
        contentScope.flxPageStart,
        contentScope.flxPagePrevious,
        contentScope.flxPageNext,
        contentScope.flxPageEnd,
      ].map(widget => widget.cursorType = 'pointer');
      //Handle Pagination Events
      contentScope.flxPageStart.onClick = this.applyPagination.bind(this, 'start');
      contentScope.flxPagePrevious.onClick = this.applyPagination.bind(this, 'previous');
      contentScope.flxPageNext.onClick = this.applyPagination.bind(this, 'next');
      contentScope.flxPageEnd.onClick = this.applyPagination.bind(this, 'end');
      //Button OnClick binds..
      contentScope.btnApprove.onClick = () => this.togglePopup([...listData.filter(item => item.isChecked).map(item => item.invoiceReference)], 'Approve');
      contentScope.btnReject.onClick = () => this.togglePopup([...listData.filter(item => item.isChecked).map(item => item.invoiceReference)], 'Reject');

      contentPopupScope.flxIDClose.onClick = () => scope.toggleInvoiceDocumentsPopup(false, []);
      contentPopupScope.flxInvoiceDocuments.setVisibility(false);
      //Handling Visiblity based on Permission
      contentScope.btnApprove.setVisibility(presenter.configurationManager.checkUserPermission('Approve_Invoices_Anchor'));
      contentScope.btnReject.setVisibility(presenter.configurationManager.checkUserPermission('Reject_Invoices_Anchor'));

      contentScope.btnAdvancedSearch.onClick = () => scope.toggleAdvanceSearchPopup(true);
      contentPopupScope.flxASClose.onClick = () => scope.toggleAdvanceSearchPopup(false);
      contentPopupScope.btnSearch.onClick = this.applyAdvanceSearch;
      contentPopupScope.btnCancelSearch.onClick = () => scope.toggleAdvanceSearchPopup(false);
      contentScope.flxASRAction1.onClick = () => scope.toggleAdvanceSearchPopup(true);
      contentScope.flxASRAction2.onClick = () => {
        isSearchApplied = false;
        contentScope.flxListSearch.height = '50dp';
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        contentScope.flxListSearchContainer.setVisibility(true);
        contentScope.flxListSearchResults.setVisibility(false);
        presenter.getFilteredInvoices('frmInvoicePendingApproval', true);
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
      if (viewModel.pendingInvoices) {
        this.formatPendingInvoiceData(viewModel.pendingInvoices);
        this.setDropdownData();
      }
      if (viewModel.onInvoicesApprove) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          i18n: kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.successfullyApprovedBanner')
        });
        contentScope.flxActions.setVisibility(false);
        contentScope.flxSearchAction.setVisibility(true);
        this.formatPendingInvoiceData(viewModel.onInvoicesApprove);
      }
      if (viewModel.onInvoicesReject) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          i18n: kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.successfullyRejectedBanner')
        });
        contentScope.flxActions.setVisibility(false);
        contentScope.flxSearchAction.setVisibility(true);
        this.formatPendingInvoiceData(viewModel.onInvoicesReject);
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'dbpErrMsg': viewModel.serverError
        });
      }
    },

    /**
     *  Fromat Incoming PendingInvoiceRecords 
     */
    formatPendingInvoiceData: function (record) {
      pendingInvoicesInfo = record.map(item => ({
        ...item,
        'isChecked': false,
        'invoiceDocuments': item.invoiceDocuments ? JSON.parse(item.invoiceDocuments) : []
      }));
      listData = [...pendingInvoicesInfo];
      contentScope.lblListInfo.text = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.showingRecentInvoices');
      this.setPendingInvoicesData();
    },

    /**
     * validates the Incoming pendingInvoice Data...
     */
    setPendingInvoicesData: function () {
      if (!listData || listData.length === 0) {
        this.toggelPendingInvoiceVisiblity(false);
        return;
      }
      this.toggelPendingInvoiceVisiblity(true);
      totalPages = Math.ceil(listData.length / 10);
      currentPage = totalPages === 0 ? 0 : 1;
      allChecked = false;
      listParams = {
        sortByParam: 'invoiceReference',
        sortOrder: 'ASC'
      };
      this.setPagination();
      this.sortRecords();
    },

    /**
   * toggel Pending Invoices Segment visibility
   */
    toggelPendingInvoiceVisiblity: function (visibility) {
      [
        contentScope.flxPendingInvoicesList,
        contentScope.flxListSearch,
        contentScope.flxPagination,
      ].map(widget => widget.setVisibility(visibility));
      contentScope.flxNoInvoice.setVisibility(!visibility);
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
      this.setInvoicesSegData();
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
     * Method to Sort the Invoice Data.
     */
    sortRecords: function (context) {
      if (context) {
        const widgetSrc = context.widgets()[1].src;
        listParams['sortOrder'] = (widgetSrc === images.noSort) ? 'ASC' : (widgetSrc === images.sortAsc) ? 'DESC' : 'ASC';
      }
      listData = SCFUtils.sortRecords(listData, listParams);
      this.setInvoicesSegData();
    },

    /**
     * Method to Populate the segment Data.
    */
    setInvoicesSegData: function () {
      const start = parseInt(currentPage - 1 + "0"),
        end = start + 10;
      const paginatedRecords = (listData || []).slice(start, end);
      let segData = [],
        segRowData = [];
      previousIndex = undefined;
      for (const record of paginatedRecords) {
        let rowObj = this.formatInvoiceRowInfo(record, breakpoint);
        segRowData.push({
          ...rowObj,
          'flxCheckbox': {
            'isVisible': true,
            'onClick': function () {
              scope.toggleCheckbox(arguments[1].rowIndex);
            }
          },
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
          'width': breakpoint > 1024 ? '15%' : '25%',
          'left': '7.5%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'invoiceReference';
            scope.sortRecords(context)
          }
        },
        'flxColumn2': {
          'width': breakpoint > 1024 ? '15%' : '20%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'supplierId';
            scope.sortRecords(context)
          }
        },
        'flxColumn3': {
          'isVisible': breakpoint > 1024 ? true : false,
          'width': '13%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'buyerId';
            scope.sortRecords(context)
          }
        },
        'flxColumn4': {
          'isVisible': true,
          'width': breakpoint > 1024 ? '17%' : '20%',
          'layoutType': kony.flex.FREE_FORM,
          'onClick': function (context) {
            listParams['sortByParam'] = 'invoiceAmount';
            scope.sortRecords(context)
          }
        },
        'flxColumn5': {
          'isVisible': breakpoint > 1024 ? true : false,
          'width': '15%',
          'left': '2.5%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'createdDate';
            scope.sortRecords(context)
          }
        },
        'flxAction': {
          'isVisible': true,
          'width': breakpoint > 1024 ? '15%' : '18%',
          'left': breakpoint > 1024 ? '0dp' : '8%'
        },
        'lblCheckbox': {
          'text': allChecked ? fontIcons.checkboxSelected : fontIcons.checkboxUnselected,
          'skin': allChecked ? skins.checkboxSelected : skins.checkboxUnselected
        },
        'lblColumn1': kony.i18n.getLocalizedString("i18n.serviceRequests.ReferenceN"),
        'lblColumn2': kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.supplierID"),
        'lblColumn3': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.buyerID'),
        'lblColumn4': {
          'text': kony.i18n.getLocalizedString("i18n.konybb.Common.Amount"),
          'left': '',
          'right': '20dp'
        },
        'lblColumn5': kony.i18n.getLocalizedString("i18n.konybb.common.CreatedDate"),
        'lblAction': kony.i18n.getLocalizedString("i18n.transfers.lblAction"),
        'imgColumn1': {
          'src': scope.getSortImage('invoiceReference')
        },
        'imgColumn2': {
          'src': scope.getSortImage('supplierId')
        },
        'imgColumn3': {
          'src': scope.getSortImage('buyerId')
        },
        'imgColumn4': {
          'left': '',
          'right': '0dp',
          'src': scope.getSortImage('invoiceAmount')
        },
        'imgColumn5': {
          'src': scope.getSortImage('createdDate')
        }
      }, segRowData]);
      contentScope.segInvoices.setData(segData);
      contentScope.flxPendingInvoicesList.forceLayout();
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
     * Return Row Object Based on breakPoint...
     */
    formatInvoiceRowInfo: function (record, breakpointValue) {
      let formattedRowObj = {
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
        'lblColumn1': record.invoiceReference || '',
        'lblColumn2': record.supplierId || '',
        'lblColumn4': {
          'left': '',
          'right': '0dp',
          'text': `${presenter.configurationManager.getCurrency(record.invoiceCurrency) ? presenter.configurationManager.getCurrency(record.invoiceCurrency) : ''}${presenter.formatUtilManager.formatAmount(record.invoiceAmount)}`,
        },
        'btnAction': {
          'text': kony.i18n.getLocalizedString('i18n.konybb.common.Approve'),
          'onClick': () => this.togglePopup([record.invoiceReference], 'Approve'),
          'isVisible': presenter.configurationManager.checkUserPermission('Approve_Invoices_Anchor')
        },
        'lblCheckbox': {
          'text': record.isChecked ? fontIcons.checkboxSelected : fontIcons.checkboxUnselected,
          'skin': record.isChecked ? skins.checkboxSelected : skins.checkboxUnselected
        },
        'flxRow6': {
          'isVisible': true
        },
        'flxRowAction': {
          'isVisible': true
        },
        'lblRow6Key': {
          'width': breakpointValue > 1024 ? '17%' : '25%',
          'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.attachedDocumentsWithColon'),
        },
        'lblRow6Button1': {
          'isVisible': true,
          'text': `${record.invoiceDocuments.length} Attached`,
          'onClick': () => this.toggleInvoiceDocumentsPopup(true, record.invoiceDocuments)
        },
        'lblRow6Button2': {
          'isVisible': false
        },
        'lblRowAction': {
          'width': breakpointValue > 1024 ? '17%' : '25%',
          'text': kony.i18n.getLocalizedString('i18n.Accounts.ActionswithColon'),
        },
        'btnRowAction1': {
          'isVisible': true,
          'text': kony.i18n.getLocalizedString('kony.mb.ApprovalRequests.Reject'),
          'onClick': () => this.togglePopup([record.invoiceReference], 'Reject'),
          'isVisible': presenter.configurationManager.checkUserPermission('Reject_Invoices_Anchor')
        },
      };
      if (breakpointValue > 1024) {
        //Responsive webview...
        formattedRowObj = {
          ...formattedRowObj,
          'flxColumn1': {
            'width': '15%',
          },
          'flxColumn2': {
            'width': '15%'
          },
          'flxColumn3': {
            'isVisible': true,
            'width': '13%',
          },
          'flxColumn4': {
            'isVisible': true,
            'layoutType': kony.flex.FREE_FORM,
            'width': '17%',
          },
          'flxColumn5': {
            'isVisible': true,
            'width': '15%',
            'left': '2.5%'
          },
          'flxAction': {
            'isVisible': true,
            'width': '15%'
          },
          'lblColumn3': record.buyerId || '',
          'lblColumn5': record.createdDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.createdDate) : '-',
          'flxRow3': {
            'isVisible': false
          },
          'flxRow4': {
            'isVisible': false
          },
          'lblRow1Key': {
            'width': '17%',
            'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.issueDateWithColon'),
          },
          'lblRow1Value': record.issueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.issueDate) : '-',
          'lblRow2Key': {
            'width': '17%',
            'text': kony.i18n.getLocalizedString('i18n.Wealth.maturityDate'),
          },
          'lblRow2Value': record.maturityDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.maturityDate) : '-',
        }
      } else {
        //Tablet view...
        formattedRowObj = {
          ...formattedRowObj,
          'flxColumn1': {
            'width': '25%',
          },
          'flxColumn2': {
            'width': '20%'
          },
          'flxColumn3': {
            'isVisible': false,
          },
          'flxColumn4': {
            'isVisible': true,
            'layoutType': kony.flex.FREE_FORM,
            'width': '20%',
          },
          'flxColumn5': {
            'isVisible': false,
          },
          'flxAction': {
            'isVisible': true,
            'width': '18%',
            'left': '8%',
          },
          'flxRow3': {
            'isVisible': true
          },
          'flxRow4': {
            'isVisible': true
          },
          'lblRow1Key': {
            'width': '25%',
            'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.buyerID'),
          },
          'lblRow1Value': record.buyerId || '',
          'lblRow2Key': {
            'width': '25%',
            'text': kony.i18n.getLocalizedString('i18n.konybb.common.CreatedDate'),
          },
          'lblRow2Value': record.createdDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.createdDate) : '-',
          'lblRow3Key': {
            'width': '25%',
            'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.issueDateWithColon'),
          },
          'lblRow3Value': record.issueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.issueDate) : '-',
          'lblRow4Key': {
            'width': '25%',
            'text': kony.i18n.getLocalizedString('i18n.Wealth.maturityDate'),
          },
          'lblRow4Value': record.maturityDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.maturityDate) : '-',
        }
      }
      return formattedRowObj;
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
        listData.forEach(r => r['isChecked'] = allChecked);
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
        listData[(currentPage - 1) * 10 + rowIndex]['isChecked'] = isChecked;
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
      let checkedPendingInvoices = listData.filter(item => item.isChecked).length;
      if (checkedPendingInvoices > 0) {
        contentScope.lblListInfo.text = `Selected ${checkedPendingInvoices} Invoices`;
        contentScope.flxActions.setVisibility(true);
        contentScope.flxSearchAction.setVisibility(false);
      } else {
        contentScope.lblListInfo.text = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.showingRecentInvoices');
        contentScope.flxActions.setVisibility(false);
        contentScope.flxSearchAction.setVisibility(true);
      }
    },

    /**
     * Toggles Popup on Approve or Reject.
     */
    togglePopup: function (records, flow) {
      let flowMsg = flow === 'Approve' ? kony.i18n.getLocalizedString('i18n.konybb.common.Approve') : kony.i18n.getLocalizedString('kony.mb.ApprovalRequests.Reject');
      let popupContext = {
        heading: flowMsg,
        message: kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.approveRejectconfirmationPopupMessage').replace(/XXXX/i, flowMsg),
        noText: kony.i18n.getLocalizedString("i18n.common.no"),
        yesText: kony.i18n.getLocalizedString("i18n.common.yes"),
        yesClick: () => presenter.updatePendingInvoicesStatus(records, flow, 'frmInvoicePendingApproval')
      };
      scope.view.formTemplate12.setPopup(popupContext);
    },

    /**
     * Handles the setting the bank uploaded Document Details section...
     */
    setInvoiceDocumentDetails: function (invoiceDocs) {
      let docContainerId = 'invoiceUploadedDoc';
      if (invoiceDocs.length > 0) {
        contentPopupScope.flxListOfDocs.widgets().forEach(widget => {
          if (widget && widget.id.startsWith('doc')) {
            contentPopupScope.flxListOfDocs.remove(widget);
          }
        });
        contentPopupScope.flxInvoiceDocumentSection.remove(contentPopupScope[(contentPopupScope.flxInvoiceDocuments.clone(docContainerId)).id])
        contentPopupScope.flxInvoiceDocumentSection.add(contentPopupScope.flxInvoiceDocuments.clone(docContainerId));
        this.processDocumentDetails(invoiceDocs, contentPopupScope.flxInvoiceDocuments.clone(docContainerId).id, contentPopupScope[docContainerId + "lblInvoiceDocName"], contentPopupScope[docContainerId + "imgInvoiceDocType"], contentPopupScope[docContainerId + "flxListOfDocs"], contentPopupScope[docContainerId + "flxInvoiceDoc"]);
      }
    },

    /**
     * Process the Document Details
     */
    processDocumentDetails: function (documents, content, label, image, list, replica, isDownloadAllowed = true) {
      contentPopupScope[content].setVisibility(false);
      list.widgets().forEach(widget => {
        if (widget && widget.id.startsWith('doc')) {
          list.remove(widget);
        }
      });
      if (documents.length > 0) {
        contentPopupScope[content].setVisibility(true);
        label.text = documents[0].documentName;
        image.src = SCFUtils.getDocumentImages(documents[0].documentName.split('.').pop());
        replica.onClick = () => presenter.downloadDocument(documents[0].documentReference, kony.application.getCurrentForm().id);
        replica.cursorType = 'pointer';
        documents.slice(1).forEach((document, i) => {
          list.remove(contentPopupScope[replica.clone("doc" + i).id])
          list.add(replica.clone("doc" + i));
          contentPopupScope["doc" + i + replica.id].onClick = () => presenter.downloadDocument(document.documentReference, kony.application.getCurrentForm().id)
          contentPopupScope[["doc" + i + replica.id]].cursorType = 'pointer';
          contentPopupScope["doc" + i + label.id].text = document.documentName;
          contentPopupScope["doc" + i + image.id].src = SCFUtils.getDocumentImages(document.documentName.split('.').pop());
        });
      }
    },

    /**
    * Toggles the advance search popup.
    * @param {boolean} visibility - Specfies whether to show/hide advance search popup.
    * @returns {void} - Returns nothing if visibility is false.
    */
    toggleInvoiceDocumentsPopup: function (visibility, invoiceDocs) {
      if (visibility && invoiceDocs.length > 0) {
        contentPopupScope.setVisibility(visibility);
        contentPopupScope.flxInvoiceDocumentsPopup.setVisibility(visibility);
        contentPopupScope.flxDownloadAll.onClick = () => presenter.downloadMultipleDocuments(invoiceDocs, kony.application.getCurrentForm().id);
        contentPopupScope.btnDownloadAll.onClick = () => presenter.downloadMultipleDocuments(invoiceDocs, kony.application.getCurrentForm().id);
        if (!visibility) {
          return;
        }
        this.setInvoiceDocumentDetails(invoiceDocs);
      } else {
        contentPopupScope.setVisibility(visibility);
        contentPopupScope.flxInvoiceDocumentsPopup.setVisibility(visibility);
        contentPopupScope.flxDownloadAll.onClick = null;
        contentPopupScope.btnDownloadAll.onClick = null;
      }
    },

    /**
     * Sets the dropdown data.
     */
    setDropdownData: function () {
      const dropdownData = listData.reduce((acc, obj) => {
        acc['supplier'] = acc['supplier'] || {};
        acc['buyer'] = acc['buyer'] || {};
        obj.supplierId && (acc['supplier'][obj.supplierId] = obj.supplierId);
        obj.buyerId && (acc['buyer'][obj.buyerId] = obj.buyerId);
        return acc;
      }, {
        'anchor': {
          'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
        }
      });
      contentPopupScope.dropdownSupplierId.setContext(dropdownData.supplier);
      contentPopupScope.dropdownBuyerId.setContext(dropdownData.buyer);
      [
        contentPopupScope.dropdownCreationDate,
        contentPopupScope.dropdownIssueDate,
        contentPopupScope.dropdownMaturityDate,
      ].map(widget => widget.setContext(anchorPresenter.anchorDashboardConfig.listTimePeriodFilters));
    },

    /**
     * Toggles the advance search popup.
     * @param {boolean} visibility - Specfies whether to show/hide advance search popup.
     * @returns {void} - Returns nothing if visibility is false.
     */
    toggleAdvanceSearchPopup: function (visibility) {
      contentPopupScope.setVisibility(visibility);
      contentPopupScope.flxAdvanceSearchPopup.setVisibility(visibility);
      if (!visibility || isSearchApplied) {
        return;
      }
      contentPopupScope.flxAdvanceSearchPopup.setVisibility(true);
      contentPopupScope.tbxReferenceNumber.text = '';
      ['dropdownSupplierId', 'dropdownBuyerId', 'dropdownCreationDate', 'dropdownIssueDate', 'dropdownMaturityDate'].forEach(widget => {
        contentPopupScope[widget].removeSelection();
        contentPopupScope[widget].setDefaultText();
        contentPopupScope[widget].closeDropdown();
      });
      ['calCreationToDate', 'calCreationFromDate', 'calIssueToDate', 'calIssueFromDate', 'calMaturityToDate', 'calMaturityFromDate'].forEach(widget => {
        contentPopupScope[widget].clear();
      });
    },

    /**
     * Applies the advance search.
     * @returns {void} - Return nothing if search fields are empty/invalid.
     */
    applyAdvanceSearch: function () {
      contentScope.flxListSearch.height = '170dp';
      contentScope.flxPendingInvoicesList.top = '13px';
      this.toggleAdvanceSearchPopup(false);
      searchCriteria = {
        'searchParam': {},
        'filterParam': {},
        'dateParam': {}
      };
      tagsData = {};
      const supplierId = contentPopupScope.dropdownSupplierId.getSelectedKey(),
        buyerId = contentPopupScope.dropdownBuyerId.getSelectedKey(),
        creationDate = contentPopupScope.dropdownCreationDate.getSelectedKey(),
        maturityDate = contentPopupScope.dropdownMaturityDate.getSelectedKey(),
        issueDate = contentPopupScope.dropdownIssueDate.getSelectedKey(),
        referenceNumber = contentPopupScope.tbxReferenceNumber.text;
      creationDateToRange = contentPopupScope.calCreationToDate.formattedDate,
        creationDateFromRange = contentPopupScope.calCreationFromDate.formattedDate,
        issueDateToRange = contentPopupScope.calIssueToDate.formattedDate,
        issueDateFromRange = contentPopupScope.calIssueFromDate.formattedDate,
        maturityDateToRange = contentPopupScope.calMaturityToDate.formattedDate,
        maturityDateFromRange = contentPopupScope.calMaturityFromDate.formattedDate;
      if (!supplierId && !buyerId && !creationDate && !maturityDate && !issueDate && !referenceNumber && !creationDateToRange && !creationDateFromRange && !issueDateToRange && !issueDateFromRange && !maturityDateToRange && !maturityDateFromRange) {
        return;
      }
      if (supplierId) {
        (supplierId !== 'All') && (searchCriteria['filterParam']['supplierId'] = supplierId);
        tagsData['supplierId'] = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.supplierID')}: ${supplierId}`;
      }
      if (buyerId) {
        (buyerId !== 'All') && (searchCriteria['filterParam']['buyerId'] = buyerId);
        tagsData['buyerId'] = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.buyerID')}: ${buyerId}`;
      }
      if (referenceNumber) {
        searchCriteria['searchParam']['invoiceReference'] = referenceNumber;
        tagsData['invoiceReference'] = `${kony.i18n.getLocalizedString('i18n.serviceRequests.ReferenceN')}: ${referenceNumber}`;
      }
      if (creationDateToRange && creationDateFromRange) {
        searchCriteria['dateParam']['createdDate'] = [creationDateToRange, creationDateFromRange];
        tagsData['createdDate'] = `${kony.i18n.getLocalizedString('i18n.serviceRequests.DateRange')} ${creationDateToRange} to ${creationDateFromRange}`;
      }
      if (issueDateToRange && issueDateFromRange) {
        searchCriteria['dateParam']['issueDate'] = [issueDateToRange, issueDateFromRange];
        tagsData['issueDate'] = `${kony.i18n.getLocalizedString('i18n.TradeFinance.issueDateWithColon')} ${issueDateToRange} to ${issueDateFromRange}`;
      }

      if (maturityDateToRange && maturityDateFromRange) {
        searchCriteria['dateParam']['maturityDate'] = [maturityDateToRange, maturityDateFromRange];
        tagsData['maturityDate'] = `${kony.i18n.getLocalizedString('i18n.Wealth.maturityDate')} ${maturityDateToRange} to ${maturityDateFromRange}`;
      }
      this.view.formTemplate12.showLoading();
      isSearchApplied = true;
      contentScope.flxListSearchContainer.setVisibility(false);
      contentScope.flxListSearchResults.setVisibility(true);
      setTimeout(function () {
        listData = SCFUtils.searchAndFilterRecords(pendingInvoicesInfo, searchCriteria);
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        scope.setPagination();
        scope.sortRecords();
        contentScope.brwSearchTags.evaluateJavaScript(`createTags(${JSON.stringify(tagsData)})`);
        scope.view.formTemplate12.hideLoading();
      }, 100);
    },

    /**
     * Removes the search tag.
     * @param {string} tagId - Specifies the tag id.
     */
    removeSearchTag: function (tagId) {
      delete tagsData[tagId];
      for (const key in searchCriteria) {
        if (tagId in searchCriteria[key]) {
          delete searchCriteria[key][tagId];
          break;
        }
      }
      switch (tagId) {
        case 'supplierId':
          contentPopupScope.dropdownSupplierId.removeSelection();
          contentPopupScope.dropdownSupplierId.setDefaultText();
          break;
        case 'buyerId':
          contentPopupScope.dropdownBuyerId.removeSelection();
          contentPopupScope.dropdownBuyerId.setDefaultText();
          break;
        case 'invoiceReference':
          contentPopupScope.tbxReferenceNumber.text = '';
          break;
        case 'createdDate':
          contentPopupScope.dropdownCreationDate.removeSelection();
          contentPopupScope.dropdownCreationDate.setDefaultText();
          contentPopupScope.calCreationToDate.clear();
          contentPopupScope.calCreationFromDate.clear();
          break;
        case 'issueDate':
          contentPopupScope.dropdownIssueDate.removeSelection();
          contentPopupScope.dropdownIssueDate.setDefaultText();
          contentPopupScope.calIssueToDate.clear();
          contentPopupScope.calIssueFromDate.clear();
          break;
        case 'maturityDate':
          contentPopupScope.dropdownMaturityDate.removeSelection();
          contentPopupScope.dropdownMaturityDate.setDefaultText();
          contentPopupScope.calMaturityToDate.clear();
          contentPopupScope.calMaturityFromDate.clear();
          break;
      }
      if (Object.keys(tagsData).length === 0) {
        isSearchApplied = false;
        contentScope.flxListSearchContainer.setVisibility(true);
        contentScope.flxListSearchResults.setVisibility(false);
        contentScope.flxListSearch.height = '70dp';
      }
      this.view.formTemplate12.showLoading();
      setTimeout(function () {
        listData = SCFUtils.searchAndFilterRecords(pendingInvoicesInfo, searchCriteria);
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        scope.setPagination();
        scope.sortRecords();
        scope.view.formTemplate12.hideLoading();
      }, 10);
    },

    /**
     * Sets the height of tags container.
     * @param {number} height - Specifies the height.
     */
    setTagsContainerHeight: function (height) {
      contentScope.flxASFields.height = `${height + 10}dp`;
      contentScope.flxListSearchResults.forceLayout();
    },

    /**
     * Handles the dropdown selection trigerred from component.
     * @param {string} widgetId - Specifies widget id.
     * @param {string} selectedKey - Specifies selected key.
     */
    handleDropdownSelection: function (widgetId, selectedKey) {
      if (!["dropdownSupplierId", "dropdownBuyerId"].includes(widgetId)) {
        this.setASCalendars(selectedKey, widgetId);
      }
    },

    /**
     * Sets the advance search calendars on basis of selected date range.
     * @param {string} selectedKey - Specifes the selected range.
     * @returns {void} - Returns nothing is selected range is custom.
     */
    setASCalendars: function (selectedKey, widgetId) {
      const cal1Widget = contentPopupScope.calCreationToDate,
        cal2Widget = contentPopupScope.calCreationFromDate,
        cal3Widget = contentPopupScope.calIssueToDate,
        cal4Widget = contentPopupScope.calIssueFromDate,
        cal5Widget = contentPopupScope.calMaturityToDate,
        cal6Widget = contentPopupScope.calMaturityFromDate;

      [range, unit] = selectedKey.split(',');
      if (range === 'CUSTOM') {
        cal1Widget.clear();
        cal2Widget.clear();
        cal1Widget.clear();
        cal2Widget.clear();
        cal1Widget.clear();
        cal2Widget.clear();

        [cal1Widget, cal2Widget, cal3Widget, cal4Widget, cal5Widget, cal6Widget].map(widget => widget.clear());
        return;
      }
      let cutOffDate = new Date();
      switch (unit) {
        case 'DAY':
          cutOffDate.setDate(currentDate.getDate() - parseInt(range, 10));
          break;
        case 'MONTH':
          cutOffDate.setMonth(currentDate.getMonth() - parseInt(range, 10));
          break;
        case 'YEAR':
          cutOffDate.setFullYear(currentDate.getFullYear() - parseInt(range, 10));
          break;
      }

      switch (widgetId) {
        case "dropdownCreationDate":
          updateDateComponents(cal1Widget, cal2Widget, cutOffDate);
          break;
        case "dropdownIssueDate":
          updateDateComponents(cal3Widget, cal4Widget, cutOffDate);
          break;
        case "dropdownMaturityDate":
          updateDateComponents(cal5Widget, cal6Widget, cutOffDate);
          break;
      }

      function updateDateComponents(widget1, widget2, date) {
        widget1.dateComponents = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
        widget2.dateComponents = [currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear()];
      }
    },
  };
});