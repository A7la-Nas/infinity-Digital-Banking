define(["FormControllerUtility", "CommonUtilities"], function (FormControllerUtility, CommonUtilities) {
  const responsiveUtils = new ResponsiveUtils();
  let contracts = [];
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
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ["flxHeader", "flxFooter",]);
      this.view.customheadernew.forceCloseHamburger();
      this.view.customheadernew.activateMenu("TradeFinance", "Guarantees");
      this.view.flxLGCopyDetailsContainer.doLayout = CommonUtilities.centerPopupFlex;
    },
    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(false);
      this.view.DateInputLookUpField2.tbxDateInputKA.onEndEditing = this.validateDate.bind(this, this.view.DateInputLookUpField2);
      this.view.lblHeading.text = this.presenter.guaranteeData.isReviseFlow ? kony.i18n.getLocalizedString('i18n.TradeFinance.issuedGtAndSblcReviseRequest') : kony.i18n.getLocalizedString('i18n.TradeFinance.createGuaranteeNewRequest');
      let roadmapData = [];
      for (const key in this.presenter.guaranteeRoadmap) {
        roadmapData.push({
          'currentRow': key === 'productDetails',
          'rowLabel': this.presenter.guaranteeRoadmap[key],
          'rowStatus': this.presenter.guaranteeData[key] === 'done' ? 'done' : key === 'productDetails' ? 'Inprogress' : 'Incomplete'
        });
      }
      roadmapData['showCopyDetails'] = true;
      this.view.ProgressTracker.setData(roadmapData);
      if (this.presenter.guaranteeData.productDetails !== 'done') {
        this.resetForm();
        this.setProductTypes();
        this.setTransactionModes();
        this.setDropdownValues(this.view.segBillType, this.presenter.guaranteeConfig.guaranteeAndSBLCTypes, this.view.flxSegBillType);
        this.setDropdownValues(this.view.segLookUpField3, this.presenter.guaranteeConfig.productTypes, this.view.flxLookUpField3List);
        this.setDropdownValues(this.view.segLookUpField4, this.presenter.guaranteeConfig.guaranteeAndSBLCTypes, this.view.flxLookUpField4List);
        this.presenter.getContractDetails(this.view.id);
      }
      if (this.presenter.guaranteeData.status) {
        this.preFillData();
      }
    },
    /**
     * Method to initialise form actions
     */
    initFormActions: function () {
      const scope = this;
      this.view.btnSubmit.onClick = this.submitDetails;
      this.presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesUIModule' });
      scope.view.segBillType.onRowClick = this.segRowClick.bind(this, this.view.segBillType, this.view.lblValueBillType, this.view.flxSegBillType, this.view.lblBillTypeDropdown);
      scope.view.segInstructingParty.onRowClick = this.segRowClick.bind(this, this.view.segInstructingParty, this.view.lblValueInstructingParty, this.view.flxSegInstructingParty, this.view.lblInsuringPartyDropdown);
      scope.view.segApplicantParty.onRowClick = this.segRowClick.bind(this, this.view.segApplicantParty, this.view.lblValueApplicantParty, this.view.flxSegApplicantParty, this.view.lblApplicantPartyDropdown);
      this.view.segLookUpField3.onRowClick = this.segRowClick.bind(this, this.view.segLookUpField3, this.view.lblSelectedLookUpField3, this.view.flxLookUpField3List, this.view.lblLookUpField3DropdownIcon);
      this.view.segLookUpField4.onRowClick = this.segRowClick.bind(this, this.view.segLookUpField4, this.view.lblSelectedLookUpField4, this.view.flxLookUpField4List, this.view.lblLookUpField4DropdownIcon);
      this.view.flxValueBillType.onClick = this.toggleDropdown.bind(this, this.view.flxSegBillType, this.view.lblBillTypeDropdown);
      this.view.flxValueInstructingParty.onClick = this.toggleDropdown.bind(this, this.view.flxSegInstructingParty, this.view.lblInsuringPartyDropdown);
      this.view.flxValueApplicantParty.onClick = this.toggleDropdown.bind(this, this.view.flxSegApplicantParty, this.view.lblApplicantPartyDropdown);
      this.view.flxLookUpField3Dropdown.onClick = this.toggleDropdown.bind(this, this.view.flxLookUpField3List, this.view.lblLookUpField3DropdownIcon);
      this.view.flxLookUpField4Dropdown.onClick = this.toggleDropdown.bind(this, this.view.flxLookUpField4List, this.view.lblLookUpField4DropdownIcon);
      this.view.lblProductTypeOptionIcon1.onTouchEnd = this.toggleProductTypeOption.bind(this, 1);
      this.view.lblProductTypeOptionIcon2.onTouchEnd = this.toggleProductTypeOption.bind(this, 2);
      this.view.lblTransactionModeOptionIcon1.onTouchEnd = this.toggleTransactionModeOption.bind(this, 1);
      this.view.lblTransactionModeOptionIcon2.onTouchEnd = this.toggleTransactionModeOption.bind(this, 2);
      this.view.lblClear.onTouchEnd = this.togglePopup.bind(this, true, "clearDetails");
      this.view.lblSave.onTouchEnd = this.togglePopup.bind(this, true, "saveDraft");
      this.view.btnClose.onClick = this.togglePopup.bind(this, true, "saveOrDeleteDraft");
      this.view.Popup.flxCross.onClick = this.togglePopup.bind(this, false);
      this.view.flxErrorClose.onClick = () => scope.view.flxErrorMessage.setVisibility(false);
      this.view.lblLookUp.onTouchEnd = this.toggleTransactionReferenceLookUp.bind(this, true);
      this.view.lblCross.onTouchEnd = this.toggleTransactionReferenceLookUp.bind(this, false);
      this.view.btnSearch.onClick = this.searchTransactionReference;
      this.view.tbxReference.onEndEditing = this.enableOrDisableSubmitButton;
      this.view.ProgressTracker.lblCoptyStatus.onTouchEnd = this.toggleLGCopyDetailsPopup.bind(this, true);
      this.view.LGCopyDetails.flxClose.onClick = this.toggleLGCopyDetailsPopup.bind(this, false);
      this.view.LGCopyDetails.btnClose.onClick = this.toggleLGCopyDetailsPopup.bind(this, false);
      this.view.LGCopyDetails.btnCopyDetails.onClick = this.copyLGDetails;
      this.view.tbxLookUpField1.onTextChange = this.enableOrDisableSearchButton;
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
      if (viewModel.GuaranteesLC) {
        if (this.view.flxTransactionReferenceLookUp.isVisible) {
          this.populateTransactionReferences(viewModel.GuaranteesLC);
        } else {
          this.view.LGCopyDetails.setData(viewModel.GuaranteesLC,'issuedGuaranteeAmedment');
        }
      }
      if (viewModel.contracts) {
        contracts = viewModel.contracts;
        this.setInstructingPartyDropdownValues();
        if (this.presenter.guaranteeData.status) {
          this.preFillPartyDetails();
        }
      }
      if (viewModel.guaranteesSRMSId) {
        this.showSuccessMessage(viewModel);
      }
      if (viewModel.serverError) {
        this.showServerError(viewModel.serverError);
      }
    },
    setProductTypes: function () {
      let i = 1;
      for (const [key, value] of Object.entries(this.presenter.guaranteeConfig.productTypes)) {
        this.view['flxProductTypeOption' + i].setVisibility(true);
        this.view['lblProductTypeOptionIcon' + i].key = key;
        this.view['lblProductTypeOption' + i].text = value;
        i++;
      }
      while (i <= 2) {
        this.view['flxProductTypeOption' + i].setVisibility(false);
      }
    },
    setTransactionModes: function () {
      let i = 1;
      for (const [key, value] of Object.entries(this.presenter.guaranteeConfig.transactionModes)) {
        this.view['flxTransactionModeOption' + i].setVisibility(true);
        this.view['lblTransactionModeOptionIcon' + i].key = key;
        this.view['lblTransactionModeOption' + i].text = value;
        i++;
      }
      while (i <= 2) {
        this.view['flxTransactionModeOption' + i].setVisibility(false);
      }
    },
    /*
     * Sets the data to the dropdown Segment
     */
    setDropdownValues: function (seg, listValues, flxList) {
      var segmentData = [];
      if (listValues) {
        seg.widgetDataMap = {
          lblListValue: 'value',
          selectedKey: 'key',
        };
        for (const key in listValues) {
          segmentData.push({
            key: key,
            value: {
              text: listValues[key],
              toolTip: listValues[key]
            }
          });
        }
        seg.setData(segmentData);
      }
      flxList.height = (segmentData.length * 41 > 205) ? "205dp" : `${segmentData.length * 41}dp`;
    },
    segRowClick: function (segDropdown, lblSelectedValue, flxSegDropdown, lblDropdownIcon) {
      const data = segDropdown.selectedRowItems[0];
      lblSelectedValue.text = data.value.text;
      if (lblSelectedValue.text === kony.i18n.getLocalizedString('i18n.common.selecthere')) {
        lblSelectedValue.toolTip = "";
        lblSelectedValue.skin = "sknLblSSP72727215px";
      } else {
        lblSelectedValue.toolTip = data.value.toolTip;
        lblSelectedValue.skin = "sknLblSSP15pxtrucation";
      }
      flxSegDropdown.setVisibility(false);
      lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      if (segDropdown.id === 'segInstructingParty') {
        this.view.segApplicantParty.selectedRowIndex = null;
        this.view.lblValueApplicantParty.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
        let applicantSegData = [{ value: { text: kony.i18n.getLocalizedString('i18n.common.selecthere') } }];
        contracts.filter(contract => contract.contractId === data.contractId)[0].contractCustomers.forEach(customer => {
          applicantSegData.push({
            contractId: data.contractId,
            coreCustomerId: customer.coreCustomerId,
            coreCustomerName: customer.coreCustomerName,
            value: {
              text: `${customer.coreCustomerName} - ${customer.coreCustomerId}`,
              toolTip: `${customer.coreCustomerName} - ${customer.coreCustomerId}`
            }
          });
        });
        this.view.segApplicantParty.widgetDataMap = {
          lblListValue: 'value'
        };
        this.view.segApplicantParty.setData(applicantSegData);
        this.view.flxSegApplicantParty.height = (applicantSegData.length * 41 > 205) ? "205dp" : `${applicantSegData.length * 41}dp`;
      }
      if (segDropdown.id === 'segLookUpField3' || segDropdown.id === 'segLookUpField4') {
        this.enableOrDisableSearchButton();
        return;
      }
      this.enableOrDisableSubmitButton();
    },
    toggleTransactionModeOption: function (idx) {
      for (let i = 1; i <= 2; i++) {
        if (i === idx) {
          this.view['lblTransactionModeOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioSelected;
          this.view['lblTransactionModeOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioSelected;
          this.view.flxPartyDetails.setVisibility(this.view['lblTransactionModeOptionIcon' + i].key === 'Swift');
        } else {
          this.view['lblTransactionModeOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
          this.view['lblTransactionModeOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioUnselected;
        }
      }
      this.enableOrDisableSubmitButton();
    },
    toggleProductTypeOption: function (idx) {
      for (let i = 1; i <= 2; i++) {
        if (i === idx) {
          this.view['lblProductTypeOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioSelected;
          this.view['lblProductTypeOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioSelected;
        } else {
          this.view['lblProductTypeOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
          this.view['lblProductTypeOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioUnselected;
        }
      }
      this.enableOrDisableSubmitButton();
    },
    togglePopup: function (visibility, flow) {
      if (visibility) {
        this.view.Popup.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
        this.view.Popup.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
        this.view.Popup.btnNo.onClick = this.togglePopup.bind(this, false);
        switch (flow) {
          case "clearDetails":
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TransfersEur.clear");
            this.view.Popup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AreYouSureYouWantToClearThe") + kony.i18n.getLocalizedString("i18n.TradeFinance.productDetails") + '?';
            this.view.Popup.btnYes.onClick = this.resetForm;
            break;
          case "saveDraft":
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SaveDraft");
            this.view.Popup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AreYouSureYouWantToSaveThisDraft");
            this.view.Popup.btnYes.onClick = this.saveDraft.bind(this, flow);
            break;
          case "saveOrDeleteDraft":
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.close");
            this.view.Popup.lblPopupMessage.text = this.presenter.guaranteeData.guaranteesSRMSId ? kony.i18n.getLocalizedString("i18n.TradeFinance.SaveOrDeleteLetterOfCredit") : kony.i18n.getLocalizedString("i18n.TradeFinance.saveThisRequestAsDraftOrClose");
            this.view.Popup.btnYes.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SaveasDraft&Close");
            this.view.Popup.btnNo.text = this.presenter.guaranteeData.guaranteesSRMSId ? kony.i18n.getLocalizedString("kony.mb.Messages.DeletePermanently") : kony.i18n.getLocalizedString("i18n.TradeFinance.closeWithoutSaving");
            this.view.Popup.btnYes.onClick = this.saveDraft.bind(this, flow);
            this.view.Popup.btnNo.onClick = this.deletePermanently;
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
        this.view.flxTransactionReferenceLookUp.setVisibility(false);
        this.view.flxLGCopyDetailsPopup.setVisibility(false);
        this.view.forceLayout();
      }
    },
    toggleDropdown: function (flxDropdownList, lblDropdownIcon) {
      if (flxDropdownList.isVisible) {
        flxDropdownList.setVisibility(false);
        lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      } else {
        flxDropdownList.setVisibility(true);
        lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronUp;
      }
    },
    getFormData: function () {
      let formData = {
        'instructingPartyName': '',
        'instructingPartyId': '',
        'instructingParty': '',
        'cif': '',
        'applicantPartyName': '',
        'applicantPartyId': '',
        'applicantParty': ''
      };
      for (let i = 1; i <= 2; i++) {
        if (this.view['lblProductTypeOptionIcon' + i].text === this.presenter.resourcesConstants.fontIcons.radioSelected) {
          formData['productType'] = this.view['lblProductTypeOptionIcon' + i].key;
        }
        if (this.view['lblTransactionModeOptionIcon' + i].text === this.presenter.resourcesConstants.fontIcons.radioSelected) {
          formData['modeOfTransaction'] = this.view['lblTransactionModeOptionIcon' + i].key;
        }
      }
      formData['guaranteeAndSBLCType'] = this.view.segBillType.selectedRowIndex ? this.view.segBillType.selectedRowItems[0].key : '';
      formData['guaranteesReferenceNo'] = this.view.tbxReference.text;
      if (this.view.flxPartyDetails.isVisible) {
        if (this.view.segInstructingParty.selectedRowIndex) {
          const instructingPartyData = this.view.segInstructingParty.selectedRowItems[0];
          formData['instructingPartyName'] = instructingPartyData.coreCustomerName;
          formData['instructingPartyId'] = instructingPartyData.coreCustomerId;
          formData['instructingParty'] = instructingPartyData.value.text;
          formData['cif'] = JSON.stringify([{ contractId: instructingPartyData.contractId, coreCustomerId: instructingPartyData.coreCustomerId }]);
        }
        if (this.view.segApplicantParty.selectedRowIndex && this.view.segApplicantParty.selectedRowIndex[1] > 0) {
          const applicantPartyData = this.view.segApplicantParty.selectedRowItems[0];
          formData['applicantPartyName'] = applicantPartyData.coreCustomerName;
          formData['applicantPartyId'] = applicantPartyData.coreCustomerId;
          formData['applicantParty'] = applicantPartyData.value.text;
        }
      }
      return formData;
    },
    submitDetails: function () {
      const formData = this.getFormData();
      this.presenter.storeGuaranteeData('productDetails', formData);
    },
    toggleTransactionReferenceLookUp: function (visibility) {
      if (visibility) {
        this.view.tbxLookUpField1.text = "";
        this.view.DateInputLookUpField2.setText('');
        this.view.segLookUpField3.selectedRowIndex = null;
        this.view.lblSelectedLookUpField3.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
        this.view.lblSelectedLookUpField3.toolTip = '';
        this.view.lblSelectedLookUpField3.skin = "sknLblSSP72727215px";
        this.view.flxLookUpField3List.setVisibility(false);
        this.view.segLookUpField4.selectedRowIndex = null;
        this.view.lblSelectedLookUpField4.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
        this.view.lblSelectedLookUpField4.toolTip = '';
        this.view.lblSelectedLookUpField4.skin = "sknLblSSP72727215px";
        this.view.flxLookUpField4List.setVisibility(false);
        this.view.segTransactionReferenceList.removeAll();
        FormControllerUtility.disableButton(this.view.btnSearch);
      }
      this.view.flxTransactionReferenceLookUp.setVisibility(visibility);
      this.view.forceLayout();
    },
    searchTransactionReference: function () {
      let filterByParam = [];
      let filterByValue = [];
      if (this.view.segLookUpField3.selectedRowIndex) {
        filterByParam.push('productType');
        filterByValue.push(this.view.segLookUpField3.selectedRowItems[0].key);
      }
      if (this.view.segLookUpField4.selectedRowIndex) {
        filterByParam.push('guaranteeAndSBLCType');
        filterByValue.push(this.view.segLookUpField4.selectedRowItems[0].key);
      }
      const payload = {
        'searchString': this.view.tbxLookUpField1.text,
        'issueDate': this.view.DateInputLookUpField2.tbxDateInputKA.text,
        'filterByParam': filterByParam.join(','),
        'filterByValue': filterByValue.join(',')
      };
      this.presenter.getGuarantees(payload, this.view.id);
    },
    populateTransactionReferences: function (guarantees) {
      const scope = this;
      const NA = kony.i18n.getLocalizedString("i18n.common.NA");
      this.view.segTransactionReferenceList.widgetDataMap = {
        "flxTransactionReferenceLookup": "flxTransactionReferenceLookup",
        "lblValue1": "lblValue1",
        "lblValue2": "lblValue2",
        "lblValue3": "lblValue3",
        "lblValue4": "lblValue4",
        "lblValue5": "lblValue5"
      };
      let segData = [];
      for (const record of guarantees) {
        segData.push(Object.assign(record, {
          lblValue1: {
            text: record.guaranteesSRMSId || NA
          },
          lblValue2: {
            text: record.beneficiaryName || NA
          },
          lblValue3: {
            text: record.productType || NA
          },
          lblValue4: {
            text: record.issueDate || NA
          },
          lblValue5: {
            text: kony.i18n.getLocalizedString('i18n.NUO.Select'),
            cursorType: 'pointer',
            onTouchEnd: scope.setSelectedTransactionReference,
          },
          template: 'flxTransactionReferenceLookup'
        }));
      }
      this.view.segTransactionReferenceList.setData(segData);
    },
    setSelectedTransactionReference: function () {
      const index = arguments[3].rowIndex;
      const data = this.view.segTransactionReferenceList.data[index];
      this.view.tbxReference.text = data.guaranteesSRMSId;
      this.toggleTransactionReferenceLookUp(false);
      this.enableOrDisableSubmitButton();
    },
    resetForm: function () {
      this.view.segBillType.selectedRowIndex = null;
      this.view.lblValueBillType.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
      this.view.lblValueBillType.toolTip = '';
      this.view.lblValueBillType.skin = "sknLblSSP72727215px";
      this.view.tbxReference.text = "";
      this.view.segInstructingParty.selectedRowIndex = null;
      this.view.lblValueInstructingParty.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
      this.view.lblValueInstructingParty.toolTip = '';
      this.view.lblValueInstructingParty.skin = "sknLblSSP72727215px";
      this.view.segApplicantParty.selectedRowIndex = null;
      this.view.lblValueApplicantParty.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
      this.view.lblValueApplicantParty.toolTip = '';
      this.view.lblValueApplicantParty.skin = "sknLblSSP72727215px";
      this.view.flxSegBillType.setVisibility(false);
      this.view.lblBillTypeDropdown.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      this.view.flxSegInstructingParty.setVisibility(false);
      this.view.lblInsuringPartyDropdown.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      this.view.flxSegApplicantParty.setVisibility(false);
      this.view.lblApplicantPartyDropdown.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      this.togglePopup(false);
      this.enableOrDisableSubmitButton();
    },
    saveDraft: function (flow) {
      this.togglePopup(false);
      const formData = this.getFormData();
      this.presenter.saveGuarantee(formData, this.view.id, flow);
    },
    setInstructingPartyDropdownValues: function () {
      let segData = [];
      this.view.segInstructingParty.widgetDataMap = {
        lblListValue: "value"
      };
      contracts.forEach(contract => {
        contract.contractCustomers.forEach(customer => {
          segData.push({
            contractId: contract.contractId,
            coreCustomerId: customer.coreCustomerId,
            coreCustomerName: customer.coreCustomerName,
            value: {
              text: `${customer.coreCustomerName} - ${customer.coreCustomerId}`,
              toolTip: `${customer.coreCustomerName} - ${customer.coreCustomerId}`
            }
          });
        });
      });
      this.view.segInstructingParty.setData(segData);
      this.view.flxSegInstructingParty.height = (segData.length * 41 > 205) ? "205dp" : `${segData.length * 41}dp`;
      this.view.flxSegApplicantParty.height = "0dp";
    },
    enableOrDisableSubmitButton: function () {
      const formData = this.getFormData();
      if (!formData['productType'] || !formData['modeOfTransaction'] || !formData['guaranteeAndSBLCType'] || (this.view.flxPartyDetails.isVisible && !formData['instructingParty'])) {
        FormControllerUtility.disableButton(this.view.btnSubmit);
      } else {
        FormControllerUtility.enableButton(this.view.btnSubmit);
      }
    },
    deletePermanently: function () {
      this.togglePopup(false);
      if (this.presenter.guaranteeData.guaranteesSRMSId) {
        this.presenter.deleteGuarantee(this.view.id);
      } else {
        this.presenter.showGuaranteesScreen({ context: 'viewGuarantees' });
      }
    },
    preFillData: function () {
      const guaranteeData = this.presenter.guaranteeData;
      if (guaranteeData.productType) {
        this.toggleProductTypeOption(guaranteeData.productType === 'Guarantee' ? 1 : 2);
      }
      if (guaranteeData.guaranteeAndSBLCType) {
        const billTypeData = this.view.segBillType.data;
        let billTypeAvailable = false;
        for (let i = 0; i < billTypeData.length; i++) {
          if (billTypeData[i].key === guaranteeData.guaranteeAndSBLCType) {
            this.view.segBillType.selectedRowIndex = [0, i];
            billTypeAvailable = true;
            break;
          }
        }
        if (billTypeAvailable) {
          this.segRowClick(this.view.segBillType, this.view.lblValueBillType, this.view.flxSegBillType, this.view.lblBillTypeDropdown);
        }
      }
      if (guaranteeData.guaranteesReferenceNo) this.view.tbxReference.text = guaranteeData.guaranteesReferenceNo;
      if (guaranteeData.modeOfTransaction) {
        this.toggleTransactionModeOption(guaranteeData.modeOfTransaction === 'Swift' ? 1 : 2);
      }
    },
    preFillPartyDetails: function () {
      const guaranteeData = this.presenter.guaranteeData;
      if (guaranteeData.instructingParty) {
        let instructingPartyAvailable = false;
        const instructingPartyData = this.view.segInstructingParty.data;
        for (let i = 0; i < instructingPartyData.length; i++) {
          if (instructingPartyData[i].value.text === guaranteeData.instructingParty) {
            this.view.segInstructingParty.selectedRowIndex = [0, i];
            instructingPartyAvailable = true;
            break;
          }
        }
        if (instructingPartyAvailable) {
          this.segRowClick(this.view.segInstructingParty, this.view.lblValueInstructingParty, this.view.flxSegInstructingParty, this.view.lblInsuringPartyDropdown);
          if (guaranteeData.applicantParty) {
            let applicantPartyAvailable = false;
            const applicantPartyData = this.view.segApplicantParty.data;
            for (let i = 0; i < applicantPartyData.length; i++) {
              if (applicantPartyData[i].value.text === guaranteeData.applicantParty) {
                this.view.segApplicantParty.selectedRowIndex = [0, i];
                applicantPartyAvailable = true;
                break;
              }
            }
            if (applicantPartyAvailable) {
              this.segRowClick(this.view.segApplicantParty, this.view.lblValueApplicantParty, this.view.flxSegApplicantParty, this.view.lblApplicantPartyDropdown);
            }
          }
        }
      }
    },
    toggleLGCopyDetailsPopup: function (visibility) {
      this.view.flxLGCopyDetailsPopup.setVisibility(visibility);
      if (visibility) {
        FormControllerUtility.disableButton(this.view.LGCopyDetails.btnCopyDetails);
        this.presenter.getGuarantees({ "sortByParam": "serviceRequestTime", "sortOrder": "DESC" }, this.view.id);
      }
      this.view.forceLayout();
    },
    getSearchedRecords: function () {
      const text = this.view.LGCopyDetails.txtSearchBox.text || '';
      this.presenter.getGuarantees({ "searchString": text, "sortByParam": "serviceRequestTime", "sortOrder": "DESC" }, this.view.id);
    },
    copyLGDetails: function () {
      const LGData = this.view.LGCopyDetails.getData();
      if (!LGData) return;
      this.presenter.guaranteeData = LGData;
      delete this.presenter.guaranteeData.guaranteesSRMSId;
      delete this.presenter.guaranteeData.amount;
      this.preFillData();
      this.preFillPartyDetails();
      this.toggleLGCopyDetailsPopup(false);
    },
    initSwiftTags: function () {
      const guaranteeSwiftTags = applicationManager.getConfigurationManager().guaranteeSwiftTags;
      if (scope_configManager.swiftEnabled === 'True') {
        this.view.flxProductTypeSwiftTag.setVisibility(true);
        this.view.flxBillTypeSwiftTag.setVisibility(true);
        this.view.flxRelatedTransactionReferenceSwiftTag.setVisibility(true);
        this.view.flxTransactionModeSwiftTag.setVisibility(true);
        this.view.flxInstructingPartySwiftTag.setVisibility(true);
        this.view.flxApplicantPartySwiftTag.setVisibility(true);
        this.view.lblProductTypeSwiftTag.text = guaranteeSwiftTags.productType || 'NA';
        this.view.lblBillTypeSwiftTag.text = guaranteeSwiftTags.guaranteeAndSBLCType || 'NA';
        this.view.lblRelatedTransactionReferenceSwiftTag.text = guaranteeSwiftTags.relatedTransactionReference || 'NA';
        this.view.lblTransactionModeSwiftTag.text = guaranteeSwiftTags.modeOfTransaction || 'NA';
        this.view.lblInstructingPartySwiftTag.text = guaranteeSwiftTags.instructingParty || 'NA';
        this.view.lblApplicantPartySwiftTag.text = guaranteeSwiftTags.applicantParty || 'NA';
      } else {
        this.view.flxProductTypeSwiftTag.setVisibility(false);
        this.view.flxBillTypeSwiftTag.setVisibility(false);
        this.view.flxRelatedTransactionReferenceSwiftTag.setVisibility(false);
        this.view.flxTransactionModeSwiftTag.setVisibility(false);
        this.view.flxInstructingPartySwiftTag.setVisibility(false);
        this.view.flxApplicantPartySwiftTag.setVisibility(false);
      }
      this.view.forceLayout();
    },
    validateDate: function (dateInputWidget) {
      let dateInputTextboxWidget = dateInputWidget.tbxDateInputKA;
      dateInputTextboxWidget.skin = "skntbxSSP42424215pxnoborder";
      if (dateInputTextboxWidget.text) {
        let dateArr = dateInputTextboxWidget.text.split("/").map(p => parseInt(p));
        const d = new Date(dateArr[2], dateArr[0] - 1, dateArr[1]);
        if ((d.getMonth() + 1) !== dateArr[0] || d.getDate() !== dateArr[1] || d.getFullYear() !== dateArr[2]) {
          dateInputTextboxWidget.skin = "ICSknTextBoxEE0005";
          FormControllerUtility.disableButton(this.view.btnSearch);
          return;
        }
      }
      this.enableOrDisableSearchButton();
    },
    enableOrDisableSearchButton: function () {
      if (this.view.tbxLookUpField1.text || this.view.DateInputLookUpField2.tbxDateInputKA.text || this.view.segLookUpField3.selectedRowIndex || this.view.segLookUpField4.selectedRowIndex) {
        FormControllerUtility.enableButton(this.view.btnSearch);
      } else {
        FormControllerUtility.disableButton(this.view.btnSearch);
      }
    }
  };
});