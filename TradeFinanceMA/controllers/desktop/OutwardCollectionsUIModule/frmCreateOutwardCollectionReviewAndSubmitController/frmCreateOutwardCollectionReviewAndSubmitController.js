define(['FormControllerUtility'], function (FormControllerUtility) {
    let navData;
    let formTemplateScope;
    let widgetScope;
    let popupScope;
    let presenter;
    let createCollectionData;
    let collectionsRoadmap;
    let collectionDetails = [],
        draweeAndCollectingBankDetails = [],
        docAndBankInstructionsDetails = [];
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let isTablet = false;
    let deepCompareKey = '';
    let modifiedFieldsArray = [];
    let normalSkin = 'ICSknLabelSSPRegular42424215px';
    let boldSkin = 'ICSknLabelSSPBold42424215px';
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
                collectionsRoadmap = presenter.collectionsRoadmap;
            } catch (err) {
                var errorObj = {
                    "method": "functionName",
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
                    isTablet = true;
                    widgetScope.flxLeft.width = '100%';
                    widgetScope.flxRight.skin = 'slfBoxffffffB1R5';
                } else if (currentBreakpoint > 1024 || currentBreakpoint <= 1380) {
                    // Browser screen
                    isTablet = false;
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
                FormControllerUtility.enableButton(widgetScope.btnSubmit);
                scope.renderRoadmap();
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
                scope.initFormActions();
                scope.setWidgetDataMap();
                scope.renderReviewUI();
                scope.renderPageTitle();
            } catch (err) {
                var errorObj = {
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        renderRoadmap: function () {
            var scope = this;
            try {
                var scope = this;
                let roadmapData = [];
                for (const key in collectionsRoadmap) {
                    roadmapData.push({
                        'currentRow': key === 'reviewAndSubmit',
                        'rowLabel': collectionsRoadmap[key].name,
                        'rowStatus': collectionsRoadmap[key].lifeCycle
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

        initFormActions: function () {
            var scope = this;
            try {
                modifiedFieldsArray = [];
                widgetScope.flxRight.skin = 'slfBox';
                widgetScope.flxBannerMessageClose.onClick = () => {
                    widgetScope.flxBannerMessage.setVisibility(false);
                };
                widgetScope.btnClose.onClick = scope.onCloseClick.bind(scope);
                widgetScope.btnBack.onClick = scope.navigateToPreviousForm.bind(scope);
                widgetScope.btnSubmit.onClick = scope.onSubmit.bind(scope);
                widgetScope.flxBannerMessage.setVisibility(false);
                widgetScope.flxCollectionOverview.setVisibility(false);
                widgetScope.ProgressTracker.lblApplicationStep.text = presenter.renderI18nKeys('i18n.TradeFinance.createNewRequest', false);
                if (createCollectionData.status && (createCollectionData.status.toLowerCase() == presenter.outwardConstants.returnedByBank)) {
                    widgetScope.btnClose.text = presenter.renderI18nKeys('i18n.konybb.common.cancel', false);
                    scope.renderCollectionOverView();
                    scope.checkForModifiactions();
                }
            } catch (err) {
                var errorObj = {
                    "method": "initFormActions",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        setWidgetDataMap: function () {
            var scope = this;
            try {
                widgetScope.segReviewAndSubmit.widgetDataMap = {
                    flxTempFrmViewDetailsOutward: 'flxTempFrmViewDetailsOutward',
                    lblHeader: 'lblHeader',
                    flxDropDown: 'flxDropDown',
                    lblGuaranteeDetailsRow: 'lblGuaranteeDetailsRow',
                    lblGuaranteeDetailsValue: 'lblGuaranteeDetailsValue',
                    lblKey: 'lblKey',
                    lblValue: 'lblValue',
                    lblAddress1: 'lblAddress1',
                    lblAddress2: 'lblAddress2',
                    lblAddress3: 'lblAddress3',
                    flxAddress: 'flxAddress',
                    flxKey: 'flxKey',
                    flxFrmViewDetailsGuaranteeRow: 'flxFrmViewDetailsGuaranteeRow'
                };
            } catch (err) {
                var errorObj = {
                    "method": "setWidgetDataMap",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        renderCollectionDetails: function () {
            var scope = this;
            try {
                collectionDetails = [
                    [
                        {
                            flxTempFrmViewDetailsOutward: {
                                isVisible: false
                            }
                        },
                        [
                            {
                                lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.TradeFinance.documentNumberWithColon', false),
                                lblGuaranteeDetailsValue: {
                                    text: createCollectionData.documentNo ? createCollectionData.documentNo : NA,
                                    skin: modifiedFieldsArray.includes('documentNo') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.TradeFinance.createdOnWithColon', false),
                                lblGuaranteeDetailsValue: {
                                    text: createCollectionData.createdOn ? presenter.getConvertedDate(createCollectionData, 'createdOn') : NA,
                                    skin: modifiedFieldsArray.includes('createdOn') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.TradeFinance.tenorType', true),
                                lblGuaranteeDetailsValue: {
                                    text: createCollectionData.tenorType ? createCollectionData.tenorType : NA,
                                    skin: modifiedFieldsArray.includes('tenorType') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                "flxFrmViewDetailsGuaranteeRow": {
                                  isVisible: createCollectionData.tenorType == presenter.outwardConstants.usance
                                },
                                lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.TradeFinance.usanceDays', true),
                                lblGuaranteeDetailsValue: {
                                    text: createCollectionData.usanceDays ? createCollectionData.usanceDays : NA,
                                    skin: modifiedFieldsArray.includes('usanceDays') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                "flxFrmViewDetailsGuaranteeRow": {
                                  isVisible: createCollectionData.tenorType == presenter.outwardConstants.usance
                                },
                                lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.TradeFinance.usanceDetailsWithColon', false),
                                lblGuaranteeDetailsValue: {
                                    text: createCollectionData.usanceDetails ? createCollectionData.usanceDetails : NA,
                                    skin: modifiedFieldsArray.includes('usanceDetails') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                "flxFrmViewDetailsGuaranteeRow": {
                                  isVisible: createCollectionData.tenorType == presenter.outwardConstants.usance
                                },
                                lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.TradeFinance.allowUserAcceptance', true),
                                lblGuaranteeDetailsValue: {
                                    text: createCollectionData.allowUsanceAcceptance ? createCollectionData.allowUsanceAcceptance : NA,
                                    skin: modifiedFieldsArray.includes('allowUsanceAcceptance') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                lblGuaranteeDetailsRow: {
                                    text: presenter.renderI18nKeys('i18n.TradeFinance.amountaAndAccountDetails', false),
                                    skin: 'ICSknlbl424242SSP13pxSemibold',
                                },
                                lblGuaranteeDetailsValue: {
                                    isVisible: false
                                }
                            },
                            {
                                lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.TradeFinance.requestAmountWithColon', false),
                                lblGuaranteeDetailsValue: {
                                    text: (createCollectionData.currency && createCollectionData.amount) ? createCollectionData.currency + " " + applicationManager.getFormatUtilManager().formatAmount(createCollectionData.amount) : NA,
                                    skin: (modifiedFieldsArray.includes('currency') || modifiedFieldsArray.includes('amount')) ? boldSkin : normalSkin,
                                }
                            },
                            {
                                lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.TradeFinance.amountCreditAccount', true),
                                lblGuaranteeDetailsValue: {
                                    text: presenter.outwardConstants.creditAccount ? presenter.outwardConstants.creditAccount : NA,
                                    skin: modifiedFieldsArray.includes('creditAccount') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                lblGuaranteeDetailsRow: presenter.renderI18nKeys('i18n.TradeFinance.chargesDebitAccountWithColon', false),
                                lblGuaranteeDetailsValue: {
                                    text: presenter.outwardConstants.debitAccount ? presenter.outwardConstants.debitAccount : NA,
                                    skin: modifiedFieldsArray.includes('debitAccount') ? boldSkin : normalSkin,
                                }
                            },
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "renderCollectionDetails",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        renderDraweeAndCollectingBankDetails: function () {
            var scope = this;
            try {
                let draweeAddress = createCollectionData.draweeAddress ? presenter.getFormattedAddress(createCollectionData.draweeAddress, 'ICSknLabelSSPRegular42424215px', '380dp', '20dp', '0dp') : NA;
                let bankAddress = createCollectionData.collectingBankAddress ? presenter.getFormattedAddress(createCollectionData.collectingBankAddress, 'ICSknLabelSSPRegular42424215px', '380dp', '20dp', '0dp') : NA;
                draweeAndCollectingBankDetails = [
                    [
                        {
                            lblHeader: presenter.renderI18nKeys('i18n.TradeFinance.draweeAndCollectingBankDetails', false),
                            flxDropDown: {
                                cursorType: 'pointer',
                                onClick: scope.onActionClick.bind(this)
                            }
                        },
                        [
                            {
                                lblGuaranteeDetailsRow: {
                                    text: presenter.renderI18nKeys('i18n.TradeFinance.draweeDetails', false),
                                    skin: 'ICSknlbl424242SSP13pxSemibold',
                                },
                                lblGuaranteeDetailsValue: {
                                    isVisible: false
                                }
                            },
                            {
                                'lblGuaranteeDetailsRow': presenter.renderI18nKeys('i18n.TradeFinance.draweeNameWithColon', false),
                                'lblGuaranteeDetailsValue': {
                                    text: createCollectionData.draweeName ? createCollectionData.draweeName : NA,
                                    skin: modifiedFieldsArray.includes('draweeName') ? boldSkin : normalSkin,
                                }
                            },
                            Object.assign({
                                "lblKey": {
                                    text: presenter.renderI18nKeys("i18n.TradeFinance.draweeAddress", true),
                                    skin: "bbSknLbl727272SSP15Px",
                                },
                                "lblValue": {
                                    isVisible: draweeAddress == NA ? true : !draweeAddress['flxAddress']['isVisible'],
                                    text: NA,
                                    skin: modifiedFieldsArray.includes('draweeAddress') ? boldSkin : normalSkin,
                                },
                                template: "flxTempAmendGuarentPrint",
                            }, draweeAddress),
                            {
                                lblGuaranteeDetailsRow: {
                                    text: presenter.renderI18nKeys('i18n.TradeFinance.collectingBankDetails', false),
                                    skin: 'ICSknlbl424242SSP13pxSemibold',
                                },
                                lblGuaranteeDetailsValue: {
                                    isVisible: false
                                }
                            },
                            {
                                'lblGuaranteeDetailsRow': presenter.renderI18nKeys('i18n.payee.bankname', false),
                                'lblGuaranteeDetailsValue': {
                                    text: createCollectionData.collectingBank ? createCollectionData.collectingBank : NA,
                                    skin: modifiedFieldsArray.includes('collectingBank') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                'lblGuaranteeDetailsRow': presenter.renderI18nKeys('i18n.TradeFinance.swift/BicCodeWithColon', false),
                                'lblGuaranteeDetailsValue': {
                                    text: createCollectionData.swiftOrBicCode ? createCollectionData.swiftOrBicCode : NA,
                                    skin: modifiedFieldsArray.includes('swiftOrBicCode') ? boldSkin : normalSkin,
                                }
                            },
                            Object.assign({
                                "lblKey": {
                                    text: presenter.renderI18nKeys("i18n.TradeFinance.bankAddressWithColon", false),
                                    skin: "bbSknLbl727272SSP15Px",
                                },
                                "lblValue": {
                                    isVisible: bankAddress == NA ? true : !bankAddress['flxAddress']['isVisible'],
                                    text: NA,
                                    skin: modifiedFieldsArray.includes('collectingBankAddress') ? boldSkin : normalSkin,
                                },
                                template: "flxTempAmendGuarentPrint",
                            }, bankAddress),
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "renderDraweeAndCollectingBankDetails",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        renderDocAndBankInstructionsDetails: function () {
            var scope = this;
            try {
                docAndBankInstructionsDetails = [
                    [
                        {
                            lblHeader: presenter.renderI18nKeys('i18n.TradeFinance.documentsAndBankInstruction', false),
                            flxDropDown: {
                                cursorType: 'pointer',
                                onClick: scope.onActionClick.bind(this)
                            }
                        },
                        [
                            {
                                lblGuaranteeDetailsRow: {
                                    text: presenter.renderI18nKeys('i18n.TradeFinance.uploadAndPhysicalDocumentCounts', false),
                                    skin: 'ICSknlbl424242SSP13pxSemibold',
                                },
                                lblGuaranteeDetailsValue: {
                                    isVisible: false
                                }
                            },
                            {
                                'lblGuaranteeDetailsRow': presenter.renderI18nKeys('i18n.TradeFinance.uploadedDocumentsWithColon', false),
                                'lblGuaranteeDetailsValue': {
                                    text: scope.processDocsAndInstructionBills('uploadDocuments'),
                                    skin: modifiedFieldsArray.includes('uploadDocuments') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                'lblGuaranteeDetailsRow': presenter.renderI18nKeys('i18n.TradeFinance.physicalDocumentDetailsWithColon', false),
                                'lblGuaranteeDetailsValue': {
                                    text: createCollectionData.physicalDocuments ? presenter.getPhysicalDocumentCount(createCollectionData.physicalDocuments) : NA,
                                    skin: modifiedFieldsArray.includes('physicalDocuments') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                lblGuaranteeDetailsRow: {
                                    text: presenter.renderI18nKeys('i18n.TradeFinance.bankInstructions', false),
                                    skin: 'ICSknlbl424242SSP13pxSemibold',
                                },
                                lblGuaranteeDetailsValue: {
                                    isVisible: false
                                }
                            },
                            {
                                'lblGuaranteeDetailsRow': presenter.renderI18nKeys('i18n.TradeFinance.IncoTerms', true),
                                'lblGuaranteeDetailsValue': {
                                    text: createCollectionData.incoTerms ? createCollectionData.incoTerms : NA,
                                    skin: modifiedFieldsArray.includes('incoTerms') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                'lblGuaranteeDetailsRow': presenter.renderI18nKeys('i18n.TradeFinance.deliveryInstructionsOptional', true),
                                'lblGuaranteeDetailsValue': {
                                    text: createCollectionData.deliveryInstructions ? createCollectionData.deliveryInstructions : NA,
                                    skin: modifiedFieldsArray.includes('deliveryInstructions') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                'lblGuaranteeDetailsRow': presenter.renderI18nKeys('i18n.TradeFinance.otherCollectionDetailsWithOptional', true),
                                'lblGuaranteeDetailsValue': {
                                    text: createCollectionData.otherCollectionDetails ? createCollectionData.otherCollectionDetails : NA,
                                    skin: modifiedFieldsArray.includes('otherCollectionDetails') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                'lblGuaranteeDetailsRow': presenter.renderI18nKeys('i18n.TradeFinance.messageToBankOptionalWithColon', false),
                                'lblGuaranteeDetailsValue': {
                                    text: createCollectionData.messageToBank ? createCollectionData.messageToBank : NA,
                                    skin: modifiedFieldsArray.includes('messageToBank') ? boldSkin : normalSkin,
                                }
                            },
                            {
                                'lblGuaranteeDetailsRow': presenter.renderI18nKeys('i18n.TradeFinance.instructionForBills', true),
                                'lblGuaranteeDetailsValue': {
                                    text: scope.processDocsAndInstructionBills('instructionsForBills'),
                                    skin: modifiedFieldsArray.includes('instructionsForBills') ? boldSkin : normalSkin,
                                }
                            },
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "renderDocAndBankInstructionsDetails",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        renderReviewUI: function () {
            var scope = this;
            try {
                scope.renderCollectionDetails();
                scope.renderDraweeAndCollectingBankDetails();
                scope.renderDocAndBankInstructionsDetails();
                let widgeDataMap = [
                    ...collectionDetails,
                    ...draweeAndCollectingBankDetails,
                    ...docAndBankInstructionsDetails,
                ];
                widgetScope.segReviewAndSubmit.setData(widgeDataMap);
            } catch (err) {
                var errorObj = {
                    "method": "renderReviewUI",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        saveDraft: function () {
            var scope = this;
            try {
                // In previous form itself we saved the record, now we no need to save the same details. Just navigation is enough
                presenter.showOutwardCollectionScreen({
                    context: 'outwardCollectionAmendmentDashboard',
                    data: { flowType: presenter.outwardConstants.saveCollectionAsDraft }
                });
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

        onSubmit: function () {
            var scope = this;
            try {
                if (createCollectionData.status && createCollectionData.status.toLowerCase() == presenter.outwardConstants.returnedByBank) {
                    presenter.outwardConstants.returnedByBankOriginalObj = {};
                    presenter.updateOutwardCollection(createCollectionData, this.view.id);
                } else {
                    presenter.createCollection(createCollectionData, this.view.id);
                }
            } catch (err) {
                var errorObj = {
                    "method": "onSubmit",
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
            if (viewModel.serverError) {
                widgetScope.imgBannerMessage.src = presenter.resourcesConstants.images.failedBannerImage;
                widgetScope.lblBannerMessage.text = viewModel.serverError;
                widgetScope.lblBannerMessage.skin = 'ICSknLabelSSPRegular42424224px';
                widgetScope.flxBannerMessage.setVisibility(true);
            }
            if (viewModel.createCollection || viewModel.updateOutwardCollection) {
                presenter.createCollectionData = {};
                viewModel.updateOutwardCollection && (presenter.outwardConstants.updateOutwardCollection = true);
                let data = {
                    flowType: presenter.outwardConstants.createdCollection,
                    collectionResponse: viewModel.createCollection || viewModel.updateOutwardCollection,
                    modifiedFieldsArray,
                };
                presenter.showOutwardCollectionScreen({
                    context: 'createdCollection',
                    data
                });
            }
            if (viewModel.deletedOutwardCollection) {
                presenter.showOutwardCollectionScreen({
                    context: 'outwardCollectionAmendmentDashboard',
                    data: { flowType: presenter.outwardConstants.deletedCollection }
                });
            }
        },

        processDocsAndInstructionBills: function (responseKey) {
          var scope = this;
          try {
            let tempResponse = createCollectionData[responseKey] ? JSON.parse(createCollectionData[responseKey].replace(/'/g, "\"")) : NA;
            let tempResult = '';
            if (tempResponse !== NA) {
              tempResponse.map((item, index) => {
                if (!item.documentName)
                  tempResult = tempResult + ((index + 1) + '. ' + item) + (tempResponse.length - 1 === index ? '' : '\n\n');
                else
                  tempResult = (tempResult + item.documentName) + (tempResponse.length - 1 === index ? '' : '\n');
              });
            } else {
              tempResult = NA;
            }
            return tempResult;
          } catch (err) {
            var errorObj = {
              "method": "processDocsAndInstructionBills",
              "error": err
            };
            scope.onError(errorObj);
          }
        },

        /** @api : onActionClick
          * Triggerd on click of dropdown in segment
          * @return : NA
          */
        onActionClick: function () {
            var scopeObj = this;
            try {
                let index = widgetScope.segReviewAndSubmit.selectedRowIndex;
                let sectionIndex = index[0];
                let data = widgetScope.segReviewAndSubmit.data;
                let selectedHeaderData = data[sectionIndex][0];
                let segViewDetailsTempData;
                if (segViewDetailsTempData === "") {
                    segViewDetailsTempData = JSON.parse(JSON.stringify(widgetScope.segReviewAndSubmit.data));
                }
                if (selectedHeaderData["imgDropDown"] === "dropdown_expand.png") {
                    selectedHeaderData["imgDropDown"] = "dropdown_collapse.png";
                    data[sectionIndex][1] = segViewDetailsTempData[sectionIndex][1];
                    widgetScope.segReviewAndSubmit.setData(data);
                } else {
                    selectedHeaderData["imgDropDown"] = "dropdown_expand.png";
                    data[sectionIndex][1] = [];
                    widgetScope.segReviewAndSubmit.setData(data);
                }
            } catch (err) {
                var errorObj = {
                    "method": "onActionClick",
                    "error": err
                };
                scopeObj.onError(errorObj);
            }
        },

        navigateToPreviousForm: function () {
            var scope = this;
            try {
                presenter.showOutwardCollectionScreen({
                    context: 'documentAndTerms',
                });
            } catch (err) {
                var errorObj = {
                    "method": "navigateToPreviousForm",
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
                        `${kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ViewRequests")} - Revise Details - ${kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection")}`
                        :
                        `${kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection")} - Revise Details - ${kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ViewRequests")}`;
                } else {
                    localPageTitle = kony.i18n.getCurrentLocale === "ar_AE" ?
                        `${kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ViewRequests")} - ${kony.i18n.getLocalizedString("i18n.TradeFinance.createNewRequest")} - ${kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection")}`
                        :
                        `${kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection")} - ${kony.i18n.getLocalizedString("i18n.TradeFinance.createNewRequest")} - ${kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ViewRequests")}`;
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

        renderCollectionOverView: function () {
            var scope = this;
            try {
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
                            skin: boldSkin
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
                scope.view.forceLayout();
                widgetScope.flxCollectionOverview.setVisibility(true);
            } catch (err) {
                var errorObj = {
                    "method": "renderCollectionOverView",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        checkForModifiactions: function () {
            var scope = this;
            try {
                // Original object from BE
                let tempReturnedByBankOriginalObj = JSON.parse(JSON.stringify(presenter.outwardConstants.returnedByBankOriginalObj));
                tempReturnedByBankOriginalObj.collectingBankAddress = JSON.parse(tempReturnedByBankOriginalObj.collectingBankAddress.replace(/'/g, "\""));
                tempReturnedByBankOriginalObj.draweeAddress = JSON.parse(tempReturnedByBankOriginalObj.draweeAddress.replace(/'/g, "\""));
                tempReturnedByBankOriginalObj.instructionsForBills && (tempReturnedByBankOriginalObj.instructionsForBills = JSON.parse(tempReturnedByBankOriginalObj.instructionsForBills.replace(/'/g, "\"")));
                tempReturnedByBankOriginalObj.physicalDocuments = JSON.parse(tempReturnedByBankOriginalObj.physicalDocuments.replace(/'/g, "\""));
                tempReturnedByBankOriginalObj.uploadDocuments = JSON.parse(tempReturnedByBankOriginalObj.uploadDocuments.replace(/'/g, "\""));
                // Local object based on user changes
                let tempCreateCollectionData = JSON.parse(JSON.stringify(createCollectionData));
                tempCreateCollectionData.collectingBankAddress = JSON.parse(tempCreateCollectionData.collectingBankAddress.replace(/'/g, "\""));
                tempCreateCollectionData.draweeAddress = JSON.parse(tempCreateCollectionData.draweeAddress.replace(/'/g, "\""));
                tempCreateCollectionData.instructionsForBills && (tempCreateCollectionData.instructionsForBills = JSON.parse(tempCreateCollectionData.instructionsForBills.replace(/'/g, "\"")));
                tempCreateCollectionData.physicalDocuments = JSON.parse(tempCreateCollectionData.physicalDocuments.replace(/'/g, "\""));
                tempCreateCollectionData.uploadDocuments = JSON.parse(tempCreateCollectionData.uploadDocuments.replace(/'/g, "\""));
                modifiedFieldsArray = scope.deepCompare(tempCreateCollectionData, tempReturnedByBankOriginalObj);
                if (modifiedFieldsArray.length == 0) {
                    // No modifications done
                    FormControllerUtility.disableButton(widgetScope.btnSubmit);
                    widgetScope.imgBannerMessage.src = presenter.resourcesConstants.images.warningBannerImage;
                    widgetScope.lblBannerMessage.text = presenter.renderI18nKeys('i18n.TradeFinance.warningNotchanged', false);
                    widgetScope.lblBannerMessage.skin = 'sknRtxSSPFF000015Px';
                    widgetScope.flxBannerMessage.setVisibility(true);
                } else {
                    // Modified the record
                    FormControllerUtility.enableButton(widgetScope.btnSubmit);
                    scope.renderReviewUI();
                }
            } catch (err) {
                var errorObj = {
                    "method": "checkForModifiactions",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        deepCompare: function (obj1, obj2) {
            var scope = this;
            try {
                let differentKeys = [];
                for (let key in obj1) {
                    for (let modifiedKeys in createCollectionData) {
                        modifiedKeys == key && (deepCompareKey = key);
                    }
                    if (!obj2.hasOwnProperty(key)) {
                        differentKeys.push(deepCompareKey);
                        deepCompareKey = '';
                    } else if (typeof obj1[key] === 'object') {
                        differentKeys = differentKeys.concat(scope.deepCompare(obj1[key], obj2[key]));
                    } else if (obj1[key] !== obj2[key]) {
                        differentKeys.push(deepCompareKey);
                        deepCompareKey = '';
                    }
                }
                return differentKeys;
            } catch (err) {
                var errorObj = {
                    "method": "deepCompare",
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
            errMsg.level = " frmExportDrawingDetailsController";
            // kony.ui.Alert(errMsg);
        },
    };
});
