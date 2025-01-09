define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants','FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants,FormatUtil) {
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  return {

        /**
     * @api : updateFormUI
     * This function for responsible for updating the form after getting backend response
     * @return : NA
     */
    updateFormUI: function(uiData) {
      var scope = this;
      scope.setUI(uiData);
      FormControllerUtility.hideProgressBar(this.view);    
    },

    /**
     * @api : onNavigate
     * This function for executing the preShow and postShow
     * @return : NA
     */
    onNavigate: function(data) {
      var scope = this;
      try {
        scope.preShow(data);
        scope.postShow(data);
        FormControllerUtility.hideProgressBar(this.view);
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
     * This function for executing the primary functions before rendering UI
     * @return : NA
     */
    preShow: function(data) {
      var scope = this;
      try {
        scope.setUI(data);
        tradefinanceModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ImportLCUIModule");
        scope.view.onBreakpointChange = function() {
          scope.onBreakpointChange();
        };
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
     * This function for executing the primary functions after rendering UI
     * @return : NA
     */
    postShow: function(data) {
      var scope = this;
      try {
        scope.setReviewData(data);
        scope.setStaticData();
        scope.view.flxPopup.height = "625%";
        scope.view.flxSummaryDropDown.onClick = scope.expandOrCollapse.bind(this, "flxSummaryDropDown", "segLcSummary");
        scope.view.flxAmendmentDropDown.onClick = scope.expandOrCollapse.bind(this, "flxAmendmentDropDown", "segAmendment");
        scope.view.flxAmendmentChargesDropDown.onClick = scope.expandOrCollapse.bind(this, "flxAmendmentChargesDropDown", "segAmendmentCharges");
        scope.view.flxClear.onClick = function() {
            scope.view.flxAcknowledgementMessage.setVisibility(false);
          },
          scope.view.btnAcknowledgementViewAllImportLC.onClick = scope.button1Actions.bind(this);
        scope.view.btnAcknowledgementViewAllAmendments.onClick = scope.button2Actions.bind(this);
        scope.view.btnViewAllImportLC.onClick = scope.button1Actions.bind(this);
        scope.view.btnViewAllAmendments.onClick = scope.button2Actions.bind(this);
        scope.view.btnCancel.onClick = scope.showCancelPopup.bind(this);
        scope.view.btnBack.onClick = scope.navigateBack.bind(this,data);
        scope.view.btnAction1.onClick = scope.hidePopup.bind(this);
        scope.view.flxCancel.onClick = scope.hidePopup.bind(this);
        scope.view.btnAction2.onClick = scope.navigateToDashboard.bind(this);
        scope.view.btnSubmit.onClick = scope.submitData.bind(this,data);
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
     * @api : setReviewData
     * This function for mapping review data to segment
     * @return : NA
     */
    setReviewData: function(data) {
      var scope = this;
      try {
        var SegWidgetDataMap = {
          "flxDocument1": "flxDocument1",
          "flxDocument2": "flxDocument2",
          "flxDocument3": "flxDocument3",
          "flxDocuments": "flxDocuments",
          "flxDropDown": "flxDropDown",
          "flxReviewHeader": "flxReviewHeader",
          "flxReviewRight": "flxReviewRight",
          "flxReviewRowTemplate": "flxReviewRowTemplate",
          "flxReviewValues": "flxReviewValues",
          "flxSeparator1": "flxSeparator1",
          "flxSeparator2": "flxSeparator2",
          "flxRowTemplateSeparator": "flxRowTemplateSeparator",
          "flxheaderWithDropdown": "flxheaderWithDropdown",
          "flxreviewRows": "flxreviewRows",
          "imgDownloadIcon1": "imgDownloadIcon1",
          "imgDownloadIcon2": "imgDownloadIcon2",
          "imgDownloadIcon3": "imgDownloadIcon3",
          "imgDropDown": "imgDropDown",
          "lblDocumentName1": "lblDocumentName1",
          "lblDocumentName2": "lblDocumentName2",
          "lblDocumentName3": "lblDocumentName3",
          "lblReview": "lblReview",
          "lblReviewValue1": "lblReviewValue1",
          "lblReviewValue2": "lblReviewValue2",
          "lblReviewValue3": "lblReviewValue3",
          "lblReviewValue4": "lblReviewValue4",
          "lblTransactionHeader": "lblTransactionHeader"
        };
        scope.view.segLcSummary.widgetDataMap = SegWidgetDataMap;
        scope.view.segAmendment.widgetDataMap = SegWidgetDataMap;
        scope.view.segAmendmentCharges.widgetDataMap = SegWidgetDataMap;
        var reviewData1 = [
          [{},
            [{
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryWithColon"),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: data.beneficiaryName ? data.beneficiaryName : NA,
                  isVisible: true
                },
              },
              {
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber:"),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: data.lcReferenceNo ? data.lcReferenceNo : NA,
                  isVisible: true
                },
              },
              {
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.CreditAmount") + ":",
                  isVisible: true
                },
                lblReviewValue1: {
                  text: data.lcAmount ? data.lcAmount : NA, //applicationManager.getFormatUtilManager().appendCurrencySymbol(data.lcAmount,data.lcCurrency) : NA ,
                  isVisible: true
                },
              },
              {
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.issueDateWithColon"),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: data.issueDate ? data.issueDate : NA,
                  isVisible: true
                },
              },
              {
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.Wealth.expiryDate"),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: data.expiryDate ? data.expiryDate : NA,
                  isVisible: true
                },
              },
              {
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.paymentTermsWithColon"),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: data.paymentTerms ? data.paymentTerms : NA,
                  isVisible: true
                },
              }
            ]
          ]
        ];
        var reviewData2 = [
          [{},
            [{
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.Wealth.expiryDate"),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: data.amendmentExpiryDate ? data.amendmentExpiryDate : NA,
                  isVisible: true
                },
              },
              {
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.latestShipmentDateWithColon"),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: data.latestShippingDate ? data.latestShippingDate : NA,
                  isVisible: true
                },
              },
              {
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.periodOfPresentationWithColon"),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: data.presentationPeriod ? data.presentationPeriod : NA,
                  isVisible: true
                },
              },
              {
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.lcAmountWithColon"),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: data.amountType === "increase" ? "Increase to" : data.amountType === "decrease" ? "Decrease to" :NA,
                  isVisible: true
                },
                lblReviewValue2: {
                  text: data.newLcAmount ? data.newLcAmount : NA,
                  isVisible: (data.amountType === "increase" || data.amountType === "decrease") ? true : false
                },
                flxReviewRowTemplate:{
                  height : (data.amountType === "increase" || data.amountType === "decrease") ? "66dp" : "40dp"
                }
              },
              {
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.otherAmendmentsWithColon"),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: data.otherAmendments ? data.otherAmendments : NA,
                  isVisible: true
                },
                lblReviewValue2: {
                  text:"",
                  isVisible: false
                },
                lblReviewValue3: {
                  text: "",
                  isVisible: false
                },
              }
            ]
          ]
        ];
        var reviewData3 = [
          [{},
            [{
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.chargesWillBePaidByWithColon"),
                  isVisible: true
                },
                lblReviewValue1: {
                  text: data.amendCharges === "Applicant" ? "Applicant" : "Beneficiary",
                  isVisible: true
                },
              },
              {
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.chargesDebitAccountWithColon"),
                  isVisible: data.amendCharges === "Applicant" ? true : false,
                },
                lblReviewValue1: {
                  text: data.accountSelected ? data.accountSelected : NA ,
                  isVisible: data.amendCharges === "Applicant" ? true : false,
                },
                flxReviewRowTemplate:{
                  height : (data.amendCharges === "Beneficiary") ? "0dp":"50dp",
                }
              }
            ]
          ]
        ];
        scope.view.segLcSummary.removeAll();
        scope.view.segLcSummary.setData(reviewData1);
        scope.view.segAmendment.removeAll();
        scope.view.segAmendment.setData(reviewData2);
        scope.view.segAmendmentCharges.removeAll();
        scope.view.segAmendmentCharges.setData(reviewData3);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setReviewData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setStaticData
     * This function for setting the static data i18n keys
     * @return : NA
     */
    setStaticData: function() {
      var scope = this;
      try {
        scope.view.lblLcSummary.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCSummary");
        scope.view.lblAmendment.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentDetails");
        scope.view.lblAmendmentCharges.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentCharges");
        scope.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentSuccessMessage");
        scope.view.btnSubmit.text =  kony.i18n.getLocalizedString("i18n.CustomerFeedback.Submit");
        scope.view.btnBack.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
        scope.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
        scope.view.btnAcknowledgementViewAllAmendments.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllAmendments");
        scope.view.btnAcknowledgementViewAllImportLC.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllImportLC");
        scope.view.btnViewAllAmendments.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllAmendments");
        scope.view.btnViewAllImportLC.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllImportLC");
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setStaticData",
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
          "level": "FormController",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : expandOrCollapse
     * Triggerd on click of dropdown
     * @return : NA
     */
    expandOrCollapse: function(flxName, segName) {
      var scope = this;
      try {
        if (flxName === "flxSummaryDropDown") {
          if (scope.view[flxName].lblLcSummaryDropDown.text === "P") {
            scope.view[segName].setVisibility(false);
            scope.view.flxSeparator1.setVisibility(false);
            scope.view[flxName].lblLcSummaryDropDown.text = "O";
            scope.view.flxLcSummary.height = "20dp";
          } else {
            scope.view[segName].setVisibility(true);
            scope.view.flxSeparator1.setVisibility(true);
            scope.view[flxName].lblLcSummaryDropDown.text = "P";
            scope.view.flxLcSummary.height = "35dp";

          }
        } else if (flxName === "flxAmendmentDropDown") {
          if (scope.view[flxName].lblLcAmendmentDropDown.text === "P") {
            scope.view[segName].setVisibility(false);
            scope.view.flxSeparator3.setVisibility(false);
            scope.view[flxName].lblLcAmendmentDropDown.text = "O";
            scope.view.flxAmendmentDetails.height = "20dp";

          } else {
            scope.view[segName].setVisibility(true);
            scope.view.flxSeparator3.setVisibility(true);
            scope.view[flxName].lblLcAmendmentDropDown.text = "P";
            scope.view.flxAmendmentDetails.height = "35dp";

          }
        } else {
          if (scope.view[flxName].lblLcAmendmentChargesDropDown.text === "P") {
            scope.view[segName].setVisibility(false);
            scope.view.flxSeparator5.setVisibility(false);
            scope.view[flxName].lblLcAmendmentChargesDropDown.text = "O";
            scope.view.flxAmendmentCharges.height = "20dp";

          } else {
            scope.view[segName].setVisibility(true);
            scope.view.flxSeparator5.setVisibility(true);
            scope.view[flxName].lblLcAmendmentChargesDropDown.text = "P";
            scope.view.flxAmendmentCharges.height = "35dp";

          }
        }
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "expandOrCollapse",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : button1Actions
     * Triggerd on click of button in order to navigate Dashboard Screen
     * @return : NA
     */
    button1Actions: function() {
      var scope = this;
      try {
        FormControllerUtility.showProgressBar(this.view);
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ImportLCUIModule/frmImportLCDashboard"
        }).navigate();
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "button1Actions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : button2Actions
     * Triggerd on click of button in order to navigate Dashboard Screen
     * @return : NA
     */
    button2Actions: function() {
      var scope = this;
      try {
        FormControllerUtility.showProgressBar(this.view);
        var params = {};
        params.isAmendBackEvent = true;
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ImportLCUIModule/frmImportLCDashboard"
        }).navigate(params);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "button2Actions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : showCancelPopup
     * Triggerd on click of button in order to show cancel popup
     * @return : NA
     */
    showCancelPopup: function() {
      var scope = this;
      try {
        this.view.flxPopup.setVisibility(true);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "showCancelPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : navigateBack
     * Triggerd on click of button in order to navigate to Import Amend Screen
     * @return : NA
     */
    navigateBack: function(data) {
      var scope = this;
      try {
        FormControllerUtility.showProgressBar(this.view);
        data.isBackFlow = true;
        if(data.newLcAmount !== ""){
        var deFormattedAmount = scope.formatData(data.newLcAmount);
        data.newLcAmount = Number(deFormattedAmount)+"";
        }
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ImportLCUIModule/frmImportLCAmend"
        }).navigate(data);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "navigateBack",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : hidePopup
     * Triggerd on click of button in order to hide the cancel popup
     * @return : NA
     */
    hidePopup: function() {
      var scope = this;
      try {
        this.view.flxPopup.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "hidePopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : navigateToDashboard
     * Triggerd on click of button in order to navigate to dashboard
     * @return : NA
     */
    navigateToDashboard: function() {
      try {
        FormControllerUtility.showProgressBar(this.view);
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ImportLCUIModule/frmImportLCDashboard"
        }).navigate();
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "navigateToDashboard",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setUI
     * This function is used for showing correspoding review and Acnowledgement UI 
     * @return : NA
     */
    setUI: function(responseData) {
      var scope = this;
      try {
        var breakpoint = kony.application.getCurrentBreakpoint();
        var orientationHandler = new OrientationHandler();
        if (responseData.isReviewScreen) {
          scope.view.flxAcknowledgementMessage.setVisibility(false);
          scope.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.ImportLC.ImportLC") + "-" + kony.i18n.getLocalizedString("i18n.TradeFinance.AmendImportLC") + "-" + kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ViewRequests");
          scope.view.flxButtonsActions.setVisibility(false);
          scope.view.flxAcknowledgementButtonActions.setVisibility(false);
          scope.view.flxSeparator6.skin = "sknflxe9ebee";
          scope.view.flxSeparator6.height = "1dp";
          scope.view.flxReviewButtonsActions.setVisibility(true);
		  scope.view.flxReviewButtonActions.setVisibility(true);
        } else {
          scope.view.flxAcknowledgementMessage.setVisibility(true);
          scope.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.ImportLC.ImportLC") + "-" + kony.i18n.getLocalizedString("i18n.TradeFinance.AmendImportLC") + "-" + kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
          if(!kony.sdk.isNullOrUndefined(responseData.importLCAmendSuccess.amendmentReference) && responseData.importLCAmendSuccess.amendmentReference !== ""){
           scope.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentSuccessMessage");
           scope.view.imgAcknowledgement.src = "success_green.png";
          }
          else{
            scope.view.lblMessage.text = !kony.sdk.isNullOrUndefined(responseData.importLCAmendSuccess.serverErrorRes) ? responseData.importLCAmendSuccess.serverErrorRes.dbpErrMsg : responseData.importLCAmendSuccess.errorMessage;
            scope.view.imgAcknowledgement.src = "close_red.png";
          }
          if (breakpoint === 1024 ||
            orientationHandler.isTablet) {
            scope.view.flxButtonsActions.setVisibility(false);
            scope.view.flxAcknowledgementButtonActions.setVisibility(true);
            scope.view.flxReviewButtonActions.setVisibility(false);
            scope.view.flxSeparator6.skin = "sknflxe9ebee";
            scope.view.flxSeparator6.height = "1dp";
          } else {
            scope.view.flxButtonsActions.setVisibility(true);
            scope.view.flxReviewButtonsActions.setVisibility(false);
            scope.view.flxSeparator6.skin = "slFbox";
            scope.view.flxSeparator6.height = "10dp";
          }
        }
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : submitData
     * This function is trigged on clck of submit button in order to submit data
     * @return : NA
     */
    submitData: function(data) {
      var scope = this;
      try {
        data.lcAmount = scope.formatData(data.lcAmount);
        data.newLcAmount = scope.formatData(data.newLcAmount);
        data.otherAmendments = data.otherAmendments.charAt(0).toUpperCase()+data.otherAmendments.slice(1).replaceAll('\n',"");
        FormControllerUtility.showProgressBar(this.view);
        tradefinanceModule.presentationController.submitAmendData(data);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "submitData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

        /**
     * @api : formatData
     * This function is to deformat the amount field
     * @return : NA
     */
    formatData: function(data){
      var amountWithoutSymbol = data.slice(1);
      var deFormattedAmount = applicationManager.getFormatUtilManager().deFormatAmount(amountWithoutSymbol);
      return deFormattedAmount;
    },

    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @return : NA
     */
    onError: function(err) {
      var error = err;
    },
  }
});