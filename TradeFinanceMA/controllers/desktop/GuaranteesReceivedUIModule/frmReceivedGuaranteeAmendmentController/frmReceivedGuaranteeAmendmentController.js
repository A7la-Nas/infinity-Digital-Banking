define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let lcData;
  let isTablet = false;
  const ACCEPTED = kony.i18n.getLocalizedString("i18n.TradeFinance.Accepted");
  const REJECTED = kony.i18n.getLocalizedString("i18n.Search.Rejected");
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  const HEADER = 'header';
  const SWIFT_TAG = 'swiftTag';
  const SWIFT_MESSAGE_HEADER =  "*********************SWIFT AUTH. CORRECT************************";
  const SWIFT_MESSAGE_DETAILS = "*********************MESSAGE************************";
  const SWIFT_MESSAGE_FOOTER = " *****************************End of Message**************************"; 
  return {

    /**
     * @api : init
     * This function for executing the lines of code only once
     * @return : NA
     */
    init: function() {
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
    onNavigate: function(data) {
      lcData = data ? data : {};
      this.presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeFinanceMA',
        'moduleName': 'GuaranteesReceivedUIModule'
      });
    },

    /**
     * @api : preShow
     * This function for executing the primary functions before rendering UI
     * @return : NA
     */
    preShow: function() {
      var scope = this;
      try {
        if (this.presenter.isEmptyNullOrUndefined(lcData)) lcData = Object.assign(lcData, {LCDetails: this.presenter.guaranteeData}, this.presenter.amendmentData);
        scope.setDefaultUI();
        scope.setGuaranteeDetails();
        scope.setAmendmentDetailsData();
        scope.renderSwiftAndAdvices();
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
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
    postShow: function() {
      var scope = this;
      try {
        scope.initButtonActions();
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
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
        scope.view.customheadernew.onBreakpointChangeComponent(currentBreakpoint);
        scope.view.customfooternew.onBreakpointChangeComponent(currentBreakpoint);
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          isTablet = true;
        } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
          isTablet = false;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
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
    initButtonActions: function() {
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
        scope.view.flxVerticalEllipsisBody.onClick = this.renderPrintAndDownload.bind(this);
        scope.view.btnViewDetails.onClick = scope.showSBLCPopup.bind(this);
        scope.view.flxCrossSBLC.onClick = function() {
          scope.view.flxDialogs.setVisibility(false);
          scope.view.flxViewSBLCDetailsPopup.setVisibility(false);
        };
        scope.view.btnSubmitConsent.onClick = this.submitAmendment.bind(this);
        scope.view.btnBack.onClick = this.buttonNavigation.bind(this, "back");
        scope.view.btnViewAllAmendments.onClick = this.buttonNavigation.bind(this,"viewAllGuaranteeAmendments");
        scope.view.btnViewAllGuarantee.onClick = this.buttonNavigation.bind(this,"viewAllGuarantee");
        scope.view.lblAccept.text = this.presenter.renderI18nKeys("i18n.TradeFinance.Accept", false) + " (ACCP)";
        scope.view.lblReject.text = this.presenter.renderI18nKeys("i18n.konybb.myApproval.Reject", false) + " (REJT)";
        scope.view.flxAcceptAmendmentRadio.onClick = scope.selectAcceptOrReject.bind(this, "accept");
        scope.view.flxRejectAmendmentRadio.onClick = scope.selectAcceptOrReject.bind(this, "reject");
        scope.view.txtReasonForSelfRejection.onEndEditing = function() {
          scope.view.txtReasonForSelfRejection.text !== "" ? scope.enableOrDisableButton(scope.view.btnSubmitConsent, true) : scope.enableOrDisableButton(scope.view.btnSubmitConsent, false);
        };
        scope.view.lblHeading.text = this.presenter.renderI18nKeys("i18n.TradeFinance.receivedGuaranteeAndStandbyLCAmendment", false) + " - " + lcData.amendmentSrmsId;
        scope.view.flxClear.onClick = function() {
          scope.view.flxAcknowledgementMessage.setVisibility(false);
        };
        scope.view.flxErrorClose.onClick = function() {
          scope.view.flxErrorMessage.setVisibility(false);
        };
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
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
    updateFormUI: function(viewModel) {
      var scope = this;
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.serverError) {
        this.view.lblErrorMessage.text = viewModel.serverError;
        this.setAcknowledgementUI(false);
      }
      if (viewModel.submitReceivedGuaranteeAmendSuccess) {
        this.view.lblMessage.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.SelfAcceptanceSuccess", false);
        this.setAcknowledgementUI(true);
      }
    },

    /**
     * @api : setAcknowledgementUI
     * This function to set UI based on the service response.
     * @return : NA
     */
    setAcknowledgementUI: function(param) {
      lcData.status = param ? OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.SUBMITTED_TO_BANK : lcData.status;
      this.view.flxErrorMessage.setVisibility(!param);
      this.view.flxAcknowledgementMessage.setVisibility(param);
      this.view.flxButtons.setVisibility(!param);
      this.view.flxActionButtons.setVisibility(param);
      this.view.flxSelfAcceptance.setVisibility(!param);
      this.setAmendmentDetailsData();
    },

    /**
     * @api : setDefaultUI
     * This function to set default UI when landing on screen.
     * @return : NA
     */
    setDefaultUI: function() {
      var scope = this;
      try {
        this.view.txtReasonForSelfRejection.text = "";
        this.view.txtMessageToBank.text = "";
        this.view.lblIssueDateKey.text = kony.i18n.getCurrentLocale() === 'ar_AE' ? ":" + kony.i18n.getLocalizedString("kony.mb.CM.issueDate") : kony.i18n.getLocalizedString("kony.mb.CM.issueDate") + ":";
        this.view.imgAcceptRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
        this.view.imgRejectRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
        this.view.flxOtherDetails.setVisibility(false);
        this.view.flxErrorMessage.setVisibility(false);
        this.view.flxAcknowledgementMessage.setVisibility(false);
        this.view.flxDialogs.setVisibility(false);
        this.view.flxSwiftDetailsPopup.setVisibility(false);
        this.view.flxPaymentAdvicePopup.setVisibility(false);
        this.view.flxViewSBLCDetailsPopup.setVisibility(false);
        this.view.flxSelfAcceptance.setVisibility(false);
        this.view.flxButtons.setVisibility(false);
        this.view.flxActionButtons.setVisibility(true);
        if (lcData.status === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.NEW) {
          this.view.flxSelfAcceptance.setVisibility(true);
          this.view.flxButtons.setVisibility(true);
          this.view.flxActionButtons.setVisibility(false);
        } else {
          this.view.flxSelfAcceptance.setVisibility(false);
          this.view.flxButtons.setVisibility(false);
          this.view.flxActionButtons.setVisibility(true);
        }
        FormControllerUtility.disableButton(scope.view.btnSubmitConsent);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "setDefaultUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setGuaranteeDetails
     * Set UI as per initial screen.
     * @return : NA
     */
    setGuaranteeDetails: function() {
      var scope = this;
      try {
        this.view.lblBeneficiaryDetailsValue.text = kony.sdk.isNullOrUndefined(lcData.LCDetails.beneficiaryDetails) || lcData.LCDetails.beneficiaryDetails === "" ? NA : JSON.parse(lcData.LCDetails.beneficiaryDetails.replace(/'/g, '"'))[0].beneficiaryName;
        this.view.lblTransRefValue.text = kony.sdk.isNullOrUndefined(lcData.LCDetails.guaranteeSrmsId) || lcData.LCDetails.guaranteeSrmsId === "" ? NA : lcData.LCDetails.guaranteeSrmsId;
        this.view.lblProductTypeValue.text = kony.sdk.isNullOrUndefined(lcData.LCDetails.productType) || lcData.LCDetails.productType === "" ? NA : lcData.LCDetails.productType;
        this.view.lblBillTypeValue.text = kony.sdk.isNullOrUndefined(lcData.LCDetails.lcType) || lcData.LCDetails.lcType === "" ? NA : lcData.LCDetails.lcType;
        this.view.lblAmountValue.text = kony.sdk.isNullOrUndefined(lcData.LCDetails.amount) || lcData.LCDetails.amount === "" ? NA : lcData.LCDetails.currency + " " + applicationManager.getFormatUtilManager().formatAmount(lcData.LCDetails.amount);
        this.view.lblIssueDateValue.text = kony.sdk.isNullOrUndefined(lcData.LCDetails.expectedIssueDate) || lcData.LCDetails.expectedIssueDate === "" ? NA : lcData.LCDetails.expectedIssueDate;
        this.view.lblExpiryTypeValue.text = kony.sdk.isNullOrUndefined(lcData.LCDetails.expiryType) || lcData.LCDetails.expiryType === "" ? NA : lcData.LCDetails.expiryType;
        this.view.lblExpiryDateValue.text = kony.sdk.isNullOrUndefined(lcData.LCDetails.expiryDate) || lcData.LCDetails.expiryDate === "" ? NA : lcData.LCDetails.expiryDate;
        this.view.lblApplicantPartyValue.text = kony.sdk.isNullOrUndefined(lcData.LCDetails.applicantParty) || lcData.LCDetails.applicantParty === "" ? NA : lcData.LCDetails.applicantParty;
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "setGuaranteeDetails",
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
              formName = "frmGuaranteesReceivedDashboard";
              sendData = !kony.sdk.isNullOrUndefined(data) ? data : sendData;
              sendData.flowType = 'ReceivedAmendments';
              break;
            }
          case "viewAllGuarantee":
            {
              formName = "frmGuaranteesReceivedDashboard";
              sendData = !kony.sdk.isNullOrUndefined(data) ? data : sendData;
              sendData.flowType = 'ReceivedGuarantees';
              break;
            }
          case "viewAllGuaranteeAmendments":
            {
              formName = "frmGuaranteesReceivedDashboard";
              sendData = !kony.sdk.isNullOrUndefined(data) ? data : sendData;
              sendData.flowType = 'ReceivedAmendments';
              break;
            }
        }
        this.navManager.navigateTo({
          appName: "TradeFinanceMA",
          friendlyName: formName
        }, false, sendData);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "buttonNavigation",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : showSBLCPopup
     * This function for showing the SBLC details popup
     * @return : NA
     */
    showSBLCPopup: function() {
      var scope = this;
      try {
        this.view.flxDialogs.setVisibility(true);
        var breakpoint = kony.application.getCurrentBreakpoint();
        this.view.flxSwiftDetailsPopup.setVisibility(false);
        this.view.flxPaymentAdvicePopup.setVisibility(false);
        this.view.flxViewSBLCDetailsPopup.setVisibility(true);
        this.setSBLCData();
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "showSBLCPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setSBLCData
     * This function for setting data in SBLC popup
     * @return : NA
     */
    setSBLCData: function() {
      var scope = this;
      try {
        let param = lcData.LCDetails;
        scope.view.GuaranteeReceivedDetails.setContext(param);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "setSBLCData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setSegAmendmentWidgetDataMap
     * This function for setting widgetDataMap for segment
     * @param : name of the segment.
     * @return : NA
     */
    setSegAmendmentWidgetDataMap: function(segName) {
      var scope = this;
      try {
        var breakpoint = kony.application.getCurrentBreakpoint();
        
        if (breakpoint === 1024 ) {
          scope.view[segName].rowTemplate = "flxAmendRowTemplateTablet";
        } else {
          scope.view[segName].rowTemplate = "flxAmendRowTemplate";
        }
        scope.view[segName].sectionHeaderTemplate = "flxReviewHeader";
        scope.view[segName].widgetDataMap = {
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
          "flxBottomSeparator": "flxBottomSeparator"
        };
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "setSegAmendmentWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setRequestDetailsData
     * This function for setting data in RequestDetails Segment
     * @return : NA
     */
    setAmendmentDetailsData: function () {
      var scope = this;
      try {
        scope.setSegAmendmentWidgetDataMap("segAmendmentViewDetails");
        let benData = kony.sdk.isNullOrUndefined(lcData.beneficiaryDetails) || lcData.beneficiaryDetails === "" ? "" :  JSON.parse(lcData.beneficiaryDetails.replace(/'/g, '"'));
        let docData = kony.sdk.isNullOrUndefined(lcData.supportingDocuments) || lcData.supportingDocuments === "" ? "" :   JSON.parse(lcData.supportingDocuments.replace(/'/g, '"'));
        let date = new Date();
        let amendmentRequestedDetails = [];
        var breakpoint = kony.application.getCurrentBreakpoint();
        
        let section1 = [{
          lblTransactionHeader: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentDetails", false),
            left: "20dp"
          },
          "flxReviewHeader": {
            skin: "ICsknFlxffffff"
          },
          "flxSeparator2": {
            isVisible: true
          },
          "flxDropDown": {
            isVisible: false
          }
        },
        [{
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.serviceRequests.Status:", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: lcData.status ? lcData.status : NA,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNo", true),
            isVisible: true
          },
          lblReviewValue1: {
            text: lcData.amendmentNo ? lcData.amendmentNo : "1",
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.ReceivedOn", true),
            isVisible: true
          },
          lblReviewValue1: {
            text: lcData.receivedOn ? CommonUtilities.getFrontendDateString(lcData.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat): NA,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentReference", true),
            isVisible: true
          },
          lblReviewValue1: {
            text: lcData.amendmentSrmsId ? lcData.amendmentSrmsId : NA,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentCharges", true),
            isVisible: true
          },
          lblReviewValue1: {
            text: lcData.amendmentCharges ? lcData.currency + " " + lcData.amendmentCharges : NA,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.SelfAcceptance", true),
            isVisible: true
          },
          lblReviewValue1: {
            text: lcData.selfAcceptance ? lcData.selfAcceptance : NA,
            skin: "ICSknlbl424242SSP15pxSemibold",
            isVisible: true
          },
          flxreviewRows:{
            isVisible: (lcData.selfAcceptance === ACCEPTED  || lcData.selfAcceptance === REJECTED) ? true : false
          }
        },
         {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.selfAcceptanceDate", true),
            isVisible: true
          },
          lblReviewValue1: {
            text: CommonUtilities.getFrontendDateString(date.getMonth()+ 1 +"/"+date.getDate()+"/"+date.getFullYear(),applicationManager.getConfigurationManager().frontendDateFormat),
            isVisible: true
          },
          flxreviewRows:{
            isVisible: (lcData.selfAcceptance === ACCEPTED  || lcData.selfAcceptance === REJECTED) ? true : false
          }
        },
        {
          flxreviewRows: {
            isVisible: false
          },
          flxBottomSeparator: {
            top: "10dp",
            isVisible: true
          }
        }
        ]
        ];
        amendmentRequestedDetails.push(section1);

        let section2 = [{
          lblTransactionHeader: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.amendmentRequested", false),
            skin: "ICSknLabelSSPRegular42424215px",
            left: "20dp"
          },
          "flxSeparator2": {
            isVisible: true
          },
          "imgDropDown": "dropdown_collapse.png",
          "flxDropDown": {
            onClick: scope.onActionClick.bind(this)
          }
        },
        [{
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.dateOfAmountChange", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: lcData.dateOfAmountChange ? lcData.dateOfAmountChange : NA,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.wealth.amountmb", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: lcData.amendAmount ? lcData.LCDetails.currency + " "+ applicationManager.getFormatUtilManager().formatAmount(lcData.amendAmount) : NA,
            isVisible: true
          },
          flxRowTemplateSeparator: {
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.expiryTypeWithColon", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: lcData.amendExpiryType ? lcData.amendExpiryType : NA,
            isVisible: true
          },
          flxRowTemplateSeparator: {
            isVisible: true
          }
        },
        ]
        ];

        for (let i = 0; i < benData.length; i++) {
          let data = {
            lblReviewLeft: {
              text: i === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryDetails") + ":" : ""
            },
            lblHeading1: {
              text: benData[i].beneficiaryName
            },
            lblHeading2: {
              text: benData[i].beneficiaryName,
              isVisible: false
            },
            lblDetailsRow1: {
              text: benData[i].address1,
              isVisible: true
            },
            lblDetailsRow2: {
              text: benData[i].address2,
              isVisible: true
            },
            lblDetailsRow3: {
              text: benData[i].city,
              isVisible: true
            },
            lblDetailsRow4: {
              text: benData[i].zipcode && benData[i].zipcode != "" ? benData[i].state + ", " + benData[i].zipcode : benData[i].state,
              isVisible: true
            },
            flxreviewRows: {
              left: "17dp"
            },
            template: "flxReviewDetailsRowTemplate"
          }
          section2[1].push(data);
        }

        let govLaw = {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.governingLawWithColon", false),
            isVisible: true
          },
          lblReviewValue1: {
            text: lcData.LCDetails.governingLaw ? lcData.LCDetails.governingLaw : NA,
            isVisible: true
          },
          flxRowTemplateSeparator: {
            isVisible: true
          }
        };
        section2[1].push(govLaw);

        let otherData = {
          flxreviewRows: {
            isVisible: false
          },
          flxBottomSeparator: {
            top: "10dp",
            isVisible: true
          }
        };
        section2[1].push(otherData);
        amendmentRequestedDetails.push(section2);


        let section3 = [{
          lblTransactionHeader: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.additionalInstructions&Documents", false),
            skin: "ICSknLabelSSPRegular42424215px",
            left: "20dp"
          },
          "flxSeparator2": {
            isVisible: true
          },
          "imgDropDown": "dropdown_collapse.png",
          "flxDropDown": {
            onClick: scope.onActionClick.bind(this)
          }
        },
        [
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.ImportDrawings.MessageFromBank", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: lcData.messageFromBank ? lcData.messageFromBank : NA,
              isVisible: true
            }
          }
        ]
        ];

        for (let i = 0; i < docData.length; i++) {
          data = {
            lblReviewLeft: {
              text: i === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.uploadedDocumentsWithColon") : "",
              left: (kony.application.getCurrentBreakpoint() === 1024) ? "10dp" : "3dp"
            },
            lblDocumentName: {
              text: docData[i].documentName
            },
            flxreviewRows: {
              isVisible: docData.length > 0 ? true : false
            },
            template: "flxReviewUploadDocumentsRowTemplate"
          }
          section3[1].push(data);
        }

        let botvalue = {
          flxreviewRows: {
            isVisible: false
          },
          flxBottomSeparator: {
            top: "10dp",
            skin: "slFbox",
            isVisible: true
          }
        };
        section3[1].push(botvalue);
        amendmentRequestedDetails.push(section3);

        scope.view.segAmendmentViewDetails.setData(amendmentRequestedDetails);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "setRequestDetailsData",
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
    onActionClick: function() {
      var scopeObj = this;
      try {
        var index = scopeObj.view.segAmendmentViewDetails.selectedRowIndex;
        var sectionIndex = index[0];
        var data = scopeObj.view.segAmendmentViewDetails.data;
        var selectedHeaderData = data[sectionIndex][0];
        if (this.segViewDetailsTempData === "") {
          this.segViewDetailsTempData = JSON.parse(JSON.stringify(this.view.segAmendmentViewDetails.data));
        }
        if (selectedHeaderData["imgDropDown"] === "dropdown_expand.png") {
          selectedHeaderData["imgDropDown"] = "dropdown_collapse.png";
          data[sectionIndex][1] = this.segViewDetailsTempData[sectionIndex][1];
          //selectedHeaderData["flxSeparator2"].isVisible = true;
          this.view.segAmendmentViewDetails.setData(data);
        } else {
          selectedHeaderData["imgDropDown"] = "dropdown_expand.png";
          data[sectionIndex][1] = [];
          //selectedHeaderData["flxSeparator2"].isVisible = false;
          this.view.segAmendmentViewDetails.setData(data);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "onActionClick",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },

    /**
     * @api : selectAcceptOrReject
     * Triggerd on click of accept or reject option
     * @return : NA
     */
    selectAcceptOrReject: function(param) {
      var scope = this;
      if (param === "accept") {
        this.view.imgAcceptRadio.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
        this.view.imgRejectRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
        this.view.txtReasonForSelfRejection.text = "";
        this.view.txtMessageToBank.text = "";
        this.view.flxOtherDetails.setVisibility(false);
        this.enableOrDisableButton(scope.view.btnSubmitConsent, true);
      } else {
        this.view.imgAcceptRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
        this.view.imgRejectRadio.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
        this.view.flxOtherDetails.setVisibility(true);
        this.enableOrDisableButton(scope.view.btnSubmitConsent, false);
      }
    },

    /**
     * @api : submitAmendment
     * Triggerd on click of submit Consent
     * @return : NA
     */
    submitAmendment: function() {
      var scope = this;
      try {
        var payLoad = {
          "amendmentSrmsId": lcData.amendmentSrmsId,
          "selfAcceptance": scope.view.imgAcceptRadio.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE ? ACCEPTED : REJECTED,
          "reasonForSelfRejection": scope.view.txtReasonForSelfRejection.text,
          "messageToBank": scope.view.txtMessageToBank.text
        }
        lcData.selfAcceptance = scope.view.imgAcceptRadio.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE ? ACCEPTED : REJECTED;
        scope.presenter.submitConsent(payLoad, "frmReceivedGuaranteeAmendment");
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "submitAmendment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : enableOrDisableButton
     * enable or disable skins for buttons.
     * @return : NA
     */
    enableOrDisableButton: function(btnRef, flag) {
      btnRef.setEnabled(flag);
      flag ? btnRef.skin = "ICSknbtnEnabed003e7536px" : btnRef.skin = "ICSknbtnDisablede2e9f036px";
    },
    renderPrintAndDownload: function () {
      var scope = this;
      try {
        scope.view.segVerticalDropdownEllipsis.widgetDataMap = {
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
          if (lcData.status.toLowerCase() === (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.APPROVED).toLowerCase()) {
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
            lcData,
            previousFormName: 'frmReceivedGuaranteeAmendment'
          }
          formNameForPrint = 'frmPrintReceivedGuaranteeAmendments';
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": `GuaranteesReceivedUIModule/${formNameForPrint}`
          }).navigate(dataObj);
        } else if (id == "download") {
          scope.presenter.generateGuaranteesReceivedAmendments({
            "amendmentSrmsId": lcData.amendmentSrmsId
          }, "frmReceivedGuaranteeAmendment");
        } else if (id == 'raiseQuery') {
          let record = lcData;
          let queryObj = {};
          let formatUtilManager = applicationManager.getFormatUtilManager();
          let benName = JSON.parse(record.beneficiaryDetails.replace(/'/g, '"'))[0].beneficiaryName;
          queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${record.amendmentSrmsId}`;
          queryObj.descriptionObj = {};
          record.amount && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.konybb.Common.Amount")] = record.amount ? formatUtilManager.formatAmountandAppendCurrencySymbol(record.amount) : NA);
          record.lcType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc")] = record.lcType);
          benName && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.applicantName")] = benName);
          record.productType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.productType")] = record.productType);
          record.expectedIssueDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate")] = record.expectedIssueDate ? CommonUtilities.getDateAndTimeInUTC(record.expectedIssueDate).substr(0, 10) : NA);
          queryObj.tradeModule = true;
          scope.presenter.showMessagesScreen(queryObj);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "onPrintAndDownloadRowClick",
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
        if (lcData.hasOwnProperty('PaymentAdvices')) {
          paymentAdvices = lcData.PaymentAdvices;
          paymentAdvicesLength = paymentAdvices.length;
        }
        if (lcData.hasOwnProperty('SwiftMessages')) {
          swiftMessages = lcData.SwiftMessages;
          swiftMessagesLength = swiftMessages.length;
        }

        swiftAndAdviceRecords = [...paymentAdvices, ...swiftMessages];
        if (swiftMessagesLength > 0 || paymentAdvicesLength > 0) {
          scope.view.flxSwiftAndAdvicesParent.setVisibility(true);
          scope.view.btnSwiftAndAdvices.cursorType = "pointer";
          scope.view.btnSwiftAndAdvices.text = kony.i18n.getLocalizedString("i18n.ImportLC.SwiftsAdvices") + "(" + (swiftMessagesLength + paymentAdvicesLength) + ")";
          scope.view.btnSwiftAndAdvices.onClick = scope.renderSwiftAndAdviceOptions.bind(scope, swiftAndAdviceRecords);
        } else {
          scope.view.flxSwiftAndAdvicesParent.setVisibility(false);
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
        scope.view.flxSwiftAndAdvices.setVisibility(!scope.view.flxSwiftAndAdvices.isVisible);
        scope.view.segSwiftAndAdvices.widgetDataMap = { lblValue: "lblValue" };

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
        scope.view.segSwiftAndAdvices.setData(masterData);
        scope.view.segSwiftAndAdvices.onRowClick = this.onRowClickOfSwiftAndAdvices.bind(scope, swiftAndAdviceRecords);
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
        let currentSelectedRowIndex = this.view.segSwiftAndAdvices.selectedRowIndex[1]
        let selectedRecord = swiftAndAdviceRecords[currentSelectedRowIndex];
        let creditAmount = scope.presenter.getDynamicData(selectedRecord, 'creditedAmount');
        let chargesDebited = scope.presenter.getDynamicData(selectedRecord, 'charges');
        scope.view.flxSwiftAndAdvices.setVisibility(false);
        scope.view.flxDialogs.setVisibility(true);
        scope.view.flxSwiftDetailsPopup.setVisibility(false);
        scope.view.flxPaymentAdvicePopup.setVisibility(false);
        if (selectedRecord.hasOwnProperty('adviceName')) {
          // Payment Advice Logic
          scope.view.flxPaymentAdvicePopup.setVisibility(true);
          scope.view.flxDialogs.height = '100%';
          scope.view.lblPaymentAdviceBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice");
          // Configuring segments
          scope.view.segPaymentAdviceBank.widgetDataMap = { lblLeft1: "lblLeft1", lblRight1: "lblRight1" };
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
              lblRight1: creditAmount !== NA ? scope.presenter.getDynamicData(selectedRecord, 'currency') + " " + applicationManager.getFormatUtilManager().formatAmount(creditAmount) : NA
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.CreditedAccount', true),
              lblRight1: selectedRecord.creditedAccount ? CommonUtilities.getMaskedAccName(selectedRecord.creditedAccount)[0] : NA
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.ChargesDebited', true),
              lblRight1: chargesDebited !== NA ? scope.presenter.getDynamicData(selectedRecord, 'currency') + " " + applicationManager.getFormatUtilManager().formatAmount(chargesDebited) : NA
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
          scope.view.segPaymentAdviceBank.setData(masterData);
          scope.view.flxSearchClose.cursorType = "pointer";
          scope.view.flxSearchClose.onClick = scope.closePopup.bind(scope, 'flxPaymentAdvicePopup');
        } else {
          // Swift MT popup logic
          scope.view.flxSwiftDetailsPopup.setVisibility(true);
          scope.view.flxDialogs.height = "475%";
          scope.view.flxCross.cursorType = 'pointer';
          scope.view.flxCross.onClick = scope.closePopup;
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
    renderSwiftMTPopup: function (swiftData) {
      var scope = this;
      try {
        scope.view.lblSwiftMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.swiftMT") + " (" + scope.presenter.getConvertedDate(swiftData, 'createdDate') + ")";        
        scope.view.lblSwiftMessageHeading.text = SWIFT_MESSAGE_HEADER;
        scope.view.lblSwiftMessageDetails.text = SWIFT_MESSAGE_DETAILS;
        scope.view.lblSwiftMessageFooter.text = SWIFT_MESSAGE_FOOTER;
        scope.view.segSwiftPrimaryDetails.widgetDataMap = { lblSwiftDetailsKey: "lblSwiftDetailsKey" };
        let headerMasterData = [
          {
            lblSwiftDetailsKey: scope.parseTheData(swiftData.bCode, HEADER)
          },
          {
            lblSwiftDetailsKey: scope.parseTheData(swiftData.bic, HEADER)
          },
          {
            lblSwiftDetailsKey: scope.parseTheData(swiftData.transferDateOrTime, HEADER)
          },
          {
            lblSwiftDetailsKey: scope.parseTheData(swiftData.type, HEADER)
          }
        ];
        scope.view.segSwiftPrimaryDetails.setData(headerMasterData);

        this.view.segSwiftDetails.widgetDataMap = { lblSwiftDetailsKey: "lblSwiftDetailsKey", lblSwiftDetailsValue: "lblSwiftDetailsValue" };
        let swiftKeys = Object.keys(swiftData);
        let masterData = [];
        masterData.push(
          {
            lblSwiftDetailsKey: 'MESSAGE BODY',
            lblSwiftDetailsValue: '',
          }
        );
        swiftKeys.map(item => {
          if (swiftKeys !== 'bCode' || swiftKeys !== 'bic' || swiftKeys !== 'transferDateOrTime' || swiftKeys !== 'type' || swiftKeys !== 'createdDate') {
              masterData.push(
                {
                  lblSwiftDetailsKey: scope.parseTheData(swiftData[item], SWIFT_TAG),
                  lblSwiftDetailsValue: scope.parseTheData(swiftData[item])
                }
              );
          }
        });

        scope.view.segSwiftDetails.setData(masterData);
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
        partialResponse = JSON.parse(partialResponse.replace(/'/g, "\""));
        if (renderType === HEADER) {
          return  partialResponse.fieldName + ": " + partialResponse.fieldValue;
        } else if (renderType === SWIFT_TAG) {
          return  partialResponse.swiftTag + ": " + partialResponse.fieldName;
        }
        return partialResponse.fieldValue;
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
        scope.view.flxDialogs.setVisibility(false);
        scope.view[popupFlexName].setVisibility(false);
      } catch (err) {
        var errorObj = {
          "method": "closePopup",
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