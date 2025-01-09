define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let contentScope, buttonScope, popupScope, formTemplateScope;
  let collectionData, amendmentData;
  let swiftsAdvicesData = {};
  let paymentAdvices;
  let swiftMessages;
  let outwardcollection_status;
  let collectionOverViewArray = [],
    paymentStatusArray = [],
    draweeConsentArray = [],
    collectionDetailsArray = [],
    draweeAndBankDetailsArray = [],
    documentAndBankInstructionArray = [];
  let viewAllAmendments = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllAmendments");
  let isTablet = false;
  let isTabletBp = false;
  return {
    /**
     * @api : init
     * This function for executing the lines of code only once
     * @return : NA
     */
    init: function() {
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
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
      collectionData = this.presenter.collectionResponse;
      amendmentData = this.presenter.amendmentResponse;
      previousForm = this.presenter.previousFormName;
      formTemplateScope = this.view.formTemplate12;
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      buttonScope = this.view.formTemplate12.flxTCButtons;
      popupScope = this.view.formTemplate12.flxContentPopup;
      scope.setDefaultUI();
      this.presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeFinanceMA',
        'moduleName': 'OutwardCollectionsUIModule'
      });
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
        scope.setCollectionDetails();
        popupScope.flxMainReturnedPopup.doLayout = CommonUtilities.centerPopupFlex;
        popupScope.flxSwiftMessagesPopupContent.doLayout = CommonUtilities.centerPopupFlex;
        popupScope.flxMainViewContainer.doLayout = CommonUtilities.centerPopupFlex;
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentViewDetailsController",
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
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          isTabletBp = true;
        } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
          isTabletBp = false;
        }
          let swiftAdvicesPayload = {
              'orderId': amendmentData.amendmentReference,
              'product': 'Collection'
          };
        scope.setSegementData();
        scope.initButtonActions();
        buttonScope.flxVerticalEllipsisDropdown.setVisibility(false);
        this.presenter.fetchSwiftsAdvices(swiftAdvicesPayload, 'frmOutwardCollectionsAmendmentViewDetails');
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentViewDetailsController",
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
          "level": "frmOutwardCollectionsAmendmentViewDetailsController",
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
        if (viewModel.serverError) {
          contentScope.imgAcknowledgement.src = 'failed_icon.png';
          contentScope.lblMessage.text = viewModel.serverError;
          contentScope.flxAcknowledgementMessage.setVisibility(true);
        }
        if (viewModel.fetchSwiftsAdvices) {
            swiftsAdvicesData = viewModel.fetchSwiftsAdvices;
            scope.renderSwiftAdvice();
        }
        if (viewModel.fetchFileResponse) {
            popupScope.setVisibility(true);
            popupScope.flxSwiftDetailsPopup.setVisibility(true);
            popupScope.richTextArea1.text = viewModel.fetchFileResponse;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentViewDetailsController",
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
        contentScope.btnViewDetails.onClick = scope.showPopup.bind(this, "collectionPopup", true);
        popupScope.flxCrossSBLC.onClick = scope.showPopup.bind(this, "collectionPopup", false);
        popupScope.flxReturnedSearchClose.onClick = scope.showPopup.bind(this, "viewHistory", false);
        contentScope.btnRevise.onClick = scope.navigateToForm.bind(this, "revise");
        contentScope.btnback.onClick = scope.navigateToForm.bind(this, "back");
        buttonScope.lblVerticalEllipsis.onTouchEnd = () => {
          if(buttonScope.flxVerticalEllipsisDropdown.isVisible) {
            buttonScope.flxVerticalEllipsisDropdown.setVisibility(false);
          }
          else {
            buttonScope.flxVerticalEllipsisDropdown.setVisibility(true);
          }
        };
        buttonScope.flxVerticalEllipsis.onClick = this.renderPrintAndDownload.bind(this);
        buttonScope.btnSwiftAndAdvices.onClick = () => {
            buttonScope.flxSwiftAndAdvices.isVisible ? buttonScope.flxSwiftAndAdvices.setVisibility(false) : buttonScope.flxSwiftAndAdvices.setVisibility(true);
        };
        popupScope.btnSwiftMessageClose.onClick = () => {
            popupScope.setVisibility(false);
            popupScope.flxSwiftDetailsPopup.setVisibility(false);
        };
        this.presenter.cursorTypePointer([
            popupScope.flxDownloadIcons,
        ]);
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentViewDetailsController",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : navigateToForm
     * This function for navigating to other forms.
     * @return : NA
     */
    navigateToForm: function (param) {
      var scope = this;
      let navParams = {};
      this.navManager = applicationManager.getNavigationManager();
      let formName;
      switch (param) {
        case "back":
          {
            navParams["amendmentResponse"] = amendmentData;
            navParams["collectionResponse"] = collectionData;
            navParams["previousForm"] = previousForm;
            navParams["flowType"] = viewAllAmendments;
          if (previousForm === "frmOutwardCollectionDashboard" || previousForm === "frmOutwardCollectionsAmendmentViewDetails") {
            this.presenter.showOutwardCollectionScreen({
                context: "outwardCollectionAmendmentDashboard",
                form: scope.view.id,
                data: navParams
            });
          } else {
                formName = previousForm;
                this.navManager.navigateTo({
                  appName: "TradeFinanceMA",
                  friendlyName: formName
              }, false, navParams);
          }
          break;
        }
        case "revise": {
          navParams.context = "reviseAmendment"
          navParams.data = {
            amendmentData: amendmentData,
            collectionData: collectionData,
            isReviseFlow: true
          };
          break;
        }
      }
      scope.presenter.showOutwardCollectionScreen(navParams);
    },

    /**
     * @api : showPopup
     * This function for showing and closing different popups.
     * @return : NA
     */
    showPopup: function(param, show) {
      var scope = this;
      show = !kony.sdk.isNullOrUndefined(show) ? show : true;
      popupScope.setVisibility(show);
      popupScope.skin = "sknBackground000000Op35";
      popupScope.flxSwiftDetailsPopup.setVisibility(false);
      popupScope.flxConfirmPopup.setVisibility(false);
      popupScope.flxViewSBLCDetailsPopup.setVisibility(false);
      popupScope.flxPaymentAdvicePopup.setVisibility(false);

      switch (param) {
        case "confirm": {
          popupScope.flxConfirmPopup.setVisibility(show);
          break;
        }
        case "collectionPopup": {
          popupScope.skin = "slFbox";
          popupScope.flxViewSBLCDetailsPopup.setVisibility(show);
          show ? scope.appendResponses() : "";
          break;
        }
        case "paymentAdvice": {
          popupScope.flxPaymentAdvicePopup.setVisibility(show);
          break;
        }
        case "swiftDetails": {
          popupScope.flxSwiftDetailsPopup.setVisibility(show);
          break;
        }
        case "viewHistory": {
          popupScope.flxReturnedByBankPopup.setVisibility(show);
          scope.setReturnByBankData();
          break;
        }

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
        let cancellationText = this.presenter.isEmptyNullOrUndefined(amendmentData.cancellationStatus) ? kony.i18n.getLocalizedString("i18n.TradeFinance.Amendment") : kony.i18n.getLocalizedString("i18n.TradeFinance.CancellationAmendment");
        formTemplateScope.pageTitle = kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") +  "-" + cancellationText + " - " + amendmentData.amendmentReference;
        amendmentData.status === this.presenter.collectionStatusConfig["Returned by Bank"] && this.presenter.isEmptyNullOrUndefined(amendmentData.cancellationStatus) ? contentScope.btnRevise.setVisibility(true) : contentScope.btnRevise.setVisibility(false) ;
        popupScope.flxConfirmPopup.setVisibility(false);
        popupScope.flxViewSBLCDetailsPopup.setVisibility(false);
        popupScope.flxPaymentAdvicePopup.setVisibility(false);
        popupScope.flxSwiftDetailsPopup.setVisibility(false);
        contentScope.lblSumaryHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.collectionSummary");;
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentViewDetailsController",
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

    renderPrintAndDownload: function () {
      var scope = this;
      try {
        buttonScope.segVerticalDropdownEllipsis.widgetDataMap = {
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
        buttonScope.segVerticalDropdownEllipsis.setData(masterData);
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
          if (amendmentData.status.toLowerCase() === (OLBConstants.OUTWARD_COLLECTION_AMENDMENTS_STATUS.APPROVED).toLowerCase()) {
            return true;
          } else {
            return false;
          }
        }
        if (isTabletBp && id == 'print') {
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
    onPrintAndDownloadRowClick: function (id) {
      var scope = this;
      try {
        buttonScope.flxVerticalEllipsisDropdown.setVisibility(false);
        if (id == 'download') {
          scope.presenter.generateOutwardAmendments({
            "amendmentReference": amendmentData.amendmentReference
          }, "frmOutwardCollectionsAmendmentViewDetails");
        } else if (id == 'print') {
          scope.presenter.showOutwardCollectionScreen({
            context: "amendmentPrint",
            form: scope.view.id,
            data: amendmentData
          });
        } else if (id == 'raiseQuery') {
          let record = amendmentData;
          let queryObj = {};
          let formatUtilManager = applicationManager.getFormatUtilManager();
          queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${record.collectionReference}`;
          queryObj.descriptionObj = {};
          record.maturityDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.accountDetail.maturityDate")] = this.presenter.getConvertedDate(record, 'maturityDate'));
          record.amount && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.ChequeManagement.Amount")] = record.amount ? applicationManager.getFormatUtilManager().formatAmount(record.amount) : NA);
          record.draweeName && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.drawerDetails")] = record.draweeName);
          record.remittingBank && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.remittingBank")] = record.remittingBank);
          record.amendTenorType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.tenorType")] = record.amendTenorType);
          queryObj.tradeModule = true;
          scope.presenter.showMessagesScreen(queryObj);
        }
      } catch (err) {
        var errorObj = {
          "method": "onPrintAndDownloadRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
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
          "level": "frmOutwardCollectionsAmendmentViewDetailsController",
          "method": "setCollectionDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setsegCollectionDetails
     * this function responsible for setting segment for collection details
     * @return : NA
     */
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
        } else if (collectionData.status === outwardcollection_status['Approved']) {
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
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.acceptance", true),
                "lblValue": collectionData.draweeAcceptance ? scope.presenter.getDynamicData(collectionData, 'draweeAcceptance') : NA,
              },
              {
                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.billOfExchangeSigned", true),
                "lblValue": collectionData.isBillExchangeSigned ? scope.presenter.getDynamicData(collectionData, 'isBillExchangeSigned') : NA
              }
            ]
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
                "lblValue": tempDocResponse
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
            },]
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
     * @api : setSegAmendmentWidgetDataMap
     * This function for setting widgetDataMap for segment
     * @param : name of the segment.
     * @return : NA
     */
    setSegAmendmentWidgetDataMap: function(segName) {
      var scope = this;
      try {
        let segScope;
        var breakpoint = kony.application.getCurrentBreakpoint();
        var orientationHandler = new OrientationHandler();
        if (segName === "segDetails" || segName === "segReturnedByBank") {
          segScope = popupScope;
        } else {
          segScope = contentScope;
        }
        if (breakpoint === 1024 || orientationHandler.isTablet) {
          segScope[segName].rowTemplate = "flxAmendRowTemplateTablet";
        } else {
          segScope[segName].rowTemplate = "flxCollectionAmendRowDetails";
        }
        segScope[segName].sectionHeaderTemplate = "flxReviewHeader";
        segScope[segName].widgetDataMap = {
          "flxAmendmentRowTemplate": "flxAmendmentRowTemplate",
          "flxCollectionAmendRowDetails": "flxCollectionAmendRowDetails",
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
          "level": "frmOutwardCollectionsAmendmentViewDetailsController",
          "method": "setSegAmendmentWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setSegementData
     * This function for setting segment data.
     * @return : NA
     */
    setSegementData: function() {
      var scope = this;
      try {
        let amendmentRequestedDetails = [];
        let docData = kony.sdk.isNullOrUndefined(amendmentData.uploadDocuments) || amendmentData.uploadDocuments === "" ? "" : JSON.parse(amendmentData.uploadDocuments.replace(/'/g, '"'));
        let returnedHistory = amendmentData.returnedHistory ? JSON.parse(amendmentData.returnedHistory) : NA;
        scope.setSegAmendmentWidgetDataMap("segAmendmentViewDetails");
        let returnedByBankCount = (amendmentData.status == this.presenter.collectionStatusConfig["Returned by Bank"]) ? " ("+ CommonUtilities.getOrdinalNumeral(amendmentData.amendmentNo)+")":"";
        let section1 = [{
            lblTransactionHeader: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.amendmentOverview", false)
            },
            "flxSeparator2": {
              isVisible: true,
              width: "100%",
              left: "0dp"
            },
            "flxDropDown": {
              isVisible: false
            },
            "flxReviewHeader": {
              skin: "slFbox"
            }
          },
          [{
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.serviceRequests.Status", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentData.status ? amendmentData.status + ""+ returnedByBankCount : NA,
              skin: "ICSknlbl424242SSP15pxSemibold",
			        width: returnedByBankCount!=="" ? '180dp':'150dp',
              isVisible: true
            },
            btnViewHistory: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.viewHistory",false) + " (" + returnedHistory.length + ")",
              isVisible: returnedHistory !== NA ? returnedHistory.length >= 1 ? true : false : false,
              onClick: scope.showPopup.bind(this,"viewHistory", true)
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejection", true),
              isVisible: amendmentData.status === this.presenter.collectionStatusConfig.Rejected ? true : false
            },
            lblReviewValue1: {
              text: amendmentData.reasonForRejection ? amendmentData.reasonForRejection : NA,
              skin: "ICSknlbl424242SSP15pxSemibold",
              isVisible: amendmentData.status === this.presenter.collectionStatusConfig.Rejected ? true : false
            },
            flxreviewRows: {
              isVisible: amendmentData.status === this.presenter.collectionStatusConfig.Rejected ? true : false
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.ReasonforReturn", true),
              isVisible: (amendmentData.status === this.presenter.collectionStatusConfig["Returned by Bank"] || (amendmentData.status === this.presenter.collectionStatusConfig["Submitted to Bank"] && amendmentData.hasOwnProperty("reasonForReturn"))) ? true : false
            },
            lblReviewValue1: {
              text: amendmentData.reasonForReturn ? amendmentData.reasonForReturn : NA,
              isVisible: (amendmentData.status === this.presenter.collectionStatusConfig["Returned by Bank"] || (amendmentData.status === this.presenter.collectionStatusConfig["Submitted to Bank"] && amendmentData.hasOwnProperty("reasonForReturn"))) ? true : false
            },
            flxreviewRows:{
                isVisible: (amendmentData.status === this.presenter.collectionStatusConfig["Returned by Bank"] || (amendmentData.status === this.presenter.collectionStatusConfig["Submitted to Bank"] && amendmentData.hasOwnProperty("reasonForReturn"))) ? true : false
            }
          },{
            lblReview: { 
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.updatedOn", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentData.updatedOn ? this.presenter.getConvertedDate(amendmentData, 'updatedOn') : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNo", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentData.amendmentNo ? amendmentData.amendmentNo : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.requestedOn", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentData.requestedOn ? this.presenter.getConvertedDate(amendmentData, 'requestedOn') : NA,
              isVisible: true
            }
          }, {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentReference", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentData.amendmentReference ? amendmentData.amendmentReference : NA,
              isVisible: true
            },
            flxreviewRows:{
                bottom: amendmentData.status === this.presenter.collectionStatusConfig.Approved || amendmentData.status === this.presenter.collectionStatusConfig.Rejected ? "0dp" : "20dp"
            }
          }, {
            lblReview: { 
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.courierTrackingDetails", true),
              isVisible: amendmentData.status === this.presenter.collectionStatusConfig.Approved || amendmentData.status === this.presenter.collectionStatusConfig.Rejected ? true : false
            },
            lblReviewValue1: {
              text: amendmentData.courierTrackingDetails ? amendmentData.courierTrackingDetails : NA,
              isVisible: amendmentData.status === this.presenter.collectionStatusConfig.Approved || amendmentData.status === this.presenter.collectionStatusConfig.Rejected ? true : false
            },
            flxreviewRows:{
                isVisible: amendmentData.status === this.presenter.collectionStatusConfig.Approved || amendmentData.status === this.presenter.collectionStatusConfig.Rejected ? true : false
            },
            flxCollectionAmendRowDetails: {
              height: amendmentData.status === this.presenter.collectionStatusConfig.Approved || amendmentData.status === this.presenter.collectionStatusConfig.Rejected ? "40dp" : "20dp"
            }
          }]
        ];
      
        amendmentRequestedDetails.push(section1);
        
        let section2 = [];
        if(amendmentData.cancellationStatus === "Requested" || amendmentData.cancellationStatus === scope.presenter.collectionStatusConfig.Approved){
            section2 =[{
            lblTransactionHeader: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.CancellationAmendmentRequested", false),
              skin: "ICSknlbl424242SSP15pxSemibold"
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
            "flxheaderWithDropdown": {
              "skin": "ICSknFlxF8F7F8"
            },
            "imgDropDown": "dropdown_collapse.png",
            "flxDropDown": {
              onClick: scope.onActionClick.bind(this, "segAmendmentViewDetails")
            }
          },[]
      ]
        }
        else{
              section2 = [{
              lblTransactionHeader: {
                text: this.presenter.renderI18nKeys("i18n.TradeFinance.amendmentRequested", false),
                skin: "ICSknlbl424242SSP15pxSemibold"
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
              "flxheaderWithDropdown": {
                "skin": "ICSknFlxF8F7F8"
              },
              "imgDropDown": "dropdown_collapse.png",
              "flxDropDown": {
                onClick: scope.onActionClick.bind(this, "segAmendmentViewDetails")
              }
            },
            [{
                lblReview: {
                  text: this.presenter.renderI18nKeys("i18n.TradeFinance.documentNumber", false),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: amendmentData.documentNo ? amendmentData.documentNo : NA,
                  isVisible: true
                }
              }, {
                lblReview: {
                  text: this.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: amendmentData.amendTenorType ? amendmentData.amendTenorType : NA,
                  isVisible: true
                }
              }, {
                lblReview: {
                  text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceDays", true),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: amendmentData.usanceDays ? amendmentData.usanceDays : NA,
                  isVisible: true
                }
              },
              {
                lblReview: {
                  text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetails", true),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: amendmentData.usanceDetails ? amendmentData.usanceDetails : NA,
                  isVisible: true
                },
                flxRowTemplateSeparator: {
                  isVisible: true
                }
              }, {
                lblReview: { 
                  text: this.presenter.renderI18nKeys("i18n.TradeFinance.allowUserAcceptance", true),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: amendmentData.allowUsanceAcceptance ? amendmentData.allowUsanceAcceptance : NA,
                  isVisible: true
                },
                flxRowTemplateSeparator: {
                  isVisible: true
                },
              }, {
                lblReview: { 
                  text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmountAccountDetails", false),
                  isVisible: true,
                  skin: "ICSknlbl424242SSP15pxSemibold"
                },
                lblReviewValue1: {
                  text: "",
                  isVisible: true
                },
                flxRowTemplateSeparator: {
                  isVisible: true
                },
              }, {
                lblReview: {
                  text: this.presenter.renderI18nKeys("i18n.wealth.amount", true),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: amendmentData.amount && amendmentData.currency ?  amendmentData.currency + " " + applicationManager.getFormatUtilManager().formatAmount(amendmentData.amount) : NA,
                  isVisible: true
                },
                flxRowTemplateSeparator: {
                  isVisible: true
                },
              }, {
                lblReview: { 
                  text: this.presenter.renderI18nKeys("i18n.TradeFinance.amountCreditAccount", true),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: amendmentData.creditAccount ? this.presenter.getAccountDisplayName(amendmentData.creditAccount) : NA,
                  isVisible: true
                },
                flxRowTemplateSeparator: {
                  isVisible: true
                },
              }, {
                lblReview: {
                  text: this.presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitAccountWithColon", false),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: amendmentData.chargesDebitAccount ? this.presenter.getAccountDisplayName(amendmentData.chargesDebitAccount) : NA,
                  isVisible: true
                },
                flxRowTemplateSeparator: {
                  isVisible: true
                },
              }, {
                lblReview: { 
                  text: this.presenter.renderI18nKeys("i18n.TradeFinance.documentsAndBankInstruction", false),
                  isVisible: true,
                  skin: "ICSknlbl424242SSP15pxSemibold"
                },
                lblReviewValue1: {
                  text: "",
                  isVisible: true
                },
                flxRowTemplateSeparator: {
                  isVisible: true
                },
              }
            ]
          ];
        }
        for (let i = 0; i < docData.length; i++) {
          data = {
            lblReviewLeft: {
              text: i == 0 ? this.presenter.renderI18nKeys("i18n.TradeFinance.UploadedDocuments", true) : "",
              left: "4dp"
            },
            lblDocumentName: {
              text: docData[i].documentName ? docData[i].documentName : NA,
              skin: "ICSknLbl424242SSPRegular15px"
            },
            flxreviewRows: {
              isVisible: docData.length > 0 ? true : false,
              left: "17dp"
            },
            flxDocument: {
              "left": isTablet ? "256dp" :"286dp"
            },
            imgDownloadIcon: {
              isVisible: true
            },
            template: "flxReviewUploadDocumentsRowTemplate"
          }
          section2[1].push(data);
        }
      
        if(scope.presenter.isEmptyNullOrUndefined(amendmentData.cancellationStatus)){
            data = {
                lblReview: {
                  text: this.presenter.renderI18nKeys("i18n.TradeFinance.PhysicalDocumentDetails", true),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: amendmentData.physicalDocuments ? this.presenter.getPhysicalDocumentCount(amendmentData.physicalDocuments) : NA,
                  isVisible: true
                },
                flxRowTemplateSeparator: {
                  isVisible: true
                },
              };
            section2[1].push(data);
        }
        if(scope.presenter.isEmptyNullOrUndefined(amendmentData.cancellationStatus)){
          let otherCollectionDetails = {
            lblReview: {
              text: this.presenter.renderI18nKeys("i18n.TradeFinance.otherCollectionDetails", true),
              isVisible: true
            },
            lblReviewValue1: {
              text: amendmentData.otherCollectionDetails ? amendmentData.otherCollectionDetails : NA,
              isVisible: true
            },
            flxRowTemplateSeparator: {
              isVisible: true
            }
          };
          section2[1].push(otherCollectionDetails);
        }

        let messageToBank = {
          lblReview: {
            text: this.presenter.renderI18nKeys("i18n.TradeFinance.MessageToBankDrawings", true),
            isVisible: true
          },
          lblReviewValue1: {
            text: amendmentData.messageToBank ? amendmentData.messageToBank : NA,
            isVisible: true
          },
          flxCollectionAmendRowDetails: {
            height: "63dp"
          },
          flxRowTemplateSeparator: {
            isVisible: true
          },
          flxreviewRows: {
            bottom: "20dp"
          }
        };
        section2[1].push(messageToBank);
        amendmentRequestedDetails.push(section2);
        contentScope.segAmendmentViewDetails.setData(amendmentRequestedDetails);
      
      } catch (err) {
        var errorObj = {
          "level": "frmOutwardCollectionsAmendmentViewDetailsController",
          "method": "setSegementData",
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
      try {
        scope.setSegAmendmentWidgetDataMap("segReturnedByBank");
        let amendHistory = JSON.parse(amendmentData.returnedHistory);
        let totalHistory = amendHistory.length;
        popupScope.lblReturnedByBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank") + "(" + totalHistory + ")";
        let ReturnedByBankData = [];
        for (let i = 0; i < totalHistory; i++) {
          let data = {
            lblReturnBank: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank") + "(" + (i+1) + ")"
            },
            lblReturnDate: {
              text: amendHistory[i].returnedTimeStamp ?  `${ applicationManager.getFormatUtilManager().getFormattedCalendarDate(amendHistory[i].returnedTimeStamp)}, ${new Date(amendHistory[i].returnedTimeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}` : NA,
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
          "level": "frmViewAmendmentDetailsController",
          "method": "frmOutwardCollectionsAmendmentViewDetailsController",
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
        this.presenter.fetchFileResponse(payload, 'frmOutwardCollectionsAmendmentViewDetails');
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
      errMsg.level = " frmOutwardCollectionsAmendmentViewDetailsController";
    },
  };
});