define(['FormControllerUtility'], function (FormControllerUtility) {
    let navData;
    let presenter;
    let formTemplateScope;
    let widgetScope;
    let instructionBillsMasterData = [];
    let documentsList = [];
    let docReferenceValues = [];
    let uploadDocPopupParam;
    let deletedIndex;
    let document = '';
    let physicalDocumentsCount = 1;
    let createCollectionData;
    let instructionBillsSelection = [];
    let isSaveAndContinue = false;
    let isSaveAsDraftAndClose = false;
    let isOnlySave = false;
    let tempPhysicalDocumentsData = {};
    let selectHere = kony.i18n.getLocalizedString("i18n.common.selecthere");
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let incoTermsSelectedKey = '';
    return {
        /**
        * @api : onNavigate
        * Will execute when navigation came from another form
        * @arg : param - Obj - Data used to load in UI
        * @return : NA
        */
        onNavigate: function (data) {
            var scope = this;
            try {
                navData = data;
                this.view.preShow = this.preShow;
                this.view.postShow = this.postShow;
                this.view.init = this.init;
                presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'OutwardCollectionsUIModule' });
                createCollectionData = presenter.createCollectionData;
            } catch (err) {
                var errorObj = {
                    "method": "onNavigate",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        init: function () {
            var scope = this;
            try {
                formTemplateScope = scope.view.formTemplate12;
                widgetScope = formTemplateScope.flxContentTCCenter;
                popupScope = formTemplateScope.flxContentPopup;
                scope.view.onBreakpointChange = scope.onBreakPointChange;
            } catch (err) {
                var errorObj = {
                    "method": "init",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : onBreakPointChange
         * Based on break point design will change
         * @return : NA
        */
        onBreakPointChange: function () {
            var scope = this;
            try {
                var currentBreakpoint = kony.application.getCurrentBreakpoint();
                if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
                    // Tablet screen
                    widgetScope.flxLeft.width = '100%';
                    widgetScope.flxRight.skin = 'slfBoxffffffB1R5';
                } else if (currentBreakpoint > 1024 || currentBreakpoint <= 1380) {
                    // Browser screen
                    widgetScope.flxLeft.width = '70%';
                    widgetScope.flxRight.skin = 'slFbox';
                }
            } catch (err) {
                var errorObj = {
                    "method": "onBreakPointChange",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        preShow: function () {
            var scope = this;
            try {
                FormControllerUtility.disableButton(widgetScope.btnSaveAndContinue);
                scope.renderRoadmap();
                scope.view.formTemplate12.flxContentTCCenter.txtDeliveryInstructions.width = '350px';
                scope.view.formTemplate12.flxContentTCCenter.txtOtherCollectionDetails.width = '350px';
                scope.view.formTemplate12.flxContentTCCenter.txtMessageToBank.width = '350px';
                fontIcons = presenter.resourcesConstants.fontIcons;
            } catch (err) {
                var errorObj = {
                    "method": "preShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        postShow: function () {
            var scope = this;
            try {
                docReferenceValues = [];
                scope.initFormActions();
                this.setPhysicalDocumentsDropdownData(widgetScope.segPhysicalDocumentTitles, presenter.collectionsConfig.physicalDocumentTitles);
                this.setPhysicalDocumentsDropdownData(widgetScope.segOriginalsCount, presenter.collectionsConfig.physicalDocumentCounts);
                this.setPhysicalDocumentsDropdownData(widgetScope.segCopiesCount, presenter.collectionsConfig.physicalDocumentCounts);
                scope.setPhysicalDocumentsData();
                scope.renderIncotermsDropdown();
                scope.renderInstructionBills();
                scope.clearFields(false);
                scope.continueEditing();
                scope.renderPageTitle();
            } catch (err) {
                var errorObj = {
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },


        initFormActions: function () {
            var scope = this;
            try {
                let clearPopupParam = {
                    heading: presenter.renderI18nKeys('i18n.TransfersEur.clear', false),
                    message: presenter.renderI18nKeys('i18n.TradeFinance.confirmationClearFilledDetails', false),
                    yesClick: scope.clearFields.bind(scope, true),
                    yesText: presenter.renderI18nKeys('i18n.common.yes', false),
                    noText: presenter.renderI18nKeys('kony.mb.common.AlertNo', false)
                };
                let savePopupParam = {
                    heading: presenter.renderI18nKeys('i18n.TradeFinance.SaveDraft', false),
                    message: presenter.renderI18nKeys('i18n.TradeFinance.saveAsDraftPopup', false),
                    yesClick: scope.onlySave.bind(scope),
                    yesText: presenter.renderI18nKeys('i18n.common.yes', false),
                    noText: presenter.renderI18nKeys('kony.mb.common.AlertNo', false)
                };
                presenter.cursorTypePointer([
                    widgetScope.flxIncoTermsValue,
                    widgetScope.flxBannerMessageClose,
                    widgetScope.flxUploadInfoIcon,
                    widgetScope.flxInfoClose,
                ]);
                widgetScope.flxBannerMessageClose.onClick = () => {
                    widgetScope.flxBannerMessage.setVisibility(false);
                };
                widgetScope.lblClear.onTouchEnd = formTemplateScope.setPopup.bind(scope, clearPopupParam);
                widgetScope.lblSave.onTouchEnd = formTemplateScope.setPopup.bind(scope, savePopupParam);
                widgetScope.segPhysicalDocumentTitles.onRowClick = scope.segPhysicalDocumentDropdownRowClick.bind(scope, widgetScope.segPhysicalDocumentTitles, 'lblSelectEnter', 1);
                widgetScope.segOriginalsCount.onRowClick = scope.segPhysicalDocumentDropdownRowClick.bind(scope, widgetScope.segOriginalsCount, 'lblOriginalsCount', 2);
                widgetScope.segCopiesCount.onRowClick = scope.segPhysicalDocumentDropdownRowClick.bind(scope, widgetScope.segCopiesCount, 'lblCopiesCount', 3);
                widgetScope.btnAddTitleFromList.onClick = scope.addNewPhysicalDocument.bind(scope, true);
                widgetScope.btnAddTitleManually.onClick = scope.addNewPhysicalDocument.bind(scope, false);
                widgetScope.flxIncoTermsValue.onClick = () => {
                    widgetScope.flxIncoTermsDropdown.isVisible == false ? widgetScope.flxIncoTermsDropdown.setVisibility(true) : widgetScope.flxIncoTermsDropdown.setVisibility(false);
                }
                widgetScope.btnUploadNewFile.onClick = scope.browseSupportingDocument.bind(scope);
                widgetScope.btnClose.onClick = scope.onCloseClick.bind(scope);
                widgetScope.btnBack.onClick = scope.navigateToAnotherForm.bind(scope, true);
                widgetScope.btnSaveAndContinue.onClick = () => {
                    isSaveAndContinue = true;
                    scope.saveDraft(false);
                };
                widgetScope.ProgressTracker.lblApplicationStep.text = presenter.renderI18nKeys('i18n.TradeFinance.createNewRequest', false);
                widgetScope.flxCollectionOverview.setVisibility(false);
                widgetScope.lblClear.setVisibility(true);
                widgetScope.lblSave.setVisibility(true);
                widgetScope.flxBannerMessage.setVisibility(false);
                widgetScope.flxUploadInfoIcon.onClick = scope.toggleUploadDocumentInfoPopup;
                widgetScope.flxInfoClose.onClick = scope.toggleUploadDocumentInfoPopup;
            } catch (err) {
                var errorObj = {
                    "method": "initFormActions",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        browseSupportingDocument: function () {
            var scope = this;
            try {
                uploadDocPopupParam = {
                    heading: presenter.renderI18nKeys('i18n.TradeFinance.UploadDocument', false),
                    message: presenter.renderI18nKeys('i18n.TradeFinance.allowedDocumentsLimitMessage', false) + ' ' + presenter.collectionsConfig.documentsLimit,
                    yesClick: scope.browseSupportingDocument.bind(scope),
                    yesText: presenter.renderI18nKeys('kony.mb.common.TryAgain', false),
                    noText: presenter.renderI18nKeys('kony.mb.common.close', false)
                };
                var config = {
                    selectMultipleFiles: false,
                    filter: ["application/pdf", "image/jpeg", "image/png", "image/bmp", "application/x-zip-compressed", "application/msword", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", ".csv"]
                };
                if (documentsList.length >= presenter.collectionsConfig.documentsLimit) {
                    formTemplateScope.setPopup(uploadDocPopupParam);
                    return;
                }
                kony.io.FileSystem.browse(config, scope.selectedFileCallback);
            } catch (err) {
                var errorObj = {
                    "method": "browseSupportingDocument",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        selectedFileCallback: function (events, files) {
            var scope = this;
            const extensions = presenter.collectionsConfig.fileExtensions;
            if (files.length > 0) {
                const extension = files[0].file.name.split('.').pop();
                if (extension && !extensions.hasOwnProperty(extension)) {
                    uploadDocPopupParam.message = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg3");
                    formTemplateScope.setPopup(uploadDocPopupParam);
                    return;
                }
                if (files[0].file.size >= presenter.collectionsConfig.documentMaxSize) {
                    uploadDocPopupParam.message = `${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${files[0].name} ${kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentSizeErrorMsg")} ${presenter.collectionsConfig.documentMaxSizeInMB}`;
                    formTemplateScope.setPopup(uploadDocPopupParam);
                    return;
                } else {
                    var fileData = {};
                    document = [files[0].name, extensions[extension]];
                    fileData.fileName = files[0].name;
                    fileData.fileType = files[0].file.type;
                    scope.getBase64(files[0].file, function (base64String) {
                        fileData.fileContents = base64String.split(';base64,')[1];
                        let fileDataItemParsed = [fileData.fileName, fileData.fileType, fileData.fileContents].join('~');
                        presenter.uploadDocument(fileDataItemParsed, scope.view.id);
                    });
                }
            }
        },

        renderInstructionBills: function () {
            var scope = this;
            try {
                instructionBillsMasterData = [];
                let otherInstructionBills = createCollectionData.instructionsForBills ? JSON.parse(createCollectionData.instructionsForBills.replace(/'/g, '"')) : [];
                widgetScope.segInstructions.widgetDataMap = {
                    lblIcon: "lblIcon",
                    lblFilterValue: "lblFilterValue"
                };
                for (const key in presenter.collectionInstructionBills) {
                    instructionBillsMasterData.push({
                        lblIcon: {
                            text: otherInstructionBills.includes(presenter.collectionInstructionBills[key]) ? fontIcons.checkboxSelected : fontIcons.checkboxUnselected,
                            cursorType: "pointer",
                            onTouchEnd: scope.onSegmentRowClick.bind(scope, key),
                            left:'0dp',
                            top:'10dp'
                        },
                        lblFilterValue: {
                            text: presenter.collectionInstructionBills[key],
                            cursorType: "pointer",
                            onTouchEnd: scope.onSegmentRowClick.bind(scope, key),
                            left:'10dp',
                        },
                        selected: otherInstructionBills.includes(presenter.collectionInstructionBills[key]),
                        selectedValue: key
                    });
                }
                widgetScope.segInstructions.removeAll();
                widgetScope.segInstructions.setData(instructionBillsMasterData);
            } catch (err) {
                var errorObj = {
                    "method": "renderInstructionBills",
                    "error": err
                };
                scope.onError(errorObj);
            }

        },

        onSegmentRowClick: function (selectedInstructionBill) {
            var scope = this;
            try {
                let tempArray = [...instructionBillsMasterData];
                instructionBillsMasterData.map((item, index) => {
                    if (item.selectedValue == selectedInstructionBill) {
                        tempArray[index].lblIcon.text == fontIcons.checkboxUnselected ? tempArray[index].lblIcon.text = fontIcons.checkboxSelected : tempArray[index].lblIcon.text = fontIcons.checkboxUnselected;
                        if (tempArray[index].selected) {
                            tempArray[index].selected = false;
                            instructionBillsSelection = instructionBillsSelection.filter(val => val !== item.selectedValue)
                        } else {
                            tempArray[index].selected = true;
                            instructionBillsSelection.push(item.selectedValue);
                        }
                    }
                });
                instructionBillsMasterData = tempArray;
                widgetScope.segInstructions.setData(instructionBillsMasterData);
            } catch (err) {
                var errorObj = {
                    "method": "onSegmentRowClick",
                    "error": err
                };
                scope.onError(errorObj);
            }

        },

        /**
         * Entry point method for the form controller
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.uploadDocument) {
                this.storeDocumentReference(viewModel.uploadDocument[0].documentReference);
            }
            if (viewModel.deleteDocument) {
                this.removeDocumentReference();
            }
            if (viewModel.serverError) {
                widgetScope.imgBannerMessage.src = presenter.resourcesConstants.images.failedBannerImage;
                widgetScope.lblBannerMessage.text = viewModel.serverError;
                widgetScope.flxBannerMessage.setVisibility(true);
            }
            if (viewModel.savedOutwardCollection) {
                if (isSaveAndContinue) {
                    isSaveAndContinue = false;
                    this.navigateToAnotherForm(false);
                } else if (isSaveAsDraftAndClose) {
                    isSaveAsDraftAndClose = false;
                    presenter.showOutwardCollectionScreen({
                        context: 'outwardCollectionAmendmentDashboard',
                        data: { flowType: presenter.outwardConstants.saveCollectionAsDraft }
                    });
                } else {
                    widgetScope.imgBannerMessage.src = presenter.resourcesConstants.images.successBannerImage;
                    widgetScope.lblBannerMessage.text = presenter.renderI18nKeys('i18n.TradeFinance.submittedSuccessfully', false);
                    widgetScope.flxBannerMessage.setVisibility(true);
                }
            }
            if (viewModel.deletedOutwardCollection) {
                presenter.showOutwardCollectionScreen({
                    context: 'outwardCollectionAmendmentDashboard',
                    data: { flowType: presenter.outwardConstants.deletedCollection }
                });
            }
        },

        storeDocumentReference: function (key) {
            documentsList.push(document);
            docReferenceValues.push(key);
            this.setDocumentsDataToSegment();
        },

        setDocumentsDataToSegment: function () {
            const scope = this;
            scope.enableOrDisableSubmitButton();
            if (documentsList.length === 0) {
                widgetScope.segDocuments.removeAll();
                widgetScope.flxSegDocuments.setVisibility(false);
                return;
            }
            widgetScope.flxSegDocuments.setVisibility(true);
            let segData = [];
            for (const document of documentsList) {
                segData.push({
                    "imgPDF": {
                        src: document[1] || 'aa_password_error.png'
                    },
                    "lblDocumentName": {
                        text: document[0],
                        toolTip: document[0]
                    },
                    "lblDelete": {
                        text: "S"
                    },
                    "flxDelete": {
                        onClick: scope.deleteDocumentPopup.bind(scope),
                        cursorType: "pointer"
                    },
                    "template": "flxExportLCDrawingsUploadDocument"
                });
            }
            widgetScope.segDocuments.widgetDataMap = {
                "imgPDF": "imgPDF",
                "lblDocumentName": "lblDocumentName",
                "lblDelete": "lblDelete",
                "flxDelete": "flxDelete"
            };
            widgetScope.segDocuments.setData(segData);

        },

        getBase64: function (file, successCallback) {
            let reader = new FileReader();
            reader.onloadend = function () {
                successCallback(reader.result);
            };
            reader.readAsDataURL(file);
        },

        deleteDocumentPopup: function () {
            var scope = this;
            try {
                deletedIndex = widgetScope.segDocuments.selectedRowIndex[1];
                let deleteDocPopupParam = {
                    heading: presenter.renderI18nKeys('kony.mb.common.Delete', false),
                    message: presenter.renderI18nKeys('i18n.TradeFinance.deleteDocumentMessage', false) + ' ' + documentsList[deletedIndex][0],
                    yesClick: scope.deleteDocument,
                    yesText: presenter.renderI18nKeys('kony.mb.common.AlertYes', false),
                    noText: presenter.renderI18nKeys('kony.mb.common.No', false)
                };
                formTemplateScope.setPopup(deleteDocPopupParam);
            } catch (err) {
                var errorObj = {
                    "method": "deleteDocumentPopup",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        deleteDocument: function () {
            const scope = this;
            presenter.deleteDocument(docReferenceValues[deletedIndex], this.view.id);
        },

        removeDocumentReference: function () {
            documentsList.splice(deletedIndex, 1);
            docReferenceValues.splice(deletedIndex, 1);
            this.setDocumentsDataToSegment();
        },

        renderIncotermsDropdown: function () {
            var scope = this;
            try {
                widgetScope.segIncoTermsDropdown.widgetDataMap = { lblListValue: 'lblListValue', flxListDropdown: 'flxListDropdown' };
                let masterData = [];
                for (const key in presenter.incoTerms) {
                    masterData.push({
                        flxListDropdown: {
                            onClick: scope.incoTermsOnRowClick.bind(scope, key, key + ' - ' + presenter.incoTerms[key]),
                            cursorType: 'pointer'
                        },
                        lblListValue: key + ' - ' + presenter.incoTerms[key]
                    });
                }
                widgetScope.segIncoTermsDropdown.setData(masterData);
            } catch (err) {
                var errorObj = {
                    "method": "renderIncotermsDropdown",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        incoTermsOnRowClick: function (key, value) {
            var scope = this;
            try {
                widgetScope.flxIncoTermsDropdown.setVisibility(false);
                widgetScope.lblIncoTermsValue.text = value;
                incoTermsSelectedKey = key;
                widgetScope.lblIncoTermsValue.skin = 'sknLblSSP15pxtrucation';
                scope.enableOrDisableSubmitButton();
            } catch (err) {
                var errorObj = {
                    "method": "incoTermsOnRowClick",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        renderRoadmap: function () {
            var scope = this;
            try {
                let roadmapData = [];
                for (const key in presenter.collectionsRoadmap) {
                    roadmapData.push({
                        'currentRow': key === 'documentsAndBankInstructions',
                        'rowLabel': presenter.collectionsRoadmap[key].name,
                        'rowStatus': presenter.collectionsRoadmap[key].lifeCycle
                    });
                }
                roadmapData['showCopyDetails'] = false;
                widgetScope.ProgressTracker.setData(roadmapData);
            } catch (err) {
                var errorObj = {
                    "method": "renderRoadmap",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        setPhysicalDocumentsDropdownData: function (segWidget, data) {
            segWidget.widgetDataMap = {
                'flxListDropdown': 'flxListDropdown',
                'lblListValue': 'lblListValue'
            };
            let segData = [];
            for (const record of data) {
                segData.push({
                    flxListDropdown: {
                        skin: "slFbox"
                    },
                    lblListValue: {
                        text: record
                    },
                    template: 'flxListDropdown'
                });
            }
            segWidget.setData(segData);
        },

        setPhysicalDocumentsData: function () {
            var scope = this;
            try {
                const scope = this;
                widgetScope.segPhysicalDocuments.widgetDataMap = {
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
                let physicalDocumentsData = [];
                const currentBreakpoint = kony.application.getCurrentBreakpoint();
                if (presenter.createCollectionData.physicalDocuments) {
                    const physicalDocuments = JSON.parse(presenter.createCollectionData.physicalDocuments.replace(/'/g, '"'));
                    physicalDocumentsCount = physicalDocuments.length;
                    for (const physicalDocument of physicalDocuments) {
                        const docTitleIndex = presenter.collectionsConfig.physicalDocumentTitles.indexOf(physicalDocument.documentTitle);
                        physicalDocumentsData.push({
                            "flxSelectDocTitle": {
                                "isVisible": docTitleIndex !== -1,
                                "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxPhysicalDocumentTitlesList", 1),
                                "width": currentBreakpoint > 640 && currentBreakpoint <= 1024 ? "30%" : "270dp",
                                "cursorType": "pointer"
                            },
                            "flxTextField": {
                                "isVisible": docTitleIndex === -1,
                                "width": currentBreakpoint > 640 && currentBreakpoint <= 1024 ? "30%" : "36%"
                            },
                            "lblSelectEnter": {
                                "text": physicalDocument.documentTitle,
                                "skin": 'sknLblSSP15pxtrucation'
                            },
                            "lblOriginalsCount": {
                                "text": `${physicalDocument.originalsCount} ${physicalDocument.originalsCount === 'Will not submit' ? '' : 'Originals'}`,
                                "skin": 'sknLblSSP15pxtrucation',
                                "top": "10dp"
                            },
                            "lblCopiesCount": {
                                "text": `${physicalDocument.copiesCount} ${physicalDocument.copiesCount === 'Will not submit' ? '' : 'Copies'}`,
                                "skin": 'sknLblSSP15pxtrucation',
                                "top": "10dp"
                            },
                            "lblDropDown1": {
                                "text": presenter.resourcesConstants.fontIcons.chevronDown
                            },
                            "lblDropDown2": {
                                "text": presenter.resourcesConstants.fontIcons.chevronDown
                            },
                            "lblDropDown3": {
                                "text": presenter.resourcesConstants.fontIcons.chevronDown
                            },
                            "flxOriginalCount": {
                                "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxOriginalsCountList", 2),
                                "width": currentBreakpoint > 640 && currentBreakpoint <= 1024 ? "23%" : "160dp",
                                "cursorType": "pointer"
                            },
                            "flxCopiesCount": {
                                "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxCopiesCountList", 3),
                                "width": currentBreakpoint > 640 && currentBreakpoint <= 1024 ? "23%" : "160dp",
                                "cursorType": "pointer"
                            },
                            "tbxEnterTitle": {
                                "text": physicalDocument.documentTitle,
                                "onEndEditing": scope.enableOrDisableSubmitButton
                            },
                            "flxDelete": {
                                "isVisible": true,
                                "onClick": scope.deletePhysicalDocument,
                                "cursorType": "pointer"
                            },
                            "template": "flxSelectDocumentTitle"
                        });
                    }
                } else {
                    physicalDocumentsCount = 1;
                    physicalDocumentsData.push({
                        "flxSelectDocTitle": {
                            "isVisible": true,
                            "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxPhysicalDocumentTitlesList", 1),
                            "width": currentBreakpoint > 640 && currentBreakpoint <= 1024 ? "30%" : "270dp",
                            "cursorType": "pointer"
                        },
                        "flxTextField": {
                            "isVisible": false,
                            "width": currentBreakpoint > 640 && currentBreakpoint <= 1024 ? "30%" : "27%"
                        },
                        "lblSelectEnter": {
                            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.SelectDocumentTitle")
                        },
                        "lblOriginalsCount": {
                            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.OriginalsCount")
                        },
                        "lblCopiesCount": {
                            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.CopiesCount")
                        },
                        "lblDropDown1": {
                            "text": presenter.resourcesConstants.fontIcons.chevronDown
                        },
                        "lblDropDown2": {
                            "text": presenter.resourcesConstants.fontIcons.chevronDown
                        },
                        "lblDropDown3": {
                            "text": presenter.resourcesConstants.fontIcons.chevronDown
                        },
                        "flxOriginalCount": {
                            "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxOriginalsCountList", 2),
                            "width": currentBreakpoint > 640 && currentBreakpoint <= 1024 ? "23%" : "160dp",
                            "cursorType": "pointer"
                        },
                        "flxCopiesCount": {
                            "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxCopiesCountList", 3),
                            "width": currentBreakpoint > 640 && currentBreakpoint <= 1024 ? "23%" : "160dp",
                            "cursorType": "pointer"
                        },
                        "tbxEnterTitle": {
                            "text": '',
                            "onEndEditing": scope.enableOrDisableSubmitButton
                        },
                        "flxDelete": {
                            "isVisible": true,
                            "onClick": scope.deletePhysicalDocument,
                            "cursorType": "pointer"
                        },
                        "template": "flxSelectDocumentTitle"
                    });
                }
                if (physicalDocumentsCount === presenter.collectionsConfig.physicalDocumentsLimit) {
                    widgetScope.btnAddTitleFromList.skin = "ICSknbtnDisablede2e9f036px";
                    widgetScope.btnAddTitleFromList.setEnabled(false);
                    widgetScope.btnAddTitleManually.skin = "ICSknbtnDisablede2e9f036px";
                    widgetScope.btnAddTitleManually.setEnabled(false);
                }
                widgetScope.segPhysicalDocuments.setData(physicalDocumentsData);
            } catch (err) {
                var errorObj = {
                    "method": "setPhysicalDocumentsData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        deletePhysicalDocument: function () {
            var scope = this;
            try {
                const [sectionIndex, rowIndex] = widgetScope.segPhysicalDocuments.selectedRowIndex;
                physicalDocumentsCount--;
                let segmentData = widgetScope.segPhysicalDocuments.data[rowIndex];
                if (segmentData.flxSelectDocTitle.isVisible === true && segmentData.lblSelectEnter.text !== kony.i18n.getLocalizedString("i18n.TradeFinance.SelectDocumentTitle")) {
                    let index = presenter.collectionsConfig.physicalDocumentTitles.indexOf(segmentData.lblSelectEnter.text);
                    widgetScope.segPhysicalDocumentTitles.data[index].flxListDropdown.skin = "slFbox";
                    widgetScope.segPhysicalDocumentTitles.setDataAt(widgetScope.segPhysicalDocumentTitles.data[index], index);
                }
                widgetScope.segPhysicalDocuments.removeAt(rowIndex, sectionIndex);
                if (physicalDocumentsCount < presenter.collectionsConfig.physicalDocumentsLimit) {
                    widgetScope.btnAddTitleFromList.skin = "ICSknsknBtnffffffBorder0273e31pxRadius2px";
                    widgetScope.btnAddTitleFromList.setEnabled(true);
                    widgetScope.btnAddTitleManually.skin = "ICSknsknBtnffffffBorder0273e31pxRadius2px";
                    widgetScope.btnAddTitleManually.setEnabled(true);
                }
                if (physicalDocumentsCount === 0) {
                    widgetScope.lblPhysicalDocumentError.setVisibility(true);
                }
                this.enableOrDisableSubmitButton();
            } catch (err) {
                var errorObj = {
                    "method": "deletePhysicalDocument",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        togglePhysicalDocumentDropdown: function (flxWidget, count) {
            var scope = this;
            try {
                physicalDocumentIndex = widgetScope.segPhysicalDocuments.selectedRowIndex[1];
                let data = widgetScope.segPhysicalDocuments.data[physicalDocumentIndex];
                if (widgetScope[flxWidget].isVisible) {
                    widgetScope[flxWidget].setVisibility(false);
                    data['lblDropDown' + count].text = presenter.resourcesConstants.fontIcons.chevronDown;
                } else {
                    widgetScope.flxPhysicalDocumentTitlesList.setVisibility(false);
                    widgetScope.flxOriginalsCountList.setVisibility(false);
                    widgetScope.flxCopiesCountList.setVisibility(false);
                    widgetScope[flxWidget].top = `${80 + (60 * physicalDocumentIndex)}dp`;
                    data['lblDropDown1'].text = presenter.resourcesConstants.fontIcons.chevronDown;
                    data['lblDropDown2'].text = presenter.resourcesConstants.fontIcons.chevronDown;
                    data['lblDropDown3'].text = presenter.resourcesConstants.fontIcons.chevronDown;
                    widgetScope[flxWidget].setVisibility(true);
                    data['lblDropDown' + count].text = presenter.resourcesConstants.fontIcons.chevronUp;
                    if (flxWidget === 'flxPhysicalDocumentTitlesList') {
                        const selectedTitles = widgetScope.segPhysicalDocuments.data.map(title => title.lblSelectEnter.text);
                        let segPhysicalDocumentTitlesData = widgetScope.segPhysicalDocumentTitles.data;
                        segPhysicalDocumentTitlesData.forEach(title => title.flxListDropdown.skin = selectedTitles.includes(title.lblListValue.text) ? 'slFboxBGf8f7f8B0' : 'slFbox');
                        widgetScope.segPhysicalDocumentTitles.setData(segPhysicalDocumentTitlesData);
                    }
                }
                widgetScope.segPhysicalDocuments.setDataAt(data, physicalDocumentIndex);
            } catch (err) {
                var errorObj = {
                    "method": "togglePhysicalDocumentDropdown",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        segPhysicalDocumentDropdownRowClick: function (segWidget, lblKey, count) {
            var scope = this;
            try {
                const selectedData = segWidget.selectedRowItems[0];
                const rowIndex = segWidget.selectedRowIndex[1];
                let data = widgetScope.segPhysicalDocuments.data[physicalDocumentIndex];
                if (count === 1) {
                    if (segWidget.data[rowIndex].flxListDropdown.skin === "slFboxBGf8f7f8B0") return;
                    if (data[lblKey].text !== kony.i18n.getLocalizedString("i18n.TradeFinance.SelectDocumentTitle")) {
                        let index = presenter.collectionsConfig.physicalDocumentTitles.indexOf(data[lblKey].text);
                        segWidget.data[index].flxListDropdown.skin = "slFboxBGf8f7f8B0";
                        segWidget.setDataAt(segWidget.data[index], index);
                    }
                }
                data[lblKey].text = selectedData.lblListValue.text;
                if (count !== 1 && data[lblKey].text !== "Will not submit") {
                    data[lblKey].text = `${selectedData.lblListValue.text} ${count === 2 ? 'Originals' : 'Copies'}`;
                }
                if (data["lblDropDown1"].text === presenter.resourcesConstants.fontIcons.chevronUp) data["lblSelectEnter"].skin = "ICSknLbl42424215PX";
                if (data["lblDropDown2"].text === presenter.resourcesConstants.fontIcons.chevronUp) data["lblOriginalsCount"].skin = "ICSknLbl42424215PX";
                if (data["lblDropDown3"].text === presenter.resourcesConstants.fontIcons.chevronUp) data["lblCopiesCount"].skin = "ICSknLbl42424215PX";
                data["lblDropDown" + count].text = presenter.resourcesConstants.fontIcons.chevronDown;
                widgetScope.segPhysicalDocuments.setDataAt(data, physicalDocumentIndex);
                widgetScope.flxPhysicalDocumentTitlesList.setVisibility(false);
                widgetScope.flxOriginalsCountList.setVisibility(false);
                widgetScope.flxCopiesCountList.setVisibility(false);
                if (count === 1) {
                    segWidget.data[rowIndex].flxListDropdown.skin = "slFboxBGf8f7f8B0";
                    segWidget.setDataAt(segWidget.data[rowIndex], rowIndex);
                }
                this.enableOrDisableSubmitButton();
            } catch (err) {
                var errorObj = {
                    "method": "segPhysicalDocumentDropdownRowClick",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        addNewPhysicalDocument: function (visibility) {
            var scope = this;
            try {
                var scope = this;
                widgetScope.lblPhysicalDocumentError.setVisibility(false);
                physicalDocumentsCount++;
                const currentBreakpoint = kony.application.getCurrentBreakpoint();
                const data = {
                    "flxSelectDocTitle": {
                        "isVisible": visibility,
                        "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxPhysicalDocumentTitlesList", 1),
                        "width": currentBreakpoint > 640 && currentBreakpoint <= 1024 ? "30%" : "270dp",
                        "cursorType": "pointer"
                    },
                    "flxTextField": {
                        "isVisible": !visibility,
                        "width": currentBreakpoint > 640 && currentBreakpoint <= 1024 ? "30%" : "270dp"
                    },
                    "lblSelectEnter": {
                        "text": kony.i18n.getLocalizedString("i18n.TradeFinance.SelectDocumentTitle")
                    },
                    "lblOriginalsCount": {
                        "text": kony.i18n.getLocalizedString("i18n.TradeFinance.OriginalsCount")
                    },
                    "lblCopiesCount": {
                        "text": kony.i18n.getLocalizedString("i18n.TradeFinance.CopiesCount")
                    },
                    "lblDropDown1": {
                        "text": presenter.resourcesConstants.fontIcons.chevronDown
                    },
                    "lblDropDown2": {
                        "text": presenter.resourcesConstants.fontIcons.chevronDown
                    },
                    "lblDropDown3": {
                        "text": presenter.resourcesConstants.fontIcons.chevronDown
                    },
                    "flxOriginalCount": {
                        "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxOriginalsCountList", 2),
                        "width": currentBreakpoint > 640 && currentBreakpoint <= 1024 ? "23%" : "160dp",
                        "cursorType": "pointer"
                    },
                    "flxCopiesCount": {
                        "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxCopiesCountList", 3),
                        "width": currentBreakpoint > 640 && currentBreakpoint <= 1024 ? "23%" : "160dp",
                        "cursorType": "pointer"
                    },
                    "flxDelete": {
                        "isVisible": true,
                        "onClick": scope.deletePhysicalDocument,
                        "cursorType": "pointer"
                    },
                    "tbxEnterTitle": {
                        "text": "",
                        "onEndEditing": scope.enableOrDisableSubmitButton
                    },
                    "template": "flxSelectDocumentTitle"
                };
                widgetScope.segPhysicalDocuments.addDataAt(data, widgetScope.segPhysicalDocuments.data.length);
                if (physicalDocumentsCount === presenter.collectionsConfig.physicalDocumentsLimit) {
                    widgetScope.btnAddTitleFromList.skin = "ICSknbtnDisablede2e9f036px";
                    widgetScope.btnAddTitleFromList.setEnabled(false);
                    widgetScope.btnAddTitleManually.skin = "ICSknbtnDisablede2e9f036px";
                    widgetScope.btnAddTitleManually.setEnabled(false);
                }
                scope.view.forceLayout();
                scope.enableOrDisableSubmitButton();
            } catch (err) {
                var errorObj = {
                    "method": "addNewPhysicalDocument",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        enableOrDisableSubmitButton: function () {
            var scope = this;
            try {
                scope.selectedPhysicalDocuments();
                if (
                    docReferenceValues.length == 0 ||
                    (!tempPhysicalDocumentsData['physicalDocuments'] || (tempPhysicalDocumentsData['physicalDocuments'] && tempPhysicalDocumentsData.physicalDocuments.length !== physicalDocumentsCount)) ||
                    widgetScope.lblPhysicalDocumentError.isVisible ||
                    widgetScope.lblIncoTermsValue.text == selectHere
                ) {
                    FormControllerUtility.disableButton(widgetScope.btnSaveAndContinue);
                } else {
                    FormControllerUtility.enableButton(widgetScope.btnSaveAndContinue);
                }
            } catch (err) {
                var errorObj = {
                    "method": "enableOrDisableSubmitButton",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        gatherUserInputData: function (backNavigation) {
            var scope = this;
            try {
                let collectionsRoadmap = presenter.collectionsRoadmap;
                collectionsRoadmap.documentsAndBankInstructions.lifeCycle = backNavigation ? (collectionsRoadmap.documentsAndBankInstructions.lifeCycle === 'done' ? 'done' : 'Incomplete') : (isOnlySave ? 'Inprogress' : 'done');
                collectionsRoadmap.reviewAndSubmit.lifeCycle = backNavigation ? (collectionsRoadmap.reviewAndSubmit.lifeCycle === 'done' ? 'done' : 'Incomplete') : (isOnlySave ? 'Incomplete' : 'Inprogress');
                isOnlySave = false;
                if (!backNavigation) {
                    let tempUploadDocuments = [];
                    docReferenceValues.map((item, index) => {
                        tempUploadDocuments.push({
                            documentName: documentsList[index][0],
                            documentReference: item
                        });
                    });
                    tempUploadDocuments.length > 0 && (createCollectionData.uploadDocuments = JSON.stringify(tempUploadDocuments));
                    tempPhysicalDocumentsData.physicalDocuments.length > 0 && (createCollectionData.physicalDocuments = JSON.stringify(tempPhysicalDocumentsData.physicalDocuments));
                    createCollectionData.incoTerms = incoTermsSelectedKey;
                    widgetScope.txtDeliveryInstructions.text !== '' && (createCollectionData.deliveryInstructions = widgetScope.txtDeliveryInstructions.text);
                    widgetScope.txtOtherCollectionDetails.text !== '' && (createCollectionData.otherCollectionDetails = widgetScope.txtOtherCollectionDetails.text);
                    widgetScope.txtMessageToBank.text !== '' && (createCollectionData.messageToBank = widgetScope.txtMessageToBank.text);
                    instructionBillsSelection.length > 0 && (createCollectionData.instructionsForBills = JSON.stringify(instructionBillsSelection));
                }
            } catch (err) {
                var errorObj = {
                    "method": "gatherUserInputData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        selectedPhysicalDocuments: function () {
            var scope = this;
            try {
                tempPhysicalDocumentsData['physicalDocuments'] = [];
                for (const physicalDocument of widgetScope.segPhysicalDocuments.data) {
                    const documentTitle = physicalDocument.flxTextField.isVisible ? physicalDocument.tbxEnterTitle.text : physicalDocument.lblSelectEnter.text;
                    const originalsCount = physicalDocument.lblOriginalsCount.text;
                    const copiesCount = physicalDocument.lblCopiesCount.text;
                    if (documentTitle !== '' && documentTitle !== kony.i18n.getLocalizedString("i18n.TradeFinance.SelectDocumentTitle") && originalsCount !== kony.i18n.getLocalizedString("i18n.TradeFinance.OriginalsCount") && copiesCount !== kony.i18n.getLocalizedString("i18n.TradeFinance.CopiesCount")) {
                        tempPhysicalDocumentsData['physicalDocuments'].push({
                            documentTitle,
                            originalsCount: originalsCount === 'Will not submit' ? originalsCount : originalsCount.split(' ')[0],
                            copiesCount: copiesCount === 'Will not submit' ? copiesCount : copiesCount.split(' ')[0]
                        });
                    }
                }
            } catch (err) {
                var errorObj = {
                    "method": "selectedPhysicalDocuments",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        clearFields: function (isUserRequested) {
            var scope = this;
            try {
                documentsList = [];
                scope.setDocumentsDataToSegment();
                // Physical docs clear logic
                if (isUserRequested) {
                    documentsList = [];
                    docReferenceValues = [];
                    widgetScope.segPhysicalDocuments.removeAll();
                    scope.addNewPhysicalDocument(true);
                    tempPhysicalDocumentsData = {};
                    physicalDocumentsCount = 1;
                }
                widgetScope.lblIncoTermsValue.text = selectHere;
                widgetScope.lblIncoTermsValue.skin = 'ICSknLabelSSPRegular72727215px';
                widgetScope.txtDeliveryInstructions.text = '';
                widgetScope.txtOtherCollectionDetails.text = '';
                widgetScope.txtMessageToBank.text = '';
                if (isUserRequested) createCollectionData.instructionsForBills && delete createCollectionData.instructionsForBills;
                scope.renderInstructionBills();
            } catch (err) {
                var errorObj = {
                    "method": "clearFields",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        saveDraft: function (saveAsDraftAndClose) {
            var scope = this;
            try {
                isSaveAsDraftAndClose = saveAsDraftAndClose;
                if (createCollectionData.status && createCollectionData.status.toLowerCase() == presenter.outwardConstants.returnedByBank) {
                    scope.navigateToAnotherForm(false);
                } else {
                    scope.gatherUserInputData(false);
                    presenter.saveOutwardCollection(presenter.createCollectionData, this.view.id);
                }
            } catch (err) {
                var errorObj = {
                    "method": "saveDraft",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        deletePermanently: function () {
            var scope = this;
            try {
                let params = {
                    collectionReference: createCollectionData.collectionReference
                };
                presenter.deleteCollection(params, this.view.id);
            } catch (err) {
                var errorObj = {
                    "method": "deletePermanently",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        navigateToAnotherForm: function (backNavigation) {
            var scope = this;
            try {
                scope.gatherUserInputData(backNavigation);
                presenter.showOutwardCollectionScreen({
                    context: backNavigation ? 'draweeAndCollectingBank' : 'reviewAndSubmit',
                });
            } catch (err) {
                var errorObj = {
                    "method": "navigateToAnotherForm",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        onlySave: function () {
            var scope = this;
            try {
                isOnlySave = true;
                scope.saveDraft(false);
            } catch (err) {
                var errorObj = {
                    "method": "onlySave",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        continueEditing: function () {
            var scope = this;
            try {
                if (createCollectionData.uploadDocuments) {
                    documentsList = [];
                    let tempUploadDocData = [];
                    docReferenceValues = [];
                    tempUploadDocData = JSON.parse(createCollectionData.uploadDocuments.replace(/'/g, '"'));
                    let extensions = presenter.collectionsConfig.fileExtensions;
                    let docName = tempUploadDocData.map(d => d.documentName);
                    documentsList = docName.map(d => [d, extensions[d.split('.').pop()]]);
                    scope.setDocumentsDataToSegment();
                    tempUploadDocData.map(item => {
                        docReferenceValues.push(item.documentReference);
                    });
                }
                // physicalDocuments
                if (createCollectionData.incoTerms) {
                    incoTermsSelectedKey = createCollectionData.incoTerms;
                    widgetScope.lblIncoTermsValue.text = `${createCollectionData.incoTerms} - ${presenter.incoTerms[createCollectionData.incoTerms]}`;
                    widgetScope.lblIncoTermsValue.skin = 'sknLblSSP15pxtrucation';
                } else {
                    widgetScope.lblIncoTermsValue.text = selectHere;
                    widgetScope.lblIncoTermsValue.skin = 'ICSknLabelSSPRegular72727215px';
                }
                createCollectionData.deliveryInstructions ? (widgetScope.txtDeliveryInstructions.text = createCollectionData.deliveryInstructions) : (widgetScope.txtDeliveryInstructions.text = '');
                createCollectionData.otherCollectionDetails ? (widgetScope.txtOtherCollectionDetails.text = createCollectionData.otherCollectionDetails) : (widgetScope.txtOtherCollectionDetails.text = '');
                createCollectionData.messageToBank ? (widgetScope.txtMessageToBank.text = createCollectionData.messageToBank) : (widgetScope.txtMessageToBank.text = '');
                createCollectionData.instructionsForBills ? (instructionBillsSelection = JSON.parse(createCollectionData.instructionsForBills.replace(/'/g, "\""))) : (instructionBillsSelection = []);
                scope.enableOrDisableSubmitButton();
                if (createCollectionData.status && (createCollectionData.status.toLowerCase() == presenter.outwardConstants.returnedByBank)) {
                    widgetScope.btnClose.text = presenter.renderI18nKeys('i18n.konybb.common.cancel', false);
                    scope.renderCollectionOverView();
                }
            }
            catch (err) {
                var errorObj = {
                    "method": "continueEditing",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        renderCollectionOverView: function () {
            var scope = this;
            try {
                widgetScope.lblTitle.text = presenter.renderI18nKeys('i18n.TradeFinance.reviseTheCollectionsDetails', false);
                widgetScope.lblClear.setVisibility(false);
                widgetScope.lblSave.setVisibility(false);
                widgetScope.segCollectionOverview.widgetDataMap = {
                    lblGuaranteeDetailsRow: 'lblGuaranteeDetailsRow',
                    lblGuaranteeDetailsValue: 'lblGuaranteeDetailsValue'
                };
                let masterData = [
                    {
                        lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.TradeFinance.transactionRefWithColon', false),
                        lblGuaranteeDetailsValue: createCollectionData.collectionReference ? createCollectionData.collectionReference : NA
                    },
                    {
                        lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.TradeFinance.documentNumberWithColon', false),
                        lblGuaranteeDetailsValue: createCollectionData.documentNo ? createCollectionData.documentNo : NA
                    },
                    {
                        lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.serviceRequests.Status:', false),
                        lblGuaranteeDetailsValue: {
                            text: createCollectionData.status ? createCollectionData.status : NA,
                            skin: 'ICSknlbl424242SSP13pxSemibold'
                        }
                    },
                    {
                        lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.TradeFinance.reasonForReturnedWithColon', false),
                        lblGuaranteeDetailsValue: {
                            text: createCollectionData.reasonForReturn ? createCollectionData.reasonForReturn : NA,
                            bottom: '20dp'
                        }
                    }
                ];
                widgetScope.segCollectionOverview.setData(masterData);
                widgetScope.flxCollectionOverview.setVisibility(true);
            } catch (err) {
                var errorObj = {
                    "method": "renderCollectionOverView",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        toggleUploadDocumentInfoPopup: function () {
            var scope = this;
            try {
                widgetScope.flxInfoUploadMsg.setVisibility(!widgetScope.flxInfoUploadMsg.isVisible);
            } catch (err) {
                var errorObj = {
                    "method": "toggleUploadDocumentInfoPopup",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        renderPageTitle: function () {
            var scope = this;
            try {
                let localPageTitle;
                if (createCollectionData.status && createCollectionData.status.toLowerCase() == presenter.outwardConstants.returnedByBank) {
                    localPageTitle = kony.i18n.getCurrentLocale === "ar_AE" ?
                        `Revise Details - ${createCollectionData.collectionReference} - ${kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection")}`
                        :
                        `${kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection")} - ${createCollectionData.collectionReference} - Revise Details`;
                } else {
                    localPageTitle = kony.i18n.getCurrentLocale === "ar_AE" ?
                        `${kony.i18n.getLocalizedString("i18n.TradeFinance.createNewRequest")} - ${kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection")}`
                        :
                        `${kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection")} - ${kony.i18n.getLocalizedString("i18n.TradeFinance.createNewRequest")}`;
                }
                scope.view.formTemplate12.pageTitle = localPageTitle;
            } catch (err) {
                var errorObj = {
                    "method": "renderPageTitle",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        onCloseClick: function () {
            var scope = this;
            try {
                if (createCollectionData.status && createCollectionData.status.toLowerCase() == presenter.outwardConstants.returnedByBank) {
                    presenter.showOutwardCollectionScreen({
                        context: 'viewCollectionDetails',
                        data: createCollectionData,
                        form: this.view.id
                    });
                } else {
                    let closePopupParam = {
                        heading: presenter.renderI18nKeys('i18n.common.close', false),
                        message: presenter.renderI18nKeys('i18n.TradeFinance.guaranteeClosePopup', false),
                        yesClick: scope.saveDraft.bind(scope, true),
                        yesText: presenter.renderI18nKeys('i18n.TradeFinance.SaveasDraft&Close', false),
                        noText: presenter.renderI18nKeys('kony.mb.Messages.DeletePermanently', false),
                        noClick: scope.deletePermanently.bind(scope),
                    };
                    formTemplateScope.setPopup(closePopupParam);
                }
            } catch (err) {
                var errorObj = {
                    "method": "onCloseClick",
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
            errMsg.level = "frmCreateOutwardCollectionDocumentsTerms";
            // kony.ui.Alert(errMsg);
        },
    };
});
