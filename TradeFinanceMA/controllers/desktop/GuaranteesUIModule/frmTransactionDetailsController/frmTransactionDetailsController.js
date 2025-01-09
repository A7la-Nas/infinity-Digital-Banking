define(['FormControllerUtility', "CommonUtilities"], function (FormControllerUtility, CommonUtilities) {
  const responsiveUtils = new ResponsiveUtils();
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
      var scope = this;
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
      this.view.lblHeading.text = this.presenter.guaranteeData.isReviseFlow ? kony.i18n.getLocalizedString('i18n.TradeFinance.issuedGtAndSblcReviseRequest') : kony.i18n.getLocalizedString('i18n.TradeFinance.createGuaranteeNewRequest');
      let roadmapData = [];
      for (const key in this.presenter.guaranteeRoadmap) {
        roadmapData.push({
          'currentRow': key === 'transactionDetails',
          'rowLabel': this.presenter.guaranteeRoadmap[key],
          'rowStatus': this.presenter.guaranteeData[key] === 'done' ? 'done' : key === 'transactionDetails' ? 'Inprogress' : 'Incomplete'
        });
      }
      this.view.ProgressTracker.setData(roadmapData);
      this.view.flxDemandAndTransferable.setVisibility(this.presenter.guaranteeData.productType !== 'Guarantee');
      if (this.presenter.guaranteeData.transactionDetails !== 'done') {
        this.resetForm();
        this.setDropdownValues(this.view.segCurrency, this.presenter.guaranteeConfig.currencies, this.view.flxCurrencyList);
        this.setDropdownValues(this.view.segTransferable, this.presenter.guaranteeConfig.transferable, this.view.flxTransferableList);
        this.setDropdownValues(this.view.segExpiryType, this.presenter.guaranteeConfig.expiryTypes, this.view.flxExpiryTypeList);
        this.setDropdownValues(this.view.segApplicableRules, this.presenter.guaranteeConfig.applicableRules, this.view.flxApplicableRulesList);
        this.presenter.getAllCountries(this.view.id);
      }
      if (this.presenter.guaranteeData.status) {
        this.preFillData();
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
      if (viewModel.guaranteesSRMSId) {
        this.showSuccessMessage(viewModel);
      }
      if (viewModel.countries) {
        this.setCountriesData(viewModel.countries);
      }
      if (viewModel.serverError) {
        this.showServerError(viewModel.serverError);
      }
    },
    initFormActions: function () {
      var scope = this;
      this.presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesUIModule' });
      this.view.segCurrency.onRowClick = this.segRowClick.bind(this, this.view.segCurrency, this.view.lblSelectedValueCurrency, this.view.flxCurrencyList, this.view.lblSelectedValueCurrencyDropdown);
      this.view.segTransferable.onRowClick = this.segRowClick.bind(this, this.view.segTransferable, this.view.lblSelectedTransferableValue, this.view.flxTransferableList, this.view.lblTransferableDropdown);
      this.view.segExpiryType.onRowClick = this.segRowClick.bind(this, this.view.segExpiryType, this.view.lblSelectedExpiryType, this.view.flxExpiryTypeList, this.view.lblExpiryTypeDropdown);
      this.view.segGoverningLaw.onRowClick = this.segRowClick.bind(this, this.view.segGoverningLaw, this.view.lblSelectedGoverningLawValue, this.view.flxGoverningLawList, this.view.lblGoverningLawDropdown);
      this.view.segApplicableRules.onRowClick = this.segRowClick.bind(this, this.view.segApplicableRules, this.view.lblSelectedApplicableRulesValue, this.view.flxApplicableRulesList, this.view.lblApplicableRulesDropdown);
      this.view.lblDemandOptionIcon1.onTouchEnd = this.ontoggleDemandType.bind(this, 'Partial');
      this.view.lblDemandOptionIcon2.onTouchEnd = this.ontoggleDemandType.bind(this, 'Full');
      this.view.lblExtendExpiryDateOptionIcon1.onTouchEnd = this.ontoggleExpiryDate.bind(this, 'Yes');
      this.view.lblExtendExpiryDateOptionIcon2.onTouchEnd = this.ontoggleExpiryDate.bind(this, 'No');
      this.view.flxCurrencyDropdown.onClick = this.toggleDropdown.bind(this, this.view.flxCurrencyList, this.view.lblSelectedValueCurrencyDropdown);
      this.view.flxTransferableDropdown.onClick = this.toggleDropdown.bind(this, this.view.flxTransferableList, this.view.lblTransferableDropdown);
      this.view.flxExpiryTypeDropdown.onClick = this.toggleDropdown.bind(this, this.view.flxExpiryTypeList, this.view.lblExpiryTypeDropdown);
      this.view.flxGoverningLawDropdown.onClick = this.toggleDropdown.bind(this, this.view.flxGoverningLawList, this.view.lblGoverningLawDropdown);
      this.view.flxApplicableRulesDropdown.onClick = this.toggleDropdown.bind(this, this.view.flxApplicableRulesList, this.view.lblApplicableRulesDropdown);
      this.view.Popup.flxCross.onClick = this.togglePopup.bind(this, false);
      this.view.flxErrorClose.onClick = () => scope.view.flxErrorMessage.setVisibility(false);
      this.view.lblClear.onTouchEnd = this.togglePopup.bind(this, true, 'clearDetails');
      this.view.lblSave.onTouchEnd = this.togglePopup.bind(this, true, 'saveDraft');
      this.view.btnClose.onClick = this.togglePopup.bind(this, true, 'saveOrDeleteDraft');
      this.view.btnBack.onClick = this.navigateBack;
      this.view.btnSubmit.onClick = this.submitDetails;
      this.view.tbxAmount.onEndEditing = this.formatAmount;
      this.view.tbxExtensionPeriod.onEndEditing = this.enableOrDisableSubmitButton;
      this.view.calIssueDate.onSelection = this.validateDate;
      this.view.calExpiryDate.onSelection = this.validateDate;
      this.view.calExtensionCapPeriod.onSelection = this.validateDate;
      this.view.calIssueDate.dateEditable = false;
      this.view.calExpiryDate.dateEditable = false;
      this.view.calExtensionCapPeriod.dateEditable = false;
      this.renderCalendars();
      this.restrictSpecialCharacters();
    },
    restrictSpecialCharacters: function () {
      const specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
      const alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
      const numbersSet = "0123456789";
      this.view.tbxAmount.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
    },
    segRowClick: function (segDropdown, lblSelectedValue, flxSegDropdown, lblDropdownIcon) {
      const selectedData = segDropdown.selectedRowItems[0];
      lblSelectedValue.text = selectedData.value;
      lblSelectedValue.skin = "sknLblSSP42424215px";
      flxSegDropdown.setVisibility(false);
      lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      if (segDropdown.id === 'segExpiryType') {
        switch (selectedData.key) {
          case 'Open Ended':
            this.view.flxExpiryCondition.setVisibility(false);
            this.view.flxExpiryDate.setVisibility(false);
            this.view.flxExtendExpiryDate.setVisibility(false);
            this.view.lblExtendExpiryDateOptionIcon1.text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
            this.view.lblExtendExpiryDateOptionIcon1.skin = this.presenter.resourcesConstants.skins.radioUnselected;
            this.view.lblExtendExpiryDateOptionIcon2.text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
            this.view.lblExtendExpiryDateOptionIcon2.skin = this.presenter.resourcesConstants.skins.radioUnselected;
            this.view.flxExtendExpiryDateDetails.setVisibility(false);
            this.view.flxExtensionDetails.setVisibility(false);
            break;
          case 'Date':
            this.view.flxExpiryCondition.setVisibility(false);
            this.view.flxExpiryDate.setVisibility(true);
            this.view.lblExpiryDate.text = kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate");
            this.view.flxExtendExpiryDate.setVisibility(this.presenter.guaranteeData.modeOfTransaction === 'Swift');
            break;
          case 'Conditions':
            this.view.flxExpiryCondition.setVisibility(true);
            this.view.flxExpiryDate.setVisibility(true);
            this.view.lblExpiryDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.expiryDateOptional");
            this.view.lblExpiryCondition.text = kony.i18n.getLocalizedString("i18n.TradeFinance.expiryConditionOptional").replace(/ *\([^)]*\) */g, "");
            this.view.flxExtendExpiryDate.setVisibility(this.presenter.guaranteeData.modeOfTransaction === 'Swift');
            break;
        }
        this.validateDate();
      }
      this.enableOrDisableSubmitButton();
    },
    setDropdownValues: function (seg, listValues, flxList) {
      var segmentData = [];
      if (listValues) {
        seg.widgetDataMap = {
          "lblListValue": "value"
        };
        for (const key in listValues) {
          segmentData.push({
            key: key,
            value: listValues[key],
            "template": "flxListDropdown"
          });
        }
        seg.setData(segmentData);
      }
      flxList.height = (segmentData.length * 41 > 205) ? "205dp" : `${segmentData.length * 41}dp`;
    },
    ontoggleDemandType: function (selectedValue) {
      if (selectedValue === 'Partial') {
        this.view.lblDemandOptionIcon1.text = this.presenter.resourcesConstants.fontIcons.radioSelected;
        this.view.lblDemandOptionIcon1.skin = this.presenter.resourcesConstants.skins.radioSelected;
        this.view.lblDemandOptionIcon2.text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
        this.view.lblDemandOptionIcon2.skin = this.presenter.resourcesConstants.skins.radioUnselected;
      } else {
        this.view.lblDemandOptionIcon1.text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
        this.view.lblDemandOptionIcon1.skin = this.presenter.resourcesConstants.skins.radioUnselected;
        this.view.lblDemandOptionIcon2.text = this.presenter.resourcesConstants.fontIcons.radioSelected;
        this.view.lblDemandOptionIcon2.skin = this.presenter.resourcesConstants.skins.radioSelected;
      }
      this.enableOrDisableSubmitButton();
    },
    ontoggleExpiryDate: function (selectedValue) {
      if (selectedValue === 'Yes') {
        this.view.lblExtendExpiryDateOptionIcon1.text = this.presenter.resourcesConstants.fontIcons.radioSelected;
        this.view.lblExtendExpiryDateOptionIcon1.skin = this.presenter.resourcesConstants.skins.radioSelected;
        this.view.lblExtendExpiryDateOptionIcon2.text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
        this.view.lblExtendExpiryDateOptionIcon2.skin = this.presenter.resourcesConstants.skins.radioUnselected;
        this.view.flxExtensionDetails.setVisibility(true);
      } else {
        this.view.lblExtendExpiryDateOptionIcon1.text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
        this.view.lblExtendExpiryDateOptionIcon1.skin = this.presenter.resourcesConstants.skins.radioUnselected;
        this.view.lblExtendExpiryDateOptionIcon2.text = this.presenter.resourcesConstants.fontIcons.radioSelected;
        this.view.lblExtendExpiryDateOptionIcon2.skin = this.presenter.resourcesConstants.skins.radioSelected;
        this.view.flxExtensionDetails.setVisibility(false);
      }
      this.view.flxExtendExpiryDateDetails.setVisibility(selectedValue === 'Yes');
      this.enableOrDisableSubmitButton();
    },
    togglePopup: function (visibility, flow) {
      if (visibility) {
        this.view.Popup.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
        this.view.Popup.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
        this.view.Popup.btnNo.onClick = this.togglePopup.bind(this, false);
        switch (flow) {
          case 'clearDetails':
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TransfersEur.clear");
            this.view.Popup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AreYouSureYouWantToClearThe") + kony.i18n.getLocalizedString("i18n.billPay.TransactionDetails") + '?';
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
        }
        this.view.Popup.btnYes.toolTip = this.view.Popup.btnYes.text;
        this.view.Popup.btnNo.toolTip = this.view.Popup.btnNo.text;
      }
      this.view.flxDialogs.setVisibility(visibility);
      this.view.flxPopup.setVisibility(visibility);
      this.view.forceLayout();
    },
    toggleDropdown: function (flxSeg, lblIcon) {
      if (flxSeg.isVisible) {
        flxSeg.setVisibility(false);
        lblIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      } else {
        flxSeg.setVisibility(true);
        lblIcon.text = this.presenter.resourcesConstants.fontIcons.chevronUp;
      }
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
        this.view.forceLayout();
      }
    },
    getFormData: function () {
      let formData = {
        'demandAcceptance': '',
        'transferable': '',
        'expiryDate': '',
        'expiryCondition': '',
        'extendExpiryDate': '',
        'extensionPeriod': '',
        'extensionCapPeriod': '',
        'notificationPeriod': '',
        'expiryDate': this.view.flxExpiryDateContainer.isVisible ? this.view.calExpiryDate.formattedDate : '',
        'extensionDetails': ''
      };
      formData['currency'] = this.view.segCurrency.selectedRowIndex ? this.view.segCurrency.selectedRowItems[0].key : '';
      formData['amount'] = applicationManager.getFormatUtilManager().deFormatAmount(this.view.tbxAmount.text);
      if (this.view.flxDemandAndTransferable.isVisible) {
        formData['demandAcceptance'] = this.view.lblDemandOptionIcon1.text === this.presenter.resourcesConstants.fontIcons.radioSelected ? 'Partial' : 'Full';
        formData['transferable'] = this.view.segTransferable.selectedRowIndex ? this.view.segTransferable.selectedRowItems[0].key : '';
      }
      formData['issueDate'] = this.view.calIssueDate.formattedDate || '';
      formData['expiryType'] = this.view.segExpiryType.selectedRowIndex ? this.view.segExpiryType.selectedRowItems[0].key : '';
      if (this.view.flxExpiryCondition.isVisible) {
        formData['expiryCondition'] = this.view.tbxExpiryCondition.text;
      }
      if (this.view.flxExtendExpiryDate.isVisible) {
        formData['extendExpiryDate'] = this.view.lblExtendExpiryDateOptionIcon1.text === this.presenter.resourcesConstants.fontIcons.radioSelected ? 'Yes' : this.view.lblExtendExpiryDateOptionIcon2.text === this.presenter.resourcesConstants.fontIcons.radioSelected ? 'No' : '';
        if (this.view.flxExtendExpiryDateDetails.isVisible) {
          formData['extensionPeriod'] = this.view.tbxExtensionPeriod.text;
          formData['extensionCapPeriod'] = this.view.calExtensionCapPeriod.formattedDate;
          formData['notificationPeriod'] = this.view.tbxNotificationPeriod.text;
        }
        if (this.view.flxExtensionDetails.isVisible) {
          formData['extensionDetails'] = this.view.txtExtensionDetails.text;
        }
      }
      formData['governingLaw'] = this.view.segGoverningLaw.selectedRowIndex ? this.view.segGoverningLaw.selectedRowItems[0].key : '';
      formData['applicableRules'] = this.view.segApplicableRules.selectedRowIndex ? this.view.segApplicableRules.selectedRowItems[0].key : '';
      formData['otherInstructions'] = this.view.txtOtherInstructions.text;
      formData['deliveryInstructions'] = this.view.txtDeliveryInstructions.text;
      return formData;
    },
    saveDraft: function (flow) {
      this.togglePopup(false);
      const formData = this.getFormData();
      this.presenter.saveGuarantee(formData, this.view.id, flow);
    },
    /**
    * setting the position of calendars
    */
    renderCalendars: function () {
      const calendars = [this.view.calIssueDate, this.view.calExpiryDate, this.view.calExtensionCapPeriod];
      for (const calWidget of calendars) {
        calWidget.setContext({
          "widget": calWidget,
          "anchor": "bottom"
        });
      }
    },
    resetForm: function () {
      this.view.flxDialogs.setVisibility(false);
      this.view.flxPopup.setVisibility(false);
      this.view.segCurrency.selectedRowIndex = null;
      this.view.lblSelectedValueCurrency.text = '';
      this.view.flxCurrencyList.setVisibility(false);
      this.view.segTransferable.selectedRowIndex = null;
      this.view.lblSelectedTransferableValue.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
      this.view.lblSelectedTransferableValue.skin = "sknLblSSP72727215px";
      this.view.flxTransferableList.setVisibility(false);
      this.view.tbxAmount.text = '';
      this.view.segExpiryType.selectedRowIndex = null;
      this.view.lblSelectedExpiryType.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
      this.view.lblSelectedExpiryType.skin = "sknLblSSP72727215px";
      this.view.flxExpiryTypeList.setVisibility(false);
      this.view.flxExpiryCondition.setVisibility(false);
      this.view.flxExpiryDate.setVisibility(false);
      this.view.tbxExpiryCondition.text = '';
      this.view.flxExtendExpiryDate.setVisibility(false);
      this.view.lblExtendExpiryDateOptionIcon1.text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
      this.view.lblExtendExpiryDateOptionIcon1.skin = this.presenter.resourcesConstants.skins.radioUnselected;
      this.view.lblExtendExpiryDateOptionIcon2.text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
      this.view.lblExtendExpiryDateOptionIcon2.skin = this.presenter.resourcesConstants.skins.radioUnselected;
      this.view.flxExtendExpiryDateDetails.setVisibility(false);
      this.view.flxExtensionDetails.setVisibility(false);
      this.view.tbxExtensionPeriod.text = '';
      this.view.tbxNotificationPeriod.text = '';
      this.view.txtExtensionDetails.text = '';
      this.view.segGoverningLaw.selectedRowIndex = null;
      this.view.lblSelectedGoverningLawValue.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
      this.view.lblSelectedGoverningLawValue.skin = "sknLblSSP72727215px";
      this.view.flxGoverningLawList.setVisibility(false);
      this.view.segApplicableRules.selectedRowIndex = null;
      this.view.lblSelectedApplicableRulesValue.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
      this.view.lblSelectedApplicableRulesValue.skin = "sknLblSSP72727215px";
      this.view.flxApplicableRulesList.setVisibility(false);
      this.view.txtOtherInstructions.text = '';
      this.view.txtDeliveryInstructions.text = '';
      this.view.calIssueDate.skin = "sknCalNormal";
      this.view.calExpiryDate.skin = "sknCalNormal";
      this.view.calExtensionCapPeriod.skin = "sknCalNormal";
      CommonUtilities.disableOldDaySelection(this.view.calIssueDate);
      CommonUtilities.disableOldDaySelection(this.view.calExpiryDate);
      CommonUtilities.disableOldDaySelection(this.view.calExtensionCapPeriod);
      this.togglePopup(false);
      this.enableOrDisableSubmitButton();
    },
    navigateBack: function () {
      this.presenter.showView({ form: 'frmProductDetails' });
    },
    submitDetails: function () {
      const formData = this.getFormData();
      this.presenter.storeGuaranteeData('transactionDetails', formData);
    },
    enableOrDisableSubmitButton: function () {
      if (this.view.calIssueDate.skin === 'sknff0000Cal' || (this.view.flxExpiryDate.isVisible && this.view.calExpiryDate.skin === "sknff0000Cal") || (this.view.flxExtendExpiryDateDetails.isVisible && this.view.calExtensionCapPeriod.skin === 'sknff0000Cal')) {
        FormControllerUtility.disableButton(this.view.btnSubmit);
        return;
      }
      const formData = this.getFormData();
      if (!formData['currency'] || !formData['amount'] || !formData['expiryType'] || (this.view.flxExtendExpiryDateDetails.isVisible && !formData['extensionPeriod'])) {
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
      if (guaranteeData.currency) {
        const currencyData = this.view.segCurrency.data;
        let currencyAvailable = false;
        for (let i = 0; i < currencyData.length; i++) {
          if (currencyData[i].key === guaranteeData.currency) {
            this.view.segCurrency.selectedRowIndex = [0, i];
            currencyAvailable = true;
            break;
          }
        }
        if (currencyAvailable) {
          this.segRowClick(this.view.segCurrency, this.view.lblSelectedValueCurrency, this.view.flxCurrencyList, this.view.lblSelectedValueCurrencyDropdown);
        }
      }
      if (guaranteeData.amount) this.view.tbxAmount.text = guaranteeData.amount;
      if (guaranteeData.demandAcceptance) {
        this.ontoggleDemandType(guaranteeData.demandAcceptance);
      }
      if (guaranteeData.transferable) {
        const transferableData = this.view.segTransferable.data;
        let transferableAvailable = false;
        for (let i = 0; i < transferableData.length; i++) {
          if (transferableData[i].key === guaranteeData.transferable) {
            this.view.segTransferable.selectedRowIndex = [0, i];
            transferableAvailable = true;
            break;
          }
        }
        if (transferableAvailable) {
          this.segRowClick(this.view.segTransferable, this.view.lblSelectedTransferableValue, this.view.flxTransferableList, this.view.lblTransferableDropdown);
        }
      }
      if (guaranteeData.issueDate && (Date.parse(guaranteeData.issueDate) >= Date.parse(this.view.calIssueDate.formattedDate))) {
        const issueDate = new Date(guaranteeData.issueDate);
        this.view.calIssueDate.dateComponents = [issueDate.getDate(), issueDate.getMonth() + 1, issueDate.getFullYear()];
      }
      if (guaranteeData.expiryDate && (Date.parse(guaranteeData.expiryDate) >= Date.parse(this.view.calExpiryDate.formattedDate))) {
        const expiryDate = new Date(guaranteeData.expiryDate);
        this.view.calExpiryDate.dateComponents = [expiryDate.getDate(), expiryDate.getMonth() + 1, expiryDate.getFullYear()];
      }
      if (guaranteeData.expiryType) {
        const expiryTypeData = this.view.segExpiryType.data;
        let expiryTypeAvailable = false;
        for (let i = 0; i < expiryTypeData.length; i++) {
          if (expiryTypeData[i].key === guaranteeData.expiryType) {
            this.view.segExpiryType.selectedRowIndex = [0, i];
            expiryTypeAvailable = true;
            break;
          }
        }
        if (expiryTypeAvailable) {
          this.segRowClick(this.view.segExpiryType, this.view.lblSelectedExpiryType, this.view.flxExpiryTypeList, this.view.lblExpiryTypeDropdown);
        }
      }
      if (guaranteeData.expiryCondition) this.view.tbxExpiryCondition.text = guaranteeData.expiryCondition;
      if (guaranteeData.extendExpiryDate) {
        this.ontoggleExpiryDate(guaranteeData.extendExpiryDate);
      }
      if (guaranteeData.extensionPeriod) this.view.tbxExtensionPeriod.text = guaranteeData.extensionPeriod;
      if (guaranteeData.extensionCapPeriod && (Date.parse(guaranteeData.extensionCapPeriod) >= Date.parse(this.view.calExtensionCapPeriod.formattedDate))) {
        const extensionCapPeriod = new Date(guaranteeData.extensionCapPeriod);
        this.view.calExtensionCapPeriod.dateComponents = [extensionCapPeriod.getDate(), extensionCapPeriod.getMonth() + 1, extensionCapPeriod.getFullYear()];
      }
      if (guaranteeData.notificationPeriod) this.view.tbxNotificationPeriod.text = guaranteeData.notificationPeriod;
      if (guaranteeData.extensionDetails) this.view.txtExtensionDetails.text = guaranteeData.extensionDetails;
      if (guaranteeData.applicableRules) {
        const applicableRulesData = this.view.segApplicableRules.data;
        let applicableRulesAvailable = false;
        for (let i = 0; i < applicableRulesData.length; i++) {
          if (applicableRulesData[i].key === guaranteeData.applicableRules) {
            this.view.segApplicableRules.selectedRowIndex = [0, i];
            applicableRulesAvailable = true;
            break;
          }
        }
        if (applicableRulesAvailable) {
          this.segRowClick(this.view.segApplicableRules, this.view.lblSelectedApplicableRulesValue, this.view.flxApplicableRulesList, this.view.lblApplicableRulesDropdown);
        }
      }
      if (guaranteeData.otherInstructions) this.view.txtOtherInstructions.text = guaranteeData.otherInstructions;
      if (guaranteeData.deliveryInstructions) this.view.txtDeliveryInstructions.text = guaranteeData.deliveryInstructions;
      this.validateDate();
      this.enableOrDisableSubmitButton();
    },
    initSwiftTags: function () {
      const guaranteeSwiftTags = applicationManager.getConfigurationManager().guaranteeSwiftTags;
      if (scope_configManager.swiftEnabled === 'True') {
        this.view.flxCurrencyAndAmountSwiftTag.setVisibility(true);
        this.view.flxAmountDetailsContainer.left = "40dp";
        this.view.flxDemandSwiftTag.setVisibility(true);
        this.view.flxDemandContainer.left = "40dp";
        this.view.flxTransferableSwiftTag.setVisibility(true);
        this.view.flxTransferableContainer.left = "40dp";
        this.view.flxExpiryConditionSwiftTag.setVisibility(true);
        this.view.flxExpiryConditionContainer.left = "40dp";
        this.view.flxExpiryDateSwiftTag.setVisibility(true);
        this.view.flxExpiryDateContainer.left = "40dp";
        this.view.flxExpiryTypeSwiftTag.setVisibility(true);
        this.view.flxExpiryTypeContainer.left = "40dp";
        this.view.flxExtendExpiryDateSwiftTag.setVisibility(true);
        this.view.flxExtendExpiryDateContainer.left = "40dp";
        this.view.flxExtensionCapPeriodSwiftTag.setVisibility(true);
        this.view.flxExtensionCapPeriodContainer.left = "40dp";
        this.view.flxExtensionDetailsSwiftTag.setVisibility(true);
        this.view.flxExtensionDetailsContainer.left = "40dp";
        this.view.flxExtensionPeriodSwiftTag.setVisibility(true);
        this.view.flxExtensionPeriodContainer.left = "40dp";
        this.view.flxGoverningLawSwiftTag.setVisibility(true);
        this.view.flxGoverningLawContainer.left = "40dp";
        this.view.flxApplicableRulesSwiftTag.setVisibility(true);
        this.view.flxApplicableRulesContainer.left = "40dp";
        this.view.flxIssueDateSwiftTag.setVisibility(true);
        this.view.flxIssueDateContainer.left = "40dp";
        this.view.flxNotificationPeriodSwiftTag.setVisibility(true);
        this.view.flxNotificationPeriodContainer.left = "40dp";
        this.view.flxOtherInstructionsSwiftTag.setVisibility(true);
        this.view.flxOtherInstructionsContainer.left = "40dp";
        this.view.flxDeliveryInstructionsSwiftTag.setVisibility(true);
        this.view.flxDeliveryInstructionsContainer.left = "40dp";
        this.view.lblCurrencyAndAmountSwiftTag.text = guaranteeSwiftTags.currencyAndAmount || 'NA';
        this.view.lblDemandSwiftTag.text = guaranteeSwiftTags.demand || 'NA';
        this.view.lblTransferableSwiftTag.text = guaranteeSwiftTags.transferable || 'NA';
        this.view.lblExpiryConditionSwiftTag.text = guaranteeSwiftTags.expiryConditions || 'NA';
        this.view.lblExpiryDateSwiftTag.text = guaranteeSwiftTags.expiryDate || 'NA';
        this.view.lblExpiryTypeSwiftTag.text = guaranteeSwiftTags.expiryType || 'NA';
        this.view.lblExtendExpiryDateSwiftTag.text = guaranteeSwiftTags.autoExtension || 'NA';
        this.view.lblExtensionCapPeriodSwiftTag.text = guaranteeSwiftTags.extensionCapPeriod || 'NA';
        this.view.lblExtensionDetailsSwiftTag.text = guaranteeSwiftTags.extensionDetails || 'NA';
        this.view.lblExtensionPeriodSwiftTag.text = guaranteeSwiftTags.extensionPeriod || 'NA';
        this.view.lblGoverningLawSwiftTag.text = guaranteeSwiftTags.governingLaw || 'NA';
        this.view.lblApplicableRulesSwiftTag.text = guaranteeSwiftTags.applicableRules || 'NA';
        this.view.lblIssueDateSwiftTag.text = guaranteeSwiftTags.expectedIssueDate || 'NA';
        this.view.lblNotificationPeriodSwiftTag.text = guaranteeSwiftTags.notificationPeriod || 'NA';
        this.view.lblOtherInstructionsSwiftTag.text = guaranteeSwiftTags.otherInstructions || 'NA';
        this.view.lblDeliveryInstructionsSwiftTag.text = guaranteeSwiftTags.deliveryInstructions || 'NA';
      } else {
        this.view.flxCurrencyAndAmountSwiftTag.setVisibility(false);
        this.view.flxAmountDetailsContainer.left = "0dp";
        this.view.flxDemandSwiftTag.setVisibility(false);
        this.view.flxDemandContainer.left = "0dp";
        this.view.flxTransferableSwiftTag.setVisibility(false);
        this.view.flxTransferableContainer.left = "0dp";
        this.view.flxExpiryConditionSwiftTag.setVisibility(false);
        this.view.flxExpiryConditionContainer.left = "0dp";
        this.view.flxExpiryDateSwiftTag.setVisibility(false);
        this.view.flxExpiryDateContainer.left = "0dp";
        this.view.flxExpiryTypeSwiftTag.setVisibility(false);
        this.view.flxExpiryTypeContainer.left = "0dp";
        this.view.flxExtendExpiryDateSwiftTag.setVisibility(false);
        this.view.flxExtendExpiryDateContainer.left = "0dp";
        this.view.flxExtensionCapPeriodSwiftTag.setVisibility(false);
        this.view.flxExtensionCapPeriodContainer.left = "0dp";
        this.view.flxExtensionDetailsSwiftTag.setVisibility(false);
        this.view.flxExtensionDetailsContainer.left = "0dp";
        this.view.flxExtensionPeriodSwiftTag.setVisibility(false);
        this.view.flxExtensionPeriodContainer.left = "0dp";
        this.view.flxGoverningLawSwiftTag.setVisibility(false);
        this.view.flxGoverningLawContainer.left = "0dp";
        this.view.flxApplicableRulesSwiftTag.setVisibility(false);
        this.view.flxApplicableRulesContainer.left = "0dp";
        this.view.flxIssueDateSwiftTag.setVisibility(false);
        this.view.flxIssueDateContainer.left = "0dp";
        this.view.flxNotificationPeriodSwiftTag.setVisibility(false);
        this.view.flxNotificationPeriodContainer.left = "0dp";
        this.view.flxOtherInstructionsSwiftTag.setVisibility(false);
        this.view.flxOtherInstructionsContainer.left = "0dp";
        this.view.flxDeliveryInstructionsSwiftTag.setVisibility(false);
        this.view.flxDeliveryInstructionsContainer.left = "0dp";
      }
      this.view.forceLayout();
    },
    setCountriesData: function (countries) {
      let segData = [];
      if (countries) {
        this.view.segGoverningLaw.widgetDataMap = {
          'lblListValue': 'value'
        };
        for (const country of countries) {
          segData.push({
            'key': country.Name,
            'value': country.Name,
            'template': 'flxListDropdown'
          });
        }
        this.view.segGoverningLaw.setData(segData);
        this.view.flxGoverningLawList.height = (segData.length * 41 > 205) ? "205dp" : `${segData.length * 41}dp`;
        const guaranteeData = this.presenter.guaranteeData;
        if (guaranteeData.status && guaranteeData.governingLaw && segData) {
          let governingLawAvailable = false;
          for (let i = 0; i < segData.length; i++) {
            if (segData[i].key === guaranteeData.governingLaw) {
              this.view.segGoverningLaw.selectedRowIndex = [0, i];
              governingLawAvailable = true;
              break;
            }
          }
          if (governingLawAvailable) {
            this.segRowClick(this.view.segGoverningLaw, this.view.lblSelectedGoverningLawValue, this.view.flxGoverningLawList, this.view.lblGoverningLawDropdown);
          }
        }
      }
    },
    formatAmount: function () {
      let amount = this.view.tbxAmount.text;
      if (amount) {
        amount = applicationManager.getFormatUtilManager().formatAmount(amount);
        this.view.tbxAmount.text = amount || '';
      }
      this.enableOrDisableSubmitButton();
    },
    validateDate: function () {
      const issueDate = this.view.calIssueDate.formattedDate;
      if (issueDate) {
        const expiryDate = this.view.calExpiryDate.formattedDate;
        if (expiryDate && Date.parse(expiryDate) <= Date.parse(issueDate)) {
          this.view.calExpiryDate.skin = "sknff0000Cal";
        } else {
          this.view.calExpiryDate.skin = "sknCalNormal";
        }
        const extensionCapPeriod = this.view.calExtensionCapPeriod.formattedDate;
        if (extensionCapPeriod && Date.parse(extensionCapPeriod) <= Date.parse(issueDate)) {
          this.view.calExtensionCapPeriod.skin = "sknff0000Cal";
        } else {
          this.view.calExtensionCapPeriod.skin = "sknCalNormal";
        }
      }
      this.enableOrDisableSubmitButton();
    },
  };
});