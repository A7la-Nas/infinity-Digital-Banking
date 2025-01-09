define(["FormControllerUtility", "CommonUtilities"], function (FormControllerUtility, CommonUtilities) {
    let lcData;
    return {
        exportLCdata: [],
        //Type your controller code here 
        onNavigate: function (params) {
            lcData = params["lcData"];
            this.setUIData(params);
            this.init();
        },
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExportLCUIModule").presentationController;
            this.navManager = applicationManager.getNavigationManager();
            this.initActions();
            this.setDataFori18n();
        },
        preShow: function () {
            var scope = this;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
            this.view.flxDialogs.height = kony.os.deviceInfo().screenHeight + 120 + "dp";
            scope.view.customheadernew.forceCloseHamburger();
            this.view.customheadernew.activateMenu("TradeFinance", "Exports");
        },
        postShow: function () {
            var scope = this;
            scope.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        initActions: function () {
            var scope = this;
            scope.view.btnSubmitReview.onClick = scope.naviagteToAck.bind(this, "btnSubmitReview");
            scope.view.btnBackReview.onClick = scope.naviagteToBack.bind(this, "btnBackReview");
            scope.view.btnCloseReview.onClick = scope.naviagteToClose.bind(this, "btnCloseReview");
            scope.view.flxViewLCDetails.onClick = scope.getViewLCDetails.bind(this);
            scope.view.flxCross.onClick = this.togglePopup.bind(this, false, "flxViewLCDetailsPopup");
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
                this.view.lblLCTypeKey.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
                this.view.lblLCRefNoKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCReferenceNumber") + ":";
                this.view.lblApplicantKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.Applicant") + ":";
                this.view.lblExpireDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
                scope.view.lblExportLCReviewSubmit.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Exports") + "-" + kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewDrawing") + "-" + kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ViewRequests");
                scope.view.lblApplicant.text = kony.i18n.getLocalizedString("i18n.ExportLC.Applicant") + ":";
                scope.view.lblLCRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingLCRefNo") + ":";
                scope.view.lblLCType.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
                scope.view.lblIssueBank.text = kony.i18n.getLocalizedString("kony.mb.cardManage.issuingBank") + ":";
                scope.view.lblLCAmount.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":";
                scope.view.lblIssueDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":";
                scope.view.lblIssueLCRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingLCRefNo") + ":";
                scope.view.lblLCUntilizedAmount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCUntilizedAmount") + ":";
                scope.view.lblExpiryDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
                scope.view.lblDrawingRefKey.text = kony.i18n.getLocalizedString("i18n.ImportDrawings.DrawingAmount") + ":";
                scope.view.lblAmountCreditedKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmounttobeCreditedto") + ":";
                scope.view.lblFinanceUSKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Financeus") + ":";
                scope.view.lblUploadDocsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.UploadedDocuments") + ":";
                scope.view.lblPhysicalDocDetailsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PhysicalDocumentDetails") + ":";
                scope.view.lblDiscrepanciesKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Forwarddespiteanydiscrepancies") + ":";
                scope.view.lblChargesDebitKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount") + ":";
                scope.view.lblMsgToBankKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankDrawings") + ":";
                scope.view.lblAmountCreditedValueInfo.text = "(" + kony.i18n.getLocalizedString("i18n.TradeFinance.OtherBeneficiaryName") + ")";
                scope.view.lblDiscrepanciesValueInfo.text = "(" + kony.i18n.getLocalizedString("i18n.TradeFinance.KindlyForwardDoc") + ")";
            } catch (err) {
                var errorObj = {
                    "level": "FormController",
                    "method": "setDataFori18n",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.getExportLetterOfCredit) {
                this.setViewLCDetails(viewModel.getExportLetterOfCredit);
            }
            if (viewModel.uploadDocuments) {
                this.saveDrawing(viewModel.uploadDocuments[0].documentReference);
            }
            if (viewModel.drawings) {
                this.navigateToAcknowlegment(viewModel.drawings);
            }
            if (viewModel.serverError) {
                this.view.flxError.setVisibility(true);
                this.view.lblErrorMsg.text = viewModel.serverError;
            }
        },
        navigateToAcknowlegment: function (data) {
            data.physicalDocumentsData = this.view.segPhysicalDocuments.data;
            data.uploadedDocumentsData = this.view.segUploadDocuments.data;
            data["lcData"] = lcData;
            this.navManager.navigateTo({
                appName: "TradeFinanceMA",
                friendlyName: "ExportLCUIModule/frmExportLCNewDrawingAck"
            }, false, data);
        },
        naviagteToAck: function () {
            this.saveDrawing();
            // var scope = this;
            // let data = {};
            // if (scope.exportLCdata.saveDrawings.length > 0) {
            //     data = scope.exportLCdata.saveDrawings;
            //     data.documentReference = scope.exportLCdata.documentReference;
            // } else {
            //     let documents = scope.exportLCdata.uploadAttachments.toString();
            //     if (scope.exportLCdata.uploadAttachments.length > 0) {
            //         this.presenter.uploadExportLCDocuments(documents, this.view.id);
            //     }
            // }
        },
        naviagteToBack: function () {
            var data = {};
            data.isModify = true;
            this.navManager.navigateTo({
                appName: "TradeFinanceMA",
                friendlyName: "ExportLCUIModule/frmExportLCCreateDrawings"
            }, false, data);
        },
        naviagteToClose: function () {
            this.navManager.navigateTo({
                appName: "TradeFinanceMA",
                friendlyName: "ExportLCUIModule/frmExportLCDashboard"
            }, false, {
                flowType: 'GetAllExportLettersOfCredit'
            });
        },
        saveDrawing: function (reference) {
            var scope = this;
            let saveDrawingDetails = {};
            let length = scope.exportLCdata.physicalDocumentsSegmentData.length;
            let physicalDocumentsDetails = [];
            let requestData = {};
            let data = {};
            let formData = {};
            saveDrawingDetails.drawingAmount = scope.exportLCdata.drawingAmount;
            saveDrawingDetails.financeBill = (scope.exportLCdata.financeUs === "Selected") ? "Yes" : "No";
            saveDrawingDetails.applicant = scope.exportLCdata.applicant;
            if (scope.exportLCdata.creditAccountID) {
                saveDrawingDetails.creditAccount = scope.exportLCdata.creditAccountID;
            } else {
                saveDrawingDetails.externalAccount = scope.exportLCdata.amountCreditedTo;
            }
            saveDrawingDetails.chargesDebitAccount = scope.exportLCdata.debitAccountID;
            saveDrawingDetails.messageToBank = scope.exportLCdata.messageToTheBank;
            saveDrawingDetails.status = "New";
            saveDrawingDetails.currency = scope.exportLCdata.currency;
            saveDrawingDetails.lcReferenceNo = scope.exportLCdata.lcReferenceNo;
            for (i = 0; i < length; i++) {
                let segSelected = scope.exportLCdata.physicalDocumentsSegmentData[i];
                physicalDocumentsDetails[i] = {
                    title: (segSelected.tbxEnterTitle.text !== "") ? segSelected.tbxEnterTitle.text : segSelected.lblSelectEnter.text,
                    count1: segSelected.lblOriginalsCount.text,
                    count2: segSelected.lblCopiesCount.text
                }
            }
            saveDrawingDetails.physicalDocuments = JSON.stringify(physicalDocumentsDetails)
            saveDrawingDetails.uploadedDocuments = JSON.stringify(scope.exportLCdata.uploadedDocuments);
            saveDrawingDetails.forwardDocuments = (scope.exportLCdata.discrepancies === "Selected") ? "Yes" : "No";
            //saveDrawingDetails.documentReference = reference;
            saveDrawingDetails.documentReference = scope.exportLCdata.documentReference;
            saveDrawingDetails.totalDocuments = (scope.exportLCdata.uploadedDocuments.length).toString();
            saveDrawingDetails.exportLCId = scope.exportLCdata.exportLCId;
            saveDrawingDetails.advisingBankReference = scope.exportLCdata.advisingBankReference;
            saveDrawingDetails.lcType = scope.exportLCdata.LcType;
            saveDrawingDetails.lcAmount = Number(applicationManager.getFormatUtilManager().deFormatAmount(scope.exportLCdata.LCAmount, applicationManager.getFormatUtilManager().getCurrencySymbol(scope.exportLCdata.currency))) + "";
            saveDrawingDetails.expiryDate = CommonUtilities.getBackendDateFormat(scope.exportLCdata.expiryDate, "dd/mm/yyyy");
            formData.physicalDocumentsData = scope.view.segPhysicalDocuments.data;
            formData.uploadedDocumentsData = scope.view.segUploadDocuments.data;
            formData.formattedCreditAccount = scope.exportLCdata.amountCreditedTo;
            formData.formattedChargesDebitAccount = scope.exportLCdata.chargesDebitAccount;
            requestData.params = saveDrawingDetails;
            requestData.formData = formData;
            scope.presenter.createDrawing(requestData, "frmExportLCNewDrawingAck");
            data["lcData"] = lcData;
            this.navManager.navigateTo({
                appName: "TradeFinanceMA",
                friendlyName: "ExportLCUIModule/frmExportLCNewDrawingAck"
            }, false, data);
        },
        getViewLCDetails: function () {
            let refNo = this.exportLCdata.exportLCId;
            this.presenter.getExportLetterOfCredit(refNo, this.view.id);
        },
        setUIData: function (data) {
            var scope = this;
            let physicalDocumentsData = [];
            let uploadDocumentsData = [];
            let documentsWidgetDataMap = {
                "lblListValue": "lblListValue",
                "flxDropdownValue": "flxDropdownValue"
            };
            scope.view.segUploadDocuments.widgetDataMap = documentsWidgetDataMap;
            scope.view.segPhysicalDocuments.widgetDataMap = documentsWidgetDataMap;
            for (let i = 0; i < data.physicalDocumentsDetails.length; i++) {
                physicalDocumentsData[i] = {
                    "lblListValue": {
                        "text": data.physicalDocumentsDetails[i],
                        "left": "0px"
                    },
                    "flxDropdownValue": {
                        "hoverSkin": "slFbox"
                    },
                    "template": "flxDropdownValue"
                };
            }
            for (let i = 0; i < data.uploadedDocuments.length; i++) {
                uploadDocumentsData[i] = {
                    "lblListValue": {
                        "text": data.uploadedDocuments[i],
                        "left": "0px"
                    },
                    "flxDropdownValue": {
                        "hoverSkin": "slFbox"
                    },
                    "template": "flxDropdownValue"
                };
            }
            scope.view.segPhysicalDocuments.setData(physicalDocumentsData);
            scope.view.segUploadDocuments.setData(uploadDocumentsData);
            scope.exportLCdata = data;
            scope.view.lblApplicantName.text = data.applicant;
            scope.view.lblRightLCRefNo.text = data.advisingLCRefNo;
            scope.view.lblLCTypeValue.text = data.LcType;
            scope.view.lblIssueBankValue.text = data.issuingBankName;
            scope.view.lblLCAmountValue.text = data.LCAmount;
            scope.view.lblIssueDateValue.text = data.issuingDate;
            scope.view.lblIssuingRefNoValue.text = data.issuingLCRefNumber;
            scope.view.lblLCUntilizedAmountValue.text = data.LCUtilizedAmount;
            scope.view.lblExpiryDateValue.text = data.expiryDate;
            scope.view.lblDrawingRefValue.text = applicationManager.getConfigurationManager().getCurrency(data.currency) + " " + data.amount;
            scope.view.lblAmountCreditedValue.text = data.amountCreditedTo;
            if (data.creditedAccount === "credit") {
                scope.view.lblAmountCreditedValueInfo.setVisibility(false);
            } else {
                scope.view.lblAmountCreditedValueInfo.setVisibility(true);
            }
            scope.view.lblFinanceUSValue.text = data.financeUs;
            scope.view.lblChargesDebitValue.text = data.chargesDebitAccount;
            //scope.view.lblUploadDocsValue.text = data.uploadedDocuments[0];
            //scope.view.lblPhysicalDocDetailsValue.text = data.physicalDocumentsDetails[0];
            scope.view.lblDiscrepanciesValue.text = data.discrepancies;
            scope.view.lblMsgToBankValue.text = data.messageToTheBank ? data.messageToTheBank : "NA";
        },
        setViewLCDetails: function (details) {
            let exportLCdata = details.ExportLC[0];
            let swiftsAndAdvises = (details.SwiftsAndAdvises) ? details.SwiftsAndAdvises[0] : "";
            this.togglePopup(true, "flxViewLCDetailsPopup");
            //Assigning LC Details
            this.view.lblLCDetailsHeader.text = "Export LC - " + exportLCdata.exportLCId;
            this.view.lblLCTypeeValue.text = exportLCdata.lcType;
            this.view.lblLCRefNoValue.text = exportLCdata.exportLCId;
            this.view.lblLCApplicantValue.text = exportLCdata.applicant;
            this.view.lblLCApplicantAddValue.text = exportLCdata.applicantaddress;
            this.view.lblLCIssueBankalue.text = exportLCdata.issuingBank;
            this.view.lblLCIssueBankAddValue.text = exportLCdata.issuingbankaddress;
            this.view.lblLCIssueDateValue.text = exportLCdata.issueDate;
            this.view.lblLCExpireDateValue.text = exportLCdata.expiryDate;
            this.view.lblLCAmountValuee.text = applicationManager.getConfigurationManager().getCurrency(exportLCdata.currency) + " " + exportLCdata.LCAmount;
            //Assigning Beneficiary Details
            this.view.lblBenNameValue.text = exportLCdata.beneficiaryName;
            this.view.lblBenAddValue.text = exportLCdata.beneficiaryAddress;
            this.view.lblDescriptionValue.text = exportLCdata.goodsDescription;
            this.view.lblAddValue.text = exportLCdata.additionalConditions;
            this.view.lblConfirmValue.text = exportLCdata.confirmInstructions;
            this.view.lblShipmentValue.text = exportLCdata.latestShipmentDate;
            this.view.segUploadedDocs.widgetDataMap = {
                "flxDocContent": "flxDocContent",
                "flxDocumentName": "flxDocumentName",
                "flxExportLCUploadDocPopup": "flxExportLCUploadDocPopup",
                "flxMain": "flxMain",
                "flxPDFImage": "flxPDFImage",
                "imgPDF": "imgPDF",
                "lblDocumentName": "lblDocumentName"
            };
            let docnames = [];
            let uploadDocs = exportLCdata.uploadedFiles.slice(1, -1).split(",");
            for (var i = 0; i < uploadDocs.length; i++) {
                docnames[i] = {
                    "lblDocumentName": {
                        "text": uploadDocs[i]
                    },
                    "template": "flxExportLCUploadDocPopup"
                };
            }
            this.view.segUploadedDocs.setData(docnames);
            this.view.lblDocNameValue.text = exportLCdata.documentName;
            if (swiftsAndAdvises) {
                this.view.flxSwiftMessage.setVisibility(true);
                this.view.lblMessageTypeValue.text = swiftsAndAdvises ? swiftsAndAdvises.swiftMessageType : "NA";
                this.view.lblDeliveredValue.text = swiftsAndAdvises ? swiftsAndAdvises.swiftMessage : "NA";
                this.view.lblSwiftDateValue.text = swiftsAndAdvises ? applicationManager.getFormatUtilManager().getFormattedCalendarDate(swiftsAndAdvises.swiftDate, "dd/mm/yyyy") : "NA";
                this.view.lblMessageCategoryValue.text = swiftsAndAdvises ? swiftsAndAdvises.swiftCategory : "NA";
            } else {
                this.view.flxSwiftMessage.setVisibility(false);
            }
        },
        togglePopup: function (visibility, flxpopup) {
            this.view.flxDialogs.setVisibility(visibility);
            this.view[flxpopup].setVisibility(visibility);
        },
    };
});