define(['FormControllerUtility'], function (FormControllerUtility) {
  const responsiveUtils = new ResponsiveUtils();
  let clauseIndex = 1;
  let clauseCount = 1;
  let clauses = [];
  let dataValid;
  return {
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
    preShow: function () {
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
      this.view.customheadernew.forceCloseHamburger();
      this.view.customheadernew.activateMenu("TradeFinance", "Guarantees");
    },
    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(false);
      this.view.lblHeading.text = this.presenter.guaranteeData.isReviseFlow ? kony.i18n.getLocalizedString('i18n.TradeFinance.issuedGtAndSblcReviseRequest') : kony.i18n.getLocalizedString('i18n.TradeFinance.createGuaranteeNewRequest');
      let roadmapData = [];
      for (const key in this.presenter.guaranteeRoadmap) {
        roadmapData.push({
          'currentRow': key === 'clauseConditionDetails',
          'rowLabel': this.presenter.guaranteeRoadmap[key],
          'rowStatus': this.presenter.guaranteeData[key] === 'done' ? 'done' : key === 'clauseConditionDetails' ? 'Inprogress' : 'Incomplete'
        });
      }
      this.view.ProgressTracker.setData(roadmapData);
      this.presenter.getClauses({}, this.view.id);
      this.view.lblSave.onTouchEnd = this.togglePopup.bind(this, true, 'saveDraft');
      if (this.presenter.guaranteeData.clauseConditionDetails !== 'done') this.resetForm();
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
      if (viewModel.clauses) {
        this.constructClausesSegmentData(viewModel.clauses);
        if (this.presenter.guaranteeData.clauseConditionDetails !== 'done') {
          clauseIndex = 1;
          clauseCount = 1;
          if (this.presenter.guaranteeData.status) {
            this.preFillData();
          } else {
            this.setClausesData();
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
      this.presenter = applicationManager.getModulesPresentationController({
        appName: 'TradeFinanceMA',
        moduleName: 'GuaranteesUIModule'
      });
      this.view.Popup.flxCross.onClick = this.togglePopup.bind(this, false);
      this.view.flxErrorClose.onClick = () => scope.view.flxErrorMessage.setVisibility(false);
      this.view.lblClear.onTouchEnd = this.togglePopup.bind(this, true, 'clearDetails');
      this.view.btnClose.onClick = this.togglePopup.bind(this, true, 'saveOrDeleteDraft');
      this.view.btnAdd.onClick = this.addNewClause;
      this.view.btnSubmit.onClick = this.submitDetails;
      this.view.btnBack.onClick = this.navigateBack;
      this.enableDisableSubmitButton();
      if (this.view.C1Clause) {
        this.view.C1Clause.zIndex = 100;
        this.view.C1Clause.lblDelete.onTouchEnd = this.togglePopup.bind(this, true, 'deleteClause', this.view.C1Clause);
      }
    },
    togglePopup: function (visibility, flow, data) {
      if (visibility) {
        this.view.Popup.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
        this.view.Popup.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
        this.view.Popup.btnNo.onClick = this.togglePopup.bind(this, false);
        switch (flow) {
          case 'clearDetails':
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TransfersEur.clear");
            this.view.Popup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AreYouSureYouWantToClearThe") + kony.i18n.getLocalizedString("i18n.TradeFinance.clauseDetails") + "?";
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
          case 'deleteClause':
            this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("kony.mb.common.Delete");
            this.view.Popup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.deletePopupMessage");
            this.view.Popup.btnYes.onClick = this.deleteClause.bind(this, data);
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
      this.view.flxFormContent.setContentOffset({
        x: "0%",
        y: "0%"
      }, true);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(true);
      this.view.lblTransactionReferenceValue.text = viewModel.guaranteesSRMSId;
      this.view.forceLayout();
    },
    showServerError: function (errorMsg) {
      if (errorMsg) {
        this.view.flxFormContent.setContentOffset({
          x: "0%",
          y: "0%"
        }, true);
        this.view.flxErrorMessage.setVisibility(true);
        this.view.flxSuccessMessage.setVisibility(false);
        this.view.lblErrorMessage.text = errorMsg;
        this.view.forceLayout();
      }
    },
    getFormData: function () {
      const clauses = this.getSelectedClauses();
      let formData = {};
      formData['clauseConditions'] = JSON.stringify(clauses);
      formData['clausesToCreate'] = clauses.filter(x => !x.clauseId);
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
        this.presenter.showGuaranteesScreen({
          context: 'viewGuarantees'
        });
      }
    },
    resetForm: function () {
      for (let i = 1; i <= clauseIndex; i++) {
        const refClause = this.view['C' + i + 'Clause'];
        refClause && this.view.flxClauses.remove(refClause);
      }
      clauseIndex = 0;
      clauseCount = 0;
      this.addNewClause();
      this.togglePopup(false);
      this.enableDisableSubmitButton();
    },
    submitDetails: function () {
      const formData = this.getFormData();
      this.presenter.storeGuaranteeData('clauseConditionDetails', formData);
    },
    setClausesData: function () {
      this.view.C1Clause.setData(clauses)
    },
    preFillData: function () {
      const guaranteeData = this.presenter.guaranteeData;
      if (guaranteeData.clauseConditions) {
        const clauseData = JSON.parse(guaranteeData.clauseConditions.replace(/'/g, '"'));
        this.view['C1Clause'].setData(clauses);
        this.view['C1Clause'].preFillData(clauseData[0]);
        for (let i = 1; i < clauseData.length; i++) {
          this.addNewClause();
          this.view['C' + (i + 1) + 'Clause'].preFillData(clauseData[i]);
        }
      }
      else this.setClausesData();
    },
    deleteClause: function (clauseRef) {
      this.view.flxClauses.remove(clauseRef);
      clauseCount--;
      for (let i = 1, j = 1; i <= clauseIndex; i++) {
        if (this.view['C' + i + 'Clause']) {
          this.view['C' + i + 'Clause'].lblDelete.setVisibility(clauseCount > 1);
          this.view['C' + i + 'Clause'].lblHeading.text = "Clause & Condition " + j++;
        }
      }
      this.togglePopup(false);
      this.enableDisableSubmitButton();
    },
    addNewClause: function () {
      clauseIndex++;
      clauseCount++;
      this.view.flxClauses.add(this.view.Clause.clone('C' + clauseIndex));
      const newClause = this.view['C' + clauseIndex + 'Clause'];
      const filteredClauses = this.getFilteredClauses();
      newClause.zIndex = 100 - clauseCount;
      newClause.setVisibility(true);
      newClause.lblDelete.onTouchEnd = this.togglePopup.bind(this, true, 'deleteClause', newClause);
      newClause.setData(filteredClauses);
      for (let i = 1, j = 1; i <= clauseIndex; i++) {
        if (!this.view['C' + i + 'Clause']) continue;
        this.view['C' + i + 'Clause'].lblDelete.setVisibility(clauseCount > 1);
        this.view['C' + i + 'Clause'].lblHeading.text = "Clause & Condition " + j++;
      }
      this.view.forceLayout();
      this.enableDisableSubmitButton();
    },
    getSelectedClauses: function () {
      dataValid = true;
      let selectedClauses = [];
      for (let i = 1; i <= clauseIndex; i++) {
        const clauseRef = this.view['C' + i + 'Clause'];
        if (!clauseRef) continue;
        const clauseData = clauseRef.getData();
        clauseData && selectedClauses.push(clauseData);
        if (clauseRef.flxTitle.isVisible && clauseRef.lblError.isVisible) {
          dataValid = false;
        }
      }
      return selectedClauses;
    },
    getFilteredClauses: function () {
      let filteredClauses = JSON.parse(JSON.stringify(clauses));
      for (let i = 1; i <= clauseIndex; i++) {
        if (!this.view['C' + i + 'Clause']) continue;
        const selectedIdx = this.view['C' + i + 'Clause'].segClause.selectedRowIndex;
        if (selectedIdx && selectedIdx[1] !== filteredClauses.length - 1) {
          filteredClauses[selectedIdx[1]]['flxListDropdown']['skin'] = 'slFboxBGf8f7f8B0';
        }
      }
      return filteredClauses;
    },
    enableDisableSubmitButton: function () {
      let selectedClauses = this.getSelectedClauses();
      if (selectedClauses.length === clauseCount && dataValid) {
        FormControllerUtility.enableButton(this.view.btnSubmit);
      } else {
        FormControllerUtility.disableButton(this.view.btnSubmit);
      }
    },
    navigateBack: function () {
      this.presenter.showView({
        form: 'frmBankInstructionAndDocumentDetails'
      });
    },
    constructClausesSegmentData: function (clausesData) {
      clauses = [];
      clausesData.push({
        'clauseType': 'Custom Clause & Condition'
      });
      for (const clause of clausesData) {
        clauses.push(Object.assign(clause, {
          'lblListValue': {
            'text': clause.clauseId ? `${clause.clauseId} - ${clause.clauseTitle}` : clause.clauseType,
            'toolTip': clause.clauseId ? `${clause.clauseId} - ${clause.clauseTitle}` : clause.clauseType
          },
          'flxListDropdown': {
            'skin': "slFbox"
          }
        }));
      }
    }
  };
});