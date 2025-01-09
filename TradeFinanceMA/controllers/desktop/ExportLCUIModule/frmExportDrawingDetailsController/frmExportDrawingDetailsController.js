define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
  let recordData = null;
  let finalResponse = {};
  let isTablet = false;
  return {
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
          if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
            isTablet = true;
          } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
            isTablet = false;
          }
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
         * @api : onNavigate
         * This function will execute user navigated to present form
         * @return : NA
         */
        onNavigate: function (record) {
            var scope = this;
            try {
                if (record && record.ExportLetterOfCredit && !record.hasOwnProperty('printCancel')) {
                    recordData = record;
                    finalResponse.lcResponse = record.ExportLetterOfCredit;
                } else {
                    this.initiateDataAppendingInUI();
                }
                recordData.printCancel = record && record.hasOwnProperty('printCancel') ? record.printCancel : false;
                this.view.preShow = this.preShow;
                this.view.postShow = this.postShow;
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "onNavigate",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : preShow
         * Performs the actions required before rendering form
         * @return : NA
         */
        preShow: function () {
            var scope = this;
            try {
                 this.exportLCPresenter = applicationManager.getModulesPresentationController({
                    appName: 'TradeFinanceMA',
                    moduleName: 'ExportLCUIModule'
                });
                FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
                this.view.flxDialogs.height = kony.os.deviceInfo().screenHeight + 120 + "dp";
                scope.view.customheadernew.forceCloseHamburger();
                scope.view.customheadernew.activateMenu("TradeFinance", "Exports");
                this.initActions();
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "preShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : postShow
         * Performs the actions required after rendering component
         * @return : NA
         */
        postShow: function () {
            var scope = this;
            try {
                this.setDataFori18n();
                scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
                if (!recordData.printCancel) {
                    this.exportLCPresenter.getExportDrawingByIdSuccess("frmExportDrawingDetails", recordData.ExportDrawing);
                } else {
                    this.view.flxLCSummary.setVisibility(true);
                    this.view.flxDrawingDetails.setVisibility(true);
                }
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : updateFormUI
         * Method to initiate loading values into UI
         * @arg: viewModel - response of service
         * @return : NA
         */
        updateFormUI: function (viewModel) {
            var scope = this;
            try {
                // Toggling the loader
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (viewModel.getExportDrawing) {
                    finalResponse.drawingResponse = viewModel.getExportDrawing;
                    this.initiateDataAppendingInUI();
                }
                if (viewModel.serverError) {
                    this.renderError(viewModel.serverError);
                }
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "updateFormUI",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
        * @api : initiateDataAppendingInUI
        * Appending data in UI initially
        * @arg: NA
        * @return : NA
        */
        initiateDataAppendingInUI: function () {
            var scope = this;
            try {
                this.view.flxLCSummary.setVisibility(false);
                this.view.flxDrawingDetails.setVisibility(false);
                this.view.flxDocumentStatusAndPaymentDetails.setVisibility(false);
                this.view.flxDiscrepanciesandResponse.setVisibility(false);
                this.view.lblExportLCDrawingHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Exports") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.Drawing") + " - " + recordData.ExportDrawing.drawingReferenceNo;
                // Initiating function to set data in LC summery flex
                this.setDataInLcUI();
                // Initiating function to set data in Submitted to Bank flex
                this.setDataInDrawingDetailsUI();
                // Initiating function to set data in Documents and Status Flex
                if (finalResponse.drawingResponse.status === OLBConstants.EXPORT_DRAWING_STATUS.SETTLED) {
                    this.view.flxDocumentStatusAndPaymentDetails.setVisibility(true);
                    this.setDataInDocumentStatusAndPaymentDetailsUI();
                    this.view.flxDiscrepanciesandResponse.setVisibility(false);
                } else {
                    this.view.flxDocumentStatusAndPaymentDetails.setVisibility(false);
                }
                // Initiating function to set data in Discrepancies and Response flex
                if ("discrepencies" in finalResponse.drawingResponse && finalResponse.drawingResponse.status !== "Completed") {
                    this.view.flxDiscrepanciesandResponse.setVisibility(true);
                    this.setDataInDiscrepanciesAndResponseUI();
                } else {
                    this.view.flxDiscrepanciesandResponse.setVisibility(false);
                }
                // Initiating function to set data in PaymentAdvice
                if ("PaymentAdvices" in finalResponse.drawingResponse && finalResponse.drawingResponse.PaymentAdvices.length > 0) {
                    this.view.flxPaymentAdvice.setVisibility(true);
                    this.setDataInPaymentAdviceUI();
                } else {
                    this.view.flxPaymentAdvice.setVisibility(false);
                }
            } catch (err) {
              var errorObj = {
                "level": "frmExportDrawingDetailsController",
                "method": "initiateDataAppendingInUI",
                "error": err
              };
              scope.onError(errorObj);
            }
        },

        /**
         * @api : setDataInLcUI
         * Assigning data in LC summery
         * @arg: NA
         * @return : NA
         */
        setDataInLcUI: function () {
            var scope = this;
            try {
                this.view.flxLCSummary.setVisibility(true);
                this.view.lblLCSummary.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCSummary");
                this.view.lblViewLCDetials.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewLCDetails");
                this.view.flxViewLCDetails.onClick = this.togglePopup.bind(this, true, "flxViewLCDetailsPopup");
                this.view.lblApplicantName.text = finalResponse.lcResponse.applicant;
                this.view.lblRightLCRefNo.text = finalResponse.lcResponse.exportLCId;
                this.view.lblLCAmountValue.text = finalResponse.lcResponse.amountFormatted;
                this.view.lblLCUntilizedAmountValue.text = finalResponse.lcResponse.utilizedLCAmountFormatted;
                this.view.lblLCTypeValue.text = finalResponse.lcResponse.lcType;
                this.view.lblIssueDateValue.text = finalResponse.lcResponse.issueDateFormatted;
                this.view.lblExpiryDateValue.text = finalResponse.lcResponse.expiryDateFormatted;
                this.view.lblIssueBankValue.text = finalResponse.lcResponse.issuingBank;
                this.view.lblIssuingRefNoValue.text = finalResponse.lcResponse.lcReferenceNo;
                // Setting data into View LC Details Popup
                let swiftsAndAdvises = (finalResponse.lcResponse.SwiftsAndAdvises) ? finalResponse.lcResponse.SwiftsAndAdvises[0] : "";
                this.view.lblLCDetailsHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Exports") + " - " + finalResponse.lcResponse.exportLCId;
                this.view.flxCross.onClick = this.togglePopup.bind(this, false, "flxViewLCDetailsPopup");
                this.view.lblLcDetails.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCDetails");
                this.view.lblLCRefNoKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCReferenceNumber") + ":";
                this.view.lblLCRefNoValue.text = finalResponse.lcResponse.lcReferenceNo;
                this.view.lblLCTypeKey.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
                this.view.lblLCTypeeValue.text = finalResponse.lcResponse.lcType;
                this.view.lblApplicantKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.Applicant") + ":";
                this.view.lblLCApplicantValue.text = finalResponse.lcResponse.applicant;
                this.view.lblApplicantAddressKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.ApplicantAddress") + ":";
                this.view.lblLCApplicantAddValue.text = finalResponse.lcResponse.applicantaddress;
                this.view.lblIssuingBankKey.text = kony.i18n.getLocalizedString("kony.mb.cardManage.issuingBank") + ":";
                this.view.lblLCIssueBankalue.text = finalResponse.lcResponse.applicantaddress;
                this.view.lblIssuingBankAddressKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.IssuingBankAddress") + ":";
                this.view.lblLCIssueBankAddValue.text = finalResponse.lcResponse.issuingbankaddress;
                this.view.lblLCIssueDateValue.text = finalResponse.lcResponse.issueDateFormatted;
                this.view.lblLCIssueBankAddValue.text = finalResponse.lcResponse.issuingbankaddress;
                this.view.lblExpireDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
                this.view.lblLCExpireDateValue.text = finalResponse.lcResponse.expiryDateFormatted;
                this.view.lblLCAmountKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":";
                this.view.lblLCAmountValuee.text = finalResponse.lcResponse.amountFormatted;
                this.view.lblBeneficiaryDetails.text = kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryDetails");
                this.view.lblBenName.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Name") + ":";
                this.view.lblBenNameValue.text = finalResponse.lcResponse.beneficiaryName;
                this.view.lblBenAddress.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Address") + ":";
                this.view.lblBenAddValue.text = finalResponse.lcResponse.beneficiaryAddress;
                this.view.lblGoodShipment.text = kony.i18n.getLocalizedString("i18n.ExportLC.GoodShipmenDetails");
                this.view.lblGoodsDescription.text = kony.i18n.getLocalizedString("i18n.ExportLC.GoodsDescription") + ":";
                this.view.lblDescriptionValue.text = finalResponse.lcResponse.goodsDescription;
                this.view.lblAdditionalCon.text = kony.i18n.getLocalizedString("i18n.ExportLC.AdditionalConditions") + ":";
                this.view.lblAddValue.text = finalResponse.lcResponse.additionalConditions;
                this.view.lblConfirm.text = kony.i18n.getLocalizedString("i18n.ExportLC.AdditionalConditions") + ":";
                this.view.lblConfirmValue.text = finalResponse.lcResponse.confirmInstructions;
                this.view.lblShipmentDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendLatestShipmentDate") + ":";
                this.view.lblShipmentValue.text = finalResponse.lcResponse.latestShipmentDateFormatted;
                this.view.lblDocumentTerms.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DocumentTerms");
                this.view.lblDocumentName02.text = kony.i18n.getLocalizedString("i18n.ExportLC.DocumentName") + ":";
                this.view.lblDocNameValue.text = finalResponse.lcResponse.documentName;
                this.view.lblUploadedFiles.text = kony.i18n.getLocalizedString("i18n.ImportLC.UploadedFiles") + ":";
                scope.view.imgDrawingDetailsDropdown.cursorType = "pointer";
                scope.view.lblViewLCDetials.cursorType = "pointer";
                scope.view.imgSearchClose.cursorType = "pointer";
                scope.view.lblViewReturnedByBankHistory.cursorType="pointer";
                scope.view.lblDocNameValue.text = finalResponse.lcResponse.documentName;
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
              let uploadDocs = finalResponse.lcResponse.uploadedFiles.split(",");
              for (var i = 0; i < uploadDocs.length; i++) {
                docnames[i] = {
                  "lblDocumentName": {
                    "text": uploadDocs[i]
                  },
                  "template": "flxExportLCUploadDocPopup"
                };
              }
              this.view.segUploadedDocs.setData(docnames);
              if(swiftsAndAdvises){
                scope.view.flxSwiftMessage.setVisibility(true);
                scope.view.lblMessageTypeValue.text = swiftsAndAdvises ? swiftsAndAdvises.swiftMessageType :  kony.i18n.getLocalizedString("i18n.common.NA");
                scope.view.lblDeliveredValue.text = swiftsAndAdvises ? swiftsAndAdvises.swiftMessage :  kony.i18n.getLocalizedString("i18n.common.NA");
                scope.view.lblSwiftDateValue.text = swiftsAndAdvises ? applicationManager.getFormatUtilManager().getFormattedCalendarDate(swiftsAndAdvises.swiftDate, "dd/mm/yyyy") :  kony.i18n.getLocalizedString("i18n.common.NA");
                scope.view.lblMessageCategoryValue.text = swiftsAndAdvises ? swiftsAndAdvises.swiftCategory :  kony.i18n.getLocalizedString("i18n.common.NA");           
              }
              else {
                scope.view.flxSwiftMessage.setVisibility(false);
              }
              } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "setDataInLcUI",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setDataInDrawingDetailsUI
         * Setting data for Submitted to Bank flex
         * @arg: NA
         * @return : NA
         */
        setDataInDrawingDetailsUI: function () {
            var scope = this;
            try {
                this.view.flxDrawingDetails.setVisibility(true);
                this.view.lblDrawingDetails.text = kony.i18n.getLocalizedString("i18n.ImportLC.DrawingDetails");
                this.view.lblDrawingStatusKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingStatus") + ":";
                this.view.lblDrawingStatusValue.text = finalResponse.drawingResponse.status;
                this.view.lblDrawingRefKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingRefNo") + ":";
                this.view.lblDrawingRefValue.text = finalResponse.drawingResponse.drawingReferenceNo;
                this.view.lblDrawingCreatedKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingCreatedDate") + ":";
                this.view.lblDrawingCreatedValue.text = finalResponse.drawingResponse.drawingCreatedDateFormatted;
                this.view.lblDrawingAmountKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingAmount") + ":";
                this.view.lblDrawingAmountValue.text = finalResponse.drawingResponse.drawingAmountFormatted;
                this.view.lblAmountCreditedKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmounttobeCreditedto") + ":";
                this.view.lblAmountCreditedValue.text = finalResponse.drawingResponse.hasOwnProperty('amountToBeCreditedTo') ? CommonUtilities.getMaskedAccName(finalResponse.drawingResponse.amountToBeCreditedTo)[0] : kony.i18n.getLocalizedString("i18n.common.NA");
                if (finalResponse.drawingResponse.externalAccount) {
                    this.view.lblAmountCreditedValueInfo.setVisibility(true);
                    this.view.lblAmountCreditedValueInfo.text = "(" + kony.i18n.getLocalizedString("i18n.TradeFinance.OtherBeneficiaryName") + ")";
                } else {
                    this.view.lblAmountCreditedValueInfo.setVisibility(false);
                }
                this.view.lblFinanceUSKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Financeus") + ":";
                this.view.lblFinanceUSValue.text = finalResponse.drawingResponse.financeBillFormatted;
                this.view.lblFinanceUSInfo.text = "(" + kony.i18n.getLocalizedString("i18n.TradeFinance.ExportDrawingCheckContent") + ")";
                this.view.lblUploadDocsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.UploadedDocuments") + ":";
                // Setting upload documents data into segment
                scope.view.segUploadDocuments.widgetDataMap = {
                    lblListValue: "lblListValue", 
                    "flxDropdownValue" : "flxDropdownValue"
                };
                // Processing upload documents data
                var uploadDocData = [];
                JSON.parse(finalResponse.drawingResponse.uploadedDocuments).map(function(docData) {
                    uploadDocData.push({
                        lblListValue: docData, 
                        "flxDropdownValue": {
                            "hoverSkin": "slFbox"
                        },
                    })
                });
                // setting data into segment
                scope.view.segUploadDocuments.setData(uploadDocData);
                this.view.lblPhysicalDocDetailsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PhysicalDocumentDetails") + ":";
                // Setting physical documents data into segment
                this.view.segPhysicalDocuments.widgetDataMap = {
                    lblListValue: "lblListValue", 
                    "flxDropdownValue" : "flxDropdownValue"
                };
                // Processing physical documents data
                var physicalDocData = [];
                finalResponse.drawingResponse.physicalDocumentsFormatted.map(function(docData) {
                    physicalDocData.push({
                        lblListValue: docData,
                        "flxDropdownValue": {
                            "hoverSkin": "slFbox"
                        },
                    })
                });
                // setting data into segment
                this.view.segPhysicalDocuments.setData(physicalDocData);
                this.view.lblDiscrepanciesKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Forwarddespiteanydiscrepancies") + ":";
                this.view.lblDiscrepanciesValue.text = finalResponse.drawingResponse.forwardDocumentsFormatted;
                this.view.lblDiscrepanciesValueInfo.text = "(" + kony.i18n.getLocalizedString("i18n.TradeFinance.ExportDocumentCheckContent") + ")";
                this.view.lblChargesDebitKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount") + ":";
                this.view.lblChargesDebitValue.text = finalResponse.drawingResponse.chargesDebitAccount ? CommonUtilities.getMaskedAccName(finalResponse.drawingResponse.chargesDebitAccount)[0] : kony.i18n.getLocalizedString("i18n.common.NA");
                this.view.lblMsgToBankKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankDrawings") + ":";
                if ('messageToBank' in finalResponse.drawingResponse) {
                    this.view.lblMsgToBankValue.text = finalResponse.drawingResponse.messageToBank;
                } else {
                    this.view.lblMsgToBankValue.setVisibility(false);
                    this.view.lblMsgToBankKey.setVisibility(false);
                }
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "setDataInDrawingDetailsUI",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setDataInDiscrepanciesAndResponseUI
         * Setting data into Discrepancies and Response flex
         * @arg: NA
         * @return : NA
         */
    setDataInDiscrepanciesAndResponseUI: function () {
      var scope = this;
      try {
          if ('wholeDiscrepanciesHistory' in finalResponse.drawingResponse && finalResponse.drawingResponse.wholeDiscrepanciesHistory.length > 0) {
          var disOrder = scope.order(finalResponse.drawingResponse.wholeDiscrepanciesHistory.length+1);
          scope.view.flxViewReturnedByBankHistory.setVisibility(true);
          scope.view.lblViewReturnedByBankHistory.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewReturnedbyBankHistory") + " (" + finalResponse.drawingResponse.wholeDiscrepanciesHistory.length + ")";
          scope.view.flxViewReturnedByBankHistory.onClick = scope.displayDiscrepanciesHistoryPopup;
		  scope.view.lblDiscrepanciesandResponseValue.text =kony.i18n.getLocalizedString("i18n.TradeFinance.DiscrepanciesandResponse") + " (" + (disOrder) +  ")";
        } else {
          scope.view.flxViewReturnedByBankHistory.setVisibility(false);
          scope.view.lblDiscrepanciesandResponseValue.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DiscrepanciesandResponse") + " (1st)";
        }
        let totalDocuments = JSON.parse(finalResponse.drawingResponse.returnedDocuments);                
        this.view.lblTotalDocumentsValue.text =  JSON.stringify(totalDocuments.length);;
        this.view.segDocumentsValueContainer.widgetDataMap = {
          lblHeading: "lblHeading"
        };
        // segment data
        let docMasterData = [];
        JSON.parse(finalResponse.drawingResponse.returnedDocuments).map(function (docData) {
        docMasterData.push({
        lblHeading: docData
          })
        });
        //set the data to segment
        this.view.segDocumentsValueContainer.setData(docMasterData);
        this.view.lblDocStatusValue.text = finalResponse.drawingResponse.documentStatus;
        this.view.segDiscrepancyResponse.widgetDataMap = {
          lblLeft1: "lblLeft1",
          lblRight1: "lblRight1"
        };
        // segment data
        let discrepancyMasterData = finalResponse.drawingResponse.discrepanciesAndResponse;
        //set the data to segment
        this.view.segDiscrepancyResponse.setData(discrepancyMasterData);
      } catch (err) {
        var errorObj = {
          "level": "frmExportDrawingDetailsController",
          "method": "setDataInDiscrepanciesAndResponseUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

        /**
         * @api : setDataInDocumentStatusAndPaymentDetailsUI
         * Setting data into DocumentStatusAndPaymentDetails flex
         * @arg: NA
         * @return : NA
         */
        setDataInDocumentStatusAndPaymentDetailsUI: function () {
            var scope = this;
            try {
                // Setting data into Document Status block
                this.view.lblDrawingsAndStatus.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DocumentStatus");
                // Setting documents and other data into segment
                this.view.segDocuments.widgetDataMap = {
                    lblHeading: "lblHeading"
                };
                if (finalResponse.drawingResponse.hasOwnProperty('wholeDiscrepanciesHistory')) {
                    // segment data
                    let docMasterData = [];
                    JSON.parse(finalResponse.drawingResponse.wholeDiscrepanciesHistory[0].returnedDocuments).map(function(documentData) {
                        docMasterData.push({lblHeading: documentData});
                    });
                    // set the data to segment
                    this.view.segDocuments.setData(docMasterData);
                    this.view.lblTotalDocumentValue.text = docMasterData.length+"";
                    this.view.lblBankMessage.text = finalResponse.drawingResponse.wholeDiscrepanciesHistory[0].messageFromBank === "" ? kony.i18n.getLocalizedString("i18n.common.NA") : finalResponse.drawingResponse.wholeDiscrepanciesHistory[0].messageFromBank;
                }else{
                  let docMasterData = [];
                   if (finalResponse.drawingResponse.hasOwnProperty('returnedDocuments')) {
                  JSON.parse(finalResponse.drawingResponse.returnedDocuments).map(function(documentData) {
                      docMasterData.push({
                          lblHeading: documentData
                      });
                  });
                  this.view.segDocuments.setData(docMasterData);
                  this.view.lblTotalDocumentValue.text = docMasterData.length+"";
                   }
                  	this.view.lblBankMessage.text = finalResponse.drawingResponse.messageFromBank === "" ? kony.i18n.getLocalizedString("i18n.common.NA") : finalResponse.drawingResponse.messageFromBank;
                }
                this.view.lblDocumentStatusValue.text = finalResponse.drawingResponse.documentStatus;
                // Setting data into Payment Details block
                this.view.lblPaymentStatusValue.text = finalResponse.drawingResponse.paymentStatus;
                this.view.lblApprovedDateValue.text = CommonUtilities.getFrontendDateStringInUTC(finalResponse.drawingResponse.approvedDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
                this.view.lblTotalAmountToBePaidValue.text = 'totalAmount' in finalResponse.drawingResponse ? applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(Number(applicationManager.getFormatUtilManager().deFormatAmount(finalResponse.drawingResponse.totalAmount)),finalResponse.drawingResponse.currency) : kony.i18n.getLocalizedString("i18n.common.NA");
                this.view.lblAmounttobeCredittoValue.text = finalResponse.drawingResponse.amountToBeCreditedTo ? CommonUtilities.getMaskedAccName(finalResponse.drawingResponse.amountToBeCreditedTo)[0] : kony.i18n.getLocalizedString("i18n.common.NA");
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "setDataInDocumentStatusAndPaymentDetailsUI",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setDataInPaymentAdviceUI
         * Setting data into PaymentAdvice flex
         * @arg: NA
         * @return : NA
         */
        setDataInPaymentAdviceUI: function () {
            var scope = this;
            try {
                this.view.lblPaymentAdvice.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice");
                // Setting PaymentAdvice into segment
                this.view.segPaymentAdvise.widgetDataMap = {
                    drawingReferenceNo: "drawingReferenceNo",
                    lblPaymentAdvice: "lblPaymentAdvice",
                    lblDate: "lblDate",
                    lblAdvisingParty: "lblAdvisingParty",
                    lblActions: "lblActions",
                    flxActionContainer: "flxActionContainer"
                };
                let finalPaymentAdvices = [];
                finalResponse.drawingResponse.PaymentAdvices.map(function (paymentItem) {
                    let tempObj = {};
                    tempObj.drawingReferenceNo = paymentItem.drawingReferenceNo;
                    tempObj.lblPaymentAdvice = paymentItem.adviceName;
                    tempObj.lblDate = paymentItem.paymentDate;
                    tempObj.lblAdvisingParty = paymentItem.advisingBank;
                    tempObj.lblActions = kony.i18n.getLocalizedString("i18n.TradeFinance.View");
                    tempObj.flxActionContainer = { onClick: scope.paymentAdvicesViewClick.bind(scope) };
                    finalPaymentAdvices.push(tempObj);
                });
                // set the data to segment
                this.view.segPaymentAdvise.setData(finalPaymentAdvices);
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "setDataInPaymentAdviceUI",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : paymentAdvicesViewClick
         * Will get the details based on user click in PaymentAdvice
         * @arg: NA
         * @return : NA
         */
        paymentAdvicesViewClick: function () {
            var scope = this;
            try {
                // Selected item always at [0]
                let selectedRowIndex = scope.view.segPaymentAdvise.selectedRowIndex[0];
                let segmentData = scope.view.segPaymentAdvise.data;
                let selectedPaymentAdviceObj = {};
                finalResponse.drawingResponse.PaymentAdvices.map(function (paymentAdvicesItem) {
                    if (segmentData[selectedRowIndex].drawingReferenceNo === paymentAdvicesItem.drawingReferenceNo) {
                        selectedPaymentAdviceObj = paymentAdvicesItem;
                    }
                });
                scope.view.lblPaymentAdvice02.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice");
                scope.view.flxSearchIcon.onClick = scope.togglePopup.bind(scope, false, "flxMainPaymentPopup");
                // Setting PaymentAdvice into popup segment
                scope.view.segPaymentAdvice.widgetDataMap = {
                    lblLeft1: "lblLeft1",
                    lblRight1: "lblRight1"
                };
                // Processing segment data
                let formatUtil = applicationManager.getFormatUtilManager();
                let selectedPaymentAdvice = [{
                    lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.Beneficiary") + ":",
                    lblRight1: selectedPaymentAdviceObj.beneficiary
                }, {
                    lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentDate") + ":",
                    lblRight1: selectedPaymentAdviceObj.paymentDateFormatted
                }, {
                    lblLeft1: kony.i18n.getLocalizedString("i18n.common.creditedAmount") + ":",
                    lblRight1: selectedPaymentAdviceObj.creditedAmount ? formatUtil.formatAmountandAppendCurrencySymbol(selectedPaymentAdviceObj.creditedAmount, selectedPaymentAdviceObj.currency) :  kony.i18n.getLocalizedString("i18n.common.NA")
                }, {
                    lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.CreditedAccount") + ":",
                    lblRight1: recordData.ExportDrawing.creditAccount ? CommonUtilities.getMaskedAccName(recordData.ExportDrawing.creditAccount)[0] : kony.i18n.getLocalizedString("i18n.common.NA")
                }, {
                    lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebited") + ":",
                    lblRight1: selectedPaymentAdviceObj.charges ? formatUtil.formatAmountandAppendCurrencySymbol(selectedPaymentAdviceObj.charges, selectedPaymentAdviceObj.currency) :  kony.i18n.getLocalizedString("i18n.common.NA")
                }, {
                    lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingBank") + ":",
                    lblRight1: selectedPaymentAdviceObj.advisingBank
                }, {
                    lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingRefNo") + ":",
                    lblRight1: selectedPaymentAdviceObj.drawingReferenceNo
                }];

                // set the data into segment
                scope.view.segPaymentAdvice.setData(selectedPaymentAdvice);
                scope.togglePopup(true, "flxMainPaymentPopup");
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "paymentAdvicesViewClick",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
        * @api : displayDiscrepanciesHistoryPopup
        * Will render displayDiscrepanciesHistory in popup
        * @arg: NA
        * @return : NA
        */
        displayDiscrepanciesHistoryPopup: function () {
            var scope = this;
            try {
                scope.togglePopup(true, "flxMainReturnBankPopup");
                // Scrolls to the top
                scope.view.flxDialogs.setVisibility(true);
                scope.view.flxMainReturnBankPopup.setVisibility(true);
                // Forcing layout to display the changes in UI
                scope.view.forceLayout();
                scope.view.flxSearchClose.onClick = scope.togglePopup.bind(this, false, "flxMainReturnBankPopup");
                scope.view.lblReturnByBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedByBankHistory") + "(" + finalResponse.drawingResponse.wholeDiscrepanciesHistory.length + ")";
                const userObj = applicationManager.getUserPreferencesManager().getUserObj();
                // Setting DiscrepanciesHistory into segment
                scope.view.segReturnByBank.widgetDataMap = {
                    lblReturnBank: "lblReturnBank",
                    lblReturnDate: "lblReturnDate",
                    lblReasonReturn: "lblReasonReturn",
                    lblRightValue: "lblRightValue",
                    lblReasonReturn02: "lblReasonReturn02",
                    lblRightValue02: "lblRightValue02",
                    lblReasonReturn03: "lblReasonReturn03",
                    lblRightValue03: "lblRightValue03"
                };
                // Processing DiscrepanciesHistory data
                var data = finalResponse.drawingResponse.wholeDiscrepanciesHistory;
                let discrepanciesHistorySegMasterData = [];
                var discHistoryOrder = (data.length) + 1;
                for (var i = 0; i < data.length; i++) {
                    discHistoryOrder--;
                    discrepanciesHistorySegMasterData.push({
                        lblReturnBank: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank") + " (" + scope.order(discHistoryOrder) + ")" },
                        lblReturnDate: { text: data[i].returnedDate ? CommonUtilities.getDateAndTimeInUTC(data[i].returnedDate).substr(0, 10) : kony.i18n.getLocalizedString("i18n.common.NA") },
                        lblReasonReturn: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReasonforReturn") + ":" },
                        lblRightValue: { text: data[i].reasonForReturn },
                        lblReasonReturn02: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnMessagetoBank") + ":" },
                        lblRightValue02: { text: data[i].returnMessageToBank !== "" ? data[i].returnMessageToBank : kony.i18n.getLocalizedString("i18n.common.NA") },
                        lblReasonReturn03: { text: kony.i18n.getLocalizedString("i18n.TradeFinance.CorporateUserName") + ":" },
                        lblRightValue03: { text: userObj.userfirstname + ' ' + userObj.userlastname }
                    })
                }
                // set the data to segment
                scope.view.segReturnByBank.setData(discrepanciesHistorySegMasterData);
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "displayDiscrepanciesHistoryPopup",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

    /**
      * @api : order
      * @arg: discrepencies order
      * @return : nth order of descrepencies
      */
     order: function(number) {
      var scope = this;
      try{
      if(number % 100 >= 11 && number % 100 <= 13)
        return number + "th";

      switch(number % 10) {
        case 1: return number + "st";
        case 2: return number + "nd";
        case 3: return number + "rd";
      }

      return number + "th";
    }
      catch(err){
          var errorObj = {
          "level": "frmExportDrawingDetailsController",
          "method": "order",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
        * @api : togglePopup
        * Toggle the Discrepancies History Popup
        * @arg: toggleBoolean - boolean value to toggle the popup
        * @arg: popupView - view to toggle
        * @return : NA
        */
        togglePopup: function (toggleBoolean, popupView) {
            var scope = this;
            try {
                scope.view.flxDialogs.setVisibility(toggleBoolean);
                scope.view[popupView].setVisibility(toggleBoolean);
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "togglePopup",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : initActions
         * It'll deal about buttonClicks
         * @arg: NA
         * @return : NA
         */
        initActions: function () {
            var scope = this;
            try {
                this.view.btnBack.onClick = this.navigateToBack;
                this.view.btnBack.setVisibility(true);
                scope.view.flxVerticalEllipsisBody.onClick = scope.renderPrintAndDownload.bind(this);
                scope.view.lblVerticalEllipsis.onTouchEnd = () => {
                    if (scope.view.flxVerticalEllipsisDropdown.isVisible) {
                        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
                    }
                    else {
                        scope.view.flxVerticalEllipsisDropdown.setVisibility(true);
                    }
                };
                scope.view.flxDrawingDetailsDropdown.cursorType = "pointer";
                scope.view.flxDrawingDetailsDropdown.onClick = scope.toggleDrawingDetailsVisibility.bind(this, this.view.imgDrawingDetailsDropdown, "flxDrawingDetailsDropdown");
                scope.view.flxDocumentAndStatusDropDown.cursorType = "pointer";
                scope.view.flxDocumentAndStatusDropDown.onClick = scope.toggleDrawingDetailsVisibility.bind(this, this.view.imgDocumentAndStatus, "flxDocumentAndStatusDropDown");
                scope.view.flxPaymentDetailsDropDown.cursorType = "pointer";
                scope.view.flxPaymentDetailsDropDown.onClick = scope.toggleDrawingDetailsVisibility.bind(this, this.view.imgPaymentDetails,"flxPaymentDetailsDropDown");
                scope.view.flxPaymentAdviseDropDown.cursorType = "pointer";
                scope.view.flxPaymentAdviseDropDown.onClick = scope.toggleDrawingDetailsVisibility.bind(this, this.view.imgPaymentAdvise, "flxPaymentAdviseDropDown");
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "initActions",
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
        setDataFori18n: function () {
            var scope = this;
            try {
                scope.view.lblExportLCDrawingHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Exports") + "-" + kony.i18n.getLocalizedString("i18n.TradeFinance.Drawing");
                scope.view.lblApplicant.text = kony.i18n.getLocalizedString("i18n.ExportLC.Applicant") + ":";
                scope.view.lblLCRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingLCRefNo") + ":";
                scope.view.lblLCType.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
                scope.view.lblIssueBank.text = kony.i18n.getLocalizedString("kony.mb.cardManage.issuingBank") + ":";
                scope.view.lblLCAmount.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":";
                scope.view.lblIssueDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":";
                scope.view.lblIssueLCRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingLCRefNo") + ":";
                scope.view.lblLCUntilizedAmount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCUntilizedAmount") + ":";
                scope.view.lblExpiryDate.text = kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate") + ":";
                scope.view.lblTotalDocument.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TotalDocuments") + ":";
                scope.view.lblDocumentName.text = kony.i18n.getLocalizedString("i18n.wealth.Documents") + ":";
                scope.view.lblDocumentStatus.text = kony.i18n.getLocalizedString("i18n.ImportDrawings.DocumentStatus") + ":";
                scope.view.lblMessageFromBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.MessagefromBank") + ":";
                scope.view.lblPaymentDetails.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails");
                scope.view.lblPaymentStatus.text = kony.i18n.getLocalizedString("i18n.ImportDrawings.PaymentStatus") + ":";
                scope.view.lblApprovedDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ApprovedDate") + ":";
                scope.view.lblTotalAmountToBePaid.text = kony.i18n.getLocalizedString("i18n.ImportDrawings.TotalAmountTobePaid") + ":";
                scope.view.lblAmounttobeCreditto.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmounttobeCreditto") + ":";
                scope.view.lblPaymentAdvice.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice") + ":";
                scope.view.lblAdviceName.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AdviseName");
                scope.view.lblDate.text = kony.i18n.getLocalizedString("i18n.ChequeManagement.Date");
                scope.view.lblAdviseParty.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AdviseParty");
                scope.view.lblAction.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Actions");
                scope.view.lblTotalDocuments.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TotalDocuments") + ":";
                scope.view.lblDocuments.text = kony.i18n.getLocalizedString("i18n.wealth.Documents") + ":";
                scope.view.lblDocStatus.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DocumentStatus") + ":";
            } catch (err) {
                var errorObj = {
                    "level": "FormController",
                    "method": "setDataFori18n",
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
              scope.exportLCPresenter.contextualMenuData.map(item => {
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
                if (recordData.ExportDrawing.status.toLowerCase() === (OLBConstants.EXPORT_DRAWING_STATUS.SETTLED).toLowerCase()) { 
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
                scope.exportLCPresenter.printExportDrawing({
                    drawingSummary: recordData,
                     printCallback: function() {
                        applicationManager.getNavigationManager().navigateTo({
                            appName: 'TradeFinanceMA',
                            friendlyName: 'frmExportDrawingDetails'
                        }, false, {
                            printCancel: true
                        });
                    }
                });
              } else if (id == "download") {
                scope.exportLCPresenter.generateExportDrawing({
                    drawingReferenceNo: recordData.ExportDrawing.drawingReferenceNo
                }, 'frmExportDrawingDetails');
              } else if (id == 'raiseQuery') {
                let record = recordData.ExportDrawing;
                let queryObj = {};
                queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${record.exportLCId}`;
                queryObj.descriptionObj = {};
                record.lcAmount && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.konybb.Common.Amount")] = record.lcAmount);
                record.lcReferenceNo && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingLCRefNo")] = record.lcReferenceNo);
                record.drawingCreatedDateFormatted && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingCreatedOn")] = record.drawingCreatedDateFormatted);
                record.expiryDateFormatted && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate")] = record.expiryDateFormatted);
                record.amountToBeCreditedTo && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.AmountCreditedTo")] = record.amountToBeCreditedTo);
                queryObj.tradeModule = true;
                scope.exportLCPresenter.showMessagesScreen(queryObj);
              }
            } catch (err) {
              var errorObj =
              {
                "level": "frmExportDrawingDetailsController",
                "method": "onPrintAndDownloadRowClick",
                "error": err
              };
              scope.onError(errorObj);
            }
          },

        /**
         * @api : navigateToBack
         * Navigating from present form to previous form
         * @arg: NA
         * @return : NA
         */
        navigateToBack: function () {
            var scope = this;
            try {
                let navManager = applicationManager.getNavigationManager();
                navManager.navigateTo({
                    appName: "TradeFinanceMA",
                    friendlyName: "ExportLCUIModule/frmExportLCDashboard"
                }, false, {flowType: 'GetAllExportDrawings'});
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "navigateToBack",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
        * @api : renderError
        * This function will help to display error flex
         * @arg: errorObj - object based on error
        * @return : NA
        */
        renderError: function (error) {
            var scope = this;
            try {
                if (error) {
                    // Scrolls to the top
                    scope.view.flxFormContent.setContentOffset({ x: "0%", y: "0%" }, true);
                    scope.view.flxErrorMessage.setVisibility(true);
                    scope.view.lblErrorMessage.text = error;
                    // Forcing layout to display the changes in UI
                    scope.view.forceLayout();
                }
            } catch (err) {
                var errorObj = {
                    "level": "frmExportDrawingDetailsController",
                    "method": "renderError",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : toggleDrawingDetailsVisibility
         * Setting document data into segment
         * @arg: imgDrawingDetailsDropdown - image id
         * @return : NA
         */
       toggleDrawingDetailsVisibility: function(imgName, sectionName) {
        var scope = this;
        try {
          if(sectionName === "flxDrawingDetailsDropdown"){
            if (imgName.src === "arrowup_sm.png") {
              imgName.src = "dropdown.png";
              this.view.flxDrawingContent.setVisibility(false);
            } else {
              imgName.src = "arrowup_sm.png";
              this.view.flxDrawingContent.setVisibility(true);
            }
          }
          else if(sectionName=== "flxDocumentAndStatusDropDown"){
            if (imgName.src === "arrowup_sm.png") {
              imgName.src = "dropdown.png";
              this.view.flxDocumentsAndStatusContent.setVisibility(false);
            } else {
              imgName.src = "arrowup_sm.png";
              this.view.flxDocumentsAndStatusContent.setVisibility(true);
            }
          }
          else if(sectionName === "flxPaymentDetailsDropDown"){
            if (imgName.src === "arrowup_sm.png") {
              imgName.src = "dropdown.png";
              this.view.flxPaymentDetailsContent.setVisibility(false);
            } else {
              imgName.src = "arrowup_sm.png";
              this.view.flxPaymentDetailsContent.setVisibility(true);
            }
        }
            else if(sectionName === "flxPaymentAdviseDropDown"){
            if (imgName.src === "arrowup_sm.png") {
              imgName.src = "dropdown.png";
              this.view.flxPaymentAdviceSubHeader.setVisibility(false);
              this.view.flxPaymentAdviceMessageBox.setVisibility(false);
            } else {
              imgName.src = "arrowup_sm.png";
              this.view.flxPaymentAdviceSubHeader.setVisibility(true);
              this.view.flxPaymentAdviceMessageBox.setVisibility(true);
            }
          }
        } catch (err) {
          var errorObj = {
            "level": "frmExportDrawingDetailsController",
            "method": "toggleDrawingDetailsVisibility",
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
        onError: function (err) {
            let errMsg = JSON.stringify(err);
            kony.ui.Alert(errMsg);
        },
    };
});