define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let inputData;
  let LOCData;
  let tradefinanceModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ImportLCUIModule");
  return {
    invokePrint: function () {
      var scope = this;
      kony.os.print();
      //timeout is required to allow print popup to be visible.
      setTimeout(function () {
        if (inputData.frmName === "frmDashboard") {
          inputData.isAmendBackEvent = true;
          tradefinanceModule.presentationController.navigateToForm("TradeFinanceMA", "ImportLCUIModule/frmImportLCDashboard", inputData);
        } else if (inputData.frmName === "frmLCDetails") {
          tradefinanceModule.presentationController.navigateToForm("TradeFinanceMA", "ImportLCUIModule/frmImportLCDetails", LOCData);
        } else if (inputData.frmName === "frmAmendDetails") {
          tradefinanceModule.presentationController.navigateToForm("TradeFinanceMA", "ImportLCUIModule/frmLCAmendment", inputData);
        } else if (inputData.frmName === "frmExportAmendDetails") {
          tradefinanceModule.presentationController.navigateToForm("TradeFinanceMA", "ExportLCUIModule/frmExportAmendmentViewDetails", inputData);
        } else if (inputData.frmName === "frmExportLCDashboard") {
          inputData["flowType"] = 'GetAllExportAmendments';
          tradefinanceModule.presentationController.navigateToForm("TradeFinanceMA", "ExportLCUIModule/frmExportLCDashboard", inputData);
        }
      }, "17ms");
    }, 

    updateFormUI: function(uiData) {
      var scope = this;
      if (uiData.importLCAmendSuccess) {
        scope.setAmendDetails(uiData.importLCAmendSuccess);
        scope.setStaticData(uiData.importLCAmendSuccess);
        scope.invokePrint();
      }
      FormControllerUtility.hideProgressBar(this.view);
    },

    /**
         * @api : onNavigate
         * This function for executing the postShow, displayData and methods given
         * @return : NA
         */
    onNavigate: function(navData) {
      var scope = this;
      var data = {};
      try {
        LOCData = navData.LOCNavData;
        inputData = navData.Data;
        scope.postShowData = navData;
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
         * @api : postShow
         * This function for executing the primary functions after rendering UI
         * @return : NA
         */
    postShow: function() {
      var scope = this;
      try {
		var data = {};
        scope.setStaticData();
        let navData = scope.postShowData;
        if (navData.Data.frmName === "frmExportAmendDetails" || navData.Data.frmName === "frmExportLCDashboard") {
          scope.view.flxSelfAcceptance.setVisibility(true);
          scope.view.lblLCDiffAmount.setVisibility(true);
          //data["amendmentReference"] = navData.Data.importLCId;
          inputData["print"] = true;
          scope.view.lblImportAmendments.text = "Export - Amendment";
          scope.displayExportLCData(navData.Data);
        } else {
          scope.view.lblImportAmendments.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ImportAmendment");
          data["amendmentReference"] = navData.Data.amendmentReference;
          scope.displayData(data);
        }
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
      * @api : displayExportLCData
      * This function is trigged in order to display data
      * @return : NA
      */ 
    displayExportLCData: function(data) {
      var scope = this;
      try {
        scope.setExportAmendment(data);
        scope.setStaticData();
        scope.invokePrint();
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "displayData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
         * @api : setAmendDetails
         * This function for mapping review data to segment
         * @return : NA
         */
    setAmendDetails: function(data) {
      var scope = this;
      try{
		let formatUtil = applicationManager.getFormatUtilManager();
        //Set LCSummary Data
        scope.view.lblBeneficiaryKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Beneficiary") + ":";
        scope.view.lblBeneficiaryValue.text = data.beneficiaryName ? data.beneficiaryName : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblReferenceNoKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCRefNo") + ":";
        scope.view.lblReferenceNoValue.text = data.lcReferenceNo ? data.lcReferenceNo : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblCreditAmountKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.CreditAmount") + ":";
        scope.view.lblCreditAmountValue.text = data.creditAmount ? data.creditAmount : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblIssueDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":";
        scope.view.lblIssueDateValue.text = data.issueDate ? data.issueDate : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblExpiryDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
        scope.view.lblExpiryDateValue.text = data.expiryDate ? data.expiryDate : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblPaymentTermsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentTerms") + ":";
        scope.view.lblPaymentTermsValue.text = data.paymentTerms ? data.paymentTerms : kony.i18n.getLocalizedString("i18n.common.NA");
        //Set AmendDetail Data
        scope.view.lblAmendmentReferenceKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentReference") + ":";
        scope.view.lblAmendmentReferenceValue.text = data.amendmentReference ? data.amendmentReference : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblAmendedOnKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendedOn") + ":";
        scope.view.lblAmendedOnValue.text = data.amendmentDate ? data.amendmentDate : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblAmendmentStatusKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentStatus") + ":";
        scope.view.lblAmendmentStatusValue.text = data.amendStatus ? data.amendStatus : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblApprovedOnKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ApprovedOn") + ":";
        scope.view.lblApprovedOnValue.text = data.amendmentApprovedDate ? formatUtil.getFormattedCalendarDate(data.amendmentApprovedDate) : kony.i18n.getLocalizedString("i18n.common.NA");
        //Set Amendments Requested Data
        scope.view.lblAmendmentExpiryDateKey.text = kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate") + ":";
        scope.view.lblAmendmentExpiryDateValue.text = data.amendmentExpiryDate ? data.amendmentExpiryDate : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblLatestShipmentDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendLatestShipmentDate") + ":";
        scope.view.lblLatestShipmentDateValue.text = data.latestShippingDate ? data.latestShippingDate : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblPeriodOfPresentationKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PeriodOfPresentation") + ":";
        scope.view.lblPeriodOfPresentationValue.text = data.presentationPeriod ? data.presentationPeriod : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblLCAmountKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":";
        scope.view.lblLCAmountValue.text = (data.amountType ? data.amountType : kony.i18n.getLocalizedString("i18n.common.NA")) + (" " + kony.i18n.getLocalizedString("kony.mb.common.To") + " : ")+(data.lcAmount ? data.lcAmount : kony.i18n.getLocalizedString("i18n.common.NA"));
        scope.view.lblOtherAmendmentsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.OtherAmendments") + ":";
        scope.view.lblOtherAmendmentsValue.text = data.otherAmendments ? data.otherAmendments : kony.i18n.getLocalizedString("i18n.common.NA");
        //Set Amendment Charges Data
        this.view.lblChargesWillBePaidByKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesWillBePaidBy") + ":";
        this.view.blChargesWillBePaidByValue.text = data.amendCharges ? data.amendCharges : kony.i18n.getLocalizedString("i18n.common.NA");
        this.view.lblDebitAccountKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount") + ":";
        this.view.lblDebitAccountValue.text = data.chargesAccount ? data.chargesAccount : kony.i18n.getLocalizedString("i18n.common.NA");
        this.view.lblChargesPaidKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesPaid") + ":";
        this.view.lblChargesPaidValue.text = data.chargesPaid ? data.chargesPaid : kony.i18n.getLocalizedString("i18n.common.NA");  
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setAmendDetails",
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
        scope.view.lblLCSummary.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCSummary");
        scope.view.lblAmendDetails.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentDetails");
        scope.view.lblAmendRequested.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentsRequested");
        scope.view.lblAmendmentCharges.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentCharges");
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
         * @api : displayData
         * This function is trigged in order to display data on click of viewdeatils
         * @return : NA
         */
    displayData: function(data) {
      var scope = this;
      try {
        tradefinanceModule.presentationController.displayAmendData(data, "frmAmendmentsPrint");
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "displayData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setExportAmendment
      * This function for mapping exportAmendment data to segment
      * @return : NA
      */
    setExportAmendment: function(data) {
      var scope = this;
      try {
        let formatUtil = applicationManager.getFormatUtilManager();
        var lcAmountDiff = formatUtil.formatAmountandAppendCurrencySymbol(data.newLcAmount - data.oldLcAmount, data.lcCurrency);
        var selfAcceptanceRejectDate = data.selfAcceptanceDate ? data.selfAcceptanceDate : data.selfRejectedDate;
        scope.view.lblBeneficiaryKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Beneficiary") + ":";
        scope.view.lblBeneficiaryValue.text = LOCData.beneficiaryName ? LOCData.beneficiaryName : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblReferenceNoKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCRefNo") + ":";
        scope.view.lblReferenceNoValue.text = LOCData.lcReferenceNo ? LOCData.lcReferenceNo : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblCreditAmountKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.CreditAmount") + ":";
        scope.view.lblCreditAmountValue.text = LOCData.amountFormatted ? LOCData.amountFormatted : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblIssueDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":";
        scope.view.lblIssueDateValue.text = LOCData.issueDate ? LOCData.issueDate : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblExpiryDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
        scope.view.lblExpiryDateValue.text = LOCData.expiryDate ? LOCData.expiryDate : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblPaymentTermsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentTerms") + ":";
        scope.view.lblPaymentTermsValue.text = LOCData.paymentTerms ? LOCData.paymentTerms : kony.i18n.getLocalizedString("i18n.common.NA");
        //Set AmendDetail Data
        scope.view.lblAmendmentReferenceKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentReference") + ":";
        scope.view.lblAmendmentReferenceValue.text = data.amendmentReferenceNo ? data.amendmentReferenceNo : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblAmendedOnKey.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNumber") + ":";
        scope.view.lblAmendedOnValue.text = data.amendmentNo ? data.amendmentNo : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblAmendmentStatusKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentStatus") + ":";
        scope.view.lblAmendmentStatusValue.text = data.amendmentStatus ? data.amendmentStatus : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblSelfAcceptanceKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SelfAcceptance") + ":"
        scope.view.lblSelfAcceptanceValue.text = data.selfAcceptance ? data.selfAcceptance : scope.view.lblApprovedOnKey.text = kony.i18n.getLocalizedString("i18n.ImportLC.Acceptance") + "/" + kony.i18n.getLocalizedString("i18n.TradeFinance.RejectionDate") + ":"
        scope.view.lblApprovedOnKey.text = kony.i18n.getLocalizedString("i18n.ImportLC.Acceptance") + "/" +  kony.i18n.getLocalizedString("i18n.TradeFinance.RejectionDate") + ":"
        scope.view.lblApprovedOnValue.text = selfAcceptanceRejectDate ? formatUtil.getFormattedCalendarDate(selfAcceptanceRejectDate) : kony.i18n.getLocalizedString("i18n.common.NA");
        //Set Amendments Requested Data
        scope.view.lblAmendmentExpiryDateKey.text = kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate") + ":";
        scope.view.lblAmendmentExpiryDateValue.text = data.lcExpiryDate ? formatUtil.getFormattedCalendarDate(data.lcExpiryDate) : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblLatestShipmentDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendLatestShipmentDate") + ":";
        scope.view.lblLatestShipmentDateValue.text = data.latestShipmentDate ? formatUtil.getFormattedCalendarDate(data.latestShipmentDate) : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblPeriodOfPresentationKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PeriodOfPresentation") + ":";
        scope.view.lblPeriodOfPresentationValue.text = data.periodOfPresentation ? data.periodOfPresentation : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblLCAmountKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":";
        scope.view.lblLCDiffAmount.text = "LC amount is " + (data.lcAmountStatus).toLowerCase() + " by " + lcAmountDiff;
        scope.view.lblLCAmountValue.text = data.newLcAmount ? formatUtil.formatAmountandAppendCurrencySymbol(data.newLcAmount, data.lcCurrency) : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblOtherAmendmentsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.OtherAmendments") + ":";
        scope.view.lblOtherAmendmentsValue.text = data.otherAmendments ? data.otherAmendments : kony.i18n.getLocalizedString("i18n.common.NA");
        //Set Amendment Charges Data
        scope.view.lblChargesWillBePaidByKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesWillBePaidBy") + ":";
        scope.view.blChargesWillBePaidByValue.text = data.amendmentChargesPayer ? data.amendmentChargesPayer : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblDebitAccountKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount") + ":";
        scope.view.lblDebitAccountValue.text = data.chargesDebitAccount ? data.chargesDebitAccount : kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblChargesPaidValue.setVisibility(false);
        scope.view.lblChargesPaidKey.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setExportAmendment",
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
      var error = err;
    }
  }
});