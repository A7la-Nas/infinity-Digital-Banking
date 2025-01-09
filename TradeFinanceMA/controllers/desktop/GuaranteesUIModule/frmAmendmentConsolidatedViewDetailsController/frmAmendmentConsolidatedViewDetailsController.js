define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let amendmentDetails;
  this.lcDetails;
  let formatUtil = applicationManager.getFormatUtilManager();
  let selectedRecord = [];
  this.serviceParameters = {
    "searchString": "",
    "pageSize": "",
    "pageOffset": "",
    "sortByParam": "amendmentNo",
    "sortOrder": "DESC",
    "timeParam": "",
    "timeValue": "6,MONTH",
    "filterByValue": "",
    "filterByParam": "guaranteesSRMSId"
  };
  return {
    onNavigate: function(record) {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
      serviceParameters.filterByValue = record.guaranteesSRMSId;
      lcDetails = record;
    },
    preShow: function() {
      var scope = this;
      try {
        scope.initButtonActions();
        this.guaranteesPresenter = applicationManager.getModulesPresentationController({
          appName: 'TradeFinanceMA',
          moduleName: 'GuaranteesUIModule'
        });
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentConsolidatedViewDetailsController",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    postShow: function() {
      var scope = this;
      try {
        FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        scope.view.customheadernew.forceCloseHamburger();
        scope.view.customheadernew.activateMenu("TradeFinance", "Exports");
        this.view.flxDialogs.height = kony.os.deviceInfo().screenHeight + 120 + "dp";
        this.guaranteesPresenter.getGuaranteeAmendments(serviceParameters, "frmAmendmentConsolidatedViewDetails");
        scope.seti18nkeys();
        scope.setGuaranteeDetails();
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentConsolidatedViewDetailsController",
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
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentConsolidatedViewDetailsController",
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
    updateFormUI: function(viewModel) {
      var scope = this;
      try {
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
        if (viewModel.GuaranteeLCAmendments) {
          scope.amendmentDetails = viewModel.GuaranteeLCAmendments;
          scope.setAmendmentConsolidatedData(scope.amendmentDetails);
        }
        if (viewModel.AmendmentHistory && viewModel.amendmentSRMSRequestId) {
            selectedRecord = viewModel;
            selectedRecord["LCDetails"] = lcDetails;
            new kony.mvc.Navigation({
                "appName": "TradeFinanceMA",
                friendlyName: "GuaranteesUIModule/frmViewAmendmentDetails"
            }).navigate(selectedRecord);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentConsolidatedViewDetailsController",
          "method": "updateFormUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    initButtonActions: function() {
      var scope = this;
      try {
        scope.view.btnBack.onClick = scope.navigateBack.bind(this);
        scope.view.btnViewDetails.onClick = scope.togglepPopUp.bind(this, "flxViewSBLCDetailsPopup", true);
        scope.view.flxCrossSBLC.onClick = scope.togglepPopUp.bind(this, "flxViewSBLCDetailsPopup", false);
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentConsolidatedViewDetailsController",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    seti18nkeys: function () {
      var scope = this;
      try {
        scope.view.lblBeneficiaryDetailsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryDetails") + ":";
        scope.view.lblTransRefKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef")+ ":";
        scope.view.lblProductTypeKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.productType")+ ":";
        scope.view.lblBillTypeKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.gtAndSlbcWithColon");
        scope.view.lblAmountKey.text = kony.i18n.getLocalizedString("i18n.ChequeManagement.Amount");
        scope.view.lblIssueDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate")+ ":";
        scope.view.lblExpiryTypeKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType")+ ":";
        scope.view.lblExpiryDateKey.text = kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate")+ ":";
        scope.view.lblInstructingPartyKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty")+ ":";
        scope.view.lblApplicantPartyKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ApplicantParty")+ ":";
      }
      catch (err) {
        var errorObj = {
          "level": "frmAmendmentConsolidatedViewDetailsController",
          "method": "seti18nkeys",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    /**
         * @api : togglepPopUp
         * This function handles popup visibility
         * @return : NA
         */
    togglepPopUp: function (popUpID, visibility) {
      var scope = this;
      try {
        if(visibility === undefined) {
          scope.view.flxDialogs.setVisibility(false);
          scope.view.flxViewSBLCDetailsPopup.setVisibility(false);
        }
        else {
          scope.view.flxDialogs.setVisibility(visibility);
          scope.view[popUpID].setVisibility(visibility);
          scope.view.flxViewSBLCDetailsPopup.height = "330%";
        }              
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentConsolidatedViewDetailsController",
          "method": "togglepPopUp",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    setGuaranteeDetails: function () {
      var scope = this;
      try {
        scope.view.lblBeneficiaryDetailsValue.text = lcDetails.beneficiaryName ? lcDetails.beneficiaryName : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblTransRefValue.text = lcDetails.guaranteesReference ? lcDetails.guaranteesReference : lcDetails.guaranteesSRMSId ? lcDetails.guaranteesSRMSId :kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblProductTypeValue.text = lcDetails.productType ? lcDetails.productType : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblBillTypeValue.text = lcDetails.guaranteeAndSBLCType ? lcDetails.guaranteeAndSBLCType : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblAmountValue.text = lcDetails.amount ? formatUtil.formatAmountandAppendCurrencySymbol( lcDetails.amount, lcDetails.currency) : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblIssueDateValue.text = lcDetails.issueDate ?  CommonUtilities.getDateAndTimeInUTC(lcDetails.issueDate).substr(0,10) : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblExpiryTypeValue.text = lcDetails.expiryType ? lcDetails.expiryType : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblExpiryDateValue.text = lcDetails.expiryDate ? CommonUtilities.getDateAndTimeInUTC(lcDetails.expiryDate).substr(0,10) : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblInstructingPartyValue.text = typeof(lcDetails.instructingParty) === "string" ? lcDetails.instructingParty:  JSON.parse(lcDetails.instructingParty.replace(/'/g, "\""))[0].contractId ?  JSON.parse(lcDetails.instructingParty.replace(/'/g, "\""))[0].contractId : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblApplicantPartyValue.text = lcDetails.applicantParty ? lcDetails.applicantParty : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.GuaranteeDetails.setContext(lcDetails);
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "setGuaranteeDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    navigateBack: function() {
      lcDetails.flowType = "Amendments";
      new kony.mvc.Navigation({
        "appName": "TradeFinanceMA",
        "friendlyName": "GuaranteesUIModule/frmGuaranteesLCDetails"
      }).navigate(lcDetails);
    },

    setsegAmdConsolidatedWidgetDataMap: function (segName) {
      var scope = this;
      try {
        var breakpoint = kony.application.getCurrentBreakpoint();
        var orientationHandler = new OrientationHandler();
        if (breakpoint === 1024 || orientationHandler.isTablet) {
          scope.view[segName].rowTemplate = "flxAmendmentConsolidated";
        } else {
          scope.view[segName].rowTemplate = "flxAmendmentConsolidated";
        }
        scope.view.segAmendmentConsolidated.widgetDataMap = {
          "flxHeader": "flxHeader",
          "flxAmendmentDetails": "flxAmendmentDetails",
          "flxAmendmentDetailsSep": "flxAmendmentDetailsSep",
          "flxAmendmentRequestedContent": "flxAmendmentRequestedContent",
          "flxBootomSpace": "flxBootomSpace",
          "lblAmendmentHeader": "lblAmendmentHeader",
          "flxAmendmentHeaderSep": "flxAmendmentHeaderSep",
          "flxAmdHeaderDropdown": "flxAmdHeaderDropdown",
          "imgAmdHeaderDropdown": "imgAmdHeaderDropdown",
          "flxStatus": "flxStatus",
          "flxStatusKey": "flxStatusKey",
          "lblStatusKey": "lblStatusKey",
          "lblStatusValue": "lblStatusValue",
          "flxStatusValue": "flxStatusValue",
          "flxReasonsForReturned": "flxReasonsForReturned",
          "flxReasonsForReturnedKey": "flxReasonsForReturnedKey",
          "lblReasonsForReturnedValue": "lblReasonsForReturnedValue",
          "flxReasonsForReturnedValue": "flxReasonsForReturnedValue",
          "lblReasonsForReturnedValue": "lblReasonsForReturnedValue",
          "flxRequestedDate": "flxRequestedDate",
          "flxRequestedDateKey": "flxRequestedDateKey",
          "lblRequestedDateKey": "lblRequestedDateKey",
          "flxRequestedDateValue": "flxRequestedDateValue",
          "lblRequestedDateValue": "lblRequestedDateValue",
          "flxAmendmentRef": "flxAmendmentRef",
          "flxAmendmentRefKey": "flxAmendmentRefKey",
          "lblAmendmentRefKey": "lblAmendmentRefKey",
          "flxAmendmentRefValue": "flxAmendmentRefValue",
          "lblAmendmentRefValue": "lblAmendmentRefValue",
          "flxAmendmentReqHeader": "flxAmendmentReqHeader",
          "flxAmendmentReqHeaderSep": "flxAmendmentReqHeaderSep",
          "flxAmdReqDropdown": "flxAmdReqDropdown",
          "imgAmdReqDropdown": "imgAmdReqDropdown",
          "flxAmendmentRequested": "flxAmendmentRequested",
          "lblAmendEffDateKey": "lblAmendEffDateKey",
          "lblAmendmentEffDateValue": "lblAmendmentEffDateValue",
          "lblAmountKey": "lblAmountKey",
          "lblAmountValue": "lblAmountValue",
          "lblExpiryTypeKey": "lblExpiryTypeKey",
          "lblExpiryTypeValue": "lblExpiryTypeValue",
          "lblBeneficiaryDetailsKey": "lblBeneficiaryDetailsKey",
          "lblBeneficiaryDetailsValue": "lblBeneficiaryDetailsValue",
          "lblAmendDetailsKey": "lblAmendDetailsKey",
          "lblAmendDetailsValue": "lblAmendDetailsValue",
          "lblMsgResponseBankKey": "lblMsgResponseBankKey",
          "lblMsgResponseBankValue": "lblMsgResponseBankValue",
          "flxBtnViewDetailsRespond": "flxBtnViewDetailsRespond",
          "btnViewDetailsRespond": "btnViewDetailsRespond",
          "lblRequestedDataValue": "lblRequestedDataValue",
          "flxReasonForReturned": "flxReasonForReturned",
          "lblReviewLeft": "lblReviewLeft",
          "lblDocumentName": "lblDocumentName",
          "flxReviewUploadDocumentsRowTemplate": "flxReviewUploadDocumentsRowTemplate",
          "flxreviewRows": "flxreviewRows",
          "flxHeader": "flxHeader",
          "flxAmendDetails": "flxAmendDetails",
          "flxAmendmentDetailSep": "flxAmendmentDetailSep",
          "flxAmendmentReqHeader": "flxAmendmentReqHeader",
          "flxAmendEffDate": "flxAmendEffDate",
          "flxAmount": "flxAmount",
          "flxExpiryType": "flxExpiryType",
          "lblReviewLeft": "lblReviewLeft",
          "flxBottom": "flxBottom",
          "flxBottomSpace": "flxBottomSpace",
          "flxDocument": "flxDocument",
          "flxReasonForReturnedKey": "flxReasonForReturnedKey",
          "flxAmendmentDetails": "flxAmendmentDetails",
          "flxAmendEffDateKey": "flxAmendEffDateKey",
          "flxAmendEffDateValue": "flxAmendEffDateValue",
          "flxBeneficiaryDetailsKey": "flxBeneficiaryDetailsKey",
          "flxAmendmentEffDate": "flxAmendmentEffDate",
          "imgDownloadIcon": "imgDownloadIcon",
          "flxMsgResponseBank": "flxMsgResponseBank",
          "flxBeneficiaryDetails": "flxBeneficiaryDetails",
          "flxMain": "flxMain",
          "lblRequestedDataKey": "lblRequestedDataKey",
          "flxDownloadImage": "flxDownloadImage",
        };
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentConsolidatedViewDetailsController",
          "method": "setsegAmdConsolidatedWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setAmendmentConsolidatedData: function (amendmentData) {
      var scope = this;
      try {
        let docData;
        let amendData;
        let data;
        var docDetails;
        var beneficiaryDetails = JSON.parse(lcDetails.beneficiaryDetails.replace(/'/g, "\""))[0];
        scope.setsegAmdConsolidatedWidgetDataMap("segAmendmentConsolidated");
        const NA = kony.i18n.getLocalizedString("i18n.common.NA");
        let consolidatedAmendmentDetails = [];
        for (const amendmentDetails of amendmentData) {
          consolidatedAmendmentDetails.push(Object.assign(amendmentDetails, {
            "imgAmdHeaderDropdown": {
              "src": "dropdown_collapse.png"
            },
            "imgAmdReqDropdown": {
              "src": "dropdown_collapse.png"
            },
            "lblAmendmentHeader": {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.Amendment") + " " + amendmentDetails.amendmentNo
            },
            "lblStatusKey": {
              "text": kony.i18n.getLocalizedString("i18n.billPay.Status") + ":"
            },
            "lblStatusValue": {
              "text": amendmentDetails.amendStatus ? amendmentDetails.amendStatus : NA
            },
            "lblReasonForReturnedKey": {
              "isVisible": amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() || amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK).toLowerCase() ? true : false,
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForReturned") + ":"
            },
            "lblReasonForReturnedKey": {
              "isVisible": amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() || amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK).toLowerCase() ? true : false,
              "text": amendmentDetails.reasonForReturned ? amendmentDetails.reasonForReturned : NA
            },
            "lblRequestedDataKey": {
              "text": kony.i18n.getLocalizedString("i18n.serviceRequests.RequestedDate") + ":"
            },
            "lblRequestedDataValue": {
              "text": amendmentDetails.amendRequestedDate ? CommonUtilities.getDateAndTimeInUTC(amendmentDetails.amendRequestedDate).substr(0, 10) : NA
            },
            "lblAmendmentRefKey": {
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentReference") + ":"
            },
            "lblAmendmentRefValue": {
              "isVisible": true,
              "text": amendmentDetails.amendmentReference ? amendmentDetails.amendmentReference : NA
            },
            "lblAmendmentReqHeader": {
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.amendmentRequested")
            },
            "lblAmendEffDateKey": {
              "isVisible": true,
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentEffectiveDate") + ":"
            },
            "lblAmendmentEffDateValue": {
              "isVisible": true,
              "text": amendmentDetails.amendmentEffectiveDate ? CommonUtilities.getDateAndTimeInUTC(amendmentDetails.amendmentEffectiveDate).substr(0, 10) : NA
            },
            "lblAmountKey": {
              "text": kony.i18n.getLocalizedString("i18n.wealth.amount") + ":"
            },
            "lblAmountValue": {
              "text": amendmentDetails.amendAmount ? formatUtil.formatAmountandAppendCurrencySymbol(amendmentDetails.amendAmount, amendmentDetails.currency) : NA
            },
            "lblExpiryTypeKey": {
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType") + ":"
            },
            "lblExpiryTypeValue": {
              "text": amendmentDetails.amendExpiryType ? amendmentDetails.amendExpiryType : NA
            },
            "lblBeneficiaryDetailsKey": {
              "isVisible": true,
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryDetails") + ":"
            },
            "lblBeneficiaryDetailsValue": {
              "isVisible": true,
              "text": (beneficiaryDetails.beneficiaryName ? beneficiaryDetails.beneficiaryName : "")
                + (beneficiaryDetails.address1 ? "\n" + beneficiaryDetails.address1 : "")
                + (beneficiaryDetails.address2 ? "\n" + beneficiaryDetails.address2 : "")
                + (beneficiaryDetails.city ? "\n" + beneficiaryDetails.city : "")
                + (beneficiaryDetails.state ? "\n" + beneficiaryDetails.state : "")
                + (beneficiaryDetails.zipcode ? "\n" + beneficiaryDetails.zipcode : "")
                + (beneficiaryDetails.country ? "\n" + beneficiaryDetails.country : "")
            },
            "flxReasonForReturned": {
              "isVisible":amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() || amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK).toLowerCase() ? true : false
            },
            "flxAmdHeaderDropdown": {
              "onClick": scope.toggleAmendmentDetailsVisibility.bind(this, "flxAmdHeaderDropdown", "imgAmdHeaderDropdown")
            },
            "flxAmendmentDetails": {
              "isVisible": true
            },
            "flxAmendmentRequested": {
              "isVisible": true
            },
            "flxAmendmentHeaderSep": {
              "isVisible": true
            },
            "flxAmendmentReqHeaderSep": {
              "isVisible": true
            },
            "flxAmendmentDetailsSep": {
              "isVisible": true
            },
            "lblAmendDetailsKey": {
              "isVisible": true,
              "text": "Other Amendments" + ":"
            },
            "lblAmendDetailsValue": {
              "isVisible": true,
              "text": amendmentDetails.amendDetails ? amendmentDetails.amendDetails : NA
            },
            "lblMsgResponseBankKey": {
              "isVisible": true,
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentCharges")
            },
            "lblMsgResponseBankValue": {
              "isVisible": true,
              "text": amendmentDetails.amendmentCharges ? amendmentDetails.amendmentCharges : NA
            },
            "flxBtnViewDetailsRespond": {
              "isVisible": false
            },
            "btnViewDetailsRespond": {
              "isVisible": false
            },
            "flxBottomSpace": {
              "isVisible": false
            },
            "flxAmendDetails": {
              "isVisible": true
            },
            "flxMsgResponseBank": {
              "isVisible": false
            },
            "flxBtnViewDetailsRespond": {
              "isVisible": false
            },
            "flxBottom": {
              "isVisible": false
            },
            "flxAmdReqDropdown": {
              "onClick": scope.toggleAmendmentDetailsVisibility.bind(this, "flxAmdReqDropdown", "imgAmdReqDropdown")
            }
          }))
          docDetails = kony.sdk.isNullOrUndefined(amendmentDetails.supportingDocument) ? NA : (JSON.parse(amendmentDetails.supportingDocument.replace(/'/g, "\""))),
          docData = docDetails === NA ? [{ documentName: NA }] : docDetails;
          for (var j = 0; j < docData.length; j++) {
            consolidatedAmendmentDetails.push({
              flxreviewRows: {
                skin: "slFboxffffff",
                left: "0%",
                top: "0dp",
                height: "40dp"
              },
              lblReviewLeft: {
                text: j === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocuments") + ":" : "",
                left: "21dp",
                top: "20dp",
                height: "20dp",
                isVisible: true
              },
              imgDownloadIcon: {
                "isVisible": docData[j] === NA ? false : true
              },
              flxDocument: {
                left: "294dp",
                height: "20dp",
                top: "15dp",
              },
              flxDownloadImage: {
                width: "25dp",
                height: "25dp",
                isVisible: docData[j] === NA ? false : true
              },
              lblDocumentName: {
                text: docData[j],
                left: docData[j] === NA ? "0dp" : "10dp",
                skin: docData[j] !== NA ? "bbSknLblSSP4176A415Px" : "ICSknLbl42424215PX"
              },
              template: "flxReviewUploadDocumentsRowTemplate"
            })
          }
          amendData = {
            "flxAmendmentEffDate": {
              "isVisible": false
            },
            "flxAmendmentDetails": {
              "isVisible": false
            },
            "flxHeader": {
              "isVisible": false
            },
            "flxAmendDetails": {
              "isVisible": false
            },
            "flxAmendmentDetailSep": {
              "isVisible": false
            },
            "flxAmendmentReqHeader": {
              "isVisible": false
            },
            "flxAmendEffDate": {
              "isVisible": false
            },
            "flxAmount": {
              "isVisible": false
            },
            "flxExpiryType": {
              "isVisible": false
            },
            "flxAmendEffDateKey": {
              "isVisible": false
            },
            "flxAmendEffDateValue": {
              "isVisible": true
            },
            "flxBeneficiaryDetailsKey": {
              "isVisible": false
            },
            "flxBeneficiaryDetailsValue": {
              "isVisible": false
            },
            "lblStatusKey": {
              "isVisible": false
            },
            "flxAmendmentDetailsSep": {
              "isVisible": false
            },
            "lblStatusValue": {
              "isVisible": false
            },
            "flxReasonForReturnedKey": {
              "isVisible": false
            },
            "lblReasonForReturnedKey": {
              "isVisible": false
            },
            "lblReasonForReturnedKey": {
              "isVisible": false
            },
            "lblRequestedDataKey": {
              "isVisible": false
            },
            "lblRequestedDataValue": {
              "isVisible": false
            },
            "lblAmendmentRefKey": {
              "isVisible": false
            },
            "lblAmendmentRefValue": {
              "isVisible": false
            },
            "lblAmendmentReqHeader": {
              "isVisible": false
            },
            "lblAmendEffDateKey": {
              "isVisible": false
            },
            "lblAmendmentEffDateValue": {
              "isVisible": false
            },
            "lblAmountKey": {
              "isVisible": false
            },
            "lblAmountValue": {
              "isVisible": false
            },
            "lblExpiryTypeKey": {
              "isVisible": false
            },
            "lblExpiryTypeValue": {
              "isVisible": false
            },
            "lblBeneficiaryDetailsKey": {
              "isVisible": false
            },
            "lblBeneficiaryDetailsValue": {
              "isVisible": false
            },
            "lblAmendDetailsKey": {
              "isVisible": false
            },
            "lblAmendDetailsValue": {
              "isVisible": false
            },
            "flxBeneficiaryDetails": { top: "0dp" },
            "flxMsgResponseBank": { top: "0dp" },
            "lblMsgResponseBankKey": {
              "isVisible": true,
              "text":  kony.i18n.getLocalizedString("i18n.TradeFinance.MessageOrResponseToBank") + ":"
            },
            "lblMsgResponseBankValue": {
              "isVisible": true,
              "text": amendmentDetails.messageToBank ? amendmentDetails.messageToBank : NA
            },
            "flxBtnViewDetailsRespond": {
              "isVisible": amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() || amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK).toLowerCase() ? true : false
            },
            "btnViewDetailsRespond": {
              "isVisible": amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() || amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK).toLowerCase() ? true : false,
              "onClick": function(){
                  scope.navigateToDetails(amendmentDetails.amendmentSRMSRequestId);
              }
            },
            template: "flxAmendmentConsolidated"
          }
          consolidatedAmendmentDetails.push(amendData);
        }
        scope.view.segAmendmentConsolidated.setData(consolidatedAmendmentDetails);
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentConsolidatedViewDetailsController",
          "method": "setAmendmentConsolidatedData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    navigateToDetails: function(amendSRMSID){
      var scope = this;
      try{
          scope.guaranteesPresenter.getGuaranteeAmendmentsById({
              "amendmentSRMSRequestId": amendSRMSID
            }, "frmAmendmentConsolidatedViewDetails");
      }
      catch(err){
          var errorObj = {
              "level": "frmAmendmentConsolidatedViewDetailsController",
              "method": "navigateToDetails",
              "error": err
          };
      }
    },

    toggleAmendmentDetailsVisibility: function(flxName,imgName) {
      var scope = this;
      try {
        var data = scope.view.segAmendmentConsolidated.data;
        var index = scope.view.segAmendmentConsolidated.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        if(flxName === "flxAmdHeaderDropdown"){
          if(data[rowIndex][imgName].src === "dropdown_collapse.png"){
            data[rowIndex][imgName].src = "dropdown_expand.png"
            data[rowIndex].flxAmendmentDetails.isVisible = false;
            data[rowIndex].flxAmendmentHeaderSep.isVisible = false;
            data[rowIndex].flxAmendmentDetailsSep.top = "0dp";
          }
          else{
            data[rowIndex][imgName].src = "dropdown_collapse.png"
            data[rowIndex].flxAmendmentDetails.isVisible = true;
            data[rowIndex].flxAmendmentHeaderSep.isVisible = true;
            data[rowIndex].flxAmendmentDetailsSep.top = "31dp";
          }
        }

        if(flxName === "flxAmdReqDropdown"){
          if(data[rowIndex][imgName].src === "dropdown_collapse.png"){
            data[rowIndex][imgName].src = "dropdown_expand.png"
            data[rowIndex].flxAmendmentRequested.isVisible = false;
            data[rowIndex].flxAmendmentReqHeaderSep.isVisible = false;
          }
          else{
            data[rowIndex][imgName].src = "dropdown_collapse.png"
            data[rowIndex].flxAmendmentRequested.isVisible = true;
            data[rowIndex].flxAmendmentReqHeaderSep.isVisible = true;
          }
        }
        scope.view.segAmendmentConsolidated.setData(data, rowIndex);
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentConsolidatedViewDetailsController",
          "method": "toggleAmendmentDetailsVisibility",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    onError: function(err) {
      var error = err;
    }
  };
});

