define(["FormControllerUtility", "CommonUtilities", "OLBConstants"], function (FormControllerUtility, CommonUtilities, OLBConstants) {
  const responsiveUtils = new ResponsiveUtils();
  let documentsList = [];
  let selectedDocument = '';
  let deletedDocumentIndex;
  let physicalDocumentsCount = 1;
  let physicalDocumentIndex;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
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
      this.view.customheadernew.activateMenu("TradeFinance", "GuaranteesReceived");
    },
    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(false);
      this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.receivedGtAndSblcCreateNewClaim");
      this.view.flxCreateClaim.setVisibility(true);
      this.view.flxReviewClaimDetails.setVisibility(false);
      this.view.flxGuaranteeDetailsPopup.setVisibility(false);
      this.resetForm();
      this.setAccountsData();
      this.setPhysicalDocumentsDropdownData(this.view.segPhysicalDocumentTitles, this.presenter.guaranteeClaimConfig.physicalDocumentTitles);
      this.setPhysicalDocumentsDropdownData(this.view.segOriginalsCount, this.presenter.guaranteeClaimConfig.physicalDocumentCounts);
      this.setPhysicalDocumentsDropdownData(this.view.segCopiesCount, this.presenter.guaranteeClaimConfig.physicalDocumentCounts);
      CommonUtilities.disableOldDaySelection(this.view.calNewExtensionDate);
      this.view.calNewExtensionDate.clear();
      this.populateGuaranteeSummaryDetails();
      if (this.presenter.claimData.claimsSRMSId) {
        this.preFillData();
      }
      this.setPhysicalDocumentsData();
      this.view.GuaranteeReceivedDetails.setContext(JSON.parse(JSON.stringify(this.presenter.guaranteeData)));
    },
    /**
     * Method to initialise form actions
     */
    initFormActions: function () {
      const scope = this;
      this.presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesReceivedUIModule' });
      this.view.tbxCurrency.setEnabled(false);
      this.view.calNewExtensionDate.dateEditable = false;
      this.view.flxErrorClose.onClick = () => scope.view.flxErrorMessage.setVisibility(false);
      this.view.Popup.flxCross.onClick = this.togglePopup.bind(this, false);
      this.view.btnSave.onClick = this.togglePopup.bind(this, true, 'saveDraft');
      this.view.btnClose.onClick = this.togglePopup.bind(this, true, 'saveOrDeleteDraft');
      this.view.tbxAmount.onEndEditing = this.formatAmount;
      this.view.btnUploadDocument.onClick = this.browseSupportingDocument;
      this.view.flxUploadInfoIcon.onClick = this.toggleUploadDocumentInfoPopup.bind(this, true);
      this.view.flxInfoClose.onClick = this.toggleUploadDocumentInfoPopup.bind(this, false);
      this.view.flxClaimCreditAccountDropdown.onClick = this.toggleDropdown.bind(this, this.view.flxClaimCreditAccountList, this.view.lblClaimCreditAccountDropdown);
      this.view.flxChargesDebitAccountDropdown.onClick = this.toggleDropdown.bind(this, this.view.flxChargesDebitAccountList, this.view.lblChargesDebitAccountDropdown);
      this.view.segClaimCreditAccount.onRowClick = this.segRowClick.bind(this, this.view.segClaimCreditAccount, this.view.lblSelectedClaimCreditAccount, this.view.flxClaimCreditAccountList, this.view.lblClaimCreditAccountDropdown);
      this.view.segChargesDebitAccount.onRowClick = this.segRowClick.bind(this, this.view.segChargesDebitAccount, this.view.lblSelectedChargesDebitAccount, this.view.flxChargesDebitAccountList, this.view.lblChargesDebitAccountDropdown);
      this.view.lblDemandTypeOptionIcon1.onTouchEnd = this.toggleDemandTypeOption.bind(this, 1);
      this.view.lblDemandTypeOptionIcon2.onTouchEnd = this.toggleDemandTypeOption.bind(this, 2);
      this.view.lblCheckbox.onTouchEnd = this.toggleCheckbox;
      this.view.btnAddTitleFromList.onClick = this.addNewPhysicalDocument.bind(this, true);
      this.view.btnAddTitleManually.onClick = this.addNewPhysicalDocument.bind(this, false);
      this.view.segPhysicalDocumentTitles.onRowClick = this.segPhysicalDocumentDropdownRowClick.bind(this, this.view.segPhysicalDocumentTitles, 'lblSelectEnter', 1);
      this.view.segOriginalsCount.onRowClick = this.segPhysicalDocumentDropdownRowClick.bind(this, this.view.segOriginalsCount, 'lblOriginalsCount', 2);
      this.view.segCopiesCount.onRowClick = this.segPhysicalDocumentDropdownRowClick.bind(this, this.view.segCopiesCount, 'lblCopiesCount', 3);
      this.view.txtOtherDemandDetails.onEndEditing = this.enableOrDisableSubmitButton;
      this.view.btnSubmit.onClick = () => {
        const formData = scope.getFormData();
        scope.presenter.claimData = Object.assign(scope.presenter.claimData, formData);
        scope.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.receivedGtAndSblcCreateNewClaimReviewAndSubmit");
        scope.view.flxSuccessMessage.setVisibility(false);
        scope.view.flxCreateClaim.setVisibility(false);
        scope.view.flxReviewClaimDetails.setVisibility(true);
        scope.populateClaimDetails();
      };
      this.view.btnReviewClose.onClick = this.togglePopup.bind(this, true, 'saveOrDeleteDraft');
      this.view.btnReviewBack.onClick = () => {
        scope.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.receivedGtAndSblcCreateNewClaim");
        scope.view.flxCreateClaim.setVisibility(true);
        scope.view.flxReviewClaimDetails.setVisibility(false);
      };
      this.view.btnReviewSubmit.onClick = () => {
        scope.presenter.createGuaranteeClaim('frmCreateClaimAck');
      };
      this.view.btnViewGuaranteeDetails.onClick = () => scope.view.flxGuaranteeDetailsPopup.setVisibility(true);
      this.view.flxGuaranteeDetailsClose.onClick = () => scope.view.flxGuaranteeDetailsPopup.setVisibility(false);
      this.renderCalendars(this.view.calNewExtensionDate);
      this.restrictSpecialCharacters();
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
      if (viewModel.claimsSRMSId) {
        this.showSuccessMessage(viewModel);
      }
      if (viewModel.serverError) {
        this.showServerError(viewModel.serverError);
      }
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
    toggleDropdown: function (flxDropdownList, lblDropdownIcon) {
      if (flxDropdownList.isVisible) {
        flxDropdownList.setVisibility(false);
        lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      } else {
        flxDropdownList.setVisibility(true);
        lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronUp;
      }
    },
    toggleCheckbox: function () {
      if (this.view.lblCheckbox.text === this.presenter.resourcesConstants.fontIcons.checkboxUnselected) {
        this.view.lblCheckbox.text = this.presenter.resourcesConstants.fontIcons.checkboxSelected;
      } else {
        this.view.lblCheckbox.text = this.presenter.resourcesConstants.fontIcons.checkboxUnselected;
      }
    },
    segRowClick: function (segDropdown, lblSelectedValue, flxSegDropdown, lblDropdownIcon) {
      const data = segDropdown.selectedRowItems[0];
      lblSelectedValue.text = data.value;
      lblSelectedValue.skin = "sknLblSSP42424215px";
      flxSegDropdown.setVisibility(false);
      lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      this.enableOrDisableSubmitButton();
    },
    formatAmount: function () {
      let amount = this.view.tbxAmount.text;
      if (amount) {
        amount = applicationManager.getFormatUtilManager().formatAmount(amount);
        this.view.tbxAmount.text = amount || '';
      }
      this.enableOrDisableSubmitButton();
    },
    toggleDemandTypeOption: function (idx) {
      for (let i = 1; i <= 2; i++) {
        if (i === idx) {
          this.view['lblDemandTypeOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioSelected;
          this.view['lblDemandTypeOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioSelected;
        } else {
          this.view['lblDemandTypeOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
          this.view['lblDemandTypeOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioUnselected;
        }
      }
      this.view.flxNewExtensionDate.setVisibility(idx === 2);
      this.enableOrDisableSubmitButton();
    },
    setAccountsData: function () {
      const scope = this;
      const accountsData = (applicationManager.getAccountManager().getInternalAccounts() || []).filter(acc => scope.presenter.guaranteeClaimConfig.accountTypes.includes(acc.accountType));
      const widgetDataMap = {
        lblListValue: 'value'
      };
      this.view.segClaimCreditAccount.widgetDataMap = widgetDataMap;
      this.view.segChargesDebitAccount.widgetDataMap = widgetDataMap;
      let segAccountData = [];
      for (const account of accountsData) {
        segAccountData.push({
          key: account.accountID,
          value: CommonUtilities.getAccountDisplayName(account),
          template: 'flxListDropdown'
        });
      }
      this.view.segClaimCreditAccount.setData(segAccountData);
      this.view.segChargesDebitAccount.setData(segAccountData);
      const segHeight = (segAccountData.length * 41 > 205) ? "205dp" : `${segAccountData.length * 41}dp`;
      this.view.flxClaimCreditAccountList.height = segHeight;
      this.view.flxChargesDebitAccountList.height = segHeight;
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
      const scope = this;
      this.view.segPhysicalDocuments.widgetDataMap = {
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
      const breakPoint = kony.application.getCurrentBreakpoint();
      if (this.presenter.claimData.physicalDocuments) {
        const physicalDocuments = JSON.parse(this.presenter.claimData.physicalDocuments.replace(/'/g, '"'));
        physicalDocumentsCount = physicalDocuments.length;
        for (const physicalDocument of physicalDocuments) {
          const docTitleIndex = this.presenter.guaranteeClaimConfig.physicalDocumentTitles.indexOf(physicalDocument.documentTitle);
          if (docTitleIndex !== -1) {
            this.view.segPhysicalDocumentTitles.data[docTitleIndex].flxListDropdown.skin = "slFboxBGf8f7f8B0";
            this.view.segPhysicalDocumentTitles.setDataAt(scope.view.segPhysicalDocumentTitles.data[docTitleIndex], docTitleIndex);
          }
          physicalDocumentsData.push({
            "flxSelectDocTitle": {
              "isVisible": docTitleIndex !== -1,
              "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxPhysicalDocumentTitlesList", 1),
              "width": breakPoint === 1024 ? "30%" : "27%"
            },
            "flxTextField": {
              "isVisible": docTitleIndex === -1,
              "width": breakPoint === 1024 ? "30%" : "27%"
            },
            "lblSelectEnter": {
              "text": physicalDocument.documentTitle
            },
            "lblOriginalsCount": {
              "text": `${physicalDocument.originalsCount} ${physicalDocument.originalsCount === 'Will not submit' ? '' : 'Originals'}`
            },
            "lblCopiesCount": {
              "text": `${physicalDocument.copiesCount} ${physicalDocument.copiesCount === 'Will not submit' ? '' : 'Copies'}`
            },
            "lblDropDown1": {
              "text": this.presenter.resourcesConstants.fontIcons.chevronDown
            },
            "lblDropDown2": {
              "text": this.presenter.resourcesConstants.fontIcons.chevronDown
            },
            "lblDropDown3": {
              "text": this.presenter.resourcesConstants.fontIcons.chevronDown
            },
            "flxOriginalCount": {
              "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxOriginalsCountList", 2),
              "width": breakPoint === 1024 ? "23%" : "14%"
            },
            "flxCopiesCount": {
              "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxCopiesCountList", 3),
              "width": breakPoint === 1024 ? "23%" : "14%"
            },
            "tbxEnterTitle": {
              "text": "",
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
            "width": breakPoint === 1024 ? "30%" : "27%"
          },
          "flxTextField": {
            "isVisible": false,
            "width": breakPoint === 1024 ? "30%" : "27%"
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
            "text": this.presenter.resourcesConstants.fontIcons.chevronDown
          },
          "lblDropDown2": {
            "text": this.presenter.resourcesConstants.fontIcons.chevronDown
          },
          "lblDropDown3": {
            "text": this.presenter.resourcesConstants.fontIcons.chevronDown
          },
          "flxOriginalCount": {
            "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxOriginalsCountList", 2),
            "width": breakPoint === 1024 ? "23%" : "14%"
          },
          "flxCopiesCount": {
            "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxCopiesCountList", 3),
            "width": breakPoint === 1024 ? "23%" : "14%"
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
      if (physicalDocumentsCount === this.presenter.guaranteeClaimConfig.physicalDocumentsLimit) {
        this.view.btnAddTitleFromList.skin = "ICSknbtnDisablede2e9f036px";
        this.view.btnAddTitleFromList.setEnabled(false);
        this.view.btnAddTitleManually.skin = "ICSknbtnDisablede2e9f036px";
        this.view.btnAddTitleManually.setEnabled(false);
      }
      this.view.segPhysicalDocuments.setData(physicalDocumentsData);
    },
    addNewPhysicalDocument: function (visibility) {
      var scope = this;
      scope.view.lblPhysicalDocumentError.setVisibility(false);
      physicalDocumentsCount++;
      const breakPoint = kony.application.getCurrentBreakpoint();
      const data = {
        "flxSelectDocTitle": {
          "isVisible": visibility,
          "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxPhysicalDocumentTitlesList", 1),
          "width": breakPoint === 1024 ? "30%" : "27%"
        },
        "flxTextField": {
          "isVisible": !visibility,
          "width": breakPoint === 1024 ? "30%" : "27%"
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
          "text": this.presenter.resourcesConstants.fontIcons.chevronDown
        },
        "lblDropDown2": {
          "text": this.presenter.resourcesConstants.fontIcons.chevronDown
        },
        "lblDropDown3": {
          "text": this.presenter.resourcesConstants.fontIcons.chevronDown
        },
        "flxOriginalCount": {
          "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxOriginalsCountList", 2),
          "width": breakPoint === 1024 ? "23%" : "14%"
        },
        "flxCopiesCount": {
          "onClick": scope.togglePhysicalDocumentDropdown.bind(scope, "flxCopiesCountList", 3),
          "width": breakPoint === 1024 ? "23%" : "14%"
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
      scope.view.segPhysicalDocuments.addDataAt(data, scope.view.segPhysicalDocuments.data.length);
      if (physicalDocumentsCount === this.presenter.guaranteeClaimConfig.physicalDocumentsLimit) {
        this.view.btnAddTitleFromList.skin = "ICSknbtnDisablede2e9f036px";
        this.view.btnAddTitleFromList.setEnabled(false);
        this.view.btnAddTitleManually.skin = "ICSknbtnDisablede2e9f036px";
        this.view.btnAddTitleManually.setEnabled(false);
      }
      scope.view.forceLayout();
      scope.enableOrDisableSubmitButton();
    },
    togglePhysicalDocumentDropdown: function (flxWidget, count) {
      physicalDocumentIndex = this.view.segPhysicalDocuments.selectedRowIndex[1];
      let data = this.view.segPhysicalDocuments.data[physicalDocumentIndex];
      if (this.view[flxWidget].isVisible) {
        this.view[flxWidget].setVisibility(false);
        data['lblDropDown' + count].text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      } else {
        this.view.flxPhysicalDocumentTitlesList.setVisibility(false);
        this.view.flxOriginalsCountList.setVisibility(false);
        this.view.flxCopiesCountList.setVisibility(false);
        this.view[flxWidget].top = `${70 + (60 * physicalDocumentIndex)}dp`;
        data['lblDropDown1'].text = this.presenter.resourcesConstants.fontIcons.chevronDown;
        data['lblDropDown2'].text = this.presenter.resourcesConstants.fontIcons.chevronDown;
        data['lblDropDown3'].text = this.presenter.resourcesConstants.fontIcons.chevronDown;
        this.view[flxWidget].setVisibility(true);
        data['lblDropDown' + count].text = this.presenter.resourcesConstants.fontIcons.chevronUp;
      }
      this.view.segPhysicalDocuments.setDataAt(data, physicalDocumentIndex);
    },
    deletePhysicalDocument: function () {
      const [sectionIndex, rowIndex] = this.view.segPhysicalDocuments.selectedRowIndex;
      physicalDocumentsCount--;
      let segmentData = this.view.segPhysicalDocuments.data[rowIndex];
      if (segmentData.flxSelectDocTitle.isVisible === true && segmentData.lblSelectEnter.text !== kony.i18n.getLocalizedString("i18n.TradeFinance.SelectDocumentTitle")) {
        let index = this.presenter.guaranteeClaimConfig.physicalDocumentTitles.indexOf(segmentData.lblSelectEnter.text);
        this.view.segPhysicalDocumentTitles.data[index].flxListDropdown.skin = "slFbox";
        this.view.segPhysicalDocumentTitles.setDataAt(this.view.segPhysicalDocumentTitles.data[index], index);
      }
      this.view.segPhysicalDocuments.removeAt(rowIndex, sectionIndex);
      if (physicalDocumentsCount < this.presenter.guaranteeClaimConfig.physicalDocumentsLimit) {
        this.view.btnAddTitleFromList.skin = "ICSknsknBtnffffffBorder0273e31pxRadius2px";
        this.view.btnAddTitleFromList.setEnabled(true);
        this.view.btnAddTitleManually.skin = "ICSknsknBtnffffffBorder0273e31pxRadius2px";
        this.view.btnAddTitleManually.setEnabled(true);
      }
      if (physicalDocumentsCount === 0) {
        this.view.lblPhysicalDocumentError.setVisibility(true);
      }
      this.enableOrDisableSubmitButton();
    },
    segPhysicalDocumentDropdownRowClick: function (segWidget, lblKey, count) {
      const selectedData = segWidget.selectedRowItems[0];
      const rowIndex = segWidget.selectedRowIndex[1];
      let data = this.view.segPhysicalDocuments.data[physicalDocumentIndex];
      if (count === 1) {
        if (segWidget.data[rowIndex].flxListDropdown.skin === "slFboxBGf8f7f8B0") return;
        if (data[lblKey].text !== kony.i18n.getLocalizedString("i18n.TradeFinance.SelectDocumentTitle")) {
          let index = this.presenter.guaranteeClaimConfig.physicalDocumentTitles.indexOf(data[lblKey].text);
          segWidget.data[index].flxListDropdown.skin = "slFboxBGf8f7f8B0";
          segWidget.setDataAt(segWidget.data[index], index);
        }
      }
      data[lblKey].text = selectedData.lblListValue.text;
      if (count !== 1 && data[lblKey].text !== "Will not submit") {
        data[lblKey].text = `${selectedData.lblListValue.text} ${count === 2 ? 'Originals' : 'Copies'}`;
      }
      if (data["lblDropDown1"].text === this.presenter.resourcesConstants.fontIcons.chevronUp) data["lblSelectEnter"].skin = "ICSknLbl42424215PX";
      if (data["lblDropDown2"].text === this.presenter.resourcesConstants.fontIcons.chevronUp) data["lblOriginalsCount"].skin = "ICSknLbl42424215PX";
      if (data["lblDropDown3"].text === this.presenter.resourcesConstants.fontIcons.chevronUp) data["lblCopiesCount"].skin = "ICSknLbl42424215PX";
      data["lblDropDown" + count].text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      this.view.segPhysicalDocuments.setDataAt(data, physicalDocumentIndex);
      this.view.flxPhysicalDocumentTitlesList.setVisibility(false);
      this.view.flxOriginalsCountList.setVisibility(false);
      this.view.flxCopiesCountList.setVisibility(false);
      if (count === 1) {
        segWidget.data[rowIndex].flxListDropdown.skin = "slFboxBGf8f7f8B0";
        segWidget.setDataAt(segWidget.data[rowIndex], rowIndex);
      }
      this.enableOrDisableSubmitButton();
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
      if (documentsList.length >= this.presenter.guaranteeClaimConfig.documentsLimit) {
        scope.view.Popup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedDocumentsLimitMessage")} ${this.presenter.guaranteeClaimConfig.documentsLimit}.`;
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
      const extensions = this.presenter.guaranteeClaimConfig.fileExtensions;
      if (files.length > 0) {
        const extension = files[0].file.name.split('.').pop();
        if (extension && !extensions.hasOwnProperty(extension)) {
          scope.togglePopup(true, 'uploadDocument');
          scope.view.Popup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${files[0].name} ${kony.i18n.getLocalizedString("i18n.TradeFinance.allowedFileExtensionsMessage")} ${Object.keys(extensions).map(e => `.${e}`).join(', ')}.`;
          return;
        }
        if (files[0].file.size >= scope.presenter.guaranteeClaimConfig.documentMaxSize) {
          scope.togglePopup(true, 'uploadDocument');
          scope.view.Popup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1")} ${files[0].name} ${kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentSizeErrorMsg")} ${scope.presenter.guaranteeClaimConfig.documentMaxSize / 10e5} MB.`;
          return;
        }
        var fileData = {};
        scope.togglePopup(false);
        selectedDocument = { documentName: files[0].name };
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
      selectedDocument['documentReference'] = key;
      documentsList.push(selectedDocument);
      this.setDocumentsDataToSegment();
    },
    setDocumentsDataToSegment: function () {
      const scope = this;
      const extensions = this.presenter.guaranteeClaimConfig.fileExtensions;
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
            src: extensions[document.documentName.split('.').pop()] || 'aa_password_error.png'
          },
          "lblDocumentName": {
            text: document.documentName,
            toolTip: document.documentName
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
      scope.presenter.deleteDocument(documentsList[deletedDocumentIndex].documentReference, this.view.id);
      scope.togglePopup(false);
    },
    removeDocumentReference: function () {
      documentsList.splice(deletedDocumentIndex, 1);
      this.setDocumentsDataToSegment();
    },
    togglePopup: function (visibility, flow) {
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
          case 'saveDraft':
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SaveDraft");
            this.view.Popup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AreYouSureYouWantToSaveThisDraft");
            this.view.Popup.btnYes.onClick = this.saveDraft.bind(this, flow);
            break;
          case 'saveOrDeleteDraft':
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.close");
            this.view.Popup.lblPopupMessage.text = this.presenter.claimData.claimsSRMSId ? kony.i18n.getLocalizedString("i18n.TradeFinance.saveAsDraftAndCloseOrDeletePermanentlyMessage") : kony.i18n.getLocalizedString("i18n.TradeFinance.saveAsDraftAndCloseOrCloseWithoutSavedMessage");
            this.view.Popup.btnYes.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SaveasDraft&Close");
            this.view.Popup.btnNo.text = this.presenter.claimData.claimsSRMSId ? kony.i18n.getLocalizedString("kony.mb.Messages.DeletePermanently") : kony.i18n.getLocalizedString("i18n.TradeFinance.closeWithoutSaved");
            this.view.Popup.btnYes.onClick = this.saveDraft.bind(this, flow);
            this.view.Popup.btnNo.onClick = this.deletePermanently;
            break;
          case 'deleteDocument':
            deletedDocumentIndex = this.view.segDocuments.selectedRowIndex[1];
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("kony.mb.common.Delete");
            this.view.Popup.lblPopupMessage.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.deleteDocumentMessage")} "${documentsList[deletedDocumentIndex].documentName}"?`;
            this.view.Popup.btnYes.onClick = this.deleteDocument;
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
    toggleUploadDocumentInfoPopup: function (visibility) {
      this.view.flxInfoUploadMsg.setVisibility(visibility);
    },
    resetForm: function () {
      documentsList = [];
      selectedDocument = '';
      deletedDocumentIndex = '';
      physicalDocumentsCount = 1;
      physicalDocumentIndex = '';
      this.view.tbxCurrency.text = '';
      this.view.tbxAmount.text = '';
      this.view.segClaimCreditAccount.selectedRowIndex = null;
      this.view.lblSelectedClaimCreditAccount.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
      this.view.lblSelectedClaimCreditAccount.skin = "sknLblSSP72727215px";
      this.view.flxClaimCreditAccountList.setVisibility(false);
      this.view.lblClaimCreditAccountDropdown.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      this.view.segChargesDebitAccount.selectedRowIndex = null;
      this.view.lblSelectedChargesDebitAccount.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
      this.view.lblSelectedChargesDebitAccount.skin = "sknLblSSP72727215px";
      this.view.flxChargesDebitAccountList.setVisibility(false);
      this.view.lblChargesDebitAccountDropdown.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      this.view.lblDemandTypeOptionIcon1.text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
      this.view.lblDemandTypeOptionIcon1.skin = this.presenter.resourcesConstants.skins.radioUnselected;
      this.view.lblDemandTypeOptionIcon2.text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
      this.view.lblDemandTypeOptionIcon2.skin = this.presenter.resourcesConstants.skins.radioUnselected;
      this.view.flxNewExtensionDate.setVisibility(false);
      this.view.segDocuments.removeAll();
      this.view.flxSegDocuments.setVisibility(false);
      this.view.segPhysicalDocuments.removeAll();
      this.view.btnAddTitleFromList.skin = "ICSknsknBtnffffffBorder0273e31pxRadius2px";
      this.view.btnAddTitleFromList.setEnabled(true);
      this.view.btnAddTitleManually.skin = "ICSknsknBtnffffffBorder0273e31pxRadius2px";
      this.view.btnAddTitleManually.setEnabled(true);
      this.view.lblCheckbox.text = this.presenter.resourcesConstants.fontIcons.checkboxUnselected;
      this.view.txtOtherDemandDetails.text = '';
      this.view.txtMessageToBank.text = '';
      this.togglePopup(false);
      this.enableOrDisableSubmitButton();
    },
    getFormData: function () {
      let formData = {
        'claimCurrency': this.view.tbxCurrency.text,
        'claimAmount': applicationManager.getFormatUtilManager().deFormatAmount(this.view.tbxAmount.text),
        'claimCreditAccount': '',
        'chargesDebitAccount': '',
        'demandType': this.view.lblDemandTypeOptionIcon1.text === this.presenter.resourcesConstants.fontIcons.radioSelected ? 'Pay' : 'Pay/Extend',
        'newExtensionDate': this.view.flxNewExtensionDate.isVisible ? this.view.calNewExtensionDate.formattedDate : '',
        'documentInformation': documentsList.length > 0 ? JSON.stringify(documentsList) : '',
        'physicalDocuments': '',
        'forwardDocuments': '',
        'otherDemandDetails': this.view.txtOtherDemandDetails.text,
        'messageToBank': this.view.txtMessageToBank.text
      };
      if (this.view.segClaimCreditAccount.selectedRowIndex) {
        formData['claimCreditAccount'] = this.view.segClaimCreditAccount.selectedRowItems[0].key;
        formData['claimCreditAccountFormatted'] = this.view.segClaimCreditAccount.selectedRowItems[0].value;
      }
      if (this.view.segChargesDebitAccount.selectedRowIndex) {
        formData['chargesDebitAccount'] = this.view.segChargesDebitAccount.selectedRowItems[0].key;
        formData['chargesDebitAccountFormatted'] = this.view.segChargesDebitAccount.selectedRowItems[0].value;
      }
      if (this.view.flxPhysicalDocuments.isVisible) {
        let physicalDocumentsData = [];
        for (const physicalDocument of this.view.segPhysicalDocuments.data) {
          const documentTitle = physicalDocument.flxTextField.isVisible ? physicalDocument.tbxEnterTitle.text : physicalDocument.lblSelectEnter.text;
          const originalsCount = physicalDocument.lblOriginalsCount.text;
          const copiesCount = physicalDocument.lblCopiesCount.text;
          if (documentTitle !== '' && documentTitle !== kony.i18n.getLocalizedString("i18n.TradeFinance.SelectDocumentTitle") && originalsCount !== kony.i18n.getLocalizedString("i18n.TradeFinance.OriginalsCount") && copiesCount !== kony.i18n.getLocalizedString("i18n.TradeFinance.CopiesCount")) {
            physicalDocumentsData.push({
              documentTitle,
              originalsCount: originalsCount === 'Will not submit' ? originalsCount : originalsCount.split(' ')[0],
              copiesCount: copiesCount === 'Will not submit' ? copiesCount : copiesCount.split(' ')[0]
            });
          }
        }
        formData['physicalDocuments'] = physicalDocumentsData.length > 0 ? JSON.stringify(physicalDocumentsData) : '';
        formData['forwardDocuments'] = this.view.lblCheckbox.text === this.presenter.resourcesConstants.fontIcons.checkboxSelected ? 'Selected' : 'Unselected';
      }
      return formData;
    },
    enableOrDisableSubmitButton: function () {
      const formData = this.getFormData();
      if (!formData['claimCurrency'] || !formData['claimAmount'] || !formData['claimCreditAccount'] || !formData['chargesDebitAccount'] || !formData['demandType'] || (this.view.flxNewExtensionDate.isVisible && !formData['newExtensionDate']) || !formData['documentInformation'] || (this.view.flxPhysicalDocuments.isVisible && (!formData['physicalDocuments'] || (formData['physicalDocuments'] && JSON.parse(formData.physicalDocuments).length !== physicalDocumentsCount))) || !formData['otherDemandDetails']) {
        FormControllerUtility.disableButton(this.view.btnSubmit);
      } else {
        FormControllerUtility.enableButton(this.view.btnSubmit);
      }
    },
    saveDraft: function (flow) {
      this.togglePopup(false);
      const formData = this.getFormData();
      this.presenter.saveGuaranteeClaim(formData, this.view.id, flow);
    },
    deletePermanently: function () {
      this.togglePopup(false);
      if (this.presenter.claimData.claimsSRMSId) {
        this.presenter.deleteGuaranteeClaim(this.view.id);
      } else {
        this.presenter.showGuaranteesReceivedScreen({ context: 'viewAllReceivedGtAndSblc' });
      }
    },
    /**
     * setting the position of calendars
     */
    renderCalendars: function () {
      for (const calWidget of arguments) {
        calWidget.setContext({
          "widget": calWidget,
          "anchor": "bottom"
        });
      }
    },
    restrictSpecialCharacters: function () {
      const specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
      const alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
      const numbersSet = "0123456789";
      this.view.tbxAmount.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
    },
    populateGuaranteeSummaryDetails: function () {
      const formatUtilManager = applicationManager.getFormatUtilManager();
      const data = this.presenter.guaranteeData;
      this.view.lblValue1.text = data.applicantName || data.beneficiaryName || NA;
      this.view.lblValue2.text = data.guaranteeSrmsId || data.guaranteesSRMSId || NA;
      this.view.lblValue3.text = data.productType || NA;
      this.view.lblValue4.text = data.lcType || data.guaranteeAndSBLCType || NA;
      this.view.lblValue5.text = (data.currency && data.amount) ? `${data.currency} ${formatUtilManager.formatAmount(data.amount)}` : NA;
      this.view.lblValue6.text = (data.currency && data.amount) ? `${data.currency} ${formatUtilManager.formatAmount(data.amount - (data.utilizedAmount || 0))}` : NA;
      this.view.lblValue7.text = data.expectedIssueDate ? formatUtilManager.getFormattedCalendarDate(data.expectedIssueDate) : NA;
      this.view.lblValue8.text = data.expiryType || NA;
      this.view.lblValue9.text = data.expiryDate ? formatUtilManager.getFormattedCalendarDate(data.expiryDate) : NA;
      this.view.lblValue10.text = data.issuingBankName || NA;
      this.view.flxPhysicalDocuments.setVisibility(data.productType === 'Standby LC');
      this.view.tbxCurrency.text = data.currency || applicationManager.getConfigurationManager().getBaseCurrency();
      this.view.lblGuaranteeDetailsHeading.text = `${kony.i18n.getLocalizedString('i18n.TradeFinance.GuaranteeAndStandbyLC')} - ${data.guaranteeSrmsId || data.guaranteesSRMSId}`;
    },
    preFillData: function () {
      const data = this.presenter.claimData;
      this.view.tbxCurrency.text = data.claimCurrency || '';
      this.view.tbxAmount.text = data.claimAmount || '';
      if (data.claimCreditAccount) {
        const claimCreditAccountsData = this.view.segClaimCreditAccount.data;
        let claimCreditAccountAvailable = false;
        for (let i = 0; i < claimCreditAccountsData.length; i++) {
          if (claimCreditAccountsData[i].key === data.claimCreditAccount) {
            this.view.segClaimCreditAccount.selectedRowIndex = [0, i];
            claimCreditAccountAvailable = true;
            break;
          }
        }
        if (claimCreditAccountAvailable) {
          this.segRowClick(this.view.segClaimCreditAccount, this.view.lblSelectedClaimCreditAccount, this.view.flxClaimCreditAccountList, this.view.lblClaimCreditAccountDropdown);
        }
      }
      if (data.chargesDebitAccount) {
        const chargesDebitAccountsData = this.view.segChargesDebitAccount.data;
        let chargesDebitAccountAvailable = false;
        for (let i = 0; i < chargesDebitAccountsData.length; i++) {
          if (chargesDebitAccountsData[i].key === data.chargesDebitAccount) {
            this.view.segChargesDebitAccount.selectedRowIndex = [0, i];
            chargesDebitAccountAvailable = true;
            break;
          }
        }
        if (chargesDebitAccountAvailable) {
          this.segRowClick(this.view.segChargesDebitAccount, this.view.lblSelectedChargesDebitAccount, this.view.flxChargesDebitAccountList, this.view.lblChargesDebitAccountDropdown);
        }
      }
      if (data.demandType) {
        this.toggleDemandTypeOption(data.demandType === 'Pay' ? 1 : 2);
      }
      if (data.newExtensionDate && (Date.parse(data.newExtensionDate) >= Date.now())) {
        const newExtensionDate = new Date(data.newExtensionDate);
        this.view.calNewExtensionDate.dateComponents = [newExtensionDate.getDate(), newExtensionDate.getMonth() + 1, newExtensionDate.getFullYear()];
      }
      if (data.documentInformation) {
        documentsList = JSON.parse(data.documentInformation.replace(/'/g, '"'));
        this.setDocumentsDataToSegment();
      }
      if (data.forwardDocuments) {
        this.view.lblCheckbox.text = data.forwardDocuments === 'Selected' ? this.presenter.resourcesConstants.fontIcons.checkboxSelected : this.presenter.resourcesConstants.fontIcons.checkboxUnselected;
      }
      this.view.txtOtherDemandDetails.text = data.otherDemandDetails || '';
      this.view.txtMessageToBank.text = data.messageToBank || '';
      this.enableOrDisableSubmitButton();
    },
    populateClaimDetails: function () {
      const data = this.presenter.claimData;
      this.view.segClaimDetails.widgetDataMap = {
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxMain": "flxMain"
      };
      let segData = [
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.wealth.amountColon')
          },
          lblValue: {
            text: `${data.claimCurrency} ${applicationManager.getFormatUtilManager().formatAmount(data.claimAmount)}`
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimCreditAccountWithColon')
          },
          lblValue: {
            text: data.claimCreditAccountFormatted
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.chargesDebitAccountWithColon')
          },
          lblValue: {
            text: data.chargesDebitAccountFormatted
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.demandTypeWithColon')
          },
          lblValue: {
            text: data.demandType
          }
        }
      ];
      if (data.newExtensionDate) {
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.newExtensionDateWithColon')
            },
            lblValue: {
              text: data.newExtensionDate
            }
          }
        );
      }
      const documents = JSON.parse(data.documentInformation.replace(/'/g, '"'));
      for (let i = 0; i < documents.length; i++) {
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.uploadedDocumentsWithColon'),
              isVisible: i === 0
            },
            lblValue: {
              text: documents[i].documentName
            },
            flxMain: {
              top: i === 0 ? "20dp" : "10dp"
            }
          }
        );
      }
      if (data.physicalDocuments) {
        const physicalDocuments = JSON.parse(data.physicalDocuments.replace(/'/g, '"'));
        for (let i = 0; i < physicalDocuments.length; i++) {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.physicalDocumentDetailsWithColon'),
                isVisible: i === 0
              },
              lblValue: {
                text: `${physicalDocuments[i].documentTitle} (${physicalDocuments[i].originalsCount} ${physicalDocuments[i].originalsCount === 'Will not submit' ? '' : 'Originals'}, ${physicalDocuments[i].copiesCount} ${physicalDocuments[i].copiesCount === 'Will not submit' ? '' : 'Copies'})`
              },
              flxMain: {
                top: i === 0 ? "20dp" : "10dp"
              }
            }
          );
        }
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.forwardDespiteAnyDiscrepanciesWithColon')
            },
            lblValue: {
              text: data.forwardDocuments === 'Unselected' ? data.forwardDocuments : `${data.forwardDocuments}\n(${kony.i18n.getLocalizedString('i18n.TradeFinance.ExportDocumentCheckContent')})`
            }
          }
        );
      }
      segData.push(
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.otherDemandDetailsWithColon')
          },
          lblValue: {
            text: data.otherDemandDetails
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.messageToBankWithColon')
          },
          lblValue: {
            text: data.messageToBank || NA
          }
        },
      );
      this.view.segClaimDetails.setData(segData);
    },
    showSuccessMessage: function (viewModel) {
      this.view.flxFormContent.setContentOffset({ x: "0%", y: "0%" }, true);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(true);
      this.view.lblTransactionReferenceValue.text = viewModel.claimsSRMSId;
      this.view.forceLayout();
    },
    toggleSectionHeader: function (params) {
      this.view.GuaranteeReceivedDetails.toggleSectionHeader(params);
    }
  };
});