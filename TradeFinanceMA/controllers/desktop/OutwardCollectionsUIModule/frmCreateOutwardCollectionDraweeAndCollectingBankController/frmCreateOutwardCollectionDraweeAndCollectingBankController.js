define(["FormControllerUtility"], function (FormControllerUtility) {
    let navData;
    let widgetScope, beneficiaryDetailsScope;
    let presenter;
    const specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
    const alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
    const selectHere = kony.i18n.getLocalizedString("i18n.common.selecthere");
    let beneficiaries = [];
    let isSaveAndContinue = false;
    let isSaveAsDraftAndClose = false;
    let fontIcons, skins;
    let selectedBeneficiaryDetails;
    let isOnlySave = false;
    let createCollectionData;
    let outwardConstants;
    let saveDraweeForFutureRef;
    let markAsCollecting;
    let popupScope;
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let regExAllowNoHyphenSpace = new RegExp('^[0-9 \-]+$');
    return {
        onNavigate: function (data) {
            var scope = this;
            try {
                navData = data;
                this.view.init = this.init;
                this.view.preShow = this.preShow;
                this.view.postShow = this.postShow;
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
                beneficiaryDetailsScope = scope.view.formTemplate12.flxContentTCCenter.flxContainer.flxLeft.flxProvideDraweeAndCollectingBank.flxBeneficiaryDetails.BeneficiaryDetails;
                scope.view.onBreakpointChange = scope.onBreakPointChange;
                fontIcons = presenter.resourcesConstants.fontIcons;
                skins = presenter.resourcesConstants.skins;
                outwardConstants = presenter.outwardConstants;
                outwardConstants.saveDraweeForFutureRef = false;
            } catch (err) {
                var errorObj = {
                    "method": "init",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        preShow: function () {
            var scope = this;
            try {
                FormControllerUtility.disableButton(widgetScope.btnSaveAndContinue);
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
                scope.initFormActions();
                scope.renderRoadmap();
                scope.modifyBeneficiaryDetailsUI();
                presenter.getBeneficiaries(this.view.id);
                scope.clearFields();
                scope.continueEditing();
                scope.renderPageTitle()
            } catch (err) {
                var errorObj = {
                    "method": "postShow",
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


        initFormActions: function () {
            var scope = this;
            try {
                markAsCollecting = beneficiaryDetailsScope.lblMarkAdvisingBankCheckboxIcon;
                presenter.cursorTypePointer([
                    beneficiaryDetailsScope.flxPreferableBeneficiaryOption1,
                    beneficiaryDetailsScope.flxPreferableBeneficiaryOption2,
                    markAsCollecting,
                    beneficiaryDetailsScope.lblMarkAdvisingBank,
                ]);
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
                    yesClick: scope.onlySave.bind(scope),
                    yesText: presenter.renderI18nKeys('i18n.common.yes', false),
                    noText: presenter.renderI18nKeys('kony.mb.common.AlertNo', false)
                };
                widgetScope.flxBannerMessageClose.onClick = () => {
                    widgetScope.flxBannerMessage.setVisibility(false);
                };
                widgetScope.lblClear.onTouchEnd = formTemplateScope.setPopup.bind(scope, clearPopupParam);
                widgetScope.lblSave.onTouchEnd = formTemplateScope.setPopup.bind(scope, savePopupParam);
                beneficiaryDetailsScope.flxPreferableBeneficiaryOption1.onClick = scope.selectExistingOrManualDrawee.bind(scope, true);
                beneficiaryDetailsScope.flxPreferableBeneficiaryOption2.onClick = scope.selectExistingOrManualDrawee.bind(scope, false);
                markAsCollecting.onTouchEnd = scope.toggleCheckbox.bind(scope, markAsCollecting);
                beneficiaryDetailsScope.lblMarkAdvisingBank.top = '2px';
                beneficiaryDetailsScope.lblMarkAdvisingBank.onTouchEnd = scope.toggleCheckbox.bind(scope, markAsCollecting);
                widgetScope.tbxBankName.restrictCharactersSet = specialCharactersSet;
                widgetScope.tbxSwiftOrBICCode.restrictCharactersSet = specialCharactersSet;
                widgetScope.tbxCity.restrictCharactersSet = specialCharactersSet;
                widgetScope.tbxZipCode.restrictCharactersSet = alphabetsSet + specialCharactersSet.replace('-', '');
                widgetScope.tbxCountry.restrictCharactersSet = specialCharactersSet;
                widgetScope.tbxState.restrictCharactersSet = specialCharactersSet;
                widgetScope.tbxBankName.onKeyUp = scope.enableOrDisableButton.bind(scope);
                widgetScope.tbxSwiftOrBICCode.onKeyUp = scope.enableOrDisableButton.bind(scope);
                widgetScope.tbxAddressLine.onKeyUp = scope.enableOrDisableButton.bind(scope);
                widgetScope.tbxAddressLine2.onKeyUp = scope.enableOrDisableButton.bind(scope);
                widgetScope.tbxCity.onKeyUp = scope.enableOrDisableButton.bind(scope);
                widgetScope.tbxZipCode.onKeyUp = scope.zipCodeValidation.bind(scope, widgetScope.tbxZipCode);
                widgetScope.tbxCountry.onKeyUp = scope.enableOrDisableButton.bind(scope);
                widgetScope.tbxState.onKeyUp = scope.enableOrDisableButton.bind(scope);
                widgetScope.flxRight.skin = 'slfBox';
                widgetScope.btnClose.onClick = scope.onCloseClick.bind(scope);
                widgetScope.btnBack.onClick = scope.navigateToAnotherForm.bind(scope, true);
                widgetScope.btnSaveAndContinue.onClick = () => {
                    isSaveAndContinue = true;
                    scope.saveDraft(false);
                };
                widgetScope.ProgressTracker.lblApplicationStep.text = presenter.renderI18nKeys('i18n.TradeFinance.createNewRequest', false);
                widgetScope.lblLookup.onTouchEnd = this.toggleSwiftLookUp.bind(this, true);
                popupScope.lblCross.onTouchEnd = this.toggleSwiftLookUp.bind(this, false);
                popupScope.btnSearch.onClick = this.searchSwiftCode;
                popupScope.tbxLookUpField1.onTextChange = this.enableOrDisableSearchButton;
                popupScope.tbxLookUpField2.onTextChange = this.enableOrDisableSearchButton;
                popupScope.tbxLookUpField3.onTextChange = this.enableOrDisableSearchButton;
                popupScope.tbxLookUpField4.onTextChange = this.enableOrDisableSearchButton;
                popupScope.tbxEnterBicOrSwiftCode.onTextChange = this.enableOrDisableSearchButton;
                widgetScope.flxCollectionOverview.setVisibility(false);
                widgetScope.lblClear.setVisibility(true);
                widgetScope.lblSave.setVisibility(true);
                widgetScope.btnBack.setVisibility(true);
                widgetScope.flxBannerMessage.setVisibility(false);
            } catch (err) {
                var errorObj = {
                    "method": "initFormActions",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        enableOrDisableSearchButton: function () {
            if (popupScope.tbxLookUpField1.text || popupScope.tbxLookUpField2.text || popupScope.tbxLookUpField3.text || popupScope.tbxLookUpField4.text || popupScope.tbxEnterBicOrSwiftCode ) {
              FormControllerUtility.enableButton(popupScope.btnSearch);
            } else {
              FormControllerUtility.disableButton(popupScope.btnSearch);
            }
          },
        selectExistingOrManualDrawee: function(isExistingDrawee) {
            var scope = this;
            try {
                beneficiaryDetailsScope.lblPreferableBeneficiaryOptionIcon1.skin = 'ICSknLblRadioBtnSelectedFontIcon003e7520px';
                beneficiaryDetailsScope.lblPreferableBeneficiaryOptionIcon2.skin = 'ICSknLblRadioBtnSelectedFontIcon003e7520px';
                if (isExistingDrawee) {
                    // Select from exisiting Drawee
                    beneficiaryDetailsScope.lblPreferableBeneficiaryOptionIcon1.text = fontIcons.radioSelected;
                    beneficiaryDetailsScope.lblPreferableBeneficiaryOptionIcon2.text = fontIcons.radioUnselected;
                    beneficiaryDetailsScope.flxExistingBeneficiaryDetails.setVisibility(true);
                    beneficiaryDetailsScope.flxEnterBeneficiaryDetails.setVisibility(false);
                    beneficiaryDetailsScope.flxSelectedBeneficiaryDetails.setVisibility(false);
                    beneficiaryDetailsScope.lblSelectedBeneficiary.text = selectHere;
                    beneficiaryDetailsScope.lblSelectedBeneficiary.skin = 'ICSknLabelSSPRegular72727215px';
                    beneficiaryDetailsScope.flxMarkAdvisingBankCheckbox.top='30px';
                    beneficiaryDetailsScope.flxSelectBeneficiary.top='20px';
                } else {
                    // Enter manually
                    saveDraweeForFutureRef = beneficiaryDetailsScope.lblSaveBeneficiaryCheckboxIcon;
                    presenter.cursorTypePointer([
                        saveDraweeForFutureRef,
                        beneficiaryDetailsScope.lblSaveBeneficiary
                    ]);
                    beneficiaryDetailsScope.lblPreferableBeneficiaryOptionIcon1.text = fontIcons.radioUnselected;
                    beneficiaryDetailsScope.lblPreferableBeneficiaryOptionIcon2.text = fontIcons.radioSelected;
                    beneficiaryDetailsScope.flxExistingBeneficiaryDetails.setVisibility(false);
                    beneficiaryDetailsScope.flxEnterBeneficiaryDetails.setVisibility(true);
                    beneficiaryDetailsScope.tbxBeneficiaryName.text = "";
                    beneficiaryDetailsScope.tbxAddressField1.text = "";
                    beneficiaryDetailsScope.tbxAddressField2.text = "";
                    beneficiaryDetailsScope.tbxAddressField3.text = "";
                    beneficiaryDetailsScope.tbxAddressField4.text = "";
                    beneficiaryDetailsScope.tbxAddressField5.text = "";
                    beneficiaryDetailsScope.tbxAddressField6.text = "";
                    beneficiaryDetailsScope.tbxBeneficiaryName.onKeyUp = scope.enableOrDisableButton.bind(scope);
                    beneficiaryDetailsScope.tbxAddressField1.onKeyUp = scope.enableOrDisableButton.bind(scope);
                    beneficiaryDetailsScope.tbxAddressField2.onKeyUp = scope.enableOrDisableButton.bind(scope);
                    beneficiaryDetailsScope.tbxAddressField3.onKeyUp = scope.enableOrDisableButton.bind(scope);
                    beneficiaryDetailsScope.tbxAddressField4.onKeyUp = scope.enableOrDisableButton.bind(scope);
                    beneficiaryDetailsScope.tbxAddressField5.onKeyUp = scope.enableOrDisableButton.bind(scope);
                    beneficiaryDetailsScope.tbxAddressField6.onKeyUp = scope.zipCodeValidation.bind(scope, beneficiaryDetailsScope.tbxAddressField6);
                    saveDraweeForFutureRef.onTouchEnd = scope.toggleCheckbox.bind(scope, saveDraweeForFutureRef);
                    beneficiaryDetailsScope.lblSaveBeneficiary.onTouchEnd = scope.toggleCheckbox.bind(scope, saveDraweeForFutureRef);
                }
                scope.enableOrDisableButton();
            } catch (err) {
                var errorObj = {
                    "method": "selectExistingOrManualDrawee",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        toggleSwiftLookUp: function (visibility) {
            if (visibility) {
              for (let i = 1; i <= 4; i++) {
                popupScope['tbxLookUpField' + i].text = "";
              }
              popupScope.tbxEnterBicOrSwiftCode.text = "";
              popupScope.segSwiftCodeList.removeAll();
              FormControllerUtility.disableButton(popupScope.btnSearch);
            }
            popupScope.setVisibility(visibility);
            popupScope.flxSwiftLookUp.setVisibility(visibility);
            popupScope.flxSwiftLookUp.forceLayout();
          },

          searchSwiftCode: function () {
            const payload = {
              bankName: popupScope.tbxLookUpField1.text,
              branchName: popupScope.tbxLookUpField2.text,
              country: popupScope.tbxLookUpField3.text,
              city: popupScope.tbxLookUpField4.text
            };
            presenter.getSwiftBicCodes(payload, this.view.id);
          },

          populateSwiftCodes: function (swiftCodes) {
            var scope = this;
            popupScope.segSwiftCodeList.widgetDataMap = {
              "flxSwiftLookupRecordList": "flxSwiftLookupRecordList",
              "lblValue1": "lblValue1",
              "lblValue2": "lblValue2",
              "lblValue3": "lblValue3"
            };
            let segData = [];
            for (let swiftCode of swiftCodes) {
              segData.push(Object.assign(swiftCode, {
                lblValue1: {
                  text: swiftCode.bic
                },
                lblValue2: {
                  text: [swiftCode.bankName, swiftCode.bankAddress, swiftCode.city, swiftCode.country].join(', ')
                },
                lblValue3: {
                  text: kony.i18n.getLocalizedString('i18n.TransfersEur.selectSwift'),
                  cursorType: 'pointer',
                  onTouchEnd: scope.setSelectedSwiftData,
                },
                template: 'flxSwiftLookupRecordList'
              }));
            }
            popupScope.segSwiftCodeList.setData(segData);
          },
          setSelectedSwiftData: function () {
            const index = arguments[3].rowIndex;
            const data = popupScope.segSwiftCodeList.data[index];
            widgetScope.tbxSwiftOrBICCode.text = data.bic || data.swiftCode || '' ;
            widgetScope.tbxBankName.text = data.bankName || '';
            widgetScope.tbxAddressLine.text = data.bankAddress ? data.bankAddress.split(',')[0] : '';
            widgetScope.tbxAddressLine2.text = data.bankAddress ? data.bankAddress.split(',')[1] : '';
            widgetScope.tbxCity.text = data.city || '';
            widgetScope.tbxState.text = data.state || '';
            widgetScope.tbxCountry.text = data.country || '';
            widgetScope.tbxZipCode.text = data.zipcode || '';
            this.toggleSwiftLookUp(false);
          },

        toggleCheckbox: function (checkboxRef) {
            var scope = this;
            try {
                checkboxRef.text == fontIcons.checkboxUnselected ? checkboxRef.text = fontIcons.checkboxSelected : checkboxRef.text = fontIcons.checkboxUnselected;
                (checkboxRef == saveDraweeForFutureRef && checkboxRef.text == fontIcons.checkboxSelected) ? outwardConstants.saveDraweeForFutureRef = true : outwardConstants.saveDraweeForFutureRef = false;
                if (checkboxRef == markAsCollecting && checkboxRef.text == fontIcons.checkboxSelected) {
                    selectedBeneficiaryDetails = beneficiaryDetailsScope.getData() ? beneficiaryDetailsScope.getData() : selectedBeneficiaryDetails;
                    if (!presenter.isEmptyNullOrUndefined(selectedBeneficiaryDetails)) {
                        widgetScope.tbxAddressLine.text = selectedBeneficiaryDetails.address1;
                        widgetScope.tbxAddressLine2.text = selectedBeneficiaryDetails.address2;
                        widgetScope.tbxCity.text = selectedBeneficiaryDetails.city;
                        widgetScope.tbxZipCode.text = selectedBeneficiaryDetails.zipcode;
                        widgetScope.tbxCountry.text = selectedBeneficiaryDetails.country;
                        widgetScope.tbxState.text = selectedBeneficiaryDetails.state;
                        scope.enableOrDisableButton();
                    }
                }
            } catch (err) {
                var errorObj = {
                    "method": "toggleCheckbox",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        continueEditing: function () {
            var scope = this;
            try {
                scope.selectExistingOrManualDrawee(true);
                createCollectionData.draweeName ? (beneficiaryDetailsScope.tbxBeneficiaryName.text = createCollectionData.draweeName) : (beneficiaryDetailsScope.tbxBeneficiaryName.text = '');
                createCollectionData.collectingBank ? (widgetScope.tbxBankName.text = createCollectionData.collectingBank) : (widgetScope.tbxBankName.text = '');
                createCollectionData.swiftOrBicCode ? (widgetScope.tbxSwiftOrBICCode.text = createCollectionData.swiftOrBicCode) : (widgetScope.tbxSwiftOrBICCode.text = '');
                if (createCollectionData.collectingBankAddress) {
                    let tempcollectingBankAddress = JSON.parse(createCollectionData.collectingBankAddress.replace(/'/g, "\""));
                    tempcollectingBankAddress.address1 ? (widgetScope.tbxAddressLine.text = tempcollectingBankAddress.address1) : (widgetScope.tbxAddressLine.text = '');
                    tempcollectingBankAddress.address2 ? (widgetScope.tbxAddressLine2.text = tempcollectingBankAddress.address2) : (widgetScope.tbxAddressLine2.text = '');
                    tempcollectingBankAddress.city ? (widgetScope.tbxCity.text = tempcollectingBankAddress.city) : (widgetScope.tbxCity.text = '');
                    tempcollectingBankAddress.state ? (widgetScope.tbxState.text = tempcollectingBankAddress.state) : (widgetScope.tbxState.text = '');
                    tempcollectingBankAddress.country ? (widgetScope.tbxCountry.text = tempcollectingBankAddress.country) : (widgetScope.tbxCountry.text = '');
                    tempcollectingBankAddress.zipcode ? (widgetScope.tbxZipCode.text = tempcollectingBankAddress.zipcode) : (widgetScope.tbxZipCode.text = '');
                }
                this.enableOrDisableButton();
                if (createCollectionData.status && (createCollectionData.status.toLowerCase() == presenter.outwardConstants.returnedByBank)) {
                    widgetScope.btnClose.text = presenter.renderI18nKeys('i18n.konybb.common.cancel', false);
                    scope.renderCollectionOverView();
                }
            } catch (err) {
                var errorObj = {
                    "method": "continueEditing",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.beneficiaries) {
                beneficiaries = viewModel.beneficiaries;
                this.constructBeneficiarySegmentData();
                if (createCollectionData.draweeAddress) {
                    let tempDraweeAddress = JSON.parse(createCollectionData.draweeAddress.replace(/'/g, "\""));
                    beneficiaryDetailsScope.preFillData(tempDraweeAddress);
                }
            }
            if (viewModel.serverError) {
                widgetScope.imgBannerMessage.src = presenter.resourcesConstants.images.failedBannerImage;
                widgetScope.lblBannerMessage.text = viewModel.serverError;
                widgetScope.flxBannerMessage.setVisibility(true);
            }
            if (viewModel.swiftCodes) {
                this.populateSwiftCodes(viewModel.swiftCodes);
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

        constructBeneficiarySegmentData: function () {
            var scope = this;
            try {
                let segData = [];
                const beneficiaryMapping = {
                    'sameBank': kony.i18n.getLocalizedString('kony.mb.approvalsAndRequest.filter.sameBank'),
                    'domestic': kony.i18n.getLocalizedString('i18n.ProfileManagement.Domestic'),
                    'international': kony.i18n.getLocalizedString('i18n.ProfileManagement.International'),
                    'trade': kony.i18n.getLocalizedString('i18n.TradeFinance.tradeBeneficiary')
                };
                beneficiaries.forEach(row => {
                    row['flxBeneficiaryList'] = {
                        'skin': 'slFbox'
                    };
                    row['lblBeneficiary'] = {
                        'text': row.accountNumber ? (row.beneficiaryName + '...' + row.accountNumber.slice(-4)) : row.beneficiaryName
                    };
                    row['flxBankName'] = {
                        'isVisible': row.bankName ? true : false
                    };
                    row['lblBankName'] = {
                        'text': row.bankName || ''
                    };
                    row['imgBank'] = {
                        'isVisible': false
                    };
                });
                const groupedBeneficiaryData = this.groupBeneficiaryData(beneficiaries);
                for (const key in beneficiaryMapping) {
                    if (!groupedBeneficiaryData[key] || groupedBeneficiaryData[key].length === 0) continue;
                    segData.push([
                        {
                            'lblHeading': beneficiaryMapping[key] + ' (' + groupedBeneficiaryData[key].length + ')'
                        },
                        groupedBeneficiaryData[key]
                    ]);
                }
                beneficiaries = segData;
                beneficiaryDetailsScope.setData(beneficiaries);
            } catch (err) {
                var errorObj = {
                    "method": "constructBeneficiarySegmentData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        groupBeneficiaryData: function (data) {
            var scope = this;
            try {
                return data.reduce(function (acc, obj) {
                    (acc[obj['payeeType']] = acc[obj['payeeType']] || []).push(obj);
                    return acc;
                }, {});
            } catch (err) {
                var errorObj = {
                    "method": "groupBeneficiaryData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        enableOrDisableButton: function () {
            var scope = this;
            try {
                let draweeFlag = false;
                let collectingBankFlag = false;
                let btnRef = widgetScope.btnSaveAndContinue;
                if (beneficiaryDetailsScope.lblPreferableBeneficiaryOptionIcon2.text == fontIcons.radioSelected) {
                    // Enter manually
                    if (
                        beneficiaryDetailsScope.tbxBeneficiaryName.text !== "" &&
                        beneficiaryDetailsScope.tbxAddressField1.text !== "" &&
                        beneficiaryDetailsScope.tbxAddressField2.text !== "" &&
                        beneficiaryDetailsScope.tbxAddressField3.text !== "" &&
                        beneficiaryDetailsScope.tbxAddressField4.text !== "" &&
                        beneficiaryDetailsScope.tbxAddressField5.text !== "" &&
                        beneficiaryDetailsScope.tbxAddressField6.text !== ""
                    ) {
                        draweeFlag = true;
                    } else {
                        draweeFlag = false;
                    }
                } else if (beneficiaryDetailsScope.lblSelectedBeneficiary.text !== selectHere) {
                    // Select from exisiting Drawee
                    draweeFlag = true;
                }
                if (
                    widgetScope.tbxBankName.text !== "" &&
                    widgetScope.tbxSwiftOrBICCode.text !== "" &&
                    widgetScope.tbxAddressLine.text !== "" &&
                    widgetScope.tbxAddressLine2.text !== "" &&
                    widgetScope.tbxCity.text !== "" &&
                    widgetScope.tbxCountry.text !== "" &&
                    widgetScope.tbxState.text !== "" &&
                    widgetScope.tbxZipCode.text !== ""
                ) {
                    collectingBankFlag = true;
                } else {
                    collectingBankFlag = false;
                }
                (draweeFlag && collectingBankFlag) ? FormControllerUtility.enableButton(btnRef) : FormControllerUtility.disableButton(btnRef);
            } catch (err) {
                var errorObj = {
                    "method": "enableOrDisableButton",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        gatherUserInputData: function (backNavigation) {
            var scope = this;
            try {
                let collectionsRoadmap = presenter.collectionsRoadmap;
                createCollectionData = presenter.createCollectionData;
                let draweeAddress;
                collectionsRoadmap.draweeAndCollectingBank.lifeCycle = backNavigation ? (collectionsRoadmap.draweeAndCollectingBank.lifeCycle === 'done' ? 'done' : 'Incomplete') : (isOnlySave ? 'Inprogress' : 'done');
                collectionsRoadmap.documentsAndBankInstructions.lifeCycle = backNavigation ? (collectionsRoadmap.documentsAndBankInstructions.lifeCycle === 'done' ? 'done' : 'Incomplete') : (isOnlySave ? 'Incomplete' : 'Inprogress');
                isOnlySave = false;
                if (!backNavigation) {
                    if (beneficiaryDetailsScope.flxExistingBeneficiaryDetails.isVisible) {
                        // Existing beneficiary details
                        selectedBeneficiaryDetails = beneficiaryDetailsScope.getData() ? beneficiaryDetailsScope.getData() : selectedBeneficiaryDetails;
                        if (!presenter.isEmptyNullOrUndefined(selectedBeneficiaryDetails)) {
                            selectedBeneficiaryDetails.beneficiaryName !== '' && (createCollectionData.draweeName = selectedBeneficiaryDetails.beneficiaryName);
                            createCollectionData.draweeAddress = JSON.stringify(selectedBeneficiaryDetails);
                        }
                    } else {
                        // Enter beneficiary details manually
                        beneficiaryDetailsScope.tbxBeneficiaryName.text !== '' && (createCollectionData.draweeName = beneficiaryDetailsScope.tbxBeneficiaryName.text);
                        draweeAddress = {
                            beneficiaryName: beneficiaryDetailsScope.tbxBeneficiaryName.text,
                            address1: beneficiaryDetailsScope.tbxAddressField1.text,
                            address2: beneficiaryDetailsScope.tbxAddressField2.text,
                            city: beneficiaryDetailsScope.tbxAddressField3.text,
                            state: beneficiaryDetailsScope.tbxAddressField4.text,
                            country: beneficiaryDetailsScope.tbxAddressField5.text,
                            zipcode: beneficiaryDetailsScope.tbxAddressField6.text,
                            saveBeneficiary: outwardConstants.saveDraweeForFutureRef,
                        };
                        createCollectionData.draweeAddress = JSON.stringify(draweeAddress);
                    }
                    widgetScope.tbxBankName.text !== '' && (createCollectionData.collectingBank = widgetScope.tbxBankName.text);
                    widgetScope.tbxSwiftOrBICCode.text !== '' && (createCollectionData.swiftOrBicCode = widgetScope.tbxSwiftOrBICCode.text);
                    let collectingBankAddress = {
                        address1: widgetScope.tbxAddressLine.text,
                        address2: widgetScope.tbxAddressLine2.text,
                        city: widgetScope.tbxCity.text,
                        zipcode: widgetScope.tbxZipCode.text,
                        country: widgetScope.tbxCountry.text,
                        state: widgetScope.tbxState.text,
                    };
                    Object.keys(collectingBankAddress).length > 0 && (createCollectionData.collectingBankAddress = JSON.stringify(collectingBankAddress));
                    if (outwardConstants.saveDraweeForFutureRef) {
                        let loggedUserDetails = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0];
                        let tempSaveDraweeForFutureRefPayload = {
                            payeeDetails: [
                                {
                                    beneficiaryName: beneficiaryDetailsScope.tbxBeneficiaryName.text,
                                    payeeType: 'trade',
                                    draweeAddress
                                }
                            ],
                            cif: [
                                {
                                    contractId: loggedUserDetails.contractId,
                                    coreCustomerId: loggedUserDetails.coreCustomerID
                                }
                            ]
                        };
                        outwardConstants.saveDraweeForFutureRefPayload = tempSaveDraweeForFutureRefPayload;
                    }
                }
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
                for (const key in presenter.collectionsRoadmap) {
                    roadmapData.push({
                        'currentRow': key === 'draweeAndCollectingBank',
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

        modifyBeneficiaryDetailsUI: function () {
            var scope = this;
            try {
                beneficiaryDetailsScope.lblBeneficiaryHeading.text = presenter.renderI18nKeys('i18n.TradeFinance.draweeDetails', false);
                beneficiaryDetailsScope.lblPreferableBeneficiaryDetails.text = presenter.renderI18nKeys('i18n.TradeFinance.confirmProvidingDraweeDetails', false);
                beneficiaryDetailsScope.flxPreferableBeneficiaryOption1.width = '230dp';
                beneficiaryDetailsScope.lblPreferableBeneficiaryOption1.top = '2px';
                beneficiaryDetailsScope.lblPreferableBeneficiaryOption1.left = '10px';
                beneficiaryDetailsScope.lblPreferableBeneficiaryOption1.text = presenter.renderI18nKeys('i18n.TradeFinance.selectFromTheExistingDrawee', false);
                beneficiaryDetailsScope.lblPreferableBeneficiaryOption2.top = '2px';
                beneficiaryDetailsScope.lblPreferableBeneficiaryOption2.left = '10px';
                beneficiaryDetailsScope.lblPreferableBeneficiaryOption2.text = presenter.renderI18nKeys('i18n.addPayee.EnterInfoManually', false);
                beneficiaryDetailsScope.lblSelectBeneficiary.text = presenter.renderI18nKeys('i18n.TradeFinance.CapsDdrawee', false);
                beneficiaryDetailsScope.lblSelectedBeneficiaryDetails.text = presenter.renderI18nKeys('i18n.TradeFinance.selectedDraweeDetails', false);
                beneficiaryDetailsScope.lblBeneficiaryDetailsFieldKey1.text = presenter.renderI18nKeys('i18n.TradeFinance.draweeName', true);
                beneficiaryDetailsScope.lblBeneficiaryDetailsFieldKey2.text = presenter.renderI18nKeys('i18n.TradeFinance.draweeAddressWithOptional', true);
                beneficiaryDetailsScope.lblBankDetails.text = presenter.renderI18nKeys('i18n.transfers.bankDetails', false);
                beneficiaryDetailsScope.lblBankDetailsFieldKey1.text = presenter.renderI18nKeys('kony.mb.addBen.bankName', false);
                beneficiaryDetailsScope.lblBankDetailsFieldKey2.text = presenter.renderI18nKeys('i18n.TransfersEur.SWIFTBIC', true);
                beneficiaryDetailsScope.lblBankDetailsFieldKey3.text = presenter.renderI18nKeys('i18n.WireTransfer.IBAN', true);
                beneficiaryDetailsScope.lblBankDetailsFieldKey4.text = presenter.renderI18nKeys('i18n.TradeFinance.bankAddressWithColon', false);
                beneficiaryDetailsScope.lblMarkAdvisingBank.text = presenter.renderI18nKeys('i18n.TradeFinance.markThisAsCollecting', false);
                beneficiaryDetailsScope.lblBeneficiaryName.text = presenter.renderI18nKeys('i18n.TradeFinance.draweeName', false);
                beneficiaryDetailsScope.lblBeneficiaryAddress.text = presenter.renderI18nKeys('i18n.TradeFinance.draweeAddress', false);
                beneficiaryDetailsScope.lblSaveBeneficiary.top = '2dp';
                beneficiaryDetailsScope.lblSaveBeneficiary.text = presenter.renderI18nKeys('i18n.TradeFinance.saveTheDraweeForFutureUse', false);
                beneficiaryDetailsScope.lblBeneficiaryName.text = presenter.renderI18nKeys('i18n.TradeFinance.draweeName', false);
                beneficiaryDetailsScope.lblAddressField1.text = presenter.renderI18nKeys('i18n.WireTransfer.AddressLine1', false);
                beneficiaryDetailsScope.lblAddressField2.text = presenter.renderI18nKeys('i18n.WireTransfer.AddressLine2', false);
                beneficiaryDetailsScope.lblAddressField3.text = presenter.renderI18nKeys('i18n.TransfersEur.City', false);
                beneficiaryDetailsScope.lblAddressField4.text = presenter.renderI18nKeys('i18n.common.state', false);
                beneficiaryDetailsScope.lblAddressField5.text = presenter.renderI18nKeys('i18n.WireTransfer.Country', false);
                beneficiaryDetailsScope.lblAddressField6.text = presenter.renderI18nKeys('i18n.common.zipcode', false);
                beneficiaryDetailsScope.flxBeneficiaryNameSwiftTag.setVisibility(false);
                beneficiaryDetailsScope.flxAddressField1SwiftTag.setVisibility(false);
                beneficiaryDetailsScope.flxAddressField2SwiftTag.setVisibility(false);
                beneficiaryDetailsScope.flxAddressField3SwiftTag.setVisibility(false);
                beneficiaryDetailsScope.flxAddressField4SwiftTag.setVisibility(false);
                beneficiaryDetailsScope.flxAddressField5SwiftTag.setVisibility(false);
                beneficiaryDetailsScope.flxAddressField6SwiftTag.setVisibility(false);
                beneficiaryDetailsScope.flxBeneficiaryNameContainer.left = '0dp';
                beneficiaryDetailsScope.flxAddressField1Container.left = '0dp';
                beneficiaryDetailsScope.flxAddressField2Container.left = '0dp';
                beneficiaryDetailsScope.flxAddressField3Container.left = '0dp';
                beneficiaryDetailsScope.flxAddressField5Container.left = '0dp';
                beneficiaryDetailsScope.flxAddressField6Container.left = '20dp';
                beneficiaryDetailsScope.flxAddressField4Container.left = '20dp';
                beneficiaryDetailsScope.tbxAddressField3.restrictCharactersSet =  specialCharactersSet;
                beneficiaryDetailsScope.tbxAddressField4.restrictCharactersSet =  specialCharactersSet;
                beneficiaryDetailsScope.tbxAddressField5.restrictCharactersSet =  specialCharactersSet;
                beneficiaryDetailsScope.tbxAddressField6.restrictCharactersSet = alphabetsSet + specialCharactersSet.replace('-', '');
                beneficiaryDetailsScope.tbxBeneficiaryName.skin = 'sknTxtBrodere0e0e0';
                beneficiaryDetailsScope.tbxAddressField1.skin = 'sknTxtBrodere0e0e0';
                beneficiaryDetailsScope.tbxAddressField2.skin = 'sknTxtBrodere0e0e0';
                beneficiaryDetailsScope.tbxAddressField3.skin = 'sknTxtBrodere0e0e0';
                beneficiaryDetailsScope.tbxAddressField4.skin = 'sknTxtBrodere0e0e0';
                beneficiaryDetailsScope.tbxAddressField5.skin = 'sknTxtBrodere0e0e0';
                beneficiaryDetailsScope.tbxAddressField6.skin = 'sknTxtBrodere0e0e0';
                beneficiaryDetailsScope.lblBeneficiaryAddress.skin = 'ICSknlbl424242SSP15pxSemibold'
                beneficiaryDetailsScope.tbxBeneficiaryName.width = '315px';
                beneficiaryDetailsScope.tbxAddressField1.width = '315px';
                beneficiaryDetailsScope.tbxAddressField2.width = '315px';
                beneficiaryDetailsScope.tbxAddressField3.width = '315px';
                beneficiaryDetailsScope.tbxAddressField4.width = '315px';
                beneficiaryDetailsScope.tbxAddressField5.width = '315px';
                beneficiaryDetailsScope.tbxAddressField6.width = '315px';
            } catch (err) {
                var errorObj = {
                    "method": "modifyBeneficiaryDetailsUI",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api :enableOrDisableSubmitButton
         * Call back of benificiary onRowClick
         * @arg1 : NA
         * @return : NA
         */
        enableOrDisableSubmitButton: function () {
            var scope = this;
            try {
                scope.view.forceLayout();
                scope.enableOrDisableButton()
                outwardConstants.saveDraweeForFutureRef = false;
                beneficiaryDetailsScope.lblMarkAdvisingBankCheckboxIcon.text = fontIcons.checkboxUnselected;
            } catch (err) {
                var errorObj = {
                    "method": "enableOrDisableSubmitButton",
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
                    context: backNavigation ? 'createCollection' : 'documentAndTerms',
                    data: backNavigation ? { flowType: 'draweeAndCollectingBank' } : {}
                });
            } catch (err) {
                var errorObj = {
                    "method": "navigateToAnotherForm",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        clearFields: function () {
            var scope = this;
            try {
                beneficiaryDetailsScope.lblSelectedBeneficiary.text = selectHere;
                beneficiaryDetailsScope.flxSelectedBeneficiaryDetails.setVisibility(false);
                beneficiaryDetailsScope.lblPreferableBeneficiaryOptionIcon1.text = fontIcons.radioSelected;
                beneficiaryDetailsScope.lblPreferableBeneficiaryOptionIcon1.skin = skins.radioSelected;
                beneficiaryDetailsScope.lblPreferableBeneficiaryOptionIcon2.text = fontIcons.radioUnselected;
                beneficiaryDetailsScope.flxExistingBeneficiaryDetails.setVisibility(true);
                beneficiaryDetailsScope.flxEnterBeneficiaryDetails.setVisibility(false);
                beneficiaryDetailsScope.lblMarkAdvisingBankCheckboxIcon.text = fontIcons.checkboxUnselected;
                beneficiaryCount = 0;
                // Collecting Bank Details
                widgetScope.tbxBankName.text = '';
                widgetScope.tbxSwiftOrBICCode.text = '';
                widgetScope.tbxAddressLine.text = '';
                widgetScope.tbxAddressLine2.text = '';
                widgetScope.tbxCity.text = '';
                widgetScope.tbxZipCode.text = '';
                widgetScope.tbxCountry.text = '';
                widgetScope.tbxState.text = '';
                scope.enableOrDisableButton();
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
                    scope.gatherUserInputData();
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

        zipCodeValidation: function (inputTbxRef) {
            var scope = this;
            try {
                let maxChars = 9;
                !regExAllowNoHyphenSpace.test(inputTbxRef.text) && (inputTbxRef.text = '');
                inputTbxRef.text.length > maxChars && (inputTbxRef.text = inputTbxRef.text.substr(0, maxChars));
                scope.enableOrDisableButton();
            } catch (err) {
                var errorObj = {
                    "method": "zipCodeValidation",
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