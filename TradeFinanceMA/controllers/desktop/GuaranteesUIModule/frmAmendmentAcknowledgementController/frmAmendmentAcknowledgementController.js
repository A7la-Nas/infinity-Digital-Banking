define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let amendmentDetails = "";
  let regExpForCheckDateInString = /[\-\-]/g;
  let regExpForCheckArrayInString = /[\[\]]+/;
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
      amendmentDetails = data;
      this.presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeFinanceMA',
        'moduleName': 'GuaranteesUIModule'
      });

    },

    /**
     * @api : preShow
     * This function for executing the primary functions before rendering UI
     * @return : NA
     */
    preShow: function () {
      var scope = this;
      try {
        scope.setDefaultUI();
        scope.setDetailsSegmentData();
        scope.setRequestDetailsSegmentData();
        scope.setSuccessMessage();
        scope.setLCDetails();
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentAcknowledgementController",
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
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentAcknowledgementController",
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
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentAcknowledgementController",
          "method": "onBreakpointChange",
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
    initButtonActions: function () {
      var scope = this;
      try {
        scope.view.btnViewAllAmendments.onClick = scope.buttonNavigation.bind(this, "ViewAmendment");
        scope.view.btnViewAllSBLC.onClick = scope.buttonNavigation.bind(this, "ViewSBLC");
        scope.view.flxClear.onClick = function () {
          scope.view.flxAcknowledgementMessage.setVisibility(false);
        };
        scope.view.flxCrossSBLC.onClick = function () {
          scope.view.flxDialogs.setVisibility(false);
          scope.view.flxDialogs.height = "250%";
          scope.view.flxViewSBLCDetailsPopup.setVisibility(false);
        };
        scope.view.btnViewDetails.onClick = scope.showSBLCPopup.bind(this);
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentAcknowledgementController",
          "method": "initButtonActions",
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
        this.view.flxViewSBLCDetailsPopup.setVisibility(true);
        this.setSBLCData();
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentAcknowledgementController",
          "method": "showSBLCPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : buttonNavigation
     * This function handles button navigation
     * @return : NA
     */
    buttonNavigation: function (param) {
      var scope = this;
      let appName = "TradeFinanceMA";
      let formName = "";
      let data = {};
      scope.navManager = applicationManager.getNavigationManager();
      try {
        switch (param) {
          case "ViewAmendment": {
            formName = "frmGuaranteesLCDashboard";
            data.flowType = "Amendments";
            break;
          }
          case "ViewSBLC": {
            formName = "frmGuaranteesLCDashboard";
            break;
          }
        }
        this.navManager.navigateTo({
          appName: appName,
          friendlyName: formName
        }, false, data);
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentAcknowledgementController",
          "method": "buttonNavigation",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setSuccessMessage
     * This function for showing the success message
     * @return : NA
     */
    setSuccessMessage: function () {
      var scope = this;
      try {
        if (amendmentDetails.flag) {
          this.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.CancellationRequesForBankApproval");
        } else {
          this.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentSuccessMessage");
        }
        this.view.flxAcknowledgementMessage.setVisibility(true);
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentAcknowledgementController",
          "method": "setSuccessMessage",
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
    setDefaultUI: function () {
      var scope = this;
      try {
        if (amendmentDetails.flag) {
          this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.GuaranteeAndStandbyLCRequestCancellationAcknowledgement");
        } else {
          this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuedGTAndSBLC") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.Amendment") + " - " + kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        }
        this.view.lblBeneficiaryDetailsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryDetails") + ":";
        this.view.flxAcknowledgementMessage.setVisibility(false);
        this.view.flxDialogs.setVisibility(false);
        this.view.flxViewSBLCDetailsPopup.setVisibility(false);
        this.view.lblAmendmentDetails.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentDetails");
        this.view.lblAmendmentRequested.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentsRequested");
        this.view.btnViewAllAmendments.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllAmendments");
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentAcknowledgementController",
          "method": "setDefaultUI",
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
      try {
        this.view.lblBeneficiaryDetailsValue.text = amendmentDetails.benificiaryName ? amendmentDetails.benificiaryName : amendmentDetails.beneficiaryName ? amendmentDetails.beneficiaryName : NA;
        this.view.lblTransRefValue.text = amendmentDetails.guaranteesSRMSId ? amendmentDetails.guaranteesSRMSId : NA;
        this.view.lblProductTypeValue.text = amendmentDetails.productType ? amendmentDetails.productType : NA;
        this.view.lblBillTypeValue.text = amendmentDetails.billType ? amendmentDetails.billType : NA;
        this.view.lblAmountValue.text = amendmentDetails.amount ? applicationManager.getFormatUtilManager().getCurrencySymbol(amendmentDetails.currency) + " " + applicationManager.getFormatUtilManager().formatAmount(amendmentDetails.amount) : NA;
        this.view.lblIssueDateValue.text = amendmentDetails.issueDate ? regExpForCheckDateInString.test(amendmentDetails.issueDate) ? CommonUtilities.getFrontendDateString(amendmentDetails.issueDate, applicationManager.getConfigurationManager().frontendDateFormat) : amendmentDetails.issueDate : NA;
        this.view.lblExpiryTypeValue.text = amendmentDetails.expiryType ? amendmentDetails.expiryType : NA;
        this.view.lblExpiryDateValue.text = amendmentDetails.expiryDate ? regExpForCheckDateInString.test(amendmentDetails.expiryDate) ? CommonUtilities.getFrontendDateString(amendmentDetails.expiryDate, applicationManager.getConfigurationManager().frontendDateFormat) : amendmentDetails.expiryDate : NA;
        this.view.lblInstructingPartyValue.text = amendmentDetails.instructingParty ? regExpForCheckArrayInString.test(amendmentDetails.instructingParty) ? JSON.parse(amendmentDetails.instructingParty.replace(/\'/g, "\""))[0].contractId : amendmentDetails.instructingParty : NA;
        this.view.lblApplicantPartyValue.text = amendmentDetails.applicantParty ? amendmentDetails.applicantParty : NA;
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentAcknowledgementController",
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

    },

    /**
     * @api : setDetailsSegmentData
     * This function for setting data in Details Segment
     * @return : NA
     */
    setDetailsSegmentData: function () {
      var scope = this;
      try {
        scope.setSegAmendmentWidgetDataMap("segAmendmentDetails");
        let amendmentDetails1 = [{
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.common.status") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.amendStatus ? amendmentDetails.amendStatus : NA
          }
        }, {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.CancellationStatus") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.cancellationStatus === "Requested" ? amendmentDetails.cancellationStatus : NA,
            skin: "sknLbl424242SSP15pxBold"
          },
          flxreviewRows: {
            isVisible: amendmentDetails.cancellationStatus ? true : false
          }
        }, {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNumber") + ":"
          },
          lblReviewValue1: {
            text: typeof(amendmentDetails.amendmentNo) === "string" ? amendmentDetails.amendmentNo : (JSON.parse(amendmentDetails.amendmentNo.replace(/'/g, "\"")).amendmentNo) ? (JSON.parse(amendmentDetails.amendmentNo.replace(/'/g, "\"")).amendmentNo) : NA,
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
            text: amendmentDetails.relatedTransactionReference  || amendmentDetails.amendmentReference || NA
          }
        }];
        scope.view.segAmendmentDetails.setData(amendmentDetails1);

      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentAcknowledgementController",
          "method": "setDetailsSegmentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setRequestDetailsSegmentData
     * This function for setting data in RequestDetails Segment
     * @return : NA
     */
    setRequestDetailsSegmentData: function () {
      var scope = this;
      try {
        this.view.segAmendmentRequestedDetails.widgetDataMap = {
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
          "template": "template"
        };
        let amendmentRequestedDetails = [];
        if (amendmentDetails.flag) {
          let docData = kony.sdk.isNullOrUndefined(amendmentDetails.supportingDocument) || amendmentDetails.supportingDocument === "" ? "" : JSON.parse(amendmentDetails.supportingDocument);
          for (let i = 0; i < docData.length; i++) {
            data = {
              lblReviewLeft: {
                text: i === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocuments") + ":" : ""
              },
              lblDocumentName: {
                text: docData[i]
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
              text: kony.sdk.isNullOrUndefined(amendmentDetails.messageToBank)  || amendmentDetails.messageToBank === ""  ? NA : amendmentDetails.messageToBank,
            },
            template: "flxAmendRowTemplate"
          };
          amendmentRequestedDetails.push(messageToBank);
          this.view.segAmendmentRequestedDetails.setData(amendmentRequestedDetails);
        } else {
          let benData = kony.sdk.isNullOrUndefined(amendmentDetails.beneficiaryDetails) || amendmentDetails.beneficiaryDetails === "" ? "" : JSON.parse(amendmentDetails.beneficiaryDetails);
          let docData = kony.sdk.isNullOrUndefined(amendmentDetails.supportingDocument) || amendmentDetails.supportingDocument === "" ? "" : JSON.parse(amendmentDetails.supportingDocument);
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
              text: kony.sdk.isNullOrUndefined(amendmentDetails.amendAmount) || amendmentDetails.amendAmount === "" ? NA : amendmentDetails.amendCurrency ? amendmentDetails.amendCurrency : amendmentDetails.currency + " " + amendmentDetails.amendAmount
            },
            template: "flxAmendRowTemplate"
          };
          let expiryType = {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType") + ":"
            },
            lblReviewValue1: {
              text: kony.sdk.isNullOrUndefined(amendmentDetails.amendExpiryType) || amendmentDetails.amendExpiryType === "" ? NA : amendmentDetails.amendExpiryType,
            },
            template: "flxAmendRowTemplate"
          };
          amendmentRequestedDetails.push(amendDate);
          amendmentRequestedDetails.push(amount);
          amendmentRequestedDetails.push(expiryType);

          if (amendmentDetails.amendExpiryType === kony.i18n.getLocalizedString("i18n.konybb.Common.Date")) {
            let expiryDate = {
              lblReview: {
                text: kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate") + ":"
              },
              lblReviewValue1: {
                text: kony.sdk.isNullOrUndefined(amendmentDetails.amendExpiryDate) || amendmentDetails.amendExpiryDate === "" ? NA : amendmentDetails.amendExpiryDate,
              },
              template: "flxAmendRowTemplate"
            };
            amendmentRequestedDetails.push(expiryDate);
          }
          if (amendmentDetails.amendExpiryType === kony.i18n.getLocalizedString("i18n.ExportLC.AdditionalConditions").slice(11)) {
            if (kony.sdk.isNullOrUndefined(amendmentDetails.amendExpiryDate) || amendmentDetails.amendExpiryDate === "") {
              //don't add the expiryDate field as it is empty and is optional.
            } else {
              let expiryDate = {
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate") + ":"
                },
                lblReviewValue1: {
                  text: kony.sdk.isNullOrUndefined(amendmentDetails.amendExpiryDate) || amendmentDetails.amendExpiryDate === "" ? NA : amendmentDetails.amendExpiryDate,
                },
                template: "flxAmendRowTemplate"
              };
              amendmentRequestedDetails.push(expiryDate);
            }
            let expiryCondition = {
              lblReview: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryConditionOptional").slice(0, 16) + ":"
              },
              lblReviewValue1: {
                text: kony.sdk.isNullOrUndefined(amendmentDetails.amendExpiryCondition) || amendmentDetails.amendExpiryCondition === "" ? NA : amendmentDetails.amendExpiryCondition,
              },
              template: "flxAmendRowTemplate"
            };
            amendmentRequestedDetails.push(expiryCondition);
          }

          for (let i = 0; i < benData.length; i++) {
            let data = {
              lblReviewLeft: {
                text: i === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryDetails") + ":" : ""
              },
              lblHeading1: {
                text: benData[i].beneficiaryName,
                skin: benData[i].isChanged ? "bblblskn424242Bold" : "bbSknLbl424242SSP15Px"
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
                text: benData[i].state,
                isVisible: true
              },
              lblDetailsRow4: {
                text: benData[i].zipcode && benData[i].zipcode!= "" ? benData[i].city + ", " + benData[i].zipcode : benData[i].city ,
                isVisible: true
              },
              flxreviewRows: {
                left: "17dp"
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
              text: kony.sdk.isNullOrUndefined(amendmentDetails.amendCharges) || amendmentDetails.amendCharges === "" ? NA :amendmentDetails.currency + " " + applicationManager.getFormatUtilManager().formatAmount(amendmentDetails.amendCharges),
              skin: "ICSKNLbl42424215PxWordBreak"
            },
            template: "flxAmendRowTemplate"
          };
          amendmentRequestedDetails.push(otherAmend);
          amendmentRequestedDetails.push(chargesData);
          for (let i = 0; i < docData.length; i++) {
            data = {
              lblReviewLeft: {
                text: i === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocuments") + ":" : ""
              },
              lblDocumentName: {
                text: docData[i].documentName
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
              text: kony.sdk.isNullOrUndefined(amendmentDetails.messageToBank) || amendmentDetails.messageToBank === ""  ? NA : amendmentDetails.messageToBank,
              skin: "ICSKNLbl42424215PxWordBreak"
            },
            template: "flxAmendRowTemplate"
          };
          amendmentRequestedDetails.push(messageToBank);

          this.view.segAmendmentRequestedDetails.setData(amendmentRequestedDetails);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentAcknowledgementController",
          "method": "setRequestDetailsSegmentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : onError
     * This function is for catching any errors from the catch block of methods
     * @return : NA
     */
    onError: function (err) {
      var error = err;
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
          "template": "template"
        };

      } catch (err) {
        var errorObj = {
          "level": "frmAmendmentAcknowledgementController",
          "method": "setSegAmendmentWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
  };
});