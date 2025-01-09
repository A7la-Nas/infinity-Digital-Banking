define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let contentScope, popupScope;
  let amendmentResponse;
  let collectionResponse;
  let outwardcollection_status;
  let collectionOverViewArray = [],
    paymentStatusArray = [],
    draweeConsentArray = [],
    collectionDetailsArray = [],
    draweeAndBankDetailsArray = [],
    documentAndBankInstructionArray = [];
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let isTablet = false;
  return {

    /**
     * Sets the initial actions for form
     */
    init: function() {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
    },

    /**
     * @api : preShow
     * This function responsible for actions before rendering Ui
     * @return : NA
     */
    preShow: function() {
      var scope = this;
      try {
        scope.segViewDetailsTempData = "";
        outwardcollection_status = this.presenter.collectionStatusConfig;
        popupScope.flxMainViewContainer.doLayout = CommonUtilities.centerPopupFlex;
        scope.setsegCollectionDetails();
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentAcknowledgement",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : postShow
     * This function responsible for actions after rendering Ui
     * @return : NA
     */
    postShow: function() {
      var scope = this;
      try {
        contentScope.btnViewAllAmendments.onClick = scope.navigateToDashboard.bind(this, contentScope.btnViewAllAmendments.text);
        contentScope.btnViewAllCollections.onClick = scope.navigateToDashboard.bind(this, contentScope.btnViewAllCollections.text);
        contentScope.flxClear.onClick = function() {
          contentScope.flxAcknowledgementMessage.setVisibility(false);
        };
        popupScope.flxReturnedSearchClose.onClick = scope.showViewHistoryPopup.bind(this, false);
        contentScope.btnViewDetails.onClick = scope.appendResponses.bind(this);
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentAcknowledgement",
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
          } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
              isTablet = false;
          }
      } catch (err) {
          var errorObj = {
              "method": "onBreakpointChange",
              "error": err
          };
          scope.onError(errorObj);
      }
    },

    /**
     * @api : onNavigate
     * This function to set UI when landing on screen.
     * @return : NA
     */
    onNavigate: function(data) {
      var scope = this;
      this.presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeFinanceMA',
        'moduleName': 'OutwardCollectionsUIModule'
      });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      amendmentResponse = data.outwardAmendment;
      collectionResponse = data.collectionData;
      scope.setCollectionDetails();
      scope.setAcknowledgementUI(true);
    },

    /**
     * @api : setAcknowledgementUI
     * This function to set UI based on the service response.
     * @return : NA
     */
    setAcknowledgementUI: function(param) {
      var scope = this;
      try {
        scope.view.formTemplate12.pageTitle =
          collectionResponse.isReviseFlow ? kony.i18n.getCurrentLocale() === 'ar_AE' ? scope.presenter.renderI18nKeys("i18n.konybb.common.Acknowledgement", false) + "-" + scope.presenter.renderI18nKeys("i18n.TradeFinance.reviseAmendment", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) :
          scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.reviseAmendment", false) + " - " + scope.presenter.renderI18nKeys("i18n.konybb.common.Acknowledgement", false) :
          amendmentResponse.cancellationStatus === "Requested" || amendmentResponse.cancellationStatus === scope.presenter.collectionStatusConfig.Approved ?
          kony.i18n.getCurrentLocale() === 'ar_AE' ? scope.presenter.renderI18nKeys("i18n.konybb.common.Acknowledgement", false) + "-" + scope.presenter.renderI18nKeys("i18n.TradeFinance.RequestCancellation", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) :
          scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.RequestCancellation", false) + " - " + scope.presenter.renderI18nKeys("i18n.konybb.common.Acknowledgement", false) :
          kony.i18n.getCurrentLocale() === 'ar_AE' ? scope.presenter.renderI18nKeys("i18n.konybb.common.Acknowledgement", false) + "-" + scope.presenter.renderI18nKeys("i18n.TradeFinance.CreateNewAmendment", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) :
          scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollection", false) + " - " + scope.presenter.renderI18nKeys("i18n.TradeFinance.CreateNewAmendment", false) + " - " + scope.presenter.renderI18nKeys("i18n.konybb.common.Acknowledgement", false);
        contentScope.lblMessage.text = amendmentResponse.cancellationStatus === "Requested" || amendmentResponse.cancellationStatus === scope.presenter.collectionStatusConfig.Approved ? scope.presenter.renderI18nKeys("i18n.TradeFinance.cancellationRequestAcknowledgementMessage", false) : collectionResponse.isReviseFlow ? scope.presenter.renderI18nKeys("i18n.TradeFinance.revisedAmendmentAcknowledgementMessage", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.amendmentRequestSuccessMessage", false);
        contentScope.flxAcknowledgementMessage.setVisibility(param);
        scope.setAmendmentRequestedDetails();
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentAcknowledgement",
          "method": "setAcknowledgementUI",
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
        contentScope.lblAmountValue.text = collectionResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(collectionResponse.amount) || NA;
        contentScope.lblTenorTypeValue.text = collectionResponse.tenorType || NA;
        contentScope.lblMaturityDateValue.text = CommonUtilities.getFrontendDateString(collectionResponse.maturityDate,applicationManager.getConfigurationManager().frontendDateFormat) || NA;
        contentScope.lblCollectingBankDetailsValue.text = collectionResponse.collectingBank || NA;
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentAcknowledgement",
          "method": "setCollectionDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : navigateToDashboard
     * This function responsible for navigating to dashboard screens
     * @return : NA
     */
    navigateToDashboard: function(param) {
      var scope = this;
      try {
        scope.presenter.showOutwardCollectionScreen({
          context: 'outwardCollectionAmendmentDashboard',
          form: scope.view.id,
          data: {
            flowType: param
          }
        });
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentAcknowledgement",
          "method": "navigateToDashboard",
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
        scope.setsegAmendmentOverviewWidgetDataMap("segAmendmentOverview");
        let AmendmentRequestedDetails = [];
        let returnedHistory = amendmentResponse.returnedHistory ? JSON.parse(amendmentResponse.returnedHistory) : NA;
        let section1 = [{
            lblTransactionHeader: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.amendmentOverview", false),
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
              text: scope.presenter.renderI18nKeys("i18n.serviceRequests.Status:", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentResponse.status || NA,
              isVisible: true,
              skin: "ICSknlbl424242SSP15pxSemibold",
              width: '150dp',
            },
            btnViewHistory: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.viewHistory", false) + " (" + returnedHistory.length + ")",
              isVisible: returnedHistory !== NA ? returnedHistory.length >= 1 ? true : false : false,
              onClick: scope.showViewHistoryPopup.bind(this, true)
            }
          },{
            lblReview: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturnedWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentResponse.reasonForReturn || NA
            },
            flxreviewRows: {
              isVisible: collectionResponse.isReviseFlow ? true :  false
            }
          },{
            lblReview: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.updatedOn", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: CommonUtilities.getFrontendDateString(amendmentResponse.updatedOn, applicationManager.getConfigurationManager().frontendDateFormat) || NA
            },
            flxreviewRows: {
              isVisible: collectionResponse.isReviseFlow ? true :  false
            }
          }, {
            lblReview: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.CancellationStatus", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentResponse.cancellationStatus,
              isVisible: true
            },
            flxreviewRows: {
              isVisible: amendmentResponse.cancellationStatus === "Requested" || amendmentResponse.cancellationStatus === scope.presenter.collectionStatusConfig.Approved ? true : false
            }
          }, {
            lblReview: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNumber", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentResponse.amendmentNo || "1",
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.requestedOn", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: CommonUtilities.getFrontendDateString(amendmentResponse.requestedOn, applicationManager.getConfigurationManager().frontendDateFormat) || NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentReference", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentResponse.amendmentReference || NA,
              isVisible: true
            },
            flxBottomSeparator: {
              isVisible: false
            }
          }]
        ];
        AmendmentRequestedDetails.push(section1);
        if (amendmentResponse.cancellationStatus === "Requested" || amendmentResponse.cancellationStatus === scope.presenter.collectionStatusConfig.Approved) {
          let section2 = [{
              lblTransactionHeader: {
                text: this.presenter.renderI18nKeys("i18n.TradeFinance.CancellationAmendmentRequested", false),
                left: "20dp"
              },
              "flxSeparator2": {
                isVisible: false
              },
              "flxDropDown": {
                isVisible: false
              },
              "flxReviewHeader": {
                top: "20dp"
              }
            },
            []
          ];
          let documentsList = amendmentResponse.uploadDocuments ? JSON.parse(amendmentResponse.uploadDocuments) : "";
          if (documentsList.length > 0) {
            for (let i = 0; i < documentsList.length; i++) {
              data = {
                lblReview: {
                  text: i === 0 ? this.presenter.renderI18nKeys("i18n.TradeFinance.uploadedDocumentsWithColon", false) : ""
                },
                lblReviewValue1: {
                  text: documentsList[i].documentName,
                  width: '350dp'
                },
                flxreviewRows: {
                  isVisible: documentsList.length > 0 ? true : false,
                  top: "20dp"
                }
              }
              section2[1].push(data);
            }
          } else {
            data = {
              lblReview: {
                text: this.presenter.renderI18nKeys("i18n.TradeFinance.uploadedDocumentsWithColon", false)
              },
              lblReviewValue1: {
                text: NA
              }
            }
            section2[1].push(data);
          }
          let cancellationMessageData = {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.messageToBankWithColon", false),
            },
            lblReviewValue1: {
              text: amendmentResponse.messageToBank || NA
            },
            flxBottomSeparator: {
              isVisible: true,
              height: "20dp",
              skin: "slFbox"
            }
          }
          section2[1].push(cancellationMessageData);
          AmendmentRequestedDetails.push(section2);
        } else {
          let section2 = [{
              lblTransactionHeader: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.amendmentRequested", false),
                left: "20dp"
              },
              "flxSeparator1": {
                isVisible: true,
                width: "100%"
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
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.documentNumberWithColon", false),
                isVisible: true
              },
              lblReviewValue1: {
                text: amendmentResponse.documentNo || NA,
                isVisible: true
              }
            }, {
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
                isVisible: true
              },
              lblReviewValue1: {
                text: amendmentResponse.tenorType || NA,
                isVisible: true
              }
            }, {
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDays", true),
                isVisible: true
              },
              lblReviewValue1: {
                text: amendmentResponse.usanceDays || NA,
                isVisible: true
              }
            }, {
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetailsWithColon", false),
                isVisible: true
              },
              lblReviewValue1: {
                text: amendmentResponse.usanceDetails || NA,
                isVisible: true
              }
            }, {
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.allowUserAcceptance", true),
                isVisible: true
              },
              lblReviewValue1: {
                text: amendmentResponse.allowUsanceAcceptance || NA,
                isVisible: true
              },
              flxBottomSeparator: {
                isVisible: false
              }
            }]
          ];
          AmendmentRequestedDetails.push(section2);
          let section3 = [{
              lblTransactionHeader: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.AmountAccountDetails", false),
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
                text: scope.presenter.renderI18nKeys("i18n.wealth.amountColon", false),
                isVisible: true
              },
              lblReviewValue1: {
                text: amendmentResponse.amount ? amendmentResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(amendmentResponse.amount) : NA,
                isVisible: true
              },
              flxreviewRows: {
                top: "0dp"
              }
            }, {
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.amountCreditAccount", true),
                isVisible: true
              },
              lblReviewValue1: {
                text: scope.getAccountDisplayName(amendmentResponse.creditAccount) || NA,
                isVisible: true
              }
            }, {
              lblReview: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitAccountWithColon", false),
                isVisible: true
              },
              lblReviewValue1: {
                text: scope.getAccountDisplayName(amendmentResponse.chargesDebitAccount) || NA,
                isVisible: true
              },
              flxBottomSeparator: {
                isVisible: true,
                height: "10dp",
                skin: "slFbox"
              }
            }]
          ];
          AmendmentRequestedDetails.push(section3);
          let section4 = [{
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
          let documentsList = amendmentResponse.uploadDocuments ? JSON.parse(amendmentResponse.uploadDocuments) : "";
          if (documentsList.length > 0) {
            for (let i = 0; i < documentsList.length; i++) {
              data = {
                lblReview: {
                  text: i === 0 ? this.presenter.renderI18nKeys("i18n.TradeFinance.uploadedDocumentsWithColon", false) : ""
                },
                lblReviewValue1: {
                  text: documentsList[i].documentName,
                  width: '350dp'
                },
                flxreviewRows: {
                  isVisible: documentsList.length > 0 ? true : false,
                  top: "0dp"
                }
              }
              section4[1].push(data);
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
            section4[1].push(data);
          }

          let physicalDocumentsDetails = amendmentResponse.physicalDocuments ? JSON.parse(amendmentResponse.physicalDocuments) : "";
          let physicalData;
          if (physicalDocumentsDetails.length > 0) {
            for (let i = 0; i < physicalDocumentsDetails.length; i++) {
              physicalData = {
                lblReview: {
                  text: i === 0 ? this.presenter.renderI18nKeys("i18n.TradeFinance.physicalDocumentDetailsWithColon", false) : ""
                },
                lblReviewValue1: {
                  text: physicalDocumentsDetails[0].documentTitle + " (" + physicalDocumentsDetails[0].originalsCount + "," + physicalDocumentsDetails[0].copiesCount + ")",
                  width: '350dp'
                },
                flxreviewRows: {
                  isVisible: physicalDocumentsDetails.length > 0 ? true : false
                }
              }
              section4[1].push(physicalData);
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
            section4[1].push(physicalData);
          }

          AmendmentRequestedDetails.push(section4);
          let otherCollectionDetails = {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.otherCollectionDetails", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentResponse.otherCollectionDetails || NA
            }
          };
          section4[1].push(otherCollectionDetails);
          let messageFromBank = {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.messageToBankWithColon", false),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentResponse.messageToBank || NA,
              isVisible: true,
              width: "100%"
            },
            flxBottomSeparator: {
              isVisible: true,
              height: "20dp",
              skin: "slFbox"
            }
          };
          section4[1].push(messageFromBank);
        }
        contentScope.segAmendmentOverview.setData(AmendmentRequestedDetails);
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentAcknowledgement",
          "method": "setAmendmentRequestedDetails",
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
      var segScope;
      try {
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        var orientationHandler = new OrientationHandler();
        if (segName === "segReturnedByBank") {
          segScope = popupScope;
        } else {
          segScope = contentScope;
        }
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          segScope[segName].rowTemplate = "flxAmendRowTemplateTablet";
        } else {
          segScope[segName].rowTemplate = "flxAmendRowTemplate";
        }
        segScope[segName].sectionHeaderTemplate = "flxReviewHeader";
        segScope[segName].widgetDataMap = {
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
          "lblDaysLeft": "lblDaysLeft",
          "flxReviewRows": "flxReviewRows",
          "btnViewHistory": "btnViewHistory"
        };
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentAcknowledgement",
          "method": "setsegAmendmentOverviewWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api :showViewHistoryPopup: function(show) {
     * This function for showing view history popup
     * @return : NA
     */
    showViewHistoryPopup: function(show) {
      var scope = this;
      show = !kony.sdk.isNullOrUndefined(show) ? show : true;
      popupScope.setVisibility(show);
      popupScope.skin = "sknBackground000000Op35";
      popupScope.flxMainReturnedPopup.top = "80dp";
      popupScope.flxViewCollectionDetailsPopup.setVisibility(false);
      popupScope.flxReturnedByBankPopup.setVisibility(show);
      scope.setReturnByBankData();
    },

    /**
     * @api : setReturnByBankData
     * This function for setting data in returnByBank popup
     * @return : NA
     */
    setReturnByBankData: function() {
      var scope = this;
      try {
        scope.setsegAmendmentOverviewWidgetDataMap("segReturnedByBank");
        let amendHistory = JSON.parse(amendmentResponse.returnedHistory);
        let totalHistory = amendHistory.length;
        popupScope.lblReturnedByBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank") + "(" + totalHistory + ")";
        let ReturnedByBankData = [];
        for (let i = 0; i < totalHistory; i++) {
          let data = {
            lblReturnBank: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank") + "(" + (i + 1) + ")"
            },
            lblReturnDate: {
              text: amendHistory[i].returnedTimeStamp ? `${ applicationManager.getFormatUtilManager().getFormattedCalendarDate(amendHistory[i].returnedTimeStamp)}, ${new Date(amendHistory[i].returnedTimeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}` : NA,
            },
            lblReasonReturn: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForReturned")
            },
            lblRightValue: {
              text: amendHistory[i].reasonForReturn ? amendHistory[i].reasonForReturn : NA
            },
            lblReasonReturn02: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnMessagetoBank")
            },
            lblRightValue02: {
              text: amendHistory[i].messageToBank ? amendHistory[i].messageToBank : NA
            },
            lblReasonReturn03: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.CorporateUserName")
            },
            lblRightValue03: {
              text: amendHistory[i].corporateUserName ? amendHistory[i].corporateUserName : NA
            },
            flxSeparatorReturnTop03: {
              isVisible: true
            },
            template: "flxReturnedByBank"
          }
          ReturnedByBankData.push(data);
        }
        popupScope.segReturnedByBank.setData(ReturnedByBankData);
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentAcknowledgement",
          "method": "setReturnByBankData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : getAccountDisplayName
     * This function for getting accounts displaying name for UI
     * @param : name of the segment.
     * @return : NA
     */
    getAccountDisplayName: function(selectedAccountId) {
      var scope = this;
      try {
        const accounts = applicationManager.getAccountManager().getInternalAccounts();
        for (const account of accounts) {
          if (account.accountID === selectedAccountId) {
            return CommonUtilities.getAccountDisplayName(account);
          }
        }
        return kony.i18n.getLocalizedString("i18n.common.NA");
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentAcknowledgement",
          "method": "getAccountDisplayName",
          "error": err
        };
        scope.onError(errorObj);
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