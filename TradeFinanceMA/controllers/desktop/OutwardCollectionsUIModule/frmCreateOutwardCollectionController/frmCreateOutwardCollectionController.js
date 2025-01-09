define(["FormControllerUtility", "CommonUtilities", "OLBConstants", "FormControllerUtility"], function (FormControllerUtility, CommonUtilities, OLBConstants, FormControllerUtility) {
    let navData;
    let formTemplateScope, widgetScope, popupScope, progressTrackerScope;
    let isUsance = true;
    let presenter;
    const specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
    const alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
    let selectHere = kony.i18n.getLocalizedString("i18n.common.selecthere");
    let isSaveAndContinue = false;
    let isSaveAsDraftAndClose = false;
    let createCollectionData;
    let collectionsRoadmap;
    let fontIcons;
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    return {
        onNavigate: function (data) {
            var scope = this;
            try {
                navData = data;
                presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'OutwardCollectionsUIModule' });
                scope.view.init = scope.init;
                scope.view.preShow = scope.preShow;
                scope.view.postShow = scope.postShow;
                scope.view.onBreakpointChange = scope.onBreakPointChange;
                !(navData.flowType) && (presenter.createCollectionData = {});
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
                progressTrackerScope = widgetScope.ProgressTracker;
                collectionsRoadmap = presenter.collectionsRoadmap;
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
                scope.setAccountsDropdown(widgetScope.segAmountCreditAccountDropdown.id);
                scope.setAccountsDropdown(widgetScope.segChargesDebitAccountDropdown.id);
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
                widgetScope.flxBannerMessage.setVisibility(false);
                if (navData.flowType && navData.flowType === 'draweeAndCollectingBank') {
                    scope.enableOrDisableButton();
                } else if (navData.flowType && navData.flowType == 'continueEditing') {
                    scope.loadDefaults();
                    presenter.getOutwardCollectionsById({
                        "collectionReference": navData.collectionReference
                    }, "frmCreateOutwardCollection");
                } else {
                    scope.loadDefaults();
                }
                scope.renderRoadmap();
                scope.renderPageTitle();
            } catch (err) {
                var errorObj = {
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        loadDefaults: function () {
            var scope = this;
            try {
                scope.initFormActions();
                scope.loadCurrencies();
                scope.clearFields();
                collectionsRoadmap.collectionDetails.lifeCycle = 'Inprogress';
                collectionsRoadmap.draweeAndCollectingBank.lifeCycle = 'Incomplete';
                collectionsRoadmap.documentsAndBankInstructions.lifeCycle = 'Incomplete';
                collectionsRoadmap.reviewAndSubmit.lifeCycle = 'Incomplete';
            } catch (err) {
                var errorObj = {
                    "method": "loadDefaults",
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
                    yesClick: scope.clearFields.bind(scope),
                    yesText: presenter.renderI18nKeys('i18n.common.yes', false),
                    noText: presenter.renderI18nKeys('kony.mb.common.AlertNo', false)
                };
                let savePopupParam = {
                    heading: presenter.renderI18nKeys('i18n.TradeFinance.SaveDraft', false),
                    message: presenter.renderI18nKeys('i18n.TradeFinance.saveAsDraftPopup', false),
                    yesClick: scope.saveDraft.bind(scope, false),
                    yesText: presenter.renderI18nKeys('i18n.common.yes', false),
                    noText: presenter.renderI18nKeys('kony.mb.common.AlertNo', false)
                };
                presenter.cursorTypePointer([
                    widgetScope.flxSight,
                    widgetScope.flxUsance,
                    widgetScope.flxAllowUsanceAcceptance,
                    widgetScope.flxCurrencyValue,
                    widgetScope.flxAmountCreditAccountValue,
                    widgetScope.flxChargesDebitAccountValue,
                    widgetScope.flxBannerMessageClose,
                    progressTrackerScope.lblCoptyStatus,
                ]);
                let tempAllowUsanceAcceptance = widgetScope.lblRadioAllowUsanceAcceptance;
                widgetScope.flxBannerMessageClose.onClick = () => {
                    widgetScope.flxBannerMessage.setVisibility(false);
                };
                widgetScope.lblClear.onTouchEnd = formTemplateScope.setPopup.bind(scope, clearPopupParam);
                widgetScope.lblSave.onTouchEnd = formTemplateScope.setPopup.bind(scope, savePopupParam);
                widgetScope.tbxDocumentNumber.onKeyUp = scope.enableOrDisableButton.bind(scope);
                widgetScope.tbxDocumentNumber.restrictCharactersSet = specialCharactersSet;
                widgetScope.flxSight.onClick = scope.slectSightOrUsance.bind(scope, false);
                widgetScope.flxUsance.onClick = scope.slectSightOrUsance.bind(scope, true);
                widgetScope.tbxUsanceDays.restrictCharactersSet = specialCharactersSet + alphabetsSet;
                widgetScope.tbxUsanceDetails.restrictCharactersSet = specialCharactersSet;
                widgetScope.tbxUsanceDays.onKeyUp = scope.enableOrDisableButton.bind(scope);
                widgetScope.tbxUsanceDetails.onKeyUp = scope.enableOrDisableButton.bind(scope);
                widgetScope.flxAllowUsanceAcceptance.onClick = () => {
                    tempAllowUsanceAcceptance.text === fontIcons.checkboxUnselected ? tempAllowUsanceAcceptance.text = fontIcons.checkboxSelected : tempAllowUsanceAcceptance.text = fontIcons.checkboxUnselected;
                };
                widgetScope.flxCurrencyValue.onClick = scope.toggleDropdown.bind(scope, widgetScope.flxCurrencyDropdown.id, widgetScope.lblCurrencyDropdown.id);
                widgetScope.tbxAmount.restrictCharactersSet = alphabetsSet + specialCharactersSet.replace(',.', '');
                widgetScope.tbxAmount.onKeyUp = scope.enableOrDisableButton.bind(scope);
                widgetScope.tbxAmount.onKeyDown = scope.enableOrDisableButton.bind(scope);
                widgetScope.tbxAmount.onEndEditing = scope.formatAmount;
                widgetScope.flxAmountCreditAccountValue.onClick = scope.toggleDropdown.bind(scope, widgetScope.flxAmountCreditAccountDropdown.id, widgetScope.lblAmountCreditAccountDropdown.id);
                widgetScope.flxChargesDebitAccountValue.onClick = scope.toggleDropdown.bind(scope, widgetScope.flxChargesDebitAccountDropdown.id, widgetScope.lblChargesDebitAccountDropdown.id);
                widgetScope.flxRight.skin = 'slfBox';
                widgetScope.btnClose.onClick = scope.onCloseClick.bind(scope);
                widgetScope.btnSaveAndContinue.onClick = () => {
                    isSaveAndContinue = true;
                    scope.saveDraft(false);
                };
                widgetScope.ProgressTracker.lblApplicationStep.text = presenter.renderI18nKeys('i18n.TradeFinance.createNewRequest', false);
                progressTrackerScope.lblCoptyStatus.onTouchEnd = this.toggleLGCopyDetailsPopup.bind(this, true);
                popupScope.LGCopyDetails.flxClose.onClick = this.toggleLGCopyDetailsPopup.bind(this, false);
                popupScope.LGCopyDetails.btnClose.onClick = this.toggleLGCopyDetailsPopup.bind(this, false);
                popupScope.LGCopyDetails.btnCopyDetails.onClick = this.copyLGDetails;
                popupScope.LGCopyDetails.lblBeneficiary.text = kony.i18n.getLocalizedString("i18n.TradeFinance.CapsDdrawee");
                popupScope.LGCopyDetails.lblReference.text = kony.i18n.getLocalizedString("i18n.TradeFinance.documentNoWithDot");
                popupScope.LGCopyDetails.lblProduct.text = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn");
                popupScope.LGCopyDetails.lblIssueDate.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Amount");
                popupScope.LGCopyDetails.txtSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.searchDraweeDocumentSingleDot");
                widgetScope.btnBack.onClick = () => {
                    presenter.showOutwardCollectionScreen({
                        context: 'viewCollectionDetails',
                        data: createCollectionData,
                        form: this.view.id
                    });
                };
                widgetScope.flxCollectionOverview.setVisibility(false);
                widgetScope.lblClear.setVisibility(true);
                widgetScope.lblSave.setVisibility(true);
                widgetScope.btnBack.setVisibility(false);
                widgetScope.flxBannerMessage.setVisibility(false);
            } catch (err) {
                var errorObj = {
                    "method": "initFormActions",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        getSearchedRecords: function () {
            let text = popupScope.LGCopyDetails.txtSearchBox.text || '';
            presenter.getOutwardCollections({
                "searchString": text,
                "sortByParam": "createdOn",
                "sortOrder": "DESC"
            }, this.view.id);
        },
        toggleLGCopyDetailsPopup: function (visibility) {
            popupScope.setVisibility(visibility);
            popupScope.flxCopyDetails.setVisibility(visibility);
            if (visibility) {
                FormControllerUtility.disableButton(popupScope.LGCopyDetails.btnCopyDetails);
                presenter.getOutwardCollections({
                    "sortByParam": "createdOn",
                    "sortOrder": "DESC",
                    "filterByParam": "status",
                    "filterByValue": "Approved"
                }, this.view.id);
            }
        },

        copyLGDetails: function () {
            var scope = this;
            try {
                const LGData = popupScope.LGCopyDetails.getData();
                if (!LGData) return;
                const { collectionReference, ...newData } = LGData; // Removing collectionReference from LGData
                scope.toggleLGCopyDetailsPopup(false);
                scope.setDataInGlobalObj(newData);
            } catch (err) {
                var errorObj = {
                    "method": "copyLGDetails",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        slectSightOrUsance: function (flag) {
            var scope = this;
            try {
                isUsance = flag;
                widgetScope.flxUsanceValue.setVisibility(isUsance);
                widgetScope.flxAllowUsanceAcceptance.setVisibility(isUsance);
                if (isUsance) {
                    widgetScope.lblRadioSight.text = fontIcons.radioUnselected;
                    widgetScope.lblRadioUsance.text = fontIcons.radioSelected;
                } else {
                    widgetScope.lblRadioSight.text = fontIcons.radioSelected;
                    widgetScope.lblRadioUsance.text = fontIcons.radioUnselected;
                }
                widgetScope.tbxUsanceDays.text = "";
                widgetScope.tbxUsanceDetails.text = "";
                widgetScope.lblRadioAllowUsanceAcceptance.text = fontIcons.checkboxUnselected;
                scope.enableOrDisableButton();
            } catch (err) {
                var errorObj = {
                    "method": "slectSightOrUsance",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        formatAmount: function () {
            var scope = this;
            try {
                let amount = widgetScope.tbxAmount.text;
                if (amount) {
                    amount = applicationManager.getFormatUtilManager().formatAmount(amount);
                    widgetScope.tbxAmount.text = amount || '';
                }
                scope.enableOrDisableButton();
            } catch (err) {
                var errorObj = {
                    "method": "formatAmount",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        loadCurrencies: function () {
            var scope = this;
            try {
                let listValues = presenter.collectionsConfig.currencies;
                let masterData = [];
                widgetScope.segCurrencyDropdown.widgetDataMap = {
                    lblListValue: "lblListValue",
                    flxListDropdown: "flxListDropdown",
                };
                for (const key in listValues) {
                    masterData.push({
                        flxListDropdown: {
                            cursorType: "pointer"
                        },
                        lblListValue: key,
                        selectedValue: key
                    });
                }
                widgetScope.segCurrencyDropdown.setData(masterData);
                widgetScope.segCurrencyDropdown.onRowClick = scope.onCurrencyRowClick.bind(scope);
            } catch (err) {
                var errorObj = {
                    "method": "loadCurrencies",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        onCurrencyRowClick: function () {
            var scope = this;
            try {
                // Gives items which are showing on segment in ui
                let selectedCurrency = widgetScope.segCurrencyDropdown.selectedRowItems[0].selectedValue;
                widgetScope.lblCurrencyValue.text = selectedCurrency;
                widgetScope.flxCurrencyDropdown.setVisibility(false);
                widgetScope.lblCurrencyDropdown.text = fontIcons.chevronDown;
            } catch (err) {
                var errorObj = {
                    "method": "onCurrencyRowClick",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        setAccountsDropdown: function (segName) {
            var scope = this;
            try {
                var segmentData = [];
                var accountList = applicationManager.getConfigurationManager().userAccounts;
                for (let i = 0; i < accountList.length; i++) {
                    accountList[i].formattedName = CommonUtilities.mergeAccountNameNumber(accountList[i].nickName || accountList[i].accountName, accountList[i].accountID);
                }
                widgetScope[segName].widgetDataMap = {
                    lblListValue: "lblListValue",
                    flxListDropdown: "flxListDropdown"
                };
                for (var key in accountList) {
                    if (accountList[key].accountType.toLowerCase() !== OLBConstants.LOAN) {
                        segmentData.push({
                            flxListDropdown: {
                                cursorType: "pointer"
                            },
                            "lblListValue": accountList[key].formattedName,
                            "selectedKey": accountList[key].accountID,
                            "selectedValue": accountList[key].formattedName
                        });
                    }
                }
                widgetScope[segName].setData(segmentData);
                widgetScope[segName].onRowClick = scope.accountsRowOnClick.bind(scope, segName);
            } catch (err) {
                var errorObj = {
                    "level": "frmInwardCollectionViewDetailsController",
                    "method": "setAccountsDropdown",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        accountsRowOnClick: function (segName) {
            try {
                var scope = this;
                var data = widgetScope[segName].data;
                var index = widgetScope[segName].selectedRowIndex;
                if (segName === widgetScope.segAmountCreditAccountDropdown.id) {
                    widgetScope.lblAmountCreditAccountValue.text = data[index[1]].selectedValue;
                    presenter.outwardConstants.debitAccount = data[index[1]].selectedValue;
                    createCollectionData.debitAccount = data[index[1]].selectedKey;
                    widgetScope.lblAmountCreditAccountValue.skin = "sknLblSSP15pxtrucation";
                    widgetScope.flxAmountCreditAccountDropdown.setVisibility(false);
                    widgetScope.lblAmountCreditAccountDropdown.text = fontIcons.chevronDown;
                } else {
                    widgetScope.lblChargesDebitAccountValue.text = data[index[1]].selectedValue;
                    presenter.outwardConstants.creditAccount = data[index[1]].selectedValue;
                    createCollectionData.creditAccount = data[index[1]].selectedKey;
                    widgetScope.lblChargesDebitAccountValue.skin = "bbSknLbl424242SSP15Px";
                    widgetScope.flxChargesDebitAccountDropdown.setVisibility(false);
                    widgetScope.lblChargesDebitAccountDropdown.text = fontIcons.chevronDown;
                }
                scope.enableOrDisableButton();
            } catch (err) {
                var errorObj = {
                    "level": "frmInwardCollectionViewDetailsController",
                    "method": "accountsRowOnClick",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        toggleDropdown: function (dropdownID, dropdownLabel) {
            var scope = this;
            try {
                widgetScope[dropdownID].isVisible === true ? widgetScope[dropdownID].setVisibility(false) : widgetScope[dropdownID].setVisibility(true);
                widgetScope[dropdownLabel].text === fontIcons.chevronDown ? widgetScope[dropdownLabel].text = fontIcons.chevronUp : widgetScope[dropdownLabel].text = fontIcons.chevronDown;
            } catch (err) {
                var errorObj = {
                    "method": "toggleDropdown",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        enableOrDisableButton: function () {
            var scope = this;
            try {
                let flag = false;
                let btnRef = widgetScope.btnSaveAndContinue;
                if (widgetScope.tbxDocumentNumber.text !== ""
                    && widgetScope.tbxAmount.text !== ""
                    && widgetScope.lblAmountCreditAccountValue.text !== selectHere
                    && widgetScope.lblChargesDebitAccountValue.text !== selectHere) {
                    if (isUsance) {
                        if (widgetScope.tbxUsanceDays.text !== "" && widgetScope.tbxUsanceDetails.text !== "") {
                            flag = true;
                        }
                    } else {
                        flag = true;
                    }
                }
                flag ? FormControllerUtility.enableButton(btnRef) : FormControllerUtility.disableButton(btnRef);
            } catch (err) {
                var errorObj = {
                    "method": "enableOrDisableButton",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        gatherUserInputData: function () {
            var scope = this;
            try {
                let tempRoadmapData = collectionsRoadmap;
                tempRoadmapData.collectionDetails.lifeCycle = 'done';
                tempRoadmapData.draweeAndCollectingBank.lifeCycle = 'Inprogress';
                widgetScope.tbxDocumentNumber.text !== '' && (createCollectionData.documentNo = widgetScope.tbxDocumentNumber.text);
                createCollectionData.tenorType = isUsance ? presenter.outwardConstants.usance : presenter.outwardConstants.sight;
                if (isUsance) {
                    widgetScope.tbxUsanceDays.text !== '' && (createCollectionData.usanceDays = widgetScope.tbxUsanceDays.text);
                    widgetScope.tbxUsanceDetails.text !== '' && (createCollectionData.usanceDetails = widgetScope.tbxUsanceDetails.text);
                    createCollectionData.allowUsanceAcceptance = widgetScope.lblRadioAllowUsanceAcceptance.text == fontIcons.checkboxSelected ? presenter.outwardConstants.yes : presenter.outwardConstants.no;
                }
                widgetScope.lblCurrencyValue.text !== '' && (createCollectionData.currency = widgetScope.lblCurrencyValue.text);
                widgetScope.tbxAmount.text !== '' && (createCollectionData.amount = applicationManager.getFormatUtilManager().deFormatAmount(widgetScope.tbxAmount.text));
            } catch (err) {
                var errorObj = {
                    "method": "gatherUserInputData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        renderRoadmap: function () {
            var scope = this;
            try {
                let roadmapData = [];
                for (const key in collectionsRoadmap) {
                    roadmapData.push({
                        'currentRow': key === 'collectionDetails',
                        'rowLabel': collectionsRoadmap[key].name,
                        'rowStatus': collectionsRoadmap[key].lifeCycle
                    });
                }
                roadmapData['showCopyDetails'] = true;
                widgetScope.ProgressTracker.setData(roadmapData);
            } catch (err) {
                var errorObj = {
                    "method": "renderRoadmap",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        clearFields: function () {
            var scope = this;
            try {
                widgetScope.tbxDocumentNumber.text = '';
                scope.slectSightOrUsance(true);
                widgetScope.lblCurrencyValue.text = presenter.collectionsConfig.currencies.USD;
                widgetScope.tbxAmount.text = '';
                widgetScope.lblRadioAllowUsanceAcceptance.text = fontIcons.checkboxUnselected;
                widgetScope.lblAmountCreditAccountValue.text = selectHere;
                widgetScope.lblAmountCreditAccountValue.skin = 'ICSknLabelSSPRegular72727215px';
                widgetScope.lblChargesDebitAccountValue.text = selectHere;
                widgetScope.lblChargesDebitAccountValue.skin = 'ICSknLabelSSPRegular72727215px';
                FormControllerUtility.disableButton(widgetScope.btnSaveAndContinue);
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
                scope.gatherUserInputData();
                if (createCollectionData.status && createCollectionData.status.toLowerCase() == presenter.outwardConstants.returnedByBank) {
                    scope.navigateToAnotherForm();
                } else {
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
                if (!createCollectionData.collectionReference) {
                    // If we not having collectionReference in createCollectionData, no need to call the delete service
                    presenter.createCollectionData = {};
                    presenter.showOutwardCollectionScreen({
                        context: 'outwardCollectionAmendmentDashboard',
                        data: { flowType: presenter.outwardConstants.deletedCollection }
                    });
                } else {
                    let params = {
                        collectionReference: createCollectionData.collectionReference
                    };
                    presenter.deleteCollection(params, this.view.id);
                }
            } catch (err) {
                var errorObj = {
                    "method": "deletePermanently",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        updateFormUI: function (viewModel) {
            var scope = this;
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.serverError) {
                widgetScope.imgBannerMessage.src = presenter.resourcesConstants.images.failedBannerImage;
                widgetScope.lblBannerMessage.text = viewModel.serverError;
                widgetScope.flxBannerMessage.setVisibility(true);
            }
            if (viewModel.OutwardCollections) {
                viewModel.OutwardCollections.map((item, index) => {
                    viewModel.OutwardCollections[index].createdOn = applicationManager.getFormatUtilManager().getFormattedCalendarDate(item.createdOn);
                    viewModel.OutwardCollections[index].formattedAmount = (item.currency + " " + applicationManager.getFormatUtilManager().formatAmount(item.amount));
                });
                popupScope.LGCopyDetails.setData(viewModel.OutwardCollections, 'outwardCollection');
            }
            if (viewModel.savedOutwardCollection) {
                if (isSaveAndContinue) {
                    isSaveAndContinue = false;
                    createCollectionData.collectionReference = viewModel.savedOutwardCollection.collectionReference;
                    scope.navigateToAnotherForm();
                } else if (isSaveAsDraftAndClose) {
                    isSaveAsDraftAndClose = false;
                    presenter.showOutwardCollectionScreen({
                        context: 'outwardCollectionAmendmentDashboard',
                        data: { flowType: presenter.outwardConstants.saveCollectionAsDraft }
                    });
                } else {
                    createCollectionData.collectionReference = viewModel.savedOutwardCollection.collectionReference;
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
            if (viewModel.status) {
                if (viewModel.status.toLowerCase() == presenter.outwardConstants.draft) {
                    // Continue editing
                    scope.setDataInGlobalObj(viewModel);
                } else if (viewModel.status.toLowerCase() == presenter.outwardConstants.returnedByBank) {
                    // Continue to Revise
                    widgetScope.btnClose.text = presenter.renderI18nKeys('i18n.konybb.common.cancel', false);
                    scope.setDataInGlobalObj(viewModel);
                    scope.renderCollectionOverView();
                    scope.renderPageTitle();
                }
            }
        },

        continueEditing: function () {
            var scope = this;
            try {
                let formattedCreditAccount;
                let formattedDebitAccount;
                if (createCollectionData.status) {
                    var accountList = applicationManager.getConfigurationManager().userAccounts;
                    for (let i = 0; i < accountList.length; i++) {
                        if (accountList[i].accountType.toLowerCase() !== OLBConstants.LOAN) {
                            if (createCollectionData.creditAccount && accountList[i].Account_id === createCollectionData.creditAccount) {
                                formattedCreditAccount = CommonUtilities.mergeAccountNameNumber(accountList[i].nickName || accountList[i].accountName, accountList[i].accountID);
                            }
                            if (createCollectionData.debitAccount && accountList[i].Account_id === createCollectionData.debitAccount) {
                                formattedDebitAccount = CommonUtilities.mergeAccountNameNumber(accountList[i].nickName || accountList[i].accountName, accountList[i].accountID);
                            }
                        }
                    }
                }
                let tempRoadmapData = collectionsRoadmap;
                createCollectionData.documentNo && (widgetScope.tbxDocumentNumber.text = createCollectionData.documentNo);
                isUsance = (createCollectionData.tenorType && createCollectionData.tenorType == presenter.outwardConstants.usance) ? true : false;
                if (isUsance) {
                    widgetScope.lblRadioSight.text = fontIcons.radioUnselected;
                    widgetScope.lblRadioUsance.text = fontIcons.radioSelected;
                    createCollectionData.usanceDays && (widgetScope.tbxUsanceDays.text = createCollectionData.usanceDays);
                    createCollectionData.usanceDetails && (widgetScope.tbxUsanceDetails.text = createCollectionData.usanceDetails);
                    widgetScope.lblRadioAllowUsanceAcceptance.text = (createCollectionData.allowUsanceAcceptance && createCollectionData.allowUsanceAcceptance == presenter.outwardConstants.yes) ? fontIcons.checkboxSelected : fontIcons.checkboxUnselected;
                    widgetScope.flxUsanceValue.setVisibility(true);
                    widgetScope.flxAllowUsanceAcceptance.setVisibility(true);
                } else {
                    widgetScope.lblRadioSight.text = fontIcons.radioSelected;
                    widgetScope.lblRadioUsance.text = fontIcons.radioUnselected;
                    widgetScope.flxUsanceValue.setVisibility(false);
                    widgetScope.flxAllowUsanceAcceptance.setVisibility(false);
                }
                widgetScope.tbxDocumentNumber.text = createCollectionData.documentNo ? createCollectionData.documentNo : '';
                widgetScope.lblCurrencyValue.text = createCollectionData.currency ? createCollectionData.currency : presenter.collectionsConfig.currencies.USD;
                widgetScope.tbxAmount.text = createCollectionData.amount ? applicationManager.getFormatUtilManager().formatAmount(createCollectionData.amount) : '';
                widgetScope.lblAmountCreditAccountValue.text = createCollectionData.creditAccount ? formattedCreditAccount : selectHere;
                widgetScope.lblAmountCreditAccountValue.skin = formattedCreditAccount ? 'sknLblSSP15pxtrucation' : 'ICSknLabelSSPRegular72727215px';
                widgetScope.lblChargesDebitAccountValue.text = createCollectionData.debitAccount ? formattedDebitAccount : selectHere;
                widgetScope.lblChargesDebitAccountValue.skin = formattedDebitAccount ? 'sknLblSSP15pxtrucation' : 'ICSknLabelSSPRegular72727215px';
                tempRoadmapData.collectionDetails.lifeCycle = 'done';
                presenter.outwardConstants.creditAccount = createCollectionData.creditAccount ? formattedCreditAccount : NA;
                presenter.outwardConstants.debitAccount = createCollectionData.debitAccount ? formattedDebitAccount : NA;
                scope.enableOrDisableButton();
            } catch (err) {
                var errorObj = {
                    "method": "continueEditing",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        setDataInGlobalObj: function (collectionData) {
            var scope = this;
            try {
                let tempCreateCollectionData = {};
                collectionData.collectionReference && (tempCreateCollectionData.collectionReference = collectionData.collectionReference);
                collectionData.status && (tempCreateCollectionData.status = collectionData.status);
                // Collection Details
                collectionData.documentNo && (tempCreateCollectionData.documentNo = collectionData.documentNo);
                collectionData.createdOn && (tempCreateCollectionData.createdOn = collectionData.createdOn);
                collectionData.reasonForReturn && (tempCreateCollectionData.reasonForReturn = collectionData.reasonForReturn);
                collectionData.tenorType && (tempCreateCollectionData.tenorType = collectionData.tenorType);
                if (collectionData.tenorType == presenter.outwardConstants.usance) {
                    collectionData.usanceDays && (tempCreateCollectionData.usanceDays = collectionData.usanceDays);
                    collectionData.usanceDetails && (tempCreateCollectionData.usanceDetails = collectionData.usanceDetails);
                    collectionData.allowUsanceAcceptance && (tempCreateCollectionData.allowUsanceAcceptance = collectionData.allowUsanceAcceptance);
                }
                collectionData.currency && (tempCreateCollectionData.currency = collectionData.currency);
                collectionData.amount && (tempCreateCollectionData.amount = collectionData.amount);
                collectionData.creditAccount && (tempCreateCollectionData.creditAccount = collectionData.creditAccount);
                collectionData.debitAccount && (tempCreateCollectionData.debitAccount = collectionData.debitAccount);
                // Drawee & Collecting Bank
                collectionData.draweeName && (tempCreateCollectionData.draweeName = collectionData.draweeName);
                collectionData.draweeAddress && (tempCreateCollectionData.draweeAddress = collectionData.draweeAddress);
                collectionData.collectingBank && (tempCreateCollectionData.collectingBank = collectionData.collectingBank);
                collectionData.swiftOrBicCode && (tempCreateCollectionData.swiftOrBicCode = collectionData.swiftOrBicCode);
                collectionData.collectingBankAddress && (tempCreateCollectionData.collectingBankAddress = collectionData.collectingBankAddress);
                // Documents & Bank Instructions
                collectionData.uploadDocuments && (tempCreateCollectionData.uploadDocuments = collectionData.uploadDocuments);
                collectionData.physicalDocuments && (tempCreateCollectionData.physicalDocuments = collectionData.physicalDocuments);
                collectionData.incoTerms && (tempCreateCollectionData.incoTerms = collectionData.incoTerms);
                collectionData.deliveryInstructions && (tempCreateCollectionData.deliveryInstructions = collectionData.deliveryInstructions);
                collectionData.otherCollectionDetails && (tempCreateCollectionData.otherCollectionDetails = collectionData.otherCollectionDetails);
                collectionData.messageToBank && (tempCreateCollectionData.messageToBank = collectionData.messageToBank);
                collectionData.instructionsForBills && (tempCreateCollectionData.instructionsForBills = collectionData.instructionsForBills);
                presenter.createCollectionData = tempCreateCollectionData;
                createCollectionData = tempCreateCollectionData;
                if (collectionData.status && collectionData.status.toLowerCase() == presenter.outwardConstants.returnedByBank) {
                    presenter.outwardConstants.returnedByBankOriginalObj = JSON.parse(JSON.stringify(tempCreateCollectionData));
                }
                scope.continueEditing();
            } catch (err) {
                var errorObj = {
                    "method": "setDataInGlobalObj",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        navigateToAnotherForm: function () {
            var scope = this;
            try {
                let data = {};
                data.flowType = navData.flowType ? navData.flowType : '';
                presenter.showOutwardCollectionScreen({
                    context: 'draweeAndCollectingBank',
                    data
                });
            } catch (err) {
                var errorObj = {
                    "method": "navigateToAnotherForm",
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
                widgetScope.btnBack.setVisibility(true);
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

        onError: function (err) {
            let errMsg = JSON.stringify(err);
            errMsg.level = " frmExportDrawingDetailsController";
            // kony.ui.Alert(errMsg);
        },
    };
});