define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let collectionData;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let serviceResponse = {};
  let isTablet = false;
  let prevSelectedIndex;
  let contentScope;
  let contentPopupScope;
  let contentButtonScope;
  let confirmPopupScope;
  let payLoad;
  let response = {};
  const HEADER = 'header';
  const SWIFT_TAG = 'swiftTag';
  const SWIFT_MESSAGE_HEADER = "*********************SWIFT AUTH. CORRECT************************";
  const SWIFT_MESSAGE_DETAILS = "*********************MESSAGE************************";
  const SWIFT_MESSAGE_FOOTER = " *****************************End of Message**************************";
  const SWIFT_AUTH_BCODE = "Bcode";
  const SWIFT_AUTH_BIC = "BIC";
  const SWIFT_AUTH_TRANSFERDATEORTIME = "Transfer Date/Time";
  const SWIFT_AUTH_TYPE = "Type";
  let TAB_COLLECTIONS = kony.i18n.getLocalizedString("i18n.TradeFinance.collections"),
    TAB_AMENDMENTS = kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"),
    CURRENT_TAB, CURRENT_ROW_TEMPLATE, CURRENT_EXPAND_ROW_TEMPLATE;
  this.serviceParameters = {
    "searchString": "",
    "pageSize": "",
    "pageOffset": "",
    "sortByParam": "amendmentNo",
    "sortOrder": "DESC",
    "timeParam": "createdDate",
    "timeValue": "6,MONTH",
    "filterByValue": "",
    "filterByParam": ""
  };
  let isAmendViewDetailsonClick = false;
  let isPrintNavigation = false;
  let selectedRecord = {};
  let flowType = "";
  this.sortField = {
    "imgTabTwoListHeader1": "drawer",
    "imgTabTwoListHeader2": "amendmentNo",
    "imgTabTwoListHeader3": "tenorType",
    "imgTabTwoListHeader4": "receivedOn",
    "imgTabTwoListHeader5": "amount",
    "imgTabTwoListHeader6": "status",
  };
  let isCollectionSrmsIdServiceTriggered = false;
  let ViewAllCollections = kony.i18n.getLocalizedString("i18n.TradeFinance.viewAllCollections");
  let Accepted = kony.i18n.getLocalizedString("i18n.TradeFinance.Accepted");
  let Rejected = kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected");
  let todaysDate;
  let debitAmountFrom;
  let debitChargesFrom;
  return {

    /**
     * @api : init
     * This function for executing the lines of code only once
     * @return : NA
     */
    init: function () {
      this.segViewDetailsTempData = "";
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
    },

    /**
     * @api : onNavigate
     * This function for executing the preShow and postShow
     * @return : NA
     */
    onNavigate: function (data = {}) {
      var scope = this;
      this.presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeFinanceMA',
        'moduleName': 'InwardCollectionsUIModule'
      });
      collectionData = data.serviceResponse ? data.serviceResponse.collectionResponse : (data.collectionResponse ? data.collectionResponse : data);
      if (data.flowType) {
        data.flowType === ViewAllCollections ? flowType = TAB_COLLECTIONS : flowType = TAB_AMENDMENTS;
      } else if (kony.sdk.isNullOrUndefined(data.flowType)) {
        flowType = TAB_COLLECTIONS;
        collectionData = JSON.parse(JSON.stringify(this.presenter.collectionData));
      }
      if (data.previousFormName === 'frmInwardCollectionAmedmentsConsolidatedView')
        scope.setTabNavigation(TAB_AMENDMENTS)
    },

    /**
     * @api : preShow
     * This function for executing the primary functions before rendering UI
     * @return : NA
     */
    preShow: function () {
      var scope = this;
      try {
        contentScope = this.view.formTemplate12.flxContentTCCenter;
        contentPopupScope = this.view.formTemplate12.flxContentPopup;
        contentButtonScope = this.view.formTemplate12.flxTCButtons;
        confirmPopupScope = this.view.formTemplate12.flxContentPopup.flxConfirmPopup.ConfirmPopup;
        scope.setDefaultUI();
        scope.setAccountsDropdown(contentScope.segDebitAccount.id);
        scope.setAccountsDropdown(contentScope.segChargesDebitAccount.id);
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsViewDetailsController",
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
        scope.initButtonActions();
        scope.setInwardCollectionsDetails(false);
        scope.renderSwiftAndAdvices();
        contentButtonScope.flxVerticalEllipsisDropdown.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsViewDetailsController",
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
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          isTablet = true;
          contentButtonScope.flxPrint.setVisibility(false);
        }
        else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
          isTablet = false;
          contentButtonScope.flxPrint.setVisibility(true);
        }
        for (let i = 2; i <= 6; i++) {
          contentScope[`flxTabTwoListHeader${i}`].width = isTablet ? '18%' : '10%';
        }
        if (CURRENT_TAB === TAB_AMENDMENTS) {
          scope.responsiveDesignOfAmendmentTab();
          if (Object.keys(serviceResponse).length > 0) scope.renderDataInDashboardList();
        }
		if(currentBreakpoint > 640 && currentBreakpoint >= 1024){
			this.view.formTemplate12.flxContentPopup.flxSwiftMessageDetails.width = "670dp";
			this.view.formTemplate12.flxContentPopup.flxSwiftMessageDetails.left = "6%";
			
		}
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsViewDetailsController",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : initButtonActions
     * This function is for defining the widget actions
     * @return : NA
     */
    initButtonActions: function () {
      var scope = this;
      try {
        contentButtonScope.lblVerticalEllipsis.onTouchEnd = () => {
          if(contentButtonScope.flxVerticalEllipsisDropdown.isVisible) {
            contentButtonScope.flxVerticalEllipsisDropdown.setVisibility(false);
          }
          else {
            contentButtonScope.flxVerticalEllipsisDropdown.setVisibility(true);
          }
        };
        contentButtonScope.flxVerticalEllipsisBody.onClick = this.renderPrintAndDownload.bind(this);
        scope.setTabNavigation(flowType);
        contentScope.flxRejectCollectionRadio.onClick = this.radioOnClick.bind(this, "rejectCollection");
        contentScope.flxAcceptCollectionRadio.onClick = this.radioOnClick.bind(this, "acceptCollection");
        contentScope.flxRejectUsanceRadio.onClick = this.radioOnClick.bind(this, "rejectUsance");
        contentScope.flxAcceptUsanceRadio.onClick = this.radioOnClick.bind(this, "acceptUsance");
        contentScope.btnSubmitConsent.onClick = function () {
          scope.ShowConfirmPopup();
        };
        contentScope.btnTab1.onClick = scope.setTabNavigation.bind(this, TAB_COLLECTIONS);
        contentScope.btnTab2.onClick = scope.setTabNavigation.bind(this, TAB_AMENDMENTS);
        contentScope.btnViewConsolidated.doLayout = function(){
          contentScope.btnViewConsolidated.info.frame = contentScope.btnViewConsolidated.frame;
        }
        contentScope.btnViewConsolidated.onClick = scope.navigateToConsolidatedView.bind(this);
        contentScope.btnTab1.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.collections", false);
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
        contentScope.btnBack.onClick = scope.buttonNavigation.bind(this, "back", collectionData);
        contentScope.btnBackOverview.onClick = scope.buttonNavigation.bind(this, "back", collectionData);
        contentScope.btnViewAllCollections.onClick = scope.buttonNavigation.bind(this, "back", collectionData);
        contentScope.flxAmountDebitAccountDropdown.onClick = this.showOrHideAccounts.bind(this, contentScope.segDebitAccount.id);
        contentScope.flxChargesDebitAccountDropdown.onClick = this.showOrHideAccounts.bind(this, contentScope.segChargesDebitAccount.id);
        contentScope.flxClear.onClick = function () {
          contentScope.flxAcknowledgementMessage.setVisibility(false);
        };
        contentScope.flxErrorClose.onClick = function () {
          contentScope.flxErrorMessage.setVisibility(false);
        };
        contentPopupScope.flxCross.onClick = scope.closePopup.bind(scope, 'flxSwiftDetailsPopup');
        contentPopupScope.flxSearchClose.onClick = scope.closePopup.bind(scope, 'flxPaymentAdvicePopup');
        contentScope.txtReasonForSelfRejection.onTextChange = scope.enableOrDisableSubmit.bind(this);
        scope.inwardAmendmentsPermission = applicationManager.getConfigurationManager().checkUserPermission('INWARD_COLLECTIONS_AMENDMENTS_VIEW');
        if (scope.inwardAmendmentsPermission === true) {
          contentScope.btnTab2.setVisibility(true);
        }
        else {
          contentScope.btnTab2.setVisibility(false);
        }
        contentScope.flxDropDown.cursorType = 'pointer';
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsViewDetailsController",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
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
      if (viewModel.serverError) {
        contentScope.lblErrorMessage.text = viewModel.serverError;
        scope.setAcknowledgementUI(false);
      }
      if (viewModel.amendmentsListServerError) {
        contentScope.lblErrorMessage.text = viewModel.amendmentsListServerError;
        scope.setAcknowledgementUI(false);
        contentScope.flxSelfAcceptance.setVisibility(false);
        contentScope.flxMainCollectionAndAmend.top = '10px';
      }
      if (viewModel.InwardCollectionAmendments && !isAmendViewDetailsonClick) {
        serviceResponse = viewModel.InwardCollectionAmendments;
        scope.setAmendmentsData();
      }
      if (viewModel.UpdateInwardCollection) {
        contentScope.lblMessage.text = collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.APPROVED).toLowerCase() ? scope.presenter.renderI18nKeys("i18n.TradeFinance.PaymentInitiationSubmit", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.CollectionConsent", false);
        scope.setAcknowledgementUI(true);
      }
      if ((isAmendViewDetailsonClick || isPrintNavigation) && CURRENT_TAB === TAB_AMENDMENTS && viewModel.amendmentSrmsId) {
        selectedRecord["amendmentResponse"] = viewModel;
        scope.presenter.getInwardCollectionsById({
          "collectionSrmsId": viewModel.collectionSrmsId
        }, "frmInwardCollectionsViewDetails");
      }
      if (viewModel.SwiftMessages && CURRENT_TAB === TAB_AMENDMENTS) {
        let serviceResponse = {
          collectionResponse: viewModel,
          amendmentResponse: selectedRecord
        };
        let dataObj = {
          serviceResponse,
          previousFormName: 'frmInwardCollectionsViewDetails'
        };
        if (isPrintNavigation) {
          // Navigate to Amendments Print
          isPrintNavigation = false;
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "InwardCollectionsUIModule/frmInwardCollectionAmendmentPrint"
          }).navigate(dataObj);
        } else if (isAmendViewDetailsonClick) {
          // Navigate to Amendments ViewDetails
          isAmendViewDetailsonClick = false;
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "InwardCollectionsUIModule/frmInwardCollectionAmendmentViewDetails"
          }).navigate(dataObj);
        }
      }
    },

    /**
     * @api : setAcknowledgementUI
     * This function to set UI based on the service response.
     * @return : NA
     */
    setAcknowledgementUI: function (param) {
      var scope = this;
      try {
        collectionData.status = param ? OLBConstants.INWARD_COLLECTIONS_STATUS.SUBMITTED_TO_BANK : collectionData.status;
        contentScope.flxErrorMessage.setVisibility(!param);
        contentButtonScope.flxVerticalEllipsisBodyContent.setVisibility(!param);
        //contentButtonScope.flxDownload.setVisibility(!param);
        contentScope.flxAcknowledgementMessage.setVisibility(param);
        contentScope.flxViewCollectionsButtons.setVisibility(param);
        contentScope.flxButtons.setVisibility(!param);
        contentScope.flxSelfAcceptance.setVisibility(!param);
        scope.view.formTemplate12.pageTitle = kony.i18n.getCurrentLocale() === 'ar_AE' ? scope.presenter.renderI18nKeys("i18n.wealth.acknowledgement") + " - " + collectionData.collectionSrmsId + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.inwardCollection") : scope.presenter.renderI18nKeys("i18n.TradeFinance.inwardCollection") + " - " + collectionData.collectionSrmsId + " - " + scope.presenter.renderI18nKeys("i18n.wealth.acknowledgement") ;
        scope.closePopup('flxDraweeConsentPopup');
        collectionData.draweeAcknowledgement = payLoad.draweeAcknowledgement;
        scope.setInwardCollectionsDetails(param);
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsViewDetailsController",
          "method": "setAcknowledgementUI",
          "error": err
        };
        scope.onError(errorObj);
      }

    },

    /**
     * @api : submitDraweeConsent
     * This function to submit drawee consent.
     * @return : NA
     */
    submitDraweeConsent: function () {
      var scope = this;
      try {
        payLoad = {
          "amendmentDetails": scope.presenter.isEmptyNullOrUndefined(collectionData.amendmentDetails) ? "" : collectionData.amendmentDetails,
          "amount": scope.presenter.isEmptyNullOrUndefined(collectionData.amount) ? "" : collectionData.amount,
          "billExchangeStatus": scope.presenter.isEmptyNullOrUndefined(collectionData.billExchangeStatus) ? "" : collectionData.billExchangeStatus,
          "charges": scope.presenter.isEmptyNullOrUndefined(collectionData.charges) ? "" : collectionData.charges,
          "chargesDebitFrom": scope.presenter.isEmptyNullOrUndefined(contentScope.lblSelectedChargesDebitAccount.text) || contentScope.lblSelectedChargesDebitAccount.text === scope.presenter.renderI18nKeys("i18n.common.selecthere", false) ? "" : debitChargesFrom,
          "collectionSrmsId": scope.presenter.isEmptyNullOrUndefined(collectionData.collectionSrmsId) ? "" : collectionData.collectionSrmsId,
          "createdDate": scope.presenter.isEmptyNullOrUndefined(collectionData.createdDate) ? "" : CommonUtilities.getBackendDateFormat(scope.presenter.getConvertedDate(collectionData, 'createdDate'), "mm/dd/yyyy"),
          "currency": scope.presenter.isEmptyNullOrUndefined(collectionData.currency) ? "" : collectionData.currency,
          "debitAmountFrom": scope.presenter.isEmptyNullOrUndefined(contentScope.lblSelectedDebitAccount.text) || contentScope.lblSelectedDebitAccount.text === scope.presenter.renderI18nKeys("i18n.common.selecthere", false) ? "" : debitAmountFrom,
          "documentNo": scope.presenter.isEmptyNullOrUndefined(collectionData.documentNo) ? "" : collectionData.documentNo,
          "documentsUploaded": scope.presenter.isEmptyNullOrUndefined(collectionData.documentsUploaded) ? "" : collectionData.documentsUploaded,
          "draweeAcknowledgement": scope.presenter.isEmptyNullOrUndefined(contentScope.lblAcceptCollectionRadio.text) ? "" : contentScope.lblAcceptCollectionRadio.text === scope.presenter.resourcesConstants.fontIcons.radioSelected ? Accepted : Rejected,
          "draweeAcknowledgementDate": scope.presenter.isEmptyNullOrUndefined(collectionData.draweeAcknowledgement) ? "" : collectionData.draweeAcknowledgement,
          "drawerName": scope.presenter.isEmptyNullOrUndefined(collectionData.drawerName) ? "" : collectionData.drawerName,
          "incoTerms": scope.presenter.isEmptyNullOrUndefined(collectionData.incoTerms) ? "" : collectionData.incoTerms,
          "lastUpdatedDate": CommonUtilities.getBackendDateFormat(todaysDate, "mm/dd/yyyy"),
          "maturityDate": scope.presenter.isEmptyNullOrUndefined(collectionData.maturityDate) ? "" : collectionData.maturityDate,
          "messageFromBank": scope.presenter.isEmptyNullOrUndefined(collectionData.messageFromBank) ? "" : collectionData.messageFromBank,
          "messageToBank": scope.presenter.isEmptyNullOrUndefined(contentScope.txtMessageToBank.text) ? "" : contentScope.txtMessageToBank.text,
          "paymentStatus": scope.presenter.isEmptyNullOrUndefined(collectionData.paymentStatus) ? "" : collectionData.paymentStatus,
          "reasonForRejection": contentScope.lblRejectCollectionRadio.text === this.presenter.resourcesConstants.fontIcons.radioSelected ? scope.presenter.isEmptyNullOrUndefined(contentScope.txtReasonForSelfRejection.text) ? "" : contentScope.txtReasonForSelfRejection.text : "",
          "reasonForReturn": scope.presenter.isEmptyNullOrUndefined(collectionData.reasonForReturn) ? "" : collectionData.reasonForReturn,
          "receivedOn": scope.presenter.isEmptyNullOrUndefined(collectionData.receivedOn) ? "" : collectionData.receivedOn,
          "remittingBank": scope.presenter.isEmptyNullOrUndefined(collectionData.remittingBank) ? "" : collectionData.remittingBank,
          "settledDate": scope.presenter.isEmptyNullOrUndefined(collectionData.settledDate) ? "" : collectionData.settledDate,
          "status": scope.presenter.isEmptyNullOrUndefined(collectionData.status) ? "" : collectionData.status,
          "tenorType": scope.presenter.isEmptyNullOrUndefined(collectionData.tenorType) ? "" : collectionData.tenorType,
          "transactionReference": scope.presenter.isEmptyNullOrUndefined(collectionData.collectionSrmsId) ? "" : collectionData.collectionSrmsId,
          "usanceAcceptance": scope.presenter.isEmptyNullOrUndefined(contentScope.lblAcceptUsanceRadio.text) ? "" : contentScope.lblAcceptUsanceRadio.text === scope.presenter.resourcesConstants.fontIcons.radioSelected ? Accepted : Rejected,
          "usanceAcceptanceDate": CommonUtilities.getBackendDateFormat(todaysDate, "mm/dd/yyyy"),
          "usanceAcceptanceEligibility": scope.presenter.isEmptyNullOrUndefined(collectionData.usanceAcceptanceEligibility) ? "" : collectionData.usanceAcceptanceEligibility,
          "usanceDetails": scope.presenter.isEmptyNullOrUndefined(collectionData.usanceDetails) ? "" : collectionData.usanceDetails,
        }
        scope.presenter.UpdateInwardCollections(payLoad, "frmInwardCollectionsViewDetails");
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsViewDetailsController",
          "method": "submitDraweeConsent",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : radioOnClick
     * This function to handle the radio button click.
     * @return : NA
     */
    radioOnClick: function (param) {
      switch (param) {
        case 'acceptUsance': {
          this.setRadioOptions(contentScope.lblRejectUsanceRadio, false);
          this.setRadioOptions(contentScope.lblAcceptUsanceRadio, true);
          break;
        }
        case 'rejectUsance': {
          this.setRadioOptions(contentScope.lblRejectUsanceRadio, true);
          this.setRadioOptions(contentScope.lblAcceptUsanceRadio, false);
          break;
        }
        case 'acceptCollection': {
          this.setRadioOptions(contentScope.lblRejectCollectionRadio, false);
          this.setRadioOptions(contentScope.lblAcceptCollectionRadio, true);
          contentScope.flxDebitAndChargesAccount.setVisibility(true);
          contentScope.flxReasonForSelfRejection.setVisibility(false);
          contentScope.flxMessageToBank.setVisibility(true);
          if (!(this.presenter.isEmptyNullOrUndefined(collectionData.tenorType)) && collectionData.tenorType === "Usance") {
            contentScope.flxAcceptOrRejectUsance.setVisibility(true);
          } else {
            contentScope.flxAcceptOrRejectUsance.setVisibility(false);
          }
          break;
        }
        case 'rejectCollection': {
          this.setRadioOptions(contentScope.lblRejectCollectionRadio, true);
          this.setRadioOptions(contentScope.lblAcceptCollectionRadio, false);
          contentScope.flxDebitAndChargesAccount.setVisibility(false);
          contentScope.flxReasonForSelfRejection.setVisibility(true);
          contentScope.flxMessageToBank.setVisibility(true);
          contentScope.flxAcceptOrRejectUsance.setVisibility(false);
          break;
        }
      }
      this.enableOrDisableSubmit();
    },

    /**
     * @api : enableOrDisableSubmit
     * This function to set enable/disable submit button based on the user input.
     * @return : NA
     */
    enableOrDisableSubmit: function () {
      var scope = this;
      let usanceResponse = collectionData.tenorType.toLowerCase() === "usance" ? (contentScope.lblRejectUsanceRadio.text === scope.presenter.resourcesConstants.fontIcons.radioSelected || contentScope.lblAcceptUsanceRadio.text === scope.presenter.resourcesConstants.fontIcons.radioSelected) : true;
      let approved = collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.APPROVED).toLowerCase() ? (contentScope.lblSelectedChargesDebitAccount.text !== "" && (contentScope.lblSelectedChargesDebitAccount.text !== scope.presenter.renderI18nKeys("i18n.common.selecthere", false)) &&
        (contentScope.lblSelectedDebitAccount.text !== "" && (contentScope.lblSelectedDebitAccount.text !== scope.presenter.renderI18nKeys("i18n.common.selecthere", false)))) : true;
      if ((contentScope.lblAcceptCollectionRadio.text === scope.presenter.resourcesConstants.fontIcons.radioSelected
        || collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.APPROVED).toLowerCase()) ? (contentScope.lblAcceptCollectionRadio.text === scope.presenter.resourcesConstants.fontIcons.radioSelected && contentScope.lblSelectedChargesDebitAccount.text !== "" && contentScope.lblSelectedChargesDebitAccount.text !== scope.presenter.renderI18nKeys("i18n.common.selecthere", false) && usanceResponse && approved) : (contentScope.lblRejectCollectionRadio.text === scope.presenter.resourcesConstants.fontIcons.radioSelected && contentScope.txtReasonForSelfRejection.text !== "")) {
        this.enableOrDisableButton(contentScope.btnSubmitConsent, true);
      } else {
        this.enableOrDisableButton(contentScope.btnSubmitConsent, false);
      }
    },

    /**
     * @api : setDefaultUI
     * This function to set default UI when landing on screen.
     * @return : NA
     */
    setDefaultUI: function () {
      var scope = this;
      try {
        CURRENT_TAB = TAB_COLLECTIONS;
        isDrawingConsentSubmitted = false;
        contentScope.txtMessageToBank.text = "";
        contentScope.txtReasonForSelfRejection.text = "";
        contentScope.flxSelfAcceptance.setVisibility(true);
        contentScope.btnSubmitConsent.setVisibility(true);
        contentScope.lblMessage.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.CollectionConsent", false);
        if (collectionData.status.toLowerCase() !== (OLBConstants.INWARD_COLLECTIONS_STATUS.NEW).toLowerCase() && collectionData.status.toLowerCase() !== (OLBConstants.INWARD_COLLECTIONS_STATUS.RETURNED_BY_BANK).toLowerCase() && collectionData.status.toLowerCase() !== (OLBConstants.INWARD_COLLECTIONS_STATUS.OVERDUE).toLowerCase() && collectionData.status.toLowerCase() !== (OLBConstants.INWARD_COLLECTIONS_STATUS.PAY_DUE).toLowerCase() && collectionData.status.toLowerCase() !== (OLBConstants.INWARD_COLLECTIONS_STATUS.CANCELLED).toLowerCase() && collectionData.status.toLowerCase() !== (OLBConstants.INWARD_COLLECTIONS_STATUS.CANCELED).toLowerCase()) {
          if (collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.APPROVED).toLowerCase()) {
            contentScope.lblDraweeConsent.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.initiatePayment", false);
            contentScope.lblMessage.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.PaymentInitiationSubmit", false);
            contentScope.lblAmountDebitAccount.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.amountDebitFrom", false);
            contentScope.flxAcceptOrRejectCollection.setVisibility(false);
            contentScope.flxAcceptOrRejectUsance.setVisibility(false);
            contentScope.flxButtons.setVisibility(true);
            contentScope.flxDebitAndChargesAccount.setVisibility(true);
            contentScope.flxMessageToBank.setVisibility(true);
            contentScope.flxMessageToBank.setVisibility(true);
            contentScope.flxReasonForSelfRejection.setVisibility(false);
            contentScope.flxViewCollectionsButtons.setVisibility(false);
            contentScope.btnBackOverview.setVisibility(false);
            contentScope.btnViewAllCollections.setVisibility(true);
          } else if (collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.SUBMITTED_TO_BANK).toLowerCase() || collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.PROCESSING_BY_BANK).toLowerCase() || collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.SETTLED).toLowerCase() || collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED).toLowerCase()) {
            contentScope.flxSelfAcceptance.setVisibility(false);
            contentScope.flxViewCollectionsButtons.setVisibility(true);
            contentScope.btnBackOverview.setVisibility(true);
            contentScope.btnViewAllCollections.setVisibility(false);
          }
        } else {
          contentScope.lblDraweeConsent.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeConsent", false);
          contentScope.lblAmountDebitAccount.text = kony.i18n.getCurrentLocale() === 'ar_AE' ? scope.presenter.renderI18nKeys("kony.i18n.verifyDetails.optional", false) + "" + scope.presenter.renderI18nKeys("i18n.TradeFinance.amountDebitFrom", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.amountDebitFrom", false) + "" + scope.presenter.renderI18nKeys("kony.i18n.verifyDetails.optional", false);
          contentScope.flxAcceptOrRejectCollection.setVisibility(true);
          this.setRadioOptions(contentScope.lblRejectUsanceRadio, false);
          this.setRadioOptions(contentScope.lblAcceptUsanceRadio, false);
          this.setRadioOptions(contentScope.lblRejectCollectionRadio, false);
          this.setRadioOptions(contentScope.lblAcceptCollectionRadio, false);
          contentScope.flxDebitAndChargesAccount.setVisibility(false);
          contentScope.flxReasonForSelfRejection.setVisibility(false);
          contentScope.flxMessageToBank.setVisibility(false);
          contentScope.flxAcceptOrRejectUsance.setVisibility(false);
          contentScope.flxViewCollectionsButtons.setVisibility(false);
          contentScope.flxButtons.setVisibility(true);
        }
        contentScope.flxAcknowledgementMessage.setVisibility(false);
        contentScope.flxErrorMessage.setVisibility(false);
        contentButtonScope.flxVerticalEllipsisBodyContent.setVisibility(true);
        //contentButtonScope.flxDownload.setVisibility(true);
        contentPopupScope.flxSwiftDetailsPopup.setVisibility(false);
        contentPopupScope.flxPaymentAdvicePopup.setVisibility(false);
        contentPopupScope.flxDraweeConsentPopup.setVisibility(false);
        scope.enableOrDisableButton(contentScope.btnSubmitConsent, false);
        contentScope.lblSelectedDebitAccount.text = scope.presenter.renderI18nKeys("i18n.common.selecthere");
        contentScope.lblSelectedChargesDebitAccount.text = scope.presenter.renderI18nKeys("i18n.common.selecthere");
        contentScope.flxDebitAccountList.setVisibility(false);
        contentScope.flxChargesDebitAccountList.setVisibility(false);
        scope.closePopup('flxPaymentAdvicePopup');
        scope.closePopup('flxDraweeConsentPopup');
        scope.closePopup('flxSwiftDetailsPopup');
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsViewDetailsController",
          "method": "setDefaultUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
         * @api : buttonNavigation
         * This function for navigation on button clicks.
         * @return : NA
         */
    buttonNavigation: function (param, data) {
      try {
        this.navManager = applicationManager.getNavigationManager();
        let formName = "";
        let sendData = "";
        switch (param) {
          case "back":
            {
              formName = "frmInwardCollectionsDashboardNew";
              sendData = !kony.sdk.isNullOrUndefined(data) ? data : sendData;
              sendData.flowType = ViewAllCollections;
              break;
            }
        }
        this.navManager.navigateTo({
          appName: "TradeFinanceMA",
          friendlyName: formName
        }, false, sendData);
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsViewDetailsController",
          "method": "buttonNavigation",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setRadioOptions
     * This function for setting Radio Selection
     * @param : name of the segment.
     * @return : NA
     */
    setRadioOptions: function (widget, isSelected) {
      widget.text = isSelected ? this.presenter.resourcesConstants.fontIcons.radioSelected : this.presenter.resourcesConstants.fontIcons.radioUnselected;
      widget.skin = isSelected ? this.presenter.resourcesConstants.skins.radioSelected : this.presenter.resourcesConstants.skins.radioUnselected;
    },

    /**
     * @api : setSegViewDetailsWidgetDataMap
     * This function for setting widgetDataMap for segment
     * @param : name of the segment.
     * @return : NA
     */
    setSegViewDetailsWidgetDataMap: function (segName) {
      var scope = this;
      try {
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        var orientationHandler = new OrientationHandler();
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          contentScope[segName].rowTemplate = "flxAmendRowTemplateTablet";
        } else {
          contentScope[segName].rowTemplate = "flxAmendRowTemplate";
        }
        contentScope[segName].sectionHeaderTemplate = "flxReviewHeader";
        contentScope[segName].widgetDataMap = {
          "flxAmendmentRowTemplate": "flxAmendmentRowTemplate",
          "flxreviewRows": "flxreviewRows",
          "lblReview": "lblReview",
          "flxReviewRight": "flxReviewRight",
          "flxReviewValues": "flxReviewValues",
          "lblReviewValue1": "lblReviewValue1",
          "flxReviewUploadDocumentsRowTemplate": "flxReviewUploadDocumentsRowTemplate",
          "lblReviewLeft": "lblReviewLeft",
          "flxDocument": "flxDocument",
          "imgDownloadIcon": "imgDownloadIcon",
          "lblDocumentName": "lblDocumentName",
          "flxRowTemplateSeparator": "flxRowTemplateSeparator",
          "flxReviewDetailsRowTemplate": "flxReviewDetailsRowTemplate",
          "flxDetails": "flxDetails",
          "flxHeading": "flxHeading",
          "lblHeading1": "lblHeading1",
          "lblHeading2": "lblHeading2",
          "lblDetailsRow1": "lblDetailsRow1",
          "lblDetailsRow2": "lblDetailsRow2",
          "lblDetailsRow3": "lblDetailsRow3",
          "lblDetailsRow4": "lblDetailsRow4",
          "template": "template",
          "flxReturnedByBank": "flxReturnedByBank",
          "flxReturnByBankOuter": "flxReturnByBankOuter",
          "flxReturnByBankInner": "flxReturnByBankInner",
          "lblReturnBank": "lblReturnBank",
          "lblReturnDate": "lblReturnDate",
          "flxSeparatorTopReturnBank": "flxSeparatorTopReturnBank",
          "flxReturnedByBankBodyContent": "flxReturnedByBankBodyContent",
          "lblReasonReturn": "lblReasonReturn",
          "lblRightValue": "lblRightValue",
          "flxReturnedByBankBodyContent02": "flxReturnedByBankBodyContent02",
          "lblReasonReturn02": "lblReasonReturn02",
          "lblRightValue02": "lblRightValue02",
          "flxReturnedByBankBodyContent03": "flxReturnedByBankBodyContent03",
          "lblReasonReturn03": "lblReasonReturn03",
          "lblRightValue03": "lblRightValue03",
          "flxSeparatorReturnTop03": "flxSeparatorReturnTop03",
          "flxReviewHeader": "flxReviewHeader",
          "flxSeparator1": "flxSeparator1",
          "flxSeparator2": "flxSeparator2",
          "flxheaderWithDropdown": "flxheaderWithDropdown",
          "lblTransactionHeader": "lblTransactionHeader",
          "flxDropDown": "flxDropDown",
          "imgDropDown": "imgDropDown",
          "flxBottomSeparator": "flxBottomSeparator",
          "imgDaysLeft": "imgDaysLeft",
          "lblDaysLeft": "lblDaysLeft"
        };
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsViewDetailsController",
          "method": "setSegViewDetailsWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setInwardCollectionsDetails
   * This function for setting inward data to segment
   * @return : NA
   */
    setInwardCollectionsDetails: function(params) {
      var scope = this;
      try {
        scope.setSegViewDetailsWidgetDataMap("segViewDetails");
        let currentBreakpoint = kony.application.getCurrentBreakpoint();
        let isTablet = (currentBreakpoint > 640 && currentBreakpoint <= 1024);
        let docData = this.presenter.isEmptyNullOrUndefined(collectionData.documentsUploaded) ? NA : JSON.parse(collectionData.documentsUploaded.replace(/'/g, '"'));
        let MaturityDateObj = scope.presenter.calculateMaturityDate(collectionData.maturityDate);
        let InwardCollectionDetails = [];
        let date = new Date();
        todaysDate = CommonUtilities.getFrontendDateString(date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear(), applicationManager.getConfigurationManager().frontendDateFormat);
        let section1 = [{
          lblTransactionHeader: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.collectionOverview", false),
            left: isTablet ? "2.54%" : "1.56%"
          },
          "flxSeparator2": {
            isVisible: true,
            width: "100%"
          },
          "flxDropDown": {
            isVisible: false
          },
          "flxReviewHeader": {
            skin: "slFbox"
          },
        },
        [{
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.transactionRefWithColon", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(collectionData.collectionSrmsId) ? NA : collectionData.collectionSrmsId,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.documentNumber", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(collectionData.documentNo) ? NA : collectionData.documentNo,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.receivedOnWithColon", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(collectionData.receivedOn) ? NA : scope.presenter.getConvertedDate(collectionData, 'receivedOn'),
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.serviceRequests.Status:", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(collectionData.status) ? NA : collectionData.status.toLowerCase() === OLBConstants.INWARD_COLLECTIONS_STATUS.SUBMITTED_TO_BANK.toLowerCase() ? this.presenter.renderI18nKeys("i18n.TradeFinance.SubmittedToBank", false) : collectionData.status,
            isVisible: true,
            skin: "ICSknlbl424242SSP15pxSemibold"
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturnedWithColon", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(collectionData.reasonForReturn) ? NA : collectionData.reasonForReturn,
            isVisible: true
          },
          flxreviewRows: {
            isVisible: this.presenter.isEmptyNullOrUndefined(collectionData.status) ? false : collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.RETURNED_BY_BANK).toLowerCase() ? true : false
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.draweeAcknowledgement", true),
            isVisible: true
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(collectionData.draweeAcknowledgement) ? NA : collectionData.draweeAcknowledgement,
            isVisible: true
          },
          flxreviewRows: {
            isVisible: this.presenter.isEmptyNullOrUndefined(collectionData.status) ? false : (collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.NEW).toLowerCase() || collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.RETURNED_BY_BANK).toLowerCase()) ? true : false
          }
        },
        {
          lblReview: {
            text: (collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.APPROVED).toLowerCase() || collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.RETURNED_BY_BANK).toLowerCase()) ? this.presenter.renderI18nKeys("i18n.TradeFinance.documentsAgainstAcceptance", true) : this.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptanceEligible", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(collectionData.usanceAcceptanceEligibility) ? NA : collectionData.usanceAcceptanceEligibility,
            isVisible: true
          },
          flxreviewRows: {
            isVisible: this.presenter.isEmptyNullOrUndefined(collectionData.tenorType) || (collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED).toLowerCase() || collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.SETTLED).toLowerCase()) ? false : collectionData.tenorType.toLowerCase() === "usance" ? true : false
          },
          flxBottomSeparator: {
            top: "20dp",
            skin: "slFbox",
            isVisible: true
          }
        },
        ]
        ];
        InwardCollectionDetails.push(section1);
        if ((collectionData.status.toLowerCase() === OLBConstants.INWARD_COLLECTIONS_STATUS.SUBMITTED_TO_BANK.toLowerCase() || collectionData.status.toLowerCase() === OLBConstants.INWARD_COLLECTIONS_STATUS.PROCESSING_BY_BANK.toLowerCase() || collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED).toLowerCase() || collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.APPROVED).toLowerCase()) && (collectionData.status.toLowerCase() !== (OLBConstants.INWARD_COLLECTIONS_STATUS.NEW).toLowerCase() || collectionData.status.toLowerCase() !== (OLBConstants.INWARD_COLLECTIONS_STATUS.RETURNED_BY_BANK).toLowerCase())) {
          let section2 = [{
            lblTransactionHeader: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.draweeConsent", false),
              left: isTablet ? "2.54%" : "1.56%"
            },
            "flxSeparator1": {
              isVisible: true,
              width: "100%",
              top: "0dp"
            },
            "flxheaderWithDropdown": {
              skin: "ICSknFlxf7f7f7"
            },
            "flxSeparator2": {
              isVisible: true,
              width: "100%"
            },
            "imgDropDown": "dropdown_collapse.png",
            "flxDropDown": {
              onClick: scope.onActionClick.bind(this)
            }
          },
          [{
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.draweeAcknowledgement", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: params ? this.presenter.isEmptyNullOrUndefined(payLoad.draweeAcknowledgement) ? NA : payLoad.draweeAcknowledgement : this.presenter.isEmptyNullOrUndefined(collectionData.draweeAcknowledgement) ? NA : collectionData.draweeAcknowledgement,
              isVisible: true
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptance", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params ? this.presenter.isEmptyNullOrUndefined(payLoad.usanceAcceptance) ? NA : payLoad.usanceAcceptance : this.presenter.isEmptyNullOrUndefined(collectionData.usanceAcceptance) ? NA : collectionData.usanceAcceptance,
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(collectionData.tenorType) || (collectionData.draweeAcknowledgement === OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED) ? false : collectionData.tenorType.toLowerCase() === "usance" ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptanceDate", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params ? this.presenter.isEmptyNullOrUndefined(payLoad.usanceAcceptanceDate) ? NA : CommonUtilities.getFrontendDateString(payLoad.usanceAcceptanceDate, applicationManager.getConfigurationManager().frontendDateFormat) : this.presenter.isEmptyNullOrUndefined(collectionData.usanceAcceptanceDate) ? NA : CommonUtilities.getFrontendDateString(collectionData.usanceAcceptanceDate, applicationManager.getConfigurationManager().frontendDateFormat),
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(collectionData.tenorType)|| (collectionData.draweeAcknowledgement === OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED) ? false : collectionData.tenorType.toLowerCase() === "usance" ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.billOfExchangeStatus", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(collectionData.billExchangeStatus) ? NA : collectionData.billExchangeStatus,
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(collectionData.status)|| (collectionData.draweeAcknowledgement === OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED) ? false : collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.APPROVED).toLowerCase() ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.amountDebitFrom", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: params ? this.presenter.isEmptyNullOrUndefined(payLoad.debitAmountFrom) ? NA : scope.getAccountDetails(contentScope.segDebitAccount.id, payLoad.debitAmountFrom) : this.presenter.isEmptyNullOrUndefined(collectionData.debitAmountFrom) ? NA : scope.getAccountDetails(contentScope.segDebitAccount.id, collectionData.debitAmountFrom),
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(collectionData.status) || (collectionData.draweeAcknowledgement === OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED) ? false : collectionData.status.toLowerCase() !== (OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED).toLowerCase() ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitFrom", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params ? this.presenter.isEmptyNullOrUndefined(payLoad.chargesDebitFrom) ? NA : scope.getAccountDetails(contentScope.segDebitAccount.id, payLoad.chargesDebitFrom) : this.presenter.isEmptyNullOrUndefined(collectionData.chargesDebitFrom) ? NA : scope.getAccountDetails(contentScope.segDebitAccount.id, collectionData.chargesDebitFrom),
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(collectionData.status)|| (collectionData.draweeAcknowledgement === OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED) ? false : collectionData.status.toLowerCase() !== (OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED).toLowerCase() ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.rejectedDateWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params ? this.presenter.isEmptyNullOrUndefined(payLoad.lastUpdatedDate) ? NA : CommonUtilities.getFrontendDateString(payLoad.lastUpdatedDate, applicationManager.getConfigurationManager().frontendDateFormat) : this.presenter.isEmptyNullOrUndefined(collectionData.lastUpdatedDate) ? NA : CommonUtilities.getFrontendDateString(collectionData.lastUpdatedDate, applicationManager.getConfigurationManager().frontendDateFormat),
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(collectionData.status) ? false : collectionData.draweeAcknowledgement.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED).toLowerCase() ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejectionWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params ? this.presenter.isEmptyNullOrUndefined(payLoad.reasonForRejection) ? NA : payLoad.reasonForRejection : this.presenter.isEmptyNullOrUndefined(collectionData.reasonForRejection) ? NA : collectionData.reasonForRejection,
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(collectionData.status) ? false : collectionData.draweeAcknowledgement.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED).toLowerCase() ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.messageToBankWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params ? this.presenter.isEmptyNullOrUndefined(payLoad.messageToBank) ? NA : payLoad.messageToBank : this.presenter.isEmptyNullOrUndefined(collectionData.messageToBank) ? NA : collectionData.messageToBank,
              isVisible: true
            },
            flxBottomSeparator: {
              top: "20dp",
              skin: "slFbox",
              isVisible: true
            }
          }
          ]
          ];
          InwardCollectionDetails.push(section2);
        }
        let section3 = [{
          lblTransactionHeader: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.collectionDetails", false),
            left: isTablet ? "2.54%" : "1.56%"
          },
          "flxSeparator1": {
            isVisible: true,
            width: "100%",
            top: "0dp"
          },
          "flxheaderWithDropdown": {
            skin: "ICSknFlxf7f7f7"
          },
          "flxSeparator2": {
            isVisible: true,
            width: "100%"
          },
          "imgDropDown": "dropdown_collapse.png",
          "flxDropDown": {
            onClick: scope.onActionClick.bind(this)
          }
        },
        [
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.drawerDetails", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(collectionData.drawerName) ? NA : collectionData.drawerName,
              isVisible: true
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.billPayee.review.amount", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(collectionData.amount) ? NA : collectionData.currency + " " + applicationManager.getFormatUtilManager().formatAmount(collectionData.amount),
              isVisible: true
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.ChargesWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(collectionData.charges) ? NA : collectionData.currency + " " + applicationManager.getFormatUtilManager().formatAmount(collectionData.charges),
              isVisible: true
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.Wealth.maturityDate", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(collectionData.maturityDate) ? NA : scope.presenter.getConvertedDate(collectionData, 'maturityDate'),
              isVisible: true,
              width: '90dp'
            },
            imgDaysLeft: {
              isVisible: true,
              src: MaturityDateObj.imageToLoad
            },
            lblDaysLeft: {
              isVisible: true,
              text: MaturityDateObj.daysLeft
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(collectionData.tenorType) ? NA : collectionData.tenorType,
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(collectionData.tenorType) ? false : collectionData.tenorType.toLowerCase() === "usance" ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetails", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(collectionData.usanceDetails) ? NA : collectionData.usanceDetails,
              isVisible: true
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.IncoTerms", true),
              isVisible: true,
              left: '18px'
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(collectionData.incoTerms) ? NA : collectionData.incoTerms,
              isVisible: true
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.remittingBankDetails", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(collectionData.remittingBank) ? NA : collectionData.remittingBank,
              isVisible: true
            }
          }
        ]
        ];

        for (let i = 0; i < docData.length; i++) {
          data = {
            lblReview: {
              text: i === 0 ? this.presenter.renderI18nKeys("i18n.TradeFinance.documentsWithColon", false) : ""
            },
            lblReviewValue1: {
              text: docData[i].documentName,
              width : '350dp'
            },
            flxreviewRows: {
              isVisible: docData.length > 0 ? true : false
            }
          }
          section3[1].push(data);
        }
        let messageFromBank = {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.messageFromBankWithColon", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(collectionData.messageFromBank) ? NA : collectionData.messageFromBank,
            isVisible: true
          },
          flxBottomSeparator: {
            top: "20dp",
            skin: "slFbox",
            isVisible: true
          }
        };

        section3[1].push(messageFromBank);
        InwardCollectionDetails.push(section3);
        if (collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.SETTLED).toLowerCase()) {
          let section4 = [{
            lblTransactionHeader: {
              text: this.presenter.renderI18nKeys("i18n.TransfersEur.PaymentDetails", false),
              left: isTablet ? "2.54%" : "1.56%"
            },
            "flxSeparator1": {
              isVisible: true,
              width: "100%",
              top: "0dp"
            },
            "flxheaderWithDropdown": {
              skin: "ICSknFlxf7f7f7"
            },
            "flxSeparator2": {
              isVisible: true,
              width: "100%"
            },
            "imgDropDown": "dropdown_collapse.png",
            "flxDropDown": {
              onClick: scope.onActionClick.bind(this)
            }
          },
          [
            {
              lblReview: {
                text: this.presenter.renderI18nKeys("i18n.TradeFinance.paymentStatusWithColon", false),
                isVisible: true
              },
              lblReviewValue1: {
                text: this.presenter.isEmptyNullOrUndefined(collectionData.paymentStatus) ? NA : collectionData.paymentStatus,
                isVisible: true
              }
            },
            {
              lblReview: {
                text: this.presenter.renderI18nKeys("i18n.TradeFinance.settledDateWithColon", false),
                isVisible: true
              },
              lblReviewValue1: {
                text: this.presenter.isEmptyNullOrUndefined(collectionData.settledDate) ? NA : CommonUtilities.getFrontendDateString(collectionData.settledDate, applicationManager.getConfigurationManager().frontendDateFormat),
                isVisible: true,
              },
              flxreviewRows: {
                isVisible: this.presenter.isEmptyNullOrUndefined(collectionData.paymentStatus) ? true : collectionData.paymentStatus.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.SETTLED).toLowerCase() ? true : false
              }
            },
            {
              lblReview: {
                text: this.presenter.renderI18nKeys("i18n.TradeFinance.settledAmount", false),
                isVisible: true
              },
              lblReviewValue1: {
                text: this.presenter.isEmptyNullOrUndefined(collectionData.amount) ? NA : collectionData.currency + " " + applicationManager.getFormatUtilManager().formatAmount(collectionData.amount),
                isVisible: true
              }
            },
            {
              lblReview: {
                text: this.presenter.renderI18nKeys("i18n.TradeFinance.amountDebitedFrom", false),
                isVisible: true
              },
              lblReviewValue1: {
                text: this.presenter.isEmptyNullOrUndefined(collectionData.debitAmountFrom) ? NA : scope.getAccountDetails(contentScope.segDebitAccount.id, collectionData.debitAmountFrom),
                isVisible: true
              },
              flxBottomSeparator: {
                top: "20dp",
                skin: "slFbox",
                isVisible: true
              }
            },
          ]
          ];
          InwardCollectionDetails.push(section4);
        }
        contentScope.segViewDetails.setData(InwardCollectionDetails);
      }
      catch (err) {
        var errorObj =
        {
          "level": "frmInwardCollectionsViewDetailsController",
          "method": "setInwardCollectionsDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /* @api : onActionClick
    * Triggerd on click of dropdown in segment
    * @return : NA
    */
    onActionClick: function () {
      var scopeObj = this;
      try {
        var index = scopeObj.view.formTemplate12.flxContentTCCenter.segViewDetails.selectedRowIndex;
        var sectionIndex = index[0];
        var data = scopeObj.view.formTemplate12.flxContentTCCenter.segViewDetails.data;
        var selectedHeaderData = data[sectionIndex][0];
        if (this.segViewDetailsTempData === "") {
          this.segViewDetailsTempData = JSON.parse(JSON.stringify(contentScope.segViewDetails.data));
        }
        if (selectedHeaderData["imgDropDown"] === "dropdown_expand.png") {
          selectedHeaderData["imgDropDown"] = "dropdown_collapse.png";
          data[sectionIndex][1] = this.segViewDetailsTempData[sectionIndex][1];
          //selectedHeaderData["flxSeparator2"].isVisible = true;
          contentScope.segViewDetails.setData(data);
        } else {
          selectedHeaderData["imgDropDown"] = "dropdown_expand.png";
          data[sectionIndex][1] = [];
          //selectedHeaderData["flxSeparator2"].isVisible = false;
          contentScope.segViewDetails.setData(data);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsViewDetailsController",
          "method": "onActionClick",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },

    /**
     * @api : enableOrDisableButton
     * enable or disable skins for buttons.
     * @return : NA
     */
    enableOrDisableButton: function (btnRef, flag) {
      btnRef.setEnabled(flag);
      flag ? btnRef.skin = "ICSknbtnEnabed003e7536px" : btnRef.skin = "ICSknbtnDisablede2e9f036px";
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
        scope.presenter.contextualMenuData.map(item => {
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
          if (collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.APPROVED).toLowerCase() || collectionData.status.toLowerCase() ===(OLBConstants.INWARD_COLLECTIONS_STATUS.PAY_DUE).toLowerCase() || collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.OVERDUE).toLowerCase()) {
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
        contentButtonScope.flxVerticalEllipsisDropdown.setVisibility(false);
        if (id == 'print') {
          let formNameForPrint = 'frmInwardCollectionsPrint';
          let dataObj = {
            navData: collectionData,
            previousFormName: 'frmInwardCollectionsViewDetails',
            pageTitle: 'i18n.TradeFinance.messageKey'
          };
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": `InwardCollectionsUIModule/${formNameForPrint}`
          }).navigate(dataObj);
        } else if (id == 'download') {
          scope.presenter.generateInwardCollections({
            "collectionSrmsId": collectionData.collectionSrmsId
          }, "frmInwardCollectionsViewDetails");
        } else if (id == 'raiseQuery') {
          let record = collectionData;
          let queryObj = {};
          let tempMaturityDate = this.presenter.calculateMaturityDate(record.maturityDate);
          let formattedACNumber = scope.morphAcNumber(record.debitAccount);
          queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${record.collectionSrmsId}`;
          queryObj.descriptionObj = {};
          record.maturityDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.accountDetail.maturityDate")] = this.presenter.getConvertedDate(record, 'maturityDate'));
          record.incoTerms && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.IncoTerms")] = record.incoTerms);
          record.tenorType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.tenorType")] = record.tenorType);
          record.debitAccount && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.amountDebitedFrom")] = formattedACNumber);
          tempMaturityDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.daysLeftTopay")] = tempMaturityDate.daysLeftToPay);
          queryObj.tradeModule = true;
          scope.presenter.showMessagesScreen(queryObj);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsViewDetailsController",
          "method": "onPrintAndDownloadRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
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

    /**
       * @api : renderSwiftAndAdvices
       * Navigating to print
       * @return : NA
       */
    renderSwiftAndAdvices: function () {
      var scope = this;
      try {
        let swiftMessagesLength = 0;
        let paymentAdvicesLength = 0;
        let swiftMessages = [];
        let paymentAdvices = [];
        let swiftAndAdviceRecords = [];
        if (collectionData.hasOwnProperty('PaymentAdvices')) {
          paymentAdvices = collectionData.PaymentAdvices;
          paymentAdvicesLength = paymentAdvices.length;
        }
        if (collectionData.hasOwnProperty('SwiftMessages')) {
          swiftMessages = collectionData.SwiftMessages;
          swiftMessagesLength = swiftMessages.length;
        }

        swiftAndAdviceRecords = [...paymentAdvices, ...swiftMessages];
        if (swiftMessagesLength > 0 || paymentAdvicesLength > 0) {
          contentButtonScope.flxSwiftAndAdvicesParent.setVisibility(true);
          contentButtonScope.btnSwiftAndAdvices.cursorType = "pointer";
          contentButtonScope.btnSwiftAndAdvices.text = kony.i18n.getLocalizedString("i18n.ImportLC.SwiftsAdvices") + "(" + (swiftMessagesLength + paymentAdvicesLength) + ")";
          contentButtonScope.btnSwiftAndAdvices.onClick = scope.renderSwiftAndAdviceOptions.bind(scope, swiftAndAdviceRecords);
        } else {
          contentButtonScope.flxSwiftAndAdvicesParent.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "method": "renderSwiftAndAdvices",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : renderSwiftAndAdviceOptions
     * Navigating to print
     * @param {array} : swiftAndAdviceRecords to lod in segment
     * @return : NA
     */
    renderSwiftAndAdviceOptions: function (swiftAndAdviceRecords) {
      var scope = this;
      try {
        contentButtonScope.flxSwiftAndAdvices.setVisibility(!contentButtonScope.flxSwiftAndAdvices.isVisible);
        contentButtonScope.segSwiftAndAdvices.widgetDataMap = { lblValue: "lblValue" };

        // Processing swiftAndAdviceRecords data
        let masterData = [];
        swiftAndAdviceRecords.map(item => {
          let tempMasterData = {
            lblValue: {
              "text": item.hasOwnProperty('adviceName') ?
                kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice") + ' (' + scope.presenter.getConvertedDate(item, 'paymentDate') + ')'
                :
                kony.i18n.getLocalizedString("i18n.TradeFinance.swiftMT") + ' (' + scope.presenter.getConvertedDate(item, 'createdDate') + ')',
              "cursorType": "pointer"
            }
          }
          masterData.push(tempMasterData);

        });

        // setting data into segment
        contentButtonScope.segSwiftAndAdvices.setData(masterData);
        contentButtonScope.segSwiftAndAdvices.onRowClick = this.onRowClickOfSwiftAndAdvices.bind(scope, swiftAndAdviceRecords);
      } catch (err) {
        var errorObj = {
          "method": "renderSwiftAndAdviceOptions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : onRowClickOfSwiftAndAdvices
     * Displaying popup based on user click on Swift And Advices dropdown
     * @arg {swiftAndAdviceRecords} : Available records in Swift And Advices dropdown
     * @return : NA
     */
    onRowClickOfSwiftAndAdvices: function (swiftAndAdviceRecords) {
      var scope = this;
      try {
        // Selected item always at [1]
        let currentSelectedRowIndex = contentButtonScope.segSwiftAndAdvices.selectedRowIndex[1]
        let selectedRecord = swiftAndAdviceRecords[currentSelectedRowIndex];
        contentButtonScope.flxSwiftAndAdvices.setVisibility(false);
        contentPopupScope.flxSwiftDetailsPopup.setVisibility(false);
        contentPopupScope.flxPaymentAdvicePopup.setVisibility(false);
        if (selectedRecord.hasOwnProperty('adviceName')) {
          // Payment Advice Logic
          contentPopupScope.setVisibility(true);
          contentPopupScope.skin = "sknBackground000000Op35";
          contentPopupScope.flxPaymentAdvicePopup.setVisibility(true);
          contentPopupScope.lblPaymentAdviceBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice");
          // Configuring segments
          contentPopupScope.segPaymentAdviceBank.widgetDataMap = { lblLeft1: "lblLeft1", lblRight1: "lblRight1" };
          // Processing swiftAndAdviceRecords data
          let masterData = [
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.TransfersEur.Beneficiary', true),
              lblRight1: scope.presenter.getDynamicData(selectedRecord, 'beneficiary')
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.billPay.PaymentDate', true),
              lblRight1: scope.presenter.getConvertedDate(selectedRecord, 'paymentDate')
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.common.creditedAmount', true),
              lblRight1: scope.presenter.getDynamicData(selectedRecord, 'currency') + " " + scope.presenter.getDynamicData(selectedRecord, 'creditedAmount')
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.CreditedAccount', true),
              lblRight1: selectedRecord.creditedAccount ? CommonUtilities.getMaskedAccName(selectedRecord.creditedAccount)[0] : NA
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.ChargesDebited', true),
              lblRight1: scope.presenter.getDynamicData(selectedRecord, 'currency') + " " + scope.presenter.getDynamicData(selectedRecord, 'charges')
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.AdvisingBank', true),
              lblRight1: scope.presenter.getDynamicData(selectedRecord, 'advisingBank')
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.claimRefNoWithColon', false),
              lblRight1: scope.presenter.getDynamicData(selectedRecord, 'orderId')
            }
          ];
          // setting data into segment
          contentPopupScope.segPaymentAdviceBank.setData(masterData);
          contentPopupScope.flxSearchClose.cursorType = "pointer";
          contentPopupScope.flxSearchClose.onClick = scope.closePopup.bind(scope, 'flxPaymentAdvicePopup');
        } else {
          // Swift MT popup logic
          contentPopupScope.setVisibility(true);
          contentPopupScope.skin = "sknBackground000000Op35";
          contentPopupScope.flxSwiftDetailsPopup.setVisibility(true);
          contentPopupScope.flxCross.cursorType = 'pointer';
          contentPopupScope.flxCross.onClick = scope.closePopup;
          scope.renderSwiftMTPopup(selectedRecord);
        }
      } catch (err) {
        var errorObj = {
          "method": "onRowClickOfSwiftAndAdvices",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
        /**
         * @api : renderSwiftMTPopup
         * Rendering the data into swift popup
         * @arg  {swiftData} : Data to render the swift popup
         * @return : NA
         */
        renderSwiftMTPopup: function(swiftData) {
            var scope = this;
            try {
                contentPopupScope.lblSwiftMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.swiftMT") + " (" + scope.presenter.getConvertedDate(swiftData, 'createdDate') + ")";
                contentPopupScope.lblSwiftMessageHeading.text = SWIFT_MESSAGE_HEADER;
                contentPopupScope.lblSwiftMessageDetails.text = SWIFT_MESSAGE_DETAILS;
                contentPopupScope.lblSwiftMessageFooter.text = SWIFT_MESSAGE_FOOTER;
                contentPopupScope.segSwiftPrimaryDetails.widgetDataMap = {
                    lblSwiftDetailsKey: "lblSwiftDetailsKey"
                };
                let headerMasterData = [{
                    lblSwiftDetailsKey: scope.parseTheData(scope.isJSON(swiftData.bCode) ? swiftData.bCode : {'fieldName': SWIFT_AUTH_BCODE,'fieldValue' : swiftData.bCode}, HEADER)
                }, {
                    lblSwiftDetailsKey: scope.parseTheData(scope.isJSON(swiftData.bic) ? swiftData.bic : {'fieldName': SWIFT_AUTH_BIC,'fieldValue' : swiftData.bic}, HEADER)
                }, {
                    lblSwiftDetailsKey: scope.parseTheData(scope.isJSON(swiftData.transferDateOrTime) ? swiftData.transferDateOrTime : {'fieldName': SWIFT_AUTH_TRANSFERDATEORTIME,'fieldValue' : swiftData.transferDateOrTime}, HEADER)
                }, {
                    lblSwiftDetailsKey: scope.parseTheData(scope.isJSON(swiftData.type) ? swiftData.type : {'fieldName': SWIFT_AUTH_TYPE,'fieldValue' : swiftData.type}, HEADER)
                }];
                contentPopupScope.segSwiftPrimaryDetails.setData(headerMasterData);
                contentPopupScope.segSwiftDetails.widgetDataMap = {
                    lblSwiftDetailsKey: "lblSwiftDetailsKey",
                    lblSwiftDetailsValue: "lblSwiftDetailsValue"
                };
                let swiftKeys = Object.keys(swiftData);
                let masterData = [];
                masterData.push({
                    lblSwiftDetailsKey: 'MESSAGE BODY',
                    lblSwiftDetailsValue: '',
                });
                swiftKeys.map(item => {
                    if (item !== 'bCode' && item !== 'bic' && item !== 'transferDateOrTime' && item !== 'type' && item !== 'createdDate' && item !== 'swiftsAndAdvicesSrmsRequestOrderID' && item !== 'orderId') {
                        masterData.push({
                            lblSwiftDetailsKey: scope.parseTheData(swiftData[item], SWIFT_TAG),
                            lblSwiftDetailsValue: scope.parseTheData(swiftData[item])
                        });
                    }
                });
                contentPopupScope.segSwiftDetails.setData(masterData);
            } catch (err) {
                var errorObj = {
                    "method": "renderSwiftMTPopup",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

    /**
     * @api : parseTheData
     * Convertin string to JSON 
     * @arg {partialResponse} : Response from the service
     * @arg {renderType} : What to render
     * @return : NA
    */
    parseTheData: function (partialResponse, renderType) {
      var scope = this;
      try {
        partialResponse = scope.isJSON(partialResponse) ? JSON.parse(partialResponse.replace(/'/g, "\"")) : partialResponse || NA ;
        if (renderType === HEADER) {
          return partialResponse.fieldName + ": " + partialResponse.fieldValue;
        } else if (renderType === SWIFT_TAG) {
          return partialResponse.swiftTag + ": " + partialResponse.fieldName;
        }
        return partialResponse.fieldValue ? partialResponse.fieldValue : partialResponse ;
      } catch (err) {
        var errorObj = {
          "method": "parseTheData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
 * @api : closePopup
 * Closing the popup based on popup name
 * @arg {popupFlexName} : Popup flex name
 * @return : NA
 */
    closePopup: function (popupFlexName) {
      var scope = this;
      try {
        contentPopupScope.setVisibility(false);
        contentPopupScope[popupFlexName].setVisibility(false);
      } catch (err) {
        var errorObj = {
          "method": "closePopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    //Amendment Listing codes
    setTabNavigation: function (buttonId) {
      var scope = this;
      try {
        if (buttonId === TAB_COLLECTIONS) {
          // Collections
          scope.view.formTemplate12.pageTitle = kony.i18n.getCurrentLocale() === 'ar_AE' ? collectionData.collectionSrmsId + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.inwardCollection") : scope.presenter.renderI18nKeys("i18n.TradeFinance.inwardCollection") + " - " + collectionData.collectionSrmsId;
          contentScope.btnTab1.skin = 'ICSknBtnAccountSummarySelected2';
          contentScope.btnTab2.skin = 'ICSknBtnAccountSummaryUnselected2';
          CURRENT_TAB = TAB_COLLECTIONS;
          contentScope.flxCollectionDetails.setVisibility(true);
          contentScope.flxAmendmentListing.setVisibility(false);
          contentScope.flxPagination.setVisibility(false);
          contentButtonScope.setVisibility(true);
          if (collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.SUBMITTED_TO_BANK).toLowerCase() ||
            collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.PROCESSING_BY_BANK).toLowerCase() ||
            collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.SETTLED).toLowerCase() ||
            collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED).toLowerCase()) {
            contentScope.flxSelfAcceptance.setVisibility(false);
            contentScope.flxViewCollectionsButtons.setVisibility(true);
          }
          else {
            contentScope.flxSelfAcceptance.setVisibility(true);
            contentScope.flxViewCollectionsButtons.setVisibility(false);
          }
        } else if (buttonId === TAB_AMENDMENTS) {
          // Amendments
          scope.view.formTemplate12.pageTitle = kony.i18n.getCurrentLocale() === 'ar_AE' ? collectionData.collectionSrmsId + " - "  + scope.presenter.renderI18nKeys("i18n.TradeFinance.inwardCollection") : scope.presenter.renderI18nKeys("i18n.TradeFinance.inwardCollection") + " - " + collectionData.collectionSrmsId;
          contentScope.btnTab1.skin = 'ICSknBtnAccountSummaryUnselected2';
          contentScope.btnTab2.skin = 'ICSknBtnAccountSummarySelected2';
          scope.responsiveDesignOfAmendmentTab();
          contentScope.flxPagination.PaginationContainer.flxPagination.width = "257dp";
          CURRENT_TAB = TAB_AMENDMENTS;
          contentScope.tbxSearch.text = "";
          contentScope.tbxSearch.placeholder = scope.presenter.renderI18nKeys("i18n.TradeFinance.searchforDrawerTransactionRef", false);
          contentScope.flxCollectionDetails.setVisibility(false);
          contentScope.flxAmendmentListing.setVisibility(true);
          contentScope.flxPagination.setVisibility(true);
          contentButtonScope.setVisibility(false);
          contentScope.flxViewCollectionsButtons.setVisibility(false);
          contentScope.flxSelfAcceptance.setVisibility(false);
          scope.setViewActions();
          scope.setDefaultSort("imgTabTwoListHeader4");
          CURRENT_ROW_TEMPLATE = 'flxTempInwardAmendmentList';
          CURRENT_EXPAND_ROW_TEMPLATE = 'flxTempInwardAmendmentListExpand';
          scope.setPaginationComponent(kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"));
          serviceParameters.filterByParam = "collectionSrmsId";
          serviceParameters.filterByValue = collectionData.collectionSrmsId ? collectionData.collectionSrmsId : collectionData.collectionResponse.collectionSrmsId;
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
          contentScope.btnViewConsolidated.setVisibility(true);
          scope.renderDataInDashboardList();
          contentScope.flxSearch.right = 20 + contentScope.btnViewConsolidated.info.frame.width + 20 + "px";
        } else {
          contentScope.segTransactionList.setVisibility(false);
          contentScope.flxNoTransactions.setVisibility(true);
          contentScope.flxPagination.setVisibility(false);
          contentScope.flxBtnConsolidatedView.setVisibility(false);
          contentScope.btnViewConsolidated.setVisibility(false);
          contentScope.flxSearch.right = "20px";
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
          scope.presenter.getInwardAmendments(serviceParameters, "frmInwardCollectionsViewDetails");
        }
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionViewDetailsController",
          "method": "fetchAmendmentsData",
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
            serviceParameters.pageSize = "11";
            serviceParameters.pageOffset = "0";
            serviceParameters.searchString = searchString;
            scope.presenter.getInwardAmendments(serviceParameters, "frmInwardCollectionsViewDetails");
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
          lblRow1Column1Title1: "lblRow1Column1Title1",
          lblRow1Column1Title2: "lblRow1Column1Title2",
          flxRow1Column1Title3: "flxRow1Column1Title3",
          lblRow2Column1Title1: "lblRow2Column1Title1",
          lblRow2Column2Title2: "lblRow2Column2Title2",
          lblRow1Column1Title4: "lblRow1Column1Title4",
          lblRow2Column2Title3: "lblRow2Column2Title3",
          lblRow2Column2Title4: "lblRow2Column2Title4",
          btnDownload: "btnDownload",
          btnPrint: "btnPrint",
          btnAction: "btnAction",
          lblRow2Column1Value1: "lblRow2Column1Value1",
          lblRow2Column2Value2: "lblRow2Column2Value2",
          lblRow2Column2Value3: "lblRow2Column2Value3",
          lblRow2Column2Value4: "lblRow2Column2Value4",
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
          imgDaysLeft: "imgDaysLeft",
          lblRow2Column2Title2: "lblRow2Column2Title2",
          flxTempInwardAmendmentListExpand: "flxTempInwardAmendmentListExpand",
          flxTempHeaderContainer: "flxTempHeaderContainer"
        };
        serviceResponse.map(singleResponse => {
          masterData.push({
            lblColumn1: singleResponse.drawer ? singleResponse.drawer : NA,
            lblColumn2: singleResponse.amendmentNo ? singleResponse.amendmentNo : NA,
            lblColumn3: singleResponse.tenorType ? singleResponse.tenorType : NA,
            lblColumn4: singleResponse.receivedOn ? CommonUtilities.getFrontendDateString(singleResponse.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA,
            lblColumn5: singleResponse.amount ? singleResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(singleResponse.amount) : NA,
            lblColumn6: singleResponse.status ? singleResponse.status : NA,
            flxColumn1: {
              width: isTablet ? '22.5%' : '13%',
              right: isTablet ? '0%' : '4%'
            },
            flxColumn2: {
              isVisible: isTablet ? false : true
            },
            flxColumn3: {
              isVisible: isTablet ? false : true,
              width: isTablet ? '18%' : '11%',
              left: isTablet ? '' : '3.2%'
            },
            flxColumn4: {
              width: isTablet ? '18%' : '10%',
              left: isTablet ? '1%' : '1%'
            },
            flxColumn5: {
              width: isTablet ? '18%' : '18%',
              left: isTablet ? '0.2%' : '3.7%'
            },
            flxColumn6: {
              width: isTablet ? '20%' : '13%',
              left: isTablet ? '0%' : '-2%'
            },
            flxColumn7: {
              width: isTablet ? '16%' : '8%',
              left: isTablet ? '-4.5%' : '-1%'
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
                selectedRecord = singleResponse;
                isAmendViewDetailsonClick = true;
                isCollectionSrmsIdServiceTriggered = true;
                scope.presenter.showInwardCollectionScreen({
                  context: 'viewAmendmentDetails',
                  form: scope.view.id,
                  data: singleResponse
              });
              }
            },
            "btnPrint": {
              "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "isVisible": isTablet ? false : true,
              "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "onClick": function () {
                selectedRecord = singleResponse;
                isPrintNavigation = true;
                isCollectionSrmsIdServiceTriggered = true;
                scope.presenter.getInwardAmendmentsById({
                  "amendmentSrmsId": singleResponse.amendmentSrmsId
                }, "frmInwardCollectionsViewDetails");
              }
            },
            btnDownload: {
              "text": kony.i18n.getLocalizedString("i18n.common.Download"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
              "onClick": function () {
                scope.presenter.generateInwardAmendment({
                  "amendmentSrmsId": singleResponse.amendmentSrmsId
                }, "frmInwardCollectionsViewDetails");
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
        if (!this.presenter.isEmptyNullOrUndefined(prevSelectedIndex)) {
          // Removing expand row template and assigning normal row template
          let prevSelectedRowDataObject;
          prevSelectedRowDataObject = segData[prevSelectedIndex];
          prevSelectedRowDataObject.template = CURRENT_ROW_TEMPLATE;
          prevSelectedRowDataObject.flxColumn4 = {
            width: isTablet ? '18%' : '10%',
            left: isTablet ? '0%' : '1%'
          };
          prevSelectedRowDataObject.flxColumn1 = {
            width: isTablet ? '22.5%' : '13%',
            right: isTablet ? '0%' : '4%'
          },
          prevSelectedRowDataObject.flxColumn5 = {
            width: isTablet ? '18%' : '18%',
            left: isTablet ? '0.2%' : '3.7%'
          };
          prevSelectedRowDataObject.flxColumn6 = {
            width: isTablet ? '20%' : '13%',
            left: isTablet ? '1.2%' : '-2%'
          };
          prevSelectedRowDataObject.flxColumn7 = {
            width: isTablet ? '16%' : '8%',
            left: isTablet ? '-4.5%' : '-1%'
          };
          prevSelectedRowDataObject.flxRow1Column2 = {
            left: isTablet ? '7%' : '0%'
          };
          selectedRowDataObject.flxRow1Column3 = {
            left: isTablet ? '17%' : '3%'
          };
          selectedRowDataObject.flxRow1Column4 = {
            left: isTablet ? '4%' : '1%'
          };
          contentScope.segTransactionList.setDataAt(prevSelectedRowDataObject, prevSelectedIndex);
          if (prevSelectedIndex === rowIndex) {
            prevSelectedIndex = null;
            return;
          }
        }
        prevSelectedIndex = rowIndex;
        selectedRowDataObject.template = CURRENT_EXPAND_ROW_TEMPLATE;
        // Setting data at expanded row template
        selectedRowDataObject.flxRow1Column1 = {
          width: isTablet ? '14%' : '13%',
          right: isTablet ? '2%' : '4%'
        };
        selectedRowDataObject.flxRow1Column3 = {
          left: isTablet ? '17%' : '3%',
          width: isTablet ? '15%' : '11%'
        };
        selectedRowDataObject.flxRow1Column4 = {
          left: isTablet ? '3%' : '1%',
          width: isTablet ? '18%' : '10%'
        };
        selectedRowDataObject.flxRow1Column5 = {
          isVisible: isTablet ? false : true
        };
        selectedRowDataObject.flxRow1Column6 = {
          isVisible: isTablet ? false : true
        };
        selectedRowDataObject.flxRow1Column7 = {
          left: isTablet ? '-5%' : '3.1%'
        };
        selectedRowDataObject.flxRow2Column1 = {
          right: isTablet ? '2%' : '6%',
          width: "14%"
        };
        selectedRowDataObject.flxColumn5 = {
          width: isTablet ? '13%' : '18%',
          left: isTablet ? '0.2%' : '-2%'
        };
        selectedRowDataObject.flxRow1Column2 = {
          left: isTablet ? '7%' : '0%'
        };
        selectedRowDataObject.flxColumn6 = {
          width: isTablet ? '20%' : '13%',
          left: isTablet ? '6%' : '4%'
        };
        selectedRowDataObject.flxColumn7 = {
          width: isTablet ? '16%' : '8%',
          left: isTablet ? '-4.5%' : '-1%'
        };
        selectedRowDataObject.flxTempInwardAmendmentListExpand = {
          height: isTablet ? "176dp" : singleResponse.hasOwnProperty("cancellationStatus") ? "176dp" : "112dp"
        };
        selectedRowDataObject.flxRowTwo = {
          isVisible: isTablet ? true : (singleResponse.cancellationStatus ? true : false)
        };
        selectedRowDataObject.lblRow1Column1Title1 = {
          text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNo", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", false)
        };
        selectedRowDataObject.lblRow1Column1Title2 = {
          text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", false) : scope.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", false)
        };
        selectedRowDataObject.flxRow1Column1Title3 = {
          text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.daysLeftTopay", false)
        };
        selectedRowDataObject.lblRow1Column1Title4 = {
          text: isTablet ? scope.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.remittingBank", false)
        };
        selectedRowDataObject.lblRow2Column1Title1 = {
          text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.daysLeftTopay", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.CancellationStatus", false)
        };
        selectedRowDataObject.lblRow2Column2Title2 = {
          text: scope.presenter.renderI18nKeys("i18n.TradeFinance.remittingBank", false)
        };
        selectedRowDataObject.lblRow2Column1Title3 = {
          text: scope.presenter.renderI18nKeys("i18n.TradeFinance.CancellationStatus", false),
          isVisible: true
        };
        selectedRowDataObject.imgDaysLeft = {
          isVisible: isTablet ? false : true
        };
        selectedRowDataObject.lblDaysLeft = {
          left: isTablet ? '0dp' : '5dp'
        };
        selectedRowDataObject.lblRow2Column1Value1 = {
          left: isTablet ? '5dp' : '0dp'
        };
        selectedRowDataObject.imgDaysLeftTab = {
          isVisible: isTablet ? true : false,
        };
        selectedRowDataObject.flxRow2Column4 = {
		  isVisible: isTablet ? (singleResponse.cancellationStatus ? true : false) : false,
		  width: isTablet ? '20%' : '13%',
		  left: isTablet ? '13%' : '3%'
        };
        selectedRowDataObject.flxRow2Column2 = {
          isVisible: isTablet ? true : false,
          width: isTablet ? '14%' : '10%',
          left: isTablet ? '7%' : '0%'
        };
        let tempMaturityDate = scope.presenter.calculateMaturityDate(singleResponse.maturityDate);
        if (isTablet) {
          selectedRowDataObject.lblRow1Column1Value1 = singleResponse.amendmentNo ? singleResponse.amendmentNo : NA;
          selectedRowDataObject.lblRow1Column1Value2 = singleResponse.tenorType ? singleResponse.tenorType : NA;
          selectedRowDataObject.lblDaysLeft = singleResponse.amendmentSrmsId ? singleResponse.amendmentSrmsId : NA;
          selectedRowDataObject.lblRow1Column1Value4 = singleResponse.maturityDate ? CommonUtilities.getFrontendDateString(singleResponse.maturityDate, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
          selectedRowDataObject.lblRow2Column1Value1["text"] = tempMaturityDate.daysLeft;
          selectedRowDataObject.imgDaysLeftTab["src"] = tempMaturityDate.imageToLoad;
          selectedRowDataObject.lblRow2Column2Value2 = singleResponse.remittingBank ? singleResponse.remittingBank : NA;
          selectedRowDataObject.lblRow2Column2Value4 = {
            text: singleResponse.cancellationStatus ? singleResponse.cancellationStatus : NA,
            skin: 'ICSknlbl424242SSP15pxSemibold'
          };
        } else {
          selectedRowDataObject.lblRow1Column1Value1 = singleResponse.amendmentSrmsId ? singleResponse.amendmentSrmsId : NA;
          selectedRowDataObject.lblRow1Column1Value2 = singleResponse.maturityDate ? CommonUtilities.getFrontendDateString(singleResponse.maturityDate, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
          selectedRowDataObject.lblDaysLeft["text"] = tempMaturityDate.daysLeft;
          selectedRowDataObject.imgDaysLeft["src"] = tempMaturityDate.imageToLoad;
          selectedRowDataObject.lblRow1Column1Value4 = singleResponse.remittingBank ? singleResponse.remittingBank : NA;
          selectedRowDataObject.lblRow2Column1Value1["text"] = singleResponse.cancellationStatus ? singleResponse.cancellationStatus : NA;
          selectedRowDataObject.lblRow2Column1Value1["skin"] = "ICSknlbl424242SSP15pxSemibold";
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
        response["collectionResponse"] = collectionData.collectionResponse === undefined ? collectionData : collectionData.collectionResponse;
        response["groupAmendmentResponse"] = serviceResponse;
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "InwardCollectionsUIModule/frmInwardCollectionAmedmentsConsolidatedView"
        }).navigate(response);
      }
      catch (err) {
        var errorObj = {
          "method": "navigateToConsolidatedView",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /*  Method : setAccountsDropdown 
   *  Method to set data in account list dropdown 
   *  return : NA
   */
    setAccountsDropdown: function (segName) {
      var scope = this;
      try {
        var segmentData = [];
        var accountList = applicationManager.getConfigurationManager().userAccounts;
        for (let i = 0; i < accountList.length; i++) {
          accountList[i].formattedName = CommonUtilities.mergeAccountNameNumber(accountList[i].nickName || accountList[i].accountName, accountList[i].accountID);
        }
        contentScope[segName].widgetDataMap = {
          "lblListValue": "value",
          "selectedKey": "key",
          "flxDropdownValue": "flxDropdownValue"
        };
        for (var key in accountList) {
          if ([OLBConstants.ACCOUNT_TYPE.SAVING, OLBConstants.ACCOUNT_TYPE.CHECKING, OLBConstants.ACCOUNT_TYPE.CURRENT].includes(accountList[key].accountType)) {
            segmentData.push({
              "key": accountList[key].accountID,
              "value": accountList[key].formattedName
            });
          }
        }
        contentScope[segName].setData(segmentData);
        contentScope[segName].onRowClick = this.accountsRowOnClick.bind(this, segName);
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionViewDetailsController",
          "method": "setAccountsDropdown",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /*  Method : accountsRowOnClick 
   *  set data from accounts dropdown to label
   *  return : NA
   */
    accountsRowOnClick: function (segName) {
      try {
        var scope = this;
        var data = contentScope[segName].data;
        var index = contentScope[segName].selectedRowIndex;
        if (segName === contentScope.segDebitAccount.id) {
          contentScope.lblSelectedDebitAccount.text = data[index[1]].value;
          debitAmountFrom = data[index[1]].key;
          contentScope.lblSelectedDebitAccount.skin = "sknLblSSP15pxtrucation";
        } else {
          contentScope.lblSelectedChargesDebitAccount.text = data[index[1]].value;
          debitChargesFrom = data[index[1]].key;
          contentScope.lblSelectedChargesDebitAccount.skin = "sknLblSSP15pxtrucation";
        }
        scope.showOrHideAccounts(segName);
        scope.enableOrDisableSubmit();
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionViewDetailsController",
          "method": "accountsRowOnClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : showOrHideAccounts
   * This function to handle the visibitlity of accounts dropdown.
   * @return : NA
   */
    showOrHideAccounts: function (segName) {
      var scope = this;
      try {
        if (segName === contentScope.segDebitAccount.id) {
          if (contentScope.lblDebitAccountDropdown.text === ViewConstants.FONT_ICONS.CHEVRON_UP) {
            contentScope.lblDebitAccountDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            contentScope.flxDebitAccountList.setVisibility(false);
          } else {
            contentScope.lblDebitAccountDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
            contentScope.flxDebitAccountList.setVisibility(true);
          }
        } else {
          if (contentScope.lblChargesDebitAccountDropdown.text === ViewConstants.FONT_ICONS.CHEVRON_UP) {
            contentScope.lblChargesDebitAccountDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            contentScope.flxChargesDebitAccountList.setVisibility(false);
          } else {
            contentScope.lblChargesDebitAccountDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
            contentScope.flxChargesDebitAccountList.setVisibility(true);
          }
        }

      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionViewDetailsController",
          "method": "showOrHideAccounts",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
 * @api : getAccountDetails
 * This function to fetch formatted accounts Detals
 * @return : NA
 */
    getAccountDetails: function (segName, accNo) {
      var scope = this;
      var accountsDetails = contentScope[segName].data;
      try {
        for (id in accountsDetails) {
          if (accNo === accountsDetails[id].key)
            return accountsDetails[id].value;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionViewDetailsController",
          "method": "getAccountDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
        * @api : ShowConfirmPopup
        * Triggerd on click of submit Consent
        * @return : NA
        */
    ShowConfirmPopup: function () {
      var scope = this;
      var breakpoint = kony.application.getCurrentBreakpoint();
      var orientationHandler = new OrientationHandler();
      try {
        contentPopupScope.setVisibility(true);
        contentPopupScope.flxDraweeConsentPopup.setVisibility(true);
        confirmPopupScope.lblHeading.text = collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.APPROVED).toLowerCase() ? scope.presenter.renderI18nKeys("i18n.TradeFinance.initiatePayment", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeConsent", false);
        confirmPopupScope.lblPopupMessage.text = collectionData.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.APPROVED).toLowerCase() ? scope.presenter.renderI18nKeys("i18n.TradeFinance.submitPaymentInitiationRequest", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.submitDraweeConsentRequest", false);
        confirmPopupScope.btnYes.text = scope.presenter.renderI18nKeys("kony.mb.common.submit", false);
        confirmPopupScope.btnNo.text = scope.presenter.renderI18nKeys("i18n.konybb.common.cancel", false);
        confirmPopupScope.btnYes.onClick = scope.submitDraweeConsent.bind(this);
        confirmPopupScope.flxCross.onClick = scope.closePopup.bind(scope, 'flxDraweeConsentPopup');
        confirmPopupScope.btnNo.onClick = scope.closePopup.bind(scope, 'flxDraweeConsentPopup');
        if (breakpoint === 1380 || orientationHandler.isDesktop)
          confirmPopupScope.btnYes.left = "";
      } catch (err) {
        var errorObj = {
          "method": "ShowConfirmPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api :responsiveDesignOfAmendmentTab
     * Responsive design logic of amendment tab
     * @return : NA
     */
    responsiveDesignOfAmendmentTab: function () {
      var scope = this;
      try {
        contentScope.flxTabTwoListHeader1.width = isTablet ? '9%' : '11%';
        contentScope.flxTabTwoListHeader1.right = isTablet ? '6%' : '6%';
        contentScope.flxTabTwoListHeader2.isVisible = isTablet ? false : true;
        contentScope.flxTabTwoListHeader2.width = '10%';
        contentScope.flxTabTwoListHeader2.left = '0%';
        contentScope.flxTabTwoListHeader3.isVisible = isTablet ? false : true;
        contentScope.flxTabTwoListHeader3.width = '10%';
        contentScope.flxTabTwoListHeader3.left = '3%';
        contentScope.flxTabTwoListHeader4.left = isTablet ? '8%' : '2%';
        contentScope.flxTabTwoListHeader5.width = isTablet ? '10%' : '10%';
        contentScope.flxTabTwoListHeader5.left = isTablet ? '11%' : '9%';
        contentScope.flxTabTwoListHeader6.width = isTablet ? '10%' : '10%';
        contentScope.flxTabTwoListHeader6.left = isTablet ? '7%' : '1%';
        contentScope.flxTabTwoListHeader7.width = isTablet ? '10%' : '10%';
        contentScope.flxTabTwoListHeader7.left = isTablet ? '10.5%' : '0%';
      } catch (err) {
        var errorObj = {
          "method": "responsiveDesignOfAmendmentTab",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

		/**
     * Method to check whether a string is JSON object or not
     * @param {string} val - contains value to be checked
     * @returns {boolean} - validity of value
     */
    isJSON: function (val) {
      try {
        val = val.replace(/'/g, '"');
        return (JSON.parse(val) && !!val);
      } catch (e) {
        return false;
      }
    },
    
    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @return : NA
     */
    onError: function (err) {
      var errMsg = JSON.stringify(err);
    },

  };
});