define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil', 'CampaignUtility'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil, CampaignUtility) {
  let lcAndDrawingResponse;
  let wholeResponse;
  return {
    /**
     * @api : onNavigate
     * whill execute when user navigated from another form
     * @arg: NA
     * @return : NA
     */
    onNavigate: function(record) {
      var scope = this;
      try {
        lcAndDrawingResponse = record.finalResponse.response;
        wholeResponse = record;
        scope.view.preShow = scope.preShow;
        scope.view.postShow = scope.postShow;
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCReviewSubmitController",
          "method": "onNavigate",
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
     * @api : preShow
     * Pre show of the form
     * @arg: NA
     * @return : NA
     */
    preShow: function() {
      var scope = this;
      try {
        FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        scope.view.customheadernew.forceCloseHamburger();
        scope.view.customheadernew.activateMenu("TradeFinance", "Exports");
        this.view.flxDialogs.height = kony.os.deviceInfo().screenHeight + 120 + "dp";
        scope.initButtonActions();
        scope.setDataFori18n();
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCReviewSubmitController",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : postShow
     * Post show of the form
     * @arg: NA
     * @return : NA
     */
    postShow: function() {
      var scope = this;
      try {
        scope.settingDataInDrawingSummeryUI();
        scope.settingDataInLcSummeryUI();
        scope.settingDataInResponseToDiscrepancies();
        scope.settingDataInReviceTheDrawing();
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCReviewSubmitController",
          "method": "settingDataInDrawingSummeryUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : initButtonActions
     * Deals about button clicks
     * @arg: NA
     * @return : NA
     */
    initButtonActions: function() {
      var scope = this;
      try {
        scope.view.btnSubmitReview.onClick = scope.formNavigation.bind(this, "btnSubmitReview");
        scope.view.btnBackReview.onClick = scope.formNavigation.bind(this, "btnBackReview");
        scope.view.btnCloseReview.onClick = scope.formNavigation.bind(this, "btnCloseReview");
        this.view.flxViewLCDetails.onClick = scope.viewLCPopup.bind(this, true);
        this.view.flxCross.onClick = scope.viewLCPopup.bind(this, false);
        scope.view.flxDiscrepancyDropdown.cursorType = "pointer";
        scope.view.flxDiscrepancyDropdown.onClick = scope.toggleFlexDetailsVisibility.bind(this, this.view.imgDiscrepancyDropdown, this.view.flxDiscrepanciesMain);
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCReviewSubmitController",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : settingDataInDrawingSummeryUI
     * Setting Data In Drawing Summery UI
     * @arg: NA
     * @return : NA
     */
    settingDataInDrawingSummeryUI: function() {
      var scope = this;
      try {
        scope.view.lblDrawingSummary.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingSummary");
        scope.view.lblDrawingStatusValue.text = lcAndDrawingResponse.drawingResponse.status;
        scope.view.lblDrawingRefNoValue.text = lcAndDrawingResponse.drawingResponse.drawingReferenceNo;
        scope.view.lblDrawingDateValue.text = lcAndDrawingResponse.drawingResponse.drawingCreatedDateFormatted;
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCReviewSubmitController",
          "method": "settingDataInDrawingSummeryUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : settingDataInLcSummeryUI
     * Setting Data In LC Summery UI
     * @arg: NA
     * @return : NA
     */
    settingDataInLcSummeryUI: function() {
      var scope = this;
      try {
        let formatUtil = applicationManager.getFormatUtilManager();
        scope.view.lblLCSummary.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCSummary");
        scope.view.lblViewLCDetials.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewLCDetails");
        scope.view.lblApplicantName.text = lcAndDrawingResponse.lcResponse.applicant;
        scope.view.lblRightLCRefNo.text = lcAndDrawingResponse.lcResponse.lcReferenceNo;
        scope.view.lblLCTypeValue.text = lcAndDrawingResponse.lcResponse.lcType;
        scope.view.lblIssueBankValue.text = lcAndDrawingResponse.lcResponse.issuingBank;
        scope.view.lblLCAmountValue.text = lcAndDrawingResponse.lcResponse.amount ? formatUtil.formatAmountandAppendCurrencySymbol(lcAndDrawingResponse.lcResponse.amount, lcAndDrawingResponse.lcResponse.currency) :  kony.i18n.getLocalizedString("i18n.common.NA"); 
        scope.view.lblIssueDateValue.text = lcAndDrawingResponse.lcResponse.issueDate ? CommonUtilities.getDateAndTimeInUTC(lcAndDrawingResponse.lcResponse.issueDate).substr(0,10) : kony.i18n.getLocalizedString("i18n.common.NA"); 
        scope.view.lblIssuingRefNoValue.text = lcAndDrawingResponse.lcResponse.lcReferenceNo;
        scope.view.lblLCUntilizedAmountValue.text =lcAndDrawingResponse.lcResponse.utilizedLCAmount ? formatUtil.formatAmountandAppendCurrencySymbol(lcAndDrawingResponse.lcResponse.utilizedLCAmount, lcAndDrawingResponse.lcResponse.currency) :  kony.i18n.getLocalizedString("i18n.common.NA");
        scope.view.lblExpiryDateValue.text = lcAndDrawingResponse.lcResponse.expiryDate ? CommonUtilities.getDateAndTimeInUTC(lcAndDrawingResponse.lcResponse.expiryDate).substr(0,10) : kony.i18n.getLocalizedString("i18n.common.NA");
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCReviewSubmitController",
          "method": "settingDataInLcSummeryUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : settingDataInResponseToDiscrepancies
     * Setting Data In Response To Discrepancies
     * @arg: NA
     * @return : NA
     */
    settingDataInResponseToDiscrepancies: function() {
      var scope = this;
      try {
        let totalDocuments = JSON.parse(lcAndDrawingResponse.drawingResponse.returnedDocuments);
        scope.view.lblTotalDocumentsValue.text = JSON.stringify(totalDocuments.length);
        scope.view.lblDocStatusValue.text = lcAndDrawingResponse.drawingResponse.documentStatus;
        // Setting document into segment
        scope.view.segDocumentsValueContainer.widgetDataMap = { lblHeading: "lblHeading" };
        // Processing document data
        var docMasterData = [];
        JSON.parse(lcAndDrawingResponse.drawingResponse.returnedDocuments).map(function (documentData) {
          docMasterData.push({ lblHeading: documentData });
        });
        // setting data into segment
        scope.view.segDocumentsValueContainer.setData(docMasterData);
        // Setting data in discrepency segment
        scope.view.segDiscrepancyResponse.widgetDataMap = {
          lblLeft1: "lblLeft1",
          lblRight1: "lblRight1"
        };
        // Segment data
        let discrepancyMasterData = [];
        // Reason for return
        discrepancyMasterData.push({
          "lblLeft1": kony.i18n.getLocalizedString("i18n.TradeFinance.ReasonforReturn") + ":",
          "lblRight1": lcAndDrawingResponse.drawingResponse.reasonForReturn
        });
        // Discrepancies data
        wholeResponse.finalResponse.userDiscrepancySelection.map(function(paymentItem, index) {
          if ('title' in paymentItem && paymentItem.title.length > 0) {
            discrepancyMasterData.push({
              lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.Discrepancy") + " " + (index + 1) + ":",
              lblRight1: {
                text: paymentItem.title,
                skin: "sknlbl424242SSP15pxSemibold"
              }
            });
          }
          if ('userResponse' in paymentItem && paymentItem.userResponse.length > 0) {
            discrepancyMasterData.push({
              lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.D") + (index + 1) + " " + kony.i18n.getLocalizedString("i18n.TradeFinance.UserResponse") + ":",
              lblRight1: paymentItem.userResponse
            });
          }
          if ('userComment' in paymentItem && paymentItem.userComment.length > 0) {
            discrepancyMasterData.push({
              lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.D") + (index + 1) + " " + kony.i18n.getLocalizedString("i18n.TradeFinance.UserComment") + ":",
              lblRight1: paymentItem.userComment
            });
          }
        });
        // Return message to bank
        if ('returnMessageToBank' in lcAndDrawingResponse.drawingResponse && lcAndDrawingResponse.drawingResponse.returnMessageToBank.length > 0) {
          discrepancyMasterData.push({
            "lblLeft1": kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnMessagetoBank") + ":",
            "lblRight1": lcAndDrawingResponse.drawingResponse.returnMessageToBank
          });
        }
        else{
          discrepancyMasterData.push({
            "lblLeft1": kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnMessagetoBank") + ":",
            "lblRight1": kony.i18n.getLocalizedString("i18n.common.NA")
          });
        }
        scope.view.segDiscrepancyResponse.setData(discrepancyMasterData);

      } catch (err) {
        var errorObj = {
          "level": "frmExportLCReviewSubmitController",
          "method": "settingDataInResponseToDiscrepancies",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : settingDataInReviceTheDrawing
     * Setting Data In Revice The Drawing Flex
     * @arg: NA
     * @return : NA
     */
    settingDataInReviceTheDrawing: function() {
      var scope = this;
      try {
        scope.view.lblDrawingRefValue.text = new FormatUtil().formatAmountAndAddCurrencySymbol(wholeResponse.drawingAmount, wholeResponse.currency);
        scope.view.lblAmountCreditedValue.text = wholeResponse.amountCreditedTo;
        scope.view.lblFinanceUSValue.text = wholeResponse.financeUs;
        // Setting upload documents data into segment
        scope.view.segUploadDocuments.widgetDataMap = {
          lblListValue: "lblListValue",
          "flxDropdownValue" : "flxDropdownValue"
        };
        // Processing upload documents data
        var uploadDocData = [];
        wholeResponse.uploadedDocuments.map(function(docData) {
          uploadDocData.push({
            lblListValue: docData, 
            "flxDropdownValue": {
              "hoverSkin": "slFbox"
            },
          })
        });
        // setting data into segment
        scope.view.segUploadDocuments.setData(uploadDocData);

        // Setting physical documents data into segment
        scope.view.segPhysicalDocuments.widgetDataMap = {
          lblListValue: "lblListValue", 
          "flxDropdownValue" : "flxDropdownValue"
        };
        // Processing physical documents data
        var uploadPhysicalDocData = [];
        wholeResponse.physicalDocumentsDetails.map(function(physicalDocData, index) {
          if (index === 0) {
            uploadPhysicalDocData.push({
              lblListValue: {
                text: physicalDocData,
                skin: "sknlbl424242SSP15pxSemibold"
              }, 
               "flxDropdownValue": {
                "hoverSkin": "slFbox"
              },
            })
          } else {
            uploadPhysicalDocData.push({
              lblListValue: physicalDocData,
               "flxDropdownValue": {
                "hoverSkin": "slFbox"
              },
            })
          }
        });
        // setting data into segment
        scope.view.segPhysicalDocuments.setData(uploadPhysicalDocData);
        scope.view.lblDiscrepanciesValue.text = wholeResponse.discrepancies;
        scope.view.lblChargesDebitValue.text = wholeResponse.chargesDebitAccount;
         scope.view.lblMsgToBankValue.text = ('messageToTheBank' in wholeResponse && wholeResponse.messageToTheBank.length > 0) ? wholeResponse.messageToTheBank : kony.i18n.getLocalizedString("i18n.common.NA");
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCReviewSubmitController",
          "method": "settingDataInReviceTheDrawing",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setDataFori18n
     * Assigning i18n keys
     * @arg: NA
     * @return : NA
     */
    setDataFori18n: function() {
      var scope = this;
      try {
        this.view.lblLCTypeKey.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
        this.view.lblLCRefNoKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCReferenceNumber") + ":";
        this.view.lblApplicantKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.Applicant") + ":";
        this.view.lblExpireDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
        scope.view.lblExportLCReviewSubmit.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Exports") + "-" + kony.i18n.getLocalizedString("i18n.TradeFinance.Drawing") + "-" + kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ViewRequests");
        scope.view.lblDrawingStatus.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingStatus") + ":";
        scope.view.lblDrawingRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingRefNo") + ":";
        scope.view.lblDrawingDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingCreatedDate") + ":";
        scope.view.lblApplicant.text = kony.i18n.getLocalizedString("i18n.ExportLC.Applicant") + ":";
        scope.view.lblLCRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingLCRefNo") + ":";
        scope.view.lblLCType.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
        scope.view.lblIssueBank.text = kony.i18n.getLocalizedString("kony.mb.cardManage.issuingBank") + ":";
        scope.view.lblLCAmount.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":";
        scope.view.lblIssueDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":";
        scope.view.lblIssueLCRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingLCRefNo") + ":";
        scope.view.lblLCUntilizedAmount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCUntilizedAmount") + ":";
        scope.view.lblExpiryDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
        scope.view.DiscrepanciesandResponseValue.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ResponsetoDiscrepancies");
        scope.view.lblTotalDocuments.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TotalDocuments") + ":";
        scope.view.lblDocuments.text = "Documents:";
        scope.view.lblDocStatus.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DocumentStatus") + ":";
        scope.view.lblDrawingDetails.text = kony.i18n.getLocalizedString("i18n.TradeFinance.RevisetheDrawing");
        scope.view.lblDrawingRefKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingAmount") + ":";
        scope.view.lblAmountCreditedKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmounttobeCreditedto") + ":";
        scope.view.lblFinanceUSKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Financeus") + ":";
        scope.view.lblUploadDocsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.UploadedDocuments") + ":";
        scope.view.lblPhysicalDocDetailsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PhysicalDocumentDetails") + ":";
        scope.view.lblDiscrepanciesKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Forwarddespiteanydiscrepancies") + ":";
        scope.view.lblChargesDebitKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount") + ":";
        scope.view.lblMsgToBankKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankDrawings") + ":";
        scope.view.lblAmountCreditedValueInfo.text = "("+kony.i18n.getLocalizedString("i18n.TradeFinance.OtherBeneficiaryName") + ")";
        scope.view.lblFinanceUSInfo.text = "(" + kony.i18n.getLocalizedString("i18n.TradeFinance.ExportDrawingCheckContent") + ")";
        scope.view.lblDiscrepanciesValueInfo.text = "("+kony.i18n.getLocalizedString("i18n.TradeFinance.KindlyForwardDoc")+")";
        scope.view.btnSubmitReview.text = kony.i18n.getLocalizedString("i18n.CustomerFeedback.Submit");
        scope.view.btnBackReview.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnBack");
        scope.view.btnCloseReview.text = kony.i18n.getLocalizedString("i18n.common.close");
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setDataFori18n",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : updateFormUI
     * Invoked after API's successCallBack
     * @arg: NA
     * @return : NA
     */
    updateFormUI: function() {
      var scope = this;
      try {

      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "updateFormUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    loadTradeFinanceModule: function() {
      return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExportLCUIModule");
    },

    /**
     * @api : formNavigation
     * Deals about navigation from present form
     * @arg: NA
     * @return : NA
     */
    formNavigation: function(widgetName) {
      var scope = this;
      try {
        let formFriendlyName;
        let params = {};
        params = wholeResponse.finalResponse;
        var backendDiscrepency = wholeResponse.finalResponse.discrepencies;
        if(typeof(backendDiscrepency) === "string"){
          backendDiscrepency = backendDiscrepency;
        }
        else{
          backendDiscrepency = JSON.stringify(backendDiscrepency);
        }
        params.discrepencies = backendDiscrepency;
        var backendPhysicalDocuments = [];
        let length = wholeResponse.physicalDocumentsSegmentData.length;
        for (i = 0; i < length; i++) {
          let segSelected = wholeResponse.physicalDocumentsSegmentData[i];
          backendPhysicalDocuments[i] = {
            title: (segSelected.tbxEnterTitle.text !== "") ? segSelected.tbxEnterTitle.text : segSelected.lblSelectEnter.text,
            count1: segSelected.lblOriginalsCount.text,
            count2: segSelected.lblCopiesCount.text
          }
        }
        params.physicalDocuments = JSON.stringify(backendPhysicalDocuments);   
        var backendUploadedDocuments = wholeResponse.uploadedDocuments;
        backendUploadedDocuments = JSON.stringify(backendUploadedDocuments);
        params.uploadedDocuments = backendUploadedDocuments;
        params.messageToBank = wholeResponse.messageToTheBank;
        params.financeBill = wholeResponse.financeUs === "Selected"?"Yes":"No";
        params.financeBillFormatted = wholeResponse.financeUs;
        params.forwardDocuments = wholeResponse.discrepancies === "Selected"?"Yes":"No";
		params.forwardDocumentsFormatted = wholeResponse.discrepancies;
        if (widgetName === "btnSubmitReview") {          
          formFriendlyName = "frmExportLCDrawingAcknowledgement";
          // delete wholeResponse.finalResponse;
          // let presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExportLCUIModule").presentationController;
          // presenter.createDrawing(wholeResponse, "frmExportLCDrawingAcknowledgement");
          // return;         
          delete params.response;          
          JSON.stringify(params);
          this.loadTradeFinanceModule().presentationController.updateExportDrawings(params, "frmExportLCDrawingAcknowledgement");
        } else if (widgetName === "btnBackReview") {
          params.otherDrawingFiledsEnabled = wholeResponse.otherDrawingFiledsEnabled;
          formFriendlyName = "frmReviseDrawingDocUpload";
        } else if (widgetName === "btnCloseReview") {
          formFriendlyName = "frmExportLCDashboard";
        }
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ExportLCUIModule" + "/" + formFriendlyName
        }).navigate(params);
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCReviewSubmitController",
          "method": "formNavigation",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : viewLCPopup
     * shows LCDetails Popup
     * @arg: NA
     * @return : NA
     */
    viewLCPopup: function(visibility) {
      var scope = this;
      try {
        if (visibility === true) {
          scope.view.flxDialogs.setVisibility(true);
          scope.view.flxLogout.setVisibility(false);
          scope.view.flxViewLCDetailsPopup.setVisibility(true);
          let exportLCdata = lcAndDrawingResponse.lcResponse;
          let swiftsAndAdvises = (lcAndDrawingResponse.lcResponse.SwiftsAndAdvises) ? lcAndDrawingResponse.lcResponse.SwiftsAndAdvises[0] : "";
          //Assigning LC Details
          scope.view.lblLCDetailsHeader.text = kony.i18n.getLocalizedString("i18n.ImportLC.ExportLC") + " -" + exportLCdata.exportLCId;
          scope.view.lblLCTypeeValue.text = exportLCdata.lcType;
          scope.view.lblLCRefNoValue.text = exportLCdata.exportLCId;
          scope.view.lblLCApplicantValue.text = exportLCdata.applicant;
          scope.view.lblLCApplicantAddValue.text = exportLCdata.applicantaddress;
          scope.view.lblLCIssueBankalue.text = exportLCdata.issuingBank;
          scope.view.lblLCIssueBankAddValue.text = exportLCdata.issuingbankaddress;
          scope.view.lblLCIssueDateValue.text = exportLCdata.issueDate;
          scope.view.lblLCExpireDateValue.text = exportLCdata.expiryDate;
          scope.view.lblLCAmountValuee.text = applicationManager.getConfigurationManager().getCurrency(exportLCdata.currency) + " " + exportLCdata.amount;
          //Assigning Beneficiary Details
          scope.view.lblBenNameValue.text = exportLCdata.beneficiaryName;
          scope.view.lblBenAddValue.text = exportLCdata.beneficiaryAddress;
          scope.view.lblDescriptionValue.text = exportLCdata.goodsDescription;
          scope.view.lblAddValue.text = exportLCdata.additionalConditions;
          scope.view.lblConfirmValue.text = exportLCdata.confirmInstructions;
          scope.view.lblShipmentValue.text = exportLCdata.latestShipmentDate;
          scope.view.segUploadedDocs.widgetDataMap = {
            "flxDocContent": "flxDocContent",
            "flxDocumentName": "flxDocumentName",
            "flxExportLCUploadDocPopup": "flxExportLCUploadDocPopup",
            "flxMain": "flxMain",
            "flxPDFImage": "flxPDFImage",
            "imgPDF": "imgPDF",
            "lblDocumentName": "lblDocumentName"
          };
          let docnames = [];
          let uploadDocs = exportLCdata.uploadedFiles.split(",");
          for (var i = 0; i < uploadDocs.length; i++) {
            docnames[i] = {
              "lblDocumentName": {
                "text": uploadDocs[i]
              },
              "template": "flxExportLCUploadDocPopup"
            };
          }
          scope.view.segUploadedDocs.setData(docnames);
          scope.view.lblDocNameValue.text = exportLCdata.documentName;
          if(swiftsAndAdvises){
            scope.view.flxSwiftMessage.setVisibility(true);
            scope.view.lblMessageTypeValue.text = swiftsAndAdvises ? swiftsAndAdvises.swiftMessageType : "NA";
            scope.view.lblDeliveredValue.text = swiftsAndAdvises ? swiftsAndAdvises.swiftMessage : "NA";
            scope.view.lblSwiftDateValue.text = swiftsAndAdvises ? applicationManager.getFormatUtilManager().getFormattedCalendarDate(swiftsAndAdvises.swiftDate, "dd/mm/yyyy") : "NA";
            scope.view.lblMessageCategoryValue.text = swiftsAndAdvises ? swiftsAndAdvises.swiftCategory : "NA";
          }
          else {
            scope.view.flxSwiftMessage.setVisibility(false);
          }
        } else {
          scope.view.flxDialogs.setVisibility(false);
          scope.view.flxLogout.setVisibility(true);
          scope.view.flxViewLCDetailsPopup.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCReviewSubmitController",
          "method": "viewLCPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : toggleFlexDetailsVisibility
     * Showing and hiding the flex
     * @arg: imgArrow - image Label widget path to toggle
     * @arg: flexToToggle - flex widget path to toggle
     * @return : NA
     */
    toggleFlexDetailsVisibility: function (imgArrow, flexToToggle) {
      var scope = this;
      try {
        if (imgArrow.src === "arrowup_sm.png") {
          imgArrow.src = "dropdown.png";
          flexToToggle.setVisibility(false);
        } else {
          imgArrow.src = "arrowup_sm.png";
          flexToToggle.setVisibility(true);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCReviewSubmitController",
          "method": "toggleFlexDetailsVisibility",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @arg: NA
     * @return : NA
     */
    onError: function(err) {
      var errMsg = JSON.stringify(err);
      kony.ui.Alert(errMsg);
    },
  };
});