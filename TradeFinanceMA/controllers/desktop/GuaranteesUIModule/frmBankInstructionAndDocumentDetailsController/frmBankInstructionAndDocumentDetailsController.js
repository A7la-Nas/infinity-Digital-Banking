define(['FormControllerUtility', 'CommonUtilities', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, OLBConstants) {
  const responsiveUtils = new ResponsiveUtils();
  let documentsList = [];
  let document = '';
  let docReferenceValues = [];
  let deletedIndex;
  let accounts = [];
  let currencies = [];
  let settlementAccountIndex = 0;
  let settlementAccountCount = 0;
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
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
      this.view.customheadernew.forceCloseHamburger();
      this.view.customheadernew.activateMenu("TradeFinance", "Guarantees");
    },
    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      const scope = this;
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(false);
      this.view.flxOtherInstructionsInfo.setVisibility(false);
      this.view.flxOtherInstructions.zIndex = 1;
      this.view.lblHeading.text = this.presenter.guaranteeData.isReviseFlow ? kony.i18n.getLocalizedString('i18n.TradeFinance.issuedGtAndSblcReviseRequest') : kony.i18n.getLocalizedString('i18n.TradeFinance.createGuaranteeNewRequest');
      let roadmapData = [];
      for (const key in this.presenter.guaranteeRoadmap) {
        roadmapData.push({
          'currentRow': key === 'bankInstructionAndDocumentDetails',
          'rowLabel': this.presenter.guaranteeRoadmap[key],
          'rowStatus': this.presenter.guaranteeData[key] === 'done' ? 'done' : key === 'bankInstructionAndDocumentDetails' ? 'Inprogress' : 'Incomplete'
        });
      }
      this.view.ProgressTracker.setData(roadmapData);
      accounts = (applicationManager.getAccountManager().getInternalAccounts() || []).filter(acc => scope.presenter.guaranteeConfig.accountTypes.includes(acc.accountType));
      currencies = Array.from(new Set(accounts.map(acc => acc.currencyCode)));
      if (this.presenter.guaranteeData.bankInstructionAndDocumentDetails !== 'done') {
        this.resetForm();
        this.setAccountsData();
        this.presenter.getLimitInstructions({}, this.view.id);
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
      if (viewModel.uploadDocument) {
        this.storeDocumentReference(viewModel.uploadDocument[0].documentReference);
      }
      if (viewModel.deleteDocument) {
        this.removeDocumentReference();
      }
      if (viewModel.guaranteesSRMSId) {
        this.showSuccessMessage(viewModel);
      }
      if (viewModel.Limits) {
        this.setLimitInstructions(viewModel.Limits);
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
      this.view.btnUploadNewFile.onClick = this.browseSupportingDocument;
      this.view.Popup.flxCross.onClick = this.togglePopup.bind(this, false);
      this.view.flxErrorClose.onClick = () => scope.view.flxErrorMessage.setVisibility(false);
      this.view.lblClear.onTouchEnd = this.togglePopup.bind(this, true, 'clearDetails');
      this.view.lblSave.onTouchEnd = this.togglePopup.bind(this, true, 'saveDraft');
      this.view.btnClose.onClick = this.togglePopup.bind(this, true, 'saveOrDeleteDraft');
      this.view.btnBack.onClick = this.navigateBack;
      this.view.btnSubmit.onClick = this.submitDetails;
      this.view.lblSettlementAccountOptionIcon1.onTouchEnd = this.toggleSettlementAccountOption.bind(this, 1);
      this.view.lblSettlementAccountOptionIcon2.onTouchEnd = this.toggleSettlementAccountOption.bind(this, 2);
      this.view.flxSingleSettlementAccountDropdown.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxSingleSettlementAccountsList, this.view.lblSingleSettlementAccountDropdownIcon);
      this.view.flxLimitInstructionsDropdown.onClick = this.toggleDropdownVisibility.bind(this, this.view.flxLimitInstructionsList, this.view.lblLimitInstructionsDropdownIcon);
      this.view.segSingleSettlementAccounts.onRowClick = this.segRowClick.bind(this, this.view.segSingleSettlementAccounts, this.view.lblSelectedSingleSettlementAccount, this.view.flxSingleSettlementAccountsList, this.view.lblSingleSettlementAccountDropdownIcon);
      this.view.segLimitInstructions.onRowClick = this.segRowClick.bind(this, this.view.segLimitInstructions, this.view.lblSelectedLimitInstruction, this.view.flxLimitInstructionsList, this.view.lblLimitInstructionsDropdownIcon);
      this.view.btnAddNewCurrency.onClick = this.addNewCurrency;
      this.view.imgOtherInstructionsInfo.onTouchEnd = function () {
        scope.view.flxOtherInstructionsInfo.setVisibility(true);
        scope.view.flxOtherInstructions.zIndex = 3;
      };
      this.view.lblCloseOtherInstructionsInfo.onTouchEnd = function () {
        scope.view.flxOtherInstructionsInfo.setVisibility(false);
        scope.view.flxOtherInstructions.zIndex = 1;
      };
    },
    browseSupportingDocument: function () {
      const scope = this;
      const config = {
        selectMultipleFiles: false,
        filter: [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "image/bmp",
          "application/x-zip-compressed",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          ".csv"
        ]
      };
      if (documentsList.length >= this.presenter.guaranteeConfig.documentsLimit) {
        scope.view.Popup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedDocumentsLimitMessage")} ${this.presenter.guaranteeConfig.documentsLimit}.`;
        scope.togglePopup(true, 'uploadDocument');
        return;
      }
      kony.io.FileSystem.browse(config, scope.selectedDocumentCallback);
    },
    getBase64: function (file, successCallback) {
      let reader = new FileReader();
      reader.onloadend = function () {
        successCallback(reader.result);
      };
      reader.readAsDataURL(file);
    },
    selectedDocumentCallback: function (events, files) {
      const scope = this;
      const extensions = this.presenter.guaranteeConfig.fileExtensions;
      if (files.length > 0) {
        const extension = files[0].file.name.split('.').pop();
        if (extension && !extensions.hasOwnProperty(extension)) {
          scope.togglePopup(true, 'uploadDocument');
          scope.view.Popup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${files[0].name} ${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedFileExtensionsMessage")} ${Object.keys(extensions).map(e => `.${e}`).join(', ')}.`;
          return;
        }
        if (files[0].file.size >= scope.presenter.guaranteeConfig.documentMaxSize) {
          scope.togglePopup(true, 'uploadDocument');
          scope.view.Popup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${files[0].name} ${kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentSizeErrorMsg")} ${scope.presenter.guaranteeConfig.documentMaxSize / 10e5} MB.`;
          return;
        }
        var fileData = {};
        scope.togglePopup(false);
        document = files[0].name;
        fileData.fileName = files[0].name;
        fileData.fileType = files[0].file.type;
        scope.getBase64(files[0].file, function (base64String) {
          fileData.fileContents = base64String.split(';base64,')[1];
          let fileDataItemParsed = [fileData.fileName, fileData.fileType, fileData.fileContents].join('~');
          scope.presenter.uploadDocument(fileDataItemParsed, scope.view.id);
        });
      }
      scope.view.forceLayout();
    },
    storeDocumentReference: function (key) {
      documentsList.push(document);
      docReferenceValues.push(key);
      this.setDocumentsDataToSegment();
    },
    setDocumentsDataToSegment: function () {
      const scope = this;
      const extensions = this.presenter.guaranteeConfig.fileExtensions;
      scope.enableOrDisableSubmitButton();
      if (documentsList.length === 0) {
        scope.view.segDocuments.removeAll();
        scope.view.flxSegDocuments.setVisibility(false);
        return;
      }
      scope.view.flxSegDocuments.setVisibility(true);
      let segData = [];
      for (const document of documentsList) {
        segData.push({
          "imgPDF": {
            src: extensions[document.split('.').pop()] || 'aa_password_error.png'
          },
          "lblDocumentName": {
            text: document,
            toolTip: document
          },
          "lblDelete": {
            text: "S"
          },
          "flxDelete": {
            onClick: scope.togglePopup.bind(scope, true, 'deleteDocument'),
            cursorType: "pointer"
          },
          "template": "flxExportLCDrawingsUploadDocument"
        });
      }
      scope.view.segDocuments.widgetDataMap = {
        "imgPDF": "imgPDF",
        "lblDocumentName": "lblDocumentName",
        "lblDelete": "lblDelete",
        "flxDelete": "flxDelete"
      };
      scope.view.segDocuments.setData(segData);
      scope.view.forceLayout();
    },
    deleteDocument: function () {
      const scope = this;
      scope.presenter.deleteDocument(docReferenceValues[deletedIndex], this.view.id);
      scope.togglePopup(false);
    },
    removeDocumentReference: function () {
      documentsList.splice(deletedIndex, 1);
      docReferenceValues.splice(deletedIndex, 1);
      this.setDocumentsDataToSegment();
    },
    togglePopup: function (visibility, flow, data) {
      if (visibility) {
        this.view.Popup.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
        this.view.Popup.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
        this.view.Popup.btnNo.onClick = this.togglePopup.bind(this, false);
        switch (flow) {
          case 'uploadDocument':
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocument");
            this.view.Popup.btnYes.text = kony.i18n.getLocalizedString("kony.mb.common.TryAgain");
            this.view.Popup.btnNo.text = kony.i18n.getLocalizedString("i18n.common.close");
            this.view.Popup.btnYes.onClick = this.tryBrowseAgain;
            break;
          case 'clearDetails':
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TransfersEur.clear");
            this.view.Popup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AreYouSureYouWantToClearThe") + kony.i18n.getLocalizedString("i18n.TradeFinance.bankInstructions&Documents") + '?';
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
          case 'deleteDocument':
            deletedIndex = this.view.segDocuments.selectedRowIndex[1];
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("kony.mb.common.Delete");
            this.view.Popup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.deleteDocumentMessage")} "${documentsList[deletedIndex]}"?`;
            this.view.Popup.btnYes.onClick = this.deleteDocument;
            break;
          case 'deleteCurrency':
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("kony.mb.common.Delete");
            this.view.Popup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.deletePopupMessage");
            this.view.Popup.btnYes.onClick = this.deleteCurrency.bind(this, data);
            break;
        }
        this.view.Popup.btnYes.toolTip = this.view.Popup.btnYes.text;
        this.view.Popup.btnNo.toolTip = this.view.Popup.btnNo.text;
      }
      this.view.flxDialogs.setVisibility(visibility);
      this.view.flxPopup.setVisibility(visibility);
      this.view.forceLayout();
    },
    tryBrowseAgain: function () {
      this.togglePopup(false);
      this.browseSupportingDocument();
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
        'isSingleSettlement': '',
        'instructionCurrencies': ''
      };
      if (this.view.lblSettlementAccountOptionIcon1.text === this.presenter.resourcesConstants.fontIcons.radioSelected) {
        if (this.view.segSingleSettlementAccounts.selectedRowIndex) {
          formData['isSingleSettlement'] = 'true';
          const { currencyCode, accountID } = this.view.segSingleSettlementAccounts.selectedRowItems[0];
          formData['instructionCurrencies'] = JSON.stringify([
            { 'accountCurrency': currencyCode, 'account': accountID, 'accountType': 'Charge' },
            { 'accountCurrency': currencyCode, 'account': accountID, 'accountType': 'Commission' },
            { 'accountCurrency': currencyCode, 'account': accountID, 'accountType': 'Cash Margin' }
          ]);
        }
      } else {
        const multiSettlementAccountData = this.getSelectedSettlementAccounts();
        if (multiSettlementAccountData && multiSettlementAccountData.length > 0) {
          formData['isSingleSettlement'] = 'false';
          formData['instructionCurrencies'] = JSON.stringify(multiSettlementAccountData);
        }
      }
      formData['limitInstructions'] = this.view.segLimitInstructions.selectedRowIndex ? this.view.segLimitInstructions.selectedRowItems[0].key : '';
      formData['otherBankInstructions'] = this.view.txtOtherInstructions.text;
      formData['messageToBank'] = this.view.txtMessageToBank.text;
      formData['documentReferences'] = JSON.stringify(docReferenceValues);
      formData['documentName'] = JSON.stringify(documentsList);
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
    resetForm: function () {
      this.view.segSingleSettlementAccounts.selectedRowIndex = null;
      this.view.lblSelectedSingleSettlementAccount.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
      this.view.lblSelectedSingleSettlementAccount.skin = "sknLblSSP72727215px";
      this.view.flxSingleSettlementAccountsList.setVisibility(false);
      this.view.lblSingleSettlementAccountDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      for (let i = 1; i <= settlementAccountIndex; i++) {
        if (!this.view['S' + i + 'SettlementAccount']) continue;
        this.view.flxMultiSettlementAccount.remove(this.view['S' + i + 'SettlementAccount']);
      }
      documentsList = [];
      document = '';
      docReferenceValues = [];
      deletedIndex = '';
      settlementAccountIndex = 0;
      settlementAccountCount = 0;
      this.view.segLimitInstructions.selectedRowIndex = null;
      this.view.lblSelectedLimitInstruction.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
      this.view.lblSelectedLimitInstruction.skin = "sknLblSSP72727215px";
      this.view.flxLimitInstructionsList.setVisibility(false);
      this.view.lblLimitInstructionsDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      this.view.txtOtherInstructions.text = '';
      this.view.txtMessageToBank.text = '';
      this.view.segDocuments.removeAll();
      this.view.flxSegDocuments.setVisibility(false);
      this.toggleSettlementAccountOption(1);
      this.togglePopup(false);
      this.enableOrDisableSubmitButton();
    },
    enableOrDisableSubmitButton: function () {
      if (documentsList.length > 0) {
        FormControllerUtility.enableButton(this.view.btnSubmit);
      } else {
        FormControllerUtility.disableButton(this.view.btnSubmit);
      }
    },
    navigateBack: function () {
      this.presenter.showView({ form: 'frmBeneficiaryAndAdvisingBankDetails' });
    },
    submitDetails: function () {
      const formData = this.getFormData();
      this.presenter.storeGuaranteeData('bankInstructionAndDocumentDetails', formData);
    },
    toggleSettlementAccountOption: function (idx) {
      for (let i = 1; i <= 2; i++) {
        if (i === idx) {
          this.view['lblSettlementAccountOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioSelected;
          this.view['lblSettlementAccountOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioSelected;
        } else {
          this.view['lblSettlementAccountOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
          this.view['lblSettlementAccountOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioUnselected;
        }
      }
      if (idx === 1) {
        this.view.flxSingleSettlementAccount.setVisibility(true);
        this.view.flxMultiSettlementAccount.setVisibility(false);
        this.view.flxAddNewCurrency.setVisibility(false);
      } else {
        this.view.flxSingleSettlementAccount.setVisibility(false);
        this.view.flxMultiSettlementAccount.setVisibility(true);
        if (settlementAccountCount === 0) this.addNewCurrency();
      }
      this.view.forceLayout();
    },
    toggleDropdownVisibility: function (flxDropdownList, lblDropdownIcon) {
      if (flxDropdownList.isVisible) {
        flxDropdownList.setVisibility(false);
        lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      } else {
        flxDropdownList.setVisibility(true);
        lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronUp;
      }
    },
    setAccountsData: function () {
      if (!accounts) return;
      if (accounts.length > 1) {
        this.view.flxSettlementAccountOption2.setVisibility(true);
      } else {
        this.view.flxSettlementAccountOption2.setVisibility(false);
      }
      let segData = [];
      this.view.segSingleSettlementAccounts.widgetDataMap = {
        lblListValue: 'value'
      };
      for (const account of accounts) {
        segData.push({
          'currencyCode': account.currencyCode,
          'accountID': account.accountID,
          'value': CommonUtilities.getAccountDisplayName(account),
          'template': 'flxListDropdown'
        });
      }
      this.view.segSingleSettlementAccounts.setData(segData);
      this.view.flxSingleSettlementAccountsList.height = (segData.length * 41 > 205) ? "205dp" : `${segData.length * 41}dp`;
    },
    segRowClick: function (segDropdown, lblSelectedValue, flxSegDropdown, lblDropdownIcon) {
      const data = segDropdown.selectedRowItems[0];
      lblSelectedValue.text = data.value;
      lblSelectedValue.skin = "sknLblSSP42424215px";
      flxSegDropdown.setVisibility(false);
      lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
    },
    addNewCurrency: function () {
      settlementAccountIndex++;
      settlementAccountCount++;
      const filteredCurrencies = this.getFilteredCurrencies();
      this.view.flxMultiSettlementAccount.add(this.view.SettlementAccount.clone('S' + settlementAccountIndex));
      const newSettlementAccount = this.view['S' + settlementAccountIndex + 'SettlementAccount'];
      newSettlementAccount.setVisibility(true);
      newSettlementAccount.zIndex = 50 - settlementAccountIndex;
      newSettlementAccount.btnDelete.onClick = this.togglePopup.bind(this, true, 'deleteCurrency', newSettlementAccount);
      newSettlementAccount.setData(filteredCurrencies, accounts);
      for (let i = 1; i <= settlementAccountIndex; i++) {
        if (this.view['S' + i + 'SettlementAccount']) {
          this.view['S' + i + 'SettlementAccount'].btnDelete.setVisibility(settlementAccountCount > 1);
        }
      }
      this.view.flxAddNewCurrency.setVisibility(filteredCurrencies.length > 1);
    },
    deleteCurrency: function (settlementAccountRef) {
      this.view.flxMultiSettlementAccount.remove(settlementAccountRef);
      settlementAccountCount--;
      for (let i = 1; i <= settlementAccountIndex; i++) {
        if (this.view['S' + i + 'SettlementAccount']) {
          this.view['S' + i + 'SettlementAccount'].btnDelete.setVisibility(settlementAccountCount > 1);
        }
      }
      this.view.flxAddNewCurrency.setVisibility(this.getFilteredCurrencies().length > 0);
      this.togglePopup(false);
    },
    getSelectedSettlementAccounts: function () {
      let settlementAccounts = [];
      for (let i = 1; i <= settlementAccountIndex; i++) {
        if (this.view['S' + i + 'SettlementAccount']) {
          settlementAccounts.push(this.view['S' + i + 'SettlementAccount'].getData());
        }
      }
      return settlementAccounts.flat();
    },
    getFilteredCurrencies: function () {
      let selectedCurrencies = this.getSelectedSettlementAccounts();
      return currencies.filter(currency => !selectedCurrencies.find(({ accountCurrency }) => currency === accountCurrency));
    },
    preFillData: function () {
      const guaranteeData = this.presenter.guaranteeData;
      if (guaranteeData.isSingleSettlement === 'true') {
        const singleSettlementAccountsData = this.view.segSingleSettlementAccounts.data;
        const selectedSettlementAccount = JSON.parse(guaranteeData.instructionCurrencies.replace(/'/g, '"'))[0].account;
        let singleSettlementAccountAvailable = false;
        for (let i = 0; i < singleSettlementAccountsData.length; i++) {
          if (singleSettlementAccountsData[i].accountID === selectedSettlementAccount) {
            this.view.segSingleSettlementAccounts.selectedRowIndex = [0, i];
            singleSettlementAccountAvailable = true;
            break;
          }
        }
        if (singleSettlementAccountAvailable) {
          this.segRowClick(this.view.segSingleSettlementAccounts, this.view.lblSelectedSingleSettlementAccount, this.view.flxSingleSettlementAccountsList, this.view.lblSingleSettlementAccountDropdownIcon);
        }
        this.toggleSettlementAccountOption(1);
      } else if (guaranteeData.isSingleSettlement === 'false') {
        const selectedSettlementAccount = JSON.parse(guaranteeData.instructionCurrencies.replace(/'/g, '"'));
        const selectedCurrencies = Array.from(new Set(selectedSettlementAccount.map(acc => acc.accountCurrency)));
        const groupedSettlementAccount = selectedSettlementAccount.reduce((acc, obj) => {
          (acc[obj['accountCurrency']] = acc[obj['accountCurrency']] || []).push(obj);
          return acc;
        }, []);
        for (let i = 0; i < selectedCurrencies.length; i++) {
          if (!currencies.includes(selectedCurrencies[i])) continue;
          this.addNewCurrency();
          this.view['S' + (+i + 1) + 'SettlementAccount'].preFillData(groupedSettlementAccount[selectedCurrencies[i]]);
        }
        this.toggleSettlementAccountOption(2);
      }
      this.view.txtOtherInstructions.text = guaranteeData.otherBankInstructions || '';
      this.view.txtMessageToBank.text = guaranteeData.messageToBank || '';
      if (guaranteeData.documentReferences && guaranteeData.documentName) {
        docReferenceValues = JSON.parse(guaranteeData.documentReferences.replace(/'/g, '"'));
        documentsList = JSON.parse(guaranteeData.documentName.replace(/'/g, '"'));
        this.setDocumentsDataToSegment();
      }
    },
    setLimitInstructions: function (limits) {
      let segData = [];
      if (limits) {
        this.view.segLimitInstructions.widgetDataMap = {
          lblListValue: 'value'
        };
        for (const limit of limits) {
          segData.push({
            key: JSON.stringify(limit),
            value: Object.values(limit).join(' - ')
          });
        }
        this.view.segLimitInstructions.setData(segData);
        this.view.flxLimitInstructionsList.height = (segData.length * 41 > 205) ? "205dp" : `${segData.length * 41}dp`;
        const guaranteeData = this.presenter.guaranteeData;
        if (guaranteeData.status && guaranteeData.limitInstructions && segData) {
          let limitInstructionAvailable = false;
          for (let i = 0; i < segData.length; i++) {
            if (segData[i].key === JSON.stringify(JSON.parse(guaranteeData.limitInstructions.replace(/'/g, '"')))) {
              this.view.segLimitInstructions.selectedRowIndex = [0, i];
              limitInstructionAvailable = true;
              break;
            }
          }
          if (limitInstructionAvailable) {
            this.segRowClick(this.view.segLimitInstructions, this.view.lblSelectedLimitInstruction, this.view.flxLimitInstructionsList, this.view.lblLimitInstructionsDropdownIcon);
          }
        }
      }
    },
    initSwiftTags: function () {
      const guaranteeSwiftTags = applicationManager.getConfigurationManager().guaranteeSwiftTags;
      if (scope_configManager.swiftEnabled === 'True') {
        this.view.flxSettlementAccountSwiftTag.setVisibility(true);
        this.view.flxSettlementAccountContainer.left = "40dp";
        this.view.flxLimitInstructionsSwiftTag.setVisibility(true);
        this.view.flxLimitInstructionsContainer.left = "40dp";
        this.view.flxOtherInstructionsContainer.left = "40dp";
        this.view.flxOtherInstructionsSwiftTag.setVisibility(true);
        this.view.flxMessageToBankContainer.left = "40dp";
        this.view.flxMessageToBankSwiftTag.setVisibility(true);
        this.view.lblSettlementAccountSwiftTag.text = guaranteeSwiftTags.settlementAccount || 'NA';
        this.view.lblLimitInstructionsSwiftTag.text = guaranteeSwiftTags.limitInstructions || 'NA';
        this.view.lblOtherInstructionsSwiftTag.text = guaranteeSwiftTags.otherInstructions || 'NA';
        this.view.lblMessageToBankSwiftTag.text = guaranteeSwiftTags.messageToBank || 'NA';
      } else {
        this.view.flxSettlementAccountSwiftTag.setVisibility(false);
        this.view.flxSettlementAccountContainer.left = "0dp";
        this.view.flxLimitInstructionsSwiftTag.setVisibility(false);
        this.view.flxLimitInstructionsContainer.left = "0dp";
        this.view.flxOtherInstructionsContainer.left = "0dp";
        this.view.flxOtherInstructionsSwiftTag.setVisibility(false);
        this.view.flxMessageToBankContainer.left = "0dp";
        this.view.flxMessageToBankSwiftTag.setVisibility(false);
      }
      this.view.forceLayout();
    }
  };
});