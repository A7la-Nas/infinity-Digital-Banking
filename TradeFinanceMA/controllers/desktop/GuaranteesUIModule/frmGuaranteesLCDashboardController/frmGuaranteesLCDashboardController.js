define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let GUARANTEES_TAB = "GuaranteesLC";
  let AMENDMENTS_TAB = "Amendments";
  let CLAIMS_TAB = kony.i18n.getLocalizedString("i18n.TradeFinance.claims");
  let selectedRecord;
  let navToLCDetails = false;
  this.downloadXLSXData = "";
  let onClickViewAmendments = false;
  let currentGuaranteesSRMSId = "";
  this.sortField = {
    "imgCoulmnTab1": "beneficiaryName",
    "imgCoulmnTab2": "productType",
    "imgCoulmnTab3": "billType",
    "imgCoulmnTab4": "guaranteesReferenceNo",
    "imgCoulmnTab5": "createdOn",
    "imgCoulmnTab6": "status",
    "imgColumnAmendmentsTab1": "benificiaryName",
    "imgColumnAmendmentsTab2": "amendmentNo",
    "imgColumnAmendmentsTab3": "amendmentReference",
    "imgColumnAmendmentsTab4": "amendRequestedDate",
    "imgColumnAmendmentsTab6": "amendStatus",
    "imgColumnClaimsTab1": "beneficiaryName",
    "imgColumnClaimsTab2": "productType",
    "imgColumnClaimsTab3": "claimAmount",
    "imgColumnClaimsTab4": "receivedOn",
    "imgColumnClaimsTab5": "claimStatus"
  };
  this.chartServiceParameters = {
    searchString: "",
    pageSize: "",
    pageOffset: "",
    sortByParam: "serviceRequestTime",
    sortOrder: "DESC",
    timeParam: "",
    timeValue: "",
    filterByValue: "",
    filterByParam: "",
  };
  let billType;
  let billTypeLength = 0;
  let guaranteesAndStandByLCStatus;
  let isChartRendered = false;
  let currentLCValue = "AllGuaranteesAndStandbyLC";
  let chartAndStatusData = {};
  let mixedTotalAmount = {};
  let lcCurrency = {};
  let selectedCurrency = "USD";
  let productType = "AllGuaranteesAndStandbyLC";
  let isGuaranteesAndStandByLC = false;
  let formatUtil;
  let statusData = {};
  let regExpForCheckArrayInString = /[\[\]]+/;
  let lcByIDNav;
  let isRecentLCViewDetailsBtnOnClick = false;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  return {
    /**
     * @api : onNavigate
     * This function for executing the postShow, displayData and methods given
     * @return : NA
     */
    onNavigate: function (record) {
      const flowType = record && record.hasOwnProperty('flowType') ? record.flowType : 'Guarantees';
      this.currentTab = {
        'Guarantees': GUARANTEES_TAB,
        'Amendments': AMENDMENTS_TAB,
        'Claims': CLAIMS_TAB
      }[flowType];
    },
    /**
     * Sets the initial actions for form
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.initActions();
    },
    /**
     * @api : preShow
     * Gets invoked initially before rendering of UI
     * @return : NA
     */
    preShow: function () {
      var scope = this;
      try {
        scope.view.flxErrorMessage.setVisibility(false);
        scope.view.customheadernew.activateMenu("TradeFinance", "Guarantees");
        scope.lowerLimit = 1;
        scope.upperLimit = 10;
        scope.isFilterApplied = false;
        scope.sortApplied = false;
        this.navManager = applicationManager.getNavigationManager();
        if (scope.currentTab === "" || kony.sdk.isNullOrUndefined(scope.currentTab)) {
          scope.currentTab = GUARANTEES_TAB;
        }
        scope.setFilterData();
        scope.view.btnTab2.setVisibility(true);
        var claimsReceivedPermission = applicationManager.getConfigurationManager().checkUserPermission('CLAIMS_RECEIVED_VIEW');
        if (claimsReceivedPermission)
          scope.view.btnTab3.setVisibility(true);
        else
          scope.view.btnTab3.setVisibility(false);
        scope.guaranteesPresenter = applicationManager.getModulesPresentationController({
          appName: 'TradeFinanceMA',
          moduleName: 'GuaranteesUIModule'
        });
        formatUtil = applicationManager.getFormatUtilManager();
        lcCurrency = Object.values(scope.guaranteesPresenter.guaranteeConfig.currencies);
        scope.view.btnLCCurrency.text = "USD-$";
        scope.view.btnAllGuaranteesAndStandbyLC.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AllGTSBLC");
        this.view.flxLGCopyDetailsContainer.doLayout = CommonUtilities.centerPopupFlex;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : postShow
     * Gets invoked initially after rendering of UI
     * @return : NA
     */
    postShow: function () {
      var scope = this;
      try {
        var createAmendPermission = applicationManager.getConfigurationManager().checkUserPermission('LC_GUARANTEES_AMENDMENTS_CREATE');
        if (createAmendPermission) {
          scope.view.flxRaiseNewAmendmentRequest.setVisibility(true);
          scope.view.flxCreateNewAmendment.setVisibility(true);
          scope.view.flxQuickActions.height = "100px";
        } else {
          scope.view.flxRaiseNewAmendmentRequest.setVisibility(false);
          scope.view.flxCreateNewAmendment.setVisibility(false);
          scope.view.flxQuickActions.height = "50px";
        }
        scope.toggleLGCopyDetailsPopup(false);
        scope.view.flxGuaranteesDropdown.setVisibility(false);
        scope.view.flxCurrencyDropdown.setVisibility(false);
        scope.setSegCurrencyDropdownData();
        FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        scope.view.customheadernew.forceCloseHamburger();
        scope.view.flxDialogs.height = kony.os.deviceInfo().screenHeight + 120 + "dp";
        //Overview methods
        scope.guaranteesPresenter.getGuarantees(chartServiceParameters, "frmGuaranteesLCDashboard");
        scope.seti18nKeys();
        scope.segLCDropdownWidgetMapping();
        billType = scope_configManager.guaranteeBillType;
        guaranteesAndStandByLCStatus = scope_configManager.guaranteesAndStandByLCStatus;
        //Listing methods
        scope.view.PaginationContainer.setPageSize(10);
        scope.setTabNavigation();
        scope.setHeaderi18n();
        scope.view.flxListDropdown.setVisibility(false);
        scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        scope.moreActionSegDataMapping();
        scope.view.segLCAccountType.height = "135dp";
        scope.setDefaultSort('imgCoulmnTab5');
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : onBreakpointChange
         * This function for changing the UI depending upon breakpoint
         * @return : NA
         */
    onBreakpointChange: function () {
      var scope = this;
      try {
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        scope.view.customheadernew.onBreakpointChangeComponent(currentBreakpoint);
        scope.view.customfooternew.onBreakpointChangeComponent(currentBreakpoint);
        scope.setDashboardData();
        scope.setHeaderi18n();
        this.view.flxSegLCHeader.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
    updateFormUI: function (viewModel) {
      var scope = this;
      try {
        if (kony.sdk.isNullOrUndefined(viewModel.guaranteesReference) || viewModel.guaranteesReference === "") {
          viewModel.guaranteesReference = viewModel.guaranteesReferenceNo;
        }
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
        if (viewModel.ClaimsReceived) {
          scope.guaranteesLCDetails = viewModel.ClaimsReceived;
          scope.setDashboardData();
        }
        if (viewModel.serverError) {
          scope.showServerError(viewModel.serverError);
        }
        if (viewModel.GuaranteesLC) {
          if (this.view.flxLGCopyDetailsPopup.isVisible) {
            let createAmendPopUpData = [];
            for (const record of viewModel.GuaranteesLC) {
              if (record.relatedTransactionReference && (!record.amendmentNo || (record.amendmentNo && ((JSON.parse(record.amendmentNo.replace(/'/g, "\"")).amendmentStatus).toLowerCase() === OLBConstants.GUARANTEE_LC_STATUS.APPROVED.toLowerCase())))) {
                createAmendPopUpData.push(record);
              }
            }
            this.view.LGCopyDetails.setData(createAmendPopUpData, 'issuedGuarantee');
          } else {
            scope.guaranteesLCDetails = viewModel.GuaranteesLC;
            if (scope.currentTab === GUARANTEES_TAB) {
              scope.setDashboardData();
            }
            if (!isChartRendered) {
              isChartRendered = true;
              scope.customWidgets();
              scope.setRecentLCData();
              scope.getStatusAndChartData();
            }
          }
        }
        if (viewModel.GuaranteeLCAmendments) {
          scope.guaranteesLCDetails = viewModel.GuaranteeLCAmendments;
          scope.setDashboardData();
          scope.lcDetails = scope.guaranteesLCDetails;
        }
        if (viewModel.AmendmentHistory && viewModel.amendmentSRMSRequestId && onClickViewAmendments === true) {
          onClickViewAmendments = false;
          selectedRecord = viewModel;
          scope.guaranteesPresenter.getGuaranteeById({
            "guaranteesSRMSId": currentGuaranteesSRMSId
          }, "frmGuaranteesLCDashboard");
        }
        if (viewModel.guaranteesSRMSId && !(viewModel.amendmentSRMSRequestId) && !(isRecentLCViewDetailsBtnOnClick) && selectedRecord && !(navToLCDetails)) {
          selectedRecord["LCDetails"] = viewModel;
          this.navManager.navigateTo({
            appName: "TradeFinanceMA",
            friendlyName: "GuaranteesUIModule/frmViewAmendmentDetails"
          }, false, selectedRecord);
        } else if (viewModel.guaranteesSRMSId && !(viewModel.amendmentSRMSRequestId) && (isRecentLCViewDetailsBtnOnClick)) {
          isRecentLCViewDetailsBtnOnClick = false;
          scope.navigateLCByID(viewModel);
        }
        if (navToLCDetails && viewModel.guaranteesSRMSId && !(viewModel.amendmentSRMSRequestId)) {
          navToLCDetails = false;
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "GuaranteesUIModule/frmGuaranteesLCDetails"
          }).navigate(viewModel);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "updateFormUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : initActions
         * Method to initialise the component actions
         * @return : NA
         */
    initActions: function () {
      var scope = this;
      try {
        //Overview methods
        scope.view.lblImportLC.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuedGuaranteeStandbyLC");
        scope.view.flxAllGuarantessAndStandbyLC.onClick = scope.segLCDropdownExpandCollapse.bind(this, "lblDropdownIcon", "flxGuaranteesDropdown");
        scope.view.flxLCCurrency.onClick = scope.segLCDropdownExpandCollapse.bind(this, "lblLCCurrency", "flxCurrencyDropdown");
        scope.view.btnCreateNewGSLC.onClick = scope.navCreateNewGTSBLC.bind(this);
        scope.view.btnCreateNewGTSBLC.onClick = scope.navCreateNewGTSBLC.bind(this);
        scope.view.btnCreateNewAmendment.onClick = scope.toggleLGCopyDetailsPopup.bind(this, true);
        scope.view.btnRaiseNewAmendmentRequest.onClick = scope.toggleLGCopyDetailsPopup.bind(this, true);
        scope.view.LGCopyDetails.flxClose.onClick = scope.toggleLGCopyDetailsPopup.bind(this, false);
        scope.view.LGCopyDetails.btnCopyDetails.onClick = scope.createNewAmendment.bind(this);
        scope.view.flxCloseError.onClick = () => scope.view.flxErrorMessage.setVisibility(false);
        //Listing method
        scope.setFilterData();
        scope.view.flxVerticalEllipsis.onClick = scope.moreActionOnClick.bind(this);
        scope.view.tbxSearch.text = "";
        scope.view.imgClear.setVisibility(false);
        scope.view.tbxSearch.onTextChange = function () {
          if (scope.view.tbxSearch.text.length > 0) scope.view.imgClear.setVisibility(true);
          else scope.view.imgClear.setVisibility(false);
        };
        scope.view.tbxSearch.onTouchStart = function () {
          if (scope.view.flxListDropdown.isVisible === true) {
            scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
            scope.view.flxListDropdown.setVisibility(false);
          }
        };
        scope.view.imgClear.onTouchEnd = function () {
          scope.view.tbxSearch.text = "";
          scope.isSearchEnabled = false;
          scope.view.imgClear.setVisibility(false);
          downloadXLSXData = "";
          scope.fetchDashboardData();
        };
        if (!kony.sdk.isNullOrUndefined(scope.view.tbxSearch.text)) {
          scope.view.imgClear.setVisibility(false);
        }
        scope.setFilterUIView();
        scope.view.flxDropDown.onClick = scope.toggleFilterDropDownVisibility;
        scope.view.btnApply.toolTip = "Apply";
        scope.view.btnCancel.toolTip = "Cancel";
        scope.view.tbxSearch.onDone = scope.getSearchData;
        scope.view.btnApply.onClick = scope.applyFilters;
        scope.view.btnCancel.onClick = scope.onFilterCancel.bind(this);
        scope.view.btnTab1.onClick = scope.setTabData.bind(scope, GUARANTEES_TAB);
        scope.view.btnTab2.onClick = scope.setTabData.bind(scope, AMENDMENTS_TAB);
        scope.view.btnTab3.onClick = scope.setTabData.bind(scope, CLAIMS_TAB);
        scope.view.LGCopyDetails.btnClose.onClick = scope.navPopUpViewDetails.bind(this);
        scope.view.flxGuaranteesLCMain.onClick = scope.hideFilterDropDown.bind(this);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "initActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    showServerError: function (errorMsg) {
      this.view.flxErrorMessage.setVisibility(true);
      this.view.lblErrorMessage.text = errorMsg;
      this.view.flxMain.forceLayout();
    },
    /**
         * @api : seti18nKeys
         * This function assigns i18n to static labels
         * @return : NA
         */
    seti18nKeys: function () {
      var scope = this;
      try {
        scope.view.lblBeneficiaryKey1.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Beneficiary") + ":";
        scope.view.lblTypeRefKey1.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TypeRef") + ":";
        scope.view.lblStatusKey1.text = kony.i18n.getLocalizedString("i18n.billPay.Status") + ":";
        scope.view.lblBeneficiaryKey2.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Beneficiary") + ":";
        scope.view.lblTypeRefKey2.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TypeRef") + ":";
        scope.view.lblStatusKey2.text = kony.i18n.getLocalizedString("i18n.billPay.Status") + ":";
        scope.view.LGCopyDetails.lblCopyDetails.text = kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewAmendment");
        scope.view.LGCopyDetails.lblDescription.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Select a GuaranteeAndStandbyLCToCreateAnAmendment");
        scope.view.LGCopyDetails.txtSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.SearchForBeneficiaryOrTransactionRef");
        scope.view.LGCopyDetails.lblBeneficiary.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Beneficiary");
        scope.view.LGCopyDetails.lblReference.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef");
        scope.view.LGCopyDetails.lblProduct.text = (kony.i18n.getLocalizedString("i18n.TradeFinance.productTypeWithColon")).replace(':', '');
        scope.view.LGCopyDetails.lblIssueDate.text = kony.i18n.getLocalizedString("kony.mb.CM.issueDate");
        scope.view.LGCopyDetails.btnClose.text = kony.i18n.getLocalizedString("i18n.common.ViewDetails");
        scope.view.LGCopyDetails.btnCopyDetails.text = kony.i18n.getLocalizedString("i18n.enrollNow.Create");
        scope.view.lblNoTransaction.text = kony.i18n.getLocalizedString("i18n.TradeFinance.NoRecordErrMsg");
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "seti18nKeys",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : setSegCurrencyDropdownData
         * This function sets widget data mapping for All Guarantees & Standby LC dropdown
         * @return : NA
         */
    setSegCurrencyDropdownData: function () {
      var scope = this;
      try {
        var segCurrencyData = [],
          i;
        scope.view.segCurrencyDropdown.widgetDataMap = {
          "flxGuaranteesDropdown": "flxGuaranteesDropdown",
          "lblLCValue": "lblLCValue",
          "lblSeparator": "lblSeparator"
        };
        for (i = 0; i < lcCurrency.length; i++) {
          segCurrencyData[i] = {
            "lblLCValue": {
              "text": lcCurrency[i] + "-" + applicationManager.getConfigurationManager().getCurrency(lcCurrency[i]),
              "toolTip": kony.i18n.getLocalizedString("i18n.TradeFinance.AllGTSBLC"),
              "isVisible": true,
            },
            "flxGuaranteesDropdown": {
              "onClick": scope.segLCCurrencyDropdownOnclick.bind(this),
              "isVisible": true,
            }
          }
        }
        scope.view.segCurrencyDropdown.setData(segCurrencyData);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setSegCurrencyDropdownData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : segLCCurrencyDropdownOnclick
         * This function handles onClick of each row in segLCDropdown
         * @return : NA
         */
    segLCCurrencyDropdownOnclick: function () {
      var scope = this;
      try {
        let segmentdata = JSON.parse(JSON.stringify(scope.view.segCurrencyDropdown.data));
        var rowIndex = scope.view.segCurrencyDropdown.selectedRowIndex[1];
        scope.view.btnLCCurrency.text = segmentdata[rowIndex].lblLCValue.text;
        selectedCurrency = lcCurrency[rowIndex];
        scope.view.flxCurrencyDropdown.setVisibility(false);
        scope.view.lblLCCurrency.text = "O";
        scope.setBarChartData();
        scope.setStatusData();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "segLCCurrencyDropdownOnclick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : segLCDropdownWidgetMapping
         * This function sets widget data mapping for All Guarantees & Standby LC dropdown
         * @return : NA
         */
    segLCDropdownWidgetMapping: function () {
      var scope = this;
      try {
        scope.view.segGuaranteesDropdown.widgetDataMap = {
          "flxGuaranteesDropdown": "flxGuaranteesDropdown",
          "lblLCValue": "lblLCValue",
          "lblSeparator": "lblSeparator"
        };
        var segData = [
          [{},
          [{
            lblLCValue: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.AllGTSBLC"),
              toolTip: kony.i18n.getLocalizedString("i18n.TradeFinance.AllGTSBLC"),
              isVisible: true,
            },
            flxGuaranteesDropdown: {
              onClick: scope.segLCDropdownOnClick.bind(this),
              isVisible: true,
            },
          }, {
            lblLCValue: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.allGuarantees"),
              toolTip: kony.i18n.getLocalizedString("i18n.TradeFinance.allGuarantees"),
              isVisible: true,
            },
            flxGuaranteesDropdown: {
              onClick: scope.segLCDropdownOnClick.bind(this),
              isVisible: true,
            },
          }, {
            lblLCValue: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.allStandbyLC"),
              toolTip: kony.i18n.getLocalizedString("i18n.TradeFinance.allStandbyLC"),
              isVisible: true,
            },
            flxGuaranteesDropdown: {
              onClick: scope.segLCDropdownOnClick.bind(this),
              isVisible: true,
            },
          },]
          ]
        ];
        scope.view.segGuaranteesDropdown.setData(segData);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "segLCDropdownWidgetMapping",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : segLCDropdownOnClick
         * This function handles onClick of each row in segLCDropdown
         * @return : NA
         */
    segLCDropdownOnClick: function () {
      var scope = this;
      try {
        let segmentdata = JSON.parse(JSON.stringify(scope.view.segGuaranteesDropdown.data));
        var rowIndex = scope.view.segGuaranteesDropdown.selectedRowIndex[1];
        if (rowIndex === 0) {
          scope.view.btnAllGuaranteesAndStandbyLC.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AllGTSBLC");
          productType = "AllGuaranteesAndStandbyLC";
        } else if (rowIndex === 1) {
          scope.view.btnAllGuaranteesAndStandbyLC.text = kony.i18n.getLocalizedString("i18n.TradeFinance.allGuarantees");
          productType = "Guarantee";
        } else if (rowIndex === 2) {
          scope.view.btnAllGuaranteesAndStandbyLC.text = kony.i18n.getLocalizedString("i18n.TradeFinance.allStandbyLC");
          productType = "StandBy LC";
        }
        scope.view.flxGuaranteesDropdown.setVisibility(false);
        scope.view.lblDropdownIcon.text = "O";
        scope.setBarChartData();
        scope.setStatusData();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "segLCDropdownOnClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : segLCDropdownExpandCollapse
         * This function handles expand and collapse of segLCDropdown
         * @return : NA
         */
    segLCDropdownExpandCollapse: function (labelID, flxID) {
      var scope = this;
      try {
        if (scope.view[labelID].text === "O") {
          scope.view[flxID].setVisibility(true);
          scope.view[labelID].text = "P"
        } else {
          scope.view[flxID].setVisibility(false);
          scope.view[labelID].text = "O"
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "segLCDropdownExpandCollapse",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setRecentLCData
     * This function sets Data for the Recent LC Section
     * @return : NA
     */
    setRecentLCData: function () {
      for (let i = 1; i <= 2; i++) {
        const record = this.guaranteesLCDetails[i - 1];
        if (record) {
          this.view[`lblBeneficiaryValue${i}`].text = record.beneficiaryDetails ? JSON.parse((record.beneficiaryDetails).replaceAll(`'`, `"`))[0].beneficiaryName : NA;
          this.view[`lblTypeRefValue${i}`].text = record.productType ? `${record.productType} - ${record.relatedTransactionReference || record.guaranteesSRMSId}` : NA;
          this.view[`lblStatusValue${i}`].text = record.status || NA;
          this.view[`btnRecentViewDetails${i}`].text = kony.i18n.getLocalizedString(record.status === "Draft" ? "i18n.ImportLC.ContinueEditing" : "i18n.common.ViewDetails"),
            this.view[`btnRecentViewDetails${i}`].onClick = this.getGTLCByID.bind(this, `btnRecentViewDetails${i}`);
        } else {
          this.view[`lblBeneficiaryValue${i}`].text = NA;
          this.view[`lblTypeRefValue${i}`].text = NA;
          this.view[`lblStatusValue${i}`].text = NA;
        }
      }
    },
    /**
         * @api : getGTLCByID
         * This function handles onclick of View Details in Recent LC section
         * @return : NA
         */
    getGTLCByID: function (btnID) {
      var scope = this;
      var serviceParamGetLCByID = {};
      try {
        isRecentLCViewDetailsBtnOnClick = true;
        if (btnID === "btnRecentViewDetails1") {
          serviceParamGetLCByID["guaranteesSRMSId"] = scope.guaranteesLCDetails[0].guaranteesSRMSId;
        } else if (btnID === "btnRecentViewDetails2") {
          serviceParamGetLCByID["guaranteesSRMSId"] = scope.guaranteesLCDetails[1].guaranteesSRMSId;
        }
        if (scope.view[btnID].text === kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing")) lcByIDNav = "continueEditing";
        else if (scope.view[btnID].text === kony.i18n.getLocalizedString("i18n.common.ViewDetails")) lcByIDNav = "viewDetails";
        scope.guaranteesPresenter.getGuaranteeById(serviceParamGetLCByID, "frmGuaranteesLCDashboard");
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "getGTLCByID",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : navCreateNewGTSBLC
         * This function handles navigation to create guarantees flow
         * @return : NA
         */
    navCreateNewGTSBLC: function () {
      var scope = this;
      try {
        scope.guaranteesPresenter.showGuaranteesScreen({
          context: 'createGuarantee'
        });
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "navCreateNewGTSBLC",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : customWidgets
         * Method to invoke on barchart add       
         * @return : NA
         */
    customWidgets: function () {
      var scope = this;
      try {
        var data = [];
        var options = {
          title: '',
          height: 200,
          width: 200,
          legend: {
            position: 'none'
          },
          isStacked: true,
          bar: {
            groupWidth: "50%"
          },
          vAxis: {
            gridlines: {
              color: "#F6F6F6"
            },
            viewWindow: {
              min: 0
            },
            format: "short"
          },
          widgetId: 'stacked_barChart_div'
        };
        if (kony.application.getCurrentBreakpoint() === 640) {
          options.width = 380;
        } else if (kony.application.getCurrentBreakpoint() === 1024) {
          options.width = 500;
        } else if (kony.application.getCurrentBreakpoint() === 1366) {
          options.width = 650;
        }
        var BarChart = new kony.ui.CustomWidget({
          "id": "GuaranteesBarchart",
          "isVisible": true,
          "left": "80dp",
          "top": "20dp",
          "width": "800dp",
          "height": "300dp",
          "zIndex": 1
        }, {
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {
          "widgetName": "VerticalBarChart",
          "chartData": data,
          "chartProperties": options,
          "OnClickOfBar": function (data) { }
        });
        this.view.flxBarGraphMain.add(BarChart);
        this.customWidgetAdded = true;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "customWidgets",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : getStatusAndChartData
         * This function fetches all data based on status and Bill type
         * @return : NA
         */
    getStatusAndChartData: function () {
      var scope = this;
      try {
        var i, j, k;
        mixedTotalAmount = {
          "totalAmount": {
            "AllGuaranteesAndStandbyLC": {},
            "Guarantee": {},
            "StandBy LC": {}
          },
        };
        chartAndStatusData = scope.guaranteesLCDetails.reduce(function (acc, res) {
          let key = res['guaranteeAndSBLCType'];
          let status = res['status'] ? res['status'] : "";
          let currency = res['currency'] ? res['currency'] : "USD";
          let lcProductType = res['productType'];
          if (!acc[key]) {
            acc[key] = {};
            acc[key] = {
              "totalAmount": {
                "AllGuaranteesAndStandbyLC": {},
                "Guarantee": {},
                "StandBy LC": {}
              }
            };
          }
          if (!acc[status]) {
            acc[status] = {};
            acc[status] = {
              "totalAmount": {
                "AllGuaranteesAndStandbyLC": {},
                "Guarantee": {},
                "StandBy LC": {}
              },
              "count": {
                "AllGuaranteesAndStandbyLC": {},
                "Guarantee": {},
                "StandBy LC": {}
              }
            };
          }
          if (!acc[key]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency]) {
            acc[key]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] = 0;
            acc[key]["totalAmount"]["Guarantee"][currency] = 0;
            acc[key]["totalAmount"]["StandBy LC"][currency] = 0;
          }
          if (mixedTotalAmount["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] === undefined || mixedTotalAmount["totalAmount"]["Guarantee"][currency] === undefined || mixedTotalAmount["totalAmount"]["StandBy LC"][currency] === undefined) {
            mixedTotalAmount["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] = 0;
            mixedTotalAmount["totalAmount"]["Guarantee"][currency] = 0;
            mixedTotalAmount["totalAmount"]["StandBy LC"][currency] = 0;
          }
          mixedTotalAmount["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] = mixedTotalAmount["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
          acc[key]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] = acc[key]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
          if ((lcProductType).toLowerCase() === (OLBConstants.GUARANTEE_LC_PRODUCT_TYPE.GUARANTEE).toLowerCase()) {
            mixedTotalAmount["totalAmount"]["Guarantee"][currency] = mixedTotalAmount["totalAmount"]["Guarantee"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
            acc[key]["totalAmount"]["Guarantee"][currency] = acc[key]["totalAmount"]["Guarantee"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
          } else if ((lcProductType).toLowerCase() === (OLBConstants.GUARANTEE_LC_PRODUCT_TYPE.STANDBY_LC).toLowerCase()) {
            mixedTotalAmount["totalAmount"]["StandBy LC"][currency] = mixedTotalAmount["totalAmount"]["StandBy LC"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
            acc[key]["totalAmount"]["StandBy LC"][currency] = acc[key]["totalAmount"]["StandBy LC"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
          }
          if (!acc[status]["count"]["AllGuaranteesAndStandbyLC"][currency]) {
            acc[status]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] = 0;
            acc[status]["totalAmount"]["Guarantee"][currency] = 0;
            acc[status]["totalAmount"]["StandBy LC"][currency] = 0;
            acc[status]["count"]["AllGuaranteesAndStandbyLC"][currency] = 0;
            acc[status]["count"]["Guarantee"][currency] = 0;
            acc[status]["count"]["StandBy LC"][currency] = 0;
          }
          acc[status]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] = acc[status]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
          acc[status]["count"]["AllGuaranteesAndStandbyLC"][currency] = acc[status]["count"]["AllGuaranteesAndStandbyLC"][currency] + 1;
          if ((lcProductType).toLowerCase() === (OLBConstants.GUARANTEE_LC_PRODUCT_TYPE.GUARANTEE).toLowerCase()) {
            acc[status]["totalAmount"]["Guarantee"][currency] = acc[status]["totalAmount"]["Guarantee"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
            acc[status]["count"]["Guarantee"][currency] = acc[status]["count"]["Guarantee"][currency] + 1;
          } else if ((lcProductType).toLowerCase() === (OLBConstants.GUARANTEE_LC_PRODUCT_TYPE.STANDBY_LC).toLowerCase()) {
            acc[status]["totalAmount"]["StandBy LC"][currency] = acc[status]["totalAmount"]["StandBy LC"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
            acc[status]["count"]["StandBy LC"][currency] = acc[status]["count"]["StandBy LC"][currency] + 1;
          }
          return acc;
        }, {});
        for (let i = 0; i < guaranteesAndStandByLCStatus.length; i++) {
          statusData[guaranteesAndStandByLCStatus[i].DisplayStatus] = {};
          statusData[guaranteesAndStandByLCStatus[i].DisplayStatus] = {
            "totalAmount": {
              "AllGuaranteesAndStandbyLC": {},
              "Guarantee": {},
              "StandBy LC": {}
            },
            "count": {
              "AllGuaranteesAndStandbyLC": {},
              "Guarantee": {},
              "StandBy LC": {}
            }
          };
          for (let j = 0; j < guaranteesAndStandByLCStatus[i].LCStatus.length; j++) {
            for (let k = 0; k < Object.keys(chartAndStatusData).length; k++)
              if ((guaranteesAndStandByLCStatus[i].LCStatus[j]).toLowerCase() === (Object.keys(chartAndStatusData)[k]).toLowerCase()) {
                guaranteesAndStandByLCStatus[i].LCStatus[j] = Object.keys(chartAndStatusData)[k];
                for (let l = 0; l < lcCurrency.length; l++) {
                  if (!statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]])
                    statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]] = 0;
                  statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]] = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]] + chartAndStatusData[guaranteesAndStandByLCStatus[i].LCStatus[j]]["totalAmount"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]];
                  if (!statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["Guarantee"][lcCurrency[l]])
                    statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["Guarantee"][lcCurrency[l]] = 0;
                  statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["Guarantee"][lcCurrency[l]] = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["Guarantee"][lcCurrency[l]] + chartAndStatusData[guaranteesAndStandByLCStatus[i].LCStatus[j]]["totalAmount"]["Guarantee"][lcCurrency[l]];
                  if (!statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["StandBy LC"][lcCurrency[l]])
                    statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["StandBy LC"][lcCurrency[l]] = 0;
                  statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["StandBy LC"][lcCurrency[l]] = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["StandBy LC"][lcCurrency[l]] + chartAndStatusData[guaranteesAndStandByLCStatus[i].LCStatus[j]]["totalAmount"]["StandBy LC"][lcCurrency[l]];
                  if (!statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]])
                    statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]] = 0;
                  statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]] = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]] + chartAndStatusData[guaranteesAndStandByLCStatus[i].LCStatus[j]]["count"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]];
                  if (!statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["Guarantee"][lcCurrency[l]])
                    statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["Guarantee"][lcCurrency[l]] = 0;
                  statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["Guarantee"][lcCurrency[l]] = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["Guarantee"][lcCurrency[l]] + chartAndStatusData[guaranteesAndStandByLCStatus[i].LCStatus[j]]["count"]["Guarantee"][lcCurrency[l]];
                  if (!statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["StandBy LC"][lcCurrency[l]])
                    statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["StandBy LC"][lcCurrency[l]] = 0;
                  statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["StandBy LC"][lcCurrency[l]] = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["StandBy LC"][lcCurrency[l]] + chartAndStatusData[guaranteesAndStandByLCStatus[i].LCStatus[j]]["count"]["StandBy LC"][lcCurrency[l]];
                }
              }
          }
        }
        scope.setBarChartData();
        scope.setStatusData();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "getStatusAndChartData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : setBarChartData
         * Sets data to chart
         * @return : NA
         */
    setBarChartData: function () {
      var scope = this;
      try {
        var data = [];
        var i, j, isBillPayPresent = false,
          position;
        billTypeLength = billType.length;
        for (j = 0; j < billTypeLength && billType[j].type !== "Mixed"; j++) {
          for (i = 0; i < Object.keys(chartAndStatusData).length; i++) {
            if (Object.keys(chartAndStatusData)[i] === billType[j].type) {
              isBillPayPresent = true;
            }
          }
          var barData = {
            "allocatedAmount": "",
            "amountSpent": "",
            "budgetId": "1",
            "categoryId": "1",
            "categoryName": "",
            "errmsg": null,
            "budget1": 0,
            "budget1ColorCode": "",
            "budget1AnnotationText": "",
            "budget1TooltipText": "",
            "budget2": 0,
            "budget2TooltipText": "",
            "budget2ColorCode": "",
            "budget2AnnotationText": "",
            "budget3": -1,
            "budget3ColorCode": "",
            "budget3TooltipText": ""
          }
          if (isBillPayPresent) {
            barData.categoryName = billType[j].type;
            barData.budget1 = 0;
            barData.budget1ColorCode = billType[j].colorCode;
            barData.budget2 = chartAndStatusData[billType[j].type]["totalAmount"][productType][selectedCurrency];
            barData.budget2ColorCode = "color:" + billType[j].colorCode + ";" + "opacity:0.5";
            barData.budget1TooltipText = billType[j].type + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.totalLimit") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(chartAndStatusData[billType[j].type]["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.availBal") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(chartAndStatusData[billType[j].type]["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.utilized") + " : " + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency);
            barData.budget2TooltipText = billType[j].type + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.totalLimit") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(chartAndStatusData[billType[j].type]["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.availBal") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(chartAndStatusData[billType[j].type]["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.utilized") + " : " + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency);
          } else {
            barData.categoryName = billType[j].type;
            barData.budget1 = 0;
            barData.budget1ColorCode = billType[j].colorCode;
            barData.budget2 = 0;
            barData.budget2ColorCode = "color:" + billType[j].colorCode + ";" + "opacity:0.5";
            barData.budget1TooltipText = billType[j].type + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.totalLimit") + ":" + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.availBal") + ":" + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.utilized") + ":" + "0";
            barData.budget2TooltipText = billType[j].type + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.totalLimit") + ":" + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.availBal") + ":" + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.utilized") + ":" + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency);
          }
          data.push(barData);
          isBillPayPresent = false;
        }
        var barData = {
          "allocatedAmount": "",
          "amountSpent": "",
          "budgetId": "1",
          "categoryId": "1",
          "categoryName": kony.i18n.getLocalizedString("i18n.TradeFinance.mixed"),
          "errmsg": null,
          "budget1": 0,
          "budget1ColorCode": "#B339E2",
          "budget1AnnotationText": "",
          "budget1TooltipText": kony.i18n.getLocalizedString("i18n.TradeFinance.mixed") + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.totalLimit") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(mixedTotalAmount["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.availBal") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(mixedTotalAmount["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.utilized") + " : " + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency),
          "budget2": mixedTotalAmount["totalAmount"][productType][selectedCurrency],
          "budget2TooltipText": kony.i18n.getLocalizedString("i18n.TradeFinance.mixed") + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.totalLimit") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(mixedTotalAmount["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.availBal") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(mixedTotalAmount["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.utilized") + " : " + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency),
          "budget2ColorCode": "color:#B339E2;opacity:0.5",
          "budget2AnnotationText": "",
          "budget3": -1,
          "budget3ColorCode": "",
          "budget3TooltipText": ""
        }
        data.push(barData);
        scope.view.flxBarGraphMain.GuaranteesBarchart.chartData = data;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setBarChartData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : setStatusData
         * This function assigns the Status Fields related data
         * @return : NA
         */
    setStatusData: function () {
      var scope = this;
      try {
        let i, j, widgetStatus = "lblStatus",
          widgetStatusCount = "lblStatusCount",
          widgetStatusAmount = "lblStatusAmount";
        for (i = 0; i < guaranteesAndStandByLCStatus.length; i++) {
          scope.view[widgetStatus + i].text = guaranteesAndStandByLCStatus[i].DisplayStatus;
          scope.view[widgetStatusCount + i].text = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"][productType][selectedCurrency] ? JSON.stringify(statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"][productType][selectedCurrency]) : "0";
          scope.view[widgetStatusAmount + i].text = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"][productType][selectedCurrency] ? formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"][productType][selectedCurrency]), selectedCurrency) : formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency);
          if (scope.view[widgetStatusAmount + i].text.length > 13) {
            scope.view[widgetStatusAmount + i].top = "10px";
            scope.view[widgetStatusAmount + i].skin = "bbSknLbl424242SSP15Px";
          }
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setStatusData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : toggleLGCopyDetailsPopup
     * Handles visiblity of create new Amendment popup
     * @return : NA
     */
    toggleLGCopyDetailsPopup: function (visibility) {
      if (visibility) {
        this.view.flxLGCopyDetailsPopup.flxLGCopyDetailsContainer.LGCopyDetails.txtSearchBox.text = "";
        const criteria = {
          'sortByParam': "serviceRequestTime",
          'sortOrder': "DESC",
          'filterByValue': "Approved",
          'filterByParam': "status"
        };
        this.guaranteesPresenter.getGuarantees(criteria, this.view.id);
      }
      this.view.flxLGCopyDetailsPopup.setVisibility(visibility);
      this.view.forceLayout();
    },
    /**
     * @api : getSearchedRecords
     * Handles search operation of create new Amendment popup
     * @return : NA
     */
    getSearchedRecords: function () {
      const criteria = {
        'searchString': this.view.LGCopyDetails.txtSearchBox.text,
        'sortByParam': "serviceRequestTime",
        'sortOrder': "DESC",
        'filterByValue': "Approved",
        'filterByParam': "status"
      };
      this.guaranteesPresenter.getGuarantees(criteria, this.view.id);
      this.view.forceLayout();
    },
    /**
         * @api : setHeaderi18n
         * To set i18nkeys for Listing Document
         * @return : NA
         */
    setHeaderi18n: function () {
      var scope = this;
      try {
        var breakpoint = kony.application.getCurrentBreakpoint();
        if (breakpoint === 1024) {
          scope.view.btnCoulmnTab2.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef");
          scope.view.btnCoulmnTab3.text = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn");
          scope.view.btnColumnAmendments3.text = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn");
        } else {
          scope.view.btnCoulmnTab1.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Beneficiary");
          scope.view.btnCoulmnTab2.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Type").slice(0, 4);
          scope.view.btnCoulmnTab3.text = kony.i18n.getLocalizedString("i18n.TradeFinance.gtAndSlbcWithColon").slice(0, 14);
          scope.view.btnCoulmnTab4.text = kony.i18n.getLocalizedString("i18n.ImportLC.Reference");
          scope.view.btnCoulmnTab5.text = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn");
          scope.view.btnCoulmnTab6.text = kony.i18n.getLocalizedString("i18n.konybb.manageUser.Status");
          scope.view.btnCoulmnTab7.text = kony.i18n.getLocalizedString("i18n.wireTransfers.Actions");
          scope.view.btnColumnAmendments1.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Beneficiary");
          scope.view.btnColumnAmendments2.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNo");
          scope.view.btnColumnAmendments3.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef");
          scope.view.btnColumnAmendments4.text = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn");
          scope.view.btnColumnAmendments6.text = kony.i18n.getLocalizedString("i18n.konybb.manageUser.Status");
          scope.view.btnColumnAmendments7.text = kony.i18n.getLocalizedString("i18n.wireTransfers.Actions");
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setHeaderi18n",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : setTabData
         * To set segment data for tab on button click
         * @return : NA
         */
    setTabData: function (tabName) {
      var scope = this;
      try {
        scope.currentTab = tabName;
        scope.setTabNavigation();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setTabData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : applyFilters
         * Applies the filter values for filtering the data
         * @return : NA
         */
    applyFilters: function () {
      var scope = this;
      try {
        let filterByValue = [];
        let filterByParam = [];
        let timeValue = "";
        scope.serviceParameters.sortByParam = "";
        scope.serviceParameters.sortOrder = "";
        let pageOffset = this.view.PaginationContainer.getPageOffset();
        let selectedFilterCount = 0;
        for (var i = 1; i < scope.view.segLCAccountType.data.length; i++) {
          if (scope.view.segLCAccountType.data[i].lblLCCheckbox.text === "C") {
            filterByValue.push(scope.view.segLCAccountType.data[i].lblLCAccountType.key);
            filterByParam.push("productType");
            selectedFilterCount++;
          }
        }
        for (var i = 1; i < scope.view.segBillType.data.length; i++) {
          if (scope.view.segBillType.data[i].lblLCCheckbox.text === "C") {
            filterByValue.push(scope.view.segBillType.data[i].lblStatusType.key);
            if (scope.currentTab === GUARANTEES_TAB || scope.currentTab === CLAIMS_TAB) {
              filterByParam.push("guaranteeAndSBLCType");
            } else if (scope.currentTab === AMENDMENTS_TAB) {
              filterByParam.push("billType");
            }
            selectedFilterCount++;
          }
        }
        for (var i = 1; i < scope.view.segLCStatusType.data.length; i++) {
          if (scope.view.segLCStatusType.data[i].lblLCCheckbox.text === "C") {
            filterByValue.push(scope.view.segLCStatusType.data[i].lblStatusType.key);
            if (scope.currentTab === GUARANTEES_TAB) {
              filterByParam.push("status");
            } else if (scope.currentTab === CLAIMS_TAB) {
              filterByParam.push("claimStatus");
            } else {
              filterByParam.push("amendStatus");
            }
            selectedFilterCount++;
          }
        }
        for (var i = 0; i < scope.view.segTimePeriods.data.length; i++) {
          if (scope.view.segTimePeriods.data[i].lblLCCheckbox.text === "M") {
            switch (scope.view.segTimePeriods.data[i].lblFeatureName.text) {
              case "Last Six Months":
                timeValue = "6,MONTH";
                break;
              case "Today":
                timeValue = "1,DAY";
                break;
              case "Last One Month":
                timeValue = "1,MONTH";
                break;
              case "Last One Year":
                timeValue = "1,YEAR";
                break;
              case "YTD":
                var dt = new Date();
                var current = new Date(dt.getTime());
                var previous = new Date(dt.getFullYear(), 0, 1);
                timeValue = (Math.ceil((current - previous + 1) / 86400000)) + ",DAYS";
                break;
            }
            selectedFilterCount++;
          }
        }
        scope.isFilterApplied = true;
        scope.view.flxListDropdown.setVisibility(false);
        scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        scope.segFilter1Data = scope.view.segLCAccountType.data;
        scope.segFilter2Data = scope.view.segBillType.data;
        scope.segFilter3Data = scope.view.segLCStatusType.data;
        scope.segFilter4Data = scope.view.segTimePeriods.data;
        if (scope.segFilter1Data[0].lblLCCheckbox.text === "C" && scope.segFilter2Data[0].lblLCCheckbox.text === "C" && scope.segFilter3Data[0].lblLCCheckbox.text === "C") {
          scope.view.lblFilterText.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
        } else {
          scope.view.lblFilterText.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Selected") + "(" + selectedFilterCount + ")";
        }
        scope.view.forceLayout();
        filterByValue = filterByValue.join(',');
        filterByParam = filterByParam.join(',');
        filterByValue.substring(1, filterByValue.length);
        let timeParam = "";
        if (scope.currentTab === GUARANTEES_TAB) {
          timeParam = "serviceRequestTime";
        } else if (scope.currentTab === AMENDMENTS_TAB) {
          timeParam = "amendRequestedDate";
        } else if (scope.currentTab === CLAIMS_TAB) {
          timeParam = "receivedOn";
        }
        scope.serviceParameters.filterByValue = filterByValue;
        scope.serviceParameters.filterByParam = filterByParam;
        scope.serviceParameters.timeParam = timeParam;
        scope.serviceParameters.timeValue = timeValue;
        if (scope.currentTab === AMENDMENTS_TAB) {
          scope.serviceParameters.sortByParam = "amendRequestedDate";
        } else if (scope.currentTab === GUARANTEES_TAB) {
          scope.serviceParameters.sortByParam = "serviceRequestTime";
        } else if (scope.currentTab === CLAIMS_TAB) {
          scope.serviceParameters.sortByParam = "receivedOn";
          scope.serviceParameters.sortOrder = "DESC";
        }
        downloadXLSXData = scope.serviceParameters;
        scope.fetchDashboardData();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "applyFilters",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : getSearchData
         * Gets on search
         * @return : NA
         */
    getSearchData: function () {
      var scope = this;
      try {
        var searchString = this.view.tbxSearch.text;
        this.lowerLimit = 1;
        scope.view.PaginationContainer.setPageSize(10);
        if (searchString !== null && searchString !== undefined) {
          this.isSearchEnabled = true;
          if (scope.currentTab === GUARANTEES_TAB) {
            scope.serviceParameters.pageSize = "11";
            scope.serviceParameters.pageOffset = "0";
            scope.serviceParameters.searchString = searchString;
            this.guaranteesPresenter.getGuarantees(scope.serviceParameters, "frmGuaranteesLCDashboard");
          } else if (scope.currentTab === AMENDMENTS_TAB) {
            scope.serviceParameters.pageSize = "11";
            scope.serviceParameters.pageOffset = "0";
            scope.serviceParameters.searchString = searchString;
            downloadXLSXData = scope.serviceParameters;
            this.guaranteesPresenter.getGuaranteeAmendments(scope.serviceParameters, "frmGuaranteesLCDashboard");
          } else if (scope.currentTab === CLAIMS_TAB) {
            scope.serviceParameters.pageSize = "11";
            scope.serviceParameters.pageOffset = "0";
            scope.serviceParameters.searchString = searchString;
            this.guaranteesPresenter.getReceivedClaims(scope.serviceParameters, "frmGuaranteesLCDashboard");
          }
        } else {
          this.isSearchEnabled = false;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "getSearchData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : fetchDashboardData
         * This method will invoked to fetch the dashboard data 
         * @return : NA
         */
    fetchDashboardData: function (params) {
      try {
        var scope = this;
        if (params !== 'pagination' && params !== "sort") {
          scope.view.PaginationContainer.setLowerLimit(1);
          scope.view.PaginationContainer.setPageSize(10);
          scope.view.PaginationContainer.setIntervalHeader();
        }
        var searchStringtext = scope.view.tbxSearch.text;
        var pageOffsetValue = (params === "pagination" || params === "sort") ? scope.view.PaginationContainer.getPageOffset() : 0;
        scope.serviceParameters.searchString = searchStringtext;
        scope.serviceParameters.pageOffset = JSON.stringify(pageOffsetValue);
        if (scope.currentTab === GUARANTEES_TAB) {
          this.guaranteesPresenter.getGuarantees(scope.serviceParameters, "frmGuaranteesLCDashboard");
        } else if (scope.currentTab === AMENDMENTS_TAB) {
          this.guaranteesPresenter.getGuaranteeAmendments(scope.serviceParameters, "frmGuaranteesLCDashboard");
        } else if (scope.currentTab === CLAIMS_TAB) {
          this.guaranteesPresenter.getReceivedClaims(scope.serviceParameters, "frmGuaranteesLCDashboard");
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "fetchDashboardData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
            * @api : onFilterCancel
            * This metod will invoked on cancel of filters
            * @return : NA
        */
    onFilterCancel: function () {
      var scope = this;
      try {
        var statusTypeCount = 0;
        var timeParamValue = "";
        var selectedFilterString = "";
        var selectedTimePeriodFilter = "";
        scope.resetFilters();
        selectedFilterString = scope.serviceParameters.filterByValue;
        selectedTimePeriodFilter = scope.serviceParameters.timeValue;
        var selectedFilterArray = selectedFilterString.split(",");
        if (selectedFilterArray[0] !== null && selectedFilterArray[0] !== undefined && selectedFilterArray[0] !== "") {
          for (var i = 0; i < selectedFilterArray.length; i++) {
            for (var j = 0; j < scope.view.segLCAccountType.data.length; j++) {
              var accountTypeFilterSegment = scope.view.segLCAccountType.data;
              if (accountTypeFilterSegment[j].lblLCAccountType.text === selectedFilterArray[i]) {
                statusTypeCount++;
                accountTypeFilterSegment[j].lblLCCheckbox.text = "C";
                if (statusTypeCount === scope.view.segLCAccountType.data.length - 1) {
                  accountTypeFilterSegment[0].lblLCCheckbox.text = "C";
                }
              }
            }
          }
          scope.view.segLCAccountType.removeAll();
          scope.view.segLCAccountType.setData(accountTypeFilterSegment);
          scope.view.forceLayout();
          statusTypeCount = 0;
          for (var i = 0; i < selectedFilterArray.length; i++) {
            for (var j = 0; j < scope.view.segBillType.data.length; j++) {
              var statusTypeFilterSegment = scope.view.segBillType.data;
              if (statusTypeFilterSegment[j].lblStatusType.text === selectedFilterArray[i]) {
                statusTypeCount++;
                statusTypeFilterSegment[j].lblLCCheckbox.text = "C";
                if (statusTypeCount === scope.view.segBillType.data.length - 1) {
                  statusTypeFilterSegment[0].lblLCCheckbox.text = "C";
                }
              }
            }
          }
          scope.view.segBillType.removeAll();
          scope.view.segBillType.setData(statusTypeFilterSegment);
          scope.view.forceLayout();
          statusTypeCount = 0;
          for (var i = 0; i < selectedFilterArray.length; i++) {
            for (var j = 0; j < scope.view.segLCStatusType.data.length; j++) {
              var statusTypeFilterSegment = scope.view.segLCStatusType.data;
              if (statusTypeFilterSegment[j].lblStatusType.text === selectedFilterArray[i]) {
                statusTypeCount++;
                statusTypeFilterSegment[j].lblLCCheckbox.text = "C";
                if (statusTypeCount === scope.view.segLCStatusType.data.length - 1) {
                  statusTypeFilterSegment[0].lblLCCheckbox.text = "C";
                }
              }
            }
          }
          scope.view.segLCStatusType.removeAll();
          scope.view.segLCStatusType.setData(statusTypeFilterSegment);
          scope.view.forceLayout();
          for (var i = 0; i < scope.view.segTimePeriods.data.length; i++) {
            var timePeriodSegment = scope.view.segTimePeriods.data;
            switch (timePeriodSegment[i].lblFeatureName.text) {
              case "Last Six Months":
                timeParamValue = "6,MONTH";
                break;
              case "Today":
                timeParamValue = "1,DAY";
                break;
              case "Last One Month":
                timeParamValue = "1,MONTH";
                break;
              case "Last One Year":
                timeParamValue = "1,YEAR";
                break;
              case "YTD":
                var dt = new Date();
                var current = new Date(dt.getTime());
                var previous = new Date(dt.getFullYear(), 0, 1);
                timeParamValue = (Math.ceil((current - previous + 1) / 86400000)) + ",DAYS";
                break;
              default:
                timeParamValue = "";
                break;
            }
            if (timeParamValue === selectedTimePeriodFilter) {
              timePeriodSegment[i].lblLCCheckbox.text = "M";
              timePeriodSegment[i].lblLCCheckbox.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
            }
          }
          scope.view.segTimePeriods.removeAll();
          scope.view.segTimePeriods.setData(timePeriodSegment);
          scope.view.forceLayout();
        } else {
          var accountTypeFilterSegment = scope.view.segLCAccountType.data;
          for (var i = 0; i < accountTypeFilterSegment.length; i++) {
            accountTypeFilterSegment[i].lblLCCheckbox.text = "C";
          }
          scope.view.segLCAccountType.removeAll();
          scope.view.segLCAccountType.setData(accountTypeFilterSegment);
          var accountTypeFilterSegment = scope.view.segBillType.data;
          for (var i = 0; i < accountTypeFilterSegment.length; i++) {
            accountTypeFilterSegment[i].lblLCCheckbox.text = "C";
          }
          scope.view.segBillType.removeAll();
          scope.view.segBillType.setData(accountTypeFilterSegment);
          var statusTypeFilterSegment = scope.view.segLCStatusType.data;
          for (var i = 0; i < statusTypeFilterSegment.length; i++) {
            statusTypeFilterSegment[i].lblLCCheckbox.text = "C";
          }
          scope.view.segLCStatusType.removeAll();
          scope.view.segLCStatusType.setData(statusTypeFilterSegment);
          var timePeriodSegment = scope.view.segTimePeriods.data;
          timePeriodSegment[0].lblLCCheckbox.text = "M";
          timePeriodSegment[0].lblLCCheckbox.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
          scope.view.segTimePeriods.removeAll();
          scope.view.segTimePeriods.setData(timePeriodSegment);
          scope.view.forceLayout();
        }
        scope.view.flxListDropdown.setVisibility(false);
        scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        scope.setDefaultValueForDownloadCriteria();
      } catch (err) {
        var errorObj =
        {
          "method": "onFilterCancel",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : resetFilter
  * This metod will invoked on cancel of filters
  * @return : NA
*/
    resetFilters: function () {
      var scope = this;
      var lcTypeSegment = scope.view.segLCAccountType.data;
      var statusTypeSegment = scope.view.segLCStatusType.data;
      var billTypeSegment = scope.view.segBillType.data;
      var timePeriodSegment = scope.view.segTimePeriods.data;
      for (var i = 0; i < lcTypeSegment.length; i++) {
        lcTypeSegment[i].lblLCCheckbox.text = "D"
      }
      for (var i = 0; i < billTypeSegment.length; i++) {
        billTypeSegment[i].lblLCCheckbox.text = "D"
      }
      for (var i = 0; i < statusTypeSegment.length; i++) {
        statusTypeSegment[i].lblLCCheckbox.text = "D"
      }
      for (var i = 0; i < timePeriodSegment.length; i++) {
        timePeriodSegment[i].lblLCCheckbox.text = "L"
        timePeriodSegment[i].lblLCCheckbox.skin = "sknLblOlbFontIconsA0A0A020Px"
      }
      scope.view.segLCAccountType.setData(lcTypeSegment);
      scope.view.segLCStatusType.setData(statusTypeSegment);
      scope.view.segBillType.setData(billTypeSegment);
      scope.view.segTimePeriods.setData(timePeriodSegment);
    },
    /**
         * @api : setDefaultValueForDownloadCriteria
         * To remove all the filter Critera and set the downloadXLSXData to default values
         * @return : NA
         */
    setDefaultValueForDownloadCriteria: function () {
      var scope = this;
      try {
        downloadXLSXData = {
          "searchString": "",
          "pageSize": "",
          "pageOffset": "",
          "sortByParam": "",
          "sortOrder": "",
          "timeParam": "",
          "timeValue": "",
          "filterByValue": "",
          "filterByParam": ""
        };
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setDefaultValueForDownloadCriteria",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : setFilterData
         * To set filter segment data
         * @return : NA
         */
    setFilterData: function () {
      var scope = this;
      try {
        scope.view.imgAccountLCDropdown.src = "arrowup_sm.png";
        scope.view.flxAccountLCDropdownImage.onClick = scope.onActionClickFilterSegment.bind(this, "segLCAccountType", "imgAccountLCDropdown");
        scope.view.imgStatusLCDropdown.src = "arrowup_sm.png";
        scope.view.flxStatusLCDropdownImage.onClick = scope.onActionClickFilterSegment.bind(this, "segLCStatusType", "imgStatusLCDropdown");
        scope.view.imgTimePeriodDropdown.src = "arrowup_sm.png";
        scope.view.imgBillTypeDropdown.src = "arrowup_sm.png";
        scope.view.flxBillTypeDropdownImage.onClick = scope.onActionClickFilterSegment.bind(this, "segBillType", "imgBillTypeDropdown");
        scope.view.flxTimePeriodDropdownImage.onClick = scope.onActionClickFilterSegment.bind(this, "segTimePeriods", "imgTimePeriodDropdown");
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setFilterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : onActionClickFilterSegment
         * This method handles expand collapse of filter dropdowns
         * @return : NA
         */
    onActionClickFilterSegment: function (segmentName, imageName) {
      var scope = this;
      try {
        if (scope.view[imageName].src === "arrowup_sm.png") {
          scope.view[segmentName].setVisibility(false);
          if (segmentName === "segLCAccountType") {
            scope.view.flxLCTypeHeadingSeparator.setVisibility(false);
          }
          if (segmentName === "segBillType") {
            scope.view.flxBillTypeHeadingSeparartor.setVisibility(false);
          }
          if (segmentName === "segLCStatusType") {
            scope.view.flxStatusTypeHeadingSeparator.setVisibility(false);
          }
          if (segmentName === "segTimePeriods") {
            scope.view.flxLCTimePeriodHeadingSeparator.setVisibility(false);
            scope.view.flxBottomSeparator.setVisibility(true);
          }
          scope.view[imageName].src = "arrowdown_sm.png";
        } else {
          scope.view[segmentName].setVisibility(true);
          if (segmentName === "segLCAccountType") {
            scope.view.flxLCTypeHeadingSeparator.setVisibility(true);
          }
          if (segmentName === "segLCStatusType") {
            scope.view.flxStatusTypeHeadingSeparator.setVisibility(true);
          }
          if (segmentName === "segBillType") {
            scope.view.flxBillTypeHeadingSeparartor.setVisibility(true);
          }
          if (segmentName === "segTimePeriods") {
            scope.view.flxLCTimePeriodHeadingSeparator.setVisibility(true);
            scope.view.flxBottomSeparator.setVisibility(false);
          }
          scope.view[imageName].src = "arrowup_sm.png";
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "onActionClickFilterSegment",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },
    /**
         * @api : setViewActions
         * Set the default actions for component
         * @return : NA
         */
    setViewActions: function () {
      var scope = this;
      try {
        var imageName = "";
        if (scope.currentTab === GUARANTEES_TAB) {
          imageName = "flxColumn";
        } else if (scope.currentTab === AMENDMENTS_TAB) {
          imageName = "flxAmendmentsColumn";
        } else if (scope.currentTab === CLAIMS_TAB) {
          imageName = "flxClaimsColumn";
        }
        scope.view[imageName + 1].onClick = scope.sortRecords.bind(this, 1);
        scope.view[imageName + 2].onClick = scope.sortRecords.bind(this, 2);
        scope.view[imageName + 3].onClick = scope.sortRecords.bind(this, 3);
        scope.view[imageName + 4].onClick = scope.sortRecords.bind(this, 4);
        scope.view[imageName + 5].onClick = scope.sortRecords.bind(this, 5);
        scope.view[imageName + 6].onClick = scope.sortRecords.bind(this, 6);
        scope.view[imageName + 7].onClick = scope.sortRecords.bind(this, 7);
        scope.selectedTab = 1;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setViewActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : setDefaultSort
         * Method to set default sort icon image
         * @return : NA
         */
    setDefaultSort: function (widget) {
      var scope = this;
      try {
        for (const key in sortField) {
          scope.view[key].src = "sortingfinal_1.png";
        }
        scope.view[widget].src = "sorting_next.png";
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setDefaultSort",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : sortRecords
         * Update sort icons and trigger a action to business controller to sort
         * @return : NA
         */
    sortRecords: function (columnNo) {
      var scope = this;
      try {
        var sortType = "";
        scope.serviceParameters.filterByParam = "";
        scope.serviceParameters.filterByValue = "";
        scope.sortApplied = true;
        var imageName = "";
        if (scope.currentTab === GUARANTEES_TAB) {
          imageName = "imgCoulmnTab";
        } else if (scope.currentTab === AMENDMENTS_TAB) {
          imageName = "imgColumnAmendmentsTab";
        } else if (scope.currentTab === CLAIMS_TAB) {
          imageName = "imgColumnClaimsTab";
        }
        var field = sortField[imageName + columnNo];
        if (columnNo === 4 && scope.currentTab === GUARANTEES_TAB) {
          field = "guaranteesReferenceNo";
        }
        if (scope.view[imageName + columnNo].src === "sortingfinal.png") {
          scope.view[imageName + columnNo].src = "sorting_previous.png";
          sortType = "ASC";
        } else if (scope.view[imageName + columnNo].src === "sorting_previous.png") {
          scope.view[imageName + columnNo].src = "sorting_next.png";
          sortType = "DESC";
        } else {
          scope.view[imageName + columnNo].src = "sorting_previous.png";
          sortType = "ASC";
        }
        for (var i = 1; i <= 7; i++) {
          if (i !== columnNo) {
            scope.view[imageName + i].src = "sortingfinal.png";
          }
        }
        scope.serviceParameters.sortByParam = field;
        scope.serviceParameters.sortOrder = sortType;
        scope.fetchDashboardData("sort");
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "sortRecords",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : setSegmentWidgetDataMap
         * This method will set the widget data map for segImportLCList segment
         * @return : NA
         */
    setSegmentWidgetDataMap: function () {
      var scope = this;
      try {
        if (scope.currentTab === CLAIMS_TAB) {
          this.view.segTransactionList.widgetDataMap = {
            "btnAction": "btnAction",
            "btnAction1": "btnAction1",
            "btnAction2": "btnAction2",
            "btnAction3": "btnAction3",
            "flxAction": "flxAction",
            "flxDropdown": "flxDropdown",
            "flxIdentifier": "flxIdentifier",
            "flxReceivedClaimsList1": "flxReceivedClaimsList1",
            "flxReceivedClaimsList2": "flxReceivedClaimsList2",
            "lblColumn1": "lblColumn1",
            "lblColumn2": "lblColumn2",
            "lblColumn3": "lblColumn3",
            "lblColumn4": "lblColumn4",
            "lblColumn5": "lblColumn5",
            "lblDropdown": "lblDropdown",
            "lblIdentifier": "lblIdentifier",
            "lblRowColumn1Key": "lblRowColumn1Key",
            "lblRowColumn1Value": "lblRowColumn1Value",
            "lblRowColumn2Key": "lblRowColumn2Key",
            "lblRowColumn2Value": "lblRowColumn2Value",
            "lblRowColumn3Key": "lblRowColumn3Key",
            "lblRowColumn3Value": "lblRowColumn3Value",
            "lblRowColumn4Key": "lblRowColumn4Key",
            "lblRowColumn4Value": "lblRowColumn4Value",
            "lblRow2Column1Key": "lblRow2Column1Key",
            "lblRow2Column1Value": "lblRow2Column1Value",
            "lblRow2Column2Key": "lblRow2Column2Key",
            "lblRow2Column2Value": "lblRow2Column2Value",
            "lblRow2Column3Key": "lblRow2Column3Key",
            "lblRow2Column3Value": "lblRow2Column3Value",
            "flxColumn3": "flxColumn3",
            "flxColumn5": "flxColumn5"
          };
        } else {
          this.view.segTransactionList.widgetDataMap = {
            "flxDropDown": "flxDropDown",
            "imgDropdown": "imgDropdown",
            "lblCoulmnTabValue1": "lblCoulmnTabValue1",
            "lblCoulmnTabValue2": "lblCoulmnTabValue2",
            "lblCoulmnTabValue3": "lblCoulmnTabValue3",
            "lblCoulmnTabValue4": "lblCoulmnTabValue4",
            "lblCoulmnTabValue5": "lblCoulmnTabValue5",
            "lblCoulmnTabValue6": "lblCoulmnTabValue6",
            "btnAction": "btnAction",
            "lblLCData1": "lblLCData1",
            "lblLCDataValue1": "lblLCDataValue1",
            "lblLCData2": "lblLCData2",
            "lblLCDataValue2": "lblLCDataValue2",
            "lblLCData3": "lblLCData3",
            "lblLCDataValue3": "lblLCDataValue3",
            "lblLCData4": "lblLCData4",
            "lblLCDataValue4": "lblLCDataValue4",
            "lblLCData5": "lblLCData5",
            "lblLCDataValue5": "lblLCDataValue5",
            "lblLCData6": "lblLCData6",
            "lblLCDataValue6": "lblLCDataValue6",
            "lblLCData7": "lblLCData7",
            "lblLCDataValue7": "lblLCDataValue7",
            "lblLCData8": "lblLCData8",
            "lblLCDataValue8": "lblLCDataValue8",
            "lblLCData9": "lblLCData9",
            "lblLCDataValue9": "lblLCDataValue9",
            "lblLCData10": "lblLCData10",
            "lblLCDataValue10": "lblLCDataValue10",
            "lblLCData11": "lblLCData11",
            "lblLCDataValue11": "lblLCDataValue11",
            "lblLCData12": "lblLCData12",
            "lblLCDataValue12": "lblLCDataValue12",
            "btnViewDetails": "btnViewDetails",
            "btnCreateNewLC": "btnCreateNewLC",
            "btnDownload": "btnDownload",
            "btnPrint": "btnPrint",
            "flxLCRowData8": "flxLCRowData8",
            "flxLCRowData7": "flxLCRowData7",
            "flxActionTab": "flxActionTab",
            "flxLCRowData12": "flxLCRowData12",
            "flxColumn3": "flxColumn3",
            "flxColumn4": "flxColumn4",
            "flxColumn6": "flxColumn6",
            "flxLCRowDetails2": "flxLCRowDetails2",
            "flxLCRowDetails3": "flxLCRowDetails3",
            "flxColumn2": "flxColumn2",
            "flxLCRowData8": "flxLCRowData8",
            "flxLCRowData7": "flxLCRowData7",
            "flxLCRowData3": "flxLCRowData3",
            "flxLCRowData6": "flxLCRowData6",
            "flxLCRowData4": "flxLCRowData4",
            "flxLCRowData2": "flxLCRowData2",
            "flxLCRowData5": "flxLCRowData5",
            "flxLCRowData12": "flxLCRowData12",
            "flxLCRowData11": "flxLCRowData11",
            "flxLCRowData10": "flxLCRowData10",
            "flxLCRowData9": "flxLCRowData9",
            "flxLCRowDetails": "flxLCRowDetails",
            "flxLCRowDetails2": "flxLCRowDetails2",
            "flxLCRowDetails1": "flxLCRowDetails1",
            "flxLCTransactionListRow": "flxLCTransactionListRow",
            "flxTopSeperator": "flxTopSeperator"
          };
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setSegmentWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
         * @api : setDashboardData
         * This method will invoked to set dashboard data 
         * @return : NA
         */
    setDashboardData: function () {
      var scope = this;
      try {
        scope.previousIndex = undefined;
        if (scope.guaranteesLCDetails && scope.guaranteesLCDetails.length > 0) {
          scope.view.segTransactionList.setVisibility(true);
          scope.view.flxNoTransactions.setVisibility(false);
          scope.view.flxPagination.setVisibility(true);
          scope.view.flxVerticalEllipsis.setVisibility(true);
        } else {
          scope.view.segTransactionList.setVisibility(false);
          scope.view.flxNoTransactions.setVisibility(true);
          scope.view.flxPagination.setVisibility(false);
          scope.view.flxVerticalEllipsis.setVisibility(false);
          return;
        }
        const offset = scope.view.PaginationContainer.getPageOffset();
        if (offset === 0) {
          scope.view.flxPagination.PaginationContainer.imgPaginationPrevious.src = "pagination_back_inactive.png";
        } else {
          scope.view.flxPagination.PaginationContainer.imgPaginationPrevious.src = "pagination_back_blue.png";
        }
        if (scope.guaranteesLCDetails.length > 10) {
          scope.view.flxPagination.PaginationContainer.imgPaginationNext.src = "pagination_next_active_container.png";
        } else {
          scope.view.flxPagination.PaginationContainer.imgPaginationNext.src = "pagination_next_inactive.png";
        }
        scope.view.flxPagination.PaginationContainer.imgPaginationNext.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
        scope.view.flxPagination.PaginationContainer.imgPaginationPrevious.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segTransactionList.rowTemplate = rowTemplate.row;
        const segData = scope.getSegmentData(scope.guaranteesLCDetails.slice(0, 10));
        scope.view.segTransactionList.setData(segData);
        scope.hideFilterDropDown();
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setDashboardData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : getSegmentData
         * This method will set listing data in dashboard
         * @return : NA
         */
    getSegmentData: function (ExportLCData) {
      var scope = this;
      try {
        scope.setSegmentWidgetDataMap();
        var breakpoint = kony.application.getCurrentBreakpoint();
        var formatUtilManager = applicationManager.getFormatUtilManager();
        let template = "",
          segData = [];
        if (breakpoint === 1024) {
          scope.view.flxColumn4.setVisibility(false);
          scope.view.flxColumn5.setVisibility(false);
          scope.view.flxColumn2.left = "23.5%";
          scope.view.flxColumn2.width = "16%";
          scope.view.flxColumn3.left = "44.5%";
          scope.view.flxColumn6.left = "62%";
          scope.view.flxSegLCHeader.forceLayout();
          if (scope.currentTab === CLAIMS_TAB) {
            scope.view.flxClaimsColumn3.setVisibility(false);
            scope.view.flxClaimsColumn4.setVisibility(false);
            scope.view.flxClaimsColumn6.width = "14.5%";
            if (breakpoint > 1024) {
              scope.view.flxClaimsColumn2.left = "10.5%";
              scope.view.flxClaimsColumn5.left = "9%";
              scope.view.flxClaimsColumn6.right = "20px";
              scope.view.imgColumnClaimsTab2.setVisibility(true);
              scope.view.imgColumnClaimsTab5.setVisibility(true);
            }
            scope.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected2";
            scope.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
            scope.view.flxListingDetails.top = "20px";
            scope.view.flxSegHeaderClaims.forceLayout();
            template = "flxReceivedClaimsList2";
            for (const record of ExportLCData) {
              segData.push(Object.assign(record, {
                "lblDropdown": "O",
                "flxReceivedClaimsList2": {
                  "height": "50dp",
                  "skin": "sknflxffffffnoborder"
                },
                "lblIdentifier": {
                  "skin": "sknffffff15pxolbfonticons"
                },
                "flxIdentifier": {
                  "skin": "sknFlxIdentifier"
                },
                "flxDropdown": {
                  "onClick": scope.handleSegmentRowView.bind(this)
                },
                "flxColumn3": {
                  "left": "0%",
                  "height": "95%"
                },
                "lblColumn1": record.beneficiaryName || NA,
                "lblColumn2": record.productType || NA,
                "lblColumn3": {
                  text: record.claimStatus || NA,
                  width: "100%"
                },
                "template": template,
                "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.ReceivedOn"),
                "lblRowColumn2Key": "Claim Amount",
                "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"),
                "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc"),
                "lblRow2Column2Key": kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate"),
                "lblRow2Column3Key": (record.claimType === "Demand") ? kony.i18n.getLocalizedString("i18n.TradeFinance.demandType") : kony.i18n.getLocalizedString("i18n.TradeFinance.DocumentStatus"),
                "lblRowColumn1Value": record.receivedOn ? formatUtilManager.getFormattedCalendarDate(record.receivedOn) : NA,
                "lblRowColumn2Value": (record.claimCurrency && record.claimAmount) ? `${record.claimCurrency} ${formatUtilManager.formatAmount(record.claimAmount)}` : NA,
                "lblRowColumn3Value": record.guaranteesSRMSId || NA,
                "lblRow2Column1Value": record.guaranteeAndSBLCType || NA,
                "lblRow2Column3Value": (record.claimType === "Demand") ? (record.demandType || NA) : (record.documentStatus || NA),
                "lblRow2Column2Value": record.expiryDate ? formatUtilManager.getFormattedCalendarDate(record.expiryDate) : NA,
                "btnAction": {
                  "text": kony.i18n.getLocalizedString('i18n.common.ViewDetails'),
                  "toolTip": kony.i18n.getLocalizedString('i18n.common.ViewDetails'),
                  "onClick": function () {
                    scope.guaranteesPresenter.showGuaranteesScreen({
                      context: 'viewClaimDetails',
                      form: scope.view.id,
                      data: record
                    });
                  }
                },
                "btnAction1": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.guaranteesPresenter.generateReceivedClaimReport(record);
                  }
                },
                "btnAction2": {
                  "isVisible": false
                }
              }));
            }
          } else if (scope.currentTab === AMENDMENTS_TAB) {
            this.view.flxListingDetails.top = "20px";
            scope.view.flxSegHeaderAmendments.setVisibility(true);
            scope.view.flxAmendmentsColumn2.setVisibility(false);
            scope.view.flxAmendmentsColumn4.setVisibility(false);
            scope.view.flxAmendmentsColumn3.left = "30%";
            scope.view.flxAmendmentsColumn6.left = "56%";
            template = "flxLCAmendmentsCollapseTablet";
            for (const record of ExportLCData) {
              segData.push(Object.assign(record, {
                "imgDropdown": "arrow_down.png",
                "flxDropDown": {
                  "onClick": scope.onSegmentRowToggle.bind(this)
                },
                "lblCoulmnTabValue1": record.benificiaryName ? record.benificiaryName : NA,
                "lblCoulmnTabValue2": record.amendmentNo ? record.amendmentNo : NA,
                "lblCoulmnTabValue3": record.guaranteesReference ? record.guaranteesReference : NA,
                "lblCoulmnTabValue5": record.issueDate ? formatUtilManager.getFormattedCalendarDate(record.issueDate) : NA,
                "lblCoulmnTabValue6": record.amendStatus ? record.amendStatus : NA,
                "template": template,
                "flxLCTransactionListRow": {
                  "skin": "slFboxffffff"
                },
                "flxTopSeperator": {
                  "isVisible": true
                },
                "lblCoulmnTabValue2": {
                  "isVisible": false
                },
                "lblCoulmnTabValue3": {
                  "left": "30%"
                },
                "lblCoulmnTabValue4": {
                  "text": record.amendStatus ? record.amendStatus : NA,
                  "left": "56%"
                },
                "flxLCRowData2": {
                  "left": "35.8%"
                },
                "flxLCRowData4": {
                  "left": "68%"
                },
                "flxLCRowData7": {
                  "left": "68%"
                },
                "flxLCRowData6": {
                  "isVisible": true,
                  "left": "35.8%"
                },
                "flxLCRowData8": {
                  "left": "68%"
                },
                "flxLCRowDetails2": {
                  "isVisible": true,
                },
                "flxLCRowDetails3": {
                  "isVisible": true,
                  "bottom": "30dp"
                },
                "flxLCRowData11": {
                  "isVisible": record.cancellationStatus ? true : false,
                  "left": "67.5%"
                },
                "flxLCRowData12": {
                  "isVisible": false
                },
                "flxLCRowData10": {
                  "left": "35.8%"
                },
                "flxLCRowDetails": {
                  "height": "280dp"
                },
                "lblLCData1": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNo"),
                "lblLCData2": kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"),
                "lblLCData4": kony.i18n.getLocalizedString("i18n.TradeFinance.productType"),
                "lblLCData5": "GT & SBLC Type",
                "lblLCData6": kony.i18n.getLocalizedString("kony.mb.common.Amount"),
                "lblLCData7": {
                  "text": kony.i18n.getLocalizedString("i18n.TradeFinance.amdEffectiveDate"),
                  "width": "125dp"
                },
                "lblLCData9": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType"),
                "lblLCData10": {
                  "text": kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty"),
                  "width": "120dp"
                },
                "lblLCData11": kony.i18n.getLocalizedString("i18n.TradeFinance.CancellationStatus"),
                "lblLCDataValue1": record.amendmentNo ? record.amendmentNo : NA,
                "lblLCDataValue2": {
                  text: record.amendmentSRMSRequestId ? record.amendmentSRMSRequestId : NA,
                  width: "120dp"
                },
                "lblLCDataValue3": record.guaranteesReference ? record.guaranteesReference : NA,
                "lblLCDataValue4": record.productType ? record.productType : NA,
                "lblLCDataValue5": {
                  "text": record.billType ? record.billType : NA,
                  "skin": "bbSknLbl424242SSP15Px"
                },
                "lblLCDataValue6": record.amount ? formatUtil.formatAmountandAppendCurrencySymbol(record.amount, record.amendCurrency) : NA,
                "lblLCDataValue7": record.amendmentEffectiveDate ? formatUtilManager.getFormattedCalendarDate(record.amendmentEffectiveDate) : NA,
                "lblLCDataValue8": record.amendmentEffectiveDate ? formatUtilManager.getFormattedCalendarDate(record.amendmentEffectiveDate) : NA,
                "lblLCDataValue9": record.expiryType ? record.expiryType : NA,
                "lblLCDataValue10": {
                  "text": record.instructingParty ? record.instructingParty : NA,
                  "width": "120dp",
                  "height": "40dp"
                },
                "lblLCDataValue11": record.cancellationStatus ? record.cancellationStatus : NA,
                "flxColumn4": {
                  "left": "34%",
                  "width": "39%"
                },
                "flxColumn3": {
                  "left": 25.5 + "%",
                  "width": 15 + "%"
                },
                "flxLCRowData3": {
                  "isVisible": false
                },
                "flxLCRowData8": {
                  "isVisible": false
                },
                "flxColumn2": {
                  "isVisible": false
                },
                "btnDownload": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.guaranteesPresenter.generateGuaranteesAmendments({
                      "amendmentSRMSRequestId": record.amendmentSRMSRequestId
                    });
                  }
                },
                "btnPrint": {
                  "isVisible": false
                },
                "btnAction": {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    onClickViewAmendments = true;
                    scope.guaranteesPresenter.getGuaranteeAmendmentsById({
                      "amendmentSRMSRequestId": record.amendmentSRMSRequestId
                    }, "frmGuaranteesLCDashboard");
                    currentGuaranteesSRMSId = record.guaranteesSRMSId;
                  }
                }
              }))
            }
          } else if (scope.currentTab === GUARANTEES_TAB) {
            this.view.flxListingDetails.top = "20px";
            template = "flxLCTransactionListCollapseTablet";
            for (const record of ExportLCData) {
              segData.push(Object.assign(record, {
                "imgDropdown": "arrow_down.png",
                "flxDropDown": {
                  "onClick": scope.onSegmentRowToggle.bind(this)
                },
                "lblCoulmnTabValue1": record.beneficiaryName || NA,
                "lblCoulmnTabValue2": record.relatedTransactionReference || record.guaranteesSRMSId || NA,
                "lblCoulmnTabValue3": record.createdOn ? scope.guaranteesPresenter.formatUtilManager.getFormattedCalendarDate(record.createdOn) : NA,
                "lblCoulmnTabValue6": record.status ? record.status : NA,
                "template": template,
                "lblLCData1": kony.i18n.getLocalizedString("i18n.TradeFinance.productType"),
                "lblLCData2": "GT & SBLC Type",
                "lblLCData3": kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate"),
                "lblLCData4": {
                  "isVisible": false
                },
                "lblLCData5": kony.i18n.getLocalizedString("kony.mb.common.Amount"),
                "lblLCData6": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType"),
                "lblLCData7": kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate"),
                "lblLCData9": {
                  "text": kony.i18n.getLocalizedString("i18n.TradeFinance.modeOfTransaction"),
                  "width": "128px"
                },
                "lblLCData10": kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingBank"),
                "lblLCData11": {
                  "text": kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty"),
                  "width": "125px"
                },
                "lblLCDataValue1": record.productType ? record.productType : NA,
                "lblLCDataValue2": record.guaranteeAndSBLCType ? record.guaranteeAndSBLCType : NA,
                "lblLCDataValue3": record.issueDate ? record.issueDate : NA,
                "lblLCDataValue4": {
                  "isVisible": false
                },
                "lblLCDataValue5": record.amount ? formatUtil.formatAmountandAppendCurrencySymbol(record.amount, record.currency) : NA,
                "lblLCDataValue6": {
                  "text": record.expiryType ? record.expiryType : NA,
                  "toolTip": record.expiryType ? record.expiryType : NA
                },
                "lblLCDataValue7": record.expiryDate ? record.expiryDate : NA,
                "lblLCDataValue9": record.modeOfTransaction ? record.modeOfTransaction : NA,
                "lblLCDataValue10": record.bankName ? record.bankName : NA,
                "lblLCDataValue11": {
                  "text": record.instructingParty ? (typeof (record.instructingParty) === "string" ? record.instructingParty : JSON.parse(record.instructingParty.replace(/\'/g, "\"")).contractId) : NA,
                  "width": "200px"
                },
                "flxLCRowData12": {
                  "isVisible": false
                },
                "flxColumn6": {
                  "width": "21%"
                },
                "flxLCRowData4": {
                  "isVisible": false
                },
                "btnCreateNewLC": {
                  "isVisible": false
                },
                "flxLCRowData8": {
                  "isVisible": false
                },
                "flxLCRowDetails2": {
                  top: "0dp"
                },
                "flxLCRowData7": {
                  "isVisible": true
                },
                "btnPrint": {
                  "isVisible": false
                },
                "btnDownload": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.guaranteesPresenter.generateGuaranteesLC({
                      "guaranteesSRMSId": record.guaranteesSRMSId
                    });
                  }
                },
                "btnAction": {
                  "text": record.status === "Draft" ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": record.status === "Draft" ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    scope.navigateLCView(record);
                  }
                }
              }));
            }
          }
        } else {
          scope.view.flxColumn4.setVisibility(true);
          scope.view.flxColumn5.setVisibility(true);
          if (scope.currentTab === CLAIMS_TAB) {
            scope.view.flxClaimsColumn3.setVisibility(true);
            scope.view.flxClaimsColumn4.setVisibility(true);
            scope.view.flxClaimsColumn2.left = "0%";
            scope.view.flxClaimsColumn5.left = "0%";
            scope.view.flxClaimsColumn6.left = "0%";
            scope.view.flxSegHeaderClaims.forceLayout();
            template = "flxReceivedClaimsList1";
            for (const record of ExportLCData) {
              segData.push(Object.assign(record, {
                "lblDropdown": "O",
                "flxReceivedClaimsList1": {
                  "height": "50dp",
                  "skin": "sknflxffffffnoborder"
                },
                "lblIdentifier": {
                  "skin": "sknffffff15pxolbfonticons"
                },
                "flxIdentifier": {
                  "skin": "sknFlxIdentifier"
                },
                "flxDropdown": {
                  "onClick": scope.handleSegmentRowView.bind(this)
                },
                "flxColumn5": {
                  "left": "0%",
                  "height": "95%"
                },
                "lblColumn1": record.beneficiaryName || NA,
                "lblColumn2": record.productType || NA,
                "lblColumn3": (record.claimCurrency && record.claimAmount) ? `${record.claimCurrency} ${formatUtilManager.formatAmount(record.claimAmount)}` : NA,
                "lblColumn4": record.receivedOn ? formatUtilManager.getFormattedCalendarDate(record.receivedOn) : NA,
                "lblColumn5": {
                  "text": record.claimStatus || NA,
                  "width": "100%"
                },
                "template": template,
                "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"),
                "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc"),
                "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate"),
                "lblRowColumn4Key": kony.i18n.getLocalizedString("i18n.TradeFinance.claimType"),
                "lblRow2Column2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingBank"),
                "lblRow2Column1Key": (record.claimType === "Demand") ? kony.i18n.getLocalizedString("i18n.TradeFinance.demandType") : kony.i18n.getLocalizedString("i18n.TradeFinance.DocumentStatus"),
                "lblRowColumn1Value": record.guaranteesSRMSId || NA,
                "lblRowColumn2Value": record.guaranteeAndSBLCType || NA,
                "lblRowColumn3Value": record.expiryDate ? formatUtilManager.getFormattedCalendarDate(record.expiryDate) : NA,
                "lblRowColumn4Value": record.claimType || NA,
                "lblRow2Column2Value": record.advisingBank || NA,
                "lblRow2Column1Value": (record.claimType === "Demand") ? (record.demandType || NA) : (record.documentStatus || NA),
                "btnAction": {
                  "text": kony.i18n.getLocalizedString('i18n.common.ViewDetails'),
                  "toolTip": kony.i18n.getLocalizedString('i18n.common.ViewDetails'),
                  "onClick": function () {
                    scope.guaranteesPresenter.showGuaranteesScreen({
                      context: 'viewClaimDetails',
                      form: scope.view.id,
                      data: record
                    });
                  }
                },
                "btnAction1": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.guaranteesPresenter.generateReceivedClaimReport(record);
                  }
                },
                "btnAction2": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    scope.guaranteesPresenter.showGuaranteesScreen({
                      context: 'printClaim',
                      form: scope.view.id,
                      data: record
                    });
                  }
                }
              }))
            }
          } else if (scope.currentTab === AMENDMENTS_TAB) {
            template = "flxLCAmendmentsCollapse";
            for (const record of ExportLCData) {
              segData.push(Object.assign(record, {
                "imgDropdown": "arrow_down.png",
                "flxDropDown": {
                  "onClick": scope.onSegmentRowToggle.bind(this)
                },
                "lblCoulmnTabValue1": record.benificiaryName ? record.benificiaryName : NA,
                "lblCoulmnTabValue2": record.amendmentNo ? record.amendmentNo : NA,
                "lblCoulmnTabValue3": record.guaranteesSRMSId ? record.guaranteesSRMSId : NA,
                "lblCoulmnTabValue4": record.amendRequestedDate ? formatUtilManager.getFormattedCalendarDate(record.amendRequestedDate) : NA,
                "lblCoulmnTabValue5": record.issueDate ? formatUtilManager.getFormattedCalendarDate(record.issueDate) : NA,
                "lblCoulmnTabValue6": record.amendStatus ? record.amendStatus : NA,
                "template": template,
                "lblLCData1": kony.i18n.getLocalizedString("i18n.TradeFinance.productType"),
                "lblLCData2": "GT & SBLC Type",
                "lblLCData3": kony.i18n.getLocalizedString("kony.mb.common.Amount"),
                "lblLCData4": kony.i18n.getLocalizedString("i18n.TradeFinance.amdEffectiveDate"),
                "lblLCData5": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType"),
                "lblLCData6": kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty"),
                "lblLCData7": kony.i18n.getLocalizedString("i18n.TradeFinance.CancellationStatus"),
                "lblLCDataValue1": record.productType ? record.productType : NA,
                "lblLCDataValue2": record.billType ? record.billType : NA,
                "lblLCDataValue3": record.amount ? formatUtil.formatAmountandAppendCurrencySymbol(record.amount, record.currency) : NA,
                "lblLCDataValue4": record.amendmentEffectiveDate ? formatUtilManager.getFormattedCalendarDate(record.amendmentEffectiveDate) : NA,
                "lblLCDataValue5": record.expiryType ? record.expiryType : NA,
                "lblLCDataValue6": {
                  "text": record.instructingParty ? record.instructingParty : NA,
                  "height": "50dp"
                },
                "lblLCDataValue7": record.cancellationStatus ? record.cancellationStatus : NA,
                "flxLCRowDetails": {
                  "height": "170dp"
                },
                "flxLCRowDetails2": {
                  "isVisible": true
                },
                "flxLCRowData4": {
                  "isVisible": true
                },
                "flxLCRowData6": {
                  "isVisible": true,
                  "width": "25%"
                },
                "flxLCRowDetails2": {
                  "isVisible": true
                },
                "flxLCRowData8": {
                  "isVisible": false
                },
                "flxLCRowData7": {
                  "isVisible": record.cancellationStatus ? true : false,
                  "left": "55.5%"
                },
                "btnDownload": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.guaranteesPresenter.generateGuaranteesAmendments({
                      "amendmentSRMSRequestId": record.amendmentSRMSRequestId
                    });
                  }
                },
                "btnAction": {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    onClickViewAmendments = true;
                    scope.guaranteesPresenter.getGuaranteeAmendmentsById({
                      "amendmentSRMSRequestId": record.amendmentSRMSRequestId
                    }, "frmGuaranteesLCDashboard");
                    currentGuaranteesSRMSId = record.guaranteesSRMSId;
                  }
                },
                "btnPrint": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    let dataObj = {
                      navData: record,
                      previousFormName: 'frmGuaranteesLCDashboard'
                    };
                    new kony.mvc.Navigation({
                      "appName": "TradeFinanceMA",
                      "friendlyName": "GuaranteesUIModule/frmPrintAmendments"
                    }).navigate(dataObj);
                  }
                }
              }))
            }
          } else if (scope.currentTab === GUARANTEES_TAB) {
            template = "flxLCTransactionListCollapse";
            for (const record of ExportLCData) {
              segData.push(Object.assign(record, {
                "imgDropdown": "arrow_down.png",
                "flxDropDown": {
                  "onClick": scope.onSegmentRowToggle.bind(this)
                },
                "lblCoulmnTabValue1": record.beneficiaryName ? record.beneficiaryName : NA,
                "lblCoulmnTabValue2": record.productType ? record.productType : NA,
                "lblCoulmnTabValue3": record.guaranteeAndSBLCType ? record.guaranteeAndSBLCType : NA,
                "lblCoulmnTabValue4": {
                  "text": record.relatedTransactionReference || record.guaranteesSRMSId || NA,
                  "width": "100%",
                  "left": "0%"
                },
                "lblCoulmnTabValue5": record.createdOn ? scope.guaranteesPresenter.formatUtilManager.getFormattedCalendarDate(record.createdOn) : NA,
                "lblCoulmnTabValue6": record.status ? record.status : NA,
                "template": template,
                "lblLCData1": kony.i18n.getLocalizedString("kony.mb.common.Amount"),
                "lblLCData2": kony.i18n.getLocalizedString("kony.mb.CM.issueDate"),
                "lblLCData3": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType"),
                "lblLCData4": "Expiry date/Condition",
                "lblLCData5": kony.i18n.getLocalizedString("i18n.TradeFinance.modeOfTransaction"),
                "lblLCData6": kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingBank"),
                "lblLCData7": kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty"),
                "lblLCDataValue1": record.amount ? formatUtil.formatAmountandAppendCurrencySymbol(record.amount, record.currency) : NA,
                "lblLCDataValue2": record.issueDate ? record.issueDate : NA,
                "lblLCDataValue3": record.expiryType ? record.expiryType : NA,
                "lblLCDataValue4": record.extendExpiryDate ? record.extendExpiryDate : NA,
                "lblLCDataValue5": record.modeOfTransaction ? record.modeOfTransaction : NA,
                "lblLCDataValue6": {
                  "text": record.bankName ? record.bankName : NA,
                  "toolTip": record.bankName ? record.bankName : NA
                },
                "lblLCDataValue7": record.instructingParty ? (typeof (record.instructingParty) === "string" ? record.instructingParty : JSON.parse(record.instructingParty.replace(/\'/g, "\"")).contractId) : NA,
                "flxLCRowData4": {
                  "isVisible": false
                },
                "flxLCRowData7": {
                  "width": "20%"
                },
                "flxColumn4": {
                  "width": "11%"
                },
                "btnCreateNewLC": {
                  "isVisible": false
                },
                "flxLCRowData5": {
                  "width": "20%"
                },
                "flxLCRowData8": {
                  "isVisible": false
                },
                "flxActionTab": {
                  "width": 14 + "%"
                },
                "flxLCRowDetails2": {
                  "top": "0dp"
                },
                "btnDownload": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.guaranteesPresenter.generateGuaranteesLC({
                      "guaranteesSRMSId": record.guaranteesSRMSId
                    });
                  }
                },
                "btnAction": {
                  "text": record.status === "Draft" ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": record.status === "Draft" ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    scope.navigateLCView(record);
                  }
                },
                "btnPrint": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    let formNameForPrint;
                    let dataObj = {
                      navData: record,
                      previousFormName: 'frmGuaranteesLCDashboard'
                    };
                    if (scope_configManager.swiftEnabled === 'True' && record.status === OLBConstants.GUARANTEE_LC_STATUS.APPROVED) {
                      formNameForPrint = 'frmPrintSwiftGuaranteeStandbyLC';
                    } else {
                      formNameForPrint = 'frmPrintGuaranteeStandbyLC';
                    }
                    new kony.mvc.Navigation({
                      "appName": "TradeFinanceMA",
                      "friendlyName": `GuaranteesUIModule/${formNameForPrint}`
                    }).navigate(dataObj);
                  }
                }
              }));
            }
          }
        }
        return segData;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "getSegmentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * Method to toggle the segment row view
         * @param {Number} index - index of segment row to toggle
         * @param {Array} viewData - data which need to be assigned to toggled view
         */
    toggleSegmentRowView: function (index, viewData) {
      try {
        let data = this.view.segTransactionList.data[index];
        const template = data.template;
        data.lblDropdown = viewData[0];
        data.flxIdentifier.isVisible = viewData[1];
        data.flxIdentifier.skin = viewData[2];
        data.lblIdentifier.skin = viewData[3];
        data[template].height = viewData[4];
        data[template].skin = viewData[5];
        this.view.segTransactionList.setDataAt(data, index);
      } catch (err) {
        const errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "toggleSegmentRowView",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
         * @api : navigateLCView
         * This method navigates screen to Create Guarantee flow or View Details based on the status.
         * @return : NA
         */
    navigateLCView: function (data) {
      var scope = this;
      try {
        const navManager = applicationManager.getNavigationManager();
        if (data.status === "Draft") {
          this.guaranteesPresenter.showGuaranteesScreen({
            context: 'createGuarantee',
            data: data
          });
        } else {
          navToLCDetails = true;
          this.guaranteesPresenter.getGuaranteeById({
            "guaranteesSRMSId": data.guaranteesSRMSId
          }, "frmGuaranteesLCDashboard");
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "navigateLCView",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : downloadXLSXFile
         * downloads records in XLSX File for the current tab records.
         * @return : NA
         */
    downloadXLSXFile: function () {
      var scope = this;
      try {
        scope.serviceParameters.pageOffset = "";
        scope.serviceParameters.pageSize = "";
        if (downloadXLSXData.hasOwnProperty("sortByParam")) scope.serviceParameters = downloadXLSXData;
        if (this.currentTab === GUARANTEES_TAB) {
          scope.serviceParameters.sortByParam = "serviceRequestTime";
          this.guaranteesPresenter.generateGuaranteesList(scope.serviceParameters, "frmGuaranteesLCDashboard");
        } else if (this.currentTab === AMENDMENTS_TAB) {
          scope.serviceParameters.sortByParam = "amendRequestedDate";
          this.guaranteesPresenter.generateGuaranteeAmendmentList(scope.serviceParameters, "frmGuaranteesLCDashboard");
        } else if (this.currentTab === CLAIMS_TAB) {
          scope.serviceParameters.sortByParam = "receivedOn";
          this.guaranteesPresenter.generateReceivedClaimsList(scope.serviceParameters, "frmGuaranteesLCDashboard");
        }
        scope.view.flxEllipsisDropDown.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "downloadXLSXFile",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : hideFilterDropDown
         * Hides the filter drop down
         * @return : NA
         */
    hideFilterDropDown: function () {
      var scope = this;
      try {
        if (scope.view.flxListDropdown.isVisible === true) {
          scope.view.flxListDropdown.setVisibility(false);
          scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        }
        if (scope.view.flxEllipsisDropDown.isVisible === true) {
          scope.view.flxEllipsisDropDown.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "hideFilterDropDown",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * Method to handle the segment row view on click of dropdown
         */
    handleSegmentRowView: function () {
      try {
        const rowIndex = this.view.segTransactionList.selectedRowIndex[1];
        const data = this.view.segTransactionList.data;
        const breakpoint = kony.application.getCurrentBreakpoint();
        let expandedHeight;
        if (this.currentTab === CLAIMS_TAB) {
          expandedHeight = breakpoint === 1024 ? "188dp" : "200dp";
        }
        let pre_val;
        let requiredView = [];
        const collapsedView = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", "50dp", "sknflxffffffnoborder"];
        const expandedView = ["P", true, "sknflxBg4a90e2op100NoBorder", "sknSSP4176a415px", expandedHeight, "slFboxBGf8f7f8B0"];
        if (this.previousIndex === rowIndex) {
          requiredView = data[rowIndex].lblDropdown === "P" ? collapsedView : expandedView;
          this.toggleSegmentRowView(rowIndex, requiredView);
        } else {
          if (this.previousIndex >= 0) {
            pre_val = this.previousIndex;
            this.toggleSegmentRowView(pre_val, collapsedView);
          }
          pre_val = rowIndex;
          this.toggleSegmentRowView(rowIndex, expandedView);
        }
        this.previousIndex = rowIndex;
      } catch (err) {
        const errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "handleSegmentRowView",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
         * @api : onSegmentRowToggle
         * This metod will show expand and collapse row to show detailed view
         * @return : NA
         */
    onSegmentRowToggle: function () {
      var scope = this;
      try {
        var index = scope.view.segTransactionList.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = scope.view.segTransactionList.data;
        var rowData = data[rowIndex];
        scope.rowData = rowData;
        var section = data.length;
        var segTemplate = scope.getSegmentTemplate();
        if (data[rowIndex].template !== segTemplate.expanded) {
          if (scope.previousIndex !== null && scope.previousIndex !== undefined && scope.previousIndex !== "") {
            data[scope.previousIndex].template = segTemplate.row;
            data[scope.previousIndex].imgDropdown = {
              image: "arrow_down.png"
            };
            scope.view.segTransactionList.setDataAt(data[scope.previousIndex], scope.previousIndex, sectionIndex);
          }
          data[rowIndex].imgDropdown = {
            image: "chevron_up.png"
          };
          data[rowIndex].template = segTemplate.expanded;
          if (segTemplate.expanded === "flxLCTransactionListExpand" && scope.previousIndex >= 0) {
            data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
            data[scope.previousIndex].lblCoulmnTabValue4.left = "0%";
            scope.view.segTransactionList.setDataAt(data[scope.previousIndex], scope.previousIndex, sectionIndex);
          }
          scope.previousIndex = JSON.parse(JSON.stringify(rowIndex));
          if (segTemplate.expanded === "flxLCAmendmentsExpandTablet") {
            data[rowIndex].flxLCTransactionListRow.skin = "ICSknFlxfbfbfb";
            data[rowIndex].flxTopSeperator.isVisible = false;
          }
          if (segTemplate.expanded === "flxLCTransactionListExpand") {
            data[rowIndex].lblCoulmnTabValue4.width = "113dp";
            data[rowIndex].lblCoulmnTabValue4.left = "48.8%";
            data[rowIndex].flxLCRowData7.width = "50%";
            data[rowIndex].flxLCRowDetails2.top = "0dp";
          }
          scope.view.segTransactionList.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        } else {
          if (segTemplate.row === "flxLCAmendmentsCollapseTablet") {
            data[rowIndex].flxLCTransactionListRow.skin = "slFboxffffff";
            data[rowIndex].flxTopSeperator.isVisible = true;
          }
          if (segTemplate.row === "flxLCTransactionListCollapse") {
            data[rowIndex].lblCoulmnTabValue4.width = "100%";
            data[rowIndex].lblCoulmnTabValue4.left = "0%";
          }
          data[rowIndex].imgDropdown = {
            image: "arrow_down.png"
          };
          data[rowIndex].template = segTemplate.row;
          scope.view.segTransactionList.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        }
        if (scope.view.flxListDropdown.isVisible === true) {
          scope.view.flxListDropDown.setVisibility = false;
        }
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "onSegmentRowToggle",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : setTabNavigation
         * This metod handles tab Navigation
         * @return : NA
         */
    setTabNavigation: function () {
      var scope = this;
      try {
        scope.view.tbxSearch.text = "";
        scope.view.imgClear.setVisibility(false);
        scope.view.segTransactionList.removeAll();
        scope.view.flxPagination.setVisibility(false);
        scope.view.btnTab1.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
        //Setting tab header data
        scope.view.flxSegHeaderAmendments.setVisibility(false);
        scope.view.flxSegLCHeader.setVisibility(true);
        scope.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.guaranteesSearchPlaceholder");
        if (scope.isSearchEnabled === false) {
          scope.view.tbxSearch.text = "";
          scope.view.imgClear.setVisibility(false);
        }
        if (scope.currentTab === GUARANTEES_TAB) {
          scope.view.flxGuaranteesLC.setVisibility(true);
          sortField.imgCoulmnTab3 = "guaranteeAndSBLCType";
          scope.serviceParameters = {
            searchString: "",
            pageSize: "11",
            pageOffset: 0,
            sortByParam: "serviceRequestTime",
            sortOrder: "DESC",
            timeParam: "serviceRequestTime",
            timeValue: "6,MONTH",
            filterByValue: "",
            filterByParam: ""
          };
          scope.switchToLOCTab();
        } else if (scope.currentTab === AMENDMENTS_TAB) {
          scope.view.flxGuaranteesLC.setVisibility(true);
          sortField.imgCoulmnTab3 = "billType";
          scope.serviceParameters = {
            searchString: "",
            pageSize: "11",
            pageOffset: 0,
            sortByParam: "amendRequestedDate",
            sortOrder: "DESC",
            timeParam: "amendRequestedDate",
            timeValue: "6,MONTH",
            filterByValue: "",
            filterByParam: "",
          };
          scope.switchToAmendmentsTab();
        } else if (scope.currentTab === CLAIMS_TAB) {
          scope.serviceParameters = {
            searchString: "",
            pageSize: "11",
            pageOffset: 0,
            sortByParam: "receivedOn",
            sortOrder: "DESC",
            timeParam: "receivedOn",
            timeValue: "6,MONTH",
            filterByValue: "",
            filterByParam: ""
          };
          scope.switchToClaimsTab();
        }
        scope.setFilterUIView();
        scope.setViewActions();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setTabNavigation",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : switchToLOCTab
         * This metod handles functionalities on click of LOC Tab
         * @return : NA
         */
    switchToLOCTab: function () {
      var scope = this;
      try {
        scope.view.lblFilterText.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
        if (scope.guaranteesLCDetails > 0) {
          scope.view.flxVerticalEllipsis.setVisibility(true);
        } else {
          scope.view.flxVerticalEllipsis.setVisibility(false);
        }
        scope.setDefaultSort("imgCoulmnTab5");
        scope.currentTab = GUARANTEES_TAB
        scope.view.btnTab1.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab3.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.flxSegLCHeader.setVisibility(true);
        scope.view.flxSegHeaderAmendments.setVisibility(false);
        scope.view.flxSegHeaderClaims.setVisibility(false);
        scope.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.guaranteesSearchPlaceholder");
        scope.setPaginationComponent("Guarantees");
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segTransactionList.rowTemplate = rowTemplate.row;
        scope.setSegmentWidgetDataMap();
        scope.fetchDashboardData();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "switchToLOCTab",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : switchToAmendmentsTab
         * This metod handles functionalities on click of Amendments Tab
         * @return : NA
         */
    switchToAmendmentsTab: function () {
      var scope = this;
      try {
        scope.setDefaultSort("imgColumnAmendmentsTab4");
        scope.view.lblFilterText.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
        if (scope.guaranteesLCDetails > 0) {
          scope.view.flxVerticalEllipsis.setVisibility(true);
        } else {
          scope.view.flxVerticalEllipsis.setVisibility(false);
        }
        scope.currentTab = AMENDMENTS_TAB;
        scope.isLCTabRendered = false;
        scope.currentTab = AMENDMENTS_TAB;
        scope.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab2.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.btnTab3.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.flxSegLCHeader.setVisibility(false);
        scope.view.flxSegHeaderAmendments.setVisibility(true);
        scope.view.flxSegHeaderClaims.setVisibility(false);
        scope.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.guaranteesSearchPlaceholder");
        scope.setPaginationComponent(kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"));
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segTransactionList.rowTemplate = rowTemplate.row;
        scope.setSegmentWidgetDataMap();
        scope.fetchDashboardData();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "switchToAmendmentsTab",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : switchToClaimsTab
     * This metod handles functionalities on click of Claims Tab
     * @return : NA
     */
    switchToClaimsTab: function () {
      var scope = this;
      try {
        scope.view.lblFilterText.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All", false);
        if (scope.guaranteesLCDetails > 0) {
          scope.view.flxVerticalEllipsis.setVisibility(true);
        } else {
          scope.view.flxVerticalEllipsis.setVisibility(false);
        }
        var breakpoint = kony.application.getCurrentBreakpoint();
        if (breakpoint === 1024) {
          scope.setDefaultSort("imgColumnClaimsTab1");
        } else {
          scope.setDefaultSort("imgColumnClaimsTab4");
        }
        scope.currentTab = CLAIMS_TAB;
        scope.isClaimsTabRendered = true;
        scope.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab3.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.flxSegLCHeader.setVisibility(false);
        scope.view.flxSegHeaderAmendments.setVisibility(false);
        scope.view.flxClaimsHeader.setVisibility(true);
        scope.view.flxSegHeaderClaims.setVisibility(true);
        scope.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.guaranteesSearchPlaceholder", false);
        scope.setPaginationComponent("Claims");
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segTransactionList.rowTemplate = rowTemplate.row;
        scope.setSegmentWidgetDataMap();
        scope.fetchDashboardData();
      } catch (err) {
        var errorObj = {
          "method": "switchToClaimsTab",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setFilterWidgetDataMap
     * Maps widgetdata to  filter segments
     * @return : NA
     */
    setImportFilterWidgetDataMap: function () {
      var scope = this;
      try {
        scope.view.segLCAccountType.widgetDataMap = {
          "lblLCAccountType": "lblLCAccountType",
          "lblLCCheckbox": "lblLCCheckbox",
          "flxLCAccountType": "flxLCAccountType"
        };
        scope.view.segLCStatusType.widgetDataMap = {
          "lblStatusType": "lblStatusType",
          "lblLCCheckbox": "lblLCCheckbox",
          "flxStatus": "flxStatus"
        };
        scope.view.segBillType.widgetDataMap = {
          "lblStatusType": "lblStatusType",
          "lblLCCheckbox": "lblLCCheckbox",
          "flxStatus": "flxStatus"
        };
        scope.view.segTimePeriods.widgetDataMap = {
          "lblFeatureName": "lblFeatureName",
          "lblLCCheckbox": "lblLCCheckbox",
          "flxLCTimePeriodRow": "flxLCTimePeriodRow"
        };
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setImportFilterWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : toggleFilterDropDownVisibility
     * Hides or shows the filter dropw down based on its current state
     * @return : NA
     */
    toggleFilterDropDownVisibility: function () {
      var scope = this;
      try {
        if (scope.view.imgFilterDropdown.src === "arrowdown_sm.png") {
          if (scope.isFilterApplied) {
            scope.view.segLCAccountType.setData(scope.segFilter1Data);
            scope.view.segBillType.setData(scope.segFilter2Data);
            scope.view.segLCStatusType.setData(scope.segFilter3Data);
            scope.view.segTimePeriods.setData(scope.segFilter4Data);
          } else {
            scope.setSegLCProductTypeFilterData();
            scope.setSegBillTypeData();
            scope.setStatusTypeFilterData();
            scope.setsegTimeFilterData();
          }
          scope.view.btnApply.skin = "ICSknbtnEnabed003e7536px";
          scope.view.btnApply.setEnabled(true);
          scope.view.flxListDropdown.setVisibility(true);
          scope.view.imgFilterDropdown.src = "arrowup_sm.png";
        } else {
          scope.view.flxListDropdown.setVisibility(false);
          scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        }
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "toggleFilterDropDownVisibility",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : moreActionOnClick
     * Handles visibility of more actions dropdown
     * @return : NA
     */
    moreActionOnClick: function () {
      var scope = this;
      try {
        if (this.view.flxEllipsisDropDown.isVisible) this.view.flxEllipsisDropDown.setVisibility(false);
        else this.view.flxEllipsisDropDown.setVisibility(true);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "moreActionOnClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : moreActionSegDataMapping
     * Sets data for more actions dropdown
     * @return : NA
     */
    moreActionSegDataMapping: function () {
      var scope = this;
      try {
        scope.view.segEllipsisDropDownValues.skin = "sknSegScrollHide";
        scope.view.segEllipsisDropDownValues.widgetDataMap = {
          "flxAccountTypes": "flxAccountTypes",
          "lblUsers": "lblUsers",
          "lblSeparator": "lblSeparator"
        };
        var segData = [
          [{},
          [{
            lblUsers: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ExportList"),
              toolTip: kony.i18n.getLocalizedString("i18n.TradeFinance.ExportList"),
              isVisible: true,
              skin: "ICSknLbl72727215pxSSPR",
            },
            flxAccountTypes: {
              onClick: scope.downloadXLSXFile.bind(this),
              isVisible: true,
            },
          },]
          ]
        ];
        scope.view.segEllipsisDropDownValues.setData(segData);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "moreActionSegDataMapping",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setFilterUIView
     * This Method handles filter dropdown UI
     * @return : NA
     */
    setFilterUIView: function () {
      var scope = this;
      try {
        scope.setImportFilterWidgetDataMap();
        scope.view.segLCAccountType.setVisibility(true);
        scope.view.segLCStatusType.setVisibility(true);
        scope.view.segTimePeriods.setVisibility(true);
        scope.view.segBillType.setVisibility(true);
        scope.view.flxLCTypeHeadingSeparator.setVisibility(true);
        scope.view.flxBillTypeHeadingSeparartor.setVisibility(true);
        scope.view.flxStatusTypeHeadingSeparator.setVisibility(true);
        scope.view.flxLCTimePeriodHeadingSeparator.setVisibility(true);
        scope.view.imgAccountLCDropdown.src = "arrowup_sm.png";
        scope.view.imgStatusLCDropdown.src = "arrowup_sm.png";
        scope.view.imgTimePeriodDropdown.src = "arrowup_sm.png";
        scope.setSegLCProductTypeFilterData();
        scope.setSegBillTypeData();
        scope.setStatusTypeFilterData();
        scope.setsegTimeFilterData();
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setFilterUIView",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setSegLCProductTypeFilterData
     * Widget data mapping for LC type segment
     * @return : NA
     */
    setSegLCProductTypeFilterData: function () {
      var scope = this;
      try {
        scope.view.lblAccountLCType.text = kony.i18n.getLocalizedString("i18n.TradeFinance.productType") + " (" + kony.i18n.getLocalizedString("i18n.TradeFinance.Required") + ")";
        scope.segFilter1Data = [];
        scope.segFilter1Data = [{
          lblLCAccountType: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.SelectAll"),
            isVisible: true
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxLCAccountType: {
            onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "selectAll")
          }
        }, {
          lblLCAccountType: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.guarantee"),
            isVisible: true,
            key: OLBConstants.GUARANTEE_LC_PRODUCT_TYPE.GUARANTEE
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxLCAccountType: {
            onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "widgetLabel")
          }
        }, {
          lblLCAccountType: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.standByLCFilter"),
            isVisible: true,
            key: OLBConstants.GUARANTEE_LC_PRODUCT_TYPE.STANDBY_LC
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxLCAccountType: {
            onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "widgetLabel")
          }
        }];
        scope.view.segLCAccountType.setData(scope.segFilter1Data);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setSegLCProductTypeFilterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setSegBillTypeData
     * Widget data mapping for Currency segment
     * @return : NA
     */
    setSegBillTypeData: function () {
      var scope = this;
      try {
        scope.view.lblBillType.text = kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc") + " (" + kony.i18n.getLocalizedString("i18n.TradeFinance.Required") + ")";
        scope.segFilter2Data = [];
        scope.segFilter2Data = [{
          lblStatusType: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.SelectAll"),
            isVisible: true
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxStatus: {
            onClick: this.filterRowOnClick.bind(this, "segBillType", "selectAll")
          }
        }, {
          lblStatusType: {
            text: kony.i18n.getLocalizedString("i18n.wealth.performance"),
            isVisible: true,
            key: OLBConstants.GUARANTEE_AND_STANDBYLC_BILLTYPE.PERFORMANCE
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxStatus: {
            onClick: this.filterRowOnClick.bind(this, "segBillType", "widgetLabel")
          }
        }, {
          lblStatusType: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.BID"),
            isVisible: true,
            key: OLBConstants.GUARANTEE_AND_STANDBYLC_BILLTYPE.BID
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxStatus: {
            onClick: this.filterRowOnClick.bind(this, "segBillType", "widgetLabel")
          }
        }, {
          lblStatusType: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.Advance"),
            isVisible: true,
            key: OLBConstants.GUARANTEE_AND_STANDBYLC_BILLTYPE.ADVANCE
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxStatus: {
            onClick: this.filterRowOnClick.bind(this, "segBillType", "widgetLabel")
          }
        }, {
          lblStatusType: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.shipping"),
            isVisible: true,
            key: OLBConstants.GUARANTEE_AND_STANDBYLC_BILLTYPE.SHIPPING
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxStatus: {
            onClick: this.filterRowOnClick.bind(this, "segBillType", "widgetLabel")
          }
        }];
        scope.view.segBillType.setData(scope.segFilter2Data);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setSegBillTypeData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : setStatusTypeFilterData
         * This method sets status data for filter
         * @return : NA
         */
    setStatusTypeFilterData: function () {
      var scope = this;
      try {
        scope.view.lblStatusLCType.text = kony.i18n.getLocalizedString("i18n.ChequeManagement.Status") + " (" + kony.i18n.getLocalizedString("i18n.TradeFinance.Required") + ")";
        scope.segFilter3Data = [];
        if (scope.currentTab === GUARANTEES_TAB) {
          scope.segFilter3Data = [{
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.SelectAll"),
              isVisible: true
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "selectAll")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.SubmittedToBank"),
              isVisible: true,
              key: OLBConstants.GUARANTEE_LC_STATUS.SUBMITTED_TO_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.processingwithBank"),
              isVisible: true,
              key: OLBConstants.GUARANTEE_LC_STATUS.PROCESSING_WITH_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved"),
              isVisible: true,
              key: OLBConstants.GUARANTEE_LC_STATUS.APPROVED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.RejectedByBank"),
              isVisible: true,
              key: OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank"),
              isVisible: true,
              key: OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.Transfers.Cancelled"),
              isVisible: true,
              key: OLBConstants.GUARANTEE_LC_STATUS.CANCELLED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("kony.mb.Messages.draft"),
              isVisible: true,
              key: OLBConstants.GUARANTEE_LC_STATUS.DRAFT
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }];
        } else if (scope.currentTab === AMENDMENTS_TAB) {
          scope.segFilter3Data = [{
            lblStatusType: {
              text: "Select All",
              isVisible: true
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "selectAll")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.SubmittedToBank"),
              isVisible: true,
              key: OLBConstants.GUARANTEE_LC_STATUS.SUBMITTED_TO_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.processingwithBank"),
              isVisible: true,
              key: OLBConstants.GUARANTEE_LC_STATUS.PROCESSING_WITH_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.ImportDrawings.RejectedByBank"),
              isVisible: true,
              key: OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank"),
              isVisible: true,
              key: OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved"),
              isVisible: true,
              key: OLBConstants.GUARANTEE_LC_STATUS.APPROVED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }];
        } else if (scope.currentTab === CLAIMS_TAB) {
          scope.segFilter3Data = [{
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.SelectAll", false),
              isVisible: true
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "selectAll")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.userManagement.new", false),
              isVisible: true,
              key: OLBConstants.CLAIMS_RECEIVED_STATUS.NEW
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.SubmittedToBank"),
              isVisible: true,
              key: OLBConstants.CLAIMS_RECEIVED_STATUS.SUBMITTED_TO_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ProcessingByBank"),
              isVisible: true,
              key: OLBConstants.CLAIMS_RECEIVED_STATUS.PROCESSING_BY_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank"),
              isVisible: true,
              key: OLBConstants.CLAIMS_RECEIVED_STATUS.RETURNED_BY_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.Search.Rejected"),
              isVisible: true,
              key: OLBConstants.CLAIMS_RECEIVED_STATUS.REJECTED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ClaimExtended"),
              isVisible: true,
              key: OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_EXTENDED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.claimHonouredApplicationRejected"),
              isVisible: true,
              key: OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED_APPLICANT_REJECTED,
              width: "100%",
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel"),
              height: "30dp"
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.claimHonouredPendingConsent"),
              isVisible: true,
              key: OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED_PENDING_CONSENT,
              width: "100%",
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel"),
              height: "30dp"
            }
          }, {
            lblStatusType: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ClaimHonoured"),
              isVisible: true,
              key: OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }
          ];
        }
        scope.view.segLCStatusType.setData(scope.segFilter3Data);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setStatusTypeFilterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setsegTimeFilterData
     * Widget data mapping for time period segment
     * @return : NA
     */
    setsegTimeFilterData: function () {
      var scope = this;
      try {
        let timePeriodTypes = [];
        timePeriodTypes = ['Today', 'Last One Month', 'Last Six Months', 'Last One Year', 'YTD'];
        scope.view.lblTimePeriodType.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TimePeriod");
        scope.segFilter4Data = [];
        timePeriodTypes.forEach((timePeriodType, idx) => {
          scope.segFilter4Data.push({
            lblFeatureName: {
              text: timePeriodType,
              isVisible: true
            },
            lblLCCheckbox: {
              text: idx === 2 ? "M" : "L",
              skin: idx === 2 ? "ICSknLblRadioBtnSelectedFontIcon003e7520px" : "sknLblOlbFontIconsA0A0A020Px",
              isVisible: true,
              cursorType: "pointer"
            },
            flxLCTimePeriodRow: {
              onClick: this.filterRowOnClick.bind(this, "segTimePeriods", "TimePeriod")
            }
          });
        });
        scope.view.segTimePeriods.setData(scope.segFilter4Data);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setsegTimeFilterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : filterRowOnClick
     * This method handles row onClick of fiter dropdown
     * @return : NA
     */
    filterRowOnClick: function (segName, widgetName) {
      var scope = this;
      try {
        var statusTypeCount = 0;
        var lcTypeCount = 0;
        var billTypeCount = 0;
        var segmentdata = scope.view[segName].data;
        var rowData = scope.view[segName].selectedRowItems;
        var index = scope.view[segName].selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var timePeriodCurrentImage = "";
        if (segName === "segLCAccountType" || segName === "segLCStatusType" || segName === "segBillType") {
          if (segmentdata[rowIndex].lblLCCheckbox.text === "D") {
            segmentdata[rowIndex].lblLCCheckbox.text = "C";
            if (rowIndex != 0) {
              segmentdata[0].lblLCCheckbox.text = "D";
            }
          } else {
            segmentdata[rowIndex].lblLCCheckbox.text = "D";
            if (rowIndex != 0) {
              segmentdata[0].lblLCCheckbox.text = "D";
            }
          }
        } else {
          if (rowIndex === scope.previousFilterSelection) {
            segmentdata[rowIndex].lblLCCheckbox.text = "L";
            segmentdata[rowIndex].lblLCCheckbox.skin = "sknLblOlbFontIconsA0A0A020Px";
            segmentdata[scope.previousFilterSelection].lblLCCheckbox.text = "M";
            segmentdata[scope.previousFilterSelection].lblLCCheckbox.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
            scope.previousFilterSelection = rowIndex;
          } else {
            segmentdata[rowIndex].lblLCCheckbox.text = "M";
            segmentdata[rowIndex].lblLCCheckbox.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
          }
        }
        if (widgetName === "customDataRange" || widgetName === "TimePeriod") {
          for (var i = 0; i < segmentdata.length; i++) {
            if (i !== rowIndex) {
              segmentdata[i].lblLCCheckbox.text = "L";
              segmentdata[i].lblLCCheckbox.skin = "sknLblOlbFontIconsA0A0A020Px";
            }
          }
        }
        if (widgetName === "customDataRange") {
          if (segmentdata[rowIndex].lblLCCheckbox.text === "L") {
            scope.view.flxCustomDateRange.setVisibility(false);
          } else {
            scope.view.flxCustomDateRange.setVisibility(true);
          }
        }
        if (widgetName === "selectAll") {
          for (var i = 0; i < segmentdata.length; i++) {
            segmentdata[i].lblLCCheckbox.text = segmentdata[rowIndex].lblLCCheckbox.text;
          }
        }
        scope.view[segName].setData(segmentdata);
        scope.view.forceLayout();
        if (widgetName !== "TimePeriod") {
          var lcTypeData = scope.view.segLCAccountType.data;
          for (var i = 0; i < lcTypeData.length; i++) {
            if (lcTypeData[i].lblLCCheckbox.text === "C") {
              lcTypeCount++;
              if (lcTypeCount === 2) {
                lcTypeData[0].lblLCCheckbox.text = "C";
                scope.view.segLCAccountType.removeAll();
                scope.view.segLCAccountType.setData(lcTypeData);
              }
            }
          }
          var statusTypeData = scope.view.segLCStatusType.data;
          for (var i = 0; i < statusTypeData.length; i++) {
            if (statusTypeData[i].lblLCCheckbox.text === "C") {
              statusTypeCount++;
              if ((statusTypeCount === 7 && scope.currentTab === GUARANTEES_TAB) || (statusTypeCount === 5 && scope.currentTab === AMENDMENTS_TAB) || (statusTypeCount === 9 && scope.currentTab === CLAIMS_TAB)) {
                statusTypeData[0].lblLCCheckbox.text = "C";
                scope.view.segLCStatusType.removeAll();
                scope.view.segLCStatusType.setData(statusTypeData);
              }
            }
          }
          var billTypeData = scope.view.segBillType.data;
          for (var i = 0; i < billTypeData.length; i++) {
            if (billTypeData[i].lblLCCheckbox.text === "C") {
              billTypeCount++;
              if (billTypeCount === 4) {
                billTypeData[0].lblLCCheckbox.text = "C";
                scope.view.segBillType.removeAll();
                scope.view.segBillType.setData(billTypeData);
              }
            }
          }
          if (lcTypeCount >= 1 && statusTypeCount >= 1 && billTypeCount >= 1) {
            scope.view.btnApply.onClick = scope.applyFilters;
            scope.view.btnApply.skin = "ICSknbtnEnabed003e7536px";
            scope.view.btnApply.setEnabled(true);
          } else {
            scope.view.btnApply.skin = "ICSknbtnDisablede2e9f036px";
            scope.view.btnApply.setEnabled(false);
          }
        }
        scope.view[segName].setData(segmentdata);
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "filterRowOnClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setPaginationComponent
     * This method will invoked to set pagination variables
     * @return : NA
     */
    setPaginationComponent: function (pageHeader) {
      var scope = this;
      try {
        scope.view.PaginationContainer.setPageSize(10);
        scope.view.PaginationContainer.setLowerLimit(1);
        scope.view.PaginationContainer.setPageHeader(pageHeader);
        scope.view.PaginationContainer.setServiceDelegate(scope.fetchDashboardData.bind(scope, 'pagination'));
        scope.view.PaginationContainer.setIntervalHeader();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setPaginationComponent",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : getSegmentTemplate
     * This metod will return segment template for breakpoint
     * @return : {JSON}
     */
    getSegmentTemplate: function () {
      var scope = this;
      try {
        var segmentTemplate = {};
        var breakpoint = kony.application.getCurrentBreakpoint();
        if (breakpoint === 1024) {
          if (scope.currentTab === GUARANTEES_TAB) {
            segmentTemplate["row"] = "flxLCTransactionListCollapseTablet";
            segmentTemplate["expanded"] = "flxLCTransactionListExpandTablet";
          } else if (scope.currentTab === AMENDMENTS_TAB) {
            segmentTemplate["row"] = "flxLCAmendmentsCollapseTablet";
            segmentTemplate["expanded"] = "flxLCAmendmentsExpandTablet";
          }
          else if (scope.currentTab === CLAIMS_TAB) {
            segmentTemplate["row"] = "flxLCClaimsCollapseTablet";
            segmentTemplate["expanded"] = "flxLCClaimsExpandTablet";
          }
        } else {
          if (scope.currentTab === GUARANTEES_TAB) {
            segmentTemplate["row"] = "flxLCTransactionListCollapse";
            segmentTemplate["expanded"] = "flxLCTransactionListExpand";
          } else if (scope.currentTab === AMENDMENTS_TAB) {
            segmentTemplate["row"] = "flxLCAmendmentsCollapse";
            segmentTemplate["expanded"] = "flxLCAmendmentsExpand";
          } else if (scope.currentTab === CLAIMS_TAB) {
            segmentTemplate["row"] = "flxLCClaimsListCollapse";
            segmentTemplate["expanded"] = "flxLCClaimsListExpand";
          }
        }
        return segmentTemplate;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "getSegmentTemplate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : createNewAmendment
     * Navigate to create new amendment screen with LC Data
     * @return : NA
     */
    createNewAmendment: function () {
      var scope = this;
      try {
        var serviceParamGetLCByID = {};
        isRecentLCViewDetailsBtnOnClick = true;
        var LGData = scope.view.LGCopyDetails.getData();
        serviceParamGetLCByID["guaranteesSRMSId"] = LGData.guaranteesSRMSId ? LGData.guaranteesSRMSId : "";
        lcByIDNav = "createAmendment";
        scope.guaranteesPresenter.getGuaranteeById(serviceParamGetLCByID, "frmGuaranteesLCDashboard");
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "createNewAmendment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : navigateLCByID
     * Navigate with LC Data to the target forms
     * @return : NA
     */
    navigateLCByID: function (record) {
      var scope = this;
      try {
        this.navManager = applicationManager.getNavigationManager();
        var data;
        data = record;
        if (lcByIDNav === "continueEditing") {
          this.guaranteesPresenter.showGuaranteesScreen({
            context: 'createGuarantee',
            data: record
          });
        } else {
          if (lcByIDNav === "createAmendment") {
            data["LCDetails"] = record;
            friendlyNames = "frmCreateAmendment";
          } else if (lcByIDNav === "viewDetails") {
            data = record;
            friendlyNames = "frmGuaranteesLCDetails";
          }
          this.navManager.navigateTo({
            appName: "TradeFinanceMA",
            friendlyName: friendlyNames
          }, false, data);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "navigateLCByID",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /* 
     * @api : navPopUpViewDetails
     * Navigate to create new amendment screen with LC Data
     * @return : NA
     */
    navPopUpViewDetails: function () {
      var scope = this;
      try {
        var serviceParamGetLCByID = {};
        isRecentLCViewDetailsBtnOnClick = true;
        var LGData = this.view.LGCopyDetails.getData();
        lcByIDNav = "viewDetails";
        serviceParamGetLCByID["guaranteesSRMSId"] = LGData.guaranteesSRMSId;
        scope.guaranteesPresenter.getGuaranteeById(serviceParamGetLCByID, "frmGuaranteesLCDashboard");
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "navPopUpViewDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @return : NA
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    }
  };
});