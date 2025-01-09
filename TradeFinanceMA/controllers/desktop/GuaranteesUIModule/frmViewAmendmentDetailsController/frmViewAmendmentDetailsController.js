define("TradeFinanceMA/GuaranteesUIModule/userfrmViewAmendmentDetailsController", ['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let amendmentDetails = "";
  let regExpForCheckDateInString = /[\-\-]/g;
  let regExpForCheckArrayInString = /[\[\]]+/;
  let isTablet = false;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  return {
    /**
     * @api : init
     * This function for executing the lines of code only once
     * @return : NA
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
    },

    /**
     * @api : onNavigate
     * This function for executing the preShow and postShow
     * @return : NA
     */
    onNavigate: function (data) {
      this.presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeFinanceMA',
        'moduleName': 'GuaranteesUIModule'
      });
      //After data passing will remove this mock data from controller
      amendmentDetails = data ? data : {};
    },
    /**
     * @api : updateFormUI
     * This function to set UI when landing on screen.
     * @return : NA
     */
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
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
        if (this.presenter.isEmptyNullOrUndefined(amendmentDetails)) amendmentDetails = Object.assign(amendmentDetails, {LCDetails: this.presenter.guaranteeData}, this.presenter.amendmentData);
        scope.setDefaultUI();
        scope.setDetailsSegmentData();
        scope.setRequestDetailsData();
        scope.setLCDetails();
        scope.setReturnByBankData();
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
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
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
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
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          isTablet = true;
        } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
          isTablet = false;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
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
        scope.view.lblVerticalEllipsis.onTouchEnd = () => {
          if(scope.view.flxVerticalEllipsisDropdown.isVisible) {
              scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
          }
          else {
              scope.view.flxVerticalEllipsisDropdown.setVisibility(true);
          }
        };
        scope.view.flxVerticalEllipsisBody.onClick = this.renderPrintAndDownload.bind(this);
        let orientationHandler = new OrientationHandler();
        let breakpoint = kony.application.getCurrentBreakpoint();
        scope.view.btnBack.onClick = scope.buttonNavigation.bind(this, "Back");
        scope.view.btnReviseDetails.onClick = scope.buttonNavigation.bind(this, "Revise");
        scope.view.btnSwiftMessage.onClick = scope.showSwiftPopup.bind(this);
        scope.view.flxSearchClose.onClick = function () {
          scope.view.flxDialogs.setVisibility(false);
          scope.view.flxReturnByBankPopup.setVisibility(false);
        };
        scope.view.flxCross.onClick = function () {
          scope.view.flxDialogs.setVisibility(false);
          scope.view.flxSwiftDetailsPopup.setVisibility(false);
        };
        scope.view.flxCrossSBLC.onClick = function () {
          scope.view.flxDialogs.setVisibility(false);
          scope.view.flxDialogs.height = "250%"
          scope.view.flxViewSBLCDetailsPopup.setVisibility(false);
        };
        scope.view.btnViewDetails.onClick = scope.showSBLCPopup.bind(this);
        scope.view.btnViewHistory.onClick = scope.showReturnByBankPopup.bind(this);
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : buttonNavigation
     * This function for setting navigations of buttons
     * @return : NA
     */
    buttonNavigation: function (param) {
      this.navManager = applicationManager.getNavigationManager();
      let appName = "TradeFinanceMA";
      let formName = "";
      let data = {};
      switch (param) {
        case "Back": {
          formName = "frmGuaranteesLCDashboard";
          data.flowType = "Amendments";
          break;
        }
        case "Revise": {
          formName = "frmCreateAmendment";
          data = amendmentDetails;
          data.isReviseFlow = true;
          break;
        }
      }
      this.navManager.navigateTo({
        appName: "TradeFinanceMA",
        friendlyName: "GuaranteesUIModule" + "/" + formName
      }, false, data);
    },

    /**
     * @api : setDefaultUI
     * This function to set default UI when landing on screen.
     * @return : NA
     */
    setDefaultUI: function () {
      var scope = this;
      try {
        let titleText = amendmentDetails.amendmentReference ? amendmentDetails.amendmentReference : "";
        this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuedGTAndSBLC") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.Amendment") + " - " + titleText;
        this.view.flxDialogs.setVisibility(false);
        this.view.btnSwiftMessage.setVisibility(false);
        this.view.btnReviseDetails.setVisibility(true);
        this.view.flxViewSBLCDetailsPopup.setVisibility(false);
        this.view.btnViewHistory.setVisibility(false);
        this.view.lblAmendmentDetails.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentDetails");
        this.view.lblAmendmentRequested.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentsRequested");
        this.view.btnBack.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnBack");
        //this.view.btnReviseDetails.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllAmendments");;
        this.view.lblBeneficiaryDetailsKey.text = kony.i18n.getLocalizedString("kony.mb.TranfersEurope.BeneficiaryDetails") + ":";
        this.view.lblTransRefKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.transactionsRef") + ":";
        this.view.lblProductTypeKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.productTypeWithColon");
        this.view.lblBillTypeKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc") + ":";
        this.view.lblAmountKey.text = kony.i18n.getLocalizedString("kony.mb.common.Amount") + ":";
        this.view.lblIssueDateKey.text = kony.i18n.getLocalizedString("kony.mb.CM.issueDate") + ":";
        this.view.lblExpiryTypeKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.expiryTypeWithColon");
        this.view.lblExpiryDateKey.text = kony.i18n.getLocalizedString("i18n.Wealth.expiryDate");
        this.view.lblInstructingPartyKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.instructingPartyWithColon");
        this.view.lblApplicantPartyKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ApplicantParty") + ":";
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "setDefaultUI",
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
    showSBLCPopup: function () {
      var scope = this;
      try {
        this.view.flxDialogs.setVisibility(true);
        this.view.flxDialogs.height = "400%";
        this.view.flxSwiftDetailsPopup.setVisibility(false);
        this.view.flxReturnByBankPopup.setVisibility(false);
        this.view.flxViewSBLCDetailsPopup.setVisibility(true);
        this.setSBLCData();
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "showSBLCPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : showReturnByBankPopup
     * This function for showing the return by bank popup
     * @return : NA
     */
    showReturnByBankPopup: function () {
      var scope = this;
      try {
        this.view.lblReturnByBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnbyBankHistory") + "(" + Object.keys(amendmentDetails.AmendmentHistory[0]).length + ")";
        this.view.flxDialogs.setVisibility(true);
        this.view.flxSwiftDetailsPopup.setVisibility(false);
        this.view.flxViewSBLCDetailsPopup.setVisibility(false);
        this.view.flxReturnByBankPopup.setVisibility(true);
        this.setReturnByBankData()
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "showReturnByBankPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : showSwiftPopup
     * This function for showing the swift message popup
     * @return : NA
     */
    showSwiftPopup: function () {
      var scope = this;
      try {
        this.view.flxDialogs.setVisibility(true);
        this.view.flxSwiftDetailsPopup.setVisibility(true);
        this.view.flxReturnByBankPopup.setVisibility(false);
        this.view.flxViewSBLCDetailsPopup.setVisibility(false);
        this.setDataInSwiftPopup();
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "showSwiftPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setLCDetails
     * This function for setting LC details
     * @return : NA
     */
    setLCDetails: function () {
      var scope = this;
      try {
        let instructingPartyValue = regExpForCheckArrayInString.test(amendmentDetails.LCDetails.instructingParty) ? amendmentDetails.LCDetails.instructingParty.replace(/\[|\]/g, '') : amendmentDetails.LCDetails.instructingParty;
        this.view.lblBeneficiaryDetailsValue.text = amendmentDetails.LCDetails.beneficiaryName ? amendmentDetails.LCDetails.beneficiaryName : NA;
        this.view.lblTransRefValue.text = amendmentDetails.LCDetails.guaranteesSRMSId ? amendmentDetails.LCDetails.guaranteesSRMSId : NA;
        this.view.lblProductTypeValue.text = amendmentDetails.LCDetails.productType ? amendmentDetails.LCDetails.productType : NA;
        this.view.lblBillTypeValue.text = amendmentDetails.LCDetails.billType ? amendmentDetails.LCDetails.billType : NA;
        this.view.lblAmountValue.text = amendmentDetails.LCDetails.amount ? amendmentDetails.LCDetails.currency + " " + applicationManager.getFormatUtilManager().formatAmount(amendmentDetails.LCDetails.amount) : NA;
        this.view.lblIssueDateValue.text = amendmentDetails.LCDetails.issueDate ? amendmentDetails.LCDetails.issueDate : NA;
        this.view.lblExpiryTypeValue.text = amendmentDetails.LCDetails.expiryType ? amendmentDetails.LCDetails.expiryType : NA;
        this.view.lblExpiryDateValue.text = amendmentDetails.LCDetails.expiryDate ? amendmentDetails.LCDetails.expiryDate : NA;
        this.view.lblInstructingPartyValue.text = regExpForCheckArrayInString.test(amendmentDetails.LCDetails.instructingParty) ? JSON.parse(instructingPartyValue.replace(/\'/g, "\"")).contractId : amendmentDetails.LCDetails.instructingParty ? amendmentDetails.LCDetails.instructingParty : NA;
        this.view.lblApplicantPartyValue.text = amendmentDetails.LCDetails.applicantParty ? amendmentDetails.LCDetails.applicantParty : NA;
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "setLCDetails",
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
    setSBLCData: function () {
      var scope = this;
      let param = {
        data: amendmentDetails.LCDetails
      };
      try {
        scope.view.GuaranteeDetails.setContext(param);
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "setSBLCData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setReturnByBankData
     * This function for setting data in returnByBank popup
     * @return : NA
     */
    setReturnByBankData: function () {
      var scope = this;
      scope.view.lblReturnByBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedByBankHistory") + "(" + Object.keys(amendmentDetails.AmendmentHistory[0]).length+ ")";
      try {
        scope.setSegAmendmentWidgetDataMap("segReturnByBank");
        let amendHistory = amendmentDetails.AmendmentHistory[0];
        let totalHistory = Object.keys(amendHistory).length;
        let ReturnedByBankData = [];
        for (let i = 1; i <= totalHistory; i++) {
          let rejectedDate = JSON.parse(amendHistory['amendmentHistory' + i].replace(/'/g, "\"")).rejectedDate ? JSON.parse(amendHistory['amendmentHistory' + i].replace(/'/g, "\"")).rejectedDate : "";
          let data = {
            lblReturnBank: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank") + "(" + i + ")"
            },
            lblReturnDate: {
              text: rejectedDate ? `${ applicationManager.getFormatUtilManager().getFormattedCalendarDate(rejectedDate)}, ${new Date(rejectedDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}` : NA,
            },
            lblReasonReturn: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForReturned")
            },
            lblRightValue: {
              text: JSON.parse(amendHistory['amendmentHistory' + i].replace(/'/g, "\"")).ReasonforReturned ? JSON.parse(amendHistory['amendmentHistory' + i].replace(/'/g, "\"")).ReasonforReturned : NA
            },
            lblReasonReturn02: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnMessagetoBank")
            },
            lblRightValue02: {
              text: JSON.parse(amendHistory['amendmentHistory' + i].replace(/'/g, "\"")).ReturnMessageToBank ? JSON.parse(amendHistory['amendmentHistory' + i].replace(/'/g, "\"")).ReturnMessageToBank : NA
            },
            lblReasonReturn03: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.CorporateUserName")
            },
            lblRightValue03: {
              text: JSON.parse(amendHistory['amendmentHistory' + i].replace(/'/g, "\"")).CorporatorName ? JSON.parse(amendHistory['amendmentHistory' + i].replace(/'/g, "\"")).CorporatorName : NA
            },
            flxSeparatorReturnTop03: {
              isVisible: true
            },
            template: "flxReturnedByBank"
          }
          ReturnedByBankData.push(data);
        }
        scope.view.segReturnByBank.setData(ReturnedByBankData);
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "setReturnByBankData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setDataInSwiftPopup
     * This function for setting data in swift message popup
     * @return : NA
     */
    setDataInSwiftPopup: function () {
      var scope = this;
      try {
        scope.setSegAmendmentWidgetDataMap("segSwiftDetails");
        let swiftDetails = [{
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.sender") + ":"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.SwiftsAndAdvices[0]) || amendmentDetails.SwiftsAndAdvices[0] === "" ? NA : amendmentDetails.SwiftsAndAdvices[0].sender
          }
        }, {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.ExportLC.MessageType") + ":"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.SwiftsAndAdvices[0]) || amendmentDetails.SwiftsAndAdvices[0] === "" ? NA : amendmentDetails.SwiftsAndAdvices[0].messageType
          }
        }, {
          lblReview: {
            text: "Delivery" + ":"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.SwiftsAndAdvices[0]) || amendmentDetails.SwiftsAndAdvices[0] === "" ? NA : amendmentDetails.SwiftsAndAdvices[0].receiver
          }
        }, {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TransfersEur.TransferReference") + "20:"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.SwiftsAndAdvices[0]) || amendmentDetails.SwiftsAndAdvices[0] === "" ? NA : amendmentDetails.SwiftsAndAdvices[0].transRefNo
          }
        }, {
          lblReview: {
            text: "Related Ref21:"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.SwiftsAndAdvices[0]) || amendmentDetails.SwiftsAndAdvices[0] === "" ? NA : amendmentDetails.SwiftsAndAdvices[0].relatedRef
          }
        }, {
          lblReview: {
            text: "Date of Msg Ack 30:"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.SwiftsAndAdvices[0]) || amendmentDetails.SwiftsAndAdvices[0] === "" ? NA : amendmentDetails.SwiftsAndAdvices[0].messageDate
          }
        }, {
          lblReview: {
            text: "Sender to Rec Info 72:"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.SwiftsAndAdvices[0]) || amendmentDetails.SwiftsAndAdvices[0] === "" ? NA : amendmentDetails.SwiftsAndAdvices[0].message
          }
        }];
        scope.view.segSwiftDetails.setData(swiftDetails);
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "setDataInSwiftPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setDetailsSegmentData
     * This function for setting data in Details Segment
     * @return : NA
     */
    setDetailsSegmentData: function () {
      var scope = this;
      try {
        this.view.lblStatusKey.text = kony.i18n.getLocalizedString("i18n.billPay.Status") + ":";
        this.view.lblStatusValue.text = !kony.sdk.isNullOrUndefined(amendmentDetails.amendStatus) && !kony.sdk.isNullOrUndefined(amendmentDetails.historyCount) ? amendmentDetails.amendStatus.toLowerCase() !== (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() ? amendmentDetails.amendStatus + " (" + amendmentDetails.historyCount + scope.ordinal(parseInt(amendmentDetails.historyCount)) + ")" : amendmentDetails.amendStatus : amendmentDetails.amendStatus ? amendmentDetails.amendStatus : NA;
        if ((!kony.sdk.isNullOrUndefined(amendmentDetails.amendStatus)) && amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.APPROVED).toLowerCase() && (amendmentDetails.SwiftsAndAdvices.length > 0)) {
          this.view.btnSwiftMessage.setVisibility(true);
        }
        if (amendmentDetails.AmendmentHistory && amendmentDetails.historyCount > 1) {
          this.view.btnViewHistory.setVisibility(true);
          this.view.btnViewHistory.text = kony.i18n.getLocalizedString("i18n.TradeFinance.View") + " " + kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHistory") + " (" + Object.keys(amendmentDetails.AmendmentHistory[0]).length + ")";
      } else {
          this.view.btnViewHistory.setVisibility(false);
      }
      if (amendmentDetails.historyCount < 6 && amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK).toLowerCase()) {
          this.view.btnReviseDetails.setVisibility(true);
      } else {
          this.view.btnReviseDetails.setVisibility(false);
      }
        scope.setSegAmendmentWidgetDataMap("segAmendmentDetails");
        let segAmendmentDetails = [{
          lblReview: {
            text: amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() ? kony.i18n.getLocalizedString("i18n.TradeFinance.rejectedReason") + ":" : kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForReturned") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() ? amendmentDetails.rejectedReason ? amendmentDetails.rejectedReason : NA : amendmentDetails.reasonForReturned ? amendmentDetails.reasonForReturned : NA
          },
          flxreviewRows: {
            isVisible: amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() || amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK).toLowerCase() ? true : false
          }
        }, {
          lblReview: {
            text: amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() ? kony.i18n.getLocalizedString("i18n.TradeFinance.RejectedDate") + ":" : amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.APPROVED).toLowerCase() ? kony.i18n.getLocalizedString("i18n.TradeFinance.ApprovedDate") + ":" : NA
          },
          lblReviewValue1: {
            text: amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() ? amendmentDetails.rejectedDate ? CommonUtilities.getFrontendDateStringInUTC(amendmentDetails.rejectedDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")) : NA : amendmentDetails.approvedDate ? CommonUtilities.getFrontendDateStringInUTC(amendmentDetails.approvedDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")) : NA
          },
          flxreviewRows: {
            isVisible: amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.APPROVED).toLowerCase() || amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() ? true : false
          }
        }, {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNo") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.amendmentNo ? amendmentDetails.amendmentNo : NA
          }
        }, {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.serviceRequests.RequestedDate") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.amendRequestedDate ? CommonUtilities.getFrontendDateStringInUTC(amendmentDetails.amendRequestedDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")) : NA
          }
        }, {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentReference") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.amendmentReference ? amendmentDetails.amendmentReference : NA
          }
        }];
        scope.view.segAmendmentDetails.setData(segAmendmentDetails);
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "setDetailsSegmentData",
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
    setRequestDetailsData: function () {
      var scope = this;
      try {
        scope.setSegAmendmentWidgetDataMap("segAmendmentRequestedDetails");
        let amendmentRequestedDetails = [];
        var benDetails = kony.sdk.isNullOrUndefined(amendmentDetails.beneficiaryDetails) || amendmentDetails.beneficiaryDetails === "" ? "" : JSON.parse(amendmentDetails.beneficiaryDetails.replace(/'/g, "\""));
        var docDetails = kony.sdk.isNullOrUndefined(amendmentDetails.LCDetails.documentName) || amendmentDetails.LCDetails.documentName === "" ? "" : amendmentDetails.supportingDocument ?  JSON.parse(amendmentDetails.supportingDocument.replace(/'/g, '"')) : "";
        let amendDate = {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentEffectiveDate") + ":"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.amendmentEffectiveDate) || amendmentDetails.amendmentEffectiveDate === "" ? NA : regExpForCheckDateInString.test(amendmentDetails.amendmentEffectiveDate) ? CommonUtilities.getFrontendDateString(amendmentDetails.amendmentEffectiveDate, applicationManager.getConfigurationManager().frontendDateFormat) : amendmentDetails.amendmentEffectiveDate
          },
          template: "flxAmendRowTemplate"
        };
        let amount = {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.konybb.Common.Amount") + ":"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.amendAmount) || amendmentDetails.amendAmount === "" ? NA : applicationManager.getFormatUtilManager().appendCurrencySymbol(amendmentDetails.amendAmount,amendmentDetails.currency)
          },
          template: "flxAmendRowTemplate"
        };
        let expiryType = {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType") + ":"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.expiryType) || amendmentDetails.expiryType === "" ? NA : amendmentDetails.expiryType
          },
          template: "flxAmendRowTemplate"
        };
        let expiryDate = {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.expiryDate) || amendmentDetails.expiryDate === "" ? NA : regExpForCheckDateInString.test(amendmentDetails.expiryDate) ? CommonUtilities.getFrontendDateString(amendmentDetails.expiryDate, applicationManager.getConfigurationManager().frontendDateFormat) : amendmentDetails.expiryDate
          },
          template: "flxAmendRowTemplate"
        };
        amendmentRequestedDetails.push(amendDate);
        amendmentRequestedDetails.push(amount);
        amendmentRequestedDetails.push(expiryType);
        amendmentRequestedDetails.push(expiryDate);

        for (let i = 0; i < benDetails.length; i++) {
          let data = {
            lblReviewLeft: {
              text: i === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryDetails") + ":" : ""
            },
            lblHeading1: {
              text: benDetails[i].beneficiaryName
            },
            lblHeading2: {
              text: ""
            },
            lblDetailsRow1: {
              text: benDetails[i].address1,
              isVisible: true
            },
            lblDetailsRow2: {
              text: benDetails[i].address2,
              isVisible: true
            },
            lblDetailsRow3: {
              text: benDetails[i].city + " , " + benDetails[i].state,
              isVisible: true
            },
            lblDetailsRow4: {
              text: benDetails[i].country +  " , " + benDetails[i].zipcode,
              isVisible: true
            },
            template: "flxReviewDetailsRowTemplate"
          }
          amendmentRequestedDetails.push(data);
        }
        let otherAmend = {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.OtherAmendmentDetails") + ":"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.amendDetails) || amendmentDetails.amendDetails === "" ? NA : amendmentDetails.amendDetails,
            skin: "ICSKNLbl42424215PxWordBreak"
          },
          template: "flxAmendRowTemplate"
        };
        let chargesData = {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentCharges") + ":"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.amendmentCharges) || amendmentDetails.amendmentCharges === "" ? NA : amendmentDetails.amendmentCharges,
            skin: "ICSKNLbl42424215PxWordBreak"
          },
          template: "flxAmendRowTemplate"
        };
        amendmentRequestedDetails.push(otherAmend);
        amendmentRequestedDetails.push(chargesData);

        for (let i = 0; i < docDetails.length; i++) {
          data = {
            lblReviewLeft: {
              text: i === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocuments") + ":" : ""
            },
            lblDocumentName: {
              text: docDetails[i].documentName
            },
            template: "flxReviewUploadDocumentsRowTemplate"
          }
          amendmentRequestedDetails.push(data);
        }
        let messageToBank = {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankDrawings") + ":"
          },
          lblReviewValue1: {
            text: kony.sdk.isNullOrUndefined(amendmentDetails.messageToBank) || amendmentDetails.messageToBank === "" ? NA : amendmentDetails.messageToBank,
            skin: "ICSKNLbl42424215PxWordBreak"
          },
          template: "flxAmendRowTemplate"
        };
        amendmentRequestedDetails.push(messageToBank);
        scope.view.segAmendmentRequestedDetails.setData(amendmentRequestedDetails);
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "setRequestDetailsData",
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
        if (amendmentDetails.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.APPROVED).toLowerCase()) {
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
     * Navigation to print screen
     * @return : NA
     */
    onPrintAndDownloadRowClick: function (id) {
      var scope = this;
      try {
       scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
       if (id == 'print') {
        let dataObj = {
          navData: amendmentDetails,
          previousFormName: 'frmViewAmendmentDetails'
        };
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "GuaranteesUIModule/frmPrintAmendments"
        }).navigate(dataObj);
      } else if (id == "download"){
        scope.presenter.generateGuaranteesAmendments({
          "amendmentSRMSRequestId": amendmentDetails.amendmentSRMSRequestId
        });
       } else if (id == 'raiseQuery') {
         let record = amendmentDetails;
         let queryObj = {};
         let formatUtilManager = applicationManager.getFormatUtilManager();
         queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${record.amendmentSRMSRequestId}`;
         queryObj.descriptionObj = {};
         record.amendAmount && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.konybb.Common.Amount")] = record.amendAmount ? formatUtilManager.formatAmountandAppendCurrencySymbol(record.amendAmount) : NA);
         record.productType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.productType")] = record.productType);
         record.guaranteeAndSBLCType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc")] = record.guaranteeAndSBLCType);
         record.amendRequestedDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.RequestedDate")] = record.amendRequestedDate ? CommonUtilities.getDateAndTimeInUTC(record.amendRequestedDate).substr(0, 10) : NA);
         record.beneficiaryName && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.ImportLC.BeneficiaryName")] = record.beneficiaryName);
         queryObj.tradeModule = true;
         scope.presenter.showMessagesScreen(queryObj);
       }
     } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
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
    },
    ordinal: function (n) {
      return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th"
    },


    /**
     * @api : setSegAmendmentWidgetDataMap
     * This function for setting widgetDataMap for segment
     * @param : name of the segment.
     * @return : NA
     */
    setSegAmendmentWidgetDataMap: function (segName) {
      var scope = this;
      try {
        var breakpoint = kony.application.getCurrentBreakpoint();
        var orientationHandler = new OrientationHandler();
        if (breakpoint === 1024 || orientationHandler.isTablet) {
          scope.view[segName].rowTemplate = "flxAmendRowTemplateTablet";
        } else {
          scope.view[segName].rowTemplate = "flxAmendRowTemplate";
        }
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
          "flxSeparatorReturnTop03": "flxSeparatorReturnTop03"
        };
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "setSegAmendmentWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
  };
});