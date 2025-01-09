define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {

  let currentTab = "LettersOfCredit";
  let guaranteesLCDetails;
  let lcDetails;
  let isNoRecordsAvailable = false;
  let isSearchEnabled = false;
  let sortApplied = false;
  let onClickViewAmendments = false;
  let currentGuaranteesSRMSId;
  this.selectedRecord = {};
  let isTablet = false;

  this.serviceParameters = {
    "searchString": "",
    "pageSize": "",
    "pageOffset": "",
    "sortByParam": "",
    "sortOrder": "",
    "timeParam": "",
    "timeValue": "6,MONTH",
    "filterByValue": "",
    "filterByParam": ""
  };
  this.sortFields = {
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
  this.navData;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");

  return {

    /**
    * @api : onNavigate
    * This function for executing the preShow and postShow
    * @return : NA
    */
    onNavigate: function (record) {
      var scope = this;
      try {
        this.view.preShow = this.preShow;
        this.view.postShow = this.postShow;
        this.view.onBreakpointChange = this.onBreakpointChange;
        this.view.onDeviceBack = function () { };
        scope.currentTab = "LettersOfCredit";
        this.guaranteesPresenter = applicationManager.getModulesPresentationController({
          appName: 'TradeFinanceMA',
          moduleName: 'GuaranteesUIModule'
        });
        if (!record) record = JSON.parse(JSON.stringify(this.guaranteesPresenter.guaranteeData));
        if (record && record.guaranteesSRMSId) {
          navData = record;
          serviceParameters.filterByValue = navData.guaranteesSRMSId;
          serviceParameters.filterByParam = "guaranteesSRMSId";
          this.view.GuaranteeDetails.setContext({ data: navData, showSwiftTags: false });
          if (navData.flowType === "Amendments") {
            scope.currentTab = "Amendments";
          }
          scope.setTabNavigation();
          scope.setButtonActions();
        }
        else {
          scope.currentTab = "LettersOfCredit";
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "onNavigate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : preShow
    * This function for executing the primary functions before rendering UI
    * @return : NA
    */
    preShow: function () {
      var scope = this;
      try {
        FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        this.view.customheadernew.forceCloseHamburger();
        this.view.customheadernew.activateMenu("TradeFinance", "Guarantees");
        scope.lowerLimit = 1;
        scope.upperLimit = 10;
        scope.isSearchEnabled = false;
        scope.sortApplied = false;
        this.navManager = applicationManager.getNavigationManager();
        if (scope.currentTab === "" || kony.sdk.isNullOrUndefined(scope.currentTab)) {
          scope.currentTab = "LettersOfCredit";
          scope.view.flxLCContent.setVisibility(true);
          scope.view.flxAmendmentLC.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : postShow
    * This function for executing the primary functions after rendering UI
    * @return : NA
    */
    postShow: function () {
      var scope = this;
      try {
        this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
        scope.view.PaginationContainer.setPageSize(10);
        scope.initButtonActions();
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
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
        if (scope.currentTab === "Amendments" || scope.currentTab === "Claims") {
          scope.setDashboardData();
          scope.setHeaderi18n();
        }
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          isTablet = true;
        } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
          isTablet = false;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setHeaderi18n
    * This function sets i18n keys for Header
    * @return : NA
    */
    setHeaderi18n: function () {
      var scope = this;
      try {
        var breakpoint = kony.application.getCurrentBreakpoint();
        if (breakpoint === 1024) {
          scope.view.btnCoulmnTab2.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef");
          scope.view.btnCoulmnTab3.text = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn");
        } else {
          scope.view.lblLCSubHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.GTSBLCIssuanceDetails");
          scope.view.btnColumnAmendments1.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Beneficiary");
          scope.view.btnColumnAmendments2.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNo");
          scope.view.btnColumnAmendments3.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef");
          scope.view.btnColumnAmendments4.text = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn");
          scope.view.btnColumnAmendments6.text = kony.i18n.getLocalizedString("i18n.konybb.manageUser.Status");
          scope.view.btnColumnAmendments7.text = kony.i18n.getLocalizedString("i18n.wireTransfers.Actions");
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
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
          "level": "frmGuaranteesLCDetailsController",
          "method": "setTabData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : initButtonActions
    * To set button actions
    * @return : NA
    */
    initButtonActions: function () {
      var scope = this;
      try {
        scope.view.lblVerticalEllipsis.onTouchEnd = () => {
          if(scope.view.flxVerticalEllipsisDropdown.isVisible) {
              scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
          }
          else {
              scope.view.flxVerticalEllipsisDropdown.setVisibility(true);
          }
        };
        scope.view.flxVerticalEllipsisBody.onClick = scope.renderPrintAndDownload.bind(this);
        scope.view.tbxSearch.text = "";
        scope.view.imgClear.setVisibility(false);
        scope.view.tbxSearch.onTextChange = function () {
          if (scope.view.tbxSearch.text.length > 0) scope.view.imgClear.setVisibility(true);
          else scope.view.imgClear.setVisibility(false);
        };
        scope.view.imgClear.onTouchEnd = function () {
          scope.view.tbxSearch.text = "";
          scope.isSearchEnabled = false;
          scope.view.imgClear.setVisibility(false);
          scope.fetchDashboardData();
        };
        if (!kony.sdk.isNullOrUndefined(scope.view.tbxSearch.text)) {
          scope.view.imgClear.setVisibility(false);
        }
        scope.view.tbxSearch.onDone = scope.getSearchData;
        scope.view.btnLOC.onClick = scope.setTabData.bind(scope, "LettersOfCredit");
        scope.view.btnAmendmentTab.onClick = scope.setTabData.bind(scope, "Amendments");
        scope.view.btnClaimTab.onClick = scope.setTabData.bind(scope, "Claims");
        scope.setViewActions();
        scope.view.btnRequestCancellation.onClick = scope.setInitButtonActions.bind(this, "btnRequestCancellation");
        scope.view.btnCreateNewAmendment.onClick = scope.setInitButtonActions.bind(this, "btnCreateNewAmendment");
        scope.view.btnBack.onClick = scope.setInitButtonActions.bind(this, "btnBack");
        this.view.flxConsolidatedView.onClick = scope.navigateConsolidatedView.bind(this);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * setInitButtonActions - the entry point method for the form controller.
    * This button sets actions for LC buttons.
    */
    setInitButtonActions: function (btnID) {
      var scope = this;
      try {
        if (btnID === "btnBack") {
          scope.guaranteesPresenter.showView({
            appName: "TradeFinanceMA",
            form: "frmGuaranteesLCDashboard",
          });
        }
        else if (btnID === "btnRequestCancellation") {
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "frmCancellationRequest"
          }).navigate(navData);
        }
        else if (btnID === "btnCreateNewAmendment") {
          let data = {
            "LCDetails": navData
          };
          if (scope.view[btnID].text === kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewAmendment")) {
            new kony.mvc.Navigation({
              "appName": "TradeFinanceMA",
              "friendlyName": "frmCreateAmendment"
            }).navigate(data);
          }
          else {
            scope.guaranteesPresenter.showGuaranteesScreen({ context: 'createGuarantee', data: navData });
          }
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "setInitButtonActions",
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
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
        if (viewModel.GuaranteeLCAmendments) {
          scope.guaranteesLCDetails = viewModel.GuaranteeLCAmendments;
          scope.setDashboardData();
          scope.lcDetails = scope.guaranteesLCDetails;
        } if (viewModel.guaranteesSRMSId && scope.currentTab === "LettersOfCredit") {
          navData = viewModel;
          serviceParameters.filterByValue = navData.guaranteesSRMSId;
          serviceParameters.filterByParam = "guaranteesSRMSId";
          this.view.GuaranteeDetails.setContext({ data: navData, showSwiftTags: false });
          scope.setTabNavigation();
          scope.setButtonActions();
        }
        if (viewModel.AmendmentHistory && viewModel.amendmentSRMSRequestId && onClickViewAmendments === true) {
          onClickViewAmendments = false;
          selectedRecord = viewModel;
          scope.guaranteesPresenter.getGuaranteeById({
            "guaranteesSRMSId": currentGuaranteesSRMSId
          }, "frmGuaranteesLCDetails");
        }
        if (viewModel.guaranteesSRMSId && scope.currentTab === "Amendments") {
          if (!viewModel.amendmentSRMSRequestId) {
            selectedRecord["LCDetails"] = viewModel;
            this.navManager.navigateTo({
              appName: "TradeFinanceMA",
              friendlyName: "GuaranteesUIModule/frmViewAmendmentDetails"
            }, false, selectedRecord);
          }
        }
        if (viewModel.ClaimsReceived) {
          scope.guaranteesLCDetails = viewModel.ClaimsReceived;
          scope.setDashboardData();
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "updateFormUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setButtonActions
    * Sets action for Buttons
    * @return : NA
    */
    setButtonActions: function () {
      var scope = this;
      try {
        if (navData.status.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK).toLowerCase()) {
          this.view.btnCreateNewAmendment.skin = "sknBtnNormalSSPFFFFFF15Px";
          this.view.btnBack.skin = "ICSknsknBtnffffffBorder0273e31pxRadius2px";
          this.view.btnCreateNewAmendment.setVisibility(true);
          this.view.btnRequestCancellation.setVisibility(false)
          this.view.btnBack.setVisibility(true);
          this.view.btnCreateNewAmendment.width = "150dp";
          this.view.btnBack.width = "150dp";
          this.view.btnCreateNewAmendment.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ReviseGTSBLC");
          this.view.btnBack.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnBack");
          navData.isReviseFlow = true;
        }
        else if (navData.status.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.APPROVED).toLowerCase()) {
          this.view.btnCreateNewAmendment.skin = "sknBtnNormalSSPFFFFFF15Px";
          this.view.btnRequestCancellation.skin = "sknBtnNormalSSPFFFFFF15Px";
          this.view.btnBack.skin = "ICSknsknBtnffffffBorder0273e31pxRadius2px";
          this.view.btnCreateNewAmendment.setVisibility(true);
          this.view.btnRequestCancellation.setVisibility(true);
          this.view.btnBack.setVisibility(true);
          this.view.btnCreateNewAmendment.width = "200dp";
          this.view.btnRequestCancellation.width = "200dp";
          this.view.btnBack.width = "200dp";
          this.view.btnRequestCancellation.text = kony.i18n.getLocalizedString("i18n.TradeFinance.RequestCancellation");
          this.view.btnCreateNewAmendment.text = kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewAmendment");
          this.view.btnBack.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnBack");
          navData.isReviseFlow = false;
          var createAmendPermission = applicationManager.getConfigurationManager().checkUserPermission('LC_GUARANTEES_AMENDMENTS_CREATE');
          if (createAmendPermission && (kony.sdk.isNullOrUndefined(navData.amendmentNo) || (!kony.sdk.isNullOrUndefined(navData.amendmentNo) && (JSON.parse(navData.amendmentNo.replace(/'/g, "\"")).amendmentStatus) && ((JSON.parse(navData.amendmentNo.replace(/'/g, "\"")).amendmentStatus).toLowerCase() === OLBConstants.GUARANTEE_LC_STATUS.APPROVED.toLowerCase())))) {
            this.view.btnCreateNewAmendment.setVisibility(true);
            this.view.btnRequestCancellation.setVisibility(true);
          }
          else {
            this.view.btnCreateNewAmendment.setVisibility(false);
            this.view.btnRequestCancellation.setVisibility(false);
          }
        }
        else {
          this.view.btnCreateNewAmendment.skin = "sknBtnNormalSSPFFFFFF15Px";
          this.view.btnRequestCancellation.skin = "sknBtnNormalSSPFFFFFF15Px";
          this.view.btnBack.skin = "ICSknsknBtnffffffBorder0273e31pxRadius2px";
          this.view.btnCreateNewAmendment.setVisibility(false);
          this.view.btnRequestCancellation.setVisibility(false)
          this.view.btnBack.setVisibility(true);
          this.view.btnBack.width = "200dp";
          this.view.btnBack.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnBack");
          navData.isReviseFlow = false;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "setButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : getSearchData
    * Gets Data on search
    * @return : NA
    */
    getSearchData: function () {
      var scope = this;
      try {
        var searchString = this.view.tbxSearch.text;
        scope.lowerLimit = 1;
        scope.view.PaginationContainer.setPageSize(10);
        if (searchString !== null && searchString !== undefined) {
          if (scope.currentTab === "Amendments") {
            scope.isSearchEnabled = true;
            serviceParameters.pageSize = "11";
            serviceParameters.pageOffset = "0";
            serviceParameters.searchString = searchString;
            this.guaranteesPresenter.getGuaranteeAmendments(serviceParameters, "frmGuaranteesLCDetails");
          }
          else if (scope.currentTab === "Claims") {
            serviceParameters.pageSize = "11";
            serviceParameters.pageOffset = "0";
            serviceParameters.searchString = searchString;
            this.guaranteesPresenter.getReceivedClaims(serviceParameters, "frmGuaranteesLCDetails");
          }
        } else {
          this.isSearchEnabled = false;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
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
      var scope = this;
      try {
        if (params !== 'pagination' && params !== "sort") {
          scope.view.PaginationContainer.setLowerLimit(1);
          scope.view.PaginationContainer.setPageSize(10);
          scope.view.PaginationContainer.setIntervalHeader();
        }
        var searchStringtext = scope.view.tbxSearch.text;
        var pageOffsetValue = (params === "pagination" || params === "sort") ? scope.view.PaginationContainer.getPageOffset() : 0;
        serviceParameters.searchString = searchStringtext;
        serviceParameters.pageOffset = JSON.stringify(pageOffsetValue);
        if (scope.currentTab === "Amendments") {
          this.guaranteesPresenter.getGuaranteeAmendments(serviceParameters, "frmGuaranteesLCDetails");
        } else if (scope.currentTab === "Claims") {
          this.guaranteesPresenter.getReceivedClaims(serviceParameters, "frmGuaranteesLCDetails");
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "fetchDashboardData",
          "error": err
        };
        scope.onError(errorObj);
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
        var imageName = "flxAmendmentsColumn";
        if (scope.currentTab === "Amendments") {
          imageName = "flxAmendmentsColumn";
        } else if (scope.currentTab === "Claims") {
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
          "level": "frmGuaranteesLCDetailsController",
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
        for (const key in sortFields) {
          scope.view[key].src = "sortingfinal_1.png";
        }
        scope.view[widget].src = "sorting_next.png";
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
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
        scope.sortApplied = true;
        var imageName = "imgColumnAmendmentsTab";
        if (scope.currentTab === "Amendments") {
          imageName = "imgColumnAmendmentsTab";
        } else if (scope.currentTab === "Claims") {
          imageName = "imgColumnClaimsTab";
        }
        var field = sortFields[imageName + columnNo];
        if (scope.view[imageName + columnNo].src === "sortingfinal.png") {
          scope.view[imageName + columnNo].src = "sorting_previous.png";
          sortType = "DESC";
        } else if (scope.view[imageName + columnNo].src === "sorting_previous.png") {
          scope.view[imageName + columnNo].src = "sorting_next.png";
          sortType = "ASC";
        } else {
          scope.view[imageName + columnNo].src = "sorting_previous.png";
          sortType = "DESC";
        }
        for (var i = 1; i <= 7; i++) {
          if (i !== columnNo) {
            scope.view[imageName + i].src = "sortingfinal.png";
          }
        }
        serviceParameters.sortByParam = field;
        serviceParameters.sortOrder = sortType;
        scope.fetchDashboardData("sort");
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
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
    **/
    setSegmentWidgetDataMap: function () {
      try {
        var scope = this;
        if (scope.currentTab === "Claims") {
          this.view.segAmendmentLCList.widgetDataMap = {
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
            "lblRow2Column3Value": "lblRow2Column3Value"
          };
        } else {
          this.view.segAmendmentLCList.widgetDataMap = {
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
            "flxLCRowDetails1": "flxLCRowDetails1"
          };
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
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
        scope.view.flxAmendmentLC.setVisibility(true);
        if (scope.guaranteesLCDetails && scope.guaranteesLCDetails.length > 0) {
          scope.view.segAmendmentLCList.setVisibility(true);
          scope.view.flxNoTransactions.setVisibility(false);
          scope.view.flxPagination.setVisibility(true);
        } else {
          scope.view.segAmendmentLCList.setVisibility(false);
          scope.view.flxNoTransactions.setVisibility(true);
          scope.view.flxPagination.setVisibility(false);
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
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segAmendmentLCList.rowTemplate = rowTemplate.row;
        const segData = scope.getSegmentData(scope.guaranteesLCDetails.slice(0, 10));
        scope.view.segAmendmentLCList.setData(segData);
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
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
        let formatUtilManager = applicationManager.getFormatUtilManager();
        scope.setSegmentWidgetDataMap();
        var breakpoint = kony.application.getCurrentBreakpoint();
        let template = "",
          segData = [];
        if (breakpoint === 1024) {
          if (scope.currentTab === "Claims") {
            if (breakpoint > 1024) {
              scope.view.flxClaimsColumn2.left = "10.5%";
              scope.view.flxClaimsColumn5.left = "9%";
              scope.view.flxClaimsColumn6.right = "20px";
              scope.view.imgColumnClaimsTab2.setVisibility(true);
              scope.view.imgColumnClaimsTab5.setVisibility(true);
            }
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
                "lblColumn1": record.beneficiaryName || NA,
                "lblColumn2": record.productType || NA,
                "lblColumn3": record.claimStatus || NA,
                "template": template,
                "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.ReceivedOn"),
                "lblRowColumn2Key": "Claim Amount",
                "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"),
                "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc"),
                "lblRow2Column2Key": kony.i18n.getLocalizedString("i18n.Wealth.expiryDate"),
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
          } else if (this.currentTab === "Amendments") {
            template = "flxLCAmendmentsCollapseTablet";
            for (const record of ExportLCData) {
              segData.push(Object.assign(record, {
                "imgDropdown": "arrow_down.png",
                "flxDropDown": {
                  "onClick": scope.onSegmentRowToggle.bind(this)
                },
                "lblCoulmnTabValue1": {
                  "text": record.benificiaryName ? record.benificiaryName : NA,
                },
                "lblCoulmnTabValue3": {
                  "text": record.amendRequestedDate ? CommonUtilities.getDateAndTimeInUTC(record.amendRequestedDate).substr(0, 10) : NA,
                  "left": "15%"
                },
                "lblCoulmnTabValue4": {
                  "text": record.amendStatus ? record.amendStatus : NA,
                  "left": "27%"
                },
                "template": template,
                "lblCoulmnTabValue2": {
                  "isVisible": false
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
                  "isVisible": true
                },
                "flxLCRowDetails3": {
                  "isVisible": true
                },
                "flxLCRowData11": {
                  "isVisible": false
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
                "lblLCData1": { text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNo"), skin: "sknlbla0a0a015px" },
                "lblLCData2": { text: kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"), skin: "sknlbla0a0a015px" },
                "lblLCData3": { text: kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"), skin: "sknlbla0a0a015px" },
                "lblLCData4": { text: kony.i18n.getLocalizedString("i18n.TradeFinance.productType"), skin: "sknlbla0a0a015px" },
                "lblLCData5": kony.i18n.getLocalizedString("i18n.TradeFinance.billType"),
                "lblLCData6": kony.i18n.getLocalizedString("kony.mb.common.Amount"),
                "lblLCData7": kony.i18n.getLocalizedString("i18n.TradeFinance.amdEffectiveDate"),
                "lblLCData9": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType"),
                "lblLCData10": kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty"),
                "lblLCDataValue1": record.amendmentNo ? record.amendmentNo : NA,
                "lblLCDataValue2": record.guaranteesReference ? record.guaranteesReference : NA,
                "lblLCDataValue3": record.guaranteesReference ? record.guaranteesReference : NA,
                "lblLCDataValue4": record.productType ? record.productType : NA,
                "lblLCDataValue5": record.billType ? record.billType : NA,
                "lblLCDataValue7": record.amendAmount ? formatUtilManager.formatAmountandAppendCurrencySymbol(record.amendAmount, record.amendCurrency) : NA,
                "lblLCDataValue8": record.amendmentEffectiveDate ? CommonUtilities.getDateAndTimeInUTC(record.amendmentEffectiveDate).substr(0, 10) : NA,
                "lblLCDataValue9": record.expiryType ? record.expiryType : NA,
                "lblLCDataValue10": record.instructingParty ? record.instructingParty : NA,
                "flxColumn4": {
                  "left": 47.5 + "%",
                  "width": "30%"
                },
                "flxColumn3": {
                  "left": 27.5 + "%"
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
                "btnAction": {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    onClickViewAmendments = true;
                    currentGuaranteesSRMSId = record.guaranteesSRMSId;
                    scope.guaranteesPresenter.getGuaranteeAmendmentsById({
                      "amendmentSRMSRequestId": record.amendmentSRMSRequestId
                    }, "frmGuaranteesLCDetails");
                  }
                }
              }))
            }
          }
        } else {
          if (scope.currentTab === "Claims") {
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
                "lblColumn1": record.beneficiaryName || NA,
                "lblColumn2": record.productType || NA,
                "lblColumn3": (record.claimCurrency && record.claimAmount) ? `${record.claimCurrency} ${formatUtilManager.formatAmount(record.claimAmount)}` : NA,
                "lblColumn4": record.receivedOn ? formatUtilManager.getFormattedCalendarDate(record.receivedOn) : NA,
                "lblColumn5": record.claimStatus || NA,
                "template": template,
                "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"),
                "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc"),
                "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.Wealth.expiryDate"),
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
          }
          else if (this.currentTab === "Amendments") {
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
                "lblCoulmnTabValue4": record.amendRequestedDate ? CommonUtilities.getDateAndTimeInUTC(record.amendRequestedDate).substr(0, 10) : NA,
                "lblCoulmnTabValue5": record.issueDate ? CommonUtilities.getDateAndTimeInUTC(record.issueDate).substr(0, 10) : NA,
                "lblCoulmnTabValue6": record.amendStatus ? record.amendStatus : NA,
                "template": template,
                "lblLCData1": { text: kony.i18n.getLocalizedString("i18n.TradeFinance.productType"), skin: "sknlbla0a0a015px" },
                "lblLCData2": { text: kony.i18n.getLocalizedString("i18n.TradeFinance.billType"), skin: "sknlbla0a0a015px" },
                "lblLCData3": { text: kony.i18n.getLocalizedString("kony.mb.common.Amount"), skin: "sknlbla0a0a015px" },
                "lblLCData4": { text: kony.i18n.getLocalizedString("i18n.TradeFinance.amdEffectiveDate"), skin: "sknlbla0a0a015px" },
                "lblLCData5": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType"),
                "lblLCData6": kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty"),
                "lblLCDataValue1": record.productType ? record.productType : NA,
                "lblLCDataValue2": record.billType ? record.billType : NA,
                "lblLCDataValue3": record.amendAmount ? formatUtilManager.formatAmountandAppendCurrencySymbol(record.amendAmount, record.currency) : NA,
                "lblLCDataValue4": record.amendmentEffectiveDate ? record.amendmentEffectiveDate : NA,
                "lblLCDataValue5": record.expiryType ? record.expiryType : NA,
                "lblLCDataValue6": record.instructingParty ? record.instructingParty : NA,
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
                  "isVisible": true
                },
                "flxLCRowDetails2": {
                  "isVisible": true
                },
                "flxLCRowData8": {
                  "isVisible": false
                },
                "flxLCRowData7": {
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
                "btnAction": {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    onClickViewAmendments = true;
                    currentGuaranteesSRMSId = record.guaranteesSRMSId;
                    scope.guaranteesPresenter.getGuaranteeAmendmentsById({
                      "amendmentSRMSRequestId": record.amendmentSRMSRequestId
                    }, "frmGuaranteesLCDetails");
                  }
                }
              }))
            }
          }
        }
        return segData;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "getSegmentData",
          "error": err
        };
        scope.onError(errorObj);
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
        var index = scope.view.segAmendmentLCList.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = scope.view.segAmendmentLCList.data;
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
            scope.view.segAmendmentLCList.setDataAt(data[scope.previousIndex], scope.previousIndex, sectionIndex);
          }
          data[rowIndex].imgDropdown = {
            image: "chevron_up.png"
          };
          data[rowIndex].template = segTemplate.expanded;
          scope.previousIndex = JSON.parse(JSON.stringify(rowIndex));
          scope.view.segAmendmentLCList.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        } else {
          data[rowIndex].imgDropdown = {
            image: "arrow_down.png"
          };
          data[rowIndex].template = segTemplate.row;
          scope.view.segAmendmentLCList.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "onSegmentRowToggle",
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
        const rowIndex = this.view.segAmendmentLCList.selectedRowIndex[1];
        const data = this.view.segAmendmentLCList.data;
        const breakpoint = kony.application.getCurrentBreakpoint();
        let expandedHeight;
        if (this.currentTab === "Claims") {
          expandedHeight = (breakpoint === 1024) ? "188dp" : "200dp";
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
     * Method to toggle the segment row view
     * @param {Number} index - index of segment row to toggle
     * @param {Array} viewData - data which need to be assigned to toggled view
     */
    toggleSegmentRowView: function (index, viewData) {
      try {
        let data = this.view.segAmendmentLCList.data[index];
        const template = data.template;
        data.lblDropdown = viewData[0];
        data.flxIdentifier.isVisible = viewData[1];
        data.flxIdentifier.skin = viewData[2];
        data.lblIdentifier.skin = viewData[3];
        data[template].height = viewData[4];
        data[template].skin = viewData[5];
        this.view.segAmendmentLCList.setDataAt(data, index);
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
    * @api : setTabNavigation
    * This metod handles tab Navigation
    * @return : NA
    */
    setTabNavigation: function () {
      var scope = this;
      try {
        scope.view.tbxSearch.text = "";
        scope.view.imgClear.setVisibility(false);
        scope.view.segAmendmentLCList.removeAll();
        scope.view.flxPagination.setVisibility(false);
        scope.view.btnLOC.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.btnAmendmentTab.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.flxSegHeaderAmendments.setVisibility(true);
        scope.view.flxAmendmentLC.setVisibility(true);
        scope.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.guaranteesSearchPlaceholder");
        if (scope.isSearchEnabled === false) {
          scope.view.tbxSearch.text = "";
          scope.view.imgClear.setVisibility(false);
        }
        if (scope.currentTab === "LettersOfCredit") {
          serviceParameters = {
            searchString: "",
            pageSize: "11",
            pageOffset: 0,
            sortByParam: "",
            sortOrder: "DESC",
            timeParam: "serviceRequestTime",
            timeValue: "6,MONTH",
            filterByValue: "",
            filterByParam: ""
          };
          scope.switchToLOCTab();
        } else if (scope.currentTab === "Amendments") {
          serviceParameters = {
            searchString: "",
            pageSize: "11",
            pageOffset: 0,
            sortByParam: "amendRequestedDate",
            sortOrder: "DESC",
            timeParam: "",
            timeValue: "",
            filterByValue: navData.guaranteesSRMSId,
            filterByParam: "guaranteesSRMSId",
          };
          scope.switchToAmendmentsTab();
        } else if (scope.currentTab === "Claims") {
          serviceParameters = {
            searchString: "",
            pageSize: "11",
            pageOffset: 0,
            sortByParam: "receivedOn",
            sortOrder: "DESC",
            timeParam: "",
            timeValue: "",
            filterByValue: navData.guaranteesSRMSId,
            filterByParam: "guaranteesSRMSId",
          };
          scope.switchToClaimsTab();
        }
        scope.setViewActions();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
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
        scope.view.flxConsolidatedView.setVisibility(false);
        let breakpoint = kony.application.getCurrentBreakpoint();
        scope.view.flxLCActions.setVisibility(true);
        scope.currentTab = "LettersOfCredit";
        scope.view.btnLOC.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.btnAmendmentTab.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnClaimTab.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.flxLCContent.setVisibility(true);
        scope.view.flxAmendmentLC.setVisibility(false);
        scope.fetchDashboardData();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
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
        const breakpoint = kony.application.getCurrentBreakpoint();
        scope.view.flxLCActions.setVisibility(false);
        scope.view.flxConsolidatedView.setVisibility(true);
        scope.view.flxSearch.width = "77%";
        if(breakpoint === 1024) {
          scope.setDefaultSort("imgColumnAmendmentsTab3");
          sortFields.imgColumnAmendmentsTab1 = "benificiaryName";
          sortFields.imgColumnAmendmentsTab3 = "amendRequestedDate";
          sortFields.imgColumnAmendmentsTab4 ="amendStatus";
        } else {
          scope.setDefaultSort("imgColumnAmendmentsTab4");
        }
        scope.currentTab = "Amendments";
        scope.view.btnLOC.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnAmendmentTab.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.btnClaimTab.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.flxLCContent.setVisibility(false);
        scope.view.flxAmendmentLC.setVisibility(true);
        scope.view.flxSegHeaderAmendments.setVisibility(true);
        scope.view.flxSegHeaderClaims.setVisibility(false);
        scope.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.guaranteesSearchPlaceholder");
        scope.setPaginationComponent(kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"));
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segAmendmentLCList.rowTemplate = rowTemplate.row;
        scope.setSegmentWidgetDataMap();
        scope.fetchDashboardData();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "switchToAmendmentsTab",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
        * @api : switchToClaimsTab
        * This metod handles functionalities on click of Amendments Tab
        * @return : NA
        */
    switchToClaimsTab: function () {
      var scope = this;
      try {
        scope.view.flxLCActions.setVisibility(false);
        scope.view.flxConsolidatedView.setVisibility(false);
        scope.view.flxSearch.width = "96%";
        scope.setDefaultSort("imgColumnClaimsTab4");
        scope.currentTab = "Claims";
        scope.view.btnLOC.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnAmendmentTab.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnClaimTab.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.flxLCContent.setVisibility(false);
        scope.view.flxAmendmentLC.setVisibility(true);
        scope.view.flxSegHeaderAmendments.setVisibility(false);
        scope.view.flxSegHeaderClaims.setVisibility(true);
        scope.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.guaranteesSearchPlaceholder");
        scope.setPaginationComponent("Claims");
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segAmendmentLCList.rowTemplate = rowTemplate.row;
        scope.setSegmentWidgetDataMap();
        scope.fetchDashboardData();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "switchToClaimsTab",
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
          "level": "frmGuaranteesLCDetailsController",
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
          if (scope.currentTab === "Amendments") {
            segmentTemplate["row"] = "flxLCAmendmentsCollapseTablet";
            segmentTemplate["expanded"] = "flxLCAmendmentsExpandTablet";
          }
          else if (scope.currentTab === "Claims") {
            segmentTemplate["row"] = "flxLCClaimsCollapseTablet";
            segmentTemplate["expanded"] = "flxLCClaimsExpandTablet";
          }
        } else {
          if (scope.currentTab === "Amendments") {
            segmentTemplate["row"] = "flxLCAmendmentsCollapse";
            segmentTemplate["expanded"] = "flxLCAmendmentsExpand";
          }
          else if (scope.currentTab === "Claims") {
            segmentTemplate["row"] = "flxLCClaimsListCollapse";
            segmentTemplate["expanded"] = "flxLCClaimsListExpand";
          }
        }
        return segmentTemplate;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "getSegmentTemplate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : navigateConsolidatedView
    * This method navigates to the amendmnets consolidated view screen
    * @return : NA
    */
    navigateConsolidatedView: function () {
      var scope = this;
      try {
        this.navManager = applicationManager.getNavigationManager();
        this.navManager.navigateTo({
          appName: "TradeFinanceMA",
          friendlyName: "GuaranteesUIModule/frmAmendmentConsolidatedViewDetails"
        }, false, navData);
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "navigateConsolidatedView",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    renderPrintAndDownload: function() {
      var scope = this;
      try {
        scope.view.segVerticalDropdownEllipsis.widgetDataMap = {
              flxLCAccountType: 'flxLCAccountType',
              imgLCCheckbox: 'imgLCCheckbox',
              lblLCCheckbox: 'lblLCCheckbox',
              lblLCAccountType: 'lblLCAccountType'
          };
          let masterData = [];
          scope.guaranteesPresenter.contextualMenuData.map(item => {
              masterData.push({
                  flxLCAccountType: {
                      bottom: '0dp',
                      height: '40dp',
                      onClick: scope.onPrintAndDownloadRowClick.bind(scope, item.id),
                      cursorType: 'pointer',
                      isVisible: scope.contextualItemCondition(item.id)
                  },
                  imgLCCheckbox: {
                      isVisible: true,
                      src: item.src
                  },
                  lblLCCheckbox: {
                      isVisible: false
                  },
                  lblLCAccountType: item.text
              });
          });
          scope.view.segVerticalDropdownEllipsis.setData(masterData);
      } catch (err) {
          var errorObj = {
              "method": "renderPrintAndDownload",
              "error": err
          };
          scope.onError(errorObj);
      }
  },

  contextualItemCondition: function (id) {
    var scope = this;
    try {
      if (id == 'raiseQuery') {
        if (navData.status.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.APPROVED).toLowerCase()) {
          return true;
        } else {
          return false;
        }
      }
      if (isTablet && id == 'print') {
        return false;
      }
      return true;
    } catch (err) {
      var errorObj = {
        "method": "contextualItemCondition",
        "error": err
      };
      scope.onError(errorObj);
    }
  },

    /**
    * @api : navigateToPrint
    * Navigating to the print based on condition
    * @return : NA
    */
    onPrintAndDownloadRowClick: function (id) {
      var scope = this;
      try {
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
        if (id == 'print') {
          let dataObj = {
            navData,
            previousFormName: 'frmGuaranteesLCDetails'
          }
          if (scope_configManager.swiftEnabled === 'True' && navData.status === OLBConstants.GUARANTEE_LC_STATUS.APPROVED) {
            formNameForPrint = 'frmPrintSwiftGuaranteeStandbyLC';
          } else {
            formNameForPrint = 'frmPrintGuaranteeStandbyLC';
          }
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": `GuaranteesUIModule/${formNameForPrint}`
          }).navigate(dataObj);
        } else if (id == "download") {
          scope.guaranteesPresenter.generateGuaranteesLC({
            "guaranteesSRMSId": navData.guaranteesSRMSId
          });
        } else if (id == 'raiseQuery') {
          let record = navData;
          let queryObj = {};
          let formatUtilManager = applicationManager.getFormatUtilManager();
          queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${record.guaranteesSRMSId}`;
          queryObj.descriptionObj = {};
          record.amount && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.konybb.Common.Amount")] = record.amount ? formatUtilManager.formatAmountandAppendCurrencySymbol(record.amount) : NA);
          record.productType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.productType")] = record.productType);
          record.guaranteeAndSBLCType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc")] = record.guaranteeAndSBLCType);
          record.issueDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate")] = record.issueDate ? CommonUtilities.getDateAndTimeInUTC(record.issueDate).substr(0, 10) : NA);
          record.instructionParty && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty")] = record.instructionParty);
          queryObj.tradeModule = true;
          scope.guaranteesPresenter.showMessagesScreen(queryObj);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDetailsController",
          "method": "onPrintAndDownloadRowClick",
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
      var error = err;
    }
  };
});

