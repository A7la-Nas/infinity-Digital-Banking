define(["FormControllerUtility", "CommonUtilities", "OLBConstants"], function (FormControllerUtility, CommonUtilities, OLBConstants) {
    let lcData;
    let documentsList = [];
    let document = '';
    let docReferenceValues = [];
    let deletedIndex;
    return {
        documentTitle: [],
        count: 1,
        documentUploadsIndex: 0,
        documentsflag: true,
        enableOrDisableFlag: false,
        creditAccountSelected: false,
        debitAccountSelected: false,
        docTitleRowClick: false,
        assignmentOfProceedsFlag: false,
        financeUsflag: false,
        discrepanciesflag: false,
        debitAccountID: '',
        creditAccountID: '',
        exportLCdata: [],
        drawingsRefID: '',
        isModifyFlag: false,
        saveDrawingsData: {},
        saveDraftCloseFlag: false,
        docReferenceValues: [],
        disableSkin: "bbsknA0A0A015px",
        enableSkin: "bbSknLbl424242SSP15Px",
        creditedAccount: "credit",
        DEFAULT_PHYSICAL_DOC_TITLE: "Select Document Title",
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExportLCUIModule").presentationController;
            this.navManager = applicationManager.getNavigationManager();
            this.initActions();
        },
        onNavigate: function (params) {
            var scope = this;
            lcData = params;
            this.isModifyFlag = params.isModify;
            this.init();
            if (!params.isModify) {
                scope.seti18nkeys();
                scope.setUIData(params);
                scope.resetForm();
                scope.setSegmentData();
            }
            if (params.recordStatus === OLBConstants.EXPORT_DRAWING_STATUS.DRAFT) {
                scope.continueEditing(params);
            }
            else {
                scope.view.lblSelectedValueCurrency.text = "$";
                scope.view.segDropdownListCurrency.selectedKey = "USD";
            }
        },
        preShow: function () {
            var scope = this;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
            scope.view.customheadernew.forceCloseHamburger();
            scope.view.customheadernew.activateMenu("TradeFinance", "Exports");
            this.view.flxDialogs.height = kony.os.deviceInfo().screenHeight + 120 + "dp";
            scope.toggleSuccesPopup(false, "flxSuccess");
            scope.toggleSuccesPopup(false, "flxError");
            if (kony.sdk.isNullOrUndefined(scope.view.segDropdownListCurrency.selectedKey)) {
                scope.view.lblSelectedValueCurrency.text = "$";
                scope.view.segDropdownListCurrency.selectedKey = "USD";
            }
        },
        postShow: function () {
            var scope = this;
            scope.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.ClosePopup.onBreakpointChangeComponent(scope.view.DeletePopup, width);
            this.view.UploadDocumentPopup.onBreakpointChangeComponent(scope.view.DeletePopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            // responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        seti18nkeys: function () {
            try {
                var scope = this;
                this.view.lblLCTypeKey.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
                this.view.lblLCRefNoKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCReferenceNumber") + ":";
                this.view.lblApplicantKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.Applicant") + ":";
                this.view.lblExpireDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
                scope.view.lblSubHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Exports") + "-" + kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewDrawing")
                scope.view.lblLCSummary.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCSummary");
                scope.view.lblViewLCDetails.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewLCDetails");
                scope.view.lblApplicant.text = kony.i18n.getLocalizedString("i18n.ExportLC.Applicant") + ":";
                scope.view.lblAdvisingLCRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingLCRefNo") + ":";
                scope.view.lblLcAmount.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":";
                scope.view.lblLCUtilizedAmount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCUntilizedAmount") + ":";
                scope.view.lblLCType.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
                scope.view.lblLCType.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
                scope.view.lblIssueDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":";
                scope.view.lblExpiryDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
                scope.view.lblIssuingBank.text = kony.i18n.getLocalizedString("kony.mb.cardManage.issuingBank") + ":";
                scope.view.lblIssuingLCRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingLCRefNo") + ":";
                scope.view.lblCreateNewDrawing.text = kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewDrawing");
                scope.view.lblSave.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Save");
                scope.view.lblDrawingAmount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TheDrawingAmount");
                scope.view.lblCurrency.text = kony.i18n.getLocalizedString("i18n.common.Currency");
                scope.view.lblAmount.text = kony.i18n.getLocalizedString("i18n.ImportDrawings.DrawingAmount");
                scope.view.lblDrawingContent.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExportDrawingCheckContent");
                scope.view.lblAmountToBeCredited.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmounttobeCreditedto");
                scope.view.lblCreditAccount.text = kony.i18n.getLocalizedString("i18n.konybb.Common.CreditAccount");
                //scope.view.lblAssignProceeds.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmounttobeCreditedto");
                scope.view.lblSelectCreditAccount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SelectCreditAccount");
                scope.view.lblUploadScannedDocs.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Uploadscanneddocuments");
                scope.view.btnUpload.text = kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocument");
                scope.view.lblPhysicalDocTitle.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExportPysicalDocTitle");
                scope.view.btnAdd1.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AddTitlefromList");
                scope.view.btnAdd2.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AddTitleManually");
                scope.view.lblPhysicalDocContent.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExportDocumentCheckContent");
                scope.view.lblChargesAccount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesAccountandMessagetoBank");
                scope.view.lblChargesDebitAcc.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount");
                scope.view.lblBankAccountValue.text = kony.i18n.getLocalizedString("i18n.common.selecthere");
                scope.view.lblMessageToBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBank");
                scope.view.btnCreateDrawingClose.text = kony.i18n.getLocalizedString("i18n.common.close");
                scope.view.btnCreateDrawingSubmit.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SaveContinue");
            } catch (err) {
                var errorObj = {
                    "level": "frmExportLCCCreateDrawingsController",
                    "method": "seti118nKeys",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        initActions: function () {
            var scope = this;
            if (!scope.isModifyFlag) {
                scope.disableButton(scope.view.btnCreateDrawingSubmit);
                scope.view.flxUploadDocSeg.setVisibility(false);
            }
            //scope.restrictSpecialCharacters();
            scope.view.btnCreateDrawingClose.onClick = this.togglePopup.bind(this, true, "flxClose");
            scope.view.btnCreateDrawingSubmit.onClick = this.navigateSaveandContinue.bind(this);
            scope.view.flxDropdownCurrency.onClick = this.openCurrencyDropdown.bind(this);
            scope.view.segDropdownListCurrency.onRowClick = this.segDropdownListCurrencyRowClick.bind(this);
            scope.view.segCreditAccounts.onRowClick = this.segCreditAccountsRowClick.bind(this);
            scope.view.segDebitedFromDropdown.onRowClick = this.segDebitAccountsRowClick.bind(this);
            scope.view.segDocTitleDropdown.onRowClick = this.segDocTitleDropdownRowClick.bind(this, "segDocTitleDropdown", "lblSelectEnter", 1);
            scope.view.segSelectOriginalCopies.onRowClick = this.segDocTitleDropdownRowClick.bind(this, "segSelectOriginalCopies", "lblOriginalsCount", 2);
            scope.view.segCopiesCount.onRowClick = this.segDocTitleDropdownRowClick.bind(this, "segCopiesCount", "lblCopiesCount", 3);
            scope.view.flxCheckBox2.onClick = this.toggleCheckbox.bind(this, "lblPhysicalCheckbox", "discrepanciesflag");
            scope.view.flxCheckBox.onClick = this.toggleCheckbox.bind(this, "lblCheckBox", "financeUsflag");
            scope.view.flxCreditRadio.onClick = this.ontoggleCreditRadioButton.bind(this);
            scope.view.flxAssignProceedsRadio.onClick = this.ontoggleAssignProceedsRadioButton.bind(this);
            scope.view.flxInfoIcon.onClick = this.toggleAmountInfoPopup.bind(this, true);
            scope.view.flxAssignInfoClose.onClick = this.toggleAmountInfoPopup.bind(this, false);
            scope.view.flxUploadInfoIcon.onClick = this.toggleUploadDocumentInfoPopup.bind(this, true);
            scope.view.flxInfoClose.onClick = this.toggleUploadDocumentInfoPopup.bind(this, false);
            scope.view.btnUpload.onClick = this.browseSupportingDocument.bind(this);
            scope.view.flxSelecetCreditAccount.onClick = this.toggleCreditAccountDropdown.bind(this);
            scope.view.flxBankAccountValueContent.onClick = this.toggleDebitAccountDropdown.bind(this);
            scope.view.btnAdd1.onClick = this.addToTheList.bind(this, true);
            scope.view.btnAdd2.onClick = this.addToTheList.bind(this, false);
            scope.view.flxLCViewDetails.onClick = this.getViewLCDetails.bind(this);
            scope.view.flxCross.onClick = this.togglePopup.bind(this, false, "flxViewLCDetailsPopup");
            scope.view.flxSave.onClick = this.togglePopup.bind(this, true, "flxSaveDraft");
            scope.view.flxCloseBtn.onClick = this.toggleSuccesPopup.bind(this, false, "flxSuccess");
            scope.view.flxClose1.onClick = this.toggleSuccesPopup.bind(this, false, "flxError");
            scope.view.UploadDocumentPopup.btnNo.onClick = this.togglePopup.bind(this, false, "flxUploadDocumentPopup");
            scope.view.UploadDocumentPopup.btnYes.onClick = this.tryAgainBrowse.bind(this);
            scope.view.UploadDocumentPopup.flxCross.onClick = this.togglePopup.bind(this, false, "flxUploadDocumentPopup");
            scope.view.tbxAmount.onEndEditing = function () {
                scope.view.tbxAmount.text = scope.formatAmount(scope.view.tbxAmount.text);
                scope.enableOrDisableContinueButton();
            };
            scope.view.SaveDraftPopup.flxCross.onClick = this.togglePopup.bind(this, false, "flxSaveDraft");
            scope.view.SaveDraftPopup.btnYes.onClick = this.saveDraft.bind(this);
            scope.view.SaveDraftPopup.btnNo.onClick = this.togglePopup.bind(this, false, "flxSaveDraft");
            scope.view.ClosePopup.btnYes.onClick = this.saveDraftandClose.bind(this);
            scope.view.ClosePopup.btnNo.onClick = this.deleteDraft.bind(this);
            scope.view.ClosePopup.flxCross.onClick = this.togglePopup.bind(this, false, "flxClose");
            scope.view.tbxAmount.restrictCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,<>'`|\"";
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
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
                //this.saveDrawing(viewModel.uploadDocuments[0].documentReference);
                this.storeReferenveValues(viewModel.uploadDocuments[0].documentReference);
            }
            if (viewModel.drawings) {
                this.drawingsRefID = viewModel.drawings.drawingReferenceNo;
                this.saveDraftVariations();
            }
            if (viewModel.retrieveDocuments) {
                this.retrieveDocuments(viewModel.retrieveDocuments);
            }
            if (viewModel.deleteDrawing) {
                this.navigateClose();
            }
            if (viewModel.deleteDocument) {
                this.deleteUploadedDocument();
            }
            if (viewModel.serverError) {
                this.toggleSuccesPopup(false, "flxSuccess");
                this.toggleSuccesPopup(true, "flxError");
                this.view.lblErrorMsg.text = viewModel.serverError;
            }
        },
        resetForm: function () {
            var scope = this;
            scope.count = 1;
            scope.view.tbxAmount.text = '';
            scope.view.lblCheckBox.text = "D";
            scope.view.lblCreditRadio.text = "L";
            scope.view.lblCreditRadio.skin = "sknC0C0C020pxolbfonticons"
            scope.view.lblAssignRadio.text = "L";
            scope.view.lblAssignRadio.skin = "sknC0C0C020pxolbfonticons";
            scope.view.flxCreditRadioSelected.setVisibility(false);
            scope.view.flxAssignProceedsRadioSelected.setVisibility(false);
            scope.view.lblSelectCreditAccount.text = "Select Credit Account";
            scope.view.lblPhysicalCheckbox.text = "D";
            scope.view.txtAreaAssignmentofProceeds.text = "";
            scope.view.lblBankAccountValue.text = "Select here";
            scope.view.txtMessageToBankValue.text = '';
            documentsList = [];
            document = '';
            docReferenceValues = [];
            deletedIndex = '';
            scope.view.flxError.setVisibility(false);
            scope.view.flxSuccess.setVisibility(false);
            scope.view.flxAssignInfoUploadMsg.setVisibility(false);
            scope.view.flxInfoUploadMsg.setVisibility(false);
            scope.view.flxSegDocTitleDropdown.setVisibility(false);
            scope.view.flxSegSelectOriginal.setVisibility(false);
            scope.view.flxSegCopiesCount.setVisibility(false);
        },
        restrictSpecialCharacters: function () {
            var scopeObj = this;
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            scopeObj.view.tbxAmount.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
        },
        setSegmentData: function () {
            var scope = this;
            var currency = {
                'EUR': applicationManager.getConfigurationManager().getCurrency('EUR'),
                'USD': applicationManager.getConfigurationManager().getCurrency('USD')
            };
            scope.documentTitle = ["Drafts", "Invoices", "B/L or AWB", "Shipment Advice", "Cert. of Origin", "Insurance", "Packing List", " Weight List", "Inspection Cert.", "Beneficiary Cert.", "TCN/TWB", " Original LC", "Amendment"];
            var documentCopy = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "Will not submit"]
            var creditAccountsData = [];
            var currencySegmentData = [];
            let accountObj = applicationManager.getAccountManager();
            let accountData = accountObj.getInternalAccounts();
            let accountsWidgetDataMap = {
                "lblListValue": "lblListValue",
                "flxDropdownValueNew": "flxDropdownValueNew"
            };
            scope.view.segDropdownListCurrency.widgetDataMap = accountsWidgetDataMap;
            for (key in currency) {
                currencySegmentData.push({
                    "template": "flxDropdownValueNew",
                    "lblListValue": currency[key]
                });
            }
            scope.view.segDropdownListCurrency.setData(currencySegmentData);
            scope.view.segCreditAccounts.widgetDataMap = accountsWidgetDataMap;
            for (var i = 0; i < accountData.length; i++) {
                creditAccountsData[i] = {
                    "lblListValue": {
                        "text": CommonUtilities.getAccountDisplayName(accountData[i])
                    },
                    "accountID": accountData[i].account_id,
                    "template": "flxDropdownValueNew"
                };
            }
            scope.view.segCreditAccounts.setData(creditAccountsData);
            scope.view.segDebitedFromDropdown.widgetDataMap = accountsWidgetDataMap;
            scope.view.segDebitedFromDropdown.setData(creditAccountsData);
            scope.setDocumentsDropdownSegmentData("segDocTitleDropdown", scope.documentTitle);
            scope.setDocumentsDropdownSegmentData("segSelectOriginalCopies", documentCopy);
            scope.setDocumentsDropdownSegmentData("segCopiesCount", documentCopy);
            scope.setDocumentsData();
        },
        setDocumentsData: function () {
            var scope = this;
            scope.view.segSelectDocTitle.widgetDataMap = {
                "flxCopiesCount": "flxCopiesCount",
                "flxDelete": "flxDelete",
                "flxMain": "flxMain",
                "flxOriginalCount": "flxOriginalCount",
                "flxSelectDocTitle": "flxSelectDocTitle",
                "flxSelectDocument": "flxSelectDocument",
                "flxSelectDocumentTitleTablet": "flxSelectDocumentTitleTablet",
                "flxTextField": "flxTextField",
                "lblDelete": "lblDelete",
                "lblDropDown1": "lblDropDown1",
                "lblDropDown2": "lblDropDown2",
                "lblDropDown3": "lblDropDown3",
                "lblCopiesCount": "lblCopiesCount",
                "lblOriginalsCount": "lblOriginalsCount",
                "lblSelectEnter": "lblSelectEnter",
                "tbxEnterTitle": "tbxEnterTitle"
            };
            var documentsData = [];
            var breakPoint = kony.application.getCurrentBreakpoint();
            for (var i = 0; i < scope.count; i++) {
                documentsData[i] = {
                    "flxSelectDocTitle": {
                        "isVisible": true,
                        "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegDocTitleDropdown", 1)
                    },
                    "flxTextField": {
                        "isVisible": false
                    },
                    "lblSelectEnter": {
                        "text": "Select Document Title"
                    },
                    "lblOriginalsCount": {
                        "text": "Originals Count"
                    },
                    "lblCopiesCount": {
                        "text": "Copies Count"
                    },
                    "lblDropDown1": {
                        "text": "O"
                    },
                    "lblDropDown2": {
                        "text": "O"
                    },
                    "lblDropDown3": {
                        "text": "O"
                    },
                    "flxOriginalCount": {
                        "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegSelectOriginal", 2),
                        "width": breakPoint === 1024 ? "16%" : "14%"
                    },
                    "flxCopiesCount": {
                        "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegCopiesCount", 3),
                        "width": breakPoint === 1024 ? "16%" : "14%"
                    },
                    "tbxEnterTitle": {
                        "text": "",
                        "onEndEditing": scope.enableOrDisableContinueButton.bind(scope)
                    },
                    "flxDelete": {
                        "isVisible": true,
                        "onClick": scope.deleteDocuments.bind(scope)
                    },
                    "template": "flxSelectDocumentTitle"
                };
            }
            scope.view.segSelectDocTitle.setData(documentsData);
        },
        setDocumentsDropdownSegmentData: function (segment, records) {
            let segmentData = [];
            let documentsCopiesWidgetDataMap = {
                "flxDocumentDropDown": "flxDocumentDropDown",
                "flxLabel": "flxLabel",
                "flxMain": "flxMain",
                "lblField": "lblField"
            };
            this.view[segment].widgetDataMap = documentsCopiesWidgetDataMap;
            for (var i = 0; i < records.length; i++) {
                segmentData[i] = {
                    "lblField": {
                        "text": records[i],
                        "skin": this.enableSkin
                    },
                    "template": "flxDocumentDropDown"
                };
            }
            this.view[segment].setData(segmentData);
        },
        toggleDocumentDropdown: function (flxwidget, count) {
            var scope = this;
            var index = scope.view.segSelectDocTitle.selectedRowIndex;
            var rowIndex = index[1];
            scope.documentUploadsIndex = rowIndex;
            var data = scope.view.segSelectDocTitle.data[rowIndex];
            scope.documentsflag = data["flxSelectDocTitle"].isVisible;
            if (scope.view[flxwidget].isVisible) {
                scope.view[flxwidget].setVisibility(false);
                data["lblDropDown" + count].text = "O";
            } else {
                scope.view.flxSegDocTitleDropdown.setVisibility(false);
                scope.view.flxSegSelectOriginal.setVisibility(false);
                scope.view.flxSegCopiesCount.setVisibility(false);
                scope.view[flxwidget].top = 120 + (60 * rowIndex) + "dp";
                data["lblDropDown1"].text = "O";
                data["lblDropDown2"].text = "O";
                data["lblDropDown3"].text = "O";
                scope.view[flxwidget].setVisibility(true);
                data["lblDropDown" + count].text = "P";
            }
            scope.view.segSelectDocTitle.setDataAt(data, rowIndex);
        },
        deleteDocuments: function () {
            var scope = this;
            var index = scope.view.segSelectDocTitle.selectedRowIndex;
            var sectionIndex = index[0];
            var rowIndex = index[1];
            scope.count--;
            let segmentData = scope.view.segSelectDocTitle.data[rowIndex];
            if (segmentData.flxSelectDocTitle.isVisible === true && segmentData.lblSelectEnter.text !== "Select Document Title") {
                // let addedValue = segmentData.lblSelectEnter.text;
                // scope.documentTitle.push(addedValue);
                // scope.setDocumentsDropdownSegmentData("segDocTitleDropdown", scope.documentTitle);
                let index = scope.documentTitle.indexOf(segmentData.lblSelectEnter.text);
                scope.view.segDocTitleDropdown.data[index].lblField.skin = scope.enableSkin;
                scope.view.segDocTitleDropdown.setDataAt(scope.view.segDocTitleDropdown.data[index], index);
            }
            scope.view.segSelectDocTitle.removeAt(rowIndex, sectionIndex);
            if (scope.count < 20) {
                scope.disableOrEnable("btnAdd1", true, true);
                scope.disableOrEnable("btnAdd2", true, false);
            }
            if (scope.count === 0) {
                scope.view.lblDocumentError.setVisibility(true);
            }
            scope.enableOrDisableContinueButton();
        },
        navigateClose: function () {
            this.navManager.navigateTo({
                appName: "TradeFinanceMA",
                friendlyName: "ExportLCUIModule/frmExportLCDashboard"
            }, false, {
                flowType: 'GetAllExportLettersOfCredit'
            });
        },
        navigateSaveandContinue: function () {
            var data = this.getFormDetails();
            data.creditedAccount = this.creditedAccount;
            data["lcData"] = lcData;
            this.navManager.navigateTo({
                appName: "TradeFinanceMA",
                friendlyName: "ExportLCUIModule/frmExportLCNewReviewSubmit"
            }, false, data);
        },
        continueEditing: function (data) {
            var scope = this;
            scope.docReferenceValues = [];
            scope.view.lblSelectedValueCurrency.text = applicationManager.getConfigurationManager().getCurrency(data.currency);
            scope.view.segDropdownListCurrency.selectedKey = data.currency;
            this.view.tbxAmount.text = 'drawingAmount' in data ? data.drawingAmount : "";
            scope.view.lblCheckBox.text = (data.financeBill === "Yes") ? "C" : "D";
            if ('creditAccount' in data) {
                scope.view.flxCreditRadioSelected.setVisibility(true);
             	scope.view.flxAssignProceedsRadioSelected.setVisibility(false);
                scope.view.lblCreditRadio.text = "M";
                scope.view.lblCreditRadio.skin = "sknLblFontTypeIcon3343e820pxMOD";
                scope.view.lblAssignRadio.text = "L";
                scope.view.lblAssignRadio.skin = "sknC0C0C020pxolbfonticons";
                scope.view.lblSelectCreditAccount.text = data.creditAccount;
                var creditData = scope.view.segCreditAccounts.data;
                for (let i = 0; i < creditData.length; i++) {
                    if (data.creditAccount === creditData[i].accountID) {
                        this.view.lblSelectCreditAccount.text = creditData[i].lblListValue.text;
                        break;
                    }
                }
                scope.creditAccountSelected = true;
            } else if ('externalAccount' in data) {
                scope.view.flxAssignProceedsRadioSelected.setVisibility(true);
              	scope.view.flxCreditRadioSelected.setVisibility(false);
                scope.view.lblCreditRadio.text = "L";
                scope.view.lblCreditRadio.skin = "sknC0C0C020pxolbfonticons";
                scope.view.lblAssignRadio.text = "M";
                scope.view.lblAssignRadio.skin = "sknLblFontTypeIcon3343e820pxMOD";
                scope.view.txtAreaAssignmentofProceeds.text = data.externalAccount;
                scope.assignmentOfProceedsFlag = data.externalAccount ? true : false;
            }
            let values = eval(data.physicalDocuments)
            scope.count = values.length;
            scope.setDocumentsData();
            for (let i = 0; i < values.length; i++) {
                var segmentData = scope.view.segSelectDocTitle.data;
                segmentData[i].lblSelectEnter.text = values[i]["title"];
                segmentData[i].lblOriginalsCount.text = values[i]["count1"];
                segmentData[i].lblCopiesCount.text = values[i]["count2"];
                scope.view.segSelectDocTitle.setDataAt(segmentData[i], i);
                scope.docTitleRowClick = false;
                if (segmentData[i].lblSelectEnter.text !== "Select Document Title") {
                    let rowIndex = scope.documentTitle.indexOf(segmentData[i].lblSelectEnter.text);
                    scope.view.segDocTitleDropdown.data[rowIndex].lblField.skin = scope.disableSkin;
                    scope.view.segDocTitleDropdown.setDataAt(scope.view.segDocTitleDropdown.data[rowIndex], rowIndex);
                    scope.docTitleRowClick = true;
                }
                // scope.documentTitle.splice(rowIndex, 1);
                // scope.setDocumentsDropdownSegmentData("segDocTitleDropdown", scope.documentTitle);
            }
            scope.view.lblPhysicalCheckbox.text = (data.forwardDocuments === "Yes") ? "C" : "D";
            if (data.chargesDebitAccount) {
                var debitData = scope.view.segDebitedFromDropdown.data;
                for (var i = 0; i < debitData.length; i++) {
                    if (data.chargesDebitAccount === debitData[i].accountID) {
                        scope.view.lblBankAccountValue.text = debitData[i].lblListValue.text;
                        break;
                    }
                }
                this.debitAccountSelected = true;
            }
            scope.view.txtMessageToBankValue.text = data.messageToBank || "";
            if (data.documentReference) {
                const extensions = this.presenter.exportLCConfig.fileExtensions;
                documentsList = JSON.parse(data.uploadedDocuments).map(d => [d, extensions[d.split('.').pop()]]);
                docReferenceValues = data.documentReference.split(",");
                scope.setAttachmentsDataToSegment();
            }
            scope.enableOrDisableContinueButton();
        },
        convertDateFormat: function (date) {
            var datearray = date.split("/");
            var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
            return newdate;
        },
        getFormDetails: function () {
            var scope = this;
            var formDetails = {};
            let length = scope.view.segSelectDocTitle.data.length;
            let physicalDocumentsDetails = [];
            for (i = 0; i < length; i++) {
                let segSelected = scope.view.segSelectDocTitle.data[i];
                var docName = segSelected.flxTextField.isVisible ? segSelected.tbxEnterTitle.text : segSelected.lblSelectEnter.text;
                physicalDocumentsDetails[i] = docName + " (" + segSelected.lblOriginalsCount.text + ", " + segSelected.lblCopiesCount.text + ")";
            }
            formDetails.amount = this.view.tbxAmount.text;
            formDetails.applicant = this.view.lblApplicantValue.text;
            formDetails.advisingLCRefNo = this.view.lblAdvisingLCValue.text;
            formDetails.LcType = this.view.lblLCTypeValue.text;
            formDetails.issuingBankName = this.view.lblIssuingBankValue.text;
            formDetails.LCAmount = this.view.lblLCAmountValue.text;
            formDetails.issuingDate = this.view.lblIssueDateValue.text;
            formDetails.issuingLCRefNumber = this.view.lblIssuingLCRefNoValue.text;
            formDetails.LCUtilizedAmount = this.view.lblLCUtilizedAmountValue.text;
            formDetails.expiryDate = this.view.lblExpiryDateValue.text;
            formDetails.drawingAmount = this.deFormatAmount(this.view.tbxAmount.text);
            formDetails.amountCreditedTo = (scope.view.flxCreditRadioSelected.isVisible) ? scope.view.lblSelectCreditAccount.text : scope.view.txtAreaAssignmentofProceeds.text;
            formDetails.financeUs = scope.financeUsflag ? "Selected" : "Unselected";
            formDetails.uploadedDocuments = documentsList.map(d => d[0]);
            formDetails.physicalDocumentsDetails = physicalDocumentsDetails;
            formDetails.discrepancies = scope.discrepanciesflag ? "Selected" : "Unselected";
            formDetails.chargesDebitAccount = scope.view.lblBankAccountValue.text;
            formDetails.messageToTheBank = scope.view.txtMessageToBankValue.text;
            formDetails.exportLCId = scope.exportLCdata.exportLCId;
            formDetails.saveDrawings = scope.saveDrawingsData;
            formDetails.physicalDocumentsSegmentData = scope.view.segSelectDocTitle.data;
            formDetails.creditAccountID = scope.creditAccountID;
            formDetails.debitAccountID = scope.debitAccountID;
            formDetails.creditAccountIDFormatted = scope.view.lblSelectCreditAccount.text;
            formDetails.debitAccountFormatted = scope.view.lblBankAccountValue.text;
            formDetails.currency = scope.view.segDropdownListCurrency.selectedKey;
            formDetails.lcReferenceNo = scope.exportLCdata.lcReferenceNo;
            formDetails.advisingBankReference = scope.exportLCdata.advisingBankReference;
            formDetails.documentReference = docReferenceValues.join(",");
            // if (scope.drawingsRefID) {
            //     formDetails.documentReference = scope.drawingsRefID;
            // }
            return formDetails;
        },
        saveDraftVariations: function () {
            var scope = this;
            if (scope.saveDraftCloseFlag) {
                scope.navigateClose();
            } else {
                scope.toggleSuccesPopup(true, "flxSuccess");
            }
        },
        saveDraftandClose: function () {
            var scope = this;
            scope.saveDraftCloseFlag = true;
            scope.togglePopup(false, "flxClose");
            scope.saveDrawing();
        },
        saveDraft: function () {
            var scope = this;
            scope.saveDraftCloseFlag = false;
            scope.saveDrawing();
            scope.togglePopup(false, "flxSaveDraft");
        },
        deleteDraft: function () {
            var scope = this;
            scope.togglePopup(false, "flxClose");
            if (scope.drawingsRefID) {
                let params = {};
                params.drawingReferenceNo = scope.drawingsRefID;
                params.status = "Delete";
                this.presenter.deleteDraft(params, "frmExportLCDashboard");
                return;
            }
            scope.navigateClose();
        },
        storeReferenveValues: function (key) {
            documentsList.push(document);
            docReferenceValues.push(key);
            this.setAttachmentsDataToSegment();
        },
        getViewLCDetails: function () {
            let refNo = this.view.lblAdvisingLCValue.text;
            this.presenter.getExportLetterOfCredit(refNo, this.view.id);
        },
        togglePopup: function (visibility, flxpopup) {
            if (flxpopup === "flxClose") {
                this.deleteVariations();
            }
            this.view.SaveDraftPopup.lblHeading.skin = "sknSSP42424215Px";
            this.view.SaveDraftPopup.lblPopupMessage.skin = "sknSSP42424215Px";
            this.view.flxDialogs.setVisibility(visibility);
            this.view[flxpopup].setVisibility(visibility);
        },
        toggleSuccesPopup: function (visibility, widget) {
            this.view[widget].setVisibility(visibility);
        },
        deleteVariations: function () {
            if (this.drawingsRefID) {
                this.view.ClosePopup.lblPopupMessage.text = "Save the Export Drawing as draft before closing or delete this export drawing permanently.";
                this.view.ClosePopup.btnNo.text = "Delete Permanently";
            } else {
                this.view.ClosePopup.lblPopupMessage.text = "Save the Export Drawing as draft before closing or close this without saved.";
                this.view.ClosePopup.btnNo.text = "Close without Saving";
            }
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
            this.view.lblLCIssueDateValue.text = CommonUtilities.getFrontendDateStringInUTC(exportLCdata.issueDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
            this.view.lblLCExpireDateValue.text = CommonUtilities.getFrontendDateStringInUTC(exportLCdata.expiryDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
            this.view.lblLCAmountValuee.text = applicationManager.getConfigurationManager().getCurrency(exportLCdata.currency) + " " + exportLCdata.amount;
            //Assigning Beneficiary Details
            this.view.lblBenNameValue.text = exportLCdata.beneficiaryName;
            this.view.lblBenAddValue.text = exportLCdata.beneficiaryAddress;
            this.view.lblDescriptionValue.text = exportLCdata.goodsDescription;
            this.view.lblAddValue.text = exportLCdata.additionalConditions;
            this.view.lblConfirmValue.text = exportLCdata.confirmInstructions;
            this.view.lblShipmentValue.text = CommonUtilities.getFrontendDateStringInUTC(exportLCdata.latestShipmentDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
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
        uploadDocumentCall: function () {
            let documents = this.uploadedAttachments.toString();
            if (this.uploadedAttachments.length > 0) {
                this.presenter.uploadExportLCDocuments(documents, this.view.id);
            }
        },
        saveDrawing: function (reference) {
            var scope = this;
            scope.toggleSuccesPopup(false, "flxError");
            let saveDrawingDetails = {};
            let length = scope.view.segSelectDocTitle.data.length;
            let physicalDocumentsDetails = [];
            saveDrawingDetails.drawingAmount = scope.deFormatAmount(scope.view.tbxAmount.text);
            saveDrawingDetails.financeBill = scope.financeUsflag ? "Yes" : "No";
            saveDrawingDetails.applicant = scope.view.lblApplicantValue.text;
            if (scope.creditAccountSelected) {
                saveDrawingDetails.creditAccount = scope.creditAccountID;
            } 
            if (scope.assignmentOfProceedsFlag) {
                saveDrawingDetails.externalAccount = scope.view.txtAreaAssignmentofProceeds.text;
            }
            if (scope.debitAccountSelected) {
                saveDrawingDetails.chargesDebitAccount = scope.debitAccountID;
            }
            saveDrawingDetails.messageToBank = this.view.txtMessageToBankValue.text;
            saveDrawingDetails.status = "Draft";
            saveDrawingDetails.currency = scope.view.segDropdownListCurrency.selectedKey;
            saveDrawingDetails.lcReferenceNo = scope.exportLCdata.lcReferenceNo;
            for (i = 0; i < length; i++) {
                let segSelected = scope.view.segSelectDocTitle.data[i];
                var docName = segSelected.flxTextField.isVisible ? segSelected.tbxEnterTitle.text : segSelected.lblSelectEnter.text;
                if (docName !== scope.DEFAULT_PHYSICAL_DOC_TITLE) {
                    physicalDocumentsDetails[i] = {
                        title: docName,
                        count1: segSelected.lblOriginalsCount.text,
                        count2: segSelected.lblCopiesCount.text
                    };
                }
            }
            saveDrawingDetails.physicalDocuments = JSON.stringify(physicalDocumentsDetails);
            saveDrawingDetails.uploadedDocuments = JSON.stringify(documentsList.map(d => d[0]));
            saveDrawingDetails.forwardDocuments = scope.discrepanciesflag ? "Yes" : "No";
            saveDrawingDetails.documentReference = docReferenceValues.join(",");
            saveDrawingDetails.totalDocuments = (documentsList.length).toString();
            saveDrawingDetails.exportLCId = scope.exportLCdata.exportLCId;
            saveDrawingDetails.advisingBankReference = scope.exportLCdata.advisingBankReference;
            saveDrawingDetails.lcType = scope.exportLCdata.lcType;
            saveDrawingDetails.lcAmount = scope.exportLCdata.amount;
            saveDrawingDetails.expiryDate = scope.exportLCdata.expiryDateFormatted;
            scope.saveDrawingsData = saveDrawingDetails;
            let frmName = scope.saveDraftCloseFlag ? "frmExportLCDashboard" : this.view.id;
            if (scope.drawingsRefID !== '') {
                saveDrawingDetails.drawingReferenceNo = scope.drawingsRefID;
            }
            scope.presenter.createDrawing(saveDrawingDetails, frmName);
        },
        enableOrDisableContinueButton: function () {
            var scope = this;
            let amountFlag = (this.view.tbxAmount.text === "" || this.view.tbxAmount.text <= 0) ? false : true;
            if (!scope.view.flxCreditRadioSelected.isVisible) {
                scope.assignmentOfProceedsFlag = (this.view.txtAreaAssignmentofProceeds.text === "") ? false : true;
            } else {
                scope.assignmentOfProceedsFlag = scope.creditAccountSelected;
            }
            let length = scope.view.segSelectDocTitle.data.length;
            for (i = 0; i < length; i++) {
                let segSelected = scope.view.segSelectDocTitle.data[i];
                var docNameFlag = segSelected.flxTextField.isVisible ? (segSelected.tbxEnterTitle.text === "" ? false : true) : (segSelected.lblSelectEnter.text !== "Select Document Title" ? true : false);
                if (segSelected.lblCopiesCount.text !== "Copies Count" && segSelected.lblOriginalsCount.text !== "Originals Count" && docNameFlag) {
                    scope.docTitleRowClick = true;
                } else {
                    scope.docTitleRowClick = false;
                }
            }
            if (scope.debitAccountSelected && scope.docTitleRowClick && scope.assignmentOfProceedsFlag && amountFlag && documentsList.length > 0) {
                scope.enableButton(scope.view.btnCreateDrawingSubmit);
            } else {
                scope.disableButton(scope.view.btnCreateDrawingSubmit);
            }
        },
        enableButton: function (btnWidget) {
            btnWidget.setEnabled(true);
            btnWidget.skin = "ICSknsknBtnSSPffffff15pxBg0273e3";
        },
        disableButton: function (btnWidget) {
            btnWidget.setEnabled(false);
            btnWidget.skin = "ICSknbtnDisablede2e9f036px";
        },
        addToTheList: function (visibility) {
            var scope = this;
            scope.view.lblDocumentError.setVisibility(false);
            scope.count++;
            var breakPoint = kony.application.getCurrentBreakpoint();
            var data = {
                "flxSelectDocTitle": {
                    "isVisible": visibility,
                    "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegDocTitleDropdown", 1)
                },
                "flxTextField": {
                    "isVisible": !visibility
                },
                "lblSelectEnter": {
                    "text": "Select Document Title"
                },
                "lblOriginalsCount": {
                    "text": "Originals Count"
                },
                "lblCopiesCount": {
                    "text": "Copies Count"
                },
                "lblDropDown1": {
                    "text": "O"
                },
                "lblDropDown2": {
                    "text": "O"
                },
                "lblDropDown3": {
                    "text": "O"
                },
                "flxOriginalCount": {
                    "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegSelectOriginal", 2),
                    "width": breakPoint === 1024 ? "16%" : "14%"
                },
                "flxCopiesCount": {
                    "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegCopiesCount", 3),
                    "width": breakPoint === 1024 ? "16%" : "14%"
                },
                "flxDelete": {
                    "isVisible": true,
                    "onClick": scope.deleteDocuments.bind(scope)
                },
                "tbxEnterTitle": {
                    "text": "",
                    "onEndEditing": scope.enableOrDisableContinueButton.bind(scope)
                },
                "template": "flxSelectDocumentTitle"
            };
            scope.view.segSelectDocTitle.addDataAt(data, scope.count - 1);
            if (scope.count === 20) {
                scope.disableOrEnable("btnAdd1", false);
                scope.disableOrEnable("btnAdd2", false);
            }
            if (scope.documentTitle.length === 1 || scope.count === 13) {
                scope.disableOrEnable("btnAdd1", false);
            }
            scope.enableOrDisableContinueButton();
        },
        disableOrEnable: function (widget, flag, param) {
            this.view[widget].skin = flag ? "ICSknsknBtnffffffBorder0273e31pxRadius2px" : "ICSknbtnDisablede2e9f036px";
            this.view[widget].onClick = flag ? this.addToTheList.bind(this, param) : null;
        },
        setUIData: function (data) {
            if (data.drawingReferenceNo) {
                this.drawingsRefID = data.drawingReferenceNo;
            }
            this.exportLCdata = data;
            this.view.lblApplicantValue.text = data.applicant;
            this.view.lblAdvisingLCValue.text = data.exportLCId;
            this.view.lblLCTypeValue.text = data.lcType;
            this.view.lblIssuingBankValue.text = data.issuingBank;
            this.view.lblLCAmountValue.text = data.amountFormatted || data.drawingAmountFormatted;
            this.view.lblIssueDateValue.text = this.convertDateFormat(data.issueDateFormatted);
            this.view.lblIssuingLCRefNoValue.text = data.lcReferenceNo;
            this.view.lblLCUtilizedAmountValue.text = data.utilizedLCAmountFormatted;
            this.view.lblExpiryDateValue.text = this.convertDateFormat(data.expiryDateFormatted);
        },
        openCurrencyDropdown: function () {
            if (this.view.flxDropdownListCurrency.isVisible) {
                this.view.flxDropdownListCurrency.setVisibility(false);
                this.view.imgDropdownIconCurrency.src = "dropdown_expand.png";
            } else {
                this.view.flxDropdownListCurrency.setVisibility(true);
                this.view.imgDropdownIconCurrency.src = "dropdown_collapse.png";
            }
        },
        segDropdownListCurrencyRowClick: function () {
            var scope = this;
            var selectedAccount = this.view.segDropdownListCurrency.selectedRowItems[0];
            this.view.lblSelectedValueCurrency.text = selectedAccount.lblListValue;
            scope.view.segDropdownListCurrency.selectedKey = applicationManager.getConfigurationManager().getWireTransferCurrency(selectedAccount.lblListValue);
            this.openCurrencyDropdown();
        },
        segCreditAccountsRowClick: function () {
            var selectedAccount = this.view.segCreditAccounts.selectedRowItems[0];
            this.creditAccountID = selectedAccount.accountID;
            this.creditAccountSelected = true;
            this.view.lblSelectCreditAccount.text = selectedAccount.lblListValue.text;
            this.enableOrDisableContinueButton();
            this.toggleCreditAccountDropdown();
        },
        segDebitAccountsRowClick: function () {
            var selectedAccount = this.view.segDebitedFromDropdown.selectedRowItems[0];
            this.debitAccountID = selectedAccount.accountID;
            this.debitAccountSelected = true;
            this.view.lblBankAccountValue.skin = "ICSknLbl42424215PX";
            this.view.lblBankAccountValue.text = selectedAccount.lblListValue.text;
            this.enableOrDisableContinueButton();
            this.toggleDebitAccountDropdown();
        },
        segDocTitleDropdownRowClick: function (segment, selectedKey, count) {
            var scope = this;
            var selectedAccount = this.view[segment].selectedRowItems[0];
            let rowIndex = scope.view[segment].selectedRowIndex[1];
            var data = scope.view.segSelectDocTitle.data[scope.documentUploadsIndex];
            if (count === 1 && scope.view[segment].data[rowIndex].lblField.skin === scope.disableSkin) {
                return;
            }
            if (count === 1 && data[selectedKey].text !== "Select Document Title") {
                let index = scope.documentTitle.indexOf(data[selectedKey].text);
                scope.view[segment].data[index].lblField.skin = scope.enableSkin;
                scope.view[segment].setDataAt(scope.view[segment].data[index], index);
            }
            data[selectedKey].text = selectedAccount.lblField.text;
            if (count !== 1 && data[selectedKey].text !== "Will not submit") {
                let appenedLbl = count === 2 ? " Originals" : " Copies";
                data[selectedKey].text = selectedAccount.lblField.text + appenedLbl;
            }
            if (data["lblDropDown1"].text === "P") data["lblSelectEnter"].skin = "ICSknLbl42424215PX";
            if (data["lblDropDown2"].text === "P") data["lblOriginalsCount"].skin = "ICSknLbl42424215PX";
            if (data["lblDropDown3"].text === "P") data["lblCopiesCount"].skin = "ICSknLbl42424215PX";
            data["lblDropDown" + count].text = "O";
            scope.view.segSelectDocTitle.setDataAt(data, scope.documentUploadsIndex);
            scope.closeDocumentDropdowns();
            if (count === 1) {
                scope.view[segment].data[rowIndex].lblField.skin = scope.disableSkin;
                scope.view[segment].setDataAt(scope.view[segment].data[rowIndex], rowIndex);
            }
            scope.enableOrDisableContinueButton();
        },
        closeDocumentDropdowns: function () {
            var scope = this;
            scope.view.flxSegDocTitleDropdown.setVisibility(false);
            scope.view.flxSegSelectOriginal.setVisibility(false);
            scope.view.flxSegCopiesCount.setVisibility(false);
        },
        toggleCheckbox: function (widget, flag) {
            if (this.view[widget].text === "D") {
                this.view[widget].text = "C";
                this[flag] = true;
            } else {
                this.view[widget].text = "D";
                this[flag] = false;
            }
        },
        ontoggleCreditRadioButton: function () {
            this.view.flxCreditRadioSelected.setVisibility(true);
            this.view.flxAssignProceedsRadioSelected.setVisibility(false);
            this.ontoggleRadioButton("lblCreditRadio", "lblAssignRadio");
            this.creditedAccount = "credit";
        },
        ontoggleAssignProceedsRadioButton: function () {
            this.view.flxAssignProceedsRadioSelected.setVisibility(true);
            this.view.flxCreditRadioSelected.setVisibility(false);
            this.ontoggleRadioButton("lblAssignRadio", "lblCreditRadio");
            this.creditedAccount = "assignmentOfProceeds";
        },
        ontoggleRadioButton: function (selectedWidget, unselectedWidget) {
            if (this.view[selectedWidget].text === "M") {
                this.view[selectedWidget].text = "L";
                this.view[selectedWidget].skin = "sknC0C0C020pxolbfonticons"
                this.view[unselectedWidget].text = "M";
                this.view[unselectedWidget].skin = "sknLblFontTypeIcon3343e820pxMOD";
            } else {
                this.view[unselectedWidget].text = "L";
                this.view[unselectedWidget].skin = "sknC0C0C020pxolbfonticons"
                this.view[selectedWidget].text = "M";
                this.view[selectedWidget].skin = "sknLblFontTypeIcon3343e820pxMOD";
            }
            this.view.flxCreditAssigneeSelection.setVisibility(true);
            this.enableOrDisableContinueButton();
        },
        toggleAmountInfoPopup: function (visibility) {
            this.view.flxAssignInfoUploadMsg.setVisibility(visibility);
        },
        toggleUploadDocumentInfoPopup: function (visibility) {
            this.view.flxInfoUploadMsg.setVisibility(visibility);
        },
        toggleCreditAccountDropdown: function () {
            if (this.view.flxSegCreditAccount.isVisible) {
                this.view.flxSegCreditAccount.setVisibility(false);
                this.view.imgCreditAccountDropDown.src = "dropdown_expand.png";
            } else {
                this.view.flxSegCreditAccount.setVisibility(true);
                this.view.imgCreditAccountDropDown.src = "dropdown_collapse.png";
            }
        },
        toggleDebitAccountDropdown: function () {
            if (this.view.flxSegDebitedFromDropdown.isVisible) {
                this.view.flxSegDebitedFromDropdown.setVisibility(false);
                this.view.imgBankAccountDropDown.src = "dropdown_expand.png";
            } else {
                this.view.flxSegDebitedFromDropdown.setVisibility(true);
                this.view.imgBankAccountDropDown.src = "dropdown_collapse.png";
            }
        },
        formatAmount: function (amount) {
            this.view.tbxAmount.skin = "sknTxtSSP15pxBorder727272Op201px";
            if (amount === undefined || amount === null || amount <= 0) {
                this.view.tbxAmount.skin = "ICSknTextBoxEE0005";
                this.enableOrDisableContinueButton();
                return;
            }
            return applicationManager.getFormatUtilManager().formatAmount(amount);
        },
        deFormatAmount: function (amount) {
            if (amount === undefined || amount === null) {
                return;
            }
            return applicationManager.getFormatUtilManager().deFormatAmount(amount);
        },
        tryAgainBrowse: function () {
            this.togglePopup(false, "flxUploadDocumentPopup");
            this.browseSupportingDocument();
        },
        browseSupportingDocument: function () {
            var scope = this;
            var config = {
                selectMultipleFiles: false,
                filter: ["application/pdf", "image/jpeg", "image/png", "image/bmp", "application/x-zip-compressed", "application/msword", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", ".csv"]
            };
            if (documentsList.length >= this.presenter.exportLCConfig.documentsLimit) {
                scope.togglePopup(true, "flxUploadDocumentPopup");
                scope.view.UploadDocumentPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AttachmentLimitExceededErrorMsg");
                scope.view.forceLayout();
                return;
            }
            kony.io.FileSystem.browse(config, scope.selectedFileCallback);
        },
        getBase64: function (file, successCallback) {
            var reader = new FileReader();
            reader.onloadend = function () {
                successCallback(reader.result);
            };
            reader.readAsDataURL(file);
        },
        selectedFileCallback: function (events, files) {
            var scope = this;
            const extensions = this.presenter.exportLCConfig.fileExtensions;
            if (files.length > 0) {
                const extension = files[0].file.name.split('.').pop();
                if (extension && !extensions.hasOwnProperty(extension)) {
                    scope.togglePopup(true, "flxUploadDocumentPopup");
                    scope.view.UploadDocumentPopup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${files[0].name} ${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedFileExtensionsMessage")} ${Object.keys(extensions).map(e => `.${e}`).join(', ')}.`;
                    scope.view.forceLayout();
                    return;
                }
                if (files[0].file.size >= scope.presenter.exportLCConfig.documentMaxSize) {
                    scope.togglePopup(true, "flxUploadDocumentPopup");
                    scope.view.UploadDocumentPopup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${files[0].name} ${kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentSizeErrorMsg")} ${scope.presenter.exportLCConfig.documentMaxSize / 10e5} MB.`;
                    scope.view.forceLayout();
                    return;
                } else {
                    var fileData = {};
                    scope.togglePopup(false, "flxUploadDocumentPopup");
                    document = [files[0].name, extensions[extension]];
                    fileData.fileName = files[0].name;
                    fileData.fileType = files[0].file.type;
                    scope.getBase64(files[0].file, function (base64String) {
                        fileData.fileContents = base64String.split(';base64,')[1];
                        let fileDataItemParsed = [fileData.fileName, fileData.fileType, fileData.fileContents].join('~');
                        scope.presenter.uploadExportLCDocuments(fileDataItemParsed, scope.view.id);
                    });
                }
            }
            scope.view.forceLayout();
        },
        setAttachmentsDataToSegment: function () {
            var scope = this;
            scope.enableOrDisableContinueButton();
            if (documentsList.length === 0) {
                scope.view.segUploadDocs.removeAll();
                scope.view.flxUploadDocSeg.setVisibility(true);
                return;
            }
            scope.view.flxUploadDocSeg.setVisibility(true);
            var attachmentsData = [];
            for (const document of documentsList) {
                attachmentsData.push({
                    "imgPDF": {
                        "src": document[1] || 'aa_password_error.png'
                    },
                    "fileName": {
                        text: document[0],
                        toolTip: document[0]
                    },
                    "lblDelete": {
                        "text": "S"
                    },
                    "removeAction": {
                        "onClick": scope.deleteAttachment.bind(scope)
                    },
                    "template": "flxExportLCDrawingsUploadDocument"
                });
            }
            scope.view.segUploadDocs.widgetDataMap = {
                "imgPDF": "imgPDF",
                "lblDocumentName": "fileName",
                "lblDelete": "lblDelete",
                "flxDelete": "removeAction"
            };
            scope.view.segUploadDocs.setData(attachmentsData);
            scope.view.forceLayout();
        },
        deleteAttachment: function () {
            var scope = this;
            deletedIndex = scope.view.segUploadDocs.selectedRowIndex[1];
            scope.presenter.deleteDocument(docReferenceValues[deletedIndex], this.view.id);
            scope.togglePopup(false, "flxUploadDocumentPopup");
        },
        deleteUploadedDocument: function () {
            documentsList.splice(deletedIndex, 1);
            docReferenceValues.splice(deletedIndex, 1);
            this.setAttachmentsDataToSegment();
        },
    };
});