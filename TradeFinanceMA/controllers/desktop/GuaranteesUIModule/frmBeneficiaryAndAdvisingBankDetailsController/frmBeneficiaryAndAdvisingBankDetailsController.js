define(['FormControllerUtility'], function (FormControllerUtility) {
  const responsiveUtils = new ResponsiveUtils();
  let beneficiaries = [];
  let beneficiaryIndex = 0;
  let beneficiaryCount = 0;
  let isdataValid;
  return {
    /**
     * Sets the initial actions for form
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.initFormActions();
      this.initSwiftTags();
      this.restrictCharacters();
    },
    onBreakpointChange: function (form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },
    /**
     * Performs the actions required before rendering form
     */
    preShow: function () {
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
      this.view.customheadernew.forceCloseHamburger();
      this.view.customheadernew.activateMenu("TradeFinance", "Guarantees");
    },
    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(false);
      this.view.flxSwiftLookUp.setVisibility(false);
      this.view.flxDialogs.setVisibility(false);
      this.view.flxLocalCodeInfo.setVisibility(false);
      this.view.lblHeading.text = this.presenter.guaranteeData.isReviseFlow ? kony.i18n.getLocalizedString('i18n.TradeFinance.issuedGtAndSblcReviseRequest') : kony.i18n.getLocalizedString('i18n.TradeFinance.createGuaranteeNewRequest');
      let roadmapData = [];
      for (const key in this.presenter.guaranteeRoadmap) {
        roadmapData.push({
          'currentRow': key === 'beneficiaryAndAdvisingBankDetails',
          'rowLabel': this.presenter.guaranteeRoadmap[key],
          'rowStatus': this.presenter.guaranteeData[key] === 'done' ? 'done' : key === 'beneficiaryAndAdvisingBankDetails' ? 'Inprogress' : 'Incomplete'
        });
      }
      this.view.ProgressTracker.setData(roadmapData);
      this.presenter.getBeneficiaries(this.view.id);
      if (this.presenter.guaranteeData.beneficiaryAndAdvisingBankDetails !== 'done') {
        this.resetForm();
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
      if (viewModel.swiftCodes) {
        this.populateSwiftCodes(viewModel.swiftCodes);
      }
      if (viewModel.beneficiaries) {
        beneficiaries = viewModel.beneficiaries;
        this.constructBeneficiarySegmentData();
        if (this.presenter.guaranteeData.beneficiaryAndAdvisingBankDetails !== 'done') {
          if (this.presenter.guaranteeData.status) {
            this.preFillData();
          } else {
            this.addBeneficiaryDetails();
          }
        }
      }
      if (viewModel.guaranteesSRMSId) {
        this.showSuccessMessage(viewModel);
      }
      if (viewModel.serverError) {
        this.showServerError(viewModel.serverError);
      }
    },
    /**
     * Method to initialise form actions
     */
    initFormActions: function () {
      const scope = this;
      this.presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesUIModule' });
      this.view.Popup.flxCross.onClick = this.togglePopup.bind(this, false);
      this.view.flxErrorClose.onClick = () => scope.view.flxErrorMessage.setVisibility(false);
      this.view.lblClear.onTouchEnd = this.togglePopup.bind(this, true, 'clearDetails');
      this.view.lblSave.onTouchEnd = this.togglePopup.bind(this, true, 'saveDraft');
      this.view.btnClose.onClick = this.togglePopup.bind(this, true, 'saveOrDeleteDraft');
      this.view.btnLookUp.onClick = this.toggleSwiftLookUp.bind(this, true);
      this.view.lblCross.onTouchEnd = this.toggleSwiftLookUp.bind(this, false);
      this.view.btnSearch.onClick = this.searchSwiftCode;
      this.view.btnBack.onClick = this.navigateBack;
      this.view.btnSubmit.onClick = this.submitDetails;
      this.view.btnAddAdditionalBeneficiary.onClick = this.addBeneficiaryDetails;
      this.view.tbxLookUpField1.onTextChange = this.enableOrDisableSearchButton;
      this.view.tbxLookUpField2.onTextChange = this.enableOrDisableSearchButton;
      this.view.tbxLookUpField3.onTextChange = this.enableOrDisableSearchButton;
      this.view.tbxLookUpField4.onTextChange = this.enableOrDisableSearchButton;
      this.view.imgLocalCodeInfo.onTouchEnd = () => scope.view.flxLocalCodeInfo.setVisibility(true);
      this.view.lblCloseLocalCodeInfo.onTouchEnd = () => scope.view.flxLocalCodeInfo.setVisibility(false);
    },
    togglePopup: function (visibility, flow, data) {
      if (visibility) {
        this.view.Popup.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
        this.view.Popup.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
        this.view.Popup.btnNo.onClick = this.togglePopup.bind(this, false);
        switch (flow) {
          case 'clearDetails':
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TransfersEur.clear");
            this.view.Popup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AreYouSureYouWantToClearThe") + kony.i18n.getLocalizedString("i18n.TradeFinance.beneficiary&AdvisingBankDetails") + '?';
            this.view.Popup.btnYes.onClick = this.resetForm;
            break;
          case 'saveDraft':
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SaveDraft");
            this.view.Popup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AreYouSureYouWantToSaveThisDraft");
            this.view.Popup.btnYes.onClick = this.saveDraft.bind(this, flow);
            break;
          case 'saveOrDeleteDraft':
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.close");
            this.view.Popup.lblPopupMessage.text = this.presenter.guaranteeData.guaranteesSRMSId ? kony.i18n.getLocalizedString("i18n.TradeFinance.SaveOrDeleteLetterOfCredit") : kony.i18n.getLocalizedString("i18n.TradeFinance.saveThisRequestAsDraftOrClose");
            this.view.Popup.btnYes.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SaveasDraft&Close");
            this.view.Popup.btnNo.text = this.presenter.guaranteeData.guaranteesSRMSId ? kony.i18n.getLocalizedString("kony.mb.Messages.DeletePermanently") : kony.i18n.getLocalizedString("i18n.TradeFinance.closeWithoutSaving");
            this.view.Popup.btnYes.onClick = this.saveDraft.bind(this, flow);
            this.view.Popup.btnNo.onClick = this.deletePermanently;
            break;
          case 'deleteBeneficiary':
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount");
            this.view.Popup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.deletePopupMessage");
            this.view.Popup.btnYes.onClick = this.deleteBeneficiaryDetails.bind(this, data);
            break;
        }
        this.view.Popup.btnYes.toolTip = this.view.Popup.btnYes.text;
        this.view.Popup.btnNo.toolTip = this.view.Popup.btnNo.text;
      }
      this.view.flxDialogs.setVisibility(visibility);
      this.view.flxPopup.setVisibility(visibility);
      this.view.forceLayout();
    },
    showSuccessMessage: function (viewModel) {
      this.view.flxFormContent.setContentOffset({ x: "0%", y: "0%" }, true);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(true);
      this.view.lblTransactionReferenceValue.text = viewModel.guaranteesSRMSId;
      this.view.forceLayout();
    },
    showServerError: function (errorMsg) {
      if (errorMsg) {
        this.view.flxFormContent.setContentOffset({ x: "0%", y: "0%" }, true);
        this.view.flxErrorMessage.setVisibility(true);
        this.view.flxSuccessMessage.setVisibility(false);
        this.view.lblErrorMessage.text = errorMsg;
        this.view.flxSwiftLookUp.setVisibility(false);
        this.view.forceLayout();
      }
    },
    toggleSwiftLookUp: function (visibility) {
      if (visibility) {
        for (let i = 1; i <= 4; i++) {
          this.view['tbxLookUpField' + i].text = "";
        }
        this.view.segSwiftCodeList.removeAll();
        FormControllerUtility.disableButton(this.view.btnSearch);
      }
      this.view.flxSwiftLookUp.setVisibility(visibility);
      this.view.forceLayout();
    },
    searchSwiftCode: function () {
      const payload = {
        bankName: this.view.tbxLookUpField1.text,
        branchName: this.view.tbxLookUpField2.text,
        country: this.view.tbxLookUpField3.text,
        city: this.view.tbxLookUpField4.text
      };
      this.presenter.getSwiftBicCodes(payload, this.view.id);
    },
    populateSwiftCodes: function (swiftCodes) {
      const scope = this;
      this.view.segSwiftCodeList.widgetDataMap = {
        "flxSwiftLookupRecordList": "flxSwiftLookupRecordList",
        "lblValue1": "lblValue1",
        "lblValue2": "lblValue2",
        "lblValue3": "lblValue3"
      };
      let segData = [];
      for (const swiftCode of swiftCodes) {
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
      this.view.segSwiftCodeList.setData(segData);
    },
    setSelectedSwiftData: function () {
      const index = arguments[3].rowIndex;
      const data = this.view.segSwiftCodeList.data[index];
      this.view.tbxSwiftCode.text = data.bic || '';
      this.view.tbxBankName.text = data.bankName || '';
      this.view.tbxBankAddressField1.text = data.bankAddress ? data.bankAddress.split(',')[0] : '';
      this.view.tbxBankAddressField2.text = data.bankAddress ? data.bankAddress.split(',')[1] : '';
      this.view.tbxBankAddressField3.text = data.city || '';
      this.view.tbxBankAddressField4.text = data.state || '';
      this.view.tbxBankAddressField5.text = data.country || '';
      this.view.tbxBankAddressField6.text = data.zipcode || '';
      this.toggleSwiftLookUp(false);
    },
    navigateBack: function () {
      this.presenter.showView({ form: 'frmTransactionDetails' });
    },
    getFormData: function () {
      let formData = {};
      const beneficiaryDetails = this.getSelectedBeneficiaries();
      let beneficiariesToSave = JSON.parse(JSON.stringify(beneficiaryDetails));
      beneficiariesToSave = beneficiariesToSave.filter(x => x.saveBeneficiary)
        .map(y => {
          delete y.saveBeneficiary;
          delete y.isCorporate;
          return y;
        });
      formData['beneficiaryDetails'] = JSON.stringify(beneficiaryDetails);
      formData['beneficiariesToSave'] = beneficiariesToSave;
      formData['swiftCode'] = this.view.tbxSwiftCode.text;
      formData['bankName'] = this.view.tbxBankName.text;
      formData['iban'] = this.view.tbxIban.text;
      formData['localCode'] = this.view.tbxLocalCode.text;
      formData['bankAddress1'] = this.view.tbxBankAddressField1.text;
      formData['bankAddress2'] = this.view.tbxBankAddressField2.text;
      formData['bankCity'] = this.view.tbxBankAddressField3.text;
      formData['bankState'] = this.view.tbxBankAddressField4.text;
      formData['bankCountry'] = this.view.tbxBankAddressField5.text;
      formData['bankZipCode'] = this.view.tbxBankAddressField6.text;
      return formData;
    },
    saveDraft: function (flow) {
      this.togglePopup(false);
      const formData = this.getFormData();
      this.presenter.saveGuarantee(formData, this.view.id, flow);
    },
    deletePermanently: function () {
      this.togglePopup(false);
      if (this.presenter.guaranteeData.guaranteesSRMSId) {
        this.presenter.deleteGuarantee(this.view.id);
      } else {
        this.presenter.showGuaranteesScreen({ context: 'viewGuarantees' });
      }
    },
    submitDetails: function () {
      const formData = this.getFormData();
      this.presenter.storeGuaranteeData('beneficiaryAndAdvisingBankDetails', formData);
    },
    enableOrDisableSubmitButton: function () {
      const formData = this.getFormData();
      if (!formData['beneficiaryDetails'] || JSON.parse(formData['beneficiaryDetails']).length === 0 || JSON.parse(formData['beneficiaryDetails']).length !== beneficiaryCount || !isdataValid) {
        FormControllerUtility.disableButton(this.view.btnSubmit);
      } else {
        FormControllerUtility.enableButton(this.view.btnSubmit);
      }
    },
    resetForm: function () {
      for (let i = 1; i <= beneficiaryIndex; i++) {
        if (!this.view['B' + i + 'BeneficiaryDetails']) continue;
        this.view.flxBeneficiaryDetails.remove(this.view['B' + i + 'BeneficiaryDetails']);
      }
      beneficiaryIndex = 0;
      beneficiaryCount = 0;
      this.view.btnAddAdditionalBeneficiary.setVisibility(beneficiaryCount < this.presenter.guaranteeConfig.beneficiariesLimit);
      this.view.tbxSwiftCode.text = '';
      this.view.tbxBankName.text = '';
      this.view.tbxIban.text = '';
      this.view.tbxLocalCode.text = '';
      this.view.tbxBankAddressField1.text = '';
      this.view.tbxBankAddressField2.text = '';
      this.view.tbxBankAddressField3.text = '';
      this.view.tbxBankAddressField4.text = '';
      this.view.tbxBankAddressField5.text = '';
      this.view.tbxBankAddressField6.text = '';
      this.togglePopup(false);
    },
    constructBeneficiarySegmentData: function () {
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
    },
    groupBeneficiaryData: function (data) {
      return data.reduce(function (acc, obj) {
        (acc[obj['payeeType']] = acc[obj['payeeType']] || []).push(obj);
        return acc;
      }, {});
    },
    addBeneficiaryDetails: function () {
      beneficiaryIndex++;
      beneficiaryCount++;
      this.view.btnAddAdditionalBeneficiary.setVisibility(beneficiaryCount < this.presenter.guaranteeConfig.beneficiariesLimit);
      this.view.flxBeneficiaryDetails.add(this.view.BeneficiaryDetails.clone('B' + beneficiaryIndex));
      const filteredBeneficiaries = this.getFilteredBeneficiaries();
      const newBeneficiary = this.view['B' + beneficiaryIndex + 'BeneficiaryDetails'];
      newBeneficiary.setVisibility(true);
      newBeneficiary.zIndex = 50 - beneficiaryIndex;
      newBeneficiary.lblMarkAdvisingBankCheckboxIcon.onTouchEnd = this.markAsAdvisingBank.bind(this, beneficiaryIndex);
      newBeneficiary.btnDelete.onClick = this.togglePopup.bind(this, true, 'deleteBeneficiary', newBeneficiary);
      newBeneficiary.setData(filteredBeneficiaries);
      newBeneficiary.showOrHideSwiftTags(scope_configManager.swiftEnabled === 'True');
      for (let i = 1, j = 1; i <= beneficiaryIndex; i++) {
        if (!this.view['B' + i + 'BeneficiaryDetails']) continue;
        this.view['B' + i + 'BeneficiaryDetails'].lblBeneficiaryHeading.text = kony.i18n.getLocalizedString('i18n.TradeFinance.Beneficiary') + ' ' + j++;
        this.view['B' + i + 'BeneficiaryDetails'].btnDelete.setVisibility(beneficiaryCount > 1);
      }
      this.view.forceLayout();
      this.enableOrDisableSubmitButton();
    },
    deleteBeneficiaryDetails: function (beneficiaryRef) {
      this.view.flxBeneficiaryDetails.remove(beneficiaryRef);
      beneficiaryCount--;
      this.view.btnAddAdditionalBeneficiary.setVisibility(beneficiaryCount < this.presenter.guaranteeConfig.beneficiariesLimit);
      for (let i = 1, j = 1; i <= beneficiaryIndex; i++) {
        if (!this.view['B' + i + 'BeneficiaryDetails']) continue;
        this.view['B' + i + 'BeneficiaryDetails'].lblBeneficiaryHeading.text = kony.i18n.getLocalizedString('i18n.TradeFinance.Beneficiary') + ' ' + j++;
        this.view['B' + i + 'BeneficiaryDetails'].btnDelete.setVisibility(beneficiaryCount > 1);
      }
      this.togglePopup(false);
      this.view.forceLayout();
      this.enableOrDisableSubmitButton();
    },
    getSelectedBeneficiaries: function () {
      let selectedBeneficiaries = [];
      isdataValid = true;
      for (let i = 1; i <= beneficiaryIndex; i++) {
        const benefRef = this.view['B' + i + 'BeneficiaryDetails'];
        if (!benefRef) continue;
        const data = benefRef.getData();
        data && selectedBeneficiaries.push(data);
        if (benefRef.flxEnterBeneficiaryDetails.isVisible && benefRef.lblExistingBeneficiaryWarning.isVisible) {
          isdataValid = false;
        }
      }
      return selectedBeneficiaries;
    },
    getFilteredBeneficiaries: function () {
      let filteredBeneficiaries = JSON.parse(JSON.stringify(beneficiaries));
      for (let i = 1; i <= beneficiaryIndex; i++) {
        if (!this.view['B' + i + 'BeneficiaryDetails']) continue;
        const selectedIdx = this.view['B' + i + 'BeneficiaryDetails'].segBeneficiaryList.selectedRowIndex;
        if (selectedIdx) {
          filteredBeneficiaries[selectedIdx[0]][1][selectedIdx[1]]['flxBeneficiaryList']['skin'] = 'slFboxBGf8f7f8B0';
        }
      }
      return filteredBeneficiaries;
    },
    markAsAdvisingBank: function (idx) {
      for (let i = 1; i <= beneficiaryIndex; i++) {
        if (!this.view['B' + i + 'BeneficiaryDetails']) continue;
        if (i === idx && this.view['B' + i + 'BeneficiaryDetails'].lblMarkAdvisingBankCheckboxIcon.text === this.presenter.resourcesConstants.fontIcons.checkboxUnselected) {
          this.view['B' + i + 'BeneficiaryDetails'].lblMarkAdvisingBankCheckboxIcon.text = this.presenter.resourcesConstants.fontIcons.checkboxSelected;
        } else {
          this.view['B' + i + 'BeneficiaryDetails'].lblMarkAdvisingBankCheckboxIcon.text = this.presenter.resourcesConstants.fontIcons.checkboxUnselected;
        }
      }
      const beneficiaryData = this.view['B' + idx + 'BeneficiaryDetails'].segBeneficiaryList.selectedRowItems[0];
      this.view.tbxSwiftCode.text = beneficiaryData.swiftCode || '';
      this.view.tbxBankName.text = beneficiaryData.bankName || '';
      this.view.tbxIban.text = beneficiaryData.IBAN || '';
      this.view.tbxLocalCode.text = beneficiaryData.localCode || '';
      this.view.tbxBankAddressField1.text = beneficiaryData.addressLine1 || '';
      this.view.tbxBankAddressField2.text = beneficiaryData.addressLine2 || '';
      this.view.tbxBankAddressField3.text = beneficiaryData.city || '';
      this.view.tbxBankAddressField4.text = beneficiaryData.state || '';
      this.view.tbxBankAddressField5.text = beneficiaryData.country || '';
      this.view.tbxBankAddressField6.text = beneficiaryData.zipcode || '';
    },
    preFillData: function () {
      const guaranteeData = this.presenter.guaranteeData;
      if (guaranteeData.beneficiaryDetails) {
        const beneficiaryDetails = JSON.parse(guaranteeData.beneficiaryDetails.replace(/'/g, '"'));
        for (let i = 0; i < beneficiaryDetails.length; i++) {
          this.addBeneficiaryDetails();
          this.view['B' + (+i + 1) + 'BeneficiaryDetails'].preFillData(beneficiaryDetails[i]);
        }
      }
      else this.addBeneficiaryDetails();
      this.view.tbxSwiftCode.text = guaranteeData.swiftCode || '';
      this.view.tbxBankName.text = guaranteeData.bankName || '';
      this.view.tbxIban.text = guaranteeData.iban || '';
      this.view.tbxLocalCode.text = guaranteeData.localCode || '';
      this.view.tbxBankAddressField1.text = guaranteeData.bankAddress1 || '';
      this.view.tbxBankAddressField2.text = guaranteeData.bankAddress2 || '';
      this.view.tbxBankAddressField3.text = guaranteeData.bankCity || '';
      this.view.tbxBankAddressField4.text = guaranteeData.bankState || '';
      this.view.tbxBankAddressField5.text = guaranteeData.bankCountry || '';
      this.view.tbxBankAddressField6.text = guaranteeData.bankZipCode || '';
      this.enableOrDisableSubmitButton();
    },
    initSwiftTags: function () {
      const guaranteeSwiftTags = applicationManager.getConfigurationManager().guaranteeSwiftTags;
      if (scope_configManager.swiftEnabled === 'True') {
        this.view.flxSwiftCodeSwiftTag.setVisibility(true);
        this.view.flxSwiftCodeContainer.left = "40dp";
        this.view.flxBankNameSwiftTag.setVisibility(true);
        this.view.flxBankNameContainer.left = "40dp";
        this.view.flxIbanSwiftTag.setVisibility(true);
        this.view.flxIbanContainer.left = "40dp";
        this.view.flxLocalCodeSwiftTag.setVisibility(true);
        this.view.flxLocalCodeContainer.left = "40dp";
        for (let i = 1; i <= 6; i++) {
          this.view['flxBankAddressField' + i + 'SwiftTag'].setVisibility(true);
          this.view['flxBankAddressField' + i + 'Container'].left = "40dp";
        }
        this.view.lblSwiftCodeSwiftTag.text = guaranteeSwiftTags.swiftCode || 'NA';
        this.view.lblBankNameSwiftTag.text = guaranteeSwiftTags.advisingBankName || 'NA';
        this.view.lblIbanSwiftTag.text = guaranteeSwiftTags.iban || 'NA';
        this.view.lblLocalCodeSwiftTag.text = guaranteeSwiftTags.countrySpecificCode || 'NA';
        this.view.lblBankAddressField1SwiftTag.text = guaranteeSwiftTags.advisingBankAddress || 'NA';
        this.view.lblBankAddressField2SwiftTag.text = guaranteeSwiftTags.advisingBankAddress || 'NA';
        this.view.lblBankAddressField3SwiftTag.text = guaranteeSwiftTags.advisingBankCity || 'NA';
        this.view.lblBankAddressField4SwiftTag.text = guaranteeSwiftTags.advisingBankState || 'NA';
        this.view.lblBankAddressField5SwiftTag.text = guaranteeSwiftTags.advisingBankCountry || 'NA';
        this.view.lblBankAddressField6SwiftTag.text = guaranteeSwiftTags.advisingBankZipCode || 'NA';
      } else {
        this.view.flxSwiftCodeSwiftTag.setVisibility(false);
        this.view.flxSwiftCodeContainer.left = "0dp";
        this.view.flxBankNameSwiftTag.setVisibility(false);
        this.view.flxBankNameContainer.left = "0dp";
        this.view.flxIbanSwiftTag.setVisibility(false);
        this.view.flxIbanContainer.left = "0dp";
        this.view.flxLocalCodeSwiftTag.setVisibility(false);
        this.view.flxLocalCodeContainer.left = "0dp";
        for (let i = 1; i <= 6; i++) {
          this.view['flxBankAddressField' + i + 'SwiftTag'].setVisibility(false);
          this.view['flxBankAddressField' + i + 'Container'].left = "0dp";
        }
      }
      this.view.forceLayout();
    },
    enableOrDisableSearchButton: function () {
      if (this.view.tbxLookUpField1.text || this.view.tbxLookUpField2.text || this.view.tbxLookUpField3.text || this.view.tbxLookUpField4.text) {
        FormControllerUtility.enableButton(this.view.btnSearch);
      } else {
        FormControllerUtility.disableButton(this.view.btnSearch);
      }
    },
    restrictCharacters: function () {
      const specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
      this.view.tbxSwiftCode.restrictCharactersSet = specialCharactersSet;
      this.view.tbxIban.restrictCharactersSet = specialCharactersSet;
      this.view.tbxLocalCode.restrictCharactersSet = specialCharactersSet;
      this.view.tbxBankAddressField3.restrictCharactersSet = specialCharactersSet;
      this.view.tbxBankAddressField4.restrictCharactersSet = specialCharactersSet;
      this.view.tbxBankAddressField5.restrictCharactersSet = specialCharactersSet;
      this.view.tbxBankAddressField6.restrictCharactersSet = specialCharactersSet;
    }
  };
});
