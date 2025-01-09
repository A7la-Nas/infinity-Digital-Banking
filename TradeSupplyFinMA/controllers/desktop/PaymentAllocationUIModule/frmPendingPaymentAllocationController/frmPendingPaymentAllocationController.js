define(["SCFUtils", "ViewConstants", "CommonUtilities"], function (SCFUtils, ViewConstants, CommonUtilities) {
  const fontIcons = {
    'chevronUp': 'P',
    'chevronDown': 'O',
  },
    skins = {
      'pageEnabled': 'sknOLBFonts003e7512px',
      'pageDisabled': 'sknLblFontTypeIcona0a0a012px',
    },
    images = {
      'sortAsc': ViewConstants.IMAGES.SORT_PREV_IMAGE,
      'sortDesc': ViewConstants.IMAGES.SORT_NEXT_IMAGE,
      'noSort': ViewConstants.IMAGES.SORT_FINAL_IMAGE
    };
  let scope, presenter, contentScope, popupScope, breakpoint, previousIndex, paymentAllocationConfig,
    totalPages, currentPage, isSearchApplied, searchCriteria, tagsData, currDate,
    listData, listParams = {
      'sortByParam': "",
      'sortOrder': ""
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
      popupScope.flxAdvanceSearch.doLayout = CommonUtilities.centerPopupFlex;
      this.view.formTemplate12.hideBannerError();
      presenter.getPaymentAllocations(this.view.id);
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
      currDate = new Date();
      currDate.setHours(0, 0, 0, 0);
      presenter = applicationManager.getModulesPresentationController({ 'appName': 'TradeSupplyFinMA', 'moduleName': 'PaymentAllocationUIModule' });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      [
        contentScope.flxSRAction1,
        contentScope.flxSRAction2,
        contentScope.flxPageStart,
        contentScope.flxPagePrevious,
        contentScope.flxPageNext,
        contentScope.flxPageEnd,
        popupScope.flxASClose
      ].forEach(w => w.cursorType = 'pointer');
      contentScope.flxPageStart.onClick = this.applyPagination.bind(this, 'start');
      contentScope.flxPagePrevious.onClick = this.applyPagination.bind(this, 'previous');
      contentScope.flxPageNext.onClick = this.applyPagination.bind(this, 'next');
      contentScope.flxPageEnd.onClick = this.applyPagination.bind(this, 'end');
      contentScope.btnAdvancedSearch.onClick = () => scope.toggleAdvanceSearchPopup(true);
      popupScope.flxASClose.onClick = () => scope.toggleAdvanceSearchPopup(false);
      popupScope.btnASAction1.onClick = () => scope.toggleAdvanceSearchPopup(false);
      popupScope.btnASAction2.onClick = this.applyAdvanceSearch;
      contentScope.flxSRAction1.onClick = () => scope.toggleAdvanceSearchPopup(true);
      contentScope.flxSRAction2.onClick = this.setUI;
      popupScope.cal1ASF5.onSelection = this.enableStartDate;
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
      if (viewModel.paymentAllocations) {
        pendingAllocationData = SCFUtils.searchAndFilterRecords(viewModel.paymentAllocations, {
          'filterParam': {
            'status': presenter.allocater === 'anchor' ? 'Pending' : 'Requested'
          }
        });
        this.setDropdownData();
        this.setUI();
      }
      if (viewModel.requestDocumentation) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({ 'i18n': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.requestDocumentationSuccessMessage') });
        presenter.getPaymentAllocations(this.view.id);
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({ 'dbpErrMsg': viewModel.serverError });
      }
    },
    /**
     * Sets the dropdown data.
     */
    setDropdownData: function () {
      const dropdownData = pendingAllocationData.reduce((acc, obj) => {
        obj.senderName && (acc['sender'][obj.senderName] = `${obj.senderName} - ${obj.senderId}`);
        obj.beneficiaryName && (acc['beneficiary'][obj.beneficiaryName] = `${obj.beneficiaryName} - ${obj.beneficiaryId}`);
        return acc;
      }, {
        'sender': {
          'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
        },
        'beneficiary': {
          'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
        }
      });
      popupScope.DropdownASF2.setContext(dropdownData.sender);
      popupScope.DropdownASF3.setContext(dropdownData.beneficiary);
      popupScope.DropdownASF4.setContext(paymentAllocationConfig.timePeriodFilters);
    },
    /**
     * Sets the UI.
     */
    setUI: function () {
      if (pendingAllocationData.length === 0) {
        contentScope.flxList.setVisibility(false);
        contentScope.flxNoRecords.setVisibility(true);
        return;
      }
      contentScope.flxList.setVisibility(true);
      contentScope.flxNoRecords.setVisibility(false);
      listParams['sortByParam'] = 'transactionId';
      listParams['sortOrder'] = 'DESC';
      isSearchApplied = false;
      listData = pendingAllocationData;
      totalPages = Math.ceil(listData.length / 10);
      currentPage = totalPages === 0 ? 0 : 1;
      contentScope.flxSearchContainer.setVisibility(true);
      contentScope.flxSearchResults.setVisibility(false);
      scope.setPagination();
      scope.sortRecords();
    },
    /**
     * Sets the list data.
     */
    setListData: function () {
      const start = parseInt(currentPage - 1 + "0"),
        end = start + 10;
      paginatedRecords = (listData || []).slice(start, end),
        coreCustomerID = presenter.userPreferencesManager.getBackendIdentifier(),
        requestPermission = presenter.configurationManager.checkUserPermission('Payment_Allocation_Anchor_Request_Documentation'),
        submitPermission = presenter.configurationManager.checkUserPermission(presenter.allocater === 'anchor' ? 'Payment_Allocation_Anchor_Submit_Documentation' : 'Payment_Allocation_Counterparty_Submit_Documentation');
      let segData = [],
        segRowData = [];
      previousIndex = undefined;
      if (breakpoint > 1024) {
        for (const record of paginatedRecords) {
          let segObj = {
            'lblDropdown': fontIcons.chevronDown,
            'flxDashboardListRow': {
              'skin': 'sknflxffffffnoborder'
            },
            "flxDetails": {
              'isVisible': false
            },
            "flxIdentifier": {
              "skin": "slFbox"
            },
            "flxDropdown": {
              'width': '5%',
              "onClick": this.handleSegmentRowView
            },
            'flxColumn1': {
              'isVisible': true,
              'width': '16%'
            },
            'flxColumn2': {
              'isVisible': true,
              'width': '18%'
            },
            'flxColumn3': {
              'isVisible': true,
              'width': '16%',
            },
            'flxColumn4': {
              'isVisible': true,
              'width': '13%',
              'reverseLayoutDirection': true
            },
            'flxColumn5': {
              'isVisible': presenter.allocater === 'anchor',
              'left': '3%',
              'width': '12%'
            },
            'flxColumn6': {
              'isVisible': presenter.allocater === 'counterparty',
              'left': '3%',
              'width': '12%'
            },
            'flxAction': {
              'isVisible': submitPermission,
              'width': '17%'
            },
            'flxRow1': {
              'isVisible': true,
              'left': '5%',
              'width': '95%'
            },
            'flxRow2': {
              'isVisible': presenter.allocater === 'counterparty',
              'left': '5%',
              'width': '95%'
            },
            'flxRow3': {
              'isVisible': false,
              'left': '5%',
              'width': '95%'
            },
            'flxRowAction': {
              'isVisible': presenter.allocater === 'anchor' && record.beneficiaryId === coreCustomerID && requestPermission,
              'left': '5%',
              'width': '95%'
            },
            'lblColumn1': record.transactionId || '-',
            'lblColumn2': record.senderName || '-',
            'lblColumn3': record.beneficiaryName || '-',
            'lblColumn4': (record.currency && record.originalAmount) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.originalAmount)}` : '-',
            'lblColumn5': record.valueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.valueDate) : '-',
            'lblColumn6': record.status || '-',
            'btnAction': {
              'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.submitDocumentation'),
              'toolTip': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.submitDocumentation'),
              'onClick': function () {
                presenter.loadScreenWithContext({
                  'context': 'allocationDocuments',
                  'data': record
                });
              }
            },
            'lblRow1Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.receiptAmountWthColon'),
            'lblRow1Value': (record.currency && record.receiptAmount) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.receiptAmount)}` : '-',
            'lblRow2Key': kony.i18n.getLocalizedString('i18n.wealth.valueDatemb'),
            'lblRow2Value': record.valueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.valueDate) : '-',
            'lblRowAction': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.ActionWithColon'),
            'btnRowAction1': {
              'isVisible': true,
              'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.requestDocumentation'),
              'toolTip': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.requestDocumentation'),
              'onClick': function () {
                scope.togglePopup({
                  'context': 'requestDocumentation',
                  'data': record
                });
              }
            }
          };
          segRowData.push(segObj);
        }
        segData.push([{
          'flxColumn1': {
            'isVisible': true,
            'left': '5%',
            'width': '16%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'transactionId';
              scope.sortRecords(context);
            }
          },
          'flxColumn2': {
            'isVisible': true,
            'width': '18%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'senderName';
              scope.sortRecords(context);
            }
          },
          'flxColumn3': {
            'isVisible': true,
            'width': '16%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'beneficiaryName';
              scope.sortRecords(context);
            }
          },
          'flxColumn4': {
            'isVisible': true,
            'width': '13%',
            'layoutType': kony.flex.FREE_FORM,
            'onClick': function (context) {
              listParams['sortByParam'] = 'originalAmount';
              scope.sortRecords(context);
            }
          },
          'flxColumn5': {
            'isVisible': presenter.allocater === 'anchor',
            'left': '3%',
            'width': '12%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'valueDate';
              scope.sortRecords(context);
            }
          },
          'flxColumn6': {
            'isVisible': presenter.allocater === 'counterparty',
            'left': '3%',
            'width': '12%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'status';
              scope.sortRecords(context);
            }
          },
          'flxAction': {
            'isVisible': submitPermission,
            'width': '17%'
          },
          'lblColumn1': kony.i18n.getLocalizedString('kony.i18n.common.transactionID'),
          'lblColumn2': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.senderName'),
          'lblColumn3': kony.i18n.getLocalizedString('i18n.ImportLC.BeneficiaryName'),
          'lblColumn4': {
            'text': kony.i18n.getLocalizedString('kony.mb.accdetails.originalAmount'),
            'left': '',
            'right': '20dp'
          },
          'lblColumn5': kony.i18n.getLocalizedString('i18n.wealth.valueDate'),
          'lblColumn6': kony.i18n.getLocalizedString('i18n.common.status'),
          'lblAction': kony.i18n.getLocalizedString('i18n.TradeFinance.Action'),
          'imgColumn1': {
            'src': scope.getSortImage('transactionId')
          },
          'imgColumn2': {
            'src': scope.getSortImage('senderName')
          },
          'imgColumn3': {
            'src': scope.getSortImage('beneficiaryName')
          },
          'imgColumn4': {
            'left': '',
            'right': '0dp',
            'src': scope.getSortImage('originalAmount')
          },
          'imgColumn5': {
            'src': scope.getSortImage('valueDate')
          },
          'imgColumn6': {
            'src': scope.getSortImage('status')
          }
        }, segRowData]);
      } else {
        for (const record of paginatedRecords) {
          let segObj = {
            'lblDropdown': fontIcons.chevronDown,
            'flxDashboardListRow': {
              'skin': 'sknflxffffffnoborder'
            },
            "flxDetails": {
              'isVisible': false
            },
            "flxIdentifier": {
              "skin": "slFbox"
            },
            "flxDropdown": {
              'width': '8%',
              "onClick": this.handleSegmentRowView
            },
            'flxColumn1': {
              'isVisible': true,
              'width': '20%'
            },
            'flxColumn2': {
              'isVisible': true,
              'width': '25%',
              'reverseLayoutDirection': true
            },
            'flxColumn3': {
              'isVisible': presenter.allocater === 'anchor',
              'left': '5%',
              'width': '18%',
            },
            'flxColumn4': {
              'isVisible': presenter.allocater === 'counterparty',
              'left': '5%',
              'width': '18%'
            },
            'flxAction': {
              'isVisible': true,
              'width': '24%'
            },
            'flxRow1': {
              'isVisible': true
            },
            'flxRow2': {
              'isVisible': true
            },
            'flxRow3': {
              'isVisible': true
            },
            'flxRow4': {
              'isVisible': presenter.allocater === 'counterparty',
            },
            'flxRowAction': {
              'isVisible': presenter.allocater === 'anchor' && record.beneficiaryId === coreCustomerID && requestPermission
            },
            'lblColumn1': record.transactionId || '-',
            'lblColumn2': {
              'text': (record.currency && record.originalAmount) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.originalAmount)}` : '-',
            },
            'lblColumn3': record.valueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.valueDate) : '-',
            'lblColumn4': record.status || '-',
            'btnAction': {
              'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.submitDocumentation'),
              'toolTip': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.submitDocumentation'),
              'onClick': function () {
                presenter.loadScreenWithContext({
                  'context': 'allocationDocuments',
                  'data': record
                });
              }
            },
            'lblRow1Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.senderNameWithColon'),
            'lblRow1Value': record.senderName || '-',
            'lblRow2Key': kony.i18n.getLocalizedString('kony.mb.TransferEurope.beneficairyNameColon'),
            'lblRow2Value': record.beneficiaryName || '-',
            'lblRow3Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.receiptAmountWthColon'),
            'lblRow3Value': (record.currency && record.receiptAmount) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.receiptAmount)}` : '-',
            'lblRow4Key': kony.i18n.getLocalizedString('i18n.wealth.valueDatemb'),
            'lblRow4Value': record.valueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.valueDate) : '-',
            'lblRowAction': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.ActionWithColon'),
            'btnRowAction1': {
              'isVisible': true,
              'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.requestDocumentation'),
              'toolTip': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.requestDocumentation'),
              'onClick': function () {
                scope.togglePopup({
                  'context': 'requestDocumentation',
                  'data': record
                });
              }
            }
          };
          segRowData.push(segObj);
        }
        segData.push([{
          'flxColumn1': {
            'left': '8%',
            'width': '20%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'transactionId';
              scope.sortRecords(context);
            }
          },
          'flxColumn2': {
            'width': '25%',
            'layoutType': kony.flex.FREE_FORM,
            'onClick': function (context) {
              listParams['sortByParam'] = 'originalAmount';
              scope.sortRecords(context);
            }
          },
          'flxColumn3': {
            'isVisible': presenter.allocater === 'anchor',
            'left': '5%',
            'width': '18%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'valueDate';
              scope.sortRecords(context);
            }
          },
          'flxColumn4': {
            'isVisible': presenter.allocater === 'counterparty',
            'left': '5%',
            'width': '18%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'status';
              scope.sortRecords(context);
            }
          },
          'flxAction': {
            'width': '24%',
          },
          'lblColumn1': kony.i18n.getLocalizedString('kony.i18n.common.transactionID'),
          'lblColumn2': {
            'text': kony.i18n.getLocalizedString('kony.mb.accdetails.originalAmount'),
            'left': '',
            'right': '20dp'
          },
          'lblColumn3': kony.i18n.getLocalizedString('i18n.wealth.valueDate'),
          'lblColumn4': kony.i18n.getLocalizedString('i18n.common.status'),
          'lblAction': kony.i18n.getLocalizedString('i18n.TradeFinance.Action'),
          'imgColumn1': {
            'src': scope.getSortImage('transactionId')
          },
          'imgColumn2': {
            'left': '',
            'right': '0dp',
            'src': scope.getSortImage('originalAmount')
          },
          'imgColumn3': {
            'src': scope.getSortImage('valueDate')
          },
          'imgColumn4': {
            'src': scope.getSortImage('status')
          }
        }, segRowData]);
      }
      contentScope.segData.setData(segData);
      contentScope.flxList.forceLayout();
    },
    /**
     * Handles the segment row view on click of dropdown.
     */
    handleSegmentRowView: function () {
      const rowIndex = contentScope.segData.selectedRowIndex[1],
        segData = contentScope.segData.data[0][1],
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
      contentScope.segData.setDataAt(data, index, 0);
    },
    /**
     * Sorts the list data.
     * @param {object} context - Specifies the context.
     */
    sortRecords: function (context) {
      if (context) {
        const widgetSrc = context.widgets()[1].src;
        listParams['sortOrder'] = (widgetSrc === images.noSort) ? 'ASC' : (widgetSrc === images.sortAsc) ? 'DESC' : 'ASC';
      }
      this.view.formTemplate12.showLoading();
      setTimeout(function () {
        listData = SCFUtils.sortRecords(listData, listParams);
        scope.setListData();
        scope.view.formTemplate12.hideLoading();
      }, 10);
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
      this.setPagination();
      this.setListData();
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
     * Handles the dropdown selection trigerred from component.
     * @param {string} widgetId - Specifies widget id.
     * @param {string} selectedKey - Specifies selected key.
     */
    handleDropdownSelection: function (widgetId, selectedKey) {
      switch (widgetId) {
        case 'DropdownASF2':
        case 'DropdownASF3':
          break;
        case 'DropdownASF4':
          this.setASCalendars(selectedKey);
          break;
      }
    },
    /**
     * Toggles the advance search popup.
     * @param {boolean} visibility - Specfies whether to show/hide advance search popup.
     * @returns {void} - Returns nothing if visibility is false.
     */
    toggleAdvanceSearchPopup: function (visibility) {
      popupScope.setVisibility(visibility);
      popupScope.flxAdvanceSearchPopup.setVisibility(visibility);
      if (!visibility || isSearchApplied) {
        return;
      }
      popupScope.tbxASF1.text = '';
      ['DropdownASF2', 'DropdownASF3', 'DropdownASF4'].forEach(widget => {
        popupScope[widget].removeSelection();
        popupScope[widget].setDefaultText();
        popupScope[widget].closeDropdown();
      });
      ['cal1ASF5', 'cal2ASF5'].forEach(widget => {
        popupScope[widget].clear();
      });
    },
    /**
     * Sets the advance search calendars on basis of selected date range.
     * @param {string} selectedKey - Specifes the selected range.
     * @returns {void} - Returns nothing is selected range is custom.
     */
    setASCalendars: function (selectedKey) {
      const cal1Widget = popupScope.cal1ASF5,
        cal2Widget = popupScope.cal2ASF5,
        [range, unit] = selectedKey.split(',');
      cal2Widget.validStartDate = null;
      if (range === 'CUSTOM') {
        popupScope.flxASF5.setEnabled(true);
        cal1Widget.clear();
        cal2Widget.clear();
        return;
      }
      let cutOffDate = new Date();
      switch (unit) {
        case 'DAY':
          cutOffDate.setDate(currDate.getDate() - parseInt(range, 10));
          break;
        case 'MONTH':
          cutOffDate.setMonth(currDate.getMonth() - parseInt(range, 10));
          break;
        case 'YEAR':
          cutOffDate.setFullYear(currDate.getFullYear() - parseInt(range, 10));
          break;
      }
      popupScope.flxASF5.setEnabled(false);
      cal1Widget.dateComponents = [cutOffDate.getDate(), cutOffDate.getMonth() + 1, cutOffDate.getFullYear()];
      cal2Widget.dateComponents = [currDate.getDate(), currDate.getMonth() + 1, currDate.getFullYear()];
    },
    /**
     * Applies the advance search.
     * @returns {void} - Return nothing if search fields are empty/invalid.
     */
    applyAdvanceSearch: function () {
      this.toggleAdvanceSearchPopup(false);
      searchCriteria = {
        'searchParam': {},
        'filterParam': {},
        'dateParam': {}
      };
      tagsData = {};
      const f1 = popupScope.tbxASF1.text,
        f2 = popupScope.DropdownASF2.getSelectedKey(),
        f3 = popupScope.DropdownASF3.getSelectedKey(),
        f4 = popupScope.DropdownASF4.getSelectedKey(),
        f5d1 = popupScope.cal1ASF5.formattedDate,
        f5d2 = popupScope.cal2ASF5.formattedDate;
      if (!f1 && !f2 && !f3 && !f4 && !f5d1 && !f5d2) {
        return;
      }
      if (f1) {
        searchCriteria['searchParam']['transactionId'] = f1;
        tagsData['transactionId'] = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.transactionIdWithColon')} ${f1}`;
      }
      if (f2) {
        (f1 !== 'All') && (searchCriteria['filterParam']['senderName'] = f2);
        tagsData['senderName'] = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.senderWithColon')} ${f2}`;
      }
      if (f3) {
        (f3 !== 'All') && (searchCriteria['filterParam']['beneficiaryName'] = f3);
        tagsData['beneficiaryName'] = `${kony.i18n.getLocalizedString('i18n.TradeFinance.BeneficiaryWithColon')} ${f3}`;
      }
      if (f5d1 && f5d2) {
        searchCriteria['dateParam']['valueDate'] = [f5d1, f5d2];
        tagsData['valueDate'] = `${kony.i18n.getLocalizedString('i18n.serviceRequests.DateRange')} ${f5d1} to ${f5d2}`;
      }
      this.view.formTemplate12.showLoading();
      isSearchApplied = true;
      contentScope.flxSearchContainer.setVisibility(false);
      contentScope.flxSearchResults.setVisibility(true);
      setTimeout(function () {
        listData = SCFUtils.searchAndFilterRecords(pendingAllocationData, searchCriteria);
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        scope.setPagination();
        scope.sortRecords();
        contentScope.brwSearchTags.evaluateJavaScript(`createTags(${JSON.stringify(tagsData)})`);
        scope.view.formTemplate12.hideLoading();
      }, 100);
    },
    /**
     * Sets the height of tags container.
     * @param {number} height - Specifies the height.
     */
    setTagsContainerHeight: function (height) {
      contentScope.flxSRFields.height = `${height + 10}dp`;
      contentScope.flxSearchResults.forceLayout();
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
        case 'transactionId':
          popupScope.tbxASF1.text = '';
          break;
        case 'senderName':
          popupScope.DropdownASF2.removeSelection();
          popupScope.DropdownASF2.setDefaultText();
          break;
        case 'beneficiaryName':
          popupScope.DropdownASF3.removeSelection();
          popupScope.DropdownASF3.setDefaultText();
          break;
        case 'valueDate':
          popupScope.DropdownASF4.removeSelection();
          popupScope.DropdownASF4.setDefaultText();
          popupScope.cal1ASF5.clear();
          popupScope.cal2ASF5.clear();
          break;
      }
      if (Object.keys(tagsData).length === 0) {
        isSearchApplied = false;
        contentScope.flxSearchContainer.setVisibility(true);
        contentScope.flxSearchResults.setVisibility(false);
      }
      this.view.formTemplate12.showLoading();
      setTimeout(function () {
        listData = SCFUtils.searchAndFilterRecords(pendingAllocationData, searchCriteria);
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        scope.setPagination();
        scope.sortRecords();
        scope.view.formTemplate12.hideLoading();
      }, 10);
    },
    /**
     * Enables the start date for end date range calendar.
     */
    enableStartDate: function () {
      const calStart = popupScope.cal1ASF5,
        calEnd = popupScope.cal2ASF5;
      let startDate = new Date(calStart.formattedDate);
      if (calEnd.formattedDate) {
        const endData = new Date(calEnd.formattedDate);
        if (endData <= startDate) {
          calEnd.clear();
        }
      }
      if (startDate < currDate) {
        startDate.setDate(startDate.getDate() + 1);
      }
      calEnd.validStartDate = [startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear()];
    },
    /**
     * Toggles the popup.
     * @param {object} param - Specifies the popup info.
     */
    togglePopup: function ({ context, data }) {
      let popupContext = {};
      switch (context) {
        case 'requestDocumentation':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.requestDocumentation'),
            'message': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.requestAllocationDocumentMessage'),
            'noText': kony.i18n.getLocalizedString('i18n.wealth.cancel'),
            'yesText': kony.i18n.getLocalizedString('i18n.wealth.proceed'),
            'yesClick': () => presenter.requestDocumentation(data, scope.view.id)
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