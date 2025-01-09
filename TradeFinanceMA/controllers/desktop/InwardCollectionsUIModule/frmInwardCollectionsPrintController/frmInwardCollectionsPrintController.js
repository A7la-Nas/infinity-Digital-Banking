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
        Printdata = data.navData;
        scope.view.preShow = scope.preShow();
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
    preShow: function () {
      var scope = this;
      try {
        this.presenter = applicationManager.getModulesPresentationController({
          'appName': 'TradeFinanceMA',
          'moduleName': 'InwardCollectionsUIModule'
        });
        scope.setUserDetails();
        scope.seti18nKeys();
        scope.setInwardCollectionOverviewData();
        if (Printdata.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.SUBMITTED_TO_BANK).toLowerCase() || Printdata.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.PROCESSING_BY_BANK).toLowerCase() || Printdata.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.SETTLED).toLowerCase() || Printdata.status.toLowerCase() === (OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED).toLowerCase()){
          scope.setDraweeConsentData();
          scope.view.flxDraweeConsentDetailsContainer.setVisibility(true);
		  scope.view.flxTermsAndConditionsContainer.top = '200dp';
        }else{
          scope.view.flxDraweeConsentDetailsContainer.setVisibility(false);
          scope.view.flxTermsAndConditionsContainer.top = '400dp';
        }
        scope.setCollectionData();
        scope.setPaymentData();
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
     * @api : afterPrintCallback
     * It will help user to navigate back from print
     * @return : NA
     */
    afterPrintCallback: function (data) {
      var scope = this;
      try {
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": `InwardCollectionsUIModule/${previousForm}`
        }).navigate(data);
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
          "imgDaysLeft": "imgDaysLeft",
          "lblDaysLeft": "lblDaysLeft"
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
     * @api :setInwardCollectionOverviewData
     * Will print the Payment Details
     * @return : NA
     */
    setInwardCollectionOverviewData: function () {
      var scope = this;
      try {
        scope.setSegWidgetDataMap("segInwardCollectionsOverviewDetails");
        let InwardCollectionOverviewDetails = [];
        let section1 = [{},
        [{
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.transactionRefWithColon", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.collectionSrmsId) ? NA : Printdata.collectionSrmsId,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.documentNumber", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.documentNo) ? NA : Printdata.documentNo,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.receivedOnWithColon", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.receivedOn) ? NA : CommonUtilities.getFrontendDateString(Printdata.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat),
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.serviceRequests.Status:", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.status) ? NA : Printdata.status,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturnedWithColon", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.reasonForReturn) ? NA : Printdata.reasonForReturn,
            isVisible: true
          },
          flxreviewRows: {
            isVisible: this.presenter.isEmptyNullOrUndefined(Printdata.status) ? false : Printdata.status.toLowerCase() === (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.RETURNED_BY_BANK).toLowerCase() ? true : false
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.draweeAcknowledgement", true),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.draweeAcknowledgement) ? NA : Printdata.draweeAcknowledgement,
            isVisible: true
          },
          flxreviewRows: {
            isVisible: this.presenter.isEmptyNullOrUndefined(Printdata.status) ? false : (Printdata.status.toLowerCase() === (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.NEW).toLowerCase() || Printdata.status.toLowerCase() === (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.RETURNED_BY_BANK).toLowerCase()) ? true : false
          }
        },
        {
          lblReview: {
            text: (Printdata.status.toLowerCase() === (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.APPROVED).toLowerCase() || Printdata.status.toLowerCase() === (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.RETURNED_BY_BANK).toLowerCase()) ? this.presenter.renderI18nKeys("i18n.TradeFinance.documentsAgainstAcceptance", false) : this.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptanceEligible", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.usanceAcceptanceEligibility) ? NA : Printdata.usanceAcceptanceEligibility,
            isVisible: true
          }
        }
        ]
        ];
        InwardCollectionOverviewDetails.push(section1);
        scope.view.segInwardCollectionsOverviewDetails.setData(InwardCollectionOverviewDetails);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setInwardCollectionOverviewData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api :setDraweeConsentData
     * Will print the document  Details
     * @return : NA
     */
    setDraweeConsentData: function () {
      var scope = this;
      try {
        scope.setSegWidgetDataMap("segDraweeConsentDetails");
        let DraweeConsentDetails = [];
          let section2 = [{},
          [{
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.draweeAcknowledgement", true),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(Printdata.draweeAcknowledgement) ? NA : Printdata.draweeAcknowledgement,
              isVisible: true
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptance", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(Printdata.usanceAcceptance) ? NA : Printdata.usanceAcceptance,
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(Printdata.tenorType) ? false : Printdata.tenorType.toLowerCase() === "usance" ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptanceDate", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(Printdata.usanceAcceptanceDate) ? NA : Printdata.usanceAcceptanceDate,
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(Printdata.tenorType) ? false : Printdata.tenorType.toLowerCase() === "usance" ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.billOfExchangeStatus", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(Printdata.billExchangeStatus) ? NA : Printdata.billExchangeStatus,
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(Printdata.status) ? false : Printdata.status.toLowerCase() === (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.APPROVED).toLowerCase() ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.amountDebitFromWithColon", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(Printdata.debitAmountFrom) ? NA : CommonUtilities.getMaskedAccName(Printdata.debitAmountFrom)[0],
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(Printdata.status) ? false : Printdata.status.toLowerCase() !== (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.REJECTED).toLowerCase() ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitFrom", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(Printdata.chargesDebitFrom) ? NA : CommonUtilities.getMaskedAccName(Printdata.chargesDebitFrom)[0],
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(Printdata.status) ? false : Printdata.status.toLowerCase() !== (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.REJECTED).toLowerCase() ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.rejectedDateWithColon", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(Printdata.lastUpdatedDate) ? NA : Printdata.lastUpdatedDate,
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(Printdata.status) ? false : Printdata.status.toLowerCase() === (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.REJECTED).toLowerCase() ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejectionWithColon", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(Printdata.reasonForRejection) ? NA : Printdata.reasonForRejection,
              isVisible: true
            },
            flxreviewRows: {
              isVisible: this.presenter.isEmptyNullOrUndefined(Printdata.status) ? false : Printdata.status.toLowerCase() === (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.REJECTED).toLowerCase() ? true : false
            }
          },
          {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.messageToBankWithColon", false),
              isVisible: true,
              left: "0dp"
            },
            lblReviewValue1: {
              text: this.presenter.isEmptyNullOrUndefined(Printdata.messageToBank) ? NA : Printdata.messageToBank,
              isVisible: true
            }
          }
          ]
          ];
          DraweeConsentDetails.push(section2);
        scope.view.segDraweeConsentDetails.setData(DraweeConsentDetails);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setDraweeConsentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setCollectionData
     * It will help to print claim data
     * @return : NA
     */
    setCollectionData: function () {
      var scope = this;
      try {
        scope.setSegWidgetDataMap("segCollectionDetails");
        let docData = this.presenter.isEmptyNullOrUndefined(Printdata.documentsUploaded) ? NA : JSON.parse(Printdata.documentsUploaded.replace(/'/g, '"'));
        let CollectionDetails = [];
        let section3 = [{},
        [{
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.drawerDetails", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.drawerName) ? NA : Printdata.drawerName,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.billPayee.review.amount", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.amount) ? NA : Printdata.currency + " " + applicationManager.getFormatUtilManager().formatAmount(Printdata.amount),
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.ChargesWithColon", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.charges) ? NA : Printdata.currency + " " + applicationManager.getFormatUtilManager().formatAmount(Printdata.charges),
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.Wealth.maturityDate", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.maturityDate) ? NA : CommonUtilities.getFrontendDateString(Printdata.maturityDate, applicationManager.getConfigurationManager().frontendDateFormat),
            isVisible: true,
			width: '100dp'
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.tenorType) ? NA : Printdata.tenorType,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetails", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.usanceDetails) ? NA : Printdata.usanceDetails,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.IncoTerms", true),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.incoTerms) ? NA : Printdata.incoTerms,
            isVisible: true
          }
        },
        {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.remittingBankDetails", true),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.remittingBank) ? NA : Printdata.remittingBank,
            isVisible: true
          }
        }
        ]
        ];
        for (let i = 0; i < docData.length; i++) {
          data = {
            lblReview: {
              text: i === 0 ? this.presenter.renderI18nKeys("i18n.TradeFinance.documentsWithColon", false) : "",
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
        let messageFromBank = {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.messageFromBankWithColon", false),
            isVisible: true,
            left: "0dp"
          },
          lblReviewValue1: {
            text: this.presenter.isEmptyNullOrUndefined(Printdata.messageFromBank) ? NA : Printdata.messageFromBank,
            isVisible: true
          }
        };

        section3[1].push(messageFromBank);
        CollectionDetails.push(section3);
        scope.view.segCollectionDetails.setData(CollectionDetails);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setCollectionData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setPaymentData
     * It will help to print the guarantee data
     * @return : NA
     */
    setPaymentData: function () {
      var scope = this;
      try {
        scope.setSegWidgetDataMap("segPaymentDetails");
        if (Printdata.status.toLowerCase() === OLBConstants.INWARD_COLLECTIONS_STATUS.SETTLED.toLowerCase()) {
          scope.view.flxHeaderContainer2.setVisibility(true);
          scope.view.flxPaymentDetailsContainer.setVisibility(true);
          scope.view.flxTermsAndConditionsContainer2.setVisibility(true);
          let PaymentDetails = [
            [{},
            [{
              lblReview: {
                text: this.presenter.renderI18nKeys("i18n.TradeFinance.paymentStatusWithColon", false),
                isVisible: true,
                left: "0dp"
              },
              lblReviewValue1: {
                text: this.presenter.isEmptyNullOrUndefined(Printdata.paymentStatus) ? NA : Printdata.paymentStatus,
                isVisible: true
              }
            }, {
              lblReview: {
                text: this.presenter.renderI18nKeys("i18n.TradeFinance.settledDateWithColon", false),
                isVisible: true,
                left: "0dp"
              },
              lblReviewValue1: {
                text: this.presenter.isEmptyNullOrUndefined(Printdata.settledDate) ? NA : Printdata.settledDate,
                isVisible: true
              }
            }, {
              lblReview: {
                text: this.presenter.renderI18nKeys("i18n.TradeFinance.settledAmount", false),
                isVisible: true,
                left: "0dp"
              },
              lblReviewValue1: {
                text: this.presenter.isEmptyNullOrUndefined(Printdata.amount) ? NA : Printdata.currency + " " + applicationManager.getFormatUtilManager().formatAmount(Printdata.amount),
                isVisible: true
              }
            }, {
              lblReview: {
                text: this.presenter.renderI18nKeys("i18n.TradeFinance.amountDebitedFrom", false),
                isVisible: true,
                left: "0dp"
              },
              lblReviewValue1: {
                text: this.presenter.isEmptyNullOrUndefined(Printdata.debitAmountFrom) ? NA : Printdata.debitAmountFrom,
                isVisible: true
              }
            }]
            ]
          ];
          scope.view.segPaymentDetails.setData(PaymentDetails);
        } else {
          scope.view.flxHeaderContainer2.setVisibility(false);
          scope.view.flxPaymentDetailsContainer.setVisibility(false);
          scope.view.flxTermsAndConditionsContainer2.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setPaymentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setUserDetails
     * It will help to set user header details
     * @return : NA
     */
    setUserDetails: function(){
      var scope = this;
      try{
        let userObject = applicationManager.getUserPreferencesManager().getUserObj();
        scope.view.lblPhone.text = userObject.phone ? this.presenter.getDynamicData(userObject, 'phone') : NA;
        scope.view.lblUserName.text = (userObject.userfirstname && userObject.LastName) ? userObject.userfirstname + " " + userObject.LastName : NA;
        scope.view.lblBankNameValue.text = userObject.bankName ? this.presenter.getDynamicData(userObject, 'bankName') : NA;
        scope.view.lblEmailValue.text = userObject.email ? this.presenter.getDynamicData(userObject, 'email') : NA;
      }catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsPrintController",
          "method": "setUserDetails",
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
        scope.view.lblCustCareKey.text = this.presenter.renderI18nKeys("i18n.TradeFinance.CustomerCare", true);
        scope.view.lblWebsiteKey.text = this.presenter.renderI18nKeys("i18n.TradeFinance.Website", true)
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