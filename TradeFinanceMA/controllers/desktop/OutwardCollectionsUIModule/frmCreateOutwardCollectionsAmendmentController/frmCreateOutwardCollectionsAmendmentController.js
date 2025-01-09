define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let contentScope, buttonScope, popupScope, formTemplateScope;
  let documentsList = [];
  let docReferenceValues = [];
  let swiftsAdvicesData = {};
  let document = '';
  let paymentAdvices;
  let swiftMessages;
  let deletedIndex;
  let collectionResponse;
  let amendmentResponse;
  let isReviseFlow = false;
  let outwardcollection_status;
  let payload;
  let creditAccount;
  let DebitAccount;
  let physicalDocumentsDetails = [];
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  const YES = "Yes";
  const NO = "No";
  let collectionOverViewArray = [],
    paymentStatusArray = [],
    draweeConsentArray = [],
    collectionDetailsArray = [],
    draweeAndBankDetailsArray = [],
    documentAndBankInstructionArray = [];
  let isTablet = false;
  return {
    documentTitle: [],
    count: 1,
    documentUploadsIndex: 0,
    disableSkin: "bbsknA0A0A015px",
    enableSkin: "bbSknLbl424242SSP15Px",
    documentsflag: true,
    docTitleRowClick: false,
    DEFAULT_PHYSICAL_DOC_TITLE: "Select Document Title",
    /**
     * Sets the initial actions for form
     */
    init: function() {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
    },

    /**
     * Performs the actions required before rendering form
     */
    preShow: function() {
      var scope = this;
      try {
        scope.segViewDetailsTempData = "";
        outwardcollection_status = this.presenter.collectionStatusConfig;
        scope.setsegCollectionDetails();
        popupScope.flxMainViewContainer.doLayout = CommonUtilities.centerPopupFlex;
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * Performs the actions required after rendering form
     */
    postShow: function() {
      var scope = this;
      try {
        scope.setSegmentData();
        if (!isReviseFlow) {
          scope.setDefaultUI();
        } else {
          let swiftAdvicesPayload = {
            'orderId': amendmentResponse.amendmentReference,
            'product': 'Collection'
          };
          scope.preFillReviseData();
          scope.setReviewScreenUI(false);
          contentScope.flxErrorMessage.setVisibility(false);
          buttonScope.setVisibility(true);
          contentScope.lblUploadScannedDocs.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.UploadDocuments", false);
          scope.presenter.fetchSwiftsAdvices(swiftAdvicesPayload, 'frmCreateOutwardCollectionsAmendment');
        }
        scope.initButtonActions();
        scope.setCollectionDetails();
        scope.setAmendmentOverviewDetails();
        scope.setAccountsDropdown(contentScope.segCreditAccount.id);
        scope.setAccountsDropdown(contentScope.segDebitAccount.id);
        scope.setDropdownValues(contentScope.segCurrencyList, scope.presenter.collectionsConfig.currencies, contentScope.flxCurrencyList);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : onNavigate
     * This function for executing the preShow and postShow
     * @return : NA
     */
    onNavigate: function(data) {
      var scope = this;
      try {
        formTemplateScope = this.view.formTemplate12;
        contentScope = this.view.formTemplate12.flxContentTCCenter;
        buttonScope = this.view.formTemplate12.flxTCButtons;
        popupScope = this.view.formTemplate12.flxContentPopup;
        this.presenter = applicationManager.getModulesPresentationController({
          'appName': 'TradeFinanceMA',
          'moduleName': 'OutwardCollectionsUIModule'
        });
        if (data.hasOwnProperty("isReviseFlow") && data.isReviseFlow) {
          isReviseFlow = data.isReviseFlow;
          collectionResponse = data.collectionData;
          collectionResponse.isReviseFlow = data.isReviseFlow;
          scope.setCollectionDetails();
          amendmentResponse = data.amendmentData;
          creditAccount = amendmentResponse.creditAccount;
          DebitAccount = amendmentResponse.chargesDebitAccount;
        } else {
          collectionResponse = data;
          isReviseFlow = false;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "onNavigate",
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
    updateFormUI: function(viewModel) {
      var scope = this;
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.serverError) {
        contentScope.lblErrorMessage.text = viewModel.serverError;
        contentScope.flxErrorMessage.setVisibility(true);
      }
      if (viewModel.uploadDocument) {
        this.storeDocumentReference(viewModel.uploadDocument[0].documentReference);
      }
      if (viewModel.deleteDocument) {
        this.removeDocumentReference();
      }
      if (viewModel.fetchSwiftsAdvices) {
        swiftsAdvicesData = viewModel.fetchSwiftsAdvices;
        scope.renderSwiftAdvice();
      }
      if (viewModel.fetchFileResponse) {
        popupScope.setVisibility(true);
        popupScope.flxViewCollectionDetailsPopup.setVisibility(false);
        popupScope.flxSwiftDetailsPopup.setVisibility(true);
        popupScope.richTextArea.text = viewModel.fetchFileResponse;
      }
    },

    /**
     * @api : seti18nKeys
     * This function is responsible for setting i18n Key-Values
     * @return : NA
     */
    seti18nKeys: function() {
      var scope = this;
      try {
        contentScope.lblDraweeDetails.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.drawerDetails", true);
        contentScope.lblTenorType.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true);
        contentScope.lblCollectingBankDetails.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.collectingBankDetails", true);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "seti18nKeys",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setDefaultUI
     * This function to set default UI when landing on screen.
     * @return : NA
     */
    setDefaultUI: function() {
      var scope = this;
      try {
        scope.seti18nKeys();
        if ((collectionResponse.tenorType ? collectionResponse.tenorType.toLowerCase() === "usance" : false) || (collectionResponse.allowUsanceAcceptance ?collectionResponse.allowUsanceAcceptance.toLowerCase() === "yes" : false)) {
          contentScope.flxTenorToUsanceContainer.setVisibility(false);
          contentScope.flxUsanceAcceptanceContainer.setVisibility(false);
        } else {
          contentScope.flxTenorToUsanceContainer.setVisibility(true);
          contentScope.flxUsanceAcceptanceContainer.setVisibility(true);
        }
        contentScope.flxUploadDocument.bottom = isTablet ? "20dp" : "0dp";
        contentScope.flxSegSelectOriginal.left = isTablet ? "30%" : "28.5%";
        contentScope.flxSegSelectOriginal.width = isTablet ? "15.5%" : "13.3%";
        contentScope.flxSegCopiesCount.left = isTablet ? "49.5%" : "44.5%";
        contentScope.flxSegCopiesCount.width = isTablet ? "15%" : "13.5%" ;
        contentScope.flxErrorMessage.setVisibility(false);
        contentScope.lblUploadScannedDocs.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.Uploadscanneddocuments", false);
        buttonScope.setVisibility(false);
        scope.setReviewScreenUI(false);
        scope.clearAndUncheckFields();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "setDefaultUI",
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
    initButtonActions: function() {
      var scope = this;
      try {
        contentScope.flxCheckDocumentNo.onClick = scope.setInputUI.bind(this, contentScope.flxCheckDocumentNo.id);
        contentScope.flxCheckTenorToUsance.onClick = scope.setInputUI.bind(this, contentScope.flxCheckTenorToUsance.id);
        contentScope.flxCheckUsanceDetails.onClick = scope.setInputUI.bind(this, contentScope.flxCheckUsanceDetails.id);
        contentScope.flxCheckUsanceAcceptance.onClick = scope.setInputUI.bind(this, contentScope.flxCheckUsanceAcceptance.id);

        contentScope.flxCheckCurrencyAndAmount.onClick = scope.setInputUI.bind(this, contentScope.flxCheckCurrencyAndAmount.id);
        contentScope.flxCheckCreditAccount.onClick = scope.setInputUI.bind(this, contentScope.flxCheckCreditAccount.id);
        contentScope.flxCheckDebitAccount.onClick = scope.setInputUI.bind(this, contentScope.flxCheckDebitAccount.id);

        contentScope.flxCheckUploadDocument.onClick = scope.setInputUI.bind(this, contentScope.flxCheckUploadDocument.id);
        contentScope.flxCheckPhysicalDocument.onClick = scope.setInputUI.bind(this, contentScope.flxCheckPhysicalDocument.id);
        contentScope.flxCheckCollectionsDetails.onClick = scope.setInputUI.bind(this, contentScope.flxCheckCollectionsDetails.id);
        contentScope.flxCheckMessageToBank.onClick = scope.setInputUI.bind(this, contentScope.flxCheckMessageToBank.id);

        contentScope.flxCreditAccountDropdown.onClick = scope.showOrHideAccounts.bind(this, contentScope.segCreditAccount.id);
        contentScope.flxDebitAccountDropdown.onClick = scope.showOrHideAccounts.bind(this, contentScope.segDebitAccount.id);
        contentScope.flxCurrencyDropdown.onClick = scope.showOrHideAccounts.bind(this, contentScope.segCurrencyList.id);
        contentScope.segCurrencyList.onRowClick = scope.setCurrencyDropdownValues.bind(this, contentScope.segCurrencyList.id, contentScope.lblSelectedCurrencyValue);
        contentScope.btnViewDetails.onClick = scope.appendResponses.bind(this);

        scope.restrictCharacter(contentScope.txtDocumentNo.id);
        scope.restrictCharacter(contentScope.txtUsanceDays.id);
        scope.restrictCharacter(contentScope.txtAmount.id);
        contentScope.txtAmount.onEndEditing = function() {
          contentScope.txtAmount.text = scope.formatAmount(contentScope.txtAmount.text, {
            "locale": "",
            "positiveFormat": "{CS}{D}",
            "negativeFormat": "-({CS}{D})",
            "fractionDigits": "2"
          });
          scope.checkInputFields();
        }
        popupScope.Popup.flxCross.onClick = this.togglePopup.bind(this, false);
        contentScope.btnUpload.onClick = scope.browseSupportingDocument.bind(this);
        contentScope.btnAdd.onClick = scope.addToTheList.bind(this, true);
        contentScope.btnAddManual.onClick = scope.addToTheList.bind(this, false);
        contentScope.btnReviewAndSubmit.onClick = function() {
          if (contentScope.btnReviewAndSubmit.text === scope.presenter.renderI18nKeys("i18n.kony.BulkPayments.ViewRequests", false)) {
            scope.setReviewScreenUI(true);
          } else {
            scope.constructPayload();
          }
        }
        contentScope.btnBack.onClick = scope.setReviewScreenUI.bind(this, false);

        contentScope.segDocTitleDropdown.onRowClick = scope.segDocTitleDropdownRowClick.bind(this, "segDocTitleDropdown", "lblSelectEnter", 1, false);
        contentScope.segSelectOriginalCopies.onRowClick = this.segDocTitleDropdownRowClick.bind(this, "segSelectOriginalCopies", "lblOriginalsCount", 2, false);
        contentScope.segCopiesCount.onRowClick = this.segDocTitleDropdownRowClick.bind(this, "segCopiesCount", "lblCopiesCount", 3, false);
        contentScope.txtDocumentNo.onEndEditing = scope.checkInputFields.bind(this);
        contentScope.txtUsanceDays.onEndEditing = scope.checkInputFields.bind(this);
        contentScope.txtUsanceDetails.onEndEditing = scope.checkInputFields.bind(this);

        contentScope.txtCollectionDetails.onEndEditing = scope.checkInputFields.bind(this);
        contentScope.txtMessageToBank.onEndEditing = scope.checkInputFields.bind(this);
        contentScope.flxErrorClose.onClick = function() {
          contentScope.flxErrorMessage.setVisibility(false);
        };
        contentScope.btnCancel.onClick = function() {
          scope.presenter.showOutwardCollectionScreen({
            context: 'outwardCollectionAmendmentDashboard',
            form: scope.view.id,
            data: {
              flowType: kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllAmendments")
            }
          });
          popupScope.btnSwiftMessageClose.onClick = () => {
            popupScope.setVisibility(false);
            popupScope.flxViewCollectionDetailsPopup.setVisibility(false);
            popupScope.flxSwiftDetailsPopup.setVisibility(false);
          };
        }

        buttonScope.flxPrint.onClick = scope.navigateToPrint.bind(this);
        buttonScope.flxDownload.onClick = scope.navigateToDownload.bind(this);
        buttonScope.btnSwiftAndAdvices.onClick = () => {
          buttonScope.flxSwiftAndAdvices.isVisible ? buttonScope.flxSwiftAndAdvices.setVisibility(false) : buttonScope.flxSwiftAndAdvices.setVisibility(true);
        };
        popupScope.btnSwiftMessageClose.onClick = () => {
          popupScope.setVisibility(false);
          popupScope.flxViewCollectionDetailsPopup.setVisibility(false);
          popupScope.flxSwiftDetailsPopup.setVisibility(false);
        };
        contentScope.flxUploadInfoIcon.onClick = function() {
          contentScope.flxInfoUploadMsg.setVisibility(true);
        };
        contentScope.flxInfoClose.onClick = function() {
          contentScope.flxInfoUploadMsg.setVisibility(false);
        };
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },


    /**
     * @api : clearAndUncheckFields
     * This function for clearing and unchecking fields
     * @param : name of the segment.
     * @return : NA
     */
    clearAndUncheckFields: function() {
      var scope = this;
      try {
        scope.setReviseUI(contentScope.lblCheckDocumentNo, false);
        scope.setReviseUI(contentScope.lblCheckDocumentNo, false);
        scope.setReviseUI(contentScope.lblCheckTenorToUsance, false);
        scope.setReviseUI(contentScope.lblCheckUsanceDetails, false);
        scope.setReviseUI(contentScope.lblCheckUsanceAcceptance, false);
        scope.setReviseUI(contentScope.lblCheckCurrencyAndAmount, false);
        scope.setReviseUI(contentScope.lblCheckCreditAccount, false);
        scope.setReviseUI(contentScope.lblCheckDebitAccount, false);
        scope.setReviseUI(contentScope.lblCheckUploadDocument, false);
        scope.setReviseUI(contentScope.lblCheckPhysicalDocument, false);
        scope.setReviseUI(contentScope.lblCheckCollectionsDetails, false);
        scope.setReviseUI(contentScope.lblCheckMessageToBank, false);

        contentScope.txtDocumentNo.text = '';
        contentScope.txtUsanceDays.text = '';
        contentScope.txtUsanceDetails.text = '';
        contentScope.txtAmount.text = '';
        contentScope.lblSelectedCurrencyValue.text = scope.presenter.renderI18nKeys("i18n.common.Currency", false);
        contentScope.lblSelectedCreditAccountValue.text = scope.presenter.renderI18nKeys("i18n.common.selecthere", false);
        contentScope.lblSelectedDebitAccountValue.text = scope.presenter.renderI18nKeys("i18n.common.selecthere", false);
        contentScope.txtCollectionDetails.text = '';
        contentScope.txtMessageToBank.text = '';
        for (let rowIndex = contentScope.segSelectDocTitle.data.length - 1; rowIndex >= 1; rowIndex--) {
          contentScope.segSelectDocTitle.removeAt(rowIndex, 0);
        }
        scope.count = 1;
        documentsList = [];
        scope.setDocumentsDataToSegment();
        document = '';
        docReferenceValues = [];
        deletedIndex = '';

        contentScope.flxSegDocTitleDropdown.setVisibility(false);
        contentScope.flxSegSelectOriginal.setVisibility(false);
        contentScope.flxSegCopiesCount.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "clearAndUncheckFields",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setCollectionDetails
     * This function for setting collection summary details
     * @param : name of the segment.
     * @return : NA
     */
    setCollectionDetails: function() {
      var scope = this;
      try {
        contentScope.lblDraweeDetailsValue.text = collectionResponse.draweeName || NA;
        contentScope.lblTransactionRefValue.text = collectionResponse.collectionReference || NA;
        contentScope.lblAmountValue.text = collectionResponse.currency + " " + scope.formatAmount(collectionResponse.amount) || NA;
        contentScope.lblTenorTypeValue.text = collectionResponse.tenorType || NA;
        contentScope.lblMaturityDateValue.text = collectionResponse.maturityDate || NA;
        contentScope.lblCollectingBankDetailsValue.text = collectionResponse.collectingBank || NA;
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "setCollectionDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : preFillReviseData
     * This function for setting revise flow data
     * @param : name of the segment.
     * @return : NA
     */
    preFillReviseData: function() {
      var scope = this;
      try {
        if (!scope.presenter.isEmptyNullOrUndefined(amendmentResponse.documentNo)) {
          scope.setReviseUI(contentScope.lblCheckDocumentNo, true);
          contentScope.txtDocumentNo.text = amendmentResponse.documentNo;
        } else {
          scope.setReviseUI(contentScope.lblCheckDocumentNo, false);
        }
        if (!scope.presenter.isEmptyNullOrUndefined(amendmentResponse.amendTenorType)) {
          if (amendmentResponse.amendTenorType.toLowerCase() === OLBConstants.INWARD_COLLECTIONS_TENORTYPE.USANCE.toLowerCase()) {
            scope.setReviseUI(contentScope.lblCheckTenorToUsance, true);
          }
        } else {
          scope.setReviseUI(contentScope.lblCheckTenorToUsance, false);
        }
        if (!scope.presenter.isEmptyNullOrUndefined(amendmentResponse.usanceDetails)) {
          scope.setReviseUI(contentScope.lblCheckUsanceDetails, true);
          contentScope.txtUsanceDays.text = amendmentResponse.usanceDays;
          contentScope.txtUsanceDetails.text = amendmentResponse.usanceDetails;
        } else {
          scope.setReviseUI(contentScope.lblCheckUsanceDetails, false);
        }
        if (!scope.presenter.isEmptyNullOrUndefined(amendmentResponse.allowUsanceAcceptance)) {
          if (amendmentResponse.allowUsanceAcceptance === YES) {
            scope.setReviseUI(contentScope.lblCheckUsanceAcceptance, true);
          }
        } else {
          scope.setReviseUI(contentScope.lblCheckUsanceAcceptance, false);
        }
        if (!scope.presenter.isEmptyNullOrUndefined(amendmentResponse.amount)) {
          scope.setReviseUI(contentScope.lblCheckCurrencyAndAmount, true);
          contentScope.lblSelectedCurrencyValue.text = amendmentResponse.currency;
          contentScope.txtAmount.text = scope.formatAmount(amendmentResponse.amount);
        } else {
          scope.setReviseUI(contentScope.lblCheckCurrencyAndAmount, false);
        }
        if (!scope.presenter.isEmptyNullOrUndefined(amendmentResponse.creditAccount)) {
          scope.setReviseUI(contentScope.lblCheckCreditAccount, true);
          contentScope.lblSelectedCreditAccountValue.text = scope.presenter.getAccountDisplayName(amendmentResponse.creditAccount);
        } else {
          scope.setReviseUI(contentScope.lblCheckCreditAccount, false);
        }
        if (!scope.presenter.isEmptyNullOrUndefined(amendmentResponse.chargesDebitAccount)) {
          scope.setReviseUI(contentScope.lblCheckDebitAccount, true);
          contentScope.lblSelectedDebitAccountValue.text = scope.presenter.getAccountDisplayName(amendmentResponse.chargesDebitAccount);
        } else {
          scope.setReviseUI(contentScope.lblCheckDebitAccount, false);
        }
        let uploadedDocument = !scope.presenter.isEmptyNullOrUndefined(amendmentResponse.uploadDocuments) ? JSON.parse(amendmentResponse.uploadDocuments) : "";
        if (!scope.presenter.isEmptyNullOrUndefined(uploadedDocument)) {
          const extensions = this.presenter.collectionsConfig.fileExtensions;
          let documentNames = [];
          let amendDocs = JSON.parse(amendmentResponse.uploadDocuments.replace(/'/g, "\""));
          for (i = 0; i < amendDocs.length; i++) {
            docReferenceValues.push(amendDocs[i]["documentReferences"]);
            documentNames.push(amendDocs[i]["documentName"]);
          }
          documentsList = documentNames.map(d => [d, extensions[d.split('.').pop()]]);
          scope.setDocumentsDataToSegment();
          scope.setReviseUI(contentScope.lblCheckUploadDocument, true);
        } else {
          scope.setReviseUI(contentScope.lblCheckUploadDocument, false);
        }
        let physicalDocuments = !scope.presenter.isEmptyNullOrUndefined(amendmentResponse.physicalDocuments) ? JSON.parse(amendmentResponse.physicalDocuments) : "";
        if (!scope.presenter.isEmptyNullOrUndefined(physicalDocuments)) {
          scope.setReviseUI(contentScope.lblCheckPhysicalDocument, true);
          scope.count = 0;
          contentScope.segSelectDocTitle.removeAll();
          scope.setRevisePhysicalDocuments();
        } else {
          scope.setReviseUI(contentScope.lblCheckPhysicalDocument, false);
        }
        if (!scope.presenter.isEmptyNullOrUndefined(amendmentResponse.otherCollectionDetails)) {
          scope.setReviseUI(contentScope.lblCheckCollectionsDetails, true);
          contentScope.txtCollectionDetails.text = amendmentResponse.otherCollectionDetails;
        } else {
          scope.setReviseUI(contentScope.lblCheckCollectionsDetails, false);
        }
        if (!scope.presenter.isEmptyNullOrUndefined(amendmentResponse.messageToBank)) {
          scope.setReviseUI(contentScope.lblCheckMessageToBank, true);
          contentScope.txtMessageToBank.text = amendmentResponse.messageToBank;
        } else {
          scope.setReviseUI(contentScope.lblCheckMessageToBank, false);
        }
        scope.checkInputFields();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "preFillReviseData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setReviseUI
     * This function for setting input fields UI
     * @param : name of the segment.
     * @return : NA
     */
    setReviseUI: function(widget, action) {
      var scope = this;
      try {
        widget.text = action ? scope.presenter.resourcesConstants.fontIcons.checkboxSelected : scope.presenter.resourcesConstants.fontIcons.checkboxUnselected;
        scope.showInputFields(widget.id, action);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "setReviseUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setRevisePhysicalDocuments
     * This function for setting revised physical documents to segment
     * @param : name of the segment.
     * @return : NA
     */
    setRevisePhysicalDocuments: function() {
      var scope = this;
      let physicalDocuments = JSON.parse(amendmentResponse.physicalDocuments);
      let selectedAccount;
      let rowIndex;
      try {
        for (let i = 0; i < physicalDocuments.length; i++) {
          if (scope.documentTitle.includes(physicalDocuments[i].documentTitle)) {
            scope.addToTheList(true);
            selectedAccount = {
              "lblField": {
                "text": physicalDocuments[i].documentTitle,
                "skin": "bbSknLbl424242SSP15Px"
              },
              "template": "flxDocumentDropDown"
            };
            rowIndex = scope.documentTitle.indexOf(physicalDocuments[i].documentTitle)
            scope.documentUploadsIndex = i;
            scope.segDocTitleDropdownRowClick("segDocTitleDropdown", "lblSelectEnter", 1, true, selectedAccount, rowIndex);
            selectedAccount = {
              "lblField": {
                "text": physicalDocuments[i].originalsCount,
                "skin": "bbSknLbl424242SSP15Px"
              },
              "template": "flxDocumentDropDown"
            };
            scope.segDocTitleDropdownRowClick("segSelectOriginalCopies", "lblOriginalsCount", 2, true, selectedAccount, i);
            selectedAccount = {
              "lblField": {
                "text": physicalDocuments[i].copiesCount,
                "skin": "bbSknLbl424242SSP15Px"
              },
              "template": "flxDocumentDropDown"
            };
            scope.segDocTitleDropdownRowClick("segCopiesCount", "lblCopiesCount", 3, true, selectedAccount, i);
          } else {
            scope.addToTheList(false);
          }
        }

      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "setRevisePhysicalDocuments",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setsegAmendmentOverviewWidgetDataMap
     * This function for setting widgetDataMap for segment
     * @param : name of the segment.
     * @return : NA
     */
    setsegAmendmentOverviewWidgetDataMap: function(segName) {
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
          "method": "setsegAmendmentOverviewWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setAmendmentOverviewDetails
     * This function for setting amendment overview data to segment
     * @return : NA
     */
    setAmendmentOverviewDetails: function() {
      var scope = this;
      try {
        scope.setsegAmendmentOverviewWidgetDataMap("segAmendmentOverview");
        let section1;
        let currentBreakpoint = kony.application.getCurrentBreakpoint();
        let isTablet = (currentBreakpoint > 640 && currentBreakpoint <= 1024);
        let AmendmentOverview = [];
        if (isReviseFlow) {
          section1 = [{
              "flxReviewHeader": {
                isVisible: false
              },
            },
            [{
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.serviceRequests.Status:", false),
                isVisible: true
              },
              lblReviewValue1: {
                text: amendmentResponse.status || NA,
                isVisible: true,
                skin: "ICSknlbl424242SSP15pxSemibold"
              },
              flxreviewRows: {
                isVisible: isReviseFlow ? true : false
              }
            }, {
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejectionWithColon", false),
                isVisible: true
              },
              lblReviewValue1: {
                text: amendmentResponse.reasonForRejection || NA,
                isVisible: true
              },
              flxreviewRows: {
                isVisible: isReviseFlow ? true : false
              }
            }, {
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.updatedOn", false),
                isVisible: true
              },
              lblReviewValue1: {
                text: CommonUtilities.getFrontendDateString(amendmentResponse.updatedOn, applicationManager.getConfigurationManager().frontendDateFormat) || NA,
                isVisible: true
              },
              flxreviewRows: {
                isVisible: isReviseFlow ? true : false
              }
            }, {
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNumber", true),
                isVisible: true
              },
              lblReviewValue1: {
                text: isReviseFlow ? amendmentResponse.amendmentNo : collectionResponse.amendmentNo ? collectionResponse.amendmentNo : "1",
                isVisible: true,
                bottom: isReviseFlow ? "0dp" : "20dp"
              },
              flxreviewRows: {
                isVisible: isReviseFlow ? true : false
              }
            }, {
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.requestedOn", true),
                isVisible: true
              },
              lblReviewValue1: {
                text: CommonUtilities.getFrontendDateString(amendmentResponse.requestedOn, applicationManager.getConfigurationManager().frontendDateFormat),
                isVisible: true
              },
              flxreviewRows: {
                isVisible: isReviseFlow ? true : false
              }
            }, {
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentReference", true),
                isVisible: true
              },
              lblReviewValue1: {
                text: amendmentResponse.amendmentReference || NA,
                isVisible: true
              },
              flxreviewRows: {
                isVisible: isReviseFlow ? true : false,
                bottom: "20dp"
              }
            }]
          ];
        } else {
          section1 = [{
              "flxReviewHeader": {
                isVisible: false
              },
            },
            [{
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNumber", true),
                isVisible: true
              },
              lblReviewValue1: {
                text: isReviseFlow ? amendmentResponse.amendmentNo : collectionResponse.amendmentNo ? collectionResponse.amendmentNo : "1",
                isVisible: true,
                bottom: "20dp"
              }
            }]
          ];
        }
        AmendmentOverview.push(section1);
        contentScope.segAmendmentOverview.setData(AmendmentOverview);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "setAmendmentOverviewDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setSegmentData
     * This function is for responsible for physical document segment data
     * @return : NA
     */
    setSegmentData: function() {
      var scope = this;
      try {
        var documentCopy = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "Will not submit"];
        scope.documentTitle = ["Drafts", "Invoices", "B/L or AWB", "Shipment Advice", "Cert. of Origin", "Insurance", "Packing List", " Weight List", "Inspection Cert.", "Beneficiary Cert.", "TCN/TWB", " Original LC", "Amendment"];
        scope.setDocumentsDropdownSegmentData(contentScope.segDocTitleDropdown.id, scope.documentTitle);
        scope.setDocumentsDropdownSegmentData(contentScope.segSelectOriginalCopies.id, documentCopy);
        scope.setDocumentsDropdownSegmentData(contentScope.segCopiesCount.id, documentCopy);
        scope.setDocumentsData();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "setSegmentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setDocumentsData
     * This function is for responsible for setting document data
     * @return : NA
     */
    setDocumentsData: function() {
      var scope = this;
      try {
        contentScope.segSelectDocTitle.widgetDataMap = {
          "flxCopiesCount": "flxCopiesCount",
          "flxDelete": "flxDelete",
          "flxMain": "flxMain",
          "flxOriginalCount": "flxOriginalCount",
          "flxSelectDocTitle": "flxSelectDocTitle",
          "flxSelectDocument": "flxSelectDocument",
          "flxSelectDocumentTitleTablet": "flxSelectDocumentTitleTablet",
          "flxTextField": "flxTextField",
          "lblDelete": "lblDelete",
          "lblDropDown1": "lblDropDown1",
          "lblDropDown2": "lblDropDown2",
          "lblDropDown3": "lblDropDown3",
          "lblCopiesCount": "lblCopiesCount",
          "lblOriginalsCount": "lblOriginalsCount",
          "lblSelectEnter": "lblSelectEnter",
          "tbxEnterTitle": "tbxEnterTitle"
        };
        var documentsData = [];
        var breakPoint = kony.application.getCurrentBreakpoint();
        for (var i = 0; i < scope.count; i++) {
          documentsData[i] = {
            "flxSelectDocTitle": {
              "isVisible": true,
              "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegDocTitleDropdown", 1)
            },
            "flxTextField": {
              "isVisible": false
            },
            "lblSelectEnter": {
              "text": "Select Document Title"
            },
            "lblOriginalsCount": {
              "text": "Originals Count"
            },
            "lblCopiesCount": {
              "text": "Copies Count"
            },
            "lblDropDown1": {
              "text": "O"
            },
            "lblDropDown2": {
              "text": "O"
            },
            "lblDropDown3": {
              "text": "O"
            },
            "flxOriginalCount": {
              "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegSelectOriginal", 2),
              "width": breakPoint === 1024 ? "16%" : "14%"
            },
            "flxCopiesCount": {
              "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegCopiesCount", 3),
              "width": breakPoint === 1024 ? "16%" : "14%"
            },
            "tbxEnterTitle": {
              "text": "",
              "onEndEditing": scope.checkInputFields.bind(scope)
            },
            "flxDelete": {
              "isVisible": true,
              "onClick": scope.deleteDocuments.bind(scope)
            },
            "template": "flxSelectDocumentTitle"
          };
        }
        contentScope.segSelectDocTitle.setData(documentsData);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "setDocumentsData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setDocumentsDropdownSegmentData
     * This function is for responsible for setting physical document dropdown values
     * @return : NA
     */
    setDocumentsDropdownSegmentData: function(segment, records) {
      let segmentData = [];
      try {
        let documentsCopiesWidgetDataMap = {
          "flxDocumentDropDown": "flxDocumentDropDown",
          "flxLabel": "flxLabel",
          "flxMain": "flxMain",
          "lblField": "lblField"
        };
        contentScope[segment].widgetDataMap = documentsCopiesWidgetDataMap;
        for (var i = 0; i < records.length; i++) {
          segmentData[i] = {
            "lblField": {
              "text": records[i],
              "skin": this.enableSkin
            },
            "template": "flxDocumentDropDown"
          };
        }
        contentScope[segment].setData(segmentData);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "setDocumentsDropdownSegmentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : toggleDocumentDropdown
     * This function is for responsible for toggling document dropdown
     * @return : NA
     */
    toggleDocumentDropdown: function(flxwidget, count) {
      var scope = this;
      try {
        var index = contentScope.segSelectDocTitle.selectedRowIndex;
        var rowIndex = index[1];
        scope.documentUploadsIndex = rowIndex;
        var data = contentScope.segSelectDocTitle.data[rowIndex];
        scope.documentsflag = data["flxSelectDocTitle"].isVisible;
        if (contentScope[flxwidget].isVisible) {
          contentScope[flxwidget].setVisibility(false);
          data["lblDropDown" + count].text = "O";
        } else {
          contentScope.flxSegDocTitleDropdown.setVisibility(false);
          contentScope.flxSegSelectOriginal.setVisibility(false);
          contentScope.flxSegCopiesCount.setVisibility(false);
          data["lblDropDown1"].text = "O";
          data["lblDropDown2"].text = "O";
          data["lblDropDown3"].text = "O";
          contentScope.flxPhysicalDocDropDowns.top = 80 + (60 * rowIndex) + "dp";
          contentScope.flxPhysicalDocDropDowns.setVisibility(true);
          contentScope[flxwidget].setVisibility(true);
          data["lblDropDown" + count].text = "P";
        }
        contentScope.segSelectDocTitle.setDataAt(data, rowIndex);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "toggleDocumentDropdown",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : deleteDocuments
     * This function is for responsible for deleting document values
     * @return : NA
     */
    deleteDocuments: function() {
      var scope = this;
      try {
        var index = contentScope.segSelectDocTitle.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        scope.count--;
        let segmentData = contentScope.segSelectDocTitle.data[rowIndex];
        if (segmentData.flxSelectDocTitle.isVisible === true && segmentData.lblSelectEnter.text !== "Select Document Title") {
          // let addedValue = segmentData.lblSelectEnter.text;
          // scope.documentTitle.push(addedValue);
          // scope.setDocumentsDropdownSegmentData("segDocTitleDropdown", scope.documentTitle);
          let index = scope.documentTitle.indexOf(segmentData.lblSelectEnter.text);
          contentScope.segDocTitleDropdown.data[index].lblField.skin = scope.enableSkin;
          contentScope.segDocTitleDropdown.setDataAt(contentScope.segDocTitleDropdown.data[index], index);
        }
        contentScope.segSelectDocTitle.removeAt(rowIndex, sectionIndex);
        if (scope.count < 30) {
          scope.disableOrEnable("btnAdd", true, true);
          scope.disableOrEnable("btnAddManual", true, false);
        }
        if (scope.count === 0) {
          //contentScope.lblDocumentError.setVisibility(true);
        }
        scope.calculateDynamicHeight();
        scope.closeDocumentDropdowns();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "deleteDocuments",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : addToTheList
     * This function is for responsible for adding documents to the list
     * @return : NA
     */
    addToTheList: function(visibility) {
      var scope = this;
      try {
        //contentScope.lblDocumentError.setVisibility(false);
        scope.count++;
        var breakPoint = kony.application.getCurrentBreakpoint();
        var data = {
          "flxSelectDocTitle": {
            "isVisible": visibility,
            "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegDocTitleDropdown", 1)
          },
          "flxTextField": {
            "isVisible": !visibility
          },
          "lblSelectEnter": {
            "text": "Select Document Title"
          },
          "lblOriginalsCount": {
            "text": "Originals Count"
          },
          "lblCopiesCount": {
            "text": "Copies Count"
          },
          "lblDropDown1": {
            "text": "O"
          },
          "lblDropDown2": {
            "text": "O"
          },
          "lblDropDown3": {
            "text": "O"
          },
          "flxOriginalCount": {
            "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegSelectOriginal", 2),
            "width": breakPoint === 1024 ? "16%" : "14%"
          },
          "flxCopiesCount": {
            "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegCopiesCount", 3),
            "width": breakPoint === 1024 ? "16%" : "14%"
          },
          "flxDelete": {
            "isVisible": true,
            "onClick": scope.deleteDocuments.bind(scope)
          },
          "tbxEnterTitle": {
            "text": "",
            "onEndEditing": scope.checkInputFields.bind(scope)
          },
          "template": "flxSelectDocumentTitle"
        };
        contentScope.segSelectDocTitle.addDataAt(data, scope.count - 1);
        if (scope.count === 20) {
          scope.disableOrEnable("btnAdd", false);
          scope.disableOrEnable("btnAddManual", false);
        }
        if (scope.documentTitle.length === 1 || scope.count === 13) {
          scope.disableOrEnable("btnAdd", false);
        }
        scope.calculateDynamicHeight();
        scope.checkInputFields();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "disableOrEnable",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : calculateDynamicHeight
     * This function is for responsible for calculating dynamic height 
     * @return : NA
     */
    calculateDynamicHeight: function() {
      var scope = this;
      try {
        let dynamicHeight;
        dynamicHeight = 150 + (scope.count - 1) * 90;
        dynamicHeight = dynamicHeight - (scope.count - 1) * 30;
        contentScope.flxPhysicalDocumentMainContainer.height = dynamicHeight + 'dp';
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "calculateDynamicHeight",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : segDocTitleDropdownRowClick
     * This function is for responsible for actions happened for segment onRowClick operations
     * @return : NA
     */
    segDocTitleDropdownRowClick: function(segment, selectedKey, count, isRevise, reviseAccount, reviseIndex) {
      var scope = this;
      try {
        var selectedAccount = isRevise ? reviseAccount : contentScope[segment].selectedRowItems[0];
        let rowIndex = isRevise ? reviseIndex : contentScope[segment].selectedRowIndex[1];
        var data = contentScope.segSelectDocTitle.data[scope.documentUploadsIndex];
        if (count === 1 && contentScope[segment].data[rowIndex].lblField.skin === scope.disableSkin) {
          return;
        }
        if (count === 1 && data[selectedKey].text !== "Select Document Title") {
          let index = scope.documentTitle.indexOf(data[selectedKey].text);
          contentScope[segment].data[index].lblField.skin = scope.enableSkin;
          contentScope[segment].setDataAt(contentScope[segment].data[index], index);
        }
        data[selectedKey].text = selectedAccount.lblField.text;
        if (count !== 1 && data[selectedKey].text !== "Will not submit") {
          let appenedLbl = count === 2 ? " Originals" : " Copies";
          data[selectedKey].text = isRevise ? selectedAccount.lblField.text : selectedAccount.lblField.text + appenedLbl;
        }
        if (data["lblDropDown1"].text === "P") data["lblSelectEnter"].skin = "ICSknLbl42424215PX";
        if (data["lblDropDown2"].text === "P") data["lblOriginalsCount"].skin = "ICSknLbl42424215PX";
        if (data["lblDropDown3"].text === "P") data["lblCopiesCount"].skin = "ICSknLbl42424215PX";
        data["lblDropDown" + count].text = "O";
        contentScope.segSelectDocTitle.setDataAt(data, scope.documentUploadsIndex);
        scope.closeDocumentDropdowns();
        if (count === 1) {
          contentScope[segment].data[rowIndex].lblField.skin = scope.disableSkin;
          contentScope[segment].setDataAt(contentScope[segment].data[rowIndex], rowIndex);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "segDocTitleDropdownRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : closeDocumentDropdowns
     * This function is for responsible for closing physical documents dropdowns
     * @return : NA
     */
    closeDocumentDropdowns: function() {
      var scope = this;
      try {
        contentScope.flxSegDocTitleDropdown.setVisibility(false);
        contentScope.flxSegSelectOriginal.setVisibility(false);
        contentScope.flxSegCopiesCount.setVisibility(false);
        scope.checkInputFields();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "closeDocumentDropdowns",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : disableOrEnable
     * This function is for responsible for enable or disable adding physical documents buttons
     * @return : NA
     */
    disableOrEnable: function(widget, flag, param) {
      try {
        contentScope[widget].skin = flag ? "ICSknsknBtnffffffBorder0273e31pxRadius2px" : "ICSknbtnDisablede2e9f036px";
        contentScope[widget].onClick = flag ? this.addToTheList.bind(this, param) : null;
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "disableOrEnable",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setInputUI
     * This function is for responsible for showing UI change for input fields
     * @return : NA
     */
    setInputUI: function(widget) {
      var scope = this;
      try {
        widget = widget.replace(/flx/g, "lbl");
        if (contentScope[widget].text === scope.presenter.resourcesConstants.fontIcons.checkboxUnselected) {
          contentScope[widget].text = scope.presenter.resourcesConstants.fontIcons.checkboxSelected;
          scope.showInputFields(widget, true);
        } else {
          contentScope[widget].text = scope.presenter.resourcesConstants.fontIcons.checkboxUnselected;
          scope.showInputFields(widget, false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "showInputFields",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : showInputFields
     * This function is for responsible for showing input fields
     * @return : NA
     */
    showInputFields: function(params, show) {
      var scope = this;
      show = !kony.sdk.isNullOrUndefined(show) ? show : true;
      try {
        switch (params) {
          case "lblCheckDocumentNo": {
            contentScope.txtDocumentNo.setVisibility(show);
            break;
          }
          case "lblCheckTenorToUsance" || "lblCheckUsanceAcceptance": {
            scope.checkInputFields();
            break;
          }
          case "lblCheckUsanceDetails": {
            contentScope.lblUsanceDays.text = show ? scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDays", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDaysAndUsanceDetails", false);
            contentScope.txtUsanceDays.setVisibility(show);
            contentScope.flxUsanceDetails.setVisibility(show);
            break;
          }
          case "lblCheckCurrencyAndAmount": {
            contentScope.lblCurrency.text = show ? scope.presenter.renderI18nKeys("i18n.common.Currency", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.currencyAndAmount", false)
            contentScope.flxCurrencyDropdown.setVisibility(show);
            contentScope.flxCurrencyList.setVisibility(false);
            contentScope.flxCurrencyContainer.width = show ? '90dp' : '100%';
            contentScope.flxCurrencyAndAmount.height = show ? '60dp' : '20dp';
            contentScope.flxAmountMainContainer.setVisibility(show);
            contentScope.lblCurrencyDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            break;
          }
          case "lblCheckCreditAccount": {
            contentScope.flxDebitAccountContainer.top = show ? '50dp' : '20dp';
            contentScope.flxCreditAccountDropdown.setVisibility(show);
            contentScope.flxCreditAccountList.setVisibility(false);
            contentScope.lblCreditAccountDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            break;
          }
          case "lblCheckDebitAccount": {
            contentScope.flxDocumentAndBankDetailsContainer.top = show ? '60dp' : '30dp';
            contentScope.flxDebitAccountDropdown.setVisibility(show);
            contentScope.flxDebitAccountList.setVisibility(false);
            contentScope.lblDebitAccountDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            break;
          }
          case "lblCheckUploadDocument": {
            contentScope.flxUploadSection.setVisibility(show);
            break;
          }
          case "lblCheckPhysicalDocument": {
            contentScope.flxPhysicalDocumentMainContent.setVisibility(show);
            contentScope.flxPhysicalDocumentMainContainer.height = show ? '150dp' : '20dp';
            contentScope.flxPhysicalDocDropDowns.setVisibility(show);
            break;
          }
          case "lblCheckCollectionsDetails": {
            contentScope.txtCollectionDetails.setVisibility(show);
            break;
          }
          case "lblCheckMessageToBank": {
            contentScope.txtMessageToBank.setVisibility(show);
            break;
          }
        }
        scope.checkInputFields();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "showInputFields",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : restrictCharacter
     * This function responsible for restricting the widget
     * @return : NA
     */
    restrictCharacter: function(widgetName) {
      var scope = this;
      try {
        contentScope[widgetName].restrictCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,<>'`|\"";
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "restrictCharacter",
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
    onBreakpointChange: function() {
      var scope = this;
      var currentBreakpoint = kony.application.getCurrentBreakpoint();
      if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          isTablet = true;
      } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
          isTablet = false;
      }
      try {} catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : formatAmount
     * format Amount after entering
     * @return : NA
     */
    formatAmount: function(amount, formatData) {
      var scope = this;
      try {
        return applicationManager.getFormatUtilManager().formatAmount(amount, formatData);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment6",
          "method": "formatAmount",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /*  Method : setAccountsDropdown 
     *  Method to set data in account list dropdown 
     *  return : NA
     */
    setAccountsDropdown: function(segName) {
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
          if (accountList[key].accountType.toLowerCase() !== OLBConstants.LOAN) {
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
          "level": "frmCreateOutwardCollectionsAmendment6",
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
    accountsRowOnClick: function(segName) {
      var scope = this;
      var data = contentScope[segName].data;
      var index = contentScope[segName].selectedRowIndex;
      try {
        if (segName === contentScope.segCreditAccount.id) {
          contentScope.lblSelectedCreditAccountValue.text = data[index[1]].value;
          creditAccount = data[index[1]].key;
          contentScope.lblSelectedCreditAccountValue.skin = "sknLblSSP15pxtrucation";
        } else {
          contentScope.lblSelectedDebitAccountValue.text = data[index[1]].value;
          DebitAccount = data[index[1]].key;
          contentScope.lblSelectedDebitAccountValue.skin = "bbSknLbl424242SSP15Px";
        }
        scope.showOrHideAccounts(segName);
        scope.checkInputFields();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment6",
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
    showOrHideAccounts: function(segName) {
      var scope = this;
      try {
        if (segName === contentScope.segCreditAccount.id) {
          if (contentScope.lblCreditAccountDropdown.text === ViewConstants.FONT_ICONS.CHEVRON_UP) {
            contentScope.lblCreditAccountDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            contentScope.flxCreditAccountList.setVisibility(false);
          } else {
            contentScope.lblCreditAccountDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
            contentScope.flxCreditAccountList.setVisibility(true);
          }
        } else if (segName === contentScope.segDebitAccount.id) {
          if (contentScope.lblDebitAccountDropdown.text === ViewConstants.FONT_ICONS.CHEVRON_UP) {
            contentScope.lblDebitAccountDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            contentScope.flxDebitAccountList.setVisibility(false);
          } else {
            contentScope.lblDebitAccountDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
            contentScope.flxDebitAccountList.setVisibility(true);
          }
        } else {
          if (contentScope.lblCurrencyDropdown.text === ViewConstants.FONT_ICONS.CHEVRON_UP) {
            contentScope.lblCurrencyDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            contentScope.flxCurrencyList.setVisibility(false);
          } else {
            contentScope.lblCurrencyDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
            contentScope.flxCurrencyList.setVisibility(true);
          }
        }

      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment6",
          "method": "showOrHideAccounts",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setDropdownValues
     * This function to fetch formatted accounts Detals
     * @return : NA
     */
    setDropdownValues: function(seg, listValues, flxList) {
      var segmentData = [];
      try {
        if (listValues) {
          seg.widgetDataMap = {
            "lblListValue": "value"
          };
          for (const key in listValues) {
            segmentData.push({
              key: key,
              value: listValues[key],
              "template": "flxListDropdown"
            });
          }
          seg.setData(segmentData);
        }
        flxList.height = (segmentData.length * 41 > 205) ? "205dp" : `${segmentData.length * 41}dp`;
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment6",
          "method": "setDropdownValues",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setCurrencyDropdownValues
     * This function to set DropDown Values
     * @return : NA
     */
    setCurrencyDropdownValues: function(segName, SelectedLbl) {
      var scope = this;
      try {
        let selectedValue = contentScope[segName].selectedRowItems[0].value;
        SelectedLbl.text = selectedValue;
        SelectedLbl.skin = "sknLblSSP42424215px";
        scope.showOrHideAccounts(segName);
        scope.checkInputFields();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment6",
          "method": "setCurrencyDropdownValues",
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
    getAccountDetails: function(segName, accNo) {
      var scope = this;
      var accountsDetails = contentScope[segName].data;
      try {
        for (id in accountsDetails) {
          if (accNo === accountsDetails[id].key)
            return accountsDetails[id].value;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment6",
          "method": "getAccountDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    browseSupportingDocument: function() {
      var scope = this;
      const config = {
        selectMultipleFiles: false,
        filter: [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "image/bmp",
          "application/x-zip-compressed",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          ".csv"
        ]
      };
      if (documentsList.length >= this.presenter.collectionsConfig.documentsLimit) {
        popupScope.Popup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedDocumentsLimitMessage")} ${this.presenter.collectionsConfig.documentsLimit}.`;
        scope.togglePopup(true, 'uploadDocument');
        return;
      }
      kony.io.FileSystem.browse(config, scope.selectedDocumentCallback);
    },

    getBase64: function(file, successCallback) {
      let reader = new FileReader();
      reader.onloadend = function() {
        successCallback(reader.result);
      };
      reader.readAsDataURL(file);
    },

    selectedDocumentCallback: function(events, files) {
      var scope = this;
      const extensions = this.presenter.collectionsConfig.fileExtensions;
      if (files.length > 0) {
        const extension = files[0].file.name.split('.').pop();
        if (extension && !extensions.hasOwnProperty(extension)) {
          scope.togglePopup(true, 'uploadDocument');
          popupScope.Popup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${files[0].name} ${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedFileExtensionsMessage")} ${Object.keys(extensions).map(e => `.${e}`).join(', ')}.`;
          return;
        }
        if (files[0].file.size >= this.presenter.collectionsConfig.documentMaxSize) {
          scope.togglePopup(true, 'uploadDocument');
          popupScope.Popup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${files[0].name} ${kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentSizeErrorMsg")} ${this.presenter.collectionsConfig.documentMaxSize / 10e5} MB.`;
          return;
        }
        var fileData = {};
        scope.togglePopup(false);
        document = [files[0].name, extensions[extension]];
        fileData.fileName = files[0].name;
        fileData.fileType = files[0].file.type;
        scope.getBase64(files[0].file, function(base64String) {
          fileData.fileContents = base64String.split(';base64,')[1];
          let fileDataItemParsed = [fileData.fileName, fileData.fileType, fileData.fileContents].join('~');
          scope.presenter.uploadDocument(fileDataItemParsed, scope.view.id);
        });
      }
      contentScope.forceLayout();
    },

    storeDocumentReference: function(key) {
      var scope = this;
      documentsList.push(document);
      docReferenceValues.push(key);
      scope.setDocumentsDataToSegment();
      scope.checkInputFields();
    },

    setDocumentsDataToSegment: function() {
      var scope = this;
      if (documentsList.length === 0) {
        contentScope.segUploadDocs.removeAll();
        contentScope.flxUploadDocSeg.setVisibility(false);
        return;
      }
      contentScope.flxUploadDocSeg.setVisibility(true);
      let segData = [];
      for (const document of documentsList) {
        segData.push({
          "imgPDF": {
            src: document[1] || 'aa_password_error.png'
          },
          "lblDocumentName": {
            text: document[0],
            toolTip: document[0]
          },
          "lblDelete": {
            text: "S"
          },
          "flxDelete": {
            onClick: scope.togglePopup.bind(scope, true, 'deleteDocument'),
            cursorType: "pointer"
          },
          "template": "flxExportLCDrawingsUploadDocument"
        });
      }
      contentScope.segUploadDocs.widgetDataMap = {
        "imgPDF": "imgPDF",
        "lblDocumentName": "lblDocumentName",
        "lblDelete": "lblDelete",
        "flxDelete": "flxDelete"
      };
      contentScope.segUploadDocs.setData(segData);
      contentScope.forceLayout();
    },

    deleteDocument: function() {
      var scope = this;
      deletedIndex = contentScope.segUploadDocs.selectedRowIndex[1];
      scope.presenter.deleteDocument(docReferenceValues[deletedIndex], scope.view.id);
      scope.togglePopup(false);
    },

    removeDocumentReference: function() {
      var scope = this;
      documentsList.splice(deletedIndex, 1);
      docReferenceValues.splice(deletedIndex, 1);
      scope.setDocumentsDataToSegment();
      scope.checkInputFields();
    },

    togglePopup: function(visibility, flow, data) {
      if (visibility) {
        popupScope.flxViewCollectionDetailsPopup.setVisibility(false);
        popupScope.flxPopup.setVisibility(false);
        popupScope.skin = "sknBackground000000Op35";
        popupScope.Popup.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
        popupScope.Popup.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
        popupScope.Popup.btnNo.onClick = this.togglePopup.bind(this, false);
        switch (flow) {
          case 'uploadDocument':
            popupScope.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocument");
            popupScope.Popup.btnYes.text = kony.i18n.getLocalizedString("kony.mb.common.TryAgain");
            popupScope.Popup.btnNo.text = kony.i18n.getLocalizedString("i18n.common.close");
            popupScope.Popup.btnYes.onClick = this.tryBrowseAgain;
            break;
          case 'deleteDocument':
            deletedIndex = contentScope.segUploadDocs.selectedRowIndex[1];
            popupScope.Popup.lblHeading.text = kony.i18n.getLocalizedString("kony.mb.common.Delete");
            popupScope.Popup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.deleteDocumentMessage")} "${documentsList[deletedIndex][0]}"?`;
            popupScope.Popup.btnYes.onClick = this.deleteDocument;
            break;
        }
        popupScope.Popup.btnYes.toolTip = popupScope.Popup.btnYes.text;
        popupScope.Popup.btnNo.toolTip = popupScope.Popup.btnNo.text;
      }
      popupScope.setVisibility(visibility);
      popupScope.flxPopup.setVisibility(visibility);
      contentScope.forceLayout();
    },

    tryBrowseAgain: function() {
      this.togglePopup(false);
      this.browseSupportingDocument();
    },

    /**
     * @api : checkInputFields
     * This function is responsible for checking the mandatory fields for create amendment
     * @return : NA
     */
    checkInputFields: function() {
      var scope = this;
      try {
        let length = contentScope.segSelectDocTitle.data.length;
        for (i = 0; i < length; i++) {
          let segSelected = contentScope.segSelectDocTitle.data[i];
          var docNameFlag = segSelected.flxTextField.isVisible ? (segSelected.tbxEnterTitle.text === "" ? false : true) : (segSelected.lblSelectEnter.text !== "Select Document Title" ? true : false);
          if (segSelected.lblCopiesCount.text !== "Copies Count" && segSelected.lblOriginalsCount.text !== "Originals Count" && docNameFlag) {
            scope.docTitleRowClick = true;
          } else {
            scope.docTitleRowClick = false;
          }
        }
        if ((((contentScope.lblCheckDocumentNo.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected && contentScope.txtDocumentNo.text !== "") || contentScope.lblCheckDocumentNo.text === scope.presenter.resourcesConstants.fontIcons.checkboxUnselected) && (contentScope.lblCheckTenorToUsance.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected || contentScope.lblCheckTenorToUsance.text === scope.presenter.resourcesConstants.fontIcons.checkboxUnselected) && ((contentScope.lblCheckUsanceDetails.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected && (contentScope.txtUsanceDays.text !== "" && contentScope.txtUsanceDetails.text !== "")) || contentScope.lblCheckUsanceDetails.text === scope.presenter.resourcesConstants.fontIcons.checkboxUnselected) && (contentScope.lblCheckUsanceAcceptance.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected || contentScope.lblCheckUsanceAcceptance.text === scope.presenter.resourcesConstants.fontIcons.checkboxUnselected) && ((contentScope.lblCheckCurrencyAndAmount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected && (contentScope.lblSelectedCurrencyValue.text !== "Ex.100" && contentScope.txtAmount.text !== "")) || contentScope.lblCheckCurrencyAndAmount.text === scope.presenter.resourcesConstants.fontIcons.checkboxUnselected) && ((contentScope.lblCheckCreditAccount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected && contentScope.lblSelectedCreditAccountValue.text !== scope.presenter.renderI18nKeys("i18n.common.selecthere", false)) || contentScope.lblCheckCreditAccount.text === scope.presenter.resourcesConstants.fontIcons.checkboxUnselected) && ((contentScope.lblCheckDebitAccount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected && contentScope.lblSelectedDebitAccountValue.text !== scope.presenter.renderI18nKeys("i18n.common.selecthere", false)) || contentScope.lblCheckDebitAccount.text === scope.presenter.resourcesConstants.fontIcons.checkboxUnselected) && ((contentScope.lblCheckUploadDocument.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected && docReferenceValues.length > 0) || contentScope.lblCheckUploadDocument.text === scope.presenter.resourcesConstants.fontIcons.checkboxUnselected) && ((contentScope.lblCheckPhysicalDocument.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected && (scope.docTitleRowClick && length > 0)) || contentScope.lblCheckPhysicalDocument.text === scope.presenter.resourcesConstants.fontIcons.checkboxUnselected) && ((contentScope.lblCheckCollectionsDetails.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected && contentScope.txtCollectionDetails.text !== "") || contentScope.lblCheckCollectionsDetails.text === scope.presenter.resourcesConstants.fontIcons.checkboxUnselected) && ((contentScope.lblCheckMessageToBank.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected && contentScope.txtMessageToBank.text !== "") || contentScope.lblCheckMessageToBank.text === scope.presenter.resourcesConstants.fontIcons.checkboxUnselected)) && (contentScope.lblCheckDocumentNo.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected || contentScope.lblCheckTenorToUsance.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected || contentScope.lblCheckUsanceDetails.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected || contentScope.lblCheckUsanceAcceptance.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected || contentScope.lblCheckCurrencyAndAmount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected || contentScope.lblCheckCreditAccount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected || contentScope.lblCheckDebitAccount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected || contentScope.lblCheckUploadDocument.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected || contentScope.lblCheckPhysicalDocument.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected || contentScope.lblCheckCollectionsDetails.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected || contentScope.lblCheckMessageToBank.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected)) {
          scope.enableOrDisableContinueButton(true);
        } else {
          scope.enableOrDisableContinueButton(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment6",
          "method": "checkInputFields",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : enableOrDisableContinueButton
     * This function is responsible for enable or disable submit button
     * @return : NA
     */
    enableOrDisableContinueButton: function(param) {
      var scope = this;
      try {
        if (param) {
          contentScope.btnReviewAndSubmit.setEnabled(true);
          contentScope.btnReviewAndSubmit.skin = "ICSknsknBtnSSPffffff15pxBg0273e3";
        } else {
          contentScope.btnReviewAndSubmit.setEnabled(false);
          contentScope.btnReviewAndSubmit.skin = "ICSknbtnDisablede2e9f036px";
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment6",
          "method": "enableOrDisableContinueButton",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    appendResponses: function() {
      var scope = this;
      try {
        let collectionSummaryPopupRef = popupScope.flxViewCollectionDetailsPopup;
        popupScope.lblViewCollectionHeader.text = kony.i18n.getCurrentLocale() === "ar_AE" ? kony.i18n.getLocalizedString("i18n.common.ViewDetails") + " - " + collectionResponse.collectionReference + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") : kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") + " - " + collectionResponse.collectionReference + " - " + kony.i18n.getLocalizedString("i18n.common.ViewDetails");
        collectionSummaryPopupRef.flxCrossCollection.cursorType = "pointer";
        collectionSummaryPopupRef.flxCrossCollection.onClick = scope.toggleCollectionPopUp.bind(this, false);
        scope.collectionOverView();
        if (collectionResponse.status === outwardcollection_status['Settled']) {
          scope.paymentDetails();
        } else if (collectionResponse.status === outwardcollection_status['Approved'] || collectionResponse.status === outwardcollection_status['Overdue']) {
          scope.draweeConsent();
        }
        scope.colletionDetails();
        scope.draweeAndBankDetails();
        scope.documentAndBankInstruction();
        let setSegData = [...collectionOverViewArray, ...paymentStatusArray, ...draweeConsentArray, ...collectionDetailsArray, ...draweeAndBankDetailsArray, ...documentAndBankInstructionArray];
        popupScope.GuaranteeDetails.segDetails.setData(setSegData);
        scope.toggleCollectionPopUp(true);
      } catch (err) {
        var errorObj = {
          "method": "appendResponses",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    toggleCollectionPopUp: function(visibility) {
      var scope = this;
      try {
        popupScope.flxViewCollectionDetailsPopup.setVisibility(false);
        popupScope.flxPopup.setVisibility(false);
        popupScope.setVisibility(visibility);
        popupScope.flxViewCollectionDetailsPopup.setVisibility(visibility);
      } catch (err) {
        var errorObj = {
          "method": "toggleCollectionPopUp",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    collectionOverView: function() {
      var scope = this;
      try {
        collectionOverViewArray = [
          [{
              "lblHeader": {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.collectionOverview", false),
                skin: "ICSknlbl424242SSP15pxSemibold",
                isVisible: true
              },
              "flxDropDown": {
                isVisible: true,
                onClick: scope.onActionClick.bind(this, "segDetails")
            },
            "imgDropDown": "dropdown_collapse.png",
            }, // Section Header Template
            [{
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", true),
                "lblValue": collectionResponse.collectionReference ? scope.presenter.getDynamicData(collectionResponse, 'collectionReference') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.updatedOn", true),
                "lblValue": collectionResponse.updatedOn ? scope.presenter.getConvertedDate(collectionResponse, 'updatedOn') : NA,
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.ChequeManagement.Status", true),
                "lblValue": collectionResponse.status ? scope.presenter.getDynamicData(collectionResponse, 'status') : NA
              }
            ]
          ]
        ];
        // If status is Rejected
        if (collectionResponse.status === outwardcollection_status['Rejected']) {
          collectionOverViewArray[0][1].push(
            [{
              "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejectionWithColon", true),
              "lblValue": collectionResponse.reasonForRejection ? scope.presenter.getDynamicData(collectionResponse, 'reasonForRejection') : NA
            }]
          )
        } else if (collectionResponse.status === outwardcollection_status['Returned by Bank']) {
          collectionOverViewArray[0][1].push({
            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturned", true),
            "lblValue": collectionResponse.reasonForReturn ? scope.presenter.getDynamicData(collectionResponse, 'reasonForReturn') : NA
          })
        } else if (collectionResponse.status === outwardcollection_status['Rejected'] || collectionResponse.status === outwardcollection_status['Settled'] || collectionResponse.status === outwardcollection_status['Approved'] || collectionResponse.status === outwardcollection_status['Overdue']) {
          collectionOverViewArray[0][1].push({
            "lblKey": scope.presenter.renderI18nKeys("i18n.mortgageAccount.MaturityDate", false),
            "lblValue": collectionResponse.maturityDate ? scope.presenter.getConvertedDate(collectionResponse, 'maturityDate') : NA
          }, {
            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturned", true),
            "lblValue": collectionResponse.reasonForReturn ? scope.presenter.getDynamicData(collectionResponse, 'reasonForReturn') : NA
          }, {
            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.requestPaymentStatus", true),
            "lblValue": collectionResponse.status ? scope.presenter.getDynamicData(collectionResponse, 'paymentStatus') : NA
          }, {
            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.MessagefromBank", true),
            "lblValue": collectionResponse.messageFromBank ? scope.presenter.getDynamicData(collectionResponse, 'messageFromBank') : NA
          })
        }
      } catch (err) {
        var errorObj = {
          "method": "collectionOverViewArray",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    paymentDetails: function() {
      var scope = this;
      try {
        paymentStatusArray = [
          [{
              "lblHeader": scope.presenter.renderI18nKeys("i18n.TransfersEur.PaymentDetails", false),
              "flxDropDown": {
                isVisible: true,
                onClick: scope.onActionClick.bind(this, "segDetails")
            },
            "imgDropDown": "dropdown_collapse.png",
            }, // Section Header Template
            [{
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.paymentStatusWithColon", false),
                "lblValue": collectionResponse.paymentStatusWith ? scope.presenter.getDynamicData(collectionResponse, 'paymentStatus') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.settledAmount", false),
                "lblValue": collectionResponse.amount ? scope.presenter.getDynamicData(collectionResponse, 'amount') : NA,
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.ChequeManagement.Status", true),
                "lblValue": collectionResponse.status ? scope.presenter.getDynamicData(collectionResponse, 'status') : NA
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

    draweeConsent: function() {
      var scope = this;
      try {
        draweeConsentArray = [
          [{
              "lblHeader": scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeConsent", false),
              "flxDropDown": {
                isVisible: true,
                onClick: scope.onActionClick.bind(this, "segDetails")
              },
              "imgDropDown": "dropdown_collapse.png",
            }, // Section Header Template
            [{
              "lblKey": scope.presenter.renderI18nKeys("i18n.wealth.acknowledgement", true),
              "lblValue": collectionResponse.draweeAcknowledgment ? scope.presenter.getDynamicData(collectionResponse, 'draweeAcknowledgment') : NA
            }, {
              "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.acceptance", true),
              "lblValue": collectionResponse.draweeAcceptance ? scope.presenter.getDynamicData(collectionResponse, 'draweeAcceptance') : NA,
            }, {
              "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.billOfExchangeSigned", true),
              "lblValue": collectionResponse.isBillExchangeSigned ? scope.presenter.getDynamicData(collectionResponse, 'isBillExchangeSigned') : NA
            }]
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

    colletionDetails: function() {
      var scope = this;
      try {
        collectionDetailsArray = [
          [{
              "lblHeader": scope.presenter.renderI18nKeys("i18n.TradeFinance.collectionDetails", false),
              "flxDropDown": {
                isVisible: true,
                onClick: scope.onActionClick.bind(this, "segDetails")
              },
              "imgDropDown": "dropdown_collapse.png",
            }, // Section Header Template
            [{
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.documentNumberWithColon", false),
                "lblValue": collectionResponse.documentNo ? scope.presenter.getDynamicData(collectionResponse, 'documentNo') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.createdOnWithColon", false),
                "lblValue": collectionResponse.createdOn ? scope.presenter.getConvertedDate(collectionResponse, 'createdOn') : NA,
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
                "lblValue": collectionResponse.tenorType ? scope.presenter.getDynamicData(collectionResponse, 'tenorType') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDays", true),
                "lblValue": collectionResponse.usanceDays ? scope.presenter.getDynamicData(collectionResponse, 'usanceDays') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetailsWithColon", false),
                "lblValue": collectionResponse.usanceDetails ? scope.presenter.getDynamicData(collectionResponse, 'usanceDetails') : NA,
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.allowUserAcceptance", true),
                "lblValue": collectionResponse.allowUsanceAcceptance ? scope.presenter.getDynamicData(collectionResponse, 'allowUsanceAcceptance') : NA
              },
              {
                "lblKey": {
                  text: scope.presenter.renderI18nKeys("i18n.TradeFinance.amountaAndAccountDetails", false),
                  skin: "ICSknlbl424242SSP13pxSemibold",
                },
                "lblValue": {
                  isVisible: false,
                },
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.requestAmountWithColon", false),
                "lblValue": collectionResponse.amount ? scope.presenter.getDynamicData(collectionResponse, 'amount') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.amountCreditAccount", false),
                "lblValue": collectionResponse.creditAccount ? scope.presenter.getDynamicData(collectionResponse, 'creditAccount') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitAccountWithColon", false),
                "lblValue": collectionResponse.debitAccount ? scope.presenter.getDynamicData(collectionResponse, 'debitAccount') : NA
              },
            ]
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


    draweeAndBankDetails: function() {
      var scope = this;
      try {
        let bankAddress = scope.presenter.getMethodForAddress(collectionResponse.collectingBankAddress);
        let draweeAddress = scope.presenter.getMethodForAddress(collectionResponse.draweeAddress);
        draweeAndBankDetailsArray = [
          [{
              "lblHeader": scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeAndCollectingBankDetails", false),
              "flxDropDown": {
                isVisible: true,
                onClick: scope.onActionClick.bind(this, "segDetails")
              },
              "imgDropDown": "dropdown_collapse.png",
            }, // Section Header Template
            [{
                "lblKey": {
                  text: scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeDetails", false),
                  skin: "ICSknlbl424242SSP13pxSemibold"
                },
                "lblValue": {
                  isVisible: false,
                }
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeName", true),
                "lblValue": collectionResponse.draweeName ? scope.presenter.getDynamicData(collectionResponse, 'draweeName') : NA,
              },
              Object.assign({
                "lblKey": {
                  text: scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeAddressWithOptional", true),
                  skin: "bbSknLbl727272SSP15Px",
                },
                "lblValue": {
                  isVisible: !draweeAddress['flxAddress']['isVisible'],
                  text: NA,
                },
                template: "flxGuaranteeReceivedDetails",
              }, draweeAddress),
              {
                "lblKey": {
                  text: scope.presenter.renderI18nKeys("i18n.TradeFinance.collectingBankDetails", false),
                  skin: "ICSknlbl424242SSP13pxSemibold",
                },
                "lblValue": {
                  isVisible: false,
                },
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.payee.bankname", false),
                "lblValue": collectionResponse.collectingBank ? scope.presenter.getDynamicData(collectionResponse, 'collectingBank') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.swift/BicCodeWithColon", false),
                "lblValue": collectionResponse.swiftOrBicCode ? scope.presenter.getDynamicData(collectionResponse, 'swiftOrBicCode') : NA
              },
              Object.assign({
                "lblKey": {
                  text: scope.presenter.renderI18nKeys("i18n.TradeFinance.bankAddressWithColon", false),
                  skin: "bbSknLbl727272SSP15Px",
                },
                "lblValue": {
                  isVisible: !bankAddress['flxAddress']['isVisible'],
                  text: NA,
                },
                template: "flxGuaranteeReceivedDetails",
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

    documentAndBankInstruction: function() {
      var scope = this;
      try {
        let docResponse = collectionResponse.uploadDocuments ? collectionResponse.uploadDocuments : NA;
        let tempDocResponse = "";
        if (docResponse !== NA) {
          docResponse = JSON.parse(collectionResponse.uploadDocuments.replace(/'/g, "\""));
          docResponse.map((item, index) => {
            tempDocResponse = (tempDocResponse + item.documentName) + (docResponse.length - 1 === index ? '' : '\n');
          });
        } else {
          tempDocResponse = NA;
        }
        documentAndBankInstructionArray = [
          [{
              "lblHeader": scope.presenter.renderI18nKeys("i18n.TradeFinance.documentsAndBankInstruction", false),
              "flxDropDown": {
                isVisible: true,
                onClick: scope.onActionClick.bind(this, "segDetails")
              },
              "imgDropDown": "dropdown_collapse.png",
            }, // Section Header Template
            [{
                "lblKey": {
                  text: scope.presenter.renderI18nKeys("i18n.TradeFinance.uploadAndPhysicalDocumentCounts", false),
                  skin: "ICSknlbl424242SSP13pxSemibold",
                },
                "lblValue": {
                  isVisible: false,
                }
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.uploadedDocumentsWithColon", false),
                "lblValue": scope.presenter.processDocsAndInstructionBills(collectionResponse, 'uploadDocuments')
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.physicalDocumentDetailsWithColon", false),
                "lblValue": {
                  text: scope.presenter.getPhysicalDocumentCount(collectionResponse.physicalDocuments),
                }
              },
              {
                "lblKey": {
                  text: scope.presenter.renderI18nKeys("i18n.TradeFinance.bankInstructions", false),
                  skin: "ICSknlbl424242SSP13pxSemibold",
                },
                "lblValue": {
                  isVisible: false,
                },
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.IncoTerms", true),
                "lblValue": collectionResponse.incoTerms ? scope.presenter.getDynamicData(collectionResponse, 'incoTerms') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.deliveryInstructionsOptional", true),
                "lblValue": 
                {
                  text: collectionResponse.deliveryInstructions ? scope.presenter.getDynamicData(collectionResponse, 'deliveryInstructions') : NA,
                }
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.otherCollectionDetailsWithOptional", true),
                "lblValue": {
                  text: collectionResponse.otherCollectionDetails ? scope.presenter.getDynamicData(collectionResponse, 'otherCollectionDetails') : NA,
                }
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.MessageToBankOptional", true),
                "lblValue": 
                {
                  text: collectionResponse.messageToBank ? scope.presenter.getDynamicData(collectionResponse, 'messageToBank') : NA,
                }
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.instructionForBills", true),
                "lblValue": 
                {
                  text: scope.presenter.processDocsAndInstructionBills(collectionResponse, 'instructionsForBills'),
                },
                "flxMain": {
                  bottom: "20dp"
                }
              },
            ]
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

    /**
     * @api : onActionClick
     * Triggerd on click of dropdown in segment
     * @return : NA
     */
    onActionClick: function(segName) {
      var scopeObj = this;
      try {
        var segScope;
        if (segName === "segDetails") {
          segScope = popupScope.flxViewCollectionDetailsPopup.GuaranteeDetails;
        } else {
          segScope = contentScope;
        }
        var index = segScope[segName].selectedRowIndex;
        var sectionIndex = index[0];
        var data = segScope[segName].data;
        var selectedHeaderData = data[sectionIndex][0];
        if (this.segViewDetailsTempData === "") {
          this.segViewDetailsTempData = JSON.parse(JSON.stringify(segScope[segName].data));
        }
        if (selectedHeaderData["imgDropDown"] === "dropdown_expand.png") {
          selectedHeaderData["imgDropDown"] = "dropdown_collapse.png";
          data[sectionIndex][1] = this.segViewDetailsTempData[sectionIndex][1];
          segScope[segName].setData(data);
        } else {
          selectedHeaderData["imgDropDown"] = "dropdown_expand.png";
          data[sectionIndex][1] = [];
          segScope[segName].setData(data);
        }
      } catch (err) {
        var errorObj = {
          "method": "onActionClick",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },

    setsegCollectionDetails: function() {
      var scope = this;
      try {
        let collectionSummaryPopupRef = popupScope.flxViewCollectionDetailsPopup.GuaranteeDetails;
        collectionSummaryPopupRef.segDetails.sectionHeaderTemplate = 'flxTempFrmViewDetailsOutward';
        collectionSummaryPopupRef.segDetails.rowTemplate = 'flxGuaranteeReceivedDetails';
        collectionSummaryPopupRef.segDetails.widgetDataMap = {
          "lblHeading": "lblHeading",
          "lblDropdownIcon": "lblDropdownIcon",
          "flxDropdown": "flxDropdown",
          "flxMain": "flxMain",
          "lblKey": "lblKey",
          "lblValue": "lblValue",
          "flxDocument": "flxDocument",
          "flxDownloadImage": "flxDownloadImage",
          "flxTempFrmViewDetailsOutward": "flxTempFrmViewDetailsOutward",
          "flxSectionHeaderContent": "flxSectionHeaderContent",
          "flxSeparator": "flxSeparator",
          "flxheaderWithDropdown": "flxheaderWithDropdown",
          "lblHeader": "lblHeader",
          "flxDropDown": "flxDropDown",
          "imgDropDown": "imgDropDown",
          "lblDocumentName": "lblDocumentName",
          "flxAddress": "flxAddress",
          "lblAddress1": "lblAddress1",
          "lblAddress2": "lblAddress2",
          "lblAddress3": "lblAddress3",
          "btnAction": "btnAction"
        };
      } catch (err) {
        var errorObj = {
          "method": "setsegCollectionDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setReviewScreenUI
     * this function is responsible for setting Review screen UI
     * @return : NA
     */
    setReviewScreenUI: function(param) {
      var scope = this;
      try {
        contentScope.flxOverviewInputFields.setVisibility(!param);
        contentScope.flxOverviewReview.setVisibility(param);
        contentScope.btnBack.setVisibility(param);
        contentScope.btnReviewAndSubmit.text = param ? scope.presenter.renderI18nKeys("i18n.CustomerFeedback.Submit", false) : scope.presenter.renderI18nKeys("i18n.kony.BulkPayments.ViewRequests", false);
        formTemplateScope.pageTitle = param ? isReviseFlow ? kony.i18n.getCurrentLocale() === 'ar_AE' ? scope.presenter.renderI18nKeys("i18n.kony.BulkPayments.ViewRequests", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.reviseAmendment", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) :
          scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.reviseAmendment", false) + " - " + scope.presenter.renderI18nKeys("i18n.kony.BulkPayments.ViewRequests", false) :
          kony.i18n.getCurrentLocale() === 'ar_AE' ?
          scope.presenter.renderI18nKeys("i18n.kony.BulkPayments.ViewRequests", false) + "-" + scope.presenter.renderI18nKeys("i18n.TradeFinance.CreateNewAmendment", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) :
          scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.CreateNewAmendment", false) + " - " + scope.presenter.renderI18nKeys("i18n.kony.BulkPayments.ViewRequests", false) : 
          isReviseFlow ? kony.i18n.getCurrentLocale() === 'ar_AE' ?
          amendmentResponse.amendmentReference + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.reviseAmendment", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) :
          scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.reviseAmendment", false) + " - " + amendmentResponse.amendmentReference : kony.i18n.getCurrentLocale() === 'ar_AE' ? scope.presenter.renderI18nKeys("i18n.TradeFinance.CreateNewAmendment", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.CreateNewAmendment", false);
        if (param) {
          scope.setAmendmentRequestedDetails();
        }
      } catch (err) {
        var errorObj = {
          "method": "setReviewScreenUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setAmendmentRequestedDetails
     * This function for setting amendment requested data to segment
     * @return : NA
     */
    setAmendmentRequestedDetails: function() {
      var scope = this;
      try {
        scope.setsegAmendmentOverviewWidgetDataMap("segAmendmentRequested");
        let AmendmentRequestedDetails = [];
        let section1 = [{
            lblTransactionHeader: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.amendmentRequested", false),
              left: "20dp"
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
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.documentNumberWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: contentScope.lblCheckDocumentNo.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.txtDocumentNo.text || NA : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: contentScope.lblCheckTenorToUsance.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? YES : NO,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceDays", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: contentScope.lblCheckUsanceDetails.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.txtUsanceDays.text || NA : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetailsWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: contentScope.lblCheckUsanceDetails.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.txtUsanceDetails.text || NA : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.allowUserAcceptance", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: contentScope.lblCheckUsanceAcceptance.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? YES : NO || NA,
              isVisible: true
            },
            flxBottomSeparator: {
              isVisible: false
            }
          }]
        ];
        AmendmentRequestedDetails.push(section1);
        let section2 = [{
            lblTransactionHeader: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmountAccountDetails", false),
              left: "20dp"
            },
            "flxSeparator2": {
              isVisible: false
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
              text: this.presenter.renderI18nKeys("i18n.wealth.amountColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: contentScope.lblCheckCurrencyAndAmount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.lblSelectedCurrencyValue.text + " " + contentScope.txtAmount.text || NA : NA,
              isVisible: true
            },
            flxreviewRows: {
              top: "0dp"
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.amountCreditAccount", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: contentScope.lblCheckCreditAccount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.lblSelectedCreditAccountValue.text || NA : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitAccountWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: contentScope.lblCheckDebitAccount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.lblSelectedDebitAccountValue.text || NA : NA,
              isVisible: true
            },
            flxBottomSeparator: {
              isVisible: true,
              height: "10dp",
              skin: "slFbox"
            }
          }]
        ];
        AmendmentRequestedDetails.push(section2);
        let section3 = [{
            lblTransactionHeader: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.documentsAndBankInstruction", false),
              left: "20dp"
            },
            "flxSeparator2": {
              isVisible: false
            },
            "flxDropDown": {
              isVisible: false
            },
            "flxReviewHeader": {
              skin: "slFbox"
            },
          },
          []
        ];

        if (contentScope.lblCheckUploadDocument.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected) {
          for (let i = 0; i < documentsList.length; i++) {
            data = {
              lblReview: {
                text: i === 0 ? this.presenter.renderI18nKeys("i18n.TradeFinance.uploadedDocumentsWithColon", false) : ""
              },
              lblReviewValue1: {
                text: documentsList[i][0],
                width: '350dp'
              },
              flxreviewRows: {
                isVisible: documentsList.length > 0 ? true : false,
                top: "0dp"
              }
            }
            section3[1].push(data);
          }
        } else {
          data = {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.uploadedDocumentsWithColon", false)
            },
            lblReviewValue1: {
              text: NA
            },
            flxreviewRows: {                 
              top: "0dp"
            }
          }
          section3[1].push(data);
        }

        let length = contentScope.segSelectDocTitle.data.length;
        for (i = 0; i < length; i++) {
          let segSelected = contentScope.segSelectDocTitle.data[i];
          var docName = segSelected.flxTextField.isVisible ? segSelected.tbxEnterTitle.text : segSelected.lblSelectEnter.text;
          if (docName !== scope.DEFAULT_PHYSICAL_DOC_TITLE) {
            physicalDocumentsDetails[i] = {
              title: docName,
              count1: segSelected.lblOriginalsCount.text,
              count2: segSelected.lblCopiesCount.text
            };
          }
        };
        let physicalData;
        if (contentScope.lblCheckPhysicalDocument.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected) {
          for (let i = 0; i < physicalDocumentsDetails.length; i++) {
            physicalData = {
              lblReview: {
                text: i === 0 ? this.presenter.renderI18nKeys("i18n.TradeFinance.physicalDocumentDetailsWithColon", false) : ""
              },
              lblReviewValue1: {
                text: physicalDocumentsDetails[i].title + " (" + physicalDocumentsDetails[i].count1 + "," + physicalDocumentsDetails[i].count2 + ")",
                width: '350dp'
              },
              flxreviewRows: {
                isVisible: physicalDocumentsDetails.length > 0 ? true : false
              }
            }
            section3[1].push(physicalData);
          };
        } else {
          physicalData = {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.physicalDocumentDetailsWithColon", false)
            },
            lblReviewValue1: {
              text: NA
            }
          }
          section3[1].push(physicalData);
        }

        AmendmentRequestedDetails.push(section3);
        let otherCollectionDetails = {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.otherCollectionDetails", true),
            isVisible: true
          },
          lblReviewValue1: {
            text: contentScope.lblCheckCollectionsDetails.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.txtCollectionDetails.text || NA : NA
          }
        };
        section3[1].push(otherCollectionDetails);
        let messageFromBank = {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.messageToBankWithColon", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: contentScope.lblCheckMessageToBank.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.txtMessageToBank.text || NA : NA,
            isVisible: true,
            width: '100%'
          }
        };
        section3[1].push(messageFromBank);
        contentScope.segAmendmentRequested.setData(AmendmentRequestedDetails);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment6",
          "method": "setAmendmentRequestedDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : constructPayload
     * This function for responsible for constructing payload
     * @return : NA
     */
    constructPayload: function() {
      var scope = this;
      let supportingDocument = [];
      let physicalDocument = [];
      if (documentsList.length === docReferenceValues.length) {
        for (let i = 0; i < documentsList.length; i++) {
          supportingDocument.push({
            "documentName": documentsList[i][0],
            "documentReferences": docReferenceValues[i]
          });
        }
      }
      for (let i = 0; i < physicalDocumentsDetails.length; i++) {
        physicalDocument.push({
          "documentTitle": physicalDocumentsDetails[i].title,
          "originalsCount": physicalDocumentsDetails[i].count1,
          "copiesCount": physicalDocumentsDetails[i].count2,
        });
      }
      try {
        payload = {
          "allowUsanceAcceptance": contentScope.lblCheckUsanceAcceptance.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? YES : NO,
          "amendTenorType": contentScope.lblCheckTenorToUsance.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? OLBConstants.INWARD_COLLECTIONS_TENORTYPE.USANCE : collectionResponse.tenorType,
          "amount": contentScope.lblCheckCurrencyAndAmount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? applicationManager.getFormatUtilManager().deFormatAmount(contentScope.txtAmount.text) : "",
          "cancellationStatus": amendmentResponse ? amendmentResponse.cancellationStatus ? amendmentResponse.cancellationStatus : "" : "",
          "corporateUserName": collectionResponse.draweeName ? collectionResponse.draweeName : "",
          "chargesDebitAccount": contentScope.lblCheckDebitAccount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? DebitAccount : "",
          "collectionReference": collectionResponse.collectionReference ? collectionResponse.collectionReference : "",
          "amendmentReference": (collectionResponse.lastAmendmentDetails && JSON.parse(collectionResponse.lastAmendmentDetails).amendmentReference) ? JSON.parse(collectionResponse.lastAmendmentDetails).amendmentReference : "",
          "creditAccount": contentScope.lblCheckCreditAccount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? creditAccount : "",
          "currency": contentScope.lblCheckCurrencyAndAmount.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.lblSelectedCurrencyValue.text : "",
          "documentNo": contentScope.lblCheckDocumentNo.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.txtDocumentNo.text : "",
          "messageToBank": contentScope.lblCheckMessageToBank.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.txtMessageToBank.text : "",
          "otherCollectionDetails": contentScope.lblCheckCollectionsDetails.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.txtCollectionDetails.text : "",
          "usanceDays": contentScope.lblCheckUsanceDetails.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.txtUsanceDays.text : "",
          "usanceDetails": contentScope.lblCheckUsanceDetails.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected ? contentScope.txtUsanceDetails.text : ""
        };
        if(contentScope.lblCheckPhysicalDocument.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected){
          payload.physicalDocuments = JSON.stringify(physicalDocument);
        }
        if(contentScope.lblCheckUploadDocument.text === scope.presenter.resourcesConstants.fontIcons.checkboxSelected){
          payload.uploadDocuments = JSON.stringify(supportingDocument);
        }
        if (!isReviseFlow) {
          scope.presenter.showOutwardCollectionScreen({
            context: "createNewAmendment",
            form: "frmOutwardCollectionsAmendmentAcknowledgement",
            data: {
              "payload": payload,
              "collectionData": collectionResponse
            },
            currentForm: scope.view.id
          });
        } else {
          payload.amendmentReference = amendmentResponse.amendmentReference;
          scope.presenter.showOutwardCollectionScreen({
            context: "updateAmendment",
            form: "frmOutwardCollectionsAmendmentAcknowledgement",
            data: {
              "payload": payload,
              "collectionData": collectionResponse
            },
            currentForm: scope.view.id
          });
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendment6",
          "method": "setAmendmentRequestedDetails",
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
    navigateToPrint: function() {
      var scope = this;
      try {
        scope.presenter.showOutwardCollectionScreen({
          context: "amendmentPrint",
          form: scope.view.id,
          data: amendmentResponse
        });
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendmentController",
          "method": "navigateToPrint",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : navigateToDownload
     * Navigation to download
     * @return : NA
     */
    navigateToDownload: function() {
      var scope = this;
      try {
        scope.presenter.generateOutwardAmendments({
          "amendmentReference": amendmentResponse.amendmentReference
        }, "frmCreateOutwardCollectionsAmendment");
      } catch (err) {
        var errorObj = {
          "level": "frmCreateOutwardCollectionsAmendmentController",
          "method": "navigateToDownload",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    renderSwiftAdvice: function() {
      var scope = this;
      try {
        paymentAdvices = this.presenter.isEmptyNullOrUndefined(swiftsAdvicesData.PaymentAdvices) ? [] : swiftsAdvicesData.PaymentAdvices;
        swiftMessages = this.presenter.isEmptyNullOrUndefined(swiftsAdvicesData.SwiftMessages) ? [] : swiftsAdvicesData.SwiftMessages;
        if (paymentAdvices.length > 0 || swiftMessages.length > 0) {
          buttonScope.btnSwiftAndAdvices.text = this.presenter.renderI18nKeys('i18n.TradeFinance.SwiftAndAdvices', false) + ' (' + (paymentAdvices.length + swiftMessages.length) + ')';
          buttonScope.btnSwiftAndAdvices.setVisibility(true);
          scope.renderSwiftAndAdvices();
        } else {
          buttonScope.btnSwiftAndAdvices.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "method": "renderSwiftAdvice",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    renderSwiftAndAdvices: function() {
      var scope = this;
      try {
        buttonScope.segSwiftAndAdvices.widgetDataMap = {
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
            lblValue: this.presenter.renderI18nKeys('i18n.TradeFinance.PaymentAdvice', false) + " " + CommonUtilities.getFrontendDateStringInUTC(item.uploadedTimeStamp, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"))
          });
        });
        let swiftMessagesMasterData = [];
        swiftMessages.map(item => {
          swiftMessagesMasterData.push({
            flxFrmReceivedGuaranteeSwiftAdvice: {
              cursorType: 'pointer',
              onClick: scope.swiftAndAdvicesOnRowClick.bind(scope, item)
            },
            lblValue: 'SWIFT MT ### - Advice of ...' + ' (' + CommonUtilities.getFrontendDateStringInUTC(item.uploadedTimeStamp, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")) + ')'
          });
        });
        let masterData = [...paymentAdvicesMasterData, ...swiftMessagesMasterData, ];
        buttonScope.segSwiftAndAdvices.setData(masterData);
      } catch (err) {
        var errorObj = {
          "method": "renderSwiftAndAdvices",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    swiftAndAdvicesOnRowClick: function(selectedItem) {
      var scope = this;
      try {
        buttonScope.flxSwiftAndAdvices.setVisibility(false);
        let payload = {
          fileName: selectedItem.fileName,
          fileId: selectedItem.fileId
        };
        if (selectedItem.category === 'SWIFT') {
          popupScope.lblTopSwiftMessageHeading.text = 'SWIFT MT ### - Advice of ...' + ' (' + CommonUtilities.getFrontendDateStringInUTC(selectedItem.uploadedTimeStamp, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")) + ')';
          popupScope.btnSwiftMessageClose.left = "385dp";
        } else {
          popupScope.lblTopSwiftMessageHeading.text = this.presenter.renderI18nKeys('i18n.TradeFinance.PaymentAdvice', false) + ' (' + CommonUtilities.getFrontendDateStringInUTC(selectedItem.uploadedTimeStamp, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")) + ')';
          popupScope.btnSwiftMessageClose.left = "450dp";

        }
        this.presenter.fetchFileResponse(payload, 'frmCreateOutwardCollectionsAmendment');
        popupScope.flxDownloadIcons.onClick = () => {
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

    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @return : NA
     */
    onError: function(err) {
      var errMsg = JSON.stringify(err);
    },

  };
});