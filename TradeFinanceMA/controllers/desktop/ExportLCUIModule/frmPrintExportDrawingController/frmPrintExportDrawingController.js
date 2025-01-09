define(['OLBConstants'], function (OLBConstants) {
    let printModel = {};
    return {
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
        },
        preShow: function () {
        },
        postShow: function () {
            applicationManager.getNavigationManager().applyUpdates(this);
            if (printModel.drawingSummary.hasOwnProperty('ExportDrawing')) {
                // Print with both export LC and Drawing
                this.setDrawingDetails();
            } else {
                // Print with only export LC
                this.setLetterOfCreditDetails();
            }
            this.view.forceLayout();
            kony.os.print();
            setTimeout(function() {
              printModel.printCallback();
            }, "17ms");            
        },
        onNavigate: function (params) {
            printModel = params;
        },
        updateFormUI: function () {
        },
        setDrawingDetails: function () {
            const { ExportLetterOfCredit, ExportDrawing } = printModel.drawingSummary;
            const NA = kony.i18n.getLocalizedString("i18n.common.NA");
            const dataMap = {
                "lblHeader": "lblHeader",
                "lblKey": "lblKey",
                "lblValue": "lblValue",
                "rtxValue": "rtxValue"
            };
            let segData = [];
            const creditAccountDisplayName = this.getCreditAccountDisplayName(ExportDrawing.creditAccount);
            const LCSummary = [
                { lblHeader: kony.i18n.getLocalizedString("i18n.TradeFinance.LCSummary") },
                [
                    { lblKey: kony.i18n.getLocalizedString("i18n.ExportLC.Applicant") + ":", lblValue: { text: ExportDrawing.applicant, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.LCRefNo") + ":", lblValue: { text: ExportDrawing.lcReferenceNo, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.CreditAmount") + ":", lblValue: { text: ExportLetterOfCredit.amountFormatted, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":", lblValue: { text: ExportDrawing.lcType, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":", lblValue: { text: ExportLetterOfCredit.issueDateFormatted, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate") + ":", lblValue: { text: ExportDrawing.expiryDateFormatted, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.common.Currency") + ":", lblValue: { text: ExportDrawing.currency, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("kony.mb.cardManage.issuingBank") + ":", lblValue: { text: ExportLetterOfCredit.issuingBank, isVisible: true }, rtxValue: { isVisible: false } }
                ]
            ];
            const drawingDetails = [
                { lblHeader: kony.i18n.getLocalizedString("i18n.ImportLC.DrawingDetails") },
                [
                    { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingStatus") + ":", lblValue: { text: ExportDrawing.status, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.ImportDrawings.DrawingAmount") + ":", lblValue: { text: ExportDrawing.drawingAmount, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.common.Currency") + ":", lblValue: { text: ExportDrawing.currency, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.konybb.Common.CreditAccount") + ":", lblValue: { text: creditAccountDisplayName, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankDrawings") + ":", lblValue: { text: ExportDrawing.messageToBank || NA, isVisible: true }, rtxValue: { isVisible: false } }
                ]
            ];
            const uploadedDocuments = ExportDrawing.uploadedDocuments ? (JSON.parse(ExportDrawing.uploadedDocuments)).join('<br>') : NA;
            const discrepencies = ExportDrawing.discrepencies ? JSON.parse(ExportDrawing.discrepencies).map(x => Object.keys(x)[0]).join(', ') : NA;
            const documentDetails = [
                { lblHeader: kony.i18n.getLocalizedString("i18n.TradeFinance.DocumentsAndStatus") },
                [
                    { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.TotalDocuments") + ":", lblValue: { text: ExportDrawing.totalDocuments, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.ImportDrawings.DocumentType") + ":", lblValue: { text: ExportDrawing.documentStatus || NA, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.UploadedDocuments") + ":", lblValue: { isVisible: false }, rtxValue: { text: uploadedDocuments, isVisible: true } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.DiscrepantDetails") + ":", lblValue: { text: discrepencies, isVisible: true }, rtxValue: { isVisible: false } }
                ]
            ];
            const paymentDetails = [
                { lblHeader: kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails") },
                [
                    { lblKey: kony.i18n.getLocalizedString("i18n.ImportDrawings.PaymentStatus") + ":", lblValue: { text: ExportDrawing.paymentStatus || NA, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentDate") + ":", lblValue: { text: ExportDrawing.approvedDateFormatted || NA, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.TotalAmounttobePaid") + ":", lblValue: { text: ExportDrawing.totalAmountFormatted, isVisible: true }, rtxValue: { isVisible: false } },
                    { lblKey: kony.i18n.getLocalizedString("i18n.konybb.Common.CreditAccount") + ":", lblValue: { text: creditAccountDisplayName, isVisible: true }, rtxValue: { isVisible: false } }
                ]
            ];
            segData.push(LCSummary, drawingDetails, documentDetails, paymentDetails);
            this.view.segDetails.widgetDataMap = dataMap;
            this.view.segDetails.setData(segData);
            if (ExportDrawing.PaymentAdvices && ExportDrawing.PaymentAdvices.length > 0) {
                const paymentAdvicesdataMap = {
                    "lblValue1": "lblValue1",
                    "lblValue2": "lblValue2",
                    "lblValue3": "lblValue3",
                    "lblValue4": "lblValue4"
                };
                let segPaymentAdvicesdata = [];
                ExportDrawing.PaymentAdvices.forEach(advice => {
                    segPaymentAdvicesdata.push({
                        "lblValue1": advice.adviceName || NA,
                        "lblValue2": advice.paymentDate || NA,
                        "lblValue3": advice.advisingBank || NA,
                        "lblValue4": advice.message || NA
                    });
                });
                this.view.flxPaymentAdvices.setVisibility(true);
                this.view.segPaymentAdvices.widgetDataMap = paymentAdvicesdataMap;
                this.view.segPaymentAdvices.setData(segPaymentAdvicesdata);
            } else {
                this.view.flxPaymentAdvices.setVisibility(false);
            }
        },
        getCreditAccountDisplayName: function (accId) {
            const accounts = applicationManager.getAccountManager().getInternalAccounts() || [];
            for (const account of accounts) {
                if (account.accountID === accId)
                    return (account.accountName || account.AccountName || account.nickName) + '...' + accId.slice(-4);
            }
        },

        /**
         * @api : setLetterOfCreditDetails
         * Loading LC data in print form
         * @arg: NA
         * @return : NA
         */
        setLetterOfCreditDetails: function () {
            var scope = this;
            try {
                scope.view.flxPaymentAdvices.setVisibility(false);
                scope.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Exports");
                const data = printModel.drawingSummary
                const NA = kony.i18n.getLocalizedString("i18n.common.NA");
                const presenter = applicationManager.getModulesPresentationController({
                    appName: 'TradeFinanceMA',
                    moduleName: 'ExportLCUIModule'
                });
                const dataMap = {
                    "lblHeader": "lblHeader",
                    "lblKey": "lblKey",
                    "lblValue": "lblValue",
                    "rtxValue": "rtxValue"
                };
                let segData = [];
                let lcSummaryDetails = [{
                    lblKey: kony.i18n.getLocalizedString("i18n.ExportLC.LCReferenceNumber") + ":",
                    lblValue: data.lcReferenceNo || NA,
                }];
                if (data.status !== OLBConstants.EXPORT_LC_STATUS.NEW) {
                    lcSummaryDetails.push({
                        lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.updatedOn") + ":",
                        lblValue: data.lcUpdatedOn ? presenter.formatUtilManager.getFormattedCalendarDate(data.lcUpdatedOn) : NA,
                    });
                }
                lcSummaryDetails.push({
                    lblKey: kony.i18n.getLocalizedString("i18n.serviceRequests.Status:"),
                    lblValue: {
                        text: data.status || NA,
                        skin: 'ICSknlbl424242SSPSemiBold13px'
                    }
                }, {
                    lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.receivedOnWithColon"),
                    lblValue: data.lcCreatedOn ? presenter.formatUtilManager.getFormattedCalendarDate(data.lcCreatedOn) : NA,
                });
                if (data.status === OLBConstants.EXPORT_LC_STATUS.NEW || data.status === OLBConstants.EXPORT_LC_STATUS.RETURNED_BY_BANK) {
                    lcSummaryDetails.push({
                        lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.beneficiaryConsentWithColon"),
                        lblValue: data.beneficiaryConsent || "Pending",
                    });
                }
                segData.push([
                    { lblHeader: kony.i18n.getLocalizedString("i18n.TradeFinance.LCSummary") },
                    lcSummaryDetails
                ]);
                // Constructing Beneficiary Consent data
                if (data.status !== OLBConstants.EXPORT_LC_STATUS.NEW || data.status !== OLBConstants.EXPORT_LC_STATUS.RETURNED_BY_BANK) {
                    let beneficiaryConsentDetails = [{
                        lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.beneficiaryConsentWithColon"),
                        lblValue: data.beneficiaryConsent || NA
                    }];
                    if (data.beneficiaryConsent === OLBConstants.EXPORT_LC_STATUS.REJECTED) {
                        beneficiaryConsentDetails.push({
                            lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.reasonForRejectionWithColon'),
                            lblValue: data.reasonForRejection || NA,
                        });
                    }
                    if (data.messageToBank) {
                        beneficiaryConsentDetails.push({
                            lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.messageToBankOptionalWithColon'),
                            lblValue: data.messageToBank || NA,
                        })
                    }
                    segData.push([
                        { lblHeader: kony.i18n.getLocalizedString("i18n.TradeFinance.beneficiaryConsent") },
                        beneficiaryConsentDetails
                    ]);
                }
                // Constructing data for LC Details
                const lcDetailsData = [
                    { lblHeader: kony.i18n.getLocalizedString("i18n.ImportLC.LCDetails") },
                    [
                        { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.lcReferenceNumberWithColon"), lblValue: scope.dataAvailableInResponseOrNot("lcReferenceNo") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.ApplicantWithColon"), lblValue: scope.dataAvailableInResponseOrNot("applicant") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.lcTypeWithColon"), lblValue: scope.dataAvailableInResponseOrNot("lcType") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.applicantAddressWithColon"), lblValue: scope.dataAvailableInResponseOrNot("applicantaddress") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.issuingBankWithColon"), lblValue: scope.dataAvailableInResponseOrNot("issuingBank") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.ExportLC.IssuingBankAddress") + ":", lblValue: scope.dataAvailableInResponseOrNot("issuingbankaddress") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.issueDateWithColon"), lblValue: scope.dataAvailableInResponseOrNot("issueDateFormatted") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.Wealth.expiryDate"), lblValue: scope.dataAvailableInResponseOrNot("expiryDateFormatted") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.lcAmountWithColon"), lblValue: scope.dataAvailableInResponseOrNot("amountFormatted") }
                    ]
                ];
                // Constructing BeneficiaryDetails data
                const beneficiaryDetailsData = [
                    { lblHeader: kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryDetails") },
                    [
                        { lblKey: kony.i18n.getLocalizedString("i18n.userManagement.Name"), lblValue: scope.dataAvailableInResponseOrNot("beneficiaryName") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.ChequeBookReq.Address"), lblValue: scope.dataAvailableInResponseOrNot("beneficiaryAddress") }
                    ]
                ];
                // Constructing Good & Shipment Details data
                const goodAndShipmentDetailsData = [
                    { lblHeader: kony.i18n.getLocalizedString("i18n.ExportLC.GoodShipmenDetails") },
                    [
                        { lblKey: kony.i18n.getLocalizedString("i18n.ExportLC.GoodsDescription") + ":", lblValue: scope.dataAvailableInResponseOrNot("goodsDescription") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.ExportLC.AdditionalConditions") + ":", lblValue: scope.dataAvailableInResponseOrNot("additionalConditions") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.ExportLC.ConfirmInstructions") + ":", lblValue: scope.dataAvailableInResponseOrNot("confirmInstructions") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.latestShipmentDateWithColon"), lblValue: scope.dataAvailableInResponseOrNot("latestShipmentDate") }
                    ]
                ];
                // Constructing Good & Shipment Details data
                // Processing UploadedFiles data
                let tempUploadedFiles = [];
                let uploadedFiles = scope.dataAvailableInResponseOrNot("uploadedFiles");
                if (uploadedFiles !== kony.i18n.getLocalizedString("i18n.common.NA")) {
                    if (uploadedFiles instanceof Array) {
                        JSON.parse(uploadedFiles).map(function(docItem) {
                            tempUploadedFiles.push(docItem.join('<br>'));
                        }); 
                    } else {
                        tempUploadedFiles = uploadedFiles;
                    }
                } else {
                    tempUploadedFiles = uploadedFiles;
                }
                const documentsAndTermsData = [
                    { lblHeader: kony.i18n.getLocalizedString("i18n.ImportLC.DocumentsandTerms") },
                    [
                        { lblKey: kony.i18n.getLocalizedString("i18n.ExportLC.DocumentName") + ":", lblValue: scope.dataAvailableInResponseOrNot("documentName") },
                        { lblKey: kony.i18n.getLocalizedString("i18n.TradeFinance.uploadedFilesWithColon"), lblValue: { isVisible: false }, rtxValue: { text: tempUploadedFiles, isVisible: true } },
                    ]
                ];
                segData.push(lcDetailsData, beneficiaryDetailsData, goodAndShipmentDetailsData, documentsAndTermsData);
                scope.view.segDetails.widgetDataMap = dataMap;
                scope.view.segDetails.setData(segData);
            } catch (err) {
              var errorObj = {
                "level": "frmPrintExportDrawingController",
                "method": "setLetterOfCreditDetails",
                "error": err
              };
              scope.onError(errorObj);
            }
        },

        /**
         * @api : dataAvailableInResponseOrNot
         * Checking data available in response or not
         * @arg: NA
         * @return : NA
         */
        dataAvailableInResponseOrNot: function (requiredData) {
            var scope = this;
            try {
                if (!kony.sdk.isNullOrUndefined(printModel.drawingSummary[requiredData])) {
                    return printModel.drawingSummary[requiredData];
                } else {
                    return kony.i18n.getLocalizedString("i18n.common.NA");
                }
            } catch (err) {
              var errorObj = {
                "level": "frmPrintExportDrawingController",
                "method": "dataAvailableInResponseOrNot",
                "error": err
              };
              scope.onError(errorObj);
            }
        },

        /**
         * @api : dataAvailableInSwiftResponseOrNot
         * Checking data available in swift response or not
         * @arg: NA
         * @return : NA
         */
         dataAvailableInSwiftResponseOrNot: function (requiredData) {
            var scope = this;
            try {
                if (!kony.sdk.isNullOrUndefined(printModel.drawingSummary.SwiftsAndAdvises)) {
                    if (printModel.drawingSummary.SwiftsAndAdvises.length > 0 && !kony.sdk.isNullOrUndefined(printModel.drawingSummary.SwiftsAndAdvises[0][requiredData])) {
                        return printModel.drawingSummary.SwiftsAndAdvises[0][requiredData]
                    } else {
                        return kony.i18n.getLocalizedString("i18n.common.NA");
                    }
                } else {
                    return kony.i18n.getLocalizedString("i18n.common.NA");
                }
            } catch (err) {
              var errorObj = {
                "level": "frmPrintExportDrawingController",
                "method": "dataAvailableInSwiftResponseOrNot",
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
        onError: function (err) {
            let errMsg = JSON.stringify(err);
            kony.ui.Alert(errMsg);
        },
    }
});