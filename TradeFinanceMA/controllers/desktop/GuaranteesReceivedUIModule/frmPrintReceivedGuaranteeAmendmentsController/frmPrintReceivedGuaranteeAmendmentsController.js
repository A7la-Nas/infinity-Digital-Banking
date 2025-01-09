define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let previousForm;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  return {
    /**
     * @api : onNavigate
     * Will trigger when navigating from other form to this form
     * @return : NA
     */
    onNavigate: function (data) {
      var scope = this;
      try {
        Printdata = data.lcData;
        scope.view.preShow = scope.preShow(data.lcData);
        previousForm = data.previousFormName;
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "onNavigate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : preShow
     * Will trigger before loading of UI
     * @return : NA
     */
    preShow: function (data) {
      var scope = this;
      try {
        this.presenter = applicationManager.getModulesPresentationController({
          'appName': 'TradeFinanceMA',
          'moduleName': 'GuaranteesReceivedUIModule'
        });
        scope.seti18nKeys();
        //scope.setUserDetails();
        scope.setGuaranteeData(data);
        scope.setAmendmentDetailsData(data);
        scope.setAmendmentRequestedData(data);
        scope.setAdditionalData(data);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : postShow
     * Will trigger when UI is loaded
     * @return : NA
     */
    postShow: function () {
      var scope = this;
      try {
        kony.os.print();
        //timeout is required to allow print popup to be visible.
        setTimeout(function () {
          scope.afterPrintCallback(Printdata);
        }, "17ms");
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api :setAmendmentDetailsData
     * Will print the Payment Details
     * @return : NA
     */
    setAmendmentDetailsData: function (data) {
      var scope = this;
      try {
        scope.setSegWidgetDataMap("segAmendmentDetails");
        let amendmentDetails = [];
        let section1 = [{},
        [{
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.serviceRequests.Status:", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: data.status ? data.status : NA,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNo", true),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: data.amendmentNo ? data.amendmentNo : "1",
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.ReceivedOn", true),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: data.receivedOn ? CommonUtilities.getFrontendDateString(data.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentReference", true),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: data.amendmentSrmsId ? data.amendmentSrmsId : NA,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentCharges", true),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: data.amendmentCharges ? data.currency + " " + data.amendmentCharges : NA,
            isVisible: true
          }
        }
        ]
        ];
        amendmentDetails.push(section1);
        scope.view.segAmendmentDetails.setData(amendmentDetails);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setAmendmentDetailsData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : afterPrintCallback
     * It will help user to navigate back from print
     * @return : NA
     */
    afterPrintCallback: function (data) {
      var scope = this;
      try {
        if (previousForm === "frmReceivedGuaranteeAmendment") {
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": `GuaranteesReceivedUIModule/${previousForm}`
          }).navigate(data);
        } else if (previousForm === "frmGuaranteesReceivedDashboard") {
          data.flowType = 'ReceivedAmendments';
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": `GuaranteesReceivedUIModule/${previousForm}`
          }).navigate(data);
        }
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "afterPrintCallback",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api :setAmendmentRequestedData
     * Will print the document  Details
     * @return : NA
     */
    setAmendmentRequestedData: function (data) {
      var scope = this;
      let benData = kony.sdk.isNullOrUndefined(data.beneficiaryDetails) || data.beneficiaryDetails === "" ? "" : JSON.parse(data.beneficiaryDetails.replace(/'/g, '"'));
      try {
        scope.setSegWidgetDataMap("segAmendmentRequested");
        let amendmentRequestedDetails = [];
        let section2 = [{},
        [{
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.dateOfAmountChange", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: data.amendmentSrmsId ? data.amendmentSrmsId : NA,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.wealth.amountmb", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: data.amountWithCurrency ? data.amountWithCurrency : NA,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.expiryTypeWithColon", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: data.amendExpiryType ? data.amendExpiryType : NA,
            isVisible: true
          }
        },
        ]
        ];
        for (let i = 0; i < benData.length; i++) {
          let data = {
            lblReviewLeft: {
              text: i === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryDetails") + ":" : "",
              left: "0dp"
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
              text: benData[i].state,
              isVisible: true
            },
            lblDetailsRow4: {
              text: benData[i].zipcode && benData[i].zipcode != "" ? benData[i].city + ", " + benData[i].zipcode : benData[i].city,
              isVisible: true
            },
            flxDetails: {
              left: "275dp"
            },
            flxreviewRows: {
              left: "0dp"
            },
            template: "flxReviewDetailsRowTemplate"
          }
          section2[1].push(data);
        }
        let govLaw = {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.governingLawWithColon", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: data.governingLaw ? data.governingLaw : NA,
            isVisible: true
          }
        };
        section2[1].push(govLaw);
        amendmentRequestedDetails.push(section2);
        scope.view.segAmendmentRequested.setData(amendmentRequestedDetails);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setAmendmentRequestedData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setAdditionalData
     * It will help to print claim data
     * @return : NA
     */
    setAdditionalData: function (data) {
      var scope = this;
      try {
        scope.setSegWidgetDataMap("segAdditionalDetails");
        let docData = kony.sdk.isNullOrUndefined(data.supportingDocuments) || data.supportingDocuments === "" ? "" : JSON.parse(data.supportingDocuments.replace(/'/g, '"'));
        let amendmentAdditionalDetails = [];
        let section3 = [{},
        [{
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.additionalInstructions&Documents", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: data.otherInstructions ? data.otherInstructions : NA,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.ImportDrawings.MessageFromBank", true),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: data.messageFromBank ? data.messageFromBank : NA,
            isVisible: true
          }
        },
        ]
        ];
        for (let i = 0; i < docData.length; i++) {
          data = {
            lblReview: {
              text: i === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocuments") + ":" : "",
              left: "0dp"
            },
            lblReviewValue1: {
              text: docData[i].documentName
            },
            flxreviewRows: {
              isVisible: docData.length > 0 ? true : false
            }
          }
          section3[1].push(data);
        }
        amendmentAdditionalDetails.push(section3);
        scope.view.segAdditionalDetails.setData(amendmentAdditionalDetails);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setAdditionalData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setGuaranteeData
     * It will help to print the guarantee data
     * @return : NA
     */
    setGuaranteeData: function (data) {
      var scope = this;
      try {
        scope.setSegWidgetDataMap("segGuaranteeDetails");
        let amendmentRequestedDetails = [
          [{},
          [{
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.ApplicantWithColon", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(data.LCDetails.applicantName) ? NA : data.LCDetails.applicantName,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.transactionRefWithColon", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(data.LCDetails.relatedTransactionReference) ? NA : data.LCDetails.relatedTransactionReference,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.productTypeWithColon", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(data.LCDetails.productType) ? NA : data.LCDetails.productType,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.gtAndSlbcWithColon", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(data.LCDetails.lcType) ? NA : data.LCDetails.lcType,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.billPayee.review.amount", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(data.LCDetails.amount) ? NA : data.LCDetails.currency +" "+ applicationManager.getFormatUtilManager().formatAmount(data.LCDetails.amount),
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.issueDateWithColon", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(data.LCDetails.expectedIssueDate) ? NA : CommonUtilities.getFrontendDateString(data.LCDetails.expectedIssueDate, applicationManager.getConfigurationManager().frontendDateFormat),
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.expiryTypeWithColon", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(data.LCDetails.expiryType) ? NA : data.LCDetails.expiryType,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.Wealth.expiryDate", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(data.LCDetails.expiryDate) ? NA : CommonUtilities.getFrontendDateString(data.LCDetails.expiryDate, applicationManager.getConfigurationManager().frontendDateFormat),
              isVisible: true
            }
          },
           {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.applicantPartyWithColon", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(data.LCDetails.applicantParty) ? NA : data.LCDetails.applicantParty,
              isVisible: true
            }
          }]
          ]
        ];
        scope.view.segGuaranteeDetails.setData(amendmentRequestedDetails);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setGuaranteeData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setSegWidgetDataMap
     * This function for setting widgetDataMap for segment
     * @param : name of the segment.
     * @return : NA
     */
    setSegWidgetDataMap: function (segName) {
      var scope = this;
      try {
        scope.view[segName].rowTemplate = "flxAmendRowTemplate";
        scope.view[segName].widgetDataMap = {
          "lblBottomValue": "lblBottomValue",
          "flxAmendmentRowTemplate": "flxAmendmentRowTemplate",
          "flxreviewRows": "flxreviewRows",
          "lblReview": "lblReview",
          "flxReviewRight": "flxReviewRight",
          "flxReviewValues": "flxReviewValues",
          "lblReviewValue1": "lblReviewValue1",
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
          "lblReviewLeft": "lblReviewLeft",
        };
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setSegWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : seti18nKeys
     * 
     * @return : NA
     */
    seti18nKeys: function () {
      var scope = this;
      try {
        this.view.lblCustCareKey.text = this.presenter.renderI18nKeys("i18n.TradeFinance.CustomerCare", true);
        this.view.lblWebsiteKey.text = this.presenter.renderI18nKeys("i18n.TradeFinance.Website", true)
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "seti18nKeys",
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
      let errMsg = JSON.stringify(err);
      // kony.ui.Alert(errMsg);
    }
  };
});