define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
  let presenter;
  let isTablet = false;
  let amendData;
  return {
    updateFormUI: function (uiData) {
      var scope = this;
      FormControllerUtility.showProgressBar(this.view);
      if (uiData.importLCAmendSuccess) {
        scope.setReviewData(uiData.importLCAmendSuccess);
        scope.setStaticLCSummaryData(uiData.importLCAmendSuccess);
        scope.setStaticRequestAmendData(uiData.importLCAmendSuccess);
        scope.setAmendCharges(uiData.importLCAmendSuccess);
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
    /**
         * @api : onNavigate
         * This function for executing the postShow, displayData and methods given
         * @return : NA
         */
    onNavigate: function (navData) {
      amendData = navData;
      var scope = this;
      var data = {};
      try {
        FormControllerUtility.showProgressBar(this.view);
        scope.view.flxViewLCDetails.onClick = scope.navLCDetails.bind(this, navData);
        scope.view.flxLCViewDetails.onClick = scope.navLCDetails.bind(this, navData);
        navData["frmName"] = "frmAmendDetails";
        scope.postShow(navData);
        data["amendmentReference"] = navData.amendmentReference;
        scope.displayData(data);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "onNavigate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    preShow: function () {
      var scope = this;
      try {
      } catch (err) {
        var errorObj =
            {
              "level": "FormController",
              "method": "preShow",
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
        scope.view.customheadernew.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
        scope.view.customfooternew.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          isTablet = true;
      } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
          isTablet = false;
      }
      } catch (err) {
        var errorObj =
            {
              "level": "FormController",
              "method": "onBreakpointChange",
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
        this.presenter = applicationManager.getModulesPresentationController({
          appName: 'TradeFinanceMA',
          moduleName: 'ImportLCUIModule'
        });
        scope.setUI();
        scope.setStaticData();
        scope.view.btnBackAmendment.onClick = scope.OnNavigateBack.bind(this);
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
        scope.view.flxVerticalEllipsisBody.onClick = scope.renderPrintAndDownload.bind(this);
        scope.view.lblVerticalEllipsis.onTouchEnd = () => {
          if(scope.view.flxVerticalEllipsisDropdown.isVisible) {
            scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
          }
          else {
            scope.view.flxVerticalEllipsisDropdown.setVisibility(true);
          }
        };
        tradefinanceModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ImportLCUIModule");
      } catch (err) {
        var errorObj =
            {
              "level": "FormController",
              "method": "postShow",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : navLCDetails
     * This function is trigged on click of viewdeatils to display data viewdeatils
     * @return : NA
     */
    navLCDetails: function (data) {
      var scope = this;
      FormControllerUtility.showProgressBar(this.view);
      data.isAmendBackEvent = true;
      tradefinanceModule.presentationController.getLOCByID(data, "ImportLCUIModule/frmImportLCDetails");
    },

    /**
     * @api : setReviewData
     * This function for mapping review data to segment
     * @return : NA
     */
    setReviewData: function (data) {
      var scope = this;
      try {
        const formatUtilManager = applicationManager.getFormatUtilManager();
        var SegWidgetDataMap = {
          "flxAmendRowTemplate": "flxAmendRowTemplate",
          "flxAmendRowTemplateTablet": "flxAmendRowTemplateTablet",
          "flxreviewRows": "flxreviewRows",
          "flxReviewRight": "flxReviewRight",
          "flxReviewValues": "flxReviewValues",
          "lblReview": "lblReview",
          "lblReviewValue1": "lblReviewValue1"
        };
        scope.view.segLCSummaryContent.widgetDataMap = SegWidgetDataMap;
        scope.view.segAmendmentDetails.widgetDataMap = SegWidgetDataMap;
        scope.view.segRequestAmend.widgetDataMap = SegWidgetDataMap;
        scope.view.segAmendmentCharges.widgetDataMap = SegWidgetDataMap;

        var reviewData1 = [
          [{},
           [{
             lblReview: {
               text: kony.i18n.getLocalizedString("i18n.TradeFinance.Beneficiary") + ":",
               isVisible: true
             },
             lblReviewValue1: {
               text: data.beneficiaryName ? data.beneficiaryName : kony.i18n.getLocalizedString("i18n.common.NA"),
               isVisible: true
             },
           },
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.LCRefNo") + ":", isVisible: true },
              lblReviewValue1: { text: data.lcReferenceNo ? data.lcReferenceNo : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            },
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":", isVisible: true },
              lblReviewValue1: { text: data.paymentTerms ? data.paymentTerms : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            },
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":", isVisible: true },
              lblReviewValue1: { text: data.lcAmount ? data.lcAmount : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            },
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":", isVisible: true },
              lblReviewValue1: { text: data.issueDate ? data.issueDate : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            },
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":", isVisible: true },
              lblReviewValue1: { text: data.expiryDate ? data.expiryDate : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            },
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentTerms") + ":", isVisible: true },
              lblReviewValue1: { text: data.paymentTerms ? data.paymentTerms : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            }
           ]]
        ];
        var reviewData2 = [
          [{}, [
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentReference") + ":", isVisible: true },
              lblReviewValue1: { text: data.amendmentReference ? data.amendmentReference : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            },
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendedOn") + ":", isVisible: true },
              lblReviewValue1: { text: data.amendmentDate ? data.amendmentDate : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            },
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentStatus") + ":", isVisible: true },
              lblReviewValue1: { text: data.amendStatus ? data.amendStatus : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            },
          ]]
        ];
        if(data.amendmentApprovedDate){
          reviewData2[0][1].push(
          {
            lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.ApprovedOn") + ":", isVisible: true },
            lblReviewValue1: { text: formatUtilManager.getFormattedCalendarDate(data.amendmentApprovedDate) , isVisible: true },
          });
        }
        var reviewData3 = [
          [{}, [
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate") + ":", isVisible: true },
              lblReviewValue1: { text: data.expiryDate ? data.expiryDate : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            },
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendLatestShipmentDate") + ":", isVisible: true },
              lblReviewValue1: { text: data.latestShippingDate ? data.latestShippingDate : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            },
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.PeriodOfPresentation") + ":", isVisible: true },
              lblReviewValue1: { text: data.presentationPeriod ? data.presentationPeriod : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            }
          ]]
        ];
        var reviewData4 = [
          [{}, [
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesWillBePaidBy") + ":", isVisible: true },
              lblReviewValue1: { text: data.amendCharges ? data.amendCharges : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            },
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount") + ":", isVisible: true },
              lblReviewValue1: { text: data.chargesAccount ? data.chargesAccount : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            },
            {
              lblReview: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesPaid") + ":", isVisible: true },
              lblReviewValue1: { text: data.chargesPaid ? data.chargesPaid : kony.i18n.getLocalizedString("i18n.common.NA"), isVisible: true },
            }
          ]]
        ];
        scope.view.segLCSummaryContent.removeAll();
        scope.view.segLCSummaryContent.setData(reviewData1);
        scope.view.segAmendmentDetails.removeAll();
        scope.view.segAmendmentDetails.setData(reviewData2);
        scope.view.segRequestAmend.removeAll();
        scope.view.segRequestAmend.setData(reviewData3);
        scope.view.segAmendmentCharges.removeAll();
        scope.view.segAmendmentCharges.setData(reviewData4);
      } catch (err) {
        var errorObj =
            {
              "level": "FormController",
              "method": "setReviewData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    setAmendCharges: function(data) {
      data.serviceType === "getAmendmentbyId";
      var scope = this;
      if (data.amendStatus === "Approved by Bank") {
        var reviewData4 = [
          [{},
           [{
             lblReview: {
               text: kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesWillBePaidBy") + ":",
               isVisible: true
             },
             lblReviewValue1: {
               text: data.amendCharges ? data.amendCharges : "NA",
               isVisible: true
             },
           }, {
             lblReview: {
               text: kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount") + ":",
               isVisible: true
             },
             lblReviewValue1: {
               text: data.chargesAccount ? data.chargesAccount : "NA",
               isVisible: true
             },
           }, {
            lblReview: {
               text: kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesPaid") + ":",
               isVisible: true
             },
              lblReviewValue1:{
                text:data.chargesPaid ? data.chargesPaid : "NA",
                isVisible:true
              },
             }, ]
          ]
        ];
      } else {
        var reviewData4 = [
          [{},
           [{
             lblReview: {
               text: kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesWillBePaidBy") + ":",
               isVisible: true
             },
             lblReviewValue1: {
               text: data.amendCharges ? data.amendCharges : "NA",
               isVisible: true
             },
           }, {
             lblReview: {
               text: kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount") + ":",
               isVisible: true
             },
             lblReviewValue1: {
               text: data.chargesAccount ? data.chargesAccount : "NA",
               isVisible: true
             },
           }, 
           ]
          ]
        ];
     }
      scope.view.segAmendmentCharges.removeAll();
      scope.view.segAmendmentCharges.setData(reviewData4);
    },
    
     /**
     * @api : setStaticData
     * This function for setting the static data i18n keys
     * @return : NA
     */
    setStaticData: function () {
      var scope = this;
      try {
        scope.view.lblLCSummary.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCSummary");
        scope.view.lblLCViewDetails.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewDetails");
        scope.view.lblAmendmentDetails.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentDetails");
        scope.view.lblRequestAmendment.text = kony.i18n.getLocalizedString("i18n.TradeFinance.RequestAmendment");
        scope.view.lblAmendmentCharges.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentCharges");
      } catch (err) {
        var errorObj =
            {
              "level": "FormController",
              "method": "setStaticData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * @api :  setStaticLCSummaryData
     * This function for setting the static data i18n keys
     * @return : NA
     */

    setStaticLCSummaryData: function (data) {
      var scope = this;
      try {
        scope.view.lblBeneficiary.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Beneficiary") + ":";
        scope.view.lblBeneficiaryValue.text = data.beneficiaryName ? data.beneficiaryName : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblLCRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCRefNo") + ":";
        scope.view.lblLCRefNoValue.text = data.lcReferenceNo ? data.lcReferenceNo : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblLCType.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
        scope.view.lblLCTypeValue.text = data.paymentTerms ? data.paymentTerms : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblLCAmount.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":";
        scope.view.lblLCAmountValue.text = data.lcAmount ? data.lcAmount : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblIssueDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":";
        scope.view.lblIssueDateValue.text = data.issueDate ? data.issueDate : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblExpiryDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
        scope.view.lblExpiryDateValue.text = data.expiryDate ? data.expiryDate : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblPaymentTerms.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentTerms") + ":";
        scope.view.lblPaymentTermsValue.text = data.paymentTerms ? data.paymentTerms : kony.i18n.getLocalizedString("i18n.common.NA");
      } catch (err) {
        var errorObj =
            {
              "level": "FormController",
              "method": "setStaticLCSummaryData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
     * @api :  setStaticRequestAmendData
     * This function for setting the static data i18n keys
     * @return : NA
     */
    setStaticRequestAmendData: function (data) {
      var scope = this;
      try {
        scope.view.lblReqAmendLCAmount.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":";
        scope.view.lblReqAmendLCAmountValue.text = (data.amountType ? data.amountType : kony.i18n.getLocalizedString("i18n.common.NA")) + (" " + kony.i18n.getLocalizedString("kony.mb.common.To") + " : ") + (data.lcAmount ? data.lcAmount : kony.i18n.getLocalizedString("i18n.common.NA"));
        scope.view.lblReqAmendOtherAmend.text = kony.i18n.getLocalizedString("i18n.TradeFinance.OtherAmendments") + ":";
        scope.view.lblReqAmendOtherAmendValue.text = data.otherAmendments ? data.otherAmendments : kony.i18n.getLocalizedString("i18n.common.NA");
      } catch (err) {
        var errorObj =
            {
              "level": "FormController",
              "method": "setStaticRequestAmendData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : OnNavigateBack
     * Triggerd on click of button in order to navigate Dashboard Screen
     * @return : NA
     */
    OnNavigateBack: function () {
      var scope = this;
      var data = {};
	  data.isAmendBackEvent = true;
      try {
        tradefinanceModule.presentationController.navigateToForm("TradeFinanceMA", "ImportLCUIModule/frmImportLCDashboard", data);
      } catch (err) {
        var errorObj =
            {
              "level": "FormController",
              "method": "btnBackAmendment",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setUI
     * This function is used for showing Amendment Details UI 
     * @return : NA
     */
    setUI: function () {
      var scope = this;
      try {
        var breakpoint = kony.application.getCurrentBreakpoint();
        var orientationHandler = new OrientationHandler();

        if (breakpoint === 1024 ||
            orientationHandler.isTablet) {
          scope.view.flxLCSummary.setVisibility(false);
          scope.view.flxLCSummaryTablet.setVisibility(true);
        } else {
          scope.view.flxLCSummary.setVisibility(true);
          scope.view.flxLCSummaryTablet.setVisibility(false);
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
     * @api : displayData
     * This function is trigged in order to display data on click of viewdeatils
     * @return : NA
     */
    displayData: function (data) {
      var scope = this;
      try {
        FormControllerUtility.showProgressBar(this.view);
        tradefinanceModule.presentationController.displayAmendData(data, "frmLCAmendment");
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "displayData",
          "error": err
        };
        scope.onError(errorObj);
      }
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
          if (amendData.amendStatus === 'Approved') {
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
          navData["frmName"] = "frmAmendDetails";
          var navigationToPrintData = {};
          navigationToPrintData["Data"] = navData;
          tradefinanceModule.presentationController.navigateToForm("TradeFinanceMA", "ImportLCUIModule/frmAmendmentsPrint", navigationToPrintData);
        } else if (id == "download") {
          tradefinanceModule.presentationController.downloadsAmendmentsByID(data, "frmLCAmendment");
        } else if (id == 'raiseQuery') {
          let queryObj = {};
          queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${amendData.lcSRMSId}`;
          queryObj.descriptionObj = {};
          amendData.amendStatus && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.AmendedStatus")] = amendData.amendStatus);
          amendData.amendmentDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.AmendedOn")] = amendData.amendmentDate);
          amendData.paymentTerms && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.ImportLC.LCType")] = amendData.paymentTerms);
          amendData.amendCharges && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesPaidBy")] = amendData.amendCharges);
          amendData.paymentTerms && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentTerms")] = amendData.paymentTerms);
          queryObj.tradeModule = true;
          scope.presenter.showMessagesScreen(queryObj);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmLCAmendmentController",
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
    }
  }
});