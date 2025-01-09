define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let documentsList = [];
  let document = [];
  let docReferenceValues = [];
  let outwardcollection_status;
  let collectionOverViewArray = [],
    paymentStatusArray = [],
    draweeConsentArray = [],
    collectionDetailsArray = [],
    draweeAndBankDetailsArray = [],
    documentAndBankInstructionArray = [];
  let collectionData,formTemplateScope,contentScope,buttonScope,popupScope;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let isTablet = false;
  return {
    /**
     * @api : init
     * This function for executing the lines of code only once
     * @return : NA
     */
    init: function() {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
    },

    /**
     * @api : onNavigate
     * This function for executing the preShow and postShow
     * @return : NA
     */
    onNavigate: function(data) {
      var scope = this;
      this.presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeFinanceMA',
        'moduleName': 'OutwardCollectionsUIModule'
      });
      collectionData = data;
      formTemplateScope = this.view.formTemplate12;
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      buttonScope = this.view.formTemplate12.flxTCButtons;
      popupScope = this.view.formTemplate12.flxContentPopup;
      scope.setDefaultUI();
    },

    /**
     * Performs the actions required before rendering form
     */
    preShow: function() {
      var scope = this;
      try {
        scope.segViewDetailsTempData = "";
        outwardcollection_status = this.presenter.collectionStatusConfig;
        popupScope.flxViewSBLCDetailsContainer.doLayout = CommonUtilities.centerPopupFlex;
        scope.setsegCollectionDetails();
        scope.setCollectionDetails();
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
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
        scope.initButtonActions();
        let amendmentNo = collectionData.lastAmendmentDetails && JSON.parse(collectionData.lastAmendmentDetails).amendmentNo ? JSON.parse(collectionData.lastAmendmentDetails).amendmentNo : "1";
        this.view.formTemplate12.flxContentTCCenter.lblAmendmentNoValue.text = amendmentNo+"";
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
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
    onBreakpointChange: function() {
      var scope = this;
      try {
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          isTablet = true;
        } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
            isTablet = false;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : updateFormUI
     * Updating the form UI based on service response
     * @return : NA
     */
    updateFormUI: function(viewModel) {
      var scope = this;
      try {
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
        if (viewModel.uploadDocument) {
          this.storeReferenceValues(viewModel.uploadDocument[0].documentReference);
        }
        if (viewModel.deleteDocument) {
          this.deleteUploadedDocument();
        }
        if (viewModel.cancelSuccess) {
          let params = {
            context: "amendmentAcknowledgement",
            data: {
              outwardAmendment: viewModel.cancelSuccess,
              collectionData: collectionData
            }
          };
          scope.presenter.showOutwardCollectionScreen(params);
        }
        if (viewModel.serverError) {
          contentScope.imgAcknowledgement.src = 'failed_icon.png';
          contentScope.lblMessage.text = viewModel.serverError;
          contentScope.flxAcknowledgementMessage.setVisibility(true);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
          "method": "updateFormUI",
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
        contentScope.txtMessageToBankValue.onEndEditing = scope.enableOrDisableSubmit.bind(this);
        contentScope.btnViewDetails.onClick = scope.showPopup.bind(this, "collectionPopup", true);
        popupScope.flxCrossSBLC.onClick = scope.showPopup.bind(this, "collectionPopup", false);
        contentScope.flxCheckBox1.onClick = this.CheckBoxClick.bind(this, "uploadDoc");
        contentScope.flxCheckBox.onClick = this.CheckBoxClick.bind(this, "message");
        contentScope.flxInfoClose.onClick = function() {
          contentScope.flxInfoUploadMsg.setVisibility(false);
        };
        contentScope.btnUpload.onClick = scope.browseSupportingDocument.bind(this);
        contentScope.flxUploadInfoIcon.onClick = function() {
          contentScope.flxInfoUploadMsg.setVisibility(true);
        };
        contentScope.flxClear.onClick = () => contentScope.flxAcknowledgementMessage.setVisibility(false);
        popupScope.UploadDocumentPopup.btnNo.onClick = scope.showPopup.bind(this, "uploadDoc", false);
        popupScope.UploadDocumentPopup.btnYes.onClick = scope.showPopup.bind(this, "uploadDoc", false);
        popupScope.UploadDocumentPopup.flxCross.onClick = scope.showPopup.bind(this, "uploadDoc", false);
		contentScope.btnConfirmAndSubmit.onClick = scope.showPopup.bind(this, "cancel", true);
        popupScope.btnDontSubmit.onClick = scope.showPopup.bind(this, "cancel", false);
		popupScope.flxPopUpClose.onClick = scope.showPopup.bind(this, "cancel", false);
        popupScope.btnCancelRequest.onClick = function() {
          scope.cancelRequest();
          scope.showPopup.bind(this, "cancel", false);
        }
        contentScope.btnCancel.onClick = function() {
          scope.presenter.showOutwardCollectionScreen({
            context: 'outwardCollectionAmendmentDashboard',
            form: scope.view.id,
            data: {
              flowType: kony.i18n.getLocalizedString("i18n.TradeFinance.viewAllCollections")
            }
          });
        }
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : showPopup
     * This function for showing and closing different popups.
     * @return : NA
     */
    showPopup: function(param, show) {
      var scope = this;
      popupScope.setVisibility(show);
      show = !kony.sdk.isNullOrUndefined(show) ? show : true;
      popupScope.flxMainRequestCancellation.setVisibility(false);
      popupScope.flxViewSBLCDetailsPopup.setVisibility(false);
      popupScope.flxUploadDocumentPopup.setVisibility(false);
      switch (param) {
        case "cancel": {
          popupScope.flxMainRequestCancellation.setVisibility(show);
          break;
        }
        case "collectionPopup": {
          popupScope.skin = "slFbox";
          popupScope.flxViewSBLCDetailsPopup.setVisibility(show);
          show ? scope.appendResponses() : "";
          break;
        }
        case "uploadDoc": {
          popupScope.flxUploadDocumentPopup.setVisibility(show);
          break;
        }
      }
    },

    /**
     * @api : CheckBoxClick
     * This function to set default UI based on checkbox clicks.
     * @return : NA
     */
    CheckBoxClick: function(param) {
      var scope = this;
      switch (param) {
        case "uploadDoc": {
          if (contentScope.lblPhysicalCheckbox.text == this.presenter.resourcesConstants.fontIcons.checkboxUnselected) {
            contentScope.lblPhysicalCheckbox.text = this.presenter.resourcesConstants.fontIcons.checkboxSelected;
            contentScope.flxUploadSection.setVisibility(true);
          } else {
            contentScope.lblPhysicalCheckbox.text = this.presenter.resourcesConstants.fontIcons.checkboxUnselected;
            contentScope.flxUploadSection.setVisibility(false);
          }
          break;
        }
        case "message": {
          if (contentScope.lblPhysicalCheckbox1.text == this.presenter.resourcesConstants.fontIcons.checkboxUnselected) {
            contentScope.lblPhysicalCheckbox1.text = this.presenter.resourcesConstants.fontIcons.checkboxSelected;
            contentScope.flxMessageToBankContent.setVisibility(true);
          } else {
            contentScope.lblPhysicalCheckbox1.text = this.presenter.resourcesConstants.fontIcons.checkboxUnselected;
            contentScope.flxMessageToBankContent.setVisibility(false);
          }
          break;
        }
      }
      scope.enableOrDisableSubmit();
    },

    /**
     * @api : setDefaultUI
     * This function to set default UI when landing on screen.
     * @return : NA
     */
    setDefaultUI: function() {
      var scope = this;
      try {
        contentScope.flxAcknowledgementMessage.setVisibility(false);
        formTemplateScope.pageTitle = kony.i18n.getLocalizedString("i18n.TradeFinance.collections") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.RequestCancellation");
        contentScope.btnConfirmAndSubmit.setEnabled(false);
        contentScope.btnConfirmAndSubmit.skin = "ICSknbtnDisablede2e9f036px";
        popupScope.flxMainRequestCancellation.setVisibility(false);
        popupScope.flxViewSBLCDetailsPopup.setVisibility(false);
        popupScope.flxUploadDocumentPopup.setVisibility(false);
        contentScope.flxInfoUploadMsg.setVisibility(false);
        contentScope.flxMessageToBankContent.setVisibility(false);
        contentScope.flxUploadSection.setVisibility(false);
        contentScope.txtMessageToBankValue.text = "";
        contentScope.txtMessageToBankValue.restrictCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
        contentScope.lblPhysicalCheckbox.text = this.presenter.resourcesConstants.fontIcons.checkboxUnselected;
        contentScope.lblPhysicalCheckbox1.text = this.presenter.resourcesConstants.fontIcons.checkboxUnselected;
        contentScope.segUploadDocs.removeAll();
        contentScope.lblAmendmentNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNumber") + ":";
        contentScope.lblSumaryHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.collectionSummary");
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
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
    buttonNavigation: function(param, data) {
      this.navManager = applicationManager.getNavigationManager();
      let formName = "";
      let sendData = {};
      switch (param) {
        case "back": {
          formName = "frmOutwardCollectionDashboard";
          sendData.flowType = "Amendment";
          break;
        }
        case "revise": {
          formName = "frmCreateOutwardCollection";
          sendData = data;
          sendData.flowType = "revise";
          break;
        }
      }
      this.navManager.navigateTo({
        appName: "TradeFinanceMA",
        friendlyName: formName
      }, false, sendData);
    },

    /**
     * @api : setCollectionDetails
     * Set UI as per initial screen.
     * @return : NA
     */
    setCollectionDetails: function() {
      var scope = this;
      try {
        contentScope.lblDraweeDetails.text = this.presenter.renderI18nKeys("i18n.TradeFinance.draweeDetails", true);
        contentScope.lblDraweeDetailsValue.text = collectionData.draweeName ? collectionData.draweeName : NA;
        contentScope.lblTransactionRef.text = this.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", true);
        contentScope.lblTransactionRefValue.text = collectionData.collectionReference ? collectionData.collectionReference : NA;
        contentScope.lblAmount.text = this.presenter.renderI18nKeys("i18n.ChequeManagement.Amount", false);
        contentScope.lblAmountValue.text = (collectionData.currency && collectionData.amount) ? collectionData.currency + " " + applicationManager.getFormatUtilManager().formatAmount(collectionData.amount) : NA;
        contentScope.lblTenorType.text = this.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true);
        contentScope.lblTenorTypeValue.text = collectionData.tenorType ? collectionData.tenorType : NA;
        contentScope.lblMaturityDate.text = this.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", true);
        contentScope.lblMaturityDateValue.text = collectionData.maturityDate ? this.presenter.getConvertedDate(collectionData, 'maturityDate') : NA;
        contentScope.lblRemittingBankDetails.text = this.presenter.renderI18nKeys("i18n.TradeFinance.collectingBankDetails", true);
        contentScope.lblRemittingBankDetailsValue.text = collectionData.collectingBank ? collectionData.collectingBank : NA;
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
          "method": "setCollectionDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setCollectionPopupDetails
     * Setting Collection PopupDetails
     * @return : NA
     */
    setCollectionPopupDetails: function(params) {
      var scope = this;
      try {
        var orientationHandler = new OrientationHandler();
        popupScope.lblViewSBLCHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.inwardCollection") + " - " + collectionData.collectionSrmsId + " - " + kony.i18n.getLocalizedString("i18n.common.ViewDetails");
        scope.setSegAmendmentWidgetDataMap("segDetails");
        let collectionDocData = kony.sdk.isNullOrUndefined(collectionData.documentsUploaded) || collectionData.documentsUploaded === "" ? "" : JSON.parse(collectionData.documentsUploaded.replace(/'/g, '"'));
        let collectionDetails = [];
        let collectionOverview = [{
            lblTransactionHeader: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.collectionOverview", false)
            },
            "flxSeparator2": {
              isVisible: true,
              left: "0dp",
              width: "100%"
            },
            "flxSeparator1": {
              isVisible: true,
              top: "0dp"
            },
            "flxDropDown": {
              isVisible: true
            },
            "imgDropDown": "dropdown_collapse.png",
            "flxDropDown": {
              onClick: scope.onActionClick.bind(this, "segDetails")
            },
            "flxheaderWithDropdown": {
              "skin": "ICSknFlxF8F7F8"
            }
          },
          [{
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.transactionRefWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.collectionSrmsId ? params.collectionSrmsId : NA,
              isVisible: true
            },
            "flxSeparator2": {
              isVisible: true,
              left: "0dp",
              width: "100%"
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.documentNumber", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.documentNo ? params.documentNo : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.receivedOnWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.receivedOn ? scope.presenter.getConvertedDate(params, 'receivedOn') : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.ChequeManagement.Status", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.status ? params.status : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptanceEligible", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.usanceAcceptanceEligibility ? params.usanceAcceptanceEligibility : NA,
              isVisible: true
            },
            flxCollectionAmendRowDetails: {
              height: "63dp"
            }
          }]
        ];
        collectionDetails.push(collectionOverview);
        let collectionDraweeConsent = [{
            lblTransactionHeader: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.draweeConsent", false)
            },
            "flxSeparator2": {
              isVisible: true,
              left: "0dp",
              width: "100%"
            },
            "flxSeparator1": {
              isVisible: true,
              top: "0dp"
            },
            "imgDropDown": "dropdown_collapse.png",
            "flxDropDown": {
              onClick: scope.onActionClick.bind(this, "segDetails")
            },
            "flxheaderWithDropdown": {
              "skin": "ICSknFlxF8F7F8"
            }
          },
          [{
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.draweeAcknowledgement", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.draweeAcknowledgement ? params.draweeAcknowledgement : NA,
              isVisible: true
            },
            "flxSeparator2": {
              isVisible: true,
              left: "0dp",
              width: "100%"
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptance", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.usanceAcceptance ? params.usanceAcceptance : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptanceDate", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.usanceAcceptanceDate ? scope.presenter.getConvertedDate(params, 'usanceAcceptanceDate') : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.billOfExchangeStatus", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.billExchangeStatus ? params.billExchangeStatus : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.amountDebitFromWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.debitAmountFrom ? params.debitAmountFrom : "1",
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitFrom", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.chargesDebitFrom ? params.chargesDebitFrom : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.messageToBankWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.messageToBank ? params.messageToBank : NA,
              isVisible: true
            },
            flxCollectionAmendRowDetails: {
              height: "63dp"
            }
          }]
        ];
        collectionDetails.push(collectionDraweeConsent);
        let popupCollectionDetails = [{
            lblTransactionHeader: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.collectionDetails", false)
            },
            "flxSeparator2": {
              isVisible: true,
              left: "0dp",
              width: "100%"
            },
            "flxSeparator1": {
              isVisible: true,
              top: "0dp"
            },
            "imgDropDown": "dropdown_collapse.png",
            "flxDropDown": {
              onClick: scope.onActionClick.bind(this, "segDetails")
            },
            "flxheaderWithDropdown": {
              "skin": "ICSknFlxF8F7F8"
            }
          },
          [{
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.drawerDetails", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.drawerName ? params.drawerName : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.ChequeManagement.Amount", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: (params.currency && params.amount) ? params.currency + " " + params.amount : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.accounts.charges", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.charges ? params.currency + params.amount : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.Wealth.maturityDate", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.maturityDate ? scope.presenter.getConvertedDate(params, 'maturityDate') : NA,
              isVisible: true,
              width: '90dp'
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.tenorType ? params.tenorType : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetails", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.usanceDetails ? params.usanceDetails : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: "INCO Terms:",
              isVisible: true
            },
            lblReviewValue1: {
              text: params.incoTerms ? params.incoTerms : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.remittingBankDetails", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: params.remittingBank ? params.remittingBank : NA,
              isVisible: true
            }
          }]
        ];
        for (let i = 0; i < collectionDocData.length; i++) {
          data = {
            lblReviewLeft: {
              text: i === 0 ? kony.i18n.getLocalizedString("i18n.wealth.Documents") + ":" : ""
            },
            lblDocumentName: {
              text: collectionDocData[i].documentName ? collectionDocData[i].documentName : NA,
              skin: "ICSknLbl424242SSPRegular15px"
            },
            flxreviewRows: {
              isVisible: collectionDocData.length > 0 ? true : false,
              left: (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? "2.54%" : "1.54%"
            },
            flxDocument: {
              "left": (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? "244dp" : "286dp"
            },
            imgDownloadIcon: {
              isVisible: false
            },
            template: "flxReviewUploadDocumentsRowTemplate"
          }
          popupCollectionDetails[1].push(data);
        }
        let lcMessageFromBank = {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.ImportDrawings.MessageFromBank", true),
            isVisible: true
          },
          lblReviewValue1: {
            text: params.messageFromBank ? params.messageFromBank : NA,
            isVisible: true
          },
          flxReviewRows: {
            top: "10dp"
          },
          flxCollectionAmendRowDetails: {
            height: "50dp"
          },
          flxRowTemplateSeparator: {
            isVisible: true
          }
        };
        popupCollectionDetails[1].push(lcMessageFromBank);
        collectionDetails.push(popupCollectionDetails);
        popupScope.segDetails.setData(collectionDetails);
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
          "method": "setCollectionPopupDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : cancelRequest
     * calls the cancel request service
     * @return : NA
     */
    cancelRequest: function() {
      let supportingDocument = [];

      if (documentsList.length === docReferenceValues.length) {
        for (let i = 0; i < documentsList.length; i++) {
          supportingDocument.push({
            "documentName": documentsList[i][0],
            "documentReferences": docReferenceValues[i]
          });
        }
      }

      let params = {
        "corporateUserName": collectionData.draweeName ? collectionData.draweeName : "",
        "cancellationStatus": "Requested",
        "collectionReference": collectionData.collectionReference,
        "messageToBank": contentScope.txtMessageToBankValue.text,
        "uploadDocuments": supportingDocument.length > 0 ? JSON.stringify(supportingDocument) : ""
      };
      this.presenter.createCancellationRequest(params, "frmOutwardCollectionCancellation");
    },

    /**
     * @api : browseSupportingDocument
     * This function enables the file upload window
     * @return : NA
     */
    browseSupportingDocument: function() {
      var scope = this;
      try {
        var config = {
          selectMultipleFiles: false,
          filter: ["application/pdf", "image/jpeg", "image/png", "image/bmp", "application/x-zip-compressed", "application/msword", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", ".csv"]
        };
        if (documentsList.length >= scope.presenter.collectionsConfig.documentsLimit) {
          scope.showPopup("uploadDoc", true);
          popupScope.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AttachmentLimitExceededErrorMsg");
          scope.view.forceLayout();
          return;
        }
        kony.io.FileSystem.browse(config, scope.selectedFileCallback);
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
          "method": "browseSupportingDocument",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : selectedFileCallback
     * This function is triggered on sucessful file upload
     * @return : NA
     */
    selectedFileCallback: function(events, files) {
      var scope = this;
      try {
        const extensions = scope.presenter.collectionsConfig.fileExtensions;;
        var fileNameRegex = new RegExp("^[a-zA-Z0-9]*[.][.a-zA-Z0-9]*[^.]$");
        if (files.length > 0) {
          const extension = files[0].file.name.split('.').pop();
          if (extension && !extensions.hasOwnProperty(extension)) {
            scope.showPopup("uploadDoc", true);
            popupScope.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg3");
            scope.view.forceLayout();
            return;
          }
          if (files[0].file.size >= scope.presenter.collectionsConfig.documentMaxSize) {
            scope.showPopup("uploadDoc", true);
            popupScope.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentSizeErrorMsg");
            scope.view.forceLayout();
            return;
          } else {
            var fileData = {};
            scope.showPopup("uploadDoc", false);
            document = [files[0].name, extensions[extension]];
            fileData.fileName = files[0].name;
            fileData.fileType = files[0].file.type;
            scope.getBase64(files[0].file, function(base64String) {
              fileData.fileContents = base64String.split(';base64,')[1];
              let fileDataItemParsed = [fileData.fileName, fileData.fileType, fileData.fileContents].join('~');
              scope.presenter.uploadDocument(fileDataItemParsed, scope.view.id);
            });
          }
        }
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
          "method": "selectedFileCallback",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : getBase64
     * This function fetches Base64 format of the file
     * @return : NA
     */
    getBase64: function(file, successCallback) {
      var scope = this;
      try {
        var reader = new FileReader();
        reader.onloadend = function() {
          successCallback(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
          "method": "getBase64",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : storeReferenceValues
     * This function stores the referenceIDs of uploaded files in array
     * @return : NA
     */
    storeReferenceValues: function(key) {
      var scope = this;
      try {
        documentsList.push(document);
        docReferenceValues.push(key);
        scope.enableOrDisableSubmit();
        this.setAttachmentsDataToSegment();
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
          "method": "storeReferenceValues",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setAttachmentsDataToSegment
     * This function sets Doc data to the segment
     * @return : NA
     */
    setAttachmentsDataToSegment: function() {
      var scope = this;
      try {
        if (documentsList.length === 0) {
          contentScope.segUploadDocs.removeAll();
          contentScope.flxUploadDocSeg.setVisibility(true);
          return;
        }
        contentScope.flxUploadDocSeg.setVisibility(true);
        var attachmentsData = [];
        for (const document of documentsList) {
          attachmentsData.push({
            "imgPDF": {
              "src": document[1] || 'aa_password_error.png'
            },
            "fileName": {
              text: document[0],
              toolTip: document[0]
            },
            "lblDelete": {
              "text": "S"
            },
            "removeAction": {
              "onClick": scope.deleteAttachment.bind(scope)
            },
            "template": "flxExportLCDrawingsUploadDocument"
          });
        }
        contentScope.segUploadDocs.widgetDataMap = {
          "imgPDF": "imgPDF",
          "lblDocumentName": "fileName",
          "lblDelete": "lblDelete",
          "flxDelete": "removeAction"
        };
        contentScope.segUploadDocs.setData(attachmentsData);
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
          "method": "setAttachmentsDataToSegment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : deleteAttachment
     * This function invlokes delete document service call
     * @return : NA
     */
    deleteAttachment: function() {
      var scope = this;
      try {
        deletedIndex = contentScope.segUploadDocs.selectedRowIndex[1];
        scope.presenter.deleteDocument(docReferenceValues[deletedIndex], this.view.id);
        scope.showPopup("uploadDoc", false);
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
          "method": "deleteAttachment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setsegCollectionDetails: function() {
      var scope = this;
      try {
        let collectionSummaryPopupRef = popupScope.flxViewSBLCDetailsPopup.GuaranteeDetails;
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

    appendResponses: function() {
      var scope = this;
      try {
        popupScope.lblViewSBLCHeader.text = kony.i18n.getCurrentLocale() === "ar_AE" ? kony.i18n.getLocalizedString("i18n.common.ViewDetails") + " - " + collectionData.collectionReference + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") : kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") + " - " + collectionData.collectionReference + " - " + kony.i18n.getLocalizedString("i18n.common.ViewDetails");
        scope.collectionOverView();
        if (collectionData.status === outwardcollection_status['Settled']) {
          scope.paymentDetails();
        } else if (collectionData.status === outwardcollection_status['Approved'] || collectionData.status === outwardcollection_status['Overdue']) {
          scope.draweeConsent();
        }
        scope.colletionDetails();
        scope.draweeAndBankDetails();
        scope.documentAndBankInstruction();
        let setSegData = [...collectionOverViewArray, ...paymentStatusArray, ...draweeConsentArray, ...collectionDetailsArray, ...draweeAndBankDetailsArray, ...documentAndBankInstructionArray];
        popupScope.GuaranteeDetails.segDetails.setData(setSegData);
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
        popupScope.flxReturnedByBankPopup.setVisibility(false);
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
                "lblValue": collectionData.collectionReference ? scope.presenter.getDynamicData(collectionData, 'collectionReference') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.updatedOn", true),
                "lblValue": collectionData.updatedOn ? scope.presenter.getConvertedDate(collectionData, 'updatedOn') : NA,
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.ChequeManagement.Status", true),
                "lblValue": collectionData.status ? scope.presenter.getDynamicData(collectionData, 'status') : NA
              }
            ]
          ]
        ];
        // If status is Rejected
        if (collectionData.status === outwardcollection_status['Rejected']) {
          collectionOverViewArray[0][1].push(
            [{
              "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejectionWithColon", true),
              "lblValue": collectionData.reasonForRejection ? scope.presenter.getDynamicData(collectionData, 'reasonForRejection') : NA
            }]
          )
        } else if (collectionData.status === outwardcollection_status['Returned by Bank']) {
          collectionOverViewArray[0][1].push({
            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturned", true),
            "lblValue": collectionData.reasonForReturn ? scope.presenter.getDynamicData(collectionData, 'reasonForReturn') : NA
          })
        } else if (collectionData.status === outwardcollection_status['Rejected'] || collectionData.status === outwardcollection_status['Settled'] || collectionData.status === outwardcollection_status['Approved'] || collectionData.status === outwardcollection_status['Overdue']) {
          collectionOverViewArray[0][1].push({
            "lblKey": scope.presenter.renderI18nKeys("i18n.mortgageAccount.MaturityDate", false),
            "lblValue": collectionData.maturityDate ? scope.presenter.getConvertedDate(collectionData, 'maturityDate') : NA
          }, {
            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturned", true),
            "lblValue": collectionData.reasonForReturn ? scope.presenter.getDynamicData(collectionData, 'reasonForReturn') : NA
          }, {
            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.requestPaymentStatus", true),
            "lblValue": collectionData.status ? scope.presenter.getDynamicData(collectionData, 'paymentStatus') : NA
          }, {
            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.MessagefromBank", true),
            "lblValue": collectionData.messageFromBank ? scope.presenter.getDynamicData(collectionData, 'messageFromBank') : NA
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
                "lblValue": collectionData.paymentStatusWith ? scope.presenter.getDynamicData(collectionData, 'paymentStatus') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.settledAmount", false),
                "lblValue": collectionData.amount ? scope.presenter.getDynamicData(collectionData, 'amount') : NA,
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.ChequeManagement.Status", true),
                "lblValue": collectionData.status ? scope.presenter.getDynamicData(collectionData, 'status') : NA
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
              "lblValue": collectionData.draweeAcknowledgment ? scope.presenter.getDynamicData(collectionData, 'draweeAcknowledgment') : NA
            }, {
              "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.acceptance", true),
              "lblValue": collectionData.draweeAcceptance ? scope.presenter.getDynamicData(collectionData, 'draweeAcceptance') : NA,
            }, {
              "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.billOfExchangeSigned", true),
              "lblValue": collectionData.isBillExchangeSigned ? scope.presenter.getDynamicData(collectionData, 'isBillExchangeSigned') : NA
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
                "lblValue": collectionData.documentNo ? scope.presenter.getDynamicData(collectionData, 'documentNo') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.createdOnWithColon", false),
                "lblValue": collectionData.createdOn ? scope.presenter.getConvertedDate(collectionData, 'createdOn') : NA,
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
                "lblValue": collectionData.tenorType ? scope.presenter.getDynamicData(collectionData, 'tenorType') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDays", true),
                "lblValue": collectionData.usanceDays ? scope.presenter.getDynamicData(collectionData, 'usanceDays') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetailsWithColon", false),
                "lblValue": collectionData.usanceDetails ? scope.presenter.getDynamicData(collectionData, 'usanceDetails') : NA,
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.allowUserAcceptance", true),
                "lblValue": collectionData.allowUsanceAcceptance ? scope.presenter.getDynamicData(collectionData, 'allowUsanceAcceptance') : NA
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
                "lblValue": collectionData.amount ? scope.presenter.getDynamicData(collectionData, 'amount') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.amountCreditAccount", false),
                "lblValue": collectionData.creditAccount ? scope.presenter.getDynamicData(collectionData, 'creditAccount') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitAccountWithColon", false),
                "lblValue": collectionData.debitAccount ? scope.presenter.getDynamicData(collectionData, 'debitAccount') : NA
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
        let bankAddress = scope.presenter.getMethodForAddress(collectionData.collectingBankAddress);
        let draweeAddress = scope.presenter.getMethodForAddress(collectionData.draweeAddress);
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
                "lblValue": collectionData.draweeName ? scope.presenter.getDynamicData(collectionData, 'draweeName') : NA,
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
                "lblValue": collectionData.collectingBank ? scope.presenter.getDynamicData(collectionData, 'collectingBank') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.swift/BicCodeWithColon", false),
                "lblValue": collectionData.swiftOrBicCode ? scope.presenter.getDynamicData(collectionData, 'swiftOrBicCode') : NA
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
        let docResponse = collectionData.uploadDocuments ? collectionData.uploadDocuments : NA;
        let tempDocResponse = "";
        if (docResponse !== NA) {
          docResponse = JSON.parse(collectionData.uploadDocuments.replace(/'/g, "\""));
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
                "lblValue": scope.presenter.processDocsAndInstructionBills(collectionData, 'uploadDocuments')
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.physicalDocumentDetailsWithColon", false),
                "lblValue": {
                  text: scope.presenter.getPhysicalDocumentCount(collectionData.physicalDocuments),
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
                "lblValue": collectionData.incoTerms ? scope.presenter.getDynamicData(collectionData, 'incoTerms') : NA
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.deliveryInstructionsOptional", true),
                "lblValue": 
                {
                  text: collectionData.deliveryInstructions ? scope.presenter.getDynamicData(collectionData, 'deliveryInstructions') : NA,
                }
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.otherCollectionDetailsWithOptional", true),
                "lblValue": {
                  text: collectionData.otherCollectionDetails ? scope.presenter.getDynamicData(collectionData, 'otherCollectionDetails') : NA,
                }
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.MessageToBankOptional", true),
                "lblValue": 
                {
                  text: collectionData.messageToBank ? scope.presenter.getDynamicData(collectionData, 'messageToBank') : NA,
                }
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.instructionForBills", true),
                "lblValue": 
                {
                  text: scope.presenter.processDocsAndInstructionBills(collectionData, 'instructionsForBills'),
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
          segScope = popupScope.flxViewSBLCDetailsPopup.GuaranteeDetails;
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

    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @return : NA
     */
    onError: function(err) {
      let errMsg = JSON.stringify(err);
      errMsg.level = "frmInwardCollectionAmendmentViewDetails";
      // kony.ui.Alert(errMsg);
    },

    /**
     * @api : enableOrDisableSubmit
     * this method enables the submit button on fulfiling the req criteria.
     * @return : NA
     */
    enableOrDisableSubmit: function () {
      if ((contentScope.txtMessageToBankValue.text !== "" && contentScope.lblPhysicalCheckbox1.text == this.presenter.resourcesConstants.fontIcons.checkboxSelected &&
          (documentsList.length > 0 && contentScope.lblPhysicalCheckbox.text == this.presenter.resourcesConstants.fontIcons.checkboxSelected ||
              contentScope.lblPhysicalCheckbox.text == this.presenter.resourcesConstants.fontIcons.checkboxUnselected)) ||
          (documentsList.length > 0 && contentScope.lblPhysicalCheckbox.text == this.presenter.resourcesConstants.fontIcons.checkboxSelected &&
              (contentScope.txtMessageToBankValue.text !== "" && contentScope.lblPhysicalCheckbox1.text == this.presenter.resourcesConstants.fontIcons.checkboxSelected ||
                  contentScope.lblPhysicalCheckbox1.text == this.presenter.resourcesConstants.fontIcons.checkboxUnselected))) {
          contentScope.btnConfirmAndSubmit.setEnabled(true);
          contentScope.btnConfirmAndSubmit.skin = "ICSknsknBtnSSPffffff15pxBg0273e3";
      } else {
          contentScope.btnConfirmAndSubmit.setEnabled(false);
          contentScope.btnConfirmAndSubmit.skin = "ICSknbtnDisablede2e9f036px";
      }
  },

    /**
     * @api : deleteUploadedDocument
     * This function removes the deleted document from the segment
     * @return : NA
     */
    deleteUploadedDocument: function() {
      var scope = this;
      try {
        documentsList.splice(deletedIndex, 1);
        docReferenceValues.splice(deletedIndex, 1);
        scope.setAttachmentsDataToSegment();
        scope.enableOrDisableSubmit();
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionCancellationController",
          "method": "deleteUploadedDocument",
          "error": err
        };
        scope.onError(errorObj);
      }
    }
  };
});