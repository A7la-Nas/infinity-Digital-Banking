define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let isTablet = false;
  let serviceResponse = {};
  let contentScope;
  let contentPopupScope;
  let contentButtonScope;
  let isAmendViewDetailsonClick = false;
  let pageConfig = {
    "pageOffset": "0",
    "pageSize": "11"
  };
  let collectionOverViewArray = [],
    paymentStatusArray = [],
    draweeConsentArray = [],
    collectionDetailsArray = [],
    draweeAndBankDetailsArray = [],
    documentAndBankInstructionArray = [];
  this.serviceParameters = {
    "searchString": "",
    "pageSize": "",
    "pageOffset": "",
    "sortByParam": "amendmentNo",
    "sortOrder": "DESC",
    "timeParam": "updatedOn",
    "timeValue": "6,MONTH",
    "filterByValue": "",
    "filterByParam": ""
  };
  let TAB_COLLECTIONS = kony.i18n.getLocalizedString("i18n.TradeFinance.collections"),
    TAB_AMENDMENTS = kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"),
    CURRENT_TAB = TAB_COLLECTIONS,
    CURRENT_ROW_TEMPLATE = 'flxTempInwardAmendmentList',
    CURRENT_EXPAND_ROW_TEMPLATE = 'flxTempInwardAmendmentListExpand';
  let isPrintNavigation = false;
  let selectedRecord = {};
  let collectionResponse;
  let presenter;
  let serviceResponses = {
    "collectionReference": "",
    "requestSelection": "",
    "messageToBank": ""
  };
  let currentPopup;
  let prevSelectedIndex;
  let response = {};
  let flowType = "";
  this.sortField = {
    "imgTabTwoListHeader1": "corporateUserName",
    "imgTabTwoListHeader2": "amendmentNo",
    "imgTabTwoListHeader3": "amendmentReference",
    "imgTabTwoListHeader4": "updatedOn",
    "imgTabTwoListHeader5": "amount",
    "imgTabTwoListHeader6": "status",
  };
  let isPaymentPopupVisible;
  let swiftsAdvicesData = {};
  let paymentAdvices;
  let swiftMessages;
  let outwardConstants;
  let localReturnedHistory;
  let navigationFrom;
  let isPaymentStatusBillOfExchange;
  let modifiedFieldsArray = [];
  let normalSkin = 'ICSknLabelSSPRegular42424215px';
  let boldSkin = 'ICSknLabelSSPBold42424215px';
  return {
    /**
     * Sets the initial actions for form
     */
    onNavigate: function (data = {}) {
      var scope = this;
      try {
        presenter = applicationManager.getModulesPresentationController({
          appName: 'TradeFinanceMA',
          moduleName: 'OutwardCollectionsUIModule'
        });
        collectionResponse = data.response ? data.response.collectionResponse : data.collectionResponse ? data.collectionResponse : data;
        navigationFrom = '';
        if (data.flowType) {
          navigationFrom = data.flowType;
          data.flowType === presenter.outwardConstants.createdCollection ? flowType = TAB_COLLECTIONS : flowType = TAB_AMENDMENTS;
          collectionResponse.status = collectionResponse.status ? collectionResponse.status : presenter.outwardConstants.statusSubmittedToBank;
        } else {
          flowType = TAB_COLLECTIONS;
          collectionResponse = JSON.parse(JSON.stringify(presenter.collectionResponse));
        }
        collectionResponse.billOfExchangeStatus ? isPaymentPopupVisible = false : isPaymentPopupVisible = true;
        scope.view.postShow = scope.postShow;
        scope.view.preShow = scope.preShow;
        scope.view.onBreakpointChange = scope.onBreakpointChange;
        scope.segViewDetailsTempData = "";
        previousForm = data.previousFormName;
        if (data.previousFormName === 'frmOutwardCollectionAmendmentsConsolidatedView') scope.setTabNavigation(TAB_AMENDMENTS)
        isPaymentStatusBillOfExchange = false;
        data.modifiedFieldsArray ? (modifiedFieldsArray = data.modifiedFieldsArray) : modifiedFieldsArray = [];
      } catch (err) {
        var errorObj = {
          "method": "onNavigate",
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
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          isTablet = true;
        } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
          isTablet = false;
        }
        contentScope.flxTabTwoListHeader2.isVisible = isTablet ? false : true;
        contentScope.flxTabTwoListHeader5.isVisible = isTablet ? false : true;
        contentScope.flxTabTwoListHeader2.width = '13%';
        contentScope.flxTabTwoListHeader3.left = isTablet ? '2%' : '0%';
        contentScope.flxTabTwoListHeader4.left =  isTablet ? '12.5%' : '3%';
        contentScope.flxTabTwoListHeader6.left =  isTablet ? '9.5%' : '3%';
        contentScope.flxTabTwoListHeader7.left =  isTablet ? '3%' : '1%';
        if (Object.keys(serviceResponse).length > 0) scope.renderDataInDashboardList();
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsViewDetailsController",
          "method": "onBreakpointChange",
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
        scope.navManager = applicationManager.getNavigationManager();
        contentScope = this.view.formTemplate12.flxContentTCCenter;
        contentPopupScope = this.view.formTemplate12.flxContentPopup;
        contentButtonScope = this.view.formTemplate12.flxTCButtons;
        outwardConstants = presenter.outwardConstants;
        contentScope.flxBtnConsolidatedView.left = isTablet ? "-10dp" : "-25dp";
        localReturnedHistory = presenter.isEmptyNullOrUndefined(collectionResponse.returnedHistory) ? [] : JSON.parse(collectionResponse.returnedHistory.replace(/'/g, "\""));
        scope.seti18nkeys();
        scope.setSegCollectionWidgetDataMap();
      } catch (err) {
        var errorObj = {
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
        scope.appendResponses();
        scope.initButtonActions();
        contentButtonScope.flxVerticalEllipsisDropdown.setVisibility(false);
        contentScope.flxAcknowledgementMessage.setVisibility(false);
        contentPopupScope.btnClose02.onClick = scope.returnByBankHistoryPopup.bind(this, false);
        contentPopupScope.txtAreaMessageToBank.onTextChange = scope.setTextAreaCount.bind(this, "txtAreaMessageToBank", "lblMessageCount");
        contentPopupScope.txtAreaMessageToBank02.onTextChange = scope.setTextAreaCount.bind(this, "txtAreaMessageToBank02", "lblMessageCount02");
        contentPopupScope.txtAreaMessageToBank.onEndEditing = scope.enableOrDisableButton.bind(this, "btnSend1", "txtAreaMessageToBank");
        contentPopupScope.btnClose.onClick = scope.requestPaymentPopup.bind(this, false);
        contentPopupScope.btnCancel.onClick = scope.requestPaymentPopup.bind(this, false);
        contentPopupScope.btnCancel2.onClick = scope.requestBillOfExchangePopup.bind(this, false);
        contentPopupScope.btnClose01.onClick = scope.requestBillOfExchangePopup.bind(this, false);
        contentPopupScope.btnSend1.onClick = scope.requestPaymentStatusPopup.bind(this, "flxRequestPaymentPopup", true);
        contentPopupScope.btnSend2.onClick = scope.billOfExchangeRequestPopup.bind(this, "flxRequestBillExchange", true);
        contentPopupScope.flxPaymentRadioBtn.onClick = scope.ontoggleRadioButton.bind(this, "lblPaymentFontIcon", "lblBillExchangeFontIcon");
        contentPopupScope.flxBillExchanngeFontIcon.onClick = scope.ontoggleRadioButton.bind(this, "lblBillExchangeFontIcon", "lblPaymentFontIcon");
        contentButtonScope.btnSwiftAndAdvices.setVisibility(false);
        contentScope.flxAcknowledgementMessage.height = '70dp';
        contentScope.flxAcknowledgementMessage.setVisibility(false);
        contentScope.flxSwitchParent.setVisibility(true);
        contentScope.flxTabSwtichBottomSeparator.setVisibility(true);
        contentButtonScope.flxPrintAndDownloadContainer.setVisibility(true);
        if (navigationFrom == presenter.outwardConstants.createdCollection) {
          contentScope.flxSwitchParent.setVisibility(false);
          contentScope.flxTabSwtichBottomSeparator.setVisibility(false);
          contentScope.imgAcknowledgement.src = presenter.resourcesConstants.images.successBannerImage;
          contentScope.lblMessage.text = presenter.renderI18nKeys('i18n.TradeFinance.submittedConfirmation', false);
          contentScope.flxAcknowledgementMessage.setVisibility(true);
          contentScope.flxContinueReviseButton.setVisibility(false);
          contentScope.btnBack.setVisibility(false);
          contentScope.btnViewOutwardCollection.setVisibility(true);
          contentScope.btnViewOutwardCollection.text = presenter.renderI18nKeys('i18n.TradeFinance.viewAllCollections', false);
          contentScope.flxBackButtonActions.setVisibility(true);
          contentScope.flxAcknowledgementActions.setVisibility(false);
          contentButtonScope.flxPrintAndDownloadContainer.setVisibility(false);
          scope.renderPageTitle();
          presenter.outwardConstants.updateOutwardCollection = false;
          modifiedFieldsArray.length !== 0 && scope.appendResponses();
        } else {
          let swiftAdvicesPayload = {
            'orderId': collectionResponse.collectionReference,
            'product': 'Collection'
          };
          presenter.fetchSwiftsAdvices(swiftAdvicesPayload, 'frmOutwardCollectionsViewDetails');
        }
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsViewDetailsController",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    enableOrDisableButton: function (btnAction, textArea) {
      if (contentPopupScope[textArea].text != "") FormControllerUtility.enableButton(contentPopupScope[btnAction]);
      else FormControllerUtility.disableButton(contentPopupScope[btnAction]);
    },

    initButtonActions: function () {
      var scope = this;
      try {
        presenter.cursorTypePointer([
          contentButtonScope.lblVerticalEllipsis,
          contentPopupScope.flxDownloadIcons,
        ]);
        contentScope.btnConsentBack.onClick = scope.navigateToBack.bind(this, "btnConsentBack");
        contentScope.btnBack.onClick = scope.navigateToBack.bind(this, "btnBack");
        contentScope.btnBack1.onClick = scope.navigateToBack.bind(this, "btnBack1");
        contentScope.btnViewOutwardCollection.onClick = scope.navigateToBack.bind(this, "btnBack");
        contentScope.flxClear.onClick = () => contentScope.flxAcknowledgementMessage.setVisibility(false);
        if (collectionResponse.status.toLowerCase() == outwardConstants.approved || collectionResponse.status.toLowerCase() == outwardConstants.overdue) {
          if ( (!collectionResponse.lastAmendmentDetails) || (collectionResponse.lastAmendmentDetails &&
            (JSON.parse(collectionResponse.lastAmendmentDetails).amendmentStatus.toLowerCase() == outwardConstants.approved ||
              JSON.parse(collectionResponse.lastAmendmentDetails).amendmentStatus.toLowerCase() == outwardConstants.rejected)
          )) {
            contentScope.flxAcknowledgementActions.setVisibility(true);
            contentScope.flxContinueReviseButton.setVisibility(false);
            contentScope.flxBackButtonActions.setVisibility(false);
          }
          else {
            contentScope.flxBackButtonActions.setVisibility(true);
            contentScope.flxAcknowledgementActions.setVisibility(false);
            contentScope.flxContinueReviseButton.setVisibility(false);
          }
        } else if (collectionResponse.status.toLowerCase() === outwardConstants.returnedByBank) {
          contentScope.flxContinueReviseButton.setVisibility(true);
          contentScope.flxBackButtonActions.setVisibility(false);
          contentScope.flxAcknowledgementActions.setVisibility(false);
        } else {
          contentScope.flxBackButtonActions.setVisibility(true);
          contentScope.flxAcknowledgementActions.setVisibility(false);
          contentScope.flxContinueReviseButton.setVisibility(false);
        }
        contentScope.btnTab1.onClick = scope.setTabNavigation.bind(this, TAB_COLLECTIONS);
        contentScope.btnTab2.onClick = scope.setTabNavigation.bind(this, TAB_AMENDMENTS);
        contentScope.flxBtnConsolidatedView.onClick = scope.navigateToConsolidatedView.bind(this);
        contentScope.btnTab1.text = presenter.renderI18nKeys("i18n.TradeFinance.collections", false);
        contentScope.imgClear.onTouchEnd = function () {
          contentScope.tbxSearch.text = "";
          scope.isSearchEnabled = false;
          contentScope.imgClear.setVisibility(false);
          scope.fetchAmendmentsData();
        };
        contentScope.tbxSearch.onDone = scope.getSearchData;
        contentScope.tbxSearch.onTextChange = function () {
          if (contentScope.tbxSearch.text.length > 0) contentScope.imgClear.setVisibility(true);
          else contentScope.imgClear.setVisibility(false);
        };
        if (!kony.sdk.isNullOrUndefined(contentScope.tbxSearch.text)) {
          contentScope.imgClear.setVisibility(false);
        }
        contentButtonScope.btnSwiftAndAdvices.onClick = () => {
          contentButtonScope.flxVerticalEllipsisDropdown.setVisibility(false);
          contentButtonScope.flxSwiftAndAdvices.isVisible ? contentButtonScope.flxSwiftAndAdvices.setVisibility(false) : contentButtonScope.flxSwiftAndAdvices.setVisibility(true);
        };
        contentButtonScope.lblVerticalEllipsis.onTouchEnd = () => {
          contentButtonScope.flxSwiftAndAdvices.setVisibility(false);
          contentButtonScope.flxVerticalEllipsisDropdown.isVisible ? contentButtonScope.flxVerticalEllipsisDropdown.setVisibility(false) : contentButtonScope.flxVerticalEllipsisDropdown.setVisibility(true);
        };
        contentButtonScope.flxVerticalEllipsis.onClick = this.renderPrintAndDownload.bind(this);
        contentPopupScope.btnSwiftMessageClose.onClick = () => {
          contentPopupScope.setVisibility(false);
          contentPopupScope.flxSwiftMTPopup.setVisibility(false);
        };
        contentScope.btnRequestCancellation.onClick = function(){
          presenter.showOutwardCollectionScreen({
            context: 'requestCancellation',
            data: collectionResponse,
          });
        };
        contentScope.btnActions.onClick = function(){
          presenter.showOutwardCollectionScreen({
            context: 'createAmendment',
            data: collectionResponse,
          });
        };
        contentScope.btnContinueRevise.onClick = () => {
          let data = {
            collectionReference: collectionResponse.collectionReference,
            flowType: 'continueEditing'
          }
          presenter.showOutwardCollectionScreen({
            context: 'createCollection',
            data
          });
        };
        contentButtonScope.flxSwiftAndAdvices.setVisibility(false);
        contentButtonScope.flxVerticalEllipsisDropdown.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsViewDetailsController",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /** 
     * @api : renderHeaderDetails
     * This function to set i18n keys when landing on screen.
     * @return : NA
     */
    seti18nkeys: function () {
      var scope = this;
      try {
        scope.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") + " - " + collectionResponse.collectionReference;
        contentScope.lblContainerHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.collectionOverview", false);
      } catch (err) {
        var errorObj = {
          "method": "seti18nkeys",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    navigateToBack: function () {
      var data = {};
      data.isModify = true;
      this.navManager.navigateTo({
        appName: "TradeFinanceMA",
        friendlyName: "OutwardCollectionsUIModule/frmOutwardCollectionDashboard"
      }, false, data);
    },

    /**
     * @api : updateFormUI
     * This function to set UI when landing on screen.
     * @return : NA
     */
    updateFormUI: function (viewModel) {
      var scope = this;
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.OutwardCollectionAmendments && !isAmendViewDetailsonClick) {
        serviceResponse = viewModel.OutwardCollectionAmendments;
        scope.setAmendmentsData();
      }
      if (viewModel.updatedRequestCollectionStatus) {
        let tempResponse = viewModel.updatedRequestCollectionStatus;
        !presenter.isEmptyNullOrUndefined(tempResponse.paymentStatus) && (collectionResponse.paymentStatus = tempResponse.paymentStatus);
        !presenter.isEmptyNullOrUndefined(tempResponse.billOfExchangeStatus) && (collectionResponse.billOfExchangeStatus = tempResponse.billOfExchangeStatus);
        isPaymentPopupVisible = false;
        scope.handleVisibility();
        scope.appendResponses();
      }
      if (viewModel.serverError) {
        contentScope.imgAcknowledgement.src = "failed_icon.png";
        contentScope.lblMessage.text = viewModel.serverError;
        contentPopupScope.setVisibility(false);
        contentPopupScope.flxRequestPaymentPopup.setVisibility(false);
        contentPopupScope.flxRequestBillExchange.setVisibility(false);
        contentScope.flxAcknowledgementMessage.setVisibility(true);
      }
      if(viewModel.amendmentsListServerError){
        contentScope.imgAcknowledgement.src = "failed_icon.png";
        contentScope.lblMessage.text = viewModel.amendmentsListServerError;
        contentScope.flxAcknowledgementMessage.setVisibility(true);
        scope.setAmendmentsData();
      }
      if (viewModel.fetchSwiftsAdvices) {
        swiftsAdvicesData = viewModel.fetchSwiftsAdvices;
        scope.renderSwiftAdvice();
      }
      if (viewModel.fetchFileResponse) {
        contentPopupScope.setVisibility(true);
        contentPopupScope.flxSwiftMTPopup.setVisibility(true);
        contentPopupScope.richTextArea1.text = viewModel.fetchFileResponse;
      }
    },

    handleVisibility: function () {
      contentPopupScope.setVisibility(false);
      contentPopupScope.flxRequestPaymentPopup.setVisibility(false);
      contentPopupScope.flxRequestBillExchange.setVisibility(false);
      contentScope.flxAcknowledgementMessage.setVisibility(true);
      if (currentPopup === "RequestPaymentStatus") {
        contentScope.lblMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollectionSuccessfullAck");
        contentScope.imgAcknowledgement.src = "success_green.png";
      } else if (currentPopup === "RequestBillOfExchangeStatus") {
        if (isPaymentStatusBillOfExchange) {
          isPaymentStatusBillOfExchange = false;
          contentScope.lblMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.successBOE");
        } else {
          contentScope.lblMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollectionSuccessfullAck");
        }
        contentScope.imgAcknowledgement.src = "success_green.png";
      }
    },

    /**
     * @api : setSegAmendmentWidgetDataMap
     * This function for setting widgetDataMap for segment
     * @param : name of the segment.
     * @return : NA
     */
    setSegCollectionWidgetDataMap: function () {
      var scope = this;
      try {
        contentScope.segCollectionOverviewBody.rowTemplate = "flxFrmViewDetailsGuaranteeRow";
        contentScope.segCollectionOverviewBody.sectionHeaderTemplate = "flxTempFrmViewDetailsOutward";
        contentScope.segCollectionOverviewBody.widgetDataMap = {
          "flxFrmViewDetailsGuaranteeRow": "flxFrmViewDetailsGuaranteeRow",
          "flxGuaranteeDetailsRows": "flxGuaranteeDetailsRows",
          "lblGuaranteeDetailsRow": "lblGuaranteeDetailsRow",
          "flxGuaranteeDetailsRightRows": "flxGuaranteeDetailsRightRows",
          "flxGuaranteeDetailsValues": "flxGuaranteeDetailsValues",
          "lblGuaranteeDetailsValue": "lblGuaranteeDetailsValue",
          "lblViewHistory": "lblViewHistory",
          "flxTempFrmViewDetailsOutward": "flxTempFrmViewDetailsOutward",
          "flxSectionHeaderContent": "flxSectionHeaderContent",
          "flxSeparator": "flxSeparator",
          "flxheaderWithDropdown": "flxheaderWithDropdown",
          "lblHeader": "lblHeader",
          "flxDropDown": "flxDropDown",
          "imgDropDown": "imgDropDown",
          "flxKeyHeading": "flxKeyHeading",
          "lblKeyHeading": "lblKeyHeading",
          "lblKey": "lblKey",
          "lblValue": "lblValue",
          "flxAddress": "flxAddress",
          "lblAddress1": "lblAddress1",
          "lblAddress2": "lblAddress2",
          "lblAddress3": "lblAddress3",
          "template": "template",
          "flxKey": "flxKey"
        };
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionViewDetailsController",
          "method": "setSegCollectionWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    collectionOverView: function () {
      var scope = this;
      try {
        let tempStatus = collectionResponse.status.toLowerCase();
        collectionOverViewArray = [
          [
            {
              "flxSectionHeaderContent": {
                isVisible: false
              }
            },
            [
              {
                "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", true),
                "lblGuaranteeDetailsValue": collectionResponse.transactReference || collectionResponse.collectionReference || NA
              },
              {
                "flxFrmViewDetailsGuaranteeRow": {
                  isVisible: !(navigationFrom == presenter.outwardConstants.createdCollection) || presenter.outwardConstants.updateOutwardCollection
                },
                "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.updatedOn", true),
                "lblGuaranteeDetailsValue": collectionResponse.updatedOn ? presenter.getConvertedDate(collectionResponse, 'updatedOn') : NA,
              },
              {
                "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.ChequeManagement.Status", true),
                "lblGuaranteeDetailsValue": {
                  text: ((tempStatus == outwardConstants.returnedByBank) && localReturnedHistory.length > 0) || ((tempStatus == outwardConstants.submittedToBank) && localReturnedHistory.length > 0) ? `${presenter.getDynamicData(collectionResponse, 'status')} (${scope.getOrdinalNumeral(localReturnedHistory.length)})`
                    :
                    presenter.getDynamicData(collectionResponse, 'status'),
                  skin: boldSkin
                },
                "lblViewHistory": {
                  text: tempStatus == outwardConstants.approved ? kony.i18n.getLocalizedString("i18n.TradeFinance.requestPaymentStatus") : tempStatus == outwardConstants.overdue ? presenter.renderI18nKeys('i18n.TradeFinance.requestPaymentStatus', false) + " / " + presenter.renderI18nKeys('i18n.TradeFinance.billOfExchange', false) : (tempStatus == outwardConstants.returnedByBank || ((tempStatus == outwardConstants.submittedToBank) && localReturnedHistory.length > 1)) ? `${kony.i18n.getLocalizedString("i18n.TradeFinance.viewHistory")} (${localReturnedHistory.length - 1})` : NA,
                  isVisible: (tempStatus == outwardConstants.approved && isPaymentPopupVisible) || (tempStatus == outwardConstants.overdue && isPaymentPopupVisible) || ((tempStatus == outwardConstants.returnedByBank) && localReturnedHistory.length > 1) || ((tempStatus == outwardConstants.submittedToBank) && localReturnedHistory.length > 1) || (isPaymentPopupVisible && (tempStatus == outwardConstants.overdue && !(collectionResponse.billOfExchangeStatus))),
                  cursorType: 'pointer',
                  top: '-2dp'
                },
                "flxGuaranteeDetailsValues": {
                  onClick: this.handlePopup.bind(this)
                }
              }
            ]
          ]
        ];
        // If status is Rejected
        if (tempStatus == outwardConstants.cancelled) {
          collectionOverViewArray[0][1].push(
            {
              "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.reasonForCancellation", true),
              "lblGuaranteeDetailsValue": collectionResponse.reasonForCancellation ? presenter.getDynamicData(collectionResponse, 'reasonForCancellation') : NA
            }
          );
        } else if (tempStatus == outwardConstants.rejected) {
          collectionOverViewArray[0][1].push(
            {
              "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejectionWithColon", false),
              "lblGuaranteeDetailsValue": collectionResponse.reasonForRejection ? presenter.getDynamicData(collectionResponse, 'reasonForRejection') : NA
            }
          );
        } else if (tempStatus == outwardConstants.approved || tempStatus == outwardConstants.settled || tempStatus == outwardConstants.overdue) {
          collectionOverViewArray[0][1].push(
            {
              "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.Wealth.maturityDate", false),
              "lblGuaranteeDetailsValue": collectionResponse.maturityDate ? presenter.getConvertedDate(collectionResponse, 'maturityDate') : NA
            }
          );
        } else if (tempStatus == outwardConstants.returnedByBank || (tempStatus == outwardConstants.submittedToBank && localReturnedHistory.length > 0)) {
          collectionOverViewArray[0][1].push(
            {
              "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturnedWithColon", false),
              "lblGuaranteeDetailsValue": collectionResponse.reasonForReturn ? presenter.getDynamicData(collectionResponse, 'reasonForReturn') : NA
            }
          );
        }
        if (tempStatus == outwardConstants.approved || tempStatus == outwardConstants.rejected || tempStatus == outwardConstants.settled || tempStatus == outwardConstants.overdue) {
          collectionOverViewArray[0][1].push(
            {
              "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.courierTrackingDetails", true),
              "lblGuaranteeDetailsValue": collectionResponse.courierTrackingDetails ? presenter.getDynamicData(collectionResponse, 'courierTrackingDetails') : NA
            },
            {
              "flxFrmViewDetailsGuaranteeRow": {
                isVisible: (tempStatus == outwardConstants.approved || tempStatus == outwardConstants.rejected || tempStatus == outwardConstants.settled || tempStatus == outwardConstants.overdue) && collectionResponse.paymentStatus
              },
              "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.requestPaymentStatus", true),
              "lblGuaranteeDetailsValue": collectionResponse.paymentStatus ? presenter.getDynamicData(collectionResponse, 'paymentStatus') : NA
            },
            {
              "flxFrmViewDetailsGuaranteeRow": {
                isVisible: (tempStatus == outwardConstants.overdue && !presenter.isEmptyNullOrUndefined(collectionResponse.billOfExchangeStatus))
              },
              "lblGuaranteeDetailsRow": 'Request Bill of Exchange:',
              "lblGuaranteeDetailsValue": collectionResponse.billOfExchangeStatus ? presenter.getDynamicData(collectionResponse, 'billOfExchangeStatus') : NA
            },
            {
              "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.messageFromBankWithColon", false),
              "lblGuaranteeDetailsValue": collectionResponse.messageFromBank ? presenter.getDynamicData(collectionResponse, 'messageFromBank') : NA
            }
          );
        }
      } catch (err) {
        var errorObj = {
          "method": "collectionOverViewArray",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    paymentDetails: function () {
      var scope = this;
      try {
        paymentStatusArray = [
          [
            {
              "lblHeader": {
                text: presenter.renderI18nKeys("i18n.TransfersEur.PaymentDetails", false)
              },
              "imgDropDown": "dropdown_collapse.png",
              "flxDropDown": {
                onClick: scope.onActionClick.bind(this),
                cursorType: 'pointer',
              }
            }, // Section Header Template
            [
              {
                "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.paymentStatusWithColon", false),
                "lblGuaranteeDetailsValue": collectionResponse.paymentStatus ? presenter.getDynamicData(collectionResponse, 'paymentStatus') : NA
              },
              {
                "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.settledAmount", false),
                "lblGuaranteeDetailsValue": (collectionResponse.currency && collectionResponse.settledAmount) ? collectionResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(collectionResponse.settledAmount) : NA
              },
              {
                "lblGuaranteeDetailsRow": 'Amount Credited Account:',
                "lblGuaranteeDetailsValue": collectionResponse.creditAccount ? scope.morphAcNumber(collectionResponse.creditAccount) : NA
              }
            ]
          ]
        ];
      } catch (err) {
        var errorObj = {
          "method": "paymentStatusArray",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    draweeConsent: function () {
      var scope = this;
      try {
        draweeConsentArray = [
          [
            {
              "lblHeader": {
                text: presenter.renderI18nKeys("i18n.TradeFinance.draweeConsent", false)
              },
              "imgDropDown": "dropdown_collapse.png",
              "flxDropDown": {
                onClick: scope.onActionClick.bind(this),
                cursorType: 'pointer',
              }
            },
            [
              {
                "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.wealth.acknowledgement", true),
                "lblGuaranteeDetailsValue": collectionResponse.draweeAcknowledgement ? presenter.getDynamicData(collectionResponse, 'draweeAcknowledgement') : NA
              },
              {
                "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.acceptance", true),
                "lblGuaranteeDetailsValue": collectionResponse.draweeAcceptance ? presenter.getDynamicData(collectionResponse, 'draweeAcceptance') : NA,
              },
              {
                "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.billOfExchangeSigned", true),
                "lblGuaranteeDetailsValue": collectionResponse.isBillExchangeSigned ? presenter.getDynamicData(collectionResponse, 'isBillExchangeSigned') : NA
              }
            ]
          ]
        ];
      } catch (err) {
        var errorObj = {
          "method": "draweeConsentArray",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    colletionDetails: function () {
      var scope = this;
      try {
        collectionDetailsArray = [
          [{
            "lblHeader": {
              text: presenter.renderI18nKeys("i18n.TradeFinance.collectionDetails", false),
            },
            "flxDropDown": {
              onClick: scope.onActionClick.bind(this),
              cursorType: 'pointer',
            }
          }, // Section Header Template
          [{
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.documentNumberWithColon", false),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.documentNo ? presenter.getDynamicData(collectionResponse, 'documentNo') : NA,
              skin: modifiedFieldsArray.includes('documentNo') ? boldSkin : normalSkin,
            }
          }, {
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.createdOnWithColon", false),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.createdOn ? presenter.getConvertedDate(collectionResponse, 'createdOn') : NA,
              skin: modifiedFieldsArray.includes('createdOn') ? boldSkin : normalSkin,
            }
          }, {
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.tenorType ? presenter.getDynamicData(collectionResponse, 'tenorType') : NA,
              skin: modifiedFieldsArray.includes('tenorType') ? boldSkin : normalSkin,
            }
          }, {
            "flxFrmViewDetailsGuaranteeRow": {
              isVisible: collectionResponse.tenorType == presenter.outwardConstants.usance
            },
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.usanceDays", true),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.usanceDays ? presenter.getDynamicData(collectionResponse, 'usanceDays') : NA,
              skin: modifiedFieldsArray.includes('usanceDays') ? boldSkin : normalSkin,
            }
          }, {
            "flxFrmViewDetailsGuaranteeRow": {
              isVisible: collectionResponse.tenorType == presenter.outwardConstants.usance
            },
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.usanceDetailsWithColon", false),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.usanceDetails ? presenter.getDynamicData(collectionResponse, 'usanceDetails') : NA,
              skin: modifiedFieldsArray.includes('usanceDetails') ? boldSkin : normalSkin,
            }
          }, {
            "flxFrmViewDetailsGuaranteeRow": {
              isVisible: collectionResponse.tenorType == presenter.outwardConstants.usance
            },
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.allowUserAcceptance", true),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.allowUsanceAcceptance ? presenter.getDynamicData(collectionResponse, 'allowUsanceAcceptance') : NA,
              skin: modifiedFieldsArray.includes('allowUsanceAcceptance') ? boldSkin : normalSkin,
            }
          }, {
            "lblGuaranteeDetailsRow": {
              text: presenter.renderI18nKeys('i18n.TradeFinance.amountaAndAccountDetails', false),
              skin: "ICSknlbl424242SSP13pxSemibold",
            },
            "lblGuaranteeDetailsValue": {
              isVisible: false,
            },
          }, {
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.requestAmountWithColon", false),
            "lblGuaranteeDetailsValue": {
              text: (collectionResponse.currency && collectionResponse.amount) ? collectionResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(collectionResponse.amount) : NA,
              skin: (modifiedFieldsArray.includes('currency') || modifiedFieldsArray.includes('amount')) ? boldSkin : normalSkin,
            }
          }, {
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.amountCreditAccount", true),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.creditAccount ? scope.morphAcNumber(collectionResponse.creditAccount) : NA,
              skin: modifiedFieldsArray.includes('creditAccount') ? boldSkin : normalSkin,
            }
          }, {
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitAccountWithColon", false),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.debitAccount ? scope.morphAcNumber(collectionResponse.debitAccount) : NA,
              skin: modifiedFieldsArray.includes('debitAccount') ? boldSkin : normalSkin,
            }
          },]
          ]
        ];
      } catch (err) {
        var errorObj = {
          "method": "collectionDetailsArray",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    draweeAndBankDetails: function () {
      var scope = this;
      try {
        let bankAddress = !presenter.isEmptyNullOrUndefined(collectionResponse.collectingBankAddress) ? presenter.getFormattedAddress(collectionResponse.collectingBankAddress, 'ICSknLabelSSPRegular42424215px', '380dp', '20dp', '0dp') : NA;
        let draweeAddress = !presenter.isEmptyNullOrUndefined(collectionResponse.draweeAddress) ? presenter.getFormattedAddress(collectionResponse.draweeAddress, 'ICSknLabelSSPRegular42424215px', '380dp', '20dp', '0dp') : NA;
        draweeAndBankDetailsArray = [
          [{
            "lblHeader": {
              text: presenter.renderI18nKeys("i18n.TradeFinance.draweeAndCollectingBankDetails", false),
            },
            "flxDropDown": {
              onClick: scope.onActionClick.bind(this),
              cursorType: 'pointer',
            }
          }, // Section Header Template
          [{
            "lblGuaranteeDetailsRow": {
              text: presenter.renderI18nKeys("i18n.TradeFinance.draweeDetails", false),
              skin: "ICSknlbl424242SSP13pxSemibold"
            },
            "lblGuaranteeDetailsValue": {
              isVisible: false,
            }
          }, {
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.draweeName", true),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.draweeName ? presenter.getDynamicData(collectionResponse, 'draweeName') : NA,
              skin: modifiedFieldsArray.includes('draweeName') ? boldSkin : normalSkin,
            }
          },
          Object.assign({
            "lblKey": {
              text: presenter.renderI18nKeys("i18n.TradeFinance.draweeAddress", true),
              skin: "bbSknLbl727272SSP15Px",
            },
            "lblValue": {
              isVisible: draweeAddress == NA ? true : !draweeAddress['flxAddress']['isVisible'],
              text: NA,
              skin: modifiedFieldsArray.includes('draweeAddress') ? boldSkin : normalSkin,
            },
            template: "flxTempAmendGuarentPrint",
          }, draweeAddress), {
            "lblGuaranteeDetailsRow": {
              //i18n.TradeFinance.amountaAndAccountDetails
              text: presenter.renderI18nKeys("i18n.TradeFinance.collectingBankDetails", false),
              skin: "ICSknlbl424242SSP13pxSemibold",
            },
            "lblGuaranteeDetailsValue": {
              isVisible: false,
            },
          }, {
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.payee.bankname", false),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.collectingBank ? presenter.getDynamicData(collectionResponse, 'collectingBank') : NA,
              skin: modifiedFieldsArray.includes('collectingBank') ? boldSkin : normalSkin,
            }
          }, {
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.swift/BicCodeWithColon", false),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.swiftOrBicCode ? presenter.getDynamicData(collectionResponse, 'swiftOrBicCode') : NA,
              skin: modifiedFieldsArray.includes('swiftOrBicCode') ? boldSkin : normalSkin,
            }
          },
          Object.assign({
            "lblKey": {
              text: presenter.renderI18nKeys("i18n.TradeFinance.bankAddressWithColon", false),
              skin: "bbSknLbl727272SSP15Px",
            },
            "lblValue": {
              isVisible: bankAddress == NA ? true : !bankAddress['flxAddress']['isVisible'],
              text: NA,
              skin: modifiedFieldsArray.includes('collectingBankAddress') ? boldSkin : normalSkin,
            },
            template: "flxTempAmendGuarentPrint",
          }, bankAddress),
          ]
          ]
        ];
      } catch (err) {
        var errorObj = {
          "method": "draweeAndBankDetailsArray",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    documentAndBankInstruction: function () {
      var scope = this;
      try {
        documentAndBankInstructionArray = [
          [{
            "lblHeader": {
              text: presenter.renderI18nKeys("i18n.TradeFinance.documentsAndBankInstruction", false)
            },
            "flxDropDown": {
              onClick: scope.onActionClick.bind(this),
              cursorType: 'pointer',
            }
          }, // Section Header Template
          [{
            "lblGuaranteeDetailsRow": {
              text: presenter.renderI18nKeys("i18n.TradeFinance.uploadAndPhysicalDocumentCounts", false),
              skin: "ICSknlbl424242SSP13pxSemibold",
              //innerWidth:"preferred"
            },
            "lblGuaranteeDetailsValue": {
              isVisible: false,
            }
          }, {
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.uploadedDocumentsWithColon", false),
            "lblGuaranteeDetailsValue": {
              text: presenter.processDocsAndInstructionBills(collectionResponse,'uploadDocuments'),
              skin: modifiedFieldsArray.includes('uploadDocuments') ? boldSkin : normalSkin,
            }
          }, {
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.physicalDocumentDetailsWithColon", false),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.physicalDocuments ? presenter.getPhysicalDocumentCount(collectionResponse.physicalDocuments) : NA,
              skin: modifiedFieldsArray.includes('physicalDocuments') ? boldSkin : normalSkin,
            }
          }, {
            "lblGuaranteeDetailsRow": {
              //i18n.TradeFinance.amountaAndAccountDetails
              text: presenter.renderI18nKeys("i18n.TradeFinance.bankInstructions", false),
              skin: "ICSknlbl424242SSP13pxSemibold",
            },
            "lblGuaranteeDetailsValue": {
              isVisible: false,
            },
          }, {
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.IncoTerms", true),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.incoTerms ? presenter.getDynamicData(collectionResponse, 'incoTerms') : NA,
              skin: modifiedFieldsArray.includes('incoTerms') ? boldSkin : normalSkin,
            }
          }, {
			"flxGuaranteeDetailsRightRows": {
              "width": isTablet ? "35%" : "70%"
            },
            "flxGuaranteeDetailsValues": {
              "width": "100%"
            },
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.deliveryInstructionsOptional", true),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.deliveryInstructions ? presenter.getDynamicData(collectionResponse, 'deliveryInstructions') : NA,
              skin: modifiedFieldsArray.includes('deliveryInstructions') ? boldSkin : normalSkin,
              width: "100%"
            }
          }, {
            "flxGuaranteeDetailsRightRows": {
              "width": isTablet ? "35%" : "70%"
            },
            "flxGuaranteeDetailsValues": {
              "width": "100%"
            },
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.otherCollectionDetailsWithOptional", true),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.otherCollectionDetails ? presenter.getDynamicData(collectionResponse, 'otherCollectionDetails') : NA,
              skin: modifiedFieldsArray.includes('otherCollectionDetails') ? boldSkin : normalSkin,
              width: "100%"
            }
          }, {
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.MessageToBankOptional", false),
            "lblGuaranteeDetailsValue": {
              text: collectionResponse.messageToBank ? presenter.getDynamicData(collectionResponse, 'messageToBank') : NA,
              skin: modifiedFieldsArray.includes('messageToBank') ? boldSkin : normalSkin,
            }
          }, {
            "flxGuaranteeDetailsRightRows": {
              "width": isTablet ? "35%" : "70%"
            },
            "flxGuaranteeDetailsValues": {
              "width": "100%"
            },
            "lblGuaranteeDetailsRow": presenter.renderI18nKeys("i18n.TradeFinance.instructionForBills", true),
            "lblGuaranteeDetailsValue": {
              text: presenter.processDocsAndInstructionBills(collectionResponse, 'instructionsForBills'),
              skin: modifiedFieldsArray.includes('instructionsForBills') ? boldSkin : normalSkin,
              width: "100%"
            }
          },]
          ]
        ];
      } catch (err) {
        var errorObj = {
          "method": "documentAndBankInstructionArray",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    appendResponses: function () {
      var scope = this;
      try {
        scope.collectionOverView();
        if (collectionResponse.status.toLowerCase() === outwardConstants.settled) {
          scope.paymentDetails();
        } else if (collectionResponse.status.toLowerCase() === (outwardConstants.approved || outwardConstants.overdue)) {
          scope.draweeConsent();
        }
        scope.colletionDetails();
        scope.draweeAndBankDetails();
        scope.documentAndBankInstruction();
        let setSegData = [
          ...collectionOverViewArray,
          ...paymentStatusArray,
          ...draweeConsentArray,
          ...collectionDetailsArray,
          ...draweeAndBankDetailsArray,
          ...documentAndBankInstructionArray
        ];
        contentScope.segCollectionOverviewBody.setData(setSegData);
      } catch (err) {
        var errorObj = {
          "method": "appendResponses",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /** @api : onActionClick
      * Triggerd on click of dropdown in segment
      * @return : NA
      */
    onActionClick: function () {
      var scopeObj = this;
      try {
        var index = scopeObj.view.formTemplate12.flxContentTCCenter.segCollectionOverviewBody.selectedRowIndex;
        var sectionIndex = index[0];
        var data = scopeObj.view.formTemplate12.flxContentTCCenter.segCollectionOverviewBody.data;
        var selectedHeaderData = data[sectionIndex][0];
        if (this.segViewDetailsTempData === "") {
          this.segViewDetailsTempData = JSON.parse(JSON.stringify(contentScope.segCollectionOverviewBody.data));
        }
        if (selectedHeaderData["imgDropDown"] === "dropdown_expand.png") {
          selectedHeaderData["imgDropDown"] = "dropdown_collapse.png";
          data[sectionIndex][1] = this.segViewDetailsTempData[sectionIndex][1];
          //selectedHeaderData["flxSeparator2"].isVisible = true;
          contentScope.segCollectionOverviewBody.setData(data);
        } else {
          selectedHeaderData["imgDropDown"] = "dropdown_expand.png";
          data[sectionIndex][1] = [];
          //selectedHeaderData["flxSeparator2"].isVisible = false;
          contentScope.segCollectionOverviewBody.setData(data);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsViewDetailsController",
          "method": "onActionClick",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },

    //Amendment Listing 
    setTabNavigation: function (buttonId) {
      var scope = this;
      try {
        if (buttonId === TAB_COLLECTIONS) {
          scope.view.formTemplate12.pageTitle = kony.i18n.getCurrentLocale === "ar_AE" ? collectionResponse.collectionReference + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") : kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") + " - " + collectionResponse.collectionReference;
          contentScope.flxTabSwtichBottomSeparator.setVisibility(true);
          contentScope.btnTab1.skin = 'ICSknBtnAccountSummarySelected2';
          contentScope.btnTab2.skin = 'ICSknBtnAccountSummaryUnselected2';
          CURRENT_TAB = TAB_COLLECTIONS;
          contentScope.flxCollectionOverview.setVisibility(true);
          contentScope.flxAmendmentListing.setVisibility(false);
          contentScope.flxPagination.setVisibility(false);
          contentScope.flxButtonsActions.setVisibility(true);
          contentButtonScope.setVisibility(true);
        } else if (buttonId === TAB_AMENDMENTS) {
          scope.view.formTemplate12.pageTitle = kony.i18n.getCurrentLocale === "ar_AE" ? collectionResponse.collectionReference + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") : kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") + " - " + collectionResponse.collectionReference;
          contentScope.flxTabSwtichBottomSeparator.setVisibility(false);
          contentScope.btnTab1.skin = 'ICSknBtnAccountSummaryUnselected2';
          contentScope.btnTab2.skin = 'ICSknBtnAccountSummarySelected2';
          CURRENT_TAB = TAB_AMENDMENTS;
          contentScope.tbxSearch.text = "";
          contentScope.flxCollectionOverview.setVisibility(false);
          contentScope.flxAmendmentListing.setVisibility(true);
          contentScope.flxPagination.setVisibility(true);
          contentScope.flxButtonsActions.setVisibility(false);
          contentButtonScope.setVisibility(false);
          scope.setViewActions();
          scope.setDefaultSort("imgTabTwoListHeader4");
          CURRENT_ROW_TEMPLATE = 'flxTempInwardAmendmentList';
          CURRENT_EXPAND_ROW_TEMPLATE = 'flxTempInwardAmendmentListExpand';
          scope.setPaginationComponent(kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"));
          serviceParameters.filterByParam = "collectionReference";
          serviceParameters.filterByValue = collectionResponse.collectionReference ? collectionResponse.collectionReference : "NA";
          scope.fetchAmendmentsData();
        }
      } catch (err) {
        var errorObj = {
          "method": "setTabNavigation",
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
        var imageName = "";
        if (CURRENT_TAB === TAB_AMENDMENTS) {
          imageName = "flxTabTwoListHeader";
        }
        contentScope[imageName + 1].onClick = scope.sortRecords.bind(this, 1);
        contentScope[imageName + 2].onClick = scope.sortRecords.bind(this, 2);
        contentScope[imageName + 3].onClick = scope.sortRecords.bind(this, 3);
        contentScope[imageName + 4].onClick = scope.sortRecords.bind(this, 4);
        contentScope[imageName + 5].onClick = scope.sortRecords.bind(this, 5);
        contentScope[imageName + 6].onClick = scope.sortRecords.bind(this, 6);
        contentScope[imageName + 7] && (contentScope[imageName + 7].onClick = scope.sortRecords.bind(this, 7));
        scope.selectedTab = 1;
      } catch (err) {
        var errorObj = {
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
          contentScope[key].src = "sortingfinal_1.png";
        }
        contentScope[widget].src = "sorting_next.png";
      } catch (err) {
        var errorObj = {
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
        var imageName = "";
        if (CURRENT_TAB === TAB_AMENDMENTS) {
          imageName = "imgTabTwoListHeader";
        }
        var field = sortField[imageName + columnNo];
        if (contentScope[imageName + columnNo].src === "sortingfinal.png") {
          contentScope[imageName + columnNo].src = "sorting_previous.png";
          sortType = "DESC";
        } else if (contentScope[imageName + columnNo].src === "sorting_previous.png") {
          contentScope[imageName + columnNo].src = "sorting_next.png";
          sortType = "ASC";
        } else {
          contentScope[imageName + columnNo].src = "sorting_previous.png";
          sortType = "DESC";
        }
        for (var i = 1; i <= 7; i++) {
          if (i !== columnNo && contentScope[imageName + i]) {
            contentScope[imageName + i].src = "sortingfinal.png";
          }
        }
        serviceParameters.sortByParam = field;
        serviceParameters.sortOrder = sortType;
        scope.fetchAmendmentsData("sort");
      } catch (err) {
        var errorObj = {
          "method": "sortRecords",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setAmendmentsData
     * Set the amendments data in segment
     * @return : NA
     */
    setAmendmentsData: function () {
      var scope = this;
      try {
        if (Object.keys(serviceResponse).length > 0) {
          contentScope.segTransactionList.setVisibility(true);
          contentScope.flxNoTransactions.setVisibility(false);
          contentScope.flxPagination.setVisibility(true);
          contentScope.flxBtnConsolidatedView.setVisibility(true);
          scope.renderDataInDashboardList();
        } else {
          contentScope.segTransactionList.setVisibility(false);
          contentScope.flxNoTransactions.setVisibility(true);
          contentScope.flxPagination.setVisibility(false);
          contentScope.flxBtnConsolidatedView.setVisibility(false);
        }
        const offset = contentScope.flxPagination.PaginationContainer.getPageOffset();
        if (offset === 0) {
          contentScope.flxPagination.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
        } else {
          contentScope.flxPagination.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
        }
        if (serviceResponse.length > 10) {
          contentScope.flxPagination.PaginationContainer.imgPaginationNext.src = "pagination_next_active_container.png";
          contentScope.flxPagination.PaginationContainer.imgPaginationNext.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
        } else {
          contentScope.flxPagination.PaginationContainer.imgPaginationNext.src = "pagination_next_inactive.png";
        }
      } catch (err) {
        var errorObj = {
          "method": "setAmendmentsData",
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
        contentScope.flxPagination.PaginationContainer.setPageSize(10);
        contentScope.flxPagination.PaginationContainer.setLowerLimit(1);
        contentScope.flxPagination.PaginationContainer.setPageHeader(pageHeader);
        contentScope.flxPagination.PaginationContainer.setServiceDelegate(scope.fetchAmendmentsData.bind(scope, 'pagination'));
        contentScope.flxPagination.PaginationContainer.setIntervalHeader();
      } catch (err) {
        var errorObj = {
          "method": "setPaginationComponent",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    getSearchData: function () {
      var scope = this;
      try {
        var searchString = contentScope.tbxSearch.text;
        this.lowerLimit = 1;
        contentScope.flxPagination.PaginationContainer.setPageSize(10);
        if (searchString !== null && searchString !== undefined) {
          this.isSearchEnabled = true;
          if (CURRENT_TAB === TAB_AMENDMENTS) {
            serviceParameters.pageSize = pageConfig.pageSize;
            serviceParameters.pageOffset = pageConfig.pageOffset;
            serviceParameters.searchString = searchString;
            presenter.showOutwardCollectionScreen({
              context: 'outwardAmendments',
              form: scope.view.id,
              data: serviceParameters
            });
          }
        } else {
          this.isSearchEnabled = false;
        }
      } catch (err) {
        var errorObj = {
          "method": "getSearchData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : renderDataInDashboardList
     * Rendering data in dashboard listing segment
     * @arg: err - object based on error
     * @return : NA
     */
    renderDataInDashboardList: function () {
      var scope = this;
      try {
        let masterData = [];
        contentScope.segTransactionList.widgetDataMap = {
          lblColumn1: "lblColumn1",
          lblColumn2: "lblColumn2",
          lblColumn3: "lblColumn3",
          lblColumn4: "lblColumn4",
          lblColumn5: "lblColumn5",
          lblColumn6: "lblColumn6",
          flxColumn1: "flxColumn1",
          flxColumn2: "flxColumn2",
          flxColumn3: "flxColumn3",
          flxColumn4: "flxColumn4",
          flxColumn5: "flxColumn5",
          flxColumn6: "flxColumn6",
          flxColumn7: "flxColumn7",
          flxDropdown: "flxDropdown",
          lblRow1Column1Value1: "lblRow1Column1Value1",
          lblRow1Column1Value2: "lblRow1Column1Value2",
          imgDaysLeft: "imgDaysLeft",
          lblDaysLeft: "lblDaysLeft",
          imgDaysLeftTab: "imgDaysLeftTab",
          lblRow1Column1Value4: "lblRow1Column1Value4",
          lblRow1Column1Value5: "lblRow1Column1Value5",
          lblRow1Column1Title1: "lblRow1Column1Title1",
          lblRow1Column1Title2: "lblRow1Column1Title2",
          flxRow1Column1Title3: "flxRow1Column1Title3",
          lblRow2Column1Title1: "lblRow2Column1Title1",
          lblRow2Column2Title2: "lblRow2Column2Title2",
          lblRow1Column1Title4: "lblRow1Column1Title4",
          lblRow1Column1Title5: "lblRow1Column1Title5",
          lblRow2Column2Title3: "lblRow2Column2Title3",
          lblRow2Column2Title4: "lblRow2Column2Title4",
          btnDownload: "btnDownload",
          btnPrint: "btnPrint",
          btnAction: "btnAction",
          lblRow2Column1Value1: "lblRow2Column1Value1",
          lblRow2Column2Value2: "lblRow2Column2Value2",
          lblRow2Column2Value3: "lblRow2Column2Value3",
          lblRow2Column2Value4: "lblRow2Column2Value4",
          flxRowOne: "flxRowOne",
          flxRowTwo: "flxRowTwo",
          flxRow1Column1: "flxRow1Column1",
          flxRow1Column2: "flxRow1Column2",
          flxRow1Column3: "flxRow1Column3",
          flxRow1Column4: "flxRow1Column4",
          flxRow1Column5: "flxRow1Column5",
          flxRow1Column6: "flxRow1Column6",
          flxRow1Column7: "flxRow1Column7",
          flxRow2Column1: "flxRow2Column1",
          flxRow2Column2: "flxRow2Column2",
          flxRow2Column3: "flxRow2Column3",
          flxRow2Column4: "flxRow2Column4",
          flxTempInwardAmendmentListExpand: "flxTempInwardAmendmentListExpand",
          flxTempHeaderContainer: "flxTempHeaderContainer"
        };
        serviceResponse.map(singleResponse => {
          masterData.push({
            lblColumn1: singleResponse.corporateUserName ? singleResponse.corporateUserName : NA,
            lblColumn2: singleResponse.amendmentNo ? singleResponse.amendmentNo : NA,
            lblColumn3: singleResponse.amendmentReference ? singleResponse.amendmentReference : NA,
            lblColumn4: {
                text: isTablet ? singleResponse.amendmentReference ? singleResponse.amendmentReference : NA : singleResponse.updatedOn ? CommonUtilities.getFrontendDateString(singleResponse.updatedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA
            },                        
            lblColumn5: {
                text: isTablet ? singleResponse.updatedOn ? CommonUtilities.getFrontendDateString(singleResponse.updatedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA : singleResponse.amount ? singleResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(singleResponse.amount) : NA,
                right: isTablet ? '0%' : '14.7%',
            },
            lblColumn6: singleResponse.status ? singleResponse.status : NA,
            flxColumn1: {
              width: isTablet ? '15%' : '10%',
              right: isTablet ? '-3%' : '6%'
            },
            flxColumn2: {
              isVisible: isTablet ? false : true,
              width: isTablet ? '15%' : '10%',
            },
            flxColumn3: {
              isVisible: isTablet ? false : true,
              width: isTablet ? '18%' : '13%',
              left: isTablet ? '6%' : '3%'
            },
            flxColumn4: {
              width: isTablet ? '16%' : '7.7%',
              left: isTablet ? '6%' : '1%'
            },
            flxColumn5: {
              width: isTablet ? '17%' : '12.3%',
              left: isTablet ? '0%' : '0.8%'
            },
            flxColumn6: {
              width: isTablet ? '20%' : '13%',
              left: isTablet ? '10%' : '5.2%',
            },
            flxColumn7: {
              width: isTablet ? '16%' : '8%',
              left: isTablet ? '-5%' : '3%'
            },
            flxRowOne: {
              width: isTablet ? '81%' : '100%',
            },
            flxDropdown: {
              "onClick": scope.onSegmentRowToggle.bind(this)
            },
            flxTempHeaderContainer: {
              height: isTablet ? "25%" : "44dp"
            },
            btnAction: {
              "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
              "onClick": function () {
                presenter.showOutwardCollectionScreen({
                  context: "amendViewDetails",
                  form: scope.view.id,
                  data: singleResponse
                });
              }
            },
            btnPrint: {
              "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "isVisible": isTablet ? false : true,
              "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "onClick": function () {
                presenter.showOutwardCollectionScreen({
                  context: "amendmentPrint",
                  form: scope.view.id,
                  data: singleResponse
                });
              }
            },
            btnDownload: {
              "text": kony.i18n.getLocalizedString("i18n.common.Download"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
              "onClick": function () {
                presenter.generateOutwardAmendments({
                  "amendmentReference": singleResponse.amendmentReference
                }, "frmOutwardCollectionsViewDetails");
              }
            },
          });
        })
        contentScope.segTransactionList.setData(masterData);
      } catch (err) {
        var errorObj = {
          "method": "renderDataInDashboardList",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : onSegmentRowToggle
     * On clicking of expand image in segment row template
     * @return : NA
     */
    onSegmentRowToggle: function () {
      var scope = this;
      try {
        let index = contentScope.segTransactionList.selectedRowIndex;
        let rowIndex = index[1];
        let selectedRowDataObject;
        let segData = contentScope.segTransactionList.data;
        let singleResponse = serviceResponse[rowIndex];
        // Segment without section
        selectedRowDataObject = segData[rowIndex];
        if (!presenter.isEmptyNullOrUndefined(prevSelectedIndex)) {
          // Removing expand row template and assigning normal row template
          let prevSelectedRowDataObject;
          if (!presenter.isEmptyNullOrUndefined(segData[prevSelectedIndex])) {
            prevSelectedRowDataObject = segData[prevSelectedIndex];
            prevSelectedRowDataObject.template = CURRENT_ROW_TEMPLATE;
            prevSelectedRowDataObject.flxColumn3 = {
                isVisible: isTablet ? false : true,
                width: '13%',
            };
            prevSelectedRowDataObject.flxColumn4 = {
                width: isTablet ? '16%' : '7.7%',
                left: isTablet ? '6%' : '1%'
            };
              prevSelectedRowDataObject.flxColumn5 = {
                width: isTablet ? '17%' : '12.3%',
                left: isTablet ? '0%' : '0.8%'
              };
            prevSelectedRowDataObject.flxColumn6 = {
              width: isTablet ? '20%' : '13%',
              left: isTablet ? '9.5%' : '5.2%',
            };
            prevSelectedRowDataObject.flxColumn7 = {
              left: isTablet ? '0%' : '3%',
              width: isTablet ? '11.5%' : '8%'
            };
            contentScope.segTransactionList.setDataAt(prevSelectedRowDataObject, prevSelectedIndex);
            if (prevSelectedIndex === rowIndex) {
              prevSelectedIndex = null;
              return;
            }
          }
        }
        prevSelectedIndex = rowIndex;
        selectedRowDataObject.template = CURRENT_EXPAND_ROW_TEMPLATE;
        // Setting data at expanded row template
        selectedRowDataObject.flxRow1Column1 = {
          width: isTablet ? '16%' : '10%',
          right: isTablet ? '2%' : '6%'
        };
        selectedRowDataObject.flxRow1Column2 = {
          left: isTablet ? '4.5%' : '0%',
          width: isTablet ? '16%' : '10%',
        };
        selectedRowDataObject.flxRow1Column3 = {
          isVisible: isTablet ? false : false,
        };
        selectedRowDataObject.flxRow1Column4 = {
          isVisible: isTablet ? true : true,
          left: isTablet ? '12%' : '3%',
          width: isTablet ? '28.5%' : '12%'
        }
        selectedRowDataObject.flxRow1Column5 = {
          isVisible: isTablet ? false : true,
          left: '2%',
          width: '12%'
        };
        selectedRowDataObject.flxRow1Column6 = {
          isVisible: isTablet ? false : true
        };
        selectedRowDataObject.flxRow1Column7 = {
          left: isTablet ? '25%' : '14%',
          width: isTablet ? '11%' : '10%'
        };
        selectedRowDataObject.flxRowTwo = {
          isVisible: isTablet ? true : (singleResponse.cancellationStatus ? true : false)
        };
        selectedRowDataObject.flxRow2Column1 = {
          isVisible: true,
          width: '15%',
        };
        selectedRowDataObject.flxRow2Column2 = {
          isVisible: isTablet ? true : false,
          left: '-3%',
          width: '14.5%',
        };
        selectedRowDataObject.flxRow2Column3 = {
          isVisible: false
        };
        selectedRowDataObject.flxRow2Column4 = {
          isVisible: isTablet ? true : false,
          left: '7.5%'
        };
        selectedRowDataObject.flxColumn4 = {
          width: isTablet ? '16%' : '7.7%',
          left: isTablet ? '6%' : '1%'
        };
        selectedRowDataObject.flxColumn5 = {
          width: isTablet ? '17%' : '12.3%',
          left: isTablet ? '0%' : '0.8%'
        };
        selectedRowDataObject.flxColumn6 = {
          left: isTablet ? '9.5%' : '5.2%',
          width: isTablet ? '20%' : '13%'
        };
        selectedRowDataObject.flxColumn7 = {
          left: isTablet ? '0%' : '3%',
          width: isTablet ? '11.5%' : '8%'
        };
        selectedRowDataObject.flxTempInwardAmendmentListExpand = {
          height: isTablet ? "176dp" : singleResponse.cancellationStatus ? "176dp" : "111dp"
        };
        selectedRowDataObject.flxRowTwo = {
          isVisible: isTablet ? true : false
        };
        selectedRowDataObject.lblRow1Column1Title1 = {
          text: isTablet ? presenter.renderI18nKeys("i18n.TradeFinance.tenorType", false) : presenter.renderI18nKeys("i18n.TradeFinance.tenorType", false)
        };
        selectedRowDataObject.lblRow1Column1Title2 = {
          text: isTablet ? presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNo", false) : presenter.renderI18nKeys("i18n.konybb.Template.CreatedOn", false)
        };
        selectedRowDataObject.lblRow1Column1Title4 = {
          isVisible: true,
          text: isTablet ? presenter.renderI18nKeys("i18n.konybb.Common.Amount", false) : presenter.renderI18nKeys("i18n.accountDetail.maturityDate", false)
        };
        selectedRowDataObject.lblRow1Column1Title5 = {
          isVisible: isTablet ? false : true,
          text: presenter.renderI18nKeys("i18n.TradeFinance.collectingBank", false)
        };
        selectedRowDataObject.lblRow2Column1Title1 = {
          isVisible: true,
          text: isTablet ? presenter.renderI18nKeys("i18n.TradeFinance.collectingBank", false)  : scope.presenter.renderI18nKeys("i18n.TradeFinance.CancellationStatus", false)
        };
        selectedRowDataObject.lblRow2Column2Title2 = {
          text: presenter.renderI18nKeys("i18n.accountDetail.maturityDate", false)
        };
        selectedRowDataObject.lblRow2Column2Title4 = {
          text: presenter.renderI18nKeys("i18n.konybb.Template.CreatedOn", false)
        };
        if (isTablet) {
          selectedRowDataObject.lblRow1Column1Value1 = singleResponse.tenorType ? singleResponse.tenorType : NA;
          selectedRowDataObject.lblRow1Column1Value2 = singleResponse.amendmentNo ? singleResponse.amendmentNo : NA;
          selectedRowDataObject.lblRow1Column1Value4 = singleResponse.amount ? applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(singleResponse.amount, singleResponse.currency) : NA;
          selectedRowDataObject.lblRow2Column1Value1 = singleResponse.collectingBank ? singleResponse.collectingBank : NA;
          selectedRowDataObject.lblRow2Column2Value2 = singleResponse.maturityDate ? CommonUtilities.getFrontendDateString(singleResponse.maturityDate, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
          selectedRowDataObject.lblRow2Column2Value4 = singleResponse.createdOn ? CommonUtilities.getFrontendDateString(singleResponse.createdOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
        } else {
          selectedRowDataObject.lblRow1Column1Value1 = singleResponse.tenorType ? singleResponse.tenorType : NA;
          selectedRowDataObject.lblRow1Column1Value2 = singleResponse.createdOn ? CommonUtilities.getFrontendDateString(singleResponse.createdOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
          selectedRowDataObject.lblRow1Column1Value4 = singleResponse.maturityDate ? CommonUtilities.getFrontendDateString(singleResponse.maturityDate, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
          selectedRowDataObject.lblRow1Column1Value5 = singleResponse.collectingBank ? singleResponse.collectingBank : NA;
          selectedRowDataObject.lblRow2Column1Value1 = {
              text: singleResponse.cancellationStatus ? singleResponse.cancellationStatus : NA,
              skin : "ICSknlbl424242SSP15pxSemibold"
          }
        }
        // Updating the segment data/template at particular index
        contentScope.segTransactionList.setDataAt(selectedRowDataObject, rowIndex);
      } catch (err) {
        var errorObj = {
          "method": "postonSegmentRowToggleShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    navigateToConsolidatedView: function () {
      var scope = this;
      try {
        response = {};
        response["collectionResponse"] = collectionResponse;
        response["groupAmendmentResponse"] = serviceResponse;
        response["previousForm"] = scope.view.id;
        this.navManager.navigateTo({
          appName: "TradeFinanceMA",
          friendlyName: "OutwardCollectionsUIModule/frmOutwardCollectionAmendmentsConsolidatedView"
        }, false, response);
      } catch (err) {
        var errorObj = {
          "method": "navigateToConsolidatedView",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : fetchAmendmentsData
     * Fetch the Amenements data
     * @return : NA
     */
    fetchAmendmentsData: function (params) {
      try {
        var scope = this;
        if (params !== 'pagination' && params !== "sort") {
          contentScope.flxPagination.PaginationContainer.setLowerLimit(1);
          contentScope.flxPagination.PaginationContainer.setPageSize(10);
          contentScope.flxPagination.PaginationContainer.setIntervalHeader();
        }
        var searchStringtext = contentScope.tbxSearch.text;
        var pageOffsetValue = (params === "pagination" || params === "sort") ? contentScope.flxPagination.PaginationContainer.getPageOffset() : 0;
        serviceParameters.searchString = searchStringtext;
        serviceParameters.pageOffset = JSON.stringify(pageOffsetValue);
        if (CURRENT_TAB === TAB_AMENDMENTS) {
          presenter.showOutwardCollectionScreen({
            context: 'outwardAmendments',
            form: scope.view.id,
            data: serviceParameters
          });
        }
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsViewDetailsController",
          "method": "fetchAmendmentsData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /** @api : handlePopup
      * Triggerd on click of popups
      * @return : NA
      */
    handlePopup: function () {
      var scope = this;
      try {
        if (presenter.getDynamicData(collectionResponse, 'status') === "Approved") {
          scope.requestPaymentPopup(true);
        } else if (presenter.getDynamicData(collectionResponse, 'status') === "Overdue") {
          scope.requestBillOfExchangePopup(true);
        } else if ((presenter.getDynamicData(collectionResponse, 'status') === "Returned by Bank" && collectionResponse.returnedHistory) || (collectionResponse.status.toLowerCase() == presenter.outwardConstants.submittedToBank && localReturnedHistory.length > 1)) {
          scope.returnByBankHistoryPopup(true);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmOutwarCollectionsViewDetailsController",
          "method": "handlePopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    returnByBankHistoryPopup: function (visibility) {
      var scope = this;
      try {
        contentPopupScope.setVisibility(visibility);
        contentPopupScope.flxReturnByBankHistoryPopup.setVisibility(visibility);
        const userObj = applicationManager.getUserPreferencesManager().getUserObj();
        contentPopupScope.lblTopHeading.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnbyBankHistory")} (${localReturnedHistory.length - 1})`;
        contentPopupScope.segReturnedByBankHistory.widgetDataMap = {
          "lblReturnBank": "lblReturnBank",
          "lblReturnDate": "lblReturnDate",
          "lblKey1": "lblKey1",
          "lblValue1": "lblValue1",
          "lblKey2": "lblKey2",
          "lblValue2": "lblValue2",
          "lblKey3": "lblKey3",
          "lblValue3": "lblValue3",
        };
        let segReturnedHistoryData = [];
        for (let i = localReturnedHistory.length - 2; i >= 0; i--) {
          const record = localReturnedHistory[i];
          segReturnedHistoryData.push({
            "lblReturnBank": {
              "text": `${kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank")} (${this.getOrdinalNumeral(i + 1)})`
            },
            "lblReturnDate": {
              "text": record.returnedTimeStamp ? `${applicationManager.getFormatUtilManager().getFormattedCalendarDate(record.returnedTimeStamp)}, ${new Date(record.returnedTimeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}` : NA
            },
            "lblKey1": {
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForReturnedWithColon")
            },
            "lblValue1": {
              "text": record.reasonForReturn || NA
            },
            "lblKey2": {
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.messageToBankWithColon")
            },
            "lblValue2": {
              "text": record.messageToBank || NA
            },
            "lblKey3": {
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.corporateUserNameWithColon")
            },
            "lblValue3": {
              "text": record.corporateUserName || NA
            },
            "template": "flxLGReturnedHistory"
          });
        }
        contentPopupScope.segReturnedByBankHistory.setData(segReturnedHistoryData)
      } catch (err) {
        var errorObj = {
          "level": "frmOutwarCollectionsViewDetailsController",
          "method": "returnByBankHistoryPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    order: function (number) {
      if (number % 100 >= 11 && number % 100 <= 13) return number + "th";
      switch (number % 10) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
      }
      return number + "th";
    },

    /**
     * @api : getFormattedDate
     * This function is for formatting the date
     * @arg: NA
     * @return : NA
     */
    getFormattedDate: function (dateString) {
      var scope = this;
      try {
        var date = new Date(dateString);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var formatDate = date.getDate();
        if (formatDate < 10) {
          formatDate = "0" + formatDate;
        }
        if (month < 10) {
          month = "0" + month;
        }
        return month + "/" + formatDate + "/" + year;
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsViewDetailsController",
          "method": "getFormattedDate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    requestPaymentPopup: function (visibility) {
      var scope = this;
      try {
        contentPopupScope.setVisibility(visibility);
        contentPopupScope.flxRequestPaymentPopup.setVisibility(visibility);
        contentPopupScope.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.requestPaymentStatus");
        contentPopupScope.lblRequestMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ConfirmationPaymentStausTracer");
        contentPopupScope.lblMessageToBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankOptional");
        contentPopupScope.btnSend1.text = kony.i18n.getLocalizedString("i18n.common.send");
        contentPopupScope.btnCancel.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
        contentPopupScope.txtAreaMessageToBank.text = "";
        contentPopupScope.lblMessageCount.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsViewDetailsController",
          "method": "requestPaymentPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setTextAreaCount: function (txtBoxName, lblCountMessage) {
      var scope = this;
      try {
        let count = 140;
        let lengthText = contentPopupScope[txtBoxName].text.length;
        let totalCount = count - lengthText;
        contentPopupScope[lblCountMessage].text = totalCount + "/" + count;
        contentPopupScope.lblMessageCount.setVisibility(true);
        contentPopupScope.lblMessageCount02.setVisibility(true);
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsViewDetailsController",
          "method": "setTextAreaCount",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    requestBillOfExchangePopup: function (visibility) {
      var scope = this;
      try {
        contentPopupScope.setVisibility(visibility);
        contentPopupScope.flxRequestBillExchange.setVisibility(visibility);
        contentPopupScope.lblHeading01.text = kony.i18n.getLocalizedString("i18n.TradeFinance.requestPaymentStatus") + "/" + kony.i18n.getLocalizedString("i18n.TradeFinance.billOfExchange");
        contentPopupScope.lblRequestMessage01.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChooseOptionForRequest");
        contentPopupScope.lblPaymentStatus.text = kony.i18n.getLocalizedString("i18n.TradeFinance.paymentStatusWithTracer");
        contentPopupScope.lblBillExchange.text = kony.i18n.getLocalizedString("i18n.TradeFinance.billOfExchangeDocument");
        contentPopupScope.lblMessageToBank02.text = kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankOptional");
        contentPopupScope.btnSend2.text = kony.i18n.getLocalizedString("i18n.common.send");
        contentPopupScope.btnCancel2.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
        contentPopupScope.txtAreaMessageToBank02.text = "";
        contentPopupScope.lblPaymentFontIcon.text = presenter.resourcesConstants.fontIcons.radioSelected;
        contentPopupScope.lblBillExchangeFontIcon.text = presenter.resourcesConstants.fontIcons.radioUnselected;
        contentPopupScope.lblPaymentFontIcon.skin = presenter.resourcesConstants.skins.radioSelected;
        contentPopupScope.lblBillExchangeFontIcon.skin = presenter.resourcesConstants.skins.radioUnselected;
        contentPopupScope.lblMessageCount02.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsViewDetailsController",
          "method": "requestBillOfExchangePopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    ontoggleRadioButton: function (selectedWidget, unselectedWidget) {
      var scope = this;
      try {
        if (contentPopupScope[selectedWidget].text === "M") {
          contentPopupScope[selectedWidget].text = "L";
          contentPopupScope[selectedWidget].skin = "sknC0C0C020pxolbfonticons"
          contentPopupScope[unselectedWidget].text = "M";
          contentPopupScope[unselectedWidget].skin = "sknLblFontTypeIcon3343e820pxMOD";
        } else {
          contentPopupScope[unselectedWidget].text = "L";
          contentPopupScope[unselectedWidget].skin = "sknC0C0C020pxolbfonticons"
          contentPopupScope[selectedWidget].text = "M";
          contentPopupScope[selectedWidget].skin = "sknLblFontTypeIcon3343e820pxMOD";
        }
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsViewDetailsController",
          "method": "ontoggleRadioButton",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    requestPaymentStatusPopup: function () {
      var scope = this;
      try {
        currentPopup = "RequestPaymentStatus";
        presenter.updateRequestCollectionStatus({
          "collectionReference": collectionResponse.collectionReference,
          "requestSelection": "Payment Status",
          "messageToBank": contentPopupScope.txtAreaMessageToBank.text
        }, "frmOutwardCollectionsViewDetails");
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsViewDetailsController",
          "method": "requestPaymentStatusPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    billOfExchangeRequestPopup: function () {
      var scope = this;
      try {
        currentPopup = "RequestBillOfExchangeStatus";
        if (contentPopupScope.lblPaymentFontIcon.text === "M") {
          serviceResponses.requestSelection = "Payment Status";
        } else if (contentPopupScope.lblBillExchangeFontIcon.text === "M") {
          serviceResponses.requestSelection = "Bill of Exchange";
          isPaymentStatusBillOfExchange = true;
        }
        presenter.updateRequestCollectionStatus({
          "collectionReference": collectionResponse.collectionReference,
          "requestSelection": serviceResponses.requestSelection,
          "messageToBank": contentPopupScope.txtAreaMessageToBank02.text
        }, "frmOutwardCollectionsViewDetails");
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsViewDetailsController",
          "method": "popupButtonNavigation",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    renderSwiftAdvice: function () {
      var scope = this;
      try {
        paymentAdvices = presenter.isEmptyNullOrUndefined(swiftsAdvicesData.PaymentAdvices) ? [] : swiftsAdvicesData.PaymentAdvices;
        swiftMessages = presenter.isEmptyNullOrUndefined(swiftsAdvicesData.SwiftMessages) ? [] : swiftsAdvicesData.SwiftMessages;
        if (paymentAdvices.length > 0 || swiftMessages.length > 0) {
          contentButtonScope.btnSwiftAndAdvices.text = presenter.renderI18nKeys('i18n.TradeFinance.SwiftAndAdvices', false) + ' (' + (paymentAdvices.length + swiftMessages.length) + ')';
          contentButtonScope.btnSwiftAndAdvices.setVisibility(true);
          scope.renderSwiftAndAdvices();
        } else {
          contentButtonScope.btnSwiftAndAdvices.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "method": "renderSwiftAdvice",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    renderPrintAndDownload: function () {
      var scope = this;
      try {
        contentButtonScope.segVerticalDropdownEllipsis.widgetDataMap = {
          flxLCAccountType: 'flxLCAccountType',
          imgLCCheckbox: 'imgLCCheckbox',
          lblLCCheckbox: 'lblLCCheckbox',
          lblLCAccountType: 'lblLCAccountType'
        };

        let masterData = [];
        presenter.contextualMenuData.map(item => {
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
        contentButtonScope.segVerticalDropdownEllipsis.setData(masterData);
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
          if ((collectionResponse.status.toLowerCase() === presenter.outwardConstants.approved) || (collectionResponse.status.toLowerCase() === presenter.outwardConstants.overdue)) {
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

    onPrintAndDownloadRowClick: function (id) {
      var scope = this;
      try {
        contentButtonScope.flxVerticalEllipsisDropdown.setVisibility(false);
        if (id == 'download') {
          presenter.generateOutwardCollections({
              "collectionReference": collectionResponse.collectionReference
          }, "frmOutwardCollectionsViewDetails");
      } else if (id == 'print') {
          let dataObj = {
              navData: collectionResponse,
              previousFormName: 'frmOutwardCollectionsViewDetails',
              pageTitle: 'i18n.TradeFinance.outwardCollection'
          };
          presenter.showOutwardCollectionScreen({
              context: 'outwardCollectionPrint',
              data: dataObj
          });
        } else if (id == 'raiseQuery') {
          let record = collectionResponse;
          let queryObj = {};
          let tempMaturityDate = presenter.calculateMaturityDate(record.maturityDate);
          let formattedACNumber = scope.morphAcNumber(record.debitAccount);
          queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${record.collectionReference}`;
          queryObj.descriptionObj = {};
          record.maturityDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.accountDetail.maturityDate")] = presenter.getConvertedDate(record, 'maturityDate'));
          tempMaturityDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.daysLeftTopay")] = tempMaturityDate.daysLeftToPay);
          (record.debitAccount) && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.amountDebitedFrom")] = formattedACNumber);
          record.incoTerms && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.IncoTerms")] = record.incoTerms);
          record.tenorType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.tenorType")] = record.tenorType);
          queryObj.tradeModule = true;
          presenter.showMessagesScreen(queryObj);
        }
      } catch (err) {
        var errorObj = {
          "method": "onPrintAndDownloadRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    renderSwiftAndAdvices: function () {
      var scope = this;
      try {
        contentButtonScope.segSwiftAndAdvices.widgetDataMap = {
          lblValue: 'lblValue',
          flxFrmReceivedGuaranteeSwiftAdvice: 'flxFrmReceivedGuaranteeSwiftAdvice'
        };

        let paymentAdvicesMasterData = [];
        paymentAdvices.map(item => {
          paymentAdvicesMasterData.push({
            flxFrmReceivedGuaranteeSwiftAdvice: {
              cursorType: 'pointer',
              onClick: scope.swiftAndAdvicesOnRowClick.bind(scope, item)
            },
            lblValue: `${presenter.renderI18nKeys('i18n.TradeFinance.PaymentAdvice', false)} (${CommonUtilities.getFrontendDateStringInUTC(item.uploadedTimeStamp, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"))})` 
          });
        });

        let swiftMessagesMasterData = [];
        swiftMessages.map(item => {
          swiftMessagesMasterData.push({
            flxFrmReceivedGuaranteeSwiftAdvice: {
              cursorType: 'pointer',
              onClick: scope.swiftAndAdvicesOnRowClick.bind(scope, item)
            },
            lblValue: `${presenter.renderI18nKeys('i18n.TradeFinance.swiftMtAdviceOF', false)} (${CommonUtilities.getFrontendDateStringInUTC(item.uploadedTimeStamp, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"))})`
          });
        });

        let masterData = [
          ...paymentAdvicesMasterData,
          ...swiftMessagesMasterData,
        ];
        contentButtonScope.segSwiftAndAdvices.setData(masterData);
      } catch (err) {
        var errorObj = {
          "method": "renderSwiftAndAdvices",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    swiftAndAdvicesOnRowClick: function (selectedItem) {
      var scope = this;
      try {
        contentButtonScope.flxSwiftAndAdvices.setVisibility(false);
        let payload = {
          fileName: selectedItem.fileName,
          fileId: selectedItem.fileId
        };
        if (selectedItem.category == 'SWIFT') {
          contentPopupScope.lblTopSwiftMessageHeading.text = 'SWIFT MT ### - Advice of Outward Collection' + ' (' + CommonUtilities.getFrontendDateStringInUTC(selectedItem.uploadedTimeStamp, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")) + ')';
        } else {
          contentPopupScope.lblTopSwiftMessageHeading.text = presenter.renderI18nKeys('i18n.TradeFinance.PaymentAdvice', false) + ' (' + CommonUtilities.getFrontendDateStringInUTC(selectedItem.uploadedTimeStamp, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")) + ')';
        }
        presenter.fetchFileResponse(payload, 'frmOutwardCollectionsViewDetails');
        contentPopupScope.flxDownloadIcons.onClick = () => {
          let downloadUrl = `${KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url}/operations/LCDocuments/downloadDocument`;
          CommonUtilities.downloadAttachment(downloadUrl, {"fileId": selectedItem.fileId});
        };
      } catch (err) {
        var errorObj = {
          "method": "swiftAndAdvicesOnRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    getOrdinalNumeral: function (n) {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    },

    morphAcNumber: function (inputAcID) {
      var scope = this;
      try {
        let accountList = applicationManager.getConfigurationManager().userAccounts;
        for (let i = 0; i < accountList.length; i++) {
          if (accountList[i].accountID == inputAcID) {
            return CommonUtilities.mergeAccountNameNumber(accountList[i].nickName || accountList[i].accountName, accountList[i].accountID);
          }
        }
        return NA;
      } catch (err) {
        var errorObj = {
          "method": "morphAcNumber",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    renderPageTitle: function () {
        var scope = this;
        try {
            let localPageTitle;
            if (presenter.outwardConstants.updateOutwardCollection) {
              // Navigation from revise collection
              presenter.outwardConstants.updateOutwardCollection = false;
              localPageTitle = kony.i18n.getCurrentLocale === "ar_AE" ?
              `${kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement")} - Revise Details - ${kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection")}`
              :
              `${kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection")} - Revise Details - ${kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement")}`;
            } else {
              // Navigation from create new collection
              localPageTitle = kony.i18n.getCurrentLocale === "ar_AE" ?
              `${kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement")} - ${kony.i18n.getLocalizedString("i18n.TradeFinance.createNewRequest")} - ${kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection")}`
              :
              `${kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection")} - ${kony.i18n.getLocalizedString("i18n.TradeFinance.createNewRequest")} - ${kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement")}`;
            }
            scope.view.formTemplate12.pageTitle = localPageTitle;
        } catch (err) {
            var errorObj = {
                "method": "renderPageTitle",
                "error": err
            };
            scope.onError(errorObj);
        }
    },

    onError: function (err) {
      let errMsg = JSON.stringify(err);
      errMsg.level = " frmOutwardCollectionsViewDetailsController";
      // kony.ui.Alert(errMsg);
    },
  };
});
