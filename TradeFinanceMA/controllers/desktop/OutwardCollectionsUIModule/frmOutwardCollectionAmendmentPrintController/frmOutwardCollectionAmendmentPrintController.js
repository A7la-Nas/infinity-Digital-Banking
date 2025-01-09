define(['OLBConstants', 'FormControllerUtility'], function(OLBConstants, FormControllerUtility) {
  let printDataObj = {}; 
  let collectionResponse, amendmentResponse;
  let presenter;
  let previousForm;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let collectionSummaryArray = [],
    amendmentOverviewArray = [],
    amendmentRequestedArray = [],
    amountAndAccountDetailsArray = [],
    documentAndBankInstructionsArray = [];
  let OUTWARD_COLLECTIONS_AMENDMENT_STATUSES;
  let viewAllAmendments = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllAmendments");
  return {
    /**
     * @api onNavigate
     * wil trigger when form is called
     * @return : NA
     */
    onNavigate: function() {
      var scope = this;
      try {
          presenter = applicationManager.getModulesPresentationController({
              'appName': 'TradeFinanceMA',
              'moduleName': 'OutwardCollectionsUIModule'
          });
          collectionResponse = presenter.collectionResponse;
          amendmentResponse = presenter.amendmentResponse;
          scope.view.postShow = scope.postShow;
          scope.view.preShow = scope.preShow;
          previousForm = presenter.previousFormName;
      } catch (err) {
        var errorObj = {
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
    },
    
    /**
     * @api :preShow
     * Before showing the UI
     * @return : NA
     */
    preShow: function() {
      var scope = this;
      try {
        presenter = applicationManager.getModulesPresentationController({
          appName: 'TradeFinanceMA',
          moduleName: 'OutwardCollectionsUIModule'
        });
        OUTWARD_COLLECTIONS_AMENDMENT_STATUSES = OLBConstants.OUTWARD_COLLECTION_AMENDMENTS_STATUS;
        scope.view.lblTitle.text = kony.i18n.getCurrentLocale === "ar_AE" ? kony.i18n.getLocalizedString("i18n.TradeFinance.Amendment") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") : kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.Amendment");
        scope.renderHeaderDetails();
        scope.setSegAmendmentWidgetDataMap();
        scope.appendResponses();
        scope.view.flxTermsAndCondition.top = (amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.SUBMITTED_TO_BANK || amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.APPROVED) && amendmentResponse.cancellationStatus ? '550dp' : '180dp';
      } catch (err) {
        var errorObj = {
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api :postShow
     * After loading the UI
     * @return : NA
     */
    postShow: function() {
      var scope = this;
      try {
        kony.os.print();
        //timeout is required to allow print popup to be visible.
        setTimeout(function() {
          scope.afterPrintCallback();
        }, "17ms");
      } catch (err) {
        var errorObj = {
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
    afterPrintCallback: function() {
      var scope = this;
      try {
        this.navManager = applicationManager.getNavigationManager();
        let formName;
        printDataObj["flowType"] = viewAllAmendments;
        printDataObj["previousForm"] = previousForm;
        printDataObj["collectionResponse"] = collectionResponse;
        printDataObj["amendmentResponse"] = amendmentResponse;
        if (previousForm === "frmOutwardCollectionDashboard") {
        presenter.showOutwardCollectionScreen({
          context: "outwardCollectionAmendmentDashboard",
          form: scope.view.id,
          data: printDataObj
      });
        } else {
               formName = previousForm;
                this.navManager.navigateTo({
                  appName: "TradeFinanceMA",
                  friendlyName: formName
             }, false, printDataObj);
        }
      } catch (err) {
        var errorObj = {
          "method": "afterPrintCallback",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api :renderHeaderDetails
     * Rendering logged user details in UI
     * @return : NA
     */
    renderHeaderDetails: function() {
      var scope = this;
      try {
        let userObject = applicationManager.getUserPreferencesManager().getUserObj();
        scope.view.lblUserName.text = (userObject.userfirstname && userObject.LastName) ? userObject.userfirstname + " " + userObject.LastName : NA;
        scope.view.lblAddress3.text = userObject.ContactNumbers[0].phoneNumber ? presenter.getDynamicData(userObject.ContactNumbers[0], 'phoneNumber') : NA;
        scope.view.lblBankNameValue.text = userObject.bankName ? presenter.getDynamicData(userObject, 'bankName') : NA;
        scope.view.lblEmailValue.text = userObject.email ? presenter.getDynamicData(userObject, 'email') : NA;
        scope.view.lblTermsCondition.text = presenter.renderI18nKeys("i18n.Transfers.Terms&Conditions", true) + " " + presenter.renderI18nKeys("i18n.TradeFinance.amendmentsTermsandConditions", false);
        // As per UX team's suggestion, hard coding below values
        let address1 = "Ohio/West Virginia Markets";
        let address2 = "P O Box 260180";
        scope.view.lblAddress1.text = address1;
        scope.view.lblAddress2.text = address2;
        scope.view.lblCustCareValue.text = "10000020000";
        scope.view.lblAddressValue.text = address1 + " " + address2;
        scope.view.lblWebsiteValue.text = "dbxdigitalbanking.com";
        scope.view.lblWebsiteValue.width = "80%";
      } catch (err) {
        var errorObj = {
          "method": "renderHeaderDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api :setSegAmendmentWidgetDataMap
     * Widget data map for segment
     * @return : NA
     */
    setSegAmendmentWidgetDataMap: function() {
      var scope = this;
      try {
        scope.view.segAmendmentOverview.rowTemplate = "flxTempInwardGuranteeAmendmentRowPrint";
        scope.view.segAmendmentOverview.sectionHeaderTemplate = "flxTempInwardGuaranteeAmendmentHeader";
        scope.view.segAmendmentOverview.widgetDataMap = {
          "flxTempInwardGuaranteeAmendmentHeader": "flxTempInwardGuaranteeAmendmentHeader",
          "lblAmendmentHeader": "lblAmendmentHeader",
          "flxTempInwardGuranteeAmendmentRowPrint": "flxTempInwardGuranteeAmendmentRowPrint",
          "flxDetailsRow": "flxDetailsRow",
          "lblReviewKey": "lblReviewKey",
          "lblReviewValue": "lblReviewValue",
          "imgDaysLeft": "imgDaysLeft",
          "lblDaysLeft": "lblDaysLeft",
        };
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionAmendmentPrintController",
          "method": "setSegAmendmentWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api :processCollectionSummary
     * Processing Collection Summary
     * @return : NA
     */
    processCollectionSummary: function() {
      var scope = this;
      try {
        collectionSummaryArray = [
          [{
              "lblAmendmentHeader": presenter.renderI18nKeys("i18n.TradeFinance.collectionSummary", false),
              skin: "ICSknlbl424242SSP15pxSemibold"
            }, // Section Header Template
            [{
              "lblReviewKey": presenter.renderI18nKeys("i18n.ImportLC.DrawingDetails", true),
              "lblReviewValue": collectionResponse.draweeName ? presenter.getDynamicData(collectionResponse, 'draweeName') : NA
            }, {
              "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.transactionRefWithColon", false),
              "lblReviewValue": collectionResponse.collectionReference ? presenter.getDynamicData(collectionResponse, 'collectionReference') : NA
            }, {
              "lblReviewKey": presenter.renderI18nKeys("i18n.StopCheckPayments.Amount", false),
              "lblReviewValue": (collectionResponse.currency && collectionResponse.amount) ? collectionResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(collectionResponse.amount) : NA
            }, {
              "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
              "lblReviewValue": collectionResponse.tenorType ? presenter.getDynamicData(collectionResponse, 'tenorType') : NA
            }, {
              "lblReviewKey": presenter.renderI18nKeys("i18n.mortgageAccount.MaturityDate", false),
              "lblReviewValue": collectionResponse.maturityDate ? presenter.getDynamicData(collectionResponse, 'maturityDate') : NA
            }, {
              "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.collectingBankDetails", true),
              "lblReviewValue": collectionResponse.collectingBank ? presenter.getDynamicData(collectionResponse, 'collectingBank') : NA
            }]
          ]
        ];
      } catch (err) {
        var errorObj = {
          "method": "processCollectionSummary",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api :processAmendmentOverview
     * Processing Amendent Overview
     * @return : NA
     */
    processAmendmentOverview: function() {
      var scope = this;
      try {
        amendmentOverviewArray = [
          [{
              "lblAmendmentHeader": presenter.renderI18nKeys("i18n.TradeFinance.amendmentOverview", false),
              skin: "ICSknlbl424242SSP15pxSemibold"
            }, // Section Header Template
            [{
              "lblReviewKey": presenter.renderI18nKeys("i18n.ChequeManagement.Status", true),
              "lblReviewValue": amendmentResponse.status ? presenter.getDynamicData(amendmentResponse, 'status') : NA
            }, {
                "lblReviewKey": {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturnedWithColon", false),
                    isVisible: amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.RETURNED_BY_BANK ? true : false
                },
                "lblReviewValue": {
                    text: amendmentResponse.reasonForReturn ? presenter.getDynamicData(amendmentResponse, 'reasonForReturn') : NA,
                    isVisible: amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.RETURNED_BY_BANK ? true : false
                }
            }, {
                "lblReviewKey": {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejectionWithColon", false),
                    isVisible: amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.REJECTED ? true : false
                },
                "lblReviewValue": {
                    text: amendmentResponse.reasonForRejection ? presenter.getDynamicData(amendmentResponse, 'reasonForRejection') : NA,
                    isVisible: amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.REJECTED ? true : false
                }
            }, {
                "lblReviewKey": {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.updatedOn", true),
                },
                "lblReviewValue": {
                    text: amendmentResponse.updatedOn ? presenter.getConvertedDate(amendmentResponse, 'updatedOn') : NA,
                }
            }, {
                "lblReviewKey": {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturnedWithColon", false),
                    isVisible: (amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.SUBMITTED_TO_BANK && amendmentResponse.reasonForReturn) ? true : false
                },
                "lblReviewValue": {
                    text: amendmentResponse.reasonForReturn ? presenter.getDynamicData(amendmentResponse, 'reasonForReturn') : NA,
                    isVisible: (amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.SUBMITTED_TO_BANK && amendmentResponse.reasonForReturn) ? true : false
                }
            }, {
                "lblReviewKey": {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.CancellationStatus", true),
                    isVisible: (amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.SUBMITTED_TO_BANK || amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.APPROVED) && amendmentResponse.cancellationStatus ? true : false
                },
                "lblReviewValue": {
                    text: amendmentResponse.cancellationStatus ? presenter.getDynamicData(amendmentResponse, 'cancellationStatus') : NA,
                    isVisible: (amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.SUBMITTED_TO_BANK || amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.APPROVED) && amendmentResponse.cancellationStatus ? true : false
                }
            },{
                "lblReviewKey": {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNumber", true),
                },
                "lblReviewValue": {
                    text: amendmentResponse.amendmentNo ? presenter.getDynamicData(amendmentResponse, 'amendmentNo') : NA,
                }
            },{
                "lblReviewKey": {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.requestedOn", true),
                },
                "lblReviewValue": {
                    text: amendmentResponse.requestedOn ? presenter.getConvertedDate(amendmentResponse, 'requestedOn') : NA,
                }
            },{
                "lblReviewKey": {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.AmendmentReference", true),
                },
                "lblReviewValue": {
                    text: amendmentResponse.amendmentReference ? presenter.getDynamicData(amendmentResponse, 'amendmentReference') : NA,
                }
            },{
                "lblReviewKey": {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.courierTrackingDetails", true),
                    isVisible: (amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.APPROVED || amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.REJECTED) ? true : false
                },
                "lblReviewValue": {
                      text: amendmentResponse.courierTrackingDetails ? presenter.getDynamicData(amendmentResponse, 'courierTrackingDetails') : NA,
                      isVisible: (amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.APPROVED || amendmentResponse.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.REJECTED) ? true : false
                }
            }]
          ]
        ];
      } catch (err) {
        var errorObj = {
          "method": "processAmendmentOverview",
          "error": err
        };
        scope.onError(errorObj);
      }
    },


    /**
     * @api :processAmendmentRequested
     * Processing Amendent Requested
     * @return : NA
     */
    processAmendmentRequested: function() {
      var scope = this;
      try {
        let docResponse = amendmentResponse.uploadDocuments ? amendmentResponse.uploadDocuments : NA;
        let tempDocResponse = "";
        if (docResponse !== NA) {
          docResponse = JSON.parse(amendmentResponse.uploadDocuments.replace(/'/g, "\""));
          docResponse.map((item, index) => {
            tempDocResponse = (tempDocResponse + item.documentName) + (docResponse.length - 1 === index ? '' : '\n');
          });
        } else {
          tempDocResponse = NA;
        }
        amendmentRequestedArray = [
          [{
              "lblAmendmentHeader": {
                text: amendmentResponse.cancellationStatus ? presenter.renderI18nKeys("i18n.TradeFinance.CancellationAmendmentRequested", false) : presenter.renderI18nKeys("i18n.TradeFinance.amendmentRequested", false),
                skin: "ICSknlbl424242SSP15pxSemibold"
              }
            }, // Section Header Template
            [{
              "lblReviewKey": amendmentResponse.cancellationStatus ? presenter.renderI18nKeys("i18n.TradeFinance.UploadedSupportingDocuments", true) : presenter.renderI18nKeys("i18n.TradeFinance.documentNumber", true),
              "lblReviewValue": (amendmentResponse.cancellationStatus && amendmentResponse.uploadDocuments) ? tempDocResponse : amendmentResponse.documentNo ? presenter.getDynamicData(amendmentResponse, 'documentNo') : NA
            }, {
              "lblReviewKey": amendmentResponse.cancellationStatus ? presenter.renderI18nKeys("i18n.TradeFinance.MessageOrResponseToBank", true) : presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
              "lblReviewValue": (amendmentResponse.cancellationStatus && amendmentResponse.messageToBank) ? presenter.getDynamicData(amendmentResponse, 'messageToBank') : amendmentResponse.amendTenorType ? presenter.getDynamicData(amendmentResponse, 'amendTenorType') : NA
            }, {
              "lblReviewKey": {
                text: presenter.renderI18nKeys("i18n.TradeFinance.usanceDays", true),
                isVisible: amendmentResponse.cancellationStatus ? false : true
              },
              "lblReviewValue": {
                text: amendmentResponse.usanceDays ? presenter.getDynamicData(amendmentResponse, 'usanceDays') : NA,
                isVisible: amendmentResponse.cancellationStatus ? false : true
              }
            }, {
              "lblReviewKey": {
                text: presenter.renderI18nKeys("i18n.TradeFinance.usanceDetails", true),
                isVisible: amendmentResponse.cancellationStatus ? false : true
              },
              "lblReviewValue": {
                text: amendmentResponse.usanceDetails ? presenter.getDynamicData(amendmentResponse, 'usanceDetails') : NA,
                isVisible: amendmentResponse.cancellationStatus ? false : true
              }
            }, {
              "lblReviewKey": {
                text: presenter.renderI18nKeys("i18n.TradeFinance.allowUserAcceptance", true),
                isVisible: amendmentResponse.cancellationStatus ? false : true
              },
              "lblReviewValue": {
                text: amendmentResponse.allowUsanceAcceptance ? presenter.getDynamicData(amendmentResponse, 'allowUsanceAcceptance') : NA,
                isVisible: amendmentResponse.cancellationStatus ? false : true
              }
            }]
          ]
        ];
      } catch (err) {
        var errorObj = {
          "method": "processAmendmentRequested",
          "error": err
        };
        scope.onError(errorObj);
      }
    },


    /**
     * @api :processAmountAndAccountDetails
     * Processing Amount and Account Details
     * @return : NA
     */
    processAmountAndAccountDetails: function() {
      var scope = this;
      try {
        amountAndAccountDetailsArray = [
          [{
              "lblAmendmentHeader": presenter.renderI18nKeys("i18n.TradeFinance.AmountAccountDetails", false),
              skin: "ICSknlbl424242SSP15pxSemibold"
            }, // Section Header Template
            [{
              "lblReviewKey": presenter.renderI18nKeys("i18n.ChequeManagement.Amount", false),
              "lblReviewValue": (amendmentResponse.amount && amendmentResponse.currency) ? amendmentResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(amendmentResponse.amount) : NA
            }, {
              "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.amountCreditAccount", true),
              "lblReviewValue": amendmentResponse.creditAccount ? presenter.getAccountDisplayName(amendmentResponse.creditAccount) : NA
            }, {
              "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.ChargesDebitAccount", true),
              "lblReviewValue": amendmentResponse.chargesDebitAccount ? presenter.getAccountDisplayName(amendmentResponse.chargesDebitAccount) : NA
            }]
          ]
        ];
      } catch (err) {
        var errorObj = {
          "method": "processAmountAndAccountDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },



    /**
     * @api :processDocumentAndBankInstruction
     * Processing Document and Bank Instructions
     * @return : NA
     */
    processDocumentAndBankInstruction: function() {
      var scope = this;
      try {
        let docResponse = amendmentResponse.uploadDocuments ? amendmentResponse.uploadDocuments : NA;
        let tempDocResponse = "";
        if (docResponse !== NA) {
          docResponse = JSON.parse(amendmentResponse.uploadDocuments.replace(/'/g, "\""));
          docResponse.map((item, index) => {
            tempDocResponse = (tempDocResponse + item.documentName) + (docResponse.length - 1 === index ? '' : '\n');
          });
        } else {
          tempDocResponse = NA;
        }
        documentAndBankInstructionsArray = [
          [{
              "lblAmendmentHeader": presenter.renderI18nKeys("i18n.TradeFinance.documentsAndBankInstruction", false),
              skin: "ICSknlbl424242SSP15pxSemibold"
            }, // Section Header Template
            [{
              "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.UploadedDocuments", true),
              "lblReviewValue": tempDocResponse
            }, {
              "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.PhysicalDocumentDetails", true),
              "lblReviewValue": amendmentResponse.physicalDocuments ? presenter.getPhysicalDocumentCount(amendmentResponse.physicalDocuments) : NA
            }, {
              "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.otherCollectionDetails", true),
              "lblReviewValue": amendmentResponse.otherCollectionDetails ? presenter.getDynamicData(amendmentResponse, 'otherCollectionDetails') : NA
            }, {
              "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.MessageToBankDrawings", true),
              "lblReviewValue": amendmentResponse.messageToBank ? presenter.getDynamicData(amendmentResponse, 'messageToBank') : NA
            }]
          ]
        ];
      } catch (err) {
        var errorObj = {
          "method": "processDocumentAndBankInstruction",
          "error": err
        };
        scope.onError(errorObj);
      }
    },



    /**
     * @api :appendResponses
     * Combining all responses and showing in UI based on response
     * @return : NA
     */
    appendResponses: function() {
      var scope = this;
      try {
        if (amendmentResponse.cancellationStatus) {
          scope.processCollectionSummary();
          scope.processAmendmentOverview();
          scope.processAmendmentRequested();
          amountAndAccountDetailsArray = [];
          documentAndBankInstructionsArray = [];

        } else {
          scope.processCollectionSummary();
          scope.processAmendmentOverview();
          scope.processAmendmentRequested();
          scope.processAmountAndAccountDetails();
          scope.processDocumentAndBankInstruction();
        }
        let printSegData = [
          ...collectionSummaryArray,
          ...amendmentOverviewArray,
          ...amendmentRequestedArray,
          ...amountAndAccountDetailsArray,
          ...documentAndBankInstructionsArray
        ];
        scope.view.segAmendmentOverview.setData(printSegData);
      } catch (err) {
        var errorObj = {
          "method": "appendResponses",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @arg: err - object based on error
     * @return : NA
     */
    onError: function(err) {
      let errMsg = JSON.stringify(err);
      errMsg.level = "frmOutwardCollectionAmendmentPrint";
      // kony.ui.Alert(errMsg);
    },
  };
});